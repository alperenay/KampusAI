"""Edit motoru: katmanlar, cihaz çerçeveleri, hareketli yazı, geçişler, arka plan. numpy + OpenCV + PIL."""
import cv2, numpy as np, os, math, json, functools
from PIL import Image, ImageDraw, ImageFont, ImageFilter

FPS = 30
HERE = os.path.dirname(os.path.abspath(__file__))
FONT = {
    "black": "/usr/share/fonts/opentype/inter/InterDisplay-Black.otf",
    "xbold": "/usr/share/fonts/opentype/inter/InterDisplay-ExtraBold.otf",
    "bold": "/usr/share/fonts/opentype/inter/Inter-Bold.otf",
    "semi": "/usr/share/fonts/opentype/inter/Inter-SemiBold.otf",
    "med": "/usr/share/fonts/opentype/inter/Inter-Medium.otf",
}
ACC = (255, 160, 106)      # BGR: mavi (#6aa0ff)
ACC2 = (112, 209, 255)     # BGR: sarı (#ffd170)
ACC3 = (238, 211, 34)      # BGR: camgöbeği (#22d3ee)
WHITE = (255, 255, 255)

def clamp(x, a=0.0, b=1.0): return a if x < a else b if x > b else x
def eo3(k): k = clamp(k); return 1 - (1 - k) ** 3
def eio(k): k = clamp(k); return k * k * (3 - 2 * k)
def eback(k, s=1.9):
    k = clamp(k); k -= 1; return k * k * ((s + 1) * k + s) + 1
def ein(k): k = clamp(k); return k ** 3
def lerp(a, b, k): return a + (b - a) * k

# ---------------- kaynak klipler ----------------
class Clip:
    def __init__(self, dev, name):
        self.d = os.path.join(HERE, "clips", dev, name)
        self.n = len([f for f in os.listdir(self.d) if f.endswith(".jpg")]) if os.path.isdir(self.d) else 0
        self.cache = {}
    def get(self, i):
        i = int(clamp(i, 0, max(0, self.n - 1)))
        if i in self.cache: return self.cache[i]
        if len(self.cache) > 6: self.cache.pop(next(iter(self.cache)))
        im = cv2.imread(os.path.join(self.d, "%05d.jpg" % (i + 1)), cv2.IMREAD_COLOR)
        if im is None: im = np.zeros((1080, 1920, 3), np.uint8)
        self.cache[i] = im; return im
    @property
    def sec(self): return self.n / FPS
_clips = {}
def clip(dev, name):
    k = (dev, name)
    if k not in _clips: _clips[k] = Clip(dev, name)
    return _clips[k]

# ---------------- metin ----------------
@functools.lru_cache(maxsize=512)
def text_sprite(text, font="black", size=100, color=WHITE, shadow=True, tracking=0, glow=None):
    f = ImageFont.truetype(FONT[font], size)
    bb = f.getbbox(text)
    w = bb[2] - bb[0] + int(abs(tracking) * len(text)) + 4; h = bb[3] - bb[1]
    pad = int(size * 0.35)
    im = Image.new("RGBA", (w + pad * 2, int(size * 1.25) + pad * 2), (0, 0, 0, 0))
    d = ImageDraw.Draw(im)
    rgb = (color[2], color[1], color[0])
    x0, y0 = pad - bb[0], pad + int(size * 0.02)
    def draw(dr, fill):
        if tracking:
            x = x0
            for ch in text:
                dr.text((x, y0), ch, font=f, fill=fill); x += f.getlength(ch) + tracking
        else: dr.text((x0, y0), text, font=f, fill=fill)
    if shadow:
        sh = Image.new("RGBA", im.size, (0, 0, 0, 0)); draw(ImageDraw.Draw(sh), (0, 0, 0, 150))
        sh = sh.filter(ImageFilter.GaussianBlur(size * 0.06))
        im = Image.alpha_composite(im, Image.fromarray(np.roll(np.array(sh), int(size * 0.05), axis=0)))
    if glow:
        gl = Image.new("RGBA", im.size, (0, 0, 0, 0)); draw(ImageDraw.Draw(gl), (glow[2], glow[1], glow[0], 200))
        gl = gl.filter(ImageFilter.GaussianBlur(size * 0.18))
        im = Image.alpha_composite(gl, im)
    draw(ImageDraw.Draw(im), rgb + (255,))
    a = np.array(im)
    ys, xs = np.where(a[:, :, 3] > 3)
    if len(ys): a = a[max(0, ys.min() - 2): ys.max() + 3, max(0, xs.min() - 2): xs.max() + 3]
    return cv2.cvtColor(a, cv2.COLOR_RGBA2BGRA)

def wrap(text, font, size, maxw):
    f = ImageFont.truetype(FONT[font], size); words = text.split(); lines = []; cur = ""
    for w_ in words:
        t = (cur + " " + w_).strip()
        if f.getlength(t) > maxw and cur: lines.append(cur); cur = w_
        else: cur = t
    if cur: lines.append(cur)
    return lines

@functools.lru_cache(maxsize=128)
def pill(text, font="semi", size=30, bg=(60, 40, 30), fg=WHITE, padx=26, pady=14, alpha=230, border=None):
    t = text_sprite(text, font, size, fg, shadow=False)
    h, w = t.shape[:2]
    W, H = w + padx * 2, h + pady * 2
    im = Image.new("RGBA", (W, H), (0, 0, 0, 0)); d = ImageDraw.Draw(im)
    d.rounded_rectangle([0, 0, W - 1, H - 1], radius=H // 2, fill=(bg[2], bg[1], bg[0], alpha),
                        outline=None if border is None else (border[2], border[1], border[0], 255), width=2)
    a = cv2.cvtColor(np.array(im), cv2.COLOR_RGBA2BGRA)
    blit(a[:, :, :3], t, W / 2, H / 2, alpha_dst=a)
    return a

# ---------------- birleştirme ----------------
def blit(dst, spr, cx, cy, alpha=1.0, scale=1.0, alpha_dst=None, anchor="c"):
    """BGRA sprite'ı BGR (ya da BGRA) tuvale yerleştirir. cx,cy: merkez (anchor='c') ya da sol-orta ('l')."""
    if alpha <= 0.003 or spr is None: return
    if abs(scale - 1) > 1e-3:
        h, w = spr.shape[:2]; nw, nh = max(1, int(w * scale)), max(1, int(h * scale))
        spr = cv2.resize(spr, (nw, nh), interpolation=cv2.INTER_LINEAR if scale > 1 else cv2.INTER_AREA)
    h, w = spr.shape[:2]
    x0 = int(round(cx - (w / 2 if anchor == "c" else 0))); y0 = int(round(cy - h / 2))
    H, W = dst.shape[:2]
    sx0, sy0 = max(0, -x0), max(0, -y0); dx0, dy0 = max(0, x0), max(0, y0)
    dx1, dy1 = min(W, x0 + w), min(H, y0 + h)
    if dx1 <= dx0 or dy1 <= dy0: return
    s = spr[sy0: sy0 + (dy1 - dy0), sx0: sx0 + (dx1 - dx0)]
    a = s[:, :, 3:4].astype(np.float32) * (alpha / 255.0)
    roi = dst[dy0:dy1, dx0:dx1, :3]
    roi[:] = (roi.astype(np.float32) * (1 - a) + s[:, :, :3].astype(np.float32) * a).astype(np.uint8)
    if alpha_dst is not None:
        ar = alpha_dst[dy0:dy1, dx0:dx1, 3:4]
        ar[:] = np.maximum(ar, (a * 255).astype(np.uint8))

def warp_blit(dst, spr, Hm, alpha=1.0):
    """BGRA sprite'ı 3x3 homografiyle tuvale çizer (yalnızca kapladığı bölge hesaplanır)."""
    if alpha <= 0.003: return
    h, w = spr.shape[:2]
    pts = cv2.perspectiveTransform(np.float32([[[0, 0]], [[w, 0]], [[w, h]], [[0, h]]]), Hm).reshape(-1, 2)
    H, W = dst.shape[:2]
    x0, y0 = max(0, int(math.floor(pts[:, 0].min()))), max(0, int(math.floor(pts[:, 1].min())))
    x1, y1 = min(W, int(math.ceil(pts[:, 0].max()))), min(H, int(math.ceil(pts[:, 1].max())))
    if x1 <= x0 or y1 <= y0: return
    T = np.array([[1, 0, -x0], [0, 1, -y0], [0, 0, 1]], np.float64)
    out = cv2.warpPerspective(spr, T @ Hm, (x1 - x0, y1 - y0), flags=cv2.INTER_LINEAR, borderMode=cv2.BORDER_CONSTANT, borderValue=(0, 0, 0, 0))
    a = out[:, :, 3:4].astype(np.float32) * (alpha / 255.0)
    roi = dst[y0:y1, x0:x1]
    roi[:] = (roi.astype(np.float32) * (1 - a) + out[:, :, :3].astype(np.float32) * a).astype(np.uint8)

def place_H(w, h, cx, cy, scale=1.0, rz=0.0, ax=0.0, ay=0.0, persp=2.6):
    """Katmanı (w×h) 3B eğimle (derece) ve ölçekle tuvalde (cx,cy) merkezine oturtan homografi."""
    ax, ay, rz = math.radians(ax), math.radians(ay), math.radians(rz)
    D = persp * max(w, h)
    src = np.float32([[0, 0], [w, 0], [w, h], [0, h]])
    dst = []
    for x, y in src:
        X, Y, Z = x - w / 2, y - h / 2, 0.0
        X, Z = X * math.cos(ay) + Z * math.sin(ay), -X * math.sin(ay) + Z * math.cos(ay)
        Y, Z = Y * math.cos(ax) - Z * math.sin(ax), Y * math.sin(ax) + Z * math.cos(ax)
        f = D / (D + Z); X, Y = X * f, Y * f
        X, Y = X * math.cos(rz) - Y * math.sin(rz), X * math.sin(rz) + Y * math.cos(rz)
        dst.append([cx + X * scale, cy + Y * scale])
    return cv2.getPerspectiveTransform(src, np.float32(dst))

def zoom_H(Hm, Z, F, C):
    """Kamera yakınlaştırması: F noktası çevresinde Z kat, F→C'ye kayar."""
    if abs(Z - 1) < 1e-4: return Hm
    k = clamp((Z - 1) / 0.6)
    tx = lerp(F[0], C[0], k); ty = lerp(F[1], C[1], k)
    M = np.array([[Z, 0, tx - F[0] * Z], [0, Z, ty - F[1] * Z], [0, 0, 1]], np.float64)
    return M @ Hm

def motion_blur(spr, px, horizontal=True):
    px = int(px)
    if px < 3: return spr
    k = np.zeros((1, px) if horizontal else (px, 1), np.float32); k[:] = 1.0 / px
    return cv2.filter2D(spr, -1, k)

# ---------------- cihazlar ----------------
@functools.lru_cache(maxsize=8)
def phone_body(sw, sh):
    """Telefon gövdesi: ekran (sw×sh), kenar boşluğu ve gölgeyle BGRA + ekran maskesi."""
    bz = int(sw * 0.045); pad = int(sw * 0.16)
    W, H = sw + 2 * bz + 2 * pad, sh + 2 * bz + 2 * pad
    r_body = int(sw * 0.15); r_scr = int(sw * 0.12)
    im = Image.new("RGBA", (W, H), (0, 0, 0, 0))
    sh_ = Image.new("RGBA", (W, H), (0, 0, 0, 0)); ImageDraw.Draw(sh_).rounded_rectangle([pad + 10, pad + 40, W - pad - 10, H - pad + 30], radius=r_body, fill=(0, 0, 0, 170))
    im = Image.alpha_composite(im, sh_.filter(ImageFilter.GaussianBlur(pad * 0.45)))
    d = ImageDraw.Draw(im)
    d.rounded_rectangle([pad, pad, W - pad, H - pad], radius=r_body, fill=(18, 20, 28, 255), outline=(92, 98, 120, 255), width=max(2, sw // 160))
    d.rounded_rectangle([pad + 3, pad + 3, W - pad - 3, H - pad - 3], radius=r_body - 3, outline=(40, 44, 58, 255), width=max(2, sw // 200))
    # yan tuşlar
    d.rounded_rectangle([W - pad - 1, pad + sh * 0.18, W - pad + 5, pad + sh * 0.28], radius=3, fill=(70, 74, 90, 255))
    d.rounded_rectangle([pad - 5, pad + sh * 0.16, pad + 1, pad + sh * 0.22], radius=3, fill=(70, 74, 90, 255))
    mask = Image.new("L", (W, H), 0)
    ImageDraw.Draw(mask).rounded_rectangle([pad + bz, pad + bz, pad + bz + sw, pad + bz + sh], radius=r_scr, fill=255)
    isl = Image.new("RGBA", (W, H), (0, 0, 0, 0))
    iw, ih = int(sw * 0.3), int(sw * 0.085)
    ImageDraw.Draw(isl).rounded_rectangle([W / 2 - iw / 2, pad + bz + sw * 0.03, W / 2 + iw / 2, pad + bz + sw * 0.03 + ih], radius=ih // 2, fill=(0, 0, 0, 255))
    a = cv2.cvtColor(np.array(im), cv2.COLOR_RGBA2BGRA)
    m = (np.array(mask).astype(np.float32) / 255.0)[:, :, None]
    i_ = cv2.cvtColor(np.array(isl), cv2.COLOR_RGBA2BGRA)
    return a, m, (pad + bz, pad + bz), i_

def phone_layer(frame, sw, sh):
    body, m, (ox, oy), isl = phone_body(sw, sh)
    out = body.copy()
    fh, fw = frame.shape[:2]
    # ekran oranına göre kırp (üstten)
    tr = sh / sw
    if fh / fw > tr: frame = frame[: int(fw * tr)]
    else: cw = int(fh / tr); x0 = (fw - cw) // 2; frame = frame[:, x0: x0 + cw]
    scr = cv2.resize(frame, (sw, sh), interpolation=cv2.INTER_AREA)
    mm = m[oy: oy + sh, ox: ox + sw]
    reg = out[oy: oy + sh, ox: ox + sw]
    reg[:, :, :3] = (reg[:, :, :3].astype(np.float32) * (1 - mm) + scr.astype(np.float32) * mm).astype(np.uint8)
    reg[:, :, 3:4] = np.maximum(reg[:, :, 3:4], (mm * 255).astype(np.uint8))
    ia = isl[:, :, 3:4].astype(np.float32) / 255
    out[:, :, :3] = (out[:, :, :3] * (1 - ia) + isl[:, :, :3] * ia).astype(np.uint8)
    return out

@functools.lru_cache(maxsize=8)
def browser_body(cw, ch, title="KampüsAI"):
    bar = max(30, int(cw * 0.026)); pad = int(cw * 0.06); r = int(cw * 0.012)
    W, H = cw + 2 * pad, ch + bar + 2 * pad
    im = Image.new("RGBA", (W, H), (0, 0, 0, 0))
    sh_ = Image.new("RGBA", (W, H), (0, 0, 0, 0)); ImageDraw.Draw(sh_).rounded_rectangle([pad + 10, pad + 30, W - pad - 10, H - pad + 24], radius=r, fill=(0, 0, 0, 190))
    im = Image.alpha_composite(im, sh_.filter(ImageFilter.GaussianBlur(pad * 0.4)))
    d = ImageDraw.Draw(im)
    d.rounded_rectangle([pad, pad, W - pad, H - pad], radius=r, fill=(24, 26, 34, 255), outline=(70, 76, 96, 255), width=2)
    cy = pad + bar / 2; rr = bar * 0.17
    for i, c in enumerate([(255, 95, 87), (254, 188, 46), (40, 200, 64)]):
        x = pad + bar * 0.6 + i * bar * 0.55; d.ellipse([x - rr, cy - rr, x + rr, cy + rr], fill=c + (255,))
    f = ImageFont.truetype(FONT["semi"], int(bar * 0.42))
    uw = cw * 0.34; ux = pad + cw / 2 - uw / 2
    d.rounded_rectangle([ux, cy - bar * 0.3, ux + uw, cy + bar * 0.3], radius=int(bar * 0.3), fill=(40, 44, 56, 255))
    tw = f.getlength(title); d.text((pad + cw / 2 - tw / 2, cy - bar * 0.27), title, font=f, fill=(200, 206, 222, 255))
    a = cv2.cvtColor(np.array(im), cv2.COLOR_RGBA2BGRA)
    return a, (pad, pad + bar)

def browser_layer(frame, cw, ch):
    body, (ox, oy) = browser_body(cw, ch)
    out = body.copy()
    scr = cv2.resize(frame[:, :1920] if frame.shape[1] > 1920 else frame, (cw, ch), interpolation=cv2.INTER_AREA)
    out[oy: oy + ch, ox: ox + cw, :3] = scr; out[oy: oy + ch, ox: ox + cw, 3] = 255
    return out

def to_bgra(img):
    return cv2.cvtColor(img, cv2.COLOR_BGR2BGRA)

# ---------------- arka plan ----------------
class Background:
    def __init__(self, W, H, seed=3):
        self.W, self.H = W, H
        yy, xx = np.mgrid[0:H, 0:W].astype(np.float32)
        base = np.zeros((H, W, 3), np.float32)
        top = np.array([36, 14, 8], np.float32); bot = np.array([20, 8, 12], np.float32)
        k = (yy / H)[:, :, None]
        base[:] = top * (1 - k) + bot * k
        r = np.sqrt(((xx - W / 2) / W) ** 2 + ((yy - H / 2) / H) ** 2)
        self.vig = np.clip(1.15 - r * 1.1, 0.35, 1)[:, :, None].astype(np.float32)
        self.base = base
        self.lw, self.lh = W // 10, H // 10
        ly, lx = np.mgrid[0:self.lh, 0:self.lw].astype(np.float32)
        self.lx, self.ly = lx / self.lw, ly / self.lh
        rng = np.random.default_rng(seed)
        self.blobs = [(rng.random() * 6.28, 0.12 + rng.random() * 0.12, c) for c in
                      [(255, 90, 40), (230, 60, 140), (220, 200, 40), (255, 120, 80), (160, 60, 200)]]
        # ızgara çizgileri (ince)
        g = np.zeros((H, W), np.float32); step = max(60, W // 24)
        g[:, ::step] = 1; g[::step, :] = 1
        self.grid = cv2.GaussianBlur(g, (3, 3), 0)[:, :, None] * 10
    def render(self, t, energy=1.0, hue=0.0):
        acc = np.zeros((self.lh, self.lw, 3), np.float32)
        for i, (ph, sp, c) in enumerate(self.blobs):
            cx = 0.5 + 0.38 * math.sin(t * sp + ph + i)
            cy = 0.5 + 0.34 * math.cos(t * sp * 1.3 + ph * 2)
            rad = 0.22 + 0.06 * math.sin(t * 0.7 + i)
            d2 = ((self.lx - cx) * (self.lw / self.lh)) ** 2 + (self.ly - cy) ** 2
            acc += np.exp(-d2 / (2 * rad * rad))[:, :, None] * np.array(c, np.float32) * 0.42
        up = cv2.resize(acc, (self.W, self.H), interpolation=cv2.INTER_LINEAR)
        img = (self.base + up * (0.55 + 0.45 * energy)) * self.vig + self.grid * 0.6
        return np.clip(img, 0, 255).astype(np.uint8)

# ---------------- son işlemler ----------------
def flash(img, a, color=(255, 255, 255)):
    if a <= 0.003: return
    img[:] = (img.astype(np.float32) * (1 - a) + np.array(color, np.float32) * a).astype(np.uint8)

def rgb_split(img, px):
    px = int(px)
    if px < 1: return
    b, g, r = cv2.split(img)
    img[:] = cv2.merge([np.roll(b, -px, axis=1), g, np.roll(r, px, axis=1)])

def shake_zoom(img, z, dx=0, dy=0):
    if abs(z - 1) < 1e-3 and abs(dx) < 0.5 and abs(dy) < 0.5: return img
    H, W = img.shape[:2]
    M = np.array([[z, 0, (1 - z) * W / 2 + dx], [0, z, (1 - z) * H / 2 + dy]], np.float32)
    return cv2.warpAffine(img, M, (W, H), flags=cv2.INTER_LINEAR, borderMode=cv2.BORDER_REFLECT)

def fill_cover(frame, W, H, z=1.0, fx=0.5, fy=0.5):
    """kareyi tuvali kaplayacak şekilde ölçekle ve kırp"""
    fh, fw = frame.shape[:2]
    s = max(W / fw, H / fh) * z
    nw, nh = int(fw * s), int(fh * s)
    im = cv2.resize(frame, (nw, nh), interpolation=cv2.INTER_AREA if s < 1 else cv2.INTER_LINEAR)
    x0 = int(clamp((nw - W) * fx, 0, nw - W)); y0 = int(clamp((nh - H) * fy, 0, nh - H))
    return im[y0: y0 + H, x0: x0 + W].copy()

LOGO = None
def mark_icon(size):
    """Uygulama simgesi: beyaz yuvarlak kare içinde işaret (logo değiştirilmeden)."""
    m = Image.open("/home/claude/ders-asistani/assets/brand/mark.png").convert("RGBA")
    pad = int(size * 0.14)
    im = Image.new("RGBA", (size + 60, size + 60), (0, 0, 0, 0))
    sh = Image.new("RGBA", im.size, (0, 0, 0, 0)); ImageDraw.Draw(sh).rounded_rectangle([30, 40, 30 + size, 40 + size], radius=int(size * 0.24), fill=(0, 0, 0, 150))
    im = Image.alpha_composite(im, sh.filter(ImageFilter.GaussianBlur(14)))
    ImageDraw.Draw(im).rounded_rectangle([30, 30, 30 + size, 30 + size], radius=int(size * 0.24), fill=(255, 255, 255, 255))
    mk = m.resize((size - 2 * pad, size - 2 * pad), Image.LANCZOS)
    im.alpha_composite(mk, (30 + pad, 30 + pad))
    return cv2.cvtColor(np.array(im), cv2.COLOR_RGBA2BGRA)

# ---------------- ses ----------------
def mix_audio(music_wav, cues, out_wav, total_sec, music_gain=0.9):
    import wave
    def rd(p):
        with wave.open(p) as w:
            x = np.frombuffer(w.readframes(w.getnframes()), np.int16).astype(np.float32) / 32767
            return x.reshape(-1, w.getnchannels())
    SR = 44100
    mus = rd(music_wav) * music_gain
    L = int(total_sec * SR)
    out = np.zeros((L, 2), np.float32)
    n = min(L, len(mus)); out[:n] += mus[:n]
    bank = {}
    for t, name, g in cues:
        if name not in bank: bank[name] = rd(os.path.join(HERE, "sfx", name + ".wav"))
        x = bank[name] * g; i = int(t * SR)
        if i >= L or i < 0: continue
        j = min(L, i + len(x)); out[i:j] += x[: j - i]
    # son 1,2 sn kıs
    fo = int(1.2 * SR); out[-fo:] *= np.linspace(1, 0, fo)[:, None]
    out = np.tanh(out * 1.1) / np.tanh(1.1)
    out = out / (np.abs(out).max() + 1e-9) * 0.93
    with wave.open(out_wav, "wb") as w:
        w.setnchannels(2); w.setsampwidth(2); w.setframerate(SR); w.writeframes((out * 32767).astype(np.int16).tobytes())
