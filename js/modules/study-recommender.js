/* study-recommender.js — ağ/model gerekmeden, mevcut öğrenci verisinden tek eylem.
   Öneri her açılışta hesaplanır: başka cihazdan gelen yeni sonuçlar da kullanılır. */
(function () {
  const { esc } = App.utils;
  const dayKey = (date) => { const d = new Date(date); return d.getFullYear() + "-" + d.getMonth() + "-" + d.getDate(); };
  function availableMinutes(blocks, now) {
    const min = now.getHours() * 60 + now.getMinutes();
    const toMin = (s) => { const p = String(s).split(":"); return Number(p[0]) * 60 + Number(p[1]); };
    const current = blocks.find((b) => toMin(b.start) <= min && min < toMin(b.end));
    if (current) return Math.max(1, toMin(current.end) - min);
    const next = blocks.filter((b) => toMin(b.start) > min).sort((a, b) => toMin(a.start) - toMin(b.start))[0];
    return next ? Math.max(1, toMin(next.start) - min) : 20;
  }
  function rank(items, mastery, quizzes, mistakes, progress, now) {
    const last = new Map();
    quizzes.filter((q) => q.total > 0).slice().sort((a, b) => String(b.date).localeCompare(String(a.date)))
      .forEach((q) => { if (!last.has(q.key)) last.set(q.key, q); });
    const done = new Set(progress.filter((p) => p.done).map((p) => p.id));
    const counts = new Map();
    mistakes.filter((m) => !m.mastered && m.key).forEach((m) => counts.set(m.key, (counts.get(m.key) || 0) + 1));
    // Hazır anlatımı olan (henüz yüklenmemiş olsa da: curatedContent) ya da yapay zekâyla hazırlanmış kazanımlar
    return items.filter((it) => it.outcome.content || it.outcome.curatedContent).map((it) => {
      const q = last.get(it.key), m = mastery.get(it.key);
      const accuracy = q ? (q.metacognition ? Math.min(q.metacognition.independentAccuracy, q.metacognition.learningEvidence == null ? 1 : q.metacognition.learningEvidence) : q.correct / q.total) : null;
      const today = q && dayKey(q.date) === dayKey(now);
      // Başarılı bir testi aynı gün tekrar önermeyiz; düşük sonuçlar önce özet tekrarı alır.
      if (today && accuracy >= 0.7) return null;
      const weak = m && m.status === "weak";
      const fading = m && m.parts && m.parts.fading;
      const errors = counts.get(it.key) || 0;
      let reason = weak ? "study.weak" : fading ? "study.fading" : errors ? "study.mistakes" : done.has(it.key) ? "study.check" : "study.new";
      if (accuracy !== null && accuracy < 0.7) reason = q.metacognition ? "study.supportReview" : "study.lastQuiz";
      const score = (accuracy !== null && accuracy < 0.7 ? 100 + (1 - accuracy) * 30 : 0) +
        (weak ? 70 : 0) + (fading ? 60 : 0) + Math.min(errors, 5) * 10 + (done.has(it.key) ? 5 : 10);
      return { key: it.key, score, reason, accuracy, review: accuracy !== null && accuracy < 0.5 || weak || fading };
    }).filter(Boolean).sort((a, b) => b.score - a.score);
  }
  async function recommend(now) {
    now = now || new Date();
    const [quizzes, mistakes, progress, mastery, schedule] = await Promise.all([
      App.db.getAll("quizzes"), App.db.getAll("mistakes"), App.db.getAll("progress"),
      App.roots.mastery(), App.db.get("schedules", "user")
    ]);
    const day = (now.getDay() + 6) % 7;
    const blocks = ((schedule && schedule.blocks) || []).filter((b) => Number(b.day) === day);
    const minutes = availableMinutes(blocks, now);
    const grade = App.prefs.get("curGrade", null);
    // Soğuk başlangıçta seçili sınıf; daha eski sınıflardaki ölçülmüş eksikler korunur.
    const items = App.learnmap.allOutcomes().filter((it) => !grade || String(it.grade.id) === String(grade) || mastery.has(it.key));
    const picks = rank(items, mastery, quizzes, mistakes, progress, now);
    const pick = picks[0];
    if (!pick) return { minutes, complete: true };
    // Kök eksik biliniyorsa doğrudan ön koşulu çalıştır; öneri için AI çağırma.
    const root = App.roots.rootFor ? await App.roots.rootFor(pick.key).catch(() => null) : null;
    const rf = root && App.lessons.find(root.key);
    if (rf && (rf.outcome.content || rf.outcome.curatedContent)) {
      pick.key = root.key; pick.reason = "study.root"; pick.review = true;
    }
    return Object.assign(pick, { minutes, action: pick.review || minutes < 15 ? "review" : "quiz" });
  }
  function cardHtml(item) {
    const t = App.t;
    if (item.complete) return '<section class="card study-card"><h2>' + esc(t("study.title")) + '</h2><p class="hint">' + esc(t("study.complete")) + '</p><a class="btn" href="#/konular">' + esc(t("study.explore")) + '</a></section>';
    const found = App.lessons.find(item.key);
    if (!found) return "";
    const title = App.L(found.outcome.title);
    const quiz = item.action === "quiz";
    const href = (quiz ? "#/test/" : "#/konular/") + item.key;
    return '<section class="card study-card" aria-labelledby="studyTitle"><div class="study-card__head"><h2 id="studyTitle">' +
      App.icon("target") + esc(t("study.title")) + '</h2><span class="hint">' + esc(t("study.time", { n: item.minutes })) + '</span></div>' +
      '<p class="study-card__task">' + esc(t(quiz ? "study.quiz" : "study.review", { topic: title })) + '</p>' +
      '<p class="hint">' + esc(t(item.reason, { pct: Math.round((item.accuracy || 0) * 100) })) + '</p>' +
      '<div class="study-card__actions"><a class="btn btn--primary" href="' + esc(href) + '">' + App.icon("play") + esc(t(quiz ? "study.startQuiz" : "study.startReview")) + '</a>' +
      '<a class="btn btn--ghost" href="#/harita">' + esc(t("study.map")) + '</a></div></section>';
  }
  /** Görünüm yaşam döngüsüne bağlı; eşitleme ve dakika değişiminde yalnızca kart güncellenir. */
  function mount(element) {
    if (!element) return () => {};
    let disposed = false, timer = null, revision = 0;
    async function refresh() {
      const mine = ++revision;
      try {
        const item = await recommend();
        if (disposed || mine !== revision || !element.isConnected) return;
        element.innerHTML = cardHtml(item);
        App.hydrateIcons(element);
      } catch (error) {
        if (disposed || mine !== revision || !element.isConnected) return;
        element.innerHTML = '<section class="card study-card"><p class="hint">' + esc(App.t("study.failed")) + '</p><a class="btn" href="#/konular">' + esc(App.t("study.explore")) + '</a></section>';
      }
    }
    const stores = ["quizzes", "mistakes", "progress", "schedules", "checks", "cards", "explains", "lessons", "meta"];
    const unsubscribe = App.db.on("*", (store) => {
      if (!stores.includes(store)) return;
      clearTimeout(timer);
      timer = setTimeout(refresh, 250);
    });
    const minute = setInterval(refresh, 60000);
    refresh();
    return () => { disposed = true; revision++; clearTimeout(timer); clearInterval(minute); unsubscribe(); };
  }
  App.study = { availableMinutes, rank, recommend, cardHtml, mount };
})();
