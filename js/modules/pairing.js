/* =========================================================
   pairing.js — telefonu bilgisayardaki yapay zekaya QR kodla bağlama

   Bilgisayar (Windows uygulaması → Ayarlar → Yapay zeka → Telefon bağlantısı)
   bir QR kod gösterir. İçinde bağlantı kodu ve bilgisayarın ağ adresleri vardır:
       DA1;t=K7M2QX;u=http://192.168.1.20:8770/ollama;u=http://10.0.0.5:8770/ollama
   Telefondaki uygulama kamerayla bu kodu okur, adreslerden ulaşılabilen ilkini
   seçer ve ayarları kendisi yapar. Hiçbir şey yazmak gerekmez.

   QR üretimi: qrcode-generator (MIT), okuma: jsQR (Apache-2.0) —
   assets/vendor/qr/ altında, yalnızca gerektiğinde yüklenir.
   ========================================================= */
(function () {
  const { esc } = App.utils;
  const t = App.t;
  const PREFIX = "DA1;";

  const loaded = {};
  function loadScript(src) {
    if (!loaded[src]) loaded[src] = new Promise((resolve, reject) => {
      const s = document.createElement("script");
      s.src = src;
      s.onload = resolve;
      s.onerror = () => { delete loaded[src]; reject(new Error("load " + src)); };
      document.head.appendChild(s);
    });
    return loaded[src];
  }

  /* ---------------- Kod içeriği ---------------- */
  function payload(info) {
    const urls = (info.addresses || []).map((ip) => "http://" + ip + ":" + info.port + "/ollama");
    return PREFIX + "t=" + info.token + urls.map((u) => ";u=" + u).join("");
  }

  function parse(text) {
    text = String(text || "").trim();
    if (!text.startsWith(PREFIX)) return null;
    const out = { token: "", urls: [] };
    text.slice(PREFIX.length).split(";").forEach((part) => {
      const i = part.indexOf("=");
      if (i < 0) return;
      const k = part.slice(0, i), val = part.slice(i + 1);
      if (k === "t") out.token = val.toUpperCase();
      if (k === "u" && /^https?:\/\/[\w.:[\]-]+\/ollama$/.test(val)) out.urls.push(val);
    });
    return out.token && out.urls.length ? out : null;
  }

  /* ---------------- QR çizimi (bilgisayar) ---------------- */
  async function renderQR(el, text) {
    await loadScript("assets/vendor/qr/qrcode.js");
    const qr = window.qrcode(0, "M");
    qr.addData(text);
    qr.make();
    el.innerHTML = qr.createSvgTag({ cellSize: 5, margin: 3, scalable: true });
    const svg = el.querySelector("svg");
    if (svg) { svg.setAttribute("role", "img"); svg.setAttribute("aria-label", t("pair.qrLabel")); }
  }

  /* ---------------- Bağlan: adreslerden ulaşılabilen ilkini seç ---------------- */
  async function reachable(url, ms) {
    const ctrl = new AbortController();
    const timer = setTimeout(() => ctrl.abort(), ms || 2500);
    try {
      const r = await fetch(url.replace(/\/ollama$/, "/ping"), { signal: ctrl.signal, cache: "no-store" });
      return r.ok && (await r.json()).app === "ders-asistani";
    } catch (e) { return false; }
    finally { clearTimeout(timer); }
  }

  /** Okunan kodu uygular; başarılıysa seçilen adresi döndürür */
  async function apply(data) {
    const results = await Promise.all(data.urls.map((u) => reachable(u)));
    const url = data.urls[results.indexOf(true)];
    if (!url) return null;
    App.prefs.set("aiUrl", url);
    App.prefs.set("aiToken", data.token);
    App.engine.invalidate();
    return url;
  }

  /* ---------------- Kamerayla okuma (telefon) ---------------- */
  /** Kamerayla QR okur. parser: metni çözen fonksiyon (varsayılan: bilgisayar bağlantı kodu) */
  function scan(parser, texts) {
    parser = parser || parse;
    texts = texts || {};
    return new Promise((resolve) => {
      let stream = null, stopped = false, detector = null, timer = null;
      const m = App.ui.modal({
        title: texts.title || t("pair.scanTitle"),
        body:
          '<p class="hint">' + esc(texts.hint || t("pair.scanHint")) + "</p>" +
          '<div class="qr-cam"><video playsinline muted autoplay></video><span class="qr-cam__frame"></span></div>' +
          '<p class="hint" id="qrStatus">' + esc(t("pair.starting")) + "</p>",
        onClose: () => finish(null)
      });
      const video = m.el.querySelector("video");
      const status = m.el.querySelector("#qrStatus");
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d", { willReadFrequently: true });

      function finish(result) {
        if (stopped) return;
        stopped = true;
        clearTimeout(timer);
        if (stream) stream.getTracks().forEach((tr) => tr.stop());
        resolve(result);
      }

      async function tick() {
        if (stopped) return;
        if (video.readyState >= 2 && video.videoWidth) {
          let text = null;
          try {
            if (detector) {
              const codes = await detector.detect(video);
              if (codes.length) text = codes[0].rawValue;
            } else if (window.jsQR) {
              const scale = Math.min(1, 720 / Math.max(video.videoWidth, video.videoHeight));
              canvas.width = Math.round(video.videoWidth * scale);
              canvas.height = Math.round(video.videoHeight * scale);
              ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
              const img = ctx.getImageData(0, 0, canvas.width, canvas.height);
              const code = window.jsQR(img.data, img.width, img.height, { inversionAttempts: "dontInvert" });
              if (code) text = code.data;
            }
          } catch (e) { /* bir sonraki karede tekrar dene */ }
          if (text) {
            const data = parser(text);
            if (data) { finish(data); m.close(); return; }
            status.textContent = t("pair.notOurs");
          }
        }
        timer = setTimeout(tick, 200);
      }

      (async () => {
        try {
          if ("BarcodeDetector" in window) {
            try {
              const formats = await window.BarcodeDetector.getSupportedFormats();
              if (formats.includes("qr_code")) detector = new window.BarcodeDetector({ formats: ["qr_code"] });
            } catch (e) { detector = null; }
          }
          if (!detector) await loadScript("assets/vendor/qr/jsQR.js");
          stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: { ideal: "environment" }, width: { ideal: 1280 } }, audio: false });
          if (stopped) { stream.getTracks().forEach((tr) => tr.stop()); return; }
          video.srcObject = stream;
          await video.play().catch(() => {});
          status.textContent = t("pair.looking");
          tick();
        } catch (e) {
          status.textContent = t("pair.noCamera");
        }
      })();
    });
  }

  /** Telefonda: QR oku → bağlan → sonucu bildir. Başarılıysa true. */
  async function scanAndConnect() {
    const data = await scan();
    if (!data) return false;
    App.ui.toast(t("pair.connecting"));
    const url = await apply(data);
    if (!url) { App.ui.toast(t("pair.unreachable"), "error"); return false; }
    App.ui.toast(t("pair.connected"));
    if (App.modules.assistant) App.modules.assistant.refreshStatus();
    return true;
  }

  /** Bu cihaz bilgisayara QR ile bağlanabilir mi? (Android uygulaması; iPhone'daki web uygulaması yerel ağa erişemez) */
  const canScan = () => !!(App.platform && App.platform.native && navigator.mediaDevices && navigator.mediaDevices.getUserMedia);
  /** Kamera var mı (eşitleme kodu okutmak için; telefon tarayıcısında da olur) */
  const hasCamera = () => !!(navigator.mediaDevices && navigator.mediaDevices.getUserMedia && (App.platform.native || App.platform.mobile) && window.isSecureContext);

  App.pairing = { payload, parse, renderQR, apply, scan, scanAndConnect, canScan, hasCamera, loadScript };
})();
