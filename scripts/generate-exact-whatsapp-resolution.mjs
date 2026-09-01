/**
 * Generates WhatsApp Business Banner in EXACT 1920x1020 resolution (and multiples)
 * as explicitly requested by WhatsApp Desktop client validator.
 */

import sharp from 'sharp';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const W = 1920;
const H = 1020; // Exact height requested by WhatsApp!

const svg1920x1020 = /* xml */`
<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">
  <defs>
    <!-- Background Canvas Gradient -->
    <radialGradient id="b1Bg" cx="50%" cy="40%" r="70%">
      <stop offset="0%" stop-color="#14141a"/>
      <stop offset="50%" stop-color="#09090c"/>
      <stop offset="100%" stop-color="#030304"/>
    </radialGradient>

    <!-- Avatar Dock Glow -->
    <radialGradient id="dockGlow" cx="50%" cy="88%" r="45%">
      <stop offset="0%" stop-color="#ff4d00" stop-opacity="0.45"/>
      <stop offset="35%" stop-color="#ff4d00" stop-opacity="0.14"/>
      <stop offset="75%" stop-color="#ff4d00" stop-opacity="0.02"/>
      <stop offset="100%" stop-color="#ff4d00" stop-opacity="0"/>
    </radialGradient>

    <!-- Laser Line Gradient -->
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
  <rect width="${W}" height="${H}" fill="url(#dockGlow)"/>

  <!-- Matrix Grid -->
  <g opacity="0.04" stroke="#ffffff" stroke-width="1.5">
    <line x1="240" y1="0" x2="240" y2="${H}"/>
    <line x1="480" y1="0" x2="480" y2="${H}"/>
    <line x1="720" y1="0" x2="720" y2="${H}"/>
    <line x1="960" y1="0" x2="960" y2="${H}"/>
    <line x1="1200" y1="0" x2="1200" y2="${H}"/>
    <line x1="1440" y1="0" x2="1440" y2="${H}"/>
    <line x1="1680" y1="0" x2="1680" y2="${H}"/>
    
    <line x1="0" y1="170" x2="${W}" y2="170"/>
    <line x1="0" y1="340" x2="${W}" y2="340"/>
    <line x1="0" y1="510" x2="${W}" y2="510"/>
    <line x1="0" y1="680" x2="${W}" y2="680"/>
    <line x1="0" y1="850" x2="${W}" y2="850"/>
  </g>

  <!-- Technical Framing Reticle -->
  <rect x="80" y="80" width="${W - 160}" height="${H - 160}" fill="none" stroke="rgba(255,255,255,0.06)" stroke-width="1"/>
  <rect x="96" y="96" width="${W - 192}" height="${H - 192}" fill="none" stroke="rgba(255,255,255,0.03)" stroke-width="1" stroke-dasharray="8 12"/>

  <!-- Corner Marks -->
  <g stroke="rgba(255,255,255,0.3)" stroke-width="1.5">
    <path d="M 80,120 L 80,80 L 120,80"/>
    <path d="M ${W - 80},120 L ${W - 80},80 L ${W - 120},80"/>
    <path d="M 80,${H - 120} L 80,${H - 80} L 120,${H - 80}"/>
    <path d="M ${W - 80},${H - 120} L ${W - 80},${H - 80} L ${W - 120},${H - 80}"/>
  </g>

  <!-- Top Left: Studio Branding -->
  <g font-family="'JetBrains Mono', monospace">
    <text x="140" y="145" font-size="16" fill="rgba(255,255,255,0.4)" letter-spacing="0.3em">&lt;VALENCE // WEB PRODUCTION /&gt;</text>
    <text x="140" y="180" font-size="13" fill="#ff4d00" letter-spacing="0.25em">● SYSTEM ONLINE // DEV.01</text>
  </g>

  <!-- Top Right: Specs -->
  <g font-family="'JetBrains Mono', monospace" font-size="14" fill="rgba(255,255,255,0.3)" letter-spacing="0.25em" text-anchor="end">
    <text x="${W - 140}" y="145">FULLSTACK &amp; HIGH-LOAD</text>
    <text x="${W - 140}" y="180">NEXT.JS • REACT • CLOUD</text>
  </g>

  <!-- Main Center Statement -->
  <g text-anchor="middle">
    <text x="960" y="420" font-family="'Unbounded', sans-serif" font-size="135" font-weight="900" fill="rgba(255,255,255,0.03)" letter-spacing="-0.04em">VALENCE·</text>
    
    <text x="960" y="360" font-family="'Unbounded', sans-serif" font-size="54" font-weight="900" fill="#f4f4f2" letter-spacing="-0.02em">
      WE BUILD DIGITAL SYSTEMS THAT SCALE<tspan fill="#ff4d00">.</tspan>
    </text>

    <!-- Laser Line -->
    <line x1="360" y1="410" x2="1560" y2="410" stroke="url(#laserGrad)" stroke-width="2"/>
    <polygon points="960,402 968,410 960,418 952,410" fill="#ffffff"/>
    <circle cx="960" cy="410" r="14" fill="#ff4d00" opacity="0.4" filter="blur(6px)"/>

    <text x="960" y="470" font-family="'JetBrains Mono', monospace" font-size="16" fill="#8b8b93" letter-spacing="0.3em">
      САЙТЫ • АВТОМАТИЗАЦИЯ • ВЕБ-СЕРВИСЫ ДЛЯ БИЗНЕСА
    </text>
  </g>

  <!-- Bottom Avatar Halo Rings -->
  <g stroke="rgba(255,255,255,0.08)" fill="none" stroke-width="1.5">
    <circle cx="960" cy="940" r="300" stroke-dasharray="6 8"/>
    <circle cx="960" cy="940" r="230" stroke="rgba(255,77,0,0.2)" stroke-width="1.5" stroke-dasharray="4 6"/>
  </g>

  <!-- Bottom Details -->
  <g font-family="'JetBrains Mono', monospace" font-size="14" fill="rgba(255,255,255,0.25)" letter-spacing="0.25em">
    <text x="140" y="${H - 130}">LOCATION: 43.19°N</text>
    <text x="140" y="${H - 100}">EST. 2026 // PRODUCTION</text>

    <text x="${W - 140}" y="${H - 130}" text-anchor="end">STATUS: AVAILABLE FOR NEW CLIENTS</text>
    <text x="${W - 140}" y="${H - 100}" text-anchor="end" fill="#ff4d00">TELEGRAM: @valencedigital</text>
  </g>

  <!-- Noise Overlay -->
  <rect width="${W}" height="${H}" fill="#fff" opacity="0.03" filter="url(#bannerGrain)"/>
</svg>
`.trim();

async function run() {
  console.log('Rendering EXACT 1920x1020 (and 960x510) formats for WhatsApp...');

  // 1. Exact 1920x1020 JPG
  await sharp(Buffer.from(svg1920x1020))
    .jpeg({ quality: 92, progressive: true, mozjpeg: true })
    .toFile(path.join(__dirname, '../public/whatsapp_banner_1920x1020.jpg'));
  console.log('✓ whatsapp_banner_1920x1020.jpg created');

  // 2. Exact 1920x1020 PNG
  await sharp(Buffer.from(svg1920x1020))
    .png({ compressionLevel: 9 })
    .toFile(path.join(__dirname, '../public/whatsapp_banner_1920x1020.png'));
  console.log('✓ whatsapp_banner_1920x1020.png created');

  // 3. Exact 960x510 JPG (half size multiple)
  await sharp(Buffer.from(svg1920x1020))
    .resize(960, 510)
    .jpeg({ quality: 94, progressive: true, mozjpeg: true })
    .toFile(path.join(__dirname, '../public/whatsapp_banner_960x510.jpg'));
  console.log('✓ whatsapp_banner_960x510.jpg created');
}

run();
