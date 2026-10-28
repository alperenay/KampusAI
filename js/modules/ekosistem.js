/* =========================================================
   ekosistem.js — Ekosistem Kavanozu: popülasyon dinamiği simülasyonu (v1.49)   #/ekosistem

   Üç basamaklı besin zinciri (ot → tavşan → tilki). Lotka–Volterra av-avcı denklemleri, avın büyümesine
   taşıma kapasitesi sınırı eklenerek kurulur; taşıma kapasitesi o anki ot miktarına bağlıdır:
     dG/dt = r·G·(1 − G/K_ot) − c·G·R                    ot: lojistik büyüme, tavşanlarca otlanma
     dR/dt = α·R·(1 − R/(κ·G)) − β·R·F                   tavşan: üreme (ot sınırlı), tilkilerce avlanma
     dF/dt = δ·R·F − γ·F                                 tilki: av başına üreme, doğal ölüm
   Çözücü: 4. dereceden Runge–Kutta, uyarlanır adım (değer adım başına %40'tan çok değişecekse adım bölünür),
   negatif değer yok; bir hayvan popülasyonu 0,5 bireyin altına düşerse nesli tükenmiş sayılır (sıfırlanır).
   Müdahaleler: tilkileri çıkar / ekle, tavşan ekle, kuraklık (otun büyüme hızı ve kapasitesi düşer), ot sınırı.
   ========================================================= */
(function () {
  const { esc } = App.utils;
  const T = (tr, en) => (App.i18n && App.i18n.lang === "en" ? en : tr);

  /* ================= Model (sınanabilir) ================= */
  const DEFAULTS = { alpha: 1.0, beta: 0.02, delta: 0.01, gamma: 0.6, kappa: 5, rg: 0.8, Kg: 400, c: 0.004, drought: false };
  const EXTINCT = 0.5;
  /** Etkin parametreler (kuraklık otun büyümesini ve kapasitesini düşürür) */
  const eff = (p) => (p.drought ? Object.assign({}, p, { rg: p.rg * 0.25, Kg: p.Kg * 0.5 }) : p);
  function deriv(s, p) {
    const K = p.kappa * s.G + 1e-9;
    return {
      G: p.rg * s.G * (1 - s.G / p.Kg) - p.c * s.G * s.R,
      R: p.alpha * s.R * (1 - s.R / K) - p.beta * s.R * s.F,
      F: p.delta * s.R * s.F - p.gamma * s.F
    };
  }
  const add = (s, d, h) => ({ G: s.G + d.G * h, R: s.R + d.R * h, F: s.F + d.F * h });
  function rk4(s, p, h) {
    const a = deriv(s, p), b = deriv(add(s, a, h / 2), p), c = deriv(add(s, b, h / 2), p), d = deriv(add(s, c, h), p);
    return { G: s.G + (h / 6) * (a.G + 2 * b.G + 2 * c.G + d.G), R: s.R + (h / 6) * (a.R + 2 * b.R + 2 * c.R + d.R), F: s.F + (h / 6) * (a.F + 2 * b.F + 2 * c.F + d.F) };
  }
  const clean = (s) => ({ G: Math.max(0, s.G), R: s.R < EXTINCT ? 0 : s.R, F: s.F < EXTINCT ? 0 : s.F });
  const finite = (s) => Number.isFinite(s.G) && Number.isFinite(s.R) && Number.isFinite(s.F);
  /** Bir adım ilerlet (toplam süre dt). Hızlı değişimde adım yarıya bölünür; sonuç her zaman sonlu ve negatif değildir. */
  function step(state, params, dt) {
    const p = eff(Object.assign({}, DEFAULTS, params));
    let s = clean(state), left = dt, h = Math.min(0.05, dt), guard = 0;
    while (left > 1e-12 && guard++ < 20000) {
      h = Math.min(h, left);
      const d = deriv(s, p), rel = Math.max(Math.abs(d.G) / (s.G + 1), Math.abs(d.R) / (s.R + 1), Math.abs(d.F) / (s.F + 1)) * h;
      if (rel > 0.4 && h > 1e-6) { h /= 2; continue; }
      const n = rk4(s, p, h);
      if (!finite(n)) { h /= 2; if (h < 1e-9) break; continue; }
      s = clean(n); left -= h;
      if (rel < 0.05) h = Math.min(0.05, h * 1.5);
    }
    return s;
  }
  /** Süre boyunca simülasyon; her 'every' zaman biriminde bir örnek döner */
  function simulate(state, params, tEnd, every) {
    const out = [{ t: 0, G: state.G, R: state.R, F: state.F }];
    let s = clean(state);
    const e = every || 0.25;
    for (let t = e; t <= tEnd + 1e-9; t += e) { s = step(s, params, e); out.push({ t, G: s.G, R: s.R, F: s.F }); }
    return out;
  }
  /** Denge noktası (av-avcı birlikte yaşarken): R* = γ/δ, G* ot denkleminden, F* tavşan denkleminden */
  function equilibrium(params) {
    const p = eff(Object.assign({}, DEFAULTS, params));
    const R = p.gamma / p.delta, G = p.Kg * (1 - (p.c * R) / p.rg);
    if (!(G > 0)) return null;
    const F = (p.alpha / p.beta) * (1 - R / (p.kappa * G));
    return F > 0 ? { G, R, F } : null;
  }

  /* ================= Arayüz ================= */
  const COL = { G: "#3fb950", R: "#d9a441", F: "#e5533d" };
  const NAMES = () => ({ G: T("Ot", "Grass"), R: T("Tavşan", "Rabbits"), F: T("Tilki", "Foxes") });
  const QUESTIONS = () => [
    T("Tilki sayısının tepe noktası tavşanlarınkinden önce mi sonra mı geliyor? Neden?", "Do fox peaks come before or after rabbit peaks? Why?"),
    T("Tilkileri tamamen çıkar. Tavşan sayısı sonsuza kadar artıyor mu? Onu ne durduruyor?", "Remove all foxes. Do rabbits grow forever? What stops them?"),
    T("Kuraklık başlat. Önce hangi tür etkileniyor, en son hangisi?", "Start a drought. Which species is hit first, which last?"),
    T("Faz grafiğindeki sarmal neden içe doğru kıvrılıyor? Ot sınırını kaldırırsan ne değişir?", "Why does the phase spiral curl inwards?")
  ];
  function initialState() { return { G: 400, R: 30, F: 4 }; }

  function render(view) {
    App.setTitle(T("Ekosistem Kavanozu", "Ecosystem Jar"));
    const N = NAMES();
    view.innerHTML = '<div class="page eko">' +
      '<div class="page-head"><div><h1>' + esc(T("Ekosistem Kavanozu", "Ecosystem Jar")) + "</h1><p>" +
        esc(T("Kavanoza ot, tavşan ve tilki koy, zamanı ileri sar. Popülasyonların birbirini nasıl etkilediğini Lotka–Volterra modeliyle canlı izle; avcıları çıkar, kuraklık başlat ve sonucu tahmin et.", "Put grass, rabbits and foxes in a jar and fast-forward time with a Lotka–Volterra model.")) + "</p></div></div>" +
      '<div class="eko-wrap"><section class="card eko-jar-card"><canvas class="eko-jar" id="ekJar" role="img"></canvas>' +
        '<div class="eko-counts" id="ekCounts" aria-live="polite"></div>' +
        '<div class="ph-acts"><button class="btn btn--primary" type="button" id="ekPlay">' + App.icon("play") + esc(T("Başlat", "Start")) + "</button>" +
          '<div class="lang-switch seg" role="radiogroup" id="ekSpeed" aria-label="' + esc(T("Hız", "Speed")) + '">' + [1, 5, 10].map((x) => '<button type="button" role="radio" data-v="' + x + '" aria-checked="' + (x === 1) + '">' + x + "×</button>").join("") + "</div>" +
          '<button class="btn btn--ghost" type="button" id="ekReset">' + App.icon("refresh") + esc(T("Sıfırla", "Reset")) + "</button></div></section>" +
      '<aside class="card eko-side"><h2 class="section-title">' + esc(T("Müdahale et", "Intervene")) + '</h2><div class="eko-acts">' +
        '<button class="btn" type="button" data-act="noFox">' + esc(T("Tilkileri çıkar (avcılık)", "Remove foxes")) + "</button>" +
        '<button class="btn" type="button" data-act="fox">' + esc(T("+5 tilki", "+5 foxes")) + "</button>" +
        '<button class="btn" type="button" data-act="rab">' + esc(T("+20 tavşan", "+20 rabbits")) + "</button>" +
        '<button class="btn" type="button" data-act="drought" aria-pressed="false">' + App.icon("sun") + esc(T("Kuraklık", "Drought")) + "</button></div>" +
        '<label class="field"><span class="field__label">' + esc(T("Ot sınırı (kavanozun taşıyabileceği ot)", "Grass limit")) + ': <b id="ekKgV">400</b></span><input type="range" min="100" max="800" step="10" value="400" id="ekKg"></label>' +
        '<label class="field"><span class="field__label">' + esc(T("Tilkinin av başarısı β", "Predation β")) + ': <b id="ekBV">0,020</b></span><input type="range" min="0.005" max="0.05" step="0.001" value="0.02" id="ekB"></label>' +
        '<ol class="eko-log" id="ekLog" aria-live="polite"></ol></aside></div>' +
      '<div class="eko-charts"><section class="card"><h2 class="section-title">' + esc(T("Zamanla popülasyon", "Population over time")) + '</h2><canvas class="sl-cv" id="ekChart" role="img" aria-label="' + esc(T("Popülasyon grafiği", "Population chart")) + '"></canvas>' +
        '<div class="eko-legend">' + ["G", "R", "F"].map((k) => '<span><i style="background:' + COL[k] + '"></i>' + esc(N[k]) + (k === "G" ? " ÷ 5" : "") + "</span>").join("") + "</div></section>" +
        '<section class="card"><h2 class="section-title">' + esc(T("Faz grafiği: tavşan – tilki", "Phase plot: rabbits – foxes")) + '</h2><canvas class="sl-cv" id="ekPhase" role="img" aria-label="' + esc(T("Faz grafiği", "Phase plot")) + '"></canvas></section></div>' +
      '<section class="card eko-q"><h2 class="section-title">' + esc(T("Düşün ve tahmin et", "Think and predict")) + "</h2><ol>" + QUESTIONS().map((q) => "<li>" + esc(q) + "</li>").join("") + "</ol>" +
        '<p class="hint">' + esc(T("Model bir basitleştirmedir: gerçek ekosistemlerde mevsimler, göç, hastalık ve rastlantı da rol oynar.", "The model is a simplification: seasons, migration and chance also matter.")) + "</p>" +
        '<div class="sl-links">' + ["10/biyoloji/u2/k2", "12/biyoloji/u4/k1", "10/biyoloji/u2/k3"].filter((k) => App.lessons && App.lessons.find(k)).map((k) => '<a href="#/konular/' + k + '">' + App.icon("book") + esc(App.L(App.lessons.find(k).outcome.title)) + "</a>").join("") + "</div></section></div>";
    App.hydrateIcons(view);
    const $ = (s) => view.querySelector(s), jar = $("#ekJar");
    const params = Object.assign({}, DEFAULTS);
    let s = initialState(), t = 0, hist = [{ t: 0, ...s }], playing = false, speed = 1, raf = 0, last = 0, alive = { R: true, F: true }, drawTick = 0;
    const log = (msg) => { const li = document.createElement("li"); li.innerHTML = "<b>t = " + Math.round(t) + "</b> " + esc(msg); $("#ekLog").prepend(li); while ($("#ekLog").children.length > 8) $("#ekLog").lastChild.remove(); };
    // Kavanozdaki bireylerin sabit (tohumlu) konumları
    const spots = Array.from({ length: 140 }, (_, i) => { const a = Math.sin(i * 12.9898) * 43758.5453, b = Math.sin(i * 78.233) * 12543.123; return [a - Math.floor(a), b - Math.floor(b)]; });
    function drawJar(now) {
      const dpr = Math.min(2, window.devicePixelRatio || 1), W = jar.clientWidth || 300, H = jar.clientHeight || 300;
      if (jar.width !== Math.round(W * dpr)) { jar.width = Math.round(W * dpr); jar.height = Math.round(H * dpr); }
      const g = jar.getContext("2d"); g.setTransform(dpr, 0, 0, dpr, 0, 0); g.clearRect(0, 0, W, H);
      const x0 = W * 0.18, x1 = W * 0.82, y0 = H * 0.12, y1 = H * 0.94, r = 22;
      g.save(); g.beginPath(); g.moveTo(x0 + 10, y0); g.lineTo(x0, y0 + 26); g.arcTo(x0, y1, x0 + r, y1, r); g.arcTo(x1, y1, x1, y1 - r, r); g.lineTo(x1, y0 + 26); g.lineTo(x1 - 10, y0); g.closePath();
      g.fillStyle = "rgba(140,190,255,0.10)"; g.fill(); g.lineWidth = 3; g.strokeStyle = "rgba(170,210,255,0.6)"; g.stroke(); g.clip();
      g.fillStyle = "#6b4a2b"; g.fillRect(x0, y1 - 18, x1 - x0, 18);
      const nG = Math.round(Math.min(60, (s.G / Math.max(1, params.Kg)) * 60));
      g.strokeStyle = params.drought ? "#b6a24a" : COL.G; g.lineWidth = 2;
      for (let i = 0; i < nG; i++) { const x = x0 + 6 + spots[i][0] * (x1 - x0 - 12), sway = Math.sin(now / 600 + i) * 2; g.beginPath(); g.moveTo(x, y1 - 16); g.quadraticCurveTo(x + sway, y1 - 30, x + sway * 2, y1 - 38 - spots[i][1] * 14); g.stroke(); }
      const dot = (n, off, col, rad, top) => { for (let i = 0; i < n; i++) { const sp = spots[(i + off) % spots.length], x = x0 + 12 + sp[0] * (x1 - x0 - 24) + Math.sin(now / 900 + i * 3) * 4, y = y0 + 40 + (top ? sp[1] * 0.5 : 0.3 + sp[1] * 0.45) * (y1 - y0 - 80); g.beginPath(); g.arc(x, y, rad, 0, 7); g.fillStyle = col; g.fill(); } };
      dot(Math.round(Math.min(70, s.R / 2)), 20, COL.R, 4, false);
      dot(Math.round(Math.min(30, s.F / 2)), 90, COL.F, 6, true);
      g.restore();
      jar.setAttribute("aria-label", T("Kavanoz: ot ", "Jar: grass ") + Math.round(s.G) + T(", tavşan ", ", rabbits ") + Math.round(s.R) + T(", tilki ", ", foxes ") + Math.round(s.F));
    }
    function drawCharts() {
      const ch = App.sensorLab && App.sensorLab.chart; if (!ch) return;
      const H = hist.slice(-400);
      ch($("#ekChart"), [{ pts: H.map((h) => [h.t, h.G / 5]), color: COL.G }, { pts: H.map((h) => [h.t, h.R]), color: COL.R }, { pts: H.map((h) => [h.t, h.F]), color: COL.F }], { xName: "t", yName: T("birey", "count"), y0: 0 });
      ch($("#ekPhase"), [{ pts: H.map((h) => [h.R, h.F]), color: "accent" }, { pts: [[s.R, s.F]], dots: true, color: COL.F }], { xName: N.R, yName: N.F, x0: 0, y0: 0 });
      $("#ekCounts").innerHTML = ["G", "R", "F"].map((k) => '<span style="--c:' + COL[k] + '"><i></i>' + esc(N[k]) + " <b>" + Math.round(s[k]) + "</b></span>").join("") + "<span>t = " + t.toFixed(1) + "</span>";
    }
    function advance(dtSim) {
      s = step(s, params, dtSim); t += dtSim;
      if (!hist.length || t - hist[hist.length - 1].t >= 0.2) hist.push({ t, G: s.G, R: s.R, F: s.F });
      if (hist.length > 2000) hist.splice(0, hist.length - 2000);
      if (alive.F && s.F === 0) { alive.F = false; log(T("Tilkilerin nesli kavanozda tükendi.", "Foxes went extinct.")); }
      if (alive.R && s.R === 0) { alive.R = false; log(T("Tavşanların nesli tükendi; tilkiler artık aç kalacak.", "Rabbits went extinct.")); }
      if (s.F > 0) alive.F = true; if (s.R > 0) alive.R = true;
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
    $("#ekReset").onclick = () => { s = initialState(); t = 0; hist = [{ t: 0, ...s }]; alive = { R: true, F: true }; params.drought = false; const d = view.querySelector('[data-act="drought"]'); d.setAttribute("aria-pressed", "false"); d.classList.remove("is-on"); $("#ekLog").innerHTML = ""; drawCharts(); };
    view.querySelector(".eko-acts").addEventListener("click", (e) => {
      const b = e.target.closest("[data-act]"); if (!b) return;
      const a = b.dataset.act;
      if (a === "noFox") { s.F = 0; log(T("Avcılar tüm tilkileri kavanozdan çıkardı.", "All foxes removed.")); }
      else if (a === "fox") { s.F += 5; log(T("5 tilki eklendi.", "5 foxes added.")); }
      else if (a === "rab") { s.R += 20; log(T("20 tavşan eklendi.", "20 rabbits added.")); }
      else if (a === "drought") { params.drought = !params.drought; b.setAttribute("aria-pressed", String(params.drought)); b.classList.toggle("is-on", params.drought); log(params.drought ? T("Kuraklık başladı: ot yavaş büyüyor, kapasite yarıya indi.", "Drought started.") : T("Kuraklık bitti.", "Drought ended.")); }
      if (!playing) drawCharts();
    });
    $("#ekKg").addEventListener("input", (e) => { params.Kg = Number(e.target.value); $("#ekKgV").textContent = e.target.value; });
    $("#ekB").addEventListener("input", (e) => { params.beta = Number(e.target.value); $("#ekBV").textContent = Number(e.target.value).toFixed(3).replace(".", ","); });
    drawCharts();
    raf = requestAnimationFrame(frame);
    return () => cancelAnimationFrame(raf);
  }

  App.router.register("ekosistem", render);
  App.ekosistem = { DEFAULTS, deriv, rk4, step, simulate, equilibrium, EXTINCT };
})();
