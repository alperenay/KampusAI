// v1.56 voice teacher: sentence streaming starts speech before the AI answer completes, the reactive orb draws in
// every phase, stop interrupts both, the realistic-voice setting saves, and touch glow is transform-only.
// Speech recognition, the AI answer and the device voice are controlled fixtures (no real model or audio quality claim).
import assert from "node:assert/strict";
import { uiHarness } from "./ui-harness.mjs";
const h = await uiHarness();
try {
  // The fixture voice replaces speechSynthesis before the app loads: macOS WebKit ignores patched methods on its real
  // synthesizer, and some engines (Playwright WebKit on Windows/Linux) have none at all.
  const context = await h.browser.newContext({ serviceWorkers: "block" });
  await context.route("**/*", (r) => (new URL(r.request().url()).hostname === "127.0.0.1" ? r.continue() : r.abort()));
  await context.addInitScript(() => {
    localStorage.setItem("da:pref:tourDone", "true");
    const t = (window.__t = { spoken: [], answerDone: 0, runs: 0, cur: null });
    const voice = {
      getVoices: () => [],
      speak(u) {
        t.spoken.push({ text: u.text, at: performance.now() });
        t.cur = u;
        setTimeout(() => { if (t.cur !== u) return; u.onstart && u.onstart(); setTimeout(() => { if (t.cur === u) u.onend && u.onend(); }, 180); }, 10);
      },
      cancel() { const u = t.cur; t.cur = null; if (u && u.onerror) u.onerror({ error: "interrupted" }); },
      addEventListener() {},
      removeEventListener() {}
    };
    voice.speak.__fixture = true;
    const define = (obj, name, value) => { try { Object.defineProperty(obj, name, { value, configurable: true, writable: true }); } catch (e) { /* not replaceable here */ } };
    define(window, "speechSynthesis", voice);
    define(window, "SpeechSynthesisUtterance", class { constructor(text) { this.text = text; } });
    // Fallback where the window attribute cannot be replaced: override the methods on the real object and its prototype.
    const real = window.speechSynthesis;
    if (real && real !== voice) for (const k of ["speak", "cancel", "getVoices"]) { define(Object.getPrototypeOf(real), k, voice[k]); define(real, k, voice[k]); }
  });
  const page = await context.newPage();
  page.on("pageerror", (e) => h.errors.push({ message: e.message, url: page.url() }));
  await page.goto(h.baseUrl + "/#/");
  await page.waitForFunction(() => window.App && App.voice && App.startup && !App.startup.active);
  assert.equal(await page.evaluate(() => speechSynthesis.speak.__fixture === true), true, "Fixture voice is installed");
  await page.evaluate(() => {
    App.speech.sttMode = () => "web";
    App.speech.listen = (o) => {
      setTimeout(() => { o.onState && o.onState("listening"); o.onLevel && o.onLevel(0.7); o.onFinal && o.onFinal("Kuvvet nedir?", "Kuvvet nedir?"); }, 30);
      return { stop: async () => ({ text: "Kuvvet nedir?" }), cancel() {} };
    };
    App.ai.run = async ({ on, signal }) => {
      window.__t.runs++;
      const parts = ["Kuvvet bir itme ya da çekmedir. ", "Birimi **newton** olarak bilinir. ", "Sence sürtünme bir kuvvet midir?"];
      let full = "";
      for (const p of parts) {
        await new Promise((r) => setTimeout(r, 260));
        if (signal && signal.aborted) throw Object.assign(new Error("aborted"), { code: "aborted" });
        full += p;
        on.delta(full);
      }
      window.__t.answerDone = performance.now();
      return { text: full, models: ["fixture"], engine: "fixture" };
    };
  });
  await page.evaluate(() => App.voice.open());
  await page.waitForSelector(".voice-orb__fx");
  // Listening: orb canvas draws the liquid wave
  const drawn = (phase) => page.waitForFunction((phase) => {
    const c = document.querySelector(".voice-orb__fx");
    if (!c || !App.voice._state() || App.voice._state().phase !== phase || !c.width) return false;
    const d = c.getContext("2d").getImageData(0, 0, c.width, c.height).data;
    let lit = 0;
    for (let i = 3; i < d.length; i += 16) if (d[i] > 20) lit++;
    return lit > 50;
  }, phase, { timeout: 8000 });
  await drawn("listening");
  await page.click("#vMain");                       // Gönder
  await drawn("thinking");
  await page.waitForFunction(() => App.voice._state().phase === "speaking", null, { timeout: 8000 });
  await drawn("speaking");
  await page.waitForFunction(() => window.__t.answerDone > 0);
  const t = await page.evaluate(() => window.__t);
  assert.ok(t.spoken.length >= 1 && t.spoken[0].at < t.answerDone, "First sentence is spoken before the whole answer arrives");
  assert.equal(t.spoken[0].text, "Kuvvet bir itme ya da çekmedir.");
  await page.waitForFunction(() => App.voice._state().phase === "listening", null, { timeout: 10000 });
  const all = await page.evaluate(() => window.__t.spoken.map((x) => x.text).join(" "));
  assert.match(all, /Birimi newton olarak bilinir\. Sence sürtünme bir kuvvet midir\?$|Birimi newton olarak bilinir\.\s.*midir\?/);
  assert.ok(!/\*\*/.test(all), "Markdown is not read aloud");

  // Stop while the answer is still streaming: speech and the AI request both end.
  await page.click("#vMain");
  await page.waitForFunction(() => App.voice._state().phase === "speaking", null, { timeout: 8000 });
  const before = await page.evaluate(() => window.__t.spoken.length);
  await page.click("#vMain");                       // Sustur
  await page.waitForTimeout(900);
  const after = await page.evaluate(() => ({ n: window.__t.spoken.length, phase: App.voice._state().phase, speaking: App.speech.speaking() }));
  assert.equal(after.phase, "listening");
  assert.equal(after.speaking, false);
  assert.ok(after.n - before <= 1, "Nothing more is spoken after stop");
  await page.evaluate(() => App.voice.close());
  await page.waitForFunction(() => !document.querySelector(".voice-overlay"));

  // Realistic voice setting: visible status, saved engine choice; key field only where it applies.
  await page.evaluate(() => App.a11y && App.a11y.open ? App.a11y.open() : document.getElementById("a11yBtn").click());
  await page.waitForSelector("#a11yTtsEngine");
  assert.equal(await page.locator("#a11yTtsEngine").inputValue(), "auto");
  assert.match(await page.locator("#a11yNaturalNote").textContent(), /anahtar|key/i);
  await page.selectOption("#a11yTtsEngine", "device");
  assert.equal(await page.evaluate(() => App.prefs.get("ttsEngine")), "device");
  assert.equal(await page.locator(".a11y-elkey").isHidden(), true);
  await page.selectOption("#a11yTtsEngine", "eleven");
  assert.equal(await page.locator(".a11y-elkey").isVisible(), true);
  await page.fill("#a11yElKey", "test-key");
  await page.locator("#a11yElKey").dispatchEvent("change");
  // Without Web Audio (some test engines) cloud audio cannot play, so the device voice stays in charge.
  assert.equal(await page.evaluate(() => App.tts.provider()), await page.evaluate(() => (window.AudioContext || window.webkitAudioContext ? "eleven" : null)));
  await page.evaluate(() => { App.prefs.set("ttsEngine", "auto"); App.prefs.remove("elKey"); });
  await page.keyboard.press("Escape");

  // Touch glow: one reused fixed element, animated with transform/opacity only.
  await page.evaluate(() => {
    const b = document.querySelector(".btn, .icon-btn");
    b.dispatchEvent(new PointerEvent("pointerdown", { bubbles: true, clientX: 40, clientY: 40, pointerType: "mouse", button: 0 }));
    b.dispatchEvent(new PointerEvent("pointerdown", { bubbles: true, clientX: 60, clientY: 60, pointerType: "mouse", button: 0 }));
  });
  const glow = await page.evaluate(() => {
    const g = document.querySelectorAll(".fx-glow");
    const kf = g[0].getAnimations()[0].effect.getKeyframes();
    return { count: g.length, props: Object.keys(kf[0]).filter((k) => !["offset", "easing", "composite", "computedOffset"].includes(k)).sort() };
  });
  assert.equal(glow.count, 1);
  assert.deepEqual(glow.props, ["opacity", "transform"]);
  assert.deepEqual(h.errors, []);
  console.log(h.engineName + ": streamed first sentence before answer end, orb drawn in listening/thinking/speaking, stop ends speech and request, realistic-voice setting and transform-only touch glow passed.");
} finally {
  await h.close();
}
