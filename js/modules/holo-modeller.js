/* =========================================================
   holo-modeller.js — Hologram Model Kütüphanesi ve Elle Molekül Kurma (v1.27)

   #/modeller            → kütüphane
   #/modeller/<id>       → 3B model: döndür, parçalarına ayır, parçaya dokun → adı ve görevi
   #/modeller/molekul    → atomları tutup bağla; doğru molekül VSEPR geometrisine oturur

   Hepsi lab3d altyapısıyla çizilir: 3B, hologram (yüz takibi) ve el ile kontrol
   (kamera) aynen çalışır. Modeller kodla (prosedürel) kurulur; dış dosya yoktur.
   ========================================================= */
(function () {
  if (!App.lab3d) return;
  const { esc } = App.utils;
  const T = (tr, en) => (App.i18n.lang === "en" ? en : tr);
  const L2 = (x) => (Array.isArray(x) ? T(x[0], x[1]) : x);
  const D3 = App.lab3d.def;

  /* =========================================================
     Model tanımları: parçalar [id, [ad tr, en], [bilgi tr, en]]
     ========================================================= */
  const MODELS = [
    { id: "hucre", icon: "🧫", subject: "biyoloji", name: ["Hayvan hücresi", "Animal cell"], keys: ["hücre", "organel"],
      desc: ["Ökaryot hayvan hücresinin organelleri.", "Organelles of a eukaryotic animal cell."],
      parts: [
        ["zar", ["Hücre zarı", "Cell membrane"], ["Seçici geçirgen fosfolipit çift tabaka; madde alışverişini denetler.", "Selectively permeable phospholipid bilayer."]],
        ["cekirdek", ["Çekirdek", "Nucleus"], ["DNA'yı taşır, hücrenin yönetim merkezidir; çift katlı ve porlu zarla çevrilidir.", "Holds DNA; controls the cell."]],
        ["cekirdekcik", ["Çekirdekçik", "Nucleolus"], ["Ribozom alt birimlerinin (rRNA) yapıldığı yer.", "Where ribosomal subunits are made."]],
        ["mito", ["Mitokondri", "Mitochondria"], ["Oksijenli solunumla ATP üretir; kendi DNA'sı ve ribozomu vardır.", "Makes ATP by aerobic respiration."]],
        ["er", ["Endoplazmik retikulum", "Endoplasmic reticulum"], ["Granüllü ER'de ribozomlar protein sentezler; kanallarla taşıma yapar.", "Rough ER makes proteins; transport channels."]],
        ["golgi", ["Golgi cisimciği", "Golgi apparatus"], ["Proteinleri paketler, salgı keseciklerine yollar.", "Packages and ships proteins."]],
        ["lizozom", ["Lizozom", "Lysosome"], ["Sindirim enzimleri taşır; hücre içi sindirim yapar.", "Contains digestive enzymes."]],
        ["sentrozom", ["Sentrozom", "Centrosome"], ["Hayvan hücresinde bölünmede iğ ipliklerini oluşturur.", "Organises spindle fibres in division."]],
        ["ribozom", ["Ribozom", "Ribosomes"], ["Protein sentezi yapan zarsız organel; tüm canlılarda bulunur.", "Membraneless; makes proteins."]]
      ] },
    { id: "bitki", icon: "🌿", subject: "biyoloji", name: ["Bitki hücresi", "Plant cell"], keys: ["bitki hücre", "hücre", "fotosentez", "kloroplast"],
      desc: ["Bitki hücresine özgü yapılar: hücre duvarı, kloroplast, büyük koful.", "Plant-specific structures."],
      parts: [
        ["duvar", ["Hücre duvarı", "Cell wall"], ["Selülozdan yapılmış, hücreye destek ve şekil veren dış katman.", "Cellulose wall giving support and shape."]],
        ["zar", ["Hücre zarı", "Cell membrane"], ["Duvarın hemen içindeki seçici geçirgen zar.", "Selectively permeable membrane."]],
        ["koful", ["Merkezi koful", "Central vacuole"], ["Su ve madde depolar; turgor basıncıyla hücreyi gergin tutar.", "Stores water; keeps turgor."]],
        ["klor", ["Kloroplast", "Chloroplast"], ["Klorofil içerir; ışık enerjisiyle fotosentez yaparak glikoz üretir.", "Photosynthesis with chlorophyll."]],
        ["cekirdek", ["Çekirdek", "Nucleus"], ["Kalıtım materyalini taşır.", "Holds genetic material."]],
        ["mito", ["Mitokondri", "Mitochondria"], ["Bitkiler de solunum yapar; ATP üretir.", "Plants respire too; makes ATP."]]
      ] },
    { id: "kalp", icon: "❤️", subject: "biyoloji", name: ["İnsan kalbi", "Human heart"], keys: ["dolaşım", "kalp"],
      desc: ["Dört odacıklı kalp ve büyük damarlar; kırmızı oksijence zengin, mavi fakir kan.", "Four chambers and great vessels."],
      parts: [
        ["sagku", ["Sağ kulakçık", "Right atrium"], ["Vücuttan gelen kirli kanı üst ve alt ana toplardamarla alır.", "Receives deoxygenated blood from the body."]],
        ["sagka", ["Sağ karıncık", "Right ventricle"], ["Kirli kanı akciğer atardamarıyla akciğerlere pompalar (küçük dolaşım).", "Pumps blood to the lungs."]],
        ["solku", ["Sol kulakçık", "Left atrium"], ["Akciğerlerden temizlenen kanı akciğer toplardamarlarıyla alır.", "Receives oxygenated blood from the lungs."]],
        ["solka", ["Sol karıncık", "Left ventricle"], ["Duvarı en kalın odacık; temiz kanı aort ile tüm vücuda pompalar (büyük dolaşım).", "Thickest wall; pumps to the whole body."]],
        ["aort", ["Aort", "Aorta"], ["Vücudun en büyük atardamarı; temiz kanı vücuda taşır.", "Largest artery; carries oxygenated blood."]],
        ["akat", ["Akciğer atardamarı", "Pulmonary artery"], ["Kirli kanı akciğere götüren tek atardamar.", "Carries deoxygenated blood to the lungs."]],
        ["toplar", ["Üst ve alt ana toplardamar", "Venae cavae"], ["Vücuttan gelen kanı sağ kulakçığa döker.", "Return body blood to the right atrium."]]
      ] },
    { id: "dna", icon: "🧬", subject: "biyoloji", name: ["DNA çift sarmal", "DNA double helix"], keys: ["nükleik asit", "dna", "nükleotit", "replikasyon", "eşlenme"],
      desc: ["İki zincir, şeker-fosfat omurga ve hidrojen bağlı baz çiftleri. Parçalarına ayırınca zincirler açılır (eşlenme).", "Two strands and base pairs; explode to unzip."],
      parts: [
        ["z1", ["1. zincir (şeker-fosfat omurga)", "Strand 1 (sugar-phosphate)"], ["Deoksiriboz şekeri ve fosfatın sırayla bağlandığı omurga.", "Deoxyribose and phosphate backbone."]],
        ["z2", ["2. zincir (zıt yönlü)", "Strand 2 (antiparallel)"], ["Diğer zincirle zıt yönlü (5'→3' / 3'→5') uzanır.", "Runs antiparallel."]],
        ["at", ["A–T çiftleri", "A–T pairs"], ["Adenin timinle 2 hidrojen bağı kurar.", "Adenine–thymine: 2 hydrogen bonds."]],
        ["gc", ["G–C çiftleri", "G–C pairs"], ["Guanin sitozinle 3 hidrojen bağı kurar; G–C oranı arttıkça DNA daha dayanıklıdır.", "Guanine–cytosine: 3 hydrogen bonds."]]
      ] },
    { id: "atom", icon: "⚛️", subject: "kimya", name: ["Atom orbitalleri", "Atomic orbitals"], keys: ["atom", "orbital", "elektron dizilim", "kuantum"],
      desc: ["Çekirdek ve 1s, 2s, 2p orbitalleri: elektronun bulunma olasılığının yüksek olduğu bölgeler.", "Nucleus with 1s, 2s and 2p orbitals."],
      parts: [
        ["cekirdek", ["Çekirdek", "Nucleus"], ["Proton (+) ve nötronlar; atom kütlesinin neredeyse tamamı buradadır.", "Protons and neutrons."]],
        ["s1", ["1s orbitali", "1s orbital"], ["Küresel; en fazla 2 elektron alır, çekirdeğe en yakın enerji düzeyi.", "Spherical; holds 2 electrons."]],
        ["s2", ["2s orbitali", "2s orbital"], ["Küresel ama daha büyük; 2. enerji düzeyi.", "Larger sphere; n = 2."]],
        ["px", ["2pₓ orbitali", "2px orbital"], ["Halter (iki loblu) biçimli; x ekseni boyunca.", "Dumbbell along x."]],
        ["py", ["2pᵧ orbitali", "2py orbital"], ["y ekseni boyunca; üç p orbitali birlikte 6 elektron alır.", "Along y; three p orbitals hold 6 electrons."]],
        ["pz", ["2p_z orbitali", "2pz orbital"], ["z ekseni boyunca; aynı enerjili (dejenere) p orbitallerinden biri.", "Along z; degenerate p orbital."]]
      ] },
    { id: "gunes", icon: "🪐", subject: "cografya", name: ["Güneş sistemi", "Solar system"], keys: ["güneş sistemi", "evren", "gezegen", "dünya'nın şekli", "hareketleri"],
      desc: ["Güneş ve sekiz gezegen (uzaklık ve boyutlar ölçekli değildir).", "Sun and eight planets (not to scale)."],
      parts: [
        ["gunes", ["Güneş", "Sun"], ["Sistemin kütlesinin %99,8'i; çekirdeğinde hidrojen helyuma dönüşür.", "99.8% of the mass; fusion core."]],
        ["merkur", ["Merkür", "Mercury"], ["Güneş'e en yakın ve en küçük gezegen.", "Closest and smallest."]],
        ["venus", ["Venüs", "Venus"], ["Kalın CO₂ atmosferi yüzünden en sıcak gezegen.", "Hottest due to thick CO₂."]],
        ["dunya", ["Dünya", "Earth"], ["Sıvı su ve yaşam barındıran tek bilinen gezegen; eksen eğikliği 23°27'.", "Tilt 23°27'; has life."]],
        ["mars", ["Mars", "Mars"], ["Demir oksit nedeniyle kızıl; iki küçük uydusu var.", "Red due to iron oxide."]],
        ["jupiter", ["Jüpiter", "Jupiter"], ["En büyük gezegen; gaz devi.", "Largest; gas giant."]],
        ["saturn", ["Satürn", "Saturn"], ["Belirgin halkalarıyla bilinen gaz devi.", "Famous rings."]],
        ["uranus", ["Uranüs", "Uranus"], ["Yan yatmış ekseniyle buz devi.", "Ice giant on its side."]],
        ["neptun", ["Neptün", "Neptune"], ["Güneş'e en uzak gezegen; güçlü rüzgârlar.", "Farthest; strong winds."]]
      ] },
    { id: "nacl", icon: "🧂", subject: "kimya", name: ["NaCl kristali", "NaCl crystal"], keys: ["iyonik bağ", "iyonik", "kristal", "tuz"],
      desc: ["Sodyum klorürün kübik örgüsü: her iyon zıt yüklü 6 iyonla çevrilidir.", "Cubic lattice; each ion has 6 neighbours."],
      parts: [
        ["na", ["Na⁺ iyonları", "Na⁺ ions"], ["Elektron vererek pozitif yüklenmiş sodyum; Cl⁻'den küçüktür.", "Sodium that lost an electron; smaller."]],
        ["cl", ["Cl⁻ iyonları", "Cl⁻ ions"], ["Elektron alarak negatif yüklenmiş klor.", "Chlorine that gained an electron."]]
      ] },
    { id: "karbon", icon: "💎", subject: "kimya", name: ["Elmas ve grafit", "Diamond and graphite"], keys: ["karbon", "allotrop", "kovalent", "katı"],
      desc: ["Karbonun iki allotropu: elmasta her C 4 bağlı (dörtyüzlü), grafitte katmanlar.", "Two allotropes of carbon."],
      parts: [
        ["elmas", ["Elmas", "Diamond"], ["Her karbon 4 karbona kovalent bağlı ağ örgü; en sert doğal madde, elektriği iletmez.", "4 bonds each; hardest; insulator."]],
        ["grafit", ["Grafit", "Graphite"], ["Her karbon 3 bağlı altıgen katmanlar; katmanlar kayar, serbest elektronla elektriği iletir.", "Layers of hexagons; conducts."]]
      ] },
    { id: "yerkure", icon: "🌍", subject: "cografya", name: ["Yer'in iç yapısı", "Earth's interior"], keys: ["iç yapı", "yer'in", "levha", "deprem", "volkan", "yer kabuğu"],
      desc: ["Kabuk, manto, dış ve iç çekirdek. Parçalarına ayırınca katmanlar açılır.", "Crust, mantle, outer and inner core."],
      parts: [
        ["kabuk", ["Yer kabuğu", "Crust"], ["En ince katman (okyanus altında ~7 km, kıtalarda ~35 km); levhalardan oluşur.", "Thinnest layer; tectonic plates."]],
        ["manto", ["Manto", "Mantle"], ["En kalın katman (~2.900 km); magma ve konveksiyon akımları burada.", "Thickest; convection currents."]],
        ["dis", ["Dış çekirdek", "Outer core"], ["Sıvı demir-nikel; hareketi manyetik alanı oluşturur.", "Liquid iron-nickel; magnetic field."]],
        ["ic", ["İç çekirdek", "Inner core"], ["Çok yüksek basınç nedeniyle katı demir-nikel; ~5.000 °C'nin üstünde.", "Solid iron-nickel under huge pressure."]]
      ] },
    { id: "noron", icon: "🧠", subject: "biyoloji", name: ["Nöron", "Neuron"], keys: ["sinir sistemi", "nöron", "sinir"],
      desc: ["Sinir hücresinin bölümleri ve impulsun yönü.", "Parts of a nerve cell."],
      parts: [
        ["dendrit", ["Dendritler", "Dendrites"], ["Uyarıyı alan kısa uzantılar.", "Receive signals."]],
        ["govde", ["Hücre gövdesi", "Cell body"], ["Çekirdeği ve organelleri taşır.", "Contains the nucleus."]],
        ["akson", ["Akson", "Axon"], ["Uyarıyı gövdeden uzağa ileten uzun uzantı.", "Carries the impulse away."]],
        ["miyelin", ["Miyelin kılıf", "Myelin sheath"], ["Yalıtkan kılıf; impulsun boğumdan boğuma atlayarak hızlı iletilmesini sağlar.", "Insulates; speeds conduction."]],
        ["ranvier", ["Ranvier boğumları", "Nodes of Ranvier"], ["Miyelinsiz aralıklar; sıçrayarak iletim burada olur.", "Gaps for saltatory conduction."]],
        ["uc", ["Akson uçları (sinaps)", "Axon terminals"], ["Nörotransmitter salgılayarak uyarıyı sonraki hücreye aktarır.", "Release neurotransmitters."]]
      ] }
  ];

  /* ---------------- ortak model kurucu ---------------- */
  // Her parça bir gruptur; patlatma yönü (dir) ve uzaklığı (dist) parçaya göre verilir.
  function makeModelDef(md, builder) {
    D3("m-" + md.id, {
      view: md.view || { r: 12, th: 0.5, ph: 1.15, target: [0, 1.6, 0] },
      build(S) {
        const THREE = S.THREE, o = S.o;
        S.hideFloor();
        const holder = S.group(); holder.position.y = md.y != null ? md.y : 1.6;
        o.holder = holder; o.parts = {}; o.labels = {}; o.spin = true; o.t0 = 0;
        const P = (pid, dir, dist) => { const g = new THREE.Group(); holder.add(g); g.userData.pid = pid; g.userData.dir = new THREE.Vector3(...(dir || [0, 0, 0])).normalize(); g.userData.dist = dist == null ? 2 : dist; o.parts[pid] = o.parts[pid] || []; o.parts[pid].push(g); return g; };
        builder(S, P, THREE, o);
        // parçaların asıl konumları ve özgün malzemeleri
        Object.keys(o.parts).forEach((pid) => o.parts[pid].forEach((g) => { g.userData.base = g.position.clone(); g.traverse((m) => { if (m.isMesh) { m.userData.pid = pid; if (m.material && m.material.emissive) m.userData.em0 = m.material.emissive.getHex(); } }); }));
        md.parts.forEach(([pid, nm]) => { const lb = S.label(L2(nm), "#ffffff", 0.42, holder); lb.visible = false; o.labels[pid] = lb; });
      },
      update(S, p, t) {
        const o = S.o; p = p || {};
        const ex = Math.max(0, Math.min(1, Number(p.ex) || 0));
        const dtm = Math.max(0, Math.min(0.1, (t || 0) - (o.lastT == null ? (t || 0) : o.lastT))); o.lastT = t || 0;   // kare hızından bağımsız
        if (p.spin !== false) o.holder.rotation.y += 0.24 * dtm;
        if (md.anim) md.anim(S, t, ex);
        Object.keys(o.parts).forEach((pid) => o.parts[pid].forEach((g) => {
          const b = g.userData.base; g.position.set(b.x + g.userData.dir.x * g.userData.dist * ex, b.y + g.userData.dir.y * g.userData.dist * ex, b.z + g.userData.dir.z * g.userData.dist * ex);
          const on = p.sel === pid, dim = p.sel && !on;
          g.traverse((m) => { if (!m.isMesh || !m.material) return; const mats = Array.isArray(m.material) ? m.material : [m.material];
            mats.forEach((mt) => { if (mt.emissive) mt.emissive.setHex(on ? 0x335577 : (m.userData.em0 || 0)); if (mt.userData.op0 == null) mt.userData.op0 = mt.transparent ? mt.opacity : 1; mt.transparent = mt.transparent || dim; mt.opacity = dim ? Math.min(mt.userData.op0, 0.25) : mt.userData.op0; }); });
        }));
        // etiket: seçili parçada, ya da açıldıkça hepsinde
        Object.keys(o.labels).forEach((pid) => {
          const lb = o.labels[pid], gs = o.parts[pid]; if (!gs || !gs.length) return;
          lb.visible = p.sel === pid || (ex > 0.45 && !p.sel);
          if (lb.visible) { const g = gs[0], box = new S.THREE.Box3().setFromObject(g); const c = box.getCenter(new S.THREE.Vector3()); o.holder.worldToLocal(c); lb.position.set(c.x, (box.isEmpty() ? c.y : o.holder.worldToLocal(box.max.clone()).y) + 0.45, c.z); }
        });
      },
      /** dokunma: parçayı seç (yörüngeyi engellemez) */
      pointer(S, type, nx, ny) {
        if (type !== "down") return false;
        const hit = S.ray(nx, ny).intersectObject(S.o.holder, true).find((h) => h.object.userData.pid && h.object.visible && (!h.object.material || h.object.material.opacity > 0.3));
        S.o.lastPick = hit ? hit.object.userData.pid : null; S.o.pickAt = performance.now();
        return false;
      }
    });
  }

  const sph = (S, r, col, parent, op, seg) => { const m = S.sphere(r, op != null ? S.M(col, { transparent: true, opacity: op, depthWrite: op > 0.6 }) : col, parent, seg || 24); return m; };

  /* ---- Hayvan hücresi ---- */
  makeModelDef(MODELS[0], (S, P, THREE) => {
    const zar = P("zar", [0, 1, 0], 2.6); sph(S, 3, 0x7fb7e6, zar, 0.18, 40).scale.set(1, 0.82, 1);
    const ck = P("cekirdek", [0, 0, 1], 2); sph(S, 1.05, 0x8e6cd8, ck, 0.75);
    const ckc = P("cekirdekcik", [0, 0, 1], 3.2); sph(S, 0.38, 0x4b2d9a, ckc);
    [[1.9, 0.4, 0.6, 0.6], [-1.7, -0.6, 0.9, -0.4], [0.6, -1.1, -1.6, 1.2]].forEach(([x, y, z, r]) => { const g = P("mito", [x, y, z], 1.8); g.position.set(x, y, z); g.rotation.set(r, r * 2, 0); const m = new THREE.Mesh(new THREE.CapsuleGeometry(0.28, 0.8, 8, 16), S.M(0xe0703c)); g.add(m); });
    const er = P("er", [-1, 0.4, -0.5], 1.8); [1.4, 1.65, 1.9].forEach((rr) => { const m = new THREE.Mesh(new THREE.TorusGeometry(rr, 0.07, 8, 40, Math.PI * 1.1), S.M(0x3fa58c)); m.rotation.set(Math.PI / 2, 0, 2.3); er.add(m); });
    const go = P("golgi", [1, 0.3, -1], 2); go.position.set(1.2, 0.5, -1.3); [0, 0.18, 0.36, 0.54].forEach((dy, i) => { const m = new THREE.Mesh(new THREE.TorusGeometry(0.55 - i * 0.06, 0.06, 6, 24, Math.PI), S.M(0xe8b84a)); m.position.y = dy; m.rotation.x = Math.PI / 2; go.add(m); });
    const lz = P("lizozom", [-1, -1, 1], 1.6); [[-1.2, -1.2, 1.3], [0.4, 1.4, 1.2]].forEach(([x, y, z]) => { const m = sph(S, 0.22, 0xd94f7a, lz); m.position.set(x, y, z); });
    const se = P("sentrozom", [1, 1, 1], 1.8); se.position.set(-0.4, 1.5, 0.9); [0, Math.PI / 2].forEach((r) => { const m = S.cyl(0.08, 0.08, 0.45, 0x9ad45b, se, 10); m.rotation.z = r; });
    const rb = P("ribozom", [0, -1, 0], 1.6); for (let i = 0; i < 46; i++) { const a = i * 2.399, rr = 1.5 + (i % 5) * 0.25, m = sph(S, 0.06, 0x404040, rb, null, 8); m.position.set(Math.cos(a) * rr, Math.sin(i * 1.7) * 1.2, Math.sin(a) * rr); }
  });
  /* ---- Bitki hücresi ---- */
  makeModelDef(MODELS[1], (S, P, THREE) => {
    const du = P("duvar", [0, 1, 0], 2.8); const box = new THREE.Mesh(new THREE.BoxGeometry(6, 4.4, 4.4), S.M(0x6fae3e, { transparent: true, opacity: 0.16, depthWrite: false })); du.add(box);
    const ed = new THREE.LineSegments(new THREE.EdgesGeometry(box.geometry), new THREE.LineBasicMaterial({ color: 0x9fdc6a })); du.add(ed);
    const za = P("zar", [0, -1, 0], 1.6); const zb = new THREE.Mesh(new THREE.BoxGeometry(5.6, 4, 4), S.M(0x7fb7e6, { transparent: true, opacity: 0.12, depthWrite: false })); za.add(zb);
    const ko = P("koful", [0, 0, 1], 1.8); const k = sph(S, 1.4, 0x6fc3ff, ko, 0.45); k.scale.set(1.3, 1, 1);
    const kl = P("klor", [1, 0, 0], 2); [[2, 1.2, 1.2], [2.1, -1.1, 0.8], [-2.1, 1.1, -1], [-2, -1.2, 1.1]].forEach(([x, y, z]) => { const m = sph(S, 0.4, 0x2f9e44, kl); m.scale.set(1.5, 0.7, 0.9); m.position.set(x, y, z); });
    const ck = P("cekirdek", [-1, 0, -1], 2); ck.position.set(-1.7, 0.2, -1); sph(S, 0.7, 0x8e6cd8, ck, 0.8);
    const mi = P("mito", [0, -1, -1], 1.8); [[0.6, -1.4, -1.3], [-0.9, -1.3, 1.4]].forEach(([x, y, z]) => { const m = new THREE.Mesh(new THREE.CapsuleGeometry(0.2, 0.55, 6, 12), S.M(0xe0703c)); m.position.set(x, y, z); m.rotation.z = 1.2; mi.add(m); });
  });
  /* ---- Kalp ---- */
  makeModelDef(Object.assign(MODELS[2], { view: { r: 13.5, th: 0, ph: 1.3, target: [0, 1.8, 0] } }), (S, P) => {
    const R = 0xd64545, B = 0x3a63c9;
    const ch = (pid, col, x, y, sx, sy, dir) => { const g = P(pid, dir, 1.6); g.position.set(x, y, 0); const m = sph(S, 1, col, g, null, 32); m.scale.set(sx, sy, 0.95); return g; };
    ch("sagku", B, -1.15, 1.3, 0.85, 0.75, [-1, 1, 0]); ch("solku", R, 1.15, 1.3, 0.85, 0.75, [1, 1, 0]);
    ch("sagka", B, -0.75, -0.45, 1.05, 1.35, [-1, -1, 0]); ch("solka", R, 0.8, -0.55, 1.2, 1.5, [1, -1, 0]);
    const ao = P("aort", [0.4, 1, 0], 1.8); S.tube([[0.5, 0.6, 0.2], [0.4, 2.6, 0.2], [-0.3, 3.3, 0.1], [-1, 2.9, 0], [-1.1, 1.8, -0.2]], 0.32, R, ao);
    const aa = P("akat", [-0.3, 1, 1], 1.8); S.tube([[-0.4, 0.6, 0.6], [-0.2, 2.2, 0.8], [0.9, 2.6, 0.7], [1.8, 2.5, 0.4]], 0.26, B, aa);
    const tp = P("toplar", [-1, 0, -1], 1.8); S.tube([[-1.3, 1.6, -0.3], [-1.4, 3.4, -0.4]], 0.28, B, tp); S.tube([[-1.3, 0.9, -0.3], [-1.4, -1.6, -0.6]], 0.28, B, tp);
  });
  /* ---- DNA ---- */
  makeModelDef(Object.assign(MODELS[3], { view: { r: 13, th: 0.2, ph: 1.35, target: [0, 1.6, 0] }, y: 1.6 }), (S, P, THREE) => {
    const N = 22, H = 7, Rr = 1.2, s1 = [], s2 = [];
    for (let i = 0; i <= N * 4; i++) { const t = i / (N * 4), a = t * Math.PI * 2 * 2.2, y = -H / 2 + t * H; s1.push([Math.cos(a) * Rr, y, Math.sin(a) * Rr]); s2.push([Math.cos(a + Math.PI) * Rr, y, Math.sin(a + Math.PI) * Rr]); }
    const z1 = P("z1", [-1, 0, 0], 1.6); S.tube(s1, 0.13, 0x4a8be0, z1); const z2 = P("z2", [1, 0, 0], 1.6); S.tube(s2, 0.13, 0xe0a458, z2);
    const at = P("at", [0, 0, 0], 0), gc = P("gc", [0, 0, 0], 0);
    for (let i = 1; i < N; i++) {
      const t = i / N, a = t * Math.PI * 2 * 2.2, y = -H / 2 + t * H, isAT = (i * 7) % 3 !== 0;
      const g = isAT ? at : gc, c1 = isAT ? 0x46b866 : 0xd94f4f, c2 = isAT ? 0xe0d24a : 0x4ab3d9;
      const half = (sign, col) => { const m = S.cyl(0.07, 0.07, Rr, col, g, 8); m.position.set(Math.cos(a + (sign < 0 ? Math.PI : 0)) * Rr / 2, y, Math.sin(a + (sign < 0 ? Math.PI : 0)) * Rr / 2); m.rotation.set(0, -a, Math.PI / 2); m.userData.side = sign; m.userData.a = a; return m; };
      half(1, c1).userData.x0 = Math.cos(a) * Rr / 2; half(-1, c2).userData.x0 = Math.cos(a + Math.PI) * Rr / 2;
    }
  });
  MODELS[3].anim = (S, t, ex) => {   // açılırken baz çiftleri de iki yana ayrılır
    // her yarım baz kendi zinciriyle birlikte kayar: 1. zincir sola, 2. zincir sağa (fermuar gibi açılır)
    [].concat(S.o.parts.at || [], S.o.parts.gc || []).forEach((g) => g.children.forEach((m) => { if (m.userData.x0 == null) return; m.position.x = m.userData.x0 + (m.userData.side > 0 ? -1 : 1) * 1.6 * ex; }));
  };
  /* ---- Atom ---- */
  makeModelDef(Object.assign(MODELS[4], { view: { r: 12, th: 0.6, ph: 1.1, target: [0, 1.6, 0] } }), (S, P, THREE) => {
    const ck = P("cekirdek", [0, 1, 0], 0); for (let i = 0; i < 12; i++) { const a = i * 2.399, r = 0.22 * Math.cbrt(i + 1), m = sph(S, 0.14, i % 2 ? 0xd64545 : 0x9aa4b2, ck, null, 12); m.position.set(Math.cos(a) * r, Math.sin(i * 1.3) * r, Math.sin(a) * r); }
    sph(S, 0.9, 0x5fa8ff, P("s1", [0, 0, 0], 0), 0.28, 32);
    sph(S, 1.9, 0x8fd0ff, P("s2", [0, 0, 0], 0), 0.12, 40);
    const lobe = (g, col, axis) => { [1, -1].forEach((s) => { const m = sph(S, 0.75, col, g, 0.45, 24); m.scale.set(1.6, 0.75, 0.75); const v = new THREE.Vector3(...axis).multiplyScalar(1.45 * s); m.position.copy(v); if (axis[1]) m.rotation.z = Math.PI / 2; if (axis[2]) m.rotation.y = Math.PI / 2; }); };
    lobe(P("px", [1, 0, 0], 2.2), 0xe05a5a, [1, 0, 0]); lobe(P("py", [0, 1, 0], 2.2), 0x4caf6a, [0, 1, 0]); lobe(P("pz", [0, 0, 1], 2.2), 0x5a7de0, [0, 0, 1]);
  });
  /* ---- Güneş sistemi ---- */
  const PL = [["merkur", 0.18, 0x9e9e9e, 2.2, 4.1], ["venus", 0.3, 0xe7c27d, 3.0, 1.6], ["dunya", 0.32, 0x3f8fe0, 3.9, 1], ["mars", 0.24, 0xd0583a, 4.8, 0.53], ["jupiter", 0.75, 0xd9a066, 6.3, 0.084], ["saturn", 0.62, 0xe3cf8f, 7.9, 0.034], ["uranus", 0.45, 0x8fdde6, 9.2, 0.012], ["neptun", 0.44, 0x4a6fe0, 10.4, 0.006]];
  makeModelDef(Object.assign(MODELS[5], { view: { r: 22, th: 0.3, ph: 1.05, target: [0, 1, 0] }, y: 1 }), (S, P, THREE, o) => {
    const g0 = P("gunes", [0, 0, 0], 0); sph(S, 1.2, 0xffc93c, g0, null, 40).material.emissive.setHex(0xff9a1a);
    o.pl = [];
    PL.forEach(([id, r, col, d, sp]) => {
      const orb = new THREE.Mesh(new THREE.TorusGeometry(d, 0.015, 6, 120), new THREE.MeshBasicMaterial({ color: 0x5a6a80, transparent: true, opacity: 0.5 })); orb.rotation.x = Math.PI / 2; o.holder.add(orb);
      const g = P(id, [0, 0, 0], 0); const m = sph(S, r, col, g, null, 24);
      if (id === "saturn") { const ring = new THREE.Mesh(new THREE.RingGeometry(r * 1.3, r * 2.1, 40), S.M(0xd8c690, { side: THREE.DoubleSide, transparent: true, opacity: 0.8 })); ring.rotation.x = Math.PI / 2.3; g.add(ring); }
      o.pl.push({ g, d, sp, a: Math.random() * 6.28, orb });
    });
  });
  MODELS[5].anim = (S, t, ex) => { S.o.pl.forEach((p) => { p.a += p.sp * 0.01; const d = p.d * (1 + ex * 0.6); p.g.userData.base.set(Math.cos(p.a) * d, 0, Math.sin(p.a) * d); p.orb.scale.setScalar(1 + ex * 0.6); }); };
  /* ---- NaCl ---- */
  makeModelDef(Object.assign(MODELS[6], { view: { r: 11, th: 0.7, ph: 1.05, target: [0, 1.6, 0] } }), (S, P) => {
    const na = P("na", [-1, 0, 0], 1.6), cl = P("cl", [1, 0, 0], 1.6), a = 1.1;
    for (let x = -1; x <= 1; x++) for (let y = -1; y <= 1; y++) for (let z = -1; z <= 1; z++) {
      const isNa = (x + y + z + 3) % 2 === 0, m = sph(S, isNa ? 0.28 : 0.46, isNa ? 0x9b6be0 : 0x4cc46a, isNa ? na : cl, null, 20); m.position.set(x * a, y * a, z * a);
    }
    const lines = []; for (let i = -1; i <= 1; i++) for (let j = -1; j <= 1; j++) { lines.push([[-a, i * a, j * a], [a, i * a, j * a]], [[i * a, -a, j * a], [i * a, a, j * a]], [[i * a, j * a, -a], [i * a, j * a, a]]); }
    lines.forEach(([p1, p2]) => { const ln = S.line(0x7f8a99, 2, S.o.holder, { opacity: 0.45 }); ln.setPoints([p1, p2]); });
  });
  /* ---- Elmas ve grafit ---- */
  makeModelDef(Object.assign(MODELS[7], { view: { r: 13, th: 0.4, ph: 1.15, target: [0, 1.6, 0] } }), (S, P, THREE) => {
    const el = P("elmas", [-1, 0, 0], 2.2); el.position.x = -2.2;
    const pos = []; const fcc = [[0, 0, 0], [0, 2, 2], [2, 0, 2], [2, 2, 0]]; fcc.forEach((p) => { pos.push(p); pos.push([p[0] + 1, p[1] + 1, p[2] + 1]); });
    const k = 0.75; const v = pos.map((p) => new THREE.Vector3((p[0] - 1.5) * k, (p[1] - 1.5) * k, (p[2] - 1.5) * k));
    v.forEach((q) => { const m = sph(S, 0.2, 0x8fd8ff, el, null, 16); m.position.copy(q); });
    for (let i = 0; i < v.length; i++) for (let j = i + 1; j < v.length; j++) if (v[i].distanceTo(v[j]) < 1.4 * k + 0.01) { const ln = S.line(0xbfefff, 2, el); ln.setPoints([v[i].toArray(), v[j].toArray()]); }
    const gr = P("grafit", [1, 0, 0], 2.2); gr.position.x = 2.4;
    [-0.9, 0, 0.9].forEach((y, li) => { for (let i = 0; i < 6; i++) { const a = (i / 6) * Math.PI * 2 + (li % 2) * 0.5; const p1 = [Math.cos(a) * 0.9, y, Math.sin(a) * 0.9], a2 = ((i + 1) / 6) * Math.PI * 2 + (li % 2) * 0.5, p2 = [Math.cos(a2) * 0.9, y, Math.sin(a2) * 0.9]; const m = sph(S, 0.17, 0x5a5f66, gr, null, 12); m.position.set(...p1); const ln = S.line(0xaab0b8, 2, gr); ln.setPoints([p1, p2]); } });
  });
  /* ---- Yer'in iç yapısı ---- */
  makeModelDef(Object.assign(MODELS[8], { view: { r: 12, th: 0.9, ph: 1.15, target: [0, 1.6, 0] } }), (S, P, THREE) => {
    const cut = (r, col, pid, dir) => { const g = P(pid, dir, 1.5); const m = new THREE.Mesh(new THREE.SphereGeometry(r, 48, 32, 0, Math.PI * 1.5), S.M(col, { side: THREE.DoubleSide })); g.add(m);
      [0, Math.PI * 1.5].forEach((ph) => { const c = new THREE.Mesh(new THREE.CircleGeometry(r, 48, 0, Math.PI), S.M(col, { side: THREE.DoubleSide })); c.rotation.y = -ph + Math.PI / 2; c.rotation.z = Math.PI / 2; g.add(c); }); return g; };
    cut(3, 0x4f8f4a, "kabuk", [1, 0.4, 1]); cut(2.8, 0xd9772f, "manto", [0.6, 0.3, 0.6]); cut(1.6, 0xf2b234, "dis", [0.3, 0.2, 0.3]); cut(0.85, 0xfff1a8, "ic", [0, 0, 0]);
  });
  /* ---- Nöron ---- */
  makeModelDef(Object.assign(MODELS[9], { view: { r: 13, th: 0, ph: 1.4, target: [0, 1.6, 0] } }), (S, P) => {
    const gv = P("govde", [0, 1, 0], 0.8); gv.position.x = -3; sph(S, 0.8, 0xe08acb, gv, null, 28); sph(S, 0.3, 0x7a3fa0, gv);
    const de = P("dendrit", [-1, 0.5, 0], 1.4); de.position.x = -3; for (let i = 0; i < 7; i++) { const a = (i / 7) * Math.PI * 2; S.tube([[0, 0, 0], [Math.cos(a) * 1.2, Math.sin(a) * 1.2, 0.3 * Math.sin(i)], [Math.cos(a + 0.3) * 2, Math.sin(a + 0.3) * 2, 0.5 * Math.cos(i)]], 0.07, 0xe08acb, de); }
    const ak = P("akson", [0, -1, 0], 0.6); S.tube([[-2.2, 0, 0], [3.6, 0, 0]], 0.1, 0xd9a0d0, ak);
    const my = P("miyelin", [0, 1, 0], 1.2); const rv = P("ranvier", [0, -1, 0], 1.2);
    for (let i = 0; i < 5; i++) { const x = -1.5 + i * 1.1; const m = S.cyl(0.26, 0.26, 0.85, 0xf3ead2, my, 16); m.rotation.z = Math.PI / 2; m.position.x = x; if (i < 4) { const r2 = sph(S, 0.12, 0x5ad1e6, rv, null, 10); r2.position.x = x + 0.55; } }
    const uc = P("uc", [1, 0, 0], 1.4); uc.position.x = 3.6; for (let i = 0; i < 5; i++) { const a = -0.8 + i * 0.4; S.tube([[0, 0, 0], [Math.cos(a) * 0.9, Math.sin(a) * 0.9, 0]], 0.05, 0xd9a0d0, uc); const b = sph(S, 0.14, 0xffd166, uc, null, 10); b.position.set(Math.cos(a) * 0.95, Math.sin(a) * 0.95, 0); }
  });

  // Additional original teaching meshes; geometry is schematic, not anatomical scale.
  const extras = [
    {id:'alveol',icon:'🫁',subject:'biyoloji',name:['Alveol ve gaz alışverişi','Alveolus and gas exchange'],keys:['solunum','alveol'],desc:['Hava kesesi ve çevresindeki kılcal damar; ölçekli anatomi değildir.','Air sac and surrounding capillary; not anatomical scale.'],parts:[['kese',['Alveol','Alveolus'],['İnce yüzeyde oksijen ve karbondioksit difüzyonla taşınır.','Oxygen and carbon dioxide diffuse across the thin surface.']],['damar',['Kılcal damar','Capillary'],['Damar ağı gaz alışveriş yüzeyini çevreler.','Capillaries surround the exchange surface.']]]},
    {id:'nefron',icon:'🫘',subject:'biyoloji',name:['Nefron','Nephron'],keys:['boşaltım','böbrek','nefron'],desc:['Süzülme ve geri emilim bölgelerinin şematik modeli.','Schematic filtration and reabsorption regions.'],parts:[['glomerul',['Glomerül','Glomerulus'],['Kılcal damar yumağında kan plazmasının bir bölümü süzülür.','A fraction of plasma is filtered from the capillary tuft.']],['tup',['Böbrek tüpü','Renal tubule'],['Geri emilim ve salgılama süzüntünün bileşimini değiştirir.','Reabsorption and secretion alter filtrate composition.']]]},
    {id:'iyon-kristal',icon:'🧂',subject:'kimya',name:['NaCl iyon kristali','NaCl ionic crystal'],keys:['iyon','kristal','iyonik'],desc:['Zıt yüklü iyonların kübik örgüde yerleşimi; renkler temsilidir.','Cubic arrangement of opposite ions; colours are symbolic.'],parts:[['na',['Na⁺','Na⁺'],['Sodyum katyonu; iç örgüde altı klorür komşusu vardır.','Sodium cation; six chloride neighbours in the bulk lattice.']],['cl',['Cl⁻','Cl⁻'],['Klorür anyonu; çizim tek bir NaCl molekülü değildir.','Chloride anion; the lattice is not a single NaCl molecule.']]]},
    {id:'kondansator',icon:'⚡',subject:'fizik',name:['Paralel levhalı kondansatör','Parallel-plate capacitor'],keys:['kondansatör','elektrik alan','sığa'],desc:['İki levha, dielektrik ve kenarlardan uzaktaki yaklaşık düzgün alan.','Two plates, dielectric and approximately uniform interior field.'],parts:[['arti',['Pozitif levha','Positive plate'],['Alan yönü pozitif levhadan negatif levhaya doğrudur.','Field direction is from positive to negative plate.']],['eksi',['Negatif levha','Negative plate'],['Eşit büyüklükte zıt yük; ideal modelde C=εA/d.','Equal opposite charge; ideal capacitance C=εA/d.']],['alan',['Alan çizgileri','Field lines'],['İç bölgede düzgün alan yaklaşımı; kenar etkileri gösterilmez.','Uniform interior approximation; fringing omitted.']]]}
  ];
  extras.forEach(md=>{
    MODELS.push(md);
    makeModelDef(md,(S,P,THREE)=>{
      if(md.id==='alveol'){
        const sac=P('kese',[0,1,0],1.4);sph(S,1.7,0xf4a6b8,sac,.55,40);
        const cap=P('damar',[1,0,0],1.4);
        for(let i=0;i<4;i++){const m=new THREE.Mesh(new THREE.TorusGeometry(1.85,.09,8,48),S.M(i%2?0xe05060:0x568ee8));m.rotation.set(i*.55,.7,i*.8);cap.add(m);}
      }else if(md.id==='nefron'){
        const gl=P('glomerul',[-1,1,0],1);gl.position.set(-1.5,1,0);for(let i=0;i<5;i++){const m=new THREE.Mesh(new THREE.TorusGeometry(.5,.07,8,32),S.M(0xe86688));m.rotation.set(i*.7,i*.4,0);gl.add(m);}
        const tube=P('tup',[1,-1,0],1.5);S.tube([[-1,1,0],[0,.7,0],[.5,-1.8,0],[1,-2,0],[1.5,-1.8,0],[1.8,1,0],[2.8,.8,0]],.16,0xe4c18c,tube);
      }else if(md.id==='iyon-kristal'){
        const a=P('na',[-1,0,0],1),b=P('cl',[1,0,0],1);
        for(let x=-1;x<=1;x++)for(let y=-1;y<=1;y++)for(let z=-1;z<=1;z++){const even=(x+y+z+3)%2===0;const m=sph(S,even?.28:.42,even?0x9a82ed:0x6cc996,even?a:b);m.position.set(x*1.25,y*1.25,z*1.25);}
      }else{
        const a=P('arti',[-1,0,0],1),b=P('eksi',[1,0,0],1),f=P('alan',[0,1,0],1);
        S.box(.15,3,3,0xe96e78,a).position.x=-1.5;S.box(.15,3,3,0x639ce8,b).position.x=1.5;
        for(let y=-1;y<=1;y++)for(let z=-1;z<=1;z++)f.add(new THREE.ArrowHelper(new THREE.Vector3(1,0,0),new THREE.Vector3(-1.35,y,z),2.7,0xf6d67d,.3,.15));
      }
    });
  });

  /* =========================================================
     Elle molekül kurma
     ========================================================= */
  const EL = { H: [1, 0xf2f2f2, 0.32], C: [4, 0x404040, 0.5], N: [3, 0x3f6fe0, 0.48], O: [2, 0xe04040, 0.46], F: [1, 0x8fe08f, 0.4], Cl: [1, 0x3fc94a, 0.55], B: [3, 0xf2a0a0, 0.48], S: [2, 0xf2d03f, 0.56] };
  // hedefler: merkez, uçlar, bağ derecesi, şekil, açı, ortaklanmamış çift (merkezde), kutupluluk
  const MOL = [
    { id: "H2", f: "H₂", c: "H", o: ["H"], bo: 1, shape: ["Doğrusal", "Linear"], ang: 180, lp: 0, pol: false },
    { id: "HCl", f: "HCl", c: "Cl", o: ["H"], bo: 1, shape: ["Doğrusal", "Linear"], ang: 180, lp: 3, pol: true },
    { id: "O2", f: "O₂", c: "O", o: ["O"], bo: 2, shape: ["Doğrusal (çift bağ)", "Linear (double bond)"], ang: 180, lp: 2, pol: false },
    { id: "N2", f: "N₂", c: "N", o: ["N"], bo: 3, shape: ["Doğrusal (üçlü bağ)", "Linear (triple bond)"], ang: 180, lp: 1, pol: false },
    { id: "H2O", f: "H₂O", c: "O", o: ["H", "H"], bo: 1, shape: ["Açısal (kırık doğru)", "Bent"], ang: 104.5, lp: 2, pol: true },
    { id: "CO2", f: "CO₂", c: "C", o: ["O", "O"], bo: 2, shape: ["Doğrusal", "Linear"], ang: 180, lp: 0, pol: false },
    { id: "BF3", f: "BF₃", c: "B", o: ["F", "F", "F"], bo: 1, shape: ["Düzlem üçgen", "Trigonal planar"], ang: 120, lp: 0, pol: false },
    { id: "NH3", f: "NH₃", c: "N", o: ["H", "H", "H"], bo: 1, shape: ["Üçgen piramit", "Trigonal pyramidal"], ang: 107, lp: 1, pol: true },
    { id: "CH4", f: "CH₄", c: "C", o: ["H", "H", "H", "H"], bo: 1, shape: ["Düzgün dörtyüzlü", "Tetrahedral"], ang: 109.5, lp: 0, pol: false },
    { id: "CCl4", f: "CCl₄", c: "C", o: ["Cl", "Cl", "Cl", "Cl"], bo: 1, shape: ["Düzgün dörtyüzlü", "Tetrahedral"], ang: 109.5, lp: 0, pol: false }
  ];
  /** VSEPR: uç atomların ideal yönleri (birim vektör) */
  function idealDirs(m) {
    const n = m.o.length, d2r = Math.PI / 180;
    if (n === 1) return [[1, 0, 0]];
    if (n === 2 && m.ang === 180) return [[1, 0, 0], [-1, 0, 0]];
    if (n === 2) { const h = (m.ang / 2) * d2r; return [[Math.sin(h), -Math.cos(h), 0], [-Math.sin(h), -Math.cos(h), 0]]; }
    if (n === 3 && m.ang === 120) return [0, 1, 2].map((i) => [Math.cos((i * 2 * Math.PI) / 3), 0, Math.sin((i * 2 * Math.PI) / 3)]);
    if (n === 3) { const t = 111.85 * d2r; return [0, 1, 2].map((i) => { const a = (i * 2 * Math.PI) / 3; return [Math.sin(t) * Math.cos(a), Math.cos(t), Math.sin(t) * Math.sin(a)]; }); }
    const k = 1 / Math.sqrt(3); return [[k, k, k], [-k, -k, k], [-k, k, -k], [k, -k, -k]];
  }
  D3("molekul", {
    view: { r: 8.6, th: 0, ph: 1.3, target: [0, 1.6, 0] },
    build(S) {
      const o = S.o; S.hideFloor();
      o.g = S.group(); o.g.position.y = 1.6; o.atoms = []; o.bonds = []; o.grab = null; o.done = null; o.snap = 0; o.lpObj = [];
      o.msg = null;
      S.hand.hook((ev) => handHook(S, ev));
    },
    update(S, p, t) {
      const o = S.o;
      if (p && p.target && p.target !== o.tid) setTarget(S, p.target);
      const dtm = Math.max(0, Math.min(0.1, (t || 0) - (o.lastT == null ? (t || 0) : o.lastT))); o.lastT = t || 0;
      if (o.done && o.snap < 1) { o.snap = Math.min(1, o.snap + 2.4 * Math.max(dtm, 1 / 60)); const k = 1 - Math.pow(0.82, Math.max(1, dtm * 60)); o.atoms.forEach((a) => { if (a.goal) { if (o.snap >= 1) a.m.position.copy(a.goal); else a.m.position.lerp(a.goal, k); } }); }
      if (o.done) o.g.rotation.y += 0.3 * dtm;
      o.atoms.forEach((a) => { if (a.lb) a.lb.position.copy(a.m.position).add(new S.THREE.Vector3(0, EL[a.e][2] + 0.25, 0)); if (a.ring) { a.ring.visible = a === o.grab || a === o.hover; a.ring.position.copy(a.m.position); a.ring.lookAt(S.camera.position); } });
      drawBonds(S);
    },
    pointer(S, type, nx, ny) {
      const o = S.o;
      if (type === "hover") { const a = pickAtom(S, nx, ny); if (a !== o.hover) { o.hover = a; } return false; }
      if (type === "down") { const a = pickAtom(S, nx, ny); if (!a || o.done) return false; grabStart(S, a); return true; }
      if (type === "move" && o.grab) { moveTo(S, nx, ny); return true; }
      if (type === "up" && o.grab) { release(S); return true; }
      return false;
    }
  });
  function pickAtom(S, nx, ny) {
    const o = S.o; const hits = S.ray(nx, ny).intersectObjects(o.atoms.map((a) => a.m), false);
    if (hits.length) return o.atoms.find((a) => a.m === hits[0].object) || null;
    // yakın değilse ekranda en yakın atom (el imleci için toleranslı)
    let best = null, bd = 0.09; const v = new S.THREE.Vector3();
    o.atoms.forEach((a) => { a.m.getWorldPosition(v); v.project(S.camera); const d = Math.hypot((v.x + 1) / 2 - nx, (1 - v.y) / 2 - ny); if (d < bd) { bd = d; best = a; } });
    return best;
  }
  function grabStart(S, a) { const o = S.o; o.grab = a; a.m.scale.setScalar(1.15); breakBonds(S, a); o.msg = null; }
  function moveTo(S, nx, ny) { const o = S.o; const w = new S.THREE.Vector3(); o.g.getWorldPosition(w); const p = S.planePoint(nx, ny, w); if (!p) return; o.g.worldToLocal(p); p.clampLength(0, 4.2); o.grab.m.position.copy(p); }
  function release(S) {
    const o = S.o, a = o.grab; if (!a) return; o.grab = null; a.m.scale.setScalar(1);
    // menzildeki atomlardan bağ kurulabilecek olanı seç (en yakın geçerli aday); hiçbiri uygun değilse en yakınının nedenini söyle
    const cands = o.atoms.filter((b) => b !== a).map((b) => ({ b, d: a.m.position.distanceTo(b.m.position) })).filter((x) => x.d < (EL[a.e][2] + EL[x.b.e][2]) * 2.1).sort((x, y) => x.d - y.d);
    const ok = cands.find((x) => bondProblem(S, a, x.b) == null);
    if (ok) tryBond(S, a, ok.b);
    else if (cands.length) tryBond(S, a, cands[0].b);
    S.o.onChange && S.o.onChange();
  }
  const used = (S, a) => S.o.bonds.filter((b) => b.a === a || b.b === a).reduce((s, b) => s + b.n, 0);
  /** Bu iki atom bağlanamıyorsa nedeni ([tr, en]); bağlanabiliyorsa null */
  function bondProblem(S, a, b) {
    const o = S.o, m = o.target;
    if (o.bonds.some((x) => (x.a === a && x.b === b) || (x.a === b && x.b === a))) return ["Bu iki atom zaten bağlı.", "Already bonded."];
    const va = EL[a.e][0] - used(S, a), vb = EL[b.e][0] - used(S, b);
    if (va <= 0 || vb <= 0) { const full = va <= 0 ? a : b; return [full.e + " atomunun bağ yapacak boş elektronu kalmadı (değerliği " + EL[full.e][0] + ").", full.e + " has no free valence left (" + EL[full.e][0] + ")."]; }
    if (m && m.o.length > 1 && a.e !== m.c && b.e !== m.c) return [m.f + " molekülünde merkez atom " + m.c + "; diğer atomlar ona bağlanır. " + a.e + "–" + b.e + " bağı bu molekülde yok.", "In " + m.f + " the central atom is " + m.c + "; others bond to it."];
    return null;
  }
  function tryBond(S, a, b) {
    const o = S.o, pr = bondProblem(S, a, b);
    if (pr) { o.msg = { ok: false, tr: pr[0], en: pr[1] }; return; }
    o.bonds.push({ a, b, n: 1, obj: null });
    // üst üste binmesin: bırakılan atom bağlandığı atomdan bağ uzunluğu kadar uzağa yerleşir
    const d = a.m.position.clone().sub(b.m.position); if (d.lengthSq() < 1e-4) d.set(1, 0.3, 0);
    a.m.position.copy(b.m.position).add(d.normalize().multiplyScalar(EL[a.e][2] + EL[b.e][2] + 0.55));
    check(S);
  }
  function breakBonds(S, a) { const o = S.o; o.bonds = o.bonds.filter((x) => { if (x.a === a || x.b === a) { (x.objs || []).forEach((c) => o.g.remove(c)); return false; } return true; }); o.done = null; o.snap = 0; o.lpObj.forEach((x) => o.g.remove(x)); o.lpObj = []; if (o.angLb) o.angLb.visible = false; }
  function check(S) {
    const o = S.o, m = o.target; if (!m) return;
    const c = m.o.length === 1 ? o.atoms[0] : o.atoms.find((x) => x.e === m.c);
    const others = o.atoms.filter((x) => x !== c);
    const allBonded = others.every((x) => o.bonds.some((b) => (b.a === x && b.b === c) || (b.b === x && b.a === c)));
    if (!allBonded) { const left = others.filter((x) => !o.bonds.some((b) => (b.a === x || b.b === x))).length; o.msg = { ok: null, tr: "Güzel! " + left + " atom daha bağlanacak.", en: "Nice! " + left + " more to bond." }; return; }
    // bağ dereceleri ve geometri
    o.bonds.forEach((b) => { b.n = m.bo; });
    const dirs = idealDirs(m), L = m.bo === 1 ? 1.55 : 1.35;
    c.goal = new S.THREE.Vector3(m.o.length === 1 ? -L / 2 : 0, 0, 0);
    others.forEach((x, i) => { const d = dirs[i]; x.goal = m.o.length === 1 ? new S.THREE.Vector3(L / 2, 0, 0) : new S.THREE.Vector3(d[0] * L, d[1] * L, d[2] * L); });
    o.done = m; o.snap = 0;
    // ortaklanmamış elektron çiftleri (merkez atomda, yarı saydam loblar)
    if (m.lp && m.o.length > 1) {
      const lpd = m.id === "H2O" ? [[0, 0.6, 0.8], [0, 0.6, -0.8]] : m.id === "NH3" ? [[0, 1, 0]] : [];
      lpd.forEach((d) => { const v = new S.THREE.Vector3(...d).normalize(); const lb = new S.THREE.Mesh(new S.THREE.SphereGeometry(0.32, 16, 12), S.M(0xbf8fff, { transparent: true, opacity: 0.4, depthWrite: false })); lb.scale.set(0.7, 1.4, 0.7); lb.position.copy(v.clone().multiplyScalar(0.75)); lb.quaternion.setFromUnitVectors(new S.THREE.Vector3(0, 1, 0), v); o.g.add(lb); o.lpObj.push(lb); });
    }
    if (!o.angLb) o.angLb = S.label("", "#ffd88a", 0.5, o.g);
    o.angLb.visible = true; o.angLb.set(m.f + " · " + T(m.shape[0], m.shape[1]) + (m.o.length > 1 ? " · " + String(m.ang).replace(".", ",") + "°" : "")); o.angLb.position.set(0, -2.3, 0);
    o.msg = { ok: true, tr: m.f + " tamam! " + m.shape[0] + (m.o.length > 1 ? ", bağ açısı " + String(m.ang).replace(".", ",") + "°" : "") + (m.lp && m.o.length > 1 ? "; merkezde " + m.lp + " ortaklanmamış elektron çifti şekli büker" : "") + ". Molekül " + (m.pol ? "polar" : "apolar") + ".",
      en: m.f + " done! " + m.shape[1] + (m.o.length > 1 ? ", " + m.ang + "°" : "") + ". " + (m.pol ? "Polar" : "Nonpolar") + "." };
    const solved = App.prefs.get("molSolved", []) || []; if (solved.indexOf(m.id) < 0) { solved.push(m.id); App.prefs.set("molSolved", solved); }
  }
  function drawBonds(S) {
    const o = S.o, THREE = S.THREE, up = new THREE.Vector3(0, 1, 0);
    o.bonds.forEach((b) => {
      if (!b.objs || b.objs.length !== b.n) { (b.objs || []).forEach((c) => o.g.remove(c)); b.objs = []; for (let i = 0; i < b.n; i++) { const c = new THREE.Mesh(new THREE.CylinderGeometry(0.07, 0.07, 1, 10), S.M(0xcfd6e0)); o.g.add(c); b.objs.push(c); } }
      const p1 = b.a.m.position, p2 = b.b.m.position, d = p2.clone().sub(p1), len = d.length(); if (len < 1e-3) return;
      const q = new THREE.Quaternion().setFromUnitVectors(up, d.clone().normalize());
      const side = new THREE.Vector3(0, 0, 1).cross(d).normalize(); if (side.lengthSq() < 1e-6) side.set(0, 1, 0);
      b.objs.forEach((c, i) => { const off = (i - (b.n - 1) / 2) * 0.2; c.position.copy(p1).add(d.clone().multiplyScalar(0.5)).add(side.clone().multiplyScalar(off)); c.quaternion.copy(q); c.scale.set(1, len, 1); });
    });
  }
  function setTarget(S, id) {
    const o = S.o, THREE = S.THREE, m = MOL.find((x) => x.id === id) || MOL[4];
    o.tid = id; o.target = m;
    o.atoms.forEach((a) => { o.g.remove(a.m); if (a.lb) o.g.remove(a.lb); if (a.ring) o.g.remove(a.ring); }); o.bonds.forEach((b) => (b.objs || []).forEach((c) => o.g.remove(c)));
    o.lpObj.forEach((x) => o.g.remove(x)); o.lpObj = []; if (o.angLb) o.angLb.visible = false;
    o.atoms = []; o.bonds = []; o.done = null; o.snap = 0; o.g.rotation.y = 0; o.grab = null;
    const list = [m.c].concat(m.o);
    list.forEach((e, i) => {
      const [, col, r] = EL[e]; const mesh = new THREE.Mesh(new THREE.SphereGeometry(r, 28, 20), S.M(col, { roughness: 0.35 })); mesh.castShadow = true;
      // merkez atom ortada, diğerleri çevrede eşit aralıklı (ekranda üst üste binmez); iki atomlu moleküllerde iki yanda
      const outer = m.o.length > 1 ? list.length - 1 : list.length, k = m.o.length > 1 ? i - 1 : i;
      if (m.o.length > 1 && i === 0) mesh.position.set(0, 0, 0);
      else { const a = (k / outer) * Math.PI * 2 + Math.PI / 2 + (outer === 2 ? Math.PI / 2 : 0); mesh.position.set(Math.cos(a) * 2.7, Math.sin(a) * 1.75, 0); }
      o.g.add(mesh);
      const lb = S.label(e, "#ffffff", 0.36, o.g);
      const ring = new THREE.Mesh(new THREE.RingGeometry(r * 1.25, r * 1.45, 32), new THREE.MeshBasicMaterial({ color: 0x35e0ff, transparent: true, opacity: 0.85, side: THREE.DoubleSide, depthTest: false })); ring.visible = false; o.g.add(ring);
      o.atoms.push({ e, m: mesh, lb, ring });
    });
    o.msg = { ok: null, tr: "Atomları tutup birbirine yaklaştır: " + m.f + " kur. Merkez atom: " + m.c + ".", en: "Grab atoms and bring them together to build " + m.f + "." };
    S.o.onChange && S.o.onChange();
  }
  /** El kancası: çimdik = atomu tut, çimdiği bırak = bırak (bağ dene); açık el = döndür (varsayılan) */
  function handHook(S, ev) {
    const o = S.o;
    if (ev.stop) { if (o.grab) release(S); return false; }
    const pos = ev.cursor;
    if (ev.g === "pinch" && pos) {
      const cv = S.renderer.domElement.getBoundingClientRect();
      const nx = (pos.cx - cv.left) / (cv.width || 1), ny = (pos.cy - cv.top) / (cv.height || 1);
      if (!o.grab && !o.done) { const a = pickAtom(S, nx, ny); if (a) grabStart(S, a); }
      if (o.grab) { moveTo(S, nx, ny); S.o.onChange && S.o.onChange(); }
      return true;
    }
    if (o.grab) { release(S); }
    if (ev.g === "point" && pos) { const cv = S.renderer.domElement.getBoundingClientRect(); o.hover = pickAtom(S, (pos.cx - cv.left) / cv.width, (pos.cy - cv.top) / cv.height); }
    return false;
  }

  /* =========================================================
     Sayfalar
     ========================================================= */
  const norm = (x) => String(x || "").toLocaleLowerCase("tr");
  /** Modelle ilgili müfredat kazanımları */
  function topicsFor(md) {
    const C = App.data.curriculum, out = [];
    C.grades.forEach((g) => g.subjects.forEach((s) => { if (md.subject && s.id !== md.subject) return; s.units.forEach((u) => u.outcomes.forEach((o) => {
      const tt = norm(App.L(o.title)) + " " + norm(App.L(u.name));
      if (md.keys.some((k) => tt.indexOf(norm(k)) >= 0)) out.push({ key: C.key(g.id, s.id, u.id, o.id), g, s, o });
    })); }));
    return out.slice(0, 8);
  }
  function modelsForTopic(key) {
    const f = App.lessons.find(key); if (!f) return [];
    const tt = norm(App.L(f.outcome.title)) + " " + norm(App.L(f.unit.name));
    const ms = MODELS.filter((md) => (!md.subject || f.subject.id === md.subject) && md.keys.some((k) => tt.indexOf(norm(k)) >= 0));
    if (f.subject.id === "kimya" && /bağ|molekül|vsepr|lewis|kovalent|polar/.test(tt)) ms.push({ id: "molekul", icon: "🧪", name: ["Elle molekül kurma", "Build molecules by hand"] });
    if (f.subject.id === "cografya" && /dünya'nın|şekli|hareket|koordinat|paralel|meridyen|saat|iklim|levha|deprem|volkan|mevsim|iç yapı|kıta|okyanus/.test(tt)) ms.push({ id: "kure", href: "#/kure", icon: "🌐", name: ["3B Dünya Küresi", "3D Globe"] });
    return ms;
  }
  function cardHtml(key) {
    const ms = modelsForTopic(key); if (!ms.length) return "";
    return '<section class="card hm-topic"><div class="card__title">🔮 ' + esc(T("3B model · hologram", "3D model · hologram")) + '</div><div class="hm-topic__list">' +
      ms.map((m) => '<a class="hm-chip" href="' + (m.href || "#/modeller/" + m.id) + '"><span>' + m.icon + "</span>" + esc(L2(m.name)) + "</a>").join("") + "</div></section>";
  }

  let RUN = null;
  function stopRun() { if (!RUN) return; RUN.on = false; cancelAnimationFrame(RUN.raf); window.removeEventListener("da:route", RUN.onRoute); try { RUN.S3.dispose(); } catch (e) { /* yok */ } RUN = null; }

  function library(view) {
    App.setTitle(T("3B Modeller", "3D Models"));
    const solved = (App.prefs.get("molSolved", []) || []).length;
    view.innerHTML = '<div class="page hm">' +
      '<div class="page-head"><div><h1>' + esc(T("3B Modeller ve Hologram", "3D Models and Hologram")) + "</h1><p>" +
        esc(T("Hücreden güneş sistemine 3B modeller: döndür, parçalarına ayır, bir parçaya dokununca adı ve görevi çıksın. Hologramda ve elinle de kontrol edebilirsin.", "3D models from cells to the solar system: rotate, explode into parts, tap a part. Works as a hologram and with hand control.")) + "</p></div></div>" +
      '<a class="card hm-mol" href="#/modeller/molekul"><span class="hm-mol__ico">🧪</span><span><b>' + esc(T("Elle molekül kurma", "Build molecules by hand")) + "</b><small>" +
        esc(T("Atomları tut, birbirine yaklaştır; doğru molekül VSEPR şekline oturur. " + solved + "/" + MOL.length + " molekül kuruldu.", "Grab atoms and bond them; the right molecule snaps into its VSEPR shape. " + solved + "/" + MOL.length + " built.")) + "</small></span>" + App.icon("chevron") + "</a>" +
      '<div class="hm-grid">' + MODELS.map((m) => '<a class="card hm-card" href="#/modeller/' + m.id + '"><span class="hm-card__ico">' + m.icon + '</span><b>' + esc(L2(m.name)) + "</b><small>" + esc(L2(m.desc)) + '</small><span class="hm-card__n">' + esc(T(m.parts.length + " parça", m.parts.length + " parts")) + "</span></a>").join("") + "</div></div>";
    App.hydrateIcons(view);
  }

  async function stage(view, title, id, sideHtml, ratio) {
    view.innerHTML = '<div class="page hm hm-view"><nav class="crumbs"><a href="#/modeller">' + App.icon("chevronL") + esc(T("3B Modeller", "3D Models")) + "</a></nav>" +
      '<div class="hm-head"><h1>' + esc(title) + '</h1><div class="hm-head__acts"><button type="button" class="btn btn--sm hm-holo" id="hmHolo">✦ ' + esc(T("Hologram", "Hologram")) + "</button></div></div>" +
      '<div class="hm-layout"><div class="hm-stage" id="hmStage"><div class="hm-loading">' + esc(T("3B sahne yükleniyor…", "Loading 3D…")) + '</div></div><aside class="hm-side" id="hmSide">' + sideHtml + "</aside></div></div>";
    App.hydrateIcons(view);
    if (!App.lab3d.supported()) { view.querySelector("#hmStage").innerHTML = '<p class="hint">' + esc(T("Bu cihazda 3B (WebGL) desteklenmiyor.", "3D (WebGL) is not supported here.")) + "</p>"; return null; }
    await App.lab3d.load();
    const host = view.querySelector("#hmStage"); if (!host || !host.isConnected) return null;
    host.innerHTML = "";
    const S3 = App.lab3d.mount(host, id, ratio || 0.7);
    return S3;
  }
  function run(S3, params) {
    stopRun();
    const st = RUN = { S3, p: params, on: true, raf: 0, t0: performance.now() };
    st.loop = () => { if (!st.on) return; S3.frame(st.p, (performance.now() - st.t0) / 1000); st.raf = requestAnimationFrame(st.loop); };
    st.onRoute = () => { if (RUN === st && !document.contains(S3.el)) stopRun(); };
    window.addEventListener("da:route", st.onRoute);
    st.loop();
    return st;
  }

  async function modelPage(view, md) {
    App.setTitle(L2(md.name));
    const tops = topicsFor(md);
    const side = '<p class="hm-desc">' + esc(L2(md.desc)) + "</p>" +
      '<label class="hm-ex"><span>' + esc(T("Parçalarına ayır", "Explode")) + '</span><input type="range" min="0" max="100" value="0" id="hmEx" aria-label="' + esc(T("Parçalarına ayır", "Explode")) + '"></label>' +
      '<label class="check-row"><input type="checkbox" id="hmSpin" checked> ' + esc(T("Kendi kendine dönsün", "Auto-rotate")) + "</label>" +
      '<div class="hm-parts" role="list">' + md.parts.map(([pid, nm]) => '<button type="button" class="hm-part" role="listitem" data-pid="' + pid + '">' + esc(L2(nm)) + "</button>").join("") + "</div>" +
      '<div class="hm-info" id="hmInfo" aria-live="polite"><p class="hint">' + esc(T("Bir parçaya dokun ya da listeden seç. El kontrolünde iki elini açıp kapatarak parçalarına ayırabilirsin.", "Tap a part or pick it from the list. With hand control, spread two hands to explode.")) + "</p></div>" +
      (tops.length ? '<div class="hm-tops"><b>' + esc(T("İlgili konular", "Related lessons")) + "</b>" + tops.map((x) => '<a href="#/konular/' + x.key + '">' + esc(App.data.curriculum.gradeName(x.g) + " · " + App.L(x.o.title)) + "</a>").join("") + "</div>" : "");
    const S3 = await stage(view, L2(md.name), "m-" + md.id, side, 0.72);
    if (!S3) return;
    const P = { ex: 0, sel: null, spin: true };
    const st = run(S3, P);
    const $ = (s) => view.querySelector(s);
    const info = (pid) => {
      P.sel = pid;
      view.querySelectorAll(".hm-part").forEach((b) => b.classList.toggle("is-on", b.dataset.pid === pid));
      const pt = md.parts.find((x) => x[0] === pid);
      $("#hmInfo").innerHTML = pt ? "<b>" + esc(L2(pt[1])) + "</b><p>" + esc(L2(pt[2])) + "</p>" : '<p class="hint">' + esc(T("Bir parçaya dokun.", "Tap a part.")) + "</p>";
    };
    view.querySelectorAll(".hm-part").forEach((b) => b.addEventListener("click", () => info(P.sel === b.dataset.pid ? null : b.dataset.pid)));
    $("#hmEx").addEventListener("input", (e) => { P.ex = Number(e.target.value) / 100; });
    $("#hmSpin").addEventListener("change", (e) => { P.spin = e.target.checked; });
    // 3B'de dokunma ile seçim (sürüklemeden ayırt et)
    let downAt = 0, downPos = null;
    S3.el.addEventListener("pointerdown", (e) => { downAt = performance.now(); downPos = [e.clientX, e.clientY]; });
    S3.el.addEventListener("pointerup", (e) => {
      if (!downPos || performance.now() - downAt > 350 || Math.hypot(e.clientX - downPos[0], e.clientY - downPos[1]) > 8) return;    // sürükleme değil, dokunuş
      if (e.target !== S3._S.renderer.domElement) return;
      info(S3._S.o.lastPick || null);
    });
    // el: iki el = parçalarına ayır
    if (S3._S) S3._S.hand.hook((ev) => {
      if (ev.g !== "two") { st.d0 = 0; return false; }
      const a = ev.hands[0], b = ev.hands[1], d = Math.hypot(a.x - b.x, a.y - b.y);
      if (!st.d0) { st.d0 = d; st.e0 = P.ex; return true; }
      P.ex = Math.max(0, Math.min(1, st.e0 + (d - st.d0) * 2.2)); $("#hmEx").value = String(Math.round(P.ex * 100));
      return true;
    });
    $("#hmHolo").addEventListener("click", () => S3.holoStart({ side: $("#hmSide") }).catch(() => {}));
  }

  async function molPage(view) {
    App.setTitle(T("Elle molekül kurma", "Build molecules"));
    const solved = new Set(App.prefs.get("molSolved", []) || []);
    const cur = App.prefs.get("molLast", "H2O");
    const side = '<div class="hm-mols" role="group" aria-label="' + esc(T("Hedef molekül", "Target molecule")) + '">' + MOL.map((m) => '<button type="button" class="hm-molbtn' + (m.id === cur ? " is-on" : "") + (solved.has(m.id) ? " is-done" : "") + '" data-mol="' + m.id + '">' + m.f + "</button>").join("") + "</div>" +
      '<div class="hm-msg" id="hmMsg" aria-live="polite"></div>' +
      '<div class="hm-acts"><button type="button" class="btn btn--sm" id="hmReset">' + App.icon("refresh") + esc(T("Baştan", "Reset")) + '</button><button type="button" class="btn btn--sm btn--ghost" id="hmNext">' + esc(T("Sıradaki molekül", "Next molecule")) + App.icon("chevron") + "</button></div>" +
      '<details class="hm-how"><summary>' + esc(T("Nasıl oynanır?", "How to play")) + "</summary><ul>" +
        "<li>" + esc(T("Fare ya da parmakla: bir atomu sürükleyip diğerinin yanına bırak; yakınsa bağ kurulur.", "Mouse/finger: drag an atom next to another to bond.")) + "</li>" +
        "<li>" + esc(T("El ile (✋ El): başparmak ve işaret parmağını birleştirip (çimdik) atomu tut, taşı, parmaklarını açarak bırak.", "Hand: pinch to grab, move, open to release.")) + "</li>" +
        "<li>" + esc(T("Her atom değerliği kadar bağ yapar: H ve halojenler 1, O 2, N ve B 3, C 4. Molekül tamamlanınca VSEPR'e göre gerçek şekline oturur; ortaklanmamış elektron çiftleri mor loblarla görünür.", "Each atom bonds up to its valence. When done, the molecule snaps to its VSEPR shape.")) + "</li>" +
        "<li>" + esc(T("Hologram düğmesiyle molekülü ekranın derinliğinde gör.", "Use Hologram to see it inside the screen.")) + "</li></ul></details>";
    const S3 = await stage(view, T("Elle molekül kurma", "Build molecules by hand"), "molekul", side, 0.72);
    if (!S3) return;
    const P = { target: cur };
    run(S3, P);
    const $ = (s) => view.querySelector(s);
    const paint = () => {
      const o = S3._S && S3._S.o; if (!o) return;
      const m = o.msg; const box = $("#hmMsg"); if (!box) return;
      box.className = "hm-msg" + (m && m.ok === true ? " is-ok" : m && m.ok === false ? " is-bad" : "");
      box.textContent = m ? T(m.tr, m.en) : "";
      if (m && m.ok === true) { const b = view.querySelector('.hm-molbtn[data-mol="' + o.tid + '"]'); if (b) b.classList.add("is-done"); }
    };
    if (S3._S) S3._S.o.onChange = () => setTimeout(paint, 30);
    const pick = (id) => { P.target = id; App.prefs.set("molLast", id); view.querySelectorAll(".hm-molbtn").forEach((b) => b.classList.toggle("is-on", b.dataset.mol === id)); setTimeout(paint, 60); };
    view.querySelectorAll(".hm-molbtn").forEach((b) => b.addEventListener("click", () => { if (S3._S) S3._S.o.tid = null; pick(b.dataset.mol); }));
    $("#hmReset").addEventListener("click", () => { if (S3._S) S3._S.o.tid = null; pick(P.target); });
    $("#hmNext").addEventListener("click", () => { const i = MOL.findIndex((m) => m.id === P.target); if (S3._S) S3._S.o.tid = null; pick(MOL[(i + 1) % MOL.length].id); });
    $("#hmHolo").addEventListener("click", () => S3.holoStart({ side: $("#hmSide") }).catch(() => {}));
    setTimeout(paint, 120);
    App.modeller._mol = { S3, P, paint };
  }

  function render(view, params) {
    stopRun();
    const id = params && params[0];
    if (id === "molekul") return molPage(view);
    const md = id && MODELS.find((m) => m.id === id);
    if (md) return modelPage(view, md);
    if (id) { location.hash = "#/modeller"; return; }
    return library(view);
  }
  App.router.register("modeller", render);
  App.modeller = { MODELS, MOL, cardHtml, modelsForTopic, topicsFor, idealDirs, stop: stopRun, run: () => RUN, _bond: (S, i, j) => tryBond(S, S.o.atoms[i], S.o.atoms[j]) };
})();
