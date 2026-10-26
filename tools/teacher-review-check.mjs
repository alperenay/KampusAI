import fs from "node:fs";
import path from "node:path";
import vm from "node:vm";
import assert from "node:assert/strict";
import { webcrypto } from "node:crypto";
import { fileURLToPath } from "node:url";
import { researchBank } from "./fixtures/research-bank.mjs";
const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), ".."); let count = 0;
async function check(name, fn) { await fn(); count++; console.log("✓ " + name); }
function device() {
  const records = new Map(), writes = [];
  const ctx = vm.createContext({ console, btoa, atob, crypto: webcrypto, Uint8Array, AbortController,
    App: { data: {}, i18n: { lang: "tr" }, t: (k) => k, L: (s) => s, utils: { esc: String }, router: { register() {} }, db: {
      get: async (s, id) => structuredClone(records.get(s + ":" + id)),
      getAll: async (s) => Array.from(records).filter(([k]) => k.startsWith(s + ":")).map(([, v]) => structuredClone(v)),
      put: async (s, row) => { writes.push(s); records.set(s + ":" + row.id, structuredClone(row)); }, remove: async (s, id) => records.delete(s + ":" + id)
    } } });
  ctx.window = ctx;
  for (const file of ["metacognition", "scaffolding", "adaptive", "quiz", "research", "teacher-review", "yazili"]) vm.runInContext(fs.readFileSync(path.join(root, "js/modules/" + file + ".js"), "utf8"), ctx);
  return { App: ctx.App, ctx, records, writes };
}
const student = device(), teacher = device(), M = student.App.metacognition;
const qs = researchBank().map((q) => { const item = { ...q }; delete item.reasonOptions; delete item.reasonAnswer;
  return { ...item, chosen: 0, observation: { ...M.observation(), reasonText: "Tahmin ettim", confidence: 100, elapsedMs: 2000 } }; });
const quiz = { id: "review-test", label: "Test", key: "9/matematik/t2/k3", date: "2026-10-26T10:00:00Z", total: 10, correct: 10, questions: qs,
  metacognition: M.summarize(qs, qs.map((q) => q.chosen), qs.map((q) => q.observation)), adaptive: student.App.adaptive.result(qs, qs.map((q) => q.chosen), 2, qs.map((q) => q.observation)) };
await student.App.db.put("quizzes", quiz);
const request = await student.App.teacherReview.requestFor("quiz", quiz.id, "P-001");
await check("Serbest gerekçe isteği mevcut QR protokolünde taşınır; otomatik öğretmen puanı üretilmez", async () => {
  for (const frame of student.App.research.pack({ type: "review-request", data: request })) await teacher.App.research.receive(frame);
  const rows = await teacher.App.db.getAll("reviews"); assert.equal(rows.length, 1); assert.equal(rows[0].request.questions[0].observation.reasonText, "Tahmin ettim");
  assert.equal(rows[0].evaluation, undefined); assert.equal(quiz.metacognition.reasonAssessed, 0);
});
const reviewId = "request:" + teacher.App.teacherReview.digest(request);
const ratings = qs.map((q, i) => ({ index: i, criteria: [2, 1, 0], comment: "Kısmen yeterli" }));
const evaluation = await teacher.App.teacherReview.save(reviewId, ratings);
await check("Üç ölçüt kısmi kredi üretir; özgün doğruluk korunur", () => {
  const result = teacher.App.teacherReview.assessed(request, evaluation);
  assert.equal(result.metrics.rawAccuracy, 1); assert.equal(result.metrics.reasonAccuracy, 0.5);
  assert.equal(result.metrics.categories.partialReasoning, 10); assert.ok(result.metrics.score < 100);
});
await check("Geri bildirim normal profili günceller; tekrar paket aynı sonucu iki kez uygulamaz", async () => {
  const packet = teacher.App.research.pack({ type: "review-feedback", data: evaluation });
  for (const frame of packet) await student.App.research.receive(frame);
  const before = JSON.stringify(await student.App.db.get("quizzes", quiz.id));
  for (const frame of packet) await student.App.research.receive(frame);
  const after = await student.App.db.get("quizzes", quiz.id);
  assert.equal(JSON.stringify(after), before); assert.equal(after.correct, 10); assert.equal(after.date, quiz.date); assert.equal(after.metacognition.reasonAccuracy, 0.5);
  assert.ok(after.adaptive.endAbility < quiz.adaptive.endAbility);
});
await check("Eksik ölçüt, aralık dışı değer, çelişen revizyon ve değişen özgün cevap reddedilir", async () => {
  await assert.rejects(() => teacher.App.teacherReview.save(reviewId, ratings.slice(1)));
  await assert.rejects(() => teacher.App.teacherReview.save(reviewId, ratings.map((r) => ({ ...r, criteria: [2, 3, 1] }))));
  await assert.rejects(() => student.App.teacherReview.receive({ type: "review-feedback", data: { ...evaluation, ratings: ratings.map((r) => ({ ...r, criteria: [0, 0, 0] })) } }));
  const changed = await student.App.db.get("quizzes", quiz.id); changed.questions[0].chosen = 1; await student.App.db.put("quizzes", changed);
  await assert.rejects(() => student.App.teacherReview.receive({ type: "review-feedback", data: { ...evaluation, revision: 2 } }));
});
await check("Araştırma değerlendirmesi özgün A/B verisine ve kişisel testlere karışmaz", async () => {
  const session = await student.App.research.create({ title: "Araştırma", key: quiz.key, variable: "hints", reviewed: true, bank: researchBank() });
  const joined = await student.App.research.join(session.id, "RESEARCH-P"), ctx = await student.App.research.context(joined.id, quiz.key);
  const observations = researchBank().map(() => ({ ...M.observation(), chosen: 0, reasonChoice: 0, confidence: 100, elapsedMs: 1000 }));
  const record = await student.App.research.saveResult(ctx, Array.from({ length: 10 }, (_, i) => i), observations);
  const original = JSON.stringify(await student.App.db.get("research", record.id));
  const request = await student.App.teacherReview.requestFor("research", record.id, "RESEARCH-P");
  const hash = student.App.teacherReview.digest(request);
  await teacher.App.teacherReview.receive({ type: "review-request", data: request });
  const ev = await teacher.App.teacherReview.save("request:" + hash, ratings);
  await student.App.teacherReview.receive({ type: "review-feedback", data: ev });
  assert.equal(JSON.stringify(await student.App.db.get("research", record.id)), original);
});
await check("İlk üç soru erken bildirilir; iptal edilen üretim doğrulanmış partiden devam eder", async () => {
  const d = device(), ctrl = new AbortController(); let calls = 0;
  d.App.ai = { generate: async () => { calls++; return { model: "fixture", data: { questions: researchBank(30) } }; } };
  const args = [{ id: "9" }, { id: "math", name: "Math" }, { id: "u", name: "U" }, { id: "k", title: "T", content: {} }];
  await assert.rejects(() => d.App.quiz.generatePool(...args, { signal: ctrl.signal, onProgress: (info) => { assert.equal(info.ready, 3); ctrl.abort(); } }));
  assert.equal(calls, 1); calls = 0;
  const result = await d.App.quiz.generatePool(...args);
  assert.equal(calls, 3); assert.equal(result.data.questions.length, 12);
});
await check("Yazılı 3+2+2 soru üretir; tam yedi soru, 100 puan ve tutarlı ölçütler döner", async () => {
  const d = device(), units = [{ id: "u", name: "Tema", outcomes: [{ title: "Kazanım" }] }];
  d.App.data.curriculum = { grades: [{ id: "9", subjects: [{ id: "matematik", name: "Matematik", units }] }], findSubject: () => ({ units }) };
  let calls = 0; const progress = [];
  d.App.ai = { generate: async (options) => { calls++; return { model: "fixture", data: { sorular: Array.from({ length: 7 }, (_, i) => ({ metin: "Soru " + i, cevap: "Yanıt", olcut: [[99, "Tam"], [50, "Kısmi"], [0, "Boş"]] })) } }; } };
  const exam = await d.App.yazili.generate("9", "matematik", ["u"], { exams: [] }, { onProgress: (x) => progress.push(x.ready) });
  assert.equal(calls, 3); assert.equal(exam.sorular.length, 7); assert.equal(exam.sorular.reduce((s, q) => s + q.puan, 0), 100);
  assert.deepEqual(progress, [3, 5, 7]); exam.sorular.forEach((q) => { assert.equal(q.olcut[0][0], q.puan); assert.equal(q.olcut[2][0], 0); });
});
await check("Ortak AI generate katmanı sağlayıcı token akışını çağırana iletir", async () => {
  const d = device(), chunks = [];
  d.App.engine = { resolve: async () => ({ prepare: async () => {}, config: () => ({ chatModel: "fixture", direct: true }), chat: async (options) => { options.onDelta('{"x":', '{"x":'); options.onDelta('1}', '{"x":1}'); return { text: '{"x":1}', model: "fixture" }; } }) };
  vm.runInContext(fs.readFileSync(path.join(root, "js/ai/pipeline.js"), "utf8"), d.ctx);
  const result = await d.App.ai.generate({ prompt: "p", system: "s", onDelta: (piece) => chunks.push(piece) });
  assert.equal(result.data.x, 1); assert.equal(chunks.length, 2);
});
console.log(count + " teacher review / generation checks passed.");
