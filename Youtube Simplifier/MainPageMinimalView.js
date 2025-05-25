// ==UserScript==
// @name         YouTube Minimal Recommendations
// @namespace    https://github.com/kalebcole
// @version      1.0.0
// @description  In YouTube’s rich grid (home/sidebar), hide thumbnails, avatars, badges & metadata—only show creator name + video title.
// @match        https://www.youtube.com/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
  
    const css = `
      /* 1) Hide all thumbnail blocks */
      ytd-rich-grid-media #thumbnail,
      ytd-rich-grid-media ytd-thumbnail,
      ytd-rich-grid-media ytd-playlist-thumbnail {
        display: none !important;
      }
  
      /* 2) Hide avatar / channel image */
      ytd-rich-grid-media #avatar-container,
      ytd-rich-grid-media yt-decorated-avatar-view-model {
        display: none !important;
      }
  
      /* 3) Hide all metadata lines, badges, view counts, durations */
      ytd-rich-grid-media ytd-badge-supported-renderer,
      ytd-rich-grid-media #metadata-line,
      ytd-rich-grid-media .inline-metadata-item,
      ytd-rich-grid-media .byline-separated > #separator,
      ytd-rich-grid-media #video-info {
        display: none !important;
      }
  
      /* 4) Only show the title link */
      ytd-rich-grid-media #video-title-link {
        display: block !important;
        color: inherit !important;
        background: none !important;
        font-size: 1em !important;
        line-height: 1.3 !important;
        margin: 0.5em 0 0.2em !important;
      }
      ytd-rich-grid-media #video-title {
        display: inline !important;
      }
  
      /* 5) Only show the channel name under the title */
      ytd-rich-grid-media ytd-channel-name {
        display: block !important;
        font-size: 0.9em !important;
        color: inherit !important;
        margin: 0 !important;
        padding: 0 !important;
      }
  
      /* 6) Collapse any empty containers so there's no extra spacing */
      ytd-rich-grid-media #details,
      ytd-rich-grid-media #meta {
        padding: 0 !important;
        margin: 0 !important;
      }
    `;
  
    const style = document.createElement('style');
    style.textContent = css;
    document.head.appendChild(style);
  })();
  