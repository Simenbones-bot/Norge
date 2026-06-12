/*
 * Norge i tall — datasett
 *
 * Manuelt sammenstilte nøkkeltall fra offentlige kilder (Eurostat, OECD, SSB,
 * NAV, NBIM, Gjeldsregisteret). Verdiene er avrundet og enkelte kan være
 * foreløpige eller avvike marginalt fra kildene — bruk kildelenkene for
 * offisielle tall. Serier kan oppdateres maskinelt med scripts/update_data.py
 * (skriver js/data.overrides.js, som overstyrer seriene her).
 *
 * Serieformat: { LANDKODE: [[år, verdi], ...] } — årstall stigende.
 */
window.NORGE_DATA = {
  updated: "juni 2026 — årstall t.o.m. 2024/2025, kvartalstall t.o.m. K4 2025 (foreløpige)",

  countries: [
    { code: "NOR", name: "Norge",     flag: "🇳🇴", color: "#C8102E", emphasize: true },
    { code: "SWE", name: "Sverige",   flag: "🇸🇪", color: "#0072B2" },
    { code: "DNK", name: "Danmark",   flag: "🇩🇰", color: "#E69F00" },
    { code: "FIN", name: "Finland",   flag: "🇫🇮", color: "#009E73" },
    { code: "NLD", name: "Nederland", flag: "🇳🇱", color: "#CC79A7" },
    { code: "DEU", name: "Tyskland",  flag: "🇩🇪", color: "#6E7B8B" },
    { code: "USA", name: "USA",       flag: "🇺🇸", color: "#8E44AD" }
  ],

  groups: [
    {
      id: "arbeid",
      title: "Arbeid og utenforskap",
      intro: "Hvor stor del av befolkningen deltar i arbeidslivet — og hvor mange står utenfor?"
    },
    {
      id: "gjeld",
      title: "Gjeld og formue",
      intro: "Norske husholdninger er blant de mest forgjeldede i verden — samtidig eier staten verdens største statlige investeringsfond."
    },
    {
      id: "bolig",
      title: "Bolig og sparing",
      intro: "Nordmenn flest eier boligen sin og sparer gjennom den. I USA og Sverige sitter en langt større del av husholdningenes formue i aksjer og fond."
    },
    {
      id: "inntekt",
      title: "Inntekt, befolkning og skole",
      intro: "Hva tjener folk, får vi nok barn til å bære velferdsstaten — og lærer de nok på skolen?"
    },
    {
      id: "naering",
      title: "Næringsliv",
      intro: "Skapes det nye bedrifter — og hvor mange bukker under?"
    },
    {
      id: "makro",
      title: "Økonomien i stort",
      intro: "Vekst, priser, renter, skatt og offentlig pengebruk — de store linjene i økonomien."
    }
  ],

  kpis: [
    {
      id: "sysselsetting",
      group: "arbeid",
      title: "Sysselsettingsandel",
      short: "Andel 15–64 år i arbeid",
      unit: "%",
      decimals: 1,
      goodDirection: "up",
      description: "Andel av befolkningen i arbeidsfør alder (15–64 år) som er i arbeid (AKU/LFS). Norge lå lenge i Europa-toppen, men flere land har tatt oss igjen — Nederland ligger nå klart foran, mens USA aldri har hentet seg helt inn etter finanskrisen.",
      source: { name: "Eurostat (lfsi_emp_a) / OECD / SSB AKU", url: "https://ec.europa.eu/eurostat/databrowser/view/lfsi_emp_a/default/table" },
      series: {
        NOR: [[2000, 77.5], [2001, 77.2], [2002, 76.8], [2003, 75.5], [2004, 75.1], [2005, 74.8], [2006, 75.4], [2007, 76.8], [2008, 78.0], [2009, 76.4], [2010, 75.3], [2011, 75.3], [2012, 75.7], [2013, 75.4], [2014, 75.2], [2015, 74.8], [2016, 74.3], [2017, 74.0], [2018, 74.7], [2019, 75.3], [2020, 74.7], [2021, 75.8], [2022, 77.5], [2023, 77.7], [2024, 77.3]],
        SWE: [[2000, 74.2], [2001, 75.0], [2002, 74.9], [2003, 74.3], [2004, 73.6], [2005, 73.9], [2006, 74.5], [2007, 75.7], [2008, 75.7], [2009, 72.9], [2010, 72.1], [2011, 73.6], [2012, 73.8], [2013, 74.4], [2014, 74.9], [2015, 75.5], [2016, 76.2], [2017, 76.9], [2018, 77.5], [2019, 77.1], [2020, 75.5], [2021, 75.9], [2022, 77.5], [2023, 77.9], [2024, 77.4]],
        DNK: [[2000, 76.3], [2001, 76.2], [2002, 75.9], [2003, 75.1], [2004, 75.7], [2005, 75.9], [2006, 77.4], [2007, 77.0], [2008, 78.1], [2009, 75.3], [2010, 73.3], [2011, 73.1], [2012, 72.6], [2013, 72.5], [2014, 72.8], [2015, 73.5], [2016, 74.9], [2017, 74.2], [2018, 74.7], [2019, 75.0], [2020, 74.4], [2021, 75.7], [2022, 77.0], [2023, 77.2], [2024, 77.3]],
        FIN: [[2000, 67.2], [2001, 68.1], [2002, 68.1], [2003, 67.7], [2004, 67.6], [2005, 68.4], [2006, 69.3], [2007, 70.3], [2008, 71.1], [2009, 68.7], [2010, 68.1], [2011, 69.0], [2012, 69.4], [2013, 68.9], [2014, 68.7], [2015, 68.5], [2016, 69.1], [2017, 70.0], [2018, 72.1], [2019, 72.9], [2020, 71.9], [2021, 72.8], [2022, 74.0], [2023, 73.6], [2024, 72.9]],
        NLD: [[2000, 72.9], [2001, 74.1], [2002, 74.4], [2003, 73.6], [2004, 73.1], [2005, 73.2], [2006, 74.3], [2007, 76.0], [2008, 77.2], [2009, 77.0], [2010, 74.7], [2011, 74.9], [2012, 75.1], [2013, 74.3], [2014, 73.9], [2015, 74.2], [2016, 74.8], [2017, 75.8], [2018, 77.2], [2019, 78.2], [2020, 77.8], [2021, 79.7], [2022, 81.7], [2023, 82.0], [2024, 82.3]],
        DEU: [[2000, 65.6], [2001, 65.8], [2002, 65.4], [2003, 65.0], [2004, 65.0], [2005, 65.5], [2006, 67.2], [2007, 69.0], [2008, 70.1], [2009, 70.3], [2010, 71.1], [2011, 72.7], [2012, 73.0], [2013, 73.5], [2014, 73.8], [2015, 74.0], [2016, 74.7], [2017, 75.2], [2018, 75.9], [2019, 76.7], [2020, 76.2], [2021, 75.8], [2022, 76.9], [2023, 77.2], [2024, 77.6]],
        USA: [[2000, 74.1], [2001, 73.1], [2002, 71.9], [2003, 71.2], [2004, 71.2], [2005, 71.5], [2006, 72.0], [2007, 71.8], [2008, 70.9], [2009, 67.6], [2010, 66.7], [2011, 66.6], [2012, 67.1], [2013, 67.4], [2014, 68.1], [2015, 68.7], [2016, 69.4], [2017, 70.1], [2018, 70.7], [2019, 71.4], [2020, 67.1], [2021, 69.4], [2022, 71.2], [2023, 72.0], [2024, 72.0]]
      }
    },

    {
      id: "ledighet",
      group: "arbeid",
      title: "Arbeidsledighet",
      short: "Ledige i % av arbeidsstyrken",
      unit: "%",
      decimals: 1,
      goodDirection: "down",
      description: "Arbeidsledige i prosent av arbeidsstyrken (AKU/LFS, 15–74 år). Norge har gjennomgående lav ledighet i europeisk sammenheng, men nivået har krøpet oppover etter 2022. Fra 2025 vises kvartalstall (sesongjusterte, foreløpige).",
      source: { name: "Eurostat (une_rt_a/une_rt_q) / SSB AKU", url: "https://ec.europa.eu/eurostat/databrowser/view/une_rt_q/default/table" },
      series: {
        NOR: [[2000, 3.2], [2001, 3.4], [2002, 3.7], [2003, 4.2], [2004, 4.3], [2005, 4.5], [2006, 3.4], [2007, 2.5], [2008, 2.5], [2009, 3.2], [2010, 3.6], [2011, 3.3], [2012, 3.2], [2013, 3.5], [2014, 3.5], [2015, 4.5], [2016, 4.7], [2017, 4.2], [2018, 3.8], [2019, 3.7], [2020, 4.4], [2021, 4.4], [2022, 3.2], [2023, 3.6], [2024, 4.0], [2025.125, 4.3], [2025.375, 4.5], [2025.625, 4.7], [2025.875, 4.7]],
        SWE: [[2000, 5.6], [2001, 5.8], [2002, 6.0], [2003, 6.6], [2004, 7.4], [2005, 7.7], [2006, 7.1], [2007, 6.1], [2008, 6.2], [2009, 8.3], [2010, 8.6], [2011, 7.8], [2012, 8.0], [2013, 8.0], [2014, 7.9], [2015, 7.4], [2016, 6.9], [2017, 6.7], [2018, 6.4], [2019, 6.8], [2020, 8.3], [2021, 8.8], [2022, 7.5], [2023, 7.7], [2024, 8.4], [2025.125, 8.7], [2025.375, 8.6], [2025.625, 8.4], [2025.875, 8.2]],
        DNK: [[2000, 4.3], [2001, 4.5], [2002, 4.6], [2003, 5.4], [2004, 5.5], [2005, 4.8], [2006, 3.9], [2007, 3.8], [2008, 3.4], [2009, 6.0], [2010, 7.5], [2011, 7.6], [2012, 7.5], [2013, 7.0], [2014, 6.6], [2015, 6.2], [2016, 6.0], [2017, 5.8], [2018, 5.1], [2019, 5.0], [2020, 5.6], [2021, 5.1], [2022, 4.5], [2023, 5.1], [2024, 6.1], [2025.125, 6.2], [2025.375, 6.3], [2025.625, 6.2], [2025.875, 6.1]],
        FIN: [[2000, 9.8], [2001, 9.1], [2002, 9.1], [2003, 9.0], [2004, 8.8], [2005, 8.4], [2006, 7.7], [2007, 6.9], [2008, 6.4], [2009, 8.2], [2010, 8.4], [2011, 7.8], [2012, 7.7], [2013, 8.2], [2014, 8.7], [2015, 9.4], [2016, 8.8], [2017, 8.6], [2018, 7.4], [2019, 6.7], [2020, 7.8], [2021, 7.7], [2022, 6.8], [2023, 7.2], [2024, 8.3], [2025.125, 9.1], [2025.375, 9.3], [2025.625, 9.1], [2025.875, 8.9]],
        NLD: [[2000, 3.1], [2001, 2.6], [2002, 3.1], [2003, 4.2], [2004, 5.1], [2005, 5.3], [2006, 4.4], [2007, 3.6], [2008, 3.0], [2009, 3.7], [2010, 4.5], [2011, 4.4], [2012, 5.3], [2013, 7.3], [2014, 7.4], [2015, 6.9], [2016, 6.0], [2017, 4.9], [2018, 3.8], [2019, 3.4], [2020, 3.8], [2021, 4.2], [2022, 3.5], [2023, 3.6], [2024, 3.7], [2025.125, 3.8], [2025.375, 3.8], [2025.625, 3.9], [2025.875, 4.0]],
        DEU: [[2000, 7.9], [2001, 7.8], [2002, 8.5], [2003, 9.4], [2004, 10.4], [2005, 11.2], [2006, 10.1], [2007, 8.5], [2008, 7.4], [2009, 7.6], [2010, 7.0], [2011, 5.8], [2012, 5.4], [2013, 5.2], [2014, 5.0], [2015, 4.6], [2016, 4.1], [2017, 3.8], [2018, 3.4], [2019, 3.1], [2020, 3.8], [2021, 3.6], [2022, 3.1], [2023, 3.0], [2024, 3.4], [2025.125, 3.5], [2025.375, 3.6], [2025.625, 3.7], [2025.875, 3.7]],
        USA: [[2000, 4.0], [2001, 4.7], [2002, 5.8], [2003, 6.0], [2004, 5.5], [2005, 5.1], [2006, 4.6], [2007, 4.6], [2008, 5.8], [2009, 9.3], [2010, 9.6], [2011, 8.9], [2012, 8.1], [2013, 7.4], [2014, 6.2], [2015, 5.3], [2016, 4.9], [2017, 4.4], [2018, 3.9], [2019, 3.7], [2020, 8.1], [2021, 5.4], [2022, 3.6], [2023, 3.6], [2024, 4.0], [2025.125, 4.1], [2025.375, 4.2], [2025.625, 4.3], [2025.875, 4.4]]
      }
    },

    {
      id: "neet",
      group: "arbeid",
      title: "Unge utenfor (NEET)",
      short: "15–29 år utenfor arbeid og utdanning",
      unit: "%",
      decimals: 1,
      goodDirection: "down",
      description: "Andel 15–29 år som verken er i arbeid, utdanning eller opplæring (NEET). Et sentralt mål på utenforskap blant unge. Norge ligger lavt internasjonalt, men har ikke forbedret seg vesentlig på ti år — USA ligger klart høyere.",
      source: { name: "Eurostat (edat_lfse_20) / OECD (USA)", url: "https://ec.europa.eu/eurostat/databrowser/view/edat_lfse_20/default/table" },
      series: {
        NOR: [[2009, 7.2], [2010, 7.0], [2011, 6.9], [2012, 7.1], [2013, 7.2], [2014, 7.1], [2015, 7.5], [2016, 7.5], [2017, 7.0], [2018, 6.7], [2019, 6.9], [2020, 8.2], [2021, 7.4], [2022, 6.5], [2023, 6.6], [2024, 7.1]],
        SWE: [[2009, 9.6], [2010, 8.6], [2011, 7.9], [2012, 7.8], [2013, 7.7], [2014, 7.4], [2015, 7.4], [2016, 7.0], [2017, 6.8], [2018, 6.5], [2019, 6.3], [2020, 7.5], [2021, 7.0], [2022, 6.0], [2023, 5.9], [2024, 6.3]],
        DNK: [[2009, 6.9], [2010, 7.7], [2011, 7.5], [2012, 7.6], [2013, 7.3], [2014, 7.4], [2015, 8.0], [2016, 7.5], [2017, 8.0], [2018, 7.9], [2019, 8.2], [2020, 9.0], [2021, 8.2], [2022, 7.7], [2023, 7.9], [2024, 8.2]],
        FIN: [[2009, 11.2], [2010, 10.0], [2011, 9.7], [2012, 9.9], [2013, 10.8], [2014, 11.7], [2015, 12.0], [2016, 11.5], [2017, 10.7], [2018, 9.5], [2019, 9.1], [2020, 9.6], [2021, 9.0], [2022, 8.5], [2023, 9.0], [2024, 9.8]],
        NLD: [[2009, 5.5], [2010, 5.7], [2011, 5.5], [2012, 6.1], [2013, 6.7], [2014, 6.7], [2015, 6.7], [2016, 6.4], [2017, 5.9], [2018, 5.7], [2019, 5.7], [2020, 6.0], [2021, 5.5], [2022, 4.5], [2023, 4.8], [2024, 5.0]],
        DEU: [[2009, 11.4], [2010, 10.8], [2011, 9.7], [2012, 9.3], [2013, 8.7], [2014, 8.7], [2015, 8.5], [2016, 8.4], [2017, 8.1], [2018, 7.8], [2019, 7.6], [2020, 9.2], [2021, 9.2], [2022, 8.6], [2023, 8.8], [2024, 8.7]],
        USA: [[2009, 15.2], [2010, 15.8], [2011, 15.6], [2012, 15.0], [2013, 14.7], [2014, 14.2], [2015, 13.7], [2016, 13.5], [2017, 13.0], [2018, 12.6], [2019, 12.1], [2020, 14.9], [2021, 13.3], [2022, 12.0], [2023, 11.7], [2024, 11.5]]
      }
    },

    {
      id: "sykefravaer",
      group: "arbeid",
      title: "Sykefravær",
      short: "Sysselsatte borte fra jobb pga. sykdom",
      unit: "%",
      decimals: 1,
      goodDirection: "down",
      description: "Andel sysselsatte som var helt borte fra jobben i referanseuka på grunn av egen sykdom (AKU/LFS) — den eneste målemetoden som kan sammenlignes mellom land. Norge ligger på topp år etter år. Den norske sykefraværsprosenten (tapte dagsverk, SSB/NAV) måler bredere og var 7,1 % i 2025 — det høyeste siden 2009.",
      source: { name: "Eurostat LFS / OECD / BLS (USA) / SSB", url: "https://www.ssb.no/arbeid-og-lonn/arbeidsmiljo-sykefravaer-og-arbeidskonflikter/statistikk/sykefravaer" },
      series: {
        NOR: [[2010, 4.6], [2012, 4.4], [2014, 4.5], [2016, 4.8], [2018, 4.7], [2020, 4.9], [2021, 5.0], [2022, 5.4], [2023, 5.3], [2024, 5.4]],
        SWE: [[2010, 2.6], [2012, 2.7], [2014, 3.0], [2016, 3.4], [2018, 3.2], [2020, 3.5], [2021, 3.3], [2022, 3.6], [2023, 3.4], [2024, 3.4]],
        DNK: [[2010, 2.6], [2012, 2.5], [2014, 2.6], [2016, 2.8], [2018, 2.8], [2020, 2.7], [2021, 2.8], [2022, 3.1], [2023, 2.9], [2024, 3.0]],
        FIN: [[2010, 2.9], [2012, 3.0], [2014, 3.0], [2016, 3.1], [2018, 3.3], [2020, 3.0], [2021, 3.2], [2022, 3.6], [2023, 3.4], [2024, 3.3]],
        NLD: [[2010, 3.6], [2012, 3.7], [2014, 3.6], [2016, 3.8], [2018, 4.0], [2020, 4.3], [2021, 4.4], [2022, 4.9], [2023, 4.8], [2024, 4.9]],
        DEU: [[2010, 3.3], [2012, 3.4], [2014, 3.6], [2016, 3.8], [2018, 4.0], [2020, 3.9], [2021, 3.9], [2022, 4.9], [2023, 4.7], [2024, 4.6]],
        USA: [[2010, 1.8], [2012, 1.8], [2014, 1.9], [2016, 1.9], [2018, 1.9], [2020, 2.4], [2021, 2.2], [2022, 2.3], [2023, 2.1], [2024, 2.1]]
      }
    },

    {
      id: "ufore",
      group: "arbeid",
      title: "Uføretrygdede",
      short: "Andel 18–67 år på uføretrygd",
      unit: "%",
      decimals: 1,
      goodDirection: "down",
      norwayOnly: true,
      norwayOnlyReason: "Uføreordninger er innrettet svært ulikt mellom land og lar seg ikke sammenligne direkte. Norge har en av de høyeste andelene på helserelaterte ytelser i OECD.",
      description: "Andel av befolkningen 18–67 år som mottar uføretrygd fra NAV — over 370 000 personer i 2025. I tillegg kommer mottakere av arbeidsavklaringspenger (AAP). Andelen har økt siden 2017.",
      source: { name: "NAV uføretrygdstatistikk", url: "https://www.nav.no/no/nav-og-samfunn/statistikk/aap-nedsatt-arbeidsevne-og-uforetrygd-statistikk/uforetrygd" },
      series: {
        NOR: [[2000, 9.9], [2001, 10.1], [2002, 10.3], [2003, 10.5], [2004, 10.4], [2005, 10.4], [2006, 10.3], [2007, 10.2], [2008, 10.1], [2009, 9.9], [2010, 9.6], [2011, 9.4], [2012, 9.5], [2013, 9.4], [2014, 9.3], [2015, 9.4], [2016, 9.5], [2017, 9.6], [2018, 9.8], [2019, 10.2], [2020, 10.4], [2021, 10.5], [2022, 10.5], [2023, 10.4], [2024, 10.5], [2025, 10.6]]
      }
    },

    {
      id: "husholdningsgjeld",
      group: "gjeld",
      title: "Husholdningenes gjeld",
      short: "Gjeld i % av disponibel inntekt",
      unit: "% av disp. inntekt",
      unitShort: "%",
      decimals: 0,
      goodDirection: "down",
      description: "Husholdningenes samlede gjeld i prosent av disponibel inntekt (gjeldsbelastning). Norske husholdninger er blant de mest forgjeldede i verden — gjelden er rundt 2,4 ganger inntekten. Danmark, Nederland og USA har bygget kraftig ned siden finanskrisen; Norge har flatet ut på toppen.",
      source: { name: "OECD / SSB / Norges Bank", url: "https://www.oecd.org/en/data/indicators/household-debt.html" },
      series: {
        NOR: [[2000, 130], [2002, 142], [2004, 155], [2006, 178], [2008, 192], [2010, 196], [2012, 207], [2014, 217], [2016, 229], [2018, 236], [2019, 239], [2020, 242], [2021, 243], [2022, 246], [2023, 244], [2024, 239]],
        SWE: [[2000, 104], [2002, 112], [2004, 122], [2006, 137], [2008, 149], [2010, 165], [2012, 168], [2014, 174], [2016, 183], [2018, 188], [2019, 190], [2020, 196], [2021, 200], [2022, 196], [2023, 186], [2024, 182]],
        DNK: [[2000, 197], [2002, 211], [2004, 235], [2006, 273], [2008, 305], [2010, 310], [2012, 296], [2014, 285], [2016, 277], [2018, 257], [2019, 250], [2020, 246], [2021, 235], [2022, 222], [2023, 209], [2024, 204]],
        FIN: [[2000, 66], [2002, 73], [2004, 84], [2006, 97], [2008, 105], [2010, 110], [2012, 117], [2014, 121], [2016, 126], [2018, 128], [2019, 131], [2020, 133], [2021, 135], [2022, 134], [2023, 127], [2024, 122]],
        NLD: [[2000, 155], [2002, 180], [2004, 205], [2006, 233], [2008, 250], [2010, 270], [2012, 264], [2014, 254], [2016, 245], [2018, 233], [2019, 225], [2020, 222], [2021, 215], [2022, 205], [2023, 195], [2024, 189]],
        DEU: [[2000, 110], [2002, 109], [2004, 105], [2006, 101], [2008, 97], [2010, 98], [2012, 95], [2014, 94], [2016, 93], [2018, 94], [2019, 95], [2020, 99], [2021, 100], [2022, 99], [2023, 94], [2024, 92]],
        USA: [[2000, 96], [2002, 105], [2004, 117], [2006, 130], [2008, 134], [2010, 122], [2012, 111], [2014, 106], [2016, 105], [2018, 103], [2019, 102], [2020, 101], [2021, 102], [2022, 101], [2023, 98], [2024, 97]]
      }
    },

    {
      id: "forbruksgjeld",
      group: "gjeld",
      title: "Forbruksgjeld",
      short: "Usikret gjeld, mrd. kr",
      unit: "mrd. kr",
      decimals: 0,
      goodDirection: "down",
      norwayOnly: true,
      norwayOnlyReason: "Gjeldsregistrene er en norsk ordning (fra juli 2019); tilsvarende heldekkende tall finnes ikke for andre land.",
      description: "Nordmenns usikrede gjeld — forbrukslån og kredittkort — registrert i gjeldsregistrene (verdi ved årsslutt). Gjelden falt etter at registrene kom i 2019 og bankene strammet inn, men har steget igjen siden 2023.",
      source: { name: "Gjeldsregisteret / Norsk Gjeldsinformasjon", url: "https://www.gjeldsregisteret.com/pages/nokkeltall" },
      series: {
        NOR: [[2019, 177], [2020, 163], [2021, 150], [2022, 152], [2023, 159], [2024, 168], [2025, 176]]
      }
    },

    {
      id: "oljefondet",
      group: "gjeld",
      title: "Oljefondet (SPU)",
      short: "Markedsverdi, mrd. kr",
      unit: "mrd. kr",
      decimals: 0,
      goodDirection: "up",
      norwayOnly: true,
      norwayOnlyReason: "Ingen andre sammenlignbare land har et statlig fond i denne størrelsesorden — Oljefondet er verdens største statlige investeringsfond.",
      description: "Statens pensjonsfond utland: markedsverdi ved årsslutt. Fondet passerte 20 000 mrd. kroner i 2025 — rundt 3,7 millioner kroner per innbygger, og mer enn tre ganger Fastlands-BNP. 2025-tallet er foreløpig.",
      source: { name: "Norges Bank Investment Management (NBIM)", url: "https://www.nbim.no/no/oljefondet/markedsverdi/" },
      series: {
        NOR: [[1998, 172], [1999, 222], [2000, 386], [2001, 614], [2002, 609], [2003, 845], [2004, 1016], [2005, 1399], [2006, 1784], [2007, 2019], [2008, 2275], [2009, 2640], [2010, 3077], [2011, 3312], [2012, 3816], [2013, 5038], [2014, 6431], [2015, 7475], [2016, 7510], [2017, 8488], [2018, 8251], [2019, 10088], [2020, 10914], [2021, 12340], [2022, 12429], [2023, 15765], [2024, 19742], [2025, 20700]]
      }
    },

    {
      id: "boligeierandel",
      group: "bolig",
      title: "Boligeierandel",
      short: "Andel som bor i eid bolig",
      unit: "%",
      decimals: 1,
      goodDirection: "up",
      description: "Andel av befolkningen som bor i bolig husholdningen selv eier («eierlinja»). Norge ligger høyt, men andelen har sunket sakte i takt med høyere boligpriser. USA-tallet er andel husholdninger (Census) og dermed noe lavere definisjonsmessig.",
      source: { name: "Eurostat (ilc_lvho02) / US Census", url: "https://ec.europa.eu/eurostat/databrowser/view/ilc_lvho02/default/table" },
      series: {
        NOR: [[2010, 84.8], [2012, 84.0], [2014, 83.5], [2016, 82.7], [2018, 81.3], [2020, 80.8], [2022, 80.1], [2023, 79.8], [2024, 79.6]],
        SWE: [[2010, 70.8], [2012, 69.3], [2014, 67.0], [2016, 65.2], [2018, 64.1], [2020, 64.5], [2022, 64.2], [2023, 64.9], [2024, 64.5]],
        DNK: [[2010, 66.6], [2012, 64.3], [2014, 63.3], [2016, 62.0], [2018, 60.5], [2020, 59.3], [2022, 59.2], [2023, 59.6], [2024, 60.0]],
        FIN: [[2010, 74.3], [2012, 73.9], [2014, 73.2], [2016, 71.6], [2018, 71.6], [2020, 70.7], [2022, 70.0], [2023, 69.6], [2024, 69.2]],
        NLD: [[2010, 67.2], [2012, 67.5], [2014, 67.0], [2016, 69.0], [2018, 68.9], [2020, 69.1], [2022, 70.0], [2023, 70.2], [2024, 70.4]],
        DEU: [[2010, 53.2], [2012, 53.3], [2014, 52.5], [2016, 51.7], [2018, 51.5], [2020, 50.4], [2022, 47.5], [2023, 47.6], [2024, 47.5]],
        USA: [[2010, 66.9], [2012, 65.4], [2014, 64.5], [2016, 63.4], [2018, 64.4], [2020, 66.6], [2022, 65.8], [2023, 65.7], [2024, 65.6]]
      }
    },

    {
      id: "boligpriser",
      group: "bolig",
      title: "Boligpriser (realpriser)",
      short: "Inflasjonsjustert indeks, 2015 = 100",
      unit: "indeks (2015=100)",
      unitShort: "",
      decimals: 0,
      goodDirection: "neutral",
      goodNote: "Høye priser er bra for eiere, dårlig for førstegangskjøpere",
      description: "Boligpriser justert for inflasjon (indeks, 2015 = 100). Norge har hatt en lang, jevn oppgang uten det store krakket Danmark, Nederland og USA fikk etter 2008 — men realprisene falt merkbart i renteårene 2022–2023.",
      source: { name: "OECD Analytical House Prices / SSB", url: "https://www.oecd.org/en/data/indicators/housing-prices.html" },
      series: {
        NOR: [[2000, 46], [2002, 52], [2004, 57], [2006, 70], [2008, 71], [2010, 80], [2012, 90], [2014, 93], [2016, 106], [2018, 108], [2019, 109], [2020, 112], [2021, 119], [2022, 117], [2023, 108], [2024, 108]],
        SWE: [[2000, 45], [2002, 51], [2004, 58], [2006, 68], [2008, 71], [2010, 81], [2012, 82], [2014, 91], [2016, 109], [2018, 110], [2019, 112], [2020, 117], [2021, 128], [2022, 123], [2023, 110], [2024, 112]],
        DNK: [[2000, 62], [2002, 67], [2004, 76], [2006, 100], [2008, 95], [2010, 81], [2012, 76], [2014, 81], [2016, 104], [2018, 110], [2019, 112], [2020, 117], [2021, 128], [2022, 122], [2023, 113], [2024, 117]],
        FIN: [[2000, 71], [2002, 75], [2004, 83], [2006, 90], [2008, 92], [2010, 97], [2012, 99], [2014, 99], [2016, 100], [2018, 101], [2019, 101], [2020, 102], [2021, 105], [2022, 100], [2023, 91], [2024, 88]],
        NLD: [[2000, 79], [2002, 87], [2004, 89], [2006, 93], [2008, 95], [2010, 89], [2012, 78], [2014, 75], [2016, 83], [2018, 97], [2019, 102], [2020, 108], [2021, 122], [2022, 124], [2023, 113], [2024, 119]],
        DEU: [[2000, 88], [2002, 85], [2004, 81], [2006, 78], [2008, 77], [2010, 78], [2012, 84], [2014, 91], [2016, 105], [2018, 116], [2019, 122], [2020, 130], [2021, 140], [2022, 138], [2023, 120], [2024, 116]],
        USA: [[2000, 76], [2002, 84], [2004, 98], [2006, 110], [2008, 95], [2010, 82], [2012, 78], [2014, 88], [2016, 104], [2018, 113], [2019, 115], [2020, 122], [2021, 135], [2022, 140], [2023, 137], [2024, 140]]
      }
    },

    {
      id: "byggekostnad",
      group: "bolig",
      title: "Byggekostnad",
      short: "Nye boliger, kr per kvadratmeter",
      unit: "kr per m²",
      unitShort: "kr/m²",
      decimals: 0,
      goodDirection: "down",
      norwayOnly: true,
      norwayOnlyReason: "Byggekostnader i kroner per kvadratmeter kan ikke sammenlignes direkte mellom land — valuta, byggestandard og hva som regnes inn varierer. Internasjonalt finnes bare vekstindekser, og kostnadshoppet etter pandemien traff hele Europa.",
      description: "Gjennomsnittlig byggekostnad for nye eneboliger, kroner per kvadratmeter (uten tomt). Kostnadene er om lag firedoblet siden 2000, med et markant hopp under materialprissjokket 2021–2023 — en hovedårsak til at boligbyggingen har stupt. Nivåene er omtrentlige; se kildene for offisielle tall.",
      source: { name: "SSB byggekostnadsstatistikk / Boligprodusentene", url: "https://www.ssb.no/priser-og-prisindekser/byggekostnadsindekser" },
      series: {
        NOR: [[2000, 9500], [2002, 10800], [2004, 12200], [2006, 14500], [2008, 17000], [2010, 19500], [2012, 22000], [2014, 24000], [2016, 26500], [2018, 29000], [2019, 30000], [2020, 31500], [2021, 33500], [2022, 37000], [2023, 39500], [2024, 41000], [2025, 42500]]
      }
    },

    {
      id: "sparerate",
      group: "bolig",
      title: "Sparerate",
      short: "Husholdningenes sparing i % av disponibel inntekt",
      unit: "%",
      decimals: 1,
      goodDirection: "up",
      description: "Husholdningenes sparing i prosent av disponibel inntekt (netto). Norske husholdninger sparer middels mye i europeisk sammenheng — og det meste går inn i bolig. Pandemiåret 2020 ga sparerekord i alle land.",
      source: { name: "OECD / Eurostat (nasjonalregnskap)", url: "https://www.oecd.org/en/data/indicators/household-savings.html" },
      series: {
        NOR: [[2000, 4.5], [2002, 8.5], [2004, 7.0], [2006, 0.5], [2008, 3.5], [2010, 7.0], [2012, 8.5], [2014, 8.0], [2016, 7.0], [2018, 6.0], [2019, 7.5], [2020, 15.5], [2021, 13.5], [2022, 4.5], [2023, 4.0], [2024, 6.5]],
        SWE: [[2000, 4.0], [2002, 7.5], [2004, 6.5], [2006, 8.5], [2008, 11.0], [2010, 12.0], [2012, 14.5], [2014, 15.5], [2016, 15.5], [2018, 15.5], [2019, 16.0], [2020, 18.5], [2021, 17.0], [2022, 14.5], [2023, 14.0], [2024, 15.0]],
        DNK: [[2000, 1.0], [2002, 2.5], [2004, 0.5], [2006, 0.0], [2008, 1.5], [2010, 3.0], [2012, 2.5], [2014, 4.0], [2016, 6.5], [2018, 7.5], [2019, 9.5], [2020, 11.0], [2021, 9.0], [2022, 7.0], [2023, 9.0], [2024, 10.0]],
        FIN: [[2000, -1.0], [2002, 0.5], [2004, 1.5], [2006, -1.0], [2008, -0.5], [2010, 2.5], [2012, 0.5], [2014, -0.5], [2016, -1.5], [2018, -0.5], [2019, 0.5], [2020, 5.5], [2021, 2.5], [2022, -1.5], [2023, 0.3], [2024, 1.5]],
        NLD: [[2000, 7.0], [2002, 6.5], [2004, 6.0], [2006, 5.0], [2008, 5.5], [2010, 4.5], [2012, 5.5], [2014, 6.5], [2016, 7.0], [2018, 7.5], [2019, 8.5], [2020, 13.5], [2021, 11.0], [2022, 6.5], [2023, 7.5], [2024, 8.0]],
        DEU: [[2000, 9.5], [2002, 10.0], [2004, 10.5], [2006, 10.5], [2008, 11.5], [2010, 10.5], [2012, 9.5], [2014, 10.0], [2016, 10.5], [2018, 11.0], [2019, 11.0], [2020, 16.5], [2021, 15.0], [2022, 11.3], [2023, 11.2], [2024, 11.5]],
        USA: [[2000, 4.8], [2002, 5.0], [2004, 4.5], [2006, 3.0], [2008, 4.9], [2010, 6.5], [2012, 8.8], [2014, 7.3], [2016, 6.8], [2018, 7.6], [2019, 7.4], [2020, 16.8], [2021, 11.9], [2022, 3.3], [2023, 4.7], [2024, 4.8]]
      }
    },

    {
      id: "aksjeandel",
      group: "bolig",
      title: "Aksjer og fond i formuen",
      short: "Andel av husholdningenes finansformue",
      unit: "% av finansformuen",
      unitShort: "%",
      decimals: 0,
      goodDirection: "neutral",
      goodNote: "Strukturelt — verken bra eller dårlig i seg selv",
      description: "Aksjer og fondsandeler i prosent av husholdningenes samlede finansielle formue. I USA og Sverige sparer folk flest i aksjemarkedet; i Norge sitter formuen i bolig og kollektiv pensjon — og staten «aksjesparer for oss» gjennom Oljefondet. Nivåene er omtrentlige; sammensetningen varierer med børsverdier.",
      source: { name: "OECD Household Financial Assets / SSB finansregnskap", url: "https://www.oecd.org/en/data/indicators/household-financial-assets.html" },
      series: {
        NOR: [[2005, 20], [2008, 14], [2011, 16], [2014, 18], [2017, 20], [2020, 22], [2022, 23], [2024, 24]],
        SWE: [[2005, 40], [2008, 31], [2011, 36], [2014, 41], [2017, 44], [2020, 47], [2022, 45], [2024, 47]],
        DNK: [[2005, 25], [2008, 19], [2011, 22], [2014, 26], [2017, 29], [2020, 31], [2022, 29], [2024, 31]],
        FIN: [[2005, 33], [2008, 26], [2011, 30], [2014, 34], [2017, 36], [2020, 38], [2022, 37], [2024, 38]],
        NLD: [[2005, 20], [2008, 15], [2011, 15], [2014, 16], [2017, 17], [2020, 18], [2022, 17], [2024, 18]],
        DEU: [[2005, 22], [2008, 17], [2011, 18], [2014, 20], [2017, 22], [2020, 24], [2022, 25], [2024, 27]],
        USA: [[2005, 48], [2008, 38], [2011, 43], [2014, 49], [2017, 52], [2020, 54], [2022, 52], [2024, 56]]
      }
    },

    {
      id: "inntekt",
      group: "inntekt",
      title: "Gjennomsnittslønn",
      short: "Årslønn i USD, kjøpekraftsjustert",
      unit: "USD (PPP, faste priser)",
      unitShort: "USD",
      decimals: 0,
      goodDirection: "up",
      description: "Gjennomsnittlig årslønn per heltidsekvivalent, omregnet med kjøpekraftspariteter (PPP) og justert for prisvekst. USA ligger klart øverst; Norge konkurrerer med Danmark og Nederland i Europa-toppen. Reallønnen falt i hele Vesten i 2022, og hentet seg inn i 2023–2024.",
      source: { name: "OECD Average Annual Wages", url: "https://www.oecd.org/en/data/indicators/average-annual-wages.html" },
      series: {
        NOR: [[2000, 46500], [2002, 48500], [2004, 50500], [2006, 52500], [2008, 54000], [2010, 55000], [2012, 57000], [2014, 58000], [2016, 57000], [2018, 58500], [2019, 59000], [2020, 60500], [2021, 61000], [2022, 59000], [2023, 59500], [2024, 61000]],
        SWE: [[2000, 38500], [2002, 40000], [2004, 42000], [2006, 43500], [2008, 44500], [2010, 46000], [2012, 47000], [2014, 48500], [2016, 50000], [2018, 50500], [2019, 51000], [2020, 51500], [2021, 53000], [2022, 50500], [2023, 50000], [2024, 51500]],
        DNK: [[2000, 51000], [2002, 52500], [2004, 54000], [2006, 55500], [2008, 57000], [2010, 58500], [2012, 59000], [2014, 59500], [2016, 61000], [2018, 62000], [2019, 63000], [2020, 63500], [2021, 64500], [2022, 62500], [2023, 63000], [2024, 65000]],
        FIN: [[2000, 41000], [2002, 42500], [2004, 44500], [2006, 46000], [2008, 47500], [2010, 48500], [2012, 49000], [2014, 49000], [2016, 49000], [2018, 49500], [2019, 50000], [2020, 50500], [2021, 51000], [2022, 49000], [2023, 48500], [2024, 49500]],
        NLD: [[2000, 55000], [2002, 55500], [2004, 56500], [2006, 57500], [2008, 59000], [2010, 59500], [2012, 60000], [2014, 60000], [2016, 61000], [2018, 61500], [2019, 62000], [2020, 63000], [2021, 63500], [2022, 61500], [2023, 62500], [2024, 64500]],
        DEU: [[2000, 50000], [2002, 50500], [2004, 51000], [2006, 51000], [2008, 52000], [2010, 53500], [2012, 55000], [2014, 56500], [2016, 58000], [2018, 59500], [2019, 60000], [2020, 60000], [2021, 60500], [2022, 58500], [2023, 59000], [2024, 61000]],
        USA: [[2000, 61500], [2002, 63000], [2004, 64500], [2006, 65500], [2008, 66500], [2010, 67500], [2012, 68500], [2014, 70000], [2016, 72500], [2018, 74000], [2019, 75500], [2020, 78500], [2021, 77500], [2022, 75500], [2023, 78000], [2024, 80000]]
      }
    },

    {
      id: "fodselsrate",
      group: "inntekt",
      title: "Fødselsrate",
      short: "Barn per kvinne (SFT)",
      unit: "barn per kvinne",
      unitShort: "",
      decimals: 2,
      goodDirection: "up",
      goodNote: "Reproduksjonsnivået er ca. 2,1",
      description: "Samlet fruktbarhetstall: antall barn en kvinne i snitt vil føde. Norge har falt fra nesten 2,0 i 2009 til rekordlave nivåer — godt under reproduksjonsnivået på 2,1. Hele Vesten faller, men Finland ligger lavest og USA har holdt seg høyest lengst.",
      source: { name: "Eurostat (demo_find) / SSB / CDC", url: "https://ec.europa.eu/eurostat/databrowser/view/tps00199/default/table" },
      series: {
        NOR: [[2000, 1.85], [2002, 1.75], [2004, 1.83], [2006, 1.90], [2008, 1.96], [2010, 1.95], [2012, 1.85], [2014, 1.76], [2016, 1.71], [2018, 1.56], [2019, 1.53], [2020, 1.48], [2021, 1.55], [2022, 1.41], [2023, 1.40], [2024, 1.44]],
        SWE: [[2000, 1.54], [2002, 1.65], [2004, 1.75], [2006, 1.85], [2008, 1.91], [2010, 1.98], [2012, 1.91], [2014, 1.88], [2016, 1.85], [2018, 1.76], [2019, 1.70], [2020, 1.66], [2021, 1.67], [2022, 1.52], [2023, 1.45], [2024, 1.43]],
        DNK: [[2000, 1.77], [2002, 1.72], [2004, 1.78], [2006, 1.85], [2008, 1.89], [2010, 1.87], [2012, 1.73], [2014, 1.69], [2016, 1.79], [2018, 1.73], [2019, 1.70], [2020, 1.67], [2021, 1.72], [2022, 1.55], [2023, 1.49], [2024, 1.45]],
        FIN: [[2000, 1.73], [2002, 1.72], [2004, 1.80], [2006, 1.84], [2008, 1.85], [2010, 1.87], [2012, 1.80], [2014, 1.71], [2016, 1.57], [2018, 1.41], [2019, 1.35], [2020, 1.37], [2021, 1.46], [2022, 1.32], [2023, 1.26], [2024, 1.25]],
        NLD: [[2000, 1.72], [2002, 1.73], [2004, 1.73], [2006, 1.72], [2008, 1.77], [2010, 1.79], [2012, 1.72], [2014, 1.71], [2016, 1.66], [2018, 1.59], [2019, 1.57], [2020, 1.55], [2021, 1.62], [2022, 1.49], [2023, 1.43], [2024, 1.42]],
        DEU: [[2000, 1.38], [2002, 1.34], [2004, 1.36], [2006, 1.33], [2008, 1.38], [2010, 1.39], [2012, 1.41], [2014, 1.47], [2016, 1.60], [2018, 1.57], [2019, 1.54], [2020, 1.53], [2021, 1.58], [2022, 1.46], [2023, 1.35], [2024, 1.32]],
        USA: [[2000, 2.06], [2002, 2.01], [2004, 2.05], [2006, 2.11], [2008, 2.07], [2010, 1.93], [2012, 1.88], [2014, 1.86], [2016, 1.82], [2018, 1.73], [2019, 1.71], [2020, 1.64], [2021, 1.66], [2022, 1.67], [2023, 1.62], [2024, 1.62]]
      }
    },

    {
      id: "pisa",
      group: "inntekt",
      title: "Skoleresultater (PISA)",
      short: "PISA-poeng i matematikk, 15-åringer",
      unit: "poeng",
      unitShort: "poeng",
      decimals: 0,
      deltaAbsolute: true,
      goodDirection: "up",
      goodNote: "OECD-snittet i 2022 var 472 poeng",
      description: "OECDs PISA-undersøkelse måler 15-åringers kompetanse hvert tredje år — her vises matematikk. Norge falt 33 poeng fra 2018 til 2022, omtrent ett skoleårs læring, og ligger nå under OECD-snittet. Hele Vesten falt etter pandemien, og Finland har falt fra verdenstoppen i 2003. Lesing og naturfag viser samme mønster. Neste runde (PISA 2025) publiseres i desember 2026.",
      source: { name: "OECD PISA", url: "https://www.oecd.org/en/about/programmes/pisa.html" },
      series: {
        NOR: [[2003, 495], [2006, 490], [2009, 498], [2012, 489], [2015, 502], [2018, 501], [2022, 468]],
        SWE: [[2003, 509], [2006, 502], [2009, 494], [2012, 478], [2015, 494], [2018, 502], [2022, 482]],
        DNK: [[2003, 514], [2006, 513], [2009, 503], [2012, 500], [2015, 511], [2018, 509], [2022, 489]],
        FIN: [[2003, 544], [2006, 548], [2009, 541], [2012, 519], [2015, 511], [2018, 507], [2022, 484]],
        NLD: [[2003, 538], [2006, 531], [2009, 526], [2012, 523], [2015, 512], [2018, 519], [2022, 493]],
        DEU: [[2003, 503], [2006, 504], [2009, 513], [2012, 514], [2015, 506], [2018, 500], [2022, 475]],
        USA: [[2003, 483], [2006, 474], [2009, 487], [2012, 481], [2015, 470], [2018, 478], [2022, 465]]
      }
    },

    {
      id: "nyetableringer",
      group: "naering",
      title: "Nyetablerte foretak",
      short: "Nyregistrerte foretak per år",
      unit: "foretak",
      unitShort: "",
      decimals: 0,
      deltaAbsolute: true,
      goodDirection: "up",
      norwayOnly: true,
      norwayOnlyReason: "Foretaksformer og registreringspraksis varierer for mye mellom land til at antall kan sammenlignes — internasjonalt finnes bare vekstindekser.",
      description: "Antall nyregistrerte foretak per år (SSB/Brønnøysundregistrene). Etableringslysten toppet seg under pandemien i 2021, og har siden falt tilbake men holder seg over nivåene fra 2010-tallet. Nivåene er omtrentlige.",
      source: { name: "SSB foretaksstatistikk / Brønnøysundregistrene", url: "https://www.ssb.no/virksomheter-foretak-og-regnskap/virksomheter-og-foretak/statistikk/foretak" },
      series: {
        NOR: [[2010, 47000], [2012, 51000], [2014, 54000], [2016, 58000], [2018, 60000], [2019, 62000], [2020, 66000], [2021, 71000], [2022, 64000], [2023, 60000], [2024, 59000], [2025, 60000]]
      }
    },

    {
      id: "konkurser",
      group: "naering",
      title: "Konkurser",
      short: "Foretakskonkurser per år",
      unit: "konkurser",
      unitShort: "",
      decimals: 0,
      deltaAbsolute: true,
      goodDirection: "down",
      norwayOnly: true,
      norwayOnlyReason: "Antall konkurser avhenger av landets størrelse, foretaksstruktur og konkurslovgivning — internasjonalt finnes bare indekser, ikke sammenlignbare nivåtall.",
      description: "Antall foretakskonkurser per år (Brønnøysundregistrene/SSB). Støtteordningene holdt konkursene kunstig lave under pandemien — etterfulgt av en kraftig økning til de høyeste nivåene siden finanskrisen, med bygg og anlegg hardest rammet. Nivåene er omtrentlige.",
      source: { name: "SSB konkursstatistikk / Brønnøysundregistrene", url: "https://www.ssb.no/virksomheter-foretak-og-regnskap/konkurser/statistikk/opna-konkursar" },
      series: {
        NOR: [[2000, 3600], [2002, 4500], [2003, 5200], [2004, 4300], [2006, 3000], [2008, 3600], [2009, 5000], [2010, 4400], [2012, 3800], [2014, 4800], [2016, 4500], [2018, 5000], [2019, 5000], [2020, 4000], [2021, 3800], [2022, 3900], [2023, 4900], [2024, 5700], [2025, 6100]]
      }
    },

    {
      id: "bnp_vekst",
      group: "makro",
      title: "BNP-vekst",
      short: "Årlig volumvekst i BNP",
      unit: "%",
      decimals: 1,
      goodDirection: "up",
      description: "Årlig volumvekst i brutto nasjonalprodukt (totalt, inkl. olje og gass). Norsk økonomi falt mindre enn nabolandene under finanskrisen og pandemien, men veksten har vært svak siden 2023.",
      source: { name: "Eurostat (tec00115) / SSB nasjonalregnskap", url: "https://ec.europa.eu/eurostat/databrowser/view/tec00115/default/table" },
      series: {
        NOR: [[2000, 3.2], [2001, 2.1], [2002, 1.4], [2003, 0.9], [2004, 4.0], [2005, 2.6], [2006, 2.4], [2007, 3.0], [2008, 0.5], [2009, -1.7], [2010, 0.7], [2011, 1.0], [2012, 2.7], [2013, 1.0], [2014, 2.0], [2015, 2.0], [2016, 1.1], [2017, 2.3], [2018, 1.1], [2019, 1.1], [2020, -1.3], [2021, 3.9], [2022, 3.0], [2023, 0.5], [2024, 0.6]],
        SWE: [[2000, 4.7], [2001, 1.6], [2002, 2.1], [2003, 2.4], [2004, 4.3], [2005, 2.8], [2006, 4.7], [2007, 3.4], [2008, -0.5], [2009, -4.3], [2010, 6.0], [2011, 3.2], [2012, -0.6], [2013, 1.2], [2014, 2.7], [2015, 4.5], [2016, 2.1], [2017, 2.6], [2018, 2.0], [2019, 2.0], [2020, -2.2], [2021, 5.9], [2022, 1.5], [2023, -0.3], [2024, 1.0]],
        DNK: [[2000, 3.7], [2001, 0.8], [2002, 0.5], [2003, 0.4], [2004, 2.7], [2005, 2.3], [2006, 3.9], [2007, 0.9], [2008, -0.5], [2009, -4.9], [2010, 1.9], [2011, 1.3], [2012, 0.2], [2013, 0.9], [2014, 1.6], [2015, 2.3], [2016, 3.2], [2017, 2.8], [2018, 2.0], [2019, 1.5], [2020, -2.4], [2021, 7.4], [2022, 1.5], [2023, 2.5], [2024, 3.7]],
        FIN: [[2000, 5.6], [2001, 2.6], [2002, 1.7], [2003, 2.0], [2004, 3.9], [2005, 2.8], [2006, 4.1], [2007, 5.2], [2008, 0.7], [2009, -8.1], [2010, 3.2], [2011, 2.5], [2012, -1.4], [2013, -0.9], [2014, -0.4], [2015, 0.5], [2016, 2.8], [2017, 3.2], [2018, 1.1], [2019, 1.2], [2020, -2.4], [2021, 2.8], [2022, 1.3], [2023, -1.2], [2024, 0.4]],
        NLD: [[2000, 4.2], [2001, 2.3], [2002, 0.2], [2003, 0.2], [2004, 2.0], [2005, 2.1], [2006, 3.5], [2007, 3.8], [2008, 2.2], [2009, -3.7], [2010, 1.3], [2011, 1.6], [2012, -1.0], [2013, -0.1], [2014, 1.4], [2015, 2.0], [2016, 2.2], [2017, 2.9], [2018, 2.4], [2019, 2.0], [2020, -3.9], [2021, 6.2], [2022, 4.4], [2023, 0.1], [2024, 1.0]],
        DEU: [[2000, 2.9], [2001, 1.7], [2002, 0.0], [2003, -0.7], [2004, 1.2], [2005, 0.7], [2006, 3.8], [2007, 3.0], [2008, 1.0], [2009, -5.7], [2010, 4.2], [2011, 3.9], [2012, 0.4], [2013, 0.4], [2014, 2.2], [2015, 1.5], [2016, 2.2], [2017, 2.7], [2018, 1.1], [2019, 1.1], [2020, -4.1], [2021, 3.2], [2022, 1.4], [2023, -0.3], [2024, -0.2]],
        USA: [[2000, 4.1], [2001, 1.0], [2002, 1.7], [2003, 2.8], [2004, 3.9], [2005, 3.5], [2006, 2.8], [2007, 2.0], [2008, 0.1], [2009, -2.6], [2010, 2.7], [2011, 1.6], [2012, 2.3], [2013, 2.1], [2014, 2.5], [2015, 2.9], [2016, 1.8], [2017, 2.5], [2018, 3.0], [2019, 2.6], [2020, -2.2], [2021, 6.1], [2022, 2.5], [2023, 2.9], [2024, 2.8]]
      }
    },

    {
      id: "produktivitet",
      group: "makro",
      title: "Produktivitetsvekst",
      short: "Årlig vekst i BNP per arbeidstime",
      unit: "%",
      decimals: 1,
      goodDirection: "up",
      description: "Årlig vekst i arbeidsproduktivitet — BNP per arbeidstime (OECD). Det er produktiviteten som på sikt bestemmer reallønn og velstand, og veksten har falt i hele Vesten siden tidlig 2000-tall: i Norge fra rundt 3 % i året til under 1. USA har fått fart igjen etter 2023. For Norge påvirkes tallene av oljevirksomheten; Fastlands-Norge viser samme mønster.",
      source: { name: "OECD Productivity (GDP per hour worked)", url: "https://www.oecd.org/en/data/indicators/gdp-per-hour-worked.html" },
      series: {
        NOR: [[2000, 3.4], [2001, 2.3], [2002, 1.9], [2003, 2.8], [2004, 3.2], [2005, 1.4], [2006, 0.5], [2007, -0.2], [2008, -1.4], [2009, 0.3], [2010, 0.8], [2011, 0.4], [2012, 1.3], [2013, 0.9], [2014, 1.6], [2015, 0.8], [2016, 0.4], [2017, 1.1], [2018, -0.1], [2019, 0.6], [2020, 2.3], [2021, 1.4], [2022, -1.2], [2023, -0.4], [2024, 0.9]],
        SWE: [[2000, 3.8], [2001, 1.0], [2002, 2.6], [2003, 3.0], [2004, 3.9], [2005, 2.6], [2006, 3.1], [2007, 0.9], [2008, -1.2], [2009, -2.5], [2010, 3.4], [2011, 1.6], [2012, 0.4], [2013, 1.3], [2014, 1.4], [2015, 2.6], [2016, 1.0], [2017, 1.2], [2018, 0.6], [2019, 1.5], [2020, 1.9], [2021, 2.9], [2022, 0.4], [2023, -1.0], [2024, 0.9]],
        DNK: [[2000, 2.9], [2001, 0.4], [2002, 0.8], [2003, 1.4], [2004, 2.3], [2005, 1.0], [2006, 1.3], [2007, -0.6], [2008, -1.9], [2009, -1.3], [2010, 3.8], [2011, 1.4], [2012, 1.3], [2013, 1.0], [2014, 1.2], [2015, 0.8], [2016, 1.5], [2017, 1.3], [2018, 1.0], [2019, 1.4], [2020, 1.8], [2021, 2.8], [2022, 0.4], [2023, 1.9], [2024, 2.4]],
        FIN: [[2000, 4.3], [2001, 1.4], [2002, 1.0], [2003, 1.8], [2004, 3.3], [2005, 1.3], [2006, 2.8], [2007, 3.3], [2008, -1.0], [2009, -4.8], [2010, 3.3], [2011, 1.3], [2012, -1.3], [2013, 0.4], [2014, 0.4], [2015, 0.3], [2016, 1.8], [2017, 2.8], [2018, -0.6], [2019, 0.4], [2020, 1.3], [2021, 1.4], [2022, -0.6], [2023, -0.4], [2024, 0.4]],
        NLD: [[2000, 2.8], [2001, 0.9], [2002, 0.4], [2003, 1.3], [2004, 2.3], [2005, 2.3], [2006, 1.8], [2007, 1.3], [2008, 0.3], [2009, -2.3], [2010, 1.8], [2011, 0.4], [2012, -0.6], [2013, 0.9], [2014, 1.0], [2015, 1.3], [2016, 0.4], [2017, 0.9], [2018, 0.3], [2019, 0.4], [2020, 0.8], [2021, 2.3], [2022, -0.6], [2023, -1.3], [2024, 0.4]],
        DEU: [[2000, 2.4], [2001, 1.9], [2002, 1.0], [2003, 0.9], [2004, 0.9], [2005, 1.3], [2006, 2.8], [2007, 1.4], [2008, -0.1], [2009, -2.4], [2010, 2.3], [2011, 2.0], [2012, 0.4], [2013, 0.4], [2014, 1.0], [2015, 0.6], [2016, 1.3], [2017, 1.4], [2018, 0.0], [2019, 0.0], [2020, 0.4], [2021, 2.3], [2022, -0.6], [2023, -0.9], [2024, 0.0]],
        USA: [[2000, 2.9], [2001, 1.9], [2002, 2.8], [2003, 3.3], [2004, 2.8], [2005, 1.9], [2006, 0.9], [2007, 1.4], [2008, 0.8], [2009, 2.9], [2010, 2.8], [2011, 0.3], [2012, 0.4], [2013, 0.4], [2014, 0.6], [2015, 1.0], [2016, 0.4], [2017, 1.0], [2018, 1.0], [2019, 1.4], [2020, 4.3], [2021, 1.9], [2022, -1.4], [2023, 1.4], [2024, 2.3]]
      }
    },

    {
      id: "inflasjon",
      group: "makro",
      title: "Inflasjon",
      short: "Årlig vekst i konsumprisene",
      unit: "%",
      decimals: 1,
      goodDirection: "neutral",
      goodNote: "Inflasjonsmålet er 2 %",
      description: "Årlig vekst i konsumprisene (KPI for Norge, HICP for de europeiske landene, CPI for USA). Prissjokket i 2022–2023 traff hele Vesten; Norge fikk en mindre topp, men inflasjonen har vært tregere ned mot målet på 2 %. Fra 2025 vises kvartalstall (tolvmånedersvekst, foreløpige).",
      source: { name: "Eurostat (prc_hicp_aind/manr) / SSB KPI / BLS", url: "https://ec.europa.eu/eurostat/databrowser/view/prc_hicp_manr/default/table" },
      series: {
        NOR: [[2000, 3.1], [2001, 3.0], [2002, 1.3], [2003, 2.5], [2004, 0.4], [2005, 1.5], [2006, 2.3], [2007, 0.8], [2008, 3.8], [2009, 2.1], [2010, 2.4], [2011, 1.2], [2012, 0.8], [2013, 2.1], [2014, 2.0], [2015, 2.2], [2016, 3.6], [2017, 1.9], [2018, 2.7], [2019, 2.2], [2020, 1.3], [2021, 3.5], [2022, 5.8], [2023, 5.5], [2024, 3.1], [2025.125, 2.8], [2025.375, 2.8], [2025.625, 3.5], [2025.875, 3.0]],
        SWE: [[2000, 1.3], [2001, 2.7], [2002, 1.9], [2003, 2.3], [2004, 1.0], [2005, 0.8], [2006, 1.5], [2007, 1.7], [2008, 3.3], [2009, 1.9], [2010, 1.9], [2011, 1.4], [2012, 0.9], [2013, 0.4], [2014, 0.2], [2015, 0.7], [2016, 1.1], [2017, 1.9], [2018, 2.0], [2019, 1.7], [2020, 0.7], [2021, 2.7], [2022, 8.1], [2023, 5.9], [2024, 2.0], [2025.125, 2.3], [2025.375, 2.4], [2025.625, 2.9], [2025.875, 2.5]],
        DNK: [[2000, 2.7], [2001, 2.3], [2002, 2.4], [2003, 2.0], [2004, 0.9], [2005, 1.7], [2006, 1.9], [2007, 1.7], [2008, 3.6], [2009, 1.1], [2010, 2.2], [2011, 2.7], [2012, 2.4], [2013, 0.5], [2014, 0.4], [2015, 0.2], [2016, 0.0], [2017, 1.1], [2018, 0.7], [2019, 0.7], [2020, 0.3], [2021, 1.9], [2022, 8.5], [2023, 3.4], [2024, 1.3], [2025.125, 1.6], [2025.375, 1.8], [2025.625, 2.2], [2025.875, 2.0]],
        FIN: [[2000, 2.9], [2001, 2.7], [2002, 2.0], [2003, 1.3], [2004, 0.1], [2005, 0.8], [2006, 1.3], [2007, 1.6], [2008, 3.9], [2009, 1.6], [2010, 1.7], [2011, 3.3], [2012, 3.2], [2013, 2.2], [2014, 1.2], [2015, -0.2], [2016, 0.4], [2017, 0.8], [2018, 1.2], [2019, 1.1], [2020, 0.4], [2021, 2.1], [2022, 7.2], [2023, 4.3], [2024, 1.0], [2025.125, 0.8], [2025.375, 1.0], [2025.625, 1.3], [2025.875, 1.5]],
        NLD: [[2000, 2.3], [2001, 5.1], [2002, 3.9], [2003, 2.2], [2004, 1.4], [2005, 1.5], [2006, 1.6], [2007, 1.6], [2008, 2.2], [2009, 1.0], [2010, 0.9], [2011, 2.5], [2012, 2.8], [2013, 2.6], [2014, 0.3], [2015, 0.2], [2016, 0.1], [2017, 1.3], [2018, 1.6], [2019, 2.7], [2020, 1.1], [2021, 2.8], [2022, 11.6], [2023, 4.1], [2024, 3.2], [2025.125, 3.5], [2025.375, 3.2], [2025.625, 2.9], [2025.875, 2.7]],
        DEU: [[2000, 1.4], [2001, 1.9], [2002, 1.4], [2003, 1.0], [2004, 1.8], [2005, 1.9], [2006, 1.8], [2007, 2.3], [2008, 2.8], [2009, 0.2], [2010, 1.1], [2011, 2.5], [2012, 2.1], [2013, 1.6], [2014, 0.8], [2015, 0.7], [2016, 0.4], [2017, 1.7], [2018, 1.9], [2019, 1.4], [2020, 0.4], [2021, 3.2], [2022, 8.7], [2023, 6.0], [2024, 2.5], [2025.125, 2.6], [2025.375, 2.1], [2025.625, 2.2], [2025.875, 2.2]],
        USA: [[2000, 3.4], [2001, 2.8], [2002, 1.6], [2003, 2.3], [2004, 2.7], [2005, 3.4], [2006, 3.2], [2007, 2.9], [2008, 3.8], [2009, -0.4], [2010, 1.6], [2011, 3.2], [2012, 2.1], [2013, 1.5], [2014, 1.6], [2015, 0.1], [2016, 1.3], [2017, 2.1], [2018, 2.4], [2019, 1.8], [2020, 1.2], [2021, 4.7], [2022, 8.0], [2023, 4.1], [2024, 3.0], [2025.125, 2.7], [2025.375, 2.5], [2025.625, 2.9], [2025.875, 3.0]]
      }
    },

    {
      id: "styringsrente",
      group: "makro",
      title: "Styringsrente",
      short: "Sentralbankrente ved kvartals-/årsslutt",
      unit: "%",
      decimals: 2,
      goodDirection: "neutral",
      goodNote: "Tyskland, Finland og Nederland har euro og deler ECB-renten — linjene overlapper",
      description: "Sentralbankenes styringsrente ved årsslutt (kvartalsslutt fra 2025). Norges Bank holdt renten på 4,5 % lenge etter at nabolandene begynte å kutte, og startet først ned sommeren 2025. Sverige og eurosonen er nær normalnivå; USA kutter forsiktig.",
      source: { name: "Norges Bank / Riksbanken / Nationalbanken / ECB / Federal Reserve", url: "https://www.norges-bank.no/tema/pengepolitikk/Styringsrenten/" },
      series: {
        NOR: [[2000, 7.00], [2001, 6.50], [2002, 6.50], [2003, 2.25], [2004, 1.75], [2005, 2.25], [2006, 3.50], [2007, 5.25], [2008, 3.00], [2009, 1.75], [2010, 2.00], [2011, 1.75], [2012, 1.50], [2013, 1.50], [2014, 1.25], [2015, 0.75], [2016, 0.50], [2017, 0.50], [2018, 0.75], [2019, 1.50], [2020, 0.00], [2021, 0.50], [2022, 2.75], [2023, 4.50], [2024, 4.50], [2025.125, 4.50], [2025.375, 4.25], [2025.625, 4.00], [2025.875, 4.00]],
        SWE: [[2000, 4.00], [2001, 3.75], [2002, 3.75], [2003, 2.75], [2004, 2.00], [2005, 1.50], [2006, 3.00], [2007, 4.00], [2008, 2.00], [2009, 0.25], [2010, 1.25], [2011, 1.75], [2012, 1.00], [2013, 0.75], [2014, 0.00], [2015, -0.35], [2016, -0.50], [2017, -0.50], [2018, -0.25], [2019, 0.00], [2020, 0.00], [2021, 0.00], [2022, 2.50], [2023, 4.00], [2024, 2.50], [2025.125, 2.25], [2025.375, 2.00], [2025.625, 1.75], [2025.875, 1.75]],
        DNK: [[2000, 4.70], [2001, 3.55], [2002, 2.95], [2003, 2.15], [2004, 2.15], [2005, 2.40], [2006, 3.75], [2007, 4.25], [2008, 3.75], [2009, 1.20], [2010, 1.05], [2011, 0.70], [2012, -0.20], [2013, 0.10], [2014, -0.05], [2015, -0.65], [2016, -0.65], [2017, -0.65], [2018, -0.65], [2019, -0.75], [2020, -0.60], [2021, -0.60], [2022, 1.75], [2023, 3.60], [2024, 2.60], [2025.125, 2.10], [2025.375, 1.60], [2025.625, 1.60], [2025.875, 1.60]],
        FIN: [[2000, 4.75], [2001, 3.25], [2002, 2.75], [2003, 2.00], [2004, 2.00], [2005, 2.25], [2006, 3.50], [2007, 4.00], [2008, 2.50], [2009, 1.00], [2010, 1.00], [2011, 1.00], [2012, 0.75], [2013, 0.25], [2014, 0.05], [2015, 0.05], [2016, 0.00], [2017, 0.00], [2018, 0.00], [2019, 0.00], [2020, 0.00], [2021, 0.00], [2022, 2.00], [2023, 4.00], [2024, 3.00], [2025.125, 2.50], [2025.375, 2.00], [2025.625, 2.00], [2025.875, 2.00]],
        NLD: [[2000, 4.75], [2001, 3.25], [2002, 2.75], [2003, 2.00], [2004, 2.00], [2005, 2.25], [2006, 3.50], [2007, 4.00], [2008, 2.50], [2009, 1.00], [2010, 1.00], [2011, 1.00], [2012, 0.75], [2013, 0.25], [2014, 0.05], [2015, 0.05], [2016, 0.00], [2017, 0.00], [2018, 0.00], [2019, 0.00], [2020, 0.00], [2021, 0.00], [2022, 2.00], [2023, 4.00], [2024, 3.00], [2025.125, 2.50], [2025.375, 2.00], [2025.625, 2.00], [2025.875, 2.00]],
        DEU: [[2000, 4.75], [2001, 3.25], [2002, 2.75], [2003, 2.00], [2004, 2.00], [2005, 2.25], [2006, 3.50], [2007, 4.00], [2008, 2.50], [2009, 1.00], [2010, 1.00], [2011, 1.00], [2012, 0.75], [2013, 0.25], [2014, 0.05], [2015, 0.05], [2016, 0.00], [2017, 0.00], [2018, 0.00], [2019, 0.00], [2020, 0.00], [2021, 0.00], [2022, 2.00], [2023, 4.00], [2024, 3.00], [2025.125, 2.50], [2025.375, 2.00], [2025.625, 2.00], [2025.875, 2.00]],
        USA: [[2000, 6.50], [2001, 1.75], [2002, 1.25], [2003, 1.00], [2004, 2.25], [2005, 4.25], [2006, 5.25], [2007, 4.25], [2008, 0.25], [2009, 0.25], [2010, 0.25], [2011, 0.25], [2012, 0.25], [2013, 0.25], [2014, 0.25], [2015, 0.50], [2016, 0.75], [2017, 1.50], [2018, 2.50], [2019, 1.75], [2020, 0.25], [2021, 0.25], [2022, 4.50], [2023, 5.50], [2024, 4.50], [2025.125, 4.50], [2025.375, 4.50], [2025.625, 4.25], [2025.875, 4.00]]
      }
    },

    {
      id: "kronekurs",
      group: "makro",
      title: "Kronekursen",
      short: "Kroner per euro (årssnitt)",
      unit: "kr per euro",
      unitShort: "kr/€",
      decimals: 2,
      goodDirection: "neutral",
      goodNote: "Svak krone gagner eksport, men svekker kjøpekraften",
      norwayOnly: true,
      norwayOnlyReason: "Valutakurser er bilaterale og kan ikke settes på samme akse for flere land — her vises kronen mot euro.",
      description: "Hvor mange kroner en euro koster (årsgjennomsnitt, kvartalssnitt fra 2025). Kronen har svekket seg markant siden oljeprisfallet i 2014 — fra rundt 8 kroner per euro til over 11,5 på det svakeste i 2023–2024, før den tok seg noe inn i 2025.",
      source: { name: "Norges Bank valutakurser", url: "https://www.norges-bank.no/tema/Statistikk/Valutakurser/" },
      series: {
        NOR: [[2000, 8.11], [2001, 8.05], [2002, 7.51], [2003, 8.00], [2004, 8.37], [2005, 8.01], [2006, 8.05], [2007, 8.02], [2008, 8.22], [2009, 8.73], [2010, 8.01], [2011, 7.79], [2012, 7.48], [2013, 7.81], [2014, 8.36], [2015, 8.95], [2016, 9.29], [2017, 9.33], [2018, 9.60], [2019, 9.85], [2020, 10.72], [2021, 10.16], [2022, 10.10], [2023, 11.42], [2024, 11.63], [2025.125, 11.70], [2025.375, 11.50], [2025.625, 11.40], [2025.875, 11.30]]
      }
    },

    {
      id: "off_utgifter",
      group: "makro",
      title: "Offentlige utgifter per innbygger",
      short: "Stat og kommune, USD kjøpekraftsjustert",
      unit: "USD (PPP)",
      unitShort: "USD",
      decimals: 0,
      goodDirection: "neutral",
      goodNote: "Høyt nivå reflekterer både velstand og stor offentlig sektor",
      description: "Offentlig forvaltnings samlede utgifter — stat, kommune og trygdeordninger — per innbygger, kjøpekraftsjustert. Det er det nærmeste man kommer et sammenlignbart «statsbudsjett per innbygger». Norge ligger i verdenstoppen: i underkant av en halv million kroner per innbygger i 2024. USA bruker minst av disse landene, men avstanden har krympet.",
      source: { name: "Eurostat (gov_10a_main) / OECD / SSB offentlig forvaltning", url: "https://ec.europa.eu/eurostat/databrowser/view/gov_10a_main/default/table" },
      series: {
        NOR: [[2000, 16500], [2002, 18000], [2004, 19500], [2006, 21500], [2008, 24000], [2010, 26000], [2012, 28000], [2014, 30000], [2016, 30500], [2018, 33500], [2019, 34500], [2020, 36500], [2021, 38500], [2022, 40000], [2023, 41500], [2024, 43000]],
        SWE: [[2000, 15000], [2002, 16000], [2004, 17000], [2006, 18500], [2008, 20000], [2010, 21500], [2012, 23000], [2014, 24500], [2016, 26500], [2018, 28000], [2019, 29000], [2020, 30500], [2021, 31500], [2022, 32000], [2023, 33000], [2024, 34000]],
        DNK: [[2000, 15500], [2002, 16500], [2004, 18000], [2006, 19500], [2008, 21500], [2010, 23500], [2012, 25000], [2014, 26500], [2016, 28000], [2018, 29500], [2019, 30500], [2020, 32500], [2021, 33500], [2022, 33500], [2023, 34000], [2024, 35500]],
        FIN: [[2000, 13000], [2002, 14500], [2004, 16000], [2006, 17500], [2008, 19500], [2010, 21500], [2012, 23000], [2014, 24500], [2016, 25500], [2018, 27000], [2019, 28000], [2020, 30000], [2021, 31000], [2022, 32500], [2023, 34000], [2024, 35000]],
        NLD: [[2000, 14500], [2002, 16000], [2004, 17000], [2006, 19000], [2008, 21000], [2010, 22500], [2012, 23500], [2014, 24500], [2016, 25500], [2018, 27500], [2019, 28500], [2020, 31500], [2021, 32500], [2022, 33000], [2023, 34500], [2024, 36000]],
        DEU: [[2000, 14000], [2002, 15000], [2004, 16000], [2006, 17500], [2008, 19000], [2010, 21000], [2012, 22500], [2014, 24500], [2016, 26000], [2018, 28000], [2019, 29500], [2020, 32500], [2021, 33500], [2022, 34000], [2023, 35000], [2024, 36500]],
        USA: [[2000, 12000], [2002, 13500], [2004, 14500], [2006, 16000], [2008, 17500], [2010, 19500], [2012, 20500], [2014, 22000], [2016, 23500], [2018, 25500], [2019, 26500], [2020, 28500], [2021, 29500], [2022, 29000], [2023, 30500], [2024, 32000]]
      }
    },

    {
      id: "skattetrykk",
      group: "makro",
      title: "Skattetrykk",
      short: "Skatter og avgifter i % av BNP",
      unit: "% av BNP",
      unitShort: "%",
      decimals: 1,
      goodDirection: "neutral",
      goodNote: "Nivået er et politisk verdivalg — høy skatt finansierer velferd, lav gir rom for privat forbruk",
      description: "Samlede skatter og avgifter — inntektsskatt, moms, arbeidsgiveravgift og alt annet — i prosent av BNP (OECD). Danmark har det høyeste skattetrykket i OECD; Norge ligger rundt 41 %, der petroleumsskatten gir svingninger (toppen i 2022 var gassåret). USA ligger 15 prosentpoeng under Norden.",
      source: { name: "OECD Revenue Statistics (tax-to-GDP)", url: "https://www.oecd.org/en/data/indicators/tax-revenue.html" },
      series: {
        NOR: [[2000, 41.9], [2002, 42.0], [2004, 42.5], [2006, 43.2], [2008, 41.4], [2010, 41.9], [2012, 41.5], [2014, 38.8], [2016, 38.4], [2018, 39.6], [2019, 39.9], [2020, 38.7], [2021, 42.7], [2022, 44.3], [2023, 41.5], [2024, 41.0]],
        SWE: [[2000, 49.0], [2002, 45.4], [2004, 45.6], [2006, 45.9], [2008, 44.0], [2010, 43.2], [2012, 42.6], [2014, 42.6], [2016, 44.0], [2018, 43.9], [2019, 42.8], [2020, 42.5], [2021, 42.6], [2022, 41.3], [2023, 41.0], [2024, 41.4]],
        DNK: [[2000, 46.9], [2002, 46.0], [2004, 47.2], [2006, 47.7], [2008, 46.0], [2010, 44.8], [2012, 45.5], [2014, 48.5], [2016, 45.7], [2018, 44.4], [2019, 46.9], [2020, 46.8], [2021, 46.9], [2022, 41.9], [2023, 43.8], [2024, 44.5]],
        FIN: [[2000, 45.8], [2002, 43.7], [2004, 41.8], [2006, 42.1], [2008, 41.2], [2010, 40.8], [2012, 42.7], [2014, 43.8], [2016, 43.7], [2018, 42.4], [2019, 42.2], [2020, 41.8], [2021, 43.0], [2022, 43.0], [2023, 42.5], [2024, 42.0]],
        NLD: [[2000, 36.9], [2002, 35.4], [2004, 35.0], [2006, 36.0], [2008, 36.2], [2010, 36.2], [2012, 36.0], [2014, 37.5], [2016, 38.4], [2018, 38.8], [2019, 39.3], [2020, 39.7], [2021, 39.7], [2022, 38.0], [2023, 38.6], [2024, 39.0]],
        DEU: [[2000, 36.4], [2002, 34.4], [2004, 33.9], [2006, 34.5], [2008, 35.4], [2010, 35.5], [2012, 36.4], [2014, 36.7], [2016, 37.7], [2018, 38.5], [2019, 38.6], [2020, 37.9], [2021, 39.0], [2022, 39.3], [2023, 38.1], [2024, 38.0]],
        USA: [[2000, 28.3], [2002, 25.0], [2004, 24.6], [2006, 26.6], [2008, 25.4], [2010, 23.5], [2012, 24.0], [2014, 25.9], [2016, 25.9], [2018, 24.9], [2019, 24.9], [2020, 25.7], [2021, 27.6], [2022, 27.7], [2023, 25.2], [2024, 25.5]]
      }
    },

    {
      id: "off_ansatte",
      group: "makro",
      title: "Offentlig ansatte",
      short: "Andel av total sysselsetting",
      unit: "%",
      decimals: 1,
      goodDirection: "neutral",
      goodNote: "Størrelsen på offentlig sektor er et politisk valg",
      description: "Sysselsatte i offentlig forvaltning i prosent av alle sysselsatte (OECD). Norge ligger høyest i OECD — nesten hver tredje jobb er offentlig, mot rundt hver niende i Tyskland og Nederland. Helse og omsorg driver veksten, og andelen øker med aldringen av befolkningen.",
      source: { name: "OECD Government at a Glance / SSB nasjonalregnskap", url: "https://www.oecd.org/en/publications/government-at-a-glance-2023_3d5c5d31-en.html" },
      series: {
        NOR: [[2000, 28.5], [2002, 28.9], [2004, 28.8], [2006, 28.6], [2008, 28.4], [2010, 29.4], [2012, 29.3], [2014, 29.6], [2016, 30.2], [2018, 30.3], [2019, 30.5], [2020, 31.2], [2021, 30.9], [2022, 30.4], [2023, 30.7], [2024, 31.0]],
        SWE: [[2000, 30.0], [2002, 29.8], [2004, 29.5], [2006, 28.9], [2008, 28.3], [2010, 28.1], [2012, 28.2], [2014, 28.4], [2016, 28.8], [2018, 28.7], [2019, 28.6], [2020, 29.2], [2021, 29.3], [2022, 28.9], [2023, 29.0], [2024, 29.1]],
        DNK: [[2000, 29.4], [2002, 29.6], [2004, 29.5], [2006, 28.9], [2008, 28.6], [2010, 29.8], [2012, 29.2], [2014, 28.4], [2016, 28.0], [2018, 27.6], [2019, 27.4], [2020, 28.1], [2021, 28.2], [2022, 27.4], [2023, 27.3], [2024, 27.5]],
        FIN: [[2000, 23.4], [2002, 23.6], [2004, 23.8], [2006, 23.9], [2008, 23.5], [2010, 24.4], [2012, 24.6], [2014, 24.9], [2016, 24.5], [2018, 24.0], [2019, 24.2], [2020, 24.9], [2021, 25.0], [2022, 24.6], [2023, 24.8], [2024, 25.0]],
        NLD: [[2000, 12.6], [2002, 12.9], [2004, 13.0], [2006, 12.8], [2008, 12.6], [2010, 13.1], [2012, 12.9], [2014, 12.6], [2016, 12.2], [2018, 12.0], [2019, 12.0], [2020, 12.4], [2021, 12.5], [2022, 12.6], [2023, 12.8], [2024, 13.0]],
        DEU: [[2000, 11.7], [2002, 11.5], [2004, 11.2], [2006, 10.9], [2008, 10.7], [2010, 10.8], [2012, 10.6], [2014, 10.5], [2016, 10.5], [2018, 10.6], [2019, 10.7], [2020, 11.0], [2021, 11.0], [2022, 11.1], [2023, 11.2], [2024, 11.3]],
        USA: [[2000, 14.8], [2002, 15.3], [2004, 15.2], [2006, 15.0], [2008, 15.3], [2010, 16.0], [2012, 15.4], [2014, 15.0], [2016, 14.9], [2018, 14.8], [2019, 14.7], [2020, 15.2], [2021, 14.6], [2022, 14.4], [2023, 14.5], [2024, 14.6]]
      }
    }
  ]
};
