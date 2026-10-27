/* =========================================================
   labs-ek.js — v1.42 ek deneyleri (67 → 82)
   Laboratuvarda deneyi az olan dersler: matematik (türev, integral, diziler, üstel büyüme, parabol,
   olasılık, istatistik, üçgen çözme, dönüşümler, katı cisimler), coğrafya (mevsimler, iklim, nüfus)
   ve biyoloji (mitoz–mayoz, kalıtım).
   Her deney kendi kazanımlarına bağlanır; bağlı olduğu konu sayfasında "Deneyler" bölümünde görünür.
   ========================================================= */
(function () {
  const { T, fmt, frame, axes, plot, dot, row, label, arrow } = App.labs.util;
  const add = App.labs.add;
  const key = (col) => '<i class="lab-key" style="--k:' + col + '"></i>';
  const DEG = Math.PI / 180;

  /* ======================= MATEMATİK ======================= */

  const FN = () => ({
    kup: ["x³ − 3x", (x) => x * x * x - 3 * x, (x) => 3 * x * x - 3],
    sin: ["sin x", Math.sin, Math.cos],
    par: ["x² − 2x", (x) => x * x - 2 * x, (x) => 2 * x - 2],
    ust: ["eˣ / 3", (x) => Math.exp(x) / 3, (x) => Math.exp(x) / 3]
  });
  add("turev", {
    title: () => T("Türev: teğet doğrusu ve anlık değişim", "Derivative: tangent line"), icon: "chart", tags: "türev teğet eğim kiriş limit ekstremum",
    desc: () => T("Noktayı ve h aralığını değiştir: kiriş, h → 0 iken teğete dönüşür. Türevin işareti artan/azalan bölgeleri gösterir.", "Move the point and h: the secant becomes the tangent as h → 0."),
    params: () => [
      { id: "f", type: "select", label: T("Fonksiyon", "Function"), options: Object.entries(FN()).map(([k, v]) => [k, v[0]]), value: "kup" },
      { id: "a", label: T("Nokta a", "Point a"), min: -2.5, max: 2.5, step: 0.05, value: 0.6 },
      { id: "h", label: "h", min: 0.01, max: 2, step: 0.01, value: 1 }
    ],
    ratio: 0.62,
    tasks: () => [T("h'yi 0,01'e indir: kirişin eğimi neye yaklaşıyor?", "Shrink h: what does the secant slope approach?"), T("x³ − 3x için teğetin yatay olduğu iki noktayı bul.", "Find where the tangent of x³ − 3x is horizontal."), T("Türev pozitifken fonksiyon artıyor mu?", "Is f increasing where f′ > 0?")],
    draw(ctx, W, H, p, t, c) {
      const [nm, f, d] = FN()[p.f] || FN().kup;
      const F = frame(36, 12, W - 52, H - 34, -3, 3, -4, 4);
      axes(ctx, F, c, { xName: "x", yName: "y" });
      // türevin işaretine göre eğri rengi
      plot(ctx, F, (x) => (d(x) >= 0 ? f(x) : NaN), c.good, 2.4); plot(ctx, F, (x) => (d(x) < 0 ? f(x) : NaN), c.bad, 2.4);
      const a = p.a, b = a + p.h, ya = f(a), yb = f(b), sec = (yb - ya) / p.h, tan = d(a);
      plot(ctx, F, (x) => ya + sec * (x - a), c.warn, 1.6, [6, 4]);
      plot(ctx, F, (x) => ya + tan * (x - a), c.accent, 2);
      dot(ctx, F.X(a), F.Y(ya), 5, c.accent); dot(ctx, F.X(b), F.Y(yb), 4, c.warn);
      return { html: row(T("f(x)", "f(x)"), nm) + row(key(c.warn) + T("Kiriş eğimi (Δy/Δx)", "Secant slope"), fmt(sec, 3)) +
        row(key(c.accent) + T("Teğet eğimi f′(a)", "Tangent slope f′(a)"), fmt(tan, 3)) + row(T("Fark", "Difference"), fmt(Math.abs(sec - tan), 3)) +
        row(T("Davranış", "Behaviour"), tan > 0.02 ? T("artan (yeşil)", "increasing") : tan < -0.02 ? T("azalan (kırmızı)", "decreasing") : T("yatay teğet: olası ekstremum", "horizontal tangent")),
        note: T("Türev, kiriş eğiminin h → 0 iken limitidir: f′(a) = lim (f(a+h) − f(a))/h. f′ > 0 olan aralıkta fonksiyon artan, f′ < 0 olanda azalandır; f′ = 0 ve işaret değişiyorsa yerel ekstremum vardır.",
          "f′(a) is the limit of the secant slope as h → 0.") };
    }
  }, ["12/matematik/u5/k2", "12/matematik/u5/k3", "12/matematik/u5/k1"]);

  add("integral", {
    title: () => T("Belirli integral: Riemann toplamı", "Definite integral: Riemann sums"), icon: "chart", tags: "integral alan riemann dikdörtgen toplam",
    desc: () => T("Eğri altındaki alanı dikdörtgenlerle yaklaşık hesapla; dikdörtgen sayısı arttıkça toplam gerçek integrale yaklaşır.", "Approximate the area with rectangles; more rectangles → the exact integral."),
    params: () => [
      { id: "f", type: "select", label: T("Fonksiyon", "Function"), options: [["kare", "x²"], ["kok", "√x · 2"], ["sin", "sin x + 1"]], value: "kare" },
      { id: "n", label: T("Dikdörtgen sayısı n", "Rectangles n"), min: 1, max: 80, step: 1, value: 6 },
      { id: "m", type: "select", label: T("Yükseklik", "Height"), options: [["sol", T("Sol uç", "Left")], ["orta", T("Orta nokta", "Midpoint")], ["sag", T("Sağ uç", "Right")]], value: "sol" },
      { id: "b", label: T("Üst sınır b", "Upper bound b"), min: 0.5, max: 3, step: 0.1, value: 2 }
    ],
    ratio: 0.62,
    tasks: () => [T("x² için [0, 2]'de sol ve sağ uç toplamları gerçek değerin (8/3) altında mı üstünde mi?", "Left vs right sums for x² on [0, 2]?"), T("n'yi ikiye katlayınca hata yaklaşık ne kadar azalıyor?", "How does the error shrink when n doubles?")],
    draw(ctx, W, H, p, t, c) {
      const fs = { kare: [(x) => x * x, (b) => (b * b * b) / 3], kok: [(x) => 2 * Math.sqrt(x), (b) => (4 / 3) * Math.pow(b, 1.5)], sin: [(x) => Math.sin(x) + 1, (b) => 1 - Math.cos(b) + b] };
      const [f, Fp] = fs[p.f] || fs.kare;
      const F = frame(36, 12, W - 52, H - 34, 0, 3.2, 0, Math.max(3, f(3) * 1.05));
      axes(ctx, F, c, { xName: "x" });
      const dx = p.b / p.n; let S = 0;
      for (let i = 0; i < p.n; i++) {
        const x = i * dx, xs = p.m === "sol" ? x : p.m === "sag" ? x + dx : x + dx / 2, h = f(xs); S += h * dx;
        ctx.fillStyle = "rgba(79,124,255,.25)"; ctx.strokeStyle = c.accent; ctx.lineWidth = 1;
        ctx.fillRect(F.X(x), F.Y(h), F.X(x + dx) - F.X(x), F.Y(0) - F.Y(h)); ctx.strokeRect(F.X(x), F.Y(h), F.X(x + dx) - F.X(x), F.Y(0) - F.Y(h));
      }
      plot(ctx, F, f, c.warn, 2.4);
      const exact = Fp(p.b);
      return { html: row(T("Riemann toplamı", "Riemann sum"), fmt(S, 4)) + row(T("Gerçek integral", "Exact integral"), fmt(exact, 4)) +
        row(T("Hata", "Error"), fmt(Math.abs(S - exact), 4) + " (%" + fmt((Math.abs(S - exact) / exact) * 100, 2) + ")") + row("Δx", fmt(dx, 3)),
        note: T("∫ f(x) dx = lim (n→∞) Σ f(xᵢ)·Δx. Artan fonksiyonda sol uç toplamı eksik, sağ uç toplamı fazla tahmin eder; orta nokta genellikle çok daha iyidir. İntegral, eğri ile x ekseni arasındaki işaretli alandır.",
          "The integral is the limit of Riemann sums.") };
    }
  }, ["12/matematik/u6/k3", "12/matematik/u6/k2"]);

  add("dizi", {
    title: () => T("Aritmetik ve geometrik diziler", "Arithmetic and geometric sequences"), icon: "chart", tags: "dizi seri ortak fark ortak çarpan toplam",
    desc: () => T("İlk terimi ve ortak farkı/çarpanı değiştir; terimleri, n. terimi ve ilk n terim toplamını gör.", "Change the first term and common difference/ratio; see terms and partial sums."),
    params: () => [
      { id: "tip", type: "select", label: T("Dizi", "Sequence"), options: [["a", T("Aritmetik", "Arithmetic")], ["g", T("Geometrik", "Geometric")]], value: "a" },
      { id: "a1", label: "a₁", min: -10, max: 10, step: 1, value: 2 },
      { id: "d", label: T("Ortak fark d / çarpan r", "d or r"), min: -3, max: 3, step: 0.1, value: 1.5 },
      { id: "n", label: "n", min: 1, max: 20, step: 1, value: 8 }
    ],
    ratio: 0.6,
    tasks: () => [T("r = 0,5 iken toplam hangi sayıya yaklaşıyor? (a₁ / (1 − r))", "With r = 0.5, what does the sum approach?"), T("Aritmetik dizide terimler neden bir doğru üzerinde?", "Why do arithmetic terms lie on a line?")],
    draw(ctx, W, H, p, t, c) {
      const term = (k) => (p.tip === "a" ? p.a1 + (k - 1) * p.d : p.a1 * Math.pow(p.d, k - 1));
      const vals = Array.from({ length: p.n }, (_, i) => term(i + 1));
      const sums = vals.reduce((acc, v) => (acc.push((acc.length ? acc[acc.length - 1] : 0) + v), acc), []);
      const lo = Math.min(0, ...vals, ...sums), hi = Math.max(1, ...vals, ...sums);
      const F = frame(40, 12, W - 56, H - 34, 0, p.n + 1, lo - (hi - lo) * 0.05, hi + (hi - lo) * 0.08);
      axes(ctx, F, c, { xName: "n", step: p.n > 10 ? 2 : 1 });
      vals.forEach((v, i) => { const x = F.X(i + 1); ctx.strokeStyle = c.accent; ctx.lineWidth = 6; ctx.beginPath(); ctx.moveTo(x, F.Y(0)); ctx.lineTo(x, F.Y(v)); ctx.stroke(); });
      ctx.strokeStyle = c.warn; ctx.lineWidth = 1.8; ctx.beginPath(); sums.forEach((s, i) => (i ? ctx.lineTo(F.X(i + 1), F.Y(s)) : ctx.moveTo(F.X(i + 1), F.Y(s)))); ctx.stroke();
      sums.forEach((s, i) => dot(ctx, F.X(i + 1), F.Y(s), 3, c.warn));
      const an = term(p.n), Sn = sums[sums.length - 1];
      const lim = p.tip === "g" && Math.abs(p.d) < 1 ? fmt(p.a1 / (1 - p.d), 3) : "—";
      return { html: row(key(c.accent) + T("n. terim aₙ", "nth term aₙ"), fmt(an, 3)) + row(key(c.warn) + T("Toplam Sₙ", "Sum Sₙ"), fmt(Sn, 3)) +
        row(T("Formül", "Formula"), p.tip === "a" ? "aₙ = a₁ + (n−1)d · Sₙ = n(a₁+aₙ)/2" : "aₙ = a₁·rⁿ⁻¹ · Sₙ = a₁(1−rⁿ)/(1−r)") + row(T("Sonsuz toplam", "Infinite sum"), lim),
        note: T("Aritmetik dizide ardışık terimler arasındaki fark, geometrik dizide oran sabittir. |r| < 1 olan geometrik dizinin sonsuz toplamı a₁/(1 − r) sayısına yakınsar.", "Constant difference vs constant ratio; |r| < 1 → finite infinite sum.") };
    }
  }, ["12/matematik/u2/k1", "12/matematik/u2/k2"]);

  add("ustel", {
    title: () => T("Üstel büyüme, yarılanma ve logaritma", "Exponential growth, half-life and logarithm"), icon: "chart", tags: "üstel logaritma bileşik faiz yarılanma nüfus",
    desc: () => T("Başlangıç miktarını ve yüzde değişimi seç; miktarın kaç yılda iki katına/yarıya indiğini logaritmayla hesapla.", "Pick a rate; compute doubling/halving time with logarithms."),
    params: () => [
      { id: "A0", label: T("Başlangıç", "Start"), min: 100, max: 5000, step: 100, value: 1000 },
      { id: "r", label: T("Dönemlik değişim", "Rate per period"), min: -30, max: 40, step: 1, value: 8, unit: "%" },
      { id: "n", label: T("Dönem sayısı", "Periods"), min: 1, max: 40, step: 1, value: 20 }
    ],
    ratio: 0.6,
    tasks: () => [T("%7 artışta miktar yaklaşık kaç dönemde iki katına çıkar? (72 kuralı: 72/7)", "Doubling time at 7% (rule of 72)?"), T("−%10'da yarılanma süresi nedir?", "Half-life at −10%?")],
    draw(ctx, W, H, p, t, c) {
      const q = 1 + p.r / 100, A = (k) => p.A0 * Math.pow(q, k);
      const top = Math.max(p.A0 * 1.1, A(p.n) * 1.05);
      const F = frame(48, 12, W - 64, H - 34, 0, p.n, 0, top);
      axes(ctx, F, c, { xName: T("dönem", "period") });
      plot(ctx, F, (x) => p.A0 * (1 + (p.r / 100) * x), c.muted, 1.4, [5, 4]);
      plot(ctx, F, A, p.r >= 0 ? c.good : c.bad, 2.6);
      const k2 = p.r ? Math.log(p.r > 0 ? 2 : 0.5) / Math.log(q) : Infinity;
      if (isFinite(k2) && k2 <= p.n) { dot(ctx, F.X(k2), F.Y(A(k2)), 5, c.warn); label(ctx, p.r > 0 ? "2×" : "½", F.X(k2) + 6, F.Y(A(k2)) - 10, c.warn, "left", 12); }
      return { html: row(T("Model", "Model"), "A(n) = " + p.A0 + " · " + fmt(q, 2) + "ⁿ") + row(T("Son miktar", "Final amount"), fmt(A(p.n), 1)) +
        row(p.r >= 0 ? T("İkiye katlanma süresi", "Doubling time") : T("Yarılanma süresi", "Half-life"), isFinite(k2) ? fmt(k2, 2) + T(" dönem", " periods") : "—") +
        row(T("Hesap", "Computation"), p.r ? "n = log " + (p.r > 0 ? "2" : "0,5") + " / log " + fmt(q, 2) : "—"),
        note: T("Sabit yüzde değişim üstel fonksiyon verir: A(n) = A₀·(1 + r)ⁿ. Kesikli çizgi aynı başlangıçla doğrusal (basit faiz) büyümedir. 'Kaç dönemde?' sorusu logaritmayla çözülür: n = log(k) / log(1 + r).",
          "Constant percentage change is exponential; solve for time with logarithms.") };
    }
  }, ["12/matematik/u1/k1", "12/matematik/u1/k2", "12/matematik/u1/k3"]);

  add("parabol", {
    title: () => T("Parabol: kökler, tepe noktası ve diskriminant", "Parabola: roots, vertex, discriminant"), icon: "chart", tags: "ikinci derece fonksiyon parabol tepe kök diskriminant delta",
    desc: () => T("a, b, c katsayılarını değiştir; tepe noktasını, simetri eksenini, kökleri ve Δ'nın işaretini gör.", "Change a, b, c; see vertex, axis, roots and the discriminant."),
    params: () => [
      { id: "a", label: "a", min: -3, max: 3, step: 0.1, value: 1 },
      { id: "b", label: "b", min: -6, max: 6, step: 0.1, value: -2 },
      { id: "c", label: "c", min: -6, max: 6, step: 0.1, value: -3 }
    ],
    ratio: 0.62,
    tasks: () => [T("Δ = 0 olacak bir c değeri bul: parabol x eksenine nasıl dokunuyor?", "Find c with Δ = 0."), T("a'nın işareti kolların yönünü nasıl belirliyor?", "How does the sign of a affect the arms?"), T("Kökler toplamı −b/a ile tutuyor mu?", "Check that the sum of roots is −b/a.")],
    draw(ctx, W, H, p, t, c) {
      const a = Math.abs(p.a) < 0.05 ? 0.05 : p.a, f = (x) => a * x * x + p.b * x + p.c;
      const F = frame(36, 12, W - 52, H - 34, -6, 6, -8, 8);
      axes(ctx, F, c, { xName: "x", yName: "y" });
      const r = -p.b / (2 * a), k = f(r), D = p.b * p.b - 4 * a * p.c;
      ctx.setLineDash([5, 4]); ctx.strokeStyle = c.muted; ctx.beginPath(); ctx.moveTo(F.X(r), F.py); ctx.lineTo(F.X(r), F.py + F.ph); ctx.stroke(); ctx.setLineDash([]);
      plot(ctx, F, f, c.accent, 2.6);
      dot(ctx, F.X(r), F.Y(k), 5, c.warn);
      let roots = "—";
      if (D >= 0) { const x1 = (-p.b - Math.sqrt(D)) / (2 * a), x2 = (-p.b + Math.sqrt(D)) / (2 * a); [x1, x2].forEach((x) => dot(ctx, F.X(x), F.Y(0), 4.5, c.bad)); roots = D === 0 ? fmt(x1, 3) : fmt(Math.min(x1, x2), 3) + " ; " + fmt(Math.max(x1, x2), 3); }
      return { html: row("f(x)", fmt(a, 1) + "x² " + (p.b < 0 ? "− " : "+ ") + fmt(Math.abs(p.b), 1) + "x " + (p.c < 0 ? "− " : "+ ") + fmt(Math.abs(p.c), 1)) +
        row(key(c.warn) + T("Tepe noktası T(r, k)", "Vertex"), "(" + fmt(r, 2) + " ; " + fmt(k, 2) + ")") + row("Δ = b² − 4ac", fmt(D, 2)) +
        row(key(c.bad) + T("Kökler", "Roots"), D < 0 ? T("gerçek kök yok", "no real roots") : roots) + row(T("Kökler toplamı / çarpımı", "Sum / product"), fmt(-p.b / a, 2) + " / " + fmt(p.c / a, 2)),
        note: T("Tepe noktası r = −b/2a, k = f(r). Δ > 0 ise iki farklı kök, Δ = 0 ise çakışık kök (parabol eksene teğet), Δ < 0 ise gerçek kök yoktur. a > 0 iken kollar yukarı, a < 0 iken aşağıdır.",
          "Vertex at −b/2a; the discriminant decides the number of real roots.") };
    }
  }, ["10/matematik/t4/k1", "11/matematik/u5/k1", "11/matematik/u5/k4", "10/matematik/t4/k3"]);

  add("olasilik", {
    title: () => T("Olasılık: deney sayısı arttıkça", "Probability: law of large numbers"), icon: "sparkle", tags: "olasılık zar para büyük sayılar yasası deney frekans",
    desc: () => T("Zar ya da para atışı yap; deneysel olasılığın, deney sayısı arttıkça kuramsal olasılığa yaklaştığını izle.", "Roll dice or flip coins; watch the relative frequency approach the theoretical probability."),
    params: () => [
      { id: "olay", type: "select", label: T("Olay", "Event"), options: [["alti", T("Zarda 6 gelmesi", "Rolling a 6")], ["cift", T("Zarda çift sayı", "Even number")], ["toplam7", T("İki zarın toplamı 7", "Sum of two dice = 7")], ["yazi2", T("İki parada iki yazı", "Two coins: two tails")]], value: "alti" },
      { id: "hiz", label: T("Saniyedeki atış", "Throws per second"), min: 1, max: 200, step: 1, value: 30 }
    ],
    animated: true, loop: true, ratio: 0.6,
    init() { return { n: 0, k: 0, hist: [], last: 0, ev: null }; },
    tasks: () => [T("100 atışta deneysel sonuç kuramsaldan ne kadar uzak? 2000 atışta?", "Compare 100 vs 2000 throws."), T("İki zarın toplamında neden 7 en olası toplamdır?", "Why is 7 the most likely sum?")],
    draw(ctx, W, H, p, t, c, s) {
      const P = { alti: 1 / 6, cift: 1 / 2, toplam7: 6 / 36, yazi2: 1 / 4 }[p.olay];
      const roll = () => 1 + Math.floor(Math.random() * 6);
      const hit = () => (p.olay === "alti" ? roll() === 6 : p.olay === "cift" ? roll() % 2 === 0 : p.olay === "toplam7" ? roll() + roll() === 7 : Math.random() < 0.5 && Math.random() < 0.5);
      // Animasyon zamanı (t) döngüde başa sardığı için gerçek saat kullanılır
      const now = performance.now() / 1000;
      if (s.ev !== p.olay) { s.ev = p.olay; s.n = 0; s.k = 0; s.hist = []; s.last = now; }
      const due = Math.min(400, Math.floor((now - s.last) * p.hiz));
      if (due > 0 && s.n < 5000) { for (let i = 0; i < due; i++) { s.n++; if (hit()) s.k++; if (s.n % 5 === 0) s.hist.push(s.k / s.n); } s.last = now; }
      const F = frame(44, 12, W - 60, H - 34, 0, Math.max(50, s.hist.length), 0, Math.min(1, P * 2.6));
      axes(ctx, F, c, { xName: T("deney ×5", "trials ×5") });
      plot(ctx, F, () => P, c.good, 1.8, [6, 4]);
      ctx.strokeStyle = c.accent; ctx.lineWidth = 2; ctx.beginPath(); s.hist.forEach((v, i) => (i ? ctx.lineTo(F.X(i + 1), F.Y(v)) : ctx.moveTo(F.X(1), F.Y(v)))); ctx.stroke();
      const emp = s.n ? s.k / s.n : 0;
      return { html: row(key(c.good) + T("Kuramsal olasılık", "Theoretical"), fmt(P, 4)) + row(key(c.accent) + T("Deneysel olasılık", "Experimental"), s.n ? fmt(emp, 4) : "—") +
        row(T("Deney sayısı", "Trials"), String(s.n) + (s.n >= 5000 ? T(" (sınır)", " (max)") : "")) + row(T("Fark", "Difference"), s.n ? fmt(Math.abs(emp - P), 4) : "—"),
        note: T("Kuramsal olasılık = istenen durum sayısı / tüm durumlar. Az deneyde deneysel oran çok dalgalanır; deney sayısı arttıkça kuramsal değere yaklaşır (büyük sayılar yasası). Olayı değiştirince deney sıfırlanır.",
          "With more trials the relative frequency approaches the probability.") };
    }
  }, ["11/matematik/u4/k2", "10/matematik/t7/k1", "11/matematik/u4/k3"]);

  add("istatistik", {
    title: () => T("Merkezî eğilim, yayılım ve kutu grafiği", "Centre, spread and box plot"), icon: "chart", tags: "ortalama medyan mod standart sapma çeyrek kutu grafiği aykırı",
    desc: () => T("Veri kümesini seç ve bir aykırı değer ekle: ortalama ile medyanın, standart sapma ile çeyrekler açıklığının nasıl etkilendiğini gör.", "Add an outlier: see how mean vs median and SD vs IQR react."),
    params: () => [
      { id: "set", type: "select", label: T("Veri", "Data"), options: [["not", T("Sınav notları", "Exam scores")], ["boy", T("Boy (cm)", "Height (cm)")], ["sure", T("Günlük ekran süresi (dk)", "Screen time (min)")]], value: "not" },
      { id: "ay", label: T("Aykırı değer", "Outlier"), min: 0, max: 400, step: 5, value: 0 }
    ],
    ratio: 0.55,
    tasks: () => [T("Büyük bir aykırı değer ekle: ortalama mı medyan mı daha çok değişiyor?", "Add a big outlier: which changes more?"), T("1,5·ÇA kuralına göre değer aykırı mı?", "Is it an outlier by the 1.5·IQR rule?")],
    draw(ctx, W, H, p, t, c) {
      const D = { not: [45, 52, 58, 60, 63, 65, 68, 70, 72, 75, 78, 82, 85, 90], boy: [158, 160, 162, 165, 166, 168, 170, 171, 173, 175, 178, 181], sure: [40, 55, 60, 75, 80, 90, 95, 110, 120, 130, 150] }[p.set];
      const d = (p.ay ? D.concat(p.ay) : D.slice()).sort((a, b) => a - b), n = d.length;
      const q = (f) => { const i = (n - 1) * f, lo = Math.floor(i); return d[lo] + (d[Math.min(n - 1, lo + 1)] - d[lo]) * (i - lo); };
      const mean = d.reduce((a, b) => a + b, 0) / n, sd = Math.sqrt(d.reduce((a, b) => a + (b - mean) ** 2, 0) / (n - 1));
      const Q1 = q(0.25), Q2 = q(0.5), Q3 = q(0.75), IQR = Q3 - Q1, lo = Q1 - 1.5 * IQR, hi = Q3 + 1.5 * IQR;
      const inl = d.filter((x) => x >= lo && x <= hi);
      const x0 = Math.min(...d) - 5, x1 = Math.max(...d) + 5, F = frame(20, 10, W - 40, H - 30, x0, x1, 0, 1);
      axes(ctx, F, c, { stepY: 1 });
      d.forEach((v, i) => dot(ctx, F.X(v), F.Y(0.82 + ((i % 3) - 1) * 0.04), 4, v < lo || v > hi ? c.bad : c.muted));
      const yb = F.Y(0.5), hb = 34;
      ctx.strokeStyle = c.accent; ctx.lineWidth = 2;
      ctx.strokeRect(F.X(Q1), yb - hb / 2, F.X(Q3) - F.X(Q1), hb);
      ctx.beginPath(); ctx.moveTo(F.X(Q2), yb - hb / 2); ctx.lineTo(F.X(Q2), yb + hb / 2);
      ctx.moveTo(F.X(Math.min(...inl)), yb); ctx.lineTo(F.X(Q1), yb); ctx.moveTo(F.X(Q3), yb); ctx.lineTo(F.X(Math.max(...inl)), yb); ctx.stroke();
      ctx.strokeStyle = c.warn; ctx.beginPath(); ctx.moveTo(F.X(mean), yb - hb / 2 - 10); ctx.lineTo(F.X(mean), yb + hb / 2 + 10); ctx.stroke();
      label(ctx, T("ortalama", "mean"), F.X(mean), yb + hb / 2 + 18, c.warn, "center", 10);
      return { html: row(key(c.warn) + T("Ortalama", "Mean"), fmt(mean, 2)) + row(T("Medyan", "Median"), fmt(Q2, 2)) + row(T("Standart sapma", "Std. deviation"), fmt(sd, 2)) +
        row("Q1 / Q3 / " + T("ÇA", "IQR"), fmt(Q1, 1) + " / " + fmt(Q3, 1) + " / " + fmt(IQR, 1)) + row(key(c.bad) + T("Aykırı", "Outliers"), d.filter((x) => x < lo || x > hi).join(", ") || "—"),
        note: T("Kutunun kenarları 1. ve 3. çeyrek, içindeki çizgi medyandır. Çeyrekler açıklığının 1,5 katından uzaktaki değerler aykırı kabul edilir. Aykırı değer ortalamayı ve standart sapmayı çok, medyanı ve çeyrekleri az etkiler.",
          "Outliers move the mean and SD much more than the median and IQR.") };
    }
  }, ["10/matematik/t2/k2", "10/matematik/t2/k3", "9/matematik/t6/k1"]);

  add("ucgencoz", {
    title: () => T("Üçgen çözme: sinüs ve kosinüs teoremi", "Solving triangles: sine and cosine rules"), icon: "chart", tags: "sinüs teoremi kosinüs teoremi üçgen alan açı kenar",
    desc: () => T("İki kenar ve aradaki açıyı ver; üçüncü kenarı kosinüs teoremiyle, diğer açıları sinüs teoremiyle bul.", "Give two sides and the included angle; solve the triangle."),
    params: () => [
      { id: "b", label: "b", min: 2, max: 10, step: 0.1, value: 6 },
      { id: "c", label: "c", min: 2, max: 10, step: 0.1, value: 5 },
      { id: "A", label: T("A açısı", "Angle A"), min: 10, max: 170, step: 1, value: 60, unit: "°" }
    ],
    ratio: 0.6,
    tasks: () => [T("A = 90° yap: kosinüs teoremi neye dönüşüyor?", "Set A = 90°: what does the cosine rule become?"), T("Alanı ½·b·c·sin A ile doğrula.", "Check the area with ½·bc·sin A.")],
    draw(ctx, W, H, p, t, c) {
      const A = p.A * DEG, a = Math.sqrt(p.b * p.b + p.c * p.c - 2 * p.b * p.c * Math.cos(A));
      const B = Math.asin(Math.min(1, (p.b * Math.sin(A)) / a)), Bf = p.b * p.b > a * a + p.c * p.c ? Math.PI - B : B, C = Math.PI - A - Bf;
      const Pa = [0, 0], Pb = [p.c, 0], Pc = [p.b * Math.cos(A), p.b * Math.sin(A)];
      const xs = [Pa[0], Pb[0], Pc[0]], ys = [Pa[1], Pb[1], Pc[1]], span = Math.max(Math.max(...xs) - Math.min(...xs), Math.max(...ys)) || 1;
      const s = Math.min((W - 80) / span, (H - 60) / span), ox = 40 - Math.min(...xs) * s, oy = H - 30;
      const P = (q) => [ox + q[0] * s, oy - q[1] * s];
      ctx.fillStyle = "rgba(79,124,255,.15)"; ctx.strokeStyle = c.accent; ctx.lineWidth = 2.2;
      ctx.beginPath(); [Pa, Pb, Pc].forEach((q, i) => { const [x, y] = P(q); i ? ctx.lineTo(x, y) : ctx.moveTo(x, y); }); ctx.closePath(); ctx.fill(); ctx.stroke();
      [[Pa, "A"], [Pb, "B"], [Pc, "C"]].forEach(([q, n]) => { const [x, y] = P(q); dot(ctx, x, y, 4, c.text); label(ctx, n, x + (n === "B" ? 8 : -12), y + (n === "C" ? -10 : 12), c.text, "center", 13); });
      const mid = (u, v) => P([(u[0] + v[0]) / 2, (u[1] + v[1]) / 2]);
      let m = mid(Pb, Pc); label(ctx, "a = " + fmt(a, 2), m[0] + 8, m[1], c.warn, "left", 12);
      m = mid(Pa, Pc); label(ctx, "b", m[0] - 10, m[1], c.muted, "right", 12); m = mid(Pa, Pb); label(ctx, "c", m[0], m[1] + 12, c.muted, "center", 12);
      return { html: row(key(c.warn) + "a² = b² + c² − 2bc·cos A", "a = " + fmt(a, 3)) + row(T("B açısı", "Angle B"), fmt(Bf / DEG, 1) + "°") + row(T("C açısı", "Angle C"), fmt(C / DEG, 1) + "°") +
        row(T("Alan = ½·b·c·sin A", "Area"), fmt(0.5 * p.b * p.c * Math.sin(A), 3)) + row(T("Çevrel çember çapı 2R = a / sin A", "2R"), fmt(a / Math.sin(A), 3)),
        note: T("Kosinüs teoremi iki kenar ve aradaki açıdan üçüncü kenarı verir; A = 90° iken Pisagor bağıntısına dönüşür. Sinüs teoremi a/sin A = b/sin B = c/sin C = 2R bağıntısıdır.", "Cosine rule → third side; sine rule → remaining angles.") };
    }
  }, ["10/matematik/t1/k4", "10/matematik/t1/k3", "10/matematik/t1/k1"]);

  add("donusum", {
    title: () => T("Dönüşüm geometrisi: öteleme, yansıma, dönme", "Transformations: translation, reflection, rotation"), icon: "compass", tags: "öteleme yansıma dönme simetri analitik düzlem",
    desc: () => T("Bir şekli ötele, eksenlere ya da y = x doğrusuna göre yansıt, orijin etrafında döndür; köşe koordinatlarının kuralını gör.", "Translate, reflect or rotate a shape; see the coordinate rule."),
    params: () => [
      { id: "tip", type: "select", label: T("Dönüşüm", "Transformation"), options: [["ot", T("Öteleme", "Translation")], ["yx", T("x eksenine göre yansıma", "Reflect in x-axis")], ["yy", T("y eksenine göre yansıma", "Reflect in y-axis")], ["yd", T("y = x doğrusuna göre yansıma", "Reflect in y = x")], ["don", T("Orijin etrafında dönme", "Rotation about O")]], value: "don" },
      { id: "a", label: T("a (öteleme x)", "a (shift x)"), min: -5, max: 5, step: 1, value: 3 },
      { id: "b", label: T("b (öteleme y)", "b (shift y)"), min: -5, max: 5, step: 1, value: -2 },
      { id: "th", label: T("Dönme açısı", "Angle"), min: -180, max: 180, step: 15, value: 90, unit: "°" }
    ],
    ratio: 0.62,
    tasks: () => [T("90° dönmede (x, y) noktası nereye gider?", "Where does (x, y) go under a 90° rotation?"), T("Hangi dönüşümler şeklin yönünü (saat yönü sırasını) tersine çevirir?", "Which transformations reverse orientation?")],
    draw(ctx, W, H, p, t, c) {
      const S = [[1, 1], [4, 1], [4, 2], [2, 4]];
      const th = p.th * DEG, tr = (q) => {
        const [x, y] = q;
        return p.tip === "ot" ? [x + p.a, y + p.b] : p.tip === "yx" ? [x, -y] : p.tip === "yy" ? [-x, y] : p.tip === "yd" ? [y, x] : [x * Math.cos(th) - y * Math.sin(th), x * Math.sin(th) + y * Math.cos(th)];
      };
      const F = frame(30, 10, W - 44, H - 26, -7, 7, -6, 6);
      axes(ctx, F, c, { step: 1, stepY: 1 });
      if (p.tip === "yd") plot(ctx, F, (x) => x, c.muted, 1.2, [5, 4]);
      const poly = (pts, col, fill) => { ctx.beginPath(); pts.forEach((q, i) => (i ? ctx.lineTo(F.X(q[0]), F.Y(q[1])) : ctx.moveTo(F.X(q[0]), F.Y(q[1])))); ctx.closePath(); ctx.fillStyle = fill; ctx.fill(); ctx.strokeStyle = col; ctx.lineWidth = 2; ctx.stroke(); };
      const S2 = S.map(tr);
      poly(S, c.muted, "rgba(150,150,150,.15)"); poly(S2, c.accent, "rgba(79,124,255,.2)");
      S.forEach((q, i) => { dot(ctx, F.X(q[0]), F.Y(q[1]), 3, c.muted); dot(ctx, F.X(S2[i][0]), F.Y(S2[i][1]), 3.5, c.accent); label(ctx, "ABCD"[i] + "′", F.X(S2[i][0]) + 6, F.Y(S2[i][1]) - 8, c.accent, "left", 11); });
      const rule = { ot: "(x, y) → (x + a, y + b)", yx: "(x, y) → (x, −y)", yy: "(x, y) → (−x, y)", yd: "(x, y) → (y, x)", don: "(x, y) → (x·cosθ − y·sinθ, x·sinθ + y·cosθ)" }[p.tip];
      return { html: row(T("Kural", "Rule"), rule) + row("A(1, 1) →", "(" + fmt(S2[0][0], 2) + ", " + fmt(S2[0][1], 2) + ")") + row("D(2, 4) →", "(" + fmt(S2[3][0], 2) + ", " + fmt(S2[3][1], 2) + ")") +
        row(T("Yön", "Orientation"), ["yx", "yy", "yd"].includes(p.tip) ? T("ters döner (yansıma)", "reversed") : T("korunur", "preserved")),
        note: T("Öteleme, yansıma ve dönme uzunlukları ve açıları korur (eşlik dönüşümleri). Yansımalar şeklin köşe sırasının yönünü tersine çevirir; öteleme ve dönme korur. 90° dönmede (x, y) → (−y, x) olur.", "Isometries preserve lengths and angles; reflections reverse orientation.") };
    }
  }, ["9/matematik/t4/k1", "12/matematik/u4/k1"]);

  const SOLID = () => [
    ["prizma", T("Kare dik prizma", "Square prism")], ["silindir", T("Silindir", "Cylinder")], ["piramit", T("Kare piramit", "Square pyramid")],
    ["koni", T("Koni", "Cone")], ["kure", T("Küre", "Sphere")]
  ];
  add("katicisim", {
    title: () => T("Katı cisimler: hacim ve yüzey alanı", "Solids: volume and surface area"), icon: "cube", tags: "prizma silindir piramit koni küre hacim yüzey alanı",
    desc: () => T("Cismi ve ölçülerini seç; hacmi ve yüzey alanını, aynı taban ve yükseklikteki prizma/silindirle karşılaştır.", "Pick a solid; compare its volume with the prism/cylinder of the same base and height."),
    params: () => [
      { id: "tip", type: "select", label: T("Cisim", "Solid"), options: SOLID(), value: "koni" },
      { id: "r", label: T("Taban yarıçapı / kenar yarısı r", "Radius / half side r"), min: 1, max: 6, step: 0.5, value: 3 },
      { id: "h", label: T("Yükseklik h", "Height h"), min: 1, max: 10, step: 0.5, value: 6 }
    ],
    animated: true, loop: true, ratio: 0.6,
    tasks: () => [T("Koni hacmi aynı taban ve yükseklikteki silindirin kaçta kaçı?", "Cone vs cylinder volume?"), T("Küre hacmi, onu tam çevreleyen silindirin kaçta kaçı? (Arşimet)", "Sphere vs circumscribed cylinder?")],
    draw(ctx, W, H, p, t, c) {
      const r = p.r, h = p.h, a = 2 * r, PI = Math.PI;
      const V = { prizma: a * a * h, silindir: PI * r * r * h, piramit: (a * a * h) / 3, koni: (PI * r * r * h) / 3, kure: (4 / 3) * PI * r * r * r }[p.tip];
      const l = Math.sqrt(r * r + h * h), ap = Math.sqrt(r * r + h * h);
      const A = { prizma: 2 * a * a + 4 * a * h, silindir: 2 * PI * r * r + 2 * PI * r * h, piramit: a * a + 2 * a * ap, koni: PI * r * r + PI * r * l, kure: 4 * PI * r * r }[p.tip];
      const ref = { prizma: a * a * h, piramit: a * a * h, silindir: PI * r * r * h, koni: PI * r * r * h, kure: PI * r * r * 2 * r }[p.tip];
      // basit eğik izdüşüm çizimi (dönen)
      const s = Math.min(W * 0.06, (H - 60) / (Math.max(h, 2 * r) + 2)), cx = W * 0.3, cy = H * 0.78, rot = t * 0.6;
      const pr = (x, y, z) => { const X = x * Math.cos(rot) - z * Math.sin(rot), Z = x * Math.sin(rot) + z * Math.cos(rot); return [cx + X * s, cy - y * s + Z * s * 0.35]; };
      ctx.strokeStyle = c.accent; ctx.lineWidth = 1.8;
      const ring = (y, rr) => { ctx.beginPath(); for (let i = 0; i <= 48; i++) { const g = (i / 48) * 2 * PI, q = pr(rr * Math.cos(g), y, rr * Math.sin(g)); i ? ctx.lineTo(q[0], q[1]) : ctx.moveTo(q[0], q[1]); } ctx.stroke(); };
      const seg = (p1, p2) => { const A1 = pr(...p1), B1 = pr(...p2); ctx.beginPath(); ctx.moveTo(A1[0], A1[1]); ctx.lineTo(B1[0], B1[1]); ctx.stroke(); };
      const sq = [[-r, -r], [r, -r], [r, r], [-r, r]];
      if (p.tip === "silindir") { ring(0, r); ring(h, r); [0, PI].forEach((g) => seg([r * Math.cos(g - rot), 0, r * Math.sin(g - rot)], [r * Math.cos(g - rot), h, r * Math.sin(g - rot)])); }
      if (p.tip === "koni") { ring(0, r); [0, PI].forEach((g) => seg([r * Math.cos(g - rot), 0, r * Math.sin(g - rot)], [0, h, 0])); }
      if (p.tip === "kure") { const cyy = r; for (let k = -2; k <= 2; k++) ring(cyy + (k * r) / 2.6, Math.sqrt(Math.max(0, r * r - ((k * r) / 2.6) ** 2))); ctx.beginPath(); for (let i = 0; i <= 48; i++) { const g = (i / 48) * 2 * PI, q = pr(r * Math.cos(g), cyy + r * Math.sin(g), 0); i ? ctx.lineTo(q[0], q[1]) : ctx.moveTo(q[0], q[1]); } ctx.stroke(); }
      if (p.tip === "prizma" || p.tip === "piramit") {
        sq.forEach((q, i) => { const n = sq[(i + 1) % 4]; seg([q[0], 0, q[1]], [n[0], 0, n[1]]); if (p.tip === "prizma") { seg([q[0], h, q[1]], [n[0], h, n[1]]); seg([q[0], 0, q[1]], [q[0], h, q[1]]); } else seg([q[0], 0, q[1]], [0, h, 0]); });
      }
      // hacim oranı çubuğu
      const bx = W * 0.6, bw = W * 0.32, by = H * 0.3;
      ctx.fillStyle = c.grid; ctx.fillRect(bx, by, bw, 18); ctx.fillStyle = c.accent; ctx.fillRect(bx, by, bw * Math.min(1, V / ref), 18);
      label(ctx, T("hacim / ", "volume / ") + (p.tip === "kure" ? T("çevreleyen silindir", "circumscribed cylinder") : p.tip === "koni" || p.tip === "silindir" ? T("silindir", "cylinder") : T("prizma", "prism")) + " = " + fmt(V / ref, 3), bx, by - 10, c.text, "left", 12);
      return { html: row(T("Hacim", "Volume"), fmt(V, 2)) + row(T("Yüzey alanı", "Surface area"), fmt(A, 2)) +
        row(T("Formül", "Formula"), { prizma: "V = (2r)²·h", silindir: "V = πr²h", piramit: "V = ⅓·taban·h", koni: "V = ⅓πr²h", kure: "V = ⁴⁄₃πr³ · A = 4πr²" }[p.tip]) +
        (p.tip === "koni" ? row(T("Ana doğru l", "Slant l"), fmt(l, 2)) : ""),
        note: T("Sivri cisimlerin (piramit, koni) hacmi, aynı taban ve yükseklikteki prizma/silindirin üçte biridir. Küre, kendini çevreleyen silindirin hacminin üçte ikisidir (Arşimet). Yüzey alanı = taban alanları + yanal alan.",
          "Pointed solids have one third of the prism/cylinder volume; a sphere is 2/3 of its circumscribed cylinder.") };
    }
  }, ["11/matematik/u6/k2", "11/matematik/u6/k3", "11/matematik/u6/k4"]);

  /* ======================= COĞRAFYA ======================= */

  add("mevsim", {
    title: () => T("Mevsimler: eksen eğikliği ve güneş açısı", "Seasons: axial tilt and sun angle"), icon: "sun", tags: "mevsim eksen eğikliği gündönümü ekinoks güneş ışınları gün uzunluğu enlem",
    desc: () => T("Tarihi ve enlemi seç; öğle güneşinin geliş açısını, gün uzunluğunu ve Güneş ışınlarının dik geldiği paraleli gör.", "Pick a date and latitude; see the noon sun angle and day length."),
    params: () => [
      { id: "gun", label: T("Yılın günü", "Day of year"), min: 1, max: 365, step: 1, value: 172 },
      { id: "enlem", label: T("Enlem", "Latitude"), min: -66, max: 66, step: 1, value: 39, unit: "°" },
      { id: "egik", label: T("Eksen eğikliği", "Axial tilt"), min: 0, max: 40, step: 0.5, value: 23.5, unit: "°" }
    ],
    ratio: 0.6,
    tasks: () => [T("21 Haziran (172. gün) ve 21 Aralık'ta (355) Ankara'da (40°) öğle güneş açısını karşılaştır.", "Compare noon sun angle in Ankara on 21 June vs 21 December."), T("Eksen eğikliğini 0° yap: mevsimler ne olur?", "Set tilt to 0°: what happens to seasons?")],
    draw(ctx, W, H, p, t, c) {
      const dec = p.egik * Math.sin((2 * Math.PI * (p.gun - 81)) / 365);           // güneşin dik geldiği enlem
      const alt = 90 - Math.abs(p.enlem - dec);
      const cosH = -Math.tan(p.enlem * DEG) * Math.tan(dec * DEG), day = cosH <= -1 ? 24 : cosH >= 1 ? 0 : (2 * Math.acos(cosH)) / DEG / 15;
      // Dünya kesiti
      const cx = W * 0.3, cy = H * 0.5, R = Math.min(W * 0.2, H * 0.38);
      ctx.fillStyle = "rgba(79,124,255,.18)"; ctx.beginPath(); ctx.arc(cx, cy, R, 0, 2 * Math.PI); ctx.fill();
      ctx.fillStyle = "rgba(0,0,0,.28)"; ctx.beginPath(); ctx.arc(cx, cy, R, Math.PI / 2, (3 * Math.PI) / 2, false); ctx.fill();
      const ax = p.egik * DEG;
      ctx.strokeStyle = c.muted; ctx.lineWidth = 1.4; ctx.beginPath(); ctx.moveTo(cx - Math.sin(-ax) * (R + 16), cy - Math.cos(-ax) * (R + 16)); ctx.lineTo(cx + Math.sin(-ax) * (R + 16), cy + Math.cos(-ax) * (R + 16)); ctx.stroke();
      const latPt = (lat) => { const g = (lat * DEG) - 0; return [cx + R * Math.cos(g), cy - R * Math.sin(g)]; };
      for (let i = 0; i < 7; i++) { const y = cy - R + ((i + 0.5) * 2 * R) / 7; arrow(ctx, W * 0.98, y, cx + Math.sqrt(Math.max(0, R * R - (y - cy) ** 2)) + 4, y, c.warn, 1.4); }
      const [dx, dy] = latPt(dec); dot(ctx, dx, dy, 5, c.warn); label(ctx, T("dik ışın ", "direct ") + fmt(dec, 1) + "°", dx + 8, dy - 10, c.warn, "left", 11);
      const [lx, ly] = latPt(p.enlem); dot(ctx, lx, ly, 5, c.accent); label(ctx, fmt(p.enlem, 0) + "°", lx + 8, ly + 10, c.accent, "left", 11);
      // gün uzunluğu çubuğu
      const bx = W * 0.6, bw = W * 0.34, by = H * 0.82;
      ctx.fillStyle = "rgba(0,0,0,.3)"; ctx.fillRect(bx, by, bw, 14); ctx.fillStyle = c.warn; ctx.fillRect(bx + (bw * (24 - day)) / 48, by, (bw * day) / 24, 14);
      label(ctx, T("gündüz ", "daylight ") + fmt(day, 1) + T(" sa", " h"), bx, by - 10, c.text, "left", 12);
      const mo = new Date(2026, 0, p.gun).toLocaleDateString(App.i18n.locale, { day: "numeric", month: "long" });
      return { html: row(T("Tarih", "Date"), mo) + row(key(c.warn) + T("Işınların dik geldiği enlem", "Subsolar latitude"), fmt(dec, 1) + "°") +
        row(key(c.accent) + T("Öğle güneş açısı", "Noon sun angle"), alt > 0 ? fmt(alt, 1) + "°" : T("güneş doğmaz", "no sunrise")) + row(T("Gündüz süresi", "Day length"), fmt(day, 1) + T(" saat", " h")) +
        row(T("Bu yarım kürede", "Season here"), (p.enlem >= 0 ? dec : -dec) > 8 ? T("yaz", "summer") : (p.enlem >= 0 ? dec : -dec) < -8 ? T("kış", "winter") : T("ilkbahar/sonbahar", "spring/autumn")),
        note: T("Mevsimlerin nedeni Dünya'nın Güneş'e uzaklığı değil, eksen eğikliğidir: Güneş ışınları yıl içinde 23°27′ K ile 23°27′ G arasında dik gelir. Işınların geliş açısı büyüdükçe birim alana düşen enerji ve gündüz süresi artar. 21 Haziran'da Yengeç, 21 Aralık'ta Oğlak dönencesine dik gelir; 21 Mart ve 23 Eylül'de Ekvator'a.",
          "Seasons come from axial tilt, not distance.") };
    }
  }, ["9/cografya/u8/k1", "9/cografya/u8/k2", "9/cografya/u3/k2"]);

  add("iklim", {
    title: () => T("İklim kontrolleri: yükselti, enlem ve karasallık", "Climate controls: altitude, latitude, continentality"), icon: "sun", tags: "sıcaklık yükselti enlem deniz karasallık sıcaklık farkı",
    desc: () => T("Bir yeri yükselti, enlem ve denize uzaklıkla tanımla; yıllık ortalama sıcaklığı ve yıllık sıcaklık farkını tahmin et.", "Describe a place; estimate mean temperature and annual range."),
    params: () => [
      { id: "enlem", label: T("Enlem", "Latitude"), min: 0, max: 70, step: 1, value: 40, unit: "°" },
      { id: "yuk", label: T("Yükselti", "Altitude"), min: 0, max: 4000, step: 50, value: 900, unit: "m" },
      { id: "deniz", label: T("Denize uzaklık", "Distance to sea"), min: 0, max: 2000, step: 25, value: 400, unit: "km" }
    ],
    ratio: 0.6,
    tasks: () => [T("Yükseltiyi 1000 m artır: sıcaklık kaç °C düşüyor?", "Raise altitude by 1000 m: how much cooler?"), T("Aynı enlemde kıyı ile iç kesimin yıllık sıcaklık farkını karşılaştır (İzmir – Erzurum).", "Compare coast vs interior annual ranges.")],
    draw(ctx, W, H, p, t, c) {
      // Kaba ampirik katsayılar (İzmir ~ 38°/kıyı: ort. 18 °C, fark 18 °C; Erzurum ~ 40°/1900 m/iç: ort. 5 °C, fark ~ 30 °C)
      const base = 27 - 0.05 * p.enlem - 0.0055 * p.enlem * p.enlem;                  // deniz seviyesinde yıllık ortalama
      const Tm = base - 0.0065 * p.yuk;
      const half = (d) => (2 + 0.2 * p.enlem) * (0.9 + 0.6 * Math.min(1, d / 900));   // yıllık farkın yarısı
      const amp = half(p.deniz);
      const F = frame(40, 12, W - 56, H - 34, 0, 12, -30, 40);
      axes(ctx, F, c, { step: 1, stepY: 10, xName: T("ay", "month") });
      const T_ = (m) => Tm + amp * Math.sin(((m - 4.2) / 12) * 2 * Math.PI);
      plot(ctx, F, (m) => base + half(0) * Math.sin(((m - 4.2) / 12) * 2 * Math.PI), c.muted, 1.4, [5, 4]);
      plot(ctx, F, T_, c.bad, 2.6);
      const cold = Tm - amp, hot = Tm + amp;
      return { html: row(T("Yıllık ortalama", "Annual mean"), fmt(Tm, 1) + " °C") + row(T("En sıcak / en soğuk ay", "Warmest / coldest"), fmt(hot, 1) + " / " + fmt(cold, 1) + " °C") +
        row(T("Yıllık sıcaklık farkı", "Annual range"), fmt(2 * amp, 1) + " °C") + row(T("Yükselti etkisi", "Altitude effect"), "−" + fmt(0.0065 * p.yuk, 1) + " °C"),
        note: T("Basitleştirilmiş model: sıcaklık enlem arttıkça ve her 100 m yükseltide yaklaşık 0,65 °C azalır. Denizden uzaklaştıkça (karasallık) yazlar sıcak, kışlar soğuk olur ve yıllık sıcaklık farkı büyür. Kesikli eğri aynı enlemde deniz kıyısı içindir. Gerçek iklim ayrıca rüzgârlar, okyanus akıntıları ve yer şekillerine bağlıdır.",
          "Simplified model: cooler with latitude and altitude; continentality widens the annual range.") };
    }
  }, ["9/cografya/u3/k2", "9/cografya/u8/k2"]);

  add("nufus", {
    title: () => T("Nüfus piramidi ve demografik dönüşüm", "Population pyramid and demographic transition"), icon: "chart", tags: "nüfus piramidi doğum oranı ölüm oranı yaşlanma demografik dönüşüm",
    desc: () => T("Doğum ve ölüm oranlarını değiştir; nüfus piramidinin şeklini, nüfus artış hızını ve ülkenin demografik dönüşüm evresini gör.", "Change birth/death rates; see the pyramid shape and transition stage."),
    params: () => [
      { id: "dogum", label: T("Doğum oranı (‰)", "Birth rate (‰)"), min: 8, max: 45, step: 1, value: 16 },
      { id: "olum", label: T("Ölüm oranı (‰)", "Death rate (‰)"), min: 5, max: 35, step: 1, value: 6 },
      { id: "omur", label: T("Ortalama yaşam süresi", "Life expectancy"), min: 40, max: 88, step: 1, value: 78 }
    ],
    ratio: 0.62,
    tasks: () => [T("Türkiye için doğum ‰ 12, ölüm ‰ 6, yaşam 78 dene: piramit hangi evrede?", "Try Türkiye's values: which stage?"), T("Doğumu ‰ 9'a indir: tabanı daralan piramit gelecekte hangi sorunları getirir?", "What issues does a narrowing base bring?")],
    draw(ctx, W, H, p, t, c) {
      const ages = 18, cx = W * 0.4, top = 14, bh = (H - 40) / ages;
      const growth = (p.dogum - p.olum) / 10;          // yüzde
      const sh = [];
      for (let i = 0; i < ages; i++) {
        const age = i * 5;
        const surv = Math.exp(-Math.pow(age / p.omur, 4.2)) * Math.exp(-p.olum * 0.0006 * age);
        sh.push(Math.pow(1 + growth / 100, -age) * surv * (p.dogum / 20));
      }
      const mx = Math.max(...sh), w = W * 0.33;
      sh.forEach((v, i) => {
        const y = H - 26 - (i + 1) * bh, len = (v / mx) * w;
        ctx.fillStyle = c.accent; ctx.fillRect(cx - len, y + 1, len, bh - 2);
        ctx.fillStyle = c.bad; ctx.fillRect(cx + 2, y + 1, len * 0.97, bh - 2);
        if (i % 3 === 0) label(ctx, String(i * 5), cx - w - 8, y + bh / 2, c.muted, "right", 10);
      });
      label(ctx, T("erkek", "male"), cx - w * 0.5, top, c.accent, "center", 11); label(ctx, T("kadın", "female"), cx + w * 0.5, top, c.bad, "center", 11);
      const young = sh.slice(0, 3).reduce((a, b) => a + b, 0), old = sh.slice(13).reduce((a, b) => a + b, 0), tot = sh.reduce((a, b) => a + b, 0);
      const st = p.dogum > 30 && p.olum > 20 ? 1 : p.dogum > 28 ? 2 : p.dogum > 14 ? 3 : p.dogum - p.olum > -1 ? 4 : 5;
      return { html: row(T("Doğal artış hızı", "Natural growth"), "%" + fmt(growth, 1)) + row(T("0–14 yaş payı", "Ages 0–14"), "%" + fmt((young / tot) * 100, 0)) +
        row(T("65+ yaş payı", "Ages 65+"), "%" + fmt((old / tot) * 100, 0)) + row(T("Demografik dönüşüm evresi", "Transition stage"), st + " / 5") +
        row(T("Piramit", "Pyramid"), young / tot > 0.32 ? T("geniş tabanlı (genç nüfus)", "wide base (young)") : old / tot > 0.18 ? T("dar tabanlı (yaşlanan nüfus)", "narrow base (ageing)") : T("arı kovanı (durağan)", "beehive (stable)")),
        note: T("Basitleştirilmiş model. Doğum ve ölüm oranları yüksekken piramidin tabanı geniş, tepesi sivridir. Sağlık ve eğitimle önce ölüm, sonra doğum oranı düşer; nüfus yaşlanır ve piramit arı kovanına, sonra ters piramide dönüşür (demografik dönüşüm).",
          "Simplified model of the demographic transition.") };
    }
  }, ["9/cografya/u4/k3", "10/cografya/u4/k3", "9/cografya/u4/k1"]);

  /* ======================= BİYOLOJİ ======================= */

  const MIT = () => [
    [T("İnterfaz", "Interphase"), T("DNA eşlenir, hücre büyür; kromatin ağ hâlinde.", "DNA replicates; chromatin")],
    [T("Profaz", "Prophase"), T("Kromozomlar kısalıp kalınlaşır, çekirdek zarı erir, iğ iplikleri oluşur.", "Chromosomes condense; spindle forms")],
    [T("Metafaz", "Metaphase"), T("Kromozomlar hücrenin ortasında (ekvatoral düzlem) dizilir; sayım en kolay bu evrede.", "Chromosomes line up")],
    [T("Anafaz", "Anaphase"), T("Kardeş kromatitler ayrılıp zıt kutuplara çekilir.", "Sister chromatids separate")],
    [T("Telofaz + sitokinez", "Telophase + cytokinesis"), T("Çekirdek zarları oluşur, sitoplazma bölünür: iki özdeş hücre.", "Two identical cells form")]
  ];
  add("mitoz", {
    title: () => T("Mitoz ve mayoz: kromozom sayısı", "Mitosis and meiosis: chromosome number"), icon: "sparkle", tags: "mitoz mayoz kromozom evre profaz metafaz anafaz telofaz krossing over",
    desc: () => T("Bölünme türünü ve kromozom sayısını seç; evreleri izle, oluşan hücrelerin sayısını ve kromozom sayısını karşılaştır.", "Pick division type; watch phases and compare daughter cells."),
    params: () => [
      { id: "tip", type: "select", label: T("Bölünme", "Division"), options: [["mitoz", T("Mitoz", "Mitosis")], ["mayoz", T("Mayoz", "Meiosis")]], value: "mitoz" },
      { id: "n2", label: T("Kromozom sayısı (2n)", "Chromosomes (2n)"), min: 2, max: 8, step: 2, value: 4 },
      { id: "hiz", label: T("Hız", "Speed"), min: 0.1, max: 1.5, step: 0.1, value: 0.4 }
    ],
    animated: true, loop: true, ratio: 0.6,
    tasks: () => [T("Mitoz sonunda oluşan hücrelerin kromozom sayısı ana hücreyle aynı mı?", "Same chromosome number after mitosis?"), T("Mayozda kromozom sayısı hangi bölünmede yarıya iner?", "In which division of meiosis is the number halved?")],
    draw(ctx, W, H, p, t, c) {
      const mit = p.tip === "mitoz", phases = mit ? 5 : 8, ph = Math.floor((t * p.hiz) % phases), n = p.n2 / 2;
      const names = mit ? MIT() : [[T("İnterfaz", "Interphase"), T("DNA eşlenir.", "DNA replicates.")], [T("Profaz I", "Prophase I"), T("Homolog kromozomlar eşleşir (tetrat), krossing over olabilir: genetik çeşitlilik.", "Homologues pair; crossing over")],
        [T("Metafaz I", "Metaphase I"), T("Homolog çiftler ortada dizilir.", "Pairs line up")], [T("Anafaz I", "Anaphase I"), T("Homolog kromozomlar ayrılır → sayı yarıya iner.", "Homologues separate → number halves")],
        [T("Telofaz I", "Telophase I"), T("İki hücre (n, kromozomlar hâlâ çift kromatitli).", "Two cells (n)")], [T("Metafaz II", "Metaphase II"), T("Kromozomlar ortada dizilir.", "Chromosomes line up")],
        [T("Anafaz II", "Anaphase II"), T("Kardeş kromatitler ayrılır.", "Sister chromatids separate")], [T("Telofaz II", "Telophase II"), T("Dört hücre (n), genetik olarak farklı.", "Four different cells (n)")]];
      const cols = [c.accent, c.bad, c.good, c.warn];
      const cell = (x, y, r, k, mode) => {
        ctx.strokeStyle = c.border; ctx.lineWidth = 2; ctx.beginPath(); ctx.arc(x, y, r, 0, 2 * Math.PI); ctx.stroke();
        for (let i = 0; i < k; i++) {
          const col = cols[i % 4], yy = y - r * 0.5 + (i * r) / Math.max(1, k - 1 || 1) * (k > 1 ? 1 : 0);
          const two = mode !== "single";
          const xx = mode === "line" ? x : x - r * 0.4 + (i % 2) * r * 0.8;
          ctx.strokeStyle = col; ctx.lineWidth = 4; ctx.lineCap = "round";
          ctx.beginPath(); ctx.moveTo(xx - 3, yy - 9); ctx.lineTo(xx - 3, yy + 9); ctx.stroke();
          if (two) { ctx.beginPath(); ctx.moveTo(xx + 3, yy - 9); ctx.lineTo(xx + 3, yy + 9); ctx.stroke(); }
        }
      };
      const cx = W * 0.32, cy = H * 0.5, R = Math.min(W * 0.17, H * 0.36);
      let cells = 1, chrom = p.n2, kind = "2n";
      if (mit) {
        if (ph <= 2) cell(cx, cy, R, p.n2, ph === 0 ? "single" : ph === 2 ? "line" : "pair");
        else if (ph === 3) { cell(cx - R * 0.55, cy, R * 0.7, p.n2, "single"); cell(cx + R * 0.55, cy, R * 0.7, p.n2, "single"); }
        else { cell(cx - R * 0.6, cy, R * 0.6, p.n2, "single"); cell(cx + R * 0.6, cy, R * 0.6, p.n2, "single"); cells = 2; }
      } else {
        if (ph <= 3) cell(cx, cy, R, p.n2, ph === 0 ? "single" : ph === 2 ? "line" : "pair");
        else if (ph <= 6) { cell(cx - R * 0.6, cy, R * 0.6, n, ph === 5 ? "line" : "pair"); cell(cx + R * 0.6, cy, R * 0.6, n, ph === 5 ? "line" : "pair"); cells = 2; chrom = n; kind = "n"; }
        else { [-1.1, -0.37, 0.37, 1.1].forEach((d) => cell(cx + d * R, cy, R * 0.38, n, "single")); cells = 4; chrom = n; kind = "n"; }
      }
      const [nm, ds] = names[ph];
      label(ctx, nm, W * 0.62, H * 0.2, c.text, "left", 15);
      return { html: row(T("Evre", "Phase"), nm) + row(T("Ne oluyor?", "What happens?"), ds) + row(T("Hücre sayısı", "Cells"), String(cells)) + row(T("Hücre başına kromozom", "Chromosomes per cell"), chrom + " (" + kind + ")") +
        row(T("Sonuç", "Result"), mit ? T("2 özdeş hücre, 2n (büyüme, onarım, eşeysiz üreme)", "2 identical 2n cells") : T("4 farklı hücre, n (üreme hücreleri)", "4 different n cells (gametes)")),
        note: T("Mitoz vücut hücrelerinde olur; kromozom sayısı korunur. Mayoz üreme ana hücrelerinde olur; homolog kromozomların ayrılmasıyla (Anafaz I) sayı yarıya iner, krossing over ve bağımsız dağılım genetik çeşitlilik sağlar. Döllenme 2n sayısını geri getirir.",
          "Mitosis keeps the number; meiosis halves it and creates variation.") };
    }
  }, ["10/biyoloji/u3/k1", "10/biyoloji/u3/k2", "10/biyoloji/u3/k3"]);

  add("kalitim", {
    title: () => T("Kalıtım: Punnett karesi ve oranlar", "Heredity: Punnett square and ratios"), icon: "sparkle", tags: "kalıtım mendel punnett baskın çekinik genotip fenotip melez kan grubu",
    desc: () => T("Anne ve babanın genotipini seç; Punnett karesini, olası genotip ve fenotip oranlarını gör. Eş baskınlık ve kan grupları da var.", "Choose parent genotypes; see the Punnett square and ratios."),
    params: () => [
      { id: "tip", type: "select", label: T("Özellik", "Trait"), options: [["bezelye", T("Bezelye tohum rengi (Sarı Y baskın)", "Pea colour (Y dominant)")], ["kan", T("ABO kan grubu (eş baskın)", "ABO blood group")], ["renk", T("Renk körlüğü (X'e bağlı)", "Colour blindness (X-linked)")]], value: "bezelye" },
      { id: "a", type: "select", label: T("Anne genotipi", "Mother genotype"), options: [["0", "1"], ["1", "2"], ["2", "3"]], value: "1" },
      { id: "b", type: "select", label: T("Baba genotipi", "Father genotype"), options: [["0", "1"], ["1", "2"], ["2", "3"]], value: "1" }
    ],
    ratio: 0.62,
    tasks: () => [T("İki melez (Yy × Yy) çaprazlamasında 3 : 1 oranını bul.", "Find 3 : 1 in Yy × Yy."), T("A ve B kan gruplu anne-babadan 0 kan gruplu çocuk olabilir mi?", "Can A and B parents have an O child?"), T("Taşıyıcı anne ile sağlam babanın oğullarında renk körlüğü olasılığı nedir?", "Colour-blind sons of a carrier mother?")],
    draw(ctx, W, H, p, t, c) {
      const SETS = {
        bezelye: { ord: ["Y", "y"], g: [["Y", "Y"], ["Y", "y"], ["y", "y"]], names: ["YY", "Yy", "yy"], ph: (x) => (x.includes("Y") ? T("sarı", "yellow") : T("yeşil", "green")) },
        kan: { ord: ["A", "B", "0"], g: [["A", "0"], ["B", "0"], ["A", "B"]], names: ["A0", "B0", "AB"], ph: (x) => (x.includes("A") && x.includes("B") ? "AB" : x.includes("A") ? "A" : x.includes("B") ? "B" : "0") },
        renk: { ord: ["Xᴿ", "Xʳ", "Y"], g: [["Xᴿ", "Xᴿ"], ["Xᴿ", "Xʳ"], ["Xʳ", "Xʳ"]], gb: [["Xᴿ", "Y"], ["Xʳ", "Y"], ["Xᴿ", "Y"]], names: ["XᴿXᴿ", "XᴿXʳ", "XʳXʳ"], namesB: ["XᴿY", "XʳY", "XᴿY"],
          ph: (x) => (x.includes("Y") ? (x.includes("Xʳ") ? T("renk körü erkek", "colour-blind son") : T("sağlam erkek", "healthy son")) : x.filter((z) => z === "Xʳ").length === 2 ? T("renk körü kız", "colour-blind daughter") : x.includes("Xʳ") ? T("taşıyıcı kız", "carrier daughter") : T("sağlam kız", "healthy daughter")) }
      };
      const S = SETS[p.tip], ma = S.g[+p.a], pa = (S.gb || S.g)[+p.b];
      const cells = [];
      ma.forEach((x) => pa.forEach((y) => cells.push([x, y].sort((u, v) => S.ord.indexOf(u) - S.ord.indexOf(v)))));
      const ox = 30, oy = 30, cs = Math.min((W * 0.5 - 40) / 3, (H - 50) / 3);
      ctx.strokeStyle = c.border; ctx.lineWidth = 1.5; ctx.font = "15px system-ui";
      pa.forEach((y, j) => label(ctx, y, ox + cs * (j + 1.5), oy + cs * 0.5, c.accent, "center", 15));
      ma.forEach((x, i) => label(ctx, x, ox + cs * 0.5, oy + cs * (i + 1.5), c.bad, "center", 15));
      cells.forEach((g, k) => {
        const i = Math.floor(k / 2), j = k % 2, x = ox + cs * (j + 1), y = oy + cs * (i + 1);
        ctx.strokeRect(x, y, cs, cs); label(ctx, g.join(""), x + cs / 2, y + cs * 0.4, c.text, "center", 15); label(ctx, S.ph(g), x + cs / 2, y + cs * 0.72, c.muted, "center", 10);
      });
      const cnt = {}; cells.forEach((g) => { const f = S.ph(g); cnt[f] = (cnt[f] || 0) + 1; });
      const gcnt = {}; cells.forEach((g) => { const k = g.join(""); gcnt[k] = (gcnt[k] || 0) + 1; });
      return { html: row(T("Seçenekler (1 / 2 / 3)", "Options (1 / 2 / 3)"), T("anne: ", "mother: ") + S.names.join(" / ") + " · " + T("baba: ", "father: ") + (S.namesB || S.names).join(" / ")) +
        row(key(c.bad) + T("Anne", "Mother"), ma.join("")) + row(key(c.accent) + T("Baba", "Father"), pa.join("")) +
        row(T("Genotip oranı", "Genotype ratio"), Object.entries(gcnt).map(([k, v]) => k + " " + v + "/4").join(" · ")) + row(T("Fenotip oranı", "Phenotype ratio"), Object.entries(cnt).map(([k, v]) => k + " " + v + "/4").join(" · ")),
        note: T("Her ebeveyn bir gen çiftinden yalnızca birini gamete verir (ayrılma ilkesi); Punnett karesi olası birleşmeleri eşit olasılıkla gösterir. A ve B alelleri birbirine karşı eş baskın, 0'a karşı baskındır. Renk körlüğü X kromozomunda çekinik taşındığı için erkeklerde daha sık görülür.",
          "Segregation; codominance in ABO; X-linked recessive traits are commoner in males.") };
    }
  }, ["10/biyoloji/u3/k4", "10/biyoloji/u3/k5", "10/biyoloji/u3/k6"]);

})();
