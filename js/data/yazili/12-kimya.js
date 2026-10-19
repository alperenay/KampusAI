/* 12. Sınıf Kimya — açık uçlu yazılı sınavları (örnek; 2018 programı, Maarif sınav biçimi). */
(function () {
  const r = String.raw; App.data.yazili = App.data.yazili || {};
  App.data.yazili["12/kimya"] = { exams: [
    { id: "d1", term: 1, title: "1. Dönem Yazılı", sure: 40, sorular: [
      { tema: "u1", beceri: "Redoks", puan: 14,
        metin: r`$\text{Zn} + \text{Cu}^{2+} \rightarrow \text{Zn}^{2+} + \text{Cu}$ tepkimesi veriliyor.

**a)** Yükseltgenen ve indirgenen türleri belirleyiniz.
**b)** Yükseltgen ve indirgen maddeyi yazınız.
**c)** Bu tepkimenin kendiliğinden gerçekleştiği bir gözlem önerisi yazınız.`,
        cevap: r`**a)** Zn yükseltgenir (0 → +2, elektron verir); Cu²⁺ indirgenir (+2 → 0, elektron alır).
**b)** Yükseltgen: Cu²⁺; indirgen: Zn.
**c)** Mavi bakır sülfat çözeltisine çinko levha daldırılınca levhanın üzeri kırmızımsı bakırla kaplanır ve çözeltinin mavi rengi zamanla açılır.`,
        olcut: [[14, "Üç bölüm doğru"], [9, "İki bölüm doğru"], [4, "Bir bölüm doğru"], [0, "Yanlış ya da boş"]] },
      { tema: "u1", beceri: "Pil", puan: 14,
        metin: r`Zn–Cu pilinde: $E°(\text{Zn}^{2+}/\text{Zn}) = -0{,}76$ V, $E°(\text{Cu}^{2+}/\text{Cu}) = +0{,}34$ V.

**a)** Anot ve katodu belirleyip pilin standart potansiyelini hesaplayınız.
**b)** Tuz köprüsünün görevini açıklayınız.
**c)** Elektronların dış devredeki akış yönünü yazınız.`,
        cevap: r`**a)** Anot (yükseltgenme): Zn; katot (indirgenme): Cu. $E°_{pil} = 0{,}34 - (-0{,}76) = 1{,}10$ V.
**b)** İyon akışıyla iki yarı hücrede elektriksel nötrlüğü sağlar, devreyi tamamlar.
**c)** Dış devrede elektronlar Zn (anot) → Cu (katot) yönünde akar.`,
        olcut: [[14, "Üç bölüm doğru"], [9, "İki bölüm doğru"], [4, "Bir bölüm doğru"], [0, "Yanlış ya da boş"]] },
      { tema: "u1", beceri: "Elektroliz ve Faraday", puan: 14,
        metin: r`Bir metal eşya gümüşle kaplanmak isteniyor; $\text{AgNO}_3$ çözeltisinden 2 A akım 965 saniye geçiriliyor. ($F = 96\,500$ C/mol, Ag = 108 g/mol)

**a)** Eşya hangi elektroda bağlanmalıdır? Neden?
**b)** Kaç gram gümüş kaplanır?`,
        cevap: r`**a)** Katoda; katotta indirgenme olur: $\text{Ag}^+ + e^- \rightarrow \text{Ag}$, gümüş eşyanın üzerinde birikir.
**b)** $Q = I t = 2 \cdot 965 = 1930$ C ⇒ $n_{e^-} = 1930/96\,500 = 0{,}02$ mol ⇒ 0,02 mol Ag ⇒ $0{,}02 \cdot 108 = 2{,}16$ g.`,
        olcut: [[14, "Katot gerekçeli ve 2,16 g"], [9, "Biri tam"], [4, "Bir doğru unsur"], [0, "Yanlış ya da boş"]] },
      { tema: "u1", beceri: "Korozyon", puan: 14,
        metin: r`Gemilerin çelik gövdelerine çinko ya da magnezyum bloklar bağlanır.

**a)** Bu yöntemin adını ve korozyonu nasıl önlediğini açıklayınız.
**b)** Korozyonu önlemek için başka iki yöntem yazınız.`,
        cevap: r`**a)** Katodik koruma (kurban anot). Çinko/magnezyum demirden daha aktiftir (yükseltgenme eğilimi fazla); demir yerine kendisi yükseltgenip aşınır, demir korunur. Bloklar zamanla değiştirilir.
**b)** Boyama, yağlama, plastik kaplama; galvanizleme (çinko kaplama); kalaylama; paslanmaz çelik gibi alaşımlar kullanma; nemden uzak tutma.`,
        olcut: [[14, "Ad, mekanizma ve iki yöntem"], [9, "Üç unsur"], [4, "Bir-iki unsur"], [0, "Yanlış ya da boş"]] },
      { tema: "u2", beceri: "Hibritleşme", puan: 14,
        metin: r`Etan ($\text{C}_2\text{H}_6$), eten ($\text{C}_2\text{H}_4$) ve etin ($\text{C}_2\text{H}_2$) molekülleri veriliyor.

Her birinde karbonun hibritleşme türünü, bağ açısını ve molekül geometrisini yazınız. C–C bağ uzunluklarını sıralayınız.`,
        cevap: r`- Etan: sp³, 109,5°, düzgün dörtyüzlü (her C etrafında).
- Eten: sp², 120°, düzlem üçgen (molekül düzlemsel).
- Etin: sp, 180°, doğrusal.

C–C bağ uzunluğu: etan (tekli) > eten (ikili) > etin (üçlü).`,
        olcut: [[14, "Üç molekül ve sıralama doğru"], [9, "Bir hata"], [4, "Yarısı doğru"], [0, "Yanlış ya da boş"]] },
      { tema: "u2", beceri: "Organik bileşikler", puan: 15,
        metin: r`Organik ve anorganik bileşikleri **dört** özellik bakımından karşılaştırınız. Karbon atomunun çok sayıda bileşik oluşturabilmesinin nedenini açıklayınız.`,
        cevap: r`| | Organik | Anorganik |
|---|---|---|
| Temel element | C (H, O, N…) | Çeşitli |
| Bağ türü | Çoğunlukla kovalent | İyonik ve kovalent |
| Erime/kaynama | Genellikle düşük | Genellikle yüksek |
| Suda çözünme | Çoğu az çözünür | Çoğu iyi çözünür |
| Yanıcılık | Genellikle yanıcı | Genellikle yanmaz |

Karbon 4 bağ yapabilir; kendi atomlarıyla uzun zincirler, dallanmış ve halkalı yapılar, tekli-ikili-üçlü bağlar oluşturabilir (katenasyon); bu yüzden milyonlarca bileşik oluşur.`,
        olcut: [[15, "Dört karşılaştırma ve neden"], [10, "Üç karşılaştırma ve neden"], [5, "Bir-iki unsur"], [0, "Yanlış ya da boş"]] },
      { tema: "u1", beceri: "Pil teknolojisi", puan: 15,
        metin: r`Telefonlarda lityum iyon piller kullanılır.

**a)** Lityumun pil yapımında tercih edilmesinin iki nedenini yazınız.
**b)** Şarj edilebilir pilde şarj ve deşarj sırasında enerji dönüşümlerini açıklayınız.
**c)** Atık pillerin neden özel olarak toplanması gerektiğini yazınız.`,
        cevap: r`**a)** Lityum en hafif metaldir (yüksek enerji yoğunluğu); standart indirgenme potansiyeli çok negatiftir (yüksek gerilim); iyonları küçük olduğu için elektrotlar arasında kolay hareket eder.
**b)** Deşarj: kimyasal enerji → elektrik enerjisi (galvanik hücre). Şarj: dışarıdan verilen elektrik enerjisi tepkimeyi ters çevirir, elektrik enerjisi → kimyasal enerji (elektrolitik hücre).
**c)** Ağır metaller ve yanıcı/zehirli elektrolitler toprağa ve suya karışabilir; lityum, kobalt gibi değerli metaller geri kazanılabilir; yangın riski vardır.`,
        olcut: [[15, "Üç bölüm doğru"], [10, "İki bölüm doğru"], [5, "Bir bölüm doğru"], [0, "Yanlış ya da boş"]] }
    ] },
    { id: "d2", term: 2, title: "2. Dönem Yazılı", sure: 40, sorular: [
      { tema: "u3", beceri: "IUPAC adlandırma", puan: 14,
        metin: r`Aşağıdaki bileşikleri IUPAC kurallarına göre adlandırınız ya da formülünü yazınız:

**a)** $\text{CH}_3\text{–CH(CH}_3\text{)–CH}_2\text{–CH}_3$
**b)** $\text{CH}_2\text{=CH–CH}_3$
**c)** 2-bütin
**d)** Kullandığınız adlandırma kurallarından ikisini yazınız.`,
        cevap: r`**a)** 2-metilbütan.
**b)** Propen.
**c)** $\text{CH}_3\text{–C≡C–CH}_3$.
**d)** En uzun karbon zinciri ana zincir seçilir; numaralandırma dallanmaya/çoklu bağa en yakın uçtan başlar; dallar alfabetik sırayla ve numarasıyla yazılır; çoklu bağ için -en/-in eki kullanılır.`,
        olcut: [[14, "Dört bölüm doğru"], [9, "Üç bölüm doğru"], [4, "İki bölüm doğru"], [0, "Yanlış ya da boş"]] },
      { tema: "u3", beceri: "Fonksiyonel gruplar", puan: 14,
        metin: r`Aşağıdaki maddelerin fonksiyonel gruplarını yazınız ve günlük hayattaki birer kullanımını belirtiniz:

**a)** Etanol **b)** Aseton (propanon) **c)** Asetik asit (etanoik asit) **d)** Etil asetat`,
        cevap: r`**a)** Alkol (–OH): dezenfektan, kolonya, yakıt.
**b)** Keton (C=O, iki karbon arasında): oje çıkarıcı, çözücü.
**c)** Karboksilik asit (–COOH): sirke, gıda koruyucu.
**d)** Ester (–COO–): yapay meyve aroması, oje çözücü, yapıştırıcı.`,
        olcut: [[14, "Dört grup ve kullanım"], [9, "Üç tam"], [4, "İki tam"], [0, "Yanlış ya da boş"]] },
      { tema: "u3", beceri: "İzomeri", puan: 14,
        metin: r`$\text{C}_2\text{H}_6\text{O}$ formülüne sahip iki farklı bileşik vardır.

**a)** Bu iki bileşiğin yapı formüllerini ve adlarını yazınız.
**b)** Kaynama noktalarını karşılaştırıp nedenini açıklayınız.`,
        cevap: r`**a)** Etanol $\text{CH}_3\text{CH}_2\text{OH}$ ve dimetil eter $\text{CH}_3\text{–O–CH}_3$ (yapı/fonksiyonel grup izomerleri).
**b)** Etanolün kaynama noktası (78 °C) dimetil eterinkinden (−24 °C) çok yüksektir; çünkü etanol molekülleri arasında –OH grubu sayesinde hidrojen bağı vardır, eterde yoktur.`,
        olcut: [[14, "İki yapı ve gerekçeli karşılaştırma"], [9, "Biri tam"], [4, "Bir doğru unsur"], [0, "Yanlış ya da boş"]] },
      { tema: "u3", beceri: "Tepkime türleri", puan: 14,
        metin: r`**a)** Etanolün yükseltgenmesiyle sırasıyla hangi bileşikler oluşur?
**b)** Asetik asit ile etanolün tepkimesinin adını ve ürünlerini yazınız.
**c)** Şarabın açık havada bekleyince ekşimesini açıklayınız.`,
        cevap: r`**a)** Etanol → etanal (asetaldehit) → etanoik asit (asetik asit).
**b)** Esterleşme: asetik asit + etanol ⇌ etil asetat + su (asit katalizörlüğünde).
**c)** Havadaki oksijen ve bakteriler etanolü asetik aside yükseltger; sirke oluşur, tat ekşir.`,
        olcut: [[14, "Üç bölüm doğru"], [9, "İki bölüm doğru"], [4, "Bir bölüm doğru"], [0, "Yanlış ya da boş"]] },
      { tema: "u4", beceri: "Enerji kaynakları", puan: 14,
        metin: r`Fosil yakıtlar hâlâ dünya enerji tüketiminin büyük bölümünü karşılamaktadır.

**a)** Fosil yakıtların oluşumunu kısaca açıklayınız.
**b)** Çevreye iki olumsuz etkisini yazınız.
**c)** Biyodizel ve hidrojenin alternatif yakıt olarak birer üstünlüğünü belirtiniz.`,
        cevap: r`**a)** Milyonlarca yıl önce yaşamış bitki ve deniz canlılarının kalıntıları, toprak altında yüksek basınç ve sıcaklıkta oksijensiz ortamda dönüşerek kömür, petrol ve doğal gazı oluşturmuştur.
**b)** CO₂ salımı ve küresel ısınma; SO₂ ve NOx ile asit yağmurları; hava kirliliği; petrol sızıntıları.
**c)** Biyodizel: yenilenebilir, bitkisel yağlardan üretilir, karbon döngüsü açısından daha dengelidir. Hidrojen: yanma ürünü yalnızca sudur.`,
        olcut: [[14, "Üç bölüm doğru"], [9, "İki bölüm doğru"], [4, "Bir bölüm doğru"], [0, "Yanlış ya da boş"]] },
      { tema: "u4", beceri: "Bilimsel gelişmeler", puan: 15,
        metin: r`Grafen, tek atom kalınlığında karbon tabakasıdır ve "mucize malzeme" olarak anılır.

**a)** Grafenin üç olağanüstü özelliğini yazınız.
**b)** Nanoteknolojinin tıpta ya da enerjide bir uygulamasını açıklayınız.`,
        cevap: r`**a)** Çok yüksek mekanik dayanım (çelikten çok daha güçlü), çok iyi elektrik ve ısı iletkenliği, neredeyse saydam olması, esneklik, çok hafif olması.
**b)** Tıp: ilacı yalnızca hastalıklı hücreye taşıyan nanotaşıyıcılar (hedefli ilaç), nano boyutlu biyosensörler. Enerji: daha verimli güneş hücreleri, daha hızlı şarj olan pil elektrotları.`,
        olcut: [[15, "Üç özellik ve uygulama"], [10, "İki özellik ve uygulama"], [5, "Bir-iki unsur"], [0, "Yanlış ya da boş"]] },
      { tema: "u4", beceri: "Sürdürülebilirlik", puan: 15,
        metin: r`Bir şehir belediyesi çöplükte oluşan **metan gazını** toplayıp elektrik üretmeye başlıyor.

**a)** Metanın çöplükte nasıl oluştuğunu açıklayınız.
**b)** Bu uygulamanın iki çevresel yararını yazınız.
**c)** Metanın yanma tepkimesini denkleştirerek yazınız.`,
        cevap: r`**a)** Organik atıklar oksijensiz ortamda bakteriler tarafından ayrıştırılır (anaerobik ayrışma); metan ve CO₂ içeren biyogaz oluşur.
**b)** Metan CO₂'den çok daha güçlü bir sera gazıdır; havaya salınması önlenir; fosil yakıt yerine yenilenebilir enerji üretilir; patlama ve koku riski azalır.
**c)** $\text{CH}_4 + 2\text{O}_2 \rightarrow \text{CO}_2 + 2\text{H}_2\text{O}$.`,
        olcut: [[15, "Üç bölüm doğru"], [10, "İki bölüm doğru"], [5, "Bir bölüm doğru"], [0, "Yanlış ya da boş"]] }
    ] }
  ] };
})();
