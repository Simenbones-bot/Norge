/*
 * Lettvekts SVG-grafer for «Norge i tall» — ingen avhengigheter.
 * Eksponerer window.Charts med renderLineChart, renderSparkline og fmt.
 */
window.Charts = (function () {
  "use strict";

  var SVG_NS = "http://www.w3.org/2000/svg";

  /* Norsk tallformat: desimalkomma, smalt hardt mellomrom (U+202F) som tusenskiller. */
  function fmt(value, decimals) {
    if (value === null || value === undefined || isNaN(value)) return "–";
    var d = decimals === undefined ? 1 : decimals;
    var negative = value < 0;
    var s = Math.abs(value).toFixed(d);
    var parts = s.split(".");
    var intPart = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, "\u202F");
    var out = intPart + (parts[1] ? "," + parts[1] : "");
    return (negative ? "−" : "") + out;
  }

  function el(tag, attrs, parent) {
    var node = document.createElementNS(SVG_NS, tag);
    for (var k in attrs) node.setAttribute(k, attrs[k]);
    if (parent) parent.appendChild(node);
    return node;
  }

  /* Avrundede tick-steg: 1, 2, 2.5, 5 × 10^k */
  function niceStep(rawStep) {
    var mag = Math.pow(10, Math.floor(Math.log10(rawStep)));
    var norm = rawStep / mag;
    var step;
    if (norm <= 1) step = 1;
    else if (norm <= 2) step = 2;
    else if (norm <= 2.5) step = 2.5;
    else if (norm <= 5) step = 5;
    else step = 10;
    return step * mag;
  }

  function yTicks(min, max, targetCount) {
    var step = niceStep((max - min) / Math.max(1, targetCount - 1));
    var start = Math.ceil(min / step) * step;
    var ticks = [];
    for (var v = start; v <= max + step * 1e-9; v += step) {
      ticks.push(Math.abs(v) < step * 1e-9 ? 0 : v);
    }
    return ticks;
  }

  function tickDecimals(ticks) {
    var d = 0;
    for (var i = 0; i < ticks.length; i++) {
      var s = String(Math.round(ticks[i] * 1000) / 1000);
      var dot = s.indexOf(".");
      if (dot >= 0) d = Math.max(d, s.length - dot - 1);
    }
    return Math.min(d, 2);
  }

  /*
   * renderLineChart(container, config)
   * config: {
   *   series: [{code, name, flag, color, emphasize, points: [[år, verdi], ...]}],
   *   unit, decimals, height?
   * }
   * Tegner på nytt ved hvert kall (containeren tømmes).
   */
  function renderLineChart(container, config) {
    container.innerHTML = "";
    container.classList.add("chart");

    var series = config.series.filter(function (s) { return s.points.length > 0; });
    if (series.length === 0) {
      var empty = document.createElement("p");
      empty.className = "chart-empty";
      empty.textContent = "Ingen data for valgt utvalg.";
      container.appendChild(empty);
      return;
    }

    var width = Math.max(280, container.clientWidth || 600);
    var height = config.height || 330;
    var decimals = config.decimals === undefined ? 1 : config.decimals;

    var minYear = Infinity, maxYear = -Infinity, minVal = Infinity, maxVal = -Infinity;
    series.forEach(function (s) {
      s.points.forEach(function (p) {
        if (p[0] < minYear) minYear = p[0];
        if (p[0] > maxYear) maxYear = p[0];
        if (p[1] < minVal) minVal = p[1];
        if (p[1] > maxVal) maxVal = p[1];
      });
    });
    if (minYear === maxYear) { minYear -= 1; maxYear += 1; }
    if (minVal === maxVal) { minVal -= 1; maxVal += 1; }
    var pad = (maxVal - minVal) * 0.08;
    var yMin = minVal - pad, yMax = maxVal + pad;

    var ticks = yTicks(yMin, yMax, 6);
    var tDec = tickDecimals(ticks);
    var longestTick = ticks.reduce(function (acc, t) {
      var s = fmt(t, tDec);
      return s.length > acc.length ? s : acc;
    }, "");
    var margin = {
      top: 14,
      right: 14,
      bottom: 26,
      left: Math.max(34, 10 + longestTick.length * 7.2)
    };
    var iw = width - margin.left - margin.right;
    var ih = height - margin.top - margin.bottom;

    function x(year) { return margin.left + ((year - minYear) / (maxYear - minYear)) * iw; }
    function y(val) { return margin.top + (1 - (val - yMin) / (yMax - yMin)) * ih; }

    var svg = el("svg", {
      viewBox: "0 0 " + width + " " + height,
      width: "100%",
      height: height,
      role: "img",
      "aria-label": config.ariaLabel || "Linjediagram"
    });
    container.appendChild(svg);

    /* Rutenett og y-akse */
    ticks.forEach(function (t) {
      var ty = y(t);
      el("line", {
        x1: margin.left, x2: width - margin.right, y1: ty, y2: ty,
        "class": t === 0 ? "grid-line grid-zero" : "grid-line"
      }, svg);
      var label = el("text", { x: margin.left - 7, y: ty + 3.5, "class": "tick-label", "text-anchor": "end" }, svg);
      label.textContent = fmt(t, tDec);
    });

    /* X-akse: årstall */
    var span = maxYear - minYear;
    var xStep = span > 40 ? 10 : span > 18 ? 5 : span > 9 ? 2 : 1;
    for (var yr = Math.ceil(minYear / xStep) * xStep; yr <= maxYear; yr += xStep) {
      var tx = x(yr);
      el("line", { x1: tx, x2: tx, y1: height - margin.bottom, y2: height - margin.bottom + 4, "class": "axis-tick" }, svg);
      var xl = el("text", { x: tx, y: height - 8, "class": "tick-label", "text-anchor": "middle" }, svg);
      xl.textContent = String(yr);
    }

    /* Serier — Norge tegnes sist (øverst) */
    var ordered = series.slice().sort(function (a, b) {
      return (a.emphasize ? 1 : 0) - (b.emphasize ? 1 : 0);
    });
    ordered.forEach(function (s) {
      var dAttr = s.points.map(function (p, i) {
        return (i === 0 ? "M" : "L") + x(p[0]).toFixed(1) + " " + y(p[1]).toFixed(1);
      }).join(" ");
      el("path", {
        d: dAttr,
        fill: "none",
        stroke: s.color,
        "stroke-width": s.emphasize ? 3 : 1.8,
        "stroke-linejoin": "round",
        "stroke-linecap": "round",
        opacity: s.emphasize ? 1 : 0.85
      }, svg);
      var last = s.points[s.points.length - 1];
      el("circle", { cx: x(last[0]), cy: y(last[1]), r: s.emphasize ? 4 : 3, fill: s.color }, svg);
    });

    /* Hover: guidelinje + markører + tooltip */
    var guide = el("line", { y1: margin.top, y2: height - margin.bottom, "class": "guide-line", visibility: "hidden" }, svg);
    var markers = series.map(function (s) {
      return el("circle", { r: 4.5, fill: s.color, stroke: "#fff", "stroke-width": 1.5, visibility: "hidden" }, svg);
    });

    var tooltip = document.createElement("div");
    tooltip.className = "chart-tooltip";
    tooltip.setAttribute("aria-hidden", "true");
    container.appendChild(tooltip);

    var overlay = el("rect", {
      x: margin.left, y: margin.top, width: iw, height: ih,
      fill: "transparent", "class": "chart-overlay"
    }, svg);

    function hideHover() {
      guide.setAttribute("visibility", "hidden");
      markers.forEach(function (m) { m.setAttribute("visibility", "hidden"); });
      tooltip.style.display = "none";
    }

    function showHover(clientX) {
      var rect = svg.getBoundingClientRect();
      var scale = rect.width / width;
      var px = (clientX - rect.left) / scale;
      var year = Math.round(minYear + ((px - margin.left) / iw) * (maxYear - minYear));
      year = Math.min(maxYear, Math.max(minYear, year));

      var rows = [];
      series.forEach(function (s, i) {
        var pt = null;
        for (var j = 0; j < s.points.length; j++) {
          if (s.points[j][0] === year) { pt = s.points[j]; break; }
        }
        if (pt) {
          rows.push({ s: s, v: pt[1] });
          markers[i].setAttribute("cx", x(year));
          markers[i].setAttribute("cy", y(pt[1]));
          markers[i].setAttribute("visibility", "visible");
        } else {
          markers[i].setAttribute("visibility", "hidden");
        }
      });
      if (rows.length === 0) { hideHover(); return; }

      var gx = x(year);
      guide.setAttribute("x1", gx);
      guide.setAttribute("x2", gx);
      guide.setAttribute("visibility", "visible");

      rows.sort(function (a, b) { return b.v - a.v; });
      var html = '<div class="tt-year">' + year + "</div>";
      rows.forEach(function (r) {
        html += '<div class="tt-row' + (r.s.emphasize ? " tt-nor" : "") + '">' +
          '<span class="tt-dot" style="background:' + r.s.color + '"></span>' +
          '<span class="tt-name">' + r.s.flag + " " + r.s.name + "</span>" +
          '<span class="tt-val">' + fmt(r.v, decimals) + "</span></div>";
      });
      tooltip.innerHTML = html;
      tooltip.style.display = "block";

      var cw = container.clientWidth;
      var ttw = tooltip.offsetWidth;
      var leftPx = gx * scale + 12;
      if (leftPx + ttw > cw - 4) leftPx = gx * scale - ttw - 12;
      tooltip.style.left = Math.max(4, leftPx) + "px";
      tooltip.style.top = "10px";
    }

    overlay.addEventListener("pointermove", function (ev) { showHover(ev.clientX); });
    overlay.addEventListener("pointerdown", function (ev) { showHover(ev.clientX); });
    overlay.addEventListener("pointerleave", hideHover);
  }

  /* Liten sparkline til oversiktskortene. */
  function renderSparkline(container, points, color) {
    container.innerHTML = "";
    if (!points || points.length < 2) return;
    var w = 110, h = 34, p = 3;
    var minV = Infinity, maxV = -Infinity;
    points.forEach(function (pt) {
      if (pt[1] < minV) minV = pt[1];
      if (pt[1] > maxV) maxV = pt[1];
    });
    if (minV === maxV) { minV -= 1; maxV += 1; }
    var minY = points[0][0], maxY = points[points.length - 1][0];
    function x(yr) { return p + ((yr - minY) / (maxY - minY)) * (w - 2 * p); }
    function y(v) { return p + (1 - (v - minV) / (maxV - minV)) * (h - 2 * p); }

    var svg = el("svg", { viewBox: "0 0 " + w + " " + h, width: w, height: h, "aria-hidden": "true" });
    var d = points.map(function (pt, i) {
      return (i === 0 ? "M" : "L") + x(pt[0]).toFixed(1) + " " + y(pt[1]).toFixed(1);
    }).join(" ");
    el("path", { d: d, fill: "none", stroke: color, "stroke-width": 1.8, "stroke-linejoin": "round" }, svg);
    var last = points[points.length - 1];
    el("circle", { cx: x(last[0]), cy: y(last[1]), r: 2.6, fill: color }, svg);
    container.appendChild(svg);
  }

  return { renderLineChart: renderLineChart, renderSparkline: renderSparkline, fmt: fmt };
})();
