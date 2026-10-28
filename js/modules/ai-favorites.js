(function () {
  const { esc } = App.utils,
    T = (tr, en) => (App.i18n.lang === "en" ? en : tr);
  const tools = [
    {
      id: "solve",
      icon: "scan",
      tr: "Soru Çözücü",
      en: "Question Solver",
      prompt:
        "Sorumu adım adım çöz ve her adımın nedenini açıkla. Sorumu aşağıya yazacağım: ",
    },
    {
      id: "coach",
      icon: "compass",
      tr: "Sokratik Koç",
      en: "Socratic Coach",
      prompt:
        "Bu konuda doğrudan cevabı vermeden, tek tek sorular sorarak düşünmeme yardımcı ol: ",
      coach: true,
    },
    {
      id: "summary",
      icon: "note",
      tr: "Not Özetleyici",
      en: "Note Summarizer",
      prompt:
        "Aşağıdaki notları ana fikirler, kavramlar ve kısa tekrar soruları olarak özetle. Notlarım: ",
    },
    {
      id: "plan",
      icon: "calendar",
      tr: "Çalışma Planlayıcı",
      en: "Study Planner",
      prompt:
        "Hedefim ve ayırabileceğim süreye göre gerçekçi bir çalışma planı hazırlamama yardım et. Hedefim ve sürem: ",
    },
    {
      id: "cards",
      icon: "layers",
      tr: "Kart Hazırlayıcı",
      en: "Flashcard Drafts",
      prompt:
        "Bu metinden soru-cevap şeklinde kısa tekrar kartları taslakları hazırla: ",
    },
    {
      id: "explain",
      icon: "lightbulb",
      tr: "Kavram Açıklayıcı",
      en: "Concept Explainer",
      prompt:
        "Bu kavramı basit bir örnekle açıkla, sonra anlamamı kontrol edecek bir soru sor: ",
    },
  ];
  function pins() {
    const p = App.prefs.get("aiFavoriteTools", ["solve", "coach", "summary"]);
    return Array.isArray(p)
      ? [...new Set(p)]
          .filter((id) => tools.some((t) => t.id === id))
          .slice(0, 6)
      : [];
  }
  function toggle(id) {
    if (!tools.some((t) => t.id === id)) return false;
    const p = pins(),
      on = !p.includes(id);
    App.prefs.set(
      "aiFavoriteTools",
      on ? p.concat(id) : p.filter((x) => x !== id),
    );
    return on;
  }
  function html() {
    return (
      '<section class="ai-favs" aria-label="' +
      esc(T("Favori araçlar", "Favourite tools")) +
      '"><h2>' +
      T("Favori araçların", "Your favourite tools") +
      '</h2><p class="hint">' +
      T(
        "Bir araç seç; hazır başlangıcı düzenleyip sorunu gönder. Sabitlemelerin bu cihazda saklanır.",
        "Choose a tool, edit its starting prompt and send your question. Pins are saved on this device.",
      ) +
      "</p><div data-ai-favs></div></section>"
    );
  }
  function mount(root) {
    if (!root) return;
    function paint() {
      const p = pins();
      root.innerHTML =
        '<div class="ai-fav-grid">' +
        p
          .map((id) => {
            const x = tools.find((t) => t.id === id);
            return (
              '<div class="ai-fav"><button class="btn" type="button" data-aif-open="' +
              id +
              '">' +
              App.icon(x.icon) +
              esc(T(x.tr, x.en)) +
              '</button><button class="icon-btn" type="button" data-aif-pin="' +
              id +
              '" aria-label="' +
              esc(T("Sabitlemeyi kaldır: ", "Unpin: ") + T(x.tr, x.en)) +
              '">' +
              App.icon("close") +
              "</button></div>"
            );
          })
          .join("") +
        "</div>" +
        (p.length
          ? ""
          : '<p class="hint">' +
            T(
              "Henüz favorin yok. Aşağıdan araç ekleyebilirsin.",
              "No favourites yet. Add tools below.",
            ) +
            "</p>") +
        "<details><summary>" +
        T("Favorileri düzenle", "Edit favourites") +
        '</summary><div class="ai-fav-options">' +
        tools
          .map(
            (x) =>
              '<button class="btn" type="button" data-aif-pin="' +
              x.id +
              '" aria-pressed="' +
              p.includes(x.id) +
              '">' +
              App.icon(p.includes(x.id) ? "checkCircle" : "plus") +
              esc(T(x.tr, x.en)) +
              "</button>",
          )
          .join("") +
        "</div></details>";
      App.hydrateIcons(root);
    }
    root.addEventListener("click", (e) => {
      const pin = e.target.closest("[data-aif-pin]"),
        open = e.target.closest("[data-aif-open]");
      if (pin) {
        const editing = !!root.querySelector("details[open]");
        toggle(pin.dataset.aifPin);
        paint();
        root.querySelector("details").open = editing;
      }
      if (open) {
        const x = tools.find((t) => t.id === open.dataset.aifOpen);
        App.modules.assistant.prepareTool(x.prompt, x.coach);
      }
    });
    paint();
  }
  App.aiFavorites = { tools, pins, toggle, html, mount };
})();
