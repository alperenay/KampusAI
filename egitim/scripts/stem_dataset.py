"""Deterministic STEM curriculum. No model-generated labels; originals are never overwritten.
Run: python egitim/scripts/stem_dataset.py --source PATH --out egitim/veri/stem-v2
"""
import argparse, collections, hashlib, json, math, random, re
import sympy as sp
from pathlib import Path
from fractions import Fraction

SYSTEM = ('Sen Sayısal Asistan, Türkçe bir lise ders yardımcısısın. Verilenleri ve varsayımları belirt. '
          'Çözümü kısa, anlaşılır Adım 1, Adım 2 başlıklarıyla açıkla. Son satırı Sonuç: olarak yaz; '
          'birimleri kontrol et. Eksik veri varsa bunu söyle, bilgi uydurma. Formülleri $...$ içinde göster.')
FAMILIES = []
def family(id, subject, topic, question, formula, unit, principle, ranges=None):
    FAMILIES.append(dict(id=id, subject=subject, topic=topic, question=question, formula=formula,
                         unit=unit, principle=principle, ranges=ranges or {}))

# Each family is a different operation or physical/biological model, not a paraphrase.
family('m_linear','Matematik','Birinci derece denklem','${a}x+{b}={a}*{c}+{b}$ denkleminde x kaçtır?', 'c','','Eşitliğin iki tarafından b çıkarıp a katsayısına böleriz.')
family('m_fraction','Matematik','Kesir toplama','${a}/{b}+{c}/{d}$ işleminin sonucu nedir?', 'Fraction(a,b)+Fraction(c,d)','','Paydaları eşitleyip payları toplar, kesri sadeleştiririz.')
family('m_percent','Matematik','Yüzde','{a} TL tutarındaki ürünün yüzde {b} indirimi kaç TL eder?', 'a*b/100','TL','İndirim tutarı = fiyat × indirim oranı / 100.')
family('m_ratio','Matematik','Orantı','{a} işçi bir işi {b} günde bitiriyor. Aynı verimde {a}*{c} işçi kaç günde bitirir?', 'b/c','gün','İş miktarı sabitken işçi sayısı ile süre ters orantılıdır.')
family('m_average','Matematik','Aritmetik ortalama','{a}, {b}, {c} ve {d} sayılarının aritmetik ortalaması nedir?', '(a+b+c+d)/4','','Sayıların toplamını veri sayısına böleriz.')
family('m_power','Matematik','Üslü ifadeler','${a}^2 * {a}^3$ işleminin sayısal değeri nedir?', 'a**5','','Aynı tabanlı kuvvetler çarpılırken üsler toplanır.',ranges={'a':(2,6)})
family('m_log','Matematik','Logaritma','${a}^{b}$ sayısının {a} tabanındaki logaritması kaçtır?', 'b','','Logaritma, tabanın verilen sayıyı üretmek için alacağı üstür.')
family('m_abs','Matematik','Mutlak değer','$|{a}-{b}|+|{c}-{d}|$ kaçtır?', 'abs(a-b)+abs(c-d)','','Mutlak değer sayının sıfıra uzaklığıdır; farkın işaretinden bağımsızdır.')
family('m_slope','Matematik','Doğrunun eğimi','(0, {a}) ve ({b}, {a}+{b}*{c}) noktalarından geçen doğrunun eğimi nedir?', 'c','','Eğim, düşey değişimin yatay değişime oranıdır.')
family('m_arithmetic','Matematik','Aritmetik dizi','İlk terimi {a}, ortak farkı {b} olan aritmetik dizinin {c}. terimi nedir?', 'a+(c-1)*b','','Genel terim a_n = a_1 + (n−1)d bağıntısıyla bulunur.')
family('m_geometric','Matematik','Geometrik dizi','İlk terimi {a}, ortak çarpanı 2 olan geometrik dizinin {b}. terimi nedir?', 'a*2**(b-1)','','Genel terim a_n = a_1 r^(n−1) olur.',ranges={'b':(2,7)})
family('m_probability','Matematik','Basit olasılık','Bir torbada {a} kırmızı ve {b} mavi top vardır. Rastgele seçilen topun kırmızı olma olasılığı nedir?', 'Fraction(a,a+b)','','Eş olasılıklı seçimde istenen durum sayısını toplam durum sayısına böleriz.')
family('m_combination','Matematik','Kombinasyon','{a} kişiden sıralama önemsiz olacak şekilde 2 kişi kaç farklı biçimde seçilir?', 'a*(a-1)/2','','İkili seçim sayısı C(n,2) = n(n−1)/2 olur.')
family('m_permutation','Matematik','Permütasyon','{a} kişiden başkan ve yardımcı farklı kişiler olmak üzere kaç farklı atama yapılır?', 'a*(a-1)','','İlk görev için n, ikinci görev için n−1 seçenek vardır.')
family('m_triangle','Matematik','Üçgen alanı','Tabanı {a} cm, bu tabana ait yüksekliği {b} cm olan üçgenin alanı nedir?', 'a*b/2','cm²','Üçgen alanı taban ile yüksekliğin çarpımının yarısıdır.')
family('m_circle','Matematik','Daire alanı','Yarıçapı {a} cm olan dairenin alanını pi=3 alarak bulunuz.', '3*a*a','cm²','Daire alanı A = πr² bağıntısıyla hesaplanır.')
family('m_derivative','Matematik','Polinom türevi','$f(x)={a}x^3+{b}x$ için f\'(2) kaçtır?', '12*a+b','','Kuvvet kuralıyla f\'(x)=3ax²+b bulunur; x=2 yerleştirilir.')
family('m_integral','Matematik','Belirli integral','$f(x)={a}x$ fonksiyonunun 0 ile {b} arasındaki belirli integrali kaçtır?', 'a*b*b/2','','Antitürev ax²/2 bulunur ve üst-alt sınır değerleri çıkarılır.')
family('m_quadratic','Matematik','Kökler toplamı','$x^2-{a}x+{b}=0$ denkleminin karmaşık sayılarda kökler toplamı nedir?', 'a','','Vieta bağıntısına göre kökler toplamı −b/a değeridir; baş katsayı 1 olur.')
family('m_system','Matematik','Denklem sistemi','$x+y={a}+{b}$ ve $x-y={a}-{b}$ ise x kaçtır?', 'a','','İki denklemi taraf tarafa toplayarak y değişkenini yok ederiz.')
family('m_pythagorean','Matematik','Pisagor','Dik kenarları {a} cm ve {b} cm olan dik üçgenin hipotenüs uzunluğunun karesi nedir?', 'a*a+b*b','cm²','Pisagor bağıntısı c²=a²+b² olur.')
family('m_geom_sum','Matematik','Geometrik toplam','İlk terimi {a}, ortak çarpanı 2 olan dizinin ilk {b} teriminin toplamı nedir?', 'a*(2**b-1)','','Geometrik toplam S_n=a_1(r^n−1)/(r−1) bağıntısıdır.',ranges={'b':(2,7)})
family('m_binomial','Matematik','Binom katsayısı','$(x+1)^{a}$ açılımında x² teriminin katsayısı nedir?', 'a*(a-1)/2','','Binom teoremine göre katsayı C(n,2) olur.')

family('p_acceleration','Fizik','Newton yasası','Sürtünmesiz yatay düzlemde {a} kg kütleye {a}*{b} N yatay net kuvvet etki ediyor. İvme kaçtır?', 'b','m/s²','Newton ikinci yasası F_net=ma; ivme net kuvvetin kütleye oranıdır.')
family('p_velocity','Fizik','Sabit hızlı hareket','Sabit {a} m/s hızla {b} saniye hareket eden araç kaç metre yol alır?', 'a*b','m','Sabit hızlı harekette yol x=vt olur.')
family('p_freefall','Fizik','Serbest düşme','Hava direnci yokken durgun bırakılan cisim {a} saniye düşüyor. g=10 m/s² için aldığı yol nedir?', '5*a*a','m','İlk hız sıfır olduğunda düşme mesafesi h=gt²/2 olur.')
family('p_kinetic','Fizik','Kinetik enerji','{a} kg kütleli cismin hızı {b} m/s. Kinetik enerjisi nedir?', 'a*b*b/2','J','Öteleme kinetik enerjisi E_k=mv²/2 olur.')
family('p_potential','Fizik','Çekim potansiyel enerjisi','{a} kg cisim referans düzeyinden {b} m yukarıdadır. g=10 m/s² için potansiyel enerjisi nedir?', '10*a*b','J','Düzgün çekim alanında referansa göre E_p=mgh olur.')
family('p_work','Fizik','İş','Hareket yönünde sabit {a} N kuvvet cismi {b} m kaydırıyor. Kuvvetin yaptığı iş nedir?', 'a*b','J','Kuvvet yer değiştirmeyle aynı yöndeyse W=Fx olur.')
family('p_power','Fizik','Güç','Bir motor {a}*{b} J işi {b} saniyede yapıyor. Ortalama gücü nedir?', 'a','W','Ortalama güç yapılan işin geçen süreye oranıdır.')
family('p_pressure','Fizik','Basınç','Yüzeye dik {a}*{b} N kuvvet {b} m² alana uygulanıyor. Basınç nedir?', 'a','Pa','Katı basıncı dik kuvvetin temas alanına oranıdır.')
family('p_ohm','Fizik','Ohm yasası','{a} ohm direncin uçlarına {a}*{b} V uygulanıyor. Akım kaç amperdir?', 'b','A','Ohm yasası V=IR; I=V/R olur.')
family('p_series','Fizik','Seri direnç','{a} ve {b} ohm dirençler seri bağlanıyor. Eşdeğer direnç nedir?', 'a+b','ohm','Seri dirençlerin eşdeğeri dirençlerin toplamıdır.')
family('p_parallel','Fizik','Paralel direnç','{a} ve {b} ohm dirençler paralel bağlanıyor. Eşdeğer direnç nedir?', 'Fraction(a*b,a+b)','ohm','İki paralel direnç için R_eş=R1R2/(R1+R2) olur.')
family('p_charge','Fizik','Elektrik yükü','Bir iletkenden {a} A sabit akım {b} saniye geçiyor. Geçen yük nedir?', 'a*b','C','Sabit akım için geçen yük Q=It olur.')
family('p_wave','Fizik','Dalga hızı','Frekansı {a} Hz, dalga boyu {b} m olan dalganın hızı nedir?', 'a*b','m/s','Dalga yayılma hızı v=fλ bağıntısıyla bulunur.')
family('p_heat','Fizik','Isı alışverişi','Hal değiştirmeyen {a} kg maddenin özısısı {b} J/(kg K). Sıcaklığı {c} K artarsa aldığı ısı nedir?', 'a*b*c','J','Hal değişimi yoksa alınan ısı Q=mcΔT olur.')
family('p_density','Fizik','Özkütle','Kütlesi {a}*{b} gram, hacmi {b} cm³ olan maddenin özkütlesi nedir?', 'a','g/cm³','Özkütle kütlenin hacme oranıdır.')
family('p_buoyancy','Fizik','Kaldırma kuvveti','Tamamen sıvı içinde kalan cismin hacmi {a} m³, sıvı özkütlesi {b} kg/m³. g=10 m/s² için kaldırma kuvveti nedir?', '10*a*b','N','Arşimet ilkesine göre F_k=ρ_sıvı g V_batan olur.')
family('p_spring','Fizik','Yay enerjisi','Yay sabiti {a} N/m olan ideal yay {b} m sıkıştırılıyor. Depolanan esneklik enerjisi nedir?', 'a*b*b/2','J','İdeal yayın enerjisi E=kx²/2 olur.')
family('p_momentum','Fizik','Momentum','{a} kg cisim pozitif yönde {b} m/s hızla gidiyor. Momentumunun büyüklüğü nedir?', 'a*b','kg m/s','Doğrusal momentum p=mv olur.')
family('p_refraction','Fizik','Kırılma indisi','Işığın boşluk hızını 300000000 m/s alın. Kırılma indisi {a} olan ortamda ışığın hızı nedir?', '300000000/a','m/s','Mutlak kırılma indisi n=c/v olarak tanımlanır.')

family('c_molarity','Kimya','Molarite','{a} mol çözünen içeren {b} litre çözeltinin molaritesi nedir?', 'Fraction(a,b)','mol/L','Molarite çözünen mol sayısının çözeltinin litre cinsinden hacmine oranıdır.')
family('c_moles','Kimya','Mol-kütle','Molar kütlesi {a} g/mol olan saf maddeden {a}*{b} gram alınırsa kaç mol olur?', 'b','mol','Mol sayısı n=m/M ile hesaplanır.')
family('c_dilution','Kimya','Seyreltme','{a} M çözelti, çözünen madde kaybolmadan hacmi {b} katına çıkarılarak seyreltiliyor. Son molarite nedir?', 'Fraction(a,b)','mol/L','Çözünen molü sabitken M1V1=M2V2 olur.')
family('c_stoich','Kimya','Tepkime oranı','N₂+3H₂→2NH₃ tepkimesinde H₂ fazlayken {a} mol N₂ tamamen harcanıyor. Kaç mol NH₃ oluşur?', '2*a','mol','Denkleştirilmiş tepkimede mol oranı NH3/N2 = 2/1 olur.')
family('c_water','Kimya','Sınırlayıcı bileşen','2H₂+O₂→2H₂O tepkimesinde {a} mol H₂ ve {b} mol O₂ tamamen tepkimeye bırakılıyor. En çok kaç mol H₂O oluşur?', 'min(a,2*b)','mol','Hidrojen başına bir su; oksijen başına iki su oluşur. Küçük sınır ürün miktarını belirler.')
family('c_neutral','Kimya','Nötrleşme','{a} mol HCl ile tam nötrleşmek için kaç mol NaOH gerekir?', 'a','mol','HCl+NaOH→NaCl+H2O tepkimesinde mol oranı 1:1 olur.')
family('c_mass_percent','Kimya','Kütlece yüzde','{a} g çözünen ve {b} g çözücüyle hazırlanan çözeltinin kütlece yüzde derişimi nedir?', '100*a/(a+b)','%','Yüzde derişim = çözünen kütlesi / toplam çözelti kütlesi ×100.')
family('c_ph','Kimya','pH','25 °C sıcaklıkta ideal çözeltide H⁺ derişimi $10^(-{a})$ mol/L. pH nedir?', 'a','','Tanım gereği pH=−log10[H+] olur.',ranges={'a':(1,12)})
family('c_poh','Kimya','pH-pOH','25 °C sıcaklıkta ideal sulu çözeltinin pH değeri {a}. pOH kaçtır?', '14-a','','25 °C için pH+pOH=14 olur.',ranges={'a':(1,12)})
family('c_electrons','Kimya','İyon elektron sayısı','Atom numarası {a} olan bir atom {b} elektron kaybediyor. Kalan elektron sayısı nedir?', 'a-b','','Nötr atomda elektron sayısı atom numarasına eşittir; kaybedilen elektron çıkarılır.',ranges={'a':(15,30),'b':(1,4)})
family('c_neutrons','Kimya','Nötron sayısı','Atom numarası {a}, kütle numarası {a}+{b} olan atomun nötron sayısı nedir?', 'b','','Kütle numarası proton+nötron toplamıdır.')
family('c_pressure','Kimya','Boyle yasası','Sıcaklığı ve molü sabit ideal gazın ilk basıncı {a} atm. Hacmi {b} katına çıkarsa basınç kaç atm olur?', 'Fraction(a,b)','atm','Sabit sıcaklık ve mol sayısında P1V1=P2V2 olur.')
family('c_gas','Kimya','İdeal gaz','İdeal gaz için n={a} mol, T={b} K, P={c} atm ve R=0.082 L atm/(mol K). Hacim kaç litredir?', '0.082*a*b/c','L','İdeal gaz denklemi PV=nRT; hacim V=nRT/P olur.')
family('c_yield','Kimya','Yüzde verim','Teorik ürün miktarı {a} gram, gerçekleşen verim yüzde {b}. Gerçek ürün miktarı nedir?', 'a*b/100','g','Gerçek miktar = teorik miktar × verim /100 olur.')
family('c_half','Kimya','Yarılanma ömrü','Başlangıç kütlesi {a} gram olan radyoaktif madde 3 yarılanma ömrü geçiriyor. Kalan kütle nedir?', 'Fraction(a,8)','g','Her yarılanma ömründe miktar yarıya iner: m=m0(1/2)^3.')

family('b_dna','Biyoloji','DNA hidrojen bağı','Çift zincirli DNA molekülünün TAMAMINDA {a} adenin ve {b} guanin vardır. Toplam hidrojen bağı sayısı nedir?', '2*a+3*b','bağ','Her A karşısında T ile 2; her G karşısında C ile 3 hidrojen bağı kurar.')
family('b_gc','Biyoloji','DNA baz yüzdesi','Çift zincirli DNA molekülünün tamamında adenin oranı yüzde {a}. Guanin oranı yüzde kaçtır?', '50-a','%','A=T ve G=C olduğundan G yüzdesi (100−2A)/2 olur.',ranges={'a':(5,40)})
family('b_nucleotides','Biyoloji','DNA uzunluğu','Çift zincirli DNA toplam {a} baz çifti içeriyor. İki zincirdeki toplam nükleotit sayısı nedir?', '2*a','nükleotit','Her baz çifti karşılıklı iki nükleotitten oluşur.')
family('b_phosphate','Biyoloji','Nükleotit yapısı','Lineer DNA parçasında iki zincir toplam {a} nükleotit içeriyor. Bu nükleotitlerde toplam kaç fosfat grubu bulunur?', 'a','fosfat','Her DNA nükleotidinin yapısında bir fosfat grubu bulunur.')
family('b_mitosis','Biyoloji','Mitoz hücre sayısı','Bir hücrenin tüm yavru hücreleri her turda bir kez bölünüyor ve ölüm yok. {a} tur mitoz sonunda kaç hücre olur?', '2**a','hücre','Her tur hücre sayısı ikiye katlanır: N=2^n.',ranges={'a':(1,9)})
family('b_meiosis','Biyoloji','Mayoz kromozom sayısı','Diploit kromozom sayısı 2n={a}*2 olan hücrenin normal mayozla oluşan gametinde kaç kromozom olur?', 'a','kromozom','Normal mayozda kromozom sayısı diploitten haploide yarıya iner.')
family('b_sister','Biyoloji','S evresi kromatit','Diploit bir hücrede 2n=2*{a}. S evresi bitince sentromerler ayrılmadan toplam kromatit sayısı nedir?', '4*a','kromatit','Diploit sayı 2a kromozomdur. S evresinde her kromozom iki kromatit taşır: toplam 4a kromatit; kromozom sayısı değişmez.')
family('b_peptide','Biyoloji','Peptit bağları','Tek doğrusal zincirde {a} amino asitten oluşan proteinde kaç peptit bağı vardır?', 'a-1','bağ','Lineer n amino asitli zincirde n−1 peptit bağı bulunur.')
family('b_water','Biyoloji','Protein sentezinde su','{a} amino asit tek doğrusal peptit zincirine bağlanırken kaç su molekülü açığa çıkar?', 'a-1','molekül','Her yeni peptit bağı için bir su açığa çıkar; lineer zincirde n−1 bağ vardır.')
family('b_population','Biyoloji','Popülasyon dengesi','Popülasyonda {a} birey var. Bir dönemde {b} doğum, {c} ölüm oluyor; göç yok. Son birey sayısı nedir?', 'a+b-c','birey','Göç olmadığında N_son=N_ilk+doğum−ölüm olur.',ranges={'a':(30,90),'c':(1,12)})
family('b_energy','Biyoloji','Ekolojik enerji','Bu soruda enerji aktarım verimini yüzde 10 varsayın. Üreticilerde {a} kJ enerji varsa iki trofik aktarım sonra kalan enerji nedir?', 'a/100','kJ','Verilen varsayım altında her aktarımda enerji 0.1 ile çarpılır; bu evrensel sabit değildir.')
family('b_genetic','Biyoloji','Mendel olasılığı','Tam baskınlık ve eşit gamet olasılığı varsayımıyla Aa × Aa çaprazlamasında aa yavru olasılığını yüzde olarak bulunuz.', '25','%','A ve a gametleri eş olasılıklıdır; aa olasılığı 1/2 × 1/2 =1/4 olur.')
family('b_hardy','Biyoloji','Hardy-Weinberg','Hardy-Weinberg dengesinde çekinik alel frekansı q={a}/10. Çekinik homozigot birey yüzdesi kaçtır?', 'a*a','%','Denge varsayımı altında çekinik homozigot frekansı q²; yüzde için 100 ile çarpılır.',ranges={'a':(1,8)})
family('b_codons','Biyoloji','Kodon ve amino asit','Başlangıç kodonundan başlayıp dur kodonundan hemen önce biten kodlama bölgesi {a}*3 nükleotittir. Her kodon bir amino asit kodlarsa protein kaç amino asitlidir?', 'a','amino asit','Dur kodonu dışarıda tutulduğundan nükleotit sayısı 3 ile bölünür.')
family('b_gametes','Biyoloji','Bağımsız dağılım','Bağlantısız {a} heterozigot gen çifti taşıyan birey, mutasyon yokken kaç farklı gamet genotipi oluşturabilir?', '2**a','çeşit','Bağımsız dağılımda her heterozigot çift iki seçenek verir: 2^n.',ranges={'a':(1,8)})

TEST={'m_pythagorean','m_geom_sum','m_binomial','p_spring','p_momentum','p_refraction','c_gas','c_yield','c_half','b_hardy','b_codons','b_gametes'}
VALID={'m_integral','m_system','p_density','p_buoyancy','c_electrons','c_pressure','b_sister','b_energy'}
ALLOWED={'Fraction':Fraction,'abs':abs,'min':min,'max':max}
def value(expr,args):
    # Expressions are authored above, never taken from a question/user/model.
    result=eval(expr,{'__builtins__':{}},dict(ALLOWED,**args))
    assert isinstance(result,(int,float,Fraction)) and math.isfinite(float(result))
    return result
def fmt(v):
    if isinstance(v,Fraction):return str(v.numerator) if v.denominator==1 else str(v)
    return f'{v:.6g}' if isinstance(v,float) else str(v)
def record(f,args,i):
    q=f['question'].format(**args);v=value(f['formula'],args)
    expression=f['formula']
    for key in sorted(args): expression=re.sub(r'\b'+key+r'\b',str(args[key]),expression)
    symbolic=sp.sympify(expression,locals={'Fraction':lambda x,y:x/y,'abs':sp.Abs,'min':sp.Min,'max':sp.Max},evaluate=False)
    assert math.isclose(float(symbolic.doit()),float(v),rel_tol=1e-10,abs_tol=1e-10), 'Independent arithmetic engine disagrees'
    display='$'+sp.latex(symbolic)+'$'
    answer=(f"Adım 1: {f['principle']}\nAdım 2: Verilenleri bağıntıya yerleştir: {display}.\n"
            f"Sonuç: {fmt(v)} {f['unit']}").strip()
    digest=hashlib.sha256((f['id']+'|'+q).encode()).hexdigest()
    return dict(id=digest,family=f['id'],subject=f['subject'],topic=f['topic'],difficulty=['temel','uygulama','çok adımlı'][i%3],
        source='original-deterministic-stem-v2',verification='deterministic_formula_and_explicit_assumptions',
        formula=f['formula'],parameters=args,expected=float(v),unit=f['unit'],messages=[{'role':'system','content':SYSTEM},{'role':'user','content':q},{'role':'assistant','content':answer}])
def build(out,source=None):
    out=Path(out);out.mkdir(parents=True,exist_ok=True);rng=random.Random(20261027)
    data={'train':[],'validation':[],'test':[]};seen=set()
    for f in FAMILIES:
        split='test' if f['id'] in TEST else 'validation' if f['id'] in VALID else 'train'
        count=4 if split!='train' else 48
        for attempt in range(10000):
            args={k:rng.randint(*f['ranges'].get(k,(2,14))) for k in 'abcd'}
            r=record(f,args,len(data[split]));question=r['messages'][1]['content']
            if question in seen:continue
            seen.add(question);data[split].append(r)
            if sum(x['family']==f['id'] for x in data[split])>=count:break
    # Safety/clarification examples are balanced across subjects; they are never quantitative benchmark items.
    for subject in ['Matematik','Fizik','Kimya','Biyoloji']:
        for q,a in [('Fotoğraftaki soru bulanık, sayılar okunmuyor. Cevap kaç?', 'Görüntüden sayılar güvenilir biçimde okunamıyorsa sonuç hesaplayamam. Daha net fotoğraf yükle veya soruyu metin olarak yaz.'),
                    ('Sorunun sadece bir kısmını biliyorum. Eksik sayıları tahmin ederek çöz.', 'Eksik bilgileri uydurarak çözüm üretmek doğru olmaz. Sorunun tamamını ve verilen değerleri paylaş.'),
                    ('Şekli görmeden şekil üzerindeki uzunluğu söyle.', 'Şeklin özellikleri ve verilen uzunluklar olmadan tek bir sonuç belirlenemez. Şekli veya ilişkileri belirt.')]:
            key=hashlib.sha256((subject+q).encode()).hexdigest()
            data['train'].append(dict(id=key,family='clarification-'+subject,subject=subject,topic='Eksik bilgi',source='original-authored',verification='explicit_missing_input',messages=[{'role':'system','content':SYSTEM+' Branş: '+subject},{'role':'user','content':q},{'role':'assistant','content':a}]))
    for split,rows in data.items():
        rng.shuffle(rows)
        (out/(split+'.jsonl')).write_text(''.join(json.dumps(r,ensure_ascii=False)+'\n' for r in rows),encoding='utf8')
    raw=[]
    if source:
        raw=[json.loads(line) for line in Path(source).read_text(encoding='utf8').splitlines() if line.strip()]
    unique=len({json.dumps(r,sort_keys=True,ensure_ascii=False) for r in raw})
    report=dict(seed=20261027,original_rows=len(raw),original_unique_rows=unique,exact_duplicates_removed=len(raw)-unique,
        original_retained=0,reason='Original narrow, repetitive templates replaced with explicitly scoped independently computed examples; original source left unchanged.',
        families=len(FAMILIES),splits={s:dict(rows=len(rs),families=len({r['family'] for r in rs}),subjects=dict(collections.Counter(r['subject'] for r in rs))) for s,rs in data.items()},
        split_policy='Entire concept/formula families held out; no question or family overlap. Test never used for training/early stopping.',
        limits=['Synthetic curriculum, not externally validated exam benchmark.','Difficulty labels are descriptive, not calibrated.','Numeric verification is not a proof of all generated natural-language reasoning.','This dataset does not train vision.'])
    (out/'quality-report.json').write_text(json.dumps(report,ensure_ascii=False,indent=2),encoding='utf8')
    verify(out);print(json.dumps(report,ensure_ascii=False,indent=2))
def verify(out):
    sets=[];questions=set()
    for split in ['train','validation','test']:
        rows=[json.loads(x) for x in (Path(out)/(split+'.jsonl')).read_text(encoding='utf8').splitlines()]
        fam=set()
        for r in rows:
            fam.add(r['family']);q=r['messages'][1]['content']
            if r.get('verification')=='explicit_missing_input':continue
            assert q not in questions, 'Question leakage';questions.add(q)
            if r.get('verification')=='independent_question_parse_and_solution_check':
                from stem_curate import inspect
                checked=inspect(r)
                assert checked and checked['id']==r['id'], 'Legacy solution failed independent revalidation'
                continue
            actual=float(value(r['formula'],r['parameters']));assert math.isclose(actual,r['expected'],rel_tol=1e-12)
        sets.append(fam)
    assert not(sets[0]&sets[1] or sets[0]&sets[2] or sets[1]&sets[2]), 'Family leakage'
if __name__=='__main__':
    p=argparse.ArgumentParser();p.add_argument('--out',required=True);p.add_argument('--source');p.add_argument('--verify',action='store_true');a=p.parse_args()
    verify(a.out) if a.verify else build(a.out,a.source)
