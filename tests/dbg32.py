exec(open("hdr.py").read())
Y4M = os.path.join(SP, "hands.y4m")
try:
  with sync_playwright() as p:
    b = p.chromium.launch(args=["--use-gl=angle", "--use-angle=swiftshader", "--enable-unsafe-swiftshader", "--use-fake-ui-for-media-stream", "--use-fake-device-for-media-stream", "--use-file-for-fake-video-capture=" + Y4M])
    ctx, pg = newctx(b, False, 1366, 860)
    pg.on("console", lambda m: print("C", m.type, m.text[:300]))
    pg.on("pageerror", lambda e: print("PE", str(e)[:300]))
    pg.evaluate("() => { const m = App.lab3d.mount; App.lab3d.mount = function () { const r = m.apply(this, arguments); window.__S3 = r; return r; }; }")
    go(pg, "#/lab/sarkac", 1500)
    if not pg.evaluate("() => !!document.querySelector('#labHost .lab__3d')"):
      pg.click('#labHost [data-mode="3d"]'); pg.wait_for_timeout(2000)
    pg.click("#labHost .lab__handbtn")
    pg.wait_for_function("() => window.__S3.handState().cam", timeout=60000)
    t0=time.time()
    pg.wait_for_timeout(3000)
    print("video", pg.evaluate("""async () => { const v = window.__S3._handVideo(); const c = document.createElement('canvas'); c.width = v.videoWidth; c.height = v.videoHeight; c.getContext('2d').drawImage(v, 0, 0); window.__snap = c.toDataURL('image/jpeg', .8); v.width = v.videoWidth; v.height = v.videoHeight; const p = await window.__htModel.detect(v); return [v.videoWidth, v.videoHeight, v.readyState, p.map(x => [x.label, Math.round(x.score * 100)])]; }"""))
    import base64; open("v32/snap.jpg","wb").write(base64.b64decode(pg.evaluate("() => window.__snap").split(",")[1]))
    print(pg.evaluate("() => [window.__S3.handState()]"))
    print(pg.evaluate("async () => { const v = document.createElement('video'); return 1; }"))
    r = pg.evaluate("""async () => { const img = new Image(); img.src = '/__hand.jpg'; await img.decode().catch(()=>0); const t=performance.now(); const p = await window.__htModel.detect(img); return [performance.now()-t, p.map(x => [x.label, Math.round(x.score*100)])]; }""")
    print("img", r)
finally:
  for pr in procs: pr.terminate()
