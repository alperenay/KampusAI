/* =========================================================
   sonify.js — Sesli grafikler (v1.45)

   Görme engelli ve az gören öğrenciler için grafiklerin sese çevrilmesi:
     • y değeri ses perdesine eşlenir: en küçük y → 200 Hz, en büyük y → 2000 Hz (logaritmik; kulak perdeyi
       oranla algıladığı için eşit y adımı eşit "nota aralığı" duyulur). Eğri yükseldikçe ses incelir.
     • x ekseni zamandır (oynatma) ya da parmağın/klavyenin konumudur (tarama).
     • Önemli noktalarda ayırt edici kısa sesler: tepe (iki yükselen tını), dip (iki alçalan tını),
       kök/x eksenini kesme (kısa "tık"), iki eğrinin kesişmesi (üçlü tını).
     • Tarama sırasında koordinatlar ve geçilen önemli noktalar metin okuma (TTS) ile seslendirilir.
   Deney laboratuvarındaki her grafik (labs.js plot() ile çizilen eğriler) otomatik desteklenir.
   Erişilebilirlik ayarlarındaki "Sesli grafikler" açıksa grafik, klavye ve parmakla taranabilir hâle gelir.
   ========================================================= */
(function () {
  const T = (tr, en) => (App.i18n && App.i18n.lang === "en" ? en : tr);
  const F_MIN = 200, F_MAX = 2000;

  /* ---------------- Saf hesaplar (sınanabilir) ---------------- */
  /** y → frekans (Hz), [y0, y1] aralığında logaritmik 200–2000 Hz */
  function freqFor(y, y0, y1) {
    if (!isFinite(y)) return null;
    const n = y1 > y0 ? Math.max(0, Math.min(1, (y - y0) / (y1 - y0))) : 0.5;
    return F_MIN * Math.pow(F_MAX / F_MIN, n);
  }
  /** Eğriyi örnekle ve önemli noktaları bul: tepe, dip, kök. fn: x → y */
  function analyze(fn, x0, x1, N) {
    N = N || 400;
    const xs = [], ys = [];
    for (let i = 0; i <= N; i++) { const x = x0 + ((x1 - x0) * i) / N; xs.push(x); const y = fn(x); ys.push(isFinite(y) ? y : NaN); }
    const fin = ys.filter(isFinite);
    const y0 = fin.length ? Math.min(...fin) : 0, y1 = fin.length ? Math.max(...fin) : 1;
    const span = Math.max(1e-9, y1 - y0), eps = span * 1e-6;
    const features = [];
    for (let i = 1; i < N; i++) {
      const a = ys[i - 1], b = ys[i], c = ys[i + 1];
      if (![a, b, c].every(isFinite)) continue;
      if (b > a + eps && b >= c + eps) features.push({ type: "max", i, x: xs[i], y: b });
      else if (b < a - eps && b <= c - eps) features.push({ type: "min", i, x: xs[i], y: b });
    }
    for (let i = 0; i < N; i++) {
      const a = ys[i], b = ys[i + 1];
      if (!isFinite(a) || !isFinite(b)) continue;
      if (a === 0) features.push({ type: "root", i, x: xs[i], y: 0 });
      else if (a * b < 0) { const x = xs[i] + (xs[i + 1] - xs[i]) * (a / (a - b)); features.push({ type: "root", i, x, y: 0 }); }
    }
    features.sort((p, q) => p.x - q.x);
    return { xs, ys, y0, y1, features };
  }
  /** İki örneklenmiş eğrinin kesişimleri (aynı xs) */
  function intersections(A, B) {
    const out = [];
    for (let i = 0; i < A.xs.length - 1; i++) {
      const d0 = A.ys[i] - B.ys[i], d1 = A.ys[i + 1] - B.ys[i + 1];
      if (!isFinite(d0) || !isFinite(d1)) continue;
      if (d0 === 0 || d0 * d1 < 0) {
        const k = d0 === 0 ? 0 : d0 / (d0 - d1), x = A.xs[i] + (A.xs[i + 1] - A.xs[i]) * k;
        out.push({ type: "cross", i, x, y: A.ys[i] + (A.ys[i + 1] - A.ys[i]) * k });
      }
    }
    return out;
  }

  /* ---------------- Ses ---------------- */
  let ac = null;
  const audio = () => {
    if (!ac) { const C = window.AudioContext || window.webkitAudioContext; if (!C) return null; ac = new C(); }
    if (ac.state === "suspended") ac.resume();
    return ac;
  };
  /** Kısa ton dizisi: [frekans…], tür: sine/triangle */
  function chime(freqs, at, type) {
    const a = audio(); if (!a) return;
    const t0 = at || a.currentTime;
    freqs.forEach((f, k) => {
      const o = a.createOscillator(), g = a.createGain();
      o.type = type || "triangle"; o.frequency.value = f;
      const s = t0 + k * 0.07;
      g.gain.setValueAtTime(0.0001, s); g.gain.exponentialRampToValueAtTime(0.25, s + 0.01); g.gain.exponentialRampToValueAtTime(0.0001, s + 0.12);
      o.connect(g).connect(a.destination); o.start(s); o.stop(s + 0.14);
    });
  }
  const CHIME = { max: [1320, 1760], min: [660, 440], root: [2400], cross: [880, 1110, 1320] };
  const featName = (f) => ({ max: T("tepe noktası", "maximum"), min: T("dip noktası", "minimum"), root: T("x eksenini kesiyor", "crosses the x-axis"), cross: T("eğriler kesişiyor", "curves intersect") }[f.type]);
  const num = (v) => (Math.abs(v) < 5e-4 ? "0" : String(Number(v.toFixed(2))).replace(".", App.i18n && App.i18n.lang === "en" ? "." : ","));

  let playing = null;
  function stop() {
    if (playing) { try { playing.o.stop(); } catch (e) { /* bitti */ } playing = null; }
  }
  /** Eğrileri soldan sağa çal (süre saniye). curves: [{ fn, x0, x1, name? }] — birden çok eğri sırayla çalınır */
  function play(curves, opts) {
    opts = opts || {};
    const a = audio(); if (!a || !curves.length) return 0;
    stop();
    const dur = opts.duration || 4, gap = 0.5;
    const an = curves.map((c) => analyze(c.fn, c.x0, c.x1));
    const y0 = Math.min(...an.map((x) => x.y0)), y1 = Math.max(...an.map((x) => x.y1));
    const crosses = an.length > 1 ? intersections(an[0], an[1]) : [];
    let t = a.currentTime + 0.1;
    const o = a.createOscillator(), g = a.createGain();
    o.type = "sine"; g.gain.value = 0.0001; o.connect(g).connect(a.destination);
    an.forEach((A, ci) => {
      const step = dur / (A.xs.length - 1);
      g.gain.setValueAtTime(0.0001, t); g.gain.exponentialRampToValueAtTime(0.15, t + 0.05);
      A.ys.forEach((y, i) => {
        const f = freqFor(y, y0, y1), at = t + i * step;
        if (f) o.frequency.setValueAtTime(f, at);
        if (!isFinite(y)) g.gain.setValueAtTime(0.0001, at); else if (i && !isFinite(A.ys[i - 1])) g.gain.setValueAtTime(0.15, at);
      });
      A.features.forEach((ft) => chime(CHIME[ft.type], t + ft.i * step));
      if (ci === 0) crosses.forEach((ft) => chime(CHIME.cross, t + ft.i * step, "sine"));
      t += dur;
      g.gain.setValueAtTime(0.15, t - 0.05); g.gain.exponentialRampToValueAtTime(0.0001, t);
      t += gap;
    });
    o.start(); o.stop(t);
    playing = { o };
    o.onended = () => { if (playing && playing.o === o) playing = null; };
    return t - a.currentTime;
  }
  /** Grafiğin sözlü özeti (önemli noktalar) */
  function describe(curves) {
    const an = curves.map((c) => analyze(c.fn, c.x0, c.x1));
    const parts = an.map((A, i) => {
      const fs = A.features.slice(0, 8).map((f) => featName(f) + " (" + num(f.x) + T(" ; ", ", ") + num(f.y) + ")");
      return (curves.length > 1 ? T((i + 1) + ". eğri: ", "Curve " + (i + 1) + ": ") : "") +
        T("en küçük değer " + num(A.y0) + ", en büyük değer " + num(A.y1), "minimum " + num(A.y0) + ", maximum " + num(A.y1)) + (fs.length ? ". " + fs.join(", ") : "");
    });
    if (an.length > 1) { const cr = intersections(an[0], an[1]); if (cr.length) parts.push(T("Eğriler ", "The curves intersect at ") + cr.map((c) => "x = " + num(c.x)).join(", ") + T(" noktasında kesişiyor", "")); }
    return parts.join(". ") + ".";
  }

  /* ---------------- Tarama (parmak / klavye) ---------------- */
  /** Bir tuvale tarama ekler. getCurves(): [{ fn, x0, x1, F (labs çerçevesi: X/Y, px/pw) }] */
  function attachScrub(canvas, getCurves) {
    if (canvas.__sonify) return canvas.__sonify;
    let o = null, g = null, lastSay = 0, lastFeat = null, kx = null;
    const start = () => {
      const a = audio(); if (!a || o) return;
      o = a.createOscillator(); g = a.createGain(); o.type = "sine"; g.gain.value = 0.12; o.connect(g).connect(a.destination); o.start();
    };
    const end = () => { if (o) { try { g.gain.setTargetAtTime(0.0001, audio().currentTime, 0.03); o.stop(audio().currentTime + 0.1); } catch (e) { /* yok */ } } o = null; };
    function at(x, speak) {
      const cs = getCurves(); if (!cs.length) return;
      const c = cs[0], A = c.__an || (c.__an = analyze(c.fn, c.x0, c.x1));
      const xx = Math.max(c.x0, Math.min(c.x1, x)), y = c.fn(xx), f = freqFor(y, A.y0, A.y1);
      if (o && f) o.frequency.setTargetAtTime(f, audio().currentTime, 0.02);
      if (g) g.gain.setTargetAtTime(isFinite(y) ? 0.12 : 0.0001, audio().currentTime, 0.02);
      const near = A.features.find((ft) => Math.abs(ft.x - xx) < (c.x1 - c.x0) / 120);
      if (near && near !== lastFeat) { lastFeat = near; chime(CHIME[near.type]); if (App.speech) App.speech.say(featName(near) + ", x " + num(near.x) + T(", y ", ", y ") + num(near.y), { rate: 1.2 }); lastSay = Date.now(); return; }
      if (!near) lastFeat = null;
      if (speak || Date.now() - lastSay > 900) { lastSay = Date.now(); if (App.speech) App.speech.say("x " + num(xx) + ", y " + (isFinite(y) ? num(y) : T("tanımsız", "undefined")), { rate: 1.25 }); }
    }
    const toX = (e) => {
      const cs = getCurves(); if (!cs.length) return null;
      const r = canvas.getBoundingClientRect(), px = e.clientX - r.left, c = cs[0], F = c.F;
      return F ? c.x0 + ((px - F.px) / F.pw) * (F.x1 - F.x0) : c.x0 + (px / r.width) * (c.x1 - c.x0);
    };
    const onDown = (e) => { if (!enabled()) return; start(); const x = toX(e); if (x != null) at(x); };
    const onMove = (e) => { if (!enabled() || !o) return; const x = toX(e); if (x != null) at(x); };
    const onUp = () => end();
    const onKey = (e) => {
      if (!enabled()) return;
      const cs = getCurves(); if (!cs.length) return;
      const c = cs[0], step = (c.x1 - c.x0) / 50;
      if (kx == null) kx = c.x0;
      if (e.key === "ArrowRight" || e.key === "ArrowLeft") { e.preventDefault(); start(); kx = Math.max(c.x0, Math.min(c.x1, kx + (e.key === "ArrowRight" ? step : -step))); at(kx, true); clearTimeout(canvas.__sonT); canvas.__sonT = setTimeout(end, 600); }
      else if (e.key === "Enter" || e.key === " ") { e.preventDefault(); play(cs); }
      else if (e.key === "d" || e.key === "D") { e.preventDefault(); if (App.speech) App.speech.say(describe(cs)); }
    };
    canvas.addEventListener("pointerdown", onDown); canvas.addEventListener("pointermove", onMove);
    canvas.addEventListener("pointerup", onUp); canvas.addEventListener("pointerleave", onUp); canvas.addEventListener("keydown", onKey);
    const api = { at, end };
    canvas.__sonify = api;
    return api;
  }

  const enabled = () => !!App.prefs.get("a11ySonify", false);

  App.sonify = { freqFor, analyze, intersections, play, stop, describe, attachScrub, enabled, chime, F_MIN, F_MAX };
})();
