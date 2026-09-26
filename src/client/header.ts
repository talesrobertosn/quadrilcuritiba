import { $, isMac, rafThrottle } from './dom.ts';

/** Cabeçalho: sombra ao rolar, menu móvel acessível e atalho de teclado correto por sistema. */
export const initHeader = (): void => {
  const header = $('[data-header]');
  const toggle = $<HTMLButtonElement>('[data-nav-toggle]');
  const nav = $('#site-nav');

  if (header) {
    const paint = rafThrottle(() => header.classList.toggle('scrolled', window.scrollY > 8));
    window.addEventListener('scroll', paint, { passive: true });
    paint();
  }

  if (toggle && nav) {
    const set = (open: boolean) => {
      nav.classList.toggle('open', open);
      document.body.classList.toggle('nav-open', open);
      toggle.setAttribute('aria-expanded', String(open));
      toggle.setAttribute('aria-label', open ? 'Fechar menu' : 'Abrir menu');
    };
    toggle.addEventListener('click', () => set(!nav.classList.contains('open')));
    nav.addEventListener('click', (e) => {
      if ((e.target as Element).closest('a')) set(false);
    });
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && nav.classList.contains('open')) {
        set(false);
        toggle.focus();
      }
    });
    window.matchMedia('(min-width: 1080px)').addEventListener('change', (m) => m.matches && set(false));
  }

  if (isMac()) document.querySelectorAll('[data-kbd]').forEach((k) => (k.textContent = '⌘K'));
  document.querySelectorAll('[data-year]').forEach((n) => (n.textContent = String(new Date().getFullYear())));
};
