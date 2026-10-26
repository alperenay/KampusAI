/* research.js — tak-çıkar araştırma katmanı. Yalnızca yerel "research" deposuna yazar.
   KAIR1; paketleri KAI1; sınıf kodlarını ve normal quizzes state'ini değiştirmez.
   Sağlama toplamı bozulmayı bulur; kimlik doğrulama veya şifreleme sağlamaz. */
(function () {
  const PREFIX = "KAIR1;", CHUNK = 640, MAX = 100000;
  const idOK = (s) => typeof s === "string" && /^[A-Za-z0-9_-]{1,48}$/.test(s);
  const fail = (key) => { throw new Error(App.t("research.error." + key)); };
  const copy = (obj) => JSON.parse(JSON.stringify(obj));
  function hash(text) {
    let h = 2166136261;
    for (let i = 0; i < text.length; i++) h = Math.imul(h ^ text.charCodeAt(i), 16777619);
    return (h >>> 0).toString(16).padStart(8, "0");
  }
  function bankFrom(bank) {
    if (!Array.isArray(bank) || bank.length < 10 || bank.length > 30) fail("bank");
    const normalized = App.quiz.normalize({ questions: bank }, true);
    if (normalized.length !== bank.length || normalized.some((q) => !App.metacognition.reasonSchema(q) || !App.scaffolding.normalize(q.hints, q)) ||
        normalized.some((q) => q.q.length > 2000 || q.explain.length > 2000 || q.options.some((x) => x.length > 600))) fail("bank");
    return normalized;
  }
  function sessionFrom(s) {
    if (!s || s.v !== 1 || !idOK(s.id) || !idOK(s.seed) || typeof s.title !== "string" || !s.title.trim() || s.title.length > 100 ||
        typeof s.key !== "string" || !/^[\w-]+\/[\w-]+\/[\w-]+\/[\w-]+$/.test(s.key) || !["hints", "adaptive"].includes(s.variable) || s.reviewed !== true) fail("session");
    return { v: 1, id: s.id, seed: s.seed, title: s.title.trim(), key: s.key, variable: s.variable, reviewed: true, bank: bankFrom(s.bank) };
  }
  const sessionHash = (s) => hash(JSON.stringify(sessionFrom(s)));
  function policy(s, participant) {
    if (!idOK(participant)) fail("participant");
    const group = parseInt(hash(s.seed + ":" + s.id + ":" + participant), 16) % 2 ? "B" : "A";
    return { group, adaptive: s.variable === "adaptive" && group === "B", hints: s.variable === "hints" && group === "B", feedback: "end" };
  }
  function newId() {
    const bytes = new Uint8Array(12);
    crypto.getRandomValues(bytes);
    return Array.from(bytes, (x) => x.toString(16).padStart(2, "0")).join("");
  }
  async function create(params) {
    const session = sessionFrom(Object.assign({}, params, { v: 1, id: newId(), seed: newId() }));
    pack({ type: "session", data: session }); // Boyut sınırı oluştururken de kontrol edilir.
    await App.db.put("research", { id: "session:" + session.id, kind: "session", owner: true, session });
    return session;
  }
  async function join(sessionId, participant) {
    if (!idOK(participant)) fail("participant");
    const row = await App.db.get("research", "session:" + sessionId);
    if (!row) fail("unknownSession");
    const s = sessionFrom(row.session), group = policy(s, participant).group;
    const joined = { id: "join:" + s.id + ":" + participant, kind: "join", sessionId: s.id, participant, group };
    await App.db.put("research", joined);
    return joined;
  }
  async function context(joinId, key) {
    const joined = await App.db.get("research", joinId);
    if (!joined || joined.kind !== "join") fail("session");
    const row = await App.db.get("research", "session:" + joined.sessionId);
    if (!row) fail("unknownSession");
    const session = sessionFrom(row.session);
    if (session.key !== key) fail("session");
    if (await App.db.get("research", "result:" + session.id + ":" + joined.participant)) fail("completed");
    return { session, participant: joined.participant, policy: policy(session, joined.participant) };
  }
  function cleanObservation(q, value) {
    if (!value || !Number.isInteger(value.chosen) || value.chosen < -1 || value.chosen >= q.options.length ||
        !Number.isInteger(value.hintLevel) || value.hintLevel < 0 || value.hintLevel > 3 || !Array.isArray(value.hintEvents) || value.hintEvents.length !== value.hintLevel ||
        !Number.isInteger(value.elapsedMs) || value.elapsedMs < 0 || value.elapsedMs > 86400000 ||
        ![null, 25, 50, 75, 100].includes(value.confidence) ||
        !(value.reasonChoice === null || Number.isInteger(value.reasonChoice) && value.reasonChoice >= 0 && value.reasonChoice < q.reasonOptions.length) ||
        typeof value.reasonText !== "string" || value.reasonText.length > 800) fail("result");
    let previous = 0;
    const events = value.hintEvents.map((event, i) => {
      if (!event || event.level !== i + 1 || !Number.isInteger(event.atMs) || event.atMs < previous || event.atMs > value.elapsedMs) fail("result");
      previous = event.atMs;
      return { level: event.level, atMs: event.atMs };
    });
    let beforeHint = null;
    if (value.hintLevel) {
      const b = value.beforeHint;
      if (!b || ![null, 25, 50, 75, 100].includes(b.confidence) ||
          !(b.reasonChoice === null || Number.isInteger(b.reasonChoice) && b.reasonChoice >= 0 && b.reasonChoice < q.reasonOptions.length) || typeof b.reasonText !== "string" || b.reasonText.length > 800) fail("result");
      beforeHint = { confidence: b.confidence, reasonChoice: b.reasonChoice, reasonText: b.reasonText };
    }
    const out = { chosen: value.chosen, confidence: value.confidence, reasonChoice: value.reasonChoice, reasonText: value.reasonText,
      hintLevel: value.hintLevel, hintEvents: events, beforeHint, elapsedMs: value.elapsedMs };
    if (out.chosen >= 0 && !App.metacognition.ready(q, out)) fail("result");
    return out;
  }
  function resultFrom(data, session) {
    session = sessionFrom(session);
    if (!data || data.v !== 1 || data.sessionId !== session.id || data.sessionHash !== sessionHash(session) || !idOK(data.participant) ||
        !Array.isArray(data.indices) || data.indices.length !== 10 || !Array.isArray(data.observations) || data.observations.length !== 10) fail("result");
    const p = policy(session, data.participant), used = new Set(), questions = [], answers = [], observations = [];
    let ability = 2;
    data.indices.forEach((index, i) => {
      if (!Number.isInteger(index) || index < 0 || index >= session.bank.length || used.has(index)) fail("result");
      const expected = p.adaptive ? App.adaptive.pick(session.bank, used, ability).i : i;
      if (index !== expected) fail("result");
      const q = session.bank[index], o = cleanObservation(q, data.observations[i]);
      if (!p.hints && o.hintLevel) fail("result");
      used.add(index); questions.push(q); answers.push(o.chosen); observations.push(o);
      ability = App.adaptive.update(ability, q.difficulty, o.chosen === q.answer, App.metacognition.evidence(q, o.chosen, o));
    });
    const clean = { v: 1, sessionId: session.id, sessionHash: sessionHash(session), participant: data.participant, indices: data.indices.slice(), observations };
    return { id: "result:" + session.id + ":" + data.participant, kind: "result", sessionId: session.id, participant: data.participant, group: p.group,
      data: clean, metrics: App.metacognition.summarize(questions, answers, observations), adaptive: App.adaptive.result(questions, answers, 2, observations) };
  }
  async function saveResult(ctx, indices, observations) {
    const record = resultFrom({ v: 1, sessionId: ctx.session.id, sessionHash: sessionHash(ctx.session), participant: ctx.participant, indices, observations }, ctx.session);
    const existing = await App.db.get("research", record.id);
    if (existing && JSON.stringify(existing.data) !== JSON.stringify(record.data)) fail("completed");
    if (!existing) await App.db.put("research", record);
    return existing || record;
  }
  function pack(payload) {
    const encoded = btoa(unescape(encodeURIComponent(JSON.stringify({ v: 1, type: payload.type, data: payload.data })))).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
    if (!["session", "result", "review-request", "review-feedback"].includes(payload.type) || encoded.length > MAX) fail("size");
    const digest = hash(encoded), total = Math.ceil(encoded.length / CHUNK);
    return Array.from({ length: total }, (_, i) => PREFIX + digest + ";" + i + ";" + total + ";" + encoded.slice(i * CHUNK, (i + 1) * CHUNK));
  }
  function frame(text) {
    if (typeof text !== "string" || text.length > CHUNK + 50) return null;
    const m = /^KAIR1;([a-f0-9]{8});(\d{1,3});(\d{1,3});([A-Za-z0-9_-]+)$/.exec(text.trim());
    if (!m) return null;
    const index = Number(m[2]), total = Number(m[3]);
    return total > 0 && total <= Math.ceil(MAX / CHUNK) && index < total && m[4].length <= CHUNK && (index === total - 1 || m[4].length === CHUNK)
      ? { hash: m[1], index, total, chunk: m[4] } : null;
  }
  function unpack(chunks, digest) {
    const encoded = chunks.join("");
    if (encoded.length > MAX || hash(encoded) !== digest) fail("checksum");
    let data;
    try { data = JSON.parse(decodeURIComponent(escape(atob(encoded.replace(/-/g, "+").replace(/_/g, "/"))))); }
    catch (e) { fail("packet"); }
    if (!data || data.v !== 1 || !["session", "result", "review-request", "review-feedback"].includes(data.type)) fail("packet");
    return data;
  }
  let queue = Promise.resolve();
  function receive(text) {
    const work = queue.then(() => receiveInner(text));
    queue = work.catch(() => {});
    return work;
  }
  async function receiveInner(text) {
    const f = frame(text);
    if (!f) fail("packet");
    // Yarım aktarımlar yeniden açılışta sürdürülebilir; en çok sekiz paket tutulur.
    const transfers = (await App.db.getAll("research")).filter((r) => r.kind === "transfer").sort((a, b) => a.at - b.at);
    for (const old of transfers.filter((r, i) => Date.now() - r.at > 86400000 || i < transfers.length - 7)) await App.db.remove("research", old.id);
    const id = "transfer:" + f.hash + ":" + f.total;
    const part = (await App.db.get("research", id)) || { id, kind: "transfer", at: Date.now(), chunks: new Array(f.total).fill(null) };
    if (part.chunks[f.index] && part.chunks[f.index] !== f.chunk) fail("checksum");
    part.chunks[f.index] = f.chunk;
    const received = part.chunks.filter(Boolean).length;
    if (received < f.total) { await App.db.put("research", part); return { kind: "partial", received, total: f.total }; }
    const payload = unpack(part.chunks, f.hash);
    if (payload.type === "review-request" || payload.type === "review-feedback") {
      if (!App.teacherReview) fail("packet");
      const result = await App.teacherReview.receive(payload);
      await App.db.remove("research", id);
      return result;
    }
    if (payload.type === "session") {
      const session = sessionFrom(payload.data), sid = "session:" + session.id;
      const existing = await App.db.get("research", sid);
      if (existing && sessionHash(existing.session) !== sessionHash(session)) fail("conflict");
      if (!existing) await App.db.put("research", { id: sid, kind: "session", owner: false, session });
      await App.db.remove("research", id);
      return { kind: "session", session, duplicate: !!existing };
    }
    const row = await App.db.get("research", "session:" + (payload.data && payload.data.sessionId));
    if (!row) fail("unknownSession");
    const record = resultFrom(payload.data, row.session), existing = await App.db.get("research", record.id);
    if (existing && JSON.stringify(existing.data) !== JSON.stringify(record.data)) fail("conflict");
    if (!existing) await App.db.put("research", record);
    await App.db.remove("research", id);
    return { kind: "result", record: existing || record, duplicate: !!existing };
  }
  function resultPacket(record) {
    // Araştırma bankaları seçmeli gerekçe içerir; serbest metin aktarılmaz.
    const data = copy(record.data);
    data.observations.forEach((o) => { o.reasonText = ""; if (o.beforeHint) o.beforeHint.reasonText = ""; });
    return { type: "result", data };
  }
  function compare(records, sessionId) {
    const rows = records.filter((r) => r.kind === "result" && r.sessionId === sessionId);
    const group = (name) => {
      const list = rows.filter((r) => r.group === name);
      const mean = (key) => list.length ? list.reduce((sum, r) => sum + r.metrics[key], 0) / list.length : null;
      return { n: list.length, accuracy: mean("rawAccuracy"), independent: mean("independentAccuracy"), score: mean("score"), hints: mean("meanHintLevel") };
    };
    const A = group("A"), B = group("B");
    return { A, B, difference: A.n && B.n ? B.accuracy - A.accuracy : null };
  }
  App.research = { PREFIX, CHUNK, MAX, hash, bankFrom, sessionFrom, sessionHash, policy, newId, create, join, context,
    resultFrom, saveResult, pack, frame, unpack, receive, resultPacket, compare };
})();
