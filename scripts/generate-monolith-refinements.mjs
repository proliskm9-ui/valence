/**
 * Valence Monolith Evolutions (Refining Concept 1)
 * Eliminates the detached side dot. Integrates the #ff4d00 accent directly into the sculpture anatomy.
 */

import sharp from 'sharp';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const SIZE = 1024;

// -----------------------------------------------------------------------------
// VARIATION 1A: "APEX FUSION PRISM"
// The orange accent is embedded directly inside the bottom vertex of the V
// as a glowing hyper-faceted prism casting volumetric light up the inner facets.
// -----------------------------------------------------------------------------
const svg1A = /* xml */`
<svg xmlns="http://www.w3.org/2000/svg" width="${SIZE}" height="${SIZE}" viewBox="0 0 ${SIZE} ${SIZE}">
  <defs>
    <!-- Background Vignette -->
    <radialGradient id="bgGlow" cx="50%" cy="50%" r="70%">
      <stop offset="0%" stop-color="#141418"/>
      <stop offset="45%" stop-color="#09090b"/>
      <stop offset="100%" stop-color="#020203"/>
    </radialGradient>

    <!-- Upward Volumetric Apex Glow -->
    <radialGradient id="apexGlow" cx="50%" cy="78%" r="48%">
      <stop offset="0%" stop-color="#ff4d00" stop-opacity="0.55"/>
      <stop offset="25%" stop-color="#ff4d00" stop-opacity="0.2"/>
      <stop offset="65%" stop-color="#ff4d00" stop-opacity="0.03"/>
      <stop offset="100%" stop-color="#ff4d00" stop-opacity="0"/>
    </radialGradient>

    <!-- Outer Chrome Left Gradient -->
    <linearGradient id="chLeftOuter" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#ffffff"/>
      <stop offset="12%" stop-color="#e2e2ea"/>
      <stop offset="45%" stop-color="#727280"/>
      <stop offset="80%" stop-color="#24242c"/>
      <stop offset="100%" stop-color="#0d0d12"/>
    </linearGradient>

    <!-- Inner Smoked Left Facet with Orange Reflection near base -->
    <linearGradient id="chLeftInner" x1="100%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#30303c"/>
      <stop offset="40%" stop-color="#181820"/>
      <stop offset="75%" stop-color="#101015"/>
      <stop offset="95%" stop-color="#ff5511" stop-opacity="0.9"/>
      <stop offset="100%" stop-color="#ffffff"/>
    </linearGradient>

    <!-- Outer Chrome Right Gradient -->
    <linearGradient id="chRightOuter" x1="100%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#ffffff"/>
      <stop offset="18%" stop-color="#d4d4dc"/>
      <stop offset="50%" stop-color="#585866"/>
      <stop offset="82%" stop-color="#1c1c24"/>
      <stop offset="100%" stop-color="#0b0b10"/>
    </linearGradient>

    <!-- Inner Smoked Right Facet with Orange Reflection -->
    <linearGradient id="chRightInner" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#383848"/>
      <stop offset="45%" stop-color="#1e1e28"/>
      <stop offset="75%" stop-color="#101015"/>
      <stop offset="95%" stop-color="#ff5511" stop-opacity="0.9"/>
      <stop offset="100%" stop-color="#ffffff"/>
    </linearGradient>

    <!-- Bevel Top Edge -->
    <linearGradient id="bevelEdge" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#ffffff"/>
      <stop offset="50%" stop-color="#a0a0b0"/>
      <stop offset="100%" stop-color="#ffffff"/>
    </linearGradient>

    <!-- Apex Ruby/Amber Prism -->
    <linearGradient id="apexPrism" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#ffffff"/>
      <stop offset="25%" stop-color="#ff8c3b"/>
      <stop offset="70%" stop-color="#ff4d00"/>
      <stop offset="100%" stop-color="#991c00"/>
    </linearGradient>
  </defs>

  <!-- Background Layer -->
  <rect width="${SIZE}" height="${SIZE}" fill="url(#bgGlow)"/>
  <rect width="${SIZE}" height="${SIZE}" fill="url(#apexGlow)"/>

  <!-- Minimalist Aesthetic Focus Circle for WhatsApp Fit -->
  <circle cx="512" cy="512" r="460" fill="none" stroke="rgba(255,255,255,0.05)" stroke-width="1.5" stroke-dasharray="6 8"/>

  <!-- Subtle Studio Technical Data -->
  <g font-family="'JetBrains Mono', monospace" font-size="13" fill="rgba(255,255,255,0.25)" letter-spacing="0.25em">
    <text x="512" y="88" text-anchor="middle">VALENCE // APEX.01</text>
    <text x="512" y="952" text-anchor="middle" letter-spacing="0.35em">DESIGN STUDIO</text>
  </g>

  <!-- 3D Monolith Structure (Centered and Symmetrical) -->
  <g transform="translate(0, 8)">
    <!-- Ambient Shadow -->
    <path d="M 184 210 L 512 790 L 840 210" fill="none" stroke="#000" stroke-width="110" opacity="0.75" filter="blur(40px)"/>

    <!-- Left Outer Chrome Blade -->
    <polygon points="184,210 334,210 512,776 438,776" fill="url(#chLeftOuter)"/>

    <!-- Left Inner Dark Titanium Facet -->
    <polygon points="334,210 404,210 512,746 512,776" fill="url(#chLeftInner)"/>

    <!-- Right Inner Dark Titanium Facet -->
    <polygon points="690,210 620,210 512,746 512,776" fill="url(#chRightInner)"/>

    <!-- Right Outer Chrome Blade -->
    <polygon points="840,210 690,210 512,776 586,776" fill="url(#chRightOuter)"/>

    <!-- Top Cap Bevels -->
    <polygon points="184,206 334,206 334,214 184,214" fill="url(#bevelEdge)"/>
    <polygon points="690,206 840,206 840,214 690,214" fill="url(#bevelEdge)"/>

    <!-- Central Razor Knife Edges -->
    <line x1="334" y1="210" x2="512" y2="776" stroke="rgba(255,255,255,0.9)" stroke-width="2.5"/>
    <line x1="690" y1="210" x2="512" y2="776" stroke="rgba(255,255,255,0.9)" stroke-width="2.5"/>
    <line x1="184" y1="210" x2="438" y2="776" stroke="rgba(255,255,255,0.35)" stroke-width="1.5"/>
    <line x1="840" y1="210" x2="586" y2="776" stroke="rgba(255,255,255,0.35)" stroke-width="1.5"/>

    <!-- ================= INTEGRATED APEX HYPER-PRISM ================= -->
    <!-- Volumetric Flare from Apex -->
    <ellipse cx="512" cy="800" rx="90" ry="40" fill="#ff4d00" opacity="0.6" filter="blur(20px)"/>
    <circle cx="512" cy="790" r="18" fill="#ffffff" filter="blur(6px)"/>

    <!-- Diamond Faceted Bottom Anchor (The brand signature dot evolved into a 3D keystone) -->
    <polygon points="438,776 586,776 512,836" fill="url(#apexPrism)"/>
    <polygon points="438,776 512,776 512,836" fill="#ff7722" opacity="0.6"/>
    <polygon points="512,776 586,776 512,836" fill="#cc3300" opacity="0.6"/>

    <!-- Razor Bevel Rim on the Keystone -->
    <line x1="438" y1="776" x2="586" y2="776" stroke="#ffffff" stroke-width="2.5"/>
    <line x1="438" y1="776" x2="512" y2="836" stroke="#ffa366" stroke-width="1.5"/>
    <line x1="586" y1="776" x2="512" y2="836" stroke="#ffa366" stroke-width="1.5"/>

    <!-- Hotspot Specular Point -->
    <circle cx="512" cy="780" r="4" fill="#ffffff"/>
  </g>
</svg>
`.trim();


// -----------------------------------------------------------------------------
// VARIATION 1B: "NEON SEAM / FUSION CORE"
// The inner crevasse of the V splits open into an intense razor-sharp laser seam,
// casting internal caustics between the two dark titanium monolithic wings.
// -----------------------------------------------------------------------------
const svg1B = /* xml */`
<svg xmlns="http://www.w3.org/2000/svg" width="${SIZE}" height="${SIZE}" viewBox="0 0 ${SIZE} ${SIZE}">
  <defs>
    <radialGradient id="bgGlow1B" cx="50%" cy="50%" r="75%">
      <stop offset="0%" stop-color="#161414"/>
      <stop offset="40%" stop-color="#0a0808"/>
      <stop offset="100%" stop-color="#020202"/>
    </radialGradient>

    <!-- Deep Ambient Orange Core Backlight -->
    <radialGradient id="coreBacklight" cx="50%" cy="50%" r="45%">
      <stop offset="0%" stop-color="#ff4d00" stop-opacity="0.4"/>
      <stop offset="35%" stop-color="#ff4d00" stop-opacity="0.12"/>
      <stop offset="100%" stop-color="#ff4d00" stop-opacity="0"/>
    </radialGradient>

    <!-- Monolithic Left Arm (Dark Brushed Metal) -->
    <linearGradient id="armLeft" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#ffffff"/>
      <stop offset="15%" stop-color="#d6d6e0"/>
      <stop offset="50%" stop-color="#555562"/>
      <stop offset="85%" stop-color="#181820"/>
      <stop offset="100%" stop-color="#0a0a0e"/>
    </linearGradient>

    <!-- Monolithic Right Arm -->
    <linearGradient id="armRight" x1="100%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#ffffff"/>
      <stop offset="15%" stop-color="#d6d6e0"/>
      <stop offset="50%" stop-color="#555562"/>
      <stop offset="85%" stop-color="#181820"/>
      <stop offset="100%" stop-color="#0a0a0e"/>
    </linearGradient>

    <!-- Intense Laser Seam Gradient -->
    <linearGradient id="laserSeam" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#ffffff"/>
      <stop offset="30%" stop-color="#ff9944"/>
      <stop offset="80%" stop-color="#ff4d00"/>
      <stop offset="100%" stop-color="#ff2200"/>
    </linearGradient>
  </defs>

  <rect width="${SIZE}" height="${SIZE}" fill="url(#bgGlow1B)"/>
  <rect width="${SIZE}" height="${SIZE}" fill="url(#coreBacklight)"/>

  <!-- Concentric Orbital Grid -->
  <circle cx="512" cy="512" r="455" fill="none" stroke="rgba(255,255,255,0.06)" stroke-width="1.5"/>
  <circle cx="512" cy="512" r="360" fill="none" stroke="rgba(255,77,0,0.08)" stroke-width="1" stroke-dasharray="4 6"/>

  <g transform="translate(0, 0)">
    <!-- Internal Laser Light Beam (behind wings) -->
    <polygon points="492,200 532,200 522,780 502,780" fill="#ff4d00" opacity="0.8" filter="blur(14px)"/>

    <!-- Left Wing (Faceted Blade) -->
    <polygon points="190,210 370,210 496,770 420,770" fill="url(#armLeft)"/>
    <polygon points="370,210 440,210 504,770 496,770" fill="#121218"/>

    <!-- Right Wing (Faceted Blade) -->
    <polygon points="834,210 654,210 528,770 604,770" fill="url(#armRight)"/>
    <polygon points="654,210 584,210 520,770 528,770" fill="#121218"/>

    <!-- Central Fusion Laser Seam (Direct Center Channel) -->
    <line x1="512" y1="210" x2="512" y2="786" stroke="url(#laserSeam)" stroke-width="6"/>
    <line x1="512" y1="210" x2="512" y2="786" stroke="#ffffff" stroke-width="2"/>

    <!-- Top Cap Bevels -->
    <polygon points="190,206 370,206 370,212 190,212" fill="#ffffff" opacity="0.9"/>
    <polygon points="654,206 834,206 834,212 654,212" fill="#ffffff" opacity="0.9"/>

    <!-- Specular Blade Ridges -->
    <line x1="370" y1="210" x2="496" y2="770" stroke="rgba(255,255,255,0.9)" stroke-width="2.5"/>
    <line x1="654" y1="210" x2="528" y2="770" stroke="rgba(255,255,255,0.9)" stroke-width="2.5"/>

    <!-- Bottom Fusion Node -->
    <circle cx="512" cy="786" r="30" fill="#ff4d00" opacity="0.5" filter="blur(12px)"/>
    <circle cx="512" cy="786" r="10" fill="#ffffff"/>
    <circle cx="512" cy="786" r="6" fill="#ff4d00"/>
  </g>

  <!-- Technical Identity -->
  <text x="512" y="930" text-anchor="middle" font-family="'JetBrains Mono', monospace" font-size="14" fill="rgba(255,255,255,0.3)" letter-spacing="0.3em">VALENCE·DIGITAL</text>
</svg>
`.trim();


// -----------------------------------------------------------------------------
// VARIATION 1C: "PURE SCULPTURAL OBSIDIAN & OPTICAL FLOATING EMBER"
// Ultra-pure, heavy architectural geometry with an elevated glowing ember
// hovering harmoniously inside the optical center of the V.
// -----------------------------------------------------------------------------
const svg1C = /* xml */`
<svg xmlns="http://www.w3.org/2000/svg" width="${SIZE}" height="${SIZE}" viewBox="0 0 ${SIZE} ${SIZE}">
  <defs>
    <radialGradient id="bgGlow1C" cx="50%" cy="50%" r="70%">
      <stop offset="0%" stop-color="#15151b"/>
      <stop offset="45%" stop-color="#08080a"/>
      <stop offset="100%" stop-color="#020203"/>
    </radialGradient>

    <!-- Center Floating Ember Radial Glow -->
    <radialGradient id="centerEmberGlow" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="#ff4d00" stop-opacity="0.6"/>
      <stop offset="35%" stop-color="#ff4d00" stop-opacity="0.18"/>
      <stop offset="80%" stop-color="#ff4d00" stop-opacity="0.02"/>
      <stop offset="100%" stop-color="#ff4d00" stop-opacity="0"/>
    </radialGradient>

    <!-- Left Wing -->
    <linearGradient id="chLeft1C" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#ffffff"/>
      <stop offset="14%" stop-color="#dedee6"/>
      <stop offset="50%" stop-color="#606070"/>
      <stop offset="85%" stop-color="#1e1e26"/>
      <stop offset="100%" stop-color="#0b0b10"/>
    </linearGradient>

    <!-- Right Wing -->
    <linearGradient id="chRight1C" x1="100%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#ffffff"/>
      <stop offset="14%" stop-color="#dedee6"/>
      <stop offset="50%" stop-color="#606070"/>
      <stop offset="85%" stop-color="#1e1e26"/>
      <stop offset="100%" stop-color="#0b0b10"/>
    </linearGradient>

    <!-- Core Floating Gem Orb -->
    <radialGradient id="gemOrb" cx="35%" cy="30%" r="65%">
      <stop offset="0%" stop-color="#ffffff"/>
      <stop offset="20%" stop-color="#ffaa55"/>
      <stop offset="60%" stop-color="#ff4d00"/>
      <stop offset="100%" stop-color="#801500"/>
    </radialGradient>
  </defs>

  <rect width="${SIZE}" height="${SIZE}" fill="url(#bgGlow1C)"/>

  <!-- Geometric Alignment Circles for Center Ember -->
  <circle cx="512" cy="460" r="160" fill="url(#centerEmberGlow)"/>
  <circle cx="512" cy="460" r="88" fill="none" stroke="rgba(255,77,0,0.3)" stroke-width="1.5" stroke-dasharray="3 4"/>
  <circle cx="512" cy="460" r="120" fill="none" stroke="rgba(255,255,255,0.06)" stroke-width="1"/>

  <!-- Monolith V Sculpture -->
  <g transform="translate(0, 10)">
    <!-- Shadow -->
    <path d="M 180 220 L 512 800 L 844 220" fill="none" stroke="#000" stroke-width="120" opacity="0.8" filter="blur(40px)"/>

    <!-- Left Outer Blade -->
    <polygon points="180,220 336,220 512,790 436,790" fill="url(#chLeft1C)"/>
    <!-- Left Inner Dark Facet -->
    <polygon points="336,220 410,220 512,760 512,790" fill="#101016"/>

    <!-- Right Inner Dark Facet -->
    <polygon points="688,220 614,220 512,760 512,790" fill="#101016"/>
    <!-- Right Outer Blade -->
    <polygon points="844,220 688,220 512,790 588,790" fill="url(#chRight1C)"/>

    <!-- Top Cap Razor Bevels -->
    <polygon points="180,216 336,216 336,223 180,223" fill="#ffffff"/>
    <polygon points="688,216 844,216 844,223 688,223" fill="#ffffff"/>

    <!-- Razor Highlights -->
    <line x1="336" y1="220" x2="512" y2="790" stroke="rgba(255,255,255,0.95)" stroke-width="2.5"/>
    <line x1="688" y1="220" x2="512" y2="790" stroke="rgba(255,255,255,0.95)" stroke-width="2.5"/>

    <!-- Bottom Wedge Cut -->
    <polygon points="436,790 588,790 512,824" fill="#181822"/>
    <line x1="436" y1="790" x2="588" y2="790" stroke="#ffffff" stroke-width="2"/>

    <!-- ================= FLOATING CORE EMBER (AT OPTICAL FOCAL POINT) ================= -->
    <g transform="translate(0, 0)">
      <!-- Soft Volumetric Flare -->
      <circle cx="512" cy="460" r="45" fill="#ff4d00" opacity="0.4" filter="blur(16px)"/>
      <!-- Outer Precision Reticle -->
      <line x1="512" y1="410" x2="512" y2="430" stroke="#ff4d00" stroke-width="1.5"/>
      <line x1="512" y1="490" x2="512" y2="510" stroke="#ff4d00" stroke-width="1.5"/>
      <line x1="462" y1="460" x2="482" y2="460" stroke="#ff4d00" stroke-width="1.5"/>
      <line x1="542" y1="460" x2="562" y2="460" stroke="#ff4d00" stroke-width="1.5"/>

      <!-- Solid Glowing Optical Ember -->
      <circle cx="512" cy="460" r="24" fill="url(#gemOrb)"/>
      <circle cx="506" cy="454" r="6" fill="#ffffff" opacity="0.95"/>
    </g>
  </g>

  <!-- Technical Branding Footer -->
  <text x="512" y="936" text-anchor="middle" font-family="'JetBrains Mono', monospace" font-size="13" fill="rgba(255,255,255,0.25)" letter-spacing="0.3em">VALENCE // CORE</text>
</svg>
`.trim();

async function run() {
  console.log('Rendering Monolith Refinements (1024x1024 Master PNG)...');

  await sharp(Buffer.from(svg1A)).png({ compressionLevel: 9 }).toFile(path.join(__dirname, '../public/avatar_monolith_1a_apex.png'));
  console.log('✓ 1A: Apex Fusion Prism saved');

  await sharp(Buffer.from(svg1B)).png({ compressionLevel: 9 }).toFile(path.join(__dirname, '../public/avatar_monolith_1b_seam.png'));
  console.log('✓ 1B: Neon Seam Fusion saved');

  await sharp(Buffer.from(svg1C)).png({ compressionLevel: 9 }).toFile(path.join(__dirname, '../public/avatar_monolith_1c_floating.png'));
  console.log('✓ 1C: Optical Floating Ember saved');
}

run();
