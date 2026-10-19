exec(open("hdr.py").read())
try:
  with sync_playwright() as p:
    b = p.chromium.launch()
    for m,w,h in ((False,1366,900),(True,390,844)):
      ctx, pg = newctx(b, m, w, h)
      pg.evaluate("() => App.demo.load()"); pg.wait_for_timeout(1500)
      go(pg, "#/tercih", 3000)
      print(pg.evaluate("() => { const L = App.tercih._last; return [L.type, Object.values(L.E.est).map(e => [e.score && Math.round(e.score), e.rank]), L.filtered().length]; }"))
      pg.screenshot(path="tc_%d.png" % w, full_page=False)
      pg.locator(".tc-add").first.click(); pg.locator(".tc-add").nth(1).click(); pg.wait_for_timeout(300)
      go(pg, "#/tercih/tum", 1200); pg.fill("#tcQ", "tıp istanbul"); pg.wait_for_timeout(600)
      pg.screenshot(path="tc_all_%d.png" % w)
      go(pg, "#/tercih/liste", 1200); pg.screenshot(path="tc_list_%d.png" % w, full_page=True)
    b.close()
finally:
    for pr in procs: pr.terminate()
print(errs)
