"""Kare kare (sanal zamanlı) uygulama kaydı → pürüzsüz 30 fps klipler.
Sayfanın saati (performance.now, Date.now, requestAnimationFrame, setTimeout/setInterval, CSS/Web animasyonları)
gerçek zamandan koparılır; her karede saat 1/30 sn ilerletilir ve ekran görüntüsü alınır. Bilgisayar ne kadar
yavaş olursa olsun video akıcı olur.
Kullanım: python3 cap.py desktop|phone [klip ...]"""
import asyncio, base64, json, os, sys, time, socket, subprocess
from playwright.async_api import async_playwright

HERE = os.path.dirname(os.path.abspath(__file__)); SP = os.path.dirname(HERE)
exec(open(os.path.join(HERE, "stubs.py")).read())
DEV = sys.argv[1]; ONLY = sys.argv[2:]
FPS = 30; DT = 1000 / FPS
if DEV == "desktop": VW, VH, DPR = 1600, 900, 1.2
else: VW, VH, DPR = 390, 844, 2
OUTROOT = os.path.join(HERE, "clips", DEV); os.makedirs(OUTROOT, exist_ok=True)

def up(port):
    s = socket.socket(); r = s.connect_ex(("127.0.0.1", port)); s.close(); return r == 0
procs = []
if not up(8787): procs.append(subprocess.Popen(["node", "--no-warnings", os.path.join(SP, "worker_dev2.mjs")], stdout=subprocess.DEVNULL))
if not up(8765): procs.append(subprocess.Popen([sys.executable, "-m", "http.server", "8765", "--bind", "127.0.0.1", "-d", "/home/claude/ders-asistani"], stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL))
time.sleep(1.2)

CLOCK = r"""(() => {
  const RT = window.setTimeout.bind(window);
  let vt = 0; const base = Date.now();
  performance.now = () => vt;
  Date.now = () => base + vt;
  let rafQ = [], rafId = 0;
  window.requestAnimationFrame = (cb) => { const id = ++rafId; rafQ.push([id, cb]); return id; };
  window.cancelAnimationFrame = (id) => { rafQ = rafQ.filter((x) => x[0] !== id); };
  const timers = new Map(); let tid = 1e6;
  window.setTimeout = (fn, ms, ...a) => { const id = ++tid; timers.set(id, { at: vt + Math.max(0, +ms || 0), fn, a }); return id; };
  window.setInterval = (fn, ms, ...a) => { const id = ++tid; const iv = Math.max(4, +ms || 0); timers.set(id, { at: vt + iv, fn, a, iv }); return id; };
  window.clearTimeout = window.clearInterval = (id) => { timers.delete(id); };
  const anStart = new WeakMap();
  const yieldReal = () => new Promise((r) => RT(r, 0));
  window.__vt = () => vt;
  window.__advance = async (dt) => {
    const end = vt + dt;
    for (let g = 0; g < 4000; g++) {
      let best = null;
      for (const [id, t] of timers) if (t.at <= end && (!best || t.at < best[1].at)) best = [id, t];
      if (!best) break;
      const [id, t] = best; vt = Math.max(vt, t.at);
      if (t.iv) t.at += t.iv; else timers.delete(id);
      try { typeof t.fn === "function" ? t.fn(...t.a) : (0, eval)(t.fn); } catch (e) { console.error(e); }
      await Promise.resolve(); await Promise.resolve();
      if (g % 8 === 7) await yieldReal();
    }
    vt = end;
    await yieldReal();
    try {
      for (const an of document.getAnimations()) {
        if (!anStart.has(an)) { anStart.set(an, vt - (Number(an.currentTime) || 0)); try { an.pause(); } catch (e) {} }
        try { an.currentTime = vt - anStart.get(an); } catch (e) {}
      }
    } catch (e) {}
    const q = rafQ; rafQ = [];
    for (const [, cb] of q) { try { cb(vt); } catch (e) { console.error(e); } }
    await Promise.resolve();
  };
})();"""

CUR_JS = r"""(phone) => {
  if (document.getElementById('pv')) return;
  const st = document.createElement('style');
  st.textContent = `#pv{position:fixed;inset:0;pointer-events:none;z-index:2147483646}
#pvCur{position:absolute;left:0;top:0;width:24px;height:24px;transform:translate(-100px,-100px);filter:drop-shadow(0 2px 3px rgba(0,0,0,.55))}
#pvTap{position:absolute;left:0;top:0;width:44px;height:44px;margin:-22px 0 0 -22px;border-radius:50%;background:rgba(255,255,255,.35);border:2px solid rgba(255,255,255,.85);box-shadow:0 0 18px rgba(120,170,255,.7);transform:translate(-100px,-100px)}
#pvRip{position:absolute;width:48px;height:48px;margin:-24px 0 0 -24px;border-radius:50%;border:3px solid #6aa0ff;opacity:0}
.lab-hand__cam{display:none!important}
.voice-answer{max-height:132px!important;overflow:hidden!important}.voice-tip{display:none!important}
.toast,.toasts{display:none!important}
::-webkit-scrollbar{width:0!important;height:0!important}`;
  document.head.appendChild(st);
  const pv = document.createElement('div'); pv.id = 'pv';
  pv.innerHTML = '<div id="pvRip"></div>' + (phone ? '<div id="pvTap"></div>' : '<svg id="pvCur" viewBox="0 0 24 24"><path d="M3 2 L3 19 L7.6 14.8 L10.6 21.5 L13.4 20.3 L10.4 13.7 L16.6 13.7 Z" fill="#fff" stroke="#111" stroke-width="1.4" stroke-linejoin="round"/></svg>');
  document.body.appendChild(pv);
  const cur = pv.querySelector(phone ? '#pvTap' : '#pvCur'), rip = pv.querySelector('#pvRip');
  window.__cur = (x, y, show) => { cur.style.display = show ? '' : 'none'; cur.style.transform = phone ? 'translate(' + x + 'px,' + y + 'px)' : 'translate(' + (x - 3) + 'px,' + (y - 2) + 'px)'; };
  window.__rip = (x, y, k) => { rip.style.left = x + 'px'; rip.style.top = y + 'px'; rip.style.opacity = String(Math.max(0, 1 - k)); rip.style.transform = 'scale(' + (0.3 + k) + ')'; };
  new MutationObserver(() => { if (pv.nextSibling) document.body.appendChild(pv); }).observe(document.body, { childList: true });
}"""

async def main():
    async with async_playwright() as p:
        b = await p.chromium.launch(args=["--force-device-scale-factor=%g" % DPR, "--use-gl=angle", "--use-angle=swiftshader", "--enable-unsafe-swiftshader",
                                          "--use-fake-ui-for-media-stream", "--use-fake-device-for-media-stream", "--hide-scrollbars"])
        ctx = await b.new_context(viewport={"width": VW, "height": VH}, device_scale_factor=DPR, color_scheme="dark", locale="tr-TR")
        await ctx.grant_permissions(["camera", "microphone"], origin="http://localhost:8765")
        await ctx.route("**/js/config.js", lambda r: r.fulfill(status=200, content_type="text/javascript", body='App.config = { serverUrl: "http://127.0.0.1:8787" };'))
        await ctx.add_init_script("try { localStorage.setItem('da:pref:tourDone', 'true'); localStorage.setItem('da:pref:theme', '\"dark\"'); } catch (e) {}")
        await ctx.add_init_script(CLOCK)
        pg = await ctx.new_page()
        errs = []; pg.on("pageerror", lambda e: errs.append(str(e)[:200]))
        cdp = await ctx.new_cdp_session(pg)
        PHONE = DEV == "phone"
        st = {"cap": False, "dir": None, "n": 0, "x": VW / 2, "y": VH * .6, "show": False}

        async def frame():
            await pg.evaluate("(dt) => window.__advance(dt)", DT)
            await pg.evaluate("([x, y, s]) => window.__cur && window.__cur(x, y, s)", [st["x"], st["y"], st["show"]])
            if st["cap"]:
                r = await cdp.send("Page.captureScreenshot", {"format": "jpeg", "quality": 92})
                st["n"] += 1
                with open(os.path.join(st["dir"], "%05d.jpg" % st["n"]), "wb") as f: f.write(base64.b64decode(r["data"]))
        async def adv(ms):
            for _ in range(max(1, round(ms / DT))): await frame()
        async def settle(ms=1500):
            """yükleme: saat ilerler, kare alınmaz"""
            was = st["cap"]; st["cap"] = False
            t0 = time.time()
            while time.time() - t0 < ms / 1000:
                await pg.evaluate("(dt) => window.__advance(dt)", DT); await asyncio.sleep(0.02)
            st["cap"] = was
        async def go(h, ms=1500):
            await pg.evaluate("(h) => { location.hash = h; window.scrollTo(0, 0); }", h); await settle(ms)
            await pg.evaluate("() => { window.scrollTo(0, 0); const v = document.querySelector('#view'); if (v) v.scrollTop = 0; }"); await settle(200)
        def ease(k): return k * k * (3 - 2 * k)
        async def glide(x, y, ms=600):
            x0, y0 = st["x"], st["y"]; n = max(1, round(ms / DT)); st["show"] = True
            for i in range(1, n + 1):
                e = ease(i / n); st["x"], st["y"] = x0 + (x - x0) * e, y0 + (y - y0) * e
                await pg.mouse.move(st["x"], st["y"]); await frame()
        async def pos(sel, scroll=True):
            loc = pg.locator(sel).first
            if scroll:
                need = await loc.evaluate("(e) => { const r = e.getBoundingClientRect(); return r.top < 70 || r.bottom > innerHeight - 90; }")
                if need:
                    dy = await loc.evaluate("(e) => { const r = e.getBoundingClientRect(); return r.top + r.height / 2 - innerHeight / 2; }")
                    await scroll_by(dy, 500)
            bb = await loc.bounding_box()
            return bb["x"] + bb["width"] / 2, bb["y"] + bb["height"] / 2
        async def tap_fx(x, y):
            for i in range(10):
                await pg.evaluate("([x, y, k]) => window.__rip(x, y, k)", [x, y, i / 10]); await frame()
            await pg.evaluate("([x, y]) => window.__rip(x, y, 1)", [x, y])
        async def click(sel, ms=550, after=300, scroll=True):
            x, y = await pos(sel, scroll)
            await glide(x, y, ms); await adv(70)
            await pg.mouse.click(x, y)
            await tap_fx(x, y); await adv(after)
        async def scroll_by(dy, ms=900):
            n = max(1, round(ms / DT))
            el = """(dy) => { const c = [document.scrollingElement, document.querySelector('#view'), document.querySelector('main')].filter(Boolean);
              const el = c.find((e) => e.scrollHeight > e.clientHeight + 10 && (e === document.scrollingElement || /auto|scroll/.test(getComputedStyle(e).overflowY))) || document.scrollingElement;
              window.__se = el; window.__sy0 = el.scrollTop; }"""
            await pg.evaluate(el, dy)
            for i in range(1, n + 1):
                k = i / n; e = 2 * k * k if k < .5 else 1 - (-2 * k + 2) ** 2 / 2
                await pg.evaluate("(y) => { window.__se.scrollTop = window.__sy0 + y; }", dy * e); await frame()
        async def drag(x0, y0, x1, y1, ms=1200):
            await glide(x0, y0, 350); await pg.mouse.down()
            n = max(1, round(ms / DT))
            for i in range(1, n + 1):
                e = ease(i / n); st["x"], st["y"] = x0 + (x1 - x0) * e, y0 + (y1 - y0) * e
                await pg.mouse.move(st["x"], st["y"]); await frame()
            await pg.mouse.up()
        async def typeit(text, per=2):
            for ch in text:
                await pg.keyboard.type(ch)
                for _ in range(per): await frame()
        async def slide(sel, a, b, ms, mx=None):
            n = max(1, round(ms / DT))
            for i in range(1, n + 1):
                v = a + (b - a) * ease(i / n)
                await pg.evaluate("([s, v]) => { const i = document.querySelector(s); if (!i) return; i.value = v; i.dispatchEvent(new Event('input', { bubbles: true })); }", [sel, v]); await frame()
        async def box(sel):
            return await pg.locator(sel).first.bounding_box()
        async def hide(): st["show"] = False

        # ---------- açılış ----------
        await pg.goto("http://localhost:8765/"); await settle(2500)
        await pg.evaluate("() => { App.prefs.set('theme', 'dark'); document.documentElement.setAttribute('data-theme', 'dark'); }")
        await pg.evaluate("() => App.demo.load()"); await settle(2500)
        await pg.evaluate(STUBS)
        await pg.evaluate(CUR_JS, PHONE)
        for h in ("#/tercih", "#/kure", "#/modeller/dna", "#/modeller/molekul", "#/zaman", "#/podcast/10/fizik/u1/k3", "#/lab/atis"):
            await go(h, 1500)
        await go("#/", 1000)

        X = lambda f: VW * f
        Y = lambda f: VH * f

        # ---------- klipler ----------
        async def c_home():
            await go("#/", 800); st["x"], st["y"] = X(.7), Y(.85)
            st["cap"] = True
            await adv(300)
            await glide(*(await pos('a.home-today', False)), 700)
            await adv(300)
            await glide(*(await pos('[data-prompt]', False)), 600)
            await adv(900)
        async def c_chat():
            await go("#/", 800); st["cap"] = True
            await click("#composerInput", 500, 150, False)
            await typeit("Eğik atışta menzil en fazla hangi açıda olur? Neden?", 2)
            await adv(250); await pg.keyboard.press("Enter")
            await hide(); await adv(3400)
            await scroll_by(420 if not PHONE else 900, 1800); await adv(1600)
        async def c_today():
            await go("#/bugun", 1500); st["cap"] = True
            await adv(500); await scroll_by(380 if not PHONE else 700, 1700); await adv(500); await scroll_by(380 if not PHONE else 700, 1700); await adv(500)
        async def c_topic():
            await go("#/konular/10/fizik/u1/k3", 1800); st["cap"] = True
            await adv(500); await scroll_by(600 if not PHONE else 900, 2200); await adv(400); await scroll_by(700 if not PHONE else 1100, 2200); await adv(600)
        async def c_podcast():
            await go("#/podcast/10/fizik/u1/k3", 1800); st["cap"] = True
            await adv(400); await click("#pdPlay", 600, 300)
            await hide(); await adv(4500)
            await pg.evaluate("() => App.speech.stopSaying()")
        async def c_exams():
            await go("#/denemeler", 1800); st["cap"] = True
            await adv(500); await scroll_by(320 if not PHONE else 600, 1500); await adv(600)
            await click('button.tab[data-type="AYT"]', 600, 1200)
        async def c_puan():
            await go("#/puan", 1500); st["cap"] = True
            await adv(400); await scroll_by(330 if not PHONE else 700, 1500); await adv(1200)
        async def c_tercih():
            await go("#/tercih", 2500); st["cap"] = True
            await adv(400); await click('button.tc-band--fit', 600, 600)
            await click('button.tc-city[data-city="Ankara"]', 600, 600)
            await scroll_by(380 if not PHONE else 700, 1500); await adv(500)
            await click('button.tc-add', 500, 700)
        async def c_cards():
            await go("#/yanlislar", 1500); st["cap"] = True
            await adv(500); await scroll_by(300 if not PHONE else 600, 1500); await adv(700)
        async def c_lab():
            await go("#/lab/atis", 2200)
            await pg.click('[data-mode="3d"]'); await settle(2500)
            st["cap"] = True
            cb = await box(".lab canvas, #view canvas"); cx, cy = cb["x"] + cb["width"] / 2, cb["y"] + cb["height"] / 2
            await drag(cx - cb["width"] * .25, cy, cx + cb["width"] * .3, cy - 30, 1700); await adv(300)
            x, y = await pos('input[data-p="a"]'); await glide(x, y, 500)
            await slide('input[data-p="a"]', 45, 70, 1500); await adv(300)
            await click('[data-lab="reset"]', 500, 1500)
        async def c_holo():
            await go("#/lab/atis", 2200)
            await pg.click('[data-mode="3d"]'); await settle(2000)
            await pg.click('[data-holo-start]'); await settle(1500)
            try: await pg.click('[data-holo="src"]')
            except Exception: pass
            await settle(800)
            st["cap"] = True
            for (fx, fy) in ((.2, .35), (.8, .3), (.75, .7), (.25, .65), (.5, .45)):
                await glide(X(fx), Y(fy), 1200)
            await pg.keyboard.press("Escape"); await settle(600)
        async def c_hand():
            await go("#/lab/atis", 2200)
            await pg.click('[data-mode="3d"]'); await settle(2000)
            await pg.click('.lab__handbtn'); await settle(2500)
            st["cap"] = True; await hide()
            def bx(x, y, lab, s=90): return {"bbox": [x - s / 2, y - s / 2, s, s], "label": lab}
            async def feed(seq):
                for preds in seq:
                    await pg.evaluate("(p) => window.__pred = p", preds); await frame()
            await feed([[bx(180 + i * 9, 250, "open")] for i in range(40)])
            await feed([[bx(540 - i * 9, 240, "open")] for i in range(40)])
            await feed([[bx(200 - i * 3, 240, "open"), bx(440 + i * 3, 240, "open")] for i in range(36)])
            await feed([[bx(320, 250, "closed")] for _ in range(26)])
            await feed([[bx(250 + i * 4, 200 + (i % 20) * 3, "point")] for i in range(40)])
            await pg.evaluate("() => window.__pred = []"); await adv(400)
            await pg.click('.lab__handbtn'); await settle(500)
        async def c_dna():
            await go("#/modeller/dna", 2500); st["cap"] = True
            await adv(300)
            x, y = await pos('#hmEx'); await glide(x, y, 500)
            await slide('#hmEx', 0, 1, 2200); await adv(400)
            await click('.hm-part[data-pid="at"]', 600, 1100)
            await click('.hm-part[data-pid="gc"]', 500, 1100)
        async def c_cell():
            await go("#/modeller/hucre", 2500); st["cap"] = True
            await adv(300); x, y = await pos('#hmEx'); await glide(x, y, 400)
            await slide('#hmEx', 0, .8, 2000); await adv(1500)
        async def c_heart():
            await go("#/modeller/kalp", 2500); st["cap"] = True
            await adv(2500)
        async def c_mol():
            await go("#/modeller/molekul", 2500); st["cap"] = True
            await adv(400)
            async def proj(i):
                return await pg.evaluate("""(i) => { const S = window.__S3._S, a = S.o.atoms[i], v = new S.THREE.Vector3(); a.m.getWorldPosition(v); v.project(S.camera); const r = S.renderer.domElement.getBoundingClientRect(); return [r.left + (v.x + 1) / 2 * r.width, r.top + (1 - v.y) / 2 * r.height]; }""", i)
            async def bond(i, j):
                a = await proj(i); b2 = await proj(j)
                await drag(a[0], a[1], b2[0] + 14, b2[1], 1100); await adv(700)
            await bond(1, 2); await adv(900)
            await bond(1, 0); await bond(2, 0); await hide(); await adv(2600)
        async def c_globe():
            await go("#/kure", 3000); st["cap"] = True
            cb = await box("#kStage canvas"); cx, cy = cb["x"] + cb["width"] / 2, cb["y"] + cb["height"] / 2
            await drag(cx - cb["width"] * .25, cy, cx + cb["width"] * .2, cy - 20, 1500); await adv(200)
            await click('#kSide input[data-l="levha"]', 500, 400)
            await click('#kSide input[data-l="deprem"]', 400, 900)
            await click("#kQ", 500, 100)
            await typeit("Türkiye", 3)
            await pg.locator("#kQ").dispatch_event("change"); await hide(); await adv(2600)
        async def c_sun():
            await go("#/kure", 3000)
            await pg.evaluate("""() => ['gunes'].forEach((l) => document.querySelector('#kSide input[data-l="' + l + '"]').click())"""); await settle(800)
            st["cap"] = True
            await click('[data-doy="172"]', 500, 1500)
            await click('[data-doy="355"]', 500, 1600)
            await click('#kSide input[data-l="iklim"]', 500, 1200)
        async def c_atlas():
            await go("#/atlas/dunya", 2200); st["cap"] = True
            await adv(400); await click('[data-mode="find"]', 600, 1600)
        async def c_zaman():
            await go("#/zaman", 2000); st["cap"] = True
            await adv(300); await click('[data-era="kurtulus"]', 600, 1800)
        async def c_journey():
            await go("#/yolculuk", 1800); st["cap"] = True
            await adv(300); await click('a.yl-world[href="#/yolculuk/biyoloji"]', 600, 300)
            await settle(1200); await adv(600); await scroll_by(350 if not PHONE else 600, 1400); await adv(500)
        async def c_career():
            await go("#/kariyer", 1800); st["cap"] = True
            await adv(300); await click('a.kr-job[href="#/kariyer/m/yapayzeka"]', 600, 300)
            await settle(1000); await adv(400); await scroll_by(380 if not PHONE else 700, 1400); await adv(500)
        async def c_video():
            await go("#/video", 1500); st["cap"] = True
            await click("#vdUrl", 500, 100); await typeit("https://youtube.com/watch?v=ders", 1); await adv(800)
        async def c_paragraf():
            await go("#/paragraf", 1500); st["cap"] = True
            await adv(400); await scroll_by(260 if not PHONE else 500, 1300); await adv(600)
        async def c_teacher():
            await go("#/", 1000)
            await pg.evaluate("() => App.voice.open()"); await settle(1200)
            try: await pg.click("#vHoloBtn")
            except Exception: pass
            await settle(2500)
            stt = await pg.evaluate("() => App.voice._state()")
            st["cap"] = True; await hide()
            if stt and stt.get("phase") == "idle":
                try: await pg.click("#vMain")
                except Exception: pass
            for _ in range(10):
                await pg.evaluate("() => { let e = document.querySelector('#vHolo'); while (e) { if (e.scrollTop) e.scrollTop = 0; e = e.parentElement; } }")
                await adv(1000)
            await pg.evaluate("() => { App.speech.stopSaying(); App.voice.close(); }"); await settle(500)

        async def c_yazili():
            await go("#/yazili", 1500); st["cap"] = True
            await adv(400); await click('.yz-seg [data-g="10"]', 500, 500)
            await click('.yz-subj[href="#/yazili/10/fizik"]', 600, 200)
            await settle(900); await adv(500)
            await click('.yz-exam a[href="#/yazili/10/fizik/d1"], a[href="#/yazili/10/fizik/d1"]', 600, 200)
            await settle(1000); await adv(600)
            await click('textarea[data-a="0"]', 600, 100)
            await typeit("a = 2 m/s², 8 saniyede yol 64 m; ortalama hız 6,4 m/s.", 1); await adv(500)
            await hide(); await scroll_by(500 if not PHONE else 800, 1400); await adv(400)
        async def c_yazkey():
            await go("#/yazili/10/fizik/d1", 1500)
            await pg.evaluate("() => { App.ui.confirm = async () => true; }")
            await pg.evaluate("() => { const b = document.querySelector('#yzDone'); b && b.click(); }"); await settle(900)
            await pg.evaluate("() => { const k = document.querySelector('.yz-key'); if (k) k.scrollIntoView({ block: 'start' }); window.scrollBy(0, -90); const v = document.querySelector('#view'); if (v && k) v.scrollTop += k.getBoundingClientRect().top - 120; }"); await settle(400)
            st["cap"] = True
            await adv(500)
            await click('input[name="r0"][value="14"]', 600, 500)
            await scroll_by(420 if not PHONE else 700, 1500); await adv(300)
            await click('input[name="r1"]', 500, 700)
            await hide(); await adv(600)

        CLIPS = [("home", c_home), ("yazili", c_yazili), ("yazkey", c_yazkey), ("chat", c_chat), ("today", c_today), ("topic", c_topic), ("podcast", c_podcast), ("exams", c_exams), ("puan", c_puan),
                 ("tercih", c_tercih), ("cards", c_cards), ("lab", c_lab), ("holo", c_holo), ("hand", c_hand), ("dna", c_dna), ("cell", c_cell), ("heart", c_heart),
                 ("mol", c_mol), ("globe", c_globe), ("sun", c_sun), ("atlas", c_atlas), ("zaman", c_zaman), ("journey", c_journey), ("career", c_career),
                 ("video", c_video), ("paragraf", c_paragraf), ("teacher", c_teacher)]
        meta = {}
        mp = os.path.join(OUTROOT, "meta.json")
        if os.path.exists(mp): meta = json.load(open(mp))
        for name, fn in CLIPS:
            if ONLY and name not in ONLY: continue
            d = os.path.join(OUTROOT, name); os.makedirs(d, exist_ok=True)
            for f in os.listdir(d): os.remove(os.path.join(d, f))
            st.update({"dir": d, "n": 0, "cap": False})
            t0 = time.time(); e0 = len(errs)
            try: await fn()
            except Exception as e: print("KLİP HATASI", name, repr(e)[:300])
            st["cap"] = False; st["show"] = False
            meta[name] = st["n"]
            print(name, st["n"], "kare", round(time.time() - t0), "sn", errs[e0:][:2], flush=True)
            json.dump(meta, open(mp, "w"))
        await ctx.close(); await b.close()

try: asyncio.run(main())
finally:
    for pr in procs: pr.terminate()
