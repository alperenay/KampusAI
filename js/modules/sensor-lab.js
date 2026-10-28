/* =========================================================
   sensor-lab.js — Telefon Sensörleriyle Gerçek Deney (v1.45)   #/sensor  ·  #/sensor/<deney>

   Telefonun kendi sensörleri ölçüm aleti olur; ölçülen veri, Maarif programındaki formülle hesaplanan kuramsal
   eğriyle aynı grafikte karşılaştırılır ve bağıl hata yüzdesi verilir.
     sarkac   İvmeölçer: ipe asılı telefonun salınımı → ortalama geçişlerden periyot; T = 2π√(L/g)
     g        İvmeölçer: durgun telefonda |a| ≈ g; serbest düşme süresinden yükseklik h = ½gt²
     asansor  İvmeölçer: düşey ivme grafiği ve görünen ağırlık N = m(g + a)
     ses      Mikrofon: dalga biçimi, spektrum (FFT), temel frekans (özilinti); Doppler: v = c(1 − f₀/f)
     isik     Kamera: görüntü parlaklığı; farklı uzaklıklarda ölçüm → E = k/d² uydurma (ters kare yasası)
   Ham veri düşük geçiren süzgeçten (üstel ortalama) geçirilir. Ölçüm geçmişi cihazda tutulur (meta "sensor:<deney>").
   Bilgisayarda ivmeölçer yoktur; bu deneyler telefon/tablette çalışır (iPhone'da hareket izni istenir).
   ========================================================= */
(function () {
  const { esc } = App.utils;
  const T = (tr, en) => (App.i18n && App.i18n.lang === "en" ? en : tr);
  const G = 9.81, C_SOUND = 343;

  /* ================= Saf hesaplar (sınanabilir) ================= */
  /** Üstel düşük geçiren süzgeç: y[i] = y[i−1] + α(x[i] − y[i−1]) */
  function lowPass(xs, alpha) {
    const out = []; let y = null;
    xs.forEach((x) => { y = y == null ? x : y + alpha * (x - y); out.push(y); });
    return out;
  }
  const mean = (a) => a.reduce((s, x) => s + x, 0) / Math.max(1, a.length);
  const variance = (a) => { const m = mean(a); return mean(a.map((x) => (x - m) * (x - m))); };
  /** Ortalama değerin (histerezisli) yukarı yönde kesildiği anlardan periyot. t: saniye */
  function periodByCrossings(ts, ys, hyst) {
    if (ys.length < 10) return null;
    const m = mean(ys), amp = Math.sqrt(variance(ys));
    const h = (hyst == null ? 0.15 : hyst) * amp;
    const ups = []; let armed = false;
    for (let i = 1; i < ys.length; i++) {
      if (ys[i] < m - h) armed = true;
      if (armed && ys[i - 1] < m && ys[i] >= m) {
        const k = (m - ys[i - 1]) / (ys[i] - ys[i - 1]); ups.push(ts[i - 1] + k * (ts[i] - ts[i - 1])); armed = false;
      }
    }
    if (ups.length < 3) return null;
    const d = []; for (let i = 1; i < ups.length; i++) d.push(ups[i] - ups[i - 1]);
    const med = d.slice().sort((a, b) => a - b)[Math.floor(d.length / 2)];
    const good = d.filter((x) => Math.abs(x - med) < 0.3 * med);           // dışlayıcı (sarsıntı) aralıklar atılır
    return good.length ? { T: mean(good), n: good.length, crossings: ups } : null;
  }
  /** Özilintiyle temel frekans (Hz). buf: Float32 örnekler, sr: örnekleme hızı */
  function autocorrPitch(buf, sr, fMin, fMax) {
    fMin = fMin || 60; fMax = fMax || 2000;
    const n = buf.length; let rms = 0;
    for (let i = 0; i < n; i++) rms += buf[i] * buf[i];
    rms = Math.sqrt(rms / n);
    if (rms < 0.01) return null;                                           // sessiz
    const lo = Math.floor(sr / fMax), hi = Math.min(n - 1, Math.ceil(sr / fMin));
    const r = new Float32Array(hi + 2);
    for (let lag = lo; lag <= hi + 1; lag++) { let s = 0; for (let i = 0; i < n - lag; i++) s += buf[i] * buf[i + lag]; r[lag] = s; }
    let best = -1, bestLag = -1;
    for (let lag = lo + 1; lag <= hi; lag++) if (r[lag] > r[lag - 1] && r[lag] >= r[lag + 1] && r[lag] > best) { best = r[lag]; bestLag = lag; }
    if (bestLag < 0) return null;
    // tepeyi parabolle incelt (alt örnek doğruluğu)
    const a = r[bestLag - 1], b = r[bestLag], c = r[bestLag + 1], den = a - 2 * b + c;
    const shift = den ? 0.5 * (a - c) / den : 0;
    return sr / (bestLag + shift);
  }
  /** Spektrumdan (dB dizisi) en güçlü tepe: { f, db } */
  function spectrumPeak(db, sr, fftSize, fMin) {
    const bin = sr / fftSize, start = Math.max(1, Math.floor((fMin || 50) / bin));
    let k = start;
    for (let i = start; i < db.length; i++) if (db[i] > db[k]) k = i;
    return { f: k * bin, db: db[k] };
  }
  /** Doppler: hareketsiz gözlemci, kaynak yaklaşıyorsa f > f₀. v > 0 yaklaşma, v < 0 uzaklaşma (m/s) */
  const dopplerSpeed = (f0, f, c) => (c || C_SOUND) * (1 - f0 / f);
  /** E = k/d² en küçük kareler: k = Σ(E/d²)/Σ(1/d⁴); R² ve nokta hataları */
  function fitInverseSquare(pts) {
    const ok = pts.filter((p) => p.d > 0 && p.E > 0);
    if (ok.length < 2) return null;
    const k = ok.reduce((s, p) => s + p.E / (p.d * p.d), 0) / ok.reduce((s, p) => s + 1 / Math.pow(p.d, 4), 0);
    const m = mean(ok.map((p) => p.E));
    const ssRes = ok.reduce((s, p) => s + Math.pow(p.E - k / (p.d * p.d), 2), 0), ssTot = ok.reduce((s, p) => s + Math.pow(p.E - m, 2), 0);
    return { k, r2: ssTot ? 1 - ssRes / ssTot : 1, errors: ok.map((p) => ({ d: p.d, E: p.E, fit: k / (p.d * p.d), err: relErr(p.E, k / (p.d * p.d)) })) };
  }
  const relErr = (measured, theory) => (theory ? (Math.abs(measured - theory) / Math.abs(theory)) * 100 : null);
  const pendulumT = (L, g) => 2 * Math.PI * Math.sqrt(L / (g || G));
  /** Serbest düşme: |a| eşiğin altında kaldığı en uzun süre (s) */
  function freeFallTime(ts, mags, thr) {
    thr = thr || 3; let best = 0, s = null;
    for (let i = 0; i < mags.length; i++) {
      if (mags[i] < thr) { if (s == null) s = ts[i]; best = Math.max(best, ts[i] - s); } else s = null;
    }
    return best;
  }

  /* ================= Sensör erişimi ================= */
  async function motionPermission() {
    if (typeof DeviceMotionEvent === "undefined") throw new Error(T("Bu cihazda hareket sensörü yok (bilgisayar). Telefon ya da tablette dene.", "No motion sensor on this device. Use a phone or tablet."));
    if (typeof DeviceMotionEvent.requestPermission === "function") {
      const r = await DeviceMotionEvent.requestPermission();
      if (r !== "granted") throw new Error(T("Hareket sensörü izni verilmedi.", "Motion permission denied."));
    }
  }
  /** İvmeölçer kaydı: onSample({ t, ax, ay, az, mag }) — durdurma fonksiyonu döner */
  function listenMotion(onSample) {
    let got = false;
    const h = (e) => {
      const a = e.accelerationIncludingGravity; if (!a || a.x == null) return;
      got = true;
      const ax = a.x, ay = a.y, az = a.z;
      onSample({ t: performance.now() / 1000, ax, ay, az, mag: Math.sqrt(ax * ax + ay * ay + az * az) });
    };
    window.addEventListener("devicemotion", h);
    const chk = setTimeout(() => { if (!got) onSample({ error: T("Sensörden veri gelmiyor. Bu cihazda ivmeölçer olmayabilir.", "No data from the sensor.") }); }, 1500);
    return () => { clearTimeout(chk); window.removeEventListener("devicemotion", h); };
  }

  /* ================= Grafik ================= */
  function chart(cv, series, opts) {
    const dpr = Math.min(2, window.devicePixelRatio || 1), W = cv.clientWidth || 320, H = cv.clientHeight || 200;
    if (cv.width !== Math.round(W * dpr)) { cv.width = Math.round(W * dpr); cv.height = Math.round(H * dpr); }
    const ctx = cv.getContext("2d"); ctx.setTransform(dpr, 0, 0, dpr, 0, 0); ctx.clearRect(0, 0, W, H);
    const U = App.labs && App.labs.util, c = U ? U.colors() : { text: "#ddd", muted: "#999", accent: "#4f7cff", warn: "#f2b33d", good: "#3fb950", grid: "#333", border: "#555" };
    const all = series.flatMap((s) => s.pts || []);
    const xs = all.map((p) => p[0]), ys = all.map((p) => p[1]).filter(isFinite);
    const x0 = opts.x0 != null ? opts.x0 : xs.length ? Math.min(...xs) : 0, x1 = opts.x1 != null ? opts.x1 : xs.length ? Math.max(...xs, x0 + 1e-6) : 1;
    let y0 = opts.y0 != null ? opts.y0 : ys.length ? Math.min(...ys) : 0, y1 = opts.y1 != null ? opts.y1 : ys.length ? Math.max(...ys) : 1;
    if (y1 - y0 < 1e-6) { y0 -= 1; y1 += 1; }
    const F = U ? U.frame(40, 10, W - 50, H - 30, x0, x1, y0, y1) : null;
    if (U) U.axes(ctx, F, c, { xName: opts.xName, yName: opts.yName });
    series.forEach((s) => {
      const col = c[s.color] || s.color || c.accent;
      if (s.fn && U) { U.plot(ctx, F, s.fn, col, 2, s.dash); return; }
      const P = s.pts || []; if (!P.length) return;
      ctx.strokeStyle = col; ctx.lineWidth = s.w || 1.8; ctx.setLineDash(s.dash || []); ctx.beginPath();
      P.forEach((p, i) => { const X = F ? F.X(p[0]) : (p[0] - x0) / (x1 - x0) * W, Y = F ? F.Y(p[1]) : H - (p[1] - y0) / (y1 - y0) * H; i ? ctx.lineTo(X, Y) : ctx.moveTo(X, Y); });
      if (s.dots) P.forEach((p) => { ctx.fillStyle = col; ctx.beginPath(); ctx.arc(F.X(p[0]), F.Y(p[1]), 4, 0, 7); ctx.fill(); });
      else ctx.stroke();
      ctx.setLineDash([]);
    });
  }

  /* ================= Deneyler ================= */
  const row = (k, v) => "<div><span>" + esc(k) + "</span><b>" + v + "</b></div>";
  const fmt = (x, d) => (x == null || !isFinite(x) ? "—" : Number(x).toFixed(d == null ? 2 : d).replace(".", App.i18n.lang === "en" ? "." : ","));
  async function saveResult(id, data) {
    const rid = "sensor:" + id, cur = (await App.db.get("meta", rid).catch(() => null)) || { id: rid, kind: "sensor", items: [] };
    if (!Array.isArray(cur.items)) cur.items = [];
    cur.items.unshift(Object.assign({ at: new Date().toISOString() }, data)); cur.items = cur.items.slice(0, 10);
    await App.db.put("meta", cur);
  }

  const EXP = {
    sarkac: {
      icon: "refresh", title: () => T("Sarkaç periyodu (ivmeölçer)", "Pendulum period (accelerometer)"),
      how: () => T("Telefonu sağlam bir ipin ucuna (kılıf ya da torbayla) as, ipin boyunu L olarak gir. Küçük açıyla (≤ 15°) salınım başlat, sonra Ölç'e bas. 15 saniye kaydedilir.", "Hang the phone on a string, enter L, start a small swing, press Measure."),
      params: [{ id: "L", label: T("İp boyu L (m, asma noktasından telefonun ortasına)", "String length L (m)"), value: 0.8, step: 0.01 }],
      dur: 15, keys: ["10/fizik/u4/k1", "12/fizik/u2/k1"]
    },
    g: {
      icon: "arrowDown", title: () => T("Yer çekimi ivmesi ve serbest düşme", "Gravity and free fall"),
      how: () => T("1) Telefonu masaya koy ve Ölç'e bas: durgun telefonun ölçtüğü ivme g'dir. 2) İstersen yumuşak bir yastığın 20–40 cm üstünden bırak: serbest düşme süresinden yükseklik hesaplanır.", "Place the phone still and measure g; optionally drop onto a cushion to time free fall."),
      params: [{ id: "h", label: T("Bırakma yüksekliği h (m, düşme deneyi için)", "Drop height h (m)"), value: 0.3, step: 0.01 }],
      dur: 6, keys: ["9/fizik/u2/k6", "11/fizik/u1/k1"]
    },
    asansor: {
      icon: "arrowUp", title: () => T("Asansörde düşey ivme ve görünen ağırlık", "Vertical acceleration in a lift"),
      how: () => T("Telefonu ekranı yukarı bakacak şekilde avucunda düz tut, asansör hareket etmeden Ölç'e bas ve yolculuk boyunca kaydet (20 s). Kalkışta ivme yukarı, duruşta aşağı yönlüdür.", "Hold the phone flat, start before the lift moves, record the ride."),
      params: [{ id: "m", label: T("Kütlen m (kg)", "Your mass m (kg)"), value: 60, step: 1 }],
      dur: 20, keys: ["11/fizik/u1/k3", "10/fizik/u1/k3"]
    },
    ses: {
      icon: "mic", title: () => T("Ses: frekans, rezonans ve Doppler", "Sound: frequency, resonance and Doppler"),
      how: () => T("Mikrofon dinlenir. Bir ton (diyapazon, flüt, ikinci telefondan çalınan ton) çal: temel frekans bulunur. Doppler için önce durgun kaynağın frekansını f₀ olarak kaydet, sonra kaynağı mikrofona doğru hareket ettir.", "Play a tone; record f₀ at rest, then move the source for Doppler."),
      params: [{ id: "fRef", label: T("Beklenen frekans (Hz, ör. La = 440)", "Expected frequency (Hz)"), value: 440, step: 1 }],
      dur: 0, keys: ["11/fizik/u4/k3", "12/fizik/u3/k2"]
    },
    isik: {
      icon: "sun", title: () => T("Işık şiddeti ve ters kare yasası", "Light intensity and the inverse-square law"),
      how: () => T("Karanlık bir odada kamerayı tek bir lambaya (ya da başka telefonun fenerine) doğrult. Uzaklığı d gir ve Ekle'ye bas; en az 4 farklı uzaklıkta ölç. Kamera otomatik pozlama yaptığı için sonuç yaklaşık bir doğrulamadır.", "Aim the camera at one lamp, add readings at 4+ distances."),
      params: [{ id: "d", label: T("Lambaya uzaklık d (m)", "Distance d (m)"), value: 0.5, step: 0.05 }],
      dur: 0, keys: ["10/fizik/u5/k1"]
    }
  };

  function renderHome(view) {
    App.setTitle(T("Sensör Laboratuvarı", "Sensor Lab"));
    view.innerHTML = '<div class="page sl">' +
      '<div class="page-head"><div><h1>' + esc(T("Sensör Laboratuvarı", "Sensor Lab")) + "</h1><p>" +
        esc(T("Telefonunun ivmeölçeri, mikrofonu ve kamerası ölçüm aletine dönüşür. Ölçtüğün değer, formülden hesaplanan kuramsal değerle aynı grafikte karşılaştırılır.", "Your phone's sensors become lab instruments, compared against theory.")) + "</p></div></div>" +
      '<a class="card sl-workbench" href="#/sensor/olcum"><h2>' + esc(T("Çoklu sensör · grafik ve dışa aktarım", "Multi-sensor · charts and export")) + '</h2><p>' + esc(T("İvme, jiroskop, ortam ışığı, manyetometre, dBFS ses seviyesi ve etiketli simülasyonlar", "Acceleration, gyroscope, ambient light, magnetometer, dBFS audio and labelled simulation")) + '</p></a><div class="sl-grid">' + Object.entries(EXP).map(([id, e]) =>
        '<a class="card sl-card" href="#/sensor/' + id + '"><span class="sl-card__ico">' + App.icon(e.icon) + "</span><b>" + esc(e.title()) + "</b><small>" + esc(e.how().split(".")[0] + ".") + "</small></a>").join("") + "</div>" +
      '<p class="hint">' + esc(T("İvmeölçer deneyleri telefon ve tablette çalışır; bilgisayarda yalnızca ses ve ışık deneyleri yapılabilir. Telefonu düşürme deneyini yalnızca yumuşak bir yüzeyin üstünde ve kısa yükseklikten yap.", "Accelerometer labs need a phone or tablet; drop only onto a soft surface.")) + "</p></div>";
    App.hydrateIcons(view);
  }

  function renderExp(view, id) {
    const E = EXP[id]; if (!E) return renderHome(view);
    App.setTitle(E.title());
    const P = {}; E.params.forEach((p) => { P[p.id] = Number(App.prefs.get("sl:" + id + ":" + p.id, p.value)); });
    view.innerHTML = '<div class="page sl">' +
      '<a class="btn btn--sm btn--ghost" href="#/sensor">' + App.icon("chevronL") + esc(T("Sensör Laboratuvarı", "Sensor Lab")) + "</a>" +
      '<div class="page-head"><div><h1>' + esc(E.title()) + "</h1><p>" + esc(E.how()) + "</p></div></div>" +
      '<div class="sl-wrap"><section class="card sl-stage"><canvas class="sl-cv" id="slCv" role="img" aria-label="' + esc(E.title()) + '"></canvas>' +
        '<canvas class="sl-cv sl-cv--2" id="slCv2" hidden></canvas>' +
        '<div class="sl-acts"><button class="btn btn--primary" type="button" id="slGo">' + App.icon("play") + esc(id === "isik" ? T("Kamerayı aç", "Start camera") : id === "ses" ? T("Mikrofonu aç", "Start microphone") : T("Ölç", "Measure")) + "</button>" +
          (id === "ses" ? '<button class="btn" type="button" id="slF0" disabled>' + esc(T("f₀ olarak kaydet", "Save as f₀")) + "</button>" : "") +
          (id === "isik" ? '<button class="btn" type="button" id="slAdd" disabled>' + App.icon("plus") + esc(T("Bu uzaklıkta ekle", "Add reading")) + '</button><button class="btn btn--ghost" type="button" id="slClear">' + esc(T("Temizle", "Clear")) + "</button>" : "") +
          '<span class="sl-status" id="slStatus" aria-live="polite"></span></div></section>' +
      '<aside class="card sl-side"><div class="sl-params">' + E.params.map((p) => '<label class="field"><span class="field__label">' + esc(p.label) + '</span><input class="input" type="number" min="' + p.step + '" required step="' + p.step + '" data-p="' + p.id + '" value="' + P[p.id] + '"></label>').join("") + "</div>" +
        '<div class="lab__read sl-read" id="slRead"></div><div id="slHist"></div>' +
        '<div class="sl-links">' + E.keys.filter((k) => App.lessons.find(k)).map((k) => '<a href="#/konular/' + k + '">' + App.icon("book") + esc(App.L(App.lessons.find(k).outcome.title)) + "</a>").join("") + "</div></aside></div></div>";
    App.hydrateIcons(view);
    const $ = (s) => view.querySelector(s), cv = $("#slCv"), status = $("#slStatus"), read = $("#slRead");
    const validParams = () => { const invalid = Array.from(view.querySelectorAll("[data-p]")).find((inp) => !inp.checkValidity()); if (invalid) { invalid.reportValidity(); return false; } return true; };
    view.querySelectorAll("[data-p]").forEach((inp) => inp.addEventListener("change", () => {
      const value = inp.valueAsNumber;
      inp.setCustomValidity(Number.isFinite(value) && value > 0 ? "" : T("Sıfırdan büyük, geçerli bir değer gir.", "Enter a finite value greater than zero."));
      if (!inp.checkValidity()) { inp.reportValidity(); return; }
      P[inp.dataset.p] = value; App.prefs.set("sl:" + id + ":" + inp.dataset.p, value);
    }));
    let stopFn = null, epoch = 0;
    const gone = (mine) => mine !== epoch || !document.contains(cv);
    const stopStream = (stream) => stream.getTracks().forEach((track) => track.stop());
    const cleanup = () => { epoch++; if (stopFn) { try { stopFn(); } catch (e) { /* yok */ } stopFn = null; } };
    const paintHist = async () => {
      const h = await App.db.get("meta", "sensor:" + id).catch(() => null);
      if (!document.contains(cv)) return;
      $("#slHist").innerHTML = h && Array.isArray(h.items) && h.items.length ? '<h3 class="sl-h">' + esc(T("Son ölçümler", "Recent results")) + '</h3><ul class="sl-hist">' + h.items.slice(0, 5).map((x) => "<li>" + esc(App.utils.fmtDateTime ? App.utils.fmtDateTime(x.at) : x.at) + " · <b>" + esc(x.summary) + "</b></li>").join("") + "</ul>" : "";
    };
    paintHist();
    chart(cv, [], { xName: "t (s)" });

    /* ---- İvmeölçer deneyleri ---- */
    async function motionRun() {
      if (!validParams()) return;
      cleanup();
      const mine = epoch;
      try { await motionPermission(); } catch (e) { status.textContent = e.message; return; }
      if (gone(mine)) return;
      const S = []; let t0 = null, err = null;
      status.textContent = T("Kaydediliyor…", "Recording…");
      $("#slGo").disabled = true;
      stopFn = listenMotion((s) => {
        if (gone(mine)) return;
        if (s.error) { err = s.error; return; }
        if (t0 == null) t0 = s.t;
        S.push(Object.assign(s, { t: s.t - t0 }));
        if (S.length % 6 === 0) live(S);
      });
      const end = () => { cleanup(); $("#slGo").disabled = false; if (err && !S.length) { status.textContent = err; return; } finish(S); };
      const tick = setInterval(() => { const left = E.dur - (S.length ? S[S.length - 1].t : 0); status.textContent = T("Kaydediliyor… ", "Recording… ") + Math.max(0, Math.ceil(left)) + " s"; if (left <= 0 || (err && !S.length)) { clearInterval(tick); end(); } }, 250);
      const prev = stopFn; stopFn = () => { clearInterval(tick); prev(); };
    }
    // Sarkaç: salınım ekseni en çok değişen eksendir
    const swingAxis = (S) => ["ax", "ay", "az"].map((k) => [k, variance(S.map((s) => s[k]))]).sort((a, b) => b[1] - a[1])[0][0];
    function live(S) {
      const ts = S.map((s) => s.t);
      if (id === "sarkac") { const k = swingAxis(S), f = lowPass(S.map((s) => s[k]), 0.25); chart(cv, [{ pts: ts.map((t, i) => [t, f[i]]) }], { xName: "t (s)", yName: "a (m/s²)" }); }
      else if (id === "g") chart(cv, [{ pts: ts.map((t, i) => [t, S[i].mag]), color: "accent" }, { fn: () => G, color: "good", dash: [6, 4] }], { xName: "t (s)", yName: "|a| (m/s²)", y0: 0, y1: 20 });
      else if (id === "asansor") { const f = lowPass(S.map((s) => s.mag), 0.08); chart(cv, [{ pts: ts.map((t, i) => [t, f[i] - G]) }, { fn: () => 0, color: "good", dash: [6, 4] }], { xName: "t (s)", yName: "a (m/s²)" }); }
    }
    async function finish(S) {
      if (S.length < 20) { status.textContent = T("Yeterli veri gelmedi.", "Not enough data."); return; }
      const ts = S.map((s) => s.t);
      let html = "", summary = "";
      if (id === "sarkac") {
        const k = swingAxis(S), f = lowPass(S.map((s) => s[k]), 0.25), r = periodByCrossings(ts, f);
        const Tt = pendulumT(P.L);
        chart(cv, [{ pts: ts.map((t, i) => [t, f[i]]) }, { fn: (t) => mean(f) + Math.sqrt(2 * variance(f)) * Math.cos((2 * Math.PI * t) / Tt), color: "good", dash: [6, 4] }], { xName: "t (s)", yName: "a (m/s²)" });
        if (!r) { status.textContent = T("Düzenli salınım bulunamadı; telefonun serbestçe salındığından emin ol.", "No regular swing found."); return; }
        const gEst = (4 * Math.PI * Math.PI * P.L) / (r.T * r.T);
        html = row(T("Ölçülen periyot", "Measured period"), fmt(r.T, 3) + " s (" + r.n + T(" salınım", " swings") + ")") + row(T("Kuramsal T = 2π√(L/g)", "Theory T"), fmt(Tt, 3) + " s") +
          row(T("Bağıl hata", "Relative error"), "%" + fmt(relErr(r.T, Tt), 1)) + row(T("Ölçümden g = 4π²L/T²", "g from data"), fmt(gEst, 2) + " m/s²");
        summary = "T = " + fmt(r.T, 3) + " s, %" + fmt(relErr(r.T, Tt), 1);
      } else if (id === "g") {
        const rest = S.filter((s, i) => i > 5 && Math.abs(s.mag - G) < 1.5), gMeas = rest.length ? mean(lowPass(rest.map((s) => s.mag), 0.2).slice(-Math.min(60, rest.length))) : null;
        const tf = freeFallTime(ts, S.map((s) => s.mag)), hMeas = tf > 0.12 ? 0.5 * G * tf * tf : null, tTheory = Math.sqrt((2 * P.h) / G);
        html = row(T("Durgun telefonda g", "g at rest"), fmt(gMeas, 2) + " m/s²") + row(T("Bağıl hata (9,81'e göre)", "Error vs 9.81"), gMeas ? "%" + fmt(relErr(gMeas, G), 1) : "—") +
          row(T("Serbest düşme süresi", "Free-fall time"), tf > 0.12 ? fmt(tf, 3) + " s" : T("düşme yok", "no drop")) +
          (hMeas ? row(T("Hesaplanan yükseklik ½gt²", "Height ½gt²"), fmt(hMeas, 2) + " m") + row(T("Kuramsal süre √(2h/g)", "Theory time"), fmt(tTheory, 3) + " s") + row(T("Süre hatası", "Time error"), "%" + fmt(relErr(tf, tTheory), 1)) : "");
        summary = "g = " + fmt(gMeas, 2) + (hMeas ? ", t = " + fmt(tf, 3) + " s" : "");
        live(S);
      } else if (id === "asansor") {
        const f = lowPass(S.map((s) => s.mag), 0.08), a = f.map((x) => x - G);
        const aMax = Math.max(...a), aMin = Math.min(...a);
        live(S);
        html = row(T("En büyük yukarı ivme", "Max upward a"), fmt(aMax, 2) + " m/s²") + row(T("En büyük aşağı ivme", "Max downward a"), fmt(-aMin, 2) + " m/s²") +
          row(T("Görünen ağırlık aralığı N = m(g + a)", "Apparent weight"), fmt(P.m * (G + aMin), 0) + " – " + fmt(P.m * (G + aMax), 0) + " N") +
          row(T("Durgunken ağırlık mg", "Weight at rest"), fmt(P.m * G, 0) + " N");
        summary = "a: " + fmt(aMin, 2) + " … " + fmt(aMax, 2) + " m/s²";
      }
      read.innerHTML = html; status.textContent = T("Tamamlandı.", "Done.");
      await saveResult(id, { summary }); paintHist();
    }

    /* ---- Ses ---- */
    async function soundRun() {
      if (!validParams()) return;
      cleanup();
      const mine = epoch;
      let stream, ac;
      try {
        stream = await navigator.mediaDevices.getUserMedia({ audio: { echoCancellation: false, noiseSuppression: false, autoGainControl: false } });
      } catch (e) { status.textContent = T("Mikrofon açılamadı (izin verilmedi ya da mikrofon yok).", "Microphone unavailable."); return; }
      if (gone(mine)) { stopStream(stream); return; }
      ac = new (window.AudioContext || window.webkitAudioContext)();
      const src = ac.createMediaStreamSource(stream), an = ac.createAnalyser();
      an.fftSize = 4096; an.smoothingTimeConstant = 0.6; src.connect(an);
      const buf = new Float32Array(an.fftSize), db = new Float32Array(an.frequencyBinCount);
      const cv2 = $("#slCv2"); cv2.hidden = false;
      let f0 = Number(App.prefs.get("sl:ses:f0", 0)) || null, fSm = null, raf = 0, hist = [], t0 = performance.now();
      $("#slF0").disabled = false;
      $("#slF0").onclick = () => { if (fSm) { f0 = fSm; App.prefs.set("sl:ses:f0", f0); App.ui.toast("f₀ = " + fmt(f0, 1) + " Hz"); saveResult(id, { summary: "f₀ = " + fmt(f0, 1) + " Hz" }).then(paintHist); } };
      const loop = () => {
        an.getFloatTimeDomainData(buf); an.getFloatFrequencyData(db);
        const f = autocorrPitch(buf, ac.sampleRate);
        if (f) fSm = fSm == null ? f : fSm + 0.3 * (f - fSm);
        const t = (performance.now() - t0) / 1000;
        if (fSm) { hist.push([t, fSm]); if (hist.length > 300) hist.shift(); }
        // üst: dalga biçimi (ilk 1024 örnek), alt: spektrum
        const n = 1024, wav = []; for (let i = 0; i < n; i += 4) wav.push([(i / ac.sampleRate) * 1000, buf[i]]);
        chart(cv, [{ pts: wav }], { xName: "t (ms)", yName: T("genlik", "amp."), y0: -1, y1: 1 });
        const bin = ac.sampleRate / an.fftSize, spec = []; for (let k = 2; k < Math.min(db.length, 3000 / bin); k++) spec.push([k * bin, Math.max(-120, db[k])]);
        chart(cv2, [{ pts: spec, color: "warn" }].concat(P.fRef ? [{ pts: [[P.fRef, -120], [P.fRef, -10]], color: "good", dash: [5, 4] }] : []), { xName: "f (Hz)", yName: "dB", y0: -120, y1: -10, x0: 0, x1: 3000 });
        const pk = spectrumPeak(db, ac.sampleRate, an.fftSize, 60);
        const v = f0 && fSm ? dopplerSpeed(f0, fSm) : null;
        read.innerHTML = row(T("Temel frekans (özilinti)", "Fundamental"), fSm ? fmt(fSm, 1) + " Hz" : T("ses yok", "silence")) +
          row(T("Spektrum tepesi", "Spectral peak"), fmt(pk.f, 0) + " Hz") +
          row(T("Beklenen", "Expected"), fmt(P.fRef, 0) + " Hz" + (fSm ? " · %" + fmt(relErr(fSm, P.fRef), 1) : "")) +
          row(T("Periyot T = 1/f", "Period"), fSm ? fmt(1000 / fSm, 2) + " ms" : "—") +
          row(T("Dalga boyu λ = v/f", "Wavelength"), fSm ? fmt(C_SOUND / fSm, 3) + " m" : "—") +
          (f0 ? row("f₀", fmt(f0, 1) + " Hz") + row(T("Doppler hızı v = c(1 − f₀/f)", "Doppler speed"), v != null ? fmt(v, 2) + " m/s " + (v > 0.2 ? T("(yaklaşıyor)", "(approaching)") : v < -0.2 ? T("(uzaklaşıyor)", "(receding)") : T("(durgun)", "(still)")) : "—") : "");
        raf = requestAnimationFrame(loop);
      };
      status.textContent = T("Dinleniyor…", "Listening…");
      loop();
      stopFn = () => { cancelAnimationFrame(raf); stream.getTracks().forEach((t) => t.stop()); ac.close(); };
      $("#slGo").innerHTML = App.icon("stop") + esc(T("Durdur", "Stop")); App.hydrateIcons($("#slGo"));
      $("#slGo").onclick = () => { cleanup(); $("#slGo").innerHTML = App.icon("play") + esc(T("Mikrofonu aç", "Start microphone")); App.hydrateIcons($("#slGo")); $("#slGo").onclick = soundRun; status.textContent = ""; };
    }

    /* ---- Işık ---- */
    const pts = (App.prefs.get("sl:isik:pts", []) || []).slice();
    function paintLight(cur) {
      const fit = fitInverseSquare(pts);
      const dMax = Math.max(1, ...pts.map((p) => p.d)) * 1.1;
      chart(cv, [{ pts: pts.map((p) => [p.d, p.E]), dots: true, color: "accent" }].concat(fit ? [{ fn: (d) => fit.k / (d * d), color: "good", dash: [6, 4] }] : []),
        { xName: "d (m)", yName: "E", x0: 0.05, x1: dMax, y0: 0, y1: Math.max(10, ...pts.map((p) => p.E)) * 1.15 });
      read.innerHTML = row(T("Anlık parlaklık", "Current brightness"), cur != null ? fmt(cur, 1) : "—") + row(T("Ölçüm sayısı", "Readings"), String(pts.length)) +
        (fit ? row(T("Uydurulan E = k/d²", "Fitted k"), "k = " + fmt(fit.k, 2)) + row("R²", fmt(fit.r2, 3)) +
          '<div class="sl-tbl">' + fit.errors.map((e) => "<span>d = " + fmt(e.d, 2) + " m · E = " + fmt(e.E, 1) + " · " + T("kuram ", "theory ") + fmt(e.fit, 1) + " · %" + fmt(e.err, 0) + "</span>").join("") + "</div>" : "");
    }
    async function lightRun() {
      if (!validParams()) return;
      cleanup();
      const mine = epoch;
      let stream;
      try { stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: { ideal: "environment" }, width: { ideal: 320 } } }); }
      catch (e) { status.textContent = T("Kamera açılamadı.", "Camera unavailable."); return; }
      if (gone(mine)) { stopStream(stream); return; }
      // Mümkünse pozlamayı sabitle (desteklenmezse kamera otomatik pozlar; sonuç yaklaşık kalır)
      const track = stream.getVideoTracks()[0];
      try { const cap = track.getCapabilities ? track.getCapabilities() : {}; if (cap.exposureMode && cap.exposureMode.includes("manual")) await track.applyConstraints({ advanced: [{ exposureMode: "manual" }] }); } catch (e) { /* desteklenmiyor */ }
      if (gone(mine)) { stopStream(stream); return; }
      const video = document.createElement("video"); video.playsInline = true; video.muted = true; video.srcObject = stream; await video.play().catch(() => {});
      if (gone(mine)) { stopStream(stream); video.srcObject = null; return; }
      const c2 = document.createElement("canvas"), x2 = c2.getContext("2d", { willReadFrequently: true });
      c2.width = 64; c2.height = 48;
      let cur = null, timer = 0;
      const sample = () => {
        if (video.readyState >= 2) {
          x2.drawImage(video, 0, 0, 64, 48);
          const d = x2.getImageData(0, 0, 64, 48).data; let s = 0;
          for (let i = 0; i < d.length; i += 4) s += 0.2126 * d[i] + 0.7152 * d[i + 1] + 0.0722 * d[i + 2];     // göreli parlaklık
          const L = s / (d.length / 4);
          cur = cur == null ? L : cur + 0.3 * (L - cur);
          paintLight(cur);
        }
        timer = setTimeout(sample, 150);
      };
      sample();
      $("#slAdd").disabled = false;
      $("#slAdd").onclick = () => { if (cur == null) return; pts.push({ d: P.d, E: cur }); App.prefs.set("sl:isik:pts", pts); paintLight(cur); const fit = fitInverseSquare(pts); if (fit && pts.length >= 3) saveResult(id, { summary: pts.length + T(" ölçüm, R² = ", " readings, R² = ") + fmt(fit.r2, 3) }).then(paintHist); };
      status.textContent = T("Kamera açık — uzaklığı girip Ekle'ye bas.", "Camera on — enter d and Add.");
      stopFn = () => { clearTimeout(timer); stream.getTracks().forEach((t) => t.stop()); };
    }
    if (id === "isik") { $("#slClear").onclick = () => { pts.length = 0; App.prefs.set("sl:isik:pts", []); paintLight(null); }; paintLight(null); }

    $("#slGo").onclick = id === "ses" ? soundRun : id === "isik" ? lightRun : motionRun;
    return cleanup;
  }

  function render(view, p) { return p[0] === "olcum" ? App.sensorWorkbench.page(view) : p[0] ? renderExp(view, p[0]) : renderHome(view); }

  App.router.register("sensor", render);
  App.sensorLab = { chart, lowPass, periodByCrossings, autocorrPitch, spectrumPeak, dopplerSpeed, fitInverseSquare, relErr, pendulumT, freeFallTime, mean, variance, EXP };
})();
