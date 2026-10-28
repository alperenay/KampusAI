import vm from "node:vm";
import fs from "node:fs";
import assert from "node:assert/strict";
let Processor;
const posts = [],
  ctx = vm.createContext({
    AudioWorkletProcessor: class {
      constructor() {
        this.port = { postMessage: (p) => posts.push(p) };
      }
    },
    registerProcessor: (id, ctor) => {
      assert.equal(id, "kampus-impulse");
      Processor = ctor;
    },
    currentTime: 0,
    sampleRate: 48000,
    Math,
  });
vm.runInContext(
  fs.readFileSync("assets/audio/impulse-worklet.js", "utf8"),
  ctx,
);
const p = new Processor();
for (let block = 0; block < 100; block++) {
  ctx.currentTime = (block * 128) / 48000;
  const a = new Float32Array(128);
  if (block === 10 || block === 40) a[64] = 1;
  p.process([[a]]);
}
assert.equal(posts.length, 2);
assert.ok(Math.abs(posts[1].time - posts[0].time - 0.08) < 1e-8);
assert.ok(posts.every((p) => p.amplitude > p.threshold));
const quiet = new Processor();
posts.length = 0;
for (let block = 0; block < 20; block++) {
  ctx.currentTime = (block * 128) / 48000;
  quiet.process([[new Float32Array(128).fill(0.02)]]);
}
assert.equal(posts.length, 0);
const refractory = new Processor();
posts.length = 0;
const a = new Float32Array(128);
a[1] = 1;
a[100] = 1;
ctx.currentTime = 1;
refractory.process([[a]]);
assert.equal(posts.length, 1);
console.log(
  "AudioWorklet: sample-time impulse separation, high-pass quiet rejection and refractory period passed (synthetic audio, not microphone calibration).",
);
