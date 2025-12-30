# YouTube Simplifier Script

A TamperMonkey script to create a cleaner, less distracting YouTube experience.

## 🎯 What It Does

**YouTubeCleanListView.js** transforms YouTube's home page into a minimal, focused experience:

### Features
- ✅ **List View Layout** - Converts grid to single-column vertical list
- ✅ **No Thumbnails** - Hides all video thumbnail images
- ✅ **No Shorts** - Completely removes YouTube Shorts (shelves and individual items)
- ✅ **Minimal Info** - Shows only:
  - Creator profile photo
  - Creator name
  - Video title
- ✅ **Hides Clutter** - Removes view counts, upload times, badges, and other metadata

### Result
A clean, distraction-free YouTube home page that shows only what matters: who made the video and what it's about.

```
[Avatar] Creator Name
         Video Title
─────────────────────
[Avatar] Creator Name
         Video Title
─────────────────────
```

## 📥 Installation

1. Install [TamperMonkey](https://www.tampermonkey.net/) browser extension
2. Open TamperMonkey Dashboard (click icon → Dashboard)
3. Click the "+" icon to create a new script
4. Copy and paste the entire contents of `YouTubeCleanListView.js`
5. Save (Ctrl+S / Cmd+S)
6. Go to YouTube and refresh (Ctrl+Shift+R / Cmd+Shift+R for hard refresh)

## 🔧 How It Works

The script uses a combination of:
- **CSS** for instant hiding of unwanted elements
- **JavaScript** for removing dynamically loaded content
- **MutationObserver** to handle YouTube's infinite scroll

This ensures everything stays hidden even as you scroll and new videos load.

## 💡 Tips

- **First load:** The page may take a moment to fully clean up on first load
- **Performance:** Script runs every 500ms to catch new content, but is lightweight
- **Dark mode:** Automatically adjusts separators for dark mode
- **Compatibility:** Works on all YouTube pages (filters are mainly visible on home page)

## 🐛 Troubleshooting

**Script not working?**
1. Open TamperMonkey icon - you should see "YouTube Clean List View (1)" indicating it's active
2. Check the version number (should be 2.3.0 or higher)
3. Hard refresh YouTube: Ctrl+Shift+R (Windows) or Cmd+Shift+R (Mac)

**Thumbnails still showing?**
1. Open browser console (F12 → Console tab)
2. Run: `Array.from(document.querySelectorAll('style')).find(s => s.textContent.includes('ytd-rich-item-renderer'))?.textContent.includes('NUCLEAR OPTION')`
3. Should return `true` - if not, the script isn't loading properly

**Shorts still appearing?**
1. Make sure you're on version 2.3.0 or higher
2. Shorts are removed as they load, wait a moment after scrolling
3. Try disabling other YouTube extensions that might conflict

**Videos disappearing completely?**
1. This was a bug in version 2.2.0
2. Update to version 2.3.0 which only removes Shorts, not all videos
3. Hard refresh after updating

## 🔄 Updates

### Version 2.3.0 (Current)
- Fixed bug where ALL videos were being removed
- Now correctly only removes Shorts while keeping regular videos
- Improved targeting to distinguish between Shorts and regular videos

### Version 2.2.0
- Added aggressive Shorts removal (shelves and individual items)
- Improved thumbnail hiding with NUCLEAR OPTION approach
- Bug: Removed all videos (fixed in 2.3.0)

### Version 2.0.0
- Combined all features into single script
- Added list view layout
- Hide thumbnails and metadata

## 📝 Customization

You can customize the script by editing the CSS section:

**Change avatar size:**
```css
ytd-rich-item-renderer #avatar img {
  width: 48px !important;  /* Default: 36px */
  height: 48px !important;
}
```

**Change spacing between videos:**
```css
ytd-rich-item-renderer {
  padding: 16px 0;  /* Default: 12px 0 */
}
```

**Change font sizes:**
```css
/* Video title */
ytd-rich-item-renderer #video-title-link {
  font-size: 16px !important;  /* Default: 14px */
}

/* Creator name */
ytd-rich-item-renderer ytd-channel-name {
  font-size: 14px !important;  /* Default: 12px */
}
```

## 📄 File Structure

```
Youtube Simplifier/
├── YouTubeCleanListView.js  # Main script (v2.3.0)
└── README.md                # This file
```

## 🤝 Contributing

Found a bug or want to suggest an improvement? Feel free to update the script!

## 📄 License

This script is provided as-is for personal use. Feel free to modify and share!

---

*Made to help you focus on content, not distractions* 🎯

**Current Version:** 2.3.0
