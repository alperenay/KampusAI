// v1.44 arayüz sınaması (gerçek tarayıcı): sensör laboratuvarı (sahte ivmeölçer olaylarıyla sarkaç ölçümü),
// sesli grafikler, çözüm kontrolünde düzeltme turu, iki oyunculu düello (QR kodları metin olarak) ve Bilgi Evreni.
import assert from "node:assert/strict";
import { uiHarness } from "./ui-harness.mjs";
const h = await uiHarness();
let checks = 0;
const ok = (n) => { checks++; console.log("✓ " + n); };
const go = (page, r) => page.evaluate((x) => App.router.go(x), r);
try {
  const { page } = await h.device();
  await page.setViewportSize({ width: 1280, height: 900 });

  // 1) Sensör: L = 0,8 m sarkaç, 60 Hz sahte ivmeölçer → periyot ve bağıl hata
  await go(page, "sensor");
  await page.waitForSelector(".sl-card");
  assert.equal(await page.$$eval(".sl-card", (x) => x.length), 5);
  await go(page, "sensor/sarkac");
  await page.waitForSelector("#slGo");
  await page.evaluate(() => {
    App.sensorLab.EXP.sarkac.dur = 8;
    const Tth = 2 * Math.PI * Math.sqrt(0.8 / 9.81), t0 = performance.now();
    window.__fake = setInterval(() => {
      const t = (performance.now() - t0) / 1000;
      window.dispatchEvent(new DeviceMotionEvent("devicemotion", { accelerationIncludingGravity: { x: 1.4 * Math.cos((2 * Math.PI * t) / Tth) + 0.2 * (Math.random() - 0.5), y: 9.7, z: 0.3 } }));
    }, 16);
  });
  await page.click("#slGo");
  await page.waitForFunction(() => /Ölçülen periyot/.test(document.querySelector("#slRead").innerText), null, { timeout: 15000 });
  const sar = await page.evaluate(() => { clearInterval(window.__fake); return document.querySelector("#slRead").innerText; });
  const m = /Ölçülen periyot\s*([\d,]+)/.exec(sar), err = /Bağıl hata\s*%([\d,]+)/.exec(sar);
  assert.ok(m && Math.abs(parseFloat(m[1].replace(",", ".")) - 1.794) < 0.03, sar);
  assert.ok(err && parseFloat(err[1].replace(",", ".")) < 2, sar);
  ok("sensör laboratuvarı: sarkaç periyodu ölçüldü (" + m[1] + " s, hata %" + err[1] + "), kuramsal eğriyle karşılaştırıldı");

  // 2) Sesli grafik: parabol deneyinde eğri kaydı, oynatma ve klavye taraması
  await page.evaluate(() => App.prefs.set("a11ySonify", true));
  await go(page, "lab/parabol");
  await page.waitForSelector(".lab__son");
  await page.waitForFunction(() => (document.querySelector(".lab__cv").__curves || []).length > 0);
  const son = await page.evaluate(() => {
    const cv = document.querySelector(".lab__cv"), cs = cv.__curves.filter((x) => x.F && x.F.pw > 40);
    const dur = App.sonify.play(cs.slice(0, 1), { duration: 0.5 });
    return { n: cs.length, dur, tab: cv.tabIndex, desc: App.sonify.describe(cs.slice(0, 1)) };
  });
  assert.ok(son.n >= 1 && son.dur > 0 && son.tab === 0 && /dip noktası|tepe noktası/.test(son.desc), JSON.stringify(son));
  await page.focus(".lab__cv"); await page.keyboard.press("ArrowRight"); await page.keyboard.press("ArrowRight");
  await page.click('[data-son="say"]');
  ok("sesli grafik: eğri kaydedildi, çalındı, klavyeyle tarandı ve sözlü özet üretildi");

  // 3) Çözüm kontrolü: düzeltme turu
  await page.evaluate(async () => {
    await App.db.put("checks", { id: "chk_ui1", date: new Date().toISOString(), key: null, label: "", image: "data:image/gif;base64,R0lGODlhAQABAAAAACw=", verdict: "wrong", attempt: 1,
      result: { readable: true, question: "2(x-3)=4", steps: [{ text: "2x-3=4", status: "wrong", note: "dağılma" }, { text: "x=3,5", status: "carry", note: "" }], firstWrong: 1, errType: "islem", errWhy: "", hint: "Parantezdeki her terimi 2 ile çarptın mı?", fix: "", answer: "", finalOk: false } });
  });
  await go(page, "kontrol");
  await page.waitForSelector('[data-chk-open="chk_ui1"]');
  await page.click('[data-chk-open="chk_ui1"]');
  await page.click('[data-chk="retry"]');
  await page.waitForSelector(".chk-retry");
  assert.match(await page.$eval(".chk-retry", (e) => e.innerText), /2\. deneme/);
  ok("çözüm kontrolü: \"Düzelttim, yeniden kontrol et\" ile 2. deneme turu açıldı (ipucu korunarak)");

  // 4) Düello: kurucu ve misafir aynı cihazda iki kayıtla (QR yerine kod metni) — 5 soru × 5 sn
  const ids = await page.evaluate(async () => {
    const duel = { v: 1, t: "d", id: "duel_ui", ti: "UI düellosu", ks: ["9/matematik/t1/k1"], sec: 5, hn: "Ali", st: Date.now() + 2500,
      q: Array.from({ length: 5 }, (_, i) => ({ k: 0, q: "Soru " + (i + 1) + ": " + i + " + 1 = ?", o: [String(i), String(i + 1), String(i + 2)], a: 1, d: 1 })) };
    App.sinifModu.validate(duel);
    await App.db.put("meta", { id: "duel:duel_ui", kind: "duel", role: "guest", at: new Date().toISOString(), duel, name: "Ayşe" });
    return duel.id;
  });
  await go(page, "duello/oyna/" + ids);
  await page.waitForSelector("#duLeft");
  for (let i = 0; i < 5; i++) {
    await page.waitForFunction((n) => document.querySelector(".du-q__top") && document.querySelector(".du-q__top").innerText.startsWith(n + " /"), i + 1, { timeout: 9000 });
    if (i !== 3) await page.click('[data-o="1"]'); else await page.click('[data-o="0"]');
  }
  await page.waitForSelector("#duScanR", { timeout: 12000 });
  const myScore = await page.$eval(".sm-big", (e) => Number(e.textContent));
  assert.ok(myScore >= 400 && myScore <= 600, "puan " + myScore);
  const opCode = await page.evaluate(async () => (await App.sinifModu.pack({ v: 1, t: "dr", a: "duel_ui", s: "Ali", r: [1, 1, 0, 0, 1], ms: [4000, 4000, 4000, 4000, 4000] })).join("\n"));
  await page.click("#duScanR");
  await page.waitForSelector("#smPaste");
  await page.evaluate((code) => { document.querySelector(".sm-paste").open = true; document.querySelector("#smPaste").value = code; document.querySelector("#smPasteGo").click(); }, opCode);
  await page.waitForSelector(".du-board");
  const board = await page.$eval(".du-board", (e) => e.innerText);
  assert.match(board, /Kazandın/);
  const learn = await page.evaluate(async () => ({ q: (await App.db.getAll("quizzes")).some((q) => q.source === "duel"), m: (await App.db.getAll("mistakes")).some((m) => /Düello/.test(m.label || "")), won: (await App.db.get("meta", "duel:duel_ui")).won }));
  assert.ok(learn.q && learn.m && learn.won, JSON.stringify(learn));
  ok("düello: eş zamanlı 5 soru, hız bonuslu puan " + myScore + ", rakip sonucu okutuldu, kazanan ve rozet kaydı; yanlış soru tekrar listesine eklendi");

  // 5) Bilgi Evreni: 3B sahne, düğüm sayısı ve seçme
  await go(page, "evren/9/matematik");
  await page.waitForSelector(".ev-stage canvas", { timeout: 15000 });
  await page.waitForTimeout(800);
  const ev = await page.evaluate(() => ({ list: document.querySelectorAll(".ev-li").length }));
  assert.ok(ev.list >= 20, JSON.stringify(ev));
  await page.click(".ev-list summary");
  await page.click(".ev-li");
  await page.waitForSelector("#evInfo .ev-acts");
  ok("bilgi evreni: " + ev.list + " kazanım 3B sahnede; listeden seçince kazanım kartı açıldı");

  // 6) Yeni sayfalar telefonda taşmıyor
  for (const width of [390, 1280]) {
    await page.setViewportSize({ width, height: 860 });
    for (const r of ["sensor", "sensor/ses", "sensor/isik", "duello", "duello/yeni", "evren/10/fizik"]) {
      await go(page, r); await page.waitForTimeout(500);
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
console.log(checks + " v1.44 arayüz sınaması geçti.");
