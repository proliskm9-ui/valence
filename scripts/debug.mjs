import puppeteer from 'puppeteer-core';
const browser = await puppeteer.launch({ executablePath: 'C:/Program Files/Google/Chrome/Application/chrome.exe', headless: 'new', args: ['--disable-gpu'] });
const page = await browser.newPage();
await page.setViewport({ width: 1440, height: 900 });
await page.goto('http://localhost:3010/?np=1', { waitUntil: 'networkidle0' });
await page.evaluate(() => document.querySelector('#services')?.scrollIntoView({ behavior: 'instant' }));
await new Promise(r => setTimeout(r, 1200));
const info = await page.evaluate(() => {
  const h2 = document.querySelector('#services h2');
  const cs = h2 ? getComputedStyle(h2) : null;
  const r = h2?.getBoundingClientRect();
  return { text: h2?.textContent, transform: cs?.transform, opacity: cs?.opacity, rect: r ? { top: r.top, height: r.height } : null };
});
console.log(JSON.stringify(info));
await browser.close();
