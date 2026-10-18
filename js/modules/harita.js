/* =========================================================
   harita.js — Etkileşimli Harita (Coğrafya)   (#/atlas, #/atlas/<tr|dunya>/<katman>)

   Türkiye katmanları: İller · Bölgeler · İklim · Akarsular · Göller ·
     Dağlar ve ovalar · Tarım · Madenler
   Dünya katmanları: Ülkeler · Kıtalar · Boğaz ve kanallar
   Kipler:
     • Keşfet: dokun → bilgi kartı
     • Haritada bul: "X nerede?" → haritaya dokun
     • Adını seç: işaretlenen yer için 4 şık
   Sürükleyerek kaydır, tekerlek / iki parmakla ya da +/− ile yakınlaştır.
   Rekorlar: tercih "mapBest".
   Veri: js/data/harita-tr.js, harita-dunya.js (Natural Earth), harita-bilgi.js
   ========================================================= */
(function () {
  const { esc } = App.utils;
  const T = (tr, en) => (App.i18n.lang === "en" ? en : tr);
  const NS = "http://www.w3.org/2000/svg";
  const I = () => App.data.mapInfo;
  const TR = () => App.data.mapTR;
  const W = () => App.data.mapWorld;
  const QN = 10;
  const shuffle = (arr) => { const a = arr.slice(); for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; };
  const bestAll = () => App.prefs.get("mapBest", {}) || {};

  /* ---------------- Projeksiyonlar ---------------- */
  function ptr(lon, lat) { const p = TR().proj; return [(lon - p[0]) * p[2], (p[1] - lat) * p[3]]; }
  function pworld(lon, lat) {
    const A1 = 1.340264, A2 = -0.081106, A3 = 0.000893, A4 = 0.003796, M = Math.sqrt(3) / 2, S = W().scale;
    const lam = lon * Math.PI / 180, th = Math.asin(M * Math.sin(lat * Math.PI / 180)), t2 = th * th, t6 = t2 * t2 * t2;
    const x = 2 * Math.sqrt(3) * lam * Math.cos(th) / (3 * (9 * A4 * t6 * t2 + 7 * A3 * t6 + 3 * A2 * t2 + A1));
    const y = th * (A1 + A2 * t2 + t6 * (A3 + A4 * t2));
    return [x * S + 2.7066 * S, (1.3173 - y) * S];
  }
  const line = (pts, pr) => pts.map((p, i) => { const q = pr(p[0], p[1]); return (i ? "L" : "M") + q[0].toFixed(1) + " " + q[1].toFixed(1); }).join("");

  /* ---------------- Yardımcı bilgiler ---------------- */
  const regionOf = (n) => { const R = I().REG; for (const k in R) if (R[k].il.indexOf(n) >= 0) return k; return null; };
  const climOf = (n) => { const C = I().CLIM; for (const k in C) if (C[k].il && C[k].il.indexOf(n) >= 0) return k; return "karasal"; };
  const provName = (n) => (TR().prov[n - 1] || {}).name || "";
  const plate = (n) => (n < 10 ? "0" : "") + n;

  /* ---------------- Katman tanımları ----------------
     Her katman: { map, label, fill(n|id) → renk, overlays(svg), items() → [{k, name, info, match(k)}] } */
  const LAYERS = {
    tr: [
      { id: "iller", label: () => T("İller", "Provinces"), icon: "map" },
      { id: "bolgeler", label: () => T("Bölgeler", "Regions"), icon: "layers" },
      { id: "iklim", label: () => T("İklim", "Climate"), icon: "sun" },
      { id: "akarsu", label: () => T("Akarsular", "Rivers"), icon: "chart" },
      { id: "goller", label: () => T("Göller", "Lakes"), icon: "circle" },
      { id: "daglar", label: () => T("Dağlar ve ovalar", "Mountains & plains"), icon: "flag" },
      { id: "tarim", label: () => T("Tarım", "Agriculture"), icon: "sun" },
      { id: "maden", label: () => T("Madenler", "Mining"), icon: "database" }
    ],
    dunya: [
      { id: "ulkeler", label: () => T("Ülkeler", "Countries"), icon: "globe" },
      { id: "baskent", label: () => T("Başkentler", "Capitals"), icon: "flag" },
      { id: "kitalar", label: () => T("Kıtalar", "Continents"), icon: "map" },
      { id: "denizler", label: () => T("Okyanus ve denizler", "Oceans & seas"), icon: "circle" },
      { id: "wakarsu", label: () => T("Akarsu ve göller", "Rivers & lakes"), icon: "chart" },
      { id: "fiziki", label: () => T("Dağlar ve çöller", "Mountains & deserts"), icon: "flag" },
      { id: "bogaz", label: () => T("Boğaz ve kanallar", "Straits & canals"), icon: "compass" }
    ]
  };
  const CONT_COL = { "Afrika": "#d9b44a", "Asya": "#d9605a", "Avrupa": "#5b8def", "Kuzey Amerika": "#3fa45b", "Güney Amerika": "#9a6fd6", "Okyanusya": "#2bb3a3" };

  /* ---------------- SVG kurulumu ---------------- */
  function el(tag, attrs, parent) {
    const e = document.createElementNS(NS, tag);
    for (const k in attrs) if (attrs[k] != null) e.setAttribute(k, attrs[k]);
    if (parent) parent.appendChild(e);
    return e;
  }

  function buildTR(svg, layer, st) {
    const d = TR(), info = I();
    el("rect", { x: -400, y: -300, width: d.w + 800, height: d.h + 600, class: "mp-sea" }, svg);
    const gnb = el("g", { class: "mp-nb" }, svg);
    d.nb.forEach((n) => el("path", { d: n.d }, gnb));
    const gp = el("g", { class: "mp-prov" }, svg);
    d.prov.forEach((p) => {
      let fill = null;
      if (layer === "bolgeler") fill = info.REG[regionOf(p.n)].color;
      else if (layer === "iklim") fill = info.CLIM[climOf(p.n)].color;
      const a = el("path", { d: p.d, "data-k": "p" + p.n, class: "mp-p" + (fill ? " is-fill" : "") }, gp);
      if (fill) a.style.setProperty("--f", fill);
    });
    const gl = el("g", { class: "mp-lake" }, svg);
    d.lakes.forEach((l) => el("path", { d: l.d, "data-k": layer === "goller" ? "l:" + l.name : null }, gl));

    const ov = el("g", { class: "mp-ov" }, svg);
    const lab = el("g", { class: "mp-lab" }, svg);
    st.labels = lab;
    // denizler
    [[T("Karadeniz", "Black Sea"), 34.6, 41.95], [T("Akdeniz", "Mediterranean"), 31.6, 36.0], [T("Ege", "Aegean"), 26.05, 38.9], [T("Marmara", "Marmara"), 28.15, 40.72]].forEach(([n, lo, la]) => {
      const q = ptr(lo, la); el("text", { x: q[0], y: q[1], class: "mp-sea-l" }, lab).textContent = n;
    });

    if (layer === "iller") {
      d.prov.forEach((p) => {
        const t = el("text", { x: p.c[0], y: p.c[1], class: "mp-pl", "data-n": p.n }, lab);
        t.textContent = plate(p.n);
        const t2 = el("text", { x: p.c[0], y: p.c[1], class: "mp-pn" }, lab); t2.textContent = p.name;
      });
      [["Bulgaristan", 26.75, 42.05], ["Gürcistan", 42.9, 41.85], ["Ermenistan", 44.55, 40.45], ["Azerbaycan", 44.85, 39.25], ["İran", 44.7, 38.15], ["Irak", 43.2, 36.55], ["Suriye", 38.6, 36.15]].forEach(([n, lo, la]) => {
        const q = ptr(lo, la); el("text", { x: q[0], y: q[1], class: "mp-nb-l" }, lab).textContent = n;
      });
    } else if (layer === "bolgeler" || layer === "iklim") {
      const groups = layer === "bolgeler" ? info.REG : info.CLIM;
      Object.keys(groups).forEach((k) => {
        const ns = d.prov.filter((p) => (layer === "bolgeler" ? regionOf(p.n) : climOf(p.n)) === k);
        if (!ns.length) return;
        const cx = ns.reduce((a, p) => a + p.c[0], 0) / ns.length, cy = ns.reduce((a, p) => a + p.c[1], 0) / ns.length;
        el("text", { x: cx, y: cy, class: "mp-reg-l" }, lab).textContent = groups[k].name;
      });
    } else if (layer === "akarsu") {
      const all = d.rivers.map((r) => ({ name: r.name, d: r.d })).concat(info.RIVERS_X.map((r) => ({ name: r.name, d: line(r.pts, ptr) })));
      all.forEach((r) => {
        el("path", { d: r.d, class: "mp-river" }, ov);
        el("path", { d: r.d, class: "mp-hit", "data-k": "r:" + r.name }, ov);
      });
    } else if (layer === "goller") {
      info.LAKES.forEach((l) => {
        const q = ptr(l[1], l[2]);
        el("circle", { cx: q[0], cy: q[1], r: 4.2, class: "mp-mk mp-mk--lake", "data-k": "l:" + l[0] }, ov);
      });
    } else if (layer === "daglar") {
      info.RANGES.forEach((r) => {
        const dd = line(r[1], ptr);
        el("path", { d: dd, class: "mp-range" }, ov);
        el("path", { d: dd, class: "mp-hit", "data-k": "g:" + r[0] }, ov);
      });
      info.PLAINS.forEach((p) => {
        const q = ptr(p[1], p[2]);
        el("rect", { x: q[0] - 4, y: q[1] - 4, width: 8, height: 8, rx: 1.5, class: "mp-mk mp-mk--plain", "data-k": "o:" + p[0] }, ov);
      });
      info.MOUNTAINS.forEach((m) => {
        const q = ptr(m[1], m[2]), s = 6;
        el("path", { d: "M" + q[0] + " " + (q[1] - s) + "L" + (q[0] + s) + " " + (q[1] + s * 0.7) + "L" + (q[0] - s) + " " + (q[1] + s * 0.7) + "Z", class: "mp-mk mp-mk--mt" + (m[4] === "volkanik" ? " is-volc" : ""), "data-k": "m:" + m[0] }, ov);
      });
    } else if (layer === "tarim" || layer === "maden") {
      const list = layer === "tarim" ? info.CROPS : info.MINES;
      const sel = list[st.sub || 0];
      sel[2].forEach((n) => {
        const a = svg.querySelector('[data-k="p' + n + '"]');
        if (a) { a.classList.add("is-fill"); a.style.setProperty("--f", sel[1]); }
        const p = d.prov[n - 1];
        el("circle", { cx: p.c[0], cy: p.c[1], r: 3.2, class: "mp-dot" }, ov);
        el("text", { x: p.c[0], y: p.c[1] - 6, class: "mp-pn is-on" }, lab).textContent = p.name;
      });
    }
    return { w: d.w, h: d.h };
  }

  function buildWorld(svg, layer) {
    const d = W();
    el("rect", { x: -400, y: -300, width: d.w + 800, height: d.h + 600, class: "mp-sea" }, svg);
    const gs = el("g", { class: "mp-seas" + (layer === "denizler" ? " is-on" : "") }, svg);
    (d.seas || []).forEach((w) => el("path", { d: w.d, "data-k": layer === "denizler" ? "w:" + w.name : null, class: "mp-seapoly" }, gs));
    const gp = el("g", { class: "mp-prov" }, svg);
    d.countries.forEach((c) => {
      const a = el("path", { d: c.d, "data-k": layer === "kitalar" ? "k:" + c.cont : layer === "ulkeler" ? "c:" + c.id : null, class: "mp-p" + (layer === "kitalar" ? " is-fill" : ""), "data-c": c.id }, gp);
      if (layer === "kitalar") a.style.setProperty("--f", CONT_COL[c.cont] || "#888");
      if (c.id === "TUR") a.classList.add("is-home");
    });
    const gl = el("g", { class: "mp-lake" }, svg);
    (d.lakes || []).forEach((l) => el("path", { d: l.d, "data-k": layer === "wakarsu" ? "lk:" + l.name : null }, gl));
    const ov = el("g", { class: "mp-ov" }, svg);
    const lab = el("g", { class: "mp-lab" }, svg);
    if (layer === "kitalar") {
      Object.keys(CONT_COL).forEach((k) => {
        const cs = d.countries.filter((c) => c.cont === k);
        const big = cs.slice().sort((a, b) => b.d.length - a.d.length).slice(0, 6);
        const cx = big.reduce((a, c) => a + c.c[0], 0) / big.length, cy = big.reduce((a, c) => a + c.c[1], 0) / big.length;
        el("text", { x: cx, y: cy, class: "mp-reg-l" }, lab).textContent = k;
      });
    } else if (layer === "ulkeler") {
      d.countries.forEach((c) => {
        if (c.capC) el("circle", { cx: c.capC[0], cy: c.capC[1], r: 1.6, class: "mp-cap" }, ov);
        const t = el("text", { x: c.c[0], y: c.c[1], class: "mp-pn mp-pn--w" + (c.d.length > 6000 ? " is-big" : "") }, lab); t.textContent = c.name;
      });
    } else if (layer === "baskent") {
      d.countries.forEach((c) => {
        if (!c.capC) return;
        el("circle", { cx: c.capC[0], cy: c.capC[1], r: 2.6, class: "mp-mk mp-mk--cap", "data-k": "b:" + c.id }, ov);
        el("text", { x: c.capC[0] + 4, y: c.capC[1] - 3, class: "mp-pn mp-pn--s" }, lab).textContent = c.cap;
      });
    } else if (layer === "denizler") {
      const seen = {};
      (d.seas || []).forEach((w) => {
        if (seen[w.name] || w.cls !== "ocean" && w.d.length < 1500) return; seen[w.name] = 1;
        el("text", { x: w.c[0], y: w.c[1], class: w.cls === "ocean" ? "mp-sea-l mp-sea-l--o" : "mp-sea-l" }, lab).textContent = w.name;
      });
    } else if (layer === "wakarsu") {
      (d.rivers || []).forEach((r) => {
        el("path", { d: r.d, class: "mp-river" }, ov);
        el("path", { d: r.d, class: "mp-hit", "data-k": "wr:" + r.name }, ov);
      });
    } else if (layer === "fiziki") {
      const gph = el("g", { class: "mp-phys" }, ov);
      (d.phys || []).forEach((f) => {
        el("path", { d: f.d, class: "mp-phys-" + (f.cls === "Desert" ? "desert" : f.cls === "Range/mtn" ? "range" : "plain"), "data-k": "f:" + f.name }, gph);
        el("text", { x: f.c[0], y: f.c[1], class: "mp-pn mp-pn--s mp-pn--c" }, lab).textContent = f.name;
      });
      (d.peaks || []).forEach((k) => {
        const q = k.c, s2 = 4.5;
        el("path", { d: "M" + q[0] + " " + (q[1] - s2) + "L" + (q[0] + s2) + " " + (q[1] + s2 * 0.7) + "L" + (q[0] - s2) + " " + (q[1] + s2 * 0.7) + "Z", class: "mp-mk mp-mk--mt" + (k.el < 0 ? " is-low" : ""), "data-k": "pk:" + k.name }, ov);
      });
      (d.points || []).forEach((k) => el("circle", { cx: k.c[0], cy: k.c[1], r: 2.8, class: "mp-mk mp-mk--" + (k.cls === "waterfall" ? "fall" : "cape"), "data-k": "pt:" + k.name }, ov));
    } else if (layer === "bogaz") {
      I().STRAITS.forEach((s) => {
        const q = pworld(s[1], s[2]);
        el("circle", { cx: q[0], cy: q[1], r: 3.4, class: "mp-mk mp-mk--strait", "data-k": "s:" + s[0] }, ov);
        el("text", { x: q[0] + 5, y: q[1] - 4, class: "mp-pn mp-pn--s" }, lab).textContent = s[0];
      });
    }
    return { w: d.w, h: d.h };
  }

  /* ---------------- Bilgi kartları ---------------- */
  const nf = (n) => Number(n).toLocaleString(App.i18n.lang === "en" ? "en-US" : "tr-TR");
  const SEA = { K: () => T("Karadeniz", "Black Sea"), M: () => T("Marmara Denizi", "Sea of Marmara"), E: () => T("Ege Denizi", "Aegean Sea"), A: () => T("Akdeniz", "Mediterranean") };
  let ranks = null;
  function rankOf(n, idx) {
    const D = App.data.iller || {};
    if (!ranks) {
      ranks = [{}, {}];
      [0, 1].forEach((j) => Object.keys(D).map(Number).sort((a, b) => D[b][j] - D[a][j]).forEach((k, i) => { ranks[j][k] = i + 1; }));
    }
    return ranks[idx][n];
  }
  const row = (k, v) => v ? "<div><dt>" + esc(k) + "</dt><dd>" + v + "</dd></div>" : "";
  const chips = (list) => '<div class="mp-chipsx">' + list.map(([k, n]) => '<button type="button" class="mp-goto" data-goto="' + esc(k) + '">' + esc(n) + "</button>").join("") + "</div>";
  function provHtml(p) {
    const info = I(), D = (App.data.iller || {})[p.n] || [];
    const rec = (App.data.illerRekor || {})[p.n];
    const pop = D[0], area = D[1];
    const coast = (D[3] || "").split(/,\s*/).filter(Boolean).map((c) => SEA[c] ? SEA[c]() : c).join(", ");
    const crops = info.CROPS.filter((x) => x[2].indexOf(p.n) >= 0).map((x) => x[0]), mines = info.MINES.filter((x) => x[2].indexOf(p.n) >= 0).map((x) => x[0]);
    return (rec ? '<span class="mp-badge">' + App.icon("star") + esc(rec) + "</span>" : "") +
      '<dl class="mp-dl">' +
      row(T("Plaka", "Plate"), plate(p.n)) +
      row(T("Bölge", "Region"), esc(info.REG[regionOf(p.n)].name)) +
      (D[2] && D[2] !== p.name ? row(T("İl merkezi", "Capital city"), esc(D[2])) : "") +
      (pop ? row(T("Nüfus (2024)", "Population (2024)"), nf(pop) + ' <small>' + esc(T(rankOf(p.n, 0) + ". sırada", "#" + rankOf(p.n, 0))) + "</small>") : "") +
      (area ? row(T("Yüzölçümü", "Area"), nf(area) + " km² <small>" + esc(T(rankOf(p.n, 1) + ". sırada", "#" + rankOf(p.n, 1))) + "</small>") : "") +
      (pop && area ? row(T("Yoğunluk", "Density"), nf(Math.round(pop / area)) + T(" kişi/km²", " per km²")) : "") +
      row(T("Kıyısı", "Coast"), coast ? esc(coast) : esc(T("Denize kıyısı yok", "Landlocked"))) +
      row(T("İklim", "Climate"), esc(info.CLIM[climOf(p.n)].name)) +
      (crops.length ? row(T("Tarım", "Crops"), esc(crops.join(", "))) : "") +
      (mines.length ? row(T("Maden / enerji", "Mining / energy"), esc(mines.join(", "))) : "") +
      "</dl>" +
      (D[4] ? '<p class="mp-note">' + esc(D[4]) + "</p>" : "") +
      (p.nb && p.nb.length ? '<p class="mp-info__k">' + esc(T("Komşu iller", "Neighbouring provinces")) + " (" + p.nb.length + ")</p>" + chips(p.nb.map((x) => ["p" + x, provName(x)])) : "");
  }
  function countryHtml(c) {
    const byId = {}; W().countries.forEach((x) => { byId[x.id] = x; });
    const note = (App.data.ulkeNot || {})[c.id];
    const popTxt = c.pop ? (c.pop >= 1e6 ? (App.i18n.lang === "en" ? (c.pop / 1e6).toFixed(1) + " million" : (c.pop / 1e6).toLocaleString("tr-TR", { maximumFractionDigits: 1 }) + " milyon") : nf(c.pop)) + (c.popY ? " <small>(" + c.popY + ")</small>" : "") : "";
    return '<dl class="mp-dl">' +
      row(T("Başkent", "Capital"), c.cap ? esc(c.cap) : "") +
      row(T("Kıta", "Continent"), esc(c.cont)) +
      row(T("Bölge", "Region"), esc(c.sub || "")) +
      row(T("Nüfus", "Population"), popTxt) + "</dl>" +
      (note ? '<p class="mp-note">' + esc(note) + "</p>" : "") +
      (c.nb && c.nb.length ? '<p class="mp-info__k">' + esc(T("Kara komşuları", "Land neighbours")) + " (" + c.nb.length + ")</p>" + chips(c.nb.filter((x) => byId[x]).map((x) => ["c:" + x, byId[x].name]))
        : '<p class="hint">' + esc(T("Kara sınırı komşusu yok.", "No land neighbours.")) + "</p>");
  }

  /* ---------------- Öğeler (keşif bilgisi + sınav havuzu) ---------------- */
  function items(map, layer, st) {
    const info = I();
    if (map === "tr") {
      if (layer === "iller") return TR().prov.map((p) => ({ k: "p" + p.n, name: p.name, sub: plate(p.n) + " · " + info.REG[regionOf(p.n)].name + T(" Bölgesi", " Region"),
        info: info.CLIM[climOf(p.n)].name + "." + extraOf(p.n), html: () => provHtml(p) }));
      if (layer === "bolgeler") return Object.keys(info.REG).map((k) => ({ k: "reg:" + k, name: info.REG[k].name + T(" Bölgesi", " Region"), sub: info.REG[k].il.length + T(" il", " provinces"), info: info.REG_INFO[k], match: (x) => /^p\d+$/.test(x) && regionOf(+x.slice(1)) === k }));
      if (layer === "iklim") return Object.keys(info.CLIM).map((k) => ({ k: "cl:" + k, name: info.CLIM[k].name, sub: T("İl düzeyinde sadeleştirilmiştir", "Simplified by province"), info: info.CLIM[k].info, match: (x) => /^p\d+$/.test(x) && climOf(+x.slice(1)) === k }));
      if (layer === "akarsu") return TR().rivers.map((r) => r.name).concat(info.RIVERS_X.map((r) => r.name)).filter((v, i, a) => a.indexOf(v) === i)
        .map((n) => ({ k: "r:" + n, name: n, sub: T("Akarsu", "River"), info: info.RIVER_INFO[n] || "" }));
      if (layer === "goller") return info.LAKES.map((l) => ({ k: "l:" + l[0], name: l[0], sub: T("Oluşum: ", "Origin: ") + l[3], info: l[4] }));
      if (layer === "daglar") return info.MOUNTAINS.map((m) => ({ k: "m:" + m[0], name: m[0], sub: m[3].toLocaleString("tr-TR") + " m · " + m[4], info: m[5] }))
        .concat(info.RANGES.map((r) => ({ k: "g:" + r[0], name: r[0], sub: T("Sıradağ", "Mountain range"), info: r[2] })))
        .concat(info.PLAINS.map((p) => ({ k: "o:" + p[0], name: p[0], sub: p[3], info: p[4] })));
      if (layer === "tarim" || layer === "maden") {
        const list = layer === "tarim" ? info.CROPS : info.MINES;
        return list.map((c, i) => ({ k: "x:" + i, name: c[0], sub: c[2].map(provName).join(", "), info: c[3], match: (x) => /^p\d+$/.test(x) && c[2].indexOf(+x.slice(1)) >= 0, idx: i }));
      }
    } else {
      const N = App.data;
      if (layer === "ulkeler") return W().countries.map((c) => ({ k: "c:" + c.id, name: c.name, sub: c.cont + (c.sub ? " · " + c.sub : ""), info: "", size: c.d.length, html: () => countryHtml(c) }));
      if (layer === "baskent") return W().countries.filter((c) => c.capC && c.cap).map((c) => ({ k: "b:" + c.id, name: c.cap, sub: T("Başkenti olduğu ülke: ", "Capital of ") + c.name, info: (N.ulkeNot || {})[c.id] || "", size: c.d.length }));
      if (layer === "denizler") return (W().seas || []).map((w) => w.name).filter((v, i, a) => a.indexOf(v) === i).map((n) => {
        const w = W().seas.find((x) => x.name === n);
        return { k: "w:" + n, name: n, sub: w.cls === "ocean" ? T("Okyanus", "Ocean") : /körfez/i.test(n) ? T("Körfez", "Gulf / bay") : T("Deniz", "Sea"), info: (N.denizNot || {})[n] || "" };
      });
      if (layer === "wakarsu") return (W().rivers || []).map((r) => ({ k: "wr:" + r.name, name: r.name, sub: T("Akarsu", "River"), info: (N.akarsuNot || {})[r.name] || "" }))
        .concat((W().lakes || []).map((l) => l.name).filter((v, i, a) => a.indexOf(v) === i).map((n) => ({ k: "lk:" + n, name: n, sub: T("Göl", "Lake"), info: (N.golNot || {})[n] || "" })));
      if (layer === "fiziki") return (W().phys || []).map((f) => ({ k: "f:" + f.name, name: f.name, sub: { Desert: T("Çöl", "Desert"), "Range/mtn": T("Sıradağ", "Mountain range"), Plateau: T("Plato", "Plateau"), Plain: T("Ova / bozkır", "Plain"), Basin: T("Havza", "Basin") }[f.cls] || "", info: "" }))
        .concat((W().peaks || []).map((k) => ({ k: "pk:" + k.name, name: k.name, sub: nf(k.el) + " m", info: k.el < 0 ? T("Deniz seviyesinin altındaki çukur alan.", "Depression below sea level.") : "" })))
        .concat((W().points || []).map((k) => ({ k: "pt:" + k.name, name: k.name, sub: k.cls === "waterfall" ? T("Şelale", "Waterfall") : T("Burun", "Cape"), info: "" })));
      if (layer === "kitalar") return Object.keys(CONT_COL).map((k) => ({ k: "k:" + k, name: k, sub: W().countries.filter((c) => c.cont === k).length + T(" ülke (haritada)", " countries (on map)"), info: "" }));
      if (layer === "bogaz") return info.STRAITS.map((s) => ({ k: "s:" + s[0], name: s[0], sub: T("Boğaz / kanal", "Strait / canal"), info: s[3] }));
    }
    return [];
  }
  function extraOf(n) {
    const info = I(), c = info.CROPS.filter((x) => x[2].indexOf(n) >= 0).map((x) => x[0]), m = info.MINES.filter((x) => x[2].indexOf(n) >= 0).map((x) => x[0]);
    return (c.length ? " " + T("Öne çıkan ürünler: ", "Key crops: ") + c.join(", ") + "." : "") + (m.length ? " " + T("Maden/enerji: ", "Mining/energy: ") + m.join(", ") + "." : "");
  }

  /* ---------------- Sayfa ---------------- */
  /* ---------------- Veriyi yalnızca harita açılınca yükle ---------------- */
  const SRC = ["js/data/harita-tr.js", "js/data/harita-dunya.js", "js/data/iller.js", "js/data/ulkeler.js"];
  let loading = null;
  const ready = () => !!(App.data.mapTR && App.data.mapWorld && App.data.iller && App.data.ulkeNot);
  function loadData() {
    if (ready()) return Promise.resolve();
    if (loading) return loading;
    loading = SRC.reduce((pr, src) => pr.then(() => new Promise((res, rej) => {
      const s = document.createElement("script"); s.src = src; s.onload = res; s.onerror = () => rej(new Error(src)); document.head.appendChild(s);
    })), Promise.resolve()).catch((e) => { loading = null; throw e; });
    return loading;
  }
  function render(view, params) {
    if (!ready()) {
      App.setTitle(T("Etkileşimli Harita", "Interactive Map"));
      view.innerHTML = '<div class="page mp-page"><div class="card quiz-loading"><div class="stage"><span class="spinner"></span>' + App.icon("globe") + "<span>" + esc(T("Harita yükleniyor…", "Loading map…")) + "</span></div></div></div>";
      App.hydrateIcons(view);
      const h = location.hash;
      loadData().then(() => { if (location.hash === h) render(view, params); })
        .catch(() => { if (location.hash === h) view.innerHTML = App.ui.empty("globe", T("Harita verisi yüklenemedi", "Could not load map data"), T("Sayfayı yenileyip tekrar dene.", "Reload and try again.")); });
      return;
    }
    const map = params[0] === "dunya" ? "dunya" : "tr";
    const layers = LAYERS[map];
    const layer = layers.some((l) => l.id === params[1]) ? params[1] : layers[0].id;
    App.setTitle(T("Etkileşimli Harita", "Interactive Map"));
    const st = { map, layer, mode: "explore", sub: 0, vb: null, quiz: null };
    const ldef = layers.find((l) => l.id === layer);
    const best = bestAll();

    view.innerHTML = '<div class="page mp-page" data-map="' + map + '">' +
      '<div class="page-head"><div><h1>' + esc(T("Etkileşimli Harita", "Interactive Map")) + "</h1><p>" +
        esc(T("Türkiye ve dünya haritasında keşfet, sonra kendini sına. Dokunduğun yerin bilgisi aşağıda çıkar.", "Explore Turkey and the world, then test yourself. Tap anything to see its info.")) + "</p></div></div>" +
      '<div class="mp-top"><div class="mp-seg" role="tablist">' +
        '<a class="mp-seg__b' + (map === "tr" ? " is-on" : "") + '" href="#/atlas/tr">' + esc(T("Türkiye", "Turkey")) + "</a>" +
        '<a class="mp-seg__b' + (map === "dunya" ? " is-on" : "") + '" href="#/atlas/dunya">' + esc(T("Dünya", "World")) + "</a></div>" +
        '<div class="mp-modes mp-seg" role="group">' +
          '<button type="button" class="mp-seg__b is-on" data-mode="explore">' + esc(T("Keşfet", "Explore")) + "</button>" +
          '<button type="button" class="mp-seg__b" data-mode="find">' + esc(T("Haritada bul", "Find on map")) + "</button>" +
          '<button type="button" class="mp-seg__b" data-mode="name">' + esc(T("Adını seç", "Name it")) + "</button></div></div>" +
      '<div class="mp-layers mp-chips">' + layers.map((l) => '<a class="mp-chip' + (l.id === layer ? " is-on" : "") + '" href="#/atlas/' + map + "/" + l.id + '">' + esc(l.label()) +
        (best[map + "/" + l.id] ? ' <span class="mp-best">' + App.icon("star") + best[map + "/" + l.id] + "</span>" : "") + "</a>").join("") + "</div>" +
      (layer === "tarim" || layer === "maden" ? '<div class="mp-sub mp-chips mp-chips--sm">' + (layer === "tarim" ? I().CROPS : I().MINES).map((c, i) =>
        '<button type="button" class="mp-chip' + (i === 0 ? " is-on" : "") + '" data-sub="' + i + '"><i class="mp-sw" style="background:' + c[1] + '"></i>' + esc(c[0]) + "</button>").join("") + "</div>" : "") +
      '<div class="mp-wrap"><div class="mp-stage" id="mpStage"><svg class="mp-svg" id="mpSvg" role="img" aria-label="' + esc(T("Harita", "Map")) + '"></svg>' +
        '<div class="mp-ctrl"><button type="button" class="icon-btn" data-z="in" aria-label="' + esc(T("Yakınlaştır", "Zoom in")) + '">' + App.icon("plus") + '</button>' +
        '<button type="button" class="icon-btn" data-z="out" aria-label="' + esc(T("Uzaklaştır", "Zoom out")) + '"><span class="mp-minus">−</span></button>' +
        '<button type="button" class="icon-btn" data-z="reset" aria-label="' + esc(T("Sıfırla", "Reset")) + '">' + App.icon("refresh") + "</button></div>" +
        '<div class="mp-q" id="mpQ" hidden></div></div>' +
        '<aside class="mp-side"><div class="card mp-info" id="mpInfo"></div>' + legendHtml(map, layer) + "</aside></div>" +
      '<p class="hint mp-src">' + esc(T("Sınırlar, büyük akarsular ve göller: Natural Earth (kamu malı). Diğer çizgi ve noktalar ders kitabı düzeyinde yaklaşık konumlardır; iklim il düzeyinde sadeleştirilmiştir.", "Borders, major rivers and lakes: Natural Earth (public domain). Other lines and points are approximate; climate is simplified by province.")) + "</p>" +
      "</div>";
    App.hydrateIcons(view);

    const svg = view.querySelector("#mpSvg");
    const infoBox = view.querySelector("#mpInfo");
    const qBox = view.querySelector("#mpQ");
    let dims, list;

    function draw() {
      svg.innerHTML = "";
      dims = map === "tr" ? buildTR(svg, layer, st) : buildWorld(svg, layer);
      list = items(map, layer, st);
      if (!st.vb) st.vb = { x: 0, y: 0, w: dims.w, h: dims.h };
      applyVB();
      svg.classList.toggle("is-quiz", st.mode !== "explore");
    }
    function applyVB() {
      const v = st.vb;
      svg.setAttribute("viewBox", v.x.toFixed(1) + " " + v.y.toFixed(1) + " " + v.w.toFixed(1) + " " + v.h.toFixed(1));
      const z = dims.w / v.w;
      svg.style.setProperty("--z", z);
      svg.classList.toggle("is-z2", z >= 1.9);
      svg.classList.toggle("is-z4", z >= 3.8);
    }
    function zoomAt(f, cx, cy) {
      const v = st.vb, nw = Math.max(dims.w / 14, Math.min(dims.w * 1.05, v.w / f));
      const k = nw / v.w;
      if (cx == null) { cx = v.x + v.w / 2; cy = v.y + v.h / 2; }
      st.vb = { x: cx - (cx - v.x) * k, y: cy - (cy - v.y) * k, w: nw, h: v.h * k };
      clampVB(); applyVB();
    }
    function clampVB() {
      const v = st.vb, mx = v.w * 0.5, my = v.h * 0.5;
      v.x = Math.max(-mx, Math.min(dims.w - v.w + mx, v.x));
      v.y = Math.max(-my, Math.min(dims.h - v.h + my, v.y));
    }
    function toSvg(cx, cy) {
      const r = svg.getBoundingClientRect(), v = st.vb;
      // preserveAspectRatio xMidYMid meet
      const s = Math.min(r.width / v.w, r.height / v.h), ox = (r.width - v.w * s) / 2, oy = (r.height - v.h * s) / 2;
      return [v.x + (cx - r.left - ox) / s, v.y + (cy - r.top - oy) / s, s];
    }

    /* --- Sürükle / yakınlaştır / dokun --- */
    const ptrs = new Map();
    let drag = null, pinch = null, moved = false;
    svg.addEventListener("pointerdown", (e) => {
      svg.setPointerCapture(e.pointerId);
      ptrs.set(e.pointerId, [e.clientX, e.clientY]);
      moved = false;
      if (ptrs.size === 1) drag = { x: e.clientX, y: e.clientY, vb: Object.assign({}, st.vb), target: e.target };
      else if (ptrs.size === 2) { const [a, b] = Array.from(ptrs.values()); pinch = { d: Math.hypot(a[0] - b[0], a[1] - b[1]), vb: Object.assign({}, st.vb) }; drag = null; moved = true; }
    });
    svg.addEventListener("pointermove", (e) => {
      if (!ptrs.has(e.pointerId)) return;
      ptrs.set(e.pointerId, [e.clientX, e.clientY]);
      if (pinch && ptrs.size === 2) {
        const [a, b] = Array.from(ptrs.values());
        const dd = Math.hypot(a[0] - b[0], a[1] - b[1]);
        const c = toSvg((a[0] + b[0]) / 2, (a[1] + b[1]) / 2);
        st.vb = Object.assign({}, st.vb);
        zoomAt(dd / (pinch.d || 1), c[0], c[1]);
        pinch.d = dd;
      } else if (drag) {
        const dx = e.clientX - drag.x, dy = e.clientY - drag.y;
        if (Math.abs(dx) + Math.abs(dy) > 6) moved = true;
        if (!moved) return;
        const s = toSvg(0, 0)[2];
        st.vb = { x: drag.vb.x - dx / s, y: drag.vb.y - dy / s, w: drag.vb.w, h: drag.vb.h };
        clampVB(); applyVB();
      }
    });
    const up = (e) => {
      ptrs.delete(e.pointerId);
      if (ptrs.size < 2) pinch = null;
      if (drag && !moved && ptrs.size === 0) tap(drag.target, e);
      if (ptrs.size === 0) drag = null;
    };
    svg.addEventListener("pointerup", up);
    svg.addEventListener("pointercancel", (e) => { ptrs.delete(e.pointerId); drag = null; pinch = null; });
    svg.addEventListener("wheel", (e) => { e.preventDefault(); const c = toSvg(e.clientX, e.clientY); zoomAt(e.deltaY < 0 ? 1.25 : 0.8, c[0], c[1]); }, { passive: false });
    svg.addEventListener("dblclick", (e) => { const c = toSvg(e.clientX, e.clientY); zoomAt(2, c[0], c[1]); });
    view.querySelectorAll("[data-z]").forEach((b) => b.addEventListener("click", () => {
      if (b.dataset.z === "reset") { st.vb = { x: 0, y: 0, w: dims.w, h: dims.h }; applyVB(); }
      else zoomAt(b.dataset.z === "in" ? 1.6 : 0.625);
    }));

    /** Dokunulan öğenin anahtarı (ilk data-k'lı ata) */
    function keyOf(t) { while (t && t !== svg) { if (t.getAttribute && t.getAttribute("data-k")) return t.getAttribute("data-k"); t = t.parentNode; } return null; }

    function tap(target) {
      const k = keyOf(target);
      if (st.mode === "find" && st.quiz) return answerFind(k);
      if (st.mode !== "explore" || !k) return;
      const it = findItem(k);
      if (!it) return;
      select(k);
      showInfo(it);
    }
    function findItem(k) {
      return list.find((x) => x.k === k) || list.find((x) => x.match && x.match(k));
    }
    function select(k) {
      svg.querySelectorAll(".is-sel").forEach((x) => x.classList.remove("is-sel"));
      const it = findItem(k);
      const keys = it && it.match ? Array.from(svg.querySelectorAll("[data-k]")).filter((x) => it.match(x.getAttribute("data-k"))) : svg.querySelectorAll('[data-k="' + cssq(k) + '"]');
      Array.from(keys).forEach((x) => x.classList.add("is-sel"));
    }
    const cssq = (s) => String(s).replace(/["\\]/g, "\\$&");
    function showInfo(it) {
      const body = it.html && (st.mode === "explore" || (st.quiz && st.quiz.lock)) ? it.html() : (it.info ? "<p>" + esc(it.info) + "</p>" : "");
      infoBox.innerHTML = "<h3>" + esc(it.name) + '</h3><p class="mp-info__sub">' + esc(it.sub || "") + "</p>" + body;
      App.hydrateIcons(infoBox);
      infoBox.querySelectorAll("[data-goto]").forEach((b) => b.addEventListener("click", () => {
        if (st.mode !== "explore") return;
        const k = b.dataset.goto, x = findItem(k);
        if (!x) return;
        select(k); showInfo(x); focusKey(k);
      }));
    }
    /** Seçilen öğe görünür alanda değilse haritayı ona kaydır */
    function focusKey(k) {
      const e = svg.querySelector('[data-k="' + cssq(k) + '"]'); if (!e || !e.getBBox) return;
      const b = e.getBBox(), v = st.vb, cx = b.x + b.width / 2, cy = b.y + b.height / 2;
      if (cx > v.x && cx < v.x + v.w && cy > v.y && cy < v.y + v.h) return;
      st.vb = { x: cx - v.w / 2, y: cy - v.h / 2, w: v.w, h: v.h }; clampVB(); applyVB();
    }
    function idleInfo() {
      infoBox.innerHTML = "<h3>" + esc(ldef.label()) + '</h3><p class="hint">' + esc(st.mode === "explore"
        ? T("Haritada bir yere dokun; bilgisi burada görünür. ", "Tap something on the map to see its info. ") + list.length + T(" öğe var.", " items.")
        : T("Sınav başladı: soruyu haritanın üstünde görüyorsun.", "Quiz started: the question is shown above the map.")) + "</p>";
    }

    /* --- Sınav --- */
    function quizPool() {
      let pool = list.slice();
      if (map === "dunya" && (layer === "ulkeler" || layer === "baskent")) pool = pool.filter((x) => x.size > (st.mode === "find" ? 1400 : 900));   // çok küçük ülkeler dokunması zor
      return pool;
    }
    function startQuiz(mode) {
      st.mode = mode;
      view.querySelectorAll("[data-mode]").forEach((b) => b.classList.toggle("is-on", b.dataset.mode === mode));
      svg.querySelectorAll(".is-sel,.is-ok,.is-bad,.is-ans,.is-q").forEach((x) => x.classList.remove("is-sel", "is-ok", "is-bad", "is-ans", "is-q"));
      svg.classList.toggle("is-quiz", mode !== "explore");
      if (mode === "explore") { st.quiz = null; qBox.hidden = true; idleInfo(); return; }
      const pool = quizPool();
      const qs = shuffle(pool).slice(0, Math.min(QN, pool.length));
      st.quiz = { qs, i: 0, score: 0, tries: 0, lock: false, pool };
      idleInfo();
      ask();
    }
    function elsFor(it) {
      if (it.match) return Array.from(svg.querySelectorAll("[data-k]")).filter((x) => it.match(x.getAttribute("data-k")));
      return Array.from(svg.querySelectorAll('[data-k="' + cssq(it.k) + '"]'));
    }
    function clearMarks() { svg.querySelectorAll(".is-ok,.is-bad,.is-ans,.is-q,.is-sel").forEach((x) => x.classList.remove("is-ok", "is-bad", "is-ans", "is-q", "is-sel")); }
    function head() { const q = st.quiz; return '<span class="mp-q__n">' + (q.i + 1) + "/" + q.qs.length + '</span><span class="mp-q__s">' + App.icon("star") + q.score + "</span>"; }
    function ask() {
      const q = st.quiz; clearMarks(); q.tries = 0; q.lock = false;
      if (q.i >= q.qs.length) return finish();
      const it = q.qs[q.i];
      qBox.hidden = false;
      if (st.mode === "find") {
        const what = layer === "tarim" || layer === "maden" ? T(it.name + " — öne çıkan bir il bul", "Find a top province for " + it.name) : it.name;
        qBox.innerHTML = head() + '<span class="mp-q__t">' + esc(T("Bul: ", "Find: ")) + "<b>" + esc(what) + "</b></span>" + '<button type="button" class="btn btn--sm btn--ghost" data-skip>' + esc(T("Göster", "Show")) + "</button>";
        qBox.querySelector("[data-skip]").addEventListener("click", () => reveal(false));
      } else {
        elsFor(it).forEach((x) => x.classList.add("is-q"));
        const opts = shuffle([it].concat(shuffle(q.pool.filter((x) => x.k !== it.k)).slice(0, 3)));
        qBox.innerHTML = head() + '<span class="mp-q__t">' + esc(layer === "tarim" || layer === "maden" ? T("İşaretli illerde hangisi öne çıkar?", "What stands out in the marked provinces?") : T("İşaretli yer neresi?", "What is the marked place?")) + '</span><div class="mp-q__opts">' +
          opts.map((o) => '<button type="button" class="btn btn--sm" data-o="' + esc(o.k) + '">' + esc(o.name) + "</button>").join("") + "</div>";
        qBox.querySelectorAll("[data-o]").forEach((b) => b.addEventListener("click", () => {
          if (q.lock) return; q.lock = true;
          const ok = b.dataset.o === it.k;
          if (ok) q.score++;
          b.classList.add(ok ? "is-right" : "is-wrong");
          if (!ok) { const r = qBox.querySelector('[data-o="' + cssq(it.k) + '"]'); if (r) r.classList.add("is-right"); }
          showInfo(it);
          setTimeout(() => { q.i++; ask(); }, ok ? 900 : 1700);
        }));
      }
    }
    function answerFind(k) {
      const q = st.quiz; if (!q || q.lock || !k) return;
      const it = q.qs[q.i];
      const ok = it.match ? it.match(k) : k === it.k;
      svg.querySelectorAll('[data-k="' + cssq(k) + '"]').forEach((x) => x.classList.add(ok ? "is-ok" : "is-bad"));
      if (ok) { q.score += q.tries === 0 ? 1 : 0; q.lock = true; showInfo(it); setTimeout(() => { q.i++; ask(); }, 900); return; }
      q.tries++;
      const wrong = findItem(k);
      App.ui.toast(wrong ? T("Bu: ", "That is: ") + wrong.name : T("Yanlış yer", "Not there"));
      if (q.tries >= 2) reveal(true);
    }
    function reveal() {
      const q = st.quiz; q.lock = true;
      const it = q.qs[q.i];
      elsFor(it).forEach((x) => x.classList.add("is-ans"));
      showInfo(it);
      setTimeout(() => { q.i++; ask(); }, 1900);
    }
    function finish() {
      const q = st.quiz, key = map + "/" + layer, b = bestAll(), nw = q.score > (b[key] || 0);
      if (nw) { b[key] = q.score; App.prefs.set("mapBest", b); }
      qBox.innerHTML = '<span class="mp-q__t"><b>' + q.score + " / " + q.qs.length + "</b> " + esc(nw ? T("— yeni rekor!", "— new record!") : T("doğru", "correct")) + "</span>" +
        '<button type="button" class="btn btn--sm btn--primary" data-again>' + esc(T("Yeniden", "Again")) + '</button><button type="button" class="btn btn--sm btn--ghost" data-exp>' + esc(T("Keşfe dön", "Back to explore")) + "</button>";
      qBox.querySelector("[data-again]").addEventListener("click", () => startQuiz(st.mode));
      qBox.querySelector("[data-exp]").addEventListener("click", () => startQuiz("explore"));
      const chip = view.querySelector('.mp-layers .mp-chip.is-on');
      if (nw && chip) { const s = chip.querySelector(".mp-best"); if (s) s.lastChild.textContent = q.score; else chip.insertAdjacentHTML("beforeend", ' <span class="mp-best">' + App.icon("star") + q.score + "</span>"); }
    }

    view.querySelectorAll("[data-mode]").forEach((b) => b.addEventListener("click", () => startQuiz(b.dataset.mode)));
    view.querySelectorAll("[data-sub]").forEach((b) => b.addEventListener("click", () => {
      st.sub = +b.dataset.sub;
      view.querySelectorAll("[data-sub]").forEach((x) => x.classList.toggle("is-on", x === b));
      const keep = st.vb; draw(); st.vb = keep; applyVB();
      const it = list[st.sub]; showInfo(it);
    }));

    draw();
    idleInfo();
    if (layer === "tarim" || layer === "maden") showInfo(list[0]);
    App.harita._last = { st, svg, list: () => list, tap, startQuiz };
  }

  function legendHtml(map, layer) {
    const info = I();
    let rows = [];
    if (layer === "bolgeler") rows = Object.values(info.REG).map((r) => [r.color, r.name]);
    else if (layer === "iklim") rows = Object.values(info.CLIM).map((r) => [r.color, r.name]);
    else if (layer === "kitalar") rows = Object.entries(CONT_COL).map(([k, c]) => [c, k]);
    else if (layer === "daglar") rows = [["mt", T("Kıvrım / kırık dağ", "Fold / fault-block mountain")], ["volc", T("Volkanik dağ", "Volcano")], ["plain", T("Ova / plato", "Plain / plateau")], ["range", T("Sıradağ", "Range")]];
    else if (layer === "goller") rows = [["lake", T("Göl (dokun: oluşum türü)", "Lake (tap: origin)")]];
    else if (layer === "fiziki") rows = [["range", T("Sıradağ", "Mountain range")], ["desert", T("Çöl", "Desert")], ["plain", T("Ova, plato, havza", "Plain, plateau, basin")], ["mt", T("Zirve", "Peak")], ["fall", T("Şelale / burun", "Waterfall / cape")]];
    else if (layer === "baskent") rows = [["cap", T("Başkent (dokun)", "Capital (tap)")]];
    if (!rows.length) return "";
    return '<div class="card mp-legend">' + rows.map(([c, n]) => '<div class="mp-legend__r">' + (c[0] === "#" ? '<i class="mp-sw" style="background:' + c + '"></i>' : '<i class="mp-sw mp-sw--' + c + '"></i>') + esc(n) + "</div>").join("") + "</div>";
  }

  App.router.register("atlas", render);
  App.harita = { items, ptr, pworld, LAYERS };
})();
