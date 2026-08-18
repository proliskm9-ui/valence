'use client';

import { useEffect, useState } from 'react';
import { m, AnimatePresence } from 'framer-motion';
import { useLanguage } from '@/components/providers/LanguageProvider';

const CONSENT_KEY = 'valence:cookie_consent';

export default function CookieBanner() {
  const [visible, setVisible] = useState(false);
  const { t } = useLanguage();

  useEffect(() => {
    const consent = localStorage.getItem(CONSENT_KEY);
    if (!consent) {
      // небольшой тайм-аут для плавного появления
      const timer = setTimeout(() => setVisible(true), 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem(CONSENT_KEY, 'granted');
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
          className="fixed bottom-6 left-5 right-5 z-[80] mx-auto max-w-xl md:left-10 md:right-auto"
        >
          <div className="flex flex-col items-start gap-4 rounded-2xl border border-line bg-bg2/90 p-5 shadow-2xl backdrop-blur-xl md:flex-row md:items-center md:justify-between md:gap-6 md:p-6">
            <p className="text-xs leading-relaxed text-muted md:text-sm">
              {t.cookie.text}
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
