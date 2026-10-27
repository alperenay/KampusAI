# KampüsAI

Ders programı, konu anlatımı, TYT-AYT deneme takibi, yazılı sınavlar, formül defteri, hologram öğretmenle İngilizce konuşma pratiği ve yapay zeka asistanı: Windows, Pardus/Linux, Android ve iPhone.

- **İndir:** [Son sürüm (Releases)](../../releases/latest): Windows için `.exe`, Pardus için `.deb` (diğer Linux'lar: `.AppImage`), Android için `.apk`
- **iPhone:** Safari'de bu deponun GitHub Pages adresini aç → Paylaş → Ana Ekrana Ekle
- **Kurulum ve kullanım:** [BENIOKU.md](BENIOKU.md)

Yapay zeka: cihaza indirilen Gemma 4 (internetsiz), bilgisayardaki Ollama modelleri ya da internetten Google Gemini / OpenAI-uyumlu servisler.

## Sayısal Asistan — deneysel özel model

Matematik/Fizik/Kimya/Biyoloji için kamera veya galeriden soru, CPU OCR, düzenlenebilir metin ve akışlı KaTeX çözüm kartları. Özel model kendi bilgisayarınızdaki kimlik doğrulamalı serviste çalışır; mobil ve web aynı servise bağlanır. [Kurulum](STEM_MODEL.md) · [Model kartı ve açık başarı/sınırlama tablosu](STEM_MODEL_CARD.md) · [Veri temizliği ve eğitim](STEM_DATASET.md).

Built with Qwen. Model ağırlıkları **ticari olmayan araştırma/değerlendirme** lisansındadır ve ayrı model paketinden kurulur. Eğitilen aday 48 sentetik nihai soruda önceki modele göre 14 → 21 doğru aldı; temiz temel modelin 30 doğrusunu geçemedi. Bu bir uzman doğruluğu veya gerçek sınav başarı iddiası değildir. Genel asistanın mevcut motoru bu modele geçirilmez.

## Kişisel çalışma akışı

- **Seviyeye uyarlanan test:** Her konu testi 10 sorudan oluşur. Başlangıç zorluğu aynı konudaki son beş testten hesaplanır; sonraki sorular cevaplarına göre kolaylaşır veya zorlaşır. Sonuçta doğru/yanlış/boş sayısı, zorluk ağırlıklı başarı ve tahmini seviye gösterilir. Yanlışlar mevcut yanlış defterine eklenir.
- **Bugün ne çalışmalıyım?** Ana sayfa ve Bugün ekranındaki tek eylem kartı; son testlerini, öğrenme haritandaki eksikleri, unutulan konuları ve ders programındaki zaman aralığını kullanarak test ya da konu tekrarı önerir. Yeni test üretmek için yapay zekâ gerekir; öneri hesaplaması cihazda yapılır.
- Test sonuçları mevcut yedekleme ve cihaz eşitlemesine dahildir. Ayrı hesap veya yeni veri deposu gerekmez.
- **Gerekçe ve eminlik:** Cevapla birlikte gerekçe ve %25–100 eminlik toplanır. Test sonunda aday pedagojik göstergeler ve ipucusuz doğruluk gösterilir; serbest metin gerekçesi otomatik doğru/yanlış sayılmaz.
- **Kademeli ipuçları:** Kavram, strateji ve çözüm başlangıcından oluşan üç basamak; destek kullanımı adaptif zorluğa ve günlük tekrar önerisine katılır.
- **Çevrimdışı araştırma:** Sınıf/Öğretmen ekranından aynı soru paketine dayalı ipucu veya adaptif akış karşılaştırması oluşturulur. Oturum ve sonuçlar parçalı QR, kod veya yerel dosyayla taşınır. Araştırma sonuçları normal çalışma geçmişine yazılmaz ve otomatik bulut eşitlemesine girmez.

Araştırma kullanımı, veri modeli, puanlama kuralları ve deney sınırları: [Araştırma modu](RESEARCH_MODE.md).

**Öğretmen gerekçe paneli:** Test sonucundan gerekçelerini öğretmene QR/kod/dosyayla gönder; öğretmen üç ölçütle puanlayıp geri bildirsin. Öğrenci sonucu aldığında normal öğrenme göstergeleri güncellenir; araştırmanın özgün A/B sonuçları korunur. [Kullanım ve puanlama](TEACHER_REVIEW.md).

Test/yazılı üretimi küçük partiler, ilk soruların önizlemesi, ilerleme ve iptal/yeniden denemeyle çalışır. Hap Kartlar'da boş desteden konu seçerek başlama ve takvimi değiştirmeyen inceleme eylemleri bulunur.

## Geliştirme kontrolleri

Node.js 22 veya üzeriyle, proje kökünde (ek npm paketi kurmadan):

```sh
npm run lint
npm test
npm run build
```

Yeni araştırma/QR kontrollerini ayrıca çalıştırmak için `npm run test:research`; iki cihazlı çevrimdışı tarayıcı akışı için `npm run test:research-ui` kullanılır. Tarayıcı testi Playwright ve tarayıcı gerektirir.

Web çıktısı `dist/web` klasörüne yazılır. İsteğe bağlı `npm run test:study-ui` kontrolü Playwright ve bir Chromium tarayıcısı gerektirir; Windows'ta Edge kullanır. Bu kontrol dış ağ isteklerini engeller ve yapay zekâ çıktısını sabit test verileriyle değiştirir.

Mimari, doğrulama kapsamı ve önerilen commit grupları: [Geliştirme notları](ADAPTIVE_STUDY.md).

Öğretmen ve üretim kontrolleri: `npm run test:teacher-review-ui`, `npm run test:generation-ui`. Bütün araç/deney/oyun ekranlarını taramak için `npm run test:all-features-ui`. Bu tarayıcı testleri Playwright gerektirir; canlı yapay zekâ, kamera ve mikrofon işlevlerini doğruladıkları varsayılmaz.
