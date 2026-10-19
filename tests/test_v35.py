exec(open("hdr.py").read())
SHOT = os.path.join(SP, "v35"); os.makedirs(SHOT, exist_ok=True)
try:
  with sync_playwright() as p:
    b = p.chromium.launch(args=["--use-gl=angle", "--use-angle=swiftshader", "--enable-unsafe-swiftshader", "--use-fake-ui-for-media-stream", "--use-fake-device-for-media-stream"])
    for mobile, w, h in ((True, 390, 844), (False, 1366, 860)):
      tag = "phone" if mobile else "pc"
      ctx, pg = newctx(b, mobile, w, h)
      pg.on("console", lambda m: print("STACK", m.text[:500]) if m.text.startswith("STK") or (m.type == "error" and "[3B]" in m.text) else None)
      pg.evaluate("() => window.addEventListener('error', e => console.log('STK ' + location.hash + ' ' + (e.error && e.error.stack)))")
      pg.evaluate("() => { const m = App.lab3d.mount; App.lab3d.mount = function () { const r = m.apply(this, arguments); window.__S3 = r; return r; }; }")
      ovf = lambda: pg.evaluate("() => document.documentElement.scrollWidth - document.documentElement.clientWidth")
      check(tag+": küre verisi başta yüklenmiyor", pg.evaluate("() => !App.data.globe"))
      go(pg, "#/kure", 600)
      pg.wait_for_selector("#kStage canvas", timeout=20000); pg.wait_for_timeout(800)
      check(tag+": küre ve veri", pg.evaluate("() => !!App.data.globe && App.data.globe.countries.length > 150"))
      # koordinat dönüşümü: vec ↔ uv tutarlı mı (Türkiye'ye ışın)
      r = pg.evaluate("""() => { const S = window.__S3._S, T3 = S.THREE, v = App.kure.vec(T3, 35, 39, 2).applyEuler(S.o.globe.rotation);
        const rc = new T3.Raycaster(v.clone().multiplyScalar(3), v.clone().negate().normalize()); const hit = rc.intersectObject(S.o.ball)[0];
        return hit ? [Math.round((hit.uv.x * 360 - 180) * 10) / 10, Math.round((hit.uv.y * 180 - 90) * 10) / 10] : null; }""")
      check(tag+": koordinat dönüşümü (35°D 39°K)", r and abs(r[0] - 35) < 0.6 and abs(r[1] - 39) < 0.6, r)
      cc = pg.evaluate("() => [App.kure.countryAt(32.85, 39.93) && App.kure.countryAt(32.85, 39.93).n, App.kure.countryAt(139.7, 35.7) && App.kure.countryAt(139.7, 35.7).n, App.kure.countryAt(-30, 0)]")
      check(tag+": nokta → ülke", cc[0] == "Türkiye" and cc[1] == "Japonya" and cc[2] is None, cc)
      check(tag+": güneş saati", pg.evaluate("() => App.kure.solarTime(30, 12)") == "14:00")
      # katmanlar
      for k in ("baskent", "iklim", "saat", "levha", "deprem", "volkan", "tarih", "gunes"):
        pg.check('[data-l="%s"]' % k); pg.wait_for_timeout(250)
      pg.wait_for_timeout(800)
      mk = pg.evaluate("() => { const t = {}; window.__S3._S.o.marks.children.forEach(m => { t[m.userData.tag] = (t[m.userData.tag] || 0) + (m.userData.count || 1); }); t.pl = window.__S3._S.o.plateN; t.calls = window.__S3._S.o.marks.children.length; return t; }")
      print("işaretler", mk)
      check(tag+": işaret katmanları", mk.get("cap", 0) > 150 and mk.get("eq") == 12 and mk.get("vol") == 12 and mk.get("pl", 0) >= 20 and mk.get("ev", 0) >= 1, mk)
      # güneş: 21 Haziran → dik ışın ~23,4 K
      pg.click('[data-doy="172"]'); pg.wait_for_function("() => { const i = window.__S3._S.o.sunInfo; return i && Math.abs(i.dec - (23.44)) < 1.2; }", timeout=30000)
      dec = pg.evaluate("() => window.__S3._S.o.sunInfo && window.__S3._S.o.sunInfo.dec")
      pg.click('[data-doy="355"]'); pg.wait_for_function("() => { const i = window.__S3._S.o.sunInfo; return i && Math.abs(i.dec - (-23.44)) < 1.2; }", timeout=30000)
      dec2 = pg.evaluate("() => window.__S3._S.o.sunInfo && window.__S3._S.o.sunInfo.dec")
      pg.click('[data-doy="80"]'); pg.wait_for_function("() => { const i = window.__S3._S.o.sunInfo; return i && Math.abs(i.dec - (0)) < 1.2; }", timeout=30000)
      dec3 = pg.evaluate("() => window.__S3._S.o.sunInfo && window.__S3._S.o.sunInfo.dec")
      check(tag+": mevsimler (dik ışın enlemi)", abs(dec - 23.44) < 0.5 and abs(dec2 + 23.44) < 0.5 and abs(dec3) < 1.2, (dec, dec2, dec3))
      check(tag+": güneş bilgisi", "dik geliyor" in pg.locator("#kSunInfo").inner_text())
      # ülke arama → kart
      pg.fill("#kQ", "Japonya"); pg.locator("#kQ").dispatch_event("change"); pg.wait_for_timeout(500)
      check(tag+": ülke arama kartı", "Japonya" in pg.locator("#kInfo").inner_text() and "Tokyo" in pg.locator("#kInfo").inner_text(), pg.locator("#kInfo").inner_text()[:120])
      try: pg.wait_for_function("() => !App.kure._P.focus", timeout=60000)
      except Exception: pass
      ja = pg.evaluate("""() => { const S = window.__S3._S, T3 = S.THREE; const v = App.kure.vec(T3, 138, 37, 2).applyEuler(S.o.globe.rotation); const c = S.camera.position.clone().normalize(); return Math.round(v.normalize().dot(c) * 100) / 100; }""")
      check(tag+": aranan ülke kameraya döner", ja > 0.9, ja)
      check(tag+": taşma yok", ovf() <= 0, ovf())
      pg.screenshot(path=os.path.join(SHOT, "globe-"+tag+".png"))
      # dokununca kart
      pg.evaluate("() => { const S = window.__S3._S; S.o.pick = { kind: 'geo', lon: 2.35, lat: 48.86 }; }")
      cv = pg.locator("#kStage canvas").bounding_box()
      pg.evaluate("() => { const S = window.__S3._S; const orig = S.renderer.domElement; }")
      # gerçek tık: merkez (okyanus/ülke olabilir) → kart dolmalı
      pg.mouse.click(cv["x"] + cv["width"] / 2, cv["y"] + cv["height"] / 2); pg.wait_for_timeout(400)
      check(tag+": küreye dokununca bilgi", "°" in pg.locator("#kInfo").inner_text(), pg.locator("#kInfo").inner_text()[:100])
      # hologram
      pg.click("#kHolo"); pg.wait_for_timeout(1800)
      check(tag+": küre hologramda", pg.evaluate("() => window.__S3.holoOn()"))
      pg.screenshot(path=os.path.join(SHOT, "globe-holo-"+tag+".png"))
      pg.keyboard.press("Escape"); pg.wait_for_timeout(400)
      check(tag+": hologramdan dönüş", pg.locator("#kSide [data-l]").count() == 10)
      # el: açık el küreyi döndürür
      ry = pg.evaluate("() => { const S3 = window.__S3, f = S3._handFeed, r0 = S3._S.root.rotation.y; const h = (x) => ({ bbox: [x - 40, 200, 80, 80], label: 'open', score: .9 }); let t = 5e5; f([h(200)], t += 50); f([h(260)], t += 50); f([h(330)], t += 50); return S3._S.root.rotation.y - r0; }")
      check(tag+": el ile çevirme", abs(ry) > 0.2, ry)
      go(pg, "#/konular/9/cografya", 800)
      ctx.close()
    print("hatalar:", errs[:5]); check("sayfa hatası yok", not errs, errs[:5])
    b.close()
finally:
  for pr in procs: pr.terminate()
print("SONUÇ", sum(res), "/", len(res))
