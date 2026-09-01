/**
 * Valence WhatsApp Banner - Bold Typography Master Edition
 * 
 * Increases the white headline to 72px/82px Unbounded 900 for punchy,
 * unmistakable readability on mobile screens, plus deeper watermark and laser craft.
 */

import sharp from 'sharp';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const W = 1920;
const H = 1080;

const AVATAR_X = 960;
const AVATAR_Y = 830; 

function createSvg({ headlineSize = 72, watermarkSize = 175, watermarkOpacity = 0.065 }) {
  return /* xml */`
<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">
  <defs>
    <!-- Background Canvas Gradient -->
    <radialGradient id="bBg" cx="50%" cy="30%" r="75%">
      <stop offset="0%" stop-color="#15151d"/>
      <stop offset="50%" stop-color="#08080a"/>
      <stop offset="100%" stop-color="#020203"/>
    </radialGradient>

    <!-- Expansive Wide Horizontal Avatar Glow Halo -->
    <radialGradient id="wideAvatarGlow" cx="50%" cy="${(AVATAR_Y / H * 100).toFixed(1)}%" r="54%">
      <stop offset="0%" stop-color="#ff4d00" stop-opacity="0.7"/>
      <stop offset="25%" stop-color="#ff4d00" stop-opacity="0.35"/>
      <stop offset="55%" stop-color="#ff4d00" stop-opacity="0.09"/>
      <stop offset="85%" stop-color="#ff4d00" stop-opacity="0.01"/>
      <stop offset="100%" stop-color="#ff4d00" stop-opacity="0"/>
    </radialGradient>

    <!-- Laser Line Gradient -->
    <linearGradient id="laserGrad" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#ff4d00" stop-opacity="0"/>
      <stop offset="25%" stop-color="#ff4d00" stop-opacity="0.9"/>
      <stop offset="50%" stop-color="#ffffff"/>
      <stop offset="75%" stop-color="#ff4d00" stop-opacity="0.9"/>
      <stop offset="100%" stop-color="#ff4d00" stop-opacity="0"/>
    </linearGradient>

    <!-- Film Grain -->
    <filter id="grain">
      <feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves="3" stitchTiles="stitch"/>
      <feColorMatrix type="saturate" values="0"/>
      <feComponentTransfer><feFuncA type="linear" slope="0.032"/></feComponentTransfer>
      <feBlend mode="overlay"/>
    </filter>
  </defs>

  <!-- Background Base -->
  <rect width="${W}" height="${H}" fill="url(#bBg)"/>

  <!-- Wide Smooth Avatar Glow Aura -->
  <rect width="${W}" height="${H}" fill="url(#wideAvatarGlow)"/>

  <!-- Developer Matrix Grid -->
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
  </g>

  <!-- Calibration Framing Reticle -->
  <rect x="80" y="80" width="${W - 160}" height="${H - 160}" fill="none" stroke="rgba(255,255,255,0.06)" stroke-width="1"/>
  <rect x="96" y="96" width="${W - 192}" height="${H - 192}" fill="none" stroke="rgba(255,255,255,0.03)" stroke-width="1" stroke-dasharray="8 12"/>

  <!-- Corner Marks -->
  <g stroke="rgba(255,255,255,0.3)" stroke-width="1.5">
    <path d="M 80,120 L 80,80 L 120,80"/>
    <path d="M ${W - 80},120 L ${W - 80},80 L ${W - 120},80"/>
  </g>

  <!-- Top Specifications -->
  <g font-family="'JetBrains Mono', monospace">
    <text x="140" y="135" font-size="16" font-weight="600" fill="rgba(255,255,255,0.45)" letter-spacing="0.3em">&lt;VALENCE // WEB PRODUCTION /&gt;</text>
    <text x="140" y="168" font-size="13" font-weight="700" fill="#ff4d00" letter-spacing="0.25em">● SYSTEM ONLINE // DEV.01</text>
  </g>

  <g font-family="'JetBrains Mono', monospace" font-size="14" font-weight="600" fill="rgba(255,255,255,0.35)" letter-spacing="0.25em" text-anchor="end">
    <text x="${W - 140}" y="135">FULLSTACK &amp; HIGH-LOAD</text>
    <text x="${W - 140}" y="168">NEXT.JS • REACT • CLOUD</text>
  </g>

  <!-- ================= BOLD MASTER TEXT BLOCK (LIFTED & RESIZED) ================= -->
  <g text-anchor="middle">
    <!-- Giant Subtle Watermark "VALENCE·" (Scale: ${watermarkSize}px) -->
    <text x="960" y="340" font-family="'Unbounded', sans-serif" font-size="${watermarkSize}" font-weight="900" fill="rgba(255,255,255,${watermarkOpacity})" letter-spacing="-0.04em">VALENCE·</text>

    <!-- Main Bold Crisp Headline (Scale: ${headlineSize}px) -->
    <text x="960" y="275" font-family="'Unbounded', sans-serif" font-size="${headlineSize}" font-weight="900" fill="#f4f4f2" letter-spacing="-0.025em">
      WE BUILD DIGITAL SYSTEMS THAT SCALE<tspan fill="#ff4d00">.</tspan>
    </text>

    <!-- Laser Divider Line with Diamond Center -->
    <line x1="320" y1="330" x2="1600" y2="330" stroke="url(#laserGrad)" stroke-width="2.5"/>
    <polygon points="960,322 968,330 960,338 952,330" fill="#ffffff"/>
    <circle cx="960" cy="330" r="14" fill="#ff4d00" opacity="0.5" filter="blur(6px)"/>

    <!-- Clear Studio Subtitle (20px JetBrains Mono) -->
    <text x="960" y="385" font-family="'JetBrains Mono', monospace" font-size="20" font-weight="600" fill="#8b8b93" letter-spacing="0.28em">
      САЙТЫ • АВТОМАТИЗАЦИЯ • ВЕБ-СЕРВИСЫ ДЛЯ БИЗНЕСА
    </text>
  </g>

  <!-- ================= CONCENTRIC DOCKING RINGS (CENTERED AT Y=830) ================= -->
  <g stroke="rgba(255,255,255,0.12)" fill="none" stroke-width="2">
    <!-- Outer Orbit Ring -->
    <circle cx="${AVATAR_X}" cy="${AVATAR_Y}" r="340" stroke-dasharray="8 12"/>
    <!-- Middle Orange Accent Ring -->
    <circle cx="${AVATAR_X}" cy="${AVATAR_Y}" r="260" stroke="rgba(255,77,0,0.4)" stroke-width="2" stroke-dasharray="6 8"/>
    <!-- Inner Alignment Reticle -->
    <circle cx="${AVATAR_X}" cy="${AVATAR_Y}" r="190" stroke="rgba(255,255,255,0.08)"/>
  </g>

  <!-- Bottom Specs -->
  <g font-family="'JetBrains Mono', monospace" font-size="14" fill="rgba(255,255,255,0.25)" letter-spacing="0.25em">
    <text x="140" y="${H - 120}">LOCATION: 43.19°N</text>
    <text x="140" y="${H - 90}">EST. 2026 // PRODUCTION</text>

    <text x="${W - 140}" y="${H - 120}" text-anchor="end">STATUS: AVAILABLE FOR NEW CLIENTS</text>
    <text x="${W - 140}" y="${H - 90}" text-anchor="end" fill="#ff4d00">TELEGRAM: @valencedigital</text>
  </g>

  <!-- Noise Overlay -->
  <rect width="${W}" height="${H}" fill="#fff" opacity="0.03" filter="url(#grain)"/>
</svg>
`.trim();
}

async function run() {
  console.log('Rendering Bold Typography WhatsApp Banners...');

  // 1. Bold 72px Master (Recommended)
  await sharp(Buffer.from(createSvg({ headlineSize: 72, watermarkSize: 170, watermarkOpacity: 0.065 })))
    .jpeg({ quality: 98, chromaSubsampling: '4:4:4' })
    .toFile(path.join(__dirname, '../public/whatsapp_banner_bold_72.jpg'));
  console.log('✓ whatsapp_banner_bold_72.jpg saved');

  // 2. Ultra-Heavy 80px Monumental
  await sharp(Buffer.from(createSvg({ headlineSize: 80, watermarkSize: 190, watermarkOpacity: 0.075 })))
    .jpeg({ quality: 98, chromaSubsampling: '4:4:4' })
    .toFile(path.join(__dirname, '../public/whatsapp_banner_ultra_80.jpg'));
  console.log('✓ whatsapp_banner_ultra_80.jpg saved');

  // Overwrite default master banner with the Bold 72px version
  await sharp(Buffer.from(createSvg({ headlineSize: 72, watermarkSize: 170, watermarkOpacity: 0.065 })))
    .jpeg({ quality: 98, chromaSubsampling: '4:4:4' })
    .toFile(path.join(__dirname, '../public/whatsapp_banner_master.jpg'));

  console.log('✓ whatsapp_banner_master.jpg updated with Bold Master!');
}

run();
