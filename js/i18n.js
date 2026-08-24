/**
 * Basit i18n sistemi.
 * - Metinler /locales/xx.json dosyalarında tutulur.
 * - HTML içindeki elemanlar data-i18n="a.b.c" ile işaretlenir.
 * - Diziler (ürünler, adımlar, vb.) her sayfanın kendi render fonksiyonuyla
 *   (window.renderDynamicContent) doldurulur; bkz. her sayfanın sonundaki <script>.
 *
 * Yeni dil eklemek için:
 *   1) /locales/xx.json dosyasını oluşturun (mevcut bir dosyayı kopyalayıp çevirin)
 *   2) js/site-config.js içindeki supportedLangs dizisine bir satır ekleyin
 *   Başka hiçbir dosyayı değiştirmeniz gerekmez.
 */

(function () {
  const CACHE = {};

  function getByPath(obj, path) {
    return path.split(".").reduce((acc, key) => (acc == null ? undefined : acc[key]), obj);
  }

  async function fetchLocale(lang) {
    if (CACHE[lang]) return CACHE[lang];
    const res = await fetch(`locales/${lang}.json`);
    if (!res.ok) throw new Error(`Locale not found: ${lang}`);
    const data = await res.json();
    CACHE[lang] = data;
    return data;
  }

  function detectInitialLang() {
    const stored = localStorage.getItem("site_lang");
    const supported = SITE_CONFIG.supportedLangs.map((l) => l.code);
    if (stored && supported.includes(stored)) return stored;

    const browserLangs = navigator.languages || [navigator.language || ""];
    for (const bl of browserLangs) {
      const short = bl.slice(0, 2).toLowerCase();
      if (supported.includes(short)) return short;
    }
    return SITE_CONFIG.defaultLang;
  }

  function applyStaticTranslations(data) {
    document.querySelectorAll("[data-i18n]").forEach((el) => {
      const key = el.getAttribute("data-i18n");
      const value = getByPath(data, key);
      if (typeof value === "string") el.textContent = value;
    });

    document.querySelectorAll("[data-i18n-attr]").forEach((el) => {
      // format: "placeholder:some.key|title:other.key"
      const pairs = el.getAttribute("data-i18n-attr").split("|");
      pairs.forEach((pair) => {
        const [attr, key] = pair.split(":");
        const value = getByPath(data, key);
        if (typeof value === "string") el.setAttribute(attr, value);
      });
    });

    if (data.meta && data.meta.title) document.title = data.meta.title;
    if (data.meta && data.meta.description) {
      const metaDesc = document.querySelector('meta[name="description"]');
      if (metaDesc) metaDesc.setAttribute("content", data.meta.description);
    }
  }

  function populateLangSelect(currentLang) {
    const select = document.getElementById("lang-select");
    if (!select) return;
    select.innerHTML = "";
    SITE_CONFIG.supportedLangs.forEach((l) => {
      const opt = document.createElement("option");
      opt.value = l.code;
      opt.textContent = l.label;
      if (l.code === currentLang) opt.selected = true;
      select.appendChild(opt);
    });
    select.addEventListener("change", (e) => {
      setLanguage(e.target.value);
    });
  }

  function applyContactConfig() {
    document.querySelectorAll("[data-config]").forEach((el) => {
      const key = el.getAttribute("data-config");
      if (key === "email") { el.textContent = SITE_CONFIG.email; }
      if (key === "phoneDisplay") { el.textContent = SITE_CONFIG.phoneDisplay; }
    });
    document.querySelectorAll("[data-config-href]").forEach((el) => {
      const key = el.getAttribute("data-config-href");
      if (key === "email") el.setAttribute("href", `mailto:${SITE_CONFIG.email}`);
      if (key === "phoneTel") el.setAttribute("href", `tel:${SITE_CONFIG.phoneTel}`);
      if (key === "whatsapp") el.setAttribute("href", `https://wa.me/${SITE_CONFIG.whatsappNumber}`);
    });
  }

  /* Bir dilde EKSİK olan anahtar için kaynak dile (Türkçe) düş.
     Yoksa yeni bir bölüm eklenip henüz çevrilmediğinde sayfa BOŞ görünür —
     ziyaretçi bunu "site bozuk" diye okur. Türkçe görünmesi "henüz çevrilmemiş"
     demektir; bu, boşluktan her zaman iyidir. Çeviri gelince kendiliğinden
     devreye girer, burada bir şey değiştirmek gerekmez. */
  function yedekle(hedef, kaynak) {
    if (!kaynak || typeof kaynak !== 'object') return hedef;
    const c = Array.isArray(kaynak) ? [] : {};
    for (const k of Object.keys(kaynak)) c[k] = kaynak[k];
    for (const k of Object.keys(hedef || {})) {
      const h = hedef[k], y = kaynak[k];
      c[k] = (h && typeof h === 'object' && y && typeof y === 'object') ? yedekle(h, y) : h;
    }
    return c;
  }

  async function setLanguage(lang) {
    let data = await fetchLocale(lang);
    const kaynakDil = SITE_CONFIG.defaultLang;
    if (lang !== kaynakDil) {
      try { data = yedekle(data, await fetchLocale(kaynakDil)); } catch (e) { /* kaynak dil yoksa olduğu gibi devam */ }
    }
    document.documentElement.setAttribute("lang", lang);
    localStorage.setItem("site_lang", lang);
    applyStaticTranslations(data);
    applyContactConfig();
    if (typeof window.renderDynamicContent === "function") {
      window.renderDynamicContent(data);
    }
    populateLangSelect(lang);
    document.dispatchEvent(new CustomEvent("localeready", { detail: data }));
  }

  window.SiteI18n = { setLanguage, detectInitialLang, fetchLocale };

  document.addEventListener("DOMContentLoaded", () => {
    const lang = detectInitialLang();
    setLanguage(lang);
  });
})();
