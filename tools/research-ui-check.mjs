// Gerçek tarayıcı: iki izole cihaz, öğretmen/öğrenci UI, çevrimdışı test ve state göçü.
import fs from "node:fs";
import path from "node:path";
import http from "node:http";
import assert from "node:assert/strict";
import { createRequire } from "node:module";
import { fileURLToPath } from "node:url";
import { researchBank } from "./fixtures/research-bank.mjs";
const { chromium } = createRequire(import.meta.url)("playwright");
const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const qa = path.join(root, "dist/qa"); fs.mkdirSync(qa, { recursive: true });
const types = { ".html": "text/html", ".js": "application/javascript", ".css": "text/css", ".svg": "image/svg+xml" };
const server = http.createServer((req, res) => {
  const url = new URL(req.url, "http://localhost");
  const file = path.resolve(root, "." + decodeURIComponent(url.pathname === "/" ? "/index.html" : url.pathname));
  if (!file.startsWith(root + path.sep)) { res.writeHead(403).end(); return; }
  try { res.setHeader("Content-Type", types[path.extname(file)] || "application/octet-stream"); res.end(fs.readFileSync(file)); }
  catch (e) { res.writeHead(404).end(); }
});
await new Promise((resolve) => server.listen(0, "127.0.0.1", resolve));
let browser;
try {
  browser = await chromium.launch({ headless: true, ...(process.platform === "win32" ? { channel: process.env.STUDY_BROWSER || "msedge" } : {}) });
  const errors = [];
  async function device() {
    const context = await browser.newContext({ serviceWorkers: "block" });
    await context.route("**/*", (route) => new URL(route.request().url()).hostname === "127.0.0.1" ? route.continue() : route.abort());
    await context.addInitScript(() => localStorage.setItem("da:pref:tourDone", "true"));
    const page = await context.newPage(); page.on("pageerror", (e) => errors.push(e.message));
    await page.goto("http://127.0.0.1:" + server.address().port + "/#/arastirma");
    await page.locator("#rCreate").waitFor();
    return { context, page };
  }
  const teacher = await device(), student = await device();
  const p = teacher.page, s = student.page;
  const key = await p.evaluate(() => App.learnmap.allOutcomes().find((x) => x.outcome.content || x.outcome.curatedContent).key);
  await p.locator("#rCreate").click();
  await p.locator("#rTitle").fill("Çevrimdışı araştırma sınaması");
  await p.locator("#rTopic").selectOption(key);
  await p.locator("#rBank").fill(JSON.stringify({ questions: researchBank() }));
  await p.locator("#rReviewed").check(); await p.locator("#rCreateGo").click();
  await p.locator("#rCodes").waitFor();
  const sessionCodes = await p.locator("#rCodes").inputValue();
  await p.locator("#researchQr svg").waitFor();
  await p.setViewportSize({ width: 375, height: 812 });
  await p.locator("#researchQr").screenshot({ path: path.join(qa, "research-qr-mobile.png"), animations: "disabled" });
  await p.locator(".modal-backdrop").last().locator("[data-close]").last().click();
  const session = await p.evaluate(async () => (await App.db.getAll("research")).find((r) => r.kind === "session").session);
  const participant = await p.evaluate((session) => {
    for (let i = 0; i < 100; i++) if (App.research.policy(session, "P" + i).group === "B") return "P" + i;
  }, session);
  async function importCodes(page, codes) {
    await page.locator("#rImport").click(); await page.locator("#rImportText").fill(codes);
    await page.locator("#rImportGo").click(); await page.locator("#rImportText").waitFor({ state: "detached" });
    await page.locator("[data-session]").waitFor();
  }
  await importCodes(s, sessionCodes);
  await student.context.setOffline(true);
  await s.evaluate(() => { App.ai.generate = async () => { throw new Error("Research must not call AI"); }; });
  await s.locator("[data-join]").click(); await s.locator("#rParticipant").fill(participant);
  await s.locator("#rJoinGo").click(); await s.locator(".quiz-finish").waitFor();
  assert.equal(await s.locator(".research-banner").count(), 1);
  assert.equal(await s.locator("#qFinish").isDisabled(), true);
  await s.locator('.quiz-q:visible .opt[data-o="0"]').click();
  assert.equal(await s.locator("#qFinish").isDisabled(), true, "Cevap tek başına yeterli değil");
  for (let i = 0; i < 3; i++) await s.locator(".quiz-q:visible [data-hint]").click();
  assert.equal(await s.locator(".hint-ladder__steps li").count(), 3);
  assert.equal(await s.locator(".quiz-q:visible [data-hint]").isDisabled(), true);
  async function responsive(page, selector) {
    for (const width of [320, 375, 390, 768, 1440]) {
      await page.setViewportSize({ width, height: 900 });
      for (const theme of ["light", "dark"]) {
        await page.evaluate((v) => App.theme.set(v), theme);
        assert.equal(await page.locator(selector).first().evaluate((card) => {
          const r = card.getBoundingClientRect();
          return r.left < -1 || r.right > innerWidth + 1 || card.scrollWidth > card.clientWidth + 1;
        }), false, selector + " overflow: " + width + " " + theme);
      }
    }
  }
  await responsive(s, ".quiz-q:visible");
  await s.setViewportSize({ width: 390, height: 900 });
  await s.locator(".quiz-q:visible").screenshot({ path: path.join(qa, "reason-confidence-hints-mobile.png"), animations: "disabled" });
  for (let i = 0; i < 10; i++) {
    if (i > 0) await s.locator('.quiz-q:visible .opt[data-o="0"]').click();
    await s.locator('.quiz-q:visible input[data-reason][value="0"]').check();
    await s.locator('.quiz-q:visible input[data-confidence][value="75"]').check();
    await s.locator("#qFinish").click();
  }
  await s.locator("#qResearchShare").waitFor();
  const state = await s.evaluate(async () => ({
    results: (await App.db.getAll("research")).filter((r) => r.kind === "result"),
    quizzes: await App.db.getAll("quizzes"), mistakes: await App.db.getAll("mistakes"), progress: await App.db.getAll("progress")
  }));
  assert.equal(state.results.length, 1); assert.equal(state.results[0].metrics.rawAccuracy, 1);
  assert.equal(state.results[0].metrics.independentAccuracy, 0.9);
  assert.equal(state.results[0].data.observations[0].hintEvents.length, 3);
  assert.equal(state.quizzes.length + state.mistakes.length + state.progress.length, 0);
  await s.locator("#qResearchShare").click(); await s.locator("#rCodes").waitFor();
  const resultCodes = await s.locator("#rCodes").inputValue();
  await importCodes(p, resultCodes); await importCodes(p, resultCodes);
  const results = await p.evaluate(async (id) => App.research.compare(await App.db.getAll("research"), id), session.id);
  assert.equal(results.B.n, 1); assert.equal(results.B.independent, 0.9);
  await responsive(p, ".research-session");
  await p.setViewportSize({ width: 390, height: 900 });
  await p.locator(".research-session").screenshot({ path: path.join(qa, "research-comparison-mobile.png"), animations: "disabled" });
  // Normal test aynı pedagojik girişleri kaydeder; sınıf özetine aktarır.
  await p.evaluate((bank) => { App.ai.generate = async () => ({ model: "test-double", data: { questions: bank } }); }, researchBank(30));
  await p.evaluate((key) => App.router.go("test/" + key), key); await p.locator(".quiz-finish").waitFor();
  await p.locator(".quiz-q:visible [data-hint]").click();
  for (let i = 0; i < 10; i++) {
    await p.locator('.quiz-q:visible .opt[data-o="0"]').click();
    await p.locator('.quiz-q:visible input[data-reason][value="0"]').check();
    await p.locator('.quiz-q:visible input[data-confidence][value="100"]').check();
    await p.locator("#qFinish").click();
  }
  await p.locator(".quiz-result").waitFor();
  const profile = await p.evaluate(async () => ({ quizzes: await App.db.getAll("quizzes"), summary: await App.classroom.summary("P") }));
  assert.equal(profile.quizzes.length, 1); assert.equal(profile.quizzes[0].metacognition.independentAccuracy, 0.9);
  assert.equal(profile.summary.p.i, 90);
  // IndexedDB v7 → v9: eski test korunur, yeni research deposu açılır.
  const migration = await browser.newContext({ serviceWorkers: "block" });
  const mp = await migration.newPage();
  await mp.goto("http://127.0.0.1:" + server.address().port + "/assets/vendor/qr/qrcode.js");
  await mp.evaluate(() => new Promise((resolve, reject) => {
    const open = indexedDB.open("ders-asistani", 7);
    open.onupgradeneeded = () => open.result.createObjectStore("quizzes", { keyPath: "id" });
    open.onerror = () => reject(open.error);
    open.onsuccess = () => {
      const db = open.result, tx = db.transaction("quizzes", "readwrite");
      tx.objectStore("quizzes").put({ id: "legacy", key: "old", total: 10, correct: 8 });
      tx.oncomplete = () => { db.close(); resolve(); };
    };
  }));
  await mp.addInitScript(() => localStorage.setItem("da:pref:tourDone", "true"));
  await mp.goto("http://127.0.0.1:" + server.address().port + "/#/arastirma"); await mp.locator("#rCreate").waitFor();
  const migrated = await mp.evaluate(async () => ({ old: await App.db.get("quizzes", "legacy"), research: await App.db.getAll("research"), sync: App.db.SYNC_STORES }));
  assert.equal(migrated.old.correct, 8); assert.equal(migrated.research.length, 0); assert.equal(migrated.sync.includes("research"), false);
  assert.deepEqual(errors, []);
  console.log("Araştırma UI: iki cihaz, çevrimdışı katılım, üç ipucu, zorunlu gerekçe/eminlik, QR/kod aktarımı, mükerrer koruması, normal profil ve v7→v9 göçü geçti; iki tema / 320–1440px.");
} finally {
  if (browser) await browser.close();
  await new Promise((resolve) => server.close(resolve));
}
