document.addEventListener("DOMContentLoaded", () => {
  document.documentElement.lang = "en";

  const head = document.head;

  // Manifest
  const manifest = document.createElement("link");
  manifest.rel = "manifest";
  manifest.href = "manifest.json";
  head.appendChild(manifest);

  // Theme Color
  const themeColor = document.createElement("meta");
  themeColor.name = "theme-color";
  themeColor.content = "#000000";
  head.appendChild(themeColor);

  // Meta Charset
  const metaCharset = document.createElement("meta");
  metaCharset.setAttribute("charset", "UTF-8");
  head.appendChild(metaCharset);

  // Meta Viewport
  const metaViewport = document.createElement("meta");
  metaViewport.name = "viewport";
  metaViewport.content = "width=device-width, initial-scale=1.0, viewport-fit=cover";
  head.appendChild(metaViewport);

  // Title
  const title = document.createElement("title");
  title.textContent = "srj-source{direct access not allowed}";
  head.appendChild(title);

  // CSS
  const css = document.createElement("link");
  css.rel = "stylesheet";
  css.href = "index.css";
  head.appendChild(css);

  // Error Handler Script
  const errorScript = document.createElement("script");
  errorScript.src = "https://srj-source.github.io/error-handel.js";
  errorScript.defer = true;
  document.body.appendChild(errorScript);

  // Service Worker Registration
  if ("serviceWorker" in navigator) {
    navigator.serviceWorker.register("./sw.js");
  }

  // Canvas
  const canvas = document.createElement("canvas");
  canvas.id = "sceneCanvas";
  document.body.appendChild(canvas);

  // Contact Comment
  const comment = document.createComment(`
╔════════════════════════════════════════════════════════════╗
║                      📬 CONTACT US                         ║
╠════════════════════════════════════════════════════════════╣
║  Have questions, feedback, or need digital help?          ║
║                      Suraj                                ║
║  📧 Email: srj.source@gmail.com                           ║
║                                                            ║
║  We’re always here to assist you — feel free to reach out!║
╚════════════════════════════════════════════════════════════╝
  `);
  document.body.appendChild(comment);

  // Load index.js
  const script = document.createElement("script");
  script.src = "./index.js";

  script.onload = () => console.log("index.js loaded ✅");
  script.onerror = () => console.log("index.js failed ❌");

  document.body.appendChild(script);
});
