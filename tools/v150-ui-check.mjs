import assert from "node:assert/strict";
import path from "node:path";
import { uiHarness, navigate } from "./ui-harness.mjs";
const h = await uiHarness();
try {
  const { page } = await h.device();
  await page.waitForSelector("#composer");
  await navigate(page,"favorilerim");
  await page.click("[data-favorites-ai] summary");
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
  await page.waitForSelector("[data-favorites-ai]");
  assert.equal(
    await page.evaluate(() => App.aiFavorites.customTools()[0].tr),
    "Düzenlenmiş araç",
  );
  await navigate(page, "");
  await page.fill("#composer textarea", "Notumu koru");
  await page.evaluate(id=>App.favorites.open("ai:"+id),id);
  assert.match(await page.inputValue("#composer textarea"), /Notumu koru/);
  assert.match(await page.inputValue("#composer textarea"), /Benim için/);
  await page.evaluate(() => App.router.go("araclar/study"));
  await page.waitForSelector("[data-hub-category=study]");
  assert.equal(
    await page
      .locator("[data-hub-category=study]")
      .getAttribute("aria-pressed"),
    "true",
  );
  assert.equal(await page.locator(".hub-tile[data-r=bilim-lab]").isVisible(), true);
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
  await page.setViewportSize({width:320,height:640});
  await page.evaluate(()=>App.router.go('araclar'));
  await page.waitForSelector('#hubQ');await page.fill('#hubQ','aktarim');
  const reachable=await page.evaluate(()=>{
    const title=document.querySelector('.hub-tile:not([hidden]) .hub-tile__link b').getBoundingClientRect();
    const bottom=document.querySelector('[aria-label="Alt menü"]')?.getBoundingClientRect().top ?? innerHeight;
    return title.top>=0 && title.bottom<bottom;
  });assert.equal(reachable,true,'Search result title must be tappable above mobile navigation at 320×640');
  await page.locator('#hubQ').press('Escape');
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
  await page.waitForSelector("#composer");
  await navigate(page,"favorilerim");
  await page.click("[data-favorites-ai] summary");
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
