import subprocess, sys, time, os
from playwright.sync_api import sync_playwright
D = os.path.join(os.path.dirname(os.path.abspath(__file__)), "webdist")
srv = subprocess.Popen([sys.executable, "-m", "http.server", "8790", "--bind", "127.0.0.1", "-d", D], stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
time.sleep(1)
errs = []
try:
    with sync_playwright() as p:
        b = p.chromium.launch()
        ctx = b.new_context(viewport={"width": 390, "height": 844})
        pg = ctx.new_page()
        pg.on("pageerror", lambda e: errs.append(str(e)))
        pg.goto("http://localhost:8790/"); pg.wait_for_timeout(1500)
        print("version:", pg.evaluate("App.version"))
        pg.evaluate("navigator.serviceWorker.register('sw.js')")
        pg.evaluate("navigator.serviceWorker.ready.then(() => true)")
        pg.wait_for_timeout(2500)
        n = pg.evaluate("caches.keys().then(async ks => { const c = await caches.open(ks[0]); return [ks, (await c.keys()).length]; })")
        print("caches:", n)
        man = pg.evaluate("fetch('manifest.webmanifest').then(r=>r.json()).then(m=>m.icons.length)")
        print("manifest icons:", man)
        ctx.set_offline(True)
        pg.reload(); pg.wait_for_timeout(1500)
        print("offline load ok:", pg.locator(".home__title").count() == 1, "katex:", pg.evaluate("!!window.katex"))
        pg.goto("http://localhost:8790/#/konular/9/matematik"); pg.wait_for_timeout(800)
        print("offline route:", pg.locator("#view").inner_text()[:80].replace("\n", " | "))
        pg.screenshot(path="pwa-offline.png")
        b.close()
finally:
    srv.terminate()
print("errors:", errs)
