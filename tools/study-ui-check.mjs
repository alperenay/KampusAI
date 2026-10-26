// İsteğe bağlı gerçek tarayıcı sınaması. Playwright ve bir Chromium tarayıcısı gerekir.
// Windows: Edge; diğer sistemler: Playwright Chromium. STUDY_BROWSER ile değiştirilebilir.
import fs from "node:fs";
import path from "node:path";
import http from "node:http";
import assert from "node:assert/strict";
import { createRequire } from "node:module";
import { fileURLToPath } from "node:url";
const require = createRequire(import.meta.url);
const { chromium } = require("playwright");
const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const qa = path.join(root, "dist/qa"); fs.mkdirSync(qa, { recursive: true });
const types = { ".html": "text/html", ".js": "application/javascript", ".css": "text/css", ".json": "application/json", ".svg": "image/svg+xml", ".webmanifest": "application/manifest+json" };
const server = http.createServer((req, res) => {
  const url = new URL(req.url, "http://localhost");
  const file = path.resolve(root, "." + decodeURIComponent(url.pathname === "/" ? "/index.html" : url.pathname));
  if (!file.startsWith(root + path.sep)) { res.writeHead(403).end(); return; }
  try { res.setHeader("Content-Type", types[path.extname(file)] || "application/octet-stream"); res.end(fs.readFileSync(file)); }
  catch (error) { res.writeHead(404).end(); }
});
await new Promise((resolve) => server.listen(0, "127.0.0.1", resolve));
let browser;
try {
  const channel = process.env.STUDY_BROWSER || (process.platform === "win32" ? "msedge" : undefined);
  browser = await chromium.launch({ headless: true, ...(channel ? { channel } : {}) });
  const context = await browser.newContext({ serviceWorkers: "block" });
  await context.route("**/*", (route) => new URL(route.request().url()).hostname === "127.0.0.1" ? route.continue() : route.abort());
  await context.addInitScript(() => { localStorage.setItem("da:pref:tourDone", "true"); });
  const page = await context.newPage();
  const errors = []; page.on("pageerror", (error) => errors.push(error.message));
  await page.goto("http://127.0.0.1:" + server.address().port);
  await page.locator(".study-card").waitFor();
  assert.equal(await page.locator(".study-card").count(), 1);
  for (const route of ["#/bugun", "#/"]) {
    await page.evaluate((hash) => new Promise((resolve) => {
      window.addEventListener("da:route", () => resolve(), { once: true });
      App.router.go(hash.replace(/^#\//, ""));
    }), route);
    await page.locator(".study-card").waitFor();
    for (const width of [320, 375, 390, 768, 1440]) {
      await page.setViewportSize({ width, height: 900 });
      for (const theme of ["dark", "light"]) {
        await page.evaluate((value) => App.theme.set(value), theme);
        const overflow = await page.evaluate(() => {
          const card = document.querySelector(".study-card");
          const r = card.getBoundingClientRect();
          return r.left < -1 || r.right > innerWidth + 1 || card.scrollWidth > card.clientWidth + 1;
        });
        assert.equal(overflow, false, route + " card overflow at " + width + " " + theme);
      }
    }
  }
  await page.setViewportSize({ width: 390, height: 844 });
  await page.locator(".study-card").screenshot({ path: path.join(qa, "home-mobile.png"), animations: "disabled" });
  const key = await page.evaluate(() => {
    const item = App.learnmap.allOutcomes().find((x) => x.outcome.content);
    App.ai.generate = async () => ({ model: "test-double", data: { questions: Array.from({ length: 30 }, (_, i) => ({
      q: "Test sorusu " + (i + 1) + ": $x + 1 = 2$ ise $x$ kaçtır?", options: ["1", "2", "3", "4", "5"], answer: 0,
      difficulty: 1 + Math.floor(i / 10), explain: "$x = 1$."
    })) } });
    return item.key;
  });
  async function start() {
    await page.evaluate((key) => App.router.go("test/" + key), key);
    await page.locator(".quiz-finish").waitFor();
  }
  async function answer(index, blankLast) {
    for (let i = 0; i < 10; i++) {
      assert.equal(await page.locator(".quiz-q:visible").count(), 1);
      if (blankLast && i === 9) await page.locator("#qSkip").click();
      else {
        await page.locator('.quiz-q:visible .opt[data-o="' + index + '"]').click();
        const reason = page.locator('.quiz-q:visible input[data-reason][value="0"]');
        if (await reason.count()) await reason.check();
        else await page.locator('.quiz-q:visible textarea[data-reason-text]').fill('Eşitliğin iki tarafına aynı işlem uygulanır.');
        await page.locator('.quiz-q:visible input[data-confidence][value="75"]').check();
        await page.locator("#qFinish").click();
      }
    }
  }
  await start();
  for (const width of [320, 390, 768, 1440]) {
    await page.setViewportSize({ width, height: 900 });
    for (const theme of ["light", "dark"]) {
      await page.evaluate((value) => App.theme.set(value), theme);
      assert.equal(await page.evaluate(() => {
        const card = document.querySelector(".quiz-q:not([hidden])");
        const r = card.getBoundingClientRect();
        return r.left < -1 || r.right > innerWidth + 1 || card.scrollWidth > card.clientWidth + 1;
      }), false, "quiz overflow at " + width + " " + theme);
    }
  }
  await page.setViewportSize({ width: 390, height: 844 });
  await page.locator(".quiz-q:visible").screenshot({ path: path.join(qa, "adaptive-question-mobile.png"), animations: "disabled" });
  await answer(0);
  await page.locator(".quiz-result").waitFor();
  let results = await page.evaluate(() => App.db.getAll("quizzes"));
  assert.equal(results.length, 1); assert.equal(results[0].correct, 10);
  assert.equal(results[0].questions[0].difficulty, 2); assert.ok(results[0].questions.some((q) => q.difficulty === 3));
  await start(); await answer(1);
  await page.locator(".quiz-result").waitFor();
  results = await page.evaluate(() => App.db.getAll("quizzes"));
  const wrong = results.find((q) => q.correct === 0);
  assert.equal(wrong.questions[0].difficulty, 3); assert.ok(wrong.questions.some((q) => q.difficulty === 1));
  assert.equal((await page.evaluate(() => App.db.getAll("mistakes"))).length, 10);
  // Son soru boşken kayıt hatası: cevap kilidi, yeniden deneme ve mükerrer kayıt koruması.
  await page.evaluate(() => {
    const put = App.db.put.bind(App.db); let fail = true;
    App.db.put = async (store, row, opts) => {
      if (store === "quizzes" && fail) { fail = false; throw new Error("simulated write failure"); }
      return put(store, row, opts);
    };
  });
  await start(); await answer(0, true);
  await page.waitForFunction(() => { const b = document.querySelector("#qFinish"); return b && !b.disabled; });
  await page.locator("#qFinish").click();
  await page.locator(".quiz-result").waitFor();
  assert.equal((await page.evaluate(() => App.db.getAll("quizzes"))).length, 3);
  assert.equal((await page.evaluate(() => App.db.getAll("mistakes"))).length, 11);
  await page.screenshot({ path: path.join(qa, "adaptive-result-mobile.png"), fullPage: true, animations: "disabled" });
  await page.reload();
  await page.waitForFunction(() => App.db && App.db.engine !== "none");
  assert.equal((await page.evaluate(() => App.db.getAll("quizzes"))).length, 3);
  assert.deepEqual(errors, []);
  console.log("UI: 320–1440px, iki tema, ana sayfa/Bugün, yükselen/düşen zorluk, boş soru, kayıt yeniden denemesi ve kalıcılık geçti.");
} finally {
  if (browser) await browser.close();
  await new Promise((resolve) => server.close(resolve));
}
