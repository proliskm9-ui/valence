/**
 * Valence WhatsApp Business Cover Banner Generator (1920x1080 Master)
 * Designed specifically for WhatsApp Business header crop, complementing the avatar.
 */

import sharp from 'sharp';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const W = 1920;
const H = 1080;

// =============================================================================
// BANNER 1: "ARCHITECTURAL MATRIX & CORE DOCK" (Главный мастер-баннер)
// Аватарка встает снизу в центр, а над ней — мощная инженерная композиция
// =============================================================================
const svgBanner1 = /* xml */`
<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">
  <defs>
    <!-- Background Canvas Gradient -->
    <radialGradient id="b1Bg" cx="50%" cy="40%" r="70%">
      <stop offset="0%" stop-color="#14141a"/>
      <stop offset="50%" stop-color="#09090c"/>
      <stop offset="100%" stop-color="#030304"/>
    </radialGradient>

    <!-- Avatar Dock Glow (Soft orange halo directly behind where WhatsApp places the avatar) -->
    <radialGradient id="dockGlow" cx="50%" cy="88%" r="45%">
      <stop offset="0%" stop-color="#ff4d00" stop-opacity="0.45"/>
      <stop offset="35%" stop-color="#ff4d00" stop-opacity="0.14"/>
      <stop offset="75%" stop-color="#ff4d00" stop-opacity="0.02"/>
      <stop offset="100%" stop-color="#ff4d00" stop-opacity="0"/>
    </radialGradient>

    <!-- Upper Horizon Laser Line Gradient -->
    <linearGradient id="laserGrad" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#ff4d00" stop-opacity="0"/>
      <stop offset="30%" stop-color="#ff4d00" stop-opacity="0.8"/>
      <stop offset="50%" stop-color="#ffffff"/>
      <stop offset="70%" stop-color="#ff4d00" stop-opacity="0.8"/>
      <stop offset="100%" stop-color="#ff4d00" stop-opacity="0"/>
    </linearGradient>

    <!-- Film Grain -->
    <filter id="bannerGrain">
      <feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves="3" stitchTiles="stitch"/>
      <feColorMatrix type="saturate" values="0"/>
      <feComponentTransfer><feFuncA type="linear" slope="0.035"/></feComponentTransfer>
      <feBlend mode="overlay"/>
    </filter>
  </defs>

  <rect width="${W}" height="${H}" fill="url(#b1Bg)"/>

  <!-- Avatar Docking Atmosphere (Centered at bottom) -->
  <rect width="${W}" height="${H}" fill="url(#dockGlow)"/>

  <!-- ================= DEVELOPER MATRIX GRID ================= -->
  <g opacity="0.04" stroke="#ffffff" stroke-width="1.5">
    <line x1="240" y1="0" x2="240" y2="${H}"/>
    <line x1="480" y1="0" x2="480" y2="${H}"/>
    <line x1="720" y1="0" x2="720" y2="${H}"/>
    <line x1="960" y1="0" x2="960" y2="${H}"/>
    <line x1="1200" y1="0" x2="1200" y2="${H}"/>
    <line x1="1440" y1="0" x2="1440" y2="${H}"/>
    <line x1="1680" y1="0" x2="1680" y2="${H}"/>
    
    <line x1="0" y1="180" x2="${W}" y2="180"/>
    <line x1="0" y1="360" x2="${W}" y2="360"/>
    <line x1="0" y1="540" x2="${W}" y2="540"/>
    <line x1="0" y1="720" x2="${W}" y2="720"/>
    <line x1="0" y1="900" x2="${W}" y2="900"/>
  </g>

  <!-- Technical Calibration Border Reticle -->
  <rect x="80" y="80" width="${W - 160}" height="${H - 160}" fill="none" stroke="rgba(255,255,255,0.06)" stroke-width="1"/>
  <rect x="96" y="96" width="${W - 192}" height="${H - 192}" fill="none" stroke="rgba(255,255,255,0.03)" stroke-width="1" stroke-dasharray="8 12"/>

  <!-- Corner Calibration Marks -->
  <g stroke="rgba(255,255,255,0.3)" stroke-width="1.5">
    <path d="M 80,120 L 80,80 L 120,80"/>
    <path d="M ${W - 80},120 L ${W - 80},80 L ${W - 120},80"/>
    <path d="M 80,${H - 120} L 80,${H - 80} L 120,${H - 80}"/>
    <path d="M ${W - 80},${H - 120} L ${W - 80},${H - 80} L ${W - 120},${H - 80}"/>
  </g>

  <!-- ================= TOP HEADER / BRAND IDENTITY ================= -->
  <!-- Top Left: Studio Branding -->
  <g font-family="'JetBrains Mono', monospace">
    <text x="140" y="150" font-size="16" fill="rgba(255,255,255,0.4)" letter-spacing="0.3em">&lt;VALENCE // WEB PRODUCTION /&gt;</text>
    <text x="140" y="186" font-size="13" fill="#ff4d00" letter-spacing="0.25em">● SYSTEM ONLINE // DEV.01</text>
  </g>

  <!-- Top Right: Specifications -->
  <g font-family="'JetBrains Mono', monospace" font-size="14" fill="rgba(255,255,255,0.3)" letter-spacing="0.25em" text-anchor="end">
    <text x="${W - 140}" y="150">FULLSTACK &amp; HIGH-LOAD</text>
    <text x="${W - 140}" y="186">NEXT.JS • REACT • CLOUD</text>
  </g>

  <!-- ================= MAIN CENTER STATEMENT ================= -->
  <g text-anchor="middle">
    <!-- Huge Watermark Brand Logo (Semi-transparent background depth) -->
    <text x="960" y="440" font-family="'Unbounded', sans-serif" font-size="140" font-weight="900" fill="rgba(255,255,255,0.03)" letter-spacing="-0.04em">VALENCE·</text>

    <!-- Main Clean Headline -->
    <text x="960" y="380" font-family="'Unbounded', sans-serif" font-size="56" font-weight="900" fill="#f4f4f2" letter-spacing="-0.02em">
      WE BUILD DIGITAL SYSTEMS THAT SCALE<tspan fill="#ff4d00">.</tspan>
    </text>

    <!-- Laser Horizontal Accent Line with Center Diode -->
    <line x1="360" y1="430" x2="1560" y2="430" stroke="url(#laserGrad)" stroke-width="2"/>
    <polygon points="960,422 968,430 960,438 952,430" fill="#ffffff"/>
    <circle cx="960" cy="430" r="14" fill="#ff4d00" opacity="0.4" filter="blur(6px)"/>

    <!-- Subtitle Description -->
    <text x="960" y="490" font-family="'JetBrains Mono', monospace" font-size="16" fill="#8b8b93" letter-spacing="0.3em">
      САЙТЫ • АВТОМАТИЗАЦИЯ • ВЕБ-СЕРВИСЫ ДЛЯ БИЗНЕСА
    </text>
  </g>

  <!-- ================= BOTTOM DOCK ALIGNMENT RINGS =================
       (These concentric tech rings frame behind the circular avatar in WhatsApp)
  ================================================================== -->
  <g stroke="rgba(255,255,255,0.08)" fill="none" stroke-width="1.5">
    <circle cx="960" cy="980" r="320" stroke-dasharray="6 8"/>
    <circle cx="960" cy="980" r="240" stroke="rgba(255,77,0,0.2)" stroke-width="1.5" stroke-dasharray="4 6"/>
    <circle cx="960" cy="980" r="170" stroke="rgba(255,255,255,0.15)"/>
  </g>

  <!-- Bottom Left / Right Specs -->
  <g font-family="'JetBrains Mono', monospace" font-size="14" fill="rgba(255,255,255,0.25)" letter-spacing="0.25em">
    <text x="140" y="${H - 140}">LOCATION: 43.19°N</text>
    <text x="140" y="${H - 110}">EST. 2026 // PRODUCTION</text>

    <text x="${W - 140}" y="${H - 140}" text-anchor="end">STATUS: AVAILABLE FOR NEW CLIENTS</text>
    <text x="${W - 140}" y="${H - 110}" text-anchor="end" fill="#ff4d00">TELEGRAM: @valencedigital</text>
  </g>

  <!-- Noise Overlay -->
  <rect width="${W}" height="${H}" fill="#fff" opacity="0.03" filter="url(#bannerGrain)"/>
</svg>
`.trim();


// =============================================================================
// BANNER 2: "MINIMALIST OBSIDIAN & LASER HORIZON" (Строгий лаконичный премиум)
// =============================================================================
const svgBanner2 = /* xml */`
<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">
  <defs>
    <radialGradient id="b2Bg" cx="50%" cy="40%" r="70%">
      <stop offset="0%" stop-color="#121217"/>
      <stop offset="50%" stop-color="#08080a"/>
      <stop offset="100%" stop-color="#020203"/>
    </radialGradient>

    <linearGradient id="horizonGlow" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#ff4d00" stop-opacity="0.8"/>
      <stop offset="100%" stop-color="#ff4d00" stop-opacity="0"/>
    </linearGradient>
  </defs>

  <rect width="${W}" height="${H}" fill="url(#b2Bg)"/>

  <!-- Matrix Background -->
  <g opacity="0.03" stroke="#ffffff" stroke-width="1">
    <line x1="480" y1="0" x2="480" y2="${H}"/>
    <line x1="960" y1="0" x2="960" y2="${H}"/>
    <line x1="1440" y1="0" x2="1440" y2="${H}"/>
    <line x1="0" y1="360" x2="${W}" y2="360"/>
    <line x1="0" y1="720" x2="${W}" y2="720"/>
  </g>

  <!-- Center Monolithic Typography -->
  <g text-anchor="middle">
    <text x="960" y="340" font-family="'JetBrains Mono', monospace" font-size="16" font-weight="600" fill="#ff4d00" letter-spacing="0.45em">
      [ HIGH-PERFORMANCE WEB DEVELOPMENT ]
    </text>
    
    <text x="960" y="440" font-family="'Unbounded', sans-serif" font-size="76" font-weight="900" fill="#f4f4f2" letter-spacing="-0.03em">
      VALENCE<tspan fill="#ff4d00">·</tspan>STUDIO
    </text>

    <text x="960" y="510" font-family="'JetBrains Mono', monospace" font-size="18" fill="#8b8b93" letter-spacing="0.3em">
      РАЗРАБОТКА САЙТОВ • СЕРВИСЫ • АВТОМАТИЗАЦИИ
    </text>
  </g>

  <!-- Bottom Avatar Aura Halo -->
  <circle cx="960" cy="980" r="300" fill="#ff4d00" opacity="0.15" filter="blur(60px)"/>
  <circle cx="960" cy="980" r="180" fill="none" stroke="rgba(255,77,0,0.4)" stroke-width="1.5" stroke-dasharray="4 8"/>
</svg>
`.trim();


// =============================================================================
// BANNER 3: "CYBER MATRIX & CODE TERMINAL" (Технологичный код и терминал)
// =============================================================================
const svgBanner3 = /* xml */`
<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">
  <defs>
    <radialGradient id="b3Bg" cx="50%" cy="40%" r="70%">
      <stop offset="0%" stop-color="#101015"/>
      <stop offset="50%" stop-color="#070709"/>
      <stop offset="100%" stop-color="#020202"/>
    </radialGradient>
  </defs>

  <rect width="${W}" height="${H}" fill="url(#b3Bg)"/>

  <!-- Code Snippets Watermark on Left & Right -->
  <g font-family="'JetBrains Mono', monospace" font-size="13" fill="rgba(255,255,255,0.06)" letter-spacing="0.1em">
    <text x="120" y="240">import { createClient } from '@valence/core';</text>
    <text x="120" y="280">const app = new WebEngine({ architecture: 'next-15' });</text>
    <text x="120" y="320">export async function generateStaticParams() { ... }</text>
    <text x="120" y="360">const runtime = 'edge'; // ultra low latency</text>

    <text x="${W - 120}" y="240" text-anchor="end">&lt;PerformanceEngine loadTime="0.2s" /&gt;</text>
    <text x="${W - 120}" y="280" text-anchor="end">status: 200 OK • cache: HIT • edge: global</text>
    <text x="${W - 120}" y="320" text-anchor="end">deploy: production // verified</text>
    <text x="${W - 120}" y="360" text-anchor="end">© 2026 Valence Studio. All rights reserved.</text>
  </g>

  <!-- Center Master Title -->
  <g text-anchor="middle">
    <text x="960" y="360" font-family="'JetBrains Mono', monospace" font-size="16" fill="rgba(255,255,255,0.4)" letter-spacing="0.4em">
      &lt;VALENCE_WEB_ARCHITECTURE /&gt;
    </text>

    <text x="960" y="450" font-family="'Unbounded', sans-serif" font-size="64" font-weight="900" fill="#f4f4f2" letter-spacing="-0.03em">
      ПРОЕКТИРУЕМ И ПИШЕМ САЙТЫ<tspan fill="#ff4d00">.</tspan>
    </text>

    <text x="960" y="520" font-family="'JetBrains Mono', monospace" font-size="16" fill="#ff4d00" letter-spacing="0.35em">
      ОТ ПЕРВОГО ЭКРАНА ДО ЗАЯВКИ
    </text>
  </g>

  <!-- Bottom Avatar Glow -->
  <circle cx="960" cy="980" r="280" fill="#ff4d00" opacity="0.18" filter="blur(50px)"/>
</svg>
`.trim();


async function run() {
  console.log('Rendering WhatsApp Business Banners (1920x1080 Master PNG)...');

  // Master Banner 1
  await sharp(Buffer.from(svgBanner1))
    .png({ compressionLevel: 9 })
    .toFile(path.join(__dirname, '../public/whatsapp_banner_master.png'));
  console.log('✓ Banner 1 (Master Architectural Grid) saved');

  // Master Banner 2
  await sharp(Buffer.from(svgBanner2))
    .png({ compressionLevel: 9 })
    .toFile(path.join(__dirname, '../public/whatsapp_banner_minimal.png'));
  console.log('✓ Banner 2 (Minimalist Studio) saved');

  // Master Banner 3
  await sharp(Buffer.from(svgBanner3))
    .png({ compressionLevel: 9 })
    .toFile(path.join(__dirname, '../public/whatsapp_banner_code_engine.png'));
  console.log('✓ Banner 3 (Code Terminal) saved');
}

run();
