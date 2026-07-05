/**
 * Per-project natural image dimensions (EXIF-corrected pixels).
 * Regenerate after dropping/replacing an image with:  node scripts/measure-images.mjs
 * Sole consumer is ProjectImage, which derives each frame's aspect ratio from
 * these so nothing is force-cropped.
 */
export interface ProjectImageMeta {
  width: number;
  height: number;
}

export const imageMeta: Record<string, ProjectImageMeta> = {
  gradify: { width: 1600, height: 753 }, // 2.12
  'ghi-prediction': { width: 1600, height: 1379 }, // 1.16
  'schedule-maker': { width: 1600, height: 741 }, // 2.16
  'rag-assistant': { width: 1600, height: 812 }, // 1.97
  gamut: { width: 1600, height: 1000 }, // 1.60
  'stereo-depth': { width: 624, height: 645 }, // 0.97
  'emotion-music': { width: 1200, height: 1600 }, // 0.75
  'sign-language': { width: 1600, height: 949 }, // 1.69
};
