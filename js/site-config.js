/**
 * Tek merkezden yönetilen site ayarları.
 * Bu değerler dile göre değişmez (email, telefon vb.).
 * Değiştirmek için sadece bu dosyayı güncellemeniz yeterli.
 */
const SITE_CONFIG = {
  email: "senagunay34@gmail.com",
  phoneDisplay: "+90 538 970 17 75",
  phoneTel: "+905389701775",
  whatsappNumber: "905389701775", // ülke kodu + numara, boşluksuz
  instagram: "https://www.instagram.com/velora_turkey",
  instagramHandle: "@velora_turkey",

  // ⚠️ ŞU AN BAĞLI DEĞİL. Bu değeri okuyan hiçbir kod yok (ölçüldü 06.09.2026) —
  // buraya bir dosya adı yazmak tek başına hiçbir şey yapmaz. Üst bilgideki logo
  // doğrudan index.html'de `images/logo-header.png` olarak duruyor.
  // Bayilik logosu geldiğinde: ya bu anahtarı okuyan kodu yazın, ya da logoyu
  // doğrudan sayfaya koyup bu satırı silin.
  logoPath: null,

  // Desteklenen diller ve görünecek etiketleri.
  // Yeni bir dil eklemek için: /locales/xx.json dosyası oluşturun,
  // sonra aşağıya bir satır ekleyin. Başka hiçbir yeri değiştirmenize gerek yok.
  supportedLangs: [
    { code: "tr", label: "Türkçe" },
    { code: "en", label: "English" },
    { code: "de", label: "Deutsch" },
    { code: "nl", label: "Nederlands" },
    { code: "fr", label: "Français" },
    { code: "sv", label: "Svenska" }
  ],
  defaultLang: "tr"
};
