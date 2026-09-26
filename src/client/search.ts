import { $$, norm, svg } from './dom.ts';

/**
 * Busca rápida (Ctrl K, ⌘K ou "/"): páginas, respostas diretas e todas as seções do site.
 * O índice (assets/search.json) é gerado no build e só é baixado quando a busca abre.
 */
interface Entry {
  u: string;
  t: string;
  d: string;
  g: 'Páginas' | 'Respostas rápidas' | 'Seções' | 'Nesta página';
  k?: string;
  /** Campos normalizados, preenchidos ao carregar. */
  _t?: string;
  _k?: string;
  _d?: string;
}

const GROUP_ICON: Record<Entry['g'], string> = {
  Páginas: 'page',
  'Respostas rápidas': 'answer',
  Seções: 'hash',
  'Nesta página': 'hash',
};

const GROUP_ORDER: Entry['g'][] = ['Nesta página', 'Respostas rápidas', 'Páginas', 'Seções'];

let index: Entry[] | null = null;
let loading: Promise<Entry[]> | null = null;

const prep = (e: Entry): Entry => ({ ...e, _t: norm(e.t), _k: norm(e.k ?? ''), _d: norm(e.d) });

const load = (url: string): Promise<Entry[]> => {
  if (index) return Promise.resolve(index);
  loading ??= fetch(url)
    .then((r) => (r.ok ? (r.json() as Promise<Entry[]>) : []))
    .catch(() => [] as Entry[])
    .then((list) => (index = list.map(prep)));
  return loading;
};

const score = (e: Entry, q: string, words: string[]): number => {
  const t = e._t ?? '', k = e._k ?? '', d = e._d ?? '';
  let s = 0;
  if (t.startsWith(q)) s = 100;
  else if (t.includes(q)) s = 75;
  else if (k.includes(q)) s = 50;
  else if (d.includes(q)) s = 35;
  else if (words.length > 1 && words.every((w) => `${t} ${k} ${d}`.includes(w))) s = 25;
  if (!s) return 0;
  if (e.g === 'Páginas') s += 6;
  if (e.g === 'Respostas rápidas') s += 4;
  if (e.g === 'Nesta página') s += 8;
  return s;
};

const escapeHtml = (s: string) => s.replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' })[c] ?? c);

const highlight = (text: string, q: string): string => {
  if (!q) return escapeHtml(text);
  const n = norm(text);
  const i = n.indexOf(q);
  if (i < 0) return escapeHtml(text);
  return `${escapeHtml(text.slice(0, i))}<mark>${escapeHtml(text.slice(i, i + q.length))}</mark>${escapeHtml(text.slice(i + q.length))}`;
};

export const initSearch = (): void => {
  const openers = $$('[data-qs-open]');
  if (!openers.length) return;
  const script = document.querySelector<HTMLScriptElement>('script[type="module"][src*="app"]');
  const base = script ? new URL('.', script.src).href : new URL('assets/', location.href).href;
  const indexUrl = `${base}search.json`;

  const here = location.pathname.split('/').pop() || 'index.html';
  const local: Entry[] = $$('[data-prose] h2[id]').map((h) =>
    prep({ u: `#${h.id}`, t: (h.textContent ?? '').trim(), d: 'Ir para a seção', g: 'Nesta página' }),
  );

  const root = document.createElement('div');
  root.className = 'qs';
  root.innerHTML = `
    <div class="qs-veil" data-close></div>
    <div class="qs-panel" role="dialog" aria-modal="true" aria-label="Buscar no site">
      <div class="qs-field">
        <svg class="i" viewBox="0 0 24 24" aria-hidden="true"><circle cx="11" cy="11" r="7"/><path d="m20 20-3.6-3.6"/></svg>
        <input type="search" id="qs-input" autocomplete="off" autocapitalize="off" spellcheck="false" enterkeyhint="go"
          role="combobox" aria-expanded="true" aria-controls="qs-list" aria-autocomplete="list"
          placeholder="Buscar: prótese, virilha, custo, dormir de lado…">
        <button type="button" class="qs-esc" data-close aria-label="Fechar a busca">Esc</button>
      </div>
      <ul class="qs-list" id="qs-list" role="listbox" aria-label="Resultados"></ul>
      <div class="qs-foot" aria-hidden="true">
        <span><kbd class="kbd">↑</kbd><kbd class="kbd">↓</kbd> navegar</span>
        <span><kbd class="kbd">Enter</kbd> abrir</span>
        <span><kbd class="kbd">Esc</kbd> fechar</span>
      </div>
    </div>`;
  document.body.appendChild(root);

  const input = root.querySelector('#qs-input') as HTMLInputElement;
  const list = root.querySelector('#qs-list') as HTMLUListElement;
  let items: HTMLAnchorElement[] = [];
  let sel = 0;
  let lastFocus: HTMLElement | null = null;

  const mark = (i: number) => {
    if (!items.length) return;
    sel = (i + items.length) % items.length;
    items.forEach((a, n) => {
      a.classList.toggle('sel', n === sel);
      a.setAttribute('aria-selected', String(n === sel));
    });
    const cur = items[sel];
    if (!cur) return;
    input.setAttribute('aria-activedescendant', cur.id);
    cur.scrollIntoView({ block: 'nearest' });
  };

  const render = (raw: string) => {
    const q = norm(raw).trim();
    const all = [...local, ...(index ?? [])];
    let rows: Entry[];
    if (!q) {
      rows = [...local.slice(0, 5), ...(index ?? []).filter((e) => e.g === 'Páginas' && !e.u.startsWith(here + '#') && e.u !== here)];
    } else {
      const words = q.split(/\s+/).filter(Boolean);
      rows = all
        .map((e) => ({ e, s: score(e, q, words) }))
        .filter((r) => r.s > 0)
        .sort((a, b) => b.s - a.s)
        .map((r) => r.e);
    }
    const seen = new Set<string>();
    rows = rows.filter((r) => (seen.has(r.u) ? false : (seen.add(r.u), true))).slice(0, 30);
    rows.sort((a, b) => GROUP_ORDER.indexOf(a.g) - GROUP_ORDER.indexOf(b.g));

    list.innerHTML = '';
    items = [];
    if (!rows.length) {
      list.innerHTML = `<li class="qs-empty">${index ? 'Nada encontrado. Tente “prótese”, “artrose”, “custo” ou “dor”.' : 'Carregando…'}</li>`;
      return;
    }
    let group = '';
    rows.forEach((e, n) => {
      if (e.g !== group) {
        group = e.g;
        const gl = document.createElement('li');
        gl.className = 'qs-group';
        gl.setAttribute('role', 'presentation');
        gl.textContent = group;
        list.appendChild(gl);
      }
      const li = document.createElement('li');
      li.setAttribute('role', 'presentation');
      const a = document.createElement('a');
      a.className = 'qs-item';
      a.href = e.u;
      a.id = `qs-opt-${n}`;
      a.setAttribute('role', 'option');
      a.innerHTML = `<span class="qs-ico">${svg(GROUP_ICON[e.g])}</span><span class="qs-txt"><span class="qs-t">${highlight(e.t, q)}</span><span class="qs-d">${escapeHtml(e.d)}</span></span>${svg('arrow')}`;
      a.addEventListener('mousemove', () => mark(items.indexOf(a)));
      a.addEventListener('click', () => close(false));
      li.appendChild(a);
      list.appendChild(li);
      items.push(a);
    });
    mark(0);
  };

  const open = () => {
    lastFocus = document.activeElement as HTMLElement | null;
    root.classList.add('open');
    document.body.classList.add('no-scroll');
    input.value = '';
    render('');
    requestAnimationFrame(() => input.focus());
    void load(indexUrl).then(() => root.classList.contains('open') && render(input.value));
  };
  const close = (restore = true) => {
    root.classList.remove('open');
    document.body.classList.remove('no-scroll');
    if (restore) lastFocus?.focus?.();
  };

  document.addEventListener('click', (e) => {
    const t = e.target as Element;
    if (t.closest('[data-qs-open]')) {
      e.preventDefault();
      open();
    }
  });
  // Pré-carrega o índice quando o usuário mostra intenção de buscar.
  openers.forEach((b) => b.addEventListener('pointerenter', () => void load(indexUrl), { once: true }));
  root.addEventListener('click', (e) => {
    if ((e.target as Element).hasAttribute('data-close')) close();
  });
  input.addEventListener('input', () => render(input.value));
  root.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      e.preventDefault();
      close();
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      mark(sel + 1);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      mark(sel - 1);
    } else if (e.key === 'Enter' && items[sel]) {
      e.preventDefault();
      items[sel]?.click();
    } else if (e.key === 'Tab') {
      e.preventDefault();
      input.focus();
    }
  });
  document.addEventListener('keydown', (e) => {
    const tag = (e.target as HTMLElement).tagName;
    const typing = tag === 'INPUT' || tag === 'TEXTAREA' || tag === 'SELECT' || (e.target as HTMLElement).isContentEditable;
    if ((e.key === 'k' || e.key === 'K') && (e.metaKey || e.ctrlKey)) {
      e.preventDefault();
      if (root.classList.contains('open')) close();
      else open();
    } else if (e.key === '/' && !typing && !root.classList.contains('open')) {
      e.preventDefault();
      open();
    }
  });
};
