import sys, os
from playwright.sync_api import sync_playwright

ROOT = "/home/claude/ders-asistani/index.html"
OUT = sys.argv[1]
os.makedirs(OUT, exist_ok=True)
errors = []

with sync_playwright() as p:
    b = p.chromium.launch()
    ctx = b.new_context(viewport={"width": 1440, "height": 900})
    pg = ctx.new_page()
    pg.on("console", lambda m: errors.append(f"[{m.type}] {m.text}") if m.type in ("error", "warning") else None)
    pg.on("pageerror", lambda e: errors.append(f"[pageerror] {e}"))
    url = "file://" + ROOT
    pg.goto(url); pg.wait_for_timeout(500)
    print("lang:", pg.evaluate("App.i18n.lang"), "| title:", pg.inner_text(".home__title"))

    # Türkçe veri gir
    data = [("2026-09-12", {"turkce": (30, 6), "sosyal": (12, 4), "matematik": (22, 8), "fen": (9, 5)}),
            ("2026-09-26", {"turkce": (31, 6), "sosyal": (14, 3), "matematik": (27, 6), "fen": (12, 3)}),
            ("2026-10-03", {"turkce": (34, 4), "sosyal": (15, 2), "matematik": (29, 5), "fen": (13, 4)})]
    for date, v in data:
        pg.goto(url + "#/denemeler/yeni/tyt"); pg.wait_for_timeout(250)
        for k, (d, y) in v.items():
            pg.fill(f'input[name="d_{k}"]', str(d)); pg.fill(f'input[name="y_{k}"]', str(y))
        pg.fill('input[name="date"]', date)
        pg.click("#saveBtn"); pg.wait_for_timeout(300)
    pg.goto(url + "#/program"); pg.wait_for_timeout(300)
    pg.click("#copyDefault"); pg.wait_for_timeout(500)

    # Dashboard'da İngilizceye geç (sayfa yenilenmeden)
    pg.goto(url + "#/denemeler"); pg.wait_for_timeout(400)
    pg.screenshot(path=f"{OUT}/tr-dashboard.png")
    pg.eval_on_selector('#langSwitch [data-lang="en"]', 'e => e.click()'); pg.wait_for_timeout(500)
    print("after switch:", pg.evaluate("App.i18n.lang"), "| html lang:", pg.evaluate("document.documentElement.lang"),
          "| h1:", pg.inner_text(".page-head h1"), "| side:", pg.inner_text(".nav__item[data-route=program]"))
    pg.wait_for_timeout(2600)
    pg.screenshot(path=f"{OUT}/en-dashboard.png")

    pg.goto(url + "#/"); pg.wait_for_timeout(300)
    pg.screenshot(path=f"{OUT}/en-home.png")
    pg.fill("#composerInput", "how is my exam score?"); pg.keyboard.press("Enter"); pg.wait_for_timeout(1000)
    print("ai reply:", pg.inner_text(".msg--ai .msg__body")[:90])

    pg.goto(url + "#/program/benim"); pg.wait_for_timeout(300)
    pg.screenshot(path=f"{OUT}/en-myschedule.png", full_page=True)
    pg.goto(url + "#/program"); pg.wait_for_timeout(300)
    pg.screenshot(path=f"{OUT}/en-default-schedule.png", full_page=True)
    pg.locator("#copyDefault").scroll_into_view_if_needed()

    pg.goto(url + "#/denemeler/yeni/ayt"); pg.wait_for_timeout(300)
    pg.fill('input[name="d_fizik"]', "10"); pg.fill('input[name="y_fizik"]', "6")
    print("ayt net en:", pg.inner_text("#totalNet"))
    pg.screenshot(path=f"{OUT}/en-ayt-form.png", full_page=True)

    pg.goto(url + "#/konular/9/matematik/ornek/k1"); pg.wait_for_timeout(300)
    pg.screenshot(path=f"{OUT}/en-outcome.png")
    pg.goto(url + "#/konular"); pg.wait_for_timeout(300)
    pg.screenshot(path=f"{OUT}/en-grades.png")

    pg.click("#settingsBtn"); pg.wait_for_timeout(300)
    pg.screenshot(path=f"{OUT}/en-settings.png")
    pg.select_option("#setLang", "tr"); pg.click("#setSave"); pg.wait_for_timeout(400)
    print("back via settings:", pg.evaluate("App.i18n.lang"), "| h1:", pg.inner_text(".page-head h1"))

    # dil tercihi yenilemeden sonra kalıcı mı
    pg.eval_on_selector('#langSwitch [data-lang="en"]', 'e => e.click()'); pg.wait_for_timeout(200)
    pg.reload(); pg.wait_for_timeout(500)
    print("after reload:", pg.evaluate("App.i18n.lang"), "| topbar:", pg.inner_text("#topbarTitle"))

    m = b.new_context(viewport={"width": 390, "height": 844}, device_scale_factor=2)
    mp = m.new_page()
    mp.goto(url + "#/"); mp.wait_for_timeout(400)
    mp.eval_on_selector('#langSwitch [data-lang="en"]', 'e => e.click()'); mp.wait_for_timeout(300)
    mp.screenshot(path=f"{OUT}/en-mobile-home.png")
    b.close()

print("ERRORS:", errors or "none")
