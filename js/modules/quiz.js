/* =========================================================
   quiz.js — Konu sonu testi   (#/test/<sınıf>/<ders>/<ünite>/<kazanım>)

   Yapay zeka, kazanımın konu anlatımından 10 soruluk (5 seçenekli,
   YKS tarzı) bir test üretir. Test bitince doğru/yanlış/boş sayılır,
   açıklamalar gösterilir; yanlış ve boş sorular yanlış defterine eklenir.
   Sonuç IndexedDB "quizzes" deposuna kaydedilir.
   ========================================================= */
(function () {
  const { esc, uid } = App.utils;
  const t = App.t, L = App.L;
  const C = () => App.data.curriculum;
  const N = 10;
  const LETTERS = "ABCDE";

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
      "Bu kazanım için TAM " + N + " soruluk bir konu sonu testi hazırla.",
      "- Her soru 5 seçenekli (A–E) ve tek doğru cevaplı olsun; şıkların başına harf yazma.",
      "- Zorluk: 3 kolay, 4 orta, 3 zor. YKS (TYT/AYT) tarzında, düşündüren sorular olsun.",
      "- Yalnızca bu kazanımın konusundan sor; aşağıdaki konu anlatımına sadık kal, ama ondaki örnekleri aynen kopyalama.",
      "- Matematiksel ifadeleri LaTeX ile yaz ($...$). JSON içinde ters bölüleri çift yaz (\\\\frac gibi).",
      "- \"Hepsi\" / \"Hiçbiri\" şıkkı kullanma. Doğru cevapların harfleri dengeli dağılsın.",
      "- Her soruya en fazla 3 cümlelik kısa bir çözüm/açıklama yaz.",
      "Biçim: {\"questions\":[{\"q\":\"soru metni\",\"options\":[\"…\",\"…\",\"…\",\"…\",\"…\"],\"answer\":0,\"explain\":\"…\"}]}  (answer: doğru şıkkın 0'dan başlayan sırası)"
    ] : [
      "Write an end-of-topic test with EXACTLY " + N + " questions for this learning outcome, in English.",
      "- Each question has 5 options (A–E) and one correct answer; don't prefix options with letters.",
      "- Difficulty: 3 easy, 4 medium, 3 hard, in YKS style.",
      "- Stay strictly within this outcome and the lesson below, but don't copy its examples verbatim.",
      "- Write math in LaTeX ($...$). Escape backslashes in JSON (\\\\frac).",
      "- No \"all of the above\" / \"none\". Spread the correct letters evenly.",
      "- Add a short solution/explanation (max 3 sentences) for each question.",
      "Format: {\"questions\":[{\"q\":\"…\",\"options\":[\"…\",\"…\",\"…\",\"…\",\"…\"],\"answer\":0,\"explain\":\"…\"}]}  (answer: 0-based index)"
    ];
    return { system, prompt: head + "\n\n" + rules.join("\n") + "\n\n" + (tr ? "KONU ANLATIMI:\n" : "LESSON:\n") + lesson };
  }

  /** Modelin döndürdüğünü doğrula ve düzelt */
  function normalize(data) {
    const list = (data && (data.questions || data.sorular)) || (Array.isArray(data) ? data : []);
    const out = [];
    list.forEach((x) => {
      if (!x) return;
      const q = String(x.q || x.question || x.soru || "").trim();
      let options = (x.options || x.secenekler || x.choices || []).map((o) => String(o).replace(/^\s*[A-Ea-e][\)\.:]\s+/, "").trim()).filter(Boolean);
      let answer = x.answer != null ? x.answer : x.cevap != null ? x.cevap : x.correct;
      if (typeof answer === "string") answer = /^[A-Ea-e]$/.test(answer.trim()) ? LETTERS.indexOf(answer.trim().toUpperCase()) : options.indexOf(answer.trim());
      answer = Number(answer);
      if (!q || options.length < 4 || options.length > 5 || !(answer >= 0 && answer < options.length)) return;
      out.push({ q, options, answer, explain: String(x.explain || x.aciklama || x.explanation || "").trim() });
    });
    return out.slice(0, N);
  }

  const outcomeLabel = (grade, subject, unit, outcome) =>
    C().gradeName(grade) + " · " + L(subject.name) + " · " + L(outcome.title);

  async function render(view, p) {
    const grade = C().findGrade(p[0]);
    const subject = grade && C().findSubject(p[0], p[1]);
    const unit = subject && subject.units.find((u) => u.id === p[2]);
    const outcome = unit && unit.outcomes.find((k) => k.id === p[3]);
    if (!outcome) { App.router.go("konular"); return; }
    const key = C().key(grade.id, subject.id, unit.id, outcome.id);
    const back = "#/konular/" + key;
    App.setTitle(t("quiz.title"));
    const ctrl = new AbortController();

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
    const myHash = location.hash;
    const gone = () => location.hash !== myHash;          // kullanıcı başka sayfaya geçtiyse ekrana yazma
    const started = Date.now();
    const tick = setInterval(() => { const el = view.querySelector("#qTime"); if (el) el.textContent = t("ai.seconds", { n: Math.round((Date.now() - started) / 1000) }); }, 1000);

    let questions = [], model = "";
    try {
      const pr = prompts(grade, subject, unit, outcome);
      let res = await App.ai.generate(Object.assign({}, pr, { temperature: 0.8, signal: ctrl.signal, onStage: (eng, m) => { if (!gone()) loading(m); } }));
      if (gone()) { clearInterval(tick); return; }
      questions = normalize(res.data);
      if (questions.length < 6) {                                  // eksik geldiyse bir kez daha dene
        res = await App.ai.generate(Object.assign({}, pr, { temperature: 0.6, signal: ctrl.signal }));
        questions = normalize(res.data);
      }
      model = res.model;
      if (questions.length < 4) throw new Error(t("quiz.badOutput"));
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

    const answers = new Array(questions.length).fill(-1);
    let finished = false;

    function qHtml(q, i) {
      return '<section class="card quiz-q" data-i="' + i + '"><div class="quiz-q__head"><b>' + esc(t("quiz.question", { n: i + 1 })) + '</b><span class="quiz-q__mark"></span></div>' +
        '<div class="md quiz-q__text">' + App.markdown.render(q.q) + "</div>" +
        '<ol class="opts">' + q.options.map((o, j) =>
          '<li><button type="button" class="opt" data-q="' + i + '" data-o="' + j + '"><span class="opt__letter">' + LETTERS[j] + '</span><span class="opt__text md">' + inline(o) + "</span></button></li>").join("") + "</ol>" +
        '<div class="quiz-q__explain" hidden></div></section>';
    }

    view.innerHTML = '<div class="page page--narrow">' + head +
      '<div class="quiz-meta hint">' + esc(t("quiz.madeBy", { model })) + "</div>" +
      questions.map(qHtml).join("") +
      '<div class="quiz-finish card"><span class="hint" id="qProgress"></span><button class="btn btn--primary" type="button" id="qFinish">' + App.icon("check") + esc(t("quiz.finish")) + "</button></div>" +
      '<div id="qResult"></div></div>';
    App.hydrateIcons(view);

    const progress = () => {
      const n = answers.filter((a) => a >= 0).length;
      view.querySelector("#qProgress").textContent = t("quiz.answered", { n, total: questions.length });
    };
    progress();

    const onClick = async (e) => {
      const sb = e.target.closest("[data-sim-i]");
      if (sb) {
        const q = questions[Number(sb.dataset.simI)];
        App.similar.open({ q: q.q, options: q.options, answer: q.answer, explain: q.explain, label: outcomeLabel(grade, subject, unit, outcome), key });
        return;
      }
      const b = e.target.closest(".opt[data-q]");
      if (b && !finished) {
        const i = Number(b.dataset.q), j = Number(b.dataset.o);
        answers[i] = answers[i] === j ? -1 : j;                  // aynı şıkka tekrar basınca boş bırak
        view.querySelectorAll('.opt[data-q="' + i + '"]').forEach((x) => x.classList.toggle("is-picked", Number(x.dataset.o) === answers[i]));
        progress();
        return;
      }
      if (e.target.closest("#qFinish") && !finished) {
        const blank = answers.filter((a) => a < 0).length;
        if (blank && !(await App.ui.confirm(t("quiz.blankConfirm", { n: blank }), t("quiz.finish")))) return;
        finished = true;
        await finish();
      }
    };
    view.addEventListener("click", onClick);

    async function finish() {
      let correct = 0, wrong = 0, empty = 0;
      const missed = [];
      questions.forEach((q, i) => {
        const a = answers[i];
        const ok = a === q.answer;
        if (ok) correct++; else if (a < 0) empty++; else wrong++;
        const sec = view.querySelector('.quiz-q[data-i="' + i + '"]');
        sec.classList.add(ok ? "is-right" : "is-missed");
        sec.querySelector(".quiz-q__mark").innerHTML = App.icon(ok ? "checkCircle" : "xCircle") + esc(ok ? t("quiz.right") : a < 0 ? t("quiz.blank") : t("quiz.wrong"));
        sec.querySelectorAll(".opt").forEach((x) => {
          const j = Number(x.dataset.o);
          x.disabled = true;
          if (j === q.answer) x.classList.add("is-correct");
          else if (j === a) x.classList.add("is-wrong");
        });
        if (q.explain) { const ex = sec.querySelector(".quiz-q__explain"); ex.hidden = false; ex.innerHTML = "<b>" + esc(t("cur.solution")) + '</b><div class="md">' + App.markdown.render(q.explain) + "</div>"; }
        if (!ok) {
          missed.push({ q, a });
          sec.insertAdjacentHTML("beforeend", '<div class="quiz-q__more"><button class="btn btn--sm btn--ghost" type="button" data-sim-i="' + i + '">' + App.icon("layers") + esc(t("sim.button")) + "</button></div>");
        }
      });
      App.hydrateIcons(view);
      const finishBar = view.querySelector(".quiz-finish");
      if (finishBar) finishBar.remove();

      const label = outcomeLabel(grade, subject, unit, outcome);
      await App.db.put("quizzes", {
        id: uid("quiz"), key, label, date: new Date().toISOString(), total: questions.length, correct, wrong, empty, model,
        questions: questions.map((q, i) => Object.assign({}, q, { chosen: answers[i] }))
      });
      for (const m of missed) {
        await App.mistakes.add({ source: "quiz", key, label, q: m.q.q, options: m.q.options, answer: m.q.answer, chosen: m.a, explain: m.q.explain });
      }
      // Yanlışların türünü (kavram/işlem/dikkat…) arka planda yapay zekâya sınıflandırt
      if (missed.some((x) => x.a >= 0)) App.mistakes.classifyPending().catch(() => {});
      const pct = Math.round((correct / questions.length) * 100);
      const res = view.querySelector("#qResult");
      res.innerHTML =
        '<section class="card quiz-result"><div class="quiz-score"><span class="quiz-score__big">' + correct + "<small>/" + questions.length + "</small></span>" +
          '<span class="hint">' + esc(t("quiz.summary", { c: correct, w: wrong, e: empty, pct })) + "</span></div>" +
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
