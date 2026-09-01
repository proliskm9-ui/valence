import type { Metadata } from 'next';
import ContactForm from '@/components/sections/ContactForm';
import Footer from '@/components/layout/Footer';
import { SITE } from '@/lib/site';

export const metadata: Metadata = {
  title: `Контакты — ${SITE.name}`,
  description: 'Опишите задачу — ответим в течение рабочего дня со сроком и ценой.',
  alternates: { canonical: `${SITE.url}/contact` },
  openGraph: {
    title: `Контакты — ${SITE.name}`,
    description: 'Опишите задачу — ответим в течение рабочего дня со сроком и ценой.',
    url: `${SITE.url}/contact`,
  },
};

export default function ContactPage() {
  return (
    <>
      <div className="pt-16 md:pt-20">
        <ContactForm headingAs="h1" />
      </div>
      <Footer />
    </>
  );
}
