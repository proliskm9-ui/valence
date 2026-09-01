/**
 * Valence· Avatar Generator
 * Renders a clean SVG lettermark and exports it as 512×512 PNG via sharp.
 * Run: node scripts/generate-avatar.mjs
 */

import sharp from 'sharp';
import { writeFileSync } from 'fs';
import { fileURLToPath } from 'url';
import path from 'path';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OUT = path.join(__dirname, '../public/valence-avatar.png');

const SIZE = 512;

// ── SVG source ────────────────────────────────────────────────────────────────
//
// V geometry (Unbounded ExtraBold proportions):
//   - Canvas: 512 × 512
//   - V occupies ~72% width, centered
//   - Top y: 96   Bottom y: 396
//   - Left outer x:  104    Left inner x:  166
//   - Right inner x: 346    Right outer x: 408
//   - Tip (bottom):  CX-16 … CX+16
//
// Path: single polygon for each arm, then a connecting bottom triangle.
// Using "evenodd" fill so the two arms join cleanly.

const svg = /* xml */`
<svg xmlns="http://www.w3.org/2000/svg" width="${SIZE}" height="${SIZE}" viewBox="0 0 ${SIZE} ${SIZE}">
  <defs>
    <!-- Film grain noise -->
    <filter id="grain" x="0%" y="0%" width="100%" height="100%" color-interpolation-filters="linearRGB">
      <feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves="2" stitchTiles="stitch" result="noise"/>
      <feColorMatrix type="saturate" values="0" in="noise" result="gray"/>
      <feBlend in="SourceGraphic" in2="gray" mode="overlay" result="blended"/>
      <feComposite in="blended" in2="SourceGraphic" operator="in"/>
    </filter>

    <!-- Vignette radial gradient -->
    <radialGradient id="vignette" cx="50%" cy="50%" r="72%" fx="50%" fy="50%">
      <stop offset="30%" stop-color="rgba(0,0,0,0)"/>
      <stop offset="100%" stop-color="rgba(0,0,0,0.65)"/>
    </radialGradient>

    <!-- Accent glow under dot -->
    <radialGradient id="dot-glow" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="#ff4d00" stop-opacity="0.55"/>
      <stop offset="55%" stop-color="#ff4d00" stop-opacity="0.14"/>
      <stop offset="100%" stop-color="#ff4d00" stop-opacity="0"/>
    </radialGradient>

    <!-- Warm orange blush at bottom — like the site's glow -->
    <radialGradient id="blush" cx="50%" cy="88%" r="45%" fx="50%" fy="88%">
      <stop offset="0%" stop-color="#ff4d00" stop-opacity="0.065"/>
      <stop offset="100%" stop-color="#ff4d00" stop-opacity="0"/>
    </radialGradient>
  </defs>

  <!-- ── Background ── -->
  <rect width="${SIZE}" height="${SIZE}" fill="#0a0a0b"/>

  <!-- ── Warm blush glow ── -->
  <rect width="${SIZE}" height="${SIZE}" fill="url(#blush)"/>

  <!-- ── Letter V — drawn as a single polygon path ─────────────────────────
       Coordinates (px):
         Top-left outer  (104, 96)
         Top-left inner  (166, 96)
         Bottom center R (274, 396)
         Bottom center L (238, 396)

         Top-right inner (346, 96)
         Top-right outer (408, 96)
         Bottom center R (274, 396)
         Bottom center L (238, 396)

       Combined as one shape (two trapezoids sharing the bottom):
  ── -->
  <polygon
    points="
      104,96
      166,96
      274,396
      238,396
    "
    fill="#f4f4f2"
  />
  <polygon
    points="
      408,96
      346,96
      238,396
      274,396
    "
    fill="#f4f4f2"
  />

  <!-- ── Vignette overlay ── -->
  <rect width="${SIZE}" height="${SIZE}" fill="url(#vignette)"/>

  <!-- ── Noise grain overlay ── -->
  <rect width="${SIZE}" height="${SIZE}" fill="#888" filter="url(#grain)" opacity="0.048"/>

  <!-- ── Accent dot — sits at baseline, right of the V tip ── -->
  <!-- Glow halo -->
  <ellipse cx="328" cy="390" rx="36" ry="36" fill="url(#dot-glow)"/>
  <!-- Solid dot -->
  <circle cx="328" cy="390" r="14" fill="#ff4d00"/>
</svg>
`.trim();

// ── Export via sharp ──────────────────────────────────────────────────────────
await sharp(Buffer.from(svg))
  .png({ quality: 100 })
  .toFile(OUT);

console.log(`✓  Valence· avatar saved → ${OUT}`);
