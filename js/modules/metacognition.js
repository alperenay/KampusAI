/* metacognition.js — saf, sürümlü puanlama. Serbest gerekçe otomatik puanlanmaz; öğretmenin ölçütlü puanı ayrı uygulanır.
   Kategoriler pedagojik göstergedir; kişiye/bozukluğa ilişkin teşhis değildir. */
(function () {
  const CONFIDENCE = [25, 50, 75, 100];
  const SUPPORT = [1, 0.85, 0.65, 0.45];
  function reasonSchema(q) {
    const options = q && q.reasonOptions;
    if (!Array.isArray(options) || options.length < 2 || options.length > 5 ||
        !options.every((x) => typeof x === "string" && x.trim() && x.length <= 500) ||
        new Set(options.map((x) => x.trim())).size !== options.length || !Number.isInteger(q.reasonAnswer) || q.reasonAnswer < 0 || q.reasonAnswer >= options.length) return null;
    return { reasonOptions: options.map((x) => x.trim()), reasonAnswer: q.reasonAnswer };
  }
  function observation() {
    return { confidence: null, reasonChoice: null, reasonText: "", hintLevel: 0, hintEvents: [], beforeHint: null, elapsedMs: 0 };
  }
  function ready(q, o) {
    if (!o || !CONFIDENCE.includes(o.confidence)) return false;
    const schema = reasonSchema(q);
    return schema ? Number.isInteger(o.reasonChoice) && o.reasonChoice >= 0 && o.reasonChoice < schema.reasonOptions.length
      : typeof o.reasonText === "string" && o.reasonText.trim().length > 0 && o.reasonText.length <= 800;
  }
  function evaluate(q, chosen, o) {
    o = o || observation();
    const answered = Number.isInteger(chosen) && chosen >= 0 && chosen < q.options.length;
    const correct = answered && chosen === q.answer;
    const confidence = answered && CONFIDENCE.includes(o.confidence) ? o.confidence : null;
    const schema = reasonSchema(q);
    const assessed = answered && schema && Number.isInteger(o.reasonChoice) && o.reasonChoice >= 0 && o.reasonChoice < schema.reasonOptions.length;
    const human = o.teacherAssessment;
    const credit = human && human.version === 1 && Array.isArray(human.criteria) && human.criteria.length === 3 && human.criteria.every((n) => Number.isInteger(n) && n >= 0 && n <= 2) ? human.criteria.reduce((a, b) => a + b, 0) / 6 : null;
    const reasonCorrect = answered && credit !== null ? credit >= 0.75 ? true : credit <= 0.25 ? false : null : assessed ? o.reasonChoice === schema.reasonAnswer : null;
    const hintLevel = Number.isInteger(o.hintLevel) ? Math.max(0, Math.min(3, o.hintLevel)) : 0;
    let category = "unanswered";
    if (answered) {
      if (!correct) category = confidence >= 75 ? "misconceptionCandidate" : "gapCandidate";
      else if (reasonCorrect === false) category = "fragileCorrect";
      else if (confidence !== null && confidence <= 50) category = "guessCandidate";
      else if (credit !== null && reasonCorrect === null) category = "partialReasoning";
      else if (reasonCorrect === true && confidence !== null) category = hintLevel ? "supportedCorrect" : "consciousCorrect";
      else category = "unverifiedCorrect";
    }
    // Brier uyumu: eminlik eksikse ölçüm yoktur, sıfır eminlik varsayılmaz.
    const calibration = confidence === null ? null : 1 - Math.pow(confidence / 100 - (correct ? 1 : 0), 2);
    let points = correct ? 60 * SUPPORT[hintLevel] : 0, max = 60;
    if (answered && credit !== null) { points += 25 * credit; max += 25; }
    else if (reasonCorrect !== null) { points += reasonCorrect ? 25 : 0; max += 25; }
    if (calibration !== null) { points += 15 * calibration; max += 15; }
    return { category, correct, reasonCorrect, reasonCredit: answered && credit !== null ? credit : reasonCorrect === null ? null : reasonCorrect ? 1 : 0, confidence, hintLevel, calibration,
      independentCorrect: correct && hintLevel === 0, score: answered ? Math.round(100 * points / max) : 0 };
  }
  function evidence(q, chosen, o) {
    const m = evaluate(q, chosen, o);
    return m.correct ? SUPPORT[m.hintLevel] * (m.reasonCredit === null ? 1 : 0.5 + 0.5 * m.reasonCredit) : 0;
  }
  function summarize(questions, answers, observations) {
    const items = questions.map((q, i) => evaluate(q, answers[i], (observations || [])[i]));
    const n = items.length || 1, reasons = items.filter((x) => x.reasonCredit !== null), calibrated = items.filter((x) => x.calibration !== null);
    const categories = {};
    items.forEach((x) => { categories[x.category] = (categories[x.category] || 0) + 1; });
    const mean = (list, fn) => list.length ? list.reduce((s, x) => s + fn(x), 0) / list.length : null;
    return { version: 1, total: items.length, rawAccuracy: items.filter((x) => x.correct).length / n,
      independentAccuracy: items.filter((x) => x.independentCorrect).length / n,
      learningEvidence: questions.reduce((sum, q, i) => sum + evidence(q, answers[i], (observations || [])[i]), 0) / n,
      reasonAccuracy: reasons.length ? reasons.reduce((sum, x) => sum + x.reasonCredit, 0) / reasons.length : null,
      reasonAssessed: reasons.length, calibration: mean(calibrated, (x) => x.calibration),
      score: items.length ? Math.round(mean(items, (x) => x.score) * 100) / 100 : null, meanHintLevel: mean(items, (x) => x.hintLevel), categories };
  }
  function fieldsHtml(q, i) {
    const { esc } = App.utils, t = App.t, schema = reasonSchema(q);
    return '<div class="meta-inputs"><fieldset><legend>' + esc(t("meta.reason")) + '</legend>' + (schema ?
      schema.reasonOptions.map((text, j) => '<label class="meta-reason"><input type="radio" name="reason-' + i + '" data-reason="' + i + '" value="' + j + '"><span>' + esc(text) + '</span></label>').join("") :
      '<label><span class="hint">' + esc(t("meta.textNote")) + '</span><textarea class="input" data-reason-text="' + i + '" maxlength="800" rows="2" aria-label="' + esc(t("meta.reason")) + '"></textarea></label>') +
      '</fieldset><fieldset><legend>' + esc(t("meta.confidence")) + '</legend><div class="meta-confidence">' +
      CONFIDENCE.map((n) => '<label><input type="radio" name="confidence-' + i + '" data-confidence="' + i + '" value="' + n + '"><span>' + n + '%</span></label>').join("") + '</div></fieldset></div>';
  }
  function summaryHtml(m) {
    const { esc } = App.utils, t = App.t;
    return '<section class="meta-summary"><h3>' + esc(t("meta.summary")) + '</h3><p>' + esc(t("meta.metrics", {
      raw: Math.round(m.rawAccuracy * 100), independent: Math.round(m.independentAccuracy * 100), score: m.score
    })) + '</p><ul>' + Object.entries(m.categories).map(([key, n]) => '<li>' + esc(t("meta.category." + key)) + ': <b>' + n + '</b></li>').join("") +
      '</ul><p class="hint">' + esc(t("meta.caution")) + '</p></section>';
  }
  App.metacognition = { CONFIDENCE, SUPPORT, reasonSchema, observation, ready, evaluate, evidence, summarize, fieldsHtml, summaryHtml };
})();
