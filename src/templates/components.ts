/** Componentes reutilizáveis de página. Cada função devolve uma string de HTML. */
import { SITE } from '../site.config.ts';
import { dateLong, each, esc, join } from '../lib/html.ts';
import type { Article, Category, FaqItem } from '../lib/types.ts';
import { CATEGORY_ICON, icon } from './icons.ts';

export const CATEGORY_LABEL: Record<Category, string> = {
  dor: 'Dor e sintomas',
  diagnostico: 'Diagnóstico',
  cirurgia: 'Cirurgia e prótese',
  recuperacao: 'Recuperação',
};

/* ---------------------------------------------------------------- */

export interface Crumb {
  name: string;
  href?: string;
}

export const crumbs = (items: Crumb[]): string => `<nav class="crumbs" aria-label="Trilha de navegação"><ol>${each(
  items,
  (c, i) =>
    `<li>${c.href && i < items.length - 1 ? `<a href="${c.href}">${esc(c.name)}</a>` : `<span aria-current="page">${esc(c.name)}</span>`}</li>`,
)}</ol></nav>`;

/** Cabeçalho de página interna (não artigo). */
export const pageHero = (o: { crumbs: Crumb[]; pill: string; h1: string; lead: string; extra?: string; tone?: 'tint' | 'dark' }): string => `
<section class="phero${o.tone === 'dark' ? ' phero-dark' : ''}">
  <div class="phero-bg" aria-hidden="true"></div>
  <div class="wrap phero-inner">
    ${crumbs(o.crumbs)}
    <span class="pill">${esc(o.pill)}</span>
    <h1>${o.h1}</h1>
    <p class="lead">${o.lead}</p>
    ${o.extra ?? ''}
  </div>
</section>`;

/* ---------------------------------------------------------------- */

export const faqList = (faq: FaqItem[]): string => `<div class="faq">${each(
  faq,
  (f) => `<details><summary>${esc(f.q)}<span class="faq-ico" aria-hidden="true"></span></summary><div class="faq-body">${f.a}</div></details>`,
)}</div>`;

export const faqSection = (title: string, faq: FaqItem[], id = 'perguntas'): string => `
<section class="band band-mist" id="${id}">
  <div class="wrap faq-grid">
    <div class="faq-head">
      <p class="eyebrow">Perguntas frequentes</p>
      <h2>${title}</h2>
      <p class="muted">Respostas curtas. O detalhe de cada uma está no texto acima.</p>
      <button type="button" class="btn btn-ghost btn-sm" data-qs-open>${icon('search')} Buscar outra dúvida</button>
    </div>
    ${faqList(faq)}
  </div>
</section>`;

export const takeaways = (items: string[]): string => `<aside class="takeaways" aria-labelledby="resumo-t">
  <div class="tk-head">${icon('sparkle')}<h2 id="resumo-t">Em resumo</h2></div>
  <ol>${each(items, (t) => `<li>${t}</li>`)}</ol>
</aside>`;

export const references = (refs: string[]): string =>
  refs.length
    ? `<div class="refs" id="referencias"><details><summary>${icon('book')}<span>Referências científicas <small>${refs.length} ${refs.length === 1 ? 'fonte' : 'fontes'}</small></span><span class="faq-ico" aria-hidden="true"></span></summary><ol>${each(refs, (r) => `<li>${r}</li>`)}</ol></details></div>`
    : '';

/* ---------------------------------------------------------------- */

export const articleCard = (a: Article, opts: { featured?: boolean; headingLevel?: 2 | 3 } = {}): string => {
  const h = opts.headingLevel ?? 3;
  return `<article class="acard cat-${a.category}${opts.featured ? ' acard-feat' : ''}" data-cat="${a.category}">
  <div class="acard-top"><span class="acard-ico">${icon(CATEGORY_ICON[a.category] ?? 'doc')}</span><span class="tag">${esc(a.tag)}</span></div>
  <h${h} class="acard-t"><a href="${a.file}">${esc(a.cardTitle)}</a></h${h}>
  <p>${esc(a.cardText)}</p>
  <div class="acard-meta"><span>${icon('clock')} ${a.readingMinutes} min</span><span>${icon('book')} ${a.refs.length} ${a.refs.length === 1 ? 'fonte' : 'fontes'}</span><span class="acard-go" aria-hidden="true">${icon('arrow')}</span></div>
</article>`;
};

export const relatedSection = (list: Article[]): string =>
  list.length
    ? `<section class="band" aria-labelledby="leia-t">
  <div class="wrap">
    <div class="sec-head"><p class="eyebrow">Continue lendo</p><h2 id="leia-t">Leia também</h2></div>
    <div class="agrid agrid-3">${each(list, (a) => articleCard(a))}</div>
  </div>
</section>`
    : '';

/* ---------------------------------------------------------------- */

/** Bloco de indicação de cirurgiões: dois caminhos, para paciente e para profissional. */
export const surgeonCta = (variant: 'full' | 'compact' = 'full'): string => `
<section class="band" aria-labelledby="cta-cir-t">
  <div class="wrap">
    <div class="cta-cir${variant === 'compact' ? ' cta-compact' : ''}">
      <div class="cta-glow" aria-hidden="true"></div>
      <div class="cta-main">
        <p class="eyebrow eyebrow-inv">Cirurgia do quadril em Curitiba</p>
        <h2 id="cta-cir-t">Procurando um cirurgião de quadril?</h2>
        <p>Reunimos o que conferir antes de escolher, os caminhos pelo SUS, pelo convênio e no particular, e um espaço gratuito de indicação de cirurgiões de quadril que atendem em Curitiba.</p>
        <div class="btn-row">
          <a class="btn btn-gold" href="cirurgioes-curitiba.html">${icon('users')} Ver cirurgiões e como escolher</a>
          <a class="btn btn-glass" href="cirurgioes-curitiba.html#para-cirurgioes">Sou cirurgião de quadril</a>
        </div>
      </div>
      <ul class="cta-points">
        <li>${icon('shield')}<span><b>CRM e RQE conferidos</b> no portal do CFM antes de qualquer indicação</span></li>
        <li>${icon('heart')}<span><b>Gratuito e sem vínculo comercial</b>: ninguém paga para aparecer</span></li>
        <li>${icon('pin')}<span><b>Curitiba e região</b>, com filtro por foco de atuação e forma de atendimento</span></li>
      </ul>
    </div>
  </div>
</section>`;

/** Caixa de transparência editorial ao fim do artigo (e assinatura do médico na Etapa 2). */
export const editorialBox = (a: Article): string => {
  const d = SITE.doctor;
  const who = d
    ? `<div class="ed-author">${d.photo ? `<img src="${d.photo}" alt="${esc(d.displayName)}" width="64" height="64" loading="lazy">` : icon('user')}<div><b>Escrito e revisado por ${esc(d.displayName)}</b><span>${esc(d.title)} &middot; ${esc(d.crm)} &middot; ${esc(d.rqe)}</span></div></div>`
    : '';
  return `<aside class="edbox" aria-label="Sobre este conteúdo">
  ${who}
  <ul>
    <li>${icon('book')}<span><b>${a.refs.length} referências</b> científicas citadas, listadas acima</span></li>
    <li>${icon('calendar')}<span>Revisado em <b><time datetime="${a.reviewed}">${dateLong(a.reviewed)}</time></b>${a.modified !== a.reviewed ? `, atualizado em <time datetime="${a.modified}">${dateLong(a.modified)}</time>` : ''}</span></li>
    <li>${icon('shield')}<span>Informativo, sem publicidade. <a href="sobre.html#politica-editorial">Conheça a política editorial</a></span></li>
  </ul>
</aside>`;
};

export const sectionHead = (o: { eyebrow: string; title: string; text?: string; id?: string; center?: boolean }): string =>
  `<div class="sec-head${o.center ? ' sec-center' : ''}"><p class="eyebrow">${o.eyebrow}</p><h2${o.id ? ` id="${o.id}"` : ''}>${o.title}</h2>${o.text ? `<p class="muted">${o.text}</p>` : ''}</div>`;


