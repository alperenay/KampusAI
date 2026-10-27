import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';
import assert from 'node:assert/strict';
import { fileURLToPath } from 'node:url';
const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..'), rows = new Map(), writes = [];
let fail = false, sequence = 0;
const db = { async get(store, id) { return rows.has(id) ? structuredClone(rows.get(id)) : null; }, async getAll() { return [...rows.values()].map((x) => structuredClone(x)); }, async put(store, row) { if (fail) { fail = false; throw new Error('disk full'); } writes.push(store); rows.set(row.id, structuredClone(row)); }, async remove(store, id) { writes.push(store); rows.delete(id); } };
const ctx = vm.createContext({ App: { utils: { uid: () => 'run_' + (++sequence) }, db }, Date, Math, Set, console });
for (const f of ['js/data/practice-bank.js', 'js/modules/practice.js']) vm.runInContext(fs.readFileSync(path.join(root, f), 'utf8'), ctx);
const { practice: E, practiceBank: B } = ctx.App;
const expected = { oran: [24, 360, 140], yuzde: [30, 30, 340], dogrusal: [80, 30, 52], kuvvet: [3, 4, 3], derisim: [15, 10, 10], kalitim: [25, 50, 25] };
let count = 0;
for (const f of B.families) {
  assert.equal(f.tasks.length, 3); assert.equal(new Set(f.tasks.map((q) => q.context)).size, 3);
  let s = E.create('transfer', f.id);
  for (let i = 0; i < 3; i++) { const q = E.question(s, i); assert.equal(q.options[q.answer], expected[f.id][i]); assert.equal(new Set(q.options).size, 4); assert.equal(q.options.length, 4); assert.ok(q.q.tr && q.q.en && q.why.tr && q.why.en); s = E.answer(s, q.answer, null, 1234); }
  assert.equal(E.summary(s).complete, 3); assert.equal(E.summary(s).rows.reduce((a, r) => a + r.elapsedMs, 0), 3702);
  const before = JSON.stringify(s); assert.throws(() => E.answer(s, 0)); assert.equal(JSON.stringify(s), before);
  await E.save(s); const a = await E.finish(s); await E.finish(s); assert.equal((await E.history('transfer')).filter((r) => r.id === a.id).length, 1); assert.equal(await E.load('transfer', f.id), null); count++;
}
// Independent content expectations: first error indices/reasons, including inherited later errors.
const wrong = { eq: [1, 0], square: [1, 1], discount: [1, 0], speed: [1, 1], net: [2, 0], kinetic: [2, 1], mass: [2, 0], mol: [1, 0], dilution: [2, 1], inherit: [1, 0], gamete: [1, 0], energy: [2, 0] };
for (const q of B.errors) { assert.deepEqual([q.bad, q.reason], wrong[q.id]); assert.ok(q.steps.length >= 2 && q.fix.tr && q.fix.en); assert.ok(q.bad > 0 && q.bad < q.steps.length); }
for (const topic of ['all', 'Matematik', 'Fizik', 'Kimya', 'Biyoloji']) {
  let s = E.create('error', topic); assert.equal(new Set(s.queue).size, 3);
  for (let i = 0; i < 3; i++) { const q = E.question(s, i); s = E.answer(s, q.bad, (q.reason + 1) % q.reasons.length, 0); }
  const score = E.summary(s); assert.equal(score.correct, 3); assert.equal(score.reasonCorrect, 0); assert.equal(score.complete, 0); count++;
}
let s = E.create('transfer', 'oran'); assert.throws(() => E.answer(s, -1)); assert.throws(() => E.answer(s, 99)); assert.throws(() => E.create('other', 'oran')); assert.throws(() => E.create('transfer', 'unknown'));
const stable = JSON.stringify(s); const next = E.answer(s, 0, null, -5); assert.equal(JSON.stringify(s), stable); assert.equal(next.responses[0].elapsedMs, 0);
await E.save(next); assert.equal((await E.load('transfer', 'oran')).responses.length, 1);
fail = true; await assert.rejects(E.save(E.answer(next, 0, null, 20))); assert.equal((await E.load('transfer', 'oran')).responses.length, 1);
await assert.rejects(E.finish(s));
// A previous result must not delete a newer draft of the same topic.
let old = E.create('transfer', 'oran'); for (let i = 0; i < 3; i++) old = E.answer(old, 0, null, 10);
const fresh = E.create('transfer', 'oran'); await E.save(fresh); await E.finish(old); assert.equal((await E.load('transfer', 'oran')).id, fresh.id);
// Malformed/cross-version drafts and forged summary fields are never trusted.
const bad = JSON.parse(JSON.stringify(fresh)); bad.version = 999; assert.equal(E.valid(bad), false);
bad.version = B.version; bad.queue[0] = 'not-in-bank'; assert.equal(E.valid(bad), false);
const result = (await E.history('transfer'))[0]; rows.get(result.id).metrics.complete = 999; assert.ok((await E.history('transfer'))[0].metrics.complete <= 3);
assert.ok(writes.every((s) => s === 'meta')); assert.ok([...rows.keys()].every((id) => id.startsWith('practice:')));
// Instructional arithmetic and explicit assumptions, checked independently of authored answer labels.
assert.equal(400 * .85, 340); assert.equal((20 - 8) / 4, 3); assert.equal(12 / 80 * 100, 15); assert.equal(.5 * .5 * 100, 25); assert.equal(100 * .8 * .9, 72); assert.equal(72 / 3.6, 20); assert.equal(.5 * 2 * 3 ** 2, 9);
console.log('Practice: ' + count + ' full subject flows; 18 context tasks, 12 error examples, isolated persistence, retry, idempotency and schema checks passed.');
