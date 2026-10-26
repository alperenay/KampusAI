// Birim + gerçek QR çizici/okuyucu + iki cihazlı aktarım/state bütünlüğü sınamaları.
import fs from "node:fs";
import vm from "node:vm";
import path from "node:path";
import assert from "node:assert/strict";
import { webcrypto } from "node:crypto";
import { createRequire } from "node:module";
import { fileURLToPath } from "node:url";
import { researchBank } from "./fixtures/research-bank.mjs";
const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const require = createRequire(import.meta.url);
const qrcode = require(path.join(root, "assets/vendor/qr/qrcode.js"));
const jsQR = require(path.join(root, "assets/vendor/qr/jsQR.js"));
let n = 0;
async function check(name, fn) { await fn(); n++; console.log("✓ " + name); }
function device(records = new Map()) {
  const writes = [];
  const ctx = vm.createContext({ console, btoa, atob, crypto: webcrypto, Uint8Array, setTimeout, clearTimeout,
    document: { createElement: () => ({}), head: { appendChild: (script) => script.onload() } }, qrcode,
    App: { utils: { esc: String, uid: () => "test-id" }, t: (s) => s, L: (s) => s, data: {}, i18n: { lang: "tr" },
      router: { register() {} }, db: {
        get: async (s, id) => structuredClone(records.get(s + ":" + id)),
        getAll: async (s) => Array.from(records).filter(([k]) => k.startsWith(s + ":")).map(([, v]) => structuredClone(v)),
        put: async (s, row) => { writes.push(s); records.set(s + ":" + row.id, structuredClone(row)); },
        remove: async (s, id) => { writes.push(s); records.delete(s + ":" + id); }
      } } });
  ctx.window = ctx;
  for (const file of ["metacognition", "scaffolding", "adaptive", "quiz", "research", "pairing", "classroom"])
    vm.runInContext(fs.readFileSync(path.join(root, "js/modules/" + file + ".js"), "utf8"), ctx, { filename: file });
  return { App: ctx.App, records, writes };
}
const teacher = device(), student = device(), M = teacher.App.metacognition, H = teacher.App.scaffolding, A = teacher.App.adaptive;
const question = researchBank()[0];
const observation = (params) => Object.assign(M.observation(), { reasonChoice: 0, confidence: 100 }, params);
await check("Model üretimi üç küçük partiye bölünür ve zorluk etiketleri doğrulanır", async () => {
  let calls = 0;
  teacher.App.ai = { generate: async (options) => {
    calls++; assert.ok(options.prompt.includes("TAM 10"));
    return { data: { questions: researchBank(30) }, model: "test-model" };
  } };
  const result = await teacher.App.quiz.generatePool({ id: "9" }, { name: "Fizik" }, { name: "Ünite" }, { title: "Kazanım", content: {} });
  assert.equal(calls, 3); assert.equal(result.data.questions.length, 30);
  assert.equal(new Set(result.data.questions.map((q) => q.q)).size, 30);
  teacher.App.ai.generate = async () => ({ data: { questions: researchBank(1) }, model: "bad" });
  await assert.rejects(() => teacher.App.quiz.generatePool({ id: "9" }, { name: "Fizik" }, { name: "Ünite" }, { title: "Kazanım", content: {} }));
});
await check("Gerekçe/eminlik göstergeleri: bilinçli, tahmin adayı, emin yanlış, hatalı gerekçe", () => {
  assert.equal(M.evaluate(question, 0, observation()).category, "consciousCorrect");
  assert.equal(M.evaluate(question, 0, observation({ confidence: 25 })).category, "guessCandidate");
  assert.equal(M.evaluate(question, 1, observation()).category, "misconceptionCandidate");
  assert.equal(M.evaluate(question, 0, observation({ reasonChoice: 1 })).category, "fragileCorrect");
  assert.equal(M.evaluate(question, -1, observation()).category, "unanswered");
});
await check("Serbest metin uzunluğundan doğruluk türetilmez; geçerli eminlik/gerekçe gerekir", () => {
  const q = { ...question }; delete q.reasonOptions; delete q.reasonAnswer;
  const o = observation({ reasonChoice: null, reasonText: "Uzun bir açıklama" });
  assert.equal(M.evaluate(q, 0, o).reasonCorrect, null);
  assert.equal(M.evaluate(q, 0, o).category, "unverifiedCorrect");
  assert.equal(M.ready(q, { ...o, confidence: 60 }), false);
  assert.equal(M.ready(q, { ...o, reasonText: " " }), false);
  assert.equal(M.ready(question, { ...o, reasonChoice: null }), false);
  assert.equal(M.evaluate(question, 0, observation({ confidence: null })).category, "unverifiedCorrect");
  assert.equal(M.reasonSchema({ ...question, reasonOptions: ["aynı", " aynı "], reasonAnswer: 0 }), null);
});
await check("Üç kademeli ipucu: tek tüketim, önceki eminlik ve zaman izi", () => {
  const o = observation({ confidence: 50 });
  for (let i = 0; i < 3; i++) assert.equal(H.consume(question, o, 100 * (i + 1)), question.hints[i]);
  assert.equal(H.consume(question, o, 500), null); assert.equal(o.hintEvents.length, 3);
  assert.equal(o.beforeHint.confidence, 50);
  assert.equal(H.normalize(["Doğru cevap A", "b", "c"]), null);
  assert.equal(H.normalize([question.explain, "b", "c"], question), null);
  assert.notEqual(H.texts({ explain: "SECRET ANSWER" })[2], "SECRET ANSWER");
});
await check("İpucuyla doğru: standart puan korunur, bağımsız başarı ve adaptif kanıt azalır", () => {
  const clean = observation(), helped = observation(); H.consume(question, helped, 1); H.consume(question, helped, 2); H.consume(question, helped, 3);
  assert.equal(M.evaluate(question, 0, helped).category, "supportedCorrect");
  assert.ok(M.evidence(question, 0, helped) < M.evidence(question, 0, clean));
  const qs = Array.from({ length: 10 }, () => question), answers = new Array(10).fill(0);
  const plain = A.result(qs, answers, 2, qs.map(() => clean)), hints = A.result(qs, answers, 2, qs.map(() => helped));
  assert.equal(plain.score, hints.score); assert.ok(hints.endAbility < plain.endAbility);
  assert.equal(M.summarize(qs, answers, qs.map(() => helped)).independentAccuracy, 0);
  assert.equal(M.summarize(qs, answers, qs.map(() => clean)).independentAccuracy, 1);
});
await check("Tüm cevap/eminlik/ipucu kombinasyonlarında puanlar sonlu ve sınırlı", () => {
  for (const chosen of [-1, 0, 1]) for (const confidence of [null, 25, 50, 75, 100]) for (const reasonChoice of [null, 0, 1]) for (let hints = 0; hints <= 3; hints++) {
    const o = observation({ confidence, reasonChoice, hintLevel: hints });
    const result = M.evaluate(question, chosen, o);
    assert.ok(Number.isFinite(result.score) && result.score >= 0 && result.score <= 100);
    const ability = A.update(2, 2, chosen === 0, M.evidence(question, chosen, o));
    assert.ok(ability >= 1 && ability <= 3);
  }
});
const R = teacher.App.research;
const session = await R.create({ title: "Türkçe fizik oturumu", key: "9/fizik/u1/k1", variable: "hints", reviewed: true, bank: researchBank() });
let participant = "P0";
for (let i = 0; i < 100; i++) if (R.policy(session, "P" + i).group === "B") { participant = "P" + i; break; }
await check("A/B parametrelerinde yalnız seçili özellik değişir; atama tekrar üretilebilir", () => {
  const b = R.policy(session, participant);
  assert.equal(b.group, "B"); assert.equal(b.adaptive, false); assert.equal(b.hints, true);
  assert.equal(R.policy(session, participant).group, b.group);
  assert.throws(() => R.policy(session, "Gerçek Ad"));
});
await check("Bozuk/eksik banka, bilinmeyen sürüm ve inceleme onayı reddedilir", async () => {
  assert.throws(() => R.sessionFrom({ ...session, v: 2 }));
  assert.throws(() => R.sessionFrom({ ...session, reviewed: false }));
  assert.throws(() => R.bankFrom(researchBank(9)));
  assert.throws(() => R.bankFrom(researchBank().map((q) => ({ ...q, reasonAnswer: 99 }))));
  assert.throws(() => R.pack({ type: "session", data: "x".repeat(100000) }));
});
function readQR(text) {
  const qr = qrcode(0, "M"); qr.addData(text); qr.make();
  const scale = 4, quiet = 4, count = qr.getModuleCount(), width = (count + quiet * 2) * scale;
  const pixels = new Uint8ClampedArray(width * width * 4).fill(255);
  for (let y = 0; y < count; y++) for (let x = 0; x < count; x++) if (qr.isDark(y, x)) {
    for (let dy = 0; dy < scale; dy++) for (let dx = 0; dx < scale; dx++) {
      const at = (((y + quiet) * scale + dy) * width + (x + quiet) * scale + dx) * 4;
      pixels[at] = pixels[at + 1] = pixels[at + 2] = 0;
    }
  }
  const result = jsQR(pixels, width, width, { inversionAttempts: "dontInvert" });
  assert.ok(result, "Gerçek QR okuyucu kareyi çözmeli"); return result.data;
}
const frames = R.pack({ type: "session", data: session });
await check("Mevcut QR renderer SVG üretir; gerçek qrcode/jsQR ile tüm parçalar okunur", async () => {
  const el = { innerHTML: "", querySelector: () => ({ setAttribute() {} }) };
  await teacher.App.pairing.renderQR(el, frames[0]);
  assert.ok(el.innerHTML.includes("<svg"));
  for (const text of frames) assert.equal(readQR(text), text);
});
await check("Sırasız ve tekrarlı parçalar iki cihaz arasında bir oturum oluşturur", async () => {
  const first = await student.App.research.receive(frames[0]); assert.equal(first.kind, "partial");
  const dup = await student.App.research.receive(frames[0]); assert.equal(dup.received, 1);
  const restarted = device(student.records); // Aynı yerel depoyu yeni modül örneğiyle yeniden aç.
  let last;
  for (const text of frames.slice(1).reverse()) last = await restarted.App.research.receive(text);
  assert.equal(last.kind, "session"); assert.equal(last.session.title, session.title);
  for (const text of frames) await student.App.research.receive(text);
  assert.equal((await student.App.db.getAll("research")).filter((r) => r.kind === "session").length, 1);
});
await check("Eksik/kırık, başka protokol ve şişirilmiş QR paketleri reddedilir", async () => {
  assert.equal(R.frame("KAI1;abc"), null); assert.equal(R.frame("KAIR1;aaaaaaaa;0;999;x"), null);
  assert.equal(R.frame("KAIR1;aaaaaaaa;0;1;" + "x".repeat(641)), null);
  assert.throws(() => R.unpack(["aaaa"], "deadbeef"));
  const copy = frames.slice(); copy[copy.length - 1] = copy[copy.length - 1].slice(0, -1) + (copy[copy.length - 1].endsWith("A") ? "B" : "A");
  const broken = device();
  await assert.rejects(async () => { for (const frame of copy) await broken.App.research.receive(frame); });
  assert.equal((await broken.App.db.getAll("research")).filter((r) => r.kind === "session").length, 0);
});
const joined = await student.App.research.join(session.id, participant);
const context = await student.App.research.context(joined.id, session.key);
const observations = researchBank().map((q) => {
  const o = observation({ elapsedMs: 1000 }); H.consume(q, o, 100);
  return { ...o, chosen: 0 };
});
const result = await student.App.research.saveResult(context, researchBank().map((q, i) => i), observations);
await check("Deney normal state'e yazmaz; öğrenci sonucu öğretmende yeniden puanlanır", async () => {
  assert.equal(result.metrics.rawAccuracy, 1); assert.equal(result.metrics.independentAccuracy, 0);
  assert.ok(student.writes.every((s) => s === "research"));
  const packet = student.App.research.resultPacket(result); packet.data.score = 999;
  for (const text of student.App.research.pack(packet)) await R.receive(text);
  const saved = await teacher.App.db.get("research", result.id);
  assert.ok(saved.metrics.score <= 100); assert.equal(saved.group, "B");
  assert.ok(teacher.writes.every((s) => s === "research"));
});
await check("Tekrar sonuç aktarımı sayıyı artırmaz; tamamlanan katılım tekrar başlatılmaz", async () => {
  for (const text of student.App.research.pack(student.App.research.resultPacket(result))) await R.receive(text);
  assert.equal(R.compare(await teacher.App.db.getAll("research"), session.id).B.n, 1);
  await assert.rejects(() => student.App.research.context(joined.id, session.key));
});
await check("Grup, soru sırası, ipucu izi ve eminlik değişiklikleri doğrulanır", () => {
  const changed = structuredClone(result.data); changed.indices[1] = changed.indices[0];
  assert.throws(() => R.resultFrom(changed, session));
  const bad = structuredClone(result.data); bad.observations[0].confidence = 999;
  assert.throws(() => R.resultFrom(bad, session));
  const trace = structuredClone(result.data); trace.observations[0].hintEvents[0].atMs = 5000;
  assert.throws(() => R.resultFrom(trace, session));
  const hash = structuredClone(result.data); hash.sessionHash = "00000000";
  assert.throws(() => R.resultFrom(hash, session));
  let control;
  for (let i = 0; i < 100; i++) if (R.policy(session, "C" + i).group === "A") { control = "C" + i; break; }
  assert.throws(() => R.resultFrom({ ...result.data, participant: control }, session), "Kontrol grubunda ipucu kullanımı reddedilmeli");
});
await check("Adaptif deney B akışı yeniden üretilir; iki grup aynı başlangıç ve bankayı kullanır", async () => {
  const adaptive = await R.create({ title: "Adaptif kontrol", key: session.key, variable: "adaptive", reviewed: true, bank: researchBank(30) });
  let code;
  for (let i = 0; i < 100; i++) if (R.policy(adaptive, "D" + i).group === "B") { code = "D" + i; break; }
  const used = new Set(), indices = [], observations = []; let ability = 2;
  for (let i = 0; i < 10; i++) {
    const selected = A.pick(adaptive.bank, used, ability), o = observation({ elapsedMs: 1000 });
    used.add(selected.i); indices.push(selected.i); observations.push({ ...o, chosen: 0 });
    ability = A.update(ability, selected.q.difficulty, true, M.evidence(selected.q, 0, o));
  }
  const row = R.resultFrom({ v: 1, sessionId: adaptive.id, sessionHash: R.sessionHash(adaptive), participant: code, indices, observations }, adaptive);
  assert.equal(indices[0], 1); assert.equal(row.adaptive.startAbility, 2); assert.equal(row.metrics.rawAccuracy, 1);
  const changed = structuredClone(row.data); [changed.indices[0], changed.indices[1]] = [changed.indices[1], changed.indices[0]];
  assert.throws(() => R.resultFrom(changed, adaptive));
});
await check("Aynı kimliğe farklı oturum içeriği geldiğinde eski paket korunur", async () => {
  const conflicting = { ...session, title: "Değiştirilmiş" };
  await assert.rejects(async () => { for (const text of R.pack({ type: "session", data: conflicting })) await R.receive(text); });
  assert.equal((await teacher.App.db.get("research", "session:" + session.id)).session.title, session.title);
});
await check("Eski KAI1 sınıf kodları yeni metabilişsel özetle geriye uyumludur", () => {
  const old = { v: 1, a: "P1", w: [], p: { n: 10, i: 80 } };
  const text = teacher.App.classroom.encode(old), decoded = teacher.App.classroom.decode(text);
  assert.equal(decoded.p.i, 80); assert.equal(R.frame(text), null);
});
console.log(n + " gerekçe/eminlik, ipucu ve araştırma/QR sınaması geçti.");
