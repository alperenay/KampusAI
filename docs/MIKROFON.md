# Mikrofon ve ses tanıma — 1.50.0

## Önce mikrofonu test et

1. Yeni sürümü kur veya web sürümünü yenile.
2. **Yapay zekâ ayarları → Mikrofon → Mikrofonu test et** yolunu aç. Sesli Öğretmen ekranında da **Mikrofon testi** bulunur.
3. Test penceresinde başlat düğmesine bas ve izin ver.
4. “Mikrofon açık” yazısı ve konuşunca hareket eden seviye, cihazdan ses alınabildiğini gösterir. Test ses kaydetmez, hoparlörden çalmaz ve sunucuya göndermez.
5. Durdur veya pencereyi kapat. Ardından ilgili sesli aracı yeniden başlat.

Mikrofonun çalışması, konuşmayı metne dönüştüren hizmetin de kurulu/çalışır olduğunu göstermez. Android’in yerel hizmeti veya Web Speech kullanılamadığında, ses transkripsiyonunu destekleyen mevcut Gemini/KampüsAI sunucusu ayarıyla kayıt yolu seçilebilir. Bu yolda kayıt bitirildiğinde ses, seçili sağlayıcıya yazıya çevrilmek üzere gönderilir. Duraklatma ve ekranı kapatma kayıt göndermez. Yapay zekâ anahtarları değişmez; ayrı bir model kurulmaz.

## Mesajlar ne anlama geliyor?

| Mesaj | Kontrol |
|---|---|
| Erişim engellendi | Site/uygulama izni yanında işletim sisteminin mikrofon gizlilik ayarını kontrol et. Android’de genel mikrofon gizlilik anahtarının açık olduğundan emin ol. |
| Ses girişi bulunamadı | Mikrofon bağlantısını ve sistemin varsayılan giriş aygıtını kontrol et. Bu mesaj yalnız aygıt bulunamadığı bildirildiğinde kullanılır. |
| Başka uygulama/sürücü | Diğer kayıt ve görüşme uygulamalarını kapat; Bluetooth/USB bağlantısını veya varsayılan giriş seçimini kontrol edip yeniden dene. |
| Konuşma tanıma servisi yok | Cihazın ses tanıma hizmetini/dil paketini kontrol et veya ses transkripsiyonu destekleyen AI sağlayıcısını ayarla. Mikrofon iznini tekrar tekrar değiştirmek bir servis kurmaz. |
| Güvenli bağlantı gerekli | Kurulu uygulamayı, HTTPS web sürümünü veya localhost’u kullan. Düz HTTP ile açılan uzak ağ adresinde mikrofon API’si kapalı olabilir. |

## Yapılan teknik düzeltme

Android paketinin WebView ses yakalamasında eksik olan normal `MODIFY_AUDIO_SETTINGS` izni, mevcut `RECORD_AUDIO` iznine eklendi. Kullanılan [Capacitor 7.4 WebChromeClient](https://github.com/ionic-team/capacitor/blob/7.4.0/android/capacitor/src/main/java/com/getcapacitor/BridgeWebChromeClient.java) bu iki izni birlikte denetler. Bu normal izin için kullanıcıdan ayrı bir kayıt onayı istenmez; kayıt erişimi işletim sisteminin mevcut onayına bağlıdır.

Konuşma tanımayı desteklemeyen Android WebView, çalışan bir Web Speech servisi varmış gibi seçilmez. Web Speech sırasında ikinci bir mikrofon akışı açılmaz. Ses ölçüm modülleri ortak giriş ve hata ayrımını kullanır; askıya alınmış Web Audio bağlamları devam ettirilir. Eski Android konuşma olayları oturum kimliğiyle ayrılır, geç gelen izin iptal edilmiş kaydı başlatmaz.

## Doğrulama sınırı

Birim testleri izin/hata ayrımı, ayar geri dönüşü, iptal, servis geri dönüşü ve oturum kimliğini sınar. Tarayıcı senaryolarında mikrofon ve kayıt sağlayıcısı kontrollü test girdileriyle çalıştırılır; bu testler kişinin fiziksel mikrofonu veya gerçek konuşma tanıma doğruluğu için sertifika değildir. Android yayın testinde kurulu paketin gerekli izinleri içerdiği de kontrol edilir.
