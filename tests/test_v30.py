exec(open("hdr.py").read())
import json
SHOT = os.path.join(SP, "v30"); os.makedirs(SHOT, exist_ok=True)
FAKE = {"title": "Türev ve Teğet Eğimi", "subject": "matematik",
  "summary": ["Türev, anlık değişim hızıdır.", "$f'(x)=\\lim_{h\\to0}\\frac{f(x+h)-f(x)}{h}$", "Teğetin eğimi o noktadaki türevdir.", "Kuvvet kuralı: $(x^n)'=nx^{n-1}$"],
  "chapters": [{"t": "0:00", "title": "Giriş", "note": "Değişim hızı"}, {"t": "2:15", "title": "Limit tanımı", "note": "h sıfıra giderken"}, {"t": "1:05:30", "title": "Örnekler", "note": "Soru çözümü"}, {"t": "bozuk", "title": "x"}],
  "cards": [{"q": "Türev nedir?", "a": "Anlık değişim hızı."}, {"q": "$(x^3)'$", "a": "$3x^2$"}, {"front": "Teğet eğimi", "back": "f'(a)"}],
  "quiz": [{"q": "$(x^2)'$ nedir?", "o": ["A) $2x$", "B) $x$", "C) $2$", "D) $x^2$"], "a": 0, "why": "Kuvvet kuralı."},
           {"q": "Sabitin türevi?", "o": ["1", "0", "x", "Tanımsız"], "a": "B", "why": "Sabit değişmez."},
           {"q": "bozuk", "o": ["a"], "a": 0}],
  "topics": ["Türev", "Uydurma konu"]}
try:
  with sync_playwright() as p:
    b = p.chromium.launch(args=["--use-gl=angle", "--use-angle=swiftshader", "--enable-unsafe-swiftshader", "--use-fake-ui-for-media-stream", "--use-fake-device-for-media-stream"])
    for mobile, w, h in ((True, 390, 844), (False, 1366, 860)):
      tag = "phone" if mobile else "pc"
      ctx, pg = newctx(b, mobile, w, h)
      ctx.grant_permissions(["camera"], origin="http://localhost:8765")
      pg.on("console", lambda m: print("STACK", m.text[:600]) if m.text.startswith("STK") else None)
      pg.evaluate("() => window.addEventListener('error', e => console.log('STK ' + location.hash + ' ' + (e.error && e.error.stack)))")
      ovf = lambda: pg.evaluate("() => document.documentElement.scrollWidth - document.documentElement.clientWidth")
      # ================= VIDEO =================
      ids = pg.evaluate("""() => ['https://www.youtube.com/watch?v=dQw4w9WgXcQ&t=10', 'https://youtu.be/dQw4w9WgXcQ?si=x', 'youtube.com/shorts/dQw4w9WgXcQ', 'https://m.youtube.com/embed/dQw4w9WgXcQ', 'https://www.youtube.com/live/dQw4w9WgXcQ', 'https://example.com/x', 'abc'].map(App.video.ytId)""")
      check(tag+": ytId ayrıştırma", ids[:5] == ["dQw4w9WgXcQ"]*5 and ids[5] is None and ids[6] is None, ids)
      check(tag+": secs/clock", pg.evaluate("() => [App.video.secs('1:05:30'), App.video.secs('2:15'), App.video.secs(75), App.video.clock(3930), App.video.clock(65)]") == [3930, 135, 75, "1:05:30", "1:05"])
      n = pg.evaluate("(d) => App.video.normalize(d, 'video')", FAKE)
      check(tag+": normalize", len(n["chapters"]) == 3 and n["chapters"][2]["s"] == 3930 and len(n["cards"]) == 3 and len(n["quiz"]) == 2 and n["quiz"][0]["o"][0] == "$2x$" and n["quiz"][1]["a"] == 1 and n["subject"] == "matematik", n)
      check(tag+": konu eşleşmesi", n["topics"][0]["key"] and not n["topics"][1]["key"], n["topics"])
      nl = pg.evaluate("() => { try { App.video.normalize({error: 'müzik videosu'}, 'video'); return 'no'; } catch (e) { return e.code; } }")
      check(tag+": ders değilse hata", nl == "not-lesson", nl)
      go(pg, "#/video", 1200)
      check(tag+": video sayfası", pg.locator(".vd-tab").count() == 2 and pg.locator("#vdUrl").is_visible())
      check(tag+": nav öğesi", pg.locator('[href="#/video"]').count() >= 1)
      pg.fill("#vdUrl", "https://example.com"); pg.click("#vdGo"); pg.wait_for_timeout(200)
      check(tag+": geçersiz bağlantı uyarısı", pg.locator("#vdErr").is_visible())
      # sunucu motorunu taklit et (gerçek istek gitmesin)
      pg.evaluate("""(d) => { const e = App.video.videoEngine(); window.__vreq = null;
        e.chat = async (r) => { window.__vreq = r; await new Promise(x => setTimeout(x, 300)); return { text: JSON.stringify(d), model: 'gemini-test' }; };
        e.prepare = async () => {}; }""", FAKE)
      check(tag+": video motoru var", pg.evaluate("() => !!App.video.videoEngine()"))
      pg.fill("#vdUrl", "https://youtu.be/dQw4w9WgXcQ"); pg.click("#vdGo"); pg.wait_for_timeout(150)
      check(tag+": hazırlanıyor göstergesi", pg.locator("#vdStage .spinner").count() == 1)
      pg.wait_for_timeout(1500)
      req = pg.evaluate("() => window.__vreq && { f: window.__vreq.messages[1].files, mr: window.__vreq.options.mediaResolution, json: window.__vreq.options.json }")
      check(tag+": YouTube dosyası istekte", req and req["f"][0]["uri"] == "https://www.youtube.com/watch?v=dQw4w9WgXcQ" and req["mr"] == "MEDIA_RESOLUTION_LOW" and req["json"], req)
      check(tag+": ayrıntıya geçti", pg.evaluate("() => location.hash").startswith("#/video/dQw4w9WgXcQ-"), pg.evaluate("() => location.hash"))
      check(tag+": özet + KaTeX", pg.locator(".vd-sum li").count() == 4 and pg.locator(".vd-sum .katex").count() >= 1)
      check(tag+": bölümler YouTube zamanına bağlı", pg.locator(".vd-ch__t").count() == 3 and "t=3930s" in (pg.locator(".vd-ch__t").nth(2).get_attribute("href") or ""))
      check(tag+": ilgili konu bağlantısı", pg.locator("a.vd-topic").count() == 1 and pg.locator("span.vd-topic").count() == 1)
      pg.locator(".vd-card").first.click(); pg.wait_for_timeout(150)
      check(tag+": kart çevrilir", pg.locator(".vd-card.is-flip").count() == 1 and pg.locator(".vd-card.is-flip .vd-card__b").is_visible())
      pg.locator('.vd-q[data-q="0"] [data-o="0"]').click(); pg.locator('.vd-q[data-q="1"] [data-o="2"]').click(); pg.wait_for_timeout(400)
      check(tag+": test puanı", pg.locator("#vdScore").inner_text().strip() == "1 / 2" and pg.locator(".vd-opt.is-right").count() == 2 and pg.locator(".vd-opt.is-wrong").count() == 1)
      check(tag+": taşma yok (ayrıntı)", ovf() <= 0, ovf())
      pg.screenshot(path=os.path.join(SHOT, "vd-detail-"+tag+".png"), full_page=True)
      best = pg.evaluate("async () => (await App.video.all())[0].best")
      check(tag+": en iyi skor saklandı", best == 1, best)
      # metin yolu
      go(pg, "#/video", 1000)
      check(tag+": kitaplıkta", pg.locator(".vd-item").count() == 1)
      pg.click('.vd-tab[data-k="text"]'); pg.wait_for_timeout(100)
      pg.fill("#vdText", "kısa"); pg.click("#vdGo"); pg.wait_for_timeout(150)
      check(tag+": kısa metin uyarısı", pg.locator("#vdErr").is_visible())
      pg.evaluate("""(d) => { window.__gen = null; App.ai.generate = async (o) => { window.__gen = o; return { data: Object.assign({}, d, { chapters: undefined }), model: 'yerel' }; }; }""", FAKE)
      pg.fill("#vdTitle", "Benim notum"); pg.fill("#vdText", "Türev konusu. " * 40); pg.click("#vdGo"); pg.wait_for_timeout(1200)
      check(tag+": metinden hazırlandı", pg.locator(".vd-head h1").inner_text() == "Benim notum" and pg.locator(".vd-ch").count() == 0, pg.evaluate("() => location.hash"))
      check(tag+": metin istemde", pg.evaluate("() => window.__gen && window.__gen.prompt.indexOf('Türev konusu.') > 0"))
      pg.click("#vdDel"); pg.wait_for_timeout(300)
      pg.locator(".modal .btn--danger, .modal [data-ok], .modal .btn--primary").last.click(); pg.wait_for_timeout(900)
      check(tag+": silindi", pg.evaluate("async () => (await App.video.all()).length") == 1 and pg.evaluate("() => location.hash") == "#/video")
      pg.screenshot(path=os.path.join(SHOT, "vd-home-"+tag+".png"), full_page=True)
      check(tag+": taşma yok (video)", ovf() <= 0, ovf())
      # hata: motor yoksa
      pg.evaluate("() => { App.video._orig = App.video.videoEngine; }")
      # ================= KARİYER =================
      go(pg, "#/kariyer", 1000)
      check(tag+": kariyer giriş", pg.locator(".kr-type").count() == 6)
      go(pg, "#/kariyer/test", 600)
      vals = [2, 2, 1, 0, 0, 1] * 8
      for i in range(48):
        v = vals[i]
        pg.locator('.kr-test [data-v="%d"]' % v).click()
        if i == 10:
          pg.locator('[data-nav="-1"]').click(); pg.wait_for_timeout(50)
          check(tag+": geri gidince önceki seçili", pg.locator(".kr-opt.is-on").count() == 1)
          pg.locator('.kr-test [data-v="%d"]' % vals[i-1]).click()
      pg.wait_for_timeout(700)
      check(tag+": sonuç sayfası", pg.evaluate("() => location.hash") == "#/kariyer/sonuc" and pg.locator(".kr-code span").count() == 3)
      code = pg.locator(".kr-code").inner_text()
      kod = pg.evaluate("() => App.prefs.get('kariyer').ans.filter(x => x != null).length")
      check(tag+": 48 cevap saklı", kod == 48, kod)
      check(tag+": altıgen + çubuklar", pg.locator(".kr-hex__shape").count() == 1 and pg.locator(".kr-bars li").count() == 6)
      check(tag+": önerilen meslekler", pg.locator(".kr-jobs .kr-job").count() == 9)
      check(tag+": taşma yok (sonuç)", ovf() <= 0, ovf())
      pg.screenshot(path=os.path.join(SHOT, "kr-res-"+tag+".png"), full_page=True)
      go(pg, "#/kariyer/meslekler", 700)
      n0 = pg.locator("#krList .kr-job").count()
      pg.fill("#krQ", "yazılım"); pg.wait_for_timeout(400)
      n1 = pg.locator("#krList .kr-job").count()
      pg.fill("#krQ", ""); pg.wait_for_timeout(300)
      pg.select_option("#krPt", "SÖZ"); pg.wait_for_timeout(200)
      n2 = pg.locator("#krList .kr-job").count()
      check(tag+": meslek listesi + arama + süzgeç", n0 >= 50 and 1 <= n1 < 6 and 1 <= n2 < n0, (n0, n1, n2))
      # elle SAY puanı → bölüm uygunluğu
      pg.evaluate("async () => { await App.db.put('meta', { id: 'tercihPrefs', obp: 85, prevPlaced: false, last: 3, manual: { 1: 470 } }); }")
      go(pg, "#/kariyer/m/doktor", 300)
      if pg.evaluate("() => location.hash") != "#/kariyer/m/doktor":
        mid = pg.evaluate("() => App.data.meslekler.find(m => /Hekim|Doktor/i.test(m[1]))[0]"); go(pg, "#/kariyer/m/" + mid, 300)
      pg.wait_for_selector(".kr-prog-list li, #krProg .hint", timeout=15000); pg.wait_for_timeout(300)
      lis = pg.locator(".kr-prog-list li").count()
      check(tag+": meslek → programlar + şans", lis >= 1 and pg.locator(".kr-bands .tc-band").count() == 3, (lis, pg.locator("#krProg").inner_text()[:200]))
      check(tag+": taşma yok (meslek)", ovf() <= 0, ovf())
      pg.screenshot(path=os.path.join(SHOT, "kr-job-"+tag+".png"), full_page=True)
      pg.click("#krAll"); pg.wait_for_timeout(2500)
      check(tag+": tercih robotuna aktarıldı", pg.evaluate("() => location.hash") == "#/tercih/tum" and pg.input_value("#tcQ") != "", pg.evaluate("() => location.hash"))
      # her meslek açılabilir (programı olmayan yok mu?)
      zero = pg.evaluate("""async () => { await App.tercih.loadData(); const R = App.tercih.rows(); const norm = s => s.toLocaleLowerCase('tr');
        return App.data.meslekler.filter(m => !R.some(r => (' ' + norm(r.name)).indexOf(' ' + norm(m[7][0])) >= 0 || m[7].some(k => (' ' + norm(r.name)).indexOf(' ' + norm(k)) >= 0))).map(m => m[1]); }""")
      print("programsız meslekler:", zero)
      check(tag+": neredeyse her mesleğin programı var", len(zero) <= 1, zero)
      # ================= YOLCULUK =================
      pg.evaluate("() => App.demo.load()"); pg.wait_for_timeout(1500)
      go(pg, "#/yolculuk", 1500)
      xp = pg.evaluate("async () => App.yolculuk.xpOf(await App.yolculuk.collect())")
      check(tag+": demo verisinden XP", xp["total"] > 100, xp)
      lv = pg.evaluate("() => [App.yolculuk.level(0).lv, App.yolculuk.level(39).lv, App.yolculuk.level(40).lv, App.yolculuk.level(160).lv, App.yolculuk.level(100000).title]")
      check(tag+": seviye eğrisi", lv[:4] == [1, 1, 2, 3] and lv[4], lv)
      check(tag+": kahraman + görevler", pg.locator(".yl-hero").count() == 1 and pg.locator(".yl-quests li").count() == 3)
      nw = pg.locator(".yl-world").count()
      check(tag+": diyarlar", nw >= 8, nw)
      av0 = pg.evaluate("() => +App.prefs.get('yolAvatar', 0) || 0"); pg.click("#ylAv"); pg.wait_for_timeout(400)
      check(tag+": avatar değişir", pg.evaluate("() => +App.prefs.get('yolAvatar', 0)") == (av0 + 1) % 6)
      check(tag+": taşma yok (yolculuk)", ovf() <= 0, ovf())
      pg.screenshot(path=os.path.join(SHOT, "yl-home-"+tag+".png"), full_page=True)
      # görev bonusu bir kez
      b1 = pg.evaluate("""async () => { await App.db.put('quizzes', { id: 'qz-test-x', key: 'x', date: new Date().toISOString(), correct: 3, total: 5 });
        const D = await App.yolculuk.collect(); const a = App.yolculuk.quests(D).claimed; const b = App.yolculuk.quests(D).claimed; return [a, b, App.yolculuk.xpOf(D).bonus]; }""")
      check(tag+": görev bonusu tek sefer", b1[0] >= 30 and b1[1] == 0 and b1[2] >= 30, b1)
      pg.locator(".yl-world").first.click(); pg.wait_for_timeout(1500)
      check(tag+": diyar haritası", pg.locator(".yl-map").count() >= 3 and pg.locator(".yl-node").count() >= 10 and pg.locator(".yl-bossnode").count() == pg.locator(".yl-map").count())
      st = pg.evaluate("() => ['star','done','weak','todo'].map(k => document.querySelectorAll('.yl-node--' + k).length)")
      print("düğüm durumları", st)
      check(tag+": durumlar demo verisini yansıtıyor", (st[0] + st[1] + st[2]) >= 1 and st[3] >= 1, st)
      check(tag+": sıradaki durak", pg.locator(".yl-node.is-next").count() == 1)
      bh = pg.locator(".yl-map a[href^='#/test/']").first.get_attribute("href")
      check(tag+": canavar teste götürür", bh and pg.evaluate("(k) => !!App.lessons.find(k)", bh[len("#/test/"):]), bh)
      nh = pg.locator(".yl-map a[href^='#/konular/']").first.get_attribute("href")
      check(tag+": durak konuya götürür", pg.evaluate("(k) => !!App.lessons.find(k)", nh[len("#/konular/"):]), nh)
      check(tag+": taşma yok (diyar)", ovf() <= 0, ovf())
      pg.screenshot(path=os.path.join(SHOT, "yl-world-"+tag+".png"), full_page=False)
      bad = pg.evaluate("""() => { const W = App.yolculuk.worlds(); const bad = []; W.forEach(w => w.units.forEach(u => u.stops.forEach(s => { if (!App.lessons.find(s.key)) bad.push(s.key); }))); return [W.length, bad.length]; }""")
      check(tag+": tüm duraklar geçerli konu", bad[1] == 0, bad)
      # ================= AR =================
      go(pg, "#/lab/sarkac", 1500)
      check(tag+": AR düğmesi", pg.locator("#labHost [data-ar-start]").count() == 1)
      pg.click("#labHost [data-ar-start]"); pg.wait_for_timeout(2500)
      ar = pg.evaluate("() => { const e = document.querySelector('.lab__3d.is-ar'); if (!e) return null; const r = e.getBoundingClientRect(); return { w: r.width, h: r.height, p: e.parentNode === document.body, ui: !!e.querySelector('.lab-ar'), cls: document.documentElement.classList.contains('ar-open') }; }")
      check(tag+": AR tam ekran", ar and ar["w"] == w and ar["h"] == h and ar["p"] and ar["ui"] and ar["cls"], ar)
      vid = pg.evaluate("() => { const v = document.querySelector('.lab__3d.is-ar'); return !!v; }")
      pg.screenshot(path=os.path.join(SHOT, "ar-"+tag+".png"))
      # kamera görüntüsü sahnede mi? (sahte kamera yeşilimsi desen üretir; ortalama renk siyah olmamalı)
      from PIL import Image
      im = Image.open(os.path.join(SHOT, "ar-"+tag+".png")).convert("RGB"); px = im.getpixel((w // 2, int(h * 0.15)))
      px = px[1] - px[0]   # sahte kamera yeşil; normal 3B arka planı yeşil değil
      print("AR ortalama parlaklık", px)
      check(tag+": kamera arka planı çiziliyor", px > 20, px)
      pg.click('.lab-ar [data-ar="ctl"]'); pg.wait_for_timeout(300)
      check(tag+": ayarlar paneli AR içinde", pg.locator(".lab-ar__sheet .lab__side").count() == 1 and pg.locator(".lab-ar__sheet").is_visible())
      inp = pg.locator(".lab-ar__sheet input[type=range]").first
      if inp.count():
        before = pg.evaluate("() => document.querySelector('.lab__read') && document.querySelector('.lab__read').textContent")
        inp.evaluate("(e) => { e.value = e.max; e.dispatchEvent(new Event('input', { bubbles: true })); e.dispatchEvent(new Event('change', { bubbles: true })); }"); pg.wait_for_timeout(300)
        after = pg.evaluate("() => document.querySelector('.lab__read') && document.querySelector('.lab__read').textContent")
        check(tag+": AR'da ayar çalışıyor", before != after, (before, after))
      pg.keyboard.press("Escape"); pg.wait_for_timeout(500)
      back = pg.evaluate("() => ({ ar: !!document.querySelector('.is-ar'), ui: !!document.querySelector('.lab-ar'), side: !!document.querySelector('#labHost .lab__side'), in3: !!document.querySelector('#labHost .lab__3d'), cls: document.documentElement.classList.contains('ar-open'), live: (window.__trk || 0) })")
      check(tag+": Esc ile AR kapanır, düzen geri gelir", not back["ar"] and not back["ui"] and back["side"] and back["in3"] and not back["cls"], back)
      # yeniden aç → sayfa değişince kapanmalı
      pg.click("#labHost [data-ar-start]"); pg.wait_for_timeout(1800)
      check(tag+": AR yeniden açılır", pg.locator(".lab__3d.is-ar").count() == 1)
      go(pg, "#/lab", 1000)
      check(tag+": sayfa değişince AR kapanır", pg.locator(".is-ar").count() == 0 and pg.locator(".lab-ar").count() == 0 and not pg.evaluate("() => document.documentElement.classList.contains('ar-open')"))
      # kamera izinsizse
      pg.evaluate("() => { navigator.mediaDevices.getUserMedia = () => Promise.reject(Object.assign(new Error('x'), { name: 'NotAllowedError' })); }")
      go(pg, "#/lab/sarkac", 1500)
      pg.click("#labHost [data-ar-start]"); pg.wait_for_timeout(500)
      check(tag+": izin yoksa açıklayıcı uyarı, AR yok", pg.locator(".is-ar").count() == 0 and any("izni" in t for t in pg.evaluate("() => Array.from(document.querySelectorAll('.toast')).map(t => t.textContent)")), pg.evaluate("() => [document.querySelectorAll('.is-ar').length, Array.from(document.querySelectorAll('.toast')).map(t => t.textContent), typeof navigator.mediaDevices.getUserMedia]"))
      # ================= hub/genel =================
      go(pg, "#/araclar", 900)
      check(tag+": araçlarda yeni kartlar", all(pg.locator('.hub-tile[data-r="%s"]' % r).count() == 1 for r in ("video", "kariyer", "yolculuk")))
      pg.evaluate("() => App.i18n && App.i18n.setLang && App.i18n.setLang('en')"); pg.wait_for_timeout(800)
      for r in ("#/video", "#/kariyer", "#/kariyer/sonuc", "#/yolculuk"):
        go(pg, r, 1200)
      check(tag+": İngilizce sayfalar hatasız", True)
      pg.evaluate("() => App.i18n && App.i18n.setLang && App.i18n.setLang('tr')"); pg.wait_for_timeout(500)
      ctx.close()
    # açık tema / koyu tema görsel
    print("hatalar:", errs[:5])
    check("sayfa hatası yok", not errs, errs[:5])
    b.close()
finally:
  for pr in procs: pr.terminate()
print("SONUÇ", sum(res), "/", len(res))
