'use client';

import { useEffect, useState } from 'react';
import { AnimatePresence, m } from 'framer-motion';
import { useLanguage } from '@/components/providers/LanguageProvider';
import { getWhatsAppUrl } from '@/lib/site';

export default function FloatingWhatsApp() {
  const { lang } = useLanguage();
  const [visible, setVisible] = useState(false);
  const whatsappUrl = getWhatsAppUrl(lang);

  useEffect(() => {
    const handleScroll = () => {
      // Показываем кнопку только когда пользователь проскроллил Hero экран (более 350px)
      setVisible(window.scrollY > 350);
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <aside
      aria-label="Быстрая связь в WhatsApp"
      className="fixed bottom-20 right-5 z-40 pointer-events-none md:bottom-22"
    >
      <AnimatePresence>
        {visible && (
          <m.a
            key="floating-wa"
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            data-cursor="hover"
            aria-label="WhatsApp"
            initial={{ scale: 0, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0, opacity: 0, y: 20 }}
            transition={{ type: 'spring', stiffness: 380, damping: 26 }}
            className="pointer-events-auto group relative flex h-13 w-13 items-center justify-center rounded-full bg-[#25D366] text-white shadow-[0_6px_25px_rgba(37,211,102,0.5)] transition-transform duration-300 hover:scale-110 active:scale-95 md:h-14 md:w-14"
          >
            {/* Pulsing radar ring */}
            <span className="absolute inset-0 rounded-full bg-[#25D366] opacity-35 animate-ping" />

            <svg className="relative z-10 h-6 w-6 fill-current md:h-7 md:w-7" viewBox="0 0 24 24">
              <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
            </svg>
          </m.a>
        )}
      </AnimatePresence>
    </aside>
  );
}
