import { m } from 'motion/react';

/**
 * Scroll-reveal wrapper: fades/rises once when scrolled into view.
 * MotionConfig reducedMotion="user" strips the transform for
 * reduced-motion users, leaving an opacity fade (WCAG-fine).
 */
export default function Reveal({
  children,
  className = '',
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <m.div
      className={className}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '0px 0px -60px' }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </m.div>
  );
}
