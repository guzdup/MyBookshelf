# MyBookshelf — Project Guide & Architecture

## Overview
**MyBookshelf** is a realistic, interactive digital bookcase prototype built in React and rendered within an iOS device frame. It visualizes books with physically accurate millimeter dimensions (height, thickness, width based on page count), lifelike 3D spine lighting, wood grain shelf themes, and a cinematic 3D book-opening transition into an e-reader view.

---

## Tech Stack & Runtime Model
- **Core Technologies**: React 18 (development build via unpkg CDN), ReactDOM 18, Babel Standalone (in-browser JSX transpilation), HTML5, CSS-in-JS (inline styles).
- **Typography**: Google Fonts (*Spectral*, *EB Garamond*), system font (*SF Pro* / Apple System).
- **Architecture Style**: Zero-build / standalone static files. No npm/Vite/Webpack compilation step needed.
- **Script Loading**: Scripts are evaluated sequentially in [myBookshelf.html](file:///Users/guz/Desktop/MyBookshelf/myBookshelf.html) via CDN Babel scripts; components and globals are registered to `window`.

---

## Project Structure & File Map

```
MyBookshelf/
├── myBookshelf.html    # Main entry point & device scaling container (402x874)
├── data.js             # Library catalogue with physical millimeter dimensions & excerpts
├── ios-frame.jsx       # iOS 26 Liquid Glass device frame, status bar, and bezel
├── tweaks-panel.jsx    # Interactive parameter adjustment panel (useTweaks, controls)
├── spine.jsx           # Book visual components: SpineFace, CoverArt, ShelfSpine, Book3D
├── shelf.jsx           # Bookcase geometry: Bookshelf, MB_Shelf, wood themes, grain, stacks
├── discover.jsx        # Discover tab: genre rows, demo covers, and "Add book" CTA
├── reader.jsx          # 3D take-off-shelf transition & ReadingView component
├── app.jsx             # Root App component, navigation tabs, header, and tweaks config
├── screenshots/        # UI captures and animation sequence probes
├── uploads/            # Reference sketches and UI mockups
└── scraps/             # Design scratch files and napkin sketches
```

---

## Component Details & Responsibilities

### 1. [myBookshelf.html](file:///Users/guz/Desktop/MyBookshelf/myBookshelf.html)
- Loads React 18, ReactDOM 18, and `@babel/standalone` from unpkg CDN.
- Loads script dependencies in strict order (`data.js` → `ios-frame.jsx` → `tweaks-panel.jsx` → `spine.jsx` → `shelf.jsx` → `discover.jsx` → `reader.jsx` → `app.jsx`).
- Calculates dynamic scale factor to fit the 402×874 device frame within the viewport.

### 2. [data.js](file:///Users/guz/Desktop/MyBookshelf/data.js)
- Stores curated library books categorized into shelves (`window.MB_SHELVES`, `window.MB_BOOKS`).
- Calculates realistic spine thickness (`thickMM`) dynamically from `pages` count and binding (`hard` vs paperback).
- Standard scale constant: `window.MB_PXMM = 0.72`.

### 3. [spine.jsx](file:///Users/guz/Desktop/MyBookshelf/spine.jsx)
- **`SpineFace`**: Realistic spine typography, spine bands (hubs), head cap, vertical gradients, and sheen.
- **`CoverArt`**: Front cover artwork (supports `'feature'` circular crest style and standard typeset style).
- **`ShelfSpine`**: Interactive spine standing on the shelf with subtle randomized lean angles and hover animations.
- **`Book3D`**: 6-sided 3D CSS cube box (`preserve-3d`) with textured page edges, cream endpapers, and hinged opening cover.

### 4. [shelf.jsx](file:///Users/guz/Desktop/MyBookshelf/shelf.jsx)
- **`Bookshelf` & `MB_Shelf`**: Bookcase structure including frame edge, side panels, top cap, base, and shelf boards.
- **`MB_THEMES`**: Material color schemes (`warmWhite`, `oak`, `walnut`).
- **`MB_grain`**: Procedural wood grain overlay gradient generator.
- **`MB_Stack`**: Decorative horizontal book stacks to fill empty shelf space.

### 5. [reader.jsx](file:///Users/guz/Desktop/MyBookshelf/reader.jsx)
- **`Reader`**: Orchestrates 4-phase cinematic book pull-out animation:
  1. `rise`: Lift spine from its exact shelf bounding box.
  2. `face`: Rotate to face the user and scale up.
  3. `open`: Swing front cover open to show the reading page.
  4. `read`: Smoothly crossfade into the readable text interface.
- **`ReadingView`**: Typography-focused reader view with reading progress bar, chapter headings, and controls.

### 6. [discover.jsx](file:///Users/guz/Desktop/MyBookshelf/discover.jsx)
- **`Discover`**: Horizontal genre carousels (Horror, Drama, Romance, Mystery, Science Fiction).
- **`MB_AddButton`**: Floating action button to add new books.

### 7. [tweaks-panel.jsx](file:///Users/guz/Desktop/MyBookshelf/tweaks-panel.jsx) & [app.jsx](file:///Users/guz/Desktop/MyBookshelf/app.jsx)
- **`App`**: Tab management (`'shelf'`, `'discover'`, `'profile'`), selected book state, and bounding box origin tracking.
- **`TweaksPanel`**: Live configuration controls for bookcase material, wood grain intensity, spine label density, and animation speed multiplier.

---

## Development & Execution

### Running Locally
Because Babel Standalone fetches `.jsx` files using `XMLHttpRequest` / `fetch`, the project must be served over HTTP (not directly via `file://`).

Start a local static server:
```bash
# Option 1: Python 3
python3 -m http.server 8000

# Option 2: Node npx serve
npx serve .
```

Open in browser:
```
http://localhost:8000/myBookshelf.html
```

---

## Coding Conventions & Key Patterns

1. **No Bundler / Global Exports**:
   - Do not use `import` / `export` statements in `.jsx` files.
   - Attach shared components and utilities to `window` using `Object.assign(window, { ... })`.
2. **Physical Dimensional Honesty**:
   - Maintain physical millimeter values (`heightMM`, `thickMM`, `widthMM`) when adding books to `data.js`.
   - Scale with `MB_SCALE` or `window.MB_PXMM` to preserve realistic relative proportions.
3. **CSS-in-JS & Visual Realism**:
   - Use multi-stop linear and radial gradients to simulate 3D curvatures, bevels, cast shadows, and paper sheens.
   - Use `transformStyle: 'preserve-3d'` and `perspective` for 3D spatial transformations.
4. **Tweaks State Preservation**:
   - Keep `TWEAK_DEFAULTS` wrapped in `/*EDITMODE-BEGIN*/.../*EDITMODE-END*/` comments to remain compatible with the prototype tweaks editor.
