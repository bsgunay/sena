/**
 * VELORA — ÜRÜN KATMANI
 * ----------------------------------------------------------------------------
 * `js/urun-verisi.js` üretilmiş bir veri dosyasıdır (dokunulmaz). Bu dosya o
 * verinin üzerine sayfaların ihtiyaç duyduğu sorguları koyar:
 *   "bu modelde hangi kumaşlar var", "bu kumaşta hangi çerçeve renkleri var",
 *   "bu kombinasyonun görseli hangisi".
 *
 * İKİ SAYFA DA BURAYI KULLANIR (urunler.html + urun.html). Aynı mantığı iki
 * yere yazmamak için ayrıldı — biri değişip diğeri unutulursa sayfalar sessizce
 * farklı davranırdı.
 *
 * TASARIM KURALI: gösterilecek her AD çeviriden gelir, veriden değil.
 * Veri yalnızca `id` ve ölçülebilir bilgi (renk kodu, dosya adı) taşır.
 * Veri içindeki Türkçe `ad` alanları yalnızca çeviri eksikse yedek olarak
 * kullanılır — böylece yeni bir çerçeve rengi eklenince site boş metin
 * göstermez, Türkçesini gösterir.
 */

(function () {
  const V = window.VELORA_URUNLER;
  if (!V) { console.error('urun-verisi.js yüklenmemiş.'); return; }

  const modelById   = Object.fromEntries(V.modeller.map(m => [m.id, m]));
  const kumasById   = Object.fromEntries(V.kumaslar.map(k => [k.id, k]));
  const cerceveById = Object.fromEntries(V.cerceveler.map(c => [c.id, c]));

  /* --- Varyant araması için indeks. 486 varyantı her tıklamada baştan taramak
         yerine bir kez anahtarlıyoruz. --- */
  const varyantById = {};
  const modelIndeks = {};   // model -> { kumaslar[], cerceveler{kumas: []} }

  for (const v of V.varyantlar) {
    varyantById[anahtar(v.model, v.kumas, v.cerceve)] = v;

    const mi = (modelIndeks[v.model] ??= { kumaslar: [], cerceveler: {} });
    if (!mi.kumaslar.includes(v.kumas)) mi.kumaslar.push(v.kumas);
    (mi.cerceveler[v.kumas] ??= []).push(v.cerceve);
  }

  function anahtar(model, kumas, cerceve) {
    return [model, kumas, cerceve].join('§');
  }

  /* --- Çeviriden ad çöz; yoksa verideki Türkçe ada düş --- */
  function ceviriliAd(t, yol, yedek) {
    const v = yol.split('.').reduce((a, k) => (a == null ? undefined : a[k]), t);
    return typeof v === 'string' && v ? v : yedek;
  }

  /* --- Site görselinin yolu. `gorsel` komutu uzantıyı .jpg'ye çeviriyor,
         sayfa da aynı dönüşümü yapmalı, yoksa kırık görsel çıkar. --- */
  function gorselYolu(modelId, dosya) {
    return 'images/urunler/' + modelId + '/' + dosya.replace(/\.(jpeg|png)$/i, '.jpg');
  }

  /* --- Çekim sırası: önce çerçeve (ürün bütünüyle görünür), sonra profil --- */
  const CEKIM_SIRA = ['cerceve', 'profil'];
  function cekimSirala(gorseller) {
    return gorseller.slice().sort(
      (a, b) => CEKIM_SIRA.indexOf(a.cekim) - CEKIM_SIRA.indexOf(b.cekim));
  }

  window.VeloraUrun = {
    veri: V,

    modeller()      { return V.modeller; },
    model(id)       { return modelById[id] || null; },
    kumas(id)       { return kumasById[id] || null; },
    cerceve(id)     { return cerceveById[id] || null; },
    gorselYolu,
    cekimSirala,

    /* Bu model hangi kumaşlarda var? Veri sırası değil, ada göre. */
    kumaslar(modelId) {
      const mi = modelIndeks[modelId];
      if (!mi) return [];
      return mi.kumaslar
        .map(id => kumasById[id])
        .filter(Boolean)
        .sort((a, b) => a.ad.localeCompare(b.ad, 'tr'));
    },

    /* Bu kumaşta hangi çerçeve renkleri var? Her kombinasyon üretilmiyor —
       kullanıcıya olmayan seçeneği göstermemek için bu liste süzülüyor. */
    cerceveler(modelId, kumasId) {
      const mi = modelIndeks[modelId];
      if (!mi) return [];
      const izin = new Set(mi.cerceveler[kumasId] || []);
      return V.cerceveler.filter(c => izin.has(c.id));   // sabit açıktan koyuya sıra
    },

    varyant(modelId, kumasId, cerceveId) {
      return varyantById[anahtar(modelId, kumasId, cerceveId)] || null;
    },

    /* Kart listesi için temsilî görsel: modelin ilk varyantının çerçeve çekimi */
    kapakGorseli(modelId) {
      const v = V.varyantlar.find(x => x.model === modelId);
      if (!v || !v.gorseller.length) return null;
      const g = cekimSirala(v.gorseller)[0];
      return gorselYolu(modelId, g.dosya);
    },

    /* --- Gösterilecek adlar (çeviri öncelikli) --- */
    ad: {
      model(t, id)   { return ceviriliAd(t, 'products.models.' + id + '.name', (modelById[id] || {}).ad || id); },
      ozet(t, id)    { return ceviriliAd(t, 'products.models.' + id + '.summary', ''); },
      cerceve(t, id) { return ceviriliAd(t, 'products.frames.' + id, (cerceveById[id] || {}).ad || id); },
      /* Montaj tipi seçici ekseni DEĞİL (bkz. urun-veri-araci.js'teki gerekçe);
         yalnızca metinlerde geçiyor. Anahtarlar çeviride duruyor. */
      montaj(t, id)  { return ceviriliAd(t, 'products.mounts.' + id, id); },
      /* Kumaş adı şimdilik veriden geliyor: "Somon 69" gibi renk + tedarikçi
         kodu. Velora kendi adlandırmasını koyunca buraya da çeviri anahtarı
         eklenir; imza değişmesin diye `t` şimdiden alınıyor. */
      kumas(t, id)   { return (kumasById[id] || {}).ad || id; },
      ui(t, k, yedek) { return ceviriliAd(t, 'products.ui.' + k, yedek || k); }
    }
  };
})();
