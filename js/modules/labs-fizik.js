/* =========================================================
   labs-fizik.js — 9–12. sınıf fizik deneyleri
   Her deney: başlık, açıklama, kontroller, çizim, görevler ve
   bağlı olduğu kazanımlar (müfredattaki konu sayfalarında da görünür).
   ========================================================= */
(function () {
  const { T, fmt, DEG, arrow, label, frame, axes, plot, dot, row } = App.labs.util;
  const add = App.labs.add;
  const key = (col) => '<i class="lab-key" style="--k:' + col + '"></i>';
  const g0 = 9.8;

  /* ======================= 9. SINIF ======================= */

  add("vektor", {
    title: () => T("Vektörler: toplama ve bileşenler", "Vectors: addition and components"), icon: "arrowUp", tags: "bileşke kuvvet",
    desc: () => T("İki vektörün büyüklüğünü ve aradaki açıyı değiştir; bileşkeyi (uç uca ekleme) ve bileşenleri gör.", "Change two vectors and the angle between them; see the resultant and components."),
    params: () => [
      { id: "a", label: T("1. vektör |A|", "|A|"), min: 1, max: 10, step: 0.5, value: 6, unit: "N" },
      { id: "b", label: T("2. vektör |B|", "|B|"), min: 1, max: 10, step: 0.5, value: 4, unit: "N" },
      { id: "th", label: T("Aradaki açı θ", "Angle θ"), min: 0, max: 180, step: 5, value: 60, unit: "°" },
      { id: "comp", type: "toggle", label: T("Bileşkenin x ve y bileşenlerini göster", "Show x and y components"), value: true }
    ],
    ratio: 0.62,
    tasks: () => [T("Bileşkeyi en büyük yapan açıyı bul. Kaç N oluyor?", "Find the angle giving the largest resultant."), T("|A| = |B| iken θ = 120° yap: bileşke neye eşit?", "Set |A| = |B| and θ = 120°: what is R?"), T("Bileşkeyi 2 N yapmaya çalış (en küçük değer).", "Try to make R = 2 N (minimum).")],
    draw(ctx, W, H, p, t, c) {
      const th = p.th * DEG, Rx = p.a + p.b * Math.cos(th), Ry = p.b * Math.sin(th), R = Math.hypot(Rx, Ry);
      const F = frame(30, 14, W - 44, H - 34, -6, 22, -3, (H - 34) / (W - 44) * 28 - 3);
      axes(ctx, F, c, { labels: false });
      const O = [F.X(0), F.Y(0)], A = [F.X(p.a), F.Y(0)], B = [F.X(p.a + p.b * Math.cos(th)), F.Y(Ry)];
      arrow(ctx, O[0], O[1], A[0], A[1], c.accent, 3); label(ctx, "A", (O[0] + A[0]) / 2, O[1] + 14, c.accent, "center", 13);
      arrow(ctx, A[0], A[1], B[0], B[1], c.good, 3); label(ctx, "B", (A[0] + B[0]) / 2 + 10, (A[1] + B[1]) / 2, c.good, "left", 13);
      ctx.setLineDash([4, 4]); arrow(ctx, O[0], O[1], F.X(p.b * Math.cos(th)), F.Y(Ry), c.good + "88", 1.5); ctx.setLineDash([]);
      arrow(ctx, O[0], O[1], B[0], B[1], c.warn, 3.4); label(ctx, "R", (O[0] + B[0]) / 2 - 12, (O[1] + B[1]) / 2 - 10, c.warn, "center", 14);
      if (p.comp) { ctx.setLineDash([3, 4]); ctx.strokeStyle = c.muted; ctx.beginPath(); ctx.moveTo(B[0], B[1]); ctx.lineTo(B[0], O[1]); ctx.stroke(); ctx.setLineDash([]);
        label(ctx, "Rₓ", (O[0] + B[0]) / 2, O[1] + 28, c.muted, "center", 12); label(ctx, "Rᵧ", B[0] + 6, (O[1] + B[1]) / 2, c.muted, "left", 12); }
      return { html: row(key(c.warn) + T("Bileşke |R|", "Resultant |R|"), fmt(R) + " N") + row("Rₓ", fmt(Rx) + " N") + row("Rᵧ", fmt(Ry) + " N") +
        row(T("R'nin A ile açısı", "Angle of R"), fmt(Math.atan2(Ry, Rx) / DEG, 1) + "°") + row(T("Sınırlar", "Bounds"), fmt(Math.abs(p.a - p.b), 1) + " ≤ R ≤ " + fmt(p.a + p.b, 1)),
        note: T("R² = A² + B² + 2AB·cosθ. Aynı yönde (0°) bileşke en büyük, zıt yönde (180°) en küçüktür. Bileşenler: Rₓ = R·cosα, Rᵧ = R·sinα.",
          "R² = A² + B² + 2AB·cosθ. Largest at 0°, smallest at 180°.") };
    }
  }, ["9/fizik/u2/k2", "9/fizik/u2/k3", "9/fizik/u2/k4"]);

  const LIQ = () => [[1000, T("Su (1000 kg/m³)", "Water")], [800, T("Zeytinyağı (800)", "Olive oil (800)")], [1030, T("Deniz suyu (1030)", "Sea water (1030)")], [13600, T("Cıva (13 600)", "Mercury (13 600)")]];

  add("basinc", {
    title: () => T("Sıvı basıncı", "Liquid pressure"), icon: "arrowDown", tags: "hidrostatik derinlik",
    desc: () => T("Derinliği ve sıvının cinsini değiştir. Sıvı basıncı kabın şekline değil, derinliğe ve yoğunluğa bağlıdır.", "Change depth and liquid; pressure depends on depth and density, not container shape."),
    params: () => [
      { id: "h", label: T("Derinlik h", "Depth h"), min: 0, max: 10, step: 0.1, value: 4, unit: "m" },
      { id: "rho", type: "select", label: T("Sıvı", "Liquid"), options: LIQ(), value: 1000 },
      { id: "atm", type: "toggle", label: T("Açık hava basıncını da ekle (P₀ = 101 kPa)", "Include atmospheric pressure"), value: false }
    ],
    ratio: 0.6,
    tasks: () => [T("Suda 10 m inince basınç kaç kPa artar? Bu neden ≈ 1 atm'dir?", "How much does pressure rise at 10 m of water?"), T("Aynı basıncı cıvada kaç m'de elde edersin?", "At what depth in mercury do you get the same pressure?")],
    draw(ctx, W, H, p, t, c) {
      const P = p.rho * g0 * p.h + (p.atm ? 101325 : 0);
      // Üç farklı kap, aynı derinlikte aynı basınç
      const top = 26, bot = H - 26, lev = top + 8, depthPx = (bot - lev) * (p.h / 10);
      const col = p.rho > 5000 ? "#b9c0c9" : p.rho < 900 ? "#e8c25a" : c.accent;
      const shapes = [
        (x) => [[x, lev - 6], [x + 70, lev - 6], [x + 70, bot], [x, bot]],
        (x) => [[x - 10, lev - 6], [x + 80, lev - 6], [x + 50, bot], [x + 20, bot]],
        (x) => [[x + 25, lev - 6], [x + 45, lev - 6], [x + 45, bot - 60], [x + 80, bot - 50], [x + 80, bot], [x - 10, bot], [x - 10, bot - 50], [x + 25, bot - 60]]
      ];
      const gap = (W - 60) / 3;
      shapes.forEach((sh, i) => {
        const x = 30 + i * gap + (gap - 70) / 2, pts = sh(x);
        ctx.save(); ctx.beginPath(); pts.forEach((q, j) => (j ? ctx.lineTo(q[0], q[1]) : ctx.moveTo(q[0], q[1]))); ctx.closePath();
        ctx.clip(); ctx.fillStyle = col + "55"; ctx.fillRect(0, lev, W, H); ctx.restore();
        ctx.strokeStyle = c.border; ctx.lineWidth = 2; ctx.beginPath(); pts.forEach((q, j) => (j ? ctx.lineTo(q[0], q[1]) : ctx.moveTo(q[0], q[1]))); ctx.stroke();
        const yy = lev + depthPx; dot(ctx, x + 35, Math.min(bot - 4, yy), 5, c.warn);
      });
      ctx.setLineDash([4, 4]); ctx.strokeStyle = c.warn; ctx.beginPath(); ctx.moveTo(14, lev + depthPx); ctx.lineTo(W - 14, lev + depthPx); ctx.stroke(); ctx.setLineDash([]);
      label(ctx, "h = " + fmt(p.h, 1) + " m", 16, lev + depthPx - 9, c.warn, "left", 11);
      return { html: row(T("Basınç P = ρ·g·h", "Pressure P = ρgh"), fmt(P / 1000, 1) + " kPa") + row(T("Atmosfer cinsinden", "In atm"), fmt(P / 101325, 2) + " atm") +
        row(T("1 m² yüzeye etki eden kuvvet", "Force on 1 m²"), fmt(P / 1000, 1) + " kN"),
        note: T("Üç kapta da işaretli noktanın basıncı aynıdır (hidrostatik paradoks). Barajların tabanı bu yüzden kalın yapılır; dalgıçlar her 10 m'de yaklaşık 1 atm ek basınç hisseder.",
          "All three marked points have equal pressure (hydrostatic paradox).") };
    }
  }, ["9/fizik/u3/k1", "9/fizik/u3/k2", "9/fizik/u3/k3", "9/fizik/u3/k4"]);

  add("kaldirma", {
    title: () => T("Kaldırma kuvveti (Arşimet)", "Buoyancy (Archimedes)"), icon: "arrowUp", tags: "yüzme batma askıda",
    desc: () => T("Cismin yoğunluğunu, hacmini ve sıvıyı değiştir; yüzme, askıda kalma ve batmayı, dinamometre okumasını gör.", "Change object density, volume and liquid; see floating, suspension and sinking."),
    params: () => [
      { id: "d", label: T("Cismin yoğunluğu", "Object density"), min: 100, max: 3000, step: 50, value: 700, unit: "kg/m³" },
      { id: "v", label: T("Cismin hacmi", "Volume"), min: 1, max: 10, step: 0.5, value: 4, unit: "L" },
      { id: "rho", type: "select", label: T("Sıvı", "Liquid"), options: LIQ().slice(0, 3), value: 1000 }
    ],
    ratio: 0.62,
    tasks: () => [T("Cismi askıda bırak: yoğunluğu kaç olmalı?", "Make the object suspended."), T("Yoğunluğu 900 yap: cismin yüzde kaçı batar? Buzdağını düşün.", "Set density to 900: what fraction is submerged?"), T("Batan cisimde dinamometre neden daha az gösterir?", "Why does the scale read less when the object is submerged?")],
    draw(ctx, W, H, p, t, c) {
      const V = p.v / 1000, m = p.d * V, G = m * g0;
      const frac = Math.min(1, p.d / p.rho);              // yüzen cismin batan kesri
      const sink = p.d > p.rho * 1.001, sus = Math.abs(p.d - p.rho) <= p.rho * 0.001;
      const Fb = p.rho * g0 * V * (sink || sus ? 1 : frac);
      const surf = H * 0.36, bot = H - 14, tankL = W * 0.12, tankR = W * 0.62;
      ctx.fillStyle = (p.rho < 900 ? "#e8c25a" : c.accent) + "40"; ctx.fillRect(tankL, surf, tankR - tankL, bot - surf);
      ctx.strokeStyle = c.border; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(tankL, surf - 40); ctx.lineTo(tankL, bot); ctx.lineTo(tankR, bot); ctx.lineTo(tankR, surf - 40); ctx.stroke();
      const side = 24 + Math.cbrt(p.v) * 16, cx = (tankL + tankR) / 2;
      let topY;
      if (sink) topY = bot - side; else if (sus) topY = surf + (bot - surf - side) / 2; else topY = surf - side * (1 - frac);
      // hafif salınım
      if (!sink) topY += Math.sin(t * 2) * 1.5;
      ctx.fillStyle = c.warn; ctx.fillRect(cx - side / 2, topY, side, side);
      arrow(ctx, cx, topY + side / 2, cx, topY + side / 2 + Math.min(110, G * 1.2), c.bad, 2.4); label(ctx, "G", cx + 8, topY + side / 2 + Math.min(110, G * 1.2) - 4, c.bad, "left");
      arrow(ctx, cx - 10, topY + side / 2, cx - 10, topY + side / 2 - Math.min(110, Fb * 1.2), c.good, 2.4); label(ctx, "Fₖ", cx - 16, topY + side / 2 - Math.min(110, Fb * 1.2) + 4, c.good, "right");
      // Dinamometre (sağda): cisim tamamen batırılmış hâlde
      const dx = W * 0.8, Fd = Math.max(0, G - p.rho * g0 * V);
      ctx.strokeStyle = c.border; ctx.beginPath(); ctx.moveTo(dx, 10); ctx.lineTo(dx, 40); ctx.stroke();
      ctx.fillStyle = c.grid; ctx.fillRect(dx - 12, 40, 24, 70); ctx.fillStyle = c.text; ctx.fillRect(dx - 12, 40 + Math.min(66, Fd * 0.7), 24, 3);
      label(ctx, fmt(Fd, 1) + " N", dx, 124, c.text, "center", 12); label(ctx, T("tam batırınca", "fully dipped"), dx, 140, c.muted, "center", 10);
      const state = sink ? T("batar", "sinks") : sus ? T("askıda kalır", "suspended") : T("yüzer", "floats");
      return { html: row(T("Durum", "State"), state) + row(T("Ağırlık G", "Weight"), fmt(G, 1) + " N") + row(T("Kaldırma kuvveti Fₖ = ρ·g·V(batan)", "Buoyant force"), fmt(Fb, 1) + " N") +
        row(T("Batan kesir", "Submerged"), "%" + fmt((sink || sus ? 1 : frac) * 100, 0)) + row(T("Dinamometre (tam batık)", "Scale (fully dipped)"), fmt(Fd, 1) + " N"),
        note: T("Cismin yoğunluğu sıvınınkinden küçükse yüzer, eşitse askıda kalır, büyükse batar. Yüzen cisimde Fₖ = G'dir ve batan kesir = d(cisim) / d(sıvı).",
          "Less dense floats, equal is suspended, denser sinks. For floating bodies Fb = G.") };
    },
    animated: true, loop: true, play: true
  }, ["9/fizik/u3/k5", "9/fizik/u3/k6"]);

  add("bernoulli", {
    title: () => T("Akışkan hızı ve basınç (Bernoulli)", "Flow speed and pressure (Bernoulli)"), icon: "refresh", tags: "venturi akış",
    desc: () => T("Borunun dar kısmının genişliğini ve akış hızını değiştir: akışkan daralan yerde hızlanır, basıncı düşer.", "Narrow the pipe: the fluid speeds up and its pressure drops."),
    params: () => [
      { id: "v1", label: T("Giriş hızı v₁", "Inlet speed v₁"), min: 0.5, max: 4, step: 0.1, value: 1.5, unit: "m/s" },
      { id: "r", label: T("Dar kısım / geniş kısım", "Narrow / wide ratio"), min: 0.3, max: 1, step: 0.05, value: 0.5 }
    ],
    animated: true, loop: true, ratio: 0.55,
    init() { return { pts: Array.from({ length: 70 }, () => [Math.random(), Math.random() * 2 - 1]) }; },
    tasks: () => [T("Dar kısmı yarıya indir: hız kaç katına çıkar?", "Halve the width: how much faster?"), T("Neden iki tren yan yana geçerken birbirine doğru çekilir?", "Why are two passing trains pulled together?")],
    draw(ctx, W, H, p, t, c, s) {
      const v2 = p.v1 / p.r, dP = 0.5 * 1000 * (v2 * v2 - p.v1 * p.v1);
      const mid = H * 0.62, R1 = H * 0.2, R2 = R1 * p.r, x0 = 20, x1 = W - 20;
      const rad = (x) => { const u = (x - x0) / (x1 - x0); if (u < 0.35) return R1; if (u > 0.65) return R1; const k = (u - 0.35) / 0.3; const w = 0.5 - 0.5 * Math.cos(k * 2 * Math.PI); return R1 + (R2 - R1) * w; };
      ctx.fillStyle = c.accent + "30"; ctx.beginPath(); for (let x = x0; x <= x1; x += 4) ctx.lineTo(x, mid - rad(x)); for (let x = x1; x >= x0; x -= 4) ctx.lineTo(x, mid + rad(x)); ctx.closePath(); ctx.fill();
      ctx.strokeStyle = c.border; ctx.lineWidth = 2; ctx.beginPath(); for (let x = x0; x <= x1; x += 4) ctx.lineTo(x, mid - rad(x)); ctx.stroke(); ctx.beginPath(); for (let x = x0; x <= x1; x += 4) ctx.lineTo(x, mid + rad(x)); ctx.stroke();
      // parçacıklar
      s.pts.forEach((q) => { const x = x0 + q[0] * (x1 - x0), r = rad(x), sp = p.v1 * (R1 / r) * 0.06; q[0] += sp * 0.016 * 3; if (q[0] > 1) { q[0] -= 1; q[1] = Math.random() * 2 - 1; } dot(ctx, x, mid + q[1] * r * 0.85, 2.2, c.text); });
      // basınç tüpleri
      const h1 = Math.min(mid - R1 - 14, 90), h2 = Math.max(6, h1 * (1 - dP / (dP + 15000)));
      [[x0 + (x1 - x0) * 0.18, h1, R1], [x0 + (x1 - x0) * 0.5, h2, R2], [x0 + (x1 - x0) * 0.82, h1, R1]].forEach(([x, h, r]) => {
        ctx.strokeStyle = c.border; ctx.lineWidth = 1.5; ctx.strokeRect(x - 5, mid - r - 100, 10, 100);
        ctx.fillStyle = c.accent + "aa"; ctx.fillRect(x - 4, mid - r - h, 8, h);
      });
      return { html: row(T("Dar kısımda hız v₂ = v₁·A₁/A₂", "Speed in throat"), fmt(v2) + " m/s") + row(T("Basınç düşüşü ΔP", "Pressure drop"), fmt(dP / 1000, 2) + " kPa") + row(T("Debi korunur", "Flow rate"), "A₁v₁ = A₂v₂"),
        note: T("Süreklilik: daralan yerde akış hızlanır. Bernoulli: hızın arttığı yerde basınç azalır — ortadaki tüpte sıvı daha alçakta. Uçak kanadı, püskürtücü ve şemsiyenin ters dönmesi böyle açıklanır.",
          "Continuity speeds the flow; Bernoulli lowers the pressure where speed is higher.") };
    }
  }, ["9/fizik/u3/k7"]);

  const SUBST = () => [["su", T("Su (buzdan buhara)", "Water (ice → steam)")], ["etanol", T("Etil alkol", "Ethanol")]];
  const SDATA = { su: { tm: 0, tb: 100, cs: 2100, cl: 4186, cg: 2010, Lf: 334000, Lv: 2256000 }, etanol: { tm: -114, tb: 78, cs: 2400, cl: 2440, cg: 1420, Lf: 108000, Lv: 855000 } };
  add("isinma", {
    title: () => T("Isınma eğrisi ve hâl değişimi", "Heating curve and phase change"), icon: "timer", tags: "öz ısı erime kaynama gizli ısı",
    desc: () => T("Kütleyi ve ısıtıcının gücünü değiştir; sıcaklık–zaman grafiğindeki düz kısımlarda (hâl değişimi) sıcaklığın neden sabit kaldığını gör.", "Change mass and heater power; see why temperature stays constant during phase changes."),
    params: () => [
      { id: "sub", type: "select", label: T("Madde", "Substance"), options: SUBST(), value: "su" },
      { id: "m", label: T("Kütle m", "Mass m"), min: 0.1, max: 2, step: 0.1, value: 0.5, unit: "kg" },
      { id: "P", label: T("Isıtıcı gücü", "Heater power"), min: 500, max: 5000, step: 100, value: 2000, unit: "W" }
    ],
    animated: true, ratio: 0.62,
    tasks: () => [T("Kaynama süresi erime süresinden kaç kat uzun? Nedenini gizli ısılarla açıkla.", "How much longer is boiling than melting?"), T("Kütleyi iki katına çıkar: grafik nasıl değişir?", "Double the mass: how does the graph change?")],
    draw(ctx, W, H, p, t, c) {
      const S = SDATA[p.sub], Ti = S.tm - 20, Tf = S.tb + 20, m = p.m;
      const seg = [ ["s", m * S.cs * (S.tm - Ti)], ["f", m * S.Lf], ["l", m * S.cl * (S.tb - S.tm)], ["v", m * S.Lv], ["g", m * S.cg * (Tf - S.tb)] ];
      const Qtot = seg.reduce((a, b) => a + b[1], 0), tTot = Qtot / p.P;
      const tempAt = (q) => {
        let acc = 0;
        for (const [k, dq] of seg) {
          if (q <= acc + dq) { const f = (q - acc) / dq;
            return k === "s" ? Ti + f * (S.tm - Ti) : k === "f" ? S.tm : k === "l" ? S.tm + f * (S.tb - S.tm) : k === "v" ? S.tb : S.tb + f * (Tf - S.tb); }
          acc += dq;
        }
        return Tf;
      };
      const tt = Math.min(t * tTot / 8, tTot), q = tt * p.P, T0 = tempAt(q);
      const F = frame(48, 14, W - 62, H - 40, 0, tTot / 60, Ti - 10, Tf + 10);
      axes(ctx, F, c, { xName: T("t (dk)", "t (min)"), yName: "T (°C)" });
      plot(ctx, F, (x) => tempAt(x * 60 * p.P), c.muted, 1.4, [4, 4]);
      plot(ctx, { ...F, x1: Math.max(tt / 60, 1e-6) }, (x) => tempAt(x * 60 * p.P), c.bad, 2.6);
      dot(ctx, F.X(tt / 60), F.Y(T0), 5, c.bad);
      let acc = 0, phase = "";
      for (const [k, dq] of seg) { if (q <= acc + dq + 1e-9) { phase = k; break; } acc += dq; }
      const PH = { s: T("katı ısınıyor", "solid warming"), f: T("eriyor (sıcaklık sabit)", "melting"), l: T("sıvı ısınıyor", "liquid warming"), v: T("kaynıyor (sıcaklık sabit)", "boiling"), g: T("gaz ısınıyor", "gas warming") };
      label(ctx, T("erime", "melt"), F.X(seg[0][1] / p.P / 60) + 4, F.Y(S.tm) - 9, c.muted, "left", 10);
      label(ctx, T("kaynama", "boil"), F.X((seg[0][1] + seg[1][1] + seg[2][1]) / p.P / 60) + 4, F.Y(S.tb) - 9, c.muted, "left", 10);
      return { done: tt >= tTot, html: row("t", fmt(tt / 60, 1) + T(" dk", " min")) + row(T("Sıcaklık", "Temperature"), fmt(T0, 1) + " °C") + row(T("Evre", "Stage"), PH[phase] || "") +
        row(T("Verilen ısı Q", "Heat Q"), fmt(q / 1000, 0) + " kJ") + row(T("Erime ısısı m·Lₑ", "m·Lf"), fmt(seg[1][1] / 1000, 0) + " kJ") + row(T("Buharlaşma ısısı m·Lₖ", "m·Lv"), fmt(seg[3][1] / 1000, 0) + " kJ"),
        note: T("Q = m·c·ΔT sıcaklık değişirken, Q = m·L hâl değişirken kullanılır. Hâl değişiminde verilen ısı tanecikler arası bağları koparmaya gider; sıcaklık değişmez.",
          "Q = mcΔT while warming, Q = mL during a phase change, when temperature stays constant.") };
    }
  }, ["9/fizik/u4/k3", "9/fizik/u4/k4"]);

  add("isildenge", {
    title: () => T("Isıl denge: sıcak ve soğuk suyu karıştır", "Thermal equilibrium: mixing water"), icon: "refresh", tags: "denge sıcaklığı ısı alışverişi",
    desc: () => T("İki farklı kütle ve sıcaklıktaki suyu karıştır; ısı alışverişini ve denge sıcaklığını izle.", "Mix two amounts of water; follow heat exchange and the final temperature."),
    params: () => [
      { id: "m1", label: T("Sıcak su kütlesi", "Hot water mass"), min: 0.1, max: 2, step: 0.1, value: 0.5, unit: "kg" },
      { id: "t1", label: T("Sıcak su sıcaklığı", "Hot temperature"), min: 40, max: 100, step: 1, value: 80, unit: "°C" },
      { id: "m2", label: T("Soğuk su kütlesi", "Cold water mass"), min: 0.1, max: 2, step: 0.1, value: 1, unit: "kg" },
      { id: "t2", label: T("Soğuk su sıcaklığı", "Cold temperature"), min: 0, max: 40, step: 1, value: 20, unit: "°C" }
    ],
    animated: true, ratio: 0.55,
    tasks: () => [T("Eşit kütlelerde denge sıcaklığı nerede olur?", "Where is equilibrium for equal masses?"), T("Denge sıcaklığını 30 °C yap.", "Make the final temperature 30 °C.")],
    draw(ctx, W, H, p, t, c) {
      const Te = (p.m1 * p.t1 + p.m2 * p.t2) / (p.m1 + p.m2), k = 0.9, f = 1 - Math.exp(-k * t);
      const Th = p.t1 + (Te - p.t1) * f, Tc = p.t2 + (Te - p.t2) * f;
      const F = frame(44, 14, W * 0.62 - 44, H - 38, 0, 5, 0, 100);
      axes(ctx, F, c, { xName: "t", yName: "T (°C)", stepY: 20 });
      plot(ctx, { ...F, x1: Math.max(1e-3, Math.min(5, t)) }, (x) => p.t1 + (Te - p.t1) * (1 - Math.exp(-k * x)), c.bad, 2.5);
      plot(ctx, { ...F, x1: Math.max(1e-3, Math.min(5, t)) }, (x) => p.t2 + (Te - p.t2) * (1 - Math.exp(-k * x)), c.accent, 2.5);
      ctx.setLineDash([4, 4]); ctx.strokeStyle = c.good; ctx.beginPath(); ctx.moveTo(F.px, F.Y(Te)); ctx.lineTo(F.px + F.pw, F.Y(Te)); ctx.stroke(); ctx.setLineDash([]);
      // kaplar
      const bx = W * 0.68, bw = W * 0.28, by = 30, bh = H - 60;
      const lvl = Math.min(1, (p.m1 + p.m2) / 4);
      const mix = (a) => { const r = Math.round(80 + (a / 100) * 170), b = Math.round(240 - (a / 100) * 170); return "rgb(" + r + ",110," + b + ")"; };
      ctx.strokeStyle = c.border; ctx.lineWidth = 2; ctx.strokeRect(bx, by, bw, bh);
      const h1 = bh * lvl * (p.m1 / (p.m1 + p.m2));
      ctx.fillStyle = mix(Th); ctx.globalAlpha = 0.75; ctx.fillRect(bx + 2, by + bh - bh * lvl, bw - 4, h1);
      ctx.fillStyle = mix(Tc); ctx.fillRect(bx + 2, by + bh - bh * lvl + h1, bw - 4, bh * lvl - h1); ctx.globalAlpha = 1;
      const Q = p.m1 * 4186 * (p.t1 - Th);
      return { done: t > 5, html: row(key(c.bad) + T("Sıcak su", "Hot"), fmt(Th, 1) + " °C") + row(key(c.accent) + T("Soğuk su", "Cold"), fmt(Tc, 1) + " °C") +
        row(key(c.good) + T("Denge sıcaklığı", "Equilibrium"), fmt(Te, 1) + " °C") + row(T("Aktarılan ısı", "Heat transferred"), fmt(Q / 1000, 1) + " kJ"),
        note: T("Alınan ısı = verilen ısı: m₁·c·(T₁ − Tₑ) = m₂·c·(Tₑ − T₂). Aynı madde için Tₑ, kütlelerin ağırlıklı ortalamasıdır; kütlesi büyük olanın sıcaklığına daha yakındır.",
          "Heat gained = heat lost; the result is the mass-weighted mean temperature.") };
    }
  }, ["9/fizik/u4/k1", "9/fizik/u4/k5"]);

  const MAT = () => [[400, T("Bakır (k = 400)", "Copper")], [237, T("Alüminyum (237)", "Aluminium")], [50, T("Demir (50)", "Iron")], [1, T("Cam (1)", "Glass")], [0.15, T("Tahta (0,15)", "Wood")], [0.04, T("Strafor (0,04)", "Styrofoam")]];
  add("iletim", {
    title: () => T("Katılarda ısı iletimi", "Heat conduction in solids"), icon: "arrowUp", tags: "yalıtım iletkenlik",
    desc: () => T("Çubuğun maddesini, uzunluğunu, kesitini ve uçlar arası sıcaklık farkını değiştir; ısı iletim hızını karşılaştır.", "Change material, length, cross-section and temperature difference; compare conduction rates."),
    params: () => [
      { id: "k", type: "select", label: T("Madde", "Material"), options: MAT(), value: 400 },
      { id: "L", label: T("Uzunluk", "Length"), min: 0.1, max: 1, step: 0.05, value: 0.5, unit: "m" },
      { id: "A", label: T("Kesit alanı", "Cross-section"), min: 1, max: 10, step: 0.5, value: 4, unit: "cm²" },
      { id: "dT", label: T("Sıcaklık farkı", "Temperature difference"), min: 10, max: 200, step: 5, value: 80, unit: "°C" }
    ],
    animated: true, loop: true, ratio: 0.5,
    tasks: () => [T("Tencere sapı neden tahta ya da plastikten yapılır? Bakır ile tahtayı karşılaştır.", "Why are pan handles wooden?"), T("Uzunluğu yarıya indir: iletim hızı nasıl değişir?", "Halve the length: what happens?")],
    draw(ctx, W, H, p, t, c) {
      const rate = p.k * (p.A / 1e4) * p.dT / p.L;
      const x0 = 70, x1 = W - 70, y = H * 0.42, th = 10 + p.A * 3, len = (x1 - x0) * (0.4 + 0.6 * p.L);
      const xs = x0 + ((x1 - x0) - len) / 2;
      const g = ctx.createLinearGradient(xs, 0, xs + len, 0); g.addColorStop(0, "#ff6a4d"); g.addColorStop(1, "#4d8bff");
      ctx.fillStyle = g; ctx.fillRect(xs, y - th / 2, len, th);
      ctx.fillStyle = "#ff6a4d"; ctx.fillRect(xs - 30, y - 30, 26, 60); ctx.fillStyle = "#4d8bff"; ctx.fillRect(xs + len + 4, y - 30, 26, 60);
      label(ctx, T("sıcak", "hot"), xs - 17, y + 44, c.muted, "center", 11); label(ctx, T("soğuk", "cold"), xs + len + 17, y + 44, c.muted, "center", 11);
      // ısı akışını gösteren noktalar: hız ∝ iletim
      const n = 8, sp = Math.min(1.5, Math.log10(1 + rate) / 2);
      for (let i = 0; i < n; i++) { const u = ((i / n) + t * sp * 0.4) % 1; dot(ctx, xs + u * len, y, 3, "#fff"); }
      // karşılaştırma çubukları
      const by = H * 0.72, bw = W - 140;
      MAT().forEach(([k], i) => { const r = k * (p.A / 1e4) * p.dT / p.L, w = Math.max(2, (Math.log10(1 + r * 100) / Math.log10(1 + 4000 * 100)) * bw);
        ctx.fillStyle = k === p.k ? c.warn : c.grid; ctx.fillRect(110, by + i * 8 - 18, w, 6); });
      label(ctx, T("diğer maddelerle (log ölçek)", "vs. other materials (log)"), 110, by - 26, c.muted, "left", 10);
      return { html: row(T("İletim hızı Q/t = k·A·ΔT/L", "Rate Q/t"), fmt(rate, rate < 1 ? 3 : 1) + " W") + row(T("1 dakikada iletilen ısı", "Heat per minute"), fmt(rate * 60 / 1000, 2) + " kJ"),
        note: T("Isı iletim hızı maddenin cinsiyle (k), kesit alanıyla ve sıcaklık farkıyla doğru; uzunlukla ters orantılıdır. Metaller iyi iletken; tahta, strafor ve hava iyi yalıtkandır.",
          "Rate ∝ k·A·ΔT / L. Metals conduct well; wood, foam and air insulate.") };
    }
  }, ["9/fizik/u4/k6", "9/fizik/u4/k7"]);

  /* ======================= 10. SINIF ======================= */

  add("karsilasma", {
    title: () => T("Bağıl hareket: karşılaşma ve yetişme", "Relative motion: meeting and catching up"), icon: "arrowUp", tags: "sabit hız konum zaman",
    desc: () => T("İki aracın hızını, yönünü ve aradaki uzaklığı ayarla; ne zaman ve nerede buluştuklarını konum–zaman grafiğinde gör.", "Set two cars' speeds and gap; see when and where they meet on the x–t graph."),
    params: () => [
      { id: "v1", label: T("A aracının hızı", "Car A speed"), min: -30, max: 30, step: 1, value: 20, unit: "m/s" },
      { id: "v2", label: T("B aracının hızı", "Car B speed"), min: -30, max: 30, step: 1, value: -10, unit: "m/s" },
      { id: "d", label: T("Başlangıçta aradaki uzaklık", "Initial gap"), min: 50, max: 600, step: 10, value: 300, unit: "m" }
    ],
    animated: true, ratio: 0.72,
    tasks: () => [T("Aynı yöne giden iki araçta A'nın B'ye yetişmesini sağla.", "Make A catch up with B moving the same way."), T("B'ye göre A'nın hızı (bağıl hız) nedir? Formülle karşılaştır.", "What is A's velocity relative to B?")],
    draw(ctx, W, H, p, t, c) {
      const vr = p.v1 - p.v2, tm = vr > 0 ? p.d / vr : Infinity, Tmax = isFinite(tm) ? Math.min(60, tm * 1.4) : 20;
      const tt = Math.min(t * Tmax / 6, Tmax);
      const xa = (s) => p.v1 * s, xb = (s) => p.d + p.v2 * s;
      let lo = Math.min(0, p.d, xa(Tmax), xb(Tmax)), hi = Math.max(0, p.d, xa(Tmax), xb(Tmax)); const pad = (hi - lo) * 0.1 + 10; lo -= pad; hi += pad;
      const road = frame(20, 6, W - 40, 30, lo, hi, 0, 1);
      ctx.strokeStyle = c.border; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(20, 32); ctx.lineTo(W - 20, 32); ctx.stroke();
      const car = (x, col, lab) => { ctx.fillStyle = col; ctx.fillRect(road.X(x) - 14, 14, 28, 13); label(ctx, lab, road.X(x), 8, col, "center", 10); };
      car(xa(tt), c.accent, "A"); car(xb(tt), c.warn, "B");
      const F = frame(48, 60, W - 62, H - 92, 0, Tmax, lo, hi);
      axes(ctx, F, c, { xName: "t (s)", yName: "x (m)" });
      plot(ctx, F, xa, c.accent + "55", 1.4, [4, 4]); plot(ctx, F, xb, c.warn + "55", 1.4, [4, 4]);
      plot(ctx, { ...F, x1: Math.max(tt, 1e-3) }, xa, c.accent, 2.5); plot(ctx, { ...F, x1: Math.max(tt, 1e-3) }, xb, c.warn, 2.5);
      if (isFinite(tm) && tm <= Tmax) { dot(ctx, F.X(tm), F.Y(xa(tm)), 6, c.good); label(ctx, T("buluşma", "meet"), F.X(tm) + 8, F.Y(xa(tm)) - 10, c.good, "left", 11); }
      return { done: tt >= Tmax, html: row(T("A'nın B'ye göre hızı", "A relative to B"), fmt(vr, 1) + " m/s") +
        row(T("Buluşma zamanı t = d / v(bağıl)", "Meeting time"), isFinite(tm) ? fmt(tm, 1) + " s" : T("buluşmazlar", "never")) +
        row(T("Buluşma konumu", "Meeting position"), isFinite(tm) ? fmt(xa(tm), 0) + " m" : "—"),
        note: T("Bağıl hız v(A'ya göre B) = v(B) − v(A). Zıt yönde gidenlerde hızlar toplanır, aynı yönde gidenlerde çıkarılır. Grafikte doğruların kesiştiği nokta buluşma anıdır.",
          "Opposite directions: speeds add; same direction: they subtract. The crossing point is the meeting.") };
    }
  }, ["10/fizik/u1/k1", "10/fizik/u1/k2"]);

  add("enerji", {
    title: () => T("Mekanik enerjinin korunumu", "Conservation of mechanical energy"), icon: "chart", tags: "kinetik potansiyel sürtünme iş",
    desc: () => T("Rampanın yüksekliğini, kütleyi ve sürtünmeyi değiştir; kinetik ve potansiyel enerjinin birbirine dönüşmesini, sürtünmenin ısıya giden payını izle.", "Change height, mass and friction; watch kinetic and potential energy trade places."),
    params: () => [
      { id: "h", label: T("Bırakılma yüksekliği", "Release height"), min: 1, max: 10, step: 0.5, value: 6, unit: "m" },
      { id: "m", label: T("Kütle", "Mass"), min: 0.5, max: 10, step: 0.5, value: 2, unit: "kg" },
      { id: "mu", label: T("Sürtünme", "Friction"), min: 0, max: 0.3, step: 0.01, value: 0, hint: T("0 = sürtünmesiz", "0 = frictionless") }
    ],
    animated: true, loop: true, ratio: 0.62,
    init() { return { x: -1, v: 0, Eh: 0 }; },
    step(s, p, dt) {
      // U biçimli pist: y = h·x² (x ∈ [−1, 1]), gerçek uzunluğa göre hareket
      const n = Math.max(1, Math.ceil(dt / 0.002)), hdt = dt / n;
      for (let i = 0; i < n; i++) {
        const L = 6;   // yatay ölçek: x = ±1 ↔ ±6 m
        const sl = 2 * p.h * s.x / L, dl = Math.sqrt(1 + sl * sl), sA = sl / dl, cA = 1 / dl;
        let a = -g0 * sA;
        if (Math.abs(s.v) > 1e-4) a -= Math.sign(s.v) * p.mu * g0 * cA; else if (Math.abs(g0 * sA) <= p.mu * g0 * cA) { s.v = 0; continue; }
        s.v += a * hdt;
        const dsx = s.v * hdt / dl;     // yol → yatay
        s.x += dsx / L;
        s.Eh += p.mu * p.m * g0 * cA * Math.abs(s.v * hdt);
        if (s.x > 1) { s.x = 1; s.v = 0; } if (s.x < -1) { s.x = -1; s.v = 0; }
      }
    },
    tasks: () => [T("Sürtünmesiz pistte cisim karşı tarafta hangi yüksekliğe çıkar?", "Frictionless: how high does it climb on the other side?"), T("Sürtünmeyi 0,1 yap: her salınımda kaybolan enerji nereye gidiyor?", "With friction, where does the lost energy go?"), T("Kütleyi değiştir: en alttaki hız değişiyor mu?", "Change the mass: does the bottom speed change?")],
    draw(ctx, W, H, p, t, c, s) {
      const L = 6, F = frame(20, 14, W * 0.66 - 30, H - 34, -L * 1.05, L * 1.05, -0.5, 10.6);
      ctx.strokeStyle = c.border; ctx.lineWidth = 3; ctx.beginPath();
      for (let i = 0; i <= 80; i++) { const x = -1 + i / 40; const X = F.X(x * L), Y = F.Y(p.h * x * x); i ? ctx.lineTo(X, Y) : ctx.moveTo(X, Y); } ctx.stroke();
      const y = p.h * s.x * s.x; dot(ctx, F.X(s.x * L), F.Y(y) - 8, 8, c.accent);
      const Ep = p.m * g0 * y, Ek = 0.5 * p.m * s.v * s.v, E0 = p.m * g0 * p.h, Eh = s.Eh;
      const bx = W * 0.7, bh = H - 60, bw = 26;
      [[Ek, c.good, "Eₖ"], [Ep, c.warn, "Eₚ"], [Eh, c.bad, T("ısı", "heat")], [Ek + Ep + Eh, c.muted, T("top.", "tot.")]].forEach(([v, col, nm], i) => {
        const hh = Math.min(1, v / E0) * bh; ctx.fillStyle = c.grid; ctx.fillRect(bx + i * (bw + 8), 20, bw, bh);
        ctx.fillStyle = col; ctx.fillRect(bx + i * (bw + 8), 20 + bh - hh, bw, hh); label(ctx, nm, bx + i * (bw + 8) + bw / 2, 30 + bh, c.muted, "center", 10);
      });
      return { html: row(key(c.good) + T("Kinetik ½mv²", "Kinetic"), fmt(Ek, 1) + " J") + row(key(c.warn) + T("Potansiyel mgh", "Potential"), fmt(Ep, 1) + " J") +
        row(key(c.bad) + T("Isıya dönüşen", "To heat"), fmt(Eh, 1) + " J") + row(T("Hız", "Speed"), fmt(Math.abs(s.v), 2) + " m/s") + row(T("En alttaki hız √(2gh)", "Max speed √(2gh)"), fmt(Math.sqrt(2 * g0 * p.h), 2) + " m/s"),
        note: T("Sürtünme yokken Eₖ + Eₚ hep sabittir. Sürtünme varsa toplam mekanik enerji azalır; kaybolan kısım sürtünmenin yaptığı işe, yani ısıya dönüşür. En alttaki hız kütleye bağlı değildir.",
          "Without friction Ek + Ep is constant; friction turns part of it into heat. The bottom speed does not depend on mass.") };
    }
  }, ["10/fizik/u2/k1", "10/fizik/u2/k2", "10/fizik/u2/k3", "10/fizik/u2/k4", "11/fizik/u2/k1"]);

  add("devre", {
    title: () => T("Elektrik devresi: seri ve paralel", "Circuits: series and parallel"), icon: "lightbulb", tags: "ohm akım gerilim direnç lamba",
    desc: () => T("Üreteç gerilimini ve iki direnci ayarla, seri ya da paralel bağla; akımları, gerilimleri ve lambaların parlaklığını gör.", "Set the source and two resistors, connect them in series or parallel; see currents, voltages and bulb brightness."),
    params: () => [
      { id: "mode", type: "select", label: T("Bağlama", "Connection"), options: [["seri", T("Seri", "Series")], ["paralel", T("Paralel", "Parallel")]], value: "seri" },
      { id: "V", label: T("Üreteç gerilimi", "Source voltage"), min: 1, max: 24, step: 0.5, value: 12, unit: "V" },
      { id: "R1", label: "R₁", min: 1, max: 30, step: 1, value: 4, unit: "Ω" },
      { id: "R2", label: "R₂", min: 1, max: 30, step: 1, value: 8, unit: "Ω" },
      { id: "r", label: T("İç direnç r", "Internal resistance r"), min: 0, max: 4, step: 0.5, value: 0, unit: "Ω" }
    ],
    animated: true, loop: true, ratio: 0.62,
    tasks: () => [T("Seri bağlamada hangi lamba daha parlak? Neden?", "In series, which bulb is brighter?"), T("Paralelde R₂'yi büyütünce R₁'in akımı değişiyor mu?", "In parallel, does R₁'s current change when R₂ grows?"), T("İç direnci artır: uç gerilimi neden düşüyor?", "Raise r: why does terminal voltage drop?")],
    draw(ctx, W, H, p, t, c) {
      const ser = p.mode === "seri", Req = ser ? p.R1 + p.R2 : (p.R1 * p.R2) / (p.R1 + p.R2), I = p.V / (Req + p.r), Vt = p.V - I * p.r;
      const I1 = ser ? I : Vt / p.R1, I2 = ser ? I : Vt / p.R2, V1 = I1 * p.R1, V2 = I2 * p.R2, P1 = I1 * V1, P2 = I2 * V2;
      const L = 40, R = W - 40, Tp = 30, B = H - 40, mx = (L + R) / 2;
      ctx.strokeStyle = c.text; ctx.lineWidth = 2;
      const line = (pts) => { ctx.beginPath(); pts.forEach((q, i) => (i ? ctx.lineTo(q[0], q[1]) : ctx.moveTo(q[0], q[1]))); ctx.stroke(); };
      // pil (solda)
      line([[L, B], [L, (Tp + B) / 2 + 12]]); line([[L, (Tp + B) / 2 - 12], [L, Tp]]);
      ctx.lineWidth = 3; line([[L - 14, (Tp + B) / 2 - 6], [L + 14, (Tp + B) / 2 - 6]]); ctx.lineWidth = 2; line([[L - 8, (Tp + B) / 2 + 6], [L + 8, (Tp + B) / 2 + 6]]); ctx.lineWidth = 2;
      label(ctx, fmt(p.V, 1) + " V", L + 18, (Tp + B) / 2, c.muted, "left", 11);
      const bulb = (x, y, pw, nm) => {
        const b = Math.min(1, pw / 40);
        const g = ctx.createRadialGradient(x, y, 2, x, y, 34); g.addColorStop(0, "rgba(255,220,120," + (0.15 + b * 0.8) + ")"); g.addColorStop(1, "rgba(255,220,120,0)");
        ctx.fillStyle = g; ctx.beginPath(); ctx.arc(x, y, 34, 0, 7); ctx.fill();
        ctx.strokeStyle = c.text; ctx.beginPath(); ctx.arc(x, y, 12, 0, 7); ctx.stroke(); ctx.beginPath(); ctx.moveTo(x - 8, y - 8); ctx.lineTo(x + 8, y + 8); ctx.moveTo(x + 8, y - 8); ctx.lineTo(x - 8, y + 8); ctx.stroke();
        label(ctx, nm, x, y + 24, c.muted, "center", 11);
      };
      if (ser) {
        line([[L, Tp], [R, Tp], [R, B], [L, B]]);
        bulb(mx - (R - L) / 5, Tp, P1, "R₁"); bulb(mx + (R - L) / 5, Tp, P2, "R₂");
      } else {
        const y1 = Tp, y2 = (Tp + B) / 2 + 10;
        line([[L, Tp], [R, Tp], [R, B], [L, B]]); line([[mx - 70, Tp], [mx - 70, y2], [mx + 70, y2], [mx + 70, Tp]]);
        bulb(mx, y1, P1, "R₁"); bulb(mx, y2, P2, "R₂");
      }
      // akan yük (elektron değil, akım yönü)
      const per = 2 * (R - L) + 2 * (B - Tp), sp = Math.min(220, I * 40);
      for (let i = 0; i < 18; i++) {
        let u = ((i / 18) * per + t * sp) % per, x, y;
        if (u < R - L) { x = L + u; y = Tp; } else if ((u -= R - L) < B - Tp) { x = R; y = Tp + u; } else if ((u -= B - Tp) < R - L) { x = R - u; y = B; } else { u -= R - L; x = L; y = B - u; }
        dot(ctx, x, y, 2.6, c.warn);
      }
      return { html: row(T("Eşdeğer direnç", "Equivalent R"), fmt(Req, 2) + " Ω") + row(T("Ana kol akımı I", "Main current"), fmt(I, 2) + " A") + row(T("Uç gerilimi", "Terminal voltage"), fmt(Vt, 2) + " V") +
        row("R₁: I / V / P", fmt(I1, 2) + " A · " + fmt(V1, 1) + " V · " + fmt(P1, 1) + " W") + row("R₂: I / V / P", fmt(I2, 2) + " A · " + fmt(V2, 1) + " V · " + fmt(P2, 1) + " W"),
        note: ser ? T("Seride akım her yerde aynıdır; gerilim dirençlerle orantılı paylaşılır, büyük direncin lambası daha parlaktır (P = I²R).", "In series the current is the same; the larger resistor gets more voltage and glows brighter.")
          : T("Paralelde gerilim her kolda aynıdır; akım dirençle ters orantılı bölünür, küçük direncin lambası daha parlaktır (P = V²/R). Eşdeğer direnç en küçük dirençten de küçüktür.", "In parallel the voltage is the same; the smaller resistor draws more current and glows brighter.") };
    }
  }, ["10/fizik/u3/k1", "10/fizik/u3/k2", "10/fizik/u3/k3", "10/fizik/u3/k4", "10/fizik/u3/k5", "11/fizik/u3/k2"]);

  add("rezonans", {
    title: () => T("Rezonans", "Resonance"), icon: "volume", tags: "zorlanmış titreşim doğal frekans deprem",
    desc: () => T("Sistemin doğal frekansını ve sönümü ayarla, zorlayıcı frekansı değiştir: frekanslar eşitlenince genlik büyür.", "Set natural frequency and damping, sweep the driving frequency: amplitude peaks at resonance."),
    params: () => [
      { id: "f0", label: T("Doğal frekans f₀", "Natural frequency f₀"), min: 0.5, max: 3, step: 0.1, value: 1.5, unit: "Hz" },
      { id: "f", label: T("Zorlayıcı frekans f", "Driving frequency f"), min: 0.1, max: 4, step: 0.05, value: 0.8, unit: "Hz" },
      { id: "z", label: T("Sönüm", "Damping"), min: 0.02, max: 0.5, step: 0.01, value: 0.08 }
    ],
    animated: true, loop: true, ratio: 0.6,
    tasks: () => [T("Genliği en büyük yapan zorlayıcı frekansı bul.", "Find the driving frequency with the largest amplitude."), T("Sönümü artır: tepe nasıl değişir? Binalarda deprem sönümleyiciler neden kullanılır?", "Increase damping: how does the peak change?")],
    draw(ctx, W, H, p, t, c) {
      const A = (f) => { const r = f / p.f0; return 1 / Math.sqrt((1 - r * r) ** 2 + (2 * p.z * r) ** 2); };
      const Amax = 1 / (2 * p.z * Math.sqrt(1 - p.z * p.z));
      const F = frame(44, 14, W * 0.6 - 50, H - 40, 0, 4, 0, Math.min(26, Amax * 1.15));
      axes(ctx, F, c, { xName: "f (Hz)", yName: T("genlik", "amp.") });
      plot(ctx, F, A, c.accent, 2.4); dot(ctx, F.X(p.f), F.Y(A(p.f)), 5.5, c.warn);
      ctx.setLineDash([4, 4]); ctx.strokeStyle = c.muted; ctx.beginPath(); ctx.moveTo(F.X(p.f0), F.py); ctx.lineTo(F.X(p.f0), F.py + F.ph); ctx.stroke(); ctx.setLineDash([]);
      // bina
      const bx = W * 0.8, base = H - 20, sway = Math.min(40, A(p.f) * 3) * Math.sin(2 * Math.PI * p.f * t);
      ctx.fillStyle = c.grid; ctx.fillRect(bx - 50 + Math.sin(2 * Math.PI * p.f * t) * 4, base, 100, 6);
      ctx.strokeStyle = c.text; ctx.lineWidth = 2;
      for (let i = 0; i < 6; i++) { const y = base - i * 28, s1 = sway * (i / 5) ** 1.5, s2 = sway * ((i + 1) / 5) ** 1.5; ctx.strokeRect(bx - 22 + s1, y - 28, 44, 28); void s2; }
      return { html: row(T("Genlik büyütmesi", "Amplification"), "×" + fmt(A(p.f), 1)) + row(T("Tepe (rezonans)", "Peak"), "×" + fmt(Amax, 1) + " @ " + fmt(p.f0, 2) + " Hz"),
        note: T("Zorlayıcı frekans sistemin doğal frekansına eşit olunca enerji en verimli aktarılır ve genlik çok büyür: rezonans. Depremde binalar, köprüler; salıncağı doğru anda itmek; radyonun istasyon seçmesi bu olaydır.",
          "When the driving frequency equals the natural one, amplitude grows a lot: resonance.") };
    }
  }, ["10/fizik/u4/k6"]);

  add("kirilma", {
    title: () => T("Işığın kırılması ve tam yansıma", "Refraction and total internal reflection"), icon: "eye", tags: "snell kırıcılık indisi sınır açısı",
    desc: () => T("Gelme açısını ve ortamların kırıcılık indislerini değiştir; Snell yasasını, sınır açısını ve tam yansımayı gör.", "Change the angle and refractive indices; see Snell's law, the critical angle and total internal reflection."),
    params: () => [
      { id: "a", label: T("Gelme açısı", "Incidence angle"), min: 0, max: 89, step: 1, value: 35, unit: "°" },
      { id: "n1", type: "select", label: T("Işığın geldiği ortam", "From medium"), options: [[1, T("Hava (1,00)", "Air")], [1.33, T("Su (1,33)", "Water")], [1.5, T("Cam (1,50)", "Glass")], [2.42, T("Elmas (2,42)", "Diamond")]], value: 1 },
      { id: "n2", type: "select", label: T("Geçtiği ortam", "To medium"), options: [[1, T("Hava (1,00)", "Air")], [1.33, T("Su (1,33)", "Water")], [1.5, T("Cam (1,50)", "Glass")], [2.42, T("Elmas (2,42)", "Diamond")]], value: 1.5 }
    ],
    ratio: 0.62,
    tasks: () => [T("Camdan havaya geçişte sınır açısını bul (yaklaşık 42°).", "Find the critical angle glass → air."), T("Az yoğundan çok yoğuna geçince ışık normale yaklaşır mı, uzaklaşır mı?", "Does light bend towards the normal into a denser medium?"), T("Elmas neden bu kadar parlar?", "Why does diamond sparkle?")],
    draw(ctx, W, H, p, t, c) {
      const cx = W / 2, cy = H / 2, R = Math.min(W, H) * 0.45, a = p.a * DEG;
      ctx.fillStyle = c.accent + (p.n2 > p.n1 ? "30" : "14"); ctx.fillRect(0, cy, W, H - cy);
      ctx.fillStyle = c.accent + (p.n1 > p.n2 ? "30" : "14"); ctx.fillRect(0, 0, W, cy);
      ctx.strokeStyle = c.border; ctx.lineWidth = 1.5; ctx.beginPath(); ctx.moveTo(0, cy); ctx.lineTo(W, cy); ctx.stroke();
      ctx.setLineDash([5, 5]); ctx.beginPath(); ctx.moveTo(cx, cy - R); ctx.lineTo(cx, cy + R); ctx.stroke(); ctx.setLineDash([]);
      label(ctx, "n₁ = " + fmt(p.n1, 2), 10, 14, c.muted, "left", 11); label(ctx, "n₂ = " + fmt(p.n2, 2), 10, H - 12, c.muted, "left", 11);
      const sin2 = (p.n1 / p.n2) * Math.sin(a), tir = sin2 > 1, b = tir ? 0 : Math.asin(sin2);
      const crit = p.n1 > p.n2 ? Math.asin(p.n2 / p.n1) / DEG : null;
      // fresnel yaklaşık yansıma oranı
      let Rf = 1;
      if (!tir) { const ci = Math.cos(a), ct = Math.cos(b); const rs = ((p.n1 * ci - p.n2 * ct) / (p.n1 * ci + p.n2 * ct)) ** 2, rp = ((p.n1 * ct - p.n2 * ci) / (p.n1 * ct + p.n2 * ci)) ** 2; Rf = (rs + rp) / 2; }
      arrow(ctx, cx - R * Math.sin(a), cy - R * Math.cos(a), cx, cy, c.warn, 3);
      ctx.globalAlpha = Math.max(0.15, Rf); arrow(ctx, cx, cy, cx + R * Math.sin(a), cy - R * Math.cos(a), c.warn, 2); ctx.globalAlpha = 1;
      if (!tir) { ctx.globalAlpha = Math.max(0.2, 1 - Rf); arrow(ctx, cx, cy, cx + R * Math.sin(b), cy + R * Math.cos(b), c.good, 3); ctx.globalAlpha = 1; }
      label(ctx, fmt(p.a, 0) + "°", cx - 30, cy - 40, c.warn, "center", 12);
      if (!tir) label(ctx, fmt(b / DEG, 1) + "°", cx + 26, cy + 44, c.good, "center", 12);
      if (tir) label(ctx, T("TAM YANSIMA", "TOTAL REFLECTION"), cx, cy + 26, c.bad, "center", 13);
      return { html: row(T("Kırılma açısı", "Refraction angle"), tir ? "—" : fmt(b / DEG, 1) + "°") + row(T("Sınır açısı", "Critical angle"), crit != null ? fmt(crit, 1) + "°" : T("yok (n₁ < n₂)", "none")) +
        row(T("Yansıyan pay (yaklaşık)", "Reflected (approx.)"), "%" + fmt(Rf * 100, 0)),
        note: T("Snell: n₁·sin(gelme) = n₂·sin(kırılma). Çok yoğun ortama geçen ışık normale yaklaşır. Çok yoğundan az yoğuna geçerken gelme açısı sınır açısını aşarsa ışık geçemez, tamamen yansır — fiber optik kablolar böyle çalışır.",
          "Snell: n₁ sinθ₁ = n₂ sinθ₂. Beyond the critical angle light is totally reflected — that is how optical fibres work.") };
    }
  }, ["10/fizik/u4/k5", "11/fizik/u4/k1"]);

  /* ======================= 11. SINIF ======================= */

  add("newton", {
    title: () => T("Eğik düzlem: Newton yasaları ve sürtünme", "Inclined plane: Newton's laws and friction"), icon: "arrowDown", tags: "net kuvvet ivme statik kinetik sürtünme",
    desc: () => T("Eğim açısını, kütleyi ve sürtünme katsayısını değiştir; kuvvet diyagramını, net kuvveti ve ivmeyi gör. Cisim ne zaman kaymaya başlar?", "Change the angle, mass and friction; see the free-body diagram and when the block starts to slide."),
    params: () => [
      { id: "a", label: T("Eğim açısı", "Angle"), min: 0, max: 60, step: 1, value: 25, unit: "°" },
      { id: "m", label: T("Kütle", "Mass"), min: 1, max: 20, step: 1, value: 5, unit: "kg" },
      { id: "ms", label: T("Statik sürtünme μₛ", "Static μs"), min: 0, max: 1, step: 0.05, value: 0.4 },
      { id: "mk", label: T("Kinetik sürtünme μₖ", "Kinetic μk"), min: 0, max: 1, step: 0.05, value: 0.3 },
      { id: "Fp", label: T("Rampa boyunca itme (yukarı +)", "Push along ramp (up +)"), min: -40, max: 80, step: 1, value: 0, unit: "N" }
    ],
    animated: true, ratio: 0.62,
    tasks: () => [T("Cismin kaymaya başladığı açıyı bul. tan(açı) = μₛ ile karşılaştır.", "Find the angle where it starts sliding; compare tanθ = μs."), T("Kütleyi değiştir: ivme değişiyor mu? Neden?", "Change mass: does acceleration change?"), T("Cismi sabit hızla yukarı çıkarmak için ne kadar itmelisin?", "What push moves it up at constant speed?")],
    draw(ctx, W, H, p, t, c) {
      const a = p.a * DEG, G = p.m * g0, Gp = G * Math.sin(a), N = G * Math.cos(a);
      const drive = p.Fp - Gp;                // rampa yukarı +
      let fr, acc, moving;
      if (Math.abs(drive) <= p.ms * N) { fr = -drive; acc = 0; moving = false; }
      else { fr = -Math.sign(drive) * p.mk * N; acc = (drive + fr) / p.m; moving = true; }
      const Lr = W * 0.72, x0 = 30, y0 = H - 24, x1 = x0 + Lr * Math.cos(a), y1 = y0 - Lr * Math.sin(a);
      ctx.fillStyle = c.grid; ctx.beginPath(); ctx.moveTo(x0, y0); ctx.lineTo(x0 + Lr * Math.cos(a), y0); ctx.lineTo(x1, y1); ctx.closePath(); ctx.fill();
      ctx.strokeStyle = c.border; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(x0, y0); ctx.lineTo(x1, y1); ctx.stroke();
      let s = 0.55 + (moving ? 0.5 * acc * t * t / 20 : 0); s = Math.max(0.08, Math.min(0.92, s));
      const bx = x0 + Lr * s * Math.cos(a), by = y0 - Lr * s * Math.sin(a), sz = 22 + p.m;
      ctx.save(); ctx.translate(bx, by); ctx.rotate(-a); ctx.fillStyle = c.accent; ctx.fillRect(-sz / 2, -sz, sz, sz); ctx.restore();
      const cxb = bx - Math.sin(a) * sz / 2, cyb = by - Math.cos(a) * sz / 2, k = 1.4;
      arrow(ctx, cxb, cyb, cxb, cyb + G * k, c.bad, 2.2); label(ctx, "G", cxb + 6, cyb + G * k - 6, c.bad, "left");
      arrow(ctx, cxb, cyb, cxb - Math.sin(a) * N * k, cyb - Math.cos(a) * N * k, c.good, 2.2); label(ctx, "N", cxb - Math.sin(a) * N * k - 10, cyb - Math.cos(a) * N * k, c.good, "right");
      if (Math.abs(fr) > 0.01) { arrow(ctx, cxb, cyb, cxb + Math.cos(a) * fr * k, cyb - Math.sin(a) * fr * k, c.warn, 2.2); label(ctx, "fₛ", cxb + Math.cos(a) * fr * k + 6, cyb - Math.sin(a) * fr * k - 6, c.warn, "left"); }
      if (p.Fp) { arrow(ctx, cxb, cyb, cxb + Math.cos(a) * p.Fp * k, cyb - Math.sin(a) * p.Fp * k, c.violet, 2.2); }
      return { html: row(T("Durum", "State"), moving ? (acc > 0 ? T("yukarı hızlanıyor", "accelerating up") : T("aşağı kayıyor", "sliding down")) : T("duruyor", "at rest")) +
        row(T("G·sinθ (eğim boyunca)", "G·sinθ"), fmt(Gp, 1) + " N") + row(T("Tepki kuvveti N", "Normal N"), fmt(N, 1) + " N") + row(key(c.warn) + T("Sürtünme kuvveti", "Friction"), fmt(Math.abs(fr), 1) + " N") +
        row(T("İvme a = F(net) / m", "Acceleration"), fmt(Math.abs(acc), 2) + " m/s²") + row(T("Kayma açısı (tan⁻¹ μₛ)", "Slip angle"), fmt(Math.atan(p.ms) / DEG, 1) + "°"),
        note: T("Newton 2: F(net) = m·a. Cisim dururken statik sürtünme, onu kaydırmaya çalışan kuvvet kadardır (en çok μₛ·N). Kayarken sürtünme μₖ·N'dir. İtme yoksa ivme kütleye bağlı değildir: a = g(sinθ − μₖcosθ).",
          "F(net) = ma. Static friction matches the push up to μs·N; sliding friction is μk·N.") };
    }
  }, ["11/fizik/u1/k3", "11/fizik/u1/k4"]);

  add("limithiz", {
    title: () => T("Hava direnci ve limit hız", "Air resistance and terminal velocity"), icon: "arrowDown", tags: "paraşüt serbest düşme",
    desc: () => T("Kütleyi ve kesit alanını (paraşüt) değiştir; hız–zaman grafiğinin limit hıza yaklaşmasını izle.", "Change mass and area (parachute); watch the v–t graph approach terminal speed."),
    params: () => [
      { id: "m", label: T("Kütle", "Mass"), min: 0.1, max: 100, step: 0.1, value: 70, unit: "kg" },
      { id: "A", label: T("Kesit alanı", "Area"), min: 0.01, max: 30, step: 0.01, value: 0.7, unit: "m²", hint: T("İnsan ≈ 0,7 m² · paraşüt ≈ 25 m²", "Person ≈ 0.7 m² · parachute ≈ 25 m²") },
      { id: "air", type: "toggle", label: T("Hava direnci var", "Air resistance on"), value: true }
    ],
    animated: true, ratio: 0.6,
    tasks: () => [T("İnsanın limit hızı kaç km/h? Paraşüt açılınca ne oluyor?", "What is the skydiver's terminal speed in km/h?"), T("Hava direncini kapat: grafik neden doğru oluyor?", "Turn off air resistance: why is the graph a straight line?")],
    draw(ctx, W, H, p, t, c) {
      const k = 0.5 * 1.2 * 1.0 * p.A, vt = Math.sqrt(p.m * g0 / k), Tm = p.air ? Math.max(4, Math.min(60, 3 * vt / g0)) : 10;
      const v = (s) => (p.air ? vt * Math.tanh(g0 * s / vt) : g0 * s);
      const tt = Math.min(t * Tm / 6, Tm);
      const F = frame(48, 14, W - 62, H - 40, 0, Tm, 0, (p.air ? vt : g0 * Tm) * 1.15);
      axes(ctx, F, c, { xName: "t (s)", yName: "v (m/s)" });
      if (p.air) { ctx.setLineDash([5, 5]); ctx.strokeStyle = c.good; ctx.beginPath(); ctx.moveTo(F.px, F.Y(vt)); ctx.lineTo(F.px + F.pw, F.Y(vt)); ctx.stroke(); ctx.setLineDash([]); label(ctx, T("limit hız", "terminal"), F.px + F.pw - 4, F.Y(vt) - 9, c.good, "right", 11); }
      plot(ctx, F, v, c.muted, 1.2, [4, 4]); plot(ctx, { ...F, x1: Math.max(tt, 1e-3) }, v, c.accent, 2.6); dot(ctx, F.X(tt), F.Y(v(tt)), 5, c.accent);
      const Fd = p.air ? k * v(tt) ** 2 : 0;
      return { done: tt >= Tm, html: row(T("Hız", "Speed"), fmt(v(tt), 1) + " m/s = " + fmt(v(tt) * 3.6, 0) + " km/h") + row(T("Hava direnci k·v²", "Drag"), fmt(Fd, 0) + " N") + row(T("Ağırlık", "Weight"), fmt(p.m * g0, 0) + " N") +
        row(T("Limit hız √(mg/k)", "Terminal speed"), p.air ? fmt(vt, 1) + " m/s" : "—"),
        note: T("Hava direnci hızın karesiyle artar. Direnç ağırlığa eşit olunca net kuvvet sıfır olur ve cisim sabit hızla (limit hız) düşer. Kesit alanı büyüdükçe limit hız küçülür.",
          "Drag grows with v². When it equals weight, the net force is zero: terminal velocity.") };
    }
  }, ["11/fizik/u1/k5", "11/fizik/u1/k1"]);

  add("cembersel", {
    title: () => T("Düzgün çembersel hareket", "Uniform circular motion"), icon: "refresh", tags: "merkezcil kuvvet periyot açısal hız viraj",
    desc: () => T("Yarıçapı, hızı ve kütleyi değiştir; merkezcil ivme ve kuvvetin yönünü ve büyüklüğünü gör.", "Change radius, speed and mass; see centripetal acceleration and force."),
    params: () => [
      { id: "r", label: T("Yarıçap r", "Radius r"), min: 1, max: 10, step: 0.5, value: 4, unit: "m" },
      { id: "v", label: T("Çizgisel hız v", "Speed v"), min: 1, max: 20, step: 0.5, value: 6, unit: "m/s" },
      { id: "m", label: T("Kütle", "Mass"), min: 0.5, max: 10, step: 0.5, value: 1, unit: "kg" },
      { id: "mu", label: T("Virajda sürtünme μ (yatay yol)", "Road friction μ"), min: 0.1, max: 1, step: 0.05, value: 0.6 }
    ],
    animated: true, loop: true, ratio: 0.62,
    tasks: () => [T("Hızı iki katına çıkar: merkezcil kuvvet kaç katına çıkıyor?", "Double the speed: how does the force change?"), T("Araç virajı savrulmadan dönebiliyor mu? En büyük güvenli hızı bul.", "Find the maximum safe cornering speed.")],
    draw(ctx, W, H, p, t, c) {
      const w = p.v / p.r, ac = p.v * p.v / p.r, Fc = p.m * ac, vmax = Math.sqrt(p.mu * g0 * p.r), safe = p.v <= vmax;
      const cx = W * 0.36, cy = H / 2, R = Math.min(H * 0.42, W * 0.3) * (0.35 + 0.65 * p.r / 10);
      ctx.strokeStyle = c.border; ctx.setLineDash([4, 5]); ctx.beginPath(); ctx.arc(cx, cy, R, 0, 7); ctx.stroke(); ctx.setLineDash([]);
      const th = w * t, x = cx + R * Math.cos(th), y = cy - R * Math.sin(th);
      ctx.strokeStyle = c.grid; ctx.beginPath(); ctx.moveTo(cx, cy); ctx.lineTo(x, y); ctx.stroke(); dot(ctx, cx, cy, 3, c.muted);
      dot(ctx, x, y, 9, safe ? c.accent : c.bad);
      const vs = 6 + p.v * 3.2, as = Math.min(R * 0.9, 10 + ac * 2);
      arrow(ctx, x, y, x - Math.sin(th) * vs, y - Math.cos(th) * vs, c.good, 2.4); label(ctx, "v", x - Math.sin(th) * vs - 8, y - Math.cos(th) * vs, c.good, "right");
      arrow(ctx, x, y, x + (cx - x) / R * as, y + (cy - y) / R * as, c.warn, 2.4); label(ctx, "a", x + (cx - x) / R * as, y + (cy - y) / R * as - 10, c.warn, "center");
      return { html: row(T("Periyot T = 2πr/v", "Period"), fmt(2 * Math.PI * p.r / p.v, 2) + " s") + row(T("Açısal hız ω", "ω"), fmt(w, 2) + " rad/s") +
        row(key(c.warn) + T("Merkezcil ivme v²/r", "Centripetal acc."), fmt(ac, 2) + " m/s²") + row(T("Merkezcil kuvvet", "Centripetal force"), fmt(Fc, 1) + " N") +
        row(T("Virajda en büyük güvenli hız √(μgr)", "Max safe speed"), fmt(vmax, 1) + " m/s " + (safe ? "✓" : T("— savrulur!", "— skids!"))),
        note: T("Hız vektörü çembere teğettir, büyüklüğü sabit kalsa da yönü sürekli değişir; bu yüzden merkeze doğru bir ivme vardır. Virajda bu kuvveti yolun sürtünmesi sağlar; yetmezse araç savrulur.",
          "Velocity is tangent; its direction changes constantly, so acceleration points to the centre. On a curve friction provides it.") };
    }
  }, ["11/fizik/u1/k6", "12/fizik/u1/k1"]);

  add("carpisma", {
    title: () => T("Çarpışma ve momentum", "Collisions and momentum"), icon: "arrowUp", tags: "itme esnek esnek olmayan korunum",
    desc: () => T("İki arabanın kütlesini ve hızını ayarla; esnek ya da yapışarak (esnek olmayan) çarpıştır. Momentum korunur, kinetik enerji korunur mu?", "Set masses and speeds; collide elastically or inelastically. Momentum is conserved — is kinetic energy?"),
    params: () => [
      { id: "m1", label: T("1. araba kütlesi", "Cart 1 mass"), min: 0.5, max: 5, step: 0.5, value: 2, unit: "kg" },
      { id: "u1", label: T("1. araba hızı", "Cart 1 speed"), min: -6, max: 6, step: 0.5, value: 4, unit: "m/s" },
      { id: "m2", label: T("2. araba kütlesi", "Cart 2 mass"), min: 0.5, max: 5, step: 0.5, value: 1, unit: "kg" },
      { id: "u2", label: T("2. araba hızı", "Cart 2 speed"), min: -6, max: 6, step: 0.5, value: -2, unit: "m/s" },
      { id: "type", type: "select", label: T("Çarpışma", "Collision"), options: [["esnek", T("Esnek", "Elastic")], ["yapis", T("Yapışarak (tam esnek olmayan)", "Perfectly inelastic")]], value: "esnek" }
    ],
    animated: true, ratio: 0.5,
    tasks: () => [T("Eşit kütleli iki araba esnek çarpışınca hızlar ne oluyor?", "Equal masses, elastic: what happens to the speeds?"), T("Yapışarak çarpışmada kaybolan kinetik enerjiyi hesapla.", "Compute the kinetic energy lost when they stick.")],
    draw(ctx, W, H, p, t, c) {
      const P = p.m1 * p.u1 + p.m2 * p.u2;
      let v1, v2;
      if (p.type === "esnek") { v1 = ((p.m1 - p.m2) * p.u1 + 2 * p.m2 * p.u2) / (p.m1 + p.m2); v2 = ((p.m2 - p.m1) * p.u2 + 2 * p.m1 * p.u1) / (p.m1 + p.m2); }
      else { v1 = v2 = P / (p.m1 + p.m2); }
      const gap = 6, rel = p.u1 - p.u2, tc = rel > 0 ? gap / rel : Infinity, Tm = isFinite(tc) ? tc + 3 : 4, tt = Math.min(t, Tm);
      const w1 = 0.5 + p.m1 * 0.15, w2 = 0.5 + p.m2 * 0.15;
      const pos = (s) => (s < tc ? [-gap / 2 + p.u1 * s, gap / 2 + p.u2 * s] : [-gap / 2 + p.u1 * tc + v1 * (s - tc), gap / 2 + p.u2 * tc + v2 * (s - tc)]);
      const [x1, x2] = pos(tt);
      const F = frame(10, 0, W - 20, H, -14, 14, 0, 1), y = H * 0.55;
      ctx.strokeStyle = c.border; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(10, y + 22); ctx.lineTo(W - 10, y + 22); ctx.stroke();
      const cart = (x, w, col, txt) => { ctx.fillStyle = col; ctx.fillRect(F.X(x - w / 2), y - 16, F.X(w) - F.X(0), 34); dot(ctx, F.X(x - w / 4), y + 20, 4, c.text); dot(ctx, F.X(x + w / 4), y + 20, 4, c.text); label(ctx, txt, F.X(x), y + 1, "#fff", "center", 11); };
      cart(x1 - w1 / 2, w1, c.accent, fmt(p.m1, 1) + " kg"); cart(x2 + w2 / 2, w2, c.warn, fmt(p.m2, 1) + " kg");
      const after = tt >= tc;
      const Ek0 = 0.5 * p.m1 * p.u1 ** 2 + 0.5 * p.m2 * p.u2 ** 2, Ek1 = 0.5 * p.m1 * v1 ** 2 + 0.5 * p.m2 * v2 ** 2;
      return { done: tt >= Tm, html: row(T("Toplam momentum (önce = sonra)", "Total momentum"), fmt(P, 2) + " kg·m/s") +
        row(T("Son hızlar v₁ / v₂", "Final v₁ / v₂"), isFinite(tc) ? fmt(v1, 2) + " / " + fmt(v2, 2) + " m/s" : T("çarpışmazlar", "no collision")) +
        row(T("Kinetik enerji önce → sonra", "KE before → after"), fmt(Ek0, 1) + " → " + fmt(isFinite(tc) ? Ek1 : Ek0, 1) + " J") + row(T("Durum", "Stage"), after ? T("çarpıştı", "after") : T("çarpışmadan önce", "before")),
        note: T("Dış kuvvet yoksa toplam momentum her çarpışmada korunur. Esnek çarpışmada kinetik enerji de korunur; yapışarak çarpışmada bir kısmı ısıya ve şekil değiştirmeye gider. İtme = momentum değişimi = F·Δt.",
          "Momentum is always conserved; kinetic energy only in elastic collisions. Impulse = Δp = F·Δt.") };
    }
  }, ["11/fizik/u2/k2"]);

  add("elektrikalan", {
    title: () => T("Elektrik yükleri, kuvvet ve alan", "Charges, force and field"), icon: "sparkle", tags: "coulomb alan çizgileri potansiyel",
    desc: () => T("İki yükün işaretini, büyüklüğünü ve aradaki uzaklığı değiştir; Coulomb kuvvetini ve elektrik alan çizgilerini gör.", "Change two charges and their distance; see Coulomb force and field lines."),
    params: () => [
      { id: "q1", label: "q₁", min: -5, max: 5, step: 1, value: 3, unit: "μC" },
      { id: "q2", label: "q₂", min: -5, max: 5, step: 1, value: -3, unit: "μC" },
      { id: "d", label: T("Uzaklık d", "Distance d"), min: 0.1, max: 1, step: 0.05, value: 0.4, unit: "m" }
    ],
    ratio: 0.62,
    tasks: () => [T("Uzaklığı iki katına çıkar: kuvvet kaçta birine iner?", "Double d: what happens to F?"), T("Aynı işaretli iki yükte alan çizgileri nasıl görünür?", "What do field lines look like for like charges?")],
    draw(ctx, W, H, p, t, c) {
      const k = 8.99e9, F = k * Math.abs(p.q1 * p.q2) * 1e-12 / (p.d * p.d);
      const sc = (W * 0.6) / 1, y = H / 2, xA = W / 2 - p.d * sc / 2, xB = W / 2 + p.d * sc / 2;
      const Q = [[xA, y, p.q1], [xB, y, p.q2]];
      const E = (x, yy) => { let ex = 0, ey = 0; Q.forEach(([qx, qy, q]) => { const dx = x - qx, dy = yy - qy, r2 = dx * dx + dy * dy + 30, r = Math.sqrt(r2); ex += q * dx / (r2 * r); ey += q * dy / (r2 * r); }); return [ex, ey]; };
      ctx.strokeStyle = c.accent + "99"; ctx.lineWidth = 1.2;
      Q.forEach(([qx, qy, q]) => {
        if (!q) return;
        const n = Math.abs(q) * 4;
        for (let i = 0; i < n; i++) {
          const a = (2 * Math.PI * i) / n; let x = qx + 12 * Math.cos(a), yy = qy + 12 * Math.sin(a);
          ctx.beginPath(); ctx.moveTo(x, yy);
          for (let s = 0; s < 400; s++) {
            const [ex, ey] = E(x, yy), m = Math.hypot(ex, ey); if (!m) break;
            const dir = q > 0 ? 1 : -1; x += dir * 4 * ex / m; yy += dir * 4 * ey / m; ctx.lineTo(x, yy);
            if (x < 0 || x > W || yy < 0 || yy > H) break;
            if (Q.some(([ox, oy]) => Math.hypot(x - ox, yy - oy) < 10)) break;
          }
          ctx.stroke();
        }
      });
      Q.forEach(([qx, qy, q]) => { dot(ctx, qx, qy, 13, q > 0 ? c.bad : q < 0 ? c.accent : c.muted); label(ctx, q > 0 ? "+" : q < 0 ? "−" : "0", qx, qy + 1, "#fff", "center", 15); });
      const attract = p.q1 * p.q2 < 0, fl = Math.min(80, 8 + Math.log10(1 + F) * 30);
      if (p.q1 && p.q2) { const s = attract ? 1 : -1; arrow(ctx, xA, y + 26, xA + s * fl, y + 26, c.warn, 2.4); arrow(ctx, xB, y + 26, xB - s * fl, y + 26, c.warn, 2.4); }
      return { html: row(T("Coulomb kuvveti F = k·q₁·q₂ / d²", "Coulomb force"), fmt(F, 2) + " N") + row(T("Etkileşim", "Interaction"), !p.q1 || !p.q2 ? "—" : attract ? T("çekme", "attraction") : T("itme", "repulsion")) +
        row(T("Ortadaki alan", "Field at midpoint"), fmt(k * Math.abs(p.q1 - p.q2) * 1e-6 / (p.d / 2) ** 2 / 1000, 0) + " kN/C"),
        note: T("Zıt yükler çeker, aynı yükler iter. Kuvvet yüklerin çarpımıyla doğru, uzaklığın karesiyle ters orantılıdır. Alan çizgileri + yükten çıkar, − yüke girer; sık olduğu yerde alan şiddetlidir.",
          "Opposites attract. F ∝ q₁q₂/d². Field lines leave + and enter −.") };
    }
  }, ["11/fizik/u3/k1"]);

  add("induksiyon", {
    title: () => T("Manyetik indüksiyon", "Electromagnetic induction"), icon: "refresh", tags: "faraday lenz akı bobin mıknatıs",
    desc: () => T("Mıknatısı bobinin içine sok, çıkar; hızını ve sarım sayısını değiştir. Akı değiştiği sürece indüksiyon akımı oluşur.", "Move a magnet through a coil; change speed and turns. Current flows only while flux changes."),
    params: () => [
      { id: "v", label: T("Mıknatısın hızı", "Magnet speed"), min: 0.2, max: 3, step: 0.1, value: 1, unit: "m/s" },
      { id: "N", label: T("Sarım sayısı", "Turns"), min: 10, max: 200, step: 10, value: 80 },
      { id: "B", label: T("Mıknatıs gücü", "Magnet strength"), min: 0.1, max: 1, step: 0.05, value: 0.5, unit: "T" }
    ],
    animated: true, loop: true, ratio: 0.62,
    init() { return { hist: [] }; },
    tasks: () => [T("Mıknatıs bobinin ortasında dururken akım neden sıfır?", "Why is the current zero when the magnet is at rest in the middle?"), T("Hızı iki katına çıkar: tepe gerilimi ne olur?", "Double the speed: what happens to peak EMF?")],
    draw(ctx, W, H, p, t, c, s) {
      const per = 4 / p.v, ph = (t % per) / per, x = Math.sin(ph * 2 * Math.PI) * 1.4;    // −1,4…1,4 m arası gidip gelir
      const flux = (xx) => p.B * 0.01 * Math.exp(-(xx * xx) / 0.25);
      const vx = Math.cos(ph * 2 * Math.PI) * 1.4 * 2 * Math.PI / per;
      const emf = -p.N * (-2 * x / 0.25) * flux(x) * vx;      // ε = −N·dΦ/dt
      s.hist.push(emf); if (s.hist.length > 260) s.hist.shift();
      const cy = H * 0.3, cxm = W / 2, sc = W * 0.22;
      // bobin
      ctx.strokeStyle = "#d39b4a"; ctx.lineWidth = 2; const nl = Math.min(14, Math.round(p.N / 15));
      for (let i = 0; i < nl; i++) { const xx = cxm - 40 + (80 * i) / Math.max(1, nl - 1); ctx.beginPath(); ctx.ellipse(xx, cy, 6, 30, 0, 0, 7); ctx.stroke(); }
      // mıknatıs
      const mx = cxm + x * sc;
      ctx.fillStyle = c.bad; ctx.fillRect(mx - 40, cy - 9, 40, 18); ctx.fillStyle = c.accent; ctx.fillRect(mx, cy - 9, 40, 18);
      label(ctx, "N", mx - 20, cy, "#fff", "center", 11); label(ctx, "S", mx + 20, cy, "#fff", "center", 11);
      // galvanometre iğnesi
      const gx = W - 60, gy = cy, ang = Math.max(-1.2, Math.min(1.2, emf * 0.4));
      ctx.strokeStyle = c.border; ctx.beginPath(); ctx.arc(gx, gy + 10, 30, Math.PI, 0); ctx.stroke();
      ctx.strokeStyle = c.warn; ctx.lineWidth = 2.5; ctx.beginPath(); ctx.moveTo(gx, gy + 10); ctx.lineTo(gx + 26 * Math.sin(ang), gy + 10 - 26 * Math.cos(ang)); ctx.stroke();
      const F = frame(44, H * 0.58, W - 58, H * 0.38, 0, 260, -4, 4);
      axes(ctx, F, c, { labels: false }); label(ctx, T("indüksiyon gerilimi", "induced EMF"), 48, H * 0.58 - 8, c.muted, "left", 11);
      ctx.strokeStyle = c.warn; ctx.lineWidth = 2; ctx.beginPath(); s.hist.forEach((v, i) => { const Y = F.Y(Math.max(-4, Math.min(4, v))); i ? ctx.lineTo(F.X(i), Y) : ctx.moveTo(F.X(i), Y); }); ctx.stroke();
      return { html: row(T("Anlık gerilim", "EMF now"), fmt(emf, 3) + " V") + row(T("Akı Φ", "Flux"), fmt(flux(x) * 1000, 2) + " mWb"),
        note: T("Faraday: ε = −N·ΔΦ/Δt. Akı değişmiyorsa (mıknatıs duruyor) akım yoktur. Mıknatıs girerken ve çıkarken akım zıt yönlüdür (Lenz). Jeneratörler bu ilkeyle elektrik üretir.",
          "ε = −N·ΔΦ/Δt; no change, no current. Entering and leaving give opposite currents (Lenz).") };
    }
  }, ["11/fizik/u3/k3"]);

  add("ayna", {
    title: () => T("Çukur ve tümsek ayna", "Concave and convex mirrors"), icon: "eye", tags: "odak görüntü ışın çizimi",
    desc: () => T("Odak uzaklığını (+ çukur, − tümsek) ve cismin yerini değiştir; görüntünün yerini, boyunu ve gerçek/sanal olduğunu gör.", "Change focal length (+ concave, − convex) and object distance; see the image."),
    params: () => [
      { id: "f", label: T("Odak uzaklığı f", "Focal length f"), min: -20, max: 20, step: 1, value: 10, unit: "cm" },
      { id: "d", label: T("Cismin uzaklığı", "Object distance"), min: 3, max: 45, step: 1, value: 25, unit: "cm" },
      { id: "h", label: T("Cismin boyu", "Object height"), min: 2, max: 8, step: 0.5, value: 5, unit: "cm" }
    ],
    ratio: 0.6,
    tasks: () => [T("Çukur aynada büyük ve düz (sanal) görüntü elde et. Cisim nerede olmalı?", "Get an enlarged upright image with a concave mirror."), T("Tümsek ayna neden dikiz aynası olarak kullanılır?", "Why are convex mirrors used as car mirrors?")],
    draw(ctx, W, H, p, t, c) {
      let f = p.f || 1;
      const F = frame(10, 10, W - 20, H - 20, -50, 12, -16, 16), ax = F.Y(0);
      ctx.strokeStyle = c.border; ctx.lineWidth = 1.2; ctx.beginPath(); ctx.moveTo(F.px, ax); ctx.lineTo(F.px + F.pw, ax); ctx.stroke();
      // ayna (x = 0), eğrilik
      ctx.strokeStyle = c.accent; ctx.lineWidth = 3; ctx.beginPath();
      for (let yy = -14; yy <= 14; yy += 0.5) { const xx = (f > 0 ? -1 : 1) * (yy * yy) / (4 * Math.abs(2 * f)) * 0.6; const X = F.X(xx), Y = F.Y(yy); yy === -14 ? ctx.moveTo(X, Y) : ctx.lineTo(X, Y); } ctx.stroke();
      dot(ctx, F.X(-Math.abs(f) * (f > 0 ? 1 : -1)), ax, 3.5, c.text); label(ctx, "F", F.X(-f), ax + 12, c.muted, "center", 11);
      if (f > 0) { dot(ctx, F.X(-2 * f), ax, 2.5, c.muted); label(ctx, "M", F.X(-2 * f), ax + 12, c.muted, "center", 10); }
      const ox = -p.d; arrow(ctx, F.X(ox), ax, F.X(ox), F.Y(p.h), c.good, 3);
      const di = Math.abs(p.d - f) < 1e-9 ? Infinity : (f * p.d) / (p.d - f), m = -di / p.d, ih = m * p.h;
      ctx.lineWidth = 1.6;
      // 1) asal eksene paralel → odaktan geçer (yansıyınca)
      ctx.strokeStyle = c.warn; ctx.beginPath(); ctx.moveTo(F.X(ox), F.Y(p.h)); ctx.lineTo(F.X(0), F.Y(p.h)); const sl = -p.h / (-f); ctx.lineTo(F.X(-50), F.Y(p.h + sl * (-50))); ctx.stroke();
      // 2) tepeden (merkez) yansıyan: açıyla
      ctx.strokeStyle = c.violet; ctx.beginPath(); ctx.moveTo(F.X(ox), F.Y(p.h)); ctx.lineTo(F.X(0), ax); ctx.lineTo(F.X(-50), F.Y(-p.h * 50 / p.d)); ctx.stroke();
      if (di < 0 || f < 0) { ctx.setLineDash([4, 4]); ctx.strokeStyle = c.warn; ctx.beginPath(); ctx.moveTo(F.X(0), F.Y(p.h)); ctx.lineTo(F.X(12), F.Y(p.h + sl * 12)); ctx.stroke();
        ctx.strokeStyle = c.violet; ctx.beginPath(); ctx.moveTo(F.X(0), ax); ctx.lineTo(F.X(12), F.Y(p.h * 12 / p.d)); ctx.stroke(); ctx.setLineDash([]); }
      if (isFinite(di)) { ctx.globalAlpha = di < 0 ? 0.6 : 1; if (di < 0) ctx.setLineDash([5, 4]); arrow(ctx, F.X(-di), ax, F.X(-di), F.Y(ih), c.bad, 3); ctx.setLineDash([]); ctx.globalAlpha = 1; }
      const props = !isFinite(di) ? T("görüntü oluşmaz", "no image") : [di > 0 ? T("gerçek", "real") : T("sanal", "virtual"), m < 0 ? T("ters", "inverted") : T("düz", "upright"), Math.abs(m) > 1.02 ? T("büyük", "larger") : Math.abs(m) < 0.98 ? T("küçük", "smaller") : T("eşit", "same size")].join(", ");
      return { html: row(T("Ayna", "Mirror"), f > 0 ? T("çukur", "concave") : T("tümsek", "convex")) + row(T("Görüntü uzaklığı", "Image distance"), isFinite(di) ? fmt(di, 1) + " cm" : "∞") + row(T("Büyütme", "Magnification"), isFinite(m) ? fmt(m) : "∞") + row(T("Görüntü", "Image"), props),
        note: T("1/f = 1/d꜀ + 1/dᵍ (aynada f = r/2). Çukur aynada cisim odakla ayna arasındaysa görüntü sanal, düz ve büyüktür (makyaj aynası). Tümsek ayna her zaman sanal, düz, küçük görüntü verir ve geniş görüş alanı sağlar.",
          "1/f = 1/do + 1/di. Inside F a concave mirror magnifies; a convex mirror always gives a small upright virtual image.") };
    }
  }, ["11/fizik/u4/k2"]);

  add("doppler", {
    title: () => T("Doppler olayı", "Doppler effect"), icon: "volume", tags: "ses frekans kaynak hareket",
    desc: () => T("Ses kaynağının hızını değiştir; önünde dalgaların sıkıştığını (yüksek frekans), arkasında seyrekleştiğini gör. Ses hızını aşınca şok dalgası oluşur.", "Change source speed: waves bunch up ahead and spread behind; beyond the speed of sound a shock wave forms."),
    params: () => [
      { id: "v", label: T("Kaynağın hızı", "Source speed"), min: 0, max: 450, step: 5, value: 120, unit: "m/s" },
      { id: "f", label: T("Kaynağın frekansı", "Source frequency"), min: 200, max: 1000, step: 10, value: 440, unit: "Hz" }
    ],
    animated: true, loop: true, ratio: 0.6,
    tasks: () => [T("Ambulans yaklaşırken ve uzaklaşırken duyduğun frekansları hesapla (v = 30 m/s).", "Compute approaching/receding frequencies at 30 m/s."), T("Hızı 340 m/s'nin üstüne çıkar: ne görüyorsun?", "Go above 340 m/s: what do you see?")],
    draw(ctx, W, H, p, t, c) {
      const vs = 340, sc = W / 1400, Tw = 0.25, cy = H / 2;
      const still = p.v < 1, x0 = still ? W / (2 * sc) - 20 / sc : 0;
      const per = still ? 1e9 : (W / sc - 40 / sc) / p.v, tt = t % per, xs = x0 + p.v * tt;
      for (let k = 0; k < 24; k++) {
        const te = tt - k * Tw; if (te < 0) break;
        const xe = x0 + p.v * te, r = vs * (tt - te);
        ctx.strokeStyle = c.accent; ctx.globalAlpha = Math.max(0.1, 1 - k / 24); ctx.lineWidth = 1.5; ctx.beginPath(); ctx.arc(xe * sc + 20, cy, r * sc, 0, 7); ctx.stroke();
      }
      ctx.globalAlpha = 1; dot(ctx, xs * sc + 20, cy, 7, c.warn);
      const fa = p.v < vs ? p.f * vs / (vs - p.v) : Infinity, fb = p.f * vs / (vs + p.v);
      label(ctx, T("önde: ", "ahead: ") + (isFinite(fa) ? fmt(fa, 0) + " Hz" : T("şok dalgası", "shock")), W - 10, 16, c.good, "right", 12);
      label(ctx, T("arkada: ", "behind: ") + fmt(fb, 0) + " Hz", 10, 16, c.bad, "left", 12);
      return { html: row(T("Önündeki gözlemci", "Observer ahead"), isFinite(fa) ? fmt(fa, 0) + " Hz" : "—") + row(T("Arkasındaki gözlemci", "Observer behind"), fmt(fb, 0) + " Hz") + row(T("Mach sayısı", "Mach"), fmt(p.v / vs, 2)),
        note: T("Kaynak yaklaştıkça dalgalar sıkışır, frekans artar (ses incelir); uzaklaştıkça frekans azalır. f' = f·v / (v ∓ vₖ). Işıkta da olur: uzaklaşan galaksilerin ışığı kırmızıya kayar.",
          "Approaching: higher pitch; receding: lower. f' = f·v/(v ∓ vs). Light shows it too (redshift).") };
    }
  }, ["11/fizik/u4/k3", "12/fizik/u3/k2"]);

  const METALS = () => [[2.3, T("Sodyum (2,3 eV)", "Sodium")], [2.1, T("Sezyum (2,1 eV)", "Caesium")], [4.3, T("Çinko (4,3 eV)", "Zinc")], [4.7, T("Bakır (4,7 eV)", "Copper")], [5.6, T("Platin (5,6 eV)", "Platinum")]];
  const wlColor = (nm) => { let r = 0, g = 0, b = 0; if (nm < 380) return "#b48cff"; if (nm < 440) { r = (440 - nm) / 60; b = 1; } else if (nm < 490) { g = (nm - 440) / 50; b = 1; } else if (nm < 510) { g = 1; b = (510 - nm) / 20; } else if (nm < 580) { r = (nm - 510) / 70; g = 1; } else if (nm < 645) { r = 1; g = (645 - nm) / 65; } else if (nm <= 780) r = 1; else return "#7a2a2a"; return "rgb(" + Math.round(r * 255) + "," + Math.round(g * 255) + "," + Math.round(b * 255) + ")"; };
  add("fotoelektrik", {
    title: () => T("Fotoelektrik olay", "Photoelectric effect"), icon: "sun", tags: "foton eşik frekansı iş fonksiyonu kuantum",
    desc: () => T("Işığın dalga boyunu, şiddetini ve metali değiştir; elektron sökülüp sökülmediğini ve en büyük kinetik enerjiyi gör.", "Change wavelength, intensity and metal; see whether electrons are emitted and their max kinetic energy."),
    params: () => [
      { id: "l", label: T("Dalga boyu λ", "Wavelength λ"), min: 150, max: 750, step: 5, value: 420, unit: "nm" },
      { id: "I", label: T("Işık şiddeti", "Intensity"), min: 0, max: 100, step: 5, value: 50, unit: "%" },
      { id: "W0", type: "select", label: T("Metal", "Metal"), options: METALS(), value: 2.3 }
    ],
    animated: true, loop: true, ratio: 0.6,
    init() { return { e: [] }; },
    tasks: () => [T("Kırmızı ışıkla (700 nm) şiddeti %100 yapsan da elektron çıkıyor mu? Neden?", "Does bright red light eject electrons? Why?"), T("Çinko için eşik dalga boyunu bul.", "Find the threshold wavelength for zinc.")],
    draw(ctx, W, H, p, t, c, s) {
      const E = 1240 / p.l, Kmax = E - p.W0, emit = Kmax > 0 && p.I > 0, l0 = 1240 / p.W0;
      const plate = W * 0.2, col = wlColor(p.l);
      ctx.fillStyle = "#9aa3ad"; ctx.fillRect(plate - 8, H * 0.2, 16, H * 0.6);
      // ışık
      ctx.globalAlpha = 0.15 + 0.6 * p.I / 100; ctx.fillStyle = col; ctx.beginPath(); ctx.moveTo(W, 0); ctx.lineTo(W, 40); ctx.lineTo(plate, H * 0.55); ctx.lineTo(plate, H * 0.35); ctx.closePath(); ctx.fill(); ctx.globalAlpha = 1;
      if (emit && Math.random() < p.I / 160) s.e.push({ x: plate + 8, y: H * 0.3 + Math.random() * H * 0.4, v: Math.sqrt(Kmax) * 80 * (0.4 + Math.random() * 0.6), a: (Math.random() - 0.5) * 1.2 });
      s.e = s.e.filter((q) => q.x < W);
      s.e.forEach((q) => { q.x += q.v * 0.016 * Math.cos(q.a); q.y += q.v * 0.016 * Math.sin(q.a); dot(ctx, q.x, q.y, 3, c.accent); });
      // K–f grafiği
      const F = frame(W * 0.55, H * 0.62, W * 0.42, H * 0.32, 0, 2.5, 0, 6);
      axes(ctx, F, c, { labels: false }); label(ctx, "Kₘₐₓ", F.px + 2, F.py - 8, c.muted, "left", 10); label(ctx, "f", F.px + F.pw, F.py + F.ph + 10, c.muted, "right", 10);
      const f0 = p.W0 / 4.136;   // ×10¹⁵ Hz
      plot(ctx, F, (x) => (x > f0 ? 4.136 * x - p.W0 : NaN), c.good, 2);
      const fx = 3e8 / (p.l * 1e-9) / 1e15; if (fx <= 2.5) dot(ctx, F.X(fx), F.Y(Math.max(0, Kmax)), 4, col);
      return { html: row(T("Foton enerjisi E = hc/λ", "Photon energy"), fmt(E, 2) + " eV") + row(T("Bağlanma enerjisi (iş fonksiyonu)", "Work function"), fmt(p.W0, 1) + " eV") +
        row(T("En büyük kinetik enerji", "Max kinetic energy"), emit ? fmt(Kmax, 2) + " eV" : T("elektron sökülmez", "no emission")) + row(T("Eşik dalga boyu", "Threshold λ"), fmt(l0, 0) + " nm"),
        note: T("Elektron sökülmesi ışığın şiddetine değil, fotonun enerjisine (frekansına) bağlıdır: E = hf. Eşik frekansının altında ne kadar parlak olursa olsun elektron çıkmaz; şiddet yalnızca sökülen elektron sayısını artırır. Kₘₐₓ = hf − W₀.",
          "Emission depends on photon energy (frequency), not intensity. Kmax = hf − W₀.") };
    }
  }, ["11/fizik/u5/k1", "12/fizik/u5/k2"]);

  add("bohr", {
    title: () => T("Hidrojen atomu: enerji düzeyleri ve spektrum", "Hydrogen: energy levels and spectrum"), icon: "sparkle", tags: "bohr foton yayınma soğurma balmer",
    desc: () => T("Elektronun hangi düzeyden hangisine geçtiğini seç; yayılan fotonun enerjisini, dalga boyunu ve rengini gör.", "Pick a transition; see the emitted photon's energy, wavelength and colour."),
    params: () => [
      { id: "ni", label: T("Başlangıç düzeyi", "From level"), min: 2, max: 6, step: 1, value: 3 },
      { id: "nf", label: T("Son düzey", "To level"), min: 1, max: 5, step: 1, value: 2 }
    ],
    animated: true, loop: true, ratio: 0.62,
    tasks: () => [T("Görünür ışık veren geçişler hangi düzeye iner? (Balmer serisi)", "Which transitions give visible light?"), T("Hidrojeni iyonlaştırmak için gereken enerji kaç eV?", "How much energy ionises hydrogen?")],
    draw(ctx, W, H, p, t, c) {
      const ni = Math.max(p.ni, p.nf + 1), nf = Math.min(p.nf, ni - 1), En = (n) => -13.6 / (n * n), dE = En(ni) - En(nf), lam = 1240 / dE;
      const F = frame(50, 14, W * 0.5 - 50, H - 30, 0, 1, -14.5, 0.8), col = wlColor(lam);
      for (let n = 1; n <= 6; n++) { const y = F.Y(En(n)); ctx.strokeStyle = n === ni || n === nf ? c.text : c.grid; ctx.lineWidth = n === ni || n === nf ? 2 : 1; ctx.beginPath(); ctx.moveTo(F.px, y); ctx.lineTo(F.px + F.pw, y); ctx.stroke();
        label(ctx, "n=" + n, F.px - 6, y, c.muted, "right", 10); label(ctx, fmt(En(n), 2) + " eV", F.px + F.pw + 4, y, c.muted, "left", 10); }
      ctx.strokeStyle = c.grid; ctx.setLineDash([2, 4]); ctx.beginPath(); ctx.moveTo(F.px, F.Y(0)); ctx.lineTo(F.px + F.pw, F.Y(0)); ctx.stroke(); ctx.setLineDash([]);
      const ph = (t % 1.6) / 1.6, xa = F.px + F.pw * 0.5;
      arrow(ctx, xa, F.Y(En(ni)), xa, F.Y(En(nf)), c.warn, 2.6);
      // dalgalı foton
      ctx.strokeStyle = col; ctx.lineWidth = 2; ctx.beginPath();
      const y0 = (F.Y(En(ni)) + F.Y(En(nf))) / 2;
      for (let i = 0; i <= 60; i++) { const x = xa + 10 + i * 2 + ph * 60, y = y0 + Math.sin(i * 0.6) * 6; i ? ctx.lineTo(x, y) : ctx.moveTo(x, y); } ctx.stroke();
      // spektrum şeridi
      const sx = W * 0.58, sw = W * 0.38, sy = H * 0.45;
      for (let i = 0; i < sw; i++) { ctx.fillStyle = wlColor(380 + (i / sw) * 400); ctx.globalAlpha = 0.15; ctx.fillRect(sx + i, sy, 1, 40); }
      ctx.globalAlpha = 1;
      for (let a = 3; a <= 6; a++) { const L = 1240 / (En(a) - En(2)); const x = sx + ((L - 380) / 400) * sw; ctx.fillStyle = wlColor(L); ctx.fillRect(x - 1, sy, 3, 40); }
      if (lam >= 380 && lam <= 780) { const x = sx + ((lam - 380) / 400) * sw; ctx.strokeStyle = c.text; ctx.strokeRect(x - 4, sy - 4, 8, 48); }
      label(ctx, "380 nm", sx, sy + 54, c.muted, "left", 10); label(ctx, "780 nm", sx + sw, sy + 54, c.muted, "right", 10);
      const region = lam < 380 ? T("morötesi", "ultraviolet") : lam > 780 ? T("kızılötesi", "infrared") : T("görünür", "visible");
      return { html: row(T("Geçiş", "Transition"), "n = " + ni + " → " + nf) + row(T("Foton enerjisi", "Photon energy"), fmt(dE, 2) + " eV") + row(T("Dalga boyu", "Wavelength"), fmt(lam, 0) + " nm (" + region + ")") + row(T("İyonlaşma enerjisi", "Ionisation energy"), "13,6 eV"),
        note: T("Elektron üst düzeyden alt düzeye inerken aradaki enerji farkı kadar enerjili bir foton yayar; bu yüzden her element kendine özgü çizgi spektrumu verir. n = 2'ye inişler görünür ışık (Balmer), n = 1'e inişler morötesidir.",
          "Falling electrons emit a photon equal to the energy gap; n → 2 gives visible lines (Balmer).") };
    }
  }, ["11/fizik/u5/k2", "12/fizik/u4/k1"]);

  /* ======================= 12. SINIF ======================= */

  add("yuvarlanma", {
    title: () => T("Dönerek öteleme: yarış", "Rolling race"), icon: "refresh", tags: "eylemsizlik momenti açısal momentum",
    desc: () => T("Halka, silindir ve küre aynı rampadan yuvarlanıyor: hangisi önce varır? Eylemsizlik momenti enerjinin ne kadarının dönmeye gittiğini belirler.", "A ring, a cylinder and a sphere roll down the same ramp: which wins?"),
    params: () => [
      { id: "a", label: T("Rampa açısı", "Ramp angle"), min: 5, max: 45, step: 1, value: 20, unit: "°" },
      { id: "m", label: T("Kütle (hepsi aynı)", "Mass (all equal)"), min: 0.5, max: 5, step: 0.5, value: 1, unit: "kg" }
    ],
    animated: true, ratio: 0.6,
    tasks: () => [T("Kütleyi değiştir: sıralama değişiyor mu?", "Change the mass: does the order change?"), T("Kayan (sürtünmesiz) bir kutu bu yarışta kaçıncı olurdu?", "Where would a frictionless sliding box finish?")],
    draw(ctx, W, H, p, t, c) {
      const a = p.a * DEG, Ls = 5, B = [[T("Kayan kutu", "Sliding box"), 0, c.muted], [T("Küre", "Sphere"), 0.4, c.good], [T("Silindir", "Cylinder"), 0.5, c.warn], [T("Halka", "Ring"), 1, c.bad]];
      const x0 = 30, y0 = 30, Lr = W - 80, x1 = x0 + Lr * Math.cos(a) * 0.95, y1 = y0 + Lr * Math.sin(a) * 0.95;
      ctx.strokeStyle = c.border; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(x0, y0); ctx.lineTo(x1, y1); ctx.stroke();
      const res = B.map(([nm, k, col], i) => {
        const acc = g0 * Math.sin(a) / (1 + k), tf = Math.sqrt(2 * Ls / acc), s = Math.min(Ls, 0.5 * acc * t * t);
        const off = i * 22, u = s / Ls, x = x0 + (x1 - x0) * u + Math.sin(a) * (10 + off) * 0, y = y0 + (y1 - y0) * u - 10 - off;
        if (i === 0) { ctx.fillStyle = col; ctx.fillRect(x - 8, y - 8, 16, 16); }
        else { ctx.strokeStyle = col; ctx.lineWidth = k === 1 ? 4 : 2; ctx.fillStyle = k === 1 ? "transparent" : col + (k === 0.5 ? "aa" : "ff"); ctx.beginPath(); ctx.arc(x, y, 9, 0, 7); if (k !== 1) ctx.fill(); ctx.stroke();
          const ang = s / 0.09; ctx.strokeStyle = c.text; ctx.lineWidth = 1.5; ctx.beginPath(); ctx.moveTo(x, y); ctx.lineTo(x + 8 * Math.cos(ang), y + 8 * Math.sin(ang)); ctx.stroke(); }
        return [nm, k, col, tf, acc];
      });
      return { done: res.every((r) => t >= r[3]), html: res.map(([nm, k, col, tf, acc]) => row(key(col) + nm + (k ? " (I = " + (k === 0.4 ? "⅖" : k === 0.5 ? "½" : "1") + "·mr²)" : ""), fmt(tf, 2) + " s · a = " + fmt(acc, 2))).join(""),
        note: T("Yuvarlanan cisimde potansiyel enerji hem ötelenme hem dönme kinetik enerjisine paylaşılır: mgh = ½mv² + ½Iω². Eylemsizlik momenti büyüdükçe dönmeye giden pay artar, cisim yavaşlar. Sonuç kütleye ve yarıçapa bağlı değildir.",
          "mgh = ½mv² + ½Iω². Larger moment of inertia means slower descent; mass and radius don't matter.") };
    }
  }, ["12/fizik/u1/k2"]);

  add("kepler", {
    title: () => T("Kepler yasaları ve yörünge", "Kepler's laws and orbits"), icon: "circle", tags: "kütle çekimi gezegen eşit alan",
    desc: () => T("Yörüngenin basıklığını (eksantrisite) değiştir; gezegenin Güneş'e yakınken hızlandığını ve eşit sürelerde eşit alan taradığını gör.", "Change eccentricity; see the planet speed up near the Sun and sweep equal areas in equal times."),
    params: () => [
      { id: "e", label: T("Basıklık e", "Eccentricity e"), min: 0, max: 0.85, step: 0.01, value: 0.5 },
      { id: "a", label: T("Büyük yarı eksen a", "Semi-major axis a"), min: 0.5, max: 5, step: 0.1, value: 1, unit: "AU" }
    ],
    animated: true, loop: true, ratio: 0.62,
    init() { return { M: 0, sweeps: [] }; },
    tasks: () => [T("e = 0 yap: hız neden sabit kalıyor?", "Set e = 0: why is the speed constant?"), T("a'yı 4 kat yap: periyot kaç kat olur? (T² ∝ a³)", "Quadruple a: how does the period change?")],
    draw(ctx, W, H, p, t, c, s) {
      const e = p.e, Tyr = Math.pow(p.a, 1.5), dt = 0.016;
      s.M += (2 * Math.PI / 6) * dt;    // 6 sn'de bir tur
      let E = s.M; for (let i = 0; i < 8; i++) E = E - (E - e * Math.sin(E) - s.M) / (1 - e * Math.cos(E));
      const A = Math.min(W * 0.38, H * 0.45 / Math.sqrt(1 - e * e)), Bm = A * Math.sqrt(1 - e * e), cx = W * 0.42, cy = H / 2;
      const pos = (EE) => [cx + A * Math.cos(EE), cy - Bm * Math.sin(EE)];
      ctx.strokeStyle = c.border; ctx.lineWidth = 1.4; ctx.beginPath(); ctx.ellipse(cx, cy, A, Bm, 0, 0, 7); ctx.stroke();
      const sun = [cx + A * e, cy]; dot(ctx, sun[0], sun[1], 10, "#f4b63c");
      // eşit süreli iki alan dilimi (perihel ve afel çevresinde)
      [[0, c.accent], [Math.PI, c.violet]].forEach(([M0, col]) => {
        const span = 2 * Math.PI / 14; ctx.fillStyle = col + "40"; ctx.beginPath(); ctx.moveTo(sun[0], sun[1]);
        for (let k = 0; k <= 20; k++) { let MM = M0 - span / 2 + span * k / 20, EE = MM; for (let i = 0; i < 8; i++) EE = EE - (EE - e * Math.sin(EE) - MM) / (1 - e * Math.cos(EE)); const q = pos(EE); ctx.lineTo(q[0], q[1]); }
        ctx.closePath(); ctx.fill();
      });
      const q = pos(E); ctx.strokeStyle = c.grid; ctx.beginPath(); ctx.moveTo(sun[0], sun[1]); ctx.lineTo(q[0], q[1]); ctx.stroke(); dot(ctx, q[0], q[1], 6, c.accent);
      const r = p.a * (1 - e * Math.cos(E)), v = 29.8 * Math.sqrt(2 / r - 1 / p.a) / Math.sqrt(1);
      return { html: row(T("Periyot (T² = a³)", "Period"), fmt(Tyr, 2) + T(" yıl", " yr")) + row(T("Güneş'e uzaklık", "Distance"), fmt(r, 2) + " AU") + row(T("Yörünge hızı", "Orbital speed"), fmt(v, 1) + " km/s") +
        row(T("En yakın / en uzak", "Perihelion / aphelion"), fmt(p.a * (1 - e), 2) + " / " + fmt(p.a * (1 + e), 2) + " AU"),
        note: T("1) Yörüngeler, Güneş odaklardan birinde olan elipslerdir. 2) Güneş'i gezegene bağlayan doğru eşit sürelerde eşit alan tarar — boyalı iki dilim eşit alanlıdır, bu yüzden gezegen yakınken hızlıdır. 3) T² ∝ a³.",
          "1) Elliptical orbits with the Sun at a focus. 2) Equal areas in equal times. 3) T² ∝ a³.") };
    }
  }, ["12/fizik/u1/k3"]);

  add("radyoaktif", {
    title: () => T("Radyoaktif bozunma ve yarı ömür", "Radioactive decay and half-life"), icon: "timer", tags: "çekirdek bozunma alfa beta",
    desc: () => T("Yarı ömrü ve başlangıçtaki çekirdek sayısını değiştir; çekirdeklerin rastgele bozunmasını ve N–t grafiğini izle.", "Change half-life and starting nuclei; watch random decay and the N–t curve."),
    params: () => [
      { id: "h", label: T("Yarı ömür", "Half-life"), min: 1, max: 10, step: 0.5, value: 3, unit: T("sn", "s") },
      { id: "n", label: T("Başlangıç çekirdek sayısı", "Initial nuclei"), min: 100, max: 900, step: 100, value: 400 }
    ],
    animated: true, ratio: 0.6,
    init(p) { return { alive: Array.from({ length: p.n }, () => 1), hist: [[0, p.n]], tt: 0 }; },
    step(s, p, dt) { const pr = 1 - Math.pow(0.5, dt / p.h); s.alive = s.alive.map((a) => (a && Math.random() < pr ? 0 : a)); s.tt += dt; s.hist.push([s.tt, s.alive.reduce((x, y) => x + y, 0)]); },
    tasks: () => [T("İki yarı ömür sonra kaç çekirdek kalır? Grafikle doğrula.", "How many remain after two half-lives?"), T("Neden tek bir çekirdeğin ne zaman bozunacağını bilemeyiz?", "Why can't we predict when one nucleus decays?")],
    draw(ctx, W, H, p, t, c, s) {
      const cols = Math.ceil(Math.sqrt(p.n * 1.4)), gw = W * 0.42, cs = gw / cols;
      s.alive.forEach((a, i) => { const x = 12 + (i % cols) * cs + cs / 2, y = 14 + Math.floor(i / cols) * cs + cs / 2; dot(ctx, x, y, Math.max(1.5, cs * 0.32), a ? c.accent : c.grid); });
      const Tm = p.h * 5, F = frame(W * 0.5 + 30, 14, W * 0.5 - 44, H - 40, 0, Tm, 0, p.n);
      axes(ctx, F, c, { xName: "t", yName: "N" });
      plot(ctx, F, (x) => p.n * Math.pow(0.5, x / p.h), c.muted, 1.4, [4, 4]);
      ctx.strokeStyle = c.warn; ctx.lineWidth = 2.2; ctx.beginPath(); s.hist.forEach(([x, y], i) => (i ? ctx.lineTo(F.X(x), F.Y(y)) : ctx.moveTo(F.X(x), F.Y(y)))); ctx.stroke();
      for (let k = 1; k <= 4; k++) { ctx.strokeStyle = c.grid; ctx.setLineDash([2, 4]); ctx.beginPath(); ctx.moveTo(F.X(k * p.h), F.py); ctx.lineTo(F.X(k * p.h), F.py + F.ph); ctx.stroke(); ctx.setLineDash([]); }
      const N = s.hist[s.hist.length - 1][1];
      return { done: s.tt >= Tm, html: row(T("Kalan çekirdek", "Remaining"), N + " / " + p.n) + row(T("Geçen yarı ömür", "Half-lives"), fmt(s.tt / p.h, 2)) + row(T("Beklenen N₀·(½)ⁿ", "Expected"), fmt(p.n * Math.pow(0.5, s.tt / p.h), 0)),
        note: T("Her yarı ömürde çekirdeklerin yaklaşık yarısı bozunur: N = N₀·(½)^(t/T½). Hangi çekirdeğin bozunacağı rastgeledir, ama çok sayıda çekirdekte sonuç tahmin edilebilir. Karbon-14 ile yaş tayini böyle yapılır.",
          "Each half-life about half decay: N = N₀(½)^(t/T½). Individually random, predictable in bulk.") };
    }
  }, ["12/fizik/u4/k2"]);

  add("gorelilik", {
    title: () => T("Özel görelilik: zaman genişlemesi", "Special relativity: time dilation"), icon: "clock", tags: "ışık hızı lorentz uzunluk kısalması",
    desc: () => T("Uzay gemisinin hızını ışık hızına yaklaştır; gemideki saatin yavaşladığını ve boyunun kısaldığını gör.", "Push the ship towards light speed; see its clock slow down and length contract."),
    params: () => [{ id: "b", label: T("Hız (ışık hızı cinsinden) v/c", "Speed v/c"), min: 0, max: 0.995, step: 0.005, value: 0.6 }],
    animated: true, loop: true, ratio: 0.55,
    tasks: () => [T("v = 0,8c iken gemide 1 yıl geçerse Dünya'da kaç yıl geçer?", "At 0.8c, 1 year on board is how long on Earth?"), T("Günlük hızlarda (v ≪ c) neden fark etmeyiz?", "Why don't we notice at everyday speeds?")],
    draw(ctx, W, H, p, t, c) {
      const g = 1 / Math.sqrt(1 - p.b * p.b);
      const F = frame(48, 14, W * 0.5 - 56, H - 40, 0, 1, 1, 8);
      axes(ctx, F, c, { xName: "v/c", yName: "γ" });
      plot(ctx, F, (x) => 1 / Math.sqrt(1 - x * x), c.accent, 2.2); dot(ctx, F.X(p.b), F.Y(Math.min(8, g)), 5, c.warn);
      const clock = (x, y, tt, nm) => { ctx.strokeStyle = c.text; ctx.lineWidth = 2; ctx.beginPath(); ctx.arc(x, y, 30, 0, 7); ctx.stroke(); const a = tt * 2 * Math.PI / 4; ctx.beginPath(); ctx.moveTo(x, y); ctx.lineTo(x + 24 * Math.sin(a), y - 24 * Math.cos(a)); ctx.stroke(); label(ctx, nm, x, y + 44, c.muted, "center", 11); };
      clock(W * 0.62, H * 0.32, t, T("Dünya", "Earth")); clock(W * 0.86, H * 0.32, t / g, T("Gemi", "Ship"));
      const L0 = W * 0.36, L = L0 / g, sx = W * 0.56 + (L0 - L) / 2, sy = H * 0.78;
      ctx.fillStyle = c.accent; ctx.beginPath(); ctx.moveTo(sx, sy - 10); ctx.lineTo(sx + L - 16, sy - 10); ctx.lineTo(sx + L, sy); ctx.lineTo(sx + L - 16, sy + 10); ctx.lineTo(sx, sy + 10); ctx.closePath(); ctx.fill();
      return { html: row(T("Lorentz çarpanı γ", "Lorentz factor γ"), fmt(g, 3)) + row(T("Gemide 1 yıl = Dünya'da", "1 ship year ="), fmt(g, 2) + T(" yıl", " yr")) + row(T("Uzunluk L = L₀/γ", "Length"), "%" + fmt(100 / g, 1)),
        note: T("Işık hızı her gözlemci için aynıdır. Bu yüzden hızla hareket eden saat yavaş işler (Δt = γ·Δt₀) ve hareket yönündeki uzunluk kısalır (L = L₀/γ). GPS uyduları bu düzeltmeyi yapmak zorundadır.",
          "Light speed is the same for everyone, so moving clocks run slow (Δt = γΔt₀) and lengths contract. GPS must correct for it.") };
    }
  }, ["12/fizik/u5/k1"]);

  // Mevcut deneylere görevler
  const L = App.labs.LABS;
  const tk = (id, f) => { if (L[id]) L[id].tasks = f; };
  tk("atis", () => [T("Menzili en büyük yapan açıyı bul (yükseklik 0).", "Find the angle for maximum range."), T("30° ve 60° ile at: menziller neden eşit?", "Why do 30° and 60° give the same range?"), T("Ay'da (g = 1,6) aynı atış ne kadar uzağa gider?", "How far on the Moon?")]);
  tk("ivmeli", () => [T("Aracın durup geri döndüğü bir hareket oluştur.", "Make the car stop and reverse."), T("v–t grafiğinin altındaki alanı konumla karşılaştır.", "Compare the area under v–t with position.")]);
  tk("sarkac", () => [T("Periyodu 2 saniye yapan ip uzunluğunu bul.", "Find the length for a 2 s period."), T("Genliği 60° yap: ölçülen periyot formülden ne kadar sapıyor?", "At 60° how far does the period deviate?")]);
  tk("yay", () => [T("Kütleyi 4 katına çıkar: periyot kaç katına çıkıyor?", "Quadruple the mass: period?"), T("Kinetik enerjinin en büyük olduğu konumu göster.", "Where is kinetic energy maximum?")]);
  tk("dalga", () => [T("Frekansı iki katına çıkar: dalga boyu ne olmalı ki hız değişmesin?", "Double f: what λ keeps the speed?"), T("Turuncu noktanın periyodunu ölç.", "Measure the orange point's period.")]);
  tk("girisim", () => [T("Saçakları sıklaştırmanın iki yolunu bul.", "Find two ways to pack the fringes closer."), T("d = λ olunca perdede kaç aydınlık saçak var?", "How many bright fringes when d = λ?")]);
  tk("mercek", () => [T("Büyüteç gibi çalışan bir ayar bul.", "Make it work like a magnifier."), T("Cisim 2F'de iken görüntü nerede ve ne boyda?", "Object at 2F: where is the image?")]);
  tk("fonksiyon", () => [T("Parabolü iki tam sayı kökü olacak şekilde ayarla.", "Give the parabola two integer roots."), T("Teğeti aç ve türevin sıfır olduğu noktayı bul.", "Find where the derivative is zero.")]);
  tk("cember", () => [T("sin θ = cos θ olan açıları bul.", "Find angles where sin = cos."), T("tan θ'nın tanımsız olduğu açıları göster.", "Where is tan undefined?")]);
})();
