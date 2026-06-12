#!/usr/bin/env python3
"""Hent ferske serier fra Eurostat og skriv js/data.overrides.js.

Krever nettilgang (ec.europa.eu). Kun standardbiblioteket brukes.

    python3 scripts/update_data.py

Skriptet oppdaterer de internasjonalt sammenlignbare indikatorene fra
Eurostats åpne API (JSON-stat 2.0). De særnorske seriene må oppdateres
for hånd i js/data.js med tall fra kildene:

  - sykefravaer       SSB tabell 12441 (sykefraværsprosent)
  - ufore             NAV uføretrygdstatistikk (andel av bef. 18-67)
  - forbruksgjeld     gjeldsregisteret.com/pages/nokkeltall
  - oljefondet        nbim.no/no/oljefondet/markedsverdi (årsslutt)
  - husholdningsgjeld OECD household debt (% av disponibel inntekt)
"""

import json
import sys
import urllib.parse
import urllib.request
from datetime import date

BASE = "https://ec.europa.eu/eurostat/api/dissemination/statistics/1.0/data/"

# Eurostat geo-kode -> landkode brukt i js/data.js
GEO = {"NO": "NOR", "SE": "SWE", "DK": "DNK", "FI": "FIN", "NL": "NLD", "DE": "DEU"}

# KPI-id -> (eurostat-datasett, faste dimensjonsverdier)
DATASETS = {
    "sysselsetting": ("lfsi_emp_a", {"indic_em": "EMP_LFS", "sex": "T", "age": "Y15-64", "unit": "PC_POP"}),
    "ledighet": ("une_rt_a", {"sex": "T", "age": "Y15-74", "unit": "PC_ACT"}),
    "neet": ("edat_lfse_20", {"sex": "T", "age": "Y15-29", "unit": "PC"}),
    "bnp_vekst": ("tec00115", {"unit": "CLV_PCH_PRE", "na_item": "B1GQ"}),
    "inflasjon": ("prc_hicp_aind", {"unit": "RCH_A_AVG", "coicop": "CP00"}),
}

FIRST_YEAR = 2000


def fetch(dataset, fixed):
    params = [("format", "JSON"), ("lang", "EN")]
    params += [(k, v) for k, v in fixed.items()]
    params += [("geo", g) for g in GEO]
    params.append(("sinceTimePeriod", str(FIRST_YEAR)))
    url = BASE + dataset + "?" + urllib.parse.urlencode(params)
    req = urllib.request.Request(url, headers={"User-Agent": "norge-i-tall/1.0"})
    with urllib.request.urlopen(req, timeout=60) as resp:
        return json.load(resp)


def parse_jsonstat(js, fixed):
    """JSON-stat 2.0 -> {landkode: [[år, verdi], ...]}."""
    dims = js["id"]
    sizes = dict(zip(dims, js["size"]))
    index = {d: js["dimension"][d]["category"]["index"] for d in dims}

    strides, acc = {}, 1
    for d in reversed(dims):
        strides[d] = acc
        acc *= sizes[d]

    def pos(dim):
        """Posisjon for faste dimensjoner (geo/time håndteres i løkken)."""
        if dim in ("geo", "time"):
            raise AssertionError(dim)
        if sizes[dim] == 1:
            return 0
        code = fixed.get(dim)
        if code is None or code not in index[dim]:
            raise SystemExit(
                f"Dimensjonen '{dim}' har flere verdier {list(index[dim])} — "
                f"angi ønsket kode i DATASETS-konfigurasjonen."
            )
        return index[dim][code]

    base = sum(strides[d] * pos(d) for d in dims if d not in ("geo", "time"))
    values = js["value"]
    out = {}
    for geo_code, country in GEO.items():
        if geo_code not in index["geo"]:
            continue
        series = []
        for year_str, t_pos in index["time"].items():
            try:
                year = int(year_str)
            except ValueError:
                continue
            flat = base + strides["geo"] * index["geo"][geo_code] + strides["time"] * t_pos
            val = values.get(str(flat))
            if val is not None:
                series.append([year, round(float(val), 1)])
        series.sort(key=lambda p: p[0])
        if series:
            out[country] = series
    return out


def main():
    overrides = {}
    for kpi_id, (dataset, fixed) in DATASETS.items():
        print(f"Henter {kpi_id} ({dataset}) ...", flush=True)
        try:
            js = fetch(dataset, fixed)
        except Exception as exc:  # nettverk/HTTP
            print(f"  FEIL: {exc} — hopper over", file=sys.stderr)
            continue
        series = parse_jsonstat(js, fixed)
        years = [p[0] for s in series.values() for p in s]
        print(f"  {len(series)} land, {min(years)}–{max(years)}")
        overrides[kpi_id] = series

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
