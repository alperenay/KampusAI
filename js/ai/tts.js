/* =========================================================
   tts.js — doğal (sinirsel) bulut sesi (v1.56)

   Cihazın sesi çoğu bilgisayarda robotik. Kullanıcının bir anahtarı varsa uzun
   anlatımlar insan sesine yakın bulut sesiyle okunur:
     eleven : ElevenLabs (Flash v2.5, en doğal; ayrı anahtar — Erişilebilirlik › Ses)
     openai : OpenAI gpt-4o-mini-tts (OpenAI anahtarı api.openai.com'a girilmişse)
     gemini : Gemini TTS (kendi Gemini anahtarı; AI Studio'dan ücretsiz alınır)
   Anahtar yoksa ya da servis hata verirse App.speech cihaz sesine döner.

   Gecikme: metin cümle parçalarına bölünür; ilk parça çalarken sonraki ikisi
   üretilir (ilk ses yalnız ilk cümleyi bekler). Parçalar tek bir AudioContext
   üzerinden arka arkaya çalınır; kullanılmayan bağlam 20 sn sonra askıya alınır,
   sayfa kapanırken kapatılır. AnalyserNode çıkış seviyesini (0..1) görsellere verir.

   Arayüz:
     App.tts.provider()          → "eleven" | "openai" | "gemini" | null (kullanılacak servis)
     App.tts.consume(Q, o, cb)   → Q: { segs:[{text,at}], finished, onAdd } kuyruğunu okur; o.onSegment(parça, saniye)
          o: { lang, nth, onStart, onWord(at), onEnd(reason) }; cb.fail(fromIndex, code)
     App.tts.stop() / App.tts.level() / App.tts.active()
   ========================================================= */
(function () {
  const str = (k) => String(App.prefs.get(k, "") || "").trim();
  const AC = window.AudioContext || window.webkitAudioContext;

  /* Konuşmacı başına ses: [0] ana anlatıcı, [1] podcast'teki ikinci kişi */
  const VOICES = {
    eleven: ["EXAVITQu4vr4xnSDxMaL", "JBFqnCBsd6RMkjVDRZzb"],   // Sarah, George (çok dilli hazır sesler)
    openai: ["nova", "onyx"],
    gemini: ["Aoede", "Charon"]
  };
  const STYLE = "calm, warm, natural conversational teacher; clear diction; relaxed pace with natural pauses";

  const openaiDirect = () => {
    const o = App.cloud && App.cloud.openai;
    return !!(o && o.key() && /^https:\/\/api\.openai\.com\//.test(o.base() + "/"));
  };
  const available = {
    eleven: () => !!str("elKey"),
    openai: openaiDirect,
    gemini: () => !!(App.cloud && App.cloud.gemini && App.cloud.gemini.key())
  };

  /* Bir servis hata verirse (kota, anahtar, ağ) 10 dk denenmez: her cümlede boşuna beklenmesin */
  const cooling = {};
  function provider() {
    const want = str("ttsEngine") || "auto";
    if (want === "device" || !AC || !window.fetch) return null;
    const usable = (p) => available[p] && available[p]() && !(cooling[p] > Date.now());
    if (want !== "auto") return usable(want) ? want : null;
    return ["eleven", "openai", "gemini"].find(usable) || null;
  }
  const configured = () => (str("ttsEngine") || "auto") !== "device" && ["eleven", "openai", "gemini"].some((p) => available[p]());

  /* ---------------- Ses çıkışı ---------------- */
  let ctx = null, out = null, analyser = null, idleTimer = 0, levelBuf = null;
  function audio() {
    if (!ctx) {
      ctx = new AC();
      out = ctx.createGain();
      analyser = ctx.createAnalyser();
      analyser.fftSize = 256;
      levelBuf = new Uint8Array(analyser.fftSize);
      out.connect(analyser);
      analyser.connect(ctx.destination);
    }
    clearTimeout(idleTimer);
    if (ctx.state === "suspended") ctx.resume().catch(() => {});
    return ctx;
  }
  function idleLater() {
    clearTimeout(idleTimer);
    idleTimer = setTimeout(() => { if (ctx && !run && ctx.state === "running") ctx.suspend().catch(() => {}); }, 20000);
  }
  // iOS/Safari sesi yalnızca dokunuşla açar: doğal ses kullanılacaksa ilk dokunuşta bağlamı hazırla
  document.addEventListener("pointerdown", function prime() {
    if (!configured()) return;
    document.removeEventListener("pointerdown", prime, true);
    try { audio(); idleLater(); } catch (e) { /* ses kapalı */ }
  }, true);
  window.addEventListener("pagehide", () => { stop(); if (ctx) { ctx.close().catch(() => {}); ctx = null; } });

  /** Çalan sesin anlık genliği 0..1 (görseller için) */
  function level() {
    if (!run || !analyser) return 0;
    analyser.getByteTimeDomainData(levelBuf);
    let sum = 0;
    for (let i = 0; i < levelBuf.length; i++) { const v = (levelBuf[i] - 128) / 128; sum += v * v; }
    return Math.min(1, Math.sqrt(sum / levelBuf.length) * 3.2);
  }

  /* ---------------- Ses verisini çözme ---------------- */
  function b64ToBytes(b64) {
    const bin = atob(b64), bytes = new Uint8Array(bin.length);
    for (let i = 0; i < bin.length; i++) bytes[i] = bin.charCodeAt(i);
    return bytes;
  }
  /** Başlıksız 16 bit PCM (little-endian, tek kanal) → AudioBuffer */
  function pcmBuffer(bytes, rate) {
    const n = bytes.length >> 1, buf = audio().createBuffer(1, Math.max(1, n), rate || 24000), ch = buf.getChannelData(0);
    const view = new DataView(bytes.buffer, bytes.byteOffset, n * 2);
    for (let i = 0; i < n; i++) ch[i] = view.getInt16(i * 2, true) / 32768;
    return buf;
  }
  function decode(bytes, mime) {
    const m = String(mime || "").toLowerCase();
    if (/l16|pcm/.test(m)) return Promise.resolve(pcmBuffer(bytes, Number((m.match(/rate=(\d+)/) || [])[1]) || 24000));
    const copy = bytes.buffer.slice(bytes.byteOffset, bytes.byteOffset + bytes.byteLength);
    return new Promise((res, rej) => audio().decodeAudioData(copy, res, rej));
  }

  function fail(code, status, msg) { return Object.assign(new Error(msg || code), { code, status }); }
  async function post(url, headers, body, signal) {
    let r;
    try { r = await fetch(url, { method: "POST", headers, body: JSON.stringify(body), signal }); }
    catch (e) { throw fail(e && e.name === "AbortError" ? "aborted" : "net"); }
    if (!r.ok) {
      const text = await r.text().catch(() => "");
      const code = r.status === 401 || r.status === 403 ? "auth" : r.status === 429 || r.status === 402 ? "quota" : r.status === 404 || r.status === 400 ? "model" : "http";
      throw fail(code, r.status, text.slice(0, 300));
    }
    return r;
  }

  /* ---------------- Servisler ---------------- */
  const SYNTH = {
    async eleven(text, o) {
      const id = str("elVoice") || VOICES.eleven[(o.nth || 0) % 2];
      const r = await post("https://api.elevenlabs.io/v1/text-to-speech/" + encodeURIComponent(id) + "?output_format=mp3_44100_128",
        { "Content-Type": "application/json", "xi-api-key": str("elKey"), Accept: "audio/mpeg" },
        { text, model_id: "eleven_flash_v2_5", language_code: o.lang, previous_text: o.prev || undefined, next_text: o.next || undefined,
          voice_settings: { stability: 0.45, similarity_boost: 0.8, style: 0.15, use_speaker_boost: true, speed: o.rate } }, o.signal);
      return decode(new Uint8Array(await r.arrayBuffer()), "audio/mpeg");
    },
    async openai(text, o) {
      const oa = App.cloud.openai;
      const r = await post(oa.base() + "/audio/speech", oa.headers(),
        { model: str("oaTtsModel") || "gpt-4o-mini-tts", voice: str("oaVoice") || VOICES.openai[(o.nth || 0) % 2], input: text, response_format: "mp3",
          speed: o.rate, instructions: "Language: " + (o.lang === "tr" ? "Turkish" : o.lang === "de" ? "German" : "English") + ". Voice: " + STYLE + "." }, o.signal);
      return decode(new Uint8Array(await r.arrayBuffer()), "audio/mpeg");
    },
    /* Gemini: önce güncel Interactions API, desteklenmezse generateContent (AUDIO) yolu; çalışan yol hatırlanır */
    async gemini(text, o) {
      const g = App.cloud.gemini, voice = str("gemVoice") || VOICES.gemini[(o.nth || 0) % 2];
      const ways = geminiWay ? [geminiWay] : ["interactions", "generate"];
      let last = null;
      for (const way of ways) {
        try {
          const audioOut = way === "interactions" ? await geminiInteractions(g, text, voice, o) : await geminiGenerate(g, text, voice, o);
          geminiWay = way;
          return audioOut;
        } catch (e) {
          last = e;
          if (e.code !== "model") throw e;
        }
      }
      throw last;
    }
  };
  let geminiWay = "";
  async function geminiInteractions(g, text, voice, o) {
    const r = await post(g.base() + "/interactions", g.headers(), {
      model: str("gemTtsModel") || "gemini-3.8-flash-tts",
      input: [{ type: "user_input", content: [{ type: "text", text, annotations: [{ type: "speech_metadata", style: STYLE }] }] }],
      response_format: { type: "audio" },
      generation_config: { speech_config: [{ voice }] }
    }, o.signal);
    const data = await r.json();
    const parts = [];
    (data.steps || []).forEach((st) => (st.content || []).forEach((c) => { if (c && c.type === "audio" && c.data) parts.push(c); }));
    const a = parts[parts.length - 1];
    if (!a) throw fail("model", 0, "no audio");
    return decode(b64ToBytes(a.data), a.mime_type || "audio/wav");
  }
  async function geminiGenerate(g, text, voice, o) {
    const model = str("gemTtsLegacy") || "gemini-2.5-flash-preview-tts";
    const r = await post(g.base() + "/models/" + encodeURIComponent(model) + ":generateContent", g.headers(), {
      contents: [{ role: "user", parts: [{ text: "Say in a " + STYLE + " voice: " + text }] }],
      generationConfig: { responseModalities: ["AUDIO"], speechConfig: { voiceConfig: { prebuiltVoiceConfig: { voiceName: voice } } } }
    }, o.signal);
    const data = await r.json();
    const part = (((data.candidates || [])[0] || {}).content || { parts: [] }).parts.find((p) => p.inlineData && p.inlineData.data);
    if (!part) throw fail("model", 0, "no audio");
    return decode(b64ToBytes(part.inlineData.data), part.inlineData.mimeType || "audio/L16;rate=24000");
  }

  /* ---------------- Kuyruğu çalma ---------------- */
  let run = null;   // { cancel() }
  function stop() { if (run) run.cancel(); run = null; }

  /** Q kuyruğundaki parçaları sırayla seslendirir. İlk parça hazır olunca onStart, bitince onEnd("done").
      Servis hatasında cb.fail(sıradaki parça, kod): App.speech kalan parçaları cihaz sesiyle okur. */
  function consume(Q, o, cb) {
    stop();
    const p = provider();
    if (!p) { cb.fail(0, "none"); return; }
    const ctl = new AbortController(), pending = new Map(), timers = [];
    let next = 0, playIdx = 0, source = null, cancelled = false, started = false;
    const me = {
      cancel() {
        if (cancelled) return;
        cancelled = true; ctl.abort(); Q.onAdd = null;
        timers.forEach(clearTimeout);
        if (source) { try { source.onended = null; source.stop(); } catch (e) { /* bitti */ } try { source.disconnect(); } catch (e) { /* bitti */ } }
        source = null; pending.clear();
        if (run === me) run = null;
        idleLater();
      }
    };
    run = me;
    const rate = Math.max(0.7, Math.min(1.2, Number(o.rate) || 1));
    const want = () => {
      while (next < Q.segs.length && next < playIdx + 3) {
        const i = next++, seg = Q.segs[i];
        const job = SYNTH[p](seg.say || seg.text, { lang: o.lang, nth: o.nth, rate, signal: ctl.signal,
          prev: i > 0 ? Q.segs[i - 1].text.slice(-300) : "", next: Q.segs[i + 1] ? Q.segs[i + 1].text.slice(0, 300) : "" });
        job.catch(() => {});   // hata sırası gelince ele alınır
        pending.set(i, job);
      }
    };
    async function pump() {
      if (cancelled || source) return;
      if (playIdx >= Q.segs.length) {
        if (Q.finished) { me.cancel(); o.onEnd && o.onEnd("done"); return; }
        Q.onAdd = () => { Q.onAdd = null; pump(); };
        return;
      }
      want();
      const i = playIdx;
      let buf;
      try { buf = await pending.get(i); }
      catch (e) {
        if (cancelled) return;
        const code = (e && e.code) || "tts";
        if (code !== "aborted") cooling[p] = Date.now() + 10 * 60000;
        me.cancel();
        cb.fail(i, code);
        return;
      }
      if (cancelled) return;
      pending.delete(i);
      playIdx = i + 1;
      const c = audio(), src = c.createBufferSource();
      src.buffer = buf;
      src.connect(out);
      source = src;
      const seg = Q.segs[i];
      if (!started) { started = true; o.onStart && o.onStart(); }
      if (o.onSegment) o.onSegment(seg, buf.duration);   // v1.64: senkron tahta okunan adımı yazar
      if (o.onWord) {
        // Bulut sesi kelime zamanı vermez: kelime başlangıçları süreye orantılı tahmin edilir
        const re = /\S+/g, len = Math.max(1, seg.text.length);
        let m;
        while ((m = re.exec(seg.text))) {
          const pos = m.index;
          timers.push(setTimeout(() => { if (!cancelled) o.onWord(seg.at + pos); }, (pos / len) * buf.duration * 1000));
        }
      }
      src.onended = () => {
        if (source !== src) return;
        source = null;
        try { src.disconnect(); } catch (e) { /* bitti */ }
        if (cancelled) return;
        const pause = /[.!?…]\s*$/.test(seg.text) ? 140 : 60;
        timers.push(setTimeout(pump, pause));
      };
      src.start();
      want();
    }
    pump();
    return me;
  }

  App.tts = { provider, configured, consume, stop, level, active: () => !!run, VOICES, _decode: decode, _pcm: pcmBuffer };
})();
