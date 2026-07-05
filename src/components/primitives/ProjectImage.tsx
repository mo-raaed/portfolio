import type { Project } from '../../types';
import { imageMeta } from '../../data/imageMeta';
import SmartImage from './SmartImage';

/**
 * Project-image frame. The frame's aspect ratio follows the image's natural
 * ratio so nothing is force-cropped:
 *   - Tall grid images (ratio < 1.2) sit contained over a blurred copy of
 *     themselves — the whole image shows, the frame stays a tidy 4:3.
 *   - Everything else fills its exact-ratio frame (zero crop).
 * Images rest "quiet" (slightly dimmed + desaturated) on hover-capable
 * pointers and lift to full color on hover; touch pointers keep them full
 * color. No metadata → default 16:10 frame + SmartImage fallback.
 */

const TALL_GRID_THRESHOLD = 1.2;
const BACKDROP_RATIO = 4 / 3;

/* Applied to the visible image. Needs `group` on an ancestor (grid cards and
   featured articles both provide it). can-hover keeps touch full-color. */
const quiet =
  'transition-[filter,opacity,transform] duration-300 ease-out ' +
  'can-hover:opacity-90 can-hover:saturate-[0.85] ' +
  'group-hover:opacity-100 group-hover:saturate-100 motion-safe:group-hover:scale-[1.02]';

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
  const src = { src: `/images/projects/${project.id}.jpg`, alt: `Screenshot of ${project.title}` };
  const fallback = (
    <span className="font-display italic font-medium text-2xl text-muted-foreground text-center">
      {project.title}
    </span>
  );

  // No meta → default frame, SmartImage owns the fallback panel.
  if (!meta) {
    return (
      <div className={`aspect-[16/10] overflow-hidden ${className}`}>
        <SmartImage {...src} fallback={fallback} className={`h-full w-full object-cover ${quiet}`} />
      </div>
    );
  }

  const ratio = meta.width / meta.height;

  // Branch A: tall grid image → contain over a blurred self-backdrop, no crop.
  if (tier === 'grid' && ratio < TALL_GRID_THRESHOLD) {
    return (
      <div style={{ aspectRatio: BACKDROP_RATIO }} className={`relative overflow-hidden ${className}`}>
        <img
          src={src.src}
          alt=""
          aria-hidden="true"
          loading="lazy"
          decoding="async"
          className="absolute inset-0 h-full w-full object-cover scale-110 blur-2xl saturate-[0.8] opacity-60 dark:opacity-40"
        />
        <SmartImage
          {...src}
          fallback={fallback}
          className={`relative mx-auto h-full w-auto object-contain ${quiet}`}
        />
      </div>
    );
  }

  // Branch B: exact natural ratio, zero crop.
  return (
    <div style={{ aspectRatio: ratio }} className={`overflow-hidden ${className}`}>
      <SmartImage {...src} fallback={fallback} className={`h-full w-full object-cover ${quiet}`} />
    </div>
  );
}
