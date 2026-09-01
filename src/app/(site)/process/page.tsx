import type { Metadata } from 'next';
import { SITE } from '@/lib/site';
import ProcessPageClient from './ProcessPageClient';

export const metadata: Metadata = {
  title: `Процесс работы — ${SITE.name}`,
  description:
    'Четыре шага от созвона до запуска сайта: сроки, что происходит на каждом этапе и частые вопросы.',
  alternates: { canonical: `${SITE.url}/process` },
  openGraph: {
    title: `Процесс работы — ${SITE.name}`,
    description: 'Полный разбор каждого этапа — что происходит, что вы получаете и сколько это занимает.',
    url: `${SITE.url}/process`,
  },
};

export default function ProcessPage() {
  return <ProcessPageClient />;
}
