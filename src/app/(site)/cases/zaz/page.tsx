import type { Metadata } from 'next';
import { SITE } from '@/lib/site';
import ZazPageClient from './ZazPageClient';

export const metadata: Metadata = {
  title: `RETRO ZAZ — кейс ${SITE.name}`,
  description:
    'Лендинг проката ретро-автомобиля ЗАЗ-965: атмосфера легенды и прямая форма бронирования даты.',
  alternates: { canonical: `${SITE.url}/cases/zaz` },
  openGraph: {
    title: `RETRO ZAZ — кейс ${SITE.name}`,
    description: 'Лендинг проката ретро-автомобиля ЗАЗ-965 — атмосфера легенды вместо холодного каталога аренды.',
    url: `${SITE.url}/cases/zaz`,
  },
};

export default function ZazCasePage() {
  return <ZazPageClient />;
}
