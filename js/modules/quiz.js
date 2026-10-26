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

  function prompts(grade, subject, unit, outcome, options) {
    options = options || {};
    const count = options.count || POOL_SIZE;
    const difficulty = options.difficulty;
    const tr = App.i18n.lang === "tr";
    const lesson = lessonText(outcome);
    const system = tr
      ? "Sen deneyimli bir lise öğretmeni ve YKS soru yazarısın. Yalnızca geçerli JSON döndür; açıklama ya da Markdown kod bloğu ekleme."
      : "You are an experienced high-school teacher and YKS exam question writer. Return only valid JSON; no explanations or Markdown code fences.";
    const head = (tr ? "Sınıf: " : "Grade: ") + grade.id + "\n" + (tr ? "Ders: " : "Subject: ") + L(subject.name) + "\n" +
      (tr ? "Ünite: " : "Unit: ") + L(unit.name) + "\n" + (tr ? "Kazanım: " : "Learning outcome: ") + L(outcome.title) + (outcome.code ? " (" + outcome.code + ")" : "");
    const rules = tr ? [
      "Bu kazanım için TAM " + count + " soruluk bir uyarlanan test havuzu hazırla.",
      "- Her soru 5 seçenekli (A–E) ve tek doğru cevaplı olsun; şıkların başına harf yazma.",
      (difficulty ? "- Bu partide bütün soruların difficulty alanı " + difficulty + " olsun (1 kolay, 2 orta, 3 zor)." : "- Zorluk: 10 kolay, 10 orta, 10 zor. Her soruya difficulty alanı ekle: kolay=1, orta=2, zor=3.") + " Sorular YKS (TYT/AYT) tarzında olsun.",
      "- Yalnızca bu kazanımın konusundan sor; aşağıdaki konu anlatımına sadık kal, ama ondaki örnekleri aynen kopyalama.",
      "- Matematiksel ifadeleri LaTeX ile yaz ($...$). JSON içinde ters bölüleri çift yaz (\\\\frac gibi).",
      "- \"Hepsi\" / \"Hiçbiri\" şıkkı kullanma. Doğru cevapların harfleri dengeli dağılsın.",
      "- Her soruya en fazla 3 cümlelik kısa bir çözüm/açıklama yaz.",
      "Biçim: {\"questions\":[{\"q\":\"soru metni\",\"options\":[\"…\",\"…\",\"…\",\"…\",\"…\"],\"answer\":0,\"difficulty\":2,\"explain\":\"…\"}]}  (answer: doğru şıkkın 0'dan başlayan sırası)"
    ] : [
      "Write an adaptive question pool with EXACTLY " + count + " questions for this learning outcome, in English.",
      "- Each question has 5 options (A–E) and one correct answer; don't prefix options with letters.",
      (difficulty ? "- Every question in this batch must have difficulty=" + difficulty + " (1 easy, 2 medium, 3 hard)." : "- Difficulty: 10 easy, 10 medium, 10 hard. Include difficulty on every question: easy=1, medium=2, hard=3.") + " Use YKS style.",
      "- Stay strictly within this outcome and the lesson below, but don't copy its examples verbatim.",
      "- Write math in LaTeX ($...$). Escape backslashes in JSON (\\\\frac).",
      "- No \"all of the above\" / \"none\". Spread the correct letters evenly.",
      "- Add a short solution/explanation (max 3 sentences) for each question.",
      "Format: {\"questions\":[{\"q\":\"…\",\"options\":[\"…\",\"…\",\"…\",\"…\",\"…\"],\"answer\":0,\"difficulty\":2,\"explain\":\"…\"}]}  (answer: 0-based index)"
    ];
    rules.push(tr ? '- Her soruya 3 gerekçe seçeneği (reasonOptions) ve doğru gerekçenin sırasını (reasonAnswer, 0 tabanlı) ekle. Gerekçeler çözümü değil düşünceyi açıklasın; yanlışlar yaygın kavram yanılgılarını yansıtsın.' : '- Add 3 reasoning choices (reasonOptions) and the correct reasoning index (reasonAnswer, 0-based) to every question. Include plausible misconceptions.');
    rules.push(tr ? '- Her soruya hints: [kavram hatırlatma, strateji veya bağıntı, çözümün ilk adımı] ekle. Üç ayrı kısa ipucu; son cevabı, doğru şıkkı veya tam çözümü verme.' : '- Add hints: [concept reminder, strategy or relation, first solution step]. Never reveal the final answer, correct option or full solution.');
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
      const reason = App.metacognition ? App.metacognition.reasonSchema(x) : null;
      const hints = App.scaffolding ? App.scaffolding.normalize(x.hints, x) : null;
      out.push(Object.assign({ q, options, answer, difficulty: [1, 2, 3].includes(difficulty) ? difficulty : 2, explain: String(x.explain || x.aciklama || x.explanation || "").trim() }, reason || {}, hints ? { hints } : {}));
    });
    return out.slice(0, adaptive ? POOL_SIZE : N);
  }

  /** Gerekçe/ipucu alanlarıyla tek yanıt 8k yerel bağlamı aşmasın: 3 × 10 soru. */
  async function generatePool(grade, subject, unit, outcome, options) {
    options = options || {};
    const questions = [], models = new Set();
    for (let difficulty = 1; difficulty <= 3; difficulty++) {
      let batch = [];
      for (let attempt = 0; attempt < 2; attempt++) {
        if (options.signal && options.signal.aborted) throw new Error("aborted");
        const pr = prompts(grade, subject, unit, outcome, { count: 10, difficulty });
        const res = await App.ai.generate(Object.assign({}, pr, { temperature: options.temperature == null ? 0.6 : options.temperature, signal: options.signal, onStage: options.onStage }));
        batch = normalize(res.data, true).filter((q) => q.difficulty === difficulty).slice(0, 10);
        models.add(res.model);
        if (batch.length >= 4) break;
      }
      if (batch.length < 4) throw new Error(t("quiz.badOutput"));
      questions.push.apply(questions, batch);
    }
    const pool = normalize({ questions }, true);
    if (pool.length < N || [1, 2, 3].some((d) => pool.filter((q) => q.difficulty === d).length < 2)) throw new Error(t("quiz.badOutput"));
    return { data: { questions: pool }, model: Array.from(models).join(" + ") };
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
    let research = null;
    try { if (p[4] === "arastirma") research = await App.research.context(p[5], key); }
    catch (error) {
      if (!gone()) view.innerHTML = '<div class="page"><section class="card"><p>' + esc(error.message) + '</p><a class="btn" href="#/arastirma">' + esc(t("research.title")) + '</a></section></div>';
      return;
    }
    const hintsEnabled = !research || research.policy.hints;
    const history = research ? [] : await App.db.getAll("quizzes");
    if (gone()) return;
    const startAbility = research ? 2 : App.adaptive.initial(history, key);
    let ability = startAbility;
    const used = new Set();
    let pool = [];
    const validPool = (list) => list.length >= N && [1, 2, 3].every((d) => list.filter((q) => q.difficulty === d).length >= 2);

    const head =
      '<div class="page-head"><div>' +
        '<nav class="crumbs"><a href="' + back + '">' + App.icon("chevronL") + esc(L(outcome.title)) + "</a></nav>" +
        '<h1 style="margin-top:8px">' + esc(t("quiz.title")) + "</h1><p>" + esc(t(research ? "research.offlineBank" : "quiz.sub", { n: N })) + "</p></div></div>";

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
      if (research) { pool = research.session.bank; model = t("research.offlineBank"); }
      else {
        const res = await generatePool(grade, subject, unit, outcome, { signal: ctrl.signal, onStage: (eng, m) => { if (!gone()) loading(m); } });
        pool = res.data.questions;
        if (gone()) { clearInterval(tick); return; }
        model = res.model;
        if (!validPool(pool)) throw new Error(t("quiz.badOutput"));
      }
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

    const answers = [], observations = [], indices = [], questionStarted = [];
    let researchResult = null;
    let finished = false, committing = false, finalAnswerLocked = false;
    let savedQuiz = false;
    const savedMistakes = new Set();
    const quizId = uid("quiz");
    let current = 0;
    function appendQuestion() {
      const selected = research && !research.policy.adaptive ? { q: pool[questions.length], i: questions.length } : App.adaptive.pick(pool, used, ability);
      used.add(selected.i); indices.push(selected.i); questions.push(selected.q); answers.push(-1);
      observations.push(App.metacognition.observation()); questionStarted.push(Date.now());
    }
    appendQuestion();

    function qHtml(q, i) {
      return '<section class="card quiz-q" data-i="' + i + '"><div class="quiz-q__head"><b>' + esc(t("quiz.question", { n: i + 1 })) + '</b><span class="quiz-q__mark"></span></div>' +
        '<div class="md quiz-q__text">' + App.markdown.render(q.q) + "</div>" +
        '<ol class="opts">' + q.options.map((o, j) =>
          '<li><button type="button" class="opt" data-q="' + i + '" data-o="' + j + '"><span class="opt__letter">' + LETTERS[j] + '</span><span class="opt__text md">' + inline(o) + "</span></button></li>").join("") + "</ol>" +
        App.metacognition.fieldsHtml(q, i) + (hintsEnabled ? App.scaffolding.html(i) : '') +
        '<div class="quiz-q__explain" hidden></div></section>';
    }

    view.innerHTML = '<div class="page page--narrow">' + head +
      '<div class="quiz-meta hint">' + esc(t("quiz.madeBy", { model })) + "</div>" +
      (research ? '<p class="research-banner">' + esc(t("research.active", { group: research.policy.group })) + '</p>' : '') +
      '<p class="hint adaptive-help">' + esc(t(research ? "research.testIntro" : "adaptive.intro")) + '</p><div id="adaptiveQuestions">' + questions.map(qHtml).join("") + '</div>' +
      '<div class="quiz-finish card"><span class="hint" id="qProgress" role="status" aria-live="polite"></span><button class="btn btn--ghost" type="button" id="qSkip">' + esc(t("adaptive.skip")) + '</button><button class="btn btn--primary" type="button" id="qFinish">' + App.icon("check") + esc(t("adaptive.next")) + "</button></div>" +
      '<div id="qResult"></div></div>';
    App.hydrateIcons(view);

    const progress = () => {
      view.querySelector("#qProgress").textContent = t("adaptive.progress", { n: current + 1, total: N, level: t("adaptive.level" + questions[current].difficulty) });
      const next = view.querySelector("#qFinish");
      next.textContent = t(current === N - 1 ? "quiz.finish" : "adaptive.next");
      next.disabled = answers[current] < 0 || !App.metacognition.ready(questions[current], observations[current]);
    };
    progress();

    const onInput = (e) => {
      if (finished || committing || finalAnswerLocked) return;
      const el = e.target, o = observations[current];
      if (Number(el.dataset.reason) === current) o.reasonChoice = Number(el.value);
      else if (Number(el.dataset.confidence) === current) o.confidence = Number(el.value);
      else if (Number(el.dataset.reasonText) === current) o.reasonText = el.value.slice(0, 800);
      else return;
      progress();
    };
    view.addEventListener("change", onInput); view.addEventListener("input", onInput);
    const onClick = async (e) => {
      const hintButton = e.target.closest("[data-hint]");
      if (hintButton && hintsEnabled && !finished && !committing && !finalAnswerLocked && Number(hintButton.dataset.hint) === current) {
        const o = observations[current];
        const text = App.scaffolding.consume(questions[current], o, Date.now() - questionStarted[current]);
        if (text) {
          view.querySelector("#hint-panel-" + current).insertAdjacentHTML("beforeend", '<li><b>' + esc(t("hint.step", { n: o.hintLevel })) + '</b><div class="md">' + App.markdown.render(text) + '</div></li>');
          hintButton.setAttribute("aria-expanded", "true");
          hintButton.textContent = t(o.hintLevel === 3 ? "hint.usedAll" : "hint.next", { n: o.hintLevel + 1 });
          hintButton.disabled = o.hintLevel === 3;
        }
        return;
      }
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
        if (!skip && !finalAnswerLocked && (answers[current] < 0 || !App.metacognition.ready(questions[current], observations[current]))) return;
        committing = true;
        if (skip && !finalAnswerLocked) answers[current] = -1;
        observations[current].elapsedMs = Math.min(86400000, Math.max(0, Date.now() - questionStarted[current]));
        if (current < N - 1) {
          ability = App.adaptive.update(ability, questions[current].difficulty, answers[current] === questions[current].answer, App.metacognition.evidence(questions[current], answers[current], observations[current]));
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
      const adaptive = App.adaptive.result(questions, answers, startAbility, observations);
      const metacognition = App.metacognition.summarize(questions, answers, observations);
      const counts = { correct: 0, wrong: 0, empty: 0 };
      questions.forEach((q, i) => { counts[answers[i] === q.answer ? "correct" : answers[i] < 0 ? "empty" : "wrong"]++; });
      if (research) {
        if (!savedQuiz) {
          researchResult = await App.research.saveResult(research, indices, observations.map((o, i) => Object.assign({}, o, { chosen: answers[i] })));
          savedQuiz = true;
        }
      } else {
        for (let i = 0; i < questions.length; i++) {
          const q = questions[i];
          if (answers[i] !== q.answer && !savedMistakes.has(i)) {
            await App.mistakes.add({ source: "quiz", key, label, q: q.q, options: q.options, answer: q.answer, chosen: answers[i], explain: q.explain });
            savedMistakes.add(i);
          }
        }
        if (!savedQuiz) {
          await App.db.put("quizzes", Object.assign({ id: quizId, key, label, date: new Date().toISOString(), total: questions.length, model, adaptive, metacognition,
            questions: questions.map((q, i) => Object.assign({}, q, { chosen: answers[i], observation: observations[i] })) }, counts));
          savedQuiz = true;
        }
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
        sec.querySelectorAll("input, textarea, [data-hint]").forEach((el) => { el.disabled = true; });
        sec.classList.add(ok ? "is-right" : "is-missed");
        sec.querySelector(".quiz-q__mark").innerHTML = App.icon(ok ? "checkCircle" : "xCircle") + esc(ok ? t("quiz.right") : a < 0 ? t("quiz.blank") : t("quiz.wrong"));
        sec.querySelectorAll(".opt").forEach((x) => {
          const j = Number(x.dataset.o);
          x.disabled = true;
          if (j === q.answer) x.classList.add("is-correct");
          else if (j === a) x.classList.add("is-wrong");
        });
        if (q.explain) { const ex = sec.querySelector(".quiz-q__explain"); ex.hidden = false; ex.innerHTML = "<b>" + esc(t("cur.solution")) + '</b><div class="md">' + App.markdown.render(q.explain) + "</div>"; }
        const evaluation = App.metacognition.evaluate(q, a, observations[i]);
        sec.insertAdjacentHTML("beforeend", '<p class="meta-question-result">' + esc(t("meta.category." + evaluation.category)) + ' · ' + esc(t("meta.hintUse", { n: evaluation.hintLevel })) + '</p>' +
          (App.metacognition.reasonSchema(q) ? '<p class="hint">' + esc(t("meta.expectedReason")) + ' ' + esc(q.reasonOptions[q.reasonAnswer]) + '</p>' : ''));
        if (!ok) missed.push({ q, a });
        sec.insertAdjacentHTML("beforeend", '<div class="quiz-q__more">' + (!ok && !research ? '<button class="btn btn--sm btn--ghost" type="button" data-sim-i="' + i + '">' + App.icon("layers") + esc(t("sim.button")) + "</button>" : "") +
          (App.feedback && !research ? App.feedback.questionButtonHtml(i) : "") + "</div>");
      });
      App.hydrateIcons(view);
      const finishBar = view.querySelector(".quiz-finish");
      if (finishBar) finishBar.remove();

      // Yanlışların türünü (kavram/işlem/dikkat…) arka planda yapay zekâya sınıflandırt
      if (!research && missed.some((x) => x.a >= 0)) App.mistakes.classifyPending().catch(() => {});
      const pct = Math.round((correct / questions.length) * 100);
      const res = view.querySelector("#qResult");
      res.innerHTML =
        '<section class="card quiz-result"><div class="quiz-score"><span class="quiz-score__big">' + correct + "<small>/" + questions.length + "</small></span>" +
          '<span class="hint">' + esc(t("quiz.summary", { c: correct, w: wrong, e: empty, pct })) + "</span></div>" +
          '<p class="adaptive-summary">' + esc(t("adaptive.result", { score: adaptive.score, level: t("adaptive.level" + adaptive.level) })) + '</p>' +
          '<p class="quiz-verdict">' + esc(pct >= 80 ? t("quiz.great") : pct >= 50 ? t("quiz.good") : t("quiz.review")) + "</p>" +
          (!research && missed.length ? '<p class="hint">' + App.icon("bookmark") + esc(t("quiz.addedToMistakes", { n: missed.length })) + "</p>" : "") +
          App.metacognition.summaryHtml(metacognition) +
          '<div class="mis__actions">' + (research ? '<button class="btn btn--primary" type="button" id="qResearchShare">' + esc(t("research.shareResult")) + '</button><a class="btn" href="#/arastirma">' + esc(t("research.title")) + '</a>' : '<button class="btn btn--primary" type="button" id="qAgain">' + App.icon("refresh") + esc(t("quiz.again")) + '</button>') +
          '<a class="btn" href="' + back + '">' + esc(t("quiz.backToLesson")) + "</a>" +
          (!research && missed.length ? '<a class="btn btn--ghost" href="#/yanlislar">' + App.icon("bookmark") + esc(t("mis.title")) + "</a>" : "") + "</div></section>";
      App.hydrateIcons(res);
      const again = res.querySelector("#qAgain");
      if (again) again.addEventListener("click", () => App.router.refresh());
      const share = res.querySelector("#qResearchShare");
      if (share) share.addEventListener("click", () => App.researchUi.transfer(App.research.resultPacket(researchResult)));
      // Düşük puan: zorluğun kökü daha temel bir konuda olabilir (kök eksik analizi)
      if (!research && pct < 70 && App.roots) App.roots.quizHintHtml(key).then((h) => {
        if (!h || !res.isConnected) return;
        const card = res.querySelector(".quiz-result");
        card.insertAdjacentHTML("beforeend", h);
        App.hydrateIcons(card);
      }).catch(() => {});
      res.scrollIntoView({ behavior: "smooth", block: "start" });
      App.ui.toast(t("quiz.saved"));
    }

    return () => { ctrl.abort(); clearInterval(tick); view.removeEventListener("click", onClick); view.removeEventListener("input", onInput); view.removeEventListener("change", onInput); };
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
  App.quiz = { cardHtml, normalize, prompts, lessonText, errorText, generatePool };
})();
