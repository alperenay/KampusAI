"""1 dakikalık dikey (9:16) tanıtım: ritme oturan hızlı kesmeler, telefon çerçevesi, hareketli yazılar."""
import sys, subprocess, time
from fx import *

W, H = 1080, 1920
BEAT = 0.5; DUR = 64.0
OUT = os.path.join(HERE, "out"); os.makedirs(OUT, exist_ok=True)
bg = Background(W, H)
DEV = "phone"
SW = 560; SH = int(SW * 1688 / 780)
cues = []
def cue(t, name, g=0.6): cues.append((t, name, g))

def energy(t):
    if t < 4: return 0.25
    if t < 8: return 0.4 + 0.6 * (t - 4) / 4
    if 44 <= t < 48: return 0.45
    if t >= 58: return 0.55
    return 1.0
def pulse(t):
    if t < 8 or 44 <= t < 48 or t >= 58: return 0.0
    return math.exp(-(t % BEAT) * 9)

FEATS = [
    ("Sor.", "Yapay zekâ asistanı her soruyu adım adım, formülleriyle anlatır", [("chat", .06, .9, 4)], (.5, .38)),
    ("Yaz.", "Maarif Modeli açık uçlu yazılılar, cevap anahtarı ve puanlama", [("yazili", .3, 1, 2.5), ("yazkey", .1, .8, 1.5)], (.5, .4)),
    ("Dinle.", "Her konu, iki sunuculu bir podcast", [("podcast", .05, 1, 4)], (.5, .45)),
    ("Takip et.", "Deneme netlerin, puanın ve sıralama tahminin", [("exams", 0, 1, 2), ("puan", 0, 1, 2)], (.5, .4)),
    ("Hedefle.", "Tercih Robotu: güvenli, uygun ve hayal bölümler", [("tercih", 0, 1, 4)], (.5, .35)),
    ("Dene.", "Sanal laboratuvar: deneyler 2B ve 3B", [("lab", 0, 1, 4)], (.5, .4)),
    ("Hologram.", "Ekran bir pencereye dönüşür, deney derinlikte durur", [("holo", 0, 1, 4)], (.5, .45)),
    ("Elinle yönet.", "Kameraya el hareketi yeter", [("hand", 0, 1, 4)], (.5, .4)),
    ("Parçala.", "DNA, hücre, kalp… 3B modelleri aç, dokun, öğren", [("dna", 0, 1, 2.5), ("cell", .1, 1, 1.5)], (.5, .38)),
    ("Kur.", "Molekülü elinle kur, gerçek şekline otursun", [("mol", 0, 1, 4)], (.5, .4)),
    ("Keşfet.", "3B Dünya Küresi: levhalar, depremler, iklim, gündüz-gece", [("globe", 0, 1, 2.5), ("sun", .2, 1, 1.5)], (.5, .35)),
    ("Konuş.", "Hologram öğretmene sor, sesli anlatsın", [("teacher", .2, 1, 4)], (.5, .3)),
]
TEASE = [("globe", .55), ("holo", .5), ("dna", .7), ("yazili", .6), ("mol", .9), ("lab", .55), ("chat", .85), ("teacher", .75)]
TEASE_WORDS = ["SOR.", "YAZ.", "DENE.", "KEŞFET."]

def part_frame(parts, lt):
    acc = 0
    for name, a, b, d in parts:
        if lt < acc + d or (name, a, b, d) == parts[-1]:
            c = clip(DEV, name); k = clamp((lt - acc) / d)
            return c.get(int((a + (b - a) * k) * (c.n - 1)))
        acc += d

ICON = mark_icon(250)

def draw_phone(img, frame, cx, cy, scale=1.0, ax=0, ay=0, rz=0, Z=1.0, focus=(.5, .4), blur=0, alpha=1.0):
    lay = phone_layer(frame, SW, SH)
    if blur > 2: lay = motion_blur(lay, blur)
    h, w = lay.shape[:2]
    Hm = place_H(w, h, cx, cy, scale, rz, ax, ay)
    body, m, (ox, oy), _ = phone_body(SW, SH)
    F = cv2.perspectiveTransform(np.float32([[[ox + focus[0] * SW, oy + focus[1] * SH]]]), Hm).reshape(2)
    Hm = zoom_H(Hm, Z, F, (W / 2, H * 0.56))
    warp_blit(img, lay, Hm, alpha)

def feature(img, i, lt, t):
    word, sub, parts, focus = FEATS[i]
    d = 4.0
    fr = part_frame(parts, lt)
    kin = eo3(lt / 0.38); kout = ein((lt - (d - 0.22)) / 0.22)
    x = W / 2 + (1 - kin) * W * 1.05 - kout * W * 1.05
    ay = (1 - kin) * -38 + kout * 38 + 7 * math.sin(t * 1.1 + i)
    ax = 4 * math.sin(t * 0.8 + i * 2)
    cy = H * 0.56 + 10 * math.sin(t * 1.6)
    zin = eio((lt - 1.75) / 0.3); zout = eio((lt - 3.35) / 0.3)
    Z = 1 + 0.3 * zin * (1 - zout)
    blur = max(1 - kin, kout) * 90
    draw_phone(img, fr, x, cy, 1.0, ax, ay, 0, Z, focus, blur)
    # yazılar
    ta = 1 - eio((lt - (d - 0.16)) / 0.16)
    chip = pill("%02d" % (i + 1), "bold", 34, bg=(70, 40, 20), fg=ACC2, padx=24, pady=10, border=ACC)
    blit(img, chip, W / 2, 150 + (1 - eo3(lt / 0.25)) * -40, ta * eo3(lt / 0.2))
    k = clamp((lt - 0.08) / 0.32)
    ws = text_sprite(word, "black", 150 if len(word) < 9 else 128, WHITE, True, 0, ACC)
    blit(img, ws, W / 2, 300, ta * clamp(k * 3), 0.55 + 0.45 * eback(k))
    # vurgu çizgisi
    bw = int(ws.shape[1] * 0.55 * eo3((lt - 0.25) / 0.35))
    if bw > 4: cv2.rectangle(img, (int(W / 2 - bw / 2), 392), (int(W / 2 + bw / 2), 400), ACC2, -1)
    lines = wrap(sub, "semi", 44, 900)
    ks = eo3((lt - 0.3) / 0.4)
    for j, ln in enumerate(lines[:2]):
        s = text_sprite(ln, "semi", 44, (235, 228, 220), True)
        blit(img, s, W / 2, 1800 + j * 60 - (1 - ks) * -30 + (len(lines) == 1) * 25, ta * ks)

def tease(img, t):
    lt = t - 4.0; idx = min(7, int(lt / 0.5)); u = lt - idx * 0.5
    name, frac = TEASE[idx]; c = clip(DEV, name)
    fr = c.get(int(frac * (c.n - 1)) + int(u * FPS))
    z = 1.16 - 0.16 * eo3(u / 0.5) + (0.25 * ein((lt - 3.7) / 0.3) if idx == 7 else 0)
    img[:] = fill_cover(fr, W, H, z, 0.5, 0.3)
    img[:] = (img.astype(np.float32) * 0.62).astype(np.uint8)
    w = TEASE_WORDS[min(3, int(lt))]
    ws = text_sprite(w, "black", 200, WHITE, True, 0, ACC)
    kk = (lt % 1.0)
    blit(img, ws, W / 2, H / 2, 1.0, 1.25 - 0.25 * eo3(kk / 0.18))
    if idx % 2 == 1: rgb_split(img, 14 * (1 - eo3(u / 0.12)))
    flash(img, 0.55 * (1 - eo3(u / 0.12)))
    flash(img, ein((lt - 3.55) / 0.45))

def title(img, t, lt):
    flash(img, 0)  # yer
    s = 1 + 0.9 * (1 - eo3(lt / 0.24))
    ts = text_sprite("KampüsAI", "black", 190, WHITE, True, 0, ACC)
    blit(img, ICON, W / 2, 720 - (1 - eback(clamp((lt - 0.1) / 0.45))) * 120, clamp((lt - 0.1) / 0.2), 0.4 + 0.6 * eback(clamp((lt - 0.1) / 0.45)))
    blit(img, ts, W / 2, 1000, clamp(lt / 0.1), s)
    for j, ln in enumerate(["Lise öğrencileri için", "yapay zekâ destekli ders asistanı"]):
        k = eo3((lt - 0.55 - j * 0.15) / 0.4)
        blit(img, text_sprite(ln, "semi", 52, (240, 232, 225), True), W / 2, 1150 + j * 70 + (1 - k) * 30, k)

def intro(img, t):
    k = eback(clamp(t / 0.5))
    blit(img, ICON, W / 2, 760, clamp(t / 0.15), 0.3 + 0.7 * k)
    for j, (w, tt, col) in enumerate([("Lise hayatın", 1.0, WHITE), ("tek uygulamada.", 2.0, ACC2)]):
        kk = clamp((t - tt) / 0.35)
        if kk > 0:
            blit(img, text_sprite(w, "black", 110, col, True), W / 2, 1010 + j * 135 + (1 - eo3(kk)) * 50, kk, 0.8 + 0.2 * eback(kk))
    if t > 3.6:
        z = 1 + 0.6 * ein((t - 3.6) / 0.4)
        img[:] = shake_zoom(img, z)

def outro(img, t, lt):
    k = eback(clamp(lt / 0.5))
    blit(img, ICON, W / 2, 640, clamp(lt / 0.15), 0.4 + 0.6 * k)
    kk = eo3((lt - 0.25) / 0.4)
    blit(img, text_sprite("KampüsAI", "black", 170, WHITE, True, 0, ACC), W / 2, 880 + (1 - kk) * 40, kk)
    kk = eo3((lt - 0.6) / 0.4)
    blit(img, pill("Android · Windows · Web", "semi", 40, bg=(60, 34, 20), fg=WHITE, padx=34, pady=16, border=ACC), W / 2, 1010, kk)
    for j, w in enumerate(["Hesap yok", "Reklam yok", "İnternetsiz de çalışır"]):
        kk = eback(clamp((lt - 1.2 - j * 0.35) / 0.35))
        blit(img, pill(w, "semi", 38, bg=(40, 30, 26), fg=ACC2, padx=28, pady=14), W / 2, 1150 + j * 95, clamp((lt - 1.2 - j * 0.35) / 0.15), 0.6 + 0.4 * kk)
    kk = eo3((lt - 2.8) / 0.5)
    blit(img, text_sprite("Lise hayatın tek uygulamada.", "xbold", 56, WHITE, True), W / 2, 1520, kk)
    flash(img, ein((lt - 5.1) / 0.9), (0, 0, 0))

def frame_at(t):
    img = bg.render(t, energy(t) + 0.6 * pulse(t))
    if t < 4: intro(img, t)
    elif t < 8: tease(img, t)
    elif t < 10:
        lt = t - 8; title(img, t, lt)
        flash(img, 1 - eo3(lt / 0.35))
        if lt > 1.75: img[:] = shake_zoom(img, 1 + 0.5 * ein((lt - 1.75) / 0.25))
    elif t < 58:
        i = int((t - 10) / 4); feature(img, i, (t - 10) - i * 4, t)
        lt = (t - 10) - i * 4
        flash(img, 0.35 * (1 - eo3(lt / 0.12)))
    else:
        outro(img, t, t - 58); flash(img, 0.8 * (1 - eo3((t - 58) / 0.3)))
    p = pulse(t)
    if p > 0.02 and not (8 <= t < 8.4): img = shake_zoom(img, 1 + 0.012 * p)
    if 8 <= t < 8.5:
        a = (1 - eo3((t - 8) / 0.5)) * 18
        img = shake_zoom(img, 1.01, math.sin(t * 90) * a, math.cos(t * 77) * a)
    return img

def build_cues():
    cue(0.02, "pop", 0.7); cue(1.0, "tick", 0.5); cue(2.0, "tick", 0.5); cue(3.55, "whoosh", 0.7)
    for k in range(8):
        cue(4 + k * 0.5, "tick", 0.45)
        if k in (1, 5): cue(4 + k * 0.5, "glitch", 0.4)
    cue(7.3, "whoosh_long", 0.6); cue(9.75, "whoosh", 0.6)
    for i in range(12):
        t0 = 10 + i * 4
        cue(t0 - 0.1, "whoosh", 0.65); cue(t0 + 0.12, "pop", 0.45); cue(t0 + 1.75, "whoosh_down", 0.35)
    cue(57.85, "whoosh_long", 0.5)
    for j in range(3): cue(58 + 1.2 + j * 0.35, "pop", 0.5)

def render(t0=0.0, t1=DUR, path=None, preview=None):
    if preview is not None:
        for t in preview:
            cv2.imwrite(os.path.join(OUT, "reel_%05.2f.jpg" % t), frame_at(t), [cv2.IMWRITE_JPEG_QUALITY, 85])
        return
    vid = os.path.join(OUT, "reel_video.mp4")
    ff = subprocess.Popen(["ffmpeg", "-y", "-loglevel", "error", "-f", "rawvideo", "-pix_fmt", "bgr24", "-s", "%dx%d" % (W, H), "-r", str(FPS), "-i", "-",
                           "-c:v", "libx264", "-preset", "medium", "-crf", "18", "-pix_fmt", "yuv420p", "-movflags", "+faststart", vid], stdin=subprocess.PIPE)
    N = int(round((t1 - t0) * FPS)); st = time.time()
    for n in range(N):
        ff.stdin.write(frame_at(t0 + n / FPS).tobytes())
        if n % 300 == 0: print("kare", n, "/", N, round(time.time() - st), "sn", flush=True)
    ff.stdin.close(); ff.wait()
    build_cues()
    wav = os.path.join(OUT, "reel_audio.wav")
    mix_audio(os.path.join(HERE, "music_1dk.wav"), cues, wav, DUR)
    final = os.path.join(OUT, "KampusAI-reels-1dk.mp4")
    subprocess.run(["ffmpeg", "-y", "-loglevel", "error", "-i", vid, "-i", wav, "-c:v", "copy", "-c:a", "aac", "-b:a", "192k", "-shortest",
                    "-metadata", "title=KampüsAI — 1 dakikalık tanıtım", "-movflags", "+faststart", final], check=True)
    print("bitti", final)

if __name__ == "__main__":
    if len(sys.argv) > 1 and sys.argv[1] == "preview":
        render(preview=[float(x) for x in sys.argv[2:]])
    else: render()
