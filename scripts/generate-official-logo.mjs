import sharp from 'sharp';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="512" height="512" viewBox="0 0 64 64">
  <rect width="64" height="64" rx="14" fill="#0a0a0b"/>
  <path d="M16 18 L30 44 L44 18" stroke="#f4f4f2" stroke-width="6.5" stroke-linecap="round" stroke-linejoin="round" fill="none"/>
  <circle cx="49" cy="44" r="5" fill="#ff4d00"/>
</svg>`;

async function main() {
  const buf = Buffer.from(svg);
  const publicDir = path.join(__dirname, '..', 'public');
  
  await sharp(buf).resize(512, 512).png().toFile(path.join(publicDir, 'valence-logo.png'));
  await sharp(buf).resize(512, 512).png().toFile(path.join(publicDir, 'avatar.png'));
  await sharp(buf).resize(512, 512).png().toFile(path.join(publicDir, 'icon.png'));
  await sharp(buf).resize(192, 192).png().toFile(path.join(publicDir, 'favicon.png'));
  
  console.log('✓ Official Valence logo PNGs successfully created in public directory!');
}

main().catch(console.error);
