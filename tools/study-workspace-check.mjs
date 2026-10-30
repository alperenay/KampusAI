import fs from "node:fs";
import vm from "node:vm";
import assert from "node:assert/strict";
const App = {};
vm.runInNewContext(
  fs.readFileSync("js/modules/study-workspace-model.js", "utf8"),
  { App, Date, Number, Set, Error },
);
const m = App.studyWorkspaceModel,
  rows = m.sections(
    "A source paragraph about photosynthesis and energy. ".repeat(50),
  );
assert.ok(rows.length > 1);
assert.equal(
  rows.map((r) => r.text).join(""),
  "A source paragraph about photosynthesis and energy. ".repeat(50).trim(),
);
assert.throws(() => m.sections("short"));
assert.throws(() => m.sections("x".repeat(12001)));
const pack = {
  title: "Biology",
  summary: Array.from({ length: 3 }, () => ({ text: "A fact", refs: [1] })),
  concepts: Array.from({ length: 2 }, () => ({
    name: "Cell",
    explain: "A concept",
    refs: [1],
  })),
  cards: Array.from({ length: 3 }, () => ({
    front: "Question",
    back: "Answer",
    refs: [1],
  })),
  quiz: Array.from({ length: 3 }, () => ({
    q: "Which?",
    options: ["a", "b", "c", "d"],
    answer: 0,
    explain: "Because",
    refs: [1],
  })),
};
assert.equal(m.pack(pack, rows).quiz.length, 3);
for (const mutate of [
  (p) => (p.quiz[0].answer = 4),
  (p) => (p.quiz[0].options[2] = "a"),
  (p) => (p.summary[0].refs = [999]),
  (p) => (p.cards[0].back = ""),
  (p) => (p.concepts = []),
]) {
  const p = structuredClone(pack);
  mutate(p);
  assert.throws(() => m.pack(p, rows));
}
assert.equal(m.validDate("2028-02-29"), true);
assert.equal(m.validDate("2027-02-29"), false);
assert.equal(m.validDate("2026-04-31"), false);
assert.throws(() => m.task({ title: "x", due: "tomorrow" }));
assert.throws(() => m.task({ title: "" }));
assert.equal(
  m.task({ title: "x", steps: ["one", { text: "two", done: true }] }).steps[1]
    .done,
  true,
);
const qs = {
  questions: Array.from({ length: 3 }, () => ({
    q: "Why?",
    expected: "Because",
    criteria: ["a", "b", "c"],
  })),
};
assert.equal(m.oral(qs).length, 3);
assert.throws(() => m.oral({ questions: [qs.questions[0]] }));
const review = {
  criteria: [
    { score: 0, note: "a" },
    { score: 1, note: "b" },
    { score: 2, note: "c" },
  ],
  feedback: "Try again",
  followup: "Why?",
};
assert.equal(m.feedback(review).score, 3);
for (const score of [-1, 3, NaN, "2"])
  assert.throws(() =>
    m.feedback({
      ...review,
      criteria: [{ score, note: "bad" }, ...review.criteria.slice(1)],
    }),
  );
const html = fs.readFileSync("index.html", "utf8");
for (const name of ["canli", "cevre", "cevre-model"])
  assert.ok(!html.includes("js/modules/" + name + ".js"));
assert.ok(
  fs.readFileSync("js/modules/hub.js", "utf8").includes("belge-paketi"),
);
console.log(
  "Workspace: source limits/references, strict quiz keys, date validity, task steps, oral rubrics, retired feature entry points passed.",
);
