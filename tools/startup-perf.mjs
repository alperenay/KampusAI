// Açılış ölçümü (elle çalıştırılır, CI'da değil): Chromium'da işlemci yavaşlatılarak (düşük donanımlı telefon
// benzetimi) uygulama açılır; ilk sayfa çizimine kadar geçen süre, ana iş parçacığındaki uzun görevler ve
// yüklenen betikler ölçülür. Medyan değerler yazılır.
//   node tools/startup-perf.mjs [kök klasör=bu depo] [tekrar=7] [yavaşlatma=4]
// Karşılaştırma için eski sürüm ayrı bir klasöre çıkarılıp kök olarak verilir (ör. git archive v1.63.0).
import fs from "node:fs";
import http from "node:http";
import path from "node:path";
import { createRequire } from "node:module";
import { fileURLToPath } from "node:url";
const root = path.resolve(process.argv[2] || path.join(path.dirname(fileURLToPath(import.meta.url)), ".."));
const runs = Number(process.argv[3]) || 7, slow = Number(process.argv[4]) || 4;
const { chromium } = createRequire(import.meta.url)("playwright");
const types = { ".js": "application/javascript", ".html": "text/html", ".css": "text/css", ".svg": "image/svg+xml", ".json": "application/json", ".png": "image/png", ".woff2": "font/woff2" };
const server = http.createServer((req, res) => {
  const u = new URL(req.url, "http://localhost"), file = path.resolve(root, "." + decodeURIComponent(u.pathname === "/" ? "/index.html" : u.pathname));
  if (!file.startsWith(root + path.sep)) { res.writeHead(403).end(); return; }
  try { res.setHeader("Content-Type", types[path.extname(file)] || "application/octet-stream"); res.end(fs.readFileSync(file)); } catch (e) { res.writeHead(404).end(); }
});
await new Promise((r) => server.listen(0, "127.0.0.1", r));
const base = "http://127.0.0.1:" + server.address().port;
const browser = await chromium.launch({ headless: true, ...(process.platform === "win32" ? { channel: process.env.STUDY_BROWSER || "msedge" } : {}) });
const median = (a) => { const s = [...a].sort((x, y) => x - y); return s[Math.floor(s.length / 2)]; };
const out = [];
try {
  for (let i = 0; i < runs + 1; i++) {                       // ilk tur ısınma (disk önbelleği), sayılmaz
    const context = await browser.newContext({ serviceWorkers: "block", viewport: { width: 412, height: 915 }, deviceScaleFactor: 2 });
    await context.addInitScript(() => {
      localStorage.setItem("da:pref:tourDone", "true");
      window.__perf = { long: 0, firstRoute: 0 };
      try { new PerformanceObserver((l) => l.getEntries().forEach((e) => { if (!window.__perf.firstRoute) window.__perf.long += e.duration; })).observe({ type: "longtask", buffered: true }); } catch (e) { /* desteklenmiyor */ }
      window.addEventListener("da:route", () => { if (!window.__perf.firstRoute) window.__perf.firstRoute = performance.now(); }, { once: true });
    });
    const page = await context.newPage();
    const cdp = await context.newCDPSession(page);
    await cdp.send("Emulation.setCPUThrottlingRate", { rate: slow });
    await page.goto(base + "/#/");
    await page.waitForFunction(() => window.__perf && window.__perf.firstRoute > 0, null, { timeout: 120000 });
    const m = await page.evaluate(() => {
      const nav = performance.getEntriesByType("navigation")[0];
      const scripts = performance.getEntriesByType("resource").filter((r) => r.initiatorType === "script" && r.startTime < window.__perf.firstRoute);
      return { firstRoute: window.__perf.firstRoute, dcl: nav.domContentLoadedEventEnd, long: window.__perf.long, scripts: scripts.length,
        kb: Math.round(scripts.reduce((n, r) => n + (r.decodedBodySize || 0), 0) / 1024), heap: performance.memory ? Math.round(performance.memory.usedJSHeapSize / 1048576) : null };
    });
    if (i) out.push(m);
    await context.close();
  }
} finally { await browser.close(); server.close(); }
const keys = ["firstRoute", "dcl", "long", "scripts", "kb", "heap"];
const med = Object.fromEntries(keys.map((k) => [k, median(out.map((m) => m[k]))]));
console.log(JSON.stringify({ root: path.basename(root), runs, cpuSlowdown: slow, median: { firstRouteMs: Math.round(med.firstRoute), domContentLoadedMs: Math.round(med.dcl), longTasksMs: Math.round(med.long), scripts: med.scripts, scriptKB: med.kb, heapMB: med.heap } }));
