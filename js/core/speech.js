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
  const nativeHas = (fn) => {
    try {
      return !!(N() && typeof N()[fn] === "function");
    } catch (e) {
      return false;
    }
  };

  /* ---------------- Yerel (Android) olaylar ---------------- */
  let sttSink = null; // aktif dinleme oturumunun olay alıcısı
  const ttsWait = {}; // konuşma id → { onEnd, onError }
  window.__nativeSpeech = function (ev) {
    if (!ev) return;
    if (ev.kind === "tts") {
      const w = ttsWait[ev.id];
      if (!w) return;
      if (ev.type === "word") {
        if (w.onWord) w.onWord(Number(ev.start) || 0);
        return;
      }
      if (ev.type === "start") {
        if (w.onStart) w.onStart();
        return;
      }
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
    try {
      if (
        nativeHas("speechStart") &&
        N().speechAvailable &&
        N().speechAvailable()
      )
        return "native";
    } catch (e) {
      /* use recording when the native service is unavailable */
    }
    if (
      SR &&
      !isElectron &&
      !App.platform?.native &&
      !/; wv\)/i.test(navigator.userAgent)
    )
      return "web";
    if (
      navigator.mediaDevices &&
      navigator.mediaDevices.getUserMedia &&
      window.MediaRecorder &&
      canTranscribe()
    )
      return "record";
    return null;
  }

  /** Kayıt + yapay zekâyla yazıya çevirme yalnızca Gemini tabanlı servislerde mümkün */
  function canTranscribe() {
    try {
      const c = App.engine && App.engine.cloud();
      return !!(c && c.configured() && typeof c.toContents === "function");
    } catch (e) {
      return false;
    }
  }

  const langTag = (lang) =>
    ({ tr: "tr-TR", en: "en-US", de: "de-DE" })[
      String(lang || App.i18n.lang)
        .toLowerCase()
        .split(/[-_]/)[0]
    ] || "en-US";

  /* ---------------- Dinleme ---------------- */
  let activeListen = null,
    listenSeq = 0;
  function listen(o = {}) {
    if (activeListen) activeListen.cancel();
    const started = Date.now(),
      sessionId = "stt" + ++listenSeq + "-" + started,
      capture = new AbortController();
    let currentMode = sttMode(),
      finalText = "",
      partial = "",
      cancelled = false,
      ended = false,
      stopping = false;
    let closeCapture = () => {},
      stopCapture = async () => {},
      ready = Promise.resolve(),
      stopPromise = null;
    let recorder = null,
      stream = null,
      chunks = [],
      fallbackUsed = false,
      sessionVersion = 0;
    const state = (s) => {
      if (!cancelled && o.onState) o.onState(s);
    };
    function emitFinal(text) {
      if (cancelled || ended) return;
      text = String(text || "").trim();
      if (!text) return;
      finalText = finalText ? finalText + " " + text : text;
      partial = "";
      o.onFinal?.(text, finalText);
    }
    const result = () => ({
      text: finalText,
      durationMs: Date.now() - started,
    });
    let watchdog;
    function release() {
      clearTimeout(watchdog);
      if (activeListen === api) activeListen = null;
    }
    function fail(code) {
      if (cancelled || ended) return;
      closeCapture();
      ended = true;
      capture.abort();
      release();
      state("idle");
      o.onError?.(code);
    }
    function fallback(code) {
      if (
        !stopping &&
        !fallbackUsed &&
        canTranscribe() &&
        window.MediaRecorder &&
        navigator.mediaDevices?.getUserMedia &&
        ["network", "lang", "service", "error"].includes(code)
      ) {
        fallbackUsed = true;
        sessionVersion++;
        closeCapture();
        currentMode = "record";
        ready = startRecord();
        return;
      }
      fail(code);
    }
    const api = {
      get mode() {
        return currentMode;
      },
      cancel() {
        if (cancelled) return;
        cancelled = true;
        ended = true;
        sessionVersion++;
        capture.abort();
        closeCapture();
        release();
      },
      stop(signal) {
        if (stopPromise) return stopPromise;
        if (cancelled || ended) return Promise.resolve(result());
        // Closing a screen while consent is pending must never start recording later.
        if (currentMode === "record" && !recorder) {
          api.cancel();
          return Promise.resolve(result());
        }
        stopping = true;
        stopPromise = (async () => {
          try {
            await ready;
            if (cancelled || ended) return result();
            await stopCapture();
            if (partial) emitFinal(partial);
            if (currentMode === "record" && !cancelled) {
              const blob = new Blob(chunks, {
                type: (recorder?.mimeType || "audio/webm").split(";")[0],
              });
              chunks = [];
              if (blob.size >= 2000) {
                if (blob.size > 8 * 1024 * 1024)
                  throw Object.assign(new Error("Audio too large"), {
                    code: "timeout",
                  });
                state("transcribing");
                const ctrl = new AbortController(),
                  abort = () => ctrl.abort();
                signal?.addEventListener("abort", abort, { once: true });
                capture.signal.addEventListener("abort", abort, { once: true });
                const timer = setTimeout(abort, 90000);
                try {
                  if (signal?.aborted) abort();
                  const text = await App.ai.transcribe(blob, {
                    lang: o.lang,
                    signal: ctrl.signal,
                  });
                  if (!ctrl.signal.aborted && !cancelled) emitFinal(text);
                } finally {
                  clearTimeout(timer);
                  signal?.removeEventListener("abort", abort);
                  capture.signal.removeEventListener("abort", abort);
                }
              }
            }
            return result();
          } catch (e) {
            if (!cancelled) {
              o.onError?.(App.media.codeOf(e));
              throw e;
            }
            return result();
          } finally {
            ended = true;
            closeCapture();
            release();
            state("idle");
          }
        })();
        return stopPromise;
      },
    };
    activeListen = api;
    watchdog = setTimeout(() => fail("timeout"), 5 * 60 * 1000);
    function startNative() {
      let finish = null,
        restarts = 0,
        tm = null,
        settle = null;
      const mine = ++sessionVersion;
      const alive = () => !cancelled && !ended && mine === sessionVersion;
      const start = () => {
        try {
          if (nativeHas("speechStartSession"))
            N().speechStartSession(langTag(o.lang), sessionId);
          else N().speechStart(langTag(o.lang));
        } catch (e) {
          fallback("service");
        }
      };
      const restart = () => {
        if (!alive() || stopping) return;
        if (++restarts > 8) {
          fallback("service");
          return;
        }
        clearTimeout(tm);
        tm = setTimeout(() => {
          if (alive() && !stopping) start();
        }, 250);
      };
      const sink = (ev) => {
        if (!alive() || (ev.sid && ev.sid !== sessionId)) return;
        if (ev.type === "partial") {
          partial = ev.text || "";
          o.onPartial?.(partial);
        }
        if (ev.type === "final") {
          restarts = 0;
          emitFinal(ev.text);
          if (finish) finish();
        }
        if (ev.type === "rms")
          o.onLevel?.(Math.max(0, Math.min(1, (Number(ev.v) + 2) / 12)));
        if (ev.type === "ready") {
          restarts = 0;
          state("listening");
        }
        if (ev.type === "end") {
          if (finish) finish();
          else restart();
        }
        if (ev.type === "error") {
          if (finish) {
            finish();
            return;
          }
          if (["no-match", "timeout"].includes(ev.code)) {
            restart();
            return;
          }
          fallback(
            ev.code === "client" || ev.code === "busy"
              ? "busy"
              : ev.code || "error",
          );
        }
      };
      sttSink = sink;
      closeCapture = () => {
        clearTimeout(tm);
        clearTimeout(settle);
        if (finish) {
          const f = finish;
          finish = null;
          f();
        }
        if (sttSink === sink) {
          sttSink = null;
          try {
            if (nativeHas("speechCancel")) N().speechCancel();
            else N().speechStop();
          } catch (e) {
            /* already stopped */
          }
        }
      };
      stopCapture = () =>
        new Promise((resolve) => {
          finish = () => {
            clearTimeout(settle);
            finish = null;
            resolve();
          };
          settle = setTimeout(() => finish?.(), 1200);
          try {
            N().speechStop();
          } catch (e) {
            finish?.();
          }
        });
      state("starting");
      start();
    }
    function startWeb() {
      const mine = ++sessionVersion,
        rec = new SR();
      let restarts = 0,
        tm = null,
        finish = null,
        settle = null;
      const alive = () => !cancelled && !ended && mine === sessionVersion;
      rec.lang = langTag(o.lang);
      rec.continuous = true;
      rec.interimResults = true;
      rec.onresult = (e) => {
        if (!alive()) return;
        let interim = "";
        for (let i = e.resultIndex; i < e.results.length; i++) {
          if (e.results[i].isFinal) emitFinal(e.results[i][0].transcript);
          else interim += e.results[i][0].transcript;
        }
        partial = interim;
        o.onPartial?.(interim);
        restarts = 0;
      };
      rec.onstart = () => {
        if (alive()) state("listening");
      };
      rec.onerror = (e) => {
        if (!alive() || e.error === "aborted" || e.error === "no-speech")
          return;
        fallback(
          e.error === "not-allowed"
            ? "permission"
            : e.error === "service-not-allowed"
              ? "service"
              : e.error === "audio-capture"
                ? "busy"
                : e.error === "network"
                  ? "network"
                  : "error",
        );
      };
      rec.onend = () => {
        if (finish) {
          finish();
          return;
        }
        if (!alive() || stopping) return;
        if (++restarts > 8) {
          fallback("service");
          return;
        }
        tm = setTimeout(() => {
          if (alive() && !stopping)
            try {
              rec.start();
            } catch (e) {
              fallback("service");
            }
        }, 200);
      };
      // A second input capture can lock the recognizer on mobile. Native/Web Speech handle their own input.
      closeCapture = () => {
        clearTimeout(tm);
        clearTimeout(settle);
        rec.onstart = rec.onresult = rec.onerror = rec.onend = null;
        try {
          rec.abort();
        } catch (e) {
          /* not started */
        }
        if (finish) {
          const f = finish;
          finish = null;
          f();
        }
      };
      stopCapture = () =>
        new Promise((resolve) => {
          finish = () => {
            clearTimeout(settle);
            finish = null;
            resolve();
          };
          settle = setTimeout(() => finish?.(), 400);
          try {
            rec.stop();
          } catch (e) {
            finish?.();
          }
        });
      try {
        rec.start();
        state("starting");
      } catch (e) {
        fallback(
          App.media.codeOf(e) === "permission" ? "permission" : "service",
        );
      }
    }
    async function startRecord() {
      const mine = ++sessionVersion;
      let meter = null;
      const alive = () => !cancelled && !ended && mine === sessionVersion;
      closeCapture = () => {
        if (recorder && recorder.state !== "inactive")
          try {
            recorder.stop();
          } catch (e) {
            /* inactive */
          }
        if (meter) meter.close();
        App.media.stop(stream);
      };
      state("starting");
      try {
        const got = await App.media.microphone(
          { echoCancellation: true, noiseSuppression: true },
          capture.signal,
        );
        if (!alive()) {
          App.media.stop(got);
          return;
        }
        stream = got;
        const type =
          [
            "audio/webm;codecs=opus",
            "audio/ogg;codecs=opus",
            "audio/webm",
            "audio/mp4",
          ].find((x) => MediaRecorder.isTypeSupported?.(x)) || "";
        recorder = new MediaRecorder(
          stream,
          type ? { mimeType: type, audioBitsPerSecond: 32000 } : undefined,
        );
        recorder.ondataavailable = (e) => {
          if (alive() && e.data?.size) chunks.push(e.data);
        };
        recorder.onerror = () => {
          if (alive()) fail("busy");
        };
        recorder.start(1000);
        stopCapture = () =>
          new Promise((resolve) => {
            if (!recorder || recorder.state === "inactive") {
              resolve();
              return;
            }
            const timer = setTimeout(resolve, 2000);
            recorder.onstop = () => {
              clearTimeout(timer);
              resolve();
            };
            try {
              recorder.stop();
            } catch (e) {
              clearTimeout(timer);
              resolve();
            }
          }).finally(() => {
            App.media.stop(stream);
            if (meter) meter.close();
          });
        if (o.onLevel) {
          meter = await levelMeter((v) => {
            if (alive()) o.onLevel(v);
          }, stream);
          if (!alive()) {
            meter?.close();
            return;
          }
        }
        state("listening");
      } catch (e) {
        if (alive()) fail(App.media.codeOf(e));
      }
    }
    if (currentMode === "native") startNative();
    else if (currentMode === "web") startWeb();
    else if (currentMode === "record") ready = startRecord();
    else
      setTimeout(() =>
        fail(navigator.mediaDevices?.getUserMedia ? "service" : "unsupported"),
      );
    return api;
  }

  /** Input meter shares the recorder stream, never opens another microphone. */
  async function levelMeter(cb, stream) {
    let ctx = null;
    try {
      const AC = window.AudioContext || window.webkitAudioContext;
      if (!AC) return null;
      ctx = new AC();
      await App.media.resume(ctx);
      const an = ctx.createAnalyser(),
        src = ctx.createMediaStreamSource(stream);
      an.fftSize = 512;
      src.connect(an);
      const buf = new Uint8Array(an.fftSize);
      let on = true,
        raf = 0;
      const loop = () => {
        if (!on) return;
        an.getByteTimeDomainData(buf);
        let sum = 0;
        for (let i = 0; i < buf.length; i++) {
          const v = (buf[i] - 128) / 128;
          sum += v * v;
        }
        cb(Math.min(1, Math.sqrt(sum / buf.length) * 4));
        raf = requestAnimationFrame(loop);
      };
      loop();
      return {
        close() {
          if (!on) return;
          on = false;
          cancelAnimationFrame(raf);
          src.disconnect();
          ctx.close().catch(() => {});
        },
      };
    } catch (e) {
      if (ctx) ctx.close().catch(() => {});
      return null;
    }
  }

  /* ---------------- Sesli okuma ---------------- */
  let seq = 0;
  let current = null;

  function ttsAvailable() {
    if (nativeHas("ttsSpeak")) return true;
    return (
      "speechSynthesis" in window &&
      typeof SpeechSynthesisUtterance !== "undefined"
    );
  }

  function pickVoice(tag, nth) {
    const voices =
      (window.speechSynthesis && speechSynthesis.getVoices()) || [];
    const base = tag.slice(0, 2);
    if (nth) {
      // ikinci konuşmacı için (podcast) varsa farklı bir ses
      const all = voices.filter(
        (v) => (v.lang || "").replace("_", "-").slice(0, 2) === base,
      );
      const good = all
        .filter((v) => /natural|online|neural/i.test(v.name))
        .concat(all.filter((v) => !/natural|online|neural/i.test(v.name)));
      if (good.length > 1) return good[nth % good.length];
    }
    return (
      voices.find(
        (v) => v.lang === tag && /natural|online|neural/i.test(v.name),
      ) ||
      voices.find((v) => v.lang === tag) ||
      voices.find((v) => (v.lang || "").slice(0, 2) === base) ||
      null
    );
  }
  /** Bu dilde kaç farklı ses var (web); yerel uygulamada bilinmez → 1 */
  function voiceCount(lang) {
    if (nativeHas("ttsSpeak") || !("speechSynthesis" in window)) return 1;
    const base = langTag(lang).slice(0, 2);
    return speechSynthesis
      .getVoices()
      .filter((v) => (v.lang || "").replace("_", "-").slice(0, 2) === base)
      .length;
  }

  /** Bu dilde ses var mı? (yerel uygulamada motor karar verir; bilinmiyorsa true) */
  function hasVoice(lang) {
    if (nativeHas("ttsSpeak")) return true;
    if (!ttsAvailable()) return false;
    const voices = speechSynthesis.getVoices();
    if (!voices.length) return true; // liste henüz yüklenmedi
    return !!pickVoice(langTag(lang));
  }

  function say(text, o) {
    o = o || {};
    stopSaying();
    text = String(text || "").trim();
    if (!text) {
      if (o.onEnd) setTimeout(() => o.onEnd("done"));
      return;
    }
    const tag = langTag(o.lang);
    const rate = Number(o.rate) || 1;
    const id = "u" + ++seq;
    current = id;
    const pitch = Number(o.pitch) || 1;
    if (nativeHas("ttsSpeak")) {
      ttsWait[id] = {
        onEnd: o.onEnd,
        onError: o.onError,
        onWord: o.onWord,
        onStart: o.onStart,
      };
      try {
        if (nativeHas("ttsSpeak2")) N().ttsSpeak2(id, text, tag, rate, pitch);
        else N().ttsSpeak(id, text, tag, rate);
      } catch (e) {
        delete ttsWait[id];
        if (o.onError) o.onError("tts");
      }
      return id;
    }
    if (!ttsAvailable()) {
      if (o.onError) setTimeout(() => o.onError("unsupported"));
      return id;
    }
    const u = new SpeechSynthesisUtterance(text);
    u.lang = tag;
    u.rate = rate;
    u.pitch = Math.max(0.1, Math.min(2, pitch));
    const v = pickVoice(tag, o.voice || 0);
    if (v) u.voice = v;
    if (o.onWord)
      u.onboundary = (e) => {
        if (current === id && (!e.name || e.name === "word"))
          o.onWord(e.charIndex || 0);
      };
    if (o.onStart) u.onstart = () => o.onStart();
    u.onend = () => {
      if (current === id) current = null;
      if (o.onEnd) o.onEnd("done");
    };
    u.onerror = (e) => {
      if (current === id) current = null;
      if (e.error === "interrupted" || e.error === "canceled") {
        if (o.onEnd) o.onEnd("stop");
      } else if (o.onError) o.onError(e.error || "tts");
    };
    speechSynthesis.speak(u);
    return id;
  }

  function stopSaying() {
    current = null;
    if (nativeHas("ttsStop")) {
      try {
        N().ttsStop();
      } catch (e) {
        /* yok say */
      }
    }
    Object.keys(ttsWait).forEach((k) => {
      const w = ttsWait[k];
      delete ttsWait[k];
      if (w.onEnd) w.onEnd("stop");
    });
    if ("speechSynthesis" in window) {
      try {
        speechSynthesis.cancel();
      } catch (e) {
        /* yok say */
      }
    }
  }

  // Ses listesi bazı tarayıcılarda geç yüklenir
  if ("speechSynthesis" in window) {
    try {
      speechSynthesis.getVoices();
      speechSynthesis.onvoiceschanged = () => {};
    } catch (e) {
      /* yok say */
    }
  }

  App.speech = {
    langTag,
    sttMode,
    listen,
    say,
    stopSaying,
    ttsAvailable,
    hasVoice,
    canTranscribe,
    voiceCount,
    speaking: () => !!current,
  };
})();
