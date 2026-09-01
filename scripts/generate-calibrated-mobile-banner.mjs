/**
 * Calibrated WhatsApp Mobile Banner
 * 
 * Accurately aligns the orange halo and docking rings with the real avatar position on iPhone / Android:
 * - Avatar center on mobile is at ~62% of banner height (Y = 660px on 1080p canvas)
 * - Text placed in the top 28% safe zone (Y = 130px - 260px)
 */

import sharp from 'sharp';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const W = 1920;
const H = 1080;

// Avatar true center in mobile WhatsApp profile header
const AVATAR_CENTER_Y = 660; 

const svgCalibrated = /* xml */`
<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">
  <defs>
    <!-- Deep Velvet Dark Canvas -->
    <radialGradient id="calBg" cx="50%" cy="35%" r="75%">
      <stop offset="0%" stop-color="#14141a"/>
      <stop offset="50%" stop-color="#08080a"/>
      <stop offset="100%" stop-color="#020203"/>
    </radialGradient>

    <!-- Calibrated Avatar Backlight Halo (Centered directly at Y=660 behind avatar) -->
    <radialGradient id="calAvatarHalo" cx="50%" cy="${(AVATAR_CENTER_Y / H * 100).toFixed(1)}%" r="35%">
      <stop offset="0%" stop-color="#ff4d00" stop-opacity="0.55"/>
      <stop offset="35%" stop-color="#ff4d00" stop-opacity="0.2"/>
      <stop offset="70%" stop-color="#ff4d00" stop-opacity="0.03"/>
      <stop offset="100%" stop-color="#ff4d00" stop-opacity="0"/>
    </radialGradient>

    <!-- Laser Line Gradient -->
    <linearGradient id="calLaser" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#ff4d00" stop-opacity="0"/>
      <stop offset="25%" stop-color="#ff4d00" stop-opacity="0.9"/>
      <stop offset="50%" stop-color="#ffffff"/>
      <stop offset="75%" stop-color="#ff4d00" stop-opacity="0.9"/>
      <stop offset="100%" stop-color="#ff4d00" stop-opacity="0"/>
    </linearGradient>
  </defs>

  <!-- Background Base -->
  <rect width="${W}" height="${H}" fill="url(#calBg)"/>

  <!-- Halo Atmosphere Centered Directly Behind Avatar -->
  <rect width="${W}" height="${H}" fill="url(#calAvatarHalo)"/>

  <!-- Clean Matrix Grid Lines -->
  <g opacity="0.04" stroke="#ffffff" stroke-width="2">
    <line x1="480" y1="0" x2="480" y2="${H}"/>
    <line x1="1440" y1="0" x2="1440" y2="${H}"/>
    <line x1="0" y1="200" x2="${W}" y2="200"/>
  </g>

  <!-- ================= UPPER SAFE ZONE (100% CLEAR OF AVATAR) ================= -->
  <g text-anchor="middle">
    <!-- Top Category Tag -->
    <text x="960" y="140" font-family="'JetBrains Mono', monospace" font-size="20" font-weight="700" fill="#ff4d00" letter-spacing="0.4em">
      &lt;WEB PRODUCTION &amp; HIGH-LOAD SYSTEMS /&gt;
    </text>

    <!-- Main Bold Headline -->
    <text x="960" y="215" font-family="'Unbounded', sans-serif" font-size="54" font-weight="900" fill="#f4f4f2" letter-spacing="-0.02em">
      WE BUILD DIGITAL SYSTEMS THAT SCALE<tspan fill="#ff4d00">.</tspan>
    </text>

    <!-- Laser Divider Line -->
    <line x1="440" y1="260" x2="1480" y2="260" stroke="url(#calLaser)" stroke-width="2.5"/>
    <polygon points="960,252 968,260 960,268 952,260" fill="#ffffff"/>

    <!-- Clear Studio Subtitle -->
    <text x="960" y="305" font-family="'JetBrains Mono', monospace" font-size="18" font-weight="600" fill="#8b8b93" letter-spacing="0.25em">
      САЙТЫ • СЕРВИСЫ • АВТОМАТИЗАЦИЯ ДЛЯ БИЗНЕСА
    </text>
  </g>

  <!-- ================= CONCENTRIC DOCKING RINGS (CENTERED AT REAL AVATAR Y=660) ================= -->
  <g stroke="rgba(255,255,255,0.12)" fill="none" stroke-width="2">
    <!-- Outer Ring -->
    <circle cx="960" cy="${AVATAR_CENTER_Y}" r="280" stroke-dasharray="8 10"/>
    <!-- Inner Accent Ring -->
    <circle cx="960" cy="${AVATAR_CENTER_Y}" r="220" stroke="rgba(255,77,0,0.35)" stroke-width="2" stroke-dasharray="6 8"/>
    <!-- Tight Alignment Reticle -->
    <circle cx="960" cy="${AVATAR_CENTER_Y}" r="170" stroke="rgba(255,255,255,0.06)"/>
  </g>
</svg>
`.trim();

async function run() {
  console.log('Rendering Calibrated WhatsApp Mobile Banner (Avatar Y=660)...');

  // Master Calibrated JPG
  await sharp(Buffer.from(svgCalibrated))
    .jpeg({ quality: 98, chromaSubsampling: '4:4:4' })
    .toFile(path.join(__dirname, '../public/whatsapp_banner_calibrated.jpg'));

  // Master Calibrated PNG
  await sharp(Buffer.from(svgCalibrated))
    .png({ compressionLevel: 9 })
    .toFile(path.join(__dirname, '../public/whatsapp_banner_calibrated.png'));

  // Overwrite default master banner
  await sharp(Buffer.from(svgCalibrated))
    .jpeg({ quality: 98, chromaSubsampling: '4:4:4' })
    .toFile(path.join(__dirname, '../public/whatsapp_banner_master.jpg'));

  console.log('✓ whatsapp_banner_calibrated.jpg rendered successfully!');
}

run();
