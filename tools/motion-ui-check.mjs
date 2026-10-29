import assert from "node:assert/strict";
import path from "node:path";
import { uiHarness } from "./ui-harness.mjs";
const h = await uiHarness();
try {
  const { page } = await h.device();
  await page.waitForFunction(() => !!App.motion);
  await page.setViewportSize({ width: 390, height: 844 });
  const go = async (r) => {
    await page.evaluate((r) => App.router.go(r), r);
    await page.waitForTimeout(80);
  };
  await go("bugun");
  assert.ok(
    (await page
      .locator("#view")
      .evaluate((el) => el.getAnimations({ subtree: true }).length)) > 0,
    "Dashboard entrance must animate",
  );
  await page.evaluate(() => {
    window.__motionBefore = document
      .querySelector("#view")
      .getAnimations({ subtree: true })
      .filter((a) => a.effect.getTiming().duration === 360);
  });
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.waitForFunction(
    () =>
      window.__motionBefore.length > 0 &&
      window.__motionBefore.every((a) => a.playState === "idle"),
    { timeout: 1500 },
  );
  assert.equal(
    await page
      .locator("#view")
      .evaluate((el) => el.getAnimations({ subtree: true }).length),
    0,
    "Changing the OS preference cancels in-flight entrances",
  );
  await page.emulateMedia({ reducedMotion: "no-preference" });
  await page.waitForTimeout(650);
  const first = await page
    .locator(".motion-liquid")
    .evaluate((el) => el.getBoundingClientRect().x);
  await go("araclar");
  await page.waitForTimeout(650);
  const next = await page
    .locator(".motion-liquid")
    .evaluate((el) => el.getBoundingClientRect().x);
  assert.ok(next > first + 150);
  assert.equal(
    await page.locator(".motion-liquid").getAttribute("aria-hidden"),
    "true",
  );
  await page.click("[data-hub-category=science]");
  assert.equal(await page.locator(".hub-tile[data-r=ph]").isVisible(), true);
  assert.ok((await page.locator(".motion-touch").count()) <= 1);
  await page.waitForTimeout(450);
  assert.equal(await page.locator(".motion-touch").count(), 0);
  for (const route of ["bugun", "konular", "araclar", "bugun", "araclar"])
    await go(route);
  await page.waitForTimeout(800);
  assert.equal(
    await page
      .locator("#view")
      .evaluate(
        (el) =>
          el
            .getAnimations({ subtree: true })
            .filter((a) => a.playState === "running").length,
      ),
    0,
  );
  await page.emulateMedia({ reducedMotion: "reduce" });
  await go("bugun");
  assert.equal(await page.evaluate(() => App.motion.reduced()), true);
  assert.equal(
    await page
      .locator("#view")
      .evaluate((el) => el.getAnimations({ subtree: true }).length),
    0,
  );
  await page.emulateMedia({ reducedMotion: "no-preference" });
  await page.evaluate(() =>
    document.documentElement.setAttribute("data-a11y-motion", ""),
  );
  await go("araclar");
  assert.equal(
    await page
      .locator("#view")
      .evaluate((el) => el.getAnimations({ subtree: true }).length),
    0,
  );
  await page.evaluate(() =>
    document.documentElement.removeAttribute("data-a11y-motion"),
  );
  for (const width of [320, 390, 768, 1440]) {
    await page.setViewportSize({ width, height: 640 });
    await page.waitForTimeout(550);
    assert.equal(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= innerWidth + 1,
      ),
      true,
    );
  }
  await page.evaluate(() => {
    window.__motionAnimate = Element.prototype.animate;
    Element.prototype.animate = undefined;
  });
  await go("konular");
  assert.ok(await page.locator("#view").innerText());
  await page.evaluate(() => {
    Element.prototype.animate = window.__motionAnimate;
    delete window.__motionAnimate;
  });
  await page.setViewportSize({ width: 390, height: 844 });
  await go("bugun");
  await page.waitForTimeout(700);
  await page.screenshot({
    path: path.join(h.qa, "motion-mobile.png"),
    fullPage: true,
  });
  assert.deepEqual(h.errors, []);
  console.log(
    h.engineName +
      ": liquid tab movement, real entrances, click-through, rapid navigation cleanup, both reduced-motion settings and 320–1440px passed.",
  );
} finally {
  await h.close();
}
