/* =========================================================
   ph-metre.js — Kırmızı Lahana Suyu pH Ölçer (v1.49)   #/ph

   Kırmızı lahanadaki antosiyanin doğal bir asit-baz göstergesidir: kuvvetli asitte kırmızı, nötrde menekşe-mavi,
   bazda yeşil, kuvvetli bazda sarı olur. Kamera (ya da fotoğraf / elle seçilen renk) bu rengi okur:
     1. Örnek bölgenin ortalama RGB'si alınır; sRGB → doğrusal RGB.
     2. Beyaz dengesi: beyaz kâğıttan alınan referansla kanal kazançları (von Kries); referans yoksa gri dünya varsayımı.
     3. CIELAB'a dönüşüm; açıklık (L*) seyreltmeyle değiştiği için yalnızca renk tonu açısı h = atan2(b*, a*) kullanılır.
     4. Antosiyanin renk skalası (pH 1–14) ton açısında tekdüze azalan bir eğridir; ölçülen ton iki komşu
        başvuru noktası arasında doğrusal aradeğerlenir. Güven aralığı yerel eğimden ve renk doygunluğundan gelir.
   Sonuç evdeki maddelerle (limon, sirke, sabun, çamaşır suyu…) eşleştirilir; ölçümler cihazda saklanır (meta "ph:log").
   ========================================================= */
(function () {
  const { esc } = App.utils;
  const T = (tr, en) => (App.i18n && App.i18n.lang === "en" ? en : tr);

  /* ================= Saf hesaplar (sınanabilir) ================= */
  const lin = (c) => { c /= 255; return c <= 0.04045 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4); };
  const gam = (c) => { const v = c <= 0.0031308 ? 12.92 * c : 1.055 * Math.pow(c, 1 / 2.4) - 0.055; return Math.max(0, Math.min(255, Math.round(v * 255))); };

  /** RGB (0–255) → HSV (h: 0–360°, s ve v: 0–1) */
  function rgbToHsv(rgb) {
    const [r, g, b] = rgb.map((x) => x / 255), mx = Math.max(r, g, b), mn = Math.min(r, g, b), d = mx - mn;
    let h = 0;
    if (d) h = mx === r ? ((g - b) / d) % 6 : mx === g ? (b - r) / d + 2 : (r - g) / d + 4;
    return { h: (h * 60 + 360) % 360, s: mx ? d / mx : 0, v: mx };
  }
  /** sRGB (0–255) → CIELAB (D65) */
  function rgbToLab(rgb) {
    const [r, g, b] = rgb.map(lin);
    const X = (0.4124 * r + 0.3576 * g + 0.1805 * b) / 0.95047, Y = 0.2126 * r + 0.7152 * g + 0.0722 * b, Z = (0.0193 * r + 0.1192 * g + 0.9505 * b) / 1.08883;
    const f = (t) => (t > 216 / 24389 ? Math.cbrt(t) : (841 / 108) * t + 4 / 29);
    const fx = f(X), fy = f(Y), fz = f(Z);
    return { L: 116 * fy - 16, a: 500 * (fx - fy), b: 200 * (fy - fz) };
  }
  /** Beyaz dengesi: white verilirse beyaz-yama (von Kries), verilmezse rgb olduğu gibi döner. Doğrusal ışıkta çalışır. */
  function whiteBalance(rgb, white) {
    if (!Array.isArray(white) || white.length!==3 || white.some((x) => !Number.isFinite(x) || x<=8 || x>255)) return rgb.slice();
    const wl = white.map(lin), target = Math.max(...wl);
    return rgb.map((c, i) => gam(Math.min(1, (lin(c) * target) / wl[i])));
  }
  /** Gri dünya varsayımıyla bir karenin ortalamasından beyaz tahmini */
  function grayWorldWhite(avg) {
    const m = (avg[0] + avg[1] + avg[2]) / 3;
    return m > 8 ? avg.map((c) => Math.min(255,(c / m) * 230)) : null;
  }

  /** Antosiyanin skalası: [pH, RGB] (yaklaşık; ders kitaplarındaki göstergelerin ortak tonları)
      @type {Array<[number, number[]]>} */
  const SCALE = [
    [1, [214, 40, 70]], [2, [222, 52, 112]], [3, [205, 65, 150]], [4, [170, 70, 165]], [5, [140, 72, 170]],
    [6, [118, 80, 178]], [7, [95, 88, 185]], [8, [65, 105, 190]], [9, [45, 135, 175]], [10, [40, 160, 130]],
    [11, [70, 180, 85]], [12, [140, 195, 55]], [13, [205, 200, 45]], [14, [225, 190, 35]]
  ];
  const hueOf = (lab) => (Math.atan2(lab.b, lab.a) * 180) / Math.PI;
  // Skalanın ton açıları kırmızıdan sarıya azalarak (saat yönünde) döner; açılar tekdüze olacak biçimde açılır
  const REF = (() => {
    const out = []; let prev = null;
    SCALE.forEach(([ph, rgb]) => {
      let h = hueOf(rgbToLab(rgb));
      if (prev != null) while (h > prev) h -= 360;
      out.push({ ph, h, rgb }); prev = h;
    });
    return out;
  })();

  /** @type {Array<[number, () => string, string]>} */
  const BANDS = [
    [2.5, () => T("Kuvvetli asit", "Strong acid"), "kirmizi"], [6.5, () => T("Zayıf asit", "Weak acid"), "mor"], [7.5, () => T("Nötr", "Neutral"), "notr"],
    [9.5, () => T("Zayıf baz", "Weak base"), "mavi"], [12.5, () => T("Orta-kuvvetli baz", "Moderate base"), "yesil"], [99, () => T("Kuvvetli baz", "Strong base"), "sari"]
  ];
  const COLOR_NAME = (ph) => ph < 2.5 ? T("kırmızı / pembe", "red / pink") : ph < 6.5 ? T("menekşe / mor", "violet / purple") : ph < 7.5 ? T("mavi-mor", "blue-violet") :
    ph < 9.5 ? T("mavi / mavi-yeşil", "blue / teal") : ph < 12.5 ? T("yeşil", "green") : T("sarı", "yellow");

  /** Renkten pH tahmini. white: beyaz referans (isteğe bağlı). Dönüş: { ph, lo, hi, band, cls, chroma, ok, why } */
  function estimate(rgb, white) {
    if(!Array.isArray(rgb)||rgb.length!==3||rgb.some(x=>!Number.isFinite(x)||x<0||x>255))return {ok:false,why:"invalid",chroma:0,rgb:[0,0,0]};
    const c = whiteBalance(rgb, white), lab = rgbToLab(c), chroma = Math.hypot(lab.a, lab.b);
    if (chroma < 10) return { ok: false, why: "gray", chroma, rgb: c };
    if (lab.L < 8) return { ok: false, why: "dark", chroma, rgb: c };
    let h = hueOf(lab);
    const hiH = REF[0].h, loH = REF[REF.length - 1].h;
    // Açıyı skala aralığına getir; aralık dışındaysa (turuncu bölge) en yakın uca bağla
    while (h > hiH) h -= 360;
    while (h < loH) h += 360;
    let edge = false;
    if (h > hiH) { const dHi = h - hiH, dLo = loH + 360 - h; h = dHi <= dLo ? hiH : loH; edge = true; }
    let i = 0; while (i < REF.length - 2 && h < REF[i + 1].h) i++;
    const A = REF[i], B = REF[i + 1], k = (A.h - h) / (A.h - B.h);
    const ph = Math.max(1, Math.min(14, A.ph + Math.max(0, Math.min(1, k)) * (B.ph - A.ph)));
    // Belirsizlik: ton gürültüsü (~3 birim a*b* / doygunluk) × yerel eğim (pH / derece) + taban hata
    const slope = Math.abs((B.ph - A.ph) / (A.h - B.h));
    const sigmaH = (Math.atan(3 / chroma) * 180) / Math.PI;
    const half = Math.min(3, 0.5 + slope * sigmaH * 2 + (edge ? 1 : 0) + (white ? 0 : 0.4));
    const band = BANDS.find((b) => ph < b[0]);
    return { ok: true, ph, lo: Math.max(0, ph - half), hi: Math.min(14, ph + half), half, band: band[1](), cls: band[2], colorName: COLOR_NAME(ph), chroma, edge, rgb: c, lab };
  }

  /** Evdeki maddeler: [ad, tipik pH, tehlikeli mi]
      @returns {Array<[string, number, boolean?]>} */
  const HOUSE = () => [
    [T("Limon suyu", "Lemon juice"), 2.2], [T("Sirke", "Vinegar"), 2.8], [T("Kola", "Cola"), 2.6], [T("Portakal suyu", "Orange juice"), 3.6],
    [T("Domates", "Tomato"), 4.4], [T("Kahve", "Coffee"), 5.0], [T("Süt", "Milk"), 6.6], [T("Saf su", "Pure water"), 7.0], [T("Musluk suyu", "Tap water"), 7.4],
    [T("Deniz suyu", "Sea water"), 8.1], [T("Karbonat çözeltisi", "Baking soda solution"), 8.4], [T("Diş macunu", "Toothpaste"), 9.0],
    [T("Sabunlu su", "Soapy water"), 10.0], [T("Amonyaklı temizleyici", "Ammonia cleaner"), 11.5, true], [T("Çamaşır suyu", "Bleach"), 12.5, true], [T("Lavabo açıcı", "Drain cleaner"), 13.5, true]
  ];
  /** Tahmine en yakın evsel maddeler (aralık içindekiler önce) */
  function matches(r, n) {
    if (!r || !r.ok) return [];
    return HOUSE().map(([name, ph, danger]) => ({ name, ph, danger: !!danger, d: Math.abs(ph - r.ph), inside: ph >= r.lo && ph <= r.hi }))
      .sort((a, b) => (Number(b.inside) - Number(a.inside)) || a.d - b.d).slice(0, n || 3);
  }
  /** Bir RGBA piksel dizisinin daire içindeki ortalaması (cx, cy, rad: piksel) */
  function averageDisk(data, w, h, cx, cy, rad) {
    let r = 0, g = 0, b = 0, n = 0;
    for (let y = Math.max(0, Math.floor(cy - rad)); y < Math.min(h, Math.ceil(cy + rad)); y++)
      for (let x = Math.max(0, Math.floor(cx - rad)); x < Math.min(w, Math.ceil(cx + rad)); x++) {
        if ((x - cx) * (x - cx) + (y - cy) * (y - cy) > rad * rad) continue;
        const i = (y * w + x) * 4; r += data[i]; g += data[i + 1]; b += data[i + 2]; n++;
      }
    return n ? [r / n, g / n, b / n] : null;
  }
  /* ---------- Gerçek pH metre davranışı (v1.51) ----------
     Kalibrasyon: bilinen çözeltilerle (tampon gibi) bir ya da iki nokta. 1 nokta: kayma düzeltmesi;
     2 nokta: eğim + kayma (eğim 0,5–2 aralığına sınırlanır). Kararlılık: son okumaların standart sapması küçükse "kararlı". */
  function applyCal(ph, points) {
    const pts = (Array.isArray(points) ? points : []).filter((x) => x && Number.isFinite(x.raw) && Number.isFinite(x.ref)).slice(-2);
    let v = ph;
    if (pts.length === 1) v = ph + (pts[0].ref - pts[0].raw);
    else if (pts.length === 2 && Math.abs(pts[1].raw - pts[0].raw) > 0.5) {
      const k = Math.max(0.5, Math.min(2, (pts[1].ref - pts[0].ref) / (pts[1].raw - pts[0].raw)));
      v = pts[0].ref + k * (ph - pts[0].raw);
    } else if (pts.length === 2) v = ph + (pts[1].ref - pts[1].raw);
    return Math.max(0, Math.min(14, v));
  }
  function stability(history, tol) {
    const h = history.filter(Number.isFinite).slice(-8);
    if (h.length < 5) return { stable: false, sd: null };
    const m = h.reduce((a, b) => a + b, 0) / h.length, sd = Math.sqrt(h.reduce((a, b) => a + (b - m) * (b - m), 0) / h.length);
    return { stable: sd <= (tol || 0.12), sd };
  }
  /** Analog kadran: 0–14 yarım daire, renk bantları antosiyanin skalasından; ibre açısı -90°…+90° */
  const needleAngle = (ph) => -90 + (Math.max(0, Math.min(14, ph)) / 14) * 180;
  function gaugeSvg() {
    const cx = 120, cy = 112, r = 92, seg = [];
    for (let i = 0; i < 14; i++) {
      const a0 = Math.PI * (1 - i / 14), a1 = Math.PI * (1 - (i + 1) / 14), c = SCALE[Math.min(13, i)][1];
      seg.push('<path d="M' + (cx + r * Math.cos(a0)).toFixed(1) + " " + (cy - r * Math.sin(a0)).toFixed(1) + " A" + r + " " + r + " 0 0 1 " + (cx + r * Math.cos(a1)).toFixed(1) + " " + (cy - r * Math.sin(a1)).toFixed(1) +
        '" stroke="' + hex(c) + '" stroke-width="16" fill="none"/>');
    }
    const ticks = [0, 2, 4, 6, 7, 8, 10, 12, 14].map((v) => { const a = Math.PI * (1 - v / 14); return '<text x="' + (cx + (r - 26) * Math.cos(a)).toFixed(1) + '" y="' + (cy - (r - 26) * Math.sin(a) + 4).toFixed(1) + '" text-anchor="middle">' + v + "</text>"; });
    return '<svg class="ph-gauge" viewBox="0 0 240 132" aria-hidden="true">' + seg.join("") + '<g class="ph-gauge__ticks">' + ticks.join("") + "</g>" +
      '<g class="ph-needle" id="phNeedle" style="transform:rotate(-90deg)"><line x1="120" y1="112" x2="120" y2="30"/><circle cx="120" cy="112" r="7"/></g></svg>';
  }
  const hex = (rgb) => "#" + rgb.map((x) => Math.round(x).toString(16).padStart(2, "0")).join("");
  const fromHex = (s) => { const m = /^#?([0-9a-f]{6})$/i.exec(s || ""); return m ? [0, 2, 4].map((i) => parseInt(m[1].slice(i, i + 2), 16)) : null; };
  const fmt = (x, d) => (x == null || !Number.isFinite(x) ? "—" : x.toFixed(d == null ? 1 : d).replace(".", App.i18n && App.i18n.lang === "en" ? "." : ","));

  /* ================= Arayüz ================= */
  const KEYS = ["10/kimya/u5/k2", "11/kimya/u2/k3", "11/kimya/u2/k4"];
  function scaleBar() {
    return '<div class="ph-scale" aria-hidden="true"><div class="ph-scale__bar" style="background:linear-gradient(90deg,' + SCALE.map(([p, c]) => hex(c) + " " + (((p - 1) / 13) * 100).toFixed(1) + "%").join(",") + ')">' +
      '<i class="ph-scale__band" id="phBand" hidden></i><i class="ph-scale__mark" id="phMark" hidden></i></div>' +
      '<div class="ph-scale__nums">' + SCALE.map(([p]) => "<span>" + p + "</span>").join("") + "</div></div>";
  }

  function render(view) {
    App.setTitle(T("pH Ölçer", "pH Meter"));
    let white = App.prefs.get("ph:white", null);
    if(!Array.isArray(white)||white.length!==3||white.some(x=>!Number.isFinite(x)||x<0||x>255))white=null;
    view.innerHTML = '<div class="page ph">' +
      '<div class="page-head"><div><h1>' + esc(T("Kırmızı Lahana pH Ölçer", "Red Cabbage pH Meter")) + "</h1><p>" +
        esc(T("Kırmızı lahana suyu doğal bir göstergedir: asitte kırmızı, bazda yeşil-sarı olur. Telefon kamerası rengi okur, pH değerini ve güven aralığını tahmin eder.", "Red cabbage juice is a natural indicator. The camera reads its colour and estimates pH with a confidence interval.")) + "</p></div></div>" +
      '<details class="card ph-prep"><summary><b>' + esc(T("Göstergeyi hazırla (5 dakika)", "Prepare the indicator (5 min)")) + "</b></summary><ol>" +
        "<li>" + esc(T("Yarım su bardağı doğranmış kırmızı lahanayı sıcak suya koy, 10 dakika beklet ve süz. Mor-mavi bir sıvı elde edersin.", "Soak chopped red cabbage in hot water for 10 min and strain.")) + "</li>" +
        "<li>" + esc(T("Şeffaf bardaklara eşit miktarda gösterge koy, her birine farklı bir madde ekle ve karıştır.", "Put equal amounts in clear cups and add a different substance to each.")) + "</li>" +
        "<li>" + esc(T("Bardağı beyaz bir kâğıdın önüne koy. Önce kamerayı kâğıda tutup \"Beyaz referans\" al, sonra bardağı ortadaki halkaya getir.", "Place the cup in front of white paper. Take a white reference first, then aim at the cup.")) + "</li></ol>" +
        '<p class="ph-warn">' + App.icon("info") + esc(T("Çamaşır suyu, lavabo açıcı ve amonyaklı temizleyicileri yalnızca bir yetişkinle, eldiven ve gözlükle kullan. Çamaşır suyunu asla sirke ya da başka bir asitle karıştırma: zehirli klor gazı çıkar.", "Use bleach and drain cleaners only with an adult, gloves and goggles. Never mix bleach with vinegar or acids: toxic chlorine gas forms.")) + "</p></details>" +
      '<div class="ph-wrap"><section class="card ph-stage">' +
        '<div class="ph-cam" id="phCam"><video playsinline muted></video><canvas id="phPhoto" hidden></canvas><i class="ph-ring" aria-hidden="true"></i><p class="ph-cam__empty" id="phEmpty">' + esc(T("Kamerayı aç, fotoğraf seç ya da rengi elle gir.", "Start the camera, pick a photo or enter a colour.")) + "</p></div>" +
        '<div class="ph-acts"><button class="btn btn--primary" type="button" id="phGo">' + App.icon("camera") + esc(T("Kamerayı aç", "Start camera")) + "</button>" +
          '<label class="btn" for="phFile">' + App.icon("image") + esc(T("Fotoğraf seç", "Pick photo")) + '</label><input type="file" accept="image/*" id="phFile" hidden>' +
          '<label class="btn ph-pick">' + esc(T("Renk", "Colour")) + ' <input type="color" id="phColor" value="#5f58b9" aria-label="' + esc(T("Rengi elle seç", "Pick colour manually")) + '"></label>' +
          '<button class="btn" type="button" id="phWhite">' + App.icon("sun") + esc(T("Beyaz referans al", "Take white reference")) + "</button></div>" +
        '<p class="hint" id="phStatus" aria-live="polite"></p></section>' +
      '<aside class="card ph-side"><div class="ph-meter">' + gaugeSvg() +
        '<div class="ph-lcd" role="status" aria-label="' + esc(T("pH metre göstergesi", "pH meter display")) + '"><span class="ph-lcd__v" id="phLcd">--.-</span><small>pH</small>' +
          '<span class="ph-lcd__st"><i class="ph-led" id="phLed"></i><em id="phStab">' + esc(T("bekleniyor", "waiting")) + '</em><em id="phHoldTag" hidden>HOLD</em><em id="phCalTag" hidden>CAL</em></span></div>' +
        '<div class="ph-meter__acts"><button class="btn btn--sm" type="button" id="phHold" aria-pressed="false">' + esc(T("Değeri sabitle (HOLD)", "Hold reading")) + "</button></div>" +
        '<details class="ph-cal"><summary>' + esc(T("Kalibrasyon (bilinen çözeltiyle)", "Calibration (known solution)")) + "</summary>" +
          '<p class="hint">' + esc(T("Gerçek pH metreler tampon çözeltilerle kalibre edilir. pH'ını bildiğin bir çözeltiyi ölç, değerini seç ve kalibre et. İkinci bir çözeltiyle eğim de düzeltilir.", "Real meters are calibrated with buffers. Measure a solution of known pH, pick its value and calibrate; a second solution corrects the slope.")) + "</p>" +
          '<label class="field"><span class="field__label">' + esc(T("Başvuru çözeltisi", "Reference solution")) + '</span><select class="select" id="phRef"><option value="7">' + esc(T("Saf (damıtık) su · pH 7,0", "Distilled water · pH 7.0")) + '</option><option value="2.8">' + esc(T("Sirke · pH 2,8", "Vinegar · pH 2.8")) + '</option><option value="8.4">' + esc(T("Karbonat çözeltisi · pH 8,4", "Baking soda · pH 8.4")) + '</option><option value="4">' + esc(T("Tampon · pH 4,0", "Buffer · pH 4.0")) + '</option><option value="10">' + esc(T("Tampon · pH 10,0", "Buffer · pH 10.0")) + "</option></select></label>" +
          '<div class="ph-acts"><button class="btn btn--sm" type="button" id="phCal">' + esc(T("Bu okumayla kalibre et", "Calibrate with this reading")) + '</button><button class="btn btn--sm btn--ghost" type="button" id="phCalReset">' + esc(T("Sıfırla", "Reset")) + '</button></div><p class="hint" id="phCalInfo"></p></details></div>' +
        '<div class="ph-result" id="phResult" aria-live="polite"></div>' + scaleBar() +
        '<div class="ph-save"><label class="field"><span class="field__label">' + esc(T("Ne ölçtün?", "What did you measure?")) + '</span><input class="input" id="phName" list="phHouse" maxlength="40" placeholder="' + esc(T("ör. Sirke", "e.g. Vinegar")) + '"></label>' +
          '<datalist id="phHouse">' + HOUSE().map(([n]) => '<option value="' + esc(n) + '">').join("") + "</datalist>" +
          '<button class="btn btn--primary" type="button" id="phSave" disabled>' + App.icon("plus") + esc(T("Ölçümü kaydet", "Save reading")) + "</button></div>" +
        '<div id="phLog"></div>' +
        '<div class="sl-links">' + KEYS.filter((k) => App.lessons && App.lessons.find(k)).map((k) => '<a href="#/konular/' + k + '">' + App.icon("book") + esc(App.L(App.lessons.find(k).outcome.title)) + "</a>").join("") + "</div></aside></div></div>";
    App.hydrateIcons(view);
    const $ = (s) => view.querySelector(s), status = $("#phStatus"), video = view.querySelector("video"), photo = $("#phPhoto");
    const work = document.createElement("canvas"), wx = work.getContext("2d", { willReadFrequently: true });
    let stream = null, timer = 0, last = null, lastRgb = null, frameAvg = null, epoch = 0, hold = false;
    const hist = [];
    let cal = App.prefs.get("ph:cal", []);
    if (!Array.isArray(cal)) cal = [];
    const paintCal = () => {
      $("#phCalTag").hidden = !cal.length;
      $("#phCalInfo").textContent = cal.length ? T(cal.length + " noktalı kalibrasyon: ", cal.length + "-point calibration: ") + cal.map((c) => fmt(c.raw) + " → " + fmt(c.ref)).join(", ") : T("Kalibrasyon yok (fabrika skalası).", "No calibration (factory scale).");
    };
    const meter = (r) => {
      if (hold) return;
      const lcd = $("#phLcd"), led = $("#phLed"), st = $("#phStab"), nd = $("#phNeedle");
      if (!r || !r.ok) { lcd.textContent = "--.-"; led.className = "ph-led"; st.textContent = T("okunamıyor", "no reading"); return; }
      hist.push(r.ph); if (hist.length > 12) hist.shift();
      const sb = stability(hist);
      lcd.textContent = r.ph.toFixed(1).replace(".", App.i18n.lang === "en" ? "." : ",");
      nd.style.transform = "rotate(" + needleAngle(r.ph).toFixed(1) + "deg)";
      led.className = "ph-led" + (sb.stable ? " is-stable" : " is-moving");
      st.textContent = sb.stable ? T("kararlı", "stable") : T("ölçülüyor…", "settling…");
    };
    const setStatus = () => { status.textContent = white ? T("Beyaz referans kayıtlı: renkler ışığa göre düzeltiliyor.", "White reference set: colours are corrected for the light.") : T("Beyaz referans yok: ışık rengine göre sonuç kayabilir (gri dünya varsayımı kullanılıyor).", "No white reference: results may drift with lighting (gray-world assumed)."); };
    setStatus();

    function show(rgb) {
      lastRgb = rgb;
      const raw = estimate(rgb, white || (frameAvg && grayWorldWhite(frameAvg)));
      // Kalibrasyon tüm tahmin aralığını kaydırır; ham değer kalibrasyon için saklanır
      const r = raw.ok && cal.length ? Object.assign({}, raw, { raw: raw.ph, ph: applyCal(raw.ph, cal), lo: applyCal(raw.lo, cal), hi: applyCal(raw.hi, cal) }) : Object.assign({}, raw, { raw: raw.ph });
      if (hold) return;
      last = r;
      meter(r);
      const res = $("#phResult"), mark = $("#phMark"), band = $("#phBand");
      $("#phSave").disabled = !r.ok;
      if (!r.ok) {
        res.innerHTML = '<div class="ph-swatch" style="background:' + hex(rgb) + '"></div><p>' + esc(r.why === "dark" ? T("Görüntü çok karanlık. Işığı artır.", "Too dark. Add light.") : T("Renk çok soluk ya da gri. Göstergeyi daha derişik yap veya bardağı beyaz kâğıdın önüne koy.", "Colour too pale or grey. Use a stronger indicator or a white background.")) + "</p>";
        mark.hidden = band.hidden = true; return;
      }
      const m = matches(r, 3);
      res.innerHTML = '<div class="ph-swatch" style="background:' + hex(rgb) + '"></div>' +
        '<div class="ph-num ph-num--' + r.cls + '"><small>pH</small><b>' + fmt(r.ph) + "</b><span>" + esc(T("yaklaşık tahmin aralığı ", "approximate estimate range ")) + fmt(r.lo) + " – " + fmt(r.hi) + "</span></div>" +
        '<p class="ph-band"><b>' + esc(r.band) + "</b> · " + esc(T("renk: ", "colour: ")) + esc(r.colorName) + (r.edge ? " · " + esc(T("ton skalanın dışında, en yakın uca bağlandı", "hue outside the scale")) : "") + "</p>" +
        '<p class="ph-match">' + esc(T("Benzer pH: ", "Similar pH: ")) + m.map((x) => "<span" + (x.danger ? ' class="is-danger"' : "") + ">" + esc(x.name) + " (" + fmt(x.ph) + ")</span>").join(" ") + "</p>";
      mark.hidden = band.hidden = false;
      mark.style.left = (((r.ph - 1) / 13) * 100).toFixed(1) + "%";
      band.style.left = (((Math.max(1, r.lo) - 1) / 13) * 100).toFixed(1) + "%";
      band.style.width = (((Math.min(14, r.hi) - Math.max(1, r.lo)) / 13) * 100).toFixed(1) + "%";
    }
    function sampleFrom(src, w, h, cx, cy) {
      work.width = 96; work.height = Math.max(1, Math.round((96 * h) / w));
      wx.drawImage(src, 0, 0, work.width, work.height);
      const d = wx.getImageData(0, 0, work.width, work.height).data;
      frameAvg = averageDisk(d, work.width, work.height, work.width / 2, work.height / 2, work.width);
      return averageDisk(d, work.width, work.height, (cx == null ? 0.5 : cx) * work.width, (cy == null ? 0.5 : cy) * work.height, work.width * 0.09);
    }
    const stop = () => { epoch++; clearTimeout(timer); if (stream) stream.getTracks().forEach((t) => t.stop()); stream = null; video.srcObject = null; };
    async function startCam() {
      stop(); const mine = epoch;
      let acquired;
      try { acquired = await navigator.mediaDevices.getUserMedia({ video: { facingMode: { ideal: "environment" }, width: { ideal: 640 } } }); }
      catch (e) { status.textContent = T("Kamera açılamadı. Fotoğraf seçebilir ya da rengi elle girebilirsin.", "Camera unavailable. Pick a photo or a colour instead."); return; }
      if (mine !== epoch || !document.contains(video)) { App.media.stop(acquired); return; }
      stream=acquired;
      // Otomatik beyaz dengesi rengi kaydırır; destekleniyorsa sabitlenir
      try { const tr = stream.getVideoTracks()[0], cap = /** @type {any} */ (tr.getCapabilities ? tr.getCapabilities() : {}); if (cap.whiteBalanceMode && cap.whiteBalanceMode.includes("manual")) await tr.applyConstraints(/** @type {any} */ ({ advanced: [{ whiteBalanceMode: "manual" }] })); } catch (e) { /* desteklenmiyor */ }
      if(mine!==epoch||!view.isConnected){App.media.stop(acquired);return;}
      video.srcObject = stream; photo.hidden = true; video.hidden = false; $("#phEmpty").hidden = true;
      await video.play().catch(() => {});
      if(mine!==epoch||!view.isConnected){App.media.stop(acquired);return;}
      const loop = () => {
        if (mine !== epoch || !document.contains(video)) return;
        if (video.readyState >= 2 && video.videoWidth) { const a = sampleFrom(video, video.videoWidth, video.videoHeight); if (a) show(a); }
        timer = setTimeout(loop, 200);
      };
      loop(); setStatus();
    }
    $("#phGo").onclick = startCam;
    $("#phFile").onchange = (e) => {
      const f = e.target.files && e.target.files[0]; if (!f) return;
      stop();const mine=epoch;
      const img = new Image();
      img.onerror=()=>{URL.revokeObjectURL(img.src);if(mine===epoch&&view.isConnected)status.textContent=T("Görsel açılamadı.","Could not open image.");};
      img.onload = () => {
        if(mine!==epoch||!view.isConnected){URL.revokeObjectURL(img.src);return;}
        const w = Math.min(640, img.naturalWidth), h = Math.round((w * img.naturalHeight) / img.naturalWidth);
        photo.width = w; photo.height = h; photo.getContext("2d").drawImage(img, 0, 0, w, h);
        photo.hidden = false; video.hidden = true; $("#phEmpty").hidden = true;
        const a = sampleFrom(photo, w, h); if (a) show(a);
        status.textContent = T("Fotoğrafta ölçmek istediğin yere dokun.", "Tap the spot to measure.");
        URL.revokeObjectURL(img.src);
      };
      img.src = URL.createObjectURL(f);
    };
    photo.addEventListener("click", (e) => {
      const r = photo.getBoundingClientRect(), cx = (e.clientX - r.left) / r.width, cy = (e.clientY - r.top) / r.height;
      const a = sampleFrom(photo, photo.width, photo.height, cx, cy); if (a) show(a);
      const ring = view.querySelector(".ph-ring"); ring.style.left = (cx * 100) + "%"; ring.style.top = (cy * 100) + "%";
    });
    $("#phColor").addEventListener("input", (e) => { const c = fromHex(e.target.value); if (c) { frameAvg = null; show(c); } });
    $("#phWhite").onclick = () => {
      if (!lastRgb) { App.ui.toast(T("Önce kamerayı ya da fotoğrafı beyaz kâğıda tut.", "Aim at white paper first.")); return; }
      if (Math.min(...lastRgb) < 40) { App.ui.toast(T("Bu bölge beyaz değil ya da çok karanlık.", "That area is not white or too dark."), "error"); return; }
      white = lastRgb.slice(); App.prefs.set("ph:white", white); setStatus(); App.ui.toast(T("Beyaz referans kaydedildi", "White reference saved"));
    };
    async function paintLog() {
      const rec = await App.db.get("meta", "ph:log").catch(() => null), items = (rec && Array.isArray(rec.items) ? rec.items : []).filter(x=>x&&[x.ph,x.lo,x.hi].every(Number.isFinite)&&x.ph>=0&&x.ph<=14&&typeof x.name==="string"&&/^#[0-9a-f]{6}$/i.test(x.hex)).slice(0, 8);
      if (!document.contains(status)) return;
      $("#phLog").innerHTML = items.length ? '<h3 class="sl-h">' + esc(T("Ölçümlerin", "Your readings")) + '</h3><ul class="ph-log">' + items.map((x) =>
        '<li><i style="background:' + esc(x.hex) + '"></i><b>' + esc(x.name) + "</b><span>pH " + fmt(x.ph) + " (" + fmt(x.lo) + "–" + fmt(x.hi) + ")</span></li>").join("") + "</ul>" : "";
    }
    $("#phSave").onclick = async () => {
      if (!last || !last.ok) return;
      const name = $("#phName").value.trim() || T("Örnek", "Sample");
      const rec = (await App.db.get("meta", "ph:log").catch(() => null)) || { id: "ph:log", items: [] };
      rec.items = [{ at: new Date().toISOString(), name, ph: +last.ph.toFixed(2), lo: +last.lo.toFixed(2), hi: +last.hi.toFixed(2), hex: hex(lastRgb) }].concat(Array.isArray(rec.items)?rec.items:[]).slice(0, 60);
      await App.db.put("meta", rec);
      App.ui.toast(T("Kaydedildi: ", "Saved: ") + name + " · pH " + fmt(last.ph));
      if (App.badges && App.badges.check) App.badges.check();
      paintLog();
    };
    $("#phHold").onclick = () => {
      hold = !hold;
      $("#phHold").setAttribute("aria-pressed", String(hold));
      $("#phHoldTag").hidden = !hold;
      $("#phHold").textContent = hold ? T("Ölçüme devam et", "Resume") : T("Değeri sabitle (HOLD)", "Hold reading");
    };
    $("#phCal").onclick = () => {
      if (!last || !last.ok) { App.ui.toast(T("Önce başvuru çözeltisinin rengini ölç.", "Measure the reference solution first."), "error"); return; }
      const ref = Number($("#phRef").value);
      cal = cal.filter((c) => Math.abs(c.ref - ref) > 0.3).concat([{ raw: +last.raw.toFixed(2), ref }]).slice(-2);
      App.prefs.set("ph:cal", cal); hist.length = 0; paintCal();
      App.ui.toast(T("Kalibre edildi: pH ", "Calibrated: pH ") + fmt(ref));
    };
    $("#phCalReset").onclick = () => { cal = []; App.prefs.set("ph:cal", []); hist.length = 0; paintCal(); };
    paintCal();
    paintLog();
    show(fromHex($("#phColor").value));
    return stop;
  }

  App.router.register("ph", (view,p) => App.moduleSafety.mount(view, scope => render(scope)));
  App.phMetre = { rgbToHsv, rgbToLab, whiteBalance, grayWorldWhite, estimate, matches, averageDisk, SCALE, REF, HOUSE, hex, fromHex, applyCal, stability, needleAngle };
})();
