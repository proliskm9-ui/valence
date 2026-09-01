/**
 * Valence Premium Avatar Generator - 3 Avant-Garde Concepts
 * Generates 1024x1024 master assets for WhatsApp & social profiles.
 */

import sharp from 'sharp';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const SIZE = 1024;

// -----------------------------------------------------------------------------
// CONCEPT 1: "Architectural Obsidian & Liquid Chrome Prism"
// Faceted 3D geometric V with metallic specular highlights, glass gradient, 
// deep obsidian bevels, and intense neon orange refraction / laser core.
// -----------------------------------------------------------------------------
const svgConcept1 = /* xml */`
<svg xmlns="http://www.w3.org/2000/svg" width="${SIZE}" height="${SIZE}" viewBox="0 0 ${SIZE} ${SIZE}">
  <defs>
    <!-- Background Vignette -->
    <radialGradient id="bgGlow" cx="50%" cy="50%" r="65%">
      <stop offset="0%" stop-color="#141419"/>
      <stop offset="60%" stop-color="#0a0a0c"/>
      <stop offset="100%" stop-color="#040405"/>
    </radialGradient>

    <!-- Intense Orange Core Volumetric Glow -->
    <radialGradient id="orangeCoreGlow" cx="50%" cy="72%" r="45%">
      <stop offset="0%" stop-color="#ff4d00" stop-opacity="0.45"/>
      <stop offset="30%" stop-color="#ff4d00" stop-opacity="0.15"/>
      <stop offset="70%" stop-color="#ff4d00" stop-opacity="0.03"/>
      <stop offset="100%" stop-color="#ff4d00" stop-opacity="0"/>
    </radialGradient>

    <!-- Chrome Left Facet Gradient (Light to Deep Titanium) -->
    <linearGradient id="chromeLeftOuter" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#ffffff"/>
      <stop offset="15%" stop-color="#e2e2e8"/>
      <stop offset="45%" stop-color="#7a7a85"/>
      <stop offset="75%" stop-color="#2a2a32"/>
      <stop offset="100%" stop-color="#121216"/>
    </linearGradient>

    <linearGradient id="chromeLeftInner" x1="100%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#2c2c36"/>
      <stop offset="40%" stop-color="#18181e"/>
      <stop offset="85%" stop-color="#0e0e12"/>
      <stop offset="100%" stop-color="#ff4d00" stop-opacity="0.8"/>
    </linearGradient>

    <!-- Chrome Right Facet Gradient -->
    <linearGradient id="chromeRightOuter" x1="100%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#ffffff"/>
      <stop offset="20%" stop-color="#d0d0d8"/>
      <stop offset="55%" stop-color="#5a5a66"/>
      <stop offset="80%" stop-color="#222228"/>
      <stop offset="100%" stop-color="#101014"/>
    </linearGradient>

    <linearGradient id="chromeRightInner" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#343440"/>
      <stop offset="40%" stop-color="#1c1c24"/>
      <stop offset="80%" stop-color="#0f0f14"/>
      <stop offset="100%" stop-color="#ff4d00" stop-opacity="0.9"/>
    </linearGradient>

    <!-- Bevel Specular Top -->
    <linearGradient id="bevelTop" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#ffffff" stop-opacity="0.9"/>
      <stop offset="50%" stop-color="#ffffff" stop-opacity="0.3"/>
      <stop offset="100%" stop-color="#ffffff" stop-opacity="0.9"/>
    </linearGradient>

    <!-- Laser Dot Refraction -->
    <radialGradient id="laserOrb" cx="35%" cy="35%" r="65%">
      <stop offset="0%" stop-color="#ffffff"/>
      <stop offset="25%" stop-color="#ff8c42"/>
      <stop offset="60%" stop-color="#ff4d00"/>
      <stop offset="100%" stop-color="#b82800"/>
    </radialGradient>

    <!-- Subtle Grain -->
    <filter id="noiseFilter">
      <feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="3" stitchTiles="stitch"/>
      <feColorMatrix type="saturate" values="0"/>
      <feComponentTransfer><feFuncA type="linear" slope="0.05"/></feComponentTransfer>
      <feBlend mode="overlay"/>
    </filter>
  </defs>

  <!-- Background -->
  <rect width="${SIZE}" height="${SIZE}" fill="url(#bgGlow)"/>
  <rect width="${SIZE}" height="${SIZE}" fill="url(#orangeCoreGlow)"/>

  <!-- Technical Circular WhatsApp Safe Guide Ring (Subtle Hairline) -->
  <circle cx="512" cy="512" r="476" fill="none" stroke="rgba(255,255,255,0.06)" stroke-width="1.5" stroke-dasharray="8 6"/>
  <circle cx="512" cy="512" r="440" fill="none" stroke="rgba(255,255,255,0.03)" stroke-width="1"/>

  <!-- Technical Crosshairs & Coordinates -->
  <g opacity="0.35" stroke="rgba(255,255,255,0.2)" stroke-width="1">
    <line x1="512" y1="48" x2="512" y2="76"/>
    <line x1="512" y1="948" x2="512" y2="976"/>
    <line x1="48" y1="512" x2="76" y2="512"/>
    <line x1="948" y1="512" x2="976" y2="512"/>
  </g>

  <!-- Micro Technical Typography -->
  <text x="96" y="96" font-family="'JetBrains Mono', monospace" font-size="16" fill="rgba(255,255,255,0.3)" letter-spacing="0.25em">VALENCE // SPEC.01</text>
  <text x="928" y="96" text-anchor="end" font-family="'JetBrains Mono', monospace" font-size="16" fill="rgba(255,77,0,0.7)" letter-spacing="0.25em">CORE.ACTV</text>
  <text x="96" y="940" font-family="'JetBrains Mono', monospace" font-size="14" fill="rgba(255,255,255,0.2)" letter-spacing="0.2em">STUDIO ID: 43.19°N</text>
  <text x="928" y="940" text-anchor="end" font-family="'JetBrains Mono', monospace" font-size="14" fill="rgba(255,255,255,0.2)" letter-spacing="0.2em">DESIGN / DEV</text>

  <!-- ================= 3D FACETED MONOLITH V ================= -->
  <g transform="translate(0, -10)">
    <!-- Drop Shadow / Ground Occlusion -->
    <path d="M 180 220 L 512 820 L 844 220" fill="none" stroke="#000" stroke-width="90" opacity="0.6" filter="blur(30px)"/>

    <!-- Left Outer Facet (Light Titanium) -->
    <polygon points="180,220 330,220 512,790 440,790" fill="url(#chromeLeftOuter)"/>

    <!-- Left Inner Facet (Dark Smoky Obsidian with Orange Ambient reflection) -->
    <polygon points="330,220 400,220 512,790 512,790" fill="url(#chromeLeftInner)"/>

    <!-- Right Inner Facet (Deep Smoked Glass) -->
    <polygon points="694,220 624,220 512,790 512,790" fill="url(#chromeRightInner)"/>

    <!-- Right Outer Facet (Specular Highlight Chrome) -->
    <polygon points="844,220 694,220 512,790 584,790" fill="url(#chromeRightOuter)"/>

    <!-- Top Cap Bevels (Razor Precision Cut) -->
    <polygon points="180,216 330,216 330,224 180,224" fill="url(#bevelTop)"/>
    <polygon points="694,216 844,216 844,224 694,224" fill="url(#bevelTop)"/>

    <!-- Central Ridge Highlight (The sharp knife-edge down the center of each arm) -->
    <line x1="330" y1="220" x2="512" y2="790" stroke="rgba(255,255,255,0.85)" stroke-width="2.5"/>
    <line x1="694" y1="220" x2="512" y2="790" stroke="rgba(255,255,255,0.95)" stroke-width="2.5"/>

    <!-- Outer Rim Knife Edge -->
    <line x1="180" y1="220" x2="440" y2="790" stroke="rgba(255,255,255,0.4)" stroke-width="1.5"/>
    <line x1="844" y1="220" x2="584" y2="790" stroke="rgba(255,255,255,0.4)" stroke-width="1.5"/>

    <!-- Apex Sharp Cut at Bottom -->
    <polygon points="440,790 584,790 512,820" fill="#ff4d00" opacity="0.9"/>
    <line x1="440" y1="790" x2="584" y2="790" stroke="#ffffff" stroke-width="2"/>

    <!-- ================= SIGNATURE ORANGE HYPER-ORB ================= -->
    <!-- Ambient Volumetric Glow Behind Orb -->
    <circle cx="680" cy="740" r="140" fill="#ff4d00" opacity="0.2" filter="blur(40px)"/>
    <circle cx="680" cy="740" r="70" fill="#ff7700" opacity="0.4" filter="blur(16px)"/>

    <!-- Outer Precision Ring around Dot -->
    <circle cx="680" cy="740" r="48" fill="none" stroke="rgba(255,77,0,0.6)" stroke-width="1.5" stroke-dasharray="4 3"/>
    
    <!-- Solid Glowing Core Orb -->
    <circle cx="680" cy="740" r="32" fill="url(#laserOrb)"/>
    <!-- Specular Flare inside Core -->
    <circle cx="672" cy="732" r="9" fill="#ffffff" opacity="0.9"/>
  </g>

  <!-- Final Noise Pass -->
  <rect width="${SIZE}" height="${SIZE}" fill="#fff" opacity="0.035" filter="url(#noiseFilter)"/>
</svg>
`.trim();


// -----------------------------------------------------------------------------
// CONCEPT 2: "Avant-Garde Kinetic Monogram / Brutalist Luxury"
// Ultra-bold intersecting geometric V with negative space incisions,
// glowing neon-orange core split, and high-fashion typographic hierarchy.
// -----------------------------------------------------------------------------
const svgConcept2 = /* xml */`
<svg xmlns="http://www.w3.org/2000/svg" width="${SIZE}" height="${SIZE}" viewBox="0 0 1024 1024">
  <defs>
    <linearGradient id="c2Bg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#0d0d10"/>
      <stop offset="50%" stop-color="#08080a"/>
      <stop offset="100%" stop-color="#030304"/>
    </linearGradient>

    <linearGradient id="c2OrangeSlice" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#ff7b29"/>
      <stop offset="50%" stop-color="#ff4d00"/>
      <stop offset="100%" stop-color="#cc2a00"/>
    </linearGradient>

    <linearGradient id="c2WhiteArm" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#ffffff"/>
      <stop offset="60%" stop-color="#ececf0"/>
      <stop offset="100%" stop-color="#a6a6b2"/>
    </linearGradient>

    <linearGradient id="c2DarkArm" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#32323c"/>
      <stop offset="100%" stop-color="#141418"/>
    </linearGradient>

    <radialGradient id="c2OrangeHalo" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="#ff4d00" stop-opacity="0.35"/>
      <stop offset="100%" stop-color="#ff4d00" stop-opacity="0"/>
    </radialGradient>
  </defs>

  <rect width="1024" height="1024" fill="url(#c2Bg)"/>

  <!-- Halo Atmosphere -->
  <circle cx="512" cy="540" r="380" fill="url(#c2OrangeHalo)"/>

  <!-- Geometric Decorative Grid & Border Frame -->
  <rect x="80" y="80" width="864" height="864" fill="none" stroke="rgba(255,255,255,0.08)" stroke-width="1"/>
  <rect x="96" y="96" width="832" height="832" fill="none" stroke="rgba(255,255,255,0.04)" stroke-width="1"/>

  <!-- Top / Bottom Brand Labeling -->
  <g font-family="'JetBrains Mono', monospace" font-size="15" fill="rgba(255,255,255,0.4)" letter-spacing="0.3em">
    <text x="120" y="130">VALENCE®</text>
    <text x="904" y="130" text-anchor="end" fill="#ff4d00">AUTONOMOUS STUDIO</text>
    <text x="120" y="904">SYSTEM / CORE.01</text>
    <text x="904" y="904" text-anchor="end">EST. 2026</text>
  </g>

  <!-- Big Avant-Garde Split Monogram -->
  <g transform="translate(0, 0)">
    <!-- Arm 1 (Heavy White Razor Blade) -->
    <path d="M 170 230 L 370 230 L 512 640 L 410 790 L 170 230 Z" fill="url(#c2WhiteArm)"/>

    <!-- Negative Space Cut Accent (Dark Inset Arm) -->
    <path d="M 654 230 L 854 230 L 512 810 L 430 790 L 610 380 Z" fill="url(#c2DarkArm)"/>

    <!-- Kinetic Orange Intersecting Wedge (The Kinetic Energy of Valence) -->
    <polygon points="512,460 670,230 760,230 512,790 460,720" fill="url(#c2OrangeSlice)"/>

    <!-- Micro Precision Inset Crosses -->
    <path d="M 492 500 L 532 500 M 512 480 L 512 520" stroke="#ffffff" stroke-width="2" opacity="0.8"/>

    <!-- Signature High-Gloss Orange Dot (Positioned Dynamically) -->
    <circle cx="780" cy="740" r="120" fill="#ff4d00" opacity="0.18" filter="blur(30px)"/>
    <circle cx="780" cy="740" r="36" fill="url(#c2OrangeSlice)"/>
    <circle cx="770" cy="730" r="10" fill="#ffffff" opacity="0.85"/>
  </g>
</svg>
`.trim();


// -----------------------------------------------------------------------------
// CONCEPT 3: "Kinetic Ray / Cylindrical Hyper-Glass V"
// Fluid, minimalist, deeply futuristic design-forward emblem.
// Pure hyper-precision curves with luminous neon orange internal reflection.
// -----------------------------------------------------------------------------
const svgConcept3 = /* xml */`
<svg xmlns="http://www.w3.org/2000/svg" width="${SIZE}" height="${SIZE}" viewBox="0 0 1024 1024">
  <defs>
    <radialGradient id="c3Bg" cx="50%" cy="45%" r="70%">
      <stop offset="0%" stop-color="#181414"/>
      <stop offset="40%" stop-color="#0d0b0b"/>
      <stop offset="100%" stop-color="#050404"/>
    </radialGradient>

    <radialGradient id="c3FlameGlow" cx="50%" cy="80%" r="50%">
      <stop offset="0%" stop-color="#ff4d00" stop-opacity="0.5"/>
      <stop offset="40%" stop-color="#ff4d00" stop-opacity="0.12"/>
      <stop offset="100%" stop-color="#ff4d00" stop-opacity="0"/>
    </radialGradient>

    <linearGradient id="c3GlassV" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#ffffff"/>
      <stop offset="30%" stop-color="#e8e8ee"/>
      <stop offset="70%" stop-color="#8c8c9a"/>
      <stop offset="95%" stop-color="#ff6a2b"/>
      <stop offset="100%" stop-color="#ff4d00"/>
    </linearGradient>

    <linearGradient id="c3LaserLine" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#ffffff"/>
      <stop offset="50%" stop-color="#ff8533"/>
      <stop offset="100%" stop-color="#ff4d00"/>
    </linearGradient>
  </defs>

  <rect width="1024" height="1024" fill="url(#c3Bg)"/>
  <rect width="1024" height="1024" fill="url(#c3FlameGlow)"/>

  <!-- Precision Technical Circles (Hypnotic Moiré / Compass) -->
  <g opacity="0.25" stroke="rgba(255,255,255,0.3)" fill="none" stroke-width="1">
    <circle cx="512" cy="512" r="460" stroke-dasharray="2 8"/>
    <circle cx="512" cy="512" r="380" stroke-dasharray="12 6"/>
    <circle cx="512" cy="512" r="300" stroke-dasharray="4 4"/>
    <circle cx="512" cy="512" r="220" stroke-opacity="0.4"/>
  </g>

  <!-- Central Kinetic V - Monolithic Fluid Geometry with Deep Shadow -->
  <g>
    <!-- Deep Ambient Occlusion -->
    <path d="M 230 250 L 512 800 L 794 250" fill="none" stroke="#000" stroke-width="140" stroke-linecap="round" stroke-linejoin="round" opacity="0.7" filter="blur(40px)"/>

    <!-- Base Outer V Track -->
    <path d="M 230 250 L 512 790 L 794 250" fill="none" stroke="#1f1f28" stroke-width="120" stroke-linecap="round" stroke-linejoin="round"/>

    <!-- Gradient Glass Core V -->
    <path d="M 230 250 L 512 790 L 794 250" fill="none" stroke="url(#c3GlassV)" stroke-width="96" stroke-linecap="round" stroke-linejoin="round"/>

    <!-- High-Precision Internal Laser Wire -->
    <path d="M 230 250 L 512 790 L 794 250" fill="none" stroke="url(#c3LaserLine)" stroke-width="6" stroke-linecap="round" stroke-linejoin="round" opacity="0.95"/>

    <!-- Apex Focal Glow Orb -->
    <circle cx="512" cy="790" r="160" fill="#ff4d00" opacity="0.35" filter="blur(36px)"/>
    <circle cx="512" cy="790" r="32" fill="#ffffff"/>
    <circle cx="512" cy="790" r="26" fill="#ff4d00"/>
    <circle cx="512" cy="790" r="14" fill="#ffffff"/>
  </g>

  <!-- Typography Base -->
  <text x="512" y="930" text-anchor="middle" font-family="'Unbounded', sans-serif" font-weight="800" font-size="28" fill="#f4f4f2" letter-spacing="0.4em">VALENCE<tspan fill="#ff4d00">·</tspan></text>
</svg>
`.trim();

async function run() {
  console.log('Rendering 3 Master Avatar Concepts (1024x1024 PNG)...');

  await sharp(Buffer.from(svgConcept1))
    .png({ compressionLevel: 9 })
    .toFile(path.join(__dirname, '../public/avatar_concept_1_monolith.png'));
  console.log('✓ Concept 1: Monolith & Liquid Chrome saved');

  await sharp(Buffer.from(svgConcept2))
    .png({ compressionLevel: 9 })
    .toFile(path.join(__dirname, '../public/avatar_concept_2_brutalist.png'));
  console.log('✓ Concept 2: Avant-Garde Brutalist saved');

  await sharp(Buffer.from(svgConcept3))
    .png({ compressionLevel: 9 })
    .toFile(path.join(__dirname, '../public/avatar_concept_3_kinetic.png'));
  console.log('✓ Concept 3: Kinetic Hyper-Glass saved');
}

run();
