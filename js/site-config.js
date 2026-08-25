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

  // Bayilik logosu hazır olduğunda /images/logo.svg veya .png olarak
  // ekleyin ve aşağıdaki satırı o dosya adıyla güncelleyin.
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
