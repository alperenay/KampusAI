# KampüsAI STEM v2 — deneysel model kartı

**Sonuç:** Yerel olarak eğitilen ve seçilen aday, kullanıcının önceki dar eğitimli modelinden daha iyi sayısal/protokol skoru aldı. **Temiz Qwen2.5-3B temel modelini geçemedi.** Bu nedenle ürün içinde deneysel olarak etiketlenir; uzman öğretmen, güvenilir otomatik notlandırıcı veya genel müfredatta doğrulanmış çözüm motoru olduğu iddia edilmez.

## Model ve eğitim

- Temel: `Qwen/Qwen2.5-3B-Instruct`, revizyon `aa8e72537993ba99e69dfaafa59ed015b17504d1`; yaklaşık 3,09 milyar parametre. **Built with Qwen.**
- Özgün kullanıcı modeli ve verisi değiştirilmedi. Önce kullanıcı modelinden devam eğitimi iki ayrı aşamada denendi. Dar eğitimin üstüne eklenen adayların genellemesi kötü kaldığından aynı Qwen tabanının temiz yerel kopyasında ayrı LoRA eğitimi çalıştırıldı.
- Son veri: 2.127 eğitim örneği; 72 yeni müfredat ailesi, bunların eğitim/doğrulama/test ayrımı ve 217 doğrulanmış özgün örnek. Ham veri 24.000 kayıt, 3.807 farklı kayıttı. [Tam yöntem ve sınırlamalar](STEM_DATASET.md).
- Donanım: RTX 5070 12 GB. BF16; LoRA r=16/alpha=32, 7.372.800 eğitilebilir parametre; yalnız asistan yanıtlarına loss. Etkin batch=8, learning rate 3e-5. İlk dalda 2 epoch, özgün beceri konsolidasyonunda 1 epoch ve temiz taban dalında 1 epoch gerçekten çalıştırıldı. Seçilen model **temiz taban dalındaki bir epoch** eğitimin adaptörüdür; önceki dallar bu modele eklenmiş sayılmaz.
- Tam adaptör kuvveti genellemeyi azalttı. Eğitilen adaptörün güncelleme kuvveti 0,2'ye küçültülerek ayrı aday oluşturuldu. Bu, temel modelin yeniden etiketlenmesi değildir; gerçek eğitimli LoRA güncellemesi kontrollü kuvvetle birleştirilmiştir.
- Q4 adayında ölçülen kayıp nedeniyle dağıtım **Q8_0** seçildi. Dosya boyutu 3.285.475.872 bayttır. Kaynak GGUF yaklaşık 6,18 GB idi. İndirme parçalarının ve birleşik dosyanın SHA256 değerleri [manifestte](stem-model-manifest.json) bulunur.
- Lisans: [Qwen RESEARCH LICENSE](MODEL_LICENSE_QWEN.txt), ticari olmayan araştırma/değerlendirme. [Değişiklik bildirimi](MODEL_NOTICE.txt).

## Değerlendirme protokolü

32 doğrulama sorusunda aday seçildi. Seçimden sonra model sabitlenip 48 ayrılmış nihai soruda ölçüldü; nihai test skorlarına göre yeniden eğitim/aday seçimi yapılmadı. Temiz temel model ayrıca kontrol olarak ölçüldü. Her derste nihai 12 soru vardır; bu küçük sentetik örneklem tam müfredatı temsil etmez.

Sorular, hesaplanan hedef değerler ve formül aileleriyle ayrılır. Doğrulamada biyolojik olarak anlamlı çift kromozom sayısını sağlamak için dört S-evresi sorusu düzeltilip bütün adaylar aynı düzeltilmiş sorularla yeniden ölçüldü; eğitim dosyasının SHA256 değeri değişmedi. Eğitim günlüklerindeki loss kayıtları erken pilot kümesine aittir; yayınlanan ortak sayısal karşılaştırma düzeltilmiş kümedendir. İlk pilotta 256 token ve açık olmayan hedef birimler adaletsiz kesilme/birim farkları oluşturdu; karşılaştırma **bütün modeller için aynı protokol 3** ile yeniden yapıldı: açık hedef birim, 512 çıktı tokeni, 2.048 bağlam, temperature=0 ve seed=42.

Skor, yanıtın açık **Sonuç** satırındaki sayının hedefe %0,1 toleransla uymasıdır. Ara işlemde doğru sayının geçmesi sayılmaz. Bu ölçüt hem sayıyı hem yanıt protokolüne uyumu ölçer; bütün mantıksal adımları veya birimleri otomatik doğrulamaz. Sembolik olarak doğru ama son sayıyı yerine koymayan cevap yanlış sayılabilir. Dolayısıyla aşağıdaki oranlar gerçek sınav doğruluğu olarak kullanılamaz.

| Model | Doğrulama (32) | Nihai test (48) |
|---|---:|---:|
| Kullanıcının önceki `soru-asistani` modeli | 14 / 32 | 14 / 48 (%29,17) |
| Temiz `qwen2.5:3b` kontrolü | 19 / 32 | **30 / 48 (%62,50)** |
| Seçilen eğitimli, kuvvet=0,2, Q8 aday | **19 / 32** | 21 / 48 (%43,75) |

| Ders | Önceki model | Seçilen aday | Temiz temel model |
|---|---:|---:|---:|
| Matematik | 3 / 12 | 5 / 12 | 8 / 12 |
| Fizik | 5 / 12 | 7 / 12 | 9 / 12 |
| Kimya | 1 / 12 | 4 / 12 | 3 / 12 |
| Biyoloji | 5 / 12 | 5 / 12 | 10 / 12 |

Önceki modele göre +7 doğru / 48 soru, +14,58 yüzde puan gözlendi. Bu, küçük bir örneklemde gözlenen sonuçtur; istatistiksel üstünlük veya temel modele karşı ince ayar kazanımı kanıtı değildir. **İnce ayarın temiz temel modeli geliştirdiği gösterilemedi.** TÜBİTAK çalışmasında olumlu/olumsuz sonuçlar birlikte sunulmalıdır. İyileştirme için daha zengin gerekçeler, bağımsız uzman kontrolü ve daha geniş, önceden belirlenmiş gerçek soru değerlendirmesi gerekir.

## Gerçek uçtan uca kontroller

- Kimlik doğrulamalı servis + gerçek seçili Ollama modeli + tarayıcı çözüm kartları ve KaTeX akışı çalıştırıldı.
- Dört dersin smoke örneğinde dört istek tamamlandı; üçünde açık sayısal sonuç eşleşti. Biyoloji yanıtı başlangıç sayısını yerine koymadan `N=N_0·8` verdi; bu cevap sayısal protokolü karşılamadığı için başarılı sayılmadı.
- Gerçek CPU EasyOCR, 480/960/1920 px görsellerde denklemin sayıları korunarak çalıştı; düşük çözünürlükte metinde hatalar görüldü. Bu nedenle OCR sonrası metin onayı zorunlu akış olarak bırakıldı.
- Model metin tabanlıdır; doğrudan vision, geometri şekli anlama veya el yazısı doğruluğu iddiası yoktur.
- Otomatik UI testleri 320–1440 px, iki tema, dört ders, iptal, medya akışının kapatılması ve profil/araştırma verisinin değişmemesini sınar. Fiziksel kamera ve Safari/WebKit testi yapılmış sayılmaz.

## Dağıtım kararı

Araştırma için eğitilmiş model ayrı ve açık lisansıyla yayımlanır. Uygulamanın mevcut genel asistan motoru veya adaptif değerlendirmesi bu modele geçirilmez. Sayısal Asistan kendi servisini kullanır; otomatik not veya araştırma metriği yazmaz. Kullanıcı, servis ortamında `STEM_MODEL=qwen2.5:3b` ile ölçümlerde daha iyi çıkan temiz kontrolü açıkça seçebilir; bu seçimde yanıtın özel eğitimli modelden geldiği iddia edilmez ve bağlantı ekranı gerçek model adını gösterir. Sessiz model değiştirme/bulut fallback'i uygulanmaz.
