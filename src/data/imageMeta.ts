/**
 * Per-project image dimensions + how each should sit in its card frame.
 * Regenerate after dropping/replacing an image with:  node scripts/measure-images.mjs
 *
 * fit:
 *   'cover'   — app screenshots; fill the frame (frame ratio follows the image, clamped).
 *   'contain' — figures/charts; show the whole image on a mounted surface, never cropped.
 */
export interface ProjectImageMeta {
  width: number;
  height: number;
  fit: 'cover' | 'contain';
  /** object-position for cover fit, e.g. 'left center'. Optional. */
  position?: string;
}

export const imageMeta: Record<string, ProjectImageMeta> = {
  gradify: { width: 1600, height: 753, fit: 'cover' },
  'ghi-prediction': { width: 1600, height: 1379, fit: 'contain' },
  'schedule-maker': { width: 1600, height: 741, fit: 'cover' },
  'rag-assistant': { width: 1600, height: 812, fit: 'cover' },
  gamut: { width: 1600, height: 1000, fit: 'cover' },
  'stereo-depth': { width: 1600, height: 1000, fit: 'cover' },
  'emotion-music': { width: 1600, height: 1000, fit: 'cover' },
  // sensor-fusion: no image yet — ProjectImage falls back to the default frame.
};
