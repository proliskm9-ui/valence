/**
 * Valence Perfected Master WhatsApp Business Banner
 * 
 * 1. Prominent, bold VALENCE· brand wordmark in Unbounded 900.
 * 2. Exact mathematical avatar alignment (Center: X=960, Y=720).
 * 3. Expansive atmospheric orange halo radiating seamlessly around the avatar.
 * 4. Technical developer grid & laser divider line.
 */

import sharp from 'sharp';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const W = 1920;
const H = 1080;

// Avatar true center in mobile WhatsApp profile header
const AVATAR_X = 960;
const AVATAR_Y = 720; 

const svgPerfected = /* xml */`
<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">
  <defs>
    <!-- Deep Canvas Dark Gradient -->
    <radialGradient id="perfBg" cx="50%" cy="30%" r="75%">
      <stop offset="0%" stop-color="#15151c"/>
      <stop offset="48%" stop-color="#08080a"/>
      <stop offset="100%" stop-color="#020203"/>
    </radialGradient>

    <!-- Expansive Smooth Avatar Backlight Halo (Centered exactly at X=960, Y=720) -->
    <radialGradient id="perfAvatarHalo" cx="50%" cy="${(AVATAR_Y / H * 100).toFixed(1)}%" r="38%">
      <stop offset="0%" stop-color="#ff4d00" stop-opacity="0.6"/>
      <stop offset="30%" stop-color="#ff4d00" stop-opacity="0.22"/>
      <stop offset="65%" stop-color="#ff4d00" stop-opacity="0.04"/>
      <stop offset="100%" stop-color="#ff4d00" stop-opacity="0"/>
    </radialGradient>

    <!-- Laser Line Gradient -->
    <linearGradient id="perfLaser" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#ff4d00" stop-opacity="0"/>
      <stop offset="25%" stop-color="#ff4d00" stop-opacity="0.85"/>
      <stop offset="50%" stop-color="#ffffff"/>
      <stop offset="75%" stop-color="#ff4d00" stop-opacity="0.85"/>
      <stop offset="100%" stop-color="#ff4d00" stop-opacity="0"/>
    </linearGradient>

    <!-- Subtle Film Grain -->
    <filter id="perfGrain">
      <feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves="3" stitchTiles="stitch"/>
      <feColorMatrix type="saturate" values="0"/>
      <feComponentTransfer><feFuncA type="linear" slope="0.03"/></feComponentTransfer>
      <feBlend mode="overlay"/>
    </filter>
  </defs>

  <!-- Background Base -->
  <rect width="${W}" height="${H}" fill="url(#perfBg)"/>

  <!-- Expansive Orange Halo Centered on Avatar -->
  <rect width="${W}" height="${H}" fill="url(#perfAvatarHalo)"/>

  <!-- Developer Matrix Grid -->
  <g opacity="0.035" stroke="#ffffff" stroke-width="1.5">
    <line x1="320" y1="0" x2="320" y2="${H}"/>
    <line x1="640" y1="0" x2="640" y2="${H}"/>
    <line x1="960" y1="0" x2="960" y2="${H}"/>
    <line x1="1280" y1="0" x2="1280" y2="${H}"/>
    <line x1="1600" y1="0" x2="1600" y2="${H}"/>
    <line x1="0" y1="180" x2="${W}" y2="180"/>
    <line x1="0" y1="360" x2="${W}" y2="360"/>
  </g>

  <!-- Framing Calibration Corners -->
  <g stroke="rgba(255,255,255,0.25)" stroke-width="1.5">
    <path d="M 80,120 L 80,80 L 120,80"/>
    <path d="M ${W - 80},120 L ${W - 80},80 L ${W - 120},80"/>
  </g>

  <!-- Top Corner Metadata -->
  <g font-family="'JetBrains Mono', monospace" font-size="13" fill="rgba(255,255,255,0.3)" letter-spacing="0.25em">
    <text x="130" y="115">SYS // DEV.01</text>
    <text x="${W - 130}" y="115" text-anchor="end">NEXT.JS • HIGH-LOAD</text>
  </g>

  <!-- ================= MASTER BRANDING & STATEMENT (UPPER SECTION) ================= -->
  <g text-anchor="middle">
    <!-- Category Sub-Heading -->
    <text x="960" y="155" font-family="'JetBrains Mono', monospace" font-size="16" font-weight="700" fill="#ff4d00" letter-spacing="0.45em">
      &lt; WEB PRODUCTION &amp; ENGINEERING /&gt;
    </text>

    <!-- PROMINENT MASTER BRAND TITLE: VALENCE· -->
    <text x="960" y="270" font-family="'Unbounded', sans-serif" font-size="96" font-weight="900" fill="#f4f4f2" letter-spacing="-0.03em">
      VALENCE<tspan fill="#ff4d00">·</tspan>
    </text>

    <!-- Laser Divider with Center Specular Diamond -->
    <line x1="380" y1="320" x2="1540" y2="320" stroke="url(#perfLaser)" stroke-width="2.5"/>
    <polygon points="960,312 968,320 960,328 952,320" fill="#ffffff"/>

    <!-- Clear Slogan Subtitle (Readable & punchy) -->
    <text x="960" y="375" font-family="'JetBrains Mono', monospace" font-size="17" font-weight="600" fill="#8b8b93" letter-spacing="0.3em">
      ПРОЕКТИРУЕМ И РАЗРАБАТЫВАЕМ САЙТЫ ДЛЯ БИЗНЕСА
    </text>
  </g>

  <!-- ================= AVATAR DOCKING RINGS (CENTERED AT REAL AVATAR Y=720) ================= -->
  <g stroke="rgba(255,255,255,0.12)" fill="none" stroke-width="2">
    <!-- Outer Orbit Ring -->
    <circle cx="${AVATAR_X}" cy="${AVATAR_Y}" r="310" stroke-dasharray="8 12"/>
    <!-- Middle Accent Ring -->
    <circle cx="${AVATAR_X}" cy="${AVATAR_Y}" r="240" stroke="rgba(255,77,0,0.38)" stroke-width="2" stroke-dasharray="6 8"/>
    <!-- Inner Contact Reticle -->
    <circle cx="${AVATAR_X}" cy="${AVATAR_Y}" r="175" stroke="rgba(255,255,255,0.08)"/>
  </g>

  <!-- Noise Layer -->
  <rect width="${W}" height="${H}" fill="#fff" opacity="0.03" filter="url(#perfGrain)"/>
</svg>
`.trim();

async function run() {
  console.log('Rendering Perfected Master WhatsApp Banner with VALENCE· branding...');

  // 1. High-Q JPG
  await sharp(Buffer.from(svgPerfected))
    .jpeg({ quality: 98, chromaSubsampling: '4:4:4' })
    .toFile(path.join(__dirname, '../public/whatsapp_banner_perfected.jpg'));

  // 2. High-Q PNG
  await sharp(Buffer.from(svgPerfected))
    .png({ compressionLevel: 9 })
    .toFile(path.join(__dirname, '../public/whatsapp_banner_perfected.png'));

  // 3. Overwrite default
  await sharp(Buffer.from(svgPerfected))
    .jpeg({ quality: 98, chromaSubsampling: '4:4:4' })
    .toFile(path.join(__dirname, '../public/whatsapp_banner_master.jpg'));

  console.log('✓ whatsapp_banner_perfected.jpg rendered successfully!');
}

run();
