import fs from "node:fs";
import path from "node:path";
import http from "node:http";
import { createRequire } from "node:module";
import { fileURLToPath } from "node:url";
export async function navigate(page, path, expectedPath = path) {
  path = await page.evaluate(path=>App.router.resolve ? App.router.resolve(path) : path, path);
  expectedPath = await page.evaluate(p=>App.router.resolve ? App.router.resolve(p) : p, expectedPath);
  await page.evaluate(({path, expectedPath}) => new Promise((resolve, reject) => {
    const timer = setTimeout(() => { window.removeEventListener('da:route', done);reject(new Error('Navigation did not finish: ' + path)); }, 20000);
    function done(event) { if (event.detail.path !== expectedPath) return;clearTimeout(timer);window.removeEventListener('da:route', done);resolve(true); }
    window.addEventListener('da:route', done);App.router.go(path);
  }), {path, expectedPath});
}
export async function uiHarness() {
  const engines = createRequire(import.meta.url)("playwright");
  const engineName = process.env.UI_ENGINE || "chromium";
  if (!["chromium", "firefox", "webkit"].includes(engineName)) throw new Error("Unknown UI_ENGINE: " + engineName);
  const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
  const qa = path.join(root, "dist/qa", process.env.UI_ENGINE ? engineName : ""); fs.mkdirSync(qa, { recursive: true });
  const types = { ".js": "application/javascript", ".mjs": "application/javascript", ".html": "text/html", ".css": "text/css", ".svg": "image/svg+xml", ".json": "application/json" };
  const server = http.createServer((req, res) => {
    const u = new URL(req.url, "http://localhost"), file = path.resolve(root, "." + decodeURIComponent(u.pathname === "/" ? "/index.html" : u.pathname));
    if (!file.startsWith(root + path.sep)) { res.writeHead(403).end(); return; }
    try { res.setHeader("Content-Type", types[path.extname(file)] || "application/octet-stream"); res.end(fs.readFileSync(file)); } catch (e) { res.writeHead(404).end(); }
  });
  await new Promise((resolve) => server.listen(0, "127.0.0.1", resolve));
  let browser;
  try { browser = await engines[engineName].launch({ headless: true, ...(engineName === "chromium" && process.platform === "win32" ? { channel: process.env.STUDY_BROWSER || "msedge" } : {}) }); }
  catch (e) { await new Promise((resolve) => server.close(resolve)); throw e; }
  const baseUrl = "http://127.0.0.1:" + server.address().port;
  const errors = [];
  async function device(route = "", options = {}) {
    const context = await browser.newContext({ serviceWorkers: "block" });
    await context.route("**/*", (r) => {
      const url = r.request().url();
      // WebKit routes same-origin object URLs too; do not block local photo decoding.
      return new URL(url).hostname === "127.0.0.1" || url.startsWith("blob:" + baseUrl + "/") ? r.continue() : r.abort();
    });
    await context.addInitScript(() => localStorage.setItem("da:pref:tourDone", "true"));
    if (options.storageFallback) await context.addInitScript(() => Object.defineProperty(window, "indexedDB", { value: undefined }));
    const page = await context.newPage(); page.on("pageerror", (e) => errors.push({ message: e.message, url: page.url() }));
    await page.goto(baseUrl + "/#/" + route);
    await page.waitForFunction(() => window.App && App.db && App.db.engine !== "none" && document.querySelector("#view").children.length);
    return { context, page };
  }
  return { root, qa, browser, engineName, baseUrl, errors, device, close: async () => { await browser.close(); await new Promise((resolve) => server.close(resolve)); } };
}
