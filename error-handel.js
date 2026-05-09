(function() {
  'use strict';

  const REDIRECT_URL = 'https://srj-source.github.io/errorpage.html';
  const ENABLE_REDIRECT = true;
  let isTriggered = false;

  // ---------- OVERLAY ----------
  const overlay = document.createElement('div');
  overlay.id = 'sec-blackout-overlay';
  overlay.innerHTML = `
    <div style="font-weight:800;font-size:2rem;letter-spacing:-0.02em;">⛔ CONNECTION LOCKED</div>
    <div style="font-size:1.1rem;margin-top:1rem;max-width:80%;opacity:0.9;">Unauthorized activity detected · session terminated</div>
    <div style="font-size:0.8rem;margin-top:2rem;border-top:1px solid rgba(255,255,255,0.2);padding-top:1rem;">Srj-Source</div>
  `;
  Object.assign(overlay.style, {
    position: 'fixed', top: '0', left: '0', width: '100vw', height: '100vh',
    background: '#000', color: '#fff', zIndex: '2147483647',
    display: 'none', alignItems: 'center', justifyContent: 'center',
    flexDirection: 'column', textAlign: 'center',
    fontFamily: 'system-ui, sans-serif', fontSize: 'clamp(1.2rem, 5vw, 2.2rem)',
    fontWeight: '500', pointerEvents: 'none'
  });
  document.documentElement.appendChild(overlay);

  function flee() {
    if (isTriggered) return;
    isTriggered = true;
    overlay.style.display = 'flex';
    overlay.style.pointerEvents = 'auto';
    if (document.body) document.body.style.display = 'none';
    if (ENABLE_REDIRECT && REDIRECT_URL.trim()) {
      setTimeout(() => { window.location.replace(REDIRECT_URL); }, 30);
    }
  }

  // ---------- DEVTOOLS DETECTION (size only, no debugger spam) ----------
  function detectDevTools() {
    if (isTriggered) return;
    const widthDiff = window.outerWidth - window.innerWidth;
    const heightDiff = window.outerHeight - window.innerHeight;
    if (widthDiff > 160 || heightDiff > 160) flee();
  }
  setInterval(detectDevTools, 500);  // check every 500ms – less aggressive

  // ---------- KEYBOARD SHORTCUTS (block only dev-related) ----------
  function blockDevShortcuts(e) {
    if (isTriggered) return;
    // F12
    if (e.key === 'F12') { e.preventDefault(); flee(); return; }
    // Ctrl+U (view source)
if (e.ctrlKey &&e.shiftKey&& /^[a-z]$/i.test(e.key)) {
    e.preventDefault();
    flee();
    return;
  }
    // Ctrl+U (view source)
if (e.ctrlKey && /^[a-z]$/i.test(e.key)) {
    e.preventDefault();
    flee();
    return;
  }

  }
  document.addEventListener('keydown', blockDevShortcuts, true);

  // ---------- RIGHT-CLICK ----------
  document.addEventListener('contextmenu', e => { e.preventDefault(); flee(); }, true);

  // ---------- DRAG & DROP ----------
  document.addEventListener('dragstart', e => { e.preventDefault(); flee(); }, true);
  document.addEventListener('drop', e => { e.preventDefault(); flee(); }, true);

  // ---------- TEXT SELECTION ----------
  const antiSelectStyle = document.createElement('style');
  antiSelectStyle.textContent = `* { user-select: none !important; -webkit-user-select: none !important; }`;
  document.head.appendChild(antiSelectStyle);
  document.addEventListener('selectstart', e => e.preventDefault(), true);

  // ---------- 3-FINGER TOUCH (allow 1-finger scroll) ----------
  function handleMultiTouch(e) {
    if (isTriggered) return;
    if (e.touches && e.touches.length >= 3) {
      e.preventDefault();
      e.stopImmediatePropagation();
      flee();
    }
  }
  document.addEventListener('touchstart', handleMultiTouch, { passive: false });
  document.addEventListener('touchmove', handleMultiTouch, { passive: false });
  // ❌ REMOVED: document.documentElement.style.touchAction = 'none';
  // Let the browser handle normal touch gestures (scrolling, zoom).

  // ---------- CONSOLE (clear once) ----------
  if (console.clear) console.clear();

  // ---------- MUTATION OBSERVER (watch overlay removal) ----------
  const observer = new MutationObserver(mutations => {
    if (isTriggered) return;
    for (const mut of mutations) {
      if (mut.removedNodes) {
        for (const node of mut.removedNodes) {
          if (node && node.id === 'sec-blackout-overlay') {
            flee();
            return;
          }
        }
      }
    }
  });
  observer.observe(document.documentElement, { childList: true, subtree: false });

})();
