'use client';

import { useState } from 'react';
import { type MotionValue, useMotionValue, useMotionValueEvent } from 'framer-motion';

/** Show CTA at rest (start/end of scrub) or while hovering. Hide while the case is being scrolled. */
export function useCaseCta(progress?: MotionValue<number>) {
  const fallback = useMotionValue(0);
  const source = progress ?? fallback;
  const [hover, setHover] = useState(false);
  const [p, setP] = useState(source.get());

  useMotionValueEvent(source, 'change', (v) => setP(v));

  const atRest = p <= 0.06 || p >= 0.9;
  return {
    visible: hover || atRest,
    onEnter: () => setHover(true),
    onLeave: () => setHover(false),
  };
}
