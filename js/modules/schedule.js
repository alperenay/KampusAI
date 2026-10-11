/* =========================================================
   schedule.js — Ders Çalışma Programı
   #/program         → hazır program
   #/program/benim   → öğrencinin kendi planlayıcısı
   Kayıt: IndexedDB "schedules" deposu, id = "user"
   ========================================================= */
(function () {
  const { esc, uid, toMinutes, durationText, weekdayIndex } = App.utils;
  const KINDS = App.data.scheduleKinds;
  const PLAN_ID = "user";
  const t = App.t, L = App.L;

  const days = () => t("days").split(",");
  const kindName = (k) => t("kind." + k);

  async function loadPlan() {
    const plan = await App.db.get("schedules", PLAN_ID);
    return plan || { id: PLAN_ID, blocks: [], updatedAt: null };
  }
  async function savePlan(plan) {
    plan.updatedAt = new Date().toISOString();
    await App.db.put("schedules", plan);
  }

  function studyMinutes(blocks) {
    return blocks.filter((b) => b.kind !== "mola").reduce((sum, b) => sum + Math.max(0, toMinutes(b.end) - toMinutes(b.start)), 0);
  }

  function blockHtml(b, editable) {
    const color = (KINDS[b.kind] || KINDS.ders).color;
    const tag = editable ? "button" : "div";
    const note = L(b.note);
    return "<" + tag + ' class="block" style="--c:' + color + '"' + (editable ? ' type="button" data-edit="' + esc(b.id) + '" title="' + esc(t("sch.edit")) + '"' : "") + ">" +
      '<div class="block__time">' + esc(b.start) + " – " + esc(b.end) + "</div>" +
      '<div class="block__title">' + esc(L(b.subject)) + "</div>" +
      (note ? '<div class="block__note">' + esc(note) + "</div>" : "") +
      "</" + tag + ">";
  }

  function weekHtml(blocks, editable) {
    const today = weekdayIndex();
    return '<div class="week">' + days().map((name, i) => {
      const list = blocks.filter((b) => Number(b.day) === i).sort((a, b) => toMinutes(a.start) - toMinutes(b.start));
      const mins = studyMinutes(list);
      return '<section class="day' + (i === today ? " is-today" : "") + '" aria-label="' + esc(name) + '">' +
        '<div class="day__head"><span class="day__name">' + esc(name) + (i === today ? '<span class="day__today">' + esc(t("sch.today").toLocaleUpperCase(App.i18n.locale)) + "</span>" : "") + "</span>" +
        '<span class="day__total">' + (mins ? durationText(mins) : "") + "</span></div>" +
        (list.length ? list.map((b) => blockHtml(b, editable)).join("") : '<div class="day__empty">' + esc(t("sch.noPlan")) + "</div>") +
        (editable ? '<button class="btn btn--sm day__add" type="button" data-add="' + i + '">' + App.icon("plus") + esc(t("sch.add")) + "</button>" : "") +
      "</section>";
    }).join("") + "</div>";
  }

  function legendHtml() {
    return '<div class="legend">' + Object.entries(KINDS).map(([k, v]) => '<span><i style="background:' + v.color + '"></i>' + esc(kindName(k)) + "</span>").join("") + "</div>";
  }

  function statsHtml(blocks) {
    const study = studyMinutes(blocks);
    const subjects = new Set(blocks.filter((b) => b.kind === "ders" || b.kind === "soru").map((b) => L(b.subject).trim().toLocaleLowerCase(App.i18n.locale)));
    const exams = blocks.filter((b) => b.kind === "deneme").length;
    const todayMins = studyMinutes(blocks.filter((b) => Number(b.day) === weekdayIndex()));
    const stat = (label, value) => '<div class="stat"><div class="stat__label">' + esc(label) + '</div><div class="stat__value" style="font-size:26px">' + value + "</div></div>";
    return '<div class="grid grid--4" style="margin-bottom:18px">' +
      stat(t("sch.weekly"), study ? durationText(study) : "—") +
      stat(t("sch.todayStat"), todayMins ? durationText(todayMins) : "—") +
      stat(t("sch.subjects"), subjects.size || "—") +
      stat(t("sch.exams"), exams || "—") +
    "</div>";
  }

  function tabsHtml(active) {
    return '<div class="tabs" role="tablist">' +
      '<a class="tab' + (active === "hazir" ? " is-active" : "") + '" href="#/program" role="tab" style="display:inline-grid;place-items:center">' + esc(t("sch.tabDefault")) + "</a>" +
      '<a class="tab' + (active === "benim" ? " is-active" : "") + '" href="#/program/benim" role="tab" style="display:inline-grid;place-items:center">' + esc(t("sch.tabMine")) + "</a>" +
    "</div>";
  }

  /* ---------------- Hazır program ---------------- */
  function renderDefault(view) {
    const d = App.data.defaultSchedule;
    view.innerHTML =
      '<div class="page">' +
        '<div class="page-head"><div><h1>' + esc(t("sch.title")) + "</h1><p>" + esc(L(d.name)) + " · " + esc(L(d.description)) + "</p></div>" +
        '<div class="page-head__actions">' + tabsHtml("hazir") + "</div></div>" +
        statsHtml(d.blocks) +
        weekHtml(d.blocks, false) +
        legendHtml() +
        '<div class="form-actions" style="justify-content:flex-start"><button class="btn btn--primary" type="button" id="copyDefault">' + App.icon("copy") + esc(t("sch.copyToMine")) + "</button></div>" +
      "</div>";
    view.querySelector("#copyDefault").addEventListener("click", copyDefault);
  }

  async function copyDefault() {
    const plan = await loadPlan();
    if (plan.blocks.length && !(await App.ui.confirm(t("sch.overwriteConfirm"), t("sch.overwrite"), true))) return;
    // Bloklar iki dilli kopyalanır; öğrenci bir bloğu düzenleyince o blok onun yazdığı metne dönüşür
    plan.blocks = App.data.defaultSchedule.blocks.map((b) => Object.assign({}, b, { id: uid("b") }));
    await savePlan(plan);
    App.ui.toast(t("sch.copied"));
    App.router.go("program/benim");
  }

  /* ---------------- Kendi programım ---------------- */
  async function renderPlanner(view) {
    const plan = await loadPlan();
    const has = plan.blocks.length > 0;
    view.innerHTML =
      '<div class="page">' +
        '<div class="page-head"><div><h1>' + esc(t("sch.title")) + "</h1><p>" + esc(t("sch.mineIntro")) + "</p></div>" +
        '<div class="page-head__actions">' + tabsHtml("benim") + "</div></div>" +
        '<div class="toolbar">' +
          '<div style="display:flex;gap:8px;flex-wrap:wrap">' +
            '<button class="btn btn--primary" type="button" data-add="' + weekdayIndex() + '">' + App.icon("plus") + esc(t("sch.addBlock")) + "</button>" +
            '<button class="btn" type="button" id="useDefault">' + App.icon("copy") + esc(t("sch.startFromDefault")) + "</button>" +
          "</div>" +
          (has ? '<button class="btn btn--ghost btn--danger" type="button" id="clearPlan">' + App.icon("trash") + esc(t("sch.clear")) + "</button>" : "") +
        "</div>" +
        (has ? statsHtml(plan.blocks) : "") +
        weekHtml(plan.blocks, true) +
        legendHtml() +
        (plan.updatedAt ? '<p class="hint" style="margin-top:10px">' + esc(t("sch.lastSaved", { time: App.utils.fmtDateTime(plan.updatedAt) })) + "</p>" : "") +
      "</div>";

    const onClick = async (e) => {
      const add = e.target.closest("[data-add]");
      const edit = e.target.closest("[data-edit]");
      if (add) openEditor(plan, { day: Number(add.dataset.add) });
      else if (edit) openEditor(plan, plan.blocks.find((b) => b.id === edit.dataset.edit));
      else if (e.target.closest("#useDefault")) copyDefault();
      else if (e.target.closest("#clearPlan")) {
        if (await App.ui.confirm(t("sch.clearConfirm"), t("sch.clearOk"), true)) {
          plan.blocks = [];
          await savePlan(plan);
          App.router.refresh();
        }
      }
    };
    // #view öğesi kalıcı olduğu için dinleyici sayfadan çıkınca kaldırılır
    view.addEventListener("click", onClick);
    return () => view.removeEventListener("click", onClick);
  }

  function openEditor(plan, block) {
    const isNew = !block || !block.id;
    const b = Object.assign({ day: 0, start: "17:30", end: "18:20", subject: "", note: "", kind: "ders" }, block || {});
    if (isNew) {
      // aynı günün son bloğundan sonra başlat
      const last = plan.blocks.filter((x) => Number(x.day) === b.day).sort((x, y) => toMinutes(y.end) - toMinutes(x.end))[0];
      if (last) {
        const s = toMinutes(last.end) + 10, e = s + 50;
        if (e < 24 * 60) { b.start = fmt(s); b.end = fmt(e); }
      }
    }

    const m = App.ui.modal({
      title: isNew ? t("sch.newBlock") : t("sch.editBlock"),
      body:
        '<form id="blockForm" class="modal__body" novalidate>' +
          '<div class="form-row">' +
            '<label class="field"><span class="field__label">' + esc(t("sch.day")) + '</span><select class="select" name="day">' +
              days().map((d, i) => '<option value="' + i + '"' + (i === Number(b.day) ? " selected" : "") + ">" + esc(d) + "</option>").join("") + "</select></label>" +
            '<label class="field"><span class="field__label">' + esc(t("sch.kind")) + '</span><select class="select" name="kind">' +
              Object.keys(KINDS).map((k) => '<option value="' + k + '"' + (k === b.kind ? " selected" : "") + ">" + esc(kindName(k)) + "</option>").join("") + "</select></label>" +
          "</div>" +
          '<div class="form-row">' +
            '<label class="field"><span class="field__label">' + esc(t("sch.start")) + '</span><input class="input" type="time" name="start" value="' + esc(b.start) + '" required></label>' +
            '<label class="field"><span class="field__label">' + esc(t("sch.end")) + '</span><input class="input" type="time" name="end" value="' + esc(b.end) + '" required></label>' +
          "</div>" +
          '<label class="field"><span class="field__label">' + esc(t("sch.subject")) + '</span><input class="input" name="subject" list="subjectList" maxlength="60" placeholder="' + esc(t("sch.subjectPh")) + '" value="' + esc(L(b.subject)) + '" required>' +
            '<datalist id="subjectList">' + App.data.subjectSuggestions.map((s) => '<option value="' + esc(L(s)) + '">').join("") + "</datalist></label>" +
          '<label class="field"><span class="field__label">' + esc(t("sch.note")) + '</span><input class="input" name="note" maxlength="80" placeholder="' + esc(t("sch.notePh")) + '" value="' + esc(L(b.note)) + '"></label>' +
          '<p class="error-text" id="blockError" hidden></p>' +
        "</form>",
      actions:
        (isNew ? "" : '<button class="btn btn--ghost btn--danger" type="button" data-del style="margin-right:auto">' + App.icon("trash") + esc(t("delete")) + "</button>") +
        '<button class="btn btn--ghost" type="button" data-close>' + esc(t("cancel")) + "</button>" +
        '<button class="btn btn--primary" type="button" data-save>' + esc(t("save")) + "</button>"
    });

    const form = m.el.querySelector("#blockForm");
    const err = m.el.querySelector("#blockError");

    async function save() {
      const f = new FormData(form);
      const next = {
        id: b.id || uid("b"),
        day: Number(f.get("day")),
        kind: f.get("kind"),
        start: f.get("start"),
        end: f.get("end"),
        subject: String(f.get("subject") || "").trim(),
        note: String(f.get("note") || "").trim()
      };
      const fail = (msg) => { err.textContent = msg; err.hidden = false; };
      if (!next.subject) return fail(t("sch.errSubject"));
      if (!next.start || !next.end) return fail(t("sch.errTime"));
      if (toMinutes(next.end) <= toMinutes(next.start)) return fail(t("sch.errOrder"));
      const clash = plan.blocks.find((x) => x.id !== next.id && Number(x.day) === next.day &&
        toMinutes(next.start) < toMinutes(x.end) && toMinutes(x.start) < toMinutes(next.end));
      if (clash) return fail(t("sch.errClash", { name: L(clash.subject), start: clash.start, end: clash.end }));

      const i = plan.blocks.findIndex((x) => x.id === next.id);
      if (i > -1) plan.blocks[i] = next; else plan.blocks.push(next);
      await savePlan(plan);
      m.close();
      App.ui.toast(isNew ? t("sch.added") : t("sch.updated"));
      App.router.refresh();
    }

    m.el.querySelector("[data-save]").addEventListener("click", save);
    form.addEventListener("submit", (e) => { e.preventDefault(); save(); });
    form.addEventListener("keydown", (e) => { if (e.key === "Enter") { e.preventDefault(); save(); } });
    const del = m.el.querySelector("[data-del]");
    if (del) del.addEventListener("click", async () => {
      plan.blocks = plan.blocks.filter((x) => x.id !== b.id);
      await savePlan(plan);
      m.close();
      App.ui.toast(t("sch.deleted"));
      App.router.refresh();
    });
  }

  function fmt(mins) { return App.utils.pad(Math.floor(mins / 60)) + ":" + App.utils.pad(mins % 60); }

  App.router.register("program", async (view, params) => {
    App.setTitle(t("sch.title"));
    if (params[0] === "benim") return renderPlanner(view);
    return renderDefault(view);
  });
})();
