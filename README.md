# Norge i tall

Et økonomisk dashbord for Norge: de viktigste nøkkeltallene med historikk,
sammenlignet med landene vi liker å sammenligne oss med (Sverige, Danmark,
Finland, Nederland og Tyskland).

Ren statisk nettside — HTML, CSS og vanilla JavaScript. Ingen rammeverk,
ingen byggesteg, ingen sporing.

## Indikatorer

| Indikator | Sammenligning | Kilde |
|---|---|---|
| Sysselsettingsandel (15–64 år) | 6 land | Eurostat `lfsi_emp_a` / SSB AKU |
| Arbeidsledighet (15–74 år) | 6 land | Eurostat `une_rt_a` / SSB AKU |
| Unge utenfor arbeid og utdanning (NEET, 15–29 år) | 6 land | Eurostat `edat_lfse_20` |
| Sykefravær (tapte dagsverk i %) | Kun Norge¹ | SSB sykefraværsstatistikk |
| Uføretrygdede (% av 18–67 år) | Kun Norge¹ | NAV |
| Husholdningenes gjeld (% av disponibel inntekt) | 6 land | OECD / SSB / Norges Bank |
| Forbruksgjeld / usikret kredittgjeld (mrd. kr) | Kun Norge¹ | Gjeldsregisteret / Norsk Gjeldsinformasjon |
| Oljefondet (SPU), markedsverdi (mrd. kr) | Kun Norge | NBIM |
| BNP-vekst (årlig volumvekst) | 6 land | Eurostat `tec00115` / SSB |
| Inflasjon (KPI/HICP) | 6 land | Eurostat `prc_hicp_aind` / SSB |

¹ Indikatorer der ordningene er særnorske eller måles for ulikt til at
direkte sammenligning gir mening (forklart på siden under hver graf).

## Kjør lokalt

Åpne `index.html` rett i nettleseren, eller serve mappen:

```bash
python3 -m http.server 8000
# http://localhost:8000
```

Siden kan publiseres som den er på GitHub Pages (Settings → Pages → velg
branch, rotmappe).

## Om tallene

Datasettet ligger i [`js/data.js`](js/data.js) og er **manuelt sammenstilt**
fra offentlige kilder (Eurostat, OECD, SSB, NAV, NBIM, Gjeldsregisteret),
sist gjennomgått juni 2026. Verdiene er avrundet og enkelte kan være
foreløpige eller avvike marginalt fra kildene — kildelenkene under hver graf
viser alltid offisielle tall.

### Oppdatere data

De internasjonalt sammenlignbare seriene kan hentes maskinelt fra Eurostats
åpne API (krever nettilgang):

```bash
python3 scripts/update_data.py
```

Skriptet skriver `js/data.overrides.js`, som overstyrer basisseriene i
`js/data.js` uten å røre dem. De særnorske seriene (sykefravær, uføre,
forbruksgjeld, Oljefondet, husholdningsgjeld) oppdateres for hånd i
`js/data.js`; kildene står i toppen av skriptet og i datafilen.

## Struktur

```
index.html              Siden (skall — innholdet bygges av js/app.js)
css/style.css           Stilark
js/data.js              Datasett og metadata (kuratert basis)
js/data.overrides.js    Maskinhentede serier (generert, kan være tom)
js/charts.js            SVG-linjediagrammer og sparklines (uten avhengigheter)
js/app.js               Bygger kort, grafseksjoner, kontroller og tabeller
scripts/update_data.py  Henter ferske serier fra Eurostat
```

## Mulige utvidelser

- Flere indikatorer: boligpriser, styringsrente, produktivitet, offentlige
  utgifter, handelsbalanse
- Automatisk oppdatering via GitHub Actions (kjør `update_data.py` ukentlig)
- Per-innbygger-visning av Oljefondet og BNP
