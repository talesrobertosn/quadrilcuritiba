import { reducedMotion } from './dom.ts';

/** Entrada suave de blocos visuais ao rolar. O texto corrido não anima: leitura em primeiro lugar. */
const SELECTOR = [
  '.sec-head', '.path', '.acard', '.fact', '.ck', '.care', '.scard', '.qbox', '.cta-cir', '.takeaways', '.edbox',
  '.prose > figure', '.prose .callout', '.prose .stat-row', '.prose .tablewrap', '.prose .cards', '.steps', '.dir-empty',
].join(',');

export const initReveal = (): void => {
  const els = Array.from(document.querySelectorAll<HTMLElement>(SELECTOR));
  if (!('IntersectionObserver' in window) || reducedMotion()) return;
  const io = new IntersectionObserver(
    (entries) => {
      for (const en of entries) {
        if (!en.isIntersecting) continue;
        en.target.classList.add('in');
        io.unobserve(en.target);
      }
    },
    { rootMargin: '0px 0px -6% 0px', threshold: 0.06 },
  );
  const vh = window.innerHeight;
  els.forEach((el) => {
    // O que já está na tela ao carregar aparece sem animação (evita "piscar" no topo).
    if (el.getBoundingClientRect().top < vh * 0.9) return;
    el.classList.add('reveal');
    // Escalonamento sutil entre irmãos de uma mesma grade.
    const idx = el.parentElement ? Array.from(el.parentElement.children).indexOf(el) : 0;
    el.style.setProperty('--d', `${Math.min(idx, 6) * 60}ms`);
    io.observe(el);
  });
};
