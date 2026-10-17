/* =========================================================
   voice.js — Sesli öğretmen modu (eller serbest sohbet)

   Öğrenci konuşur → yazıya çevrilir → asistan cevaplar → cevap sesli okunur →
   yeniden dinlemeye geçilir. Tam ekran bir pencerede çalışır; "Bitir" ile kapanır
   ve konuşma sohbet geçmişine "🎙" ile başlayan bir sohbet olarak kaydedilir.

   • Ses tanıma: App.speech (Android: telefonun motoru, Chrome/Edge: Web Speech,
     Windows uygulaması: kayıt + yapay zekâyla yazıya çevirme).
   • Konuşma bitişi: son sözden ~1,6 sn sonra kendiliğinden gönderilir; "Gönder" ile
     hemen gönderilebilir (kayıt modunda bu düğme gerekir).
   • Cevaplar sesli sohbete uygun istenir: kısa, konuşur gibi, formülleri sözle.
     Okunurken formüller App.a11y.speakable ile sözcüklere çevrilir.
   • Görme güçlüğü olan öğrenciler için de tam sesli kullanım sağlar.
   ========================================================= */
(function () {
  const { esc, uid } = App.utils;
  const T = (tr, en) => (App.i18n.lang === "en" ? en : tr);
  const SILENCE_MS = 1600;

  let s = null;          // aktif oturum

  const VOICE_HINT_TR = "\n\n[Sesli sohbet: Cevabın sesli okunacak. Konuşur gibi, kısa ve sade cevap ver (en fazla 5–6 cümle). Tablo, madde işareti ve uzun formül kullanma; gerekirse formülü sözle anlat. Gerekiyorsa sonunda öğrenciye kısa bir soru sor.]";
  const VOICE_HINT_EN = "\n\n[Voice chat: your answer will be read aloud. Answer briefly and conversationally (max 5–6 sentences). No tables, bullets or long formulas; say formulas in words. If useful, end with a short question for the student.]";

  function toSpeech(md) {
    const div = document.createElement("div");
    div.innerHTML = App.markdown.render(App.cite ? App.cite.strip(md || "") : (md || ""));
    return App.a11y && App.a11y.speakable ? App.a11y.speakable(div) : div.textContent;
  }

  function paint() {
    if (!s) return;
    const st = s.el.querySelector("#vState"), orb = s.el.querySelector(".voice-orb");
    const label = {
      idle: T("Hazır", "Ready"), listening: T("Dinliyorum…", "Listening…"), thinking: T("Düşünüyorum…", "Thinking…"),
      speaking: T("Anlatıyorum…", "Speaking…"), error: T("Bir sorun oldu", "Something went wrong")
    }[s.phase] || "";
    st.textContent = label;
    orb.className = "voice-orb is-" + s.phase;
    s.el.querySelector("#vSend").hidden = s.phase !== "listening";
    s.el.querySelector("#vSkip").hidden = s.phase !== "speaking";
    s.el.querySelector("#vHeard").textContent = s.heard || "";
    s.el.querySelector("#vAnswer").innerHTML = s.answer ? App.markdown.render(App.cite ? App.cite.strip(s.answer) : s.answer) : "";
  }

  function listen() {
    if (!s || s.closed) return;
    s.phase = "listening"; s.heard = ""; paint();
    let finalText = "", timer = null;
    const finish = async () => {
      clearTimeout(timer);
      if (!s || !s.rec) return;
      const rec = s.rec; s.rec = null;
      const out = await rec.stop().catch(() => ({ text: "" }));
      const text = (out.text || finalText || s.heard || "").trim();
      if (!s || s.closed) return;
      if (!text) { listen(); return; }
      ask(text);
    };
    s.finish = finish;
    s.rec = App.speech.listen({
      lang: App.i18n.lang,
      onPartial: (p) => { if (!s) return; s.heard = (finalText ? finalText + " " : "") + p; paint(); clearTimeout(timer); timer = setTimeout(finish, SILENCE_MS + 800); },
      onFinal: (piece, full) => { if (!s) return; finalText = full; s.heard = full; paint(); clearTimeout(timer); timer = setTimeout(finish, SILENCE_MS); },
      onLevel: (v) => { if (s) s.el.querySelector(".voice-orb").style.setProperty("--lvl", String(v)); },
      onError: (code) => {
        if (!s) return;
        s.phase = "error"; paint();
        s.el.querySelector("#vHeard").textContent = code === "permission" ? T("Mikrofon izni gerekiyor.", "Microphone permission is needed.")
          : code === "unsupported" ? T("Bu cihazda ses tanıma yok.", "Speech recognition isn't available here.") : T("Ses anlaşılamadı, tekrar dene.", "Couldn't hear that, try again.");
        s.el.querySelector("#vRetry").hidden = false;
      }
    });
  }

  async function ask(text) {
    if (!s) return;
    s.phase = "thinking"; s.heard = text; s.answer = ""; paint();
    const userMsg = { id: uid("m"), role: "user", text, at: new Date().toISOString() };
    s.controller = new AbortController();
    try {
      const res = await App.ai.run({
        text: text + (App.i18n.lang === "en" ? VOICE_HINT_EN : VOICE_HINT_TR),
        history: s.messages.slice(-8),
        useData: true,
        signal: s.controller.signal,
        on: { delta: (full) => { if (s) { s.answer = full; paint(); } } }
      });
      if (!s || s.closed) return;
      s.answer = res.text;
      s.messages.push(userMsg, { id: uid("m"), role: "assistant", text: res.text, models: res.models, engine: res.engine, at: new Date().toISOString() });
      speak(res.text);
    } catch (e) {
      if (!s || s.closed || (e && e.code === "aborted")) return;
      s.phase = "error"; s.answer = ""; paint();
      s.el.querySelector("#vHeard").textContent = T("Yapay zekâ cevap veremedi: ", "The AI couldn't answer: ") + ((e && e.message) || "");
      s.el.querySelector("#vRetry").hidden = false;
    }
  }

  function speak(md) {
    if (!s) return;
    if (!App.speech.ttsAvailable()) { listen(); return; }
    s.phase = "speaking"; paint();
    App.speech.say(toSpeech(md), {
      lang: App.i18n.lang,
      rate: Number(App.prefs.get("ttsRate", 1)) || 1,
      onEnd: () => { if (s && !s.closed && s.phase === "speaking") listen(); },
      onError: () => { if (s && !s.closed) listen(); }
    });
  }

  async function close() {
    if (!s) return;
    const cur = s; s = null;
    cur.closed = true;
    try { if (cur.controller) cur.controller.abort(); } catch (e) { /* yok */ }
    try { if (cur.rec) cur.rec.stop(); } catch (e) { /* yok */ }
    App.speech.stopSaying();
    cur.el.remove();
    document.removeEventListener("keydown", cur.onKey, true);
    if (cur.messages.length) {
      const first = cur.messages[0].text.replace(/\s+/g, " ").trim();
      const chat = { id: uid("chat"), title: "🎙 " + (first.length > 55 ? first.slice(0, 52) + "…" : first), voice: true,
        createdAt: cur.startedAt, updatedAt: new Date().toISOString(), messages: cur.messages };
      await App.db.put("chats", chat);
      App.ui.toast(T("Sesli sohbet kaydedildi.", "Voice chat saved."));
      App.router.go("sohbet/" + chat.id);
      if (App.badges) App.badges.check();
    }
  }

  function open() {
    if (s) return;
    if (!App.speech.sttMode()) {
      App.ui.toast(T("Bu cihazda ses tanıma kullanılamıyor. Chrome/Edge tarayıcısı, Android uygulaması ya da internet modu gerekir.",
        "Speech recognition isn't available here. Use Chrome/Edge, the Android app or online mode."), "error");
      return;
    }
    const el = document.createElement("div");
    el.className = "voice-overlay";
    el.setAttribute("role", "dialog");
    el.setAttribute("aria-label", T("Sesli öğretmen", "Voice teacher"));
    el.innerHTML =
      '<div class="voice-top"><span class="voice-title">' + App.icon("mic") + esc(T("Sesli öğretmen", "Voice teacher")) + "</span>" +
        '<button class="btn btn--sm" type="button" id="vClose">' + App.icon("close") + esc(T("Bitir", "Finish")) + "</button></div>" +
      '<div class="voice-center"><div class="voice-orb is-idle"><span></span></div><p class="voice-state" id="vState" aria-live="polite"></p>' +
        '<p class="voice-heard" id="vHeard"></p></div>' +
      '<div class="voice-answer md" id="vAnswer" aria-live="polite"></div>' +
      '<div class="voice-actions">' +
        '<button class="btn btn--primary" type="button" id="vSend" hidden>' + App.icon("send") + esc(T("Gönder", "Send")) + "</button>" +
        '<button class="btn" type="button" id="vSkip" hidden>' + App.icon("stop") + esc(T("Sustur, ben konuşayım", "Stop, let me talk")) + "</button>" +
        '<button class="btn" type="button" id="vRetry" hidden>' + App.icon("refresh") + esc(T("Tekrar dinle", "Listen again")) + "</button>" +
      "</div>" +
      '<p class="hint voice-tip">' + esc(T("Sorunu söyle, kısa bir sessizlikten sonra kendiliğinden gönderilir. Cevaplar sesli okunur, sonra yeniden seni dinlerim.",
        "Say your question; it sends after a short pause. Answers are read aloud, then I listen again.")) + "</p>";
    document.body.appendChild(el);
    App.hydrateIcons(el);
    s = { el, phase: "idle", heard: "", answer: "", messages: [], startedAt: new Date().toISOString(), rec: null, controller: null };
    s.onKey = (e) => { if (e.key === "Escape") { e.preventDefault(); close(); } };
    document.addEventListener("keydown", s.onKey, true);
    el.querySelector("#vClose").addEventListener("click", close);
    el.querySelector("#vSend").addEventListener("click", () => { if (s && s.finish) s.finish(); });
    el.querySelector("#vSkip").addEventListener("click", () => { App.speech.stopSaying(); if (s) listen(); });
    el.querySelector("#vRetry").addEventListener("click", (e) => { e.currentTarget.hidden = true; listen(); });
    listen();
  }

  App.voice = { open, close, isOpen: () => !!s };
})();
