import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { uiHarness } from "./ui-harness.mjs";
const h = await uiHarness();
try {
  const { page } = await h.device("kesif"),
    go = async (r) => {
      await page.evaluate((r) => App.router.go(r), r);
      await page.waitForSelector("#view .discovery");
    };
  await page.waitForSelector(".discovery-tile");
  assert.equal(await page.locator(".discovery-tile").count(), 9);
  const routes = await page.evaluate(() =>
    App.data.discovery.modules.map((x) => x[0]),
  );
  for (const width of [320, 768, 1440]) {
    await page.setViewportSize({ width, height: 900 });
    for (const r of routes) {
      await go(r);
      assert.equal(await page.locator("#view h1").count(), 1, r);
      assert.equal(
        await page.evaluate(
          () => document.documentElement.scrollWidth > innerWidth + 2,
        ),
        false,
        `${r} overflow ${width}`,
      );
    }
  }
  await page.setViewportSize({ width: 390, height: 844 });
  await go("telefon-fizik");
  await page.click("#ppCompute");
  assert.match(await page.locator("[data-status]").innerText(), /belirsiz/);
  await page.fill("#ppUncertainty", "0.1");
  await page.click("#ppCompute");
  assert.match(await page.locator("#ppResult").innerText(), /343/);
  await page.selectOption("#ppMode", "pendulum");
  await page.click("#ppSim");
  await page.click("#ppCompute");
  assert.match(await page.locator("#ppResult").innerText(), /2.0000/);
  await page.click("#ppReport");
  await page.waitForSelector("#srBuild");
  assert.equal(await page.inputValue("#srSource"), "simulation");
  await page.fill("#srHypothesis", "Kuramsal doğrusal ilişkide eğim 1 olur.");
  await page.fill(
    "#srConclusion",
    "Kurama göre 1 beklenir. Belirsizlik ve hata var; tekrar ölçerek iyileştiririm.",
  );
  await page.click("#srBuild");
  await page.waitForSelector("#srChart");
  assert.match(await page.locator("#srPreview").innerText(), /simulation/);

  // The actual self-contained print sheet includes the raster graph and raw rows.
  await page.evaluate(
    () =>
      (window.print = () => {
        window.__printed = true;
      }),
  );
  await page.click("#srPrint");
  await page.waitForFunction(
    () =>
      window.__printed && document.body.classList.contains("discovery-print"),
  );
  assert.equal(await page.locator("#discovery-print-sheet img").count(), 1);
  assert.ok(
    (await page.locator("#discovery-print-sheet tbody tr").count()) > 100,
  );
  if (h.engineName === "chromium") {
    await page.emulateMedia({ media: "print" });
    const pdf = await page.pdf({ format: "A4", printBackground: true });
    assert.equal(pdf.subarray(0, 4).toString(), "%PDF");
    fs.writeFileSync(path.join(h.qa, "discovery-report.pdf"), pdf);
    await page.emulateMedia({ media: "screen" });
  }
  await page.evaluate(() => window.dispatchEvent(new Event("afterprint")));
  assert.equal(await page.locator("#discovery-print-sheet").count(), 0);
  const dl = page.waitForEvent("download");
  await page.click("#srExport");
  const file = await dl,
    p = path.join(h.qa, "discovery-report.json");
  await file.saveAs(p);
  const json = JSON.parse(fs.readFileSync(p));
  assert.equal(json.source, "simulation");
  assert.ok(json.rows.length > 100);
  assert.equal(json.rubric.length, 4);
  await go("sismograf");
  await page.click("#sgSim");
  assert.match(await page.locator("#sgResult").innerText(), /100.0 Hz/);
  assert.match(await page.locator("[data-status]").innerText(), /SİMÜLASYON/);
  await page.click("#sgLocate");
  assert.match(await page.locator("#sgLocation").innerText(), /Ortak kesişimi/);
  await page.locator('[data-kit="0"]').check();
  await go("kesif");
  await go("sismograf");
  assert.equal(await page.locator('[data-kit="0"]').isChecked(), true);
  await go("dokunsal-grafik");
  await page.fill("#hgExpr", "sin(x)");
  await page.click("#hgDraw");
  await page.fill("#hgX", "1");
  await page.locator("#hgX").dispatchEvent("input");
  assert.match(await page.locator("#hgRead").innerText(), /0.84/);
  await page.locator("#hgCanvas").focus();
  await page.keyboard.press("ArrowRight");
  assert.match(await page.locator("#hgRead").innerText(), /1.05/);
  await page.fill("#hgExpr", "window.alert(1)");
  await page.click("#hgDraw");
  assert.match(
    await page.locator("[data-status]").innerText(),
    /Desteklenmeyen/,
  );
  await go("gokyuzu");
  await page.fill("#skyTime", "2026-06-21T12:00");
  await page.fill("#skyLat", "0");
  await page.fill("#skyLon", "0");
  await page.click("#skyDraw");
  assert.ok((await page.locator("#skyTable tbody tr").count()) >= 10);
  assert.match(await page.locator("#skyMoon").innerText(), /güneş saati/);
  await go("ciz-calissin");
  for (const kind of ["circuit", "force", "optics", "ramp"]) {
    await page.selectOption("#dsKind", kind);
    await page.click("#dsRun");
    assert.match(await page.locator("[data-status]").innerText(), /onaylandı/);
    assert.ok((await page.locator("#dsResult").innerText()).length > 40);
    await page.click("#dsPause");
  }
  await page.selectOption("#dsKind", "circuit");
  await page.fill("#dsModel", '{"nodes":2,"components":[]}');
  await page.click("#dsRun");
  assert.match(await page.locator("[data-status]").innerText(), /tekil/);
  await page.click("#dsClear");
  const box = await page.locator("#dsDraw").boundingBox();
  await page.mouse.move(box.x + 20, box.y + 20);
  await page.mouse.down();
  await page.mouse.move(box.x + 150, box.y + 100, { steps: 20 });
  await page.mouse.up();
  await page.click("#dsEdges");
  assert.match(
    await page.locator("[data-status]").innerText(),
    /kenar pikseli/,
  );
  // Controlled AI fixture: validates integration; does not claim live model accuracy.
  await page.evaluate(() => {
    App.ai.generate = async () => ({
      data: {
        kind: "circuit",
        net: {
          nodes: 2,
          components: [
            { type: "voltage", a: 1, b: 0, value: 5 },
            { type: "resistor", a: 1, b: 0, value: 100 },
          ],
        },
        uncertain: ["Bağlantıyı kontrol et"],
      },
      model: "test-fixture",
    });
  });
  await page.click("#dsAI");
  await page.waitForFunction(() =>
    document.querySelector("#dsModel").value.includes("100"),
  );
  assert.doesNotMatch(
    await page.locator("[data-status]").innerText(),
    /çalıştırıldı/,
  );
  await page.click("#dsRun");
  assert.match(await page.locator("#dsResult").innerText(), /5.000 V/);
  await go("canlanan-kitap");
  await page.fill("#eqExpression", "sin(k*x)");
  await page.click("#eqApply");
  await page.locator("#eqk").fill("2");
  await page.locator("#eqk").dispatchEvent("input");
  assert.equal(await page.locator("#eqValuek").innerText(), "2");
  await page.selectOption("#eqKind", "ellipse");
  await page.locator("#eqb").fill("2");
  await page.click("#eqApply");
  assert.match(await page.locator("[data-status]").innerText(), /onaylandı/);
  await go("tarih-haritasi");
  await page.locator("#hmTime").fill("1500");
  await page.locator("#hmTime").dispatchEvent("input");
  assert.match(await page.locator("#hmDossier").innerText(), /1453/);
  await page.click("#hmNext");
  assert.equal(await page.locator("#hmYear").innerText(), "1683");
  await page.locator("#hmRegion").focus();
  await page.keyboard.press("Enter");
  await page.waitForSelector('.modal-backdrop [role="dialog"]');
  await page.keyboard.press("Escape");
  await go("bana-ogret");
  await page.fill("#rtSearch", "kuvvet");
  await page.click("#rtAdd");
  assert.ok((await page.locator("#rtChecks li").count()) > 0);
  await page.fill("#rtText", "Net kuvvet sıfırsa ivme sıfırdır.");
  await page.evaluate(() => {
    App.ai.generate = async () => ({
      data: {
        reply: "Peki sabit hızlı hareket eden cismin net kuvveti nedir?",
        checks: [
          {
            id: App.reverseTutor
              .outcomes()
              .find((x) => x.label.toLocaleLowerCase("tr").includes("kuvvet"))
              .id,
            status: "covered",
            evidence: "Net kuvvet sıfırsa",
          },
        ],
        misconceptions: [],
        next: ["Sabit hız örneği ver."],
      },
      model: "test-fixture",
    });
  });
  await page.click("#rtSend");
  await page.waitForFunction(() =>
    document.querySelector("#rtFeedback").textContent.includes("test-fixture"),
  );
  assert.equal(await page.locator("#rtLog p").count(), 3);
  await page.click("#rtFinish");
  await page.waitForSelector("#rtFeedback h2");
  await page.reload();
  await page.waitForSelector("#rtLog p");
  assert.ok((await page.locator("#rtLog p").count()) >= 3);
  // Late permission grants must release devices after route change.
  await go("telefon-fizik");
  await page.evaluate(() => {
    window.__stopped = 0;
    Object.defineProperty(navigator, "mediaDevices", {
      configurable: true,
      value: {
        getUserMedia: () =>
          new Promise((res) => {
            window.__grant = () =>
              res({ getTracks: () => [{ stop: () => window.__stopped++ }] });
          }),
      },
    });
  });
  await page.click("#ppMic");
  await go("kesif");
  await page.evaluate(() => window.__grant());
  await page.waitForFunction(() => window.__stopped === 1);
  // Controlled native events: no physical hardware validation claim.
  await go("sismograf");
  await page.evaluate(() => {
    window.DeviceMotionEvent = class extends Event {};
  });
  await page.click("#sgStart");
  await page.evaluate(() => {
    for (let i = 0; i < 36; i++) {
      const e = new Event("devicemotion");
      Object.defineProperty(e, "accelerationIncludingGravity", {
        value: { x: 0.2, y: 0.1, z: 9.8 },
      });
      Object.defineProperty(e, "rotationRate", { value: null });
      window.dispatchEvent(e);
    }
  });
  assert.match(await page.locator("#sgResult").innerText(), /device/);
  await page.click("#sgStop");

  // Backgrounding pauses devices without permanently disabling the live page.
  const resumed = await page.evaluate(() => {
    const el = document.querySelector("#view .discovery"),
      parent = App.discovery.scope(el);
    let child = App.discovery.scope(el),
      stops = 0;
    child.add(() => stops++);
    parent.add(() => child.close());
    Object.defineProperty(document, "hidden", {
      configurable: true,
      value: true,
    });
    document.dispatchEvent(new Event("visibilitychange"));
    Object.defineProperty(document, "hidden", {
      configurable: true,
      value: false,
    });
    document.dispatchEvent(new Event("visibilitychange"));
    const stillAlive = parent.alive;
    child = App.discovery.scope(el);
    child.add(() => stops++);
    parent.close();
    delete document.hidden;
    return { stillAlive, stops };
  });
  assert.equal(resumed.stillAlive, true);
  assert.equal(resumed.stops, 2);
  // Translation-only tracker, fed a deterministic synthetic camera canvas.
  await go("canlanan-kitap");
  const tracked = await page.evaluate(async () => {
    const board = document.createElement("canvas");
    board.width = 240;
    board.height = 135;
    Object.defineProperties(board, {
      videoWidth: { value: 240 },
      videoHeight: { value: 135 },
    });
    const c = board.getContext("2d"),
      d = c.createImageData(240, 135);
    let seed = 12;
    for (let i = 0; i < d.data.length; i += 4) {
      seed = (seed * 1664525 + 1013904223) >>> 0;
      const v = seed % 256;
      d.data[i] = d.data[i + 1] = d.data[i + 2] = v;
      d.data[i + 3] = 255;
    }
    c.putImageData(d, 0, 0);
    const base = document.createElement("canvas");
    base.width = 240;
    base.height = 135;
    base.getContext("2d").drawImage(board, 0, 0);
    const clean = [],
      events = [],
      life = { alive: true, add: (f) => clean.push(f) };
    App.discoveryVision.track(board, [0.2, 0.2, 0.5, 0.5], life, (p) =>
      events.push(p),
    );
    c.clearRect(0, 0, 240, 135);
    c.drawImage(base, 6, 4);
    await new Promise((r) => setTimeout(r, 210));
    c.fillStyle = "white";
    c.fillRect(0, 0, 240, 135);
    await new Promise((r) => setTimeout(r, 210));
    life.alive = false;
    clean.forEach((f) => f());
    return events;
  });
  assert.ok(tracked[0].confidence > 0.99);
  assert.ok(tracked.some((p) => p.box[0] > 0.21 && !p.lost));
  assert.equal(tracked.at(-1).lost, true);
  await go("kesif");
  await page.screenshot({
    path: path.join(h.qa, "discovery-home.png"),
    fullPage: true,
  });
  assert.deepEqual(h.errors, []);
  console.log(
    "Discovery UI: all nine routes at three widths; scientific models, exports, guided evidence, AI proposal confirmation, sensor fixtures, lifecycle and offline local assets passed.",
  );
} finally {
  await h.close();
}
