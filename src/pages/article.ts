/** Página de artigo: hero editorial, índice lateral com acompanhamento, corpo, resumo, FAQ e relacionados. */
import { SITE } from '../site.config.ts';
import { dateLong, each, esc } from '../lib/html.ts';
import { breadcrumbs, faqPage, medicalWebPage } from '../lib/schema.ts';
import type { Article } from '../lib/types.ts';
import { articleBySlug } from '../content/articles/index.ts';
import { layout } from '../templates/layout.ts';
import { MAIN_NAV } from '../data/nav.ts';
import { CATEGORY_ICON, icon } from '../templates/icons.ts';
import {
  CATEGORY_LABEL, crumbs, editorialBox, faqSection, references, relatedSection, surgeonCta, takeaways,
} from '../templates/components.ts';

const toc = (a: Article): string => `<nav class="toc" data-toc aria-label="Nesta página">
  <button type="button" class="toc-btn" data-toc-btn aria-expanded="true" aria-controls="toc-list">
    <span class="toc-ring" aria-hidden="true"><svg viewBox="0 0 36 36"><circle cx="18" cy="18" r="15.5"/><circle class="toc-ring-v" cx="18" cy="18" r="15.5" pathLength="100"/></svg></span>
    <span class="toc-lbl">Nesta página <small>${a.toc.length} seções</small></span>${icon('chevronDown', 'i toc-chev')}
  </button>
  <ol id="toc-list">${each(a.toc, (t) => `<li><a href="#${t.id}">${esc(t.label)}</a></li>`)}</ol>
</nav>`;

export const renderArticle = (a: Article): string => {
  const related = a.related.map(articleBySlug);
  const doctor = SITE.doctor;
  const main = `<article class="post cat-${a.category}">
  <header class="ahero">
    <div class="ahero-bg" aria-hidden="true"></div>
    <div class="wrap ahero-inner">
      ${crumbs([{ name: 'Início', href: 'index.html' }, { name: 'Artigos', href: 'artigos.html' }, { name: a.crumb }])}
      <a class="pill pill-cat" href="artigos.html#${a.category}">${icon(CATEGORY_ICON[a.category] ?? 'doc')} ${esc(CATEGORY_LABEL[a.category])}<span class="pill-sep" aria-hidden="true"></span>${esc(a.pill)}</a>
      <h1>${a.h1}</h1>
      <p class="lead">${a.lead}</p>
      <ul class="ameta">
        ${doctor ? `<li class="ameta-author">${icon('user')}<span>Por <b>${esc(doctor.displayName)}</b>, ${esc(doctor.crm)}</span></li>` : ''}
        <li>${icon('clock')}<span><b>${a.readingMinutes} min</b> de leitura</span></li>
        <li>${icon('calendar')}<span>Revisado em <time datetime="${a.reviewed}">${dateLong(a.reviewed)}</time></span></li>
        <li>${icon('book')}<span><a href="#referencias">${a.refs.length} ${a.refs.length === 1 ? 'referência' : 'referências'}</a></span></li>
      </ul>
    </div>
  </header>

  <div class="wrap post-grid">
    <aside class="post-side">
      ${toc(a)}
      <div class="side-card">
        <p>${icon('stethoscope')} Precisa de um especialista em quadril em Curitiba?</p>
        <a href="cirurgioes-curitiba.html">Ver cirurgiões e como escolher ${icon('arrow')}</a>
      </div>
    </aside>
    <div class="post-main">
      <div class="prose" data-prose>
${a.body}
      </div>
      ${takeaways(a.takeaways)}
      ${references(a.refs)}
      ${editorialBox(a)}
    </div>
  </div>
</article>
${faqSection(a.faqTitle, a.faq)}
${relatedSection(related)}
${surgeonCta()}`;

  return layout(
    {
      path: a.file,
      title: a.title,
      description: a.description,
      ogTitle: a.ogTitle,
      ogDescription: a.ogDescription,
      ogType: 'article',
      image: a.image,
      navActive: MAIN_NAV.some((l) => l.href === a.file) ? a.file : 'artigos.html',
      modified: a.modified,
      published: a.published,
      bodyClass: 'is-article',
      schema: [
        medicalWebPage(a),
        breadcrumbs([
          { name: 'Início', path: 'index.html' },
          { name: 'Artigos', path: 'artigos.html' },
          { name: a.crumb, path: a.file },
        ]),
        faqPage(a.faq),
      ],
    },
    main,
  );
};
