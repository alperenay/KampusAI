import assert from "node:assert/strict";
import path from "node:path";
import { uiHarness } from "./ui-harness.mjs";
const h = await uiHarness();
try {
  const { page } = await h.device();
  await page.waitForSelector("[data-ai-favs]");
  await page.click(".ai-favs summary");
  await page.fill(".aif-editor input[name=title]", "Kendi çalışma aracım");
  await page.fill(".aif-editor textarea", "Benim için örnek üret: ");
  await page.check(".aif-editor input[name=coach]");
  await page.click(".aif-editor button[type=submit]");
  const id = await page.evaluate(() => App.aiFavorites.customTools()[0].id);
  assert.equal(await page.locator('[data-aif-open="' + id + '"]').count(), 1);
  await page.fill("[data-aif-search]", "Kendi çalışma");
  assert.equal(await page.locator("[data-aif-row]:visible").count(), 1);
  await page.fill("[data-aif-search]", "");
  await page.click('[data-aif-up="' + id + '"]');
  assert.equal(
    await page.evaluate((id) => App.aiFavorites.pins().indexOf(id), id),
    2,
  );
  await page.click('[data-aif-edit="' + id + '"]');
  await page.fill(".aif-editor input[name=title]", "Düzenlenmiş araç");
  // Pinning another tool must preserve an unsaved personal template.
  await page.click(".ai-fav-options [data-aif-pin=quiz]");
  assert.equal(
    await page.inputValue(".aif-editor input[name=title]"),
    "Düzenlenmiş araç",
  );
  await page.click(".aif-editor button[type=submit]");
  await page.reload();
  await page.waitForSelector("[data-ai-favs]");
  assert.equal(
    await page.evaluate(() => App.aiFavorites.customTools()[0].tr),
    "Düzenlenmiş araç",
  );
  await page.fill("#composer textarea", "Notumu koru");
  await page.click('[data-aif-open="' + id + '"]');
  assert.match(await page.inputValue("#composer textarea"), /Notumu koru/);
  assert.match(await page.inputValue("#composer textarea"), /Benim için/);
  await page.evaluate(() => App.router.go("araclar/science"));
  await page.waitForSelector("[data-hub-category=science]");
  assert.equal(
    await page
      .locator("[data-hub-category=science]")
      .getAttribute("aria-pressed"),
    "true",
  );
  assert.equal(await page.locator(".hub-tile[data-r=ph]").isVisible(), true);
  assert.equal(
    await page.locator(".hub-tile[data-r=duello]").isVisible(),
    false,
  );
  await page.click("[data-hub-category=practice]");
  assert.equal(
    await page.locator(".hub-tile[data-r=duello]").isVisible(),
    true,
  );
  await page.fill("#hubQ", "zz-no-match");
  assert.equal(await page.locator("#hubNone").isVisible(), true);
  await page.locator("#hubQ").press("Escape");
  for (const width of [320, 390, 768, 1440]) {
    await page.setViewportSize({ width, height: 900 });
    assert.equal(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= innerWidth + 1,
      ),
      true,
    );
  }
  await page.evaluate(() => App.router.go(""));
  await page.waitForSelector("[data-ai-favs]");
  await page.click(".ai-favs summary");
  for (const width of [320, 768, 1440]) {
    await page.setViewportSize({ width, height: 900 });
    assert.equal(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= innerWidth + 1,
      ),
      true,
    );
  }
  await page.click('[data-aif-delete="' + id + '"]');
  assert.equal(
    await page.evaluate(() => App.aiFavorites.customTools().length),
    0,
  );
  await page.screenshot({
    path: path.join(h.qa, "v150-workspace.png"),
    fullPage: true,
  });
  assert.deepEqual(h.errors, []);
  console.log(
    h.engineName +
      ": category filters, personal template CRUD/search/order/persistence, draft preservation and 320–1440px passed.",
  );
} finally {
  await h.close();
}
