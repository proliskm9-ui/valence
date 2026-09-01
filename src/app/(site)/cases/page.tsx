import type { Metadata } from 'next';
import { SITE } from '@/lib/site';
import CasesPageClient from './CasesPageClient';

export const metadata: Metadata = {
  title: `Кейсы — ${SITE.name}`,
  description:
    'Живые проекты: от задачи бизнеса до работающего сайта. MestiDelivery, RETRO ZAZ и другие работы студии.',
  alternates: { canonical: `${SITE.url}/cases` },
  openGraph: {
    title: `Кейсы — ${SITE.name}`,
    description: 'Живые проекты: от задачи бизнеса до работающего сайта.',
    url: `${SITE.url}/cases`,
  },
};

export default function CasesPage() {
  return <CasesPageClient />;
}
