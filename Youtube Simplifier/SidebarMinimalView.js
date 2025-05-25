// ==UserScript==
// @name         YouTube Sidebar Titles + Watch Later Highlight
// @namespace    https://github.com/kalebcole
// @version      1.1
// @description  Hide thumbnails & metadata in YouTube sidebar, only show titles and make Watch Later button stand out.
// @match        https://www.youtube.com/watch*
// @grant        GM_addStyle
// ==/UserScript==

(function() {
    'use strict';
  
    GM_addStyle(`
      /* Hide the thumbnail image */
      #secondary ytd-compact-video-renderer #thumbnail,
      #secondary ytd-compact-radio-renderer #thumbnail {
        display: none !important;
      }
  
      /* Hide all metadata (channel, view count, time) */
      #secondary ytd-compact-video-renderer .byline-style-type,
      #secondary ytd-compact-video-renderer #metadata-line,
      #secondary ytd-compact-radio-renderer .metadata,
      #secondary ytd-compact-radio-renderer #metadata-line {
        display: none !important;
      }
  
      /* Only show the video title, with a bit more padding */
      #secondary ytd-compact-video-renderer #video-title {
        display: block !important;
        padding: 8px 0 !important;
        font-size: 14px !important;
        line-height: 1.3 !important;
      }
  
      /* Make the Watch later button fully visible and larger */
      #secondary ytd-compact-video-renderer ytd-menu-renderer,
      #secondary ytd-compact-radio-renderer ytd-menu-renderer {
        opacity: 1 !important;
        transform: scale(1.2) !important;
        transition: none !important;
      }
  
      /* Ensure the Watch later icon itself is easy to click */
      #secondary ytd-compact-video-renderer ytd-toggle-button-renderer,
      #secondary ytd-compact-radio-renderer ytd-toggle-button-renderer {
        opacity: 1 !important;
        pointer-events: all !important;
      }
    `);
  
    // MutationObserver isn’t strictly needed since CSS rules auto-apply,
    // but we’ll watch the sidebar for updates just in case.
    const sidebar = document.getElementById('secondary');
    if (sidebar) {
      new MutationObserver(() => {/* CSS handles it */})
        .observe(sidebar, { childList: true, subtree: true });
    }
  })();
  