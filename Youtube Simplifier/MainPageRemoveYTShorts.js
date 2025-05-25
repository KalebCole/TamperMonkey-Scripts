// ==UserScript==
// @name         Remove YouTube Shorts Sections
// @namespace    https://github.com/kalebcole
// @version      1.0.0
// @description  Hide the Shorts shelves (ytd-rich-shelf-renderer) on YouTube home and channel pages.
// @match        https://www.youtube.com/*
// @grant        none
// ==/UserScript==

(function() {
  'use strict';

  const css = `
    /* Hide any top-level rich-shelf-renderer (commonly used for Shorts) */
    #content > ytd-rich-shelf-renderer {
      display: none !important;
    }
  `;

  // Inject the CSS
  const style = document.createElement('style');
  style.textContent = css;
  document.head.appendChild(style);

  // In case YouTube re-renders the content area in-place, observe for new nodes
  const observer = new MutationObserver((mutations) => {
    for (const m of mutations) {
      for (const node of m.addedNodes) {
        if (node.nodeType === 1 && node.matches && node.matches('ytd-rich-shelf-renderer')) {
          node.style.display = 'none';
        }
      }
    }
  });

  // Watch the main #contents container (covers home, channel feeds, etc.)
  const contents = document.querySelector('#contents, #primary #contents');
  if (contents) {
    observer.observe(contents, { childList: true, subtree: true });
  }
})();
