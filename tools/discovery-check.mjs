import fs from "node:fs";
import vm from "node:vm";
import assert from "node:assert/strict";
const prefs = new Map(),
  App = {
    data: {},
    router: { register() {} },
    utils: { esc: String },
    prefs: { get: (k, d) => prefs.get(k) ?? d, set: (k, v) => prefs.set(k, v) },
  };
const c = vm.createContext({
  App,
  console,
  Date,
  Math,
  Set,
  Map,
  Number,
  Uint8Array,
  Float32Array,
});
for (const f of [
  "js/data/discovery.js",
  "js/modules/discovery-model.js",
  "js/modules/reverse-tutor.js",
  "js/modules/phone-physics.js",
  "js/modules/haptic-graph.js",
  "js/modules/science-report.js",
  "js/modules/planetarium.js",
  "js/modules/draw-simulation.js",
  "js/modules/equation-camera.js",
  "js/modules/history-map.js",
])
  vm.runInContext(fs.readFileSync(f, "utf8"), c, { filename: f });
const M = App.discoveryModel,
  close = (a, b, t = 1e-6) => assert.ok(Math.abs(a - b) < t, `${a} != ${b}`);
close(M.errorPercent(9, 10), 10);
assert.throws(() => M.errorPercent(1, 0));
close(M.acoustic(10, 10000 / 343, 0.1).speed, 343);
assert.throws(() => M.acoustic(10, 29, 100));
assert.equal(M.acoustic(10, 29, 10).reliable, false);
close(M.doppler(1100, 1000).sourceRadial, 343 / 11);
close(M.doppler(1000, 1000).approximate, 0);
assert.throws(() => M.doppler(0, 1));
const signal = Array.from({ length: 1601 }, (_, i) => ({
  t: i / 100,
  y: Math.sin((i / 100) * Math.PI),
}));
close(M.period(signal).T, 2, 1e-4);
close(M.gravity(1, (2 * Math.PI) / Math.sqrt(M.G)), M.G);
assert.equal(M.period([{ t: 0, y: 1 }]), null);
const integrated = M.integrate(
  Array.from({ length: 101 }, (_, i) => ({ t: i / 100, y: 2 })),
);
close(integrated[100].v, 2);
close(integrated[100].z, 1);
assert.throws(() =>
  M.integrate([
    { t: 0, y: 1 },
    { t: 2, y: 1 },
  ]),
);
const hp = M.highPass(
  Array.from({ length: 200 }, (_, i) => ({ t: i / 100, y: M.G })),
);
assert.ok(hp.every((p) => Math.abs(p.y) < 1e-8));
const a = new Float32Array(512),
  b = new Float32Array(512);
a[100] = 1;
b[128] = 1;
assert.equal(M.peakLag(a, b, 100).lag, 28);
assert.throws(() => M.peakLag([], [], 10));
const fit = M.linearFit([
  { t: 0, y: 1 },
  { t: 1, y: 3 },
  { t: 2, y: 5 },
]);
close(fit.slope, 2);
close(fit.intercept, 1);
close(fit.r2, 1);
assert.throws(() =>
  M.linearFit([
    { t: 1, y: 2 },
    { t: 1, y: 3 },
  ]),
);
const net = App.drawSimulation.examples.circuit,
  sol = M.circuit(net);
close(sol.volts[1], 9);
close(sol.volts[2], 6);
close(sol.components.find((c) => c.type === "lamp").current, 0.03);
assert.throws(() =>
  M.circuit({
    nodes: 2,
    components: [{ type: "resistor", a: 1, b: 0, value: 0 }],
  }),
);
assert.throws(() => M.circuit({ nodes: 3, components: [] }));
const f = M.force(2, [
  { x: 4, y: 0 },
  { x: 0, y: 2 },
]);
close(f.ax, 2);
close(f.ay, 1);
close(M.snell(30, 1, 1.5).refracted, 19.47122063, 1e-7);
assert.equal(M.snell(60, 1.5, 1).refracted, null);
close(M.lens(4, 2).image, 4);
assert.equal(M.lens(2, 2).image, null);
close(M.ramp(2, 1).potential, 2 * M.G);
const collision = M.collision(1, 3, 1, 0, 1);
close(collision.v1, 0);
close(collision.v2, 3);
close(M.expression("a*x^2+b*x+c", 2, { a: 2, b: 3, c: 4 }), 18);
close(M.expression("-x^2", 2), -4);
close(M.expression("sin(pi/2)", 0), 1);
close(M.expression("2^3^2", 0), 512);
assert.throws(() => M.expression("window.alert(1)", 0));
assert.throws(() => M.expression("constructor(1)", 0));
assert.throws(() => M.expression("2x", 2));
const earth = M.orbit("earth", Date.UTC(2000, 0, 1, 12));
close(earth.x, -0.17717125, 1e-5);
close(earth.y, 0.96721448, 1e-5);
assert.throws(() => M.orbit("mars", Date.UTC(2200, 0, 1)));
const sun = M.sky("sun", Date.UTC(2026, 5, 21, 12), 0, 0);
assert.ok(sun.altitude > 65 && sun.altitude < 68);
const zenith = M.horizontal(280.46061837, 0, Date.UTC(2000, 0, 1, 12), 0, 0);
close(zenith.altitude, 90);
close(M.lunarPhase(Date.UTC(2000, 0, 6, 18, 14)).illuminated, 0);
const tri = M.triangulate([
  { x: 0, y: 0, r: 5 },
  { x: 10, y: 0, r: Math.sqrt(65) },
  { x: 0, y: 10, r: Math.sqrt(45) },
]);
close(tri.x, 3);
close(tri.y, 4);
close(tri.residual, 0);
const selected = [{ id: "9/fizik/u1/k1", title: "Kuvvet" }],
  turns = [{ role: "user", text: "Net kuvvet sıfırsa ivme sıfır olur." }];
const feedback = App.reverseTutor.evaluate(
  {
    reply: "Neden?",
    checks: [
      { id: selected[0].id, status: "covered", evidence: "Net kuvvet sıfırsa" },
    ],
    misconceptions: [],
    next: [],
  },
  selected,
  turns,
);
assert.equal(feedback.checks[0].status, "covered");
const fake = App.reverseTutor.evaluate(
  {
    reply: "Neden?",
    checks: [{ id: selected[0].id, status: "covered", evidence: "uydurma" }],
    misconceptions: [],
    next: [],
  },
  selected,
  turns,
);
assert.equal(fake.checks[0].status, "unclear");
assert.throws(() => App.reverseTutor.evaluate({}, selected, turns));
assert.equal(
  App.hapticGraph.classify((x) => x * x - 4, 2),
  "root",
);
assert.equal(
  App.hapticGraph.classify((x) => -((x - 1) ** 2) + 2, 1),
  "extremum",
);
const now = Date.now();
assert.ok(
  App.phonePhysics.pairing({
    schema: "KAI-AUDIO-1",
    id: "x",
    created: now,
    epoch: now,
    uncertainty: 100,
  }),
);
assert.throws(() =>
  App.phonePhysics.pairing({
    schema: "KAI-AUDIO-1",
    id: "x",
    created: now - 400000,
    epoch: now,
    uncertainty: 100,
  }),
);
const packet = App.scienceReport.parsePacket({
  source: "simulation",
  unit: "m/s²",
  samples: [
    { t: 0, x: 3, y: 4, z: 0 },
    { t: 1, x: 5, y: 0, z: 0 },
  ],
});
close(packet.samples[0].y, 3);
assert.throws(() =>
  App.scienceReport.parsePacket({ source: "fake", samples: [] }),
);
assert.equal(App.historyMap.snapshot(1500).year, 1453);
assert.equal(App.historyMap.snapshot(1923).year, 1923);
assert.equal(App.data.discovery.modules.length, 9);
for (const h of App.data.discovery.history)
  assert.match(h.source, /^https:\/\//);
for (const f of App.data.discovery.faults.features)
  assert.equal(f.geometry.type, "LineString");
const eq = App.equationCamera.validate({
  expression: "a*x^2",
  kind: "function",
  box: [-1, 0, 1, 1],
});
assert.equal(eq.box[0], 0.1);
assert.throws(() =>
  App.equationCamera.validate({ expression: "eval(x)", kind: "function" }),
);
console.log(
  "Discovery: physics, MNA, optics, orbital reference, expression grammar, calibration guards, evidence validation and report schemas passed.",
);
