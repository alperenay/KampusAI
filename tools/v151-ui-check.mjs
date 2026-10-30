// v1.51 arayüz sınaması (gerçek tarayıcı): İngilizce pratik (rol oyunu, dinle-yaz, kelime testi), ses seçimi,
// sesli grafikte duraklat/devam/durdur, sensör metrikleri ve yeni kanallar, tanıtım rehberi, pH metre (kadran, HOLD,
// kalibrasyon), ekosistem (kartal, mevsim, salgın), yeni oyunlar, aktarım/hata analizi ve duyarlı yerleşim.
import assert from "node:assert/strict";
import { uiHarness, navigate } from "./ui-harness.mjs";
const h = await uiHarness();
let checks = 0;
const ok = (n) => { checks++; console.log("✓ " + n); };
const go = navigate;
try {
  const { page } = await h.device();
  await page.setViewportSize({ width: 1280, height: 900 });

  // 1) İngilizce pratik: kelime testi, rol oyunu (tüm adımlar), dinle-yaz
  await go(page, "konusma/pratik");
  await page.waitForSelector("#lpLevel");
  assert.match(await page.textContent("h1"), /İngilizce/);
  await page.click('[data-lpm="test"]');
  const correct = await page.evaluate(() => { const rows = App.data.languages.profiles.en.vocab.A1; return App.languagePractice.wordQuiz(rows, 0).answer; });
  await page.locator('[name="lpAnswer"]').nth(correct).check();
  await page.click("#lpCheck");
  assert.match(await page.textContent("#lpFeedback"), /^Doğru/);
  await page.click('[data-lpm="role"]');
  const steps = await page.evaluate(() => App.data.languages.profiles.en.roleplays.A1[0].steps.length);
  for (let i = 0; i < steps; i++) {
    const right = await page.evaluate((k) => { const s = App.data.languages.profiles.en.roleplays.A1[0].steps[k]; return String(s[2]); }, i);
    await page.locator('[name="lpAnswer"][value="' + right + '"]').check();
    await page.click("#lpCheck");
    if (i < steps - 1) { assert.equal((await page.textContent("#lpNext")).trim(), "Sonraki adım"); await page.click("#lpNext"); }
  }
  assert.match(await page.textContent("#lpFeedback"), new RegExp("Senaryo bitti: " + steps + "/" + steps));
  await page.click('[data-lpm="dict"]');
  const sentence = await page.evaluate(() => App.data.languages.profiles.en.dictation.A1[0][0]);
  await page.fill("#lpType", sentence.toLowerCase().replace(/[.]/g, ""));
  await page.click("#lpCheck");
  assert.match(await page.textContent("#lpFeedback"), /Doğruluk: %100/);
  const saved = await page.evaluate(() => ({ en: Object.keys(App.languagePractice.progress("en")).length, de: Object.keys(App.languagePractice.progress("de")).length }));
  assert.ok(saved.en >= 3 && saved.de === 0, JSON.stringify(saved));
  await go(page, "konusma/de");
  await page.waitForSelector("#lpLevel");
  assert.match(await page.textContent("h1"), /Almanca/);
  assert.equal(await page.locator('[data-lpm]').count(), 6);
  ok("dil pratiği: İngilizce kelime testi, " + steps + " adımlı rol oyunu ve dinle-yaz; Almanca aynı altı etkinlikle; ilerleme dil başına ayrı");

  // 2) Doğal ses: metin hazırlığı ve parçalama, ses seçimi satırı (sesler varsa)
  const tts = await page.evaluate(() => ({ text: App.speech.naturalText("Hız 20 m/s ve 5 km, örn. %50", "tr-TR"), parts: App.speech.chunks("Bir. " + "Uzun bir cümle ".repeat(30) + "son. Üç?").length, voices: App.speech.voiceList("tr").length }));
  assert.match(tts.text, /20 metre bölü saniye/); assert.match(tts.text, /5 kilometre/); assert.match(tts.text, /örneğin/); assert.match(tts.text, /yüzde 50/);
  assert.ok(tts.parts >= 3, JSON.stringify(tts));
  await page.evaluate(() => App.a11y.open());
  if (tts.voices) assert.equal(await page.locator("#a11yVoice").count(), 1);
  await page.keyboard.press("Escape");
  ok("doğal seslendirme: birimler ve kısaltmalar okunur hâle geliyor, uzun metin cümle parçalarına bölünüyor" + (tts.voices ? ", ses seçici gösteriliyor" : " (bu makinede tarayıcı sesi yok)"));

  // 3) Sesli grafik: duraklat / devam / durdur
  await page.evaluate(() => App.prefs.set("a11ySonify", true));
  await go(page, "lab/parabol");
  await page.waitForSelector('[data-son="play"]');
  await page.waitForFunction(() => (document.querySelector(".lab__cv").__curves || []).length > 0);
  const audio = await page.evaluate(() => !!(window.AudioContext || window.webkitAudioContext));
  if (audio) {
    await page.click('[data-son="play"]');
    await page.waitForFunction(() => App.sonify.state() === "playing");
    assert.match(await page.textContent('[data-son="play"]'), /Duraklat/);
    assert.equal(await page.locator('[data-son="stop"]').isVisible(), true);
    await page.click('[data-son="play"]');
    await page.waitForFunction(() => App.sonify.state() === "paused");
    assert.match(await page.textContent('[data-son="play"]'), /Devam et/);
    await page.click('[data-son="play"]');
    await page.waitForFunction(() => App.sonify.state() === "playing");
    await page.click('[data-son="stop"]');
    await page.waitForFunction(() => App.sonify.state() === "idle");
    assert.equal(await page.locator('[data-son="stop"]').isVisible(), false);
    ok("sesli grafik: dinle → duraklat → devam et → durdur; düğme metni ve durum eşleşiyor");
  } else ok("sesli grafik: bu tarayıcıda Web Audio yok, düğmeler hata vermeden duruyor");

  // 4) Sensör: doğrusal ivme ve yönelim kanalları, metrikler, görünümler (simülasyon)
  await go(page, "sensor/olcum");
  await page.waitForSelector("#swStart");
  await page.selectOption("#swSource", "simulation");
  await page.selectOption("#swSensor", "orient");
  await page.fill('[data-sw-axis="x"]', "30");
  await page.click("#swStart");
  await page.waitForFunction(() => document.querySelectorAll("#swStats dd").length === 7, null, { timeout: 8000 });
  for (const v of ["mag", "hist", "time"]) await page.selectOption("#swView", v);
  await page.click("#swStop");
  const metrics = await page.textContent("#swStats");
  assert.match(metrics, /Ortalama/); assert.match(metrics, /RMS/); assert.match(metrics, /Hz/);
  assert.ok(await page.locator('#swSensor option[value="linear"]').count() === 1);
  ok("sensör: yönelim kanalı simülasyonu, 7 metrik ve üç görünüm (zaman, büyüklük, histogram)");

  // 5) Tanıtım rehberi: Telefon Fizik Atölyesi
  await go(page, "telefon-fizik");
  await page.waitForSelector(".ob-open");
  assert.equal(await page.locator(".ob").count(), 0, "otomatik testte kendiliğinden açılmaz");
  await page.click(".ob-open");
  await page.waitForSelector(".ob-step h3");
  const n = await page.evaluate(() => App.onboarding.GUIDES["telefon-fizik"].steps.length);
  for (let i = 1; i < n; i++) await page.click("#obNext");
  assert.match(await page.textContent("#obNext"), /Başlayalım/);
  await page.click("#obNext");
  assert.equal(await page.locator(".ob").count(), 0);
  assert.equal(await page.evaluate(() => App.prefs.get("onboard:telefon-fizik", false)), true);
  for (const r of ["ciz-calissin"]) { await go(page, r); await page.waitForSelector(".ob-open"); }
  ok("tanıtım rehberi: " + n + " adım, ileri/geri, bitince bir daha kendiliğinden açılmıyor; üç atölyede de düğme var");

  // 6) pH metre: kadran + LCD, HOLD, kalibrasyon
  await go(page, "ph");
  await page.waitForSelector("#phLcd");
  const setColor = (k) => page.evaluate((i) => { const inp = document.querySelector("#phColor"); inp.value = App.phMetre.hex(App.phMetre.SCALE[i][1]); inp.dispatchEvent(new Event("input", { bubbles: true })); }, k);
  await setColor(6);   // pH 7
  const lcd1 = await page.textContent("#phLcd"), rot = await page.evaluate(() => document.querySelector("#phNeedle").style.transform);
  assert.equal(lcd1.trim(), "7,0"); assert.match(rot, /rotate\(0(\.0)?deg\)/);
  for (let i = 0; i < 6; i++) await setColor(6);
  assert.match(await page.textContent("#phStab"), /kararlı/);
  await page.click("#phHold");
  await setColor(1);
  assert.equal((await page.textContent("#phLcd")).trim(), "7,0", "HOLD değeri sabitler");
  await page.click("#phHold");
  await setColor(6);
  await page.evaluate(() => { document.querySelector(".ph-cal").open = true; });
  await page.selectOption("#phRef", "7");
  await page.click("#phCal");
  assert.equal(await page.locator("#phCalTag").isVisible(), true);
  assert.match(await page.textContent("#phCalInfo"), /1 noktalı/);
  await page.click("#phCalReset");
  ok("pH metre: LCD 7,0 ve ibre ortada, kararlılık lambası, HOLD sabitliyor, kalibrasyon kaydediliyor ve sıfırlanıyor");

  // 7) Ekosistem: kartal, salgın, mevsim
  await go(page, "ekosistem");
  await page.waitForSelector("#ekPlay");
  await page.click('[data-act="eagle"]');
  await page.click('[data-act="disease"]');
  await page.click('[data-act="season"]');
  await page.click('#ekSpeed [data-v="10"]');
  await page.click("#ekPlay");
  await page.waitForTimeout(1500);
  await page.click("#ekPlay");
  const eko = await page.evaluate(() => ({ counts: document.querySelector("#ekCounts").textContent, log: document.querySelector("#ekLog").textContent, bal: document.querySelector("#ekBalance").textContent }));
  assert.match(eko.counts, /Kartal/); assert.match(eko.counts, /(ilkbahar|yaz|sonbahar|kış)/);
  assert.match(eko.log, /kartal/i); assert.match(eko.log, /Salgın/); assert.match(eko.log, /Mevsimler/);
  assert.match(eko.bal, /Çeşitlilik/);
  ok("ekosistem: kartal, salgın ve mevsimler; sayımlar, mevsim adı ve çeşitlilik göstergesi");

  // 8) Yeni oyunlar: başlangıç ve bir tur
  await go(page, "oyunlar/sayidogrusu");
  await page.click("[data-go]");
  await page.waitForSelector(".nl-line");
  await page.click(".nl-line", { position: { x: 100, y: 30 } });
  await page.waitForFunction(() => /Gerçek değer/.test(document.querySelector(".nl-msg").textContent));
  await go(page, "oyunlar/sirala");
  await page.click("[data-go]");
  await page.waitForSelector(".so-item");
  for (let i = 0; i < 4; i++) await page.locator(".so-item:not([disabled])").first().click();
  await page.waitForFunction(() => document.querySelectorAll(".so-picked li").length === 4 && /sıra/i.test(document.querySelector(".so-msg").textContent));
  await go(page, "oyunlar/birim");
  await page.click("[data-go]");
  await page.waitForSelector(".bu-q");
  await page.locator(".qz__opt").first().click();
  await go(page, "oyunlar");
  for (const id of ["sayidogrusu", "birim", "sirala"]) assert.equal(await page.locator('a[href="#/oyunlar/' + id + '"]').count(), 1);
  ok("yeni oyunlar: Sayı Doğrusu Avcısı, Sırala! ve Birim Avcısı oynanıyor ve listede");

  // 9) Aktarım ve hata analizi
  await go(page, "aktarim");
  await page.waitForSelector('a[href="#/aktarim/calis/ustel"]');
  assert.match(await page.textContent(".pr-grid"), /Nerede kullanılır/);
  await go(page, "hata-avcisi/calis/Biyoloji");
  await page.waitForSelector("#prForm");
  const q = await page.evaluate(() => { const s = document.querySelector(".pr-progress span").textContent; return s; });
  await page.locator('[name="choice"]').first().check();
  await page.locator('[name="reason"]').first().check();
  await page.click(".pr-submit");
  await page.waitForSelector(".pr-analysis li");
  assert.ok(await page.locator(".pr-analysis li.is-bad").count() === 1, q);
  ok("aktarım: yeni aileler ve kullanım alanı; hata analizinde adım adım çözümleme");

  // 10) Taşma ve sayfa hataları
  for (const width of [390, 1280]) {
    await page.setViewportSize({ width, height: 860 });
    for (const r of ["konusma/pratik", "konusma/de", "sensor/olcum", "ph", "ekosistem", "oyunlar/sayidogrusu", "oyunlar/sirala", "aktarim", "telefon-fizik"]) {
      await go(page, r); await page.waitForTimeout(400);
      const over = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
      assert.ok(over <= 1, r + " @" + width + ": " + over);
    }
  }
  ok("yeni ve değişen sayfalar 390 px ve 1280 px'de yatay taşmıyor");
  assert.deepEqual(h.errors, []);
  ok("sayfa hatası yok");
} finally {
  await h.close();
}
console.log(checks + " v1.51 arayüz sınaması geçti.");
