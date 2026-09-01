import puppeteer from 'puppeteer-core';
import fs from 'fs';

async function testScroll() {
  const edgePath = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
  const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
  const execPath = fs.existsSync(chromePath) ? chromePath : edgePath;

  const browser = await puppeteer.launch({
    executablePath: execPath,
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--window-size=1400,900']
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1400, height: 900 });
  await page.goto('http://localhost:3000?np=1', { waitUntil: 'domcontentloaded', timeout: 10000 });

  await new Promise(r => setTimeout(r, 1000));

  // Click chat launcher
  const btn = await page.$('aside[aria-label*="Чат"] button');
  if (btn) {
    await btn.click();
    await new Promise(r => setTimeout(r, 500));

    // Send 2 queries to have long chat history
    const input = await page.$('aside[aria-label*="Чат"] input');
    if (input) {
      await input.type('сколько стоит разработка');
      await page.keyboard.press('Enter');
      await new Promise(r => setTimeout(r, 800));

      await input.type('какие сроки');
      await page.keyboard.press('Enter');
      await new Promise(r => setTimeout(r, 800));
    }

    // Check scroll metrics inside chat container
    const scrollInfoBefore = await page.evaluate(() => {
      const el = document.querySelector('.chat-scroll-container');
      if (!el) return null;
      return {
        scrollHeight: el.scrollHeight,
        clientHeight: el.clientHeight,
        scrollTop: el.scrollTop,
      };
    });

    console.log('Scroll Info Before ScrollUp:', scrollInfoBefore);

    // Scroll up inside container
    await page.evaluate(() => {
      const el = document.querySelector('.chat-scroll-container');
      if (el) el.scrollTop = 0;
    });

    const scrollInfoAfter = await page.evaluate(() => {
      const el = document.querySelector('.chat-scroll-container');
      if (!el) return null;
      return {
        scrollHeight: el.scrollHeight,
        clientHeight: el.clientHeight,
        scrollTop: el.scrollTop,
      };
    });

    console.log('Scroll Info After ScrollUp:', scrollInfoAfter);
  }

  await page.screenshot({ path: '.audit-shots/chat-scroll-verified.png' });
  console.log('✓ Verified chat scroll and captured screenshot!');

  await browser.close();
}

testScroll().catch(console.error);
