/* =========================================================
   ai-settings.js — Yapay zeka ayarları penceresi

   Bölümler:
     Çalışma şekli : Otomatik / Bu cihaz (indirilen yapay zeka ya da Ollama) / İnternet
     İnternet      : Gemini (anahtar, model) ya da OpenAI-uyumlu servis
     Yerel         : Ollama adresi, telefon bağlantı kodu, üç model
     Telefon       : (yalnızca Windows uygulamasında) telefonların bu
                     bilgisayardaki modelleri kullanmasına izin ver
     Hafıza        : kayıtların vektörlerini yeniden oluştur
   ========================================================= */
(function () {
  const { esc } = App.utils;
  const t = App.t;

  const LOCAL_FIELDS = [
    { key: "aiChatModel",   role: "chat",   icon: "sparkle", def: () => App.ollama.autoChatModel() },
    { key: "aiEmbedModel",  role: "embed",  icon: "search",  def: () => App.ollama.DEFAULTS.embedModel },
    { key: "aiVisionModel", role: "vision", icon: "eye",     def: () => App.ollama.autoVisionModel() }
  ];
  /* Formdaki tüm ayar anahtarları (test sırasında geçici uygulanır, iptalde geri alınır) */
  const KEYS = ["aiMode", "aiOncelik", "aiCloud", "srvSpeed", "gemSpeed", "gemKey", "gemModel", "gemEmbed", "oaPreset", "oaBase", "oaKey", "oaModel", "oaVision", "oaEmbed",
    "aiUrl", "aiToken", "aiChatModel", "aiEmbedModel", "aiVisionModel"];

  const v = (k, d) => { const x = App.prefs.get(k, null); return x == null ? (d == null ? "" : d) : x; };

  function seg(name, options, value) {
    return '<div class="lang-switch seg" role="radiogroup" data-seg="' + name + '">' +
      options.map(([val, label]) => '<button type="button" role="radio" data-val="' + val + '" aria-checked="' + (val === value) + '">' + esc(label) + "</button>").join("") + "</div>";
  }

  function keyInput(id, value, ph) {
    return '<span class="key-field"><input class="input" id="' + id + '" type="password" value="' + esc(value) + '" placeholder="' + esc(ph || "") + '" spellcheck="false" autocomplete="off">' +
      '<button class="icon-btn icon-btn--sm" type="button" data-reveal="' + id + '" title="' + esc(t("ais.showKey")) + '">' + App.icon("eye") + "</button></span>";
  }

  const field = (label, html, hint) => '<label class="field"><span class="field__label">' + label + "</span>" + html + (hint ? '<span class="hint">' + hint + "</span>" : "") + "</label>";
  const input = (id, value, ph, list) => '<input class="input" id="' + id + '" value="' + esc(value) + '" placeholder="' + esc(ph || "") + '" spellcheck="false" autocomplete="off"' + (list ? ' list="' + list + '"' : "") + ">";
  const link = (href, text) => '<a href="' + esc(href) + '" target="_blank" rel="noopener noreferrer">' + esc(text) + "</a>";

  function body() {
    const desktop = App.platform.desktop;
    const phone = App.platform.mobile;
    const presets = App.cloud.PRESETS;
    const preset = v("oaPreset", "openrouter");

    const cloudTab =
      field(esc(t("ais.cloudService")), seg("aiCloud",
        (App.cloud.server.configured() ? [["server", t("ais.server")]] : []).concat([["gemini", t("ais.ownGemini")], ["openai", t("ais.openaiCompat")]]),
        v("aiCloud", App.engine.defaultCloud()))) +
      (App.cloud.server.configured()
        ? '<div data-panel-cloud="server" class="ais-stack"><p class="hint">' + esc(t("ais.serverHint")) + "</p>" +
            field(esc(t("ais.speed")), seg("srvSpeed", [["fast", t("ais.speed.fast")], ["smart", t("ais.speed.smart")]], v("srvSpeed", "fast")), esc(t("ais.speedHint"))) +
            '<p class="hint">' + esc(t("ais.serverPrivacy")) + "</p></div>" : "") +
      '<div data-panel-cloud="gemini" class="ais-stack">' +
        field(esc(t("ais.apiKey")), keyInput("gemKey", v("gemKey"), "AIza…"), esc(t("ais.gemKeyHint")) + " " + link(App.cloud.gemini.keyUrl, t("ais.getKey"))) +
        field(esc(t("ais.speed")), seg("gemSpeed", [["fast", t("ais.speed.fast")], ["smart", t("ais.speed.smart")]], v("gemSpeed", "fast")), esc(t("ais.speedHint"))) +
        field(App.icon("sparkle") + esc(t("ais.gemModel")),
          '<select class="select" id="gemModel"><option value="">' + esc(t("ais.autoModel", { model: v("gemAutoModel", "") || "…" })) + "</option>" +
          (v("gemModel") ? '<option value="' + esc(v("gemModel")) + '" selected>' + esc(v("gemModel")) + "</option>" : "") + "</select>",
          esc(t("ais.gemModelHint"))) +
        field(App.icon("search") + esc(t("ais.role.embed")), input("gemEmbed", v("gemEmbed"), "gemini-embedding-001")) +
        '<p class="hint">' + esc(t("ais.gemPrivacy")) + "</p>" +
      "</div>" +
      '<div data-panel-cloud="openai" class="ais-stack">' +
        field(esc(t("ais.provider")), '<select class="select" id="oaPreset">' + Object.entries(presets).map(([id, p]) =>
          '<option value="' + id + '"' + (id === preset ? " selected" : "") + ">" + esc(p.name || t("ais.custom")) + "</option>").join("") + "</select>") +
        field(esc(t("ais.baseUrl")), input("oaBase", v("oaBase"), (presets[preset] || {}).url || "https://…/v1")) +
        field(esc(t("ais.apiKey")), keyInput("oaKey", v("oaKey"), "sk-…"), '<span id="oaKeyLink"></span>') +
        field(App.icon("sparkle") + esc(t("ais.role.chat")), input("oaModel", v("oaModel"), t("ais.oaModelPh"), "aisCloudModels")) +
        field(App.icon("eye") + esc(t("ais.role.vision")), input("oaVision", v("oaVision"), t("ais.oaVisionPh"), "aisCloudModels"), esc(t("ais.oaVisionHint"))) +
        field(App.icon("search") + esc(t("ais.role.embed")), input("oaEmbed", v("oaEmbed"), t("ais.oaEmbedPh"), "aisCloudModels"), esc(t("ais.oaEmbedHint"))) +
      "</div>" +
      '<datalist id="aisCloudModels"></datalist>' +
      '<div class="ais-test"><button class="btn btn--sm" type="button" data-test="cloud">' + App.icon("refresh") + esc(t("ais.test")) + '</button><span class="hint" id="aisCloudResult"></span></div>';

    const devCard = App.engine.device && App.engine.device.bridge
      ? '<div class="lan-info dev-card"><b>' + App.icon("download") + esc(t(App.engine.device.bridge.phone ? "dev.titlePhone" : "dev.title")) + "</b>" +
        '<p class="hint">' + esc(t(App.engine.device.bridge.phone ? "dev.introPhone" : "dev.intro")) + '</p><p class="hint" id="devWarn" hidden></p>' +
        (App.engine.device.bridge.phone ? '<div class="lang-switch seg" role="radiogroup" id="devVar" hidden></div><p class="hint" id="devVarHint" hidden></p>' : "") +
        '<span class="hint" id="devState"></span><progress id="devBar" max="1" value="0" hidden></progress>' +
        '<div class="ais-test"><button class="btn btn--primary btn--sm" type="button" id="devGo"></button>' +
        '<button class="btn btn--sm" type="button" id="devCancel" hidden>' + esc(t("dev.cancel")) + "</button>" +
        '<button class="btn btn--ghost btn--sm" type="button" id="devDel" hidden>' + esc(t("dev.remove")) + "</button></div>" +
        '<p class="hint">' + esc(t("dev.resume")) + "</p></div>"
      : "";

    const localTab = devCard +
      '<p class="hint">' + esc(t(phone ? "ais.localIntroPhone" : "ais.intro")) + "</p>" +
      (App.ollama.isFileOrigin() ? '<p class="ai-notice"><b>' + esc(t("ai.err.fileTitle")) + "</b> " + esc(t("ai.err.fileBody")) + "</p>" : "") +
      (App.pairing.canScan()
        ? '<button class="btn btn--primary" type="button" id="pairScan">' + App.icon("image") + esc(t("pair.scanBtn")) + '</button><p class="hint">' + esc(t("pair.scanBtnHint")) + "</p>" : "") +
      field(esc(t("ais.url")), input("aisUrl", v("aiUrl"), phone ? "http://192.168.1.20:8765/ollama" : t("ais.urlAuto", { url: App.ollama.config().url }))) +
      field(esc(t("ais.token")), input("aisToken", v("aiToken"), "ABC123"), esc(t("ais.tokenHint"))) +
      LOCAL_FIELDS.map((f) =>
        field(App.icon(f.icon) + esc(t("ais.role." + f.role)),
          '<span class="model-field">' + '<input class="input" data-key="' + f.key + '" value="' + esc(v(f.key) || f.def()) + '" spellcheck="false" list="aisModels">' +
          '<span class="model-state" data-state="' + f.key + '"></span></span>')).join("") +
      '<datalist id="aisModels"></datalist>' +
      (App.platform.desktop && window.desktopApp && window.desktopApp.gpu
        ? '<label class="check-row"><input type="checkbox" id="uiGpu"' + (window.desktopApp.uiGpu ? " checked" : "") + "> <span>" + esc(t("ais.uiGpu")) + '</span></label><p class="hint">' + esc(t("ais.uiGpuHint")) + "</p>" : "") +
      '<div class="ais-test"><button class="btn btn--sm" type="button" data-test="local">' + App.icon("refresh") + esc(t("ais.test")) + '</button><span class="hint" id="aisResult"></span></div>' +
      '<p class="hint">' + esc(t("ais.privacy")) + "</p>";

    const phoneTab = desktop ?
      '<p class="hint">' + esc(t("ais.lanIntro")) + "</p>" +
      '<label class="check-row"><input type="checkbox" id="lanOn"> <span>' + esc(t("ais.lanToggle")) + "</span></label>" +
      '<div id="lanInfo" class="lan-info" hidden></div>' +
      '<p class="hint">' + esc(t("ais.lanFirewall")) + "</p>"
      : "";

    const memTab =
      '<p class="hint">' + esc(t("ais.memText")) + "</p>" +
      '<div class="ais-test"><button class="btn btn--sm" type="button" id="aisRebuild">' + App.icon("database") + esc(t("ais.rebuild")) + '</button><span class="hint" id="aisMem"></span></div>';

    const tabs = [["cloud", t("ais.tab.cloud")], ["local", t("ais.tab.local")]].concat(desktop ? [["phone", t("ais.tab.phone")]] : [], [["memory", t("ais.tab.memory")]]);

    return (
      field(esc(t("ais.mode")), seg("aiMode", [["auto", t("ais.mode.auto")], ["local", t("ais.mode.local")], ["cloud", t("ais.mode.cloud")]], v("aiMode", "auto")),
        '<span id="aisModeHint"></span>') +
      '<div id="aisPrio">' + field(esc(t("prio.label")), seg("aiOncelik", [["cihaz", t("prio.cihaz")], ["internet", t("prio.internet")]], v("aiOncelik", "cihaz")),
        '<span class="hint" id="aisPrioHint"></span>') + "</div>" +
      '<div class="ais-tabs" role="tablist">' + tabs.map(([id, label]) => '<button type="button" role="tab" data-tab="' + id + '">' + esc(label) + "</button>").join("") + "</div>" +
      '<div class="ais-panel ais-stack" data-panel="cloud">' + cloudTab + "</div>" +
      '<div class="ais-panel ais-stack" data-panel="local">' + localTab + "</div>" +
      (desktop ? '<div class="ais-panel ais-stack" data-panel="phone">' + phoneTab + "</div>" : "") +
      '<div class="ais-panel ais-stack" data-panel="memory">' + memTab + "</div>"
    );
  }

  function open(startTab) {
    const m = App.ui.modal({
      title: t("ais.title"),
      body: body(),
      actions:
        '<button class="btn btn--ghost" type="button" id="aisReset" style="margin-right:auto">' + esc(t("ais.defaults")) + "</button>" +
        '<button class="btn btn--ghost" type="button" data-close>' + esc(t("cancel")) + "</button>" +
        '<button class="btn btn--primary" type="button" id="aisSave">' + esc(t("save")) + "</button>"
    });
    const el = m.el;
    el.classList.add("modal--wide");
    const $ = (s) => el.querySelector(s);
    const segVal = (name) => { const b = el.querySelector('[data-seg="' + name + '"] [aria-checked="true"]'); return b ? b.dataset.val : ""; };

    /* ---- Sekmeler ve seçimler ---- */
    function showTab(id) {
      el.querySelectorAll("[data-tab]").forEach((b) => b.setAttribute("aria-selected", b.dataset.tab === id));
      el.querySelectorAll("[data-panel]").forEach((p) => { p.hidden = p.dataset.panel !== id; });
    }
    function syncCloudPanel() {
      const c = segVal("aiCloud");
      el.querySelectorAll("[data-panel-cloud]").forEach((p) => { p.hidden = p.dataset.panelCloud !== c; });
    }
    function syncModeHint() {
      $("#aisModeHint").className = "hint";
      $("#aisModeHint").textContent = t("ais.modeHint." + segVal("aiMode"));
      $("#aisPrio").hidden = segVal("aiMode") !== "auto";
      $("#aisPrioHint").textContent = t("prio.hint." + (segVal("aiOncelik") || "cihaz"));
    }
    function syncPreset() {
      const p = App.cloud.PRESETS[$("#oaPreset").value] || {};
      $("#oaBase").placeholder = p.url || "https://…/v1";
      $("#oaKeyLink").innerHTML = p.keyUrl ? link(p.keyUrl, t("ais.getKey")) : "";
    }

    el.addEventListener("click", (e) => {
      const segBtn = e.target.closest("[data-seg] [data-val]");
      if (segBtn) {
        segBtn.parentElement.querySelectorAll("[data-val]").forEach((b) => b.setAttribute("aria-checked", b === segBtn));
        if (segBtn.parentElement.dataset.seg === "aiCloud") syncCloudPanel();
        if (segBtn.parentElement.dataset.seg === "aiMode" || segBtn.parentElement.dataset.seg === "aiOncelik") syncModeHint();
        return;
      }
      const tab = e.target.closest("[data-tab]");
      if (tab) { showTab(tab.dataset.tab); return; }
      const rev = e.target.closest("[data-reveal]");
      if (rev) { const inp = $("#" + rev.dataset.reveal); inp.type = inp.type === "password" ? "text" : "password"; return; }
      const test = e.target.closest("[data-test]");
      if (test) { test.dataset.test === "cloud" ? testCloud() : testLocal(); }
    });
    $("#oaPreset").addEventListener("change", () => { $("#oaBase").value = ""; syncPreset(); });

    /* ---- Formu ayarlara uygula ---- */
    function apply() {
      const set = (k, val) => App.prefs.set(k, val === "" ? null : val);
      set("aiMode", segVal("aiMode"));
      set("aiOncelik", segVal("aiOncelik"));
      App.prefs.set("aiOncelikSoruldu", true);
      set("aiCloud", segVal("aiCloud"));
      if (el.querySelector('[data-seg="srvSpeed"]')) set("srvSpeed", segVal("srvSpeed"));
      set("gemSpeed", segVal("gemSpeed"));
      set("gemKey", $("#gemKey").value.trim());
      set("gemModel", $("#gemModel").value.trim());
      set("gemEmbed", $("#gemEmbed").value.trim());
      set("oaPreset", $("#oaPreset").value);
      set("oaBase", $("#oaBase").value.trim().replace(/\/+$/, ""));
      set("oaKey", $("#oaKey").value.trim());
      set("oaModel", $("#oaModel").value.trim());
      set("oaVision", $("#oaVision").value.trim());
      set("oaEmbed", $("#oaEmbed").value.trim());
      set("aiUrl", $("#aisUrl").value.trim().replace(/\/+$/, ""));      // boş = otomatik
      set("aiToken", $("#aisToken").value.trim().toUpperCase());
      el.querySelectorAll("[data-key]").forEach((inp) => {
        const f = LOCAL_FIELDS.find((x) => x.key === inp.dataset.key);
        const val = inp.value.trim() || f.def();
        // Ana model ve göz modeli otomatik değerde bırakıldıysa kaydetme: kampusai / qwen3-vl sonradan
        // yüklenirse kendiliğinden kullanılsın
        App.prefs.set(f.key, f.role !== "embed" && App.ollama.sameModel(val, f.def()) ? "" : val);
      });
      App.engine.invalidate();
    }

    /** Geçici olarak formdaki değerlerle çalıştır (kaydetmeden) */
    async function withForm(fn) {
      const saved = App.prefs.all();
      apply();
      try { return await fn(); }
      finally {
        KEYS.forEach((k) => App.prefs.set(k, saved[k] != null ? saved[k] : null));
        App.engine.invalidate();
      }
    }

    const errText = (e, engine) => {
      const name = engine ? engine.name : "";
      switch (e && e.code) {
        case "no-key": return t("ai.err.nokeyBody");
        case "auth": return t("ai.err.authTitle", { name }) + " " + t("ai.err.authBody");
        case "net": return t("ai.err.netTitle") + " " + t("ai.err.netBody");
        case "quota": return t("ai.err.quotaTitle", { name });
        case "token": return t("ai.err.tokenTitle");
        case "file-origin": return t("ai.err.fileTitle");
        case "offline": case "aborted": return t("ai.err.offlineBody", { url: $("#aisUrl").value.trim() || App.ollama.config().url });
        default: return (e && e.message) || String(e);
      }
    };

    /* ---- İnternet servisini test et ---- */
    async function testCloud() {
      const out = $("#aisCloudResult");
      out.textContent = t("ai.st.checking");
      const which = segVal("aiCloud");
      try {
        const r = await withForm(async () => {
          const engine = App.engine.engines[which];
          const res = await engine.check();
          return { res, cfg: engine.config(), engine };
        });
        if (which === "gemini") {
          const sel = $("#gemModel"), cur = sel.value;
          sel.innerHTML = '<option value="">' + esc(t("ais.autoModel", { model: r.cfg.chatModel })) + "</option>" +
            r.res.chatModels.map((n) => '<option value="' + esc(n) + '"' + (n === cur ? " selected" : "") + ">" + esc(n) + "</option>").join("");
        } else {
          $("#aisCloudModels").innerHTML = r.res.installed.slice(0, 500).map((n) => '<option value="' + esc(n) + '">').join("");
        }
        out.textContent = r.res.chat
          ? t("ais.cloudOk", { name: r.engine.name, model: r.cfg.chatModel }) + (r.cfg.embedModel && !r.res.embed ? " " + t("ais.embedMissing", { model: r.cfg.embedModel }) : "")
          : (r.cfg.chatModel ? t("ai.err.cloudModelTitle", { model: r.cfg.chatModel }) : t("ais.pickModel"));
      } catch (e) {
        out.textContent = errText(e, App.engine.engines[which]);
      }
    }

    /* ---- Ollama'yı test et ---- */
    async function testLocal() {
      const result = $("#aisResult");
      result.textContent = t("ai.st.checking");
      el.querySelectorAll("[data-state]").forEach((s) => { s.className = "model-state"; s.textContent = ""; });
      try {
        const r = await withForm(() => App.ollama.check());
        $("#aisModels").innerHTML = r.installed.map((n) => '<option value="' + esc(n) + '">').join("");
        const map = { aiChatModel: r.chat, aiEmbedModel: r.embed, aiVisionModel: r.vision };
        Object.entries(map).forEach(([k, ok]) => {
          const s = el.querySelector('[data-state="' + k + '"]');
          s.className = "model-state " + (ok ? "is-ok" : "is-missing");
          s.textContent = ok ? t("ais.installed") : t("ais.notInstalled");
          s.title = ok ? "" : "ollama pull " + el.querySelector('[data-key="' + k + '"]').value.trim();
        });
        result.textContent = t("ais.found", { n: r.installed.length });
      } catch (e) {
        result.textContent = errText(e);
      }
    }

    /* ---- Telefon bağlantısı (Windows uygulaması) ---- */
    async function paintLan(info) {
      const box = $("#lanInfo");
      $("#lanOn").checked = !!info.enabled;
      box.hidden = !info.enabled;
      if (!info.enabled) return;
      const urls = (info.addresses || []).map((ip) => "http://" + ip + ":" + info.port + "/ollama");
      box.innerHTML =
        (urls.length ? '<div class="lan-qr"><div class="lan-qr__code" id="lanQr"></div><p class="hint">' + esc(t("pair.qrHint")) + "</p></div>" : "") +
        '<div class="lan-row"><span class="hint">' + esc(t("ais.lanAddress")) + "</span>" +
          (urls.length ? urls.map((u) => '<code class="cmd">' + esc(u) + "</code>").join(" ") : '<span class="hint">' + esc(t("ais.lanNoNet")) + "</span>") + "</div>" +
        '<div class="lan-row"><span class="hint">' + esc(t("ais.token")) + '</span><code class="cmd lan-code">' + esc(info.token) + "</code>" +
          '<button class="btn btn--sm btn--ghost" type="button" id="lanRegen">' + App.icon("refresh") + esc(t("ais.lanRegen")) + "</button></div>" +
        '<p class="hint">' + esc(t("ais.lanSteps")) + "</p>" +
        (info.error ? '<p class="ai-notice">' + esc(info.error) + "</p>" : "");
      App.hydrateIcons(box);
      if (urls.length) App.pairing.renderQR($("#lanQr"), App.pairing.payload(info)).catch(() => {});
      const regen = $("#lanRegen");
      if (regen) regen.addEventListener("click", async () => paintLan(await window.desktopApp.lan.regenerate()));
    }
    if (App.platform.desktop && window.desktopApp && window.desktopApp.lan) {
      window.desktopApp.lan.get().then(paintLan).catch(() => {});
      $("#lanOn").addEventListener("change", async (e) => {
        try { paintLan(await window.desktopApp.lan.set(e.target.checked)); }
        catch (err) { App.ui.toast(String(err && err.message || err), "error"); }
      });
    }

    /* ---- Yapay zekayı bu bilgisayara indir ---- */
    const dev = App.engine.device && App.engine.device.bridge;
    if (dev && $("#devGo")) {
      const gb = (b) => (b / 1e9).toLocaleString(App.i18n.locale, { maximumFractionDigits: 1 }) + " GB";
      let size = 0;
      let off = null;
      let chosen = "";
      let last = null;
      const paint = (st) => {
        if (!el.isConnected) { if (off) off(); return; }
        if (!st) return;
        last = st;
        if (st.boyut) size = st.boyut;
        const a = st.asama || "yok";
        const ini = a === "iniyor";
        const phone = !!dev.phone;
        const warn = $("#devWarn");
        const warnText = st.destek === false ? t("dev.unsupported")
          : phone && st.bellek && st.bellek < 5.5e9 && !st.kurulu ? t("dev.lowRam", { ram: gb(st.bellek) }) : "";
        warn.hidden = !warnText;
        warn.textContent = warnText;
        $("#devState").textContent = t("dev.st." + a + (phone && (a === "kurulu" || a === "hazir") ? "Phone" : ""), { done: gb(st.indirilen || 0), total: gb(st.toplam || size), file: st.dosya || "", msg: st.hata || "" });
        const bar = $("#devBar");
        bar.hidden = !ini;
        if (ini && st.toplam) bar.value = Math.min(1, (st.indirilen || 0) / st.toplam);
        const go = $("#devGo");
        go.hidden = ini || a === "hazir" || a === "hazirlaniyor" || st.destek === false;
        // Telefon: hafif (E2B) / tam (E4B) seçimi
        const vg = $("#devVar");
        if (vg && st.secenekler) {
          if (!chosen) chosen = st.secim || st.oneri || "tam";
          vg.hidden = ini;
          vg.innerHTML = ["hafif", "tam"].map((v) => '<button type="button" role="radio" data-var="' + v + '" aria-checked="' + (v === chosen) + '">' +
            esc(t("dev.var." + v, { size: gb(st.secenekler[v].boyut) })) + (v === st.oneri ? " · " + esc(t("dev.suggested")) : "") + "</button>").join("");
          $("#devVarHint").hidden = ini;
          $("#devVarHint").textContent = t("dev.varHint." + chosen);
        }
        const other = vg && st.secenekler && chosen !== st.secim;
        if (vg && st.secenekler && st.secenekler[chosen]) size = st.secenekler[chosen].boyut;
        go.textContent = other && (st.kurulu || a === "hazir") ? t("dev.switch", { size: gb(size) })
          : st.kurulu ? t("dev.start") : t("dev.download", { size: gb(size) });
        go.hidden = go.hidden && !other;
        go.disabled = false;
        $("#devCancel").hidden = !ini;
        $("#devDel").hidden = ini || !(st.kurulu || a === "hata");
      };
      off = dev.onProgress(paint);
      dev.status().then(paint).catch(() => {});
      const vg = $("#devVar");
      if (vg) vg.addEventListener("click", (e) => {
        const b = e.target.closest("[data-var]");
        if (!b) return;
        chosen = b.dataset.var;
        if (last) paint(last);
      });
      $("#devGo").addEventListener("click", async (e) => {
        e.currentTarget.disabled = true;
        const st = await dev.status();
        const change = chosen && st.secim && chosen !== st.secim;
        paint(await (change ? dev.download(chosen) : st.kurulu ? dev.start() : dev.download(chosen || undefined)));
        App.engine.invalidate();
        App.modules.assistant.refreshStatus();
      });
      $("#devCancel").addEventListener("click", async () => paint(await dev.cancel()));
      $("#devDel").addEventListener("click", async () => {
        if (!(await App.ui.confirm(t("dev.removeConfirm", { size: gb(size) }), t("dev.remove")))) return;
        await dev.remove();
        paint(await dev.status());
        App.engine.invalidate();
        App.modules.assistant.refreshStatus();
      });
    }

    const gpuBox = $("#uiGpu");
    if (gpuBox) gpuBox.addEventListener("change", async () => {
      if (!(await App.ui.confirm(t("ais.uiGpuRestart"), t("ok")))) { gpuBox.checked = !gpuBox.checked; return; }
      window.desktopApp.gpu.set(gpuBox.checked);
    });

    const scanBtn = $("#pairScan");
    if (scanBtn) scanBtn.addEventListener("click", async () => {
      if (await App.pairing.scanAndConnect()) {
        $("#aisUrl").value = App.prefs.get("aiUrl", "") || "";
        $("#aisToken").value = App.prefs.get("aiToken", "") || "";
        testLocal();
      }
    });

    /* ---- Hafıza ---- */
    $("#aisRebuild").addEventListener("click", async (e) => {
      const btn = e.currentTarget, out = $("#aisMem");
      btn.disabled = true;
      try {
        const res = await withForm(async () => {
          const engine = await App.engine.resolve();
          await engine.prepare();
          return App.rag.rebuild((i, n) => { out.textContent = t("ai.stage.indexing", { i, n }); }, null, engine);
        });
        out.textContent = res.method === "lexical" ? t("ais.rebuiltLexical", { n: res.chunks.length }) : t("ais.rebuilt", { n: res.chunks.length });
      } catch (err) {
        out.textContent = err.code === "model-missing" ? t("ai.err.modelTitle", { model: err.model }) : errText(err);
      }
      btn.disabled = false;
    });

    $("#aisReset").addEventListener("click", () => {
      $("#aisUrl").value = "";
      el.querySelectorAll("[data-key]").forEach((inp) => { inp.value = LOCAL_FIELDS.find((x) => x.key === inp.dataset.key).def(); });
      $("#gemModel").value = "";
      $("#gemEmbed").value = "";
      el.querySelectorAll('[data-seg="aiMode"] [data-val]').forEach((b) => b.setAttribute("aria-checked", b.dataset.val === "auto"));
      syncModeHint();
    });

    $("#aisSave").addEventListener("click", () => {
      apply();
      m.close();
      App.ui.toast(t("set.saved"));
      App.modules.assistant.refreshStatus();
      const r = App.router.current();
      if (r.name === "") App.router.refresh();
    });

    syncCloudPanel();
    syncModeHint();
    syncPreset();
    // İlk açılan sekme: istenen ya da kullanılan motora göre
    const status = App.modules.assistant.status;
    const mode = App.engine.mode();
    const firstTab = startTab || (mode === "local" ? "local" : mode === "cloud" ? "cloud"
      : status.engine && status.engine.kind === "cloud" ? "cloud" : App.engine.localPossible() ? "local" : "cloud");
    showTab(firstTab);
    if (firstTab === "local" && !App.ollama.isFileOrigin()) testLocal();
    else if (firstTab === "cloud" && App.engine.cloud().configured()) testCloud();
  }

  // Uyarı kutularındaki "Yapay zeka ayarları" düğmeleri
  document.addEventListener("click", (e) => {
    const b = e.target.closest("[data-ai-settings]");
    if (b) { e.preventDefault(); open(b.dataset.aiSettings || undefined); }
  });

  /* ---- İlk açılış: otomatik modda öncelik sorusu (Windows ve Android; yalnızca bir kez) ---- */
  function askPriority() {
    if (App.prefs.get("aiOncelikSoruldu", false)) return;
    if (!(App.platform.desktop || App.platform.native)) return;
    if (App.tour && App.tour.isActive && App.tour.isActive()) return;
    if (document.querySelector(".modal-backdrop")) { setTimeout(askPriority, 4000); return; }
    const opt = (id, icon) => '<button type="button" class="card prio-opt" data-prio="' + id + '">' +
      '<span class="prio-opt__title">' + App.icon(icon) + esc(t("prio." + id)) + "</span>" +
      '<span class="hint">' + esc(t("prio.hint." + id)) + "</span></button>";
    const m = App.ui.modal({
      title: t("prio.title"),
      body: '<p class="hint">' + esc(t("prio.intro")) + '</p><div class="prio-opts">' + opt("cihaz", "lock") + opt("internet", "sparkle") + "</div>" +
        '<p class="hint">' + esc(t("prio.later")) + "</p>",
      actions: "",
      onClose: () => App.prefs.set("aiOncelikSoruldu", true)
    });
    m.el.querySelectorAll("[data-prio]").forEach((b) => b.addEventListener("click", () => {
      App.prefs.set("aiOncelik", b.dataset.prio);
      App.prefs.set("aiOncelikSoruldu", true);
      m.close();
      App.engine.invalidate();
      App.modules.assistant.refreshStatus();
      App.ui.toast(t("prio.saved", { name: t("prio." + b.dataset.prio) }));
    }));
  }

  App.modules.aiSettings = { open, askPriority };
})();
