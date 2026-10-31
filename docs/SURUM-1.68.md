# KampüsAI 1.68.0

Bu sürüm önceki iki yerel güncellemeyi ve yeni hesap araçlarını tek yayında birleştirir.

## Hesaplar ve Araçlar
Mevcut bilimsel hesap makinesi korunur. Yeni ortak girişte birim dönüştürücü, fonksiyon çizici, mol/çözelti hesabı ve ölçüm analizi bulunur. Eski hesap adresi ve işlem geçmişi silinmez. Menü aramasında birim, grafik, mol ve belirsizlik sözcükleri ortak girişe ulaşır.

İlgili konu anlatımlarında Bu konuda hesapla ve incele bölümü vardır. Araç doğrudan ders içinde açılır; tam sayfa bağlantısı da sunulur. Eşleştirme ders/ünite/kazanım başlığına göre yapılır; konu veri yapısındaki `tools` listesiyle açıkça özelleştirilebilir. Her konuya gereksiz hesap paneli eklenmez. İçerik sağlayıcısından AI cevabı beklenmez.

- Birimler: uzunluk, alan, hacim, kütle, zaman, hız, basınç, enerji ve sıcaklık. Sıcaklık için ofsetli dönüşüm ve mutlak sıfır kontrolü; alan/hacimde üs katsayıları kullanılır.
- Grafik: güvenli yerel ayrıştırıcı, radyan/derece seçimi, 401 nokta, değer tablosu, sayısal kök adayları. `eval` veya dinamik JS yürütme yoktur. Örnekleme bütün kökleri ve süreksizlikleri yakalayamaz; sembolik türev/integral aracı değildir.
- Mol: kütle/mol, molarite ve seyreltme. İlk 36 elementin mevcut yuvarlatılmış kütleleriyle parantez ve hidrat formülü ayrıştırılır. Diğer elementlerde kullanıcı M değerini elle girebilir; bilinmeyen sembole kütle uydurulmaz. Yüklü iyon/izotop formülleri desteklenmez. Çözünen molünün korunduğu ideal seyreltme varsayılır.
- Ölçüm: 2–1000 aynı birimli değer; ortalama, örneklem standart sapması, ortalamanın standart hatası ve isteğe bağlı referansa göre mutlak yüzde hata. SEM toplam cihaz/sistematik belirsizliği veya güven aralığı değildir. Referans sıfırsa yüzde hata hesaplanmaz.

## Önceki isteklerle birleşen değişiklikler
- 16 oyun, dört beceri grubu. Yeni Oran Mutfağı, Bilimsel Gösterim, pH Tahmini ve Kanıt Dedektifi.
- Sesli öğretmen, podcast, dil pratiği ve sözlü prova Dinle ve Konuş çatısında. Eski adresler/kayıtlar korunur.
- Gelişimim'de test doğruluğu ve en az yedi gün aralıklı tekrar başarısı öne çıkar. Değişen soru/zorluk nedeniyle bu kesin kalıcılık ölçümü değildir. XP/rozet/seri açılır motivasyon bölümündedir.
- Güncel Hakkında/kaynakça; kurgusal gerekçe/eminlik, doküman, ödev ve pH örnekleri içeren demo; kişisel kayıt koruması. Yeni tanıtım turu 52 adım.

## Dayanaklar
- BIPM: https://www.bipm.org/en/measurement-units/si-base-units
- OpenStax Chemistry 2e 3.3: https://openstax.org/books/chemistry-2e/pages/3-3-molarity
- NIST/SEMATECH: https://www.itl.nist.gov/div898/handbook/eda/section3/eda352.htm

## Doğrulama sınırı
Birim testleri; formül grupları/hidratlar, hatalı girişler, seyreltme, sıcaklık, istatistik ve sayısal grafik örneklerini denetler. Tarayıcı testleri yeni araçları hem ayrı hem konu içinde, 320–1440 px ve açık/koyu temalarda kullanır. Bu otomasyon tüm fiziksel cihazların sertifikasyonu veya matematiksel kapsamın eksiksizliği anlamına gelmez.
