# KampüsAI 1.64

Bu güncelleme sesli öğretmen tahtasını, daha sade AI çalışma alanını, isteğe bağlı ekran yüklemeyi ve içerik genişletmelerini tek sürümde birleştirir.

## Kullanım

1. **AI çalışma alanı:** Bir başlangıç şablonu seç, metnini düzenle ve gönder. Favori ekleme, sıralama ve kişisel şablonlar aynı cihazda saklanır. Yeni tasarım mevcut açık/koyu tema, renk, yazı ve hareket tercihlerini kullanır.
2. **Sesli öğretmen:** Mikrofonu başlat, sorunu söyle veya Gönder'e bas. Yanıt okunurken çözüm tahtasında ilgili adım açılır. Sustur/Bitir sesi ve devam eden isteği keser. Ses kullanılamazsa tamamlanan yanıt okunabilir kalır. Bu özellik gerçek zamanlı insan öğretmen değildir; AI yanıtını kontrol et.
3. **Bilim ve Sensör Laboratuvarı:** Aynı bölümde **Vatandaş Bilimi Ağı** ve **Gökyüzü Modu** sekmelerini kullan. Eski bağlantılar yeni alt sayfalara yönlenir. Ölçümün gerçek donanım mı simülasyon mu olduğunu kontrol et.
4. **Yaşayan Tarih Haritası:** 16 dönemden birini seç veya yılı kaydır. 18 şehir referansı, ticaret/sefer katmanları ve olay işaretleri birlikte incelenebilir. Yakınlaştırdıktan sonra sürükle veya haritaya odaklanıp ok tuşlarını kullan. Arama, tür ve ±yıl filtresiyle olayları daralt; ikinci dönemle karşılaştır. Olayı açıp çalışma listene kaydet veya JSON çalışma dosyasını indir.
5. **Konu anlatımları:** 9, 10 ve 11. sınıflara dörder; 12. sınıfa 35 özgün ek öğrenme hedefi eklendi. Toplam 855 konu kaydı bulunur. 12. sınıf İngilizcede eksik Human Rights ve Manners temaları tamamlandı.
6. **Formül Defteri:** 32 yeni kartla 221 kayıt bulunur. Kullanım koşulları, değişken/birim notları, konu bağlantıları ve yeni kartlarda ilgili açık ders kitabı referansı gösterilir.

**Canlanan Ders Kitabı** ekranı ve ona özgü kod, rota kaydı, menü girdileri ve kullanım rehberi kaldırıldı. Diğer kamera, grafik ve modelleme araçları korunur.

## İçeriğin kapsamı ve kaynaklar

Ek hedeflerin `EK.` kodları **yerel öğrenme hedefleridir; MEB'in yeni yayımladığı kazanım kodları değildir**. Kaynak verideki açık kimlikler korunmalı; yeni kayıt eklerken eski kimlikleri yeniden numaralandırma. Kod eşleşmesiyle resmî kapsamın tamamlandığı iddia edilmez. 2026–2027 yılında TYMM 9–11. sınıflarda kademeli uygulanırken 12. sınıfta mevcut program sürer. Okul türüne ve yılın güncel programına göre öğretmenle kontrol gerekir.

- [MEB 2026–2027 kademeli uygulama açıklaması](https://tymm.meb.gov.tr/taslak-cerceve-planlari/ortaogretim)
- [MEB program kataloğu](https://mufredat.meb.gov.tr/Programlar.aspx); her ek notta ilgili ders bağlantısı bulunur.
- [Yeniden üretilebilir ek hedef verisi](../curriculum/enrichment-1.64.json). Açıklama ve örnekler bu uygulama için yazıldı; ders kitabı metinleri kopyalanmadı. Açık erişim telifsiz lisans anlamına gelmez.
- [OpenStax Calculus](https://openstax.org/details/books/calculus-volume-1), [University Physics](https://openstax.org/details/books/university-physics-volume-1), [Chemistry](https://openstax.org/details/books/chemistry-2e): matematik, birim ve geçerlilik koşulları için açık ders kitabı başvuruları. Yeni kartlarda ilgili kitabın bağlantısı bulunur.
- [TDV Osmanlılar](https://islamansiklopedisi.org.tr/osmanlilar), [TBMM tutanakları](https://www.tbmm.gov.tr/kutuphane-tutanaklara-erisim): yeni tarih kesitlerinin başvuru kaynakları. Haritadaki çokgenler **yaklaşık olay odaklarıdır**, kesin tarihî egemenlik sınırları değildir. Günümüz kıyı/ülke altlığı tarihî sınır kanıtı sayılmaz. Kaynak dosyası eşlenmemiş eski olay özetleri ayrıca etiketlenir.

Notlar ve formüller şema, bağlantı, hesap örneği ve KaTeX açısından kontrol edildi. Bağımsız öğretmen incelemesi veya öğrenme etkisi araştırması yapılmış gibi sunulmaz. Kaynakça, tartışma ve karşılaştırma özellikleri doğrulama alışkanlığını destekler.

## Performans ve güvenlik

- Ağ istekleri zaten asenkrondur. Darboğaz, her token için Markdown/KaTeX ve DOM üretiminin tekrarlanmasıydı. Paylaşılan AI katmanı yüksek sıklıklı metin bildirimlerini yaklaşık 80 ms aralıklarla birleştirir; son metni döndürmeden önce boşaltır, iptalde bekleyen bildirimi siler. Yapılandırılmış üretimde metin parçaları kaybolmadan birleştirilir; JSON doğrulaması ve sınırlı tekrar korunur.
- 59 betik/veri dosyası ilk ekran açılışından çıkarılıp ilgili bölümün ilk ziyaretine taşındı. Bağımlılıklar sırayla, her dosya yalnız bir kez yüklenir. Eksik indirme sonraki ziyarette yeniden denenebilir.
- AI yanıtı sürerken önemsiz hafıza indeksleme başlatılmaz. Sohbet ekranının eski isteğine ait gecikmiş çizim yeni yanıtı ezmez. Sesli tahta metin değişmedikçe tekrar ayrıştırılmaz.
- Kayıtlı/içe aktarılan ders HTML'i izin listeli süzgeçten geçirilir. CSP satır içi betikleri ve olay işleyicilerini engelleyen ek savunmadır. Kullanıcının seçtiği AI servisleri ve yerel bağlantılar mevcut yapılandırmayı kullanır.
- Bu değişiklik sağlayıcının model hesaplama hızına, kota veya internet gecikmesine kesin hız garantisi vermez. Sentetik arayüz ölçümleri canlı model doğruluğu/TTFT ölçümü değildir.

## Geliştirici ve doğrulama

```sh
npm run build:enrichment
npm test
npm run lint
npm run type-check
npm run test:v164-ui
npm run test:audit-web
npm run build
```

Tam tarayıcı paketi Chromium, Firefox ve WebKit ile çalışır. Sensör/konuşma/AI senaryolarında kullanılan fixture'lar açıkça ayrılır; fiziksel Android/iPhone donanım sertifikasyonu veya tüm sağlayıcıların gerçek model doğruluğu iddia edilmez. GitHub yayını, platform derlemeleri ve paket açılış/kurulum kapılarının geçmesine bağlıdır. Son sürümden önce Ayarlar'dan yedek alınması önerilir.

### Yerel ölçüm (yayın öncesi)

Aynı Windows bilgisayarda headless Chromium, 412×915 görünüm, 4× CPU yavaşlatma; bir ısınma ardından beş tur medyanı. Ağ/model çıkarım hızı ölçümü değildir.

| Ölçüt | Yayımlanan 1.63 | 1.64 adayı |
|---|---:|---:|
| İlk rota kurulumu | 867 ms | 847 ms |
| DOMContentLoaded | 743 ms | 720 ms |
| İlk rota öncesi uzun görev toplamı | 130 ms | 141 ms |
| İlk rota öncesi betik sayısı | 167 | 113 |
| Açılış betik verisi | 3681 KB | 2201 KB |
| Tarayıcının bildirdiği JS heap | 10 MB | 7 MB |

Betik verisi yaklaşık %40 azaldı; bu koşulda ilk rota süresi belirgin bir sıçrama göstermedi ve uzun görev toplamı biraz arttı. Bunlar görünür splash'ın toplam süresi veya tüm cihazlar için hız garantisi değildir. Ayrı sentetik sağlayıcı testinde 200 küçük metin bildirimi 2–3 UI bildirimine birleştirildi; son metin korundu ve girdi/zamanlayıcılar çalışmaya devam etti. Gerçek sağlayıcı TTFT’sinin aynı oranda azaldığı iddia edilmez.
