import { $, $$ } from './dom.ts';

/** Filtro do índice de artigos por tema, sincronizado com o endereço (#dor, #cirurgia...). */
export const initLibraryFilter = (): void => {
  const group = $('[data-filter-group]');
  const listEl = $('[data-filter-list]');
  if (!group || !listEl) return;
  const chips = $$<HTMLButtonElement>('[data-filter]', group);
  const cards = $$<HTMLElement>('[data-cat]', listEl);
  const none = $('[data-noresult]');

  const apply = (f: string, push = false) => {
    if (!chips.some((c) => c.dataset.filter === f)) f = 'todos';
    chips.forEach((c) => c.setAttribute('aria-pressed', String(c.dataset.filter === f)));
    let shown = 0;
    cards.forEach((card) => {
      const ok = f === 'todos' || card.dataset.cat === f;
      card.hidden = !ok;
      if (ok) shown++;
    });
    if (none) none.hidden = shown > 0;
    if (push) history.replaceState(null, '', f === 'todos' ? location.pathname : `#${f}`);
  };
  chips.forEach((c) => c.addEventListener('click', () => apply(c.dataset.filter ?? 'todos', true)));
  apply(location.hash.slice(1) || 'todos');
  window.addEventListener('hashchange', () => apply(location.hash.slice(1) || 'todos'));
};

/** Filtro do diretório de cirurgiões: foco de atuação × forma de atendimento. */
export const initDirectoryFilter = (): void => {
  const box = $('[data-dir-filters]');
  const listEl = $('[data-dir-list]');
  if (!box || !listEl) return;
  const cards = $$<HTMLElement>('.scard', listEl);
  const count = $('[data-dir-count]');
  const none = $('[data-dir-none]');
  const state = { focus: 'todos', care: 'todos' };

  const apply = () => {
    let shown = 0;
    cards.forEach((c) => {
      const ok =
        (state.focus === 'todos' || (c.dataset.focus ?? '').split(' ').includes(state.focus)) &&
        (state.care === 'todos' || (c.dataset.care ?? '').split(' ').includes(state.care));
      c.hidden = !ok;
      if (ok) shown++;
    });
    if (count) count.textContent = `${shown} ${shown === 1 ? 'profissional' : 'profissionais'}`;
    if (none) none.hidden = shown > 0;
  };
  (['focus', 'care'] as const).forEach((key) => {
    const attr = key === 'focus' ? 'dirFocus' : 'dirCare';
    const chips = $$<HTMLButtonElement>(`[data-dir-${key}]`, box);
    chips.forEach((chip) =>
      chip.addEventListener('click', () => {
        state[key] = chip.dataset[attr] ?? 'todos';
        chips.forEach((c) => c.setAttribute('aria-pressed', String(c === chip)));
        apply();
      }),
    );
  });
};
