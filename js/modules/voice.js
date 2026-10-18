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

  // Alt kontrol çubuğu: ortadaki büyük düğme o anki duruma göre değişir (başparmakla ulaşılır)
  const MAIN = {
    listening: { icon: "send", tr: "Gönder", en: "Send" },
    speaking: { icon: "stop", tr: "Sustur", en: "Stop" },
    thinking: { icon: "close", tr: "Vazgeç", en: "Cancel" },
    error: { icon: "refresh", tr: "Tekrar dinle", en: "Listen again" },
    paused: { icon: "mic", tr: "Devam et", en: "Resume" },
    idle: { icon: "mic", tr: "Dinle", en: "Listen" }
  };

  function paint() {
    if (!s) return;
    const st = s.el.querySelector("#vState"), orb = s.el.querySelector(".voice-orb");
    const label = {
      idle: T("Hazır", "Ready"), listening: T("Dinliyorum…", "Listening…"), thinking: T("Düşünüyorum…", "Thinking…"),
      speaking: T("Anlatıyorum…", "Speaking…"), error: T("Bir sorun oldu", "Something went wrong"),
      paused: T("Duraklatıldı", "Paused")
    }[s.phase] || "";
    st.textContent = label;
    orb.className = "voice-orb is-" + s.phase;
    const m = MAIN[s.phase] || MAIN.idle;
    const main = s.el.querySelector("#vMain");
    if (main.dataset.phase !== s.phase) {
      main.dataset.phase = s.phase;
      main.innerHTML = App.icon(m.icon) + "<span>" + esc(T(m.tr, m.en)) + "</span>";
      main.setAttribute("aria-label", T(m.tr, m.en));
    }
    orb.setAttribute("aria-label", T(m.tr, m.en));
    const pause = s.el.querySelector("#vPause");
    pause.hidden = s.phase === "paused";
    s.el.querySelector("#vHeard").textContent = s.heard || (s.phase === "paused" ? T("Mikrofon kapalı. Hazır olunca Devam et'e dokun.", "Microphone is off. Tap Resume when ready.") : "");
    const ans = s.el.querySelector("#vAnswer");
    ans.innerHTML = s.answer ? App.markdown.render(App.cite ? App.cite.strip(s.answer) : s.answer) : "";
    if (s.answer) { const body = s.el.querySelector(".voice-body"); body.scrollTop = body.scrollHeight; }
  }

  /** Ortadaki büyük düğme (ya da küreye dokunma): duruma göre doğru işi yapar */
  function mainAction() {
    if (!s) return;
    const ph = s.phase;
    if (ph === "listening") { if (s.finish) s.finish(); }
    else if (ph === "speaking") { App.speech.stopSaying(); listen(); }
    else if (ph === "thinking") { try { if (s.controller) s.controller.abort(); } catch (e) { /* yok */ } s.answer = ""; listen(); }
    else listen();
  }

  /** Mikrofonu kapat: öğrenci düşünürken ya da ortam gürültülüyken */
  function pause() {
    if (!s) return;
    const rec = s.rec; s.rec = null; s.finish = null;
    try { if (rec) rec.stop(); } catch (e) { /* yok */ }
    try { if (s.controller) s.controller.abort(); } catch (e) { /* yok */ }
    App.speech.stopSaying();
    s.phase = "paused"; s.heard = ""; paint();
  }

  function listen() {
    if (!s || s.closed) return;
    s.phase = "listening"; s.heard = ""; paint();
    if (navigator.vibrate) try { navigator.vibrate(12); } catch (e) { /* yok */ }
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
      if (!s || s.closed || s.phase !== "thinking") return;
      s.answer = res.text;
      s.messages.push(userMsg, { id: uid("m"), role: "assistant", text: res.text, models: res.models, engine: res.engine, at: new Date().toISOString() });
      speak(res.text);
    } catch (e) {
      if (!s || s.closed || (e && e.code === "aborted")) return;
      s.phase = "error"; s.answer = ""; paint();
      s.el.querySelector("#vHeard").textContent = T("Yapay zekâ cevap veremedi: ", "The AI couldn't answer: ") + ((e && e.message) || "");
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
      onError: () => { if (s && !s.closed && s.phase === "speaking") listen(); }
    });
  }

  async function close(fromBack) {
    if (!s) return;
    const cur = s; s = null;
    window.removeEventListener("popstate", cur.onPop);
    // Açarken eklenen geçmiş kaydını temizle (sohbete geçilecekse yerinde bırak, hash değişimi üstüne yazar)
    if (fromBack !== true && history.state && history.state.voice) {
      try { if (cur.messages.length) history.replaceState(null, ""); else history.back(); } catch (e) { /* yok */ }
    }
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
        '<button class="icon-btn" type="button" id="vClose" title="' + esc(T("Bitir", "Finish")) + '" aria-label="' + esc(T("Bitir", "Finish")) + '">' + App.icon("close") + "</button></div>" +
      '<div class="voice-body">' +
        '<div class="voice-center"><button class="voice-orb is-idle" type="button" id="vOrb"><span></span></button>' +
          '<p class="voice-state" id="vState" aria-live="polite"></p><p class="voice-heard" id="vHeard"></p></div>' +
        '<div class="voice-answer md" id="vAnswer" aria-live="polite"></div>' +
        '<p class="hint voice-tip">' + esc(T("Sorunu söyle, kısa bir sessizlikten sonra kendiliğinden gönderilir. Cevaplar sesli okunur, sonra yeniden seni dinlerim. Küreye dokunmak ortadaki düğmeyle aynı işi yapar.",
          "Say your question; it sends after a short pause. Answers are read aloud, then I listen again. Tapping the orb does the same as the middle button.")) + "</p>" +
      "</div>" +
      '<div class="voice-dock">' +
        '<button class="voice-dock__btn voice-dock__btn--end" type="button" id="vEnd">' + App.icon("close") + "<span>" + esc(T("Bitir", "Finish")) + "</span></button>" +
        '<button class="voice-dock__btn voice-dock__btn--main" type="button" id="vMain"></button>' +
        '<button class="voice-dock__btn" type="button" id="vPause">' + App.icon("pause") + "<span>" + esc(T("Duraklat", "Pause")) + "</span></button>" +
      "</div>";
    document.body.appendChild(el);
    App.hydrateIcons(el);
    s = { el, phase: "idle", heard: "", answer: "", messages: [], startedAt: new Date().toISOString(), rec: null, controller: null };
    s.onKey = (e) => { if (e.key === "Escape") { e.preventDefault(); close(); } else if (e.key === " " && e.target === document.body) { e.preventDefault(); mainAction(); } };
    document.addEventListener("keydown", s.onKey, true);
    el.querySelector("#vClose").addEventListener("click", close);
    el.querySelector("#vEnd").addEventListener("click", close);
    el.querySelector("#vMain").addEventListener("click", mainAction);
    el.querySelector("#vOrb").addEventListener("click", mainAction);
    el.querySelector("#vPause").addEventListener("click", pause);
    // Android geri tuşu / tarayıcı geri: sohbeti kaydedip kapat (sayfadan çıkmaz)
    history.pushState({ voice: true }, "");
    s.onPop = () => { if (s) close(true); };
    window.addEventListener("popstate", s.onPop);
    listen();
  }

  App.voice = { open, close, isOpen: () => !!s };
})();
