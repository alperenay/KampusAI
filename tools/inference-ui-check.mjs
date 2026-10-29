// Real App.ai.generate parser + UI, controlled streaming engine; no provider/model accuracy claim.
import assert from "node:assert/strict";
import { uiHarness } from "./ui-harness.mjs";
import { researchBank } from "./fixtures/research-bank.mjs";
const h = await uiHarness();
try {
  const { page } = await h.device();
  const key = await page.evaluate((bank) => {
    const engine = {
      id: "stream-fixture",
      kind: "cloud",
      prepare: async () => {},
      config: () => ({ chatModel: "fixture" }),
      chat: (options) =>
        new Promise((resolve, reject) => {
          const isWritten = options.messages[1].content.includes("sorular"),
            rows = isWritten
              ? Array.from({ length: 7 }, (_, i) => ({
                  metin: "Soru " + i,
                  cevap: "Yanıt",
                  olcut: [
                    [15, "Tam"],
                    [8, "Kısmi"],
                    [0, "Boş"],
                  ],
                }))
              : bank;
          const name = isWritten ? "sorular" : "questions",
            prefix = '{"' + name + '":[' + JSON.stringify(rows[0]);
          options.onDelta(prefix, prefix);
          window.__finishStream = () =>
            resolve({
              text: JSON.stringify({ [name]: rows }),
              model: "fixture",
            });
          options.signal.addEventListener(
            "abort",
            () => reject(new DOMException("Cancelled", "AbortError")),
            { once: true },
          );
        }),
    };
    App.engine.resolve = async () => engine;
    App.engine.fallbackFor = async () => null;
    return App.learnmap
      .allOutcomes()
      .find((x) => x.outcome.content || x.outcome.curatedContent).key;
  }, researchBank(30));
  await page.evaluate((key) => App.router.go("test/" + key), key);
  await page.waitForFunction(
    () => document.querySelector("#qGeneration progress")?.value === 1,
  );
  assert.equal(
    await page.locator("#qGeneration .generation-preview li").count(),
    1,
  );
  assert.match(
    await page.locator("#qGeneration .generation-status").innerText(),
    /önizleme/,
  );
  assert.equal(
    await page.evaluate(async () => (await App.db.getAll("quizzes")).length),
    0,
  );
  await page.locator("#qGeneration button").click();
  await page.waitForSelector("#qRetry");
  await page.evaluate(() => App.router.go("yazili/9/matematik"));
  await page.waitForSelector("#yzGen");
  await page.locator(".yz-gen__units input").first().check();
  await page.click("#yzGen");
  await page.waitForFunction(
    () => document.querySelector("#yzGenSt progress")?.value === 1,
  );
  assert.equal(
    await page.locator("#yzGenSt .generation-preview li").count(),
    1,
  );
  await page.evaluate(() => App.router.go("bugun"));
  await page.waitForSelector(".today");
  assert.equal(
    await page.evaluate(
      async () =>
        (await App.db.getAll("meta")).filter((x) => x.kind === "yazili-ai")
          .length,
    ),
    0,
  );
  assert.deepEqual(h.errors, []);
  console.log(
    h.engineName +
      ": actual incremental parser renders first validated object before batch completion; quiz cancel and written-route abort persist no incomplete exam/test.",
  );
} finally {
  await h.close();
}
