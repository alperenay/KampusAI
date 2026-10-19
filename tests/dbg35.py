exec(open("hdr.py").read())
try:
  with sync_playwright() as p:
    b = p.chromium.launch(args=["--use-gl=angle", "--use-angle=swiftshader", "--enable-unsafe-swiftshader"]); ctx, pg = newctx(b, False, 1366, 860)
    pg.on("console", lambda m: print("C", m.type, m.text[:300]) if m.type in ("error","warning") else None)
    pg.on("pageerror", lambda e: print("PE", str(e)[:300]))
    go(pg, "#/kure", 5000)
    print(pg.evaluate("() => [location.hash, !!App.kure, !!App.data.globe, document.querySelector('#view') && document.querySelector('#view').innerText.slice(0,300)]"))
finally:
  for pr in procs: pr.terminate()
