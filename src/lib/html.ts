/** Utilidades de HTML e texto usadas pelos templates. */

const ESC: Record<string, string> = { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' };

/** Escapa texto puro para uso em conteúdo ou atributo HTML. */
export const esc = (s: string | number): string => String(s).replace(/[&<>"']/g, (c) => ESC[c] ?? c);

/** Junta partes de template ignorando `false`, `null` e `undefined`. */
export const join = (parts: Array<string | false | null | undefined>, sep = ''): string =>
  parts.filter((p): p is string => typeof p === 'string' && p.length > 0).join(sep);

/** Mapeia uma lista para HTML. */
export const each = <T>(items: readonly T[], fn: (item: T, i: number) => string): string => items.map(fn).join('');

const ENTITIES: Record<string, string> = {
  '&nbsp;': ' ', '&amp;': '&', '&lt;': '<', '&gt;': '>', '&quot;': '"', '&#39;': "'",
  '&mdash;': '—', '&ndash;': '–', '&middot;': '·', '&rsaquo;': '›', '&rarr;': '→', '&hellip;': '…',
};

/** Remove tags e decodifica as entidades mais comuns. */
export const stripTags = (html: string): string =>
  html
    .replace(/<svg[\s\S]*?<\/svg>/g, ' ')
    .replace(/<[^>]+>/g, ' ')
    .replace(/&[a-z#0-9]+;/gi, (e) => ENTITIES[e] ?? ' ')
    .replace(/\s+/g, ' ')
    .trim();

export const wordCount = (html: string): number => stripTags(html).split(' ').filter(Boolean).length;

const MONTHS = ['janeiro', 'fevereiro', 'março', 'abril', 'maio', 'junho', 'julho', 'agosto', 'setembro', 'outubro', 'novembro', 'dezembro'];

/** "2026-09-03" → "3 de setembro de 2026". */
export const dateLong = (iso: string): string => {
  const [y, m, d] = iso.split('-').map(Number);
  return `${d} de ${MONTHS[(m ?? 1) - 1]} de ${y}`;
};

/** "2026-09-03" → "setembro de 2026". */
export const monthYear = (iso: string): string => {
  const [y, m] = iso.split('-').map(Number);
  return `${MONTHS[(m ?? 1) - 1]} de ${y}`;
};

/** Normaliza para busca: minúsculas e sem acentos. */
export const norm = (s: string): string => s.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '');
