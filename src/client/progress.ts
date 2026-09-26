import { ICONS, rafThrottle } from './dom.ts';

/** Barra de progresso de leitura e botão de voltar ao topo. */
export const initProgress = (): void => {
  const bar = document.createElement('div');
  bar.className = 'readbar';
  bar.setAttribute('aria-hidden', 'true');
  document.body.appendChild(bar);

  const top = document.createElement('button');
  top.type = 'button';
  top.className = 'totop';
  top.setAttribute('aria-label', 'Voltar ao topo da página');
  top.innerHTML = `<svg class="i" viewBox="0 0 24 24" aria-hidden="true">${ICONS.up}</svg>`;
  top.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
  document.body.appendChild(top);

  const paint = rafThrottle(() => {
    const h = document.documentElement;
    const max = h.scrollHeight - h.clientHeight;
    const p = max > 0 ? h.scrollTop / max : 0;
    bar.style.transform = `scaleX(${p})`;
    top.classList.toggle('on', h.scrollTop > 900);
  });
  window.addEventListener('scroll', paint, { passive: true });
  window.addEventListener('resize', paint);
  paint();
};
