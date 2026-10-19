/* 12. Sınıf Biyoloji — açık uçlu yazılı sınavları (örnek; 2018 programı, Maarif sınav biçimi). */
(function () {
  const r = String.raw; App.data.yazili = App.data.yazili || {};
  App.data.yazili["12/biyoloji"] = { exams: [
    { id: "d1", term: 1, title: "1. Dönem Yazılı", sure: 40, sorular: [
      { tema: "u1", beceri: "DNA hesapları", puan: 14,
        metin: r`Çift zincirli bir DNA molekülünde 2000 nükleotit vardır ve bunların %30'u adenin içerir.

**a)** Timin, guanin ve sitozin sayılarını bulunuz.
**b)** Molekülde kaç hidrojen bağı vardır?
**c)** Bu hesapta Chargaff kuralını nasıl kullandığınızı açıklayınız.`,
        cevap: r`**a)** A = 600 ⇒ T = 600; G + C = 800 ⇒ G = C = 400.
**b)** A–T arası 2, G–C arası 3 hidrojen bağı: $600 \cdot 2 + 400 \cdot 3 = 1200 + 1200 = 2400$.
**c)** Çift zincirli DNA'da A = T ve G = C'dir (bazlar tamamlayıcı eşleşir).`,
        olcut: [[14, "Üç bölüm doğru"], [9, "İki bölüm doğru"], [4, "Bir bölüm doğru"], [0, "Yanlış ya da boş"]] },
      { tema: "u1", beceri: "Replikasyon", puan: 14,
        metin: r`Meselson ve Stahl deneyinde ağır azot ($^{15}\text{N}$) içeren DNA'lı bakteriler hafif azotlu ($^{14}\text{N}$) ortama alınıp bir kez bölündürülmüştür.

**a)** Oluşan DNA'ların yoğunluğu ne olur?
**b)** Bu sonuç hangi eşlenme modelini destekler? Açıklayınız.`,
        cevap: r`**a)** Hepsi orta yoğunlukta (hibrit: bir zincir ağır, bir zincir hafif).
**b)** Yarı korunumlu (semikonservatif) eşlenme: her yeni DNA, eski zincirlerden birini kalıp olarak korur ve yeni bir zincir sentezlenir. Korunumlu model olsaydı birinci kuşakta ağır ve hafif iki ayrı bant görülürdü.`,
        olcut: [[14, "Yoğunluk ve model gerekçeli"], [9, "Biri tam"], [4, "Bir doğru unsur"], [0, "Yanlış ya da boş"]] },
      { tema: "u1", beceri: "Protein sentezi", puan: 14,
        metin: r`Bir DNA kalıp zinciri: **3'–TAC GGA CCT ATT–5'**

**a)** Bu kalıptan sentezlenen mRNA dizisini yazınız.
**b)** Sentezlenen polipeptitte kaç amino asit olur? Gerekçelendiriniz.
**c)** Transkripsiyon ve translasyonun hücrede nerede gerçekleştiğini yazınız (ökaryotta).`,
        cevap: r`**a)** 5'–AUG CCU GGA UAA–3'.
**b)** AUG başlatıcı (metiyonin), CCU (prolin), GGA (glisin), UAA dur kodonu ⇒ 3 amino asit. Dur kodonu amino asit şifrelemez.
**c)** Transkripsiyon çekirdekte, translasyon sitoplazmada ribozomlarda.`,
        olcut: [[14, "Üç bölüm doğru"], [9, "İki bölüm doğru"], [4, "Bir bölüm doğru"], [0, "Yanlış ya da boş"]] },
      { tema: "u1", beceri: "Mutasyon", puan: 14,
        metin: r`Orak hücre anemisinde hemoglobin genindeki tek bir nükleotit değişimi (GAG → GTG) glutamik asit yerine valin gelmesine yol açar.

**a)** Bu mutasyon türünü yazınız.
**b)** Tek bir amino asit değişimi hücrenin şeklini neden değiştirir?
**c)** Bir nükleotit eklenmesi (çerçeve kayması) neden genellikle daha zararlıdır?`,
        cevap: r`**a)** Nokta mutasyonu (yer değiştirme/baz değişimi; yanlış anlamlı mutasyon).
**b)** Amino asit dizisi değişince proteinin üç boyutlu yapısı değişir; anormal hemoglobin oksijensiz ortamda kümelenir ve alyuvarlar orak biçimini alır.
**c)** Okuma çerçevesi kayar; mutasyondan sonraki tüm kodonlar değişir, protein tamamen bozulur ya da erken dur kodonu oluşur.`,
        olcut: [[14, "Üç bölüm doğru"], [9, "İki bölüm doğru"], [4, "Bir bölüm doğru"], [0, "Yanlış ya da boş"]] },
      { tema: "u1", beceri: "Biyoteknoloji ve etik", puan: 14,
        metin: r`İnsan insülin geni bakterilere aktarılarak insülin üretilmektedir.

**a)** Bu süreçte kullanılan iki aracı (enzim ya da vektör) ve görevini yazınız.
**b)** GDO'lu tarım ürünleri hakkında bir olası yarar ve bir olası risk yazınız; biyoetik açısından nasıl bir yaklaşım önerirsiniz?`,
        cevap: r`**a)** Restriksiyon enzimi: DNA'yı belirli dizilerden keser. DNA ligaz: kesilen parçaları birleştirir. Plazmit (vektör): geni bakteriye taşır.
**b)** Yarar: zararlılara ya da kuraklığa dayanıklı, verimi yüksek ürünler. Risk: yabani türlere gen aktarımı, biyoçeşitliliğin azalması, olası alerjik etkiler, tohumda tekelleşme. Yaklaşım: bilimsel risk değerlendirmesi, etiketleme, yasal denetim (Biyogüvenlik Kanunu), şeffaf bilgilendirme.`,
        olcut: [[14, "İki araç ve yarar-risk-yaklaşım"], [9, "Üç unsur"], [4, "Bir-iki unsur"], [0, "Yanlış ya da boş"]] },
      { tema: "u2", beceri: "Fotosentez ayrıntıları", puan: 15,
        metin: r`Fotosentezde kullanılan suyun oksijeni radyoaktif ($^{18}\text{O}$) olarak işaretlendiğinde, açığa çıkan $\text{O}_2$'de radyoaktiflik gözleniyor; glikozda gözlenmiyor.

**a)** Bu deneyin sonucu fotosentezde açığa çıkan oksijenin kaynağı hakkında ne gösterir?
**b)** Su molekülleri hangi tepkimelerde ve nasıl ayrışır?`,
        cevap: r`**a)** Açığa çıkan O₂'nin kaynağı CO₂ değil **sudur**.
**b)** Işığa bağımlı tepkimelerde, fotosistem II'de ışık enerjisiyle su moleküllerinin parçalanması (fotoliz): $2\text{H}_2\text{O} \rightarrow 4\text{H}^+ + 4e^- + \text{O}_2$. Elektronlar klorofilin kaybettiği elektronları yerine koyar; H⁺ ATP sentezinde ve NADPH oluşumunda kullanılır.`,
        olcut: [[15, "İki bölüm doğru"], [10, "Biri tam"], [5, "Bir doğru unsur"], [0, "Yanlış ya da boş"]] },
      { tema: "u2", beceri: "Solunum ve fermantasyon", puan: 15,
        metin: r`Oksijenli solunumun evrelerini (glikoliz, Krebs, ETS) yer ve ATP kazancı bakımından karşılaştırınız. Oksijen olmadığında ETS'nin neden durduğunu açıklayınız.`,
        cevap: r`| Evre | Yer | Net ATP (yaklaşık) |
|---|---|---|
| Glikoliz | Sitoplazma | 2 (substrat düzeyinde) |
| Krebs döngüsü | Mitokondri matriksi | 2 |
| ETS ve oksidatif fosforilasyon | Mitokondri iç zarı | ~28–34 |

Oksijen ETS'nin son elektron alıcısıdır. Oksijen yoksa elektronlar zincirden ayrılamaz, NADH ve FADH₂ yeniden yükseltgenemez, proton gradyanı oluşmaz ve ATP sentezi durur; hücre fermantasyona geçer.`,
        olcut: [[15, "Üç evre ve oksijen açıklaması"], [10, "İki evre ve açıklama ya da üç evre"], [5, "Bir-iki unsur"], [0, "Yanlış ya da boş"]] }
    ] },
    { id: "d2", term: 2, title: "2. Dönem Yazılı", sure: 40, sorular: [
      { tema: "u3", beceri: "Bitki dokuları", puan: 14,
        metin: r`Bir ağacın gövdesinde iletim demetleri ve kambiyum bulunur.

**a)** Ksilem ve floemin taşıdığı maddeleri ve taşıma yönünü yazınız.
**b)** Kambiyum dokusunun görevini ve yıllık halkaların oluşumunu açıklayınız.`,
        cevap: r`**a)** Ksilem (odun borusu): su ve mineralleri kökten yapraklara, tek yönlü (yukarı). Floem (soymuk borusu): fotosentez ürünlerini (organik besin) yapraklardan kullanılacak ya da depolanacak yerlere, iki yönlü.
**b)** Kambiyum bölünerek içe ksilem, dışa floem oluşturur; gövdenin enine kalınlaşmasını sağlar. İlkbaharda geniş, açık renkli; yaz sonunda dar, koyu renkli ksilem hücreleri oluşur; bu fark yıllık halkaları meydana getirir.`,
        olcut: [[14, "İki bölüm doğru"], [9, "Biri tam"], [4, "Bir doğru unsur"], [0, "Yanlış ya da boş"]] },
      { tema: "u3", beceri: "Taşıma mekanizmaları", puan: 14,
        metin: r`Uzun bir ağaçta su köklerden onlarca metre yukarıdaki yapraklara taşınır.

Suyun yükselmesini sağlayan **üç** etkeni (terleme çekimi, kohezyon-adezyon, kök basıncı) açıklayınız. Hangisinin en etkili olduğunu belirtiniz.`,
        cevap: r`- **Terleme çekimi:** Yapraklardan buharlaşan su, ksilemdeki su sütununu yukarı çeker (en etkili).
- **Kohezyon-adezyon:** Su molekülleri birbirini çeker (kohezyon) ve ksilem çeperine tutunur (adezyon); su sütunu kopmadan yükselir.
- **Kök basıncı:** Kök hücrelerine aktif mineral alımıyla ozmotik basınç oluşur, su köke girip yukarı itilir (özellikle geceleri ve ilkbaharda; damlama/gutasyon).`,
        olcut: [[14, "Üç etken ve en etkilisi"], [9, "İki etken ve en etkilisi"], [4, "Bir etken"], [0, "Yanlış ya da boş"]] },
      { tema: "u3", beceri: "Bitkilerde üreme", puan: 14,
        metin: r`Kapalı tohumlu bitkilerde **çift döllenme** görülür.

**a)** Çift döllenmeyi açıklayınız; oluşan yapıları ve kromozom sayılarını yazınız.
**b)** Çilek ve patateste görülen eşeysiz üreme türlerini yazınız; bu üremenin tarım için bir avantajını belirtiniz.`,
        cevap: r`**a)** Polen tüpündeki bir sperm yumurta ile birleşir → zigot (2n) → embriyo. Diğer sperm iki kutup çekirdeğiyle birleşir → endosperm (3n), besin dokusu.
**b)** Çilek: stolon (toprak üstü sürünücü gövde); patates: yumru. Avantaj: istenen özellikteki bitki aynı genetik yapıda hızla çoğaltılır, tohuma göre daha kısa sürede ürün alınır.`,
        olcut: [[14, "İki bölüm doğru"], [9, "Biri tam"], [4, "Bir doğru unsur"], [0, "Yanlış ya da boş"]] },
      { tema: "u4", beceri: "Popülasyon ekolojisi", puan: 14,
        metin: r`Bir göle yabancı bir balık türü bırakılıyor; birkaç yıl içinde yerli balık türlerinin sayısı hızla azalıyor.

**a)** Bu durumu istilacı tür ve rekabet kavramlarıyla açıklayınız.
**b)** İstilacı türlerin yayılmasını önlemek için iki öneri yazınız.`,
        cevap: r`**a)** İstilacı tür yeni ortamında doğal düşmanı olmadığından hızla çoğalır; besin ve yaşam alanı için yerli türlerle rekabet eder, onların yumurtalarını ya da yavrularını yiyebilir; yerli türler azalır, biyoçeşitlilik düşer.
**b)** Yabancı türlerin doğaya bırakılmasını yasaklamak ve denetlemek; gemilerin balast suyunun arıtılması; erken tespit ve izleme; halkı bilinçlendirme.`,
        olcut: [[14, "Açıklama ve iki öneri"], [9, "Biri tam"], [4, "Bir doğru unsur"], [0, "Yanlış ya da boş"]] },
      { tema: "u4", beceri: "Madde döngüleri", puan: 14,
        metin: r`Karbon döngüsünde karbonun atmosferden canlılara ve tekrar atmosfere geçişini **dört** süreçle açıklayınız. İnsan faaliyetlerinin döngüyü nasıl bozduğunu yazınız.`,
        cevap: r`- Fotosentez: üreticiler CO₂'yi organik maddeye çevirir.
- Besin zinciri: karbon tüketicilere geçer.
- Solunum: canlılar organik maddeyi parçalayıp CO₂'yi atmosfere verir.
- Ayrıştırma: ölü canlıların ayrıştırılmasıyla CO₂ açığa çıkar (ayrıca fosilleşme ile depolanma).

İnsan etkisi: fosil yakıtların yakılması ve ormansızlaşma atmosferdeki CO₂'yi artırır; döngünün dengesi bozulur, küresel ısınma hızlanır.`,
        olcut: [[14, "Dört süreç ve insan etkisi"], [9, "Üç süreç ve etki"], [4, "Bir-iki unsur"], [0, "Yanlış ya da boş"]] },
      { tema: "u4", beceri: "Çevre sorunları", puan: 15,
        metin: r`Bir gölün kenarındaki tarım arazilerinde aşırı gübre kullanılıyor; yaz aylarında gölde yoğun alg patlaması ve balık ölümleri görülüyor.

**a)** Bu olayın adını yazınız ve aşamalarını açıklayınız.
**b)** Bu sorunun önlenmesi için iki çözüm önerisi yazınız.`,
        cevap: r`**a)** Ötrofikasyon. Gübrelerden yağmurla göle taşınan azot ve fosfor algleri aşırı çoğaltır; ışık derinlere ulaşamaz; ölen algler ayrıştırıcı bakterilerce parçalanırken sudaki oksijen tükenir; oksijensiz kalan balıklar ölür.
**b)** Gübrenin toprak analizine göre ve gerektiği kadar kullanılması; göl kıyısında tampon bitki şeritleri; organik tarım; atık suların arıtılması.`,
        olcut: [[15, "Ad, aşamalar ve iki çözüm"], [10, "Üç unsur"], [5, "Bir-iki unsur"], [0, "Yanlış ya da boş"]] },
      { tema: "u1", beceri: "Genetik mühendisliği uygulamaları", puan: 15,
        metin: r`Bir suç mahallinde bulunan saç kökünden **DNA parmak izi** çıkarılıyor.

**a)** DNA parmak izinin kişiye özgü olmasının nedenini açıklayınız.
**b)** Bu yöntemin adli olaylar dışında bir kullanım alanını yazınız.
**c)** Gen tedavisini kısaca açıklayınız.`,
        cevap: r`**a)** Tek yumurta ikizleri dışında her bireyin DNA'sındaki tekrarlayan bölgelerin (kısa ardışık tekrarlar) sayısı ve uzunluğu farklıdır; bu bölgeler kesilip elektroforezle ayrıldığında kişiye özgü bant deseni oluşur.
**b)** Babalık/akrabalık tespiti; afetlerde kimlik belirleme; nesli tükenen türlerin ve gıdaların (sahtecilik) tespiti.
**c)** Hastalığa yol açan kusurlu genin yerine sağlıklı bir kopyanın (genellikle virüs vektörleriyle) hücrelere aktarılarak tedavi edilmesi.`,
        olcut: [[15, "Üç bölüm doğru"], [10, "İki bölüm doğru"], [5, "Bir bölüm doğru"], [0, "Yanlış ya da boş"]] }
    ] }
  ] };
})();
