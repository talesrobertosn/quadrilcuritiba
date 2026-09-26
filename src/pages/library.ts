/** Índice de artigos ("biblioteca"), com filtro por eixo temático. */
import { SITE, abs } from '../site.config.ts';
import { dateLong, each } from '../lib/html.ts';
import { breadcrumbs, webPage } from '../lib/schema.ts';
import type { Category } from '../lib/types.ts';
import { ARTICLES } from '../content/articles/index.ts';
import { layout } from '../templates/layout.ts';
import { icon } from '../templates/icons.ts';
import { articleCard, CATEGORY_LABEL, pageHero, surgeonCta } from '../templates/components.ts';

const CATS: Category[] = ['dor', 'diagnostico', 'cirurgia', 'recuperacao'];

export const renderLibrary = (): string => {
  const modified = ARTICLES.map((a) => a.modified).sort().at(-1) ?? SITE.lastEditorialReview;
  const minutes = ARTICLES.reduce((n, a) => n + a.readingMinutes, 0);
  const refs = ARTICLES.reduce((n, a) => n + a.refs.length, 0);
  const count = (c: Category) => ARTICLES.filter((a) => a.category === c).length;

  const main = `
${pageHero({
  crumbs: [{ name: 'Início', href: 'index.html' }, { name: 'Artigos' }],
  pill: 'Biblioteca',
  h1: 'Todos os artigos sobre saúde do quadril',
  lead: `${ARTICLES.length} textos longos, escritos em linguagem de gente e apoiados em estudos que estão citados no fim de cada página. Filtre pelo tema abaixo, ou busque direto pelo assunto que você quer.`,
  extra: `<div class="btn-row">
      <button type="button" class="btn btn-primary" data-qs-open>${icon('search')} Buscar um assunto</button>
      <a class="btn btn-ghost" href="dor-no-quadril.html">Estou com dor no quadril</a>
    </div>
    <ul class="hstats">
      <li><b>${ARTICLES.length}</b><span>artigos</span></li>
      <li><b>${(Math.round(minutes / 6) / 10).toLocaleString('pt-BR')} h</b><span>de leitura</span></li>
      <li><b>${refs}</b><span>referências</span></li>
      <li><b>${dateLong(modified).replace(/ de \d{4}$/, '')}</b><span>última atualização</span></li>
    </ul>`,
})}

<section class="band">
  <div class="wrap">
    <div class="chipbar" role="group" aria-label="Filtrar artigos por tema" data-filter-group>
      <button type="button" class="chip" data-filter="todos" aria-pressed="true">Todos <span class="ct">${ARTICLES.length}</span></button>
      ${each(CATS, (c) => `<button type="button" class="chip chip-${c}" data-filter="${c}" aria-pressed="false">${CATEGORY_LABEL[c]} <span class="ct">${count(c)}</span></button>`)}
    </div>
    <div class="agrid agrid-3" data-filter-list>
      ${each(ARTICLES, (a) => articleCard(a, { headingLevel: 2 }))}
    </div>
    <p class="noresult" data-noresult hidden>Nenhum artigo neste tema ainda.</p>
  </div>
</section>

${surgeonCta('compact')}`;

  return layout(
    {
      path: 'artigos.html',
      title: 'Artigos sobre Quadril: Artrose, Prótese, Dor e Recuperação',
      description: 'Todos os artigos do Quadril Curitiba: artrose, prótese, custos, recuperação, dor na virilha, bursite, artroscopia e fratura no idoso.',
      ogTitle: 'Todos os artigos sobre saúde do quadril',
      ogDescription: `${ARTICLES.length} textos longos sobre artrose, prótese, dor e recuperação do quadril, com as fontes citadas.`,
      ogType: 'website',
      navActive: 'artigos.html',
      modified,
      schema: [
        {
          ...webPage({ path: 'artigos.html', name: 'Todos os artigos sobre saúde do quadril', description: 'Índice completo dos artigos do Quadril Curitiba, organizados por tema.', modified, type: 'CollectionPage' }),
          mainEntity: {
            '@type': 'ItemList',
            name: 'Artigos do Quadril Curitiba',
            numberOfItems: ARTICLES.length,
            itemListElement: ARTICLES.map((a, i) => ({ '@type': 'ListItem', position: i + 1, name: a.cardTitle, url: abs(a.file) })),
          },
        },
        breadcrumbs([{ name: 'Início', path: 'index.html' }, { name: 'Artigos', path: 'artigos.html' }]),
      ],
    },
    main,
  );
};
