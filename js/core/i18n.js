/* =========================================================
   i18n.js — çoklu dil altyapısı (Türkçe / English)

   • Arayüz metinleri  : js/i18n/<dil>.js  →  App.t("anahtar", { değişken })
   • Veri metinleri    : { tr: "…", en: "…" } nesneleri  →  App.L(nesne)
     (düz metin verilirse olduğu gibi döner; çevirisi yoksa Türkçesi kullanılır)
   • HTML'de           : data-i18n="anahtar"  (ayrıca -title, -placeholder, -aria)

   Yeni dil eklemek: js/i18n/xx.js dosyasını oluştur, LANGS'a ekle,
   index.html'de <script> ile yükle.
   ========================================================= */
(function () {
  App.locales = App.locales || {};

  const LANGS = {
    tr: { name: "Türkçe",  short: "TR", locale: "tr-TR" },
    en: { name: "English", short: "EN", locale: "en-US" }
  };
  const DEFAULT = "tr";

  let lang = App.prefs.get("lang", DEFAULT);
  if (!LANGS[lang]) lang = DEFAULT;

  const listeners = [];

  function t(key, vars) {
    let s = (App.locales[lang] || {})[key];
    if (s == null) s = (App.locales[DEFAULT] || {})[key];
    if (s == null) { console.warn("[i18n] eksik anahtar:", key); s = key; }
    if (vars) s = s.replace(/\{(\w+)\}/g, (m, k) => (vars[k] != null ? vars[k] : m));
    return s;
  }

  /** Sayıya göre tekil/çoğul: "<key>_one" varsa n === 1 iken onu kullanır */
  function tn(key, n, vars) {
    const v = Object.assign({ n: n }, vars || {});
    const dict = App.locales[lang] || {};
    if (n === 1 && dict[key + "_one"] != null) return t(key + "_one", v);
    return t(key, v);
  }

  function L(v) {
    if (v == null) return "";
    if (typeof v !== "object") return String(v);
    if (v[lang] != null) return v[lang];
    return v[DEFAULT] != null ? v[DEFAULT] : "";
  }

  /** Bir veri nesnesinde istenen dilin karşılığı var mı? */
  function has(v) { return v != null && (typeof v !== "object" || v[lang] != null); }

  function apply(root) {
    const r = root || document;
    r.querySelectorAll("[data-i18n]").forEach((el) => { el.textContent = t(el.dataset.i18n); });
    r.querySelectorAll("[data-i18n-title]").forEach((el) => { el.title = t(el.dataset.i18nTitle); });
    r.querySelectorAll("[data-i18n-placeholder]").forEach((el) => { el.placeholder = t(el.dataset.i18nPlaceholder); });
    r.querySelectorAll("[data-i18n-aria]").forEach((el) => { el.setAttribute("aria-label", t(el.dataset.i18nAria)); });
    document.documentElement.lang = lang;
  }

  function setLang(next) {
    if (!LANGS[next] || next === lang) return;
    lang = next;
    App.prefs.set("lang", lang);
    apply(document);
    listeners.forEach((fn) => { try { fn(lang); } catch (e) { console.error(e); } });
  }

  App.i18n = {
    langs: LANGS,
    get lang() { return lang; },
    get locale() { return LANGS[lang].locale; },
    t, tn, L, has, apply, setLang,
    onChange(fn) { listeners.push(fn); }
  };
  App.t = t;
  App.tn = tn;
  App.L = L;
})();
