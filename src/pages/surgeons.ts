/**
 * Cirurgiões de quadril em Curitiba: diretório com filtros, guia de como escolher,
 * caminhos de atendimento (SUS, convênio, particular) e ficha de inscrição para profissionais.
 */
import { SITE } from '../site.config.ts';
import { dateLong, each, esc } from '../lib/html.ts';
import { breadcrumbs, faqPage, surgeonList, webPage } from '../lib/schema.ts';
import type { CareMode, FaqItem, Surgeon, SurgeonFocus } from '../lib/types.ts';
import { CARE_LABEL, FOCUS_LABEL, SURGEONS } from '../data/surgeons.ts';
import { layout } from '../templates/layout.ts';
import { icon, type IconName } from '../templates/icons.ts';
import { faqSection, pageHero, sectionHead } from '../templates/components.ts';

const PATH = 'cirurgioes-curitiba.html';
const MODIFIED = '2026-09-25';
const CFM_URL = 'https://portal.cfm.org.br/busca-medicos';

const initials = (name: string): string =>
  name.replace(/^(dra?\.?)\s+/i, '').split(/\s+/).filter(Boolean).map((p) => p[0]).slice(0, 2).join('').toUpperCase();

const surgeonCard = (s: Surgeon): string => `<article class="scard" data-focus="${s.focus.join(' ')}" data-care="${s.care.join(' ')}" id="${esc(s.id)}">
  <div class="scard-top">
    ${s.photo ? `<img class="scard-photo" src="${esc(s.photo)}" alt="Foto de ${esc(s.name)}" width="88" height="88" loading="lazy">` : `<span class="scard-photo scard-ini" aria-hidden="true">${esc(initials(s.name))}</span>`}
    <div>
      <h3>${esc(s.name)}</h3>
      <p class="scard-reg">${esc(s.crm)} &middot; ${esc(s.rqe)}</p>
      <p class="scard-ok">${icon('shield')} Registro conferido em <time datetime="${s.verifiedAt}">${dateLong(s.verifiedAt)}</time></p>
    </div>
  </div>
  <p class="scard-bio">${esc(s.bio)}</p>
  <ul class="tags">${each(s.focus, (f) => `<li>${esc(FOCUS_LABEL[f])}</li>`)}${each(s.care, (c) => `<li class="tag-care">${esc(CARE_LABEL[c])}</li>`)}</ul>
  ${s.plans?.length ? `<p class="scard-plans"><b>Convênios informados:</b> ${esc(s.plans.join(', '))}</p>` : ''}
  <ul class="scard-loc">${each(s.locations, (l) => `<li>${icon('pin')}<span><b>${esc(l.name)}</b>${l.street ? ` &middot; ${esc(l.street)}` : ''} &middot; ${esc(l.neighborhood)}, ${esc(l.city)}${l.mapUrl ? ` <a href="${esc(l.mapUrl)}" target="_blank" rel="noopener nofollow">mapa</a>` : ''}</span></li>`)}</ul>
  <div class="scard-actions">
    ${s.whatsapp ? `<a class="btn btn-sm btn-primary" href="https://wa.me/${esc(s.whatsapp)}" target="_blank" rel="noopener nofollow">${icon('phone')} WhatsApp</a>` : ''}
    ${s.phone ? `<a class="btn btn-sm btn-ghost" href="tel:${esc(s.phone.replace(/[^\d+]/g, ''))}">${icon('phone')} Ligar</a>` : ''}
    ${s.website ? `<a class="btn btn-sm btn-ghost" href="${esc(s.website)}" target="_blank" rel="noopener">${icon('globe')} Site</a>` : ''}
    ${s.instagram ? `<a class="btn btn-sm btn-ghost" href="https://instagram.com/${esc(s.instagram)}" target="_blank" rel="noopener nofollow">@${esc(s.instagram)}</a>` : ''}
  </div>
</article>`;

const FOCUS_ORDER: SurgeonFocus[] = ['artroplastia', 'artroscopia', 'trauma', 'revisao', 'pediatrico'];
const CARE_ORDER: CareMode[] = ['convenio', 'particular', 'sus'];

const directory = (): string => {
  if (!SURGEONS.length) {
    return `<div class="dir-empty">
      <div class="dir-empty-art" aria-hidden="true">
        <span class="ghost-card"></span><span class="ghost-card"></span><span class="ghost-card"></span>
      </div>
      <div class="dir-empty-copy">
        <span class="pill">${icon('sparkle')} Lista em formação</span>
        <h3>As primeiras indicações estão sendo organizadas</h3>
        <p>Nenhum profissional aparece aqui antes de o CRM e o RQE serem conferidos no portal do Conselho Federal de Medicina. Enquanto a lista cresce, use o guia abaixo para escolher com segurança, ou veja os caminhos de atendimento em Curitiba pelo SUS, pelo convênio e no particular.</p>
        <div class="btn-row">
          <a class="btn btn-primary" href="#como-escolher">${icon('checkCircle')} Como escolher um cirurgião</a>
          <a class="btn btn-ghost" href="#caminhos">Onde se tratar em Curitiba</a>
        </div>
      </div>
    </div>`;
  }
  const focusUsed = FOCUS_ORDER.filter((f) => SURGEONS.some((s) => s.focus.includes(f)));
  const careUsed = CARE_ORDER.filter((c) => SURGEONS.some((s) => s.care.includes(c)));
  return `<div class="dir-filters" data-dir-filters>
      <div class="chipbar" role="group" aria-label="Filtrar por foco de atuação">
        <button type="button" class="chip" data-dir-focus="todos" aria-pressed="true">Todos os focos</button>
        ${each(focusUsed, (f) => `<button type="button" class="chip" data-dir-focus="${f}" aria-pressed="false">${esc(FOCUS_LABEL[f])}</button>`)}
      </div>
      <div class="chipbar" role="group" aria-label="Filtrar por forma de atendimento">
        <button type="button" class="chip" data-dir-care="todos" aria-pressed="true">Qualquer atendimento</button>
        ${each(careUsed, (c) => `<button type="button" class="chip" data-dir-care="${c}" aria-pressed="false">${esc(CARE_LABEL[c])}</button>`)}
      </div>
    </div>
    <p class="dir-count" data-dir-count aria-live="polite">${SURGEONS.length} ${SURGEONS.length === 1 ? 'profissional' : 'profissionais'}</p>
    <div class="sgrid" data-dir-list>${each(SURGEONS, surgeonCard)}</div>
    <p class="noresult" data-dir-none hidden>Nenhum profissional com essa combinação. Tente outro filtro.</p>`;
};

const CHECKLIST: Array<{ i: IconName; t: string; d: string }> = [
  { i: 'shield', t: 'CRM ativo no Paraná', d: `Todo médico que atende no estado precisa de registro ativo no CRM-PR. A consulta é pública e gratuita no <a href="${CFM_URL}" target="_blank" rel="noopener">portal do CFM</a>, pelo nome.` },
  { i: 'checkCircle', t: 'RQE em Ortopedia e Traumatologia', d: 'O Registro de Qualificação de Especialista (RQE) é o que comprova a especialidade. Médico sem RQE não pode se anunciar como especialista. Ele aparece na mesma busca do CFM.' },
  { i: 'bone', t: 'Atuação dedicada ao quadril', d: 'Dentro da ortopedia, a cirurgia do quadril é uma área de atuação com formação complementar. Pergunte onde o profissional se formou em quadril e se ele participa da sociedade da área, a Sociedade Brasileira de Quadril (SBQ).' },
  { i: 'hospital', t: 'Hospital e equipe', d: 'A prótese é um trabalho de equipe: anestesia, enfermagem, fisioterapia e controle de infecção. Saiba em qual hospital a cirurgia será feita e como é o acompanhamento depois da alta.' },
  { i: 'layers', t: 'Volume de cirurgias', d: 'Serviços que fazem muitas próteses por ano tendem a ter menos complicações. É uma pergunta legítima, e um bom cirurgião responde sem constrangimento.' },
  { i: 'users', t: 'Uma conversa honesta', d: 'Desconfie de promessa de resultado, de pressa para operar sem tentar o tratamento conservador quando ele cabe, e de quem não fala dos riscos. Pedir segunda opinião é normal.' },
];

const QUESTIONS = [
  'O meu problema está dentro da articulação do quadril? Como o senhor ou a senhora chegou a essa conclusão?',
  'Ainda há tratamento sem cirurgia que valha a pena tentar no meu caso?',
  'Se operar, qual cirurgia, qual via de acesso e que tipo de prótese o senhor ou a senhora costuma usar, e por quê?',
  'Quantas cirurgias como essa a equipe faz por ano? Quais as complicações mais comuns no serviço?',
  'Em qual hospital será a cirurgia, quantos dias de internação e como é a fisioterapia depois?',
  'Quando vou poder andar sem apoio, dirigir e voltar ao trabalho?',
  'Quais sinais depois da cirurgia devem me fazer procurar a equipe com urgência?',
  'Pelo convênio: a cirurgia e o material estão autorizados? No particular: o que está incluído no valor?',
];

const PATHS_CARE: Array<{ i: IconName; t: string; lead: string; steps: string[]; note: string }> = [
  {
    i: 'hospital',
    t: 'Pelo SUS',
    lead: 'Gratuito do começo ao fim, com fila para a cirurgia eletiva.',
    steps: [
      'Consulta na Unidade de Saúde do seu bairro, com o médico da atenção básica.',
      'Encaminhamento para a ortopedia, agendado pela central de regulação do município.',
      'Consulta com o ortopedista no serviço de referência, com radiografia.',
      'Com indicação cirúrgica, entrada na fila de cirurgia eletiva do hospital.',
    ],
    note: 'Fratura após queda não entra em fila: é urgência. Procure um pronto-socorro ou ligue 192.',
  },
  {
    i: 'shield',
    t: 'Pelo plano de saúde',
    lead: 'Cobertura obrigatória da cirurgia, do material e da internação, com indicação médica.',
    steps: [
      'Agende direto com um ortopedista da rede credenciada; não é preciso encaminhamento, salvo regra do seu plano.',
      'A ANS fixa prazo máximo de 14 dias úteis para consulta com especialista e de 21 dias úteis para internação eletiva.',
      'O cirurgião solicita a autorização da cirurgia e dos materiais ao plano.',
      'Negativa sem justificativa técnica pode ser contestada no plano e registrada na ANS.',
    ],
    note: 'Os detalhes de cobertura, rol da ANS e negativas estão no guia de custos.',
  },
  {
    i: 'cost',
    t: 'No particular',
    lead: 'Mais rapidez e escolha, com custo total que varia muito.',
    steps: [
      'Consulta com o cirurgião de sua escolha e exames.',
      'Orçamento separado ou em pacote: honorários da equipe, hospital, prótese e fisioterapia.',
      'Pergunte o que está incluído em caso de complicação ou de internação mais longa.',
      'Confira se o hospital e a prótese têm registro na Anvisa e rastreabilidade do implante.',
    ],
    note: 'Faixas reais de valores no Brasil, com dados de estudos, no guia de custos.',
  },
];

const FAQ: FaqItem[] = [
  { q: 'Como saber se um ortopedista é especialista em quadril?', a: `<p>Primeiro, confirme no <a href="${CFM_URL}" target="_blank" rel="noopener">portal do CFM</a> que ele tem CRM ativo e RQE em Ortopedia e Traumatologia. Depois, pergunte sobre a formação complementar em cirurgia do quadril e sobre o volume de cirurgias da área que ele faz. A participação na Sociedade Brasileira de Quadril é um bom sinal de atuação dedicada.</p>` },
  { q: 'O que é RQE e por que ele importa?', a: '<p>RQE é o Registro de Qualificação de Especialista, concedido pelo Conselho Regional de Medicina a quem concluiu residência ou obteve título na especialidade. Pelas regras do CFM, só quem tem RQE pode se anunciar como especialista.</p>' },
  { q: 'Preciso de encaminhamento para consultar um ortopedista pelo convênio?', a: '<p>Na maioria dos planos, não: a consulta com o ortopedista pode ser marcada direto na rede credenciada. Alguns planos coparticipativos ou com médico de família exigem encaminhamento. Confira as regras do seu contrato.</p>' },
  { q: 'Como conseguir cirurgia de quadril pelo SUS em Curitiba?', a: '<p>O caminho começa na Unidade de Saúde do seu bairro. O médico da atenção básica encaminha para a ortopedia pela central de regulação; o ortopedista do serviço de referência avalia e, havendo indicação, a cirurgia eletiva entra na fila do hospital. Fratura após queda é urgência e não passa por esse fluxo.</p>' },
  { q: 'Qual o prazo do plano de saúde para marcar consulta e cirurgia?', a: '<p>Pelas regras da ANS, o plano deve garantir consulta com especialista em até 14 dias úteis e internação eletiva em até 21 dias úteis, dentro da rede credenciada. Se não houver profissional disponível no prazo, o plano precisa oferecer alternativa.</p>' },
  { q: 'O site cobra para indicar um cirurgião?', a: '<p>Não. A indicação é gratuita, sem vínculo comercial e sem contrapartida. Só entram profissionais com CRM e RQE conferidos, e cada um é responsável pela própria publicidade perante o CFM.</p>' },
];

const form = (): string => `<form class="sform" data-surgeon-form novalidate>
  <div class="sform-grid">
    <label class="fld fld-full"><span>Nome completo, como deve aparecer <em>*</em></span><input name="nome" required autocomplete="name" placeholder="Dra. Maria Exemplo"></label>
    <label class="fld"><span>CRM-PR <em>*</em></span><input name="crm" required inputmode="numeric" placeholder="00000"></label>
    <label class="fld"><span>RQE em Ortopedia <em>*</em></span><input name="rqe" required inputmode="numeric" placeholder="00000"></label>
    <label class="fld"><span>E-mail para contato do site <em>*</em></span><input name="email" type="email" required autocomplete="email" placeholder="voce@exemplo.com"></label>
    <label class="fld"><span>Telefone ou WhatsApp público</span><input name="telefone" type="tel" autocomplete="tel" placeholder="(41) 90000-0000"></label>
    <fieldset class="fld fld-full"><legend>Foco de atuação no quadril</legend>
      <div class="checks">${each(FOCUS_ORDER, (f) => `<label class="check"><input type="checkbox" name="foco" value="${f}"><span>${esc(FOCUS_LABEL[f])}</span></label>`)}</div>
    </fieldset>
    <fieldset class="fld fld-full"><legend>Formas de atendimento</legend>
      <div class="checks">${each(CARE_ORDER, (c) => `<label class="check"><input type="checkbox" name="atendimento" value="${c}"><span>${esc(CARE_LABEL[c])}</span></label>`)}</div>
    </fieldset>
    <label class="fld fld-full"><span>Convênios atendidos</span><input name="convenios" placeholder="Ex.: Unimed, Bradesco Saúde, Amil"></label>
    <label class="fld fld-full"><span>Locais de atendimento em Curitiba e região <em>*</em></span><textarea name="locais" rows="2" required placeholder="Nome do consultório ou hospital, endereço e bairro"></textarea></label>
    <label class="fld"><span>Site</span><input name="site" type="url" placeholder="https://"></label>
    <label class="fld"><span>Instagram</span><input name="instagram" placeholder="@perfil"></label>
    <label class="fld fld-full"><span>Apresentação curta <small data-count>0/280</small></span><textarea name="bio" rows="3" maxlength="280" placeholder="Formação, foco de atuação e o que o paciente pode esperar da consulta."></textarea></label>
    <label class="check check-consent fld-full"><input type="checkbox" name="aceite" required><span>Confirmo que as informações são verdadeiras, autorizo a publicação após a conferência de CRM e RQE e sei que sou responsável pela minha publicidade perante o CFM.</span></label>
  </div>
  <p class="sform-err" data-form-err role="alert" hidden></p>
  <div class="btn-row">
    <button type="submit" class="btn btn-primary">${icon('send')} Gerar e enviar a ficha</button>
    <span class="muted sform-hint">Nada é gravado neste site. A ficha vira um e-mail para ${SITE.email}.</span>
  </div>
  <div class="sform-out" data-form-out hidden>
    <p><b>Ficha pronta.</b> Escolha como enviar:</p>
    <div class="btn-row">
      <a class="btn btn-primary" data-send-gmail target="_blank" rel="noopener">${icon('mail')} Enviar pelo Gmail</a>
      <a class="btn btn-ghost" data-send-mailto>${icon('mail')} Abrir no app de e-mail</a>
      <button type="button" class="btn btn-ghost" data-copy-form>${icon('copy')} Copiar o texto</button>
    </div>
    <span class="copied" data-copied role="status" aria-live="polite"></span>
  </div>
</form>`;

const preview = (): string => `<div class="spreview" aria-live="polite">
  <p class="spreview-lbl">${icon('sparkle')} Prévia do seu card</p>
  <article class="scard scard-preview">
    <div class="scard-top">
      <span class="scard-photo scard-ini" data-pv-ini aria-hidden="true">MX</span>
      <div>
        <h3 data-pv-nome>Dra. Maria Exemplo</h3>
        <p class="scard-reg"><span data-pv-crm>CRM-PR 00000</span> &middot; <span data-pv-rqe>RQE 00000</span></p>
        <p class="scard-ok">${icon('shield')} Registro conferido pelo site</p>
      </div>
    </div>
    <p class="scard-bio" data-pv-bio>Sua apresentação curta aparece aqui.</p>
    <ul class="tags" data-pv-tags><li>Prótese (artroplastia)</li><li class="tag-care">Convênio</li></ul>
    <ul class="scard-loc"><li>${icon('pin')}<span data-pv-locais>Consultório &middot; Bairro, Curitiba</span></li></ul>
  </article>
</div>`;

export const renderSurgeons = (): string => {
  const main = `
${pageHero({
  tone: 'dark',
  crumbs: [{ name: 'Início', href: 'index.html' }, { name: 'Cirurgiões em Curitiba' }],
  pill: 'Cirurgiões em Curitiba',
  h1: 'Cirurgião de quadril em Curitiba: <em>como encontrar e escolher</em>',
  lead: 'Um espaço gratuito de indicação de cirurgiões de quadril que atendem em Curitiba e região, com registro conferido no CFM, e o guia do que avaliar antes de marcar a consulta, pelo SUS, pelo convênio ou no particular.',
  extra: `<nav class="jump" aria-label="Nesta página">
      <a href="#indicados">${icon('users')} Profissionais indicados</a>
      <a href="#como-escolher">${icon('checkCircle')} Como escolher</a>
      <a href="#caminhos">${icon('pin')} SUS, convênio ou particular</a>
      <a href="#para-cirurgioes">${icon('stethoscope')} Sou cirurgião</a>
    </nav>`,
})}

<section class="band" id="indicados" aria-labelledby="indicados-t">
  <div class="wrap">
    ${sectionHead({ eyebrow: 'Diretório', title: 'Cirurgiões de quadril indicados', id: 'indicados-t', text: 'Todos com CRM e RQE conferidos no portal do CFM. A ordem é alfabética, e ninguém paga para aparecer.' })}
    ${directory()}
  </div>
</section>

<section class="band band-mist" id="como-escolher" aria-labelledby="escolher-t">
  <div class="wrap">
    ${sectionHead({ eyebrow: 'Antes de marcar', title: 'Como escolher um cirurgião de quadril', id: 'escolher-t', text: 'Seis pontos para conferir, e as perguntas que valem levar anotadas para a consulta.' })}
    <div class="checklist">
      ${each(CHECKLIST, (c, i) => `<div class="ck"><span class="ck-n">${String(i + 1).padStart(2, '0')}</span>${icon(c.i, 'i ck-i')}<h3>${c.t}</h3><p>${c.d}</p></div>`)}
    </div>
    <div class="qbox">
      <div class="qbox-head">
        <h3>${icon('quote')} Perguntas para levar à consulta</h3>
        <button type="button" class="btn btn-sm btn-ghost" data-copy-list="#perguntas-consulta">${icon('copy')} Copiar a lista</button>
        <span class="copied" data-copied role="status" aria-live="polite"></span>
      </div>
      <ol id="perguntas-consulta">${each(QUESTIONS, (q) => `<li>${esc(q)}</li>`)}</ol>
    </div>
  </div>
</section>

<section class="band" id="caminhos" aria-labelledby="caminhos-t">
  <div class="wrap">
    ${sectionHead({ eyebrow: 'Onde se tratar', title: 'Os três caminhos para operar o quadril em Curitiba', id: 'caminhos-t', text: 'A primeira consulta é sempre a mesma: um ortopedista examina o quadril e pede uma radiografia. O que muda é o percurso até a cirurgia.' })}
    <div class="care3">
      ${each(PATHS_CARE, (p) => `<div class="care">
        <div class="care-h">${icon(p.i)}<h3>${p.t}</h3></div>
        <p class="care-lead">${p.lead}</p>
        <ol>${each(p.steps, (s) => `<li>${s}</li>`)}</ol>
        <p class="care-note">${p.note}</p>
      </div>`)}
    </div>
    <p class="care-more">Quer os números? Veja <a href="quanto-custa-protese-de-quadril.html">quanto custa uma prótese de quadril</a> pelo SUS, pelo plano e no particular, e <a href="protese-de-quadril.html">o que esperar da cirurgia</a>.</p>
  </div>
</section>

<section class="band band-ink" id="para-cirurgioes" aria-labelledby="pc-t">
  <div class="wrap">
    <div class="pc-grid">
      <div class="pc-copy">
        <p class="eyebrow eyebrow-inv">Para profissionais</p>
        <h2 id="pc-t">É cirurgião de quadril e atende em Curitiba?</h2>
        <p>O Quadril Curitiba é lido por pacientes que já estão pesquisando artrose, prótese, custos e recuperação, ou seja, gente perto de decidir por uma consulta. A inclusão no diretório é gratuita e sem contrapartida.</p>
        <ul class="pc-list">
          <li>${icon('check')}<span>Card próprio com foco de atuação, formas de atendimento, locais e contatos</span></li>
          <li>${icon('check')}<span>Dados estruturados (schema Physician) para os buscadores entenderem quem você é</span></li>
          <li>${icon('check')}<span>Presença ao lado de conteúdo médico com referências, sem publicidade</span></li>
          <li>${icon('check')}<span>Critérios: CRM-PR ativo, RQE em Ortopedia e Traumatologia e atuação em quadril</span></li>
        </ul>
        ${preview()}
      </div>
      <div class="pc-form">
        <h3>Ficha de inscrição</h3>
        <p class="muted">Preencha, gere a ficha e envie por e-mail. A conferência no CFM leva poucos dias.</p>
        ${form()}
        <p class="altmail">Prefere escrever do seu jeito? <a href="https://mail.google.com/mail/?view=cm&amp;fs=1&amp;to=${SITE.email}&amp;su=Cirurgi%C3%A3o%20de%20quadril%20em%20Curitiba" target="_blank" rel="noopener">Gmail</a>, <a href="mailto:${SITE.email}?subject=Cirurgi%C3%A3o%20de%20quadril%20em%20Curitiba">app de e-mail</a> ou <button type="button" class="linkbtn" data-copy="${SITE.email}">copiar ${SITE.email}</button><span class="copied" data-copied role="status" aria-live="polite"></span></p>
      </div>
    </div>
  </div>
</section>

${faqSection('Dúvidas sobre como encontrar um cirurgião de quadril', FAQ)}

<section class="band band-tight">
  <div class="wrap read">
    <p class="fineprint">${icon('info')} Este site é informativo e não realiza atendimentos nem agenda consultas. A presença no diretório não representa vínculo comercial. Cada profissional listado é responsável pela própria publicidade perante o Conselho Federal de Medicina e por manter as informações corretas.</p>
  </div>
</section>`;

  return layout(
    {
      path: PATH,
      title: 'Cirurgião de Quadril em Curitiba: Onde Encontrar e Como Escolher',
      description: 'Cirurgiões de quadril em Curitiba com CRM e RQE conferidos, o que avaliar antes da consulta e como operar pelo SUS, pelo convênio ou no particular.',
      ogTitle: 'Cirurgião de quadril em Curitiba: como encontrar e escolher',
      ogDescription: 'Espaço gratuito de indicação, checklist de escolha e os caminhos pelo SUS, convênio e particular.',
      navActive: PATH,
      modified: MODIFIED,
      schema: [
        webPage({ path: PATH, name: 'Cirurgião de quadril em Curitiba: como encontrar e escolher', description: 'Diretório gratuito de cirurgiões de quadril em Curitiba e guia de escolha.', modified: MODIFIED }),
        breadcrumbs([{ name: 'Início', path: 'index.html' }, { name: 'Cirurgiões em Curitiba', path: PATH }]),
        faqPage(FAQ),
        SURGEONS.length ? surgeonList(SURGEONS) : null,
      ],
    },
    main,
  );
};
