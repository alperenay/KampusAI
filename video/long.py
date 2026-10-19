"""~5 dakikalık yatay (16:9) tanıtım: bölümler, tarayıcı + telefon çerçeveleri, ritme oturan geçişler, alt yazılar."""
import sys, subprocess, time
from fx import *

W, H = 1920, 1080
BEAT = 0.5; DUR = 300.0
OUT = os.path.join(HERE, "out"); os.makedirs(OUT, exist_ok=True)
bg = Background(W, H, seed=5)
ICON = mark_icon(230)
ICON_S = mark_icon(64)
BW = 1500; BH = int(BW * 1080 / 1920)     # tarayıcı içeriği
PW = 400; PH = int(PW * 1688 / 780)        # telefon ekranı

# (bölüm başlığı, alt başlık, [(klip, cihaz, başlık, açıklama, odak)])
CH = [
    ("Yapay zekâ ile öğren", "Soru sor, konuyu oku, podcast dinle", [
        ("home", "desktop", "Sade açılış", "Her şey tek ekranda: bugünkü plan, hızlı sorular, kısayollar", (.5, .4)),
        ("chat", "desktop", "Yapay zekâ asistanı", "Sorunu yaz; formülleri ve adımlarıyla anlatsın", (.5, .45)),
        ("chat", "phone", "Telefonda da aynı", "Android uygulaması ve web sürümü", (.5, .5)),
        ("today", "desktop", "Bugün", "Günlük çalışma planı ve tekrar kartları", (.5, .4)),
        ("topic", "desktop", "Konu anlatımı", "9–12. sınıf, tüm dersler, Maarif Modeli temaları", (.5, .4)),
        ("podcast", "desktop", "Konu podcast'i", "İki sunucu konuyu sohbet ederek anlatır", (.5, .45)),
    ]),
    ("Yazılı Sınavlar", "Maarif Modeli'ne göre açık uçlu yazılılar", [
        ("yazili", "desktop", "Yeni: Yazılı Sınavlar", "7 ders · 9–12. sınıf · 56 sınav · 392 açık uçlu soru", (.5, .4)),
        ("yazkey", "desktop", "Cevap anahtarı ve ölçüt", "Beklenen cevap ve dereceli puanlama; kendini puanla", (.5, .45)),
        ("yazili", "phone", "Süreli sınav modu", "Cevapların cihazda saklanır, yazdırılabilir", (.5, .45)),
    ]),
    ("Sınavlarını takip et", "Deneme netleri, puan ve tercih", [
        ("exams", "desktop", "Deneme takibi", "TYT ve AYT netlerin, ders ders gelişimin", (.5, .4)),
        ("puan", "desktop", "Puan ve sıralama", "Netlerinden tahmini puan ve sıralama", (.5, .4)),
        ("tercih", "desktop", "Tercih Robotu", "Güvenli, uygun ve hayal bölümler", (.5, .4)),
        ("tercih", "phone", "Listeni oluştur", "Şehir ve bölüme göre süz, listene ekle", (.5, .4)),
        ("cards", "desktop", "Yanlış defteri", "Yanlışların hap kartlara dönüşür", (.5, .4)),
    ]),
    ("Sanal laboratuvar", "Deneyler 2B, 3B ve hologramda", [
        ("lab", "desktop", "3B deney", "Açıyı değiştir, sonucu anında gör", (.5, .45)),
        ("lab", "phone", "Telefonda akıcı", "Dinamik çözünürlük: her cihazda akıcı", (.5, .4)),
        ("holo", "desktop", "Hologram modu", "Ekran bir pencereye dönüşür", (.5, .45)),
        ("hand", "desktop", "El hareketiyle kontrol", "Kameraya elini göster, deneyi yönet", (.5, .45)),
    ]),
    ("3B modeller", "DNA'dan kalbe, dokun ve öğren", [
        ("dna", "desktop", "DNA", "Sarmalı aç, baz çiftlerini incele", (.5, .45)),
        ("dna", "phone", "Parçalara dokun", "Her parçanın açıklaması", (.5, .4)),
        ("cell", "desktop", "Hücre", "Organelleri ayır, yakından bak", (.5, .45)),
        ("heart", "desktop", "Kalp", "Çalışan kalp modeli", (.5, .45)),
        ("mol", "desktop", "Molekül kur", "Atomları bağla, gerçek şekline otursun", (.5, .45)),
    ]),
    ("Dünya ve zaman", "3B küre, atlas ve tarih şeridi", [
        ("globe", "desktop", "3B Dünya Küresi", "Levhalar, depremler, ülkeler, iklim", (.5, .45)),
        ("globe", "phone", "Telefonda da akıcı", "Kare başına 250 yerine 7 çizim", (.5, .4)),
        ("sun", "desktop", "Gündüz ve gece", "Gündönümlerinde Güneş'in yolu", (.5, .45)),
        ("atlas", "desktop", "Atlas oyunu", "Haritada ülkeyi bul", (.5, .45)),
        ("zaman", "desktop", "Zaman şeridi", "Kurtuluş Savaşı'ndan bugüne", (.5, .45)),
    ]),
    ("Keşfet", "Oyunlar, meslekler ve sesli öğretmen", [
        ("journey", "desktop", "Öğrenme yolculuğu", "Her ders bir dünya, her konu bir durak", (.5, .45)),
        ("career", "desktop", "Meslek rehberi", "Bölümler, dersler ve gelecek", (.5, .45)),
        ("video", "desktop", "Videodan not", "Ders videosundan özet ve sorular", (.5, .4)),
        ("paragraf", "desktop", "Paragraf antrenmanı", "Günlük okuma ve anlama", (.5, .4)),
        ("teacher", "desktop", "Hologram öğretmen", "Sesli sor, sesli anlatsın", (.5, .4)),
        ("teacher", "phone", "Her yerde yanında", "Android · Windows · Web", (.5, .35)),
    ]),
]

T_INTRO, T_MONT, T_TITLE = 8.0, 8.0, 8.0
T_CONTENT0 = T_INTRO + T_MONT + T_TITLE      # 24
T_OUTRO0 = 288.0
CARD = 3.0
PHONE_MAX = 6.0

def snap(x): return max(BEAT * 4, round(x / BEAT) * BEAT)

def build_timeline():
    segs = []
    for ci, (title, sub, items) in enumerate(CH):
        segs.append({"kind": "card", "ci": ci, "d": CARD})
        for (name, dev, t1, t2, focus) in items:
            c = clip(dev, name)
            nat = c.sec if dev == "desktop" else min(c.sec, PHONE_MAX)
            segs.append({"kind": dev, "name": name, "title": t1, "sub": t2, "focus": focus, "nat": max(nat, 1.0), "ci": ci})
    avail = T_OUTRO0 - T_CONTENT0 - sum(s["d"] for s in segs if s["kind"] == "card")
    clipsegs = [s for s in segs if s["kind"] != "card"]
    nat = sum(s["nat"] for s in clipsegs)
    slack = max(0, avail - nat)
    for s in clipsegs: s["d"] = s["nat"] + slack * (s["nat"] / nat) * 0.5 + slack * 0.5 / len(clipsegs)
    # ritme oturt, toplamı koru
    t = T_CONTENT0
    for s in segs:
        s["t0"] = t; s["d"] = snap(s["d"]); t += s["d"]
    over = t - T_OUTRO0
    i = len(segs) - 1
    while abs(over) >= BEAT / 2 and i >= 0:
        s = segs[i]
        if s["kind"] != "card" and s["d"] - BEAT >= 2.0 and over > 0: s["d"] -= BEAT; over -= BEAT
        elif s["kind"] != "card" and over < 0: s["d"] += BEAT; over += BEAT
        i = i - 1 if i > 0 else len(segs) - 1
    t = T_CONTENT0
    for s in segs: s["t0"] = t; t += s["d"]
    return segs

SEGS = build_timeline()

def energy(t):
    if t < 4: return 0.25
    if t < 8: return 0.35 + 0.65 * (t - 4) / 4
    for a, b in ((88, 104), (168, 184), (248, 264)):
        if a <= t < b: return 0.5
    if t >= 288: return 0.5
    return 0.85
def pulse(t):
    if t < 8 or t >= 288: return 0.0
    for a, b in ((88, 104), (168, 184), (248, 264)):
        if a <= t < b: return 0.0
    return math.exp(-(t % BEAT) * 9)

def clip_frame(c, lt, d, pre):
    """klip karesi: başta 'pre' kadar ilk karede bekle, sonra oynat, sonunda son karede bekle"""
    u = lt - pre
    return c.get(int(max(0, u) * FPS))

# ---------- sahne parçaları ----------
def lower_third(img, title, sub, lt, d, x=110, y=930):
    ta = 1 - eio((lt - (d - 0.25)) / 0.25)
    k = eo3((lt - 0.15) / 0.4)
    if k <= 0: return
    ts = text_sprite(title, "xbold", 54, WHITE, True)
    ss = text_sprite(sub, "semi", 32, (232, 226, 218), True)
    bw = int((max(ts.shape[1], ss.shape[1]) + 70) * eo3((lt - 0.05) / 0.35))
    if bw > 10:
        ov = img[y - 70: y + 80, x - 30: x - 30 + bw]
        ov[:] = (ov.astype(np.float32) * (1 - 0.55 * ta) + np.array([24, 14, 10], np.float32) * 0.55 * ta).astype(np.uint8)
        cv2.rectangle(img, (x - 30, y - 70), (x - 24, y + 80), ACC2, -1)
    blit(img, ts, x, y - 22 + (1 - k) * 20, ta * k, anchor="l")
    k2 = eo3((lt - 0.3) / 0.4)
    blit(img, ss, x, y + 38 + (1 - k2) * 16, ta * k2, anchor="l")

def chapter_chip(img, ci, lt, d):
    ta = 1 - eio((lt - (d - 0.2)) / 0.2)
    s = pill("%02d  %s" % (ci + 1, CH[ci][0]), "semi", 26, bg=(50, 30, 18), fg=WHITE, padx=22, pady=10, border=ACC)
    k = eo3(lt / 0.4)
    blit(img, s, 70 + (1 - k) * -40, 64, ta * k, anchor="l")
    blit(img, ICON_S, W - 80, 66, 0.9 * ta * k, 0.75)

def seg_desktop(img, s, lt, t):
    d = s["d"]; c = clip("desktop", s["name"])
    slack = max(0, d - c.sec); pre = min(1.2, slack * 0.4)
    fr = clip_frame(c, lt, d, pre)
    kin = eo3(lt / 0.45); kout = ein((lt - (d - 0.3)) / 0.3)
    x = W / 2 + (1 - kin) * W * 0.9 - kout * W * 0.9
    lay = browser_layer(fr, BW, BH)
    blur = max(1 - kin, kout) * 80
    if blur > 2: lay = motion_blur(lay, blur)
    ay = 6 * math.sin(t * 0.35 + s["t0"]) + (1 - kin) * -25 + kout * 25
    ax = 3 * math.sin(t * 0.5 + s["t0"] * 2)
    sc = 0.9 + 0.03 * clamp(lt / d)
    h, w = lay.shape[:2]
    Hm = place_H(w, h, x, H * 0.5 + 6 * math.sin(t * 0.9), sc, 0, ax, ay, persp=3.2)
    # yakınlaştırma: ortada odak noktasına it
    zin = eio((lt - pre - 0.6) / 0.6); zout = eio((lt - (d - 1.2)) / 0.6)
    Z = 1 + 0.22 * zin * (1 - zout) if d > 4 else 1
    body, (ox, oy) = browser_body(BW, BH)
    F = cv2.perspectiveTransform(np.float32([[[ox + s["focus"][0] * BW, oy + s["focus"][1] * BH]]]), Hm).reshape(2)
    Hm = zoom_H(Hm, Z, F, (W / 2, H * 0.48))
    warp_blit(img, lay, Hm)
    lower_third(img, s["title"], s["sub"], lt, d)
    chapter_chip(img, s["ci"], lt, d)

def seg_phone(img, s, lt, t):
    d = s["d"]; c = clip("phone", s["name"])
    span = min(c.sec, PHONE_MAX); start = max(0, (c.sec - span) * 0.3)
    fr = c.get(int((start + clamp(lt / d) * span) * FPS))
    kin = eo3(lt / 0.45); kout = ein((lt - (d - 0.3)) / 0.3)
    lay = phone_layer(fr, PW, PH)
    blur = max(1 - kin, kout) * 70
    if blur > 2: lay = motion_blur(lay, blur, horizontal=False)
    h, w = lay.shape[:2]
    cy = H * 0.52 + (1 - kin) * H * 1.0 - kout * H * 1.0
    Hm = place_H(w, h, W * 0.68, cy + 8 * math.sin(t * 1.2), 0.86, -4 + 2 * math.sin(t * 0.6), 4 * math.sin(t * 0.7), -14 + 4 * math.sin(t * 0.5))
    warp_blit(img, lay, Hm)
    ta = 1 - eio((lt - (d - 0.25)) / 0.25)
    k = eo3((lt - 0.1) / 0.4)
    lines = wrap(s["title"], "black", 84, 760)
    for j, ln in enumerate(lines[:2]):
        blit(img, text_sprite(ln, "black", 84, WHITE, True, 0, ACC), 140, 430 + j * 100 + (1 - k) * 40, ta * k, anchor="l")
    k2 = eo3((lt - 0.35) / 0.4); yy = 430 + len(lines[:2]) * 100 + 10
    bw = int(220 * k2)
    if bw > 4: cv2.rectangle(img, (140, int(yy - 20)), (140 + bw, int(yy - 12)), ACC2, -1)
    for j, ln in enumerate(wrap(s["sub"], "semi", 40, 720)[:2]):
        blit(img, text_sprite(ln, "semi", 40, (236, 230, 222), True), 140, yy + 40 + j * 56 + (1 - k2) * 20, ta * k2, anchor="l")
    chapter_chip(img, s["ci"], lt, d)

def seg_card(img, s, lt, t):
    ci = s["ci"]; title, sub, _ = CH[ci]; d = s["d"]
    ta = 1 - eio((lt - (d - 0.25)) / 0.25)
    k = eback(clamp(lt / 0.45))
    num = text_sprite("%02d" % (ci + 1), "black", 260, ACC2, True, 0, ACC)
    blit(img, num, W / 2, 360 - (1 - k) * 60, ta * clamp(lt / 0.15) * 0.95, 0.6 + 0.4 * k)
    kk = eo3((lt - 0.2) / 0.4)
    blit(img, text_sprite(title, "black", 120, WHITE, True, 0, ACC), W / 2, 600 + (1 - kk) * 40, ta * kk)
    bw = int(360 * eo3((lt - 0.4) / 0.4))
    if bw > 4: cv2.rectangle(img, (int(W / 2 - bw / 2), 690), (int(W / 2 + bw / 2), 698), ACC2, -1)
    kk = eo3((lt - 0.55) / 0.4)
    blit(img, text_sprite(sub, "semi", 46, (236, 230, 222), True), W / 2, 760 + (1 - kk) * 24, ta * kk)

# montaj: 16 hızlı kesme
MONT = [("desktop", "globe", .5), ("phone", "dna", .6), ("desktop", "holo", .5), ("desktop", "chat", .8), ("phone", "globe", .4), ("desktop", "yazili", .6),
        ("desktop", "mol", .85), ("phone", "lab", .5), ("desktop", "sun", .6), ("desktop", "tercih", .5), ("phone", "teacher", .7), ("desktop", "dna", .8),
        ("desktop", "hand", .5), ("phone", "yazili", .5), ("desktop", "cell", .7), ("desktop", "teacher", .6)]
MWORDS = ["SOR.", "YAZ.", "DENE.", "KEŞFET."]

def montage(img, t):
    lt = t - T_INTRO; idx = min(15, int(lt / 0.5)); u = lt - idx * 0.5
    dev, name, frac = MONT[idx]; c = clip(dev, name)
    fr = c.get(int(frac * (c.n - 1)) + int(u * FPS))
    z = 1.14 - 0.14 * eo3(u / 0.5)
    if dev == "phone":
        img[:] = (img.astype(np.float32) * 0.5).astype(np.uint8)
        lay = phone_layer(fr, PW, PH); h, w = lay.shape[:2]
        side = W * (0.3 if idx % 2 else 0.7)
        warp_blit(img, lay, place_H(w, h, side, H / 2, 0.9 * z, 0, 0, 0))
    else:
        img[:] = fill_cover(fr, W, H, z, 0.5, 0.4)
        img[:] = (img.astype(np.float32) * 0.6).astype(np.uint8)
    wd = MWORDS[min(3, int(lt / 2))]
    ws = text_sprite(wd, "black", 230, WHITE, True, 0, ACC)
    blit(img, ws, W / 2, H / 2, 1.0, 1.2 - 0.2 * eo3((lt % 2.0) / 0.2))
    if idx % 2 == 1: rgb_split(img, 14 * (1 - eo3(u / 0.12)))
    flash(img, 0.5 * (1 - eo3(u / 0.12)))
    flash(img, ein((lt - 7.55) / 0.45))

def intro(img, t):
    k = eback(clamp(t / 0.5))
    blit(img, ICON, W / 2, 400, clamp(t / 0.15), 0.3 + 0.7 * k)
    for j, (w, tt, col) in enumerate([("Lise hayatın", 1.0, WHITE), ("tek uygulamada.", 2.0, ACC2)]):
        kk = clamp((t - tt) / 0.35)
        if kk > 0: blit(img, text_sprite(w, "black", 110, col, True), W / 2, 640 + j * 130 + (1 - eo3(kk)) * 50, kk, 0.8 + 0.2 * eback(kk))
    if t > 7.6: img[:] = shake_zoom(img, 1 + 0.6 * ein((t - 7.6) / 0.4))

def title(img, t):
    lt = t - T_INTRO - T_MONT
    s = 1 + 0.9 * (1 - eo3(lt / 0.24))
    blit(img, ICON, W / 2, 300 - (1 - eback(clamp((lt - 0.1) / 0.45))) * 120, clamp((lt - 0.1) / 0.2), 0.4 + 0.6 * eback(clamp((lt - 0.1) / 0.45)))
    blit(img, text_sprite("KampüsAI", "black", 190, WHITE, True, 0, ACC), W / 2, 540, clamp(lt / 0.1), s)
    k = eo3((lt - 0.55) / 0.4)
    blit(img, text_sprite("Lise öğrencileri için yapay zekâ destekli ders asistanı", "semi", 50, (240, 232, 225), True), W / 2, 680 + (1 - k) * 30, k)
    for j, w in enumerate(["Öğren", "Uygula", "Keşfet"]):
        kk = eback(clamp((lt - 1.6 - j * 0.5) / 0.4))
        blit(img, pill(w, "bold", 42, bg=(60, 34, 20), fg=WHITE, padx=36, pady=16, border=ACC), W / 2 + (j - 1) * 330, 820, clamp((lt - 1.6 - j * 0.5) / 0.15), 0.6 + 0.4 * kk)
    kk = eo3((lt - 3.6) / 0.5)
    blit(img, text_sprite("Sürüm 1.29 · Android · Windows · Web", "med", 34, (210, 204, 196), True), W / 2, 930, kk)
    flash(img, 1 - eo3(lt / 0.35))
    if lt > 7.7: img[:] = shake_zoom(img, 1 + 0.4 * ein((lt - 7.7) / 0.3))

def outro(img, t):
    lt = t - T_OUTRO0
    k = eback(clamp(lt / 0.5))
    blit(img, ICON, W / 2, 300, clamp(lt / 0.15), 0.4 + 0.6 * k)
    kk = eo3((lt - 0.25) / 0.4)
    blit(img, text_sprite("KampüsAI", "black", 170, WHITE, True, 0, ACC), W / 2, 520 + (1 - kk) * 40, kk)
    for j, w in enumerate(["Hesap yok", "Reklam yok", "İnternetsiz de çalışır"]):
        kk = eback(clamp((lt - 1.0 - j * 0.3) / 0.35))
        blit(img, pill(w, "semi", 38, bg=(40, 30, 26), fg=ACC2, padx=28, pady=14), W / 2 + (j - 1) * 440, 680, clamp((lt - 1.0 - j * 0.3) / 0.15), 0.6 + 0.4 * kk)
    kk = eo3((lt - 2.6) / 0.5)
    blit(img, pill("Android · Windows · Web", "semi", 40, bg=(60, 34, 20), fg=WHITE, padx=34, pady=16, border=ACC), W / 2, 800, kk)
    kk = eo3((lt - 3.4) / 0.5)
    blit(img, text_sprite("Lise hayatın tek uygulamada.", "xbold", 58, WHITE, True), W / 2, 920, kk)
    flash(img, ein((lt - 10.6) / 1.2), (0, 0, 0))

def seg_at(t):
    for s in SEGS:
        if s["t0"] <= t < s["t0"] + s["d"]: return s
    return None

def frame_at(t):
    img = bg.render(t, energy(t) + 0.5 * pulse(t))
    if t < T_INTRO: intro(img, t)
    elif t < T_INTRO + T_MONT: montage(img, t)
    elif t < T_CONTENT0: title(img, t)
    elif t < T_OUTRO0:
        s = seg_at(t); lt = t - s["t0"]
        if s["kind"] == "card":
            seg_card(img, s, lt, t); flash(img, 0.6 * (1 - eo3(lt / 0.25)))
        elif s["kind"] == "desktop": seg_desktop(img, s, lt, t)
        else: seg_phone(img, s, lt, t)
    else:
        outro(img, t); flash(img, 0.8 * (1 - eo3((t - T_OUTRO0) / 0.3)))
    p = pulse(t)
    if p > 0.02: img = shake_zoom(img, 1 + 0.006 * p)
    return img

def cues():
    cs = [(0.02, "pop", 0.7), (1.0, "tick", 0.5), (2.0, "tick", 0.5), (7.5, "whoosh", 0.7)]
    for k in range(16):
        cs.append((8 + k * 0.5, "tick", 0.4))
        if k % 4 == 1: cs.append((8 + k * 0.5, "glitch", 0.35))
    cs += [(15.3, "whoosh_long", 0.6), (16.0, "impact", 0.6), (23.7, "whoosh", 0.6)]
    for s in SEGS:
        if s["kind"] == "card": cs += [(s["t0"] - 0.1, "whoosh_long" if s["ci"] else "whoosh", 0.55), (s["t0"] + 0.05, "impact", 0.45)]
        else:
            cs += [(s["t0"] - 0.12, "whoosh", 0.45), (s["t0"] + 0.18, "pop", 0.3)]
    cs += [(287.7, "whoosh_long", 0.5)]
    for j in range(4): cs.append((289.0 + j * 0.3, "pop", 0.45))
    return cs

def fmt(t):
    ms = int(round(t * 1000)); return "%02d:%02d:%02d,%03d" % (ms // 3600000, ms // 60000 % 60, ms // 1000 % 60, ms % 1000)

def write_srt(path):
    items = [(0.5, 7.5, "Lise hayatın tek uygulamada."), (16.2, 23.5, "KampüsAI: lise öğrencileri için yapay zekâ destekli ders asistanı.")]
    for s in SEGS:
        if s["kind"] == "card": items.append((s["t0"] + 0.3, s["t0"] + s["d"] - 0.1, "%d. %s: %s" % (s["ci"] + 1, CH[s["ci"]][0], CH[s["ci"]][1])))
        else: items.append((s["t0"] + 0.3, s["t0"] + s["d"] - 0.1, s["title"] + ": " + s["sub"]))
    items.append((288.5, 299.0, "KampüsAI. Hesap yok, reklam yok, internetsiz de çalışır. Android, Windows ve Web."))
    with open(path, "w", encoding="utf-8") as f:
        for i, (a, b, x) in enumerate(items, 1): f.write("%d\n%s --> %s\n%s\n\n" % (i, fmt(a), fmt(b), x))

def render(preview=None):
    if preview is not None:
        for t in preview: cv2.imwrite(os.path.join(OUT, "long_%06.2f.jpg" % t), frame_at(t), [cv2.IMWRITE_JPEG_QUALITY, 85])
        return
    vid = os.path.join(OUT, "long_video.mp4")
    ff = subprocess.Popen(["ffmpeg", "-y", "-loglevel", "error", "-f", "rawvideo", "-pix_fmt", "bgr24", "-s", "%dx%d" % (W, H), "-r", str(FPS), "-i", "-",
                           "-c:v", "libx264", "-preset", "medium", "-crf", "19", "-pix_fmt", "yuv420p", "-movflags", "+faststart", vid], stdin=subprocess.PIPE)
    N = int(round(DUR * FPS)); st = time.time()
    for n in range(N):
        ff.stdin.write(frame_at(n / FPS).tobytes())
        if n % 600 == 0: print("kare", n, "/", N, round(time.time() - st), "sn", flush=True)
    ff.stdin.close(); ff.wait()
    wav = os.path.join(OUT, "long_audio.wav")
    mix_audio(os.path.join(HERE, "music_5dk.wav"), cues(), wav, DUR)
    final = os.path.join(OUT, "KampusAI-tanitim-5dk.mp4")
    subprocess.run(["ffmpeg", "-y", "-loglevel", "error", "-i", vid, "-i", wav, "-c:v", "copy", "-c:a", "aac", "-b:a", "192k", "-shortest",
                    "-metadata", "title=KampüsAI — 5 dakikalık tanıtım", "-movflags", "+faststart", final], check=True)
    write_srt(os.path.join(OUT, "KampusAI-tanitim-5dk.srt"))
    print("bitti", final)

if __name__ == "__main__":
    if len(sys.argv) > 1 and sys.argv[1] == "preview": render([float(x) for x in sys.argv[2:]])
    elif len(sys.argv) > 1 and sys.argv[1] == "plan":
        for s in SEGS: print(round(s["t0"], 1), s["d"], s["kind"], s.get("name", CH[s["ci"]][0]))
    else: render()
