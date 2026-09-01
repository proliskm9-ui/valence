'use client';

import { m } from 'framer-motion';
import { EASE_OUT_EXPO } from '@/lib/site';

// ВАЖНО: whileInView стоит на внешнем контейнере, а не на h2 — так его видит
// IntersectionObserver независимо от анимации заголовка.
//
// Раньше заголовок «выезжал» из-под clip-маски (overflow-y-clip + translateY),
// но на части мобильных браузеров эта связка иногда не перерисовывалась —
// заменили на простой fade+rise, который не может «залипнуть» невидимым.

/** Мono-лейбл «01 / услуги» + крупный заголовок секции */
export default function SectionHeading({
  index,
  label,
  title,
  className = '',
  pinned = false,
  compact = false,
  as = 'h2',
}: {
  index: string;
  label: string;
  title: string;
  className?: string;
  /** В sticky-секциях без viewport-анимации — сразу виден целиком */
  pinned?: boolean;
  /** Компактный заголовок внутри pin-секции (кейсы) */
  compact?: boolean;
  /** h1 — для главного заголовка отдельной страницы, h2 — для секции внутри неё */
  as?: 'h1' | 'h2';
}) {
  const Tag = as;
  const MotionTag = m[as];
  const titleClass = compact
    ? 'mt-2 font-display text-[clamp(1.6rem,7vw,3.25rem)] font-extrabold leading-[1.05] tracking-tight md:mt-4'
    : 'mt-4 font-display text-[clamp(2rem,6vw,5.5rem)] font-extrabold leading-[1.05] tracking-tight md:mt-6';

  if (pinned) {
    return (
      <div className={className}>
        <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-muted">
          {index} / {label}
        </p>
        <Tag className={titleClass}>{title}</Tag>
      </div>
    );
  }

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
      <MotionTag
        variants={{
          hidden: { y: 28, opacity: 0 },
          visible: {
            y: 0,
            opacity: 1,
            transition: { duration: 0.8, ease: EASE_OUT_EXPO },
          },
        }}
        className="mt-4 font-display text-[clamp(2rem,6vw,5.5rem)] font-extrabold leading-[1.05] tracking-tight md:mt-6"
      >
        {title}
      </MotionTag>
    </m.div>
  );
}
