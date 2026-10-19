exec(open("hdr.py").read())
SHOT = os.path.join(SP, "v32"); os.makedirs(SHOT, exist_ok=True)
Y4M = os.path.join(SP, "hands.y4m")
import shutil; shutil.copy("/home/claude/victordibia/handtrack.js/demo/images/0.jpg", "/home/claude/ders-asistani/__hand.jpg")
CAP = "() => { const m = App.lab3d.mount; App.lab3d.mount = function () { const r = m.apply(this, arguments); if (arguments[1] !== 'ogretmen') window.__S3 = r; else window.__T3 = r; return r; }; }"
try:
  with sync_playwright() as p:
    b = p.chromium.launch(args=["--use-gl=angle", "--use-angle=swiftshader", "--enable-unsafe-swiftshader", "--use-fake-ui-for-media-stream", "--use-fake-device-for-media-stream", "--use-file-for-fake-video-capture=" + Y4M])
    for mobile, w, h in ((True, 390, 844), (False, 1366, 860)):
      tag = "phone" if mobile else "pc"
      ctx, pg = newctx(b, mobile, w, h)
      ctx.grant_permissions(["camera", "microphone"], origin="http://localhost:8765")
      pg.on("console", lambda m: print("STACK", m.text[:700]) if m.text.startswith("STK") else None)
      pg.evaluate("() => window.addEventListener('error', e => console.log('STK ' + location.hash + ' ' + (e.error && e.error.stack) + ' ' + e.message + ' ' + e.filename + ':' + e.lineno))")
      pg.evaluate(CAP)
      ovf = lambda: pg.evaluate("() => document.documentElement.scrollWidth - document.documentElement.clientWidth")
      # ================= EL KONTROLÜ =================
      go(pg, "#/lab/sarkac", 1500)
      if not pg.evaluate("() => !!document.querySelector('#labHost .lab__3d')"):
        pg.click('#labHost [data-mode="3d"]'); pg.wait_for_timeout(1500)
      check(tag+": El düğmesi", pg.locator("#labHost .lab__handbtn").count() == 1 and pg.locator("#labHost .lab__handbtn").is_visible())
      # jest mantığı (sahte kutularla)
      r = pg.evaluate("""() => { const S = window.__S3, f = S._handFeed; const st0 = S.handState();
        const hand = (x, y, label, s) => ({ bbox: [x - 40, y - 40, 80 * (s || 1), 80 * (s || 1)], label, score: 0.9 });
        let t = 1000; const out = {};
        // açık el sağa → döndür
        f([hand(200, 240, 'open')], t += 100); f([hand(260, 240, 'open')], t += 100); f([hand(330, 240, 'open')], t += 100);
        out.rot = S.handState().rotY - st0.rotY;
        // iki el aç → büyüt
        f([hand(250, 240, 'open'), hand(390, 240, 'open')], t += 100); f([hand(150, 240, 'open'), hand(490, 240, 'open')], t += 100);
        out.scale = S.handState().scale;
        // çimdik yukarı → ilk ayar artar
        const inp = document.querySelector('#labHost input[type=range]'); const v0 = Number(inp.value);
        f([hand(320, 300, 'pinch')], t += 100); f([hand(320, 200, 'pinch')], t += 100); f([hand(320, 120, 'pinch')], t += 100);
        out.v = [v0, Number(inp.value), document.querySelector('#labHost [data-out]').textContent];
        // işaret bekle → sıradaki ayar
        f([hand(320, 240, 'point')], t += 100); f([hand(320, 240, 'point')], t += 900);
        out.sel = S.handState().sel; out.cursor = S.handState().cursor;   // 1.27: işaret = imleç (ayar çiplerle seçilir)
        // yumruk bekle → oynat/durdur
        const pb = document.querySelector('#labHost [data-lab="play"]'), lbl0 = pb.textContent;
        f([hand(320, 240, 'closed')], t += 100); f([hand(320, 240, 'closed')], t += 800);
        out.play = [lbl0, pb.textContent];
        f([], t += 100); out.g = S.handState().g;
        return out; }""")
      print("jest", r)
      check(tag+": açık el sahneyi döndürür", abs(r["rot"]) > 0.3, r)
      check(tag+": iki el büyütür", r["scale"] > 1.5, r)
      check(tag+": çimdik ayarı değiştirir", r["v"][1] > r["v"][0], r)
      check(tag+": işaret ayarı değiştirmez (imleç kipi)", r["sel"] == 0, r)
      check(tag+": yumruk oynat/durdur", r["play"][0] != r["play"][1], r)
      # gerçek model + sahte kamera (eller görünen video)
      pg.click("#labHost .lab__handbtn");
      pg.wait_for_function("() => window.__S3.handState().cam", timeout=60000)
      check(tag+": el modeli ve kamera açıldı", pg.locator(".lab-hand").count() == 1)
      try: pg.wait_for_function("() => window.__S3.handState().g !== 'none'", timeout=90000)
      except Exception: pass
      hs = pg.evaluate("() => window.__S3.handState()")
      seen = pg.evaluate("() => document.querySelector('.lab-hand').classList.contains('is-seen')")
      print("el durumu", hs, "görüldü", seen)
      det = pg.evaluate("""async () => { const v = document.createElement('canvas'); const img = new Image(); img.src = '/__hand.jpg'; await img.decode(); const p = await window.__htModel.detect(img); return p.map(x => x.label); }""")
      vid = pg.evaluate("""async () => { const p = await window.__htModel.detect(document.querySelector('.lab-hand') && window.__S3 && document.createElement('video').constructor && (window.__lastVid || null) || document.querySelector('video') || null); return p ? p.map(x => x.label) : null; }""") if False else None
      print("model görüntüde:", det)
      check(tag+": kameradaki el bulunuyor", hs["g"] in ("open", "two", "pinch", "point", "closed"), hs)
      check(tag+": el modeli eli buluyor", det.count("open") >= 1, det)
      check(tag+": taşma yok (el)", ovf() <= 0, ovf())
      pg.screenshot(path=os.path.join(SHOT, "hand-"+tag+".png"))
      # hologramla birlikte: kamera paylaşılır
      pg.click("#labHost [data-holo-start]"); pg.wait_for_timeout(2500)
      both = pg.evaluate("() => [window.__S3.holoState().on, window.__S3.holoState().face, window.__S3.handState().cam]")
      check(tag+": hologram + el aynı kamerayla", both == [True, True, True], both)
      pg.screenshot(path=os.path.join(SHOT, "hand-holo-"+tag+".png"))
      pg.keyboard.press("Escape"); pg.wait_for_timeout(400)
      check(tag+": hologramdan çıkınca el sürüyor", pg.evaluate("() => window.__S3.handState().cam"))
      pg.click("#labHost .lab__handbtn"); pg.wait_for_timeout(400)
      tracks = pg.evaluate("() => window.__S3.handState()")
      check(tag+": el kapandı", not tracks["on"] and pg.locator(".lab-hand").count() == 0, tracks)
      # ================= HOLOGRAM ÖĞRETMEN =================
      pg.evaluate("""() => { App.speech.sttMode = () => 'web'; window.__said = []; App.speech.ttsAvailable = () => true;
        App.speech.listen = (o) => { window.__lis = o; return { stop: async () => ({ text: '' }) }; };
        App.speech.say = (txt, o) => { window.__said.push(txt); let k = 0; const iv = setInterval(() => { if (o.onWord) o.onWord(k++ * 5); if (k > 14) { clearInterval(iv); o.onEnd && o.onEnd('done'); } }, 120); return 'x'; };
        App.ai.run = async (q) => ({ text: 'Basit sarkaçta periyot $T = 2\\\\pi\\\\sqrt{L/g}$ ile bulunur. **Periyot** kütleye bağlı değildir; **ip uzunluğu** arttıkça artar.', models: ['test'], engine: 'test' }); }""")
      pg.evaluate("() => App.voice.open()"); pg.wait_for_timeout(500)
      check(tag+": Hologram düğmesi", pg.locator("#vHoloBtn").count() == 1)
      pg.evaluate("() => document.querySelector('#vHoloBtn').click()"); pg.wait_for_timeout(1500)
      try: pg.wait_for_function("() => App.voice._state() && App.voice._state().holo", timeout=30000)
      except Exception: pass
      tst = pg.evaluate("() => ({ holo: App.voice._state().holo, canvas: !!document.querySelector('#vHolo canvas'), hs: window.__T3 && window.__T3.holoState() })")
      print("öğretmen", tst)
      check(tag+": hologram öğretmen sahnesi", tst["holo"] and tst["canvas"] and tst["hs"]["on"], tst)
      # soru → cevap → konuşma, ağız oynar
      pg.evaluate("() => { window.__lis.onFinal('sarkaçta periyot neye bağlı', 'sarkaçta periyot neye bağlı'); }"); pg.wait_for_timeout(2300)
      mouth = []
      for i in range(6):
        pg.wait_for_timeout(110); mouth.append(pg.evaluate("() => { const st = App.holoTeacher._last; return st ? Math.round(st.S3 && window.__T3 ? (window.__T3._mouth || 0) * 100 : 0) : -1; }"))
      ph = pg.evaluate("() => App.voice._state().phase")
      print("faz", ph, "söylenen", pg.evaluate("() => window.__said.length"))
      check(tag+": cevap sesli okundu", pg.evaluate("() => window.__said.length") >= 1)
      pano = pg.evaluate("() => { const p = document.querySelector('#vPano'); return p && !p.hidden ? [p.querySelectorAll('.katex').length, p.querySelectorAll('.vh-pano__t span').length, (p.querySelector('a[data-lab]') || {}).getAttribute ? p.querySelector('a[data-lab]').getAttribute('href') : null] : null; }")
      print("pano", pano)
      check(tag+": pano formül + kavram + deney", pano and pano[0] >= 1 and pano[1] == 2 and pano[2] == "#/lab/sarkac/holo", pano)
      check(tag+": taşma yok (öğretmen)", ovf() <= 0, ovf())
      pg.screenshot(path=os.path.join(SHOT, "teacher-"+tag+".png"))
      pg.click("#vPano a[data-lab]"); pg.wait_for_timeout(3500)
      lab = pg.evaluate("() => [location.hash, !!document.querySelector('.voice-overlay'), window.__S3 && window.__S3.holoOn()]")
      check(tag+": deney hologramda açıldı", lab[0] == "#/lab/sarkac/holo" and not lab[1] and lab[2], lab)
      pg.keyboard.press("Escape"); pg.wait_for_timeout(300)
      # ================= PODCAST =================
      allp = pg.evaluate("""() => { const T = App.podcast.allTopics(); let bad = [], min = 1e9, quiz = 0, tot = 0;
        T.forEach(x => { try { const e = App.podcast.build(x.key); if (!e || e.lines.length < 6) bad.push(x.key); else { min = Math.min(min, e.lines.length); tot += e.lines.length; if (e.quizzes) quiz++; if (e.lines.some(l => !l.say || /\\$|\\\\frac|\\*\\*/.test(l.say))) bad.push('say:' + x.key); } } catch (err) { bad.push(x.key + ':' + err.message); } });
        return { n: T.length, bad: bad.slice(0, 8), nbad: bad.length, min, avg: Math.round(tot / T.length), quiz }; }""")
      print("podcastler", allp)
      check(tag+": her konu için podcast", allp["n"] >= 500 and allp["nbad"] == 0, allp)
      check(tag+": soru araları var", allp["quiz"] >= allp["n"] * 0.8, allp)
      go(pg, "#/podcast", 1200)
      n0 = pg.locator(".pod-item").count()
      pg.select_option("#pdS", "fizik"); pg.wait_for_timeout(300)
      n1 = pg.locator(".pod-item").count()
      check(tag+": podcast listesi + süzgeç", n0 > 50 and 0 < n1 < n0, (n0, n1))
      check(tag+": taşma yok (liste)", ovf() <= 0, ovf())
      pg.screenshot(path=os.path.join(SHOT, "pod-list-"+tag+".png"))
      pg.select_option("#pdS", ""); pg.wait_for_timeout(200)
      key = pg.evaluate("() => App.podcast.allTopics().find(x => x.s.id === 'fizik' && App.podcast.build(x.key).quizzes >= 2).key")
      # sesli okuma taklidi: her replik 40 ms
      pg.evaluate("""() => { window.__said = []; App.speech.say = (txt, o) => { window.__said.push([txt, o.pitch, o.voice]); setTimeout(() => o.onEnd && o.onEnd('done'), 40); return 'x'; }; App.speech.stopSaying = () => {}; }""")
      go(pg, "#/podcast/" + key, 1200)
      check(tag+": oynatıcı", pg.locator("#pdPlay").count() == 1 and pg.locator(".pod-ln").count() > 10)
      check(tag+": taşma yok (oynatıcı)", ovf() <= 0, ovf())
      pg.screenshot(path=os.path.join(SHOT, "pod-player-"+tag+".png"), full_page=False)
      pg.click("#pdPlay")
      try: pg.wait_for_selector("#pdQuiz:not([hidden])", timeout=20000)
      except Exception: pass
      pg.wait_for_timeout(600)
      st = pg.evaluate("() => App.podcast.state()")
      qv = pg.locator("#pdQuiz").is_visible()
      print("oynatıcı", st, "soru kartı", qv)
      check(tag+": soru arasında durup bekliyor", qv and st["playing"], st)
      pitches = pg.evaluate("() => Array.from(new Set(window.__said.map(x => x[1])))")
      check(tag+": iki farklı ses tonu", len(pitches) == 2, pitches)
      pg.screenshot(path=os.path.join(SHOT, "pod-quiz-"+tag+".png"))
      pg.click("#pdReveal"); pg.wait_for_timeout(800)
      st2 = pg.evaluate("() => App.podcast.state()")
      check(tag+": cevaptan devam", st2["i"] > st["i"], (st, st2))
      cur = pg.locator(".pod-ln.is-cur").count()
      check(tag+": metinde şu anki replik", cur == 1)
      pg.click("#pdPlay"); pg.wait_for_timeout(300)
      st3 = pg.evaluate("() => App.podcast.state()")
      check(tag+": duraklat", not st3["playing"])
      pos = pg.evaluate("(k) => (App.prefs.get('podPos', {})[k] || {}).i", key)
      check(tag+": kaldığı yer saklandı", pos == st3["i"], (pos, st3))
      # sona kadar: soruları otomatik geç → bitince sıradaki konu
      pg.evaluate("() => { App.prefs.set('podWait', false); }")
      pg.evaluate("() => { const L = document.querySelectorAll('.pod-ln'); L[L.length - 3].click(); }"); pg.wait_for_timeout(200)
      pg.click("#pdPlay"); pg.wait_for_timeout(4000)
      h2 = pg.evaluate("() => location.hash")
      check(tag+": bitince sıradaki konuya geçti", h2 != "#/podcast/" + key and h2.startswith("#/podcast/"), h2)
      pg.wait_for_timeout(800)
      check(tag+": sıradaki konu kendiliğinden çalıyor", pg.evaluate("() => App.podcast.state() && App.podcast.state().playing"))
      go(pg, "#/konular/" + key, 1500)
      check(tag+": podcast durdu (sayfa değişti)", pg.evaluate("() => !App.podcast.state()"))
      check(tag+": konu sayfasında podcast düğmesi", pg.locator('a[href="#/podcast/%s"]' % key).count() >= 1)
      # yapay zekâ sürümü
      pg.evaluate("""() => { App.ai.generate = async () => ({ data: { lines: Array.from({ length: 14 }, (_, i) => ({ who: i % 2 ? 'B' : 'A', text: 'Replik ' + i + (i === 5 ? ' Soru: $x^2$ nedir?' : ''), kind: i === 5 ? 'quiz' : i === 6 ? 'answer' : 'talk' })) }, model: 'test' }); }""")
      go(pg, "#/podcast/" + key, 1000)
      pg.click("#pdAI"); pg.wait_for_timeout(1500)
      check(tag+": yapay zekâ sürümü", pg.locator(".pod-ln").count() == 14 and pg.locator("#pdStd").count() == 1)
      pg.click("#pdStd"); pg.wait_for_timeout(1000)
      check(tag+": standart sürüme dönüş", pg.locator(".pod-ln").count() > 14)
      go(pg, "#/araclar", 900)
      check(tag+": araçlarda podcast", pg.locator('.hub-tile[data-r="podcast"]').count() == 1)
      ctx.close()
    print("hatalar:", errs[:5])
    check("sayfa hatası yok", not errs, errs[:5])
    b.close()
finally:
  for pr in procs: pr.terminate()
  try: os.remove("/home/claude/ders-asistani/__hand.jpg")
  except Exception: pass
print("SONUÇ", sum(res), "/", len(res))
