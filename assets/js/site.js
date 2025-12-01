/* assets/js/site.js
   The Reverie — single behavior file:
   - mobile nav toggle
   - active nav link
   - footer year
*/
(() => {
  const ready = (fn) => {
    if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", fn);
    else fn();
  };

  const normalize = (path) => (path || "").replace(/\/+$/, "").toLowerCase();

  // Works for GitHub Pages project sites: /<repo-name>/...
  const getBase = () => {
    const parts = window.location.pathname.split("/").filter(Boolean);
    return parts.length ? `/${parts[0]}` : "";
  };

  ready(() => {
    const base = getBase();

    // Mobile nav toggle
    const btn = document.querySelector(".nav-toggle");
    const nav = document.querySelector(".main-nav");
    if (btn && nav) {
      btn.addEventListener("click", () => {
        const open = nav.classList.toggle("nav-open");
        btn.setAttribute("aria-expanded", String(open));
      });

      // close menu after clicking a link on mobile
      nav.querySelectorAll("a").forEach((a) => {
        a.addEventListener("click", () => {
          nav.classList.remove("nav-open");
          btn.setAttribute("aria-expanded", "false");
        });
      });
    }

    // Active nav link
    const cur = normalize(window.location.pathname);
    document.querySelectorAll(".main-nav a[href]").forEach((a) => {
      const href = a.getAttribute("href") || "";
      let targetPath = "";
      try {
        // Resolve relative hrefs correctly
        targetPath = normalize(new URL(href, window.location.origin).pathname);
      } catch {
        targetPath = normalize(href);
      }

      // If using base-prefixed absolute links, normalize them too
      const curNoBase = normalize(cur.replace(base.toLowerCase(), "")) || "/";
      const targetNoBase = normalize(targetPath.replace(base.toLowerCase(), "")) || "/";

      const active =
        curNoBase === targetNoBase ||
        (targetNoBase !== "/" && curNoBase.startsWith(targetNoBase));

      a.classList.toggle("active", active);
    });

    // Footer year
    const year = document.getElementById("year");
    if (year) year.textContent = String(new Date().getFullYear());
  });
})();
