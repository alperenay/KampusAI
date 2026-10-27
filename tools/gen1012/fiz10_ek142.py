# -*- coding: utf-8 -*-
r"""10. Sınıf Fizik — 1.43 eki: Optik temelleri (TYT kapsamı).
Metinler özgün olarak yazılmıştır; resmî ders kitabı ya da program metni kopyalanmamıştır."""
from _c import O, U

YENI = [U("u5", "5. Ünite (Ek): Optik", "Unit 5 (Extra): Optics", [

O("k1", "FİZ.10.E1", "Işık, aydınlanma, gölge ve tam gölge", "Light, illuminance, shadow and umbra", r"""
# Işığın Özellikleri
Işık bir enerji türüdür; boşlukta yaklaşık $3\times10^8$ m/s hızla, saydam ve homojen ortamda **doğrusal** yayılır. Kendiliğinden ışık yayan cisimler (Güneş, ampul) **ışık kaynağı**, ışığı yansıtarak görünenler (Ay, masa) **aydınlatılmış cisimdir**. Maddeler ışığı geçirme durumuna göre **saydam**, **yarı saydam** ve **opak** olarak ayrılır.

# Aydınlanma
- **Işık şiddeti** $I$ (kandela, cd): kaynağın gücünün ölçüsü.
- **Aydınlanma şiddeti** $E$ (lüks, lx): yüzeyin birim alanına düşen ışık akısı.
$$E = \frac{I\cdot\cos\alpha}{d^2}$$
($d$: kaynağa uzaklık, $\alpha$: ışınların yüzey normaliyle yaptığı açı). Uzaklık 2 katına çıkınca aydınlanma **4'te birine** iner; ışık yüzeye eğik gelince azalır.

# Gölge
Opak bir cismin arkasında ışık almayan bölge **tam gölge**, kaynağın yalnızca bir kısmından ışık alan bölge **yarı gölgedir**.
- **Noktasal kaynakta** yalnızca tam gölge oluşur; **geniş (yüzeysel) kaynakta** tam gölge ve yarı gölge birlikte oluşur.
- Kaynak, cisim ve perde arasındaki uzaklıklarla gölge boyu benzer üçgenlerle bulunur: $\dfrac{\text{gölge}}{\text{cisim}} = \dfrac{\text{kaynak–perde}}{\text{kaynak–cisim}}$.
- Güneş ve Ay tutulmaları tam gölge ve yarı gölge bölgeleriyle açıklanır.
""",
 [(r"Bir lambanın 1 m uzağındaki masada aydınlanma 400 lx'tir. Masa 2 m uzağa çekilirse (ışık dik gelmeye devam ediyor) aydınlanma kaç lüks olur?",
   r"$E \propto \frac{1}{d^2}$ → $400 \cdot \frac14 = $ **100 lx**."),
  (r"Noktasal kaynaktan 1 m uzaktaki 10 cm çaplı opak bir diskin, kaynaktan 3 m uzaktaki perdede oluşturduğu tam gölgenin çapı nedir?",
   r"$\dfrac{x}{10} = \dfrac{3}{1}$ → **30 cm**.")],
 [r"Işık homojen ortamda doğrusal yayılır.", r"$E = I\cos\alpha / d^2$; uzaklık 2 katı → aydınlanma 1/4.",
  r"Noktasal kaynak yalnız tam gölge, geniş kaynak tam ve yarı gölge oluşturur.", r"Gölge boyu benzer üçgenlerle bulunur."]),

O("k2", "FİZ.10.E2", "Yansıma kanunları ve düz ayna", "Laws of reflection and plane mirrors", r"""
# Yansıma Kanunları
1. Gelen ışın, yansıyan ışın ve yüzeyin **normali** aynı düzlemdedir.
2. **Gelme açısı = yansıma açısı** (açılar normalle ölçülür).
- Pürüzsüz yüzeyde **düzgün yansıma** (net görüntü), pürüzlü yüzeyde **dağınık yansıma** (her yönden görülme) olur.

# Düz Aynada Görüntü
- Görüntü **sanal**, **düz** (baş aşağı değil) ve cisimle **aynı boydadır**.
- Görüntü aynaya, cisimle **aynı uzaklıktadır**; sağ–sol yer değiştirmiş görünür (simetri).
- Bir kişinin kendini tam boy görebilmesi için ayna boyu en az **boyunun yarısı** olmalıdır.

# Ayna Döndürme ve Açılı Aynalar
- Ayna $\alpha$ açısı kadar döndürülürse yansıyan ışın **$2\alpha$** kadar döner.
- Aralarında $\theta$ açısı olan iki düz aynada oluşan görüntü sayısı: $n = \dfrac{360°}{\theta} - 1$ (360/θ tam sayıysa).
- Birbirine paralel iki aynada sonsuz sayıda görüntü oluşur.
""",
 [(r"Düz aynaya 30° gelme açısıyla gelen ışın için yansıma açısı ve ışının aynayla yaptığı açı kaçtır?",
   r"Yansıma açısı **30°**; ışın ile ayna yüzeyi arasındaki açı $90° - 30° = $ **60°**."),
  (r"Aralarında 60° bulunan iki düz ayna arasındaki bir cismin kaç görüntüsü oluşur?", r"$\frac{360}{60} - 1 = $ **5**.")],
 [r"Gelme açısı = yansıma açısı (normale göre).", r"Düz ayna: sanal, düz, aynı boy, aynı uzaklık; sağ–sol ters.",
  r"Ayna α dönerse yansıyan ışın 2α döner.", r"Açılı aynalarda görüntü sayısı 360/θ − 1."]),

O("k3", "FİZ.10.E3", "Renkler, ışığın renklere ayrılması ve renk karışımı", "Colour, dispersion and colour mixing", r"""
# Beyaz Işık ve Tayf
Beyaz ışık bir prizmadan geçince renklerine ayrılır (**dispersiyon**): kırmızı, turuncu, sarı, yeşil, mavi, mor. Kırmızı en az, mor en çok kırılır. **Gökkuşağı** güneş ışığının yağmur damlalarında kırılıp yansımasıyla oluşur.

# Cisimlerin Rengi
Opak bir cisim, **yansıttığı** ışığın renginde görünür; diğer renkleri soğurur.
- Beyaz cisim tüm renkleri yansıtır; siyah cisim tümünü soğurur (bu yüzden güneşte daha çok ısınır).
- Kırmızı bir elma **mavi ışık** altında **siyah** görünür (yansıtacağı kırmızı ışık yoktur).
- Saydam cisimler (filtreler) yalnızca **kendi renklerindeki** ışığı geçirir.

# Işık Renklerinin Toplanması (Ekran Renkleri)
Ana renkler: **kırmızı (K), yeşil (Y), mavi (M)**.
- K + Y = **sarı**, K + M = **magenta (eflatun)**, Y + M = **cyan (camgöbeği)**, K + Y + M = **beyaz**.
- Ana renk ile kendisini içermeyen ara renk birleşince beyaz olur (tamamlayıcı renkler): sarı + mavi = beyaz.

# Boya (Pigment) Renklerinin Karışımı
Boyalar ışığı **soğurarak** renk verir; karışımda renkler çıkarılır (sarı + camgöbeği boya → yeşil, tümü → koyu/siyaha yakın). Yazıcılar camgöbeği, magenta, sarı ve siyah (CMYK) kullanır.
""",
 [(r"Beyaz bir gömlek ile kırmızı bir şapka yalnızca yeşil ışıkla aydınlatılan bir odada hangi renklerde görünür?",
   r"Gömlek tüm renkleri yansıttığı için **yeşil**; şapka yeşili soğurup yalnızca kırmızıyı yansıtabileceği için **siyah** görünür."),
  (r"Kırmızı ve yeşil ışık aynı noktaya düşürülürse hangi renk görülür?", r"**Sarı**.")],
 [r"Beyaz ışık prizmada renklere ayrılır; mor en çok kırılır.", r"Opak cisim yansıttığı ışığın renginde görünür.",
  r"Işık toplamada K + Y + M = beyaz; boya karışımında renkler çıkarılır.", r"Tamamlayıcı renkler toplanınca beyaz olur."]),

O("k4", "FİZ.10.E4", "Mıknatıslar, manyetik alan ve akımın manyetik etkisi", "Magnets, magnetic fields and the magnetic effect of current", r"""
# Mıknatıslar
- Her mıknatısın **N (kuzey)** ve **S (güney)** olmak üzere iki kutbu vardır; kutuplar ayrılamaz: mıknatıs kırılırsa her parça yine iki kutuplu olur.
- **Aynı kutuplar iter, zıt kutuplar çeker.** Mıknatıslar demir, nikel ve kobalt gibi **ferromanyetik** maddeleri çeker.
- Mıknatıs ısıtılır ya da sert darbelere maruz kalırsa mıknatıslık özelliği azalabilir.

# Manyetik Alan
Mıknatısın etki gösterdiği bölgedir. **Manyetik alan çizgileri** dışarıda **N'den S'ye** yönelir, birbirini kesmez; çizgilerin sık olduğu yerde alan güçlüdür (kutuplar).
- **Pusula** iğnesi küçük bir mıknatıstır ve bulunduğu yerdeki manyetik alan doğrultusunda durur.
- **Dünya** büyük bir mıknatıs gibi davranır: coğrafi kuzey kutbunun yakınında manyetik **güney (S)** kutbu bulunur; bu yüzden pusulanın N ucu kuzeyi gösterir. Coğrafi kuzey ile manyetik kuzey arasındaki açıya **sapma açısı** denir.

# Akımın Manyetik Etkisi
- Üzerinden **akım geçen tel** çevresinde manyetik alan oluşur (Oersted deneyi: tel yanındaki pusula sapar).
- Alanın yönü **sağ el kuralıyla** bulunur: başparmak akım yönünü gösterirse kıvrılan parmaklar alan çizgilerinin dönme yönünü gösterir.
- **Bobin (akım makarası)** içinde düzgün bir alan oluşur ve bobin bir çubuk mıknatıs gibi davranır. Sarım sayısı ve akım arttıkça, içine **demir çekirdek** konulunca alan güçlenir → **elektromıknatıs** (hurda vinçleri, elektrik zili, röle, hoparlör, MR cihazları).
""",
  [(r"Bir çubuk mıknatıs ortadan ikiye kırılırsa ne olur?", r"Her parça yeniden **N ve S kutuplu** iki ayrı mıknatıs olur; tek kutuplu mıknatıs elde edilemez."),
   (r"Bir elektromıknatısın çekim gücünü artırmak için neler yapılabilir?", r"**Akımı artırmak**, **sarım sayısını artırmak** ve bobinin içine **demir çekirdek** yerleştirmek.")],
  [r"Aynı kutuplar iter, zıt kutuplar çeker; mıknatısın kutupları ayrılamaz.", r"Alan çizgileri dışarıda N'den S'ye yönelir, birbirini kesmez.",
   r"Pusulanın N ucu kuzeyi gösterir; Dünya'nın coğrafi kuzeyine yakın yerde manyetik S kutbu vardır.", r"Akım geçen tel ve bobin manyetik alan oluşturur; demir çekirdekle elektromıknatıs elde edilir."]),
])]
