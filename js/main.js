/* Alt bilgideki hizmet/çözüm listeleri.
   Altı sayfanın alt bilgisi birebir aynı olduğu için render BURADA duruyor —
   her sayfanın kendi renderDynamicContent'ine kopyalanmadı. "localeready"
   olayı dil her değiştiğinde yeniden tetikleniyor, listeler de çevriliyor. */
document.addEventListener("localeready", (e) => {
  const veri = e.detail && e.detail.footer;
  if (!veri) return;
  [["footer-services", veri.services], ["footer-solutions", veri.solutions]]
    .forEach(([id, liste]) => {
      const el = document.getElementById(id);
      if (!el) return;
      el.innerHTML = "";
      (liste || []).forEach((metin) => {
        const li = document.createElement("li");
        li.textContent = metin;
        el.appendChild(li);
      });
    });
});

document.addEventListener("DOMContentLoaded", () => {
  const toggle = document.querySelector(".nav-toggle");
  const nav = document.querySelector(".main-nav");
  if (toggle && nav) {
    toggle.addEventListener("click", () => {
      const isOpen = nav.classList.toggle("open");
      toggle.setAttribute("aria-expanded", String(isOpen));
    });
    nav.querySelectorAll("a").forEach((a) =>
      a.addEventListener("click", () => {
        nav.classList.remove("open");
        toggle.setAttribute("aria-expanded", "false");
      })
    );
  }
});
