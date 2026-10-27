/* =========================================================
   evren.js — 3B Bilgi Evreni (v1.45)   #/evren  ·  #/evren/<sınıf>/<ders>

   Bir dersin kazanımları 3B bir takımyıldız olarak çizilir:
     • Düğüm = kazanım. Üniteler galaksinin sarmal kollarıdır; kazanımlar müfredat sırasıyla kol boyunca dizilir.
     • Kenar = ön koşul bağı (roots.js haritası: hazır 9. sınıf haritası ya da yapay zekâyla çıkarılan harita).
       Harita yoksa ünite içindeki müfredat sırası kullanılır. Yönlü: bağın sonunda küçük bir uç işareti vardır.
     • Parlaklık ve boyut hâkimiyete göre (roots.mastery: testler, kartlar, yanlışlar): güçlü → parlak altın yıldız,
       orta → mavi yıldız, zayıf → kırmızı sönük nebula, çalışıldı/test yok → soluk, hiç çalışılmadı → karanlık.
   Düğüme dokununca kazanım kartı açılır (konu anlatımı, test, ön koşullar). Deney laboratuvarının 3B motoru
   (lab3d.js) kullanıldığı için AR (masanın üstünde) ve hologram görünümleri de çalışır.
   ========================================================= */
(function () {
  const { esc } = App.utils;
  const T = (tr, en) => (App.i18n && App.i18n.lang === "en" ? en : tr);
  const L = (v) => App.L(v);
  const STYLE = {
    strong:  { color: 0xffd36b, emissive: 0xffb300, ei: 1.6, r: 0.55, halo: 1.0 },
    mid:     { color: 0x8fb8ff, emissive: 0x3d7bff, ei: 0.9, r: 0.42, halo: 0.6 },
    weak:    { color: 0xff6b6b, emissive: 0x7a0f0f, ei: 0.35, r: 0.36, halo: 0.25 },
    studied: { color: 0x9aa3ad, emissive: 0x303540, ei: 0.25, r: 0.32, halo: 0 },
    unknown: { color: 0x4a5160, emissive: 0x000000, ei: 0, r: 0.26, halo: 0 }
  };
  const STATUS_NAME = () => ({ strong: T("Güçlü", "Strong"), mid: T("Orta", "Fair"), weak: T("Zayıf", "Weak"), studied: T("Çalışıldı, test yok", "Studied"), unknown: T("Henüz çalışılmadı", "Not started") });

  /* ---------------- Saf hesaplar (sınanabilir) ---------------- */
  /** Galaksi yerleşimi: ünite ui (0..U−1) → kol açısı; kazanımın kol üstündeki sırası → yarıçap */
  function layout(units) {
    const U = Math.max(1, units.length), out = [];
    units.forEach((u, ui) => {
      const base = (ui / U) * Math.PI * 2;
      u.outcomes.forEach((o, oi) => {
        const r = 3.2 + oi * 1.75, a = base + oi * 0.26;
        out.push({ key: o.key, unit: ui, x: r * Math.cos(a), z: r * Math.sin(a), y: Math.sin(oi * 0.9 + ui) * 0.6 + 0.4 * ui / U });
      });
    });
    return out;
  }
  /** Kenarlar: ön koşul haritası; yoksa ünite içi sıra. [{ from, to, kind }] */
  function edgesFor(units, prereqOf) {
    const keys = new Set(units.flatMap((u) => u.outcomes.map((o) => o.key))), out = [];
    let any = false;
    units.forEach((u) => u.outcomes.forEach((o) => {
      (prereqOf ? prereqOf(o.key) : []).forEach((p) => { if (keys.has(p) && p !== o.key) { out.push({ from: p, to: o.key, kind: "pre" }); any = true; } });
    }));
    if (!any) units.forEach((u) => u.outcomes.forEach((o, i) => { if (i) out.push({ from: u.outcomes[i - 1].key, to: o.key, kind: "seq" }); }));
    return out;
  }
  /** Hâkimiyet → görünüm durumu */
  function statusOf(m) { return m && STYLE[m.status] ? m.status : "unknown"; }

  /* ---------------- 3B sahne (lab3d tanımı) ---------------- */
  function defineScene() {
    if (!App.lab3d || App.lab3d.has("evren")) return;
    App.lab3d.def("evren", {
      view: { r: 30, th: 0.5, ph: 0.9, target: [0, 0, 0] },
      build(S) {
        S.hideFloor();
        S.scene.background = new S.THREE.Color(0x05060f); S.scene.fog = null;
        // Arka plan yıldız tozu
        const n = 900, pos = new Float32Array(n * 3);
        for (let i = 0; i < n; i++) { const r = 60 + Math.random() * 60, a = Math.random() * 2 * Math.PI, b = Math.acos(2 * Math.random() - 1); pos[i * 3] = r * Math.sin(b) * Math.cos(a); pos[i * 3 + 1] = r * Math.cos(b); pos[i * 3 + 2] = r * Math.sin(b) * Math.sin(a); }
        const g = new S.THREE.BufferGeometry(); g.setAttribute("position", new S.THREE.BufferAttribute(pos, 3));
        S.root.add(new S.THREE.Points(g, new S.THREE.PointsMaterial({ color: 0x8899bb, size: 0.35, sizeAttenuation: true })));
        S.o.nodes = []; S.o.sel = null;
      },
      update(S, p, t, s) {
        if (!s || !s.nodes) return;
        S.keyed("graph", s.sig, (g) => {
          S.o.nodes = [];
          const byKey = {};
          s.nodes.forEach((nd) => {
            const st = STYLE[nd.status], mat = S.M(st.color, { emissive: st.emissive, emissiveIntensity: st.ei, roughness: 0.4 });
            const m = S.sphere(st.r, mat, g, 18); m.position.set(nd.x, nd.y, nd.z); m.userData.key = nd.key; m.userData.base = st.r;
            if (st.halo) { const h = S.sphere(st.r * 2, S.glass(st.color, 0.12 * st.halo), g, 16); h.position.copy(m.position); m.userData.halo = h; }
            if (nd.status === "weak") { const neb = S.sphere(st.r * 3.2, S.glass(0xff4d4d, 0.07), g, 12); neb.position.copy(m.position); }
            S.o.nodes.push(m); byKey[nd.key] = m;
          });
          s.edges.forEach((e) => {
            const a = byKey[e.from], b = byKey[e.to]; if (!a || !b) return;
            const ln = S.line(e.kind === "pre" ? 0x6f8cff : 0x3a4560, 2, g, { opacity: e.kind === "pre" ? 0.75 : 0.45 });
            ln.setPoints([[a.position.x, a.position.y, a.position.z], [b.position.x, b.position.y, b.position.z]]);
            // yön: hedefe yakın küçük uç
            const k = 0.82, tip = S.sphere(0.09, e.kind === "pre" ? 0x9fb4ff : 0x5a6680, g, 8);
            tip.position.set(a.position.x + (b.position.x - a.position.x) * k, a.position.y + (b.position.y - a.position.y) * k, a.position.z + (b.position.z - a.position.z) * k);
          });
          S.o.label = S.label("", null, 0.9, g); S.o.label.visible = false;
        });
        // Parlak yıldızlar hafifçe titrer, galaksi yavaşça döner (hareket azaltma açıksa durur)
        const still = document.documentElement.hasAttribute("data-a11y-motion");
        S.o.nodes.forEach((m, i) => { const pulse = still ? 1 : 1 + 0.08 * Math.sin(t * 2.2 + i); m.scale.setScalar(pulse * (S.o.sel === m ? 1.5 : 1)); });
        if (!still) S.root.rotation.y = t * 0.04;
        if (S.o.label) {
          const m = S.o.sel;
          S.o.label.visible = !!m;
          if (m) { S.o.label.set(s.titles[m.userData.key] || ""); S.o.label.position.set(m.position.x, m.position.y + 1.2, m.position.z); }
        }
      }
    });
  }

  /* ---------------- Sayfa ---------------- */
  async function render(view, params) {
    App.setTitle(T("Bilgi Evreni", "Knowledge Cosmos"));
    const C = App.data.curriculum;
    const g = params[0] || String(App.prefs.get("curGrade", "9") || "9"), grade = C.findGrade(g) || C.grades[0];
    const subjects = grade.subjects.filter((s) => s.units.length);
    const sid = params[1] && subjects.some((s) => s.id === params[1]) ? params[1] : (subjects.find((s) => s.id === App.prefs.get("evrenSubj", "")) || subjects[0]).id;
    App.prefs.set("evrenSubj", sid);
    const subject = C.findSubject(grade.id, sid);
    const units = subject.units.map((u) => ({ id: u.id, name: u.name, outcomes: u.outcomes.map((o) => ({ key: C.key(grade.id, sid, u.id, o.id), o })) }));
    const M = App.roots ? await App.roots.mastery().catch(() => new Map()) : new Map();
    const pos = layout(units);
    const nodes = pos.map((p) => Object.assign(p, { status: statusOf(M.get(p.key)) }));
    const edges = edgesFor(units, App.roots && App.roots.prereqOf);
    const titles = {}; units.forEach((u) => u.outcomes.forEach((x) => { titles[x.key] = (x.o.code ? x.o.code + " · " : "") + L(x.o.title).slice(0, 48); }));
    const counts = {}; nodes.forEach((n) => { counts[n.status] = (counts[n.status] || 0) + 1; });
    const data = { nodes, edges, titles, sig: grade.id + "/" + sid + ":" + nodes.map((n) => n.status[0]).join("") };

    view.innerHTML = '<div class="page ev">' +
      '<div class="page-head"><div><h1>' + esc(T("Bilgi Evreni", "Knowledge Cosmos")) + "</h1><p>" +
        esc(T("Her yıldız bir kazanım. Güçlü olduğun konular parlar, zayıf olanlar kızıl bir nebula gibi söner; çizgiler ön koşul bağlarıdır. Bir yıldıza dokun.", "Each star is an outcome: strong topics shine, weak ones fade; lines are prerequisites. Tap a star.")) + "</p></div></div>" +
      '<div class="ev-bar"><select class="select" id="evG" aria-label="' + esc(T("Sınıf", "Grade")) + '">' + C.grades.map((x) => '<option value="' + x.id + '"' + (x.id === grade.id ? " selected" : "") + ">" + esc(C.gradeName(x.id)) + "</option>").join("") + "</select>" +
        '<select class="select" id="evS" aria-label="' + esc(T("Ders", "Subject")) + '">' + subjects.map((s) => '<option value="' + s.id + '"' + (s.id === sid ? " selected" : "") + ">" + esc(L(s.name)) + "</option>").join("") + "</select>" +
        '<button class="btn btn--sm" type="button" id="evAR" hidden>' + App.icon("camera") + "AR</button>" +
        '<button class="btn btn--sm" type="button" id="evHolo" hidden>' + App.icon("cube") + esc(T("Hologram", "Hologram")) + "</button></div>" +
      '<div class="ev-wrap"><div class="ev-stage" id="evStage"><p class="hint ev-load">' + esc(T("3B sahne yükleniyor…", "Loading 3D…")) + "</p></div>" +
        '<aside class="card ev-side"><div class="ev-legend">' + Object.keys(STYLE).map((k) => '<span class="ev-dot ev-dot--' + k + '"></span>' + esc(STATUS_NAME()[k]) + " <b>" + (counts[k] || 0) + "</b>").join("<br>") + "</div>" +
          '<div id="evInfo" class="ev-info"><p class="hint">' + esc(T("Ayrıntı için bir yıldıza dokun ya da listeden seç.", "Tap a star or pick from the list.")) + "</p></div>" +
          '<details class="ev-list"><summary>' + esc(T("Kazanım listesi (erişilebilir)", "Outcome list (accessible)")) + "</summary><ol>" + nodes.map((n) => '<li><button class="ev-li" type="button" data-k="' + esc(n.key) + '"><span class="ev-dot ev-dot--' + n.status + '"></span>' + esc(titles[n.key]) + "</button></li>").join("") + "</ol></details>" +
        "</aside></div></div>";
    App.hydrateIcons(view);
    const $ = (s) => view.querySelector(s);
    $("#evG").addEventListener("change", () => { location.hash = "#/evren/" + $("#evG").value; });
    $("#evS").addEventListener("change", () => { location.hash = "#/evren/" + grade.id + "/" + $("#evS").value; });

    function info(key) {
      const f = App.lessons.find(key), m = M.get(key), st = statusOf(m);
      const pre = App.roots ? App.roots.prereqOf(key) : [];
      $("#evInfo").innerHTML = '<h2 class="ev-h"><span class="ev-dot ev-dot--' + st + '"></span>' + esc(titles[key]) + "</h2>" +
        '<p class="hint">' + esc(L(f.unit.name)) + "</p><p><b>" + esc(STATUS_NAME()[st]) + "</b>" + (m && Number.isFinite(m.score) ? " · " + esc(T("hâkimiyet ", "mastery ")) + Math.round(m.score) : "") + "</p>" +
        (pre.length ? '<p class="hint">' + esc(T("Ön koşullar: ", "Prerequisites: ")) + pre.map((k) => esc(titles[k] || k)).join(", ") + "</p>" : "") +
        '<div class="ev-acts"><a class="btn btn--sm btn--primary" href="#/konular/' + esc(key) + '">' + App.icon("book") + esc(T("Konu anlatımı", "Lesson")) + '</a><a class="btn btn--sm" href="#/test/' + esc(key) + '">' + App.icon("quiz") + esc(T("Test çöz", "Take quiz")) + "</a></div>";
      App.hydrateIcons($("#evInfo"));
    }

    let S3 = null, raf = 0, t0 = performance.now(), alive = true;
    const select = (key) => {
      if (S3) { const m = S3._S.o.nodes.find((x) => x.userData.key === key); S3._S.o.sel = m || null; }
      info(key);
    };
    view.querySelectorAll(".ev-li").forEach((b) => b.addEventListener("click", () => select(b.dataset.k)));
    if (!App.lab3d || !App.lab3d.supported()) { $("#evStage").innerHTML = '<p class="hint">' + esc(T("Bu cihazda 3B görüntü açılamıyor; kazanım listesini kullanabilirsin.", "3D is not available; use the list.")) + "</p>"; return; }
    try { await App.lab3d.load(); } catch (e) { $("#evStage").innerHTML = '<p class="hint">' + esc(e.message) + "</p>"; return; }
    if (!alive || !view.isConnected) return;
    defineScene();
    $("#evStage").innerHTML = "";
    S3 = App.lab3d.mount($("#evStage"), "evren", 0.66);
    const loop = () => { if (!alive) return; S3.frame({}, (performance.now() - t0) / 1000, data); raf = requestAnimationFrame(loop); };
    loop();
    // Yıldız seçme: sürükleme değil, kısa dokunuş
    const cv = S3.el.querySelector("canvas");
    let down = null;
    cv.addEventListener("pointerdown", (e) => { down = [e.clientX, e.clientY]; });
    cv.addEventListener("pointerup", (e) => {
      if (!down || Math.hypot(e.clientX - down[0], e.clientY - down[1]) > 6) return;
      const r = cv.getBoundingClientRect(), ray = S3._S.ray((e.clientX - r.left) / r.width, (e.clientY - r.top) / r.height);
      const hit = ray.intersectObjects(S3._S.o.nodes, false)[0];
      if (hit) select(hit.object.userData.key);
    });
    if (App.lab3d.arSupported()) { $("#evAR").hidden = false; $("#evAR").addEventListener("click", () => S3.arStart({}).catch((e) => App.ui.toast(e.message, "error"))); }
    $("#evHolo").hidden = false; $("#evHolo").addEventListener("click", () => S3.holoStart({}).catch((e) => App.ui.toast(e.message, "error")));
    return () => { alive = false; cancelAnimationFrame(raf); if (S3) S3.dispose(); };
  }

  App.router.register("evren", render);
  App.evren = { layout, edgesFor, statusOf, STYLE };
})();
