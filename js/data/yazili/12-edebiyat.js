/* 12. Sınıf Türk Dili ve Edebiyatı — açık uçlu yazılı sınavları (örnek; 2018 programı, Maarif sınav biçimi). */
(function () {
  const r = String.raw; App.data.yazili = App.data.yazili || {};
  App.data.yazili["12/edebiyat"] = { exams: [
    { id: "d1", term: 1, title: "1. Dönem Yazılı", sure: 40, sorular: [
      { tema: "u1", beceri: "Edebiyat ve düşünce", puan: 14,
        metin: r`Edebiyat ile felsefe ve psikoloji arasındaki ilişkiyi birer örnekle açıklayınız. Varoluşçuluk akımının edebiyattaki iki yansımasını yazınız.`,
        cevap: r`Felsefe: Edebî eserler insanın varlık, ahlak, özgürlük gibi felsefi sorularını kurmaca yoluyla işler (ör. Tanpınar'ın Bergson'dan etkilenen zaman anlayışı). Psikoloji: Karakterlerin iç dünyası, bilinç akışı, rüya ve bilinçaltı, psikolojik romanlar (ör. Peyami Safa'nın *Dokuzuncu Hariciye Koğuşu*).

Varoluşçuluk: bireyin yalnızlığı, bunaltı (kaygı), anlam arayışı ve seçim özgürlüğünün işlenmesi; kahramanın toplum içinde yabancılaşması (ör. 1950 sonrası bunalım edebiyatı, Yusuf Atılgan, Ferit Edgü).`,
        olcut: [[14, "İki ilişki örnekli ve iki yansıma"], [9, "Üç unsur"], [4, "Bir-iki unsur"], [0, "Yanlış ya da boş"]] },
      { tema: "u2", beceri: "Cumhuriyet dönemi hikâyesi", puan: 14,
        metin: r`Cumhuriyet döneminde hikâye; toplumcu gerçekçi, millî-dinî duyarlılıklı ve modernist anlayışlarla gelişmiştir.

**a)** Toplumcu gerçekçi hikâyenin iki özelliğini yazınız ve bir temsilcisini veriniz.
**b)** 1950 sonrası modernist hikâyede anlatım ve konu bakımından görülen iki yeniliği açıklayınız.`,
        cevap: r`**a)** Toplumsal sorunlar (köy, işçi, yoksulluk, toprak ağalığı) gerçekçi bir dille anlatılır; ezen-ezilen çatışması, sınıf bilinci; sade ve yerel dil. Temsilciler: Sabahattin Ali, Sait Faik (kısmen), Orhan Kemal, Kemal Tahir, Yaşar Kemal, Fakir Baykurt.
**b)** Bireyin iç dünyası, yalnızlık ve yabancılaşma öne çıkar; bilinç akışı, iç monolog, zaman kırılmaları gibi modern teknikler kullanılır; olay örgüsü geri plana düşer; dil ve biçimde deneysellik.`,
        olcut: [[14, "İki bölüm doğru"], [9, "Biri tam"], [4, "Bir doğru unsur"], [0, "Yanlış ya da boş"]] },
      { tema: "u3", beceri: "Şiir akımları", puan: 14,
        metin: r`Cumhuriyet döneminde (1923–1960) **Beş Hececiler**, **Garip** ve **Toplumcu gerçekçi** şiir anlayışları görülür.

Her birinin şiir anlayışını iki özellikle açıklayınız ve birer temsilci şair yazınız.`,
        cevap: r`- **Beş Hececiler:** Hece ölçüsünü benimsediler; sade Türkçe, yurt ve memleket sevgisi, Anadolu güzellemeleri. Faruk Nafiz Çamlıbel, Enis Behiç Koryürek, Halit Fahri Ozansoy, Orhan Seyfi Orhon, Yusuf Ziya Ortaç.
- **Garip (Birinci Yeni):** Ölçü, kafiye ve söz sanatlarını reddettiler; sıradan insanı ve günlük hayatı konuşma diliyle, ironiyle anlattılar. Orhan Veli Kanık, Melih Cevdet Anday, Oktay Rifat.
- **Toplumcu gerçekçi:** Şiiri toplumsal değişimin aracı olarak gördüler; emekçi, ezilen halk, sınıf çatışması; serbest ölçü. Nâzım Hikmet, Rıfat Ilgaz, Enver Gökçe.`,
        olcut: [[14, "Üç anlayış ve temsilciler"], [9, "İki anlayış tam"], [4, "Bir anlayış"], [0, "Yanlış ya da boş"]] },
      { tema: "u3", beceri: "İkinci Yeni", puan: 14,
        metin: r`İkinci Yeni şiiri, Garip akımına tepki olarak doğmuştur.

**a)** İkinci Yeni'nin Garip'e hangi noktalarda tepki gösterdiğini iki maddeyle açıklayınız.
**b)** İkinci Yeni şiirinin dil ve imge kullanımındaki belirgin özelliğini yazınız; iki temsilcisini veriniz.`,
        cevap: r`**a)** Garip'in sade, herkesin anlayabileceği, konuşma dili ve gündelik konulara dayalı şiirine karşı çıkarak şiiri yeniden "sanatlı", kapalı ve imge yüklü hâle getirdiler; halka seslenmeyi değil bireyin iç dünyasını ve bilinçaltını öne çıkardılar.
**b)** Anlamı kapalı, soyut ve çağrışıma dayalı imgeler; dilin alışılmış anlam ilişkilerini bozan, şaşırtıcı söz dizimi ve yeni kelime birleşimleri. Temsilciler: Cemal Süreya, Edip Cansever, Turgut Uyar, İlhan Berk, Ece Ayhan, Sezai Karakoç.`,
        olcut: [[14, "İki tepki, dil özelliği ve temsilciler"], [9, "Üç unsur"], [4, "Bir-iki unsur"], [0, "Yanlış ya da boş"]] },
      { tema: "u3", beceri: "Cumhuriyet dönemi halk şiiri", puan: 14,
        metin: r`Âşık Veysel, Cumhuriyet döneminde âşık geleneğini sürdüren önemli bir isimdir.

**a)** Cumhuriyet dönemi halk şiirinde geleneğin sürdürülen iki özelliğini yazınız.
**b)** Bu dönemde âşıkların şiirlerinde görülen yeni iki konu ya da etkiyi açıklayınız.`,
        cevap: r`**a)** Hece ölçüsü ve dörtlük nazım birimi; saz eşliğinde sözlü icra; son dörtlükte mahlas kullanımı; koşma, semai, destan gibi nazım biçimleri.
**b)** Cumhuriyet ve Atatürk sevgisi, yurt ve kalkınma konuları; köy enstitüleri ve okumanın önemi; radyo ve plak yoluyla geniş kitlelere ulaşma; toplumsal sorunlara değinme.`,
        olcut: [[14, "İki bölüm doğru"], [9, "Biri tam"], [4, "Bir doğru unsur"], [0, "Yanlış ya da boş"]] },
      { tema: "u2", beceri: "Yazma: küçürek hikâye", puan: 15,
        metin: r`"Son otobüs" başlıklı, **en fazla 120 kelimelik** bir küçürek hikâye yazınız. Hikâyenizde en az bir kişi, bir mekân ve okuru düşündüren açık uçlu bir son bulunsun.`,
        cevap: r`Öğrencinin özgün metni. Değerlendirme: küçürek hikâye özelliklerine uygunluk (kısalık, yoğunluk), kişi ve mekân, açık uçlu son, anlatım tutarlılığı, yazım ve noktalama.`,
        olcut: [[15, "Tüm ölçütler, en fazla 2 yazım hatası"], [10, "Bir ölçüt eksik ya da 3-5 hata"], [5, "Metin var, birden çok ölçüt eksik"], [0, "Yazılmamış ya da konu dışı"]] },
      { tema: "u1", beceri: "Dil ve sözlük kullanımı", puan: 15,
        metin: r`"Muhtelif", "teşebbüs" ve "müstakil" kelimeleri günümüzde yerine Türkçe karşılıkları önerilen kelimelerdendir.

**a)** Bu kelimelerin Türkçe karşılıklarını yazınız.
**b)** Bir yazı yazarken Türk Dil Kurumu sözlüklerinden (Güncel Türkçe Sözlük, Yazım Kılavuzu) nasıl yararlanırsınız? İki örnek veriniz.`,
        cevap: r`**a)** Muhtelif: çeşitli; teşebbüs: girişim; müstakil: bağımsız, ayrı.
**b)** Bir kelimenin anlamını ve kullanımını Güncel Türkçe Sözlük'ten kontrol etmek; ayrı-bitişik yazımı ve büyük harf kullanımını Yazım Kılavuzu'ndan doğrulamak (ör. "her şey" ayrı yazılır); yabancı kelimelere Türkçe karşılık bulmak (Karşılıklar Kılavuzu).`,
        olcut: [[15, "Üç karşılık ve iki kullanım örneği"], [10, "Üç unsur"], [5, "Bir-iki unsur"], [0, "Yanlış ya da boş"]] }
    ] },
    { id: "d2", term: 2, title: "2. Dönem Yazılı", sure: 40, sorular: [
      { tema: "u4", beceri: "Roman karşılaştırma", puan: 14,
        metin: r`Cumhuriyet dönemi Türk romanında **köy romanı** ve **bireyin iç dünyasını esas alan roman** iki önemli eğilimdir.

Her iki eğilimi konu, kişi ve anlatım teknikleri bakımından karşılaştırınız; her birine bir yazar ve eser örneği veriniz.`,
        cevap: r`- **Köy romanı:** Köy hayatı, toprak, ağalık, yoksulluk; köylü kişiler ve toplumsal tipler; gerçekçi, gözlemci anlatım ve yöresel dil. Örnek: Yaşar Kemal – *İnce Memed*, Fakir Baykurt – *Yılanların Öcü*, Kemal Tahir – *Rahmet Yolları Kesti*.
- **Bireyin iç dünyası (modernist/psikolojik roman):** Yalnızlık, kimlik, bunalım; iç dünyası derin bireyler; bilinç akışı, iç monolog, zaman kırılmaları. Örnek: Tanpınar – *Huzur*, Yusuf Atılgan – *Anayurt Oteli*, Oğuz Atay – *Tutunamayanlar*.`,
        olcut: [[14, "Üç ölçütte karşılaştırma ve iki örnek"], [9, "İki ölçüt ve örnekler"], [4, "Bir-iki unsur"], [0, "Yanlış ya da boş"]] },
      { tema: "u4", beceri: "Anlatım teknikleri", puan: 14,
        metin: r`> Kapı çaldı. Annem mi? Hayır, o bu saatte gelmez. Yağmur… sokak lambası… annemin pazar günleri yaptığı ıhlamurun kokusu, mutfaktaki o eski radyo… Kapı yeniden çaldı.

**a)** Bu parçada kullanılan anlatım tekniğini yazınız ve metinden iki kanıt gösteriniz.
**b)** Bu tekniğin okura kazandırdığı etkiyi açıklayınız.`,
        cevap: r`**a)** Bilinç akışı (iç monolog da kabul edilir). Kanıtlar: düşüncelerin mantıksal bir düzen olmadan, çağrışımlarla akması ("Yağmur… sokak lambası… ıhlamurun kokusu"); kesik cümleler ve üç nokta; şimdiki an ile anıların iç içe geçmesi.
**b)** Okur karakterin zihnine doğrudan girer; düşünce ve duyguların karmaşıklığını, zihnin işleyişini anlatıcı aracılığı olmadan yaşar.`,
        olcut: [[14, "Teknik, iki kanıt ve etki"], [9, "Teknik ve bir kanıt ya da etki"], [4, "Yalnız teknik"], [0, "Yanlış ya da boş"]] },
      { tema: "u5", beceri: "Tiyatro akımları", puan: 14,
        metin: r`1950 sonrası Türk tiyatrosunda **epik tiyatro** ve **absürt tiyatro** etkileri görülür.

**a)** Epik tiyatronun amacını ve bir tekniğini açıklayınız.
**b)** Absürt tiyatronun iki özelliğini yazınız.
**c)** Geleneksel tiyatrodan (orta oyunu, meddah) yararlanan bir Türk oyun yazarını yazınız.`,
        cevap: r`**a)** Brecht'in geliştirdiği epik tiyatro, seyircinin olaylara duygusal olarak kapılmasını değil, eleştirel düşünmesini amaçlar. Teknik: yabancılaştırma efekti (oyuncunun seyirciye doğrudan seslenmesi, şarkılar, anlatıcı, sahne değişimlerinin açıkça yapılması).
**b)** Olay örgüsü ve mantıksal bağlantı zayıftır; dilin iletişim aracı olarak yetersizliği; insanın anlamsız bir dünyadaki çaresizliği; tekrarlar ve döngüsel yapı.
**c)** Haldun Taner (*Keşanlı Ali Destanı*), Turgut Özakman, Güngör Dilmen, Melih Cevdet Anday.`,
        olcut: [[14, "Üç bölüm doğru"], [9, "İki bölüm doğru"], [4, "Bir bölüm doğru"], [0, "Yanlış ya da boş"]] },
      { tema: "u6", beceri: "Deneme türü", puan: 14,
        metin: r`Denemenin dünya edebiyatındaki öncüsü Montaigne'dir; Türk edebiyatında Nurullah Ataç ve Suut Kemal Yetkin önemli denemecilerdir.

**a)** Denemenin makaleden iki farkını yazınız.
**b)** Nurullah Ataç'ın denemeciliğinin ve dile katkısının bir özelliğini açıklayınız.`,
        cevap: r`**a)** Deneme kişisel görüşleri kanıtlama amacı gütmeden, samimi ve konuşur gibi bir üslupla anlatır; makale bir düşünceyi kanıtlamak için bilgi, belge ve kanıt kullanır, nesneldir. Deneme öznel, makale daha nesneldir.
**b)** Ataç, deneme türünü Türk edebiyatında yerleştiren yazarlardandır; öz Türkçecilik akımının öncüsüdür, yabancı kelimeler yerine yeni Türkçe kelimeler önermiş ve kullanmıştır; eleştirel, kışkırtıcı ve kısa cümleli bir üslubu vardır.`,
        olcut: [[14, "İki fark ve Ataç özelliği"], [9, "Üç unsurdan ikisi"], [4, "Bir unsur"], [0, "Yanlış ya da boş"]] },
      { tema: "u7", beceri: "Söylev çözümleme", puan: 14,
        metin: r`Atatürk'ün *Gençliğe Hitabe*'sinden:

> "Ey Türk gençliği! Birinci vazifen, Türk istiklalini, Türk Cumhuriyeti'ni, ilelebet muhafaza ve müdafaa etmektir."

**a)** Bu metnin söylev türünün hangi özelliklerini taşıdığını iki maddeyle açıklayınız.
**b)** Söylevde hitabın ("Ey Türk gençliği!") işlevi nedir?`,
        cevap: r`**a)** Bir topluluğa seslenir ve onları belirli bir düşünce/eyleme yönlendirmeyi amaçlar; coşkulu, etkileyici ve kesin bir dil kullanılır; kısa, akılda kalıcı yargılar ve tekrarlar vardır; söyleyenin inandırıcılığına dayanır.
**b)** Doğrudan hitap dinleyicinin dikkatini çeker, ona sorumluluk yükler ve söyleyenle dinleyici arasında bağ kurar; mesajın kime yöneldiğini açıkça belirtir.`,
        olcut: [[14, "İki özellik ve hitabın işlevi"], [9, "Üç unsurdan ikisi"], [4, "Bir unsur"], [0, "Yanlış ya da boş"]] },
      { tema: "u7", beceri: "Söylev geleneği", puan: 15,
        metin: r`Türk edebiyatında söylevin ilk örnekleri Orhun Abideleri'nde görülür; Cumhuriyet döneminde Atatürk'ün *Nutuk*'u önemli bir eserdir.

*Nutuk*'u türü (söylev, anı, tarih) bakımından değerlendiriniz; hangi dönemi anlattığını ve önemini iki maddeyle yazınız.`,
        cevap: r`*Nutuk*, Atatürk'ün 1927'de CHP kurultayında altı gün boyunca okuduğu uzun bir söylevdir; aynı zamanda belgelere dayanan bir tarih ve anı niteliği taşır.

Dönem: 19 Mayıs 1919'da Samsun'a çıkıştan 1927'ye kadar Millî Mücadele ve Cumhuriyet'in kuruluş süreci.
Önem: Millî Mücadele'nin birinci elden ve belgelere dayalı anlatımıdır; Cumhuriyet'in kuruluş gerekçelerini ve ilkelerini açıklar; sonunda *Gençliğe Hitabe* yer alır.`,
        olcut: [[15, "Tür değerlendirmesi, dönem ve iki önem"], [10, "Üç unsur"], [5, "Bir-iki unsur"], [0, "Yanlış ya da boş"]] },
      { tema: "u5", beceri: "Yazma: sahne", puan: 15,
        metin: r`Okulunuzdaki bir kantin kuyruğunda geçen, **iki kişilik**, en az 8 replikten oluşan kısa bir tiyatro sahnesi yazınız. Sahnede bir çatışma ve parantez içinde en az iki sahne yönergesi (oyuncu hareketi, ışık vb.) bulunsun.`,
        cevap: r`Öğrencinin özgün metni. Değerlendirme: tiyatro metni biçimi (kişi adı + replik), çatışmanın varlığı ve çözümü/sonu, sahne yönergeleri, karakterlerin konuşma dilinin uygunluğu, yazım ve noktalama.`,
        olcut: [[15, "Tüm ölçütler karşılanmış"], [10, "Bir ölçüt eksik"], [5, "Birden çok ölçüt eksik"], [0, "Yazılmamış"]] }
    ] }
  ] };
})();
