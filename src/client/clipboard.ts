/** Copiar para a área de transferência, com recuo para navegadores antigos. */
export const copyText = async (value: string): Promise<boolean> => {
  try {
    if (navigator.clipboard?.writeText) {
      await navigator.clipboard.writeText(value);
      return true;
    }
  } catch {
    /* segue para o recuo */
  }
  const ta = document.createElement('textarea');
  ta.value = value;
  ta.setAttribute('readonly', '');
  ta.style.position = 'fixed';
  ta.style.opacity = '0';
  document.body.appendChild(ta);
  ta.select();
  let ok = false;
  try {
    ok = document.execCommand('copy');
  } catch {
    ok = false;
  }
  ta.remove();
  return ok;
};

/** Mostra a confirmação no `[data-copied]` mais próximo do botão. */
export const flash = (from: Element, text: string): void => {
  const note = from.parentElement?.querySelector<HTMLElement>('[data-copied]') ?? from.closest('div,p,form')?.querySelector<HTMLElement>('[data-copied]');
  if (!note) return;
  note.textContent = text;
  note.classList.add('on');
  window.setTimeout(() => note.classList.remove('on'), 2600);
};

export const initCopy = (): void => {
  document.addEventListener('click', async (e) => {
    const t = e.target as Element | null;
    const btn = t?.closest<HTMLElement>('[data-copy],[data-copy-list]');
    if (!btn) return;
    let value = btn.dataset.copy ?? '';
    if (btn.dataset.copyList) {
      const list = document.querySelector(btn.dataset.copyList);
      value = list ? Array.from(list.querySelectorAll('li')).map((li, i) => `${i + 1}. ${li.textContent?.trim() ?? ''}`).join('\n') : '';
    }
    if (!value) return;
    const ok = await copyText(value);
    flash(btn, ok ? (btn.dataset.copyList ? 'Lista copiada' : 'Copiado') : `Selecione e copie: ${value}`);
  });
};
