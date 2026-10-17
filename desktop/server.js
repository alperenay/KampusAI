/* =========================================================
   server.js — masaüstü uygulamasının Node tarafı (Electron'suz test edilebilir)

   1. serveStatic(root, pathname)   → uygulama dosyaları (app:// protokolü)
   2. proxyOllama(request)          → app://local/ollama/* → 127.0.0.1:11434
   3. createLanServer(opts)         → telefonlar için ağ sunucusu (isteğe bağlı)
        • yalnızca /ollama/api/{tags,chat,embed,embeddings,version,ps,show}
        • her istekte X-DA-Token başlığında bağlantı kodu aranır
        • yanlış kod denemeleri IP başına sınırlandırılır
   ========================================================= */
"use strict";
const fs = require("fs");
const path = require("path");
const http = require("http");
const os = require("os");
const crypto = require("crypto");

const OLLAMA_HOST = "127.0.0.1";
const OLLAMA_PORT = 11434;
const OLLAMA = "http://" + OLLAMA_HOST + ":" + OLLAMA_PORT;

const MIME = {
  ".html": "text/html; charset=utf-8", ".js": "text/javascript; charset=utf-8", ".css": "text/css; charset=utf-8",
  ".json": "application/json; charset=utf-8", ".webmanifest": "application/manifest+json", ".svg": "image/svg+xml",
  ".png": "image/png", ".jpg": "image/jpeg", ".jpeg": "image/jpeg", ".gif": "image/gif", ".webp": "image/webp", ".ico": "image/x-icon",
  ".woff": "font/woff", ".woff2": "font/woff2", ".ttf": "font/ttf", ".txt": "text/plain; charset=utf-8", ".md": "text/markdown; charset=utf-8"
};

/* ---------------- 1) Statik dosyalar ---------------- */
async function serveStatic(root, pathname) {
  let rel;
  try { rel = decodeURIComponent(pathname || "/"); } catch (e) { return { status: 400, headers: {}, body: "bad path" }; }
  if (rel === "/" || rel === "") rel = "/index.html";
  const file = path.normalize(path.join(root, rel));
  if (file !== root && !file.startsWith(root + path.sep)) return { status: 403, headers: {}, body: "forbidden" };
  try {
    const body = await fs.promises.readFile(file);
    return { status: 200, headers: { "content-type": MIME[path.extname(file).toLowerCase()] || "application/octet-stream", "cache-control": "no-cache" }, body };
  } catch (e) {
    return { status: 404, headers: { "content-type": "text/plain" }, body: "not found" };
  }
}

/* ---------------- 2) Uygulama içinden Ollama'ya aracı (fetch API) ----------------
   Yanıt akış hâlinde iletilir; uygulama isteği iptal ederse (Durdur) Ollama'ya giden
   istek de kesilir, model boşuna yazmaya devam etmez. */
async function proxyOllama(request, subPath, base) {
  const target = (base || OLLAMA) + subPath;
  const ctrl = new AbortController();
  const init = { method: request.method, headers: {}, signal: ctrl.signal };
  const ct = request.headers.get("content-type");
  if (ct) init.headers["content-type"] = ct;
  if (request.method !== "GET" && request.method !== "HEAD") init.body = Buffer.from(await request.arrayBuffer());
  let up;
  try {
    up = await fetch(target, init);
  } catch (e) {
    return new Response(JSON.stringify({ error: "ollama unreachable: " + (e && e.message) }), { status: 502, headers: { "content-type": "application/json" } });
  }
  const reader = up.body ? up.body.getReader() : null;
  const stream = reader ? new ReadableStream({
    async pull(c) {
      try {
        const { done, value } = await reader.read();
        if (done) c.close(); else c.enqueue(value);
      } catch (e) { c.error(e); }
    },
    cancel() { ctrl.abort(); }
  }) : null;
  return new Response(stream, { status: up.status, headers: { "content-type": up.headers.get("content-type") || "application/json" } });
}

/* ---------------- 3) Telefon bağlantısı (yerel ağ sunucusu) ---------------- */
const ALPHABET = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";       // karışabilecek 0/O, 1/I yok
function newToken(len) {
  const bytes = crypto.randomBytes(len || 6);
  return Array.from(bytes, (b) => ALPHABET[b % ALPHABET.length]).join("");
}

const ALLOWED = /^\/ollama\/api\/(tags|chat|embed|embeddings|version|ps|show)$/;

/** Bu bilgisayarın yerel ağ adresleri (Wi-Fi / Ethernet önce, sanal bağdaştırıcılar sonra) */
function lanAddresses() {
  const out = [];
  const ifs = os.networkInterfaces();
  Object.keys(ifs).forEach((name) => (ifs[name] || []).forEach((a) => {
    if (a.family !== "IPv4" && a.family !== 4) return;
    if (a.internal) return;
    if (/^169\.254\./.test(a.address)) return;
    const virtual = /vethernet|virtual|vmware|vbox|virtualbox|hyper-v|wsl|docker|loopback|tailscale|zerotier|vpn/i.test(name);
    const priv = /^(10\.|192\.168\.|172\.(1[6-9]|2\d|3[01])\.)/.test(a.address);
    const pref = /wi-?fi|wlan|wireless|kablosuz|ethernet|eth|en\d/i.test(name);
    out.push({ address: a.address, name, score: (priv ? 4 : 0) + (pref ? 2 : 0) + (virtual ? -5 : 0) });
  }));
  return out.sort((a, b) => b.score - a.score).filter((a) => a.score > -1).map((a) => a.address);
}

function createLanServer(opts) {
  const getToken = opts.getToken;
  const ollamaPort = opts.ollamaPort || OLLAMA_PORT;
  const failures = new Map();          // ip → { n, at }
  const MAX_FAIL = 12, WINDOW = 60000;

  const cors = (res) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type, X-DA-Token");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
    res.setHeader("Access-Control-Allow-Private-Network", "true");
    res.setHeader("Access-Control-Max-Age", "600");
  };
  const json = (res, status, obj) => { res.writeHead(status, { "content-type": "application/json" }); res.end(JSON.stringify(obj)); };

  const server = http.createServer((req, res) => {
    cors(res);
    if (req.method === "OPTIONS") { res.writeHead(204); res.end(); return; }
    const url = new URL(req.url, "http://x");
    if (url.pathname === "/ping") return json(res, 200, { app: "ders-asistani", ok: true });
    if (!ALLOWED.test(url.pathname)) return json(res, 404, { error: "not found" });

    const ip = req.socket.remoteAddress || "";
    const f = failures.get(ip);
    if (f && f.n >= MAX_FAIL && Date.now() - f.at < WINDOW) return json(res, 429, { error: "too many attempts" });
    const given = String(req.headers["x-da-token"] || url.searchParams.get("token") || "").trim().toUpperCase();
    const want = String(getToken() || "");
    const ok = want && given.length === want.length && crypto.timingSafeEqual(Buffer.from(given), Buffer.from(want));
    if (!ok) {
      const cur = f && Date.now() - f.at < WINDOW ? f : { n: 0, at: Date.now() };
      cur.n++; failures.set(ip, cur);
      return json(res, 401, { error: "invalid connection code" });
    }
    failures.delete(ip);

    const headers = {};
    if (req.headers["content-type"]) headers["content-type"] = req.headers["content-type"];
    if (req.headers["content-length"]) headers["content-length"] = req.headers["content-length"];
    const up = http.request({ host: OLLAMA_HOST, port: ollamaPort, method: req.method, path: url.pathname.slice("/ollama".length) + url.search.replace(/([?&])token=[^&]*&?/, "$1").replace(/[?&]$/, ""), headers }, (ur) => {
      res.writeHead(ur.statusCode || 502, { "content-type": ur.headers["content-type"] || "application/json" });
      ur.pipe(res);
    });
    up.on("error", (e) => { if (!res.headersSent) json(res, 502, { error: "ollama unreachable: " + e.message }); else res.end(); });
    req.on("aborted", () => up.destroy());
    res.on("close", () => { if (!res.writableFinished) up.destroy(); });
    req.pipe(up);
  });
  server.keepAliveTimeout = 65000;
  return server;
}

module.exports = { serveStatic, proxyOllama, createLanServer, lanAddresses, newToken, OLLAMA, MIME };
