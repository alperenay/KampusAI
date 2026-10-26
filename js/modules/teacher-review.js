/* Öğretmen gerekçe paneli: özgün yanıt sabit, insan değerlendirmesi sürümlü ve ayrı.
   reviews yereldir. Yalnız öğrenci geri bildirimi aldığında normal quiz güncellenir.
   Araştırmanın özgün sonuçları hiçbir zaman değiştirilmez. QR imzalı değildir. */
(function () {
  const { esc, downloadText } = App.utils;
  const t = App.t;
  const rubric = ["concept", "link", "clarity"];
  const clone = (v) => JSON.parse(JSON.stringify(v));
  const fail = () => { throw new Error(t("review.invalid")); };
  const safeId = (s) => typeof s === "string" && /^[\w:.-]{1,160}$/.test(s);
  function cleanRequest(value) {
    if (!value || value.v !== 1 || !safeId(value.sourceId) || !["quiz", "research"].includes(value.source) ||
        typeof value.participant !== "string" || !/^[\w-]{1,48}$/.test(value.participant) || typeof value.label !== "string" || value.label.length > 300 ||
        typeof value.key !== "string" || !/^[\w-]+\/[\w-]+\/[\w-]+\/[\w-]+$/.test(value.key) || !Array.isArray(value.questions) || value.questions.length < 1 || value.questions.length > 10) fail();
    const startAbility = value.startAbility == null ? 2 : value.startAbility;
    if (!Number.isFinite(startAbility) || startAbility < 1 || startAbility > 3) fail();
    const questions = value.questions.map((q) => {
      const normalized = App.quiz.normalize({ questions: [q] }, true)[0], o = q.observation;
      if (!normalized || normalized.q.length > 3000 || normalized.explain.length > 3000 || normalized.options.some((x) => x.length > 600) || !o ||
          !Number.isInteger(q.chosen) || q.chosen < -1 || q.chosen >= q.options.length || ![null, 25, 50, 75, 100].includes(o.confidence) ||
          typeof o.reasonText !== "string" || o.reasonText.length > 800 || !Number.isInteger(o.hintLevel) || o.hintLevel < 0 || o.hintLevel > 3 ||
          !Number.isFinite(o.elapsedMs) || o.elapsedMs < 0 || o.elapsedMs > 86400000) fail();
      const schema = App.metacognition.reasonSchema(normalized);
      if (!(o.reasonChoice === null || schema && Number.isInteger(o.reasonChoice) && o.reasonChoice >= 0 && o.reasonChoice < schema.reasonOptions.length)) fail();
      return Object.assign({}, normalized, { chosen: q.chosen, observation: {
        confidence: o.confidence, reasonChoice: o.reasonChoice, reasonText: o.reasonText, hintLevel: o.hintLevel, elapsedMs: Math.round(o.elapsedMs)
      } });
    });
    return { v: 1, source: value.source, sourceId: value.sourceId, participant: value.participant, label: value.label, key: value.key, startAbility, questions };
  }
  const digest = (request) => App.research.hash(JSON.stringify(cleanRequest(request)));
  function grade(request, data) {
    if (!data || data.v !== 1 || data.rubric !== "reason-3x2-v1" || data.requestHash !== digest(request) || !Number.isInteger(data.revision) || data.revision < 1 || data.revision > 10000 ||
        typeof data.at !== "string" || !Number.isFinite(Date.parse(data.at)) || !Array.isArray(data.ratings)) fail();
    const eligible = request.questions.map((q, i) => ({ q, i })).filter(({ q }) => q.chosen >= 0 && (App.metacognition.reasonSchema(q) || q.observation.reasonText.trim()));
    if (!eligible.length || data.ratings.length !== eligible.length) fail();
    const seen = new Set();
    const ratings = data.ratings.map((r) => {
      if (!r || !Number.isInteger(r.index) || !eligible.some((x) => x.i === r.index) || seen.has(r.index) || !Array.isArray(r.criteria) || r.criteria.length !== 3 ||
          !r.criteria.every((n) => Number.isInteger(n) && n >= 0 && n <= 2) || typeof r.comment !== "string" || r.comment.length > 800) fail();
      seen.add(r.index);
      return { index: r.index, criteria: r.criteria.slice(), comment: r.comment.trim() };
    }).sort((a, b) => a.index - b.index);
    return { v: 1, rubric: "reason-3x2-v1", requestHash: data.requestHash, revision: data.revision, at: data.at, ratings };
  }
  function assessed(request, evaluation) {
    const observations = request.questions.map((q) => clone(q.observation));
    evaluation.ratings.forEach((r) => { observations[r.index].teacherAssessment = { version: 1, criteria: r.criteria, comment: r.comment, at: evaluation.at, revision: evaluation.revision }; });
    const answers = request.questions.map((q) => q.chosen);
    return { observations, metrics: App.metacognition.summarize(request.questions, answers, observations), adaptive: App.adaptive.result(request.questions, answers, request.startAbility, observations) };
  }
  async function requestFor(source, sourceId, participant) {
    let request;
    if (source === "quiz") {
      const q = await App.db.get("quizzes", sourceId);
      if (!q || !Array.isArray(q.questions)) fail();
      request = { v: 1, source, sourceId, participant, label: q.label, key: q.key, startAbility: q.adaptive ? q.adaptive.startAbility : 2, questions: q.questions };
    } else {
      const r = await App.db.get("research", sourceId);
      const s = r && await App.db.get("research", "session:" + r.sessionId);
      if (!r || !s) fail();
      request = { v: 1, source, sourceId, participant, label: s.session.title, key: s.session.key,
        questions: r.data.indices.map((index, i) => Object.assign({}, s.session.bank[index], { chosen: r.data.observations[i].chosen, observation: r.data.observations[i] })) };
    }
    const clean = cleanRequest(request), id = "request:" + digest(clean);
    App.research.pack({ type: "review-request", data: clean });
    const existing = await App.db.get("reviews", id);
    if (!existing) await App.db.put("reviews", { id, kind: "request", role: "student", request: clean });
    return clean;
  }
  async function share(source, id) {
    const m = App.ui.modal({ title: t("review.share"), body: '<p class="hint">' + esc(t("review.shareNote")) + '</p><label class="field"><span>' + esc(t("research.participant")) + '</span><input class="input" id="reviewParticipant" maxlength="48" value="' + App.research.newId() + '"></label>',
      actions: '<button class="btn btn--ghost" data-close type="button">' + esc(t("cancel")) + '</button><button class="btn btn--primary" id="reviewSend" type="button">' + esc(t("review.share")) + '</button>' });
    m.el.querySelector("#reviewSend").onclick = async () => {
      const b = m.el.querySelector("#reviewSend"); b.disabled = true;
      try { const request = await requestFor(source, id, m.el.querySelector("#reviewParticipant").value.trim()); m.close(); await App.researchUi.transfer({ type: "review-request", data: request }); }
      catch (e) { App.ui.toast(e.message, "error"); } finally { b.disabled = false; }
    };
  }
  async function receive(payload) {
    if (payload.type === "review-request") {
      const request = cleanRequest(payload.data), id = "request:" + digest(request), existing = await App.db.get("reviews", id);
      if (!existing) await App.db.put("reviews", { id, kind: "request", role: "teacher", request });
      return { kind: "review", duplicate: !!existing };
    }
    const data = payload.data;
    if (!data || typeof data.requestHash !== "string") fail();
    const row = await App.db.get("reviews", "request:" + data.requestHash);
    if (!row) throw new Error(t("review.noRequest"));
    const evaluation = grade(row.request, data);
    if (row.evaluation && row.evaluation.revision >= evaluation.revision) {
      if (JSON.stringify(row.evaluation) === JSON.stringify(evaluation)) return { kind: "review", duplicate: true };
      throw new Error(t("review.stale"));
    }
    // Önce canlı kaynakla eşleştir; bir başka soru/cevabın değerlendirmesi uygulanamaz.
    let quiz = null;
    if (row.role === "student" && row.request.source === "quiz") {
      quiz = await App.db.get("quizzes", row.request.sourceId);
      if (!quiz || digest(Object.assign({}, row.request, { questions: quiz.questions })) !== evaluation.requestHash) throw new Error(t("review.changed"));
    }
    const result = assessed(row.request, evaluation);
    if (quiz) {
      quiz.questions.forEach((q, i) => { q.observation = Object.assign({}, q.observation, result.observations[i]); });
      quiz.metacognition = result.metrics;
      quiz.adaptive = App.adaptive.result(quiz.questions, quiz.questions.map((q) => q.chosen), quiz.adaptive ? quiz.adaptive.startAbility : 2, quiz.questions.map((q) => q.observation));
      await App.db.put("quizzes", quiz);
    }
    await App.db.put("reviews", Object.assign({}, row, { evaluation, metrics: result.metrics }));
    return { kind: "review", duplicate: false };
  }
  async function save(id, ratings) {
    const row = await App.db.get("reviews", id);
    if (!row || row.role !== "teacher") fail();
    const evaluation = grade(row.request, { v: 1, rubric: "reason-3x2-v1", requestHash: digest(row.request), revision: (row.evaluation ? row.evaluation.revision : 0) + 1, at: new Date().toISOString(), ratings });
    const result = assessed(row.request, evaluation);
    await App.db.put("reviews", Object.assign({}, row, { evaluation, metrics: result.metrics }));
    return evaluation;
  }
  async function render(view) {
    const hash = location.hash, rows = (await App.db.getAll("reviews")).filter((r) => r.kind === "request");
    if (hash !== location.hash) return;
    App.setTitle(t("review.title"));
    view.innerHTML = '<div class="page review-page"><div class="page-head"><div><h1>' + esc(t("review.title")) + '</h1><p>' + esc(t("review.intro")) + '</p></div><a class="btn" href="#/sinif">' + esc(t("research.classroom")) + '</a></div>' +
      '<div class="research-controls"><button class="btn" id="reviewImport">' + esc(t("research.import")) + '</button><button class="btn" id="reviewScan">' + esc(t("research.scan")) + '</button><button class="btn btn--ghost" id="reviewExport">' + esc(t("research.export")) + '</button></div>' +
      (!rows.length ? '<section class="card research-session"><p>' + esc(t("review.empty")) + '</p></section>' : rows.map((row) => {
        const r = row.request, original = App.adaptive.result(r.questions, r.questions.map((q) => q.chosen), r.startAbility, r.questions.map((q) => q.observation)), path = original.path;
        return '<section class="card research-session"><h2>' + esc(r.participant + " · " + r.label) + '</h2><p class="hint">' + esc(t(row.role === "teacher" ? "review.received" : "review.sent")) + ' · ' + esc(r.source) + '</p>' +
          '<p class="hint">' + esc(t("review.stats", { score: original.score, support: original.supportedScore, seconds: Math.round(r.questions.reduce((sum, q) => sum + q.observation.elapsedMs, 0) / 1000) })) + '</p>' +
          (row.metrics ? App.metacognition.summaryHtml(row.metrics) : '') + '<form data-review="' + esc(row.id) + '">' + r.questions.map((q, i) => {
            const o = q.observation, old = row.evaluation && row.evaluation.ratings.find((x) => x.index === i), canGrade = q.chosen >= 0 && (App.metacognition.reasonSchema(q) || o.reasonText.trim());
            return '<details class="review-question"><summary>' + esc(t("quiz.question", { n: i + 1 })) + ' · ' + (o.confidence === null ? "—" : o.confidence + "%") + ' · ' + Math.round(o.elapsedMs / 1000) + ' s · ' + esc(t("hint.step", { n: o.hintLevel })) + '</summary>' +
              '<div class="md">' + App.markdown.render(q.q) + '</div><p>' + esc(t("review.answer")) + ' ' + esc(q.chosen < 0 ? "—" : q.options[q.chosen]) + '</p><blockquote>' + esc(o.reasonText || (q.reasonOptions && q.reasonOptions[o.reasonChoice]) || "—") + '</blockquote>' +
              '<p class="hint">' + esc(t("review.ability", { n: path[i].ability })) + '</p><details><summary>' + esc(t("meta.expectedReason")) + '</summary><div class="md">' + App.markdown.render(q.explain) + '</div></details>' +
              (canGrade && row.role === "teacher" ? '<fieldset class="review-rubric"><legend>' + esc(t("review.rubric")) + '</legend>' + rubric.map((name, j) => '<label class="field"><span>' + esc(t("review." + name)) + '</span><select class="select" name="rating-' + i + '-' + j + '" required><option value="">—</option>' + [0, 1, 2].map((v) => '<option value="' + v + '"' + (old && old.criteria[j] === v ? ' selected' : '') + '>' + v + ' · ' + esc(t("review.level" + v)) + '</option>').join('') + '</select></label>').join('') + '</fieldset><label class="field"><span>' + esc(t("review.comment")) + '</span><textarea class="input" maxlength="800" name="comment-' + i + '">' + esc(old ? old.comment : '') + '</textarea></label>' :
                old ? '<p>' + esc(old.criteria.join(' + ') + ' / 6 · ' + old.comment) + '</p>' : '') + '</details>';
          }).join('') + (row.role === "teacher" ? '<button class="btn btn--primary" type="submit">' + esc(t("save")) + '</button>' : '') + '</form>' +
          (row.evaluation && row.role === "teacher" ? '<button class="btn" data-feedback="' + esc(row.id) + '">' + esc(t("review.sendBack")) + '</button>' : '') + '</section>';
      }).join('')) + '</div>';
    const reload = () => { if (hash === location.hash) App.router.refresh(); };
    view.querySelector("#reviewImport").onclick = () => {
      const m = App.ui.modal({ title: t("research.import"), body: '<textarea class="input research-code" id="reviewCodes" rows="5" aria-label="' + esc(t("research.allCodes")) + '"></textarea><input type="file" id="reviewFile" accept=".json">', actions: '<button class="btn" data-close>' + esc(t("cancel")) + '</button><button class="btn btn--primary" id="reviewReceive">' + esc(t("research.import")) + '</button>' });
      m.el.querySelector("#reviewReceive").onclick = async () => {
        const b = m.el.querySelector("#reviewReceive"); b.disabled = true;
        try { const f = m.el.querySelector("#reviewFile").files[0]; if (f && f.size > 150000) fail(); const result = await App.researchUi.importText(f ? await f.text() : m.el.querySelector("#reviewCodes").value); m.close(); if (result.kind === "partial") App.ui.toast(t("research.partial", { n: result.received, total: result.total })); reload(); }
        catch (e) { App.ui.toast(e.message, "error"); } finally { b.disabled = false; }
      };
    };
    view.querySelector("#reviewScan").onclick = async () => { try { const text = await App.pairing.scan((s) => App.research.frame(s) ? s : null); if (text) { const r = await App.research.receive(text); if (r.kind === "partial") App.ui.toast(t("research.partial", { n: r.received, total: r.total })); reload(); } } catch (e) { App.ui.toast(e.message, "error"); } };
    view.querySelector("#reviewExport").onclick = () => downloadText("kampusai-teacher-reviews.json", JSON.stringify({ v: 1, rows }, null, 2));
    view.querySelectorAll("[data-feedback]").forEach((b) => { b.onclick = () => App.researchUi.transfer({ type: "review-feedback", data: rows.find((r) => r.id === b.dataset.feedback).evaluation }); });
    view.querySelectorAll("form[data-review]").forEach((form) => { form.noValidate = true; form.onsubmit = async (e) => {
      e.preventDefault(); const b = form.querySelector('[type="submit"]'); b.disabled = true;
      try {
        const missing = Array.from(form.querySelectorAll("select[required]")).find((el) => el.value === "");
        if (missing) { missing.closest("details.review-question").open = true; missing.focus(); throw new Error(t("review.complete")); }
        const row = rows.find((r) => r.id === form.dataset.review), ratings = [];
        row.request.questions.forEach((q, i) => { if (!form.elements["rating-" + i + "-0"]) return; ratings.push({ index: i, criteria: rubric.map((name, j) => Number(form.elements["rating-" + i + "-" + j].value)), comment: form.elements["comment-" + i].value }); });
        await save(row.id, ratings); App.ui.toast(t("review.saved")); reload();
      } catch (err) { App.ui.toast(err.message, "error"); } finally { b.disabled = false; }
    }; });
    App.hydrateIcons(view);
  }
  App.router.register("degerlendirme", render);
  App.teacherReview = { rubric, cleanRequest, digest, grade, assessed, requestFor, receive, save, share, render };
})();
