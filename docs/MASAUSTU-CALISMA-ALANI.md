# Masaüstü çalışma alanı

1100 px ve üzerindeki tarayıcı/Electron pencerelerinde beşli ana menü:
Konu Anlatımları → Deney Laboratuvarı → Yapay Zekâ → 3B Dünya Küresi → Ders Programı.
Yapay Zekâ ortada ve kalıcı ayrı vurguludur. Diğer bütün araçlar sol menüde korunur;
sol menü mevcut düğmeyle daraltılıp genişletilir. Dar pencere/mobilde mevcut güvenli
çekmece ve alt navigasyon kullanılır; beşli menü sıkıştırılarak gösterilmez.

Gösterge fare/fokusla önizlenir; rota ancak tıklama veya Enter ile değişir.
Sol/sağ ve Home/End odağı taşır. Doğrudan bağlantı/geri-ileri de etkin alanı günceller.
Beş ana alan dışındaki araçlarda yanlış aktif sekme gösterilmez.

Üstteki ayar simgesi Ayarlar ile aynı görünüm panelini açar. 12 renk paleti,
8 atmosfer, açık/koyu tema, tipografi ve yüzey stili ortak CSS değişkenlerini kullanır;
mevcut tercihler üzerine yeni sabit renk yazılmaz. Kalıcı depolama ve yedek davranışı
mevcut görünüm sistemiyle aynıdır.

Animasyonlar: 240 ms, taşmasız yumuşak sekme göstergesi, mevcut motorla 6 px mesafeli, 260 ms hafif kart girişi. Parıltı ve gölgeler azaltılmıştır.
Azaltılmış hareket/efekt kapalı tercihinde sekme animasyonu oynatılmaz. Arka planda
animasyon iptal edilir; boşta sürekli requestAnimationFrame döngüsü yoktur.
ResizeObserver yalnız menünün boyut değişimini izler. Yeni modül ek ağ/font/doku
indirmesi veya sürekli video/canvas dekorasyonu başlatmaz. Mobil GPU'ya yeni blur
katmanı eklenmez. Ders okuma modunda üst/yan menüler mevcut davranışla gizlenir.

`npm run test:desktop-workspace-ui`: sıra/rota/klavye/hover, 12 palet, görünüm kalıcılığı,
320–1920 px açık-koyu düzenler ve azaltılmış hareket. Tarayıcı motor testleri
fiziksel cihaz sertifikasyonu değildir.
