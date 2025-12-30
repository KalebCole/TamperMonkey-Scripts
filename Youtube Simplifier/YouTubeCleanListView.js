// ==UserScript==
// @name         YouTube Clean List View
// @namespace    https://github.com/kalebcole
// @version      2.4.0
// @description  YouTube clean list view: titles + creator info only, no thumbnails, no Shorts (Home & Watch page sidebar)
// @match        https://www.youtube.com/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    const css = `
      /* ===== REMOVE ALL YOUTUBE SHORTS ===== */
      /* Hide Shorts shelves completely */
      #content > ytd-rich-shelf-renderer,
      ytd-rich-shelf-renderer[is-shorts],
      ytd-reel-shelf-renderer {
        display: none !important;
      }

      /* CRITICAL: Hide individual Shorts items in the grid */
      /* Only target items that contain Shorts lockup models */
      ytd-rich-item-renderer:has(ytm-shorts-lockup-view-model),
      ytd-rich-item-renderer:has(ytm-shorts-lockup-view-model-v2) {
        display: none !important;
      }

      /* Hide any Shorts-related thumbnails */
      yt-thumbnail-view-model,
      .shortsLockupViewModelHost {
        display: none !important;
      }

      /* ===== LIST VIEW LAYOUT ===== */
      /* Convert grid to single-column list */
      ytd-rich-grid-renderer #contents {
        display: block !important;
      }

      /* Make each video item full width */
      ytd-rich-item-renderer {
        display: block !important;
        width: auto !important;
        margin: 0 0 1em !important;
      }

      /* Stack items vertically */
      ytd-rich-grid-renderer .rich-grid-row {
        display: block !important;
      }

      /* Add separator between items */
      ytd-rich-item-renderer {
        border-bottom: 1px solid #e0e0e0;
        padding: 12px 0;
      }

      /* Dark mode separator */
      html[dark] ytd-rich-item-renderer {
        border-bottom-color: #3f3f3f;
      }

      /* ===== NUCLEAR OPTION: HIDE ENTIRE THUMBNAIL CONTAINER ===== */
      /* Hide the entire media element that contains thumbnails */
      ytd-rich-item-renderer ytd-rich-grid-media {
        display: none !important;
        visibility: hidden !important;
        height: 0 !important;
        width: 0 !important;
        overflow: hidden !important;
      }

      /* Additional nuclear targeting for any thumbnail elements */
      ytd-rich-item-renderer #thumbnail,
      ytd-rich-item-renderer ytd-thumbnail,
      ytd-rich-item-renderer a#thumbnail,
      ytd-rich-item-renderer #thumbnail-container,
      ytd-rich-item-renderer ytd-thumbnail *,
      ytd-rich-item-renderer #dismissible > div:first-child {
        display: none !important;
        visibility: hidden !important;
        opacity: 0 !important;
        height: 0 !important;
        width: 0 !important;
        max-height: 0 !important;
        max-width: 0 !important;
        overflow: hidden !important;
      }

      /* ===== RESTRUCTURE LAYOUT ===== */
      /* Make the details section the main content */
      ytd-rich-item-renderer #content {
        display: flex !important;
        flex-direction: column !important;
      }

      ytd-rich-item-renderer #dismissible {
        display: flex !important;
        flex-direction: column !important;
      }

      /* ===== SHOW CREATOR INFO + TITLE ===== */
      /* Restructure the layout to show avatar, name, and title */
      ytd-rich-item-renderer #details {
        display: flex !important;
        flex-direction: row !important;
        align-items: flex-start !important;
        gap: 12px !important;
        padding: 0 !important;
        margin: 0 !important;
        width: 100% !important;
      }

      /* Show and style the avatar */
      ytd-rich-item-renderer #avatar-link,
      ytd-rich-item-renderer yt-img-shadow#avatar {
        display: block !important;
        flex-shrink: 0 !important;
      }

      ytd-rich-item-renderer #avatar img {
        width: 36px !important;
        height: 36px !important;
        border-radius: 50% !important;
        display: block !important;
        visibility: visible !important;
        opacity: 1 !important;
      }

      /* Content container (title + channel name) */
      ytd-rich-item-renderer #meta {
        display: flex !important;
        flex-direction: column !important;
        gap: 4px !important;
        padding: 0 !important;
        margin: 0 !important;
        flex: 1 !important;
      }

      /* Video title styling */
      ytd-rich-item-renderer #video-title-link {
        display: block !important;
        font-size: 14px !important;
        line-height: 1.4 !important;
        font-weight: 500 !important;
        margin: 0 !important;
        color: var(--yt-spec-text-primary) !important;
      }

      ytd-rich-item-renderer #video-title {
        display: inline !important;
        font-size: 14px !important;
        line-height: 1.4 !important;
      }

      /* Channel name styling */
      ytd-rich-item-renderer ytd-channel-name {
        display: block !important;
        font-size: 12px !important;
        color: var(--yt-spec-text-secondary) !important;
        margin: 0 !important;
        padding: 0 !important;
      }

      ytd-rich-item-renderer ytd-channel-name a {
        color: var(--yt-spec-text-secondary) !important;
      }

      /* ===== HIDE METADATA ===== */
      /* Remove view counts, upload time, badges, etc. */
      ytd-rich-item-renderer ytd-badge-supported-renderer,
      ytd-rich-item-renderer #metadata-line,
      ytd-rich-item-renderer .inline-metadata-item,
      ytd-rich-item-renderer #video-info,
      ytd-rich-item-renderer .ytd-video-meta-block,
      ytd-rich-item-renderer #metadata,
      ytd-rich-item-renderer .metadata-snippet-container {
        display: none !important;
      }

      /* Hide menu button until hover */
      ytd-rich-item-renderer ytd-menu-renderer {
        opacity: 0.3 !important;
        transition: opacity 0.2s !important;
      }

      ytd-rich-item-renderer:hover ytd-menu-renderer {
        opacity: 1 !important;
      }

      /* ===== COMPACT SPACING ===== */
      /* Reduce overall padding for more compact view */
      ytd-rich-item-renderer #content {
        padding: 0 !important;
      }

      ytd-rich-item-renderer #dismissible {
        padding: 0 !important;
      }

      /* ===== WATCH PAGE SIDEBAR (RECOMMENDED VIDEOS) ===== */
      /* New YouTube structure uses yt-lockup-view-model instead of ytd-compact-video-renderer */

      /* Hide thumbnails in sidebar */
      #secondary yt-lockup-view-model .yt-lockup-view-model__content-image,
      #secondary yt-lockup-view-model yt-thumbnail-view-model {
        display: none !important;
        visibility: hidden !important;
        opacity: 0 !important;
        height: 0 !important;
        width: 0 !important;
        max-height: 0 !important;
        max-width: 0 !important;
        overflow: hidden !important;
      }

      /* Restructure sidebar items to show avatar + info */
      #secondary yt-lockup-view-model {
        display: block !important;
        margin: 0 0 12px !important;
        padding: 8px 0 !important;
        border-bottom: 1px solid #e0e0e0 !important;
      }

      html[dark] #secondary yt-lockup-view-model {
        border-bottom-color: #3f3f3f !important;
      }

      /* Layout for sidebar items - horizontal flex with avatar and text */
      #secondary yt-lockup-view-model .yt-lockup-view-model__metadata {
        display: flex !important;
        width: 100% !important;
      }

      #secondary yt-lockup-view-model yt-lockup-metadata-view-model {
        display: flex !important;
        flex-direction: row !important;
        align-items: flex-start !important;
        gap: 12px !important;
        width: 100% !important;
      }

      /* Show and style the avatar in sidebar */
      #secondary yt-lockup-view-model .yt-lockup-metadata-view-model__avatar {
        display: block !important;
        flex-shrink: 0 !important;
        order: -1 !important;
      }

      #secondary yt-lockup-view-model .yt-lockup-metadata-view-model__avatar yt-avatar-shape {
        display: block !important;
      }

      #secondary yt-lockup-view-model .yt-lockup-metadata-view-model__avatar img {
        width: 36px !important;
        height: 36px !important;
        border-radius: 50% !important;
        display: block !important;
        visibility: visible !important;
        opacity: 1 !important;
      }

      /* Content area in sidebar */
      #secondary yt-lockup-view-model .yt-lockup-metadata-view-model__text-container {
        display: flex !important;
        flex-direction: column !important;
        gap: 4px !important;
        flex: 1 !important;
        padding: 0 !important;
        margin: 0 !important;
      }

      /* Video title in sidebar */
      #secondary yt-lockup-view-model .yt-lockup-metadata-view-model__title {
        display: block !important;
        font-size: 14px !important;
        line-height: 1.4 !important;
        font-weight: 500 !important;
        color: var(--yt-spec-text-primary) !important;
        margin: 0 !important;
        padding: 0 !important;
      }

      #secondary yt-lockup-view-model .yt-lockup-metadata-view-model__title span {
        display: inline !important;
      }

      /* Channel name in sidebar - keep first metadata row (channel name) */
      #secondary yt-lockup-view-model .yt-content-metadata-view-model__metadata-row:first-child {
        display: block !important;
        font-size: 12px !important;
        color: var(--yt-spec-text-secondary) !important;
        margin: 0 !important;
        padding: 0 !important;
      }

      #secondary yt-lockup-view-model .yt-content-metadata-view-model__metadata-row:first-child span {
        font-size: 12px !important;
        color: var(--yt-spec-text-secondary) !important;
      }

      /* Hide other metadata in sidebar (views, time, badges) */
      #secondary yt-lockup-view-model .yt-content-metadata-view-model__metadata-row:not(:first-child) {
        display: none !important;
      }

      /* Hide menu button in sidebar until hover */
      #secondary yt-lockup-view-model .yt-lockup-metadata-view-model__menu-button {
        opacity: 0.3 !important;
        transition: opacity 0.2s !important;
      }

      #secondary yt-lockup-view-model:hover .yt-lockup-metadata-view-model__menu-button {
        opacity: 1 !important;
      }

      /* Remove Shorts from sidebar */
      #secondary yt-lockup-view-model:has(ytm-shorts-lockup-view-model),
      #secondary yt-lockup-view-model:has(ytm-shorts-lockup-view-model-v2),
      #secondary ytd-reel-item-renderer {
        display: none !important;
      }
    `;

    // Inject CSS
    const style = document.createElement('style');
    style.textContent = css;
    document.head.appendChild(style);

    // SUPER AGGRESSIVE: Remove Shorts and thumbnail containers with JavaScript
    const nukeUnwantedContent = () => {
      // Remove Shorts shelves
      document.querySelectorAll('ytd-rich-shelf-renderer, ytd-reel-shelf-renderer').forEach(el => {
        el.remove();
      });

      // Remove ONLY items that contain Shorts (not all videos)
      document.querySelectorAll('ytd-rich-item-renderer').forEach(item => {
        // Check if this item contains a Shorts lockup model
        if (item.querySelector('ytm-shorts-lockup-view-model, ytm-shorts-lockup-view-model-v2')) {
          item.remove();
        }
      });

      // Remove thumbnails from REGULAR videos (not the entire video item)
      document.querySelectorAll('ytd-rich-item-renderer:not(:has(ytm-shorts-lockup-view-model)) ytd-rich-grid-media').forEach(el => {
        el.remove();
      });

      // Also hide any thumbnail elements that remain in regular videos
      const selectors = [
        'ytd-rich-item-renderer:not(:has(ytm-shorts-lockup-view-model)) ytd-thumbnail',
        'ytd-rich-item-renderer:not(:has(ytm-shorts-lockup-view-model)) #thumbnail',
        'ytd-rich-item-renderer:not(:has(ytm-shorts-lockup-view-model)) a#thumbnail'
      ];

      selectors.forEach(selector => {
        document.querySelectorAll(selector).forEach(el => {
          el.style.display = 'none';
          el.style.visibility = 'hidden';
          el.style.opacity = '0';
          el.style.height = '0';
          el.style.width = '0';
        });
      });

      // Hide Shorts-specific thumbnails
      document.querySelectorAll('yt-thumbnail-view-model, .shortsLockupViewModelHost').forEach(el => {
        el.style.display = 'none';
      });

      // === SIDEBAR CLEANUP ===
      // Remove Shorts from sidebar (new yt-lockup-view-model structure)
      document.querySelectorAll('#secondary yt-lockup-view-model, #secondary ytd-reel-item-renderer').forEach(item => {
        if (item.querySelector('ytm-shorts-lockup-view-model, ytm-shorts-lockup-view-model-v2') ||
            item.matches('ytd-reel-item-renderer')) {
          item.remove();
        }
      });

      // Hide thumbnails in sidebar videos (new structure)
      const sidebarSelectors = [
        '#secondary yt-lockup-view-model .yt-lockup-view-model__content-image',
        '#secondary yt-lockup-view-model yt-thumbnail-view-model'
      ];

      sidebarSelectors.forEach(selector => {
        document.querySelectorAll(selector).forEach(el => {
          el.style.display = 'none';
          el.style.visibility = 'hidden';
          el.style.opacity = '0';
          el.style.height = '0';
          el.style.width = '0';
        });
      });
    };

    // MutationObserver to handle dynamically loaded content
    const observer = new MutationObserver((mutations) => {
      for (const m of mutations) {
        for (const node of m.addedNodes) {
          if (node.nodeType === 1 && node.matches) {
            // Remove Shorts shelves immediately
            if (node.matches('ytd-rich-shelf-renderer, ytd-reel-shelf-renderer')) {
              node.remove();
              continue;
            }

            // Check if this is a Shorts item by looking for the lockup model inside
            if (node.matches('ytd-rich-item-renderer')) {
              if (node.querySelector('ytm-shorts-lockup-view-model, ytm-shorts-lockup-view-model-v2')) {
                node.remove();
                continue;
              }
            }

            // Remove Shorts lockup models if they appear
            if (node.matches('ytm-shorts-lockup-view-model, ytm-shorts-lockup-view-model-v2')) {
              node.closest('ytd-rich-item-renderer')?.remove();
              continue;
            }

            // For regular videos, only remove thumbnails
            if (node.matches('ytd-rich-item-renderer') && !node.querySelector('ytm-shorts-lockup-view-model, ytm-shorts-lockup-view-model-v2')) {
              setTimeout(nukeUnwantedContent, 50);
            }

            // Directly remove rich-grid-media elements from non-Shorts videos
            if (node.matches('ytd-rich-grid-media') && !node.closest('ytd-rich-item-renderer')?.querySelector('ytm-shorts-lockup-view-model, ytm-shorts-lockup-view-model-v2')) {
              node.remove();
            }

            // === SIDEBAR HANDLING ===
            // Remove Shorts from sidebar (new yt-lockup-view-model structure)
            if (node.matches('yt-lockup-view-model, ytd-reel-item-renderer')) {
              if (node.querySelector('ytm-shorts-lockup-view-model, ytm-shorts-lockup-view-model-v2') ||
                  node.matches('ytd-reel-item-renderer')) {
                node.remove();
                continue;
              }
              // For regular sidebar videos, remove thumbnails
              setTimeout(nukeUnwantedContent, 50);
            }
          }
        }
      }
    });

    // Start observing once the page loads
    const startObserver = () => {
      // Observe home page content
      const contents = document.querySelector('#contents, #primary #contents, ytd-rich-grid-renderer');
      if (contents) {
        observer.observe(contents, { childList: true, subtree: true });
      }

      // Observe watch page sidebar
      const sidebar = document.querySelector('#secondary, #related');
      if (sidebar) {
        observer.observe(sidebar, { childList: true, subtree: true });
      }

      // Run cleanup immediately
      nukeUnwantedContent();
    };

    // Initialize
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', startObserver);
    } else {
      startObserver();
    }

    // Run periodically to catch anything that slips through
    setInterval(nukeUnwantedContent, 500);

    // Also run on navigation (YouTube is a SPA)
    let lastUrl = location.href;
    new MutationObserver(() => {
      const url = location.href;
      if (url !== lastUrl) {
        lastUrl = url;
        setTimeout(nukeUnwantedContent, 500);
      }
    }).observe(document, { subtree: true, childList: true });
})();
