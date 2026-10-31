// Tüm kayıtlı araç/rota açılışları. Donanım ve canlı servis doğrulaması değildir.
import fs from "node:fs";
import path from "node:path";
import assert from "node:assert/strict";
import { uiHarness, navigate } from "./ui-harness.mjs";
import { researchBank } from "./fixtures/research-bank.mjs";
const h = await uiHarness(), results = [];
try {
  const { page } = await h.device();
  await page.evaluate(() => App.lazy.load(["labs", "games"]));   // v1.64: deneyler ve oyunlar isteğe bağlı yüklenir
  const info = await page.evaluate((bank) => {
    const first = App.learnmap.allOutcomes().find((it) => it.outcome.content || it.outcome.curatedContent);
    App.ai.generate = async () => ({ model: "smoke-fixture", data: { questions: bank } });
    return { key: first.key, tools: App.hub.TOOLS.map((x) => x[0]), labs: Object.keys(App.labs.LABS), games: Object.keys(App.games.GAMES) };
  }, researchBank(30));
  const routeNames = new Set(["", ...info.tools]);
  for (const file of fs.readdirSync(path.join(h.root, "js/modules"))) {
    if (!file.endsWith(".js")) continue;
    const source = fs.readFileSync(path.join(h.root, "js/modules", file), "utf8");
    for (const match of source.matchAll(/App\.router\.register\("([^"]*)"/g)) routeNames.add(match[1]);
  }
  const routes = Array.from(routeNames).map((r) => r === "test" ? "test/" + info.key : r);
  routes.push(...info.labs.map((id) => "lab/" + id), ...info.games.map((id) => "oyunlar/" + id), "anlat/" + info.key, "kontrol/" + info.key, "konular/" + info.key, "yazili/9/matematik", "kartlar/incele", "program/benim", "denemeler/yeni");
  for (const width of [390, 1440]) {
    await page.setViewportSize({ width, height: 900 });
    for (const route of routes) {
      const start = Date.now();
      let outcome;
      try {
        await navigate(page,route);
        outcome=await page.evaluate(()=>({text:document.querySelector('#view').innerText.slice(0,600),resolved:App.router.current().path}));
      } catch(e) { outcome={text:'NavigationError: '+e.message,resolved:route}; }
      const failed = !outcome.text.trim() || /NavigationError:|TypeError:|ReferenceError:|SyntaxError:|is not a function|Cannot read properties/.test(outcome.text);
      results.push({ route, width, resolved: outcome.resolved, status: failed ? "failure" : outcome.resolved !== route ? "redirect" : "opened", elapsedMs: Date.now() - start, text: outcome.text.slice(0, 180) });
      if (failed) await page.screenshot({ path: path.join(h.qa, "failure-" + route.replace(/[^a-z0-9]/gi, "_") + "-" + width + ".png") });
    }
  }
  const report = { note: "Route opening smoke test with AI fixtures. Camera, microphone, live AI/network and physical devices require separate verification.", count: results.length, errors: h.errors, results };
  fs.writeFileSync(path.join(h.qa, "all-features-report.json"), JSON.stringify(report, null, 2));
  const failures = results.filter((r) => r.status === "failure");
  assert.deepEqual(failures, []); assert.deepEqual(h.errors, []);
  console.log("All-features UI: " + routes.length + " routes × two viewport sizes = " + results.length + " opening checks passed; redirects recorded separately.");
} finally { await h.close(); }
