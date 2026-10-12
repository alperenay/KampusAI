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
     POST /sync/<kod>                                   → cihazlar arası eşitleme (SyncRoom)

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

/* =========================================================
   Cihazlar arası eşitleme
   Her eşitleme kodu bir "oda"dır (Durable Object, SQLite). Cihazlar değişen
   kayıtlarını gönderir, odadaki diğer değişiklikleri alır. Aynı kayıtta en son
   değişiklik (u = ms zaman damgası) kazanır. Kod 12 karakterlik rastgele
   dizidir (~60 bit); bilmeyen kimse odaya erişemez.
   ========================================================= */
const SYNC_CODE = /^[A-HJ-NP-Z2-9]{12}$/;
const SYNC_STORES = new Set(["exams", "schedules", "progress", "notes", "chats", "mistakes", "quizzes", "sessions", "meta"]);
const SYNC_MAX_BODY = 25 * 1024 * 1024;
const SYNC_MAX_ROW = 1900 * 1024;       // SQLite satır sınırı ~2 MB
const SYNC_PAGE = 400;

export class SyncRoom {
  constructor(state) {
    this.sql = state.storage.sql;
    this.sql.exec("CREATE TABLE IF NOT EXISTS recs (s TEXT NOT NULL, id TEXT NOT NULL, u INTEGER NOT NULL, del INTEGER NOT NULL DEFAULT 0, d TEXT, seq INTEGER NOT NULL, PRIMARY KEY (s, id))");
    this.sql.exec("CREATE INDEX IF NOT EXISTS recs_seq ON recs (seq)");
    this.sql.exec("CREATE TABLE IF NOT EXISTS meta (k TEXT PRIMARY KEY, v INTEGER)");
  }

  seq() {
    const row = this.sql.exec("SELECT v FROM meta WHERE k = 'seq'").toArray()[0];
    return row ? Number(row.v) : 0;
  }

  async fetch(request) {
    let body;
    try { body = await request.json(); } catch (e) { return json(400, { error: "bad json" }); }
    const cursor = Math.max(0, Number(body.cursor) || 0);
    const changes = Array.isArray(body.changes) ? body.changes : [];
    let seq = this.seq(), applied = 0;

    for (const c of changes) {
      if (!c || !SYNC_STORES.has(c.s) || typeof c.id !== "string" || c.id.length > 300) continue;
      const u = Number(c.u) || 0;
      const del = c.del ? 1 : 0;
      const d = del ? null : JSON.stringify(c.d == null ? null : c.d);
      if (d && d.length > SYNC_MAX_ROW) continue;
      const cur = this.sql.exec("SELECT u FROM recs WHERE s = ? AND id = ?", c.s, c.id).toArray()[0];
      if (cur && Number(cur.u) >= u) continue;                   // daha yeni (ya da aynı) kayıt zaten var
      seq++;
      this.sql.exec("INSERT OR REPLACE INTO recs (s, id, u, del, d, seq) VALUES (?, ?, ?, ?, ?, ?)", c.s, c.id, u, del, d, seq);
      applied++;
    }
    if (applied) this.sql.exec("INSERT OR REPLACE INTO meta (k, v) VALUES ('seq', ?)", seq);

    const rows = this.sql.exec("SELECT s, id, u, del, d, seq FROM recs WHERE seq > ? ORDER BY seq LIMIT ?", cursor, SYNC_PAGE).toArray();
    const out = rows.map((r) => ({ s: r.s, id: r.id, u: Number(r.u), del: !!r.del, d: r.del ? null : JSON.parse(r.d) }));
    const last = rows.length ? Number(rows[rows.length - 1].seq) : cursor;
    return json(200, { cursor: rows.length === SYNC_PAGE ? last : Math.max(last, seq), more: rows.length === SYNC_PAGE, applied, changes: out });
  }
}

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
    // Eşitleme (Gemini anahtarı gerektirmez)
    const sm = url.pathname.match(/^\/sync\/([A-Za-z0-9-]+)$/);
    if (sm) {
      if (request.method !== "POST") return json(405, { error: "POST" });
      if (!env.SYNC) return json(503, { error: "sync not configured" });
      const code = sm[1].replace(/-/g, "").toUpperCase();
      if (!SYNC_CODE.test(code)) return json(400, { error: "bad code" });
      const sip = request.headers.get("CF-Connecting-IP") || "?";
      if (limited(sip, "s", Number(env.RATE_SYNC || 30))) return json(429, { error: "too many requests" });
      if (Number(request.headers.get("content-length") || 0) > SYNC_MAX_BODY) return json(413, { error: "too large" });
      const stub = env.SYNC.get(env.SYNC.idFromName(code));
      const res = await stub.fetch("https://sync/room", { method: "POST", headers: { "content-type": "application/json" }, body: request.body });
      return new Response(res.body, { status: res.status, headers: { ...CORS, "content-type": "application/json" } });
    }

    if (!key) return gerr(503, "Sunucuda Gemini anahtarı tanımlı değil (GEMINI_API_KEY).");

    const ip = request.headers.get("CF-Connecting-IP") || "?";
    const upHeaders = { "content-type": "application/json", "x-goog-api-key": key };

    // Kısa sağlık denemesi: Flash modellerine sırayla "2+3?" sorar (kurulumu doğrulamak için)
    if (request.method === "GET" && url.pathname === "/selftest") {
      if (limited(ip, "c", 4)) return gerr(429, "Çok sık", "RESOURCE_EXHAUSTED");
      const list = await (await fetch(UPSTREAM + "/models?pageSize=1000", { headers: upHeaders })).json();
      const ver = (n) => parseFloat((n.match(/gemini-([\d.]+)/) || [0, 0])[1]);
      const tier = (n) => (/preview/.test(n) ? 2 : /lite/.test(n) ? 0 : 1);     // uygulamanın varsayılanı: Flash-Lite
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
