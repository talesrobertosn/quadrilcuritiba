const { chromium } = require('playwright');
const path = require('path');
(async () => {
  const b = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium-1194/chrome-linux/chrome', args: ['--no-sandbox','--disable-dev-shm-usage'] });
  // 1) menu mobile
  let p = await b.newPage({ viewport: { width: 390, height: 800 } });
  const errs=[]; p.on('pageerror',e=>errs.push('PAGEERROR '+e.message));
  await p.goto('file://' + path.resolve('../index.html'));
  await p.click('.nav-toggle');
  await p.waitForTimeout(300);
  console.log('menu mobile abre:', await p.evaluate(()=>document.getElementById('site-nav').classList.contains('open')));
  console.log('itens na nav:', await p.evaluate(()=>document.querySelectorAll('#site-nav a').length));
  await p.screenshot({ path: 'menu-mob.png' });
  await p.close();

  // 2) filtros do índice de artigos
  p = await b.newPage({ viewport: { width: 1240, height: 900 } });
  p.on('pageerror',e=>errs.push('PAGEERROR '+e.message));
  await p.goto('file://' + path.resolve('../artigos.html'));
  const total = await p.evaluate(()=>document.querySelectorAll('.post').length);
  await p.click('.chip[data-filter="cirurgia"]');
  await p.waitForTimeout(200);
  const vis = await p.evaluate(()=>[...document.querySelectorAll('.post')].filter(e=>!e.hidden).length);
  console.log(`filtro "cirurgia": ${vis} de ${total} artigos visíveis`);
  await p.click('.chip[data-filter="todos"]');
  await p.waitForTimeout(200);
  console.log('volta para todos:', await p.evaluate(()=>[...document.querySelectorAll('.post')].filter(e=>!e.hidden).length));
  await p.close();

  // 3) voltar ao topo + barra de leitura
  p = await b.newPage({ viewport: { width: 1240, height: 900 } });
  p.on('pageerror',e=>errs.push('PAGEERROR '+e.message));
  await p.goto('file://' + path.resolve('../artroscopia-de-quadril.html'));
  await p.evaluate(()=>window.scrollTo({top:3000,behavior:'instant'}));
  await p.waitForTimeout(400);
  console.log('botão voltar ao topo aparece:', await p.evaluate(()=>document.querySelector('.totop').classList.contains('on')));
  console.log('barra de leitura:', await p.evaluate(()=>document.querySelector('.readbar').style.width));
  console.log('nav marca página atual:', await p.evaluate(()=>document.querySelector('.nav a.active')?.textContent||'(nenhuma — esperado, artroscopia não está na nav)'));
  await p.close();

  console.log(errs.length ? errs.join('\n') : 'sem erros de JS em nenhuma página');
  await b.close();
})();
