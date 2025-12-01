*** Begin Patch
*** Update File: assets/js/site.js
@@
 (() => {
-  const include = async (name, path) => {
-    const slot = document.querySelector(`[data-include="${name}"]`);
-    if (!slot) return;
-    const res = await fetch(path, { cache: "no-cache" });
-    slot.innerHTML = await res.text();
-  };
-
-  include("header", "partials/header.html").then(() => {
+  const include = async (name, path) => {
+    const slot = document.querySelector(`[data-include="${name}"]`);
+    if (!slot) return;
+    const res = await fetch(path, { cache: "no-cache" });
+    slot.innerHTML = await res.text();
+  };
+
+  // Determine project base from the current URL (e.g. "/the‑reverie")
+  const parts  = window.location.pathname.split('/').filter(Boolean);
+  const base   = parts.length ? `/${parts[0]}` : '';
+  const prefix = base ? `${base}/partials` : 'partials';
+
+  include("header", `${prefix}/header.html`).then(() => {
     const btn = document.querySelector(".nav-toggle");
     const nav = document.querySelector(".main-nav");
     if (!btn || !nav) return;

     btn.addEventListener("click", () => {
       const open = nav.classList.toggle("open");
       btn.setAttribute("aria-expanded", String(open));
     });
   });

-  include("footer", "partials/footer.html").then(() => {
+  include("footer", `${prefix}/footer.html`).then(() => {
     const year = document.getElementById("year");
     if (year) year.textContent = new Date().getFullYear();
   });
 })();
*** End Patch
