/**
 * WhatsApp Mobile-Optimized Ultra-Crisp Header Banner
 * 
 * Specifically fixes mobile issues:
 * 1. ZERO microscopic corner text (eliminates WhatsApp JPEG compression ringing & blur)
 * 2. Large, ultra-bold, high-contrast typography in the upper safe-zone (never collides with avatar)
 * 3. Dedicated clean dark space around avatar dock
 * 4. High-contrast crisp laser lines & pure velvety background
 */

import sharp from 'sharp';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const W = 1920;
const H = 1080;

const svgMobileCrisp = /* xml */`
<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">
  <defs>
    <!-- Deep Velvet Dark Canvas -->
    <radialGradient id="mBg" cx="50%" cy="35%" r="75%">
      <stop offset="0%" stop-color="#14141a"/>
      <stop offset="50%" stop-color="#08080a"/>
      <stop offset="100%" stop-color="#020203"/>
    </radialGradient>

    <!-- Clean Avatar Backlight Halo (Positioned at bottom center) -->
    <radialGradient id="mAvatarGlow" cx="50%" cy="84%" r="40%">
      <stop offset="0%" stop-color="#ff4d00" stop-opacity="0.5"/>
      <stop offset="35%" stop-color="#ff4d00" stop-opacity="0.16"/>
      <stop offset="70%" stop-color="#ff4d00" stop-opacity="0.02"/>
      <stop offset="100%" stop-color="#ff4d00" stop-opacity="0"/>
    </radialGradient>

    <!-- Laser Line Gradient -->
    <linearGradient id="mLaser" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#ff4d00" stop-opacity="0"/>
      <stop offset="25%" stop-color="#ff4d00" stop-opacity="0.9"/>
      <stop offset="50%" stop-color="#ffffff"/>
      <stop offset="75%" stop-color="#ff4d00" stop-opacity="0.9"/>
      <stop offset="100%" stop-color="#ff4d00" stop-opacity="0"/>
    </linearGradient>
  </defs>

  <!-- Background Base -->
  <rect width="${W}" height="${H}" fill="url(#mBg)"/>

  <!-- Avatar Halo Docking Glow (Bottom Center) -->
  <rect width="${W}" height="${H}" fill="url(#mAvatarGlow)"/>

  <!-- Clean Minimal Matrix Lines (Only 4 bold lines, ultra clean for compression) -->
  <g opacity="0.04" stroke="#ffffff" stroke-width="2">
    <line x1="480" y1="0" x2="480" y2="${H}"/>
    <line x1="1440" y1="0" x2="1440" y2="${H}"/>
    <line x1="0" y1="280" x2="${W}" y2="280"/>
  </g>

  <!-- ================= UPPER SAFE ZONE CONTENT (CLEAR OF AVATAR) ================= -->
  <g text-anchor="middle">
    <!-- Top Category Tag (Big & Readable on iPhone) -->
    <text x="960" y="200" font-family="'JetBrains Mono', monospace" font-size="22" font-weight="700" fill="#ff4d00" letter-spacing="0.4em">
      &lt;WEB PRODUCTION &amp; HIGH-LOAD SYSTEMS /&gt;
    </text>

    <!-- Massive Crisp Headline (Razor Sharp) -->
    <text x="960" y="290" font-family="'Unbounded', sans-serif" font-size="68" font-weight="900" fill="#f4f4f2" letter-spacing="-0.02em">
      WE BUILD DIGITAL SYSTEMS THAT SCALE<tspan fill="#ff4d00">.</tspan>
    </text>

    <!-- Laser Divider Line with Specular Diamond -->
    <line x1="400" y1="340" x2="1520" y2="340" stroke="url(#mLaser)" stroke-width="2.5"/>
    <polygon points="960,332 968,340 960,348 952,340" fill="#ffffff"/>

    <!-- Clear Studio Subtitle (Readable on mobile) -->
    <text x="960" y="395" font-family="'JetBrains Mono', monospace" font-size="20" font-weight="600" fill="#8b8b93" letter-spacing="0.25em">
      САЙТЫ • СЕРВИСЫ • АВТОМАТИЗАЦИЯ ДЛЯ БИЗНЕСА
    </text>
  </g>

  <!-- ================= AVATAR DOCKING RINGS (BEHIND CIRCLE) ================= -->
  <g stroke="rgba(255,255,255,0.1)" fill="none" stroke-width="2">
    <circle cx="960" cy="920" r="300" stroke-dasharray="8 10"/>
    <circle cx="960" cy="920" r="230" stroke="rgba(255,77,0,0.3)" stroke-width="2" stroke-dasharray="6 8"/>
  </g>
</svg>
`.trim();

async function run() {
  console.log('Rendering Mobile-Optimized Ultra-Crisp Banners...');

  // 1. Master Crisp JPG (Highest Quality 98% sRGB)
  await sharp(Buffer.from(svgMobileCrisp))
    .jpeg({ quality: 98, progressive: false, chromaSubsampling: '4:4:4' })
    .toFile(path.join(__dirname, '../public/whatsapp_banner_crisp.jpg'));
  console.log('✓ whatsapp_banner_crisp.jpg saved');

  // 2. Master Crisp PNG
  await sharp(Buffer.from(svgMobileCrisp))
    .png({ compressionLevel: 9 })
    .toFile(path.join(__dirname, '../public/whatsapp_banner_crisp.png'));
  console.log('✓ whatsapp_banner_crisp.png saved');

  // Overwrite default
  await sharp(Buffer.from(svgMobileCrisp))
    .jpeg({ quality: 98, chromaSubsampling: '4:4:4' })
    .toFile(path.join(__dirname, '../public/whatsapp_banner_master.jpg'));
  console.log('✓ whatsapp_banner_master.jpg updated with Mobile Crisp version!');
}

run();
