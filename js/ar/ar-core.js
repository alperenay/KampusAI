/* ar-core.js — KampüsAI AR çekirdeği (v1.33): kâğıda sabitlenmiş, 6 serbestlik dereceli AR
   Önceki AR (v1.24) yalnızca jiroskopla dönüyordu (3 serbestlik): telefon kayınca deney de kayardı.
   Bu çekirdek masadaki beyaz kâğıdı (A serisi, en-boy √2) bulur ve sahneyi ona çiviler:
     • Görü: ar-vision.js kâğıdın 4 köşesini alt piksel hassasiyetle bulur. Web Worker'da çalışır;
       kare ImageBitmap olarak aktarılır (kopyasız), işlenen kare beklerken yenisi gönderilmez
       (tek kare yolda), işlem süresine göre çözünürlük ve hız kendini ayarlar.
     • Süzme: köşeler uyarlanır Kalman süzgecinden geçer; çizim anında ölçüm zamanından şimdiye
       öngörülür (gecikme telafisi). Tek karelik sıçramalar (yanlış bulma) elenir.
     • Düzlem kilidi: köşelerden homografi → kamera pozu (R, t). Odak uzaklığı kullanılırken
       eğik bakışlardan kendiliğinden ölçülür (öz-kalibrasyon); izdüşüm matrisi kameranın
       gerçek iç parametrelerinden ve ekrandaki video kırpmasından kurulur.
     • Kayıp: kâğıt görünmezse sahne son yerinde kalır ve jiroskopla döner; kâğıt yeniden
       görülünce yumuşak geçişle (lerp/slerp) yerine oturur.
     • Işık: kâğıdın rengi ve parlaklığı ortam ışığını verir (sahne ışıklarına uygulanır).
     • Yedekler: Worker yoksa ana iş parçacığında daha düşük hızda; o da olmazsa jiroskop.
   createTargetTracker (Modül 1, Canlı AR Çözüm): kâğıdın kenarları görünmese de çalışır; çekilen
   soru karesinin kendisi hedef olur (ar-feature.js: FAST + ORB + KLT + RANSAC, bükülmüş hedefle hizalama). */
(function () {
  "use strict";
  const me = document.currentScript && document.currentScript.src;
  const BASE = me ? me.replace(/[^/]*$/, "") : "js/ar/";
  const SQ2 = Math.SQRT2, COAST = 280, LOST = 1200;
  let visionP = null;
  const addScript = (src, ok) => new Promise((res, rej) => {
    const sc = document.createElement("script"); sc.src = BASE + src; sc.async = true;
    sc.onload = () => (ok() ? res() : rej(new Error(src))); sc.onerror = () => rej(new Error(src + " yüklenemedi"));
    document.head.appendChild(sc);
  });
  /** Görü kitaplıkları ana iş parçacığında: süzgeç ve poz hesabı burada, Worker yoksa görü işleri de */
  function loadVision() {
    if (window.ARVision && window.ARFeature) return Promise.resolve(window.ARVision);
    if (!visionP) visionP = (window.ARVision ? Promise.resolve() : addScript("ar-vision.js", () => !!window.ARVision))
      .then(() => (window.ARFeature ? null : addScript("ar-feature.js", () => !!window.ARFeature)))
      .then(() => window.ARVision, (e) => { visionP = null; throw e; });
    return visionP;
  }
  const lowEnd = () => (navigator.hardwareConcurrency || 4) <= 4 && (navigator.deviceMemory || 4) <= 3;
  const median = (a) => { const s = a.slice().sort((x, y) => x - y), m = s.length >> 1; return s.length % 2 ? s[m] : (s[m - 1] + s[m]) / 2; };
  const clamp = (v, a, b) => Math.max(a, Math.min(b, v));
  function capabilities() {
    return {
      camera: !!(navigator.mediaDevices && navigator.mediaDevices.getUserMedia) && window.isSecureContext !== false,
      worker: typeof Worker !== "undefined", bitmap: typeof createImageBitmap === "function",
      gyro: "DeviceOrientationEvent" in window, webxr: !!navigator.xr
    };
  }
  /** 3×3 homografiyi (öğe pikseli → ekran pikseli) CSS matrix3d'ye çevirir (transform-origin: 0 0) */
  function matrix3d(M) {
    const k = M[8] || 1, m = M.map((v) => v / k);
    return "matrix3d(" + [m[0], m[3], 0, m[6], m[1], m[4], 0, m[7], 0, 0, 1, 0, m[2], m[5], 0, m[8]].map((v) => +v.toFixed(9)).join(",") + ")";
  }
  /** Kâğıt birimi → ekran homografisini w×h boyutlu bir öğe için CSS matrix3d'ye çevirir */
  function cssMatrix3d(H, w, h, Lx, Ly) { return matrix3d(window.ARVision.mul3(H, [Lx / w, 0, 0, 0, Ly / h, 0, 0, 0, 1])); }
  /** Video pikseli → ekran (CSS px): video dokusunun kırpması (rx, ry, ox, oy) ve katman boyutu W×H */
  const viewM = (view, vw, vh, W, Hh) => { const rx = view.rx || 1, ry = view.ry || 1, ox = view.ox || 0, oy = view.oy || 0; return [W / (vw * rx), 0, (-ox * W) / rx, 0, Hh / (vh * ry), (-oy * Hh) / ry, 0, 0, 1]; };

  /* ---- Kare hattı (iki izleyicinin ortak parçası) ----
     Kareyi küçültüp işçiye verir (ImageBitmap aktarımı: kopyasız), işçi yoksa ya da çökerse işi ana iş
     parçacığında daha seyrek sürdürür. Yolda hep tek kare olur; bekçi takılan işçiyi yeniden başlatır;
     işlem süresine göre çözünürlük ve hız ayarlanır (lock: hedef izlemede çözünürlük sabit kalmalı).
     o: { width, onResult(res, meta), onOff() } */
  function framePipe(video, o) {
    const T = { mode: "none", worker: null, bitmap: false, busy: false, busyAt: 0, pend: null, seq: 0, lastSend: 0, lastVT: -1,
      pw: o.width, gap: 33, msAvg: 0, restarts: 0, off: false, lock: false, canvas: null, ctx: null };
    function grab(w, h) {
      if (!T.canvas) { T.canvas = document.createElement("canvas"); T.ctx = T.canvas.getContext("2d", { willReadFrequently: true }); }
      if (T.canvas.width !== w || T.canvas.height !== h) { T.canvas.width = w; T.canvas.height = h; }
      try { T.ctx.drawImage(video, 0, 0, w, h); return T.ctx.getImageData(0, 0, w, h); } catch (e) { return null; }
    }
    function startWorker() {
      let w;
      try { w = new Worker(BASE + "ar-worker.js"); } catch (e) { toMain(); return; }
      T.worker = w; T.mode = "starting";
      w.onmessage = (e) => {
        const m = e.data || {};
        if (m.type === "ready") { T.bitmap = !!m.bitmap && typeof createImageBitmap === "function"; T.mode = "worker"; }
        else if (m.type === "result") done(m.id, m.res, m.ms);
      };
      w.onerror = (e) => {
        if (e && e.preventDefault) e.preventDefault();
        try { w.terminate(); } catch (x) { /* kapandı */ }
        if (T.worker !== w) return;
        T.worker = null; T.busy = false; T.pend = null;
        if (T.off) return;
        if (++T.restarts <= 2) startWorker(); else toMain();
      };
      w.postMessage({ type: "init" });
      setTimeout(() => { if (!T.off && T.worker === w && T.mode === "starting") { w.terminate(); T.worker = null; toMain(); } }, 4000);
    }
    function toMain() {
      T.mode = "loading"; T.busy = false;
      loadVision().then(() => { if (T.off) return; T.mode = "main"; if (!T.lock) T.pw = Math.min(T.pw, 224); T.gap = 110; },
        () => { if (T.off) return; T.mode = "none"; if (o.onOff) o.onOff(); });
    }
    /** Bir kare gönder. msg(sc, pw, ph) → iş iletisi; force: aynı kare ve hız sınırı beklenmez. Gönderildiyse true. */
    function send(now, msg, meta, force) {
      if (T.off || T.busy || (T.mode !== "worker" && T.mode !== "main")) return false;
      if (document.hidden || !video.videoWidth || video.readyState < 2) return false;
      if (!force && now - T.lastSend < T.gap) return false;
      const vt = video.currentTime; if (!force && vt === T.lastVT && vt > 0) return false;   // aynı kare iki kez işlenmesin
      T.lastVT = vt;
      const vw = video.videoWidth, vh = video.videoHeight, pw = Math.min(T.pw, vw), ph = Math.round((pw * vh) / vw), sc = vw / pw;
      const id = ++T.seq, m = Object.assign(msg(sc, pw, ph), { id, w: pw, h: ph });
      T.pend = { id, meta: Object.assign({ tCap: now, sc, vw, vh, pw, ph }, meta) }; T.lastSend = now; T.busy = true; T.busyAt = now;
      if (T.mode === "worker") {
        if (T.bitmap) {
          let p; try { p = createImageBitmap(video, { resizeWidth: pw, resizeHeight: ph, resizeQuality: "low" }); } catch (e) { p = Promise.reject(e); }
          p.then((bmp) => {
            if (T.off || !T.worker || !T.pend || T.pend.id !== id) { bmp.close(); return; }
            m.bmp = bmp; T.worker.postMessage(m, [bmp]);
          }, () => { T.bitmap = false; T.busy = false; T.pend = null; });
        } else {
          const im = grab(pw, ph); if (!im) { T.busy = false; T.pend = null; return false; }
          m.buf = im.data.buffer; T.worker.postMessage(m, [m.buf]);
        }
      } else {
        const im = grab(pw, ph); if (!im) { T.busy = false; T.pend = null; return false; }
        const t0 = performance.now(); let res;
        try { res = window.ARFeature.handle(m, im.data); } catch (e) { res = { ok: false, reason: "error" }; }
        done(id, res, performance.now() - t0);
      }
      return true;
    }
    function done(id, res, ms) {
      const P0 = T.pend;
      if (!P0 || P0.id !== id || T.off) return;
      T.pend = null; T.busy = false;
      T.msAvg = T.msAvg ? T.msAvg + (ms - T.msAvg) * 0.1 : ms;
      const lim = T.mode === "main" ? 14 : 42;
      if (!T.lock) {
        if (T.msAvg > lim && T.pw > 176) { T.pw = Math.round(T.pw * 0.85); T.msAvg *= 0.75; }
        else if (T.msAvg < lim * 0.35 && T.pw < o.width) T.pw = Math.min(o.width, T.pw + 16);
      }
      T.gap = T.mode === "main" ? Math.max(110, T.msAvg * 6) : Math.max(33, T.msAvg * 1.1);
      try { o.onResult(res, P0.meta); } catch (e) { console.error("[AR] sonuç", e); }
    }
    function tick(now) {                                            // bekçi: takılan işçiyi yeniden başlat
      if (!T.busy || T.off || now - T.busyAt < 2500) return;
      T.busy = false; T.pend = null;
      if (T.mode === "worker" && T.worker) { T.worker.terminate(); T.worker = null; if (++T.restarts <= 2) startWorker(); else toMain(); }
    }
    loadVision().then(() => { if (!T.off && T.mode === "none") { if (capabilities().worker) startWorker(); else toMain(); } },
      () => { if (!T.off) { T.mode = "none"; if (o.onOff) o.onOff(); } });
    return {
      send, tick, ready: () => T.mode === "worker" || T.mode === "main",
      lock(on) { T.lock = !!on; }, width: () => T.pw,
      info: () => ({ mode: T.mode, ms: Math.round(T.msAvg), res: T.pw }),
      dispose() {
        if (T.off) return;
        T.off = true; T.busy = false; T.pend = null;
        if (T.worker) { try { T.worker.terminate(); } catch (e) { /* kapandı */ } T.worker = null; }
        if (T.canvas) { T.canvas.width = T.canvas.height = 0; T.canvas = null; T.ctx = null; }
      }
    };
  }
  /** Fener (karanlıkta): kamera izi destekliyorsa */
  function torchFor(stream) {
    const track = stream && stream.getVideoTracks ? stream.getVideoTracks()[0] : null;
    let cap = false, on = false;
    try { cap = !!(track && track.getCapabilities && track.getCapabilities().torch); } catch (e) { /* yok */ }
    return {
      cap: () => cap, on: () => on,
      set(v) { if (!cap) return Promise.resolve(false); on = !!v; return track.applyConstraints({ advanced: [{ torch: on }] }).then(() => true, () => false); },
      off() { if (cap && on) try { track.applyConstraints({ advanced: [{ torch: false }] }); } catch (e) { /* yok */ } on = false; }
    };
  }

  /** İzleyici. o: { THREE, video, stream?, onState(state, info), focal? (odak / video genişliği), procWidth? }
      Durumlar: search (kâğıt aranıyor) · track (kilitli) · coast (bir an kayıp, öngörüyle) · lost (görünmüyor, jiroskopla tutuluyor) · off (kullanılamıyor) */
  function createTracker(o) {
    const THREE = o.THREE, video = o.video, emit = typeof o.onState === "function" ? o.onState : () => {};
    const V = () => window.ARVision;
    const T = { state: "search", ever: false, dark: false, f: 0, fs: [], Lx: 1, Ly: SQ2, oriented: false, flipN: 0, out: 0,
      lastMeas: -1e9, light: null, H: null, corners: null, off: false };
    const pipe = framePipe(video, { width: o.procWidth || (lowEnd() ? 256 : 320), onResult, onOff: () => set("off", { reason: "unavailable" }) });
    let K = null;                                                   // Kalman (ilk karede, video ölçeği belli olunca kurulur)
    // q, r, hız ölçeği: işleme çözünürlüğünde px (tools/ar-check.mjs ile ayarlandı); video ölçeğine çevrilir
    const kal = (sc) => { const q = (o.q || 1.5) * sc * sc; return V().kalman(8, q, 0.12 * sc * sc, 1 * sc, q * 40); };

    /* ---- Jiroskop (kayıpta sahneyi tutmak için) ---- */
    const eul = new THREE.Euler(), qX = new THREE.Quaternion(-Math.sqrt(0.5), 0, 0, Math.sqrt(0.5)), zee = new THREE.Vector3(0, 0, 1), qT = new THREE.Quaternion(), qT2 = new THREE.Quaternion();
    const G = { on: false, q: new THREE.Quaternion() };
    function onOrient(ev) {
      if (ev.alpha == null || ev.beta == null) return;
      const R = Math.PI / 180, orient = ((screen.orientation && screen.orientation.angle) || window.orientation || 0) * R;
      eul.set(ev.beta * R, ev.alpha * R, -(ev.gamma || 0) * R, "YXZ");
      G.q.setFromEuler(eul).multiply(qX).multiply(qT.setFromAxisAngle(zee, -orient)); G.on = true;
    }
    window.addEventListener("deviceorientation", onOrient);

    const torch = torchFor(o.stream);
    const info = (extra) => { const p = pipe.info(); return Object.assign({ state: T.state, ever: T.ever, dark: T.dark, mode: p.mode, f: T.f, paper: { w: T.Lx, h: T.Ly }, torch: torch.cap(), ms: p.ms, res: p.res, n: T.n || 0, z: T.z || null, age: Math.round(performance.now() - T.lastMeas) }, extra || {}); };
    function set(state, extra) { T.state = state; try { emit(state, info(extra)); } catch (e) { console.error("[AR] durum", e); } }

    /* ---- Kare hattı ---- */
    function pump(now) {
      if (T.off) return;
      pipe.tick(now);
      if (!pipe.ready() || !window.ARVision) return;
      pipe.send(now, (sc) => {
        if (!K || K.sc !== sc) { K = kal(sc); K.sc = sc; }
        const prev = K.init && now - T.lastMeas < 600 ? K.predict(now).map((v) => v / sc - 0.5) : null;
        return { type: "frame", prev };
      }, {});
    }
    function onResult(res, P0) {
      if (!res || T.off) return;
      const L = res.light, dark = res.reason === "dark" || !!(L && L.mean < 0.13);
      if (dark !== T.dark) { T.dark = dark; set(T.state); }
      if (!res.ok) return;
      if (L) {
        const m = Math.max(L.r, L.g, L.b) || 1;
        const tgt = { k: clamp(L.lum / 0.72, 0.35, 1.6), r: L.r / m, g: L.g / m, b: L.b / m, contrast: L.contrast || 0, mean: L.mean };
        if (!T.light) T.light = tgt; else for (const k in tgt) T.light[k] += (tgt[k] - T.light[k]) * 0.15;
      }
      // bulucu piksel merkezini tamsayı alır; video koordinatı sürekli (0 = sol kenar), izdüşüm de buna göre kurulu
      const sc = P0.sc, re = T.state !== "track";
      let z = res.corners.map((v) => (v + 0.5) * sc);
      // tek karelik sıçrama: büyük olasılıkla başka bir beyaz nesne; üç kare üst üste gelirse kabul
      if (!re && K.init) {
        const p = K.predict(P0.tCap); let d = 0;
        for (let i = 0; i < 4; i++) d = Math.max(d, Math.hypot(z[2 * i] - p[2 * i], z[2 * i + 1] - p[2 * i + 1]));
        if (d > 0.3 * Math.hypot(z[0] - z[4], z[1] - z[5]) && ++T.out < 3) return;
      }
      T.out = 0;
      // yeniden bulunca köşeleri kâğıdın aynı köşelerine eşle (arada kâğıt ya da telefon döndüyse deney 90°/180° zıplamasın)
      if (re && T.ever) z = alignTo(z, hold.ok ? expected(P0.vw, P0.vh) : T.z);
      if (re) {
        K.reset();
        if (hold.ok) { blend.on = true; blend.t0 = performance.now(); blend.pos.copy(cur.pos); blend.quat.copy(cur.quat); }
      }
      K.update(z, P0.tCap); T.n = (T.n || 0) + 1; T.z = z;
      T.lastMeas = P0.tCap;
      calibrate(z, P0.vw, P0.vh);
      if (re) { const first = !T.ever; T.ever = true; set("track", { first }); }
    }
    function states(now) {
      const since = now - T.lastMeas;
      if (T.state === "track" && since > COAST) set("coast");
      else if (T.state === "coast" && since > LOST) { if (K) K.reset(); set("lost"); }
    }
    /* Odak ve kâğıt yönü */
    function calibrate(z, vw, vh) {
      const Vn = V(), cx = vw / 2, cy = vh / 2;
      if (!T.f) T.f = (o.focal || 0.8) * vw;                       // ilk tahmin: ≈64° yatay görüş açısı (telefon ana kamerası)
      const Hu = Vn.homography([0, 0, 1, 0, 1, 1, 0, 1], z); if (!Hu) return;
      const pu = Vn.pose(Hu, T.f, cx, cy); if (!pu) return;
      const longX = pu.ratio >= 1;
      if (!T.oriented) { T.Lx = longX ? SQ2 : 1; T.Ly = longX ? 1 : SQ2; T.oriented = true; }
      else if (longX !== T.Lx > T.Ly && Math.abs(Math.log(pu.ratio)) > 0.2) { if (++T.flipN > 15) { const t = T.Lx; T.Lx = T.Ly; T.Ly = t; T.flipN = 0; set(T.state, { flip: true }); } }
      else T.flipN = 0;
      const tilt = Math.acos(clamp(Math.abs(pu.R[8]), 0, 1));       // kâğıt normali ile bakış ekseni arası
      if (tilt < 0.35) return;                                      // dik bakışta odak ölçülemez
      const Hp = Vn.homography([0, 0, T.Lx, 0, T.Lx, T.Ly, 0, T.Ly], z), fe = Hp && Vn.focal(Hp, cx, cy);
      if (!fe || fe.f < 0.45 * vw || fe.f > 2.4 * vw) return;
      T.fs.push(fe.f); if (T.fs.length > 41) T.fs.shift();
      if (T.fs.length >= 5) { const m = median(T.fs); T.f += clamp(m - T.f, -0.03 * T.f, 0.03 * T.f); }
    }

    /* ---- Poz → three.js kamerası ---- */
    const mV = new THREE.Matrix4(), mW = new THREE.Matrix4(), vS = new THREE.Vector3();
    const cur = { pos: new THREE.Vector3(), quat: new THREE.Quaternion() };
    const hold = { pos: new THREE.Vector3(), quat: new THREE.Quaternion(), g: new THREE.Quaternion(), ok: false };
    const blend = { on: false, t0: 0, pos: new THREE.Vector3(), quat: new THREE.Quaternion() };
    const PAPER = () => [0, 0, T.Lx, 0, T.Lx, T.Ly, 0, T.Ly];
    /* Dünya ekseni: kâğıdın merkezi başlangıç, y yukarı (kâğıttan kameraya), x ilk kenar boyunca.
       kâğıt = A·dünya + o, A = [[1,0,0],[0,0,1],[0,−1,0]], o = (Lx/2, Ly/2, 0); OpenCV → three: C = diag(1,−1,−1) */
    function poseToCam(pz) {
      const R = pz.R, t = pz.t, hx = T.Lx / 2, hy = T.Ly / 2;
      const tx = R[0] * hx + R[1] * hy + t[0], ty = R[3] * hx + R[4] * hy + t[1], tz = R[6] * hx + R[7] * hy + t[2];
      mV.set(R[0], -R[2], R[1], tx, -R[3], R[5], -R[4], -ty, -R[6], R[8], -R[7], -tz, 0, 0, 0, 1);
      mW.copy(mV).invert(); mW.decompose(cur.pos, cur.quat, vS);
    }
    // son kamera pozundan (kayıpta jiroskopla döndürülmüş) kâğıt köşelerinin beklenen görüntü konumu
    const mE = new THREE.Matrix4(), vE = new THREE.Vector3(), ONE = new THREE.Vector3(1, 1, 1);
    function expected(vw, vh) {
      mE.compose(cur.pos, cur.quat, ONE).invert();
      const out = [], P = PAPER();
      for (let i = 0; i < 4; i++) {
        vE.set(P[2 * i] - T.Lx / 2, 0, P[2 * i + 1] - T.Ly / 2).applyMatrix4(mE);
        if (vE.z > -1e-6) return null;                              // kamera kâğıdın arkasında: tahmin yok
        out.push((T.f * vE.x) / -vE.z + vw / 2, (T.f * vE.y) / vE.z + vh / 2);
      }
      return out;
    }
    /* Köşe sırasını seç: önce en-boy (ilk kenar kâğıdın bilinen uzun/kısa kenarı olmalı → 4 olasılık 2'ye iner),
       sonra beklenen konuma yakınlık. Böylece telefon kayıpken 90°'ye kadar dönse de doğru köşe tutulur. */
    function alignTo(z, e) {
      const shift = (s) => { const o = []; for (let i = 0; i < 4; i++) { const k = (i + s) % 4; o.push(z[2 * k], z[2 * k + 1]); } return o; };
      const vw = video.videoWidth, vh = video.videoHeight, wantLongX = T.Lx > T.Ly;
      let best = Infinity, pick = z;
      for (let s = 0; s < 4; s++) {
        const c = shift(s), Hu = V().homography([0, 0, 1, 0, 1, 1, 0, 1], c), pu = Hu && V().pose(Hu, T.f, vw / 2, vh / 2);
        if (pu && pu.ratio >= 1 !== wantLongX) continue;
        let d = 0; if (e) for (let i = 0; i < 4; i++) d += Math.hypot(c[2 * i] - e[2 * i], c[2 * i + 1] - e[2 * i + 1]);
        if (d < best) { best = d; pick = c; }
      }
      return pick;
    }
    function projection(camera, vw, vh, view) {
      const f = T.f, rx = view.rx || 1, ry = view.ry || 1, ox = view.ox || 0, oy = view.oy || 0, n = 0.02, fa = 200;
      camera.projectionMatrix.set(
        (2 * f) / (vw * rx), 0, -((2 * (0.5 - ox)) / rx - 1), 0,
        0, (2 * f) / (vh * ry), -(1 - (2 * (0.5 - oy)) / ry), 0,
        0, 0, -(fa + n) / (fa - n), (-2 * fa * n) / (fa - n),
        0, 0, -1, 0);
      camera.projectionMatrixInverse.copy(camera.projectionMatrix).invert();
    }
    /** Şu anki (öngörülen) homografi: kâğıt birimi → video pikseli; kilitli değilse null */
    function currentH(now) {
      if (T.state !== "track" || !K || !K.init) return null;
      const z = K.predict(now), H = V().homography(PAPER(), z);
      if (H) { T.H = H; T.corners = z; }
      return H;
    }
    /** Her çizim karesinde: kareyi hatta ver, kamerayı kâğıda göre konumlandır. Kâğıt hiç bulunmadıysa false. */
    function apply(camera, view, now) {
      pump(now); states(now);
      const vw = video.videoWidth, vh = video.videoHeight;
      if (!T.ever || !vw || !window.ARVision) return false;
      projection(camera, vw, vh, view || {});
      let ok = false;
      const H = currentH(now), pz = H && V().pose(H, T.f, vw / 2, vh / 2);
      if (pz && pz.t[2] > 0) { poseToCam(pz); hold.pos.copy(cur.pos); hold.quat.copy(cur.quat); hold.g.copy(G.q); hold.ok = true; ok = true; }
      if (!ok) {
        if (!hold.ok) return false;
        cur.pos.copy(hold.pos); cur.quat.copy(hold.quat);
        if (G.on) cur.quat.multiply(qT.copy(hold.g).invert().multiply(G.q));    // kâğıt yok: yerinde dur, telefonun dönüşünü izle
      }
      if (blend.on) {
        const k = Math.min(1, (now - blend.t0) / 260), e = k * k * (3 - 2 * k);
        cur.pos.lerpVectors(blend.pos, cur.pos, e);
        qT2.copy(cur.quat); cur.quat.copy(blend.quat).slerp(qT2, e);
        if (k >= 1) blend.on = false;
      }
      camera.position.copy(cur.pos); camera.quaternion.copy(cur.quat); camera.updateMatrixWorld(true);
      return true;
    }
    /** 2B katmanlar için: kâğıt birimi → ekran (CSS px) homografisi. view: video dokusunun kırpması, W×H: katman boyutu */
    function screenH(view, W, Hh, now) {
      const H = currentH(now == null ? performance.now() : now), vw = video.videoWidth, vh = video.videoHeight;
      if (!H || !vw) return null;
      return V().mul3(viewM(view, vw, vh, W, Hh), H);
    }
    function dispose() {
      if (T.off) return;
      T.off = true;
      window.removeEventListener("deviceorientation", onOrient);
      pipe.dispose(); torch.off();
      K = null; T.fs.length = 0;
    }

    return {
      apply, screenH, dispose,
      update(now) { pump(now); states(now); },                   // yalnızca 2B katman kullananlar için (apply çağırmadan)
      state: () => T.state, ever: () => T.ever, dark: () => T.dark, light: () => T.light, info: () => info(),
      corners: () => T.corners, paper: () => ({ w: T.Lx, h: T.Ly }), focal: () => T.f,
      reset() { if (K) K.reset(); T.lastMeas = -1e9; T.out = 0; if (T.state !== "off") set(T.ever ? "lost" : "search"); },
      torch: () => torch.cap(), setTorch: (on) => torch.set(on)
    };
  }

  /** Görüntü hedefi izleyici (Modül 1: Canlı AR Çözüm). o: { video, stream?, onState(state, info), width? }
      Çekimden önce: aim(roi) ile kadraj bölgesinin ışık/netlik/sarsıntısı ölçülür (quality()).
      capture(roi): o anki kare hedef olur (roi: video pikseli [x0, y0, x1, y1]); sonra her karede hedefin
      yeri bulunur. homography(now): hedef karesi (video px) → şimdiki kare (video px), süzülmüş ve öngörülmüş.
      Durumlar: idle (hedef yok) · track · coast (bir an kayıp) · lost (görünmüyor) · off (kullanılamıyor) */
  function createTargetTracker(o) {
    const video = o.video, emit = typeof o.onState === "function" ? o.onState : () => {}, V = () => window.ARVision;
    const T = { state: "idle", aim: null, q: null, light: null, roi: null, sc: 1, K: null, lastMeas: -1e9, out: 0, want: null, n: 0, off: false, dark: false };
    const pipe = framePipe(video, { width: o.width || (lowEnd() ? 320 : 480), onResult, onOff: () => set("off", { reason: "unavailable" }) });
    const torch = torchFor(o.stream);
    const info = (extra) => { const p = pipe.info(); return Object.assign({ state: T.state, dark: T.dark, torch: torch.cap(), mode: p.mode, ms: p.ms, res: p.res, n: T.n }, extra || {}); };
    function set(state, extra) { if (T.state === state && !extra) return; T.state = state; try { emit(state, info(extra)); } catch (e) { console.error("[AR] durum", e); } }
    const rc = (r) => [r[0], r[1], r[2], r[1], r[2], r[3], r[0], r[3]];
    // işleme ölçeği (piksel merkezi tamsayı) ↔ video (sürekli) dönüşümü
    const S = (sc) => [sc, 0, 0.5 * sc, 0, sc, 0.5 * sc, 0, 0, 1], Si = (sc) => [1 / sc, 0, -0.5, 0, 1 / sc, -0.5, 0, 0, 1];
    function light(L) {
      if (!L) return;
      const m = Math.max(L.r, L.g, L.b) || 1, tgt = { lum: L.lum, r: L.r / m, g: L.g / m, b: L.b / m };
      if (!T.light) T.light = tgt; else for (const k in tgt) T.light[k] += (tgt[k] - T.light[k]) * 0.2;
      const dark = L.lum < 0.22; if (dark !== T.dark) { T.dark = dark; set(T.state, {}); }
    }
    function onResult(res, P0) {
      if (!res || T.off) return;
      if (P0.kind === "analyze") {
        if (res.q) T.q = T.q ? { lum: res.q.lum, contrast: res.q.contrast, sharp: T.q.sharp * 0.5 + res.q.sharp * 0.5, motion: T.q.motion * 0.5 + res.q.motion * 0.5 } : res.q;
        light(res.light); return;
      }
      if (P0.kind === "target") {
        const w = T.want; T.want = null;
        if (!res.ok) { set("idle"); if (w) w.resolve({ ok: false, reason: res.reason || "flat" }); return; }
        T.sc = P0.sc; pipe.lock(true);
        T.K = V().kalman(8, 1.5 * T.sc * T.sc, 0.12 * T.sc * T.sc, T.sc, 60 * T.sc * T.sc);
        T.K.update(rc(T.roi), P0.tCap); T.lastMeas = P0.tCap; T.n = 0;
        set("track", { first: true }); if (w) w.resolve({ ok: true, n: res.n });
        return;
      }
      if (P0.kind !== "track" || !T.K || T.state === "idle") return;
      if (res.state !== "track" || !res.H) { if (T.state !== "lost" && P0.tCap - T.lastMeas > 700) set("lost"); return; }
      light(res.light);
      // hedef (video) → şimdiki (video) = S · H · S⁻¹ ; ölçüm: soru bölgesinin dört köşesi
      const Hv = V().mul3(S(T.sc), V().mul3(res.H, Si(T.sc))), c = rc(T.roi), z = [];
      for (let i = 0; i < 4; i++) z.push(...V().applyH(Hv, c[2 * i], c[2 * i + 1]));
      const re = T.state !== "track";
      if (!re && T.K.init) {                                        // tek karelik sıçrama: üç kare üst üste gelirse kabul
        const p = T.K.predict(P0.tCap); let d = 0;
        for (let i = 0; i < 4; i++) d = Math.max(d, Math.hypot(z[2 * i] - p[2 * i], z[2 * i + 1] - p[2 * i + 1]));
        if (d > 0.35 * Math.hypot(z[0] - z[4], z[1] - z[5]) && ++T.out < 3) return;
      }
      T.out = 0;
      if (re) T.K.reset();
      T.K.update(z, P0.tCap); T.lastMeas = P0.tCap; T.n++;
      if (re) set("track", { found: true });
    }
    function update(now) {
      if (T.off) return;
      pipe.tick(now);
      if (!pipe.ready()) return;
      if (T.want && !T.want.sent) {
        if (pipe.send(now, (sc) => ({ type: "target", roi: T.want.roi.map((v) => v / sc - 0.5) }), { kind: "target" }, true)) T.want.sent = true;
      } else if (T.state === "idle" && T.aim) pipe.send(now, (sc) => ({ type: "analyze", roi: T.aim.map((v) => v / sc - 0.5) }), { kind: "analyze" });
      else if (T.state !== "idle" && !T.want) pipe.send(now, () => ({ type: "track", roi: T.roi.map((v) => v / T.sc - 0.5) }), { kind: "track" });
      if (T.state === "track" && now - T.lastMeas > 300) set("coast");
      else if (T.state === "coast" && now - T.lastMeas > 900) set("lost");
    }
    /** Şimdiki homografi: hedef karesi (video px) → şimdiki kare (video px); kilitli değilse null */
    function homography(now) {
      if ((T.state !== "track" && T.state !== "coast") || !T.K || !T.K.init) return null;
      return V().homography(rc(T.roi), T.K.predict(now));
    }
    return {
      update, homography,
      screenH(view, W, Hh, now) { const H = homography(now == null ? performance.now() : now), vw = video.videoWidth; return H && vw ? V().mul3(viewM(view, vw, video.videoHeight, W, Hh), H) : null; },
      aim(roi) { T.aim = roi ? roi.slice() : null; },
      quality: () => T.q, light: () => T.light, state: () => T.state, info: () => info(), roi: () => T.roi && T.roi.slice(),
      capture(roi) {
        if (T.want) T.want.resolve({ ok: false, reason: "replaced" });
        T.roi = roi.slice(); pipe.lock(false); set("idle");
        return new Promise((resolve) => { T.want = { roi: T.roi, resolve, sent: false }; });
      },
      reset() { if (T.want) { T.want.resolve({ ok: false, reason: "reset" }); T.want = null; } T.roi = null; T.K = null; pipe.lock(false); pipe.send(performance.now(), () => ({ type: "reset" }), { kind: "reset" }, true); set("idle"); },
      torch: () => torch.cap(), setTorch: (on) => torch.set(on),
      dispose() { if (T.off) return; T.off = true; if (T.want) T.want.resolve({ ok: false, reason: "closed" }); pipe.dispose(); torch.off(); }
    };
  }

  window.App = window.App || {};
  App.arCore = { createTracker, createTargetTracker, capabilities, cssMatrix3d, matrix3d, viewM, loadVision, version: 2 };
})();
