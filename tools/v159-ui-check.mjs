// v1.59 smoke tests: real Chromium UI, no cloud/AI requests, private local portfolio.
import assert from "node:assert/strict";
import {uiHarness} from "./ui-harness.mjs";
const h=await uiHarness();
try {
  const {page}=await h.device();
  await page.setViewportSize({width:390,height:844});
  await page.waitForFunction(()=>!!App.smartHome&&!!App.visualThemes&&!!App.favorites);
  assert.equal(await page.locator("#sidebar #profileBtn").count(),1);
  assert.equal(await page.locator("#sidebar #settingsBtn, #sidebarSettingsTop").count(),0);
  await page.evaluate(()=>App.router.go("panel"));
  await page.waitForSelector(".v159-manage__item");
  assert.ok(await page.locator(".v159-manage__item").count()>=6);
  const before=await page.evaluate(()=>App.smartHome.order());
  await page.locator('[data-widget="konular"] [data-action="toggle"]').click();
  const after=await page.evaluate(()=>App.smartHome.order());
  assert.equal(after.includes("konular"),!before.includes("konular"));
  await page.evaluate(()=>App.router.go(""));
  await page.waitForSelector(".v159-home");
  assert.equal(await page.locator('.v159-home a[href="#/konular"]').count(),after.includes("konular")?1:0);

  await page.evaluate(()=>App.modules.settings.open());
  await page.click("#setVisualTheme");
  await page.click('[data-ui-choice="forest"]');
  assert.equal(await page.evaluate(()=>App.visualThemes.theme()),"forest");
  await page.locator(".modal-backdrop [data-close]").last().click();
  await page.reload();
  await page.waitForFunction(()=>!!App.visualThemes);
  assert.equal(await page.evaluate(()=>App.visualThemes.theme()),"forest");

  await page.evaluate(()=>App.router.go("portfolyo"));
  await page.waitForSelector("#portfolioForm",{timeout:10000});
  await page.fill("#pfTitle","Örnek fizik projesi");
  await page.fill("#pfText","Sarkaç deneyinin gözlemleri");
  await page.click('#portfolioForm button[type="submit"]');
  await page.waitForSelector(".v159-record");
  assert.match(await page.locator(".v159-record").first().innerText(),/Örnek fizik projesi/);
  assert.equal((await page.evaluate(()=>App.db.get("meta","student-portfolio-v1"))).entries.length,1);

  await page.evaluate(()=>App.router.go("belgeden"));
  await page.waitForSelector("#swDoc");
  await page.setInputFiles("#swDoc",{name:"sample.txt",mimeType:"text/plain",buffer:Buffer.from("Fotosentez bitkilerde güneş ışığı ve karbondioksit kullanarak glikoz üretme sürecidir. Yeşil bitkiler klorofil sayesinde ışığı soğurur.")});
  await page.click("#swRead");
  await page.waitForFunction(()=>document.querySelector("#swSource").value.includes("Fotosentez"));
  await page.evaluate(()=>{window.__origGenerate=App.ai.generate;App.ai.generate=async()=>({data:{title:"Fotosentez",summary:Array.from({length:3},()=>({text:"Deney özeti",refs:[1]})),concepts:Array.from({length:2},()=>({name:"Klorofil",explain:"Işık",refs:[1]})),cards:Array.from({length:3},()=>({front:"Nedir?",back:"Enerji dönüşümü",refs:[1]})),quiz:Array.from({length:3},()=>({q:"Fotosentez nedir?",options:["Enerji dönüşümü","Yanlış B","Yanlış C","Yanlış D"],answer:0,explain:"Kaynakta var",refs:[1]}))}});});
  await page.click("#swPack");
  await page.waitForSelector("#swGrade");
  assert.match(await page.locator("#swResult").innerText(),/Fotosentez nedir/);

  await page.evaluate(()=>{App.ai.generate=window.__origGenerate;});
  assert.equal(await page.evaluate(()=>typeof App.v159Studio.presentation),'undefined');
  assert.equal(await page.locator('a[href="#/sunum"]').count(),0);
  const over=await page.evaluate(()=>document.documentElement.scrollWidth-innerWidth);
  assert.ok(over<=2,"Mobile overflow: "+over);
  assert.deepEqual(h.errors,[]);
  console.log("v1.59 UI: profile, themes, dashboard, portfolio, documents and retired presentation removal passed");
} finally {await h.close();}
