exec(open("hdr.py").read())
try:
  with sync_playwright() as p:
    b = p.chromium.launch(args=["--use-gl=angle", "--use-angle=swiftshader", "--enable-unsafe-swiftshader"]); ctx, pg = newctx(b, False, 1366, 860)
    pg.evaluate("() => { const m = App.lab3d.mount; App.lab3d.mount = function () { const r = m.apply(this, arguments); window.__S3 = r; return r; }; }")
    go(pg, "#/modeller/molekul", 400); pg.wait_for_selector("#hmStage canvas", timeout=15000); pg.wait_for_timeout(500)
    for mid in pg.evaluate("() => App.modeller.MOL.map(m => m.id)"):
      pg.click('.hm-molbtn[data-mol="%s"]' % mid); pg.wait_for_timeout(300)
      r = pg.evaluate("""() => { const S = window.__S3._S, n = S.o.atoms.length; for (let i = 1; i < n; i++) App.modeller._bond(S, i, 0); return { done: !!S.o.done, msg: S.o.msg && S.o.msg.tr, bonds: S.o.bonds.map(b => b.n) }; }""")
      pg.wait_for_timeout(2500)
      ang = pg.evaluate("() => { const o = window.__S3._S.o; if (o.atoms.length < 3) return null; const c = o.atoms[0].m.position, a = o.atoms[1].m.position.clone().sub(c), b = o.atoms[2].m.position.clone().sub(c); return Math.round(a.angleTo(b) * 1800 / Math.PI) / 10; }")
      print(mid, r["done"], r["bonds"], ang, "|", r["msg"])
    pg.screenshot(path="v34/mol-ccl4.png")
    print("errs", errs)
finally:
  for pr in procs: pr.terminate()
