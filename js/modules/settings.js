/* =========================================================
   settings.js — profil, dil, yedekleme (dışa/içe aktar), sıfırlama
   ========================================================= */
(function () {
  const { esc } = App.utils;
  const t = App.t;

  async function exportBackup() {
    const data = await App.db.exportAll();
    const stamp = new Date().toISOString().slice(0, 10);
    App.utils.downloadText(t("set.backupFile", { date: stamp }), JSON.stringify(data, null, 2));
    App.prefs.set("lastBackup", new Date().toISOString());
    App.ui.toast(t("set.exported"));
  }

  function importBackup(file) {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onload = async () => {
        try {
          let data;
          try { data = JSON.parse(reader.result); } catch (e) { throw new Error(t("set.badFile")); }
          if (!data || data.app !== "ders-asistani" || !data.stores) throw new Error(t("set.notBackup"));
          const n = (data.stores.exams || []).length;
          if (!(await App.ui.confirm(t("set.importConfirm", { n }), t("set.restore"), true))) return resolve(false);
          await App.db.importAll(data);
          // Yedekte farklı bir dil kayıtlıysa onu uygula
          App.i18n.setLang(App.prefs.get("lang", App.i18n.lang));
          App.theme.set(App.prefs.get("theme", App.theme.current));
          App.applyProfile();
          App.ui.toast(t("set.imported"));
          App.router.refresh();
          resolve(true);
        } catch (e) {
          App.ui.toast(e.message || t("set.badFile"), "error");
          resolve(false);
        }
      };
      reader.readAsText(file);
    });
  }

  function open() {
    const last = App.prefs.get("lastBackup", null);
    const langOptions = Object.entries(App.i18n.langs).map(([code, l]) =>
      '<option value="' + code + '"' + (code === App.i18n.lang ? " selected" : "") + ">" + esc(l.name) + "</option>").join("");

    const themeOptions = Object.entries(App.theme.list).map(([key, th]) =>
      '<option value="' + key + '"' + (key === App.theme.current ? " selected" : "") + ">" + esc(t(th.labelKey)) + "</option>").join("");

    const m = App.ui.modal({
      title: t("set.title"),
      body:
        '<div class="form-row">' +
          '<label class="field"><span class="field__label">' + esc(t("set.name")) + '</span><input class="input" id="setName" maxlength="40" placeholder="' + esc(t("set.namePh")) + '" value="' + esc(App.prefs.get("userName", "")) + '"></label>' +
          '<label class="field"><span class="field__label">' + esc(t("set.language")) + '</span><select class="select" id="setLang">' + langOptions + "</select></label>" +
        "</div>" +
        '<label class="field"><span class="field__label">' + esc(t("set.theme")) + '</span><select class="select" id="setTheme">' + themeOptions + "</select></label>" +
        '<div style="display:flex;gap:8px;flex-wrap:wrap">' +
          '<button class="btn" type="button" id="setAi">' + App.icon("sparkle") + esc(t("set.aiSettings")) + "</button>" +
          (App.sync.available() ? '<button class="btn" type="button" id="setSync">' + App.icon("refresh") + esc(t("sync.title")) +
            (App.sync.enabled() ? ' <span class="badge badge--good">' + esc(t("sync.on")) + "</span>" : "") + "</button>" : "") +
        "</div>" +
        '<div class="card" style="padding:16px">' +
          '<div class="card__title">' + esc(t("set.backupTitle")) + "</div>" +
          '<p class="card__sub" style="margin-bottom:12px">' + esc(t("set.backupText")) +
          (last ? " " + esc(t("set.lastBackup", { date: new Date(last).toLocaleDateString(App.i18n.locale) })) : "") + "</p>" +
          '<div style="display:flex;gap:8px;flex-wrap:wrap">' +
            '<button class="btn" type="button" id="setExport">' + App.icon("download") + esc(t("set.export")) + "</button>" +
            '<label class="btn" style="cursor:pointer">' + App.icon("upload") + esc(t("set.import")) + '<input type="file" accept="application/json,.json" id="setImport" hidden></label>' +
          "</div>" +
        "</div>" +
        '<div style="display:flex;align-items:center;justify-content:space-between;gap:12px;flex-wrap:wrap">' +
          '<span class="hint">' + esc(t("set.storage")) + ": " + esc(App.db.engine === "indexeddb" ? "IndexedDB" : t("set.storageFallback")) +
            " · " + esc(t("set.version")) + " " + esc(App.version || "dev") + "</span>" +
          '<button class="btn btn--ghost btn--danger btn--sm" type="button" id="setReset">' + App.icon("trash") + esc(t("set.reset")) + "</button>" +
        "</div>",
      actions: '<button class="btn btn--ghost" type="button" data-close>' + esc(t("close")) + '</button><button class="btn btn--primary" type="button" id="setSave">' + esc(t("save")) + "</button>"
    });

    m.el.querySelector("#setSave").addEventListener("click", () => {
      App.prefs.set("userName", m.el.querySelector("#setName").value.trim());
      App.applyProfile();
      m.close();
      App.theme.set(m.el.querySelector("#setTheme").value);
      App.i18n.setLang(m.el.querySelector("#setLang").value);   // dil değiştiyse sayfa yeniden çizilir
      App.ui.toast(t("set.saved"));
      if (App.router.current().name === "") App.router.refresh();
    });
    m.el.querySelector("#setName").addEventListener("keydown", (e) => { if (e.key === "Enter") m.el.querySelector("#setSave").click(); });
    m.el.querySelector("#setAi").addEventListener("click", () => { m.close(); App.modules.aiSettings.open(); });
    const syncBtn = m.el.querySelector("#setSync");
    if (syncBtn) syncBtn.addEventListener("click", () => { m.close(); App.modules.syncUi.open(); });
    m.el.querySelector("#setExport").addEventListener("click", exportBackup);
    m.el.querySelector("#setImport").addEventListener("change", async (e) => {
      const f = e.target.files[0];
      if (!f) return;
      m.close();
      await importBackup(f);
    });
    m.el.querySelector("#setReset").addEventListener("click", async () => {
      m.close();
      if (await App.ui.confirm(t("set.resetConfirm"), t("set.resetOk"), true)) {
        App.sync.stop();                      // diğer cihazlardaki veriler bu cihaza geri gelmesin
        await App.db.resetAll();
        App.ui.toast(t("set.resetDone"));
        App.router.refresh();
      }
    });
  }

  App.modules.settings = { open, exportBackup };
})();
