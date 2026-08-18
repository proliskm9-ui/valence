// Скриншоты страницы через установленный Chrome.
// Использование:
//   node scripts/screenshot.mjs <url> <out.png> [width] [height] [selector] [fullpage]
// Примеры:
//   node scripts/screenshot.mjs "http://localhost:3010/?np=1" shot.png 1440 900 "#services"
//   node scripts/screenshot.mjs "http://localhost:3010/?np=1" full.png 1440 900 - fullpage

import puppeteer from 'puppeteer-core';

const [url, out, w = '1440', h = '900', selector = '-', mode = ''] = process.argv.slice(2);

const CHROME = 'C:/Program Files/Google/Chrome/Application/chrome.exe';

const browser = await puppeteer.launch({
  executablePath: CHROME,
  headless: 'new',
  args: ['--disable-gpu', '--hide-scrollbars', '--force-device-scale-factor=1'],
});

try {
  const page = await browser.newPage();
  await page.setViewport({ width: Number(w), height: Number(h) });
  await page.goto(url, { waitUntil: 'networkidle0', timeout: 45000 });
  await page.evaluate(() => document.fonts.ready);

  if (selector && selector !== '-') {
    await page.evaluate((sel) => {
      document.querySelector(sel)?.scrollIntoView({ behavior: 'instant', block: 'start' });
    }, selector);
    await new Promise((r) => setTimeout(r, 900));
  }

  await page.screenshot({ path: out, fullPage: mode === 'fullpage' });
  console.log('saved:', out);
} finally {
  await browser.close();
}
