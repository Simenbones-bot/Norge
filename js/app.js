/*
 * Norge i tall — appen. Bygger oversiktskort, grafseksjoner og kontroller
 * fra window.NORGE_DATA (+ ev. window.NORGE_DATA_OVERRIDES).
 */
(function () {
  "use strict";

  var DATA = window.NORGE_DATA;
  var fmt = window.Charts.fmt;

  /* Maskinhentede serier (scripts/update_data.py) overstyrer basisdata. */
  var overrides = window.NORGE_DATA_OVERRIDES;
  if (overrides && overrides.series) {
    DATA.kpis.forEach(function (kpi) {
      var fresh = overrides.series[kpi.id];
      if (!fresh) return;
      for (var code in fresh) {
        if (fresh[code] && fresh[code].length) kpi.series[code] = fresh[code];
      }
    });
    if (overrides.fetchedAt) DATA.updated = overrides.fetchedAt + " (maskinelt oppdatert)";
  }

  var countryByCode = {};
  DATA.countries.forEach(function (c) { countryByCode[c.code] = c; });

  var state = {
    selected: new Set(DATA.countries.map(function (c) { return c.code; })),
    range: "all" // "10" | "20" | "all"
  };

  function minYearForRange() {
    var now = 0;
    DATA.kpis.forEach(function (kpi) {
      var nor = kpi.series.NOR;
      if (nor && nor.length) now = Math.max(now, nor[nor.length - 1][0]);
    });
    if (state.range === "10") return now - 10;
    if (state.range === "20") return now - 20;
    return -Infinity;
  }

  function visibleSeries(kpi) {
    var from = minYearForRange();
    var out = [];
    DATA.countries.forEach(function (c) {
      if (!state.selected.has(c.code)) return;
      var pts = kpi.series[c.code];
      if (!pts) return;
      var filtered = pts.filter(function (p) { return p[0] >= from; });
      if (filtered.length) {
        out.push({ code: c.code, name: c.name, flag: c.flag, color: c.color, emphasize: !!c.emphasize, points: filtered });
      }
    });
    return out;
  }

  function lastPoint(points) { return points[points.length - 1]; }

  function deltaInfo(kpi) {
    var pts = kpi.series.NOR;
    if (!pts || pts.length < 2) return null;
    var last = pts[pts.length - 1], prev = pts[pts.length - 2];
    var isPercentUnit = kpi.unit.indexOf("%") === 0;
    var text, dir = last[1] > prev[1] ? 1 : last[1] < prev[1] ? -1 : 0;
    if (isPercentUnit) {
      var diff = last[1] - prev[1];
      text = (diff > 0 ? "+" : "") + fmt(diff, 1) + " pp";
    } else {
      var pct = ((last[1] - prev[1]) / Math.abs(prev[1])) * 100;
      text = (pct > 0 ? "+" : "") + fmt(pct, 1) + " %";
    }
    var tone = "neutral";
    if (kpi.goodDirection === "up") tone = dir > 0 ? "good" : dir < 0 ? "bad" : "neutral";
    if (kpi.goodDirection === "down") tone = dir > 0 ? "bad" : dir < 0 ? "good" : "neutral";
    return { text: text + " siden " + prev[0], tone: tone, dir: dir };
  }

  /* Norges plassering blant valgte land i siste år med norske tall. */
  function rankInfo(kpi) {
    if (kpi.norwayOnly || kpi.goodDirection === "neutral") return null;
    var nor = kpi.series.NOR;
    if (!nor || !nor.length) return null;
    var year = lastPoint(nor)[0];
    var entries = [];
    DATA.countries.forEach(function (c) {
      if (!state.selected.has(c.code)) return;
      var pts = kpi.series[c.code];
      if (!pts) return;
      for (var i = pts.length - 1; i >= 0; i--) {
        if (pts[i][0] === year) { entries.push({ code: c.code, value: pts[i][1] }); break; }
      }
    });
    if (entries.length < 2) return null;
    entries.sort(function (a, b) {
      return kpi.goodDirection === "up" ? b.value - a.value : a.value - b.value;
    });
    var rank = entries.findIndex(function (e) { return e.code === "NOR"; }) + 1;
    if (rank === 0) return null;
    var best = kpi.goodDirection === "up" ? "høyest er best" : "lavest er best";
    return { text: "Norge er nr. " + rank + " av " + entries.length + " valgte land i " + year + " (" + best + ").", rank: rank, of: entries.length };
  }

  /* ---------- Kontroller ---------- */

  function buildControls() {
    var countryBox = document.getElementById("country-picker");
    DATA.countries.forEach(function (c) {
      var btn = document.createElement("button");
      btn.type = "button";
      btn.className = "chip" + (c.emphasize ? " chip-locked" : "");
      btn.dataset.code = c.code;
      btn.setAttribute("aria-pressed", "true");
      btn.style.setProperty("--chip-color", c.color);
      btn.innerHTML = '<span class="chip-flag">' + c.flag + "</span>" + c.name;
      if (c.emphasize) {
        btn.title = "Norge vises alltid";
        btn.disabled = true;
      } else {
        btn.addEventListener("click", function () {
          if (state.selected.has(c.code)) state.selected.delete(c.code);
          else state.selected.add(c.code);
          btn.setAttribute("aria-pressed", state.selected.has(c.code) ? "true" : "false");
          btn.classList.toggle("chip-off", !state.selected.has(c.code));
          renderAll();
        });
      }
      countryBox.appendChild(btn);
    });

    var rangeBox = document.getElementById("range-picker");
    [["10", "Siste 10 år"], ["20", "Siste 20 år"], ["all", "Alt"]].forEach(function (opt) {
      var btn = document.createElement("button");
      btn.type = "button";
      btn.className = "range-btn" + (state.range === opt[0] ? " range-active" : "");
      btn.textContent = opt[1];
      btn.addEventListener("click", function () {
        state.range = opt[0];
        rangeBox.querySelectorAll(".range-btn").forEach(function (b) { b.classList.remove("range-active"); });
        btn.classList.add("range-active");
        renderAll();
      });
      rangeBox.appendChild(btn);
    });
  }

  /* ---------- Oversiktskort ---------- */

  function buildCards() {
    var grid = document.getElementById("card-grid");
    grid.innerHTML = "";
    DATA.kpis.forEach(function (kpi) {
      var nor = kpi.series.NOR;
      if (!nor || !nor.length) return;
      var last = lastPoint(nor);
      var delta = deltaInfo(kpi);

      var card = document.createElement("a");
      card.className = "card";
      card.href = "#kpi-" + kpi.id;

      var head = document.createElement("div");
      head.className = "card-title";
      head.textContent = kpi.title;
      card.appendChild(head);

      var valueRow = document.createElement("div");
      valueRow.className = "card-value-row";
      var value = document.createElement("span");
      value.className = "card-value";
      value.textContent = fmt(last[1], kpi.decimals);
      var unit = document.createElement("span");
      unit.className = "card-unit";
      unit.textContent = " " + (kpi.unitShort || kpi.unit);
      valueRow.appendChild(value);
      valueRow.appendChild(unit);
      card.appendChild(valueRow);

      var meta = document.createElement("div");
      meta.className = "card-meta";
      var yearSpan = document.createElement("span");
      yearSpan.className = "card-year";
      yearSpan.textContent = String(last[0]);
      meta.appendChild(yearSpan);
      if (delta) {
        var badge = document.createElement("span");
        badge.className = "delta delta-" + delta.tone;
        badge.textContent = (delta.dir > 0 ? "▲ " : delta.dir < 0 ? "▼ " : "■ ") + delta.text;
        meta.appendChild(badge);
      }
      card.appendChild(meta);

      var spark = document.createElement("div");
      spark.className = "card-spark";
      card.appendChild(spark);
      var sparkFrom = last[0] - 15;
      var sparkPts = nor.filter(function (p) { return p[0] >= sparkFrom; });
      window.Charts.renderSparkline(spark, sparkPts, countryByCode.NOR.color);

      grid.appendChild(card);
    });
  }

  /* ---------- Grafseksjoner ---------- */

  function buildSections() {
    var main = document.getElementById("sections");
    DATA.groups.forEach(function (group) {
      var section = document.createElement("section");
      section.className = "group";
      section.id = "gruppe-" + group.id;

      var h2 = document.createElement("h2");
      h2.textContent = group.title;
      section.appendChild(h2);
      var intro = document.createElement("p");
      intro.className = "group-intro";
      intro.textContent = group.intro;
      section.appendChild(intro);

      DATA.kpis.filter(function (k) { return k.group === group.id; }).forEach(function (kpi) {
        section.appendChild(buildKpiPanel(kpi));
      });
      main.appendChild(section);
    });
  }

  function buildKpiPanel(kpi) {
    var panel = document.createElement("article");
    panel.className = "kpi-panel";
    panel.id = "kpi-" + kpi.id;

    var head = document.createElement("div");
    head.className = "kpi-head";
    var h3 = document.createElement("h3");
    h3.textContent = kpi.title;
    head.appendChild(h3);
    var tag = document.createElement("span");
    tag.className = "kpi-tag " + (kpi.norwayOnly ? "tag-norway" : "tag-compare");
    tag.textContent = kpi.norwayOnly ? "Kun Norge" : "Sammenlignbar";
    head.appendChild(tag);
    panel.appendChild(head);

    var desc = document.createElement("p");
    desc.className = "kpi-desc";
    desc.textContent = kpi.description;
    panel.appendChild(desc);

    if (kpi.norwayOnly && kpi.norwayOnlyReason) {
      var why = document.createElement("p");
      why.className = "kpi-why";
      why.textContent = kpi.norwayOnlyReason;
      panel.appendChild(why);
    }

    var rank = document.createElement("p");
    rank.className = "kpi-rank";
    panel.appendChild(rank);

    var chart = document.createElement("div");
    chart.className = "chart-wrap";
    panel.appendChild(chart);

    var foot = document.createElement("div");
    foot.className = "kpi-foot";
    var src = document.createElement("span");
    src.innerHTML = "Kilde: <a href=\"" + kpi.source.url + "\" target=\"_blank\" rel=\"noopener\">" + kpi.source.name + "</a> · Enhet: " + kpi.unit + (kpi.goodNote ? " · " + kpi.goodNote : "");
    foot.appendChild(src);
    panel.appendChild(foot);

    var details = document.createElement("details");
    details.className = "kpi-table";
    var summary = document.createElement("summary");
    summary.textContent = "Vis tallene som tabell";
    details.appendChild(summary);
    var tableWrap = document.createElement("div");
    tableWrap.className = "table-wrap";
    details.appendChild(tableWrap);
    panel.appendChild(details);

    panel._kpi = kpi;
    panel._chartEl = chart;
    panel._rankEl = rank;
    panel._tableEl = tableWrap;
    return panel;
  }

  function renderPanel(panel) {
    var kpi = panel._kpi;
    var series = visibleSeries(kpi);

    var rank = rankInfo(kpi);
    panel._rankEl.textContent = rank ? rank.text : "";
    panel._rankEl.style.display = rank ? "" : "none";

    window.Charts.renderLineChart(panel._chartEl, {
      series: series,
      unit: kpi.unit,
      decimals: kpi.decimals,
      ariaLabel: kpi.title + " — linjediagram"
    });

    renderTable(panel._tableEl, kpi, series);
  }

  function renderTable(wrap, kpi, series) {
    wrap.innerHTML = "";
    if (!series.length) return;
    var years = {};
    series.forEach(function (s) {
      s.points.forEach(function (p) { years[p[0]] = true; });
    });
    var yearList = Object.keys(years).map(Number).sort(function (a, b) { return b - a; });

    var table = document.createElement("table");
    var thead = document.createElement("thead");
    var hrow = document.createElement("tr");
    var th0 = document.createElement("th");
    th0.textContent = "År";
    hrow.appendChild(th0);
    series.forEach(function (s) {
      var th = document.createElement("th");
      th.textContent = s.flag + " " + s.name;
      hrow.appendChild(th);
    });
    thead.appendChild(hrow);
    table.appendChild(thead);

    var tbody = document.createElement("tbody");
    yearList.forEach(function (yr) {
      var tr = document.createElement("tr");
      var td0 = document.createElement("td");
      td0.textContent = String(yr);
      tr.appendChild(td0);
      series.forEach(function (s) {
        var td = document.createElement("td");
        var pt = null;
        for (var i = 0; i < s.points.length; i++) {
          if (s.points[i][0] === yr) { pt = s.points[i]; break; }
        }
        td.textContent = pt ? fmt(pt[1], kpi.decimals) : "–";
        tr.appendChild(td);
      });
      tbody.appendChild(tr);
    });
    table.appendChild(tbody);
    wrap.appendChild(table);
  }

  function renderAll() {
    document.querySelectorAll(".kpi-panel").forEach(function (panel) { renderPanel(panel); });
  }

  /* ---------- Init ---------- */

  function init() {
    document.getElementById("updated").textContent = "Data per " + DATA.updated;
    buildControls();
    buildCards();
    buildSections();
    renderAll();

    var resizeTimer = null;
    window.addEventListener("resize", function () {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(renderAll, 150);
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
