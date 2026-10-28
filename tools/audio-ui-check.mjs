import assert from "node:assert/strict";
import { uiHarness } from "./ui-harness.mjs";
const h = await uiHarness();
try {
  const { page } = await h.device();
  await page.evaluate(() => {
    window.__mic = { opens: 0, stops: 0, resumes: 0, transcriptions: 0 };
    class Audio {
      constructor() {
        this.state = "suspended";
      }
      async resume() {
        this.state = "running";
        window.__mic.resumes++;
      }
      async close() {
        this.state = "closed";
      }
      createMediaStreamSource() {
        return { connect() {}, disconnect() {} };
      }
      createAnalyser() {
        return {
          fftSize: 512,
          getFloatTimeDomainData(a) {
            a.fill(0.12);
          },
          getByteTimeDomainData(a) {
            a.fill(145);
          },
        };
      }
    }
    Object.defineProperty(window, "AudioContext", {
      configurable: true,
      value: Audio,
    });
    Object.defineProperty(navigator, "mediaDevices", {
      configurable: true,
      value: {
        getUserMedia: async () => {
          window.__mic.opens++;
          if (window.__mic.error)
            throw Object.assign(new Error(), { name: window.__mic.error });
          return {
            getTracks: () => [{ stop: () => window.__mic.stops++ }],
            getAudioTracks: () => [{ readyState: "live" }],
          };
        },
      },
    });
    App.modules.aiSettings.open();
  });
  await page.click("#aisMicTest");
  await page.click("#mtStart");
  await page.waitForFunction(
    () => document.querySelector("#mtLevel").value > 0,
  );
  assert.match(await page.locator("#mtStatus").innerText(), /Mikrofon açık/);
  assert.equal(await page.evaluate(() => window.__mic.opens), 1);
  assert.equal(await page.evaluate(() => window.__mic.resumes), 1);
  await page.click("#mtStop");
  assert.equal(await page.evaluate(() => window.__mic.stops), 1);
  await page.locator(".microphone-test [data-close]").click();
  for (const [error, text] of [
    ["NotReadableError", /başka bir uygulama/],
    ["NotAllowedError", /erişimi engellendi/],
    ["NotFoundError", /ses girişi bulamadı/],
  ]) {
    await page.evaluate((error) => {
      window.__mic.error = error;
      App.media.openTest();
    }, error);
    await page.click("#mtStart");
    await page.waitForFunction(
      () =>
        !document.querySelector("#mtStatus").textContent.includes("açılıyor"),
    );
    assert.match(await page.locator("#mtStatus").innerText(), text);
    await page.locator(".microphone-test [data-close]").click();
  }
  // A controlled recorder/provider fixture validates the existing voice UI without sending audio.
  await page.evaluate(() => {
    delete window.__mic.error;
    Object.defineProperty(window, "SpeechRecognition", {
      configurable: true,
      value: undefined,
    });
    Object.defineProperty(window, "webkitSpeechRecognition", {
      configurable: true,
      value: undefined,
    });
    class Recorder {
      static isTypeSupported() {
        return true;
      }
      constructor() {
        this.state = "inactive";
        this.mimeType = "audio/webm";
      }
      start() {
        this.state = "recording";
      }
      stop() {
        this.state = "inactive";
        queueMicrotask(() => {
          this.ondataavailable?.({
            data: new Blob(["x".repeat(3000)], { type: "audio/webm" }),
          });
          this.onstop?.();
        });
      }
    }
    Object.defineProperty(window, "MediaRecorder", {
      configurable: true,
      value: Recorder,
    });
    App.engine.cloud = () => ({ configured: () => true, toContents: () => {} });
    App.ai.transcribe = async () => {
      window.__mic.transcriptions++;
      return "Bir kuvvet sorum var";
    };
    App.prefs.set("voiceHolo", false);
    document
      .querySelectorAll(".modal-backdrop [data-close]")
      .forEach((b) => b.click());
  });
  await page.addScriptTag({ url: h.baseUrl + "/js/core/speech.js" });
  await page.evaluate(() => App.voice.open());
  await page.waitForSelector("#vMicTest");
  await page.click("#vMicTest");
  await page.click("#mtStart");
  await page.waitForFunction(
    () => document.querySelector("#mtLevel").value > 0,
  );
  assert.equal(
    await page
      .locator(".microphone-test")
      .evaluate((e) => getComputedStyle(e).zIndex),
    "1000",
  );
  await page.locator(".microphone-test [data-close]").click();
  await page.evaluate(() => App.voice.close());
  assert.equal(
    await page.evaluate(() => window.__mic.transcriptions),
    0,
    "closing/pause must not send audio to AI",
  );
  await page.evaluate(() => {
    App.ai.run = () =>
      new Promise((resolve) => (window.__voiceResolve = resolve));
    App.voice.open();
  });
  await page.waitForSelector("#vMain");
  await page.waitForTimeout(50);
  await page.click("#vMain");
  await page.waitForFunction(() => window.__voiceResolve);
  await page.evaluate(async () => {
    await App.voice.close();
    App.voice.open();
    window.__voiceResolve({
      text: "Eski oturumun cevabı",
      engine: "fixture",
      models: [],
    });
  });
  await page.waitForTimeout(80);
  assert.equal(
    await page.evaluate(() => App.voice._state().phase),
    "listening",
  );
  assert.equal(await page.locator("#vAnswer").innerText(), "");
  await page.evaluate(() => App.voice.close());
  // Corrupt local rows and late DB reads must not crash or change the current route.
  await page.evaluate(async () => {
    await App.db.put("meta", {
      id: "ph:log",
      items: [null, { ph: "bad", hex: "red" }],
    });
    await App.db.put("meta", {
      id: "vb:data",
      items: [null, { k: "n", v: NaN }],
    });
    App.prefs.set("ph:white", { bad: true });
  });
  const go = async (r) => {
    await page.evaluate((r) => App.router.go(r), r);
    await page.waitForTimeout(100);
  };
  for (const r of [
    "ph",
    "vatandas",
    "vatandas/harita",
    "vatandas/paylas",
    "meslek",
  ]) {
    await go(r);
    assert.equal(await page.locator("#view h1").count(), 1);
    assert.doesNotMatch(
      await page.locator("#view").innerText(),
      /TypeError|NaN/,
    );
  }
  await page.evaluate(() => {
    window.__oldGet = App.db.get;
    window.__hold = false;
    App.db.get = async function (store, id) {
      if (id === "vb:data") {
        window.__hold = true;
        await new Promise((r) => (window.__release = r));
      }
      return window.__oldGet.call(this, store, id);
    };
    App.router.go("vatandas/harita");
  });
  await page.waitForFunction(() => window.__hold);
  await go("bugun");
  await page.evaluate(() => window.__release());
  await page.waitForTimeout(70);
  assert.equal(await page.evaluate(() => App.router.current().path), "bugun");
  assert.equal(await page.locator("#vbMap").count(), 0);
  await page.evaluate(() => (App.db.get = window.__oldGet));
  // Overlapping pH permission grants: the older reply cannot stop the latest camera.
  await go("ph");
  await page.evaluate(() => {
    window.__camera = { requests: [], stops: [] };
    Object.defineProperty(navigator, "mediaDevices", {
      configurable: true,
      value: {
        getUserMedia: () =>
          new Promise((resolve) => window.__camera.requests.push(resolve)),
      },
    });
    Object.defineProperty(HTMLMediaElement.prototype, "srcObject", {
      configurable: true,
      get() {
        return this.__mockStream || null;
      },
      set(value) {
        this.__mockStream = value;
      },
    });
    HTMLMediaElement.prototype.play = async () => {};
  });
  await page.click("#phGo");
  await page.click("#phGo");
  await page.evaluate(() => {
    const make = (id) => ({
      getTracks: () => [{ stop: () => window.__camera.stops.push(id) }],
      getVideoTracks: () => [{ getCapabilities: () => ({}) }],
    });
    window.__camera.requests[0](make("old"));
    window.__camera.requests[1](make("new"));
  });
  await page.waitForTimeout(70);
  assert.deepEqual(await page.evaluate(() => window.__camera.stops), ["old"]);
  await go("bugun");
  assert.deepEqual(await page.evaluate(() => window.__camera.stops), [
    "old",
    "new",
  ]);
  const tex = await page.evaluate(() =>
    App.a11y.texToSpeech("\\sqrt[broken", "tr"),
  );
  assert.ok(tex.includes("broken"));

  for (const width of [320, 768, 1440]) {
    await page.setViewportSize({ width, height: 850 });
    await page.evaluate(() => App.media.openTest());
    assert.equal(
      await page.evaluate(
        () => document.documentElement.scrollWidth > innerWidth + 2,
      ),
      false,
    );
    await page.locator(".microphone-test [data-close]").click();
  }
  const invalidPackets = await page.evaluate(() => {
    const bad = [
      { v: 1, t: "vb", id: "test", s: "a", m: [[0, 700, 0, null, 1]] },
      { v: 1, t: "vb", id: "test", s: "a", m: [[0, 700, 0, 0, 1e30]] },
      { v: 1, t: "vb", id: "test", s: "a", m: [[1, 1000, 0, 0, 1]] },
    ];
    return bad.map((p) => {
      try {
        App.sinifModu.validate(p);
        return false;
      } catch (e) {
        return true;
      }
    });
  });
  assert.deepEqual(invalidPackets, [true, true, true]);
  assert.ok(
    (await page.evaluate(() => App.vatandas.csvCell("=1+2"))).startsWith("\"'"),
  );
  assert.deepEqual(h.errors, []);
  console.log(
    h.engineName +
      ": microphone errors/test, suspended context, voice cancel/ownership, corrupt 1.49 records, late renders and camera overlap passed (controlled fixtures).",
  );
} finally {
  await h.close();
}
