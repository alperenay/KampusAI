/* =========================================================
   labs-biyoloji.js — 9–12. sınıf biyoloji deneyleri
   ========================================================= */
(function () {
  const { T, fmt, frame, axes, plot, dot, row, label, arrow } = App.labs.util;
  const add = App.labs.add;
  const key = (col) => '<i class="lab-key" style="--k:' + col + '"></i>';

  /* ======================= 9. SINIF ======================= */

  const ENZ = () => [
    ["amilaz", T("Tükürük amilazı (nişasta)", "Salivary amylase"), 37, 6.8],
    ["pepsin", T("Pepsin (midede protein)", "Pepsin (stomach)"), 37, 2],
    ["tripsin", T("Tripsin (ince bağırsak)", "Trypsin (intestine)"), 37, 8],
    ["katalaz", T("Katalaz (H₂O₂ → su + O₂)", "Catalase"), 37, 7],
    ["taq", T("Kaplıca bakterisi enzimi", "Hot-spring bacterium enzyme"), 72, 8]
  ];
  const actT = (T0, opt) => (T0 <= opt ? Math.exp(0.07 * (T0 - opt)) : Math.exp(-Math.pow((T0 - opt) / 7, 2)));
  const actP = (pH, opt) => Math.exp(-Math.pow((pH - opt) / 1.4, 2));
  add("enzim", {
    title: () => T("Enzim aktivitesi: sıcaklık ve pH", "Enzyme activity: temperature and pH"), icon: "sparkle", tags: "katalaz amilaz pepsin denatürasyon optimum",
    desc: () => T("Enzimi, sıcaklığı ve pH'ı seç; aktivite eğrilerini ve tüpteki tepkimenin hızını (köpük/gaz) gör. Yüksek sıcaklık enzimi bozar.", "Pick an enzyme, temperature and pH; see activity curves and the reaction in the tube."),
    params: () => [
      { id: "e", type: "select", label: T("Enzim", "Enzyme"), options: ENZ().map((x) => [x[0], x[1]]), value: "katalaz" },
      { id: "T", label: T("Sıcaklık", "Temperature"), min: 0, max: 90, step: 1, value: 37, unit: "°C" },
      { id: "pH", label: "pH", min: 0, max: 14, step: 0.5, value: 7 }
    ],
    animated: true, loop: true, ratio: 0.62,
    init() { return { b: [] }; },
    tasks: () => [T("Pepsin neden midede çalışır da ağızda çalışmaz?", "Why does pepsin work in the stomach?"), T("Katalazı 70 °C'ye çıkar, sonra 37 °C'ye geri indir: aktivite geri geliyor mu? (Bu modelde anlık; gerçekte denatürasyon kalıcıdır.)", "Heat catalase to 70 °C: is denaturation reversible?")],
    draw(ctx, W, H, p, t, c, s) {
      const z = ENZ().find((x) => x[0] === p.e) || ENZ()[3], a = actT(p.T, z[2]) * actP(p.pH, z[3]);
      const F1 = frame(40, 14, W * 0.3 - 40, H * 0.42, 0, 90, 0, 1.1), F2 = frame(40, H * 0.55, W * 0.3 - 40, H * 0.37, 0, 14, 0, 1.1);
      axes(ctx, F1, c, { labels: false }); axes(ctx, F2, c, { labels: false });
      plot(ctx, F1, (x) => actT(x, z[2]), c.bad, 2); dot(ctx, F1.X(p.T), F1.Y(actT(p.T, z[2])), 4.5, c.bad); label(ctx, T("sıcaklık", "temp."), F1.px + F1.pw, F1.py + F1.ph + 10, c.muted, "right", 10);
      plot(ctx, F2, (x) => actP(x, z[3]), c.accent, 2); dot(ctx, F2.X(p.pH), F2.Y(actP(p.pH, z[3])), 4.5, c.accent); label(ctx, "pH", F2.px + F2.pw, F2.py + F2.ph + 10, c.muted, "right", 10);
      // tüp
      const tx = W * 0.55, tw = W * 0.14, ty = 20, th = H - 50;
      ctx.strokeStyle = c.border; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(tx, ty); ctx.lineTo(tx, ty + th - tw / 2); ctx.arc(tx + tw / 2, ty + th - tw / 2, tw / 2, Math.PI, 0, true); ctx.lineTo(tx + tw, ty); ctx.stroke();
      ctx.fillStyle = c.accent + "30"; ctx.fillRect(tx + 2, ty + th * 0.35, tw - 4, th * 0.65 - tw / 2);
      if (Math.random() < a * 0.9) s.b.push({ x: tx + 6 + Math.random() * (tw - 12), y: ty + th - tw / 2, r: 1.5 + Math.random() * 3 });
      s.b = s.b.filter((q) => (q.y -= 1.2 + q.r * 0.3) > ty + th * 0.35 - 30 * a);
      s.b.forEach((q) => { ctx.strokeStyle = "rgba(255,255,255,.7)"; ctx.lineWidth = 1; ctx.beginPath(); ctx.arc(q.x, q.y, q.r, 0, 7); ctx.stroke(); });
      if (a > 0.2) { ctx.fillStyle = "rgba(255,255,255," + Math.min(0.6, a * 0.6) + ")"; ctx.fillRect(tx + 2, ty + th * 0.35 - 30 * a, tw - 4, 30 * a); }
      // hız çubuğu
      const bx = W * 0.8, bh = H - 60; ctx.fillStyle = c.grid; ctx.fillRect(bx, 20, 26, bh); ctx.fillStyle = c.good; ctx.fillRect(bx, 20 + bh * (1 - a), 26, bh * a); label(ctx, T("hız", "rate"), bx + 13, H - 26, c.muted, "center", 10);
      return { html: row(T("Optimum", "Optimum"), z[2] + " °C · pH " + z[3]) + row(T("Göreli aktivite", "Relative activity"), "%" + fmt(a * 100, 0)) + row(T("Durum", "State"), p.T > z[2] + 12 ? T("denatüre oluyor", "denaturing") : p.T < z[2] - 25 ? T("yavaş (soğuk)", "slow (cold)") : Math.abs(p.pH - z[3]) > 2.5 ? T("pH uygun değil", "wrong pH") : T("aktif", "active")),
        note: T("Enzimler protein yapılı katalizörlerdir; her birinin en iyi çalıştığı bir sıcaklık ve pH vardır. Sıcaklık artınca önce hız artar, optimumdan sonra enzimin üç boyutlu yapısı bozulur (denatürasyon) ve aktif bölge substratı tutamaz.",
          "Enzymes have an optimum temperature and pH; beyond it heat denatures the active site.") };
    }
  }, ["9/biyoloji/u1/k9", "9/biyoloji/u1/k11", "9/biyoloji/u1/k8"]);

  const SAMPLES = () => [
    ["glukoz", T("Glikoz çözeltisi", "Glucose solution"), { ben: 1 }], ["sukroz", T("Çay şekeri (sükroz)", "Table sugar (sucrose)"), {}],
    ["nisasta", T("Patates suyu (nişasta)", "Potato juice (starch)"), { lug: 1 }], ["yumurta", T("Yumurta akı (protein)", "Egg white (protein)"), { biu: 1 }],
    ["yag", T("Zeytinyağı (lipit)", "Olive oil (lipid)"), { sud: 1 }], ["sut", T("Süt", "Milk"), { ben: 1, biu: 1, sud: 1 }], ["su", T("Saf su (kontrol)", "Water (control)"), {}]
  ];
  const REAG = () => [
    ["ben", T("Benedict (ısıtılarak) — indirgen şeker", "Benedict (heated) — reducing sugar"), "#3a73e0", "#c2461f"],
    ["lug", T("Lugol (iyot) — nişasta", "Lugol (iodine) — starch"), "#c99a3a", "#1f1a3d"],
    ["biu", T("Biüre — protein", "Biuret — protein"), "#3a73e0", "#8a3ac2"],
    ["sud", T("Sudan III — yağ", "Sudan III — fat"), "#f2e6c9", "#e04a3a"]
  ];
  add("ayirac", {
    title: () => T("Organik bileşiklerin ayıraçlarla tayini", "Food tests with reagents"), icon: "eye", tags: "benedict lugol biüre sudan nişasta protein karbonhidrat lipit",
    desc: () => T("Bir besin örneği ve bir ayıraç seç; tüpteki renk değişimini gözle ve sonucu yorumla.", "Pick a sample and a reagent; watch the colour change and interpret it."),
    params: () => [
      { id: "s", type: "select", label: T("Örnek", "Sample"), options: SAMPLES().map((x) => [x[0], x[1]]), value: "nisasta" },
      { id: "r", type: "select", label: T("Ayıraç", "Reagent"), options: REAG().map((x) => [x[0], x[1]]), value: "lug" }
    ],
    animated: true, ratio: 0.5,
    tasks: () => [T("Sükroz Benedict ile neden renk vermez?", "Why is sucrose Benedict-negative?"), T("Süt hangi ayıraçlarla olumlu sonuç verir? Ne anlama gelir?", "Which tests are positive for milk?"), T("Saf su neden 'kontrol' olarak kullanılır?", "Why use water as a control?")],
    draw(ctx, W, H, p, t, c) {
      const S = SAMPLES().find((x) => x[0] === p.s), R = REAG().find((x) => x[0] === p.r), pos = !!S[2][p.r], k = Math.min(1, t / 2.5);
      const mix = (a, b, f) => { const h = (x) => [1, 3, 5].map((i) => parseInt(x.slice(i, i + 2), 16)); const A = h(a), B = h(b); return "rgb(" + A.map((v, i) => Math.round(v + (B[i] - v) * f)).join(",") + ")"; };
      const tube = (x, col, ttl, layer) => { const tw = 54, th = H - 70, ty = 24; ctx.strokeStyle = c.border; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(x, ty); ctx.lineTo(x, ty + th - tw / 2); ctx.arc(x + tw / 2, ty + th - tw / 2, tw / 2, Math.PI, 0, true); ctx.lineTo(x + tw, ty); ctx.stroke();
        ctx.fillStyle = col; ctx.beginPath(); ctx.moveTo(x + 2, ty + th * 0.4); ctx.lineTo(x + 2, ty + th - tw / 2); ctx.arc(x + tw / 2, ty + th - tw / 2, tw / 2 - 2, Math.PI, 0, true); ctx.lineTo(x + tw - 2, ty + th * 0.4); ctx.closePath(); ctx.fill();
        if (layer) { ctx.fillStyle = layer; ctx.fillRect(x + 2, ty + th * 0.4, tw - 4, 16); }
        label(ctx, ttl, x + tw / 2, H - 22, c.muted, "center", 11); };
      const before = R[2], after = pos ? R[3] : R[2];
      tube(W * 0.22, before, T("ayıraç", "reagent"));
      arrow(ctx, W * 0.36, H / 2, W * 0.5, H / 2, c.text, 2); label(ctx, (p.r === "ben" ? T("+ örnek, ısıt", "+ sample, heat") : T("+ örnek", "+ sample")), W * 0.43, H / 2 - 14, c.muted, "center", 10);
      tube(W * 0.6, p.r === "sud" ? mix("#f2e6c9", "#f2e6c9", k) : mix(before, after, k), S[1], p.r === "sud" && pos ? "rgba(224,74,58," + k + ")" : null);
      return { done: k >= 1, html: row(T("Sonuç", "Result"), pos ? T("olumlu (+)", "positive (+)") : T("olumsuz (−)", "negative (−)")) + row(T("Gözlenen renk", "Colour"), pos ? { ben: T("mavi → tuğla kırmızısı", "blue → brick red"), lug: T("sarı-kahve → mavi-siyah", "brown → blue-black"), biu: T("mavi → mor", "blue → purple"), sud: T("kırmızı yağ tabakası", "red oily layer") }[p.r] : T("değişmedi", "no change")),
        note: T("Benedict indirgen şekerleri (glikoz, fruktoz, maltoz, laktoz) ısıtınca tuğla kırmızısına döner; sükroz indirgen değildir. Lugol nişastayı mavi-mora boyar. Biüre peptit bağlarıyla mor renk verir. Sudan III yağları kırmızıya boyar. Kontrol tüpü sonucun ayıraçtan değil örnekten kaynaklandığını gösterir.",
          "Benedict: reducing sugars → brick red; Lugol: starch → blue-black; Biuret: protein → purple; Sudan III: fat → red.") };
    }
  }, ["9/biyoloji/u1/k6", "9/biyoloji/u1/k7", "9/biyoloji/u1/k8", "9/biyoloji/u1/k11"]);

  add("osmoz", {
    title: () => T("Osmoz: hücre farklı çözeltilerde", "Osmosis: cells in solutions"), icon: "circle", tags: "plazmoliz turgor hemoliz izotonik hipotonik hipertonik",
    desc: () => T("Hücre türünü ve dıştaki tuz derişimini seç; suyun hangi yöne geçtiğini, hücrenin şişmesini, büzülmesini ya da plazmolizi gör.", "Pick a cell type and outside salt concentration; watch water move and the cell swell or shrink."),
    params: () => [
      { id: "cell", type: "select", label: T("Hücre", "Cell"), options: [["hayvan", T("Alyuvar (hayvan hücresi)", "Red blood cell")], ["bitki", T("Bitki hücresi (hücre çeperli)", "Plant cell")]], value: "hayvan" },
      { id: "c", label: T("Dış ortam tuz derişimi", "Outside salt"), min: 0, max: 3, step: 0.1, value: 0.9, unit: "%" }
    ],
    animated: true, loop: true, ratio: 0.6, keep: true,
    init() { return { k: 1 }; },
    tasks: () => [T("Alyuvarı saf suya koy: ne olur?", "Put a red cell in pure water."), T("Bitki hücresi saf suda neden patlamaz?", "Why doesn't a plant cell burst?"), T("Turşu kurarken sebzelere ne olur?", "What happens to vegetables in brine?")],
    draw(ctx, W, H, p, t, c, s) {
      const inside = 0.9, target = Math.max(0.45, Math.min(p.cell === "hayvan" ? 1.5 : 1.0, Math.pow(inside / Math.max(0.05, p.c), 0.5)));
      s.k += (target - s.k) * 0.04;
      ctx.fillStyle = "rgba(91,140,255," + (0.05 + p.c / 3 * 0.4) + ")"; ctx.fillRect(0, 0, W, H);
      const cx = W * 0.4, cy = H / 2, R = Math.min(W, H) * 0.26, burst = p.cell === "hayvan" && s.k > 1.38;
      if (p.cell === "bitki") {
        ctx.strokeStyle = "#7fc76a"; ctx.lineWidth = 6; ctx.strokeRect(cx - R, cy - R * 0.8, 2 * R, 1.6 * R);
        const kk = Math.min(1, s.k); ctx.fillStyle = "#7fc76a55"; ctx.strokeStyle = "#b7e3a8"; ctx.lineWidth = 2;
        ctx.beginPath(); ctx.roundRect ? ctx.roundRect(cx - R * kk + 4, cy - R * 0.8 * kk + 4, 2 * R * kk - 8, 1.6 * R * kk - 8, 18 * (1 - kk) + 4) : ctx.rect(cx - R * kk + 4, cy - R * 0.8 * kk + 4, 2 * R * kk - 8, 1.6 * R * kk - 8); ctx.fill(); ctx.stroke();
        ctx.fillStyle = "#4a8bd8aa"; ctx.beginPath(); ctx.ellipse(cx, cy, R * kk * 0.6, R * 0.5 * kk, 0, 0, 7); ctx.fill(); label(ctx, T("koful", "vacuole"), cx, cy, "#fff", "center", 11);
      } else if (!burst) {
        ctx.fillStyle = "#d9534f"; ctx.beginPath();
        for (let i = 0; i <= 40; i++) { const a = (i / 40) * 2 * Math.PI, wob = s.k < 0.8 ? 1 + 0.12 * Math.sin(a * 9) * (0.8 - s.k) * 4 : 1; const rr = R * s.k * wob; i ? ctx.lineTo(cx + rr * Math.cos(a), cy + rr * 0.8 * Math.sin(a)) : ctx.moveTo(cx + rr * Math.cos(a), cy + rr * 0.8 * Math.sin(a)); }
        ctx.fill();
      } else { for (let i = 0; i < 14; i++) { const a = i * 0.45; dot(ctx, cx + Math.cos(a) * R * 1.3 * (0.4 + (i % 3) * 0.3), cy + Math.sin(a) * R * (0.4 + (i % 4) * 0.2), 5, "#d9534f99"); } label(ctx, T("HEMOLİZ — hücre patladı", "HAEMOLYSIS — burst"), cx, cy, c.text, "center", 13); }
      const dir = p.c < inside - 0.05 ? 1 : p.c > inside + 0.05 ? -1 : 0;
      for (let i = 0; i < 6; i++) { const a = (i / 6) * 2 * Math.PI + 0.3, r1 = R * 1.55, r2 = R * 1.15; if (dir) arrow(ctx, cx + Math.cos(a) * (dir > 0 ? r1 : r2), cy + Math.sin(a) * (dir > 0 ? r1 : r2) * 0.8, cx + Math.cos(a) * (dir > 0 ? r2 : r1), cy + Math.sin(a) * (dir > 0 ? r2 : r1) * 0.8, c.accent, 2); }
      const env = p.c < inside - 0.05 ? T("hipotonik (dış ortam seyreltik)", "hypotonic") : p.c > inside + 0.05 ? T("hipertonik (dış ortam yoğun)", "hypertonic") : T("izotonik", "isotonic");
      const st = p.cell === "hayvan" ? (burst ? T("hemoliz", "haemolysis") : s.k > 1.05 ? T("şişiyor", "swelling") : s.k < 0.95 ? T("büzülüyor (krenasyon)", "shrinking") : T("normal", "normal")) : (s.k < 0.95 ? T("plazmoliz (zar çeperden ayrılıyor)", "plasmolysis") : dir > 0 ? T("turgor (çepere baskı)", "turgid") : T("normal", "normal"));
      return { html: row(T("Dış ortam", "Outside"), env) + row(T("Su hareketi", "Water flow"), dir > 0 ? T("hücreye giriyor", "into the cell") : dir < 0 ? T("hücreden çıkıyor", "out of the cell") : T("dengede", "balanced")) + row(T("Hücrenin durumu", "Cell"), st),
        note: T("Osmoz, suyun seçici geçirgen zardan az yoğun ortamdan çok yoğun ortama geçmesidir. Hipotonik ortamda hayvan hücresi şişip patlayabilir; bitki hücresini çeperi korur (turgor). Hipertonik ortamda hücre su kaybeder; bitkide zar çeperden ayrılır (plazmoliz).",
          "Water crosses the membrane towards higher solute concentration. Plant walls prevent bursting; strong solutions cause plasmolysis.") };
    }
  }, ["9/biyoloji/u2/k2", "9/biyoloji/u2/k1"]);

  /* ======================= 10. SINIF ======================= */

  const LIGHTC = () => [[1, T("Beyaz", "White")], [0.95, T("Kırmızı", "Red")], [0.9, T("Mavi", "Blue")], [0.25, T("Yeşil", "Green")]];
  const phRate = (I, C, Tm, cf) => { const fl = (I / (I + 25)) * cf, fc = C / (C + 0.04), ft = Tm <= 30 ? Math.exp(0.07 * (Tm - 30)) : Math.exp(-Math.pow((Tm - 30) / 8, 2)); return { r: 100 * Math.min(fl, fc) * ft, fl, fc, ft }; };
  add("fotosentez", {
    title: () => T("Fotosentez hızını etkileyen faktörler", "Factors affecting photosynthesis"), icon: "sun", tags: "ışık şiddeti karbondioksit sıcaklık sınırlayıcı faktör elodea",
    desc: () => T("Su bitkisine (Elodea) ışık şiddeti, ışığın rengi, CO₂ ve sıcaklık ayarla; çıkan oksijen kabarcıklarını say ve sınırlayıcı faktörü bul.", "Adjust light, colour, CO₂ and temperature for pondweed; count oxygen bubbles and find the limiting factor."),
    params: () => [
      { id: "I", label: T("Işık şiddeti", "Light intensity"), min: 0, max: 100, step: 1, value: 40, unit: "%" },
      { id: "col", type: "select", label: T("Işığın rengi", "Light colour"), options: LIGHTC(), value: 1 },
      { id: "C", label: T("CO₂ derişimi", "CO₂"), min: 0, max: 0.3, step: 0.01, value: 0.04, unit: "%" },
      { id: "T", label: T("Sıcaklık", "Temperature"), min: 0, max: 50, step: 1, value: 25, unit: "°C" }
    ],
    animated: true, loop: true, ratio: 0.62,
    init() { return { b: [], n: 0, t0: 0, rate: 0 }; },
    tasks: () => [T("Işığı artırdığın hâlde hız artmıyorsa sınırlayıcı faktör nedir?", "If more light doesn't help, what limits the rate?"), T("Yeşil ışıkta fotosentez neden yavaş?", "Why is green light poor for photosynthesis?"), T("Sıcaklığı 45 °C'ye çıkar: ne oluyor?", "Raise to 45 °C: what happens?")],
    draw(ctx, W, H, p, t, c, s) {
      const R = phRate(p.I, p.C, p.T, p.col);
      const F = frame(44, 14, W * 0.55 - 44, H - 40, 0, 100, 0, 100);
      axes(ctx, F, c, { xName: T("ışık %", "light %"), yName: T("hız", "rate"), labels: false });
      plot(ctx, F, (x) => phRate(x, p.C, p.T, p.col).r, c.good, 2.4); plot(ctx, F, (x) => phRate(x, p.C * 3 + 0.01, p.T, p.col).r, c.muted, 1.3, [4, 4]);
      dot(ctx, F.X(p.I), F.Y(R.r), 5.5, c.warn); label(ctx, T("CO₂ ×3", "CO₂ ×3"), F.px + F.pw - 4, F.Y(phRate(100, p.C * 3 + 0.01, p.T, p.col).r) - 8, c.muted, "right", 10);
      // elodea
      const bx = W * 0.62, bw = W * 0.34, by = 20, bh = H - 40, lc = { 1: "#fff6c8", 0.95: "#ff6a5a", 0.9: "#5a8cff", 0.25: "#5adf6a" }[p.col];
      ctx.fillStyle = c.accent + "22"; ctx.fillRect(bx, by + 20, bw, bh - 20); ctx.strokeStyle = c.border; ctx.lineWidth = 2; ctx.strokeRect(bx, by, bw, bh);
      ctx.fillStyle = lc; ctx.globalAlpha = p.I / 160; ctx.beginPath(); ctx.moveTo(bx - 4, by); ctx.lineTo(bx - 4, by + bh); ctx.lineTo(bx + bw * 0.6, by + bh * 0.6); ctx.closePath(); ctx.fill(); ctx.globalAlpha = 1;
      const sx = bx + bw / 2, sy = by + bh - 10;
      ctx.strokeStyle = "#5fbf55"; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(sx, sy); ctx.quadraticCurveTo(sx - 10, sy - bh * 0.4, sx + 4, sy - bh * 0.6); ctx.stroke();
      for (let i = 0; i < 8; i++) { const y = sy - (i / 8) * bh * 0.55; ctx.beginPath(); ctx.ellipse(sx - 8, y, 10, 3, -0.5, 0, 7); ctx.ellipse(sx + 8, y - 4, 10, 3, 0.5, 0, 7); ctx.fillStyle = "#5fbf55"; ctx.fill(); }
      if (Math.random() < R.r / 140) { s.b.push({ x: sx + 4 + (Math.random() - 0.5) * 6, y: sy - bh * 0.6 }); s.n++; }
      s.b = s.b.filter((q) => (q.y -= 1.4) > by + 22); s.b.forEach((q) => { ctx.strokeStyle = "rgba(255,255,255,.8)"; ctx.lineWidth = 1; ctx.beginPath(); ctx.arc(q.x, q.y, 2.5, 0, 7); ctx.stroke(); });
      if (t - s.t0 > 5) { s.rate = s.n / (t - s.t0) * 60; s.n = 0; s.t0 = t; }
      const lim = R.ft < 0.6 ? T("sıcaklık", "temperature") : R.fl < R.fc ? (p.col < 0.5 ? T("ışığın rengi", "light colour") : T("ışık şiddeti", "light")) : T("CO₂ derişimi", "CO₂");
      return { html: row(T("Fotosentez hızı (göreli)", "Rate (relative)"), fmt(R.r, 0)) + row(T("Kabarcık / dakika (sayılan)", "Bubbles / min (counted)"), fmt(s.rate, 0)) + row(T("Sınırlayıcı faktör", "Limiting factor"), lim),
        note: T("Fotosentez hızı en az bulunan faktöre göre belirlenir (sınırlayıcı faktör). Işık artınca hız önce artar, sonra CO₂ ya da enzim kapasitesi yüzünden sabitlenir. Klorofil en çok kırmızı ve mavi ışığı soğurur, yeşili yansıtır. Yüksek sıcaklıkta enzimler bozulur.",
          "The scarcest factor limits the rate. Chlorophyll absorbs red and blue, reflects green. High temperature denatures enzymes.") };
    }
  }, ["10/biyoloji/u1/k2", "10/biyoloji/u1/k3", "10/biyoloji/u1/k4", "12/biyoloji/u2/k1", "12/biyoloji/u2/k4"]);

  add("solunum", {
    title: () => T("Oksijenli solunum ve fermantasyon", "Aerobic respiration and fermentation"), icon: "refresh", tags: "ATP maya laktik asit etil alkol CO2 balon",
    desc: () => T("Maya ya da kas hücresine glikoz ver; oksijen varken ve yokken üretilen ATP'yi, ürünleri ve balonda biriken CO₂'yi karşılaştır.", "Feed glucose to yeast or muscle; compare ATP and products with and without oxygen."),
    params: () => [
      { id: "org", type: "select", label: T("Canlı / hücre", "Organism"), options: [["maya", T("Maya (ekmek mayası)", "Yeast")], ["kas", T("İnsan kas hücresi", "Muscle cell")]], value: "maya" },
      { id: "o2", type: "toggle", label: T("Ortamda oksijen var", "Oxygen present"), value: false },
      { id: "g", label: T("Glikoz", "Glucose"), min: 1, max: 20, step: 1, value: 10, unit: "g" },
      { id: "T", label: T("Sıcaklık", "Temperature"), min: 0, max: 60, step: 1, value: 35, unit: "°C" }
    ],
    animated: true, ratio: 0.6,
    tasks: () => [T("Maya hamuru neden ılık yerde daha çabuk kabarır?", "Why does dough rise faster somewhere warm?"), T("Oksijenli solunum fermantasyondan kaç kat fazla ATP verir?", "How much more ATP does aerobic respiration give?"), T("Koşarken kaslarda neden yorgunluk (laktik asit) birikir?", "Why does lactic acid build up when sprinting?")],
    draw(ctx, W, H, p, t, c) {
      const ft = p.T <= 35 ? Math.exp(0.08 * (p.T - 35)) : Math.exp(-Math.pow((p.T - 35) / 7, 2));
      const mol = p.g / 180, used = mol * (1 - Math.exp(-0.25 * t * ft)), atpPer = p.o2 ? 38 : 2;
      const co2 = p.o2 ? used * 6 : p.org === "maya" ? used * 2 : 0;
      const prod = p.o2 ? T("CO₂ + H₂O", "CO₂ + H₂O") : p.org === "maya" ? T("etil alkol + CO₂", "ethanol + CO₂") : T("laktik asit", "lactic acid");
      // şişe ve balon
      const fx = W * 0.3, fy = H * 0.62, rr = Math.min(W * 0.16, H * 0.26);
      ctx.fillStyle = "#e8d39b55"; ctx.beginPath(); ctx.arc(fx, fy, rr, 0, 7); ctx.fill(); ctx.strokeStyle = c.border; ctx.lineWidth = 2; ctx.stroke();
      ctx.strokeRect(fx - 12, fy - rr - 30, 24, 32);
      const bal = 8 + Math.min(1, co2 / 0.5) * rr * 0.9;
      ctx.fillStyle = c.bad + "cc"; ctx.beginPath(); ctx.ellipse(fx, fy - rr - 30 - bal * 0.9, bal * 0.75, bal, 0, 0, 7); ctx.fill();
      label(ctx, p.org === "maya" ? T("maya + şeker", "yeast + sugar") : T("kas dokusu", "muscle"), fx, fy, c.text, "center", 11);
      // ATP çubukları
      const bx = W * 0.6, bw = 34, bh = H - 70;
      [[38, c.good, T("O₂ ile", "with O₂")], [2, c.warn, T("O₂ yok", "no O₂")]].forEach(([v, col, nm], i) => { ctx.fillStyle = c.grid; ctx.fillRect(bx + i * 60, 20, bw, bh); ctx.fillStyle = col; ctx.fillRect(bx + i * 60, 20 + bh * (1 - v / 38), bw, bh * v / 38); label(ctx, nm, bx + i * 60 + bw / 2, H - 34, c.muted, "center", 10); label(ctx, String(v), bx + i * 60 + bw / 2, 20 + bh * (1 - v / 38) - 8, c.text, "center", 11); });
      label(ctx, T("ATP / glikoz", "ATP / glucose"), bx + 47, H - 16, c.muted, "center", 10);
      return { done: t > 14, html: row(T("Tepkime", "Process"), p.o2 ? T("oksijenli solunum", "aerobic respiration") : p.org === "maya" ? T("etil alkol fermantasyonu", "alcoholic fermentation") : T("laktik asit fermantasyonu", "lactic acid fermentation")) +
        row(T("Ürünler", "Products"), prod) + row(T("Kullanılan glikoz", "Glucose used"), fmt(used * 180, 1) + " g") + row(T("Üretilen ATP (net)", "ATP made (net)"), fmt(used * atpPer, 2) + " mol") + row(T("Oluşan CO₂", "CO₂ made"), fmt(co2 * 44, 1) + " g"),
        note: T("Oksijenli solunumda glikoz tamamen CO₂ ve suya yıkılır, net 38 ATP elde edilir (bazı kaynaklarda 36). Oksijen yoksa yalnızca glikoliz çalışır: 2 ATP. Maya etil alkol ve CO₂ üretir (ekmek kabarır), kas hücresi laktik asit üretir (CO₂ çıkmaz).",
          "Aerobic: CO₂ + H₂O and ~38 ATP. Without O₂ only glycolysis: 2 ATP; yeast makes ethanol + CO₂, muscle makes lactic acid.") };
    }
  }, ["10/biyoloji/u1/k8", "10/biyoloji/u1/k9", "10/biyoloji/u1/k10", "10/biyoloji/u1/k1", "12/biyoloji/u2/k2", "12/biyoloji/u2/k3", "12/biyoloji/u2/k6", "12/biyoloji/u2/k7"]);

  add("populasyon", {
    title: () => T("Popülasyon büyümesi ve av–avcı", "Population growth and predator–prey"), icon: "chart", tags: "taşıma kapasitesi üstel lojistik büyüme",
    desc: () => T("Modeli seç (J tipi, S tipi ya da av–avcı); büyüme hızı ve taşıma kapasitesiyle popülasyonun zamanla nasıl değiştiğini gör.", "Choose a model and see population change over time."),
    params: () => [
      { id: "mod", type: "select", label: T("Model", "Model"), options: [["j", T("Üstel (J eğrisi, sınırsız kaynak)", "Exponential (J)")], ["s", T("Lojistik (S eğrisi, taşıma kapasitesi)", "Logistic (S)")], ["av", T("Av–avcı (tavşan–tilki)", "Predator–prey")]], value: "s" },
      { id: "r", label: T("Büyüme hızı r", "Growth rate r"), min: 0.05, max: 1, step: 0.05, value: 0.4 },
      { id: "K", label: T("Taşıma kapasitesi K", "Carrying capacity K"), min: 100, max: 1000, step: 50, value: 500 },
      { id: "N0", label: T("Başlangıç birey sayısı", "Initial size"), min: 2, max: 200, step: 2, value: 10 }
    ],
    animated: true, ratio: 0.6,
    tasks: () => [T("S eğrisinde büyümenin en hızlı olduğu nokta neresi? (K/2)", "Where is logistic growth fastest?"), T("Av–avcı modelinde avcı tepesi neden avın tepesinden sonra gelir?", "Why does the predator peak lag the prey peak?")],
    draw(ctx, W, H, p, t, c) {
      const Tm = 40, tt = Math.min(Tm, t * Tm / 8), dt = 0.02;
      let N = p.N0, Pp = p.N0 * 0.2; const A = [[0, N, Pp]];
      for (let s = 0; s < tt; s += dt) {
        if (p.mod === "j") N += p.r * N * dt;
        else if (p.mod === "s") N += p.r * N * (1 - N / p.K) * dt;
        else { const a = p.r, b = 0.004, cc = 0.4, d = 0.002 * 0.5; const dN = a * N - b * N * Pp, dP = d * N * Pp - cc * Pp * 0.6; N += dN * dt; Pp += dP * dt; N = Math.max(0, N); Pp = Math.max(0, Pp); }
        A.push([s + dt, N, Pp]);
      }
      const yMax = p.mod === "j" ? Math.max(p.K * 1.5, ...A.map((x) => Math.min(x[1], 5000))) : p.mod === "s" ? p.K * 1.2 : Math.max(200, ...A.map((x) => Math.max(x[1], x[2]))) * 1.1;
      const F = frame(52, 14, W - 66, H - 40, 0, Tm, 0, Math.min(5000, yMax));
      axes(ctx, F, c, { xName: T("zaman", "time"), yName: "N" });
      if (p.mod === "s") { ctx.setLineDash([5, 5]); ctx.strokeStyle = c.good; ctx.beginPath(); ctx.moveTo(F.px, F.Y(p.K)); ctx.lineTo(F.px + F.pw, F.Y(p.K)); ctx.stroke(); ctx.setLineDash([]); label(ctx, "K", F.px + F.pw - 4, F.Y(p.K) - 9, c.good, "right", 12); }
      const line = (k, col) => { ctx.strokeStyle = col; ctx.lineWidth = 2.4; ctx.beginPath(); A.forEach((x, i) => (i ? ctx.lineTo(F.X(x[0]), F.Y(Math.min(F.y1, x[k]))) : ctx.moveTo(F.X(x[0]), F.Y(x[k])))); ctx.stroke(); };
      line(1, c.accent); if (p.mod === "av") line(2, c.bad);
      const last = A[A.length - 1];
      return { done: tt >= Tm, html: row(key(c.accent) + (p.mod === "av" ? T("Av (tavşan)", "Prey") : T("Birey sayısı", "Population")), fmt(last[1], 0)) + (p.mod === "av" ? row(key(c.bad) + T("Avcı (tilki)", "Predator"), fmt(last[2], 0)) : "") + row(T("Zaman", "Time"), fmt(last[0], 1)),
        note: p.mod === "av" ? T("Av çoğalınca avcıların besini artar ve onlar da çoğalır; avcı artınca av azalır, ardından avcı da azalır. İki popülasyon gecikmeli dalgalanır.", "Prey and predator oscillate with a lag.")
          : T("Sınırsız kaynakta popülasyon üstel (J) büyür. Gerçekte besin, alan ve rekabet büyümeyi yavaşlatır; popülasyon çevrenin taşıma kapasitesi (K) civarında dengelenir (S eğrisi).", "Unlimited resources give J-shaped growth; limits make it level off at K (S-curve).") };
    }
  }, ["10/biyoloji/u2/k2", "12/biyoloji/u4/k1"]);

  add("piramit", {
    title: () => T("Enerji piramidi ve biyolojik birikim", "Energy pyramid and biomagnification"), icon: "layers", tags: "besin zinciri trofik düzey %10 kuralı DDT",
    desc: () => T("Üreticilerin enerjisini ve aktarım verimini ayarla; her basamağa kalan enerjiyi ve zararlı maddenin üst basamaklarda nasıl biriktiğini gör.", "Set producer energy and transfer efficiency; see energy per level and toxin build-up."),
    params: () => [
      { id: "E", label: T("Üreticilerdeki enerji", "Producer energy"), min: 1000, max: 100000, step: 1000, value: 10000, unit: "kJ" },
      { id: "eff", label: T("Aktarım verimi", "Transfer efficiency"), min: 5, max: 20, step: 1, value: 10, unit: "%" },
      { id: "n", label: T("Basamak sayısı", "Levels"), min: 3, max: 5, step: 1, value: 4 },
      { id: "ddt", type: "toggle", label: T("Zararlı madde (DDT) birikimini göster", "Show toxin build-up"), value: false }
    ],
    ratio: 0.62,
    tasks: () => [T("Besin zinciri neden genelde 4–5 basamaktan uzun olmaz?", "Why are food chains short?"), T("Kartaldaki DDT derişimi bitkidekinin kaç katı?", "How concentrated is DDT in the eagle?")],
    draw(ctx, W, H, p, t, c) {
      const NM = [T("Üretici (bitki)", "Producer"), T("1. tüketici (çekirge)", "Primary"), T("2. tüketici (kurbağa)", "Secondary"), T("3. tüketici (yılan)", "Tertiary"), T("4. tüketici (kartal)", "Quaternary")];
      const lv = Array.from({ length: p.n }, (_, i) => p.E * Math.pow(p.eff / 100, i));
      const hh = (H - 30) / p.n, maxW = W * 0.6, cx = W * 0.36;
      lv.forEach((e, i) => {
        const w = Math.max(30, maxW * (Math.log10(e + 1) / Math.log10(p.E + 1))), y = H - 14 - (i + 1) * hh;
        ctx.fillStyle = ["#5fbf55", "#a7d05a", "#e8c25a", "#e8935a", "#d9534f"][i] + "cc"; ctx.fillRect(cx - w / 2, y + 2, w, hh - 4);
        label(ctx, NM[i], cx, y + hh / 2 - 7, "#111", "center", 11); label(ctx, fmt(e, e < 10 ? 2 : 0) + " kJ", cx, y + hh / 2 + 8, "#111", "center", 11);
        if (p.ddt) { const conc = 0.04 * Math.pow(10, i); label(ctx, "DDT " + (conc < 1 ? fmt(conc, 2) : fmt(conc, 0)) + " ppm", W * 0.72, y + hh / 2, i >= 3 ? c.bad : c.muted, "left", 12); for (let k = 0; k < Math.min(30, Math.pow(2.2, i)); k++) dot(ctx, W * 0.72 + 120 + (k % 10) * 6, y + 8 + Math.floor(k / 10) * 6, 2, c.bad); }
      });
      return { html: row(T("En üst basamağa ulaşan enerji", "Energy at top"), fmt(lv[lv.length - 1], 2) + " kJ") + row(T("Üreticiye göre", "Of producer"), "%" + fmt(Math.pow(p.eff / 100, p.n - 1) * 100, 3)),
        note: T("Her basamakta enerjinin çoğu solunumla ısı olarak kaybolur; bir üst basamağa yaklaşık %10'u geçer. Bu yüzden üst basamaklarda birey sayısı ve biyokütle azdır. Vücuttan atılamayan zararlı maddeler ise üst basamaklara çıktıkça birikir (biyolojik birikim).",
          "About 10% of energy passes up each level. Persistent toxins concentrate at higher levels (biomagnification).") };
    }
  }, ["10/biyoloji/u2/k3", "10/biyoloji/u2/k1", "12/biyoloji/u4/k2", "10/biyoloji/u2/k4"]);

  /* ======================= 11. SINIF ======================= */

  add("sinir", {
    title: () => T("Sinir impulsu: aksiyon potansiyeli", "Nerve impulse: action potential"), icon: "sparkle", tags: "eşik ya hep ya hiç miyelin depolarizasyon repolarizasyon",
    desc: () => T("Uyarı şiddetini ve miyelin kılıfı ayarla; eşik değerine ulaşınca impulsun oluştuğunu (ya hep ya hiç) ve akson boyunca ilerleyişini izle.", "Set stimulus strength and myelin; see the all-or-none impulse and its travel along the axon."),
    params: () => [
      { id: "s", label: T("Uyarı şiddeti", "Stimulus"), min: 0, max: 40, step: 1, value: 20, unit: "mV" },
      { id: "my", type: "toggle", label: T("Miyelinli akson", "Myelinated axon"), value: true }
    ],
    animated: true, loop: true, ratio: 0.62,
    tasks: () => [T("İmpuls oluşturan en küçük uyarıyı bul (eşik).", "Find the threshold stimulus."), T("Uyarıyı eşikten çok büyük yap: impuls büyüyor mu?", "Does a stronger stimulus give a bigger spike?"), T("Miyelin neden iletimi hızlandırır?", "Why does myelin speed conduction?")],
    draw(ctx, W, H, p, t, c) {
      const per = 3, tt = t % per, fire = -70 + p.s >= -55;
      const V = (x) => { if (x < 0.3) return -70; const u = x - 0.3; if (!fire) return -70 + p.s * Math.exp(-u * 8); if (u < 0.08) return -70 + p.s + (100 - p.s) * (u / 0.08); if (u < 0.2) return 30 - 115 * ((u - 0.08) / 0.12); if (u < 0.6) return -85 + 15 * ((u - 0.2) / 0.4); return -70; };
      const F = frame(48, 14, W - 62, H * 0.52, 0, 1.2, -95, 45);
      axes(ctx, F, c, { yName: "mV", labels: true, step: 0.2, stepY: 20 });
      ctx.setLineDash([4, 4]); ctx.strokeStyle = c.warn; ctx.beginPath(); ctx.moveTo(F.px, F.Y(-55)); ctx.lineTo(F.px + F.pw, F.Y(-55)); ctx.stroke(); ctx.setLineDash([]); label(ctx, T("eşik −55", "threshold −55"), F.px + F.pw - 4, F.Y(-55) - 8, c.warn, "right", 10);
      plot(ctx, F, V, c.muted, 1.2, [3, 4]); plot(ctx, { ...F, x1: Math.min(1.2, tt) || 0.001 }, V, c.accent, 2.4);
      // akson
      const ay = H * 0.82, ax0 = 30, ax1 = W - 30;
      ctx.strokeStyle = c.border; ctx.lineWidth = 10; ctx.beginPath(); ctx.moveTo(ax0, ay); ctx.lineTo(ax1, ay); ctx.stroke();
      if (p.my) for (let x = ax0 + 20; x < ax1 - 20; x += 46) { ctx.fillStyle = "#e9dfc8"; ctx.fillRect(x, ay - 11, 38, 22); }
      if (fire && tt > 0.3) {
        const speed = p.my ? 1.6 : 0.35, d = (tt - 0.3) * speed * (ax1 - ax0);
        let x = ax0 + d; if (p.my) x = ax0 + 20 + Math.floor((x - ax0 - 20) / 46) * 46 - 4;
        if (x < ax1) { dot(ctx, x, ay, 9, c.warn); label(ctx, "+ + +", x, ay - 22, c.warn, "center", 10); }
      }
      return { html: row(T("İmpuls", "Impulse"), fire ? T("oluştu (ya hep ya hiç)", "fired (all-or-none)") : T("oluşmadı (eşik altı)", "none (sub-threshold)")) + row(T("Dinlenme potansiyeli", "Resting"), "−70 mV") + row(T("İletim hızı", "Speed"), p.my ? T("≈ 100 m/s (sıçrayarak)", "≈ 100 m/s (saltatory)") : T("≈ 1 m/s", "≈ 1 m/s")),
        note: T("Dinlenmede hücre içi −70 mV'tur. Uyarı eşiği (−55 mV) aşarsa Na⁺ kanalları açılır (depolarizasyon, +30 mV), sonra K⁺ çıkar (repolarizasyon). Eşiği geçen her uyarı aynı büyüklükte impuls oluşturur: ya hep ya hiç. Miyelinli aksonda impuls Ranvier boğumları arasında sıçrar.",
          "Beyond −55 mV Na⁺ rushes in (spike), then K⁺ leaves. Every suprathreshold stimulus gives the same spike. Myelin makes it jump.") };
    }
  }, ["11/biyoloji/u2/k1", "11/biyoloji/u2/k3"]);

  add("goz", {
    title: () => T("Göz: uyum, miyopi ve hipermetropi", "Eye: accommodation, myopia, hyperopia"), icon: "eye", tags: "görme kusuru mercek retina gözlük",
    desc: () => T("Göz türünü ve cismin uzaklığını seç; görüntünün retinanın önüne mi, üstüne mi, arkasına mı düştüğünü gör ve uygun gözlük camını tak.", "Pick an eye and object distance; see where the image falls and correct it with glasses."),
    params: () => [
      { id: "e", type: "select", label: T("Göz", "Eye"), options: [["n", T("Sağlıklı göz", "Normal")], ["m", T("Miyop (uzağı göremez)", "Myopic")], ["h", T("Hipermetrop (yakını göremez)", "Hyperopic")]], value: "m" },
      { id: "d", label: T("Cismin uzaklığı", "Object distance"), min: 0.15, max: 10, step: 0.05, value: 5, unit: "m" },
      { id: "g", type: "toggle", label: T("Gözlük tak", "Wear glasses"), value: false }
    ],
    ratio: 0.55,
    tasks: () => [T("Miyop göz uzaktaki cismi nerede odaklıyor? Hangi mercek düzeltir?", "Where does a myopic eye focus far objects?"), T("Hipermetrop gözün yakın noktası kaç cm?", "What is the hyperopic near point?")],
    draw(ctx, W, H, p, t, c) {
      const di0 = 0.017, Pn = 1 / di0, off = { n: 0, m: 1, h: -3 }[p.e], Pmin = Pn + off, Pmax = Pn + off + 4;
      const corr = p.g ? (p.e === "m" ? -1 : p.e === "h" ? 3 : 0) : 0;
      const Preq = 1 / p.d + 1 / di0 - corr, Peye = Math.max(Pmin, Math.min(Pmax, Preq)), Ptot = Peye + corr;
      const di = 1 / (Ptot - 1 / p.d), err = di - di0;
      const ex = W * 0.62, ey = H / 2, er = Math.min(H * 0.38, W * 0.2);
      ctx.strokeStyle = c.border; ctx.lineWidth = 2; ctx.beginPath(); ctx.arc(ex, ey, er, 0, 7); ctx.stroke();
      ctx.strokeStyle = c.bad; ctx.lineWidth = 4; ctx.beginPath(); ctx.arc(ex, ey, er - 3, -0.8, 0.8); ctx.stroke(); label(ctx, T("retina", "retina"), ex + er + 6, ey - er * 0.6, c.bad, "left", 10);
      const lx = ex - er * 0.75, lens = 1 + (Peye - Pmin) / 4;
      ctx.fillStyle = c.accent + "66"; ctx.beginPath(); ctx.ellipse(lx, ey, 6 + lens * 4, er * 0.45, 0, 0, 7); ctx.fill();
      const ret = ex + er - 3, scale = (ret - lx) / di0, fx = lx + di * scale;
      const ox = 20, oy = ey - er * 0.35;
      if (p.g && corr) { const gx = lx - 50; ctx.strokeStyle = c.good; ctx.lineWidth = 3; ctx.beginPath(); if (corr < 0) { ctx.moveTo(gx - 6, ey - er * 0.5); ctx.quadraticCurveTo(gx + 4, ey, gx - 6, ey + er * 0.5); ctx.moveTo(gx + 6, ey - er * 0.5); ctx.quadraticCurveTo(gx - 4, ey, gx + 6, ey + er * 0.5); } else { ctx.ellipse(gx, ey, 7, er * 0.5, 0, 0, 7); } ctx.stroke(); }
      ctx.strokeStyle = c.warn; ctx.lineWidth = 1.6;
      [-er * 0.4, 0, er * 0.4].forEach((h0) => { ctx.beginPath(); ctx.moveTo(ox, p.d > 3 ? ey + h0 : oy); ctx.lineTo(lx, ey + h0); const tx = Math.min(W - 6, fx), k = (tx - lx) / Math.max(1, fx - lx); ctx.lineTo(tx, ey + h0 * (1 - k)); if (fx < ret) ctx.lineTo(ret, ey - h0 * ((ret - fx) / (fx - lx))); ctx.stroke(); });
      label(ctx, (p.d >= 3 ? T("uzaktaki cisim", "far object") : T("yakındaki cisim", "near object")) + " · " + fmt(p.d, 2) + " m", 10, 14, c.muted, "left", 11);
      const ok = Math.abs(err) < 0.0003;
      return { html: row(T("Görüntü", "Image"), ok ? T("retinada — net", "on retina — sharp") : err < 0 ? T("retinanın önünde — bulanık", "in front — blurry") : T("retinanın arkasında — bulanık", "behind — blurry")) +
        row(T("Uyum (mercek kalınlaşması)", "Accommodation"), "%" + fmt((Peye - Pmin) / 4 * 100, 0)) + row(T("Gerekli gözlük", "Glasses needed"), p.e === "m" ? T("ıraksak (kalın kenarlı) mercek", "diverging lens") : p.e === "h" ? T("yakınsak (ince kenarlı) mercek", "converging lens") : T("gerekmez", "none")),
        note: T("Göz merceği yakına bakarken kalınlaşır (uyum). Miyop gözde görüntü retinanın önüne düşer, uzak net görülmez; kalın kenarlı mercekle düzeltilir. Hipermetrop gözde görüntü retinanın arkasına düşer, yakın net görülmez; ince kenarlı mercekle düzeltilir.",
          "Myopia focuses in front of the retina (diverging lens); hyperopia behind it (converging lens).") };
    }
  }, ["11/biyoloji/u2/k2"]);

  add("kansekeri", {
    title: () => T("Kan şekeri dengesi: insülin ve glukagon", "Blood sugar: insulin and glucagon"), icon: "chart", tags: "homeostazi geri bildirim diyabet pankreas",
    desc: () => T("Yemeğin büyüklüğünü, egzersizi ve diyabet türünü seç; kan şekerinin ve insülinin saatler içinde nasıl değiştiğini gör.", "Choose meal size, exercise and diabetes type; watch glucose and insulin over hours."),
    params: () => [
      { id: "meal", label: T("Yemekteki karbonhidrat", "Meal carbs"), min: 0, max: 150, step: 5, value: 75, unit: "g" },
      { id: "ex", type: "toggle", label: T("Yemekten sonra yürüyüş", "Walk after the meal"), value: false },
      { id: "dm", type: "select", label: T("Durum", "Condition"), options: [["yok", T("Sağlıklı", "Healthy")], ["t1", T("Tip 1 diyabet (insülin üretilmez)", "Type 1 diabetes")], ["t2", T("Tip 2 diyabet (insüline direnç)", "Type 2 diabetes")]], value: "yok" }
    ],
    ratio: 0.6,
    tasks: () => [T("Sağlıklı kişide kan şekeri kaç saatte normale döner?", "How long until glucose normalises?"), T("Tip 1 diyabette insülin eğrisi neden düz?", "Why is insulin flat in type 1?"), T("Bu sistem neden 'olumsuz geri bildirim' örneğidir?", "Why is this negative feedback?")],
    draw(ctx, W, H, p, t, c) {
      const sim = () => { let G = 90, I = 8, out = []; const dt = 0.02, sens = p.dm === "t2" ? 0.3 : 1;
        for (let h = 0; h <= 8; h += dt) {
          const abs = h > 1 ? p.meal * 1.1 * Math.exp(-(h - 1) * 1.6) * (h - 1) * 2.6 : 0;
          const sec = p.dm === "t1" ? 0.5 : Math.max(0, G - 85) * 0.35 + 3;
          I += (sec - I * 0.9) * dt * 3;
          const up = 0.012 * I * sens * (G - 70) * 0.25, ex = p.ex && h > 1.3 && h < 2.3 ? 18 : 0, gluc = G < 80 ? (80 - G) * 0.8 : 0;
          G += (abs - up - ex - (G - 90) * 0.05 + gluc) * dt; G = Math.max(40, G);
          out.push([h, G, I]);
        } return out; };
      const A = sim();
      const F = frame(48, 14, W - 62, H * 0.62, 0, 8, 40, 320);
      axes(ctx, F, c, { xName: T("saat", "hours"), yName: "mg/dL", step: 1, stepY: 40 });
      ctx.fillStyle = c.good + "18"; ctx.fillRect(F.px, F.Y(140), F.pw, F.Y(70) - F.Y(140));
      ctx.strokeStyle = c.bad; ctx.lineWidth = 2.4; ctx.beginPath(); A.forEach((x, i) => (i ? ctx.lineTo(F.X(x[0]), F.Y(x[1])) : ctx.moveTo(F.X(x[0]), F.Y(x[1])))); ctx.stroke();
      const F2 = frame(48, H * 0.72, W - 62, H * 0.22, 0, 8, 0, 80);
      axes(ctx, F2, c, { labels: false }); label(ctx, T("insülin", "insulin"), 52, H * 0.72 - 6, c.accent, "left", 10);
      ctx.strokeStyle = c.accent; ctx.lineWidth = 2; ctx.beginPath(); A.forEach((x, i) => (i ? ctx.lineTo(F2.X(x[0]), F2.Y(Math.min(80, x[2]))) : ctx.moveTo(F2.X(x[0]), F2.Y(x[2])))); ctx.stroke();
      const peak = Math.max(...A.map((x) => x[1])), back = (A.find((x) => x[0] > 1.5 && x[1] < 140) || [null])[0];
      return { html: row(key(c.bad) + T("En yüksek kan şekeri", "Peak glucose"), fmt(peak, 0) + " mg/dL") + row(T("140'ın altına dönüş", "Back below 140"), back ? fmt(back, 1) + T(" saat", " h") : T("dönmedi", "not within 8 h")) + row(T("Normal aralık (açlık)", "Normal (fasting)"), "70–100 mg/dL"),
        note: T("Kan şekeri yükselince pankreas insülin salgılar; hücreler glikozu alır, karaciğer glikojen depolar ve şeker düşer. Şeker düşünce glukagon salgılanır ve karaciğer glikoz bırakır. Etki uyarıyı tersine çevirdiği için bu bir olumsuz geri bildirimdir.",
          "Insulin lowers glucose, glucagon raises it — a negative feedback loop.") };
    }
  }, ["11/biyoloji/u4/k1", "11/biyoloji/u4/k2"]);

  add("bagisiklik", {
    title: () => T("Bağışıklık: aşı, serum ve hafıza hücreleri", "Immunity: vaccine, serum, memory"), icon: "target", tags: "antikor birincil ikincil yanıt aktif pasif bağışıklık",
    desc: () => T("İlk karşılaşmanın türünü ve mikrobun ikinci kez geldiği günü seç; antikor düzeyinin birincil ve ikincil yanıtta nasıl değiştiğini gör.", "Pick the first exposure and when the germ returns; compare primary and secondary antibody responses."),
    params: () => [
      { id: "k", type: "select", label: T("İlk karşılaşma", "First exposure"), options: [["asi", T("Aşı (zayıflatılmış mikrop)", "Vaccine")], ["hast", T("Hastalığı geçirme", "Infection")], ["serum", T("Serum (hazır antikor)", "Serum (antibodies)")], ["yok", T("Hiçbiri", "None")]], value: "asi" },
      { id: "d", label: T("Mikrobun geldiği gün", "Day of infection"), min: 20, max: 120, step: 5, value: 60 }
    ],
    ratio: 0.6,
    tasks: () => [T("Aşının hasta olmadan koruma sağladığını grafikte göster.", "Show how a vaccine protects without illness."), T("Serum neden hızlı ama kısa süreli korur?", "Why is serum fast but short-lived?")],
    draw(ctx, W, H, p, t, c) {
      const prim = (x, s) => (x < s + 5 ? 0 : 10 * Math.exp(-Math.pow((x - s - 14) / 6, 2)) + (x > s + 14 ? 2 * Math.exp(-(x - s - 14) / 60) : 0));
      const sec = (x, s) => (x < s + 2 ? 0 : 100 * Math.exp(-Math.pow((x - s - 8) / 5, 2)) + (x > s + 8 ? 20 * Math.exp(-(x - s - 8) / 90) : 0));
      const memory = p.k === "asi" || p.k === "hast";
      const f = (x) => { let v = 0; if (memory) v += prim(x, 0); if (p.k === "serum") v += 60 * Math.exp(-x / 8); v += memory ? sec(x, p.d) : prim(x, p.d); return v; };
      const F = frame(48, 14, W - 62, H - 40, 0, 160, 0, 130);
      axes(ctx, F, c, { xName: T("gün", "days"), yName: T("antikor", "antibody"), step: 20, stepY: 20 });
      ctx.setLineDash([5, 5]); ctx.strokeStyle = c.warn; ctx.beginPath(); ctx.moveTo(F.px, F.Y(30)); ctx.lineTo(F.px + F.pw, F.Y(30)); ctx.stroke(); ctx.setLineDash([]); label(ctx, T("koruyucu düzey", "protective level"), F.px + F.pw - 4, F.Y(30) - 8, c.warn, "right", 10);
      plot(ctx, F, f, c.accent, 2.6);
      [[0, p.k === "yok" ? "" : { asi: T("aşı", "vaccine"), hast: T("hastalık", "infection"), serum: T("serum", "serum") }[p.k]], [p.d, T("mikrop", "germ")]].forEach(([d, nm]) => { if (!nm) return; arrow(ctx, F.X(d), F.py + 4, F.X(d), F.py + 22, c.bad, 2); label(ctx, nm, F.X(d) + 4, F.py + 10, c.bad, "left", 11); });
      const peak2 = Math.max(...Array.from({ length: 40 }, (_, i) => f(p.d + i)));
      const ill = !(memory && peak2 > 30) ;
      return { html: row(T("İkinci karşılaşmada en yüksek antikor", "Peak on reinfection"), fmt(peak2, 0)) + row(T("Yanıt hızı", "Response"), memory ? T("hızlı (hafıza hücreleri)", "fast (memory cells)") : T("yavaş (birincil yanıt)", "slow (primary)")) + row(T("Hastalık belirtisi", "Illness"), ill ? T("büyük olasılıkla görülür", "likely") : T("büyük olasılıkla görülmez", "unlikely")),
        note: T("İlk karşılaşmada antikor yavaş ve az üretilir (birincil yanıt); geride hafıza hücreleri kalır. Aynı mikrop tekrar gelince yanıt hızlı ve güçlüdür (ikincil yanıt). Aşı bu hafızayı hastalık geçirmeden oluşturur (aktif bağışıklık). Serum hazır antikor verir: hemen korur ama hafıza bırakmaz (pasif bağışıklık).",
          "Primary response is slow; memory cells make the second one fast and strong. Vaccines create memory; serum gives immediate but temporary antibodies.") };
    }
  }, ["11/biyoloji/u3/k3"]);

  add("tropizma", {
    title: () => T("Bitkilerde ışığa yönelim (fototropizma)", "Phototropism"), icon: "sun", tags: "oksin koleoptil darwin went deneyi",
    desc: () => T("Işığın yönünü ve koleoptile yapılan işlemi seç; oksinin gölge tarafta birikip bitkiyi ışığa doğru büktüğünü gör.", "Pick the light direction and a treatment; see auxin gather on the shaded side and bend the shoot."),
    params: () => [
      { id: "l", type: "select", label: T("Işık", "Light"), options: [["sol", T("Soldan", "From left")], ["ust", T("Tepeden", "From above")], ["sag", T("Sağdan", "From right")]], value: "sol" },
      { id: "tr", type: "select", label: T("İşlem", "Treatment"), options: [["yok", T("Dokunulmamış", "Intact")], ["kes", T("Uç kesilmiş", "Tip removed")], ["kapak", T("Uç ışık geçirmez kapakla örtülü", "Tip covered")], ["taban", T("Taban örtülü, uç açık", "Base covered")]], value: "yok" }
    ],
    animated: true, ratio: 0.6,
    tasks: () => [T("Uç kesilince bitki neden ışığa yönelmiyor?", "Why no bending without the tip?"), T("Işığı algılayan bölge neresi? Taban örtülü deneyle karşılaştır.", "Where is light sensed?")],
    draw(ctx, W, H, p, t, c) {
      const dir = { sol: -1, ust: 0, sag: 1 }[p.l], respond = p.tr === "yok" || p.tr === "taban", grows = p.tr !== "kes";
      const k = Math.min(1, t / 5), bend = respond ? dir * 0.9 * k : 0, len = (grows ? 0.55 + 0.2 * k : 0.5) * H;
      const bx = W / 2, by = H - 20;
      // ışık
      if (dir) { for (let i = 0; i < 5; i++) arrow(ctx, dir < 0 ? 20 : W - 20, 40 + i * 28, dir < 0 ? 70 : W - 70, 40 + i * 28, "#f4c63c", 2); }
      else for (let i = 0; i < 5; i++) arrow(ctx, bx - 60 + i * 30, 6, bx - 60 + i * 30, 40, "#f4c63c", 2);
      ctx.fillStyle = "#8b5e3c"; ctx.fillRect(bx - 50, by, 100, 14);
      const pts = []; for (let i = 0; i <= 20; i++) { const u = i / 20, a = bend * u * u; pts.push([bx + Math.sin(a) * len * u * 0.9, by - Math.cos(a) * len * u]); }
      ctx.strokeStyle = "#7fc76a"; ctx.lineWidth = 16; ctx.lineCap = "round"; ctx.beginPath(); pts.forEach((q, i) => (i ? ctx.lineTo(q[0], q[1]) : ctx.moveTo(q[0], q[1]))); ctx.stroke(); ctx.lineCap = "butt";
      const tip = pts[20];
      if (p.tr === "kapak") { ctx.fillStyle = "#333"; ctx.beginPath(); ctx.arc(tip[0], tip[1], 11, 0, 7); ctx.fill(); }
      if (p.tr === "taban") { ctx.strokeStyle = "#333"; ctx.lineWidth = 20; ctx.beginPath(); ctx.moveTo(pts[0][0], pts[0][1]); ctx.lineTo(pts[8][0], pts[8][1]); ctx.stroke(); }
      if (p.tr === "kes") { ctx.strokeStyle = c.bad; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(tip[0] - 12, tip[1]); ctx.lineTo(tip[0] + 12, tip[1]); ctx.stroke(); }
      // oksin noktaları: gölge tarafında yoğun
      if (grows) for (let i = 2; i < 18; i += 2) { const q = pts[i], side = respond && dir ? -dir : 0; for (let j = 0; j < 3; j++) dot(ctx, q[0] + (side ? side * 5 : (j - 1) * 5) + (j - 1) * 2, q[1] + j * 3, 1.8, c.warn); }
      return { done: k >= 1, html: row(T("Yönelim", "Response"), !grows ? T("büyüme durdu (oksin yok)", "no growth") : !respond || !dir ? T("düz büyüyor", "grows straight") : T("ışığa doğru bükülüyor", "bends to light")) + row(T("Oksin", "Auxin"), grows ? (respond && dir ? T("gölge tarafta birikti", "on the shaded side") : T("eşit dağıldı", "evenly spread")) : "—"),
        note: T("Işık koleoptil ucunda algılanır. Oksin hormonu uçta üretilir ve gölgede kalan tarafa geçer; o taraftaki hücreler daha çok uzar, bitki ışığa doğru bükülür. Uç kesilirse ya da örtülürse yönelim olmaz (Darwin ve Went deneyleri).",
          "The tip senses light; auxin moves to the shaded side and makes it grow more, bending the shoot towards light.") };
    }
  }, ["11/biyoloji/u1/k2", "11/biyoloji/u1/k3", "11/biyoloji/u1/k1", "12/biyoloji/u3/k2"]);

  /* ======================= 12. SINIF ======================= */

  const AA = "FFLLSSSSYY**CC*WLLLLPPPPHHQQRRRRIIIMTTTTNNKKSSRRVVVVAAAADDEEGGGG";
  const A3 = { F: "Phe", L: "Leu", S: "Ser", Y: "Tyr", C: "Cys", W: "Trp", P: "Pro", H: "His", Q: "Gln", R: "Arg", I: "Ile", M: "Met", T: "Thr", N: "Asn", K: "Lys", V: "Val", A: "Ala", D: "Asp", E: "Glu", G: "Gly", "*": "DUR" };
  const codonAA = (cod) => { const ix = { U: 0, C: 1, A: 2, G: 3 }; if (cod.length < 3 || /[^UCAG]/.test(cod)) return null; return AA[ix[cod[0]] * 16 + ix[cod[1]] * 4 + ix[cod[2]]]; };
  const GENES = () => [["ATGGCTTCAAAGTGGGGACTTTAA", T("Kısa gen 1", "Short gene 1")], ["ATGCCCGAATTCGGTCACTGGTAG", T("Kısa gen 2", "Short gene 2")], ["ATGTTTAAACGTGAAGATTGCTGA", T("Kısa gen 3", "Short gene 3")]];
  add("dna", {
    title: () => T("DNA'dan proteine ve mutasyonlar", "From DNA to protein, and mutations"), icon: "list", tags: "transkripsiyon translasyon kodon mRNA amino asit genetik kod",
    desc: () => T("Bir gen seç; DNA'nın mRNA'ya yazılmasını ve kodonların amino asitlere çevrilmesini gör. Bir nükleotidi değiştir, ekle ya da sil: protein nasıl etkilenir?", "Pick a gene; see transcription and translation. Substitute, insert or delete a base and watch the protein change."),
    params: () => [
      { id: "g", type: "select", label: T("Gen (kalıp olmayan, 5'→3')", "Gene (coding strand)"), options: GENES(), value: GENES()[0][0] },
      { id: "mt", type: "select", label: T("Mutasyon", "Mutation"), options: [["yok", T("Yok", "None")], ["deg", T("Nokta (baz değişimi)", "Substitution")], ["ekle", T("Ekleme", "Insertion")], ["sil", T("Silme", "Deletion")]], value: "yok" },
      { id: "pos", label: T("Mutasyonun yeri (baz no)", "Position"), min: 4, max: 21, step: 1, value: 8 },
      { id: "b", type: "select", label: T("Yeni / eklenen baz", "New base"), options: [["A", "A"], ["T", "T"], ["G", "G"], ["C", "C"]], value: "A" }
    ],
    ratio: 0.62,
    tasks: () => [T("Proteini değiştirmeyen (sessiz) bir nokta mutasyonu bul.", "Find a silent mutation."), T("Erken DUR kodonu oluşturan bir değişim yap.", "Create an early stop codon."), T("Tek baz silinince sonraki bütün amino asitler neden değişiyor?", "Why does one deletion change everything after it?")],
    draw(ctx, W, H, p, t, c) {
      const orig = String(p.g); let seq = orig; const i = p.pos - 1;
      if (p.mt === "deg") seq = orig.slice(0, i) + p.b + orig.slice(i + 1);
      if (p.mt === "ekle") seq = orig.slice(0, i) + p.b + orig.slice(i);
      if (p.mt === "sil") seq = orig.slice(0, i) + orig.slice(i + 1);
      const comp = { A: "T", T: "A", G: "C", C: "G" };
      const tr = (s) => { const m = s.replace(/T/g, "U"), out = []; for (let k = 0; k + 3 <= m.length; k += 3) { const a = codonAA(m.slice(k, k + 3)); out.push(a); if (a === "*") break; } return out; };
      const p0 = tr(orig), p1 = tr(seq);
      const n = Math.max(orig.length, seq.length), bw = Math.min(28, (W - 70) / n), x0 = 64;
      const COL = { A: "#5fbf55", T: "#e0563f", U: "#e8935a", G: "#e8c25a", C: "#5b8cff" };
      const rowB = (y, s, nm, hi) => { label(ctx, nm, 8, y + bw / 2, c.muted, "left", 10); s.split("").forEach((ch, k) => { const x = x0 + k * bw; ctx.fillStyle = COL[ch] + (hi && k === i ? "ff" : "bb"); ctx.fillRect(x + 1, y, bw - 2, bw); if (hi && k === i && p.mt !== "yok") { ctx.strokeStyle = c.text; ctx.lineWidth = 2; ctx.strokeRect(x, y - 1, bw, bw + 2); } label(ctx, ch, x + bw / 2, y + bw / 2, "#111", "center", Math.min(13, bw * 0.55)); }); };
      rowB(14, seq, T("DNA 5'→3'", "DNA 5'→3'"), true);
      rowB(14 + bw + 4, seq.split("").map((ch) => comp[ch]).join(""), T("kalıp 3'→5'", "template"), false);
      const ym = 14 + 2 * bw + 26; rowB(ym, seq.replace(/T/g, "U"), "mRNA", true);
      for (let k = 0; k * 3 < seq.length; k++) { const x = x0 + k * 3 * bw; ctx.strokeStyle = c.border; ctx.lineWidth = 1; ctx.strokeRect(x, ym - 2, 3 * bw, bw + 4); }
      const ya = ym + bw + 18;
      p1.forEach((a, k) => { const x = x0 + k * 3 * bw, diff = p0[k] !== a; ctx.fillStyle = a === "*" ? c.bad : diff ? c.warn : c.violet; ctx.beginPath(); ctx.ellipse(x + 1.5 * bw, ya + 12, 1.4 * bw, 12, 0, 0, 7); ctx.fill(); label(ctx, A3[a] || "?", x + 1.5 * bw, ya + 12, "#fff", "center", 11); });
      label(ctx, T("protein", "protein"), 8, ya + 12, c.muted, "left", 10);
      let eff;
      if (p.mt === "yok") eff = T("normal protein", "normal protein");
      else if ((p.mt === "ekle" || p.mt === "sil")) eff = T("çerçeve kayması — sonraki tüm kodonlar değişir", "frameshift");
      else if (p1.join("") === p0.join("")) eff = T("sessiz mutasyon — protein aynı", "silent");
      else if (p1.indexOf("*") >= 0 && p1.indexOf("*") < p0.indexOf("*")) eff = T("anlamsız mutasyon — erken DUR", "nonsense — early stop");
      else eff = T("yanlış anlamlı — bir amino asit değişti", "missense");
      return { html: row(T("Amino asit sayısı", "Amino acids"), (p1.filter((a) => a !== "*").length) + " (" + T("normal ", "normal ") + p0.filter((a) => a !== "*").length + ")") + row(T("Etki", "Effect"), eff) + row(T("Başlangıç / bitiş", "Start / stop"), "AUG (Met) · UAA, UAG, UGA"),
        note: T("Transkripsiyonda DNA'nın kalıp ipliğine göre mRNA yazılır (T yerine U). Translasyonda ribozom mRNA'yı üçerli kodonlar hâlinde okur; her kodon bir amino asidi belirler, DUR kodonunda sentez biter. Genetik kod dejeneredir: bazı baz değişimleri proteini değiştirmez.",
          "mRNA is copied from the template (U for T); ribosomes read codons in threes until a stop codon. The code is degenerate, so some changes are silent.") };
    }
  }, ["12/biyoloji/u1/k1", "12/biyoloji/u1/k2", "12/biyoloji/u1/k3", "12/biyoloji/u1/k4", "9/biyoloji/u1/k10"]);

  add("terleme", {
    title: () => T("Bitkilerde terleme ve stomalar", "Transpiration and stomata"), icon: "sun", tags: "su taşınması gözenek nem rüzgar",
    desc: () => T("Işık, sıcaklık, nem ve rüzgârı değiştir; stomaların açılıp kapandığını ve terleme hızını gör.", "Change light, temperature, humidity and wind; see stomata and transpiration rate."),
    params: () => [
      { id: "I", label: T("Işık", "Light"), min: 0, max: 100, step: 5, value: 70, unit: "%" },
      { id: "T", label: T("Sıcaklık", "Temperature"), min: 5, max: 40, step: 1, value: 25, unit: "°C" },
      { id: "h", label: T("Bağıl nem", "Humidity"), min: 10, max: 100, step: 5, value: 50, unit: "%" },
      { id: "w", label: T("Rüzgâr", "Wind"), min: 0, max: 10, step: 1, value: 2, unit: "m/s" },
      { id: "dry", type: "toggle", label: T("Toprak kuru (su stresi)", "Dry soil"), value: false }
    ],
    animated: true, loop: true, ratio: 0.55,
    init() { return { v: [] }; },
    tasks: () => [T("Terlemeyi en hızlı yapan koşulları bul.", "Find conditions for the fastest transpiration."), T("Toprak kuruyunca bitki neden stomalarını kapatır?", "Why close stomata in drought?")],
    draw(ctx, W, H, p, t, c, s) {
      const open = Math.min(1, p.I / 60) * (p.dry ? 0.15 : 1), vpd = Math.max(0, (1 - p.h / 100)) * Math.exp(0.06 * (p.T - 25));
      const rate = 100 * open * vpd * (1 + 0.15 * p.w) / 1.6;
      // yaprak kesiti
      const y0 = H * 0.25, y1 = H * 0.7;
      ctx.fillStyle = "#5fbf5544"; ctx.fillRect(20, y0, W - 40, y1 - y0); ctx.strokeStyle = "#5fbf55"; ctx.lineWidth = 2; ctx.strokeRect(20, y0, W - 40, y1 - y0);
      const n = 4;
      for (let i = 0; i < n; i++) {
        const x = 40 + (i + 0.5) * (W - 80) / n, g = 2 + open * 10;
        ctx.fillStyle = "#3f8f3a"; ctx.beginPath(); ctx.ellipse(x - g / 2 - 7, y1, 9, 5, 0, 0, 7); ctx.ellipse(x + g / 2 + 7, y1, 9, 5, 0, 0, 7); ctx.fill();
        if (Math.random() < rate / 300) s.v.push({ x: x + (Math.random() - 0.5) * g, y: y1 + 4, vx: (Math.random() - 0.3) * 0.6 + p.w * 0.25 });
      }
      s.v = s.v.filter((q) => (q.y += 0.9) < H && q.x < W); s.v.forEach((q) => { q.x += q.vx; dot(ctx, q.x, q.y, 2.5, c.accent + "cc"); });
      label(ctx, T("alt yüzey: stomalar", "lower surface: stomata"), 24, y1 + 22, c.muted, "left", 10);
      return { html: row(T("Stoma açıklığı", "Stomatal opening"), "%" + fmt(open * 100, 0)) + row(T("Terleme hızı (göreli)", "Transpiration (relative)"), fmt(rate, 0)),
        note: T("Terleme, suyun yapraktaki stomalardan buhar olarak çıkmasıdır; köklerden yapraklara su taşınmasını (terleme çekimi) sağlar. Işık ve sıcaklık terlemeyi artırır; nem azaltır; rüzgâr yaprak çevresindeki nemli havayı uzaklaştırıp artırır. Su azsa stomalar kapanır.",
          "Light, heat and wind raise transpiration; humidity lowers it; drought closes stomata.") };
    }
  }, ["12/biyoloji/u3/k2", "12/biyoloji/u3/k1"]);
})();
