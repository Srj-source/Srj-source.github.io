
(function() {
    'use strict';

    // ====== CONFIGURATION ======
    var REDIRECT_URL = 'https://srj-source.github.io/errorpage.html';  // <-- change this

    // ====== REDIRECTION HELPER ======
    function flee() {
        window.location.replace(REDIRECT_URL);
    }

    // ====== 1. DEVTOOLS DETECTION (TIMING + DIMENSIONS) ======
    function detectDevTools() {
        // Method A: debugger statement timing
        var start = performance.now();
        debugger; // will pause only when DevTools is open and active
        var end = performance.now();
        if (end - start > 50) { // threshold in milliseconds (lower = more sensitive)
            flee();
            return;
        }

        // Method B: window size difference (for docked DevTools)
        var widthDiff = window.outerWidth - window.innerWidth;
        var heightDiff = window.outerHeight - window.innerHeight;
        // Common thresholds: sidebar > 160px, bottom panel > 160px
        if (widthDiff > 160 || heightDiff > 160) {
            flee();
        }
    }
    setInterval(detectDevTools, 200); // check every 200ms

    // ====== 2. KEYBOARD SHORTCUT INTERCEPTION ======
    document.addEventListener('keydown', function(e) {
        // F12 alone
        if (e.key === 'F12') {
            e.preventDefault();
            flee();
            return;
        }
        // PrintScreen (where supported)
        if (e.key === 'PrintScreen') {
            e.preventDefault();
            flee();
            return;
        }
        // Ctrl + anything (Cmd on Mac)
        if (e.ctrlKey || e.metaKey) {
            // ignore if only the modifier key itself was pressed
            if (e.key !== 'Control' && e.key !== 'Shift' && e.key !== 'Alt' && e.key !== 'Meta') {
                e.preventDefault();
                flee();
            }
        }
    }, true);

    // ====== 3. RIGHT‑CLICK (context menu) ======
    document.addEventListener('contextmenu', function(e) {
        e.preventDefault();
        flee();
    }, true);

    // ====== 4. DRAG‑START (prevents dragging images/links to save) ======
    document.addEventListener('dragstart', function(e) {
        e.preventDefault();
        flee();
    }, true);

    // ====== 5. DISABLE TEXT SELECTION (CSS + event block) ======
    var style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = '* { user-select: none !important; -webkit-user-select: none !important; -moz-user-select: none !important; -ms-user-select: none !important; }';
    document.head.appendChild(style);

    // Also prevent selectstart event
    document.addEventListener('selectstart', function(e) {
        e.preventDefault();
    }, true);

    // ====== 6. PREVENT DRAG/DROP OF IMAGES (extra) ======
    document.addEventListener('drop', function(e) {
        e.preventDefault();
        flee();
    }, true);

    // ====== 7. OPTIONAL: clear console to discourage snooping ======
    if (console.clear) { console.clear(); }
    setInterval(function() {
        if (console.clear) { console.clear(); }
    }, 1000);


    // ====== 8. THREE‑FINGER TOUCH DETECTION (NEW) ======
    document.addEventListener('touchstart', function(e) {
        // Redirect instantly when exactly 3 fingers touch the screen.
        // If you want to catch 3 or more fingers, change === 3 to >= 3.
        if (e.touches.length === 3) {
            e.preventDefault();          // block the gesture itself
            flee();
        }
    }, { passive: false }); // passive: false allows preventDefault



})();
