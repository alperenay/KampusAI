exec(open("hdr.py").read())
try:
  with sync_playwright() as p:
    b = p.chromium.launch()
    for m,w,h in ((False,1366,860),(True,390,844)):
      ctx, pg = newctx(b, m, w, h)
      go(pg, "#/araclar", 900)
      pg.locator('[data-pin="atlas"]').click(); pg.locator('[data-pin="paragraf"]').click(); pg.wait_for_timeout(300)
      pg.screenshot(path="hub_%d.png" % w, full_page=True)
      pg.fill("#hubQ", "harita"); pg.wait_for_timeout(200)
      print(w, "visible tiles", pg.locator(".hub-tile:not([hidden])").count(), pg.locator("#hubCount").inner_text())
      pg.press("#hubQ", "Enter"); pg.wait_for_timeout(1200); print(pg.evaluate("() => location.hash"))
      go(pg, "#/", 900)
      pg.screenshot(path="hubhome_%d.png" % w)
      if m:
        pg.click("#tabMore"); pg.wait_for_timeout(400); pg.screenshot(path="hubmenu_%d.png" % w)
      print("pins", pg.locator("#ng-pins .nav__item").count(), pg.locator(".home-pins a").count())
    b.close()
finally:
    for pr in procs: pr.terminate()
print(errs)
