# [Firma Adı] — Tanıtım Web Sitesi

Saf HTML/CSS/JS ile hazırlanmış, çok dilli (TR/DE/NL/FR/SV) B2B tanıtım sitesi.
Satış yapmaz; ürünleri, üretim sürecini ve iletişim bilgilerini gösterir.

## Klasör Yapısı

```
index.html          → Anasayfa
urunler.html         → Ürünler
atolye.html          → Atölye / Üretim
hakkimizda.html       → Hakkımızda
iletisim.html         → İletişim
css/style.css        → Tüm görsel tasarım
js/site-config.js    → E-posta, telefon, WhatsApp gibi sabit bilgiler (TEK yerden yönetilir)
js/i18n.js           → Dil sistemi (JSON dosyalarını okuyup sayfaya basar)
js/main.js           → Mobil menü davranışı
locales/tr.json       → Türkçe metinler (kaynak dil)
locales/de.json       → Almanca
locales/nl.json       → Hollandaca
locales/fr.json       → Fransızca
locales/sv.json       → İsveççe
images/               → Görseller (şu an placeholder SVG'ler)
```

## Şu an placeholder / doldurulması gerekenler

1. **Firma adı** — Her `locales/xx.json` dosyasında `brand.name` alanı
   `"[Firma Adı]"` / `"[Firmenname]"` vb. olarak bırakıldı. Karar verince
   5 dosyada da bu alanı (ve `about.intro_paragraphs` içindeki ilk cümleyi)
   güncellemeniz yeterli.
2. **Logo** — `js/site-config.js` içindeki `logoPath` alanı `null`. Logo
   dosyasını `images/logo.svg` (veya .png) olarak ekleyip, `index.html`
   vb. sayfalardaki `.brand-mark` elemanını görselle değiştirebilirsiniz.
   Şu an marka simgesi olarak basit bir CSS deseni kullanılıyor.
3. **Adres** — `locales/xx.json` → `contact.address` alanı geçici olarak
   "Kuvayi Milliye Mahallesi, Balıkesir" olarak girildi. Tam adres
   belli olunca 5 dosyada da güncelleyin (iletişim sayfasında ayrıca
   "adres geçicidir" notu gösteriliyor, adres kesinleşince bu notu
   `contact.form_note` alanından kaldırabilirsiniz).
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

## Ürün listesini güncellemek

`locales/xx.json` içindeki `products.items` dizisine yeni bir ürün eklemek
için mevcut bir ürünü kopyalayıp düzenleyin. `category` alanı `"sineklik"`
veya `"plise"` olmalı. Yeni eklenen ürün görseli için `urunler.html`
içindeki `imageOrder` dizisine, ürünün JSON'daki sırasına denk gelecek
şekilde bir görsel yolu ekleyin.

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
