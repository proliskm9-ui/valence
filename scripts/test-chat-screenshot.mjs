import puppeteer from 'puppeteer-core';
import fs from 'fs';

async function takeChatShot() {
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

  // Click the launcher button
  const button = await page.$('aside[aria-label*="Чат"] button');
  if (button) {
    await button.click();
    await new Promise(r => setTimeout(r, 600));

    // Type query
    const input = await page.$('aside[aria-label*="Чат"] input');
    if (input) {
      await input.type('какие сроки реализации');
      await page.keyboard.press('Enter');
      await new Promise(r => setTimeout(r, 800));
    }
  }

  await page.screenshot({ path: '.audit-shots/chat-icons-polish.png' });
  console.log('✓ Master chat screenshot with unified vector icons captured!');

  await browser.close();
}

takeChatShot().catch(console.error);
