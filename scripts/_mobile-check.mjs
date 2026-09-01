import puppeteer from 'puppeteer-core';

const CHROME = 'C:/Program Files/Google/Chrome/Application/chrome.exe';
const url = process.argv[2] || 'http://localhost:3000/';

const browser = await puppeteer.launch({
  executablePath: CHROME,
  headless: 'new',
  args: ['--disable-gpu', '--hide-scrollbars'],
});
const page = await browser.newPage();
await page.emulate({
  viewport: { width: 390, height: 844, isMobile: true, hasTouch: true, deviceScaleFactor: 3 },
  userAgent:
    'Mozilla/5.0 (iPhone; CPU iPhone OS 17_5 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.5 Mobile/15E148 Safari/604.1',
});

const client = await page.target().createCDPSession();
// Throttle like a shaky mobile hotspot: ~1.5Mbps down, 750kbps up, 100ms latency
await client.send('Network.emulateNetworkConditions', {
  offline: false,
  downloadThroughput: (1.5 * 1024 * 1024) / 8,
  uploadThroughput: (0.75 * 1024 * 1024) / 8,
  latency: 100,
});

const errors = [];
page.on('console', (msg) => {
  if (msg.type() === 'error') errors.push(msg.text());
});
page.on('pageerror', (err) => errors.push('pageerror: ' + err.message));
page.on('requestfailed', (req) => errors.push('requestfailed: ' + req.url() + ' ' + (req.failure()?.errorText || '')));

await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 60000 });

const start = Date.now();
for (let i = 0; i < 20; i++) {
  await new Promise((r) => setTimeout(r, 1000));
  const state = await page.evaluate(() => {
    const pctEl = document.querySelector('.tabular-nums');
    return {
      pct: pctEl?.textContent,
      preloaderGone: !document.body.innerHTML.includes('tabular-nums'),
    };
  });
  console.log(`t=${Date.now() - start}ms`, state);
  if (state.preloaderGone) break;
}

await page.screenshot({ path: '.audit-shots/mobile-check.png' });
console.log('\nERRORS:', JSON.stringify(errors, null, 2));
await browser.close();
