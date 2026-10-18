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
      if (AR.on && AR.gyro) {                         // AR: yön telefondan gelir; tek parmak sahneyi döndürür, iki parmak büyütür
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
    cvs.addEventListener("wheel", (e) => { e.preventDefault(); if (AR.on && AR.gyro) { root.scale.setScalar(Math.max(0.15, Math.min(4, root.scale.x * (1 - Math.sign(e.deltaY) * 0.1)))); render(); return; } cam.r = Math.max(2, Math.min(80, cam.r * (1 + Math.sign(e.deltaY) * 0.1))); place(); render(); }, { passive: false });

    /* ---- Boyut ---- */
    let W = 0, H = 0;
    function size() {
      const w = AR.on ? window.innerWidth : Math.max(240, Math.round(host.clientWidth)), h = AR.on ? window.innerHeight : Math.round(Math.min(w * (ratio || 0.62), window.innerHeight * 0.62));
      if (w === W && h === H) return;
      W = w; H = h; renderer.setSize(w, h); camera.aspect = w / h; camera.updateProjectionMatrix(); render();
    }
    const ro = new ResizeObserver(size); ro.observe(host);
    const AR = { on: false };

    let raf = 0;
    function render() { if (!W) return; cancelAnimationFrame(raf); raf = requestAnimationFrame(() => renderer.render(scene, camera)); }

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

    place();
    try { D.build(S); } catch (e) { console.error("[3B] kurulum", id, e); }
    size();
    return {
      el,
      frame(p, t, s) { try { D.update(S, p, t, s || {}); } catch (e) { console.error("[3B] güncelleme", id, e); } if (!AR.on) render(); },
      dispose() { arStop(); cancelAnimationFrame(raf); ro.disconnect(); clear(scene); renderer.dispose(); try { renderer.forceContextLoss(); } catch (e) { /* yok */ } el.remove(); },
      resize: size,
      arStart, arStop, arOn: () => AR.on, onArStop: (fn) => { AR.onStop = fn; }
    };
  }

  /** AR düğmesi gösterilsin mi: kamera arayüzü var ve güvenli bağlam (https, uygulama, localhost) */
  const arSupported = () => !!(navigator.mediaDevices && navigator.mediaDevices.getUserMedia) && (window.isSecureContext !== false);
  App.lab3d = { def, has, load, mount, supported, mode, setMode, quality, arSupported, DEFS };
})();
