exec(open("hdr.py").read())
import time
with sync_playwright() as p:
  b = p.chromium.launch(args=["--use-gl=angle", "--use-angle=swiftshader", "--enable-unsafe-swiftshader", "--use-fake-ui-for-media-stream", "--use-fake-device-for-media-stream"])
  ctx, pg = newctx(b, False, 1366, 860); pg.goto("http://localhost:8766/"); pg.wait_for_timeout(1500)
  ctx.grant_permissions(["camera","microphone"])
  pg.evaluate("() => { App.speech.sttMode = () => 'web'; App.speech.listen = (o) => ({ stop: async () => ({ text: '' }) }); }")
  go(pg, "#/lab/atis", 2000); pg.click('[data-mode="3d"]'); pg.wait_for_timeout(3000)
  pg.evaluate("() => App.voice.open()"); pg.wait_for_timeout(800)
  t=time.time()
  try:
    pg.click("#vHoloBtn", timeout=60000); print("click took", round(time.time()-t,1))
  except Exception as e: print("click fail", round(time.time()-t,1))
  t=time.time(); print(pg.evaluate("() => 1"), "eval", round(time.time()-t,1))
  for i in range(5):
    t=time.time(); pg.wait_for_timeout(1000); r = pg.evaluate("() => performance.now()"); print("tick", round(time.time()-t,2))
  b.close()
for pr in procs: pr.terminate()
