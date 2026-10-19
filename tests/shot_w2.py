exec(open("hdr.py").read())
try:
  with sync_playwright() as p:
    b = p.chromium.launch()
    for m,w,h in ((False,1366,860),(True,390,844)):
      ctx, pg = newctx(b, m, w, h)
      for lay in ["ulkeler","baskent","denizler","wakarsu","fiziki"]:
        go(pg, "#/atlas/dunya/"+lay, 1500)
        pg.screenshot(path="w2_%d_%s.png" % (w, lay), full_page=True)
        print(lay, pg.evaluate("() => App.harita._last.list().length"))
      go(pg, "#/atlas/dunya/ulkeler", 800)
      pg.evaluate("() => App.harita._last.tap(document.querySelector('[data-k=\"c:TUR\"]'))"); pg.wait_for_timeout(300)
      pg.screenshot(path="w2_%d_tur.png" % w, full_page=True)
      go(pg, "#/atlas/tr/iller", 800)
      pg.evaluate("() => App.harita._last.tap(document.querySelector('[data-k=\"p61\"]'))"); pg.wait_for_timeout(300)
      pg.locator('[data-goto="p53"]').click(); pg.wait_for_timeout(300)
      print(pg.locator("#mpInfo h3").inner_text())
      pg.screenshot(path="w2_%d_il.png" % w, full_page=True)
    b.close()
finally:
    for pr in procs: pr.terminate()
print(errs)
