# 🚫 News Feed Eradicator

A browser extension that deletes your Facebook news feed and replaces it with an inspiring quote.  
Stay focused, reclaim your time, and make your social experience positive! ✨

[![Chrome Web Store](https://img.shields.io/chrome-web-store/v/fjcldmjmjhkklehbacihaiopjklihlgg.svg?label=Chrome%20Web%20Store)](https://chrome.google.com/webstore/detail/news-feed-eradicator-for/fjcldmjmjhkklehbacihaiopjklihlgg?hl=en)
[![Firefox Add-on](https://img.shields.io/amo/v/news-feed-eradicator.svg?label=Firefox%20Add-on)](https://addons.mozilla.org/en-US/firefox/addon/news-feed-eradicator/)

![Screenshot](assets/screenshot.jpg)

---

## 🚀 Quick Start

1. **Clone the repo:**
   ```sh
   git clone https://github.com/YOUR_USERNAME/news-feed-eradicator-next.git
   cd news-feed-eradicator-next
   ```

2. **Install dependencies:**
   ```sh
   npm install
   ```

3. **Build the extension:**
   ```sh
   npm run build
   ```

4. **Load the extension in your browser:**
   - **Chrome:** Go to `chrome://extensions`, enable Developer Mode, click "Load unpacked", and select the `build/` folder.
   - **Firefox:** Go to `about:debugging#/runtime/this-firefox`, click "Load Temporary Add-on", and select `build/manifest.json`.

---

## 🛠️ Available Scripts

- `npm run build` – Build the extension for production
- `npm run dev` – Build and watch for changes (development)
- `npm run format` – Format code with Prettier
- `npm run check` – Type-check with TypeScript
- `npm run copy-assets` – Copy static assets to build directory
- `npm run clean` – Remove build artifacts and dependencies
- `npm run package` – Create a zip of the build for distribution
- `npm run package-source` – Create a source zip for the Firefox Add-on store

---

## 🧑‍💻 Development

- **Edit code in `src/`** – TypeScript, modular components, and Redux-style state management.
- **Assets in `assets/` and `src/icons/`** – Images, icons, and screenshots.
- **All build output goes to `build/`** – This is what you load as an unpacked extension.

---

## 📝 Contributing

Contributions are welcome!  
Please open issues, submit pull requests, or suggest features.  
See [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines (coming soon).

---

## 📦 Distribution

- **Production build:**  
  Run `npm run build` then `npm run package`.  
  The distributable zip will be in the `dist/` folder.

- **Source package for Firefox:**  
  Run `npm run package-source`.

---

## 🧩 Browser Support

- Chrome
- Firefox
- (Edge and others may work, but are not officially supported yet)

---

## 🛡️ Prerequisites

- [Node.js](https://nodejs.org/) (v16+ recommended)
- [npm](https://www.npmjs.com/) (comes with Node.js)

---

## ❤️ Credits

Originally created by [Jordan West](https://github.com/jordwest).  
Maintained and modernized by [Erick Shaffer](https://github.com/eshaffer321).

---

## 📄 License

MIT

---

*Happy focusing! 🚀*
