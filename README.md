# Norge i tall

Et økonomisk dashbord for Norge: de viktigste nøkkeltallene med historikk,
sammenlignet med landene vi liker å sammenligne oss med (Sverige, Danmark,
Finland, Nederland, Tyskland og USA).

Ren statisk nettside — HTML, CSS og vanilla JavaScript. Ingen rammeverk,
ingen byggesteg, ingen sporing.

## Indikatorer

| Indikator | Sammenligning | Kilde |
|---|---|---|
| Sysselsettingsandel (15–64 år) | 7 land | Eurostat `lfsi_emp_a` / OECD / SSB AKU |
| Arbeidsledighet (15–74 år) | 7 land | Eurostat `une_rt_a` / SSB AKU |
| Unge utenfor arbeid og utdanning (NEET, 15–29 år) | 7 land | Eurostat `edat_lfse_20` / OECD |
| Sykefravær (sysselsatte borte pga. sykdom, LFS) | 7 land | Eurostat LFS / OECD / BLS / SSB |
| Uføretrygdede (% av 18–67 år) | Kun Norge¹ | NAV |
| Husholdningenes gjeld (% av disponibel inntekt) | 7 land | OECD / SSB / Norges Bank |
| Forbruksgjeld / usikret kredittgjeld (mrd. kr) | Kun Norge¹ | Gjeldsregisteret / Norsk Gjeldsinformasjon |
| Oljefondet (SPU), markedsverdi (mrd. kr) | Kun Norge | NBIM |
| Boligeierandel (% i eid bolig) | 7 land | Eurostat `ilc_lvho02` / US Census |
| Boligpriser, realprisindeks (2015=100) | 7 land | OECD Analytical House Prices |
| Byggekostnad, nye boliger (kr per m²) | Kun Norge¹ | SSB / Boligprodusentene |
| Sparerate (% av disponibel inntekt, netto) | 7 land | OECD / Eurostat |
| Aksjer og fond (% av husholdningenes finansformue) | 7 land | OECD / SSB finansregnskap |
| Gjennomsnittslønn (USD, PPP-justert) | 7 land | OECD Average Annual Wages |
| Fødselsrate (barn per kvinne, SFT) | 7 land | Eurostat `tps00199` / SSB / CDC |
| Skoleresultater (PISA-poeng i matematikk) | 7 land | OECD PISA |
| Nyetablerte foretak (per år) | Kun Norge¹ | SSB / Brønnøysundregistrene |
| Konkurser (foretak per år) | Kun Norge¹ | SSB / Brønnøysundregistrene |
| Skattetrykk (skatter og avgifter, % av BNP) | 7 land | OECD Revenue Statistics |
| BNP-vekst (årlig volumvekst) | 7 land | Eurostat `tec00115` / SSB / BEA |
| Inflasjon (KPI/HICP/CPI) | 7 land | Eurostat `prc_hicp_aind`/`manr` / SSB / BLS |
| Styringsrente (ved kvartals-/årsslutt) | 7 land² | Norges Bank / Riksbanken / Nationalbanken / ECB / Fed |
| Kronekursen (kr per euro) | Kun Norge¹ | Norges Bank |
| Offentlige utgifter per innbygger (USD, PPP) | 7 land | Eurostat `gov_10a_main` / OECD / SSB |

Tidslinjen er årlig fra 2000, og fortsetter med **kvartalsoppløsning**
for arbeidsledighet, inflasjon, styringsrente og kronekurs fra 2025
(K1, K2 …). Kvartaler lagres som desimalår på kvartalsmidtpunktet, så de
aldri kolliderer med årspunkter: K1 2026 = `2026.125`, K4 2025 = `2025.875`.

¹ Indikatorer der ordningene er særnorske eller måles for ulikt til at
direkte sammenligning gir mening (forklart på siden under hver graf).

² Tyskland, Finland og Nederland har euro og deler ECB-renten, så de tre
linjene overlapper i grafen.

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
viser alltid offisielle tall. **De ferskeste punktene (2025-kvartalene og
2025-årstallene) er foreløpige anslag** og bør oppdateres mot kildene, helst
maskinelt:

### Oppdatere data

De internasjonalt sammenlignbare seriene kan hentes maskinelt fra Eurostats
åpne API (krever nettilgang):

```bash
python3 scripts/update_data.py
```

Skriptet skriver `js/data.overrides.js`, som overstyrer basisseriene i
`js/data.js` uten å røre dem. Det henter både årlige serier og ferske
kvartalsserier (sesongjustert ledighet fra `une_rt_q`, inflasjon
kvartalssnittet fra månedstallene i `prc_hicp_manr`) — slik kommer nye
kvartaler (f.eks. K1 2026) automatisk inn på tidslinjen etter hvert som
Eurostat publiserer dem. De særnorske seriene (sykefravær, uføre,
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

- Flere indikatorer: styringsrente, produktivitet, offentlige utgifter,
  handelsbalanse, medianinntekt
- Automatisk oppdatering via GitHub Actions (kjør `update_data.py` ukentlig)
- Per-innbygger-visning av Oljefondet og BNP
