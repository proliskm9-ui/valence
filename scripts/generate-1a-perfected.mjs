/**
 * Valence 1A Perfected - Web Studio Master Edition
 * Tailored for Web Studio / Web Production positioning.
 * Enhanced titanium shader, multi-faceted crystal apex, precise technical typography.
 */

import sharp from 'sharp';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const SIZE = 1024;

function createSvg({
  topText = "VALENCE // WEB PRODUCTION",
  bottomText = "WEB STUDIO",
  cornerDetails = true,
  prismIntensity = 1.0,
}) {
  return /* xml */`
<svg xmlns="http://www.w3.org/2000/svg" width="${SIZE}" height="${SIZE}" viewBox="0 0 ${SIZE} ${SIZE}">
  <defs>
    <!-- Background Vignette -->
    <radialGradient id="bgVignette" cx="50%" cy="50%" r="72%">
      <stop offset="0%" stop-color="#15151c"/>
      <stop offset="42%" stop-color="#09090c"/>
      <stop offset="100%" stop-color="#020203"/>
    </radialGradient>

    <!-- Upward Volumetric Apex Glow -->
    <radialGradient id="apexGlowVolumetric" cx="50%" cy="77%" r="48%">
      <stop offset="0%" stop-color="#ff4d00" stop-opacity="0.6"/>
      <stop offset="22%" stop-color="#ff4d00" stop-opacity="0.22"/>
      <stop offset="60%" stop-color="#ff4d00" stop-opacity="0.04"/>
      <stop offset="100%" stop-color="#ff4d00" stop-opacity="0"/>
    </radialGradient>

    <!-- Ambient Upper Rim Backlight -->
    <radialGradient id="topRimLight" cx="50%" cy="20%" r="40%">
      <stop offset="0%" stop-color="rgba(255,255,255,0.06)"/>
      <stop offset="100%" stop-color="rgba(255,255,255,0)"/>
    </radialGradient>

    <!-- Left Outer Facet: Brushed Liquid Titanium -->
    <linearGradient id="facetLeftOuter" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#ffffff"/>
      <stop offset="10%" stop-color="#ebebf2"/>
      <stop offset="35%" stop-color="#90909e"/>
      <stop offset="65%" stop-color="#3c3c48"/>
      <stop offset="90%" stop-color="#1a1a22"/>
      <stop offset="100%" stop-color="#0d0d12"/>
    </linearGradient>

    <!-- Left Inner Facet: Deep Obsidian Glass with Ambient Warm Reflection -->
    <linearGradient id="facetLeftInner" x1="100%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#363644"/>
      <stop offset="35%" stop-color="#1c1c24"/>
      <stop offset="70%" stop-color="#101015"/>
      <stop offset="92%" stop-color="#ff5511" stop-opacity="0.95"/>
      <stop offset="100%" stop-color="#ffffff"/>
    </linearGradient>

    <!-- Right Inner Facet: Smoky Obsidian Glass -->
    <linearGradient id="facetRightInner" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#3e3e4e"/>
      <stop offset="35%" stop-color="#20202a"/>
      <stop offset="70%" stop-color="#121218"/>
      <stop offset="92%" stop-color="#ff5511" stop-opacity="0.95"/>
      <stop offset="100%" stop-color="#ffffff"/>
    </linearGradient>

    <!-- Right Outer Facet: High-Contrast Specular Titanium Blade -->
    <linearGradient id="facetRightOuter" x1="100%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#ffffff"/>
      <stop offset="12%" stop-color="#e0e0ea"/>
      <stop offset="42%" stop-color="#727282"/>
      <stop offset="72%" stop-color="#282832"/>
      <stop offset="95%" stop-color="#14141a"/>
      <stop offset="100%" stop-color="#0a0a0e"/>
    </linearGradient>

    <!-- Razor Bevel Top Edge -->
    <linearGradient id="bevelEdge" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#ffffff"/>
      <stop offset="50%" stop-color="#b8b8c8"/>
      <stop offset="100%" stop-color="#ffffff"/>
    </linearGradient>

    <!-- Multi-Faceted Orange Crystal Keystone (Left facet) -->
    <linearGradient id="prismLeftFacet" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#ffffff"/>
      <stop offset="25%" stop-color="#ffa34d"/>
      <stop offset="65%" stop-color="#ff4d00"/>
      <stop offset="100%" stop-color="#b32400"/>
    </linearGradient>

    <!-- Multi-Faceted Orange Crystal Keystone (Right facet) -->
    <linearGradient id="prismRightFacet" x1="100%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#ff802b"/>
      <stop offset="45%" stop-color="#ff4d00"/>
      <stop offset="85%" stop-color="#991c00"/>
      <stop offset="100%" stop-color="#550a00"/>
    </linearGradient>
  </defs>

  <!-- Background Base -->
  <rect width="${SIZE}" height="${SIZE}" fill="url(#bgVignette)"/>
  <rect width="${SIZE}" height="${SIZE}" fill="url(#topRimLight)"/>
  <rect width="${SIZE}" height="${SIZE}" fill="url(#apexGlowVolumetric)"/>

  <!-- WhatsApp Circular Safe-Zone Grid (Precision Hairlines) -->
  <g opacity="0.4">
    <circle cx="512" cy="512" r="468" fill="none" stroke="rgba(255,255,255,0.08)" stroke-width="1.5" stroke-dasharray="6 8"/>
    <circle cx="512" cy="512" r="436" fill="none" stroke="rgba(255,255,255,0.03)" stroke-width="1"/>
    <!-- Subtle Compass Ticks at 90 deg -->
    <line x1="512" y1="46" x2="512" y2="58" stroke="rgba(255,255,255,0.3)" stroke-width="1.5"/>
    <line x1="512" y1="966" x2="512" y2="978" stroke="rgba(255,255,255,0.3)" stroke-width="1.5"/>
    <line x1="46" y1="512" x2="58" y2="512" stroke="rgba(255,255,255,0.3)" stroke-width="1.5"/>
    <line x1="966" y1="512" x2="978" y2="512" stroke="rgba(255,255,255,0.3)" stroke-width="1.5"/>
  </g>

  <!-- Corner Meta Details (If enabled) -->
  ${cornerDetails ? /* xml */`
  <g font-family="'JetBrains Mono', monospace" font-size="12" fill="rgba(255,255,255,0.2)" letter-spacing="0.2em">
    <text x="96" y="96">DEV // PROD</text>
    <text x="928" y="96" text-anchor="end" fill="rgba(255,77,0,0.6)">SYS.OK</text>
    <text x="96" y="936">43.19°N</text>
    <text x="928" y="936" text-anchor="end">EST.2026</text>
  </g>
  ` : ''}

  <!-- Header & Footer Technical Typography -->
  <g font-family="'JetBrains Mono', monospace" font-weight="600">
    <text x="512" y="92" text-anchor="middle" font-size="14" fill="rgba(255,255,255,0.4)" letter-spacing="0.32em">${topText}</text>
    <text x="512" y="946" text-anchor="middle" font-size="14" fill="rgba(255,255,255,0.35)" letter-spacing="0.4em">${bottomText}</text>
  </g>

  <!-- ================= MONOLITH V SCULPTURE ================= -->
  <g transform="translate(0, 12)">
    <!-- Deep Occlusion Shadow on Ground -->
    <path d="M 186 206 L 512 770 L 838 206" fill="none" stroke="#000000" stroke-width="110" opacity="0.85" filter="blur(42px)"/>

    <!-- Left Outer Facet (Light Brushed Titanium) -->
    <polygon points="186,206 336,206 512,756 438,756" fill="url(#facetLeftOuter)"/>

    <!-- Left Inner Facet (Dark Obsidian Glass) -->
    <polygon points="336,206 406,206 512,726 512,756" fill="url(#facetLeftInner)"/>

    <!-- Right Inner Facet (Dark Obsidian Glass) -->
    <polygon points="688,206 618,206 512,726 512,756" fill="url(#facetRightInner)"/>

    <!-- Right Outer Facet (Specular Titanium Blade) -->
    <polygon points="838,206 688,206 512,756 586,756" fill="url(#facetRightOuter)"/>

    <!-- Top Cap Razor Bevels -->
    <polygon points="186,202 336,202 336,210 186,210" fill="url(#bevelEdge)"/>
    <polygon points="688,202 838,202 838,210 688,210" fill="url(#bevelEdge)"/>

    <!-- Central Razor Knife-Edge Highlights (Ultra crisp 2.5px specular ridges) -->
    <line x1="336" y1="206" x2="512" y2="756" stroke="rgba(255,255,255,0.92)" stroke-width="2.5"/>
    <line x1="688" y1="206" x2="512" y2="756" stroke="rgba(255,255,255,0.92)" stroke-width="2.5"/>

    <!-- Outer Rim Knife Edges -->
    <line x1="186" y1="206" x2="438" y2="756" stroke="rgba(255,255,255,0.4)" stroke-width="1.5"/>
    <line x1="838" y1="206" x2="586" y2="756" stroke="rgba(255,255,255,0.4)" stroke-width="1.5"/>

    <!-- ================= MULTI-FACETED CRYSTAL APEX KEYSTONE ================= -->
    <!-- Volumetric Ambient Bloom -->
    <ellipse cx="512" cy="780" rx="100" ry="46" fill="#ff4d00" opacity="0.65" filter="blur(22px)"/>
    <circle cx="512" cy="766" r="16" fill="#ffffff" filter="blur(5px)" opacity="0.8"/>

    <!-- Left Prism Triangle -->
    <polygon points="438,756 512,756 512,822" fill="url(#prismLeftFacet)"/>
    <!-- Right Prism Triangle -->
    <polygon points="512,756 586,756 512,822" fill="url(#prismRightFacet)"/>

    <!-- Keystone Top Horizontal Dividing Bevel -->
    <line x1="438" y1="756" x2="586" y2="756" stroke="#ffffff" stroke-width="3"/>

    <!-- Keystone Diagonal Edges -->
    <line x1="438" y1="756" x2="512" y2="822" stroke="#ffaa66" stroke-width="2"/>
    <line x1="586" y1="756" x2="512" y2="822" stroke="#ff7733" stroke-width="1.5"/>

    <!-- Center Ridge on the Keystone -->
    <line x1="512" y1="756" x2="512" y2="822" stroke="#ffffff" stroke-width="1.5" opacity="0.9"/>

    <!-- Hotspot Diamond Highlight -->
    <polygon points="512,754 515,758 512,762 509,758" fill="#ffffff"/>
  </g>
</svg>
`.trim();
}

async function run() {
  console.log('Generating Master 1A Web Studio Avatars (1024x1024 PNG)...');

  // Master 1A: Clean Web Production
  const svgMaster = createSvg({
    topText: "VALENCE // WEB PRODUCTION",
    bottomText: "WEB STUDIO",
    cornerDetails: true,
  });
  await sharp(Buffer.from(svgMaster))
    .png({ compressionLevel: 9 })
    .toFile(path.join(__dirname, '../public/avatar_1a_master_web_production.png'));
  console.log('✓ 1A Master: Web Production saved');

  // Master 1A Variant B: Dev & Code
  const svgDev = createSvg({
    topText: "VALENCE // DEV STUDIO",
    bottomText: "WEB DEVELOPMENT &amp; CODE",
    cornerDetails: true,
  });
  await sharp(Buffer.from(svgDev))
    .png({ compressionLevel: 9 })
    .toFile(path.join(__dirname, '../public/avatar_1a_dev_studio.png'));
  console.log('✓ 1A Variant: Dev Studio saved');

  // Master 1A Variant C: Pure Minimalist (No corner clutter, pure focus)
  const svgPure = createSvg({
    topText: "VALENCE·",
    bottomText: "WEB STUDIO",
    cornerDetails: false,
  });
  await sharp(Buffer.from(svgPure))
    .png({ compressionLevel: 9 })
    .toFile(path.join(__dirname, '../public/avatar_1a_pure_minimal.png'));
  console.log('✓ 1A Variant: Pure Minimal saved');

  // Overwrite default public avatar as the master version
  await sharp(Buffer.from(svgMaster))
    .png({ compressionLevel: 9 })
    .toFile(path.join(__dirname, '../public/valence-avatar.png'));
  console.log('✓ valence-avatar.png updated with 1A Master!');
}

run();
