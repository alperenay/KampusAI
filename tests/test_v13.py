import subprocess, sys, time, os, json, socket
from playwright.sync_api import sync_playwright
SP = os.path.dirname(os.path.abspath(__file__))
SITE = "/home/claude/ders-asistani"
def up(port):
    s = socket.socket(); r = s.connect_ex(("127.0.0.1", port)); s.close(); return r == 0
procs = []
if not up(8787): procs.append(subprocess.Popen(["node", "--no-warnings", os.path.join(SP, "worker_dev2.mjs")]))
if not up(8765): procs.append(subprocess.Popen([sys.executable, "-m", "http.server", "8765", "--bind", "127.0.0.1", "-d", SITE], stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL))
time.sleep(1.2)
res, errs = [], []
def check(n, c, info=""):
    res.append(bool(c)); print(("PASS " if c else "FAIL ") + n + ("" if c else " — " + str(info)[:400]))
CONFIG = 'App.config = { serverUrl: "http://127.0.0.1:8787" };'
SHOT = os.path.join(SP, "v13"); os.makedirs(SHOT, exist_ok=True)
URL = "http://localhost:8765/"
# Bildirimleri kaydet (tarayıcı bildirimi yerine)
NOTIF_STUB = """
window.__notifs = [];
(function(){ function N(title, opts){ window.__notifs.push({title: title, body: (opts||{}).body}); this.close = function(){}; }
  N.permission = 'granted'; N.requestPermission = function(){ return Promise.resolve('granted'); };
  window.Notification = N; })();
"""

def newctx(b, mobile=False, init=None, perms=None):
    ctx = b.new_context(viewport={"width": 390, "height": 844} if mobile else {"width": 1280, "height": 860},
                        user_agent=("Mozilla/5.0 (Linux; Android 14; Pixel 8) AppleWebKit/537.36 Chrome/130 Mobile Safari/537.36" if mobile else None))
    ctx.route("**/js/config.js", lambda r: r.fulfill(status=200, content_type="text/javascript", body=CONFIG))
    if init: ctx.add_init_script(init)
    pg = ctx.new_page()
    pg.on("pageerror", lambda e: errs.append(str(e)))
    return ctx, pg

def tour_step(pg):
    return pg.evaluate("() => App.tour.isActive() ? App.tour.current() : -1")

try:
    with sync_playwright() as p:
        b = p.chromium.launch()

        # ================= 1) İlk açılış: tur kendiliğinden açılır, 20 adım gezilir =================
        for mobile in (False, True):
            tag = "phone" if mobile else "desk"
            ctx, pg = newctx(b, mobile, init=NOTIF_STUB)
            pg.goto(URL); pg.wait_for_timeout(2200)
            check(f"[{tag}] ilk açılışta tur açıldı", pg.locator(".tour").count() == 1 and tour_step(pg) == 0)
            check(f"[{tag}] 20 adım", pg.evaluate("() => App.tour.steps.length") == 20)
            check(f"[{tag}] hoş geldin + isim alanı", pg.locator("#tourName").count() == 1 and "hoş geldin" in pg.locator(".tour__body h2").inner_text().lower())
            pg.screenshot(path=os.path.join(SHOT, f"{tag}-01-welcome.png"))
            pg.fill("#tourName", "Ayşe Yılmaz")
            pg.click('[data-tour="next"]'); pg.wait_for_timeout(900)
            check(f"[{tag}] isim kaydedildi", pg.evaluate("() => App.prefs.get('userName')") == "Ayşe Yılmaz")
            missing = []
            for i in range(1, 20):
                pg.wait_for_function("(i) => App.tour.current() === i && !document.querySelector('.tour__card.is-moving')", arg=i, timeout=8000)
                pg.wait_for_timeout(500)
                st = pg.evaluate("() => App.tour.steps[App.tour.current()]")
                center = pg.evaluate("() => document.querySelector('.tour').classList.contains('is-center')")
                if not st.get("center"):
                    # vurgu hedefi çevreliyor mu?
                    ok = pg.evaluate("""(sel) => {
                      const spot = document.querySelector('.tour__spot'); if (spot.hidden) return false;
                      const t = sel.split(',').map(s => document.querySelector(s.trim())).find(Boolean); if (!t) return false;
                      const a = spot.getBoundingClientRect(), r = t.getBoundingClientRect();
                      const vh = innerHeight, vw = innerWidth;
                      return a.left <= Math.max(r.left, 6) + 1 && a.top <= Math.max(r.top, 6) + 1 && a.right >= Math.min(r.right, vw - 6) - 1 && a.bottom >= Math.min(r.bottom, vh - 6) - 1; }""", st["target"])
                    if center or not ok: missing.append(st["id"])
                    # kart ekranda ve vurguyla çakışmıyor (masaüstünde)
                    inside = pg.evaluate("""() => { const c = document.querySelector('.tour__card').getBoundingClientRect();
                      return c.top >= 0 && c.left >= 0 && c.bottom <= innerHeight + 1 && c.right <= innerWidth + 1; }""")
                    if not inside: missing.append(st["id"] + ":card-off")
                if st["id"] in ("assistant", "aiPlan", "remind", "quiz", "feynman", "goals", "mistakes", "focus", "sync", "done") or i == 1:
                    pg.screenshot(path=os.path.join(SHOT, f"{tag}-{i+1:02d}-{st['id']}.png"))
                if st["id"] == "remind":
                    pg.click('[data-tour="remind"]'); pg.wait_for_timeout(900)
                    check(f"[{tag}] turda hatırlatıcı açıldı", pg.evaluate("() => App.reminders.config().on") is True)
                    check(f"[{tag}] onay bildirimi", any("Hatırlatıcılar açık" in n["title"] for n in pg.evaluate("() => window.__notifs")), pg.evaluate("() => window.__notifs"))
                    check(f"[{tag}] düğme 'açık' oldu", "açık" in pg.locator('[data-tour="remind"]').inner_text())
                if st["id"] == "sync":
                    check(f"[{tag}] ayarlar penceresi turda açık", pg.locator(".modal-backdrop").count() == 1)
                if i < 19: pg.click('[data-tour="next"]')
            check(f"[{tag}] tüm adımlarda hedef vurgulandı", not missing, missing)
            check(f"[{tag}] son adım: hazırsın + isim", "Ayşe" in pg.locator(".tour__body h2").inner_text(), pg.locator(".tour__body h2").inner_text())
            pg.click('[data-tour="next"]'); pg.wait_for_timeout(800)
            check(f"[{tag}] tur kapandı, ana sayfa", pg.locator(".tour").count() == 0 and pg.evaluate("() => location.hash") in ("#/", "") and pg.locator(".modal-backdrop").count() == 0)
            check(f"[{tag}] selamlama isimle", "Ayşe" in pg.locator(".home__title").inner_text())
            pg.reload(); pg.wait_for_timeout(1800)
            check(f"[{tag}] yeniden açılışta tur yok", pg.locator(".tour").count() == 0)
            ctx.close()

        # ================= 2) Turu geç / Esc + yarıda kalırsa kaldığı yerden =================
        ctx, pg = newctx(b)
        pg.goto(URL); pg.wait_for_timeout(2000)
        pg.click('[data-tour="next"]'); pg.wait_for_timeout(600); pg.click('[data-tour="next"]'); pg.wait_for_timeout(800)
        pg.reload(); pg.wait_for_timeout(2400)
        check("yarıda kalan tur kaldığı adımdan sürer", tour_step(pg) == 2, tour_step(pg))
        pg.keyboard.press("Escape"); pg.wait_for_timeout(600)
        check("Esc ile tur kapanır", pg.locator(".tour").count() == 0 and pg.evaluate("() => App.prefs.get('tourDone')") is True)
        # Ayarlar → yeniden izle
        pg.click("#settingsBtn"); pg.wait_for_timeout(300)
        check("ayarlarda hatırlatıcı ve tanıtım düğmeleri", pg.locator("#setRemind").count() == 1 and pg.locator("#setTour").count() == 1)
        pg.click("#setTour"); pg.wait_for_timeout(800)
        check("tanıtım yeniden başlatılabilir", tour_step(pg) == 0)
        pg.click('[data-tour="skip"]'); pg.wait_for_timeout(500)
        check("Turu geç", pg.locator(".tour").count() == 0)
        ctx.close()

        # ================= 3) Eski kullanıcı (güncelleme) → tur gösterilmez =================
        ctx, pg = newctx(b, init="if (!sessionStorage.getItem('x')) { sessionStorage.setItem('x',1); localStorage.setItem('da:pref:sidebarCollapsed','false'); localStorage.setItem('da:pref:lang','\"tr\"'); }")
        pg.goto(URL); pg.wait_for_timeout(2200)
        check("eski kullanıcıya tur gösterilmez", pg.locator(".tour").count() == 0)
        check("eski kullanıcı işaretlendi", pg.evaluate("() => App.prefs.get('tourDone')") == "existing")
        ctx.close()
        # Ayar yok ama veritabanında kayıt var (ör. eşitlemeyle gelmiş veri) → yine eski kullanıcı
        ctx, pg = newctx(b)
        pg.goto(URL + "?x"); pg.wait_for_timeout(1500)
        pg.evaluate("async () => { await App.db.put('exams', {id:'e1', type:'TYT', name:'Deneme 1', date:'2026-10-01', answers:{}}); localStorage.clear(); }")
        pg.reload(); pg.wait_for_timeout(2200)
        check("veri olan kurulumda tur yok", pg.locator(".tour").count() == 0, pg.evaluate("() => App.prefs.get('tourDone')"))
        ctx.close()

        # ================= 4) Ders hatırlatıcısı (tarayıcı/masaüstü): saati gelince bildirim =================
        ctx, pg = newctx(b, init=NOTIF_STUB + "localStorage.setItem('da:pref:tourDone','true');")
        pg.clock.install(time="2026-10-12T16:52:00")      # Pazartesi
        pg.goto(URL); pg.wait_for_timeout(1500)
        pg.evaluate("""async () => { await App.db.put('schedules', { id: 'user', blocks: [
            { id: 'b1', day: 0, start: '17:00', end: '17:50', subject: 'Matematik', kind: 'ders', note: 'Türev' },
            { id: 'b2', day: 0, start: '18:00', end: '18:10', subject: 'Mola', kind: 'mola' },
            { id: 'b3', day: 2, start: '19:00', end: '19:40', subject: 'Fizik', kind: 'soru' } ] }); }""")
        pg.evaluate("() => location.hash = '#/program/benim'"); pg.wait_for_timeout(800)
        check("Programım'da hatırlatıcı düğmesi", pg.locator("#remindBtn").count() == 1 and "Hatırlatıcı" in pg.locator("#remindBtn").inner_text())
        pg.click("#remindBtn"); pg.wait_for_timeout(500)
        pg.screenshot(path=os.path.join(SHOT, "remind-modal-off.png"))
        pg.select_option("#remLead", "5")
        pg.check("#remOn"); pg.wait_for_timeout(800)
        st = pg.locator("#remStatus").inner_text()
        check("durum: 2 blok (mola hariç)", "2 ders bloğu" in st, st)
        pg.screenshot(path=os.path.join(SHOT, "remind-modal-on.png"))
        pg.keyboard.press("Escape"); pg.wait_for_timeout(400)
        check("düğme '5 dk önce' gösterir", "5 dk önce" in pg.locator("#remindBtn").inner_text(), pg.locator("#remindBtn").inner_text())
        pg.evaluate("() => { window.__notifs = []; }")
        pg.clock.run_for("02:40")                          # 16:54:40 → 16:55 tetiklenmeli (17:00 - 5 dk)
        n1 = pg.evaluate("() => window.__notifs.map(n => n.title)")
        check("16:55'ten önce bildirim yok", not any("Matematik" in x for x in n1), n1)
        pg.clock.run_for("01:00")
        n2 = pg.evaluate("() => window.__notifs")
        check("17:00 dersi için 5 dk önce bildirim", any(x["title"] == "5 dk sonra: Matematik" for x in n2), n2)
        check("bildirim metninde saat ve not", any("17:00–17:50" in (x["body"] or "") and "Türev" in (x["body"] or "") for x in n2), n2)
        pg.clock.run_for("20:00")
        n3 = pg.evaluate("() => window.__notifs.map(n => n.title)")
        check("aynı ders için tek bildirim; mola için yok", sum(1 for x in n3 if "Matematik" in x) == 1 and not any("Mola" in x for x in n3), n3)
        # Bildirime dokununca odak sayacı o dersle
        pg.evaluate("() => App.notify.open({ kind: 'study', subject: 'Matematik' })"); pg.wait_for_timeout(600)
        check("bildirim → Odak sayacı + ders seçili", pg.evaluate("() => location.hash") == "#/odak" and pg.evaluate("() => App.focus.state().subject") == "Matematik")
        # Programdan blok silinince hatırlatıcı listesi güncellenir
        pg.evaluate("async () => { const p = await App.db.get('schedules','user'); p.blocks = p.blocks.filter(b => b.id !== 'b3'); await App.db.put('schedules', p); }")
        pg.clock.run_for("00:02")
        pg.wait_for_timeout(300)
        check("program değişince yeniden kuruldu", pg.evaluate("() => App.reminders.state.count") == 1, pg.evaluate("() => App.reminders.state.count"))
        # Uyku sonrası (bilgisayar kapanıp açıldı) eski bildirimler yağmaz
        pg.evaluate("() => { window.__notifs = []; }")
        ctx.close()

        # ================= 5) Android eklentisi taklidi: haftalık alarmlar doğru kurulur =================
        LNMOCK = NOTIF_STUB + """
        localStorage.setItem('da:pref:tourDone','true');
        window.__ln = { scheduled: [], cancelled: [], channels: [], perms: 'prompt' };
        window.Capacitor = { isNativePlatform: () => true, getPlatform: () => 'android', Plugins: { LocalNotifications: {
          checkPermissions: async () => ({ display: window.__ln.perms }),
          requestPermissions: async () => { window.__ln.perms = 'granted'; return { display: 'granted' }; },
          createChannel: async (c) => { window.__ln.channels.push(c.id); },
          registerActionTypes: async () => {},
          getPending: async () => ({ notifications: window.__ln.scheduled.filter(n => n.schedule.on).map(n => ({ id: n.id })) }),
          cancel: async (o) => { const ids = o.notifications.map(n => n.id); window.__ln.cancelled.push(...ids); window.__ln.scheduled = window.__ln.scheduled.filter(n => !ids.includes(n.id)); },
          schedule: async (o) => { window.__ln.scheduled.push(...o.notifications); return { notifications: o.notifications.map(n => ({ id: n.id })) }; },
          addListener: async (ev, fn) => { window.__ln.listener = fn; return { remove(){} }; }
        } } };
        """
        ctx, pg = newctx(b, mobile=True, init=LNMOCK)
        pg.goto(URL); pg.wait_for_timeout(1500)
        check("Android: platform algılandı", pg.evaluate("() => App.notify.native") is True)
        pg.evaluate("""async () => { await App.db.put('schedules', { id: 'user', blocks: [
            { id: 'a', day: 0, start: '00:03', end: '00:45', subject: 'Kimya', kind: 'ders' },
            { id: 'b', day: 6, start: '10:00', end: '10:50', subject: 'Türkçe', kind: 'tekrar' } ] }); }""")
        r = pg.evaluate("() => App.reminders.enable(10)")
        check("Android: izin istendi ve açıldı", r["ok"] and r["count"] == 2, r)
        sch = pg.evaluate("() => window.__ln.scheduled.filter(n => n.schedule.on)")
        on = {n["extra"]["subject"]: n["schedule"]["on"] for n in sch}
        # Pzt 00:03 - 10 dk → Pazar 23:53 (Capacitor: Pazar = 1); Cmt... Pazar 10:00 - 10 → Pazar 09:50 (1)
        check("Android: gece yarısını geçen hatırlatıcı önceki güne", on.get("Kimya") == {"weekday": 1, "hour": 23, "minute": 53}, on)
        check("Android: Pazar günü doğru (1)", on.get("Türkçe") == {"weekday": 1, "hour": 9, "minute": 50}, on)
        check("Android: kanal ve eylem", "study" in pg.evaluate("() => window.__ln.channels") and all(n.get("actionTypeId") == "STUDY" for n in sch))
        check("Android: onay bildirimi zamanlandı", any(not n["schedule"].get("on") and "açık" in n["title"] for n in pg.evaluate("() => window.__ln.scheduled")))
        pg.evaluate("() => App.reminders.disable()"); pg.wait_for_timeout(200)
        check("Android: kapatınca alarmlar iptal", pg.evaluate("() => window.__ln.scheduled.filter(n => n.schedule.on).length") == 0)
        # Odak sayacı: arka planda bitince bildirim (zamanlanmış)
        pg.evaluate("() => { App.focus.reset(); App.focus.start(); }"); pg.wait_for_timeout(300)
        f = pg.evaluate("() => window.__ln.scheduled.find(n => n.id === 900)")
        check("Android: odak bitişi için bildirim zamanlandı", f and f["channelId"] == "focus", f)
        pg.evaluate("() => App.focus.pause()"); pg.wait_for_timeout(300)
        check("Android: duraklatınca iptal", pg.evaluate("() => !window.__ln.scheduled.some(n => n.id === 900)"))
        pg.evaluate("() => App.focus.reset()")
        # "Odak sayacını başlat" eylemi
        pg.evaluate("() => window.__ln.listener({ actionId: 'start', notification: { extra: { kind: 'study', subject: 'Kimya' } } })"); pg.wait_for_timeout(700)
        check("Android: bildirimdeki 'başlat' sayacı başlatır", pg.evaluate("() => App.focus.state().running && App.focus.state().subject === 'Kimya'"))
        pg.evaluate("() => App.focus.reset()")
        ctx.close()

        # ================= 6) Klavye (iPhone tarzı: sayfa küçülmez, görünen alan küçülür) =================
        VV = """
        (function(){ const listeners = {}; let h = null;
          const vv = { get height(){ return h == null ? innerHeight : h; }, get width(){ return innerWidth; }, offsetTop: 0, offsetLeft: 0, scale: 1,
            addEventListener(t, f){ (listeners[t] = listeners[t] || []).push(f); }, removeEventListener(){} };
          Object.defineProperty(window, 'visualViewport', { get: () => vv });
          window.__kb = (px) => { h = px == null ? null : innerHeight - px; (listeners.resize || []).forEach(f => f()); };
        })();
        localStorage.setItem('da:pref:tourDone','true');
        """
        ctx, pg = newctx(b, mobile=True, init=VV)
        pg.goto(URL); pg.wait_for_timeout(1500)
        # sohbete geç (yazı kutusu altta)
        pg.fill("#composerInput", "merhaba"); pg.keyboard.press("Enter")
        pg.wait_for_selector(".msg__foot", timeout=20000)
        pg.click("#composerInput"); pg.wait_for_timeout(100)
        pg.evaluate("() => window.__kb(330)"); pg.wait_for_timeout(500)
        box = pg.evaluate("() => { const c = document.querySelector('.chat__bottom .composer').getBoundingClientRect(); return { bottom: c.bottom, vis: visualViewport.height, app: document.querySelector('.app').getBoundingClientRect().height }; }")
        check("klavye açıkken uygulama görünen alana sığar", abs(box["app"] - box["vis"]) < 2, box)
        check("yazı kutusu klavyenin üstünde", box["bottom"] <= box["vis"] + 1, box)
        pg.screenshot(path=os.path.join(SHOT, "phone-keyboard.png"))
        pg.evaluate("() => { document.activeElement.blur(); window.__kb(null); }"); pg.wait_for_timeout(400)
        check("klavye kapanınca eski boyut", pg.evaluate("() => !document.documentElement.classList.contains('kb-open') && Math.abs(document.querySelector('.app').getBoundingClientRect().height - innerHeight) < 2"))
        ctx.close()

        # ================= 7) İngilizce tur metinleri =================
        ctx, pg = newctx(b, init="if (!sessionStorage.getItem('y')) { sessionStorage.setItem('y',1); } ")
        pg.goto(URL); pg.wait_for_timeout(1800)
        pg.evaluate("() => App.i18n.setLang('en')"); pg.wait_for_timeout(500)
        pg.click('[data-tour="next"]'); pg.wait_for_timeout(1200)
        check("İngilizce tur", "assistant" in pg.locator(".tour__body h2").inner_text().lower(), pg.locator(".tour__body h2").inner_text())
        pg.screenshot(path=os.path.join(SHOT, "desk-en-assistant.png"))
        ctx.close()
        b.close()
finally:
    for pr in procs: pr.terminate()
print("\nerrors:", errs[:10])
print("%d/%d PASS" % (sum(res), len(res)))
