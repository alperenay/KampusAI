import sys, os
from playwright.sync_api import sync_playwright
ROOT = "/home/claude/ders-asistani/index.html"; OUT = sys.argv[1]; os.makedirs(OUT, exist_ok=True)
errors = []
with sync_playwright() as p:
    b = p.chromium.launch()
    ctx = b.new_context(viewport={"width": 1440, "height": 900})
    pg = ctx.new_page()
    pg.on("console", lambda m: errors.append(f"[{m.type}] {m.text}") if m.type in ("error", "warning") else None)
    pg.on("pageerror", lambda e: errors.append(f"[pageerror] {e}"))
    url = "file://" + ROOT
    pg.goto(url); pg.wait_for_timeout(500)
    print("theme:", pg.evaluate("document.documentElement.dataset.theme"))
    data = [("2026-09-12", {"turkce": (30, 6), "sosyal": (12, 4), "matematik": (22, 8), "fen": (9, 5)}),
            ("2026-09-26", {"turkce": (31, 6), "sosyal": (14, 3), "matematik": (27, 6), "fen": (12, 3)}),
            ("2026-10-03", {"turkce": (34, 4), "sosyal": (15, 2), "matematik": (29, 5), "fen": (13, 4)})]
    for date, v in data:
        pg.goto(url + "#/denemeler/yeni/tyt"); pg.wait_for_timeout(250)
        for k, (d, y) in v.items():
            pg.fill(f'input[name="d_{k}"]', str(d)); pg.fill(f'input[name="y_{k}"]', str(y))
        pg.fill('input[name="date"]', date); pg.click("#saveBtn"); pg.wait_for_timeout(300)
    pg.goto(url + "#/program"); pg.wait_for_timeout(300); pg.click("#copyDefault"); pg.wait_for_timeout(2900)
    for th in ["dark", "light"]:
        pg.click(f'#themeSwitch [data-theme-set="{th}"]'); pg.wait_for_timeout(300)
        for name, route in [("home", "#/"), ("dash", "#/denemeler"), ("plan", "#/program/benim"), ("form", "#/denemeler/yeni/tyt"), ("lesson", "#/konular/9/matematik/ornek/k1"), ("grades", "#/konular/9")]:
            pg.goto(url + route); pg.wait_for_timeout(400)
            if name == "form":
                pg.fill('input[name="d_turkce"]', "30"); pg.fill('input[name="y_turkce"]', "6")
            if name == "dash":
                box = pg.locator(".chart .hit").nth(1).bounding_box()
                pg.mouse.move(box["x"] + box["width"] / 2, box["y"] + 50); pg.wait_for_timeout(150)
            pg.screenshot(path=f"{OUT}/{th}-{name}.png")
        pg.click("#settingsBtn"); pg.wait_for_timeout(300)
        pg.screenshot(path=f"{OUT}/{th}-settings.png"); pg.keyboard.press("Escape")
    # tema kalıcılığı
    pg.reload(); pg.wait_for_timeout(400)
    print("after reload:", pg.evaluate("document.documentElement.dataset.theme"), pg.evaluate("App.theme.current"))
    m = b.new_context(viewport={"width": 390, "height": 844}, device_scale_factor=2)
    mp = m.new_page(); mp.goto(url + "#/"); mp.wait_for_timeout(400)
    mp.eval_on_selector('#themeSwitch [data-theme-set="light"]', 'e => e.click()'); mp.wait_for_timeout(300)
    mp.screenshot(path=f"{OUT}/mobile-light.png")
    mp.click("#menuBtn"); mp.wait_for_timeout(300); mp.screenshot(path=f"{OUT}/mobile-light-menu.png")
    b.close()
print("ERRORS:", errors or "none")
