(function () {
  const { esc } = App.utils,
    T = (tr, en) => (App.i18n.lang === "en" ? en : tr);
  const catalog = () => App.data.languages;
  const normalize = (s) =>
    String(s || "")
      .toLocaleLowerCase("de-DE")
      .normalize("NFC")
      .trim()
      .replace(/\s+/g, " ");
  const choices = () =>
    '<nav class="lang-choice" aria-label="' +
    T("Çalışma dili", "Study language") +
    '"><a class="btn" href="#/konusma">English</a><a class="btn" href="#/konusma/de">Deutsch</a></nav>';
  function progress() {
    const v = App.prefs.get("language:de:progress", {});
    return v && typeof v === "object" && !Array.isArray(v) ? v : {};
  }
  function record(key, correct) {
    const p = progress();
    if (!Object.prototype.hasOwnProperty.call(p, key)) {
      p[key] = { correct: !!correct, at: Date.now() };
      App.prefs.set("language:de:progress", p);
    }
    return p;
  }
  function page(view) {
    App.setTitle(T("Almanca Pratiği", "German Practice"));
    const D = catalog().profiles.de,
      levels = catalog().levels;
    let level = App.prefs.get("language:de:level", "A1"),
      mode = "vocab",
      index = 0,
      answered = false,
      alive = true;
    if (!levels.includes(level)) level = "A1";
    function paint() {
      const rows =
          D[
            mode === "quiz"
              ? "grammar"
              : mode === "dialog"
                ? "dialogs"
                : "vocab"
          ][level],
        q = rows[index % rows.length];
      answered = false;
      view.innerHTML =
        '<div class="page page--narrow lp">' +
        choices() +
        "<h1>" +
        esc(
          T("Almanca · Kendi hızında pratik", "German · Practise at your pace"),
        ) +
        "</h1><p>" +
        esc(
          T(
            "Kelimeyi artikeliyle öğren, kuralı uygula, kısa diyalog kur. Seviyeler çalışma rehberidir; yerleştirme sınavı değildir.",
            "Learn vocabulary, apply grammar and practise short dialogues. Levels guide practice; this is not a placement exam.",
          ),
        ) +
        '</p><label class="field">' +
        esc(T("Seviye", "Level")) +
        '<select class="select" id="lpLevel">' +
        levels
          .map(
            (l) =>
              "<option" +
              (l === level ? " selected" : "") +
              ">" +
              l +
              "</option>",
          )
          .join("") +
        '</select></label><div class="lp-tabs" role="group" aria-label="' +
        esc(T("Etkinlik", "Activity")) +
        '">' +
        [
          ["vocab", "Kelimeler", "Vocabulary"],
          ["quiz", "Gramer", "Grammar"],
          ["dialog", "Diyalog", "Dialogue"],
        ]
          .map(
            ([id, tr, en]) =>
              '<button class="btn" data-lpm="' +
              id +
              '" aria-pressed="' +
              (mode === id) +
              '">' +
              T(tr, en) +
              "</button>",
          )
          .join("") +
        '</div><section class="card lp-card"><p class="hint">' +
        level +
        " · " +
        ((index % rows.length) + 1) +
        " / " +
        rows.length +
        "</p>" +
        (mode === "vocab"
          ? '<h2 lang="de">' +
            esc(q[0]) +
            '</h2><button class="btn" id="lpReveal">' +
            T("Anlamını göster", "Show meaning") +
            '</button><p id="lpMeaning" hidden>' +
            esc(q[1]) +
            "</p>"
          : "<h2>" +
            esc(
              mode === "quiz"
                ? q[0]
                : T("Konuşmayı sürdür", "Continue the conversation"),
            ) +
            "</h2>" +
            (mode === "quiz" ? "<p>" + esc(q[1]) + "</p>" : "") +
            '<p lang="de" class="lp-prompt">' +
            esc(mode === "quiz" ? q[2] : q[0]) +
            '</p><fieldset id="lpAnswers"><legend class="sr-only">' +
            T("Cevabını seç", "Choose your answer") +
            "</legend>" +
            (mode === "quiz" ? q[3] : q[1])
              .map(
                (s, i) =>
                  '<label class="pr-option"><input type="radio" name="lpAnswer" value="' +
                  i +
                  '"><span lang="de">' +
                  esc(s) +
                  "</span></label>",
              )
              .join("") +
            '</fieldset><button class="btn btn--primary" id="lpCheck">' +
            T("Kontrol et", "Check") +
            "</button>") +
        '<p id="lpFeedback" role="status"></p><div class="lp-actions"><button class="btn" id="lpSpeak">' +
        T("Dinle", "Listen") +
        '</button><button class="btn" id="lpNext">' +
        T("Sonraki", "Next") +
        '</button></div></section><p class="hint" id="lpStats">' +
        T(
          "İlk yanıtları kaydedilen pratik sayısı: ",
          "Practice items with a saved first answer: ",
        ) +
        Object.keys(progress()).length +
        '</p><p class="hint">' +
        T(
          "Ses paketi yoksa metinle devam edebilirsin. Yazılı diyalog seçimi gerçek konuşma/telaffuz değerlendirmesi değildir.",
          "If no voice is installed, continue with text. Choosing written replies does not assess spoken pronunciation.",
        ) +
        "</p></div>";
      const $ = (s) => view.querySelector(s);
      $("#lpLevel").onchange = (e) => {
        level = e.target.value;
        App.prefs.set("language:de:level", level);
        index = 0;
        paint();
      };
      view.querySelectorAll("[data-lpm]").forEach(
        (b) =>
          (b.onclick = () => {
            mode = b.dataset.lpm;
            index = 0;
            paint();
          }),
      );
      $("#lpNext").onclick = () => {
        App.speech.stopSaying();
        index++;
        paint();
      };
      $("#lpSpeak").onclick = () => {
        const text =
          mode === "vocab"
            ? q[0]
            : mode === "quiz"
              ? q[2].replace("___", q[3][q[4]])
              : q[0];
        if (App.speech.hasVoice("de"))
          App.speech.say(text, { lang: "de", rate: 0.85, onError: () => { const feedback = $("#lpFeedback"); if (alive && feedback) feedback.textContent = T("Almanca ses açılamadı; ses paketini kontrol et veya metinle devam et.", "German audio could not start; check the voice package or continue with text."); } });
        else
          $("#lpFeedback").textContent = T(
            "Almanca ses paketi bulunamadı; metinle devam et.",
            "No German voice installed; continue with text.",
          );
      };
      if (mode === "vocab")
        $("#lpReveal").onclick = () => {
          $("#lpMeaning").hidden = false;
        };
      else
        $("#lpCheck").onclick = () => {
          const answer = $('input[name="lpAnswer"]:checked');
          if (!answer) {
            $("#lpFeedback").textContent = T(
              "Önce bir cevap seç.",
              "Choose an answer first.",
            );
            return;
          }
          if (answered) return;
          answered = true;
          const correct = +answer.value === (mode === "quiz" ? q[4] : q[2]);
          record(level + ":" + mode + ":" + (index % rows.length), correct);
          $("#lpFeedback").textContent =
            (correct
              ? T("Doğru. ", "Correct. ")
              : T("Birlikte inceleyelim. ", "Let’s review. ")) +
            (mode === "quiz"
              ? q[1] + " " + q[2].replace("___", q[3][q[4]])
              : q[3] + " " + q[1][q[2]]);
          $("#lpCheck").disabled = true;
          $("#lpAnswers").disabled = true;
        };
    }
    paint();
    return () => {
      alive = false;
      App.speech.stopSaying();
    };
  }
  App.languagePractice = { page, choices, normalize, record, progress };
})();
