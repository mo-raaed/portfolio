import { useScroll, useTransform, useReducedMotion } from 'motion/react';
import type { MotionValue } from 'motion/react';

/**
 * Map an element's own scroll traversal (enter → exit viewport) to a px
 * y-range. Reduced-motion collapses the range to 0 — required because
 * MotionConfig reducedMotion only strips animate props, not style-bound
 * useTransform values.
 */
export function useParallax(
  ref: React.RefObject<HTMLElement | null>,
  fromPx: number,
  toPx: number,
): MotionValue<number> {
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });
  return useTransform(scrollYProgress, [0, 1], reduce ? [0, 0] : [fromPx, toPx]);
}
