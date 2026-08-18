import puppeteer from 'puppeteer-core';
const SS = process.argv[2];
const browser = await puppeteer.launch({ executablePath: 'C:/Program Files/Google/Chrome/Application/chrome.exe', headless: 'new', args: ['--disable-gpu', '--hide-scrollbars'] });
const page = await browser.newPage();
await page.setViewport({ width: 1440, height: 900 });
await page.goto('http://localhost:3010/?np=1', { waitUntil: 'networkidle0' });

// hover по строке услуг
await page.evaluate(() => document.querySelector('#services')?.scrollIntoView({ behavior: 'instant' }));
await new Promise(r => setTimeout(r, 700));
const row = await page.$('#services ul li:nth-child(2) > div');
const box = await row.boundingBox();
await page.mouse.move(box.x + 400, box.y + box.height / 2, { steps: 5 });
await new Promise(r => setTimeout(r, 700));
await page.screenshot({ path: SS + '/hover-service.png' });

// hover по кейсу — курсор «Смотреть»
await page.evaluate(() => document.querySelector('#work')?.scrollIntoView({ behavior: 'instant' }));
await new Promise(r => setTimeout(r, 700));
const card = await page.$('#work article a > div');
const cbox = await card.boundingBox();
await page.mouse.move(cbox.x + cbox.width / 2, cbox.y + cbox.height / 2, { steps: 5 });
await new Promise(r => setTimeout(r, 900));
await page.screenshot({ path: SS + '/hover-case.png' });
await browser.close();
console.log('ok');
