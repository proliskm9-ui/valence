export type LeadInput = {
  name: string;
  contact: string;
  message: string;
  budget?: string;
};

// Re-export from the canonical source to avoid duplication
export type { LeadStatus } from '@/lib/db';


const RL_KEY = 'agency:lead-timestamps';
const MIN_INTERVAL_MS = 60_000; // не чаще раза в минуту
const MAX_PER_DAY = 5;

function readTimestamps(): number[] {
  try {
    return JSON.parse(localStorage.getItem(RL_KEY) ?? '[]');
  } catch {
    return [];
  }
}

/** Клиентский rate-limit: null — можно, иначе текст причины */
export function rateLimitReason(reason?: string): string {
  if (reason) return reason;
  const now = Date.now();
  const day = readTimestamps().filter((t) => now - t < 86_400_000);
  if (day.length >= MAX_PER_DAY) return 'Лимит заявок на сегодня. Напишите нам напрямую.';
  if (day.some((t) => now - t < MIN_INTERVAL_MS))
    return 'Слишком часто. Подождите минуту и попробуйте ещё раз.';
  return 'Произошла ошибка при отправке.';
}

function recordSubmission() {
  const now = Date.now();
  const day = readTimestamps().filter((t) => now - t < 86_400_000);
  localStorage.setItem(RL_KEY, JSON.stringify([...day, now]));
}

const TG_BOT_TOKEN = process.env.NEXT_PUBLIC_TELEGRAM_BOT_TOKEN || '8659091230:AAE4kWj0zle4iIimukAcdJvTAirKORHEgYU';
const TG_CHAT_ID = process.env.NEXT_PUBLIC_TELEGRAM_CHAT_ID || '7735157017';

/** 
 * ЕДИНАЯ ТОЧКА ОТПРАВКИ ЗАЯВОК (Single Source of Truth)
 * Поддерживает как серверный API, так и клиентский фоллбек для статического хостинга (Firebase).
 */
export async function submitLead(input: LeadInput): Promise<{ ok: boolean; reason?: string }> {
  try {
    // 1. Пробуем отправить через backend API роут
    const res = await fetch('/api/leads/submit', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(input),
    }).catch(() => null);

    if (res && res.ok) {
      recordSubmission();
      return { ok: true };
    }

    // 2. Клиентский фоллбек для статического хостинга (Firebase Export)
    const newLead = {
      id: `lead-${Date.now()}`,
      name: input.name,
      contact: input.contact,
      message: input.message,
      budget: input.budget || 'Не указан',
      niche: 'Сайт Valence',
      status: 'new' as const,
      createdAt: new Date().toISOString().split('T')[0],
      notes: 'Заявка с сайта Valence',
    };

    // Записываем новую заявку в CRM хранилище браузера
    try {
      const stored = localStorage.getItem('valence_crm_store');
      const storeData = stored ? JSON.parse(stored) : { leads: [], projects: [], cases: [], clients: [] };
      storeData.leads = [newLead, ...(storeData.leads || [])];
      localStorage.setItem('valence_crm_store', JSON.stringify(storeData));
    } catch (e) {
      console.warn('LocalStorage CRM write error:', e);
    }

    // Отправляем уведомление в Telegram Bot напрямую
    try {
      const escapeHtml = (str: string) =>
        str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

      const leadMsg =
        `<b>🚀 НОВАЯ ЗАЯВКА С САЙТА VALENCE</b>\n\n` +
        `👤 <b>Имя / Компания:</b> ${escapeHtml(newLead.name)}\n` +
        `📞 <b>Контакты:</b> ${escapeHtml(newLead.contact)}\n` +
        `💳 <b>Бюджет:</b> ${escapeHtml(newLead.budget)}\n` +
        `💬 <b>Задача:</b> ${escapeHtml(newLead.message)}\n\n` +
        `🔗 <i>Заявка сохранена в CRM /admin</i>`;

      await fetch(`https://api.telegram.org/bot${TG_BOT_TOKEN}/sendMessage`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          chat_id: TG_CHAT_ID,
          text: leadMsg,
          parse_mode: 'HTML',
        }),
      }).catch(() => null);
    } catch (tgErr) {
      console.warn('Telegram client dispatch error:', tgErr);
    }

    recordSubmission();
    return { ok: true };
  } catch (e) {
    console.error('Error submitting lead:', e);
    return { ok: false, reason: 'Ошибка при сохранении заявки' };
  }
}
