// v1.64 senkron tahta: cevabın adımlara bölünmesi (saf işlev) ve konuşma akışının her parçaya
// özgün metindeki yerini (src) vermesi. Tarayıcı gerekmez; ses ve DOM yok.
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import vm from "node:vm";
import { fileURLToPath } from "node:url";
const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const App = {};
vm.runInNewContext(fs.readFileSync(path.join(root, "js/modules/voice-board.js"), "utf8"), { App, matchMedia: () => ({ matches: false }), document: {} });
const steps = (md) => JSON.parse(JSON.stringify(App.voiceBoard.steps(md))); // vm dizileri → bu ortamın dizileri
const texts = (md) => steps(md).map((s) => s.text);

// Numaralı adımlar: numara ayrılır, yer bilgisi özgün metne denk gelir
const md = "Hızı bulalım.\n1. Yol: $x = 20$ m\n2. Süre: $t = 4$ s\n3. $v = \\frac{x}{t} = 5$ m/s\nSence ivme var mı?";
const st = steps(md);
assert.deepEqual(st.map((s) => s.n), [null, 1, 2, 3, null]);
assert.deepEqual(texts(md), ["Hızı bulalım.", "Yol: $x = 20$ m", "Süre: $t = 4$ s", "$v = \\frac{x}{t} = 5$ m/s", "Sence ivme var mı?"]);
for (const s of st) assert.ok(md.slice(s.start, s.end).endsWith(s.text), "range covers the step text");
assert.equal(md.slice(st[3].start, st[3].end), "3. $v = \\frac{x}{t} = 5$ m/s");

// Satır içinde açık blok: $$ … $$ ayrı satırlarda olsa da tek adım
const block = "Formül:\n$$\na^2 + b^2 = c^2\n$$\nSonra yerine koy.";
assert.deepEqual(texts(block), ["Formül:", "$$\na^2 + b^2 = c^2\n$$", "Sonra yerine koy."]);

// Tek uzun paragraf cümlelere bölünür; "3.5" ve açık formül içindeki nokta bölmez
const para = "Kuvvet bir cismin hareketini değiştiren etkidir. Birimi newtondur ve 3.5 N gibi yazılır. Formülü $F = m \\cdot a. $ şeklindedir! Sence sürtünme bir kuvvet midir?";
assert.ok(para.length > 140);
assert.deepEqual(texts(para), ["Kuvvet bir cismin hareketini değiştiren etkidir.", "Birimi newtondur ve 3.5 N gibi yazılır.", "Formülü $F = m \\cdot a. $ şeklindedir!", "Sence sürtünme bir kuvvet midir?"]);
// Kısa tek satır tek adım; boş satırlar ve madde işaretleri
assert.deepEqual(texts("Kuvvet bir itmedir."), ["Kuvvet bir itmedir."]);
assert.deepEqual(texts("\n\n- birinci\n\n* ikinci\n• üçüncü\n"), ["birinci", "ikinci", "üçüncü"]);
assert.deepEqual(steps(""), []);
// Akış sürerken: yarım kalan son satır da bir adım (sonra büyür), öncekilerin yeri değişmez
const partial = steps("1. Yol 20 m\n2. Sür");
assert.deepEqual(partial.map((s) => [s.start, s.text]), [[0, "Yol 20 m"], [12, "Sür"]]);

// Konuşma akışı: her parça cevap metnindeki yerini taşır (satır satır), sırayla oynatılır
const spoken = [], segs = [];
const fakeSynth = {
  getVoices: () => [],
  speak(u) { spoken.push(u); setTimeout(() => { u.onstart && u.onstart(); setTimeout(() => u.onend && u.onend(), 1); }, 1); },
  cancel() {}
};
const win = { speechSynthesis: fakeSynth, SpeechSynthesisUtterance: class { constructor(t) { this.text = t; } }, addEventListener() {}, navigator: { userAgent: "" } };
const ctx = vm.createContext({ ...win, window: win, App: { prefs: { get: (k, d) => d }, i18n: { lang: "tr" } }, setTimeout, clearTimeout, performance, console });
ctx.window = ctx;
vm.runInContext(fs.readFileSync(path.join(root, "js/core/speech.js"), "utf8"), ctx);
const S = ctx.App.speech;
await new Promise((resolve) => {
  const s = S.stream({ lang: "tr", transform: (x) => x.replace(/^\s*\d+\.\s*/, "").replace(/\$/g, ""), onSegment: (seg) => segs.push(seg), onEnd: resolve });
  const full = "Hızı bulalım.\n1. Yol 20 m.\n2. Süre 4 s.\n3. Hız 5 m/s.";
  s.push(full.slice(0, 20));
  s.push(full.slice(0, 40));
  s.end(full);
});
const full = "Hızı bulalım.\n1. Yol 20 m.\n2. Süre 4 s.\n3. Hız 5 m/s.";
assert.deepEqual(segs.map((g) => full.slice(g.src[0], g.src[1]).trim()), ["Hızı bulalım.", "1. Yol 20 m.", "2. Süre 4 s.", "3. Hız 5 m/s."]);
assert.deepEqual(segs.map((g) => g.text), ["Hızı bulalım.", "Yol 20 m.", "Süre 4 s.", "Hız 5 m/s."], "each line is spoken on its own, transformed");
assert.deepEqual(spoken.map((u) => u.text), segs.map((g) => g.say), "onSegment fires once per spoken part, in order");
// Tahta adımlarıyla eşleşme: her parçanın başlangıcı bir adımın içine düşer
const board = steps(full);
assert.deepEqual(segs.map((g) => board.findIndex((b) => b.start <= g.src[0] && g.src[0] < b.end + 1)), [0, 1, 2, 3]);
console.log("Voice board: " + st.length + "-step solution, block math kept whole, sentence split for one paragraph; speech parts carry source ranges and fire onSegment in order.");
