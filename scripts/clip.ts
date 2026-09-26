/**
 * Recortes de uma página em alturas específicas, para revisão visual.
 *   npx tsx scripts/clip.ts <pagina> <largura> <y1,y2,...> [dark]
 */
import { mkdirSync } from 'node:fs';
import { chromium } from 'playwright-core';
import { serve } from './serve.ts';

const [p = 'index', w = '1440', ys = '0', dark] = process.argv.slice(2);
const server = await serve(4175);
const browser = await chromium.launch({ executablePath: process.env.CHROMIUM_PATH ?? '/opt/pw-browsers/chromium-1194/chrome-linux/chrome' });
const page = await browser.newPage({ viewport: { width: Number(w), height: 900 }, colorScheme: dark ? 'dark' : 'light', ignoreHTTPSErrors: true });
await page.goto(`http://localhost:4175/${p === 'index' ? '' : p + '.html'}`, { waitUntil: 'networkidle' });
await page.evaluate(() => (document.documentElement.style.scrollBehavior = 'auto'));
await page.evaluate(() => document.querySelectorAll('.reveal').forEach((el) => el.classList.add('in')));
mkdirSync('shots', { recursive: true });
for (const y of ys.split(',').map(Number)) {
  await page.evaluate((yy) => window.scrollTo(0, yy), y);
  await page.waitForTimeout(300);
  await page.screenshot({ path: `shots/clip-${p}-${w}-${y}${dark ? '-dark' : ''}.png` });
}
await browser.close();
server.close();
