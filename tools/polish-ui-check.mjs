import assert from "node:assert/strict";
import path from "node:path";
import { uiHarness } from "./ui-harness.mjs";
const h = await uiHarness();
try {
  const { page } = await h.device();
  await page.waitForSelector("[data-ai-favs]");
  const contrast = () =>
    page.evaluate(() => {
      const root=getComputedStyle(document.documentElement),canvas=document.createElement('canvas');canvas.width=canvas.height=1;const ctx=canvas.getContext('2d');
      const rgb=name=>{ctx.clearRect(0,0,1,1);ctx.fillStyle=root.getPropertyValue(name).trim();ctx.fillRect(0,0,1,1);return Array.from(ctx.getImageData(0,0,1,1).data).slice(0,3);};
      const lum = (c) =>
        c
          .map((x) => x / 255)
          .map((x) => (x <= 0.04045 ? x / 12.92 : ((x + 0.055) / 1.055) ** 2.4))
          .reduce((a, x, i) => a + x * [0.2126, 0.7152, 0.0722][i], 0);
      const bg = lum(rgb("--bg")),
        result = {};
      for (const key of ["--text", "--muted", "--accent-text"]) {
        const l = lum(rgb(key));
        result[key] = (Math.max(l, bg) + 0.05) / (Math.min(l, bg) + 0.05);
      }

      return result;
    });
  for (const theme of ["dark", "light"]) {
    await page.evaluate((t) => App.theme.set(t), theme);
    const ratios = await contrast();
    for (const [key, value] of Object.entries(ratios))
      assert.ok(value >= 4.5, theme + " " + key + " contrast " + value);
    for (const width of [320, 768, 1440]) {
      await page.setViewportSize({ width, height: 900 });
      for (const route of ["", "bugun", "araclar"]) {
        await page.evaluate((r) => App.router.go(r), route);
        await page.waitForTimeout(650);
        assert.equal(
          await page.evaluate(
            () => document.documentElement.scrollWidth <= innerWidth + 1,
          ),
          true,
          theme + " " + width + " " + route,
        );
      }
    }
    await page.evaluate(() => App.router.go(""));
    await page.waitForTimeout(650);
    await page.screenshot({
      path: path.join(h.qa, "polish-desktop-" + theme + ".png"),
    });
    await page.setViewportSize({ width: 390, height: 844 });
    await page.waitForTimeout(500);
    await page.screenshot({
      path: path.join(h.qa, "polish-mobile-" + theme + ".png"),
    });
  }
  await page.evaluate(() => {
    document.documentElement.setAttribute("data-a11y-contrast", "");
    document.documentElement.setAttribute("data-a11y-motion", "");
  });
  for (const [key,ratio] of Object.entries(await contrast())) assert.ok(ratio >= 4.5,"High contrast "+key+": "+ratio);
  assert.equal(await page.evaluate(() => App.motion.reduced()), true);
  assert.deepEqual(h.errors, []);
  console.log(
    h.engineName +
      ": 18 theme/width/route layouts, text/muted/accent contrast >=4.5 and high-contrast/reduced-motion preservation passed.",
  );
} finally {
  await h.close();
}
