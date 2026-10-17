/* =========================================================
   badges.js — Çalışma serisi ve rozetler

   Seri: arka arkaya çalışılan gün sayısı. "Çalışılan gün" = o gün en az bir iz bırakılmış:
     sohbette soru, konu testi, deneme kaydı, odak oturumu, Feynman anlatımı, çözüm kontrolü,
     konu "çalıştım" işareti, yanlış tekrarı ya da günlük görevlerin tamamı.
   Bugün henüz bir şey yapılmadıysa seri dünden sayılır ("bugün de çalış, seri sürsün").
   Rozetler verilerden hesaplanır (ayrı kayıt tutulmaz); yalnızca "görülen" rozetler
   App.prefs'te tutulur ki yeni kazanılan rozet bir kez kutlansın.
   ========================================================= */
(function () {
  const { esc } = App.utils;
  const T = (tr, en) => (App.i18n.lang === "en" ? en : tr);
  const dayKey = (d) => { const x = new Date(d); return isNaN(x) ? null : x.getFullYear() + "-" + String(x.getMonth() + 1).padStart(2, "0") + "-" + String(x.getDate()).padStart(2, "0"); };

  async function collect() {
    const get = (s) => App.db.getAll(s).catch(() => []);
    const [chats, quizzes, exams, sessions, explains, checks, progress, mistakes, meta] =
      await Promise.all(["chats", "quizzes", "exams", "sessions", "explains", "checks", "progress", "mistakes", "meta"].map(get));
    return { chats, quizzes, exams, sessions, explains, checks, progress, mistakes, meta };
  }

  function activeDays(D) {
    const days = new Set();
    const add = (d) => { const k = d && dayKey(d); if (k) days.add(k); };
    D.chats.forEach((c) => (c.messages || []).forEach((m) => { if (m.role === "user") add(m.at || c.createdAt); }));
    D.quizzes.forEach((q) => add(q.date));
    D.exams.forEach((e) => add(e.createdAt || e.date));
    D.sessions.forEach((s) => add(s.end || s.start));
    D.explains.forEach((x) => add(x.date));
    D.checks.forEach((c) => add(c.date));
    D.progress.forEach((p) => add(p.at));
    D.mistakes.forEach((m) => { add(m.createdAt); add(m.lastReviewAt); });
    D.meta.forEach((r) => { if (String(r.id).indexOf("daily:") === 0 && r.completed) add(r.date); });
    return days;
  }

  function streaks(days) {
    const d = new Date();
    if (!days.has(dayKey(d))) d.setDate(d.getDate() - 1);         // bugün henüz yok: dünden say
    let current = 0;
    while (days.has(dayKey(d))) { current++; d.setDate(d.getDate() - 1); }
    // En uzun seri
    const sorted = Array.from(days).sort();
    let best = 0, run = 0, prev = null;
    sorted.forEach((k) => {
      const t = Date.parse(k + "T12:00:00");
      run = prev != null && Math.round((t - prev) / 86400000) === 1 ? run + 1 : 1;
      best = Math.max(best, run);
      prev = t;
    });
    return { current, best: Math.max(best, current), today: days.has(dayKey(new Date())) };
  }

  /** Rozet tanımları: id, simge, ad, açıklama, ilerleme(D, ctx) → [şu an, hedef] */
  const BADGES = [
    { id: "ilk",     icon: "sparkle",     tr: ["İlk adım", "Uygulamada ilk çalışmanı yaptın"],             en: ["First step", "You did your first study session"], p: (D, c) => [Math.min(1, c.days.size), 1] },
    { id: "seri3",   icon: "flag",        tr: ["3 gün seri", "3 gün arka arkaya çalıştın"],                 en: ["3-day streak", "Studied 3 days in a row"], p: (D, c) => [c.s.best, 3] },
    { id: "seri7",   icon: "flag",        tr: ["Bir hafta", "7 gün arka arkaya çalıştın"],                  en: ["One week", "Studied 7 days in a row"], p: (D, c) => [c.s.best, 7] },
    { id: "seri30",  icon: "grad",        tr: ["Bir ay", "30 gün arka arkaya çalıştın"],                    en: ["One month", "Studied 30 days in a row"], p: (D, c) => [c.s.best, 30] },
    { id: "deneme1", icon: "chart",       tr: ["İlk deneme", "İlk denemeni kaydettin"],                    en: ["First exam", "Saved your first practice exam"], p: (D) => [D.exams.length, 1] },
    { id: "deneme10",icon: "chart",       tr: ["Deneme kurdu", "10 deneme kaydettin"],                     en: ["Exam regular", "Saved 10 practice exams"], p: (D) => [D.exams.length, 10] },
    { id: "net10",   icon: "arrowUp",     tr: ["+10 net", "Bir sınav türünde ilk denemene göre 10 net arttın"], en: ["+10 nets", "Gained 10 nets over your first exam"], p: (D) => [netGain(D), 10] },
    { id: "test10",  icon: "quiz",        tr: ["Test ustası", "10 konu testi çözdün"],                      en: ["Quiz master", "Took 10 topic quizzes"], p: (D) => [D.quizzes.length, 10] },
    { id: "tam",     icon: "checkCircle", tr: ["Tam isabet", "Bir konu testinde hepsini doğru yaptın"],      en: ["Bullseye", "Got every question right in a quiz"], p: (D) => [D.quizzes.some((q) => q.total && q.correct === q.total) ? 1 : 0, 1] },
    { id: "yanlis10",icon: "bookmark",    tr: ["Yanlış avcısı", "Yanlış defterinde 10 soruyu öğrendin"],    en: ["Mistake hunter", "Mastered 10 notebook questions"], p: (D) => [D.mistakes.filter((m) => m.mastered).length, 10] },
    { id: "odak10",  icon: "timer",       tr: ["Odak", "Odak sayacıyla toplam 10 saat çalıştın"],           en: ["Focus", "10 hours with the focus timer"], p: (D) => [Math.floor(D.sessions.reduce((a, s) => a + (Number(s.minutes) || 0), 0) / 60), 10] },
    { id: "feynman", icon: "mic",         tr: ["Öğretmen gibi", "Feynman modunda 80+ puan aldın"],          en: ["Like a teacher", "Scored 80+ in Feynman mode"], p: (D) => [D.explains.some((x) => Number(x.score) >= 80) ? 1 : 0, 1] },
    { id: "harita20",icon: "target",      tr: ["Sağlam temel", "20 kazanım güçlü seviyede"],               en: ["Solid base", "20 outcomes at strong level"], p: (D, c) => [c.strong, 20] },
    { id: "gunluk5", icon: "calendar",    tr: ["Günlük görev", "Bugünün 20 dakikası'nı 5 gün tamamladın"], en: ["Daily goal", "Completed Today's 20 minutes on 5 days"], p: (D) => [D.meta.filter((r) => String(r.id).indexOf("daily:") === 0 && r.completed).length, 5] },
    { id: "hedef",   icon: "target",      tr: ["Hedefim belli", "Puan ve Hedef'te hedef bölümünü seçtin"],  en: ["Goal set", "Set your target program"], p: (D) => [D.meta.some((r) => r.id === "scoreTarget" && r.base) ? 1 : 0, 1] }
  ];

  function netGain(D) {
    let best = 0;
    ["TYT", "AYT"].forEach((ty) => {
      const list = App.exams.sortChrono(D.exams.filter((e) => e.type === ty));
      if (list.length < 2) return;
      const first = App.exams.compute(list[0]).total;
      const max = Math.max(...list.slice(1).map((e) => App.exams.compute(e).total));
      best = Math.max(best, Math.floor(max - first));
    });
    return best;
  }

  async function state() {
    const D = await collect();
    const days = activeDays(D);
    const s = streaks(days);
    let strong = 0;
    try { (await App.roots.mastery()).forEach((m) => { if (m.status === "strong") strong++; }); } catch (e) { /* yok */ }
    const ctx = { days, s, strong };
    const list = BADGES.map((b) => {
      const [cur, goal] = b.p(D, ctx);
      const txt = App.i18n.lang === "en" ? b.en : b.tr;
      return { id: b.id, icon: b.icon, name: txt[0], desc: txt[1], cur: Math.max(0, Math.min(cur, goal)), goal, earned: cur >= goal };
    });
    return { streak: s, list, earned: list.filter((b) => b.earned) };
  }

  /** Yeni kazanılan rozetleri bir kez kutla */
  let checking = null;
  function check() {
    if (checking) return checking;
    checking = (async () => {
      try {
        const st = await state();
        const seen = App.prefs.get("badgesSeen", null);
        const ids = st.earned.map((b) => b.id);
        if (seen === null) { App.prefs.set("badgesSeen", ids); return st; }   // ilk açılış: eskileri kutlama
        const fresh = st.earned.filter((b) => !seen.includes(b.id));
        if (fresh.length) {
          App.prefs.set("badgesSeen", ids);
          fresh.slice(0, 2).forEach((b, i) => setTimeout(() => App.ui.toast("🏅 " + T("Yeni rozet: ", "New badge: ") + b.name + " — " + b.desc), i * 2500));
        }
        return st;
      } catch (e) { return null; } finally { setTimeout(() => { checking = null; }, 3000); }
    })();
    return checking;
  }

  async function cardHtml() {
    const st = await state();
    const s = st.streak;
    const next = st.list.filter((b) => !b.earned).sort((a, b) => b.cur / b.goal - a.cur / a.goal)[0];
    return '<div class="badges">' +
      '<div class="streak' + (s.current ? " is-on" : "") + '"><span class="streak__n">' + s.current + '</span><span class="streak__l">' +
        esc(T("günlük seri", "day streak")) + "<small>" + esc(s.current && !s.today ? T("Bugün de çalış, seri sürsün!", "Study today to keep it going!")
          : T("En uzun: " + s.best + " gün", "Best: " + s.best + " days")) + "</small></span></div>" +
      '<div class="badge-grid">' + st.list.map((b) =>
        '<span class="badge-i' + (b.earned ? " is-earned" : "") + '" title="' + esc(b.name + " — " + b.desc + (b.earned ? "" : " (" + b.cur + "/" + b.goal + ")")) + '">' +
          App.icon(b.icon) + "<small>" + esc(b.name) + "</small></span>").join("") + "</div>" +
      (next ? '<p class="hint">' + esc(T("Sıradaki rozet: ", "Next badge: ") + next.name + " — " + next.desc + " (" + next.cur + "/" + next.goal + ")") + "</p>" : "") +
      "</div>";
  }

  // Her sayfa geçişinde (en fazla 20 sn'de bir) yeni rozet var mı bak
  let last = 0;
  window.addEventListener("hashchange", () => { if (Date.now() - last > 20000) { last = Date.now(); setTimeout(check, 1500); } });
  setTimeout(check, 4000);

  App.badges = { state, check, cardHtml, BADGES, activeDays: async () => activeDays(await collect()) };
})();
