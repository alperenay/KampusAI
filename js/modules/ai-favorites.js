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
  tools.push(
    {
      id: "quiz",
      icon: "quiz",
      tr: "Mini Test",
      en: "Mini Quiz",
      prompt:
        "Bu konuda cevapları hemen göstermeden 5 soruluk bir mini test hazırla: ",
    },
    {
      id: "mistakes",
      icon: "bookmark",
      tr: "Hata Analizi",
      en: "Error Analysis",
      prompt:
        "Çözümümde ilk yanlış adımı bul, nedenini açıkla ve benzer bir alıştırma öner: ",
    },
    {
      id: "compare",
      icon: "layers",
      tr: "Kavram Karşılaştırma",
      en: "Compare Concepts",
      prompt:
        "Bu kavramların farklarını örnekler ve kısa bir karşılaştırma tablosuyla açıkla: ",
    },
    {
      id: "writing",
      icon: "note",
      tr: "Metin Geri Bildirimi",
      en: "Writing Feedback",
      prompt:
        "Metnimi anlam, yapı ve dil açısından değerlendir; benim yerime yeniden yazmadan geliştirme önerileri ver: ",
    },
    {
      id: "project",
      icon: "lightbulb",
      tr: "Araştırma Taslağı",
      en: "Research Outline",
      prompt:
        "Bu araştırma fikri için soru, ölçülebilir hipotez, yöntem ve sınırlılık taslağı oluştur; kaynak veya sonuç uydurma: ",
    },
    {
      id: "language",
      icon: "volume",
      tr: "Dil Pratiği",
      en: "Language Practice",
      prompt:
        "Seçtiğim dil ve seviyede kısa bir diyalog başlat, her seferinde tek soru sor ve hatalarımı açıkla. Dilim ve seviyem: ",
    },
  );
  function customTools() {
    const raw = App.prefs.get("aiCustomTools", []),
      seen = new Set();
    return (Array.isArray(raw) ? raw : [])
      .filter(
        (x) =>
          x &&
          typeof x.id === "string" &&
          /^custom:[a-z0-9-]{1,80}$/i.test(x.id) &&
          !seen.has(x.id) &&
          seen.add(x.id) &&
          typeof x.tr === "string" &&
          x.tr.trim() &&
          typeof x.prompt === "string" &&
          x.prompt.trim(),
      )
      .slice(0, 20)
      .map((x) => ({
        id: x.id,
        tr: x.tr.trim().slice(0, 50),
        en: x.tr.trim().slice(0, 50),
        prompt: x.prompt.slice(0, 3000),
        coach: x.coach === true,
        icon: "note",
        custom: true,
      }));
  }
  const all = () => tools.concat(customTools());
  function pins() {
    return App.favorites.list().filter(k=>k.startsWith("ai:")).map(k=>k.slice(3));
  }
  function toggle(id) { return App.favorites.toggle("ai:"+id); }

  function saveCustom(input) {
    if (
      !input ||
      typeof input.title !== "string" ||
      typeof input.prompt !== "string" ||
      !input.title.trim() ||
      !input.prompt.trim() ||
      input.title.trim().length > 50 ||
      input.prompt.length > 3000
    )
      return null;
    const list = customTools();
    let x = list.find((x) => x.id === input.id);
    if (!x) {
      if (input.id || list.length >= 20) return null;
      x = {
        id:
          "custom:" +
          Date.now().toString(36) +
          "-" +
          Math.random().toString(36).slice(2, 9),
        tr: "",
        en: "",
        prompt: "",
        coach: false,
        icon: "note",
        custom: true,
      };
      list.push(x);
    }
    Object.assign(x, {
      tr: input.title.trim(),
      en: input.title.trim(),
      prompt: input.prompt,
      coach: input.coach === true,
    });
    App.prefs.set("aiCustomTools", list);
    return x.id;
  }
  function removeCustom(id) {
    if (!customTools().some((x) => x.id === id)) return false;
    App.prefs.set(
      "aiCustomTools",
      customTools().filter((x) => x.id !== id),
    );
    App.favorites.save(App.favorites.list());
    return true;
  }
  function move(id, delta) {
    return App.favorites.move("ai:"+id,delta);
  }

  function html() {
    return (
      '<section class="ai-favs" aria-label="' +
      esc(T("Favori araçlar", "Favourite tools")) +
      '"><h2>' +
      T("Favorilerim", "My Favourites") +
      '</h2><p class="hint">' +
      T(
        "Sayfaların ve AI şablonların tek listede; açmak için bir favori seç.",
        "Your pages and AI templates in one list. Choose a favourite to open.",
      ) +
      "</p><div data-ai-favs></div></section>"
    );
  }
  function mount(root, manage = false) {
    if (!root) return;
    if (!manage) { App.workspaceSections.shortcuts(root); return; }
    let expanded = false,
      query = "",
      editingId = null;
    let editorDraft = null;
    function paint(open = false) {
      const prior = root.querySelector("form");
      if (prior)
        editorDraft = {
          title: prior.elements.title.value,
          prompt: prior.elements.prompt.value,
          coach: prior.elements.coach.checked,
        };
      const p = pins(),
        list = all(),
        visible = expanded ? p : p.slice(0, 6);
      root.innerHTML =
        '<div class="ai-fav-grid">' +
        visible
          .map((id) => {
            const x = list.find((t) => t.id === id);
            return (
              '<div class="ai-fav"><button class="btn" type="button" data-aif-open="' +
              esc(id) +
              '">' +
              App.icon(x.icon) +
              esc(T(x.tr, x.en)) +
              '</button><button class="icon-btn" type="button" data-aif-pin="' +
              esc(id) +
              '" aria-label="' +
              esc(T("Sabitlemeyi kaldır: ", "Unpin: ") + T(x.tr, x.en)) +
              '">' +
              App.icon("close") +
              "</button></div>"
            );
          })
          .join("") +
        "</div>" +
        (!p.length
          ? '<p class="hint">' +
            T("Aşağıdan favori ekleyebilirsin.", "Add favourites below.") +
            "</p>"
          : "") +
        (p.length > 6
          ? '<button class="btn" data-aif-expand>' +
            T(
              expanded ? "Daha az göster" : "Tüm favorileri göster",
              expanded ? "Show less" : "Show all favourites",
            ) +
            "</button>"
          : "") +
        "<details" +
        (open ? " open" : "") +
        "><summary>" +
        T("Favorileri düzenle", "Edit favourites") +
        " · " +
        p.length +
        '/32</summary><p class="hint">' +
        T(
          "AI başlangıç metinlerini düzenle. Tüm sayfa ve şablon favorilerin yukarıdaki ortak listede yönetilir.",
          "Edit AI starting prompts. All page and template favourites share the ordered list above.",
        ) +
        "</p><label>" +
        T("Şablon ara", "Search templates") +
        '<input type="search" data-aif-search value="' +
        esc(query) +
        '"></label><div class="ai-fav-options">' +
        list
          .map((x) => {
            const i = p.indexOf(x.id);
            return (
              '<div class="aif-option" data-aif-row="' +
              esc(T(x.tr, x.en).toLocaleLowerCase()) +
              '"><button class="btn" data-aif-pin="' +
              esc(x.id) +
              '" aria-pressed="' +
              (i >= 0) +
              '">' +
              App.icon(i >= 0 ? "checkCircle" : "plus") +
              esc(T(x.tr, x.en)) +
              '</button><div class="aif-actions">' +
              (i >= 0
                ? '<button class="btn" data-aif-up="' +
                  esc(x.id) +
                  '" ' +
                  (i === 0 ? "disabled" : "") +
                  ' aria-label="' +
                  esc(T("Yukarı taşı: ", "Move up: ") + T(x.tr, x.en)) +
                  '">↑</button><button class="btn" data-aif-down="' +
                  esc(x.id) +
                  '" ' +
                  (i === p.length - 1 ? "disabled" : "") +
                  ' aria-label="' +
                  esc(T("Aşağı taşı: ", "Move down: ") + T(x.tr, x.en)) +
                  '">↓</button>'
                : "") +
              '<button class="btn" data-aif-edit="' +
              esc(x.id) +
              '">' +
              T(
                x.custom ? "Düzenle" : "Kişisel kopya",
                x.custom ? "Edit" : "Personal copy",
              ) +
              "</button>" +
              (x.custom
                ? '<button class="btn" data-aif-delete="' +
                  esc(x.id) +
                  '">' +
                  T("Sil", "Delete") +
                  "</button>"
                : "") +
              "</div></div>"
            );
          })
          .join("") +
        "</div><p data-aif-empty hidden>" +
        T("Eşleşen şablon yok.", "No matching templates.") +
        '</p><form class="aif-editor"><h3>' +
        T("Kişisel şablon", "Personal template") +
        "</h3><label>" +
        T("Ad (en fazla 50 karakter)", "Name (up to 50 characters)") +
        '<input name="title" maxlength="50" required></label><label>' +
        T("Başlangıç metni", "Starting prompt") +
        '<textarea name="prompt" rows="4" maxlength="3000" required></textarea></label><label class="aif-coach"><input type="checkbox" name="coach">' +
        T("Sokratik koçu kullan", "Use Socratic coaching") +
        '</label><div class="aif-actions"><button class="btn primary" type="submit">' +
        T("Kaydet", "Save") +
        '</button><button class="btn" type="button" data-aif-new>' +
        T("Yeni şablon", "New template") +
        '</button></div><p class="hint" role="status" data-aif-status></p></form></details>';
      App.hydrateIcons(root);
      filter();
      if (editorDraft) {
        const f = root.querySelector("form");
        f.elements.title.value = editorDraft.title;
        f.elements.prompt.value = editorDraft.prompt;
        f.elements.coach.checked = editorDraft.coach;
      }
    }
    function filter() {
      let n = 0;
      root.querySelectorAll("[data-aif-row]").forEach((el) => {
        el.hidden = !el.dataset.aifRow.includes(query.toLocaleLowerCase());
        if (!el.hidden) n++;
      });
      root.querySelector("[data-aif-empty]").hidden = n > 0;
    }
    root.addEventListener("input", (e) => {
      if (e.target.matches("[data-aif-search]")) {
        query = e.target.value;
        filter();
      }
    });
    root.addEventListener("submit", (e) => {
      if (!e.target.matches(".aif-editor")) return;
      e.preventDefault();
      const f = e.target,
        id = saveCustom({
          id: editingId,
          title: f.elements.title.value,
          prompt: f.elements.prompt.value,
          coach: f.elements.coach.checked,
        });
      if (!id) {
        root.querySelector("[data-aif-status]").textContent = T(
          "Kaydedilemedi. Alanları ve 20 şablon sınırını kontrol et.",
          "Could not save. Check fields and the 20-template limit.",
        );
        return;
      }
      if (!pins().includes(id) && pins().length < 32) toggle(id);
      editingId = null;
      root.querySelector("form").reset();
      paint(true);
      root.querySelector("[data-aif-status]").textContent = T(
        "Şablon kaydedildi.",
        "Template saved.",
      );
    });
    root.addEventListener("click", (e) => {
      const b = e.target.closest("button");
      if (!b) return;
      const d = b.dataset,
        open = !!root.querySelector("details[open]");
      if (d.aifOpen) {
        const x = all().find((t) => t.id === d.aifOpen);
        if (x) App.favorites.open("ai:"+x.id);
        return;
      }
      if (d.aifPin) {
        toggle(d.aifPin);
        paint(open);
      } else if (d.aifUp || d.aifDown) {
        const id = d.aifUp || d.aifDown;
        move(id, d.aifUp ? -1 : 1);
        paint(true);
        root
          .querySelector(
            "[data-aif-" + (d.aifUp ? "up" : "down") + '="' + id + '"]',
          )
          ?.focus();
      } else if ("aifExpand" in d) {
        expanded = !expanded;
        paint(open);
      } else if (d.aifDelete) {
        removeCustom(d.aifDelete);
        if (editingId === d.aifDelete) editingId = null;
        paint(true);
      } else if (d.aifEdit) {
        const x = all().find((t) => t.id === d.aifEdit),
          f = root.querySelector("form");
        editingId = x.custom ? x.id : null;
        f.elements.title.value = T(x.tr, x.en);
        f.elements.prompt.value = x.prompt;
        f.elements.coach.checked = !!x.coach;
        f.elements.title.focus();
      } else if ("aifNew" in d) {
        editingId = null;
        root.querySelector("form").reset();
        root.querySelector("form input").focus();
      }
    });
    paint();
  }
  App.aiFavorites = {
    tools,
    all,
    pins,
    toggle,
    html,
    mount,
    customTools,
    saveCustom,
    removeCustom,
    move,
  };
})();
