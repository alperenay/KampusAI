/* =========================================================
   canli.js — Canlı AR Çözüm (Modül 1, v1.33)   (#/canli)

   Kamerayı kâğıttaki soruya tut: soru çerçeveye alınır, net ve sabit olunca kendiliğinden
   çekilir (ya da deklanşöre basılır), yapay zekâ çözer ve adımlar kâğıdın üstüne, sorunun
   hemen altına "basılmış gibi" yerleşir. Telefon oynasa da yazı kâğıtta kalır.

     1. Görü : kadraj bölgesi (ROI) tam çözünürlükte kırpılır, seviyeleri gerilir ve keskinleştirilir
               (ar-solve.js), JPEG olarak modele gider. Çekim öncesi ışık / netlik / sarsıntı ölçülür.
     2. Çözüm: seçili yapay zekâ motoru (engine.js: yerel ya da internet); görseli kendisi göremeyen
               modelde önce "göz" modeli yazıya döker (vision.js). Cevap satır satır akar; her adım
               bitince kâğıtta belirir. Sokratik: adımlar tek tek açılır, "Tümü" ile hepsi.
     3. AR   : çekilen kare görüntü hedefi olur (ar-core.js → createTargetTracker: FAST + ORB + KLT +
               RANSAC, Worker'da). Kâğıdın kenarları görünmese de çalışır. Panel, hedef → ekran
               homografisiyle CSS matrix3d olarak çizilir: perspektif bozulmadan kâğıt düzleminde durur.
               Renkleri kâğıdın ölçülen ışığına uyar. Kâğıt kaybolursa panel söner, görününce geri gelir.
   Hata durumları: kamera izni / kamera yok, karanlık (fener), bulanık, okunamayan soru, zaman aşımı,
   ağ ve kota hataları (Tekrar dene), izleme kurulamazsa ekranda (2B) gösterim.
   Gizlilik: yalnızca kırpılmış soru bölgesi seçili yapay zekâya gönderilir; kaydedilmez.
   ========================================================= */
(function () {
  const { esc } = App.utils;
  const T = (tr, en) => (App.i18n.lang === "en" ? en : tr);
  const SOLVE_MS = 90000, SHEET_W = 520, MARK = 100;

  let libP = null;
  function loadLibs() {
    if (App.arCore && window.ARSolve) return Promise.resolve();
    if (!libP) {
      const add = (src, ok) => (ok() ? Promise.resolve() : new Promise((res, rej) => {
        const sc = document.createElement("script"); sc.src = src; sc.async = true;
        sc.onload = () => (ok() ? res() : rej(new Error(src))); sc.onerror = () => rej(new Error(src));
        document.head.appendChild(sc);
      }));
      libP = Promise.all([add("js/ar/ar-core.js", () => !!App.arCore), add("js/ar/ar-solve.js", () => !!window.ARSolve)])
        .then(() => App.arCore.loadVision()).catch((e) => { libP = null; throw e; });
    }
    return libP;
  }
  const canCamera = () => !!(navigator.mediaDevices && navigator.mediaDevices.getUserMedia) && window.isSecureContext !== false;

  /* ---------------- Yapay zekâ: akışlı çözüm ---------------- */
  async function solve(image, signal, onText, onStage) {
    const sys = window.ARSolve.system(App.i18n.lang);
    const once = async (eng) => {
      await eng.prepare(signal);
      const cfg = eng.config(), user = { role: "user", content: T("Fotoğraftaki soruyu çöz.", "Solve the question in the photo.") };
      if (cfg.direct) user.images = [image.base64];
      else {
        onStage("read", cfg.visionModel);
        const tx = await App.vision.read(image, "", signal, null, eng);
        user.content += "\n\n" + T("FOTOĞRAFTAN OKUNAN (görme modeli yazıya döktü; bozuk görünen yer varsa belirt):\n", "READ FROM PHOTO (transcribed by a vision model):\n") + tx;
      }
      onStage("solve", cfg.chatModel);
      const res = await eng.chat({ model: cfg.chatModel, messages: [{ role: "system", content: sys }, user], options: { temperature: 0.2, num_ctx: 8192 }, signal, onDelta: (piece, full) => onText(full) });
      return res.text;
    };
    const eng = await App.engine.resolve(signal);
    try { return await once(eng); }
    catch (e) {
      const alt = !(signal && signal.aborted) ? await App.engine.fallbackFor(eng, e, signal) : null;
      if (!alt) throw e;
      if (eng.kind === "local") App.engine.markLocalDown();
      onText("");
      return once(alt);
    }
  }
  function errText(e) {
    const code = e && e.code;
    if (code === "timeout") return T("Yapay zekâ zamanında cevap vermedi. Bağlantını kontrol edip tekrar dene.", "The AI did not answer in time. Check your connection and try again.");
    if (code === "net" || code === "offline") return App.t("ai.err.netTitle") + " " + T("İnternet ya da yapay zekâ bağlantısını kontrol et.", "Check your internet or AI connection.");
    if (code === "quota") return T("Yapay zekâ kotası doldu. Biraz sonra tekrar dene ya da Ayarlar'dan başka bir motor seç.", "The AI quota is used up. Try again later or pick another engine in Settings.");
    if (code === "busy") return T("Yapay zekâ şu an yoğun. Birkaç saniye sonra tekrar dene.", "The AI is busy. Try again in a few seconds.");
    if (code === "no-key" || code === "auth") return App.t("ai.err.nokeyBody");
    if (code === "device") return App.t("ai.err.deviceTitle");
    return T("Çözüm alınamadı.", "Could not get a solution.") + (e && e.message && e.message.length < 120 ? " (" + e.message + ")" : "");
  }

  /* ---------------- Tam ekran kamera katmanı ---------------- */
  function open() {
    const S = { on: true, stream: null, video: null, trk: null, raf: 0, phase: "aim", auto: App.prefs.get("lcAuto", true) !== false,
      stepAll: App.prefs.get("lcAll", false) === true, shown: 1, sol: null, text: "", err: null, image: null, ctrl: null, timer: 0,
      okSince: 0, view: null, W: 0, H: 0, place: null, flat: false, stage: "", sheetH: 0, lastTrack: "idle" };
    const el = document.createElement("div");
    el.className = "lc"; el.setAttribute("role", "dialog"); el.setAttribute("aria-modal", "true"); el.setAttribute("aria-label", T("Canlı AR Çözüm", "Live AR Solver"));
    el.innerHTML =
      '<video class="lc__video" playsinline muted autoplay></video>' +
      '<div class="lc__layer" aria-hidden="true"><div class="lc__mark"></div><div class="lc__sheet lc-ink"></div></div>' +
      '<div class="lc__aim"><i></i><i></i><i></i><i></i></div>' +
      '<div class="lc__top"><span class="lc__badge">' + esc(T("Canlı Çözüm", "Live Solve")) + '</span><span class="lc__hint" aria-live="polite"></span>' +
        '<button type="button" class="lc__btn" data-lc="close" aria-label="' + esc(T("Kapat", "Close")) + '">✕</button></div>' +
      '<div class="lc__meter" aria-hidden="true"><span data-m="lum">' + esc(T("Işık", "Light")) + '</span><span data-m="sharp">' + esc(T("Netlik", "Focus")) + '</span><span data-m="still">' + esc(T("Sabit", "Steady")) + "</span></div>" +
      '<div class="lc__bot"></div>' +
      '<div class="lc__flat lc-ink" hidden></div>';
    document.body.appendChild(el);
    document.documentElement.classList.add("ar-open");
    const $ = (s) => el.querySelector(s), video = $(".lc__video"), layer = $(".lc__layer"), sheet = $(".lc__sheet"), mark = $(".lc__mark"), flat = $(".lc__flat"), hint = $(".lc__hint"), bot = $(".lc__bot");
    S.video = video;
    const say = (tx) => { if (hint.textContent !== tx) hint.textContent = tx; };

    /* ---- düğmeler ---- */
    function buttons() {
      const torch = S.trk && S.trk.torch() ? '<button type="button" class="lc__btn lc__wide" data-lc="torch" aria-pressed="' + (S.torch ? "true" : "false") + '">' + esc(T("Fener", "Torch")) + "</button>" : "";
      let h = "";
      if (S.phase === "aim") h = torch + '<button type="button" class="lc__shutter" data-lc="shoot" aria-label="' + esc(T("Soruyu çek", "Capture the question")) + '"></button>' +
        '<button type="button" class="lc__btn lc__wide" data-lc="auto" aria-pressed="' + (S.auto ? "true" : "false") + '">' + esc(T("Otomatik", "Auto")) + "</button>";
      else {
        const more = S.sol && !S.stepAll && S.shown < stepCount();
        h = (more ? '<button type="button" class="lc__btn lc__wide lc__primary" data-lc="next">' + esc(T("Sonraki adım", "Next step")) + "</button>" +
            '<button type="button" class="lc__btn lc__wide" data-lc="all">' + esc(T("Tümü", "All")) + "</button>" : "") +
          (S.err ? '<button type="button" class="lc__btn lc__wide lc__primary" data-lc="retry">' + esc(T("Tekrar dene", "Retry")) + "</button>" : "") +
          '<button type="button" class="lc__btn lc__wide" data-lc="new">' + esc(T("Yeni soru", "New question")) + "</button>" +
          '<button type="button" class="lc__btn lc__wide" data-lc="flat" aria-pressed="' + (S.flat ? "true" : "false") + '">' + esc(T("Ekranda", "On screen")) + "</button>" +
          (S.sol && S.sol.question ? '<button type="button" class="lc__btn lc__wide" data-lc="ask">' + esc(T("Asistana sor", "Ask assistant")) + "</button>" : "");
      }
      if (bot.innerHTML !== h) bot.innerHTML = h;
      el.classList.toggle("is-aim", S.phase === "aim");
    }
    el.addEventListener("click", (e) => {
      const b = e.target.closest("[data-lc]"); if (!b) return;
      const k = b.dataset.lc;
      if (k === "close") close();
      else if (k === "shoot") shoot();
      else if (k === "auto") { S.auto = !S.auto; App.prefs.set("lcAuto", S.auto); buttons(); }
      else if (k === "torch" && S.trk) { S.torch = !S.torch; S.trk.setTorch(S.torch); buttons(); }
      else if (k === "next") { S.shown++; draw(); buttons(); }
      else if (k === "all") { S.stepAll = true; App.prefs.set("lcAll", true); draw(); buttons(); }
      else if (k === "retry") runSolve();
      else if (k === "new") restart();
      else if (k === "flat") { S.flat = !S.flat; flat.hidden = !S.flat; buttons(); }
      else if (k === "ask") ask();
    });
    const onKey = (e) => { if (e.key === "Escape") close(); };
    document.addEventListener("keydown", onKey);

    /* ---- kamera ---- */
    async function start() {
      buttons(); say(T("Kamera açılıyor…", "Opening the camera…"));
      try {
        await loadLibs();
        S.stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: { ideal: "environment" }, width: { ideal: 1920 }, height: { ideal: 1080 } }, audio: false });
      } catch (e) {
        say(e && e.name === "NotAllowedError" ? T("Kamera izni verilmedi. Ayarlardan KampüsAI'ye kamera izni verip tekrar dene.", "Camera permission was denied.") : T("Kamera açılamadı.", "Could not open the camera."));
        S.phase = "error"; bot.innerHTML = '<button type="button" class="lc__btn lc__wide" data-lc="close">' + esc(T("Kapat", "Close")) + "</button>"; return;
      }
      if (!S.on) { S.stream.getTracks().forEach((t) => t.stop()); return; }
      const cb = $('[data-lc="close"]'); if (cb) cb.focus();               // klavye ve ekran okuyucu için odak katmana
      const tr = S.stream.getVideoTracks()[0];
      try { await tr.applyConstraints({ advanced: [{ focusMode: "continuous" }] }); } catch (e) { /* desteklenmiyor */ }
      video.srcObject = S.stream;
      try { await video.play(); } catch (e) { /* kendisi oynatır */ }
      S.trk = App.arCore.createTargetTracker({ video, stream: S.stream, onState: onTrack });
      buttons(); loop();
    }
    function onTrack(st) {
      if (!S.on) return;
      if (st !== S.lastTrack) {
        S.lastTrack = st;
        if (st === "lost" && S.phase !== "aim") say(T("Soru görünmüyor: kamerayı yeniden soruya tut.", "Question out of view: point the camera at it again."));
        if (st === "track" && S.phase !== "aim") stageHint();
        if (st === "off") { S.flat = true; flat.hidden = false; }
      }
      buttons();
    }

    /* ---- görünüm: video kapla (cover) kırpması ve kadraj ---- */
    function fit() {
      const W = window.innerWidth, H = window.innerHeight, vw = video.videoWidth, vh = video.videoHeight;
      if (!vw) return false;
      const va = vw / vh, ca = W / H;
      S.view = va > ca ? { rx: ca / va, ry: 1, ox: (1 - ca / va) / 2, oy: 0 } : { rx: 1, ry: va / ca, ox: 0, oy: (1 - va / ca) / 2 };
      S.W = W; S.H = H;
      return true;
    }
    // ekran (CSS px) → video pikseli
    const toVideo = (x, y) => [(x / S.W * S.view.rx + S.view.ox) * video.videoWidth, (y / S.H * S.view.ry + S.view.oy) * video.videoHeight];
    function aimRect() {
      const w = Math.min(S.W * 0.88, 620), h = Math.min(w * 0.58, S.H * 0.42), x = (S.W - w) / 2, y = Math.max(70, S.H * 0.42 - h / 2);
      return [x, y, x + w, y + h];
    }
    function aimVideo() { const r = aimRect(), a = toVideo(r[0], r[1]), b = toVideo(r[2], r[3]); return [a[0], a[1], b[0], b[1]]; }

    /* ---- döngü ---- */
    function loop() {
      if (!S.on) return;
      S.raf = requestAnimationFrame(loop);
      if (!fit()) return;
      const now = performance.now();
      if (S.phase === "aim") {
        const r = aimRect(), ai = $(".lc__aim");
        ai.style.cssText = "left:" + r[0] + "px;top:" + r[1] + "px;width:" + (r[2] - r[0]) + "px;height:" + (r[3] - r[1]) + "px";
        S.trk.aim(aimVideo()); S.trk.update(now); meter(now);
      } else { S.trk.update(now); place(now); }
    }
    /* Çekim öncesi kalite: ışık, netlik (Laplace sapması), sarsıntı (kare farkı) */
    function meter(now) {
      const q = S.trk.quality(), m = $(".lc__meter");
      if (!q) { say(T("Soruyu çerçeveye al", "Fit the question in the frame")); return; }
      const ok = { lum: q.lum > 0.22 && q.contrast > 0.06, sharp: q.sharp > 14, still: q.motion < 5 };
      Object.keys(ok).forEach((k) => m.querySelector('[data-m="' + k + '"]').classList.toggle("is-ok", ok[k]));
      const all = ok.lum && ok.sharp && ok.still;
      if (!ok.lum) say(T("Ortam karanlık: ışığı aç" + (S.trk.torch() ? " ya da Fener'e dokun" : ""), "Too dark: turn on a light" + (S.trk.torch() ? " or tap Torch" : "")));
      else if (!ok.still) say(T("Telefonu sabit tut", "Hold the phone steady"));
      else if (!ok.sharp) say(T("Biraz uzaklaş ya da yaklaş: yazı net değil", "Move a little: the text is not sharp"));
      else say(S.auto ? T("Harika, çekiliyor…", "Great, capturing…") : T("Hazır: deklanşöre bas", "Ready: tap the shutter"));
      if (all) { if (!S.okSince) S.okSince = now; if (S.auto && now - S.okSince > 700) shoot(); } else S.okSince = 0;
    }

    /* ---- çekim ---- */
    async function shoot() {
      if (S.phase !== "aim" || !S.trk || !video.videoWidth) return;
      const roi = aimVideo(), vw = video.videoWidth, vh = video.videoHeight;
      // tam çözünürlükte kırp (kenarda biraz pay), iyileştir, JPEG
      const pad = 0.04 * (roi[2] - roi[0]), x0 = Math.max(0, roi[0] - pad), y0 = Math.max(0, roi[1] - pad), x1 = Math.min(vw, roi[2] + pad), y1 = Math.min(vh, roi[3] + pad);
      const k = Math.min(1.6, 1280 / Math.max(x1 - x0, y1 - y0)), cw = Math.round((x1 - x0) * k), ch = Math.round((y1 - y0) * k);
      const cv = document.createElement("canvas"); cv.width = cw; cv.height = ch;
      const cx = cv.getContext("2d", { willReadFrequently: true });
      cx.imageSmoothingQuality = "high"; cx.drawImage(video, x0, y0, x1 - x0, y1 - y0, 0, 0, cw, ch);
      try { const im = cx.getImageData(0, 0, cw, ch); if (window.ARSolve.enhance(im.data, cw, ch)) cx.putImageData(im, 0, 0); } catch (e) { /* iyileştirmesiz */ }
      const dataUrl = cv.toDataURL("image/jpeg", 0.9);
      cv.width = cv.height = 0;
      S.image = { dataUrl, base64: dataUrl.split(",")[1], width: cw, height: ch };
      el.classList.add("is-flash"); setTimeout(() => el.classList.remove("is-flash"), 250);
      S.phase = "solve"; S.place = null; S.sol = null; S.shown = 1; S.err = null; S.okSince = 0;
      const tr = S.trk.capture(roi);
      buttons(); draw(); runSolve();
      const r = await tr;
      if (!S.on || S.image === null) return;
      if (!r.ok && r.reason !== "replaced") { S.flat = true; flat.hidden = false; buttons(); }   // doku yok: ekranda göster
    }
    function restart() {
      abort(); S.phase = "aim"; S.sol = null; S.err = null; S.image = null; S.place = null; S.text = "";
      if (S.trk) S.trk.reset();
      layer.classList.remove("is-on"); S.flat = false; flat.hidden = true; buttons();
    }
    function abort() { if (S.ctrl) S.ctrl.abort(); S.ctrl = null; clearTimeout(S.timer); }
    function stageHint() {
      say(S.err ? T("Çözüm alınamadı", "No solution") : S.stage === "read" ? T("Soru okunuyor…", "Reading the question…") : S.stage === "solve" ? T("Çözülüyor…", "Solving…") : S.sol && S.sol.answer ? T("Çözüldü · telefonu oynatabilirsin, adımlar kâğıtta kalır", "Solved · move the phone, the steps stay on the paper") : T("Çözülüyor…", "Solving…"));
    }
    async function runSolve() {
      abort(); S.err = null; S.text = ""; S.sol = null; S.stage = "read";
      const ctrl = new AbortController(); S.ctrl = ctrl;
      let timedOut = false;
      S.timer = setTimeout(() => { timedOut = true; ctrl.abort(); }, SOLVE_MS);
      stageHint(); buttons(); draw();
      try {
        const text = await solve(S.image, ctrl.signal, (full) => { S.text = full; S.sol = window.ARSolve.parse(full, false); draw(); buttons(); }, (st) => { S.stage = st; stageHint(); });
        if (S.ctrl !== ctrl) return;
        S.sol = window.ARSolve.parse(text, true); S.stage = "";
        if (!S.sol.known && !S.sol.steps.length) S.sol = { question: "", topic: "", steps: [String(text || "").trim()], answer: "", unreadable: "", known: false };
      } catch (e) {
        if (S.ctrl !== ctrl) return;
        S.stage = ""; S.err = timedOut ? { code: "timeout" } : e;
        if (e && e.name === "AbortError" && !timedOut) return;
      } finally { if (S.ctrl === ctrl) { clearTimeout(S.timer); S.ctrl = null; } }
      stageHint(); draw(); buttons();
    }
    function ask() {
      const s = S.sol; if (!s) return;
      const lines = [T("Bu soruyu adım adım anlatır mısın?", "Can you explain this question step by step?"), s.question];
      const url = S.image && S.image.dataUrl;
      close();
      location.hash = "#/";
      setTimeout(() => App.modules.assistant.startWith(lines.join("\n"), url), 60);
    }

    /* ---- çözüm paneli ---- */
    const md = (s) => App.markdown.render(s || "").replace(/^<p>([\s\S]*)<\/p>$/, "$1");
    const stepCount = () => (S.sol ? S.sol.steps.length + (S.sol.answer ? 1 : 0) : 0);
    function html() {
      if (S.err) return '<div class="lc-ink__err"><b>' + esc(T("Çözüm alınamadı", "No solution")) + "</b><p>" + esc(errText(S.err)) + "</p></div>";
      const s = S.sol;
      if (s && s.unreadable) return '<div class="lc-ink__err"><b>' + esc(T("Soru okunamadı", "Could not read the question")) + "</b><p>" + esc(s.unreadable) + "</p><p>" + esc(T("Daha yakından, ışıklı ve sabit çek.", "Capture closer, with light, and hold steady.")) + "</p></div>";
      if (!s || (!s.steps.length && !s.answer)) return '<div class="lc-ink__wait"><span class="lc-ink__dot"></span>' + esc(S.stage === "read" ? T("Soru okunuyor…", "Reading…") : T("Çözülüyor…", "Solving…")) + "</div>";
      const n = S.stepAll ? Infinity : S.shown, items = s.steps.map((x, i) => ({ k: "step", x, i })), out = [];
      if (s.answer) items.push({ k: "ans", x: s.answer });
      items.slice(0, n).forEach((it) => out.push(it.k === "ans"
        ? '<li class="lc-ink__ans"><b>' + esc(T("Cevap", "Answer")) + ":</b> " + md(it.x) + "</li>"
        : '<li><span class="lc-ink__n">' + (it.i + 1) + "</span>" + md(it.x) + "</li>"));
      const head = (s.topic ? '<div class="lc-ink__topic">' + esc(s.topic) + "</div>" : "");
      const waiting = S.ctrl && items.length <= n ? '<li class="lc-ink__wait"><span class="lc-ink__dot"></span></li>' : "";
      const rest = items.length > n ? '<div class="lc-ink__more">' + esc(T((items.length - n) + " adım daha", (items.length - n) + " more")) + "</div>" : "";
      return head + "<ol>" + out.join("") + waiting + "</ol>" + rest;
    }
    function draw() {
      const h = html();
      if (sheet.__h !== h) { sheet.__h = h; sheet.innerHTML = h; S.sheetH = 0; }
      if (flat.__h !== h) { flat.__h = h; flat.innerHTML = '<button type="button" class="lc__btn lc__flatx" data-lc="flat" aria-label="' + esc(T("Ekrandaki görünümü kapat", "Close on-screen view")) + '">✕</button>' + h; }
    }
    /* Paneli kâğıda çivile: hedef karesindeki (video px) yerleşim → ekran homografisi → CSS matrix3d */
    function place(now) {
      const st = S.trk.state(), Hs = S.trk.screenH(S.view, S.W, S.H, now), roi = S.trk.roi();
      const vis = !!Hs && (st === "track" || st === "coast");
      layer.classList.toggle("is-on", vis);
      if (!vis || !roi) return;
      const rw = roi[2] - roi[0], rh = roi[3] - roi[1];
      const sw = S.W < 500 ? SHEET_W * 0.75 : SHEET_W;              // dar telefonda yazı küçülmesin: panel daha dar düzenlenir
      if (sheet.style.width !== sw + "px") { sheet.style.width = sw + "px"; S.sheetH = 0; }
      if (!S.sheetH) S.sheetH = sheet.offsetHeight || 200;
      const s = rw / sw, gap = rh * 0.06;
      if (!S.place) {                                               // altına mı üstüne mi: çekim anında ekranda nerede yer var
        const sp = window.ARVision.applyH(Hs, roi[0], roi[3]), below = S.H - sp[1], above = window.ARVision.applyH(Hs, roi[0], roi[1])[1];
        S.place = below >= above * 0.8 || below > S.H * 0.3 ? "below" : "above";
      }
      const y0 = S.place === "below" ? roi[3] + gap : roi[1] - gap - S.sheetH * s;
      const V = window.ARVision;
      sheet.style.transform = App.arCore.matrix3d(V.mul3(Hs, [s, 0, roi[0], 0, s, y0, 0, 0, 1]));
      mark.style.transform = App.arCore.matrix3d(V.mul3(Hs, [rw / MARK, 0, roi[0], 0, rh / MARK, roi[1], 0, 0, 1]));
      // ışık uyumu: panel kâğıdın ölçülen rengini ve parlaklığını alır, mürekkep ona göre koyulaşır
      const L = S.trk.light();
      if (L) {
        const b = Math.max(0.35, Math.min(1, L.lum * 1.08)), c = (v) => Math.round(255 * Math.min(1, v * b));
        layer.style.setProperty("--lc-paper", "rgb(" + c(L.r) + "," + c(L.g) + "," + c(L.b) + ")");
        layer.style.setProperty("--lc-ink-a", String(Math.max(0.78, Math.min(1, 1.15 - L.lum * 0.3))));
      }
    }

    function close() {
      if (!S.on) return;
      S.on = false; abort(); cancelAnimationFrame(S.raf);
      if (S.trk) S.trk.dispose();
      if (S.stream) S.stream.getTracks().forEach((t) => t.stop());
      video.srcObject = null;
      document.removeEventListener("keydown", onKey);
      window.removeEventListener("hashchange", close);
      el.remove(); document.documentElement.classList.remove("ar-open");
    }
    window.addEventListener("hashchange", close);                  // başka sayfaya geçilince kamera kapansın
    el.__lcState = () => ({ phase: S.phase, aim: S.view && aimVideo(), roi: S.trk && S.trk.roi(), H: S.trk && S.trk.homography(performance.now()), info: S.trk && S.trk.info(), sol: S.sol });   // sınama ve tanı için
    start();
    return close;
  }

  /* ---------------- Sayfa ---------------- */
  function render(view) {
    App.setTitle(T("Canlı AR Çözüm", "Live AR Solver"));
    const cam = canCamera();
    view.innerHTML = '<div class="page lc-page"><div class="page-head"><div><h1>' + esc(T("Canlı AR Çözüm", "Live AR Solver")) + "</h1><p>" +
      esc(T("Kamerayı kâğıttaki soruya tut: yapay zekâ çözer, adımlar kâğıdın üstüne yerleşir.", "Point the camera at a question on paper: the AI solves it and the steps appear on the paper.")) + "</p></div></div>" +
      '<section class="card lc-how"><ol>' +
        "<li><b>" + esc(T("Çerçevele", "Frame")) + "</b> " + esc(T("Soruyu kadraja al. Işık, netlik ve sabitlik yeşile dönünce kendiliğinden çekilir.", "Fit the question in the frame. It captures by itself when light, focus and steadiness turn green.")) + "</li>" +
        "<li><b>" + esc(T("Çöz", "Solve")) + "</b> " + esc(T("Adımlar geldikçe sorunun altında belirir. Önce kendin dene: adımları tek tek aç.", "Steps appear under the question as they arrive. Try first: reveal them one by one.")) + "</li>" +
        "<li><b>" + esc(T("Oynat", "Move")) + "</b> " + esc(T("Telefonu oynatsan da yazı kâğıtta kalır. Kâğıdın kenarlarının görünmesi gerekmez.", "Move the phone: the text stays on the paper. The paper edges do not need to be visible.")) + "</li>" +
      "</ol>" +
      (cam ? '<button type="button" class="btn btn--primary" id="lcOpen">' + App.icon("camera") + esc(T("Kamerayı aç", "Open camera")) + "</button>"
        : '<p class="hint">' + esc(T("Bu cihazda kamera kullanılamıyor. Sorunun fotoğrafını asistana yükleyerek çözdürebilirsin.", "No camera on this device. You can upload a photo of the question to the assistant.")) + ' <a href="#/">' + esc(T("Asistana git", "Go to assistant")) + "</a></p>") +
      '<p class="hint lc-privacy">' + esc(T("Gizlilik: yalnızca çerçevedeki soru bölgesi seçili yapay zekâya gönderilir ve kaydedilmez. Bilgisayardaki yapay zekâ kullanılıyorsa görüntü cihazdan çıkmaz.", "Privacy: only the framed question area is sent to the selected AI and is not stored. With the on-device AI it never leaves the device.")) + "</p>" +
      "</section></div>";
    let closeFn = null;
    const btn = view.querySelector("#lcOpen");
    if (btn) btn.addEventListener("click", () => { closeFn = open(); });
    return () => { if (closeFn) closeFn(); };
  }

  App.router.register("canli", render);
  App.canli = { open };
})();
