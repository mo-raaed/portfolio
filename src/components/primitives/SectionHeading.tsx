import { Parallax } from './Parallax';

interface SectionHeadingProps {
  eyebrow: string;
  title: string;
  align?: 'left' | 'center';
  className?: string;
}

export default function SectionHeading({
  eyebrow,
  title,
  align = 'left',
  className = '',
}: SectionHeadingProps) {
  return (
    <Parallax speed={0.14} className={`${align === 'center' ? 'text-center' : ''} ${className}`}>
      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">{eyebrow}</p>
      <h2 className="font-display font-semibold text-3xl md:text-5xl tracking-tight text-foreground mt-3">
        {title}
      </h2>
    </Parallax>
  );
}
