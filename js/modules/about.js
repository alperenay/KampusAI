/* =========================================================
   about.js — Ayarlar → Hakkında: gizlilik ve açık kaynak lisansları

   Uygulamada ya da kullanıcının cihazına indirilen yapay zeka modelleri
   ve kütüphaneler açık lisanslıdır; lisans adı ve kaynağı burada gösterilir.
   ========================================================= */
(function () {
  const { esc } = App.utils;
  const t = App.t;

  /* [ad, ne işe yarar (çeviri anahtarı), lisans, adres] */
  const LISANSLAR = [
    ["Gemma 4 E4B (Google DeepMind)", "abt.lic.gemma", "Apache 2.0", "https://huggingface.co/google/gemma-4-E4B-it"],
    ["bge-m3 (BAAI)", "abt.lic.bge", "MIT", "https://huggingface.co/BAAI/bge-m3"],
    ["llama.cpp (ggml-org)", "abt.lic.llama", "MIT", "https://github.com/ggml-org/llama.cpp"],
    ["Google Gemini API", "abt.lic.gemini", "abt.lic.terms", "https://ai.google.dev/gemini-api/terms"],
    ["KaTeX", "abt.lic.katex", "MIT", "https://katex.org"],
    ["qrcode-generator", "abt.lic.qr", "MIT", "https://github.com/kazuhikoarase/qrcode-generator"],
    ["jsQR", "abt.lic.jsqr", "Apache 2.0", "https://github.com/cozmo/jsQR"],
    ["OpenDyslexic", "abt.lic.font", "SIL OFL 1.1", "https://opendyslexic.org"],
    ["Electron", "abt.lic.electron", "MIT", "https://www.electronjs.org"],
    ["Capacitor", "abt.lic.capacitor", "MIT", "https://capacitorjs.com"]
  ];

  /* Kaynakça: uygulamanın dayandığı müfredat, yöntemler ve bilimsel çalışmalar (APA biçimine yakın) */
  const KAYNAKCA = [
    ["Millî Eğitim Bakanlığı. Ortaöğretim dersleri öğretim programları (9–12. sınıf).", "https://mufredat.meb.gov.tr"],
    ["Ölçme, Seçme ve Yerleştirme Merkezi (ÖSYM). Yükseköğretim Kurumları Sınavı (YKS) kılavuzu ve sınav bilgileri.", "https://www.osym.gov.tr"],
    ["Google DeepMind. Gemma 4 model ailesi ve model kartı.", "https://ai.google.dev/gemma"],
    ["Lewis, P. vd. (2020). Retrieval-augmented generation for knowledge-intensive NLP tasks. NeurIPS 2020.", "https://arxiv.org/abs/2005.11401"],
    ["Hu, E. J. vd. (2021). LoRA: Low-rank adaptation of large language models.", "https://arxiv.org/abs/2106.09685"],
    ["Dettmers, T. vd. (2023). QLoRA: Efficient finetuning of quantized LLMs. NeurIPS 2023.", "https://arxiv.org/abs/2305.14314"],
    ["Zelikman, E. vd. (2022). STaR: Bootstrapping reasoning with reasoning. NeurIPS 2022.", "https://arxiv.org/abs/2203.14465"],
    ["Chen, J. vd. (2024). BGE M3-Embedding: Multi-lingual, multi-functionality, multi-granularity text embeddings.", "https://arxiv.org/abs/2402.03216"],
    ["Cepeda, N. J. vd. (2006). Distributed practice in verbal recall tasks: A review and quantitative synthesis. Psychological Bulletin, 132(3), 354–380.", "https://doi.org/10.1037/0033-2909.132.3.354"],
    ["Cirillo, F. (2018). The Pomodoro Technique. Currency.", "https://www.pomodorotechnique.com"],
    ["ggml-org. llama.cpp: yapay zeka modellerini cihazda çalıştırma.", "https://github.com/ggml-org/llama.cpp"],
    ["Unsloth AI. Unsloth: hızlı ve az bellekli ince ayar.", "https://github.com/unslothai/unsloth"]
  ];

  const link = (url, text) => '<a href="' + esc(url) + '" target="_blank" rel="noopener">' + esc(text) + "</a>";

  function open() {
    const lic = LISANSLAR.map(([ad, ne, lisans, url]) =>
      '<li><b>' + link(url, ad) + "</b> — " + esc(t(ne)) + ' <span class="badge">' + esc(lisans.startsWith("abt.") ? t(lisans) : lisans) + "</span></li>").join("");
    const priv = ["device", "ollama", "cloud", "data"].map((k) =>
      "<li><b>" + esc(t("abt.priv." + k + "Title")) + "</b> " + esc(t("abt.priv." + k)) + "</li>").join("");
    App.ui.modal({
      title: t("abt.title"),
      body:
        '<p class="hint">' + esc(t("abt.intro")) + "</p>" +
        '<p class="hint">' + esc(t("set.version")) + " " + esc(App.version || "dev") + "</p>" +
        '<div class="card" style="padding:16px"><div class="card__title">' + esc(t("abt.privTitle")) + '</div><ul class="about-list">' + priv + "</ul></div>" +
        '<div class="card" style="padding:16px"><div class="card__title">' + esc(t("abt.licTitle")) + '</div><p class="card__sub">' + esc(t("abt.licIntro")) +
          '</p><ul class="about-list">' + lic + "</ul></div>" +
        '<div class="card" style="padding:16px"><div class="card__title">' + esc(t("abt.refTitle")) + '</div><p class="card__sub">' + esc(t("abt.refIntro")) +
          '</p><ol class="about-list">' + KAYNAKCA.map(([metin, url]) => "<li>" + esc(metin) + " " + link(url, url.replace(/^https?:\/\//, "")) + "</li>").join("") + "</ol></div>" +
        '<p class="hint">' + esc(t("abt.ai")) + "</p>",
      actions: '<button class="btn btn--primary" type="button" data-close>' + esc(t("close")) + "</button>"
    }).el.classList.add("modal--wide");
  }

  App.modules.about = { open };
})();
