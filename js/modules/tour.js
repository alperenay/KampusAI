/* =========================================================
   tour.js — ilk açılışta canlı tanıtım turu (20 adım)

   Uygulamayı ilk kez açan kişiye gerçek sayfalar üzerinde gezinerek her
   özelliği gösterir: ilgili sayfaya geçer, öğeyi ışıkla vurgular, yanında
   kısa bir açıklama kartı çıkar. İleri/Geri/Geç, klavyede ← → ve Esc.

   Yalnızca ilk kurulumda kendiliğinden açılır (App.firstRun: daha önce hiç
   ayar yazılmamış ve veritabanı boş). Güncelleme yapan eski kullanıcılara
   gösterilmez. Ayarlar'dan istenirse yeniden izlenebilir.
   ========================================================= */
(function () {
  const { esc } = App.utils;
  const t = App.t;
  const C = () => App.data.curriculum;
  const DATA_STORES = ["exams", "chats", "schedules", "notes", "progress", "mistakes", "quizzes", "sessions", "explains"];

  /** Konu anlatımı içeriği olan ilk kazanım (9. sınıf matematik) */
  function sampleOutcome() {
    for (const g of C().grades) for (const s of g.subjects) for (const u of s.units || []) for (const k of u.outcomes || []) {
      if (k.content && k.content.anlatim) return C().key(g.id, s.id, u.id, k.id);
    }
    const g = C().grades[0], s = g.subjects[0], u = s.units[0], k = u.outcomes[0];
    return C().key(g.id, s.id, u.id, k.id);
  }

  function closeModals() {
    document.querySelectorAll(".modal-backdrop [data-close]").forEach((b) => { if (!b.closest(".tour")) b.click(); });
    document.querySelectorAll(".modal-backdrop").forEach((m) => m.remove());
  }

  /* ---------------- Adımlar ---------------- */
  const STEPS = [
    { id: "welcome", center: true, route: "#/", name: true },
    { id: "assistant", route: "#/", target: "#composer" },
    { id: "photo", route: "#/", target: '#composer [data-act="attach"]' },
    { id: "data", route: "#/", target: '#composer [data-act="data"]' },
    { id: "engine", route: "#/", target: '#composer [data-act="model"]' },
    { id: "countdown", route: "#/", target: ".yks-count" },
    { id: "aiPlan", route: "#/program/benim", target: "#aiPlan" },
    { id: "week", route: "#/program/benim", target: ".week" },
    { id: "remind", route: "#/program/benim", target: "#remindBtn", action: "remind" },
    { id: "topics", route: "#/konular", target: ".grid" },
    { id: "lesson", route: () => "#/konular/" + sampleOutcome(), target: ".lesson .lesson__section" },
    { id: "quiz", route: () => "#/konular/" + sampleOutcome(), target: ".quiz-card:not(.fey-card)" },
    { id: "feynman", route: () => "#/konular/" + sampleOutcome(), target: ".fey-card" },
    { id: "exams", route: "#/denemeler", target: 'a[href^="#/denemeler/yeni"]' },
    { id: "goals", route: "#/denemeler", target: ".goal-card" },
    { id: "mistakes", route: "#/yanlislar", target: ".mis-bar" },
    { id: "focus", route: "#/odak", target: ".focus__ring" },
    { id: "sync", route: "#/", target: "#setSync, #setAi", enter: () => App.modules.settings.open(), leave: closeModals },
    { id: "chrome", route: "#/", target: ".topbar__actions" },
    { id: "done", center: true, route: "#/" }
  ];

  let el = null, idx = 0, raf = 0, active = false, token = 0, curTarget = null, lastRect = "";

  const visible = (n) => !!(n && n.getClientRects().length && getComputedStyle(n).visibility !== "hidden");

  function find(sel) {
    const list = sel.split(",").map((s) => s.trim());
    for (const s of list) {
      const n = Array.from(document.querySelectorAll(s)).find((x) => visible(x) && !x.closest(".tour"));
      if (n) return n;
    }
    return null;
  }

  function waitFor(sel, ms) {
    return new Promise((resolve) => {
      const start = Date.now();
      (function poll() {
        const n = find(sel);
        if (n || Date.now() - start > ms) return resolve(n);
        setTimeout(poll, 80);
      })();
    });
  }

  /** Hedefi kendi kaydırma alanında ortala (sayfanın tamamını kaydırmadan) */
  function reveal(target) {
    const sc = target.closest("#view, .modal, .modal__body");
    if (!sc || sc.scrollHeight <= sc.clientHeight) return;
    const r = target.getBoundingClientRect(), b = sc.getBoundingClientRect();
    const want = sc.scrollTop + (r.top - b.top) - Math.max(16, (b.height - r.height) / 2);
    sc.scrollTo({ top: Math.max(0, want), behavior: "smooth" });
  }

  /** Kaydırma bitene kadar bekle (hedefin konumu ~150 ms değişmeyince; en çok 1,5 sn) */
  function settle(target) {
    return new Promise((resolve) => {
      const start = Date.now();
      let last = "", since = Date.now();
      (function poll() {
        const r = target.getBoundingClientRect();
        const k = Math.round(r.top) + "," + Math.round(r.left);
        if (k !== last) { last = k; since = Date.now(); }
        if (Date.now() - since > 150 || Date.now() - start > 1500) return resolve();
        requestAnimationFrame(poll);
      })();
    });
  }

  function build() {
    el = document.createElement("div");
    el.className = "tour";
    el.setAttribute("role", "dialog");
    el.setAttribute("aria-modal", "true");
    el.innerHTML =
      '<div class="tour__shade"></div>' +
      '<div class="tour__spot" hidden></div>' +
      '<div class="tour__card" role="document">' +
        '<div class="tour__top"><span class="tour__count"></span><button class="tour__skip" type="button" data-tour="skip"></button></div>' +
        '<div class="tour__progress"><span></span></div>' +
        '<div class="tour__body"></div>' +
        '<div class="tour__nav"><button class="btn btn--ghost btn--sm" type="button" data-tour="back"></button>' +
          '<button class="btn btn--primary btn--sm" type="button" data-tour="next"></button></div>' +
      "</div>";
    document.body.appendChild(el);
    el.addEventListener("click", onClick);
    document.addEventListener("keydown", onKey, true);
  }

  function onKey(e) {
    if (!active) return;
    const typing = e.target && /INPUT|TEXTAREA|SELECT/.test(e.target.tagName) && e.target.closest(".tour");
    if (e.key === "Escape") { e.preventDefault(); e.stopPropagation(); finish(true); }
    else if (e.key === "ArrowRight" && !typing) { e.preventDefault(); go(idx + 1); }
    else if (e.key === "ArrowLeft" && !typing) { e.preventDefault(); go(idx - 1); }
    else if (e.key === "Enter" && typing) { e.preventDefault(); go(idx + 1); }
  }

  async function onClick(e) {
    const b = e.target.closest("[data-tour]");
    if (!b) return;
    const a = b.dataset.tour;
    if (a === "next") go(idx + 1);
    else if (a === "back") go(idx - 1);
    else if (a === "skip") finish(true);
    else if (a === "remind") {
      b.disabled = true;
      const r = await App.reminders.enable();
      b.textContent = r.ok ? t("tour.remindOn") : r.permission === "unsupported" ? t("rem.unsupported") : t("tour.remindDenied");
      b.classList.toggle("is-done", r.ok);
      if (!r.ok) b.disabled = false;
    }
  }

  function saveName() {
    const inp = el && el.querySelector("#tourName");
    if (!inp) return;
    const v = inp.value.trim();
    if (v !== App.prefs.get("userName", "")) { App.prefs.set("userName", v); App.applyProfile(); }
  }

  async function go(n) {
    if (!active) return;
    if (n >= STEPS.length) return finish(false);
    if (n < 0) return;
    const prev = STEPS[idx];
    if (prev && prev.name) saveName();
    if (prev && prev.leave && n !== idx) prev.leave();
    idx = n;
    const my = ++token;
    const s = STEPS[idx];
    App.prefs.set("tourStep", idx);

    // Telefonda açık menüyü kapat
    const app = document.getElementById("app");
    if (app) app.classList.remove("is-menu-open");
    const scrim = document.getElementById("scrim");
    if (scrim) scrim.hidden = true;

    paintCard(s, true);
    const route = typeof s.route === "function" ? s.route() : s.route;
    if (route && location.hash !== route && !(route === "#/" && (location.hash === "" || location.hash === "#"))) {
      closeModals();
      location.hash = route;
    }
    if (s.enter) { await new Promise((r) => setTimeout(r, 250)); if (my !== token) return; s.enter(); }

    let target = null;
    if (s.target) {
      target = await waitFor(s.target, 3500);
      if (my !== token) return;
      if (target) {
        reveal(target);
        await settle(target);
        if (my !== token) return;
      }
    }
    curTarget = target;
    lastRect = "";
    paintCard(s, false);
  }

  function paintCard(s, loading) {
    const card = el.querySelector(".tour__card");
    const n = STEPS.length;
    el.querySelector(".tour__count").textContent = t("tour.count", { n: idx + 1, total: n });
    el.querySelector(".tour__progress span").style.width = ((idx + 1) / n * 100).toFixed(1) + "%";
    const skip = el.querySelector('[data-tour="skip"]');
    skip.textContent = t("tour.skip");
    skip.hidden = idx === n - 1;
    const back = el.querySelector('[data-tour="back"]');
    back.textContent = t("tour.back");
    back.hidden = idx === 0;
    el.querySelector('[data-tour="next"]').textContent = idx === 0 ? t("tour.start") : idx === n - 1 ? t("tour.finish") : t("tour.next");
    if (loading && !s.center) { card.classList.add("is-moving"); return; }
    card.classList.remove("is-moving");
    const body = el.querySelector(".tour__body");
    let extra = "";
    if (s.name) {
      extra = '<label class="field tour__field"><span class="field__label">' + esc(t("tour.nameLabel")) + '</span><input class="input" id="tourName" maxlength="40" autocomplete="given-name" placeholder="' + esc(t("set.namePh")) + '" value="' + esc(App.prefs.get("userName", "")) + '"></label>';
    }
    if (s.action === "remind") {
      const on = App.reminders && App.reminders.config().on;
      extra = '<button class="btn btn--sm tour__action' + (on ? " is-done" : "") + '" type="button" data-tour="remind"' + (on ? " disabled" : "") + ">" + App.icon("bell") + esc(on ? t("tour.remindOn") : t("tour.remindBtn")) + "</button>";
    }
    const name = (App.prefs.get("userName", "") || "").split(" ")[0];
    body.innerHTML =
      (s.center ? '<div class="tour__logo" aria-hidden="true">' + App.icon("logo") + "</div>" : "") +
      "<h2>" + esc(t("tour." + s.id + ".title", { name: name ? ", " + name : "" })) + "</h2>" +
      "<p>" + esc(t("tour." + s.id + ".text")) + "</p>" + extra;
    App.hydrateIcons(body);
    el.classList.toggle("is-center", !!s.center || !curTarget);
    if (s.name) setTimeout(() => { const i = el.querySelector("#tourName"); if (i && !App.platform.mobile) i.focus(); }, 60);
    else el.querySelector('[data-tour="next"]').focus({ preventScroll: true });
    layout(true);
  }

  /* Vurgu ve kartı hedefin yanına yerleştir (her karede yeniden ölçülür: kaydırma, animasyon, boyut) */
  function layout(force) {
    if (!el) return;
    const spot = el.querySelector(".tour__spot");
    const card = el.querySelector(".tour__card");
    const vw = window.innerWidth, vh = window.innerHeight;
    const s = STEPS[idx];
    const target = curTarget && document.contains(curTarget) && visible(curTarget) ? curTarget : null;
    if (!target || s.center) {
      if (!spot.hidden || force) { spot.hidden = true; el.classList.add("is-center"); card.style.cssText = ""; }
      return;
    }
    const r = target.getBoundingClientRect();
    const pad = 8;
    // Görünen kısımla sınırla (uzun öğelerde vurgu ekrandan taşmasın)
    const top = Math.max(r.top - pad, 6), left = Math.max(r.left - pad, 6);
    const bottom = Math.min(r.bottom + pad, vh - 6), right = Math.min(r.right + pad, vw - 6);
    const key = [top, left, bottom, right, vw, vh, card.offsetHeight].map(Math.round).join(",");
    if (key === lastRect && !force) return;
    lastRect = key;
    el.classList.remove("is-center");
    spot.hidden = false;
    spot.style.cssText = "top:" + top + "px;left:" + left + "px;width:" + Math.max(0, right - left) + "px;height:" + Math.max(0, bottom - top) + "px";

    const cw = Math.min(380, vw - 24);
    const ch = card.offsetHeight || 220;
    const gap = 14;
    // Durum çubuğu / ana ekran çubuğu payı (iPhone çentiği, Android kenardan kenara)
    const appCs = getComputedStyle(document.getElementById("app") || document.body);
    const minT = 12 + (parseFloat(appCs.paddingTop) || 0), maxB = vh - 12 - (parseFloat(appCs.paddingBottom) || 0);
    let ct, cl;
    if (vw < 640) {
      // Telefonda kart alt ya da üst kenara yaslanır; vurgunun karşı tarafında durur
      const mid = (top + bottom) / 2;
      cl = 12;
      ct = mid < vh / 2 ? maxB - ch : minT;
      if (mid < vh / 2 && bottom + gap > ct) ct = Math.min(maxB - ch, bottom + gap);
      if (mid >= vh / 2 && top - gap < ct + ch) ct = Math.max(minT, top - gap - ch);
      card.style.cssText = "top:" + Math.round(ct) + "px;left:" + cl + "px;right:12px;width:auto";
      return;
    }
    if (bottom + gap + ch <= maxB) ct = bottom + gap;
    else if (top - gap - ch >= minT) ct = top - gap - ch;
    else ct = Math.max(minT, Math.min(maxB - ch, (top + bottom) / 2 - ch / 2));
    cl = (left + right) / 2 - cw / 2;
    if (ct > top - gap - ch && ct < bottom + gap) {      // yukarı/aşağı sığmadı: yana koy
      cl = right + gap + cw <= vw - 12 ? right + gap : left - gap - cw >= 12 ? left - gap - cw : cl;
    }
    cl = Math.max(12, Math.min(vw - cw - 12, cl));
    card.style.cssText = "top:" + Math.round(ct) + "px;left:" + Math.round(cl) + "px;width:" + cw + "px";
  }

  function loop() {
    if (!active) return;
    layout(false);
    raf = requestAnimationFrame(loop);
  }

  function start(fromStep) {
    if (active) return;
    active = true;
    App.prefs.set("tourDone", false);
    build();
    document.documentElement.classList.add("touring");
    idx = 0;
    raf = requestAnimationFrame(loop);
    go(Math.max(0, Math.min(STEPS.length - 1, Number(fromStep) || 0)));
  }

  function finish(skipped) {
    if (!active) return;
    const s = STEPS[idx];
    if (s && s.name) saveName();
    if (s && s.leave) s.leave();
    active = false;
    token++;
    cancelAnimationFrame(raf);
    document.removeEventListener("keydown", onKey, true);
    document.documentElement.classList.remove("touring");
    if (el) { el.classList.add("is-leaving"); const e = el; setTimeout(() => e.remove(), 220); }
    el = null; curTarget = null;
    App.prefs.set("tourDone", true);
    App.prefs.remove("tourStep");
    closeModals();
    if (location.hash !== "#/") location.hash = "#/";
    else App.router.refresh();
    if (skipped) App.ui.toast(t("tour.skipped"));
  }

  /** İlk kurulum mu? Eski kullanıcıları (güncelleme yapanları) işaretleyip atlar */
  async function shouldShow() {
    const done = App.prefs.get("tourDone", null);
    if (done === true || done === "existing") return false;
    if (done === false) return true;                       // tur yarıda kaldı (uygulama kapandı): kaldığı yerden
    if (!App.firstRun) { App.prefs.set("tourDone", "existing"); return false; }
    for (const s of DATA_STORES) {
      try { if ((await App.db.getAll(s)).length) { App.prefs.set("tourDone", "existing"); return false; } } catch (e) { /* yok say */ }
    }
    return true;
  }

  async function maybeStart() {
    if (!(await shouldShow())) return;
    setTimeout(() => start(App.prefs.get("tourStep", 0)), 500);
  }

  App.tour = { start, finish, maybeStart, shouldShow, steps: STEPS, isActive: () => active, current: () => idx };
})();
