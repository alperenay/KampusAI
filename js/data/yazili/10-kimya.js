/* 10. Sınıf Kimya — Maarif Modeli açık uçlu yazılı sınavları (örnek). u1 Tepkimeler ve Mol, u2 Gazlar, u3 Çözeltiler, u4 Sürdürülebilirlik */
(function () {
  const r = String.raw; App.data.yazili = App.data.yazili || {};
  App.data.yazili["10/kimya"] = { exams: [
    { id: "d1", term: 1, title: "1. Dönem Ortak Yazılı", sure: 40, sorular: [
      { tema: "u1", beceri: "Gözlem ve çıkarım", puan: 14,
        metin: r`Aşağıdaki gözlemlerden hangilerinin kimyasal tepkimeye işaret ettiğini gerekçesiyle belirtiniz:

**a)** Şekerin suda çözünmesi **b)** Elmanın kesilince kararması **c)** Sirkeye karbonat atınca gaz çıkması **d)** Buzun erimesi`,
        cevap: r`**b)** Kimyasal: renk değişimi, yeni madde oluşur (oksitlenme).
**c)** Kimyasal: gaz çıkışı (CO₂), yeni madde oluşur.
**a)** ve **d)** Fiziksel: maddenin kimliği değişmez (çözünme ve hâl değişimi).`,
        olcut: [[14, "Dördü doğru ve gerekçeli"], [9, "Dördü doğru, gerekçeler eksik ya da üçü gerekçeli"], [4, "İkisi doğru"], [0, "Yanlış ya da boş"]] },
      { tema: "u1", beceri: "Denkleştirme ve tür", puan: 14,
        metin: r`Aşağıdaki tepkimeleri denkleştiriniz ve türünü (yanma, sentez, analiz, asit-baz/nötrleşme, çözünme-çökelme) yazınız:

**a)** $\text{CH}_4 + \text{O}_2 \rightarrow \text{CO}_2 + \text{H}_2\text{O}$
**b)** $\text{HCl} + \text{NaOH} \rightarrow \text{NaCl} + \text{H}_2\text{O}$
**c)** $\text{H}_2\text{O}_2 \rightarrow \text{H}_2\text{O} + \text{O}_2$`,
        cevap: r`**a)** $\text{CH}_4 + 2\text{O}_2 \rightarrow \text{CO}_2 + 2\text{H}_2\text{O}$ — yanma.
**b)** Zaten denk — asit-baz (nötrleşme).
**c)** $2\text{H}_2\text{O}_2 \rightarrow 2\text{H}_2\text{O} + \text{O}_2$ — analiz (ayrışma).`,
        olcut: [[14, "Üç denkleştirme ve tür doğru"], [9, "İki tam"], [4, "Bir tam"], [0, "Yanlış ya da boş"]] },
      { tema: "u1", beceri: "Mol hesabı", puan: 14,
        metin: r`$\text{H}=1$, $\text{C}=12$, $\text{O}=16$ g/mol. Avogadro sayısı $N_A = 6{,}02 \times 10^{23}$.

**a)** 88 g $\text{CO}_2$ kaç moldür?
**b)** Bu miktarda kaç tane oksijen atomu vardır?
**c)** Aynı sayıda molekül içeren su kaç gramdır?`,
        cevap: r`**a)** $M_{\text{CO}_2} = 44$ g/mol ⇒ $88/44 = 2$ mol.
**b)** Her molekülde 2 O: $2 \cdot 2 = 4$ mol O ⇒ $4 \cdot 6{,}02 \times 10^{23} = 2{,}408 \times 10^{24}$ atom.
**c)** 2 mol su: $2 \cdot 18 = 36$ g.`,
        olcut: [[14, "Üç bölüm doğru"], [9, "İki bölüm doğru"], [4, "Bir bölüm doğru"], [0, "Yanlış ya da boş"]] },
      { tema: "u1", beceri: "Stokiyometri", puan: 14,
        metin: r`$\text{N}_2 + 3\text{H}_2 \rightarrow 2\text{NH}_3$ tepkimesinde 2 mol $\text{N}_2$ ile 3 mol $\text{H}_2$ tepkimeye sokuluyor.

**a)** Sınırlayıcı bileşen hangisidir? Gerekçelendiriniz.
**b)** En fazla kaç mol $\text{NH}_3$ oluşur?
**c)** Gerçekte 1,6 mol $\text{NH}_3$ elde edildiyse yüzde verim nedir?`,
        cevap: r`**a)** 2 mol N₂ için 6 mol H₂ gerekir, 3 mol var ⇒ **H₂ sınırlayıcı**. (3 mol H₂ yalnızca 1 mol N₂ ile tepkimeye girer.)
**b)** $3\ \text{mol H}_2 \cdot \tfrac{2}{3} = 2$ mol NH₃.
**c)** $1{,}6/2 = \%80$.`,
        olcut: [[14, "Üç bölüm doğru"], [9, "İki bölüm doğru"], [4, "Bir bölüm doğru"], [0, "Yanlış ya da boş"]] },
      { tema: "u2", beceri: "Kinetik teori", puan: 14,
        metin: r`Kapalı bir şişedeki gaz ısıtılıyor.

**a)** Kinetik moleküler teoriye göre taneciklerin hareketinde ne değişir?
**b)** Bu değişim gazın basıncını neden artırır?
**c)** Sprey kutularının üzerindeki "ısıya maruz bırakmayınız" uyarısını açıklayınız.`,
        cevap: r`**a)** Taneciklerin ortalama kinetik enerjisi ve hızları artar.
**b)** Tanecikler kabın çeperlerine daha sık ve daha şiddetli çarpar; birim alana düşen kuvvet (basınç) artar (sabit hacimde $P \propto T$).
**c)** Isınan kutuda basınç çok artar; kutu dayanamayıp patlayabilir.`,
        olcut: [[14, "Üç bölüm doğru"], [9, "İki bölüm doğru"], [4, "Bir bölüm doğru"], [0, "Yanlış ya da boş"]] },
      { tema: "u2", beceri: "Gaz yasaları", puan: 15,
        metin: r`Bir şırınganın ucu kapatılmış; içinde 27 °C'de 60 mL hava var ve basınç 1 atm.

**a)** Sıcaklık sabitken piston itilip hacim 20 mL'ye indirilirse basınç ne olur?
**b)** Basınç 1 atm sabitken sıcaklık 127 °C'ye çıkarılırsa hacim ne olur?
**c)** Kullandığınız yasaların adlarını yazınız.`,
        cevap: r`**a)** Boyle: $P_1V_1 = P_2V_2 \Rightarrow 1 \cdot 60 = P_2 \cdot 20 \Rightarrow P_2 = 3$ atm.
**b)** Charles: $V_1/T_1 = V_2/T_2$; $T_1 = 300$ K, $T_2 = 400$ K ⇒ $V_2 = 60 \cdot 400/300 = 80$ mL.
**c)** Boyle-Mariotte ve Charles yasaları.`,
        olcut: [[15, "Üç bölüm doğru (kelvin kullanımı dahil)"], [10, "İki bölüm doğru"], [5, "Bir bölüm doğru"], [0, "Yanlış ya da boş"]] },
      { tema: "u2", beceri: "İdeal gaz ve difüzyon", puan: 15,
        metin: r`$R = 0{,}082\ \text{L·atm/mol·K}$.

**a)** 0 °C ve 1 atm'de 4,48 L $\text{O}_2$ kaç moldür?
**b)** Bir odanın bir köşesinde parfüm şişesi açılınca koku neden zamanla tüm odaya yayılır? $\text{H}_2$ ve $\text{O}_2$'den hangisi daha hızlı yayılır? Graham yasasıyla açıklayınız.`,
        cevap: r`**a)** $n = \dfrac{PV}{RT} = \dfrac{1 \cdot 4{,}48}{0{,}082 \cdot 273} \approx 0{,}2$ mol (ya da $4{,}48/22{,}4$).
**b)** Gaz tanecikleri sürekli ve gelişigüzel hareket ettiği için yüksek derişimden düşük derişime yayılır (difüzyon). Graham: $\dfrac{v_1}{v_2} = \sqrt{\dfrac{M_2}{M_1}}$; mol kütlesi küçük olan H₂ ($M = 2$), O₂'den ($M = 32$) $\sqrt{16} = 4$ kat hızlı yayılır.`,
        olcut: [[15, "0,2 mol, difüzyon ve Graham oranı"], [10, "İkisi doğru"], [5, "Biri doğru"], [0, "Yanlış ya da boş"]] }
    ] },
    { id: "d2", term: 2, title: "2. Dönem Ortak Yazılı", sure: 40, sorular: [
      { tema: "u3", beceri: "Çözünme açıklaması", puan: 14,
        metin: r`Yağlı bir tabak sadece suyla temizlenemezken deterjanla temizlenebiliyor.

**a)** "Benzer benzeri çözer" ilkesiyle suyun yağı neden çözemediğini açıklayınız.
**b)** Deterjan molekülünün yapısı bu sorunu nasıl çözer?`,
        cevap: r`**a)** Su polar, yağ apolardır; aralarında güçlü etkileşim kurulamaz, karışmazlar.
**b)** Deterjan molekülünün bir ucu polar (suyu seven), diğer ucu apolar (yağı seven) uzun zincirdir. Apolar uçlar yağa, polar uçlar suya yönelir; yağ damlacıkları misel içinde suyla taşınır.`,
        olcut: [[14, "İki açıklama doğru"], [9, "Biri tam"], [4, "Bir doğru unsur"], [0, "Yanlış ya da boş"]] },
      { tema: "u3", beceri: "Grafik yorumlama", puan: 14,
        metin: r`Bir katının sudaki çözünürlüğü 20 °C'de 30 g/100 g su, 60 °C'de 70 g/100 g sudur.

**a)** 60 °C'de 200 g suda en fazla kaç g katı çözünür?
**b)** Bu doygun çözelti 20 °C'ye soğutulursa kaç g katı çöker?
**c)** Gazların çözünürlüğünün sıcaklıkla değişimi bu katıdan nasıl farklıdır? Bir günlük hayat örneği veriniz.`,
        cevap: r`**a)** $70 \cdot 2 = 140$ g.
**b)** 20 °C'de 200 g su $30 \cdot 2 = 60$ g çözebilir ⇒ $140 - 60 = 80$ g çöker.
**c)** Gazların çözünürlüğü sıcaklık arttıkça azalır. Örnek: ılık gazoz daha çabuk gazını kaybeder; sıcak yaz günlerinde sudaki çözünmüş oksijen azalır, balıklar etkilenir.`,
        olcut: [[14, "Üç bölüm doğru"], [9, "İki bölüm doğru"], [4, "Bir bölüm doğru"], [0, "Yanlış ya da boş"]] },
      { tema: "u3", beceri: "Derişim hesabı", puan: 14,
        metin: r`NaOH'un mol kütlesi 40 g/mol.

**a)** 8 g NaOH suda çözülerek 500 mL çözelti hazırlanıyor. Molariteyi bulunuz.
**b)** Bu çözeltiden 100 mL alınıp 400 mL'ye seyreltilirse yeni molarite ne olur?
**c)** İçme suyunda kurşun sınırı 0,01 ppm'dir. Bunun anlamını açıklayınız.`,
        cevap: r`**a)** $n = 8/40 = 0{,}2$ mol; $M = 0{,}2/0{,}5 = 0{,}4$ M.
**b)** $M_1V_1 = M_2V_2 \Rightarrow 0{,}4 \cdot 100 = M_2 \cdot 400 \Rightarrow M_2 = 0{,}1$ M.
**c)** Bir milyon birim (ör. 1 kg = $10^6$ mg) suda en fazla 0,01 birim (0,01 mg) kurşun bulunabilir; yani 1 L suda en fazla 0,01 mg.`,
        olcut: [[14, "Üç bölüm doğru"], [9, "İki bölüm doğru"], [4, "Bir bölüm doğru"], [0, "Yanlış ya da boş"]] },
      { tema: "u3", beceri: "Koligatif özellikler", puan: 14,
        metin: r`Kışın yollara tuz dökülür, arabaların radyatörüne antifriz konur.

**a)** Her iki uygulamanın ortak bilimsel temelini açıklayınız.
**b)** Tuzlu suyun saf sudan daha yüksek sıcaklıkta kaynamasının nedeni nedir?`,
        cevap: r`**a)** Çözünen madde eklenmesi çözücünün donma noktasını düşürür (donma noktası alçalması); su daha düşük sıcaklıkta donar, buzlanma önlenir.
**b)** Çözünen tanecikler yüzeydeki çözücü moleküllerinin bir kısmının yerini alır, buhar basıncı düşer; dış basınca ulaşmak için daha yüksek sıcaklık gerekir (kaynama noktası yükselmesi).`,
        olcut: [[14, "İki açıklama doğru"], [9, "Biri tam"], [4, "Bir doğru unsur"], [0, "Yanlış ya da boş"]] },
      { tema: "u3", beceri: "Sınıflandırma", puan: 14,
        metin: r`Çözeltileri **doymuş, doymamış, aşırı doymuş** olarak tanımlayınız. Bir çözeltinin hangi türde olduğunu bir kristal ekleyerek nasıl anlarsınız? Üç durum için ne gözleneceğini yazınız.`,
        cevap: r`Doymamış: çözebileceğinden daha az madde içerir. Doymuş: belirli sıcaklıkta çözebileceği en fazla maddeyi içerir. Aşırı doymuş: dengeden daha fazla madde içerir, kararsızdır.

Kristal ekleme: doymamışta kristal çözünür; doymuşta kristal çözünmeden kalır; aşırı doymuşta eklenen kristal çekirdek görevi görür ve fazla madde hızla kristallenerek çöker.`,
        olcut: [[14, "Üç tanım ve üç gözlem"], [9, "Tanımlar doğru, gözlemler eksik"], [4, "Bir-iki tanım"], [0, "Yanlış ya da boş"]] },
      { tema: "u4", beceri: "Yeşil kimya", puan: 15,
        metin: r`Bir deneyde 10 g kalsiyum karbonat yerine mikro ölçekte 0,2 g kullanılıyor ve gözlemler aynı alınıyor.

**a)** Mikro ölçekli deneylerin üç yararını yazınız.
**b)** Yeşil kimyanın atom ekonomisi ilkesini kısaca açıklayınız.`,
        cevap: r`**a)** Daha az kimyasal ve daha az atık; daha az maliyet; daha güvenli (az miktar, daha az kaza ve maruziyet riski); daha kısa sürede deney; enerji tasarrufu.
**b)** Tepkimeye giren atomların olabildiğince büyük kısmının istenen ürüne dönüşmesi, yan ürün ve atığın en aza indirilmesidir.`,
        olcut: [[15, "Üç yarar ve atom ekonomisi"], [10, "İkisi tam"], [5, "Bir doğru unsur"], [0, "Yanlış ya da boş"]] },
      { tema: "u4", beceri: "Toplumsal karar", puan: 15,
        metin: r`Bir şehirde atık pillerin evsel çöple atıldığı tespit ediliyor.

**a)** Pillerdeki hangi maddeler çevre için tehlikelidir? İki örnek veriniz.
**b)** Bu sorunun çözümü için belediyeye ve öğrencilere yönelik birer öneri yazınız.`,
        cevap: r`**a)** Ağır metaller: cıva, kadmiyum, kurşun; ayrıca lityum ve elektrolitler. Toprağa ve yeraltı suyuna karışarak canlılara zarar verir.
**b)** Belediye: okul ve marketlere atık pil kutuları koymak, toplama kampanyaları, geri dönüşüm tesisiyle iş birliği. Öğrenci: pilleri biriktirip toplama kutularına atmak, şarj edilebilir pil kullanmak, çevresini bilgilendirmek.`,
        olcut: [[15, "İki madde ve iki öneri"], [10, "Üç unsur"], [5, "Bir-iki unsur"], [0, "Yanlış ya da boş"]] }
    ] }
  ] };
})();
