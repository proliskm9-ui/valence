'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { m, AnimatePresence } from 'framer-motion';
import { useLanguage } from '@/components/providers/LanguageProvider';

const CONSENT_KEY = 'valence:cookie_consent';
const DISMISS_KEY = 'valence:cookie_dismissed';

export default function CookieBanner() {
  const [visible, setVisible] = useState(false);
  const { t } = useLanguage();

  useEffect(() => {
    const consent = localStorage.getItem(CONSENT_KEY);
    const dismissedThisSession = sessionStorage.getItem(DISMISS_KEY);
    if (!consent && !dismissedThisSession) {
      // небольшой тайм-аут для плавного появления
      const timer = setTimeout(() => setVisible(true), 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem(CONSENT_KEY, 'granted');
    setVisible(false);
  };

  // Тихо скрыть до конца сессии, не фиксируя согласие — баннер вернётся
  // в следующий визит. Снимает раздражение на маленьком экране, где
  // баннер иначе перекрывает почти треть страницы.
  const handleDismiss = () => {
    sessionStorage.setItem(DISMISS_KEY, '1');
    setVisible(false);
  };

  return (
    <AnimatePresence>
      {visible && (
        <m.div
          initial={{ y: 80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 80, opacity: 0 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="fixed inset-x-4 bottom-4 z-[80] mx-auto max-w-xl md:inset-x-auto md:bottom-6 md:left-10"
        >
          <div className="relative flex flex-col items-start gap-3 rounded-2xl border border-line bg-bg2/90 p-4 pr-8 shadow-2xl backdrop-blur-xl md:flex-row md:items-center md:justify-between md:gap-6 md:p-6 md:pr-6">
            <button
              type="button"
              aria-label={t.nav.close}
              data-cursor="hover"
              onClick={handleDismiss}
              className="absolute right-2.5 top-2.5 flex h-6 w-6 items-center justify-center rounded-full text-muted transition-colors hover:text-fg md:hidden"
            >
              <span aria-hidden className="text-base leading-none">×</span>
            </button>
            <p className="text-xs leading-relaxed text-muted md:text-sm">
              {t.cookie.text}{' '}
              <Link
                href="/privacy"
                data-cursor="hover"
                className="underline decoration-line/60 underline-offset-2 transition-colors hover:text-fg hover:decoration-fg"
              >
                {t.cookie.privacy}
              </Link>
            </p>
            <div className="flex items-center gap-3 shrink-0">
              <button
                type="button"
                data-cursor="hover"
                onClick={handleAccept}
                className="rounded-full bg-accent px-5 py-2 font-mono text-[11px] font-semibold uppercase tracking-widest text-bg transition-transform hover:scale-[1.04] active:scale-[0.97]"
              >
                {t.cookie.accept}
              </button>
            </div>
          </div>
        </m.div>
      )}
    </AnimatePresence>
  );
}
