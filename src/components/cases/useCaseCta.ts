'use client';

import { useState } from 'react';
import { type MotionValue, useMotionValue, useMotionValueEvent } from 'framer-motion';

/**
 * Desktop: CTA floats in beside the project title.
 * - Hover title/meta → always show
 * - Hover stage at scrub ends (hero / finale) → show
 * - Mid-scrub on stage → hide so it doesn't fight the story
 * Mobile CSS keeps the button always visible (no hover).
 */
export function useCaseCta(progress?: MotionValue<number>) {
  const fallback = useMotionValue(0);
  const source = progress ?? fallback;
  const [headHover, setHeadHover] = useState(false);
  const [stageHover, setStageHover] = useState(false);
  const [p, setP] = useState(source.get());

  useMotionValueEvent(source, 'change', (v) => setP(v));

  const atEnds = p <= 0.1 || p >= 0.9;
  const desktopVisible = headHover || (stageHover && atEnds);

  return {
    visible: desktopVisible,
    onHeadEnter: () => setHeadHover(true),
    onHeadLeave: () => setHeadHover(false),
    onStageEnter: () => setStageHover(true),
    onStageLeave: () => setStageHover(false),
  };
}
