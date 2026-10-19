/* =========================================================
   labs.js — Etkileşimli fizik ve matematik deneyleri   (#/lab)

   Kaydırıcılarla oynanan küçük canlandırmalar; internet gerekmez.
     Fizik: eğik atış · ivmeli hareket grafikleri · basit sarkaç · yay (BHH) ·
            dalga · iki kaynaklı girişim · mercek (ışın çizimi)
     Matematik: fonksiyon grafikleri (doğrusal, parabol, üstel, logaritma,
            dönüşümler, teğet ve türev) · birim çember
   İlgili konu sayfalarında kendiliğinden görünür (LINKS), tümü #/lab'da.
   Ekrandan çıkan canlandırma durur (IntersectionObserver), sayfadan çıkınca biter.
   ========================================================= */
(function () {
  const { esc } = App.utils;
  const T = (tr, en) => (App.i18n.lang === "en" ? en : tr);
  const fmt = (x, d) => { if (!isFinite(x)) return "—"; const v = Number(x.toFixed(d == null ? 2 : d)); return String(v).replace(".", App.i18n.lang === "en" ? "." : ","); };
  const DEG = Math.PI / 180;

  /* ---------------- Ortak çizim yardımcıları ---------------- */
  function colors() {
    const cs = getComputedStyle(document.documentElement);
    const v = (n, d) => (cs.getPropertyValue(n) || "").trim() || d;
    return { text: v("--text", "#e8eaed"), muted: v("--muted", "#9aa0a6"), border: v("--border-strong", "rgba(255,255,255,.2)"), grid: v("--border", "rgba(255,255,255,.08)"),
      accent: v("--accent", "#4f7cff"), good: v("--good", "#3fb950"), bad: v("--bad", "#f85149"), warn: "#f2b33d", violet: "#b388ff", bg: v("--surface-solid", "#1e1f22") };
  }
  function arrow(ctx, x1, y1, x2, y2, color, w) {
    const a = Math.atan2(y2 - y1, x2 - x1), len = Math.hypot(x2 - x1, y2 - y1);
    if (len < 2) return;
    ctx.strokeStyle = ctx.fillStyle = color; ctx.lineWidth = w || 2;
    ctx.beginPath(); ctx.moveTo(x1, y1); ctx.lineTo(x2, y2); ctx.stroke();
    const h = Math.min(9, len / 2);
    ctx.beginPath(); ctx.moveTo(x2, y2); ctx.lineTo(x2 - h * Math.cos(a - .45), y2 - h * Math.sin(a - .45)); ctx.lineTo(x2 - h * Math.cos(a + .45), y2 - h * Math.sin(a + .45)); ctx.closePath(); ctx.fill();
  }
  function label(ctx, txt, x, y, color, align, size) {
    ctx.fillStyle = color; ctx.font = (size || 12) + "px system-ui, sans-serif"; ctx.textAlign = align || "left"; ctx.textBaseline = "middle"; ctx.fillText(txt, x, y);
  }
  /** Koordinat sistemi: dünya [x0,x1]×[y0,y1] → piksel dikdörtgeni */
  function frame(px, py, pw, ph, x0, x1, y0, y1) {
    return { X: (x) => px + ((x - x0) / (x1 - x0)) * pw, Y: (y) => py + ph - ((y - y0) / (y1 - y0)) * ph, x0, x1, y0, y1, px, py, pw, ph };
  }
  function niceStep(span) { const raw = span / 8, p = Math.pow(10, Math.floor(Math.log10(raw))); const m = raw / p; return (m < 1.5 ? 1 : m < 3.5 ? 2 : m < 7.5 ? 5 : 10) * p; }
  function axes(ctx, F, c, opts) {
    opts = opts || {};
    ctx.save(); ctx.beginPath(); ctx.rect(F.px, F.py, F.pw, F.ph); ctx.clip();
    const sx = opts.step || niceStep(F.x1 - F.x0), sy = opts.stepY || niceStep(F.y1 - F.y0);
    ctx.strokeStyle = c.grid; ctx.lineWidth = 1;
    for (let x = Math.ceil(F.x0 / sx) * sx; x <= F.x1; x += sx) { ctx.beginPath(); ctx.moveTo(F.X(x), F.py); ctx.lineTo(F.X(x), F.py + F.ph); ctx.stroke(); }
    for (let y = Math.ceil(F.y0 / sy) * sy; y <= F.y1; y += sy) { ctx.beginPath(); ctx.moveTo(F.px, F.Y(y)); ctx.lineTo(F.px + F.pw, F.Y(y)); ctx.stroke(); }
    ctx.strokeStyle = c.border; ctx.lineWidth = 1.4;
    if (F.y0 <= 0 && F.y1 >= 0) { ctx.beginPath(); ctx.moveTo(F.px, F.Y(0)); ctx.lineTo(F.px + F.pw, F.Y(0)); ctx.stroke(); }
    if (F.x0 <= 0 && F.x1 >= 0) { ctx.beginPath(); ctx.moveTo(F.X(0), F.py); ctx.lineTo(F.X(0), F.py + F.ph); ctx.stroke(); }
    ctx.restore();
    if (opts.labels !== false) {
      const yAx = F.y0 <= 0 && F.y1 >= 0 ? F.Y(0) : F.py + F.ph;
      const xAx = F.x0 <= 0 && F.x1 >= 0 ? F.X(0) : F.px;
      for (let x = Math.ceil(F.x0 / sx) * sx; x <= F.x1 + 1e-9; x += sx) if (Math.abs(x) > sx / 2 && !(opts.xName && F.X(x) > F.px + F.pw - 34)) label(ctx, fmt(x, 2), F.X(x), Math.min(F.py + F.ph - 8, yAx + 11), c.muted, "center", 10);
      for (let y = Math.ceil(F.y0 / sy) * sy; y <= F.y1 + 1e-9; y += sy) if (Math.abs(y) > sy / 2 && !(opts.yName && F.Y(y) < F.py + 16)) label(ctx, fmt(y, 2), Math.max(F.px + 4, xAx - 4), F.Y(y), c.muted, xAx - 4 < F.px + 20 ? "left" : "right", 10);
      if (opts.xName) label(ctx, opts.xName, F.px + F.pw - 2, yAx - 10, c.muted, "right", 11);
      if (opts.yName) label(ctx, opts.yName, xAx + 6, F.py + 8, c.muted, "left", 11);
    }
  }
  function plot(ctx, F, fn, color, w, dash) {
    ctx.save(); ctx.beginPath(); ctx.rect(F.px, F.py, F.pw, F.ph); ctx.clip();
    ctx.strokeStyle = color; ctx.lineWidth = w || 2.2; ctx.setLineDash(dash || []);
    ctx.beginPath(); let pen = false, prevY = null;
    const N = Math.max(200, Math.round(F.pw * 1.5));
    for (let i = 0; i <= N; i++) {
      const x = F.x0 + ((F.x1 - F.x0) * i) / N, y = fn(x);
      if (!isFinite(y) || (prevY != null && Math.abs(F.Y(y) - F.Y(prevY)) > F.ph * 1.5)) { pen = false; prevY = isFinite(y) ? y : null; continue; }
      const py = Math.max(F.py - F.ph, Math.min(F.py + 2 * F.ph, F.Y(y)));
      if (pen) ctx.lineTo(F.X(x), py); else { ctx.moveTo(F.X(x), py); pen = true; }
      prevY = y;
    }
    ctx.stroke(); ctx.restore();
  }
  const dot = (ctx, x, y, r, color) => { ctx.fillStyle = color; ctx.beginPath(); ctx.arc(x, y, r, 0, 2 * Math.PI); ctx.fill(); };
  /** Okuma satırı: başlık (başında renk anahtarı olabilir) ve değer */
  const row = (k, v) => { const m = /^(<i class="lab-key" style="--k:[^"<>]*"><\/i>)([\s\S]*)$/.exec(k); return "<div><span>" + (m ? m[1] + esc(m[2]) : esc(k)) + "</span><b>" + v + "</b></div>"; };

  /* ---------------- Deneyler ---------------- */
  const LABS = {
    /* ---- Eğik ve yatay atış ---- */
    atis: {
      title: () => T("Eğik ve yatay atış", "Projectile motion"), icon: "target",
      desc: () => T("Fırlatma hızını, açıyı, yüksekliği ve yer çekimini değiştir; yörüngeyi, hız bileşenlerini ve menzili izle.", "Change speed, angle, height and gravity; watch the path, velocity components and range."),
      params: () => [
        { id: "v", label: T("Hız v₀", "Speed v₀"), min: 1, max: 40, step: 1, value: 20, unit: "m/s" },
        { id: "a", label: T("Açı θ", "Angle θ"), min: 0, max: 90, step: 1, value: 45, unit: "°" },
        { id: "h", label: T("Yükseklik", "Height"), min: 0, max: 60, step: 1, value: 0, unit: "m" },
        { id: "g", label: T("Yer çekimi g", "Gravity g"), min: 1.6, max: 25, step: 0.1, value: 9.8, unit: "m/s²", hint: T("Ay 1,6 · Dünya 9,8 · Jüpiter 24,8", "Moon 1.6 · Earth 9.8 · Jupiter 24.8") }
      ],
      animated: true, ratio: 0.62,
      draw(ctx, W, H, p, t, c) {
        const vx = p.v * Math.cos(p.a * DEG), vy0 = p.v * Math.sin(p.a * DEG);
        const tf = (vy0 + Math.sqrt(vy0 * vy0 + 2 * p.g * p.h)) / p.g;
        const R = vx * tf, hmax = p.h + (vy0 > 0 ? (vy0 * vy0) / (2 * p.g) : 0);
        const sx = Math.max(R, 10) * 1.1, sy = Math.max(hmax, 5) * 1.18;
        // Eksenler orantılı (gerçek şekil): dar olanı genişlet
        const pw = W - 56, ph = H - 40;
        let X1 = sx, Y1 = sy;
        if (X1 / pw > Y1 / ph) Y1 = (X1 / pw) * ph; else X1 = (Y1 / ph) * pw;
        const F = frame(40, 12, pw, ph, 0, X1, 0, Y1);
        axes(ctx, F, c, { xName: "x (m)", yName: "y (m)" });
        const pos = (tt) => ({ x: vx * tt, y: p.h + vy0 * tt - 0.5 * p.g * tt * tt });
        // Öngörülen yörünge
        ctx.setLineDash([5, 5]); ctx.strokeStyle = c.muted; ctx.lineWidth = 1.5; ctx.beginPath();
        for (let i = 0; i <= 120; i++) { const q = pos((tf * i) / 120); i ? ctx.lineTo(F.X(q.x), F.Y(q.y)) : ctx.moveTo(F.X(q.x), F.Y(q.y)); }
        ctx.stroke(); ctx.setLineDash([]);
        // Kule
        if (p.h > 0) { ctx.fillStyle = c.grid; ctx.fillRect(F.X(0) - 10, F.Y(p.h), 10, F.Y(0) - F.Y(p.h)); }
        const tt = Math.min(t * Math.max(1, tf / 4), tf);       // uzun uçuşlar ~4 sn'de oynar
        // İz
        ctx.strokeStyle = c.accent; ctx.lineWidth = 2.5; ctx.beginPath();
        for (let i = 0; i <= 80; i++) { const q = pos((tt * i) / 80); i ? ctx.lineTo(F.X(q.x), F.Y(q.y)) : ctx.moveTo(F.X(q.x), F.Y(q.y)); }
        ctx.stroke();
        const q = pos(tt), vy = vy0 - p.g * tt, k = 14 / Math.max(1, p.v) * 2.2;
        arrow(ctx, F.X(q.x), F.Y(q.y), F.X(q.x) + vx * k, F.Y(q.y), c.good, 2);
        arrow(ctx, F.X(q.x), F.Y(q.y), F.X(q.x), F.Y(q.y) - vy * k, c.warn, 2);
        arrow(ctx, F.X(q.x), F.Y(q.y), F.X(q.x) + vx * k, F.Y(q.y) - vy * k, c.text, 1.6);
        dot(ctx, F.X(q.x), F.Y(q.y), 7, c.accent);
        // Tepe noktası ve menzil işaretleri
        if (vy0 > 0) { const tp = vy0 / p.g, top = pos(tp); dot(ctx, F.X(top.x), F.Y(top.y), 3.5, c.violet); label(ctx, "hₘₐₓ", F.X(top.x) + 6, F.Y(top.y) - 10, c.violet); }
        label(ctx, "R = " + fmt(R, 1) + " m", F.X(R), F.Y(0) - 12, c.muted, "center", 11);
        return { done: tt >= tf, html:
          row(T("Uçuş süresi", "Flight time"), fmt(tf) + " s") + row(T("Menzil R", "Range R"), fmt(R, 1) + " m") + row(T("En büyük yükseklik", "Max height"), fmt(hmax, 1) + " m") +
          row("t", fmt(tt) + " s") + row('<i class="lab-key" style="--k:' + c.good + '"></i>vₓ', fmt(vx, 1) + " m/s") + row('<i class="lab-key" style="--k:' + c.warn + '"></i>vᵧ', fmt(vy, 1) + " m/s"),
          note: T("Yatay hız hiç değişmez; düşey hız her saniye g kadar azalır. Tümler açılar (30° ve 60° gibi) aynı menzili verir; en uzağa 45° gider (h = 0 iken).",
            "Horizontal speed never changes; vertical speed drops by g each second. Complementary angles give the same range; 45° goes farthest (h = 0).") };
      }
    },

    /* ---- Sabit ivmeli hareket: konum ve hız grafikleri ---- */
    ivmeli: {
      title: () => T("İvmeli hareket ve grafikler", "Accelerated motion graphs"), icon: "chart",
      desc: () => T("İlk hızı ve ivmeyi değiştir; aracın hareketini konum–zaman ve hız–zaman grafikleriyle birlikte izle.", "Change initial speed and acceleration; watch the car with its position–time and velocity–time graphs."),
      params: () => [
        { id: "v", label: T("İlk hız v₀", "Initial speed v₀"), min: -10, max: 20, step: 1, value: 4, unit: "m/s" },
        { id: "a", label: T("İvme a", "Acceleration a"), min: -5, max: 5, step: 0.5, value: 1.5, unit: "m/s²" }
      ],
      animated: true, ratio: 0.9, duration: 8,
      draw(ctx, W, H, p, t, c) {
        const Tm = 8, tt = Math.min(t, Tm);
        const x = (s) => p.v * s + 0.5 * p.a * s * s, v = (s) => p.v + p.a * s;
        let xmin = 0, xmax = 0, vmin = 0, vmax = 0;
        for (let i = 0; i <= 80; i++) { const s = (Tm * i) / 80; xmin = Math.min(xmin, x(s)); xmax = Math.max(xmax, x(s)); vmin = Math.min(vmin, v(s)); vmax = Math.max(vmax, v(s)); }
        const pad = (a, b) => { const d = Math.max(1, b - a) * 0.12; return [a - d, b + d]; };
        // Yol
        const [r0, r1] = pad(xmin, xmax);
        const road = frame(20, 6, W - 40, 30, r0, r1, 0, 1);
        ctx.strokeStyle = c.border; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(road.px, 34); ctx.lineTo(road.px + road.pw, 34); ctx.stroke();
        label(ctx, "0", road.X(0), 44, c.muted, "center", 10);
        ctx.fillStyle = c.grid; ctx.fillRect(road.X(0) - 1, 12, 2, 22);
        const cx = road.X(x(tt));
        ctx.fillStyle = c.accent; ctx.beginPath(); ctx.roundRect ? ctx.roundRect(cx - 16, 16, 32, 15, 5) : ctx.rect(cx - 16, 16, 32, 15); ctx.fill();
        dot(ctx, cx - 9, 32, 3.5, c.text); dot(ctx, cx + 9, 32, 3.5, c.text);
        arrow(ctx, cx, 10, cx + Math.max(-60, Math.min(60, v(tt) * 4)), 10, c.good, 2);
        const gh = (H - 70) / 2 - 10;
        const F1 = frame(42, 60, W - 56, gh, 0, Tm, ...pad(xmin, xmax));
        axes(ctx, F1, c, { xName: "t (s)", yName: "x (m)" });
        plot(ctx, F1, x, c.muted, 1.4, [4, 4]);
        plot(ctx, { ...F1, X: F1.X, Y: F1.Y, x1: tt || 0.0001 }, x, c.accent, 2.6);
        dot(ctx, F1.X(tt), F1.Y(x(tt)), 4.5, c.accent);
        const F2 = frame(42, 60 + gh + 22, W - 56, gh, 0, Tm, ...pad(vmin, vmax));
        axes(ctx, F2, c, { xName: "t (s)", yName: "v (m/s)" });
        // alan = yer değiştirme
        ctx.fillStyle = c.accent + "33"; ctx.beginPath(); ctx.moveTo(F2.X(0), F2.Y(0)); ctx.lineTo(F2.X(0), F2.Y(v(0))); ctx.lineTo(F2.X(tt), F2.Y(v(tt))); ctx.lineTo(F2.X(tt), F2.Y(0)); ctx.closePath(); ctx.fill();
        plot(ctx, F2, v, c.good, 2.4);
        dot(ctx, F2.X(tt), F2.Y(v(tt)), 4.5, c.good);
        return { done: t >= Tm, html: row("t", fmt(tt, 1) + " s") + row(T("Konum x", "Position x"), fmt(x(tt), 1) + " m") + row(T("Hız v", "Velocity v"), fmt(v(tt), 1) + " m/s") +
          row(T("x–t eğimi", "x–t slope"), T("= hız", "= velocity")) + row(T("v–t eğimi", "v–t slope"), fmt(p.a, 1) + " m/s² = a") + row(T("v–t altındaki alan", "Area under v–t"), fmt(x(tt), 1) + " m"),
          note: T("Hız–zaman grafiğinin altındaki boyalı alan, o ana kadarki yer değiştirmeye eşittir. İvme ile hız zıt işaretliyse araç yavaşlar, durur ve geri döner.",
            "The shaded area under v–t equals the displacement. If a and v have opposite signs the car slows, stops and turns back.") };
      }
    },

    /* ---- Basit sarkaç ---- */
    sarkac: {
      title: () => T("Basit sarkaç", "Simple pendulum"), icon: "timer",
      desc: () => T("İp uzunluğunu, yer çekimini ve genliği değiştir; periyodun kütleden ve (küçük açılarda) genlikten bağımsız olduğunu gör.", "Change length, gravity and amplitude; see that the period doesn't depend on mass or (for small angles) amplitude."),
      params: () => [
        { id: "L", label: T("İp uzunluğu L", "Length L"), min: 0.2, max: 3, step: 0.1, value: 1, unit: "m" },
        { id: "g", label: T("Yer çekimi g", "Gravity g"), min: 1.6, max: 25, step: 0.1, value: 9.8, unit: "m/s²" },
        { id: "a", label: T("Genlik θ₀", "Amplitude θ₀"), min: 2, max: 70, step: 1, value: 15, unit: "°" }
      ],
      animated: true, loop: true, ratio: 0.7,
      init(p) { return { th: p.a * DEG, w: 0, t: 0, trail: [], last: null, swings: 0, tCross: [] }; },
      step(s, p, dt) {
        const n = Math.max(1, Math.ceil(dt / 0.002)), h = dt / n;
        for (let i = 0; i < n; i++) {
          const prev = s.th;
          // Yarı örtük Euler (enerji korunumuna yakın)
          s.w += -(p.g / p.L) * Math.sin(s.th) * h; s.th += s.w * h; s.t += h;
          if (prev < 0 && s.th >= 0) { s.tCross.push(s.t); if (s.tCross.length > 3) s.tCross.shift(); }
        }
      },
      draw(ctx, W, H, p, t, c, s) {
        const scale = Math.min((H - 40) / 3.1, (W * 0.55) / 3.2), ox = W * 0.32, oy = 18;
        ctx.strokeStyle = c.border; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(ox - 40, oy); ctx.lineTo(ox + 40, oy); ctx.stroke();
        // Genlik yayı
        ctx.strokeStyle = c.grid; ctx.lineWidth = 1; ctx.setLineDash([4, 4]); ctx.beginPath(); ctx.arc(ox, oy, p.L * scale, Math.PI / 2 - p.a * DEG, Math.PI / 2 + p.a * DEG); ctx.stroke(); ctx.setLineDash([]);
        ctx.beginPath(); ctx.moveTo(ox, oy); ctx.lineTo(ox, oy + p.L * scale + 10); ctx.strokeStyle = c.grid; ctx.stroke();
        const bx = ox + Math.sin(s.th) * p.L * scale, by = oy + Math.cos(s.th) * p.L * scale;
        ctx.strokeStyle = c.text; ctx.lineWidth = 1.6; ctx.beginPath(); ctx.moveTo(ox, oy); ctx.lineTo(bx, by); ctx.stroke();
        dot(ctx, bx, by, 13, c.accent);
        // θ–t grafiği (sağda)
        s.trail.push(s.th); if (s.trail.length > 240) s.trail.shift();
        const gx = W * 0.62, gw = W - gx - 10, gy = 30, gh = H - 70;
        const F = frame(gx, gy, gw, gh, 0, 240, -Math.max(p.a, 5) * DEG * 1.15, Math.max(p.a, 5) * DEG * 1.15);
        axes(ctx, F, c, { labels: false });
        ctx.strokeStyle = c.accent; ctx.lineWidth = 2; ctx.beginPath();
        s.trail.forEach((v, i) => { i ? ctx.lineTo(F.X(i), F.Y(v)) : ctx.moveTo(F.X(i), F.Y(v)); }); ctx.stroke();
        label(ctx, "θ(t)", gx + 4, gy - 10, c.muted);
        const T0 = 2 * Math.PI * Math.sqrt(p.L / p.g);
        const meas = s.tCross.length >= 2 ? s.tCross[s.tCross.length - 1] - s.tCross[s.tCross.length - 2] : NaN;
        return { html: row(T("Periyot (formül) 2π√(L/g)", "Period (formula) 2π√(L/g)"), fmt(T0) + " s") + row(T("Periyot (ölçülen)", "Period (measured)"), fmt(meas) + " s") +
          row(T("Frekans", "Frequency"), fmt(1 / T0) + " Hz") + row("θ", fmt(s.th / DEG, 1) + "°"),
          note: T("Formül küçük açılar için geçerlidir. Genliği 40°'nin üstüne çıkarınca ölçülen periyodun formülden biraz uzun olduğunu göreceksin.",
            "The formula holds for small angles; above ~40° the measured period gets a bit longer than the formula.") };
      }
    },

    /* ---- Yay–kütle (basit harmonik hareket) ---- */
    yay: {
      title: () => T("Yay–kütle: basit harmonik hareket", "Mass on a spring (SHM)"), icon: "refresh",
      desc: () => T("Kütleyi, yay sabitini ve genliği değiştir; konum–zaman grafiğini, hız ve ivmeyi, enerjinin kinetik ↔ potansiyel dönüşümünü izle.", "Change mass, spring constant and amplitude; watch x–t, velocity, acceleration and energy."),
      params: () => [
        { id: "m", label: T("Kütle m", "Mass m"), min: 0.1, max: 5, step: 0.1, value: 1, unit: "kg" },
        { id: "k", label: T("Yay sabiti k", "Spring constant k"), min: 5, max: 200, step: 5, value: 40, unit: "N/m" },
        { id: "A", label: T("Genlik A", "Amplitude A"), min: 0.05, max: 0.3, step: 0.01, value: 0.2, unit: "m" }
      ],
      animated: true, loop: true, ratio: 0.72,
      draw(ctx, W, H, p, t, c) {
        const w = Math.sqrt(p.k / p.m), x = p.A * Math.cos(w * t), v = -p.A * w * Math.sin(w * t), a = -w * w * x;
        const midX = W * 0.55, sc = (W * 0.3) / 0.3, y0 = 54;
        ctx.fillStyle = c.border; ctx.fillRect(14, y0 - 30, 8, 60);
        ctx.strokeStyle = c.grid; ctx.setLineDash([4, 4]); ctx.beginPath(); ctx.moveTo(midX, y0 - 34); ctx.lineTo(midX, y0 + 34); ctx.stroke(); ctx.setLineDash([]);
        label(ctx, T("denge", "eq."), midX, y0 + 42, c.muted, "center", 10);
        const bx = midX + x * sc;
        // Yay (zikzak)
        ctx.strokeStyle = c.text; ctx.lineWidth = 1.6; ctx.beginPath(); ctx.moveTo(22, y0);
        const n = 14, sx = 34, ex = bx - 22;
        ctx.lineTo(sx, y0);
        for (let i = 0; i <= n; i++) ctx.lineTo(sx + ((ex - sx) * i) / n, y0 + (i === 0 || i === n ? 0 : i % 2 ? -10 : 10));
        ctx.lineTo(bx - 22, y0); ctx.stroke();
        ctx.fillStyle = c.accent; ctx.fillRect(bx - 22, y0 - 20, 44, 40);
        label(ctx, fmt(p.m, 1) + " kg", bx, y0, "#fff", "center", 11);
        arrow(ctx, bx, y0 - 28, bx + Math.max(-70, Math.min(70, v * 40)), y0 - 28, c.good, 2);
        arrow(ctx, bx, y0 + 28, bx + Math.max(-70, Math.min(70, a * 6)), y0 + 28, c.warn, 2);
        // x–t grafiği
        const F = frame(42, 110, W - 150, H - 130, 0, 6, -0.32, 0.32);
        axes(ctx, F, c, { xName: "t (s)", yName: "x (m)", labels: true });
        plot(ctx, F, (s) => p.A * Math.cos(w * s), c.muted, 1.3, [4, 4]);
        const tt = t % 6;
        plot(ctx, { ...F, x1: Math.max(tt, 0.001) }, (s) => p.A * Math.cos(w * s), c.accent, 2.4);
        dot(ctx, F.X(tt), F.Y(p.A * Math.cos(w * tt)), 4.5, c.accent);
        // Enerji çubukları
        const E = 0.5 * p.k * p.A * p.A, Ek = 0.5 * p.m * v * v, Ep = 0.5 * p.k * x * x;
        const bxs = W - 92, bh = H - 150, bt = 118;
        [[Ek, c.good, "Eₖ"], [Ep, c.warn, "Eₚ"]].forEach(([val, col, nm], i) => {
          const hh = (val / E) * bh;
          ctx.fillStyle = c.grid; ctx.fillRect(bxs + i * 40, bt, 26, bh);
          ctx.fillStyle = col; ctx.fillRect(bxs + i * 40, bt + bh - hh, 26, hh);
          label(ctx, nm, bxs + i * 40 + 13, bt + bh + 12, c.muted, "center", 11);
        });
        return { html: row(T("Periyot T = 2π√(m/k)", "Period T = 2π√(m/k)"), fmt(2 * Math.PI / w) + " s") + row("ω", fmt(w) + " rad/s") +
          row('<i class="lab-key" style="--k:' + c.good + '"></i>' + T("Hız", "Velocity"), fmt(v) + " m/s") + row('<i class="lab-key" style="--k:' + c.warn + '"></i>' + T("İvme", "Acceleration"), fmt(a) + " m/s²") +
          row(T("Toplam enerji", "Total energy"), fmt(E, 3) + " J"),
          note: T("Dengede hız en büyük, ivme sıfır; uçlarda hız sıfır, ivme en büyük. Periyot genliğe ve yer çekimine bağlı değildir.",
            "At equilibrium speed is max and acceleration zero; at the ends speed is zero and acceleration max. The period doesn't depend on amplitude or gravity.") };
      }
    },

    /* ---- Enine dalga ---- */
    dalga: {
      title: () => T("Dalga: genlik, dalga boyu, frekans", "Waves: amplitude, wavelength, frequency"), icon: "volume",
      desc: () => T("Dalga ilerlerken ortamın noktaları yalnızca aşağı yukarı titreşir. v = λ·f ilişkisini kaydırıcılarla keşfet.", "As the wave travels, each point only moves up and down. Explore v = λ·f."),
      params: () => [
        { id: "A", label: T("Genlik A", "Amplitude A"), min: 0.2, max: 1.5, step: 0.1, value: 1, unit: "cm" },
        { id: "l", label: T("Dalga boyu λ", "Wavelength λ"), min: 0.5, max: 4, step: 0.1, value: 2, unit: "m" },
        { id: "f", label: T("Frekans f", "Frequency f"), min: 0.1, max: 2, step: 0.05, value: 0.5, unit: "Hz" }
      ],
      animated: true, loop: true, ratio: 0.5,
      draw(ctx, W, H, p, t, c) {
        const F = frame(30, 16, W - 44, H - 40, 0, 8, -1.8, 1.8);
        axes(ctx, F, c, { xName: "x (m)", yName: "y (cm)", step: 1, stepY: 0.5 });
        const k = (2 * Math.PI) / p.l, w = 2 * Math.PI * p.f;
        const y = (x) => p.A * Math.sin(k * x - w * t);
        plot(ctx, F, y, c.accent, 2.6);
        // İşaretli nokta (x = 2 m) yalnızca aşağı yukarı hareket eder
        dot(ctx, F.X(2), F.Y(y(2)), 6, c.warn);
        ctx.strokeStyle = c.warn; ctx.setLineDash([3, 3]); ctx.beginPath(); ctx.moveTo(F.X(2), F.Y(p.A)); ctx.lineTo(F.X(2), F.Y(-p.A)); ctx.stroke(); ctx.setLineDash([]);
        // Bir dalga boyu işareti
        const crest = ((Math.PI / 2 + w * t) / k) % p.l;
        const xs = crest + p.l * Math.ceil((1 - crest) / p.l);
        if (xs + p.l < 8) { const yy = F.Y(p.A) - 12; arrow(ctx, F.X(xs), yy, F.X(xs + p.l), yy, c.good, 1.6); arrow(ctx, F.X(xs + p.l), yy, F.X(xs), yy, c.good, 1.6); label(ctx, "λ", F.X(xs + p.l / 2), yy - 9, c.good, "center", 13); }
        return { html: row(T("Hız v = λ·f", "Speed v = λ·f"), fmt(p.l * p.f) + " m/s") + row(T("Periyot T = 1/f", "Period T = 1/f"), fmt(1 / p.f) + " s") + row(T("Dalga boyu", "Wavelength"), fmt(p.l, 1) + " m"),
          note: T("Turuncu nokta yerinden ayrılmaz, yalnızca titreşir: dalga enerjiyi taşır, maddeyi taşımaz. Aynı ortamda hız sabittir; gerçekte frekansı artırınca dalga boyu kısalır.",
            "The orange point never travels, it only oscillates: waves carry energy, not matter. In one medium the speed is fixed, so raising f shortens λ.") };
      }
    },

    /* ---- İki kaynaklı girişim ---- */
    girisim: {
      title: () => T("İki kaynaklı girişim (Young)", "Two-source interference (Young)"), icon: "layers",
      desc: () => T("İki eş fazlı kaynak arasındaki uzaklığı ve dalga boyunu değiştir; aydınlık ve karanlık saçakların nasıl değiştiğini gör.", "Change the source spacing and wavelength; see how bright and dark fringes change."),
      params: () => [
        { id: "d", label: T("Kaynaklar arası d", "Source spacing d"), min: 1, max: 6, step: 0.1, value: 3, unit: "λ₀" },
        { id: "l", label: T("Dalga boyu λ", "Wavelength λ"), min: 0.5, max: 2, step: 0.05, value: 1, unit: "λ₀" }
      ],
      animated: true, loop: true, ratio: 0.62,
      draw(ctx, W, H, p, t, c, s) {
        const gw = Math.round(W * 0.72), cw = 120, ch = Math.round(cw * H / gw);
        if (!s.img || s.img.width !== cw || s.img.height !== ch) { s.cv = document.createElement("canvas"); s.cv.width = cw; s.cv.height = ch; s.img = s.cv.getContext("2d").createImageData(cw, ch); }
        const ws = 14;                      // dünya genişliği (λ₀)
        const sc = ws / cw, k = (2 * Math.PI) / p.l, ph = t * 4;
        const sy1 = ch / 2 * sc - p.d / 2, sy2 = ch / 2 * sc + p.d / 2;
        const D = s.img.data; const acc = hexRgb(c.accent);
        for (let j = 0; j < ch; j++) for (let i = 0; i < cw; i++) {
          const x = i * sc, y = j * sc;
          const r1 = Math.hypot(x, y - sy1), r2 = Math.hypot(x, y - sy2);
          const v = (Math.sin(k * r1 - ph) / Math.sqrt(r1 + .5) + Math.sin(k * r2 - ph) / Math.sqrt(r2 + .5)) * 0.9;
          const q = Math.max(0, Math.min(1, 0.5 + v * 0.5)), o = (j * cw + i) * 4;
          D[o] = acc[0] * q; D[o + 1] = acc[1] * q; D[o + 2] = acc[2] * q; D[o + 3] = 255;
        }
        s.cv.getContext("2d").putImageData(s.img, 0, 0);
        ctx.imageSmoothingEnabled = true; ctx.drawImage(s.cv, 0, 0, gw, H);
        dot(ctx, 3, (sy1 / sc) * (H / ch), 5, "#fff"); dot(ctx, 3, (sy2 / sc) * (H / ch), 5, "#fff");
        // Perde: şiddet  I ∝ cos²(π d sinθ / λ)
        const px = gw + 14; ctx.fillStyle = c.grid; ctx.fillRect(px, 0, 4, H);
        ctx.strokeStyle = c.warn; ctx.lineWidth = 2; ctx.beginPath();
        const L = ws, mid = ch / 2 * sc;
        for (let j = 0; j <= H; j += 2) {
          const y = (j / H) * ch * sc - mid, th = Math.atan2(y, L);
          const I = Math.pow(Math.cos((Math.PI * p.d * Math.sin(th)) / p.l), 2);
          const X = px + 8 + I * (W - px - 16);
          j ? ctx.lineTo(X, j) : ctx.moveTo(X, j);
        }
        ctx.stroke();
        label(ctx, T("perde", "screen"), px + 8, 10, c.muted, "left", 10);
        const n = Math.floor(p.d / p.l);
        return { html: row(T("Saçak aralığı Δx = λL/d", "Fringe spacing Δx = λL/d"), fmt((p.l * L) / p.d, 2) + " λ₀") + row(T("Aydınlık saçak sayısı (her yanda)", "Bright fringes (each side)"), String(n)) + row("d / λ", fmt(p.d / p.l)),
          note: T("Yol farkı dalga boyunun tam katıysa yapıcı (aydınlık), yarım katıysa yıkıcı (karanlık) girişim olur. d büyüdükçe ya da λ küçüldükçe saçaklar sıklaşır.",
            "Whole-number path difference → bright; half-number → dark. Larger d or smaller λ packs the fringes closer.") };
      }
    },

    /* ---- Mercek ---- */
    mercek: {
      title: () => T("Mercek: ışın çizimi", "Lens ray diagram"), icon: "eye",
      desc: () => T("Odak uzaklığını (+ ince kenarlı, − kalın kenarlı) ve cismin yerini değiştir; görüntünün yerini ve özelliklerini gör.", "Change focal length (+ converging, − diverging) and object distance; see the image."),
      params: () => [
        { id: "f", label: T("Odak uzaklığı f", "Focal length f"), min: -20, max: 20, step: 1, value: 10, unit: "cm" },
        { id: "d", label: T("Cismin uzaklığı", "Object distance"), min: 3, max: 45, step: 1, value: 25, unit: "cm" },
        { id: "h", label: T("Cismin boyu", "Object height"), min: 2, max: 8, step: 0.5, value: 5, unit: "cm" }
      ],
      animated: false, ratio: 0.6,
      draw(ctx, W, H, p, t, c) {
        let f = p.f; if (f === 0) f = 1;
        const F = frame(10, 10, W - 20, H - 20, -50, 50, -16, 16);
        const ax = F.Y(0);
        ctx.strokeStyle = c.border; ctx.lineWidth = 1.2; ctx.beginPath(); ctx.moveTo(F.px, ax); ctx.lineTo(F.px + F.pw, ax); ctx.stroke();
        // Mercek
        const lx = F.X(0), top = F.Y(15), bot = F.Y(-15);
        ctx.strokeStyle = c.accent; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(lx, top); ctx.lineTo(lx, bot); ctx.stroke();
        const tip = (y, up) => { const s = f > 0 ? 1 : -1; ctx.beginPath(); ctx.moveTo(lx - 8, y + (up ? 1 : -1) * 8 * s); ctx.lineTo(lx, y); ctx.lineTo(lx + 8, y + (up ? 1 : -1) * 8 * s); ctx.stroke(); };
        tip(top, true); tip(bot, false);
        [-1, 1].forEach((sgn) => { dot(ctx, F.X(sgn * Math.abs(f)), ax, 3.5, c.text); label(ctx, "F", F.X(sgn * Math.abs(f)), ax + 12, c.muted, "center", 11); dot(ctx, F.X(sgn * 2 * Math.abs(f)), ax, 2.5, c.muted); label(ctx, "2F", F.X(sgn * 2 * Math.abs(f)), ax + 12, c.muted, "center", 10); });
        // Cisim
        const ox = -p.d, oh = p.h;
        arrow(ctx, F.X(ox), ax, F.X(ox), F.Y(oh), c.good, 3);
        const di = Math.abs(p.d - f) < 1e-9 ? Infinity : (f * p.d) / (p.d - f);   // 1/f = 1/do + 1/di
        const m = -di / p.d, ih = m * oh;
        // Işınlar: paralel → odaktan; merkezden → doğrudan
        const ext = (x1, y1, x2, y2, toX) => [toX, y1 + ((y2 - y1) / (x2 - x1)) * (toX - x1)];
        ctx.lineWidth = 1.6;
        const ray = (pts, col, dashFrom) => { ctx.strokeStyle = col; ctx.beginPath(); pts.forEach((q, i) => (i ? ctx.lineTo(F.X(q[0]), F.Y(q[1])) : ctx.moveTo(F.X(q[0]), F.Y(q[1])))); ctx.stroke(); };
        // 1) paralel ışın
        const p1 = ext(0, oh, f, 0, 50);
        ray([[ox, oh], [0, oh], p1], c.warn);
        if (di < 0 || f < 0) { ctx.setLineDash([4, 4]); ray([[0, oh], ext(0, oh, f, 0, -50)], c.warn); ctx.setLineDash([]); }
        // 2) merkezden geçen ışın
        ray([[ox, oh], ext(ox, oh, 0, 0, 50)], c.violet);
        if (di < 0) { ctx.setLineDash([4, 4]); ray([[0, 0], ext(ox, oh, 0, 0, -50)], c.violet); ctx.setLineDash([]); }
        if (isFinite(di)) {
          ctx.globalAlpha = di < 0 ? 0.6 : 1;
          if (di < 0) ctx.setLineDash([5, 4]);
          arrow(ctx, F.X(di), ax, F.X(di), F.Y(ih), c.bad, 3);
          ctx.setLineDash([]); ctx.globalAlpha = 1;
        }
        const props = !isFinite(di) ? T("görüntü oluşmaz (ışınlar paralel)", "no image (parallel rays)") :
          [di > 0 ? T("gerçek", "real") : T("sanal", "virtual"), m < 0 ? T("ters", "inverted") : T("düz", "upright"),
            Math.abs(m) > 1.02 ? T("büyük", "larger") : Math.abs(m) < 0.98 ? T("küçük", "smaller") : T("eşit boyda", "same size")].join(", ");
        return { html: row(T("Mercek", "Lens"), f > 0 ? T("ince kenarlı (yakınsak)", "converging") : T("kalın kenarlı (ıraksak)", "diverging")) +
          row(T("Görüntü uzaklığı", "Image distance"), isFinite(di) ? fmt(di, 1) + " cm" : "∞") + row(T("Büyütme m", "Magnification m"), isFinite(m) ? fmt(m) : "∞") + row(T("Görüntü", "Image"), esc(props)),
          note: T("1/f = 1/d꜀ + 1/dᵍ. İnce kenarlı mercekte cisim odak içine girince görüntü sanal, düz ve büyük olur (büyüteç). Kalın kenarlı mercek her zaman sanal, düz ve küçük görüntü verir.",
            "1/f = 1/dₒ + 1/dᵢ. Inside the focal point a converging lens gives a virtual, upright, enlarged image (magnifier). A diverging lens always gives a virtual, upright, smaller image.") };
      }
    },

    /* ---- Fonksiyon grafikleri ---- */
    fonksiyon: {
      title: () => T("Fonksiyon grafikleri ve türev", "Function graphs and derivative"), icon: "chart",
      desc: () => T("Fonksiyon türünü seç, katsayıları değiştir. Teğeti açınca o noktadaki eğim (türev) görünür.", "Pick a function family and change its coefficients. Turn on the tangent to see the slope (derivative)."),
      families: () => ({
        dogrusal: { name: T("Doğrusal  y = mx + n", "Linear  y = mx + n"), ps: [["m", -4, 4, 0.5, 1], ["n", -6, 6, 1, 2]], f: (x, q) => q.m * x + q.n, tex: (q) => "y = " + fmt(q.m, 1) + "x " + sgn(q.n) },
        parabol: { name: T("Parabol  y = ax² + bx + c", "Parabola  y = ax² + bx + c"), ps: [["a", -3, 3, 0.25, 1], ["b", -6, 6, 0.5, -2], ["c", -6, 6, 0.5, -3]], f: (x, q) => q.a * x * x + q.b * x + q.c },
        ustel: { name: T("Üstel  y = aˣ", "Exponential  y = aˣ"), ps: [["a", 0.2, 4, 0.1, 2]], f: (x, q) => Math.pow(q.a, x) },
        log: { name: T("Logaritma  y = logₐx", "Logarithm  y = logₐx"), ps: [["a", 0.2, 5, 0.1, 2]], f: (x, q) => (x > 0 ? Math.log(x) / Math.log(q.a) : NaN) },
        rasyonel: { name: T("Ters orantı  y = k/x", "Inverse  y = k/x"), ps: [["k", -8, 8, 0.5, 4]], f: (x, q) => (Math.abs(x) < 1e-9 ? NaN : q.k / x) },
        donusum: { name: T("Dönüşüm  y = a·f(x − h) + k", "Transform  y = a·f(x − h) + k"), base: true, ps: [["a", -3, 3, 0.25, 1], ["h", -5, 5, 0.5, 0], ["k", -5, 5, 0.5, 0]],
          f: (x, q, b) => q.a * BASE[b](x - q.h) + q.k },
        sin: { name: T("Sinüs  y = a·sin(bx)", "Sine  y = a·sin(bx)"), ps: [["a", -3, 3, 0.25, 1], ["b", 0.25, 4, 0.25, 1]], f: (x, q) => q.a * Math.sin(q.b * x) }
      }),
      animated: false, ratio: 0.75, custom: true
    },

    /* ---- Birim çember ---- */
    cember: {
      title: () => T("Birim çember: sin, cos, tan", "Unit circle: sin, cos, tan"), icon: "circle",
      desc: () => T("Açıyı değiştir; sinüsün düşey, kosinüsün yatay izdüşüm olduğunu ve dalganın çemberden nasıl çıktığını gör.", "Change the angle; see sine as the vertical and cosine as the horizontal projection."),
      params: () => [{ id: "a", label: T("Açı θ", "Angle θ"), min: 0, max: 360, step: 1, value: 30, unit: "°" }],
      animated: true, loop: true, ratio: 0.55, play: false,
      draw(ctx, W, H, p, t, c, s) {
        const ang = s.playing ? (p.a + t * 40) % 360 : p.a; s.cur = ang;
        const r = Math.min(H * 0.38, W * 0.2), cx = r + 24, cy = H / 2;
        ctx.strokeStyle = c.grid; ctx.lineWidth = 1; ctx.beginPath(); ctx.moveTo(cx - r - 14, cy); ctx.lineTo(cx + r + 14, cy); ctx.moveTo(cx, cy - r - 14); ctx.lineTo(cx, cy + r + 14); ctx.stroke();
        ctx.strokeStyle = c.border; ctx.lineWidth = 1.6; ctx.beginPath(); ctx.arc(cx, cy, r, 0, 2 * Math.PI); ctx.stroke();
        const th = ang * DEG, px = cx + r * Math.cos(th), py = cy - r * Math.sin(th);
        ctx.strokeStyle = c.accent; ctx.lineWidth = 1.2; ctx.beginPath(); ctx.arc(cx, cy, r * 0.22, 0, -th, true); ctx.stroke();
        ctx.strokeStyle = c.text; ctx.lineWidth = 1.6; ctx.beginPath(); ctx.moveTo(cx, cy); ctx.lineTo(px, py); ctx.stroke();
        ctx.strokeStyle = c.good; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(cx, cy); ctx.lineTo(px, cy); ctx.stroke();
        ctx.strokeStyle = c.warn; ctx.beginPath(); ctx.moveTo(px, cy); ctx.lineTo(px, py); ctx.stroke();
        // tan: x = 1 doğrusu
        const tn = Math.tan(th);
        if (Math.abs(tn) < 3.5) { ctx.strokeStyle = c.violet; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(cx + r, cy); ctx.lineTo(cx + r, cy - r * tn); ctx.stroke(); ctx.setLineDash([3, 3]); ctx.beginPath(); ctx.moveTo(cx, cy); ctx.lineTo(cx + r, cy - r * tn); ctx.stroke(); ctx.setLineDash([]); }
        dot(ctx, px, py, 5.5, c.accent);
        // Dalga
        const gx = cx + r + 34, gw = W - gx - 8;
        const F = frame(gx, cy - r, gw, 2 * r, 0, 360, -1, 1);
        axes(ctx, F, c, { labels: false });
        plot(ctx, F, (x) => Math.sin(x * DEG), c.warn, 2);
        plot(ctx, F, (x) => Math.cos(x * DEG), c.good, 1.6, [5, 4]);
        ctx.strokeStyle = c.grid; ctx.setLineDash([3, 3]); ctx.beginPath(); ctx.moveTo(px, py); ctx.lineTo(F.X(ang), py); ctx.stroke(); ctx.setLineDash([]);
        dot(ctx, F.X(ang), F.Y(Math.sin(th)), 5, c.warn); dot(ctx, F.X(ang), F.Y(Math.cos(th)), 4, c.good);
        [90, 180, 270, 360].forEach((a) => label(ctx, a + "°", F.X(a), cy + r + 12, c.muted, "center", 10));
        const quad = ang % 360 < 90 ? "I" : ang < 180 ? "II" : ang < 270 ? "III" : "IV";
        return { html: row(T("Açı", "Angle"), fmt(ang, 0) + "° = " + fmt(th, 3) + " rad") + row('<i class="lab-key" style="--k:' + c.warn + '"></i>sin θ', fmt(Math.sin(th), 3)) + row('<i class="lab-key" style="--k:' + c.good + '"></i>cos θ', fmt(Math.cos(th), 3)) +
          row('<i class="lab-key" style="--k:' + c.violet + '"></i>tan θ', Math.abs(Math.cos(th)) < 1e-6 ? T("tanımsız", "undefined") : fmt(tn, 3)) + row(T("Bölge", "Quadrant"), quad),
          note: T("sin²θ + cos²θ = 1 her açı için geçerlidir (Pisagor). Bölgelere göre işaretler: I. hepsi +, II. yalnız sin +, III. yalnız tan +, IV. yalnız cos +.",
            "sin²θ + cos²θ = 1 for every angle. Signs: I all +, II sin +, III tan +, IV cos +.") };
      }
    }
  };
  const BASE = { "x²": (x) => x * x, "√x": (x) => (x >= 0 ? Math.sqrt(x) : NaN), "|x|": (x) => Math.abs(x), "1/x": (x) => (Math.abs(x) < 1e-9 ? NaN : 1 / x), "2ˣ": (x) => Math.pow(2, x), "sin x": (x) => Math.sin(x) };
  const sgn = (n) => (n >= 0 ? "+ " : "− ") + fmt(Math.abs(n), 1);
  function hexRgb(h) {
    const m = /^#?([0-9a-f]{6})$/i.exec(h) || /^#?([0-9a-f]{3})$/i.exec(h);
    if (!m) { const r = /rgba?\((\d+)[, ]+(\d+)[, ]+(\d+)/.exec(h); return r ? [Number(r[1]), Number(r[2]), Number(r[3])] : [79, 124, 255]; }
    let s = m[1]; if (s.length === 3) s = s.split("").map((x) => x + x).join("");
    return [parseInt(s.slice(0, 2), 16), parseInt(s.slice(2, 4), 16), parseInt(s.slice(4, 6), 16)];
  }

  /* ---------------- Fonksiyon deneyi (özel) ---------------- */
  function drawFunc(ctx, W, H, st, c) {
    const fams = LABS.fonksiyon.families(), fam = fams[st.fam];
    const q = st.q, f = (x) => fam.f(x, q, st.base);
    const F = frame(30, 10, W - 40, H - 30, -10, 10, -10 * (H - 30) / (W - 40), 10 * (H - 30) / (W - 40));
    const stp = W < 520 ? 2 : 1;
    axes(ctx, F, c, { step: stp, stepY: stp, xName: "x", yName: "y" });
    // asimptotlar
    ctx.setLineDash([5, 5]); ctx.strokeStyle = c.muted; ctx.lineWidth = 1.2;
    const hl = (y) => { ctx.beginPath(); ctx.moveTo(F.px, F.Y(y)); ctx.lineTo(F.px + F.pw, F.Y(y)); ctx.stroke(); };
    const vl = (x) => { ctx.beginPath(); ctx.moveTo(F.X(x), F.py); ctx.lineTo(F.X(x), F.py + F.ph); ctx.stroke(); };
    if (st.fam === "ustel") hl(0);
    if (st.fam === "log") vl(0);
    if (st.fam === "rasyonel") { hl(0); vl(0); }
    if (st.fam === "donusum" && st.base === "1/x") { hl(q.k); vl(q.h); }
    if (st.fam === "donusum" && st.base === "2ˣ") hl(q.k);
    ctx.setLineDash([]);
    if (st.fam === "donusum") plot(ctx, F, BASE[st.base], c.muted, 1.4, [3, 4]);
    plot(ctx, F, f, c.accent, 2.6);
    const html = [];
    // Özel noktalar
    if (st.fam === "parabol" && q.a !== 0) {
      const r = -q.b / (2 * q.a), k = f(r); dot(ctx, F.X(r), F.Y(k), 5, c.violet); label(ctx, T("tepe", "vertex"), F.X(r) + 7, F.Y(k) + (q.a > 0 ? 12 : -12), c.violet);
      ctx.setLineDash([3, 4]); ctx.strokeStyle = c.violet; vl(r); ctx.setLineDash([]);
      const D = q.b * q.b - 4 * q.a * q.c;
      html.push(row(T("Tepe noktası", "Vertex"), "(" + fmt(r) + ", " + fmt(k) + ")"), row("Δ = b² − 4ac", fmt(D)));
      if (D >= 0) { const x1 = (-q.b - Math.sqrt(D)) / (2 * q.a), x2 = (-q.b + Math.sqrt(D)) / (2 * q.a); [x1, x2].forEach((x) => dot(ctx, F.X(x), F.Y(0), 4.5, c.good)); html.push(row(T("Kökler", "Roots"), D === 0 ? fmt(x1) : fmt(Math.min(x1, x2)) + " ; " + fmt(Math.max(x1, x2)))); }
      else html.push(row(T("Kökler", "Roots"), T("gerçek kök yok", "no real roots")));
      html.push(row(T("Kollar", "Opens"), q.a > 0 ? T("yukarı (en küçük değer)", "up (minimum)") : T("aşağı (en büyük değer)", "down (maximum)")));
    }
    if (st.fam === "dogrusal") { html.push(row(T("Eğim m", "Slope m"), fmt(q.m)), row(T("y'yi kestiği nokta", "y-intercept"), "(0, " + fmt(q.n) + ")")); if (q.m !== 0) html.push(row(T("x'i kestiği nokta", "x-intercept"), "(" + fmt(-q.n / q.m) + ", 0)")); dot(ctx, F.X(0), F.Y(q.n), 4.5, c.violet); }
    if (st.fam === "ustel") { dot(ctx, F.X(0), F.Y(1), 4.5, c.violet); html.push(row(T("Sabit nokta", "Fixed point"), "(0, 1)"), row(T("Davranış", "Behaviour"), q.a > 1 ? T("artan", "increasing") : q.a < 1 ? T("azalan", "decreasing") : T("sabit (a = 1 üstel değil)", "constant"))); }
    if (st.fam === "log") { dot(ctx, F.X(1), F.Y(0), 4.5, c.violet); html.push(row(T("Sabit nokta", "Fixed point"), "(1, 0)"), row(T("Tanım kümesi", "Domain"), "x > 0"), row(T("Davranış", "Behaviour"), q.a > 1 ? T("artan", "increasing") : T("azalan", "decreasing"))); }
    if (st.fam === "rasyonel") html.push(row(T("Asimptotlar", "Asymptotes"), "x = 0, y = 0"), row(T("Kollar", "Branches"), q.k > 0 ? T("I. ve III. bölge", "quadrants I & III") : T("II. ve IV. bölge", "quadrants II & IV")));
    if (st.fam === "donusum") html.push(row(T("Öteleme", "Shift"), T("sağa " + fmt(q.h) + ", yukarı " + fmt(q.k), "right " + fmt(q.h) + ", up " + fmt(q.k))), row(T("Dikey ölçek / yansıma", "Vertical scale / reflection"), fmt(q.a) + (q.a < 0 ? T(" (x eksenine göre yansıma)", " (reflected)") : "")));
    if (st.fam === "sin") html.push(row(T("Genlik", "Amplitude"), fmt(Math.abs(q.a))), row(T("Periyot 2π/b", "Period 2π/b"), fmt((2 * Math.PI) / q.b)));
    // Teğet ve türev
    if (st.tan) {
      const x0 = st.x0, y0 = f(x0), hh = 1e-4, d = (f(x0 + hh) - f(x0 - hh)) / (2 * hh);
      if (isFinite(y0) && isFinite(d)) {
        plot(ctx, F, (x) => y0 + d * (x - x0), c.warn, 1.8);
        dot(ctx, F.X(x0), F.Y(y0), 5.5, c.warn);
        html.push(row('<i class="lab-key" style="--k:' + c.warn + '"></i>' + T("Teğetin eğimi f′(" + fmt(x0, 1) + ")", "Tangent slope f′(" + fmt(x0, 1) + ")"), fmt(d, 3)));
        html.push(row(T("Fonksiyon burada", "Here f is"), Math.abs(d) < 1e-3 ? T("ekstremum adayı (f′ = 0)", "critical point (f′ = 0)") : d > 0 ? T("artan", "increasing") : T("azalan", "decreasing")));
      } else html.push(row(T("Teğet", "Tangent"), T("bu noktada tanımsız", "undefined here")));
    }
    return { html: html.join(""), note: "" };
  }

  /* ---------------- Montaj ---------------- */
  /**
   * Bir deneyi kutuya yerleştirir. opts: { fam, base, preset: {param: değer}, compact }
   * Dönen: { destroy }
   */
  function mount(host, id, opts) {
    opts = opts || {};
    const lab = LABS[id];
    if (!lab) return null;
    const st = { t: 0, playing: !!lab.animated && lab.play !== false && !lab.custom, last: null, raf: 0, vis: true, s: {} };
    let params = [];
    if (lab.custom) {
      const fams = lab.families();
      st.fam = opts.fam && fams[opts.fam] ? opts.fam : "parabol";
      st.base = opts.base || "x²"; st.tan = !!opts.tan; st.x0 = 1;
    } else {
      params = lab.params();
      params.forEach((p) => { if (opts.preset && opts.preset[p.id] != null) p.value = opts.preset[p.id]; });
    }
    const p = {};
    const can3d = !!(App.lab3d && App.lab3d.has(id) && App.lab3d.supported());
    let mode = can3d ? App.lab3d.mode() : "2d", S3 = null, s3busy = false;
    host.classList.add("lab");
    host.innerHTML =
      '<div class="lab__stage">' + (can3d ? '<div class="lab__mode" role="radiogroup" aria-label="' + esc(T("Görünüm", "View")) + '"><button type="button" role="radio" data-mode="2d">2B</button><button type="button" role="radio" data-mode="3d">3B</button>' + (App.lab3d.arSupported() ? '<button type="button" class="lab__ar" data-ar-start title="' + esc(T("Artırılmış gerçeklik: deneyi kameranın görüntüsünde masanın üstünde gör", "Augmented reality: see the lab on your desk through the camera")) + '">AR</button>' : "") + '<button type="button" class="lab__ar lab__holo" data-holo-start title="' + esc(T("Hologram: ekran bir pencereye dönüşür, başını oynattıkça deney ekranın içinde derinlikte durur", "Hologram: the screen becomes a window into the lab")) + '">' + esc(T("Holo", "Holo")) + "</button>" + "</div>" : "") +
        '<canvas class="lab__cv" role="img" aria-label="' + esc(lab.title()) + '"></canvas>' +
        (lab.animated && !lab.custom ? '<div class="lab__play"><button class="btn btn--sm btn--primary" type="button" data-lab="play"></button>' +
          '<button class="btn btn--sm btn--ghost" type="button" data-lab="reset">' + App.icon("refresh") + esc(T("Baştan", "Reset")) + "</button></div>" : "") +
      "</div>" +
      '<div class="lab__side"><div class="lab__ctrls"></div><div class="lab__read"></div><p class="hint lab__note"></p></div>';
    const cv = host.querySelector("canvas"), ctrls = host.querySelector(".lab__ctrls"), read = host.querySelector(".lab__read"), note = host.querySelector(".lab__note");

    function slider(pid, labTxt, min, max, step, value, unit, hint) {
      p[pid] = value;
      return '<label class="lab-ctl"><span class="lab-ctl__top"><span>' + esc(labTxt) + '</span><output data-out="' + pid + '">' + fmt(value, 2) + (unit ? (unit === "°" ? "" : " ") + esc(unit) : "") + "</output></span>" +
        '<input type="range" min="' + min + '" max="' + max + '" step="' + step + '" value="' + value + '" data-p="' + pid + '" data-unit="' + esc(unit || "") + '">' +
        (hint ? '<span class="hint">' + esc(hint) + "</span>" : "") + "</label>";
    }
    function buildCtrls() {
      if (lab.custom) {
        const fams = lab.families(), fam = fams[st.fam];
        Object.keys(p).forEach((k) => delete p[k]);
        ctrls.innerHTML = '<label class="field"><span class="field__label">' + esc(T("Fonksiyon", "Function")) + '</span><select class="select" data-fam>' +
          Object.entries(fams).map(([k, v]) => '<option value="' + k + '"' + (k === st.fam ? " selected" : "") + ">" + esc(v.name) + "</option>").join("") + "</select></label>" +
          (fam.base ? '<div class="lab-chips" role="radiogroup">' + Object.keys(BASE).map((b) => '<button type="button" class="chip' + (b === st.base ? " is-on" : "") + '" data-base="' + esc(b) + '">f(x) = ' + esc(b) + "</button>").join("") + "</div>" : "") +
          fam.ps.map(([pid, mn, mx, sp, v]) => slider(pid, pid, mn, mx, sp, opts.preset && opts.preset[pid] != null && opts.fam === st.fam ? opts.preset[pid] : v, "")).join("") +
          '<label class="check-row"><input type="checkbox" data-tan' + (st.tan ? " checked" : "") + "> " + esc(T("Teğet ve türevi göster", "Show tangent and derivative")) + "</label>" +
          (st.tan ? slider("x0", T("Teğet noktası x₀", "Tangent point x₀"), -8, 8, 0.1, st.x0, "") : "");
        st.q = p;
      } else ctrls.innerHTML = params.map((q) => {
        const v = p[q.id] != null ? p[q.id] : q.value;
        if (q.type === "select") {
          p[q.id] = v;
          return '<label class="lab-ctl"><span class="lab-ctl__top"><span>' + esc(q.label) + '</span></span><select class="select" data-ps="' + q.id + '">' +
            q.options.map(([ov, ol]) => '<option value="' + esc(ov) + '"' + (String(ov) === String(v) ? " selected" : "") + ">" + esc(ol) + "</option>").join("") + "</select>" +
            (q.hint ? '<span class="hint">' + esc(q.hint) + "</span>" : "") + "</label>";
        }
        if (q.type === "toggle") { p[q.id] = !!v; return '<label class="check-row lab-ctl--check"><input type="checkbox" data-pt="' + q.id + '"' + (v ? " checked" : "") + "> " + esc(q.label) + "</label>"; }
        return slider(q.id, q.label, q.min, q.max, q.step, v, q.unit, q.hint);
      }).join("");
      App.hydrateIcons(host);
    }
    buildCtrls();
    ctrls.addEventListener("input", (e) => {
      const r = e.target.closest("[data-p]"); if (!r) return;
      const v = Number(r.value); p[r.dataset.p] = v;
      if (r.dataset.p === "x0") st.x0 = v;
      ctrls.querySelector('[data-out="' + r.dataset.p + '"]').textContent = fmt(v, 2) + (r.dataset.unit ? (r.dataset.unit === "°" ? "" : " ") + r.dataset.unit : "");
      changed();
    });
    function changed() {
      if (lab.init && !lab.keep) { const pl = st.s.playing; st.s = lab.init(p); st.s.playing = pl; }
      if (lab.adapt) lab.adapt(st.s, p);
      if (!lab.loop && lab.animated) st.t = 0;                  // atış vb.: değişince baştan
      draw();
    }
    ctrls.addEventListener("change", (e) => {
      if (e.target.matches("[data-ps]")) { const raw = e.target.value; p[e.target.dataset.ps] = raw !== "" && !isNaN(raw) ? Number(raw) : raw; changed(); }
      if (e.target.matches("[data-pt]")) { p[e.target.dataset.pt] = e.target.checked; changed(); }
      if (e.target.matches("[data-fam]")) { st.fam = e.target.value; buildCtrls(); draw(); }
      if (e.target.matches("[data-tan]")) { st.tan = e.target.checked; buildCtrls(); draw(); }
    });
    ctrls.addEventListener("click", (e) => { const b = e.target.closest("[data-base]"); if (b) { st.base = b.dataset.base; buildCtrls(); draw(); } });
    const playBtn = host.querySelector('[data-lab="play"]');
    const paintPlay = () => { if (playBtn) playBtn.innerHTML = App.icon(st.playing ? "pause" : "play") + esc(st.playing ? T("Durdur", "Pause") : id === "atis" ? T("Fırlat", "Launch") : T("Oynat", "Play")); };
    if (playBtn) playBtn.addEventListener("click", () => { if (!st.playing && st.done) { st.t = 0; if (lab.init) st.s = lab.init(p); } st.playing = !st.playing; st.s.playing = st.playing; st.last = null; paintPlay(); loop(); });
    const rs = host.querySelector('[data-lab="reset"]');
    if (rs) rs.addEventListener("click", () => { st.t = 0; if (lab.init) st.s = lab.init(p); draw(); });
    if (lab.init) st.s = lab.init(p);
    st.s.playing = st.playing;
    paintPlay();

    function size() {
      const w = Math.max(240, Math.round(cv.parentElement.clientWidth));
      const h = Math.round(Math.min(w * (lab.ratio || 0.6), window.innerHeight * 0.62));
      // 3B görünümde 2B tuval gizlidir: hesap için çizilir ama 1×1 piksele (neredeyse bedava)
      const dpr = mode === "3d" && S3 ? 1 / Math.max(w, h) : Math.min(2, window.devicePixelRatio || 1);
      cv.width = Math.max(1, Math.round(w * dpr)); cv.height = Math.max(1, Math.round(h * dpr)); cv.style.height = h + "px";
      cv.getContext("2d").setTransform(dpr, 0, 0, dpr, 0, 0);
      st.W = w; st.H = h;
    }
    function draw() {
      if (!host.isConnected) return destroy();
      const ctx = cv.getContext("2d"), c = colors();
      ctx.clearRect(0, 0, st.W, st.H);
      const out = lab.custom ? drawFunc(ctx, st.W, st.H, st, c) : lab.draw(ctx, st.W, st.H, p, st.t, c, st.s);
      // ölçüm tablosu: yalnızca değiştiyse ve oynarken saniyede en çok ~12 kez yazılır (her karede DOM yazmak takılmaya yol açıyordu)
      const nowR = performance.now();
      if (out.html !== st.lastHtml && (!st.playing || out.done || nowR - (st.readAt || 0) > 80)) { read.innerHTML = out.html; st.lastHtml = out.html; st.readAt = nowR; }
      if (note.textContent !== (out.note || "")) note.textContent = out.note || "";
      if (out.done && st.playing) { st.playing = false; st.done = true; paintPlay(); } else if (!out.done) st.done = false;
      if (mode === "3d" && S3) S3.frame(p, st.t, lab.custom ? st : st.s);
    }
    /* 2B / 3B seçimi (öğrencinin tercihi hatırlanır) */
    const modeBox = host.querySelector(".lab__mode");
    function paintMode() { if (st.W) size(); if (!modeBox) return; modeBox.querySelectorAll("[data-mode]").forEach((b) => b.setAttribute("aria-checked", String(b.dataset.mode === mode))); host.classList.toggle("is-3d", mode === "3d"); }
    async function setMode(m, remember) {
      mode = m; if (remember) App.lab3d.setMode(m); paintMode();
      if (m === "2d" && S3 && S3.handOn && S3.handOn()) S3.handStop();      // 2B'de el kontrolü (ve kamera) kapanır
      if (m === "3d" && !S3 && !s3busy) {
        s3busy = true; host.classList.add("is-loading3d");
        try { await App.lab3d.load(); if (host.isConnected && mode === "3d") { S3 = App.lab3d.mount(host.querySelector(".lab__stage"), id, lab.ratio); host.querySelector(".lab__stage").insertBefore(S3.el, cv); if (S3.bindLab) S3.bindLab({ ctrls, play: host.querySelector(".lab__play") }); size(); } }
        catch (e) { mode = "2d"; paintMode(); App.ui.toast(T("3B görünüm açılamadı; 2B gösteriliyor.", "3D view unavailable; showing 2D.")); }
        s3busy = false; host.classList.remove("is-loading3d");
      }
      draw();
    }
    if (modeBox) modeBox.addEventListener("click", async (e) => {
      if (e.target.closest("[data-holo-start]")) {
        // Hologram: önce 3B'ye geç, sonra göz izlemeyi başlat
        if (mode !== "3d") await setMode("3d", false);
        if (!S3) return;
        try { await S3.holoStart({ side: host.querySelector(".lab__side"), play: host.querySelector(".lab__play") }); draw(); }
        catch (err) { App.ui.toast((err && err.message) || T("Hologram açılamadı.", "Could not start the hologram."), "error"); }
        return;
      }
      if (e.target.closest("[data-ar-start]")) {
        // AR: önce 3B'ye geç, sonra kamerayı aç
        if (mode !== "3d") await setMode("3d", false);
        if (!S3) return;
        try { await S3.arStart({ side: host.querySelector(".lab__side"), play: host.querySelector(".lab__play") }); draw(); }
        catch (err) { App.ui.toast((err && err.message) || T("AR açılamadı.", "Could not start AR."), "error"); }
        return;
      }
      const b = e.target.closest("[data-mode]"); if (b && b.dataset.mode !== mode) setMode(b.dataset.mode, true);
    });
    function loop() {
      cancelAnimationFrame(st.raf);
      if (!st.playing || !st.vis) return;
      st.raf = requestAnimationFrame((ts) => {
        if (!host.isConnected) return destroy();
        const dt = st.last == null ? 0 : Math.min(0.05, (ts - st.last) / 1000);
        st.last = ts; st.t += dt;
        if (lab.step) lab.step(st.s, p, dt);
        draw(); loop();
      });
    }
    const ro = new ResizeObserver(() => { size(); draw(); });
    ro.observe(cv.parentElement);
    const io = "IntersectionObserver" in window ? new IntersectionObserver((en) => { st.vis = en[en.length - 1].isIntersecting; st.last = null; loop(); }) : null;
    if (io) io.observe(host);
    function destroy() { cancelAnimationFrame(st.raf); ro.disconnect(); if (io) io.disconnect(); if (S3) { S3.dispose(); S3 = null; } }
    size(); draw(); loop();
    paintMode(); if (mode === "3d") setMode("3d", false);
    return { destroy };
  }

  /* ---------------- Konu sayfalarıyla bağlantı ---------------- */
  const LINKS = {};
  /** Bir kazanıma deney bağla: link("10/fizik/u4/k1", "sarkac", { preset }) */
  function link(key, id, o) { (LINKS[key] = LINKS[key] || []).push([id, o || {}]); }
  [
    ["10/fizik/u1/k1", "ivmeli", { preset: { a: 0, v: 5 } }], ["10/fizik/u1/k4", "ivmeli"], ["10/fizik/u1/k3", "ivmeli"],
    ["11/fizik/u1/k1", "atis", { preset: { a: 90, v: 20 } }], ["11/fizik/u1/k1", "ivmeli", { preset: { v: 20, a: -5 } }], ["11/fizik/u1/k2", "atis"],
    ["10/fizik/u4/k1", "sarkac"], ["12/fizik/u2/k1", "yay"], ["12/fizik/u2/k1", "sarkac"],
    ["10/fizik/u4/k2", "dalga"], ["10/fizik/u4/k3", "dalga"], ["10/fizik/u4/k4", "dalga"],
    ["11/fizik/u4/k1", "dalga"], ["11/fizik/u4/k1", "girisim"], ["12/fizik/u3/k1", "girisim"], ["11/fizik/u4/k2", "mercek"],
    ["9/matematik/t2/k2", "fonksiyon", { fam: "donusum", base: "|x|" }], ["10/matematik/t1/k1", "cember"],
    ["10/matematik/t4/k1", "fonksiyon", { fam: "parabol" }], ["10/matematik/t4/k2", "fonksiyon", { fam: "donusum", base: "√x" }],
    ["11/matematik/u1/k1", "fonksiyon", { fam: "dogrusal" }], ["11/matematik/u1/k2", "fonksiyon", { fam: "rasyonel" }],
    ["11/matematik/u5/k1", "fonksiyon", { fam: "parabol" }], ["12/matematik/u1/k1", "fonksiyon", { fam: "ustel" }],
    ["12/matematik/u1/k2", "fonksiyon", { fam: "log" }], ["12/matematik/u3/k1", "cember"], ["12/matematik/u3/k2", "cember"],
    ["12/matematik/u4/k1", "fonksiyon", { fam: "donusum", base: "x²" }], ["12/matematik/u5/k2", "fonksiyon", { fam: "parabol", tan: true }],
    ["12/matematik/u5/k3", "fonksiyon", { fam: "parabol", tan: true }]
  ].forEach(([k, id, o]) => link(k, id, o));
  const SUBJ = { atis: "fizik", ivmeli: "fizik", sarkac: "fizik", yay: "fizik", dalga: "fizik", girisim: "fizik", mercek: "fizik", fonksiyon: "matematik", cember: "matematik" };
  Object.keys(SUBJ).forEach((k) => { LABS[k].subject = SUBJ[k]; });

  /** Yeni deney ekle (labs-fizik.js, labs-kimya.js, labs-biyoloji.js): add("gaz", def, [kazanım anahtarları]) */
  function add(id, def, keys) {
    LABS[id] = def;
    (keys || []).forEach((k) => (Array.isArray(k) ? link(k[0], id, k[1]) : link(k, id)));
  }

  /** Deneyin bağlı olduğu kazanımlar: [{ key, grade, unit, f }] (müfredat sırasıyla) */
  function keysOf(id) {
    return Object.keys(LINKS).filter((k) => LINKS[k].some(([x]) => x === id)).map((k) => ({ key: k, f: App.lessons.find(k) })).filter((x) => x.f)
      .sort((a, b) => Number(a.f.grade.id) - Number(b.f.grade.id) || a.key.localeCompare(b.key, "en", { numeric: true }));
  }
  function meta(id) {
    const ks = keysOf(id), lab = LABS[id];
    return { id, lab, keys: ks, subject: lab.subject || (ks[0] ? ks[0].f.subject.id : "fizik"), grades: Array.from(new Set(ks.map((x) => x.f.grade.id))) };
  }

  /** Konu sayfasına eklenecek bölüm (yoksa boş) */
  function sectionHtml(key) {
    const list = LINKS[key];
    if (!list) return "";
    return list.map(([id], i) => '<section class="card lesson__section lab-card"><h2>' + App.icon("sparkle") + esc(T("Etkileşimli deney: ", "Interactive lab: ") + LABS[id].title()) + "</h2>" +
      '<p class="hint">' + esc(LABS[id].desc()) + ' <a href="#/lab/' + id + '">' + esc(T("Laboratuvarda aç", "Open in lab")) + "</a></p>" +
      '<div data-lab-mount="' + i + '"></div></section>').join("");
  }
  function mountIn(view, key) {
    const list = LINKS[key];
    if (!list) return;
    list.forEach(([id, o], i) => { const el = view.querySelector('[data-lab-mount="' + i + '"]'); if (el) mount(el, id, o || {}); });
  }

  /* ---------------- Laboratuvar: kütüphane ---------------- */
  const SUBJECTS = ["fizik", "kimya", "biyoloji", "matematik"];
  const subjName = (sid) => { const g = App.data.curriculum.grades.find((x) => x.subjects.some((s) => s.id === sid)); const s = g && g.subjects.find((x) => x.id === sid); return s ? App.L(s.name) : sid; };
  const subjIcon = (sid) => { const g = App.data.curriculum.grades.find((x) => x.subjects.some((s) => s.id === sid)); const s = g && g.subjects.find((x) => x.id === sid); return (s && s.icon) || "lightbulb"; };
  const favs = () => new Set(App.prefs.get("labFavs", []));
  const recent = () => App.prefs.get("labRecent", []);

  function cardHtml(m, F) {
    const isFav = F.has(m.id);
    return '<div class="lab-tile subj-' + m.subject + '"><a class="lab-tile__link" href="#/lab/' + m.id + '">' +
      '<span class="subj-ico">' + App.icon(m.lab.icon || subjIcon(m.subject)) + "</span>" +
      '<span class="lab-tile__body">' + (m.unitTxt ? '<span class="lab-tile__unit">' + esc(m.unitTxt) + "</span>" : "") + '<span class="lab-tile__title">' + esc(m.lab.title()) + "</span>" +
      '<span class="lab-tile__desc">' + esc(m.lab.desc()) + "</span>" +
      '<span class="lab-tile__tags">' + m.grades.map((g) => "<span>" + esc(App.data.curriculum.gradeName(g)) + "</span>").join("") + "</span></span></a>" +
      '<button class="lab-fav' + (isFav ? " is-on" : "") + '" type="button" data-fav="' + m.id + '" aria-pressed="' + isFav + '" title="' + esc(T("Favorilere ekle", "Add to favourites")) + '" aria-label="' + esc(T("Favori", "Favourite")) + '">' + App.icon("bookmark") + "</button></div>";
  }

  function renderLibrary(view) {
    App.setTitle(T("Deney Laboratuvarı", "Lab"));
    const st = Object.assign({ subj: "all", grade: "all", q: "", fav: false }, App.prefs.get("labFilter", {}));
    const all = Object.keys(LABS).map(meta);
    view.innerHTML = '<div class="page lab-lib">' +
      '<div class="page-head"><div><h1>' + esc(T("Deney Laboratuvarı", "Interactive Lab")) + "</h1><p>" +
        esc(T(all.length + " etkileşimli deney: değeri değiştir, sonucu anında gör. Dersine ve sınıfına göre süz; her deney ilgili konu sayfasında da var.",
          all.length + " interactive labs. Filter by subject and grade; each lab also appears on its lesson pages.")) + "</p></div></div>" +
      '<div class="lab-filters">' +
        '<label class="lab-search">' + App.icon("search") + '<input type="search" id="labQ" placeholder="' + esc(T("Deney ara: sarkaç, pH, enzim…", "Search labs: pendulum, pH, enzyme…")) + '" value="' + esc(st.q) + '"></label>' +
        '<div class="lab-chips" role="group" aria-label="' + esc(T("Ders", "Subject")) + '">' + ["all"].concat(SUBJECTS).map((sid) =>
          '<button type="button" class="chip' + (sid !== "all" ? " subj-" + sid : "") + (st.subj === sid ? " is-on" : "") + '" data-f-subj="' + sid + '">' + (sid === "all" ? esc(T("Tümü", "All")) : App.icon(subjIcon(sid)) + esc(subjName(sid))) +
          ' <small>' + (sid === "all" ? all.length : all.filter((m) => m.subject === sid).length) + "</small></button>").join("") + "</div>" +
        '<div class="lab-chips" role="group" aria-label="' + esc(T("Sınıf", "Grade")) + '">' + ["all", "9", "10", "11", "12"].map((g) =>
          '<button type="button" class="chip' + (st.grade === g ? " is-on" : "") + '" data-f-grade="' + g + '">' + esc(g === "all" ? T("Her sınıf", "All grades") : App.data.curriculum.gradeName(g)) + "</button>").join("") +
          '<button type="button" class="chip' + (st.fav ? " is-on" : "") + '" data-f-fav>' + App.icon("bookmark") + esc(T("Favoriler", "Favourites")) + "</button></div>" +
      "</div>" +
      '<div id="labList"></div>' +
      (App.lab3d && App.lab3d.supported() ? '<section class="card lab-view-set"><div class="card__title">' + App.icon("eye") + esc(T("Görünüm", "View")) + "</div>" +
        '<div class="lab-view-set__row"><label class="field"><span class="field__label">' + esc(T("Deneyler şöyle açılsın", "Open labs in")) + '</span><select class="select" id="labDefMode"><option value="2d"' + (App.lab3d.mode() === "2d" ? " selected" : "") + ">" + esc(T("2B (çizim ve grafik)", "2D (drawing and graphs)")) + '</option><option value="3d"' + (App.lab3d.mode() === "3d" ? " selected" : "") + ">" + esc(T("3B (gerçekçi sahne)", "3D (realistic scene)")) + "</option></select></label>" +
        '<label class="field"><span class="field__label">' + esc(T("3B kalitesi", "3D quality")) + '</span><select class="select" id="lab3dQ">' + [["auto", T("Otomatik", "Automatic")], ["high", T("Yüksek (gölge, yumuşak kenar)", "High (shadows, antialias)")], ["low", T("Düşük (pil dostu)", "Low (battery friendly)")]].map(([k, v]) => '<option value="' + k + '"' + (App.prefs.get("lab3dQuality", "auto") === k ? " selected" : "") + ">" + esc(v) + "</option>").join("") + "</select></label></div>" +
        '<p class="hint">' + esc(T("Her deneyin sağ üstündeki 2B / 3B düğmesiyle de istediğin an geçebilirsin. 3B'de sürükleyerek döndür, iki parmakla yakınlaştır.", "You can also switch with the 2D / 3D button on each lab. In 3D drag to rotate and pinch to zoom.")) + "</p></section>" : "") +
      "</div>";
    App.hydrateIcons(view);
    const dm = view.querySelector("#labDefMode"); if (dm) dm.addEventListener("change", () => { App.lab3d.setMode(dm.value); App.ui.toast(T("Kaydedildi.", "Saved.")); });
    const dq = view.querySelector("#lab3dQ"); if (dq) dq.addEventListener("change", () => { App.prefs.set("lab3dQuality", dq.value); App.ui.toast(T("Kaydedildi.", "Saved.")); });
    const listEl = view.querySelector("#labList");
    function paint() {
      App.prefs.set("labFilter", st);
      view.querySelectorAll("[data-f-subj]").forEach((b) => b.classList.toggle("is-on", b.dataset.fSubj === st.subj));
      view.querySelectorAll("[data-f-grade]").forEach((b) => b.classList.toggle("is-on", b.dataset.fGrade === st.grade));
      view.querySelector("[data-f-fav]").classList.toggle("is-on", st.fav);
      const F = favs(), q = App.nav ? App.nav.norm(st.q) : st.q.toLowerCase();
      let list = all.filter((m) => (st.subj === "all" || m.subject === st.subj) && (st.grade === "all" || m.grades.includes(st.grade)) && (!st.fav || F.has(m.id)));
      if (q) list = list.filter((m) => { const n = App.nav ? App.nav.norm(m.lab.title() + " " + m.lab.desc() + " " + (m.lab.tags || "") + " " + m.keys.map((k) => App.L(k.f.outcome.title)).join(" ")) : ""; return q.split(" ").every((w) => n.includes(w)); });
      // Gruplama: ders ve sınıf seçiliyse ünitelere, değilse ders → sınıf
      const byUnit = st.grade !== "all" && st.subj !== "all";
      const groups = new Map();
      list.forEach((m) => {
        const k = (st.grade === "all" ? m.keys[0] : m.keys.find((x) => x.f.grade.id === st.grade)) || null;
        m.unitTxt = k ? App.L(k.f.unit.name) : "";
        const gk = m.subject + "|" + (k ? k.f.grade.id + (byUnit ? "|" + k.f.unit.id : "") : "z");
        if (!groups.has(gk)) groups.set(gk, { subject: m.subject, title: k ? App.data.curriculum.gradeName(k.f.grade) + (byUnit ? " · " + App.L(k.f.unit.name) : "") : T("Diğer", "Other"),
          order: k ? Number(k.f.grade.id) * 100 + (byUnit ? parseInt(String(k.f.unit.id).replace(/\D/g, "") || 0, 10) : 0) : 9999, items: [] });
        groups.get(gk).items.push(m);
      });
      const G = Array.from(groups.values()).sort((a, b) => SUBJECTS.indexOf(a.subject) - SUBJECTS.indexOf(b.subject) || a.order - b.order);
      let html = "", lastSubj = null;
      const rec = st.subj === "all" && st.grade === "all" && !st.q && !st.fav ? recent().filter((id) => LABS[id]).slice(0, 4) : [];
      if (rec.length) html += '<section class="lab-group"><h2 class="lab-group__title">' + App.icon("clock") + esc(T("Son açtıkların", "Recently opened")) + '</h2><div class="lab-grid">' + rec.map((id) => cardHtml(meta(id), F)).join("") + "</div></section>";
      G.forEach((g) => {
        if (g.subject !== lastSubj && st.subj === "all") { html += '<h2 class="lab-subj subj-' + g.subject + '"><span class="subj-ico subj-ico--sm">' + App.icon(subjIcon(g.subject)) + "</span>" + esc(subjName(g.subject)) + "</h2>"; lastSubj = g.subject; }
        html += '<section class="lab-group"><h3 class="lab-group__title">' + esc(g.title) + '</h3><div class="lab-grid">' + g.items.map((m) => cardHtml(m, F)).join("") + "</div></section>";
      });
      listEl.innerHTML = html || App.ui.empty("search", T("Deney bulunamadı", "No labs found"), T("Süzgeçleri değiştir ya da başka bir kelime dene.", "Change the filters or try another word."), "");
      App.hydrateIcons(listEl);
    }
    view.addEventListener("click", (e) => {
      const s1 = e.target.closest("[data-f-subj]"); if (s1) { st.subj = s1.dataset.fSubj; paint(); return; }
      const g1 = e.target.closest("[data-f-grade]"); if (g1) { st.grade = g1.dataset.fGrade; paint(); return; }
      if (e.target.closest("[data-f-fav]")) { st.fav = !st.fav; paint(); return; }
      const fv = e.target.closest("[data-fav]"); if (fv) { toggleFav(fv.dataset.fav); paint(); }
    });
    view.querySelector("#labQ").addEventListener("input", App.utils.debounce((e) => { st.q = e.target.value; paint(); }, 120));
    paint();
  }
  function toggleFav(id) {
    const F = favs(); if (F.has(id)) F.delete(id); else F.add(id);
    App.prefs.set("labFavs", Array.from(F));
    return F.has(id);
  }

  /* ---------------- Laboratuvar: tek deney ---------------- */
  function renderLab(view, id) {
    const m = meta(id), lab = m.lab;
    App.setTitle(lab.title());
    App.prefs.set("labRecent", [id].concat(recent().filter((x) => x !== id)).slice(0, 8));
    const same = Object.keys(LABS).map(meta).filter((x) => x.subject === m.subject)
      .sort((a, b) => ((a.keys[0] && Number(a.keys[0].f.grade.id)) || 99) - ((b.keys[0] && Number(b.keys[0].f.grade.id)) || 99));
    const i = same.findIndex((x) => x.id === id), prev = same[i - 1], next = same[i + 1];
    const tasks = lab.tasks ? lab.tasks() : [];
    const doneT = new Set((App.prefs.get("labTasks", {})[id]) || []);
    const isFav = favs().has(id);
    view.innerHTML = '<div class="page lab-page subj-' + m.subject + '">' +
      '<nav class="crumbs"><a href="#/lab">' + esc(T("Deney Laboratuvarı", "Lab")) + '</a><span aria-hidden="true">›</span><span>' + esc(subjName(m.subject)) + "</span></nav>" +
      '<div class="lab-head"><span class="subj-ico subj-ico--lg">' + App.icon(lab.icon || subjIcon(m.subject)) + '</span><div class="lab-head__main"><h1>' + esc(lab.title()) + "</h1><p>" + esc(lab.desc()) + "</p></div>" +
        '<button class="icon-btn lab-fav' + (isFav ? " is-on" : "") + '" type="button" id="labFav" aria-pressed="' + isFav + '" title="' + esc(T("Favorilere ekle", "Add to favourites")) + '">' + App.icon("bookmark") + "</button></div>" +
      '<section class="card lab-main"><div id="labHost"></div></section>' +
      '<div class="lab-below">' +
        (tasks.length ? '<section class="card lab-tasks"><div class="card__title">' + App.icon("target") + esc(T("Dene bakalım", "Try this")) + '</div><ol>' + tasks.map((tx, j) =>
          '<li><label class="check-row"><input type="checkbox" data-task="' + j + '"' + (doneT.has(j) ? " checked" : "") + "> <span>" + esc(tx) + "</span></label></li>").join("") + "</ol></section>" : "") +
        (m.keys.length ? '<section class="card lab-links"><div class="card__title">' + App.icon("book") + esc(T("İlgili konular", "Related lessons")) + '</div><ul>' + m.keys.map((k) =>
          '<li><a href="#/konular/' + esc(k.key) + '"><b>' + esc(App.data.curriculum.gradeName(k.f.grade) + " · " + App.L(k.f.subject.name)) + "</b>" + esc(App.L(k.f.outcome.title)) + "</a></li>").join("") + "</ul></section>" : "") +
      "</div>" +
      '<nav class="lab-pn">' + (prev ? '<a class="btn" href="#/lab/' + prev.id + '">' + App.icon("chevronL") + esc(prev.lab.title()) + "</a>" : "<span></span>") +
        (next ? '<a class="btn" href="#/lab/' + next.id + '">' + esc(next.lab.title()) + App.icon("chevron") + "</a>" : "") + "</nav>" +
      "</div>";
    App.hydrateIcons(view);
    mount(view.querySelector("#labHost"), id, {});
    view.querySelector("#labFav").addEventListener("click", (e) => { const on = toggleFav(id); e.currentTarget.classList.toggle("is-on", on); e.currentTarget.setAttribute("aria-pressed", String(on)); App.ui.toast(on ? T("Favorilere eklendi.", "Added to favourites.") : T("Favorilerden çıkarıldı.", "Removed from favourites.")); });
    view.querySelectorAll("[data-task]").forEach((cb) => cb.addEventListener("change", () => {
      const all = App.prefs.get("labTasks", {}); const set = new Set(all[id] || []);
      if (cb.checked) set.add(Number(cb.dataset.task)); else set.delete(Number(cb.dataset.task));
      all[id] = Array.from(set); App.prefs.set("labTasks", all);
    }));
  }

  function render(view, prm) {
    if (prm[0] && LABS[prm[0]]) {
      renderLab(view, prm[0]);
      // #/lab/<id>/holo: deney doğrudan hologramda açılır (ör. hologram öğretmenden)
      if (prm[1] === "holo") { let n = 0; const t = setInterval(() => { const b = view.querySelector("#labHost [data-holo-start]"); if (b || ++n > 30) { clearInterval(t); if (b && location.hash.indexOf("#/lab/" + prm[0]) === 0) b.click(); } }, 100); }
      return;
    }
    return renderLibrary(view);
  }

  App.router.register("lab", render);
  /** Fonksiyon deneyinin o anki fonksiyonu (3B görünüm kullanır) */
  function funcOf(st) { const fam = LABS.fonksiyon.families()[st.fam]; return fam ? (x) => fam.f(x, st.q || {}, st.base) : () => NaN; }
  App.labs = { LABS, LINKS, mount, sectionHtml, mountIn, add, link, meta, funcOf, BASE,
    util: { T, fmt, DEG, colors, arrow, label, frame, axes, plot, dot, row, niceStep, hexRgb, esc } };
})();
