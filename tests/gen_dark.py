import sys
from PIL import Image, ImageFilter
SRC="/root/.claude/uploads/6404c6cd-770e-5990-9580-59780d6fba0b/4faf4045-image.jpg"
OUT="/home/claude/ders-asistani/assets/"
lo, hi = float(sys.argv[1]), float(sys.argv[2])
def tone(im):
    L,a,b=im.convert("LAB").split()
    # yumuşak S eğrisi: kıvrımların kontrastı korunur, en parlak noktalar "hi" ile sınırlanır
    def f(v):
        x=v/255
        s=x*x*(3-2*x)            # smoothstep
        y=0.45*x+0.55*s
        return int((lo+(hi-lo)*y)*2.55)
    return Image.merge("LAB",(L.point(f),a,b)).convert("RGB")
base=Image.open(SRC).convert("RGB")
base=base.crop((0, 8, base.width, base.height))   # en üstteki ekran görüntüsü kalıntısını kırp
for name, img in [("bg-dark-portrait.jpg", base), ("bg-dark-landscape.jpg", base.rotate(90, expand=True))]:
    big=img.resize((img.width*2, img.height*2), Image.LANCZOS)
    big=big.filter(ImageFilter.UnsharpMask(radius=2, percent=40, threshold=2))
    tone(big).save(OUT+name, quality=86, optimize=True, progressive=True)
print("ok", lo, hi)
