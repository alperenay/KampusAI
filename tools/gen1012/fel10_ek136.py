# -*- coding: utf-8 -*-
r"""10. Sınıf Felsefe — 1.36.0: Maarif kodları (FEL.10.1.1–FEL.10.9.1; programda her ünitede bir öğrenme çıktısı
vardır, mevcut kazanımlar bu çıktıların alt basamaklarıdır), her kazanıma ikinci çözümlü örnek ve kısa anlatımların
genişletilmesi. Kaynak: tymm.meb.gov.tr Felsefe Dersi 10. Sınıf ünite sayfaları."""

_N = {1: 6, 2: 3, 3: 2, 4: 2, 5: 2, 6: 1, 7: 2, 8: 2, 9: 2}
KOD = {"u%d/k%d" % (u, k): "FEL.10.%d.1" % u for u, n in _N.items() for k in range(1, n + 1)}

ANLATIM = {
"u1/k4": r"""
# Felsefi Soru Nasıl Sorulur?
Gündelik bir sorudan felsefi bir soruya geçmek için **genelleştirme** ve **kavrama yönelme** gerekir:
- *\"Bu karar adil mi?\"* (somut) → *\"Adalet nedir, adil bir kararın ölçütü ne olmalıdır?\"* (felsefi)
- *\"Bu resmi beğendin mi?\"* → *\"Bir şeyi güzel yapan nedir? Güzellik beğeniye mi bağlıdır?\"*

Felsefe tarihindeki büyük soruların çoğu bu türden basit bir merakla başlamıştır. Sokrates, Atina sokaklarında insanlara *\"Cesaret nedir? Erdem öğretilebilir mi?\"* gibi sorular sorarak onları **bildiklerini sandıkları şeyleri** sorgulamaya davet etmiştir.
""",
"u1/k6": r"""
# Günlük Hayatta Felsefe
Sosyal medyada bir haberin doğruluğunu sorgulamak (**bilgi felsefesi**), yapay zekânın karar vermesinin adil olup olmadığını tartışmak (**ahlak ve siyaset felsefesi**), bir sanat eserinin değerini konuşmak (**sanat felsefesi**) felsefenin gündelik yansımalarıdır. Felsefe, \"ne düşünmeliyim?\" sorusundan çok **\"nasıl düşünmeliyim?\"** sorusuna cevap arar.
""",
"u2/k1": r"""
# Dil Düşünceyi Nasıl Etkiler?
- Aynı olay farklı kelimelerle anlatıldığında farklı **çağrışımlar** uyandırır: \"isyancı\" ile \"özgürlük savaşçısı\" ifadeleri aynı kişiye yönelik farklı yargılar taşır.
- **Wittgenstein**: *\"Dilimin sınırları dünyamın sınırlarıdır.\"* — Bir kavram için kelimemiz yoksa onu düşünmekte de zorlanırız.
- Bilimde ve hukukta **terimlerin** açık ve tek anlamlı olması bu yüzden önemlidir.
""",
"u3/k1": r"""
# Varlık Felsefesinin Temel Soruları
1. **Varlık var mıdır?** (Gorgias gibi kuşkucular \"hiçbir şey yoktur\" diyerek bu soruyu tartışmaya açmıştır.)
2. **Varlığın mahiyeti nedir?** Varlık madde midir (materyalizm), düşünce midir (idealizm), yoksa her ikisi mi (düalizm)?
3. **Varlık değişken midir, değişmez mi?** Herakleitos'a göre her şey **akar** (oluş); Parmenides'e göre değişim bir **yanılsamadır**.

Bu sorulara verilen cevaplar, bilgi, ahlak ve din felsefesindeki görüşleri de **doğrudan etkiler**.
""",
"u4/k1": r"""
# Bilgi Türleri
| Tür | Özelliği | Örnek |
|---|---|---|
| **Gündelik bilgi** | Deneyimle kazanılır, sistemsizdir | \"Bulutlar kararınca yağmur yağar.\" |
| **Bilimsel bilgi** | Yöntemli, sınanabilir, nesnel | Yağmurun yoğunlaşma ile açıklanması |
| **Felsefi bilgi** | Akla dayalı, eleştirel, bütüncül | \"Doğa yasalarını bilebilir miyiz?\" |
| **Dinî bilgi** | Vahye ve inanca dayalı | Ahiret inancı |
| **Teknik bilgi** | Pratik fayda sağlar | Köprü yapımı |
| **Sanat bilgisi** | Sezgiye ve duyguya dayalı, özneldir | Bir şiirin anlattığı duygu |
""",
"u5/k1": r"""
# Ahlak Felsefesinin Temel Soruları
- İyi ve kötünün **ölçütü** nedir? (Mutluluk mu, fayda mı, ödev mi, vicdan mı?)
- Ahlak **evrensel** midir, yoksa toplumdan topluma değişir mi?
- İnsan **özgür** müdür? Özgür değilse eylemlerinden sorumlu tutulabilir mi?
- Ahlaki değerler **akılla mı** temellendirilir, yoksa **duygu** ve alışkanlıkla mı?
""",
}

ORNEK = {
"u1/k1": [(r"Felsefe ile \"bir şeyi merak etmek\" arasında nasıl bir ilişki vardır? Platon ve Aristoteles'in görüşleriyle açıklayınız.",
           r"Platon ve Aristoteles felsefenin **hayret ve merakla** başladığını söyler. İnsan, alışılmış olanı sorgulayıp *\"Bu neden böyle?\"* diye sorduğunda felsefi düşünce başlar. Merak, cevabı hazır kabul etmek yerine **akıl yoluyla** temellendirilmiş bilgi arayışına dönüşür.")],
"u1/k2": [(r"İlk Çağ'da felsefi düşüncenin Anadolu kıyılarında (İyonya) doğmasının nedenleri nelerdir?",
           r"İyonya (Milet, Efes) **ticaret yollarının** kavşağındaydı; Mısır ve Mezopotamya'nın bilgi birikimiyle tanışma imkânı vardı. Şehirlerde **görece özgür** bir siyasi ortam, refah ve boş zaman bulunuyordu. Bu koşullar, doğayı mitolojik değil **akılcı** açıklamaya yönelen ilk filozofları (Thales, Anaksimandros, Herakleitos) ortaya çıkardı.")],
"u1/k3": [(r"\"Felsefe eleştireldir ve refleksiftir (düşünce üzerine düşünmedir).\" Bu iki özelliği birer örnekle açıklayınız.",
           r"**Eleştirel:** Hiçbir bilgiyi sorgulamadan kabul etmez; ör. Descartes, duyularla edindiği bilgileri şüpheyle sınar. **Refleksif:** Düşüncenin kendisini konu edinir; ör. *\"Doğru düşündüğümü nereden bilirim?\"* sorusu insanın kendi düşünme sürecini incelemesidir.")],
"u1/k4": [(r"Aşağıdakilerden hangileri felsefi sorudur? Gerekçelendiriniz: a) Ay'ın Dünya'ya uzaklığı nedir? b) İnsan özgür müdür? c) Mutluluk nedir? ç) Türkiye'nin başkenti neresidir?",
           r"**b** ve **c** felsefi sorulardır: Evrenseldir, kesin ve tek bir cevabı yoktur, deney ve gözlemle cevaplanamaz, kavramsaldır. **a** bilimsel ölçümle, **ç** bir kaynağa bakarak kesin biçimde cevaplanabildiği için felsefi değildir.")],
"u1/k5": [(r"Bilim \"Evren nasıl oluştu?\" sorusuyla ilgilenirken felsefe hangi soruları sorar? Aralarındaki farkı açıklayınız.",
           r"Felsefe *\"Evrenin bir başlangıcı olabilir mi? Hiçlikten bir şey çıkabilir mi? Evreni bilmemiz mümkün mü?\"* gibi soruları sorar. **Bilim**, olguları deney ve gözlemle açıklar ve sonuçları sınanabilir; **felsefe** ise kavramları ve bilimin varsayımlarını akıl yoluyla sorgular. İkisi birbirini besler.")],
"u1/k6": [(r"Bir öğrenci felsefenin \"işe yaramadığını\" söylüyor. Bu iddiaya felsefenin bireysel ve toplumsal işlevleriyle nasıl cevap verirsiniz?",
           r"Felsefe **somut bir ürün** vermese de bireye eleştirel düşünme, doğru akıl yürütme ve farklı görüşleri anlama becerisi kazandırır. Toplumsal düzeyde **insan hakları, demokrasi ve hukuk devleti** gibi kavramlar felsefi tartışmalardan doğmuştur. Bilimlerin ve yapay zekâ etiği gibi güncel alanların temel kavramları da felsefe ile şekillenir.")],
"u2/k1": [(r"\"Banka\" kelimesinin hem \"oturak\" hem \"para kurumu\" anlamına gelmesi bir akıl yürütmede nasıl hataya yol açabilir?",
           r"Aynı kelimenin bir argümanın farklı yerlerinde **farklı anlamlarda** kullanılması **dört terim (eş seslilik)** hatasına yol açar. Ör. *\"Banka oturulacak yerdir. Ziraat bir bankadır. O hâlde Ziraat oturulacak yerdir.\"* Sonucun yanlışlığı, terimin anlamının değişmesinden kaynaklanır; bu yüzden mantıkta terimler **açık ve tek anlamlı** kullanılmalıdır.")],
"u2/k2": [(r"\"Gözlemlediğim tüm metaller ısıtılınca genleşti. O hâlde bütün metaller ısıtılınca genleşir.\" Bu akıl yürütme türü nedir? Sonucu kesin midir?",
           r"Bu bir **tümevarım**dır: Tek tek örneklerden **genel bir sonuca** ulaşılır. Sonuç **olası (muhtemel)**dir, kesin değildir; çünkü gözlemlenmemiş bir durumda aksi ortaya çıkabilir. Tümdengelimde ise öncüller doğruysa ve akıl yürütme geçerliyse sonuç **zorunlu olarak** doğrudur.")],
"u2/k3": [(r"\"Ya bu telefonu alırsın ya da hiç arkadaşın olmaz.\" ifadesinde hangi safsata vardır? Neden?",
           r"**Yanlış ikilem (siyah–beyaz) safsatası**: Pek çok seçenek varken yalnızca iki seçenek sunulmuştur. Arkadaşlık ilişkisinin telefona bağlı olmadığı ve başka seçenekler bulunduğu göz ardı edilmiştir.")],
"u3/k1": [(r"Herakleitos'un \"Aynı ırmakta iki kez yıkanılmaz.\" sözü varlık felsefesinin hangi kavramıyla ilgilidir? Parmenides bu söze nasıl karşı çıkar?",
           r"Söz **oluş (değişim)** kavramıyla ilgilidir: Herakleitos'a göre varlık sürekli değişir. **Parmenides** ise değişimin duyuların bir yanılsaması olduğunu, gerçek varlığın **değişmez, bir ve bölünmez** olduğunu savunur; ona göre \"var olan vardır, olmayan yoktur\".")],
"u3/k2": [(r"Materyalizm ve idealizm \"Varlığın özü nedir?\" sorusuna hangi cevapları verir? Birer filozof örneği veriniz.",
           r"**Materyalizm:** Varlığın özü **maddedir**; zihin de maddenin bir ürünüdür (Demokritos — atomlar). **İdealizm:** Varlığın özü **düşünce, idea**dır; maddi dünya ideaların gölgesidir (Platon) ya da algılanmaktır (Berkeley: \"Var olmak algılanmaktır\").")],
"u4/k1": [(r"\"Su 100 °C'de kaynar.\" ve \"Bir şey aynı anda hem var hem yok olamaz.\" önermelerini önsel–sonsal bakımından karşılaştırınız.",
           r"İlki **sonsal (a posteriori)**dır: Deney ve gözlemle bilinir, üstelik basınca göre değişir. İkincisi **önsel (a priori)**dir: **Çelişmezlik ilkesine** dayanır, deneyime başvurmadan akılla bilinir ve zorunlu olarak doğrudur.")],
"u4/k2": [(r"Kant'ın bilgi görüşünü \"Kavramsız algılar kör, algısız kavramlar boştur.\" sözüyle açıklayınız.",
           r"Kant **kritisizm** ile rasyonalizm ve empirizmi uzlaştırır: Bilgi **deneyimle başlar** ama yalnızca deneyimden doğmaz. Duyular malzemeyi (algıları), akıl ise bu malzemeyi düzenleyen **kategorileri** (nedensellik, birlik…) sağlar. Biri olmadan diğeri bilgi üretemez.")],
"u5/k1": [(r"Özgürlük ve sorumluluk kavramları arasındaki ilişkiyi bir örnekle açıklayınız.",
           r"Bir kişi ancak **özgürce seçtiği** eylemlerden sorumlu tutulabilir. Örneğin zorla bir şeyi imzalatılan kişi bunun sonuçlarından sorumlu tutulamaz; ama kendi isteğiyle yalan söyleyen kişi sonuçlarından **sorumludur**. Özgürlük olmadan ahlaki sorumluluk da olmaz.")],
"u5/k2": [(r"\"İyi eylem, en çok insana en fazla mutluluğu sağlayandır.\" ilkesi hangi ahlak görüşüne aittir? Bu görüşe yöneltilen bir eleştiri yazınız.",
           r"**Yararcılık (faydacılık)** — J. Bentham ve J. S. Mill. **Eleştiri:** Çoğunluğun mutluluğu için azınlığın **haklarının çiğnenmesine** izin verebilir; ayrıca mutluluğu ölçmek ve kişiler arasında karşılaştırmak zordur. Kant'a göre insan hiçbir zaman yalnızca **araç** olarak görülmemelidir.")],
"u6/k1": [(r"\"Güzellik bakanın gözündedir.\" sözü güzelliğin öznel mi nesnel mi olduğu tartışmasında hangi tarafı savunur? Karşı görüşü bir filozofla açıklayınız.",
           r"Söz güzelliğin **öznel** olduğunu, kişinin beğenisine bağlı olduğunu savunur (Hume'a yakın). Karşı görüşte **Platon**, güzelliğin nesnelerin dışında **mutlak bir idea** olduğunu; nesnelerin bu ideadan pay aldıkları ölçüde güzel olduğunu söyler. **Kant** ise güzellik yargısının öznel olduğu hâlde **herkesten onay bekleyen** (genel geçer) bir yargı olduğunu ileri sürer.")],
"u7/k1": [(r"Toplum sözleşmesi kuramına göre devlet nasıl ortaya çıkmıştır? Rousseau'nun bu kurama katkısı nedir?",
           r"İnsanlar **doğa durumundan** çıkmak, güvenlik ve haklarını korumak için **bir sözleşmeyle** bazı yetkilerini devlete devretmiştir. **Rousseau**'ya göre egemenlik halka aittir; yasalar **genel irade**nin (ortak iyiyi isteyen halk iradesinin) ifadesi olmalıdır. Bu düşünce **demokrasi** ve halk egemenliği anlayışını etkilemiştir.")],
"u7/k2": [(r"Bir yönetimin meşru olması için hangi koşullar gerekir? Max Weber'in meşruiyet türlerini yazınız.",
           r"Meşru yönetim, halkın **rızasına** dayanır, **hukuka** bağlıdır ve temel hak ve özgürlükleri korur. **Weber**: 1) **Geleneksel** meşruiyet (soy, gelenek — monarşiler), 2) **Karizmatik** meşruiyet (liderin olağanüstü kişiliği), 3) **Yasal–ussal** meşruiyet (anayasa ve yasalar — modern devlet).")],
"u8/k1": [(r"Panteizm ile teizmi Tanrı–evren ilişkisi bakımından karşılaştırınız.",
           r"**Teizm:** Tanrı evreni yaratmıştır, evrenden **ayrı ve aşkındır**, evreni yönetmeye ve vahiy göndermeye devam eder. **Panteizm:** Tanrı ile evren **özdeştir**; her şey Tanrı'dır, Tanrı evrenin dışında değildir (Spinoza: \"Tanrı ya da doğa\").")],
"u8/k2": [(r"Kötülük problemi nedir? Bu probleme teistlerin verdiği bir cevabı yazınız.",
           r"**Kötülük problemi:** Tanrı her şeye gücü yeten, her şeyi bilen ve iyi ise dünyada **kötülük neden vardır?** sorusudur. **Teist cevap (özgür irade savunması):** Tanrı insana özgür irade vermiştir; ahlaki kötülükler insanın **iradesini yanlış kullanmasından** doğar. İyiliğin anlamlı olması için insanın kötüyü de seçebilmesi gerekir.")],
"u9/k1": [(r"Bilimi \"ürün\" ve \"etkinlik\" olarak görmek arasındaki farkı açıklayınız. Hangi yaklaşım hangi filozoflarla ilişkilidir?",
           r"**Ürün olarak bilim:** Bilimi, ortaya konmuş **önermeler ve kuramlar bütünü** olarak görür; mantıksal yapısına odaklanır (Viyana Çevresi, mantıkçı pozitivistler). **Etkinlik olarak bilim:** Bilimi, bilim insanlarının **tarihsel ve toplumsal** bağlamda yürüttüğü bir faaliyet olarak görür (Thomas Kuhn — paradigma).")],
"u9/k2": [(r"Thomas Kuhn'un \"paradigma değişimi\" kavramını bir örnekle açıklayınız.",
           r"**Paradigma**, bir dönemde bilim topluluğunun kabul ettiği temel kuram ve yöntemlerdir. Açıklanamayan sorunlar (anomaliler) biriktiğinde **bilimsel devrim** olur ve yeni paradigma eskisinin yerini alır. Örnek: Dünya merkezli (Ptolemaios) evren modelinden **Güneş merkezli** (Kopernik) modele geçiş.")],
}

OZET = {}
