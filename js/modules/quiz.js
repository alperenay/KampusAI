/* =========================================================
   quiz.js — Konu sonu testi   (#/test/<sınıf>/<ders>/<ünite>/<kazanım>)

   Yapay zeka, kazanımın anlatımından 30 soruluk etiketli havuz üretir.
   Geçmiş sonuçlar ve her cevap, sıradaki 10 test sorusunun zorluğunu belirler. Test bitince doğru/yanlış/boş sayılır,
   açıklamalar gösterilir; yanlış ve boş sorular yanlış defterine eklenir.
   Sonuç IndexedDB "quizzes" deposuna kaydedilir.
   ========================================================= */
(function () {
  const { esc, uid } = App.utils;
  const t = App.t, L = App.L;
  const C = () => App.data.curriculum;
  const N = 10;
  const LETTERS = "ABCDE";
  const POOL_SIZE = 30;
  let renderEpoch = 0;

  const plain = (s) => {
    const doc = new DOMParser().parseFromString("<body>" + String(s || "") + "</body>", "text/html");
    return doc.body.textContent;
  };
  const inline = (s) => App.markdown.render(String(s == null ? "" : s)).replace(/^<p>([\s\S]*)<\/p>$/, "$1");

  /** Kazanımın içeriğini modele verilecek metne çevir */
  function lessonText(outcome) {
    const ct = outcome.content || {};
    const parts = [];
    if (ct.anlatim) parts.push(plain(L(ct.anlatim)));
    (ct.ornekler || []).forEach((o, i) => parts.push("Örnek " + (i + 1) + ": " + plain(L(o.soru)) + " / Çözüm: " + plain(L(o.cozum))));
    if (ct.ozet && ct.ozet.length) parts.push("Hap bilgiler: " + ct.ozet.map((x) => plain(L(x))).join(" | "));
    return parts.join("\n\n").slice(0, 7000);
  }

  function prompts(grade, subject, unit, outcome) {
    const tr = App.i18n.lang === "tr";
    const lesson = lessonText(outcome);
    const system = tr
      ? "Sen deneyimli bir lise öğretmeni ve YKS soru yazarısın. Yalnızca geçerli JSON döndür; açıklama ya da Markdown kod bloğu ekleme."
      : "You are an experienced high-school teacher and YKS exam question writer. Return only valid JSON; no explanations or Markdown code fences.";
    const head = (tr ? "Sınıf: " : "Grade: ") + grade.id + "\n" + (tr ? "Ders: " : "Subject: ") + L(subject.name) + "\n" +
      (tr ? "Ünite: " : "Unit: ") + L(unit.name) + "\n" + (tr ? "Kazanım: " : "Learning outcome: ") + L(outcome.title) + (outcome.code ? " (" + outcome.code + ")" : "");
    const rules = tr ? [
      "Bu kazanım için TAM " + POOL_SIZE + " soruluk bir uyarlanan test havuzu hazırla.",
      "- Her soru 5 seçenekli (A–E) ve tek doğru cevaplı olsun; şıkların başına harf yazma.",
      "- Zorluk: 10 kolay, 10 orta, 10 zor. Her soruya difficulty alanı ekle: kolay=1, orta=2, zor=3. Sorular YKS (TYT/AYT) tarzında olsun.",
      "- Yalnızca bu kazanımın konusundan sor; aşağıdaki konu anlatımına sadık kal, ama ondaki örnekleri aynen kopyalama.",
      "- Matematiksel ifadeleri LaTeX ile yaz ($...$). JSON içinde ters bölüleri çift yaz (\\\\frac gibi).",
      "- \"Hepsi\" / \"Hiçbiri\" şıkkı kullanma. Doğru cevapların harfleri dengeli dağılsın.",
      "- Her soruya en fazla 3 cümlelik kısa bir çözüm/açıklama yaz.",
      "Biçim: {\"questions\":[{\"q\":\"soru metni\",\"options\":[\"…\",\"…\",\"…\",\"…\",\"…\"],\"answer\":0,\"difficulty\":2,\"explain\":\"…\"}]}  (answer: doğru şıkkın 0'dan başlayan sırası)"
    ] : [
      "Write an adaptive question pool with EXACTLY " + POOL_SIZE + " questions for this learning outcome, in English.",
      "- Each question has 5 options (A–E) and one correct answer; don't prefix options with letters.",
      "- Difficulty: 10 easy, 10 medium, 10 hard, in YKS style. Include difficulty on every question: easy=1, medium=2, hard=3.",
      "- Stay strictly within this outcome and the lesson below, but don't copy its examples verbatim.",
      "- Write math in LaTeX ($...$). Escape backslashes in JSON (\\\\frac).",
      "- No \"all of the above\" / \"none\". Spread the correct letters evenly.",
      "- Add a short solution/explanation (max 3 sentences) for each question.",
      "Format: {\"questions\":[{\"q\":\"…\",\"options\":[\"…\",\"…\",\"…\",\"…\",\"…\"],\"answer\":0,\"difficulty\":2,\"explain\":\"…\"}]}  (answer: 0-based index)"
    ];
    return { system, prompt: head + "\n\n" + rules.join("\n") + "\n\n" + (tr ? "KONU ANLATIMI:\n" : "LESSON:\n") + lesson };
  }

  /** Modelin döndürdüğünü doğrula ve düzelt */
  function normalize(data, adaptive) {
    const list = (data && (data.questions || data.sorular)) || (Array.isArray(data) ? data : []);
    const out = [];
    if (!Array.isArray(list)) return [];
    const seen = new Set();
    list.forEach((x) => {
      if (!x) return;
      const q = String(x.q || x.question || x.soru || "").trim();
      const rawOptions = x.options || x.secenekler || x.choices || [];
      if (!Array.isArray(rawOptions)) return;
      let options = rawOptions.map((o) => String(o).replace(/^\s*[A-Ea-e][\)\.:]\s+/, "").trim()).filter(Boolean);
      let answer = x.answer != null ? x.answer : x.cevap != null ? x.cevap : x.correct;
      if (typeof answer === "string") answer = /^[A-Ea-e]$/.test(answer.trim()) ? LETTERS.indexOf(answer.trim().toUpperCase()) : options.indexOf(answer.trim());
      if (answer == null || answer === "" || typeof answer === "boolean") return;
      answer = Number(answer);
      if (!q || options.length < 4 || options.length > 5 || !(Number.isInteger(answer) && answer >= 0 && answer < options.length)) return;
      const difficulty = Number(x.difficulty);
      if (adaptive && ![1, 2, 3].includes(difficulty)) return;
      const signature = q.toLocaleLowerCase().replace(/\s+/g, " ");
      if (seen.has(signature) || new Set(options).size !== options.length) return;
      seen.add(signature);
      out.push({ q, options, answer, difficulty: [1, 2, 3].includes(difficulty) ? difficulty : 2, explain: String(x.explain || x.aciklama || x.explanation || "").trim() });
    });
    return out.slice(0, adaptive ? POOL_SIZE : N);
  }

  const outcomeLabel = (grade, subject, unit, outcome) =>
    C().gradeName(grade) + " · " + L(subject.name) + " · " + L(outcome.title);

  async function render(view, p) {
    const epoch = ++renderEpoch;
    const myHash = location.hash;
    const gone = () => epoch !== renderEpoch || location.hash !== myHash;
    const grade = C().findGrade(p[0]);
    const subject = grade && C().findSubject(p[0], p[1]);
    const unit = subject && subject.units.find((u) => u.id === p[2]);
    const outcome = unit && unit.outcomes.find((k) => k.id === p[3]);
    if (!outcome) { App.router.go("konular"); return; }
    const key = C().key(grade.id, subject.id, unit.id, outcome.id);
    const back = "#/konular/" + key;
    App.setTitle(t("quiz.title"));
    const ctrl = new AbortController();
    const history = await App.db.getAll("quizzes");
    if (gone()) return;
    const startAbility = App.adaptive.initial(history, key);
    let ability = startAbility;
    const used = new Set();
    let pool = [];
    const validPool = (list) => list.length >= N && [1, 2, 3].every((d) => list.filter((q) => q.difficulty === d).length >= 2);

    const head =
      '<div class="page-head"><div>' +
        '<nav class="crumbs"><a href="' + back + '">' + App.icon("chevronL") + esc(L(outcome.title)) + "</a></nav>" +
        '<h1 style="margin-top:8px">' + esc(t("quiz.title")) + "</h1><p>" + esc(t("quiz.sub", { n: N })) + "</p></div></div>";

    const loading = (model) => {
      view.innerHTML = '<div class="page page--narrow">' + head +
        '<div class="card quiz-loading"><div class="stage"><span class="spinner"></span>' + App.icon("sparkle") +
        "<span>" + esc(t("quiz.generating")) + "</span>" + (model ? "<code>" + esc(model) + "</code>" : "") + '<span class="stage__time" id="qTime"></span></div>' +
        '<p class="hint">' + esc(t("quiz.generatingHint")) + "</p></div></div>";
      App.hydrateIcons(view);
    };
    loading("");
    const started = Date.now();
    const tick = setInterval(() => { const el = view.querySelector("#qTime"); if (el) el.textContent = t("ai.seconds", { n: Math.round((Date.now() - started) / 1000) }); }, 1000);

    let questions = [], model = "";
    try {
      const pr = prompts(grade, subject, unit, outcome);
      let res = await App.ai.generate(Object.assign({}, pr, { temperature: 0.8, signal: ctrl.signal, onStage: (eng, m) => { if (!gone()) loading(m); } }));
      if (gone()) { clearInterval(tick); return; }
      pool = normalize(res.data, true);
      if (!validPool(pool)) {                                  // eksik geldiyse bir kez daha dene
        res = await App.ai.generate(Object.assign({}, pr, { temperature: 0.6, signal: ctrl.signal }));
        pool = normalize(res.data, true);
      }
      if (gone()) { clearInterval(tick); return; }
      model = res.model;
      if (!validPool(pool)) throw new Error(t("quiz.badOutput"));
    } catch (e) {
      clearInterval(tick);
      if (ctrl.signal.aborted || gone()) return;
      view.innerHTML = '<div class="page page--narrow">' + head +
        '<div class="msg__error"><b>' + esc(t("quiz.failed")) + "</b><p>" + esc(errorText(e)) + '</p><div class="msg__error-actions">' +
        '<button class="btn btn--sm" type="button" id="qRetry">' + App.icon("refresh") + esc(t("ai.retry")) + '</button><a class="btn btn--sm btn--ghost" href="' + back + '">' + esc(t("quiz.backToLesson")) + "</a></div></div></div>";
      App.hydrateIcons(view);
      view.querySelector("#qRetry").addEventListener("click", () => App.router.refresh());
      return () => ctrl.abort();
    }
    clearInterval(tick);
    if (gone()) return;

    const answers = [];
    let finished = false, committing = false, finalAnswerLocked = false;
    let savedQuiz = false;
    const savedMistakes = new Set();
    const quizId = uid("quiz");
    let current = 0;
    function appendQuestion() {
      const selected = App.adaptive.pick(pool, used, ability);
      used.add(selected.i); questions.push(selected.q); answers.push(-1);
    }
    appendQuestion();

    function qHtml(q, i) {
      return '<section class="card quiz-q" data-i="' + i + '"><div class="quiz-q__head"><b>' + esc(t("quiz.question", { n: i + 1 })) + '</b><span class="quiz-q__mark"></span></div>' +
        '<div class="md quiz-q__text">' + App.markdown.render(q.q) + "</div>" +
        '<ol class="opts">' + q.options.map((o, j) =>
          '<li><button type="button" class="opt" data-q="' + i + '" data-o="' + j + '"><span class="opt__letter">' + LETTERS[j] + '</span><span class="opt__text md">' + inline(o) + "</span></button></li>").join("") + "</ol>" +
        '<div class="quiz-q__explain" hidden></div></section>';
    }

    view.innerHTML = '<div class="page page--narrow">' + head +
      '<div class="quiz-meta hint">' + esc(t("quiz.madeBy", { model })) + "</div>" +
      '<p class="hint adaptive-help">' + esc(t("adaptive.intro")) + '</p><div id="adaptiveQuestions">' + questions.map(qHtml).join("") + '</div>' +
      '<div class="quiz-finish card"><span class="hint" id="qProgress" role="status" aria-live="polite"></span><button class="btn btn--ghost" type="button" id="qSkip">' + esc(t("adaptive.skip")) + '</button><button class="btn btn--primary" type="button" id="qFinish">' + App.icon("check") + esc(t("adaptive.next")) + "</button></div>" +
      '<div id="qResult"></div></div>';
    App.hydrateIcons(view);

    const progress = () => {
      view.querySelector("#qProgress").textContent = t("adaptive.progress", { n: current + 1, total: N, level: t("adaptive.level" + questions[current].difficulty) });
      const next = view.querySelector("#qFinish");
      next.textContent = t(current === N - 1 ? "quiz.finish" : "adaptive.next");
      next.disabled = answers[current] < 0;
    };
    progress();

    const onClick = async (e) => {
      const sb = e.target.closest("[data-sim-i]");
      if (sb) {
        const q = questions[Number(sb.dataset.simI)];
        App.similar.open({ q: q.q, options: q.options, answer: q.answer, explain: q.explain, label: outcomeLabel(grade, subject, unit, outcome), key });
        return;
      }
      const fq = e.target.closest("[data-fb-q]");
      if (fq && App.feedback) {
        const i = Number(fq.dataset.fbQ);
        App.feedback.onQuestion(fq, questions[i], { key, label: outcomeLabel(grade, subject, unit, outcome), model, chosen: answers[i] });
        return;
      }
      const b = e.target.closest(".opt[data-q]");
      if (b && !finished && !committing && !finalAnswerLocked && Number(b.dataset.q) === current) {
        const i = Number(b.dataset.q), j = Number(b.dataset.o);
        answers[i] = answers[i] === j ? -1 : j;                  // aynı şıkka tekrar basınca boş bırak
        view.querySelectorAll('.opt[data-q="' + i + '"]').forEach((x) => x.classList.toggle("is-picked", Number(x.dataset.o) === answers[i]));
        progress();
        return;
      }
      const skip = e.target.closest("#qSkip");
      if ((skip || e.target.closest("#qFinish")) && !finished && !committing) {
        if (!skip && answers[current] < 0 && !finalAnswerLocked) return;
        committing = true;
        if (skip && !finalAnswerLocked) answers[current] = -1;
        if (current < N - 1) {
          ability = App.adaptive.update(ability, questions[current].difficulty, answers[current] === questions[current].answer);
          view.querySelector('.quiz-q[data-i="' + current + '"]').hidden = true;
          current++;
          appendQuestion();
          view.querySelector("#adaptiveQuestions").insertAdjacentHTML("beforeend", qHtml(questions[current], current));
          App.hydrateIcons(view);
          progress();
          const first = view.querySelector('.quiz-q[data-i="' + current + '"] .opt');
          if (first) first.focus();
          committing = false;
        } else {
          finalAnswerLocked = true;
          view.querySelectorAll(".quiz-finish button").forEach((x) => { x.disabled = true; });
          try { await finish(); finished = true; }
          catch (error) {
            if (gone()) return;
            App.ui.toast(t("adaptive.saveFailed"));
            console.error(error);
            view.querySelector("#qFinish").disabled = false;
          }
          committing = false;
        }
      }
    };
    view.addEventListener("click", onClick);

    async function finish() {
      const label = outcomeLabel(grade, subject, unit, outcome);
      const adaptive = App.adaptive.result(questions, answers, startAbility);
      const counts = { correct: 0, wrong: 0, empty: 0 };
      questions.forEach((q, i) => { counts[answers[i] === q.answer ? "correct" : answers[i] < 0 ? "empty" : "wrong"]++; });
      for (let i = 0; i < questions.length; i++) {
        const q = questions[i];
        if (answers[i] !== q.answer && !savedMistakes.has(i)) {
          await App.mistakes.add({ source: "quiz", key, label, q: q.q, options: q.options, answer: q.answer, chosen: answers[i], explain: q.explain });
          savedMistakes.add(i);
        }
      }
      if (!savedQuiz) {
        await App.db.put("quizzes", Object.assign({ id: quizId, key, label, date: new Date().toISOString(), total: questions.length, model, adaptive,
          questions: questions.map((q, i) => Object.assign({}, q, { chosen: answers[i] })) }, counts));
        savedQuiz = true;
      }
      if (gone()) return;
      let correct = 0, wrong = 0, empty = 0;
      const missed = [];
      questions.forEach((q, i) => {
        const a = answers[i];
        const ok = a === q.answer;
        if (ok) correct++; else if (a < 0) empty++; else wrong++;
        const sec = view.querySelector('.quiz-q[data-i="' + i + '"]');
        sec.hidden = false;
        sec.classList.add(ok ? "is-right" : "is-missed");
        sec.querySelector(".quiz-q__mark").innerHTML = App.icon(ok ? "checkCircle" : "xCircle") + esc(ok ? t("quiz.right") : a < 0 ? t("quiz.blank") : t("quiz.wrong"));
        sec.querySelectorAll(".opt").forEach((x) => {
          const j = Number(x.dataset.o);
          x.disabled = true;
          if (j === q.answer) x.classList.add("is-correct");
          else if (j === a) x.classList.add("is-wrong");
        });
        if (q.explain) { const ex = sec.querySelector(".quiz-q__explain"); ex.hidden = false; ex.innerHTML = "<b>" + esc(t("cur.solution")) + '</b><div class="md">' + App.markdown.render(q.explain) + "</div>"; }
        if (!ok) missed.push({ q, a });
        sec.insertAdjacentHTML("beforeend", '<div class="quiz-q__more">' + (!ok ? '<button class="btn btn--sm btn--ghost" type="button" data-sim-i="' + i + '">' + App.icon("layers") + esc(t("sim.button")) + "</button>" : "") +
          (App.feedback ? App.feedback.questionButtonHtml(i) : "") + "</div>");
      });
      App.hydrateIcons(view);
      const finishBar = view.querySelector(".quiz-finish");
      if (finishBar) finishBar.remove();

      // Yanlışların türünü (kavram/işlem/dikkat…) arka planda yapay zekâya sınıflandırt
      if (missed.some((x) => x.a >= 0)) App.mistakes.classifyPending().catch(() => {});
      const pct = Math.round((correct / questions.length) * 100);
      const res = view.querySelector("#qResult");
      res.innerHTML =
        '<section class="card quiz-result"><div class="quiz-score"><span class="quiz-score__big">' + correct + "<small>/" + questions.length + "</small></span>" +
          '<span class="hint">' + esc(t("quiz.summary", { c: correct, w: wrong, e: empty, pct })) + "</span></div>" +
          '<p class="adaptive-summary">' + esc(t("adaptive.result", { score: adaptive.score, level: t("adaptive.level" + adaptive.level) })) + '</p>' +
          '<p class="quiz-verdict">' + esc(pct >= 80 ? t("quiz.great") : pct >= 50 ? t("quiz.good") : t("quiz.review")) + "</p>" +
          (missed.length ? '<p class="hint">' + App.icon("bookmark") + esc(t("quiz.addedToMistakes", { n: missed.length })) + "</p>" : "") +
          '<div class="mis__actions"><button class="btn btn--primary" type="button" id="qAgain">' + App.icon("refresh") + esc(t("quiz.again")) + "</button>" +
          '<a class="btn" href="' + back + '">' + esc(t("quiz.backToLesson")) + "</a>" +
          (missed.length ? '<a class="btn btn--ghost" href="#/yanlislar">' + App.icon("bookmark") + esc(t("mis.title")) + "</a>" : "") + "</div></section>";
      App.hydrateIcons(res);
      res.querySelector("#qAgain").addEventListener("click", () => App.router.refresh());
      // Düşük puan: zorluğun kökü daha temel bir konuda olabilir (kök eksik analizi)
      if (pct < 70 && App.roots) App.roots.quizHintHtml(key).then((h) => {
        if (!h || !res.isConnected) return;
        const card = res.querySelector(".quiz-result");
        card.insertAdjacentHTML("beforeend", h);
        App.hydrateIcons(card);
      }).catch(() => {});
      res.scrollIntoView({ behavior: "smooth", block: "start" });
      App.ui.toast(t("quiz.saved"));
    }

    return () => { ctrl.abort(); clearInterval(tick); view.removeEventListener("click", onClick); };
  }

  function errorText(e) {
    const code = e && e.code;
    if (code === "no-key") return t("ai.err.nokeyBody");
    if (code === "no-audio") return t("fey.v.errNoAudio");
    if (code === "quota") return t("ai.err.quotaBody");
    if (code === "busy") return t("ai.err.busyBody");
    if (code === "offline") return t("ai.err.offlineTitle");
    if (code === "device") return t("ai.err.deviceTitle");
    if (code === "net") return t("ai.err.netBody");
    if (e instanceof SyntaxError || (e && e.message === "json")) return t("quiz.badOutput");
    return (e && e.message) || String(e);
  }

  /** Kazanım sayfasındaki "Konu sonu testi" kartı */
  async function cardHtml(key, href) {
    const list = (await App.db.getAll("quizzes")).filter((q) => q.key === key).sort((a, b) => String(b.date).localeCompare(String(a.date)));
    const last = list[0];
    const best = list.reduce((m, q) => Math.max(m, q.correct), 0);
    return '<section class="card lesson__section quiz-card"><h2>' + App.icon("quiz") + esc(t("quiz.title")) + "</h2>" +
      '<div class="quiz-card__row"><p class="hint">' + esc(last ? t("quiz.lastResult", { c: last.correct, total: last.total, date: App.utils.fmtDate(last.date.slice(0, 10)), n: list.length, best }) : t("quiz.cardIntro", { n: N })) + "</p>" +
      '<a class="btn btn--primary" href="' + href + '">' + App.icon("play") + esc(last ? t("quiz.newTest") : t("quiz.start", { n: N })) + "</a></div></section>";
  }

  App.router.register("test", render);
  App.quiz = { cardHtml, normalize, prompts, lessonText, errorText };
})();
