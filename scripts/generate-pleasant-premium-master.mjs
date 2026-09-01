/**
 * Valence - Pleasant & Ultra-Premium Master Edition
 * 
 * Direct user feedback applied:
 * 1. REMOVED all blurry orange glow fog / muddy blooms completely.
 * 2. Razor-sharp, solid, crisp geometric elements with pure density.
 * 3. Elevated luxury materiality (velvet obsidian, cream-white, rich orange).
 * 4. Micro-precision Swiss watch / Leica lens hairline detailing.
 */

import sharp from 'sharp';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const SIZE = 1024;

// -----------------------------------------------------------------------------
// VARIANT A: "PRECISION HARDWARE" (Безупречная швейцарская точность)
// Чистая векторная геометрия V, плотный лазерный чип < ⬡ >, тончайшая линзовая разметка
// -----------------------------------------------------------------------------
const svgA = /* xml */`
<svg xmlns="http://www.w3.org/2000/svg" width="${SIZE}" height="${SIZE}" viewBox="0 0 ${SIZE} ${SIZE}">
  <defs>
    <!-- Deep Velvet Dark Canvas -->
    <radialGradient id="bgA" cx="50%" cy="50%" r="70%">
      <stop offset="0%" stop-color="#121217"/>
      <stop offset="60%" stop-color="#08080a"/>
      <stop offset="100%" stop-color="#030304"/>
    </radialGradient>

    <!-- Warm Cream-White to Cool Titanium Tone for V -->
    <linearGradient id="vToneA" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#ffffff"/>
      <stop offset="30%" stop-color="#f5f5fa"/>
      <stop offset="75%" stop-color="#d6d6e2"/>
      <stop offset="100%" stop-color="#a4a4b4"/>
    </linearGradient>

    <!-- Solid Dense Orange Diode (Rich & Pure, No Muddy Blur) -->
    <linearGradient id="diodeSolidA" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#ff6a1a"/>
      <stop offset="50%" stop-color="#ff4d00"/>
      <stop offset="100%" stop-color="#d62e00"/>
    </linearGradient>

    <!-- Film Grain Overlay -->
    <filter id="grainA">
      <feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves="3" stitchTiles="stitch"/>
      <feColorMatrix type="saturate" values="0"/>
      <feComponentTransfer><feFuncA type="linear" slope="0.032"/></feComponentTransfer>
      <feBlend mode="overlay"/>
    </filter>
  </defs>

  <!-- Background Base -->
  <rect width="${SIZE}" height="${SIZE}" fill="url(#bgA)"/>

  <!-- ================= ULTRA-FINE LEICA / SWISS LENS CALIBRATION ================= -->
  <!-- Outer WhatsApp Frame Guide (468px) -->
  <circle cx="512" cy="512" r="468" fill="none" stroke="rgba(255,255,255,0.08)" stroke-width="1.5"/>
  <circle cx="512" cy="512" r="448" fill="none" stroke="rgba(255,255,255,0.03)" stroke-width="1" stroke-dasharray="2 6"/>
  <circle cx="512" cy="512" r="400" fill="none" stroke="rgba(255,255,255,0.02)" stroke-width="1"/>

  <!-- Precise Calibrated Compass Ticks -->
  <g stroke="rgba(255,255,255,0.2)" stroke-width="1.5">
    <line x1="512" y1="48" x2="512" y2="60"/>
    <line x1="512" y1="964" x2="512" y2="976"/>
    <line x1="48" y1="512" x2="60" y2="512"/>
    <line x1="964" y1="512" x2="976" y2="512"/>
  </g>

  <!-- Matrix Micro-Grid Accents -->
  <g opacity="0.035" stroke="#ffffff" stroke-width="1">
    <line x1="256" y1="0" x2="256" y2="1024"/>
    <line x1="768" y1="0" x2="768" y2="1024"/>
    <line x1="0" y1="256" x2="1024" y2="256"/>
    <line x1="0" y1="768" x2="1024" y2="768"/>
  </g>

  <!-- ================= THE MASTER V EMBLEM ================= -->
  <g transform="translate(0, -12)">
    <!-- Crisp Spatial Shadow (Pure elevation, subtle and refined) -->
    <path d="M 240,250 L 512,730 L 784,250" fill="none" stroke="#000000" stroke-width="60" opacity="0.75" filter="blur(28px)"/>

    <!-- Left Arm -->
    <path d="M 240,250 L 360,250 L 512,670 L 436,670 Z" fill="url(#vToneA)"/>
    <!-- Left Arm Razor Highlights -->
    <line x1="240" y1="250" x2="436" y2="670" stroke="#ffffff" stroke-width="2.5"/>
    <line x1="240" y1="250" x2="360" y2="250" stroke="#ffffff" stroke-width="2"/>
    <line x1="360" y1="250" x2="512" y2="670" stroke="rgba(255,255,255,0.7)" stroke-width="1.5"/>

    <!-- Right Arm -->
    <path d="M 784,250 L 664,250 L 512,670 L 588,670 Z" fill="url(#vToneA)"/>
    <!-- Right Arm Razor Highlights -->
    <line x1="784" y1="250" x2="588" y2="670" stroke="#ffffff" stroke-width="2.5"/>
    <line x1="664" y1="250" x2="784" y2="250" stroke="#ffffff" stroke-width="2"/>
    <line x1="664" y1="250" x2="512" y2="670" stroke="rgba(255,255,255,0.7)" stroke-width="1.5"/>

    <!-- Central Dashed Code Slash "/" (Crisp 2.5px hairlines) -->
    <line x1="568" y1="284" x2="456" y2="604" stroke="rgba(255,255,255,0.22)" stroke-width="2" stroke-dasharray="6 8"/>

    <!-- Apex Horizontal Dividing Cap -->
    <line x1="436" y1="670" x2="588" y2="670" stroke="#ffffff" stroke-width="2.5"/>

    <!-- ================= THE SOLID CRISP CODE DIODE < ⬡ > (NO BLURRY FOG) ================= -->
    <!-- Recessed Precision Mounting Socket -->
    <polygon points="512,704 550,724 550,766 512,786 474,766 474,724" fill="#0d0d12" stroke="rgba(255,255,255,0.12)" stroke-width="1.5"/>

    <!-- Solid Dense Hexagonal Diode Chip -->
    <polygon points="512,714 542,730 542,760 512,776 482,760 482,730" fill="url(#diodeSolidA)"/>
    
    <!-- Micro-Glint Specular Center Diamond -->
    <polygon points="512,740 516,745 512,750 508,745" fill="#ffffff"/>

    <!-- Precision Code Bracket Chevron Wings < > (Crisp 3px Solid Orange) -->
    <g stroke="#ff4d00" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" fill="none">
      <path d="M 440,728 L 420,745 L 440,762"/>
      <path d="M 584,728 L 604,745 L 584,762"/>
    </g>
    <!-- Specular Micro-Dots on Chevron Points -->
    <circle cx="420" cy="745" r="2" fill="#ffffff"/>
    <circle cx="604" cy="745" r="2" fill="#ffffff"/>
  </g>

  <!-- Technical Branding Header / Footer -->
  <g font-family="'JetBrains Mono', monospace" font-size="14" font-weight="600" letter-spacing="0.4em">
    <text x="512" y="96" text-anchor="middle" fill="rgba(255,255,255,0.45)">&lt;VALENCE /&gt;</text>
    <text x="512" y="938" text-anchor="middle" fill="#8b8b93">WEB STUDIO</text>
  </g>

  <!-- Subtle Film Grain -->
  <rect width="${SIZE}" height="${SIZE}" fill="#fff" opacity="0.03" filter="url(#grainA)"/>
</svg>
`.trim();


// -----------------------------------------------------------------------------
// VARIANT B: "INTEGRATED KEYSTONE CORE" (Скульптурная цельность)
// Оранжевый чип-диод плотно интегрирован в саму выточку вершины V
// -----------------------------------------------------------------------------
const svgB = /* xml */`
<svg xmlns="http://www.w3.org/2000/svg" width="${SIZE}" height="${SIZE}" viewBox="0 0 ${SIZE} ${SIZE}">
  <defs>
    <radialGradient id="bgB" cx="50%" cy="50%" r="70%">
      <stop offset="0%" stop-color="#141418"/>
      <stop offset="55%" stop-color="#08080a"/>
      <stop offset="100%" stop-color="#020203"/>
    </radialGradient>

    <linearGradient id="vToneB" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#ffffff"/>
      <stop offset="35%" stop-color="#f2f2f8"/>
      <stop offset="75%" stop-color="#cecee0"/>
      <stop offset="100%" stop-color="#9292a4"/>
    </linearGradient>

    <linearGradient id="diodeSolidB" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#ff7b2b"/>
      <stop offset="50%" stop-color="#ff4d00"/>
      <stop offset="100%" stop-color="#c22500"/>
    </linearGradient>
  </defs>

  <rect width="${SIZE}" height="${SIZE}" fill="url(#bgB)"/>

  <!-- Technical Calibrated Rings -->
  <circle cx="512" cy="512" r="468" fill="none" stroke="rgba(255,255,255,0.06)" stroke-width="1.5"/>
  <circle cx="512" cy="512" r="436" fill="none" stroke="rgba(255,255,255,0.03)" stroke-width="1" stroke-dasharray="4 6"/>

  <g transform="translate(0, -10)">
    <!-- Elevation Shadow -->
    <path d="M 236,252 L 512,732 L 788,252" fill="none" stroke="#000000" stroke-width="64" opacity="0.75" filter="blur(26px)"/>

    <!-- Left Arm -->
    <path d="M 236,252 L 358,252 L 512,668 L 434,668 Z" fill="url(#vToneB)"/>
    <line x1="236" y1="252" x2="434" y2="668" stroke="#ffffff" stroke-width="2.5"/>
    <line x1="236" y1="252" x2="358" y2="252" stroke="#ffffff" stroke-width="2"/>

    <!-- Right Arm -->
    <path d="M 788,252 L 666,252 L 512,668 L 590,668 Z" fill="url(#vToneB)"/>
    <line x1="788" y1="252" x2="590" y2="668" stroke="#ffffff" stroke-width="2.5"/>
    <line x1="666" y1="252" x2="788" y2="252" stroke="#ffffff" stroke-width="2"/>

    <!-- Central Code Slash "/" -->
    <line x1="566" y1="286" x2="458" y2="602" stroke="rgba(255,255,255,0.22)" stroke-width="2" stroke-dasharray="6 8"/>

    <!-- ================= INTEGRATED SOLID DIAMOND-DIODE KEYSTONE ================= -->
    <!-- Integrated Beveled Anchor Notch -->
    <polygon points="434,668 590,668 512,764" fill="#0e0e14" stroke="rgba(255,255,255,0.18)" stroke-width="1.5"/>

    <!-- Solid Glowing Orange Diamond Core -->
    <polygon points="512,684 550,718 512,752 474,718" fill="url(#diodeSolidB)"/>
    <!-- Crisp White Specular Pin -->
    <circle cx="512" cy="718" r="4.5" fill="#ffffff"/>

    <!-- Solid Orange Code Chevrons Integrated to the Notch -->
    <g stroke="#ff4d00" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" fill="none">
      <path d="M 436,706 L 414,718 L 436,730"/>
      <path d="M 588,706 L 610,718 L 588,730"/>
    </g>
  </g>

  <!-- Typography -->
  <g font-family="'JetBrains Mono', monospace" font-size="14" font-weight="600" letter-spacing="0.4em">
    <text x="512" y="96" text-anchor="middle" fill="rgba(255,255,255,0.45)">&lt;VALENCE /&gt;</text>
    <text x="512" y="938" text-anchor="middle" fill="#8b8b93">WEB PRODUCTION</text>
  </g>
</svg>
`.trim();


// -----------------------------------------------------------------------------
// VARIANT C: "PURE MINIMAL CODE MONOMARK" (Максимальная чистота и статус)
// Ультра-лаконичная геометрия V, тонкие брекеты, логотип VALENCE· сверху
// -----------------------------------------------------------------------------
const svgC = /* xml */`
<svg xmlns="http://www.w3.org/2000/svg" width="${SIZE}" height="${SIZE}" viewBox="0 0 ${SIZE} ${SIZE}">
  <defs>
    <radialGradient id="bgC" cx="50%" cy="50%" r="70%">
      <stop offset="0%" stop-color="#111116"/>
      <stop offset="60%" stop-color="#070709"/>
      <stop offset="100%" stop-color="#020203"/>
    </radialGradient>

    <linearGradient id="vToneC" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#ffffff"/>
      <stop offset="40%" stop-color="#f4f4fa"/>
      <stop offset="80%" stop-color="#d8d8e4"/>
      <stop offset="100%" stop-color="#aaaaBC"/>
    </linearGradient>
  </defs>

  <rect width="${SIZE}" height="${SIZE}" fill="url(#bgC)"/>

  <!-- Minimal Hairline Frame -->
  <circle cx="512" cy="512" r="468" fill="none" stroke="rgba(255,255,255,0.06)" stroke-width="1.5"/>

  <g transform="translate(0, -12)">
    <!-- Soft Crisp Shadow -->
    <path d="M 240,250 L 512,730 L 784,250" fill="none" stroke="#000000" stroke-width="60" opacity="0.75" filter="blur(26px)"/>

    <!-- Left Arm -->
    <path d="M 240,250 L 360,250 L 512,670 L 436,670 Z" fill="url(#vToneC)"/>
    <line x1="240" y1="250" x2="436" y2="670" stroke="#ffffff" stroke-width="2.5"/>
    <line x1="240" y1="250" x2="360" y2="250" stroke="#ffffff" stroke-width="2"/>

    <!-- Right Arm -->
    <path d="M 784,250 L 664,250 L 512,670 L 588,670 Z" fill="url(#vToneC)"/>
    <line x1="784" y1="250" x2="588" y2="670" stroke="#ffffff" stroke-width="2.5"/>
    <line x1="664" y1="250" x2="784" y2="250" stroke="#ffffff" stroke-width="2"/>

    <!-- Central Code Slash "/" -->
    <line x1="568" y1="284" x2="456" y2="604" stroke="rgba(255,255,255,0.22)" stroke-width="2" stroke-dasharray="6 8"/>
    <line x1="436" y1="670" x2="588" y2="670" stroke="#ffffff" stroke-width="2.5"/>

    <!-- ================= PURE CIRCULAR DIODE NODE < · > ================= -->
    <!-- Solid Orange Diode Orb (Crisp & Tactile) -->
    <circle cx="512" cy="746" r="22" fill="#ff4d00"/>
    <circle cx="512" cy="746" r="6" fill="#ffffff"/>

    <!-- Sleek Code Chevrons < > -->
    <g stroke="#ff4d00" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" fill="none">
      <path d="M 444,730 L 424,746 L 444,762"/>
      <path d="M 580,730 L 600,746 L 580,762"/>
    </g>
  </g>

  <!-- Typography -->
  <g font-family="'JetBrains Mono', monospace" font-size="14" font-weight="600" letter-spacing="0.4em">
    <text x="512" y="96" text-anchor="middle" fill="rgba(255,255,255,0.5)">VALENCE<tspan fill="#ff4d00">·</tspan></text>
    <text x="512" y="938" text-anchor="middle" fill="#8b8b93">WEB STUDIO</text>
  </g>
</svg>
`.trim();

async function run() {
  console.log('Rendering Pleasant & Ultra-Premium Master Avatars (1024x1024 PNG)...');

  // Variant A: Precision Hardware
  await sharp(Buffer.from(svgA))
    .png({ compressionLevel: 9 })
    .toFile(path.join(__dirname, '../public/avatar_master_precision_hardware.png'));
  console.log('✓ Master A: Precision Hardware saved');

  // Variant B: Integrated Keystone
  await sharp(Buffer.from(svgB))
    .png({ compressionLevel: 9 })
    .toFile(path.join(__dirname, '../public/avatar_master_integrated_keystone.png'));
  console.log('✓ Master B: Integrated Keystone saved');

  // Variant C: Pure Minimal Code Monomark
  await sharp(Buffer.from(svgC))
    .png({ compressionLevel: 9 })
    .toFile(path.join(__dirname, '../public/avatar_master_pure_minimal.png'));
  console.log('✓ Master C: Pure Minimal saved');

  // Overwrite default public avatar with Master A
  await sharp(Buffer.from(svgA))
    .png({ compressionLevel: 9 })
    .toFile(path.join(__dirname, '../public/valence-avatar.png'));
  console.log('✓ valence-avatar.png updated with Master A!');
}

run();
