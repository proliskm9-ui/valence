import puppeteer from 'puppeteer-core';
import sharp from 'sharp';
import path from 'path';

/**
 * EN hero = same pixel box as RU hero.png (viewport derived from RU size).
 * Then align cream header band to RU (pad top / crop bottom) so MacBook
 * object-fit:cover crops both languages identically.
 */
const chrome =
  process.env.CHROME ||
  'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const out = path.resolve('public/cases/zaz-shots/en/hero.png');
const ruPath = path.resolve('public/cases/zaz-shots/hero.png');
const CREAM = { r: 239, g: 228, b: 204, alpha: 1 };

const ru = await sharp(ruPath).metadata();
const VW = Math.round((ru.width || 2880) / 2);
const VH = Math.round((ru.height || 1852) / 2);

async function headerEnd(file) {
  const meta = await sharp(file).metadata();
  const w = 120;
  const h = Math.min(400, meta.height || 400);
  const { data, info } = await sharp(file)
    .extract({
      left: Math.floor((meta.width || 0) / 2) - 60,
      top: 0,
      width: w,
      height: h,
    })
    .raw()
    .toBuffer({ resolveWithObject: true });
  let end = 0;
  for (let y = 0; y < h; y++) {
    let avg = 0;
    for (let x = 0; x < w; x++) {
      const i = (y * w + x) * info.channels;
      avg += (data[i] + data[i + 1] + data[i + 2]) / 3;
    }
    avg /= w;
    if (avg > 180) end = y;
    else if (end > 40 && avg < 100) break;
  }
  return end;
}

const browser = await puppeteer.launch({
  executablePath: chrome,
  headless: true,
  args: [
    '--no-sandbox',
    '--disable-dev-shm-usage',
    '--hide-scrollbars',
    '--font-render-hinting=none',
  ],
});

const page = await browser.newPage();
await page.setViewport({ width: VW, height: VH, deviceScaleFactor: 2 });
await page.goto('https://zazretro.web.app/?lang=en', {
  waitUntil: 'networkidle2',
  timeout: 90000,
});

await page.evaluate(() => {
  document.documentElement.style.scrollBehavior = 'auto';
  window.scrollTo(0, 0);
  const sticky = document.querySelector('.site-header, header');
  if (sticky) sticky.style.boxShadow = 'none';
  document.querySelectorAll('.hero-meta').forEach((el) => {
    el.style.setProperty('display', 'none', 'important');
  });
});

await new Promise((r) => setTimeout(r, 3000));
const raw = Buffer.from(await page.screenshot({ type: 'png' }));
await browser.close();

await sharp(raw).png().toFile(out);

const ruH = await headerEnd(ruPath);
const enH = await headerEnd(out);
const pad = ruH - enH;

if (pad > 0) {
  const buf = await sharp(out)
    .extend({ top: pad, bottom: 0, left: 0, right: 0, background: CREAM })
    .toBuffer();
  await sharp(buf)
    .extract({ left: 0, top: 0, width: ru.width, height: ru.height })
    .png({ compressionLevel: 8 })
    .toFile(out);
} else if (pad < 0) {
  // EN header taller — crop top cream overflow, pad bottom with page bottom color
  const buf = await sharp(out)
    .extract({
      left: 0,
      top: -pad,
      width: ru.width,
      height: ru.height,
    })
    .png()
    .toFile(out);
}

const done = await sharp(out).metadata();
const finalH = await headerEnd(out);
if (done.width !== ru.width || done.height !== ru.height) {
  throw new Error(`size ${done.width}x${done.height} != RU ${ru.width}x${ru.height}`);
}
if (finalH !== ruH) {
  console.warn(`headerEnd EN ${finalH} vs RU ${ruH}`);
}
console.log(
  `OK EN ${done.width}x${done.height} headerEnd=${finalH} (RU ${ruH}) viewport ${VW}x${VH}@2 padTop=${Math.max(0, pad)}`,
);
