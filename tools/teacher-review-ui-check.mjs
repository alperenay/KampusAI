import assert from "node:assert/strict";
import path from "node:path";
import { uiHarness } from "./ui-harness.mjs";
import { researchBank } from "./fixtures/research-bank.mjs";
const h = await uiHarness();
try {
  const student = await h.device("kartlar"), teacher = await h.device("degerlendirme");
  const s = student.page, p = teacher.page;
  await s.locator("#cardsChoose").waitFor(); await s.locator("#cardsChoose").click();
  await s.locator("#cardsAddStart").click(); await s.locator("#fc").waitFor();
  await s.locator("#fcShow").click(); await s.locator('[data-grade="2"]').click();
  const cards = await s.evaluate(() => App.db.getAll("cards")); assert.ok(cards.some((c) => c.reps === 1));
  await s.evaluate(() => App.router.go("kartlar/incele")); await s.locator(".cards-browse").waitFor();
  const before = await s.evaluate(async () => JSON.stringify(await App.db.getAll("cards")));
  await s.locator(".cards-browse details").first().locator("summary").click();
  assert.equal(await s.evaluate(async () => JSON.stringify(await App.db.getAll("cards"))), before);
  const bank = researchBank(30).map((q) => { const out = { ...q }; delete out.reasonOptions; delete out.reasonAnswer; return out; });
  const key = await s.evaluate((bank) => {
    App.ai.generate = async () => ({ model: "fixture", data: { questions: bank } });
    const it = App.learnmap.allOutcomes().find((x) => x.outcome.content || x.outcome.curatedContent); App.router.go("test/" + it.key); return it.key;
  }, bank);
  await s.locator(".quiz-finish").waitFor();
  for (let i = 0; i < 10; i++) {
    await s.locator('.quiz-q:visible .opt[data-o="0"]').click();
    await s.locator('.quiz-q:visible [data-reason-text]').fill("Çünkü doğru olduğunu tahmin ettim; konuyla bağlantısını bilmiyorum.");
    await s.locator('.quiz-q:visible [data-confidence][value="100"]').check(); await s.locator("#qFinish").click();
  }
  await s.locator(".quiz-result").waitFor();
  const original = await s.evaluate(async () => (await App.db.getAll("quizzes"))[0]);
  assert.equal(original.metacognition.reasonAssessed, 0);
  await s.locator(".mis__actions button").filter({ hasText: "Gerekçelerimi" }).click();
  await s.locator("#reviewParticipant").fill("TEST-REVIEW-01"); await s.locator("#reviewSend").click();
  await s.locator("#rCodes").waitFor(); const requestCodes = await s.locator("#rCodes").inputValue();
  await s.locator(".modal-backdrop").last().locator("[data-close]").last().click();
  async function importCodes(page, codes) {
    await page.locator("#reviewImport").click(); await page.locator("#reviewCodes").fill(codes);
    await page.locator("#reviewReceive").click(); await page.locator("#reviewCodes").waitFor({ state: "detached" });
    await page.locator(".review-question").first().waitFor();
  }
  await importCodes(p, requestCodes);
  // Eksik seçim sessizce sıfır puan olamaz.
  await p.locator('form[data-review] [type="submit"]').click();
  assert.equal(await p.locator("[data-feedback]").count(), 0);
  for (let i = 0; i < 10; i++) {
    const details = p.locator(".review-question").nth(i); await details.evaluate((el) => { el.open = true; });
    for (let j = 0; j < 3; j++) await p.locator('[name="rating-' + i + '-' + j + '"]').selectOption("0");
    await p.locator('[name="comment-' + i + '"]').fill("Gerekçeni verilen bilgiyle ilişkilendir; tahmin yeterli değil.");
  }
  for (const width of [320, 390, 768, 1440]) {
    await p.setViewportSize({ width, height: 900 });
    for (const theme of ["light", "dark"]) {
      await p.evaluate((v) => App.theme.set(v), theme);
      assert.equal(await p.locator(".review-rubric").first().evaluate((el) => el.scrollWidth > el.clientWidth + 1), false);
    }
  }
  await p.locator('form[data-review] [type="submit"]').click(); await p.locator("[data-feedback]").waitFor();
  await p.setViewportSize({ width: 390, height: 900 });
  await p.screenshot({ path: path.join(h.qa, "teacher-review-mobile.png"), animations: "disabled" });
  await p.locator("[data-feedback]").click(); await p.locator("#rCodes").waitFor(); const feedback = await p.locator("#rCodes").inputValue();
  await s.evaluate(() => App.router.go("degerlendirme")); await s.locator("#reviewImport").waitFor();
  await importCodes(s, feedback); await importCodes(s, feedback);
  const updated = await s.evaluate(async () => (await App.db.getAll("quizzes"))[0]);
  assert.equal(updated.correct, 10); assert.equal(updated.metacognition.reasonAssessed, 10);
  assert.equal(updated.metacognition.reasonAccuracy, 0);
  assert.equal(updated.metacognition.categories.fragileCorrect, 10);
  assert.ok(updated.adaptive.endAbility < original.adaptive.endAbility);
  assert.equal(updated.date, original.date);
  assert.equal((await p.evaluate(() => App.db.getAll("quizzes"))).length, 0);
  assert.deepEqual(h.errors, []);
  console.log("Teacher UI: empty-deck CTA, study/browse isolation, free reasoning QR round-trip, required rubric, feedback idempotency, profile/adaptive update and responsive themes passed.");
} finally { await h.close(); }
