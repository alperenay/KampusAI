import sys, os
from playwright.sync_api import sync_playwright
with sync_playwright() as p:
    b = p.chromium.launch(); ctx = b.new_context(viewport={"width": 1366, "height": 860})
    ctx.add_init_script("try { localStorage.setItem('da:pref:tourDone', 'true'); } catch (e) {}")
    pg = ctx.new_page(); errs=[]; pg.on("pageerror", lambda e: errs.append(str(e)))
    pg.goto("http://localhost:8765/"); pg.wait_for_timeout(1500)
    for i in sys.argv[1:]:
        pg.evaluate("(h) => location.hash = h", "#/lab/" + i); pg.wait_for_timeout(1500)
        pg.locator(".lab-main").screenshot(path="v23/one-" + i + ".png")
    print(errs)
