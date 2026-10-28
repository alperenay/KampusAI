/* =========================================================
   ekosistem.js — Ekosistem Kavanozu: popülasyon dinamiği simülasyonu (v1.49, v1.51'de derinleşti)   #/ekosistem

   Dört basamaklı besin ağı (ot → tavşan → tilki; kartal tavşan avlar). Lotka–Volterra av-avcı denklemleri, avın
   büyümesine taşıma kapasitesi sınırı eklenerek kurulur; taşıma kapasitesi o anki ot miktarına bağlıdır:
     dG/dt = r(t)·G·(1 − G/K_ot) − c·G·R                         ot: lojistik büyüme, tavşanlarca otlanma
     dR/dt = α·R·(1 − R/(κ·G)) − β·R·F − η·R·E                   tavşan: üreme (ot sınırlı), tilki ve kartal avı
     dF/dt = δ·R·F − γ·F                                         tilki: av başına üreme, doğal ölüm
     dE/dt = ε·η·R·E − μ·E                                       kartal: av başına üreme, doğal ölüm (başta yok: E = 0)
   Mevsimler (isteğe bağlı): r(t) = r·(1 + 0,6·sin(2πt/12)) — otun büyümesi yılda bir kez artıp azalır.
   Çözücü: 4. dereceden Runge–Kutta, uyarlanır adım (değer adım başına %40'tan çok değişecekse adım bölünür),
   negatif değer yok; bir hayvan popülasyonu 0,5 bireyin altına düşerse nesli tükenmiş sayılır (sıfırlanır).
   Kartal yokken ve mevsimler kapalıyken model v1.49 modeliyle birebir aynıdır.
   Müdahaleler: tilkileri çıkar / ekle, tavşan ekle, kartal ekle, kuraklık, salgın (tavşanların yarısı ölür),
   mevsimler, ot sınırı ve av başarısı.
   ========================================================= */
(function () {
  const { esc } = App.utils;
  const T = (tr, en) => (App.i18n && App.i18n.lang === "en" ? en : tr);

  /* ================= Model (sınanabilir) ================= */
  const DEFAULTS = { alpha: 1.0, beta: 0.02, delta: 0.01, gamma: 0.6, kappa: 5, rg: 0.8, Kg: 400, c: 0.004, drought: false,
    eta: 0.004, eps: 0.6, mu: 0.15, season: false };
  const EXTINCT = 0.5;
  const SEASON = 12;                       // bir yıl = 12 zaman birimi
  /** Mevsim çarpanı: kış (ot yavaş) – yaz (ot hızlı) */
  const seasonFactor = (t) => 1 + 0.6 * Math.sin((2 * Math.PI * t) / SEASON);
  /** Etkin parametreler (kuraklık otun büyümesini ve kapasitesini düşürür; mevsim büyüme hızını değiştirir) */
  function eff(p, t) {
    let q = p.drought ? Object.assign({}, p, { rg: p.rg * 0.25, Kg: p.Kg * 0.5 }) : p;
    if (p.season) q = Object.assign({}, q, { rg: q.rg * seasonFactor(t || 0) });
    return q;
  }
  function deriv(s, p) {
    const K = p.kappa * s.G + 1e-9, E = s.E || 0;
    return {
      G: p.rg * s.G * (1 - s.G / p.Kg) - p.c * s.G * s.R,
      R: p.alpha * s.R * (1 - s.R / K) - p.beta * s.R * s.F - p.eta * s.R * E,
      F: p.delta * s.R * s.F - p.gamma * s.F,
      E: p.eps * p.eta * s.R * E - p.mu * E
    };
  }
  const add = (s, d, h) => ({ G: s.G + d.G * h, R: s.R + d.R * h, F: s.F + d.F * h, E: (s.E || 0) + d.E * h });
  function rk4(s, p, h) {
    const a = deriv(s, p), b = deriv(add(s, a, h / 2), p), c = deriv(add(s, b, h / 2), p), d = deriv(add(s, c, h), p);
    return { G: s.G + (h / 6) * (a.G + 2 * b.G + 2 * c.G + d.G), R: s.R + (h / 6) * (a.R + 2 * b.R + 2 * c.R + d.R), F: s.F + (h / 6) * (a.F + 2 * b.F + 2 * c.F + d.F),
      E: (s.E || 0) + (h / 6) * (a.E + 2 * b.E + 2 * c.E + d.E) };
  }
  const extinct = (x) => (x < EXTINCT ? 0 : x);
  const clean = (s) => ({ G: Math.max(0, s.G), R: extinct(s.R), F: extinct(s.F), E: extinct(s.E || 0) });
  const finite = (s) => [s.G, s.R, s.F, s.E].every(Number.isFinite);
  /** Bir adım ilerlet (toplam süre dt; t0: mevsim için başlangıç zamanı). Sonuç her zaman sonlu ve negatif değildir. */
  function step(state, params, dt, t0) {
    const base = Object.assign({}, DEFAULTS, params);
    let s = clean(state), left = dt, h = Math.min(0.05, dt), guard = 0, tt = t0 || 0;
    while (left > 1e-12 && guard++ < 20000) {
      h = Math.min(h, left);
      const p = eff(base, tt);
      const d = deriv(s, p), rel = Math.max(Math.abs(d.G) / (s.G + 1), Math.abs(d.R) / (s.R + 1), Math.abs(d.F) / (s.F + 1), Math.abs(d.E) / (s.E + 1)) * h;
      if (rel > 0.4 && h > 1e-6) { h /= 2; continue; }
      const n = rk4(s, p, h);
      if (!finite(n)) { h /= 2; if (h < 1e-9) break; continue; }
      s = clean(n); left -= h; tt += h;
      if (rel < 0.05) h = Math.min(0.05, h * 1.5);
    }
    return s;
  }
  /** Süre boyunca simülasyon; her 'every' zaman biriminde bir örnek döner */
  function simulate(state, params, tEnd, every) {
    const out = [{ t: 0, G: state.G, R: state.R, F: state.F, E: state.E || 0 }];
    let s = clean(state);
    const e = every || 0.25;
    for (let t = e; t <= tEnd + 1e-9; t += e) { s = step(s, params, e, t - e); out.push({ t, G: s.G, R: s.R, F: s.F, E: s.E }); }
    return out;
  }
  /** Denge noktası (kartal yok, mevsim yok; av-avcı birlikte yaşarken): R* = γ/δ, G* ot denkleminden, F* tavşan denkleminden */
  function equilibrium(params) {
    const p = eff(Object.assign({}, DEFAULTS, params, { season: false }), 0);
    const R = p.gamma / p.delta, G = p.Kg * (1 - (p.c * R) / p.rg);
    if (!(G > 0)) return null;
    const F = (p.alpha / p.beta) * (1 - R / (p.kappa * G));
    return F > 0 ? { G, R, F } : null;
  }
  /** Shannon çeşitlilik indeksi (hayvan türleri): H = −Σ pᵢ ln pᵢ — denge ve çeşitlilik göstergesi */
  function diversity(s) {
    const n = [s.R, s.F, s.E || 0].filter((x) => x > 0), tot = n.reduce((a, b) => a + b, 0);
    return tot ? Math.abs(n.reduce((a, x) => a + (x / tot) * Math.log(x / tot), 0)) : 0;
  }

  /* ================= Arayüz ================= */
  const COL = { G: "#3fb950", R: "#d9a441", F: "#e5533d", E: "#7aa2ff" };
  const NAMES = () => ({ G: T("Ot", "Grass"), R: T("Tavşan", "Rabbits"), F: T("Tilki", "Foxes"), E: T("Kartal", "Eagles") });
  const QUESTIONS = () => [
    T("Tilki sayısının tepe noktası tavşanlarınkinden önce mi sonra mı geliyor? Neden?", "Do fox peaks come before or after rabbit peaks? Why?"),
    T("Tilkileri tamamen çıkar. Tavşan sayısı sonsuza kadar artıyor mu? Onu ne durduruyor?", "Remove all foxes. Do rabbits grow forever? What stops them?"),
    T("Kuraklık başlat. Önce hangi tür etkileniyor, en son hangisi?", "Start a drought. Which species is hit first, which last?"),
    T("Kartal ekle. Tilkiler ve kartallar aynı avı paylaşınca ne oluyor? İki avcı birlikte yaşayabiliyor mu?", "Add eagles. What happens when two predators share prey? Can both survive?"),
    T("Mevsimleri aç. Popülasyonlar yıl içinde nasıl dalgalanıyor? Tavşan tepesi otun tepesinden ne kadar sonra geliyor?", "Turn on seasons. How do populations swing over a year? How long after the grass peak do rabbits peak?"),
    T("Faz grafiğindeki sarmal neden içe doğru kıvrılıyor? Ot sınırını kaldırırsan ne değişir?", "Why does the phase spiral curl inwards?")
  ];
  function initialState() { return { G: 400, R: 30, F: 4, E: 0 }; }

  function render(view) {
    App.setTitle(T("Ekosistem Kavanozu", "Ecosystem Jar"));
    const N = NAMES();
    view.innerHTML = '<div class="page eko">' +
      '<div class="page-head"><div><h1>' + esc(T("Ekosistem Kavanozu", "Ecosystem Jar")) + "</h1><p>" +
        esc(T("Kavanoza ot, tavşan, tilki ve kartal koy, zamanı ileri sar. Popülasyonların birbirini nasıl etkilediğini Lotka–Volterra modeliyle canlı izle; avcıları çıkar, kuraklık ya da salgın başlat, mevsimleri aç ve sonucu tahmin et.", "Put grass, rabbits, foxes and eagles in a jar and fast-forward time with a Lotka–Volterra model.")) + "</p></div></div>" +
      '<div class="eko-wrap"><section class="card eko-jar-card"><canvas class="eko-jar" id="ekJar" role="img"></canvas>' +
        '<div class="eko-counts" id="ekCounts" aria-live="polite"></div><div class="eko-balance" id="ekBalance"></div>' +
        '<div class="ph-acts"><button class="btn btn--primary" type="button" id="ekPlay">' + App.icon("play") + esc(T("Başlat", "Start")) + "</button>" +
          '<div class="lang-switch seg" role="radiogroup" id="ekSpeed" aria-label="' + esc(T("Hız", "Speed")) + '">' + [1, 5, 10].map((x) => '<button type="button" role="radio" data-v="' + x + '" aria-checked="' + (x === 1) + '">' + x + "×</button>").join("") + "</div>" +
          '<button class="btn btn--ghost" type="button" id="ekReset">' + App.icon("refresh") + esc(T("Sıfırla", "Reset")) + "</button></div></section>" +
      '<aside class="card eko-side"><h2 class="section-title">' + esc(T("Müdahale et", "Intervene")) + '</h2><div class="eko-acts">' +
        '<button class="btn" type="button" data-act="noFox">' + esc(T("Tilkileri çıkar (avcılık)", "Remove foxes")) + "</button>" +
        '<button class="btn" type="button" data-act="fox">' + esc(T("+5 tilki", "+5 foxes")) + "</button>" +
        '<button class="btn" type="button" data-act="rab">' + esc(T("+20 tavşan", "+20 rabbits")) + "</button>" +
        '<button class="btn" type="button" data-act="eagle">' + esc(T("+3 kartal", "+3 eagles")) + "</button>" +
        '<button class="btn" type="button" data-act="disease">' + esc(T("Salgın (tavşan)", "Disease (rabbits)")) + "</button>" +
        '<button class="btn" type="button" data-act="drought" aria-pressed="false">' + App.icon("sun") + esc(T("Kuraklık", "Drought")) + "</button>" +
        '<button class="btn" type="button" data-act="season" aria-pressed="false">' + App.icon("calendar") + esc(T("Mevsimler", "Seasons")) + "</button></div>" +
        '<label class="field"><span class="field__label">' + esc(T("Ot sınırı (kavanozun taşıyabileceği ot)", "Grass limit")) + ': <b id="ekKgV">400</b></span><input type="range" min="100" max="800" step="10" value="400" id="ekKg"></label>' +
        '<label class="field"><span class="field__label">' + esc(T("Tilkinin av başarısı β", "Predation β")) + ': <b id="ekBV">0,020</b></span><input type="range" min="0.005" max="0.05" step="0.001" value="0.02" id="ekB"></label>' +
        '<label class="field"><span class="field__label">' + esc(T("Tilkinin doğal ölüm hızı γ", "Fox death rate γ")) + ': <b id="ekGV">0,60</b></span><input type="range" min="0.2" max="1.2" step="0.02" value="0.6" id="ekG"></label>' +
        '<ol class="eko-log" id="ekLog" aria-live="polite"></ol></aside></div>' +
      '<div class="eko-charts"><section class="card"><h2 class="section-title">' + esc(T("Zamanla popülasyon", "Population over time")) + '</h2><canvas class="sl-cv" id="ekChart" role="img" aria-label="' + esc(T("Popülasyon grafiği", "Population chart")) + '"></canvas>' +
        '<div class="eko-legend">' + ["G", "R", "F", "E"].map((k) => '<span><i style="background:' + COL[k] + '"></i>' + esc(N[k]) + (k === "G" ? " ÷ 5" : "") + "</span>").join("") + "</div></section>" +
        '<section class="card"><h2 class="section-title">' + esc(T("Faz grafiği: tavşan – tilki", "Phase plot: rabbits – foxes")) + '</h2><canvas class="sl-cv" id="ekPhase" role="img" aria-label="' + esc(T("Faz grafiği", "Phase plot")) + '"></canvas></section></div>' +
      '<section class="card eko-q"><h2 class="section-title">' + esc(T("Düşün ve tahmin et", "Think and predict")) + "</h2><ol>" + QUESTIONS().map((q) => "<li>" + esc(q) + "</li>").join("") + "</ol>" +
        '<p class="hint">' + esc(T("Model bir basitleştirmedir: gerçek ekosistemlerde göç, rastlantı ve çok daha fazla tür rol oynar.", "The model is a simplification: migration, chance and many more species also matter.")) + "</p>" +
        '<div class="sl-links">' + ["10/biyoloji/u2/k2", "12/biyoloji/u4/k1", "10/biyoloji/u2/k3"].filter((k) => App.lessons && App.lessons.find(k)).map((k) => '<a href="#/konular/' + k + '">' + App.icon("book") + esc(App.L(App.lessons.find(k).outcome.title)) + "</a>").join("") + "</div></section></div>";
    App.hydrateIcons(view);
    const $ = (s) => view.querySelector(s), jar = $("#ekJar");
    const params = Object.assign({}, DEFAULTS);
    let s = initialState(), t = 0, hist = [{ t: 0, ...s }], playing = false, speed = 1, raf = 0, last = 0, alive = { R: true, F: true, E: false }, drawTick = 0;
    const log = (msg) => { const li = document.createElement("li"); li.innerHTML = "<b>t = " + Math.round(t) + "</b> " + esc(msg); $("#ekLog").prepend(li); while ($("#ekLog").children.length > 8) $("#ekLog").lastChild.remove(); };
    // Kavanozdaki bireylerin sabit (tohumlu) konumları ve kendi hareket evreleri
    const spots = Array.from({ length: 160 }, (_, i) => { const a = Math.sin(i * 12.9898) * 43758.5453, b = Math.sin(i * 78.233) * 12543.123; return [a - Math.floor(a), b - Math.floor(b)]; });

    /* ---- Kavanoz: yüksek çözünürlüklü tuval; gökyüzü mevsime, ot yoğunluğu ota, hayvan sayısı popülasyona bağlı ---- */
    function rabbit(g, x, y, sc) {
      g.fillStyle = COL.R; g.beginPath(); g.ellipse(x, y, 6 * sc, 4.5 * sc, 0, 0, 7); g.fill();
      g.beginPath(); g.arc(x + 5 * sc, y - 3 * sc, 3 * sc, 0, 7); g.fill();
      g.beginPath(); g.ellipse(x + 5 * sc, y - 9 * sc, 1.2 * sc, 4 * sc, 0.15, 0, 7); g.fill();
      g.fillStyle = "#fff"; g.beginPath(); g.arc(x - 6 * sc, y - 1 * sc, 1.6 * sc, 0, 7); g.fill();
    }
    function fox(g, x, y, sc) {
      g.fillStyle = COL.F; g.beginPath(); g.ellipse(x, y, 9 * sc, 5 * sc, 0, 0, 7); g.fill();
      g.beginPath(); g.moveTo(x + 7 * sc, y - 2 * sc); g.lineTo(x + 15 * sc, y - 1 * sc); g.lineTo(x + 8 * sc, y + 3 * sc); g.fill();
      g.beginPath(); g.moveTo(x + 9 * sc, y - 4 * sc); g.lineTo(x + 10 * sc, y - 10 * sc); g.lineTo(x + 13 * sc, y - 4 * sc); g.fill();
      g.beginPath(); g.ellipse(x - 11 * sc, y + 1 * sc, 6 * sc, 2.6 * sc, -0.4, 0, 7); g.fill();
      g.fillStyle = "#fff"; g.beginPath(); g.ellipse(x - 15 * sc, y + 2.6 * sc, 2 * sc, 1.4 * sc, -0.4, 0, 7); g.fill();
    }
    function eagle(g, x, y, sc, flap) {
      g.strokeStyle = COL.E; g.lineWidth = 2.4 * sc; g.lineCap = "round";
      g.beginPath(); g.moveTo(x - 12 * sc, y - flap * sc); g.quadraticCurveTo(x - 5 * sc, y - 6 * sc, x, y); g.quadraticCurveTo(x + 5 * sc, y - 6 * sc, x + 12 * sc, y - flap * sc); g.stroke();
    }
    function drawJar(now) {
      const dpr = Math.min(3, window.devicePixelRatio || 1), W = jar.clientWidth || 300, H = jar.clientHeight || 300;
      if (jar.width !== Math.round(W * dpr) || jar.height !== Math.round(H * dpr)) { jar.width = Math.round(W * dpr); jar.height = Math.round(H * dpr); }
      const g = jar.getContext("2d"); g.setTransform(dpr, 0, 0, dpr, 0, 0); g.clearRect(0, 0, W, H);
      const x0 = W * 0.16, x1 = W * 0.84, y0 = H * 0.1, y1 = H * 0.95, r = 26, sc = Math.max(0.8, Math.min(1.4, W / 520));
      // kavanozun içi: gökyüzü (mevsim/kuraklık), güneş, yer
      g.save(); g.beginPath(); g.moveTo(x0 + 12, y0); g.lineTo(x0, y0 + 30); g.arcTo(x0, y1, x0 + r, y1, r); g.arcTo(x1, y1, x1, y1 - r, r); g.lineTo(x1, y0 + 30); g.lineTo(x1 - 12, y0); g.closePath();
      const warm = params.season ? (seasonFactor(t) - 0.4) / 1.2 : 0.5, sky = g.createLinearGradient(0, y0, 0, y1);
      sky.addColorStop(0, params.drought ? "rgba(240,190,110,0.35)" : "rgba(" + Math.round(90 + 80 * warm) + "," + Math.round(150 + 40 * warm) + ",235,0.30)");
      sky.addColorStop(1, "rgba(140,190,255,0.06)");
      g.fillStyle = sky; g.fill(); g.lineWidth = 3; g.strokeStyle = "rgba(170,210,255,0.65)"; g.stroke(); g.clip();
      if (params.drought || (params.season && warm > 0.6)) { g.fillStyle = "rgba(255,210,90,0.85)"; g.beginPath(); g.arc(x1 - 34, y0 + 46, 14 * sc, 0, 7); g.fill(); }
      const soil = g.createLinearGradient(0, y1 - 26, 0, y1); soil.addColorStop(0, "#7a5532"); soil.addColorStop(1, "#4f3520");
      g.fillStyle = soil; g.fillRect(x0, y1 - 22, x1 - x0, 22);
      // ot: yoğunluk + mevsim rengi
      const nG = Math.round(Math.min(90, (s.G / Math.max(1, params.Kg)) * 90));
      g.strokeStyle = params.drought ? "#b6a24a" : params.season && warm < 0.25 ? "#7fa36a" : COL.G; g.lineWidth = 1.8;
      for (let i = 0; i < nG; i++) { const x = x0 + 6 + spots[i][0] * (x1 - x0 - 12), sway = Math.sin(now / 650 + i) * 2.2; g.beginPath(); g.moveTo(x, y1 - 20); g.quadraticCurveTo(x + sway, y1 - 34, x + sway * 2, y1 - 42 - spots[i][1] * 18); g.stroke(); }
      // hayvanlar (görüntü sınırı: tavşan 60, tilki 24, kartal 10; sayılar yukarıda tam gösterilir)
      const span = (y1 - 22) - (y0 + 50);
      const nR = Math.round(Math.min(60, s.R / 2)), nF = Math.round(Math.min(24, s.F / 2)), nE = Math.round(Math.min(10, s.E));
      for (let i = 0; i < nR; i++) { const sp = spots[(i + 20) % spots.length], hop = Math.abs(Math.sin(now / 260 + i * 1.7)) * 4; rabbit(g, x0 + 16 + sp[0] * (x1 - x0 - 36) + Math.sin(now / 1400 + i) * 6, y0 + 50 + (0.45 + sp[1] * 0.5) * span - hop, sc); }
      for (let i = 0; i < nF; i++) { const sp = spots[(i + 100) % spots.length]; fox(g, x0 + 22 + sp[0] * (x1 - x0 - 48) + Math.sin(now / 1100 + i * 2) * 10, y0 + 50 + (0.35 + sp[1] * 0.45) * span, sc); }
      for (let i = 0; i < nE; i++) { const sp = spots[(i + 140) % spots.length]; eagle(g, x0 + 20 + ((sp[0] + now / 9000 * (0.5 + sp[1])) % 1) * (x1 - x0 - 40), y0 + 26 + sp[1] * 40, sc, 4 + Math.sin(now / 160 + i) * 3); }
      g.restore();
      jar.setAttribute("aria-label", T("Kavanoz: ot ", "Jar: grass ") + Math.round(s.G) + T(", tavşan ", ", rabbits ") + Math.round(s.R) + T(", tilki ", ", foxes ") + Math.round(s.F) + T(", kartal ", ", eagles ") + Math.round(s.E));
    }
    function drawCharts() {
      const ch = App.sensorLab && App.sensorLab.chart; if (!ch) return;
      const H = hist.slice(-400);
      ch($("#ekChart"), [{ pts: H.map((h) => [h.t, h.G / 5]), color: COL.G }, { pts: H.map((h) => [h.t, h.R]), color: COL.R }, { pts: H.map((h) => [h.t, h.F]), color: COL.F }]
        .concat(H.some((h) => h.E > 0) ? [{ pts: H.map((h) => [h.t, h.E]), color: COL.E }] : []), { xName: "t", yName: T("birey", "count"), y0: 0 });
      ch($("#ekPhase"), [{ pts: H.map((h) => [h.R, h.F]), color: "accent" }, { pts: [[s.R, s.F]], dots: true, color: COL.F }], { xName: N.R, yName: N.F, x0: 0, y0: 0 });
      $("#ekCounts").innerHTML = ["G", "R", "F", "E"].map((k) => '<span style="--c:' + COL[k] + '"><i></i>' + esc(N[k]) + " <b>" + Math.round(s[k]) + "</b></span>").join("") +
        "<span>t = " + t.toFixed(1) + (params.season ? " · " + esc(seasonName(t)) : "") + "</span>";
      // Denge: kartalsız ve mevsimsiz modelde hesaplanan dengeye uzaklık + tür çeşitliliği
      const eq = !s.E && !params.season ? equilibrium(params) : null, H2 = diversity(s);
      $("#ekBalance").textContent = (eq ? T("Dengeye uzaklık: ", "Distance from equilibrium: ") + Math.round(Math.hypot((s.R - eq.R) / eq.R, (s.F - eq.F) / eq.F) * 100) + "% · " : "") +
        T("Çeşitlilik (Shannon H): ", "Diversity (Shannon H): ") + H2.toFixed(2).replace(".", App.i18n.lang === "en" ? "." : ",");
    }
    const seasonName = (tt) => { const ph = ((tt % SEASON) + SEASON) % SEASON; return ph < 3 ? T("ilkbahar", "spring") : ph < 6 ? T("yaz", "summer") : ph < 9 ? T("sonbahar", "autumn") : T("kış", "winter"); };
    function advance(dtSim) {
      s = step(s, params, dtSim, t); t += dtSim;
      if (!hist.length || t - hist[hist.length - 1].t >= 0.2) hist.push({ t, G: s.G, R: s.R, F: s.F, E: s.E });
      if (hist.length > 2000) hist.splice(0, hist.length - 2000);
      if (alive.F && s.F === 0) { alive.F = false; log(T("Tilkilerin nesli kavanozda tükendi.", "Foxes went extinct.")); }
      if (alive.R && s.R === 0) { alive.R = false; log(T("Tavşanların nesli tükendi; avcılar artık aç kalacak.", "Rabbits went extinct.")); }
      if (alive.E && s.E === 0) { alive.E = false; log(T("Kartallar kavanozdan yok oldu.", "Eagles died out.")); }
      if (s.F > 0) alive.F = true;
      if (s.R > 0) alive.R = true;
      if (s.E > 0) alive.E = true;
    }
    const frame = (now) => {
      if (!document.contains(jar)) return;
      if (playing) { const dt = Math.min(0.1, (now - (last || now)) / 1000); advance(dt * speed * 1.5); }
      last = now;
      drawJar(now);
      if (++drawTick % 3 === 0 || !playing) drawCharts();
      raf = requestAnimationFrame(frame);
    };
    const playBtn = () => { $("#ekPlay").innerHTML = App.icon(playing ? "pause" : "play") + esc(playing ? T("Duraklat", "Pause") : T("Başlat", "Start")); App.hydrateIcons($("#ekPlay")); };
    $("#ekPlay").onclick = () => { playing = !playing; playBtn(); };
    $("#ekSpeed").addEventListener("click", (e) => { const b = e.target.closest("[data-v]"); if (!b) return; speed = Number(b.dataset.v); $("#ekSpeed").querySelectorAll("[data-v]").forEach((x) => x.setAttribute("aria-checked", String(x === b))); });
    const toggle = (name, on) => { const b = view.querySelector('[data-act="' + name + '"]'); b.setAttribute("aria-pressed", String(on)); b.classList.toggle("is-on", on); };
    $("#ekReset").onclick = () => { s = initialState(); t = 0; hist = [{ t: 0, ...s }]; alive = { R: true, F: true, E: false }; params.drought = false; params.season = false; toggle("drought", false); toggle("season", false); $("#ekLog").innerHTML = ""; drawCharts(); };
    view.querySelector(".eko-acts").addEventListener("click", (e) => {
      const b = e.target.closest("[data-act]"); if (!b) return;
      const a = b.dataset.act;
      if (a === "noFox") { s.F = 0; log(T("Avcılar tüm tilkileri kavanozdan çıkardı.", "All foxes removed.")); }
      else if (a === "fox") { s.F += 5; log(T("5 tilki eklendi.", "5 foxes added.")); }
      else if (a === "rab") { s.R += 20; log(T("20 tavşan eklendi.", "20 rabbits added.")); }
      else if (a === "eagle") { s.E = (s.E || 0) + 3; log(T("3 kartal eklendi: tavşanlar artık iki avcıyla karşı karşıya.", "3 eagles added: rabbits now face two predators.")); }
      else if (a === "disease") { s.R = extinct(s.R * 0.5); log(T("Salgın: tavşanların yarısı öldü. Avcılar bunu ne kadar sonra hissedecek?", "Disease: half the rabbits died.")); }
      else if (a === "drought") { params.drought = !params.drought; toggle("drought", params.drought); log(params.drought ? T("Kuraklık başladı: ot yavaş büyüyor, kapasite yarıya indi.", "Drought started.") : T("Kuraklık bitti.", "Drought ended.")); }
      else if (a === "season") { params.season = !params.season; toggle("season", params.season); log(params.season ? T("Mevsimler açıldı: otun büyümesi yıl boyunca dalgalanıyor (1 yıl = 12 birim).", "Seasons on: grass growth swings over a year.") : T("Mevsimler kapatıldı.", "Seasons off.")); }
      if (!playing) drawCharts();
    });
    $("#ekKg").addEventListener("input", (e) => { params.Kg = Number(e.target.value); $("#ekKgV").textContent = e.target.value; });
    $("#ekB").addEventListener("input", (e) => { params.beta = Number(e.target.value); $("#ekBV").textContent = Number(e.target.value).toFixed(3).replace(".", ","); });
    $("#ekG").addEventListener("input", (e) => { params.gamma = Number(e.target.value); $("#ekGV").textContent = Number(e.target.value).toFixed(2).replace(".", ","); });
    drawCharts();
    raf = requestAnimationFrame(frame);
    return () => cancelAnimationFrame(raf);
  }

  App.router.register("ekosistem", render);
  App.ekosistem = { DEFAULTS, deriv, rk4, step, simulate, equilibrium, diversity, seasonFactor, EXTINCT };
})();
