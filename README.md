# MECH Toolkit

Interactive reference sheets & live calculators for mechanical / HVAC engineering.
Pure static HTML/CSS/JS — no build step, no backend.

**Live site:** _(add your GitHub Pages / Netlify URL here)_

## Structure
- `index.html` — landing page (Mechanical / HVAC)
- `mechanical.html`, `hvac.html` — discipline sub-indexes
- one HTML file per tool (pressure vessel, pump head, chiller selection, water tank, etc.)
- `privacy.html` — privacy policy
- `site-addons.js` — shared cookie-consent banner, support footer & AdSense ad slots
  (edit the CONFIG block at the top to set your AdSense ID, Buy-Me-a-Coffee URL and affiliate links)

## Local preview
Just open `index.html` in a browser, or serve the folder:

```bash
python3 -m http.server 8000
# then visit http://localhost:8000
```

## Notes
All calculators run entirely in the browser; no input data leaves your device.
Estimates are preliminary — always verify against detailed methods & local codes.
