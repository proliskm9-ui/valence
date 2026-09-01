import { getAIResponse } from '../src/lib/ai-knowledge.ts';

const testCases = [
  'сколько делать сможете сайта ау',
  'что такое сайт',
  'за сколько сделаете лендинг?',
  'сколько стоит разработка',
  'почему next.js а не тильда?',
  'что такое лендинг',
  'что такое pwa',
  'что такое seo',
  'у меня нет тз, поможете?',
  'покажите кейсы',
  'какие способы оплаты',
  'ау',
  'ты бот?',
  'привет!',
  'дорого'
];

console.log('── TESTING AI KNOWLEDGE ENGINE ──\n');

for (const q of testCases) {
  const res = getAIResponse(q, 'ru');
  console.log(`[USER]: "${q}"`);
  console.log(`[BOT INTENT DETECTED / FIRST LINE]: ${res.text.split('\n')[0]}`);
  console.log(`[ACTION]: ${res.suggestedAction?.label} -> ${res.suggestedAction?.action}\n`);
}
