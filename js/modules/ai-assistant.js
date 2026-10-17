/* =========================================================
   ai-assistant.js — Yapay Zeka Asistanı arayüzü
   #/               → yeni sohbet (karşılama ekranı)
   #/sohbet/<id>    → kayıtlı sohbet

   Yanıtları üreten işlem hattı js/ai/pipeline.js içindedir
   (App.ai.run). Bu dosya yalnızca ekranı ve sohbet kaydını yönetir.
   Sohbetler IndexedDB "chats" deposunda saklanır.
   ========================================================= */
(function () {
  const { esc, uid } = App.utils;
  const t = App.t;
  const SAVE_EVERY_MS = 1500;

  /* ---------------- Durum ---------------- */
  const live = { chatId: null, chat: null, msg: null, controller: null, timer: null, lastSave: 0 };
  let draft = { image: null, text: "" };            // yazılıp henüz gönderilmemiş mesaj
  let mounted = null;                                // { view, chatId } ekranda olan sohbet
  let useData = App.prefs.get("aiUseData", true);
  let socratic = App.prefs.get("aiSocratic", false);     // Sokratik mod: cevap yerine ipuçlarıyla yönlendir

  /* ---------------- Bağlantı durumu ---------------- */
  // state: unknown | ok | partial | missing | offline | file | token | nokey | auth | net | quota | error
  const status = { state: "unknown", missing: [], installed: [], engine: null, cfg: null, checking: null };
  const statusListeners = [];

  async function refreshStatus() {
    if (status.checking) return status.checking;
    status.checking = (async () => {
      try {
        const r = await App.engine.status();
        Object.assign(status, { state: r.state, missing: r.missing, installed: r.installed, engine: r.engine, cfg: r.cfg, error: r.error || null });
      } catch (e) {
        Object.assign(status, { state: "error", missing: [], error: e });
      }
      status.checking = null;
      statusListeners.forEach((fn) => fn(status));
      paintStatus();
      return status;
    })();
    return status.checking;
  }

  /** Şu an seçili (ya da son kontrol edilen) motor ve modelleri */
  const curEngine = () => status.engine || App.engine.local;
  const curCfg = () => status.cfg || curEngine().config();
  const engineName = () => curEngine().name;

  function statusText() {
    const cfg = curCfg();
    switch (status.state) {
      case "ok": return t("ai.st.ok", { name: engineName() });
      case "partial": return t("ai.st.partial", { models: status.missing.join(", ") });
      case "missing": return t("ai.st.missing", { model: cfg.chatModel });
      case "offline": return t("ai.st.offline", { url: cfg.url || "" });
      case "file": return t("ai.st.file");
      case "token": return t("ai.err.tokenTitle");
      case "nokey": return t("ai.st.nokey");
      case "auth": return t("ai.err.authTitle", { name: engineName() });
      case "net": return t("ai.err.netTitle");
      case "quota": return t("ai.err.quotaTitle", { name: engineName() });
      case "error": return t("ai.err.httpTitle");
      default: return t("ai.st.checking");
    }
  }

  function paintStatus() {
    document.querySelectorAll("[data-ai-dot]").forEach((el) => { el.className = "dot dot--" + dotClass(); });
    document.querySelectorAll("[data-ai-pill]").forEach((el) => { el.title = statusText(); });
    document.querySelectorAll("[data-ai-model]").forEach((el) => { el.textContent = shortModel(curCfg().chatModel); });
    document.querySelectorAll("[data-ai-models]").forEach((el) => { el.innerHTML = modelsLine(); App.hydrateIcons(el); });
    const note = document.getElementById("aiNotice");
    if (note) {
      const show = !["ok", "unknown"].includes(status.state);
      note.hidden = !show;
      if (show) note.innerHTML = noticeHtml();
    }
  }

  const dotClass = () => ({ ok: "ok", partial: "partial", missing: "missing", unknown: "unknown" })[status.state] || (status.state === "file" ? "file" : "offline");

  const settingsBtn = (tab) => ' <button class="btn btn--sm" type="button" data-ai-settings="' + (tab || "") + '">' + App.icon("settings") + esc(t("set.aiSettings")) + "</button>";

  function noticeHtml() {
    const cfg = curCfg();
    const cmd = (m) => '<code class="cmd">ollama pull ' + esc(m) + "</code>";
    const local = curEngine().kind === "local";
    switch (status.state) {
      case "file": return "<b>" + esc(t("ai.err.fileTitle")) + "</b> " + esc(t("ai.err.fileBody"));
      case "offline": return "<b>" + esc(t("ai.err.offlineTitle")) + "</b> " + esc(t(App.platform.native || App.platform.mobile ? "ai.err.offlinePhone" : "ai.err.offlineBody", { url: cfg.url || "" })) + settingsBtn("local");
      case "token": return "<b>" + esc(t("ai.err.tokenTitle")) + "</b> " + esc(t("ai.err.tokenBody")) + settingsBtn("local");
      case "nokey": return "<b>" + esc(t("ai.st.nokey")) + "</b> " + esc(t(App.platform.mobile ? "ai.err.nokeyBodyPhone" : "ai.err.nokeyBody")) + settingsBtn("cloud");
      case "auth": return "<b>" + esc(t("ai.err.authTitle", { name: engineName() })) + "</b> " + esc(t("ai.err.authBody")) + settingsBtn("cloud");
      case "net": return "<b>" + esc(t("ai.err.netTitle")) + "</b> " + esc(t("ai.err.netBody"));
      case "quota": return "<b>" + esc(t("ai.err.quotaTitle", { name: engineName() })) + "</b> " + esc(t("ai.err.quotaBody"));
      case "missing": case "partial":
        return local
          ? "<b>" + esc(t("ai.err.missingTitle")) + "</b> " + esc(t("ai.err.missingBody")) + " " + status.missing.map(cmd).join(" ")
          : "<b>" + esc(t("ai.err.cloudModelTitle", { model: status.missing.join(", ") })) + "</b> " + esc(t("ai.err.cloudModelBody")) + settingsBtn("cloud");
      case "error": return "<b>" + esc(t("ai.err.httpTitle")) + "</b> " + esc((status.error && status.error.message) || "");
      default: return "";
    }
  }

  /** Karşılama ekranındaki "göz · hafıza · beyin" satırı */
  function modelsLine() {
    const cfg = curCfg(), engine = curEngine();
    const chip = (icons, m) => "<span>" + icons.map((ic) => App.icon(ic)).join("") + esc(shortModel(m)) + "</span>";
    const items = cfg.direct
      ? [chip(["search"], cfg.embedModel || "BM25"), chip(["eye", "sparkle"], cfg.chatModel)]       // tek model hem görür hem yanıtlar
      : [chip(["eye"], cfg.visionModel), chip(["search"], cfg.embedModel || "BM25"), chip(["sparkle"], cfg.chatModel)];
    return items.join("") + '<span class="home__local">' + esc(engine.kind === "local" ? t("ai.localNote") : t("ai.cloudNote", { name: engine.name })) + "</span>";
  }

  const shortModel = (m) => String(m || "").replace(/:latest$/, "");

  /* ---------------- Sohbet kaydı ---------------- */
  async function saveChat(chat) {
    chat.updatedAt = new Date().toISOString();
    // Kaydetmeden önce geçici alanları temizle
    const clean = JSON.parse(JSON.stringify(chat, (k, v) => (k === "pending" || k === "stage" || k === "visionLive" || k === "memProgress" ? undefined : v)));
    // Yanıt yazılırken sayfa kapanırsa mesaj "yarıda kaldı" olarak görünsün
    chat.messages.forEach((m, i) => { if (m.pending) clean.messages[i].interrupted = true; });
    await App.db.put("chats", clean);
  }

  function newChat(firstText) {
    const title = (firstText || "").replace(/\s+/g, " ").trim();
    return {
      id: uid("chat"),
      title: title ? (title.length > 60 ? title.slice(0, 57) + "…" : title) : t("ai.photoChatTitle"),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      messages: []
    };
  }

  /* ---------------- HTML parçaları ---------------- */
  function composerHtml(placeholder) {
    const busyHere = live.controller && mounted && live.chatId === mounted.chatId;
    return (
      '<form class="composer" id="composer" autocomplete="off">' +
        '<div class="composer__preview" id="imgPreview"' + (draft.image ? "" : " hidden") + ">" +
          (draft.image ? previewInner() : "") +
        "</div>" +
        '<div class="composer__row">' +
          '<button class="icon-btn icon-btn--sm" type="button" data-act="attach" title="' + esc(t("ai.attach")) + '">' + App.icon("image") + "</button>" +
          '<textarea class="composer__input" id="composerInput" rows="1" placeholder="' + esc(placeholder) + '" aria-label="' + esc(t("ai.inputLabel")) + '">' + esc(draft.text) + "</textarea>" +
          '<button class="icon-btn icon-btn--sm composer__toggle" type="button" data-act="data" aria-pressed="' + useData + '" title="' + esc(useData ? t("ai.dataOn") : t("ai.dataOff")) + '">' + App.icon("database") + "</button>" +
          '<button class="icon-btn icon-btn--sm composer__toggle composer__soc" type="button" data-act="socratic" aria-pressed="' + socratic + '" title="' + esc(socratic ? t("soc.on") : t("soc.off")) + '">' + App.icon("compass") + "</button>" +
          '<button class="composer__model" type="button" data-act="model" data-ai-pill title="' + esc(statusText()) + '">' +
            '<span class="dot dot--' + dotClass() + '" data-ai-dot></span><span class="composer__model-name" data-ai-model>' + esc(shortModel(curCfg().chatModel)) + "</span>" + App.icon("chevronD") + "</button>" +
          (busyHere
            ? '<button class="icon-btn icon-btn--sm composer__send composer__stop" type="button" data-act="stop" title="' + esc(t("ai.stop")) + '">' + App.icon("stop") + "</button>"
            : '<button class="icon-btn icon-btn--sm composer__send" type="submit" title="' + esc(t("ai.send")) + '"' + (draft.text.trim() || draft.image ? "" : " hidden") + ">" + App.icon("send") + "</button>") +
        "</div>" +
        '<input type="file" accept="image/*" id="imgInput" hidden>' +
      "</form>"
    );
  }

  function previewInner() {
    return '<img src="' + draft.image.dataUrl + '" alt="">' +
      '<span class="composer__preview-meta">' + esc(t("ai.photoAttached")) + "<small>" + draft.image.width + "×" + draft.image.height + "</small></span>" +
      '<button class="icon-btn icon-btn--sm" type="button" data-act="unattach" title="' + esc(t("ai.removePhoto")) + '">' + App.icon("close") + "</button>";
  }

  function heroHtml() {
    const name = App.prefs.get("userName", "");
    const first = name ? name.trim().split(/\s+/)[0] : "";
    return (
      '<div class="home">' +
        '<div class="home__brand" aria-hidden="true">' + App.icon("logo") + "</div>" +
        '<h1 class="home__title">' + (first ? "<b>" + esc(t("ai.hello", { name: first })) + "</b><br>" : "") + esc(t("ai.headline")) + "</h1>" +
        (App.goals ? App.goals.countdownHtml() : "") +
        composerHtml(t("ai.placeholder")) +
        '<p class="ai-notice" id="aiNotice" hidden></p>' +
        '<nav class="quick" aria-label="' + esc(t("ai.quick")) + '">' +
          '<button type="button" data-prompt="' + esc(t("ai.sugg.today")) + '">' + App.icon("calendar") + esc(t("ai.quickSchedule")) + "</button>" +
          '<button type="button" data-prompt="' + esc(t("ai.sugg.exams")) + '">' + App.icon("chart") + esc(t("ai.quickProgress")) + "</button>" +
          '<button type="button" data-act="attach">' + App.icon("image") + esc(t("ai.quickPhoto")) + "</button>" +
          '<a href="#/konular">' + App.icon("book") + esc(t("ai.quickTopics")) + "</a>" +
        "</nav>" +
        '<p class="home__models" data-ai-models>' + modelsLine() + "</p>" +
      "</div>"
    );
  }

  const STAGE_ICON = { vision: "eye", memory: "search", answer: "sparkle", calc: "calc" };

  function stageHtml(msg) {
    const secs = Math.max(0, Math.round((Date.now() - (msg.startedAt || Date.now())) / 1000));
    let label = t("ai.stage." + (msg.stage || "answer"));
    if (msg.stage === "memory" && msg.memProgress && msg.memProgress[1]) label = t("ai.stage.indexing", { i: msg.memProgress[0], n: msg.memProgress[1] });
    const model = (msg.models || []).filter((m) => m.role === msg.stage).map((m) => m.model)[0] || "";
    return '<div class="stage"><span class="spinner" aria-hidden="true"></span>' + App.icon(STAGE_ICON[msg.stage] || "sparkle") +
      "<span>" + esc(label) + "</span>" + (model ? '<code>' + esc(shortModel(model)) + "</code>" : "") +
      '<span class="stage__time">' + esc(t("ai.seconds", { n: secs })) + "</span></div>";
  }

  function sourcesHtml(src) {
    if (!src) return "";
    const items = ['<li>' + App.icon("chart") + "<span>" + esc(t("ai.src.overview")) + "</span></li>"].concat(src.hits.map((h) =>
      '<li>' + App.icon(h.kind === "exam" ? "chart" : h.kind === "schedule" ? "calendar" : h.kind === "note" ? "note" : h.kind === "lesson" ? "book" : h.kind === "quiz" ? "quiz" : h.kind === "mistake" ? "bookmark" : h.kind === "feynman" ? "mic" : "checkCircle") +
      '<a href="' + esc(h.link) + '">' + esc(h.label) + "</a>" +
      '<span class="src-score" title="' + esc(t("ai.src.score")) + '">' + Math.round(h.score * 100) + "%</span></li>"));
    return '<details class="msg__details"><summary>' + App.icon("search") + esc(t("ai.src.title", { n: src.hits.length + 1 })) + "</summary>" +
      '<ul class="src-list">' + items.join("") + "</ul></details>";
  }

  function errorHtml(err) {
    const engine = App.engine.engines[err.engine] || curEngine();
    const name = engine.name;
    let title, body = "", extra = "";
    switch (err.code) {
      case "file-origin": title = t("ai.err.fileTitle"); body = esc(t("ai.err.fileBody")); break;
      case "offline": title = t("ai.err.offlineTitle");
        body = esc(t(App.platform.mobile ? "ai.err.offlinePhone" : "ai.err.offlineBody", { url: (engine.config().url) || "" })); extra = settingsBtn("local"); break;
      case "token": title = t("ai.err.tokenTitle"); body = esc(t("ai.err.tokenBody")); extra = settingsBtn("local"); break;
      case "no-key": title = t("ai.st.nokey"); body = esc(t("ai.err.nokeyBody")); extra = settingsBtn("cloud"); break;
      case "auth": title = t("ai.err.authTitle", { name }); body = esc(t("ai.err.authBody")); extra = settingsBtn("cloud"); break;
      case "net": title = t("ai.err.netTitle"); body = esc(t("ai.err.netBody")); break;
      case "busy": title = t("ai.err.busyTitle", { name }); body = esc(t("ai.err.busyBody")); break;
      case "quota": title = t("ai.err.quotaTitle", { name });
        // KampüsAI sunucusu kendi açıklamasını (Türkçe, ne yapılacağıyla) gönderir
        body = engine.id === "server" && err.message ? esc(String(err.message).slice(0, 300))
          : esc(t("ai.err.quotaBody")) + (err.message ? '<br><small>' + esc(String(err.message).slice(0, 240)) + "</small>" : "");
        if (engine.id === "server" && App.engine.device && App.engine.device.bridge) extra = settingsBtn("local");
        break;
      case "blocked": title = t("ai.err.blockedTitle"); body = esc(t("ai.err.blockedBody")); break;
      case "model-missing":
        title = t("ai.err.modelTitle", { model: err.model || "" });
        if (engine.kind === "local") body = esc(t("ai.err.modelBody")) + ' <code class="cmd">ollama pull ' + esc(err.model || "") + "</code>";
        else { title = t("ai.err.cloudModelTitle", { model: err.model || "" }); body = esc(t("ai.err.cloudModelBody")); extra = settingsBtn("cloud"); }
        break;
      default: title = engine.kind === "local" ? t("ai.err.httpTitle") : t("ai.err.cloudHttpTitle", { name }); body = esc(err.message || "");
        if (/memory|bellek/i.test(err.message || "")) body += "<br>" + esc(t("ai.err.memoryHint"));
    }
    return '<div class="msg__error"><b>' + esc(title) + "</b><p>" + body + "</p>" +
      '<div class="msg__error-actions"><button class="btn btn--sm" type="button" data-act="retry">' + App.icon("refresh") + esc(t("ai.retry")) + "</button>" + extra + "</div></div>";
  }

  /** Uyarı yalnızca en son yanıtta gösterilsin */
  let latestAiId = null;
  const lastAssistant = (msg) => (latestAiId === null || latestAiId === msg.id ? msg : null);

  function assistantHtml(msg) {
    const parts = [];
    if (msg.transcription || msg.visionLive) {
      parts.push('<details class="msg__details msg__ocr"' + (msg.pending && msg.stage === "vision" ? " open" : "") + "><summary>" + App.icon("eye") +
        esc(t("ai.readFromPhoto")) + "</summary><div class=\"md\">" + App.markdown.render(msg.transcription || msg.visionLive) + "</div></details>");
    }
    (msg.warnings || []).forEach((w) => parts.push('<p class="msg__warn">' + App.icon(w.code === "fallback" ? "refresh" : "search") + esc(t("ai.warn." + w.code, { model: w.model })) + "</p>"));
    if (msg.text) parts.push('<div class="md">' + App.markdown.render(msg.text) + "</div>");
    if (msg.pending) parts.push(stageHtml(msg));
    if (msg.stopped) parts.push('<p class="msg__note">' + esc(t("ai.stopped")) + "</p>");
    if (msg.interrupted && !msg.pending && !msg.error) {
      parts.push('<div class="msg__error"><p>' + esc(t("ai.interrupted")) + '</p><button class="btn btn--sm" type="button" data-act="retry">' + App.icon("refresh") + esc(t("ai.retry")) + "</button></div>");
    }
    if (msg.error) parts.push(errorHtml(msg.error));
    if (!msg.pending && !msg.error && !msg.interrupted) {
      if (msg.socratic && msg.text && msg.id === latestAiId) {
        parts.push('<div class="soc-actions">' + App.icon("compass") + '<span class="hint">' + esc(t("soc.label")) + "</span>" +
          '<button class="btn btn--sm" type="button" data-prompt="' + esc(t("soc.hintMsg")) + '">' + App.icon("lightbulb") + esc(t("soc.hint")) + "</button>" +
          '<button class="btn btn--sm btn--ghost" type="button" data-prompt="' + esc(t("soc.solveMsg")) + '">' + App.icon("eye") + esc(t("soc.solve")) + "</button></div>");
      }
      parts.push(sourcesHtml(msg.sources));
      if (msg.gpu && msg.gpu.ratio < 0.98 && msg === lastAssistant(msg)) {
        parts.push('<div class="msg__warn msg__gpu">' + App.icon("search") + "<span>" + esc(t("ai.gpuPartial", { pct: Math.round(msg.gpu.ratio * 100), model: shortModel(msg.gpu.model) })) +
          ' <button class="btn btn--sm" type="button" data-act="reload-model" data-mid="' + esc(msg.id) + '" data-model="' + esc(msg.gpu.model) + '">' + App.icon("refresh") + esc(t("ai.gpuReload")) + "</button></span></div>");
      }
      const chain = (msg.models || []).map((m) => '<span class="chip-model" title="' + esc(t("ai.role." + m.role)) + '">' + App.icon(STAGE_ICON[m.role]) + esc(shortModel(m.model)) + "</span>").join("");
      const speed = msg.stats && msg.stats.evalMs ? t("ai.speed", { n: Math.round(msg.stats.evalCount / (msg.stats.evalMs / 1000)) }) : "";
      parts.push('<div class="msg__foot">' + chain +
        (msg.durationMs ? '<span class="msg__meta">' + esc(t("ai.seconds", { n: Math.round(msg.durationMs / 1000) })) + (speed ? " · " + esc(speed) : "") + "</span>" : "") +
        (msg.text ? '<button class="icon-btn icon-btn--sm" type="button" data-act="copy" data-mid="' + esc(msg.id) + '" title="' + esc(t("ai.copy")) + '">' + App.icon("copy") + "</button>" : "") +
        (msg.text && App.speech.ttsAvailable() ? '<button class="icon-btn icon-btn--sm" type="button" data-listen aria-pressed="false" title="' + esc(t("a11y.listenTitle")) + '">' + App.icon("volume") + "</button>" : "") +
        (msg.text ? '<button class="icon-btn icon-btn--sm" type="button" data-act="to-mistakes" data-mid="' + esc(msg.id) + '" title="' + esc(t("mis.addFromChat")) + '">' + App.icon("bookmark") + "</button>" : "") +
        (msg.text ? '<button class="icon-btn icon-btn--sm" type="button" data-act="similar" data-mid="' + esc(msg.id) + '" title="' + esc(t("sim.fromChat")) + '">' + App.icon("layers") + "</button>" : "") +
        "</div>");
    }
    return '<div class="msg__avatar">' + App.icon("logo") + '</div><div class="msg__body">' + parts.join("") + "</div>";
  }

  function messageHtml(msg) {
    if (msg.role === "user") {
      return '<div class="msg msg--user" data-mid="' + esc(msg.id) + '"><div class="msg__bubble">' +
        (msg.image ? '<button type="button" class="msg__img" data-act="zoom" data-mid="' + esc(msg.id) + '"><img src="' + msg.image + '" alt="' + esc(t("ai.photo")) + '"></button>' : "") +
        (msg.text ? '<div class="msg__text">' + esc(msg.text) + "</div>" : "") + "</div></div>";
    }
    return '<div class="msg msg--ai" data-mid="' + esc(msg.id) + '">' + assistantHtml(msg) + "</div>";
  }

  function chatHtml(chat) {
    const ais = chat.messages.filter((m) => m.role === "assistant");
    latestAiId = ais.length ? ais[ais.length - 1].id : null;
    return (
      '<div class="chat">' +
        '<div class="chat__log" id="chatLog">' + chat.messages.map(messageHtml).join("") + "</div>" +
        '<div class="chat__bottom">' + composerHtml(t("ai.placeholderChat")) +
          '<p class="ai-notice" id="aiNotice" hidden></p>' +
          '<p class="chat__note">' + esc(t("ai.note")) + "</p>" +
        "</div>" +
      "</div>"
    );
  }

  /* ---------------- Ekran ---------------- */
  function renderHome(view) {
    mounted = { view, chatId: null };
    document.getElementById("main").classList.add("is-home");
    view.innerHTML = heroHtml();
    App.hydrateIcons(view);
    bind(view, null);
    paintStatus();
    if (status.state !== "ok" && status.state !== "partial") refreshStatus();
  }

  async function renderChat(view, chatId) {
    const chat = live.chatId === chatId && live.chat ? live.chat : await App.db.get("chats", chatId);
    if (!chat) { App.ui.toast(t("ai.chatNotFound"), "error"); App.router.go(""); return; }
    mounted = { view, chatId };
    document.getElementById("main").classList.remove("is-home");
    App.setTitle(chat.title);
    App.router.syncNav();
    view.innerHTML = chatHtml(chat);
    App.hydrateIcons(view);
    bind(view, chat);
    paintStatus();
    scrollToEnd(view, true);
  }

  function scrollToEnd(view, force) {
    const nearBottom = view.scrollHeight - view.scrollTop - view.clientHeight < 160;
    if (force || nearBottom) view.scrollTop = view.scrollHeight;
  }

  let paintQueued = false;
  /** Yanıt akarken yalnızca son mesajı yeniden çizer */
  function paintLive() {
    if (paintQueued) return;
    paintQueued = true;
    requestAnimationFrame(() => {
      paintQueued = false;
      if (!mounted || !live.msg || mounted.chatId !== live.chatId) return;
      const el = mounted.view.querySelector('.msg[data-mid="' + live.msg.id + '"]');
      if (!el) return;
      const stick = mounted.view.scrollHeight - mounted.view.scrollTop - mounted.view.clientHeight < 160;
      el.innerHTML = assistantHtml(live.msg);
      if (stick) mounted.view.scrollTop = mounted.view.scrollHeight;
    });
  }

  function repaintComposerButton() {
    if (!mounted || !mounted.view) return;
    const form = mounted.view.querySelector("#composer");
    if (!form) return;
    const input = form.querySelector("#composerInput");
    draft.text = input ? input.value : draft.text;
    const fresh = document.createElement("div");
    fresh.innerHTML = composerHtml(input ? input.placeholder : "");
    form.replaceWith(fresh.firstChild);
    bind(mounted.view, null, true);
  }

  /* ---------------- Gönder ---------------- */
  async function send(view, chat) {
    if (live.controller) { App.ui.toast(t("ai.busy")); return; }
    const text = draft.text.trim();
    const image = draft.image;
    if (!text && !image) return;

    if (!chat) {
      chat = newChat(text);
      await saveChat(chat);
      history.replaceState(null, "", "#/sohbet/" + chat.id);
    }
    const history_ = chat.messages.slice();
    const userMsg = { id: uid("m"), role: "user", text, image: image ? image.dataUrl : null, at: new Date().toISOString() };
    const aiMsg = { id: uid("m"), role: "assistant", text: "", pending: true, stage: image ? "vision" : useData ? "memory" : "answer", models: [], startedAt: Date.now(), socratic };
    chat.messages.push(userMsg, aiMsg);
    latestAiId = aiMsg.id;
    draft = { image: null, text: "" };
    await start(chat, userMsg, aiMsg, history_, image);
  }

  async function start(chat, userMsg, aiMsg, history_, image) {
    live.chatId = chat.id; live.chat = chat; live.msg = aiMsg;
    live.controller = new AbortController();
    live.lastSave = 0;
    live.timer = setInterval(paintLive, 1000);
    await saveChat(chat);
    if (mounted && (mounted.chatId === chat.id || !mounted.chatId)) await renderChat(mounted.view, chat.id);

    const throttledSave = () => {
      if (Date.now() - live.lastSave > SAVE_EVERY_MS) { live.lastSave = Date.now(); saveChat(chat); }
    };

    try {
      const res = await App.ai.run({
        text: userMsg.text,
        image: image || (userMsg.image ? { base64: userMsg.image.split(",")[1] } : null),
        history: history_,
        useData,
        socratic: !!aiMsg.socratic,
        signal: live.controller.signal,
        on: {
          engine: (engine) => { aiMsg.engine = engine.id; },
          stage: (name, model) => {
            aiMsg.stage = name;
            const cur = aiMsg.models.find((m) => m.role === name);
            if (!cur) aiMsg.models.push({ role: name, model }); else cur.model = model;
            paintLive(); saveChat(chat);
          },
          visionDelta: (full) => { aiMsg.visionLive = full; paintLive(); },
          transcription: (txt) => { aiMsg.transcription = txt; userMsg.transcription = txt; paintLive(); saveChat(chat); },
          memoryProgress: (i, n) => { aiMsg.memProgress = [i, n]; paintLive(); },
          sources: (s) => { aiMsg.sources = s; paintLive(); },
          warning: (w) => { (aiMsg.warnings = aiMsg.warnings || []).push(w); paintLive(); },
          delta: (full) => { aiMsg.text = full; paintLive(); throttledSave(); }
        }
      });
      aiMsg.text = res.text;
      aiMsg.stats = res.stats;
      aiMsg.models = res.models;
      aiMsg.engine = res.engine;
      aiMsg.gpu = res.gpu || null;
      if (res.warnings && res.warnings.length) aiMsg.warnings = res.warnings;
      if (status.state !== "ok" || (status.engine && status.engine.id !== res.engine)) refreshStatus();   // durum noktasını güncelle
    } catch (e) {
      if (e && e.code === "aborted") aiMsg.stopped = true;
      else {
        aiMsg.error = { code: (e && e.code) || "http", model: e && e.model, message: (e && e.message) || String(e), engine: aiMsg.engine };
        if (e && e.code !== "http") { App.engine.invalidate(); refreshStatus(); }
      }
      if (e && e.partial && !aiMsg.text) aiMsg.text = e.partial;
    }
    aiMsg.pending = false;
    aiMsg.durationMs = Date.now() - aiMsg.startedAt;
    clearInterval(live.timer);
    live.controller = null; live.msg = null; live.chat = null; live.chatId = null;
    await saveChat(chat);
    if (mounted && mounted.chatId === chat.id) {
      const el = mounted.view.querySelector('.msg[data-mid="' + aiMsg.id + '"]');
      if (el) { el.innerHTML = assistantHtml(aiMsg); App.hydrateIcons(el); }
      repaintComposerButton();
    }
  }

  async function retry(chat) {
    if (live.controller) { App.ui.toast(t("ai.busy")); return; }
    // Son kullanıcı mesajını ve başarısız yanıtı bul
    let i = chat.messages.length - 1;
    while (i >= 0 && chat.messages[i].role !== "assistant") i--;
    const userIdx = i - 1;
    if (userIdx < 0 || chat.messages[userIdx].role !== "user") return;
    const userMsg = chat.messages[userIdx];
    chat.messages.splice(i, 1);
    const aiMsg = { id: uid("m"), role: "assistant", text: "", pending: true, stage: userMsg.image ? "vision" : useData ? "memory" : "answer", models: [], startedAt: Date.now(), socratic };
    chat.messages.push(aiMsg);
    latestAiId = aiMsg.id;
    await start(chat, userMsg, aiMsg, chat.messages.slice(0, userIdx), null);
  }

  /* ---------------- Olaylar ---------------- */
  async function attachFile(file, view) {
    try {
      draft.image = await App.vision.prepare(file);
    } catch (e) {
      App.ui.toast(t("ai.photoError"), "error");
      return;
    }
    const prev = view.querySelector("#imgPreview");
    if (prev) { prev.innerHTML = previewInner(); prev.hidden = false; App.hydrateIcons(prev); }
    const sendBtn = view.querySelector(".composer__send:not(.composer__stop)");
    if (sendBtn) sendBtn.hidden = false;
    const input = view.querySelector("#composerInput");
    if (input) input.focus();
  }

  function bind(view, chat, composerOnly) {
    const form = view.querySelector("#composer");
    const input = view.querySelector("#composerInput");
    const fileInput = view.querySelector("#imgInput");

    const grow = () => {
      input.style.height = "auto";
      input.style.height = Math.min(input.scrollHeight, 180) + "px";
      draft.text = input.value;
      const sendBtn = form.querySelector(".composer__send:not(.composer__stop)");
      if (sendBtn) sendBtn.hidden = !(input.value.trim() || draft.image);
    };
    input.addEventListener("input", grow);
    if (input.value) grow();
    input.addEventListener("keydown", (e) => {
      if (e.key === "Enter" && !e.shiftKey && !e.isComposing) { e.preventDefault(); form.requestSubmit(); }
    });
    input.addEventListener("paste", (e) => {
      const item = Array.from((e.clipboardData && e.clipboardData.items) || []).find((it) => it.type.indexOf("image/") === 0);
      if (item) { e.preventDefault(); attachFile(item.getAsFile(), view); }
    });
    fileInput.addEventListener("change", () => { if (fileInput.files[0]) attachFile(fileInput.files[0], view); fileInput.value = ""; });

    form.addEventListener("submit", async (e) => {
      e.preventDefault();
      draft.text = input.value;
      const currentChat = chat || (mounted && mounted.chatId ? await App.db.get("chats", mounted.chatId) : null);
      send(view, currentChat);
    });

    form.addEventListener("click", (e) => {
      const act = e.target.closest("[data-act]");
      if (!act) return;
      const a = act.dataset.act;
      if (a === "attach") fileInput.click();
      else if (a === "unattach") { draft.image = null; const p = view.querySelector("#imgPreview"); p.hidden = true; p.innerHTML = ""; grow(); }
      else if (a === "data") {
        useData = !useData;
        App.prefs.set("aiUseData", useData);
        act.setAttribute("aria-pressed", useData);
        act.title = useData ? t("ai.dataOn") : t("ai.dataOff");
        App.ui.toast(useData ? t("ai.dataOn") : t("ai.dataOff"));
      } else if (a === "socratic") {
        socratic = !socratic;
        App.prefs.set("aiSocratic", socratic);
        view.querySelectorAll('[data-act="socratic"]').forEach((b) => { b.setAttribute("aria-pressed", socratic); b.title = socratic ? t("soc.on") : t("soc.off"); });
        App.ui.toast(socratic ? t("soc.toastOn") : t("soc.toastOff"));
      } else if (a === "model") App.modules.aiSettings.open();
      else if (a === "stop") { if (live.controller) live.controller.abort(); }
    });

    if (composerOnly) return;

    // Sohbet alanındaki düğmeler (kopyala, yeniden dene, fotoğrafı büyüt)
    view.onclick = async (e) => {
      const prompt = e.target.closest("[data-prompt]");
      if (prompt) {
        // Yanıt bitince yazı kutusu yeniden çiziliyor: her zaman güncel öğeleri kullan
        const f = view.querySelector("#composer"), inp = view.querySelector("#composerInput");
        draft.text = prompt.dataset.prompt;
        if (inp) { inp.value = draft.text; inp.dispatchEvent(new Event("input")); }
        if (f) f.requestSubmit();
        return;
      }
      const act = e.target.closest("[data-act]");
      if (!act || form.contains(act)) return;           // biçimin kendi düğmeleri yukarıda işleniyor
      const a = act.dataset.act;
      // Dosya seçici, tıklamayla aynı anda açılmalı (araya bekleme girerse tarayıcı engeller)
      if (a === "attach") { fileInput.click(); return; }
      const c = chat || (mounted && mounted.chatId ? (live.chatId === mounted.chatId ? live.chat : await App.db.get("chats", mounted.chatId)) : null);
      if (!c) return;
      const msg = c.messages.find((m) => m.id === act.dataset.mid);
      if (a === "copy" && msg) {
        try { await navigator.clipboard.writeText(msg.text); App.ui.toast(t("ai.copied")); }
        catch (err) { App.ui.toast(t("ai.copyFailed"), "error"); }
      } else if (a === "to-mistakes" && msg) {
        const idx = c.messages.indexOf(msg);
        const u = c.messages.slice(0, idx).reverse().find((m) => m.role === "user");
        const q = [u && u.text, u && u.transcription].filter(Boolean).join("\n\n");
        await App.mistakes.add({ source: "chat", label: c.title || t("mis.src.chat"), q, image: (u && u.image) || null, explain: msg.text, nextAt: new Date().toISOString() });
        App.ui.toast(t("mis.added"));
      } else if (a === "similar" && msg) {
        const idx = c.messages.indexOf(msg);
        const u = c.messages.slice(0, idx).reverse().find((m) => m.role === "user");
        const q = [u && u.text, u && u.transcription].filter(Boolean).join("\n\n");
        if (!q && !(u && u.image)) return;
        App.similar.open({ q, image: (u && u.image) || null, explain: msg.text, label: c.title || "" });
      } else if (a === "retry") retry(c);
      else if (a === "reload-model") {
        act.disabled = true;
        try { await App.ollama.unload(act.dataset.model); App.ui.toast(t("ai.gpuReloaded")); act.closest(".msg__gpu").remove(); if (msg) { msg.gpu = null; saveChat(c); } }
        catch (err) { App.ui.toast(t("ai.err.offlineTitle"), "error"); act.disabled = false; }
      }
      else if (a === "zoom" && msg && msg.image) {
        App.ui.modal({ title: t("ai.photo"), body: '<img class="zoom-img" src="' + msg.image + '" alt="">' });
      }
    };

    // Fotoğrafı sürükle-bırak
    view.ondragover = (e) => { if (Array.from(e.dataTransfer.types || []).includes("Files")) { e.preventDefault(); form.classList.add("is-drop"); } };
    view.ondragleave = (e) => { if (!view.contains(e.relatedTarget)) form.classList.remove("is-drop"); };
    view.ondrop = (e) => {
      const f = Array.from(e.dataTransfer.files || []).find((x) => /^image\//.test(x.type));
      form.classList.remove("is-drop");
      if (f) { e.preventDefault(); attachFile(f, view); }
    };
  }

  function cleanup(view) {
    return () => { view.onclick = null; view.ondragover = null; view.ondragleave = null; view.ondrop = null; mounted = null; };
  }

  /* ---------------- Sohbet listesi (kenar çubuğu) ---------------- */
  async function listChats() {
    const all = await App.db.getAll("chats");
    return all.sort((a, b) => String(b.updatedAt).localeCompare(String(a.updatedAt)));
  }

  async function deleteChat(id) {
    if (!(await App.ui.confirm(t("ai.deleteConfirm"), t("delete"), true))) return;
    if (live.chatId === id && live.controller) live.controller.abort();
    await App.db.remove("chats", id);
    const r = App.router.current();
    if (r.name === "sohbet" && r.params[0] === id) App.router.go("");
    App.ui.toast(t("ai.deleted"));
  }

  /* ---------------- Rotalar ---------------- */
  App.router.register("sohbet", async (view, params) => {
    await renderChat(view, params[0]);
    return cleanup(view);
  });

  function render(view) {
    renderHome(view);
    if (autoSend) {
      autoSend = false;
      const form = view.querySelector("#composer");
      if (form) setTimeout(() => form.requestSubmit(), 60);
    }
    return cleanup(view);
  }

  /** Başka sayfadan (ör. yanlış defteri) hazır bir soruyla yeni sohbet başlat */
  let autoSend = false;
  function startWith(text, imageDataUrl) {
    if (live.controller) { App.ui.toast(t("ai.busy")); return; }
    draft = { text: text || "", image: imageDataUrl ? { dataUrl: imageDataUrl, base64: String(imageDataUrl).split(",")[1], width: 0, height: 0 } : null };
    autoSend = true;
    if (location.hash === "#/" || location.hash === "") App.router.refresh(); else App.router.go("");
  }

  function reset() { if (!live.controller) draft = { image: null, text: "" }; }

  App.modules.assistant = { render, reset, startWith, refreshStatus, status, listChats, deleteChat, onStatus: (fn) => statusListeners.push(fn), isBusy: () => !!live.controller, liveChatId: () => live.chatId };
})();
