/**
 * Valence 3 Master Concepts (101% Craft Edition)
 *
 * 1. EDITORIAL MONOGRAM — Pure high-fashion Swiss typography, bespoke V· letterform, film grain.
 * 2. KINETIC ECLIPSE — Deep obsidian event horizon, razor-sharp molten corona #ff4d00, diamond flare.
 * 3. CODE & STRUCTURE — Razor-sharp architectural cyber-glyph (Code bracket + V + Orange diode).
 */

import sharp from 'sharp';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const SIZE = 1024;

// =============================================================================
// CONCEPT 1: HIGH-END SWISS / EDITORIAL MONOGRAM
// =============================================================================
const svgConcept1 = /* xml */`
<svg xmlns="http://www.w3.org/2000/svg" width="${SIZE}" height="${SIZE}" viewBox="0 0 ${SIZE} ${SIZE}">
  <defs>
    <!-- Deep Atmospheric Background Gradient -->
    <radialGradient id="c1Bg" cx="50%" cy="48%" r="65%">
      <stop offset="0%" stop-color="#141418"/>
      <stop offset="55%" stop-color="#0a0a0c"/>
      <stop offset="100%" stop-color="#040405"/>
    </radialGradient>

    <!-- Warm Orange Ambient Breath -->
    <radialGradient id="c1DotAura" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="#ff4d00" stop-opacity="0.6"/>
      <stop offset="35%" stop-color="#ff4d00" stop-opacity="0.18"/>
      <stop offset="80%" stop-color="#ff4d00" stop-opacity="0.02"/>
      <stop offset="100%" stop-color="#ff4d00" stop-opacity="0"/>
    </radialGradient>

    <!-- White Letterform Gradient (Subtle vertical light falloff) -->
    <linearGradient id="c1LetterGrad" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#ffffff"/>
      <stop offset="70%" stop-color="#f4f4f2"/>
      <stop offset="100%" stop-color="#d6d6d8"/>
    </linearGradient>

    <!-- Orange Dot Shader -->
    <radialGradient id="c1OrangeDot" cx="35%" cy="32%" r="68%">
      <stop offset="0%" stop-color="#ffffff"/>
      <stop offset="22%" stop-color="#ff944d"/>
      <stop offset="65%" stop-color="#ff4d00"/>
      <stop offset="100%" stop-color="#cc2e00"/>
    </radialGradient>

    <!-- Film Grain Filter -->
    <filter id="c1Noise" x="0%" y="0%" width="100%" height="100%">
      <feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="3" stitchTiles="stitch" result="noise"/>
      <feColorMatrix type="saturate" values="0" in="noise" result="gray"/>
      <feComponentTransfer in="gray" result="alphaNoise">
        <feFuncA type="linear" slope="0.048"/>
      </feComponentTransfer>
      <feBlend mode="overlay" in="SourceGraphic" in2="alphaNoise"/>
    </filter>
  </defs>

  <!-- Background Base -->
  <rect width="${SIZE}" height="${SIZE}" fill="url(#c1Bg)"/>

  <!-- WhatsApp Circular Framing Ring (Optical 470px radius) -->
  <circle cx="512" cy="512" r="470" fill="none" stroke="rgba(255,255,255,0.06)" stroke-width="1.5"/>

  <!-- ================= BESPOKE EDITORIAL V· MONOGRAM =================
       Constructed with extreme typographic discipline:
       - Massive 480px cap height
       - Pure Unbounded 900 geometry with optical baseline correction
       - Left arm: heavy 108px stroke
       - Right arm: 108px stroke with 52° cut
       - Signature Dot: exactly 42px diameter, baseline locked
  ====================================================================== -->
  <g transform="translate(0, -28)">
    <!-- Letter V Shadow for physical separation -->
    <path d="M 210,230 L 332,230 L 512,680 L 692,230 L 814,230 L 580,780 L 444,780 Z" 
          fill="#000000" opacity="0.6" filter="blur(32px)"/>

    <!-- The Master V Glyph -->
    <path d="M 210,230 L 332,230 L 512,680 L 692,230 L 814,230 L 580,780 L 444,780 Z" 
          fill="url(#c1LetterGrad)"/>

    <!-- Subtle Edge Refinement on Left Arm (Editorial Depth Highlight) -->
    <line x1="210" y1="230" x2="444" y2="780" stroke="rgba(255,255,255,0.6)" stroke-width="2"/>
    <line x1="332" y1="230" x2="512" y2="680" stroke="rgba(255,255,255,0.4)" stroke-width="1.5"/>

    <!-- ================= SIGNATURE ORANGE DOT ================= -->
    <!-- Volumetric Halo Aura -->
    <circle cx="830" cy="740" r="140" fill="url(#c1DotAura)"/>
    <circle cx="830" cy="740" r="48" fill="#ff4d00" opacity="0.35" filter="blur(16px)"/>

    <!-- The Physical Dot -->
    <circle cx="830" cy="740" r="28" fill="url(#c1OrangeDot)"/>
    <!-- Specular Micro Glint -->
    <circle cx="823" cy="732" r="6" fill="#ffffff" opacity="0.9"/>
  </g>

  <!-- Bottom Technical Stamp (Studio Wordmark) -->
  <g font-family="'JetBrains Mono', monospace" font-size="16" font-weight="600" letter-spacing="0.45em">
    <text x="512" y="930" text-anchor="middle" fill="#8b8b93">VALENCE<tspan fill="#ff4d00">·</tspan>STUDIO</text>
  </g>

  <!-- Noise Texture Layer -->
  <rect width="${SIZE}" height="${SIZE}" fill="#fff" opacity="0.04" filter="url(#c1Noise)"/>
</svg>
`.trim();


// =============================================================================
// CONCEPT 2: ABSTRACT KINETIC ECLIPSE / MONOLITH (КОРОНА & ЗАТМЕНИЕ)
// =============================================================================
const svgConcept2 = /* xml */`
<svg xmlns="http://www.w3.org/2000/svg" width="${SIZE}" height="${SIZE}" viewBox="0 0 ${SIZE} ${SIZE}">
  <defs>
    <!-- Deep Space Blackout -->
    <radialGradient id="c2Space" cx="50%" cy="50%" r="75%">
      <stop offset="0%" stop-color="#120c0a"/>
      <stop offset="45%" stop-color="#070505"/>
      <stop offset="100%" stop-color="#020101"/>
    </radialGradient>

    <!-- Molten Corona Flare Gradient -->
    <radialGradient id="c2CoronaGlow" cx="50%" cy="50%" r="50%">
      <stop offset="70%" stop-color="#ff4d00" stop-opacity="0.8"/>
      <stop offset="85%" stop-color="#ff2200" stop-opacity="0.3"/>
      <stop offset="95%" stop-color="#ff7700" stop-opacity="0.08"/>
      <stop offset="100%" stop-color="#ff4d00" stop-opacity="0"/>
    </radialGradient>

    <!-- Blazing Razor Ring Gradient -->
    <linearGradient id="c2RingGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#ffffff"/>
      <stop offset="15%" stop-color="#ffaa44"/>
      <stop offset="45%" stop-color="#ff4d00"/>
      <stop offset="80%" stop-color="#d62400"/>
      <stop offset="100%" stop-color="#2a0500"/>
    </linearGradient>

    <!-- Obsidian Disc Core Gradient -->
    <radialGradient id="c2ObsidianDisc" cx="45%" cy="40%" r="60%">
      <stop offset="0%" stop-color="#18181f"/>
      <stop offset="60%" stop-color="#0c0c10"/>
      <stop offset="100%" stop-color="#050506"/>
    </radialGradient>

    <!-- Diamond Flare Highlight -->
    <radialGradient id="c2Flare" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="#ffffff"/>
      <stop offset="25%" stop-color="#ffffff" stop-opacity="0.9"/>
      <stop offset="50%" stop-color="#ffaa55" stop-opacity="0.4"/>
      <stop offset="100%" stop-color="#ff4d00" stop-opacity="0"/>
    </radialGradient>
  </defs>

  <!-- Deep Space Canvas -->
  <rect width="${SIZE}" height="${SIZE}" fill="url(#c2Space)"/>

  <!-- ================= VOLUMETRIC CORONA ATMOSPHERE ================= -->
  <circle cx="512" cy="512" r="460" fill="url(#c2CoronaGlow)"/>
  <circle cx="512" cy="512" r="380" fill="#ff4d00" opacity="0.25" filter="blur(50px)"/>

  <!-- ================= THE MONOLITHIC OBSIDIAN DISC ================= -->
  <!-- Deep Drop Shadow -->
  <circle cx="512" cy="512" r="280" fill="#000000" opacity="0.9" filter="blur(30px)"/>

  <!-- Razor-Sharp Molten Corona Ring (Behind Disc) -->
  <circle cx="512" cy="512" r="282" fill="none" stroke="url(#c2RingGrad)" stroke-width="12" filter="blur(2px)"/>
  <circle cx="512" cy="512" r="280" fill="none" stroke="#ffffff" stroke-width="3"/>

  <!-- Solid Obsidian Disc Core -->
  <circle cx="512" cy="512" r="276" fill="url(#c2ObsidianDisc)"/>

  <!-- Inner Debossed Technical V Glyph (Architectural Inset in the Disc) -->
  <path d="M 410,400 L 464,400 L 512,530 L 560,400 L 614,400 L 536,590 L 488,590 Z" 
        fill="#ffffff" opacity="0.08"/>
  <path d="M 410,400 L 464,400 L 512,530 L 560,400 L 614,400 L 536,590 L 488,590 Z" 
        fill="none" stroke="rgba(255,255,255,0.18)" stroke-width="1.5"/>

  <!-- Center Orange Core Node in V Apex -->
  <circle cx="512" cy="624" r="8" fill="#ff4d00" box-shadow="0 0 12px #ff4d00"/>
  <circle cx="512" cy="624" r="3" fill="#ffffff"/>

  <!-- ================= DIAMOND CORONAL FLARE (Top Right) ================= -->
  <!-- An intense celestial diamond flare where light breaks through -->
  <g transform="translate(708, 316)">
    <!-- Giant Starburst Glow -->
    <ellipse cx="0" cy="0" rx="90" ry="90" fill="url(#c2Flare)"/>
    <!-- Cross Diffraction Rays -->
    <line x1="-80" y1="0" x2="80" y2="0" stroke="#ffffff" stroke-width="2.5" opacity="0.95"/>
    <line x1="0" y1="-80" x2="0" y2="80" stroke="#ffffff" stroke-width="2.5" opacity="0.95"/>
    <line x1="-35" y1="-35" x2="35" y2="35" stroke="#ffaa66" stroke-width="1.5" opacity="0.7"/>
    <line x1="-35" y1="35" x2="35" y2="-35" stroke="#ffaa66" stroke-width="1.5" opacity="0.7"/>
    <!-- Intense White Core -->
    <circle cx="0" cy="0" r="10" fill="#ffffff"/>
  </g>

  <!-- Peripheral Technical Orbit Coordinates -->
  <g font-family="'JetBrains Mono', monospace" font-size="13" fill="rgba(255,255,255,0.25)" letter-spacing="0.3em">
    <text x="512" y="88" text-anchor="middle">VALENCE // ECLIPSE</text>
    <text x="512" y="952" text-anchor="middle">WEB PRODUCTION 2026</text>
  </g>
</svg>
`.trim();


// =============================================================================
// CONCEPT 3: CODE & STRUCTURE (КИБЕРНЕТИЧЕСКИЙ ГЛИФ РАЗРАБОТКИ)
// =============================================================================
const svgConcept3 = /* xml */`
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

  <!-- Matrix Micro-Grid Background (Subtle Developer System Aesthetics) -->
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

  <!-- Technical Branding Header / Footer -->
  <g font-family="'JetBrains Mono', monospace" font-size="14" font-weight="600" letter-spacing="0.4em">
    <text x="512" y="98" text-anchor="middle" fill="rgba(255,255,255,0.4)">&lt;VALENCE /&gt;</text>
    <text x="512" y="934" text-anchor="middle" fill="#8b8b93">WEB ENGINEERING</text>
  </g>
</svg>
`.trim();


async function run() {
  console.log('Rendering 3 Master Concepts with 101% Craft (1024x1024 Master PNG)...');

  // 1. Editorial Monogram
  await sharp(Buffer.from(svgConcept1))
    .png({ compressionLevel: 9 })
    .toFile(path.join(__dirname, '../public/concept_1_editorial_monogram.png'));
  console.log('✓ Concept 1: Editorial Monogram saved');

  // 2. Kinetic Eclipse
  await sharp(Buffer.from(svgConcept2))
    .png({ compressionLevel: 9 })
    .toFile(path.join(__dirname, '../public/concept_2_kinetic_eclipse.png'));
  console.log('✓ Concept 2: Kinetic Eclipse saved');

  // 3. Code & Structure
  await sharp(Buffer.from(svgConcept3))
    .png({ compressionLevel: 9 })
    .toFile(path.join(__dirname, '../public/concept_3_code_structure.png'));
  console.log('✓ Concept 3: Code & Structure saved');

  // Default avatar copy
  await sharp(Buffer.from(svgConcept1))
    .png({ compressionLevel: 9 })
    .toFile(path.join(__dirname, '../public/valence-avatar.png'));
  console.log('✓ valence-avatar.png updated');
}

run();
