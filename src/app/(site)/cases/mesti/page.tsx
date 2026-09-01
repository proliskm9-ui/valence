import type { Metadata } from 'next';
import { SITE } from '@/lib/site';
import MestiPageClient from './MestiPageClient';

export const metadata: Metadata = {
  title: `MestiDelivery — кейс ${SITE.name}`,
  description:
    'PWA-сервис доставки еды в Местии: каталог ресторанов, корзина, карта адреса и мультиязычность.',
  alternates: { canonical: `${SITE.url}/cases/mesti` },
  openGraph: {
    title: `MestiDelivery — кейс ${SITE.name}`,
    description: 'Сервис доставки еды в Местии — с телефона и с десктопа, без единого шаблонного экрана.',
    url: `${SITE.url}/cases/mesti`,
  },
};

export default function MestiCasePage() {
  return <MestiPageClient />;
}
