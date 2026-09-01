/**
 * Valence Official WhatsApp Business Cover Banner (Lifting text high above avatar)
 * 
 * Lifts all text elements significantly upwards (Y: 240-340)
 * creating 140px+ of clean breathing room so the avatar NEVER overlaps the subtitle.
 */

import sharp from 'sharp';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const W = 1920;
const H = 1080;

const AVATAR_X = 960;
const AVATAR_Y = 720; 

const svgLifted = /* xml */`
<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">
  <defs>
    <!-- Background Canvas Gradient -->
    <radialGradient id="bBg" cx="50%" cy="30%" r="75%">
      <stop offset="0%" stop-color="#14141a"/>
      <stop offset="50%" stop-color="#08080a"/>
      <stop offset="100%" stop-color="#020203"/>
    </radialGradient>

    <!-- Expansive Wide Horizontal Avatar Glow Halo -->
    <radialGradient id="wideAvatarGlow" cx="50%" cy="${(AVATAR_Y / H * 100).toFixed(1)}%" r="55%">
      <stop offset="0%" stop-color="#ff4d00" stop-opacity="0.65"/>
      <stop offset="25%" stop-color="#ff4d00" stop-opacity="0.32"/>
      <stop offset="55%" stop-color="#ff4d00" stop-opacity="0.08"/>
      <stop offset="85%" stop-color="#ff4d00" stop-opacity="0.01"/>
      <stop offset="100%" stop-color="#ff4d00" stop-opacity="0"/>
    </radialGradient>

    <!-- Laser Line Gradient -->
    <linearGradient id="laserGrad" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#ff4d00" stop-opacity="0"/>
      <stop offset="25%" stop-color="#ff4d00" stop-opacity="0.85"/>
      <stop offset="50%" stop-color="#ffffff"/>
      <stop offset="75%" stop-color="#ff4d00" stop-opacity="0.85"/>
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
  </g>

  <!-- Calibration Framing Reticle -->
  <rect x="80" y="80" width="${W - 160}" height="${H - 160}" fill="none" stroke="rgba(255,255,255,0.06)" stroke-width="1"/>
  <rect x="96" y="96" width="${W - 192}" height="${H - 192}" fill="none" stroke="rgba(255,255,255,0.03)" stroke-width="1" stroke-dasharray="8 12"/>

  <!-- Corner Marks -->
  <g stroke="rgba(255,255,255,0.3)" stroke-width="1.5">
    <path d="M 80,120 L 80,80 L 120,80"/>
    <path d="M ${W - 80},120 L ${W - 80},80 L ${W - 120},80"/>
  </g>

  <!-- Top Left / Right Specifications -->
  <g font-family="'JetBrains Mono', monospace">
    <text x="140" y="140" font-size="15" fill="rgba(255,255,255,0.4)" letter-spacing="0.3em">&lt;VALENCE // WEB PRODUCTION /&gt;</text>
    <text x="140" y="170" font-size="13" fill="#ff4d00" letter-spacing="0.25em">● SYSTEM ONLINE // DEV.01</text>
  </g>

  <g font-family="'JetBrains Mono', monospace" font-size="14" fill="rgba(255,255,255,0.3)" letter-spacing="0.25em" text-anchor="end">
    <text x="${W - 140}" y="140">FULLSTACK &amp; HIGH-LOAD</text>
    <text x="${W - 140}" y="170">NEXT.JS • REACT • CLOUD</text>
  </g>

  <!-- ================= MAIN CENTER STATEMENT & WATERMARK (LIFTED UP TO Y=230-330) ================= -->
  <g text-anchor="middle">
    <!-- Giant Subtle Gray Watermark (Moved up to Y=290) -->
    <text x="960" y="290" font-family="'Unbounded', sans-serif" font-size="140" font-weight="900" fill="rgba(255,255,255,0.05)" letter-spacing="-0.04em">VALENCE·</text>

    <!-- Main Crisp Headline (Lifted to Y=235) -->
    <text x="960" y="235" font-family="'Unbounded', sans-serif" font-size="56" font-weight="900" fill="#f4f4f2" letter-spacing="-0.02em">
      WE BUILD DIGITAL SYSTEMS THAT SCALE<tspan fill="#ff4d00">.</tspan>
    </text>

    <!-- Laser Divider Line with Diamond Center (Lifted to Y=285) -->
    <line x1="360" y1="285" x2="1560" y2="285" stroke="url(#laserGrad)" stroke-width="2.5"/>
    <polygon points="960,277 968,285 960,293 952,285" fill="#ffffff"/>
    <circle cx="960" cy="285" r="14" fill="#ff4d00" opacity="0.45" filter="blur(6px)"/>

    <!-- Clear Studio Subtitle (Lifted to Y=335 - Generous 150px+ clearance above avatar!) -->
    <text x="960" y="335" font-family="'JetBrains Mono', monospace" font-size="17" font-weight="600" fill="#8b8b93" letter-spacing="0.3em">
      САЙТЫ • АВТОМАТИЗАЦИЯ • ВЕБ-СЕРВИСЫ ДЛЯ БИЗНЕСА
    </text>
  </g>

  <!-- ================= WIDE AVATAR DOCKING RINGS (CENTERED AT Y=720) ================= -->
  <g stroke="rgba(255,255,255,0.12)" fill="none" stroke-width="2">
    <!-- Wide Outer Orbit Ring -->
    <circle cx="${AVATAR_X}" cy="${AVATAR_Y}" r="340" stroke-dasharray="8 12"/>
    <!-- Middle Orange Accent Ring -->
    <circle cx="${AVATAR_X}" cy="${AVATAR_Y}" r="260" stroke="rgba(255,77,0,0.4)" stroke-width="2" stroke-dasharray="6 8"/>
    <!-- Inner Alignment Reticle -->
    <circle cx="${AVATAR_X}" cy="${AVATAR_Y}" r="190" stroke="rgba(255,255,255,0.08)"/>
  </g>

  <!-- Bottom Left / Right Specs -->
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

async function run() {
  console.log('Rendering Lifted WhatsApp Banner (High Text Clearance)...');

  await sharp(Buffer.from(svgLifted))
    .jpeg({ quality: 98, chromaSubsampling: '4:4:4' })
    .toFile(path.join(__dirname, '../public/whatsapp_banner_master.jpg'));

  await sharp(Buffer.from(svgLifted))
    .png({ compressionLevel: 9 })
    .toFile(path.join(__dirname, '../public/whatsapp_banner_master.png'));

  await sharp(Buffer.from(svgLifted))
    .resize(1024, 576)
    .jpeg({ quality: 98, chromaSubsampling: '4:4:4' })
    .toFile(path.join(__dirname, '../public/whatsapp_banner_1024x576.jpg'));

  console.log('✓ Lifted WhatsApp Banner saved!');
}

run();
