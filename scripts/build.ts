/**
 * Build do site: TypeScript → HTML estático na raiz do repositório (servida pelo GitHub Pages).
 *
 *   npm run build
 *
 * 1. Compila o CSS (src/styles) e o embute em cada página, para pintar sem requisição extra.
 * 2. Compila o TypeScript do navegador (src/client) para assets/app.js.
 * 3. Renderiza todas as páginas a partir dos dados tipados (src/content, src/data).
 * 4. Gera sitemap.xml, robots.txt, site.webmanifest e o índice da busca.
 */
import { createHash } from 'node:crypto';
import { mkdirSync, writeFileSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { build } from 'esbuild';

import { SITE, abs } from '../src/site.config.ts';
import { ARTICLES } from '../src/content/articles/index.ts';
import { PAGE_KEYWORDS, SHORTCUTS } from '../src/data/search.ts';
import { setAssets } from '../src/templates/layout.ts';
import { renderArticle } from '../src/pages/article.ts';
import { renderHome } from '../src/pages/home.ts';
import { renderLibrary } from '../src/pages/library.ts';
import { renderSurgeons } from '../src/pages/surgeons.ts';
import { renderAbout, renderNotFound, renderPrivacy } from '../src/pages/institutional.ts';

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const out = (p: string) => join(ROOT, p);
const write = (p: string, content: string) => {
  mkdirSync(dirname(out(p)), { recursive: true });
  writeFileSync(out(p), content);
};
const hash = (s: string) => createHash('sha256').update(s).digest('hex').slice(0, 10);

const t0 = performance.now();

/* 1. CSS ----------------------------------------------------------- */
const css = await build({
  entryPoints: [out('src/styles/main.css')],
  bundle: true,
  minify: true,
  write: false,
  target: ['chrome100', 'safari15', 'firefox100'],
  logLevel: 'warning',
});
const cssText = (css.outputFiles[0]?.text ?? '').trim();

/* 2. JS ------------------------------------------------------------ */
const js = await build({
  entryPoints: [out('src/client/main.ts')],
  bundle: true,
  minify: true,
  format: 'esm',
  target: ['chrome100', 'safari15', 'firefox100'],
  write: false,
  legalComments: 'none',
  logLevel: 'warning',
});
const jsText = js.outputFiles[0]?.text ?? '';
write('assets/app.js', jsText);
setAssets({ css: cssText, jsUrl: `assets/app.js?v=${hash(jsText)}` });

/* 3. Páginas ------------------------------------------------------- */
const pages: Array<[string, string]> = [
  ['index.html', renderHome()],
  ['artigos.html', renderLibrary()],
  ['cirurgioes-curitiba.html', renderSurgeons()],
  ['sobre.html', renderAbout()],
  ['privacidade.html', renderPrivacy()],
  ['404.html', renderNotFound()],
  ...ARTICLES.map((a): [string, string] => [a.file, renderArticle(a)]),
];
for (const [file, html] of pages) write(file, html);

/* 4. Busca --------------------------------------------------------- */
const INSTITUTIONAL: Array<{ u: string; t: string; d: string }> = [
  { u: 'index.html', t: 'Início', d: 'Guia de cirurgia do quadril em Curitiba' },
  { u: 'artigos.html', t: 'Todos os artigos', d: 'A biblioteca completa, por tema' },
  { u: 'cirurgioes-curitiba.html', t: 'Cirurgiões de quadril em Curitiba', d: 'Indicação, como escolher e onde se tratar' },
  { u: 'sobre.html', t: 'Sobre e política editorial', d: 'Como o conteúdo é feito' },
  { u: 'privacidade.html', t: 'Privacidade', d: 'Dados, cookies e LGPD' },
];
const searchIndex = [
  ...ARTICLES.map((a) => ({ u: a.file, t: a.cardTitle, d: a.cardText.split('. ')[0] ?? '', g: 'Páginas', k: `${PAGE_KEYWORDS[a.file] ?? ''} ${a.pill}` })),
  ...INSTITUTIONAL.map((p) => ({ ...p, g: 'Páginas', k: PAGE_KEYWORDS[p.u] ?? '' })),
  ...SHORTCUTS.map((s) => ({ ...s, g: 'Respostas rápidas' })),
  ...ARTICLES.flatMap((a) => a.sections.map((s) => ({ u: `${a.file}#${s.id}`, t: s.label, d: a.cardTitle, g: 'Seções' }))),
];
write('assets/search.json', JSON.stringify(searchIndex));

/* 5. Sitemap, robots, manifest ------------------------------------ */
const PRIORITY: Record<string, string> = {
  'index.html': '1.0', 'artrose-de-quadril.html': '0.9', 'protese-de-quadril.html': '0.9', 'cirurgioes-curitiba.html': '0.9',
  'quanto-custa-protese-de-quadril.html': '0.9', 'artigos.html': '0.8', 'sobre.html': '0.4', 'privacidade.html': '0.2',
};
const lastmod = (file: string): string => {
  const a = ARTICLES.find((x) => x.file === file);
  if (a) return a.modified;
  const m = pages.find(([f]) => f === file)?.[1].match(/"dateModified":"([\d-]+)"/);
  return m?.[1] ?? SITE.lastEditorialReview;
};
const sitemapFiles = pages.map(([f]) => f).filter((f) => f !== '404.html');
const imagesOf = (file: string): string[] => {
  const a = ARTICLES.find((x) => x.file === file);
  return a ? [...a.body.matchAll(/<img[^>]+src="([^"]+)"/g)].map((m) => m[1] ?? '').filter(Boolean) : [];
};
write(
  'sitemap.xml',
  `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
${sitemapFiles
  .map(
    (f) =>
      `  <url><loc>${abs(f)}</loc><lastmod>${lastmod(f)}</lastmod><priority>${PRIORITY[f] ?? '0.8'}</priority>${[...new Set(imagesOf(f))]
        .map((src) => `<image:image><image:loc>${abs(src)}</image:loc></image:image>`)
        .join('')}</url>`,
  )
  .join('\n')}
</urlset>
`,
);
write(
  'robots.txt',
  `User-agent: *
Allow: /
Disallow: /src/
Disallow: /scripts/
Disallow: /404.html
Disallow: /HANDOFF-quadrilcuritiba.md
Disallow: /README.md

Sitemap: ${SITE.url}sitemap.xml
`,
);
write(
  'site.webmanifest',
  JSON.stringify(
    {
      name: SITE.name,
      short_name: 'Quadril',
      description: 'Guia de saúde e cirurgia do quadril em Curitiba',
      lang: SITE.lang,
      start_url: './',
      display: 'standalone',
      background_color: '#FAF8F4',
      theme_color: SITE.themeColor,
      icons: [
        { src: 'assets/favicon.svg', type: 'image/svg+xml', sizes: 'any' },
        { src: 'assets/favicon-512.png', type: 'image/png', sizes: '512x512' },
      ],
    },
    null,
    2,
  ) + '\n',
);

const kb = (n: number) => `${(n / 1024).toFixed(1)} KB`;
console.log(
  `✓ ${pages.length} páginas · CSS ${kb(cssText.length)} (embutido) · JS ${kb(jsText.length)} · busca ${searchIndex.length} itens · ${Math.round(performance.now() - t0)} ms`,
);
