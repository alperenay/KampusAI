exec(open("hdr.py").read())
try:
  with sync_playwright() as p:
    b = p.chromium.launch()
    for m,w,h in ((True,390,844),(False,1366,860)):
      ctx, pg = newctx(b, m, w, h)
      pg.wait_for_timeout(800)
      pg.screenshot(path="note_%d.png" % w)
      go(pg, "#/bugun", 1200); pg.screenshot(path="note_today_%d.png" % w)
      print(pg.locator(".home-note").all_inner_texts())
    b.close()
finally:
    for pr in procs: pr.terminate()
print(errs)
