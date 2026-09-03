const { chromium } = require('playwright');
const path = require('path');
(async () => {
  const [file, sel, out] = process.argv.slice(2);
  const b = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium-1194/chrome-linux/chrome', args: ['--no-sandbox','--disable-dev-shm-usage'] });
  const p = await b.newPage({ viewport: { width: parseInt(process.env.W||'1240',10), height: 900 } });
  await p.goto('file://' + path.resolve(file));
  await p.evaluate(async () => { await new Promise(r => { let y=0; const s=()=>{y+=600;window.scrollTo({top:y,behavior:'instant'}); if(y<document.body.scrollHeight) setTimeout(s,90); else {window.scrollTo({top:0,behavior:'instant'}); setTimeout(r,400);} }; s(); }); });
  const el = await p.$(sel);
  if (!el) { console.log('não achou', sel); } else { await el.screenshot({ path: out }); console.log('shot', out); }
  await b.close();
})();
