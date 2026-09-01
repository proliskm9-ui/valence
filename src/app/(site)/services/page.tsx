import type { Metadata } from 'next';
import { SITE } from '@/lib/site';
import ServicesPageClient from './ServicesPageClient';

export const metadata: Metadata = {
  title: `Услуги — ${SITE.name}`,
  description:
    'Сайты, автоматизации, дизайн и интеграции. Что входит в работу, для кого и в какие сроки.',
  alternates: { canonical: `${SITE.url}/services` },
  openGraph: {
    title: `Услуги — ${SITE.name}`,
    description: 'Разбираем каждое направление подробно: что входит в работу, для кого оно подходит и сколько занимает по времени.',
    url: `${SITE.url}/services`,
  },
};

export default function ServicesPage() {
  return <ServicesPageClient />;
}
