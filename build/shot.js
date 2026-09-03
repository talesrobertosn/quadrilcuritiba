const { chromium } = require('playwright');
const path = require('path');
(async () => {
  const args = process.argv.slice(2);
  const w = parseInt(process.env.W || '1240', 10);
  const b = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium-1194/chrome-linux/chrome', args: ['--no-sandbox','--disable-dev-shm-usage'] });
  for (const f of args) {
    const p = await b.newPage({ viewport: { width: w, height: 900 } });
    const errs = [];
    p.on('pageerror', e => errs.push('PAGEERROR: ' + e.message));
    p.on('console', m => { if (m.type() === 'error') errs.push('CONSOLE: ' + m.text()); });
    await p.goto('file://' + path.resolve(f));
    await p.evaluate(async () => {
      await new Promise(r => {
        let y = 0;
        const step = () => {
          y += 600; window.scrollTo({top:y,behavior:'instant'});
          if (y < document.body.scrollHeight) setTimeout(step, 90); else { window.scrollTo({top:0,behavior:'instant'}); setTimeout(r, 350); }
        };
        step();
      });
    });
    await p.waitForTimeout(500);
    const out = f.replace(/\.(svg|html)$/, '') + (process.env.SUF||'') + '.png';
    await p.screenshot({ path: out, fullPage: true });
    console.log('shot', out, errs.length ? '\n  ' + errs.join('\n  ') : '(sem erros de JS)');
    await p.close();
  }
  await b.close();
})();
