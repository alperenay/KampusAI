/* =========================================================
   vatandas.js — Çevrimdışı Vatandaş Bilimi Ağı (v1.49)   #/vatandas  ·  #/vatandas/harita  ·  #/vatandas/paylas

   Öğrenciler mahallelerinin gürültüsünü ve gece gökyüzünün ışık kirliliğini telefonla ölçer; ölçümler konum ve
   zamanla kaydedilir, internetsiz QR ile birleştirilir ve ortak bir ısı haritasına dönüşür.
     Gürültü   Mikrofon RMS genliği → dBFS = 20·log10(RMS) → dB SPL ≈ dBFS + kalibrasyon farkı.
               10 saniyelik ölçümün eşdeğer seviyesi Leq = 10·log10(ortalama 10^(L/10)) kaydedilir.
     Işık      Gökyüzüne tutulan kameranın görüntü parlaklığı (doğrusal ışık), pozlama süresi ve ISO ile
               normalleştirilir: B = Y / (t · ISO/100). Gökyüzü parlaklığı m ≈ K − 2,5·log10(B) (kadir/açısaniye²),
               ardından Bortle ölçeği (1 = kusursuz karanlık … 9 = şehir merkezi). Pozlama bilgisi vermeyen
               kameralarda değer göreli kalır ve öyle işaretlenir.
     Ağ        Ölçümler sıkıştırılmış QR karelerine (Sınıf Modu "vb" paketi) dönüşür; okunan paketler mükerrer
               kayıtlardan arındırılarak birleştirilir. Harita: ters uzaklık ağırlıklı (IDW) aradeğerleme.
   Veri cihazda kalır (meta "vb:data"); hiçbir sunucuya gönderilmez.
   ========================================================= */
(function () {
  const { esc } = App.utils;
  const T = (tr, en) => (App.i18n && App.i18n.lang === "en" ? en : tr);
  const fmt = (x, d) => (x == null || !Number.isFinite(x) ? "—" : x.toFixed(d == null ? 1 : d).replace(".", App.i18n && App.i18n.lang === "en" ? "." : ","));

  /* ================= Saf hesaplar (sınanabilir) ================= */
  const DEFAULT_OFFSET = 100;          // tipik telefon mikrofonu: −40 dBFS ≈ 60 dB SPL (konuşma)
  /** RMS genlik (0–1) → dB SPL tahmini */
  function dbFromRms(rms, offset) {
    return 20 * Math.log10(Math.max(rms, 1e-7)) + (offset == null ? DEFAULT_OFFSET : offset);
  }
  /** Float örneklerin RMS'i */
  function rms(buf) { let s = 0; for (let i = 0; i < buf.length; i++) s += buf[i] * buf[i]; return Math.sqrt(s / Math.max(1, buf.length)); }
  /** Eşdeğer sürekli ses seviyesi (enerji ortalaması) */
  function leq(levels) {
    const v = levels.filter(Number.isFinite);
    if (!v.length) return null;
    return 10 * Math.log10(v.reduce((s, L) => s + Math.pow(10, L / 10), 0) / v.length);
  }
  /** Gürültü seviyesinin gündelik karşılığı */
  const NOISE_BANDS = () => [[35, T("Çok sessiz (kütüphane)", "Very quiet")], [50, T("Sessiz (sakin oda)", "Quiet")], [65, T("Orta (konuşma)", "Moderate")],
    [80, T("Gürültülü (yoğun trafik)", "Loud")], [200, T("Çok gürültülü: uzun süre maruz kalma işitmeye zarar verir", "Very loud: harmful over time")]];
  const noiseLabel = (db) => NOISE_BANDS().find((b) => db < b[0])[1];

  /** sRGB bayt → doğrusal ışık (0–1) */
  const lin = (c) => { c /= 255; return c <= 0.04045 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4); };
  const SKY_K = 17.6;                   // B = 1 iken (ISO 100, 1 s, orta gri) yaklaşık gökyüzü parlaklığı; kaba kalibrasyon
  /** Gökyüzü parlaklığı tahmini (kadir/açısaniye²). meanLin: doğrusal parlaklık 0–1, expS: saniye, iso */
  function sqmEstimate(meanLin, expS, iso) {
    if (!(meanLin > 0)) return null;
    const rel = !(expS > 0 && iso > 0);
    const B = rel ? meanLin * 40 : meanLin / (expS * (iso / 100));
    return { m: SKY_K - 2.5 * Math.log10(Math.max(B, 1e-6)), relative: rel };
  }
  /** Gökyüzü parlaklığı (kadir/açısaniye²) → Bortle sınıfı (1–9) */
  function bortleFromSqm(m) {
    const T9 = [[21.75, 1], [21.6, 2], [21.3, 3], [20.8, 4], [20.3, 5], [19.25, 6], [18.5, 7], [18.0, 8]];
    for (const [lim, cls] of T9) if (m >= lim) return cls;
    return 9;
  }
  const BORTLE_NAME = (b) => [null, T("Kusursuz karanlık gökyüzü", "Excellent dark sky"), T("Tipik karanlık alan", "Typical dark site"), T("Kırsal gökyüzü", "Rural sky"),
    T("Kırsal-banliyö geçişi", "Rural/suburban"), T("Banliyö", "Suburban"), T("Aydınlık banliyö", "Bright suburban"), T("Banliyö-şehir geçişi", "Suburban/urban"),
    T("Şehir gökyüzü", "City sky"), T("Şehir merkezi", "Inner city")][b];

  /** Kayıt anahtarı (mükerrer temizleme): tür, değer, konum (~1 m), dakika */
  const recKey = (r) => [r.k, Math.round(r.v * 10), r.lat == null ? "x" : Math.round(r.lat * 1e5), r.lon == null ? "x" : Math.round(r.lon * 1e5), Math.round(Date.parse(r.at) / 60000)].join("|");
  /** Ölçüm listesini birleştirir; aynı ölçüm yalnızca bir kez kalır */
  function merge(base, extra) {
    const seen = new Set((base || []).map(recKey)), out = (base || []).slice();
    let added = 0;
    (extra || []).forEach((r) => { const k = recKey(r); if (!seen.has(k)) { seen.add(k); out.push(r); added++; } });
    return { items: out, added };
  }
  /** Ölçümler → QR paketi (yalnızca sayılar; tamsayıya yuvarlanır) */
  function toPacket(items, name) {
    const m = items.slice(-200).map((r) => [r.k === "l" ? 1 : 0, Math.round(r.v * 10), r.lat == null ? null : Math.round(r.lat * 1e5), r.lon == null ? null : Math.round(r.lon * 1e5), Math.round(Date.parse(r.at) / 60000)]);
    const id = "vb" + (m.reduce((h, r) => (h * 31 + r[1] + r[4]) >>> 0, 7)).toString(36);
    return { v: 1, t: "vb", id, s: String(name || "").slice(0, 40) || "?", m };
  }
  /** QR paketi → ölçümler */
  function fromPacket(d) {
    return d.m.map((r) => ({ k: r[0] === 1 ? "l" : "n", v: r[1] / 10, lat: r[2] == null ? null : r[2] / 1e5, lon: r[3] == null ? null : r[3] / 1e5, at: new Date(r[4] * 60000).toISOString(), by: d.s }));
  }

  /** Konumlu noktaların sınır kutusu (tek noktada ~100 m pay bırakır) */
  function bbox(pts) {
    const p = pts.filter((x) => x.lat != null && x.lon != null);
    if (!p.length) return null;
    let s = Math.min(...p.map((x) => x.lat)), n = Math.max(...p.map((x) => x.lat)), w = Math.min(...p.map((x) => x.lon)), e = Math.max(...p.map((x) => x.lon));
    const pad = Math.max(0.0009, (n - s) * 0.12, (e - w) * 0.12);
    return { s: s - pad, n: n + pad, w: w - pad, e: e + pad };
  }
  /** Ters uzaklık ağırlıklı (IDW, p = 2) ızgara. Dönüş: cols×rows değer dizisi (veri uzaksa null) */
  function idwGrid(pts, box, cols, rows, maxDist) {
    const p = pts.filter((x) => x.lat != null && x.lon != null && Number.isFinite(x.v));
    const kx = Math.cos((((box.s + box.n) / 2) * Math.PI) / 180);  // boylam derecesi kısalır
    const out = new Array(cols * rows).fill(null);
    const md = maxDist || Math.max((box.n - box.s), (box.e - box.w) * kx) * 0.6;
    for (let j = 0; j < rows; j++) for (let i = 0; i < cols; i++) {
      const lat = box.n - ((j + 0.5) / rows) * (box.n - box.s), lon = box.w + ((i + 0.5) / cols) * (box.e - box.w);
      let sw = 0, sv = 0, exact = null;
      for (const q of p) {
        const d = Math.hypot(q.lat - lat, (q.lon - lon) * kx);
        if (d < 1e-9) { exact = q.v; break; }
        if (d > md) continue;
        const w = 1 / (d * d); sw += w; sv += w * q.v;
      }
      out[j * cols + i] = exact != null ? exact : sw ? sv / sw : null;
    }
    return out;
  }
  /** Değer → renk (gürültü 30–90 dB yeşil→kırmızı; ışık Bortle 1–9 lacivert→sarı) */
  function colorFor(kind, v) {
    /** @type {Array<[number, number[]]>} */
    const stops = kind === "l" ? [[1, [20, 30, 90]], [3, [40, 70, 160]], [5, [120, 90, 170]], [7, [230, 140, 60]], [9, [255, 235, 120]]]
      : [[30, [46, 170, 110]], [50, [150, 200, 70]], [65, [245, 200, 60]], [80, [240, 120, 50]], [95, [200, 40, 50]]];
    if (v <= stops[0][0]) return stops[0][1];
    for (let i = 1; i < stops.length; i++) if (v <= stops[i][0]) {
      const [a, ca] = stops[i - 1], [b, cb] = stops[i], k = (v - a) / (b - a);
      return ca.map((c, j) => Math.round(c + k * (cb[j] - c)));
    }
    return stops[stops.length - 1][1];
  }

  /* ================= Depolama ================= */
  const load = async () => { const r = await App.db.get("meta", "vb:data").catch(() => null); return r && Array.isArray(r.items) ? r.items : []; };
  const saveAll = (items) => App.db.put("meta", { id: "vb:data", items: items.slice(-2000) });
  async function add(rec) { const items = await load(); const r = merge(items, [rec]); await saveAll(r.items); return r.added; }
  const myName = () => App.prefs.get("vbName", "") || App.prefs.get("userName", "") || T("Öğrenci", "Student");
  function locate() {
    return new Promise((resolve) => {
      if (!navigator.geolocation) { resolve(null); return; }
      navigator.geolocation.getCurrentPosition((p) => resolve({ lat: p.coords.latitude, lon: p.coords.longitude, acc: p.coords.accuracy }), () => resolve(null), { enableHighAccuracy: true, timeout: 10000, maximumAge: 30000 });
    });
  }

  /* ================= Arayüz ================= */
  function tabs(cur) {
    return '<nav class="vb-tabs" aria-label="' + esc(T("Bölümler", "Sections")) + '">' + [["", T("Ölç", "Measure"), "mic"], ["harita", T("Harita", "Map"), "map"], ["paylas", T("Paylaş ve birleştir", "Share & merge"), "scan"]].map(([id, name, ic]) =>
      '<a class="btn btn--sm' + (cur === id ? " btn--primary" : " btn--ghost") + '" href="#/vatandas' + (id ? "/" + id : "") + '"' + (cur === id ? ' aria-current="page"' : "") + ">" + App.icon(ic) + esc(name) + "</a>").join("") + "</nav>";
  }
  function head(cur) {
    return '<div class="page-head"><div><h1>' + esc(T("Vatandaş Bilimi Ağı", "Citizen Science Network")) + "</h1><p>" +
      esc(T("Mahallenin gürültüsünü ve gece gökyüzünün ışık kirliliğini ölç. Arkadaşlarının ölçümlerini QR ile internetsiz birleştir ve ortak haritayı çıkar.", "Measure noise and light pollution, merge friends' data offline by QR and build a shared map.")) + "</p></div></div>" + tabs(cur);
  }

  function renderMeasure(view) {
    view.innerHTML = '<div class="page vb">' + head("") +
      '<div class="vb-grid"><section class="card vb-card"><h2>' + App.icon("mic") + esc(T("Gürültü ölçümü", "Noise")) + "</h2>" +
        '<div class="vb-meter"><b id="vbDb">—</b><span>dB</span></div><p class="vb-lab" id="vbDbLab"></p><canvas class="vb-spark" id="vbSpark" width="320" height="60" aria-hidden="true"></canvas>' +
        '<div class="ph-acts"><button class="btn btn--primary" type="button" id="vbMic">' + App.icon("play") + esc(T("10 saniye ölç", "Measure 10 s")) + "</button></div>" +
        '<details class="vb-cal"><summary>' + esc(T("Kalibrasyon", "Calibration")) + '</summary><p class="hint">' + esc(T("Telefon mikrofonları farklıdır. Yanında bir ses ölçer (ya da kalibre edilmiş bir uygulama) varsa aynı anda ölçüp gerçek değeri gir.", "Phones differ. If you have a sound meter, enter its reading measured at the same time.")) + "</p>" +
          '<label class="field"><span class="field__label">' + esc(T("Ses ölçerin gösterdiği (dB)", "Reference meter (dB)")) + '</span><input class="input" type="number" id="vbRef" min="20" max="130" step="0.5"></label>' +
          '<button class="btn btn--sm" type="button" id="vbCal">' + esc(T("Son ölçüme göre ayarla", "Calibrate to last reading")) + '</button> <button class="btn btn--sm btn--ghost" type="button" id="vbCalReset">' + esc(T("Sıfırla", "Reset")) + '</button><p class="hint" id="vbCalNow"></p></details></section>' +
      '<section class="card vb-card"><h2>' + App.icon("moon") + esc(T("Işık kirliliği", "Light pollution")) + "</h2>" +
        '<div class="vb-sky"><video playsinline muted></video></div><div class="vb-meter"><b id="vbBortle">—</b><span>Bortle</span></div><p class="vb-lab" id="vbSkyLab"></p>' +
        '<div class="ph-acts"><button class="btn btn--primary" type="button" id="vbCam">' + App.icon("camera") + esc(T("Gökyüzünü ölç", "Measure the sky")) + "</button></div>" +
        '<p class="hint">' + esc(T("Gece, ay ışığı yokken, telefonu doğrudan sokak lambası görmeyen açık bir gökyüzüne (tepe noktasına) tut. Ölçüm 3 saniye sürer.", "At night, aim straight up at open sky away from street lamps; takes 3 s.")) + "</p></section></div>" +
      '<section class="card vb-name"><label class="field"><span class="field__label">' + esc(T("Ölçümlerde görünecek adın", "Your name on readings")) + '</span><input class="input" id="vbNameI" maxlength="30" value="' + esc(myName()) + '"></label>' +
        '<p class="hint" id="vbCount"></p></section>' +
      '<div class="sl-links">' + ["11/fizik/u4/k3", "10/kimya/u4/k2", "10/matematik/t2/k2"].filter((k) => App.lessons && App.lessons.find(k)).map((k) => '<a href="#/konular/' + k + '">' + App.icon("book") + esc(App.L(App.lessons.find(k).outcome.title)) + "</a>").join("") + "</div></div>";
    App.hydrateIcons(view);
    const $ = (s) => view.querySelector(s);
    let stopFn = null, epoch = 0, lastNoise = null;
    const cleanup = () => { epoch++; if (stopFn) { try { stopFn(); } catch (e) { /* yok */ } stopFn = null; } };
    const offset = () => Number(App.prefs.get("vbOffset", DEFAULT_OFFSET)) || DEFAULT_OFFSET;
    const paintCal = () => { $("#vbCalNow").textContent = T("Şu anki fark: ", "Current offset: ") + fmt(offset(), 1) + " dB"; };
    const paintCount = async () => { const it = await load(); if (!document.contains($("#vbCount"))) return; const n = it.filter((x) => x.k === "n").length, l = it.length - n; $("#vbCount").textContent = T("Cihazdaki ölçümler: " + n + " gürültü, " + l + " ışık (" + new Set(it.map((x) => x.by)).size + " kişi).", "Stored: " + n + " noise, " + l + " light."); };
    paintCal(); paintCount();
    $("#vbNameI").addEventListener("change", (e) => App.prefs.set("vbName", e.target.value.trim()));
    async function saveRec(k, v, extra) {
      const pos = await locate();
      const rec = Object.assign({ k, v: +v.toFixed(1), lat: pos ? +pos.lat.toFixed(5) : null, lon: pos ? +pos.lon.toFixed(5) : null, at: new Date().toISOString(), by: myName() }, extra || {});
      await add(rec);
      App.ui.toast(pos ? T("Ölçüm konumuyla kaydedildi", "Saved with location") : T("Konum alınamadı; ölçüm konumsuz kaydedildi (haritada görünmez).", "No location; saved without it."));
      paintCount();
    }
    $("#vbMic").onclick = async () => {
      cleanup(); const mine = epoch;
      let stream;
      try { stream = await navigator.mediaDevices.getUserMedia({ audio: { echoCancellation: false, noiseSuppression: false, autoGainControl: false } }); }
      catch (e) { App.ui.toast(T("Mikrofon açılamadı.", "Microphone unavailable."), "error"); return; }
      if (mine !== epoch) { stream.getTracks().forEach((t) => t.stop()); return; }
      const ac = new (window.AudioContext || window.webkitAudioContext)(), an = ac.createAnalyser();
      an.fftSize = 2048; ac.createMediaStreamSource(stream).connect(an);
      const buf = new Float32Array(an.fftSize), levels = [], t0 = performance.now(), cv = $("#vbSpark"), g = cv.getContext("2d");
      let raf = 0;
      $("#vbMic").disabled = true;
      const loop = () => {
        if (mine !== epoch) return;
        an.getFloatTimeDomainData(buf);
        const L = dbFromRms(rms(buf), offset()); levels.push(L);
        $("#vbDb").textContent = fmt(L, 0); $("#vbDbLab").textContent = noiseLabel(L);
        g.clearRect(0, 0, cv.width, cv.height); g.strokeStyle = "#e0a030"; g.lineWidth = 2; g.beginPath();
        levels.slice(-160).forEach((x, i) => { const y = cv.height - ((Math.max(20, Math.min(100, x)) - 20) / 80) * cv.height; i ? g.lineTo(i * 2, y) : g.moveTo(0, y); }); g.stroke();
        if (performance.now() - t0 > 10000) { finish(); return; }
        raf = requestAnimationFrame(loop);
      };
      const finish = async () => {
        cleanup();
        const v = leq(levels); if (v == null) return;
        lastNoise = v - offset();     // dBFS: kalibrasyon için
        $("#vbDb").textContent = fmt(v, 1); $("#vbDbLab").textContent = "Leq · " + noiseLabel(v);
        await saveRec("n", v);
      };
      stopFn = () => { cancelAnimationFrame(raf); stream.getTracks().forEach((t) => t.stop()); ac.close(); if ($("#vbMic")) $("#vbMic").disabled = false; };
      loop();
    };
    $("#vbCal").onclick = () => {
      const ref = Number($("#vbRef").value);
      if (lastNoise == null || !(ref >= 20 && ref <= 130)) { App.ui.toast(T("Önce bir ölçüm yap ve ses ölçerin değerini gir.", "Measure first and enter the reference."), "error"); return; }
      App.prefs.set("vbOffset", ref - lastNoise); paintCal(); App.ui.toast(T("Kalibrasyon kaydedildi", "Calibration saved"));
    };
    $("#vbCalReset").onclick = () => { App.prefs.set("vbOffset", DEFAULT_OFFSET); paintCal(); };
    $("#vbCam").onclick = async () => {
      cleanup(); const mine = epoch;
      let stream;
      try { stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: { ideal: "environment" }, width: { ideal: 320 } } }); }
      catch (e) { App.ui.toast(T("Kamera açılamadı.", "Camera unavailable."), "error"); return; }
      if (mine !== epoch) { stream.getTracks().forEach((t) => t.stop()); return; }
      const video = view.querySelector(".vb-sky video"); video.srcObject = stream; await video.play().catch(() => {});
      const c = document.createElement("canvas"), x = c.getContext("2d", { willReadFrequently: true }); c.width = 64; c.height = 48;
      const vals = [], t0 = performance.now(); let timer = 0;
      $("#vbCam").disabled = true; $("#vbSkyLab").textContent = T("Ölçülüyor…", "Measuring…");
      stopFn = () => { clearTimeout(timer); stream.getTracks().forEach((t) => t.stop()); video.srcObject = null; if ($("#vbCam")) $("#vbCam").disabled = false; };
      const tick = async () => {
        if (mine !== epoch) return;
        if (video.readyState >= 2) {
          x.drawImage(video, 0, 0, 64, 48); const d = x.getImageData(0, 0, 64, 48).data; let s = 0;
          for (let i = 0; i < d.length; i += 4) s += 0.2126 * lin(d[i]) + 0.7152 * lin(d[i + 1]) + 0.0722 * lin(d[i + 2]);
          vals.push(s / (d.length / 4));
        }
        if (performance.now() - t0 < 3000) { timer = setTimeout(tick, 120); return; }
        const tr = stream.getVideoTracks()[0], st = /** @type {any} */ (tr.getSettings ? tr.getSettings() : {});
        // exposureTime: tarayıcılar 100 µs biriminde verir
        const expS = Number.isFinite(st.exposureTime) && st.exposureTime > 0 ? st.exposureTime / 10000 : null, iso = Number.isFinite(st.iso) ? st.iso : null;
        cleanup();
        const mean = vals.length ? vals.reduce((a, b) => a + b, 0) / vals.length : 0, q = sqmEstimate(mean, expS, iso);
        if (!q) { $("#vbSkyLab").textContent = T("Görüntü alınamadı.", "No image."); return; }
        const b = bortleFromSqm(q.m);
        $("#vbBortle").textContent = String(b);
        $("#vbSkyLab").textContent = BORTLE_NAME(b) + " · ≈" + fmt(q.m, 1) + T(" kadir/açısaniye²", " mag/arcsec²") + (q.relative ? " · " + T("göreli (kamera pozlama bilgisi vermiyor)", "relative (no exposure data)") : "");
        await saveRec("l", b, { m: +q.m.toFixed(2), rel: q.relative });
      };
      tick();
    };
    return cleanup;
  }

  async function renderMap(view) {
    let kind = App.prefs.get("vbLayer", "n");
    view.innerHTML = '<div class="page vb">' + head("harita") +
      '<section class="card vb-mapcard"><div class="lang-switch seg" role="radiogroup" id="vbLayer">' + [["n", T("Gürültü", "Noise")], ["l", T("Işık kirliliği", "Light pollution")]].map(([v, n]) =>
        '<button type="button" role="radio" data-v="' + v + '" aria-checked="' + (kind === v) + '">' + esc(n) + "</button>").join("") + "</div>" +
        '<canvas class="vb-map" id="vbMap" role="img"></canvas><div class="vb-legend" id="vbLegend"></div><p class="hint" id="vbMapInfo"></p></section>' +
      '<section class="card"><h2 class="section-title">' + esc(T("Ölçümler", "Readings")) + '</h2><div id="vbList"></div>' +
        '<div class="ph-acts"><button class="btn btn--sm" type="button" id="vbCsv">' + App.icon("download") + esc(T("CSV indir", "Download CSV")) + '</button><button class="btn btn--sm btn--ghost" type="button" id="vbClear">' + App.icon("trash") + esc(T("Tümünü sil", "Delete all")) + "</button></div></section></div>";
    App.hydrateIcons(view);
    const $ = (s) => view.querySelector(s);
    let items = await load();
    if (!document.contains($("#vbMap"))) return;
    function draw() {
      const cv = $("#vbMap"), pts = items.filter((r) => r.k === kind), box = bbox(pts), w = cv.clientWidth || 600, h = Math.round(w * 0.7), dpr = window.devicePixelRatio || 1;
      cv.width = w * dpr; cv.height = h * dpr; const g = cv.getContext("2d"); g.setTransform(dpr, 0, 0, dpr, 0, 0);
      g.fillStyle = getComputedStyle(cv).getPropertyValue("--vb-bg") || "#10151f"; g.fillRect(0, 0, w, h);
      cv.setAttribute("aria-label", T("Isı haritası: ", "Heat map: ") + pts.length + T(" ölçüm", " readings"));
      const located = pts.filter((p) => p.lat != null);
      $("#vbMapInfo").textContent = !pts.length ? T("Bu katmanda henüz ölçüm yok. Ölç sekmesinden ölçüm ekle ya da arkadaşlarının QR kodlarını oku.", "No readings yet.") :
        T(located.length + " konumlu ölçüm, " + new Set(pts.map((p) => p.by)).size + " kişi. Ortalama: ", located.length + " located readings. Mean: ") + (kind === "n" ? fmt(leq(pts.map((p) => p.v)), 1) + " dB (Leq)" : "Bortle " + fmt(pts.reduce((s, p) => s + p.v, 0) / pts.length, 1));
      if (box) {
        const cols = 48, rows = Math.round(cols * 0.7), grid = idwGrid(located, box, cols, rows), cw = w / cols, ch = h / rows;
        grid.forEach((v, i) => { if (v == null) return; const c = colorFor(kind, v); g.fillStyle = "rgba(" + c.join(",") + ",0.55)"; g.fillRect((i % cols) * cw, Math.floor(i / cols) * ch, cw + 0.5, ch + 0.5); });
        const P = (p) => [((p.lon - box.w) / (box.e - box.w)) * w, ((box.n - p.lat) / (box.n - box.s)) * h];
        located.forEach((p) => { const [x, y] = P(p), c = colorFor(kind, p.v); g.beginPath(); g.arc(x, y, 6, 0, 7); g.fillStyle = "rgb(" + c.join(",") + ")"; g.fill(); g.lineWidth = 2; g.strokeStyle = "#fff"; g.stroke(); });
        // Ölçek çubuğu
        const kmW = ((box.e - box.w) * 111.32 * Math.cos((((box.s + box.n) / 2) * Math.PI) / 180)), m100 = (100 / (kmW * 1000)) * w;
        if (m100 > 10 && m100 < w / 2) { g.fillStyle = "#fff"; g.fillRect(12, h - 18, m100, 3); g.font = "11px system-ui"; g.fillText("100 m", 12, h - 24); }
      }
      const stops = kind === "n" ? [30, 45, 60, 75, 90] : [1, 3, 5, 7, 9];
      $("#vbLegend").innerHTML = stops.map((v) => '<span><i style="background:rgb(' + colorFor(kind, v).join(",") + ')"></i>' + (kind === "n" ? v + " dB" : "B" + v) + "</span>").join("");
      $("#vbList").innerHTML = pts.length ? '<ul class="vb-list">' + pts.slice(-30).reverse().map((p) => "<li><i style=\"background:rgb(" + colorFor(kind, p.v).join(",") + ')"></i><b>' + (kind === "n" ? fmt(p.v, 1) + " dB" : "Bortle " + p.v) + "</b><span>" + esc(p.by || "") + " · " + esc(App.utils.fmtDateTime ? App.utils.fmtDateTime(p.at) : p.at) + (p.lat == null ? " · " + esc(T("konumsuz", "no location")) : "") + "</span></li>").join("") + "</ul>" : "";
    }
    $("#vbLayer").addEventListener("click", (e) => { const b = e.target.closest("[data-v]"); if (!b) return; kind = b.dataset.v; App.prefs.set("vbLayer", kind); $("#vbLayer").querySelectorAll("[data-v]").forEach((x) => x.setAttribute("aria-checked", String(x === b))); draw(); });
    $("#vbCsv").onclick = () => App.utils.downloadText("vatandas-bilimi.csv", "tur,deger,enlem,boylam,zaman,olcen\n" + items.map((r) => [r.k === "n" ? "gurultu_dB" : "isik_Bortle", r.v, r.lat == null ? "" : r.lat, r.lon == null ? "" : r.lon, r.at, '"' + String(r.by || "").replace(/"/g, "'") + '"'].join(",")).join("\n"), "text/csv");
    $("#vbClear").onclick = async () => { if (!confirm(T("Bu cihazdaki tüm ölçümler silinsin mi?", "Delete all readings on this device?"))) return; items = []; await saveAll([]); draw(); };
    const onResize = () => draw();
    window.addEventListener("resize", onResize);
    draw();
    return () => window.removeEventListener("resize", onResize);
  }

  async function renderShare(view) {
    view.innerHTML = '<div class="page vb">' + head("paylas") +
      '<div class="vb-grid"><section class="card"><h2>' + App.icon("upload") + esc(T("Ölçümlerimi paylaş", "Share my readings")) + '</h2><p class="hint">' + esc(T("Arkadaşın bu QR'ı kendi telefonundaki \"Kod oku\" düğmesiyle okutur. İnternet gerekmez.", "A friend scans this with \"Scan code\"; no internet needed.")) + '</p><div id="vbQr"></div></section>' +
      '<section class="card"><h2>' + App.icon("scan") + esc(T("Arkadaşının ölçümlerini ekle", "Add a friend's readings")) + '</h2><p class="hint">' + esc(T("Aynı ölçüm iki kez gelse de bir kez sayılır. Tüm sınıfın kodlarını sırayla okutup ortak haritayı oluşturabilirsiniz.", "Duplicates are counted once; scan the whole class to build a shared map.")) + "</p>" +
        '<button class="btn btn--primary" type="button" id="vbScan">' + App.icon("camera") + esc(T("Kod oku", "Scan code")) + '</button><p class="hint" id="vbScanRes" aria-live="polite"></p></section></div></div>';
    App.hydrateIcons(view);
    const $ = (s) => view.querySelector(s);
    const items = await load(), mine = items.filter((r) => r.by === myName());
    if (!document.contains($("#vbQr"))) return;
    let player = null;
    if (!mine.length) $("#vbQr").innerHTML = '<p class="empty">' + esc(T("Henüz senin adınla kayıtlı ölçüm yok.", "No readings under your name yet.")) + "</p>";
    else { const frames = await App.sinifModu.pack(toPacket(mine, myName())); if (document.contains($("#vbQr"))) player = await App.sinifModu.mountPlayer($("#vbQr"), frames); }
    $("#vbScan").onclick = async () => {
      const res = await App.sinifModu.scan(T("Ölçüm kodunu oku", "Scan measurement code"), "vb");
      if (!res) return;
      const cur = await load(), r = merge(cur, fromPacket(res.data));
      await saveAll(r.items);
      $("#vbScanRes").textContent = T(res.data.s + " adlı kişiden " + r.added + " yeni ölçüm eklendi (" + (res.data.m.length - r.added) + " tanesi zaten vardı).", r.added + " new readings added from " + res.data.s + ".");
    };
    return () => { if (player) player.stop(); };
  }

  function render(view, p) {
    App.setTitle(T("Vatandaş Bilimi Ağı", "Citizen Science Network"));
    return p[0] === "harita" ? renderMap(view) : p[0] === "paylas" ? renderShare(view) : renderMeasure(view);
  }
  App.router.register("vatandas", render);
  App.vatandas = { dbFromRms, rms, leq, noiseLabel, sqmEstimate, bortleFromSqm, merge, toPacket, fromPacket, bbox, idwGrid, colorFor, DEFAULT_OFFSET };
})();
