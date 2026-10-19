"""Telifsiz, bu iş için üretilmiş enerjik elektronik parça + efekt sesleri (numpy/scipy sentez).
120 BPM: bir vuruş 0,5 sn = 30 fps'de tam 15 kare; kesmeler ritme oturur."""
import numpy as np, wave, os, sys
from scipy.signal import butter, sosfilt, fftconvolve

SR = 44100; BPM = 120; BEAT = 60 / BPM; BAR = BEAT * 4; S16 = BEAT / 4
HERE = os.path.dirname(os.path.abspath(__file__))
rng = np.random.default_rng(11)
def hz(n): return 440.0 * 2 ** ((n - 69) / 12)
def lp(x, fc, order=2): return sosfilt(butter(order, min(fc, SR * 0.45), "low", fs=SR, output="sos"), x)
def hp(x, fc, order=2): return sosfilt(butter(order, fc, "high", fs=SR, output="sos"), x)
def bp(x, lo, hi, order=2): return sosfilt(butter(order, [lo, min(hi, SR * 0.45)], "band", fs=SR, output="sos"), x)
def saw(f, t, ph=0.0): return 2 * ((t * f + ph) % 1.0) - 1
def env_adsr(n, a, d, s, r, sus_len):
    A = int(a * SR); D = int(d * SR); R = int(r * SR); S = max(0, n - A - D - R)
    e = np.concatenate([np.linspace(0, 1, max(A, 1)), np.linspace(1, s, max(D, 1)), np.full(S, s), np.linspace(s, 0, max(R, 1))])
    return e[:n] if len(e) >= n else np.pad(e, (0, n - len(e)))
def write_wav(path, st):
    st = np.clip(st, -1, 1)
    with wave.open(path, "wb") as w:
        w.setnchannels(2); w.setsampwidth(2); w.setframerate(SR); w.writeframes((st * 32767).astype(np.int16).tobytes())

# akorlar (MIDI kök + tip)
PROG = {
    "A": [(57, "m"), (53, "M"), (48, "M"), (55, "M")],     # Am F C G
    "B": [(53, "M"), (55, "M"), (52, "m"), (57, "m")],     # F G Em Am
    "C": [(50, "m"), (57, "m"), (53, "M"), (55, "M")],     # Dm Am F G
}
def chord(root, kind): return [root, root + (3 if kind == "m" else 4), root + 7]

# --- tek sesler ---
def kick():
    n = int(0.42 * SR); t = np.arange(n) / SR
    f = 46 + 110 * np.exp(-t * 28)
    ph = 2 * np.pi * np.cumsum(f) / SR
    body = np.sin(ph) * np.exp(-t * 6.5)
    click = rng.standard_normal(n) * np.exp(-t * 320) * 0.35
    return np.tanh((body + hp(click, 2000)) * 1.6) * 0.9
def clap():
    n = int(0.32 * SR); t = np.arange(n) / SR
    nz = rng.standard_normal(n)
    e = np.zeros(n)
    for o in (0, 0.011, 0.022):
        k = int(o * SR); e[k:] += np.exp(-(t[: n - k]) * 38)
    e += 0.6 * np.exp(-t * 11)
    return bp(nz, 900, 5200) * e * 0.55
def hat(open_=False):
    n = int((0.22 if open_ else 0.06) * SR); t = np.arange(n) / SR
    return hp(rng.standard_normal(n), 7000) * np.exp(-t * (14 if open_ else 70)) * (0.3 if open_ else 0.22)
def crash():
    n = int(2.4 * SR); t = np.arange(n) / SR
    return hp(rng.standard_normal(n), 4500) * np.exp(-t * 1.6) * 0.32
def riser(sec):
    n = int(sec * SR); t = np.arange(n) / SR; k = t / sec
    nz = rng.standard_normal(n)
    out = np.zeros(n); seg = int(0.05 * SR)
    for i in range(0, n, seg):
        fc = 400 + 9000 * (k[i] ** 2)
        out[i:i + seg] = bp(nz[i:i + seg + 0], max(200, fc * 0.6), fc * 1.4, 1)[: len(out[i:i + seg])]
    tone = np.sin(2 * np.pi * np.cumsum(220 + 880 * k ** 2) / SR) * 0.15
    return (out * 0.5 + tone) * (k ** 1.6) * 0.8
def impact():
    n = int(2.2 * SR); t = np.arange(n) / SR
    sub = np.sin(2 * np.pi * np.cumsum(38 + 60 * np.exp(-t * 7)) / SR) * np.exp(-t * 2.2)
    nz = lp(rng.standard_normal(n), 1800) * np.exp(-t * 4) * 0.5
    return np.tanh((sub + nz) * 1.4) * 0.85
def whoosh(sec=0.45, up=True):
    n = int(sec * SR); t = np.arange(n) / SR; k = t / sec
    nz = rng.standard_normal(n); out = np.zeros(n); seg = int(0.01 * SR)
    for i in range(0, n, seg):
        kk = k[i] if up else 1 - k[i]
        fc = 250 * (30 ** kk)
        out[i:i + seg] = bp(nz[i:i + seg], fc * 0.5, fc * 1.6, 1)[: len(out[i:i + seg])]
    e = np.sin(np.pi * k) ** 1.5
    return out * e * 0.9
def pop():
    n = int(0.12 * SR); t = np.arange(n) / SR
    return np.sin(2 * np.pi * np.cumsum(700 + 900 * np.exp(-t * 40)) / SR) * np.exp(-t * 35) * 0.45
def tick():
    n = int(0.03 * SR); t = np.arange(n) / SR
    return hp(rng.standard_normal(n), 3000) * np.exp(-t * 200) * 0.4
def glitch():
    n = int(0.18 * SR); t = np.arange(n) / SR
    sq = np.sign(np.sin(2 * np.pi * (300 + 500 * rng.random()) * t)) * (rng.random(n) > 0.3)
    return lp(sq, 4000) * 0.25 * (1 - t / t[-1])

# --- parça ---
def render(plan, path, tail=2.0):
    """plan: [(bölüm_adı, ölçü_sayısı, {öğeler}, akor_dizisi), ...]"""
    total_bars = sum(p[1] for p in plan)
    L = int((total_bars * BAR + tail) * SR)
    drums = np.zeros(L); bass = np.zeros(L); padL = np.zeros(L); padR = np.zeros(L); pl = np.zeros(L); fx = np.zeros(L)
    side = np.ones(L)
    K, C, H, HO, CR = kick(), clap(), hat(), hat(True), crash()
    def add(buf, x, t0, g=1.0):
        i = int(t0 * SR)
        if i >= L: return
        j = min(L, i + len(x)); buf[i:j] += x[: j - i] * g
    bar0 = 0; marks = []
    for name, nb, el, prog in plan:
        marks.append((name, bar0 * BAR))
        P = PROG[prog]
        if "crash" in el: add(fx, CR, bar0 * BAR)
        if "impact" in el: add(fx, impact(), bar0 * BAR, 0.9)
        if "riser" in el:
            rs = min(nb, 2)
            add(fx, riser(rs * BAR), (bar0 + nb - rs) * BAR, 0.55)
        for b in range(nb):
            tb = (bar0 + b) * BAR
            root, kind = P[b % 4] if nb >= 4 or True else P[0]
            ch = chord(root, kind)
            last_bar = b == nb - 1
            # davul
            for q in range(4):
                tq = tb + q * BEAT
                if "kick" in el and not ("fill" in el and last_bar and q == 3):
                    add(drums, K, tq, 0.95)
                    i = int(tq * SR); m = min(L, i + int(0.3 * SR)); tt = np.arange(m - i) / SR
                    side[i:m] = np.minimum(side[i:m], 1 - 0.65 * np.exp(-tt * 9))
                if "clap" in el and q in (1, 3): add(drums, C, tq, 0.8)
                if "hat" in el: add(drums, HO if "openhat" in el else H, tq + BEAT / 2, 0.8)
                if "shaker" in el:
                    for s in (0, 1, 2, 3): add(drums, H, tq + s * S16, 0.35 if s % 2 == 0 else 0.22)
            if "fill" in el and last_bar:
                for s in range(8): add(drums, C, tb + 2 * BEAT + s * S16, 0.25 + 0.06 * s)
            # bas: sekizliklerin arka yarısı + kök
            if "bass" in el:
                for e8 in range(8):
                    if e8 % 2 == 0 and "kick" in el: continue
                    t0 = tb + e8 * BEAT / 2; n = int(BEAT / 2 * SR * 0.9); t = np.arange(n) / SR
                    f = hz(root - 24 + (12 if e8 in (3, 7) and "bassoct" in el else 0))
                    x = (saw(f, t) * 0.6 + np.sin(2 * np.pi * f * t) * 0.8) * env_adsr(n, 0.004, 0.08, 0.7, 0.03, 0)
                    add(bass, x, t0, 0.42)
            # ped (supersaw)
            if "pad" in el:
                n = int(BAR * SR); t = np.arange(n) / SR
                e = env_adsr(n, 0.02 if "kick" in el else 0.4, 0.3, 0.85, 0.08, 0)
                for vi, nn in enumerate(ch + [ch[0] + 12]):
                    for d in (-0.14, -0.05, 0.05, 0.14):
                        xl = saw(hz(nn + d), t, rng.random()); xr = saw(hz(nn - d), t, rng.random())
                        add(padL, xl * e, tb, 0.022); add(padR, xr * e, tb, 0.022)
            # arpej
            if "pluck" in el:
                arp = [ch[0] + 12, ch[1] + 12, ch[2] + 12, ch[0] + 24]
                patt = [0, 1, 2, 3, 2, 1, 0, 2, 0, 1, 2, 3, 2, 3, 1, 2]
                for s in range(16):
                    n = int(0.28 * SR); t = np.arange(n) / SR
                    f = hz(arp[patt[s]])
                    x = (np.sign(np.sin(2 * np.pi * f * t)) * 0.3 + np.sin(2 * np.pi * f * t)) * np.exp(-t * 16)
                    add(pl, x, tb + s * S16, 0.075 if s % 4 == 0 else 0.05)
            if "lead" in el:
                mel = [ch[2] + 12, ch[1] + 12, ch[0] + 12, ch[1] + 12, ch[2] + 12, ch[0] + 24]
                rh = [0, 3, 6, 8, 10, 13]
                for k_, s in enumerate(rh):
                    n = int((0.35 if k_ < 5 else 0.6) * SR); t = np.arange(n) / SR
                    f = hz(mel[(k_ + b) % len(mel)])
                    vib = 1 + 0.004 * np.sin(2 * np.pi * 5.5 * t)
                    x = (saw(f * vib, t) * 0.5 + saw(f * 1.005 * vib, t) * 0.5) * env_adsr(n, 0.01, 0.1, 0.6, 0.12, 0)
                    add(pl, lp(x, 3500), tb + s * S16, 0.09)
        bar0 += nb
    # filtreler ve efektler
    padL = lp(padL, 2600) * side; padR = lp(padR, 2600) * side
    bass = lp(bass, 900) * side
    # gecikme (noktalı sekizlik) + yankı
    pl = lp(pl, 5500); dl = int(0.375 * SR); plw = pl.copy()
    for k in range(1, 5): plw[dl * k:] += pl[: L - dl * k] * (0.38 ** k)
    ir = rng.standard_normal(int(1.6 * SR)) * np.exp(-np.arange(int(1.6 * SR)) / SR * 3.2) * 0.04
    rev_l = fftconvolve(plw * 0.6 + padL * 0.4, ir)[:L]; rev_r = fftconvolve(plw * 0.6 + padR * 0.4, ir[::-1].copy())[:L]
    L_ = drums + bass + padL + plw * 0.9 + fx + rev_l * 0.5
    R_ = drums + bass + padR + np.concatenate([np.zeros(int(0.012 * SR)), plw[: -int(0.012 * SR)]]) * 0.9 + fx + rev_r * 0.5
    st = np.stack([L_, R_], 1)
    st = hp(st.T, 28).T
    # bitiş: son ölçülerde yavaşça kıs
    fade = np.ones(L); fo = int(tail * SR) + int(BAR * SR)
    fade[-fo:] = np.linspace(1, 0, fo) ** 1.5
    st *= fade[:, None]
    st = np.tanh(st * 1.25) / np.tanh(1.25)
    st = st / (np.abs(st).max() + 1e-9) * 0.89
    write_wav(path, st)
    return marks, total_bars * BAR

def sfx_bank(d):
    os.makedirs(d, exist_ok=True)
    for name, x in (("whoosh", whoosh()), ("whoosh_down", whoosh(0.45, False)), ("whoosh_long", whoosh(0.9)), ("impact", impact()),
                    ("pop", pop()), ("tick", tick()), ("glitch", glitch()), ("riser2", riser(2 * BAR)), ("riser1", riser(BAR))):
        x = x / (np.abs(x).max() + 1e-9) * 0.8
        write_wav(os.path.join(d, name + ".wav"), np.stack([x, x], 1))

if __name__ == "__main__":
    full = {"kick", "clap", "hat", "shaker", "bass", "bassoct", "pad", "pluck", "lead"}
    T1 = [("intro", 2, {"pad", "pluck"}, "A"),
          ("build", 2, {"kick", "hat", "bass", "pad", "pluck", "riser", "fill"}, "A"),
          ("drop", 8, full | {"impact", "crash"}, "B"),
          ("drop2", 10, full | {"crash", "openhat"} - {"lead"}, "A"),
          ("break", 2, {"pad", "pluck", "riser"}, "C"),
          ("drop3", 5, full | {"impact", "crash"}, "B"),
          ("outro", 3, {"pad", "pluck", "impact"}, "A")]
    m1, d1 = render(T1, os.path.join(HERE, "music_1dk.wav"))
    T2 = [("intro", 2, {"pad", "pluck"}, "A"), ("build", 2, {"kick", "hat", "bass", "pad", "pluck", "riser", "fill"}, "A"),
          ("drop", 8, full | {"impact", "crash"}, "B")]
    sec = [("verse", 16, {"kick", "hat", "bass", "pad", "pluck"}, "A"), ("chorus", 16, full | {"crash"}, "B"),
           ("break", 8, {"pad", "pluck", "riser"}, "C")]
    for r in range(3):
        for nm, nb, el, pr in sec: T2.append((nm + str(r + 1), nb, set(el) | ({"impact"} if nm == "chorus" else set()), pr))
    T2 += [("final", 12, full | {"impact", "crash", "openhat"}, "B"), ("outro", 6, {"pad", "pluck", "impact"}, "A")]
    m2, d2 = render(T2, os.path.join(HERE, "music_5dk.wav"))
    sfx_bank(os.path.join(HERE, "sfx"))
    import json
    json.dump({"1dk": [m1, d1], "5dk": [m2, d2]}, open(os.path.join(HERE, "music.json"), "w"))
    print("1 dk", d1, "sn;", "5 dk", d2, "sn")
