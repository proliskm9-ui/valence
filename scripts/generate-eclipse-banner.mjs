/**
 * Valence Perfected "Eclipse HUD Dock" WhatsApp Banner
 * 
 * Features:
 * 1. Perimeter Eclipse Rim Light: Radiates intense glow right from the outer edge of the avatar circle
 * 2. Sci-Fi HUD Reticle & Crosshair Ticks: Mathematical docking station marks around the avatar
 * 3. High-Contrast Typography & Laser Horizon: Punchy Unbounded 900 headline & watermark
 */

import sharp from 'sharp';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const W = 1920;
const H = 1080;

// Avatar true center in WhatsApp mobile profile
const AVATAR_X = 960;
const AVATAR_Y = 820; 

function createSvg({ headline = 'WE BUILD DIGITAL SYSTEMS THAT SCALE.', isRussian = false }) {
  return /* xml */`
<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">
  <defs>
    <!-- Background Canvas Gradient -->
    <radialGradient id="eBg" cx="50%" cy="30%" r="80%">
      <stop offset="0%" stop-color="#181822"/>
      <stop offset="45%" stop-color="#09090c"/>
      <stop offset="100%" stop-color="#020203"/>
    </radialGradient>

    <!-- Broad Atmospheric Orange Ambient Halo -->
    <radialGradient id="eAmbient" cx="50%" cy="${(AVATAR_Y / H * 100).toFixed(1)}%" r="60%">
      <stop offset="0%" stop-color="#ff4d00" stop-opacity="0.8"/>
      <stop offset="25%" stop-color="#ff4d00" stop-opacity="0.45"/>
      <stop offset="55%" stop-color="#ff4d00" stop-opacity="0.12"/>
      <stop offset="85%" stop-color="#ff4d00" stop-opacity="0.01"/>
      <stop offset="100%" stop-color="#ff4d00" stop-opacity="0"/>
    </radialGradient>

    <!-- Intense Eclipse Rim Gradient (Glows intensely right around the circle perimeter r=240-360) -->
    <radialGradient id="eRimGlow" cx="50%" cy="${(AVATAR_Y / H * 100).toFixed(1)}%" r="30%">
      <stop offset="0%" stop-color="#ff4d00" stop-opacity="0.9"/>
      <stop offset="40%" stop-color="#ff4d00" stop-opacity="0.6"/>
      <stop offset="80%" stop-color="#ff4d00" stop-opacity="0.15"/>
      <stop offset="100%" stop-color="#ff4d00" stop-opacity="0"/>
    </radialGradient>

    <!-- Laser Line Gradient -->
    <linearGradient id="eLaser" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#ff4d00" stop-opacity="0"/>
      <stop offset="25%" stop-color="#ff4d00" stop-opacity="0.9"/>
      <stop offset="50%" stop-color="#ffffff"/>
      <stop offset="75%" stop-color="#ff4d00" stop-opacity="0.9"/>
      <stop offset="100%" stop-color="#ff4d00" stop-opacity="0"/>
    </linearGradient>

    <!-- Film Grain -->
    <filter id="eGrain">
      <feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves="3" stitchTiles="stitch"/>
      <feColorMatrix type="saturate" values="0"/>
      <feComponentTransfer><feFuncA type="linear" slope="0.035"/></feComponentTransfer>
      <feBlend mode="overlay"/>
    </filter>
  </defs>

  <!-- 1. Background -->
  <rect width="${W}" height="${H}" fill="url(#eBg)"/>

  <!-- 2. Ambient Orange Glow behind avatar -->
  <rect width="${W}" height="${H}" fill="url(#eAmbient)"/>
  <circle cx="${AVATAR_X}" cy="${AVATAR_Y}" r="380" fill="url(#eRimGlow)"/>

  <!-- 3. Developer Grid -->
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

  <!-- Framing Marks -->
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

  <!-- ================= MASTER TYPOGRAPHY (PERFECT VERTICAL BALANCE) ================= -->
  <g text-anchor="middle">
    <!-- Giant Subtle Watermark "VALENCE·" -->
    <text x="960" y="335" font-family="'Unbounded', sans-serif" font-size="165" font-weight="900" fill="rgba(255,255,255,0.065)" letter-spacing="-0.04em">VALENCE·</text>

    <!-- Main Bold Headline -->
    <text x="960" y="275" font-family="'Unbounded', sans-serif" font-size="68" font-weight="900" fill="#f4f4f2" letter-spacing="-0.025em">
      ${headline}
    </text>

    <!-- Laser Divider Line with Specular Diamond -->
    <line x1="320" y1="330" x2="1600" y2="330" stroke="url(#eLaser)" stroke-width="2.5"/>
    <polygon points="960,322 968,330 960,338 952,330" fill="#ffffff"/>
    <circle cx="960" cy="330" r="14" fill="#ff4d00" opacity="0.6" filter="blur(6px)"/>

    <!-- Clear Studio Subtitle -->
    <text x="960" y="385" font-family="'JetBrains Mono', monospace" font-size="19" font-weight="600" fill="#8b8b93" letter-spacing="0.28em">
      САЙТЫ • АВТОМАТИЗАЦИЯ • ВЕБ-СЕРВИСЫ ДЛЯ БИЗНЕСА
    </text>
  </g>

  <!-- ================= SCI-FI HUD DOCKING RINGS & TICKS (CENTERED AT Y=820) ================= -->
  <!-- Laser Horizon Tangent Line -->
  <line x1="0" y1="${AVATAR_Y}" x2="${W}" y2="${AVATAR_Y}" stroke="rgba(255,77,0,0.15)" stroke-width="1.5" stroke-dasharray="12 16"/>

  <!-- Docking Orbit Rings -->
  <g stroke="rgba(255,255,255,0.15)" fill="none" stroke-width="2">
    <!-- Outer Orbit Ring with glowing segments -->
    <circle cx="${AVATAR_X}" cy="${AVATAR_Y}" r="330" stroke-dasharray="10 14"/>
    <!-- Intense Glowing Orange Ring (Encircling avatar perimeter) -->
    <circle cx="${AVATAR_X}" cy="${AVATAR_Y}" r="255" stroke="#ff4d00" stroke-opacity="0.65" stroke-width="2.5" stroke-dasharray="6 8"/>
    <!-- Inner Contact Reticle -->
    <circle cx="${AVATAR_X}" cy="${AVATAR_Y}" r="200" stroke="rgba(255,255,255,0.1)" stroke-width="1.5"/>
  </g>

  <!-- HUD Crosshair Calibrations (Cardinal Ticks at 12, 3, 6, 9 o'clock) -->
  <g stroke="#ff4d00" stroke-width="2" opacity="0.75">
    <!-- Top Tick -->
    <line x1="${AVATAR_X}" y1="${AVATAR_Y - 270}" x2="${AVATAR_X}" y2="${AVATAR_Y - 240}"/>
    <!-- Bottom Tick -->
    <line x1="${AVATAR_X}" y1="${AVATAR_Y + 240}" x2="${AVATAR_X}" y2="${AVATAR_Y + 270}"/>
    <!-- Left Tick -->
    <line x1="${AVATAR_X - 270}" y1="${AVATAR_Y}" x2="${AVATAR_X - 240}" y2="${AVATAR_Y}"/>
    <!-- Right Tick -->
    <line x1="${AVATAR_X + 240}" y1="${AVATAR_Y}" x2="${AVATAR_X + 270}" y2="${AVATAR_Y}"/>
  </g>

  <!-- Bottom Coordinates -->
  <g font-family="'JetBrains Mono', monospace" font-size="14" fill="rgba(255,255,255,0.25)" letter-spacing="0.25em">
    <text x="140" y="${H - 120}">LOCATION: 43.19°N</text>
    <text x="140" y="${H - 90}">EST. 2026 // PRODUCTION</text>

    <text x="${W - 140}" y="${H - 120}" text-anchor="end">STATUS: AVAILABLE FOR NEW CLIENTS</text>
    <text x="${W - 140}" y="${H - 90}" text-anchor="end" fill="#ff4d00">TELEGRAM: @valencedigital</text>
  </g>

  <!-- Noise Overlay -->
  <rect width="${W}" height="${H}" fill="#fff" opacity="0.03" filter="url(#eGrain)"/>
</svg>
`.trim();
}

async function run() {
  console.log('Rendering Perfected Eclipse HUD Dock Banners...');

  // Master English Edition
  await sharp(Buffer.from(createSvg({ headline: 'WE BUILD DIGITAL SYSTEMS THAT SCALE<tspan fill="#ff4d00">.</tspan>' })))
    .jpeg({ quality: 98, chromaSubsampling: '4:4:4' })
    .toFile(path.join(__dirname, '../public/whatsapp_banner_eclipse_master.jpg'));

  // Master Russian Edition (Alternative)
  await sharp(Buffer.from(createSvg({ headline: 'РАЗРАБОТКА САЙТОВ ДЛЯ БИЗНЕСА<tspan fill="#ff4d00">.</tspan>' })))
    .jpeg({ quality: 98, chromaSubsampling: '4:4:4' })
    .toFile(path.join(__dirname, '../public/whatsapp_banner_eclipse_ru.jpg'));

  // Overwrite default master
  await sharp(Buffer.from(createSvg({ headline: 'WE BUILD DIGITAL SYSTEMS THAT SCALE<tspan fill="#ff4d00">.</tspan>' })))
    .jpeg({ quality: 98, chromaSubsampling: '4:4:4' })
    .toFile(path.join(__dirname, '../public/whatsapp_banner_master.jpg'));

  console.log('✓ whatsapp_banner_eclipse_master.jpg rendered successfully!');
}

run();
