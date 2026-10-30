/* Structured boundaries for source-based study tools. No DOM, network or persistence. */
(function () {
  const text = (v, max = 2000) =>
    typeof v === "string" ? v.trim().slice(0, max) : "";
  const fail = () => {
    throw new Error(
      "Eksik veya tutarsız AI çıktısı. Yeniden dene. / Invalid AI output.",
    );
  };
  function sections(input) {
    const s = text(input, 12001);
    if (s.length < 40 || s.length > 12000)
      throw new Error(
        "Kaynak metin 40–12.000 karakter olmalı. / Source must contain 40–12,000 characters.",
      );
    return s
      .match(/[\s\S]{1,1800}/g)
      .map((body, i) => ({ id: i + 1, text: body }));
  }
  const sourcePrompt = (rows) =>
    rows.map((r) => "[S" + r.id + "] " + r.text).join("\n\n");
  function pack(d, rows) {
    if (!d || !text(d.title, 120)) return fail();
    const ref = (v) =>
      Array.isArray(v) &&
      v.length > 0 &&
      v.every((n) => Number.isInteger(n) && rows.some((r) => r.id === n));
    const summary = Array.isArray(d.summary) ? d.summary : [];
    const concepts = Array.isArray(d.concepts) ? d.concepts : [];
    const cards = Array.isArray(d.cards) ? d.cards : [];
    const quiz = Array.isArray(d.quiz) ? d.quiz : [];
    if (
      summary.length < 3 ||
      summary.length > 10 ||
      concepts.length < 2 ||
      concepts.length > 10 ||
      cards.length < 3 ||
      cards.length > 10 ||
      quiz.length < 3 ||
      quiz.length > 8
    )
      return fail();
    if (
      !summary.every((x) => text(x.text) && ref(x.refs)) ||
      !concepts.every(
        (x) => text(x.name, 100) && text(x.explain) && ref(x.refs),
      ) ||
      !cards.every((x) => text(x.front) && text(x.back) && ref(x.refs)) ||
      !quiz.every(
        (x) =>
          text(x.q) &&
          Array.isArray(x.options) &&
          x.options.length === 4 &&
          x.options.every((o) => text(o)) &&
          new Set(x.options.map((o) => o.trim())).size === 4 &&
          Number.isInteger(x.answer) &&
          x.answer >= 0 &&
          x.answer < 4 &&
          text(x.explain) &&
          ref(x.refs),
      )
    )
      return fail();
    return {
      title: text(d.title, 120),
      summary: summary.map((x) => ({ text: text(x.text), refs: x.refs })),
      concepts: concepts.map((x) => ({
        name: text(x.name, 100),
        explain: text(x.explain),
        refs: x.refs,
      })),
      cards: cards.map((x) => ({
        front: text(x.front),
        back: text(x.back),
        refs: x.refs,
      })),
      quiz: quiz.map((x) => ({
        q: text(x.q),
        options: x.options.map((o) => text(o, 500)),
        answer: x.answer,
        explain: text(x.explain),
        refs: x.refs,
      })),
    };
  }
  function validDate(s) {
    if (!/^\d{4}-\d{2}-\d{2}$/.test(s)) return false;
    const d = new Date(s + "T12:00:00Z");
    return Number.isFinite(+d) && d.toISOString().slice(0, 10) === s;
  }
  function task(d) {
    const title = text(d?.title, 160),
      subject = text(d?.subject, 80),
      due = text(d?.due, 10);
    if (!title || (due && !validDate(due)))
      throw new Error(
        "Başlık ve geçerli teslim tarihi gerekli. / Check title and date.",
      );
    const steps = (Array.isArray(d.steps) ? d.steps : [])
      .slice(0, 12)
      .map((s) => ({
        text: text(typeof s === "string" ? s : s?.text, 240),
        done: s?.done === true,
      }))
      .filter((s) => s.text);
    return { title, subject, due, steps, done: d.done === true };
  }
  function oral(d) {
    const rows = Array.isArray(d?.questions) ? d.questions : [];
    if (
      rows.length < 3 ||
      rows.length > 5 ||
      !rows.every(
        (q) =>
          text(q.q) &&
          text(q.expected) &&
          Array.isArray(q.criteria) &&
          q.criteria.length === 3 &&
          q.criteria.every((c) => text(c, 300)),
      )
    )
      return fail();
    return rows.map((q) => ({
      q: text(q.q),
      expected: text(q.expected),
      criteria: q.criteria.map((c) => text(c, 300)),
    }));
  }
  function feedback(d) {
    if (
      !Array.isArray(d?.criteria) ||
      d.criteria.length !== 3 ||
      !d.criteria.every(
        (c) =>
          Number.isInteger(c.score) &&
          c.score >= 0 &&
          c.score <= 2 &&
          text(c.note),
      ) ||
      !text(d.feedback) ||
      !text(d.followup)
    )
      return fail();
    return {
      criteria: d.criteria.map((c) => ({ score: c.score, note: text(c.note) })),
      feedback: text(d.feedback),
      followup: text(d.followup),
      score: d.criteria.reduce((s, c) => s + c.score, 0),
    };
  }
  App.studyWorkspaceModel = {
    sections,
    sourcePrompt,
    pack,
    task,
    validDate,
    oral,
    feedback,
  };
})();
