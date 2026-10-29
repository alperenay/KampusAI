// Natural voice pipeline: provider choice, cloud queue playback, device fallback, streaming sentences.
// Deterministic fixtures only; no real provider voice quality or latency is claimed.
import assert from "node:assert/strict";
import vm from "node:vm";
import fs from "node:fs";

function device(prefs = {}, fetchImpl) {
  const spoken = [], requests = [];
  const node = () => ({ connect() {}, disconnect() {} });
  class FakeAudioContext {
    constructor() { this.state = "running"; this.currentTime = 0; this.destination = {}; }
    createGain() { return node(); }
    createAnalyser() { return Object.assign(node(), { fftSize: 256, getByteTimeDomainData(b) { b.fill(170); } }); }
    resume() { this.state = "running"; return Promise.resolve(); }
    suspend() { this.state = "suspended"; return Promise.resolve(); }
    close() { return Promise.resolve(); }
    createBuffer(ch, n, rate) { const data = new Float32Array(n); return { duration: n / rate, getChannelData: () => data }; }
    decodeAudioData(buf, ok) { setTimeout(() => ok({ duration: 0.02, bytes: buf.byteLength }), 0); }
    createBufferSource() {
      const s = node();
      s.start = () => { s.timer = setTimeout(() => s.onended && s.onended(), 3); };
      s.stop = () => clearTimeout(s.timer);
      return s;
    }
  }
  let currentUtterance = null;
  const synth = {
    getVoices: () => [{ name: "Microsoft Tolga", lang: "tr-TR", localService: true }],
    speak(u) { currentUtterance = u; spoken.push(u.text); setTimeout(() => { if (currentUtterance !== u) return; u.onstart && u.onstart(); u.onend && u.onend(); }, 1); },
    cancel() { const u = currentUtterance; currentUtterance = null; if (u && u.onerror) u.onerror({ error: "interrupted" }); }
  };
  const store = Object.assign({}, prefs);
  const ctx = vm.createContext({
    console, setTimeout, clearTimeout, performance, atob, Uint8Array, Float32Array, DataView, Promise, Error, Map, Math, Number, String, JSON,
    navigator: { userAgent: "test" },
    document: { addEventListener() {}, removeEventListener() {} },
    addEventListener() {},
    AudioContext: FakeAudioContext,
    speechSynthesis: synth,
    SpeechSynthesisUtterance: class { constructor(text) { this.text = text; } },
    AbortController,
    fetch: (url, init) => { requests.push({ url, body: init && init.body ? JSON.parse(init.body) : null }); return fetchImpl(url, init); },
    App: {
      i18n: { lang: "tr" },
      prefs: { get: (k, d) => (k in store ? store[k] : d), set: (k, v) => { store[k] = v; } },
      cloud: {
        openai: { key: () => store.oaKey || "", base: () => store.oaBase || "https://openrouter.ai/api/v1", headers: () => ({}) },
        gemini: { key: () => store.gemKey || "", base: () => "https://g.test/v1beta", headers: () => ({}) }
      }
    }
  });
  ctx.window = ctx;
  for (const f of ["js/core/speech.js", "js/ai/tts.js"]) vm.runInContext(fs.readFileSync(f, "utf8"), ctx);
  return { App: ctx.App, spoken, requests, store };
}
const audioOk = () => Promise.resolve({ ok: true, status: 200, arrayBuffer: async () => new Uint8Array([1, 2, 3]).buffer });
const run = (fn) => new Promise((resolve, reject) => { fn(resolve, reject); setTimeout(() => reject(new Error("timeout")), 3000); });

// 1. Provider choice: none without keys, ElevenLabs before OpenAI/Gemini, "device" turns cloud off.
{
  const d = device();
  assert.equal(d.App.tts.provider(), null);
  assert.equal(device({ gemKey: "g" }).App.tts.provider(), "gemini");
  assert.equal(device({ gemKey: "g", elKey: "e" }).App.tts.provider(), "eleven");
  assert.equal(device({ gemKey: "g", elKey: "e", ttsEngine: "device" }).App.tts.provider(), null);
  assert.equal(device({ oaKey: "k", oaBase: "https://openrouter.ai/api/v1" }).App.tts.provider(), null, "OpenRouter has no speech endpoint");
  assert.equal(device({ oaKey: "k", oaBase: "https://api.openai.com/v1" }).App.tts.provider(), "openai");
}

// 2. natural:true with a key plays every sentence through the cloud, in order, with one onStart and onEnd("done").
{
  const d = device({ elKey: "e" }, audioOk);
  let starts = 0;
  const reason = await run((ok) => d.App.speech.say("Birinci cümle. İkinci cümle! Üçüncü cümle?", {
    lang: "tr", natural: true, onStart: () => starts++, onEnd: ok, onError: (c) => ok("error:" + c) }));
  assert.equal(reason, "done");
  assert.equal(starts, 1);
  assert.equal(d.spoken.length, 0, "Device voice stays silent when the cloud voice works");
  // First chunk ends after the first sentence (merged with the next when tiny) so audio starts quickly.
  assert.deepEqual(d.requests.map((r) => r.body.text), ["Birinci cümle. İkinci cümle!", "Üçüncü cümle?"]);
  assert.match(d.requests[0].url, /api\.elevenlabs\.io\/v1\/text-to-speech\//);
  assert.equal(d.requests[1].body.previous_text, "Birinci cümle. İkinci cümle!");
  assert.equal(d.requests[0].body.language_code, "tr");
}

// 3. Without natural:true (short UI phrases, sonification) the device voice is used even with a key.
{
  const d = device({ elKey: "e" }, audioOk);
  const reason = await run((ok) => d.App.speech.say("x 3, y 4", { lang: "tr", onEnd: ok }));
  assert.equal(reason, "done");
  assert.equal(d.requests.length, 0);
  assert.deepEqual(d.spoken, ["x 3, y 4"]);
}

// 4. A failing service hands the rest to the device voice and is not retried for a while.
{
  let calls = 0;
  const d = device({ elKey: "e" }, () => { calls++; return Promise.resolve({ ok: false, status: 429, text: async () => "quota" }); });
  const reason = await run((ok) => d.App.speech.say("Bir. İki.", { lang: "tr", natural: true, onEnd: ok }));
  assert.equal(reason, "done");
  assert.deepEqual(d.spoken, ["Bir. İki."]);
  assert.equal(d.App.tts.provider(), null, "Cooling service is skipped");
  await run((ok) => d.App.speech.say("Üç.", { lang: "tr", natural: true, onEnd: ok }));
  assert.ok(calls <= 2, "No new cloud requests while cooling");
}

// 5. stopSaying ends a cloud session with "stop" and plays nothing more.
{
  const d = device({ elKey: "e" }, audioOk);
  const reason = await run((ok) => {
    d.App.speech.say("Uzun bir anlatım. İkinci kısım. Üçüncü kısım.", { lang: "tr", natural: true, onEnd: ok, onStart: () => d.App.speech.stopSaying() });
  });
  assert.equal(reason, "stop");
  assert.equal(d.App.speech.speaking(), false);
  assert.equal(d.App.tts.active(), false);
}

// 6. Gemini: Interactions API first; on 404 the generateContent AUDIO path is used and remembered.
{
  const pcm = Buffer.from(new Int16Array([0, 1000, -1000, 0]).buffer).toString("base64");
  const d = device({ gemKey: "g" }, (url) => {
    if (/interactions/.test(url)) return Promise.resolve({ ok: false, status: 404, text: async () => "not found" });
    return Promise.resolve({ ok: true, status: 200, json: async () => ({ candidates: [{ content: { parts: [{ inlineData: { mimeType: "audio/L16;codec=pcm;rate=24000", data: pcm } }] } }] }) });
  });
  const reason = await run((ok) => d.App.speech.say("Merhaba. Nasılsın?", { lang: "tr", natural: true, onEnd: ok }));
  assert.equal(reason, "done");
  const urls = d.requests.map((r) => r.url.replace("https://g.test/v1beta", ""));
  assert.equal(urls[0], "/interactions");
  assert.match(urls[1], /:generateContent$/);
  assert.equal(urls.filter((u) => u === "/interactions").length, 1, "Working path is remembered");
  assert.equal(d.requests[0].body.generation_config.speech_config[0].voice, "Aoede");
  assert.deepEqual(d.requests[1].body.generationConfig.responseModalities, ["AUDIO"]);
}
{
  // Interactions response: last audio content in steps is decoded.
  const d = device({ gemKey: "g" }, () => Promise.resolve({ ok: true, status: 200, json: async () => ({ steps: [{ type: "model_output", content: [{ type: "audio", mime_type: "audio/wav", data: "UklGRg==" }] }] }) }));
  const reason = await run((ok) => d.App.speech.say("Tek cümle.", { lang: "tr", natural: true, voice: 1, onEnd: ok }));
  assert.equal(reason, "done");
  assert.equal(d.requests.length, 1);
  assert.equal(d.requests[0].body.generation_config.speech_config[0].voice, "Charon", "Second podcast speaker gets the second voice");
}

// 7. stream(): speaks completed sentences while text arrives; never splits inside **bold**, $math$ or after "3.".
{
  const d = device();
  const md = "Kuvvet **F = m çarpı a. Bu** formüldür. Değer 3.5 newton olur. Son cümle burada";
  const s = d.App.speech.stream({ lang: "tr", transform: (x) => x.replace(/\*\*/g, "") });
  const done = run((ok) => { s.push(md.slice(0, 20)); assert.equal(s.started, false, "No complete sentence yet"); for (let i = 21; i <= md.length; i += 7) s.push(md.slice(0, i)); s.end(md); setTimeout(() => {}, 0); const t = setInterval(() => { if (!d.App.speech.speaking()) { clearInterval(t); ok(); } }, 5); });
  await done;
  assert.deepEqual(d.spoken, ["Kuvvet F = m çarpı a. Bu formüldür.", "Değer 3.5 newton olur.", "Son cümle burada"]);
}
{
  // end() without any sentence still reports done; stop() halts further pushes.
  const d = device();
  const reason = await run((ok) => { const s = d.App.speech.stream({ lang: "tr", onEnd: ok }); s.end(""); });
  assert.equal(reason, "done");
  const s = d.App.speech.stream({ lang: "tr" });
  s.push("Birinci cümle. ");
  s.stop();
  s.push("Birinci cümle. İkinci cümle. ");
  await new Promise((r) => setTimeout(r, 30));
  assert.ok(d.spoken.length <= 1 && !d.spoken.includes("İkinci cümle."));
}

// 8. level(): 0 when silent, real output level while the cloud voice plays.
{
  const d = device({ elKey: "e" }, audioOk);
  assert.equal(d.App.speech.level(), 0);
  let seen = 0;
  await run((ok) => d.App.speech.say("Ses seviyesi.", { lang: "tr", natural: true, onStart: () => { seen = d.App.speech.level(); }, onEnd: ok }));
  assert.ok(seen > 0.1 && seen <= 1);
}

console.log("TTS: provider choice, ordered cloud playback, device fallback and cooling, stop, Gemini paths, streaming sentences and level passed.");
