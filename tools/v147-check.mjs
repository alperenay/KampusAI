import assert from "node:assert/strict";
import vm from "node:vm";
import fs from "node:fs";
const prefs = new Map(),
  App = {
    data: {},
    utils: { esc: String },
    prefs: {
      get: (k, d) => (prefs.has(k) ? prefs.get(k) : d),
      set: (k, v) => prefs.set(k, v),
    },
  };
const ctx = vm.createContext({ App, console, Date, Map, Set, Number, Math });
for (const f of [
  "js/data/languages.js",
  "js/modules/language-practice.js",
  "js/modules/ai-favorites.js",
  "js/modules/sensor-workbench.js",
  "js/modules/module-safety.js",
])
  vm.runInContext(fs.readFileSync(f, "utf8"), ctx, { filename: f });
const de = App.data.languages.profiles.de;
for (const level of App.data.languages.levels) {
  assert.equal(de.vocab[level].length, 12);
  assert.equal(new Set(de.vocab[level].map((x) => x[0])).size, 12);
  for (const q of de.grammar[level]) {
    assert.ok(q[2].includes("___"));
    assert.ok(Number.isInteger(q[4]) && q[3][q[4]]);
  }
  for (const q of de.dialogs[level]) assert.ok(q[1][q[2]] && q[3]);
}
assert.equal(App.languagePractice.normalize("  GRÜßE  "), "grüße");
App.languagePractice.record("A1:quiz:0", false);
App.languagePractice.record("A1:quiz:0", true);
assert.equal(App.languagePractice.progress()["A1:quiz:0"].correct, false);
prefs.set("ksStats", { sessions: 9 });
App.languagePractice.record("B2:quiz:0", true);
assert.equal(prefs.get("ksStats").sessions, 9);
const F = App.aiFavorites;
assert.ok(F.pins().includes("coach"));
F.toggle("coach");
assert.ok(!F.pins().includes("coach"));
F.toggle("coach");
assert.ok(F.pins().includes("coach"));
assert.equal(F.toggle("unknown"), false);
prefs.set("aiFavoriteTools", "broken");
assert.equal(F.pins().length, 0);
const S = App.sensorWorkbench,
  readings = [
    { t: 0, x: 3, y: 4, z: 0 },
    { t: 0.1, x: 6, y: 8, z: 0 },
  ],
  at = "2026-10-28T00:00:00Z";
assert.equal(S.magnitude(readings[0], true), 5);
assert.equal(S.validSample(null), false);
assert.equal(S.validSample({ t: -1, x: 0, y: 0, z: 0 }), false);
for (const id of Object.keys(S.CHANNELS))
  for (const source of ["device", "simulation"]) {
    const p = S.packet(id, source, readings, at);
    assert.equal(p.unit, S.CHANNELS[id].unit);
    assert.equal(p.source, source);
    assert.ok(S.csv(p).includes(source));
    p.samples[0].x = 99;
    assert.equal(readings[0].x, 3);
  }
assert.throws(() => S.packet("unknown", "device", readings, at));
assert.throws(() => S.packet("sound", "pretend", readings, at));
assert.throws(() =>
  S.packet("sound", "device", [{ t: 0, x: NaN, y: 0, z: 0 }], at),
);
assert.throws(() =>
  S.packet("light", "device", [readings[1], readings[0]], at),
);
for (const name of ["reviews", "research", "classroom"])
  assert.equal(App.moduleSafety.guides[name].steps.length, 5);
App.i18n={lang:'tr'};App.lab3d={def(){}};App.router={register(){}};
vm.runInNewContext(fs.readFileSync('js/core/speech.js','utf8'),{App,window:{},navigator:{userAgent:'unit'}});
assert.equal(App.speech.langTag('de'),'de-DE');assert.equal(App.speech.langTag('de-DE'),'de-DE');assert.equal(App.speech.langTag('en'),'en-US');assert.equal(App.speech.langTag(),'tr-TR');
vm.runInContext(fs.readFileSync('js/modules/kure.js','utf8'),ctx);
assert.equal(App.kure.solarTime(0,23.999),'00:00');assert.equal(App.kure.solarTime(0,-0.01),'23:59');assert.equal(App.kure.solarTime(30,12),'14:00');
for(const p of App.kure.POI)assert.ok(Number.isFinite(p[0])&&Number.isFinite(p[1])&&Math.abs(p[0])<=180&&Math.abs(p[1])<=90);
const image=fs.readFileSync('assets/globe/earth-nasa-2048.png');assert.equal(image.readUInt32BE(16),2048);assert.equal(image.readUInt32BE(20),1024);
console.log(
  "1.47 unit: all German levels/content schemas, first-answer persistence and English isolation, favourite corruption/persistence, five sensor units/source/schema/copy/order validation and three in-app guides passed.",
);
