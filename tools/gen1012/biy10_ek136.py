# -*- coding: utf-8 -*-
r"""10. Sınıf Biyoloji — 1.36.0: Maarif kodları (BİY.10.1.1–BİY.10.2.9), eksik örnekler ve kısa anlatımların
genişletilmesi. Program kapsamı mevcut kazanımlarla eksiksiz karşılanıyor. Kaynak: tymm.meb.gov.tr Biyoloji 10. Sınıf."""

KOD = {
    "u1/k1": "BİY.10.1.1", "u1/k2": "BİY.10.1.2", "u1/k3": "BİY.10.1.2", "u1/k4": "BİY.10.1.3",
    "u1/k5": "BİY.10.1.4", "u1/k6": "BİY.10.1.5", "u1/k7": "BİY.10.1.6", "u1/k8": "BİY.10.1.7",
    "u1/k9": "BİY.10.1.8–10", "u1/k10": "BİY.10.1.9",
    "u2/k1": "BİY.10.2.1", "u2/k2": "BİY.10.2.2", "u2/k3": "BİY.10.2.3", "u2/k4": "BİY.10.2.4",
    "u2/k5": "BİY.10.2.5–6", "u2/k6": "BİY.10.2.7", "u2/k7": "BİY.10.2.8", "u2/k8": "BİY.10.2.9",
}

ANLATIM = {
"u2/k6": r"""
# Ayak İzi Nasıl Hesaplanır?
Ayak izi **küresel hektar (kha)** ile ölçülür: Bir kişinin tükettiği gıdayı, enerjiyi, ürünleri üretmek ve atıklarını (özellikle $CO_2$) yok etmek için gereken **biyolojik olarak verimli alan**.
- **Karbon ayak izi:** Ayak izinin en büyük bileşeni; fosil yakıt kullanımından doğan $CO_2$'yi emecek orman alanı.
- **Su ayak izi:** Bir ürünün üretiminde kullanılan toplam su (1 kg sığır eti ≈ 15 000 L, 1 kg buğday ≈ 1 800 L).
- **Dünya Limit Aşım Günü:** İnsanlığın o yıl için Dünya'nın yenileyebileceği kaynakları tükettiği gün; her yıl daha erkene gelmesi kaynakların aşırı kullanıldığını gösterir.
""",
"u2/k7": r"""
# Biyoçeşitlilik Neden Önemli?
**Biyoçeşitlilik**; genetik çeşitlilik, tür çeşitliliği ve ekosistem çeşitliliğinin toplamıdır. Çeşitliliği yüksek ekosistemler hastalık, kuraklık gibi değişimlere karşı daha **dirençlidir**. Besin, ilaç hammaddesi, tozlaşma, temiz su ve iklim düzenleme gibi **ekosistem hizmetleri** biyoçeşitliliğe bağlıdır.

Türkiye; üç **biyocoğrafik bölgenin** (Avrupa–Sibirya, Akdeniz, İran–Turan) kesişiminde olduğu için çok zengindir ve yaklaşık **3 500'den fazla endemik bitki** türüne ev sahipliği yapar. Başlıca tehditler: **habitat kaybı**, kirlilik, istilacı türler, aşırı avlanma ve iklim değişikliğidir.
""",
"u2/k8": r"""
# Sıfır Atık ve Döngüsel Ekonomi
Doğrusal ekonomi **al–üret–kullan–at** mantığıyla çalışır. **Döngüsel ekonomide** ise ürünler onarılabilir, yeniden kullanılabilir ve sonunda hammadde olarak sisteme geri döner; atık **kaynak** olarak görülür.
- Cam ve metaller **sonsuz kez** geri dönüştürülebilir; kâğıt lifleri birkaç döngüde kısalır.
- Bir alüminyum kutuyu geri dönüştürmek, yeni kutu üretmeye göre yaklaşık **%95** enerji tasarrufu sağlar.
- Düzenli depolama alanlarında organik atıklar **metan** (güçlü sera gazı) üretir; kompost bu salımı azaltır.
""",
}

ORNEK = {
"u1/k1": [(r"Bir koşucunun kas hücrelerinde ATP miktarı yalnızca birkaç saniyelik kasılmaya yetecek kadardır. Buna rağmen koşucu dakikalarca koşabilmektedir. Bunu nasıl açıklarsınız?",
           r"ATP **depolanmaz**, sürekli **yeniden üretilir**: ATP → ADP + P + enerji tepkimesiyle harcanan ATP, hücresel solunumda ADP + P'den yeniden sentezlenir. Kısa süreli yüksek talepte **kreatin fosfat** hızlıca ADP'ye fosfat verir, ardından glikojen ve yağların solunumu ATP üretimini sürdürür.")],
"u1/k3": [(r"Bir seradaki domates bitkilerinde ışık şiddeti ve sıcaklık uygun olduğu hâlde fotosentez hızı düşüktür. Seraya ne eklenmesi hızı artırabilir? Hangi kurala dayanır?",
           r"Sınırlayıcı faktör büyük olasılıkla **$CO_2$ derişimidir**; seralara $CO_2$ verilerek fotosentez hızı artırılır. **Minimum kuralı**: Fotosentez hızı, en az bulunan (sınırlayıcı) faktör tarafından belirlenir; diğer faktörleri artırmak bu durumda hızı değiştirmez.")],
"u1/k4": [(r"Bir deneyde bitkiye $H_2^{18}O$ (ağır oksijen içeren su) verildiğinde açığa çıkan $O_2$'de $^{18}O$ bulunuyor; $C^{18}O_2$ verildiğinde bulunmuyor. Bu sonuç neyi kanıtlar?",
           r"Fotosentezde açığa çıkan oksijenin **sudan** geldiğini kanıtlar (suyun fotolizi). $CO_2$'deki oksijen ise **glikoz ve suya** katılır. Bu deney (Ruben–Kamen) işaretli atom yönteminin klasik örneğidir.")],
"u1/k5": [(r"Fotosentez ve kemosentezi enerji kaynağı, gerçekleştiren canlılar ve ortak ürün bakımından karşılaştırınız.",
           r"| | Fotosentez | Kemosentez |\n|---|---|---|\n| Enerji kaynağı | Işık | İnorganik maddelerin yükseltgenmesi ($NH_3$, $H_2S$, $Fe^{2+}$) |\n| Canlılar | Bitki, alg, siyanobakteri | Bazı bakteri ve arkeler (nitrifikasyon bakterileri) |\n| Ortak ürün | **Organik madde (glikoz)** | **Organik madde (glikoz)** |\nİkisi de **ototrofik** beslenmedir; kemosentez ışığın olmadığı ortamlarda üretici görevi görür.".replace("\\n", "\n"))],
"u1/k6": [(r"Hücre içi ve hücre dışı sindirimi tanımlayıp hangi canlılarda görüldüğüne birer örnek veriniz. Sindirim yapılarının karmaşıklaşması neyi sağlar?",
           r"**Hücre içi sindirim:** Besin hücre içine alınıp lizozom enzimleriyle sindirilir (amip, terliksi hayvan, insanda akyuvarlar). **Hücre dışı sindirim:** Enzimler hücre dışına salgılanır (mantarlar, insanın sindirim kanalı). Karmaşık sindirim sistemleri **daha büyük besinlerin** işlenmesini, bölümler arası **iş bölümünü** ve daha **verimli emilimi** sağlar.")],
"u1/k7": [(r"İnce bağırsakta emilim yüzeyini artıran yapılar nelerdir? Yağların emilimi diğer besinlerden nasıl farklıdır?",
           r"**Kıvrımlar → villuslar → mikrovilluslar** emilim yüzeyini yüzlerce kat artırır. Glikoz ve amino asitler villuslardaki **kılcal kan damarlarına** geçer ve **kapı toplardamarıyla karaciğere** gider. Yağ asitleri ve gliserol ise epitel hücrelerinde yeniden yağa dönüşür ve **lenf kılcallarına (akkan damarlara)** geçer; karaciğere uğramadan kana katılır.")],
"u1/k9": [(r"Uzun süre aç kalan bir insanda vücut, enerji için sırasıyla hangi molekülleri kullanır? Proteinlerin solunumda kullanılması neden istenmez?",
           r"Önce kan şekeri ve **karaciğer–kas glikojeni**, ardından **yağlar** (yağ asitleri asetil-KoA'ya, gliserol glikolize katılır), en son **proteinler** kullanılır. Proteinler **yapı ve enzim** molekülleridir; amino asitlerin solunumu sırasında **amonyak** gibi zararlı azotlu atıklar oluşur ve doku kaybı yaşanır.")],
"u1/k10": [(r"Laktik asit ve etil alkol fermantasyonunu son ürün, $CO_2$ çıkışı ve örnek bakımından karşılaştırınız. Her ikisinde de net kaç ATP üretilir?",
            r"**Laktik asit fermantasyonu:** Son ürün laktik asit, $CO_2$ **çıkmaz**; yoğurt, peynir yapımı, oksijensiz kalan kas hücresi. **Etil alkol fermantasyonu:** Son ürün etil alkol ve $CO_2$; ekmek mayası, sirke ve bazı içeceklerin üretimi. Her ikisinde de ATP yalnız **glikolizde** üretilir: net **2 ATP**.")],
"u2/k1": [(r"Bir ormandaki sıcaklık, ışık, nem ve toprak pH'ı gibi cansız faktörlerin bitki türlerinin dağılımını nasıl etkilediğine bir örnek veriniz.",
           r"Örneğin ormanın gölgeli alt katında **ışık** az olduğu için eğrelti ve yosun gibi gölgeye dayanıklı türler yaygındır; açık alanlarda ise ışık seven otsular baskındır. Asidik topraklarda (düşük **pH**) çam ve orman gülü iyi gelişirken bazik topraklarda farklı türler görülür. Cansız faktörler, bir türün yaşayabileceği **tolerans aralığını** belirler.")],
"u2/k4": [(r"Karbon döngüsünde atmosfere $CO_2$ veren ve atmosferden $CO_2$ alan süreçleri yazınız. Fosil yakıt kullanımı döngüyü nasıl bozar?",
           r"**$CO_2$ verenler:** Hücresel solunum, ayrıştırıcıların faaliyeti, yanma (fosil yakıt, orman yangını), volkanizma. **$CO_2$ alanlar:** Fotosentez, okyanuslarda çözünme ve kabuklu canlıların $CaCO_3$ oluşturması. Milyonlarca yılda biriken fosil karbonun kısa sürede yakılması atmosfere **verilen $CO_2$'yi alınandan fazla** yapar → sera etkisi ve **küresel ısınma**.")],
"u2/k5": [(r"Bir bölgedeki sulak alan kurutularak tarım arazisine dönüştürülüyor. Bu durumun ekolojik sürdürülebilirliğe etkilerini yazınız.",
           r"Göçmen kuşlar ve sulak alan canlıları **habitatını** kaybeder → **biyoçeşitlilik azalır**. Sulak alanın su depolama ve yeraltı suyunu besleme işlevi kaybolur; bölgede **kuraklık** ve tuzlanma artar. Kısa vadede tarım alanı kazanılsa da uzun vadede su kaynakları ve verim azalır; bu, **sürdürülemez** bir arazi kullanımıdır.")],
"u2/k6": [(r"Bir öğrencinin haftalık alışkanlıkları: 4 kez kırmızı et, her gün 20 dk duş, her gün araba ile okul. Ayak izini en çok küçültecek üç değişikliği gerekçesiyle öneriniz.",
           r"1) **Ulaşım:** Toplu taşıma/bisiklet → karbon ayak izi en çok buradan düşer. 2) **Beslenme:** Kırmızı eti haftada 1'e indirmek → hem karbon hem su ayak izi (1 kg sığır eti ≈ 15 000 L su) azalır. 3) **Su ve enerji:** Duşu 5–7 dakikaya indirmek → sıcak su için harcanan enerji ve su tasarrufu.")],
"u2/k7": [(r"Bir göle istilacı bir balık türü bırakıldığında yerli türler ve biyoçeşitlilik nasıl etkilenir?",
           r"İstilacı türün doğal **avcısı ve rakibi** yoktur; hızla çoğalır, yerli türlerle besin ve alan için **rekabet** eder ya da onları avlar. Yerli türlerin popülasyonu azalır, bazıları yok olabilir; besin ağı bozulur ve **biyoçeşitlilik azalır**. Bu yüzden canlıların bilinçsizce başka ekosistemlere taşınması yasaktır.")],
"u2/k8": [(r"Bir okul kantinindeki atıkların %40'ı organik, %30'u plastik ambalaj, %20'si kâğıt, %10'u diğer. Atık yönetimi hiyerarşisine göre bir eylem planı öneriniz.",
           r"**Önleme/azaltma:** Tek kullanımlık ambalaj yerine yeniden kullanılabilir bardak ve kaplar (plastik payı düşer). **Yeniden kullanma:** Kâğıtların arka yüzünü not için kullanmak. **Geri dönüşüm:** Plastik ve kâğıt için ayrı kutular. **Kompost:** Organik atıklar okul bahçesinde kompost yapılır. Son çare olarak kalan %10 düzenli depolamaya gönderilir.")],
}

OZET = {}
