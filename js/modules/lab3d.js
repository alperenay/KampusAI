/* =========================================================
   lab3d.js — Deney Laboratuvarı'nın 3B görünümü (Three.js r149, uygulamanın içinde)

   • Kütüphane yalnızca bir deney 3B açıldığında yüklenir (assets/vendor/three).
   • Öğrenci her deneyde 2B / 3B arasında seçim yapar; seçim hatırlanır ("labMode").
   • Kalite: "auto" | "high" | "low" ("lab3dQuality"). Düşükte gölge ve kenar
     yumuşatma kapanır; WebGL yoksa deney 2B açılır.
   • Kamera: sürükle = döndür, tekerlek / iki parmak = yakınlaştır, çift dokunuş = sıfırla.

   Her deney 3B sahnesini def(id, { view, build(S, p), update(S, p, t, s) }) ile kaydeder.
   ========================================================= */
(function () {
  const DEFS = {};
  let loading = null, okGL = null;

  function load() {
    if (window.THREE) return Promise.resolve(window.THREE);
    if (!loading) loading = new Promise((res, rej) => {
      const sc = document.createElement("script");
      sc.src = "assets/vendor/three/three.min.js"; sc.async = true;
      sc.onload = () => (window.THREE ? res(window.THREE) : rej(new Error("THREE yok")));
      sc.onerror = () => { loading = null; rej(new Error("3B kütüphanesi yüklenemedi")); };
      document.head.appendChild(sc);
    });
    return loading;
  }
  function supported() {
    if (okGL != null) return okGL;
    try { const c = document.createElement("canvas"); okGL = !!(window.WebGLRenderingContext && (c.getContext("webgl2") || c.getContext("webgl"))); } catch (e) { okGL = false; }
    return okGL;
  }
  const lowEnd = () => (navigator.hardwareConcurrency || 4) <= 2 || document.documentElement.classList.contains("lite");
  function quality() { const q = App.prefs.get("lab3dQuality", "auto"); return q === "auto" ? (lowEnd() ? "low" : "high") : q; }
  function mode() { const m = App.prefs.get("labMode", null); return m === "2d" || m === "3d" ? m : supported() && !lowEnd() ? "3d" : "2d"; }
  function setMode(m) { App.prefs.set("labMode", m); }
  const has = (id) => !!DEFS[id];
  function def(id, d) { DEFS[id] = d; }

  /** Tema renkleri (2B ile aynı) → Three renkleri */
  function themeCols() {
    const c = App.labs.util.colors();
    const light = document.documentElement.getAttribute("data-theme") === "light";
    return Object.assign({}, c, { light, bg: light ? "#e8eef8" : "#16171b", floor: light ? "#d6deea" : "#22242a", gridA: light ? "#b9c4d6" : "#34373f", gridB: light ? "#cbd4e2" : "#2a2d33" });
  }

  /* ---------------- Sahne ---------------- */
  function mount(host, id, ratio) {
    const THREE = window.THREE, D = DEFS[id], q = quality();
    if (THREE.ColorManagement) THREE.ColorManagement.legacyMode = false;     // renkler sRGB olarak yorumlansın (soluk görünmesin)
    const el = document.createElement("div"); el.className = "lab__3d";
    host.appendChild(el);
    const renderer = new THREE.WebGLRenderer({ antialias: q === "high", alpha: false, powerPreference: q === "high" ? "high-performance" : "low-power" });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, q === "high" ? 2 : 1));
    renderer.shadowMap.enabled = q === "high"; renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.outputEncoding = THREE.sRGBEncoding;
    el.appendChild(renderer.domElement);
    const hint = document.createElement("div"); hint.className = "lab__3dhint"; const touch = window.matchMedia && window.matchMedia("(pointer: coarse)").matches;
    hint.textContent = App.i18n.lang === "en" ? (touch ? "Drag to rotate · pinch to zoom" : "Drag to rotate · scroll to zoom · double-click to reset") : (touch ? "Sürükle: döndür · iki parmak: yakınlaştır" : "Sürükle: döndür · tekerlek: yakınlaştır · çift tık: sıfırla");
    el.appendChild(hint);

    const cols = themeCols();
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(cols.bg);
    scene.fog = new THREE.Fog(cols.bg, 40, 120);
    const camera = new THREE.PerspectiveCamera(42, 1, 0.05, 400);
    const hemi = new THREE.HemisphereLight(0xffffff, cols.light ? 0x8a94a8 : 0x30323a, cols.light ? 0.85 : 0.75); scene.add(hemi);
    const sun = new THREE.DirectionalLight(0xffffff, cols.light ? 0.75 : 0.9); sun.position.set(8, 14, 10); sun.castShadow = q === "high";
    sun.shadow.mapSize.set(1024, 1024); Object.assign(sun.shadow.camera, { left: -16, right: 16, top: 16, bottom: -16, near: 1, far: 60 }); sun.shadow.bias = -0.0006;
    scene.add(sun);
    const root = new THREE.Group(); scene.add(root);

    // zemin
    const floor = new THREE.Mesh(new THREE.PlaneGeometry(200, 200), new THREE.MeshStandardMaterial({ color: cols.floor, roughness: 1 }));
    floor.rotation.x = -Math.PI / 2; floor.receiveShadow = true; floor.position.y = -0.001; scene.add(floor);
    const grid = new THREE.GridHelper(60, 60, cols.gridA, cols.gridB); grid.material.transparent = true; grid.material.opacity = 0.5; scene.add(grid);

    /* ---- Kamera denetimi (yörünge) ---- */
    const v0 = Object.assign({ r: 14, th: 0.6, ph: 1.05, target: [0, 1.5, 0] }, D.view || {});
    const cam = { r: v0.r, th: v0.th, ph: v0.ph, t: new THREE.Vector3(...v0.target) };
    const place = () => { camera.position.set(cam.t.x + cam.r * Math.sin(cam.ph) * Math.sin(cam.th), cam.t.y + cam.r * Math.cos(cam.ph), cam.t.z + cam.r * Math.sin(cam.ph) * Math.cos(cam.th)); camera.lookAt(cam.t); };
    const reset = () => { cam.r = v0.r; cam.th = v0.th; cam.ph = v0.ph; cam.t.set(...v0.target); place(); render(); };
    const pts = new Map(); let pinch0 = 0, lastTap = 0;
    const cvs = renderer.domElement;
    cvs.addEventListener("pointerdown", (e) => { cvs.setPointerCapture(e.pointerId); pts.set(e.pointerId, [e.clientX, e.clientY]); if (pts.size === 2) { const [a, b] = Array.from(pts.values()); pinch0 = Math.hypot(a[0] - b[0], a[1] - b[1]); }
      const now = performance.now(); if (now - lastTap < 300 && pts.size === 1) reset(); lastTap = now; hint.classList.add("is-gone"); });
    cvs.addEventListener("pointermove", (e) => {
      if (!pts.has(e.pointerId)) return;
      const prev = pts.get(e.pointerId); pts.set(e.pointerId, [e.clientX, e.clientY]);
      if ((AR.on && AR.gyro) || HO.on) {              // AR / hologram: kamera sabit; tek parmak sahneyi döndürür, iki parmak büyütür
        if (pts.size === 1) root.rotation.y += (e.clientX - prev[0]) * 0.01;
        else if (pts.size === 2) { const [a, b] = Array.from(pts.values()), d = Math.hypot(a[0] - b[0], a[1] - b[1]); if (pinch0) { const k = Math.max(0.15, Math.min(4, root.scale.x * d / pinch0)); root.scale.setScalar(k); } pinch0 = d; }
        render(); return;
      }
      if (pts.size === 1) { cam.th -= (e.clientX - prev[0]) * 0.008; cam.ph = Math.max(0.15, Math.min(1.52, cam.ph - (e.clientY - prev[1]) * 0.006)); }
      else if (pts.size === 2) { const [a, b] = Array.from(pts.values()), d = Math.hypot(a[0] - b[0], a[1] - b[1]); if (pinch0) cam.r = Math.max(2, Math.min(80, cam.r * pinch0 / d)); pinch0 = d; }
      place(); render();
    });
    const up = (e) => { pts.delete(e.pointerId); pinch0 = 0; };
    cvs.addEventListener("pointerup", up); cvs.addEventListener("pointercancel", up);
    cvs.addEventListener("wheel", (e) => { e.preventDefault(); if ((AR.on && AR.gyro) || HO.on) { root.scale.setScalar(Math.max(0.15, Math.min(4, root.scale.x * (1 - Math.sign(e.deltaY) * 0.1)))); render(); return; } cam.r = Math.max(2, Math.min(80, cam.r * (1 + Math.sign(e.deltaY) * 0.1))); place(); render(); }, { passive: false });

    /* ---- Boyut ---- */
    let W = 0, H = 0;
    function size() {
      const full = AR.on || (HO.on && !HO.inline);
      const w = full ? window.innerWidth : Math.max(240, Math.round(host.clientWidth)), h = full ? window.innerHeight : Math.round(Math.min(w * (ratio || 0.62), window.innerHeight * 0.62));
      if (w === W && h === H) return;
      W = w; H = h; renderer.setSize(w, h); camera.aspect = w / h; camera.updateProjectionMatrix(); render();
    }
    const ro = new ResizeObserver(size); ro.observe(host);
    const AR = { on: false }, HO = { on: false };

    let raf = 0;
    function render() { if (!W || HO.on) return; cancelAnimationFrame(raf); raf = requestAnimationFrame(() => renderer.render(scene, camera)); }

    /* ---- Yardımcılar ---- */
    const M = (color, o) => new THREE.MeshStandardMaterial(Object.assign({ color, roughness: 0.55, metalness: 0.05 }, o || {}));
    const mesh = (geo, mat, parent) => { const m = new THREE.Mesh(geo, mat && mat.isMaterial ? mat : M(mat)); m.castShadow = true; m.receiveShadow = true; (parent || root).add(m); return m; };
    const S = {
      THREE, scene, root, camera, renderer, cols, el, o: {}, q,
      M, mesh,
      glass: (color, op) => new THREE.MeshStandardMaterial({ color: color || 0xcfe6ff, transparent: true, opacity: op == null ? 0.22 : op, roughness: 0.05, metalness: 0.1, depthWrite: false, side: THREE.DoubleSide }),
      box: (w, h, d, c, parent) => mesh(new THREE.BoxGeometry(w, h, d), c, parent),
      sphere: (r, c, parent, seg) => mesh(new THREE.SphereGeometry(r, seg || 24, Math.round((seg || 24) * 0.75)), c, parent),
      cyl: (rt, rb, h, c, parent, seg) => mesh(new THREE.CylinderGeometry(rt, rb, h, seg || 24), c, parent),
      group: (parent) => { const g = new THREE.Group(); (parent || root).add(g); return g; },
      /** Kalın ok (gövde + uç); set(from, to) ile güncellenir */
      arrow(color, r, parent) {
        const g = new THREE.Group(); (parent || root).add(g);
        const shaft = new THREE.Mesh(new THREE.CylinderGeometry(r || 0.05, r || 0.05, 1, 12), M(color)), head = new THREE.Mesh(new THREE.ConeGeometry((r || 0.05) * 2.6, 1, 16), M(color));
        g.add(shaft); g.add(head);
        const upV = new THREE.Vector3(0, 1, 0), dir = new THREE.Vector3();
        g.set = (a, b) => {
          dir.set(b[0] - a[0], b[1] - a[1], b[2] - a[2]); const L = dir.length(); g.visible = L > 1e-4; if (!g.visible) return g;
          const hl = Math.min(L * 0.4, (r || 0.05) * 7); dir.normalize();
          g.position.set(a[0], a[1], a[2]); g.quaternion.setFromUnitVectors(upV, dir);
          shaft.scale.set(1, Math.max(1e-3, L - hl), 1); shaft.position.y = (L - hl) / 2; head.scale.set(1, hl, 1); head.position.y = L - hl / 2; return g;
        };
        return g;
      },
      /** İnce çizgi (yörünge, alan çizgisi); setPoints([[x,y,z],…]) */
      line(color, max, parent, opts) {
        const geo = new THREE.BufferGeometry(), arr = new Float32Array((max || 512) * 3);
        geo.setAttribute("position", new THREE.BufferAttribute(arr, 3)); geo.setDrawRange(0, 0);
        const mat = opts && opts.dashed ? new THREE.LineDashedMaterial({ color, dashSize: 0.3, gapSize: 0.2 }) : new THREE.LineBasicMaterial({ color, transparent: !!(opts && opts.opacity), opacity: (opts && opts.opacity) || 1 });
        const ln = new THREE.Line(geo, mat); (parent || root).add(ln);
        ln.setPoints = (P) => { const n = Math.min(P.length, max || 512); for (let i = 0; i < n; i++) { arr[i * 3] = P[i][0]; arr[i * 3 + 1] = P[i][1]; arr[i * 3 + 2] = P[i][2]; } geo.setDrawRange(0, n); geo.attributes.position.needsUpdate = true; geo.computeBoundingSphere(); if (opts && opts.dashed) ln.computeLineDistances(); return ln; };
        return ln;
      },
      /** Kalın boru (sabit yollar için) */
      tube(P, r, color, parent) { const curve = new THREE.CatmullRomCurve3(P.map((q) => new THREE.Vector3(...q))); return mesh(new THREE.TubeGeometry(curve, Math.max(20, P.length * 2), r, 8, false), color, parent); },
      /** Yazı (kameraya bakan etiket); set(text) */
      label(text, color, size, parent) {
        const cv = document.createElement("canvas"), cx = cv.getContext("2d"), tex = new THREE.CanvasTexture(cv);
        tex.encoding = THREE.sRGBEncoding;
        const sp = new THREE.Sprite(new THREE.SpriteMaterial({ map: tex, transparent: true, depthTest: false }));
        sp.renderOrder = 10; (parent || root).add(sp);
        let cur = null;
        sp.set = (t, col) => { t = String(t); if (t === cur && !col) return sp; cur = t; const fs = 48; cx.font = "600 " + fs + "px system-ui, sans-serif"; const w = Math.ceil(cx.measureText(t).width) + 24; cv.width = w; cv.height = fs + 20;
          cx.font = "600 " + fs + "px system-ui, sans-serif"; cx.textBaseline = "middle"; cx.fillStyle = cols.light ? "rgba(255,255,255,.75)" : "rgba(10,10,14,.55)"; cx.beginPath(); cx.roundRect ? cx.roundRect(0, 0, w, fs + 20, 14) : cx.rect(0, 0, w, fs + 20); cx.fill();
          cx.fillStyle = col || color || (cols.light ? "#111" : "#fff"); cx.fillText(t, 12, (fs + 20) / 2 + 2); tex.needsUpdate = true; const k = (size || 0.5) / (fs + 20); sp.scale.set(w * k, (fs + 20) * k, 1); return sp; };
        sp.set(text); return sp;
      },
      /** Anahtar değişince alt grubu baştan kur */
      keyed(name, key, fn) { S._k = S._k || {}; S._g = S._g || {}; if (S._k[name] === key) return S._g[name]; if (S._g[name]) { clear(S._g[name]); root.remove(S._g[name]); } const g = new THREE.Group(); root.add(g); S._g[name] = g; S._k[name] = key; fn(g); return g; },
      setView(v) { Object.assign(v0, v); if (v.target) cam.t.set(...v.target); if (v.r) cam.r = v.r; if (v.th != null) cam.th = v.th; if (v.ph != null) cam.ph = v.ph; place(); },
      hideFloor() { floor.visible = false; grid.visible = false; },
      render
    };
    function clear(obj) { obj.traverse((o) => { if (o.geometry) o.geometry.dispose(); if (o.material) { (Array.isArray(o.material) ? o.material : [o.material]).forEach((m) => { if (m.map) m.map.dispose(); m.dispose(); }); } }); }

    /* =========================================================
       AR (artırılmış gerçeklik) — v1.24
       Arka kameranın görüntüsü sahnenin arka planı olur; telefonun jiroskopu
       kamerayı döndürür, böylece deney masanın üstünde duruyormuş gibi görünür
       (3 serbestlik derecesi). Jiroskop yoksa (bilgisayar) görüntü yine
       arkada durur, sahne fareyle döndürülür. Uygulama içinde (Android WebView,
       Windows) ve tarayıcıda çalışır; WebXR gerektirmez.
       ========================================================= */
    const saved = {};
    const zee = new THREE.Vector3(0, 0, 1), qX = new THREE.Quaternion(-Math.sqrt(0.5), 0, 0, Math.sqrt(0.5));
    const qTmp = new THREE.Quaternion(), qDev = new THREE.Quaternion(), eul = new THREE.Euler();
    function devQuat(ev) {
      const R = Math.PI / 180, orient = ((screen.orientation && screen.orientation.angle) || window.orientation || 0) * R;
      eul.set((ev.beta || 0) * R, (ev.alpha || 0) * R, -(ev.gamma || 0) * R, "YXZ");
      qDev.setFromEuler(eul); qDev.multiply(qX); qDev.multiply(qTmp.setFromAxisAngle(zee, -orient));
      return qDev;
    }
    function onOrient(ev) {
      if (!AR.on || ev.alpha == null || ev.beta == null) return;
      AR.gyro = true;
      const q = devQuat(ev);
      if (!AR.q0) { AR.q0 = q.clone().invert(); AR.base = camera.quaternion.clone(); el.classList.add("is-gyro"); }
      camera.quaternion.copy(AR.base).multiply(qTmp.copy(AR.q0).multiply(q));
    }
    function fitVideo() {
      const v = AR.video, tex = AR.tex; if (!v || !tex || !v.videoWidth || !W) return;
      const va = v.videoWidth / v.videoHeight, ca = W / H;
      if (va > ca) { tex.repeat.set(ca / va, 1); tex.offset.set((1 - ca / va) / 2, 0); } else { tex.repeat.set(1, va / ca); tex.offset.set(0, (1 - va / ca) / 2); }
    }
    function arLoop() { if (!AR.on) return; fitVideo(); renderer.render(scene, camera); AR.raf = requestAnimationFrame(arLoop); }
    const arT = (tr, en) => (App.i18n.lang === "en" ? en : tr);
    async function arStart(o) {
      if (AR.on) return true;
      if (HO.on) holoStop();
      if (HA.on) handStop();
      o = o || {};
      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) throw Object.assign(new Error(arT("Bu cihazda kamera kullanılamıyor.", "Camera is not available on this device.")), { code: "no-camera" });
      // iPhone: hareket sensörü izni dokunuşla istenmeli
      try { if (window.DeviceOrientationEvent && typeof DeviceOrientationEvent.requestPermission === "function") await DeviceOrientationEvent.requestPermission(); } catch (e) { /* izin yoksa jiroskopsuz devam */ }
      let stream;
      try { stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: { ideal: "environment" }, width: { ideal: 1280 }, height: { ideal: 720 } }, audio: false }); }
      catch (e) { throw Object.assign(new Error(e && e.name === "NotAllowedError" ? arT("Kamera izni verilmedi. Ayarlardan KampüsAI'ye kamera izni verip tekrar dene.", "Camera permission was denied.") : arT("Kamera açılamadı.", "Could not open the camera.")), { code: "no-camera" }); }
      const video = document.createElement("video");
      video.setAttribute("playsinline", ""); video.muted = true; video.srcObject = stream;
      try { await video.play(); } catch (e) { /* bazı tarayıcılar kendisi oynatır */ }
      Object.assign(AR, { on: true, stream, video, gyro: false, q0: null, base: null });
      AR.tex = new THREE.VideoTexture(video); AR.tex.encoding = THREE.sRGBEncoding;
      Object.assign(saved, { bg: scene.background, fog: scene.fog, floor: floor.visible, grid: grid.visible, rs: root.scale.x, rr: root.rotation.y, cam: { r: cam.r, th: cam.th, ph: cam.ph, t: cam.t.clone() }, parent: el.parentNode, next: el.nextSibling });
      scene.background = AR.tex; scene.fog = null; floor.visible = false; grid.visible = false;
      root.scale.setScalar(0.6);
      // tam ekran katman
      el.classList.add("is-ar"); document.body.appendChild(el); document.documentElement.classList.add("ar-open");
      const ui = document.createElement("div"); ui.className = "lab-ar";
      ui.innerHTML = '<div class="lab-ar__top"><span class="lab-ar__badge">AR</span><span class="lab-ar__hint">' + (window.matchMedia && matchMedia("(pointer: coarse)").matches ? arT("Telefonu yavaşça çevir · iki parmakla büyüt · tek parmakla döndür", "Move your phone slowly · pinch to scale · drag to rotate") : arT("Fareyle sürükleyerek döndür · tekerlekle büyüt · Esc ile çık", "Drag to rotate · scroll to scale · Esc to exit")) + '</span><button type="button" class="lab-ar__btn" data-ar="exit" aria-label="' + arT("AR'dan çık", "Exit AR") + '">✕</button></div>' +
        '<div class="lab-ar__bot">' + (o.side ? '<button type="button" class="lab-ar__btn lab-ar__wide" data-ar="ctl">' + arT("Ayarlar", "Controls") + "</button>" : "") +
        (o.play ? '<button type="button" class="lab-ar__btn lab-ar__wide" data-ar="play">' + arT("Oynat / durdur", "Play / pause") + "</button>" : "") +
        '<button type="button" class="lab-ar__btn lab-ar__wide" data-ar="center">' + arT("Ortala", "Recenter") + '</button></div><div class="lab-ar__sheet" hidden></div>';
      el.appendChild(ui); AR.ui = ui; AR.side = o.side || null; AR.sideHome = o.side ? { parent: o.side.parentNode, next: o.side.nextSibling } : null;
      ui.addEventListener("click", (e) => {
        const b = e.target.closest("[data-ar]"); if (!b) return;
        const k = b.dataset.ar;
        if (k === "exit") arStop();
        else if (k === "play" && o.play) { const pb = o.play.querySelector('[data-lab="play"]'); if (pb) pb.click(); }
        else if (k === "center") { AR.q0 = null; root.rotation.y = 0; root.scale.setScalar(0.6); if (!AR.gyro) { reset(); } }
        else if (k === "ctl" && AR.side) { const sh = ui.querySelector(".lab-ar__sheet"); if (sh.hidden) { sh.appendChild(AR.side); sh.hidden = false; } else { sh.hidden = true; } }
      });
      AR.key = (e) => { if (e.key === "Escape") arStop(); };
      document.addEventListener("keydown", AR.key);
      AR.nav = () => arStop();                        // başka sayfaya geçilirse kamera kapansın
      window.addEventListener("hashchange", AR.nav);
      window.addEventListener("deviceorientation", onOrient);
      AR.resize = () => { W = 0; size(); };
      window.addEventListener("resize", AR.resize);
      W = 0; size(); cancelAnimationFrame(raf); arLoop();
      return true;
    }
    function arStop() {
      if (!AR.on) return;
      AR.on = false; cancelAnimationFrame(AR.raf);
      window.removeEventListener("deviceorientation", onOrient); window.removeEventListener("resize", AR.resize); document.removeEventListener("keydown", AR.key); window.removeEventListener("hashchange", AR.nav);
      try { AR.stream.getTracks().forEach((t) => t.stop()); } catch (e) { /* yok */ }
      if (AR.tex) AR.tex.dispose();
      if (AR.side && AR.sideHome && AR.sideHome.parent) AR.sideHome.parent.insertBefore(AR.side, AR.sideHome.next && AR.sideHome.next.parentNode === AR.sideHome.parent ? AR.sideHome.next : null);
      if (AR.ui) AR.ui.remove();
      scene.background = saved.bg; scene.fog = saved.fog; floor.visible = saved.floor; grid.visible = saved.grid;
      root.scale.setScalar(saved.rs); root.rotation.y = saved.rr;
      cam.r = saved.cam.r; cam.th = saved.cam.th; cam.ph = saved.cam.ph; cam.t.copy(saved.cam.t); place();
      el.classList.remove("is-ar", "is-gyro"); document.documentElement.classList.remove("ar-open");
      if (saved.parent && saved.parent.isConnected) saved.parent.insertBefore(el, saved.next && saved.next.parentNode === saved.parent ? saved.next : saved.parent.firstChild); else el.remove();
      Object.assign(AR, { stream: null, video: null, tex: null, ui: null, side: null, gyro: false, q0: null });
      W = 0; size(); render();
      if (AR.onStop) AR.onStop();
    }

    /* =========================================================
       Hologram (v1.25) — ek donanım gerektirmeyen "ekran hologramı"
       Ekran bir pencere gibi davranır: izleyicinin göz konumuna göre eksen dışı
       (off-axis) perspektif kurulur, deney ekranın arkasındaki derin bir kutuda
       ya da önünde duruyormuş gibi görünür. Göz konumu üç kaynaktan gelir:
         • face : ön kamera + pico.js yüz bulucu (cihazda, internetsiz; görüntü saklanmaz)
         • tilt : jiroskop (telefonu eğmek)
         • mouse: fare (bilgisayar)
       Görünüm: siyah zemin, camgöbeği kenar parıltısı (fresnel), tarama çizgileri.
       ========================================================= */
    const CYAN = new THREE.Color(0x35e0ff), WHITE = new THREE.Color(0xffffff);
    const HV = "varying vec3 vN; varying vec3 vV;\n#include <common>\nvoid main() {\n#include <beginnormal_vertex>\n#include <defaultnormal_vertex>\n#include <begin_vertex>\n#include <project_vertex>\nvN = normalize(transformedNormal); vV = normalize(-mvPosition.xyz);\n}";
    const HF = "uniform vec3 uColor; uniform float uOpacity; uniform float uTime; varying vec3 vN; varying vec3 vV;\nvoid main() {\nvec3 n = normalize(vN); if (!gl_FrontFacing) n = -n;\nfloat rim = 1.0 - abs(dot(n, normalize(vV)));\nfloat scan = 0.82 + 0.18 * sin(gl_FragCoord.y * 1.4 - uTime * 6.0);\nfloat a = (0.16 + 0.84 * pow(rim, 1.7)) * uOpacity * scan;\ngl_FragColor = vec4(uColor * (0.55 + 1.1 * rim), a);\n}";
    const holoMats = new Map();
    function holoMatFor(m) {
      let h = holoMats.get(m);
      if (!h) {
        if (m.isLineBasicMaterial || m.isLineDashedMaterial) h = new THREE.LineBasicMaterial({ transparent: true, blending: THREE.AdditiveBlending, depthWrite: false });
        else if (m.isMeshBasicMaterial || m.isMeshStandardMaterial || m.isMeshLambertMaterial || m.isMeshPhongMaterial || m.isMeshPhysicalMaterial || m.isMeshNormalMaterial)
          h = new THREE.ShaderMaterial({ uniforms: { uColor: { value: new THREE.Color() }, uOpacity: { value: 1 }, uTime: { value: 0 } }, vertexShader: HV, fragmentShader: HF, transparent: true, depthWrite: false, blending: THREE.AdditiveBlending, side: THREE.DoubleSide });
        else h = null;
        holoMats.set(m, h);
      }
      if (h) {
        const col = h.isShaderMaterial ? h.uniforms.uColor.value : h.color;
        if (m.color) col.copy(m.color); else col.copy(WHITE);
        if (m.emissive && m.emissiveIntensity && (m.emissive.r + m.emissive.g + m.emissive.b) > 0.3) col.lerp(m.emissive, 0.5);
        col.lerp(CYAN, 0.4).multiplyScalar(1.15);
        const op = (m.transparent ? (m.opacity == null ? 1 : m.opacity) : 1);
        if (h.isShaderMaterial) { h.uniforms.uOpacity.value = Math.max(0.12, op); h.uniforms.uTime.value = performance.now() / 1000; }
        else h.opacity = Math.max(0.25, op) * 0.9;
        h.visible = m.visible;
      }
      return h;
    }
    const swapped = [];
    function holoSwap() {
      root.traverse((o) => {
        if (!(o.isMesh || o.isLine) || o.isSprite) return;
        const orig = o.material;
        const holo = Array.isArray(orig) ? orig.map((m) => holoMatFor(m) || m) : holoMatFor(orig);
        if (!holo) return;
        swapped.push(o, orig); o.material = holo;
      });
    }
    function holoUnswap() { for (let i = swapped.length - 2; i >= 0; i -= 2) swapped[i].material = swapped[i + 1]; swapped.length = 0; }

    // Ekran çerçevesinin arkasında derinlik veren tel kutu
    let roomGeo = null, room = null;
    const RN = 6;                                    // her duvardaki boyuna çizgi sayısı
    function buildRoom() {
      const segs = (RN * 4 + 4 * (RN + 1)) * 2;      // boyuna çizgiler + derinlik halkaları
      roomGeo = new THREE.BufferGeometry(); roomGeo.setAttribute("position", new THREE.BufferAttribute(new Float32Array(segs * 3 * 2), 3));
      room = new THREE.LineSegments(roomGeo, new THREE.LineBasicMaterial({ color: 0x35e0ff, transparent: true, opacity: 0.28, blending: THREE.AdditiveBlending, depthWrite: false }));
      room.frustumCulled = false; room.renderOrder = -1; scene.add(room);
    }
    function sizeRoom(hw, hh, depth) {
      const a = roomGeo.attributes.position.array; let i = 0;
      const P = (x, y, z) => { a[i++] = x; a[i++] = y; a[i++] = z; };
      const edge = (k, n) => { const t = -1 + (2 * k) / n; return t; };
      // boyuna çizgiler (ön çerçeveden arka duvara)
      for (let k = 0; k < RN; k++) { const t = edge(k, RN);
        P(t * hw, -hh, 0); P(t * hw, -hh, -depth); P(t * hw, hh, 0); P(t * hw, hh, -depth);
        P(-hw, t * hh, 0); P(-hw, t * hh, -depth); P(hw, t * hh, 0); P(hw, t * hh, -depth); }
      // derinlik halkaları
      for (let k = 0; k <= RN; k++) { const z = -depth * Math.pow(k / RN, 1.15);
        P(-hw, -hh, z); P(hw, -hh, z); P(hw, -hh, z); P(hw, hh, z); P(hw, hh, z); P(-hw, hh, z); P(-hw, hh, z); P(-hw, -hh, z); }
      while (i < a.length) a[i++] = 0;
      roomGeo.attributes.position.needsUpdate = true;
    }

    const eyeT = [0, 0, 1];                           // hedef göz konumu: x, y (ekranın yarı yüksekliği cinsinden), z (uzaklık oranı)
    const qB = new THREE.Quaternion(), vF = new THREE.Vector3(), vR = new THREE.Vector3(), vU = new THREE.Vector3();
    function holoView() {
      // temel yörünge kamerası → ekran düzlemi hedefte, kamera uzaklığı = cam.r
      place(); qB.copy(camera.quaternion);
      vR.set(1, 0, 0).applyQuaternion(qB); vU.set(0, 1, 0).applyQuaternion(qB); vF.set(0, 0, -1).applyQuaternion(qB);
      const D = cam.r, hh = D * Math.tan((camera.fov * Math.PI) / 360), hw = hh * (W / H || 1);
      const e = HO.eye;
      for (let k = 0; k < 3; k++) e[k] += (eyeT[k] - e[k]) * (HO.src === "face" ? 0.35 : 0.2);
      const x = e[0] * hh, y = e[1] * hh, z = D * e[2], n = camera.near, f = camera.far;
      camera.position.copy(cam.t).addScaledVector(vR, x).addScaledVector(vU, y).addScaledVector(vF, -z);
      camera.quaternion.copy(qB); camera.updateMatrixWorld();
      camera.projectionMatrix.makePerspective((-hw - x) * n / z, (hw - x) * n / z, (hh - y) * n / z, (-hh - y) * n / z, n, f);
      camera.projectionMatrixInverse.copy(camera.projectionMatrix).invert();
      if (HO.roomKey !== hw.toFixed(3) + hh.toFixed(3)) { HO.roomKey = hw.toFixed(3) + hh.toFixed(3); sizeRoom(hw, hh, D * 0.85); }
      room.position.copy(cam.t); room.quaternion.copy(qB);
    }
    function holoLoop() {
      if (!HO.on) return;
      if (HO.src === "face") faceStep();
      holoView();
      if (HO.look === "holo") holoSwap();
      try { renderer.render(scene, camera); } finally { holoUnswap(); }
      HO.raf = requestAnimationFrame(holoLoop);
    }

    /* ---- Göz kaynakları ---- */
    let picoP = null;
    function loadPico() {
      if (window.pico && window.PICO_FACEFINDER && window.__picoCls) return Promise.resolve(window.__picoCls);
      if (!picoP) picoP = new Promise((res, rej) => {
        const add = (src) => new Promise((ok, no) => { const sc = document.createElement("script"); sc.src = src; sc.async = true; sc.onload = ok; sc.onerror = () => no(new Error(src)); document.head.appendChild(sc); });
        Promise.all([window.pico ? null : add("assets/vendor/pico/pico.js"), window.PICO_FACEFINDER ? null : add("assets/vendor/pico/facefinder.js")]).then(() => {
          const bin = atob(window.PICO_FACEFINDER), bytes = new Int8Array(bin.length);
          for (let i = 0; i < bin.length; i++) bytes[i] = bin.charCodeAt(i) << 24 >> 24;
          window.__picoCls = window.pico.unpack_cascade(bytes); res(window.__picoCls);
        }).catch((e) => { picoP = null; rej(e); });
      });
      return picoP;
    }
    /* Ön kamera hologram (yüz) ve el kontrolü arasında paylaşılır: telefonlar aynı kamerayı iki kez açamaz */
    const FC = { n: 0, p: null, stream: null, video: null };
    function camAcquire() {
      FC.n++;
      if (FC.p) return FC.p;
      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) { FC.n--; return Promise.reject(new Error("no-camera")); }
      FC.p = navigator.mediaDevices.getUserMedia({ video: { facingMode: "user", width: { ideal: 640 }, height: { ideal: 480 } }, audio: false }).then(async (stream) => {
        const video = document.createElement("video"); video.setAttribute("playsinline", ""); video.muted = true; video.srcObject = stream;
        try { await video.play(); } catch (e) { /* kendisi oynatır */ }
        FC.stream = stream; FC.video = video;
        if (FC.n <= 0) { camStopAll(); throw new Error("released"); }
        return FC;
      }).catch((e) => { FC.p = null; FC.n = Math.max(0, FC.n - 1); throw e; });
      return FC.p;
    }
    function camStopAll() { try { if (FC.stream) FC.stream.getTracks().forEach((t) => t.stop()); } catch (e) { /* yok */ } FC.stream = null; FC.video = null; FC.p = null; FC.n = 0; }
    function camRelease() { if (FC.n <= 0) return; FC.n--; if (FC.n === 0 && FC.stream) camStopAll(); }
    async function faceOn() {
      const [cls, cam0] = await Promise.all([loadPico(), camAcquire()]);
      if (!HO.on) { camRelease(); return; }
      const cv = document.createElement("canvas"), cx = cv.getContext("2d", { willReadFrequently: true });
      HO.face = { video: cam0.video, cv, cx, cls, mem: window.pico.instantiate_detection_memory(4), last: 0, seen: 0, base: null, cal: [], gray: null, n: 0 };
    }
    function faceOff() { if (!HO.face) return; HO.face = null; camRelease(); }
    function faceStep() {
      const F = HO.face; if (!F) return;
      const v = F.video; if (!v || !v.videoWidth || v.readyState < 2) return;
      if (++F.n % 2) return;                          // her iki karede bir ara (telefonda akıcı kalsın)
      const w = 192, h = Math.round((w * v.videoHeight) / v.videoWidth);
      if (F.cv.width !== w || F.cv.height !== h) { F.cv.width = w; F.cv.height = h; F.gray = new Uint8Array(w * h); }
      F.cx.drawImage(v, 0, 0, w, h);
      const px = F.cx.getImageData(0, 0, w, h).data, g = F.gray;
      for (let i = 0, j = 0; j < g.length; i += 4, j++) g[j] = (2 * px[i] + 7 * px[i + 1] + px[i + 2]) / 10;
      let dets = window.pico.run_cascade({ pixels: g, nrows: h, ncols: w, ldim: w }, F.cls, { shiftfactor: 0.1, minsize: Math.round(w * 0.14), maxsize: w, scalefactor: 1.1 });
      dets = window.pico.cluster_detections(F.mem(dets), 0.2);
      let best = null; for (const d of dets) if (d[3] > 30 && (!best || d[2] > best[2])) best = d;
      const now = performance.now();
      if (!best) { if (now - F.last > 1500) { eyeT[0] *= 0.94; eyeT[1] *= 0.94; eyeT[2] += (1 - eyeT[2]) * 0.06; holoBadge(false); } return; }
      F.last = now; holoBadge(true);
      const fx = best[1] / w, fy = best[0] / h, fs = best[2] / w;
      if (!F.base) { F.cal.push([fx, fy, fs]); if (F.cal.length < 6) return; const m = (k) => F.cal.reduce((a, c) => a + c[k], 0) / F.cal.length; F.base = [m(0), m(1), m(2)]; F.cal = []; }
      // ön kamera görüntüsü aynalı değil: kişi sağa gidince yüz görüntüde sola kayar
      eyeT[0] = clampN(-(fx - F.base[0]) * 5.2 * (W > H ? 1.4 : 1), 2.6);
      eyeT[1] = clampN(-(fy - F.base[1]) * 4.2, 2.2);
      eyeT[2] = Math.max(0.6, Math.min(1.8, F.base[2] / fs));
    }
    const clampN = (v, m) => Math.max(-m, Math.min(m, v));
    function onHoloOrient(ev) {
      if (!HO.on || HO.src !== "tilt" || ev.beta == null || ev.gamma == null) return;
      const ang = ((screen.orientation && screen.orientation.angle) || window.orientation || 0) % 360;
      let gx = ev.gamma, by = ev.beta;
      if (ang === 90 || ang === -270) { gx = -ev.beta; by = ev.gamma; } else if (ang === 270 || ang === -90) { gx = ev.beta; by = -ev.gamma; } else if (ang === 180) { gx = -ev.gamma; by = -ev.beta; }
      if (!HO.tilt0) HO.tilt0 = [gx, by];
      HO.tiltSeen = true;
      const t = Math.tan((camera.fov * Math.PI) / 360), R = Math.PI / 180;
      eyeT[0] = clampN(-Math.tan(clampN(gx - HO.tilt0[0], 50) * R) / t * 0.9, 2.2);
      eyeT[1] = clampN(Math.tan(clampN(by - HO.tilt0[1], 50) * R) / t * 0.9, 2.2);
      eyeT[2] = 1;
    }
    function onHoloMouse(e) {
      if (!HO.on || HO.src !== "mouse" || e.pointerType === "touch" || pts.size) return;
      const a = W / H || 1;
      eyeT[0] = clampN(((e.clientX / window.innerWidth) - 0.5) * 2 * a * 1.1, 2.4);
      eyeT[1] = clampN(-((e.clientY / window.innerHeight) - 0.5) * 2 * 1.1, 2.2);
      eyeT[2] = 1;
    }
    const coarse = () => !!(window.matchMedia && matchMedia("(pointer: coarse)").matches);
    function holoHint() {
      const h = HO.ui && HO.ui.querySelector(".lab-ar__hint"); if (!h) return;
      h.textContent = HO.src === "face" ? arT("Başını yavaşça sağa sola, yukarı aşağı oynat: deney ekranın içinde derinlikte durur. Tek gözünü kapatınca etki artar.", "Move your head slowly: the lab sits deep inside the screen. Closing one eye makes it stronger.")
        : HO.src === "tilt" ? arT("Telefonu yavaşça eğ: perspektif kayar, deney ekranın içinde durur.", "Tilt your phone slowly: the perspective shifts.")
        : arT("Fareyi ekranda gezdir: perspektif kayar. Sürükle: döndür · tekerlek: büyüt · Esc: çık", "Move the mouse: the perspective shifts. Drag to rotate · scroll to scale · Esc to exit");
      const lk = HO.ui.querySelector('[data-holo="look"]'); if (lk) lk.textContent = HO.look === "real" ? arT("Renk: gerçek", "Colour: real") : arT("Renk: holo", "Colour: holo");
      const s = HO.ui.querySelector('[data-holo="src"]');
      if (s) s.textContent = HO.src === "face" ? arT("Kaynak: yüz", "Source: face") : HO.src === "tilt" ? arT("Kaynak: eğme", "Source: tilt") : arT("Kaynak: fare", "Source: mouse");
    }
    function holoBadge(on) { if (!HO.ui) return; HO.ui.classList.toggle("is-lock", !!on); }
    async function setSource(src) {
      if (src !== "face") faceOff();
      HO.src = src; HO.tilt0 = null; eyeT[0] = 0; eyeT[1] = 0; eyeT[2] = 1; holoBadge(false);
      if (src === "face") {
        try { await faceOn(); }
        catch (e) {
          if (!HO.on) return;
          HO.src = coarse() ? "tilt" : "mouse";
          App.ui.toast(e && e.name === "NotAllowedError" ? arT("Kamera izni verilmedi; hologram " + (HO.src === "tilt" ? "eğme" : "fare") + " ile çalışıyor.", "No camera permission; using " + HO.src + ".") : arT("Ön kamera açılamadı; hologram " + (HO.src === "tilt" ? "eğme" : "fare") + " ile çalışıyor.", "Front camera unavailable; using " + HO.src + "."));
        }
      }
      holoHint();
    }

    async function holoStart(o) {
      if (HO.on) return true;
      if (AR.on) arStop();
      o = o || {};
      try { if (coarse() && window.DeviceOrientationEvent && typeof DeviceOrientationEvent.requestPermission === "function") await DeviceOrientationEvent.requestPermission(); } catch (e) { /* izinsiz devam */ }
      if (!room) buildRoom();
      Object.assign(HO, { on: true, inline: !!o.inline, eye: [0, 0, 1], src: null, look: o.look || App.prefs.get("holoLook", "holo"), roomKey: "" });
      Object.assign(saved, { bg: scene.background, fog: scene.fog, floor: floor.visible, grid: grid.visible, rs: root.scale.x, rr: root.rotation.y, cam: { r: cam.r, th: cam.th, ph: cam.ph, t: cam.t.clone() }, parent: el.parentNode, next: el.nextSibling });
      scene.background = new THREE.Color(0x000000); scene.fog = null; floor.visible = false; grid.visible = false; room.visible = true;
      cam.ph = Math.max(cam.ph, 1.3);                 // pencereden bakar gibi: daha yatay bakış
      const fitR = () => saved.cam.r * Math.max(1, Math.min(2.2, 0.8 / ((window.innerWidth / window.innerHeight) || 1)));   // dik telefonda deney sığsın
      cam.r = o.inline ? saved.cam.r : fitR(); HO.fitR = o.inline ? () => saved.cam.r : fitR;
      if (o.inline) {
        // gömülü hologram (ör. sesli öğretmen): yerinde kalır, kendi düğme katmanı yoktur
        el.classList.add("is-holo", "is-inline"); el.classList.toggle("is-real", HO.look === "real");
        HO.ui = null; HO.side = null;
        window.addEventListener("deviceorientation", onHoloOrient); window.addEventListener("pointermove", onHoloMouse);
        HO.key = null; HO.nav = null; HO.resize = () => { W = 0; size(); }; window.addEventListener("resize", HO.resize);
        W = 0; size(); cancelAnimationFrame(raf); holoLoop();
        await setSource(o.src || "face");
        return true;
      }
      el.classList.add("is-ar", "is-holo"); document.body.appendChild(el); document.documentElement.classList.add("ar-open");
      const ui = document.createElement("div"); ui.className = "lab-ar lab-holo";
      ui.innerHTML = '<div class="lab-holo__fx" aria-hidden="true"></div><div class="lab-ar__top"><span class="lab-ar__badge lab-holo__badge">HOLO<i></i></span><span class="lab-ar__hint" aria-live="polite"></span><button type="button" class="lab-ar__btn" data-ar="exit" aria-label="' + arT("Hologramdan çık", "Exit hologram") + '">✕</button></div>' +
        '<div class="lab-ar__bot">' + (o.side ? '<button type="button" class="lab-ar__btn lab-ar__wide" data-ar="ctl">' + arT("Ayarlar", "Controls") + "</button>" : "") +
        (o.play ? '<button type="button" class="lab-ar__btn lab-ar__wide" data-ar="play">' + arT("Oynat / durdur", "Play / pause") + "</button>" : "") +
        '<button type="button" class="lab-ar__btn lab-ar__wide" data-ar="center">' + arT("Ortala", "Recenter") + "</button>" +
        '<button type="button" class="lab-ar__btn lab-ar__wide" data-holo="src"></button>' +
        '<button type="button" class="lab-ar__btn lab-ar__wide" data-holo="look">' + arT("Renk", "Colour") + '</button></div><div class="lab-ar__sheet" hidden></div>';
      el.appendChild(ui); HO.ui = ui; HO.side = o.side || null; HO.sideHome = o.side ? { parent: o.side.parentNode, next: o.side.nextSibling } : null;
      ui.addEventListener("click", (e) => {
        const b = e.target.closest("[data-ar],[data-holo]"); if (!b) return;
        const k = b.dataset.ar || b.dataset.holo;
        if (k === "exit") holoStop();
        else if (k === "play" && o.play) { const pb = o.play.querySelector('[data-lab="play"]'); if (pb) pb.click(); }
        else if (k === "center") { root.rotation.y = saved.rr; root.scale.setScalar(saved.rs); cam.r = HO.fitR(); cam.th = saved.cam.th; cam.ph = Math.max(saved.cam.ph, 1.3); cam.t.copy(saved.cam.t); HO.tilt0 = null; if (HO.face) { HO.face.base = null; HO.face.cal = []; } }
        else if (k === "ctl" && HO.side) { const sh = ui.querySelector(".lab-ar__sheet"); if (sh.hidden) { sh.appendChild(HO.side); sh.hidden = false; } else sh.hidden = true; }
        else if (k === "src") { const list = ["face"].concat(coarse() ? ["tilt"] : ["mouse"]); setSource(list[(list.indexOf(HO.src) + 1) % list.length]); }
        else if (k === "look") { HO.look = HO.look === "holo" ? "real" : "holo"; App.prefs.set("holoLook", HO.look); el.classList.toggle("is-real", HO.look === "real"); holoHint(); }
      });
      el.classList.toggle("is-real", HO.look === "real");
      HO.key = (e) => { if (e.key === "Escape") holoStop(); };
      document.addEventListener("keydown", HO.key);
      HO.nav = () => holoStop();
      window.addEventListener("hashchange", HO.nav);
      window.addEventListener("deviceorientation", onHoloOrient);
      window.addEventListener("pointermove", onHoloMouse);
      HO.resize = () => { W = 0; size(); };
      window.addEventListener("resize", HO.resize);
      W = 0; size(); cancelAnimationFrame(raf); holoLoop();
      await setSource(o.src || "face");
      return true;
    }
    function holoStop() {
      if (!HO.on) return;
      HO.on = false; cancelAnimationFrame(HO.raf); faceOff();
      window.removeEventListener("deviceorientation", onHoloOrient); window.removeEventListener("pointermove", onHoloMouse); window.removeEventListener("resize", HO.resize);
      if (HO.key) document.removeEventListener("keydown", HO.key);
      if (HO.nav) window.removeEventListener("hashchange", HO.nav);
      if (HO.side && HO.sideHome && HO.sideHome.parent) HO.sideHome.parent.insertBefore(HO.side, HO.sideHome.next && HO.sideHome.next.parentNode === HO.sideHome.parent ? HO.sideHome.next : null);
      if (HO.ui) HO.ui.remove();
      if (room) room.visible = false;
      scene.background = saved.bg; scene.fog = saved.fog; floor.visible = saved.floor; grid.visible = saved.grid;
      root.scale.setScalar(saved.rs); root.rotation.y = saved.rr;
      cam.r = saved.cam.r; cam.th = saved.cam.th; cam.ph = saved.cam.ph; cam.t.copy(saved.cam.t); place();
      const wasInline = HO.inline;
      el.classList.remove("is-ar", "is-holo", "is-real", "is-gyro", "is-inline");
      if (!wasInline) {
        document.documentElement.classList.remove("ar-open");
        if (saved.parent && saved.parent.isConnected) saved.parent.insertBefore(el, saved.next && saved.next.parentNode === saved.parent ? saved.next : saved.parent.firstChild); else el.remove();
      }
      Object.assign(HO, { ui: null, side: null, src: null, inline: false });
      W = 0; size(); camera.updateProjectionMatrix(); render();
      if (HO.onStop) HO.onStop();
    }

    /* =========================================================
       El ile kontrol (v1.26) — ön kamera + cihaz içi el bulucu (handtrack.js, TensorFlow.js)
         • açık el sağa-sola / yukarı-aşağı → sahneyi döndür
         • iki el açıp kapatma → büyüt / küçült
         • çimdik (başparmak + işaret) yukarı-aşağı → seçili ayarı (ör. açı, kütle) değiştir
         • işaret parmağı (bekle) → sıradaki ayar
         • yumruk (bekle) → oynat / durdur
       Görüntü cihazdan çıkmaz, kaydedilmez. Model yalnızca ilk açılışta yüklenir (~4 MB).
       ========================================================= */
    const HA = { on: false, lab: null, sel: 0, g: "none", vw: 640, vh: 480 };
    let htP = null;
    function loadHand() {
      if (window.__htModel) return Promise.resolve(window.__htModel);
      if (!htP) htP = new Promise((res, rej) => {
        const go = () => window.handTrack.load({ basePath: "assets/vendor/handtrack/", modelType: "ssd320fpnlite", modelSize: "small", flipHorizontal: true, maxNumBoxes: 4, iouThreshold: 0.3, scoreThreshold: 0.5 })
          .then((m) => { window.__htModel = m; res(m); }).catch((e) => { htP = null; rej(e); });
        if (window.handTrack) return go();
        const sc = document.createElement("script"); sc.src = "assets/vendor/handtrack/handtrack.min.js"; sc.async = true;
        sc.onload = () => (window.handTrack ? go() : (htP = null, rej(new Error("handTrack yok"))));
        sc.onerror = () => { htP = null; rej(new Error("El modeli yüklenemedi")); };
        document.head.appendChild(sc);
      });
      return htP;
    }
    const handBtn = document.createElement("button");
    handBtn.type = "button"; handBtn.className = "lab__handbtn"; handBtn.setAttribute("aria-pressed", "false");
    handBtn.title = arT("El ile kontrol: kameraya elini göster, havada döndür, çimdikle ayarı değiştir", "Hand control: show your hand to the camera");
    handBtn.innerHTML = '<span aria-hidden="true">✋</span><b>' + arT("El", "Hand") + "</b>";
    handBtn.hidden = !(navigator.mediaDevices && navigator.mediaDevices.getUserMedia);
    el.appendChild(handBtn);
    handBtn.addEventListener("click", (e) => { e.stopPropagation(); if (HA.on) handStop(); else handStart().catch((err) => App.ui.toast((err && err.message) || arT("El kontrolü açılamadı.", "Could not start hand control."), "error")); });

    const GL = { open: ["Açık el: döndür", "Open hand: rotate"], closed: ["Yumruk: oynat/durdur", "Fist: play/pause"], pinch: ["Çimdik: ayarı değiştir", "Pinch: change value"], pinchtip: ["Çimdik: ayarı değiştir", "Pinch: change value"],
      point: ["İşaret: sıradaki ayar", "Point: next control"], tip: ["İşaret: sıradaki ayar", "Point: next control"], two: ["İki el: büyüt/küçült", "Two hands: zoom"], none: ["Elini kameraya göster", "Show your hand"] };
    function sliders() { const c = HA.lab && HA.lab.ctrls; return c && c.isConnected !== false ? Array.from(c.querySelectorAll('input[type="range"]')) : []; }
    function sliderInfo(inp) {
      if (!inp) return "";
      const box = inp.closest(".lab-ctl"), lab = box && box.querySelector(".lab-ctl__top span"), out = box && box.querySelector("output");
      return (lab ? lab.textContent : "") + (out ? ": " + out.textContent : "");
    }
    function setSlider(inp, v) {
      const mn = Number(inp.min || 0), mx = Number(inp.max || 100), st = Number(inp.step) || 0;
      v = Math.max(mn, Math.min(mx, v)); if (st) v = mn + Math.round((v - mn) / st) * st;
      if (String(v) === inp.value) return;
      inp.value = String(v); inp.dispatchEvent(new Event("input", { bubbles: true })); inp.dispatchEvent(new Event("change", { bubbles: true }));
    }
    function handHud() {
      const H2 = HA.hud; if (!H2) return;
      const g = GL[HA.g] || GL.none, inp = sliders()[HA.sel];
      H2.querySelector(".lab-hand__g").textContent = arT(g[0], g[1]);
      H2.querySelector(".lab-hand__p").textContent = inp ? "◆ " + sliderInfo(inp) : "";
      H2.classList.toggle("is-seen", HA.g !== "none");
    }
    /** Bir karedeki el kutularını jestlere çevirir (testlerde doğrudan da çağrılır) */
    function handFeed(preds, now) {
      now = now || performance.now();
      const hands = (preds || []).filter((p) => p && p.label !== "face" && p.bbox && p.score >= 0.5).sort((a, b) => b.score - a.score).slice(0, 2);
      const vw = HA.vw || 1, vh = HA.vh || 1;
      const ctr = (p) => [(p.bbox[0] + p.bbox[2] / 2) / vw, (p.bbox[1] + p.bbox[3] / 2) / vh];
      let g = "none";
      if (hands.length === 2) {
        g = "two";
        const a = ctr(hands[0]), b = ctr(hands[1]), d = Math.hypot(a[0] - b[0], a[1] - b[1]);
        if (HA.g !== "two" || !HA.d0) { HA.d0 = d; HA.s0 = root.scale.x; }
        else root.scale.setScalar(Math.max(0.3, Math.min(3, HA.s0 * (d / HA.d0))));
      } else if (hands.length === 1) {
        const p = hands[0], c = ctr(p); g = p.label === "pinchtip" ? "pinch" : p.label === "tip" ? "point" : p.label;
        if (g !== HA.g) { HA.c0 = c; HA.since = now; HA.sm = c.slice(); const inp = sliders()[HA.sel]; HA.v0 = inp ? Number(inp.value) : 0; }
        HA.sm = [HA.sm[0] + (c[0] - HA.sm[0]) * 0.5, HA.sm[1] + (c[1] - HA.sm[1]) * 0.5];
        if (g === "open") {
          const dx = HA.sm[0] - (HA.last ? HA.last[0] : HA.sm[0]), dy = HA.sm[1] - (HA.last ? HA.last[1] : HA.sm[1]);
          if (g === HA.g) { root.rotation.y += dx * 4.2; cam.ph = Math.max(0.3, Math.min(1.5, cam.ph - dy * 1.6)); if (!AR.on && !HO.on) place(); }
        } else if (g === "pinch") {
          const inp = sliders()[HA.sel];
          if (inp && g === HA.g) { const mn = Number(inp.min || 0), mx = Number(inp.max || 100); setSlider(inp, HA.v0 + (HA.c0[1] - HA.sm[1]) * (mx - mn) * 1.8); }
        } else if (g === "closed") {
          if (g === HA.g && now - HA.since > 600 && now - (HA.firedC || 0) > 1500) { HA.firedC = now; const pb = HA.lab && HA.lab.play && HA.lab.play.querySelector('[data-lab="play"]'); if (pb) pb.click(); }
        } else if (g === "point") {
          if (g === HA.g && now - HA.since > 700 && now - (HA.firedP || 0) > 1200) { HA.firedP = now; const n = sliders().length; if (n) HA.sel = (HA.sel + 1) % n; }
        }
        HA.last = HA.sm.slice();
      }
      if (g !== "two") HA.d0 = 0;
      if (g === "none") HA.last = null;
      HA.g = g; HA.n = (HA.n || 0) + 1;
      handHud();
      if (!AR.on && !HO.on) render();
      return g;
    }
    async function handLoop() {
      if (!HA.on) return;
      const v = HA.cam && HA.cam.video;
      if (v && v.videoWidth && v.readyState >= 2 && !HA.busy) {
        HA.busy = true;
        try {
          HA.vw = v.videoWidth; HA.vh = v.videoHeight;
          if (v.width !== HA.vw || v.height !== HA.vh) { v.width = HA.vw; v.height = HA.vh; }   // handtrack boyutu öğeden okur
          const preds = await HA.model.detect(v);
          if (!HA.on) return;
          HA.preds = preds; handFeed(preds); drawPreview(preds);
        } catch (e) { /* tek kare kaçabilir */ }
        HA.busy = false;
      }
      HA.t = setTimeout(handLoop, 70);
    }
    function drawPreview(preds) {
      const c = HA.hud && HA.hud.querySelector("canvas"), v = HA.cam && HA.cam.video; if (!c || !v) return;
      const x = c.getContext("2d"); c.width = 128; c.height = Math.round(128 * (v.videoHeight / v.videoWidth)) || 96;
      x.save(); x.translate(c.width, 0); x.scale(-1, 1); x.drawImage(v, 0, 0, c.width, c.height); x.restore();     // ayna görüntü: elini nasıl görüyorsan öyle
      const k = c.width / (HA.vw || 1);
      (preds || []).forEach((p) => { if (p.label === "face") return; x.strokeStyle = p.label === "closed" ? "#ff6b6b" : p.label.indexOf("pinch") === 0 ? "#ffc14d" : "#35e0ff"; x.lineWidth = 2; x.strokeRect(p.bbox[0] * k, p.bbox[1] * k, p.bbox[2] * k, p.bbox[3] * k); });
    }
    async function handStart() {
      if (HA.on) return true;
      if (AR.on) arStop();                            // AR arka kamerayı kullanır; ikisi aynı anda açılamaz
      HA.on = true; HA.sel = 0; HA.g = "none"; HA.n = 0;
      handBtn.classList.add("is-on", "is-loading"); handBtn.setAttribute("aria-pressed", "true");
      const hud = document.createElement("div"); hud.className = "lab-hand"; hud.setAttribute("aria-live", "polite");
      hud.innerHTML = '<canvas width="128" height="96" aria-hidden="true"></canvas><div><b class="lab-hand__g">' + arT("El modeli yükleniyor…", "Loading hand model…") + '</b><span class="lab-hand__p"></span><small>' +
        arT("Açık el: döndür · Çimdik: ayar · İşaret: sıradaki ayar · Yumruk: oynat · İki el: büyüt", "Open: rotate · Pinch: value · Point: next · Fist: play · Two hands: zoom") + "</small></div>";
      el.appendChild(hud); HA.hud = hud;
      try {
        const model = await loadHand();
        if (!HA.on) return false;
        const c = await camAcquire();
        if (!HA.on) { camRelease(); return false; }
        HA.model = model; HA.cam = c;
      } catch (e) {
        const wasOn = HA.on; handStop();
        if (!wasOn) return false;
        throw new Error(e && e.name === "NotAllowedError" ? arT("Kamera izni verilmedi.", "Camera permission denied.") : (e && e.message === "no-camera") ? arT("Bu cihazda kamera yok.", "No camera on this device.") : arT("El kontrolü açılamadı.", "Could not start hand control."));
      }
      handBtn.classList.remove("is-loading"); handHud(); handLoop();
      return true;
    }
    function handStop(noRelease) {
      if (!HA.on && !HA.hud) return;
      const had = !!HA.cam;
      HA.on = false; clearTimeout(HA.t); HA.busy = false;
      if (HA.hud) HA.hud.remove(); HA.hud = null;
      if (had && noRelease !== true) camRelease();
      HA.cam = null; HA.g = "none";
      handBtn.classList.remove("is-on", "is-loading"); handBtn.setAttribute("aria-pressed", "false");
    }

    place();
    try { D.build(S); } catch (e) { console.error("[3B] kurulum", id, e); }
    size();
    return {
      el,
      frame(p, t, s) { try { D.update(S, p, t, s || {}); } catch (e) { console.error("[3B] güncelleme", id, e); } if (!AR.on && !HO.on) render(); },
      dispose() { arStop(); holoStop(); handStop(); holoMats.forEach((m) => { if (m) m.dispose(); }); holoMats.clear(); cancelAnimationFrame(raf); ro.disconnect(); clear(scene); renderer.dispose(); try { renderer.forceContextLoss(); } catch (e) { /* yok */ } el.remove(); },
      resize: size,
      arStart, arStop, arOn: () => AR.on, onArStop: (fn) => { AR.onStop = fn; },
      bindLab(o) { HA.lab = o || null; },
      handStart, handStop, handOn: () => HA.on, handState: () => ({ on: HA.on, g: HA.g, n: HA.n || 0, sel: HA.sel, rotY: root.rotation.y, scale: root.scale.x, cam: !!HA.cam }), _handFeed: handFeed, _handVideo: () => HA.cam && HA.cam.video,
      holoStart, holoStop, holoOn: () => HO.on, holoState: () => ({ on: HO.on, src: HO.src, face: !!HO.face, eye: HO.eye ? HO.eye.slice() : null, look: HO.look })
    };
  }

  /** AR düğmesi gösterilsin mi: kamera arayüzü var ve güvenli bağlam (https, uygulama, localhost) */
  const arSupported = () => !!(navigator.mediaDevices && navigator.mediaDevices.getUserMedia) && (window.isSecureContext !== false);
  App.lab3d = { def, has, load, mount, supported, mode, setMode, quality, arSupported, DEFS };
})();
