/* =========================================================
   kure.js — 3B Dünya Küresi (v1.28)   #/kure

   Coğrafya ve tarih için elle çevrilen küre. Katmanlar:
     • ülkeler ve başkentler (dokun → ülke kartı: başkent, nüfus, kıta, yerel güneş saati)
     • paralel–meridyen ağı, Ekvator, dönenceler, kutup daireleri, başlangıç meridyeni
     • matematik iklim kuşakları  • teorik saat dilimleri (15°)
     • levha sınırları (PB2002: uzaklaşan / yakınlaşan / dönüşüm) ve levha adları
     • büyük depremler ve volkanlar   • tarih olayları (yıl kaydırıcısıyla)
     • Güneş: tarihe ve saate göre aydınlanma, gün–gece çizgisi, dik ışınların düştüğü enlem
   lab3d altyapısıyla çizilir: hologram ve el ile kontrol aynen çalışır.
   Veri (js/data/kure.js) yalnızca küre açılınca yüklenir.
   ========================================================= */
(function () {
  if (!App.lab3d) return;
  const { esc } = App.utils;
  const T = (tr, en) => (App.i18n.lang === "en" ? en : tr);
  const R = 2;                               // küre yarıçapı (sahne birimi)
  const TILT = 23.44;                        // eksen eğikliği (23°27')

  /* ---------- konum dönüşümleri: sahnedeki SphereGeometry'nin uv'siyle aynı ---------- */
  function vec(THREE, lon, lat, r) {
    const u = (lon + 180) / 360, v = (90 - lat) / 180, rr = r || R;
    return new THREE.Vector3(-rr * Math.cos(2 * Math.PI * u) * Math.sin(Math.PI * v), rr * Math.cos(Math.PI * v), rr * Math.sin(2 * Math.PI * u) * Math.sin(Math.PI * v));
  }
  const lonOfU = (u) => u * 360 - 180, latOfV = (v) => v * 180 - 90;

  /* ---------- sabit veriler ---------- */
  // Büyük depremler: [boylam, enlem, yıl, büyüklük (Mw), ad] — merkez üsleri yaklaşık
  const QUAKES = [
    [29.97, 40.76, 1999, 7.6, "Gölcük (İzmit)"], [37.03, 37.17, 2023, 7.8, "Kahramanmaraş (Pazarcık)"], [39.5, 39.8, 1939, 7.8, "Erzincan"],
    [26.79, 37.9, 2020, 7.0, "İzmir (Sisam açıkları)"], [142.37, 38.3, 2011, 9.1, "Tōhoku (Japonya)"], [95.98, 3.3, 2004, 9.1, "Sumatra–Andaman (Endonezya)"],
    [-73.05, -38.24, 1960, 9.5, "Valdivia (Şili)"], [-147.65, 61.02, 1964, 9.2, "Alaska (ABD)"], [-72.53, 18.46, 2010, 7.0, "Haiti"],
    [84.73, 28.23, 2015, 7.8, "Gorkha (Nepal)"], [-122.55, 37.75, 1906, 7.9, "San Francisco (ABD)"], [103.4, 31.0, 2008, 7.9, "Wenchuan (Çin)"]
  ];
  // Volkanlar: [boylam, enlem, ad, durum]
  const VOLC = [
    [15.0, 37.75, "Etna (İtalya)", "etkin"], [14.43, 40.82, "Vezüv (İtalya)", "etkin"], [138.73, 35.36, "Fuji (Japonya)", "etkin"],
    [-155.29, 19.41, "Kilauea (Hawaii)", "etkin"], [105.42, -6.1, "Krakatau (Endonezya)", "etkin"], [-122.18, 46.2, "St. Helens (ABD)", "etkin"],
    [-19.62, 63.63, "Eyjafjallajökull (İzlanda)", "etkin"], [35.45, 38.53, "Erciyes (Kayseri)", "sönmüş"], [42.23, 38.65, "Nemrut (Bitlis)", "uykuda"],
    [44.3, 39.7, "Ağrı Dağı", "sönmüş"], [37.35, -3.07, "Kilimanjaro (Tanzanya)", "uykuda"], [-98.62, 19.02, "Popocatépetl (Meksika)", "etkin"]
  ];
  // PB2002 adım sınıfları → üç ana tür
  const PBT = [["Okyanus ortası sırtı (uzaklaşan)", "#ff6b4a", "div"], ["Okyanusal dönüşüm fayı", "#ffd166", "tr"], ["Dalma-batma (yakınlaşan)", "#4cc9f0", "con"],
    ["Kıtasal yarık (uzaklaşan)", "#ff6b4a", "div"], ["Kıtasal dönüşüm fayı", "#ffd166", "tr"], ["Kıta–kıta çarpışması (yakınlaşan)", "#4cc9f0", "con"], ["Okyanus–kıta yakınlaşması", "#4cc9f0", "con"]];
  const LAYERS = [
    ["ulke", ["Ülkeler", "Countries"], true], ["baskent", ["Başkentler", "Capitals"], false], ["ag", ["Paralel ve meridyenler", "Graticule"], true],
    ["iklim", ["Matematik iklim kuşakları", "Climate belts"], false], ["saat", ["Saat dilimleri", "Time zones"], false],
    ["levha", ["Levha sınırları", "Plate boundaries"], false], ["deprem", ["Büyük depremler", "Major earthquakes"], false], ["volkan", ["Volkanlar", "Volcanoes"], false],
    ["tarih", ["Tarih olayları", "History events"], false], ["gunes", ["Güneş: gündüz–gece", "Sun: day–night"], false]
  ];

  /* ---------- dokunun çizimi (eşdikdörtgen, 2048×1024) ---------- */
  function drawTexture(cv, L, light) {
    const G = App.data.globe, W = cv.width, H = cv.height, x = cv.getContext("2d");
    const px = (lon) => ((lon + 180) / 360) * W, py = (lat) => ((90 - lat) / 180) * H;
    x.fillStyle = "#1d4f7a"; x.fillRect(0, 0, W, H);
    // okyanus derinlik izlenimi
    const gr = x.createLinearGradient(0, 0, 0, H); gr.addColorStop(0, "rgba(255,255,255,.08)"); gr.addColorStop(0.5, "rgba(0,0,0,0)"); gr.addColorStop(1, "rgba(255,255,255,.08)"); x.fillStyle = gr; x.fillRect(0, 0, W, H);
    if (L.iklim) {
      const band = (a, b, col) => { x.fillStyle = col; x.fillRect(0, py(b), W, py(a) - py(b)); };
      band(-TILT, TILT, "rgba(255,120,60,.30)"); band(TILT, 90 - TILT, "rgba(120,220,120,.22)"); band(-(90 - TILT), -TILT, "rgba(120,220,120,.22)");
      band(90 - TILT, 90, "rgba(160,210,255,.38)"); band(-90, -(90 - TILT), "rgba(160,210,255,.38)");
    }
    if (L.saat) { for (let i = 0; i < 24; i++) { if (i % 2) continue; x.fillStyle = "rgba(255,255,255,.07)"; x.fillRect(px(-187.5 + i * 15), 0, (15 / 360) * W, H); } }
    // kara
    const landCol = L.iklim ? "rgba(222,206,160,.92)" : "#c9b98b";
    G.countries.forEach((c) => {
      x.beginPath();
      c.r.forEach((rg) => { let prev = null; rg.forEach(([lo, la], i) => { if (i === 0 || (prev != null && Math.abs(lo - prev) > 180)) x.moveTo(px(lo), py(la)); else x.lineTo(px(lo), py(la)); prev = lo; }); x.closePath(); });
      x.fillStyle = c.id === "TUR" ? "#e08a5a" : landCol; x.fill();
      if (L.ulke) { x.strokeStyle = "rgba(60,40,20,.55)"; x.lineWidth = 1; x.stroke(); }
    });
    // ağ ve özel paraleller
    if (L.ag) {
      x.strokeStyle = "rgba(255,255,255,.18)"; x.lineWidth = 1;
      for (let lo = -180; lo <= 180; lo += 15) { x.beginPath(); x.moveTo(px(lo), 0); x.lineTo(px(lo), H); x.stroke(); }
      for (let la = -75; la <= 75; la += 15) { x.beginPath(); x.moveTo(0, py(la)); x.lineTo(W, py(la)); x.stroke(); }
      const line = (la, col, dash) => { x.save(); x.strokeStyle = col; x.lineWidth = 2.5; x.setLineDash(dash || []); x.beginPath(); x.moveTo(0, py(la)); x.lineTo(W, py(la)); x.stroke(); x.restore(); };
      line(0, "#ff5a5a"); line(TILT, "#ffb347", [14, 8]); line(-TILT, "#ffb347", [14, 8]); line(90 - TILT, "#8fd3ff", [6, 6]); line(-(90 - TILT), "#8fd3ff", [6, 6]);
      x.save(); x.strokeStyle = "#ffe066"; x.lineWidth = 2.5; x.beginPath(); x.moveTo(px(0), 0); x.lineTo(px(0), H); x.stroke(); x.restore();
    }
    if (L.saat) { x.save(); x.strokeStyle = "rgba(255,255,255,.55)"; x.setLineDash([4, 6]); x.lineWidth = 1.5; for (let i = 0; i <= 24; i++) { const lo = -187.5 + i * 15; x.beginPath(); x.moveTo(px(lo), 0); x.lineTo(px(lo), H); x.stroke(); } x.restore();
      x.fillStyle = "#fff"; x.font = "600 22px system-ui, sans-serif"; x.textAlign = "center"; for (let k = -12; k <= 12; k++) { const lo = k * 15; x.fillText((k >= 0 ? "+" : "") + k, px(lo), py(70)); x.fillText((k >= 0 ? "+" : "") + k, px(lo), py(-62)); } }
    if (L.levha) {
      G.pb.forEach(([c, , flat]) => { x.strokeStyle = PBT[c][1]; x.lineWidth = 3; x.beginPath(); for (let i = 0; i < flat.length; i += 2) { const lo = flat[i], la = flat[i + 1]; if (i === 0 || Math.abs(lo - flat[i - 2]) > 180) x.moveTo(px(lo), py(la)); else x.lineTo(px(lo), py(la)); } x.stroke(); });
      // levha adları dokunun içine yazılır (ayrı etiket nesnesi yok → daha az çizim çağrısı, arka yüzde görünmez)
      x.save(); x.font = "700 26px system-ui, sans-serif"; x.textAlign = "center"; x.textBaseline = "middle"; x.lineJoin = "round";
      G.plates.forEach(([lo, la, n]) => { const sx = 1 / Math.max(0.35, Math.cos((la * Math.PI) / 180)); x.save(); x.translate(px(lo), py(la)); x.scale(sx, 1);
        x.lineWidth = 6; x.strokeStyle = "rgba(10,20,40,.75)"; x.strokeText(n, 0, 0); x.fillStyle = "#ffffff"; x.fillText(n, 0, 0); x.restore(); });
      x.restore();
    }
  }

  /* ---------- 3B sahne ---------- */
  App.lab3d.def("kure", {
    view: { r: 6.6, th: 0.4, ph: 1.25, target: [0, 0, 0] },
    build(S) {
      const THREE = S.THREE, o = S.o; S.hideFloor();
      o.globe = S.group(); o.globe.rotation.y = -0.6;
      o.cv = document.createElement("canvas"); o.cv.width = 2048; o.cv.height = 1024;
      o.tex = new THREE.CanvasTexture(o.cv); o.tex.encoding = THREE.sRGBEncoding; o.tex.anisotropy = 4;
      o.mat = new THREE.MeshStandardMaterial({ map: o.tex, roughness: 0.95, metalness: 0 });
      const seg = S.mobile ? [72, 48] : [96, 64];
      o.geoHi = new THREE.SphereGeometry(R, seg[0], seg[1]); o.geoLo = new THREE.SphereGeometry(R, 40, 28);
      o.ball = new THREE.Mesh(o.geoHi, o.mat); o.globe.add(o.ball);
      o.ball.userData.keep = [o.geoLo];
      // atmosfer halesi
      o.atmo = new THREE.Mesh(new THREE.SphereGeometry(R * 1.035, 48, 32), new THREE.MeshBasicMaterial({ color: 0x6fb7ff, transparent: true, opacity: 0.12, side: THREE.BackSide, depthWrite: false })); o.globe.add(o.atmo);
      // eksen
      const ax = S.cyl(0.015, 0.015, R * 2.5, 0xcfd6e0, o.globe, 8); ax.castShadow = false;
      o.marks = S.group(o.globe); o.key = "";
      o.sun = new THREE.DirectionalLight(0xffffff, 0); S.scene.add(o.sun);
      o.sunDot = new THREE.Mesh(new THREE.SphereGeometry(0.06, 12, 8), new THREE.MeshBasicMaterial({ color: 0xffe066 })); o.sunDot.visible = false; o.globe.add(o.sunDot);
      o.lights = S.scene.children.filter((c) => c.isLight && c !== o.sun);
      o.hl = null;
    },
    update(S, p, t) {
      const o = S.o, THREE = S.THREE; p = p || {};
      const L = p.L || {};
      if (!App.data.globe) return;
      const key = JSON.stringify(L);
      if (key !== o.key) { o.key = key; drawTexture(o.cv, L); o.tex.needsUpdate = true; buildMarks(S, L, p); o.yKey = null; }
      if (L.tarih && p.year !== o.yKey) { o.yKey = p.year; buildEvents(S, p.year); }
      const dtk = Math.max(0, Math.min(0.1, (t || 0) - (o.lastT == null ? (t || 0) : o.lastT))); o.lastT = t || 0;   // kare hızından bağımsız dönme
      if (p.spin && !p.drag) o.globe.rotation.y += 0.15 * dtk;
      if (p.focus) {
        // noktanın yerel açısı α; y ekseninde θ kadar döndürünce açısı α+θ olur → kameranın açısına (th) getir
        const f = p.focus, v = vec(THREE, f.lon, f.lat, 1), a = Math.atan2(v.x, v.z);
        let d = (S.cam.th - a) - o.globe.rotation.y; d = Math.atan2(Math.sin(d), Math.cos(d)); const kf = 1 - Math.pow(0.88, Math.max(1, dtk * 60)); o.globe.rotation.y += d * kf;
        const ph = Math.max(0.35, Math.min(2.8, Math.PI / 2 - (f.lat * Math.PI) / 180)); S.cam.ph += (ph - S.cam.ph) * kf;
        if (Math.abs(d) < 0.002 && Math.abs(ph - S.cam.ph) < 0.002) p.focus = null;
      }
      // Ayrıntı düzeyi (LOD): uzaktan bakarken daha az üçgenli küre
      const far = S.cam.r > 8.5; if (o.lodFar !== far) { o.lodFar = far; o.ball.geometry = far ? o.geoLo : o.geoHi; }
      // Güneş: alt-güneş noktası (dik ışın) → yönlü ışık
      if (L.gunes) {
        const doy = p.doy || 172, hr = p.hour == null ? 12 : p.hour;
        const dec = -TILT * Math.cos((2 * Math.PI * (doy + 10)) / 365), slon = -15 * (hr - 12);
        const d = vec(THREE, slon, dec, 1).applyEuler(o.globe.rotation);
        o.sun.position.copy(d.multiplyScalar(10)); o.sun.intensity = 2.2;
        o.lights.forEach((l) => { if (l.userData.i0 == null) l.userData.i0 = l.intensity; l.intensity = l.userData.i0 * 0.12; });
        o.sunDot.visible = true; o.sunDot.position.copy(vec(THREE, slon, dec, R * 1.01));
        o.sunInfo = { dec, slon };
      } else {
        o.sun.intensity = 0; o.sunDot.visible = false; o.sunInfo = null;
        o.lights.forEach((l) => { if (l.userData.i0 != null) l.intensity = l.userData.i0; });
      }
      // seçili işaret nabzı
      if (o.hl) { const a = performance.now() - (o.hlT || 0), k = a < 2400 ? 1 + 0.3 * Math.sin(a / 180) : 1; o.hl.scale.setScalar(k); }
    },
    pointer(S, type, nx, ny) {
      if (type !== "down") return false;
      const o = S.o, rc = S.ray(nx, ny);
      const mk = rc.intersectObjects(o.marks.children, true).find((h) => { const u = h.object.userData; return u.info || (u.infos && h.instanceId != null && u.infos[h.instanceId]); });
      if (mk) { const u = mk.object.userData; o.pick = { kind: "mark", info: u.info || u.infos[mk.instanceId] }; return false; }
      const hit = rc.intersectObject(o.ball, false)[0];
      o.pick = hit && hit.uv ? { kind: "geo", lon: lonOfU(hit.uv.x), lat: latOfV(hit.uv.y) } : null;
      return false;
    }
  });

  /* İşaretler: aynı türden işaretler tek bir örneklenmiş (instanced) nesnede → her tür tek çizim çağrısı.
     Seçim: ışın, örnek numarasını (instanceId) verir; bilgiler userData.infos dizisindedir. */
  function disposeObj(m) { if (m.geometry) m.geometry.dispose(); if (m.material) (Array.isArray(m.material) ? m.material : [m.material]).forEach((x) => x.dispose()); }
  function clearMarks(o, tag) { o.marks.children.slice().forEach((m) => { if (!tag || m.userData.tag === tag) { o.marks.remove(m); disposeObj(m); } }); }
  function dot(S, lon, lat, col, size, info, tag, h) {
    const m = new S.THREE.Mesh(new S.THREE.SphereGeometry(size || 0.035, 10, 8), new S.THREE.MeshBasicMaterial({ color: col }));
    m.position.copy(vec(S.THREE, lon, lat, R * (1 + (h || 0.006)))); m.userData = { info, tag, count: 1 }; S.o.marks.add(m); return m;
  }
  /** items: [{ lon, lat, size, color?, info, h? }] → tek InstancedMesh */
  function instanced(S, items, geo, mat, tag, orient) {
    const THREE = S.THREE; if (!items.length) { geo.dispose(); mat.dispose(); return null; }
    const im = new THREE.InstancedMesh(geo, mat, items.length), M4 = new THREE.Matrix4(), Q = new THREE.Quaternion(), SC = new THREE.Vector3(), UP = new THREE.Vector3(0, 1, 0), C = new THREE.Color();
    items.forEach((it, i) => {
      const pos = vec(THREE, it.lon, it.lat, R * (1 + (it.h || 0.006)));
      if (orient) Q.setFromUnitVectors(UP, pos.clone().normalize()); else Q.identity();
      SC.setScalar(it.size || 1); M4.compose(pos, Q, SC); im.setMatrixAt(i, M4);
      if (it.color != null) im.setColorAt(i, C.set(it.color));
    });
    im.instanceMatrix.needsUpdate = true; if (im.instanceColor) im.instanceColor.needsUpdate = true;
    im.computeBoundingSphere && im.computeBoundingSphere();
    im.userData = { tag, infos: items.map((it) => it.info), count: items.length };
    S.o.marks.add(im); return im;
  }
  function buildMarks(S, L) {
    const o = S.o, G = App.data.globe, THREE = S.THREE; clearMarks(o); o.hl = null;
    const ball = (seg) => new THREE.SphereGeometry(1, seg || 10, Math.round((seg || 10) * 0.8));
    if (L.baskent) instanced(S, G.caps.map(([lo, la, n, id]) => { const c = G.countries.find((x) => x.id === id); return { lon: lo, lat: la, size: 0.022, info: { t: n, s: T("Başkent", "Capital") + (c ? " · " + c.n : ""), lon: lo, lat: la } }; }),
      ball(8), new THREE.MeshBasicMaterial({ color: 0xffffff }), "cap");
    if (L.deprem) instanced(S, QUAKES.map(([lo, la, y, mw, n]) => ({ lon: lo, lat: la, h: 0.01, size: 0.02 + (mw - 6.5) * 0.025, info: { t: n + " depremi", s: y + " · Mw " + String(mw).replace(".", ","), lon: lo, lat: la, q: true } })),
      ball(12), new THREE.MeshBasicMaterial({ color: 0xff4d4d, transparent: true, opacity: 0.85 }), "eq");
    if (L.volkan) instanced(S, VOLC.map(([lo, la, n, st]) => ({ lon: lo, lat: la, h: 0.02, size: 1, color: st === "etkin" ? 0xff8c1a : 0xb08060, info: { t: n, s: T("Volkan · ", "Volcano · ") + st, lon: lo, lat: la } })),
      new THREE.ConeGeometry(0.045, 0.11, 10), new THREE.MeshBasicMaterial({ color: 0xffffff }), "vol", true);
    o.plateN = L.levha ? G.plates.length : 0;
  }
  function buildEvents(S, year) {
    const o = S.o; clearMarks(o, "ev");
    const ev = App.data.tarihOlay || [];
    const items = [];
    ev.forEach((e) => { const yy = e[0], loc = e[5]; if (!loc || Math.abs(yy - year) > 60) return;
      items.push({ lon: loc[0], lat: loc[1], h: 0.012, size: 0.03 + (60 - Math.abs(yy - year)) / 60 * 0.03, info: { t: e[1], s: (yy < 0 ? "MÖ " + (-yy) : yy) + " · " + (e[4] || ""), lon: loc[0], lat: loc[1] } }); });
    instanced(S, items, new S.THREE.SphereGeometry(1, 10, 8), new S.THREE.MeshBasicMaterial({ color: 0xb48cff }), "ev");
  }

  /* ---------- veri yükleme ---------- */
  let dataP = null;
  function loadData() {
    if (App.data.globe) return Promise.resolve();
    if (!dataP) dataP = new Promise((res, rej) => { const sc = document.createElement("script"); sc.src = "js/data/kure.js"; sc.onload = () => res(); sc.onerror = () => { dataP = null; rej(new Error("veri")); }; document.head.appendChild(sc); });
    return dataP;
  }
  function loadEvents() {
    if (App.data.tarihOlay) return Promise.resolve();
    return new Promise((res) => { const sc = document.createElement("script"); sc.src = "js/data/tarih-olaylar.js"; sc.onload = () => res(); sc.onerror = () => res(); document.head.appendChild(sc); });
  }

  /* ---------- sayfa ---------- */
  let RUN = null;
  function stop() { if (!RUN) return; RUN.on = false; cancelAnimationFrame(RUN.raf); window.removeEventListener("da:route", RUN.onRoute); try { RUN.S3.dispose(); } catch (e) { /* yok */ } RUN = null; }
  const fmtN = (n) => (n == null ? "–" : Number(n).toLocaleString("tr-TR"));
  const deg = (v, pos, neg) => Math.abs(v).toFixed(1).replace(".", ",") + "° " + (v >= 0 ? pos : neg);
  /** nokta-çokgen testi (ışın atma) */
  function inRing(lon, lat, r) { let c = false; for (let i = 0, j = r.length - 1; i < r.length; j = i++) { const [xi, yi] = r[i], [xj, yj] = r[j]; if ((yi > lat) !== (yj > lat) && lon < ((xj - xi) * (lat - yi)) / (yj - yi) + xi) c = !c; } return c; }
  function countryAt(lon, lat) { return App.data.globe.countries.find((c) => c.r.some((r) => inRing(lon, lat, r))) || null; }
  function solarTime(lon, hourUTC) { let h = hourUTC + lon / 15; h = ((h % 24) + 24) % 24; const hh = Math.floor(h), mm = Math.round((h - hh) * 60) % 60; return String(hh).padStart(2, "0") + ":" + String(mm).padStart(2, "0"); }
  const DAYS = [[80, "21 Mart", "Ekinoks"], [172, "21 Haziran", "Yaz gündönümü (K.Y.)"], [266, "23 Eylül", "Ekinoks"], [355, "21 Aralık", "Kış gündönümü (K.Y.)"]];
  function dayName(doy) { const d = new Date(Date.UTC(2026, 0, 1) + (doy - 1) * 864e5); return d.getUTCDate() + " " + ["Ocak", "Şubat", "Mart", "Nisan", "Mayıs", "Haziran", "Temmuz", "Ağustos", "Eylül", "Ekim", "Kasım", "Aralık"][d.getUTCMonth()]; }

  async function page(view) {
    stop();
    App.setTitle(T("3B Dünya Küresi", "3D Globe"));
    const Lp = Object.assign({}, Object.fromEntries(LAYERS.map((l) => [l[0], l[2]])), App.prefs.get("kureL", {}) || {});
    const P = { L: Lp, year: 1453, doy: 172, hour: 12, spin: true };
    view.innerHTML = '<div class="page hm kr3"><div class="hm-head"><div><h1>' + esc(T("3B Dünya Küresi", "3D Globe")) + '</h1><p class="hint">' + esc(T("Döndür, katman aç, bir yere dokun. Hologramda ya da elinle de çevirebilirsin.", "Rotate, toggle layers, tap a place. Works as a hologram and with hand control.")) + '</p></div>' +
        '<div class="hm-head__acts"><button type="button" class="btn btn--sm hm-holo" id="kHolo">✦ ' + esc(T("Hologram", "Hologram")) + "</button></div></div>" +
      '<div class="hm-layout"><div class="hm-stage" id="kStage"><div class="hm-loading">' + esc(T("Küre yükleniyor…", "Loading globe…")) + "</div></div>" +
      '<aside class="hm-side" id="kSide">' +
        '<label class="tc-search"><span aria-hidden="true">' + App.icon("search") + '</span><input type="search" id="kQ" placeholder="' + esc(T("Ülke ara: Japonya, Brezilya…", "Find a country…")) + '" aria-label="' + esc(T("Ülke ara", "Find a country")) + '" list="kList"></label><datalist id="kList"></datalist>' +
        '<div class="kr3-layers" role="group" aria-label="' + esc(T("Katmanlar", "Layers")) + '">' + LAYERS.map(([k, n]) => '<label class="kr3-chip"><input type="checkbox" data-l="' + k + '"' + (Lp[k] ? " checked" : "") + "> " + esc(T(n[0], n[1])) + "</label>").join("") + "</div>" +
        '<div class="kr3-sun" id="kSun"' + (Lp.gunes ? "" : " hidden") + '><div class="kr3-days">' + DAYS.map(([d, n]) => '<button type="button" class="btn btn--sm btn--ghost" data-doy="' + d + '">' + esc(n) + "</button>").join("") + '</div>' +
          '<label class="hm-ex"><span>' + esc(T("Tarih: ", "Date: ")) + '<b id="kDoyL"></b></span><input type="range" min="1" max="365" value="172" id="kDoy"></label>' +
          '<label class="hm-ex"><span>' + esc(T("Saat (UTC): ", "Hour (UTC): ")) + '<b id="kHrL"></b></span><input type="range" min="0" max="23.75" step="0.25" value="12" id="kHr"></label><p class="hint" id="kSunInfo"></p></div>' +
        '<div class="kr3-year" id="kYear"' + (Lp.tarih ? "" : " hidden") + '><label class="hm-ex"><span>' + esc(T("Yıl: ", "Year: ")) + '<b id="kYL"></b> <small class="hint">± 60</small></span><input type="range" min="-3000" max="2025" value="1453" id="kY"></label></div>' +
        '<label class="check-row"><input type="checkbox" id="kSpin" checked> ' + esc(T("Kendi kendine dönsün", "Auto-rotate")) + "</label>" +
        '<div class="hm-info" id="kInfo" aria-live="polite"><p class="hint">' + esc(T("Küreye ya da bir işarete dokun.", "Tap the globe or a marker.")) + "</p></div>" +
        '<div class="kr3-legend" id="kLeg"></div>' +
      "</aside></div></div>";
    App.hydrateIcons(view);
    const $ = (s) => view.querySelector(s);
    if (!App.lab3d.supported()) { $("#kStage").innerHTML = '<p class="hint">' + esc(T("Bu cihazda 3B (WebGL) desteklenmiyor.", "3D (WebGL) is not supported here.")) + "</p>"; return; }
    try { await Promise.all([App.lab3d.load(), loadData(), loadEvents()]); } catch (e) { $("#kStage").innerHTML = '<p class="error-text">' + esc(T("Küre verisi yüklenemedi.", "Could not load globe data.")) + "</p>"; return; }
    const host = $("#kStage"); if (!host || !host.isConnected) return;
    host.innerHTML = "";
    const S3 = App.lab3d.mount(host, "kure", 0.78), S = S3._S;
    const st = RUN = { S3, on: true, raf: 0 };
    // Yalnızca bir şey değiştiğinde çizilir (dönme, odaklanma, katman/tarih/saat değişimi, sürükleme, seçim nabzı);
    // küre dururken ekran kartı boşta kalır.
    st.loop = () => {
      if (!st.on) return;
      const now = performance.now();
      const k = JSON.stringify(P.L) + "|" + P.year + "|" + P.doy + "|" + P.hour;
      const active = (P.spin && !P.drag) || P.focus || (S.o.hl && now - (S.o.hlT || 0) < 2600) || S3.holoOn() || (S3.handOn && S3.handOn());
      if (active || st.dirty || k !== st.k) { st.k = k; st.dirty = false; S3.frame(P, now / 1000); }
      paintSun(); st.raf = requestAnimationFrame(st.loop);
    };
    st.onRoute = () => { if (RUN === st && !document.contains(S3.el)) stop(); };
    window.addEventListener("da:route", st.onRoute);
    $("#kList").innerHTML = App.data.globe.countries.map((c) => '<option value="' + esc(c.n) + '">').join("");
    const legend = () => {
      const L = P.L, it = [];
      if (L.ag) it.push(["#ff5a5a", T("Ekvator", "Equator")], ["#ffb347", T("Dönenceler (23°27')", "Tropics")], ["#8fd3ff", T("Kutup daireleri (66°33')", "Polar circles")], ["#ffe066", T("Başlangıç meridyeni", "Prime meridian")]);
      if (L.iklim) it.push(["rgba(255,120,60,.8)", T("Sıcak kuşak", "Torrid zone")], ["rgba(120,220,120,.8)", T("Ilıman kuşak", "Temperate zone")], ["rgba(160,210,255,.9)", T("Soğuk kuşak", "Frigid zone")]);
      if (L.levha) it.push(["#ff6b4a", T("Uzaklaşan sınır", "Divergent")], ["#4cc9f0", T("Yakınlaşan sınır", "Convergent")], ["#ffd166", T("Dönüşüm fayı", "Transform")]);
      if (L.deprem) it.push(["#ff4d4d", T("Deprem (büyüklüğe göre)", "Earthquake (by size)")]);
      if (L.volkan) it.push(["#ff8c1a", T("Etkin volkan", "Active volcano")], ["#b08060", T("Sönmüş / uykuda", "Dormant / extinct")]);
      if (L.tarih) it.push(["#b48cff", T("Tarih olayı", "History event")]);
      $("#kLeg").innerHTML = it.map(([c, n]) => '<span><i style="background:' + c + '"></i>' + esc(n) + "</span>").join("");
    };
    const paintSun = () => {
      if (!P.L.gunes || !S.o.sunInfo) return;
      const { dec, slon } = S.o.sunInfo, k = P.doy + "|" + P.hour; if (st.sk === k) return; st.sk = k;
      $("#kDoyL").textContent = dayName(P.doy); $("#kHrL").textContent = String(Math.floor(P.hour)).padStart(2, "0") + ":" + String(Math.round((P.hour % 1) * 60)).padStart(2, "0");
      $("#kSunInfo").textContent = T("Güneş ışınları " + deg(dec, "K", "G") + " enlemine dik geliyor (" + deg(slon, "D", "B") + " boylamında öğle). Türkiye'de güneş saati ≈ " + solarTime(35, P.hour) + ".", "Sun overhead at " + dec.toFixed(1) + "°.");
    };
    const info = (html) => { $("#kInfo").innerHTML = html; };
    const showGeo = (lon, lat) => {
      const c = countryAt(lon, lat);
      const pos = deg(lat, T("K", "N"), T("G", "S")) + " · " + deg(lon, T("D", "E"), T("B", "W"));
      const tz = Math.round(lon / 15), solar = solarTime(lon, P.L.gunes ? P.hour : new Date().getUTCHours() + new Date().getUTCMinutes() / 60);
      const zone = Math.abs(lat) <= TILT ? T("sıcak kuşak", "torrid zone") : Math.abs(lat) < 90 - TILT ? T("ılıman kuşak", "temperate zone") : T("soğuk kuşak", "frigid zone");
      info((c ? "<b>" + esc(c.n) + "</b>" + (c.cap ? "<p>" + esc(T("Başkent: ", "Capital: ") + c.cap) + "</p>" : "") + "<p>" + esc(T("Nüfus: ", "Population: ") + fmtN(c.pop) + (c.cont ? " · " + c.cont : "")) + "</p>" : "<b>" + esc(T("Okyanus / deniz", "Ocean / sea")) + "</b>") +
        '<p class="hint">' + esc(pos) + "</p><p>" + esc(T("Matematik iklim kuşağı: ", "Belt: ") + zone + " · " + T("teorik saat dilimi: UTC", "theoretical zone: UTC") + (tz >= 0 ? "+" : "") + tz + " · " + T("yerel güneş saati ", "solar time ") + solar) + "</p>");
      if (S.o.hl) { S.o.marks.remove(S.o.hl); disposeObj(S.o.hl); }
      S.o.hl = dot(S, lon, lat, 0x4dff9a, 0.04, null, "hl", 0.012); S.o.hlT = performance.now(); st.dirty = true;
    };
    // dokunuş → seçim (sürüklemeden ayırt et)
    let down = null;
    S3.el.addEventListener("pointerdown", (e) => { down = [e.clientX, e.clientY, performance.now()]; P.drag = true; });
    S3.el.addEventListener("pointermove", () => { if (P.drag) st.dirty = true; });
    S3.el.addEventListener("wheel", () => { st.dirty = true; }, { passive: true });
    S3.el.addEventListener("pointerup", (e) => {
      P.drag = false; st.dirty = true;
      if (!down || performance.now() - down[2] > 400 || Math.hypot(e.clientX - down[0], e.clientY - down[1]) > 8 || e.target !== S.renderer.domElement) return;
      const pk = S.o.pick; if (!pk) return;
      if (pk.kind === "mark") { const i = pk.info; info("<b>" + esc(i.t) + "</b><p>" + esc(i.s) + '</p><p class="hint">' + esc(deg(i.lat, "K", "G") + " · " + deg(i.lon, "D", "B")) + "</p>"); }
      else showGeo(pk.lon, pk.lat);
    });
    view.querySelectorAll("[data-l]").forEach((cb) => cb.addEventListener("change", () => {
      P.L = Object.assign({}, P.L, { [cb.dataset.l]: cb.checked }); App.prefs.set("kureL", P.L);
      $("#kSun").hidden = !P.L.gunes; $("#kYear").hidden = !P.L.tarih; st.sk = null; legend();
    }));
    view.querySelectorAll("[data-doy]").forEach((b) => b.addEventListener("click", () => { P.doy = +b.dataset.doy; $("#kDoy").value = String(P.doy); }));
    $("#kDoy").addEventListener("input", (e) => { P.doy = +e.target.value; });
    $("#kHr").addEventListener("input", (e) => { P.hour = +e.target.value; });
    const yl = () => { $("#kYL").textContent = P.year < 0 ? "MÖ " + (-P.year) : String(P.year); };
    $("#kY").addEventListener("input", (e) => { P.year = +e.target.value; yl(); }); yl();
    $("#kSpin").addEventListener("change", (e) => { P.spin = e.target.checked; });
    $("#kQ").addEventListener("change", (e) => {
      const q = String(e.target.value || "").toLocaleLowerCase("tr").trim(); if (!q) return;
      const c = App.data.globe.countries.find((x) => x.n.toLocaleLowerCase("tr") === q) || App.data.globe.countries.find((x) => x.n.toLocaleLowerCase("tr").indexOf(q) === 0 || (x.en || "").toLowerCase().indexOf(q) === 0);
      if (!c) { info('<p class="hint">' + esc(T("Ülke bulunamadı.", "Country not found.")) + "</p>"); return; }
      // ülkenin ortası: en büyük halkanın köşe ortalaması
      const rg = c.r.slice().sort((a, b) => b.length - a.length)[0]; const lon = rg.reduce((s, p) => s + p[0], 0) / rg.length, lat = rg.reduce((s, p) => s + p[1], 0) / rg.length;
      P.spin = false; $("#kSpin").checked = false; P.focus = { lon, lat }; showGeo(lon, lat);
      if (window.innerWidth < 860) { const r = S3.el.getBoundingClientRect(); if (r.top < 0 || r.bottom > window.innerHeight) S3.el.scrollIntoView({ block: "center", behavior: "smooth" }); }   // telefonda küre görünür olsun
    });
    $("#kHolo").addEventListener("click", () => S3.holoStart({ side: $("#kSide"), look: "real" }).catch(() => {}));
    legend();
    st.loop();
    App.kure._P = P;
  }

  App.router.register("kure", (view) => page(view));
  App.kure = { vec, countryAt, solarTime, loadData, QUAKES, VOLC, stop: () => stop() };
})();
