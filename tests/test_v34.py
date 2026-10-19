exec(open("hdr.py").read())
SHOT = os.path.join(SP, "v34"); os.makedirs(SHOT, exist_ok=True)
Y4M = os.path.join(SP, "hands.y4m")
CAP = "() => { const m = App.lab3d.mount; App.lab3d.mount = function () { const r = m.apply(this, arguments); window.__S3 = r; return r; }; }"
H = "(x, y, label, s) => ({ bbox: [x - 40 * (s || 1), y - 40 * (s || 1), 80 * (s || 1), 80 * (s || 1)], label, score: 0.9 })"
try:
  with sync_playwright() as p:
    b = p.chromium.launch(args=["--use-gl=angle", "--use-angle=swiftshader", "--enable-unsafe-swiftshader", "--use-fake-ui-for-media-stream", "--use-fake-device-for-media-stream", "--use-file-for-fake-video-capture=" + Y4M])
    for mobile, w, h in ((True, 390, 844), (False, 1366, 860)):
      tag = "phone" if mobile else "pc"
      ctx, pg = newctx(b, mobile, w, h)
      ctx.grant_permissions(["camera"], origin="http://localhost:8765")
      pg.on("console", lambda m: print("STACK", m.text[:700]) if m.text.startswith("STK") or (m.type == "error" and "[3B]" in m.text) else None)
      pg.evaluate("() => window.addEventListener('error', e => console.log('STK ' + location.hash + ' ' + (e.error && e.error.stack)))")
      pg.evaluate(CAP)
      ovf = lambda: pg.evaluate("() => document.documentElement.scrollWidth - document.documentElement.clientWidth")
      # ---------- kütüphane ----------
      go(pg, "#/modeller", 1000)
      check(tag+": model kütüphanesi", pg.locator(".hm-card").count() == 10 and pg.locator(".hm-mol").count() == 1)
      check(tag+": taşma yok (kütüphane)", ovf() <= 0, ovf())
      pg.screenshot(path=os.path.join(SHOT, "lib-"+tag+".png"), full_page=True)
      # ---------- her model ----------
      ids = pg.evaluate("() => App.modeller.MODELS.map(m => m.id)")
      for mid in ids:
        n0 = len(errs)
        go(pg, "#/modeller/" + mid, 400)
        try: pg.wait_for_selector("#hmStage canvas", timeout=15000)
        except Exception: pass
        pg.wait_for_timeout(500)
        ok = pg.evaluate("() => !!document.querySelector('#hmStage canvas') && document.querySelectorAll('.hm-part').length > 0")
        pg.evaluate("() => { const r = document.querySelector('#hmEx'); r.value = 100; r.dispatchEvent(new Event('input')); }"); pg.wait_for_timeout(400)
        pg.locator(".hm-part").first.click(); pg.wait_for_timeout(300)
        inf = pg.locator("#hmInfo b").count() == 1
        check(tag+": model "+mid, ok and inf and len(errs) == n0, (ok, inf, errs[n0:][:1]))
        if mid in ("hucre", "dna", "kalp", "gunes"): pg.screenshot(path=os.path.join(SHOT, "m-"+mid+"-"+tag+".png"))
      check(tag+": taşma yok (model)", ovf() <= 0, ovf())
      # parçalar gerçekten ayrılıyor mu
      go(pg, "#/modeller/hucre", 400); pg.wait_for_selector("#hmStage canvas", timeout=15000); pg.wait_for_timeout(400)
      d = pg.evaluate("""async () => { const o = window.__S3._S.o; const g = o.parts.cekirdek[0]; const p0 = g.position.clone();
        const r = document.querySelector('#hmEx'); r.value = 100; r.dispatchEvent(new Event('input')); await new Promise(x => setTimeout(x, 300)); return g.position.distanceTo(p0); }""")
      check(tag+": parçalarına ayırma", d > 1, d)
      # 3B'de dokununca parça seçimi
      pg.evaluate("() => { const r = document.querySelector('#hmEx'); r.value = 0; r.dispatchEvent(new Event('input')); }"); pg.wait_for_timeout(300)
      cv = pg.locator("#hmStage canvas").bounding_box()
      pg.mouse.click(cv["x"] + cv["width"] / 2, cv["y"] + cv["height"] / 2); pg.wait_for_timeout(300)
      check(tag+": 3B'de dokunarak parça seçimi", pg.locator("#hmInfo b").count() == 1, pg.locator("#hmInfo").inner_text()[:60])
      # el: iki el = parçalarına ayır; işaret = imleç + bekleyince düğmeye basar
      ex = pg.evaluate("""(H) => { const f = window.__S3._handFeed, h = eval(H); let t = 1e5; const r0 = Number(document.querySelector('#hmEx').value);
        f([h(250, 240, 'open'), h(390, 240, 'open')], t += 50); f([h(150, 240, 'open'), h(490, 240, 'open')], t += 50); return [r0, Number(document.querySelector('#hmEx').value)]; }""", H)
      check(tag+": iki el parçalarına ayırır", ex[1] > ex[0], ex)
      # ---------- hologram + panel ----------
      pg.click("#hmHolo"); pg.wait_for_timeout(2000)
      hs = pg.evaluate("() => [window.__S3.holoOn(), !!document.querySelector('.lab-holo')]")
      check(tag+": model hologramda", hs == [True, True], hs)
      pg.click('.lab-holo [data-ar="ctl"]'); pg.wait_for_timeout(300)
      check(tag+": hologramda parça paneli", pg.locator(".lab-ar__sheet .hm-part").count() > 3)
      pg.screenshot(path=os.path.join(SHOT, "holo-model-"+tag+".png"))
      pg.keyboard.press("Escape"); pg.wait_for_timeout(400)
      check(tag+": panel geri döndü", pg.locator("#hmSide .hm-part").count() > 3 and pg.locator(".lab-holo").count() == 0)
      # ---------- molekül kurma (fare / dokunma) ----------
      go(pg, "#/modeller/molekul", 400); pg.wait_for_selector("#hmStage canvas", timeout=15000); pg.wait_for_timeout(600)
      check(tag+": molekül sayfası", pg.locator(".hm-molbtn").count() == 10 and "H₂O" in pg.locator("#hmMsg").inner_text(), pg.locator("#hmMsg").inner_text())
      def proj(i):
        return pg.evaluate("""(i) => { const S = window.__S3._S, a = S.o.atoms[i], v = new S.THREE.Vector3(); a.m.getWorldPosition(v); v.project(S.camera); const r = S.renderer.domElement.getBoundingClientRect(); return [r.left + (v.x + 1) / 2 * r.width, r.top + (1 - v.y) / 2 * r.height]; }""", i)
      def drag(i, j):
        a = proj(i); b2 = proj(j)
        pg.mouse.move(a[0], a[1]); pg.mouse.down(); pg.mouse.move((a[0]+b2[0])/2, (a[1]+b2[1])/2, steps=4); pg.mouse.move(b2[0] + 18, b2[1], steps=4); pg.mouse.up(); pg.wait_for_timeout(250)
      # yanlış: H–H (su için)
      drag(1, 2)
      bad = pg.locator("#hmMsg").inner_text()
      check(tag+": yanlış bağ açıklaması", "merkez atom" in bad and pg.evaluate("() => window.__S3._S.o.bonds.length") == 0, bad)
      drag(1, 0); drag(2, 0)
      try: pg.wait_for_function("() => { const o = window.__S3._S.o; if (!o.done || o.snap < 1) return false; const c = o.atoms[0].m.position, a = o.atoms[1].m.position.clone().sub(c), b = o.atoms[2].m.position.clone().sub(c); return Math.abs(a.angleTo(b) * 180 / Math.PI - 104.5) < 2; }", timeout=30000)
      except Exception: pass
      st = pg.evaluate("() => { const o = window.__S3._S.o; return { done: !!o.done, bonds: o.bonds.length, lp: o.lpObj.length, ang: (() => { const c = o.atoms[0].m.position, a = o.atoms[1].m.position.clone().sub(c), b = o.atoms[2].m.position.clone().sub(c); return Math.round(a.angleTo(b) * 180 / Math.PI); })() }; }")
      msg = pg.locator("#hmMsg").inner_text()
      print("su", st, msg)
      check(tag+": H₂O kuruldu, VSEPR açısı", st["done"] and st["bonds"] == 2 and abs(st["ang"] - 104.5) < 3 and st["lp"] == 2 and "polar" in msg, (st, msg))
      check(tag+": çözülen işaretlendi", pg.locator('.hm-molbtn.is-done[data-mol="H2O"]').count() == 1)
      pg.screenshot(path=os.path.join(SHOT, "mol-h2o-"+tag+".png"))
      # ---------- molekül: el ile (çimdik) ----------
      pg.click('.hm-molbtn[data-mol="CO2"]'); pg.wait_for_timeout(600)
      r = pg.evaluate("""(H) => { const S3 = window.__S3, S = S3._S, f = S3._handFeed, h = eval(H); const cv = S.renderer.domElement.getBoundingClientRect(), er = S.el.getBoundingClientRect();
        // ekran konumundan el kutusu merkezine (ayna yok; imleç orta %70'ten yayılır)
        const toHand = (px, py) => { const nx = (px - er.left) / er.width, ny = (py - er.top) / er.height; return [(nx * 0.7 + 0.15) * 640, (ny * 0.7 + 0.15) * 480]; };
        const pos = (i) => { const v = new S.THREE.Vector3(); S.o.atoms[i].m.getWorldPosition(v); v.project(S.camera); return [cv.left + (v.x + 1) / 2 * cv.width, cv.top + (1 - v.y) / 2 * cv.height]; };
        let t = 2e5; const move = (i, j) => { const a = toHand(...pos(i)), b = toHand(...pos(j)); f([], t += 60); for (let k = 0; k <= 8; k++) f([h(a[0] + (b[0] - a[0]) * k / 8 + (k === 8 ? 12 : 0), a[1] + (b[1] - a[1]) * k / 8, 'pinch')], t += 60); f([h(b[0], b[1], 'open')], t += 60); f([], t += 60); };
        move(1, 0); move(2, 0); return { bonds: S.o.bonds.length, done: !!S.o.done }; }""", H)
      pg.wait_for_timeout(1200)
      print("el ile CO2", r, pg.locator("#hmMsg").inner_text())
      check(tag+": el ile CO₂ (çimdikle tut-bırak)", r["done"] and r["bonds"] == 2 and pg.evaluate("() => window.__S3._S.o.bonds.every(b => b.n === 2)"), r)
      # tüm hedefler geometrisi
      geo = pg.evaluate("() => App.modeller.MOL.map(m => { const d = App.modeller.idealDirs(m); if (d.length < 2) return [m.id, null]; const a = d[0], b = d[1]; const ang = Math.acos(a[0]*b[0]+a[1]*b[1]+a[2]*b[2]) * 180 / Math.PI; return [m.id, Math.round(ang * 10) / 10]; })")
      print("açılar", geo)
      exp = {"H2O": 104.5, "CO2": 180, "BF3": 120, "NH3": 107, "CH4": 109.5, "CCl4": 109.5}
      check(tag+": VSEPR açıları doğru", all(abs(a - exp[i]) < 2.5 for i, a in geo if i in exp), geo)
      check(tag+": taşma yok (molekül)", ovf() <= 0, ovf())
      # ---------- yeni el arayüzü (deneyde): imleç, çipler, bekle-bas ----------
      go(pg, "#/lab/sarkac", 1500)
      if not pg.evaluate("() => !!document.querySelector('#labHost .lab__3d')"): pg.click('#labHost [data-mode="3d"]'); pg.wait_for_timeout(1500)
      pg.click("#labHost .lab__handbtn"); pg.wait_for_function("() => window.__S3.handState().cam", timeout=90000)
      chips = pg.locator(".lab-hand__chip").count()
      check(tag+": ayar çipleri", chips == 3, chips)
      pg.locator(".lab-hand__chip").nth(2).click(); pg.wait_for_timeout(200)
      check(tag+": çiple ayar seçimi", pg.evaluate("() => window.__S3.handState().sel") == 2)
      pg.evaluate("""(H) => { const f = window.__S3._handFeed, h = eval(H); f([h(300, 200, 'pinch')], 4e5); f([h(300, 170, 'pinch')], 4e5 + 60); }""", H); pg.wait_for_timeout(300)
      pg.screenshot(path=os.path.join(SHOT, "hand-hud-"+tag+".png"))
      # işaret parmağıyla "2B" düğmesinin üstünde bekle → basar
      rr = pg.evaluate("""(H) => { const S3 = window.__S3, f = S3._handFeed, h = eval(H), er = S3.el.getBoundingClientRect(); const bt = document.querySelector('#labHost [data-mode="2d"]').getBoundingClientRect();
        const nx = (bt.left + bt.width / 2 - er.left) / er.width, ny = (bt.top + bt.height / 2 - er.top) / er.height; const hx = (nx * 0.7 + 0.15) * 640, hy = (ny * 0.7 + 0.15) * 480 - 80 * 0.18 + 40;
        let t = 3e5; const out = []; for (let k = 0; k < 26; k++) { f([h(hx, hy, 'point')], t += 50); if (k === 5) out.push(S3.handState().cursor, !!document.querySelector('.is-dwell')); } return out; }""", H)
      pg.wait_for_timeout(600)
      mode2d = pg.evaluate("() => !document.querySelector('#labHost').classList.contains('is-3d')")
      check(tag+": işaret imleci ve bekle-bas (havada düğmeye basma)", rr[0] and rr[1] and mode2d, (rr, mode2d))
      check(tag+": 2B'ye geçince el kontrolü kapandı", not pg.evaluate("() => window.__S3.handOn()"))
      pg.screenshot(path=os.path.join(SHOT, "hand-ui-"+tag+".png"))
      ctx.close()
    print("hatalar:", errs[:5])
    check("sayfa hatası yok", not errs, errs[:5])
    b.close()
finally:
  for pr in procs: pr.terminate()
print("SONUÇ", sum(res), "/", len(res))
