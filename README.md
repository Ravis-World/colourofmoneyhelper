# 💰 The Colour of Money - Game Show Host Board

A cross-platform web and desktop host board application built for hosting your own custom version of *The Colour of Money* game show. 

This app generates 20 unique colour tiles pulled directly from colornames.org's data file, assigns a randomised monetary value from 1,000 to 20,000 of your chosen currency, and provides a live host dashboard to track banked totals and remaining tiles.

---

## 🚀 Features

* **Colour selection:** Selects 20 unique colours from a pool of 1,000 popular colour names and their hex codes.
* **Randomised Game Board:** Shuffles and selects 20 unique colours every new game round, hiding cash values ranging from 1,000 to 20,000 behind each tile.
* **Multi-Currency Support:** Instantly adjust your currency symbol (`$`, `£`, `€`, `¥`, `₹`) and multipliers on the fly.
* **Auto Contrast Calculation:** Dynamically computes YIQ contrast for text colour on each tile so colour names are always legible against their background.
* **Web version:** Build the static web app with `npm run build:web`; deploy the contents of `dist`.
* **Portable Windows app:** Run `npm run electron:build` to create a single x64 executable in `release`. It is a self-extracting portable app, not an installer. Fast, uncompressed packaging is used to reduce build time; the executable is larger as a result.

---

## 🛠️ Getting Started & Installation

### Prerequisites

Make sure you have [Node.js](https://nodejs.org/) installed on your computer.

### 1. Install Dependencies

Open your terminal inside the project root folder and run:

```bash
npm install
```

### 2. Run in Web Browser (Development Mode)

To launch the local Vite development server with hot-reloading:

```bash
npm run dev
```

Open your browser and navigate to http://localhost:5173.

### 3. Run as Desktop App (Electron)

To run the app concurrently inside a desktop window:

```bash
npm run electron:dev
```

### 4. Build Production Packages

To build the web app and package a portable Windows desktop executable:

```bash
npm run electron:build
```

The portable Windows executable will be created in the `release` directory. To build only the web app, run `npm run build:web`; the output will be in `dist`.
