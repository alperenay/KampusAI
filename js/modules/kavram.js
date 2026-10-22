/* =========================================================
   kavram.js — Konuşan Kavram Hologramı (Modül 3, v1.33)   (#/kavram, #/kavram/<kavram>)

   Kavramın kendisi konuşur: "Ben mitokondriyim, hücrenin enerji santraliyim …"
     • Kişilik: kavram-model.js (karakter + doğru bilgi tohumları + birinci tekil şahıs istemi).
       Selamlama katalogdan, anında ve internetsiz; sorular seçili yapay zekâ motoruna akışla gider.
     • Düşük gecikme: cevap akarken cümlelere bölünür; ilk cümle biter bitmez okunmaya başlar,
       sonrakiler sıraya girer (tüm cevap beklenmez). Yeni soru, önceki konuşmayı keser.
     • Ses: cihazın sesi (Android TTS / tarayıcı) ve sözcük olaylarıyla senkron hece zarfı;
       kullanıcının kendi Gemini anahtarı varsa "Doğal ses": Gemini TTS ile gerçek ses verisi,
       Web Audio çözümleyicisinden ölçülen gerçek genlik (sonraki cümle önceden hazırlanır).
       Doğal ses hata verirse oturum boyunca cihaz sesine dönülür; ses hiç yoksa yazıyla sürer,
       hologram yine okuma hızında atar.
     • Görüntü: kavram-holo.js (pencere ya da piramit). Mikrofonla sorulabilir (App.speech.listen).
   ========================================================= */
(function () {
  const { esc } = App.utils;
  const T = (tr, en) => (App.i18n.lang === "en" ? en : tr);
  const KM = () => window.KavramModel;
  const ASK_MS = 60000, HISTORY = 10, TTS_MODEL = "gemini-2.5-flash-preview-tts";
  const SUGGEST = [["Ne işe yararsın?", "What do you do?"], ["Seni kim keşfetti?", "Who discovered you?"], ["Sınavda senden ne sorulur?", "What do exams ask about you?"], ["Bir benzetmeyle anlat", "Explain with an analogy"]];
  const SUBJ = { biyoloji: ["Biyoloji", "Biology"], fizik: ["Fizik", "Physics"], kimya: ["Kimya", "Chemistry"], cografya: ["Coğrafya", "Geography"], tarih: ["Tarih", "History"] };
  const VOICES = { 1: "Kore", 0: "Puck" };                       // Gemini hazır sesleri (perdeye göre)

  /* ---------------- Seslendirme kuyruğu ---------------- */
  function voice(o) {
    const S = { q: [], cur: null, on: true, rateK: 1, natural: !!o.natural, ctx: null, an: null, buf: null, muted: !!o.muted };
    const tts = App.speech && App.speech.ttsAvailable();
    const lang = App.i18n.lang === "en" ? "en" : "tr";
    async function fetchAudio(text, signal) {
      const eng = App.engine.engines.gemini;
      const r = await fetch(eng.base() + "/models/" + TTS_MODEL + ":generateContent", {
        method: "POST", headers: eng.headers(), signal,
        body: JSON.stringify({ contents: [{ parts: [{ text }] }], generationConfig: { responseModalities: ["AUDIO"], speechConfig: { voiceConfig: { prebuiltVoiceConfig: { voiceName: VOICES[o.pitch >= 1 ? 1 : 0] } } } } })
      });
      if (!r.ok) throw new Error("tts " + r.status);
      const j = await r.json(), part = ((((j.candidates || [])[0] || {}).content || {}).parts || []).find((p) => p.inlineData && p.inlineData.data);
      if (!part) throw new Error("tts-empty");
      return { pcm: KM().pcm16(part.inlineData.data), rate: KM().rateOf(part.inlineData.mimeType) };
    }
    function say(text) {
      text = KM().plain(text); if (!text || !S.on) return;
      const item = { text, ctrl: new AbortController() };
      if (S.natural && !S.muted) item.audio = fetchAudio(text, item.ctrl.signal);   // hemen hazırlanmaya başlar (sıradaki cümle beklerken)
      S.q.push(item); if (!S.cur) next();
    }
    function next() {
      const it = S.q.shift(); S.cur = it || null;
      if (!it) { o.onIdle && o.onIdle(); return; }
      o.onStart && o.onStart(it.text);
      if (it.audio) playNatural(it); else playSystem(it);
    }
    async function playNatural(it) {
      let a;
      try { a = await it.audio; } catch (e) {
        if (S.cur !== it) return;
        if (!(e && e.name === "AbortError")) { S.natural = false; o.onNaturalFail && o.onNaturalFail(e); S.q.forEach((x) => { x.ctrl.abort(); x.audio = null; }); }
        return playSystem(it);
      }
      if (S.cur !== it || !S.on) return;
      try {
        if (!S.ctx) { S.ctx = new (window.AudioContext || window.webkitAudioContext)(); S.an = S.ctx.createAnalyser(); S.an.fftSize = 1024; S.an.connect(S.ctx.destination); S.buf = new Float32Array(S.an.fftSize); }
        if (S.ctx.state === "suspended") await S.ctx.resume();
        const b = S.ctx.createBuffer(1, a.pcm.length, a.rate); b.copyToChannel(a.pcm, 0);
        const src = S.ctx.createBufferSource(); src.buffer = b; src.connect(S.an);
        it.src = src; it.real = true;
        src.onended = () => { if (S.cur === it) next(); };
        src.start();
      } catch (e) { S.natural = false; o.onNaturalFail && o.onNaturalFail(e); playSystem(it); }
    }
    function playSystem(it) {
      const env = KM().envelope(it.text, (o.rate || 1) * S.rateK);
      it.env = env; it.t0 = performance.now(); it.sys = true;
      if (!tts || S.muted) { it.timer = setTimeout(() => { if (S.cur === it) next(); }, env.dur * 1000 + 150); return; }   // ses yok: okuma hızında
      let started = false;
      it.say0 = performance.now();
      App.speech.say(it.text, { lang, rate: o.rate || 1, pitch: o.pitch || 1,
        onStart: () => { started = true; it.t0 = performance.now(); },
        onWord: (ci) => { started = true; it.t0 = performance.now() - KM().wordTime(env, ci) * 1000; },   // zarfı gerçek konuşmaya oturt
        onEnd: (why) => {
          if (S.cur !== it) return;
          if (why === "done" && started) { const real = (performance.now() - it.t0) / 1000; if (real > 0.4 && env.dur > 0.4) S.rateK = Math.max(0.6, Math.min(1.6, S.rateK * 0.7 + (env.dur / real) * S.rateK * 0.3)); }   // hız ayarı
          next();
        },
        onError: () => { if (S.cur !== it) return; it.timer = setTimeout(() => { if (S.cur === it) next(); }, env.dur * 1000); } });
    }
    /** Anlık ses düzeyi (0..1) */
    function level(now) {
      const it = S.cur; if (!it) return 0;
      if (it.real && S.an) { S.an.getFloatTimeDomainData(S.buf); let s = 0; for (let i = 0; i < S.buf.length; i++) s += S.buf[i] * S.buf[i]; return Math.min(1, Math.sqrt(s / S.buf.length) * 4.5); }
      if (it.env) {
        const t = (now - it.t0) / 1000;
        if (t <= it.env.dur) return KM().levelAt(it.env, t);
        return 0.18 + 0.12 * Math.abs(Math.sin(now / 90));          // ses tahminden uzun sürüyor: hafif titreşim
      }
      return 0;
    }
    function stop() {
      S.q.forEach((x) => x.ctrl.abort()); S.q.length = 0;
      const it = S.cur; S.cur = null;
      if (it) { clearTimeout(it.timer); it.ctrl.abort(); if (it.src) try { it.src.onended = null; it.src.stop(); } catch (e) { /* bitti */ } }
      if (tts) App.speech.stopSaying();
    }
    return { say, stop, level, busy: () => !!S.cur || S.q.length > 0, setMuted(m) { S.muted = !!m; if (m) stop(); }, natural: () => S.natural,
      dispose() { S.on = false; stop(); if (S.ctx) try { S.ctx.close(); } catch (e) { /* yok */ } } };
  }
  const naturalAvailable = () => { try { const g = App.engine.engines.gemini; return !!(g && g.configured()); } catch (e) { return false; } };

  /* ---------------- Yapay zekâ: akışlı cevap ---------------- */
  async function stream(messages, signal, onDelta) {
    const once = async (eng) => {
      await eng.prepare(signal);
      const cfg = eng.config();
      return (await eng.chat({ model: cfg.chatModel, messages, options: { temperature: 0.7, num_ctx: 8192 }, signal, onDelta })).text;
    };
    const eng = await App.engine.resolve(signal);
    try { return await once(eng); }
    catch (e) {
      const alt = !(signal && signal.aborted) && !e.partial ? await App.engine.fallbackFor(eng, e, signal) : null;
      if (!alt) throw e;
      if (eng.kind === "local") App.engine.markLocalDown();
      onDelta(null, "");                                           // baştan
      return once(alt);
    }
  }
  function errText(e) {
    const code = e && e.code;
    if (code === "timeout") return T("Cevap zamanında gelmedi. Tekrar sor.", "No answer in time. Ask again.");
    if (code === "net" || code === "offline") return App.t("ai.err.netTitle");
    if (code === "quota") return T("Yapay zekâ kotası doldu; biraz sonra tekrar dene.", "AI quota is used up; try later.");
    if (code === "busy") return T("Yapay zekâ şu an yoğun; birkaç saniye sonra tekrar dene.", "The AI is busy; try again shortly.");
    if (code === "no-key" || code === "auth") return App.t("ai.err.nokeyBody");
    return T("Cevap alınamadı.", "No answer.");
  }

  /* ---------------- Sayfa ---------------- */
  function render(view, params) {
    App.setTitle(T("Konuşan Kavramlar", "Talking Concepts"));
    const C = KM().CONCEPTS;
    view.innerHTML = '<div class="page kv-page"><div class="page-head"><div><h1>' + esc(T("Konuşan Kavramlar", "Talking Concepts")) + "</h1><p>" +
      esc(T("Kavramın kendisiyle konuş: mitokondri, Mars, DNA, foton … Kendini birinci ağızdan anlatır, sesli konuşur, hologram olarak karşında durur.", "Talk to the concept itself: it explains itself in the first person, speaks aloud and stands in front of you as a hologram.")) + "</p></div></div>" +
      '<section class="card kv-pick"><div class="kv-grid">' + C.map((c) => '<button type="button" class="kv-c" data-k="' + c.id + '" style="--kc:#' + c.renk.toString(16).padStart(6, "0") + '"><b>' + esc(T(c.ad[0], c.ad[1])) + "</b><small>" + esc(T(SUBJ[c.ders][0], SUBJ[c.ders][1]) + " · " + c.sinif + T(". sınıf", "th")) + "</small></button>").join("") + "</div>" +
        '<form class="kv-own"><input class="input" id="kvOwn" maxlength="40" aria-label="' + esc(T("Konuşturulacak kavram", "Concept to talk to")) + '" placeholder="' + esc(T("Başka bir kavram yaz: kara delik, enzim, Osmanlı Devleti …", "Type another concept: black hole, enzyme …")) + '"><button class="btn" type="submit">' + esc(T("Konuş", "Talk")) + "</button></form>" +
        '<button type="button" class="btn btn--ghost btn--sm kv-change" hidden>' + esc(T("Başka kavram seç", "Pick another concept")) + "</button></section>" +
      '<div id="kvRoom"></div></div>';
    const room = view.querySelector("#kvRoom");
    let R = null;                                                    // açık konuşma odası
    view.querySelector(".kv-grid").addEventListener("click", (e) => { const b = e.target.closest("[data-k]"); if (b) location.hash = "#/kavram/" + b.dataset.k; });
    view.querySelector(".kv-own").addEventListener("submit", (e) => { e.preventDefault(); const v = view.querySelector("#kvOwn").value.trim(); if (v) location.hash = "#/kavram/" + encodeURIComponent(v); });
    const want = params && params[0] ? KM().byId(params[0]) || KM().find(params[0]) : null;
    if (want) open(want);
    function open(c) {
      if (R) R.close();
      view.querySelectorAll(".kv-c").forEach((b) => b.classList.toggle("is-on", b.dataset.k === c.id));
      view.querySelector(".kv-page").classList.add("is-open");              // seçici daralır: konuşma alanı üste gelsin (telefon)
      view.querySelector(".kv-change").hidden = false;
      R = roomFor(room, c);
    }
    view.querySelector(".kv-change").addEventListener("click", () => { location.hash = "#/kavram"; });
    return () => { if (R) R.close(); R = null; };
  }

  function roomFor(room, c) {
    const name = T(c.ad[0], c.ad[1]);
    const S = { msgs: [], ctrl: null, holo: null, v: null, raf: 0, on: true, muted: App.prefs.get("kvMuted", false) === true, natural: App.prefs.get("kvNatural", true) !== false && naturalAvailable(), mode: App.prefs.get("kvMode", "window"), listen: null, sil: 0, live: null };
    room.innerHTML =
      '<section class="kv-room" style="--kc:#' + (c.renk || 0x5fe6ff).toString(16).padStart(6, "0") + '">' +
        '<div class="kv-stage" id="kvStage"><div class="kv-holo" id="kvHolo"></div>' +
          '<div class="kv-bar"><span class="kv-name">' + esc(name) + '</span><span class="kv-state" aria-live="polite"></span>' +
            '<div class="kv-tools"><div class="kv-seg" role="radiogroup" aria-label="' + esc(T("Görünüm", "View")) + '"><button type="button" role="radio" data-kv="window">' + esc(T("Pencere", "Window")) + '</button><button type="button" role="radio" data-kv="pyramid" title="' + esc(T("Telefonun üstüne konan plastik piramitle gerçek hologram", "Real hologram with a plastic pyramid on the phone")) + '">' + esc(T("Piramit", "Pyramid")) + "</button></div>" +
            '<button type="button" class="kv-ico" data-kv="mute" aria-pressed="false"></button>' +
            (naturalAvailable() ? '<button type="button" class="kv-ico" data-kv="natural" aria-pressed="false" title="' + esc(T("Gemini doğal ses (kendi anahtarınla)", "Gemini natural voice (your key)")) + '">' + esc(T("Doğal ses", "Natural")) + "</button>" : "") +
            '<button type="button" class="kv-ico" data-kv="full" aria-label="' + esc(T("Tam ekran", "Full screen")) + '">⛶</button></div></div>' +
          '<p class="kv-caption" aria-hidden="true"></p></div>' +
        '<div class="kv-log" role="log" aria-live="polite"></div>' +
        '<div class="kv-sug">' + SUGGEST.map((s) => '<button type="button" class="chip" data-sug="' + esc(T(s[0], s[1])) + '">' + esc(T(s[0], s[1])) + "</button>").join("") + "</div>" +
        '<form class="kv-ask"><input class="input" id="kvQ" autocomplete="off" maxlength="300" placeholder="' + esc(T(name + "'a sor …", "Ask " + name + " …")) + '">' +
          (App.speech && App.speech.sttMode() ? '<button type="button" class="btn kv-mic" data-kv="mic" aria-pressed="false" aria-label="' + esc(T("Sesle sor", "Ask by voice")) + '">' + App.icon("mic") + "</button>" : "") +
          '<button class="btn btn--primary" type="submit">' + esc(T("Sor", "Ask")) + '</button><button type="button" class="btn btn--ghost" data-kv="stop" hidden>' + esc(T("Sustur", "Stop")) + "</button></form>" +
        (App.speech && App.speech.ttsAvailable() ? "" : '<p class="hint">' + esc(T("Bu cihazda sesli okuma yok; kavram yazıyla konuşur, hologram yine okuma hızında atar.", "No text-to-speech here; the concept answers in text and the hologram still pulses at reading speed.")) + "</p>") +
      "</section>";
    App.hydrateIcons && App.hydrateIcons(room);
    const $ = (s) => room.querySelector(s), log = $(".kv-log"), stateEl = $(".kv-state"), caption = $(".kv-caption"), stage = $("#kvStage"), stopBtn = $('[data-kv="stop"]');
    const setState = (p) => {
      if (S.holo) S.holo.setPhase(p);
      stateEl.textContent = { idle: "", thinking: T("düşünüyor…", "thinking…"), speaking: T("konuşuyor", "speaking"), listening: T("dinliyor…", "listening…") }[p] || "";
      stage.dataset.phase = p; stopBtn.hidden = !(p === "thinking" || p === "speaking");
    };
    function paintTools() {
      room.querySelectorAll('[data-kv="window"],[data-kv="pyramid"]').forEach((b) => b.setAttribute("aria-checked", String(b.dataset.kv === S.mode)));
      const m = $('[data-kv="mute"]'); m.setAttribute("aria-pressed", String(!S.muted)); m.textContent = S.muted ? T("Ses kapalı", "Muted") : T("Ses açık", "Sound on");
      const n = $('[data-kv="natural"]'); if (n) n.setAttribute("aria-pressed", String(S.natural));
    }
    function newVoice() {
      if (S.v) S.v.dispose();
      S.v = voice({ pitch: c.ses[0], rate: c.ses[1], natural: S.natural, muted: S.muted,
        onStart: (txt) => { caption.textContent = txt; setState("speaking"); },
        onIdle: () => { caption.textContent = ""; if (!S.ctrl) setState("idle"); },
        onNaturalFail: () => { S.natural = false; paintTools(); App.ui.toast(T("Doğal ses kullanılamadı; cihaz sesine geçildi.", "Natural voice unavailable; using the device voice."), "info"); } });
    }
    newVoice(); paintTools();
    function bubble(who, html, cls) {
      const d = document.createElement("div"); d.className = "kv-msg kv-msg--" + who + (cls ? " " + cls : ""); d.innerHTML = html; log.appendChild(d); log.scrollTop = log.scrollHeight; return d;
    }
    // hologram
    (async () => {
      try {
        await App.kavramHolo.load();
        if (!S.on) return;
        S.holo = App.kavramHolo.create($("#kvHolo"), c, { mode: S.mode });
        const tick = () => { if (!S.on) return; if (S.holo) S.holo.setLevel(S.v.level(performance.now())); S.raf = requestAnimationFrame(tick); };
        tick();
      } catch (e) { $("#kvHolo").innerHTML = '<p class="hint kv-nogl">' + esc(T("Bu cihazda 3B görüntü açılamadı; konuşma yine çalışır.", "3D view unavailable on this device; the conversation still works.")) + "</p>"; }
    })();

    /* ---- konuşma ---- */
    async function ask(q, greet) {
      if (!greet && !q) return;
      cancel();
      if (!greet) { S.msgs.push({ role: "user", content: q }); bubble("me", esc(q)); }
      const live = bubble("it", '<span class="kv-dots"><i></i><i></i><i></i></span>'); S.live = live;
      const ctrl = new AbortController(); S.ctrl = ctrl; let timedOut = false;
      const timer = setTimeout(() => { timedOut = true; ctrl.abort(); }, ASK_MS);
      setState("thinking");
      const ch = KM().chunker((s) => S.v.say(s));
      let full = "";
      const sys = { role: "system", content: KM().system(c, App.i18n.lang) };
      const hist = S.msgs.slice(-HISTORY);
      const msgs = greet ? [sys, { role: "user", content: T("Kendini kısaca tanıt ve bana bir soru sor.", "Briefly introduce yourself and ask me a question.") }] : [sys].concat(hist);
      try {
        const text = await stream(msgs, ctrl.signal, (piece, f) => {
          if (S.ctrl !== ctrl) return;
          if (piece === null) { full = ""; return; }               // yedek motora geçildi: baştan
          full = f; ch.push(piece); live.innerHTML = App.markdown.render(full);
          log.scrollTop = log.scrollHeight;
        });
        if (S.ctrl !== ctrl) return;
        if (!full && text) { ch.push(text); live.innerHTML = App.markdown.render(text); }   // akışsız motor
        ch.flush();
        S.msgs.push({ role: "assistant", content: text || full });
      } catch (e) {
        if (S.ctrl !== ctrl) return;
        if (e && e.name === "AbortError" && !timedOut) { live.remove(); return; }
        live.classList.add("is-err"); live.innerHTML = esc(errText(timedOut ? { code: "timeout" } : e)) + ' <button type="button" class="btn btn--sm" data-retry>' + esc(T("Tekrar sor", "Ask again")) + "</button>";
        if (!greet) S.msgs.pop();
        S.retry = greet ? () => ask("", true) : () => ask(q);
      } finally {
        clearTimeout(timer);
        if (S.ctrl === ctrl) { S.ctrl = null; if (!S.v.busy()) setState("idle"); }
      }
    }
    function cancel() { if (S.ctrl) S.ctrl.abort(); S.ctrl = null; S.v.stop(); caption.textContent = ""; setState("idle"); }
    // selamlama: katalogdan anında (internetsiz); katalog dışı kavramda yapay zekâdan
    if (c.selam && App.i18n.lang !== "en") {
      bubble("it", esc(c.selam)); S.msgs.push({ role: "assistant", content: c.selam });
      const ch = KM().chunker((s) => S.v.say(s)); ch.push(c.selam); ch.flush();
    } else ask("", true);

    /* ---- mikrofon ---- */
    function micStop(send) {
      const L = S.listen; if (!L) return; S.listen = null; clearTimeout(S.sil);
      $('[data-kv="mic"]') && $('[data-kv="mic"]').setAttribute("aria-pressed", "false");
      if (S.holo) S.holo.setMic(0);
      L.stop().then((r) => { setState("idle"); const t = (r && r.text) || $("#kvQ").value; if (send && t.trim()) { $("#kvQ").value = ""; ask(t.trim()); } });
    }
    function micStart() {
      cancel();
      const inp = $("#kvQ"); inp.value = "";
      S.listen = App.speech.listen({ lang: App.i18n.lang === "en" ? "en" : "tr",
        onPartial: (t) => { inp.value = t; },
        onFinal: (t, all) => { inp.value = all; clearTimeout(S.sil); S.sil = setTimeout(() => micStop(true), 1400); },
        onLevel: (l) => { if (S.holo) S.holo.setMic(l); },
        onError: (code) => { micStop(false); App.ui.toast(code === "not-allowed" || code === "denied" ? T("Mikrofon izni verilmedi.", "Microphone permission denied.") : T("Ses tanınamadı; yazarak sorabilirsin.", "Speech not recognised; type your question."), "error"); } });
      $('[data-kv="mic"]').setAttribute("aria-pressed", "true"); setState("listening");
    }

    room.addEventListener("click", (e) => {
      const r = e.target.closest("[data-retry]"); if (r && S.retry) { r.closest(".kv-msg").remove(); S.retry(); return; }
      const sg = e.target.closest("[data-sug]"); if (sg) { ask(sg.dataset.sug); return; }
      const b = e.target.closest("[data-kv]"); if (!b) return;
      const k = b.dataset.kv;
      if (k === "window" || k === "pyramid") { S.mode = k; App.prefs.set("kvMode", k); if (S.holo) S.holo.setMode(k); paintTools(); }
      else if (k === "mute") { S.muted = !S.muted; App.prefs.set("kvMuted", S.muted); S.v.setMuted(S.muted); paintTools(); }
      else if (k === "natural") { S.natural = !S.natural; App.prefs.set("kvNatural", S.natural); newVoice(); paintTools(); }
      else if (k === "full") { if (document.fullscreenElement) document.exitFullscreen(); else if (stage.requestFullscreen) stage.requestFullscreen().catch(() => {}); }
      else if (k === "stop") cancel();
      else if (k === "mic") { if (S.listen) micStop(true); else micStart(); }
    });
    $(".kv-ask").addEventListener("submit", (e) => { e.preventDefault(); const inp = $("#kvQ"), q = inp.value.trim(); if (S.listen) { micStop(true); return; } inp.value = ""; ask(q); });
    stage.scrollIntoView({ behavior: "smooth", block: "start" });
    stage.__kvState = () => ({ phase: stage.dataset.phase, voice: S.v.level(performance.now()), holo: S.holo && S.holo.state(), natural: S.natural, msgs: S.msgs.length });   // sınama ve tanı için
    return {
      close() {
        if (!S.on) return; S.on = false;
        cancelAnimationFrame(S.raf); if (S.ctrl) S.ctrl.abort(); if (S.listen) micStop(false);
        S.v.dispose(); if (S.holo) S.holo.dispose();
        if (document.fullscreenElement === stage) document.exitFullscreen().catch(() => {});
        room.innerHTML = "";
      },
      _S: S
    };
  }

  App.router.register("kavram", render);
  App.kavram = { voice };
})();
