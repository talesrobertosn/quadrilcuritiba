/** Tema claro/escuro: segue o sistema e permite escolher, guardando a preferência. */
const KEY = 'qc-theme';

const current = (): 'light' | 'dark' => {
  const set = document.documentElement.dataset.theme;
  if (set === 'light' || set === 'dark') return set;
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
};

export const initTheme = (): void => {
  document.querySelectorAll<HTMLButtonElement>('[data-theme-toggle]').forEach((btn) => {
    const label = () => btn.setAttribute('aria-label', current() === 'dark' ? 'Usar tema claro' : 'Usar tema escuro');
    label();
    btn.addEventListener('click', () => {
      const next = current() === 'dark' ? 'light' : 'dark';
      document.documentElement.dataset.theme = next;
      try {
        localStorage.setItem(KEY, next);
      } catch {
        /* navegação privada */
      }
      label();
    });
  });
};
