import type { Metadata } from 'next';
import { SITE } from '@/lib/site';
import PrivacyPageClient from './PrivacyPageClient';

export const metadata: Metadata = {
  title: `Политика конфиденциальности — ${SITE.name}`,
  description: 'Какие данные собирает Valence, зачем и как ими пользуется.',
  alternates: { canonical: `${SITE.url}/privacy` },
  robots: { index: true, follow: true },
};

export default function PrivacyPage() {
  return <PrivacyPageClient />;
}
