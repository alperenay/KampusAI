// Pre-release integration checks. Network/hardware/model quality are outside these deterministic UI checks.
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { uiHarness } from "./ui-harness.mjs";
const h = await uiHarness();
try {
  const context = await h.browser.newContext({
    serviceWorkers: "block",
    viewport: { width: 390, height: 844 },
  });
  await context.route("**/*", (r) => {
    const u = new URL(r.request().url());
    if (u.hostname !== "127.0.0.1") return r.abort();
    if (u.pathname === "/ollama/api/version")
      return r.fulfill({ json: { version: "qa-fixture" } });
    if (u.pathname === "/ollama/api/tags")
      return r.fulfill({ json: { models: [] } });
    return r.continue();
  });
  await context.addInitScript(() => {
    window.__docKeys = new Set();
    const add = EventTarget.prototype.addEventListener,
      remove = EventTarget.prototype.removeEventListener;
    EventTarget.prototype.addEventListener = function (type, fn, opts) {
      if (this === document && type === "keydown") window.__docKeys.add(fn);
      return add.call(this, type, fn, opts);
    };
    EventTarget.prototype.removeEventListener = function (type, fn, opts) {
      if (this === document && type === "keydown") window.__docKeys.delete(fn);
      return remove.call(this, type, fn, opts);
    };
  });
  const page = await context.newPage(),
    warnings = [],
    errors = [];
  page.on("pageerror", (e) => errors.push(e.message));
  page.on("console", (m) => {
    if (
      ["warning", "error"].includes(m.type()) &&
      m.location().url.startsWith(h.baseUrl)
    )
      warnings.push({
        type: m.type(),
        text: m.text(),
        source: m.location().url,
      });
  });
  await page.goto(h.baseUrl + "/#/");
  await page.waitForFunction(
    () => window.App && App.startup && !App.startup.active,
  );
  await page.waitForSelector(".tour");
  await page.click('[data-tour="next"]');
  await page.waitForSelector("#tourSection");
  await page.click('[data-tour="skip"]');
  await page.waitForFunction(() => !App.tour.isActive());
  assert.equal(await page.evaluate(() => App.prefs.get("tourDone")), true);
  await page.evaluate(() => {
    App.prefs.set("qa155-token", "saved");
    App.theme.set("light");
  });
  await page.reload();
  await page.waitForFunction(
    () =>
      window.App &&
      App.startup &&
      !App.startup.active &&
      document.querySelector("[data-ai-favs]"),
  );
  assert.equal(await page.locator(".tour").count(), 0);
  assert.equal(
    await page.evaluate(() => App.prefs.get("qa155-token")),
    "saved",
  );
  assert.equal(await page.evaluate(() => App.theme.current), "light");
  await page.evaluate(()=>{window.__focusRace=App.ui.modal({title:'Focus race',body:'<input id="qaFirst"><textarea id="qaSecond"></textarea>'});document.getElementById('qaSecond').focus();});
  await page.waitForTimeout(80);assert.equal(await page.evaluate(()=>document.activeElement.id),'qaSecond','Delayed autofocus cannot override a user-selected field');await page.evaluate(()=>window.__focusRace.close());
  const baseline = await page.evaluate(() => window.__docKeys.size);
  await page.evaluate(() => {
    const b = document.getElementById("quickBtn");
    b.focus();
    window.__outer = App.ui.modal({
      title: "Outer QA",
      body: '<button id="qaOpen">Open nested</button>',
    });
  });
  await page.waitForTimeout(50);
  await page.click("#qaOpen");
  await page.evaluate(() => {
    window.__inner = App.ui.modal({
      title: "Inner QA",
      body: '<input id="qaField"><button id="qaLast">Last</button>',
    });
  });
  await page.waitForTimeout(50);
  await page.focus("#qaLast");
  await page.keyboard.press("Tab");
  assert.equal(
    await page.evaluate(() =>
      document.activeElement.hasAttribute("data-close"),
    ),
    true,
  );
  await page.keyboard.press("Escape");
  assert.equal(
    await page.locator(".modal-backdrop").count(),
    1,
    "Escape must close only the top modal",
  );
  await page.keyboard.press("Escape");
  assert.equal(await page.locator(".modal-backdrop").count(), 0);
  assert.equal(
    await page.evaluate(() => document.activeElement.id),
    "quickBtn",
  );
  // Closing before the autofocus timer runs must not steal focus later or accumulate handlers.
  await page.evaluate(() => {
    for (let i = 0; i < 12; i++) {
      const m = App.ui.modal({ title: "Transient", body: "<input>" });
      m.close();
    }
    document.getElementById("quickBtn").focus();
  });
  await page.waitForTimeout(100);
  assert.equal(
    await page.evaluate(() => document.activeElement.id),
    "quickBtn",
  );
  assert.equal(await page.evaluate(() => window.__docKeys.size), baseline);
  for (const route of [
    "bugun",
    "konular/9/edebiyat/u1/k1",
    "araclar",
    "denemeler",
    "kartlar",
    "yazili/9/matematik",
    "program/benim",
  ]) {
    await page.evaluate((r) => App.router.go(r), route);
    await page.waitForTimeout(220);
    assert.ok((await page.locator("#view").innerText()).trim());
  }
  for (const theme of ["dark", "light"]) {
    await page.evaluate((t) => App.theme.set(t), theme);
    for (const width of [320, 768, 1440]) {
      await page.setViewportSize({ width, height: 900 });
      await page.waitForTimeout(180);
      assert.equal(
        await page.evaluate(
          () => document.documentElement.scrollWidth <= innerWidth + 1,
        ),
        true,
      );
    }
  }
  assert.deepEqual(warnings, [], "Application console warnings/errors");
  assert.deepEqual(errors, []);
  fs.writeFileSync(
    path.join(h.qa, "pre-release155.json"),
    JSON.stringify(
      {
        engine: h.engineName,
        firstRun: true,
        modalCycles: 12,
        storageReload: true,
        warnings,
        errors,
        scope:
          "Controlled local UI; no physical hardware or live AI quality claim",
      },
      null,
      2,
    ),
  );
  console.log(
    h.engineName +
      ": first-run/splash, tour persistence, theme/local storage, nested modals/keyboard/timer cleanup, route walkthrough and console checks passed.",
  );
} finally {
  await h.close();
}
