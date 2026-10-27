// v1.42 arayüz sınaması (gerçek tarayıcı): isteğe bağlı içerik yükleme, tekrar kuyruğu, Sınıf Modu ve
// A4 karne. Karne gerçek yazdırma ortamında PDF'e alınır ve tam olarak 1 A4 sayfa olduğu doğrulanır.
import fs from "node:fs";
import path from "node:path";
import assert from "node:assert/strict";
import { uiHarness } from "./ui-harness.mjs";
const h = await uiHarness();
let checks = 0;
const ok = (name) => { checks++; console.log("✓ " + name); };
try {
  const { page } = await h.device();
  const scripts = () => page.evaluate(() => [...document.scripts].map((s) => s.src.split("/").slice(-2).join("/")).filter((s) => /^content\/|holo|kavram-holo/.test(s)));

  // 1) Açılışta ders anlatımı ve hologram betikleri yüklenmez
  assert.deepEqual(await scripts(), []);
  const info = await page.evaluate(() => ({ pending: App.content.pending().length, flagged: App.learnmap.allOutcomes().filter((x) => x.outcome.curatedContent).length }));
  assert.ok(info.pending >= 39 && info.flagged > 600, JSON.stringify(info));
  ok("açılışta 0 içerik dosyası; " + info.pending + " ders isteğe bağlı, " + info.flagged + " kazanım iskeletten işaretli");

  // 2) Ders seçilince yalnızca o dersin dosyası gelir; konu sayfası anlatımı gösterir
  await page.evaluate(() => App.router.go("konular/9/matematik"));
  await page.waitForFunction(() => App.content.isLoaded("9", "matematik"));
  assert.deepEqual(await scripts(), ["content/mat-9.js"]);
  await page.evaluate(() => App.router.go("konular/9/matematik/t1/k1"));
  await page.waitForSelector(".lesson__body");
  ok("9. sınıf matematik açılınca yalnızca mat-9.js yüklendi ve anlatım göründü");

  // 3) Biyoloji konusu: model kartı için holo-modeller isteğe bağlı gelir
  await page.evaluate(() => App.router.go("konular/9/biyoloji"));
  await page.waitForFunction(() => App.content.isLoaded("9", "biyoloji"));
  const bioKey = await page.evaluate(() => App.learnmap.allOutcomes().find((x) => x.subject.id === "biyoloji" && x.grade.id === "9").key);
  await page.evaluate((k) => App.router.go("konular/" + k), bioKey);
  await page.waitForFunction(() => !!App.modeller);
  ok("biyoloji konusunda holo-modeller.js ilk kullanımda yüklendi");

  // 4) Tekrar kuyruğu: dört kaynaktan veri
  await page.evaluate(async () => {
    const now = Date.now(), D = 864e5, iso = (t) => new Date(t).toISOString(), k = "9/matematik/t1/k1";
    await App.db.put("mistakes", { id: "mis_ui1", key: k, label: "UI yanlış", q: "$2^3$ kaçtır?", options: ["6", "8"], answer: 1, chosen: 0, reviews: 0, mastered: false, nextAt: iso(now - D), createdAt: iso(now - 2 * D) });
    await App.db.put("quizzes", { id: "qz_ui1", key: "9/matematik/t1/k2", label: "UI", date: iso(now - 3 * D), total: 5, correct: 1 });
    await App.feedback.save({ ref: "quiz:ui", source: "quiz", rating: "wrong", key: k, q: "Hatalı soru", fix: "Doğrusu 8", at: iso(now - 2 * D) });
    await App.cards.addKey(k);
  });
  await page.evaluate(() => App.router.go("tekrar"));
  await page.waitForSelector(".rq-list");
  const types = await page.$$eval(".rq-item", (els) => els.map((e) => e.className.match(/rq-item--(\w+)/)[1]));
  assert.deepEqual(types.slice().sort(), ["card", "feedback", "mistake", "quiz"]);
  const prio = await page.evaluate(async () => (await App.reviewQueue.list()).map((x) => x.priority));
  assert.deepEqual(prio, prio.slice().sort((a, b) => b - a));
  await page.click('[data-rq^="mistake:"] [data-rq-open]');
  await page.click('[data-rq^="mistake:"] [data-rq-ok]');
  await page.waitForFunction(() => !document.querySelector('[data-rq^="mistake:"]'));
  assert.equal(await page.evaluate(async () => (await App.db.get("mistakes", "mis_ui1")).reviews), 1);
  ok("tekrar kuyruğu: dört kaynak tek listede, önceliğe göre sıralı; satır içi \"Bildim\" kaydedildi");

  // 5) Sınıf Modu: öğretmen paketi → öğrenci çözümü → öğretmen listesi
  const aid = await page.evaluate(async () => {
    const a = { v: 1, t: "a", id: "odv_ui", ti: "UI ödevi", at: new Date().toISOString(), m: 0, fb: true, ks: ["9/matematik/t1/k1"],
      q: [{ k: 0, q: "1+1?", o: ["1", "2"], a: 1, d: 1 }, { k: 0, q: "2+2?", o: ["4", "5"], a: 0, d: 2 }] };
    const frames = await App.sinifModu.pack(a);
    await App.db.put("meta", { id: "sm:a:" + a.id, kind: "sm-a", digest: App.sinifModu.frame(frames[0]).digest, data: a });
    await App.db.put("meta", { id: "sm:s:" + a.id, kind: "sm-s", at: a.at, digest: App.sinifModu.frame(frames[0]).digest, data: a });
    return a.id;
  });
  await page.evaluate((id) => App.router.go("sinif-modu/coz/" + id), aid);
  await page.waitForSelector(".sm-solve");
  await page.fill("#smSid", "7 Ali");
  await page.click('.sm-sq[data-i="0"] .sm-opt:nth-child(2)');
  await page.click('.sm-sq[data-i="1"] .sm-opt:nth-child(2)');
  await page.click("#smSubmit");
  await page.waitForSelector(".sm-codes__t", { state: "attached" });
  const resCode = await page.$eval(".sm-codes__t", (t) => t.value);
  await page.evaluate((id) => App.router.go("sinif-modu/odev/" + id), aid);
  await page.waitForSelector("#smScanR");
  await page.click("#smScanR");
  await page.waitForSelector("#smPaste");
  await page.evaluate((code) => { document.querySelector(".sm-paste").open = true; document.querySelector("#smPaste").value = code; document.querySelector("#smPasteGo").click(); }, resCode);
  await page.waitForSelector(".sm-table tbody tr");
  await page.evaluate(() => document.querySelectorAll(".modal-backdrop [data-close]").forEach((b) => b.click()));
  const row = await page.$eval(".sm-table tbody tr", (r) => r.innerText.replace(/\s+/g, " "));
  assert.match(row, /^7 Ali 50 50/);
  ok("Sınıf Modu: sonuç QR kodu öğretmen listesine işlendi (%50, puan öğretmenin kopyasından)");

  // 6) Yeni sayfalar telefonda yatay taşmaz
  for (const width of [390, 1440]) {
    await page.setViewportSize({ width, height: 900 });
    for (const r of ["tekrar", "sinif-modu", "sinif-modu/yeni", "sinif-modu/odev/" + aid, "karne"]) {
      await page.evaluate((x) => App.router.go(x), r);
      await page.waitForTimeout(600);
      const over = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
      assert.ok(over <= 1, r + " @" + width + " yatay taşma " + over + "px");
    }
  }
  ok("yeni sayfalar 390 px ve 1440 px'de yatay taşmıyor");

  // 7) Karne: yazdırma ortamında tek A4 sayfa
  await page.setViewportSize({ width: 1280, height: 900 });
  await page.evaluate(async () => {
    const now = Date.now(), D = 864e5, iso = (t) => new Date(t).toISOString();
    for (let d = 0; d < 7; d++) await App.db.put("sessions", { id: "ses_ui" + d, start: iso(now - d * D - 3e6), end: iso(now - d * D), minutes: 20 + d * 9 });
    const keys = App.learnmap.allOutcomes().slice(0, 8).map((x) => x.key);
    for (const [i, k] of keys.entries()) await App.db.put("quizzes", { id: "qz_uik" + i, key: k, label: "x", date: iso(now - (i % 6) * D), total: 6, correct: i % 7,
      questions: Array.from({ length: 6 }, (_, j) => ({ answer: 0, chosen: j < i % 7 ? 0 : 1, observation: { confidence: [100, 75, 50, 25][j % 4], elapsedMs: 50000 } })) });
    App.prefs.set("userName", "Uzun İsimli Öğrenci Adı Soyadı");
  });
  await page.evaluate(() => App.router.go("karne"));
  await page.waitForSelector("#kSheet .k-meta");
  await page.evaluate(() => document.documentElement.classList.add("print-karne"));
  await page.emulateMedia({ media: "print" });
  const fit = await page.$eval("#kSheet", (s) => ({ sh: s.scrollHeight, ch: s.clientHeight, w: s.getBoundingClientRect().width }));
  assert.ok(fit.sh <= fit.ch + 1, "karne taşıyor: " + JSON.stringify(fit));
  const pdf = await page.pdf({ preferCSSPageSize: true, printBackground: true });
  const pages = (pdf.toString("latin1").match(/\/Type\s*\/Page[^s]/g) || []).length;
  fs.writeFileSync(path.join(h.qa, "karne-a4.pdf"), pdf);
  const box = /\/MediaBox\s*\[\s*0\s+0\s+([\d.]+)\s+([\d.]+)\s*\]/.exec(pdf.toString("latin1"));
  assert.equal(pages, 1, "karne " + pages + " sayfa");
  assert.ok(box && Math.abs(Number(box[1]) - 595.92) < 2 && Math.abs(Number(box[2]) - 842.88) < 2, "A4 değil: " + (box && box[0]));
  // Siyah-beyaz: gri tonlamada da çubuk serileri ayrışır (biri dolu, biri taralı desen)
  await page.emulateMedia({ media: "screen" });
  await page.evaluate(() => document.documentElement.classList.remove("print-karne"));
  await page.addStyleTag({ content: "#kSheet{filter:grayscale(1)}" });
  await page.locator("#kSheet").screenshot({ path: path.join(h.qa, "karne-bw.png") });
  const fills = await page.$$eval(".k-bar-b", (els) => els.map((e) => getComputedStyle(e).fill));
  assert.ok(fills.length && fills.every((f) => /url\(/.test(f)), "test çubukları desenli olmalı");
  ok("karne yazdırma ortamında tam 1 A4 sayfa (dist/qa/karne-a4.pdf), siyah-beyazda desenle ayrışıyor");

  assert.deepEqual(h.errors, []);
  ok("sayfa hatası yok");
} finally {
  await h.close();
}
console.log(checks + " v1.42 arayüz sınaması geçti.");
