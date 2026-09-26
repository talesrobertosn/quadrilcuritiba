/**
 * Documento base: <head> completo (SEO, Open Graph, schema), cabeçalho, rodapé e scripts.
 * Cada página chama `layout()` com o próprio conteúdo e metadados.
 */
import { SITE, abs } from '../site.config.ts';
import { esc, each } from '../lib/html.ts';
import { ldScript, physician, type Json } from '../lib/schema.ts';
import { FOOTER_GROUPS, MAIN_NAV, NAV_CTA } from '../data/nav.ts';
import { icon, MARK } from './icons.ts';

export interface BuildAssets {
  css: string;
  jsUrl: string;
}

let ASSETS: BuildAssets = { css: '', jsUrl: 'assets/app.js' };
export const setAssets = (a: BuildAssets): void => {
  ASSETS = a;
};

export interface PageMeta {
  /** Arquivo de saída, ex.: "protese-de-quadril.html". */
  path: string;
  title: string;
  description: string;
  ogTitle?: string;
  ogDescription?: string;
  ogType?: 'website' | 'article';
  image?: string;
  /** Item de menu a destacar. */
  navActive?: string;
  noindex?: boolean;
  modified?: string;
  published?: string;
  schema?: Array<Json | null>;
  /** Classe extra no <body>. */
  bodyClass?: string;
}

/** Script que roda antes da pintura: marca JS ativo e aplica o tema salvo, sem piscar. */
const THEME_BOOT =
  "(function(d){d.documentElement.classList.add('js');try{var t=localStorage.getItem('qc-theme');if(t)d.documentElement.dataset.theme=t}catch(e){}})(document)";

const FONTS =
  'https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,400..640;1,9..144,400..560&family=Inter:wght@400;500;600;700&display=swap';

const head = (m: PageMeta): string => {
  const url = abs(m.path);
  const image = abs(m.image ?? SITE.ogImage);
  return `<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<script>${THEME_BOOT}</script>
<title>${esc(m.title)}</title>
<meta name="description" content="${esc(m.description)}">
<link rel="canonical" href="${url}">
<meta name="robots" content="${m.noindex ? 'noindex,follow' : 'index,follow,max-image-preview:large,max-snippet:-1'}">
<meta name="theme-color" content="${SITE.themeColor}">
<meta name="color-scheme" content="light dark">
<meta name="format-detection" content="telephone=no">
<meta property="og:type" content="${m.ogType ?? 'article'}">
<meta property="og:locale" content="${SITE.locale}">
<meta property="og:site_name" content="${SITE.name}">
<meta property="og:title" content="${esc(m.ogTitle ?? m.title)}">
<meta property="og:description" content="${esc(m.ogDescription ?? m.description)}">
<meta property="og:url" content="${url}">
<meta property="og:image" content="${image}">
<meta property="og:image:alt" content="${esc(m.ogTitle ?? m.title)}">
${m.modified ? `<meta property="article:modified_time" content="${m.modified}">` : ''}
${m.published ? `<meta property="article:published_time" content="${m.published}">` : ''}
<meta name="twitter:card" content="summary_large_image">
<link rel="icon" href="favicon.ico" sizes="any">
<link rel="icon" href="assets/favicon.svg" type="image/svg+xml">
<link rel="apple-touch-icon" href="assets/favicon-512.png">
<link rel="manifest" href="site.webmanifest">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="${FONTS}">
<style>${ASSETS.css}</style>
<script type="module" src="${ASSETS.jsUrl}"></script>
${each(m.schema ?? [], (s) => ldScript(s))}
</head>`;
};

const header = (path: string, active?: string): string => `<a class="skip" href="#conteudo">Ir para o conteúdo</a>
<header class="site-header" data-header>
  <div class="hdr">
    <a class="brand" href="index.html" aria-label="${SITE.name}, página inicial">${MARK}<span class="brand-name">Quadril <b>Curitiba</b></span></a>
    <nav class="nav" id="site-nav" aria-label="Principal">
      ${each(MAIN_NAV, (l) => `<a href="${l.href}"${l.href === path ? ' aria-current="page"' : l.href === active ? ' class="is-active"' : ''}>${esc(l.label)}</a>`)}
      <a class="nav-cta-m" href="${NAV_CTA.href}"${NAV_CTA.href === path ? ' aria-current="page"' : ''}>${esc(NAV_CTA.label)}</a>
    </nav>
    <div class="hdr-tools">
      <button type="button" class="qs-open" data-qs-open aria-label="Buscar no site" aria-haspopup="dialog">
        ${icon('search')}<span class="qs-lbl">Buscar</span><kbd class="kbd" data-kbd>Ctrl K</kbd>
      </button>
      <button type="button" class="theme-toggle" data-theme-toggle aria-label="Alternar tema claro ou escuro">${icon('moon', 'i i-moon')}${icon('sun', 'i i-sun')}</button>
      <a class="btn btn-sm btn-primary hdr-cta" href="${NAV_CTA.href}">${icon('stethoscope')}<span>Cirurgiões</span></a>
      <button type="button" class="nav-toggle" data-nav-toggle aria-label="Abrir menu" aria-expanded="false" aria-controls="site-nav">
        <span></span><span></span><span></span>
      </button>
    </div>
  </div>
</header>`;

const footer = (): string => `<footer class="site-footer">
  <div class="wrap">
    <div class="ft-top">
      <div class="ft-brand">
        <a class="brand brand-inv" href="index.html">${MARK}<span class="brand-name">Quadril <b>Curitiba</b></span></a>
        <p>Guia independente sobre saúde e cirurgia do quadril, escrito em linguagem clara e apoiado em referências científicas citadas em cada página.</p>
        <button type="button" class="ft-search" data-qs-open>${icon('search')} Buscar um assunto <kbd class="kbd" data-kbd>Ctrl K</kbd></button>
      </div>
      ${each(
        FOOTER_GROUPS,
        (g) => `<div class="ft-col"><h2 class="ft-h">${esc(g.title)}</h2><ul>${each(g.links, (l) => `<li><a href="${l.href}">${esc(l.label)}</a></li>`)}</ul></div>`,
      )}
    </div>
    <p class="ft-disclaimer">${icon('info')}<span>Conteúdo de caráter exclusivamente informativo e educativo. Não substitui consulta, diagnóstico ou tratamento médico. Em caso de dor ou sintomas, procure um ortopedista. Em emergência, ligue 192 (SAMU).</span></p>
    <div class="ft-bottom">
      <span>&copy; <span data-year>2026</span> ${SITE.domain}</span>
      <span>${SITE.city}, ${SITE.region} &middot; Brasil</span>
      <a href="privacidade.html">Privacidade</a>
    </div>
  </div>
</footer>`;

export const layout = (m: PageMeta, main: string): string => {
  const schema = [...(m.schema ?? [])];
  if (SITE.doctor && m.path === 'index.html') schema.push({ '@context': 'https://schema.org', ...physician() });
  return `<!DOCTYPE html>
<html lang="${SITE.lang}">
${head({ ...m, schema })}
<body${m.bodyClass ? ` class="${m.bodyClass}"` : ''}>
${header(m.path, m.navActive)}
<main id="conteudo" tabindex="-1">
${main}
</main>
${footer()}
</body>
</html>
`;
};
