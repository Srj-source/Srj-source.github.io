document.addEventListener("DOMContentLoaded", () => {

  document.documentElement.lang = "en";

  const head = document.head;

  // meta
  const metaCharset = document.createElement("meta");
  metaCharset.setAttribute("charset", "UTF-8");
  head.appendChild(metaCharset);

  const metaViewport = document.createElement("meta");
  metaViewport.name = "viewport";
  metaViewport.content = "width=device-width, initial-scale=1.0, viewport-fit=cover";
  head.appendChild(metaViewport);

  // title
  const title = document.createElement("title");
  title.textContent = "srj-source{direct access not allowed}";
  head.appendChild(title);

  // CSS
  const link = document.createElement("link");
  link.rel = "stylesheet";
  link.href = "index.css";
  head.appendChild(link);

  // ✅ BODY SAFE NOW
  const canvas = document.createElement("canvas");
  canvas.id = "sceneCanvas";
  document.body.appendChild(canvas);

  // ✅ SCRIPT LOADER (SAFE)
  const script = document.createElement("script");
  script.src = "./index.js";

  script.onload = () => console.log("index.js loaded ✅");
  script.onerror = () => console.log("index.js failed ❌");

  document.body.appendChild(script);

});