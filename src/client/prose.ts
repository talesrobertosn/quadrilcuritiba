import { $$, svg } from './dom.ts';

/** Melhorias no texto dos artigos: link direto para cada seção e zoom das imagens. */
export const initProse = (): void => {
  $$('[data-prose] h2[id]').forEach((h) => {
    const a = document.createElement('a');
    a.className = 'h-anchor';
    a.href = `#${h.id}`;
    a.setAttribute('aria-label', `Link direto para a seção: ${h.textContent?.trim() ?? ''}`);
    a.innerHTML = svg('link');
    h.appendChild(a);
  });

  const imgs = $$<HTMLImageElement>('[data-prose] figure img');
  if (!imgs.length || typeof HTMLDialogElement === 'undefined') return;
  const dlg = document.createElement('dialog');
  dlg.className = 'zoom';
  dlg.innerHTML = `<button type="button" class="zoom-x" aria-label="Fechar imagem">${svg('close')}</button><img alt=""><p></p>`;
  document.body.appendChild(dlg);
  const big = dlg.querySelector('img') as HTMLImageElement;
  const cap = dlg.querySelector('p') as HTMLParagraphElement;
  dlg.addEventListener('click', (e) => {
    if (e.target === dlg || (e.target as Element).closest('.zoom-x')) dlg.close();
  });
  imgs.forEach((img) => {
    img.classList.add('zoomable');
    img.tabIndex = 0;
    img.setAttribute('role', 'button');
    img.setAttribute('aria-label', `Ampliar imagem: ${img.alt}`);
    const open = () => {
      big.src = img.currentSrc || img.src;
      big.alt = img.alt;
      cap.textContent = img.closest('figure')?.querySelector('figcaption')?.textContent ?? '';
      dlg.showModal();
    };
    img.addEventListener('click', open);
    img.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        open();
      }
    });
  });
};
