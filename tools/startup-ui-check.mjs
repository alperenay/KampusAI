import assert from "node:assert/strict";
import { uiHarness } from "./ui-harness.mjs";
const h = await uiHarness();
try {
  for (const mode of [
    "normal",
    "system-reduce",
    "saved-reduce",
    "keyboard",
    "tap",
    "during-reduce",
    "personal-off",
    "personal-gentle",
    "personal-intro-off",
  ]) {
    const c = await h.browser.newContext({
      serviceWorkers: "block",
      reducedMotion: mode === "system-reduce" ? "reduce" : "no-preference",
    });
    await c.route("**/*", (r) =>
      new URL(r.request().url()).hostname === "127.0.0.1"
        ? r.continue()
        : r.abort(),
    );
    await c.addInitScript((mode) => {
      localStorage.setItem("da:pref:tourDone", "true");
      if (mode === "saved-reduce")
        localStorage.setItem("da:pref:a11yMotion", "true");
      if (mode.startsWith("personal-"))
        localStorage.setItem("da:pref:appearanceOptions", JSON.stringify({
          motion: mode === "personal-off" ? "off" : mode === "personal-gentle" ? "gentle" : "full",
          intro: mode !== "personal-intro-off"
        }));
      window.__startupTrace = [];
      window.__startupMetrics = null;
      new MutationObserver((rows) => {
        for (const row of rows) {
          // Startup is inserted on the very first paint and upgraded in place.
          // Observe the class change, not just newly inserted brand elements.
          const candidate = row.type === "attributes" && row.target.id === "startupPreload"
            && row.target.classList.contains("startup-brand") ? [row.target] : row.addedNodes;
          for (const n of candidate)
            if (n.nodeType === 1 && n.classList.contains("startup-brand") && !window.__startupTrace.includes("added")) {
              window.__startupTrace.push("added");
              window.__startupMetrics = {
                duration: parseFloat(getComputedStyle(n).animationDuration),
                glow: getComputedStyle(n, "::before").animationName,
              };
              if (mode === "tap")
                n.dispatchEvent(new MouseEvent("click", { bubbles: true }));
              if (mode === "during-reduce")
                document.documentElement.setAttribute("data-a11y-motion", "");
              if (mode === "keyboard")
                dispatchEvent(new KeyboardEvent("keydown", { key: "Escape" }));
            }
          for (const n of row.removedNodes)
            if (n.nodeType === 1 && n.classList.contains("startup-brand"))
              window.__startupTrace.push("removed");
        }
      }).observe(document, { subtree: true, childList: true, attributes: true, attributeFilter: ["class"] });
    }, mode);
    const p = await c.newPage();
    const errors = [];
    p.on("pageerror", (e) => errors.push(e.message));
    await p.goto(h.baseUrl + "/#/");
    await p.waitForSelector("[data-ai-favs]");
    await p.waitForFunction(() => !App.startup.active);
    assert.equal(await p.locator(".startup-brand").count(), 0);
    const trace = await p.evaluate(() => window.__startupTrace);
    const metrics = await p.evaluate(() => window.__startupMetrics);
    if (metrics) {
      assert.ok(
        mode === "personal-gentle" ? metrics.duration === .4 : metrics.duration >= 1.2 && metrics.duration <= 1.8,
        "Bounded first-entrance CSS timing (not the shorter exit)",
      );
      assert.equal(metrics.glow, mode === "personal-gentle" ? "none" : "hud-glow");
    }
    assert.equal(
      await p.evaluate(() => {
        const e = new KeyboardEvent("keydown", {
          key: "Enter",
          cancelable: true,
        });
        dispatchEvent(e);
        return e.defaultPrevented;
      }),
      false,
      "Startup keyboard listeners must be removed",
    );
    assert.deepEqual(
      trace,
      ["system-reduce", "saved-reduce", "personal-off", "personal-intro-off"].includes(mode)
        ? []
        : ["added", "removed"],
    );
    await p.evaluate(() => App.router.go("araclar"));
    await p.waitForSelector("#hubQ");
    assert.deepEqual(
      await p.evaluate(() => window.__startupTrace),
      trace,
      "No replay on navigation",
    );
    assert.deepEqual(errors, []);
    await c.close();
  }
  console.log(
    h.engineName +
      ": startup renders/cleans, route changes do not replay, keyboard/tap skip, in-flight preference cleanup, bounded timing and system/saved reduced motion passed.",
  );
} finally {
  await h.close();
}
