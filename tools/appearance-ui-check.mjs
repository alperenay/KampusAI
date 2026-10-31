import assert from "node:assert/strict";
import path from "node:path";
import { uiHarness } from "./ui-harness.mjs";
const h = await uiHarness();
try {
  const { page } = await h.device();
  await page.waitForFunction(() => !!App.appearance);
  await page.setViewportSize({ width: 390, height: 844 });
  await page.click("#quickBtn");
  await page.click("#appearanceSettings");
  await page.waitForSelector("[data-atmosphere-choice]");
  await page.click("[data-atmosphere-choice=forest]");
  assert.equal(await page.evaluate(() => App.appearance.palette()), "forest");
  await page.uncheck("#ambientMotion");
  assert.equal(
    await page.evaluate(() =>
      document.documentElement.hasAttribute("data-ambient-running"),
    ),
    false,
  );
  await page.locator(".modal-backdrop [data-close]").first().click();
  await page.reload();
  await page.waitForFunction(() => !!App.appearance);
  assert.equal(await page.evaluate(() => App.appearance.palette()), "forest");
  await page.evaluate(() => App.appearance.open());
  await page.check("#ambientMotion");
  await page.click("[data-atmosphere-choice=off]");
  assert.equal(await page.locator(".motion-atmosphere").isVisible(), false);
  await page.click("[data-atmosphere-choice=violet]");
  await page.locator(".modal-backdrop [data-close]").first().click();
  const key = await page.evaluate(
    () =>
      App.learnmap
        .allOutcomes()
        .find((x) => x.outcome.content || x.outcome.curatedContent).key,
  );
  await page.evaluate((key) => App.router.go("konular/" + key), key);
  await page.waitForSelector("[data-reading-mode]");
  assert.equal(await page.locator(".motion-atmosphere").isVisible(), false);
  await page.click("[data-reading-mode]");
  assert.equal(await page.locator(".tabbar").isVisible(), false);
  assert.equal(await page.locator(".topbar").isVisible(), false);
  assert.equal(await page.locator(".lesson-dock").isVisible(), false);
  assert.equal(await page.locator(".reading-restore").isVisible(), true);
  await page.keyboard.press("Escape");
  assert.equal(await page.locator(".tabbar").isVisible(), true);
  await page.click("[data-reading-mode]");
  await page.click(".reading-restore");
  assert.equal(await page.locator(".topbar").isVisible(), true);
  for (const [width, height, bottom] of [
    [320, 640, 48],
    [390, 844, 24],
    [768, 600, 80],
    [768, 360, 48],
  ]) {
    await page.setViewportSize({ width, height });
    await page.evaluate(
      (bottom) => window.__nativeInsets({ top: 28, bottom }),
      bottom,
    );
    await page.click("#menuBtn");
    await page.waitForTimeout(350);
    const geometry = await page.evaluate(() => {
      const s = document.querySelector("#sidebar").getBoundingClientRect(),
        b = document.querySelector("#profileBtn").getBoundingClientRect();
      return {
        top: s.top,
        bottom: s.bottom,
        buttonBottom: b.bottom,
        buttonTop: b.top,
        hit: document
          .elementFromPoint(b.x + b.width / 2, b.y + b.height / 2)
          ?.closest("#profileBtn")?.id,
      };
    });
    assert.ok(geometry.top >= 28);
    assert.ok(geometry.bottom <= height - bottom + 1);
    assert.ok(geometry.buttonBottom <= height - bottom);
    assert.ok(geometry.buttonTop >= 28);
    assert.equal(geometry.hit, "profileBtn");
    assert.equal(await page.locator("#sidebar #profileBtn").count(), 1, "Only one student profile/settings entry remains");
    assert.equal(await page.locator("#sidebarSettingsTop, #settingsBtn").count(), 0, "No duplicate settings buttons");
    assert.equal(await page.locator(".nav-category__icon").count(), 8);
    await page.click("#profileBtn");
    await page.waitForSelector(".modal--settings .settings-hero");
    assert.equal(await page.locator(".modal--settings #setAppearance").count(), 1);
    await page.waitForSelector("#setName");
    await page.locator(".modal-backdrop [data-close]").first().click();
    assert.equal(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= innerWidth + 1,
      ),
      true,
    );
  }
  // The name in the new settings sheet updates the top profile without storing a second copy.
  await page.setViewportSize({ width: 390, height: 844 });
  await page.click("#menuBtn");
  await page.click("#profileBtn");
  await page.fill("#setName", "Deneme Öğrenci");
  await page.click("#setSave");
  assert.equal(await page.locator("#profileName").innerText(), "Deneme Öğrenci");
  await page.evaluate(() => App.modules.settings.open());
  assert.equal(await page.inputValue("#setName"), "Deneme Öğrenci");
  await page.click("#setAppearance");
  await page.waitForSelector("[data-atmosphere-choice]");
  await page.locator(".modal-backdrop [data-close]").first().click();

  await page.setViewportSize({ width: 320, height: 640 });
  await page.evaluate(() => window.__nativeInsets({ top: 28, bottom: 48 }));
  await page.click("#menuBtn");
  await page.focus("#navFilter");
  await page.evaluate(() => {
    Object.defineProperty(visualViewport, "height", {
      configurable: true,
      get: () => 400,
    });
    dispatchEvent(new Event("resize"));
  });
  await page.waitForTimeout(350);
  assert.ok(
    await page
      .locator("#profileBtn")
      .evaluate((el) => el.getBoundingClientRect().bottom <= 352),
    "Drawer footer stays above a simulated visual-viewport keyboard",
  );
  await page.click(".sidebar-close");
  await page.evaluate(() => {
    delete visualViewport.height;
    dispatchEvent(new Event("resize"));
  });
  await page.setViewportSize({ width: 390, height: 844 });
  await page.evaluate(() => window.__nativeInsets({ top: 28, bottom: 48 }));
  await page.click("#menuBtn");
  await page.waitForTimeout(400);
  await page.screenshot({ path: path.join(h.qa, "appearance-menu.png") });
  await page.click(".sidebar-close");
  await page.evaluate(() => App.router.go(""));
  await page.waitForSelector("#composer");
  await page.waitForTimeout(750);
  await page.screenshot({ path: path.join(h.qa, "appearance-home.png") });
  assert.deepEqual(h.errors, []);
  console.log(
    h.engineName +
      ": palette persistence, ambient pause/off, clear menu, lesson reading/restore and safe-area hit targets with 24/48/80px system navigation passed.",
  );
} finally {
  await h.close();
}
