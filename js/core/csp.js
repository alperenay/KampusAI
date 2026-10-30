/* =========================================================
   csp.js — içerik güvenlik politikası (v1.64), açılıştaki son betik olarak eklenir

   Politika: yalnız uygulamanın kendi betikleri çalışır; satır içi betik, olay işleyicisi (onerror= …),
   eval ve eklenti (object) engellenir. Ders/sohbet/belge içeriğindeki bir kaçış hatası böylece betik
   çalıştıramaz (birinci savunma App.sanitize ve Markdown kaçışıdır, bu ikinci hattır).

   Neden HTML'de değil: sayfa ayrıştırılırken <head>'de duran bir CSP meta etiketi Chromium'da betiklerin
   önden indirilmesini yavaşlatıyor; 4× yavaşlatılmış işlemcide ilk çizim ~250 ms gecikti, aynı politika
   HTTP başlığıyla gelince gecikme olmadı (tools/startup-perf.mjs). GitHub Pages ve Android paketi başlık
   gönderemediği için politika burada eklenir. Bu ana dek yalnız uygulamanın kendi dosyaları çalışmıştır;
   dışarıdan gelen içerik bundan sonra çizilir. tools/csp-check.mjs bu sırayı ve kuralları denetler.
   Yapay zekâ servisleri kullanıcının seçtiği adreslerde olduğu için bağlantılar (connect-src) açık kalır.
   ========================================================= */
(function () {
  const POLICY = [
    "default-src 'self'",
    "script-src 'self' 'wasm-unsafe-eval'",
    "style-src 'self' 'unsafe-inline'",
    "img-src 'self' data: blob: https:",
    "media-src 'self' data: blob: https:",
    "font-src 'self' data:",
    "connect-src 'self' https: http: ws: wss: data: blob:",
    "worker-src 'self' blob:",
    "frame-src 'self'",
    "object-src 'none'",
    "base-uri 'self'",
    "form-action 'self'",
    "manifest-src 'self'"
  ].join("; ");
  if (!document.querySelector('meta[http-equiv="Content-Security-Policy"]')) {
    const meta = document.createElement("meta");
    meta.httpEquiv = "Content-Security-Policy";
    meta.content = POLICY;
    document.head.appendChild(meta);
  }
  App.csp = POLICY;
})();
