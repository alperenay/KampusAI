/* Optional native STEM model. Independent state and storage from the ordinary assistant. */
(function () {
  const T = (tr, en) => App.i18n.lang === "en" ? en : tr;
  const listeners = new Set();
  const native = () => window.KampusNative;
  const android = App.platform.native && App.platform.os === "android";
  function nativeStatus() { try { return JSON.parse(native().stemStatus()); } catch (e) { return { destek: false }; } }
  const bridge = window.desktopApp && window.desktopApp.stem || (android ? {
    status: async () => nativeStatus(),
    download: async () => { native().stemDownload(); return nativeStatus(); },
    start: async () => { native().stemStart(); return nativeStatus(); },
    cancel: async () => { native().stemCancel(); return nativeStatus(); },
    stop: async () => { native().stemStop(); return nativeStatus(); },
    remove: async () => { native().stemRemove(); return nativeStatus(); }
  } : null);
  let state = null;
  function set(st) { state = st; listeners.forEach((f) => f(st)); }
  window.__nativeStem = set;
  if (bridge) {
    if (bridge.onProgress) bridge.onProgress(set);
    bridge.status().then(set).catch(() => {});
  }
  const mode = () => App.prefs.get("stemMode", App.prefs.get("stemToken", "") ? "service" : "auto");
  async function refresh() { if (bridge) set(await bridge.status()); return state; }
  async function route() {
    const m = mode();
    if (m === "device") return "device";
    if (m !== "auto") return m;
    await refresh();
    return state && state.kurulu ? "device" : "cloud";
  }
  async function ensure(signal) {
    await refresh();
    if (!bridge || !state || !state.kurulu) throw new Error(T("Önce Sayısal Asistan modelini bu cihaza indir.", "Download the STEM model to this device first."));
    if (state.asama !== "hazir") set(await bridge.start());
    const end = Date.now() + 240000;
    while (state.asama !== "hazir") {
      if (signal && signal.aborted) throw new DOMException("Aborted", "AbortError");
      if (state.asama === "hata") throw new Error(state.hata);
      if (Date.now() > end) throw new Error(T("Model açılma süresi doldu.", "Model startup timed out."));
      await new Promise((r) => setTimeout(r, 500)); await refresh();
    }
    return state.adresler && state.adresler.sohbet || "app://local/stem-cihaz/sohbet";
  }
  async function solve(question, subject, signal, onDelta) {
    const base = await ensure(signal);
    const payload = { model: "kampusai-stem-v2", stream: true, temperature: .1, max_tokens: 768,
      messages: [{ role: "system", content: subject + " alanında Türkçe ders asistanısın. Varsayımları belirt. Adım 1, Adım 2 başlıklarıyla kısa çöz. Formülleri $...$ içinde yaz. Son satır Sonuç: olsun. Eksik bilgi varsa belirt, uydurma." }, { role: "user", content: question }],
    };
    const response = await fetch(base + "/v1/chat/completions", { method: "POST", signal, headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload) });
    if (!response.ok) throw new Error(T("Cihazdaki model yanıt veremedi.", "The device model could not answer."));
    let text = "", finished = false, truncated = false;
    await App.cloud.readSSE(response, (data) => {
      if (data.error) throw new Error(T("Model akışı kesildi.", "The model stream failed."));
      const choice = data.choices && data.choices[0];
      if (!choice) return;
      const delta = choice.delta && choice.delta.content;
      if (typeof delta === "string") { text += delta; if (text.length > 18000) throw new Error("response-size"); if (onDelta) onDelta(text); }
      if (choice.finish_reason) { finished = true; truncated = choice.finish_reason === "length"; }
    }, signal);
    if (!finished || !text.trim()) throw new Error(T("Model yanıtı tamamlanmadı.", "The model answer was incomplete."));
    return { text, truncated };
  }
  async function read(image, signal) {
    // OCR uses the installed general vision model, never the text-only STEM model.
    const dev = App.engine.device;
    if (!dev || !dev.bridge || !(dev.state() && dev.state().kurulu)) throw new Error(T("Çevrimdışı fotoğraf okuma için Ayarlar → Yapay zeka bölümünden Gemma görsel modelini indir; soruyu yazarak da çözebilirsin.", "For offline image reading, download the Gemma vision model from AI settings, or type the question."));
    // Release STEM memory before opening the larger vision model.
    if (bridge.stop) await bridge.stop();
    await dev.ensure(signal);
    const engine = App.engine.local;
    const result = await engine.chat({ model: engine.config().visionModel, messages: [{ role: "user", content: "Görseldeki soruyu çözmeden eksiksiz yazıya dök. Formülleri LaTeX yaz; okuyamadığını [okunamadı] belirt.", images: [image.base64] }], signal, options: { temperature: 0, num_predict: 1024 } });
    return { text: result.text, requires_confirmation: true };
  }
  App.stemRuntime = { bridge, mode, route, refresh, state: () => state, solve, read,
    subscribe: (f) => { listeners.add(f); return () => listeners.delete(f); },
    async action(name) { if (!bridge || !["download", "cancel", "remove", "start"].includes(name)) return; set(await bridge[name]()); return state; }
  };
})();
