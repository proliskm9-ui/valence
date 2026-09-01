/**
 * Valence WhatsApp Banner - Perfectly Balanced Master
 * 
 * Harmonious vertical distribution:
 * - Headline centered at Y = 270px
 * - Subtle Watermark VALENCE· at Y = 325px
 * - Laser line at Y = 320px
 * - Subtitle at Y = 370px
 * - Avatar dock centered at Y = 830px (top of avatar at Y = 540px)
 * - 160px of clean breathing space above avatar, 240px clean margin below top edge
 */

import sharp from 'sharp';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const W = 1920;
const H = 1080;

const AVATAR_X = 960;
const AVATAR_Y = 830; 

const svgBalanced = /* xml */`
<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">
  <defs>
    <!-- Background Canvas Gradient -->
    <radialGradient id="bBg" cx="50%" cy="30%" r="75%">
      <stop offset="0%" stop-color="#14141a"/>
      <stop offset="50%" stop-color="#08080a"/>
      <stop offset="100%" stop-color="#020203"/>
    </radialGradient>

    <!-- Expansive Wide Horizontal Avatar Glow Halo -->
    <radialGradient id="wideAvatarGlow" cx="50%" cy="${(AVATAR_Y / H * 100).toFixed(1)}%" r="52%">
      <stop offset="0%" stop-color="#ff4d00" stop-opacity="0.7"/>
      <stop offset="25%" stop-color="#ff4d00" stop-opacity="0.35"/>
      <stop offset="55%" stop-color="#ff4d00" stop-opacity="0.09"/>
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
    <text x="140" y="140" font-size="15" fill="rgba(255,255,255,0.4)" letter-spacing="0.3em">&lt;VALENCE // WEB PRODUCTION /&gt;</text>
    <text x="140" y="170" font-size="13" fill="#ff4d00" letter-spacing="0.25em">● SYSTEM ONLINE // DEV.01</text>
  </g>

  <g font-family="'JetBrains Mono', monospace" font-size="14" fill="rgba(255,255,255,0.3)" letter-spacing="0.25em" text-anchor="end">
    <text x="${W - 140}" y="140">FULLSTACK &amp; HIGH-LOAD</text>
    <text x="${W - 140}" y="170">NEXT.JS • REACT • CLOUD</text>
  </g>

  <!-- ================= BALANCED CENTER TEXT BLOCK (Y = 270 - 370) ================= -->
  <g text-anchor="middle">
    <!-- Giant Subtle Watermark "VALENCE·" -->
    <text x="960" y="325" font-family="'Unbounded', sans-serif" font-size="140" font-weight="900" fill="rgba(255,255,255,0.05)" letter-spacing="-0.04em">VALENCE·</text>

    <!-- Main Crisp Headline -->
    <text x="960" y="270" font-family="'Unbounded', sans-serif" font-size="56" font-weight="900" fill="#f4f4f2" letter-spacing="-0.02em">
      WE BUILD DIGITAL SYSTEMS THAT SCALE<tspan fill="#ff4d00">.</tspan>
    </text>

    <!-- Laser Divider Line with Diamond Center -->
    <line x1="360" y1="320" x2="1560" y2="320" stroke="url(#laserGrad)" stroke-width="2.5"/>
    <polygon points="960,312 968,320 960,328 952,320" fill="#ffffff"/>
    <circle cx="960" cy="320" r="14" fill="#ff4d00" opacity="0.45" filter="blur(6px)"/>

    <!-- Clear Studio Subtitle (Balanced 160px clearance above avatar) -->
    <text x="960" y="370" font-family="'JetBrains Mono', monospace" font-size="17" font-weight="600" fill="#8b8b93" letter-spacing="0.3em">
      САЙТЫ • АВТОМАТИЗАЦИЯ • ВЕБ-СЕРВИСЫ ДЛЯ БИЗНЕСА
    </text>
  </g>

  <!-- ================= CONCENTRIC DOCKING RINGS (Y = ${AVATAR_Y}) ================= -->
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

async function run() {
  console.log('Rendering Perfectly Balanced WhatsApp Banner...');

  // 1. Balanced JPG
  await sharp(Buffer.from(svgBalanced))
    .jpeg({ quality: 98, chromaSubsampling: '4:4:4' })
    .toFile(path.join(__dirname, '../public/whatsapp_banner_balanced.jpg'));

  // 2. Overwrite master
  await sharp(Buffer.from(svgBalanced))
    .jpeg({ quality: 98, chromaSubsampling: '4:4:4' })
    .toFile(path.join(__dirname, '../public/whatsapp_banner_master.jpg'));

  console.log('✓ whatsapp_banner_balanced.jpg rendered successfully!');
}

run();
