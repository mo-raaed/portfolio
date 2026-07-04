/**
 * Scroll-reveal wrapper. Upgraded to a motion `whileInView` fade/rise in
 * the motion phase; markup-stable so sections never need to change.
 */
export default function Reveal({
  children,
  className = '',
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return <div className={className}>{children}</div>;
}
