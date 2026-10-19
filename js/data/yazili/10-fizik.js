/* 10. Sınıf Fizik — Maarif Modeli açık uçlu yazılı sınavları (örnek). Üniteler: u1 Kuvvet ve Hareket, u2 Enerji, u3 Elektrik, u4 Dalgalar */
(function () {
  const r = String.raw; App.data.yazili = App.data.yazili || {};
  App.data.yazili["10/fizik"] = { exams: [
    { id: "d1", term: 1, title: "1. Dönem Ortak Yazılı", sure: 40, sorular: [
      { tema: "u1", beceri: "Grafik yorumlama", puan: 14,
        metin: r`Bir koşucunun hız–zaman bilgisi: 0–4 s arasında hızı düzgün olarak 0'dan 8 m/s'ye çıkıyor, 4–10 s arasında 8 m/s sabit kalıyor.

**a)** 0–4 s arasındaki ivmeyi bulunuz.
**b)** 0–10 s arasında alınan yolu hız–zaman grafiğinin altındaki alanla hesaplayınız.
**c)** 0–10 s ortalama hızını bulunuz.`,
        cevap: r`**a)** $a = \Delta v / \Delta t = 8/4 = 2\ \text{m/s}^2$.
**b)** Üçgen: $\tfrac12 \cdot 4 \cdot 8 = 16$ m; dikdörtgen: $6 \cdot 8 = 48$ m. Toplam 64 m.
**c)** $v_{ort} = 64 / 10 = 6{,}4$ m/s.`,
        olcut: [[14, "Üç bölüm doğru"], [9, "İki bölüm doğru"], [4, "Bir bölüm doğru"], [0, "Yanlış ya da boş"]] },
      { tema: "u1", beceri: "Bağıl hareket", puan: 14,
        metin: r`Düz bir yolda A otomobili 90 km/h, B otomobili aynı yönde 60 km/h hızla gidiyor. B, A'nın 15 km önünde.

**a)** A'nın B'ye göre hızı nedir?
**b)** A, B'ye kaç dakika sonra yetişir?
**c)** Araçlar zıt yönde gitseydi birbirine göre hızları ne olurdu?`,
        cevap: r`**a)** Aynı yön: $90 - 60 = 30$ km/h (B'ye doğru).
**b)** $t = 15 / 30 = 0{,}5$ h = 30 dk.
**c)** Zıt yön: $90 + 60 = 150$ km/h.`,
        olcut: [[14, "Üç bölüm doğru"], [9, "İki bölüm doğru"], [4, "Bir bölüm doğru"], [0, "Yanlış ya da boş"]] },
      { tema: "u1", beceri: "Problem çözme", puan: 14,
        metin: r`20 m/s hızla giden bir araç, sürücü bir engel görünce $5\ \text{m/s}^2$ büyüklüğünde sabit ivmeyle yavaşlıyor. Sürücünün tepki süresi 0,8 s.

**a)** Tepki süresinde alınan yolu bulunuz.
**b)** Frenleme mesafesini bulunuz.
**c)** Toplam duruş mesafesini yazınız ve hız iki katına çıkarsa frenleme mesafesinin nasıl değişeceğini açıklayınız.`,
        cevap: r`**a)** $20 \cdot 0{,}8 = 16$ m.
**b)** $v^2 = v_0^2 - 2ax \Rightarrow 0 = 400 - 10x \Rightarrow x = 40$ m.
**c)** Toplam 56 m. Frenleme mesafesi $v_0^2$ ile orantılı olduğundan hız iki katına çıkarsa 4 katına (160 m) çıkar.`,
        olcut: [[14, "Üç bölüm doğru"], [9, "İki bölüm doğru"], [4, "Bir bölüm doğru"], [0, "Yanlış ya da boş"]] },
      { tema: "u2", beceri: "Kavramsal anlama", puan: 14,
        metin: r`Bir öğrenci 10 kg'lık bir kutuyu elinde tutarak 20 m boyunca yatay olarak yürüyor; başka bir öğrenci aynı kutuyu yerden 1,5 m yüksekliğe kaldırıyor. ($g = 10\ \text{m/s}^2$)

Her iki durumda kutuya uygulanan kuvvetin fiziksel anlamda yaptığı işi hesaplayıp karşılaştırınız. Neden farklı olduğunu açıklayınız.`,
        cevap: r`Yatay yürüme: Uygulanan kuvvet yukarı (100 N), yer değiştirme yatay; aralarındaki açı 90° ⇒ $W = F \cdot d \cdot \cos 90° = 0$.
Kaldırma: $W = m g h = 10 \cdot 10 \cdot 1{,}5 = 150$ J.
Fiziksel iş için kuvvetin yer değiştirme doğrultusunda bir bileşeni olmalıdır; yorulmak her zaman iş yapıldığı anlamına gelmez.`,
        olcut: [[14, "0 J, 150 J ve açıklama"], [9, "İki sonuç doğru, açıklama eksik"], [4, "Bir sonuç doğru"], [0, "Yanlış ya da boş"]] },
      { tema: "u2", beceri: "Enerji korunumu", puan: 14,
        metin: r`Kütlesi 50 kg olan bir kayakçı sürtünmesiz bir pistte 20 m yükseklikten durgun hâlden kayıyor. ($g = 10\ \text{m/s}^2$)

**a)** Pistin en alt noktasındaki hızını bulunuz.
**b)** Gerçekte ölçülen hız 18 m/s ise ne kadar enerji ısıya dönüşmüştür? Verimi bulunuz.`,
        cevap: r`**a)** $mgh = \tfrac12 m v^2 \Rightarrow v = \sqrt{2gh} = \sqrt{400} = 20$ m/s.
**b)** Başlangıç enerjisi $50 \cdot 10 \cdot 20 = 10\,000$ J. Son kinetik enerji $\tfrac12 \cdot 50 \cdot 18^2 = 8100$ J. Isıya dönüşen $1900$ J. Verim $8100/10\,000 = \%81$.`,
        olcut: [[14, "20 m/s, 1900 J ve %81"], [9, "İki sonuç doğru"], [4, "Bir sonuç doğru"], [0, "Yanlış ya da boş"]] },
      { tema: "u2", beceri: "Güç ve verim", puan: 15,
        metin: r`Bir asansör motoru 600 kg'lık kabini 20 m yükseğe 30 saniyede çıkarıyor. ($g = 10\ \text{m/s}^2$)

**a)** Motorun yaptığı yararlı işi ve gücünü bulunuz.
**b)** Motor bu sürede 200 kJ elektrik enerjisi harcadıysa verimi nedir? Kaybolan enerjinin nereye gittiğini yazınız.`,
        cevap: r`**a)** $W = mgh = 600 \cdot 10 \cdot 20 = 120\,000$ J. $P = W/t = 120\,000/30 = 4000$ W = 4 kW.
**b)** Verim $= 120/200 = \%60$. Kayıp enerji sürtünme ve motorun ısınmasıyla ısıya, bir kısmı sese dönüşür.`,
        olcut: [[15, "İş, güç, verim ve kayıp"], [10, "Üç sonuç doğru"], [5, "Bir-iki sonuç"], [0, "Yanlış ya da boş"]] },
      { tema: "u2", beceri: "Sürdürülebilirlik", puan: 15,
        metin: r`Bir okulun çatısına güneş paneli, bahçesine küçük bir rüzgâr türbini kurulması düşünülüyor.

**a)** Yenilenebilir ve yenilenemez enerji kaynaklarını ikişer örnekle karşılaştırınız.
**b)** Güneş panelinde ve rüzgâr türbininde hangi enerji dönüşümleri olur?
**c)** Bu kaynakların bir sınırlılığını yazınız.`,
        cevap: r`**a)** Yenilenebilir (güneş, rüzgâr, hidroelektrik, jeotermal) tükenmez ve daha az sera gazı salar; yenilenemez (kömür, petrol, doğal gaz) sınırlıdır ve çevreyi kirletir.
**b)** Panel: ışık enerjisi → elektrik enerjisi. Türbin: rüzgârın kinetik enerjisi → dönme (mekanik) enerji → elektrik enerjisi.
**c)** Hava koşullarına bağlıdır (gece/bulut, rüzgârsız günler); enerjinin depolanması gerekir; ilk kurulum maliyeti yüksektir.`,
        olcut: [[15, "Üç bölüm doğru"], [10, "İki bölüm doğru"], [5, "Bir bölüm doğru"], [0, "Yanlış ya da boş"]] }
    ] },
    { id: "d2", term: 2, title: "2. Dönem Ortak Yazılı", sure: 40, sorular: [
      { tema: "u3", beceri: "Ohm yasası", puan: 14,
        metin: r`12 V'luk bir pile 4 Ω'luk bir direnç bağlanıyor.

**a)** Devreden geçen akımı bulunuz.
**b)** Ampermetre ve voltmetrenin devreye nasıl bağlanması gerektiğini ve nedenini açıklayınız.`,
        cevap: r`**a)** $I = V/R = 12/4 = 3$ A.
**b)** Ampermetre devreye **seri** bağlanır (akımın tamamı içinden geçmeli; iç direnci çok küçüktür). Voltmetre ölçülecek elemana **paralel** bağlanır (aynı potansiyel farkını görmeli; iç direnci çok büyüktür, akım çekmez).`,
        olcut: [[14, "3 A ve iki bağlama gerekçeli"], [9, "Akım doğru, bağlamalar gerekçesiz"], [4, "Bir bölüm doğru"], [0, "Yanlış ya da boş"]] },
      { tema: "u3", beceri: "Devre çözümleme", puan: 14,
        metin: r`6 Ω ve 3 Ω'luk iki direnç önce seri, sonra paralel olarak 18 V'luk bir üretece bağlanıyor.

Her iki durumda eşdeğer direnci ve ana koldan geçen akımı bulunuz. Evlerdeki prizlerin neden paralel bağlandığını açıklayınız.`,
        cevap: r`Seri: $R = 9$ Ω, $I = 18/9 = 2$ A.
Paralel: $R = \dfrac{6 \cdot 3}{6 + 3} = 2$ Ω, $I = 18/2 = 9$ A.
Prizler paralel bağlanır: her cihaz aynı gerilimi (220 V) alır ve biri kapatılınca diğerleri çalışmaya devam eder.`,
        olcut: [[14, "Dört değer ve priz gerekçesi"], [9, "Dört değer doğru, gerekçe eksik"], [4, "İki değer doğru"], [0, "Yanlış ya da boş"]] },
      { tema: "u3", beceri: "Güvenlik ve topraklama", puan: 14,
        metin: r`Çamaşır makinesinin metal gövdesine bir kablo teması olursa, topraklama yoksa makineye dokunan kişi çarpılabilir.

**a)** Topraklamanın kişiyi nasıl koruduğunu açıklayınız.
**b)** Elektrik çarpmasında insan vücudu için tehlikeli olan niceliğin akım mı gerilim mi olduğunu gerekçelendiriniz.`,
        cevap: r`**a)** Topraklama hattı gövdeyi toprağa çok düşük dirençle bağlar; kaçak akım vücut yerine bu yoldan toprağa akar ve sigorta/kaçak akım rölesi devreyi keser.
**b)** Vücuda zarar veren **akımdır** (çok küçük akımlar bile, ör. 30 mA, kalp ritmini bozabilir). Gerilim, vücut direncine bağlı olarak bu akımı oluşturduğu için önemlidir; ıslak elde direnç düştüğünden aynı gerilim daha büyük akım oluşturur.`,
        olcut: [[14, "İki bölüm gerekçeli"], [9, "Biri tam, diğeri eksik"], [4, "Bir doğru unsur"], [0, "Yanlış ya da boş"]] },
      { tema: "u4", beceri: "Periyodik hareket", puan: 14,
        metin: r`Bir basit sarkaç 20 salınımı 40 saniyede yapıyor.

**a)** Periyodu ve frekansı bulunuz.
**b)** Sarkacın ipi uzatılırsa ve sarkaç Ay'a götürülürse periyot nasıl değişir? $T = 2\pi\sqrt{L/g}$ ile açıklayınız.`,
        cevap: r`**a)** $T = 40/20 = 2$ s, $f = 1/T = 0{,}5$ Hz.
**b)** İp uzarsa ($L$ artar) periyot artar. Ay'da $g$ küçük olduğundan periyot artar (sarkaç daha yavaş salınır). Kütle periyodu değiştirmez.`,
        olcut: [[14, "T, f ve iki değişim gerekçeli"], [9, "T, f doğru, bir değişim"], [4, "Yalnız T ve f"], [0, "Yanlış ya da boş"]] },
      { tema: "u4", beceri: "Dalga kavramları", puan: 14,
        metin: r`Bir yay dalgasının dalga boyu 0,5 m, frekansı 6 Hz'dir.

**a)** Dalganın yayılma hızını bulunuz.
**b)** Aynı yayda frekans iki katına çıkarılırsa hız ve dalga boyu nasıl değişir? Gerekçelendiriniz.`,
        cevap: r`**a)** $v = \lambda f = 0{,}5 \cdot 6 = 3$ m/s.
**b)** Dalganın hızı ortama (yayın gerginliği ve kütlesi) bağlıdır, frekansa bağlı değildir; hız 3 m/s kalır. $\lambda = v/f$ olduğundan dalga boyu yarıya (0,25 m) iner.`,
        olcut: [[14, "3 m/s ve gerekçeli değişim"], [9, "Hız doğru, değişim gerekçesiz"], [4, "Bir doğru unsur"], [0, "Yanlış ya da boş"]] },
      { tema: "u4", beceri: "Sınıflandırma", puan: 15,
        metin: r`Ses dalgası, ışık dalgası, yay dalgası ve deprem dalgaları (P ve S) veriliyor.

Bunları **mekanik/elektromanyetik** ve **enine/boyuna** olarak sınıflandırınız. Sesin neden boşlukta yayılamadığını açıklayınız.`,
        cevap: r`- Ses: mekanik, boyuna (havada).
- Işık: elektromanyetik, enine.
- Yay dalgası: mekanik; enine ya da boyuna olabilir (oluşturma biçimine göre).
- P dalgası: mekanik, boyuna. S dalgası: mekanik, enine.

Ses mekanik dalgadır; titreşimi aktaracak tanecikler (madde) gerekir. Boşlukta madde olmadığı için yayılamaz.`,
        olcut: [[15, "Sınıflandırma (en fazla bir hata) ve açıklama"], [10, "İki hata ve açıklama ya da tam sınıflandırma açıklamasız"], [5, "Yarısı doğru"], [0, "Yanlış ya da boş"]] },
      { tema: "u4", beceri: "Rezonans ve deprem", puan: 15,
        metin: r`Bir depremde aynı mahalledeki 5 katlı binalar az hasar görürken 15 katlı binalar daha çok hasar görmüştür.

Bu durumu **rezonans** kavramıyla açıklayınız. Depreme dayanıklı yapı tasarımında rezonansa karşı alınabilecek bir önlem yazınız.`,
        cevap: r`Her binanın yüksekliğine ve yapısına bağlı bir doğal titreşim frekansı vardır. Deprem dalgasının baskın frekansı bir binanın doğal frekansına yakınsa bina rezonansa girer, salınım genliği çok büyür ve hasar artar. O depremde frekans 15 katlı binaların doğal frekansına yakın olabilir.

Önlemler: sismik izolatör (taban yalıtımı), sönümleyiciler (damper), binanın doğal frekansını zeminin baskın frekansından uzak tutacak tasarım.`,
        olcut: [[15, "Rezonans açıklaması ve uygun önlem"], [10, "Açıklama doğru, önlem eksik"], [5, "Rezonans adı geçiyor, açıklama yüzeysel"], [0, "Yanlış ya da boş"]] }
    ] }
  ] };
})();
