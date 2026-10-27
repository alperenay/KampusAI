/* =========================================================
   utils.js — ortak yardımcılar
   Dosyalar klasik <script> ile yüklenir (file:// uyumu için);
   hepsi window.App isim alanını paylaşır.
   ========================================================= */
window.App = window.App || {};
App.data = App.data || {};
App.modules = App.modules || {};

App.utils = (function () {
  const ESC = { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" };

  function esc(value) {
    return String(value == null ? "" : value).replace(/[&<>"']/g, (c) => ESC[c]);
  }

  function $(sel, root) { return (root || document).querySelector(sel); }
  function $$(sel, root) { return Array.from((root || document).querySelectorAll(sel)); }

  function uid(prefix) {
    const rnd = Math.random().toString(36).slice(2, 8);
    return (prefix ? prefix + "_" : "") + Date.now().toString(36) + rnd;
  }

  function pad(n) { return String(n).padStart(2, "0"); }

  /** Yerel saate göre YYYY-MM-DD */
  function todayISO() {
    const d = new Date();
    return d.getFullYear() + "-" + pad(d.getMonth() + 1) + "-" + pad(d.getDate());
  }

  const locale = () => (App.i18n ? App.i18n.locale : "tr-TR");

  /** "2026-09-12" → "12 Eyl" / "Sep 12"  (long: yıl ile birlikte) */
  function fmtDate(iso, long) {
    if (!iso) return "";
    const [y, m, d] = iso.split("-").map(Number);
    if (!y) return iso;
    const month = App.t("months").split(",")[m - 1];
    return App.t(long ? "dateLong" : "dateShort", { d, m: month, y });
  }

  function fmtDateTime(isoTs) {
    return new Date(isoTs).toLocaleString(locale(), { dateStyle: "medium", timeStyle: "short" });
  }

  function round(n, digits) {
    const f = Math.pow(10, digits == null ? 2 : digits);
    return Math.round((Number(n) || 0) * f) / f;
  }

  /** 12.5 → "12,5" (Türkçe) / "12.5" (English) */
  function fmtNum(n, digits) {
    const v = round(n, digits == null ? 2 : digits);
    return v.toLocaleString(locale(), { maximumFractionDigits: digits == null ? 2 : digits });
  }

  /** "09:30" → 570 dakika */
  function toMinutes(hhmm) {
    const [h, m] = String(hhmm || "0:0").split(":").map(Number);
    return (h || 0) * 60 + (m || 0);
  }
  function durationText(mins) {
    const h = Math.floor(Math.max(0, mins) / 60), m = Math.max(0, mins) % 60;
    const parts = [];
    if (h) parts.push(App.t("durHours", { n: h }));
    if (m || !h) parts.push(App.t("durMinutes", { n: m }));
    return parts.join(" ");
  }

  /** Pazartesi=0 … Pazar=6 */
  function weekdayIndex(date) {
    return ((date || new Date()).getDay() + 6) % 7;
  }

  function debounce(fn, ms) {
    let t;
    return function () {
      const args = arguments, self = this;
      clearTimeout(t);
      t = setTimeout(() => fn.apply(self, args), ms);
    };
  }

  function initials(name) {
    const parts = String(name || "").trim().split(/\s+/).filter(Boolean);
    if (!parts.length) return "Ö";
    return (parts[0][0] + (parts.length > 1 ? parts[parts.length - 1][0] : "")).toLocaleUpperCase("tr-TR");
  }

  /** Dosyayı tarayıcı üzerinden indirir (internetsiz çalışır) */
  function downloadText(filename, text, type) {
    const blob = new Blob([text], { type: type || "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    a.remove();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  }

  /** Betiği bir kez, isteğe bağlı yükler (v1.42: ağır modüller açılışta değil ilk kullanımda gelir) */
  const scripts = {};
  function loadScript(src) {
    if (!scripts[src]) scripts[src] = new Promise((res, rej) => {
      const sc = document.createElement("script");
      sc.src = src; sc.async = true;
      sc.onload = res;
      sc.onerror = () => { delete scripts[src]; sc.remove(); rej(new Error("Yüklenemedi: " + src)); };
      document.head.appendChild(sc);
    });
    return scripts[src];
  }

  return { esc, $, $$, uid, pad, todayISO, fmtDate, fmtDateTime, round, fmtNum, toMinutes, durationText, weekdayIndex, debounce, initials, downloadText, loadScript };
})();
