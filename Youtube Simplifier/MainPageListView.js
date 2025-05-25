// ==UserScript==
// @name         YouTube List-View Feed
// @namespace    https://github.com/kalebcole
// @version      1.0.0
// @description  Turn YouTube’s grid of recommended items into a single-column list.
// @match        https://www.youtube.com/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
  
    const css = `
      /* 1) Make the container a normal block flow, not a grid */
      ytd-rich-grid-renderer #contents {
        display: block !important;
      }
  
      /* 2) Force each item to full width and block display */
      ytd-rich-item-renderer {
        display: block !important;
        width: auto !important;
        margin: 0 0 1em !important;
      }
  
      /* 3) Remove the inline-flex wrapper so items stack vertically */
      ytd-rich-grid-renderer .rich-grid-row {
        display: block !important;
      }
  
      /* 4) Optional: add a separator line between items */
      ytd-rich-item-renderer {
        border-bottom: 1px solid #e0e0e0;
        padding-bottom: 1em;
      }
  
      /* 5) Optional: make the title/channel spacing a bit tighter */
      ytd-rich-item-renderer #video-title-link,
      ytd-rich-item-renderer ytd-channel-name {
        margin: 0.2em 0 !important;
        display: block !important;
      }
    `;
  
    const style = document.createElement('style');
    style.textContent = css;
    document.head.appendChild(style);
  })();
  