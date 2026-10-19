/* 11. Sınıf Kimya — Maarif Modeli açık uçlu yazılı sınavları (örnek). u1 Enerji ve Tepkime Hızı, u2 Kimyasal Denge, u3 Nanoteknoloji */
(function () {
  const r = String.raw; App.data.yazili = App.data.yazili || {};
  App.data.yazili["11/kimya"] = { exams: [
    { id: "d1", term: 1, title: "1. Dönem Ortak Yazılı", sure: 40, sorular: [
      { tema: "u1", beceri: "Ekzotermik / endotermik", puan: 14,
        metin: r`Kamp için satılan "sıcak ped"e bastırınca ısınıyor, spor yaralanmalarında kullanılan "soğuk ped" ise soğuyor.

**a)** Hangisinde ekzotermik, hangisinde endotermik bir süreç olur?
**b)** Her iki süreç için entalpi değişiminin ($\Delta H$) işaretini ve enerji akışının yönünü açıklayınız.`,
        cevap: r`**a)** Sıcak ped: ekzotermik. Soğuk ped: endotermik (ör. amonyum nitratın suda çözünmesi).
**b)** Ekzotermik: $\Delta H < 0$; sistem çevreye ısı verir, çevre ısınır. Endotermik: $\Delta H > 0$; sistem çevreden ısı alır, çevre (cilt) soğur.`,
        olcut: [[14, "İki eşleştirme, işaret ve yön"], [9, "Eşleştirme doğru, açıklama eksik"], [4, "Bir doğru unsur"], [0, "Yanlış ya da boş"]] },
      { tema: "u1", beceri: "Hess yasası", puan: 14,
        metin: r`Aşağıdaki tepkimeler veriliyor:

$\text{C(k)} + \text{O}_2\text{(g)} \rightarrow \text{CO}_2\text{(g)}$ $\quad \Delta H_1 = -394$ kJ
$\text{CO(g)} + \tfrac12\text{O}_2\text{(g)} \rightarrow \text{CO}_2\text{(g)}$ $\quad \Delta H_2 = -283$ kJ

$\text{C(k)} + \tfrac12\text{O}_2\text{(g)} \rightarrow \text{CO(g)}$ tepkimesinin $\Delta H$'ini Hess yasasıyla bulunuz ve yöntemi açıklayınız.`,
        cevap: r`İstenen tepkime = (1. tepkime) + (2. tepkimenin tersi).
2. tepkime ters çevrilince $\Delta H$ işaret değiştirir: $+283$ kJ.
$\Delta H = -394 + 283 = -111$ kJ.
Hess yasası: Tepkime ısısı yalnızca ilk ve son duruma bağlıdır; tepkimeler toplanınca entalpileri de toplanır.`,
        olcut: [[14, "−111 kJ ve yöntem"], [9, "Sonuç doğru, açıklama eksik"], [4, "Ters çevirme doğru, işlem hatası"], [0, "Yanlış ya da boş"]] },
      { tema: "u1", beceri: "Bağ enerjisi", puan: 14,
        metin: r`Bağ enerjileri (kJ/mol): H–H 436, Cl–Cl 243, H–Cl 432.

$\text{H}_2 + \text{Cl}_2 \rightarrow 2\text{HCl}$ tepkimesinin $\Delta H$'ini hesaplayınız. Tepkimenin ekzotermik mi endotermik mi olduğunu bağ kırılması ve oluşması üzerinden açıklayınız.`,
        cevap: r`$\Delta H = \sum(\text{kırılan}) - \sum(\text{oluşan}) = (436 + 243) - 2 \cdot 432 = 679 - 864 = -185$ kJ.

Ekzotermiktir: bağ kırmak için harcanan enerji (679 kJ), yeni bağlar oluşurken açığa çıkan enerjiden (864 kJ) azdır.`,
        olcut: [[14, "−185 kJ ve açıklama"], [9, "Sonuç doğru, açıklama eksik"], [4, "Formül doğru, işlem hatası"], [0, "Yanlış ya da boş"]] },
      { tema: "u1", beceri: "Çarpışma teorisi", puan: 14,
        metin: r`Odun parçası zor yanarken talaş tozu havada patlayarak yanabilir; buzdolabındaki süt daha geç bozulur.

Bu iki gözlemi tepkime hızına etki eden faktörler ve **çarpışma teorisi** ile açıklayınız.`,
        cevap: r`Talaş tozu: temas yüzeyi çok büyüktür; oksijenle etkin çarpışma sayısı artar, tepkime çok hızlanır.
Buzdolabı: sıcaklık düşükken taneciklerin (ve bakteri enzimlerinin) kinetik enerjisi azdır; aktifleşme enerjisini aşan etkin çarpışma sayısı azalır, bozulma yavaşlar.
Çarpışma teorisi: Tepkime için taneciklerin uygun yönelmeyle ve aktifleşme enerjisine eşit ya da büyük enerjiyle çarpışması gerekir.`,
        olcut: [[14, "İki gözlem ve teori"], [9, "İkisi doğru, teori eksik"], [4, "Bir gözlem"], [0, "Yanlış ya da boş"]] },
      { tema: "u1", beceri: "Hız denklemi", puan: 14,
        metin: r`$2\text{NO} + \text{O}_2 \rightarrow 2\text{NO}_2$ tepkimesi için deney verileri:

| Deney | [NO] (M) | [O₂] (M) | Hız (M/s) |
|---|---|---|---|
| 1 | 0,1 | 0,1 | $2 \times 10^{-3}$ |
| 2 | 0,2 | 0,1 | $8 \times 10^{-3}$ |
| 3 | 0,1 | 0,2 | $4 \times 10^{-3}$ |

Hız denklemini ve tepkimenin toplam derecesini bulunuz.`,
        cevap: r`NO iki katına çıkınca hız 4 katı ⇒ NO'ya göre 2. dereceden. O₂ iki katına çıkınca hız 2 katı ⇒ O₂'ye göre 1. dereceden.
$\text{Hız} = k[\text{NO}]^2[\text{O}_2]$; toplam derece 3.
($k = \dfrac{2 \times 10^{-3}}{0{,}01 \cdot 0{,}1} = 2$ M⁻²·s⁻¹)`,
        olcut: [[14, "Hız denklemi ve derece"], [9, "Bir türün derecesi hatalı"], [4, "Yöntem doğru, sonuç hatalı"], [0, "Yanlış ya da boş"]] },
      { tema: "u1", beceri: "Katalizör", puan: 15,
        metin: r`Otomobillerin egzozunda katalitik konvertör bulunur.

**a)** Katalizörün tepkimeyi hızlandırma mekanizmasını potansiyel enerji diyagramıyla açıklayınız.
**b)** Katalizör tepkimenin $\Delta H$'ini değiştirir mi? Gerekçelendiriniz.
**c)** Katalitik konvertörün çevreye yararını yazınız.`,
        cevap: r`**a)** Katalizör daha düşük aktifleşme enerjili alternatif bir yol (mekanizma) sağlar; aktifleşme enerjisini aşan tanecik sayısı artar ve tepkime hızlanır. Kendisi tepkimeden değişmeden çıkar.
**b)** Değiştirmez; $\Delta H$ yalnızca girenlerin ve ürünlerin enerjilerine bağlıdır.
**c)** Zararlı CO, NOx ve yanmamış hidrokarbonları daha az zararlı CO₂, N₂ ve H₂O'ya dönüştürür; hava kirliliğini azaltır.`,
        olcut: [[15, "Üç bölüm doğru"], [10, "İki bölüm doğru"], [5, "Bir bölüm doğru"], [0, "Yanlış ya da boş"]] },
      { tema: "u1", beceri: "Enerji kaynakları", puan: 15,
        metin: r`Fosil yakıtların yanması ekzotermiktir ve enerji sağlar; ama sera gazı salar.

Bir yakıtın "iyi yakıt" sayılması için taşıması gereken üç özelliği yazınız. Hidrojeni fosil yakıtlarla karşılaştırıp bir üstünlüğünü ve bir sorununu belirtiniz.`,
        cevap: r`İyi yakıt: birim kütle başına yüksek ısı vermesi, kolay tutuşması ama güvenli depolanabilmesi, ucuz ve bol olması, yanma ürünlerinin çevreye zararsız olması.

Hidrojen: Üstünlük — yanma ürünü yalnızca sudur, sera gazı salmaz; kütle başına enerjisi yüksektir. Sorun — üretimi enerji ister (yeşil hidrojen için yenilenebilir enerji gerekir), depolanması ve taşınması zordur (çok düşük yoğunluk, patlama riski).`,
        olcut: [[15, "Üç özellik, üstünlük ve sorun"], [10, "Dört unsur"], [5, "İki unsur"], [0, "Yanlış ya da boş"]] }
    ] },
    { id: "d2", term: 2, title: "2. Dönem Ortak Yazılı", sure: 40, sorular: [
      { tema: "u2", beceri: "Denge sabiti", puan: 14,
        metin: r`$\text{N}_2\text{(g)} + 3\text{H}_2\text{(g)} \rightleftharpoons 2\text{NH}_3\text{(g)}$ tepkimesi 1 L'lik kapta dengede: $[\text{N}_2] = 0{,}5$ M, $[\text{H}_2] = 1$ M, $[\text{NH}_3] = 0{,}5$ M.

**a)** $K_c$ ifadesini yazıp değerini bulunuz.
**b)** Dengenin dinamik olduğunu açıklayınız.`,
        cevap: r`**a)** $K_c = \dfrac{[\text{NH}_3]^2}{[\text{N}_2][\text{H}_2]^3} = \dfrac{0{,}25}{0{,}5 \cdot 1} = 0{,}5$.
**b)** Dengede ileri ve geri tepkimeler durmaz; aynı hızla devam eder. Bu yüzden derişimler sabit kalır ama tanecikler sürekli dönüşür.`,
        olcut: [[14, "Kc ve dinamik denge"], [9, "Biri tam"], [4, "İfade doğru, işlem hatalı"], [0, "Yanlış ya da boş"]] },
      { tema: "u2", beceri: "Le Chatelier", puan: 14,
        metin: r`Aynı tepkime ($\Delta H < 0$) için Haber yönteminde amonyak verimini artırmak isteniyor.

Aşağıdaki değişikliklerin dengeyi hangi yöne kaydıracağını ve nedenini yazınız:

**a)** Basıncı artırmak **b)** Sıcaklığı artırmak **c)** Ortamdan $\text{NH}_3$'ü sürekli çekmek **d)** Katalizör eklemek`,
        cevap: r`**a)** Ürünler yönüne: 4 mol gazdan 2 mol gaza; basınç artınca mol sayısı az olan tarafa kayar.
**b)** Girenler yönüne: tepkime ekzotermik; ısı eklemek dengeyi ısıyı harcayan geri yöne kaydırır (verim azalır, ama hız artar).
**c)** Ürünler yönüne: azalan NH₃'ü yerine koymak için.
**d)** Kaymaz: katalizör dengeye daha hızlı ulaşılmasını sağlar, denge konumunu değiştirmez.`,
        olcut: [[14, "Dördü gerekçeli"], [9, "Üçü doğru"], [4, "İkisi doğru"], [0, "Bir ya da hiç"]] },
      { tema: "u2", beceri: "pH hesabı", puan: 14,
        metin: r`25 °C'de:

**a)** 0,01 M HCl çözeltisinin pH'ını bulunuz.
**b)** 0,001 M NaOH çözeltisinin pH'ını bulunuz.
**c)** Mide özsuyunun pH'ı yaklaşık 2, kanınki 7,4'tür. Mide özsuyundaki $[\text{H}^+]$, kandakinden yaklaşık kaç kat fazladır?`,
        cevap: r`**a)** Kuvvetli asit: $[\text{H}^+] = 10^{-2}$ ⇒ pH = 2.
**b)** $[\text{OH}^-] = 10^{-3}$ ⇒ pOH = 3 ⇒ pH = 11.
**c)** pH farkı 5,4 ⇒ $10^{5{,}4} \approx 250\,000$ kat.`,
        olcut: [[14, "Üç bölüm doğru"], [9, "İki bölüm doğru"], [4, "Bir bölüm doğru"], [0, "Yanlış ya da boş"]] },
      { tema: "u2", beceri: "Tampon çözeltiler", puan: 14,
        metin: r`Kanın pH'ı, $\text{H}_2\text{CO}_3/\text{HCO}_3^-$ tampon sistemi sayesinde 7,35–7,45 arasında tutulur.

**a)** Tampon çözelti nedir?
**b)** Kana asit (H⁺) eklenince bu sistem nasıl tepki verir? Tepkimeyle gösteriniz.`,
        cevap: r`**a)** Zayıf bir asit ile onun eşlenik bazını (ya da zayıf baz ile eşlenik asidini) içeren, az miktarda asit ya da baz eklenince pH'ı fazla değişmeyen çözeltidir.
**b)** Eklenen H⁺ iyonlarını bikarbonat tutar: $\text{HCO}_3^- + \text{H}^+ \rightarrow \text{H}_2\text{CO}_3$. Böylece serbest H⁺ derişimi fazla artmaz, pH korunur (oluşan karbonik asit CO₂ ve suya ayrışıp solunumla atılır).`,
        olcut: [[14, "Tanım ve tepkimeli açıklama"], [9, "Biri tam"], [4, "Bir doğru unsur"], [0, "Yanlış ya da boş"]] },
      { tema: "u2", beceri: "Titrasyon", puan: 14,
        metin: r`25 mL HCl çözeltisi, 0,1 M NaOH ile titre ediliyor; dönüm noktasına 20 mL NaOH harcanıyor.

**a)** HCl çözeltisinin derişimini bulunuz.
**b)** Dönüm noktasını belirlemek için ne kullanılır? Bu titrasyonda dönüm noktasında pH yaklaşık kaçtır?`,
        cevap: r`**a)** $n_{\text{NaOH}} = 0{,}1 \cdot 0{,}020 = 0{,}002$ mol = $n_{\text{HCl}}$ ⇒ $M = 0{,}002/0{,}025 = 0{,}08$ M.
**b)** İndikatör (ör. fenolftalein) ya da pH metre. Kuvvetli asit–kuvvetli baz titrasyonunda eşdeğerlik noktasında pH = 7.`,
        olcut: [[14, "Derişim ve dönüm noktası"], [9, "Biri tam"], [4, "Bir doğru unsur"], [0, "Yanlış ya da boş"]] },
      { tema: "u2", beceri: "Çözünürlük dengesi", puan: 15,
        metin: r`$\text{AgCl}$'nin çözünürlük çarpımı $K_{çç} = 1{,}6 \times 10^{-10}$'dur.

**a)** Saf sudaki molar çözünürlüğünü bulunuz.
**b)** AgCl, NaCl çözeltisinde saf sudakinden daha az mı çözünür? Ortak iyon etkisiyle açıklayınız.`,
        cevap: r`**a)** $\text{AgCl} \rightleftharpoons \text{Ag}^+ + \text{Cl}^-$; $K_{çç} = s^2 \Rightarrow s = \sqrt{1{,}6 \times 10^{-10}} = 1{,}26 \times 10^{-5}$ M.
**b)** Evet, daha az çözünür. NaCl'den gelen Cl⁻ iyonları ortamda zaten bulunduğu için denge, Le Chatelier ilkesine göre katı AgCl yönüne kayar (ortak iyon etkisi).`,
        olcut: [[15, "Çözünürlük ve ortak iyon"], [10, "Biri tam"], [5, "Bir doğru unsur"], [0, "Yanlış ya da boş"]] },
      { tema: "u3", beceri: "Sürdürülebilirlik", puan: 15,
        metin: r`Mikroplastikler denizlerden içme sularına kadar her yerde bulunmaktadır.

**a)** Mikroplastiklerin iki kaynağını yazınız.
**b)** İnsan sağlığına ve ekosisteme olası etkilerini açıklayınız.
**c)** Nanoteknolojinin bu soruna çözüm olabilecek bir uygulamasını ya da bir riskini yazınız.`,
        cevap: r`**a)** Sentetik kumaşların yıkanması, büyük plastik atıkların parçalanması, araç lastiklerinin aşınması, kozmetik ürünlerdeki mikroboncuklar.
**b)** Deniz canlıları tarafından yutularak besin zincirine girer; yüzeylerinde zehirli kimyasalları taşıyabilir; insan vücudunda birikerek iltihap ve hormon sistemi üzerine etkileri araştırılmaktadır.
**c)** Uygulama: nanofiltre membranlarla suyun arıtılması, plastiği parçalayan nanokatalizörler. Risk: nanoparçacıkların kendilerinin de çevrede birikip canlılara zarar verebilmesi.`,
        olcut: [[15, "Üç bölüm doğru"], [10, "İki bölüm doğru"], [5, "Bir bölüm doğru"], [0, "Yanlış ya da boş"]] }
    ] }
  ] };
})();
