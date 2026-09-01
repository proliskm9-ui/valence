// Константы сайта Valence.
export const SITE = {
  name: 'Valence',
  title: 'Valence· — дизайн, который продаёт',
  description:
    'Сайты и автоматизации для бизнеса. Проектируем путь клиента от первого экрана до заявки.',
  url: 'https://valence.agency',
  email: 'valence.agency@gmail.com',
  telegram: 'https://t.me/valencedigital',
  whatsapp: {
    ge: 'https://wa.me/995598902876?text=%E1%83%92%E1%83%90%E1%83%9B%E1%83%90%E1%83%A0%E1%83%AF%E1%83%9D%E1%83%91%E1%83%90!%20%E1%83%9B%E1%83%A1%E1%83%A3%E1%83%A0%E1%83%A1%20%E1%83%9E%E1%83%A0%E1%83%9D%E1%83%94%E1%83%A5%E1%83%A2%E1%83%98%E1%83%A1%20%E1%83%92%E1%83%90%E1%83%9C%E1%83%AE%E1%83%98%E1%83%9A%E1%83%95%E1%83%90.',
    ru: 'https://wa.me/79953173544?text=%D0%97%D0%B4%D1%80%D0%B0%D0%B2%D1%81%D1%82%D0%B2%D1%83%D0%B9%D1%82%D0%B5!%20%D0%A5%D0%BE%D1%87%D1%83%20%D0%BE%D0%B1%D1%81%D1%83%D0%B4%D0%B8%D1%82%D1%8C%20%D1%80%D0%B0%D0%B7%D1%80%D0%B0%D0%B1%D0%BE%D1%82%D0%BA%D1%83%20%D0%BF%D1%80%D0%BE%D0%B5%D0%BA%D1%82%D0%B0%20%D0%B2%20Valence.',
    en: 'https://wa.me/79953173544?text=Hello!%20I%20would%20like%20to%20discuss%20a%20project%20with%20Valence.',
  },
} as const;

export function getWhatsAppUrl(lang: 'ru' | 'en' | 'ka') {
  if (lang === 'ka') return SITE.whatsapp.ge;
  if (lang === 'en') return SITE.whatsapp.en;
  return SITE.whatsapp.ru;
}

export const EASE_OUT_EXPO = [0.16, 1, 0.3, 1] as const;
