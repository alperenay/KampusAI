/* =========================================================
   language-practice.js — Kendi hızında dil pratiği (v1.47 Almanca, v1.51 İngilizce + ortak motor)
   #/konusma/de (Deutsch) · #/konusma/pratik (English)

   İki dil aynı akışı paylaşır; yalnızca içerik (js/data/languages.js + languages-ext.js) farklıdır:
     Kelimeler   kart: sözcük → anlamı göster
     Kelime testi  sözcüğün anlamını dört seçenekten seç (çeldiriciler aynı seviyeden)
     Gramer      kural + boşluk doldurma
     Diyalog     karşı tarafın sözüne uygun yanıt
     Rol oyunu   çok adımlı gerçek hayat senaryosu (kafe, istasyon, doktor, münazara…); sonda puan
     Dinle-yaz   cümleyi dinle (yoksa göster), yaz; sözcük sözcük karşılaştırma
   İlk yanıtlar dil başına "language:<dil>:progress" tercihinde saklanır (seviye ilerlemesi buradan hesaplanır).
   ========================================================= */
(function () {
  const { esc } = App.utils,
    T = (tr, en) => (App.i18n.lang === "en" ? en : tr);
  const catalog = () => App.data.languages;
  const normalize = (s, locale) =>
    String(s || "")
      .toLocaleLowerCase(locale || "de-DE")
      .normalize("NFC")
      .trim()
      .replace(/\s+/g, " ");
  const LANGS = {
    de: { title: ["Almanca · Kendi hızında pratik", "German · Practise at your pace"], page: ["Almanca Pratiği", "German Practice"], lang: "de" },
    en: { title: ["İngilizce · Kendi hızında pratik", "English · Practise at your pace"], page: ["İngilizce Pratiği", "English Practice"], lang: "en" },
  };
  const MODES = [
    ["vocab", "Kelimeler", "Vocabulary"],
    ["test", "Kelime testi", "Word quiz"],
    ["quiz", "Gramer", "Grammar"],
    ["dialog", "Diyalog", "Dialogue"],
    ["role", "Rol oyunu", "Role-play"],
    ["dict", "Dinle-yaz", "Dictation"],
  ];
  const choices = () =>
    '<nav class="lang-choice" aria-label="' +
    T("Çalışma dili", "Study language") +
    '"><a class="btn" href="#/konusma">' + esc(T("English · konuşma", "English · speaking")) +
    '</a><a class="btn" href="#/konusma/pratik">' + esc(T("English · pratik", "English · practice")) +
    '</a><a class="btn" href="#/konusma/de">Deutsch</a></nav>';
  const progKey = (lang) => "language:" + (lang || "de") + ":progress";
  function progress(lang) {
    const v = App.prefs.get(progKey(lang), {});
    return v && typeof v === "object" && !Array.isArray(v) ? v : {};
  }
  function record(key, correct, lang) {
    const p = progress(lang);
    if (!Object.prototype.hasOwnProperty.call(p, key)) {
      p[key] = { correct: !!correct, at: Date.now() };
      App.prefs.set(progKey(lang), p);
    }
    return p;
  }
  /** Tohumlu karıştırma: aynı soru her açılışta aynı sırayla gelir (doğru şık hep ilk sırada olmaz) */
  function order(n, seed) {
    const idx = Array.from({ length: n }, (_, i) => i);
    let s = 0;
    for (const ch of String(seed)) s = (s * 31 + ch.charCodeAt(0)) >>> 0;
    for (let i = n - 1; i > 0; i--) {
      s = (s * 1103515245 + 12345) >>> 0;
      const j = s % (i + 1);
      [idx[i], idx[j]] = [idx[j], idx[i]];
    }
    return idx;
  }
  /** Kelime testi: doğru anlam + aynı seviyeden üç çeldirici */
  function wordQuiz(rows, i) {
    const q = rows[i % rows.length], others = rows.filter((r) => r[1] !== q[1]);
    const pick = order(others.length, q[0]).slice(0, 3).map((k) => others[k][1]);
    const opts = [q[1]].concat(pick), ord = order(opts.length, q[0] + "#");
    return { prompt: q[0], options: ord.map((k) => opts[k]), answer: ord.indexOf(0) };
  }
  /** Dinle-yaz karşılaştırması: sözcük sözcük doğru/yanlış ve doğruluk oranı (noktalama yok sayılır) */
  function compareDictation(target, typed, locale) {
    const clean = (s) => normalize(s, locale).replace(/[.,!?;:"“”„'’]/g, "").split(" ").filter(Boolean);
    const a = clean(target), b = clean(typed);
    const words = a.map((w, i) => ({ w, ok: b[i] === w }));
    const right = words.filter((x) => x.ok).length;
    return { words, score: a.length ? right / a.length : 0, extra: Math.max(0, b.length - a.length) };
  }
  /** Seviye ilerlemesi: o seviyedeki ilk yanıtlardan doğru oranı */
  function levelStats(lang, level) {
    const p = progress(lang), keys = Object.keys(p).filter((k) => k.startsWith(level + ":"));
    return { n: keys.length, correct: keys.filter((k) => p[k].correct).length };
  }

  function page(view, langId) {
    const lang = LANGS[langId] ? langId : "de", meta = LANGS[lang];
    App.setTitle(T(meta.page[0], meta.page[1]));
    const D = catalog().profiles[lang],
      locale = D.locale,
      levels = catalog().levels;
    let level = App.prefs.get("language:" + lang + ":level", "A1"),
      mode = "vocab",
      index = 0,
      step = 0,
      roleScore = 0,
      answered = false,
      alive = true;
    if (!levels.includes(level)) level = "A1";
    const rowsFor = (m) => (m === "quiz" ? D.grammar : m === "dialog" ? D.dialogs : m === "role" ? D.roleplays : m === "dict" ? D.dictation : D.vocab)[level] || [];
    const say = (text, fb) => {
      if (App.speech.hasVoice(lang)) App.speech.say(text, { lang, rate: 0.85, onError: () => { if (alive && fb) fb.textContent = T("Ses açılamadı; ses paketini kontrol et veya metinle devam et.", "Audio could not start; check the voice package or continue with text."); } });
      else if (fb) fb.textContent = T("Bu dil için ses paketi bulunamadı; metinle devam et.", "No voice installed for this language; continue with text.");
    };
    const optionsHtml = (opts, ord) =>
      '<fieldset id="lpAnswers"><legend class="sr-only">' + T("Cevabını seç", "Choose your answer") + "</legend>" +
      ord.map((k) => '<label class="pr-option"><input type="radio" name="lpAnswer" value="' + k + '"><span lang="' + lang + '">' + esc(opts[k]) + "</span></label>").join("") +
      '</fieldset><button class="btn btn--primary" id="lpCheck">' + T("Kontrol et", "Check") + "</button>";

    function body(rows, q) {
      if (mode === "vocab")
        return '<h2 lang="' + lang + '">' + esc(q[0]) + '</h2><button class="btn" id="lpReveal">' + T("Anlamını göster", "Show meaning") + '</button><p id="lpMeaning" hidden>' + esc(q[1]) + "</p>";
      if (mode === "test") {
        const w = wordQuiz(rows, index);
        return "<h2>" + esc(T("Bu sözcüğün anlamı ne?", "What does this word mean?")) + '</h2><p lang="' + lang + '" class="lp-prompt">' + esc(w.prompt) + "</p>" +
          '<fieldset id="lpAnswers"><legend class="sr-only">' + T("Cevabını seç", "Choose your answer") + "</legend>" +
          w.options.map((o, k) => '<label class="pr-option"><input type="radio" name="lpAnswer" value="' + k + '"><span>' + esc(o) + "</span></label>").join("") +
          '</fieldset><button class="btn btn--primary" id="lpCheck">' + T("Kontrol et", "Check") + "</button>";
      }
      if (mode === "quiz") return "<h2>" + esc(q[0]) + "</h2><p>" + esc(q[1]) + '</p><p lang="' + lang + '" class="lp-prompt">' + esc(q[2]) + "</p>" + optionsHtml(q[3], order(q[3].length, q[2]));
      if (mode === "dialog") return "<h2>" + esc(T("Konuşmayı sürdür", "Continue the conversation")) + '</h2><p lang="' + lang + '" class="lp-prompt">' + esc(q[0]) + "</p>" + optionsHtml(q[1], order(q[1].length, q[0]));
      if (mode === "role") {
        const s = q.steps[step];
        return '<h2>' + esc(T(q.title[0], q.title[1])) + '</h2><p class="hint">' + esc(T(q.setting[0], q.setting[1])) + "</p>" +
          '<ol class="lp-role" aria-label="' + esc(T("Senaryo adımları", "Scenario steps")) + '">' + q.steps.map((_, k) => '<li class="' + (k < step ? "is-done" : k === step ? "is-now" : "") + '"></li>').join("") + "</ol>" +
          '<p lang="' + lang + '" class="lp-prompt lp-bubble">' + esc(s[0]) + "</p>" + optionsHtml(s[1], order(s[1].length, s[0]));
      }
      return "<h2>" + esc(T("Dinle ve yaz", "Listen and write")) + '</h2><p class="hint">' + esc(T("Dinle'ye bas, duyduğun cümleyi yaz. Ses yoksa cümleyi kısa süre göster.", "Press Listen and type the sentence. Without audio, peek at it briefly.")) + "</p>" +
        '<p id="lpPeek" class="lp-prompt" lang="' + lang + '" hidden>' + esc(q[0]) + "</p>" +
        '<label class="field"><span class="field__label">' + esc(T("Duyduğun cümle", "What you heard")) + '</span><input class="input" id="lpType" lang="' + lang + '" autocomplete="off" spellcheck="false"></label>' +
        '<div class="lp-actions"><button class="btn btn--primary" id="lpCheck">' + T("Kontrol et", "Check") + '</button><button class="btn btn--ghost" id="lpShow">' + T("Cümleyi göster", "Peek") + "</button></div>";
    }

    function paint() {
      const rows = rowsFor(mode), q = rows[index % rows.length];
      answered = false;
      const st = levelStats(lang, level), pct = st.n ? Math.round((st.correct / st.n) * 100) : 0;
      view.innerHTML =
        '<div class="page page--narrow lp">' + choices() +
        "<h1>" + esc(T(meta.title[0], meta.title[1])) + "</h1><p>" +
        esc(T("Kelimeyi öğren, kuralı uygula, diyalog kur, gerçek hayat senaryolarını oyna ve dinlediğini yaz. Seviyeler çalışma rehberidir; yerleştirme sınavı değildir.",
          "Learn words, apply grammar, hold dialogues, play real-life scenarios and write what you hear. Levels guide practice; this is not a placement exam.")) +
        '</p><label class="field">' + esc(T("Seviye", "Level")) + '<select class="select" id="lpLevel">' +
        levels.map((l) => "<option" + (l === level ? " selected" : "") + ">" + l + "</option>").join("") + "</select></label>" +
        '<p class="lp-level"><span>' + esc(level + " · " + T("ilk yanıtlarda doğru", "first answers correct") + ": " + st.correct + " / " + st.n) + '</span><span class="progress"><i style="width:' + pct + '%"></i></span></p>' +
        '<div class="lp-tabs" role="group" aria-label="' + esc(T("Etkinlik", "Activity")) + '">' +
        MODES.map(([id, tr, en]) => '<button class="btn" data-lpm="' + id + '" aria-pressed="' + (mode === id) + '">' + T(tr, en) + "</button>").join("") +
        '</div><section class="card lp-card"><p class="hint">' + level + " · " + ((index % rows.length) + 1) + " / " + rows.length +
        (mode === "role" ? " · " + T("adım ", "step ") + (step + 1) + "/" + q.steps.length : "") + "</p>" +
        body(rows, q) +
        '<p id="lpFeedback" role="status"></p><div class="lp-actions"><button class="btn" id="lpSpeak">' + T("Dinle", "Listen") + '</button><button class="btn" id="lpNext">' + T("Sonraki", "Next") + "</button></div></section>" +
        '<p class="hint" id="lpStats">' + T("İlk yanıtları kaydedilen pratik sayısı: ", "Practice items with a saved first answer: ") + Object.keys(progress(lang)).length + "</p>" +
        '<p class="hint">' + T("Ses paketi yoksa metinle devam edebilirsin. Yazılı diyalog seçimi gerçek konuşma/telaffuz değerlendirmesi değildir.", "If no voice is installed, continue with text. Choosing written replies does not assess spoken pronunciation.") + "</p></div>";
      const $ = (s) => view.querySelector(s), fb = $("#lpFeedback");
      $("#lpLevel").onchange = (e) => { level = e.target.value; App.prefs.set("language:" + lang + ":level", level); index = 0; step = 0; roleScore = 0; paint(); };
      view.querySelectorAll("[data-lpm]").forEach((b) => (b.onclick = () => { mode = b.dataset.lpm; index = 0; step = 0; roleScore = 0; paint(); }));
      $("#lpNext").onclick = () => {
        App.speech.stopSaying();
        if (mode === "role" && answered && step < q.steps.length - 1) { step++; paint(); return; }
        index++; step = 0; roleScore = 0; paint();
      };
      $("#lpSpeak").onclick = () => {
        const text = mode === "vocab" ? q[0] : mode === "test" ? wordQuiz(rows, index).prompt : mode === "quiz" ? q[2].replace("___", q[3][q[4]]) : mode === "role" ? q.steps[step][0] : q[0];
        say(text, fb);
      };
      if (mode === "vocab") { $("#lpReveal").onclick = () => { $("#lpMeaning").hidden = false; }; return; }
      if (mode === "dict") {
        $("#lpShow").onclick = () => { const p = $("#lpPeek"); p.hidden = false; setTimeout(() => { if (alive && p.isConnected) p.hidden = true; }, 2500); };
        $("#lpType").addEventListener("keydown", (e) => { if (e.key === "Enter") $("#lpCheck").click(); });
        $("#lpCheck").onclick = () => {
          const typed = $("#lpType").value;
          if (!typed.trim()) { fb.textContent = T("Önce duyduğunu yaz.", "Type what you heard first."); return; }
          const r = compareDictation(q[0], typed, locale);
          if (!answered) record(level + ":dict:" + (index % rows.length), r.score === 1 && !r.extra, lang);
          answered = true;
          fb.innerHTML = '<span class="lp-dict">' + r.words.map((w) => '<b class="' + (w.ok ? "is-ok" : "is-bad") + '">' + esc(w.w) + "</b>").join(" ") + "</span> " +
            esc(T("Doğruluk: %", "Accuracy: ") + Math.round(r.score * 100) + (App.i18n.lang === "en" ? "%" : "") + " · " + q[1]);
        };
        return;
      }
      $("#lpCheck").onclick = () => {
        const answer = $('input[name="lpAnswer"]:checked');
        if (!answer) { fb.textContent = T("Önce bir cevap seç.", "Choose an answer first."); return; }
        if (answered) return;
        answered = true;
        const v = +answer.value;
        let correct, explain;
        if (mode === "test") { const w = wordQuiz(rows, index); correct = v === w.answer; explain = w.prompt + " = " + w.options[w.answer]; record(level + ":test:" + (index % rows.length), correct, lang); }
        else if (mode === "quiz") { correct = v === q[4]; explain = q[1] + " " + q[2].replace("___", q[3][q[4]]); record(level + ":quiz:" + (index % rows.length), correct, lang); }
        else if (mode === "dialog") { correct = v === q[2]; explain = q[3] + " " + q[1][q[2]]; record(level + ":dialog:" + (index % rows.length), correct, lang); }
        else {
          const s = q.steps[step]; correct = v === s[2]; explain = s[3] + " " + s[1][s[2]];
          if (correct) roleScore++;
          if (step === q.steps.length - 1) {
            record(level + ":role:" + q.id, roleScore === q.steps.length, lang);
            explain += " — " + T("Senaryo bitti: ", "Scenario complete: ") + roleScore + "/" + q.steps.length;
          }
        }
        fb.textContent = (correct ? T("Doğru. ", "Correct. ") : T("Birlikte inceleyelim. ", "Let’s review. ")) + explain;
        $("#lpCheck").disabled = true;
        $("#lpAnswers").disabled = true;
        if (mode === "role" && step < q.steps.length - 1) $("#lpNext").textContent = T("Sonraki adım", "Next step");
      };
    }
    paint();
    return () => { alive = false; App.speech.stopSaying(); };
  }
  App.languagePractice = { page, choices, normalize, record, progress, wordQuiz, compareDictation, order, levelStats };
})();
