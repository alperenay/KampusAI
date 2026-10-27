/* =========================================================
   karne.js — Haftalık üstbiliş karnesi (v1.42)   #/karne  ·  #/karne/-1 (önceki hafta)

   Veli ve öğrenci için tek A4 sayfa; "Yazdır / PDF" ile kâğıda ya da PDF'e alınır.
     • Haftalık toplam ve günlük çalışma süresi (odak oturumları + test çözme süresi)
     • En güçlü ve en zayıf 3 kazanım (haftanın test sonuçları; yoksa hâkimiyet haritası)
     • Üstbiliş İndeksi: sorulardaki "ne kadar eminsin?" cevabı (25/50/75/100) ile gerçek doğruluk
       arasındaki fark. İndeks = ortalama eminlik − doğruluk (yüzde puanı):
         > +10 aşırı güven (emin ama yanılıyor) · < −10 düşük güven (biliyor ama emin değil) · arası dengeli.
       Eminlik düzeylerine göre doğruluk (kalibrasyon) grafiği ve Brier tabanlı kalibrasyon puanı da verilir.
   Sayfa siyah-beyaz yazıcıda da okunur: seriler renk yanında desen (dolu/taralı) ve işaret
   biçimiyle (daire/kare/üçgen/elmas) ayrılır, her değer ayrıca yazıyla gösterilir.
   Sayfa A4'e (190 × 277 mm yazılabilir alan) sabittir; içerik taşarsa yazı boyutu kendiliğinden küçülür.
   ========================================================= */
(function () {
  const { esc } = App.utils;
  const T = (tr, en) => (App.i18n.lang === "en" ? en : tr);
  const L = (v) => App.L(v);
  const DAY = 86400000;
  const CONF = [25, 50, 75, 100];
  const SHAPES = ["circle", "square", "triangle", "diamond"];

  const startOfDay = (t) => { const d = new Date(t); d.setHours(0, 0, 0, 0); return d.getTime(); };
  const inRange = (iso, a, b) => { const x = Date.parse(iso); return !isNaN(x) && x >= a && x < b; };
  const pct = (a, b) => (b ? Math.round((a / b) * 100) : null);
  const fmtMin = (m) => {
    m = Math.round(m);
    if (m < 60) return m + T(" dk", " min");
    return Math.floor(m / 60) + T(" sa ", " h ") + (m % 60 ? (m % 60) + T(" dk", " min") : "");
  };

  /* ---------------- Hesaplar ---------------- */
  /** Haftanın tüm hesapları (saf işlev: testlenebilir) */
  function compute(data, from) {
    const to = from + 7 * DAY;
    const days = Array.from({ length: 7 }, (_, i) => ({ t: from + i * DAY, focus: 0, quiz: 0 }));
    const dayOf = (iso) => { const x = Date.parse(iso); return isNaN(x) ? -1 : Math.floor((startOfDay(x) - from) / DAY); };
    (data.sessions || []).forEach((s) => {
      const i = dayOf(s.end || s.start);
      if (i >= 0 && i < 7) days[i].focus += Number(s.minutes) || 0;
    });
    const quizzes = (data.quizzes || []).filter((q) => q.total > 0 && !q.demo && inRange(q.date, from, to));
    const items = [];      // tek tek sorular: { key, correct, confidence }
    quizzes.forEach((q) => {
      const i = dayOf(q.date);
      const qs = Array.isArray(q.questions) ? q.questions : [];
      // Test süresi: soru başına kaydedilen süre; yoksa soru başına ~1,5 dk varsayılır
      const ms = qs.reduce((a, x) => a + ((x.observation && Number(x.observation.elapsedMs)) || 0), 0);
      if (i >= 0 && i < 7) days[i].quiz += ms ? ms / 60000 : q.total * 1.5;
      qs.forEach((x) => {
        if (!Number.isInteger(x.chosen) || x.chosen < 0) return;
        const c = x.observation && Number(x.observation.confidence);
        items.push({ key: q.key, correct: x.chosen === x.answer, confidence: CONF.includes(c) ? c : null });
      });
    });
    const total = days.reduce((a, d) => a + d.focus + d.quiz, 0);
    const activeDays = days.filter((d) => d.focus + d.quiz >= 1).length;

    // Kazanımlar: haftanın testlerinden (doğru/toplam), en az 2 soru
    const by = new Map();
    quizzes.forEach((q) => { const r = by.get(q.key) || { key: q.key, c: 0, n: 0 }; r.c += q.correct || 0; r.n += q.total; by.set(q.key, r); });
    let outs = Array.from(by.values()).filter((r) => r.n >= 2).map((r) => Object.assign(r, { p: pct(r.c, r.n), src: "quiz" }));
    if (outs.length < 2 && data.mastery) {
      data.mastery.forEach((m, key) => { if (!by.has(key) && m && Number.isFinite(m.score)) outs.push({ key, p: Math.round(m.score), n: 0, src: "mastery" }); });
    }
    // Güçlü ve zayıf listeleri çakışmaz: sıralı listenin üst yarısı (en çok 3) güçlü, kalanların en düşük 3'ü zayıf
    const sorted = outs.sort((a, b) => b.p - a.p || b.n - a.n);
    const strong = sorted.slice(0, Math.min(3, Math.ceil(sorted.length / 2)));
    const weak = sorted.slice(strong.length).reverse().slice(0, 3);

    // Üstbiliş
    const rated = items.filter((x) => x.confidence !== null);
    const bins = CONF.map((c) => { const xs = rated.filter((x) => x.confidence === c); return { c, n: xs.length, acc: pct(xs.filter((x) => x.correct).length, xs.length) }; });
    let meta = null;
    if (rated.length) {
      const meanC = rated.reduce((a, x) => a + x.confidence, 0) / rated.length;
      const acc = (rated.filter((x) => x.correct).length / rated.length) * 100;
      const brier = rated.reduce((a, x) => a + Math.pow(x.confidence / 100 - (x.correct ? 1 : 0), 2), 0) / rated.length;
      const index = Math.round(meanC - acc);
      meta = {
        n: rated.length, meanC: Math.round(meanC), acc: Math.round(acc), index,
        calibration: Math.round((1 - brier) * 100),
        zone: index > 10 ? "over" : index < -10 ? "under" : "ok",
        sureWrong: rated.filter((x) => x.confidence >= 75 && !x.correct).length,
        unsureRight: rated.filter((x) => x.confidence <= 50 && x.correct).length,
        bins
      };
    }
    return { from, to, days, total, activeDays, quizzes: quizzes.length, questions: items.length, strong, weak, meta };
  }

  /* ---------------- Çizimler (SVG, desenli: siyah-beyaz okunur) ---------------- */
  const defs = '<defs><pattern id="kHatch" width="5" height="5" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">' +
    '<rect width="5" height="5" fill="#fff"/><line x1="0" y1="0" x2="0" y2="5" style="stroke:var(--k-b)" stroke-width="2.2"/></pattern></defs>';

  function dailyChart(R) {
    const W = 340, H = 120, P = { l: 30, r: 6, t: 8, b: 20 };
    const max = Math.max(30, ...R.days.map((d) => d.focus + d.quiz));
    const step = max > 180 ? 60 : max > 90 ? 30 : 15, top = Math.ceil(max / step) * step;
    const y = (v) => P.t + (H - P.t - P.b) * (1 - v / top), bw = (W - P.l - P.r) / 7;
    let g = "";
    for (let v = 0; v <= top; v += step) g += '<line x1="' + P.l + '" x2="' + (W - P.r) + '" y1="' + y(v) + '" y2="' + y(v) + '" class="k-grid"/><text x="' + (P.l - 4) + '" y="' + (y(v) + 3) + '" class="k-ax" text-anchor="end">' + v + "</text>";
    R.days.forEach((d, i) => {
      const x = P.l + i * bw + bw * 0.18, w = bw * 0.64;
      const yf = y(d.focus), yq = y(d.focus + d.quiz);
      if (d.focus > 0) g += '<rect x="' + x + '" y="' + yf + '" width="' + w + '" height="' + (y(0) - yf) + '" class="k-bar-a"/>';
      if (d.quiz > 0) g += '<rect x="' + x + '" y="' + yq + '" width="' + w + '" height="' + (yf - yq) + '" class="k-bar-b"/>';
      const tot = Math.round(d.focus + d.quiz);
      if (tot) g += '<text x="' + (x + w / 2) + '" y="' + (yq - 3) + '" class="k-val" text-anchor="middle">' + tot + "</text>";
      g += '<text x="' + (x + w / 2) + '" y="' + (H - 6) + '" class="k-ax" text-anchor="middle">' +
        esc(new Date(d.t).toLocaleDateString(App.i18n.locale, { weekday: "short" })) + "</text>";
    });
    return '<svg class="k-svg" viewBox="0 0 ' + W + " " + H + '" role="img" aria-label="' + esc(T("Günlük çalışma süresi (dakika)", "Daily study time (minutes)")) + '">' + defs + g + "</svg>";
  }

  function marker(shape, cx, cy, r) {
    if (shape === "square") return '<rect x="' + (cx - r) + '" y="' + (cy - r) + '" width="' + 2 * r + '" height="' + 2 * r + '" class="k-pt"/>';
    if (shape === "triangle") return '<path d="M' + cx + " " + (cy - r * 1.2) + "L" + (cx + r * 1.1) + " " + (cy + r * 0.8) + "L" + (cx - r * 1.1) + " " + (cy + r * 0.8) + 'Z" class="k-pt"/>';
    if (shape === "diamond") return '<path d="M' + cx + " " + (cy - r * 1.3) + "L" + (cx + r * 1.3) + " " + cy + "L" + cx + " " + (cy + r * 1.3) + "L" + (cx - r * 1.3) + " " + cy + 'Z" class="k-pt"/>';
    return '<circle cx="' + cx + '" cy="' + cy + '" r="' + r + '" class="k-pt"/>';
  }
  function calibChart(meta) {
    const W = 200, H = 164, P = { l: 30, r: 14, t: 16, b: 28 };
    const x = (c) => P.l + (W - P.l - P.r) * (c / 100), y = (a) => P.t + (H - P.t - P.b) * (1 - a / 100);
    let g = "";
    [0, 25, 50, 75, 100].forEach((v) => {
      g += '<line x1="' + P.l + '" x2="' + (W - P.r) + '" y1="' + y(v) + '" y2="' + y(v) + '" class="k-grid"/><text x="' + (P.l - 4) + '" y="' + (y(v) + 3) + '" class="k-ax" text-anchor="end">' + v + "</text>";
      g += '<text x="' + x(v) + '" y="' + (H - 16) + '" class="k-ax" text-anchor="middle">' + v + "</text>";
    });
    g += '<line x1="' + x(0) + '" y1="' + y(0) + '" x2="' + x(100) + '" y2="' + y(100) + '" class="k-diag"/>';
    g += '<text x="' + (W - P.r) + '" y="' + (H - 3) + '" class="k-ax" text-anchor="end">' + esc(T("eminlik %", "confidence %")) + "</text>";
    const pts = meta.bins.filter((b) => b.n);
    if (pts.length > 1) g += '<polyline points="' + pts.map((b) => x(b.c) + "," + y(b.acc)).join(" ") + '" class="k-line"/>';
    // Değerler grafiğin altındaki tabloda (etiketler noktaların üstüne binmesin)
    meta.bins.forEach((b, i) => { if (b.n) g += marker(SHAPES[i], x(b.c), y(b.acc), 4.2); });
    return '<svg class="k-svg k-svg--cal" viewBox="0 0 ' + W + " " + H + '" role="img" aria-label="' + esc(T("Eminlik düzeyine göre doğruluk", "Accuracy by confidence level")) + '">' + g + "</svg>";
  }
  /** Kalibrasyon tablosu: işaret · eminlik → doğruluk (soru sayısı) */
  function calibTable(meta) {
    return '<ul class="k-cal">' + meta.bins.map((b, i) => "<li>" +
      '<svg viewBox="-6 -6 12 12" aria-hidden="true">' + marker(SHAPES[i], 0, 0, 4) + "</svg>" +
      esc(T("%" + b.c + " emin → ", b.c + "% sure → ")) + "<b>" + (b.n ? "%" + b.acc : "–") + "</b> <small>(" + b.n + ")</small></li>").join("") + "</ul>";
  }

  /** −50 (düşük güven) … 0 (dengeli) … +50 (aşırı güven) gösterge */
  function gauge(meta) {
    const W = 340, H = 54, l = 12, r = W - 12, mid = (l + r) / 2;
    const xv = (v) => mid + (Math.max(-50, Math.min(50, v)) / 50) * (r - mid);
    const band = (a, b, cls) => '<rect x="' + xv(a) + '" y="14" width="' + (xv(b) - xv(a)) + '" height="14" class="' + cls + '"/>';
    const m = xv(meta.index);
    return '<svg class="k-svg k-svg--gauge" viewBox="0 0 ' + W + " " + H + '" role="img" aria-label="' + esc(T("Üstbiliş indeksi: ", "Metacognition index: ") + meta.index) + '">' + defs +
      '<defs><pattern id="kDots" width="4" height="4" patternUnits="userSpaceOnUse"><rect width="4" height="4" fill="#f6d9da"/><circle cx="2" cy="2" r=".9" fill="#15171c"/></pattern></defs>' +
      band(-50, -10, "k-zone-under") + band(-10, 10, "k-zone-ok") + band(10, 50, "k-zone-over") +
      '<rect x="' + l + '" y="14" width="' + (r - l) + '" height="14" class="k-zone-frame"/>' +
      '<path d="M' + m + " 10 L" + (m - 6) + " 2 L" + (m + 6) + ' 2 Z" class="k-needle"/><line x1="' + m + '" x2="' + m + '" y1="10" y2="32" class="k-needle-l"/>' +
      '<text x="' + l + '" y="44" class="k-ax">' + esc(T("◀ düşük güven", "◀ underconfident")) + "</text>" +
      '<text x="' + mid + '" y="44" class="k-ax" text-anchor="middle">' + esc(T("dengeli", "calibrated")) + "</text>" +
      '<text x="' + r + '" y="44" class="k-ax" text-anchor="end">' + esc(T("aşırı güven ▶", "overconfident ▶")) + "</text></svg>";
  }

  /* ---------------- Sayfa ---------------- */
  function outcomeRow(x, kind) {
    const f = App.lessons && App.lessons.find(x.key);
    const title = f ? L(f.outcome.title) : x.key, sub = f ? f.grade.id + ". " + T("sınıf", "grade") + " · " + L(f.subject.name) : "";
    return '<li class="k-out k-out--' + kind + '"><div class="k-out__t"><b>' + esc(title) + "</b><small>" + esc(sub + (x.n ? " · " + x.n + T(" soru", " q") : T(" · hâkimiyet", " · mastery"))) + "</small></div>" +
      '<div class="k-out__v"><span class="k-meter"><i style="width:' + (x.p || 0) + '%"></i></span><b>%' + x.p + "</b></div></li>";
  }

  function metaText(m) {
    if (!m) return "";
    if (m.zone === "over") return T("Emin olduğun cevapların bir kısmı yanlış çıkıyor (aşırı güven). \"Eminim\" dediğin sorularda da işlemi bir kez kontrol et; yanlış defterindeki emin-yanlış sorulara öncelik ver.",
      "Some answers you were sure about were wrong (overconfidence). Double-check even the questions you feel sure about; review sure-but-wrong items first.");
    if (m.zone === "under") return T("Bildiğin sorularda kendine yeterince güvenmiyorsun (düşük güven). Doğru yaptığın ama emin olmadığın konuları kısa tekrarla pekiştir; ilk düşüncene daha çok güvenebilirsin.",
      "You know more than you think (underconfidence). Reinforce topics you got right but felt unsure about; trust your first reasoning more.");
    return T("Eminliğin ile doğruluğun uyumlu: ne bildiğini iyi tahmin ediyorsun. Bu dengeyi korumak için soru çözerken eminlik işaretlemeye devam et.",
      "Your confidence matches your accuracy: you judge your own knowledge well. Keep rating your confidence to maintain it.");
  }

  async function render(view, params) {
    App.setTitle(T("Haftalık Üstbiliş Karnesi", "Weekly Metacognition Report"));
    const off = Math.min(0, parseInt(params[0], 10) || 0);
    const from = startOfDay(Date.now()) - 6 * DAY + off * 7 * DAY;
    const get = (s) => App.db.getAll(s).catch(() => []);
    const [sessions, quizzes] = await Promise.all([get("sessions"), get("quizzes")]);
    const mastery = App.roots ? await App.roots.mastery().catch(() => new Map()) : new Map();
    const R = compute({ sessions, quizzes, mastery }, from);
    const name = (App.prefs.get("userName", "") || "").trim();
    const range = new Date(R.from).toLocaleDateString(App.i18n.locale, { day: "numeric", month: "long" }) + " – " +
      new Date(R.to - 1).toLocaleDateString(App.i18n.locale, { day: "numeric", month: "long", year: "numeric" });
    const best = R.days.reduce((a, d) => (d.focus + d.quiz > a.focus + a.quiz ? d : a), R.days[0]);
    const m = R.meta;
    const zoneName = m ? { over: T("Aşırı güven", "Overconfident"), under: T("Düşük güven", "Underconfident"), ok: T("Dengeli", "Calibrated") }[m.zone] : "";
    const tile = (v, l) => '<div class="k-tile"><b>' + v + "</b><span>" + esc(l) + "</span></div>";

    view.innerHTML =
      '<div class="page karne-page">' +
        '<div class="page-head no-print"><div><h1>' + esc(T("Haftalık Üstbiliş Karnesi", "Weekly Metacognition Report")) + "</h1><p>" +
          esc(T("Veli ve öğrenci için tek sayfa. Yazdır düğmesiyle kâğıda ya da \"PDF olarak kaydet\" ile dosyaya al.", "One page for parents and students. Print it or choose \"Save as PDF\".")) + "</p></div>" +
          '<div class="page-head__actions"><a class="btn btn--sm" href="#/karne/' + (off - 1) + '">' + App.icon("chevronL") + esc(T("Önceki hafta", "Previous week")) + "</a>" +
            (off < 0 ? '<a class="btn btn--sm" href="#/karne/' + (off + 1) + '">' + esc(T("Sonraki hafta", "Next week")) + App.icon("chevron") + "</a>" : "") +
            '<button class="btn btn--primary" type="button" id="kPrint">' + App.icon("download") + esc(T("Yazdır / PDF", "Print / PDF")) + "</button></div></div>" +
        '<div class="k-paperwrap"><article class="k-sheet" id="kSheet">' +
          '<header class="k-head"><div><div class="k-brand">KampüsAI</div><h2>' + esc(T("Haftalık Üstbiliş Karnesi", "Weekly Metacognition Report")) + "</h2>" +
            "<p>" + esc((name ? name + " · " : "") + range) + "</p></div>" +
            '<div class="k-head__idx">' + (m ? '<span class="k-badge k-badge--' + m.zone + '">' + esc(zoneName) + "</span>" : "") + "</div></header>" +
          '<section class="k-tiles">' +
            tile(fmtMin(R.total), T("toplam çalışma", "total study")) + tile(R.activeDays + "/7", T("çalışılan gün", "active days")) +
            tile(String(R.questions), T("çözülen soru", "questions answered")) +
            tile(m ? (m.index > 0 ? "+" : "") + m.index : "–", T("üstbiliş indeksi", "metacognition index")) + "</section>" +
          '<section class="k-sec"><h3>1 · ' + esc(T("Günlük çalışma süresi (dakika)", "Daily study time (minutes)")) + "</h3>" +
            '<div class="k-daily">' + dailyChart(R) +
              '<ul class="k-legend"><li><i class="k-sw k-sw--a"></i>' + esc(T("Odak oturumu", "Focus sessions")) + '</li><li><i class="k-sw k-sw--b"></i>' + esc(T("Test çözme", "Quizzes")) + "</li>" +
              (best && best.focus + best.quiz > 0 ? "<li>" + esc(T("En verimli gün: ", "Best day: ") + new Date(best.t).toLocaleDateString(App.i18n.locale, { weekday: "long" }) + " (" + fmtMin(best.focus + best.quiz) + ")") + "</li>" : "") +
              "<li>" + esc(T("Günlük ortalama: ", "Daily average: ") + fmtMin(R.total / 7)) + "</li></ul></div></section>" +
          '<section class="k-sec k-two"><div><h3>2 · ' + esc(T("En güçlü kazanımlar", "Strongest outcomes")) + "</h3>" +
              (R.strong.length ? '<ol class="k-outs">' + R.strong.map((x) => outcomeRow(x, "s")).join("") + "</ol>" : '<p class="k-empty">' + esc(T("Bu hafta test sonucu yok.", "No quiz results this week.")) + "</p>") + "</div>" +
            "<div><h3>3 · " + esc(T("Geliştirilmesi gerekenler", "Needs work")) + "</h3>" +
              (R.weak.length ? '<ol class="k-outs">' + R.weak.map((x) => outcomeRow(x, "w")).join("") + "</ol>" : '<p class="k-empty">' + esc(T("Zayıf kazanım görünmüyor.", "No weak outcomes.")) + "</p>") + "</div></section>" +
          '<section class="k-sec"><h3>4 · ' + esc(T("Üstbiliş İndeksi: eminlik ve doğruluk", "Metacognition Index: confidence vs accuracy")) + "</h3>" +
            (m ? '<div class="k-meta"><div class="k-meta__l">' + gauge(m) +
                '<dl class="k-dl"><div><dt>' + esc(T("Ortalama eminlik", "Mean confidence")) + "</dt><dd>%" + m.meanC + "</dd></div>" +
                "<div><dt>" + esc(T("Gerçek doğruluk", "Actual accuracy")) + "</dt><dd>%" + m.acc + "</dd></div>" +
                "<div><dt>" + esc(T("İndeks (fark)", "Index (gap)")) + "</dt><dd>" + (m.index > 0 ? "+" : "") + m.index + "</dd></div>" +
                "<div><dt>" + esc(T("Kalibrasyon puanı", "Calibration score")) + "</dt><dd>" + m.calibration + "/100</dd></div>" +
                "<div><dt>" + esc(T("Emin ama yanlış", "Sure but wrong")) + "</dt><dd>" + m.sureWrong + "</dd></div>" +
                "<div><dt>" + esc(T("Emin değil ama doğru", "Unsure but right")) + "</dt><dd>" + m.unsureRight + "</dd></div></dl>" +
                '<p class="k-advice">' + esc(metaText(m)) + "</p></div>" +
              '<figure class="k-meta__r">' + calibChart(m) + calibTable(m) + "<figcaption>" + esc(T("Eminlik düzeyine göre doğruluk. Kesikli çizgi = ideal (ne kadar eminsen o kadar doğru). Çizginin altı aşırı güven, üstü düşük güven.",
                "Accuracy by confidence. Dashed line = ideal. Below it means overconfidence, above it underconfidence.")) +
                " " + esc(T("Parantez içi soru sayısı; toplam " + m.n + " soru.", "Question counts in brackets; " + m.n + " in total.")) + "</figcaption></figure></div>"
              : '<p class="k-empty">' + esc(T("Bu hafta eminlik işaretlenen soru yok. Konu testlerinde ve Sınıf Modu'nda \"Ne kadar eminsin?\" sorusunu cevaplayınca indeks hesaplanır.",
                "No confidence ratings this week. Answer \"How sure are you?\" in quizzes to compute the index.")) + "</p>") + "</section>" +
          '<footer class="k-foot"><div class="k-sign"><span>' + esc(T("Veli notu / imza", "Parent note / signature")) + '</span><i></i></div>' +
            "<p>" + esc(T("Veriler yalnızca öğrencinin cihazındaki kayıtlardan hesaplandı. İndeks = ortalama eminlik − doğruluk; ±10 arası dengeli kabul edilir.",
              "Computed only from records on the student's device. Index = mean confidence − accuracy; within ±10 counts as calibrated.")) + "</p></footer>" +
        "</article></div>" +
      "</div>";
    App.hydrateIcons(view);
    // A4'e sığdır: taşarsa yazı ölçeğini küçült (en çok 3 adım)
    const sheet = view.querySelector("#kSheet");
    for (let i = 0; i < 3 && sheet.scrollHeight > sheet.clientHeight + 1; i++) sheet.dataset.fit = String(i + 1);
    // Dar ekranda sayfayı genişliğe sığdır (yazdırma çıktısı etkilenmez)
    const wrap = view.querySelector(".k-paperwrap");
    const fit = () => {
      if (!wrap.isConnected) return;
      sheet.style.transform = ""; wrap.classList.remove("is-scaled"); wrap.style.height = "";
      const s = wrap.clientWidth / sheet.offsetWidth;
      if (s < 1) { wrap.classList.add("is-scaled"); sheet.style.transform = "scale(" + s + ")"; wrap.style.height = Math.ceil(sheet.offsetHeight * s) + "px"; }
    };
    fit();
    window.addEventListener("resize", fit);
    view.querySelector("#kPrint").addEventListener("click", () => {
      document.documentElement.classList.add("print-karne");
      const done = () => { document.documentElement.classList.remove("print-karne"); window.removeEventListener("afterprint", done); };
      window.addEventListener("afterprint", done);
      window.print();
    });
    return () => window.removeEventListener("resize", fit);
  }

  App.router.register("karne", render);
  App.karne = { compute, CONF };
})();
