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
      '<div class="modal" role="dialog" aria-modal="true" aria-label="' +
      esc(opts.title || "") +
      '">' +
      '<div class="modal__head"><h2>' +
      esc(opts.title || "") +
      "</h2>" +
      '<button class="icon-btn icon-btn--sm" type="button" data-close title="' +
      esc(App.t("close")) +
      '">' +
      App.icon("close") +
      "</button></div>" +
      '<div class="modal__body">' +
      (opts.body || "") +
      "</div>" +
      (opts.actions
        ? '<div class="form-actions">' + opts.actions + "</div>"
        : "") +
      "</div>";
    document.body.appendChild(backdrop);
    App.hydrateIcons(backdrop);

    const prevFocus =
      document.activeElement instanceof HTMLElement
        ? document.activeElement
        : null;
    let closed = false,
      focusTimer,
      dragTimer;
    function close() {
      if (closed) return;
      closed = true;
      document.removeEventListener("keydown", onKey);
      clearTimeout(focusTimer);
      clearTimeout(dragTimer);
      backdrop.remove();
      if (prevFocus && prevFocus.isConnected && prevFocus.focus)
        prevFocus.focus({ preventScroll: true });
      if (opts.onClose) opts.onClose();
    }
    function onKey(e) {
      if (closed || !backdrop.isConnected) return;
      const layers = Array.from(
        document.querySelectorAll(".modal-backdrop"),
      ).filter((x) => !x.hasAttribute("hidden"));
      layers.sort(
        (a, b) =>
          (Number(getComputedStyle(a).zIndex) || 0) -
          (Number(getComputedStyle(b).zIndex) || 0),
      );
      if (layers[layers.length - 1] !== backdrop) return;
      if (e.key === "Escape") {
        e.preventDefault();
        e.stopImmediatePropagation();
        close();
        return;
      }
      if (e.key !== "Tab") return;
      const focusable = Array.from(
        backdrop.querySelectorAll(
          'button:not(:disabled),input:not(:disabled),select:not(:disabled),textarea:not(:disabled),a[href],[tabindex="0"]',
        ),
      ).filter(
        (x) =>
          x.getClientRects().length &&
          getComputedStyle(x).visibility !== "hidden",
      );
      const first = focusable[0] instanceof HTMLElement ? focusable[0] : null,
        last =
          focusable[focusable.length - 1] instanceof HTMLElement
            ? focusable[focusable.length - 1]
            : null;
      if (!first) {
        e.preventDefault();
        sheet.focus();
        return;
      }
      if (
        e.shiftKey &&
        (document.activeElement === first ||
          !backdrop.contains(document.activeElement))
      ) {
        e.preventDefault();
        if (last instanceof HTMLElement) last.focus();
      } else if (
        !e.shiftKey &&
        (document.activeElement === last ||
          !backdrop.contains(document.activeElement))
      ) {
        e.preventDefault();
        first.focus();
      }
    }
    document.addEventListener("keydown", onKey);
    backdrop.addEventListener("mousedown", (e) => {
      if (e.target === backdrop) close();
    });
    backdrop
      .querySelectorAll("[data-close]")
      .forEach((b) => b.addEventListener("click", close));
    // pencere içindeki uygulama bağlantısına (#/…) basınca pencere kapanır, sayfa arkada açık kalmaz
    backdrop.addEventListener("click", (e) => {
      const a =
        e.target instanceof Element ? e.target.closest('a[href^="#/"]') : null;
      if (a && !a.hasAttribute("data-keep") && !e.defaultPrevented) close();
    });

    // Telefonda alttan açılan sayfa: başlıktan aşağı çekince kapanır
    const sheet = /** @type {HTMLDivElement} */ (
        backdrop.querySelector(".modal")
      ),
      head = /** @type {HTMLDivElement} */ (
        backdrop.querySelector(".modal__head")
      );
    let y0 = null,
      dy = 0;
    head.addEventListener(
      "touchstart",
      (e) => {
        if (
          window.innerWidth > 600 ||
          !(e.target instanceof Element) ||
          e.target.closest("button")
        )
          return;
        y0 = e.touches[0].clientY;
        dy = 0;
        sheet.classList.add("is-dragging");
      },
      { passive: true },
    );
    head.addEventListener(
      "touchmove",
      (e) => {
        if (y0 == null) return;
        dy = Math.max(0, e.touches[0].clientY - y0);
        sheet.style.transform = "translateY(" + dy + "px)";
      },
      { passive: true },
    );
    const endDrag = () => {
      if (y0 == null) return;
      y0 = null;
      sheet.classList.remove("is-dragging");
      if (dy > 90) {
        close();
        return;
      }
      sheet.style.transition = "transform .18s";
      sheet.style.transform = "";
      clearTimeout(dragTimer);
      dragTimer = setTimeout(() => {
        if (!closed) sheet.style.transition = "";
      }, 200);
    };
    head.addEventListener("touchend", endDrag);
    head.addEventListener("touchcancel", endDrag);

    const api = { el: sheet, close };
    if (opts.onMount) opts.onMount(api);
    // Dokunmatik ekranda yazı kutusuna otomatik odaklanma klavyeyi açıp pencerenin yarısını kapatır
    const coarse =
      window.matchMedia && window.matchMedia("(pointer: coarse)").matches;
    const first = coarse
      ? null
      : backdrop.querySelector("input, select, textarea, button.btn--primary");
    sheet.tabIndex = -1;
    focusTimer = setTimeout(() => {
      if (closed || !sheet.isConnected || sheet.contains(document.activeElement)) return;
      const target = first || sheet.querySelector("[data-close]") || sheet;
      if (target instanceof HTMLElement) target.focus({ preventScroll: true });
    }, 30);
    return api;
  }

  function confirm(message, okText, danger) {
    return new Promise((resolve) => {
      let answered = false;
      const m = modal({
        title: App.t("confirmTitle"),
        body: '<p style="color:var(--text-2)">' + esc(message) + "</p>",
        actions:
          '<button class="btn btn--ghost" type="button" data-close>' +
          esc(App.t("cancel")) +
          "</button>" +
          '<button class="btn ' +
          (danger ? "btn--danger" : "btn--primary") +
          '" type="button" data-ok>' +
          esc(okText || App.t("ok")) +
          "</button>",
        onClose: () => {
          if (!answered) resolve(false);
        },
      });
      m.el.querySelector("[data-ok]").addEventListener("click", () => {
        answered = true;
        m.close();
        resolve(true);
      });
    });
  }

  function toast(message, type) {
    const host = document.getElementById("toastHost");
    const t = document.createElement("div");
    t.className = "toast" + (type === "error" ? " toast--error" : "");
    t.textContent = message;
    host.appendChild(t);
    setTimeout(() => {
      t.style.transition = "opacity .3s";
      t.style.opacity = "0";
    }, 2400);
    setTimeout(() => t.remove(), 2800);
  }

  /** Boş durum kutusu */
  function empty(icon, title, text, actionHtml) {
    return (
      '<div class="empty"><div class="empty__icon">' +
      App.icon(icon) +
      "</div>" +
      "<h3>" +
      esc(title) +
      "</h3><p>" +
      esc(text) +
      "</p>" +
      (actionHtml || "") +
      "</div>"
    );
  }

  App.ui = { modal, confirm, toast, empty };
})();
