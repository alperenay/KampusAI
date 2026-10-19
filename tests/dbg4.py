exec(open("hdr.py").read())
with sync_playwright() as p:
  b = p.chromium.launch(args=["--use-gl=angle", "--use-angle=swiftshader", "--enable-unsafe-swiftshader"])
  ctx, pg = newctx(b, False, 1366, 860)
  pg.evaluate("() => { const m = App.lab3d.mount; App.lab3d.mount = function () { const r = m.apply(this, arguments); window.__S3 = r; const R = r._S.renderer, o = R.render.bind(R); window.__n = 0; R.render = (s, c) => { window.__n++; o(s, c); }; return r; }; }")
  go(pg, "#/kure", 600); pg.wait_for_selector("#kStage canvas", timeout=30000); pg.wait_for_timeout(1500)
  st = "() => [window.__n, App.kure._P.spin, App.kure._P.drag, window.__S3.visible(), !!App.kure._P.focus]"
  print(pg.evaluate(st))
  for k in ("baskent", "deprem", "volkan", "levha", "tarih"): pg.check('[data-l="%s"]' % k); pg.wait_for_timeout(150)
  pg.wait_for_timeout(800); print(pg.evaluate(st))
  pg.uncheck("#kSpin"); pg.wait_for_timeout(800); print(pg.evaluate(st))
  pg.check("#kSpin"); pg.wait_for_timeout(1500); print(pg.evaluate(st))
  b.close()
for pr in procs: pr.terminate()
