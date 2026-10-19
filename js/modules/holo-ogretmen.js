/* =========================================================
   holo-ogretmen.js — Konuşan hologram öğretmen (v1.26)

   Sesli öğretmenin içinde, ekranın derinliğinde duran 3B holografik bir
   öğretmen figürü. Hologram altyapısını (lab3d: eksen dışı perspektif,
   yüz takibi, fresnel parıltı) kullanır.
     • Konuşurken ağız sese göre oynar: tarayıcı/Android sözcük olaylarıyla
       (onWord), yoksa hece ritmiyle.
     • Dinlerken mikrofon seviyesine göre halka parlar; düşünürken parçacıklar döner.
     • Başı izleyiciye (yüz takibindeki göz konumuna) döner, göz kırpar.
     • Yanında holografik pano: cevaptaki formüller ve anahtar kavramlar; konu bir
       deneyle eşleşirse "Deneyi hologramda aç".
   ========================================================= */
(function () {
  if (!App.lab3d) return;
  const T = (tr, en) => (App.i18n.lang === "en" ? en : tr);

  /* ---------------- 3B figür ---------------- */
  App.lab3d.def("ogretmen", {
    view: { r: 11.5, th: 0, ph: 1.42, target: [0, 2.25, 0] },
    build(S) {
      const THREE = S.THREE, o = S.o;
      const body = S.group();
      // projeksiyon tabanı
      const base = S.cyl(1.7, 1.9, 0.18, 0x2a8fb0, body, 48); base.position.y = 0.09;
      const ring = new THREE.Mesh(new THREE.TorusGeometry(1.8, 0.04, 8, 64), S.M(0x5fe6ff, { emissive: 0x5fe6ff, emissiveIntensity: 1 })); ring.rotation.x = Math.PI / 2; ring.position.y = 0.2; body.add(ring);
      // gövde (omuzlar → bel)
      const prof = [[0.0, 0.3], [0.95, 0.3], [1.05, 0.6], [1.0, 1.3], [1.15, 1.75], [1.25, 1.95], [0.9, 2.12], [0.36, 2.2], [0.0, 2.2]].map((p) => new THREE.Vector2(p[0], p[1]));
      const torso = S.mesh(new THREE.LatheGeometry(prof, 40), 0x3f7fd8, body);
      const tie = S.box(0.16, 0.9, 0.08, 0xe0a458, body); tie.position.set(0, 1.62, 0.98); tie.rotation.x = -0.12;
      const neck = S.cyl(0.24, 0.3, 0.42, 0x8fb8ff, body); neck.position.y = 2.36;
      // baş
      const head = S.group(body); head.position.y = 3.15;
      const skull = S.sphere(0.88, 0x9fc8ff, head, 40); skull.scale.set(1, 1.1, 0.98);
      const eyeM = S.M(0xffffff, { emissive: 0xffffff, emissiveIntensity: 1 });
      const eyes = [-0.32, 0.32].map((x) => { const e = new THREE.Mesh(new THREE.SphereGeometry(0.13, 16, 12), eyeM); e.scale.set(1, 1.3, 0.6); e.position.set(x, 0.12, 0.8); head.add(e); return e; });
      const brows = [-0.32, 0.32].map((x) => { const b = S.box(0.3, 0.05, 0.05, 0x23406e, head); b.position.set(x, 0.38, 0.8); return b; });
      const mouth = new THREE.Mesh(new THREE.SphereGeometry(0.2, 20, 12), S.M(0xff8fa8, { emissive: 0xff5d84, emissiveIntensity: 0.6 })); mouth.position.set(0, -0.36, 0.78); mouth.scale.set(1.15, 0.12, 0.45); head.add(mouth);
      // kep (KampüsAI)
      const cap = S.group(head); cap.position.y = 0.86;
      S.cyl(0.62, 0.66, 0.28, 0x1f2a44, cap, 32).position.y = 0;
      const board = S.box(1.7, 0.07, 1.7, 0x1f2a44, cap); board.position.y = 0.17; board.rotation.y = Math.PI / 4;
      const tassel = S.cyl(0.03, 0.03, 0.55, 0xe0a458, cap, 6); tassel.position.set(0.72, -0.08, 0.2);
      // hale ve parçacıklar
      const halo = new THREE.Mesh(new THREE.TorusGeometry(1.25, 0.03, 8, 64), S.M(0x5fe6ff, { emissive: 0x5fe6ff, emissiveIntensity: 1 })); halo.rotation.x = Math.PI / 2; halo.position.y = 3.15; body.add(halo);
      const parts = []; for (let i = 0; i < 10; i++) { const p = S.sphere(0.06, 0xbff3ff, body, 8); parts.push(p); }
      Object.assign(o, { body, head, eyes, brows, mouth, halo, parts, ring, talk: 0, blinkAt: 2 });
      S.hideFloor();
    },
    update(S, p, t) {
      const o = S.o; p = p || {};
      const ph = p.phase || "idle";
      // ağız: dışarıdan gelen konuşma düzeyi (0..1)
      const lvl = Math.max(0, Math.min(1, Number(p.talk) || 0));
      o.talk += (lvl - o.talk) * 0.45;
      o.mouth.scale.y = 0.12 + o.talk * 0.85; o.mouth.scale.x = 1.15 - o.talk * 0.25;
      // baş izleyiciye döner, hafif salınım
      const look = p.look || [0, 0];
      o.head.rotation.y += ((Math.max(-0.6, Math.min(0.6, look[0] * 0.28))) - o.head.rotation.y) * 0.1;
      o.head.rotation.x += ((Math.max(-0.3, Math.min(0.3, -look[1] * 0.12)) + (ph === "listening" ? 0.08 : 0)) - o.head.rotation.x) * 0.1;
      o.body.position.y = Math.sin(t * 1.6) * 0.06;
      o.head.rotation.z = Math.sin(t * 0.9) * 0.03 + (ph === "thinking" ? 0.12 : 0);
      // göz kırpma
      if (t > o.blinkAt) { o.blinkAt = t + 2.5 + Math.random() * 3; o.blinkT = t; }
      const bl = o.blinkT != null && t - o.blinkT < 0.16 ? 0.15 : 1;
      o.eyes.forEach((e) => { e.scale.y = 1.3 * bl; });
      o.brows.forEach((b, i) => { b.position.y = 0.38 + (ph === "thinking" ? 0.06 : 0) + o.talk * 0.04; b.rotation.z = (i ? -1 : 1) * (ph === "thinking" ? 0.18 : 0); });
      // hale: dinlerken mikrofona göre, konuşurken sese göre
      const mic = Math.max(0, Math.min(1, Number(p.mic) || 0));
      const hs = 1 + (ph === "listening" ? mic * 0.35 : ph === "speaking" ? o.talk * 0.15 : 0);
      o.halo.scale.set(hs, hs, hs); o.halo.rotation.z = t * 0.6;
      o.ring.rotation.z = -t * 0.4;
      // parçacıklar: düşünürken hızlı döner
      const sp = ph === "thinking" ? 3.2 : 0.7;
      o.parts.forEach((q, i) => { const a = t * sp + (i / o.parts.length) * Math.PI * 2; const r = 1.55 + 0.12 * Math.sin(t * 2 + i); q.position.set(Math.cos(a) * r, 3.1 + Math.sin(a * 2 + i) * 0.5, Math.sin(a) * r); q.visible = ph !== "paused"; });
    }
  });

  /* ---------------- Pano: formül ve kavramlar ---------------- */
  const norm = (x) => String(x || "").toLocaleLowerCase("tr").normalize("NFD").replace(/[̀-ͯ]/g, "").replace(/[^a-z0-9 ]+/g, " ");
  const STOP = new Set("bir ve ile icin gibi daha olan olarak nasil neden nedir hangi bu su o de da ki mi mu ne kadar cok en ama veya ya ise bana anlat soyle".split(" "));
  /** Soru ve cevaptaki kelimelerle en uygun deneyi bul */
  function matchLab(text) {
    if (!App.labs || !App.labs.LABS) return null;
    const words = norm(text).split(" ").filter((w) => w.length >= 4 && !STOP.has(w));
    if (!words.length) return null;
    let best = null, bestS = 0;
    Object.keys(App.labs.LABS).forEach((id) => {
      const L = App.labs.LABS[id]; if (!App.lab3d.has(id)) return;
      let title = ""; try { title = L.title(); } catch (e) { return; }
      const tw = norm(title).split(" ").filter((w) => w.length >= 4 && !STOP.has(w));
      let sc = 0; tw.forEach((x) => { if (words.some((w) => w.slice(0, 5) === x.slice(0, 5))) sc += x.length >= 6 ? 2 : 1; });
      if (sc > bestS) { bestS = sc; best = { id, title }; }
    });
    return bestS >= 2 ? best : null;
  }
  function panoHtml(question, answer) {
    const md = App.cite ? App.cite.strip(answer || "") : (answer || "");
    const formulas = (md.match(/\$\$[\s\S]+?\$\$|\$[^$\n]{2,80}\$/g) || []).slice(0, 3);
    const terms = Array.from(new Set((md.match(/\*\*([^*]{2,40})\*\*/g) || []).map((x) => x.replace(/\*\*/g, "").trim()))).slice(0, 5);
    const first = md.replace(/\$[^$]*\$/g, "…").replace(/[#*_>`-]/g, "").split(/(?<=[.!?])\s+/)[0] || "";
    const lab = matchLab(question + " " + md);
    let h = "";
    if (formulas.length) h += '<div class="vh-pano__f">' + formulas.map((f) => '<div class="md">' + App.markdown.render(f.indexOf("$$") === 0 ? f : "$$" + f.slice(1, -1) + "$$") + "</div>").join("") + "</div>";
    if (terms.length) h += '<div class="vh-pano__t">' + terms.map((x) => "<span>" + App.utils.esc(x) + "</span>").join("") + "</div>";
    if (!formulas.length && !terms.length && first) h += '<p class="vh-pano__s">' + App.utils.esc(first.slice(0, 180)) + "</p>";
    if (lab) h += '<a class="vh-pano__lab" href="#/lab/' + lab.id + '/holo" data-lab="' + lab.id + '">🧪 ' + App.utils.esc(T("Deneyi hologramda aç: ", "Open the lab as a hologram: ") + lab.title) + "</a>";
    return h;
  }

  /* ---------------- Sahne yöneticisi (voice.js kullanır) ---------------- */
  async function attach(host) {
    await App.lab3d.load();
    if (!host.isConnected) return null;
    const S3 = App.lab3d.mount(host, "ogretmen", window.innerHeight < 760 ? 0.62 : 0.75);
    const st = { S3, talk: 0, wordAt: 0, phase: "idle", mic: 0, raf: 0, t0: performance.now(), on: true };
    st.loop = () => {
      if (!st.on) return;
      const now = performance.now(), t = (now - st.t0) / 1000;
      let talk = 0;
      if (st.phase === "speaking") {
        const since = now - st.wordAt;
        if (st.wordAt && since < 900) talk = Math.max(0, 1 - since / 260) * 0.8 + 0.2 * Math.abs(Math.sin(t * 13));   // sözcük olayları
        else talk = 0.25 + 0.45 * Math.abs(Math.sin(t * 9.5)) * (0.6 + 0.4 * Math.sin(t * 2.3));                    // olay yoksa hece ritmi
      }
      const hs = S3.holoState ? S3.holoState() : null;
      S3.frame({ talk, phase: st.phase, mic: st.mic, look: hs && hs.eye ? hs.eye : [0, 0] }, t);
      st.raf = requestAnimationFrame(st.loop);
    };
    st.loop();
    App.holoTeacher._last = st;
    try { await S3.holoStart({ inline: true, src: "face" }); } catch (e) { /* hologramsız da 3B görünür */ }
    return st;
  }
  function detach(st) { if (!st) return; st.on = false; cancelAnimationFrame(st.raf); try { st.S3.dispose(); } catch (e) { /* yok */ } }

  App.holoTeacher = { attach, detach, panoHtml, matchLab, supported: () => App.lab3d.supported() };
})();
