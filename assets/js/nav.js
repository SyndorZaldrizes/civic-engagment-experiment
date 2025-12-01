(() => {
  // Finds repo base for GitHub Pages project site: /<repo>/...
  const parts = location.pathname.split("/").filter(Boolean);
  const base = parts.length ? `/${parts[0]}` : "";
  const here = (parts[parts.length - 1] || "index.html").toLowerCase();

  // Update these to your real routes as you finalize your /pages structure
  const links = [
    { href: `${base}/index.html`, label: "Home" },
    { href: `${base}/pages/civic-lab/`, label: "Civic Lab" },
    { href: `${base}/pages/venture/`, label: "Venture" },
    { href: `${base}/pages/altius/`, label: "Altius" },
    { href: `${base}/pages/research/`, label: "Research" },
    { href: `${base}/pages/references/`, label: "References" },
  ];

  const normalize = (u) => u.replace(/\/+$/, "").toLowerCase();

  const nav = `
    <div class="site-nav">
      <div class="container">
        <div class="nav-inner">
          <a class="brand" href="${base}/index.html">
            <span class="dot"></span>
            <span>Civic Engagement Experiment</span>
          </a>

          <nav class="nav-links" aria-label="Primary">
            ${links.map(l => {
              const active = normalize(location.pathname) === normalize(new URL(l.href, location.origin).pathname)
                || (here === "index.html" && normalize(l.href).endsWith("/index.html") && normalize(location.pathname).endsWith("/"));
              return `<a class="${active ? "active" : ""}" href="${l.href}">${l.label}</a>`;
            }).join("")}
          </nav>

          <button class="burger" id="navBurger" aria-label="Open menu" aria-expanded="false">☰</button>
        </div>

        <div class="mobile-panel" id="mobilePanel">
          ${links.map(l => `<a href="${l.href}">${l.label}</a>`).join("")}
        </div>
      </div>
    </div>
  `;

  document.addEventListener("DOMContentLoaded", () => {
    document.body.insertAdjacentHTML("afterbegin", nav);

    const burger = document.getElementById("navBurger");
    const panel = document.getElementById("mobilePanel");
    if (burger && panel) {
      burger.addEventListener("click", () => {
        const open = panel.style.display === "block";
        panel.style.display = open ? "none" : "block";
        burger.setAttribute("aria-expanded", String(!open));
      });
    }
  });
})();
