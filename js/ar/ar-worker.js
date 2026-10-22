/* ar-worker.js — AR görü işlerini ana iş parçacığının dışında çalıştırır (kamera işlenirken arayüz takılmasın).
   İşler (ar-feature.js → ARFeature.handle): kâğıt bulma, çekim öncesi kalite, görüntü hedefi kurma ve izleme.
   Kare iki yoldan gelir: ImageBitmap (kopya ve okuma burada, OffscreenCanvas ile) ya da hazır RGBA tamponu. */
importScripts("ar-vision.js", "ar-feature.js");
let oc = null, ox = null;
function canBitmap() { try { return typeof OffscreenCanvas !== "undefined" && !!new OffscreenCanvas(1, 1).getContext("2d"); } catch (e) { return false; } }
self.onmessage = (e) => {
  const m = e.data || {};
  if (m.type === "init") { self.postMessage({ type: "ready", bitmap: canBitmap() }); return; }
  const t0 = performance.now();
  let res;
  try {
    let px;
    if (m.bmp) {
      if (!oc || oc.width !== m.w || oc.height !== m.h) { oc = new OffscreenCanvas(m.w, m.h); ox = oc.getContext("2d", { willReadFrequently: true }); }
      ox.drawImage(m.bmp, 0, 0, m.w, m.h);
      px = ox.getImageData(0, 0, m.w, m.h).data;
    } else px = new Uint8ClampedArray(m.buf);
    res = self.ARFeature.handle(m, px);
  } catch (err) {
    res = { ok: false, reason: "error", msg: String((err && err.message) || err) };
  } finally {
    if (m.bmp) try { m.bmp.close(); } catch (e2) { /* kapandı */ }        // GPU belleği hemen bırakılsın
  }
  self.postMessage({ type: "result", id: m.id, res, ms: performance.now() - t0 });
};
