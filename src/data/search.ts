/**
 * Atalhos curados da busca rápida: respostas diretas para as perguntas
 * mais buscadas, apontando para a seção exata do artigo.
 * As páginas e todos os H2 do site entram na busca automaticamente no build.
 */
export interface SearchShortcut {
  u: string;
  t: string;
  d: string;
  k: string;
}

export const SHORTCUTS: SearchShortcut[] = [
  { u: 'quanto-custa-protese-de-quadril.html#sus', t: 'Prótese de quadril pelo SUS', d: 'É gratuita? Como funciona a fila', k: 'sus gratuito fila publico gratuita governo' },
  { u: 'quanto-custa-protese-de-quadril.html#convenio', t: 'O plano de saúde é obrigado a cobrir?', d: 'Cobertura, rol da ANS e negativas', k: 'plano convenio ans cobertura obrigatoria negativa unimed reembolso' },
  { u: 'quanto-custa-protese-de-quadril.html#nacional-importada', t: 'Prótese nacional ou importada', d: 'O que muda no preço e no resultado', k: 'nacional importada diferenca preco marca fabricante' },
  { u: 'quanto-custa-protese-de-quadril.html#materiais', t: 'Prótese de titânio e de cerâmica', d: 'O que o material realmente significa', k: 'titanio ceramica material metal polietileno par de atrito' },
  { u: 'quanto-custa-protese-de-quadril.html#parcial', t: 'Prótese só da cabeça do fêmur', d: 'A prótese parcial, e quando ela é usada', k: 'parcial hemiartroplastia cabeca do femur preco' },
  { u: 'artrose-de-quadril.html#cura', t: 'Coxartrose tem cura?', d: 'A resposta honesta', k: 'cura tem cura reverter cartilagem volta bilateral' },
  { u: 'artrose-de-quadril.html#graus', t: 'Graus da coxartrose', d: 'Grau 1, 2, 3 e 4 no laudo', k: 'grau graus leve moderada avancada 1 2 3 4 laudo classificacao' },
  { u: 'protese-de-quadril.html#durabilidade', t: 'Quanto tempo dura uma prótese', d: 'Sobrevida em 10, 20 e 25 anos', k: 'dura durabilidade tempo de vida vida util 10 20 anos revisao troca' },
  { u: 'recuperacao-protese-de-quadril.html#precaucoes', t: 'O que não pode fazer depois da prótese', d: 'Precauções de luxação', k: 'nao pode fazer proibido precaucoes luxacao cruzar pernas agachar sentar baixo' },
  { u: 'recuperacao-protese-de-quadril.html#dirigir', t: 'Quando posso voltar a dirigir', d: 'E quando voltar ao trabalho', k: 'dirigir carro volante trabalhar voltar trabalho tempo' },
  { u: 'como-aliviar-dor-artrose-quadril.html#colageno', t: 'Colágeno funciona para artrose?', d: 'O que a evidência mostra', k: 'colageno suplemento glucosamina condroitina funciona vale a pena' },
  { u: 'como-aliviar-dor-artrose-quadril.html#bengala', t: 'Bengala: de que lado usar', d: 'Do lado contrário ao quadril que dói', k: 'bengala muleta lado certo esquerdo direito como usar' },
  { u: 'como-aliviar-dor-artrose-quadril.html#dormir', t: 'Como dormir com dor no quadril', d: 'Posições e travesseiro', k: 'dormir noite posicao travesseiro deitar de lado insonia' },
  { u: 'bursite-no-quadril.html#infiltracao', t: 'Infiltração funciona na bursite?', d: 'Funciona, mas por pouco tempo', k: 'infiltracao corticoide bloqueio injecao funciona bursite' },
  { u: 'dor-na-virilha.html#joelho', t: 'Dor no quadril que aparece no joelho', d: 'Por que o cérebro erra o endereço', k: 'joelho dor no joelho irradia irradiada confunde nervo obturatorio' },
  { u: 'artroscopia-de-quadril.html#evidencia', t: 'Artroscopia funciona mesmo?', d: 'Os números dos ensaios clínicos', k: 'artroscopia funciona resultado estudo ensaio fashion evidencia vale a pena' },
  { u: 'fratura-de-quadril-no-idoso.html#tempo', t: 'Em quanto tempo operar uma fratura', d: 'Por que a pressa importa', k: 'quanto tempo operar fratura urgencia demora espera cirurgia idoso' },
  { u: 'cirurgioes-curitiba.html#como-escolher', t: 'Como escolher um cirurgião de quadril', d: 'CRM, RQE e as perguntas certas', k: 'escolher cirurgiao especialista rqe crm confiavel bom medico ortopedista' },
  { u: 'cirurgioes-curitiba.html#caminhos', t: 'Onde operar o quadril em Curitiba', d: 'SUS, convênio ou particular', k: 'onde operar curitiba hospital sus convenio particular encaminhamento regulacao fila' },
];

/** Palavras-chave extras por página, para a busca encontrar sinônimos. */
export const PAGE_KEYWORDS: Record<string, string> = {
  'index.html': 'home inicio principal guia quadril curitiba',
  'artigos.html': 'artigos blog indice lista conteudo temas todos biblioteca',
  'dor-no-quadril.html': 'dor quadril causas doi doer lado esquerdo direito sintoma nadega lateral coxa mancando coxalgia',
  'dor-na-virilha.html': 'virilha ingua inguinal dor andar levantar cadeira calcar meia hernia pubalgia adutor joelho irradiada bilateral gravidez',
  'bursite-no-quadril.html': 'bursite tendinite tendinopatia lateral trocanter trocanterica gluteo dormir de lado infiltracao ondas de choque',
  'como-aliviar-dor-artrose-quadril.html': 'aliviar alivio dor artrose exercicio remedio anti-inflamatorio colageno suplemento peso bengala dormir calor gelo infiltracao fisioterapia',
  'artrose-de-quadril.html': 'coxartrose artrose desgaste cartilagem graus grau tem cura bilateral diagnostico raio x grave',
  'fratura-de-quadril-no-idoso.html': 'fratura femur colo idoso idosa queda urgencia internacao mortalidade transtrocanterica quebrou bacia',
  'protese-de-quadril.html': 'protese artroplastia quadril tipos cimentada nao cimentada titanio ceramica polietileno durabilidade riscos luxacao',
  'quanto-custa-protese-de-quadril.html': 'quanto custa custo preco valor sus convenio plano particular nacional importada orcamento',
  'artroscopia-de-quadril.html': 'artroscopia labrum impacto femoroacetabular fai cam pincer video minimamente invasiva atleta jovem',
  'protese-de-quadril-vale-a-pena.html': 'vale a pena resultado 5 anos qualidade de vida satisfacao arrependimento',
  'recuperacao-protese-de-quadril.html': 'recuperacao pos operatorio fisioterapia reabilitacao luxacao dirigir trabalhar dormir de lado muleta andador',
  'cirurgioes-curitiba.html': 'cirurgiao especialista medico ortopedista quadril curitiba indicacao contato consulta onde procurar rqe',
  'sobre.html': 'sobre quem somos proposito editorial',
  'privacidade.html': 'privacidade lgpd cookies dados',
};
