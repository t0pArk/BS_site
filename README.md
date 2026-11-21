# Boulangerie Solignac — website

Static, dependency-free rebuild of [boulangeriesolignac.com](https://www.boulangeriesolignac.com) (originally built on Squarespace 7.1 / Fluid Engine).

Layout, spacing, type scale, colors and breakpoints are reproduced 1:1 from the live site's computed styles:

- **Grid** — Squarespace's Fluid Engine grid, re-implemented in plain CSS: 24 columns ≥ 768px, 8 columns below, same row heights (`container width × 0.0215`), gutters (4vw / 6vw) and 11px gaps. Each block carries its original desktop and mobile grid positions as CSS variables (`--ad` / `--am`).
- **Type** — Young Serif (headings) + Bitter (body) with the exact Squarespace fluid size formulas.
- **Colors** — white `#fff`, black `#000`, lavender `rgb(224,225,235)`, accent blue `rgb(26,87,166)`.
- **Sections** — padding in `vmax`, min-heights in `vh`, matching the original.

## Structure

```
index.html            Home
contact.html          Contact
assets/css/site.css   All styles
assets/js/site.js     Mobile menu, accordion, click-to-play Instagram reel
scripts/localize-images.sh   Optional: pull images off the Squarespace CDN
```

## Images

Images are still served from the Squarespace CDN (same files and responsive `srcset` sizes as the live site). Before cancelling the Squarespace plan, run:

```sh
./scripts/localize-images.sh
```

This downloads them into `assets/img/` and rewrites the HTML to use the local copies. The "Retail Locations" button also still links to the PDF on the live site. Add the PDF to the repo and update the link in `index.html`.

## Run locally

```sh
python3 -m http.server 8000   # then open http://localhost:8000
```

## Deploy

Works as-is on GitHub Pages (Settings → Pages → Deploy from branch → `main` / root), Netlify, Vercel, etc.
