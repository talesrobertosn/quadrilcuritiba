import { readFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { stripTags, wordCount } from '../../lib/html.ts';
import type { Article, ArticleData } from '../../lib/types.ts';

import artroscopia from './artroscopia-de-quadril.ts';
import artrose from './artrose-de-quadril.ts';
import bursite from './bursite-no-quadril.ts';
import aliviar from './como-aliviar-dor-artrose-quadril.ts';
import virilha from './dor-na-virilha.ts';
import dor from './dor-no-quadril.ts';
import fratura from './fratura-de-quadril-no-idoso.ts';
import valeAPena from './protese-de-quadril-vale-a-pena.ts';
import protese from './protese-de-quadril.ts';
import custos from './quanto-custa-protese-de-quadril.ts';
import recuperacao from './recuperacao-protese-de-quadril.ts';

const HERE = dirname(fileURLToPath(import.meta.url));

/** Ordem de exibição no índice de artigos (pilares e novidades primeiro). */
const ORDER: ArticleData[] = [
  artrose, protese, virilha, artroscopia, custos, recuperacao, aliviar, bursite, dor, fratura, valeAPena,
];

/** Palavras por minuto usadas no tempo de leitura. */
const WPM = 220;

const load = (data: ArticleData): Article => {
  const body = readFileSync(join(HERE, `${data.slug}.html`), 'utf8');
  const words = wordCount(body) + data.faq.reduce((n, f) => n + wordCount(f.a) + wordCount(f.q), 0);
  const sections = [...body.matchAll(/<h2 id="([^"]+)"[^>]*>([\s\S]*?)<\/h2>/g)].map((m) => ({
    id: m[1] ?? '',
    label: stripTags(m[2] ?? ''),
  }));
  return {
    ...data,
    body,
    file: `${data.slug}.html`,
    words,
    readingMinutes: Math.max(3, Math.round(words / WPM)),
    sections,
  };
};

export const ARTICLES: Article[] = ORDER.map(load);

export const articleBySlug = (slug: string): Article => {
  const a = ARTICLES.find((x) => x.slug === slug);
  if (!a) throw new Error(`Artigo inexistente: ${slug}`);
  return a;
};
