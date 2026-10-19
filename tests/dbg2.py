exec(open("hdr.py").read())
import time
with sync_playwright() as p:
  b = p.chromium.launch(args=["--use-gl=angle", "--use-angle=swiftshader", "--enable-unsafe-swiftshader"])
  ctx, pg = newctx(b, False, 1366, 860)
  pg.evaluate("() => { const m = App.lab3d.mount; App.lab3d.mount = function () { const r = m.apply(this, arguments); window.__S3 = r; window.__fc = 0; const f = r.frame; r.frame = function () { window.__fc++; return f.apply(this, arguments); }; return r; }; }")
  go(pg, "#/kure", 6000)
  for k in ("baskent", "iklim", "saat", "levha", "deprem", "volkan", "tarih", "gunes"):
    pg.check('[data-l="%s"]' % k); pg.wait_for_timeout(250)
  pg.wait_for_timeout(1000)
  for d in ("172", "355", "80"):
    t=time.time(); pg.click('[data-doy="%s"]' % d); t1=time.time()
    for i in range(10):
      pg.wait_for_timeout(300)
      print(d, round(time.time()-t,1), "click", round(t1-t,1), pg.evaluate("() => [window.__S3._S.o.sunInfo && window.__S3._S.o.sunInfo.dec, window.__fc, window.__S3.perf().pr]"))
  b.close()
for pr in procs: pr.terminate()
