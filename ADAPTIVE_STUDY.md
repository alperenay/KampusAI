# Uyarlanan test ve günlük çalışma önerisi

Bu belge 1.37.0 temel akışını açıklar. 1.38.0 geliştirmesinde eklenen gerekçe/eminlik, ipucu etkisi, `research` deposu ve güncel puanlama kuralları için [Araştırma modu](RESEARCH_MODE.md) belgesine bakın; bu ek kurallar aşağıdaki eski veri modeli ve hâkimiyet hesabını genişletir.

## Mimari ve state

Yeni bağımlılık veya state kütüphanesi eklenmedi. Modüller mevcut IIFE / `App.*` düzenini kullanır. `App.adaptive` saf seviye hesaplamalarını, `App.study` günlük öneri ve kartın yaşam döngüsünü yönetir. Mevcut `App.quiz`, `App.today.suggestion` ve asistan rotaları korunur.

Yeni veri deposu ve IndexedDB sürüm değişikliği yoktur. Test kaydında eski alanlara ek olarak `adaptive: { version, startAbility, endAbility, level, score, path }` ve her soruda `difficulty` bulunur. Öğrencinin konuya ilişkin seviyesi bu kayıtlardan türetilir; kopya bir profil state'i tutulmaz. `quizzes` mevcut eşitleme/yedekleme kapsamındadır. Eski sonuçlar okunmaya devam eder; hâkimiyet haritası mevcut doğru/toplam hesabını kullanır.

## Test algoritması

1. Aynı konunun son beş sonucu, yeniler daha ağır olacak şekilde `1/(sıra+1)` ağırlıklarıyla birleştirilir. Adaptif sonuçta bitiş yeteneği; eski sonuçta `1 + 2 × doğru/toplam` kullanılır. Geçmiş yoksa başlangıç 2'dir.
2. Konu anlatımından 10 kolay, 10 orta, 10 zor soru istenir. Doğrulayıcı tekrarlanan soru, aynı şıklar, geçersiz cevap ve geçersiz zorluk etiketlerini eler. En az 10 geçerli soru ve her zorlukta en az iki soru yoksa bir kez yeniden üretim denenir, sonra tekrar deneme ekranı gösterilir.
3. Her adımda yeteneğin yuvarlanmış değerine en yakın kullanılmamış soru seçilir. İstenen zorluk tükenmişse en yakın diğer zorluğa geçilir. Test tam 10 sorudur; havuzdaki her soru gösterilmez.
4. `beklenen = 1/(1+exp(zorluk-yetenek))`; yeni yetenek `yetenek + 0.8 × (başarı-beklenen)` olup 1–3 arasında sınırlanır. Boş cevap başarısız olarak işlenir, sonuç sayımında ayrıca boş tutulur. Sonraki soruya geçildikten sonra önceki cevap değiştirilemez.
5. Standart başarı `doğru/toplam`; ayrıca gösterilen zorluk ağırlıklı başarı `100 × doğru soruların zorluk toplamı / tüm soruların zorluk toplamı`dır. Bu ikinci ölçü standartlaştırılmış sınav puanı veya psikometrik ölçüm değildir. Zorluklar modelin etiketlerine dayanır; gerçek öğrenci verisiyle kalibre edilmemiştir.

Sonuçların kaydı tamamlanmadan çözümler açılmaz. Kayıt hatasında son cevap kilitli kalır; aynı oturumdaki tekrar denemeler başarılı yanlış kayıtlarını tekrarlamaz ve aynı test kimliğini kullanır. Test ortasında uygulamayı kapatınca oturumun devam ettirilmesi bu değişikliğin kapsamında değildir.

## Günlük öneri

Son konu testi, hâkimiyet haritası, çözülmemiş yanlışlar, tamamlanan konular ve bugünün program blokları cihazda okunur. Son testte düşük başarı, zayıf konular ve unutulmaya başlayan konular öncelik alır. Bugün en son testinde en az %70 başarı sağlanan konular aynı gün tekrar önerilmez. Yeni konular seçili sınıftan (`curGrade`) seçilir; ölçülmüş eski sınıf eksikleri korunur. Bilinen bir kök eksik varsa önce o konuya yönlendirilir.

Devam eden bloğun kalan süresi veya sonraki bloğa kalan zaman kullanılır; boş programda varsayılan 20 dakikadır. 15 dakikadan kısa aralıkta veya belirgin konu eksiğinde özet/örnek tekrarı, diğer durumda 10 soruluk test önerilir. Zaman aralığı, testin o sürede tamamlanacağını garanti eden bir süre tahmini değildir. Öneri üretimi modele veya ağa başvurmaz; teste başlamak mevcut yapay zekâ bağlantısını kullanır.

Ana sayfa ve Bugün aynı kartı kullanır. Bugün ekranındaki önceki ayrı konu önerisi ve günlük görev kartı birleştirildi; öğrenme haritasının günlük görev özelliği korunur. Yeni kayıtlar, eşitleme ve dakika değişimi kartı günceller; sayfadan çıkışta dinleyiciler ve zamanlayıcılar temizlenir. Boş veri ve yükleme hatası için eylem içeren durumlar vardır.

## UI ve doğrulama

`css/study.css` mevcut tema renklerini kullanır. Yeni bileşenler 4px tabanlı boşluklar, ortak başlık/gövde ölçüleri, görünür klavye odağı, durum duyuruları ve en az 44px dokunma alanları kullanır. Dar ekranda eylemler alt alta yerleşir; uzun metinler sarılır, matematik ifadeleri gerektiğinde kendi alanında kaydırılır. Genel uygulama navigasyonu ve modal tasarımı korunur.

- `npm run lint`: JavaScript sözdizimi, HTML kaynak referansları, eski iOS düzenli ifade uyumu. ESLint yapılandırması yoktur; bu komut bağımlılıksız statik kontrolleri çalıştırır.
- `npm test`: seviye/öneri motoru kontrolleri ve mevcut AR, fizik, kavram, 725 kazanım içerik kontrolleri.
- `npm run build`: ortak web paketi ve çevrimdışı önbellek listesi. Yeni dosyalar mevcut paketleme tarafından otomatik dahil edilir.
- `npm run test:study-ui`: Playwright üzerinden ana sayfa/Bugün için 320, 375, 390, 768, 1440px; test ekranı için 320, 390, 768, 1440px ve iki tema. Yükselen/düşen zorluk, yanlış defteri, boş cevap, kayıt hatasında tekrar ve IndexedDB kalıcılığı. Testte dış ağ kapalıdır, model yerine sabit soru havuzu kullanılır. Ekran görüntüleri `dist/qa` altındadır.
- Gerçek model çıktısının eğitimsel doğruluğu, gerçek cihaz Android/iOS/WebKit davranışı ve EXE/APK/IPA dağıtım paketleri bu yerel kontrollerle doğrulanmış sayılmaz. Ortak web build'i doğrulanır; mevcut GitHub dağıtım akışı korunur.

Playwright proje bağımlılığı olarak eklenmedi. Geliştirici ortamında kurulu olması veya `NODE_PATH` üzerinden erişilmesi gerekir. Windows dışında Playwright Chromium kullanılır; `STUDY_BROWSER` ile tarayıcı kanalı belirtilebilir.

## Sürüm ve commit grupları

Bu geliştirmeler KampüsAI 1.37.0 sürümü kapsamında aşağıdaki modüler commit gruplarına ayrılır. Kaynak klasöründe `.git` bulunmadığından GitHub bağlantısı üzerinden mevcut `main` geçmişi korunarak aktarılır. `dist/` çıktıları kaynak commit'lerine eklenmez; mevcut dağıtım iş akışı kurulum paketlerini oluşturur.

1. `feat: adaptive-testing`: `js/modules/adaptive.js`, `js/modules/quiz.js`; `index.html` içindeki adaptif script referansı ve `js/i18n/{tr,en}.js` içindeki `adaptive.*` metinleri.
2. `feat: daily-study-recommendation`: `js/modules/study-recommender.js`, `js/modules/today.js`, `js/modules/ai-assistant.js`; `index.html` içindeki öneri script referansı ve `js/i18n/{tr,en}.js` içindeki `study.*` metinleri.
3. `style: ui-simplification`: `css/study.css` ve `index.html` içindeki stylesheet referansı.
4. `test: study-engines-and-build-checks`: `package.json`, `tools/study-check.mjs`, `tools/study-ui-check.mjs`, `tools/syntax-check.mjs`, `tools/compat-check.mjs`, `tools/content-check.mjs`, `.github/workflows/build.yml`, `README.md`, `ADAPTIVE_STUDY.md`. Mevcut iki kontrolün dosya yolu hesabı Windows ve Türkçe klasör adlarında çalışacak şekilde `fileURLToPath` ile düzeltildi.

Yayın sürümü `.github/workflows/build.yml` içindeki `APP_VERSION` ve kök `package.json` içinde 1.37.0 olarak belirlenir. Yerelde `npm run lint`, `npm test`, `npm run build` ve iki temalı tarayıcı kontrolleri geçmiştir. `main` güncellemesi mevcut GitHub Actions akışını başlatır; web/iPhone yayını ve Windows, Android, Linux paketlerinin durumu ilgili Actions çalışmasından doğrulanır.
