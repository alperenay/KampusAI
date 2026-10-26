# Öğretmen gerekçe değerlendirme paneli

KampüsAI 1.38.0; önceki gerekçe/eminlik, ipucu ve araştırma geliştirmelerini öğretmen geri bildirimiyle birleştirir. Panel **Sınıf (Öğretmen) → Öğretmen gerekçe değerlendirmesi** ve **Tüm araçlar** altında bulunur.

## Öğrenci → öğretmen → öğrenci

1. Öğrenci normal konu testini tamamlar. Sonuçta **Gerekçelerimi öğretmene gönder** düğmesine basar. Araştırma sonucunda da aynı düğme vardır.
2. Paylaşım açıklamasını okuyup takma katılımcı kodunu girer. Bu işlem soruları, cevapları, gerekçe metinlerini/seçimlerini, eminliği, ipucu düzeyini ve süreleri açıkça paylaşır.
3. Oluşan QR parçaları/kodlar veya aktarım JSON dosyası öğretmene verilir. Büyük paketlerde dosya/kod yolu daha pratiktir.
4. Öğretmen **Öğretmen gerekçe değerlendirmesi → Kod / dosya al** veya QR tarama ile isteği alır.
5. Her soru açıldığında öğrencinin cevabı, gerekçesi, eminliği, ipucu sayısı, süresi ve özgün adaptif izi görülür. Cevap anahtarı ayrıca açılır.
6. Öğretmen her uygun gerekçede **kavramsal doğruluk**, **cevapla mantıksal bağlantı**, **açıklık/yeterlilik** ölçütlerine 0 (yetersiz), 1 (kısmi), 2 (yeterli) verir; isteğe bağlı açıklama ekler. Boş seçimler sıfır sayılmaz. **Kaydet** ile değerlendirme sürümlenir.
7. **Değerlendirmeyi öğrenciye gönder** ile QR/kod/dosya üretilir. Öğrenci kendi **Öğretmen gerekçe değerlendirmesi** ekranından bu paketi alır. Önceden oluşturduğu özgün istek bu cihazda bulunmalıdır.

Her iki cihaz aynı yeni sürümü kullanmalıdır. Paketler mevcut `KAIR1;` taşımasını kullanır; eski sürümler yeni `review-request` ve `review-feedback` türlerini tanımaz.

## Puan ve state davranışı

`reviews` nesne deposu IndexedDB sürüm 9'da eklenir. Yereldir, otomatik eşitlemeye girmez; açık yerel yedeğe dahildir. `request:<hash>` kaydında sabit özgün soru/cevap görüntüsü, rol (öğrenci/öğretmen), değerlendirme revizyonu ve sonuç bulunur. Daha önceki sınıf (`KAI1;`) ve araştırma oturum/sonuç paketleri çalışmaya devam eder.

Değerlendirme ölçeği `reason-3x2-v1`dir. Üç ölçütün toplamı / 6, gerekçeye 0–1 kısmi kredi verir. Mevcut pedagojik puanın 25 puanlık gerekçe bileşeni bu krediyle hesaplanır. Öğretmen değerlendirmesi yoksa serbest metnin içeriği otomatik olarak doğru sayılmaz. Öğretmen kredisi kısmi olduğunda ayrıca kısmen geçerli gerekçe göstergesi gösterilir; bu bir bilimsel olarak doğrulanmış tanı ölçeği değildir.

- **Normal test:** Öğrenci geri bildirimi aldığında `questions[].observation.teacherAssessment`, testin metabilişsel özeti ve adaptif bitiş göstergesi yeniden hesaplanır. Özgün cevap, doğru/yanlış/boş, test tarihi ve sorular korunur. Öğretmen verisi sonraki başlangıç zorluğunu, hâkimiyet haritasını ve günlük tekrar önerisini etkileyebilir. Mevcut isteğe bağlı eşitleme açıksa güncellenen normal test diğer cihazlara gider.
- **Araştırma testi:** Öğretmen puanı yalnız `reviews` içinde ek değerlendirmedir. Özgün `research` sonucu, grup karşılaştırması ve kişisel ilerleme değiştirilmez; sonradan yapılan değerlendirmenin A/B çıktısına karışması önlenir.
- **Uyumsuz/eski paket:** Soru/cevap görüntüsü eşleşmiyorsa geri bildirim uygulanmaz. Aynı değerlendirme tekrar alındığında ikinci kez uygulanmaz. Daha eski veya aynı revizyonda farklı içerik reddedilir.

QR sağlama toplamı imza/şifreleme veya öğretmen kimlik doğrulaması değildir. Değerlendirmeyi kimin yaptığı uygulama tarafından kriptografik olarak doğrulanmaz. Uygulama güvenli, yüksek riskli sınav sistemi olarak sunulmaz.

## Üretim ve Hap Kartlar iyileştirmeleri

Normal test artık dört küçük istekle 12 soruluk bir seçim havuzu hazırlar: ilk üç soru dengeli zorlukta, sonraki üç parti üçer sorudur. On soru adaptif olarak seçilir; aynı zorluk tükenirse en yakın kullanılmamış soru seçilir. İlk üç doğrulanmış soru önizlenir. Sağlayıcı token akışı canlılık bildirir; yarım JSON soru olarak gösterilmez. Prompt yalnız ilgili kısa içerik ve kompakt şema taşır.

Açık uçlu yazılı 3+2+2 partide yedi soru üretir. Puanlar 15+15+15+15+15+15+10'dur; her sorunun tam/kısmi/sıfır ölçütü tutarlı oluşturulur. İlk sorular taslak olarak gösterilir; tamamlanmamış sınav kaydedilmez. Tam sınav hazır olunca mevcut sınav ekranına geçilir. Ekran değişimi ve iptal ağ isteğini durdurur. Test ve yazılıdaki doğrulanmış partiler aynı sayfa oturumunda yeniden denemede 10 dakikalık, en çok sekiz işlik bellek önbelleğinden devam edebilir. Uygulama yeniden açılınca üretim önbelleği korunmaz.

Hap Kartlar'da boş destede **Konu seç ve kart ekle**, çalışılacak kart varsa **Çalışmaya başla**, günlük sıra bittiyse **Kartları incele** gösterilir. İnceleme kart puanını veya tekrar tarihini değiştirmez. Geçiş animasyonu azaltılmış hareket tercihine uyar.

## Doğrulama kapsamı

- `npm run lint`: JavaScript sözdizimi, kaynak referansları ve eski iOS regex uyumu.
- `npm test`: mevcut çalışma, araştırma/gerçek QR çizici-okuyucu, AR, fizik, kavram ve 725 kazanım kontrolleri; ayrıca öğretmen değerlendirmesi ve partili üretim kontrolleri.
- `npm run test:teacher-review-ui`: iki ayrı öğrenci/öğretmen profili; serbest metin, ölçüt zorunluluğu, QR geri bildirimi, tekrar aktarım, profil/adaptif güncelleme ve Hap Kartlar eylemleri.
- `npm run test:generation-ui`: ilk üç soru önizlemesi, gerçek sayım ilerlemesi, iptal/yeniden deneme, rota değişiminde iptal ve 7 soru/100 puan yazılı.
- `npm run test:all-features-ui`: bütün araç/rota açılışları, her deney ve oyun; 127 rota × iki boyut = 254 açılış kontrolü. Yönlendirmeler ayrı kaydedilir. Bu sayı tüm düğmelerin veya canlı servislerin işlevsel doğrulandığı anlamına gelmez.
- Mevcut `test:study-ui` ve `test:research-ui`: adaptif test, öneri, çevrimdışı iki cihazlı araştırma ve veri göçü.

Tarayıcı senaryoları yapay zekâ için sentetik sabit yanıtlar kullanır. Kamera/mikrofon optiği, fiziksel iOS/Android, Safari/WebKit ve gerçek modelin eğitimsel doğruluğu ayrıca doğrulanmalıdır. Windows/Android/Linux paketleri ve açılışları mevcut GitHub yayın iş akışında ayrıca sınanır. Test raporları ve ekran görüntüleri `dist/qa` altında oluşur; kaynak commit'lerine eklenmez.
