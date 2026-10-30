# İleri Düzey Bilim ve Sensör Laboratuvarı

Menüde **Bilim ve Sensör Laboratuvarı**, araç kataloğunda tam adıyla bulunur.
Tek giriş: `#/bilim-lab`. Eski deney, sensör, telefon fiziği ve sismograf bağlantıları
ilgili alt bölüme yönlenir. Sabitlenen/son kullanılan araçlar tek girişe taşınır;
deney favorileri, görev işaretleri, filtreler ve sensör ölçüm geçmişi korunur.

## Bölümler ve kullanım

1. **Başlangıç:** yapmak istediğin çalışma türünü seç; donanım ve veri açıklamasını oku.
2. **Deney Kataloğu:** mevcut 82 simülasyonu ders, sınıf, arama ve favorilerle filtrele.
   İlgili konu sayfalarındaki deney bağlantıları da aynı kataloğa açılır.
   Parametreler, 2B/3B, sesli grafik ve mevcut desteklenen AR/hologram seçenekleri korunur.
3. **Sensör Ölçümü:** beş rehberli deneyden birini veya **Çoklu sensör** kartını aç.
   İvmeölçer, jiroskop, ışık, manyetometre, ses, doğrusal ivme veya yönelim seç.
   Kaynağı **Gerçek cihaz** ya da **Simülasyon** olarak açıkça belirle, eşiği gir ve Başlat.
   Zaman, büyüklük ve histogram görünümlerini incele. Durdur; CSV/JSON indir.
   İki örnekten itibaren **x eksenini raporla** tek kanalı Dokümanlar'a gönderir;
   tam üç eksen için JSON dışa aktarımını kullan. Ses/ışık gibi skaler kanallarda x ana değerdir.
4. **Fizik Ölçümleri:** ses uçuş süresi, yankı, Doppler, sarkaç ve hareket araçlarını kullan.
   Cihaz, elle veri ve örnek sinyal kaynakları farklı etiketlenir.
   Zaman eşleştirmesi ve belirsizlik kontrollerini atlama; QR kodun aktarım süresi ölçüm değildir.
5. **Titreşim ve Sismograf:** cihazın üç eksenini kaydet veya eğitim sinyalini yükle.
   Filtre/eşik, yaklaşık frekans ve istasyon daireleri oyununu incele; veriyi indir veya rapora gönder.
6. **Yeni Deneyler:** aşağıdaki dört yeni kuramsal çalışmada parametreyi değiştir ve **Modeli hesapla**.
   Her hesap 201 nokta, açık formül, varsayımlar, düşünme sorusu ve inceleme noktası üretir.
   CSV/JSON indir veya **Dokümanlarda raporla** seç. Değişen parametre yeniden hesaplanmadan dışa aktarılamaz.

| Yeni deney | Hesap ve sınır |
| --- | --- |
| RC şarjı | V=V₀(1−e^(−t/RC)); kΩ→Ω ve µF→F dönüşümü, 0–5RC. İdeal boş kondansatör. |
| Newton soğuması | T=Tₐ+(T₀−Tₐ)e^(−kt), 0–5/k. Sabit ortam ve k; telefon termometresi kullanılmaz. |
| Yarı ömür | N/N₀=2^(−t/t½), beş yarı ömür. Büyük topluluğun beklenen oranı; tek atom rastlantısı değil. |
| Malus yasası | I/I₀=cos²θ, 0–180°. İdeal analizör ve doğrusal polarize giriş; lux ölçümü değil. |

Yeni modeller mevcut 82 deneyin yerine geçmez; aynı modül altında dört ek çalışma sunar.
Hesaplar yerelde, çevrimdışı ve AI servisi olmadan çalışır.

## Kayıt ve platform davranışı

- Bölüm değişimi aktif mikrofon/sensör kaydını kapatır. Arka plana alınan sensör kaydı durur;
  geri dönünce kullanıcı yeniden başlatır. İzin sonradan verilse bile ayrılmış ekran cihazı bırakır.
- Canlı ham kayıtlar bu ekrandan çıkmadan indirilmelidir; yeni ham kayıt arşivi oluşturulmaz.
  Önceden kaydedilen rehberli ölçüm özetlerinin mevcut `meta` kayıtları korunur.
- Web/PWA için HTTPS veya localhost ve izin gerekir. Electron/Capacitor'da işletim sistemi
  izni, cihaz ve WebView desteği belirleyicidir. İzin verilmesi donanım bulunduğunu kanıtlamaz.
- Işık/manyetometre her cihazda sunulmaz. Desteklenmeyen kanal otomatik olarak sahte
  ölçüme çevrilmez; kullanıcı ayrı simülasyon kaynağını seçer.
- Ses seviyesi kalibre edilmemiş **dBFS**'dir, **dB SPL** değildir. Rehberli kamera parlaklığı
  lux olarak sunulmaz. Sismograf **deprem erken uyarısı, büyüklük veya risk tespiti yapmaz**.

## Mimari ve doğrulama

`science-lab.js` tek rota, sekme kabuğu ve eski tercihler göçünü yönetir. Deney, sensör,
fizik ve titreşim motorları ayrı modüller olarak kalır; tek UI'dan çağrılır ve temizlikleri
router'a geri iletilir. `science-lab-model.js` DOM'dan bağımsız dört deterministik modeldir.
Dokümanlar raporu mevcut `discovery:labData` şemasını kullanır; normal test, öğrenci
puanı veya araştırma A/B kayıtlarına yazmaz.

- `npm run test:science-lab`: birim dönüşümü, başlangıç/son değerler, sınır/aralık denetimi,
  kaynak etiketi, eski rota ve favori göçü.
- `npm run test:science-lab-ui`: 60 açık/koyu mobil/tablet/masaüstü düzeni; modellerin
  dışa aktarımı, rapor geçişi, eski bağlantılar, hatalı girdi ve geç izin temizliği.
- Sensör testleri kontrollü tarayıcı olaylarıdır; fiziksel cihaz kalibrasyonu veya gerçek
  Android/iOS donanım testinin yapıldığı iddia edilmez. Native paket yayınından önce
  hedef cihazda mikrofon, hareket, arka plan ve izin reddi kontrolleri ayrıca uygulanır.
