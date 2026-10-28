import vm from "node:vm";
import fs from "node:fs";
import assert from "node:assert/strict";
const tick = () => new Promise((r) => setTimeout(r, 5));
function setup({
  native = false,
  web = false,
  cloud = true,
  record = true,
  getMedia,
} = {}) {
  const state = {
    captures: 0,
    stops: 0,
    transcriptions: 0,
    recognizers: [],
    nativeIds: [],
  };
  const stream = () => ({
    getTracks: () => [{ stop: () => state.stops++ }],
    getAudioTracks: () => [{ readyState: "live" }],
  });
  const navigator = {
    userAgent: "test",
    mediaDevices: {
      getUserMedia: async (c) => {
        state.captures++;
        return getMedia ? getMedia(c, state) : stream();
      },
    },
  };
  class Recorder {
    static isTypeSupported() {
      return true;
    }
    constructor(s, opts) {
      this.state = "inactive";
      this.mimeType = opts?.mimeType || "audio/webm";
    }
    start() {
      this.state = "recording";
    }
    stop() {
      this.state = "inactive";
      queueMicrotask(() => {
        this.ondataavailable?.({
          data: new Blob(["a".repeat(3000)], { type: this.mimeType }),
        });
        this.onstop?.();
      });
    }
  }
  class Recognition {
    constructor() {
      state.recognizers.push(this);
    }
    start() {
      this.onstart?.();
    }
    stop() {
      this.onend?.();
    }
    abort() {}
  }
  const window = {
    isSecureContext: true,
    ...(record ? { MediaRecorder: Recorder } : {}),
    ...(web ? { SpeechRecognition: Recognition } : {}),
    ...(native
      ? {
          KampusNative: {
            speechAvailable: () => true,
            speechStart: () => {},
            speechStartSession: (lang, id) => state.nativeIds.push(id),
            speechStop: () => {},
            speechCancel: () => {},
          },
        }
      : {}),
  };
  const App = {
    i18n: { lang: "tr" },
    platform: { native },
    engine: {
      cloud: () =>
        cloud ? { configured: () => true, toContents: () => {} } : null,
    },
    ai: {
      transcribe: async () => {
        state.transcriptions++;
        return "kaydedilen konuşma";
      },
    },
  };
  const c = vm.createContext({
    App,
    window,
    navigator,
    MediaRecorder: Recorder,
    Date,
    Math,
    Set,
    Map,
    Promise,
    Blob,
    AbortController,
    queueMicrotask,
    setTimeout,
    clearTimeout,
    requestAnimationFrame: () => 0,
    cancelAnimationFrame: () => {},
  });
  vm.runInContext(fs.readFileSync("js/core/media.js", "utf8"), c);
  vm.runInContext(fs.readFileSync("js/core/speech.js", "utf8"), c);
  return { App, window, state, stream };
}
{
  const { App, state } = setup({
    getMedia: async (c, s) => {
      if (s.captures === 1)
        throw Object.assign(new Error(), { name: "OverconstrainedError" });
      return { getTracks: () => [] };
    },
  });
  await App.media.microphone({ sampleRate: { exact: 96000 } });
  assert.equal(state.captures, 2);
}
for (const [name, code] of [
  ["NotAllowedError", "permission"],
  ["NotFoundError", "nomic"],
  ["NotReadableError", "busy"],
  ["NotSupportedError", "constraints"],
]) {
  const { App, state } = setup({
    getMedia: async () => {
      throw Object.assign(new Error(), { name });
    },
  });
  await assert.rejects(App.media.microphone(true), (e) => e.code === code);
  assert.equal(state.captures, 1);
  assert.equal(App.media.codeOf({ code }), code);
}
{
  let grant;
  const { App, state } = setup({
      getMedia: () => new Promise((r) => (grant = r)),
    }),
    ctrl = new AbortController();
  const request = App.media.microphone(true, ctrl.signal);
  ctrl.abort();
  await assert.rejects(request, (e) => e.code === "aborted");
  grant({ getTracks: () => [{ stop: () => state.stops++ }] });
  await tick();
  assert.equal(state.stops, 1);
}
{
  const { App, state } = setup();
  let error;
  const rec = App.speech.listen({ onError: (c) => (error = c) });
  await tick();
  assert.equal(rec.mode, "record");
  assert.equal(state.captures, 1);
  const result = await rec.stop();
  assert.equal(result.text, "kaydedilen konuşma");
  assert.equal(state.transcriptions, 1);
  assert.equal(error, undefined);
}
{
  let grant;
  const { App, state } = setup({
      getMedia: () => new Promise((r) => (grant = r)),
    }),
    rec = App.speech.listen({});
  await tick();
  await rec.stop();
  grant({ getTracks: () => [{ stop: () => state.stops++ }] });
  await tick();
  assert.equal(state.stops, 1);
  assert.equal(state.transcriptions, 0);
}
{
  const { App, state } = setup({ web: true });
  const rec = App.speech.listen({ onLevel: () => {} });
  assert.equal(
    state.captures,
    0,
    "Web Speech must not open a second microphone for its meter",
  );
  state.recognizers[0].onerror({ error: "network" });
  await tick();
  assert.equal(rec.mode, "record");
  assert.equal(state.captures, 1);
  await rec.stop();
  assert.equal(state.transcriptions, 1);
}
{
  const { App, state } = setup({ web: true, cloud: false });
  let code;
  const rec = App.speech.listen({ onError: (c) => (code = c) });
  state.recognizers[0].onerror({ error: "network" });
  assert.equal(code, "network");
  await rec.stop();
  assert.equal(state.captures, 0);
}
{
  const { App, state, window } = setup({ native: true });
  const first = [],
    second = [];
  const a = App.speech.listen({ onFinal: (t) => first.push(t) }),
    b = App.speech.listen({ onFinal: (t) => second.push(t) });
  await a.stop();
  window.__nativeSpeech({
    kind: "stt",
    type: "final",
    text: "eski",
    sid: state.nativeIds[0],
  });
  window.__nativeSpeech({
    kind: "stt",
    type: "final",
    text: "yeni",
    sid: state.nativeIds[1],
  });
  assert.deepEqual(first, []);
  assert.deepEqual(second, ["yeni"]);
  b.cancel();
}
{
  const { App, window } = setup({ native: true });
  window.KampusNative.speechAvailable = () => false;
  assert.equal(App.speech.sttMode(), "record");
  window.KampusNative.speechAvailable = () => {
    throw new Error("service absent");
  };
  assert.equal(App.speech.sttMode(), "record");
}
const manifest = fs.readFileSync(".github/workflows/build.yml", "utf8");
for (const p of ["RECORD_AUDIO", "MODIFY_AUDIO_SETTINGS"])
  assert.ok(manifest.includes("android.permission." + p));
const native = fs.readFileSync("mobile/native/MainActivity.java", "utf8");
assert.match(native, /if \(lang == null\) return/);
assert.match(native, /event.put\("sid", sid\)/);
console.log(
  "Audio: Android permission pair, distinct errors, constraint fallback, pending-consent cancellation, one input, record/STT fallback, native ownership and session cancellation passed.",
);
