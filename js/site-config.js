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

  // 📌 LOGO BURADA DEĞİL — bilerek (10.09.2026'da `logoPath: null` silindi).
  // Logo altı sayfanın da 25. satırında doğrudan duruyor:
  //     <img src="images/logo-header.png" alt="Velora" class="brand-logo">
  // Buraya taşınmadı çünkü kazancı yok: yeni logo geldiğinde dosyayı aynı adla
  // (`images/logo-header.png`) üzerine yazmak yeterli, hiçbir kod değişmez.
  // Ayara bağlansaydı logo ancak JavaScript çalıştıktan sonra görünürdü —
  // sayfa açılırken üst bilgide bir an boşluk kalırdı.
  // Bu dosyadaki ayarlar, METİN olarak birçok yerde geçen ve değişebilen
  // şeyler içindir (telefon, e-posta, Instagram); bir görsel dosyası için değil.

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
