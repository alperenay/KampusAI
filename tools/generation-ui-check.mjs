import assert from "node:assert/strict";
import { uiHarness } from "./ui-harness.mjs";
import { researchBank } from "./fixtures/research-bank.mjs";
const h = await uiHarness();
try {
  const { page: p } = await h.device();
  const key = await p.evaluate((bank) => {
    let calls = 0;
    App.ai.generate = async (options) => {
      calls++; if (options.onDelta) options.onDelta("{", "{");
      if (calls === 2) await new Promise((resolve, reject) => options.signal.addEventListener("abort", () => reject(new DOMException("Cancelled", "AbortError")), { once: true }));
      return { model: "fixture", data: { questions: bank } };
    };
    const key = App.learnmap.allOutcomes().find((it) => it.outcome.content).key; App.router.go("test/" + key); return key;
  }, researchBank(30));
  await p.waitForFunction(() => document.querySelector("#qGeneration progress") && document.querySelector("#qGeneration progress").value === 3);
  assert.equal(await p.locator(".generation-preview li").count(), 3);
  await p.locator("#qGeneration button").click(); await p.locator("#qRetry").waitFor();
  assert.equal((await p.evaluate(() => App.db.getAll("quizzes"))).length, 0);
  await p.evaluate((bank) => { App.ai.generate = async () => ({ model: "fixture", data: { questions: bank } }); }, researchBank(30));
  await p.locator("#qRetry").click(); await p.locator(".quiz-finish").waitFor();
  await p.evaluate(() => App.router.go("yazili/9/matematik")); await p.locator("#yzGen").waitFor();
  await p.locator(".yz-gen__units input").first().check();
  await p.evaluate(() => {
    let calls = 0;
    App.ai.generate = async (options) => {
      if (++calls === 2) await new Promise((resolve, reject) => options.signal.addEventListener("abort", () => reject(new DOMException("Cancelled", "AbortError")), { once: true }));
      return { model: "fixture", data: { sorular: Array.from({ length: 7 }, (_, i) => ({ metin: "Soru " + i, cevap: "Yanıt", olcut: [[15, "Tam"], [8, "Kısmi"], [0, "Boş"]] })) } };
    };
  });
  await p.locator("#yzGen").click(); await p.waitForFunction(() => document.querySelector("#yzGenSt progress") && document.querySelector("#yzGenSt progress").value === 3);
  assert.equal(await p.locator("#yzGenSt .generation-preview li").count(), 3);
  await p.evaluate(() => App.router.go("bugun")); await p.locator(".today").waitFor();
  assert.equal(await p.evaluate(async () => (await App.db.getAll("meta")).filter((r) => r.kind === "yazili-ai").length), 0);
  await p.evaluate(() => {
    App.ai.generate = async () => ({ model: "fixture", data: { sorular: Array.from({ length: 7 }, (_, i) => ({ metin: "Soru " + i, cevap: "Yanıt", olcut: [[15, "Tam"], [8, "Kısmi"], [0, "Boş"]] })) } });
    App.router.go("yazili/9/matematik");
  });
  await p.locator("#yzGen").waitFor(); await p.locator(".yz-gen__units input").first().check(); await p.locator("#yzGen").click();
  await p.waitForFunction(() => App.router.current().params[2] && App.router.current().params[2].startsWith("ai"));
  const exams = await p.evaluate(async () => (await App.db.getAll("meta")).filter((r) => r.kind === "yazili-ai"));
  assert.equal(exams.length, 1); assert.equal(exams[0].exam.sorular.length, 7); assert.equal(exams[0].exam.sorular.reduce((s, q) => s + q.puan, 0), 100);
  assert.deepEqual(h.errors, []);
  console.log("Generation UI: first-three previews, real progress, cancellation, retry, route-change abort and seven-question/100-point written exam passed.");
} finally { await h.close(); }
