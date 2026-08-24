# Velora — Tanıtım Web Sitesi

Saf HTML/CSS/JS ile hazırlanmış, çok dilli (TR/EN/DE/FR/NL/SV) B2B tanıtım sitesi.
Derleme aracı yok, npm yok — dosyaları açıp düzenlemek yeterli.
**Satış yapmaz**; ürünleri, üretim sürecini ve iletişim bilgilerini gösterir.

> **Neden derleme aracı yok?** Bilinçli tercih. Site veri saklamıyor, ziyaretçi
> hiçbir şey yazmıyor — dolayısıyla veri kaybı gibi bir arıza sınıfı burada
> yapısal olarak mümkün değil. Bu ölçekte bir derleme aracı, çözdüğünden fazla
> bakım yükü getirirdi. **Ama bu, site tanıtım sitesi kaldığı sürece geçerli.**
> İleride online sipariş / bayi girişi / stok gibi bir şey eklenirse site bir
> *uygulamaya* dönüşür; o gün giriş doğrulama, sunucu tarafı kurallar ve yedekleme
> ilk günden düşünülmelidir — sonradan eklenmez.

## Klasör Yapısı

```
index.html           → Anasayfa
urunler.html         → Ürün listesi (4 model kartı)
urun.html            → Ürün detayı + kumaş/çerçeve seçici — urun.html?model=vidali
atolye.html          → Atölye / Üretim
hakkimizda.html      → Hakkımızda
iletisim.html        → İletişim
css/style.css        → Tüm görsel tasarım  ⚠️ site/style.css ARTIK YOK, o yetimdi
js/site-config.js    → E-posta, telefon, WhatsApp gibi sabit bilgiler (TEK yerden yönetilir)
js/i18n.js           → Dil sistemi (JSON dosyalarını okuyup sayfaya basar)
js/main.js           → Mobil menü davranışı
js/urun-verisi.js    → ⚠️ ÜRETİLMİŞ ürün verisi (357 varyant) — ELLE DÜZENLEME
js/urun-katmani.js   → Verinin üstündeki sorgular; üç sayfa da bunu kullanır
locales/tr.json       → Türkçe metinler (kaynak dil)
locales/de.json       → Almanca
locales/nl.json       → Hollandaca
locales/fr.json       → Fransızca
locales/sv.json       → İsveççe
images/urunler/       → ÜRETİLMİŞ ürün görselleri (528 dosya) — elle konmaz
images/               → Diğer görseller (bazı bölümlerde hâlâ SVG placeholder)
```

Site klasörünün **dışında**, proje kökünde:

```
urun-veri-araci.js            → veriyi üreten + doğrulayan araç (bkz. Veri Sözleşmesi)
urun-fotograflari/            → tedarikçiden gelen ORİJİNAL görseller (1.434) — dokunulmaz
urun-fotograflari-yamali/     → logosu yama ile silinmiş 314 görsel (bkz. Logo temizliği)
NOTLAR-nerede-kaldik.md       → işin nerede kaldığı, kararlar, açık sorular
```

## Şu an placeholder / doldurulması gerekenler

1. ~~**Firma adı**~~ ✅ Velora.
2. **Logo** — `images/logo-header.png`, `logo-full.jpg`, `logo-icon.png` eklendi;
   `js/site-config.js` içindeki `logoPath` hâlâ `null`, kontrol edilmeli.
3. **Adres** — kesinleşti: **Yeşilbağlar Mahallesi 100 BLV. No:20 Pendik / İstanbul**.
   Altı dil dosyasında da `contact.address` güncellenecek ve
   `contact.form_note` içindeki "adres geçicidir" notu kaldırılacak. *(Henüz yapılmadı.)*
6. **Güven & Sertifikalar bölümü** — şimdilik placeholder. Belge yok; referans
   sitedeki ISO/CE/TSE rozetleri **kopyalanamaz**, onlar başka firmanın belgeleri.
7. **Kargo / teslimat süreleri** — firma yeni kurulduğu için henüz belli değil.
   Belli olana kadar **uydurulmayacak**, bölüm boş kalacak.
8. **Blackout Plise Perde** — 36 görseli var ama dosya adlarında kumaş/çerçeve
   bilgisi yok (`whatsapp-image-...`). Varyant seçici kurulamıyor; kumaş listesi
   gelince elle eşlenecek. O zamana kadar kenarda.
4. **Gerçek fotoğraflar** — `images/`, `images/products/`, `images/workshop/`
   klasörlerindeki `.svg` placeholder dosyalarının yerine gerçek fotoğrafları
   **aynı dosya adıyla** (örn. `plise-sineklik.svg` → `plise-sineklik.jpg`)
   koyup ilgili `<img src="...">` uzantısını HTML dosyalarında güncellemeniz
   yeterli. İsterseniz farklı dosya adları da kullanabilirsiniz, önemli olan
   ilgili sayfadaki `src` yolunu güncellemek.
5. **E-posta / Telefon / WhatsApp** — `js/site-config.js` dosyasında tek
   yerden yönetiliyor, değişirse orayı güncellemeniz yeterli.

## Yeni bir dil eklemek

1. `locales/tr.json` dosyasını kopyalayıp örn. `locales/it.json` yapın,
   içeriği İtalyanca'ya çevirin (JSON yapısını bozmadan).
2. `js/site-config.js` içindeki `supportedLangs` dizisine şu satırı ekleyin:
   ```js
   { code: "it", label: "Italiano" }
   ```
   Başka hiçbir dosyayı değiştirmenize gerek yok — dil seçici otomatik güncellenir.

## ⚠️ VERİ SÖZLEŞMESİ — okumadan ürün verisine dokunmayın

Bu bölüm sitenin en önemli kuralıdır. Ürün verisi 486 varyanttan oluşuyor ve
**elle yönetilemeyecek kadar büyük.** Aşağıdaki üç kural bunun içindir.

### Üç kural

**1. Tek kaynak.** Varyant verisi TEK dosyada: `js/urun-verisi.js`.
`locales/*.json` dosyaları yalnızca **çevrilecek metni** taşır, ürün verisi
taşımaz. Neden: 7 çerçeve rengi normalize edilmeseydi 4 model × 6 dil = **168
kez** yazılacaktı; birini düzeltmeyi unutmak bir dilde farklı isim görünmesine
yol açardı ve kimse fark etmezdi.

**2. Kimlikle eşle, asla sırayla değil.** Her kaydın sabit bir `id`'si var;
görsel ve çeviri o `id`'ye bağlanır.

> Eski kodda bunun tersi vardı: `urunler.html` görselleri ürünlere **dizi
> sırasıyla** eşliyordu (`p._img = imageOrder[i]`). Listeden bir ürün silinince
> kalan her ürün yanlış görsele kayıyordu — hata vermeden, sessizce. Bu desen
> kaldırıldı, **geri getirmeyin.**

**3. Veriyi üret, elle yazma.** `js/urun-verisi.js` dosyasının başında
"ÜRETİLMİŞ DOSYA" yazıyor. Elle düzenlemeyin; kaynağı tedarikçi görsellerinin
dosya adlarıdır.

### Veri şekli

```
modeller    4   → vidali · yapistirmali · askili · gece-gunduz
cerceveler  7   → dört modelde de ORTAK (bir kez yazılır) { id, ad, hex }
kumaslar   18   → { id, ad, tedarikciKodu, hex }
varyantlar 357  → { id, model, kumas, cerceve, montajlar[], gorseller[] }
```

**Varyantın kimliği `model + kumaş + çerçeve`.** Montaj tipi kasten dışarıda —
gerekçesi aşağıda.

- `ad` alanı **geçicidir** — Velora kendi adlandırmasını koyunca değişir.
- `tedarikciKodu` **kalıcıdır** — yeni görsel partisi bununla eşlenir,
  tedarikçi değişirse tarihsel alan olarak kalır. Bu yüzden tek tedarikçi mi
  çok tedarikçi mi olacağını şimdiden bilmek gerekmiyor.
- `hex` görsellerden **örneklendi**, uydurulmadı (renk barındaki kareler gerçek
  kumaş rengi).
- `gorseller[].yamali: true` ise dosya `urun-fotograflari-yamali/`
  klasöründedir, `false` ise `urun-fotograflari/` klasöründe.
- `cerceveler[].hex` ve `kumaslar[].hex` **görselden örneklendi**, uydurulmadı.
  Çerçeve rengi = perdenin kendi çıtasının rengi; gece&gündüz çekimlerindeki
  orta çıtadan alınıyor (bkz. `urun-veri-araci.js` → `CERCEVE_ORNEK`).

### ⚠️ Montaj tipi neden varyant ekseni DEĞİL

Tekli perdelerde montaj tipi zaten ayrı **model**: vidalı / yapıştırmalı /
askılı. Gece&gündüzde ise dosya adlarında montaj tipi geçiyordu ve bir ara
dördüncü bir seçim ekseni gibi duruyordu. Veriden ölçüldü, tahmin değil:

- `vidali` ve `yapistirmali` gruplarının kumaş listeleri **birebir aynı**
  (10 kumaş). Kullanıcıya montaj seçtirmek hiçbir kumaş veya renk açmıyor —
  yalnızca fotoğraftaki montaj aparatı değişiyor.
- Gece&gündüz görsellerinin **70'inde** dosya adında montaj tipi hiç geçmiyor.
  Montaj bir eksen olsaydı bu 70 varyant hiçbir seçenek altında görünemezdi ve
  içlerindeki **`siyah-02` kumaşı tümüyle kaybolurdu** — başka hiçbir yerde yok.

Bu yüzden montaj bilgisi **görselin etiketi** olarak veride duruyor
(`gorseller[].montaj`, `varyantlar[].montajlar[]`) ama sayfada seçim ekseni
değil; metinde geçiyor. İleride ayrı fotoğraflanırsa yeniden eksene çevrilir.

Birleştirmenin sonucu: 486 → **357 varyant**, 657 → **528 görsel**, 31 → 24 MB.
Kaybolan ürün yok; elenenler aynı kombinasyonun iki montajla çekilmiş,
neredeyse aynı fotoğraflarıydı.

### Komutlar

Proje kökünde (`sena web sitesi/`):

```bash
node urun-veri-araci.js yama      # tedarikçi logosunu siler (logosuz görseli atlar)
node urun-veri-araci.js uret      # veriyi görsellerden yeniden üretir
node urun-veri-araci.js gorsel    # görselleri 700px'e küçültüp site/images/urunler/ içine koyar
node urun-veri-araci.js dogrula   # veri ile görseller tutuyor mu kontrol eder
```

Sıra önemli: **yama → uret → gorsel → dogrula.**

`yama` komutu ham klasörü hiç değiştirmez, çıktıyı `urun-fotograflari-yamali/`
altına yazar. Logosu olmayan görseli atlar, yani tekrar tekrar çalıştırmak
zararsızdır.

### Görseller

Orijinaller (1.434 dosya, ~145 MB) site klasörünün **dışında** durur ve siteye
yüklenmez. `gorsel` komutu yalnızca veride geçenleri **700 piksel** genişliğe
küçültüp `site/images/urunler/<model>/` altına koyar → **657 dosya, 31 MB.**

Sayfa görseli şu yoldan okur: `images/urunler/<model>/<dosya>.jpg`
Dosyanın ham klasörden mi yamalı klasörden mi geldiğini sayfa bilmez; `yamali`
bayrağı yalnızca üretim sırasında kaynağı seçmek için kullanılır.

### Logo temizliği — tedarikçi logosu nasıl kaldırılıyor

Tedarikçinin 314 görselinde altta kırmızı **"4K HOME DECO"** yazısı var.
Kardeşinin kuralı: *logosu silinemeyen görsel kullanılmaz.*

**Kırpma denendi ve terk edildi (24.08).** Görselin altını kesmek logoyu
götürüyordu ama pencere kompozisyonunu da bozuyordu; ayrıca kenardaki renk
kartelası daireleri de gidiyordu.

**Kullanılan yöntem — yama.** Logo, pencere kasasının alt beyaz çıtasının
üzerinde ve **her görselde aynı oranda** duruyor (1280×1280'de x 568–712,
y 1106–1145; 10/10 örnekte birebir aynı). Üzeri kapatılıyor:

- Düz renk dikdörtgen **kullanılmıyor** — kasada yukarıdan aşağı hafif ton
  geçişi var (parlaklık 227–245), düz renk ışıkta dikdörtgen izi bırakırdı.
- Onun yerine **aynı satırlardan**, logonun solundaki boş kasa bölümünden bir
  blok kopyalanıyor. Ton geçişi birebir korunuyor, ek yeri görünmüyor.
- Koordinatlar **oran** olarak tutuluyor, bu yüzden 1000 / 1280 / 1920 piksellik
  şablonların hepsinde çalışıyor.
- Her görselde yamadan **önce** ve **sonra** kırmızı piksel sayılıyor: öncesi 0
  ise şablon farklı demektir (uyarır), sonrası >0 ise kalıntı var demektir.
  314/314 temiz geçti.

**Kasıtlı olarak dokunulmayanlar:**
- Kenarlardaki **renk kartelası daireleri** — ürünün renk çeşidini gösterdiği
  için bırakıldı. Çıkarılmak istenirse kolay bir bölge, kenarda duruyorlar.
- Alt profildeki minik **"4K" etiketi** (~15×10 piksel, ~1.074 görselde).
  Sitedeki gerçek boyutta (600px) okunmuyor, logo olduğu bile anlaşılmıyor.
  Otomatik silme denendi: kumaş renkleri (somon, kırmızı, mor) etiketle
  karışıyor, zorlanırsa 1.074 görsele görünür leke bırakma riski var.
  **Karar: dokunulmayacak.**

**Çekim başına tek görsel tutulur.** Tedarikçi aynı çekimi birden çok kez
kaydetmiş (`...profil.jpg` ve `...profil-1.jpg`, 1 piksel farkla); bazı
varyantlarda 6 neredeyse aynı fotoğraf vardı. 724 yinelenen elendi. Orijinaller
silinmedi — fikir değişirse `urun-veri-araci.js` içindeki eleme bloğu kaldırılıp
yeniden üretilir.

**`dogrula` her deploy'dan ÖNCE çalıştırılmalı.** Sitenin sessizce yanlış
olmasını engelleyen tek kontrol budur: tanımsız kumaş/çerçeve, görselsiz
varyant, diskte olmayan dosya, rengi olmayan kumaş — hepsini yakalar.

### Yeni görsel partisi geldiğinde

1. Görselleri ilgili `urun-fotograflari/<model-klasörü>/` altına koyun
2. `node urun-veri-araci.js yama` — logolu olanları temizler, logosuzu atlar
3. `node urun-veri-araci.js uret`
4. `node urun-veri-araci.js gorsel`
5. `node urun-veri-araci.js dogrula`
6. Çıkan kumaş/varyant sayısı beklediğinizle uyuşuyor mu, **bakın**

Adım 6 önemli: araç bir kez `fume-2421` kodunu `fume-24` diye ikiye bölmüş ve
aynı kumaş iki ayrı renk gibi görünmüştü. Sayıyı kontrol etmek bunu yakaladı.

Adım 2'de dikkat: yeni parti **farklı bir şablonla** çekilmişse logo başka yerde
olabilir. `yama` o durumda görseli "logosuz" sayıp sessizce atlar — bu yüzden
"yamalandı" sayısı beklediğinizden azsa şablonu gözle kontrol edin ve
`urun-veri-araci.js` içindeki `YAMA` oranlarını güncelleyin.

### Ürün adı / açıklama metni eklemek

Bunlar veri değil, **metindir** → `locales/xx.json` içine, model `id`'sine
bağlı olarak yazılır. Görsel ya da varyant bilgisi oraya YAZILMAZ.

## GitHub Pages'e Yayınlama

1. Bu klasörü bir GitHub reposuna yükleyin (repo kök dizini bu klasörün
   içeriği olmalı — yani `index.html` reponun en üst seviyesinde olmalı).
2. Repo → **Settings → Pages** → "Build and deployment" → Source:
   **Deploy from a branch** → Branch: `main` / `(root)` → Save.
3. Birkaç dakika içinde site `https://kullaniciadi.github.io/repo-adi/`
   adresinde yayında olur.

## Kendi Domaininizi (.com) Bağlamak

1. Domain sağlayıcınızda bir **CNAME** kaydı oluşturup
   `www.domaininiz.com` değerini `kullaniciadi.github.io` olarak ayarlayın.
   Kök domain (`domaininiz.com`) için ise GitHub'ın A kayıtlarını
   (185.199.108.153, 185.199.109.153, 185.199.110.153, 185.199.111.153)
   kullanmanız gerekir.
2. Repo → Settings → Pages → "Custom domain" alanına domaininizi yazın.
3. GitHub otomatik olarak repo köküne bir `CNAME` dosyası ekler — bu dosyayı
   silmeyin.
4. DNS yayılması birkaç saat sürebilir; sonrasında GitHub otomatik olarak
   ücretsiz HTTPS sertifikası sağlar ("Enforce HTTPS" kutusunu işaretleyin).

## Yerelde Test Etmek

Tarayıcıda `index.html` dosyasını doğrudan açmak `fetch()` güvenlik
kısıtlaması nedeniyle dil dosyalarını yükleyemeyebilir. Yerel bir sunucu
ile test edin, örneğin:

```bash
cd site-klasoru
python3 -m http.server 8000
```

sonra tarayıcıda `http://localhost:8000` adresini açın.
