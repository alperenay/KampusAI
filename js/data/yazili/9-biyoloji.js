/* 9. Sınıf Biyoloji — Maarif Modeli açık uçlu yazılı sınavları (örnek). Temalar: u1 Yaşam, u2 Organizasyon */
(function () {
  const r = String.raw; App.data.yazili = App.data.yazili || {};
  App.data.yazili["9/biyoloji"] = { exams: [
    { id: "d1", term: 1, title: "1. Dönem Ortak Yazılı", sure: 40, sorular: [
      { tema: "u1", beceri: "Bilimsel yöntem", puan: 14,
        metin: r`Bir öğrenci "Bitkiler daha çok ışık alınca daha hızlı büyür." diye düşünüyor.

**a)** Bu düşünceyi sınanabilir bir hipotez olarak yazınız.
**b)** Deneyde bağımsız, bağımlı ve kontrol değişkenlerini belirleyiniz.
**c)** Neden bir kontrol grubu kullanılmalıdır?`,
        cevap: r`**a)** "Günlük aldığı ışık süresi arttıkça fasulye fidelerinin iki haftadaki boy uzaması artar."
**b)** Bağımsız: ışık süresi/şiddeti. Bağımlı: boy uzaması. Kontrol: bitki türü, toprak, su miktarı, sıcaklık, saksı.
**c)** Sonucun yalnızca ışıktan kaynaklandığını gösterebilmek için karşılaştırma yapılacak bir referans gerekir.`,
        olcut: [[14, "Sınanabilir hipotez, üç değişken ve kontrol grubunun amacı"], [9, "İki bölüm doğru"], [4, "Bir bölüm doğru"], [0, "Yanlış ya da boş"]] },
      { tema: "u1", beceri: "Etik değerlendirme", puan: 14,
        metin: r`Bir araştırmacı yeni bir ilacın etkisini gösterdiğini iddia ediyor; ancak sonuçları beğenmediği deneklerin verilerini çalışmadan çıkardığı ortaya çıkıyor.

**a)** Bu davranış hangi bilim etiği ilkesini ihlal eder?
**b)** Bu ihlalin topluma olası zararını açıklayınız.`,
        cevap: r`**a)** Dürüstlük/nesnellik ilkesi: veri seçme ve sonuçları çarpıtma (verileri manipüle etme) etik dışıdır.
**b)** Etkisiz ya da zararlı bir ilaç kullanıma girebilir, hastalar zarar görebilir; bilime ve sağlık kurumlarına güven sarsılır.`,
        olcut: [[14, "İlke ve topluma zarar açıklanmış"], [9, "İkisinden biri tam, diğeri eksik"], [4, "Birisi doğru"], [0, "Yanlış ya da boş"]] },
      { tema: "u1", beceri: "Bilimsel çıkarım", puan: 14,
        metin: r`Yaz sıcağında uzun süre koşan bir sporcu kas krampları yaşıyor; antrenörü ona sadece su değil, mineral içeren içecek öneriyor.

**a)** Suyun canlılar için iki önemini yazınız.
**b)** Antrenörün önerisini minerallerin görevi ile açıklayınız.`,
        cevap: r`**a)** Çözücüdür, kimyasal tepkimelere ortam sağlar; vücut sıcaklığını düzenler (terleme); maddelerin taşınmasını sağlar.
**b)** Terle su ile birlikte sodyum, potasyum gibi mineraller de kaybedilir. Bu mineraller kasların kasılması ve sinir iletimi için gereklidir; eksikliği kramplara yol açar.`,
        olcut: [[14, "İki önem ve mineral-kas ilişkisi"], [9, "a tam, b eksik ya da tersi"], [4, "Bir önem doğru"], [0, "Yanlış ya da boş"]] },
      { tema: "u1", beceri: "Sınıflandırma", puan: 14,
        metin: r`Aşağıdaki maddeleri karbohidrat, lipit ya da protein olarak sınıflandırınız ve birer görevini yazınız:

nişasta, glikojen, selüloz, kolesterol, keratin, enzim`,
        cevap: r`| Madde | Grup | Görev |
|---|---|---|
| Nişasta | Karbohidrat | Bitkilerde depo besin |
| Glikojen | Karbohidrat | Hayvanlarda (karaciğer, kas) depo besin |
| Selüloz | Karbohidrat | Bitki hücre çeperinin yapısı |
| Kolesterol | Lipit | Hücre zarının yapısı, bazı hormonların öncüsü |
| Keratin | Protein | Saç, tırnak, deri yapısı |
| Enzim | Protein | Tepkimeleri hızlandırır (biyolojik katalizör) |`,
        olcut: [[14, "Altı madde grup ve görevle doğru (en fazla 1 hata)"], [9, "En fazla 3 hata"], [4, "Yarısı doğru"], [0, "Yanlış ya da boş"]] },
      { tema: "u1", beceri: "Deney analizi", puan: 14,
        metin: r`Katalaz enzimi hidrojen peroksiti su ve oksijene ayırır. Patates parçaları farklı sıcaklıklarda hidrojen peroksite konuyor; oluşan köpük yüksekliği ölçülüyor:

| Sıcaklık (°C) | 5 | 20 | 37 | 60 | 90 |
|---|---|---|---|---|---|
| Köpük (mm) | 8 | 20 | 34 | 10 | 0 |

**a)** Enzimin en iyi çalıştığı sıcaklık hangisidir?
**b)** 90 °C'de neden hiç köpük oluşmamıştır?`,
        cevap: r`**a)** 37 °C (optimum sıcaklık).
**b)** Yüksek sıcaklıkta enzimin protein yapısı bozulur (denatürasyon); aktif bölgenin şekli değiştiği için substrata bağlanamaz ve tepkime gerçekleşmez.`,
        olcut: [[14, "Optimum sıcaklık ve denatürasyon açıklaması"], [9, "a doğru, b'de denatürasyon adı yok ama mantık doğru"], [4, "Yalnız a doğru"], [0, "Yanlış ya da boş"]] },
      { tema: "u1", beceri: "Bilimsel çıkarım", puan: 15,
        metin: r`DNA ve RNA'yı yapı ve görev bakımından karşılaştırınız: şeker çeşidi, bazlar, zincir sayısı ve görev.

Ayrıca vitaminlerin enzimlerle ilişkisini bir örnekle açıklayınız.`,
        cevap: r`| | DNA | RNA |
|---|---|---|
| Şeker | Deoksiriboz | Riboz |
| Bazlar | A, T, G, C | A, U, G, C |
| Zincir | Çift | Tek |
| Görev | Kalıtsal bilgiyi saklar | Protein sentezinde görev alır |

Bazı vitaminler (özellikle B grubu) enzimlerin yardımcı molekülü (koenzim) olarak çalışır; eksikliğinde ilgili enzim çalışamaz. Örnek: B₁ vitamini karbohidrat metabolizmasındaki enzimlerle birlikte çalışır.`,
        olcut: [[15, "Dört karşılaştırma ve koenzim ilişkisi"], [10, "Karşılaştırma tam, vitamin eksik"], [5, "İki karşılaştırma doğru"], [0, "Yanlış ya da boş"]] },
      { tema: "u1", beceri: "Gözlem ve sınıflandırma", puan: 15,
        metin: r`Bir öğrenci okul bahçesinde bir mantar, bir yosun ve bir böcek gözlemliyor.

**a)** Bu üç canlının ortak özelliklerinden üçünü yazınız.
**b)** Bir taşın canlı olmadığını hangi özellikleri göstererek kanıtlarsınız? İki tane yazınız.`,
        cevap: r`**a)** Hücreden oluşurlar; beslenir ve enerji üretirler (metabolizma); üreyip büyürler; uyarılara tepki verirler; DNA taşırlar.
**b)** Taş hücreden oluşmaz; metabolizması yoktur (madde alıp enerji üretmez); üreyemez; uyarılara tepki vermez.`,
        olcut: [[15, "Üç ortak özellik ve iki kanıt"], [10, "Dört doğru unsur"], [5, "İki doğru unsur"], [0, "Yanlış ya da boş"]] }
    ] },
    { id: "d2", term: 2, title: "2. Dönem Ortak Yazılı", sure: 40, sorular: [
      { tema: "u2", beceri: "Yapı-işlev ilişkisi", puan: 14,
        metin: r`Kas hücrelerinde mitokondri sayısı, yağ depolayan hücrelere göre çok fazladır.

**a)** Bunun nedenini mitokondrinin göreviyle açıklayınız.
**b)** Pankreasta sindirim enzimi üreten hücrelerde hangi iki organelin fazla olmasını beklersiniz? Neden?`,
        cevap: r`**a)** Mitokondri hücresel solunumla ATP üretir; kas hücreleri kasılmak için çok enerji harcar.
**b)** Ribozom ve granüllü endoplazmik retikulum (protein sentezi) ile Golgi cisimciği (paketleme ve salgılama). Enzimler protein yapılı salgılardır.`,
        olcut: [[14, "a ve b gerekçeli"], [9, "a doğru, b'de organeller doğru gerekçe eksik"], [4, "Bir bölüm doğru"], [0, "Yanlış ya da boş"]] },
      { tema: "u2", beceri: "Deney yorumlama", puan: 14,
        metin: r`Bir patates dilimi tuzlu suya, bir başkası saf suya konuyor. Bir saat sonra tuzlu sudaki dilim yumuşamış, saf sudaki dilim sertleşmiş.

**a)** Bu olayın adı nedir?
**b)** Her iki dilimde suyun hareket yönünü açıklayınız.
**c)** Kışın yollara tuz dökülmesi yol kenarındaki bitkileri nasıl etkiler?`,
        cevap: r`**a)** Osmoz (suyun yarı geçirgen zardan geçişi).
**b)** Tuzlu suda: su, hücrelerden dışarı çıkar (dış ortam hipertonik), hücreler büzülür, dilim yumuşar. Saf suda: su hücrelere girer (dış ortam hipotonik), hücreler turgor kazanır, dilim sertleşir.
**c)** Toprak suyu tuzlanır, kökler su alamaz, hatta su kaybeder; bitkiler kuruyabilir (fizyolojik kuraklık).`,
        olcut: [[14, "Üç bölüm doğru"], [9, "İki bölüm doğru"], [4, "Bir bölüm doğru"], [0, "Yanlış ya da boş"]] },
      { tema: "u2", beceri: "Karşılaştırma", puan: 14,
        metin: r`Hücre zarından madde geçişlerini karşılaştırınız: **difüzyon**, **aktif taşıma** ve **endositoz**. Her biri için enerji (ATP) harcanıp harcanmadığını ve bir örneğini yazınız.`,
        cevap: r`- **Difüzyon:** Çok yoğundan az yoğuna, ATP harcanmaz. Örnek: akciğerde oksijenin kana geçmesi.
- **Aktif taşıma:** Az yoğundan çok yoğuna, taşıyıcı protein ve ATP gerekir. Örnek: sodyum-potasyum pompası, kökte mineral alımı.
- **Endositoz:** Büyük moleküllerin zarın cep oluşturmasıyla alınması, ATP harcanır. Örnek: akyuvarın bakteriyi yutması (fagositoz).`,
        olcut: [[14, "Üç geçiş enerji ve örnekle"], [9, "İki geçiş tam"], [4, "Bir geçiş tam"], [0, "Yanlış ya da boş"]] },
      { tema: "u2", beceri: "Sınıflandırma kuralları", puan: 14,
        metin: r`Kurt: *Canis lupus*, köpek: *Canis familiaris*, tilki: *Vulpes vulpes*.

**a)** İkili adlandırmada iki kelime neyi gösterir? Yazım kuralı nedir?
**b)** Bu üç canlıdan hangi ikisi daha yakın akrabadır? Neden?`,
        cevap: r`**a)** İlk kelime cins (büyük harfle), ikinci kelime tür takısı (küçük harfle) adıdır; ikisi birlikte türü belirtir ve italik ya da altı çizili yazılır.
**b)** Kurt ve köpek; ikisi de *Canis* cinsindendir. Aynı cinsten olanlar farklı cinsten olanlardan daha fazla ortak özellik taşır.`,
        olcut: [[14, "a ve b gerekçeli"], [9, "Biri tam, diğeri eksik"], [4, "Biri doğru"], [0, "Yanlış ya da boş"]] },
      { tema: "u2", beceri: "Çıkarım yapma", puan: 14,
        metin: r`Bir canlı hakkında şu bilgiler veriliyor: hücrelerinde çekirdek yok, halkasal DNA'sı var, bazıları fotosentez yapıyor ve aşırı tuzlu göllerde yaşayabilenleri de var.

**a)** Bu canlı hangi üst âleme (domain) ait olabilir? Neden?
**b)** Ökaryotları prokaryotlardan ayıran iki özelliği yazınız.`,
        cevap: r`**a)** Prokaryottur: Bakteriler ya da Arkeler. Aşırı tuzlu ortamda yaşayabilmesi arkelere işaret eder; fotosentez yapan bazıları ise bakterilerdir (siyanobakteriler). Gerekçe: çekirdek ve zarlı organel yokluğu.
**b)** Çekirdek zarıyla çevrili çekirdek; mitokondri, endoplazmik retikulum gibi zarlı organeller; doğrusal DNA.`,
        olcut: [[14, "Prokaryot gerekçesi, uygun üst âlem ve iki ayırt edici özellik"], [9, "Prokaryot ve özellikler doğru, üst âlem yorumu eksik"], [4, "Bir bölüm doğru"], [0, "Yanlış ya da boş"]] },
      { tema: "u2", beceri: "Bilimsel çıkarım", puan: 15,
        metin: r`Türkiye, Avrupa kıtasının tamamına yakın sayıda bitki türüne ev sahipliği yapar ve endemik tür oranı yüksektir.

**a)** Türkiye'nin biyoçeşitliliğinin zengin olmasının iki nedenini yazınız.
**b)** Endemik tür nedir? Bir örnek veriniz.
**c)** Biyoçeşitliliği korumak için bir öğrencinin yapabileceği iki davranış yazınız.`,
        cevap: r`**a)** Üç fitocoğrafik bölgenin (Avrupa-Sibirya, Akdeniz, İran-Turan) kesişiminde olması; iklim ve yükselti çeşitliliği; buzul çağlarında sığınak olması.
**b)** Yalnızca belirli bir bölgede doğal olarak yaşayan tür. Örnek: Ankara keçisi, Van kedisi, Kazdağı göknarı, sığla ağacı.
**c)** Yaban hayatına ve bitkilere zarar vermemek, atıkları ayırmak, yerli fidan dikimine katılmak, su ve enerji tasarrufu, korunan alan kurallarına uymak.`,
        olcut: [[15, "Üç bölüm doğru"], [10, "İki bölüm doğru"], [5, "Bir bölüm doğru"], [0, "Yanlış ya da boş"]] },
      { tema: "u2", beceri: "Model kullanma", puan: 15,
        metin: r`Bitki hücresi ile hayvan hücresini karşılaştırınız: **hücre çeperi**, **kloroplast**, **merkezcik (sentrozom)** ve **koful** bakımından.

Bitki hücresinin hücre çeperi olmasaydı saf suya konduğunda ne olurdu?`,
        cevap: r`| | Bitki | Hayvan |
|---|---|---|
| Hücre çeperi | Var | Yok |
| Kloroplast | Var | Yok |
| Sentrozom | Genellikle yok | Var |
| Koful | Büyük, merkezi | Küçük, çok sayıda ya da yok |

Çeper olmasaydı hücre su alıp şişer ve patlayabilirdi (hayvan hücresinde olduğu gibi). Çeper, turgor basıncına karşı direnç gösterir.`,
        olcut: [[15, "Dört karşılaştırma ve çeperin işlevi"], [10, "Dört karşılaştırma doğru, soru eksik"], [5, "İki karşılaştırma doğru"], [0, "Yanlış ya da boş"]] }
    ] }
  ] };
})();
