/**
 * Capturas de tela e teste de comportamento com Chromium headless.
 *
 *   npm run shots             → capturas em shots/ (desktop, celular, tema escuro)
 *   npm run shots -- --only=index,cirurgioes-curitiba
 *
 * Falha (código 1) se alguma página emitir erro de JavaScript ou tiver rolagem horizontal.
 */
import { mkdirSync } from 'node:fs';
import { chromium, type Page } from 'playwright-core';
import { serve } from './serve.ts';

const EXEC = process.env.CHROMIUM_PATH ?? '/opt/pw-browsers/chromium-1194/chrome-linux/chrome';
const PORT = 4174;
const BASE = `http://localhost:${PORT}/`;

const ALL = [
  'index', 'artigos', 'cirurgioes-curitiba', 'protese-de-quadril', 'artrose-de-quadril', 'dor-na-virilha',
  'recuperacao-protese-de-quadril', 'quanto-custa-protese-de-quadril', 'bursite-no-quadril', 'sobre', '404',
];
const only = process.argv.find((a) => a.startsWith('--only='))?.slice(7).split(',');
const full = process.argv.includes('--full');
const pages = only ?? ALL;

const VIEWPORTS = [
  { name: 'desktop', width: 1440, height: 900, dark: false },
  { name: 'mobile', width: 390, height: 844, dark: false },
  { name: 'dark', width: 1280, height: 800, dark: true },
];

mkdirSync('shots', { recursive: true });
const server = await serve(PORT);
const browser = await chromium.launch({ executablePath: EXEC });
const problems: string[] = [];

const settle = async (page: Page) => {
  await page.evaluate(async () => {
    document.querySelectorAll('.reveal').forEach((el) => el.classList.add('in'));
    await document.fonts.ready;
  });
  await page.waitForTimeout(250);
};

for (const vp of VIEWPORTS) {
  const ctx = await browser.newContext({
    viewport: { width: vp.width, height: vp.height },
    deviceScaleFactor: vp.name === 'mobile' ? 2 : 1,
    colorScheme: vp.dark ? 'dark' : 'light',
    ignoreHTTPSErrors: true,
  });
  for (const p of pages) {
    const page = await ctx.newPage();
    page.on('pageerror', (e) => problems.push(`${vp.name} ${p}: erro JS ${e.message}`));
    page.on('console', (m) => m.type() === 'error' && !/fonts\.g|ERR_CERT|ERR_TUNNEL|ERR_PROXY|ERR_TOO_MANY_RETRIES/.test(m.text()) && problems.push(`${vp.name} ${p}: console ${m.text()}`));
    await page.goto(`${BASE}${p === 'index' ? '' : p + '.html'}`, { waitUntil: 'networkidle' }).catch(() => page.goto(`${BASE}${p}.html`));
    await settle(page);
    const overflow = await page.evaluate(() => {
      // body usa overflow-x: clip, então medimos elementos que passam da borda.
      const w = window.innerWidth;
      let worst = 0;
      document.querySelectorAll('main *').forEach((el) => {
        if (el.closest('.figscroll, .tablewrap, .hero-bg, .ahero-bg, .phero-bg, .cta-glow, .hero-art, .qs')) return;
        const r = el.getBoundingClientRect();
        if (r.width && r.right - w > worst) worst = r.right - w;
      });
      return Math.round(worst);
    });
    if (overflow > 1) problems.push(`${vp.name} ${p}: rolagem horizontal de ${overflow}px`);
    await page.screenshot({ path: `shots/${p}-${vp.name}.png`, fullPage: full || vp.name !== 'dark' });
    await page.close();
  }
  await ctx.close();
}

await browser.close();
server.close();
if (problems.length) {
  console.log('PROBLEMAS:\n - ' + problems.join('\n - '));
  process.exit(1);
}
console.log(`✓ ${pages.length * VIEWPORTS.length} capturas em shots/, sem erros de JS nem rolagem horizontal`);
