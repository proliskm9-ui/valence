import puppeteer from 'puppeteer-core';
import fs from 'fs';
import path from 'path';

const chrome =
  process.env.CHROME ||
  'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const out = path.resolve('public/cases/zaz-shots');
fs.mkdirSync(out, { recursive: true });

const jobs = [
  { name: 'hero', url: 'https://zazretro.web.app/', wait: 2800 },
  { name: 'fleet', url: 'https://zazretro.web.app/fleet.html', wait: 3200, mode: 'fleet' },
  { name: 'services', url: 'https://zazretro.web.app/services.html', wait: 3200, mode: 'services' },
  { name: 'mobile-home', url: 'https://zazretro.web.app/', wait: 2800, mobile: true },
  { name: 'mobile-fleet', url: 'https://zazretro.web.app/fleet.html', wait: 3200, mobile: true, mode: 'fleet' },
];

const browser = await puppeteer.launch({
  executablePath: chrome,
  headless: true,
  args: ['--no-sandbox', '--disable-dev-shm-usage', '--hide-scrollbars', '--font-render-hinting=none'],
});

for (const job of jobs) {
  const page = await browser.newPage();
  if (job.mobile) {
    await page.setViewport({ width: 390, height: 844, deviceScaleFactor: 3, isMobile: true, hasTouch: true });
  } else {
    await page.setViewport({ width: 1440, height: 900, deviceScaleFactor: 2 });
  }

  await page.goto(job.url, { waitUntil: 'networkidle2', timeout: 90000 });
  await page.evaluate(() => {
    document.documentElement.style.scrollBehavior = 'auto';
    const sticky = document.querySelector('header, .site-header, .header');
    if (sticky) sticky.style.boxShadow = 'none';
  });
  await new Promise((r) => setTimeout(r, job.wait));

  if (job.mode === 'fleet') {
    await page.evaluate(() => {
      const headings = [...document.querySelectorAll('h1,h2,h3')];
      const hit = headings.find((h) => /оригинал/i.test(h.textContent || ''));
      const target = hit?.closest('section, article, .card, div') || hit;
      const nudge = window.innerWidth < 500 ? -12 : -48;
      if (target) {
        target.scrollIntoView({ block: 'start' });
        window.scrollBy(0, nudge);
      } else {
        window.scrollTo(0, Math.round(window.innerHeight * 0.85));
      }
    });
    await new Promise((r) => setTimeout(r, 900));
  }

  if (job.mode === 'services') {
    await page.evaluate(() => {
      const headings = [...document.querySelectorAll('h1,h2,h3')];
      const hit = headings.find((h) => /услуг|свадеб|фотосесс/i.test(h.textContent || ''));
      if (hit) {
        hit.scrollIntoView({ block: 'start' });
        window.scrollBy(0, -24);
      } else {
        window.scrollTo(0, Math.round(window.innerHeight * 0.2));
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
