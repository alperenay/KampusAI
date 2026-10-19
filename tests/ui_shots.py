exec(open("hdr.py").read())
import sys
OUT = os.path.join(SP, "ui"); os.makedirs(OUT, exist_ok=True)
routes = ["", "yazili", "konular/10/fizik", "araclar", "denemeler", "kure"]
with sync_playwright() as p:
  b = p.chromium.launch(args=["--use-gl=angle", "--use-angle=swiftshader", "--enable-unsafe-swiftshader"])
  for mobile, w, h, theme in ((False, 1366, 860, "dark"), (True, 390, 844, "dark"), (False, 1366, 860, "light")):
    ctx, pg = newctx(b, mobile, w, h)
    pg.evaluate("(t) => { App.prefs.set('theme', t); document.documentElement.setAttribute('data-theme', t); }", theme)
    pg.evaluate("() => App.demo.load()"); pg.wait_for_timeout(1500)
    for r in routes:
      go(pg, "#/" + r, 2500)
      pg.screenshot(path=os.path.join(OUT, "%s_%s_%s.png" % (w, theme, r.replace("/", "_") or "home")))
    if mobile:
      pg.click("#tabMore"); pg.wait_for_timeout(800); pg.screenshot(path=os.path.join(OUT, "%s_%s_menu.png" % (w, theme)))
    ctx.close()
  b.close()
for pr in procs: pr.terminate()
print("errs", errs)
