exec(open("hdr.py").read())
with sync_playwright() as p:
  b = p.chromium.launch(args=["--use-gl=angle", "--use-angle=swiftshader", "--enable-unsafe-swiftshader"])
  ctx, pg = newctx(b, False, 1280, 800); pg.goto("http://localhost:8766/"); pg.wait_for_timeout(1500)
  pg.evaluate("""() => { window.__c = {raf:0, frame:0, draw:0}; const r0 = window.requestAnimationFrame; window.requestAnimationFrame = (cb) => r0((t) => { window.__c.raf++; cb(t); });
    const m = App.lab3d.mount; App.lab3d.mount = function () { const r = m.apply(this, arguments); window.__S3 = r; const f = r.frame; r.frame = function () { window.__c.frame++; return f.apply(this, arguments); }; const R = r._S.renderer, o = R.render.bind(R); R.render = (s, c) => { window.__c.draw++; o(s, c); }; return r; }; }""")
  go(pg, "#/lab/atis", 3000); pg.click('[data-mode="3d"]'); pg.wait_for_timeout(5000)
  pg.evaluate("() => { window.__c = {raf:0, frame:0, draw:0}; }"); pg.wait_for_timeout(4000)
  print(pg.evaluate("() => [window.__c]"))
  b.close()
for pr in procs: pr.terminate()
