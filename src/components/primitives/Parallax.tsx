import { useRef } from 'react';
import type { ReactNode, CSSProperties } from 'react';
import { m } from 'motion/react';
import { useParallax } from '../../hooks/useParallax';

/**
 * Generic depth layer — drifts its children as the element crosses the
 * viewport. Depth = layers moving at different speeds. `speed` > 0 rises
 * (moves up on scroll-down), < 0 sinks. Reduced-motion → no movement.
 */
export function Parallax({
  children,
  speed = 0.2,
  className = '',
  style,
  'aria-hidden': ariaHidden,
}: {
  children: ReactNode;
  speed?: number;
  className?: string;
  style?: CSSProperties;
  'aria-hidden'?: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const travel = 120 * speed; // px across a full viewport traversal
  const y = useParallax(ref, travel, -travel);
  return (
    <m.div ref={ref} aria-hidden={ariaHidden} style={{ y, ...style }} className={className}>
      {children}
    </m.div>
  );
}
