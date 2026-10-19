/* =========================================================
   speech.js — ses: konuşmayı yazıya çevirme (STT) ve sesli okuma (TTS)

   Konuşma → yazı, cihaza göre en iyi yol seçilir:
     native : Android uygulaması — telefonun kendi ses tanıma motoru
              (internet yoksa cihazdaki Türkçe dil paketiyle çalışır)
     web    : Chrome/Edge tarayıcısı — Web Speech API
     record : Windows uygulaması ve diğerleri — ses kaydedilir, bitince
              yapay zekâ (Gemini) yazıya çevirir (internet gerekir)

   Sesli okuma:
     native : Android TextToSpeech (WebView'de speechSynthesis yok)
     web    : speechSynthesis (tarayıcı ve Windows uygulaması)

   Arayüz:
     App.speech.sttMode()  → "native" | "web" | "record" | null
     App.speech.listen({ lang, onPartial(text), onFinal(text), onLevel(0..1), onState(s), onError(code) })
        → { stop(): Promise<{ text, durationMs }> }
     App.speech.say(text, { lang, rate, onEnd, onError }) / App.speech.stopSaying()
     App.speech.ttsAvailable()
   ========================================================= */
(function () {
  const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
  const N = () => window.KampusNative;
  const isElectron = /Electron/i.test(navigator.userAgent);
  const nativeHas = (fn) => { try { return !!(N() && typeof N()[fn] === "function"); } catch (e) { return false; } };

  /* ---------------- Yerel (Android) olaylar ---------------- */
  let sttSink = null;           // aktif dinleme oturumunun olay alıcısı
  const ttsWait = {};           // konuşma id → { onEnd, onError }
  window.__nativeSpeech = function (ev) {
    if (!ev) return;
    if (ev.kind === "tts") {
      const w = ttsWait[ev.id];
      if (!w) return;
      if (ev.type === "word") { if (w.onWord) w.onWord(Number(ev.start) || 0); return; }
      if (ev.type === "start") { if (w.onStart) w.onStart(); return; }
      if (ev.type === "done" || ev.type === "error" || ev.type === "stop") {
        delete ttsWait[ev.id];
        if (ev.type === "error" && w.onError) w.onError(ev.code || "tts");
        else if (w.onEnd) w.onEnd(ev.type);
      }
      return;
    }
    if (sttSink) sttSink(ev);
  };

  function sttMode() {
    if (nativeHas("speechStart") && N().speechAvailable && N().speechAvailable()) return "native";
    if (SR && !isElectron) return "web";
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia && window.MediaRecorder && canTranscribe()) return "record";
    return null;
  }

  /** Kayıt + yapay zekâyla yazıya çevirme yalnızca Gemini tabanlı servislerde mümkün */
  function canTranscribe() {
    try { const c = App.engine && App.engine.cloud(); return !!(c && c.configured() && typeof c.toContents === "function"); } catch (e) { return false; }
  }

  const langTag = (lang) => (lang || App.i18n.lang) === "tr" ? "tr-TR" : "en-US";

  /* ---------------- Dinleme ---------------- */
  function listen(o) {
    const mode = sttMode();
    if (!mode) { setTimeout(() => o.onError && o.onError("unsupported")); return { stop: async () => ({ text: "", durationMs: 0 }) }; }
    const started = Date.now();
    let finalText = "";
    let partial = "";
    let active = true;
    const emitFinal = (s) => {
      s = String(s || "").trim();
      if (!s) return;
      finalText = (finalText ? finalText + " " : "") + s;
      partial = "";
      if (o.onFinal) o.onFinal(s, finalText);
    };
    const state = (s) => { if (o.onState) o.onState(s); };

    /* --- Android --- */
    if (mode === "native") {
      let stopping = null;        // durdurulurken son sonucu bekleyen söz
      const restartNative = () => { setTimeout(() => { if (active) { try { N().speechStart(langTag(o.lang)); } catch (e) { /* yok say */ } } }, 150); };
      sttSink = (ev) => {
        if (ev.type === "partial") { partial = ev.text || ""; if (active && o.onPartial) o.onPartial(partial); return; }
        if (ev.type === "final") { emitFinal(ev.text); if (stopping) stopping(); return; }
        if (ev.type === "rms") { if (active && o.onLevel) o.onLevel(Math.max(0, Math.min(1, (Number(ev.v) + 2) / 12))); return; }
        if (ev.type === "ready") { if (active) state("listening"); return; }
        if (ev.type === "end") { if (stopping) stopping(); else if (active) restartNative(); return; }
        if (ev.type === "error") {
          if (stopping) { stopping(); return; }
          // Sessizlik / eşleşme yok / meşgul: motor kendini kapatır; dinleme sürüyorsa yeniden başlat
          if (["no-match", "timeout", "busy", "client"].includes(ev.code)) { if (active) restartNative(); return; }
          active = false; state("idle"); if (o.onError) o.onError(ev.code || "error");
        }
      };
      try { N().speechStart(langTag(o.lang)); state("starting"); } catch (e) { setTimeout(() => o.onError && o.onError("error")); }
      return {
        mode,
        async stop() {
          active = false;
          await new Promise((res) => {
            const done = () => { stopping = null; clearTimeout(tm); res(); };
            const tm = setTimeout(done, 1500);
            stopping = done;
            try { N().speechStop(); } catch (e) { done(); }
          });
          if (partial) emitFinal(partial);                       // son yarım cümle kaybolmasın
          sttSink = null; state("idle");
          return { text: finalText, durationMs: Date.now() - started };
        }
      };
    }

    /* --- Tarayıcı (Web Speech) --- */
    if (mode === "web") {
      const rec = new SR();
      rec.lang = langTag(o.lang);
      rec.continuous = true; rec.interimResults = true;
      rec.onresult = (e) => {
        let interim = "";
        for (let i = e.resultIndex; i < e.results.length; i++) {
          if (e.results[i].isFinal) emitFinal(e.results[i][0].transcript);
          else interim += e.results[i][0].transcript;
        }
        partial = interim;
        if (o.onPartial) o.onPartial(interim);
      };
      rec.onstart = () => state("listening");
      rec.onerror = (e) => {
        if (e.error === "no-speech" || e.error === "aborted") return;
        active = false; state("idle");
        if (o.onError) o.onError(e.error === "not-allowed" || e.error === "service-not-allowed" ? "permission" : e.error === "network" ? "network" : "error");
      };
      rec.onend = () => { if (active) { try { rec.start(); } catch (e) { active = false; state("idle"); } } };
      // Ses seviyesi göstergesi için mikrofonu ayrıca dinle (izin zaten istenmiş olur)
      const meter = o.onLevel ? levelMeter(o.onLevel) : null;
      try { rec.start(); state("starting"); } catch (e) { setTimeout(() => o.onError && o.onError("error")); }
      return {
        mode,
        async stop() {
          active = false;
          try { rec.stop(); } catch (e) { /* yok say */ }
          if (meter) meter.then((m) => m && m.close());
          if (partial) emitFinal(partial);
          state("idle");
          return { text: finalText, durationMs: Date.now() - started };
        }
      };
    }

    /* --- Kayıt + yapay zekâyla yazıya çevirme --- */
    let recorder = null, stream = null, chunks = [], meterClose = null;
    const ready = (async () => {
      try {
        stream = await navigator.mediaDevices.getUserMedia({ audio: { echoCancellation: true, noiseSuppression: true } });
      } catch (e) {
        active = false; state("idle");
        if (o.onError) o.onError(e && e.name === "NotAllowedError" ? "permission" : "nomic");
        return false;
      }
      const type = ["audio/webm;codecs=opus", "audio/ogg;codecs=opus", "audio/webm", "audio/mp4"].find((x) => MediaRecorder.isTypeSupported && MediaRecorder.isTypeSupported(x)) || "";
      recorder = new MediaRecorder(stream, type ? { mimeType: type, audioBitsPerSecond: 32000 } : undefined);
      recorder.ondataavailable = (e) => { if (e.data && e.data.size) chunks.push(e.data); };
      recorder.start(1000);
      if (o.onLevel) { const m = await levelMeter(o.onLevel, stream); meterClose = m && m.close; }
      state("listening");
      return true;
    })();
    return {
      mode,
      async stop(signal) {
        const ok = await ready;
        active = false;
        if (!ok || !recorder) return { text: "", durationMs: 0 };
        const durationMs = Date.now() - started;
        await new Promise((res) => { recorder.onstop = res; try { recorder.stop(); } catch (e) { res(); } });
        stream.getTracks().forEach((tr) => tr.stop());
        if (meterClose) meterClose();
        const blob = new Blob(chunks, { type: (recorder.mimeType || "audio/webm").split(";")[0] });
        if (blob.size < 2000) { state("idle"); return { text: "", durationMs }; }
        state("transcribing");
        try {
          const text = await App.ai.transcribe(blob, { lang: o.lang, signal });
          emitFinal(text);
        } finally { state("idle"); }
        return { text: finalText, durationMs };
      }
    };
  }

  /** Mikrofon ses seviyesi (0..1) — yalnızca gösterge için */
  async function levelMeter(cb, existing) {
    try {
      const stream = existing || await navigator.mediaDevices.getUserMedia({ audio: true });
      const AC = window.AudioContext || window.webkitAudioContext;
      const ctx = new AC();
      const an = ctx.createAnalyser();
      an.fftSize = 512;
      ctx.createMediaStreamSource(stream).connect(an);
      const buf = new Uint8Array(an.fftSize);
      let on = true;
      const loop = () => {
        if (!on) return;
        an.getByteTimeDomainData(buf);
        let sum = 0;
        for (let i = 0; i < buf.length; i++) { const v = (buf[i] - 128) / 128; sum += v * v; }
        cb(Math.min(1, Math.sqrt(sum / buf.length) * 4));
        requestAnimationFrame(loop);
      };
      loop();
      return { close() { on = false; try { ctx.close(); } catch (e) { /* yok say */ } if (!existing) stream.getTracks().forEach((tr) => tr.stop()); } };
    } catch (e) { return null; }
  }

  /* ---------------- Sesli okuma ---------------- */
  let seq = 0;
  let current = null;

  function ttsAvailable() {
    if (nativeHas("ttsSpeak")) return true;
    return "speechSynthesis" in window && typeof SpeechSynthesisUtterance !== "undefined";
  }

  function pickVoice(tag, nth) {
    const voices = (window.speechSynthesis && speechSynthesis.getVoices()) || [];
    const base = tag.slice(0, 2);
    if (nth) {                                       // ikinci konuşmacı için (podcast) varsa farklı bir ses
      const all = voices.filter((v) => (v.lang || "").replace("_", "-").slice(0, 2) === base);
      const good = all.filter((v) => /natural|online|neural/i.test(v.name)).concat(all.filter((v) => !/natural|online|neural/i.test(v.name)));
      if (good.length > 1) return good[nth % good.length];
    }
    return voices.find((v) => v.lang === tag && /natural|online|neural/i.test(v.name)) ||
      voices.find((v) => v.lang === tag) || voices.find((v) => (v.lang || "").slice(0, 2) === base) || null;
  }
  /** Bu dilde kaç farklı ses var (web); yerel uygulamada bilinmez → 1 */
  function voiceCount(lang) {
    if (nativeHas("ttsSpeak") || !("speechSynthesis" in window)) return 1;
    const base = langTag(lang).slice(0, 2);
    return speechSynthesis.getVoices().filter((v) => (v.lang || "").replace("_", "-").slice(0, 2) === base).length;
  }

  /** Bu dilde ses var mı? (yerel uygulamada motor karar verir; bilinmiyorsa true) */
  function hasVoice(lang) {
    if (nativeHas("ttsSpeak")) return true;
    if (!ttsAvailable()) return false;
    const voices = speechSynthesis.getVoices();
    if (!voices.length) return true;                 // liste henüz yüklenmedi
    return !!pickVoice(langTag(lang));
  }

  function say(text, o) {
    o = o || {};
    stopSaying();
    text = String(text || "").trim();
    if (!text) { if (o.onEnd) setTimeout(() => o.onEnd("done")); return; }
    const tag = langTag(o.lang);
    const rate = Number(o.rate) || 1;
    const id = "u" + (++seq);
    current = id;
    const pitch = Number(o.pitch) || 1;
    if (nativeHas("ttsSpeak")) {
      ttsWait[id] = { onEnd: o.onEnd, onError: o.onError, onWord: o.onWord, onStart: o.onStart };
      try { if (nativeHas("ttsSpeak2")) N().ttsSpeak2(id, text, tag, rate, pitch); else N().ttsSpeak(id, text, tag, rate); } catch (e) { delete ttsWait[id]; if (o.onError) o.onError("tts"); }
      return id;
    }
    if (!ttsAvailable()) { if (o.onError) setTimeout(() => o.onError("unsupported")); return id; }
    const u = new SpeechSynthesisUtterance(text);
    u.lang = tag; u.rate = rate; u.pitch = Math.max(0.1, Math.min(2, pitch));
    const v = pickVoice(tag, o.voice || 0);
    if (v) u.voice = v;
    if (o.onWord) u.onboundary = (e) => { if (current === id && (!e.name || e.name === "word")) o.onWord(e.charIndex || 0); };
    if (o.onStart) u.onstart = () => o.onStart();
    u.onend = () => { if (current === id) current = null; if (o.onEnd) o.onEnd("done"); };
    u.onerror = (e) => { if (current === id) current = null; if (e.error === "interrupted" || e.error === "canceled") { if (o.onEnd) o.onEnd("stop"); } else if (o.onError) o.onError(e.error || "tts"); };
    speechSynthesis.speak(u);
    return id;
  }

  function stopSaying() {
    current = null;
    if (nativeHas("ttsStop")) { try { N().ttsStop(); } catch (e) { /* yok say */ } }
    Object.keys(ttsWait).forEach((k) => { const w = ttsWait[k]; delete ttsWait[k]; if (w.onEnd) w.onEnd("stop"); });
    if ("speechSynthesis" in window) { try { speechSynthesis.cancel(); } catch (e) { /* yok say */ } }
  }

  // Ses listesi bazı tarayıcılarda geç yüklenir
  if ("speechSynthesis" in window) { try { speechSynthesis.getVoices(); speechSynthesis.onvoiceschanged = () => {}; } catch (e) { /* yok say */ } }

  App.speech = { sttMode, listen, say, stopSaying, ttsAvailable, hasVoice, canTranscribe, voiceCount, speaking: () => !!current };
})();
