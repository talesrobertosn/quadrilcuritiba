/**
 * Testes de comportamento no Chromium headless: busca rápida, menu móvel,
 * filtro da biblioteca, índice do artigo e ficha de inscrição de cirurgiões.
 *
 *   npx tsx scripts/uitest.ts
 */
import { chromium } from 'playwright-core';
import { serve } from './serve.ts';

const PORT = 4177;
const BASE = `http://localhost:${PORT}/`;
const server = await serve(PORT);
const browser = await chromium.launch({ executablePath: process.env.CHROMIUM_PATH ?? '/opt/pw-browsers/chromium-1194/chrome-linux/chrome' });
const fails: string[] = [];
const ok = (cond: boolean, msg: string) => {
  console.log(`${cond ? '✓' : '✗'} ${msg}`);
  if (!cond) fails.push(msg);
};

const ctx = await browser.newContext({ viewport: { width: 1280, height: 860 } });
const page = await ctx.newPage();
page.on('pageerror', (e) => fails.push(`erro JS: ${e.message}`));

// Busca rápida
await page.goto(`${BASE}protese-de-quadril.html`);
await page.keyboard.press('Control+k');
await page.waitForSelector('.qs.open');
ok(await page.locator('#qs-input').evaluate((el) => el === document.activeElement), 'Ctrl+K abre a busca com foco no campo');
await page.fill('#qs-input', 'colageno');
await page.waitForFunction(() => document.querySelectorAll('.qs-item').length > 0);
ok((await page.locator('.qs-item').first().innerText()).toLowerCase().includes('colágeno'), 'busca sem acento encontra "colágeno"');
await page.fill('#qs-input', 'dirigir');
await page.waitForTimeout(100);
await page.keyboard.press('Enter');
await page.waitForURL(/recuperacao-protese-de-quadril\.html#dirigir/);
ok(true, 'Enter navega para a seção certa em outra página');
await page.keyboard.press('/');
ok(await page.locator('.qs.open').count() === 1, 'tecla "/" abre a busca');
await page.keyboard.press('Escape');
ok(await page.locator('.qs.open').count() === 0, 'Esc fecha a busca');

// Índice do artigo
await page.goto(`${BASE}bursite-no-quadril.html`);
await page.evaluate(() => {
  document.documentElement.style.scrollBehavior = 'auto';
  const h = document.querySelectorAll('.prose h2[id]')[3] as HTMLElement;
  window.scrollTo(0, h.getBoundingClientRect().top + scrollY - 100);
});
await page.waitForTimeout(250);
ok(await page.locator('.toc a.on').count() === 1, 'índice destaca a seção atual');

// Biblioteca
await page.goto(`${BASE}artigos.html#cirurgia`);
const visible = await page.locator('[data-cat]:visible').count();
const cir = await page.locator('[data-cat="cirurgia"]').count();
ok(visible === cir && cir > 0, `filtro pelo endereço (#cirurgia) mostra ${cir} artigos`);
await page.click('[data-filter="todos"]');
ok((await page.locator('[data-cat]:visible').count()) > cir, 'chip "Todos" volta a mostrar tudo');

// Ficha de inscrição
await page.goto(`${BASE}cirurgioes-curitiba.html#para-cirurgioes`);
await page.click('[data-surgeon-form] button[type="submit"]');
ok(await page.locator('[data-form-err]:visible').count() === 1, 'ficha vazia mostra erro de validação');
await page.fill('input[name="nome"]', 'Dr. Teste da Silva');
await page.fill('input[name="crm"]', '12345');
await page.fill('input[name="rqe"]', '6789');
await page.fill('input[name="email"]', 'teste@exemplo.com');
await page.fill('textarea[name="locais"]', 'Clínica Teste, Batel, Curitiba');
await page.check('input[value="artroplastia"]', { force: true });
await page.check('input[name="aceite"]');
ok((await page.locator('[data-pv-nome]').innerText()) === 'Dr. Teste da Silva', 'prévia do card atualiza ao digitar');
ok((await page.locator('[data-pv-ini]').innerText()) === 'TD', 'iniciais calculadas sem o "Dr."');
await page.click('[data-surgeon-form] button[type="submit"]');
const href = (await page.locator('[data-send-gmail]').getAttribute('href')) ?? '';
ok(href.includes('mail.google.com') && decodeURIComponent(href).includes('CRM-PR: 12345'), 'ficha gera link do Gmail com os dados');

// Menu móvel
const m = await browser.newPage({ viewport: { width: 390, height: 800 } });
await m.goto(BASE);
await m.click('[data-nav-toggle]');
ok(await m.locator('#site-nav.open').count() === 1, 'menu móvel abre');
await m.keyboard.press('Escape');
ok(await m.locator('#site-nav.open').count() === 0, 'Esc fecha o menu móvel');

await browser.close();
server.close();
if (fails.length) {
  console.log(`\nFALHAS:\n - ${fails.join('\n - ')}`);
  process.exit(1);
}
console.log('\nTodos os testes de comportamento passaram.');
