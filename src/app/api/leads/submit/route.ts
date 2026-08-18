import { NextResponse } from 'next/server';
import { addLead } from '@/lib/db';

export const dynamic = 'force-static';

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const { name, contact, message, budget, niche } = body;
    if (!name || !contact || !message) {
      return NextResponse.json({ error: 'Missing fields' }, { status: 400 });
    }

    const lead = addLead({ name, contact, message, budget, niche });

    const botToken = process.env.TELEGRAM_BOT_TOKEN;
    const chatId = process.env.TELEGRAM_CHAT_ID;

    if (botToken && chatId) {
      // HTML escape helper to preserve _ * [ ] without breaking Telegram rendering
      const escapeHtml = (str: string) =>
        str
          .replace(/&/g, '&amp;')
          .replace(/</g, '&lt;')
          .replace(/>/g, '&gt;');

      const leadMsg =
        `<b>🚀 НОВАЯ ЗАЯВКА С САЙТА VALENCE</b>\n\n` +
        `👤 <b>Имя / Компания:</b> ${escapeHtml(lead.name)}\n` +
        `📞 <b>Контакты:</b> ${escapeHtml(lead.contact)}\n` +
        `💳 <b>Бюджет:</b> ${escapeHtml(lead.budget || 'Не указан')}\n` +
        `🏷 <b>Ниша:</b> ${escapeHtml(lead.niche || 'Разработка')}\n\n` +
        `💬 <b>Задача:</b> ${escapeHtml(lead.message)}\n\n` +
        `🔗 <i>Заявка записана в CRM /admin</i>`;

      try {
        const tgRes = await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            chat_id: chatId,
            text: leadMsg,
            parse_mode: 'HTML',
          }),
        });
        const tgJson = await tgRes.json();
        console.log('Telegram API Response:', tgJson);
      } catch (tgErr) {
        console.error('Failed to dispatch telegram notification:', tgErr);
      }
    }

    return NextResponse.json({ ok: true, lead });
  } catch (err) {
    return NextResponse.json({ error: 'Failed to process lead' }, { status: 500 });
  }
}

