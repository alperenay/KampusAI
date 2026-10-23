# -*- coding: utf-8 -*-
r"""10. Sınıf Din Kültürü ve Ahlak Bilgisi — 1.36.0: Maarif kodları (DKAB.10.1.1–DKAB.10.5.3), her kazanıma ikinci
çözümlü örnek, kısa anlatımların genişletilmesi. Program kapsamı mevcut kazanımlarla birebir karşılanıyor.
Kaynak: tymm.meb.gov.tr Din Kültürü ve Ahlak Bilgisi (Ortaöğretim) 10. Sınıf ünite sayfaları."""

KOD = {}
for _u, _n in ((1, 3), (2, 3), (3, 4), (4, 4), (5, 3)):
    for _k in range(1, _n + 1):
        KOD["u%d/k%d" % (_u, _k)] = "DKAB.10.%d.%d" % (_u, _k)

ANLATIM = {
"u4/k1": r"""
# Hz. Peygamber'in Örnekliği
- **Ağaç dikmek:** \"Kıyamet kopmak üzereyken birinizin elinde bir fidan bulunsa, onu dikebiliyorsa diksin.\" hadisi, doğaya katkının her koşulda değerli olduğunu anlatır.
- **Hayvan hakları:** Susuz bir köpeğe su veren kişinin bağışlandığını bildiren hadis, canlılara merhametin ibadet değeri taşıdığını gösterir.
- **Koruma alanları:** Hz. Peygamber, Medine çevresinde ağaçların kesilmesinin ve hayvanların avlanmasının yasak olduğu **hima** (koruma) alanları belirlemiştir.

Çevre ahlakı yalnızca bir bilgi değil; **israf etmemek, atığı azaltmak, canlılara merhamet etmek** gibi günlük davranışlarla yaşanan bir sorumluluktur.
""",
"u4/k4": r"""
# Ayetin Bağlamı ve Günümüze Bakan Yönü
Ayetteki **fesat**, toplumsal ve ahlaki bozulmanın yanında doğadaki dengenin bozulmasını da kapsayan geniş bir kavramdır. Ayet insanı **suçlamakla yetinmez**, bir **dönüş (tövbe ve ıslah)** imkânı sunar: *\"Belki dönerler.\"* ifadesi, hatadan dönüldüğünde dengenin yeniden kurulabileceğini hatırlatır.

Günümüzde orman yangınları, plastik kirliliği, aşırı avlanma ve iklim değişikliği bu ayetin uyarısını somutlaştıran örneklerdir. Bireysel düzeyde **tüketimi azaltmak**, toplumsal düzeyde **çevre dostu politikaları desteklemek** ayetin çağrısına uygun davranışlardır.
""",
}

ORNEK = {
"u1/k1": [(r"Bir öğrenci \"Dinî bilgiler yalnızca vahye dayanır; akıl ve duyuların dinde yeri yoktur.\" diyor. Bu görüşü İslam'daki bilgi kaynakları açısından değerlendiriniz.",
           r"Görüş eksiktir. İslam'da bilginin kaynakları **duyular, akıl ve vahiy**dir; sağlıklı **sezgi (ilham)** de bireysel bir bilgi yolu kabul edilir. Kur'an insanı sık sık **düşünmeye, akletmeye, gözlem yapmaya** çağırır; vahyin anlaşılması da akılla olur. Bu yüzden akıl, dinî sorumluluğun ön şartıdır.")],
"u1/k2": [(r"İslam düşüncesinde âlemin \"yaratılmış\" (hâdis) olması ile Allah'ın \"ezelî\" (kadîm) olması arasındaki ilişkiyi açıklayınız.",
           r"Allah'ın dışındaki her şey (**âlem**) sonradan var edilmiştir; bir başlangıcı vardır ve varlığını sürdürmek için Allah'a **muhtaçtır**. Allah ise başlangıcı olmayan (**kıdem**), varlığı kendinden olan yaratıcıdır. Bu ilişki, âlemdeki düzenin ve varlığın **Allah'ın yaratması ve koruması** ile devam ettiğini anlatır.")],
"u1/k3": [(r"Mülk suresi 23. ayette insana verilen işitme, görme ve gönüllerin (kalplerin) hatırlatılmasının amacı nedir?",
           r"Bu yetiler **bilgi edinme araçlarıdır**; ayet, insanın bu nimetler için **şükretmesi** ve onları doğru kullanması gerektiğini hatırlatır. Ayetin \"Ne kadar az şükrediyorsunuz!\" uyarısı, nimetleri hakikati aramak yerine boşa harcamanın bir **nankörlük** olduğunu vurgular.")],
"u2/k1": [(r"\"Evrendeki her şey sebep–sonuç ilişkisine göre işler; her sebebin de bir sebebi vardır. Bu zincir sonsuza kadar gidemez.\" Bu akıl yürütme hangi delile örnektir? Delilin sonucu nedir?",
           r"Bu, **hudûs (sonradan olma) / illiyet** deliline örnektir. Sonsuz bir sebepler zinciri olamayacağına göre, kendisi bir sebebe muhtaç olmayan **ilk sebep**, yani her şeyi var eden **Allah** vardır.")],
"u2/k2": [(r"\"Rahmân\" ve \"Rahîm\" isimlerinin anlamını ve bu isimleri tanıyan bir insanın davranışlarına nasıl yansıyabileceğini açıklayınız.",
           r"**Rahmân:** Rahmeti dünyada inanan–inanmayan ayırt etmeksizin **tüm varlıkları** kuşatan; **Rahîm:** Özellikle inananlara ahirette de **merhamet eden**. Bu isimleri tanıyan kişi, insanlara ve diğer canlılara **merhametli** davranmaya, affetmeye ve yardımlaşmaya özen gösterir.")],
"u2/k3": [(r"Haşr suresi 22–24. ayetlerde geçen \"el-Melik\", \"el-Kuddûs\" ve \"es-Selâm\" isimlerinin anlamlarını yazınız.",
           r"**el-Melik:** Mülkün ve her şeyin gerçek sahibi, hükümdarı. **el-Kuddûs:** Her türlü eksiklikten uzak, tertemiz. **es-Selâm:** Esenlik veren, her türlü kusurdan salim. Bu isimler, Allah'ın mutlak **egemenliğini ve yüceliğini** anlatır.")],
"u3/k1": [(r"Tevhit inancının toplumsal hayata yansımalarına iki örnek veriniz.",
           r"1) İnsanlar tek bir yaratıcının kulları olarak **eşit** görülür; ırk, renk ve servet üstünlük sebebi olmaz. 2) İnsan Allah'tan başka hiçbir varlığa (güç, para, şöhret) **kulluk etmez**; bu, onu batıl inanç ve sömürüye karşı **özgür** kılar ve sorumluluk bilinci kazandırır.")],
"u3/k2": [(r"Hz. Ömer'in, bir Kıpti gence haksızlık yapan valinin oğlunu cezalandırması rivayeti İslam'daki hangi ilkeyi yansıtır?",
           r"**Hukuk önünde eşitlik ve adalet** ilkesini. Yöneticinin yakını olmak, ayrıcalık sebebi değildir; Müslüman olsun olmasın her insanın hakkı korunur. Adalet, Kur'an'da kişi kendi aleyhine ya da yakınlarının aleyhine olsa bile gözetilmesi istenen bir ilkedir (Nisa, 135).")],
"u3/k3": [(r"\"Selâm\" kelimesinin İslam ile ilişkisini ve günlük hayattaki karşılığını açıklayınız.",
           r"**İslam** kelimesi \"barış, esenlik ve teslimiyet\" anlamlarına gelen **s-l-m** kökünden türemiştir. Müslümanların birbirine \"**Esselâmü aleyküm**\" (Allah'ın esenliği üzerinize olsun) diyerek selamlaşması, barışın günlük hayatta yaşanmasının bir ifadesidir; cennetin bir adı da **Dârüsselâm**'dır (esenlik yurdu).")],
"u3/k4": [(r"Nisa 58. ayette \"emanetleri ehline verin\" buyrulur. Bu ilke okul hayatında nasıl uygulanabilir?",
           r"Sınıf başkanlığı, kulüp görevleri ve takım kaptanlığı gibi sorumluluklar **liyakate** (yetenek ve dürüstlüğe) göre verilmelidir; arkadaşlık ya da yakınlık belirleyici olmamalıdır. Ayrıca ödünç alınan eşyaları korumak ve zamanında iade etmek de **emanete riayet**tir.")],
"u4/k1": [(r"İsrafın yalnızca para harcamakla sınırlı olmadığını, günlük hayattan üç örnekle gösteriniz.",
           r"1) Abdest alırken ya da diş fırçalarken **suyu boşa akıtmak**. 2) Tabağa yenmeyecek kadar yemek alıp **çöpe atmak**. 3) Kullanılmayan odada **ışığı açık bırakmak**, gereksiz yere elektronik cihaz değiştirmek. Hepsi kaynakların ölçüsüzce tüketilmesidir; A'raf 31'deki israf yasağı kapsamındadır.")],
"u4/k2": [(r"Yapay zekâ ile ödev hazırlayıp kendi emeğiymiş gibi teslim etmek ahlaki açıdan nasıl değerlendirilir?",
           r"Başkasının ya da bir aracın ürettiğini kendi emeği gibi sunmak **dürüstlük** ilkesine aykırıdır ve bir tür **aldatmadır**. Teknoloji öğrenmeyi destekleyen bir araç olarak kullanılabilir; ancak kaynak belirtilmeli, öğretmenin kurallarına uyulmalı ve **sorumluluk** kişide kalmalıdır.")],
"u4/k3": [(r"Elektronik atıkların (eski telefon, pil) gelişigüzel atılması çevreye nasıl zarar verir? Dinî ve ahlaki sorumluluk açısından ne yapılmalıdır?",
           r"İçlerindeki **ağır metaller** (kurşun, cıva, kadmiyum) toprağa ve suya karışarak canlılara zarar verir. İnsan çevreye karşı **emanetçi** olduğu için atıklar **ayrı toplanmalı**, cihazlar mümkün olduğunca **onarılıp uzun kullanılmalı**, gereksiz tüketimden kaçınılmalıdır.")],
"u4/k4": [(r"Rum 41. ayetteki \"Belki dönerler\" ifadesi insana nasıl bir mesaj verir?",
           r"Ayet insana **umut ve sorumluluk** mesajı verir: Yaşanan bozulmalar insanın kendi eylemlerinin sonucudur ve yine insan **hatasından dönerek** (israfı bırakmak, doğayı korumak) düzeni yeniden kurabilir. Ayet, karamsarlığa değil **ıslaha** çağırır.")],
"u5/k1": [(r"Kur'an'daki bazı kelimelerin birden fazla anlama gelmesi yorum farklılıklarına nasıl yol açar? Bir örnek veriniz.",
           r"Arapçada bazı kelimeler **çok anlamlıdır**; âlimler bağlama göre farklı anlamları tercih edebilir. Örneğin Bakara 228. ayetteki **\"kurû\"** kelimesi hem \"temizlik dönemi\" hem \"hayız dönemi\" anlamına gelir; bu yüzden boşanmış kadının bekleme süresinin hesaplanması mezheplerde farklı yorumlanmıştır. **Dilin yapısı**, yorum farklılıklarının sebeplerinden biridir.")],
"u5/k2": [(r"Mâtürîdîlik ve Eş'arîlik arasındaki farklılığın akla yaklaşım bakımından bir örneğini veriniz.",
           r"**Mâtürîdîlere** göre akıl, vahiy gelmeden de Allah'ın varlığını ve iyi–kötünün bir kısmını **bilebilir**; bu yüzden peygamber ulaşmamış kişi de Allah'ı aklıyla bilmekle sorumludur. **Eş'arîlere** göre ise dinî sorumluluk **vahiyle** başlar. İki mezhep de **Ehl-i Sünnet** içindedir; farklılık temel inançta değil, yorumdadır.")],
"u5/k3": [(r"Hucurat suresi 13. ayetine göre insanlar arasında üstünlük ölçüsü nedir? Bu ölçü ırkçılığa nasıl bir cevap verir?",
           r"Ayete göre Allah katında en üstün olan, **takvası** (Allah'a saygısı ve sorumluluk bilinci) en fazla olandır. Soy, renk, millet ve zenginlik üstünlük sebebi değildir; farklılıklar **tanışmak** içindir. Bu ölçü, insanları doğuştan gelen özelliklere göre değerlendiren **ırkçılığı** kesin olarak reddeder.")],
}

OZET = {}
