/**
 * Valence Original Concept 3 (Code & Structure) - Precision Craft Refinements
 * 
 * Preserves the exact razor-sharp flat-tech vector architecture of the original,
 * refining:
 * 1. Deep cinematic elevation shadow (soft multi-stage ambient blur, no clunky fake 3D)
 * 2. High-contrast pristine white-to-titanium gradient on the V
 * 3. Razor specular contour hairlines
 * 4. Micro-precision neon code diode < ⬡ > with refined bloom & specular chip
 * 5. Perfect WhatsApp circular crop alignment
 */

import sharp from 'sharp';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const SIZE = 1024;

function createSvgVariant({
  bottomText = "WEB STUDIO",
  topText = "<VALENCE />",
  diodeScale = 1.0,
  shadowDepth = 1.0,
  slashOpacity = 0.2,
  innerGlow = true,
}) {
  return /* xml */`
<svg xmlns="http://www.w3.org/2000/svg" width="${SIZE}" height="${SIZE}" viewBox="0 0 ${SIZE} ${SIZE}">
  <defs>
    <!-- Deep Canvas Background -->
    <radialGradient id="bgOrig" cx="50%" cy="50%" r="72%">
      <stop offset="0%" stop-color="#141419"/>
      <stop offset="50%" stop-color="#08080a"/>
      <stop offset="100%" stop-color="#020203"/>
    </radialGradient>

    <!-- Upward Ambient Diode Backlight Bloom -->
    <radialGradient id="diodeBloomOrig" cx="50%" cy="75%" r="48%">
      <stop offset="0%" stop-color="#ff4d00" stop-opacity="0.55"/>
      <stop offset="28%" stop-color="#ff4d00" stop-opacity="0.18"/>
      <stop offset="65%" stop-color="#ff4d00" stop-opacity="0.03"/>
      <stop offset="100%" stop-color="#ff4d00" stop-opacity="0"/>
    </radialGradient>

    <!-- Pristine V Face Gradient (Pure White to Cool Titanium) -->
    <linearGradient id="vFaceLaser" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#ffffff"/>
      <stop offset="35%" stop-color="#f2f2f8"/>
      <stop offset="75%" stop-color="#d4d4e0"/>
      <stop offset="100%" stop-color="#9898a8"/>
    </linearGradient>

    <!-- Orange Diode Core Shader -->
    <linearGradient id="diodeShader" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#ffffff"/>
      <stop offset="22%" stop-color="#ffa34d"/>
      <stop offset="65%" stop-color="#ff4d00"/>
      <stop offset="100%" stop-color="#b82000"/>
    </linearGradient>

    <!-- Film Grain Filter -->
    <filter id="grainOrig">
      <feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="3" stitchTiles="stitch"/>
      <feColorMatrix type="saturate" values="0"/>
      <feComponentTransfer><feFuncA type="linear" slope="0.038"/></feComponentTransfer>
      <feBlend mode="overlay"/>
    </filter>
  </defs>

  <!-- Background Base -->
  <rect width="${SIZE}" height="${SIZE}" fill="url(#bgOrig)"/>

  <!-- Matrix Micro-Grid (Developer System Architecture) -->
  <g opacity="0.035" stroke="#ffffff" stroke-width="1">
    <line x1="256" y1="0" x2="256" y2="1024"/>
    <line x1="512" y1="0" x2="512" y2="1024"/>
    <line x1="768" y1="0" x2="768" y2="1024"/>
    <line x1="0" y1="256" x2="1024" y2="256"/>
    <line x1="0" y1="512" x2="1024" y2="512"/>
    <line x1="0" y1="768" x2="1024" y2="768"/>
  </g>

  <!-- Circular Framing Track for WhatsApp (Safe zone: 468px) -->
  <circle cx="512" cy="512" r="468" fill="none" stroke="rgba(255,255,255,0.06)" stroke-width="1.5" stroke-dasharray="4 8"/>
  <circle cx="512" cy="512" r="436" fill="none" stroke="rgba(255,255,255,0.025)" stroke-width="1"/>

  <!-- ================= THE MASTER CODE-GLYPH ================= -->
  <g transform="translate(0, -10)">
    <!-- Upward Ambient Diode Bloom -->
    <circle cx="512" cy="746" r="320" fill="url(#diodeBloomOrig)"/>

    <!-- 1. DEEP MULTI-STAGE ELEVATION DROP SHADOW (Gives floating presence without clunky 3D) -->
    <path d="M 236,260 L 512,740 L 788,260" fill="none" stroke="#000000" stroke-width="110" opacity="${0.85 * shadowDepth}" filter="blur(40px)"/>
    <path d="M 240,260 L 512,740 L 784,260" fill="none" stroke="#000000" stroke-width="50" opacity="${0.9 * shadowDepth}" filter="blur(16px)"/>

    <!-- 2. LEFT CODE CHEVRON ARM (Bracket < into V) -->
    <path d="M 240,260 L 360,260 L 512,680 L 436,680 Z" fill="url(#vFaceLaser)"/>
    <!-- Left Outer Specular Razor Contour -->
    <line x1="240" y1="260" x2="436" y2="680" stroke="#ffffff" stroke-width="2.5"/>
    <line x1="240" y1="260" x2="360" y2="260" stroke="#ffffff" stroke-width="2"/>
    <line x1="360" y1="260" x2="512" y2="680" stroke="rgba(255,255,255,0.6)" stroke-width="1.5"/>

    <!-- 3. RIGHT CODE CHEVRON ARM (Bracket > into V) -->
    <path d="M 784,260 L 664,260 L 512,680 L 588,680 Z" fill="url(#vFaceLaser)"/>
    <!-- Right Outer Specular Razor Contour -->
    <line x1="784" y1="260" x2="588" y2="680" stroke="#ffffff" stroke-width="2.5"/>
    <line x1="664" y1="260" x2="784" y2="260" stroke="#ffffff" stroke-width="2"/>
    <line x1="664" y1="260" x2="512" y2="680" stroke="rgba(255,255,255,0.6)" stroke-width="1.5"/>

    <!-- 4. CENTRAL CODE SLASH "/" (Subtle Dashed Laser) -->
    <line x1="568" y1="294" x2="456" y2="614" stroke="rgba(255,255,255,${slashOpacity})" stroke-width="2.5" stroke-dasharray="6 8"/>

    <!-- 5. APEX DIODE RECESSED GLOW ACCENT -->
    ${innerGlow ? /* xml */`
    <!-- Warm orange bounce light on apex underside -->
    <polygon points="436,678 588,678 512,710" fill="#ff4d00" opacity="0.3" filter="blur(8px)"/>
    <line x1="436" y1="680" x2="588" y2="680" stroke="#ffffff" stroke-width="2.5"/>
    ` : ''}

    <!-- ================= THE NEON TERMINAL DIODE & BRACKETS < ⬡ > ================= -->
    <g transform="scale(${diodeScale}) translate(${512 * (1 - diodeScale) / diodeScale}, ${748 * (1 - diodeScale) / diodeScale})">
      <!-- Neon Bloom -->
      <circle cx="512" cy="748" r="54" fill="#ff4d00" opacity="0.45" filter="blur(16px)"/>

      <!-- Solid Glowing Hexagonal Microchip Diode -->
      <polygon points="512,714 544,732 544,764 512,782 480,764 480,732" fill="url(#diodeShader)"/>
      <!-- Specular Center Hotspot -->
      <circle cx="512" cy="748" r="6" fill="#ffffff" opacity="0.95"/>

      <!-- Chevron Terminal Brackets < > -->
      <g stroke="#ff4d00" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" fill="none">
        <path d="M 444,730 L 422,748 L 444,766"/>
        <path d="M 580,730 L 602,748 L 580,766"/>
      </g>
      <!-- Specular Tips on Chevron Wings -->
      <circle cx="422" cy="748" r="2.5" fill="#ffffff"/>
      <circle cx="602" cy="748" r="2.5" fill="#ffffff"/>
    </g>
  </g>

  <!-- Technical Branding Header / Footer -->
  <g font-family="'JetBrains Mono', monospace" font-size="14" font-weight="600" letter-spacing="0.4em">
    <text x="512" y="96" text-anchor="middle" fill="rgba(255,255,255,0.4)">${topText}</text>
    <text x="512" y="938" text-anchor="middle" fill="#8b8b93">${bottomText}</text>
  </g>

  <!-- Film Grain Overlay -->
  <rect width="${SIZE}" height="${SIZE}" fill="#fff" opacity="0.035" filter="url(#grainOrig)"/>
</svg>
`.trim();
}

async function run() {
  console.log('Rendering Precision Refinements of Original Concept 3 (1024x1024 PNG)...');

  // Variant 1: Master Perfected (Web Studio)
  const svg1 = createSvgVariant({
    topText: "<VALENCE />",
    bottomText: "WEB STUDIO",
    diodeScale: 1.0,
    shadowDepth: 1.1,
    slashOpacity: 0.22,
    innerGlow: true,
  });
  await sharp(Buffer.from(svg1))
    .png({ compressionLevel: 9 })
    .toFile(path.join(__dirname, '../public/concept_3_perfected_web_studio.png'));
  console.log('✓ Variant 1: Perfected Web Studio saved');

  // Variant 2: Web Production (Bolder neon diode)
  const svg2 = createSvgVariant({
    topText: "<VALENCE />",
    bottomText: "WEB PRODUCTION",
    diodeScale: 1.1,
    shadowDepth: 1.25,
    slashOpacity: 0.28,
    innerGlow: true,
  });
  await sharp(Buffer.from(svg2))
    .png({ compressionLevel: 9 })
    .toFile(path.join(__dirname, '../public/concept_3_perfected_web_production.png'));
  console.log('✓ Variant 2: Perfected Web Production saved');

  // Variant 3: Pure Minimal Wordmark (Clean top VALENCE·)
  const svg3 = createSvgVariant({
    topText: "VALENCE·",
    bottomText: "WEB STUDIO",
    diodeScale: 1.0,
    shadowDepth: 1.0,
    slashOpacity: 0.18,
    innerGlow: true,
  });
  await sharp(Buffer.from(svg3))
    .png({ compressionLevel: 9 })
    .toFile(path.join(__dirname, '../public/concept_3_perfected_pure_minimal.png'));
  console.log('✓ Variant 3: Pure Minimal saved');

  // Update default avatar
  await sharp(Buffer.from(svg1))
    .png({ compressionLevel: 9 })
    .toFile(path.join(__dirname, '../public/valence-avatar.png'));
  console.log('✓ valence-avatar.png updated with Variant 1 Master!');
}

run();
