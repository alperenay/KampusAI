import sys, os
from playwright.sync_api import sync_playwright

ROOT = "/home/claude/ders-asistani/index.html"
OUT = sys.argv[1]
os.makedirs(OUT, exist_ok=True)
errors = []

with sync_playwright() as p:
    b = p.chromium.launch()
    ctx = b.new_context(viewport={"width": 1440, "height": 900}, device_scale_factor=1)
    pg = ctx.new_page()
    pg.on("console", lambda m: errors.append(f"[{m.type}] {m.text}") if m.type in ("error", "warning") else None)
    pg.on("pageerror", lambda e: errors.append(f"[pageerror] {e}"))
    url = "file://" + ROOT
    pg.goto(url)
    pg.wait_for_timeout(500)
    print("engine:", pg.evaluate("App.db.engine"))
    pg.screenshot(path=f"{OUT}/01-home.png")

    # sohbet
    pg.fill("#composerInput", "TYT netlerimi nasıl artırırım?")
    pg.keyboard.press("Enter")
    pg.wait_for_timeout(1000)
    pg.screenshot(path=f"{OUT}/02-chat.png")

    # TYT deneme 1
    pg.goto(url + "#/denemeler/yeni/tyt"); pg.wait_for_timeout(300)
    vals = {"turkce": (30, 6), "sosyal": (12, 4), "matematik": (22, 8), "fen": (9, 5)}
    for k, (d, y) in vals.items():
        pg.fill(f'input[name="d_{k}"]', str(d)); pg.fill(f'input[name="y_{k}"]', str(y))
    pg.fill('input[name="date"]', "2026-09-12")
    print("total1:", pg.inner_text("#totalNet"))
    pg.screenshot(path=f"{OUT}/03-form.png", full_page=True)
    pg.click("#saveBtn"); pg.wait_for_timeout(400)

    # invalid check
    pg.goto(url + "#/denemeler/yeni/tyt"); pg.wait_for_timeout(300)
    pg.fill('input[name="d_fen"]', "18"); pg.fill('input[name="y_fen"]', "5")
    print("invalid disabled:", pg.is_disabled("#saveBtn"), pg.inner_text("#formError"))

    # more exams
    data = [("2026-09-19", {"turkce": (32, 5), "sosyal": (13, 3), "matematik": (25, 7), "fen": (10, 4)}),
            ("2026-09-26", {"turkce": (31, 6), "sosyal": (14, 3), "matematik": (27, 6), "fen": (12, 3)}),
            ("2026-10-03", {"turkce": (34, 4), "sosyal": (15, 2), "matematik": (29, 5), "fen": (13, 4)})]
    for date, v in data:
        pg.goto(url + "#/denemeler/yeni/tyt"); pg.wait_for_timeout(250)
        for k, (d, y) in v.items():
            pg.fill(f'input[name="d_{k}"]', str(d)); pg.fill(f'input[name="y_{k}"]', str(y))
        pg.fill('input[name="date"]', date)
        pg.click("#saveBtn"); pg.wait_for_timeout(300)
    pg.wait_for_timeout(400)
    pg.screenshot(path=f"{OUT}/04-dashboard.png", full_page=True)
    # hover
    box = pg.locator(".chart .hit").nth(2).bounding_box()
    pg.mouse.move(box["x"] + box["width"] / 2, box["y"] + 40)
    pg.wait_for_timeout(150)
    pg.locator(".chart-card").screenshot(path=f"{OUT}/05-chart-hover.png")

    # AYT form
    pg.goto(url + "#/denemeler/yeni/ayt"); pg.wait_for_timeout(300)
    pg.screenshot(path=f"{OUT}/06-ayt-form.png", full_page=True)

    # program
    pg.goto(url + "#/program"); pg.wait_for_timeout(300)
    pg.screenshot(path=f"{OUT}/07-program.png", full_page=True)
    pg.click("#copyDefault"); pg.wait_for_timeout(500)
    pg.locator("[data-edit]").first.click(); pg.wait_for_timeout(200)
    pg.screenshot(path=f"{OUT}/08-block-modal.png")
    pg.fill('input[name="end"]', "19:00")  # overlap with next block 18:30
    pg.click("[data-save]"); pg.wait_for_timeout(200)
    print("overlap err:", pg.inner_text("#blockError"))
    pg.keyboard.press("Escape")
    pg.screenshot(path=f"{OUT}/09-planner.png", full_page=True)

    # konular
    pg.goto(url + "#/konular"); pg.wait_for_timeout(300)
    pg.screenshot(path=f"{OUT}/10-konular.png")
    pg.goto(url + "#/konular/9/matematik"); pg.wait_for_timeout(300)
    pg.screenshot(path=f"{OUT}/11-units.png")
    pg.goto(url + "#/konular/9/matematik/ornek/k1"); pg.wait_for_timeout(300)
    pg.click("#toggleDone"); pg.wait_for_timeout(200)
    pg.fill("#myNote", "deneme notu"); pg.wait_for_timeout(900)
    pg.screenshot(path=f"{OUT}/12-outcome.png", full_page=True)
    pg.goto(url + "#/konular/9"); pg.wait_for_timeout(300)
    pg.screenshot(path=f"{OUT}/13-subjects.png")

    # reload persistence
    pg.reload(); pg.wait_for_timeout(500)
    print("exams after reload:", pg.evaluate("App.db.getAll('exams').then(x=>x.length)"))
    print("note after reload:", pg.evaluate("App.db.get('notes','9/matematik/ornek/k1').then(x=>x&&x.text)"))

    # collapsed
    pg.goto(url + "#/"); pg.wait_for_timeout(300)
    pg.click("#sidebarToggle"); pg.wait_for_timeout(300)
    pg.screenshot(path=f"{OUT}/14-collapsed.png")
    pg.click("#sidebarToggle")

    # mobile
    m = b.new_context(viewport={"width": 390, "height": 844}, device_scale_factor=2)
    mp = m.new_page()
    mp.on("pageerror", lambda e: errors.append(f"[mobile pageerror] {e}"))
    mp.goto(url + "#/denemeler"); mp.wait_for_timeout(500)
    mp.screenshot(path=f"{OUT}/15-mobile-dash.png", full_page=True)
    mp.goto(url + "#/"); mp.wait_for_timeout(300)
    mp.click("#menuBtn"); mp.wait_for_timeout(300)
    mp.screenshot(path=f"{OUT}/16-mobile-menu.png")
    b.close()

print("ERRORS:", errors or "none")
