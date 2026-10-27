/* Isolated text-model + OCR client. Does not write quiz/research/profile stores. */
(function () {
  const { esc } = App.utils;
  const T = (tr, en) => App.i18n.lang === "en" ? en : tr;
  const SUBJECTS = ["Matematik", "Fizik", "Kimya", "Biyoloji"];
  const GUIDE = "https://github.com/alperenay/ders-asistani/blob/main/STEM_MODEL.md";
  let previousDispose = null;
  function endpoint(value) {
    const u = new URL(String(value || "").trim());
    if (!/^https?:$/.test(u.protocol) || u.username || u.password || u.search || u.hash) throw new Error(T("Geçerli bir http/https sunucu adresi yazın.", "Enter a valid HTTP/HTTPS server URL."));
    return u.href.replace(/\/+$/, "");
  }
  function config() { return { url: App.prefs.get("stemServiceUrl", "http://127.0.0.1:8766"), token: App.prefs.get("stemToken", "") }; }
  async function request(path, options, signal, chosen) {
    const mode = chosen || (App.stemRuntime ? await App.stemRuntime.route() : "service");
    if (mode === "device") {
      if (path === "/health") { const st = await App.stemRuntime.refresh(); return new Response(JSON.stringify({ ok: !!(st && st.kurulu), model: "kampusai-stem-v2" })); }
      throw new Error("Bu işlem cihaz modelinde desteklenmiyor.");
    }
    if (mode === "cloud") throw new Error(T("Özel modelin internet servisi henüz etkin değil. Cihaza indirerek veya Bilgisayar bağlantısı ile kullanabilirsin.", "The custom model internet service is not active yet. Download it or use Computer connection."));
    const c = config();
    if (!c.token) throw new Error(T("Önce bilgisayar bağlantı kodunu girin.", "Enter your computer connection code first."));
    const res = await fetch(endpoint(c.url) + path, Object.assign({}, options, { signal, cache: "no-store", headers: Object.assign({}, options && options.headers, { Authorization: "Bearer " + c.token }) }));
    if (!res.ok) {
      let message = T("Bağlantı kurulamadı.", "Connection failed.");
      try { const data = await res.json(); if (typeof data.detail === "string") message = data.detail; } catch (e) { /* not JSON */ }
      throw new Error(message);
    }
    return res;
  }
  async function solve(question, subject, signal, onDelta) {
    if (!SUBJECTS.includes(subject) || question.trim().length < 3 || question.length > 6000) throw new Error(T("Soruyu ve ders seçimini kontrol edin.", "Check the question and subject."));
    const mode = App.stemRuntime ? await App.stemRuntime.route() : "service";
    if (mode === "device") return App.stemRuntime.solve(question.trim(), subject, signal, onDelta);
    const res = await request("/solve", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ question: question.trim(), subject }) }, signal, mode);
    let text = "", done = false, truncated = false, buffer = "";
    function line(s) {
      if (!s.trim()) return;
      const data = JSON.parse(s);
      if (data.error) throw new Error(data.error);
      if (typeof data.delta === "string") { text += data.delta; if (text.length > 18000) throw new Error("response-size"); if (onDelta) onDelta(text); }
      if (data.done) { done = true; truncated = !!data.truncated; }
    }
    if (res.body && res.body.getReader) {
      const reader = res.body.getReader(), decoder = new TextDecoder();
      try {
        while (true) {
          const part = await reader.read();
          if (part.done) break;
          buffer += decoder.decode(part.value, { stream: true });
          let i; while ((i = buffer.indexOf("\n")) >= 0) { line(buffer.slice(0, i)); buffer = buffer.slice(i + 1); }
          if (buffer.length > 65536) throw new Error("response-size");
        }
        buffer += decoder.decode(); if (buffer.trim()) line(buffer);
      } finally { await reader.cancel().catch(() => {}); reader.releaseLock(); }
    } else { (await res.text()).split("\n").forEach(line); }
    if (!done || !text.trim()) throw new Error(T("Yanıt tamamlanmadı; yeniden deneyin.", "The answer was incomplete; try again."));
    return { text, truncated };
  }
  function mathText(text) {
    // Some model answers omit delimiters. Format only explicit numeric results or
    // entire simple algebra lines; never evaluate or rewrite the model's answer.
    const simple = (s) => /^[0-9A-Za-z_(){}.+\-*/^= \t]+$/.test(s) && /[=^]/.test(s) && !/\b[A-Za-z]{2,}\b/.test(s);
    const lines = String(text).split("\n").map((line) => simple(line.trim()) ? "$" + line.trim() + "$" : line).join("\n");
    return lines.replace(/((?:^|\n)(?:#+\s*)?(?:Adım\s+\d+|Sonuç)\s*:\s*)([^\n]+)/g, (all, prefix, body) => {
      const clean = body.trim().replace(/\.$/, "");
      if (clean.indexOf("$") >= 0 || clean.indexOf("\\") >= 0) return all;
      if (simple(clean)) return prefix + "$" + clean + "$";
      if (/Sonuç/.test(prefix)) return prefix + body.replace(/^([-+]?\d+(?:[.,]\d+)?(?:\s*\/\s*\d+)?)(?=\s|$|[;])/, "$$$1$$");
      return all;
    });
  }
  function answerHtml(text) {
    const parts = mathText(text).split(/(?=^(?:#+\s*)?(?:Adım\s+\d+|Sonuç)\s*[:.)-])/m).filter((s) => s.trim());
    return parts.map((part) => '<section class="card stem-step' + (/^(?:#+\s*)?Sonuç/.test(part) ? " stem-step--result" : "") + '"><div class="md">' + App.markdown.render(part.trim()) + '</div></section>').join("");
  }
  function render(view) {
    if (previousDispose) previousDispose();
    App.setTitle(T("Sayısal Asistan", "STEM Assistant"));
    let active = null, timer = null, image = null, camera = null, disposed = false, unsubscribe = null;
    view.innerHTML = '<div class="page stem-page"><div class="page-head"><div><h1>' + esc(T("Sayısal Asistan", "STEM Assistant")) + '</h1><p>' + esc(T("Sorunu yaz veya fotoğrafını yükle; çözümü adım adım incele.", "Type a question or upload a photo and explore the solution step by step.")) + '</p></div></div>' +
      '<p class="hint"><strong>' + esc(T("Deneysel özel model", "Experimental custom model")) + '</strong> · <a href="https://github.com/alperenay/ders-asistani/blob/main/STEM_MODEL_CARD.md" target="_blank" rel="noopener">' + esc(T("Ölçüm sonuçları ve sınırlar", "Measurements and limitations")) + '</a></p>' +
      '<section class="card stem-mode"><label class="field"><span>' + esc(T("Çalışma şekli", "Processing mode")) + '</span><select class="select" id="stemMode"><option value="auto">' + esc(T("Otomatik · indirilmiş modeli kullan", "Automatic · use downloaded model")) + '</option><option value="device">' + esc(T("Bu cihaz · internetsiz", "This device · offline")) + '</option><option value="cloud">' + esc(T("İnternet · sunucu kurulumu bekleniyor", "Internet · server setup pending")) + '</option><option value="service">' + esc(T("Kendi bilgisayarım / sunucum", "My computer / server")) + '</option></select></label><div id="stemDownloadBox"><p class="hint">' + esc(T("Sayısal Asistan · 3,29 GB. İlk indirme için internet, kurulumda yaklaşık 7 GB boş alan gerekir. Sonrasında soru çözümü cihazda çalışır; Ollama veya Python gerekmez.", "STEM Assistant · 3.29 GB. Internet and about 7 GB free space are needed for installation. Afterwards, questions run on the device without Ollama or Python.")) + '</p><div class="stem-actions"><button class="btn btn--primary" id="stemDownload">' + esc(T("Modeli bu cihaza indir", "Download model to this device")) + '</button><button class="btn" id="stemDownloadCancel" hidden>' + esc(T("İndirmeyi durdur", "Stop download")) + '</button><button class="btn btn--ghost" id="stemRemove" hidden>' + esc(T("Modeli kaldır", "Remove model")) + '</button></div><progress id="stemDownloadProgress" max="100" value="0" hidden style="width:100%"></progress><p id="stemDeviceStatus" class="hint" role="status"></p><p class="hint">' + esc(T("Built with Qwen · Yalnız ticari olmayan araştırma ve değerlendirme. İndirerek model lisansını kabul edersin.", "Built with Qwen · Non-commercial research and evaluation only. Downloading means accepting the model license.")) + ' <a href="https://github.com/alperenay/ders-asistani/blob/main/MODEL_LICENSE_QWEN.txt" target="_blank" rel="noopener">' + esc(T("Model lisansı", "Model license")) + '</a></p></div><p id="stemWebHint" class="hint" hidden>' + esc(T("Bu tarayıcıda yerel model motoru yok. Cihaza indirmek için Windows/Linux veya Android uygulamasını kullan. iPhone için yerel çalışma henüz desteklenmiyor.", "This browser has no native model engine. Use the Windows/Linux or Android app to download. On-device iPhone inference is not supported yet.")) + '</p><p class="hint">' + esc(T("İnternet üzerinden aynı özel modeli çalıştıracak sunucu henüz bağlı değil. Gemini bu modelin yerine gizlice kullanılmaz.", "The server for the same custom model is not connected yet. Gemini is not silently substituted.")) + '</p></section>' +
      '<details class="card stem-connect"><summary>' + esc(T("Bilgisayar bağlantısı", "Computer connection")) + '</summary><p class="hint">' + esc(T("Özel model, bağlandığın bilgisayarda çalışır. Telefonunda aynı sunucuya bağlanabilirsin.", "The custom model runs on the connected computer. Your phone can use the same server.")) + '</p><div class="stem-grid"><label class="field"><span>' + esc(T("Sunucu adresi", "Server URL")) + '</span><input class="input" type="url" id="stemUrl" autocomplete="off"></label><label class="field"><span>' + esc(T("Bağlantı kodu", "Connection code")) + '</span><input class="input" type="password" id="stemToken" autocomplete="off"></label></div><div class="stem-actions"><button class="btn" id="stemCheck">' + esc(T("Kaydet ve kontrol et", "Save and check")) + '</button><a class="btn btn--ghost" href="' + GUIDE + '" target="_blank" rel="noopener">' + esc(T("Kurulum kılavuzu", "Setup guide")) + '</a></div><p class="hint" id="stemConnection" role="status"></p></details>' +
      '<section class="card stem-input"><label class="field"><span>' + esc(T("Ders", "Subject")) + '</span><select class="select" id="stemSubject">' + SUBJECTS.map((s, i) => '<option value="' + s + '">' + esc(App.i18n.lang === "en" ? ["Mathematics", "Physics", "Chemistry", "Biology"][i] : s) + '</option>').join("") + '</select></label><div class="stem-actions"><button class="btn" id="stemCamera">' + App.icon("camera") + esc(T("Fotoğraf çek", "Take photo")) + '</button><button class="btn" id="stemGallery">' + esc(T("Görsel yükle", "Upload image")) + '</button><button class="btn btn--ghost" id="stemClear" hidden>' + esc(T("Görseli kaldır", "Remove image")) + '</button></div><input type="file" id="stemFile" accept="image/jpeg,image/png,image/webp,image/heic" hidden><input type="file" id="stemCapture" accept="image/*" capture="environment" hidden><img id="stemPreview" class="stem-preview" alt="' + esc(T("Soru görseli", "Question image")) + '" hidden><button class="btn" id="stemRead" hidden>' + esc(T("Görseldeki metni oku", "Read text from image")) + '</button><p class="hint">' + esc(T("Cihaz modunda görsel cihazda işlenir. Bilgisayar bağlantısında seçtiğin sunucuya gönderilir. Okunan metni kontrol et.", "Device mode processes images locally. Computer connection sends them to your selected server. Check the transcription.")) + '</p><label class="field"><span>' + esc(T("Soru / okunan metin", "Question / transcribed text")) + '</span><textarea class="textarea" id="stemQuestion" rows="6" maxlength="6000"></textarea></label><div class="stem-actions"><button class="btn btn--primary" id="stemSolve">' + esc(T("Adım adım çöz", "Solve step by step")) + '</button><button class="btn" id="stemCancel" hidden>' + esc(T("İptal", "Cancel")) + '</button></div><p id="stemStatus" role="status" aria-live="polite"></p></section><div id="stemAnswer" class="stem-answer" aria-live="polite"></div><p class="hint">' + esc(T("Built with Qwen · Araştırma ve değerlendirme modeli. Çözümler hatalı olabilir; sonucu denetle.", "Built with Qwen · Research and evaluation model. Solutions may contain errors; verify the result.")) + '</p></div>';
    const $ = (s) => view.querySelector(s), c = config(); $("#stemUrl").value = c.url; $("#stemToken").value = c.token;
    function stop() { if (active) active.abort(); if (timer) clearTimeout(timer); active = null; timer = null; }
    function dispose() { if (disposed) return; disposed = true; stop(); if (camera) camera.close(); window.removeEventListener("hashchange", dispose); if (unsubscribe) unsubscribe(); if (previousDispose === dispose) previousDispose = null; }
    previousDispose = dispose;
    window.addEventListener("hashchange", dispose);
    function status(s, error) { if (disposed) return; $("#stemStatus").textContent = s; $("#stemStatus").className = error ? "stem-error" : "hint"; }
    async function task(fn, label, timeout) {
      if (active) return;
      const ctrl = new AbortController(); active = ctrl; timer = setTimeout(() => ctrl.abort(), timeout || 180000);
      view.querySelectorAll(".stem-input button,.stem-input select,.stem-input textarea,.stem-mode select").forEach((b) => { b.disabled = true; });
      $("#stemCancel").hidden = false; $("#stemCancel").disabled = false; status(label);
      try { await fn(ctrl.signal); }
      catch (e) {
        let message = e.message || "";
        if (/fetch|network|load failed/i.test(message)) message = T("Sunucuya erişilemiyor. Adresi, bağlantı kodunu ve sunucunun açık olduğunu kontrol et.", "Server unavailable. Check its URL, connection code and whether it is running.");
        if (/^(decode|not-image|response-size)$/.test(message)) message = T("Görsel veya yanıt işlenemedi. Daha küçük ve net bir görselle yeniden dene.", "Unable to process the image or answer. Try a smaller, clearer image.");
        status(ctrl.signal.aborted ? T("İşlem durduruldu. Yeniden deneyebilirsin.", "Stopped. You can try again.") : message || T("Bağlantıyı kontrol et.", "Check your connection."), true);
      }
      finally {
        if (timer) clearTimeout(timer); timer = null; active = null;
        if (!disposed) { view.querySelectorAll(".stem-input button,.stem-input select,.stem-input textarea,.stem-mode select").forEach((b) => { b.disabled = false; }); $("#stemCancel").hidden = true; }
      }
    }
    $("#stemCancel").onclick = () => { if (active) active.abort(); };
    $("#stemQuestion").oninput = () => { $("#stemAnswer").textContent = ""; };
    $("#stemSubject").onchange = () => { $("#stemAnswer").textContent = ""; };
    $("#stemCheck").onclick = () => task(async (signal) => {
      const url = endpoint($("#stemUrl").value), token = $("#stemToken").value.trim();
      App.prefs.set("stemServiceUrl", url); App.prefs.set("stemToken", token); App.prefs.set("stemMode", "service"); $("#stemMode").value = "service";
      const data = await (await request("/health", {}, signal)).json();
      if (!data.ok) throw new Error(data.message || T("Özel model kurulu değil.", "The custom model is not installed."));
      $("#stemConnection").textContent = T("Bağlantı hazır: ", "Connected: ") + data.model; status(T("Asistan hazır.", "Assistant ready."));
    }, T("Bağlantı kontrol ediliyor…", "Checking connection…"), 10000);
    async function select(file) {
      if (!file || active) return;
      if (file.size > 20 * 1024 * 1024 || !/^image\//.test(file.type) || /svg/.test(file.type)) { status(T("20 MB altında bir fotoğraf seç.", "Choose a photo smaller than 20 MB."), true); return; }
      await task(async (signal) => {
        const prepared = await App.vision.prepare(file);
        if (disposed || signal.aborted) return;
        image = prepared; $("#stemQuestion").value = ""; $("#stemAnswer").textContent = ""; $("#stemPreview").src = image.dataUrl; $("#stemPreview").hidden = false; $("#stemRead").hidden = false; $("#stemClear").hidden = false;
        status(T("Görsel hazır. Metni okutabilir veya soruyu yazabilirsin.", "Image ready. Read its text or type your question."));
      }, T("Görsel hazırlanıyor…", "Preparing image…"), 30000);
    }
    $("#stemGallery").onclick = () => $("#stemFile").click();
    ["#stemFile", "#stemCapture"].forEach((id) => { $(id).onchange = (e) => { select(e.target.files[0]); e.target.value = ""; }; });
    $("#stemClear").onclick = () => { image = null; $("#stemPreview").removeAttribute("src"); $("#stemPreview").hidden = true; $("#stemRead").hidden = true; $("#stemClear").hidden = true; };
    $("#stemRead").onclick = () => task(async (signal) => {
      if (!image) return;
      const mode = App.stemRuntime ? await App.stemRuntime.route() : "service";
      const blob = mode === "device" ? null : await (await fetch(image.dataUrl)).blob();
      const data = mode === "device" ? await App.stemRuntime.read(image, signal) : await (await request("/ocr", { method: "POST", headers: { "Content-Type": "image/jpeg" }, body: blob }, signal, mode)).json();
      if (disposed) return;
      $("#stemQuestion").value = data.text; $("#stemAnswer").textContent = ""; status(T("Metni kontrol et ve gerekirse düzelt; ardından Çöz'e bas.", "Check and correct the text, then press Solve."));
    }, T("Görsel okunuyor…", "Reading image…"), 90000);
    $("#stemSolve").onclick = () => task(async (signal) => {
      const answer = $("#stemAnswer"); answer.textContent = ""; const preview = document.createElement("pre"); preview.className = "stem-stream"; answer.appendChild(preview);
      const result = await solve($("#stemQuestion").value, $("#stemSubject").value, signal, (text) => { if (!disposed) preview.textContent = text; });
      if (disposed) return;
      answer.innerHTML = answerHtml(result.text); status(result.truncated ? T("Yanıt uzunluk sınırında kesildi; tamamlanmış çözüm sayma.", "The answer reached its length limit; treat it as incomplete.") : T("Çözüm hazır. İşlemleri ve birimleri kontrol et.", "Solution ready. Check the steps and units."), result.truncated);
    }, T("Çözüm hazırlanıyor…", "Preparing solution…"));
    $("#stemCamera").onclick = async () => {
      if (App.platform.mobile || !navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) { $("#stemCapture").click(); return; }
      let stream = null;
      const m = App.ui.modal({ title: T("Soru fotoğrafı", "Question photo"), body: '<video id="stemVideo" class="stem-camera" playsinline autoplay muted></video>', actions: '<button class="btn" data-close>' + esc(T("Kapat", "Close")) + '</button><button class="btn btn--primary" id="stemSnap" disabled>' + esc(T("Fotoğrafı kullan", "Use photo")) + '</button>', onClose: () => { if (stream) stream.getTracks().forEach((t) => t.stop()); camera = null; } });
      camera = m;
      try {
        stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: "environment", width: { ideal: 1280 } }, audio: false });
        if (!m.el.isConnected || disposed) { stream.getTracks().forEach((t) => t.stop()); return; }
        const video = m.el.querySelector("video"); video.srcObject = stream; await video.play(); m.el.querySelector("#stemSnap").disabled = false;
        m.el.querySelector("#stemSnap").onclick = () => { const canvas = document.createElement("canvas"); canvas.width = video.videoWidth; canvas.height = video.videoHeight; canvas.getContext("2d").drawImage(video, 0, 0); canvas.toBlob((blob) => { m.close(); if (blob && !disposed) select(blob); }, "image/jpeg", .9); };
      } catch (e) { m.close(); status(T("Kamera açılamadı; Görsel yükle ile devam edebilirsin.", "Camera unavailable; use Upload image."), true); }
    };
    const runtime = App.stemRuntime;
    $("#stemMode").value = runtime ? runtime.mode() : "service";
    $("#stemMode").onchange = () => { App.prefs.set("stemMode", $("#stemMode").value); $("#stemAnswer").textContent = ""; status(T("Çalışma şekli değiştirildi.", "Processing mode changed.")); };
    $("#stemDownloadBox").hidden = !(runtime && runtime.bridge);
    $("#stemWebHint").hidden = !!(runtime && runtime.bridge);
    function deviceStatus(st) {
      if (disposed || !st) return;
      const downloading = st.asama === "iniyor" || st.asama === "hazirlaniyor";
      $("#stemDownload").hidden = !!st.kurulu; $("#stemDownload").disabled = downloading || st.destek === false;
      $("#stemRemove").hidden = !st.kurulu; $("#stemRemove").disabled = downloading;
      $("#stemDownloadCancel").hidden = !downloading;
      $("#stemDownloadProgress").hidden = !downloading;
      $("#stemDownloadProgress").value = st.toplam ? Math.min(100, 100 * st.indirilen / st.toplam) : 0;
      $("#stemDeviceStatus").textContent = st.hata || (st.kurulu ? T("Model bu cihazda kurulu. İnternetsiz çözebilirsin.", "Model installed. You can solve offline.") : downloading ? T("Model indiriliyor / hazırlanıyor… ", "Downloading / preparing model… ") + Math.round(st.toplam ? 100 * st.indirilen / st.toplam : 0) + "%" : T("Model henüz indirilmedi. En az 8 GB RAM önerilir.", "Model not downloaded. At least 8 GB RAM recommended."));
    }
    if (runtime && runtime.bridge) {
      unsubscribe = runtime.subscribe(deviceStatus); runtime.refresh().then(deviceStatus).catch(() => {});
      [ ["stemDownload", "download"], ["stemDownloadCancel", "cancel"], ["stemRemove", "remove"] ].forEach(([id, action]) => { $("#" + id).onclick = async () => {
        if (action === "download") { App.prefs.set("stemMode", "device"); $("#stemMode").value = "device"; }
        try { await runtime.action(action); } catch (e) { status(e.message, true); }
      }; });
    }
    App.hydrateIcons(view);
  }
  App.stem = { endpoint, config, request, solve, mathText, answerHtml, render, SUBJECTS };
  App.router.register("sayisal", render);
})();
