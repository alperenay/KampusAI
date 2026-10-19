exec(open("hdr.py").read())
try:
  with sync_playwright() as p:
    b = p.chromium.launch()
    for m,w,h in ((False,1366,900),(True,390,844)):
      ctx, pg = newctx(b, m, w, h)
      go(pg, "#/zaman", 2500)
      pg.screenshot(path="tl_%d.png" % w, full_page=True)
      go(pg, "#/zaman/liste", 1500); pg.screenshot(path="tl_list_%d.png" % w)
      go(pg, "#/zaman/sinav", 1000); pg.locator("[data-o]").first.click(); pg.wait_for_timeout(600); pg.screenshot(path="tl_quiz_%d.png" % w, full_page=True)
    b.close()
finally:
    for pr in procs: pr.terminate()
print(errs)
