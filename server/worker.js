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
     POST /sync/<kod>                                   → cihazlar arası eşitleme (SyncRoom); {wipe:true} odadaki her şeyi siler

   Kötüye kullanımı sınırlamak ve ortak ücretsiz kotayı korumak için:
     • yalnızca Flash / Flash-Lite, Gemma 4 ve embedding modelleri (pahalı modeller kapalı)
     • cihaz başına (X-DA-Cihaz) ve IP başına dakikalık + günlük soru sınırı — Kota (Durable Object),
       tüm sunucu örnekleri için tek sayaç. Okul Wi-Fi'ında herkes aynı IP'den gelir: IP sınırı geniş tutulur.
     • kota yönetimi: bir model Google'dan "kota doldu" (429) alırsa sunucu o günün (dakikalık
       kotaysa 1 dakikanın) geri kalanında onu atlar ve isteği sıradaki modelle karşılar:
       Flash → Flash-Lite → Gemma 4 26B (fotoğraflıysa Gemma 4 31B). Yanıtı veren model X-KampusAI-Model başlığında.
     • GET /durum → bugünkü soru sayısı ve kotası dolan modeller (kişisel bilgi yok)
     • istek boyutu sınırı (fotoğraflar dahil 8 MB)
   ========================================================= */
const UPSTREAM = "https://generativelanguage.googleapis.com/v1beta";
const CHAT_MODEL = /^gemini-\d+(\.\d+)?-flash(-lite)?(-preview(-[\w-]+)?)?(-\d{2}-\d{4})?$/;
const EMBED_MODEL = /^gemini-embedding-[\w.-]+$/;
// Gemma 4 (açık model; Google sunucusunda ücretsiz kotası Flash'tan cömert): Flash kotası dolunca yedek
const GEMMA_MODEL = /^gemma-4-[\w.-]+$/;
const isChat = (n) => (CHAT_MODEL.test(n) || GEMMA_MODEL.test(n)) && !NOT_CHAT.test(n);
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
const SYNC_STORES = new Set(["exams", "schedules", "progress", "notes", "chats", "mistakes", "quizzes", "sessions", "explains", "lessons", "checks", "cards", "meta"]);
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
    if (body.wipe === true) {                                   // kullanıcı sunucudaki verisini siler (KVKK md. 11)
      this.sql.exec("DELETE FROM recs");
      this.sql.exec("DELETE FROM meta");
      return json(200, { wiped: true });
    }
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

/* =========================================================
   Kota: tek örnek (idFromName("genel")), tüm sunucu örnekleri için ortak sayaçlar
     • dakikalık sayaçlar bellekte (örnek yeniden başlarsa sıfırlanır; sorun değil)
     • günlük sayaçlar SQLite'ta; gün Google kotasıyla aynı: Pasifik saatiyle gece yarısı
   ========================================================= */
const pacificDay = () => new Date(Date.now() - 8 * 3600 * 1000).toISOString().slice(0, 10);

export class Kota {
  constructor(state, env) {
    this.sql = state.storage.sql;
    this.env = env;
    this.sql.exec("CREATE TABLE IF NOT EXISTS sayac (k TEXT PRIMARY KEY, n INTEGER NOT NULL)");
    this.sql.exec("CREATE TABLE IF NOT EXISTS dolu (model TEXT PRIMARY KEY, kadar INTEGER NOT NULL)");
    this.dk = new Map();
  }

  gun() {
    const d = pacificDay();
    const row = this.sql.exec("SELECT n FROM sayac WHERE k = 'gun:" + d + "'").toArray()[0];
    if (!row) {                                   // yeni gün: dünün sayaçlarını sil
      this.sql.exec("DELETE FROM sayac");
      this.sql.exec("DELETE FROM dolu WHERE kadar < ?", Date.now());
      this.sql.exec("INSERT INTO sayac (k, n) VALUES (?, 1)", "gun:" + d);
    }
    return d;
  }

  say(k) {
    const r = this.sql.exec("SELECT n FROM sayac WHERE k = ?", k).toArray()[0];
    return r ? Number(r.n) : 0;
  }

  artir(k) { this.sql.exec("INSERT INTO sayac (k, n) VALUES (?, 1) ON CONFLICT(k) DO UPDATE SET n = n + 1", k); }

  dakika(k, sinir) {
    const now = Date.now();
    const arr = (this.dk.get(k) || []).filter((t) => now - t < 60000);
    if (arr.length >= sinir) { this.dk.set(k, arr); return false; }
    arr.push(now);
    this.dk.set(k, arr);
    if (this.dk.size > 20000) this.dk.clear();
    return true;
  }

  async fetch(request) {
    const url = new URL(request.url);
    const b = request.method === "POST" ? await request.json().catch(() => ({})) : {};
    const e = this.env;
    this.gun();
    const now = Date.now();

    if (url.pathname === "/izin") {                 // bu soru sorulabilir mi?
      const cihaz = String(b.cihaz || "").slice(0, 40), ip = String(b.ip || "?");
      const gC = Number(e.GUN_CIHAZ || 150), gI = Number(e.GUN_IP || 3000);
      const dC = Number(e.DK_CIHAZ || 10), dI = Number(e.DK_IP || 120);
      if (cihaz && this.say("c:" + cihaz) >= gC) return json(200, { ok: false, neden: "gun-cihaz" });
      if (this.say("i:" + ip) >= gI) return json(200, { ok: false, neden: "gun-ip" });
      if ((cihaz && !this.dakika("c:" + cihaz, dC)) || !this.dakika("i:" + ip, dI)) return json(200, { ok: false, neden: "dakika" });
      if (cihaz) this.artir("c:" + cihaz);
      this.artir("i:" + ip);
      this.artir("toplam");
      const dolu = this.sql.exec("SELECT model FROM dolu WHERE kadar > ?", now).toArray().map((r) => r.model);
      return json(200, { ok: true, dolu });
    }
    if (url.pathname === "/dolu") {                 // Google bu model için 429 verdi
      const sure = b.gunluk ? 26 * 3600 * 1000 : 65 * 1000;
      this.sql.exec("INSERT INTO dolu (model, kadar) VALUES (?, ?) ON CONFLICT(model) DO UPDATE SET kadar = MAX(kadar, excluded.kadar)",
        String(b.model || "").slice(0, 80), now + sure);
      return json(200, { ok: true });
    }
    if (url.pathname === "/kullanildi") { this.artir("m:" + String(b.model || "").slice(0, 80)); return json(200, { ok: true }); }
    if (url.pathname === "/durum") {
      const modeller = this.sql.exec("SELECT k, n FROM sayac WHERE k LIKE 'm:%'").toArray()
        .map((r) => ({ model: String(r.k).slice(2), soru: Number(r.n) }));
      const dolu = this.sql.exec("SELECT model, kadar FROM dolu WHERE kadar > ?", now).toArray()
        .map((r) => ({ model: r.model, acilis: new Date(Number(r.kadar)).toISOString() }));
      const cihaz = this.sql.exec("SELECT COUNT(*) AS n FROM sayac WHERE k LIKE 'c:%'").toArray()[0];
      return json(200, { gun: pacificDay(), toplamSoru: this.say("toplam"), cihaz: Number(cihaz.n), modeller, dolu });
    }
    return json(404, { error: "yok" });
  }
}

/** Sunucunun bir model kotası dolunca geçeceği sıradaki modeller */
function yedekler(model, gorselli) {
  const gemma = gorselli ? ["gemma-4-31b-it", "gemma-4-26b-a4b-it"] : ["gemma-4-26b-a4b-it", "gemma-4-31b-it"];
  const out = [model];
  if (/^gemini-[\d.]+-flash$/.test(model) || /^gemini-[\d.]+-flash-\d/.test(model)) out.push(model.replace(/-flash/, "-flash-lite"));
  if (CHAT_MODEL.test(model)) out.push(...gemma);
  else if (GEMMA_MODEL.test(model)) out.push(...gemma.filter((g) => g !== model));
  return [...new Set(out)];
}
/** Gemma 4 API'de düşünme ayarını desteklemiyor (400): yedeğe geçerken çıkar */
function gemmaIcin(body) {
  const b = JSON.parse(JSON.stringify(body));
  if (b.generationConfig) delete b.generationConfig.thinkingConfig;
  return b;
}

const CORS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, X-DA-App, X-DA-Cihaz",
  "Access-Control-Expose-Headers": "X-KampusAI-Model",
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
  async fetch(request, env, ctx) {
    if (request.method === "OPTIONS") return new Response(null, { status: 204, headers: CORS });
    const url = new URL(request.url);
    const key = env.GEMINI_API_KEY;

    if (url.pathname === "/" || url.pathname === "/health") {
      return json(200, { app: "ders-asistani", ok: !!key });
    }
    const kota = env.KOTA ? env.KOTA.get(env.KOTA.idFromName("genel")) : null;
    const kotaCagir = (yol, govde) => kota.fetch("https://kota" + yol, { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify(govde || {}) })
      .then((r) => r.json()).catch(() => null);
    if (url.pathname === "/durum") {
      if (!kota) return json(503, { error: "kota yok" });
      const d = await kotaCagir("/durum");
      return json(200, Object.assign({ ok: !!key }, d || {}));
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
        return isChat(n) || EMBED_MODEL.test(n);
      });
      return json(200, { models });
    }

    const m = url.pathname.match(/^\/v1beta\/models\/([\w.-]+):(streamGenerateContent|generateContent|batchEmbedContents)$/);
    if (request.method !== "POST" || !m) return gerr(404, "Bulunamadı", "NOT_FOUND");
    const [, model, method] = m;
    const embed = method === "batchEmbedContents";
    if (embed ? !EMBED_MODEL.test(model) : !isChat(model)) return gerr(403, "Bu model sunucuda kullanılamıyor: " + model, "PERMISSION_DENIED_MODEL");

    const len = Number(request.headers.get("content-length") || 0);
    if (len > MAX_BODY) return gerr(413, "İstek çok büyük", "INVALID_ARGUMENT");
    const passthru = (up, used) => new Response(up.body, {
      status: up.status,
      headers: { ...CORS, "content-type": up.headers.get("content-type") || "application/json", "cache-control": "no-store", "X-KampusAI-Model": used }
    });
    const hedef = (n) => UPSTREAM + "/models/" + n + ":" + method + (method === "streamGenerateContent" ? "?alt=sse" : "");

    if (embed || !kota) {
      if (limited(ip, embed ? "e" : "c", Number(embed ? env.RATE_EMBED || 40 : env.RATE_CHAT || 12))) {
        return gerr(429, "Çok sık istek gönderildi; bir dakika sonra tekrar dene.", "RESOURCE_EXHAUSTED");
      }
      return passthru(await fetch(hedef(model), { method: "POST", headers: upHeaders, body: request.body }), model);
    }

    // Sohbet: ortak kota kontrolü, sonra gerekirse yedek modellerle
    const cihaz = (request.headers.get("X-DA-Cihaz") || "").replace(/[^\w-]/g, "");
    const izin = await kotaCagir("/izin", { cihaz, ip });
    if (izin && !izin.ok) {
      const msg = izin.neden === "dakika" ? "Çok sık soru soruldu; bir dakika sonra tekrar dene."
        : "Bugünkü internet sorusu sınırına ulaşıldı. Ayarlar → Yapay zeka → Bu cihaz → İndir ile yapay zekayı cihazına indirebilirsin; internetsiz ve sınırsız çalışır.";
      return gerr(429, msg, "RESOURCE_EXHAUSTED");
    }
    let body;
    try { body = await request.json(); } catch (e) { return gerr(400, "Geçersiz istek", "INVALID_ARGUMENT"); }
    const gorselli = JSON.stringify(body.contents || []).includes('"inlineData"');
    const dolu = new Set((izin && izin.dolu) || []);
    const sira = yedekler(model, gorselli);
    const adaylar = sira.filter((n) => !dolu.has(n));
    let son = null;
    for (let i = 0; i < adaylar.length; i++) {
      const n = adaylar[i];
      const govde = GEMMA_MODEL.test(n) ? gemmaIcin(body) : body;
      const up = await fetch(hedef(n), { method: "POST", headers: upHeaders, body: JSON.stringify(govde) });
      if (up.ok) {
        const p = kotaCagir("/kullanildi", { model: n });
        if (ctx && ctx.waitUntil) ctx.waitUntil(p);
        return passthru(up, n);
      }
      const metin = await up.text();
      son = { status: up.status, metin, model: n };
      if (up.status === 429) {                                  // kota doldu: günlük mü dakikalık mı?
        await kotaCagir("/dolu", { model: n, gunluk: /PerDay|per day|daily/i.test(metin) });
        continue;
      }
      // Yedek model bulunamadı ya da geçici hata: sıradakini dene; asıl modelin başka hatası aynen dönsün
      if (i > 0 && (up.status === 404 || up.status >= 500 || up.status === 400)) continue;
      if (i === 0 && (up.status >= 500)) continue;
      break;
    }
    if (!son || son.status === 429 || !adaylar.length) {
      return gerr(429, "İnternet modu bugün çok yoğun. Birkaç dakika sonra tekrar dene ya da Ayarlar → Yapay zeka → Bu cihaz → İndir ile yapay zekayı cihazına indir; internetsiz çalışır.", "RESOURCE_EXHAUSTED");
    }
    return new Response(son.metin, { status: son.status, headers: { ...CORS, "content-type": "application/json", "X-KampusAI-Model": son.model } });
  }
};
