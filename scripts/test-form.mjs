import puppeteer from 'puppeteer-core';
const SS = process.argv[2];
const browser = await puppeteer.launch({ executablePath: 'C:/Program Files/Google/Chrome/Application/chrome.exe', headless: 'new', args: ['--disable-gpu', '--hide-scrollbars'] });
const page = await browser.newPage();
await page.setViewport({ width: 1440, height: 900 });
await page.goto('http://localhost:3010/?np=1', { waitUntil: 'networkidle0' });
await page.evaluate(() => document.querySelector('#contact')?.scrollIntoView({ behavior: 'instant' }));
await new Promise(r => setTimeout(r, 800));

// 1) пустая отправка — должны появиться ошибки валидации
await page.click('button[type="submit"]');
await new Promise(r => setTimeout(r, 400));
await page.screenshot({ path: SS + '/form-errors.png' });

// 2) заполняем и отправляем
await page.type('input[name="name"]', 'Тест Тестович');
await page.type('input[name="contact"]', '@test_telegram');
await page.type('textarea[name="message"]', 'Нужен сайт для доставки еды, есть меню и брендбук.');
await page.select('select[name="budget"]', '100–300 тыс. ₽');
await page.click('button[type="submit"]');
await new Promise(r => setTimeout(r, 2500));
await page.screenshot({ path: SS + '/form-success.png' });

const state = await page.evaluate(() => document.body.innerText.includes('Заявка ушла'));
console.log('success state visible:', state);
await browser.close();
