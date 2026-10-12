/* =========================================================
   Ders Asistanı — yapay zeka sunucusu (Cloudflare Worker)

   Uygulama, kullanıcı hiçbir anahtar girmeden bu sunucu üzerinden
   Google Gemini'yi kullanır. Gemini anahtarı yalnızca burada, Cloudflare'in
   gizli değişkeninde (GEMINI_API_KEY) durur; uygulamada ya da repoda yoktur.

   Sunucu, Gemini API'sinin küçük bir bölümünü aynen aktarır:
     GET  /v1beta/models                               → model listesi (yalnızca izinli modeller)
     POST /v1beta/models/<model>:streamGenerateContent → sohbet (akış)
     POST /v1beta/models/<model>:generateContent
     POST /v1beta/models/<model>:batchEmbedContents    → hafıza vektörleri
     GET  /health                                       → durum

   Kötüye kullanımı sınırlamak için:
     • yalnızca Flash / Flash-Lite ve embedding modelleri (pahalı modeller kapalı)
     • IP başına dakikalık istek sınırı (RATE_CHAT / RATE_EMBED)
     • istek boyutu sınırı (fotoğraflar dahil 8 MB)
   ========================================================= */
const UPSTREAM = "https://generativelanguage.googleapis.com/v1beta";
const CHAT_MODEL = /^gemini-\d+(\.\d+)?-flash(-lite)?(-preview(-[\w-]+)?)?(-\d{2}-\d{4})?$/;
const EMBED_MODEL = /^gemini-embedding-[\w.-]+$/;
const NOT_CHAT = /(tts|image|live|audio|transcribe|robotics)/;
const MAX_BODY = 8 * 1024 * 1024;

const CORS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, X-DA-App",
  "Access-Control-Max-Age": "86400"
};

const json = (status, obj) => new Response(JSON.stringify(obj), { status, headers: { ...CORS, "content-type": "application/json" } });
const gerr = (status, message, st) => json(status, { error: { code: status, message, status: st || "UNAVAILABLE" } });

/* IP başına basit sınır (her Worker örneğinde ayrı tutulur; kaba bir koruma) */
const hits = new Map();
function limited(ip, kind, perMin) {
  const now = Date.now(), key = kind + ":" + ip;
  const arr = (hits.get(key) || []).filter((t) => now - t < 60000);
  arr.push(now);
  hits.set(key, arr);
  if (hits.size > 5000) hits.clear();
  return arr.length > perMin;
}

export default {
  async fetch(request, env) {
    if (request.method === "OPTIONS") return new Response(null, { status: 204, headers: CORS });
    const url = new URL(request.url);
    const key = env.GEMINI_API_KEY;

    if (url.pathname === "/" || url.pathname === "/health") {
      return json(200, { app: "ders-asistani", ok: !!key });
    }
    if (!key) return gerr(503, "Sunucuda Gemini anahtarı tanımlı değil (GEMINI_API_KEY).");

    const ip = request.headers.get("CF-Connecting-IP") || "?";
    const upHeaders = { "content-type": "application/json", "x-goog-api-key": key };

    // Hız ölçümü: /bench?m=model1,model2&t=low  (t: düşünme seviyesi; "budget0" = 2.5 için kapalı)
    if (request.method === "GET" && url.pathname.startsWith("/bench")) {
      if (limited(ip, "b", 3)) return gerr(429, "Çok sık", "RESOURCE_EXHAUSTED");
      const seg = url.pathname.split("/").slice(2);          // /bench/<model,model>/<think>
      const models = (url.searchParams.get("m") || decodeURIComponent(seg[0] || "")).split(",").filter((n) => CHAT_MODEL.test(n)).slice(0, 6);
      const think = url.searchParams.get("t") || decodeURIComponent(seg[1] || "");
      const prompt = "x^2 - 5x + 6 = 0 denkleminin köklerini adım adım bul ve kökler toplamını yaz.";
      const out = [];
      for (const n of models) {
        const gc = {};
        if (think === "budget0") gc.thinkingConfig = { thinkingBudget: 0 };
        else if (think) gc.thinkingConfig = { thinkingLevel: think };
        const t0 = Date.now(); let first = 0, text = "", status = 0, err = "";
        try {
          const r = await fetch(UPSTREAM + "/models/" + n + ":streamGenerateContent?alt=sse", { method: "POST", headers: upHeaders,
            body: JSON.stringify({ contents: [{ role: "user", parts: [{ text: prompt }] }], generationConfig: gc }) });
          status = r.status;
          if (!r.ok) err = (await r.text()).slice(0, 160);
          else {
            const reader = r.body.getReader(); const dec = new TextDecoder();
            for (;;) {
              const { done, value } = await reader.read(); if (done) break;
              const chunk = dec.decode(value, { stream: true });
              const m = chunk.match(/"text":\s*"/); if (m && !first) first = Date.now() - t0;
              text += chunk;
            }
          }
        } catch (e) { err = String(e); }
        out.push({ model: n, think, status, firstMs: first, totalMs: Date.now() - t0, chars: text.length, err });
      }
      return json(200, out);
    }

    // Kısa sağlık denemesi: Flash modellerine sırayla "2+3?" sorar (kurulumu doğrulamak için)
    if (request.method === "GET" && url.pathname === "/selftest") {
      if (limited(ip, "c", 4)) return gerr(429, "Çok sık", "RESOURCE_EXHAUSTED");
      const list = await (await fetch(UPSTREAM + "/models?pageSize=1000", { headers: upHeaders })).json();
      const ver = (n) => parseFloat((n.match(/gemini-([\d.]+)/) || [0, 0])[1]);
      const tier = (n) => (/lite/.test(n) ? 2 : /preview/.test(n) ? 1 : 0);
      const names = (list.models || []).map((m) => m.name.replace("models/", "")).filter((n) => CHAT_MODEL.test(n) && !NOT_CHAT.test(n))
        .sort((a, b) => tier(a) - tier(b) || ver(b) - ver(a)).slice(0, 4);
      const out = [];
      for (const n of names) {
        const t0 = Date.now();
        const r = await fetch(UPSTREAM + "/models/" + n + ":generateContent", { method: "POST", headers: upHeaders,
          body: JSON.stringify({ contents: [{ role: "user", parts: [{ text: "2+3 kaç eder? Sadece sayıyı yaz." }] }] }) });
        const j = await r.json().catch(() => ({}));
        const text = ((((j.candidates || [])[0] || {}).content || {}).parts || []).filter((p) => !p.thought).map((p) => p.text).join("");
        out.push({ model: n, status: r.status, ms: Date.now() - t0, text: text.slice(0, 40), error: j.error && j.error.message });
        if (r.ok && text) break;
      }
      return json(200, { models: names, results: out });
    }

    // Model listesi
    if (request.method === "GET" && url.pathname === "/v1beta/models") {
      const up = await fetch(UPSTREAM + "/models?pageSize=1000", { headers: upHeaders });
      if (!up.ok) return new Response(up.body, { status: up.status, headers: { ...CORS, "content-type": "application/json" } });
      const data = await up.json();
      const models = (data.models || []).filter((m) => {
        const n = String(m.name || "").replace(/^models\//, "");
        return (CHAT_MODEL.test(n) && !NOT_CHAT.test(n)) || EMBED_MODEL.test(n);
      });
      return json(200, { models });
    }

    const m = url.pathname.match(/^\/v1beta\/models\/([\w.-]+):(streamGenerateContent|generateContent|batchEmbedContents)$/);
    if (request.method !== "POST" || !m) return gerr(404, "Bulunamadı", "NOT_FOUND");
    const [, model, method] = m;
    const embed = method === "batchEmbedContents";
    if (embed ? !EMBED_MODEL.test(model) : !CHAT_MODEL.test(model) || NOT_CHAT.test(model)) return gerr(403, "Bu model sunucuda kullanılamıyor: " + model, "PERMISSION_DENIED_MODEL");

    const len = Number(request.headers.get("content-length") || 0);
    if (len > MAX_BODY) return gerr(413, "İstek çok büyük", "INVALID_ARGUMENT");
    if (limited(ip, embed ? "e" : "c", Number(embed ? env.RATE_EMBED || 40 : env.RATE_CHAT || 12))) {
      return gerr(429, "Çok sık istek gönderildi; bir dakika sonra tekrar dene.", "RESOURCE_EXHAUSTED");
    }

    const target = UPSTREAM + "/models/" + model + ":" + method + (method === "streamGenerateContent" ? "?alt=sse" : "");
    const up = await fetch(target, { method: "POST", headers: upHeaders, body: request.body });
    return new Response(up.body, {
      status: up.status,
      headers: { ...CORS, "content-type": up.headers.get("content-type") || "application/json", "cache-control": "no-store" }
    });
  }
};
