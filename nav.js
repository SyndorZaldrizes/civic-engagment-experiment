// nav.js — shared nav/footer injection for GitHub Pages (project sites friendly)
(function(){
  const pathParts = window.location.pathname.split("/").filter(Boolean);
  // For project pages: /<repo>/something...
  const base = pathParts.length ? `/${pathParts[0]}` : "";
  const here = (pathParts[pathParts.length - 1] || "index.html").toLowerCase();

  const pages = [
    { href: "index.html", label: "Home" },
    // keep these aligned with your current repo filenames (as seen in tree)
    { href: "civic-lab.html", label: "Civic Lab" },
    { href: "venture-overview.html", label: "Venture" },
    { href: "market-research.html", label: "Market Research" },
    { href: "product-prototype.html", label: "Prototypes" },
    { href: "altius.html", label: "Altius" },
    { href: "dissertation.html", label: "Dissertation" },
    { href: "references.html", label: "References" },
  ];

  function full(href){ return `${base}/${href}`; }
  function isActive(href){
    return here === href.toLowerCase() || (here === "" && href === "index.html");
  }

  const navHtml = `
    <div class="site-nav">
      <div class="container">
        <div class="nav-inner">
          <a class="brand" href="${full("index.html")}">
            <span class="dot"></span>
            <span>Civic Engagement Experiment</span>
          </a>

          <nav class="nav-links" aria-label="Primary">
            ${pages.map(p => `<a class="${isActive(p.href) ? "active" : ""}" href="${full(p.href)}">${p.label}</a>`).join("")}
          </nav>

          <button class="burger" id="navBurger" aria-label="Open menu" aria-expanded="false">
            ☰
          </button>
        </div>

        <div class="mobile-panel" id="mobilePanel">
          ${pages.map(p => `<a class="${isActive(p.href) ? "active" : ""}" href="${full(p.href)}">${p.label}</a>`).join("")}
        </div>
      </div>
    </div>
  `;

  const footerHtml = `
    <footer class="site-footer">
      <div class="container">
        <div class="hr"></div>
        <div>Built as a research hub + civic design lab. Static site on GitHub Pages.</div>
        <div class="links">
          <a href="${full("references.html")}">Sources</a>
          <a href="${full("dissertation.html")}">Longform research</a>
          <a href="${full("civic-lab.html")}">Civic Lab</a>
        </div>
      </div>
    </footer>
  `;

  // Inject nav at top of body
  document.addEventListener("DOMContentLoaded", () => {
    document.body.insertAdjacentHTML("afterbegin", navHtml);
    document.body.insertAdjacentHTML("beforeend", footerHtml);

    const burger = document.getElementById("navBurger");
    const panel = document.getElementById("mobilePanel");
    if (burger && panel){
      burger.addEventListener("click", () => {
        const open = panel.style.display === "block";
        panel.style.display = open ? "none" : "block";
        burger.setAttribute("aria-expanded", String(!open));
      });
    }
  });
})();
