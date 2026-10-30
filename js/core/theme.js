/* =========================================================
   theme.js — karanlık / aydınlık tema
   Seçim localStorage'da saklanır ("theme" tercihi) ve
   <html data-theme="..."> özniteliğiyle uygulanır; renkler
   css/base.css içindeki tema bloklarından gelir.
   Sayfa açılırken yanıp sönmeyi önlemek için ilk uygulama
   index.html <head> içindeki küçük betikte de yapılır.
   ========================================================= */
(function () {
  const THEMES = {
    dark:  { icon: "moon", labelKey: "theme.dark" },
    light: { icon: "sun",  labelKey: "theme.light" }
  };
  const DEFAULT = "dark";

  let theme = App.prefs.get("theme", DEFAULT);
  if (!THEMES[theme]) theme = DEFAULT;
  const listeners = [];

  function apply() {
    document.documentElement.setAttribute("data-theme", theme);
    const meta = document.querySelector('meta[name="color-scheme"]');
    if (meta) meta.setAttribute("content", theme);
    // Telefonda durum çubuğu / tarayıcı çubuğu rengi
    const bar = document.querySelector('meta[name="theme-color"]');
    if (bar) bar.setAttribute("content", getComputedStyle(document.documentElement).getPropertyValue("--bg").trim() || (theme === "light" ? "#edf0f5" : "#121318"));
    // Android uygulaması: durum/gezinme çubuğu simgeleri temaya uysun
    try { if (window.KampusNative && window.KampusNative.setLightBars) window.KampusNative.setLightBars(theme === "light"); } catch (e) { /* yok */ }
  }

  App.theme = {
    list: THEMES,
    get current() { return theme; },
    set(next) {
      if (!THEMES[next] || next === theme) return;
      theme = next;
      App.prefs.set("theme", theme);
      apply();
      listeners.forEach((fn) => { try { fn(theme); } catch (e) { console.error(e); } });
    },
    onChange(fn) { listeners.push(fn); },
    apply
  };

  apply();
})();
