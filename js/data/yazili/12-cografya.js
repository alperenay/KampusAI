/* 12. Sınıf Coğrafya — açık uçlu yazılı sınavları (örnek; 2018 programı, Maarif sınav biçimi). */
(function () {
  const r = String.raw; App.data.yazili = App.data.yazili || {};
  App.data.yazili["12/cografya"] = { exams: [
    { id: "d1", term: 1, title: "1. Dönem Yazılı", sure: 40, sorular: [
      { tema: "u1", beceri: "Ekstrem olaylar", puan: 14,
        metin: r`Son yıllarda Türkiye'de ani sağanaklar, sıcak hava dalgaları ve orman yangınları daha sık görülmektedir.

**a)** Ekstrem doğa olaylarını oluşum kaynağına göre iki gruba ayırıp her gruba iki örnek veriniz.
**b)** Bu olayların sıklaşmasının iklim değişikliğiyle ilişkisini açıklayınız.`,
        cevap: r`**a)** Atmosfer kaynaklı (meteorolojik/klimatolojik): kasırga, sel, kuraklık, sıcak hava dalgası, dolu, tipi. Yer kaynaklı (jeolojik): deprem, volkan patlaması, heyelan, tsunami. (Biyolojik: salgınlar, çekirge istilası da kabul edilir.)
**b)** Isınan atmosfer daha fazla su buharı tutar; ani ve şiddetli yağışlar artar. Sıcaklık artışı kuraklık ve sıcak hava dalgalarını uzatır; kuruyan bitki örtüsü yangın riskini yükseltir.`,
        olcut: [[14, "İki grup örnekli ve ilişki"], [9, "Biri tam"], [4, "Bir doğru unsur"], [0, "Yanlış ya da boş"]] },
      { tema: "u1", beceri: "Risk ve zarar görebilirlik", puan: 14,
        metin: r`Aynı büyüklükteki iki depremden biri gelişmiş bir ülkede az kayba, diğeri gelişmekte olan bir ülkede büyük kayba yol açmıştır.

Bu farkı **zarar görebilirlik** (kırılganlık) kavramıyla açıklayınız; kırılganlığı artıran üç etmeni yazınız.`,
        cevap: r`Zarar görebilirlik, bir toplumun tehlikeye karşı ne kadar savunmasız olduğunu gösterir. Aynı doğa olayı, hazırlıklı ve dirençli toplumlarda afete dönüşmezken kırılgan toplumlarda büyük kayıplara yol açar.

Etmenler: deprem yönetmeliğine uymayan yapılaşma, yoksulluk, plansız ve yoğun kentleşme, afet eğitimi ve tatbikat eksikliği, erken uyarı ve acil müdahale kapasitesinin yetersizliği, sigorta (DASK) yaygınlığının az olması.`,
        olcut: [[14, "Açıklama ve üç etmen"], [9, "Açıklama ve iki etmen"], [4, "Bir-iki unsur"], [0, "Yanlış ya da boş"]] },
      { tema: "u1", beceri: "Gelecek senaryoları", puan: 14,
        metin: r`IPCC raporlarına göre sera gazı salımları azaltılmazsa yüzyıl sonunda ortalama sıcaklık artışı 2 °C'yi aşabilir.

Bu senaryonun Türkiye'nin **tarımına** ve **su kaynaklarına** olası etkilerini açıklayınız. Paris İklim Anlaşması'nın temel hedefini yazınız.`,
        cevap: r`Tarım: kuraklık ve sıcaklık stresiyle verim düşüşü, ekim alanlarının ve ürün desenlerinin kayması, sulama ihtiyacının artması, zararlıların yayılması. Su kaynakları: yağış rejiminin değişmesi, kar örtüsünün azalması, akarsu debilerinin ve yer altı suyu seviyelerinin düşmesi, barajlarda doluluk azalması.

Paris Anlaşması: küresel sıcaklık artışını sanayi öncesine göre 2 °C'nin oldukça altında tutmak ve 1,5 °C ile sınırlamak için çaba göstermek.`,
        olcut: [[14, "İki alan etkisi ve hedef"], [9, "Üç unsurdan ikisi"], [4, "Bir unsur"], [0, "Yanlış ya da boş"]] },
      { tema: "u2", beceri: "Göç ve şehirleşme", puan: 14,
        metin: r`İstanbul, Ankara ve İzmir yıllardır en çok göç alan şehirlerdendir.

**a)** Ekonomi–şehirleşme–göç ilişkisini bir neden-sonuç zinciriyle açıklayınız.
**b)** Bu şehirlerde göçün yol açtığı iki sorun ve iki çözüm önerisi yazınız.`,
        cevap: r`**a)** Sanayi ve hizmet sektörünün büyük şehirlerde yoğunlaşması → iş olanakları ve yüksek gelir → kırsaldan ve küçük şehirlerden göç → nüfus artışı ve şehirleşme → yeni yatırımlar ve hizmet talebi → daha fazla göç (döngü).
**b)** Sorunlar: konut ve altyapı yetersizliği, trafik, çarpık yapılaşma, işsizlik, çevre kirliliği. Çözümler: bölgesel kalkınma ile göç veren yerlerde iş olanakları yaratmak; kentsel dönüşüm ve planlı yapılaşma; toplu taşımanın geliştirilmesi; uydu kentler.`,
        olcut: [[14, "Zincir, iki sorun, iki çözüm"], [9, "Üç unsur"], [4, "Bir-iki unsur"], [0, "Yanlış ya da boş"]] },
      { tema: "u2", beceri: "Bölgesel kalkınma projeleri", puan: 14,
        metin: r`GAP, DAP, DOKAP ve KOP Türkiye'nin bölgesel kalkınma projeleridir.

**a)** Bu projelerin ortak amacını yazınız.
**b)** GAP'ın bölgeye sağladığı iki ekonomik değişimi açıklayınız.
**c)** DOKAP'ın kapsadığı bölgeyi ve öncelikli alanlarından birini yazınız.`,
        cevap: r`**a)** Bölgeler arası gelişmişlik farklarını azaltmak, bölgenin kaynaklarını değerlendirerek istihdam ve refahı artırmak, göçü azaltmak.
**b)** Sulamayla birlikte pamuk ve diğer ürünlerde verim ve çeşit artışı; Atatürk Barajı gibi barajlarla enerji üretimi; tarıma dayalı sanayinin gelişmesi; ulaşım ve altyapı yatırımları.
**c)** Doğu Karadeniz (Trabzon, Rize, Artvin, Giresun, Gümüşhane, Ordu, Bayburt); turizm (yayla turizmi), tarım ürünlerinin (çay, fındık) işlenmesi, ulaşım.`,
        olcut: [[14, "Üç bölüm doğru"], [9, "İki bölüm doğru"], [4, "Bir bölüm doğru"], [0, "Yanlış ya da boş"]] },
      { tema: "u2", beceri: "Bölgeleri karşılaştırma", puan: 15,
        metin: r`Ege Bölgesi ile Doğu Anadolu Bölgesi'ni **yer şekilleri**, **iklim** ve **ekonomik faaliyetler** bakımından karşılaştırınız.`,
        cevap: r`- **Yer şekilleri:** Ege'de kıyıya dik uzanan dağlar ve aralarında çöküntü ovaları (Gediz, Büyük-Küçük Menderes); Doğu Anadolu'da yüksek ve engebeli, volkanik dağlar ve yüksek platolar.
- **İklim:** Ege kıyılarında Akdeniz iklimi (yazları sıcak-kurak, kışları ılık-yağışlı); Doğu Anadolu'da sert karasal iklim (kışlar çok soğuk ve uzun).
- **Ekonomik faaliyetler:** Ege'de verimli tarım (zeytin, üzüm, incir, pamuk, tütün), sanayi, ticaret ve turizm gelişmiş; Doğu Anadolu'da büyükbaş ve küçükbaş hayvancılık ağırlıklı, yaz turizmi ve sınır ticareti; sanayi daha az gelişmiş.`,
        olcut: [[15, "Üç ölçütte karşılaştırma"], [10, "İki ölçüt"], [5, "Bir ölçüt"], [0, "Yanlış ya da boş"]] },
      { tema: "u2", beceri: "Ulaşım ve ticaret", puan: 15,
        metin: r`Türkiye'de taşımacılığın büyük bölümü karayoluyla yapılmaktadır.

**a)** Karayolunun ağırlıklı olmasının iki nedenini yazınız.
**b)** Demiryolu ve deniz yolunun daha çok kullanılmasının iki yararını açıklayınız.
**c)** Türkiye'nin dış ticarette önemli bir lojistik merkez olabilmesi için bir öneri yazınız.`,
        cevap: r`**a)** Karayolu ağının yaygın ve kapıdan kapıya taşımaya uygun olması; yer şekillerinin engebeli olması nedeniyle demiryolu yapımının pahalı ve zor olması; geçmişteki yatırım tercihleri.
**b)** Birim maliyet ve yakıt tüketimi düşük; büyük miktarda yük taşınabilir; trafik ve kaza riski azalır; karbon salımı daha azdır.
**c)** Limanları demiryoluyla bağlayan intermodal (kombine) taşımacılık; lojistik merkezler; Orta Koridor (Bakü-Tiflis-Kars) ve Kalkınma Yolu gibi uluslararası koridorlara yatırım.`,
        olcut: [[15, "Üç bölüm doğru"], [10, "İki bölüm doğru"], [5, "Bir bölüm doğru"], [0, "Yanlış ya da boş"]] }
    ] },
    { id: "d2", term: 2, title: "2. Dönem Yazılı", sure: 40, sorular: [
      { tema: "u3", beceri: "Jeopolitik konum", puan: 14,
        metin: r`Türkiye'nin jeopolitik önemini artıran **dört** unsuru yazınız ve birini enerji güvenliği açısından açıklayınız.`,
        cevap: r`Unsurlar: Asya, Avrupa ve Afrika arasında köprü olması; İstanbul ve Çanakkale Boğazları; enerji kaynakları ile tüketici pazarlar arasında bulunması; Orta Doğu, Kafkasya ve Balkanlara yakınlık; genç ve kalabalık nüfus; güçlü ordu ve NATO üyeliği; su kaynakları (Fırat-Dicle).

Örnek: Türkiye, Hazar, Orta Doğu ve Rusya'nın enerji kaynaklarını Avrupa'ya taşıyan boru hatlarının (BTC, TANAP, TürkAkım) geçtiği bir enerji koridorudur; bu durum Avrupa'nın enerji güvenliğinde Türkiye'yi kilit ülke yapar.`,
        olcut: [[14, "Dört unsur ve açıklama"], [9, "Üç unsur ve açıklama ya da dört unsur"], [4, "İki unsur"], [0, "Yanlış ya da boş"]] },
      { tema: "u3", beceri: "Gelişmişlik göstergeleri", puan: 14,
        metin: r`İki ülkenin verileri:

| | A | B |
|---|---|---|
| Kişi başı gelir (USD) | 2 100 | 48 000 |
| Bebek ölüm oranı (‰) | 54 | 3 |
| Ortalama yaşam süresi | 61 | 82 |
| Tarımda çalışan (%) | 38 | 1 |

**a)** Hangi ülke gelişmiştir? Dört göstergeyle gerekçelendiriniz.
**b)** Gelişmişlik ölçmede kişi başı gelirin tek başına yetersiz olmasının nedenini açıklayınız.`,
        cevap: r`**a)** B ülkesi: kişi başı gelir yüksek, bebek ölüm oranı düşük, yaşam süresi uzun, tarımda çalışan oranı çok düşük (sanayi ve hizmet ağırlıklı ekonomi).
**b)** Kişi başı gelir ortalamadır; gelirin nasıl dağıldığını (eşitsizlik), eğitim ve sağlık düzeyini, yaşam kalitesini göstermez. Bu yüzden İnsani Gelişme Endeksi gibi çok boyutlu ölçütler kullanılır.`,
        olcut: [[14, "Gerekçeli seçim ve yetersizlik açıklaması"], [9, "Biri tam"], [4, "Bir doğru unsur"], [0, "Yanlış ya da boş"]] },
      { tema: "u3", beceri: "İlk kültür merkezleri", puan: 14,
        metin: r`Mezopotamya, Nil Vadisi, İndus Vadisi ve Çin'de (Huang He) ilk büyük medeniyetler doğmuştur.

Bu kültür merkezlerinin ortak coğrafi özelliklerini **üç** maddeyle açıklayınız. İnsan–doğa etkileşiminin bu medeniyetlerin gelişimindeki rolünü bir örnekle yazınız.`,
        cevap: r`Ortak özellikler: büyük akarsu kenarlarında kurulmaları (su ve verimli alüvyal topraklar); ılıman ve tarıma elverişli iklim; düz ve geniş ovalar; ulaşım ve ticarete uygun konum.

Örnek: Nil'in düzenli taşkınları verimli toprak bıraktı; Mısırlılar taşkın zamanını hesaplamak için takvim, araziyi yeniden ölçmek için geometri geliştirdi; sulama kanalları ve merkezi yönetim gelişti.`,
        olcut: [[14, "Üç özellik ve örnek"], [9, "İki özellik ve örnek"], [4, "Bir-iki unsur"], [0, "Yanlış ya da boş"]] },
      { tema: "u3", beceri: "Ülke karşılaştırma", puan: 14,
        metin: r`Almanya ve Nijerya'yı **ekonomik yapı**, **nüfus özellikleri** ve **doğal kaynak kullanımı** bakımından karşılaştırınız.`,
        cevap: r`- **Ekonomik yapı:** Almanya ileri sanayi (otomotiv, makine, kimya) ve hizmet ağırlıklı, ihracatçı; Nijerya petrol ihracatına ve tarıma dayalı, sanayisi sınırlı.
- **Nüfus:** Almanya'da doğum oranı düşük, yaşlı nüfus fazla, nüfus artışı göçle; Nijerya Afrika'nın en kalabalık ülkesi, genç nüfus ve hızlı nüfus artışı.
- **Doğal kaynak:** Almanya kaynakları sınırlı, ham madde ithal ederek işler ve yenilenebilir enerjiye yatırım yapar; Nijerya zengin petrol kaynaklarını çoğunlukla ham olarak ihraç eder (tek ürüne bağımlılık).`,
        olcut: [[14, "Üç ölçüt"], [9, "İki ölçüt"], [4, "Bir ölçüt"], [0, "Yanlış ya da boş"]] },
      { tema: "u4", beceri: "Sürdürülebilir kalkınma", puan: 14,
        metin: r`Birleşmiş Milletler'in **Sürdürülebilir Kalkınma Amaçları** 2030'a kadar ulaşılması hedeflenen 17 amaçtan oluşur.

**a)** Sürdürülebilir kalkınma kavramını tanımlayınız.
**b)** Bu amaçlardan ikisini yazıp okulunuzda hayata geçirilebilecek birer uygulama öneriniz.`,
        cevap: r`**a)** Bugünün ihtiyaçlarını, gelecek kuşakların kendi ihtiyaçlarını karşılama olanaklarını tehlikeye atmadan karşılayan kalkınma; ekonomik büyüme, toplumsal eşitlik ve çevre korumasının dengelenmesi.
**b)** Örnek: Nitelikli eğitim — akran öğretmenliği ve kütüphane programları. Sorumlu tüketim ve üretim — atıkların ayrıştırılması, kâğıt tasarrufu. İklim eylemi — enerji tasarrufu, okul bahçesine ağaç dikimi. Temiz su — su tasarrufu kampanyası, yağmur suyu toplama.`,
        olcut: [[14, "Tanım ve iki amaç-uygulama"], [9, "Üç unsur"], [4, "Bir-iki unsur"], [0, "Yanlış ya da boş"]] },
      { tema: "u4", beceri: "Ortak miras", puan: 15,
        metin: r`Göreme Millî Parkı ve Kapadokya, Pamukkale-Hierapolis ve Göbeklitepe UNESCO Dünya Mirası Listesi'ndedir.

**a)** Bir yerin "dünya mirası" olarak korunmasının iki nedenini yazınız.
**b)** Bu alanları tehdit eden iki etmeni ve bireylerin bu alanların korunmasına iki katkısını açıklayınız.`,
        cevap: r`**a)** İnsanlığın ortak tarihî, kültürel ya da doğal değerlerini taşıması; eşsiz ve yeri doldurulamaz olması; gelecek kuşaklara aktarılması gerektiği.
**b)** Tehditler: aşırı ve kontrolsüz turizm, yapılaşma, hava kirliliği ve iklim değişikliği, kaçak kazı, doğal afetler. Bireysel katkı: alan kurallarına uymak (travertenlere ayakkabıyla basmamak gibi), çöp bırakmamak, tarihî eserlere zarar vermemek, gönüllü projelere ve STK'lara katılmak, farkındalık oluşturmak.`,
        olcut: [[15, "İki neden, iki tehdit, iki katkı"], [10, "Dört-beş unsur"], [5, "İki-üç unsur"], [0, "Yanlış ya da boş"]] },
      { tema: "u4", beceri: "Sınırlı kaynaklar", puan: 15,
        metin: r`Dünya nüfusu arttıkça su, enerji ve maden gibi sınırlı kaynaklara olan talep de artmaktadır.

**a)** Yenilenebilir ve yenilenemez kaynaklara ikişer örnek veriniz.
**b)** Kaynakların sürdürülebilir kullanımı için devlet ve birey düzeyinde birer öneri yazınız.
**c)** Teknolojinin kaynak sorunlarının çözümüne bir katkısını açıklayınız.`,
        cevap: r`**a)** Yenilenebilir: güneş, rüzgâr, su, biyokütle, orman (doğru yönetilirse). Yenilenemez: petrol, kömür, doğal gaz, metal madenler.
**b)** Devlet: yenilenebilir enerji teşvikleri, geri dönüşüm zorunluluğu, su havzalarının korunması. Birey: tasarruf (su, elektrik), geri dönüşüm, toplu taşıma kullanımı, gereksiz tüketimden kaçınmak.
**c)** Damla sulama ve akıllı tarımla su tasarrufu; daha verimli güneş panelleri ve piller; geri dönüşüm teknolojileriyle madenlerin yeniden kazanılması; deniz suyu arıtma.`,
        olcut: [[15, "Üç bölüm doğru"], [10, "İki bölüm doğru"], [5, "Bir bölüm doğru"], [0, "Yanlış ya da boş"]] }
    ] }
  ] };
})();
