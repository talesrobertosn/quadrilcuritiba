import { $, $$, rafThrottle } from './dom.ts';

/**
 * Índice lateral: destaca a seção atual, mostra o progresso no anel
 * e vira um bloco recolhível no celular.
 */
export const initToc = (): void => {
  const toc = $('[data-toc]');
  if (!toc) return;
  const btn = $<HTMLButtonElement>('[data-toc-btn]', toc);
  const links = $$<HTMLAnchorElement>('a[href^="#"]', toc);
  const ring = $<SVGCircleElement>('.toc-ring-v', toc);
  const prose = $('[data-prose]');
  const targets = links
    .map((a) => document.getElementById(decodeURIComponent(a.hash.slice(1))))
    .filter((el): el is HTMLElement => !!el);

  const desktop = window.matchMedia('(min-width: 1100px)');
  const setOpen = (open: boolean) => {
    toc.classList.toggle('is-collapsed', !open);
    btn?.setAttribute('aria-expanded', String(open));
  };
  setOpen(desktop.matches);
  desktop.addEventListener('change', (m) => setOpen(m.matches));
  btn?.addEventListener('click', () => setOpen(toc.classList.contains('is-collapsed')));
  links.forEach((a) => a.addEventListener('click', () => !desktop.matches && setOpen(false)));

  const paint = rafThrottle(() => {
    const offset = 140;
    let active = -1;
    targets.forEach((t, i) => {
      if (t.getBoundingClientRect().top - offset <= 0) active = i;
    });
    links.forEach((a, i) => {
      const on = i === active;
      a.classList.toggle('on', on);
      if (on) a.setAttribute('aria-current', 'location');
      else a.removeAttribute('aria-current');
    });
    if (ring && prose) {
      const r = prose.getBoundingClientRect();
      const total = r.height - window.innerHeight * 0.5;
      const p = Math.min(1, Math.max(0, (-r.top + offset) / Math.max(total, 1)));
      ring.style.strokeDashoffset = String(100 - p * 100);
    }
  });
  window.addEventListener('scroll', paint, { passive: true });
  window.addEventListener('resize', paint);
  paint();
};
