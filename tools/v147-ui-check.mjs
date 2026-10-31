import assert from "node:assert/strict";
import path from "node:path";
import { uiHarness, navigate } from "./ui-harness.mjs";
import { researchBank } from './fixtures/research-bank.mjs';
const h = await uiHarness();
try {
  const { page } = await h.device();
  const go = async (r) => {
    await page.evaluate((r) => App.router.go(r), r);
    await page.waitForTimeout(180);
  };
  await page.waitForSelector("[data-ai-favs]");
  await page.fill('#composer textarea','Kendi notum: oran konusu');
  await page.locator('[data-ai-favs] [data-favorite-open="ai:coach"]').click();
  await page.waitForFunction(() =>
    document.querySelector("#composer textarea").value.includes("doğrudan"),
  );
  assert.equal(await page.evaluate(() => App.prefs.get("aiSocratic")), true);
  assert.ok((await page.inputValue('#composer textarea')).includes('Kendi notum: oran konusu'));
  await navigate(page,"favorilerim");
  await page.click('[data-favorite-remove="ai:coach"]');
  await page.reload();
  await page.waitForSelector("[data-favorites-list]");
  assert.equal(await page.locator('[data-favorites-list] [data-favorite-open="ai:coach"]').count(), 0);
  await page.locator("[data-favorites-ai] summary").click();
  await page.click('.ai-fav-options [data-aif-pin="coach"]');
  assert.equal(await page.locator('[data-aif-open="coach"]').count(), 1);
  await go("konusma/de");
  await page.waitForSelector("#lpLevel");
  assert.equal(await page.evaluate(() => App.speech.langTag('de')), 'de-DE');
  assert.equal(await page.evaluate(() => App.speech.langTag('en')), 'en-US');
  for (const level of ["A1", "A2", "B1", "B2"]) {
    await page.selectOption("#lpLevel", level);
    await page.click("#lpReveal");
    assert.equal(await page.locator("#lpMeaning").isVisible(), true);
    await page.click('[data-lpm="quiz"]');
    await page.locator('[name="lpAnswer"]').first().check();
    await page.click("#lpCheck");
    assert.ok((await page.locator("#lpFeedback").innerText()).length > 20);
    await page.click('[data-lpm="dialog"]');
    await page.locator('[name="lpAnswer"]').first().check();
    await page.click("#lpCheck");
    assert.ok((await page.locator("#lpFeedback").innerText()).length > 20);
    await page.click('[data-lpm="vocab"]');
  }
  const saved = await page.evaluate(
    () => Object.keys(App.languagePractice.progress()).length,
  );
  assert.equal(saved, 8);
  await go("konusma");
  await page.waitForSelector(".ks");
  assert.ok((await page.locator(".ks").innerText()).includes("İngilizce"));
  await go("sensor/olcum");
  await page.waitForSelector("#swStart");
  await page.selectOption("#swSource", "simulation");
  for (const sensor of ["accel", "gyro", "light", "magnetic", "sound"]) {
    await page.selectOption("#swSensor", sensor);
    await page.fill("#swLimit", "0");
    await page.fill('[data-sw-axis="x"]', "10");
    await page.click("#swStart");
    await page.waitForTimeout(350);
    await page.click("#swStop");
    assert.match(await page.locator("#swValue").innerText(), /10\.00/);
    assert.match(await page.locator("#swAlert").innerText(), /Eşik/);
    const [download] = await Promise.all([
      page.waitForEvent("download"),
      page.click("#swJSON"),
    ]);
    const file = await download.path();
    const fs = await import("node:fs");
    const data = JSON.parse(fs.readFileSync(file, "utf8"));
    assert.equal(data.source, "simulation");
    assert.equal(data.sensor, sensor);
    assert.ok(data.samples.length > 0);
    assert.equal(
      data.unit,
      await page.evaluate((s) => App.sensorWorkbench.CHANNELS[s].unit, sensor),
    );
  }
  await page.selectOption("#swSensor", "accel");
  await page.selectOption("#swSource", "device");
  await page.evaluate(() => {
    window.DeviceMotionEvent = class extends Event {
      static async requestPermission() {
        return "granted";
      }
    };
  });
  await page.click("#swStart");
  await page.evaluate(() => {
    const e = new Event("devicemotion");
    Object.defineProperty(e, "accelerationIncludingGravity", {
      value: { x: 1, y: 2, z: 3 },
    });
    dispatchEvent(e);
  });
  assert.match(await page.locator("#swValue").innerText(), /x=1/);
  await page.click("#swStop");
  // Delayed permission is simulated; a stream granted after navigation must close.
  await page.selectOption('#swSensor','sound');
  await page.evaluate(() => {
    window.AudioContext = class {};
    Object.defineProperty(navigator,'mediaDevices',{configurable:true,value:{getUserMedia:()=>new Promise(resolve=>{window.__swGrant=resolve;})}});
    window.__swStops=0;
  });
  await page.click('#swStart');await page.waitForFunction(()=>!!window.__swGrant);
  await go('bugun');await page.waitForSelector('.tday-grid');
  await page.evaluate(()=>window.__swGrant({getTracks:()=>[{stop(){window.__swStops++;}}]}));
  await page.waitForFunction(()=>window.__swStops===1);
  // Closing a pending experiment dialog must not open a late transfer on another page.
  await go('arastirma');await page.waitForSelector('#rCreate');
  await page.evaluate(()=>{window.__realCreate=App.research.create;App.research.create=async options=>{const session=await window.__realCreate(options);await new Promise(resolve=>window.__finishCreate=resolve);return session;};});
  await page.click('#rCreate');await page.fill('#rTitle','Cancelled transfer test');
  await page.fill('#rBank',JSON.stringify({questions:researchBank()}));await page.check('#rReviewed');await page.click('#rCreateGo');
  try { await page.waitForFunction(()=>!!window.__finishCreate); }
  catch(e) { console.log('Research create diagnostic',await page.evaluate(()=>({status:document.querySelector('#rCreateStatus')?.textContent,reviewed:document.querySelector('#rReviewed')?.checked,title:document.querySelector('#rTitle')?.value,disabled:document.querySelector('#rCreateGo')?.disabled})));await page.screenshot({path:path.join(h.qa,'research-create-failure.png')});throw e; }
  await page.locator('.modal-backdrop [data-close]').first().click();await go('bugun');
  await page.evaluate(()=>{App.research.create=window.__realCreate;window.__finishCreate();});await page.waitForTimeout(100);
  assert.equal(await page.locator('#rCodes').count(),0);assert.equal(await page.locator('.tday-grid').count(),1);
  // Corrupt stored data must be isolated, retained, and reported instead of crashing the panels.
  await page.evaluate(async () => {
    await App.db.put("reviews", {
      id: "bad-review",
      kind: "request",
      role: "teacher",
      request: null,
    });
    await App.db.put("research", {
      id: "bad-session",
      kind: "session",
      session: null,
    });
    await App.db.put("meta", { id: "sm:a:bad", kind: "sm-a", data: null });
  });
  for (const route of ["degerlendirme", "arastirma", "sinif-modu"]) {
    await go(route);
    await page.waitForSelector(".module-help");
    assert.equal(await page.locator(".record-warning").count(), 1, route);
    assert.ok((await page.locator(".module-help li").count()) >= 5);
  }
  assert.equal(
    await page.evaluate(
      async () => !!(await App.db.get("reviews", "bad-review")),
    ),
    true,
  );
  for (const [route,store] of [['degerlendirme','reviews'],['arastirma','research'],['sinif-modu','meta']]) {
    await go('bugun');
    await page.evaluate(([route,store])=>{const original=App.db.getAll.bind(App.db);window.__delays=[];window.__restore=()=>{App.db.getAll=original;};App.db.getAll=async name=>{const rows=await original(name);if(name===store&&App.router.current().name===route)return new Promise(resolve=>window.__delays.push(()=>resolve(rows)));return rows;};App.router.go(route);},[route,store]);
    await page.waitForFunction(()=>window.__delays.length>0);
    await go('bugun');await page.waitForSelector('.tday-grid');
    const title=await page.title();
    await page.evaluate(()=>{window.__restore();window.__delays.forEach(fn=>fn());});await page.waitForTimeout(100);
    assert.equal(await page.title(),title);assert.equal(await page.locator('.tday-grid').count(),1);
  }
  await go("kure");
  await page.waitForSelector("#kStage");
  const gl = await page.evaluate(() => App.lab3d.supported());
  if (gl) {
    await page.waitForSelector("#kStage canvas");
    await page.selectOption("#kPoi", "0");
    await page.waitForSelector("#kOverlay:not([hidden])");
    assert.match(await page.locator("#kOverlay").innerText(), /Gize/);
    const before = await page.evaluate(() => App.kure.viewState());
    await page.click('[data-korbit="zin"]');
    assert.ok((await page.evaluate(() => App.kure.viewState())).radius < before.radius);
    await page.click('[data-korbit="panleft"]');
    assert.notDeepEqual((await page.evaluate(() => App.kure.viewState())).target,before.target);
    await page.click('[data-korbit="reset"]');
    assert.equal((await page.evaluate(() => App.kure.viewState())).radius,6.6);
    await page.click('#kHolo');await page.waitForSelector('[data-holo="look"]');
    await page.click('[data-holo="look"]');await page.keyboard.press('Escape');
    await page.waitForSelector('[data-holo="look"]',{state:'detached'});
    await page.screenshot({
      path: path.join(h.qa, "globe-147.png"),
      fullPage: true,
    });
  }
  for (const width of [320, 768, 1440]) {
    await page.setViewportSize({ width, height: 900 });
    for (const route of [
      "",
      "konusma/de",
      "sensor/olcum",
      "degerlendirme",
      "arastirma",
      "sinif-modu",
      "kure",
    ]) {
      await go(route);
      await page.waitForTimeout(250);
      assert.ok(
        (await page.evaluate(
          () =>
            document.documentElement.scrollWidth -
            document.documentElement.clientWidth,
        )) <= 1,
        route + " overflow @" + width,
      );
    }
  }
  assert.deepEqual(h.errors, []);
  console.log(
    h.engineName +
      ": favourites persistence, all German levels/activities, five sensor simulations and JSON units/source, motion fixture, corrupt record isolation, globe controls and responsive integration passed.",
  );
} finally {
  await h.close();
}
