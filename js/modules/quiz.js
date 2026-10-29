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
  const pendingPools = new Map();

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
    const count = options.count || 3, d = options.difficulty, tr = App.i18n.lang === "tr";
    const system = tr ? "Lise öğretmeni. Yalnız geçerli JSON. Kısa ve doğru yaz." : "High-school teacher. Valid JSON only. Be concise and accurate.";
    const schema = '{"questions":[{"q":"...","options":["...","...","...","...","..."],"answer":0,"difficulty":2,"explain":"...","reasonOptions":["...","...","..."],"reasonAnswer":0,"hints":["...","...","..."]}]}';
    const head = grade.id + " · " + L(subject.name) + " · " + L(outcome.title);
    const rule = tr ? "TAM " + count + " benzersiz soru; 5 farklı şık; answer ve reasonAnswer 0 tabanlı. " + (d ? "difficulty=" + d + ". " : "Birer kolay(1), orta(2), zor(3). ") +
      "Kolay tek kavram; orta iki adım/tablo; zor gerçek bağlamda iki kavramlı çok adım. Çeldiriciler kavram yanılgılarından. explain: 1–3 kısa çözüm adımı ve yanlış şıkların nedeni. 3 gerekçe; 3 ipucu: kavram, strateji, ilk işlem; cevap sızdırma. JSON LaTeX kaçışlarını koru."
      : count + " unique questions; 5 distinct options; answer/reasonAnswer zero-based. " + (d ? "difficulty=" + d + ". " : "One easy(1), medium(2), hard(3). ") +
      "Easy one concept; medium two steps/table; hard real context combining two concepts. Misconception distractors. explain: 1–3 short solution steps plus why distractors fail. 3 reasoning choices; 3 hints: concept, strategy, first step; no answer leak. Escape JSON LaTeX.";
    return { system, prompt: head + "\n" + rule + "\n" + schema + "\n" + lessonText(outcome).slice(0, 2400) +
      (options.exclude && options.exclude.length ? "\n" + (tr ? "Tekrarlama: " : "Do not repeat: ") + options.exclude.slice(-9).map((q) => q.slice(0, 100)).join(" | ") : "") };
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

  /* ---------------- Kalıcı soru havuzu önbelleği (v1.51) ----------------
     Tamamlanan havuz cihazda saklanır (meta "qpool:<özet>", 21 gün). Aynı konuya yeniden girildiğinde test beklemeden
     başlar; arka planda havuza 3 yeni soru eklenir (en çok 30), böylece tekrarlar zamanla çeşitlenir. */
  const POOL_TTL = 21 * 86400000;
  const poolId = (cacheKey) => { let h = 2166136261; for (let i = 0; i < cacheKey.length; i++) { h ^= cacheKey.charCodeAt(i); h = Math.imul(h, 16777619); } return "qpool:" + (h >>> 0).toString(36); };
  async function loadPool(cacheKey) {
    try {
      const r = await App.db.get("meta", poolId(cacheKey));
      if (!r || r.key !== cacheKey || Date.now() - r.at > POOL_TTL) return null;
      const questions = normalize({ questions: r.questions }, true);
      return questions.length >= 12 ? { questions, model: r.model || "" } : null;
    } catch (e) { return null; }
  }
  async function savePool(cacheKey, questions, model) {
    try { await App.db.put("meta", { id: poolId(cacheKey), key: cacheKey, at: Date.now(), questions: questions.slice(-POOL_SIZE), model }); } catch (e) { /* depolama dolu: yalnızca bellekte kalır */ }
  }
  /** Bulut sağlayıcıda partiler paralel istenir; yerel model (tek iş parçacığı) için sırayla */
  async function canParallel(signal) {
    try { const eng = await App.engine.resolve(signal); return !!eng && eng.kind !== "local"; } catch (e) { return false; }
  }

  /** İlk 3 dengeli soru hemen önizlenir; kalan 3 parti (kolay/orta/zor) bulutta paralel üretilir; 12'lik havuz saklanır. */
  async function generatePool(grade, subject, unit, outcome, options) {
    options = options || {};
    const cacheKey = JSON.stringify([grade.id, subject.id || L(subject.name), unit.id || L(unit.name), outcome.id || L(outcome.title), App.i18n.lang, lessonText(outcome).slice(0, 2400)]);
    // Kalıcı önbellek yalnızca çağıran isterse (konu testi): araştırma modu yalnız kendi deposuna yazar
    if (options.cache && !options.fresh) {
      const stored = await loadPool(cacheKey);
      if (stored) {
        if (options.onProgress) options.onProgress({ ready: stored.questions.length, total: stored.questions.length, questions: stored.questions.slice() });
        if (stored.questions.length < POOL_SIZE && !options.noRefresh) refreshPool(grade, subject, unit, outcome, cacheKey, stored);
        return { data: { questions: stored.questions }, model: stored.model, cached: true };
      }
    }
    const cached = pendingPools.get(cacheKey);
    let questions = cached && Date.now() - cached.at < 600000 ? cached.questions.slice() : [];
    const next = questions.length ? cached.next : 0, models = new Set(cached && questions.length ? cached.models : []);
    if (questions.length && options.onProgress) options.onProgress({ ready: questions.length, total: 12, questions: questions.slice() });
    const signature = q => q.trim().toLocaleLowerCase().replace(/\s+/g, ' ');
    // normalize() şıkları, cevap anahtarını ve zorluğu doğrular ("B" / "2" gibi değerleri çevirir). Gerekçe ve ipucu
    // isteğe bağlıdır (yoksa serbest gerekçe ve genel ipuçları kullanılır); eksik diye partiyi atmak yalnız gecikme getirir.
    const validGenerated = q => q.options.length === 5 && !!q.explain;
    const batchFor = async (difficulty, exclude) => {
      let batch = [], model = "";
      const excluded = new Set(exclude.map(signature));
      const select = data => {
        const candidates = normalize(data, true).filter(q => validGenerated(q) && !excluded.has(signature(q.q)));
        return difficulty ? candidates.filter(q => q.difficulty === difficulty).slice(0, 3)
          : [1, 2, 3].map(d => candidates.find(q => q.difficulty === d)).filter(Boolean);
      };
      for (let attempt = 0; attempt < 2; attempt++) {
        if (options.signal && options.signal.aborted) throw new Error("aborted");
        const pr = prompts(grade, subject, unit, outcome, { count: 3, difficulty, exclude });
        const res = await App.ai.generate(Object.assign({}, pr, {
          temperature: options.temperature == null ? 0.45 : options.temperature, maxTokens: 3600,
          signal: options.signal, onStage: options.onStage, onDelta: options.onDelta, arrayKey: 'questions',
          onPreview: items => {
            if (options.signal?.aborted || !options.onProgress) return;
            const preview = normalize({questions: questions.concat(select({questions:items}))}, true);
            options.onProgress({ready: preview.length, total:12, questions:preview, provisional:true});
          }
        }));
        batch = select(res.data); model = res.model;
        if (batch.length === 3) break;
      }
      if (batch.length < 3) throw new Error(t("quiz.badOutput"));
      return { batch, model };
    };
    const commit = (stage, batch, model) => {
      models.add(model);
      questions = normalize({ questions: questions.concat(batch) }, true);
      if (pendingPools.size >= 8) pendingPools.delete(pendingPools.keys().next().value);
      pendingPools.set(cacheKey, { at: Date.now(), next: stage + 1, questions: questions.slice(), models: Array.from(models) });
      if (options.onProgress) options.onProgress({ ready: questions.length, total: 12, questions: questions.slice() });
    };
    let stage = next;
    if (stage === 0) { const r = await batchFor(0, []); commit(0, r.batch, r.model); stage = 1; }
    if (stage < 4 && (await canParallel(options.signal))) {
      const exclude = questions.map((q) => q.q);
      const rest = [1, 2, 3].slice(stage - 1);
      const results = await Promise.all(rest.map((d) => batchFor(d, exclude)));
      results.forEach((r, k) => commit(stage + k, r.batch, r.model));
    } else {
      for (; stage < 4; stage++) { const r = await batchFor(stage, questions.map((q) => q.q)); commit(stage, r.batch, r.model); }
    }
    pendingPools.delete(cacheKey);
    if (questions.length < 12) throw new Error(t("quiz.badOutput"));
    const model = Array.from(models).join(" + ");
    if (options.cache) savePool(cacheKey, questions, model);
    return { data: { questions }, model };
  }

  /** Önbellekten açılan havuza arka planda 3 yeni soru ekler (hata sessizce yok sayılır) */
  const refreshing = new Set();
  async function refreshPool(grade, subject, unit, outcome, cacheKey, stored) {
    if (refreshing.has(cacheKey)) return;
    refreshing.add(cacheKey);
    try {
      const pr = prompts(grade, subject, unit, outcome, { count: 3, difficulty: 0, exclude: stored.questions.map((q) => q.q) });
      const res = await App.ai.generate(Object.assign({}, pr, { temperature: 0.7 }));
      const fresh = normalize(res.data, true).filter((q) => !stored.questions.some((p) => p.q === q.q));
      if (fresh.length) await savePool(cacheKey, normalize({ questions: stored.questions.concat(fresh) }, true), stored.model);
    } catch (e) { /* arka plan yenilemesi isteğe bağlıdır */ }
    finally { refreshing.delete(cacheKey); }
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
        '<p class="hint">' + esc(t("quiz.generatingHint")) + '</p><div id="qGeneration"></div></div></div>';
      App.hydrateIcons(view);
    };
    loading("");
    const generation = App.generation.mount(view.querySelector("#qGeneration"), 12, () => ctrl.abort());
    const stopGenerationGuard = App.generation.guard(ctrl);
    const started = Date.now();
    const tick = setInterval(() => { const el = view.querySelector("#qTime"); if (el) el.textContent = t("ai.seconds", { n: Math.round((Date.now() - started) / 1000) }); }, 1000);

    let questions = [], model = "";
    try {
      if (research) { pool = research.session.bank; model = t("research.offlineBank"); }
      else {
        const res = await generatePool(grade, subject, unit, outcome, { cache: true, signal: ctrl.signal, onDelta: () => generation.stream(), onProgress: (info) => generation.update(info) });
        pool = res.data.questions;
        if (gone()) { clearInterval(tick); return; }
        model = res.model;
        if (!validPool(pool)) throw new Error(t("quiz.badOutput"));
      }
    } catch (e) {
      stopGenerationGuard();
      clearInterval(tick);
      if (gone()) return;
      view.innerHTML = '<div class="page page--narrow">' + head +
        '<div class="msg__error"><b>' + esc(t("quiz.failed")) + "</b><p>" + esc(errorText(e)) + '</p><div class="msg__error-actions">' +
        '<button class="btn btn--sm" type="button" id="qRetry">' + App.icon("refresh") + esc(t("ai.retry")) + '</button><a class="btn btn--sm btn--ghost" href="' + back + '">' + esc(t("quiz.backToLesson")) + "</a></div></div></div>";
      App.hydrateIcons(view);
      view.querySelector("#qRetry").addEventListener("click", () => App.router.refresh());
      return () => ctrl.abort();
    }
    stopGenerationGuard();
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
      const reviewButton = document.createElement("button"); reviewButton.className = "btn"; reviewButton.textContent = t("review.share"); reviewButton.type = "button";
      reviewButton.onclick = () => App.teacherReview.share(research ? "research" : "quiz", research ? researchResult.id : quizId);
      res.querySelector(".mis__actions").appendChild(reviewButton);
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
    if (e && (e.name === "AbortError" || e.message === "aborted")) return t("gen.cancelled");
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
