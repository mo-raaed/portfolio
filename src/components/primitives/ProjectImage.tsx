import { useRef } from 'react';
import { m } from 'motion/react';
import type { Project } from '../../types';
import { imageMeta } from '../../data/imageMeta';
import SmartImage from './SmartImage';
import { useParallax } from '../../hooks/useParallax';

/**
 * Dynamic project-image frame. The frame's aspect ratio follows the image's
 * natural ratio (clamped per tier) so nothing is force-cropped:
 *   - cover  (app screenshots): fill + slow scroll-parallax within the frame.
 *   - contain (figures/charts): mounted whole on a navy surface, never cropped.
 * No metadata (e.g. sensor-fusion) → default 16:10 frame + SmartImage fallback.
 */

const FRAME = {
  featured: { min: 1.33, max: 2.1, mountRatio: 1.5 },
  grid: { min: 1.6, max: 2.1, mountRatio: 1.6 },
} as const;

const clamp = (v: number, lo: number, hi: number) => Math.min(hi, Math.max(lo, v));

export default function ProjectImage({
  project,
  tier,
  className = '',
}: {
  project: Project;
  tier: 'featured' | 'grid';
  className?: string;
}) {
  const meta = imageMeta[project.id];
  const frameRef = useRef<HTMLDivElement>(null);
  // Parallax only meaningful for cover images that overflow the frame.
  const y = useParallax(frameRef, -34, 34);

  const cfg = FRAME[tier];
  const src = { src: `/images/projects/${project.id}.jpg`, alt: `Screenshot of ${project.title}` };
  const fallback = (
    <span className="font-display italic font-medium text-2xl text-muted-foreground text-center">
      {project.title}
    </span>
  );

  // No meta → default frame, SmartImage owns the fallback panel.
  if (!meta) {
    return (
      <div ref={frameRef} className={`aspect-[16/10] overflow-hidden ${className}`}>
        <SmartImage {...src} fallback={fallback} className="w-full h-full object-cover" />
      </div>
    );
  }

  const ratio = meta.width / meta.height;

  if (meta.fit === 'contain') {
    return (
      <div
        ref={frameRef}
        style={{ aspectRatio: cfg.mountRatio }}
        className={`overflow-hidden bg-surface-2 grid place-items-center p-4 md:p-6 ${className}`}
      >
        <SmartImage {...src} fallback={fallback} className="max-w-full max-h-full object-contain" />
      </div>
    );
  }

  const framed = clamp(ratio, cfg.min, cfg.max);
  return (
    <div
      ref={frameRef}
      style={{ aspectRatio: framed }}
      className={`overflow-hidden ${className}`}
    >
      <m.div style={{ y }} className="w-full h-full">
        <SmartImage
          {...src}
          fallback={fallback}
          className="w-full h-[118%] -translate-y-[9%] object-cover"
          style={meta.position ? { objectPosition: meta.position } : undefined}
        />
      </m.div>
    </div>
  );
}
