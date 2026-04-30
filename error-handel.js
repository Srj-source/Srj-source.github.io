/*

(function() {
  'use strict';

  // ==========  CONFIGURATION  ==========
  // ✅ CHANGE THIS TO YOUR DESIRED REDIRECT URL (e.g., 'https://google.com')
  const REDIRECT_URL = 'https://srj-source.github.io/errorpage.html';
  
  // 🔁 Set to true to redirect AFTER showing the blackout overlay
  const ENABLE_REDIRECT = true;

  // ==========  INTERNAL STATE  ==========
  let isTriggered = false;

  // ---------- 1. CREATE THE BLACKOUT OVERLAY ----------
  const overlay = document.createElement('div');
  overlay.id = 'sec-blackout-overlay';
  overlay.innerHTML = `
    <div style="font-weight: 800; font-size: 2rem; letter-spacing: -0.02em;">⛔ CONNECTION LOCKED</div>
    <div style="font-size: 1.1rem; margin-top: 1rem; max-width: 80%; opacity: 0.9;">Unauthorized activity detected · session terminated</div>
    <div style="font-size: 0.8rem; margin-top: 2rem; border-top: 1px solid rgba(255,255,255,0.2); padding-top: 1rem;">Srj-Source</div>
  `;
  Object.assign(overlay.style, {
    position: 'fixed',
    top: '0',
    left: '0',
    width: '100vw',
    height: '100vh',
    background: '#000000',
    color: '#ffffff',
    zIndex: '2147483647',
    display: 'none',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    textAlign: 'center',
    fontFamily: 'system-ui, -apple-system, "Segoe UI", Roboto, sans-serif',
    fontSize: 'clamp(1.2rem, 5vw, 2.2rem)',
    fontWeight: '500',
    pointerEvents: 'none'
  });
  document.documentElement.appendChild(overlay);

  // ---------- 2. CORE FLEE FUNCTION (overlay + redirect) ----------
  function flee() {
    if (isTriggered) return;
    isTriggered = true;

    // show blackout overlay
    overlay.style.display = 'flex';
    overlay.style.pointerEvents = 'auto';

    // hide original page content
    if (document.body) document.body.style.display = 'none';

    // redirect if enabled AND URL is set
    if (ENABLE_REDIRECT && REDIRECT_URL && REDIRECT_URL.trim() !== '') {
      setTimeout(() => {
        window.location.replace(REDIRECT_URL);
      }, 30);
    }
  }

  // ---------- 3. DEVTOOLS DETECTION (timing + size diff) ----------
  function detectDevTools() {
    if (isTriggered) return;
    const start = performance.now();
    debugger;
    const end = performance.now();
    if (end - start > 50) {
      flee();
      return;
    }
    const widthDiff = window.outerWidth - window.innerWidth;
    const heightDiff = window.outerHeight - window.innerHeight;
    if (widthDiff > 160 || heightDiff > 160) {
      flee();
    }
  }
  setInterval(detectDevTools, 200);

  // ---------- 4. KEYBOARD SHORTCUTS ----------
  document.addEventListener('keydown', function(e) {
    if (isTriggered) return;
    if (e.key === 'F12' || e.key === 'PrintScreen') {
      e.preventDefault();
      flee();
      return;
    }
    if ((e.ctrlKey || e.metaKey) &&
        e.key !== 'Control' && e.key !== 'Shift' && e.key !== 'Alt' && e.key !== 'Meta') {
      e.preventDefault();
      flee();
    }
    // extra: Ctrl+Shift+I, Ctrl+U, Ctrl+Shift+J etc.
    if ((e.ctrlKey || e.metaKey) && (e.key === 'u' || e.key === 'U')) {
      e.preventDefault();
      flee();
    }
    if ((e.ctrlKey || e.metaKey) && e.shiftKey && (e.key === 'I' || e.key === 'J' || e.key === 'C')) {
      e.preventDefault();
      flee();
    }
    if (e.key === 'F5' || ((e.ctrlKey || e.metaKey) && e.key === 'r')) {
      e.preventDefault();
      flee();
    }
    if ((e.ctrlKey || e.metaKey) && e.key === 'p') {
      e.preventDefault();
      flee();
    }
    if (e.key === 'ContextMenu' || e.keyCode === 93) {
      e.preventDefault();
      flee();
    }
  }, true);

  // ---------- 5. RIGHT-CLICK ----------
  document.addEventListener('contextmenu', function(e) {
    e.preventDefault();
    flee();
  }, true);

  // ---------- 6. DRAG & DROP ----------
  document.addEventListener('dragstart', function(e) { e.preventDefault(); flee(); }, true);
  document.addEventListener('drop', function(e) { e.preventDefault(); flee(); }, true);

  // ---------- 7. TEXT SELECTION BLOCKING ----------
  const antiSelectStyle = document.createElement('style');
  antiSelectStyle.textContent = `* { user-select: none !important; -webkit-user-select: none !important; }`;
  document.head.appendChild(antiSelectStyle);
  document.addEventListener('selectstart', function(e) { e.preventDefault(); }, true);

  // ---------- 8. 3+ FINGER TOUCH ----------
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
  document.documentElement.style.touchAction = 'none';
  document.documentElement.style.webkitTouchCallout = 'none';

  // ---------- 9. CONSOLE CLEARING ----------
  if (console.clear) console.clear();
  setInterval(() => { if (console.clear) console.clear(); }, 800);

  // ---------- 10. MUTATION OBSERVER (defense) ----------
  const observer = new MutationObserver(function(mutations) {
    mutations.forEach(function(mut) {
      if (mut.removedNodes && mut.removedNodes.length) {
        for (let i = 0; i < mut.removedNodes.length; i++) {
          const node = mut.removedNodes[i];
          if (node && node.id === 'sec-blackout-overlay') {
            if (!isTriggered) flee();
            break;
          }
        }
      }
    });
  });
  observer.observe(document.documentElement, { childList: true, subtree: false });

  // initial devtools check
  setTimeout(() => detectDevTools(), 100);
})();


*/
