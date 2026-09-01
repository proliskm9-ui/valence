/**
 * Generates 4 Square (1080x1080) Master Covers for WhatsApp Business Catalog
 */

import sharp from 'sharp';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const SIZE = 1080;

function escapeXml(str = '') {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

// Base SVG generator for catalog cards
function createCardSvg({ category, title, subtitle, accentColor = '#ff4d00', tag, icon }) {
  const safeCat = escapeXml(category);
  const safeTitle = escapeXml(title);
  const safeSub = escapeXml(subtitle);
  const safeTag = escapeXml(tag);
  const safeIcon = escapeXml(icon);

  return /* xml */`
<svg xmlns="http://www.w3.org/2000/svg" width="${SIZE}" height="${SIZE}" viewBox="0 0 ${SIZE} ${SIZE}">
  <defs>
    <radialGradient id="cardBg" cx="50%" cy="30%" r="75%">
      <stop offset="0%" stop-color="#181822"/>
      <stop offset="50%" stop-color="#09090c"/>
      <stop offset="100%" stop-color="#020203"/>
    </radialGradient>

    <radialGradient id="cardGlow" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="${accentColor}" stop-opacity="0.35"/>
      <stop offset="45%" stop-color="${accentColor}" stop-opacity="0.1"/>
      <stop offset="100%" stop-color="${accentColor}" stop-opacity="0"/>
    </radialGradient>

    <linearGradient id="cardLaser" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="${accentColor}" stop-opacity="0"/>
      <stop offset="30%" stop-color="${accentColor}" stop-opacity="0.9"/>
      <stop offset="50%" stop-color="#ffffff"/>
      <stop offset="70%" stop-color="${accentColor}" stop-opacity="0.9"/>
      <stop offset="100%" stop-color="${accentColor}" stop-opacity="0"/>
    </linearGradient>
  </defs>

  <!-- Background Base -->
  <rect width="${SIZE}" height="${SIZE}" fill="url(#cardBg)"/>
  <circle cx="540" cy="540" r="480" fill="url(#cardGlow)"/>

  <!-- Matrix Grid -->
  <g opacity="0.04" stroke="#ffffff" stroke-width="1.5">
    <line x1="180" y1="0" x2="180" y2="${SIZE}"/>
    <line x1="360" y1="0" x2="360" y2="${SIZE}"/>
    <line x1="540" y1="0" x2="540" y2="${SIZE}"/>
    <line x1="720" y1="0" x2="720" y2="${SIZE}"/>
    <line x1="900" y1="0" x2="900" y2="${SIZE}"/>
    <line x1="0" y1="180" x2="${SIZE}" y2="180"/>
    <line x1="0" y1="360" x2="${SIZE}" y2="360"/>
    <line x1="0" y1="540" x2="${SIZE}" y2="540"/>
    <line x1="0" y1="720" x2="${SIZE}" y2="720"/>
    <line x1="0" y1="900" x2="${SIZE}" y2="900"/>
  </g>

  <!-- Framing Frame -->
  <rect x="60" y="60" width="${SIZE - 120}" height="${SIZE - 120}" fill="none" stroke="rgba(255,255,255,0.08)" stroke-width="1.5"/>
  
  <!-- Corner Tech Ticks -->
  <g stroke="${accentColor}" stroke-width="2">
    <path d="M 60,90 L 60,60 L 90,60"/>
    <path d="M ${SIZE - 60},90 L ${SIZE - 60},60 L ${SIZE - 90},60"/>
    <path d="M 60,${SIZE - 90} L 60,${SIZE - 60} L 90,${SIZE - 60}"/>
    <path d="M ${SIZE - 60},${SIZE - 90} L ${SIZE - 60},${SIZE - 60} L ${SIZE - 90},${SIZE - 60}"/>
  </g>

  <!-- Header Category -->
  <g font-family="'JetBrains Mono', monospace">
    <text x="100" y="115" font-size="16" font-weight="700" fill="${accentColor}" letter-spacing="0.35em">&lt; ${safeCat} /&gt;</text>
    <text x="${SIZE - 100}" y="115" font-size="14" fill="rgba(255,255,255,0.3)" text-anchor="end" letter-spacing="0.25em">VALENCE· STUDIO</text>
  </g>

  <!-- Central Visual Symbol / Reticle -->
  <g stroke="rgba(255,255,255,0.12)" fill="none" stroke-width="1.5">
    <circle cx="540" cy="500" r="240" stroke-dasharray="8 10"/>
    <circle cx="540" cy="500" r="180" stroke="${accentColor}" stroke-opacity="0.35" stroke-width="2" stroke-dasharray="6 8"/>
    <circle cx="540" cy="500" r="120" stroke="rgba(255,255,255,0.06)"/>
  </g>

  <!-- Central Feature Icon / Text Badge -->
  <g text-anchor="middle">
    <!-- Big Monogram / Title Badge -->
    <text x="540" y="520" font-family="'Unbounded', sans-serif" font-size="76" font-weight="900" fill="#f4f4f2" letter-spacing="-0.03em">${safeIcon}</text>
  </g>

  <!-- Laser Divider -->
  <line x1="140" y1="720" x2="${SIZE - 140}" y2="720" stroke="url(#cardLaser)" stroke-width="2"/>
  <polygon points="540,713 547,720 540,727 533,720" fill="#ffffff"/>

  <!-- Footer Content -->
  <g text-anchor="middle">
    <text x="540" y="790" font-family="'Unbounded', sans-serif" font-size="38" font-weight="900" fill="#f4f4f2" letter-spacing="-0.02em">
      ${safeTitle}
    </text>
    <text x="540" y="845" font-family="'JetBrains Mono', monospace" font-size="18" font-weight="600" fill="#8b8b93" letter-spacing="0.25em">
      ${safeSub}
    </text>
  </g>

  <!-- Bottom Badge Tag -->
  <g font-family="'JetBrains Mono', monospace" font-size="13" fill="rgba(255,255,255,0.4)" letter-spacing="0.2em">
    <text x="100" y="${SIZE - 95}">STATUS: COMPLETED // VERIFIED</text>
    <text x="${SIZE - 100}" y="${SIZE - 95}" text-anchor="end" fill="${accentColor}">${safeTag}</text>
  </g>
</svg>
`.trim();
}

async function run() {
  console.log('Generating WhatsApp Catalog Covers (1080x1080 JPG)...');

  // 1. Кейс Mesti Delivery
  await sharp(Buffer.from(createCardSvg({
    category: 'CASE STUDY // FOODTECH',
    title: 'MESTI DELIVERY',
    subtitle: 'ВЕБ-СЕРВИС ДОСТАВКИ ЕДЫ И ОНЛАЙН-ЗАКАЗОВ',
    accentColor: '#ff4d00',
    tag: 'PRODUCTION READY',
    icon: 'MESTI'
  })))
    .jpeg({ quality: 96, chromaSubsampling: '4:4:4' })
    .toFile(path.join(__dirname, '../public/catalog_case_mesti.jpg'));
  console.log('✓ catalog_case_mesti.jpg created');

  // 2. Кейс ZAZ Energy
  await sharp(Buffer.from(createCardSvg({
    category: 'CASE STUDY // FINTECH & INDUSTRIAL',
    title: 'RETRO ZAZ 968',
    subtitle: 'МЕЖДУНАРОДНЫЙ ИНТЕРАКТИВНЫЙ ПРОЕКТ',
    accentColor: '#ff4d00',
    tag: 'GLOBAL DEPLOY',
    icon: 'ZAZ'
  })))
    .jpeg({ quality: 96, chromaSubsampling: '4:4:4' })
    .toFile(path.join(__dirname, '../public/catalog_case_zaz.jpg'));
  console.log('✓ catalog_case_zaz.jpg created');

  // 3. Услуга: Сайты под ключ
  await sharp(Buffer.from(createCardSvg({
    category: 'CORE SERVICE // PRODUCTION',
    title: 'САЙТЫ «ПОД КЛЮЧ»',
    subtitle: 'ЛЕНДИНГИ, КОРПОРАТИВНЫЕ САЙТЫ & E-COMMERCE',
    accentColor: '#ff4d00',
    tag: 'CUSTOM CODE',
    icon: '< WEB />'
  })))
    .jpeg({ quality: 96, chromaSubsampling: '4:4:4' })
    .toFile(path.join(__dirname, '../public/catalog_service_sites.jpg'));
  console.log('✓ catalog_service_sites.jpg created');

  // 4. Услуга: Веб-Сервисы & Автоматизация
  await sharp(Buffer.from(createCardSvg({
    category: 'SYSTEMS & AUTOMATION',
    title: 'СЕРВИСЫ & CRM',
    subtitle: 'АВТОМАТИЗАЦИЯ БИЗНЕСА И TELEGRAM-БОТЫ',
    accentColor: '#ff4d00',
    tag: 'HIGH-LOAD API',
    icon: 'SYS.01'
  })))
    .jpeg({ quality: 96, chromaSubsampling: '4:4:4' })
    .toFile(path.join(__dirname, '../public/catalog_service_automation.jpg'));
  console.log('✓ catalog_service_automation.jpg created');

  console.log('All 4 Catalog Covers ready!');
}

run();
