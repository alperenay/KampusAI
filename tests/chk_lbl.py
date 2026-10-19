exec(open("hdr.py").read())
try:
  with sync_playwright() as p:
    b = p.chromium.launch(args=["--use-gl=angle", "--use-angle=swiftshader", "--enable-unsafe-swiftshader"]); ctx, pg = newctx(b, False, 1366, 860)
    pg.evaluate("() => { const m = App.lab3d.mount; App.lab3d.mount = function () { const r = m.apply(this, arguments); window.__S3 = r; return r; }; }")
    go(pg, "#/modeller/molekul", 400); pg.wait_for_selector("#hmStage canvas", timeout=15000); pg.wait_for_timeout(500)
    for mid in ["H2", "CCl4"]:
      pg.click('.hm-molbtn[data-mol="%s"]' % mid); pg.wait_for_timeout(300)
      pg.evaluate("() => { const S = window.__S3._S, n = S.o.atoms.length; for (let i = 1; i < n; i++) App.modeller._bond(S, i, 0); S.o.onChange && S.o.onChange(); }"); pg.wait_for_timeout(2500)
    pg.screenshot(path="v34/mol-ccl4.png")
finally:
  for pr in procs: pr.terminate()
