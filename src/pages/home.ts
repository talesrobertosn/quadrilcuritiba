/** Página inicial: hero com busca, atalhos por situação, biblioteca, números, guia completo e FAQ. */
import { SITE } from '../site.config.ts';
import { each, esc, monthYear } from '../lib/html.ts';
import { faqPage, organization, webPage, webSite, type Json } from '../lib/schema.ts';
import type { Article, FaqItem } from '../lib/types.ts';
import { ARTICLES, articleBySlug } from '../content/articles/index.ts';
import { layout } from '../templates/layout.ts';
import { icon } from '../templates/icons.ts';
import { articleCard, faqSection, references, sectionHead, surgeonCta, takeaways } from '../templates/components.ts';

const DESCRIPTION =
  'Guia completo sobre cirurgia do quadril em Curitiba: prótese, artroscopia, artrose, dor e recuperação, em linguagem clara e com as fontes citadas.';

const PATHS: Array<{ href: string; text: string; hint: string }> = [
  { href: 'dor-no-quadril.html', text: 'Estou com dor no quadril', hint: 'Causas e quando se preocupar' },
  { href: 'dor-na-virilha.html', text: 'Dói na minha virilha', hint: 'O sintoma mais típico da artrose' },
  { href: 'bursite-no-quadril.html', text: 'Dói na lateral do quadril', hint: 'Bursite ou tendinite glútea' },
  { href: 'artrose-de-quadril.html', text: 'Recebi o diagnóstico de artrose', hint: 'Graus, cura e tratamento' },
  { href: 'protese-de-quadril.html', text: 'Estou pensando em operar', hint: 'Prótese, riscos e durabilidade' },
  { href: 'recuperacao-protese-de-quadril.html', text: 'Já operei ou vou operar', hint: 'A recuperação fase a fase' },
  { href: 'fratura-de-quadril-no-idoso.html', text: 'Meu pai ou minha mãe fraturou', hint: 'O que esperar da cirurgia' },
  { href: 'cirurgioes-curitiba.html', text: 'Procuro um cirurgião em Curitiba', hint: 'Como escolher e onde tratar' },
];

const FACTS: Array<{ n: string; t: string; href: string; src: string }> = [
  { n: '&gt;95%', t: 'das próteses de quadril seguem funcionando dez anos depois da cirurgia', href: 'protese-de-quadril.html#durabilidade', src: 'Prótese de quadril' },
  { n: '8 em 100', t: 'pessoas com dor na lateral do quadril têm, de fato, bursite isolada', href: 'bursite-no-quadril.html', src: 'Bursite e tendinite' },
  { n: '7 de 100', t: 'pontos: a melhora média da dor com exercício na artrose, e por que ainda vale a pena', href: 'como-aliviar-dor-artrose-quadril.html', src: 'Como aliviar a dor' },
  { n: 'R$ 43 mil', t: 'custo médio da prótese em um grande hospital privado brasileiro, em estudo com 1.061 pacientes', href: 'quanto-custa-protese-de-quadril.html', src: 'Quanto custa' },
];

const FAQ: FaqItem[] = [
  { q: 'Quando a cirurgia do quadril é indicada?', a: '<p>Em geral, quando a dor é intensa, não melhora com remédios e fisioterapia e atrapalha dormir, trabalhar ou caminhar. A decisão é individual e tomada com o ortopedista, após avaliar exame e imagens.</p>' },
  { q: 'Toda dor no quadril precisa de cirurgia?', a: '<p>Não. A maioria das causas de dor no quadril é tratada sem cirurgia. A operação entra quando o tratamento conservador não resolve.</p>' },
  { q: 'Quanto tempo dura uma prótese de quadril?', a: '<p>As próteses modernas têm alta durabilidade, com sobrevida acima de 95% em 10 anos e acima de 80% em 25 anos em estudos de acompanhamento. Muitas duram a vida toda. <a href="protese-de-quadril.html">Veja mais na página de prótese</a>.</p>' },
  { q: 'Dá para fazer pelo SUS?', a: '<p>Sim. O SUS realiza cirurgia de prótese de quadril, normalmente em hospitais de referência, mas costuma haver fila de espera conforme a gravidade do caso e a disponibilidade de leitos. <a href="cirurgioes-curitiba.html#caminhos">Veja o caminho em Curitiba</a>.</p>' },
  { q: 'O plano de saúde é obrigado a cobrir?', a: '<p>A artroplastia de quadril consta no rol da ANS e, havendo indicação médica, a cobertura da cirurgia, dos materiais e da internação é obrigatória pela Lei dos Planos de Saúde.</p>' },
  { q: 'Como encontrar um cirurgião de quadril em Curitiba?', a: '<p>Procure um ortopedista com Registro de Qualificação de Especialista (RQE) em Ortopedia e Traumatologia e atuação dedicada ao quadril, e confira o registro no portal do Conselho Federal de Medicina. O site mantém um <a href="cirurgioes-curitiba.html">espaço gratuito de indicação e um guia de como escolher</a>.</p>' },
];

const TAKEAWAYS = [
  'O quadril é uma articulação bola e soquete; quando a cartilagem se desgasta, surgem dor e rigidez.',
  'A maioria das dores no quadril não precisa de cirurgia e melhora com tratamento conservador.',
  'A prótese de quadril é uma das cirurgias de maior sucesso, com alívio da dor na grande maioria dos casos.',
  'Como toda cirurgia, tem riscos: baixos e, em boa parte, preveníveis.',
  'A decisão é sempre individual e compartilhada com o seu ortopedista.',
];

const REFS = [
  'Shan L, et al. Total hip replacement: a systematic review and meta-analysis on mid-term quality of life. Osteoarthritis and Cartilage. 2014.',
  'Mariconda M, et al. Quality of life and functionality after total hip arthroplasty: a long-term follow-up study. BMC Musculoskeletal Disorders. 2011.',
  'Learmonth ID, Young C, Rorabeck C. The operation of the century: total hip replacement. The Lancet. 2007;370(9597):1508-19.',
  'Chen C, et al. Key Elements of Enhanced Recovery after Total Joint Arthroplasty. Orthopaedic Surgery. 2023.',
  'Aprisunadi, et al. Effect of Early Mobilization on Hip and Lower Extremity Postoperative: A Literature Review. SAGE Open Nursing. 2023.',
];

const GUIDE_TOC = [
  { id: 'o-que-e', label: 'O que é a cirurgia do quadril' },
  { id: 'doencas', label: 'Principais doenças do quadril' },
  { id: 'preciso', label: 'Como saber se preciso operar' },
  { id: 'tipos', label: 'Tipos de cirurgia do quadril' },
  { id: 'caminho', label: 'Do diagnóstico ao pós-operatório' },
  { id: 'riscos', label: 'Benefícios e riscos' },
  { id: 'curitiba', label: 'Cirurgia do quadril em Curitiba' },
  { id: 'cirurgiao', label: 'Como escolher o cirurgião' },
];

const GUIDE = `
<h2 id="o-que-e">O que é a cirurgia do quadril</h2>
<p>O quadril é uma articulação do tipo bola e soquete: a cabeça do fêmur (a bola, no topo do osso da coxa) encaixa no acetábulo (o soquete, na bacia). Uma cartilagem lisa reveste as duas superfícies e permite o movimento sem dor. Quando essa cartilagem se desgasta ou a articulação é danificada por doença ou trauma, surgem dor e rigidez, e é aí que a cirurgia pode entrar.</p>
<p>Cirurgia do quadril é um termo amplo. Inclui desde procedimentos que preservam a articulação, como a <a href="artroscopia-de-quadril.html">artroscopia</a>, até a substituição completa por uma prótese (a artroplastia). A escolha depende da causa, da idade, do nível de atividade e do quanto a dor afeta a vida da pessoa.</p>

<h2 id="doencas">Principais doenças que levam à cirurgia</h2>
<p>Várias condições podem danificar o quadril. As mais comuns:</p>
<ul>
  <li><strong>Artrose (coxartrose):</strong> o desgaste da cartilagem, principal motivo de prótese de quadril. Causa dor que piora com o uso e rigidez ao levantar. <a href="artrose-de-quadril.html">Entenda a coxartrose</a>.</li>
  <li><strong>Fratura do quadril no idoso:</strong> em geral após queda, é uma situação de urgência que costuma exigir cirurgia. <a href="fratura-de-quadril-no-idoso.html">Veja o guia para a família</a>.</li>
  <li><strong>Impacto femoroacetabular:</strong> um desencaixe sutil entre fêmur e acetábulo que causa <a href="dor-na-virilha.html">dor na virilha</a> em pessoas jovens e ativas.</li>
  <li><strong>Necrose avascular:</strong> quando a circulação para a cabeça do fêmur diminui e o osso sofre.</li>
  <li><strong>Artrite reumatoide e artrose pós-trauma:</strong> outras causas de dano articular progressivo.</li>
</ul>
<p>Nem tudo que dói no quadril vem de dentro da articulação, e essa é uma confusão frequente. A dor na lateral, que piora ao deitar daquele lado, quase sempre é <a href="bursite-no-quadril.html">bursite ou tendinite dos tendões glúteos</a>, um problema que raramente precisa de cirurgia e que tem tratamento com boa evidência.</p>

<h2 id="preciso">Como saber se preciso de cirurgia</h2>
<p>Um ponto importante e que tranquiliza muita gente: a maior parte das dores no quadril não precisa de cirurgia. O caminho começa pelo tratamento conservador: medicação para dor, fisioterapia, controle do peso e ajuste de atividades (veja <a href="como-aliviar-dor-artrose-quadril.html">o que realmente alivia a dor</a>). A cirurgia costuma ser considerada quando:</p>
<ul>
  <li>a dor é intensa e não melhora com remédios nem fisioterapia;</li>
  <li>a dor atrapalha dormir, trabalhar ou realizar tarefas simples como calçar meias;</li>
  <li>a rigidez limita a caminhada e a qualidade de vida.</li>
</ul>
<p>Quem decide, sempre, é você junto do seu ortopedista, depois de avaliar o exame e as imagens. Não existe resposta única: o mesmo desgaste pode incomodar muito uma pessoa e pouco outra.</p>

<div class="callout alert">
  <h3 id="alerta">Sinais de alerta: procure atendimento</h3>
  <p>Alguns sintomas pedem avaliação médica sem demora, principalmente em idosos ou após queda:</p>
  <ul>
    <li>incapacidade de apoiar o peso ou de caminhar após uma queda;</li>
    <li>dor súbita e muito intensa, com a perna encurtada ou virada para fora;</li>
    <li>febre associada à dor no quadril;</li>
    <li>dormência, formigamento ou perda de força na perna.</li>
  </ul>
</div>

<h2 id="tipos">Tipos de cirurgia do quadril</h2>
<p>As principais modalidades atendem a perfis diferentes de paciente:</p>
<ul>
  <li><strong>Prótese total de quadril (artroplastia):</strong> substitui a bola e o soquete por componentes artificiais. É a cirurgia mais comum para artrose avançada, com excelentes resultados de alívio da dor. <a href="protese-de-quadril.html">Saiba mais sobre a prótese de quadril</a>.</li>
  <li><strong>Artroscopia de quadril:</strong> minimamente invasiva, por pequenas incisões, usada sobretudo em pacientes jovens com impacto femoroacetabular ou lesão do labrum. <a href="artroscopia-de-quadril.html">Quando ela vale a pena</a>.</li>
  <li><strong>Hemiartroplastia (prótese parcial):</strong> substitui apenas a cabeça do fêmur, em situações específicas de fratura.</li>
</ul>
<p>Sobre as vias de acesso (anterior e posterior), há muita discussão. A literatura atual não mostra superioridade definitiva de uma sobre a outra: ambas oferecem bom alívio da dor e recuperação da marcha em poucas semanas, com taxas de complicação baixas e comparáveis. O mais importante é a experiência da equipe com a técnica que utiliza.</p>

<h2 id="caminho">O caminho, do diagnóstico ao pós-operatório</h2>
<p>Entender a jornada reduz a ansiedade. De forma resumida, ela costuma seguir estas etapas:</p>
<ol class="steps">
  <li><strong>Avaliação</strong><span>Consulta com exame físico e imagens (em geral radiografia) para definir o diagnóstico.</span></li>
  <li><strong>Tratamento conservador</strong><span>Quando possível, tentado antes da cirurgia.</span></li>
  <li><strong>Preparação</strong><span>Otimizar a saúde antes da operação (parar de fumar, controlar anemia e doenças crônicas) melhora a recuperação.</span></li>
  <li><strong>Cirurgia e internação</strong><span>A maioria já levanta e dá os primeiros passos no mesmo dia ou no dia seguinte.</span></li>
  <li><strong>Recuperação</strong><span>Reabilitação por semanas, com fisioterapia. <a href="recuperacao-protese-de-quadril.html">Veja a recuperação fase a fase</a>.</span></li>
</ol>

<h2 id="riscos">Benefícios e riscos</h2>
<p>A cirurgia do quadril, em especial a prótese, está entre as operações de maior sucesso da medicina: a grande maioria dos pacientes tem alívio importante da dor e melhora da mobilidade e da qualidade de vida (<a href="protese-de-quadril-vale-a-pena.html">o que muda cinco anos depois</a>). Por outro lado, como toda cirurgia de grande porte, tem riscos que merecem ser conhecidos: infecção, trombose, luxação da prótese, lesão de nervo ou vaso e, a longo prazo, desgaste ou afrouxamento do implante. Esses riscos são, em geral, baixos, e boa parte é prevenível com cuidados antes, durante e depois. Conversar abertamente sobre eles com o cirurgião faz parte de uma boa decisão.</p>

<h2 id="curitiba">Cirurgia do quadril em Curitiba: por onde começar</h2>
<p>Em Curitiba e na região metropolitana, a cirurgia do quadril é feita pelos três caminhos habituais. <strong>Pelo SUS</strong>, a porta de entrada é a Unidade de Saúde do bairro: o médico da atenção básica encaminha para a ortopedia, e a cirurgia eletiva entra na fila da regulação. <strong>Pelo plano de saúde</strong>, a consulta com o ortopedista é marcada direto na rede credenciada, e a cirurgia, com indicação médica, tem cobertura obrigatória. <strong>No particular</strong>, o valor depende do hospital, da equipe e do implante (veja <a href="quanto-custa-protese-de-quadril.html">quanto custa uma prótese de quadril</a>).</p>
<p>Em qualquer um dos caminhos, a primeira consulta é a mesma: um ortopedista examina o quadril, pede uma radiografia e decide se o problema é da articulação. Reunimos os detalhes de cada caminho, os prazos máximos da ANS e o que conferir no profissional em <a href="cirurgioes-curitiba.html">cirurgiões de quadril em Curitiba</a>.</p>

<h2 id="cirurgiao">Como escolher o cirurgião</h2>
<p>Na hora de escolher quem vai operar, vale pesquisar a formação, a experiência e a reputação do profissional, além do hospital onde a cirurgia será realizada. Confira o CRM e o RQE no portal do Conselho Federal de Medicina. Sinta-se à vontade para perguntar quantos procedimentos a equipe realiza, quais as taxas de complicação do serviço e o que esperar da recuperação. Um bom cirurgião explica com clareza e respeita suas dúvidas. <a href="cirurgioes-curitiba.html#como-escolher">Veja o checklist completo</a>.</p>
`;

export const renderHome = (): string => {
  const totalRefs = ARTICLES.reduce((n, a) => n + a.refs.length, 0);
  const totalWords = ARTICLES.reduce((n, a) => n + a.words, 0);
  const featured = [articleBySlug('artrose-de-quadril'), articleBySlug('protese-de-quadril')];
  const rest: Article[] = ARTICLES.filter((a) => !featured.includes(a));
  const modified = SITE.lastEditorialReview;

  const main = `
<section class="hero">
  <div class="hero-bg" aria-hidden="true"><span class="orb orb-1"></span><span class="orb orb-2"></span><span class="grid-lines"></span></div>
  <div class="wrap hero-grid">
    <div class="hero-copy">
      <p class="eyebrow eyebrow-inv"><span class="dot" aria-hidden="true"></span> Guia independente de saúde do quadril &middot; ${SITE.city}, PR</p>
      <h1>Cirurgia do quadril em Curitiba, <em>explicada com clareza.</em></h1>
      <p class="lead">Prótese, artroscopia, artrose, dor e recuperação em linguagem simples e com as fontes científicas à vista, para você decidir bem, ao lado do seu médico.</p>
      <button type="button" class="hero-search" data-qs-open aria-label="Buscar no site">
        ${icon('search')}<span class="hs-ph">Busque: prótese, dor na virilha, quanto custa…</span><kbd class="kbd" data-kbd>Ctrl K</kbd>
      </button>
      <p class="hero-pop"><span>Mais lidos:</span>
        <a href="artrose-de-quadril.html">Coxartrose</a>
        <a href="protese-de-quadril.html">Prótese de quadril</a>
        <a href="quanto-custa-protese-de-quadril.html">Quanto custa</a>
        <a href="dor-na-virilha.html">Dor na virilha</a>
      </p>
    </div>
    <div class="hero-art" aria-hidden="true">
      <div class="hero-disc">
        <span class="ring ring-1"></span><span class="ring ring-2"></span><span class="ring ring-3"></span>
        <img src="assets/marca-quadril-curitiba-simbolo.png" alt="" width="560" height="411" fetchpriority="high">
      </div>
      <div class="float-chip fc-1">${icon('book')}<span><b>${totalRefs}</b> referências científicas</span></div>
      <div class="float-chip fc-2">${icon('layers')}<span><b>${ARTICLES.length}</b> guias aprofundados</span></div>
      <div class="float-chip fc-3">${icon('shield')}<span><b>Zero</b> publicidade</span></div>
    </div>
  </div>
  <div class="wrap">
    <ul class="trust">
      <li>${icon('checkCircle')}<span>Todas as fontes citadas</span></li>
      <li>${icon('checkCircle')}<span>Benefícios e riscos lado a lado</span></li>
      <li>${icon('checkCircle')}<span>Sem fins comerciais</span></li>
      <li>${icon('calendar')}<span>Revisado em ${monthYear(modified)}</span></li>
    </ul>
  </div>
</section>

<section class="band" id="comecar" aria-labelledby="comecar-t">
  <div class="wrap">
    ${sectionHead({ eyebrow: 'Por onde começar', title: 'Qual frase descreve o seu momento?', id: 'comecar-t', text: 'Cada atalho leva à página que responde exatamente àquilo, em detalhe.' })}
    <nav class="paths" aria-label="Atalhos por situação">
      ${each(PATHS, (p, i) => `<a class="path" href="${p.href}"><span class="path-n">${String(i + 1).padStart(2, '0')}</span><span class="path-t">${esc(p.text)}<small>${esc(p.hint)}</small></span>${icon('arrow', 'i path-go')}</a>`)}
    </nav>
  </div>
</section>

<section class="band band-mist" id="topicos" aria-labelledby="topicos-t">
  <div class="wrap">
    <div class="sec-row">
      ${sectionHead({ eyebrow: 'Biblioteca', title: 'Aprofunde por tema', id: 'topicos-t', text: `${ARTICLES.length} guias longos, cerca de ${Math.round(totalWords / 1000)} mil palavras e ${totalRefs} referências. Do sintoma à recuperação.` })}
      <a class="btn btn-ghost" href="artigos.html">Ver todos os artigos ${icon('arrow')}</a>
    </div>
    <div class="bento">
      ${each(featured, (a) => articleCard(a, { featured: true }))}
      ${each(rest, (a) => articleCard(a))}
    </div>
  </div>
</section>

<section class="band band-ink" aria-labelledby="numeros-t">
  <div class="wrap">
    ${sectionHead({ eyebrow: 'Honestidade com os números', title: 'O que a ciência mostra, sem exagero', id: 'numeros-t', text: 'Quando a evidência é forte, dizemos. Quando é fraca, também. Alguns números que você encontra aqui:' })}
    <div class="facts">
      ${each(FACTS, (f) => `<a class="fact" href="${f.href}"><b class="fact-n">${f.n}</b><span class="fact-t">${f.t}</span><span class="fact-src">${esc(f.src)} ${icon('arrow')}</span></a>`)}
    </div>
  </div>
</section>

<section class="band" aria-labelledby="guia-t">
  <div class="wrap">
    ${sectionHead({ eyebrow: 'Guia completo', title: 'Cirurgia do quadril: o essencial em uma leitura', id: 'guia-t' })}
  </div>
  <div class="wrap post-grid">
    <aside class="post-side">
      <nav class="toc" data-toc aria-label="Neste guia">
        <button type="button" class="toc-btn" data-toc-btn aria-expanded="true" aria-controls="toc-list">
          <span class="toc-ring" aria-hidden="true"><svg viewBox="0 0 36 36"><circle cx="18" cy="18" r="15.5"/><circle class="toc-ring-v" cx="18" cy="18" r="15.5" pathLength="100"/></svg></span>
          <span class="toc-lbl">Neste guia <small>${GUIDE_TOC.length} seções</small></span>${icon('chevronDown', 'i toc-chev')}
        </button>
        <ol id="toc-list">${each(GUIDE_TOC, (t) => `<li><a href="#${t.id}">${esc(t.label)}</a></li>`)}</ol>
      </nav>
    </aside>
    <div class="post-main">
      <div class="prose" data-prose>${GUIDE}</div>
      ${takeaways(TAKEAWAYS)}
      ${references(REFS)}
    </div>
  </div>
</section>

${surgeonCta()}
${faqSection('Dúvidas rápidas sobre cirurgia do quadril', FAQ)}
`;

  const schema: Json[] = [
    webSite(),
    {
      ...webPage({ path: 'index.html', name: 'Cirurgia do Quadril em Curitiba', description: DESCRIPTION, modified, type: 'MedicalWebPage' }),
      headline: 'Cirurgia do quadril em Curitiba, explicada com clareza',
      lastReviewed: modified,
      about: { '@type': 'MedicalCondition', name: 'Doenças e cirurgia do quadril' },
      medicalAudience: { '@type': 'MedicalAudience', audienceType: 'Patient' },
      publisher: organization(),
      citation: REFS,
      ...(SITE.doctor ? { author: { '@id': `${SITE.url}#medico` }, reviewedBy: { '@id': `${SITE.url}#medico` } } : {}),
      mainEntity: {
        '@type': 'ItemList',
        name: 'Guias do Quadril Curitiba',
        itemListElement: ARTICLES.map((a, i) => ({ '@type': 'ListItem', position: i + 1, url: SITE.url + a.file, name: a.cardTitle })),
      },
    },
    faqPage(FAQ),
  ];

  return layout(
    {
      path: 'index.html',
      title: 'Cirurgia do Quadril em Curitiba: Prótese, Artrose e Recuperação',
      description: DESCRIPTION,
      ogTitle: 'Cirurgia do Quadril em Curitiba: guia completo',
      ogDescription: 'Prótese, artrose, recuperação e dor no quadril: informação clara e baseada em evidência.',
      ogType: 'website',
      modified,
      bodyClass: 'is-home',
      schema,
    },
    main,
  );
};
