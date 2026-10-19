exec(open("hdr.py").read())
import json
try:
  with sync_playwright() as p:
    b = p.chromium.launch()
    ctx, pg = newctx(b, True, 390, 844)
    pg.evaluate("() => App.demo.load()"); pg.wait_for_timeout(1500)
    pg.evaluate("() => { window.__w = []; window.KampusNative = { widgetUpdate: (j) => window.__w.push(j), widgetCount: () => 0, widgetPin: () => false, takeRoute: () => '' }; }")
    p1 = pg.evaluate("async () => { await App.widget.update(); return window.__w.length ? JSON.parse(window.__w[window.__w.length-1]) : null; }")
    print({k: p1[k] for k in p1 if k != 'notes'}, len(p1['notes']), list(p1['notes'].items())[:2])
    pg.evaluate("() => App.prefs.set('smartNotif', {on: true, hour: 19, streak: true, countdown: true, morning: true})")
    pl = pg.evaluate("async () => (await App.smartNotify.plan(new Date('2026-10-18T10:00:00'))).map(n => [n.id, n.kind, n.at.toString().slice(0,21), n.title, n.body])")
    for x in pl: print(x)
    # settings modal
    pg.evaluate("() => App.reminders.openSettings()"); pg.wait_for_timeout(800)
    pg.screenshot(path="sn.png", full_page=False)
    print("sn", pg.locator(".sn-set").count(), pg.locator("#snPin").count())
    pg.evaluate("() => window.__nativeRoute('bugun')"); pg.wait_for_timeout(300)
    print(pg.evaluate("() => location.hash"))
    b.close()
finally:
    for pr in procs: pr.terminate()
print(errs)
