/* Isolated offline practice. Results/drafts use namespaced meta rows (existing backup/sync).
   No writes to quizzes, research, reviews or calibrated mastery estimates. */
(function () {
  const B = App.practiceBank, copy = (x) => JSON.parse(JSON.stringify(x));
  const hash = (s) => { let h = 2166136261; for (let i = 0; i < s.length; i++) h = Math.imul(h ^ s.charCodeAt(i), 16777619); return h >>> 0; };
  const modeOK = (m) => m === "transfer" || m === "error";
  function items(mode, topic) {
    if (!modeOK(mode)) throw new Error("Unknown practice mode");
    if (mode === "transfer") { const f = B.families.find((x) => x.id === topic); if (!f) throw new Error("Unknown topic"); return f.tasks; }
    const list = B.errors.filter((x) => topic === "all" || x.subject === topic);
    if (!list.length) throw new Error("Unknown topic"); return list;
  }
  function question(s, index) { return items(s.mode, s.topic).find((q) => q.id === s.queue[index]); }
  function create(mode, topic, seed) {
    const id = seed || App.utils.uid("practice"), pool = items(mode, topic).slice();
    if (mode === "error") pool.sort((a, b) => hash(id + a.id) - hash(id + b.id));
    return { version: B.version, id, mode, topic, queue: pool.slice(0, 3).map((q) => q.id), responses: [], startedAt: new Date().toISOString() };
  }
  function valid(s) {
    try { return !!(s && s.version === B.version && typeof s.id === "string" && /^[\w-]{1,100}$/.test(s.id) && modeOK(s.mode) &&
      Array.isArray(s.queue) && s.queue.length === 3 && new Set(s.queue).size === 3 && s.queue.every((id) => items(s.mode, s.topic).some((q) => q.id === id)) &&
      Array.isArray(s.responses) && s.responses.length <= 3 && s.responses.every((r, i) => { const q = question(s, i); return r.id === q.id && Number.isInteger(r.choice) && r.choice >= 0 && r.choice < (s.mode === "error" ? q.steps.length : q.options.length) &&
        (s.mode !== "error" || Number.isInteger(r.reason) && r.reason >= 0 && r.reason < q.reasons.length) && Number.isFinite(r.elapsedMs) && r.elapsedMs >= 0; })); } catch (e) { return false; }
  }
  function answer(s, choice, reason, elapsedMs) {
    if (!valid(s) || s.responses.length >= 3) throw new Error("Invalid practice session");
    const next = copy(s), q = question(s, s.responses.length), max = s.mode === "error" ? q.steps.length : q.options.length;
    if (!Number.isInteger(choice) || choice < 0 || choice >= max || s.mode === "error" && (!Number.isInteger(reason) || reason < 0 || reason >= q.reasons.length)) throw new Error("Incomplete answer");
    next.responses.push({ id: q.id, choice, reason: s.mode === "error" ? reason : null, elapsedMs: Math.max(0, Math.min(864e5, Number(elapsedMs) || 0)) }); return next;
  }
  function summary(s) {
    if (!valid(s)) throw new Error("Invalid practice session");
    const rows = s.responses.map((r, i) => { const q = question(s, i), correct = r.choice === (s.mode === "error" ? q.bad : q.answer), reasonCorrect = s.mode === "error" ? r.reason === q.reason : null;
      return { id: q.id, context: q.context || "error", correct, reasonCorrect, complete: correct && reasonCorrect !== false, elapsedMs: r.elapsedMs }; });
    return { total: rows.length, correct: rows.filter((x) => x.correct).length, reasonCorrect: s.mode === "error" ? rows.filter((x) => x.reasonCorrect).length : null, complete: rows.filter((x) => x.complete).length, rows };
  }
  const draftId = (mode, topic) => "practice:draft:" + mode + ":" + topic;
  const resultId = (s) => "practice:result:" + s.id;
  async function load(mode, topic) { const row = await App.db.get("meta", draftId(mode, topic)); return row && valid(row.session) && row.session.mode === mode && row.session.topic === topic ? row.session : null; }
  async function save(s) { if (!valid(s)) throw new Error("Invalid practice session"); await App.db.put("meta", { id: draftId(s.mode, s.topic), kind: "practice-draft", session: copy(s) }); }
  async function finish(s) {
    if (!valid(s) || s.responses.length !== 3) throw new Error("Incomplete practice session");
    const id = resultId(s), prior = await App.db.get("meta", id);
    const row = prior || { id, kind: "practice-result", version: B.version, mode: s.mode, topic: s.topic, at: new Date().toISOString(), session: copy(s), metrics: summary(s) };
    if (!prior) await App.db.put("meta", row);
    // Delete only this session's draft: a concurrent/newer run must survive.
    const draft = await App.db.get("meta", draftId(s.mode, s.topic));
    if (draft && draft.session.id === s.id) await App.db.remove("meta", draftId(s.mode, s.topic));
    return row;
  }
  async function history(mode) { return (await App.db.getAll("meta")).filter((r) => r.kind === "practice-result" && r.mode === mode && valid(r.session) && r.session.responses.length === 3).map((r) => Object.assign({}, r, { topic: r.session.topic, metrics: summary(r.session) })).sort((a, b) => String(b.at).localeCompare(String(a.at))); }
  function order(s, q, count) { return Array.from({ length: count }, (_, i) => i).sort((a, b) => hash(s.id + q.id + a) - hash(s.id + q.id + b)); }
  App.practice = { create, valid, question, answer, summary, load, save, finish, history, order, items, draftId };
})();
