import fs from "node:fs";
import path from "node:path";
import http from "node:http";
import { createRequire } from "node:module";
import { fileURLToPath } from "node:url";
export async function uiHarness() {
  const { chromium } = createRequire(import.meta.url)("playwright");
  const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
  const qa = path.join(root, "dist/qa"); fs.mkdirSync(qa, { recursive: true });
  const types = { ".js": "application/javascript", ".html": "text/html", ".css": "text/css", ".svg": "image/svg+xml", ".json": "application/json" };
  const server = http.createServer((req, res) => {
    const u = new URL(req.url, "http://localhost"), file = path.resolve(root, "." + decodeURIComponent(u.pathname === "/" ? "/index.html" : u.pathname));
    if (!file.startsWith(root + path.sep)) { res.writeHead(403).end(); return; }
    try { res.setHeader("Content-Type", types[path.extname(file)] || "application/octet-stream"); res.end(fs.readFileSync(file)); } catch (e) { res.writeHead(404).end(); }
  });
  await new Promise((resolve) => server.listen(0, "127.0.0.1", resolve));
  const browser = await chromium.launch({ headless: true, ...(process.platform === "win32" ? { channel: process.env.STUDY_BROWSER || "msedge" } : {}) });
  const baseUrl = "http://127.0.0.1:" + server.address().port;
  const errors = [];
  async function device(route = "") {
    const context = await browser.newContext({ serviceWorkers: "block" });
    await context.route("**/*", (r) => new URL(r.request().url()).hostname === "127.0.0.1" ? r.continue() : r.abort());
    await context.addInitScript(() => localStorage.setItem("da:pref:tourDone", "true"));
    const page = await context.newPage(); page.on("pageerror", (e) => errors.push({ message: e.message, url: page.url() }));
    await page.goto(baseUrl + "/#/" + route);
    await page.waitForFunction(() => window.App && App.db && App.db.engine !== "none" && document.querySelector("#view").children.length);
    return { context, page };
  }
  return { root, qa, browser, baseUrl, errors, device, close: async () => { await browser.close(); await new Promise((resolve) => server.close(resolve)); } };
}
