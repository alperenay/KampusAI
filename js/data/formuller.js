/* =========================================================
   Formül Defteri verisi (v1.32) — Matematik, Fizik, Kimya · 9–12. sınıf
   Her kayıt: d (ders), g (sınıf), k (ünite/kazanım: konu sayfasına bağlantı), ad, tex (KaTeX),
   ne (ne zaman kullanılır), v (değişkenler ve birimler).
   Bağlantılar js/data/content/* içindeki ünite ve kazanım kimliklerine göredir; denetim: test_v38.
   ========================================================= */
(function () {
  const r = String.raw;
  const F = [];
  const add = (d, g, k, ad, tex, ne, v) => F.push({ d, g, k, ad, tex, ne, v: v || "" });

  /* ---------------- MATEMATİK ---------------- */
  const M = (g, k, ...a) => add("matematik", g, k, ...a);
  // 9. sınıf
  M("9", "t1/k1", "Üslü sayılarda çarpma ve kuvvetin kuvveti", r`a^m\cdot a^n=a^{m+n}\qquad (a^m)^n=a^{m\cdot n}`, "Tabanları aynı üslü sayıları çarparken ya da bir kuvvetin kuvvetini alırken.", "a ≠ 0 taban; m, n üs");
  M("9", "t1/k1", "Negatif ve rasyonel üs", r`a^{-n}=\frac{1}{a^n}\qquad a^{\frac{m}{n}}=\sqrt[n]{a^m}`, "Negatif üssü kesre, kesirli üssü köklü ifadeye çevirirken.", "a > 0 (çift kökte)");
  M("9", "t1/k1", "Köklü sayılarda çarpma ve bölme", r`\sqrt{a}\cdot\sqrt{b}=\sqrt{ab}\qquad \frac{\sqrt{a}}{\sqrt{b}}=\sqrt{\frac{a}{b}}`, "Köklü ifadeleri sadeleştirirken ve kök içine alıp çıkarırken.", "a, b ≥ 0; b ≠ 0");
  M("9", "t1/k1", "Paydayı kökten kurtarma", r`\frac{1}{\sqrt{a}-\sqrt{b}}=\frac{\sqrt{a}+\sqrt{b}}{a-b}`, "Paydada köklü ifade kaldığında eşleniğiyle genişleterek.", "a ≠ b");
  M("9", "t2/k2", "Mutlak değerli eşitsizlik", r`|x|<a \iff -a<x<a\qquad |x|>a \iff x<-a \;\text{veya}\; x>a`, "Mutlak değerli eşitsizliği aralık olarak çözerken.", "a > 0");
  M("9", "t2/k1", "Doğrunun eğimi", r`m=\frac{y_2-y_1}{x_2-x_1}=\tan\alpha`, "İki noktası bilinen doğrunun eğimini ya da eğim açısını bulurken.", "α: doğrunun x ekseniyle yaptığı açı");
  M("9", "t2/k1", "Doğru denklemi", r`y-y_1=m\,(x-x_1)`, "Bir noktası ve eğimi bilinen doğrunun denklemini yazarken.", "m: eğim; (x₁, y₁): doğru üzerindeki nokta");
  M("9", "t3/k1", "Üçgende açılar", r`\hat A+\hat B+\hat C=180^\circ\qquad \text{dış açı}=\text{komşu olmayan iki iç açının toplamı}`, "Üçgende bilinmeyen bir açıyı bulurken.", "");
  M("9", "t3/k1", "Üçgen eşitsizliği", r`|b-c|<a<b+c`, "Verilen uzunluklarla üçgen çizilip çizilemeyeceğini ya da bir kenarın alabileceği değerleri bulurken.", "a, b, c: kenar uzunlukları");
  M("9", "t4/k4", "Pisagor teoremi", r`a^2+b^2=c^2`, "Dik üçgende iki kenar bilindiğinde üçüncüsünü bulurken.", "c: hipotenüs (dik açının karşısı)");
  M("9", "t4/k4", "Öklid bağıntıları", r`h^2=p\cdot k\qquad b^2=k\cdot c\qquad a^2=p\cdot c`, "Dik üçgende hipotenüse indirilen yükseklik ve parçalar sorularında.", "h: hipotenüse ait yükseklik; p, k: hipotenüs parçaları");
  M("9", "t4/k4", "Thales teoremi", r`\frac{|AD|}{|DB|}=\frac{|AE|}{|EC|}\quad (DE\parallel BC)`, "Paralel doğruların kestiği kenarlarda orantı kurarken.", "");
  M("9", "t4/k2", "Benzer üçgenlerde oranlar", r`\frac{a}{a'}=\frac{b}{b'}=\frac{c}{c'}=k\qquad \frac{\text{Alan}}{\text{Alan}'}=k^2`, "Benzer üçgenlerde kenar, çevre ve alan oranlarını bulurken.", "k: benzerlik oranı");
  M("9", "t6/k1", "Aritmetik ortalama ve standart sapma", r`\bar x=\frac{\sum x_i}{n}\qquad s=\sqrt{\frac{\sum (x_i-\bar x)^2}{n-1}}`, "Bir veri grubunun merkezini ve yayılımını hesaplarken.", "n: veri sayısı");
  M("9", "t7/k1", "Olasılık", r`P(A)=\frac{s(A)}{s(E)}\qquad P(A')=1-P(A)`, "Eş olasılıklı bir deneyde bir olayın olasılığını bulurken.", "s(A): istenen durum sayısı; s(E): tüm durumlar");
  // 10. sınıf
  M("10", "t1/k1", "Dik üçgende trigonometrik oranlar", r`\sin\alpha=\frac{\text{karşı}}{\text{hipotenüs}}\quad \cos\alpha=\frac{\text{komşu}}{\text{hipotenüs}}\quad \tan\alpha=\frac{\text{karşı}}{\text{komşu}}`, "Dik üçgende bir açı ve bir kenardan diğer kenarları bulurken.", "");
  M("10", "t1/k1", "Temel trigonometrik özdeşlik", r`\sin^2\alpha+\cos^2\alpha=1\qquad \tan\alpha=\frac{\sin\alpha}{\cos\alpha}`, "Bir oran bilindiğinde diğerlerini bulurken ve ifadeleri sadeleştirirken.", "");
  M("10", "t1/k3", "Üçgenin alanı", r`A=\frac{a\cdot h_a}{2}=\frac{1}{2}\,b\,c\,\sin\hat A`, "Taban ve yükseklik ya da iki kenar ve aradaki açı bilindiğinde.", "");
  M("10", "t1/k3", "Heron formülü", r`A=\sqrt{u(u-a)(u-b)(u-c)}\qquad u=\frac{a+b+c}{2}`, "Yalnızca üç kenarı bilinen üçgenin alanını bulurken.", "u: yarı çevre");
  M("10", "t1/k4", "Sinüs teoremi", r`\frac{a}{\sin\hat A}=\frac{b}{\sin\hat B}=\frac{c}{\sin\hat C}=2R`, "İki açı ve bir kenar bilindiğinde ya da çevrel çember yarıçapı sorulduğunda.", "R: çevrel çemberin yarıçapı");
  M("10", "t1/k4", "Kosinüs teoremi", r`a^2=b^2+c^2-2bc\cos\hat A`, "İki kenar ve aradaki açıdan üçüncü kenarı ya da üç kenardan bir açıyı bulurken.", "");
  M("10", "t1/k2", "Kenarortay uzunluğu", r`V_a^2=\frac{2b^2+2c^2-a^2}{4}`, "Kenarları bilinen üçgende kenarortay uzunluğunu bulurken.", "V_a: a kenarına ait kenarortay");
  M("10", "t3/k1", "Pozitif bölen sayısı", r`n=p^a\,q^b\,r^c \;\Rightarrow\; (a+1)(b+1)(c+1)`, "Bir sayının kaç pozitif böleni olduğunu bulurken.", "p, q, r: asal çarpanlar");
  M("10", "t3/k1", "EBOB ve EKOK ilişkisi", r`\text{EBOB}(a,b)\cdot\text{EKOK}(a,b)=a\cdot b`, "İki sayının EBOB'u veya EKOK'u bilindiğinde diğerini bulurken.", "a, b pozitif tam sayı");
  M("10", "t4/k1", "Parabolün tepe noktası", r`r=-\frac{b}{2a}\qquad k=f(r)\qquad f(x)=a(x-r)^2+k`, "Karesel fonksiyonun en büyük / en küçük değerini ve simetri eksenini bulurken.", "f(x) = ax² + bx + c");
  M("10", "t4/k1", "Diskriminant ve kökler", r`\Delta=b^2-4ac\qquad x_{1,2}=\frac{-b\mp\sqrt{\Delta}}{2a}`, "İkinci dereceden denklemi çözerken ya da parabolün x eksenini kaç noktada kestiğini bulurken.", "Δ > 0 iki kök, Δ = 0 çift kök, Δ < 0 gerçek kök yok");
  M("10", "t4/k1", "Kökler toplamı ve çarpımı", r`x_1+x_2=-\frac{b}{a}\qquad x_1\cdot x_2=\frac{c}{a}`, "Kökleri bulmadan köklerle ilgili ifadeleri hesaplarken.", "");
  // 11. sınıf
  M("11", "u1/k1", "Doğrusal fonksiyon", r`f(x)=mx+n`, "Doğru orantılı ya da sabit hızla değişen nicelikleri modellerken.", "m: değişim oranı (eğim); n: başlangıç değeri");
  M("11", "u1/k2", "Ters orantı", r`y=\frac{k}{x}\qquad x\cdot y=k`, "Biri artarken diğeri aynı oranda azalan nicelikler için (işçi–gün, hız–zaman).", "k: orantı sabiti");
  M("11", "u1/k1", "İki nokta arası uzaklık", r`|AB|=\sqrt{(x_2-x_1)^2+(y_2-y_1)^2}`, "Koordinat düzleminde iki nokta arasındaki uzaklığı bulurken.", "");
  M("11", "u2/k1", "Dörtgenlerde alan", r`A_{\text{paralelkenar}}=a\,h\qquad A_{\text{yamuk}}=\frac{(a+c)\,h}{2}\qquad A_{\text{eşkenar dörtgen}}=\frac{e\,f}{2}`, "Özel dörtgenlerin alanını bulurken.", "e, f: köşegenler");
  M("11", "u2/k1", "Köşegenlerle dörtgen alanı", r`A=\frac{1}{2}\,e\,f\,\sin\theta`, "Herhangi bir dörtgende köşegenler ve aralarındaki açı biliniyorsa.", "θ: köşegenler arasındaki açı");
  M("11", "u3/k2", "Benzerlik ve Thales", r`\frac{|AD|}{|AB|}=\frac{|AE|}{|AC|}=\frac{|DE|}{|BC|}`, "Paralel doğrularla oluşan benzer üçgenlerde bilinmeyen uzunluğu bulurken.", "");
  M("11", "u4/k1", "Permütasyon", r`P(n,r)=\frac{n!}{(n-r)!}`, "Sıranın önemli olduğu dizilişleri saymak için (sıralama, şifre).", "n: eleman sayısı; r: seçilen");
  M("11", "u4/k1", "Kombinasyon", r`C(n,r)=\binom{n}{r}=\frac{n!}{r!\,(n-r)!}`, "Sıranın önemsiz olduğu seçimleri saymak için (takım, grup).", "");
  M("11", "u4/k1", "Tekrarlı permütasyon", r`\frac{n!}{n_1!\,n_2!\cdots n_k!}`, "Aynı harflerin bulunduğu kelimelerle ya da özdeş nesnelerle dizilişlerde.", "n₁, n₂: tekrar eden eleman sayıları");
  M("11", "u4/k2", "Birleşim olasılığı", r`P(A\cup B)=P(A)+P(B)-P(A\cap B)`, "\"A veya B\" olayının olasılığını bulurken.", "");
  M("11", "u4/k2", "Koşullu olasılık", r`P(A\mid B)=\frac{P(A\cap B)}{P(B)}`, "B olayının gerçekleştiği bilindiğinde A'nın olasılığını bulurken.", "A, B bağımsızsa P(A∩B) = P(A)·P(B)");
  // 12. sınıf
  M("12", "u1/k2", "Logaritma kuralları", r`\log_a(xy)=\log_a x+\log_a y\qquad \log_a\frac{x}{y}=\log_a x-\log_a y\qquad \log_a x^n=n\log_a x`, "Logaritmalı ifadeleri açarken ya da birleştirirken.", "a > 0, a ≠ 1; x, y > 0");
  M("12", "u1/k2", "Taban değiştirme", r`\log_a b=\frac{\log_c b}{\log_c a}\qquad a^{\log_a x}=x`, "Farklı tabanlı logaritmaları karşılaştırırken ya da hesap makinesiyle hesaplarken.", "");
  M("12", "u1/k3", "Üstel denklem", r`a^{f(x)}=a^{g(x)} \Rightarrow f(x)=g(x)\qquad a^x=b\Rightarrow x=\log_a b`, "Bilinmeyeni üste olan denklemleri çözerken (nüfus artışı, faiz, bozunma).", "");
  M("12", "u2/k1", "Aritmetik dizi", r`a_n=a_1+(n-1)\,d\qquad S_n=\frac{n\,(a_1+a_n)}{2}`, "Ardışık terimleri arasındaki fark sabit olan dizilerde.", "d: ortak fark");
  M("12", "u2/k1", "Geometrik dizi", r`a_n=a_1\,r^{\,n-1}\qquad S_n=a_1\,\frac{r^n-1}{r-1}`, "Ardışık terimlerin oranı sabit olan dizilerde (faiz, çoğalma).", "r: ortak çarpan (r ≠ 1)");
  M("12", "u3/k1", "Toplam–fark formülleri", r`\sin(a\pm b)=\sin a\cos b\pm\cos a\sin b\qquad \cos(a\pm b)=\cos a\cos b\mp\sin a\sin b`, "15°, 75° gibi açıların değerini bulurken ya da ifade sadeleştirirken.", "");
  M("12", "u3/k1", "Tanjant toplam formülü", r`\tan(a+b)=\frac{\tan a+\tan b}{1-\tan a\tan b}`, "İki açının toplamının tanjantı sorulduğunda (doğrular arası açı).", "");
  M("12", "u3/k1", "İki kat açı", r`\sin 2a=2\sin a\cos a\qquad \cos 2a=\cos^2 a-\sin^2 a=1-2\sin^2 a`, "Açının iki katını ya da yarısını içeren ifadelerde.", "");
  M("12", "u3/k2", "Trigonometrik denklemler", r`\sin x=\sin a \Rightarrow x=a+2k\pi \;\text{ veya }\; x=\pi-a+2k\pi`, "sin, cos, tan içeren denklemlerin tüm çözümlerini bulurken.", "k ∈ ℤ; cos x = cos a ⇒ x = ±a + 2kπ");
  M("12", "u4/k1", "Fonksiyon dönüşümleri", r`y=f(x-a)+b\qquad y=-f(x)\qquad y=f(-x)`, "Grafiği ötelerken (a birim sağa, b birim yukarı) ve eksenlere göre yansıtırken.", "");
  M("12", "u4/k1", "Orijin etrafında dönme", r`90^\circ:\ (x,y)\to(-y,x)\qquad 180^\circ:\ (x,y)\to(-x,-y)`, "Bir noktayı orijin etrafında saat yönünün tersine döndürürken.", "");
  M("12", "u5/k2", "Türevin tanımı", r`f'(x)=\lim_{h\to 0}\frac{f(x+h)-f(x)}{h}`, "Anlık değişim oranını ve teğetin eğimini bulurken.", "");
  M("12", "u5/k2", "Temel türev kuralları", r`(x^n)'=n\,x^{n-1}\qquad (f\cdot g)'=f'g+fg'\qquad \Big(\frac{f}{g}\Big)'=\frac{f'g-fg'}{g^2}`, "Polinom, çarpım ve bölüm fonksiyonlarının türevini alırken.", "");
  M("12", "u5/k2", "Zincir kuralı", r`(f\circ g)'(x)=f'(g(x))\cdot g'(x)`, "İç içe (bileşke) fonksiyonların türevini alırken.", "");
  M("12", "u5/k2", "Özel fonksiyonların türevi", r`(\sin x)'=\cos x\quad (\cos x)'=-\sin x\quad (e^x)'=e^x\quad (\ln x)'=\frac{1}{x}`, "Trigonometrik, üstel ve logaritmik fonksiyonların türevinde.", "");
  M("12", "u5/k2", "Teğet doğrusu", r`y-f(a)=f'(a)\,(x-a)`, "Bir eğriye verilen noktada çizilen teğetin denklemini yazarken.", "");
  M("12", "u5/k3", "Ekstremum koşulu", r`f'(x_0)=0,\ f''(x_0)<0\Rightarrow \text{yerel maksimum};\ f''(x_0)>0\Rightarrow \text{yerel minimum}`, "En büyük / en küçük değer (optimizasyon) problemlerinde.", "");
  M("12", "u6/k1", "Belirsiz integral", r`\int x^n\,dx=\frac{x^{n+1}}{n+1}+C\qquad \int\frac{1}{x}\,dx=\ln|x|+C`, "Türevi bilinen fonksiyonun kendisini bulurken.", "n ≠ −1; C: integral sabiti");
  M("12", "u6/k1", "Kısmi integrasyon", r`\int u\,dv=u\,v-\int v\,du`, "Çarpım biçimindeki (x·eˣ, x·sin x gibi) ifadelerin integralinde.", "");
  M("12", "u6/k2", "Belirli integral", r`\int_a^b f(x)\,dx=F(b)-F(a)`, "Eğri altındaki alanı ve toplam değişimi hesaplarken.", "F: f'nin bir ilkel fonksiyonu");
  M("12", "u6/k2", "İki eğri arasındaki alan", r`A=\int_a^b \big(f(x)-g(x)\big)\,dx`, "İki grafik arasında kalan bölgenin alanında.", "[a, b] aralığında f(x) ≥ g(x)");
  M("12", "u6/k2", "Dönel cismin hacmi", r`V=\pi\int_a^b f(x)^2\,dx`, "Bir bölgenin x ekseni etrafında döndürülmesiyle oluşan cismin hacminde.", "");
  M("12", "u7/k1", "Çemberin denklemi", r`(x-a)^2+(y-b)^2=r^2`, "Merkezi ve yarıçapı bilinen çemberin denklemini yazarken.", "M(a, b): merkez; r: yarıçap");
  M("12", "u7/k1", "Çemberin genel denklemi", r`x^2+y^2+Dx+Ey+F=0\;\Rightarrow\; M\Big(-\frac{D}{2},-\frac{E}{2}\Big),\ r=\frac{\sqrt{D^2+E^2-4F}}{2}`, "Genel denklemden merkez ve yarıçapı bulurken.", "");

  /* ---------------- FİZİK ---------------- */
  const P = (g, k, ...a) => add("fizik", g, k, ...a);
  // 9
  P("9", "u2/k4", "Bileşke vektör", r`R=\sqrt{A^2+B^2+2AB\cos\theta}`, "Aralarında açı olan iki vektörün bileşkesinin büyüklüğünü bulurken.", "θ: vektörler arası açı");
  P("9", "u2/k4", "Vektörün bileşenleri", r`A_x=A\cos\theta\qquad A_y=A\sin\theta`, "Bir vektörü yatay ve düşey bileşenlere ayırırken.", "θ: yatayla yapılan açı");
  P("9", "u2/k6", "Ortalama hız ve ortalama sürat", r`\bar v=\frac{\Delta x}{\Delta t}\qquad \text{sürat}=\frac{\text{alınan yol}}{\Delta t}`, "Yer değiştirme ile alınan yolu ayırarak hız sorularında.", "Δx: yer değiştirme (m); Δt: süre (s)");
  P("9", "u3/k2", "Özkütle", r`d=\frac{m}{V}`, "Maddeleri ayırt ederken ve sıvı basıncı, kaldırma kuvveti sorularında.", "d: g/cm³ ya da kg/m³");
  P("9", "u3/k1", "Katı basıncı", r`P=\frac{F}{A}`, "Bir yüzeye uygulanan kuvvetin oluşturduğu basınçta.", "P: Pa (N/m²); A: yüzey alanı (m²)");
  P("9", "u3/k2", "Sıvı basıncı", r`P=h\cdot d\cdot g`, "Durgun sıvının bir derinlikte yaptığı basınçta (kap şeklinden bağımsız).", "h: derinlik (m); d: sıvı özkütlesi; g: 10 m/s²");
  P("9", "u3/k5", "Kaldırma kuvveti (Arşimet)", r`F_k=V_{\text{batan}}\cdot d_{\text{sıvı}}\cdot g`, "Yüzen, askıda kalan ya da batan cisimlerde.", "Yüzen cisimde F_k = G");
  P("9", "u3/k7", "Süreklilik denklemi", r`A_1\,v_1=A_2\,v_2`, "Daralan borularda akışkanın hızının nasıl değiştiğini bulurken.", "A: kesit alanı; v: akış hızı");
  P("9", "u4/k3", "Isı alışverişi", r`Q=m\cdot c\cdot\Delta T\qquad C=m\cdot c`, "Sıcaklık değişimi için gereken ya da açığa çıkan ısıyı bulurken.", "c: öz ısı (J/g°C); C: ısı sığası");
  P("9", "u4/k4", "Hâl değişimi ısısı", r`Q=m\cdot L`, "Erime, donma, buharlaşma gibi sıcaklığın sabit kaldığı hâl değişimlerinde.", "L: erime / buharlaşma ısısı");
  P("9", "u4/k5", "Isıl denge sıcaklığı", r`T_{\text{denge}}=\frac{m_1c_1T_1+m_2c_2T_2}{m_1c_1+m_2c_2}`, "Farklı sıcaklıktaki maddeler karıştırıldığında (hâl değişimi yoksa).", "Q_alınan = Q_verilen");
  // 10
  P("10", "u1/k1", "Sabit hızlı hareket", r`x=v\cdot t`, "Hızı değişmeyen hareketlerde yol, hız ve süre ilişkisinde.", "Konum–zaman grafiğinin eğimi hızı verir");
  P("10", "u1/k2", "Bağıl hız", r`\vec v_{AB}=\vec v_A-\vec v_B`, "Bir cismin hareketini başka bir hareketli gözlemciye göre incelerken (karşılaşma, yetişme).", "v_AB: A'nın B'ye göre hızı");
  P("10", "u1/k3", "İvme", r`a=\frac{\Delta v}{\Delta t}`, "Hızın birim zamandaki değişimini bulurken.", "a: m/s²; hız–zaman grafiğinin eğimi");
  P("10", "u1/k4", "Sabit ivmeli hareket denklemleri", r`v=v_0+at\qquad x=v_0t+\frac{1}{2}at^2\qquad v^2=v_0^2+2ax`, "Düzgün hızlanan ya da yavaşlayan hareketlerde.", "v₀: ilk hız; x: yer değiştirme");
  P("10", "u2/k1", "İş", r`W=F\cdot x\cdot\cos\theta`, "Bir kuvvetin cisim üzerinde yaptığı işi bulurken.", "W: J; θ: kuvvet ile yer değiştirme arasındaki açı");
  P("10", "u2/k2", "Güç", r`P=\frac{W}{t}=F\cdot v`, "İşin ne kadar hızlı yapıldığını bulurken.", "P: W (watt)");
  P("10", "u2/k3", "Enerji türleri", r`E_k=\frac{1}{2}mv^2\qquad E_p=mgh\qquad E_{\text{yay}}=\frac{1}{2}kx^2`, "Hareket, yükseklik ve yay sıkışmasına bağlı enerjileri hesaplarken.", "k: yay sabiti (N/m)");
  P("10", "u2/k4", "Mekanik enerjinin korunumu", r`E_{k1}+E_{p1}=E_{k2}+E_{p2}`, "Sürtünmesiz ortamda cismin farklı noktalardaki hızını ya da yüksekliğini bulurken.", "Sürtünme varsa: kayıp = sürtünme işi");
  P("10", "u2/k5", "Verim", r`\eta=\frac{\text{yararlı enerji}}{\text{harcanan enerji}}\times 100`, "Makine ve enerji dönüşümlerinin ne kadar verimli olduğunu bulurken.", "");
  P("10", "u3/k2", "Elektrik akımı", r`I=\frac{q}{t}`, "Bir iletkenden birim zamanda geçen yük miktarında.", "I: A; q: C");
  P("10", "u3/k1", "Direnç", r`R=\rho\,\frac{L}{A}`, "Telin uzunluğu, kesiti ve cinsinin direnci nasıl etkilediğini bulurken.", "ρ: özdirenç; L: uzunluk; A: kesit alanı");
  P("10", "u3/k3", "Ohm yasası", r`V=I\cdot R`, "Devrede potansiyel fark, akım ve direnç ilişkisinde.", "V: volt; R: ohm");
  P("10", "u3/k3", "Elektriksel güç ve enerji", r`P=V\,I=I^2R=\frac{V^2}{R}\qquad W=P\cdot t`, "Lambaların parlaklığını ve harcanan elektrik enerjisini bulurken.", "");
  P("10", "u3/k4", "Seri ve paralel direnç", r`R_{\text{seri}}=R_1+R_2+\dots\qquad \frac{1}{R_{\text{paralel}}}=\frac{1}{R_1}+\frac{1}{R_2}+\dots`, "Birden fazla direnç içeren devrede eşdeğer direnci bulurken.", "");
  P("10", "u3/k5", "Üreteçlerin bağlanması", r`\varepsilon_{\text{seri}}=\varepsilon_1+\varepsilon_2+\dots\qquad \varepsilon_{\text{paralel}}=\varepsilon`, "Pillerin seri ya da paralel bağlandığı devrelerde.", "Paralelde özdeş üreteçler");
  P("10", "u4/k1", "Periyot ve frekans", r`f=\frac{1}{T}`, "Tekrarlayan hareketlerde bir salınımın süresi ile saniyedeki salınım sayısı arasında.", "T: s; f: Hz");
  P("10", "u4/k1", "Basit sarkaç ve yay periyodu", r`T=2\pi\sqrt{\frac{L}{g}}\qquad T=2\pi\sqrt{\frac{m}{k}}`, "Sarkacın ya da yaydaki kütlenin salınım süresini bulurken.", "L: ip boyu; m: kütle; k: yay sabiti");
  P("10", "u4/k2", "Dalga hızı", r`v=\lambda\cdot f`, "Dalga boyu, frekans ve yayılma hızı ilişkisinde.", "λ: dalga boyu (m)");
  P("10", "u4/k4", "Gerilmiş ipte dalga hızı", r`v=\sqrt{\frac{F}{\mu}}`, "Yay ya da ipteki atmanın hızının gerilmeye bağlılığında.", "F: gerilme kuvveti; μ: birim uzunluğun kütlesi");
  P("10", "u4/k5", "Su dalgalarında kırılma", r`\frac{v_1}{v_2}=\frac{\lambda_1}{\lambda_2}=\frac{\sin i}{\sin r}`, "Su dalgası derin–sığ ortam geçişinde (frekans değişmez).", "");
  // 11
  P("11", "u1/k1", "Serbest düşme", r`v=g\,t\qquad h=\frac{1}{2}g\,t^2\qquad v^2=2gh`, "Hava direncinin ihmal edildiği, ilk hızsız düşmelerde.", "g ≈ 10 m/s²");
  P("11", "u1/k1", "Düşey yukarı atış", r`t_{\text{çıkış}}=\frac{v_0}{g}\qquad h_{\max}=\frac{v_0^2}{2g}`, "Yukarı atılan cismin çıkış süresi ve maksimum yüksekliğinde.", "");
  P("11", "u1/k2", "Yatay atış", r`x=v_0\,t\qquad h=\frac{1}{2}g\,t^2`, "Yatay atılan cismin menzilini ve düşme süresini bulurken.", "Yatayda sabit hız, düşeyde serbest düşme");
  P("11", "u1/k2", "Eğik atış", r`R=\frac{v_0^2\sin 2\theta}{g}\qquad h_{\max}=\frac{v_0^2\sin^2\theta}{2g}\qquad t_u=\frac{2v_0\sin\theta}{g}`, "Açıyla atılan cismin menzili, yüksekliği ve uçuş süresinde (aynı seviyeye düşerse).", "Menzil 45°'de en büyüktür");
  P("11", "u1/k3", "Newton'un ikinci yasası", r`\vec F_{\text{net}}=m\cdot\vec a`, "Cisme etki eden net kuvvetten ivmeyi bulurken.", "F: N; m: kg");
  P("11", "u1/k4", "Sürtünme kuvveti", r`f_s=k\cdot N`, "Yüzeyde kayan cisme etki eden sürtünmeyi bulurken.", "k: sürtünme katsayısı; N: tepki kuvveti");
  P("11", "u1/k5", "Limit hız", r`F_{\text{direnç}}=k\,A\,v^2\;\Rightarrow\; v_{\text{limit}}=\sqrt{\frac{mg}{kA}}`, "Hava direnci ağırlığa eşitlendiğinde ulaşılan sabit hızda (paraşüt).", "A: kesit alanı");
  P("11", "u1/k6", "Düzgün çembersel hareket", r`v=\frac{2\pi r}{T}\qquad \omega=\frac{2\pi}{T}\qquad a_m=\frac{v^2}{r}\qquad F_m=\frac{mv^2}{r}`, "Çember üzerinde sabit süratle dönen cisimlerde.", "ω: açısal hız (rad/s)");
  P("11", "u2/k1", "İş–enerji teoremi", r`W_{\text{net}}=\Delta E_k`, "Net işten hız değişimini bulurken.", "");
  P("11", "u2/k2", "Momentum ve itme", r`\vec p=m\,\vec v\qquad \vec I=\vec F\,\Delta t=\Delta\vec p`, "Çarpışma ve kısa süreli kuvvet etkilerinde.", "p: kg·m/s");
  P("11", "u2/k2", "Momentumun korunumu", r`m_1v_1+m_2v_2=m_1v_1'+m_2v_2'`, "Dış kuvvetin olmadığı çarpışma ve patlamalarda.", "");
  P("11", "u3/k1", "Coulomb yasası", r`F=k\,\frac{q_1\,q_2}{d^2}`, "İki noktasal yük arasındaki elektriksel kuvvette.", "k = 9·10⁹ N·m²/C²");
  P("11", "u3/k1", "Elektrik alan ve potansiyel", r`E=k\,\frac{q}{d^2}\qquad V=k\,\frac{q}{d}`, "Bir yükün etrafındaki alan şiddeti ve potansiyelinde.", "E: N/C; V: volt");
  P("11", "u3/k1", "Sığaç", r`C=\frac{q}{V}=\varepsilon\,\frac{A}{d}\qquad E=\frac{1}{2}C\,V^2`, "Sığacın yük depolama kapasitesi ve enerjisinde.", "C: farad; d: levhalar arası uzaklık");
  P("11", "u3/k3", "Manyetik kuvvet", r`F=q\,v\,B\sin\theta\qquad F=B\,I\,L\sin\theta`, "Manyetik alanda hareket eden yüke ya da akım taşıyan tele etki eden kuvvette.", "B: tesla");
  P("11", "u3/k3", "Düz telin manyetik alanı", r`B=2k\,\frac{I}{d}`, "Akım taşıyan telden d uzaklıktaki manyetik alanda.", "k = 10⁻⁷ T·m/A");
  P("11", "u3/k3", "Manyetik akı ve indüksiyon", r`\Phi=B\,A\cos\theta\qquad \varepsilon=-\frac{\Delta\Phi}{\Delta t}\qquad \varepsilon=B\,L\,v`, "Değişen manyetik akının oluşturduğu indüksiyon emk'sında.", "Φ: weber");
  P("11", "u4/k1", "Kırılma (Snell)", r`n=\frac{c}{v}\qquad n_1\sin\theta_1=n_2\sin\theta_2`, "Işığın bir ortamdan diğerine geçerken kırılma açısını bulurken.", "n: kırıcılık indisi");
  P("11", "u4/k2", "Ayna ve mercek denklemi", r`\frac{1}{f}=\frac{1}{d_c}+\frac{1}{d_g}\qquad M=\frac{h_g}{h_c}=-\frac{d_g}{d_c}`, "Ayna ve merceklerde görüntünün yerini ve büyüklüğünü bulurken.", "d_c: cismin, d_g: görüntünün uzaklığı");
  P("11", "u4/k3", "Doppler olayı", r`f'=f\,\frac{v\pm v_g}{v\mp v_k}`, "Kaynak ya da gözlemci hareket ederken algılanan frekansı bulurken.", "v: ses hızı; v_g: gözlemci; v_k: kaynak (yaklaşırken frekans artar)");
  P("11", "u5/k1", "Foton enerjisi", r`E=h\,f=\frac{h\,c}{\lambda}`, "Işığın taneciklerinin enerjisini bulurken.", "h = 6,63·10⁻³⁴ J·s");
  P("11", "u5/k1", "Fotoelektrik olay", r`E_{k,\max}=h\,f-W_0`, "Işık metal yüzeye düştüğünde kopan elektronların enerjisinde.", "W₀: bağlanma enerjisi (eşik enerjisi)");
  P("11", "u5/k2", "Bohr enerji düzeyleri", r`E_n=-\frac{13{,}6}{n^2}\ \text{eV}`, "Hidrojen atomunda elektronun enerji düzeyleri ve yayılan ışıkta.", "n: yörünge numarası");
  // 12
  P("12", "u1/k1", "Virajda emniyetli hız", r`v_{\max}=\sqrt{k\,g\,r}\qquad \tan\theta=\frac{v^2}{r\,g}`, "Düz virajda sürtünmeyle, eğimli virajda eğimle güvenli dönüş hızında.", "θ: yol eğimi");
  P("12", "u1/k2", "Açısal momentum", r`L=I\,\omega\qquad I=\sum m\,r^2\qquad E_{\text{dönme}}=\frac{1}{2}I\,\omega^2`, "Dönen cisimlerde ve açısal momentumun korunumunda (patenci).", "I: eylemsizlik momenti");
  P("12", "u1/k3", "Kütle çekim yasası", r`F=G\,\frac{m_1\,m_2}{d^2}\qquad g=\frac{G\,M}{r^2}`, "Gezegen ve uydular arası çekim kuvvetinde.", "G = 6,67·10⁻¹¹ N·m²/kg²");
  P("12", "u1/k3", "Kepler'in üçüncü yasası", r`\frac{T^2}{r^3}=\frac{4\pi^2}{G\,M}`, "Aynı yıldız etrafındaki gezegenlerin periyot ve yörünge yarıçaplarında.", "");
  P("12", "u2/k1", "Basit harmonik hareket", r`x=A\sin(\omega t)\qquad a=-\omega^2x\qquad v_{\max}=\omega A`, "Yay ve sarkaç gibi salınımlarda konum, hız ve ivmeyi bulurken.", "A: genlik; ω = 2π/T");
  P("12", "u3/k1", "Young çift yarık deneyi", r`\Delta x=\frac{\lambda\,L}{d}\qquad x_n=n\,\frac{\lambda\,L}{d}`, "Girişim desenindeki saçak aralığını ve aydınlık saçakların yerini bulurken.", "d: yarıklar arası; L: perde uzaklığı");
  P("12", "u3/k2", "Elektromanyetik dalgalar", r`c=\lambda\,f`, "Radyo, mikrodalga, ışık gibi dalgaların dalga boyu ve frekansında.", "c = 3·10⁸ m/s");
  P("12", "u4/k2", "Radyoaktif bozunma", r`N=N_0\Big(\frac{1}{2}\Big)^{t/T_{1/2}}`, "Belli bir süre sonra kalan çekirdek sayısını ya da yaş tayinini bulurken.", "T½: yarı ömür");
  P("12", "u4/k2", "Kütle–enerji eşdeğerliği", r`E=m\,c^2`, "Fisyon ve füzyonda kütle kaybından açığa çıkan enerjiyi bulurken.", "");
  P("12", "u5/k1", "Zaman genişlemesi ve boy kısalması", r`\gamma=\frac{1}{\sqrt{1-v^2/c^2}}\qquad \Delta t=\gamma\,\Delta t_0\qquad L=\frac{L_0}{\gamma}`, "Işık hızına yakın hızlarda hareket eden gözlemcilerde.", "Δt₀, L₀: özzaman ve özuzunluk");
  P("12", "u5/k2", "de Broglie dalga boyu", r`\lambda=\frac{h}{p}=\frac{h}{m\,v}`, "Maddenin dalga özelliğini incelerken (elektron kırınımı).", "");
  P("12", "u5/k2", "Compton olayı", r`\Delta\lambda=\frac{h}{m_e\,c}\,(1-\cos\theta)`, "X ışınının elektronla çarpışıp saçılmasında dalga boyu değişimini bulurken.", "θ: saçılma açısı");
  P("12", "u5/k2", "Wien yasası", r`\lambda_{\max}\cdot T=2{,}9\cdot 10^{-3}\ \text{m·K}`, "Siyah cismin en çok ışıma yaptığı dalga boyunu sıcaklıktan bulurken.", "T: kelvin");

  /* ---------------- KİMYA ---------------- */
  const K = (g, k, ...a) => add("kimya", g, k, ...a);
  // 9
  K("9", "u1/k3", "Kütle numarası", r`A=Z+N\qquad \text{iyon yükü}=p-e`, "Atomun proton, nötron ve elektron sayılarını bulurken.", "Z: atom numarası (proton sayısı); N: nötron sayısı");
  K("9", "u1/k5", "Orbital doluluk sırası (Aufbau)", r`1s\ 2s\ 2p\ 3s\ 3p\ 4s\ 3d\ 4p\ 5s\ 4d\ 5p`, "Elektron dizilimini yazarken.", "s en çok 2, p 6, d 10 elektron alır");
  K("9", "u1/k6", "Periyot ve grup", r`\text{periyot}=\text{en büyük baş kuantum sayısı}\qquad \text{A grubu}=\text{değerlik elektron sayısı}`, "Elektron diziliminden elementin periyodik tablodaki yerini bulurken.", "");
  K("9", "u2/k5", "Elektronegatiflik farkı", r`\Delta EN=|EN_A-EN_B|`, "Bağın apolar, polar kovalent ya da iyonik olduğunu tahmin ederken.", "ΔEN = 0 apolar; büyüdükçe polarlık artar");
  // 10
  K("10", "u1/k3", "Mol kavramı", r`n=\frac{m}{M_A}=\frac{N}{N_A}=\frac{V}{22{,}4}`, "Kütle, tanecik sayısı ve gaz hacmi arasında geçiş yaparken.", "M_A: mol kütlesi; N_A = 6,02·10²³; V: NŞA'da litre");
  K("10", "u1/k5", "Yüzde verim", r`\%\,\text{verim}=\frac{\text{gerçek verim}}{\text{teorik verim}}\times 100`, "Tepkimede beklenen ve elde edilen ürün miktarını karşılaştırırken.", "");
  K("10", "u1/k5", "Sınırlayıcı bileşen", r`\frac{n_A}{a}\ \text{ve}\ \frac{n_B}{b}\ \text{oranlarından küçük olan biter}`, "Girenlerden hangisinin tamamen harcanacağını bulurken.", "a, b: denklem katsayıları");
  K("10", "u2/k2", "Gaz yasaları", r`P_1V_1=P_2V_2\qquad \frac{V_1}{T_1}=\frac{V_2}{T_2}\qquad \frac{P_1}{T_1}=\frac{P_2}{T_2}`, "Bir gazın basınç, hacim ve sıcaklığından biri sabitken diğerlerinin değişiminde.", "T: kelvin (°C + 273)");
  K("10", "u2/k2", "Birleşik gaz denklemi", r`\frac{P_1V_1}{T_1}=\frac{P_2V_2}{T_2}`, "Aynı miktar gazın iki farklı durumunu karşılaştırırken.", "");
  K("10", "u2/k3", "İdeal gaz denklemi", r`P\,V=n\,R\,T`, "Gazın mol sayısı, basıncı, hacmi ve sıcaklığı arasında.", "R = 0,082 L·atm/(mol·K)");
  K("10", "u2/k2", "Kısmi basınç (Dalton)", r`P_A=X_A\cdot P_{\text{toplam}}\qquad X_A=\frac{n_A}{n_{\text{toplam}}}`, "Gaz karışımlarında her gazın basıncını bulurken.", "X: mol kesri");
  K("10", "u2/k4", "Graham yasası", r`\frac{v_1}{v_2}=\sqrt{\frac{M_2}{M_1}}`, "Gazların yayılma (difüzyon) hızlarını karşılaştırırken.", "M: mol kütlesi");
  K("10", "u3/k5", "Molarite", r`M=\frac{n}{V}`, "Çözeltinin derişimini mol/litre olarak bulurken.", "V: çözelti hacmi (L)");
  K("10", "u3/k5", "Kütlece yüzde ve ppm", r`\%=\frac{m_{\text{çözünen}}}{m_{\text{çözelti}}}\times 100\qquad \text{ppm}=\frac{m_{\text{çözünen}}}{m_{\text{çözelti}}}\times 10^6`, "Derişimi kütle oranı olarak ifade ederken (çok seyreltik çözeltilerde ppm).", "");
  K("10", "u3/k5", "Seyreltme", r`M_1V_1=M_2V_2`, "Çözeltiye su eklenip derişimi düşürülürken.", "");
  K("10", "u3/k6", "Kaynama noktası yükselmesi", r`\Delta T_k=K_k\cdot m\cdot i\qquad m=\frac{n_{\text{çözünen}}}{\text{kg çözücü}}`, "Çözünen eklendiğinde kaynama noktasının ne kadar yükseldiğini bulurken.", "i: iyon sayısı (tuzlarda); donma için ΔT_d = K_d·m·i");
  // 11
  K("11", "u1/k2", "Oluşum entalpilerinden ΔH", r`\Delta H=\sum \Delta H_{\text{ürünler}}-\sum \Delta H_{\text{girenler}}`, "Standart oluşum entalpileri verilen tepkimenin entalpisini bulurken.", "Elementlerin oluşum entalpisi 0");
  K("11", "u1/k2", "Bağ enerjilerinden ΔH", r`\Delta H=\sum E_{\text{kırılan}}-\sum E_{\text{oluşan}}`, "Bağ enerjileri verilen tepkimenin entalpisini bulurken.", "");
  K("11", "u1/k2", "Hess yasası", r`\Delta H_{\text{toplam}}=\Delta H_1+\Delta H_2+\dots`, "Ara basamaklardan toplam tepkimenin entalpisini bulurken.", "Tepkime ters çevrilirse ΔH işaret değiştirir");
  K("11", "u1/k3", "Ortalama tepkime hızı", r`r=-\frac{\Delta[A]}{\Delta t}=\frac{\Delta[C]}{\Delta t}`, "Derişimin zamanla değişiminden tepkime hızını bulurken.", "");
  K("11", "u1/k4", "Hız denklemi", r`r=k\,[A]^x\,[B]^y`, "Derişim değiştiğinde hızın nasıl değişeceğini bulurken.", "x, y: deneyle bulunur (mekanizmada yavaş basamak)");
  K("11", "u2/k1", "Denge sabiti", r`K_c=\frac{[C]^c\,[D]^d}{[A]^a\,[B]^b}\qquad K_p=K_c\,(RT)^{\Delta n}`, "Denge anındaki derişimlerden denge sabitini bulurken.", "Katı ve saf sıvılar yazılmaz");
  K("11", "u2/k1", "Tepkime oranı", r`Q_c<K_c\Rightarrow \text{ileri};\quad Q_c>K_c\Rightarrow \text{geri};\quad Q_c=K_c\Rightarrow \text{denge}`, "Sistemin dengeye hangi yönde ilerleyeceğini tahmin ederken.", "");
  K("11", "u2/k3", "Suyun iyonlaşması ve pH", r`K_w=[H^+][OH^-]=10^{-14}\qquad pH=-\log[H^+]\qquad pH+pOH=14`, "Asitlik ve bazlığı hesaplarken (25 °C).", "");
  K("11", "u2/k4", "Zayıf asit", r`[H^+]=\sqrt{K_a\cdot C}\qquad K_a\cdot K_b=K_w`, "Zayıf asit ya da bazların pH'ını bulurken.", "C: başlangıç derişimi");
  K("11", "u2/k4", "Titrasyon (eşdeğerlik noktası)", r`M_a\,V_a\,x=M_b\,V_b\,y`, "Asit–baz titrasyonunda bilinmeyen derişimi bulurken.", "x, y: asidin H⁺, bazın OH⁻ sayısı");
  K("11", "u2/k5", "Çözünürlük çarpımı", r`K_{sp}=[A^{y+}]^x\,[B^{x-}]^y\qquad AB\ \text{tipi}:\ K_{sp}=s^2`, "Az çözünen tuzların çözünürlüğünü ve çökelme olup olmayacağını bulurken.", "s: molar çözünürlük");
  // 12
  K("12", "u1/k2", "Hücre potansiyeli", r`E^\circ_{\text{hücre}}=E^\circ_{\text{katot}}-E^\circ_{\text{anot}}`, "Standart indirgenme potansiyellerinden pilin gerilimini bulurken.", "E° > 0 ise pil kendiliğinden çalışır");
  K("12", "u1/k2", "Nernst denklemi", r`E=E^\circ-\frac{0{,}0592}{n}\log Q`, "Derişimler standart değilken pil potansiyelini bulurken (25 °C).", "n: aktarılan elektron sayısı");
  K("12", "u1/k3", "Faraday yasası", r`Q=I\cdot t\qquad m=\frac{I\,t\,M_A}{n\,F}`, "Elektrolizde toplanan madde kütlesini bulurken.", "F = 96 485 C/mol e⁻");
  K("12", "u2/k1", "Hibritleşme ve bağ açısı", r`sp^3:\ 109{,}5^\circ\qquad sp^2:\ 120^\circ\qquad sp:\ 180^\circ`, "Karbonun hibrit türünden molekül geometrisini tahmin ederken.", "");
  K("12", "u3/k1", "Hidrokarbon genel formülleri", r`\text{alkan } C_nH_{2n+2}\qquad \text{alken } C_nH_{2n}\qquad \text{alkin } C_nH_{2n-2}`, "Formülden hidrokarbonun türünü ya da karbon sayısından formülü bulurken.", "");
  K("12", "u4/k1", "Hidrokarbon yanma denklemi", r`C_xH_y+\Big(x+\frac{y}{4}\Big)O_2\rightarrow x\,CO_2+\frac{y}{2}\,H_2O`, "Yakıtların yanmasında gereken oksijeni ve oluşan ürünleri bulurken.", "");

  App.data = App.data || {};
  App.data.formuller = F;
})();
