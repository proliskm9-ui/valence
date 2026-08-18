'use client';

import { useEffect, useState } from 'react';
import {
  AnimatePresence,
  m,
  useMotionValue,
  useReducedMotion,
  useSpring,
} from 'framer-motion';
import { useLanguage } from '@/components/providers/LanguageProvider';

type Variant = 'default' | 'hover' | 'view';

/**
 * Кастомный курсор. Работает только на точных указателях (мышь),
 * уважает prefers-reduced-motion. Элементы помечаются data-cursor="hover" | "view".
 */
export default function Cursor() {
  const reduced = useReducedMotion();
  const [enabled, setEnabled] = useState(false);
  const [visible, setVisible] = useState(false);
  const [variant, setVariant] = useState<Variant>('default');
  const [pressed, setPressed] = useState(false);
  const { t } = useLanguage();

  const mx = useMotionValue(-100);
  const my = useMotionValue(-100);
  const dotX = useSpring(mx, { stiffness: 900, damping: 60, mass: 0.4 });
  const dotY = useSpring(my, { stiffness: 900, damping: 60, mass: 0.4 });
  const tagX = useSpring(mx, { stiffness: 260, damping: 28 });
  const tagY = useSpring(my, { stiffness: 260, damping: 28 });

  useEffect(() => {
    if (reduced) return;
    if (!window.matchMedia('(pointer: fine)').matches) return;
    setEnabled(true);
    document.documentElement.classList.add('has-cursor');

    const onMove = (e: MouseEvent) => {
      mx.set(e.clientX);
      my.set(e.clientY);
      setVisible(true);
    };
    const onOver = (e: MouseEvent) => {
      const el = (e.target as Element).closest?.('[data-cursor]');
      setVariant((el?.getAttribute('data-cursor') as Variant) ?? 'default');
    };
    const onDown = () => setPressed(true);
    const onUp = () => setPressed(false);
    const onLeave = () => setVisible(false);

    window.addEventListener('mousemove', onMove, { passive: true });
    document.addEventListener('mouseover', onOver, { passive: true });
    window.addEventListener('mousedown', onDown);
    window.addEventListener('mouseup', onUp);
    document.documentElement.addEventListener('mouseleave', onLeave);

    return () => {
      document.documentElement.classList.remove('has-cursor');
      window.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseover', onOver);
      window.removeEventListener('mousedown', onDown);
      window.removeEventListener('mouseup', onUp);
      document.documentElement.removeEventListener('mouseleave', onLeave);
    };
  }, [reduced, mx, my]);

  if (!enabled) return null;

  const scale =
    (variant === 'hover' ? 2.6 : variant === 'view' ? 0 : 1) * (pressed ? 0.8 : 1);

  return (
    <>
      {/* точка */}
      <m.div
        className="pointer-events-none fixed left-0 top-0 z-[85] mix-blend-difference"
        style={{ x: dotX, y: dotY, opacity: visible ? 1 : 0 }}
        aria-hidden
      >
        <m.div
          className="h-2.5 w-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white"
          animate={{ scale }}
          transition={{ duration: 0.25, ease: 'easeOut' }}
        />
      </m.div>

      {/* лейбл «Смотреть» над кейсами */}
      <m.div
        className="pointer-events-none fixed left-0 top-0 z-[85]"
        style={{ x: tagX, y: tagY }}
        aria-hidden
      >
        <AnimatePresence>
          {variant === 'view' && (
            <m.div
              initial={{ scale: 0.4, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.4, opacity: 0 }}
              transition={{ duration: 0.25, ease: 'easeOut' }}
              className="-translate-x-1/2 -translate-y-1/2 whitespace-nowrap rounded-full bg-accent px-5 py-3 font-mono text-[11px] uppercase tracking-[0.2em] text-bg"
            >
              {t.cases.viewHover}
            </m.div>
          )}
        </AnimatePresence>
      </m.div>
    </>
  );
}
