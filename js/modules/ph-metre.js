/* Virtual pH experiment, with legacy pure colour helpers retained for older record compatibility. */
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
  const hex = (rgb) => "#" + rgb.map((x) => Math.round(x).toString(16).padStart(2, "0")).join("");
  const fromHex = (s) => { const m = /^#?([0-9a-f]{6})$/i.exec(s || ""); return m ? [0, 2, 4].map((i) => parseInt(m[1].slice(i, i + 2), 16)) : null; };
  const fmt = (x, d) => (x == null || !Number.isFinite(x) ? "—" : x.toFixed(d == null ? 1 : d).replace(".", App.i18n && App.i18n.lang === "en" ? "." : ","));

  /* Virtual experiment. Legacy colour helpers above remain for older saved records. */
  function render(view) {
    const M=App.phModel;let state=M.empty();
    const readLog=()=>{const raw=App.prefs.get('ph:simulation-log',[]);return (Array.isArray(raw)?raw:[]).filter(r=>r&&r.source==='simulation'&&Number.isFinite(r.ph)&&r.ph>=0&&r.ph<=14&&Number.isFinite(r.volume)&&r.volume>0&&r.volume<=M.CAPACITY&&Number.isFinite(Date.parse(r.at))).slice(0,50);};
    App.setTitle(T('Sanal pH Deneyi','Virtual pH Experiment'));
    view.innerHTML='<div class="page ph-simulation"><h1>'+T('Sanal pH Deneyi','Virtual pH Experiment')+'</h1><p class="ph-sim-intro">'+T('Çözelti seç → kaba ekle → suyla seyrelt veya başka çözeltiyle karıştır.','Choose a solution → pour it → dilute with water or mix another solution.')+'</p><p class="notice">'+T('SİMÜLASYON · Kamera kullanılmaz. Sonuç, 25 °C için ideal seyreltik kuvvetli asit/baz modelidir; gerçek madde ölçümü değildir.','SIMULATION · No camera. Results use an ideal dilute strong acid/base model at 25 °C, not real measurements.')+'</p><div class="ph-sim-layout"><section class="card ph-sim-scene"><div id="phSimScene"></div><div class="ph-sim-readout" aria-live="polite"><div>pH<output id="phSimValue">—</output></div><div>'+T('Hacim','Volume')+'<output id="phSimVolume">0,00 L</output></div><b id="phSimBand"></b></div></section><section class="card ph-sim-controls"><label>'+T('1. Çözeltiyi seç','1. Choose a solution')+'<select id="phSimSolution">'+M.solutions.map(x=>'<option value="'+x.id+'">'+esc(T(x.tr,x.en))+'</option>').join('')+'</select></label><label>'+T('2. Eklenecek / boşaltılacak miktar (mL)','2. Amount to pour / drain (mL)')+'<input id="phSimAmount" class="input" type="number" min="25" max="250" step="25" value="100" inputmode="numeric"></label><div class="ph-sim-buttons"><button class="btn btn--primary" id="phSimPour">'+T('Çözelti ekle','Pour solution')+'</button><button class="btn" id="phSimWater">'+T('Su ekle','Add water')+'</button><button class="btn" id="phSimDrain">'+T('Boşalt','Drain')+'</button><button class="btn" id="phSimReset">'+T('Sıfırla','Reset')+'</button></div><p id="phSimStatus" role="status"></p><button class="btn" id="phSimSave">'+T('Deneyi kaydet','Save trial')+'</button><div class="ph-sim-hint"><b>'+T('Dene ve düşün','Try and reason')+'</b><p>'+T('100 mL 0,01 M HCl üzerine 900 mL su ekle. pH yaklaşık 2’den 3’e gelir. Aynı pH değerlerini aritmetik ortalamak doğru değildir.','Add 900 mL water to 100 mL of 0.01 M HCl. pH changes from about 2 to 3. Do not average pH values arithmetically.')+'</p></div></section></div><details class="card"><summary>'+T('Modelin kapsamı ve kaynaklar','Model assumptions and sources')+'</summary><p>'+T('Hacimler toplanır; çözeltiler tam karışır. Kuvvetli tek protonlu asit/baz tamamen ayrışır. Suyun otoiyonizasyonu korunur: Kw = 10⁻¹⁴. Zayıf asitler, tamponlar, sıcaklık ve aktivite etkileri modellenmez. Renkler yalnız temsilidir.','Volumes add and solutions mix completely. Strong monoprotic acids/bases dissociate fully; water autoionisation is retained with Kw = 10⁻¹⁴. Weak acids, buffers, temperature changes and activities are not modelled. Colours are schematic.')+'</p><p><a href="https://openstax.org/books/chemistry-2e/pages/14-2-ph-and-poh" target="_blank" rel="noopener noreferrer">OpenStax · pH / pOH</a> · <a href="https://openstax.org/books/chemistry-2e/pages/3-3-molarity" target="_blank" rel="noopener noreferrer">OpenStax · '+T('Derişim ve seyreltme','Concentration and dilution')+'</a></p></details><section class="card"><h2>'+T('Sanal deney kayıtları','Virtual trial history')+'</h2><p class="hint">'+T('Kayıtlar SIMULATION olarak etiketlenir. Önceki kamera ölçüm kayıtları ayrı tutulur, değiştirilmez.','Records are tagged SIMULATION. Previous camera measurement records remain separate and unchanged.')+'</p><div class="ph-sim-history" id="phSimHistory"></div><button class="btn" id="phSimExport">JSON '+T('indir','download')+'</button></section></div>';
    const $=q=>view.querySelector(q);
    function scene(result) {
      const ph=result.ph,y=440-(ph==null?7:ph)/14*340,h=300*result.volume/M.CAPACITY;
      const ticks=Array.from({length:8},(_,i)=>{const v=i*2;return '<text x="40" y="'+(446-v/14*340)+'" font-size="22" text-anchor="end">'+v+'</text>';}).join('');
      $('#phSimScene').innerHTML='<svg viewBox="0 0 820 570" role="img" aria-label="'+esc(T('Sanal kap ve pH skalası','Virtual beaker and pH scale'))+'"><defs><linearGradient id="phVirtualScale" x1="0" y1="1" x2="0" y2="0"><stop stop-color="#dc5360"/><stop offset=".5" stop-color="#f1edd9"/><stop offset="1" stop-color="#4679bb"/></linearGradient><clipPath id="phVirtualGlass"><path d="M240 150H650V490Q650 520 620 520H270Q240 520 240 490Z"/></clipPath></defs><rect x="55" y="100" width="35" height="340" rx="10" fill="url(#phVirtualScale)"/>'+ticks+'<path d="M95 '+y+'h55" stroke="currentColor" stroke-width="4"/><text x="55" y="70" font-size="22">pH</text><g clip-path="url(#phVirtualGlass)"><rect x="240" y="150" width="410" height="370" fill="'+M.color(null)+'" fill-opacity=".08"/><rect class="ph-liquid" x="240" y="'+(520-h)+'" width="410" height="'+h+'" fill="'+M.color(ph)+'" fill-opacity=".65"/></g><path d="M240 150V490Q240 520 270 520H620Q650 520 650 490V150" fill="none" stroke="currentColor" stroke-width="5"/><path d="M225 140l15 10m410 0l15-10" stroke="currentColor" stroke-width="5"/><path d="M710 62H650Q610 62 610 100v25" fill="none" stroke="#899ba2" stroke-width="20"/><path d="M625 45h40" stroke="#3978ac" stroke-width="12" stroke-linecap="round"/><text x="690" y="30" font-size="21">'+T('Su','Water')+'</text><g fill="none" stroke="currentColor" stroke-width="4"><path d="M375 25h45v70l-22 28-23-28Z"/><path d="M398 125v20"/></g><text x="270" y="25" font-size="20">'+T('Çözelti','Solution')+'</text>'+[0.4,0.8,1.2].map(v=>'<path d="M620 '+(520-v/1.2*300)+'h30" stroke="currentColor" stroke-width="2"/><text x="666" y="'+(526-v/1.2*300)+'" font-size="20">'+fmt(v,1)+' L</text>').join('')+'<text x="240" y="562" font-size="22">25 °C · '+T('ideal çözelti','ideal solution')+'</text></svg>';
    }
    function paint() {
      const r=M.read(state);scene(r);$('#phSimValue').textContent=fmt(r.ph,2);$('#phSimVolume').textContent=fmt(r.volume,2)+' L';$('#phSimBand').textContent=r.ph==null?T('Önce çözelti ekle','Pour a solution first'):Math.abs(r.ph-7)<1e-6?T('Nötr','Neutral'):r.ph<7?T('Asidik','Acidic'):T('Bazik','Basic');
      $('#phSimDrain').disabled=r.volume===0;$('#phSimSave').disabled=r.ph==null;$('#phSimPour').disabled=$('#phSimWater').disabled=r.volume>=M.CAPACITY-1e-9;
    }
    function history() {const rows=readLog();$('#phSimHistory').innerHTML=rows.length?'<table><thead><tr><th>'+T('Zaman','Time')+'</th><th>pH</th><th>L</th></tr></thead><tbody>'+rows.map(r=>'<tr><td>'+esc(new Date(r.at).toLocaleString(App.i18n.locale))+'</td><td>'+fmt(r.ph,2)+'</td><td>'+fmt(r.volume,2)+'</td></tr>').join('')+'</tbody></table>':'<p>'+T('Henüz sanal deney kaydı yok.','No virtual trials saved yet.')+'</p>';$('#phSimExport').disabled=!rows.length;}
    function act(kind) {
      const amount=Number($('#phSimAmount').value);
      if(!Number.isFinite(amount)||amount<25||amount>250||amount%25!==0){$('#phSimStatus').textContent=T('25–250 mL arasında, 25 mL basamaklı bir miktar gir.','Enter 25–250 mL in steps of 25 mL.');return;}
      try {state=kind==='drain'?M.drain(state,amount):M.pour(state,kind==='water'?'water':$('#phSimSolution').value,amount);paint();$('#phSimStatus').textContent=state.volume>=M.CAPACITY-1e-9?T('Kap doldu (1,2 L). Önce bir miktar boşalt.','The beaker is full (1.2 L). Drain some first.'):T('Sanal çözelti güncellendi.','Virtual solution updated.');}catch(e){$('#phSimStatus').textContent=T('Geçerli bir çözelti ve miktar seç.','Choose a valid solution and amount.');}
    }
    $('#phSimPour').onclick=()=>act('pour');$('#phSimWater').onclick=()=>act('water');$('#phSimDrain').onclick=()=>act('drain');$('#phSimReset').onclick=()=>{state=M.empty();paint();$('#phSimStatus').textContent=T('Kap sıfırlandı.','Beaker reset.');};
    $('#phSimSave').onclick=()=>{const r=M.read(state);if(r.ph==null)return;const rows=[{...r,at:new Date().toISOString(),modelVersion:1},...readLog()].slice(0,50);App.prefs.set('ph:simulation-log',rows);history();$('#phSimStatus').textContent=T('Sanal deney kaydedildi.','Virtual trial saved.');};
    $('#phSimExport').onclick=()=>App.utils.downloadText('kampusai-sanal-ph.json',JSON.stringify({schemaVersion:1,source:'simulation',assumptions:'Ideal dilute strong monoprotic acid/base, 25 C; no weak acids/buffers/activity corrections',trials:readLog()},null,2),'application/json');
    paint();history();App.hydrateIcons(view);
  }
  App.router.register('ph',render);
  App.phMetre={render,rgbToHsv,rgbToLab,whiteBalance,grayWorldWhite,estimate,matches,averageDisk,SCALE,REF,HOUSE,hex,fromHex,applyCal,stability,needleAngle};
})();
