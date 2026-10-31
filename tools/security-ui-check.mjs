// v1.64 güvenlik ve isteğe bağlı yükleme, gerçek tarayıcıda:
//   • CSP etkin: sayfaya sonradan eklenen satır içi olay işleyicisi çalışmaz; uygulama hiçbir CSP ihlali üretmez
//   • kayıtlı/eşitlenmiş ders içeriğindeki HTML süzülür: betik, olay işleyicisi, javascript: adresi çalışmaz
//   • App.sanitize.html bilinen XSS kalıplarını temizler, zararsız biçimi korur
//   • açılışta tembel modül yüklenmez; her tembel ekran ilk ziyarette yüklenip hatasız çizilir
import assert from "node:assert/strict";
import { uiHarness, navigate } from "./ui-harness.mjs";
const h = await uiHarness();
try {
  const context = await h.browser.newContext({ serviceWorkers: "block" });
  await context.route("**/*", (r) => (new URL(r.request().url()).hostname === "127.0.0.1" || r.request().url().startsWith("blob:") ? r.continue() : r.abort()));
  await context.addInitScript(() => {
    localStorage.setItem("da:pref:tourDone", "true");
    window.__csp = [];
    document.addEventListener("securitypolicyviolation", (e) => window.__csp.push(e.violatedDirective + " " + (e.blockedURI || "") + " " + (e.sourceFile || "") + ":" + (e.lineNumber || "")));
  });
  const page = await context.newPage();
  const consoleErrors = [];
  page.on("pageerror", (e) => h.errors.push({ message: e.message, url: page.url() }));
  // Parsing hostile HTML in the sanitizer makes Chromium report (and block) the handlers it contains: expected there only.
  const fromSanitizer = (url) => /\/js\/core\/sanitize\.js/.test(url || "");
  page.on("console", (m) => { if (m.type() === "error" && !fromSanitizer(m.location().url) && !/Failed to load resource|net::ERR_FAILED|ERR_NAME_NOT_RESOLVED/i.test(m.text())) consoleErrors.push(m.text()); });
  await page.goto(h.baseUrl + "/#/");
  await page.waitForFunction(() => window.App && App.lazy && App.startup && !App.startup.active && document.querySelector("#view").children.length);

  // Startup: nothing lazy is loaded yet.
  const startup = await page.evaluate(() => {
    const files = Object.values(App.lazy.GROUPS).flat();
    const loaded = [...document.scripts].map((s) => s.getAttribute("src")).filter((s) => s && files.includes(s));
    return { loaded, labs: !!App.labs, about: !!(App.modules && App.modules.about) };
  });
  assert.deepEqual(startup, { loaded: [], labs: false, about: false }, "lazy modules stay off the startup path");

  // csp.js adds the policy as the last startup script (not as static markup: that delays preloading in Chromium).
  assert.equal(await page.evaluate(() => { const m = document.querySelector('meta[http-equiv="Content-Security-Policy"]'); return !!m && m.parentNode === document.head && m.content === App.csp; }), true, "CSP meta is in place after startup");
  // CSP blocks an injected inline handler (what a missed escape would turn into).
  await page.evaluate(() => {
    const d = document.createElement("div");
    d.innerHTML = '<img src="data:," onerror="window.__inline=1">';
    document.body.appendChild(d);
    setTimeout(() => d.remove(), 400);
  });
  await page.waitForTimeout(500);
  assert.equal(await page.evaluate(() => window.__inline), undefined, "inline handler did not run under CSP");
  assert.ok((await page.evaluate(() => window.__csp.length)) >= 1, "the blocked handler was reported as a CSP violation");
  await page.evaluate(() => { window.__csp = []; });
  consoleErrors.length = 0;                          // the blocked handler above is logged on purpose

  // Sanitizer vectors.
  const out = await page.evaluate(() => {
    const s = App.sanitize.html;
    return {
      img: s('<img src=x onerror="window.__x=1">'),
      script: s("<p>a</p><script>window.__x=2</script><style>*{}</style>"),
      js: s('<a href="javascript:window.__x=3">t</a><a href=" JaVa&#x09;script:alert(1)">u</a>'),
      svg: s('<svg onload="window.__x=4"><circle/></svg><math><mi>x</mi></math>'),
      frame: s('<iframe srcdoc="<script>parent.__x=5</script>"></iframe><object data="x"></object><embed src="x">'),
      attrs: s('<p style="position:fixed" id="App" class="voice-overlay" data-x="1" title="ok">t</p>'),
      form: s('<form action="https://evil.example"><input name="p"><button>b</button></form>text'),
      unknown: s("<marquee><b>bold</b></marquee><custom-el>c</custom-el>"),
      keep: s('<h2>Başlık</h2><ul><li><strong>a</strong> <em>b</em></li></ul><table><tr><td colspan="2">c</td></tr></table><a href="https://meb.gov.tr">m</a><a href="#/konular">k</a>'),
      dataSvg: s('<img src="data:image/svg+xml;base64,PHN2Zz4=">'),
      comment: s("<!-- <img src=x onerror=alert(1)> -->ok"),
      noscript: s('<noscript><p title="</noscript><img src=x onerror=alert(1)>"></noscript>z'),
      details: s('<details open ontoggle="window.__x=6"><summary>s</summary>d</details>'),
      x: window.__x
    };
  });
  assert.equal(out.img, '<img src="x" loading="lazy" decoding="async" referrerpolicy="no-referrer">');
  assert.equal(out.script, "<p>a</p>");
  assert.equal(out.js, "<a>t</a><a>u</a>");
  assert.equal(out.svg, "");
  assert.equal(out.frame, "");
  assert.equal(out.attrs, '<p title="ok">t</p>');
  assert.equal(out.form, "text");
  assert.equal(out.unknown, "<b>bold</b>c");
  assert.match(out.keep, /^<h2>Başlık<\/h2><ul><li><strong>a<\/strong> <em>b<\/em><\/li><\/ul><table><tbody><tr><td colspan="2">c<\/td><\/tr><\/tbody><\/table><a href="https:\/\/meb.gov.tr" target="_blank" rel="noopener noreferrer">m<\/a><a href="#\/konular">k<\/a>$/);
  assert.equal(out.dataSvg, "");
  assert.equal(out.comment, "ok");
  // noscript/mXSS: engines parse this differently; whatever survives must carry no element with a handler
  assert.ok(!/<noscript|<img[^>]*\son|onerror\s*=/i.test(out.noscript.replace(/title="[^"]*"/g, "")), "noscript payload neutralised: " + out.noscript);
  assert.equal(out.details, "<details><summary>s</summary>d</details>");
  assert.equal(out.x, undefined, "nothing executed while sanitizing");

  // Stored lesson content (synced/imported) is untrusted: it renders as text, nothing runs.
  const key = await page.evaluate(async () => {
    // An AI/synced lesson lands on an outcome without hand-written content. 1.64 ships content for every outcome,
    // so (as in the 1.60 review) one outcome is emptied in memory after its subject loaded, then the stored row applies.
    let key = null;
    for (const g of App.data.curriculum.grades) for (const s of g.subjects) for (const u of s.units) for (const o of u.outcomes) if (!key && !o.curatedContent) key = g.id + "/" + s.id + "/" + u.id + "/" + o.id;
    if (!key) {
      const g = App.data.curriculum.grades[0], s = g.subjects.find((x) => x.units.length);
      await App.content.ensure(g.id, s.id);
      const u = s.units[0], o = u.outcomes[0];
      o.curatedContent = false; delete o.content;
      key = g.id + "/" + s.id + "/" + u.id + "/" + o.id;
    }
    const body = '<h3>Yazılı ders</h3><p>Güvenli paragraf.</p><img src="x" onerror="window.__pwn=1"><script>window.__pwn=2</script>' +
      '<a href="javascript:window.__pwn=3" id="evil">tıkla</a><svg><animate onbegin="window.__pwn=4" attributeName="x" dur="1s"/></svg>' + "<p>" + "Dolgu metni. ".repeat(20) + "</p>";
    await App.db.put("lessons", { id: "les:" + key, content: { anlatim: body, ornekler: [{ soru: '<b onmouseover="window.__pwn=5">Soru</b>', cozum: "Çözüm" }], ozet: ["<i>Özet</i>"] }, model: "test", date: "2026-10-31", lang: "tr" });
    await App.lessons.load();
    return key;
  });
  assert.ok(key, "an outcome without curated content exists");
  await navigate(page, "konular/" + key);
  await page.waitForFunction(() => /Güvenli paragraf/.test(document.querySelector("#view").textContent), null, { timeout: 15000 });
  const lesson = await page.evaluate(() => {
    const v = document.querySelector("#view");
    v.querySelectorAll("a").forEach((a) => { if (/tıkla/.test(a.textContent)) a.click(); });
    v.querySelectorAll("b").forEach((b) => b.dispatchEvent(new MouseEvent("mouseover", { bubbles: true })));
    return {
      handlers: [...v.querySelectorAll("*")].filter((e) => [...e.attributes].some((a) => /^on/i.test(a.name))).length,
      scripts: v.querySelectorAll("script, svg animate").length,
      jsLinks: [...v.querySelectorAll("a[href]")].filter((a) => /^\s*javascript:/i.test(a.getAttribute("href"))).length,
      heading: !!v.querySelector("h3") && /Yazılı ders/.test(v.textContent)
    };
  });
  await page.waitForTimeout(400);
  assert.deepEqual(lesson, { handlers: 0, scripts: 0, jsLinks: 0, heading: true });
  assert.equal(await page.evaluate(() => window.__pwn), undefined, "stored lesson HTML did not execute");
  await page.evaluate((key) => App.db.del ? App.db.del("lessons", "les:" + key) : App.db.delete("lessons", "les:" + key), key).catch(() => {});

  // Every lazy screen loads on first visit and renders without errors.
  const routes = await page.evaluate(() => Object.keys(App.lazy.ROUTES).filter((r) => typeof App.lazy.ROUTES[r] !== "function"));
  const failures = [];
  for (const r of routes) {
    const before = h.errors.length;
    try {
      await navigate(page, r);
      await page.waitForFunction(() => document.querySelector("#view").children.length > 0, null, { timeout: 15000 });
      const state = await page.evaluate((r) => ({ groups: (App.lazy.ROUTES[r] || []).every((g) => App.lazy.loaded(g)), name: App.router.current().name, text: document.querySelector("#view").textContent.trim().length }), r);
      const redirected = ["canli", "cevre", "vatandas", "gokyuzu", "ph", "ekosistem"].includes(r);
      if (!state.groups || (!redirected && state.name !== r) || !state.text) failures.push(r + " " + JSON.stringify(state));
    } catch (e) { failures.push(r + " " + e.message); }
    if (h.errors.length > before) failures.push(r + " pageerror: " + h.errors.slice(before).map((e) => e.message).join(" | "));
  }
  assert.deepEqual(failures, [], "lazy screens");
  assert.deepEqual((await page.evaluate(() => window.__csp)).filter((v) => !fromSanitizer(v)), [], "the app itself triggers no CSP violation");
  assert.deepEqual(consoleErrors, [], "no console errors");
  assert.deepEqual(h.errors, []);
  console.log(h.engineName + ": CSP blocks injected handlers, " + Object.keys(out).length + " sanitizer vectors, stored lesson XSS neutralised, " + routes.length + " lazy screens load on first visit without errors or CSP violations.");
} finally {
  await h.close();
}
