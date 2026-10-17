/* =========================================================
   sync-ui.js — "Cihazlar arası eşitleme" penceresi
   Kapalıyken : yeni eşitleme başlat · başka cihazdaki kodu yaz / QR okut
   Açıkken    : kod + QR (diğer cihaz okutsun), son eşitleme, şimdi eşitle, kapat
   ========================================================= */
(function () {
  const { esc } = App.utils;
  const t = App.t;
  const QR_PREFIX = "DAS1;c=";

  const parseQR = (text) => {
    text = String(text || "").trim();
    if (!text.startsWith(QR_PREFIX)) return null;
    const c = App.sync.normalize(text.slice(QR_PREFIX.length));
    return App.sync.valid(c) ? { code: c } : null;
  };

  function statusText() {
    const st = App.sync.state;
    if (st.running) return t("sync.running");
    if (st.error) return t("sync.error", { msg: st.error.status === 429 ? t("sync.tooMany") : (st.error.message || "") });
    if (st.last) return t("sync.lastAt", { time: App.utils.fmtDateTime(st.last) });
    return t("sync.never");
  }

  function open() {
    const m = App.ui.modal({ title: t("sync.title"), body: '<div id="syncBody" class="ais-stack"></div>' });
    const el = m.el;
    const body = el.querySelector("#syncBody");
    let unsub = false;

    function paint() {
      if (unsub || !document.body.contains(body)) { unsub = true; return; }
      if (!App.sync.enabled()) {
        body.innerHTML =
          '<p class="hint">' + esc(t("sync.intro")) + "</p>" +
          '<div class="sync-choice">' +
            '<div class="card sync-choice__card"><div class="card__title">' + esc(t("sync.firstTitle")) + '</div><p class="card__sub">' + esc(t("sync.firstText")) + "</p>" +
              '<button class="btn btn--primary" type="button" id="syncNew">' + App.icon("plus") + esc(t("sync.start")) + "</button></div>" +
            '<div class="card sync-choice__card"><div class="card__title">' + esc(t("sync.joinTitle")) + '</div><p class="card__sub">' + esc(t("sync.joinText")) + "</p>" +
              '<div class="sync-join"><input class="input sync-code-input" id="syncCode" placeholder="XXXX-XXXX-XXXX" maxlength="14" autocomplete="off" spellcheck="false">' +
              '<button class="btn" type="button" id="syncJoin">' + esc(t("sync.join")) + "</button></div>" +
              (App.pairing.hasCamera() ? '<button class="btn btn--ghost btn--sm" type="button" id="syncScan">' + App.icon("image") + esc(t("sync.scan")) + "</button>" : "") +
            "</div>" +
          "</div>" +
          '<p class="hint">' + esc(t("sync.privacy")) + "</p>";
      } else {
        const c = App.sync.code();
        body.innerHTML =
          '<p class="hint">' + esc(t("sync.onIntro")) + "</p>" +
          '<div class="lan-qr"><div class="lan-qr__code" id="syncQr"></div>' +
            '<div class="ais-stack" style="flex:1;min-width:180px;gap:8px">' +
              '<span class="hint">' + esc(t("sync.yourCode")) + '</span><code class="cmd lan-code sync-code">' + esc(App.sync.pretty(c)) + "</code>" +
              '<span class="hint">' + esc(t("sync.otherDevice")) + "</span>" +
            "</div></div>" +
          '<div class="ais-test"><button class="btn btn--sm" type="button" id="syncNow"' + (App.sync.state.running ? " disabled" : "") + ">" + App.icon("refresh") + esc(t("sync.now")) + '</button><span class="hint" id="syncStatus">' + esc(statusText()) + "</span></div>" +
          '<button class="btn btn--ghost btn--danger btn--sm" type="button" id="syncStop" style="justify-self:start">' + esc(t("sync.stop")) + "</button>" +
          '<button class="btn btn--ghost btn--danger btn--sm" type="button" id="syncWipe" style="justify-self:start">' + App.icon("trash") + esc(t("sync.wipe")) + "</button>";
        App.pairing.renderQR(body.querySelector("#syncQr"), QR_PREFIX + c).catch(() => {});
      }
      App.hydrateIcons(body);
      bind();
    }

    async function begin(codeOrNull) {
      try {
        body.querySelectorAll("button").forEach((b) => { b.disabled = true; });
        const r = await App.sync.start(codeOrNull);
        if (App.sync.state.error) App.ui.toast(t("sync.error", { msg: App.sync.state.error.message || "" }), "error");
        else App.ui.toast(codeOrNull ? t("sync.joined", { n: (r && r.received) || 0 }) : t("sync.started"));
        App.router.refresh();
      } catch (e) {
        App.ui.toast(e.message === "bad-code" ? t("sync.badCode") : String(e.message || e), "error");
      }
      paint();
    }

    function bind() {
      const q = (s) => body.querySelector(s);
      if (q("#syncNew")) q("#syncNew").addEventListener("click", () => begin(null));
      if (q("#syncJoin")) {
        const inp = q("#syncCode");
        inp.addEventListener("input", () => { const v = App.sync.normalize(inp.value); inp.value = App.sync.pretty(v); });
        const go = () => {
          const c = App.sync.normalize(inp.value);
          if (!App.sync.valid(c)) { App.ui.toast(t("sync.badCode"), "error"); inp.focus(); return; }
          begin(c);
        };
        q("#syncJoin").addEventListener("click", go);
        inp.addEventListener("keydown", (e) => { if (e.key === "Enter") go(); });
      }
      if (q("#syncScan")) q("#syncScan").addEventListener("click", async () => {
        const data = await App.pairing.scan(parseQR, { title: t("sync.scanTitle"), hint: t("sync.scanHint") });
        if (data) begin(data.code);
      });
      if (q("#syncNow")) q("#syncNow").addEventListener("click", async () => { await App.sync.run(); App.router.refresh(); });
      if (q("#syncStop")) q("#syncStop").addEventListener("click", async () => {
        if (!(await App.ui.confirm(t("sync.stopConfirm"), t("sync.stop")))) return;
        App.sync.stop();
        paint();
      });
      if (q("#syncWipe")) q("#syncWipe").addEventListener("click", async () => {
        if (!(await App.ui.confirm(t("sync.wipeConfirm"), t("sync.wipe")))) return;
        try { await App.sync.wipe(); App.ui.toast(t("sync.wiped")); }
        catch (e) { App.ui.toast(t("sync.error", { msg: e.message || "" }), "error"); }
        paint();
      });
    }

    App.sync.onChange(() => {
      const s = body.querySelector("#syncStatus");
      if (s) { s.textContent = statusText(); const b = body.querySelector("#syncNow"); if (b) b.disabled = App.sync.state.running; }
    });
    paint();
  }

  App.modules.syncUi = { open, parseQR };
})();
