exec(open("hdr.py").read())
try:
  with sync_playwright() as p:
    b = p.chromium.launch(args=["--use-gl=angle", "--use-angle=swiftshader", "--enable-unsafe-swiftshader"])
    ctx, pg = newctx(b, True)
    pg.on("console", lambda m: print("CONSOLE", m.type, m.text[:300]) if m.type in ("error",) else None)
    pg.evaluate("() => { window.addEventListener('error', e => console.error('STACK', e.error && e.error.stack)); }")
    pg.evaluate("() => { navigator.mediaDevices.getUserMedia = () => Promise.reject(Object.assign(new Error('x'), { name: 'NotAllowedError' })); }")
    go(pg, "#/lab/sarkac", 1500)
    pg.click("#labHost [data-ar-start]"); pg.wait_for_timeout(300)
    print(pg.evaluate("() => Array.from(document.querySelectorAll('.toast')).map(t => t.textContent)"))
    for r in ("#/video", "#/kariyer", "#/kariyer/test", "#/kariyer/sonuc", "#/yolculuk", "#/yolculuk/matematik", "#/araclar"):
      go(pg, r, 1500)
    pg.evaluate("() => App.i18n.setLang('en')"); pg.wait_for_timeout(800)
    for r in ("#/video", "#/kariyer", "#/kariyer/sonuc", "#/yolculuk"):
      go(pg, r, 1500)
    print(errs)
finally:
  for pr in procs: pr.terminate()
