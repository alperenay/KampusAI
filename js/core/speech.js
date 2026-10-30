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
     App.speech.say(text, { lang, rate, natural, onStart, onWord, onEnd, onError }) / App.speech.stopSaying()
       natural: true → anahtar varsa doğal bulut sesi (js/ai/tts.js), yoksa cihaz sesi
     App.speech.stream({ …, transform }) → { push(metin), end(metin), stop() }  (cevap gelirken okur)
     App.speech.level() → 0..1 okunan sesin seviyesi
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

  /* Ses kalitesi sıralaması (v1.51): sinirsel/doğal sesler önce. Tarayıcılar ve işletim sistemleri bunları
     adlarında belirtir: Microsoft "… Online (Natural)", Apple "Enhanced/Premium", Google, "Neural", "Wavenet". */
  function voiceScore(v, tag) {
    const n = String(v.name || ""), lang = String(v.lang || "").replace("_", "-");
    let s = 0;
    if (/natural|neural|wavenet|studio|journey/i.test(n)) s += 60;
    if (/premium|enhanced|siri/i.test(n)) s += 45;
    if (/google/i.test(n)) s += 30;
    if (/online/i.test(n)) s += 10;
    if (/compact|espeak|robot|novelty|whisper|bad news|bells|cellos|zarvox|trinoids/i.test(n)) s -= 80;
    if (lang === tag) s += 12;
    if (v.default) s += 3;
    if (v.localService) s += 2;          // çevrimdışı da çalışır
    return s;
  }
  /** Bu dil için sesler, en doğal olandan başlayarak */
  function rankVoices(tag) {
    const voices = (window.speechSynthesis && speechSynthesis.getVoices()) || [];
    const base = tag.slice(0, 2);
    return voices.filter((v) => (v.lang || "").replace("_", "-").slice(0, 2) === base)
      .map((v) => ({ v, s: voiceScore(v, tag) }))
      .sort((a, b) => b.s - a.s)
      .map((x) => x.v);
  }
  /** Seçilen ses: kullanıcının tercihi (Erişilebilirlik › Ses) yoksa en doğal ses; nth > 0 podcast'te ikinci konuşmacı */
  function pickVoice(tag, nth) {
    const list = rankVoices(tag);
    if (!list.length) return null;
    const want = App.prefs && App.prefs.get("ttsVoice:" + tag.slice(0, 2), "");
    const chosen = want && list.find((v) => v.voiceURI === want || v.name === want);
    const ordered = chosen ? [chosen].concat(list.filter((v) => v !== chosen)) : list;
    return ordered[(nth || 0) % ordered.length];
  }
  /** Ayar ekranı için: [{ id, name, natural }] */
  function voiceList(lang) {
    if (nativeHas("ttsSpeak") || !("speechSynthesis" in window)) return [];
    const tag = langTag(lang);
    return rankVoices(tag).map((v) => ({ id: v.voiceURI || v.name, name: v.name + (v.localService ? "" : " ☁"), natural: voiceScore(v, tag) >= 40 }));
  }

  /* Doğal okuma için metin hazırlığı: kısaltma ve birimler okunur hâle gelir (yalnızca kelime takibi yokken) */
  /** @type {Array<[RegExp, string]>} */
  const SAY_TR = [[/(^|\s)vb\./g, "$1ve benzeri"], [/(^|\s)örn\./gi, "$1örneğin"], [/(\d)\s?yy\./g, "$1 yüzyıl"],
    [/(\d)\s?m\/s²/g, "$1 metre bölü saniye kare"], [/(\d)\s?m\/s(?![a-zA-Z])/g, "$1 metre bölü saniye"], [/(\d)\s?km\/sa(?![a-zA-Z])/g, "$1 kilometre bölü saat"],
    [/(\d)\s?km(?![a-zA-Z])/g, "$1 kilometre"], [/(\d)\s?cm(?![a-zA-Z])/g, "$1 santimetre"], [/(\d)\s?kg(?![a-zA-Z])/g, "$1 kilogram"], [/(\d)\s?°C/g, "$1 santigrat derece"], [/(\d)\s?Hz(?![a-zA-Z])/g, "$1 hertz"], [/%\s?(\d)/g, "yüzde $1"]];
  function naturalText(text, tag) {
    let t = String(text || "");
    if (tag.slice(0, 2) === "tr") SAY_TR.forEach(([re, to]) => { t = t.replace(re, to); });
    return t.replace(/\s*[•·]\s*/g, ", ").replace(/\s{2,}/g, " ");
  }
  /** Uzun metni cümle sınırlarından ≤ 220 karakterlik parçalara böler (Chrome'un uzun ifadede kesilmesini önler
      ve cümle aralarında doğal duraklama verir). Dönüş: [{ text, at }] (at: özgün metindeki başlangıç) */
  function chunks(text, quick) {
    const out = [], re = /[^.!?…;:]+[.!?…;:]*\s*/g;
    let m, cur = "", at = 0, start = 0;
    while ((m = re.exec(text))) {
      // quick: ilk parça ilk cümlede biter (çok kısaysa bir sonrakini alır), ilk ses beklemeden başlar
      if (cur && ((cur + m[0]).length > 220 || (quick && !out.length && cur.trim().length >= 25))) { out.push({ text: cur.trim(), at: start }); cur = ""; }
      if (!cur) start = m.index;
      cur += m[0];
      at = m.index + m[0].length;
    }
    if (cur.trim()) out.push({ text: cur.trim(), at: start });
    if (at < text.length && text.slice(at).trim()) out.push({ text: text.slice(at).trim(), at });
    return out.length ? out : [{ text, at: 0 }];
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

  /* ---------------- Okuma kuyruğu (v1.56) ----------------
     say() ve stream() aynı kuyruğu kullanır: Q = { segs: [{ text, at, say, src }], finished, onAdd, full }.
     src (yalnız stream): parçanın cevap metnindeki [başlangıç, bitiş] yeri; o.onSegment(parça, süre?) parça
     çalmaya başlayınca çağrılır (v1.64 senkron tahta). Süre yalnız bulut sesinde bilinir (saniye).
     Çağıran natural:true derse ve bir doğal bulut sesi (App.tts) kullanılabiliyorsa o çalar; yoksa cihaz sesi.
     Bulut sesi yolda hata verirse kalan parçalar cihaz sesiyle okunur, okuma yarıda kalmaz. */
  let lastWord = 0, cloudEnd = null;
  const newQueue = () => ({ segs: [], finished: false, onAdd: null, full: "" });
  function addSeg(Q, seg) { Q.segs.push(seg); if (Q.onAdd) Q.onAdd(); }
  function finishQueue(Q) { Q.finished = true; if (Q.onAdd) Q.onAdd(); }

  function play(Q, o) {
    stopSaying();
    const tag = langTag(o.lang);
    const rate = Number(o.rate) || 1;
    const pitch = Number(o.pitch) || 1;
    const id = "u" + ++seq;
    current = id;
    const alive = () => current === id;
    let started = false;
    const onStart = () => { if (alive() && !started) { started = true; if (o.onStart) o.onStart(); } };
    const end = (reason) => { if (!alive()) return; current = null; cloudEnd = null; if (o.onEnd) o.onEnd(reason); };
    let lastSeg = null;
    const segStart = (part, dur) => { if (o.onSegment && alive() && part !== lastSeg) { lastSeg = part; o.onSegment(part, dur); } };

    function web(from) {
      if (!ttsAvailable() || nativeHas("ttsSpeak")) return native(from);
      const v = pickVoice(tag, o.voice || 0);
      let k = from;
      const speakPart = () => {
        if (!alive()) return;
        if (k >= Q.segs.length) {
          if (Q.finished) end("done");
          else Q.onAdd = () => { Q.onAdd = null; speakPart(); };
          return;
        }
        const part = Q.segs[k];
        const u = new SpeechSynthesisUtterance(part.say || part.text);
        u.lang = tag;
        u.rate = rate;
        // soru cümlelerinde ses tonu hafifçe yükselir
        u.pitch = Math.max(0.1, Math.min(2, pitch * (/[?]\s*$/.test(part.text) ? 1.04 : 1)));
        if (v) u.voice = v;
        u.onboundary = (e) => {
          lastWord = performance.now();
          segStart(part);
          if (o.onWord && alive() && (!e.name || e.name === "word")) o.onWord(part.at + (e.charIndex || 0));
        };
        u.onstart = () => { onStart(); segStart(part); };
        u.onend = () => {
          if (!alive()) return;
          segStart(part);   // onstart vermeyen tarayıcıda tahta geride kalmasın
          k++;
          setTimeout(speakPart, /[.!?…]\s*$/.test(part.text) ? 140 : 60);
        };
        u.onerror = (e) => {
          if (current === id) current = null;
          if (e.error === "interrupted" || e.error === "canceled") {
            if (o.onEnd) o.onEnd("stop");
          } else if (o.onError) o.onError(e.error || "tts");
        };
        speechSynthesis.speak(u);
      };
      speakPart();
    }

    function native(from) {
      if (!nativeHas("ttsSpeak")) {
        current = null;
        if (o.onError) setTimeout(() => o.onError("unsupported"));
        return;
      }
      const speakOne = (key, text, onWord, next) => {
        ttsWait[key] = {
          onStart,
          onWord: (n) => { lastWord = performance.now(); if (onWord) onWord(n); },
          onError: (c) => { if (current === id) current = null; if (o.onError) o.onError(c); },
          onEnd: (type) => { if (type === "stop" || !alive()) { if (current === id) current = null; if (o.onEnd) o.onEnd("stop"); } else next(); }
        };
        try {
          if (nativeHas("ttsSpeak3")) N().ttsSpeak3(key, text, tag, rate, pitch, Number(o.voice) || 0);
          else if (nativeHas("ttsSpeak2")) N().ttsSpeak2(key, text, tag, rate, pitch);
          else N().ttsSpeak(key, text, tag, rate);
        } catch (e) {
          delete ttsWait[key];
          if (current === id) current = null;
          if (o.onError) o.onError("tts");
        }
      };
      // Bütün metin baştan biliniyorsa telefonun motoruna tek seferde verilir (kendi duraklamalarıyla okur)
      if (from === 0 && Q.finished && Q.full) {
        speakOne(id, o.onWord ? Q.full : naturalText(Q.full, tag), o.onWord, () => end("done"));
        return;
      }
      let k = from;
      const nextPart = () => {
        if (!alive()) return;
        if (k >= Q.segs.length) {
          if (Q.finished) end("done");
          else Q.onAdd = () => { Q.onAdd = null; nextPart(); };
          return;
        }
        const part = Q.segs[k++];
        segStart(part);
        speakOne(id + "-" + k, part.say || part.text, o.onWord && ((n) => o.onWord(part.at + n)), nextPart);
      };
      nextPart();
    }

    if (o.natural && App.tts && App.tts.provider()) {
      cloudEnd = (reason) => { if (o.onEnd) o.onEnd(reason); };
      App.tts.consume(Q, {
        lang: tag.slice(0, 2), nth: o.voice || 0, rate,
        onStart,
        onWord: o.onWord && ((at) => { if (alive()) o.onWord(at); }),
        onSegment: segStart,
        onEnd: end
      }, {
        fail: (from) => { if (!alive()) return; cloudEnd = null; web(from); }
      });
    } else web(0);
    return id;
  }

  function say(text, o) {
    o = o || {};
    text = String(text || "").trim();
    if (!text) {
      stopSaying();
      if (o.onEnd) setTimeout(() => o.onEnd("done"));
      return;
    }
    const tag = langTag(o.lang), Q = newQueue();
    Q.full = text;
    chunks(text, true).forEach((c) => Q.segs.push({ text: c.text, at: c.at, say: o.onWord ? c.text : naturalText(c.text, tag) }));
    Q.finished = true;
    return play(Q, o);
  }

  /** Yapay zekâ cevabı gelirken okumaya başlar: push(şimdiye kadarki metin) tamamlanan cümleleri sıraya ekler,
      end(son metin) kalanını ekler. o.transform(parça) okunacak metni verir (ör. markdown → sözcükler).
      Kapanmamış **, $ ve ` içindeki ya da "3." gibi sayıdan sonra gelen noktada bölünmez.
      Her satır ayrı okunur; parçalar cevaptaki yerini (src) taşır, tahta okunan adımı buradan bulur (v1.64). */
  function stream(o) {
    o = o || {};
    const Q = newQueue(), tag = langTag(o.lang), tf = o.transform || ((x) => x);
    let used = 0, spoken = 0, id = null, closed = false;
    const count = (s, re) => (s.match(re) || []).length;
    // $$ … $$ ayrı sayılır: tek başına "$$" satırı açık bir blok başlatır
    const balanced = (s) => { const d = s.replace(/\\\$/g, ""); return s.split("**").length % 2 === 1 && count(d, /\$\$/g) % 2 === 0 && count(d.replace(/\$\$/g, ""), /\$/g) % 2 === 0 && count(s, /`/g) % 2 === 0; };
    /** piece: cevap metninin from konumundan başlayan bölümü; satırlarına ayrılır (açık blok içinde bölünmez) */
    function take(piece, from) {
      let a = 0;
      piece.split("\n").forEach((line, i, all) => {
        const b = a + line.length;
        if (i < all.length - 1 && !balanced(piece.slice(a, b))) return;   // blok sürüyor: sonraki satırla birlikte
        sayPart(piece.slice(a, b), from + a);
        a = b + 1;
      });
      if (!id && Q.segs.length) id = play(Q, o);
    }
    /** Bir satırın parçaları; parçanın satırdaki yeri okunan metindeki konumuyla orantılı tahmin edilir */
    function sayPart(raw, from) {
      const said = String(tf(raw) || "").replace(/\s+/g, " ").trim();
      if (!said) return;
      const base = from + raw.length - raw.trimStart().length, len = raw.trim().length;
      const map = (n) => base + Math.round((n / said.length) * len);
      chunks(said, !Q.segs.length).forEach((c) => addSeg(Q, {
        text: c.text, at: spoken + c.at, say: o.onWord ? c.text : naturalText(c.text, tag), src: [map(c.at), map(c.at + c.text.length)]
      }));
      spoken += said.length + 1;
    }
    return {
      push(raw) {
        raw = String(raw || "");
        if (closed || raw.length <= used) return;
        const rest = raw.slice(used), re = /([.!?…:;])(?=\s)|\n\s*\n/g;
        let cut = -1, m;
        while ((m = re.exec(rest))) {
          if (m[1] === "." && /\d/.test(rest.charAt(m.index - 1))) continue;
          const stop = m.index + m[0].length;
          if (balanced(raw.slice(0, used + stop))) cut = stop;
        }
        if (cut > 0) { take(rest.slice(0, cut), used); used += cut; }
      },
      end(raw) {
        if (closed) return;
        closed = true;
        raw = String(raw || "");
        if (raw.length > used) take(raw.slice(used), used);
        used = raw.length;
        finishQueue(Q);
        if (!id && o.onEnd) setTimeout(() => o.onEnd("done"));
      },
      stop() {
        closed = true;
        finishQueue(Q);
        if (id && current === id) stopSaying();
      },
      get started() { return !!id; }
    };
  }

  /** Okunan sesin anlık seviyesi 0..1 (görseller için). Bulut sesinde gerçek genlik; cihaz sesinde
      kelime sınırlarından türetilen zarf (sınır olayı yoksa hafif dalgalanma). */
  function level() {
    if (App.tts && App.tts.active()) return App.tts.level();
    if (!current) return 0;
    const now = performance.now();
    const env = Math.exp(-(now - lastWord) / 240);
    return Math.max(0.18 + 0.1 * Math.sin(now / 95), 0.95 * env);
  }

  function stopSaying() {
    current = null;
    if (App.tts) App.tts.stop();
    if (cloudEnd) {
      const f = cloudEnd;
      cloudEnd = null;
      setTimeout(() => f("stop"));
    }
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
    voiceList,
    naturalText,
    chunks,
    stream,
    level,
    speaking: () => !!current,
  };
})();
