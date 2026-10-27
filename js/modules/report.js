/* =========================================================
   report.js — Haftalık gelişim raporu   (#/rapor)

   Son 7 gün, önceki 7 günle karşılaştırılır: çalışılan gün, odak süresi,
   konu testleri ve başarı, güçlenen kazanımlar, deneme netlerindeki değişim,
   yanlış defteri, seri ve unutulmaya başlayan konular. Gelecek hafta için
   odaklanılacak 3 konu önerilir.
   Yazdırılabilir (PDF olarak kaydedilebilir) ve metin olarak paylaşılabilir;
   "Öğretmenime gönder" anonim sınıf özetini (classroom.js) açar.
   ========================================================= */
(function () {
  const { esc } = App.utils;
  const T = (tr, en) => (App.i18n.lang === "en" ? en : tr);
  const L = App.L;
  const DAY = 86400000;

  const dayKey = (d) => App.learnmap.dayKey(d);
  const fmt = (n, d) => (n == null || isNaN(n) ? "–" : Number(n).toLocaleString(App.i18n.locale, { maximumFractionDigits: d == null ? 1 : d }));
  const inRange = (iso, from, to) => { const x = Date.parse(iso); return !isNaN(x) && x >= from && x < to; };

  async function collect() {
    const get = (s) => App.db.getAll(s).catch(() => []);
    const [quizzes, exams, sessions, mistakes, explains] = await Promise.all(["quizzes", "exams", "sessions", "mistakes", "explains"].map(get));
    const M = await App.roots.mastery().catch(() => new Map());
    const days = App.badges ? await App.badges.activeDays() : new Set();
    const st = App.badges ? await App.badges.state() : null;
    return { quizzes, exams, sessions, mistakes, explains, M, days, st };
  }

  function weekStats(D, from, to) {
    const q = D.quizzes.filter((x) => inRange(x.date, from, to));
    const avg = q.length ? q.reduce((a, x) => a + (x.total ? x.correct / x.total : 0), 0) / q.length * 100 : null;
    const strongKeys = new Set(q.filter((x) => x.total && x.correct / x.total >= 0.7).map((x) => x.key));
    let studyDays = 0;
    for (let t = from; t < to; t += DAY) if (D.days.has(dayKey(new Date(t)))) studyDays++;
    return {
      studyDays,
      focus: D.sessions.filter((s) => inRange(s.end || s.start, from, to)).reduce((a, s) => a + (Number(s.minutes) || 0), 0),
      quizzes: q.length, avg, strong: strongKeys.size,
      misAdded: D.mistakes.filter((m) => inRange(m.createdAt, from, to)).length,
      misLearned: D.mistakes.filter((m) => m.mastered && inRange(m.lastReviewAt, from, to)).length,
      explains: D.explains.filter((x) => inRange(x.date, from, to)).length
    };
  }

  function netTrend(D, type) {
    const list = App.exams.sortChrono(D.exams.filter((e) => e.type === type));
    if (!list.length) return null;
    const last = list[list.length - 1], prev = list[list.length - 2];
    const lt = App.exams.compute(last).total;
    return { name: last.name, net: lt, diff: prev ? lt - App.exams.compute(prev).total : null };
  }

  function focusNext(D) {
    const all = App.learnmap.allOutcomes();
    const byKey = new Map(all.map((x) => [x.key, x]));
    const list = [];
    D.M.forEach((m, key) => {
      const it = byKey.get(key);
      if (!it || !it.outcome.content) return;
      if (m.status === "weak" || (m.parts && m.parts.fading)) list.push({ key, it, m, rank: m.parts && m.parts.fading ? 40 : m.score || 0 });
    });
    return list.sort((a, b) => a.rank - b.rank).slice(0, 3);
  }

  const delta = (a, b, unit, d) => {
    if (a == null || b == null) return "";
    const x = a - b;
    if (Math.abs(x) < 0.05) return '<span class="rep-d">=</span>';
    return '<span class="rep-d ' + (x > 0 ? "is-up" : "is-down") + '">' + (x > 0 ? "▲ +" : "▼ ") + fmt(x, d) + (unit || "") + "</span>";
  };

  async function render(view) {
    App.setTitle(T("Haftalık Rapor", "Weekly Report"));
    const D = await collect();
    const now = Date.now();
    const end = new Date(); end.setHours(24, 0, 0, 0);
    const to = end.getTime(), from = to - 7 * DAY, pfrom = from - 7 * DAY;
    const W = weekStats(D, from, to), P = weekStats(D, pfrom, from);
    const tyt = netTrend(D, "TYT"), ayt = netTrend(D, "AYT");
    const next = focusNext(D);
    let fading = 0, strong = 0; D.M.forEach((m) => { if (m.parts && m.parts.fading) fading++; if (m.status === "strong") strong++; });
    const streak = D.st ? D.st.streak.current : 0;
    const rangeTxt = new Date(from).toLocaleDateString(App.i18n.locale, { day: "numeric", month: "long" }) + " – " +
      new Date(to - 1).toLocaleDateString(App.i18n.locale, { day: "numeric", month: "long", year: "numeric" });

    const tile = (icon, val, label, d) => '<div class="rep-tile">' + App.icon(icon) + '<b>' + val + "</b><span>" + esc(label) + "</span>" + (d || "") + "</div>";
    const netRow = (n, ty) => n ? "<li><b>" + ty + "</b> " + esc(T("son deneme", "last exam")) + ": <b>" + fmt(n.net, 2) + " net</b> " + (n.diff != null ? delta(n.net, n.net - n.diff, " net", 2) + " " + esc(T("öncekine göre", "vs previous")) : "") + "</li>" : "";

    const summary = [];
    summary.push(T("Bu hafta " + W.studyDays + " gün çalıştın", "You studied " + W.studyDays + " days this week") + (P.studyDays ? T(" (geçen hafta " + P.studyDays + ")", " (last week " + P.studyDays + ")") : "") + ".");
    if (W.quizzes) summary.push(T(W.quizzes + " konu testi çözdün, ortalama başarın %" + fmt(W.avg, 0) + ".", W.quizzes + " quizzes, average " + fmt(W.avg, 0) + "%."));
    if (W.strong) summary.push(T(W.strong + " kazanımda %70'in üstüne çıktın.", "Scored 70%+ on " + W.strong + " outcomes."));
    if (fading) summary.push(T(fading + " konu unutulmaya başladı; tekrar zamanı.", fading + " topics are fading; time to review."));

    view.innerHTML =
      '<div class="page report-page">' +
        '<div class="page-head"><div><h1>' + esc(T("Haftalık Gelişim Raporu", "Weekly Progress Report")) + "</h1><p>" + esc(rangeTxt) + "</p></div>" +
          '<div class="page-head__actions no-print">' +
            '<a class="btn" href="#/karne">' + App.icon("chart") + esc(T("Üstbiliş karnesi (A4)", "Metacognition report (A4)")) + "</a>" +
            '<button class="btn" type="button" id="repPrint">' + App.icon("download") + esc(T("Yazdır / PDF", "Print / PDF")) + "</button>" +
            '<button class="btn" type="button" id="repShare">' + App.icon("send") + esc(T("Paylaş", "Share")) + "</button>" +
            '<button class="btn btn--primary" type="button" id="repTeacher">' + App.icon("grad") + esc(T("Öğretmenime gönder", "Send to my teacher")) + "</button>" +
          "</div></div>" +
        '<section class="card rep-summary"><p>' + esc(summary.join(" ")) + "</p></section>" +
        '<div class="rep-tiles">' +
          tile("calendar", W.studyDays + "/7", T("çalışılan gün", "study days"), delta(W.studyDays, P.studyDays, "", 0)) +
          tile("timer", fmt(W.focus / 60, 1) + T(" sa", " h"), T("odak süresi", "focus time"), delta(W.focus / 60, P.focus / 60, T(" sa", " h"), 1)) +
          tile("quiz", String(W.quizzes), T("konu testi", "quizzes"), delta(W.quizzes, P.quizzes, "", 0)) +
          tile("target", W.avg == null ? "–" : "%" + fmt(W.avg, 0), T("test başarısı", "quiz score"), delta(W.avg, P.avg, "", 0)) +
          tile("checkCircle", String(W.strong), T("güçlenen kazanım", "outcomes strengthened"), delta(W.strong, P.strong, "", 0)) +
          tile("flag", String(streak), T("günlük seri", "day streak"), "") +
        "</div>" +
        '<div class="rep-cols">' +
          '<section class="card"><div class="card__title">' + App.icon("chart") + esc(T("Denemeler", "Practice exams")) + "</div>" +
            (tyt || ayt ? '<ul class="about-list">' + netRow(tyt, "TYT") + netRow(ayt, "AYT") + "</ul>" : '<p class="hint">' + esc(T("Henüz deneme kaydı yok.", "No exams yet.")) + "</p>") + "</section>" +
          '<section class="card"><div class="card__title">' + App.icon("bookmark") + esc(T("Yanlış defteri", "Mistake notebook")) + "</div>" +
            '<ul class="about-list"><li>' + esc(T("Bu hafta eklenen: ", "Added this week: ")) + "<b>" + W.misAdded + "</b></li><li>" + esc(T("Bu hafta öğrenilen: ", "Learned this week: ")) + "<b>" + W.misLearned + "</b></li>" +
            "<li>" + esc(T("Toplam güçlü kazanım: ", "Strong outcomes in total: ")) + "<b>" + strong + "</b></li></ul></section>" +
        "</div>" +
        '<section class="card"><div class="card__title">' + App.icon("target") + esc(T("Gelecek hafta odaklan", "Focus next week")) + "</div>" +
          (next.length ? '<ol class="rep-next">' + next.map((x) => '<li><a href="#/konular/' + esc(x.key) + '">' + esc(L(x.it.outcome.title)) + "</a><small>" +
            esc(App.data.curriculum.gradeName(x.it.grade) + " · " + L(x.it.subject.name) + " · " + (x.m.parts && x.m.parts.fading ? T("unutulmaya başladı", "fading") : T("zayıf", "weak") + " (" + x.m.score + ")")) + "</small></li>").join("") + "</ol>"
            : '<p class="hint">' + esc(T("Zayıf ya da unutulan konu yok. Yeni konulara geçebilirsin.", "No weak or fading topics.")) + "</p>") +
        "</section>" +
        '<p class="hint rep-foot">' + esc(T("KampüsAI haftalık raporu · veriler yalnızca bu cihazdan", "KampüsAI weekly report · data from this device only")) + "</p>" +
      "</div>";
    App.hydrateIcons(view);

    const root = view.firstElementChild;
    root.querySelector("#repPrint").addEventListener("click", () => window.print());
    root.querySelector("#repShare").addEventListener("click", async () => {
      const text = T("KampüsAI haftalık rapor (", "KampüsAI weekly report (") + rangeTxt + ")\n" + summary.join(" ") +
        (tyt ? "\nTYT: " + fmt(tyt.net, 2) + " net" : "") + (ayt ? "\nAYT: " + fmt(ayt.net, 2) + " net" : "") +
        (next.length ? "\n" + T("Gelecek hafta: ", "Next week: ") + next.map((x) => L(x.it.outcome.title)).join("; ") : "");
      try {
        if (navigator.share) await navigator.share({ title: T("Haftalık rapor", "Weekly report"), text });
        else { await navigator.clipboard.writeText(text); App.ui.toast(T("Rapor metni kopyalandı.", "Report copied.")); }
      } catch (e) { /* vazgeçildi */ }
    });
    root.querySelector("#repTeacher").addEventListener("click", () => App.classroom && App.classroom.sendToTeacher());
  }

  App.router.register("rapor", render);
  App.report = { render, weekStats };
})();
