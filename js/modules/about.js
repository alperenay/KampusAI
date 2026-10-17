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
        '<p class="hint">' + esc(t("abt.ai")) + "</p>",
      actions: '<button class="btn btn--primary" type="button" data-close>' + esc(t("close")) + "</button>"
    }).el.classList.add("modal--wide");
  }

  App.modules.about = { open };
})();
