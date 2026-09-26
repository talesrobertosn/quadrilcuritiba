/**
 * QA obrigatório antes de publicar. Roda sobre o HTML gerado na raiz.
 *
 *   npm run qa
 *
 * Herda as verificações do QA antigo (build/qa.py) e acrescenta: âncoras entre páginas,
 * atributos de imagem, nome do dono ausente na Etapa 1 e tamanho das páginas.
 */
import { existsSync, readFileSync, readdirSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { parse, type HTMLElement } from 'node-html-parser';
import { SITE } from '../src/site.config.ts';

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const files = readdirSync(ROOT).filter((f) => f.endsWith('.html')).sort();
const sitemap = readFileSync(join(ROOT, 'sitemap.xml'), 'utf8');
const inSitemap = new Set([...sitemap.matchAll(/<loc>https:\/\/quadrilcuritiba\.com\.br\/([^<]*)<\/loc>/g)].map((m) => m[1] || 'index.html'));
const errors: string[] = [];
const warns: string[] = [];
const err = (f: string, m: string) => errors.push(`${f}: ${m}`);

const docs = new Map<string, HTMLElement>();
for (const f of files) docs.set(f, parse(readFileSync(join(ROOT, f), 'utf8')));
const idsOf = (f: string) => new Set(docs.get(f)?.querySelectorAll('[id]').map((e) => e.id) ?? []);

const clean = (s: string) => s.replace(/\s+/g, ' ').trim();

for (const f of files) {
  const html = readFileSync(join(ROOT, f), 'utf8');
  const doc = docs.get(f)!;
  const is404 = f === '404.html';

  if (html.includes('{{') || html.includes('undefined') || html.includes('[object Object]')) err(f, 'placeholder ou valor indefinido no HTML');

  const ids = doc.querySelectorAll('[id]').map((e) => e.id);
  const dup = ids.filter((id, i) => ids.indexOf(id) !== i);
  if (dup.length) err(f, `ids duplicados ${[...new Set(dup)].join(', ')}`);

  for (const el of doc.querySelectorAll('[href],[src]')) {
    const raw = el.getAttribute('href') ?? el.getAttribute('src') ?? '';
    if (/^(https?:|mailto:|tel:|data:)/.test(raw) || raw === '') continue;
    const [pathPart = '', hash] = raw.split('#');
    const target = pathPart.replace(/^\//, '').split('?')[0] ?? '';
    if (target && !existsSync(join(ROOT, target))) err(f, `link quebrado ${raw}`);
    if (hash) {
      const page = target || f;
      if (page.endsWith('.html') && docs.has(page)) {
        const known = idsOf(page);
        // Filtros do índice de artigos usam o hash sem elemento correspondente.
        const isFilter = page === 'artigos.html' && ['dor', 'diagnostico', 'cirurgia', 'recuperacao'].includes(hash);
        if (!known.has(hash) && !isFilter) err(f, `âncora inexistente ${raw}`);
      }
    }
  }

  const types: string[] = [];
  let faqSchema: string[] | null = null;
  for (const s of doc.querySelectorAll('script[type="application/ld+json"]')) {
    try {
      const d = JSON.parse(s.textContent) as { '@type': string; mainEntity?: Array<{ name: string }> };
      types.push(d['@type']);
      if (d['@type'] === 'FAQPage') faqSchema = (d.mainEntity ?? []).map((q) => q.name);
    } catch (e) {
      err(f, `JSON-LD inválido ${String(e).slice(0, 60)}`);
    }
  }

  for (const img of doc.querySelectorAll('img')) {
    if (img.getAttribute('alt') === undefined) err(f, `img sem alt ${img.getAttribute('src')}`);
    if (!img.getAttribute('width') || !img.getAttribute('height')) err(f, `img sem width/height ${img.getAttribute('src')}`);
  }
  for (const fig of doc.querySelectorAll('figure.post-fig')) {
    const svg = fig.querySelector('svg');
    if (svg && !fig.querySelector('img') && !svg.getAttribute('aria-labelledby')) err(f, 'svg de figura sem aria-labelledby');
  }

  if (doc.querySelectorAll('#site-nav').length !== 1) err(f, 'nav ausente ou duplicada');
  if (!doc.querySelector('#conteudo')) err(f, 'sem âncora #conteudo');
  if (!doc.querySelector('[data-qs-open]')) err(f, 'sem botão de busca');

  const canonical = doc.querySelector('link[rel="canonical"]')?.getAttribute('href') ?? '';
  const expected = f === 'index.html' ? SITE.url : SITE.url + f;
  if (canonical !== expected) err(f, `canonical divergente (${canonical})`);
  if (!is404 && !inSitemap.has(f)) err(f, 'fora do sitemap');

  const title = doc.querySelector('title')?.textContent ?? '';
  const desc = doc.querySelector('meta[name="description"]')?.getAttribute('content') ?? '';
  if (title.length > 65) err(f, `title com ${title.length} caracteres`);
  if (!desc) err(f, 'sem description');
  else if (desc.length > 160) err(f, `description com ${desc.length} caracteres`);
  else if (desc.length < 70 && !is404) warns.push(`${f}: description curta (${desc.length})`);

  if (!is404) {
    if (f !== 'index.html' && !types.includes('BreadcrumbList')) err(f, 'sem BreadcrumbList');
    if (!html.includes('dateModified')) err(f, 'sem dateModified');
  }
  if (doc.querySelectorAll('h1').length !== 1) err(f, 'mais de um h1 ou nenhum');

  const visible = doc.querySelectorAll('.faq summary').map((s) => clean(s.textContent));
  if (faqSchema || visible.length) {
    if (JSON.stringify(visible) !== JSON.stringify(faqSchema ?? [])) err(f, 'FAQ schema não espelha o FAQ visível');
  }

  // Etapa 1: o nome do dono nunca aparece.
  if (!SITE.doctor && /Tales|Siqueira Nascimento/i.test(html)) err(f, 'nome do dono presente na Etapa 1');
  if (/99902-?7734/.test(html)) err(f, 'número de WhatsApp antigo presente');

  const kb = Buffer.byteLength(html) / 1024;
  if (kb > 400) warns.push(`${f}: HTML com ${kb.toFixed(0)} KB`);
}

for (const loc of inSitemap) if (!existsSync(join(ROOT, loc))) errors.push(`sitemap aponta para arquivo inexistente: ${loc}`);
if (!existsSync(join(ROOT, 'CNAME'))) errors.push('CNAME ausente: o domínio próprio deixaria de funcionar');
if (!existsSync(join(ROOT, '.nojekyll'))) errors.push('.nojekyll ausente');

console.log(`ARQUIVOS: ${files.length}`);
for (const w of warns) console.log(`  aviso: ${w}`);
if (errors.length) {
  console.log('ERROS:');
  for (const e of errors) console.log(` - ${e}`);
  process.exit(1);
}
console.log('TUDO CERTO');
