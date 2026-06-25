# WhatsApp Chat Converter
A modern browser extension (Manifest V3) designed for WhatsApp Web. It allows users to interactively inspect and convert any chat bubble between an **Incoming** (received) message style and an **Outgoing** (sent) message style.
Perfect for developers testing UI layouts, creating custom mockups, or correcting message styles locally for presentation purposes.
---
## Features
- **Interactive Inspector Mode**: Click-to-activate inspector that highlights chat bubbles when hovered.
- **Convert to Incoming**: Real-time conversion of any message to the incoming style (left-aligned, dark-grey background, left-side tail shape, hides outgoing ticks).
- **Convert to Outgoing**: Real-time conversion of any message to the outgoing style (right-aligned, green background, right-side tail shape, hides sender name & avatar container).
- **Quoted Messages Support**: Smartly preserves the author and format of quoted/replied messages inside the bubbles while converting.
- **Glassmorphism Popup UI**: A sleek, dark-themed control panel with smooth micro-animations.
- **Keyboard Shortcut**: Press `ESC` at any time to quickly cancel the inspector mode.
---
## Installation (Developer Mode)
Since this is a custom extension, you can load it directly into any Chromium-based browser (Google Chrome, Microsoft Edge, Brave, Opera, etc.) using these steps:
1. **Download / Clone** this repository to your local machine.
2. Open your browser and navigate to **`chrome://extensions/`**.
3. Enable **Developer mode** (toggle switch in the top-right corner).
4. Click on **Load unpacked** (button in the top-left corner).
5. Select the project folder (the folder containing `manifest.json`).
6. The **WhatsApp Chat Converter** extension is now installed and active!
---
## How to Use
1. Open **[WhatsApp Web](https://web.whatsapp.com)** in your browser.
2. Click the Extension icon in the toolbar and open **WhatsApp Chat Converter**.
3. Toggle the **"Enable Inspector"** switch.
4. Hover over any chat bubble to see the green dashed border highlight.
5. **Click** on the chat bubble you wish to modify.
6. Select one of the options in the floating menu:
   - `➡️ Convert to Incoming`
   - `⬅️ Convert to Outgoing`
   - `🔄 Reset` (restores original style)
   - `Cancel`
7. Press `ESC` on your keyboard to turn off selection mode when done.
---
## Technologies Used
- **HTML5** & **Vanilla CSS3** (Utilizing WhatsApp's native CSS variables and modern `:has()` selector).
- **JavaScript** (Chrome Extension Manifest V3 APIs).
---
## License
This project is licensed under the MIT License - feel free to use and customize it!