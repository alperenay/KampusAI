# KampüsAI

Ders programı, konu anlatımı, TYT-AYT deneme takibi, yazılı sınavlar, formül defteri, hologram öğretmenle İngilizce konuşma pratiği ve yapay zeka asistanı: Windows, Pardus/Linux, Android ve iPhone.

- **İndir:** [Son sürüm (Releases)](../../releases/latest): Windows için `.exe`, Pardus için `.deb` (diğer Linux'lar: `.AppImage`), Android için `.apk`
- **iPhone:** Safari'de bu deponun GitHub Pages adresini aç → Paylaş → Ana Ekrana Ekle
- **Kurulum ve kullanım:** [BENIOKU.md](BENIOKU.md)

Yapay zeka: cihaza indirilen Gemma 4 (internetsiz), bilgisayardaki Ollama modelleri ya da internetten Google Gemini / OpenAI-uyumlu servisler.

## Kişisel çalışma akışı

- **Seviyeye uyarlanan test:** Her konu testi 10 sorudan oluşur. Başlangıç zorluğu aynı konudaki son beş testten hesaplanır; sonraki sorular cevaplarına göre kolaylaşır veya zorlaşır. Sonuçta doğru/yanlış/boş sayısı, zorluk ağırlıklı başarı ve tahmini seviye gösterilir. Yanlışlar mevcut yanlış defterine eklenir.
- **Bugün ne çalışmalıyım?** Ana sayfa ve Bugün ekranındaki tek eylem kartı; son testlerini, öğrenme haritandaki eksikleri, unutulan konuları ve ders programındaki zaman aralığını kullanarak test ya da konu tekrarı önerir. Yeni test üretmek için yapay zekâ gerekir; öneri hesaplaması cihazda yapılır.
- Test sonuçları mevcut yedekleme ve cihaz eşitlemesine dahildir. Ayrı hesap veya yeni veri deposu gerekmez.

## Geliştirme kontrolleri

Node.js 22 veya üzeriyle, proje kökünde (ek npm paketi kurmadan):

```sh
npm run lint
npm test
npm run build
```

Web çıktısı `dist/web` klasörüne yazılır. İsteğe bağlı `npm run test:study-ui` kontrolü Playwright ve bir Chromium tarayıcısı gerektirir; Windows'ta Edge kullanır. Bu kontrol dış ağ isteklerini engeller ve yapay zekâ çıktısını sabit test verileriyle değiştirir.

Mimari, doğrulama kapsamı ve önerilen commit grupları: [Geliştirme notları](ADAPTIVE_STUDY.md).
