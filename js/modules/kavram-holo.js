/* =========================================================
   kavram-holo.js — Konuşan Kavram Hologramı: 3B holografik çizim (Modül 3, v1.33)

   Kavramın kendisi holografik bir figür olarak görünür (gezegen, yıldız, atom, DNA sarmalı,
   mitokondri, kalp, yaprak, foton dalgası, su molekülü, mıknatıs; diğerleri için ışık küresi).
     • Hologram görünüşü: kenarda parlayan (fresnel), toplamalı karışımlı, tarama çizgili
       gölgelendirici; saydam arka plan, ışık konili projeksiyon tabanı, süzülen parçacıklar.
     • Tepki: ses düzeyiyle (0..1) figür nabız gibi büyür, parlar; tabandaki halka sesin
       son anlarını dalga gibi çizer. Dinlerken mikrofon düzeyi, düşünürken hızlanan parçacıklar.
     • Derinlik: imleç ya da telefon eğimiyle hafif paralaks.
     • Piramit (Pepper's ghost): siyah ekranda dört görünüm (ön, sağ, arka, sol). Yansıyan görüntü
       dik dursun diye her görünümün "yukarısı" merkezden dışa bakar ve görüntü yatay çevrilir
       (cam bir kez aynalar). Telefonun üstüne konan plastik piramitle gerçek hologram olur.
   Three.js lab3d.load() ile yüklenir; çizim yalnızca görünürken ve sekme öndeyken sürer.
   ========================================================= */
(function () {
  const HV = "varying vec3 vN; varying vec3 vV; varying float vY; void main(){ vec4 wp = modelMatrix * vec4(position,1.0); vY = wp.y; vN = normalize(normalMatrix * normal); vec4 mv = viewMatrix * wp; vV = normalize(-mv.xyz); gl_Position = projectionMatrix * mv; }";
  const HF = "uniform vec3 uColor; uniform float uTime; uniform float uLevel; uniform float uOpacity; varying vec3 vN; varying vec3 vV; varying float vY;" +
    "void main(){ float f = pow(1.0 - abs(dot(normalize(vN), normalize(vV))), 2.0); float scan = 0.82 + 0.18 * sin(vY * 42.0 - uTime * 5.0);" +
    " float a = (0.12 + f * 0.95 + uLevel * 0.3) * uOpacity * scan; gl_FragColor = vec4(uColor * (0.55 + f * 1.1 + uLevel * 0.6), a); }";
  const CONE_F = "uniform vec3 uColor; uniform float uLevel; varying float vY; void main(){ float k = clamp(1.0 - (vY + 1.65) / 3.2, 0.0, 1.0); gl_FragColor = vec4(uColor, k * k * (0.16 + uLevel * 0.12)); }";

  function create(host, concept, opts) {
    opts = opts || {};
    const THREE = window.THREE;
    const low = (navigator.hardwareConcurrency || 4) <= 4 && (navigator.deviceMemory || 4) <= 3;
    const gl = new THREE.WebGLRenderer({ antialias: !low, alpha: true, premultipliedAlpha: false, preserveDrawingBuffer: true, powerPreference: "default" });
    gl.setClearColor(0x000000, 0);
    gl.setPixelRatio(Math.min(window.devicePixelRatio || 1, low ? 1 : 1.75));
    const view = gl.domElement; view.className = "kh__gl";
    const pyr = document.createElement("canvas"); pyr.className = "kh__pyr"; pyr.hidden = true;
    host.appendChild(view); host.appendChild(pyr);
    const scene = new THREE.Scene(), camera = new THREE.PerspectiveCamera(35, 1, 0.1, 100);
    const color = new THREE.Color(concept.renk || 0x5fe6ff);
    const mats = [], geos = [], disposeList = [];
    const U = { uTime: { value: 0 }, uLevel: { value: 0 } };
    function holo(c, op) {
      const m = new THREE.ShaderMaterial({ uniforms: { uColor: { value: new THREE.Color(c == null ? color : c) }, uTime: U.uTime, uLevel: U.uLevel, uOpacity: { value: op == null ? 1 : op } },
        vertexShader: HV, fragmentShader: HF, transparent: true, depthWrite: false, blending: THREE.AdditiveBlending, side: THREE.DoubleSide });
      mats.push(m); return m;
    }
    const lineM = (c, op) => { const m = new THREE.LineBasicMaterial({ color: c == null ? color : c, transparent: true, opacity: op == null ? 0.35 : op, blending: THREE.AdditiveBlending, depthWrite: false }); mats.push(m); return m; };
    const G = (g) => { geos.push(g); return g; };
    const mesh = (g, m, parent) => { const x = new THREE.Mesh(G(g), m || holo()); (parent || fig).add(x); return x; };
    const wire = (g, parent, op) => { const x = new THREE.LineSegments(G(new THREE.WireframeGeometry(g)), lineM(null, op == null ? 0.12 : op)); geos.push(g); (parent || fig).add(x); return x; };

    /* ---- sahne: figür, taban, ışık konisi, parçacıklar, ses halkası ---- */
    const root = new THREE.Group(); scene.add(root);
    const fig = new THREE.Group(); root.add(fig);
    const anim = [];                                               // figüre özgü canlandırmalar: (t, lvl) => {}
    build(concept.tur || "orb");
    const base = new THREE.Group(); root.add(base); base.position.y = -1.65;
    const disc = new THREE.Mesh(G(new THREE.CylinderGeometry(1.25, 1.4, 0.08, 64, 1, true)), holo(null, 0.7)); base.add(disc);
    const baseRing = new THREE.LineLoop(G(circle(1.32, 96)), lineM(null, 0.8)); baseRing.rotation.x = Math.PI / 2; base.add(baseRing);
    const coneM = new THREE.ShaderMaterial({ uniforms: { uColor: { value: color }, uLevel: U.uLevel }, vertexShader: "varying float vY; void main(){ vec4 wp = modelMatrix * vec4(position,1.0); vY = wp.y; gl_Position = projectionMatrix * viewMatrix * wp; }", fragmentShader: CONE_F, transparent: true, depthWrite: false, blending: THREE.AdditiveBlending, side: THREE.DoubleSide });
    mats.push(coneM);
    const cone = new THREE.Mesh(G(new THREE.CylinderGeometry(1.15, 1.3, 3.2, 48, 1, true)), coneM); cone.position.y = 1.6; base.add(cone);
    // ses halkası: son ~1,5 sn'nin düzeyleri çevre boyunca dalga
    const RN = 128, hist = new Float32Array(RN), ringGeo = G(new THREE.BufferGeometry()), ringPos = new Float32Array(RN * 3);
    ringGeo.setAttribute("position", new THREE.BufferAttribute(ringPos, 3));
    const voiceRing = new THREE.LineLoop(ringGeo, lineM(0xffffff, 0.75)); voiceRing.position.y = 0.06; base.add(voiceRing);
    // parçacıklar
    const PN = low ? 90 : 220, pGeo = G(new THREE.BufferGeometry()), pPos = new Float32Array(PN * 3), pSeed = new Float32Array(PN * 3);
    for (let i = 0; i < PN; i++) { pSeed[3 * i] = Math.random() * Math.PI * 2; pSeed[3 * i + 1] = Math.random(); pSeed[3 * i + 2] = 1.3 + Math.random() * 0.9; }
    pGeo.setAttribute("position", new THREE.BufferAttribute(pPos, 3));
    const pMat = new THREE.PointsMaterial({ color, size: 0.035, transparent: true, opacity: 0.8, blending: THREE.AdditiveBlending, depthWrite: false }); mats.push(pMat);
    root.add(new THREE.Points(pGeo, pMat));

    function circle(r, n) { const g = new THREE.BufferGeometry(), a = new Float32Array(n * 3); for (let i = 0; i < n; i++) { const t = (i / n) * Math.PI * 2; a[3 * i] = Math.cos(t) * r; a[3 * i + 1] = Math.sin(t) * r; } g.setAttribute("position", new THREE.BufferAttribute(a, 3)); return g; }
    function build(tur) {
      const c2 = color.clone().offsetHSL(0.08, 0, 0.1), c3 = color.clone().offsetHSL(-0.1, 0, 0.05);
      if (tur === "gezegen") {
        const s = mesh(new THREE.SphereGeometry(1.15, 48, 32)); wire(new THREE.SphereGeometry(1.16, 24, 12), s, 0.1);
        for (let k = -2; k <= 2; k++) { const y = k * 0.38, r = Math.sqrt(1.17 * 1.17 - y * y), l = new THREE.LineLoop(G(circle(r, 80)), lineM(c2, 0.4)); l.rotation.x = Math.PI / 2; l.position.y = y; s.add(l); }
        mesh(new THREE.SphereGeometry(1.32, 40, 24), holo(color, 0.25));
        anim.push((t) => { s.rotation.y = t * 0.25; });
      } else if (tur === "yildiz") {
        const s = mesh(new THREE.SphereGeometry(1.0, 48, 32)), co = mesh(new THREE.SphereGeometry(1.25, 40, 24), holo(c2, 0.45));
        const rays = new THREE.Group(); fig.add(rays);
        for (let i = 0; i < 18; i++) { const g = G(new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(0, 0, 0), new THREE.Vector3(0, 1, 0)])), l = new THREE.Line(g, lineM(c2, 0.5)); l.rotation.set(Math.random() * 6.3, Math.random() * 6.3, Math.random() * 6.3); l.position.set(0, 0, 0); l.scale.setScalar(1.6); rays.add(l); }
        anim.push((t, lvl) => { s.rotation.y = t * 0.12; co.scale.setScalar(1 + 0.06 * Math.sin(t * 2) + lvl * 0.15); rays.rotation.y = -t * 0.08; rays.children.forEach((l, i) => l.scale.setScalar(1.45 + 0.25 * Math.sin(t * 3 + i) + lvl * 0.5)); });
      } else if (tur === "atom") {
        const nuc = new THREE.Group(); fig.add(nuc);
        [[0.18, 0, 0], [-0.18, 0, 0], [0, 0.18, 0], [0, -0.18, 0], [0, 0, 0.18], [0, 0, -0.18]].forEach((p, i) => { mesh(new THREE.SphereGeometry(0.2, 20, 14), holo(i % 2 ? c2 : c3), nuc).position.set(...p); });
        const orbits = [];
        for (let k = 0; k < 3; k++) {
          const o = new THREE.Group(); o.rotation.set(k * 1.05, k * 0.6, 0); fig.add(o);
          const l = new THREE.LineLoop(G(circle(1.35, 96)), lineM(null, 0.55)); l.scale.y = 0.42; o.add(l);
          const e = mesh(new THREE.SphereGeometry(0.09, 14, 10), holo(0xffffff), o); orbits.push([e, k]);
        }
        anim.push((t, lvl) => { nuc.rotation.set(t * 0.7, t * 0.5, 0); nuc.scale.setScalar(1 + lvl * 0.25); orbits.forEach(([e, k]) => { const a = t * (1.6 + k * 0.4) * (1 + lvl) + k * 2; e.position.set(Math.cos(a) * 1.35, Math.sin(a) * 1.35 * 0.42, 0); }); });
      } else if (tur === "sarmal") {
        const h = new THREE.Group(); fig.add(h);
        const N = 22, mA = holo(color), mB = holo(c2), mR = holo(c3, 0.6);
        for (let i = 0; i < N; i++) {
          const y = -1.4 + (i / (N - 1)) * 2.8, a = i * 0.55, p1 = new THREE.Vector3(Math.cos(a) * 0.6, y, Math.sin(a) * 0.6), p2 = new THREE.Vector3(-Math.cos(a) * 0.6, y, -Math.sin(a) * 0.6);
          mesh(new THREE.SphereGeometry(0.085, 12, 8), mA, h).position.copy(p1); mesh(new THREE.SphereGeometry(0.085, 12, 8), mB, h).position.copy(p2);
          const r = mesh(new THREE.CylinderGeometry(0.025, 0.025, 1.2, 6), mR, h); r.position.set(0, y, 0); r.rotation.z = Math.PI / 2; r.rotation.y = -a;
        }
        anim.push((t) => { h.rotation.y = t * 0.45; });
      } else if (tur === "organel") {
        const o = new THREE.Group(); o.rotation.z = 0.35; fig.add(o);
        const outer = mesh(new THREE.CapsuleGeometry(0.62, 1.5, 12, 32), holo(color, 0.75), o); outer.rotation.z = Math.PI / 2;
        const pts = []; for (let i = 0; i <= 14; i++) pts.push(new THREE.Vector3(-1.05 + i * 0.15, i % 2 ? 0.38 : -0.38, 0));
        mesh(new THREE.TubeGeometry(new THREE.CatmullRomCurve3(pts), 120, 0.045, 8), holo(c2), o);       // krista kıvrımları
        const atp = []; for (let i = 0; i < 8; i++) { const s = mesh(new THREE.SphereGeometry(0.06, 10, 8), holo(0xfff3a0), o); atp.push(s); }
        anim.push((t, lvl) => { o.rotation.y = Math.sin(t * 0.4) * 0.6; atp.forEach((s, i) => { const k = ((t * 0.25 + i / atp.length) % 1); s.position.set(-0.9 + k * 1.8, Math.sin(k * 9 + i) * 0.2, 0.7 + k * 0.6 * (1 + lvl)); s.scale.setScalar(1 - k * 0.6); }); });
      } else if (tur === "kalp") {
        const sh = new THREE.Shape(); sh.moveTo(0, -0.9); sh.bezierCurveTo(-1.6, 0.1, -0.9, 1.25, 0, 0.55); sh.bezierCurveTo(0.9, 1.25, 1.6, 0.1, 0, -0.9);
        const g = new THREE.ExtrudeGeometry(sh, { depth: 0.5, bevelEnabled: true, bevelSize: 0.18, bevelThickness: 0.2, bevelSegments: 6, curveSegments: 32 }); g.center();
        const hm = mesh(g); wire(g.clone(), hm, 0.06);
        anim.push((t, lvl) => { const beat = Math.pow(Math.max(0, Math.sin(t * 7.3)), 6) * 0.08 + Math.pow(Math.max(0, Math.sin(t * 7.3 - 0.9)), 8) * 0.05; hm.scale.setScalar(1 + beat + lvl * 0.1); hm.rotation.y = Math.sin(t * 0.5) * 0.5; });
      } else if (tur === "yaprak") {
        const sh = new THREE.Shape(); sh.moveTo(0, -1.3); sh.quadraticCurveTo(1.1, -0.2, 0, 1.3); sh.quadraticCurveTo(-1.1, -0.2, 0, -1.3);
        const leaf = mesh(new THREE.ShapeGeometry(sh, 32), holo(color, 0.9));
        const vein = [new THREE.Vector3(0, -1.3, 0.01), new THREE.Vector3(0, 1.25, 0.01)]; for (let k = -3; k <= 3; k++) if (k) vein.push(new THREE.Vector3(0, k * 0.3, 0.01), new THREE.Vector3(Math.sign(k) * 0.45, k * 0.3 + 0.28, 0.01));
        leaf.add(new THREE.LineSegments(G(new THREE.BufferGeometry().setFromPoints(vein)), lineM(c2, 0.7)));
        const bub = []; for (let i = 0; i < 10; i++) bub.push(mesh(new THREE.SphereGeometry(0.05, 10, 8), holo(i % 2 ? 0xfff27a : 0xffffff)));
        anim.push((t, lvl) => { leaf.rotation.y = Math.sin(t * 0.6) * 0.7; bub.forEach((b, i) => { const k = (t * 0.2 + i / bub.length) % 1; if (i % 2) b.position.set(1.8 - k * 1.8, 1.8 - k * 1.8, 0.2); else b.position.set(Math.sin(i * 3) * 0.6, -0.4 + k * 2.3 * (1 + lvl * 0.5), 0.3); b.scale.setScalar(1 - k * 0.4); }); });
      } else if (tur === "dalga") {
        const N = 160, g = G(new THREE.BufferGeometry()), a = new Float32Array(N * 3); g.setAttribute("position", new THREE.BufferAttribute(a, 3));
        const wave = new THREE.Line(g, lineM(0xffffff, 0.9)); fig.add(wave);
        const pk = mesh(new THREE.SphereGeometry(0.22, 24, 16)), glow = mesh(new THREE.SphereGeometry(0.42, 24, 16), holo(color, 0.35));
        anim.push((t, lvl) => { const x0 = ((t * 0.9) % 4) - 2; for (let i = 0; i < N; i++) { const x = -2 + (i / (N - 1)) * 4, env = Math.exp(-Math.pow((x - x0) * 1.6, 2)); a[3 * i] = x; a[3 * i + 1] = Math.sin(x * 9 - t * 12) * 0.55 * env * (1 + lvl * 0.6); a[3 * i + 2] = 0; } g.attributes.position.needsUpdate = true; pk.position.set(x0, 0, 0); glow.position.set(x0, 0, 0); glow.scale.setScalar(1 + lvl * 0.4); });
      } else if (tur === "molekul") {
        const m = new THREE.Group(); fig.add(m);
        const O = mesh(new THREE.SphereGeometry(0.62, 32, 24), holo(0xff6b6b), m), a = 104.5 * Math.PI / 180;
        [-a / 2, a / 2].forEach((ang) => {
          const d = new THREE.Vector3(Math.sin(ang), -Math.cos(ang), 0), H = mesh(new THREE.SphereGeometry(0.38, 28, 20), holo(0xeaf6ff), m); H.position.copy(d.clone().multiplyScalar(1.05));
          const b = mesh(new THREE.CylinderGeometry(0.07, 0.07, 0.6, 10), holo(color, 0.7), m); b.position.copy(d.clone().multiplyScalar(0.62)); b.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), d);
        });
        m.position.y = 0.3; anim.push((t, lvl) => { m.rotation.y = t * 0.5; O.scale.setScalar(1 + lvl * 0.12); });
      } else if (tur === "miknatis") {
        const mg = new THREE.Group(); fig.add(mg);
        mesh(new THREE.BoxGeometry(1.1, 0.5, 0.5), holo(0xff5a5a), mg).position.x = 0.55; mesh(new THREE.BoxGeometry(1.1, 0.5, 0.5), holo(0x5a8cff), mg).position.x = -0.55;
        const lines = [];
        for (let k = 1; k <= 4; k++) for (const s of [1, -1]) {
          const pts = []; for (let i = 0; i <= 40; i++) { const th = (i / 40) * Math.PI; pts.push(new THREE.Vector3(Math.cos(th) * (1.1 + k * 0.05), s * Math.sin(th) * k * 0.32, 0)); }
          const l = new THREE.Line(G(new THREE.BufferGeometry().setFromPoints(pts)), new THREE.LineDashedMaterial({ color, dashSize: 0.08, gapSize: 0.06, transparent: true, opacity: 0.7, blending: THREE.AdditiveBlending, depthWrite: false }));
          mats.push(l.material); l.computeLineDistances(); mg.add(l); lines.push(l);
        }
        anim.push((t, lvl) => { mg.rotation.y = Math.sin(t * 0.5) * 0.8; lines.forEach((l) => { l.material.dashSize = 0.08 + lvl * 0.06; l.material.gapSize = 0.06 + 0.04 * Math.sin(t * 4); }); });
      } else {                                                      // ışık küresi (genel kavram)
        const core = mesh(new THREE.IcosahedronGeometry(0.95, 3)), shell = new THREE.LineSegments(G(new THREE.EdgesGeometry(new THREE.IcosahedronGeometry(1.3, 1))), lineM(null, 0.45)); fig.add(shell);
        const inner = mesh(new THREE.IcosahedronGeometry(0.45, 2), holo(0xffffff, 0.6));
        anim.push((t, lvl) => { core.rotation.y = t * 0.3; shell.rotation.set(t * 0.12, -t * 0.2, 0); inner.scale.setScalar(1 + lvl * 0.6 + 0.08 * Math.sin(t * 3)); });
      }
    }

    /* ---- durum ---- */
    const st = { level: 0, target: 0, mic: 0, phase: "idle", mode: opts.mode || "window", on: true, raf: 0, t0: performance.now(), px: 0, py: 0, W: 0, H: 0, vis: true };
    function size() {
      const W = Math.max(120, host.clientWidth), H = Math.max(120, host.clientHeight);
      if (W === st.W && H === st.H) return; st.W = W; st.H = H;
      if (st.mode === "pyramid") {
        const dpr = Math.min(window.devicePixelRatio || 1, 2), s = Math.min(W, H), v = Math.round(s / 3);
        pyr.width = Math.round(W * dpr); pyr.height = Math.round(H * dpr); pyr.style.width = W + "px"; pyr.style.height = H + "px";
        gl.setSize(v, v, false); camera.aspect = 1;
      } else { gl.setSize(W, H); camera.aspect = W / H; }
      camera.updateProjectionMatrix();
    }
    const onMove = (e) => { const r = host.getBoundingClientRect(); st.px = ((e.clientX - r.left) / r.width - 0.5) * 2; st.py = ((e.clientY - r.top) / r.height - 0.5) * 2; };
    const onTilt = (e) => { if (e.gamma == null) return; st.px = Math.max(-1, Math.min(1, e.gamma / 30)); st.py = Math.max(-1, Math.min(1, (e.beta - 45) / 30)); };
    host.addEventListener("pointermove", onMove); window.addEventListener("deviceorientation", onTilt);
    const ro = new ResizeObserver(() => { st.W = 0; size(); }); ro.observe(host);
    const io = "IntersectionObserver" in window ? new IntersectionObserver((en) => { st.vis = en[en.length - 1].isIntersecting; if (st.vis) loop(); }) : null;
    if (io) io.observe(host);

    function frame(t) {
      // düzey: hızlı yükselir, yavaş söner (göz için nabız)
      const tg = st.phase === "listening" ? st.mic : st.target;
      st.level += (tg - st.level) * (tg > st.level ? 0.5 : 0.18);
      const lvl = st.level;
      U.uTime.value = t; U.uLevel.value = lvl;
      for (let i = RN - 1; i > 0; i--) hist[i] = hist[i - 1]; hist[0] = lvl;
      for (let i = 0; i < RN; i++) { const a = (i / RN) * Math.PI * 2, r = 1.0 + hist[i] * 0.35 * (0.6 + 0.4 * Math.sin(i * 0.9 + t * 6)); ringPos[3 * i] = Math.cos(a) * r; ringPos[3 * i + 1] = 0; ringPos[3 * i + 2] = Math.sin(a) * r; }
      ringGeo.attributes.position.needsUpdate = true;
      const sp = st.phase === "thinking" ? 2.6 : st.phase === "speaking" ? 1 + lvl : 0.5;
      for (let i = 0; i < PN; i++) {
        const a = pSeed[3 * i] + t * sp * (0.3 + pSeed[3 * i + 1] * 0.4), y = ((pSeed[3 * i + 1] + t * 0.05 * sp) % 1) * 3.4 - 1.6, r = pSeed[3 * i + 2] * (st.phase === "thinking" ? 0.85 : 1);
        pPos[3 * i] = Math.cos(a) * r; pPos[3 * i + 1] = y; pPos[3 * i + 2] = Math.sin(a) * r;
      }
      pGeo.attributes.position.needsUpdate = true;
      fig.scale.setScalar(1 + lvl * 0.1 + Math.sin(t * 1.5) * 0.015);
      fig.position.y = 0.15 + Math.sin(t * 1.2) * 0.06;
      anim.forEach((f) => f(t, lvl));
      baseRing.scale.setScalar(1 + 0.03 * Math.sin(t * 2));
    }
    function render(t) {
      if (st.mode !== "pyramid") {
        camera.position.set(st.px * 0.8, 0.35 - st.py * 0.45, 6.4); camera.lookAt(0, 0, 0);
        gl.render(scene, camera); return;
      }
      // dört görünüm: ön (alt hücre), sağ, arka (üst), sol — her biri merkezden dışa bakar, yatay çevrilir
      const ctx = pyr.getContext("2d"), W = pyr.width, H = pyr.height, s = Math.min(W, H), v = s / 3, cx = W / 2, cy = H / 2;
      ctx.setTransform(1, 0, 0, 1, 0, 0); ctx.fillStyle = "#000"; ctx.fillRect(0, 0, W, H);
      const cells = [[0, cx, cy + v, Math.PI], [Math.PI / 2, cx + v, cy, Math.PI / 2], [Math.PI, cx, cy - v, 0], [-Math.PI / 2, cx - v, cy, -Math.PI / 2]];
      base.visible = false;
      for (const [ang, x, y, rot] of cells) {
        camera.position.set(Math.sin(ang) * 4.6, 0.2, Math.cos(ang) * 4.6); camera.lookAt(0, 0.1, 0);   // taban yok: figür hücreyi doldursun
        gl.render(scene, camera);
        ctx.setTransform(1, 0, 0, 1, 0, 0); ctx.translate(x, y); ctx.rotate(rot); ctx.scale(-1, 1);
        ctx.drawImage(view, -v / 2, -v / 2, v, v);
      }
      base.visible = true;
      // merkezde piramidin ucunun konacağı yer
      ctx.setTransform(1, 0, 0, 1, 0, 0); ctx.strokeStyle = "rgba(255,255,255,.25)"; ctx.lineWidth = 1; ctx.strokeRect(cx - v / 2 + 0.5, cy - v / 2 + 0.5, v - 1, v - 1);
    }
    function loop() {
      cancelAnimationFrame(st.raf);
      if (!st.on || !st.vis || document.hidden) return;
      st.raf = requestAnimationFrame(() => {
        if (!host.isConnected) return dispose();
        const t = (performance.now() - st.t0) / 1000;
        size(); frame(t); render(t); loop();
      });
    }
    const onVis = () => { if (!document.hidden) loop(); };
    document.addEventListener("visibilitychange", onVis);
    function setMode(m) {
      st.mode = m === "pyramid" ? "pyramid" : "window";
      pyr.hidden = st.mode !== "pyramid"; view.hidden = st.mode === "pyramid";
      host.classList.toggle("is-pyramid", st.mode === "pyramid"); st.W = 0; size();
    }
    function dispose() {
      if (!st.on) return;
      st.on = false; cancelAnimationFrame(st.raf);
      ro.disconnect(); if (io) io.disconnect();
      host.removeEventListener("pointermove", onMove); window.removeEventListener("deviceorientation", onTilt); document.removeEventListener("visibilitychange", onVis);
      geos.forEach((g) => g.dispose()); mats.forEach((m) => m.dispose());
      gl.dispose(); try { gl.forceContextLoss(); } catch (e) { /* yok */ }
      view.remove(); pyr.remove();
    }
    setMode(st.mode); size(); loop();
    return {
      setLevel(v) { st.target = Math.max(0, Math.min(1, v || 0)); },
      setMic(v) { st.mic = Math.max(0, Math.min(1, v || 0)); },
      setPhase(p) { st.phase = p; if (p !== "speaking") st.target = 0; },
      setMode, mode: () => st.mode, dispose,
      state: () => ({ level: st.level, phase: st.phase, mode: st.mode, on: st.on })
    };
  }

  App.kavramHolo = { create, supported: () => !!(App.lab3d && App.lab3d.supported()), load: () => App.lab3d.load() };
})();
