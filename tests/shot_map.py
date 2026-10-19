exec(open("hdr.py").read())
import sys
try:
  with sync_playwright() as p:
    b = p.chromium.launch()
    for m,w,h in ((False,1366,860),(True,390,844)):
      ctx, pg = newctx(b, m, w, h)
      for hsh in ["#/atlas/tr/iller","#/atlas/tr/bolgeler","#/atlas/tr/akarsu","#/atlas/tr/daglar","#/atlas/tr/tarim","#/atlas/dunya/ulkeler","#/atlas/dunya/kitalar"]:
        go(pg, hsh, 900)
        pg.screenshot(path="map_%d_%s.png" % (w, hsh.split("/")[-1]))
      go(pg, "#/atlas/tr/iller", 800)
      pg.click('[data-mode="name"]'); pg.wait_for_timeout(500); pg.screenshot(path="map_%d_quizname.png" % w)
      pg.click('[data-mode="find"]'); pg.wait_for_timeout(500)
      pg.click('[data-z="in"]'); pg.click('[data-z="in"]'); pg.wait_for_timeout(300); pg.screenshot(path="map_%d_quizfind.png" % w)
    b.close()
finally:
    for pr in procs: pr.terminate()
print(errs)
