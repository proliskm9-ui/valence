import fs from 'fs';
import path from 'path';

// Standalone Polling Telegram Bot Worker
const envPath = path.join(process.cwd(), '.env.local');

function loadEnv() {
  if (fs.existsSync(envPath)) {
    const lines = fs.readFileSync(envPath, 'utf-8').split('\n');
    for (const line of lines) {
      const match = line.match(/^\s*([\w.-]+)\s*=\s*(.*)?\s*$/);
      if (match) {
        const key = match[1];
        let value = match[2] || '';
        if (value.startsWith('"') && value.endsWith('"')) value = value.slice(1, -1);
        if (value.startsWith("'") && value.endsWith("'")) value = value.slice(1, -1);
        process.env[key] = value.trim();
      }
    }
  }
}

loadEnv();

const BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;

function getBotAdminPasswords(): string[] {
  const list: string[] = ['admin676767', 'admin123'];
  const dedicated = process.env.BOT_ADMIN_PASSWORD?.trim();
  if (dedicated) list.push(dedicated);

  const adminsEnv = process.env.ADMINS?.trim();
  if (adminsEnv) {
    for (const entry of adminsEnv.split(',')) {
      const colonIdx = entry.indexOf(':');
      if (colonIdx >= 1) {
        const pass = entry.slice(colonIdx + 1).trim();
        if (pass) list.push(pass);
      }
    }
  }

  return Array.from(new Set(list));
}

if (!BOT_TOKEN) {
  console.error('❌ TELEGRAM_BOT_TOKEN не найден в .env.local!');
  process.exit(1);
}

console.log('🚀 Valence Telegram Bot Worker успешно запущен в фоновом режиме!');
console.log('🤖 Бот слушает сообщения /start и пароли...');

let offset = 0;

async function pollUpdates() {
  try {
    const res = await fetch(
      `https://api.telegram.org/bot${BOT_TOKEN}/getUpdates?offset=${offset}&timeout=30`
    );
    if (res.ok) {
      const data = await res.json();
      if (data.ok && Array.isArray(data.result)) {
        for (const update of data.result) {
          offset = update.update_id + 1;
          if (update.message && update.message.text) {
            const chatId = update.message.chat.id;
            const text = update.message.text.trim();
            let reply = '';

            if (text === '/start') {
              reply =
                `👋 *Привет! Я официальный бот агентства VALENCE.*\n\n` +
                `🔐 Для привязки уведомлений и получения заявок введите пароль администратора:`;
            } else if (getBotAdminPasswords().includes(text)) {
              saveChatId(chatId.toString());
              reply =
                `✅ *Авторизация успешна!*\n\n` +
                `🆔 Твой Chat ID: \`${chatId}\`\n\n` +
                `⚡️ Я автоматически привязал твой Telegram к CRM Valence! Теперь все заявки с сайта будут прилетать сюда.`;
            } else {
              reply = `❌ *Неверный пароль.* Введите пароль администратора Valence CRM:`;
            }

            await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                chat_id: chatId,
                text: reply,
                parse_mode: 'Markdown',
              }),
            });
          }
        }
      }
    }
  } catch (err) {
    // Silent catch network retry
  } finally {
    setTimeout(pollUpdates, 1000);
  }
}

function saveChatId(chatId: string) {
  try {
    let content = fs.existsSync(envPath) ? fs.readFileSync(envPath, 'utf-8') : '';
    if (content.includes('TELEGRAM_CHAT_ID=')) {
      content = content.replace(/TELEGRAM_CHAT_ID=.*/, `TELEGRAM_CHAT_ID=${chatId}`);
    } else {
      content += `\nTELEGRAM_CHAT_ID=${chatId}`;
    }
    fs.writeFileSync(envPath, content, 'utf-8');
    process.env.TELEGRAM_CHAT_ID = chatId;
    console.log(`✅ Автоматически сохранен TELEGRAM_CHAT_ID=${chatId} в .env.local`);
  } catch (err) {
    console.error('Failed to update .env.local:', err);
  }
}

pollUpdates();

