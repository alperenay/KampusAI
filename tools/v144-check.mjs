// v1.44 sınaması: sensör laboratuvarı algoritmaları (sentetik sensör verisiyle), sesli grafik analizi,
// düello puanlama/zamanlama ve QR paketleri, Bilgi Evreni yerleşimi. Ağ, kamera ve mikrofon gerekmez.
import fs from "node:fs";
import path from "node:path";
import vm from "node:vm";
import assert from "node:assert/strict";
import { fileURLToPath } from "node:url";
const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const ctx = vm.createContext({
  App: { utils: { esc: String, uid: (p) => p + "_" + Math.random().toString(36).slice(2, 8), debounce: (f) => f, loadScript: async () => {} }, router: { register() {} },
    i18n: { lang: "tr" }, t: (k) => k, L: (s) => (s && s.tr) || s, data: {}, prefs: { get: (k, d) => d, set() {} }, lessons: { find: () => null } },
  console, TextEncoder, TextDecoder, CompressionStream, DecompressionStream, Blob, Response, btoa, atob, Date, Math, Float32Array, performance
});
for (const f of ["sonify", "sensor-lab", "sinif-modu", "duello", "evren"]) vm.runInContext(fs.readFileSync(path.join(root, "js/modules/" + f + ".js"), "utf8"), ctx, { filename: f });
const { sensorLab: SL, sonify: SO, duel: DU, evren: EV, sinifModu: SM } = ctx.App;
const eq = (a, b, m) => assert.deepEqual(JSON.parse(JSON.stringify(a)), JSON.parse(JSON.stringify(b)), m);
const near = (a, b, tol, m) => assert.ok(Math.abs(a - b) <= tol, (m || "") + " beklenen " + b + ", bulunan " + a);
let checks = 0;
async function check(name, fn) { await fn(); checks++; console.log("✓ " + name); }
let seed = 7; const rnd = () => ((seed = (seed * 16807) % 2147483647) / 2147483647) - 0.5;

/* ---------------- Sensör laboratuvarı ---------------- */
await check("Sarkaç: gürültülü ivmeölçer verisinden periyot (sıfır geçiş + süzgeç) %1 içinde", () => {
  const L = 0.8, Tth = SL.pendulumT(L), ts = [], ys = [];
  for (let i = 0; i < 15 * 60; i++) { const t = i / 60; ts.push(t); ys.push(1.2 * Math.cos((2 * Math.PI * t) / Tth) + 0.35 * rnd() + 0.2); }
  const r = SL.periodByCrossings(ts, SL.lowPass(ys, 0.25));
  assert.ok(r && r.n >= 6);
  near(r.T, Tth, Tth * 0.01, "periyot");
  near(SL.relErr(r.T, Tth), 0, 1, "bağıl hata");
});
await check("Sarkaç: düzensiz (salınımsız) veride periyot uydurmaz", () => {
  const ts = [], ys = []; for (let i = 0; i < 300; i++) { ts.push(i / 60); ys.push(0.02 * rnd()); }
  const r = SL.periodByCrossings(ts, SL.lowPass(ys, 0.25));
  assert.ok(r === null || r.n < 40);
});
await check("Ses: özilintiyle temel frekans (440 Hz ve harmonikli 196 Hz) ±1 Hz", () => {
  const sr = 44100, mk = (f, h) => { const b = new Float32Array(4096); for (let i = 0; i < b.length; i++) b[i] = 0.5 * Math.sin(2 * Math.PI * f * i / sr) + (h || 0) * Math.sin(4 * Math.PI * f * i / sr) + 0.01 * rnd(); return b; };
  near(SL.autocorrPitch(mk(440), sr), 440, 1);
  near(SL.autocorrPitch(mk(196, 0.3), sr), 196, 1);
  assert.equal(SL.autocorrPitch(new Float32Array(4096), sr), null);   // sessizlik
});
await check("Doppler hızı: yaklaşma pozitif, uzaklaşma negatif", () => {
  near(SL.dopplerSpeed(440, 452), 343 * (1 - 440 / 452), 1e-9);
  assert.ok(SL.dopplerSpeed(440, 452) > 0 && SL.dopplerSpeed(440, 430) < 0);
});
await check("Işık: ters kare uydurma k ve R² (gürültüsüz ve gürültülü)", () => {
  const exact = [0.25, 0.5, 0.75, 1].map((d) => ({ d, E: 2 / (d * d) }));
  const f = SL.fitInverseSquare(exact); near(f.k, 2, 1e-9); near(f.r2, 1, 1e-9);
  const noisy = exact.map((p) => ({ d: p.d, E: p.E * (1 + 0.05 * rnd()) })), g = SL.fitInverseSquare(noisy);
  near(g.k, 2, 0.15); assert.ok(g.r2 > 0.98);
  assert.equal(SL.fitInverseSquare([{ d: 1, E: 3 }]), null);
});
await check("Serbest düşme süresi ve düşük geçiren süzgeç", () => {
  const ts = [], m = []; for (let i = 0; i < 120; i++) { ts.push(i / 100); m.push(i >= 30 && i < 55 ? 0.4 : 9.8); }
  near(SL.freeFallTime(ts, m), 0.24, 0.011);
  const lp = SL.lowPass([0, 10, 10, 10], 0.5); eq(lp, [0, 5, 7.5, 8.75]);
});

/* ---------------- Sesli grafik ---------------- */
await check("Sesli grafik: y → 200–2000 Hz logaritmik eşleme", () => {
  near(SO.freqFor(0, 0, 1), 200, 1e-9); near(SO.freqFor(1, 0, 1), 2000, 1e-9); near(SO.freqFor(0.5, 0, 1), Math.sqrt(200 * 2000), 1e-6);
  assert.equal(SO.freqFor(NaN, 0, 1), null);
});
await check("Sesli grafik: tepe, dip ve kökler doğru bulunur (sin x, [0, 2π])", () => {
  const A = SO.analyze(Math.sin, 0, 2 * Math.PI, 600);
  const by = (t) => A.features.filter((f) => f.type === t).map((f) => f.x);
  eq(by("max").length, 1); near(by("max")[0], Math.PI / 2, 0.02);
  eq(by("min").length, 1); near(by("min")[0], 1.5 * Math.PI, 0.02);
  assert.ok(by("root").some((x) => Math.abs(x - Math.PI) < 0.01));
});
await check("Sesli grafik: iki eğrinin kesişimleri (y = x ve y = x²)", () => {
  const a = SO.analyze((x) => x, -1, 2, 300), b = SO.analyze((x) => x * x, -1, 2, 300);
  const xs = SO.intersections(a, b).map((c) => c.x).sort((p, q) => p - q);
  eq(xs.length, 2); near(xs[0], 0, 0.01); near(xs[1], 1, 0.01);
});

/* ---------------- Düello ---------------- */
const duel = { v: 1, t: "d", id: "duel_t1", ti: "Test", ks: ["9/matematik/t1/k1"], sec: 20, hn: "Ali", st: 1_000_000,
  q: Array.from({ length: 5 }, (_, i) => ({ k: 0, q: "S" + i, o: ["a", "b", "c", "d"], a: i % 4, d: 2 })) };
await check("Düello: puan = doğru 100 + hız bonusu", () => {
  const s = DU.scoreOf(duel, [0, 1, 2, 3, -1], [0, 10000, 20000, 5000, 20000]);
  eq(s.correct, 4); eq(s.per.map((x) => x.p), [150, 125, 100, 138, 0]); eq(s.total, 513);
});
await check("Düello: kazanan, eşitlikte doğru sayısı sonra süre; ikisinin de kaçırdıkları", () => {
  const A = { r: [0, 1, 9 % 4, 3, -1], ms: [1000, 1000, 1000, 1000, 20000] }, B = { r: [0, 1, 2, 0, 1], ms: [2000, 2000, 2000, 2000, 2000] };
  const d1 = DU.decide(duel, A, B); assert.ok(["a", "b"].includes(d1.winner)); eq(d1.bothMissed, [4]);
  const same = { r: [0, 1, 2, 3, 0], ms: [5000, 5000, 5000, 5000, 5000] }, slower = { r: [0, 1, 2, 3, 0], ms: [5000, 5000, 5000, 5000, 5000] };
  eq(DU.decide(duel, same, slower).winner, "tie");
});
await check("Düello: eş zamanlı aşamalar (bekleme → soru i → bitti)", () => {
  eq(DU.phaseAt(duel, duel.st - 3000).phase, "wait");
  const p = DU.phaseAt(duel, duel.st + 45000); eq([p.phase, p.i], ["q", 2]); near(p.left, 15000, 1);
  eq(DU.phaseAt(duel, duel.st + 5 * 20000 + 1).phase, "done");
});
await check("Düello QR paketleri (d ve dr) sıkıştırılıp açılır ve doğrulanır", async () => {
  eq((await SM.unpack(await SM.pack(duel))).data, duel);
  const r = { v: 1, t: "dr", a: duel.id, s: "Ayşe", r: [0, 1, -1, 3, 0], ms: [1200, 3000, 20000, 900, 15000] };
  eq((await SM.unpack(await SM.pack(r))).data, r);
  assert.throws(() => SM.validate(Object.assign({}, duel, { sec: 2 })));
  assert.throws(() => SM.validate(Object.assign({}, r, { ms: [1] })));
});

/* ---------------- Bilgi Evreni ---------------- */
await check("Bilgi Evreni: yerleşim, ön koşul kenarları ve harita yoksa müfredat sırası", () => {
  const units = [{ outcomes: [{ key: "a" }, { key: "b" }, { key: "c" }] }, { outcomes: [{ key: "d" }, { key: "e" }] }];
  const pos = EV.layout(units); eq(pos.length, 5);
  assert.ok(new Set(pos.map((p) => p.x.toFixed(3) + "," + p.z.toFixed(3))).size === 5, "düğümler üst üste gelmemeli");
  eq(EV.edgesFor(units, (k) => (k === "c" ? ["a", "x"] : k === "e" ? ["b"] : [])), [{ from: "a", to: "c", kind: "pre" }, { from: "b", to: "e", kind: "pre" }]);
  eq(EV.edgesFor(units, () => []).map((e) => e.from + ">" + e.to), ["a>b", "b>c", "d>e"]);
  eq(EV.statusOf({ status: "strong" }), "strong"); eq(EV.statusOf(undefined), "unknown");
});

console.log(checks + " v1.44 sınaması geçti (sensör, sesli grafik, düello, bilgi evreni).");
