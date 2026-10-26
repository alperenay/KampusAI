# Gerekçe, eminlik, kademeli ipucu ve çevrimdışı araştırma

1.38.0 değişiklikleri. Öğretmen gerekçe değerlendirmesi, güncel partili üretim ve IndexedDB sürüm 9 için [Öğretmen paneli](TEACHER_REVIEW.md) belgesine bakın. Aşağıdaki özgün araştırma sonucu izolasyonu korunur.

## Kullanım

### Normal çalışma

Konu testinde cevabı seçin, gerekçenizi belirtin ve %25 / %50 / %75 / %100 eminlik düğmelerinden birini işaretleyin. Gerekçe seçenekleri varsa birini seçin; eski veya gerekçe seçenekleri olmayan sorularda kısa metin yazın. Serbest metin içerik açısından otomatik puanlanmaz. **Boş bırak** hiçbir alanı doldurmadan sonraki soruya geçer.

İpucu düğmesi sırayla kavram hatırlatma, strateji/bağıntı ve çözümün başlangıcını açar. Üç ipucundan sonra kapanır. İpucu görülmeden önceki gerekçe/eminlik, hangi basamakların ne zaman açıldığı ve sorudaki geçen süre kaydedilir. Çözümler, beklenen gerekçeler ve aday pedagojik göstergeler test sonunda açılır.

### Öğretmen / araştırmacı

1. **Sınıf (Öğretmen) → Araştırma modu** veya **Tüm araçlar → Araştırma modu** yolunu açın.
2. **Oturum oluştur** ile ad, kazanım ve karşılaştırılacak özelliği seçin. İpucu veya adaptif akıştan yalnızca biri değişir.
3. 10–30 soruluk JSON paketi yapıştırın veya mevcut yapay zekâ bağlantısıyla bir taslak üretin. Taslağın doğru cevaplarını, gerekçe anahtarlarını ve üç ipucunun cevabı açığa çıkarmadığını inceleyin. İnceleme onayı olmadan oturum oluşturulmaz.
4. Oturumu QR parçaları, tüm kodların kopyası veya aktarım JSON dosyasıyla paylaşın. Çok parçalı QR'da ileri/geri düğmeleri kullanılır; alıcı bütün parçaları toplar. Dosya/kod aktarımı büyük paketlerde daha pratiktir.
5. Öğrenci **Kod / dosya al** veya **Araştırma QR'ı okut** ile paketi alır, sabit bir takma katılımcı koduyla katılır. Otomatik A/B ataması aynı oturum ve kod için sabittir. Grup büyüklüklerinin eşit olması garanti edilmez.
6. Öğrenci testi internet olmadan tamamlar. **Araştırma sonucunu paylaş** ile sonuç QR/kod/dosyasını öğretmene verir. Öğretmen oturum paketine sahip olmalı; sonuçlar bu paketle yeniden hesaplanır.
7. Grup tablosu doğruluk, ipucusuz doğruluk ve pedagojik puanı gösterir. **Sonuç verisini indir** analiz için katılımcı bazlı ölçüm ve ham gözlemleri JSON olarak dışa aktarır. Bu analiz dosyası, QR aktarım dosyasından farklıdır; aktarım için ilgili **Oturumu paylaş / Araştırma sonucunu paylaş** düğmesini kullanın.

Araştırmacı katılımcı kodlarını önceden sabitlemelidir. Öğrencinin yeni kod seçerek başka gruba geçmesi teknik olarak engellenmez; sistem kimlik doğrulayan bir sınav altyapısı değildir. Aynı oturum ve kod için bir tamamlanmış sonuç kabul edilir. Oturumu yeniden uygulamak için yeni oturum oluşturun. Yarım QR aktarımı yeniden açılışta sürer; yarım test oturumu kaldığı sorudan devam etmez.

## Modüller ve veri modeli

- `App.metacognition`: gerekçe şeması, gözlem modeli, puanlama, göstergeler ve ortak giriş/sonuç bileşenleri.
- `App.scaffolding`: üç basamaklı ipucunun doğrulanması, gösterilmesi ve tüketim izi.
- `App.adaptive`: isteğe bağlı öğrenme kanıtı ile zorluk güncellemesi; eski çağrı imzaları çalışır.
- `App.research`: sürümlü oturum, sabit grup ataması, sonuç doğrulama, paketleme/parçalama ve yerel kayıtlar.
- `App.researchUi`: mevcut router/modal/tema ve `App.pairing.renderQR` / `scan` üzerinden kullanıcı arayüzü.

Örnek soru:

```json
{
  "q": "Soru metni",
  "options": ["A seçeneği", "B seçeneği", "C seçeneği", "D seçeneği", "E seçeneği"],
  "answer": 0,
  "difficulty": 2,
  "explain": "Test sonunda gösterilen çözüm",
  "reasonOptions": ["Geçerli gerekçe", "Yanılgı 1", "Yanılgı 2"],
  "reasonAnswer": 0,
  "hints": ["Kavramı hatırlat", "Stratejiyi belirt", "İlk işlemi başlat"]
}
```

`answer` ve `reasonAnswer` sıfır tabanlıdır. Normal testte gerekçe seçenekleri isteğe bağlıdır. Araştırma paketinde karşılaştırılabilir puanlama için seçmeli gerekçe ve üç incelenmiş ipucu zorunludur. Normal soru doğrulayıcı eski JSON sorularını da kabul eder. Yapay zekâ geçerli ipucu üretemezse normal testte genel çalışma yönlendirmeleri kullanılır; çözüm metni otomatik olarak ipucuna dönüştürülmez. Araştırma paketinde bu eksiklik reddedilir.

`App.quiz.generatePool`, yerel modelin mevcut 8k bağlamını gereksiz büyütmemek için her zorluktan 10 soruluk üç parti ister. Her partinin zorluk etiketi doğrulanır, yetersiz parti bir kez yeniden istenir ve havuzda tekrar eden sorular elenir. En az 10 toplam soru ve her zorlukta en az iki soru olmadan test başlatılmaz. Kabul edilen partiler en az dört sorudur; hedef 30 soru olmakla birlikte eksik fakat geçerli üretimlerde daha küçük bir havuzdan 10 soru seçilebilir. Bu yaklaşım tek büyük yanıta göre model isteği sayısını artırır.

Her soru gözlemi:

```json
{
  "confidence": 75,
  "reasonChoice": 0,
  "reasonText": "",
  "hintLevel": 1,
  "hintEvents": [{"level": 1, "atMs": 1200}],
  "beforeHint": {"confidence": 50, "reasonChoice": null, "reasonText": ""},
  "elapsedMs": 18000
}
```

Normal testte gözlem `quizzes.questions[].observation`, özet `quizzes.metacognition` alanında saklanır. Mevcut test, yanlış defteri, yedekleme ve isteğe bağlı eşitleme akışı korunur. Sınıfın eski `KAI1;` özetine isteğe bağlı `p: {n, i}` eklenir: son on değerlendirilmiş testte soru sayısı ve ipucusuz doğruluk. Eski kodlar okunmaya devam eder.

IndexedDB sürümü 7'den 8'e çıkarılır; tek yeni nesne deposu `research` eklenir. Kayıt türleri:

- `session:<id>`: incelenmiş ortak banka ve deney parametreleri.
- `join:<sessionId>:<participant>`: bu cihazdaki katılım.
- `result:<sessionId>:<participant>`: ham gözlem ve yeniden hesaplanan sonuç.
- `transfer:<hash>:<total>`: henüz tamamlanmamış aktarım parçaları.

`research`, `SYNC_STORES` listesinde bulunmaz; mevcut açık yedekleme/dışa aktarmaya dahildir. Deney testi `quizzes`, `mistakes`, `progress`, rozetler veya günlük plan state'ine yazmaz; kişisel geçmişten başlangıç seviyesi almaz. Araştırma scriptleri ve menü bağlantıları çıkarılırsa normal metabilişsel test/ipucu akışı çalışmaya devam eder; boş araştırma deposu etkisizdir.

## Puanlama (kural sürümü 1)

Bu göstergeler araştırma için açık ve tekrar üretilebilir kurallardır; psikometrik olarak doğrulanmış ölçek veya klinik/eğitsel teşhis değildir.

- Doğruluk: doğru / toplam; boşlar toplamda kalır.
- İpucusuz doğruluk: doğru ve hiç ipucu almamış / toplam. Bu oran tek başına gerekçenin doğruluğunu göstermez.
- Gerekçe doğruluğu: yalnızca anahtarı olan ve seçilen gerekçelerde doğru / değerlendirilmiş gerekçe sayısı. Serbest metin veya eksik gerekçe bu paydaya girmez.
- Eminlik uyumu: `1 - (eminlik/100 - doğruluk)^2`. Eminliği bulunmayan veya boş sorular bu ortalamaya girmez. Bu değer güven kalibrasyonuna ilişkin betimsel bir Brier uyum ölçüsüdür.
- İpucu desteği katsayısı: basamak 0→1, 1→0.85, 2→0.65, 3→0.45.
- Soru pedagojik puanı: doğru cevaba `60 × destek katsayısı`, doğru seçmeli gerekçeye 25, eminlik uyumuna `15 × uyum` puan verilir. Mevcut bileşenlerin azami puanına bölünüp 100'e ölçeklenir. Serbest gerekçede gerekçe bileşeni çıkarılır. Boş cevap 0'dır. Toplam puan soru puanlarının ortalamasıdır; farklı gerekçe biçimlerinin puanlarını doğrudan karşılaştırmayın.
- Adaptif öğrenme kanıtı: yanlış/boş için 0; doğru için destek katsayısı. Seçmeli gerekçe hatalıysa bu kanıt ayrıca 0.5 ile çarpılır. Serbest gerekçe değerlendirilmediğinden doğru/yanlış varsayılmaz.

`App.adaptive.update` dördüncü parametrede bu kanıtı kullanır; `result` dördüncü parametrede gözlemleri kabul eder. Klasik zorluk ağırlıklı doğruluk `score` korunur, kanıt ağırlıklı değer `supportedScore` olarak ayrıca döner. Yetenek değişimi ikincisini esas alır. Hâkimiyet haritası ve günlük öneriler, yeni testlerde ipucusuz doğruluk ile ortalama öğrenme kanıtının düşük olanını kullanarak temkinli bir tekrar sinyali üretir. Eski testlerde mevcut doğru/toplam hesabı korunur.

Gösterge sınıfları: bilinçli doğru göstergesi, ipucuyla doğru, düşük eminlikte şans eseri doğru adayı, doğru şık/hatalı gerekçe, emin ama yanlış kavram yanılgısı adayı, bilgi eksiği adayı ve henüz değerlendirilmemiş doğru gerekçesi. Yalnızca eminliğe bakılarak tahmin veya kavram yanılgısı kesinleştirilmez.

## Deney parametreleri ve analiz sınırı

Desteklenen karşılaştırmalar:

| Değişken | A | B | Ortak koşullar |
| --- | --- | --- | --- |
| `hints` | İpucu yok | Üç basamaklı ipucu | Sabit soru sırası, ortak banka, 10 soru, gerekçe/eminlik, test sonunda çözüm |
| `adaptive` | Sabit soru sırası | Adaptif seçim | İpucu yok, ortak banka, başlangıç yeteneği 2, 10 soru, gerekçe/eminlik, test sonunda çözüm |

Seed oturum oluşturulurken cihazın güvenli rastgele sayı üretecinden alınır. Oturum seed'i ve katılımcı kodunun sabit hash'inin paritesi grubu belirler. Atama tekrar üretilebilir; blok randomizasyonu, denge veya körleme sağlanmaz.

Tablo katılımcı başına ortalamaları ve B−A doğruluk farkını gösterir. Adaptif akışta gruplar farklı sorular görebileceğinden ham doğruluk farkı tek başına öğrenme etkisi değildir. Nedensel değerlendirme için araştırma protokolünde ortak bağımsız ön/son test, benzer çalışma süresi, uygun örneklem ve analiz ayrıca düzenlenmelidir. Sistem kendiliğinden p-değeri, anlamlılık veya başarı iddiası üretmez. Süreler duvar saatiyle sorunun açılışından itibaren ölçülür; arka plan/ara verme süreleri otomatik olarak çıkarılmaz.

## QR / yerel aktarım

Zarf: `{v:1, type:"session"|"result", data:...}`. UTF-8 JSON, base64url'e çevrilir; 640 karakterlik parçalara bölünür:

```text
KAIR1;<8 haneli sağlama toplamı>;<0 tabanlı parça>;<toplam parça>;<base64url parçası>
```

Kodlanmış paket en çok 100.000 karakterdir. Alıcı boyut, sürüm, sıra, parça sayısı ve sağlama toplamını doğrular. Sırasız/tekrarlı parçalar kabul edilir; farklı paketler karıştırılmaz. Yarım aktarımlar 24 saat boyunca ve en çok sekiz paketlik yerel önbellekte tutulur. Sonuçlarda soru sırası, benzersiz soru indisleri, eminlik ölçeği, gerekçe indisleri, ipucu basamak/zaman izleri ve A/B politikasına uygunluk doğrulanır. Metrikler oturum bankasından yeniden hesaplanır; aktarılan bir puan alanına güvenilmez.

Tekrar gelen aynı sonuç yeni katılımcı oluşturmaz. Aynı oturum veya katılımcı kimliğine farklı içerik gelirse önceki kayıt değiştirilmez. Sonucu alan cihaz önce oturum paketini almalıdır. QR çizimi ve kamera okuması mevcut `App.pairing` ve paketlenmiş qrcode-generator/jsQR kitaplıklarını kullanır. Kod/dosya yolu kameraya ihtiyaç duymaz.

Sağlama toplamı FNV-1a ile iletim bozulmasını bulur; kriptografik imza, şifreleme, kaynak doğrulama veya hile önleme sağlamaz. Oturum paketinde cevap anahtarı da bulunduğundan bu sistem güvenli yüksek riskli sınav uygulaması olarak kullanılmamalıdır. Araştırma aktarımında ad, sohbet, fotoğraf veya serbest gerekçe metni taşınmaz; takma katılımcı kodu, cevaplar, gerekçe indisleri, eminlik ve ipucu/süre izleri taşınır. Katılımcı kodları yine de başka kayıtlarla ilişkilendirilebileceğinden anonimlik garantisi verilmez.

## Doğrulama ve Git

```sh
npm run lint
npm test
npm run build
npm run test:study-ui
npm run test:research-ui
```

İlk üç komut ek npm bağımlılığı istemez. Tarayıcı kontrolleri kurulu Playwright ve tarayıcı gerektirir; Windows'ta Edge kullanılır. Gerçek QR çizici ve okuyucuyla sentetik piksellerden çözümleme, sırasız/tekrarlı/bozuk paketler, yeniden açılışta parça toplama, iki cihaz arasında oturum/sonuç aktarımı ve grup politikasına aykırı sonuç reddi sınanır.

Tarayıcı senaryoları: iki izole profil, öğretmen/öğrenci arayüzü, ağ kapalıyken araştırma testi, üç ipucu, zorunlu gerekçe/eminlik, tekrar sonuç aktarımı, normal öğrenci/sınıf özeti, IndexedDB v7→v8 veri koruma ve 320–1440px / iki tema. Kamera optiği, fiziksel Android/iPhone, Safari/WebKit ve gerçek modelin eğitimsel doğruluğu bu testlerin kapsamı dışındadır. İpucu sızıntısını azaltan şema kontrolleri anlamsal doğruluğu garanti etmez; araştırma paketini öğretmen incelemelidir.

İlk dört geliştirme commit'ine öğretmen paneli, performans, Hap Kartlar ve genişletilmiş regresyon commit'leri eklenir. Mevcut `Baslat.bat` değişikliği bu geliştirmeye dahil edilmez. Yayın, testlerden sonra mevcut GitHub Actions akışıyla yapılır.
