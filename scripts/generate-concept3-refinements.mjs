/**
 * Valence Concept 3 (Code & Structure) - Volumetric & Deep Shadow Refinements
 * 
 * Takes the winning code-architectural glyph and adds:
 * - Real tactile physical extrusion / beveled depth
 * - Multi-stage deep ambient occlusion & contact drop shadows
 * - Specular edge gleams & brushed titanium chamfers
 * - Recessed glowing terminal diode socket at apex
 */

import sharp from 'sharp';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const SIZE = 1024;

// -----------------------------------------------------------------------------
// 3A: ARCHITECTURAL SLAB & MULTI-STAGE SHADOWS (Сбалансированный объемный слэб)
// -----------------------------------------------------------------------------
const svg3A = /* xml */`
<svg xmlns="http://www.w3.org/2000/svg" width="${SIZE}" height="${SIZE}" viewBox="0 0 ${SIZE} ${SIZE}">
  <defs>
    <!-- Background Canvas -->
    <radialGradient id="bg3A" cx="50%" cy="48%" r="70%">
      <stop offset="0%" stop-color="#141419"/>
      <stop offset="50%" stop-color="#08080a"/>
      <stop offset="100%" stop-color="#020203"/>
    </radialGradient>

    <!-- Ambient Diode Upward Bloom -->
    <radialGradient id="diodeBloom3A" cx="50%" cy="75%" r="45%">
      <stop offset="0%" stop-color="#ff4d00" stop-opacity="0.6"/>
      <stop offset="25%" stop-color="#ff4d00" stop-opacity="0.2"/>
      <stop offset="65%" stop-color="#ff4d00" stop-opacity="0.03"/>
      <stop offset="100%" stop-color="#ff4d00" stop-opacity="0"/>
    </radialGradient>

    <!-- Top Lit Face of V (Slight vertical falloff) -->
    <linearGradient id="vTopFace" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#ffffff"/>
      <stop offset="40%" stop-color="#f2f2f6"/>
      <stop offset="85%" stop-color="#d4d4dc"/>
      <stop offset="100%" stop-color="#babac6"/>
    </linearGradient>

    <!-- Extruded Side Bevel (Left outer extrusion - dark shaded) -->
    <linearGradient id="extLeftOuter" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#1c1c24"/>
      <stop offset="100%" stop-color="#0e0e12"/>
    </linearGradient>

    <!-- Extruded Bottom Cut Bevel (Facing light from orange diode) -->
    <linearGradient id="extBottomBevel" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#2a2a36"/>
      <stop offset="70%" stop-color="#14141a"/>
      <stop offset="100%" stop-color="#ff5511" stop-opacity="0.8"/>
    </linearGradient>

    <!-- Extruded Inner Facet (Dark ambient with subtle orange reflection) -->
    <linearGradient id="extInnerLeft" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#2c2c38"/>
      <stop offset="50%" stop-color="#16161e"/>
      <stop offset="90%" stop-color="#ff4d00" stop-opacity="0.7"/>
      <stop offset="100%" stop-color="#ffffff"/>
    </linearGradient>

    <!-- Laser Diode Core -->
    <linearGradient id="diodeCore" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#ffffff"/>
      <stop offset="20%" stop-color="#ff9d47"/>
      <stop offset="65%" stop-color="#ff4d00"/>
      <stop offset="100%" stop-color="#b82000"/>
    </linearGradient>

    <!-- Film Grain Overlay -->
    <filter id="grain3A">
      <feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="3" stitchTiles="stitch"/>
      <feColorMatrix type="saturate" values="0"/>
      <feComponentTransfer><feFuncA type="linear" slope="0.04"/></feComponentTransfer>
      <feBlend mode="overlay"/>
    </filter>
  </defs>

  <rect width="${SIZE}" height="${SIZE}" fill="url(#bg3A)"/>

  <!-- Matrix Micro-Grid (Developer Engineering Canvas) -->
  <g opacity="0.035" stroke="#ffffff" stroke-width="1">
    <line x1="256" y1="0" x2="256" y2="1024"/>
    <line x1="512" y1="0" x2="512" y2="1024"/>
    <line x1="768" y1="0" x2="768" y2="1024"/>
    <line x1="0" y1="256" x2="1024" y2="256"/>
    <line x1="0" y1="512" x2="1024" y2="512"/>
    <line x1="0" y1="768" x2="1024" y2="768"/>
  </g>

  <!-- Circular Framing Track for WhatsApp -->
  <circle cx="512" cy="512" r="470" fill="none" stroke="rgba(255,255,255,0.06)" stroke-width="1.5" stroke-dasharray="6 8"/>

  <!-- ================= 3D VOLUMETRIC CODE V ================= -->
  <g transform="translate(0, -10)">
    <!-- Upward Diode Volumetric Aura -->
    <circle cx="512" cy="746" r="320" fill="url(#diodeBloom3A)"/>

    <!-- 1. DEEP MULTI-STAGE DROP SHADOWS -->
    <!-- Ambient Wide Floor Shadow -->
    <path d="M 230,280 L 512,770 L 794,280" fill="none" stroke="#000000" stroke-width="140" opacity="0.85" filter="blur(44px)"/>
    <!-- Tight Contact Shadow -->
    <path d="M 236,268 L 512,752 L 788,268" fill="none" stroke="#000000" stroke-width="70" opacity="0.9" filter="blur(16px)"/>

    <!-- 2. EXTRUDED SIDE SLABS (Thickness = 24px downwards & outwards) -->
    <!-- Left Arm Outer Extrusion Slab -->
    <polygon points="236,252 236,276 432,696 432,672" fill="url(#extLeftOuter)"/>
    <!-- Left Arm Inner Extrusion Slab -->
    <polygon points="356,252 356,276 512,696 512,672" fill="url(#extInnerLeft)"/>

    <!-- Right Arm Outer Extrusion Slab -->
    <polygon points="788,252 788,276 592,696 592,672" fill="url(#extLeftOuter)"/>
    <!-- Right Arm Inner Extrusion Slab -->
    <polygon points="668,252 668,276 512,696 512,672" fill="url(#extInnerLeft)"/>

    <!-- Bottom Cut Extrusion Slab -->
    <polygon points="432,672 432,696 592,696 592,672" fill="url(#extBottomBevel)"/>

    <!-- 3. TOP FRONT SLABS (The Pure White/Titanium Lit Faces) -->
    <!-- Left Chevron Arm -->
    <polygon points="236,252 356,252 512,672 432,672" fill="url(#vTopFace)"/>
    <!-- Right Chevron Arm -->
    <polygon points="788,252 668,252 512,672 592,672" fill="url(#vTopFace)"/>

    <!-- 4. RAZOR SPECULAR EDGES & CHAMFERS -->
    <!-- Top Cap Highlight -->
    <line x1="236" y1="252" x2="356" y2="252" stroke="#ffffff" stroke-width="2.5"/>
    <line x1="668" y1="252" x2="788" y2="252" stroke="#ffffff" stroke-width="2.5"/>
    <!-- Left Outer Edge Gleam -->
    <line x1="236" y1="252" x2="432" y2="672" stroke="rgba(255,255,255,0.95)" stroke-width="2"/>
    <!-- Right Outer Edge Gleam -->
    <line x1="788" y1="252" x2="592" y2="672" stroke="rgba(255,255,255,0.95)" stroke-width="2"/>
    <!-- Inner Ridge Lights -->
    <line x1="356" y1="252" x2="512" y2="672" stroke="rgba(255,255,255,0.7)" stroke-width="1.5"/>
    <line x1="668" y1="252" x2="512" y2="672" stroke="rgba(255,255,255,0.7)" stroke-width="1.5"/>

    <!-- 5. CENTRAL INTERACTIVE CODE SLASH "/" (Subtle Dashed Laser) -->
    <line x1="566" y1="290" x2="458" y2="610" stroke="rgba(255,255,255,0.22)" stroke-width="2.5" stroke-dasharray="6 8"/>

    <!-- ================= THE CODE DIODE & CHEVRON CORE ================= -->
    <!-- Recessed Hexagonal Housing Chamber (Dark Metallic Inset) -->
    <polygon points="512,704 554,728 554,776 512,800 470,776 470,728" fill="#0c0c10" stroke="#1f1f28" stroke-width="2"/>

    <!-- Ambient Diode Flare -->
    <circle cx="512" cy="752" r="54" fill="#ff4d00" opacity="0.45" filter="blur(16px)"/>

    <!-- Solid Floating Hexagonal Micro-Chip Diode -->
    <polygon points="512,718 544,736 544,768 512,786 480,768 480,736" fill="url(#diodeCore)"/>
    <!-- Specular Diamond Diode Center -->
    <polygon points="512,746 518,752 512,758 506,752" fill="#ffffff"/>

    <!-- Precision Code Bracket Chevron Wings < > -->
    <g stroke="#ff4d00" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" fill="none">
      <path d="M 444,734 L 420,752 L 444,770"/>
      <path d="M 580,734 L 604,752 L 580,770"/>
    </g>
    <!-- White Specular Tips on Chevron Wings -->
    <circle cx="420" cy="752" r="2.5" fill="#ffffff"/>
    <circle cx="604" cy="752" r="2.5" fill="#ffffff"/>
  </g>

  <!-- Technical Branding Header / Footer -->
  <g font-family="'JetBrains Mono', monospace" font-size="14" font-weight="600" letter-spacing="0.4em">
    <text x="512" y="96" text-anchor="middle" fill="rgba(255,255,255,0.4)">&lt;VALENCE /&gt;</text>
    <text x="512" y="938" text-anchor="middle" fill="#8b8b93">WEB PRODUCTION</text>
  </g>

  <!-- Noise Texture -->
  <rect width="${SIZE}" height="${SIZE}" fill="#fff" opacity="0.035" filter="url(#grain3A)"/>
</svg>
`.trim();


// -----------------------------------------------------------------------------
// 3B: INTERLOCKING CODE BLADES WITH OVERLAPPING SHADOWS (Перекрытие граней)
// Left and right code blades interlock with real overlapping cast shadows.
// -----------------------------------------------------------------------------
const svg3B = /* xml */`
<svg xmlns="http://www.w3.org/2000/svg" width="${SIZE}" height="${SIZE}" viewBox="0 0 ${SIZE} ${SIZE}">
  <defs>
    <radialGradient id="bg3B" cx="50%" cy="50%" r="72%">
      <stop offset="0%" stop-color="#16151a"/>
      <stop offset="50%" stop-color="#08080a"/>
      <stop offset="100%" stop-color="#020202"/>
    </radialGradient>

    <radialGradient id="diodeBloom3B" cx="50%" cy="74%" r="42%">
      <stop offset="0%" stop-color="#ff4d00" stop-opacity="0.65"/>
      <stop offset="25%" stop-color="#ff4d00" stop-opacity="0.22"/>
      <stop offset="60%" stop-color="#ff4d00" stop-opacity="0.03"/>
      <stop offset="100%" stop-color="#ff4d00" stop-opacity="0"/>
    </radialGradient>

    <!-- Foreground Left Blade Gradient -->
    <linearGradient id="bladeLeftFg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#ffffff"/>
      <stop offset="35%" stop-color="#f0f0f6"/>
      <stop offset="75%" stop-color="#c4c4d0"/>
      <stop offset="100%" stop-color="#9090a0"/>
    </linearGradient>

    <!-- Background Right Blade Gradient -->
    <linearGradient id="bladeRightBg" x1="100%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#dedee6"/>
      <stop offset="40%" stop-color="#b0b0be"/>
      <stop offset="80%" stop-color="#6a6a78"/>
      <stop offset="100%" stop-color="#2a2a36"/>
    </linearGradient>

    <radialGradient id="diodeCore3B" cx="35%" cy="30%" r="65%">
      <stop offset="0%" stop-color="#ffffff"/>
      <stop offset="25%" stop-color="#ffa34d"/>
      <stop offset="65%" stop-color="#ff4d00"/>
      <stop offset="100%" stop-color="#a31a00"/>
    </radialGradient>
  </defs>

  <rect width="${SIZE}" height="${SIZE}" fill="url(#bg3B)"/>
  <circle cx="512" cy="740" r="320" fill="url(#diodeBloom3B)"/>

  <!-- Matrix Grid -->
  <g opacity="0.03" stroke="#ffffff" stroke-width="1">
    <line x1="256" y1="0" x2="256" y2="1024"/>
    <line x1="512" y1="0" x2="512" y2="1024"/>
    <line x1="768" y1="0" x2="768" y2="1024"/>
    <line x1="0" y1="256" x2="1024" y2="256"/>
    <line x1="0" y1="512" x2="1024" y2="512"/>
    <line x1="0" y1="768" x2="1024" y2="768"/>
  </g>

  <!-- Framing Circle -->
  <circle cx="512" cy="512" r="468" fill="none" stroke="rgba(255,255,255,0.06)" stroke-width="1.5" stroke-dasharray="4 8"/>

  <g transform="translate(0, -10)">
    <!-- Floor Occlusion Shadow -->
    <path d="M 230,270 L 512,770 L 794,270" fill="none" stroke="#000000" stroke-width="130" opacity="0.9" filter="blur(42px)"/>

    <!-- 1. RIGHT BLADE (Set slightly in background) -->
    <polygon points="788,252 668,252 512,676 592,676" fill="url(#bladeRightBg)"/>
    <line x1="788" y1="252" x2="592" y2="676" stroke="rgba(255,255,255,0.5)" stroke-width="2"/>

    <!-- 2. OVERLAP CAST SHADOW (Left blade casting sharp drop shadow onto Right blade) -->
    <polygon points="512,252 546,252 546,686 512,686" fill="#000000" opacity="0.75" filter="blur(14px)"/>

    <!-- 3. LEFT BLADE (Foreground Layer with crisp chamfers) -->
    <polygon points="236,252 356,252 512,676 432,676" fill="url(#bladeLeftFg)"/>
    <!-- Left Blade Razor Edge Highlight -->
    <line x1="236" y1="252" x2="432" y2="676" stroke="#ffffff" stroke-width="2.5"/>
    <line x1="356" y1="252" x2="512" y2="676" stroke="#ffffff" stroke-width="1.5"/>

    <!-- 4. CODE SLASH -->
    <line x1="564" y1="290" x2="460" y2="610" stroke="rgba(255,255,255,0.3)" stroke-width="2.5" stroke-dasharray="6 8"/>

    <!-- 5. TERMINAL DIODE & BRACKETS -->
    <circle cx="512" cy="746" r="48" fill="#ff4d00" opacity="0.4" filter="blur(18px)"/>
    <!-- Octagonal Microchip Core -->
    <polygon points="512,716 542,728 554,758 536,782 488,782 470,758 482,728" fill="url(#diodeCore3B)"/>
    <circle cx="512" cy="752" r="7" fill="#ffffff"/>

    <!-- Chevron Brackets < / > -->
    <path d="M 440,736 L 416,752 L 440,768" fill="none" stroke="#ff4d00" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M 584,736 L 608,752 L 584,768" fill="none" stroke="#ff4d00" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
  </g>

  <!-- Typography -->
  <g font-family="'JetBrains Mono', monospace" font-size="14" font-weight="600" letter-spacing="0.4em">
    <text x="512" y="96" text-anchor="middle" fill="rgba(255,255,255,0.4)">&lt;VALENCE /&gt;</text>
    <text x="512" y="938" text-anchor="middle" fill="#8b8b93">DEV // PRODUCTION</text>
  </g>
</svg>
`.trim();


// -----------------------------------------------------------------------------
// 3C: HIGH-TECH DARK OBSIDIAN & NEON EMBEDDED GROOVE (Неоновый рельеф)
// Dark monolithic slabs with an intense illuminated orange inner crevasse.
// -----------------------------------------------------------------------------
const svg3C = /* xml */`
<svg xmlns="http://www.w3.org/2000/svg" width="${SIZE}" height="${SIZE}" viewBox="0 0 ${SIZE} ${SIZE}">
  <defs>
    <radialGradient id="bg3C" cx="50%" cy="50%" r="72%">
      <stop offset="0%" stop-color="#181820"/>
      <stop offset="50%" stop-color="#09090c"/>
      <stop offset="100%" stop-color="#020203"/>
    </radialGradient>

    <!-- Titanium Face Gradient -->
    <linearGradient id="titaniumFace" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#ffffff"/>
      <stop offset="30%" stop-color="#e2e2ec"/>
      <stop offset="70%" stop-color="#888898"/>
      <stop offset="100%" stop-color="#444452"/>
    </linearGradient>

    <!-- Intense Upward Slit Light -->
    <linearGradient id="slitGlow" x1="0%" y1="100%" x2="0%" y2="0%">
      <stop offset="0%" stop-color="#ff4d00" stop-opacity="0.9"/>
      <stop offset="50%" stop-color="#ff4d00" stop-opacity="0.4"/>
      <stop offset="100%" stop-color="#ff4d00" stop-opacity="0"/>
    </linearGradient>
  </defs>

  <rect width="${SIZE}" height="${SIZE}" fill="url(#bg3C)"/>

  <circle cx="512" cy="512" r="468" fill="none" stroke="rgba(255,255,255,0.06)" stroke-width="1.5"/>

  <g transform="translate(0, -10)">
    <!-- Deep Heavy Floor Shadow -->
    <path d="M 230,270 L 512,770 L 794,270" fill="none" stroke="#000000" stroke-width="150" opacity="0.9" filter="blur(46px)"/>

    <!-- Slit Backlight Beam -->
    <polygon points="506,260 518,260 514,680 510,680" fill="url(#slitGlow)" filter="blur(8px)"/>

    <!-- Extruded Dark Thickness -->
    <polygon points="236,252 236,280 432,700 432,672" fill="#121218"/>
    <polygon points="788,252 788,280 592,700 592,672" fill="#121218"/>

    <!-- Front Slabs -->
    <polygon points="236,252 356,252 512,672 432,672" fill="url(#titaniumFace)"/>
    <polygon points="788,252 668,252 512,672 592,672" fill="url(#titaniumFace)"/>

    <!-- Highlights -->
    <line x1="236" y1="252" x2="432" y2="672" stroke="#ffffff" stroke-width="2.5"/>
    <line x1="788" y1="252" x2="592" y2="672" stroke="#ffffff" stroke-width="2.5"/>

    <!-- The Diode Node -->
    <circle cx="512" cy="746" r="60" fill="#ff4d00" opacity="0.5" filter="blur(20px)"/>
    <polygon points="512,714 546,734 546,766 512,786 478,766 478,734" fill="#ff4d00"/>
    <circle cx="512" cy="750" r="8" fill="#ffffff"/>

    <path d="M 440,734 L 418,750 L 440,766" fill="none" stroke="#ff4d00" stroke-width="3" stroke-linecap="round"/>
    <path d="M 584,734 L 606,750 L 584,766" fill="none" stroke="#ff4d00" stroke-width="3" stroke-linecap="round"/>
  </g>

  <g font-family="'JetBrains Mono', monospace" font-size="14" font-weight="600" letter-spacing="0.4em">
    <text x="512" y="96" text-anchor="middle" fill="rgba(255,255,255,0.4)">&lt;VALENCE /&gt;</text>
    <text x="512" y="938" text-anchor="middle" fill="#8b8b93">WEB ARCHITECTURE</text>
  </g>
</svg>
`.trim();

async function run() {
  console.log('Rendering Volumetric Concept 3 Refinements (1024x1024 PNG)...');

  await sharp(Buffer.from(svg3A)).png({ compressionLevel: 9 }).toFile(path.join(__dirname, '../public/concept_3a_volumetric_slab.png'));
  console.log('✓ 3A: Volumetric Slab saved');

  await sharp(Buffer.from(svg3B)).png({ compressionLevel: 9 }).toFile(path.join(__dirname, '../public/concept_3b_interlocking_blades.png'));
  console.log('✓ 3B: Interlocking Blades saved');

  await sharp(Buffer.from(svg3C)).png({ compressionLevel: 9 }).toFile(path.join(__dirname, '../public/concept_3c_obsidian_neon.png'));
  console.log('✓ 3C: Obsidian Neon saved');

  // Set 3A as current master avatar
  await sharp(Buffer.from(svg3A)).png({ compressionLevel: 9 }).toFile(path.join(__dirname, '../public/valence-avatar.png'));
  console.log('✓ valence-avatar.png updated with 3A Master');
}

run();
