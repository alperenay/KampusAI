// Deterministic structured generation tests: no real provider/model accuracy or speed claims.
import assert from "node:assert/strict";
import vm from "node:vm";
import fs from "node:fs";
import { researchBank } from "./fixtures/research-bank.mjs";
function device() {
  const writes = [];
  const ctx = vm.createContext({
    console,
    Date,
    performance,
    setTimeout,
    clearTimeout,
    AbortController,
    DOMException,
    DOMParser: class {
      parseFromString(s) {
        return { body: { textContent: s.replace(/<[^>]+>/g, "") } };
      }
    },
    App: {
      utils: { esc: String, uid: () => "id" },
      t: (s) => s,
      L: (s) => s,
      i18n: { lang: "tr" },
      data: {},
      router: { register() {} },
      db: { get: async () => null, put: async (s, r) => writes.push([s, r]) },
    },
  });
  ctx.window = ctx;
  for (const f of [
    "js/ai/pipeline.js",
    "js/modules/metacognition.js",
    "js/modules/scaffolding.js",
    "js/modules/quiz.js",
    "js/modules/yazili.js",
  ])
    vm.runInContext(fs.readFileSync(f, "utf8"), ctx);
  return { App: ctx.App, ctx, writes };
}
const d = device(),
  chunks = [];
let parse = d.App.ai.arrayPreview("questions", (items) =>
  chunks.push(JSON.parse(JSON.stringify(items))),
);
const nested = {
  q: 'Quote " and braces } ] \\ end',
  meta: { a: [1, { b: 2 }] },
};
const serial = JSON.stringify({ questions: [nested, { q: "two" }] });
for (let i = 1; i <= serial.length; i++) parse(serial.slice(0, i));
assert.equal(chunks.length, 2);
assert.deepEqual(chunks[0], [nested]);
assert.equal(chunks[1][1].q, "two");
let invalid = 0;
parse = d.App.ai.arrayPreview("questions", () => invalid++);
parse('{"questions":[{"q":"unfinished');
assert.equal(invalid, 0);
parse("x".repeat(200001));
assert.equal(invalid, 0);
let attempts = 0,
  streamSeen = [],
  limits = [];
d.App.engine = {
  resolve: async () => ({
    id: "test",
    prepare: async () => {},
    config: () => ({ chatModel: "controlled" }),
    chat: async (o) => {
      attempts++;
      limits.push(o.options.num_predict);
      const first = '{"questions":[{"q":"one"}';
      o.onDelta(first, first);
      if (attempts === 1) return { text: first };
      return { text: first + "]}", stats: { fixture: true } };
    },
  }),
  fallbackFor: async () => null,
};
const data = await d.App.ai.generate({
  prompt: "p",
  system: "s",
  arrayKey: "questions",
  maxTokens: 999999,
  onPreview: (q) => streamSeen.push(q.length),
});
assert.equal(attempts, 2);
assert.deepEqual(limits, [8192, 8192]);
assert.deepEqual(streamSeen, [0, 1, 0, 0, 1]);
assert.equal(data.data.questions[0].q, "one");
assert.ok(data.stats.ttftMs >= 0);
assert.equal(data.stats.scope, "successful-attempt");
attempts = 0;
limits = [];
await d.App.ai.generate({ prompt: "p", system: "s", maxTokens: 2000 });
assert.deepEqual(
  limits,
  [2000, 4000],
  "Malformed/truncated JSON gets one larger bounded budget",
);
const args = [
  { id: "9" },
  { id: "matematik", name: "Matematik" },
  { id: "u" },
  { id: "k", title: "Kuvvet", content: { anlatim: "Kısa konu" } },
];
let calls = 0,
  firstPreviewBeforeFinal = false;
const events = [];
d.App.ai.generate = async (o) => {
  calls++;
  const bank = researchBank(30);
  o.onPreview([]);
  o.onPreview([{ ...bank[0], answer: 99 }]);
  o.onPreview([{ ...bank[0], answer: "0" }]);
  o.onPreview([bank[0]]);
  await new Promise((r) => setTimeout(r, 2));
  firstPreviewBeforeFinal ||= events.some(
    (x) => x.provisional && x.ready === 1,
  );
  return { data: { questions: bank }, model: "fixture" };
};
const result = await d.App.quiz.generatePool(...args, {
  onProgress: (i) => events.push(i),
});
assert.equal(calls, 4);
assert.equal(result.data.questions.length, 12);
assert.ok(firstPreviewBeforeFinal);
assert.ok(!events.some((i) => i.questions?.some((q) => q.answer === 99)));
assert.equal(
  d.writes.length,
  0,
  "Research-style uncached generation never writes quiz storage",
);
// Optional reasoning/hint fields must not reject a batch; normalize() still coerces "B"/"2" and checks the key.
const lean = device();
let leanCalls = 0;
lean.App.ai.generate = async () => {
  leanCalls++;
  const rows = researchBank(30).map((q) => {
    const { reasonOptions, reasonAnswer, hints, ...rest } = q;
    return { ...rest, answer: "ABCDE"[q.answer], difficulty: String(q.difficulty) };
  });
  return { data: { questions: rows }, model: "fixture" };
};
const leanPool = await lean.App.quiz.generatePool(...args, {});
assert.equal(leanCalls, 4);
assert.equal(leanPool.data.questions.length, 12);
assert.ok(leanPool.data.questions.every((q) => Number.isInteger(q.answer) && !q.reasonOptions));
const e = device();
e.App.data.curriculum = {
  grades: [
    {
      id: "9",
      subjects: [
        {
          id: "math",
          name: "Math",
          units: [{ id: "u", name: "Unit", outcomes: [{ title: "One" }] }],
        },
      ],
    },
  ],
  findSubject: () => ({ units: [{ id: "u", name: "Unit" }] }),
};
let examCalls = 0;
const preview = [];
e.App.ai.generate = async (o) => {
  examCalls++;
  const rows = Array.from({ length: 7 }, (_, i) => ({
    metin: "Question " + i,
    cevap: "Answer",
    olcut: [
      [15, "Full"],
      [8, "Partial"],
      [0, "None"],
    ],
  }));
  o.onPreview([{ metin: "bad rubric", cevap: "a" }]);
  o.onPreview([rows[0]]);
  return { data: { sorular: rows }, model: "fixture" };
};
const exam = await e.App.yazili.generate(
  "9",
  "math",
  ["u"],
  {},
  { onProgress: (i) => preview.push(i) },
);
assert.equal(examCalls, 3);
assert.equal(exam.sorular.length, 7);
assert.equal(
  exam.sorular.reduce((s, q) => s + q.puan, 0),
  100,
);
assert.ok(
  !preview.some((i) => i.questions.some((q) => q.metin === "bad rubric")),
);
// Measure prompt characters on the same content; byte/token estimates are not TTFT benchmarks.
const after = d.App.quiz.prompts(...args).prompt.length;
assert.ok(after < 700);
console.log(
  JSON.stringify({
    fixture: true,
    promptCharacters: {
      legacyBaseline: 770,
      after,
      reductionPercent: Math.round((1 - after / 770) * 100),
      baselineCommit: "d1d2283",
    },
    tests:
      "partial nested/escaped JSON, incomplete data, retry reset, cap, invalid answer/rubric exclusion, 12-question pool, 100-point exam, no storage contamination",
  }),
);
