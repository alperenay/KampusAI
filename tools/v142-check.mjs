// v1.42 sınaması: birleşik tekrar kuyruğu, çevrimdışı QR Sınıf Modu kodlaması ve haftalık üstbiliş karnesi.
// Gerçek modüller izole bir bellek içi veritabanıyla çalıştırılır; ağ, kamera ve yapay zekâ gerekmez.
import fs from "node:fs";
import path from "node:path";
import vm from "node:vm";
import assert from "node:assert/strict";
import { fileURLToPath } from "node:url";
const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const DAY = 864e5, NOW = Date.parse("2026-10-27T10:00:00Z");

const stores = {};
const db = {
  async getAll(s) { return Object.values(stores[s] || {}).map((x) => structuredClone(x)); },
  async get(s, id) { return stores[s] && stores[s][id] ? structuredClone(stores[s][id]) : undefined; },
  async put(s, r) { (stores[s] = stores[s] || {})[r.id] = structuredClone(r); return r.id; },
  async remove(s, id) { if (stores[s]) delete stores[s][id]; }
};
const lessons = { find: (k) => /^9\/matematik\/t1\/k[1-3]$/.test(k) ? { grade: { id: "9" }, subject: { id: "matematik", name: "Matematik" }, unit: { id: "t1" }, outcome: { id: k.split("/")[3], title: "Kazanım " + k.split("/")[3], code: "MAT." + k.split("/")[3] } } : null };
const ctx = vm.createContext({
  App: { utils: { esc: String, uid: (p) => p + "_" + Math.random().toString(36).slice(2, 8), debounce: (f) => f, loadScript: async () => {} }, router: { register() {} }, i18n: { lang: "tr", locale: "tr-TR" },
    t: (k) => k, L: (s) => s, data: {}, db, lessons, prefs: { get: (k, d) => d, set() {} } },
  console, structuredClone, TextEncoder, TextDecoder, CompressionStream, DecompressionStream, Blob, Response, btoa, atob, Date, Math
});
for (const file of ["adaptive", "mistakes", "review-queue", "sinif-modu", "karne"]) {
  vm.runInContext(fs.readFileSync(path.join(root, "js/modules/" + file + ".js"), "utf8"), ctx, { filename: file });
}
const { reviewQueue: RQ, sinifModu: SM, karne: K, mistakes: MI } = ctx.App;
ctx.App.cards = { async stats() { const all = await db.getAll("cards"); return { all, newLeft: 2 }; } };
ctx.App.feedback = { async all() { return (await db.getAll("meta")).filter((r) => r.kind === "ai-fb"); } };

let checks = 0;
async function check(name, fn) { await fn(); checks++; console.log("✓ " + name); }
const iso = (t) => new Date(t).toISOString();
// vm içindeki diziler başka bir "realm"dandır: karşılaştırmadan önce düz JSON'a çevir
const eq = (a, b, m) => assert.deepEqual(JSON.parse(JSON.stringify(a)), JSON.parse(JSON.stringify(b)), m);

/* ---------------- Tekrar kuyruğu ---------------- */
await check("Öncelik: tür ağırlığı + gecikme (en çok 40) + zayıflık; yanlış en önde", () => {
  assert.equal(RQ.priority("mistake", 0, 0), 40);
  assert.equal(RQ.priority("card", 30, 0), 20 + 40);
  assert.ok(RQ.priority("mistake", 0, 0.5) > RQ.priority("quiz", 0, 0.5));
  assert.ok(RQ.priority("card", 5, 0) > RQ.priority("card", 1, 0));
});
await check("Ortak merdiven: Bildim bir basamak çıkar, Bilemedim yarına döner", () => {
  const a = RQ.ladderNext(0, true, NOW); assert.equal(a.box, 1); assert.equal(Date.parse(a.due) - NOW, 3 * DAY);
  const b = RQ.ladderNext(4, true, NOW); assert.equal(b.box, 4);
  const c = RQ.ladderNext(3, false, NOW); assert.equal(c.box, 0); assert.equal(Date.parse(c.due) - NOW, DAY);
});
await check("Test konusu aralığı yetenek düştükçe kısalır", () => {
  eq([1.2, 2, 2.4, 2.7, 3].map(RQ.quizInterval), [1, 3, 7, 16, 35]);
});
await check("Dört kaynak tek listede, kayıt biçimleri değişmeden birleşir", async () => {
  const k1 = "9/matematik/t1/k1", k2 = "9/matematik/t1/k2";
  await db.put("mistakes", { id: "m1", key: k1, label: "Yanlış", q: "Soru", reviews: 0, mastered: false, nextAt: iso(NOW - 2 * DAY) });
  await db.put("mistakes", { id: "m2", key: k1, label: "Gelecek", q: "Soru", reviews: 1, mastered: false, nextAt: iso(NOW + 5 * DAY) });
  await db.put("quizzes", { id: "q1", key: k2, date: iso(NOW - 2 * DAY), total: 10, correct: 2 });      // zayıf → 1 gün
  await db.put("quizzes", { id: "q2", key: "9/matematik/t1/k3", date: iso(NOW - 2 * DAY), total: 10, correct: 10 });   // güçlü → 35 gün
  await db.put("cards", { id: "c1", key: k1, box: 2, due: iso(NOW - DAY), lapses: 0 });
  await db.put("cards", { id: "c2", key: k1, box: 0, added: iso(NOW) });
  await db.put("meta", { id: "ai-fb:quiz:x", kind: "ai-fb", ref: "quiz:x", rating: "wrong", source: "quiz", key: k1, q: "Hatalı soru", at: iso(NOW - 3 * DAY) });
  await db.put("meta", { id: "ai-fb:chat:y", kind: "ai-fb", ref: "chat:y", rating: "up", source: "chat", q: "İyi", at: iso(NOW - 3 * DAY) });
  const list = await RQ.list({ now: NOW });
  eq(list.map((x) => x.type), ["mistake", "quiz", "feedback", "card"]);
  assert.equal(list.find((x) => x.type === "card").n, 2);
  assert.ok(!list.some((x) => x.id === "mistake:m2"));
  assert.ok(!list.some((x) => x.key === "9/matematik/t1/k3"));
  assert.equal(stores.mistakes.m1.nextAt, iso(NOW - 2 * DAY));          // okuma kaydı değiştirmez
});
await check("Satır içi tekrar: yanlış defteri kuralı ve geri bildirim merdiveni", async () => {
  const list = await RQ.list({ now: NOW });
  await RQ.grade(list.find((x) => x.type === "mistake"), true);
  assert.equal(stores.mistakes.m1.reviews, 1);
  assert.ok(Date.parse(stores.mistakes.m1.nextAt) > Date.now() + 2 * DAY);
  await RQ.grade(list.find((x) => x.type === "feedback"), true);
  assert.equal(stores.meta["rq:fb:quiz:x"].box, 1);
  const after = await RQ.list({ now: NOW });
  eq(after.map((x) => x.type), ["quiz", "card"]);
});

/* ---------------- Sınıf Modu ---------------- */
const assignment = { v: 1, t: "a", id: "odv_1", ti: "Deneme", at: iso(NOW), m: 0, fb: true, ks: ["9/matematik/t1/k1", "9/matematik/t1/k2"],
  q: Array.from({ length: 40 }, (_, i) => ({ k: i % 2, q: "Soru " + i + " " + "uzun metin ".repeat(8) + Math.sin(i), o: ["A şıkkı " + i, "B " + i * 7, "C " + (i ^ 5), "D " + i * i], a: i % 4, d: 1 + (i % 3), e: "Açıklama " + i })) };
await check("Deflate + base64url: büyük ödev çoklu kareye bölünür, sırasız ve tekrarlı karelerle açılır", async () => {
  const frames = await SM.pack(assignment);
  assert.ok(frames.length > 1, "çoklu kare bekleniyordu");
  assert.ok(frames.every((f) => f.startsWith("KAIC1;") && SM.frame(f)));
  assert.ok(frames[0].split(";")[4].startsWith("z"), "sıkıştırılmış gövde bekleniyordu");
  const shuffled = frames.slice().reverse().concat(frames[0]);
  const { data } = await SM.unpack(shuffled);
  eq(data, assignment);
  const raw = JSON.stringify(assignment).length;
  assert.ok(frames.join("").length < raw * 0.6, "sıkıştırma en az %40 kazandırmalı");
});
await check("Eksik kare, bozuk kare ve yabancı kod reddedilir", async () => {
  const frames = await SM.pack(assignment);
  await assert.rejects(SM.unpack(frames.slice(1)), /Eksik kare/);
  const bad = frames.slice(); bad[0] = bad[0].slice(0, -3) + (bad[0].endsWith("AAA") ? "BBB" : "AAA");
  await assert.rejects(SM.unpack(bad), /bozuk|packet|JSON|invalid/i);
  await assert.rejects(SM.unpack(["DA1;t=x"]), /tanınmadı/);
});
await check("Sıkıştırma yoksa düz JSON gövdesi de açılır", async () => {
  const body = "j" + Buffer.from(JSON.stringify(assignment)).toString("base64url");
  eq(await SM.decodeBody(body), assignment);
});
await check("Puan yanıt vektöründen kazanım bazında hesaplanır; geçersiz paket reddedilir", () => {
  const answers = assignment.q.map((q, i) => (i < 10 ? q.a : -1));
  const s = SM.score(assignment, answers);
  eq(s.sc, [[5, 20], [5, 20]]);
  assert.equal(s.pct, 25);
  assert.throws(() => SM.validate({ v: 1, t: "a", id: "x", ti: "t", ks: ["../x"], q: [] }));
  assert.throws(() => SM.validate({ v: 1, t: "r", a: "x", s: "", r: [0] }));
});
await check("Sonuç paketi tek karede ve küçük", async () => {
  const r = { v: 1, t: "r", a: "odv_1", h: "abcd1234", s: "1234 Ayşe", at: iso(NOW), du: 600, r: assignment.q.map((q) => q.a), c: assignment.q.map(() => 75), sc: [[20, 20], [20, 20]] };
  const frames = await SM.pack(r);
  assert.equal(frames.length, 1);
  eq((await SM.unpack(frames)).data, r);
});
await check("Elle yazılan sorular ayrıştırılır (doğru şık *, açıklama satırı)", () => {
  const qs = SM.parseManual("1) 2+3 kaçtır?\nA) 4\nB) 5 *\nC) 6\nAçıklama: toplama\n\nBaşlıksız\nA) x\n\n*A) doğru\nB) yanlış");
  assert.equal(qs.length, 1);
  eq(qs[0], { q: "2+3 kaçtır?", o: ["4", "5", "6"], a: 1, d: 2, e: "toplama" });
});
await check("Zorluk dengeli seçim farklı zorluklardan alır", () => {
  const list = [1, 1, 1, 2, 2, 3].map((d, i) => ({ q: "q" + i, d }));
  eq(SM.pickBalanced(list, 3).map((q) => q.d), [1, 2, 3]);
});

/* ---------------- Karne ---------------- */
await check("Karne: günlük süre, güçlü/zayıf kazanımlar ve üstbiliş indeksi", () => {
  const from = Date.parse("2026-10-21T00:00:00");
  const q = (key, day, pairs) => ({ key, date: iso(from + day * DAY + 3600e3), total: pairs.length, correct: pairs.filter((p) => p[0]).length,
    questions: pairs.map(([ok, c]) => ({ answer: 0, chosen: ok ? 0 : 1, observation: { confidence: c, elapsedMs: 60000 } })) });
  const R = K.compute({
    sessions: [{ end: iso(from + 3600e3), minutes: 30 }, { end: iso(from + 2 * DAY + 3600e3), minutes: 45 }, { end: iso(from - DAY), minutes: 99 }],
    quizzes: [q("a", 0, [[1, 100], [1, 100], [0, 100], [0, 100]]), q("b", 2, [[1, 75], [1, 75], [1, 75], [1, 75]]), q("c", 3, [[0, 100], [0, 75], [1, 50], [0, 100]])]
  }, from);
  assert.equal(R.days[0].focus, 30); assert.equal(R.days[0].quiz, 4);
  assert.equal(R.days[2].focus, 45);
  assert.equal(Math.round(R.total), 30 + 45 + 12);
  assert.equal(R.activeDays, 3);
  eq(R.strong.map((x) => x.key), ["b", "a"]);
  eq(R.weak.map((x) => x.key), ["c"]);
  // eminlik ort. = (400 + 300 + 325) / 12 = 85,4 · doğruluk = 7/12 = 58,3 → indeks +27 (aşırı güven)
  assert.equal(R.meta.index, 27); assert.equal(R.meta.zone, "over");
  assert.equal(R.meta.sureWrong, 5); assert.equal(R.meta.unsureRight, 1);
  eq(R.meta.bins.map((b) => [b.c, b.n, b.acc]), [[25, 0, null], [50, 1, 100], [75, 5, 80], [100, 6, 33]]);
});
await check("Karne: eminlik verisi yoksa indeks hesaplanmaz, düşük güven doğru sınıflanır", () => {
  const from = Date.parse("2026-10-21T00:00:00");
  assert.equal(K.compute({ sessions: [], quizzes: [] }, from).meta, null);
  const R = K.compute({ quizzes: [{ key: "a", date: iso(from + 3600e3), total: 4, correct: 4,
    questions: [0, 1, 2, 3].map(() => ({ answer: 0, chosen: 0, observation: { confidence: 50 } })) }] }, from);
  assert.equal(R.meta.index, -50); assert.equal(R.meta.zone, "under");
});

console.log(checks + " v1.42 sınaması geçti (tekrar kuyruğu, QR sınıf modu, karne).");
