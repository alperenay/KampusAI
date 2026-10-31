import assert from "node:assert/strict";
import path from "node:path";
import { uiHarness } from "./ui-harness.mjs";
const h = await uiHarness();
try {
  const { page } = await h.device();
  await page.waitForSelector("#composer");
  const contrast = () =>
    page.evaluate(() => {
      const root = getComputedStyle(document.documentElement),
        canvas = document.createElement("canvas");
      canvas.width = canvas.height = 1;
      const ctx = canvas.getContext("2d");
      const rgb = (name) => {
        ctx.clearRect(0, 0, 1, 1);
        ctx.fillStyle = root.getPropertyValue(name).trim();
        ctx.fillRect(0, 0, 1, 1);
        return Array.from(ctx.getImageData(0, 0, 1, 1).data).slice(0, 3);
      };
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
    // Measure foregrounds on the actual surface, not only the page background.
    const audit = await page.evaluate(() => {
      const root = getComputedStyle(document.documentElement),
        canvas = document.createElement("canvas");
      canvas.width = canvas.height = 1;
      const ctx = canvas.getContext("2d");
      const rgba = (value) => {
        ctx.clearRect(0, 0, 1, 1);
        ctx.fillStyle = value;
        ctx.fillRect(0, 0, 1, 1);
        return Array.from(ctx.getImageData(0, 0, 1, 1).data);
      };
      const over = (top, bottom) =>
        top
          .slice(0, 3)
          .map((v, i) => (v * top[3]) / 255 + bottom[i] * (1 - top[3] / 255));
      const lum = (rgb) =>
        rgb
          .map((v) => v / 255)
          .map((v) => (v <= 0.04045 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4))
          .reduce((v, c, i) => v + c * [0.2126, 0.7152, 0.0722][i], 0);
      const ratio = (a, b) =>
        (Math.max(lum(a), lum(b)) + 0.05) / (Math.min(lum(a), lum(b)) + 0.05);
      const token = (k) => rgba(root.getPropertyValue(k).trim()),
        bg = token("--bg");
      const surfaces = [
        "--bg",
        "--surface-primary",
        "--surface-secondary",
        "--surface-elevated",
      ];
      const result = [];
      for (const surface of surfaces) {
        const color = over(token(surface), bg);
        for (const key of [
          "--text",
          "--text-2",
          "--muted",
          "--faint",
          "--accent-text",
          "--good",
          "--good-text",
          "--warn",
          "--bad",
        ])
          result.push({
            name: key + " on " + surface,
            ratio: ratio(over(token(key), color), color),
            min: key === "--text" ? 7 : 4.5,
          });
      }
      const fixture = document.createElement("div");
      fixture.innerHTML =
        '<button class="btn btn--primary">Test</button><input class="input" placeholder="Placeholder"><span class="badge badge--good">Success</span><span class="badge badge--accent">Active</span><span class="error-text">Error</span>';
      document.querySelector("#view").appendChild(fixture);
      const base = over(token("--surface"), bg);
      for (const el of fixture.children) {
        const c = getComputedStyle(el),
          background = over(rgba(c.backgroundColor), base);
        result.push({
          name: el.className + " actual foreground",
          ratio: ratio(over(rgba(c.color), background), background),
          min: 4.5,
        });
        if (el.matches("input")) {
          if (document.documentElement.dataset.theme === "light")
            result.push({
              name: "input boundary",
              ratio: ratio(
                over(rgba(c.borderTopColor), background),
                background,
              ),
              min: 3,
            });
          const placeholder = getComputedStyle(el, "::placeholder");
          result.push({
            name: "input placeholder",
            ratio: ratio(over(rgba(placeholder.color), background), background),
            min: 4.5,
          });
        }
      }
      fixture.remove();
      return result;
    });
    for (const item of audit)
      assert.ok(
        item.ratio >= item.min,
        theme + " " + item.name + " contrast " + item.ratio + " < " + item.min,
      );

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
  for (const [key, ratio] of Object.entries(await contrast()))
    assert.ok(ratio >= 4.5, "High contrast " + key + ": " + ratio);
  assert.equal(await page.evaluate(() => App.motion.reduced()), true);
  assert.deepEqual(h.errors, []);
  console.log(
    h.engineName +
      ": 18 theme/width/route layouts, actual surfaces/statuses/buttons contrast >=4.5, primary text >=7 and high-contrast/reduced-motion preservation passed.",
  );
} finally {
  await h.close();
}
