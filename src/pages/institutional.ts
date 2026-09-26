/** Páginas institucionais: Sobre (com política editorial), Privacidade e 404. */
import { SITE } from '../site.config.ts';
import { each, esc } from '../lib/html.ts';
import { breadcrumbs, physician, webPage } from '../lib/schema.ts';
import { ARTICLES } from '../content/articles/index.ts';
import { layout } from '../templates/layout.ts';
import { icon, type IconName } from '../templates/icons.ts';
import { pageHero } from '../templates/components.ts';

const PRINCIPLES: Array<{ i: IconName; t: string; d: string }> = [
  { i: 'book', t: 'Fonte citada em toda afirmação relevante', d: 'Cada artigo termina com a lista de referências científicas usadas: revisões sistemáticas, ensaios clínicos, registros e diretrizes.' },
  { i: 'layers', t: 'Benefícios e riscos lado a lado', d: 'Nenhum tratamento é apresentado só pelo lado bom. Quando falamos de cirurgia, falamos também das complicações e das alternativas.' },
  { i: 'pulse', t: 'Honestidade com os números', d: 'Quando a evidência é forte, dizemos. Quando é fraca ou o efeito é pequeno, também, mesmo que o tratamento seja popular.' },
  { i: 'shield', t: 'Sem promessa de resultado', d: 'Seguimos as regras de publicidade médica do Conselho Federal de Medicina: sem depoimentos, sem antes e depois, sem garantias.' },
  { i: 'doc', t: 'Imagens ilustrativas', d: 'As imagens e os diagramas são didáticos, criados para o site, e nunca mostram pacientes reais identificáveis.' },
  { i: 'cost', t: 'Valores como referência', d: 'Custos citados vêm de estudos publicados e servem como ordem de grandeza. Não são orçamento.' },
];

export const renderAbout = (): string => {
  const modified = '2026-09-25';
  const d = SITE.doctor;
  const doctorBlock = d
    ? `<h2 id="medico">Quem escreve</h2>
<div class="edbox"><div class="ed-author">${d.photo ? `<img src="${d.photo}" alt="${esc(d.displayName)}" width="64" height="64" loading="lazy">` : icon('user')}<div><b>${esc(d.displayName)}</b><span>${esc(d.title)} &middot; ${esc(d.crm)} &middot; ${esc(d.rqe)}</span></div></div><p>${esc(d.bio)}</p></div>`
    : '';
  const main = `
${pageHero({
  crumbs: [{ name: 'Início', href: 'index.html' }, { name: 'Sobre' }],
  pill: 'Sobre',
  h1: 'Sobre o Quadril Curitiba',
  lead: 'Um guia de informação sobre saúde do quadril, feito para pacientes e suas famílias.',
})}
<section class="band">
  <div class="wrap read prose">
    <h2 id="proposito">O propósito</h2>
    <p>O Quadril Curitiba nasceu para reunir, em linguagem clara, informação confiável sobre as doenças e as cirurgias do quadril: da artrose à prótese, da dor cotidiana à recuperação. A ideia é simples: ajudar quem está em dúvida ou prestes a tomar uma decisão importante a entender melhor o que está acontecendo, sempre ao lado do seu médico.</p>
    <p>Hoje são ${ARTICLES.length} guias longos, com ${ARTICLES.reduce((n, a) => n + a.refs.length, 0)} referências científicas citadas, e um <a href="cirurgioes-curitiba.html">espaço gratuito de indicação de cirurgiões de quadril em Curitiba</a>.</p>
    ${doctorBlock}
    <h2 id="politica-editorial">Política editorial</h2>
    <p>Os textos buscam apoio em literatura médica e protocolos reconhecidos, e procuram apresentar sempre os dois lados, sem promessas e sem sensacionalismo. O objetivo é informar, não vender. Estes são os princípios que seguimos em todas as páginas:</p>
  </div>
  <div class="wrap">
    <div class="checklist checklist-3">
      ${each(PRINCIPLES, (p) => `<div class="ck">${icon(p.i, 'i ck-i')}<h3>${p.t}</h3><p>${p.d}</p></div>`)}
    </div>
  </div>
  <div class="wrap read prose">
    <h2 id="revisao">Revisão e atualização</h2>
    <p>Cada artigo mostra a data da última revisão no topo e ao final. Quando surge um estudo relevante, uma diretriz nova ou uma mudança de regra (da ANS ou do SUS, por exemplo), o texto é revisto e a data é atualizada.</p>
    <h2 id="aviso">Um aviso importante</h2>
    <p>Todo o conteúdo deste site tem caráter exclusivamente informativo e educativo. Ele não substitui a consulta, o diagnóstico ou o tratamento por um profissional de saúde. Se você está com dor ou outros sintomas, procure um ortopedista. Em emergência, ligue 192.</p>
    <h2 id="contato">Contato</h2>
    <p>Correções, sugestões de tema e pedidos de inclusão no diretório de cirurgiões podem ser enviados para <button type="button" class="linkbtn" data-copy="${SITE.email}">${SITE.email}</button><span class="copied" data-copied role="status" aria-live="polite"></span>.</p>
  </div>
</section>`;
  const doc = physician();
  return layout(
    {
      path: 'sobre.html',
      title: 'Sobre o Quadril Curitiba e Política Editorial',
      description: 'Sobre o Quadril Curitiba: um guia informativo sobre saúde do quadril para pacientes, com conteúdo baseado em evidência e sem fins comerciais.',
      ogTitle: 'Sobre o Quadril Curitiba',
      ogDescription: 'Um guia de informação sobre saúde do quadril para pacientes.',
      modified,
      schema: [
        { ...webPage({ path: 'sobre.html', name: 'Sobre o Quadril Curitiba', description: 'Propósito e política editorial do site.', modified, type: 'AboutPage' }), ...(doc ? { mainEntity: doc } : {}) },
        breadcrumbs([{ name: 'Início', path: 'index.html' }, { name: 'Sobre', path: 'sobre.html' }]),
      ],
    },
    main,
  );
};

export const renderPrivacy = (): string => {
  const modified = '2026-09-25';
  const main = `
${pageHero({
  crumbs: [{ name: 'Início', href: 'index.html' }, { name: 'Privacidade' }],
  pill: 'Privacidade',
  h1: 'Política de privacidade',
  lead: 'Como este site trata dados e cookies, em respeito à Lei Geral de Proteção de Dados (LGPD).',
})}
<section class="band">
  <div class="wrap read prose">
    <h2 id="dados">Dados coletados</h2>
    <p>Este site é informativo e não exige cadastro. Não coletamos nome, e-mail ou outros dados pessoais por meio de formulários armazenados no site. A ficha de inscrição de cirurgiões apenas monta, no seu próprio navegador, o texto de um e-mail: nada é enviado a um servidor do site. Caso você opte por entrar em contato pelo e-mail divulgado, os dados que você enviar na mensagem (como nome e endereço de e-mail) são tratados apenas para responder ao contato, e a comunicação fica sujeita aos termos do provedor de e-mail utilizado.</p>
    <h2 id="cookies">Cookies e armazenamento local</h2>
    <p>O site não usa cookies de publicidade. A preferência de tema (claro ou escuro) fica guardada apenas no seu navegador. Podemos utilizar ferramentas de medição de acesso agregada para entender quais conteúdos são mais úteis, sem identificar você pessoalmente. Você pode bloquear cookies e apagar o armazenamento local nas configurações do navegador.</p>
    <h2 id="terceiros">Serviços de terceiros</h2>
    <p>As fontes tipográficas são carregadas do Google Fonts, e o site é hospedado no GitHub Pages. Esses serviços podem registrar dados técnicos de acesso, como o endereço IP, conforme as políticas próprias de cada um.</p>
    <h2 id="direitos">Seus direitos</h2>
    <p>Nos termos da LGPD, você tem direito de acesso, correção e exclusão de eventuais dados pessoais. Como este site não coleta dados de identificação por formulário, normalmente não há dados pessoais armazenados a respeito de você.</p>
    <h2 id="contato">Contato</h2>
    <p>Dúvidas sobre privacidade podem ser encaminhadas para ${SITE.email}.</p>
    <p class="muted"><small>Última revisão desta política: 25 de setembro de 2026.</small></p>
  </div>
</section>`;
  return layout(
    {
      path: 'privacidade.html',
      title: 'Política de Privacidade — Quadril Curitiba',
      description: 'Política de privacidade do Quadril Curitiba: tratamento de dados e cookies em conformidade com a LGPD.',
      ogTitle: 'Política de privacidade',
      ogDescription: 'Como o site trata dados e cookies, conforme a LGPD.',
      modified,
      schema: [
        webPage({ path: 'privacidade.html', name: 'Política de privacidade', description: 'Tratamento de dados e cookies conforme a LGPD.', modified }),
        breadcrumbs([{ name: 'Início', path: 'index.html' }, { name: 'Privacidade', path: 'privacidade.html' }]),
      ],
    },
    main,
  );
};

export const renderNotFound = (): string => {
  const main = `
<section class="nf">
  <div class="wrap nf-inner">
    <p class="nf-code" aria-hidden="true">404</p>
    <h1>Esta página saiu do lugar</h1>
    <p class="lead">O endereço pode ter mudado ou sido digitado com algum erro. Tente a busca, ou comece por um destes temas:</p>
    <button type="button" class="hero-search nf-search" data-qs-open>${icon('search')}<span class="hs-ph">Buscar no site…</span><kbd class="kbd" data-kbd>Ctrl K</kbd></button>
    <div class="nf-links">
      ${each(ARTICLES.slice(0, 6), (a) => `<a href="${a.file}">${esc(a.cardTitle)} ${icon('arrow')}</a>`)}
    </div>
    <a class="btn btn-primary" href="index.html">${icon('home')} Voltar ao início</a>
  </div>
</section>`;
  return layout({ path: '404.html', title: 'Página não encontrada — Quadril Curitiba', description: 'A página procurada não existe.', noindex: true }, main)
    .replace(/(href|src)="(?!https?:|#|mailto:|tel:|data:|\/)([^"]+)"/g, '$1="/$2"');
};
