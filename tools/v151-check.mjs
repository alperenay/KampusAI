// v1.51 sınaması: İngilizce/Almanca ortak dil pratiği (şema, kelime testi, dinle-yaz), oyun puanlamaları, sensör
// metrikleri, pH metre kalibrasyonu ve kararlılığı, ekosistem (kartal, mevsim, çeşitlilik, kararlılık) ve tanıtım rehberleri.
import fs from "node:fs";
import path from "node:path";
import vm from "node:vm";
import assert from "node:assert/strict";
import { fileURLToPath } from "node:url";
const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const prefs = new Map();
const ctx = vm.createContext({
  App: { utils: { esc: String, uid: (p) => p + "_1", downloadText() {} }, router: { register() {} }, i18n: { lang: "tr" }, t: (k) => k, L: (s) => (s && s.tr) || s, data: {},
    prefs: { get: (k, d) => (prefs.has(k) ? prefs.get(k) : d), set: (k, v) => prefs.set(k, v) }, lessons: { find: () => null }, games: null },
  console, Date, Math, Map, Set, Number, navigator: { webdriver: true }
});
ctx.App.games = { add() {}, GAMES: {}, util: { shuffle: (a) => a.slice(), pick: (a) => a[0], inline: String, startScreen() {}, endScreen() {}, countdown() {}, alive: () => true, T: (tr) => tr } };
for (const f of ["js/data/languages", "js/data/languages-ext", "js/modules/language-practice", "js/modules/games-3", "js/modules/sensor-workbench", "js/modules/ph-metre", "js/modules/ekosistem", "js/modules/onboarding"])
  vm.runInContext(fs.readFileSync(path.join(root, f + ".js"), "utf8"), ctx, { filename: f });
const { languagePractice: LP, games3: G3, sensorWorkbench: SW, phMetre: PH, ekosistem: EK, onboarding: OB } = ctx.App;
const L = ctx.App.data.languages;
const near = (a, b, tol, m) => assert.ok(Math.abs(a - b) <= tol, (m || "") + " beklenen " + b + ", bulunan " + a);
let checks = 0;
async function check(name, fn) { await fn(); checks++; console.log("✓ " + name); }

/* ---------------- Dil pratiği ---------------- */
await check("Dil: İngilizce ve Almanca her seviyede aynı yapıda ve yeterli içerikte", () => {
  for (const lang of ["en", "de"]) {
    const D = L.profiles[lang];
    for (const lv of L.levels) {
      assert.ok(D.vocab[lv].length >= 20, lang + lv + " kelime");
      assert.equal(new Set(D.vocab[lv].map((x) => x[0])).size, D.vocab[lv].length, lang + lv + " tekrar eden kelime");
      assert.ok(D.grammar[lv].length >= 5 && D.grammar[lv].every((q) => q[2].includes("___") && q[3][q[4]] != null && new Set(q[3]).size === q[3].length), lang + lv + " gramer");
      assert.ok(D.dialogs[lv].length >= 4 && D.dialogs[lv].every((q) => q[1][q[2]] != null && q[3]), lang + lv + " diyalog");
      assert.ok(D.roleplays[lv].length >= 2 && D.roleplays[lv].every((r) => r.id && r.title.length === 2 && r.steps.length >= 3 && r.steps.every((s) => s[1][s[2]] != null && s[3])), lang + lv + " rol oyunu");
      assert.ok(D.dictation[lv].length >= 4 && D.dictation[lv].every((d) => d[0].length > 8 && d[1]), lang + lv + " dinle-yaz");
    }
  }
});
await check("Dil: kelime testi doğru anlamı ve aynı seviyeden üç farklı çeldiriciyi verir; seçenek sırası tohumlu ve kararlı", () => {
  const rows = L.profiles.en.vocab.A2;
  for (let i = 0; i < rows.length; i++) {
    const w = LP.wordQuiz(rows, i);
    assert.equal(w.options.length, 4); assert.equal(new Set(w.options).size, 4);
    assert.equal(w.options[w.answer], rows[i][1]);
    assert.deepEqual(JSON.parse(JSON.stringify(LP.wordQuiz(rows, i))), JSON.parse(JSON.stringify(w)));
  }
  const positions = new Set(rows.map((_, i) => LP.wordQuiz(rows, i).answer));
  assert.ok(positions.size >= 3, "doğru şık hep aynı yerde değil");
});
await check("Dil: dinle-yaz karşılaştırması büyük/küçük harf ve noktalamayı yok sayar, yanlış sözcüğü işaretler", () => {
  const ok = LP.compareDictation("I have breakfast at seven.", "i have breakfast at seven", "en-US");
  assert.equal(ok.score, 1); assert.equal(ok.extra, 0);
  const bad = LP.compareDictation("Wir fahren mit dem Bus zur Schule.", "Wir fahren mit den Bus zur Schule", "de-DE");
  assert.equal(bad.words.filter((w) => !w.ok).map((w) => w.w).join(), "dem"); near(bad.score, 6 / 7, 1e-9);
  assert.equal(LP.compareDictation("Grüße aus Berlin", "GRÜSSE aus berlin", "de-DE").words[0].ok, false);
});
await check("Dil: ilk yanıtlar dil başına ayrı saklanır; seviye istatistiği", () => {
  LP.record("A1:quiz:0", true, "en"); LP.record("A1:quiz:0", false, "en"); LP.record("A1:dialog:1", false, "en");
  LP.record("A1:quiz:0", false, "de");
  assert.equal(LP.progress("en")["A1:quiz:0"].correct, true);
  assert.equal(LP.progress("de")["A1:quiz:0"].correct, false);
  const st = LP.levelStats("en", "A1"); assert.equal(st.n, 2); assert.equal(st.correct, 1);
  assert.equal(LP.order(5, "x").slice().sort().join(), "0,1,2,3,4");
});

/* ---------------- Oyunlar ---------------- */
await check("Oyunlar: sayı doğrusu puanı ve değerler aralıkta; Sırala! yerinde öğe sayısı", () => {
  assert.equal(G3.linePoints(3.14, Math.PI), 100); assert.equal(G3.linePoints(5, 3), 0); assert.equal(G3.linePoints(4, 3), 50);
  G3.LINE.forEach(([tex, v]) => assert.ok(v > 0 && v < 10, tex));
  const items = [["a", 3], ["b", 1], ["c", 2]], [a, b, c] = items;
  assert.equal(G3.inPlace([b, c, a], items), 3); assert.equal(G3.inPlace([a, b, c], items), 0);
  G3.SETS().forEach(([label, its]) => { assert.equal(its.length, 4, label); assert.equal(new Set(its.map((x) => x[1])).size, 4, label); });
  assert.equal(new Set(G3.UNITS().map((x) => x[1])).size, G3.UNITS().length);
});

/* ---------------- Sensör metrikleri ---------------- */
await check("Sensör: 2 Hz sinüste baskın frekans, ortalama, RMS ve tepeden tepeye; histogram toplamı", () => {
  const rows = []; for (let i = 0; i < 400; i++) { const t = i / 50; rows.push({ t, x: 3 + 2 * Math.sin(2 * Math.PI * 2 * t), y: 0, z: 0 }); }
  const st = SW.stats(rows, false);
  near(st.freq, 2, 0.08, "frekans"); near(st.mean, 3, 0.02); near(st.p2p, 4, 0.02); near(st.rate, 50, 0.1);
  near(st.rms, Math.sqrt(9 + 2), 0.03, "RMS");
  const flat = SW.stats(rows.map((r) => ({ ...r, x: 5 })), false); assert.equal(flat.freq, null); near(flat.sd, 0, 1e-12);
  const h = SW.histogram(rows.map((r) => r.x), 10); assert.equal(h.reduce((a, b) => a + b.n, 0), 400); assert.equal(h.length, 10);
  assert.ok(SW.CHANNELS.linear.vector && SW.CHANNELS.orient.unit === "°");
  for (const id of ["linear", "orient"]) assert.equal(SW.packet(id, "simulation", [{ t: 0, x: 1, y: 2, z: 3 }], "2026-10-28T00:00:00Z").unit, SW.CHANNELS[id].unit);
});

/* ---------------- pH metre ---------------- */
await check("pH metre: tek ve iki noktalı kalibrasyon, eğim sınırı, 0–14 kırpma; kararlılık; ibre açısı", () => {
  assert.equal(PH.applyCal(6, []), 6);
  near(PH.applyCal(6, [{ raw: 7.5, ref: 7 }]), 5.5, 1e-12);
  // iki nokta: ham 3 → 2,8 ve ham 7,4 → 7 ⇒ doğrusal eşleme
  const two = [{ raw: 3, ref: 2.8 }, { raw: 7.4, ref: 7 }], k = (7 - 2.8) / (7.4 - 3);
  near(PH.applyCal(5, two), 2.8 + k * 2, 1e-12);
  near(PH.applyCal(5, [{ raw: 3, ref: 2 }, { raw: 4, ref: 12 }]), 2 + 2 * 2, 1e-12, "eğim 2'ye kırpılır");
  assert.equal(PH.applyCal(13.9, [{ raw: 7, ref: 9 }]), 14);
  assert.equal(PH.stability([7, 7.1]).stable, false);
  assert.equal(PH.stability([7, 7.02, 6.98, 7.01, 7.03, 6.99]).stable, true);
  assert.equal(PH.stability([4, 7, 5, 9, 6, 8]).stable, false);
  assert.equal(PH.needleAngle(0), -90); assert.equal(PH.needleAngle(7), 0); assert.equal(PH.needleAngle(14), 90);
});

/* ---------------- Ekosistem ---------------- */
const finite = (s) => ["G", "R", "F", "E"].every((k) => Number.isFinite(s[k]) && s[k] >= 0);
await check("Ekosistem: kartal ve mevsim kapalıyken model 1.49 ile aynı dengeye gider", () => {
  const run = EK.simulate({ G: 400, R: 30, F: 4 }, {}, 400, 0.5), e = EK.equilibrium({}), end = run[run.length - 1];
  near(end.R, e.R, e.R * 0.03); near(end.F, e.F, e.F * 0.03); assert.equal(end.E, 0);
});
await check("Ekosistem: kartal tavşanları azaltır, avsız kartal tükenir; aşırı değerlerde kararlı", () => {
  const without = EK.simulate({ G: 280, R: 60, F: 0, E: 0 }, {}, 80, 1), withE = EK.simulate({ G: 280, R: 60, F: 0, E: 20 }, {}, 80, 1);
  const tail = (r, k) => r.slice(-20).reduce((a, x) => a + x[k], 0) / 20;
  assert.ok(tail(withE, "R") < tail(without, "R") * 0.8, "kartal etkisi");
  const starve = EK.simulate({ G: 400, R: 0, F: 0, E: 10 }, {}, 60, 1); assert.equal(starve[starve.length - 1].E, 0);
  [{ G: 1e6, R: 1e6, F: 1e5, E: 1e5 }, { G: 1, R: 1e6, F: 0, E: 1e4 }].forEach((s0) => assert.ok(EK.simulate(s0, { season: true }, 40, 0.5).every(finite), JSON.stringify(s0)));
});
await check("Ekosistem: mevsimler yıllık dalgalanma yaratır; çeşitlilik indeksi", () => {
  const run = EK.simulate({ G: 280, R: 60, F: 39, E: 0 }, { season: true }, 96, 0.5).filter((x) => x.t > 48);
  const gs = run.map((x) => x.G); assert.ok(Math.max(...gs) - Math.min(...gs) > 20, "ot dalgalanıyor");
  near(EK.seasonFactor(3), 1.6, 1e-9); near(EK.seasonFactor(9), 0.4, 1e-9);
  assert.equal(EK.diversity({ R: 10, F: 0, E: 0 }), 0);
  near(EK.diversity({ R: 10, F: 10, E: 10 }), Math.log(3), 1e-12);
});

/* ---------------- Tanıtım rehberleri ---------------- */
await check("Rehber: iki atölyenin adımları iki dilde ve eksiksiz", () => {
  for (const id of ["telefon-fizik"]) {
    const g = OB.GUIDES[id];
    assert.ok(g && g.title.length === 2 && g.steps.length >= 4, id);
    g.steps.forEach(([icon, title, text, list]) => { assert.ok(icon && title[0] && title[1] && text[0].length > 40 && text[1].length > 20, id); if (list) assert.equal(list[0].length, list[1].length); });
  }
});

console.log("\nv1.51: " + checks + " sınama geçti.");
