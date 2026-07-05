# mo-alyousif.com — Portfolio

Single-page portfolio of Mohammed Al-Yousif. React 19 + Tailwind CSS v4 + Vite 6,
deployed on Cloudflare Workers. "Heritage" design system: deep navy + burgundy,
Fraunces Variable (display) + Plus Jakarta Sans Variable (body), self-hosted fonts,
light/dark themes with system-preference follow.

## Commands

```bash
npm run dev      # local dev server
npm run build    # tsc + vite build
npm run lint     # oxlint
npm run preview  # build + wrangler dev (production preview)
npm run deploy   # build + wrangler deploy
```

## Image drop-in convention

The site renders styled placeholders until real images exist. Drop files at the
paths below and they light up automatically — no code changes needed
(`SmartImage` lazy-loads each file and falls back to the placeholder on 404).

| File | Size | Purpose |
|---|---|---|
| `public/images/me.jpg` | 800×1000 (4:5), ≤150 KB | Hero portrait |
| `public/images/projects/<id>.jpg` | 1600×1000 (16:10), ≤200 KB | Project screenshots |
| `public/apple-touch-icon.png` | 180×180 | iOS home-screen icon |

Project screenshot ids (from `src/data/projects.ts`): `gradify`, `ghi-prediction`,
`schedule-maker`, `rag-assistant`, `gamut`, `stereo-depth`, `emotion-music`.

Recompress large images before dropping them in, e.g.:

```bash
npx sharp-cli -i original.jpg -o public/images/projects/gradify.jpg -q 75 resize 1600 1000
```

## Structure

```
src/
  App.tsx              LazyMotion/MotionConfig wrapper, theme, section composition
  index.css            Heritage design tokens (single source, one .dark override)
  types.ts             Shared interfaces
  data/                projects, timeline, skills, profile (edit content here)
  hooks/useTheme.ts    Theme state; only an explicit toggle writes localStorage
  components/          One file per section + primitives/ (Reveal, SectionHeading,
                       StatusDot, SmartImage, icons)
```
