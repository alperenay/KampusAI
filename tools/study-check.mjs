// Gerçek modülleri izole state ile sınar; ağ ve yapay zekâ bağlantısı gerekmez.
import fs from "node:fs";
import path from "node:path";
import vm from "node:vm";
import assert from "node:assert/strict";
import { fileURLToPath } from "node:url";
const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const ctx = vm.createContext({ App: { utils: { esc: String }, router: { register() {} }, i18n: { lang: "tr" },
  t: (k) => k, L: (s) => s, data: {} }, console });
for (const file of ["adaptive", "study-recommender", "quiz"]) {
  vm.runInContext(fs.readFileSync(path.join(root, "js/modules/" + file + ".js"), "utf8"), ctx);
}
const { adaptive: A, study: S, quiz: Q } = ctx.App;
let checks = 0;
function check(name, fn) { fn(); checks++; console.log("✓ " + name); }
const pool = Array.from({ length: 30 }, (_, i) => ({ q: "Q" + i, difficulty: 1 + Math.floor(i / 10), answer: 0, options: ["a", "b", "c", "d", "e"] }));
check("Geçmiş yoksa orta; başka konunun sonucu başlangıcı etkilemez", () => {
  assert.equal(A.initial([], "x"), 2);
  assert.equal(A.initial([{ key: "y", total: 10, correct: 10 }], "x"), 2);
});
check("Eski testler ve eşitlenmiş adaptif sonuçlar başlangıca katılır", () => {
  assert.equal(A.initial([{ key: "x", total: 10, correct: 0 }], "x"), 1);
  assert.equal(A.initial([{ key: "x", total: 10, correct: 10 }], "x"), 3);
  assert.equal(A.initial([{ key: "x", total: 10, adaptive: { endAbility: 2.7 } }], "x"), 2.7);
});
check("Doğrular zorluğu artırır, yanlışlar azaltır; soru tekrar edilmez", () => {
  for (const right of [true, false]) {
    let ability = 2; const used = new Set(), levels = [];
    for (let i = 0; i < 10; i++) {
      const selected = A.pick(pool, used, ability);
      assert.ok(selected && !used.has(selected.i)); used.add(selected.i);
      levels.push(selected.q.difficulty);
      ability = A.update(ability, selected.q.difficulty, right);
      assert.ok(ability >= 1 && ability <= 3);
    }
    assert.equal(levels[0], 2); assert.equal(levels[9], right ? 3 : 1);
  }
});
check("Seyrek havuzda en yakın kullanılmamış zorluğa geçer", () => {
  assert.equal(A.pick([pool[0], pool[20]], new Set([0]), 1).q.difficulty, 3);
  assert.equal(A.pick([], new Set(), 2), undefined);
});
check("Ağırlıklı puan, boş cevap ve seviye izi doğru hesaplanır", () => {
  const r = A.result([pool[0], pool[20]], [0, -1], 2);
  assert.equal(r.score, 25); assert.equal(r.path.length, 2);
  assert.equal(A.result(pool.slice(0, 10), new Array(10).fill(0), 2).score, 100);
});
check("Model çıktısında bozuk şıklar, kesirli cevap, etiketsiz zorluk ve tekrar elenir", () => {
  assert.equal(Q.normalize({ questions: pool }, true).length, 30);
  assert.equal(Q.normalize({ questions: {} }, true).length, 0);
  const valid = pool[0];
  for (const bad of [{ ...valid, options: {} }, { ...valid, answer: 0.5 }, { ...valid, answer: null }, { ...valid, difficulty: 0 }]) {
    assert.equal(Q.normalize({ questions: [bad] }, true).length, 0);
  }
  assert.equal(Q.normalize({ questions: [valid, valid] }, true).length, 1);
});
const now = new Date(2026, 9, 26, 12, 0);
check("Günlük süre: boş gün, sonraki blok ve devam eden blok", () => {
  assert.equal(S.availableMinutes([], now), 20);
  assert.equal(S.availableMinutes([{ start: "12:08", end: "13:00" }], now), 8);
  assert.equal(S.availableMinutes([{ start: "11:30", end: "12:05" }], now), 5);
});
const items = ["a", "b", "c"].map((key) => ({ key, outcome: { content: {} } }));
check("Son düşük test öncelikli; bugün başarılı tamamlanan konu dışlanır", () => {
  const quizzes = [{ key: "a", date: now.toISOString(), total: 10, correct: 10 }, { key: "b", date: now.toISOString(), total: 10, correct: 2 }];
  const r = S.rank(items, new Map(), quizzes, [], [], now);
  assert.equal(r[0].key, "b"); assert.equal(r[0].review, true);
  assert.ok(!r.some((x) => x.key === "a"));
});
check("Yeni sonuç eski başarısızlığı geçersiz kılar; unutulan konu öncelik alır", () => {
  const quizzes = [{ key: "a", date: "2026-10-01", total: 10, correct: 0 }, { key: "a", date: "2026-10-25", total: 10, correct: 10 }];
  const r = S.rank(items, new Map([["b", { parts: { fading: true } }]]), quizzes, [], [], now);
  assert.equal(r[0].key, "b"); assert.equal(r[0].reason, "study.fading");
});
// Öneri entegrasyonu: gerçek zaman penceresi, seçili sınıf ve kök eksik yönlendirmesi.
let rows = { quizzes: [], mistakes: [], progress: [], schedules: { id: "user", blocks: [{ day: 0, start: "12:08", end: "13:00" }] } };
ctx.App.db = { getAll: async (store) => rows[store] || [], get: async (store) => rows[store] };
ctx.App.prefs = { get: () => "10" };
ctx.App.roots = { mastery: async () => new Map(), rootFor: async () => null };
ctx.App.lessons = { find: (key) => ({ outcome: { content: {}, title: key } }) };
ctx.App.learnmap = { allOutcomes: () => [{ key: "grade9", grade: { id: "9" }, outcome: { content: {} } }, { key: "grade10", grade: { id: "10" }, outcome: { content: {} } }] };
let rec = await S.recommend(now);
check("Seçili sınıftan başlar; kısa zaman penceresinde özet önerir", () => {
  assert.equal(rec.key, "grade10"); assert.equal(rec.minutes, 8); assert.equal(rec.action, "review");
});
rows.schedules.blocks = [];
rec = await S.recommend(now);
check("Boş programda 20 dakikalık test eylemi üretir", () => {
  assert.equal(rec.minutes, 20); assert.equal(rec.action, "quiz");
});
ctx.App.roots.rootFor = async () => ({ key: "grade9" });
rec = await S.recommend(now);
check("Kök eksik seçili sınıf dışındaysa da ön koşula yönlendirir", () => {
  assert.equal(rec.key, "grade9"); assert.equal(rec.reason, "study.root"); assert.equal(rec.action, "review");
});
ctx.App.roots.rootFor = async () => null;
rows.quizzes = [{ key: "grade10", date: now.toISOString(), total: 10, correct: 10 }];
rec = await S.recommend(now);
check("Tüm uygun konular bugün başarılı tamamlandıysa boş durumu üretir", () => assert.equal(rec.complete, true));
console.log(checks + " çalışma motoru sınaması geçti.");
