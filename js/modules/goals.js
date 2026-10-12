/* =========================================================
   goals.js — YKS geri sayımı ve hedef netler

   Kayıt: IndexedDB "meta" deposu, id = "goals"
     { examDate: "2027-06-19", estimated: true,
       targets: { TYT: { total, per: { turkce: 30, ... } }, AYT: { ... } } }

   • Ana ekranda "YKS'ye N gün" göstergesi
   • Deneme Takibi'nde hedef kartı: hedef / şu anki (son 3 deneme ortalaması),
     kalan fark ve haftada gereken artış; ders ders hedef çubukları
   ========================================================= */
(function () {
  const { esc, fmtNum, round } = App.utils;
  const t = App.t, L = App.L;
  const CFG = () => App.data.exams;
  /* ÖSYM 2027 takvimini henüz açıklamadı (Ekim 2026); YKS her yıl Haziran'ın 3. hafta sonu
     yapılıyor. Kullanıcı tarihi Hedefler'den değiştirebilir. */
  const DEFAULT_DATE = "2027-06-19";
  let cache = null;

  const defaults = () => ({ id: "goals", examDate: DEFAULT_DATE, estimated: true, targets: { TYT: { total: null, per: {} }, AYT: { total: null, per: {} } } });

  async function load() {
    const rec = await App.db.get("meta", "goals");
    cache = Object.assign(defaults(), rec || {});
    cache.targets = Object.assign(defaults().targets, cache.targets || {});
    return cache;
  }
  const get = () => cache || defaults();

  async function save(g) {
    cache = Object.assign(get(), g, { id: "goals" });
    await App.db.put("meta", cache);
    return cache;
  }

  function daysLeft(g) {
    g = g || get();
    const d = new Date(g.examDate + "T09:00:00");
    if (isNaN(d)) return null;
    const today = new Date(); today.setHours(0, 0, 0, 0);
    return Math.ceil((d - today) / 86400000);
  }

  /** Bir tür için hedef toplam net (ders hedeflerinin toplamı ya da elle girilen toplam) */
  function targetTotal(type, g) {
    const tg = (g || get()).targets[type] || {};
    if (tg.total != null && tg.total !== "") return Number(tg.total);
    const per = Object.values(tg.per || {}).filter((v) => v != null && v !== "").map(Number);
    return per.length ? per.reduce((a, b) => a + b, 0) : null;
  }

  /** Ana ekrandaki küçük sayaç */
  function countdownHtml() {
    const n = daysLeft();
    if (n == null || n < 0) return "";
    const g = get();
    return '<a class="yks-count" href="#/denemeler" title="' + esc(t("goal.dateTip", { date: App.utils.fmtDate(g.examDate, true) })) + '">' +
      App.icon("flag") + "<span><b>" + (n === 0 ? esc(t("goal.today")) : esc(t("goal.daysLeft", { n }))) + "</b>" +
      (g.estimated ? ' <small>' + esc(t("goal.estimated")) + "</small>" : "") + "</span></a>";
  }

  /** Deneme Takibi'ndeki hedef kartı. computed: [{ exam, c }] (tarih sırasıyla) */
  function cardHtml(type, computed) {
    const g = get();
    const n = daysLeft(g);
    const weeks = n != null && n > 0 ? Math.max(1, n / 7) : null;
    const subjects = CFG().types[type].subjects;
    const last3 = computed.slice(-3);
    const avg = (fn) => (last3.length ? last3.reduce((a, x) => a + fn(x), 0) / last3.length : null);
    const curTotal = avg((x) => x.c.total);
    const target = targetTotal(type, g);
    const per = (g.targets[type] && g.targets[type].per) || {};

    let progress = "";
    if (target != null) {
      const pct = curTotal != null ? Math.max(0, Math.min(100, (curTotal / target) * 100)) : 0;
      const gap = curTotal != null ? round(target - curTotal, 2) : null;
      progress =
        '<div class="goal-main"><div class="goal-main__nums"><span class="goal-main__cur">' + (curTotal != null ? fmtNum(curTotal, 1) : "–") + '</span><span class="goal-main__sep">/</span><span class="goal-main__target">' + fmtNum(target, 1) + "</span> <small>" + esc(t("ex.net")) + "</small></div>" +
        '<div class="bar-row__track goal-track"><span class="bar-row__fill" style="width:' + pct.toFixed(1) + '%"></span></div>' +
        '<p class="hint">' + esc(curTotal == null ? t("goal.noExams", { type })
          : gap <= 0 ? t("goal.reached")
          : weeks ? t("goal.gap", { gap: fmtNum(gap, 1), perWeek: fmtNum(gap / weeks, 2) }) : t("goal.gapNoDate", { gap: fmtNum(gap, 1) })) + "</p></div>";
      const rows = subjects.filter((s) => per[s.id] != null && per[s.id] !== "").map((s) => {
        const cur = avg((x) => (x.c.per[s.id] ? x.c.per[s.id].net : 0));
        const tg = Number(per[s.id]);
        const p = cur != null && tg ? Math.max(0, Math.min(100, (cur / tg) * 100)) : 0;
        return '<div class="bar-row"><span class="bar-row__name">' + esc(L(s.short || s.name)) + '</span><span class="bar-row__track"><span class="bar-row__fill' + (cur != null && cur >= tg ? " is-done" : "") + '" style="width:' + p.toFixed(1) + '%"></span></span>' +
          '<span class="bar-row__val">' + (cur != null ? fmtNum(cur, 1) : "–") + " <small>/ " + fmtNum(tg, 1) + "</small></span></div>";
      });
      if (rows.length) progress += '<div class="bars" style="margin-top:14px">' + rows.join("") + "</div>";
    } else {
      progress = '<p class="hint">' + esc(t("goal.setHint", { type })) + "</p>";
    }

    return '<section class="card goal-card"><div class="goal-card__head"><div><div class="card__title">' + App.icon("flag") + esc(t("goal.title", { type })) + "</div>" +
      '<div class="card__sub">' + (n != null && n >= 0 ? esc(t("goal.countdown", { n, date: App.utils.fmtDate(g.examDate, true) })) + (g.estimated ? " · " + esc(t("goal.estimated")) : "") : esc(t("goal.past"))) + "</div></div>" +
      '<button class="btn btn--sm" type="button" data-goal-edit="' + type + '">' + App.icon("edit") + esc(t("goal.edit")) + "</button></div>" + progress + "</section>";
  }

  /** Hedef düzenleme penceresi */
  function edit(type) {
    const g = JSON.parse(JSON.stringify(get()));
    const types = Object.keys(CFG().types);
    let cur = type || types[0];
    const m = App.ui.modal({
      title: t("goal.editTitle"),
      body:
        '<label class="field"><span class="field__label">' + esc(t("goal.date")) + '</span><input class="input" type="date" id="gDate" value="' + esc(g.examDate) + '"></label>' +
        '<p class="hint">' + esc(t("goal.dateHint")) + "</p>" +
        '<div class="tabs" role="tablist" id="gTabs">' + types.map((ty) => '<button class="tab" type="button" data-gt="' + ty + '">' + ty + "</button>").join("") + "</div>" +
        '<div id="gFields" class="ais-stack"></div>',
      actions: '<button class="btn btn--ghost" type="button" data-close>' + esc(t("cancel")) + '</button><button class="btn btn--primary" type="button" id="gSave">' + esc(t("save")) + "</button>"
    });
    const el = m.el;
    el.classList.add("modal--wide");

    function readFields() {
      const tg = g.targets[cur] = g.targets[cur] || { total: null, per: {} };
      const tot = el.querySelector("#gTotal");
      if (!tot) return;
      tg.total = tot.value === "" ? null : Number(tot.value);
      tg.per = {};
      el.querySelectorAll("[data-gs]").forEach((inp) => { if (inp.value !== "") tg.per[inp.dataset.gs] = Number(inp.value); });
    }
    function paint() {
      el.querySelectorAll("[data-gt]").forEach((b) => b.classList.toggle("is-active", b.dataset.gt === cur));
      const tg = g.targets[cur] || { per: {} };
      const subs = CFG().types[cur].subjects;
      const max = subs.reduce((a, s) => a + s.questions, 0);
      el.querySelector("#gFields").innerHTML =
        '<label class="field"><span class="field__label">' + esc(t("goal.total", { type: cur, max })) + '</span><input class="input" type="number" step="0.25" min="0" max="' + max + '" id="gTotal" value="' + (tg.total != null ? tg.total : "") + '" placeholder="' + esc(t("goal.totalPh")) + '"></label>' +
        '<div class="goal-grid">' + subs.map((s) =>
          '<label class="field"><span class="field__label">' + esc(L(s.short || s.name)) + " <small>/ " + s.questions + '</small></span><input class="input" type="number" step="0.25" min="0" max="' + s.questions + '" data-gs="' + s.id + '" value="' + (tg.per && tg.per[s.id] != null ? tg.per[s.id] : "") + '"></label>').join("") + "</div>";
    }
    el.querySelector("#gTabs").addEventListener("click", (e) => {
      const b = e.target.closest("[data-gt]");
      if (!b) return;
      readFields(); cur = b.dataset.gt; paint();
    });
    el.querySelector("#gSave").addEventListener("click", async () => {
      readFields();
      const d = el.querySelector("#gDate").value;
      if (d && d !== g.examDate) { g.examDate = d; g.estimated = false; }
      await save(g);
      m.close();
      App.ui.toast(t("set.saved"));
      App.router.refresh();
    });
    paint();
  }

  /** Yapay zekaya verilen özet satırı */
  function summaryTR() {
    const g = get();
    const n = daysLeft(g);
    const parts = [];
    if (n != null && n >= 0) parts.push("YKS'ye " + n + " gün var (" + g.examDate + (g.estimated ? ", tahmini" : "") + ").");
    Object.keys(CFG().types).forEach((ty) => {
      const tt = targetTotal(ty, g);
      if (tt != null) {
        const per = (g.targets[ty] && g.targets[ty].per) || {};
        const subs = CFG().types[ty].subjects.filter((s) => per[s.id] != null).map((s) => (s.name.tr || s.name) + " " + per[s.id]);
        parts.push(ty + " hedefi: " + tt + " net" + (subs.length ? " (" + subs.join(", ") + ")" : "") + ".");
      }
    });
    return parts.join(" ");
  }

  function init() {
    load().catch(() => {});
    App.db.on("meta", () => load().catch(() => {}));
    document.addEventListener("click", (e) => {
      const b = e.target.closest("[data-goal-edit]");
      if (b) edit(b.dataset.goalEdit);
    });
  }

  App.goals = { init, load, get, save, daysLeft, targetTotal, countdownHtml, cardHtml, edit, summaryTR, DEFAULT_DATE };
})();
