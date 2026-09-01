import type { Metadata } from 'next';
import { SITE } from '@/lib/site';
import AboutPageClient from './AboutPageClient';

export const metadata: Metadata = {
  title: `О нас — ${SITE.name}`,
  description:
    'Valence — небольшая студия дизайна и разработки. Честные сроки, без шаблонов, прямая связь с исполнителем и результат в цифрах.',
  alternates: { canonical: `${SITE.url}/about` },
  openGraph: {
    title: `О нас — ${SITE.name}`,
    description: 'Почему Valence и как мы работаем иначе.',
    url: `${SITE.url}/about`,
  },
};

export default function AboutPage() {
  return <AboutPageClient />;
}
