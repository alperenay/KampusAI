/* =========================================================
   ui.js — modal pencere, onay kutusu ve bildirim (toast)
   ========================================================= */
(function () {
  const { esc } = App.utils;

  /**
   * App.ui.modal({ title, body, actions, onMount })
   * body: HTML metni. Dönen nesne: { el, close }
   */
  function modal(opts) {
    const backdrop = document.createElement("div");
    backdrop.className = "modal-backdrop";
    backdrop.innerHTML =
      '<div class="modal" role="dialog" aria-modal="true" aria-label="' + esc(opts.title || "") + '">' +
        '<div class="modal__head"><h2>' + esc(opts.title || "") + '</h2>' +
        '<button class="icon-btn icon-btn--sm" type="button" data-close title="' + esc(App.t("close")) + '">' + App.icon("close") + "</button></div>" +
        '<div class="modal__body">' + (opts.body || "") + "</div>" +
        (opts.actions ? '<div class="form-actions">' + opts.actions + "</div>" : "") +
      "</div>";
    document.body.appendChild(backdrop);
    App.hydrateIcons(backdrop);

    const prevFocus = document.activeElement;
    function close() {
      document.removeEventListener("keydown", onKey);
      backdrop.remove();
      if (prevFocus && prevFocus.focus) prevFocus.focus();
      if (opts.onClose) opts.onClose();
    }
    function onKey(e) { if (e.key === "Escape") close(); }
    document.addEventListener("keydown", onKey);
    backdrop.addEventListener("mousedown", (e) => { if (e.target === backdrop) close(); });
    backdrop.querySelectorAll("[data-close]").forEach((b) => b.addEventListener("click", close));

    const api = { el: backdrop.querySelector(".modal"), close };
    if (opts.onMount) opts.onMount(api);
    const first = backdrop.querySelector("input, select, textarea, button.btn--primary");
    if (first) setTimeout(() => first.focus(), 30);
    return api;
  }

  function confirm(message, okText, danger) {
    return new Promise((resolve) => {
      let answered = false;
      const m = modal({
        title: App.t("confirmTitle"),
        body: "<p style=\"color:var(--text-2)\">" + esc(message) + "</p>",
        actions:
          '<button class="btn btn--ghost" type="button" data-close>' + esc(App.t("cancel")) + '</button>' +
          '<button class="btn ' + (danger ? "btn--danger" : "btn--primary") + '" type="button" data-ok>' + esc(okText || App.t("ok")) + "</button>",
        onClose: () => { if (!answered) resolve(false); }
      });
      m.el.querySelector("[data-ok]").addEventListener("click", () => { answered = true; m.close(); resolve(true); });
    });
  }

  function toast(message, type) {
    const host = document.getElementById("toastHost");
    const t = document.createElement("div");
    t.className = "toast" + (type === "error" ? " toast--error" : "");
    t.textContent = message;
    host.appendChild(t);
    setTimeout(() => { t.style.transition = "opacity .3s"; t.style.opacity = "0"; }, 2400);
    setTimeout(() => t.remove(), 2800);
  }

  /** Boş durum kutusu */
  function empty(icon, title, text, actionHtml) {
    return '<div class="empty"><div class="empty__icon">' + App.icon(icon) + "</div>" +
      "<h3>" + esc(title) + "</h3><p>" + esc(text) + "</p>" + (actionHtml || "") + "</div>";
  }

  App.ui = { modal, confirm, toast, empty };
})();
