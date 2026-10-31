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
        const n = 1400, pos = new Float32Array(n * 3);
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
          // A static spiral dust layer adds depth without extra animation loops.
          const dust = new Float32Array(s.nodes.length * 24);
          s.nodes.forEach((nd, ni) => {
            for (let j = 0; j < 8; j++) {
              const i = (ni * 8 + j) * 3, angle = (ni * 17 + j * 2.4);
              const spread = 0.5 + (j % 3) * 0.35;
              dust[i] = nd.x + Math.cos(angle) * spread;
              dust[i + 1] = nd.y + Math.sin(angle * 1.7) * 0.45;
              dust[i + 2] = nd.z + Math.sin(angle) * spread;
            }
          });
          const dustGeometry = new S.THREE.BufferGeometry();
          dustGeometry.setAttribute("position", new S.THREE.BufferAttribute(dust, 3));
          g.add(new S.THREE.Points(dustGeometry, new S.THREE.PointsMaterial({color:0x777cce, size:0.08, transparent:true, opacity:0.45, depthWrite:false})));
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
          // Unit titles identify the spiral arms; these are curriculum clusters, not real constellations.
          const clusters = new Map();
          s.nodes.forEach(nd => { if (!clusters.has(nd.unit)) clusters.set(nd.unit, []); clusters.get(nd.unit).push(nd); });
          clusters.forEach((items, unit) => {
            const anchor = items[Math.floor(items.length / 2)];
            const label = S.label(s.unitNames[unit], null, 0.65, g);
            label.position.set(anchor.x, anchor.y + 2.4, anchor.z);
          });
          S.o.label = S.label("", null, 0.9, g); S.o.label.visible = false;
        });
        // Parlak yıldızlar hafifçe titrer, galaksi yavaşça döner (hareket azaltma açıksa durur)
        const still = s.paused || document.documentElement.hasAttribute("data-a11y-motion");
        S.o.nodes.forEach((m, i) => { const pulse = still ? 1 : 1 + 0.08 * Math.sin(t * 2.2 + i); m.scale.setScalar(pulse * (S.o.sel === m ? 1.5 : 1)); });
        if (!still) S.root.rotation.y += 0.0006;
        if (S.o.label) {
          const m = S.o.sel;
          S.o.label.visible = !!m;
          if (m) { const title = s.titles[m.userData.key] || ""; S.o.label.set(title.length > 42 ? title.slice(0, 42) + "…" : title); S.o.label.position.set(m.position.x, m.position.y + 1.2, m.position.z); }
        }
      }
    });
  }

  /* ---------------- Sayfa ---------------- */
  let renderId = 0;
  async function render(view, params) {
    const mine = ++renderId, routeHash = location.hash;
    const current = () => mine === renderId && view.isConnected && location.hash === routeHash;
    App.setTitle(T("Bilgi Evreni", "Knowledge Cosmos"));
    const C = App.data.curriculum;
    const g = params[0] || String(App.prefs.get("curGrade", "9") || "9"), grade = C.findGrade(g) || C.grades[0];
    const subjects = grade.subjects.filter((s) => s.units.length);
    if (!subjects.length) { view.innerHTML = '<p class="notice">' + esc(T("Bu sınıfta henüz konu bulunmuyor.", "No topics available for this grade.")) + "</p>"; return; }
    const sid = params[1] && subjects.some((s) => s.id === params[1]) ? params[1] : (subjects.find((s) => s.id === App.prefs.get("evrenSubj", "")) || subjects[0]).id;
    App.prefs.set("evrenSubj", sid);
    const subject = C.findSubject(grade.id, sid);
    const units = subject.units.map((u) => ({ id: u.id, name: u.name, outcomes: u.outcomes.map((o) => ({ key: C.key(grade.id, sid, u.id, o.id), o })) }));
    const M = App.roots ? await App.roots.mastery().catch(() => new Map()) : new Map();
    if (!current()) return;
    const pos = layout(units);
    const nodes = pos.map((p) => Object.assign(p, { status: statusOf(M.get(p.key)) }));
    const edges = edgesFor(units, App.roots && App.roots.prereqOf);
    const titles = {}; units.forEach((u) => u.outcomes.forEach((x) => { titles[x.key] = (x.o.code ? x.o.code + " · " : "") + L(x.o.title); }));
    const counts = {}; nodes.forEach((n) => { counts[n.status] = (counts[n.status] || 0) + 1; });
    const data = { nodes, edges, titles, unitNames: units.map(u => L(u.name)), paused: true, sig: grade.id + "/" + sid + ":" + nodes.map((n) => n.status[0]).join("") };

    view.innerHTML = '<div class="page ev">' +
      '<div class="page-head"><div><h1>' + esc(T("Bilgi Evreni", "Knowledge Cosmos")) + "</h1><p>" +
        esc(T("Hangi konudasın, sırada ne var? Dersini seç, bir konuyu aç ve öğrenmeye devam et.", "See where you are and what comes next. Choose a subject, select a topic and continue learning.")) + "</p></div></div>" +
      '<p class="ev-summary">' + esc(T(units.length + ' ünite · ' + nodes.length + ' kazanım · ' + edges.length + ' bağlantı', units.length + ' units · ' + nodes.length + ' outcomes · ' + edges.length + ' links')) + '</p><div class="ev-intro"><span>' + esc(T("1 · Sınıf ve ders seç", "1 · Choose grade and subject")) + '</span><span>' + esc(T("2 · Yıldıza veya konuya dokun", "2 · Tap a star or topic")) + '</span><span>' + esc(T("3 · Konuyu öğren ya da test çöz", "3 · Read the lesson or take a quiz")) + '</span></div>' +
      '<div class="ev-bar"><select class="select" id="evG" aria-label="' + esc(T("Sınıf", "Grade")) + '">' + C.grades.map((x) => '<option value="' + x.id + '"' + (x.id === grade.id ? " selected" : "") + ">" + esc(C.gradeName(x.id)) + "</option>").join("") + "</select>" +
        '<select class="select" id="evS" aria-label="' + esc(T("Ders", "Subject")) + '">' + subjects.map((s) => '<option value="' + s.id + '"' + (s.id === sid ? " selected" : "") + ">" + esc(L(s.name)) + "</option>").join("") + "</select>" +
        '<button class="btn btn--sm" type="button" id="evRotate" aria-pressed="false">' + esc(T("Dönüşü başlat", "Start rotation")) + '</button>' +
        '<button class="btn btn--sm" type="button" id="evAR" hidden>' + App.icon("camera") + "AR</button>" +
        '<button class="btn btn--sm" type="button" id="evHolo" hidden>' + App.icon("cube") + esc(T("Hologram", "Hologram")) + "</button></div>" +
      '<div class="ev-legend" aria-label="' + esc(T("Konu durumları", "Topic status")) + '">' + Object.keys(STYLE).map((k) => '<span><i class="ev-dot ev-dot--' + k + '"></i>' + esc(STATUS_NAME()[k]) + ' <b>' + (counts[k] || 0) + '</b></span>').join("") + '</div>' +
      '<p class="hint ev-context">' + esc(T("Bu görsel bir öğrenme haritasıdır; gerçek gökyüzünü temsil etmez. Her yıldız bir kazanım, her kol bir ünite. Renkler kayıtlı test ve çalışma verilerine dayanır; kesin bir başarı ölçümü değildir. ", "This is a learning map, not the real sky. Each star is an outcome; each arm is a unit. Colours reflect saved quiz and study activity, not a definitive assessment. ")) +
        esc(edges.some((e) => e.kind === "pre") ? T("Çizgiler ön koşul haritasındaki bağlantıları gösterir.", "Lines show links from the prerequisite map.") : T("Bu derste çizgiler yalnızca ünite içindeki konu sırasını gösterir; ön koşul olduğu anlamına gelmez.", "Here, lines show topic order within a unit; they do not establish prerequisites.")) + '</p>' +
      '<div class="ev-wrap"><section class="ev-visual" aria-label="' + esc(T("Üç boyutlu konu haritası", "Three dimensional topic map")) + '"><div class="ev-stage" id="evStage"><p class="hint ev-load">' + esc(T("3B sahne yükleniyor…", "Loading 3D…")) + '</p></div><p class="hint">' + esc(T("Çevirmek için sürükle, yakınlaştırmak için iki parmağını aç. Listeyle de tüm konulara ulaşabilirsin.", "Drag to orbit and pinch to zoom. Every topic is also available in the list.")) + '</p></section>' +
        '<aside class="card ev-side">' +
          '<div id="evInfo" class="ev-info"><p class="hint">' + esc(T("Ayrıntı için bir yıldıza dokun ya da listeden seç.", "Tap a star or pick from the list.")) + "</p></div>" +
          '<details class="ev-list"><summary>' + esc(T("Tüm konuları gör ve ara", "Browse and search topics")) + '</summary><label class="ev-filter">' + esc(T("Konu ara", "Search topics")) + '<input class="input" id="evSearch" type="search" autocomplete="off"></label>' +
          '<label class="ev-filter">' + esc(T("Ünite", "Unit")) + '<select class="select" id="evUnit"><option value="">' + esc(T("Tüm üniteler", "All units")) + '</option>' + units.map((u, i) => '<option value="' + i + '">' + esc(L(u.name)) + '</option>').join("") + '</select></label>' +
          '<label class="ev-filter">' + esc(T("Çalışma durumu", "Study status")) + '<select class="select" id="evStatus"><option value="">' + esc(T("Tüm durumlar", "All statuses")) + '</option>' + Object.keys(STYLE).map((k) => '<option value="' + k + '">' + esc(STATUS_NAME()[k]) + '</option>').join("") + '</select></label>' +
          '<p class="hint" id="evCount" role="status"></p><ol>' + nodes.map((n) => '<li><button class="ev-li" type="button" data-k="' + esc(n.key) + '" data-unit="' + n.unit + '" data-status="' + n.status + '" aria-pressed="false"><span class="ev-dot ev-dot--' + n.status + '"></span><span>' + esc(titles[n.key]) + '<small>' + esc(STATUS_NAME()[n.status]) + '</small></span></button></li>').join("") + "</ol></details>" +
        "</aside></div></div>";
    App.hydrateIcons(view);
    const $ = (s) => view.querySelector(s);
    $("#evG").addEventListener("change", () => { location.hash = "#/evren/" + $("#evG").value; });
    $("#evS").addEventListener("change", () => { location.hash = "#/evren/" + grade.id + "/" + $("#evS").value; });
    $("#evRotate").addEventListener("click", () => {
      data.paused = !data.paused;
      $("#evRotate").setAttribute("aria-pressed", String(!data.paused));
      $("#evRotate").textContent = data.paused ? T("Dönüşü başlat", "Start rotation") : T("Dönüşü durdur", "Pause rotation");
    });
    const normalize = (s) => App.nav.norm(s);
    function filter() {
      const words = normalize($("#evSearch").value).split(" ").filter(Boolean), unit = $("#evUnit").value, status = $("#evStatus").value;
      let visible = 0;
      view.querySelectorAll(".ev-li").forEach((b) => {
        const show = (!unit || b.dataset.unit === unit) && (!status || b.dataset.status === status) && words.every((w) => normalize(b.textContent).includes(w));
        b.parentElement.hidden = !show; if (show) visible++;
      });
      $("#evCount").textContent = visible ? T(visible + " / " + nodes.length + " konu", visible + " / " + nodes.length + " topics") : T("Bu filtrelere uygun konu yok. Filtreleri değiştir.", "No matching topics. Change the filters.");
    }
    $("#evSearch").addEventListener("input", filter);
    $("#evUnit").addEventListener("change", filter); $("#evStatus").addEventListener("change", filter); filter();

    function info(key) {
      const f = App.lessons.find(key), m = M.get(key), st = statusOf(m);
      if (!f) return;
      const pre = App.roots ? App.roots.prereqOf(key) : [];
      $("#evInfo").innerHTML = '<p class="ev-eyebrow">' + esc(T("Seçili konu", "Selected topic")) + '</p><h2 class="ev-h"><span class="ev-dot ev-dot--' + st + '"></span>' + esc(titles[key]) + "</h2>" +
        '<p class="hint">' + esc(L(f.unit.name)) + "</p><p><b>" + esc(STATUS_NAME()[st]) + "</b>" + (m && Number.isFinite(m.score) ? " · " + esc(T("hâkimiyet ", "mastery ")) + Math.round(m.score) : "") + "</p>" +
        (pre.length ? '<p class="hint">' + esc(T("Ön koşullar: ", "Prerequisites: ")) + pre.map((k) => esc(titles[k] || k)).join(", ") + "</p>" : "") +
        '<div class="ev-acts"><a class="btn btn--sm btn--primary" href="#/konular/' + esc(key) + '">' + App.icon("book") + esc(T("Konu anlatımı", "Lesson")) + '</a><a class="btn btn--sm" href="#/test/' + esc(key) + '">' + App.icon("quiz") + esc(T("Test çöz", "Take quiz")) + "</a></div>";
      App.hydrateIcons($("#evInfo"));
    }

    let S3 = null, raf = 0, t0 = performance.now(), alive = true;
    const select = (key) => {
      if (S3) { const m = S3._S.o.nodes.find((x) => x.userData.key === key); S3._S.o.sel = m || null; }
      info(key);
      view.querySelectorAll(".ev-li").forEach((b) => { b.setAttribute("aria-pressed", String(b.dataset.k === key)); });
    };
    view.querySelectorAll(".ev-li").forEach((b) => b.addEventListener("click", () => select(b.dataset.k)));
    if (nodes.length) select((nodes.find((n) => n.status === "weak") || nodes.find((n) => n.status === "unknown") || nodes[0]).key);
    function fallback(message) {
      $("#evStage").innerHTML = '<p class="hint ev-load">' + esc(message) + "</p>";
      $("#evRotate").disabled = true;
      $("#evRotate").textContent = T("3B görünüm kullanılamıyor", "3D view unavailable");
      $(".ev-list").open = true;
    }
    if (!App.lab3d || !App.lab3d.supported()) { fallback(T("Bu cihazda 3B görüntü açılamıyor; kazanım listesini kullanabilirsin.", "3D is not available; use the list.")); return; }
    try { await App.lab3d.load(); } catch (e) { if (current()) fallback(T("3B görünüm yüklenemedi. Konu listesinden çalışmaya devam edebilirsin.", "The 3D view could not load. Continue using the topic list.")); return; }
    if (!alive || !current()) return;
    defineScene();
    $("#evStage").innerHTML = "";
    S3 = App.lab3d.mount($("#evStage"), "evren", 0.66);
    const loop = () => { if (!alive) return; if (!document.hidden) S3.frame({}, (performance.now() - t0) / 1000, data); raf = requestAnimationFrame(loop); };
    loop();
    select(view.querySelector('.ev-li[aria-pressed="true"]').dataset.k);
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
