import { useState } from 'react';

interface SmartImageProps {
  src: string;
  alt: string;
  /** Sizing/framing classes, applied to both the image and its placeholder. */
  className?: string;
  /** Rendered centered inside the placeholder when the image is missing. */
  fallback?: React.ReactNode;
}

/**
 * Image drop-in convention (see README): renders a lazy `<img>`, and when
 * the file does not exist yet it falls back to a styled warm-stone panel
 * with fine grid lines. Dropping the file into /public lights it up —
 * no code changes needed.
 */
export default function SmartImage({ src, alt, className = '', fallback }: SmartImageProps) {
  const [errored, setErrored] = useState(false);

  if (errored) {
    return (
      <div role="img" aria-label={alt} className={`relative overflow-hidden bg-surface-2 ${className}`}>
        <div
          aria-hidden="true"
          className="absolute inset-0"
          style={{
            backgroundImage:
              'linear-gradient(var(--heritage-border) 1px, transparent 1px), linear-gradient(90deg, var(--heritage-border) 1px, transparent 1px)',
            backgroundSize: '32px 32px',
          }}
        />
        <div className="absolute inset-0 flex items-center justify-center p-6">{fallback}</div>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      loading="lazy"
      decoding="async"
      onError={() => setErrored(true)}
      className={className}
    />
  );
}
