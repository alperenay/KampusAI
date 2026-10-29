import assert from "node:assert/strict";
import path from "node:path";
import { uiHarness } from "./ui-harness.mjs";
const h = await uiHarness();
try {
  const { page } = await h.device("konular/9/edebiyat/u1/k1");
  await page.waitForSelector(".lesson-main");
  await page.waitForTimeout(1600);
  const keys = await page.evaluate(() => [
    "9/edebiyat/u1/k1",
    ...["matematik", "kimya", "biyoloji", "cografya"]
      .map(
        (id) =>
          App.learnmap
            .allOutcomes()
            .find(
              (x) =>
                x.subject.id === id &&
                (x.outcome.content || x.outcome.curatedContent),
            )?.key,
      )
      .filter(Boolean),
  ]);
  for (const width of [320, 768, 1239, 1240, 1440, 1600])
    for (const key of keys) {
      await page.setViewportSize({ width, height: 1000 });
      await page.evaluate((key) => App.router.go("konular/" + key), key);
      await page.waitForSelector("[data-reading-mode]");
      await page.waitForTimeout(100);
      const r = await page.evaluate(() => {
        const main = document.querySelector(".lesson-main"),
          guide = document.querySelector(".page-guide"),
          aside = document.querySelector(".lesson-aside"),
          m = main.getBoundingClientRect(),
          g = guide.getBoundingClientRect(),
          a = aside.getBoundingClientRect();
        return {
          host: guide.parentElement === main,
          guideH: g.height,
          mainW: m.width,
          guideW: g.width,
          mainX: m.x,
          asideX: a.x,
          mainY: m.y,
          asideY: a.y,
          overflow: document.documentElement.scrollWidth - innerWidth,
        };
      });
      assert.equal(r.host, true, key + " guide must stay inside content");
      assert.ok(
        r.guideH < 180,
        key + " help must not stretch full lesson height",
      );
      assert.ok(
        r.mainW > (width >= 1240 ? 500 : width < 500 ? 260 : 550),
        key + " usable reading width " + JSON.stringify(r),
      );
      assert.ok(r.overflow <= 1);
      if (width >= 1240) {
        assert.ok(r.asideX > r.mainX + r.mainW - 2);
        assert.ok(
          Math.abs(r.asideY - r.mainY) < 100,
          "Outline must stay beside lesson, not below its full height",
        );
      }
    }
  // Reading mode, guide expansion and repeated route refresh must not duplicate/move the guide.
  await page.setViewportSize({ width: 1440, height: 1000 });
  await page.evaluate(() => App.router.refresh());
  await page.waitForTimeout(200);
  await page.locator(".page-guide summary").click();
  assert.ok(
    (await page.locator(".page-guide details").getAttribute("open")) !== null,
  );
  await page.click("[data-reading-mode]");
  assert.equal(await page.locator(".topbar").isVisible(), false);
  await page.evaluate(() => (document.querySelector("#view").scrollTop = 1000));
  await page.click(".reading-restore");
  assert.ok(
    await page.evaluate(() => document.querySelector("#view").scrollTop > 500),
    "Restoring menus must not jump back to the header",
  );
  assert.equal(await page.locator(".page-guide").count(), 1);
  await page.screenshot({ path: path.join(h.qa, "lesson-fixed-desktop.png") });
  assert.deepEqual(h.errors, []);
  console.log(
    h.engineName +
      ": five lesson subjects at 320–1600px, desktop columns, bounded guide, outline position and reading-mode restore passed.",
  );
} finally {
  await h.close();
}
