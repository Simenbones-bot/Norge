#!/usr/bin/env python3
"""Hent ferske serier fra Eurostat og skriv js/data.overrides.js.

Krever nettilgang (ec.europa.eu). Kun standardbiblioteket brukes.

    python3 scripts/update_data.py

Skriptet henter årlige serier for de internasjonalt sammenlignbare
indikatorene, og i tillegg kvartalsserier (ledighet) og månedsserier
aggregert til kvartal (inflasjon) som legges på etter siste hele år —
slik at tidslinjen fortsetter med K1, K2 ... inn i inneværende år.

De særnorske seriene må oppdateres for hånd i js/data.js med tall fra:

  - sykefravaer       SSB tabell 12441 (sykefraværsprosent)
  - ufore             NAV uføretrygdstatistikk (andel av bef. 18-67)
  - forbruksgjeld     gjeldsregisteret.com/pages/nokkeltall
  - oljefondet        nbim.no/no/oljefondet/markedsverdi (årsslutt)
  - husholdningsgjeld OECD household debt (% av disponibel inntekt)
  - boligeierandel    Eurostat ilc_lvho02 (OWN) + US Census (husholdninger)
  - boligpriser       OECD Analytical House Prices (real, 2015=100)
  - sparerate         OECD/Eurostat husholdningenes sparerate (netto)
  - aksjeandel        OECD Household Financial Assets / SSB finansregnskap
  - inntekt           OECD Average Annual Wages (USD PPP, faste priser)
  - fodselsrate       Eurostat demo_find/tps00199 + CDC (USA)
"""

import json
import sys
import urllib.parse
import urllib.request
from collections import defaultdict
from datetime import date

BASE = "https://ec.europa.eu/eurostat/api/dissemination/statistics/1.0/data/"

# Eurostat geo-kode -> landkode brukt i js/data.js.
# US finnes bare i enkelte Eurostat-datasett; der landet mangler beholdes
# den håndkuraterte serien fra js/data.js (OECD/BLS/CDC-tall).
GEO = {"NO": "NOR", "SE": "SWE", "DK": "DNK", "FI": "FIN", "NL": "NLD", "DE": "DEU", "US": "USA"}

# KPI-id -> (eurostat-datasett, faste dimensjonsverdier) — årlige serier.
ANNUAL = {
    "sysselsetting": ("lfsi_emp_a", {"indic_em": "EMP_LFS", "sex": "T", "age": "Y15-64", "unit": "PC_POP"}),
    "ledighet": ("une_rt_a", {"sex": "T", "age": "Y15-74", "unit": "PC_ACT"}),
    "neet": ("edat_lfse_20", {"sex": "T", "age": "Y15-29", "unit": "PC"}),
    "bnp_vekst": ("tec00115", {"unit": "CLV_PCH_PRE", "na_item": "B1GQ"}),
    "inflasjon": ("prc_hicp_aind", {"unit": "RCH_A_AVG", "coicop": "CP00"}),
    "fodselsrate": ("tps00199", {}),
}

# KPI-id -> (datasett, faste dimensjoner, sinceTimePeriod).
# Kvartals-/månedsserier som forlenger tidslinjen etter siste hele år.
QUARTERLY = {
    "ledighet": ("une_rt_q", {"s_adj": "SA", "sex": "T", "age": "Y15-74", "unit": "PC_ACT"}, "2025-Q1"),
    "inflasjon": ("prc_hicp_manr", {"unit": "RCH_A", "coicop": "CP00"}, "2025-01"),
}

FIRST_YEAR = 2000


def fetch(dataset, fixed, since):
    params = [("format", "JSON"), ("lang", "EN")]
    params += [(k, v) for k, v in fixed.items()]
    params += [("geo", g) for g in GEO]
    params.append(("sinceTimePeriod", since))
    url = BASE + dataset + "?" + urllib.parse.urlencode(params)
    req = urllib.request.Request(url, headers={"User-Agent": "norge-i-tall/1.0"})
    with urllib.request.urlopen(req, timeout=60) as resp:
        return json.load(resp)


def parse_time(code):
    """Eurostat-tidskode -> (t, månedsindeks|None).

    Årstall er heltall; kvartaler legges på kvartalsmidtpunktet slik at de
    aldri kolliderer med årspunkter: "2024" -> 2024.0,
    "2025-Q3" -> 2025.625, "2025-03" -> K1-midtpunkt 2025.125 + måned.
    """
    code = code.strip()
    if "-Q" in code:
        year, q = code.split("-Q")
        return int(year) + (int(q) - 0.5) / 4.0, None
    if "-" in code:
        year, month = code.split("-")
        month = int(month)
        quarter = (month - 1) // 3
        return int(year) + (quarter + 0.5) / 4.0, month
    return float(int(code)), None


def parse_jsonstat(js, fixed):
    """JSON-stat 2.0 -> {landkode: [(t, måned|None, verdi), ...]}."""
    dims = js["id"]
    sizes = dict(zip(dims, js["size"]))
    index = {d: js["dimension"][d]["category"]["index"] for d in dims}

    strides, acc = {}, 1
    for d in reversed(dims):
        strides[d] = acc
        acc *= sizes[d]

    def pos(dim):
        if sizes[dim] == 1:
            return 0
        code = fixed.get(dim)
        if code is None or code not in index[dim]:
            raise SystemExit(
                f"Dimensjonen '{dim}' har flere verdier {list(index[dim])} — "
                f"angi ønsket kode i konfigurasjonen."
            )
        return index[dim][code]

    base = sum(strides[d] * pos(d) for d in dims if d not in ("geo", "time"))
    values = js["value"]
    out = {}
    for geo_code, country in GEO.items():
        if geo_code not in index["geo"]:
            continue
        rows = []
        for time_code, t_pos in index["time"].items():
            try:
                t, month = parse_time(time_code)
            except ValueError:
                continue
            flat = base + strides["geo"] * index["geo"][geo_code] + strides["time"] * t_pos
            val = values.get(str(flat))
            if val is not None:
                rows.append((t, month, float(val)))
        rows.sort()
        if rows:
            out[country] = rows
    return out


def to_series(rows):
    """(t, måned, verdi)-rader -> [[t, verdi], ...]; måneder snittes per kvartal."""
    monthly = defaultdict(list)
    series = []
    for t, month, val in rows:
        if month is None:
            series.append([t, round(val, 1)])
        else:
            monthly[t].append(val)
    for t, vals in monthly.items():
        if len(vals) >= 2:  # krev minst to måneder før kvartalet tas med
            series.append([t, round(sum(vals) / len(vals), 1)])
    series.sort(key=lambda p: p[0])
    return series


def main():
    overrides = {}

    for kpi_id, (dataset, fixed) in ANNUAL.items():
        print(f"Henter {kpi_id} ({dataset}) ...", flush=True)
        try:
            js = fetch(dataset, fixed, str(FIRST_YEAR))
        except Exception as exc:
            print(f"  FEIL: {exc} — hopper over", file=sys.stderr)
            continue
        series = {c: to_series(rows) for c, rows in parse_jsonstat(js, fixed).items()}
        series = {c: s for c, s in series.items() if s}
        print(f"  {len(series)} land")
        overrides[kpi_id] = series

    for kpi_id, (dataset, fixed, since) in QUARTERLY.items():
        print(f"Henter kvartalshale for {kpi_id} ({dataset}) ...", flush=True)
        try:
            js = fetch(dataset, fixed, since)
        except Exception as exc:
            print(f"  FEIL: {exc} — hopper over", file=sys.stderr)
            continue
        annual = overrides.get(kpi_id, {})
        for country, rows in parse_jsonstat(js, fixed).items():
            tail = to_series(rows)
            base = annual.get(country, [])
            last_annual = max((p[0] for p in base), default=FIRST_YEAR - 1)
            fresh = [p for p in tail if p[0] > last_annual]
            if fresh:
                annual[country] = base + fresh
        overrides[kpi_id] = annual
        spans = [p[0] for s in annual.values() for p in s if p[0] % 1]
        if spans:
            print(f"  kvartaler t.o.m. t={max(spans)}")

    if not overrides:
        raise SystemExit("Ingen serier hentet — js/data.overrides.js er ikke endret.")

    payload = {"fetchedAt": date.today().isoformat(), "series": overrides}
    out = (
        "/*\n"
        " * Maskinhentede serier som overstyrer js/data.js.\n"
        " * Generert av scripts/update_data.py — ikke rediger for hånd.\n"
        " */\n"
        "window.NORGE_DATA_OVERRIDES = "
        + json.dumps(payload, ensure_ascii=False, indent=2)
        + ";\n"
    )
    with open("js/data.overrides.js", "w", encoding="utf-8") as fh:
        fh.write(out)
    print("Skrev js/data.overrides.js")


if __name__ == "__main__":
    main()
