/**
 * Ícones de traço (24×24, currentColor). Um só lugar para todos os SVGs de interface.
 * Uso: icon('search') → `<svg class="i">…</svg>`
 */
const PATHS = {
  search: '<circle cx="11" cy="11" r="7"/><path d="m20 20-3.6-3.6"/>',
  arrow: '<path d="M5 12h14M13 6l6 6-6 6"/>',
  arrowUp: '<path d="M12 19V5M5 12l7-7 7 7"/>',
  chevron: '<path d="m9 6 6 6-6 6"/>',
  chevronDown: '<path d="m6 9 6 6 6-6"/>',
  menu: '<path d="M4 7h16M4 12h16M4 17h10"/>',
  close: '<path d="M6 6l12 12M18 6 6 18"/>',
  clock: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
  calendar: '<rect x="3.5" y="5" width="17" height="15" rx="3"/><path d="M3.5 10h17M8 3v4M16 3v4"/>',
  book: '<path d="M4 5.5A2.5 2.5 0 0 1 6.5 3H20v15H6.5A2.5 2.5 0 0 0 4 20.5z"/><path d="M4 20.5A2.5 2.5 0 0 0 6.5 23H20v-5"/>',
  quote: '<path d="M7 7h4v4c0 3-1.5 5-4 6M15 7h4v4c0 3-1.5 5-4 6"/>',
  shield: '<path d="M12 3 4.5 6v5.5c0 4.6 3.1 8.3 7.5 9.5 4.4-1.2 7.5-4.9 7.5-9.5V6z"/><path d="m8.8 12 2.2 2.2 4.4-4.4"/>',
  check: '<path d="m5 12.5 4.2 4.2L19 7"/>',
  checkCircle: '<circle cx="12" cy="12" r="9"/><path d="m8.5 12.2 2.4 2.4 4.8-4.8"/>',
  alert: '<path d="M12 9v4M12 17h.01"/><path d="M10.3 3.9 1.8 18a2 2 0 0 0 1.7 3h17a2 2 0 0 0 1.7-3L13.7 3.9a2 2 0 0 0-3.4 0z"/>',
  info: '<circle cx="12" cy="12" r="9"/><path d="M12 11v5M12 7.8h.01"/>',
  mail: '<rect x="2.5" y="4.5" width="19" height="15" rx="3"/><path d="m3.5 7.5 8.5 6 8.5-6"/>',
  copy: '<rect x="8" y="8" width="12" height="12" rx="2.5"/><path d="M16 8V6a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h2"/>',
  external: '<path d="M14 4h6v6M20 4l-9 9"/><path d="M18 14v4a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4"/>',
  pin: '<path d="M12 21s-7-5.3-7-11a7 7 0 0 1 14 0c0 5.7-7 11-7 11z"/><circle cx="12" cy="10" r="2.6"/>',
  doc: '<path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8z"/><path d="M14 3v5h5M9 13h6M9 17h4"/>',
  cut: '<circle cx="6.5" cy="17.5" r="2.5"/><circle cx="17.5" cy="17.5" r="2.5"/><path d="M8.3 15.7 19 4M15.7 15.7 5 4"/>',
  cost: '<rect x="3" y="6" width="18" height="13" rx="2.5"/><path d="M3 10h18M7.5 15h4"/>',
  pulse: '<path d="M3 12h4l2.5 6 4-12 2.5 6H21"/>',
  home: '<path d="m4 11 8-7 8 7"/><path d="M6 10v10h12V10"/>',
  list: '<path d="M9 6h11M9 12h11M9 18h11"/><circle cx="4.5" cy="6" r="1.2"/><circle cx="4.5" cy="12" r="1.2"/><circle cx="4.5" cy="18" r="1.2"/>',
  hash: '<path d="M5 9h14M5 15h14M10 4 8 20M16 4l-2 16"/>',
  user: '<circle cx="12" cy="8" r="4"/><path d="M4 21a8 8 0 0 1 16 0"/>',
  users: '<circle cx="9" cy="8" r="3.5"/><path d="M2.5 20a6.5 6.5 0 0 1 13 0"/><path d="M16 4.6a3.5 3.5 0 0 1 0 6.8M21.5 20a6.5 6.5 0 0 0-4-6"/>',
  stethoscope: '<path d="M6 3v6a5 5 0 0 0 10 0V3"/><path d="M11 14v2a5 5 0 0 0 10 0v-3"/><circle cx="21" cy="11" r="2"/>',
  hospital: '<path d="M4 21V7l8-4 8 4v14"/><path d="M10 21v-5h4v5M12 8v5M9.5 10.5h5"/>',
  bone: '<path d="M7.5 4.5a2.5 2.5 0 0 0-3 3 2.5 2.5 0 0 0 1 4.6l7.4 7.4a2.5 2.5 0 0 0 4.6 1 2.5 2.5 0 0 0 3-3 2.5 2.5 0 0 0-1-4.6L12.1 5.5a2.5 2.5 0 0 0-4.6-1z"/>',
  walk: '<circle cx="13" cy="4" r="2"/><path d="m9 21 2.5-6.5L14 17v4M8 11l3-3 4 1 2 4M11.5 14.5 10 9"/>',
  sparkle: '<path d="M12 3v4M12 17v4M3 12h4M17 12h4M6 6l2.5 2.5M15.5 15.5 18 18M6 18l2.5-2.5M15.5 8.5 18 6"/>',
  sun: '<circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/>',
  moon: '<path d="M20.5 14.5A8.5 8.5 0 0 1 9.5 3.5a8.5 8.5 0 1 0 11 11z"/>',
  phone: '<path d="M5 3h3.5l1.8 4.6-2.3 1.5a11 11 0 0 0 6 6l1.5-2.3L20 14.5V18a2 2 0 0 1-2 2A15 15 0 0 1 3 5a2 2 0 0 1 2-2z"/>',
  globe: '<circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3c2.5 2.6 3.8 5.6 3.8 9s-1.3 6.4-3.8 9c-2.5-2.6-3.8-5.6-3.8-9S9.5 5.6 12 3z"/>',
  filter: '<path d="M4 5h16l-6 7.5V19l-4 2v-8.5z"/>',
  layers: '<path d="m12 3 9 5-9 5-9-5z"/><path d="m3 13 9 5 9-5"/>',
  send: '<path d="M21 3 10 14M21 3l-7 18-4-7-7-4z"/>',
  heart: '<path d="M12 20s-7.5-4.6-7.5-10.2A4.3 4.3 0 0 1 12 7.2a4.3 4.3 0 0 1 7.5 2.6C19.5 15.4 12 20 12 20z"/>',
} as const;

export type IconName = keyof typeof PATHS;

export const icon = (name: IconName, cls = 'i'): string =>
  `<svg class="${cls}" viewBox="0 0 24 24" aria-hidden="true" focusable="false">${PATHS[name]}</svg>`;

/** Ícone de categoria usado em cards e na busca. */
export const CATEGORY_ICON: Record<string, IconName> = {
  dor: 'pulse',
  diagnostico: 'doc',
  cirurgia: 'cut',
  recuperacao: 'walk',
};

/**
 * Marca do site em formato vetorial: releitura simplificada do símbolo
 * (pelve em verde-água, arco em verde-petróleo, ponto dourado), legível de 16 a 64 px.
 */
export const MARK = `<svg class="mark" viewBox="0 0 64 64" aria-hidden="true" focusable="false">
<rect width="64" height="64" rx="16" fill="#0E4A4C"/>
<path d="M13 22c0-6 5-9 10-7 3.2 1.3 5 4 9 4s5.8-2.7 9-4c5-2 10 1 10 7 0 7.5-6 11-8.5 16.5C40.5 44 37 47 32 47s-8.5-3-10.5-8.5C19 33 13 29.5 13 22z" fill="#8FCBC7"/>
<path d="M18.5 41c2.5 7 7.5 11 13.5 11s11-4 13.5-11" fill="none" stroke="#F3FAF9" stroke-width="4.2" stroke-linecap="round"/>
<circle cx="32" cy="15" r="5" fill="#D6A85A"/>
<path d="M25.5 27.5c1.8 3.6 4 5.5 6.5 5.5s4.7-1.9 6.5-5.5" fill="none" stroke="#0E4A4C" stroke-width="3.4" stroke-linecap="round"/>
</svg>`;
