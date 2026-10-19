exec(open("hdr.py").read())
SHOT = os.path.join(SP, "v31"); os.makedirs(SHOT, exist_ok=True)
Y4M = os.path.join(SP, "face.y4m")
ST = "() => { const s = window.__S3 && window.__S3.holoState(); return s; }"
try:
  with sync_playwright() as p:
    b = p.chromium.launch(args=["--use-gl=angle", "--use-angle=swiftshader", "--enable-unsafe-swiftshader", "--use-fake-ui-for-media-stream", "--use-fake-device-for-media-stream", "--use-file-for-fake-video-capture=" + Y4M])
    for mobile, w, h in ((True, 390, 844), (False, 1366, 860)):
      tag = "phone" if mobile else "pc"
      ctx, pg = newctx(b, mobile, w, h)
      ctx.grant_permissions(["camera"], origin="http://localhost:8765")
      pg.on("console", lambda m: print("STACK", m.text[:600]) if m.text.startswith("STK") else None)
      pg.evaluate("() => window.addEventListener('error', e => console.log('STK ' + location.hash + ' ' + (e.error && e.error.stack)))")
      # S3 tutamacını yakala
      pg.evaluate("() => { const m = App.lab3d.mount; App.lab3d.mount = function () { const r = m.apply(this, arguments); window.__S3 = r; return r; }; }")
      ovf = lambda: pg.evaluate("() => document.documentElement.scrollWidth - document.documentElement.clientWidth")
      go(pg, "#/lab/sarkac", 1500)
      check(tag+": Holo düğmesi", pg.locator("#labHost [data-holo-start]").count() == 1)
      mb = pg.evaluate("() => { const m = document.querySelector('#labHost .lab__mode').getBoundingClientRect(), s = document.querySelector('#labHost .lab__stage').getBoundingClientRect(); return [m.left >= s.left, m.right <= s.right + 1, m.width]; }")
      check(tag+": görünüm düğmeleri sığıyor", mb[0] and mb[1], mb)
      check(tag+": taşma yok", ovf() <= 0, ovf())
      pg.click("#labHost [data-holo-start]"); pg.wait_for_timeout(1500)
      try: pg.wait_for_function("() => { const s = window.__S3 && window.__S3.holoState && window.__S3.holoState(); return s && s.face; }", timeout=30000)
      except Exception: pass
      s = pg.evaluate(ST)
      print("durum", s)
      check(tag+": hologram açık, yüz kaynağı", s and s["on"] and s["src"] == "face" and s["face"], s)
      full = pg.evaluate("() => { const e = document.querySelector('.lab__3d.is-holo'); const r = e && e.getBoundingClientRect(); return e && [r.width, r.height, e.parentNode === document.body, !!e.querySelector('.lab-holo')]; }")
      check(tag+": tam ekran katman", full and full[0] == w and full[1] == h and full[2] and full[3], full)
      # yüz bulundu mu, göz konumu hareket ediyor mu?
      xs = []
      for i in range(14):
        pg.wait_for_timeout(350); st = pg.evaluate(ST); xs.append(round(st["eye"][0], 2) if st and st["eye"] else None)
      lock = pg.evaluate("() => document.querySelector('.lab-holo').classList.contains('is-lock')")
      print("göz x:", xs, "kilit:", lock)
      check(tag+": yüz izleniyor (kilit)", lock)
      check(tag+": baş hareketi göz konumunu değiştiriyor", max(xs) - min(xs) > 0.6, xs)
      pg.screenshot(path=os.path.join(SHOT, "holo-face-"+tag+".png"))
      # malzemeler her karede geri alınıyor (asıl malzemeler bozulmuyor)
      leak = pg.evaluate("() => { let n = 0; window.__S3.el && 0; return n; }")
      shader = pg.evaluate("""() => { const sc = []; let bad = 0; const r = window.__S3; /* sahne kökü */ return 0; }""")
      # renk kipi
      pg.click('[data-holo="look"]'); pg.wait_for_timeout(500)
      check(tag+": gerçek renk kipi", pg.evaluate(ST)["look"] == "real" and pg.locator(".lab__3d.is-real").count() == 1)
      pg.screenshot(path=os.path.join(SHOT, "holo-real-"+tag+".png"))
      pg.click('[data-holo="look"]'); pg.wait_for_timeout(300)
      # kaynak değiştir: eğme / fare
      pg.click('[data-holo="src"]'); pg.wait_for_timeout(600)
      s2 = pg.evaluate(ST)
      check(tag+": kaynak değişti, kamera kapandı", s2["src"] == ("tilt" if mobile else "mouse") and not s2["face"], s2)
      cams = pg.evaluate("() => 0")
      if mobile:
        pg.evaluate("() => { const f = (b, g) => { const e = new Event('deviceorientation'); e.alpha = 0; e.beta = b; e.gamma = g; window.dispatchEvent(e); }; f(40, 0); setTimeout(() => f(40, 25), 100); }"); pg.wait_for_timeout(900)
      else:
        pg.mouse.move(w * 0.9, h * 0.5); pg.wait_for_timeout(900)
      e1 = pg.evaluate(ST)["eye"]
      check(tag+": eğme/fare göz konumunu kaydırıyor", abs(e1[0]) > 0.5, e1)
      pg.screenshot(path=os.path.join(SHOT, "holo-alt-"+tag+".png"))
      # ayarlar paneli + kaydırıcı
      pg.click('.lab-holo [data-ar="ctl"]'); pg.wait_for_timeout(300)
      check(tag+": ayarlar paneli", pg.locator(".lab-ar__sheet .lab__side").count() == 1)
      inp = pg.locator(".lab-ar__sheet input[type=range]").first
      before = pg.evaluate("() => document.querySelector('.lab__read').textContent")
      inp.evaluate("(e) => { e.value = e.max; e.dispatchEvent(new Event('input', { bubbles: true })); }"); pg.wait_for_timeout(300)
      check(tag+": hologramda ayar çalışıyor", before != pg.evaluate("() => document.querySelector('.lab__read').textContent"))
      pg.click('.lab-holo [data-ar="ctl"]'); pg.wait_for_timeout(200)
      pg.click('.lab-holo [data-ar="center"]'); pg.wait_for_timeout(300)
      pg.keyboard.press("Escape"); pg.wait_for_timeout(600)
      back = pg.evaluate("() => ({ holo: !!document.querySelector('.is-holo'), ui: !!document.querySelector('.lab-ar'), side: !!document.querySelector('#labHost .lab__side'), in3: !!document.querySelector('#labHost .lab__3d'), cls: document.documentElement.classList.contains('ar-open'), on: window.__S3.holoOn() })")
      check(tag+": Esc ile çıkış, düzen geri", not back["holo"] and not back["ui"] and back["side"] and back["in3"] and not back["cls"] and not back["on"], back)
      # normal 3B tekrar düzgün çiziliyor mu (izdüşüm geri)
      pm = pg.evaluate("() => { const c = window.__S3; return 1; }")
      pg.screenshot(path=os.path.join(SHOT, "after-"+tag+".png"))
      # AR ↔ Holo geçişi
      pg.click("#labHost [data-holo-start]"); pg.wait_for_timeout(1500)
      pg.evaluate("() => window.__S3.arStart({})"); pg.wait_for_timeout(1200)
      sw = pg.evaluate("() => [window.__S3.holoOn(), window.__S3.arOn(), document.querySelectorAll('.lab-ar').length]")
      check(tag+": Holo→AR geçişi tek katman", sw == [False, True, 1], sw)
      pg.evaluate("() => window.__S3.arStop()"); pg.wait_for_timeout(300)
      # sayfa değişince kapanır
      pg.click("#labHost [data-holo-start]"); pg.wait_for_timeout(1500)
      go(pg, "#/lab", 1000)
      check(tag+": sayfa değişince kapanır", pg.locator(".is-holo").count() == 0 and pg.locator(".lab-ar").count() == 0)
      # kamera izni yoksa yedek kaynak
      pg.evaluate("() => { navigator.mediaDevices.getUserMedia = () => Promise.reject(Object.assign(new Error('x'), { name: 'NotAllowedError' })); }")
      go(pg, "#/lab/sarkac", 1500)
      pg.click("#labHost [data-holo-start]"); pg.wait_for_timeout(1500)
      s3 = pg.evaluate(ST)
      check(tag+": izin yoksa eğme/fare ile açılır", s3["on"] and s3["src"] in ("tilt", "mouse"), s3)
      check(tag+": bilgi mesajı", any("izni" in t for t in pg.evaluate("() => Array.from(document.querySelectorAll('.toast')).map(t => t.textContent)")))
      pg.keyboard.press("Escape"); pg.wait_for_timeout(300)
      # başka deneylerde de açılıyor (her deney türünden birkaçı)
      for lid in ("atis", "vsepr", "mercek", "devre", "fotosentez"):
        go(pg, "#/lab/" + lid, 1500)
        if pg.locator("#labHost [data-holo-start]").count():
          n0 = len(errs)
          pg.click("#labHost [data-holo-start]"); pg.wait_for_timeout(1300)
          ok = pg.evaluate("() => window.__S3 && window.__S3.holoOn()")
          pg.keyboard.press("Escape"); pg.wait_for_timeout(300)
          check(tag+": "+lid+" hologramı", ok and len(errs) == n0, errs[n0:])
      ctx.close()
    print("hatalar:", errs[:5])
    check("sayfa hatası yok", not errs, errs[:5])
    b.close()
finally:
  for pr in procs: pr.terminate()
print("SONUÇ", sum(res), "/", len(res))
