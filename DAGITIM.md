# KampüsAI'ı uyarısız dağıtmak

Uygulama Google Play ve Microsoft Store dışından indirildiğinde iki uyarı çıkabilir:

| Uyarı | Nedeni | Kalıcı çözüm |
|---|---|---|
| Android: **Google Play Protect — "Uygulama, cihazınızı korumak için engellendi"** | Google bu geliştiricinin uygulamasını daha önce görmedi; eski APK'lar herkese açık hata ayıklama anahtarıyla imzalıydı | Kendi yayın anahtarı (yapıldı) + Play Protect incelemesi + Google'a geliştirici kaydı |
| Windows: **"Windows kişisel bilgisayarınızı korudu"** (SmartScreen) | Kurulum dosyası kod imzalı değil ve henüz "itibar" kazanmadı | Microsoft Store (ücretsiz, uyarıyı tamamen kaldırır) ya da kod imzalama sertifikası |

## Yapılanlar (kodda)

- **Android sürüm (release) derlemesi:** APK artık hata ayıklanabilir (debuggable) değil. Play Protect bunu riskli sayıyordu.
- **Kendi kalıcı imza anahtarımız:** `tools/sign-apk.sh`, GitHub gizli değerlerinde `ANDROID_KEYSTORE_B64` ve `ANDROID_KEYSTORE_PASS` varsa APK'yı `CN=KampusAI` anahtarıyla imzalar.
- **Bulunan hata:** 1.13.0 ve öncesindeki her APK, derleme sunucusunda **her seferinde yeniden üretilen rastgele bir hata ayıklama anahtarıyla** imzalanmıştı (1.9.0, 1.11.0, 1.12.1 ve 1.13.0'ın imzaları birbirinden farklı). Bu yüzden yeni sürüm eskisinin üzerine kurulamıyordu ve Google her sürümü "hiç görmediği bir geliştiriciden" sayıyordu. Artık her sürüm aynı anahtarla imzalanacak. Eski bir sürümden geçişte **bir kereliğine**: Ayarlar → Yedekle → eski uygulamayı kaldır → yenisini kur → yedeği geri yükle.
- **Windows kod imzası (isteğe bağlı):** `WIN_CSC_LINK` (.pfx, base64) ve `WIN_CSC_KEY_PASSWORD` gizli değerleri eklenirse kurulum dosyası otomatik imzalanır.
- **Microsoft Store paketi (isteğe bağlı):** Repo değişkenlerine (Settings → Secrets and variables → Actions → **Variables**) `MSSTORE_IDENTITY_NAME`, `MSSTORE_PUBLISHER`, `MSSTORE_PUBLISHER_NAME` girilince derleme bir `.appx` paketi de üretir (Actions → derleme → "msstore").
- **Sürüm notu:** Uyarı çıkarsa ne yapılacağı ve kurulumsuz web sürümü adım adım yazıldı.

## Ekibin yapması gerekenler

### 1. Android imza anahtarını GitHub'a ekle (2 dakika) — en önemlisi
Bilgisayarındaki `ders-asistani\imza-anahtari\OKU-BENI.txt` dosyasındaki adımlar: iki gizli değer (`ANDROID_KEYSTORE_B64`, `ANDROID_KEYSTORE_PASS`).

### 2. Google Play Protect'e inceleme başvurusu (ücretsiz)
Form: https://support.google.com/googleplay/android-developer/contact/protectappeals
- APK bağlantısı: GitHub Releases sayfasındaki en son `KampusAI-x.y.z.apk`
- Paket adı: `com.dersasistani.app`
- Açıklama için örnek metin:
  > KampüsAI, lise öğrencileri için ücretsiz ve açık kaynaklı bir YKS çalışma uygulamasıdır (TÜBİTAK öğrenci projesi). Kaynak kodu: https://github.com/alperenay/ders-asistani. Uygulama kamera (soru fotoğrafı), mikrofon (sesli soru) ve bildirim (ders hatırlatıcısı) izni ister. İsteğe bağlı olarak cihazda çalışan açık kaynak yapay zekâ modeli (Gemma, llama.cpp) indirilebilir. Kişisel veri toplanmaz; kayıtlar cihazda saklanır. Uygulama yanlışlıkla engelleniyor; incelenmesini rica ederiz.

### 3. Android geliştirici doğrulaması (Google, 2026–2027)
Google, sertifikalı Android cihazlarda Play dışından kurulan uygulamalar için **geliştirici doğrulaması** getiriyor: Eylül 2026'da önce Endonezya, Singapur ve Tayland'da başlıyor; 2027'de tüm dünyaya yayılması planlanıyor. Türkiye'deki kullanıcılar için şimdilik zorunlu değil, ama 2027'den önce kayıt olmak gerekecek:
- **Sınırlı dağıtım hesabı:** ücretsiz, kimlik belgesi istemiyor, en çok **20 cihaza** dağıtım (öğrenciler ve küçük gruplar için; TÜBİTAK sunumu cihazlarına yeter).
- **Tam dağıtım:** Android Developer Console, tek seferlik 25 $.
- Ayrıntılar: https://support.google.com/android-developer-console/answer/16561738
- İstersen aynı hesapla uygulama **Google Play**'e de konabilir; Play'den kurulan uygulamada Play Protect uyarısı çıkmaz.

### 4. Windows: Microsoft Store (ücretsiz, uyarıyı tamamen kaldırır)
1. https://storedeveloper.microsoft.com adresinden ücretsiz bireysel geliştirici hesabı aç.
2. Partner Center'da "KampüsAI" adını ayır → **Product identity** sayfasındaki üç bilgiyi repo değişkenlerine gir:
   `MSSTORE_IDENTITY_NAME` (Package/Identity/Name), `MSSTORE_PUBLISHER` (Package/Identity/Publisher, `CN=...`), `MSSTORE_PUBLISHER_NAME` (Publisher display name).
3. Sonraki derlemede Actions'tan "msstore" paketini indirip Partner Center'a yükle. Store kendisi imzalar; Store'dan kurulan uygulamada SmartScreen uyarısı çıkmaz.

### 5. Windows: Store dışı kurulum dosyası için
- **SignPath Foundation** açık kaynak projelere ücretsiz kod imzası verir (başvuru gerekir): https://signpath.org
- Microsoft'a yanlış pozitif bildirimi (itibar kazanmayı hızlandırır): https://www.microsoft.com/en-us/wdsi/filesubmission → "Software developer" → dosya: `KampusAI-Kurulum-x.y.z.exe`.
- Not: Microsoft'a göre ücretli sertifikalar (OV/EV) bile uyarıyı hemen kaldırmaz, itibar zamanla oluşur. Uyarıyı kesin olarak kaldıran yol Microsoft Store'dur.

### 6. Pardus (Linux)
- Her sürümde `KampusAI-x.y.z-pardus-amd64.deb` ve `KampusAI-x.y.z-x86_64.AppImage` derlenir. Paket Debian 12 (Pardus 23 temeli) içinde `apt` ile kurulup açılarak test edilir (`ci-sonuc-linux` dalı).
- İnternetsiz yapay zekâ motoru (llama.cpp) paketin içinde gelir; Debian 12'de derlendiği için Pardus 23 ve 25'te çalışır. Ekran kartı varsa Vulkan ile hızlanır (`mesa-vulkan-drivers` önerilen bağımlılıktır).
- 12 GB'tan az bellekli bilgisayarlarda (okul bilgisayarı, ETAP akıllı tahta) uygulama "Hafif" modeli (Gemma 4 E2B, ~3,4 GB) önerir.
- ETAP akıllı tahtada arayüz %125 büyütülmüş açılır; Ctrl + / Ctrl − / Ctrl 0 ile yakınlaştırma ayarlanır ve hatırlanır.
- Pardus Yazılım Merkezi'ne başvuru için: https://www.pardus.org.tr (paket adı `kampusai`, kategori Eğitim).

## Kullanıcıya anlatılacak kısa yol (sunum ve sürüm notunda var)
- **Android:** "Diğer ayrıntılar → Yine de yükle". Yalnızca "Anladım" çıkarsa: Play Store → profil → Play Protect → ⚙ → "Uygulamaları Play Protect ile tara"yı kurulum süresince kapat.
- **Windows:** "Ek bilgi → Yine de çalıştır".
- **Pardus:** `.deb` dosyasına çift tıkla → "Yükle". Uçbirimden: `sudo apt install ./KampusAI-x.y.z-pardus-amd64.deb`. Uyarı çıkmaz.
- **Hiç kurulum istemeyen yol:** https://alperenay.github.io/ders-asistani/ (Android'de Chrome → Ana ekrana ekle).
