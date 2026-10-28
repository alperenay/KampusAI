/* Shared microphone access. Recognition services and audio hardware are separate capabilities. */
(function () {
  const T = (tr, en) => (App.i18n?.lang === "en" ? en : tr);
  function codeOf(error) {
    const name =
      typeof error?.code === "string" ? error.code : error?.name || error;
    if (["NotFoundError", "DevicesNotFoundError", "nomic"].includes(name))
      return "nomic";
    if (
      [
        "NotAllowedError",
        "PermissionDeniedError",
        "SecurityError",
        "permission",
        "not-allowed",
      ].includes(name)
    )
      return "permission";
    if (
      [
        "NotReadableError",
        "TrackStartError",
        "busy",
        "audio-capture",
        "AbortError",
      ].includes(name)
    )
      return name === "AbortError" ? "aborted" : "busy";
    if (
      [
        "OverconstrainedError",
        "ConstraintNotSatisfiedError",
        "NotSupportedError",
        "constraints",
      ].includes(name)
    )
      return "constraints";
    if (
      [
        "unsupported",
        "insecure",
        "network",
        "service",
        "lang",
        "no-audio",
        "timeout",
        "aborted",
      ].includes(name)
    )
      return name;
    return "error";
  }
  function errorMessage(error) {
    const code = codeOf(error);
    return {
      nomic: T(
        "Sistem kullanılabilir bir ses girişi bulamadı. Mikrofon bağlantısını ve sistemin varsayılan giriş aygıtını kontrol et.",
        "No audio input was found. Check the microphone connection and default system input.",
      ),
      permission: T(
        "Mikrofon erişimi engellendi. Uygulama/site iznini ve işletim sisteminin mikrofon gizlilik ayarını kontrol et; ardından yeniden dene.",
        "Microphone access is blocked. Check app/site permission and operating-system privacy settings, then retry.",
      ),
      busy: T(
        "Mikrofon açılamadı; başka bir uygulama kullanıyor veya ses sürücüsü hazır değil. Diğer ses kayıtlarını kapatıp yeniden dene.",
        "Microphone capture could not start. Another app may be using it or the audio driver is unavailable. Close other recordings and retry.",
      ),
      constraints: T(
        "Bu mikrofon istenen ses ayarlarını desteklemiyor. Varsayılan giriş aygıtını kontrol et.",
        "The microphone does not support the requested audio settings. Check the default input device.",
      ),
      insecure: T(
        "Bu bağlantıda mikrofon API’si kapalı. Uygulamayı veya HTTPS/localhost adresini kullan.",
        "Microphone access requires the installed app, HTTPS or localhost.",
      ),
      unsupported: T(
        "Bu ortam ses kaydı veya konuşma tanımayı desteklemiyor. Mikrofon testini açabilir ya da yazarak devam edebilirsin.",
        "Audio recording or speech recognition is unavailable here. Try the microphone test or continue by typing.",
      ),
      service: T(
        "Mikrofon izni, konuşma tanıma servisi kurmaz. Cihazın ses tanıma hizmetini etkinleştir veya ses kaydını yazıya çevirebilen AI sağlayıcısını ayarla.",
        "Microphone permission does not install a speech service. Enable device speech recognition or configure an AI provider that transcribes audio.",
      ),
      network: T(
        "Konuşmayı yazıya çeviren hizmete ulaşılamadı. İnternet bağlantısını veya ses tanıma hizmetini kontrol et.",
        "The speech transcription service could not be reached. Check your connection or speech service.",
      ),
      lang: T(
        "Seçilen dil için ses tanıma paketi/hizmeti kullanılamıyor. Dil paketini veya AI ses sağlayıcısını kontrol et.",
        "Speech recognition is unavailable for this language. Check the language pack or audio AI provider.",
      ),
      "no-audio": T(
        "Seçili AI sağlayıcısı ses kaydını yazıya çeviremiyor. Gemini veya KampüsAI sunucusu ayarını kontrol et.",
        "The selected AI provider cannot transcribe audio. Check Gemini or KampüsAI server settings.",
      ),
      timeout: T(
        "Ses oturumu zaman sınırına ulaştı. Yeni bir kayıt başlatabilirsin.",
        "The audio session reached its time limit. Start a new recording.",
      ),
      aborted: T("Ses işlemi durduruldu.", "Audio capture was cancelled."),
      error: T(
        "Ses işlemi başlatılamadı. Mikrofon testi ile giriş aygıtını kontrol et ve yeniden dene.",
        "Audio could not start. Check your input using the microphone test and retry.",
      ),
    }[code];
  }
  const stop = (stream) => {
    if (stream) stream.getTracks().forEach((track) => track.stop());
  };
  function failure(code) {
    return Object.assign(new Error(errorMessage(code)), { code });
  }
  async function microphone(audio = true, signal) {
    if (window.isSecureContext === false) throw failure("insecure");
    const api = navigator.mediaDevices;
    if (!api || typeof api.getUserMedia !== "function")
      throw failure("unsupported");
    if (signal?.aborted) throw failure("aborted");
    let aborted = false,
      rejectAbort,
      acquired = null;
    const cancel = () => {
      aborted = true;
      stop(acquired);
      rejectAbort(failure("aborted"));
    };
    const abortedPromise = new Promise((resolve, reject) => {
      rejectAbort = reject;
    });
    signal?.addEventListener("abort", cancel, { once: true });
    async function acquire(constraints) {
      const stream = await api.getUserMedia({ audio: constraints });
      if (aborted || signal?.aborted) {
        stop(stream);
        throw failure("aborted");
      }
      if (
        typeof stream.getAudioTracks === "function" &&
        !stream.getAudioTracks().some((t) => t.readyState !== "ended")
      ) {
        stop(stream);
        throw failure("nomic");
      }
      acquired = stream;
      return stream;
    }
    const request = (async () => {
      try {
        return await acquire(audio);
      } catch (e) {
        if (!aborted && codeOf(e) === "constraints" && audio !== true)
          return acquire(true);
        throw e;
      }
    })();
    try {
      return await Promise.race([request, abortedPromise]);
    } catch (e) {
      if (
        e?.code &&
        ["aborted", "nomic", "unsupported", "insecure"].includes(e.code)
      )
        throw e;
      throw failure(codeOf(e));
    } finally {
      signal?.removeEventListener("abort", cancel);
    }
  }
  async function resume(ctx) {
    if (ctx.state !== "suspended") return;
    let timer;
    try {
      await Promise.race([
        ctx.resume(),
        new Promise(
          (_, reject) =>
            (timer = setTimeout(() => reject(failure("busy")), 5000)),
        ),
      ]);
    } finally {
      clearTimeout(timer);
    }
  }
  function openTest() {
    let closed = false,
      stream = null,
      ctx = null,
      raf = 0,
      controller = null,
      epoch = 0;
    const modal = App.ui.modal({
      title: T("Mikrofon testi", "Microphone test"),
      body:
        "<p>" +
        T(
          "Bu test sesi dinlemez, kaydetmez ve sunucuya göndermez; yalnız cihazdaki ses seviyesini gösterir.",
          "This test only shows the local audio level. It does not play, record or send audio.",
        ) +
        '</p><div class="form-actions"><button type="button" class="btn btn--primary" id="mtStart">' +
        T("Mikrofonu test et", "Test microphone") +
        '</button><button type="button" class="btn" id="mtStop">' +
        T("Durdur", "Stop") +
        '</button></div><meter id="mtLevel" min="0" max="1" value="0" style="width:100%"></meter><p id="mtStatus" role="status"></p>',
      onClose: () => {
        closed = true;
        clean();
      },
    });
    modal.el.classList.add("microphone-test");
    modal.el.style.zIndex = "1000";
    modal.el.closest(".modal-backdrop").style.zIndex = "1000";
    const $ = (id) => modal.el.querySelector("#" + id);
    function clean() {
      epoch++;
      controller?.abort();
      controller = null;
      cancelAnimationFrame(raf);
      stop(stream);
      stream = null;
      if (ctx) {
        ctx.close().catch(() => {});
        ctx = null;
      }
    }
    $("mtStop").onclick = () => {
      clean();
      $("mtLevel").value = 0;
      $("mtStatus").textContent = T("Mikrofon kapalı.", "Microphone is off.");
    };
    $("mtStart").onclick = async () => {
      clean();
      const mine = epoch;
      controller = new AbortController();
      $("mtStatus").textContent = T(
        "Mikrofon açılıyor…",
        "Opening microphone…",
      );
      try {
        const s = await microphone(true, controller.signal);
        if (closed || mine !== epoch) {
          stop(s);
          return;
        }
        stream = s;
        const AC = window.AudioContext || window.webkitAudioContext;
        if (!AC) throw failure("unsupported");
        ctx = new AC();
        await resume(ctx);
        if (closed || mine !== epoch) return;
        const an = ctx.createAnalyser();
        an.fftSize = 512;
        ctx.createMediaStreamSource(stream).connect(an);
        const data = new Float32Array(an.fftSize);
        $("mtStatus").textContent = T(
          "Mikrofon açık. Konuşunca seviye hareket etmeli. Bu, konuşma tanıma servisinin de çalıştığını göstermez.",
          "Microphone is open. Speak to move the level. This does not test the speech recognition service.",
        );
        const tick = () => {
          if (closed || mine !== epoch) return;
          an.getFloatTimeDomainData(data);
          $("mtLevel").value = Math.min(
            1,
            Math.sqrt(data.reduce((a, v) => a + v * v, 0) / data.length) * 4,
          );
          raf = requestAnimationFrame(tick);
        };
        tick();
      } catch (e) {
        if (!closed && mine === epoch) {
          clean();
          $("mtStatus").textContent = errorMessage(e);
        }
      }
    };
    return modal;
  }
  App.media = { microphone, stop, resume, codeOf, errorMessage, openTest };
})();
