/**
 * Valence Official Master Avatar - Final Release
 * Concept 3 (Code & Structure) with bottom text: "WEB STUDIO"
 */

import sharp from 'sharp';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const SIZE = 1024;

const svgFinal = /* xml */`
<svg xmlns="http://www.w3.org/2000/svg" width="${SIZE}" height="${SIZE}" viewBox="0 0 ${SIZE} ${SIZE}">
  <defs>
    <radialGradient id="c3Bg" cx="50%" cy="50%" r="68%">
      <stop offset="0%" stop-color="#121217"/>
      <stop offset="50%" stop-color="#08080a"/>
      <stop offset="100%" stop-color="#020203"/>
    </radialGradient>

    <!-- White Laser Gradient -->
    <linearGradient id="c3LaserWhite" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#ffffff"/>
      <stop offset="60%" stop-color="#e6e6ee"/>
      <stop offset="100%" stop-color="#9696a6"/>
    </linearGradient>

    <!-- Orange Laser Gradient -->
    <linearGradient id="c3LaserOrange" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#ffffff"/>
      <stop offset="25%" stop-color="#ff9944"/>
      <stop offset="70%" stop-color="#ff4d00"/>
      <stop offset="100%" stop-color="#cc2a00"/>
    </linearGradient>

    <!-- Glowing Orange Diode -->
    <radialGradient id="c3DiodeGlow" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="#ff4d00" stop-opacity="0.8"/>
      <stop offset="45%" stop-color="#ff4d00" stop-opacity="0.25"/>
      <stop offset="100%" stop-color="#ff4d00" stop-opacity="0"/>
    </radialGradient>
  </defs>

  <rect width="${SIZE}" height="${SIZE}" fill="url(#c3Bg)"/>

  <!-- Matrix Micro-Grid Background (Developer System Aesthetics) -->
  <g opacity="0.04" stroke="#ffffff" stroke-width="1">
    <line x1="256" y1="0" x2="256" y2="1024"/>
    <line x1="512" y1="0" x2="512" y2="1024"/>
    <line x1="768" y1="0" x2="768" y2="1024"/>
    <line x1="0" y1="256" x2="1024" y2="256"/>
    <line x1="0" y1="512" x2="1024" y2="512"/>
    <line x1="0" y1="768" x2="1024" y2="768"/>
  </g>

  <!-- WhatsApp Circular Framing Ring -->
  <circle cx="512" cy="512" r="468" fill="none" stroke="rgba(255,255,255,0.06)" stroke-width="1.5" stroke-dasharray="4 8"/>

  <!-- ================= THE ARCHITECTURAL CODE-GLYPH =================
       Synthesizes:
       1. Code Bracket "< / >"
       2. Monolithic Letter "V"
       3. Orange Laser Terminal Diode
  ====================================================================== -->
  <g transform="translate(0, -10)">
    <!-- Ambient Shadow -->
    <path d="M 240,260 L 512,740 L 784,260" fill="none" stroke="#000" stroke-width="80" opacity="0.8" filter="blur(30px)"/>

    <!-- Left Code Vector (Chevron Bracket < into V) -->
    <path d="M 240,260 L 360,260 L 512,680 L 436,680 Z" fill="url(#c3LaserWhite)"/>
    <!-- Left Inset Highlight -->
    <line x1="240" y1="260" x2="436" y2="680" stroke="#ffffff" stroke-width="2.5"/>

    <!-- Right Code Vector (Closing Chevron > into V) -->
    <path d="M 784,260 L 664,260 L 512,680 L 588,680 Z" fill="url(#c3LaserWhite)"/>
    <line x1="784" y1="260" x2="588" y2="680" stroke="#ffffff" stroke-width="2.5"/>

    <!-- Central Interactive Slash Line (The Code Slash "/" in the V) -->
    <line x1="570" y1="300" x2="454" y2="620" stroke="rgba(255,255,255,0.15)" stroke-width="3" stroke-dasharray="8 8"/>

    <!-- ================= THE ORANGE TERMINAL DIODE & CURSOR ================= -->
    <!-- Ambient Diode Bloom -->
    <circle cx="512" cy="748" r="120" fill="url(#c3DiodeGlow)"/>
    <circle cx="512" cy="748" r="40" fill="#ff4d00" opacity="0.4" filter="blur(14px)"/>

    <!-- The Diode Keystone Core (Hexagonal Micro-Chip) -->
    <polygon points="512,714 544,732 544,764 512,782 480,764 480,732" fill="url(#c3LaserOrange)"/>
    <!-- White Specular Core Inside Diode -->
    <circle cx="512" cy="748" r="8" fill="#ffffff"/>

    <!-- Precision Terminal Bracket Accents -->
    <path d="M 450,730 L 430,748 L 450,766" fill="none" stroke="#ff4d00" stroke-width="2.5" stroke-linecap="round"/>
    <path d="M 574,730 L 594,748 L 574,766" fill="none" stroke="#ff4d00" stroke-width="2.5" stroke-linecap="round"/>
  </g>

  <!-- Technical Branding Header / Footer (WEB STUDIO) -->
  <g font-family="'JetBrains Mono', monospace" font-size="14" font-weight="600" letter-spacing="0.4em">
    <text x="512" y="98" text-anchor="middle" fill="rgba(255,255,255,0.4)">&lt;VALENCE /&gt;</text>
    <text x="512" y="934" text-anchor="middle" fill="#8b8b93">WEB STUDIO</text>
  </g>
</svg>
`.trim();

async function run() {
  console.log('Rendering Final Official Master (1024x1024 Master PNG)...');

  await sharp(Buffer.from(svgFinal))
    .png({ compressionLevel: 9 })
    .toFile(path.join(__dirname, '../public/valence-avatar.png'));

  await sharp(Buffer.from(svgFinal))
    .png({ compressionLevel: 9 })
    .toFile(path.join(__dirname, '../public/valence-avatar-web-studio.png'));

  console.log('✓ Final valence-avatar.png saved with "WEB STUDIO"!');
}

run();
