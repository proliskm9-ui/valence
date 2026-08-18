'use client';

import { m } from 'framer-motion';
import { EASE_OUT_EXPO } from '@/lib/site';

// ВАЖНО: whileInView стоит на внешнем контейнере, а не на h2 —
// h2 стартует полностью обрезанным overflow-hidden, и IO его «не видит».

/** Мono-лейбл «01 / услуги» + крупный заголовок секции */
export default function SectionHeading({
  index,
  label,
  title,
  className = '',
}: {
  index: string;
  label: string;
  title: string;
  className?: string;
}) {
  return (
    <m.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-80px' }}
    >
      <m.p
        variants={{
          hidden: { opacity: 0 },
          visible: { opacity: 1, transition: { duration: 0.6 } },
        }}
        className="font-mono text-[11px] uppercase tracking-[0.25em] text-muted"
      >
        {index} / {label}
      </m.p>
      {/* клип только по вертикали: длинное слово не режется по ширине */}
      <div className="mt-4 overflow-x-visible overflow-y-clip md:mt-6">
        <m.h2
          variants={{
            hidden: { y: '110%' },
            visible: {
              y: '0%',
              transition: { duration: 0.9, ease: EASE_OUT_EXPO },
            },
          }}
          className="font-display text-[clamp(2rem,6vw,5.5rem)] font-extrabold leading-[1.05] tracking-tight"
        >
          {title}
        </m.h2>
      </div>
    </m.div>
  );
}
