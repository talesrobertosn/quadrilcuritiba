const { chromium } = require('playwright');
const path = require('path');
(async () => {
  const b = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium-1194/chrome-linux/chrome', args: ['--no-sandbox','--disable-dev-shm-usage'] });
  const p = await b.newPage({ viewport: { width: 1240, height: 860 } });
  const errs = []; p.on('pageerror', e => errs.push('PAGEERROR: '+e.message));
  await p.goto('file://' + path.resolve('../dor-na-virilha.html'));
  // atalho de teclado
  await p.keyboard.press('Control+k');
  await p.waitForTimeout(400);
  console.log('aberto por Ctrl+K:', await p.evaluate(() => document.querySelector('.qs').classList.contains('open')));
  await p.screenshot({ path: 'qs-1-aberto.png' });
  await p.keyboard.type('virilha');
  await p.waitForTimeout(300);
  await p.screenshot({ path: 'qs-2-busca.png' });
  console.log('resultados:', await p.evaluate(() => document.querySelectorAll('.qs-item').length));
  console.log('primeiro:', await p.evaluate(() => document.querySelector('.qs-item .qs-t')?.textContent));
  // navegação por teclado
  await p.keyboard.press('ArrowDown'); await p.keyboard.press('ArrowDown');
  console.log('selecionado:', await p.evaluate(() => document.querySelector('.qs-item.sel .qs-t')?.textContent));
  // busca sem acento
  await p.evaluate(() => { const i=document.getElementById('qs-input'); i.value='protese'; i.dispatchEvent(new Event('input')); });
  await p.waitForTimeout(200);
  console.log('busca "protese" (sem acento):', await p.evaluate(() => [...document.querySelectorAll('.qs-item .qs-t')].map(e=>e.textContent).slice(0,3)));
  await p.evaluate(() => { const i=document.getElementById('qs-input'); i.value='custo'; i.dispatchEvent(new Event('input')); });
  await p.waitForTimeout(200);
  console.log('busca "custo":', await p.evaluate(() => [...document.querySelectorAll('.qs-item .qs-t')].map(e=>e.textContent).slice(0,3)));
  await p.keyboard.press('Escape'); await p.waitForTimeout(300);
  console.log('fechado por Esc:', await p.evaluate(() => !document.querySelector('.qs').classList.contains('open')));
  console.log(errs.length ? errs.join('\n') : 'sem erros de JS');
  await b.close();
})();
