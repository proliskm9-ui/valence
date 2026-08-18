'use client';

// ВРЕМЕННО: живой переключатель акцентного цвета, чтобы выбрать вариант.
// После выбора — удалить компонент и зафиксировать --accent в globals.css.

import { useEffect, useState } from 'react';
import { useLanguage } from '@/components/providers/LanguageProvider';

const OPTIONS = [
  { id: 'signal', hex: '#FF4D00', label: 'сигнал' },
  { id: 'acid', hex: '#D7FF3E', label: 'кислота' },
  { id: 'violet', hex: '#7C5CFF', label: 'ультрафиолет' },
] as const;

type AccentId = (typeof OPTIONS)[number]['id'];
const KEY = 'agency:accent';

export default function AccentSwitcher() {
  const [active, setActive] = useState<AccentId>('signal');
  const [hidden, setHidden] = useState(false);
  const { t } = useLanguage();

  useEffect(() => {
    // ?np=1 — режим скриншотов: переключатель не показываем
    if (new URLSearchParams(window.location.search).has('np')) setHidden(true);
    const saved = localStorage.getItem(KEY) as AccentId | null;
    if (saved && OPTIONS.some((o) => o.id === saved)) apply(saved);
  }, []);

  const apply = (id: AccentId) => {
    setActive(id);
    localStorage.setItem(KEY, id);
    if (id === 'signal') delete document.documentElement.dataset.accent;
    else document.documentElement.dataset.accent = id;
  };

  if (hidden) return null;

  return (
    <div className="fixed right-4 top-20 z-[70] flex items-center gap-3 rounded-full border border-line bg-bg2/80 px-4 py-2.5 backdrop-blur-md md:top-24">
      <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted">
        {t.accent}
      </span>
      {OPTIONS.map((o) => (
        <button
          key={o.id}
          type="button"
          title={o.label}
          aria-label={`Акцент: ${o.label}`}
          data-cursor="hover"
          onClick={() => apply(o.id)}
          className={`h-4 w-4 rounded-full transition-shadow ${
            active === o.id ? 'ring-2 ring-fg/60 ring-offset-2 ring-offset-bg' : ''
          }`}
          style={{ background: o.hex }}
        />
      ))}
    </div>
  );
}
