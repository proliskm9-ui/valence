import puppeteer from 'puppeteer-core';
import path from 'path';
import fs from 'fs';

const chrome = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const out = path.resolve('public/cases/zaz-shots');
fs.mkdirSync(out, { recursive: true });

const jobs = [
  { name: 'mobile-home', url: 'https://zazretro.web.app/', wait: 2800 },
  { name: 'mobile-fleet', url: 'https://zazretro.web.app/fleet.html', wait: 3200, mode: 'fleet' },
  { name: 'mobile-services', url: 'https://zazretro.web.app/services.html', wait: 3200, mode: 'services' },
];

const browser = await puppeteer.launch({
  executablePath: chrome,
  headless: true,
  args: ['--no-sandbox', '--disable-dev-shm-usage', '--hide-scrollbars'],
});

for (const job of jobs) {
  const page = await browser.newPage();
  await page.setViewport({ width: 390, height: 844, deviceScaleFactor: 3, isMobile: true, hasTouch: true });
  await page.goto(job.url, { waitUntil: 'networkidle2', timeout: 90000 });
  await new Promise((r) => setTimeout(r, job.wait));

  if (job.mode === 'fleet') {
    await page.evaluate(() => {
      const hit = [...document.querySelectorAll('h1,h2,h3')].find((h) => /оригинал/i.test(h.textContent || ''));
      const target = hit?.closest('section, article, div') || hit;
      if (target) {
        target.scrollIntoView({ block: 'start' });
        window.scrollBy(0, -12);
      } else {
        window.scrollTo(0, Math.round(window.innerHeight * 0.9));
      }
    });
    await new Promise((r) => setTimeout(r, 900));
  }

  if (job.mode === 'services') {
    await page.evaluate(() => {
      const hit = [...document.querySelectorAll('h1,h2,h3')].find((h) =>
        /фотосесс|свадеб|услуг/i.test(h.textContent || ''),
      );
      if (hit) {
        hit.scrollIntoView({ block: 'start' });
        window.scrollBy(0, -8);
      } else {
        window.scrollTo(0, Math.round(window.innerHeight * 0.35));
      }
    });
    await new Promise((r) => setTimeout(r, 900));
  }

  const file = path.join(out, `${job.name}.png`);
  await page.screenshot({ path: file, type: 'png' });
  console.log('saved', file);
  await page.close();
}

await browser.close();
