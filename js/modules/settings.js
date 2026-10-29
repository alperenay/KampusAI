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
    const T = (tr, en) => App.i18n.lang === "en" ? en : tr;
    const last = App.prefs.get("lastBackup", null);
    const savedName = App.prefs.get("userName", "");
    const displayName = savedName || t("defaultName");
    const langOptions = Object.entries(App.i18n.langs).map(([code, l]) =>
      '<option value="' + esc(code) + '"' + (code === App.i18n.lang ? " selected" : "") + ">" + esc(l.name) + "</option>").join("");
    const themeOptions = Object.entries(App.theme.list).map(([key, th]) =>
      '<option value="' + esc(key) + '"' + (key === App.theme.current ? " selected" : "") + ">" + esc(t(th.labelKey)) + "</option>").join("");

    const row = (id, icon, title, detail, statusText = "") =>
      '<button class="settings-link" type="button" id="' + id + '">' +
        '<span class="settings-link__icon">' + App.icon(icon) + '</span>' +
        '<span class="settings-link__content"><strong>' + esc(title) + '</strong><small>' + esc(detail) + '</small></span>' +
        (statusText ? '<span class="settings-link__status">' + esc(statusText) + '</span>' : "") +
        '<span class="settings-link__arrow" aria-hidden="true">' + App.icon("chevron") + '</span>' +
      '</button>';

    const m = App.ui.modal({
      title: t("set.title"),
      body:
        '<div class="settings-panel">' +
          '<div class="settings-hero">' +
            '<span class="settings-hero__avatar" id="setAvatarPreview" aria-hidden="true">' + esc(App.utils.initials(displayName)) + '</span>' +
            '<div class="settings-hero__info"><span class="settings-hero__eyebrow">' + esc(T("Öğrenci profili", "Student profile")) + '</span>' +
              '<strong id="setNamePreview">' + esc(displayName) + '</strong><small>' + esc(T("Öğrenme alanını kendine göre düzenle", "Make your learning space your own")) + '</small></div>' +
            '<span class="settings-hero__version">v' + esc(App.version || "dev") + '</span>' +
          '</div>' +

          '<section class="settings-section" aria-labelledby="setPersonalHeading">' +
            '<h3 class="settings-section__title" id="setPersonalHeading">' + App.icon("grad") + esc(T("Profil ve görünüm", "Profile & appearance")) + '</h3>' +
            '<div class="settings-fields">' +
              '<label class="field"><span class="field__label">' + esc(t("set.name")) + '</span>' +
                '<input class="input" id="setName" maxlength="40" autocomplete="nickname" placeholder="' + esc(t("set.namePh")) + '" value="' + esc(savedName) + '"></label>' +
              '<label class="field"><span class="field__label">' + esc(t("set.language")) + '</span>' +
                '<select class="select" id="setLang">' + langOptions + '</select></label>' +
              '<label class="field"><span class="field__label">' + esc(t("set.theme")) + '</span>' +
                '<select class="select" id="setTheme">' + themeOptions + '</select></label>' +
            '</div>' +
            '<div class="settings-options">' +
              row("setAppearance", "sun", T("Görünümü özelleştir", "Customize appearance"), T("Renkler, arka plan ve hareketler", "Colors, backgrounds and motion")) +
            '</div>' +
          '</section>' +

          '<section class="settings-section" aria-labelledby="setToolsHeading">' +
            '<h3 class="settings-section__title" id="setToolsHeading">' + App.icon("settings") + esc(T("Uygulama tercihleri", "App preferences")) + '</h3>' +
            '<div class="settings-options">' +
              row("setAi", "sparkle", t("set.aiSettings"), T("Model, bağlantı ve asistan seçenekleri", "Models, connections and assistant options")) +
              (App.sync.available() ? row("setSync", "refresh", t("sync.title"), T("Ders verilerini cihazlar arasında eşitle", "Keep study data in sync across devices"), App.sync.enabled() ? t("sync.on") : "") : "") +
              row("setRemind", "bell", t("rem.title"), T("Ders ve çalışma hatırlatmaları", "Study and lesson reminders"), App.reminders.config().on ? t("sync.on") : "") +
              row("setA11y", "a11y", t("a11y.title"), T("Yazı boyutu, okuma ve erişilebilirlik", "Text size, reading and accessibility"), App.a11y.isActive() ? t("sync.on") : "") +
            '</div>' +
          '</section>' +

          '<section class="settings-section" aria-labelledby="setDataHeading">' +
            '<h3 class="settings-section__title" id="setDataHeading">' + App.icon("download") + esc(T("Verilerin ve yedeklerin", "Your data & backups")) + '</h3>' +
            '<div class="settings-backup">' +
              '<p>' + esc(t("set.backupText")) + '</p>' +
              '<small class="settings-backup__date">' +
                (last ? esc(t("set.lastBackup", { date: new Date(last).toLocaleDateString(App.i18n.locale) })) : esc(T("Henüz yedek oluşturulmadı", "No backup created yet"))) +
              '</small>' +
              '<div class="settings-backup__actions">' +
                '<button class="btn" type="button" id="setExport">' + App.icon("download") + esc(t("set.export")) + '</button>' +
                '<label class="btn settings-import">' + App.icon("upload") + esc(t("set.import")) +
                  '<input type="file" accept="application/json,.json" id="setImport" hidden></label>' +
              '</div>' +
            '</div>' +
            '<div class="settings-options">' +
              row("setTour", "compass", t("tour.replay"), T("Tanıtım turunu yeniden aç", "Replay the introduction")) +
              row("setAbout", "info", t("abt.title"), T("Sürüm bilgisi, kaynaklar ve lisanslar", "Version, references and licenses")) +
              row("setDemo", "sparkle", App.prefs.get("demoMode", false)
                ? T("Örnek verileri kaldır", "Remove demo data")
                : T("Örnek öğrenci verileri", "Sample student data"),
                T("Deneme amaçlı içerikleri yönet", "Manage demonstration content")) +
            '</div>' +
          '</section>' +

          '<div class="settings-meta"><span>' + esc(t("set.storage")) + ': ' +
             esc(App.db.engine === "indexeddb" ? "IndexedDB" : t("set.storageFallback")) +
             '</span><span>' + esc(t("set.version")) + ' ' + esc(App.version || "dev") + '</span></div>' +
          '<details class="settings-danger"><summary>' + App.icon("trash") +
            esc(T("Verileri sıfırlama seçenekleri", "Reset data options")) + '</summary>' +
            '<p>' + esc(t("set.resetConfirm")) + '</p>' +
            '<button class="btn btn--danger" type="button" id="setReset">' + App.icon("trash") + esc(t("set.reset")) + '</button>' +
          '</details>' +
        '</div>',
      actions: '<button class="btn btn--ghost" type="button" data-close>' + esc(t("close")) +
        '</button><button class="btn btn--primary" type="button" id="setSave">' + App.icon("checkCircle") + esc(t("save")) + '</button>'
    });
    m.el.classList.add("modal--settings");
    const nameInput = m.el.querySelector("#setName");
    const save = () => {
      App.prefs.set("userName", nameInput.value.trim());
      App.applyProfile();
      m.close();
      App.theme.set(m.el.querySelector("#setTheme").value);
      App.i18n.setLang(m.el.querySelector("#setLang").value);
      App.ui.toast(t("set.saved"));
      if (App.router.current().name === "") App.router.refresh();
    };
    m.el.querySelector("#setSave").addEventListener("click", save);
    nameInput.addEventListener("keydown", (e) => { if (e.key === "Enter") save(); });
    nameInput.addEventListener("input", () => {
      const value = nameInput.value.trim() || t("defaultName");
      m.el.querySelector("#setNamePreview").textContent = value;
      m.el.querySelector("#setAvatarPreview").textContent = App.utils.initials(value);
    });
    m.el.querySelector("#setAppearance").addEventListener("click", () => {
      m.close(); App.appearance.open();
    });
    m.el.querySelector("#setAi").addEventListener("click", () => { m.close(); App.modules.aiSettings.open(); });
    const syncBtn = m.el.querySelector("#setSync");
    if (syncBtn) syncBtn.addEventListener("click", () => { m.close(); App.modules.syncUi.open(); });
    m.el.querySelector("#setRemind").addEventListener("click", () => { m.close(); App.reminders.openSettings(); });
    m.el.querySelector("#setTour").addEventListener("click", () => { m.close(); App.router.go("rehber"); });
    m.el.querySelector("#setA11y").addEventListener("click", () => { m.close(); App.a11y.open(); });
    m.el.querySelector("#setAbout").addEventListener("click", () => { m.close(); App.modules.about.open(); });
    m.el.querySelector("#setDemo").addEventListener("click", () => { m.close(); App.demo.toggle(); });
    m.el.querySelector("#setExport").addEventListener("click", exportBackup);
    m.el.querySelector("#setImport").addEventListener("change", async (e) => {
      const file = e.target.files[0];
      if (!file) return;
      m.close();
      await importBackup(file);
    });
    m.el.querySelector("#setReset").addEventListener("click", async () => {
      m.close();
      if (await App.ui.confirm(t("set.resetConfirm"), t("set.resetOk"), true)) {
        App.sync.stop();
        await App.db.resetAll();
        App.ui.toast(t("set.resetDone"));
        App.router.refresh();
      }
    });
  }

  App.modules.settings = { open, exportBackup };
})();
