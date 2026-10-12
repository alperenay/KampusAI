/* =========================================================
   mistakes.js — Yanlış Defteri   (#/yanlislar)

   Kaynaklar: konu sonu testindeki yanlış/boş sorular, sohbetten
   "Yanlış defterine ekle", elle eklenen sorular (fotoğraflı olabilir).
   Aralıklı tekrar: "Bildim" dedikçe soru 1 → 3 → 7 → 16 gün sonra tekrar
   gelir; 4 kez bilinince "öğrenildi" sayılır. "Bilemedim" ertesi güne atar.

   Kayıt (IndexedDB "mistakes"):
     { id, createdAt, source: "quiz"|"chat"|"manual", key?, label,
       q, options?, answer?, chosen?, explain, image?, reviews, nextAt, mastered }
   ========================================================= */
(function () {
  const { esc, uid } = App.utils;
  const t = App.t;
  const DAY = 24 * 3600 * 1000;
  const STEPS = [1, 3, 7, 16];
  const LETTERS = "ABCDE";

  const md = (s) => App.markdown.render(s || "");

  async function add(rec) {
    const now = new Date();
    const row = Object.assign({ id: uid("mis"), createdAt: now.toISOString(), reviews: 0, nextAt: new Date(now.getTime() + DAY).toISOString(), mastered: false }, rec);
    await App.db.put("mistakes", row);
    return row;
  }

  const isDue = (m) => !m.mastered && Date.parse(m.nextAt || 0) <= Date.now();

  async function counts() {
    const all = await App.db.getAll("mistakes");
    return { total: all.length, due: all.filter(isDue).length, mastered: all.filter((m) => m.mastered).length };
  }

  function optionsHtml(m, revealed) {
    if (!m.options || !m.options.length) return "";
    return '<ol class="opts">' + m.options.map((o, i) => {
      let cls = "opt";
      if (revealed && i === m.answer) cls += " is-correct";
      else if (revealed && i === m.chosen) cls += " is-wrong";
      return '<li class="' + cls + '"><span class="opt__letter">' + LETTERS[i] + '</span><span class="opt__text md">' + App.markdown.render(String(o)).replace(/^<p>|<\/p>$/g, "") + "</span></li>";
    }).join("") + "</ol>";
  }

  function cardHtml(m, revealed) {
    const src = { quiz: t("mis.src.quiz"), chat: t("mis.src.chat"), manual: t("mis.src.manual"), similar: t("mis.src.similar") }[m.source] || "";
    const next = m.mastered ? t("mis.mastered") : isDue(m) ? t("mis.dueNow") : t("mis.nextAt", { date: App.utils.fmtDate(String(m.nextAt).slice(0, 10)) });
    return '<article class="card mis" data-id="' + esc(m.id) + '">' +
      '<div class="mis__head"><span class="mis__label">' + esc(m.label || "") + "</span>" +
        '<span class="chip-model">' + esc(src) + "</span><span class=\"mis__next\">" + esc(next) + "</span>" +
        '<button class="icon-btn icon-btn--sm" type="button" data-mact="delete" title="' + esc(t("delete")) + '">' + App.icon("trash") + "</button></div>" +
      (m.image ? '<img class="mis__img" src="' + m.image + '" alt="">' : "") +
      (m.q ? '<div class="md mis__q">' + md(m.q) + "</div>" : "") +
      optionsHtml(m, revealed) +
      (revealed
        ? (m.chosen != null && m.chosen !== m.answer && m.options ? '<p class="hint">' + esc(t("mis.yourAnswer", { a: m.chosen < 0 ? t("quiz.blank") : LETTERS[m.chosen] })) + "</p>" : "") +
          (m.explain ? '<div class="mis__explain"><b>' + esc(t("mis.explain")) + '</b><div class="md">' + md(m.explain) + "</div></div>" : "") +
          (m.mastered ? "" : '<div class="mis__actions"><button class="btn btn--sm" type="button" data-mact="again">' + App.icon("xCircle") + esc(t("mis.again")) + "</button>" +
            '<button class="btn btn--sm btn--primary" type="button" data-mact="knew">' + App.icon("checkCircle") + esc(t("mis.knew")) + "</button>" +
            '<button class="btn btn--sm btn--ghost" type="button" data-mact="ask">' + App.icon("sparkle") + esc(t("mis.ask")) + "</button>" +
            '<button class="btn btn--sm btn--ghost" type="button" data-mact="similar">' + App.icon("layers") + esc(t("sim.button")) + "</button></div>")
        : '<div class="mis__actions"><button class="btn btn--sm" type="button" data-mact="reveal">' + App.icon("eye") + esc(t("mis.reveal")) + "</button>" +
            '<button class="btn btn--sm btn--ghost" type="button" data-mact="similar">' + App.icon("layers") + esc(t("sim.button")) + "</button></div>") +
    "</article>";
  }

  async function render(view, params) {
    App.setTitle(t("mis.title"));
    const filter = params[0] === "tumu" ? "all" : params[0] === "ogrenilen" ? "mastered" : "due";
    const all = (await App.db.getAll("mistakes")).sort((a, b) => String(b.createdAt).localeCompare(String(a.createdAt)));
    const subjects = Array.from(new Set(all.map((m) => (m.label || "").split(" · ").slice(0, 2).join(" · ")).filter(Boolean)));
    const subj = App.prefs.get("misSubject", "");
    let list = filter === "due" ? all.filter(isDue).sort((a, b) => String(a.nextAt).localeCompare(String(b.nextAt)))
      : filter === "mastered" ? all.filter((m) => m.mastered) : all;
    if (subj) list = list.filter((m) => (m.label || "").indexOf(subj) === 0);
    const c = { total: all.length, due: all.filter(isDue).length, mastered: all.filter((m) => m.mastered).length };
    const revealed = new Set();

    const tab = (id, href, label, n) => '<a class="tab' + (filter === id ? " is-active" : "") + '" href="#/yanlislar' + href + '">' + esc(label) + ' <span style="color:var(--faint);font-weight:400">' + n + "</span></a>";

    view.innerHTML =
      '<div class="page page--narrow">' +
        '<div class="page-head"><div><h1>' + esc(t("mis.title")) + "</h1><p>" + esc(t("mis.intro")) + "</p></div>" +
          '<div class="page-head__actions"><button class="btn btn--primary" type="button" id="misAdd">' + App.icon("plus") + esc(t("mis.add")) + "</button></div></div>" +
        '<div class="mis-bar"><div class="tabs" role="tablist">' +
          tab("due", "", t("mis.tab.due"), c.due) + tab("all", "/tumu", t("mis.tab.all"), c.total) + tab("mastered", "/ogrenilen", t("mis.tab.mastered"), c.mastered) + "</div>" +
          (subjects.length > 1 ? '<select class="select" id="misSubj" style="width:auto;min-width:180px"><option value="">' + esc(t("mis.allSubjects")) + "</option>" +
            subjects.map((s) => '<option value="' + esc(s) + '"' + (s === subj ? " selected" : "") + ">" + esc(s) + "</option>").join("") + "</select>" : "") +
        "</div>" +
        '<div id="misList" class="mis-list">' +
          (list.length ? list.map((m) => cardHtml(m, false)).join("")
            : App.ui.empty("bookmark", filter === "due" && c.total ? t("mis.emptyDueTitle") : t("mis.emptyTitle"), filter === "due" && c.total ? t("mis.emptyDueText") : t("mis.emptyText"))) +
        "</div>" +
      "</div>";

    const sel = view.querySelector("#misSubj");
    if (sel) sel.addEventListener("change", () => { App.prefs.set("misSubject", sel.value); App.router.refresh(); });
    view.querySelector("#misAdd").addEventListener("click", openAdd);

    const onClick = async (e) => {
      const b = e.target.closest("[data-mact]");
      if (!b) return;
      const card = b.closest(".mis");
      const m = await App.db.get("mistakes", card.dataset.id);
      if (!m) return;
      const a = b.dataset.mact;
      if (a === "reveal") { revealed.add(m.id); card.outerHTML = cardHtml(m, true); App.hydrateIcons(view); return; }
      if (a === "delete") {
        if (!(await App.ui.confirm(t("mis.deleteConfirm"), t("delete"), true))) return;
        await App.db.remove("mistakes", m.id); card.remove(); App.ui.toast(t("mis.deleted")); return;
      }
      if (a === "knew") {
        m.reviews = (m.reviews || 0) + 1;
        if (m.reviews >= STEPS.length) m.mastered = true;
        else m.nextAt = new Date(Date.now() + STEPS[m.reviews] * DAY).toISOString();
        await App.db.put("mistakes", m);
        App.ui.toast(m.mastered ? t("mis.toastMastered") : t("mis.toastNext", { n: STEPS[m.reviews] }));
        if (filter === "due") card.remove(); else { card.outerHTML = cardHtml(m, false); App.hydrateIcons(view); }
        return;
      }
      if (a === "again") {
        m.reviews = 0; m.mastered = false; m.nextAt = new Date(Date.now() + DAY).toISOString();
        await App.db.put("mistakes", m);
        App.ui.toast(t("mis.toastAgain"));
        if (filter === "due") card.remove(); else { card.outerHTML = cardHtml(m, false); App.hydrateIcons(view); }
        return;
      }
      if (a === "similar") {
        App.similar.open({ q: m.q, options: m.options, answer: m.answer, explain: m.explain, image: m.image, label: m.label, key: m.key });
        return;
      }
      if (a === "ask") {
        const opts = m.options && m.options.length ? "\n\n" + m.options.map((o, i) => LETTERS[i] + ") " + o).join("\n") : "";
        App.modules.assistant.startWith(t("mis.askPrompt") + "\n\n" + (m.q || "") + opts, m.image || null);
      }
    };
    view.addEventListener("click", onClick);
    return () => view.removeEventListener("click", onClick);
  }

  /* Elle soru ekle (fotoğraf + not) */
  function openAdd() {
    let image = null;
    const m = App.ui.modal({
      title: t("mis.addTitle"),
      body:
        '<label class="field"><span class="field__label">' + esc(t("mis.fLabel")) + '</span><input class="input" id="mfLabel" placeholder="' + esc(t("mis.fLabelPh")) + '"></label>' +
        '<label class="field"><span class="field__label">' + esc(t("mis.fQuestion")) + '</span><textarea class="textarea" id="mfQ" rows="4" placeholder="' + esc(t("mis.fQuestionPh")) + '"></textarea></label>' +
        '<div class="field"><span class="field__label">' + esc(t("mis.fPhoto")) + '</span><div style="display:flex;gap:10px;align-items:center;flex-wrap:wrap">' +
          '<label class="btn btn--sm" style="cursor:pointer">' + App.icon("image") + esc(t("ai.attach").split("(")[0].trim()) + '<input type="file" accept="image/*" id="mfImg" hidden></label><img id="mfPrev" class="mis__thumb" hidden alt=""></div></div>' +
        '<label class="field"><span class="field__label">' + esc(t("mis.fExplain")) + '</span><textarea class="textarea" id="mfE" rows="3" placeholder="' + esc(t("mis.fExplainPh")) + '"></textarea></label>',
      actions: '<button class="btn btn--ghost" type="button" data-close>' + esc(t("cancel")) + '</button><button class="btn btn--primary" type="button" id="mfSave">' + esc(t("save")) + "</button>"
    });
    const q = (s) => m.el.querySelector(s);
    q("#mfImg").addEventListener("change", async (e) => {
      const f = e.target.files[0];
      if (!f) return;
      try { image = await App.vision.prepare(f); q("#mfPrev").src = image.dataUrl; q("#mfPrev").hidden = false; }
      catch (err) { App.ui.toast(t("ai.photoError"), "error"); }
    });
    q("#mfSave").addEventListener("click", async () => {
      const text = q("#mfQ").value.trim();
      if (!text && !image) { App.ui.toast(t("mis.needQuestion"), "error"); return; }
      await add({ source: "manual", label: q("#mfLabel").value.trim() || t("mis.src.manual"), q: text, explain: q("#mfE").value.trim(), image: image ? image.dataUrl : null, nextAt: new Date().toISOString() });
      m.close();
      App.ui.toast(t("mis.added"));
      App.router.refresh();
    });
  }

  App.router.register("yanlislar", render);
  App.mistakes = { add, counts, isDue };
})();
