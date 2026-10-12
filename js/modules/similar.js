/* =========================================================
   similar.js — Benzer soru üretme

   Bir sorudan (yanlış defteri kartı, konu sonu testindeki yanlış soru ya da
   sohbetteki fotoğraflı soru) aynı kazanımı aynı yöntemle ölçen ama sayıları /
   bağlamı farklı 3 yeni soru üretir. Öğrenci ezberlemek yerine yöntemi dener.
   Her soru işaretlenince hemen doğru/yanlış ve çözüm gösterilir; yanlışlar
   yanlış defterine "Benzer soru" olarak eklenir.

   App.similar.open({ q, options?, answer?, explain?, image?, label?, key? })
   ========================================================= */
(function () {
  const { esc } = App.utils;
  const t = App.t;
  const N = 3;
  const LETTERS = "ABCDE";
  const inline = (s) => App.markdown.render(String(s == null ? "" : s)).replace(/^<p>([\s\S]*)<\/p>$/, "$1");
  const plain = (s) => new DOMParser().parseFromString("<body>" + String(s || "") + "</body>", "text/html").body.textContent;

  function prompts(src) {
    const tr = App.i18n.lang === "tr";
    const system = tr
      ? "Sen deneyimli bir lise öğretmeni ve YKS soru yazarısın. Yalnızca geçerli JSON döndür; açıklama ya da Markdown kod bloğu ekleme."
      : "You are an experienced high-school teacher and YKS question writer. Return only valid JSON; no explanations or Markdown code fences.";
    const orig = [];
    if (src.label) orig.push((tr ? "Konu: " : "Topic: ") + src.label);
    if (src.q) orig.push((tr ? "Soru: " : "Question: ") + plain(src.q).slice(0, 2500));
    if (src.options && src.options.length) orig.push((tr ? "Şıklar: " : "Options: ") + src.options.map((o, i) => LETTERS[i] + ") " + o).join("  "));
    if (src.answer != null && src.options && src.options[src.answer] != null) orig.push((tr ? "Doğru cevap: " : "Correct answer: ") + LETTERS[src.answer]);
    if (src.explain) orig.push((tr ? "Çözüm: " : "Solution: ") + plain(src.explain).slice(0, 2500));
    if (src.image) orig.push(tr ? "(Sorunun fotoğrafı ektedir.)" : "(The question's photo is attached.)");
    const rules = tr ? [
      "Öğrenci aşağıdaki soruyu yanlış yaptı. Aynı kazanımı AYNI çözüm yöntemiyle ölçen TAM " + N + " YENİ soru yaz.",
      "- Sayıları, bağlamı ve soru kalıbını değiştir; orijinal soruyu ya da şıklarını tekrar etme.",
      "- 1. soru orijinalle aynı zorlukta, 2. soru biraz farklı bir kalıpta, 3. soru biraz daha zor olsun.",
      "- Her soru 5 seçenekli (A–E), tek doğru cevaplı; şıkların başına harf yazma. Çeldiriciler öğrencinin yapabileceği tipik hatalardan gelsin.",
      "- Cevabın gerçekten doğru olduğunu kendin hesaplayarak kontrol et.",
      "- Matematiksel ifadeleri LaTeX ile yaz ($...$). JSON içinde ters bölüleri çift yaz (\\\\frac gibi).",
      "- Her soruya adım adım, en fazla 4 cümlelik kısa bir çözüm yaz.",
      "Biçim: {\"questions\":[{\"q\":\"…\",\"options\":[\"…\",\"…\",\"…\",\"…\",\"…\"],\"answer\":0,\"explain\":\"…\"}]}  (answer: doğru şıkkın 0'dan başlayan sırası)"
    ] : [
      "The student got the question below wrong. Write EXACTLY " + N + " NEW questions in English that test the same skill with the SAME solution method.",
      "- Change the numbers, context and wording; don't repeat the original question or its options.",
      "- Question 1: same difficulty; question 2: a slightly different pattern; question 3: a bit harder.",
      "- 5 options (A–E), one correct; don't prefix options with letters. Distractors should come from typical student mistakes.",
      "- Verify each answer yourself.",
      "- Write math in LaTeX ($...$). Escape backslashes in JSON (\\\\frac).",
      "- Give each a short step-by-step solution (max 4 sentences).",
      "Format: {\"questions\":[{\"q\":\"…\",\"options\":[\"…\",\"…\",\"…\",\"…\",\"…\"],\"answer\":0,\"explain\":\"…\"}]}  (answer: 0-based index)"
    ];
    return { system, prompt: rules.join("\n") + "\n\n" + (tr ? "ORİJİNAL SORU:\n" : "ORIGINAL QUESTION:\n") + orig.join("\n") };
  }

  function open(src) {
    const ctrl = new AbortController();
    const m = App.ui.modal({
      title: t("sim.title"),
      body: '<div id="simBody" class="sim"></div>',
      onClose: () => ctrl.abort()
    });
    m.el.classList.add("modal--wide", "modal--sim");
    const body = m.el.querySelector("#simBody");
    let round = 0;

    const loading = (model, stage) => {
      body.innerHTML = '<div class="stage"><span class="spinner"></span>' + App.icon("layers") + "<span>" +
        esc(stage === "vision" ? t("sim.reading") : t("sim.generating")) + "</span>" + (model ? "<code>" + esc(model) + "</code>" : "") + "</div>" +
        '<p class="hint">' + esc(t("sim.hint")) + "</p>";
      App.hydrateIcons(body);
    };

    async function generate() {
      const my = ++round;
      loading("");
      let questions = [], model = "";
      try {
        const pr = prompts(src);
        const opts = Object.assign({}, pr, { image: src.image || null, temperature: 0.8, signal: ctrl.signal,
          onStage: (eng, mdl, stage) => { if (my === round) loading(mdl, stage); } });
        let res = await App.ai.generate(opts);
        questions = App.quiz.normalize(res.data).slice(0, N);
        if (questions.length < 2) { res = await App.ai.generate(Object.assign(opts, { temperature: 0.6 })); questions = App.quiz.normalize(res.data).slice(0, N); }
        model = res.model;
        if (!questions.length) throw new Error(t("quiz.badOutput"));
      } catch (e) {
        if (ctrl.signal.aborted || my !== round) return;
        body.innerHTML = '<div class="msg__error"><b>' + esc(t("sim.failed")) + "</b><p>" + esc(App.quiz.errorText(e)) + '</p><div class="msg__error-actions">' +
          '<button class="btn btn--sm" type="button" data-sim="retry">' + App.icon("refresh") + esc(t("ai.retry")) + "</button></div></div>";
        App.hydrateIcons(body);
        return;
      }
      if (my !== round || !document.body.contains(body)) return;
      show(questions, model);
    }

    function show(questions, model) {
      const answers = new Array(questions.length).fill(-1);
      body.innerHTML =
        '<p class="hint">' + esc(t("sim.intro", { n: questions.length })) + "</p>" +
        questions.map((q, i) =>
          '<section class="card quiz-q sim-q" data-i="' + i + '"><div class="quiz-q__head"><b>' + esc(t("quiz.question", { n: i + 1 })) + '</b><span class="quiz-q__mark"></span></div>' +
          '<div class="md quiz-q__text">' + App.markdown.render(q.q) + "</div>" +
          '<ol class="opts">' + q.options.map((o, j) =>
            '<li><button type="button" class="opt" data-q="' + i + '" data-o="' + j + '"><span class="opt__letter">' + LETTERS[j] + '</span><span class="opt__text md">' + inline(o) + "</span></button></li>").join("") + "</ol>" +
          '<div class="quiz-q__explain" hidden></div></section>').join("") +
        '<div class="sim-foot"><span class="hint" id="simScore"></span><span class="sim-foot__btns">' +
          '<button class="btn" type="button" data-sim="more">' + App.icon("refresh") + esc(t("sim.more")) + "</button>" +
          '<button class="btn btn--primary" type="button" data-close>' + esc(t("close")) + "</button></span></div>" +
        '<p class="hint sim-model">' + esc(t("quiz.madeBy", { model })) + "</p>";
      App.hydrateIcons(body);
      body.querySelector("[data-close]").addEventListener("click", m.close);

      const score = () => {
        const done = answers.filter((a) => a >= 0).length;
        const right = answers.filter((a, i) => a === questions[i].answer).length;
        body.querySelector("#simScore").textContent = done ? t("sim.score", { c: right, n: done, total: questions.length }) : "";
      };

      body.querySelectorAll(".opt[data-q]").forEach((b) => b.addEventListener("click", async () => {
        const i = Number(b.dataset.q), j = Number(b.dataset.o);
        if (answers[i] >= 0) return;
        answers[i] = j;
        const q = questions[i];
        const ok = j === q.answer;
        const sec = body.querySelector('.sim-q[data-i="' + i + '"]');
        sec.classList.add(ok ? "is-right" : "is-missed");
        sec.querySelector(".quiz-q__mark").innerHTML = App.icon(ok ? "checkCircle" : "xCircle") + esc(ok ? t("quiz.right") : t("quiz.wrong"));
        sec.querySelectorAll(".opt").forEach((x) => {
          const k = Number(x.dataset.o);
          x.disabled = true;
          if (k === q.answer) x.classList.add("is-correct");
          else if (k === j) x.classList.add("is-wrong");
        });
        if (q.explain) { const ex = sec.querySelector(".quiz-q__explain"); ex.hidden = false; ex.innerHTML = "<b>" + esc(t("cur.solution")) + '</b><div class="md">' + App.markdown.render(q.explain) + "</div>"; }
        App.hydrateIcons(sec);
        score();
        if (!ok) {
          await App.mistakes.add({ source: "similar", key: src.key || null, label: src.label || t("mis.src.similar"), q: q.q, options: q.options, answer: q.answer, chosen: j, explain: q.explain });
          App.ui.toast(t("sim.addedToMistakes"));
        }
        if (answers.every((a) => a >= 0)) {
          const right = answers.filter((a, k) => a === questions[k].answer).length;
          App.ui.toast(right === questions.length ? t("sim.allRight") : t("sim.done", { c: right, total: questions.length }));
        }
      }));
    }

    body.addEventListener("click", (e) => {
      const b = e.target.closest("[data-sim]");
      if (!b) return;
      generate();
    });
    generate();
    return m;
  }

  App.similar = { open, prompts };
})();
