import { useEffect, useRef, useState } from 'react';
import { useInView, useReducedMotion, animate } from 'motion/react';

/**
 * Counts from 0 to the numeric part of `value` when scrolled into view.
 * Preserves any non-numeric suffix (e.g. '50+' → animates 0→50, keeps '+').
 * Reduced-motion users see the final value immediately.
 */
export default function CountUp({ value }: { value: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: '0px 0px -40px' });
  const reduce = useReducedMotion();

  const match = value.match(/^(\d+)(.*)$/);
  const target = match ? Number(match[1]) : NaN;
  const suffix = match ? match[2] : '';

  const [display, setDisplay] = useState(reduce || isNaN(target) ? value : '0' + suffix);

  useEffect(() => {
    if (!inView || reduce || isNaN(target)) return;
    const controls = animate(0, target, {
      duration: 1.1,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: v => setDisplay(Math.round(v) + suffix),
    });
    return () => controls.stop();
  }, [inView, reduce, target, suffix]);

  if (isNaN(target)) return <span ref={ref}>{value}</span>;
  return <span ref={ref}>{display}</span>;
}
