// v1.49 arayüz sınaması (gerçek tarayıcı): pH ölçer (elle renk, beyaz referans, kayıt), vatandaş bilimi (harita,
// QR paylaşım ve yapıştırarak birleştirme), ekosistem kavanozu (oynatma, müdahaleler), meslek haritası
// (örnek ilerlemeyle sıralama, meslek ve kazanım sayfaları, konu sayfası bağlantısı) ve disleksi dostu mod
// (hece renklendirme, metnin değişmemesi, okunan kelime aralığı). Kamera ve mikrofon gerekmez.
import assert from "node:assert/strict";
import { uiHarness } from "./ui-harness.mjs";
const h = await uiHarness();
let checks = 0;
const ok = (n) => { checks++; console.log("✓ " + n); };
const go = (page, r) => page.evaluate((x) => App.router.go(x), r);
try {
  const { page } = await h.device();
  await page.setViewportSize({ width: 1280, height: 900 });

  // 1) pH ölçer: skaladaki pH 3 rengi elle girilir → pH ≈ 3, kuvvetli/zayıf asit bandı, kayıt listesi
  await go(page, "ph");
  await page.waitForSelector("#phColor");
  const ph = await page.evaluate(() => {
    const inp = document.querySelector("#phColor");
    inp.value = App.phMetre.hex(App.phMetre.SCALE[2][1]); inp.dispatchEvent(new Event("input", { bubbles: true }));
    return { num: document.querySelector(".ph-num b").textContent, band: document.querySelector(".ph-band").textContent, mark: document.querySelector("#phMark").style.left, save: document.querySelector("#phSave").disabled };
  });
  assert.ok(Math.abs(parseFloat(ph.num.replace(",", ".")) - 3) < 0.6 && /asit/i.test(ph.band) && parseFloat(ph.mark) > 5 && !ph.save, JSON.stringify(ph));
  await page.fill("#phName", "Sirke");
  await page.click("#phSave");
  await page.waitForSelector(".ph-log li");
  assert.match(await page.textContent(".ph-log"), /Sirke/);
  await page.evaluate(() => { const inp = document.querySelector("#phColor"); inp.value = "#808080"; inp.dispatchEvent(new Event("input", { bubbles: true })); });
  assert.ok(await page.evaluate(() => document.querySelector("#phSave").disabled && /soluk|gri/i.test(document.querySelector("#phResult").textContent)));
  ok("pH ölçer: renkten pH " + ph.num + " (" + ph.band.split("·")[0].trim() + "), kayıt listesi, gri renkte uyarı");

  // 2) Vatandaş bilimi: iki kişinin ölçümleri, harita, QR paylaşımı ve yapıştırarak birleştirme
  await page.evaluate(async () => {
    App.prefs.set("vbName", "Elif");
    const at = (m) => new Date(Date.UTC(2026, 9, 28, 19, m)).toISOString();
    await App.db.put("meta", { id: "vb:data", items: [
      { k: "n", v: 72.5, lat: 41.0151, lon: 28.9795, at: at(1), by: "Elif" }, { k: "n", v: 48.1, lat: 41.0172, lon: 28.9830, at: at(2), by: "Elif" },
      { k: "l", v: 8, lat: 41.0151, lon: 28.9795, at: at(3), by: "Elif", m: 17.8 }] });
  });
  await go(page, "vatandas/harita");
  await page.waitForFunction(() => /2 konumlu ölçüm/.test(document.querySelector("#vbMapInfo").textContent));
  const px = await page.evaluate(() => { const c = document.querySelector("#vbMap"), d = c.getContext("2d").getImageData(0, 0, c.width, c.height).data; let n = 0; for (let i = 0; i < d.length; i += 4) if (d[i] > 120 && d[i + 2] < 120) n++; return n; });
  assert.ok(px > 200, "ısı haritası boyandı: " + px);
  await page.click('#vbLayer [data-v="l"]');
  await page.waitForFunction(() => /Bortle/.test(document.querySelector("#vbList").textContent));
  await go(page, "vatandas/paylas");
  await page.waitForSelector("#vbQr .sm-qr svg", { timeout: 10000 });
  const frames = await page.evaluate(async () => (await App.sinifModu.pack(App.vatandas.toPacket([
    { k: "n", v: 66, lat: 41.0160, lon: 28.9810, at: "2026-10-28T19:10:00.000Z", by: "Can" }, { k: "n", v: 72.5, lat: 41.0151, lon: 28.9795, at: "2026-10-28T19:01:00.000Z", by: "Elif" }], "Can"))).join("\n"));
  await page.click("#vbScan");
  await page.waitForSelector("#smPaste", { state: "attached" });
  await page.evaluate(() => { const d = document.querySelector(".sm-paste"); if (d) d.open = true; });
  await page.fill("#smPaste", frames);
  await page.click("#smPasteGo");
  await page.waitForFunction(() => /1 yeni ölçüm/.test(document.querySelector("#vbScanRes").textContent), null, { timeout: 8000 });
  const total = await page.evaluate(async () => (await App.db.get("meta", "vb:data")).items.length);
  assert.equal(total, 4);
  ok("vatandaş bilimi: ısı haritası ve katman değişimi, QR paylaşımı, birleştirmede mükerrer kayıt atlandı (1 yeni, 1 tekrar)");

  // 3) Ekosistem: oynat, 10× hız, tilkileri çıkar, kuraklık
  await go(page, "ekosistem");
  await page.waitForSelector("#ekPlay");
  await page.click('#ekSpeed [data-v="10"]');
  await page.click("#ekPlay");
  await page.waitForTimeout(1500);
  const e1 = await page.evaluate(() => document.querySelector("#ekCounts").textContent);
  const tNow = parseFloat(/t = ([\d.]+)/.exec(e1)[1]);
  assert.ok(tNow > 5, e1);
  await page.click('[data-act="noFox"]');
  await page.click('[data-act="drought"]');
  await page.waitForTimeout(400);
  const e2 = await page.evaluate(() => ({ counts: document.querySelector("#ekCounts").textContent, log: document.querySelector("#ekLog").textContent, dr: document.querySelector('[data-act="drought"]').getAttribute("aria-pressed") }));
  assert.ok(/Tilki 0/.test(e2.counts) && /tilki/i.test(e2.log) && /Kuraklık/.test(e2.log) && e2.dr === "true", JSON.stringify(e2));
  await page.click("#ekPlay");
  ok("ekosistem kavanozu: 10× hızda t = " + tNow.toFixed(1) + ", tilkiler çıkarıldı, kuraklık başladı, olay günlüğü yazıldı");

  // 4) Meslek haritası: matematikte güçlü örnek öğrenci
  const keys = await page.evaluate(async () => {
    const all = App.learnmap.allOutcomes(), math = all.filter((x) => x.subject.id === "matematik"), lit = all.filter((x) => x.subject.id === "edebiyat").slice(0, 8);
    let i = 0;
    for (const x of math) await App.db.put("quizzes", { id: "mq" + i++, key: x.key, label: "x", date: new Date().toISOString(), total: 10, correct: 9 });
    for (const x of lit) await App.db.put("quizzes", { id: "mq" + i++, key: x.key, label: "x", date: new Date().toISOString(), total: 10, correct: 3 });
    return { turev: (all.find((x) => /türev tanımı/i.test(x.outcome.title.tr)) || {}).key };
  });
  await go(page, "meslek");
  await page.waitForSelector(".mh-card");
  const top = await page.$$eval(".mh-card h3", (x) => x.map((e) => e.textContent));
  assert.ok(top.some((x) => /Matematikçi|Yapay Zekâ|Aktüer|Finans|Mali/.test(x)), top.join(" | "));
  assert.ok(await page.$$eval(".mh-all li", (x) => x.length) > 40);
  await page.click(".mh-card h3 a");
  await page.waitForSelector(".mh-route");
  await go(page, "meslek/k/" + keys.turev);
  await page.waitForSelector(".mh-use");
  assert.match(await page.textContent(".mh-uses"), /gradyan/);
  await go(page, "konular/" + keys.turev);
  await page.waitForSelector('a[href="#/meslek/k/' + keys.turev + '"]', { state: "attached", timeout: 15000 });
  ok("meslek haritası: ilk rotalar " + top.slice(0, 3).join(", ") + "; meslek ve kazanım sayfaları; konu sayfasında bağlantı");

  // 5) Disleksi dostu mod
  const before = await page.evaluate(() => document.querySelector(".lesson__body").textContent);
  await page.click("#a11yBtn");
  await page.waitForSelector("#a11yDysMode");
  await page.click("#a11yDysMode");
  await page.keyboard.press("Escape");
  await page.waitForFunction(() => document.querySelectorAll(".lesson__body .hc-w").length > 50);
  const dys = await page.evaluate(() => {
    const H = document.documentElement, body = document.querySelector(".lesson__body"), w = body.querySelectorAll(".hc-w");
    const a = getComputedStyle(body.querySelector(".hc-a")).color, b = getComputedStyle(body.querySelector(".hc-b")).color;
    const p = body.querySelector("p"), word = (p.textContent.match(/[A-Za-zÇĞİÖŞÜçğıöşü]{6,}/) || [""])[0];
    const r = App.a11y.wordRange(p, App.a11y.speakable(p), App.a11y.speakable(p).indexOf(word));
    return { attrs: ["data-a11y-dys", "data-a11y-spacing", "data-a11y-hece"].every((x) => H.hasAttribute(x)), ruler: !!document.querySelector(".a11y-ruler"), n: w.length, a, b, text: body.textContent,
      kx: !body.querySelector(".katex .hc-w"), word, range: r ? r.toString() : null, hl: typeof CSS !== "undefined" && !!CSS.highlights };
  });
  assert.ok(dys.attrs && dys.ruler && dys.a !== dys.b && dys.kx, JSON.stringify({ ...dys, text: undefined }));
  assert.equal(dys.text, before, "hece renklendirme metni değiştirmemeli");
  assert.equal(dys.range && dys.range.toLocaleLowerCase("tr"), dys.word.toLocaleLowerCase("tr"));
  await go(page, "konular"); await page.waitForTimeout(400);
  assert.ok(await page.evaluate(() => document.querySelectorAll("#view .hc-w").length > 0), "yeni sayfada da heceler renkli");
  await page.evaluate(() => { App.a11y.open(); });
  await page.click("#a11yDysMode");
  await page.keyboard.press("Escape");
  await page.waitForTimeout(200);
  assert.equal(await page.evaluate(() => document.querySelectorAll(".hc-w").length + (document.documentElement.hasAttribute("data-a11y-hece") ? 1 : 0)), 0);
  ok("disleksi dostu mod: tek dokunuşla yazı tipi, aralık, cetvel ve " + dys.n + " hece renklendirildi; metin aynı; okunan kelime aralığı \"" + dys.range + "\"; kapatınca temizlendi");

  // 6) Taşma ve sayfa hataları
  for (const width of [390, 1280]) {
    await page.setViewportSize({ width, height: 860 });
    for (const r of ["ph", "vatandas", "vatandas/harita", "vatandas/paylas", "ekosistem", "meslek", "meslek/m/yapayzeka", "meslek/k/" + keys.turev]) {
      await go(page, r); await page.waitForTimeout(450);
      const over = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
      assert.ok(over <= 1, r + " @" + width + ": " + over);
    }
  }
  ok("yeni sayfalar 390 px ve 1280 px'de yatay taşmıyor");
  assert.deepEqual(h.errors, []);
  ok("sayfa hatası yok");
} finally {
  await h.close();
}
console.log(checks + " v1.49 arayüz sınaması geçti.");
