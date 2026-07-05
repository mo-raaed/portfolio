// Capture live-site screenshots at 1600x1000 (exact 16:10) for project cards.
// Usage: node scripts/capture-screens.mjs [id ...]   (no args = all live targets)
// Requires: playwright chromium (browsers already cached under ~/.cache/ms-playwright).
import { chromium } from 'playwright';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const outDir = join(__dirname, '..', 'tmp-screens');

const targets = [
  { id: 'gradify', url: 'https://gradify.neuralsun.systems', wait: 3500 },
  { id: 'schedule-maker', url: 'https://schedule.neuralsun.systems/', wait: 3500 },
  { id: 'gamut', url: 'http://localhost:5173', wait: 3500 },
];

const only = process.argv.slice(2);
const pick = only.length ? targets.filter(t => only.includes(t.id)) : targets;

const { mkdir } = await import('node:fs/promises');
await mkdir(outDir, { recursive: true });

const browser = await chromium.launch();
const ctx = await browser.newContext({
  viewport: { width: 1600, height: 1000 },
  deviceScaleFactor: 1,
  colorScheme: 'dark',
});
const page = await ctx.newPage();
// hide scrollbars
await page.addInitScript(() => {
  const s = document.createElement('style');
  s.textContent = '::-webkit-scrollbar{display:none!important}html{scrollbar-width:none!important}';
  document.documentElement.appendChild(s);
});

for (const t of pick) {
  try {
    await page.goto(t.url, { waitUntil: 'networkidle', timeout: 30000 });
    await page.waitForTimeout(t.wait);
    const path = join(outDir, `${t.id}.png`);
    await page.screenshot({ path, clip: { x: 0, y: 0, width: 1600, height: 1000 } });
    console.log(`OK   ${t.id} -> ${path}`);
  } catch (e) {
    console.log(`FAIL ${t.id}: ${e.message}`);
  }
}

await browser.close();
