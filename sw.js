/* =========================================================
   sw.js — çevrimdışı çalışma (yalnızca internetten açılan sürüm,
   ör. iPhone'da "Ana Ekrana Ekle" ile kurulan uygulama)

   Uygulama dosyaları ilk açılışta önbelleğe alınır; sonra internet
   olmadan da açılır. Yeni sürüm yayınlandığında precache.json'daki
   "version" değişir, dosyalar arka planda yenilenir ve bir sonraki
   açılışta yeni sürüm kullanılır.
   Yapay zeka servislerine giden istekler (başka adresler) önbelleğe
   alınmaz.
   ========================================================= */
const PREFIX = "ders-asistani-";
const VERSION = "dev";                    // derleme sırasında tools/build-web.mjs tarafından değiştirilir
const CACHE = PREFIX + VERSION;

self.addEventListener("install", (event) => {
  event.waitUntil((async () => {
    let list = { files: ["./", "index.html"] };
    try { list = await (await fetch("precache.json", { cache: "no-store" })).json(); } catch (e) { /* liste yok: en azından ana sayfa */ }
    const cache = await caches.open(CACHE);
    await cache.addAll(list.files.map((f) => new Request(f, { cache: "reload" })));
    await self.skipWaiting();
  })());
});

self.addEventListener("activate", (event) => {
  event.waitUntil((async () => {
    const keys = await caches.keys();
    await Promise.all(keys.filter((k) => k.startsWith(PREFIX) && k !== CACHE).map((k) => caches.delete(k)));
    await self.clients.claim();
  })());
});

self.addEventListener("fetch", (event) => {
  const req = event.request;
  if (req.method !== "GET") return;
  const url = new URL(req.url);
  if (url.origin !== self.location.origin) return;            // yapay zeka servisleri vb.
  if (url.pathname.endsWith("/precache.json") || url.pathname.endsWith("/sw.js")) return;

  event.respondWith((async () => {
    const cache = await caches.open(CACHE);
    // Sayfa açılışı: önbellekteki index.html (internet yoksa da açılır)
    if (req.mode === "navigate") {
      const hit = cache && (await cache.match("index.html") || await cache.match("./"));
      if (hit) return hit;
      return fetch(req);
    }
    const hit = cache && await cache.match(req, { ignoreSearch: true });
    if (hit) return hit;
    try {
      const res = await fetch(req);
      if (res.ok && cache) cache.put(req, res.clone());
      return res;
    } catch (e) {
      return new Response("", { status: 504 });
    }
  })());
});

/* Bildirime dokununca (ders hatırlatıcısı vb.) açık pencereyi öne getir; yoksa uygulamayı aç */
self.addEventListener("notificationclick", (event) => {
  event.notification.close();
  const data = event.notification.data || {};
  event.waitUntil((async () => {
    const list = await self.clients.matchAll({ type: "window", includeUncontrolled: true });
    for (const c of list) {
      c.postMessage({ type: "notification", data });
      if ("focus" in c) return c.focus();
    }
    return self.clients.openWindow("./" + (data.kind === "study" ? "#/odak" : ""));
  })());
});
