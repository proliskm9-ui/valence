/**
 * Converts WhatsApp banner into multiple WhatsApp-compliant formats:
 * - High-res JPEG (sRGB, 95% quality)
 * - Exact WhatsApp Business resolution 1024x576 (16:9) JPEG & PNG
 * - 1200x675 JPEG
 */

import sharp from 'sharp';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const inputPng = path.join(__dirname, '../public/whatsapp_banner_master.png');

async function run() {
  console.log('Generating WhatsApp-compatible JPG and resized formats...');

  // 1. Full-res 1920x1080 JPG (sRGB, progressive, fast loading, < 300KB)
  await sharp(inputPng)
    .jpeg({ quality: 92, progressive: true, mozjpeg: true })
    .toFile(path.join(__dirname, '../public/whatsapp_banner_master.jpg'));
  console.log('✓ whatsapp_banner_master.jpg (1920x1080 JPEG) created');

  // 2. Exact WhatsApp Business standard 1024x576 JPG (16:9 recommended by Meta)
  await sharp(inputPng)
    .resize(1024, 576, { fit: 'cover' })
    .jpeg({ quality: 94, progressive: true, mozjpeg: true })
    .toFile(path.join(__dirname, '../public/whatsapp_banner_1024x576.jpg'));
  console.log('✓ whatsapp_banner_1024x576.jpg created');

  // 3. Exact WhatsApp Business standard 1024x576 PNG
  await sharp(inputPng)
    .resize(1024, 576, { fit: 'cover' })
    .png({ compressionLevel: 9 })
    .toFile(path.join(__dirname, '../public/whatsapp_banner_1024x576.png'));
  console.log('✓ whatsapp_banner_1024x576.png created');

  // 4. Standard 1200x675 JPG
  await sharp(inputPng)
    .resize(1200, 675, { fit: 'cover' })
    .jpeg({ quality: 94, progressive: true, mozjpeg: true })
    .toFile(path.join(__dirname, '../public/whatsapp_banner_1200x675.jpg'));
  console.log('✓ whatsapp_banner_1200x675.jpg created');

  console.log('All WhatsApp formats ready!');
}

run();
