/* 11. Sınıf Coğrafya — Maarif Modeli açık uçlu yazılı sınavları (örnek). Üniteler u1–u7 */
(function () {
  const r = String.raw; App.data.yazili = App.data.yazili || {};
  App.data.yazili["11/cografya"] = { exams: [
    { id: "d1", term: 1, title: "1. Dönem Ortak Yazılı", sure: 40, sorular: [
      { tema: "u1", beceri: "Mekânsal sorun çözme", puan: 14,
        metin: r`Bir ilçede her yaz su kesintileri yaşanıyor.

Bu mekânsal sorunu coğrafi bakışla analiz ediniz: sorunun **iki doğal**, **iki beşerî** nedenini yazınız ve coğrafyanın çözüme katkısını bir cümleyle belirtiniz.`,
        cevap: r`Doğal: yaz kuraklığı ve yüksek buharlaşma; yağışın mevsimlere düzensiz dağılması; yer altı suyu rezervinin az olması; iklim değişikliği.
Beşerî: yazın turizm ve nüfus artışı; tarımsal sulamada vahşi sulama; altyapıdaki kayıp-kaçak; plansız yapılaşma.

Katkı: Coğrafya su kaynaklarını, tüketimi ve nüfus dağılışını mekânsal olarak birlikte inceleyip (CBS ile) planlamaya yol gösterir.`,
        olcut: [[14, "Dört neden ve katkı"], [9, "Üç neden ve katkı ya da dört neden"], [4, "İki unsur"], [0, "Yanlış ya da boş"]] },
      { tema: "u2", beceri: "Web tabanlı CBS", puan: 14,
        metin: r`Bir öğrenci, deprem sonrası toplanma alanlarını öğrenmek için e-Devlet/AFAD'ın web tabanlı harita uygulamasını kullanıyor.

**a)** Web tabanlı CBS uygulamalarının iki avantajını yazınız.
**b)** Bu tür bir uygulamada kişisel verilerin korunması neden önemlidir?`,
        cevap: r`**a)** İnternet erişimi olan herkes tarafından kullanılabilir; veriler güncel tutulabilir; kullanıcı kendi konumunu görerek en yakın alanı bulabilir; özel yazılım kurulmasına gerek yoktur; farklı veri katmanları birlikte görüntülenebilir.
**b)** Konum verisi kişinin ev, okul ve hareketlerini ortaya koyar; kötüye kullanılırsa güvenlik ve mahremiyet riski oluşur. Bu yüzden veriler izinle toplanmalı, anonimleştirilmeli ve KVKK'ya uygun saklanmalıdır.`,
        olcut: [[14, "İki avantaj ve gerekçe"], [9, "Biri tam"], [4, "Bir doğru unsur"], [0, "Yanlış ya da boş"]] },
      { tema: "u3", beceri: "Hidrolojik döngü", puan: 14,
        metin: r`Hidrolojik döngünün aşamalarını (buharlaşma, terleme, yoğuşma, yağış, yüzey akışı, sızma) sırasıyla açıklayınız. Şehirlerde beton yüzeylerin artmasının bu döngüyü nasıl etkilediğini yazınız.`,
        cevap: r`Güneş enerjisiyle denizlerden ve karalardan buharlaşma, bitkilerden terleme olur; su buharı yükseldikçe soğuyup yoğuşur ve bulutları oluşturur; yağış olarak yere düşer; bir kısmı yüzey akışıyla akarsulara ve denizlere, bir kısmı sızma ile yer altına geçer ve döngü sürer.

Beton yüzeyler geçirimsizdir: sızma azalır, yüzey akışı artar; ani sel riski yükselir ve yer altı suyu beslenemez.`,
        olcut: [[14, "Aşamalar ve kentleşme etkisi"], [9, "Aşamalar doğru, etki eksik"], [4, "Birkaç aşama"], [0, "Yanlış ya da boş"]] },
      { tema: "u3", beceri: "Sınıraşan sular", puan: 14,
        metin: r`Fırat ve Dicle nehirleri Türkiye'den doğup Suriye ve Irak'tan geçerek Basra Körfezi'ne dökülür.

**a)** Sınıraşan su nedir?
**b)** Bu nehirlerin kullanımında ülkeler arasında sorunlar çıkmasının iki nedenini ve bir çözüm önerisini yazınız.`,
        cevap: r`**a)** Birden fazla ülkenin sınırları içinden geçen ya da sınır oluşturan akarsu, göl ve yer altı sularıdır.
**b)** Nedenler: kurak bölgede suya ihtiyacın büyük olması; memba ülkenin baraj ve sulama projeleri; nüfus ve tarımın artması; iklim değişikliğiyle su miktarının azalması. Çözüm: ortak teknik komisyonlar, hakça ve makul kullanım ilkesine dayalı antlaşmalar, modern sulama yöntemleri, veri paylaşımı.`,
        olcut: [[14, "Tanım, iki neden ve çözüm"], [9, "Üç unsur"], [4, "Bir-iki unsur"], [0, "Yanlış ya da boş"]] },
      { tema: "u3", beceri: "Deniz yetki alanları", puan: 14,
        metin: r`**Mavi Vatan** kavramı Türkiye'nin denizlerdeki hak ve yetki alanlarını ifade eder.

**a)** Kara suları, kıta sahanlığı ve münhasır ekonomik bölge kavramlarından ikisini açıklayınız.
**b)** Denizlerin Türkiye için iki ekonomik önemini yazınız.`,
        cevap: r`**a)** Kara suları: kıyıdan itibaren devletin egemen olduğu deniz alanı (Türkiye'de Ege'de 6, Karadeniz ve Akdeniz'de 12 deniz mili). Kıta sahanlığı: kara parçasının deniz altındaki doğal uzantısı; deniz tabanı ve altındaki kaynaklar üzerinde egemenlik hakları. Münhasır ekonomik bölge: kıyıdan 200 deniz miline kadar deniz ve deniz tabanındaki doğal kaynakları arama, işletme ve koruma hakları.
**b)** Balıkçılık ve su ürünleri; deniz ulaşımı ve limanlar; turizm; deniz altı enerji kaynakları (doğal gaz); boru hatları.`,
        olcut: [[14, "İki kavram ve iki önem"], [9, "Üç unsur"], [4, "Bir-iki unsur"], [0, "Yanlış ya da boş"]] },
      { tema: "u3", beceri: "Sulak alanlar", puan: 15,
        metin: r`Bir sulak alanın kurutularak tarım arazisine dönüştürülmesi planlanıyor.

Bu kararın ekosisteme ve yerel halka **iki olumsuz etkisini** açıklayınız. Sulak alanların korunması için uluslararası bir sözleşmenin adını yazınız.`,
        cevap: r`Olumsuz etkiler: kuş göç yolları ve üreme alanları yok olur, biyoçeşitlilik azalır; yer altı suyu seviyesi düşer; doğal taşkın kontrolü ortadan kalkar, sel riski artar; yerel mikroklima ve nem değişir; kamış, balıkçılık gibi geçim kaynakları kaybolur.

Sözleşme: Ramsar Sözleşmesi.`,
        olcut: [[15, "İki etki ve Ramsar"], [10, "İki etki ya da bir etki ve Ramsar"], [5, "Bir unsur"], [0, "Yanlış ya da boş"]] },
      { tema: "u4", beceri: "Etki alanı", puan: 15,
        metin: r`Kayseri, çevresindeki birçok ilçe ve ilden alışveriş, sağlık ve eğitim için ziyaretçi alır.

**a)** Bir şehrin **etki alanı** neye göre belirlenir? İki ölçüt yazınız.
**b)** Ulaşım ağı gelişince bir şehrin etki alanı nasıl değişir? Açıklayınız.`,
        cevap: r`**a)** Sunduğu hizmetlerin çeşitliliği ve kalitesi (hastane, üniversite, AVM); nüfus büyüklüğü; ekonomik fonksiyonları ve iş olanakları; ulaşım bağlantıları; yönetim fonksiyonu.
**b)** Ulaşım süresi ve maliyeti azaldıkça daha uzaktaki yerleşmeler de hizmet almaya gelir; etki alanı genişler. Ancak daha büyük bir merkeze kolay ulaşım, bazı çevre yerleşmelerin o büyük merkeze yönelmesine de yol açabilir.`,
        olcut: [[15, "İki ölçüt ve değişim açıklaması"], [10, "Biri tam"], [5, "Bir doğru unsur"], [0, "Yanlış ya da boş"]] }
    ] },
    { id: "d2", term: 2, title: "2. Dönem Ortak Yazılı", sure: 40, sorular: [
      { tema: "u5", beceri: "Gıda güvencesi", puan: 14,
        metin: r`Dünya nüfusunun 2050'de 9,7 milyara ulaşması beklenirken tarım alanları kentleşme ve kuraklıkla azalıyor.

**a)** Gıda güvencesi kavramını açıklayınız.
**b)** Gıda güvencesini tehdit eden iki etmeni ve iki çözüm önerisini yazınız.`,
        cevap: r`**a)** Herkesin her zaman yeterli, güvenli ve besleyici gıdaya fiziksel ve ekonomik olarak erişebilmesidir.
**b)** Tehditler: iklim değişikliği ve kuraklık; tarım arazilerinin amaç dışı kullanımı; toprak erozyonu; nüfus artışı; savaşlar ve ekonomik krizler; gıda israfı. Çözümler: verimli arazilerin korunması; damla sulama; kuraklığa dayanıklı tohumlar; akıllı tarım; gıda israfının azaltılması; yerel üretimin desteklenmesi.`,
        olcut: [[14, "Tanım, iki etmen, iki çözüm"], [9, "Dört unsur"], [4, "İki unsur"], [0, "Yanlış ya da boş"]] },
      { tema: "u5", beceri: "Tarımda teknoloji", puan: 14,
        metin: r`Bir çiftçi tarlasında nem sensörleri, drone ile ilaçlama ve uydu destekli gübreleme kullanıyor.

**a)** Akıllı (hassas) tarımın iki yararını yazınız.
**b)** Bu uygulamaların sürdürülebilir tarıma katkısını açıklayınız.`,
        cevap: r`**a)** Su, gübre ve ilaç gerektiği kadar ve gerektiği yerde kullanılır; verim artar; maliyet ve iş gücü azalır; hastalıklar erken fark edilir.
**b)** Kaynakların (su, toprak) aşırı kullanımı önlenir; kimyasalların toprağa ve suya karışması azalır; biyoçeşitlilik korunur; gelecek kuşakların da aynı alandan verim alabilmesi sağlanır.`,
        olcut: [[14, "İki yarar ve sürdürülebilirlik"], [9, "Biri tam"], [4, "Bir doğru unsur"], [0, "Yanlış ya da boş"]] },
      { tema: "u5", beceri: "Stratejik madenler", puan: 14,
        metin: r`Bor, lityum ve nadir toprak elementleri günümüzde "stratejik maden" olarak görülmektedir.

**a)** Bir madenin stratejik sayılmasının iki ölçütünü yazınız.
**b)** Bor madeninin Türkiye için önemini ve kullanım alanlarından ikisini yazınız.`,
        cevap: r`**a)** İleri teknoloji, savunma ve enerji sektörleri için vazgeçilmez olması; rezervlerin az sayıda ülkede yoğunlaşması; ikamesinin (yerine konacak madde) zor olması; arz kesintisi riskinin yüksek olması.
**b)** Dünya bor rezervlerinin yaklaşık %70'inden fazlası Türkiye'dedir (Eskişehir, Balıkesir, Kütahya, Bursa). Kullanım: cam ve seramik, deterjan, tarım (gübre), nükleer reaktörlerde kontrol çubukları, enerji depolama ve roket yakıtı, ilaç.`,
        olcut: [[14, "İki ölçüt ve borun önemi-iki kullanım"], [9, "Üç unsur"], [4, "Bir-iki unsur"], [0, "Yanlış ya da boş"]] },
      { tema: "u5", beceri: "Enerji koridoru", puan: 14,
        metin: r`Türkiye, enerji kaynaklarına sahip ülkeler ile Avrupa'daki tüketici ülkeler arasında boru hatlarının geçtiği bir konumdadır.

Bu "enerji koridoru" rolünün Türkiye'ye iki ekonomik ve bir siyasi katkısını açıklayınız. Bir boru hattı adı veriniz.`,
        cevap: r`Ekonomik: transit geçiş ücretleri ve gelir; enerji arz güvenliğinin artması; yatırım ve istihdam; enerji ticaret merkezi (hub) olma potansiyeli.
Siyasi: bölgesel ve uluslararası ilişkilerde önemin ve pazarlık gücünün artması.
Örnek: Bakü-Tiflis-Ceyhan (petrol), TANAP, TürkAkım, Mavi Akım, Irak-Türkiye ham petrol boru hattı.`,
        olcut: [[14, "Üç katkı ve bir örnek"], [9, "Üç unsur"], [4, "Bir-iki unsur"], [0, "Yanlış ya da boş"]] },
      { tema: "u6", beceri: "Gezegen sınırları", puan: 14,
        metin: r`"Gezegen sınırları" yaklaşımı, insanlığın güvenle yaşayabileceği çevresel sınırları tanımlar (iklim değişikliği, biyoçeşitlilik kaybı, azot döngüsü vb.).

**a)** Bu yaklaşımın amacını açıklayınız.
**b)** Aşıldığı düşünülen iki sınırı yazıp birinin insan faaliyetleriyle bağlantısını açıklayınız.`,
        cevap: r`**a)** Yerkürenin sistemlerinin dengede kalabileceği güvenli faaliyet alanını belirlemek; bu sınırlar aşılırsa geri dönüşü zor ve ani çevresel değişimler yaşanabileceğine dikkat çekmek.
**b)** İklim değişikliği, biyoçeşitlilik kaybı (biyosfer bütünlüğü), azot ve fosfor döngüleri, arazi kullanımı değişimi, yeni kimyasallar (plastik vb.). Örnek: Aşırı gübre kullanımı azot ve fosforun akarsu ve göllere taşınmasına, ötrofikasyona (alg patlaması ve oksijensiz kalma) yol açar.`,
        olcut: [[14, "Amaç, iki sınır ve bağlantı"], [9, "Üç unsur"], [4, "Bir-iki unsur"], [0, "Yanlış ya da boş"]] },
      { tema: "u6", beceri: "İklim uyumu", puan: 15,
        metin: r`İklim değişikliğiyle mücadelede **azaltım** (mitigasyon) ve **uyum** (adaptasyon) iki farklı yaklaşımdır.

Her ikisini açıklayınız ve Türkiye'deki bir şehir için her birine birer somut uygulama önerisi yazınız.`,
        cevap: r`Azaltım: sera gazı salımlarını azaltmaya yönelik önlemler (değişimin nedenine müdahale). Uyum: kaçınılmaz etkilere hazırlanma ve zararı azaltma (sonuçlarına uyum).

Örnek azaltım: toplu taşıma ve bisiklet yolları, binalarda enerji verimliliği, güneş enerjisi. Örnek uyum: yağmur suyu hasadı ve sel önleme altyapısı, kentte yeşil alan ve gölgelik artırarak ısı adası etkisini azaltmak, kuraklığa dayanıklı bitkiler, sıcak hava dalgası erken uyarı sistemi.`,
        olcut: [[15, "İki kavram ve iki uygulama"], [10, "Üç unsur"], [5, "Bir-iki unsur"], [0, "Yanlış ya da boş"]] },
      { tema: "u7", beceri: "Ülke karşılaştırma", puan: 15,
        metin: r`Hollanda'nın yüzölçümü küçük olmasına rağmen dünyanın en büyük tarım ürünü ihracatçılarından biridir; Suudi Arabistan ise ekonomisini büyük ölçüde petrole dayandırır.

İki ülkenin ekonomik özelliklerini **doğal koşullar** ve **beşerî faktörler** üzerinden karşılaştırınız. Her ülkenin karşılaştığı birer sorunu yazınız.`,
        cevap: r`**Hollanda:** Düz, verimli ama deniz seviyesinin altında arazi (polderler); ılıman okyanusal iklim. Yüksek teknoloji (sera, seracılık otomasyonu), Ar-Ge, güçlü lojistik (Rotterdam limanı), nitelikli iş gücü. Sorun: deniz seviyesinin yükselmesi ve taşkın riski.
**Suudi Arabistan:** Çöl iklimi, kıt su ve tarım alanı; büyük petrol rezervleri. Beşerî: petrol gelirine dayalı ekonomi, yabancı iş gücü. Sorun: ekonominin tek ürüne bağımlı olması, su kıtlığı (deniz suyu arıtmaya bağımlılık).`,
        olcut: [[15, "İki ülke iki ölçütle ve birer sorun"], [10, "Bir ülke tam, diğeri eksik"], [5, "Bir-iki unsur"], [0, "Yanlış ya da boş"]] }
    ] }
  ] };
})();
