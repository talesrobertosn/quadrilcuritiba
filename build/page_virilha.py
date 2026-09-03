# -*- coding: utf-8 -*-
import os, sys
HERE = os.path.dirname(os.path.abspath(__file__))
sys.path.insert(0, HERE)
from build import page  # noqa: E402

FIG_IRR = open(os.path.join(HERE, 'fig-irradiacao.svg'), encoding='utf-8').read()
FIG_ZON = open(os.path.join(HERE, 'fig-zonas.svg'), encoding='utf-8').read()

TOC = [
    ('virilha-artrose', 'Por que a artrose do quadril dói na virilha'),
    ('sinal-c', 'O sinal do “C”: como as pessoas mostram a dor'),
    ('movimentos', 'Andar, levantar da cadeira, calçar a meia, entrar no carro'),
    ('joelho', 'Quando a dor do quadril aparece no joelho'),
    ('dois-lados', 'Dor na virilha dos dois lados'),
    ('outras-causas', 'As outras causas de dor na virilha'),
    ('mulher', 'Dor na virilha na mulher, na gravidez e no pós-parto'),
    ('atleta', 'Dor na virilha em quem corre ou joga bola'),
    ('diagnostico', 'Como o médico diferencia uma coisa da outra'),
    ('rotacao', 'O teste que mais informa: a rotação interna'),
    ('exames', 'Radiografia e ressonância: o que pedir, e quando'),
    ('alerta', 'Sinais que pedem avaliação sem esperar'),
    ('enquanto-espera', 'O que fazer enquanto espera a consulta'),
]

BODY = '''<section><div class="wrap read prose">

  <h2 id="virilha-artrose" class="reveal">Por que a artrose do quadril dói na virilha</h2>
  <div class="callout info reveal">
    <h3>Em uma frase</h3>
    <p>A articulação do quadril não fica na lateral do corpo, onde a maioria das pessoas aponta. Ela fica <strong>fundo, na frente, atrás da virilha</strong>. Por isso a dor que vem de dentro da articulação aparece ali, e não do lado de fora. Quando alguém com mais de 50 anos chega dizendo que dói na virilha e que está difícil calçar a meia, a primeira hipótese, até prova em contrário, é <a href="artrose-de-quadril.html">artrose do quadril</a>.</p>
  </div>

  <p class="reveal">Existe um mal-entendido quase universal sobre onde fica o quadril. Quando pedimos para uma pessoa apontar onde é o quadril dela, quase todo mundo leva a mão para a lateral, para aquela saliência óssea que se sente no bolso da calça. Aquilo é o <strong>trocânter maior</strong>, uma alavanca de osso onde se prendem os tendões dos glúteos. A articulação propriamente dita, a junta onde a bola do fêmur gira dentro do encaixe da bacia, fica vários centímetros para dentro e para a frente, mais ou menos atrás da prega da virilha.</p>

  <p class="reveal">Isso não é curiosidade anatômica: é a chave para entender a própria dor. Uma articulação profunda manda seus sinais de dor pelos nervos que a inervam, e o quadril é inervado principalmente por ramos do <strong>nervo femoral</strong> e do <strong>nervo obturatório</strong>, que também levam sensibilidade da virilha e da face anterior e interna da coxa. O cérebro recebe o sinal e o interpreta no território daquele nervo. É por isso que um problema dentro da articulação se manifesta como dor na virilha e na frente da coxa, e não onde a mão da pessoa naturalmente vai.</p>

  <figure class="post-fig reveal">
    <div class="figscroll">FIG_IRR</div>
    <figcaption>Imagem ilustrativa. O trajeto habitual da dor que vem de dentro da articulação do quadril: começa na virilha, desce pela frente e por dentro da coxa e, em parte das pessoas, chega até o joelho. A dor sobre a saliência óssea da lateral segue outra lógica e costuma ser <a href="bursite-no-quadril.html">tendinopatia dos glúteos</a>.</figcaption>
  </figure>

  <p class="reveal">Vale dizer com honestidade que a relação não é perfeita. Estudos que perguntaram a pacientes com artrose confirmada do quadril onde exatamente doía encontraram muita variação: a maioria relata dor na virilha, mas uma parte importante relata também dor na nádega, dor na coxa e até dor exclusivamente no joelho. O contrário também acontece: nem toda dor na virilha é do quadril. O que a virilha oferece não é certeza, e sim <strong>a maior probabilidade</strong>. Entre todos os lugares onde o quadril pode doer, a virilha é o que mais aponta para dentro da articulação.</p>

  <h2 id="sinal-c" class="reveal">O sinal do “C”: como as pessoas mostram a dor</h2>

  <p class="reveal">Existe um gesto que ortopedistas que cuidam de quadril aprendem a procurar. Quando você pede para a pessoa mostrar onde dói, ela não aponta com um dedo: ela <strong>abre a mão em formato de C e encaixa a mão em volta do quadril</strong>, com o polegar apoiado atrás, na nádega, e os dedos entrando por cima da virilha. É como se ela quisesse segurar a articulação inteira por fora, porque a dor não tem um ponto, tem uma profundidade.</p>

  <p class="reveal">Esse gesto ficou conhecido na literatura ortopédica como <strong>sinal do C</strong>, descrito por Byrd, e a observação prática mais útil sobre ele é a seguinte: o gesto é tão envolvente que quem está do outro lado da mesa frequentemente o interpreta como “dor na lateral do quadril”. A pessoa mostra o C, o profissional vê a mão sobre a lateral e conclui bursite. Fica-se meses tratando um tendão que não é o problema, enquanto a articulação continua se desgastando.</p>

  <div class="callout info reveal">
    <h3>Um teste caseiro que vale mais do que parece</h3>
    <p>Aponte com <strong>um dedo só</strong> o ponto de maior dor, e pressione ali com força. Se a dor mais forte fica exatamente sobre a saliência óssea da lateral e piora quando você aperta o local, a chance é grande de ser <a href="bursite-no-quadril.html">tendinopatia glútea, a chamada bursite</a>. Se apertar a lateral não reproduz nada, e a dor mora lá dentro, na frente, num lugar que o dedo não alcança, isso aponta para dentro da articulação.</p>
  </div>

  <h2 id="movimentos" class="reveal">Andar, levantar da cadeira, calçar a meia, entrar no carro</h2>

  <p class="reveal">A dor de dentro da articulação tem uma assinatura de movimento muito característica. Ela não aparece do nada, deitada, parada: ela aparece quando a articulação é solicitada de um jeito específico, e são sempre os mesmos movimentos que a denunciam. Repare se você reconhece a sua rotina nesta lista.</p>

  <ul class="reveal">
    <li><strong>Ao andar, principalmente nos primeiros passos.</strong> Muita gente descreve uma dor e uma rigidez ao levantar da cama ou ao dar os primeiros passos depois de ficar sentado, que melhora depois de andar um pouco. Isso é característico da artrose e se chama dor de partida. Uma caminhada longa depois volta a doer, mas por outro motivo: cansaço da articulação.</li>
    <li><strong>Ao levantar de uma cadeira baixa ou do sofá.</strong> O movimento pede flexão máxima do quadril com carga, e a virilha responde.</li>
    <li><strong>Ao calçar meia, cortar as unhas do pé ou amarrar o sapato.</strong> Este é, na prática de consultório, o sintoma mais revelador de todos. Para alcançar o próprio pé é preciso dobrar e rodar o quadril ao mesmo tempo, e é exatamente esse movimento que a artrose tira primeiro. Muita gente não conta isso ao médico porque acha que é “falta de alongamento” ou “barriga”, quando na verdade é o dado clínico mais valioso da consulta.</li>
    <li><strong>Ao entrar e sair do carro.</strong> Mesmo mecanismo: dobrar e rodar ao mesmo tempo, agora com o peso do corpo se apoiando.</li>
    <li><strong>Ao cruzar as pernas</strong>, ou ao tentar sentar com uma perna sobre a outra.</li>
    <li><strong>Ao girar o corpo em cima da perna apoiada</strong>, por exemplo para pegar algo atrás de você na cozinha. Costuma vir uma fisgada aguda na virilha.</li>
  </ul>

  <p class="reveal">Note o padrão: todos esses movimentos envolvem <strong>rodar o quadril para dentro com o quadril dobrado</strong>. Guarde isso, porque é exatamente esse o movimento que o médico vai testar no exame físico, e é o achado que mais separa dor de dentro da articulação de dor de fora.</p>

  <h2 id="joelho" class="reveal">Quando a dor do quadril aparece no joelho</h2>

  <p class="reveal">Esta é uma das armadilhas mais conhecidas da ortopedia, e ela custa tempo de diagnóstico para muita gente. Uma parte das pessoas com problema no quadril <strong>não sente dor nenhuma no quadril</strong>. Sente dor no joelho, geralmente na parte da frente ou de dentro do joelho, e é para lá que a investigação vai. Faz-se radiografia do joelho, ressonância do joelho, às vezes fisioterapia inteira do joelho, e a dor não cede, porque o problema nunca esteve ali.</p>

  <p class="reveal">A explicação é a mesma da virilha: o <strong>nervo obturatório</strong> inerva tanto a cápsula do quadril quanto a face interna da coxa e a região do joelho. O cérebro erra o endereço. Em crianças e adolescentes essa armadilha é ainda mais perigosa, porque um escorregamento da cabeça do fêmur, o epifisiólise, se apresenta com frequência como dor no joelho, e o atraso no diagnóstico tem consequências sérias.</p>

  <div class="callout info reveal">
    <h3>A regra prática</h3>
    <p>Diante de uma dor no joelho que não tem explicação clara no próprio joelho, principalmente quando o exame do joelho é normal e as imagens do joelho são normais, <strong>examine o quadril</strong>. É rápido, é gratuito, e resolve o caso com uma frequência que surpreende.</p>
  </div>

  <h2 id="dois-lados" class="reveal">Dor na virilha dos dois lados</h2>

  <p class="reveal">Quando dói nos dois lados, a lista de possibilidades se abre. Continua sendo possível que sejam dois quadris com artrose, e isso não é raro: a coxartrose é bilateral em uma parcela significativa dos casos, principalmente quando existe uma alteração de formato da articulação que veio de fábrica e que, sendo do indivíduo, vale para os dois lados.</p>

  <p class="reveal">Mas dor bilateral também levanta outras hipóteses que precisam entrar na conta:</p>
  <ul class="reveal">
    <li><strong>Problema de coluna lombar.</strong> Compressões e alterações lombares altas podem gerar dor referida na região inguinal dos dois lados.</li>
    <li><strong>Doenças inflamatórias da coluna e das articulações sacroilíacas</strong>, como as espondiloartrites. A pista clássica aqui é o tipo errado de rigidez: dor que <strong>melhora com o movimento e piora com o repouso</strong>, rigidez matinal de mais de meia hora, despertar na segunda metade da noite, começo em idade jovem. É o oposto do padrão mecânico da artrose, e é um sinal que merece investigação.</li>
    <li><strong>Pubalgia e sobrecarga da sínfise púbica</strong>, mais comum em quem faz esporte de mudança de direção.</li>
    <li><strong>Osteonecrose da cabeça do fêmur</strong>, que é bilateral em boa parte dos casos e tem fatores de risco identificáveis: uso de corticoide em dose alta ou prolongada, consumo importante de álcool, anemia falciforme, lúpus, quimioterapia, mergulho profissional.</li>
  </ul>

  <p class="reveal">Nada disso significa alarme. Significa que dor bilateral é um caso em que a consulta rende mais do que a busca na internet, porque o exame físico separa essas possibilidades em poucos minutos.</p>

  <h2 id="outras-causas" class="reveal">As outras causas de dor na virilha</h2>

  <p class="reveal">A virilha é um cruzamento anatômico: passam por ali a articulação do quadril, os tendões dos músculos adutores, o canal inguinal, o músculo iliopsoas, vasos, gânglios linfáticos, nervos vindos da coluna lombar alta e, atrás de tudo, órgãos do abdome e da pelve. Uma dor nessa região pode vir de qualquer uma dessas camadas, e o trabalho do diagnóstico é justamente separá-las.</p>

  <h3 class="reveal">Hérnia inguinal</h3>
  <p class="reveal">É a primeira coisa que muita gente pensa, e a mais fácil de reconhecer. A pista é o <strong>caroço</strong>: um abaulamento na virilha que aparece ou aumenta quando você fica em pé, faz força, tosse ou levanta peso, e que some ou diminui quando você deita. Não costuma piorar com movimento de rodar o quadril, e não atrapalha calçar a meia. É problema de cirurgia geral, não de ortopedia. Uma hérnia que fica dura, dolorosa e não reduz mais é urgência.</p>

  <h3 class="reveal">Lesão dos adutores e pubalgia</h3>
  <p class="reveal">Os músculos adutores são os que puxam a perna para dentro, e o tendão do adutor longo é o mais frequentemente lesionado em toda dor de virilha ligada a esporte. A dor fica mais <strong>por dentro</strong>, colada no púbis, é reproduzida quando você aperta os joelhos um contra o outro contra resistência e é sensível à palpação de um ponto específico, que o dedo alcança. Quando o problema envolve a região da sínfise púbica e a parede abdominal, fala-se em pubalgia, e o quadro costuma ser de meses de evolução em quem faz esporte com arranque e mudança de direção.</p>

  <h3 class="reveal">Impacto femoroacetabular e lesão do labrum</h3>
  <p class="reveal">Aqui a dor também é de dentro da articulação, também é na virilha e também piora ao dobrar e rodar. A diferença está na idade e na história: costuma aparecer em <strong>gente jovem e ativa</strong>, entre os 20 e os 45 anos, muitas vezes ligada a esporte, com dor na virilha ao ficar muito tempo sentado, ao agachar e ao acelerar. Pode haver estalos e uma sensação de travamento. É a alteração de formato entre a bola e o encaixe que, ao longo dos anos, machuca o labrum e a cartilagem. Explicamos isso em detalhe na página sobre <a href="artroscopia-de-quadril.html">artroscopia de quadril e impacto femoroacetabular</a>.</p>

  <h3 class="reveal">Tendinite do iliopsoas e ressalto</h3>
  <p class="reveal">O iliopsoas é o principal flexor do quadril e seu tendão passa por cima da borda da bacia. Quando irritado, dói na virilha ao subir escada, ao levantar a perna para entrar no carro e, às vezes, produz um <strong>estalo audível e palpável</strong> na virilha ao mover a perna, o chamado ressalto interno. É um quadro benigno e que responde bem a tratamento conservador.</p>

  <h3 class="reveal">Dor vinda da coluna lombar</h3>
  <p class="reveal">Raízes nervosas lombares altas, principalmente L1 e L2, levam sensibilidade à região inguinal. Uma alteração nessas raízes pode produzir dor na virilha sem dor nenhuma nas costas. As pistas costumam ser dor em faixa, sensação de queimação ou formigamento, alteração de sensibilidade na pele e um exame de quadril inteiramente normal, com rotação preservada e indolor.</p>

  <h3 class="reveal">Fratura por estresse do colo do fêmur</h3>
  <p class="reveal">É rara, mas é a que mais exige atenção. Aparece em duas situações: em quem aumentou muito rápido o volume de corrida ou de treino, e em pessoas com osso frágil, principalmente mulheres após a menopausa e idosos. A dor é na virilha, piora progressivamente com a carga, dói ao apoiar o peso, pode doer à noite e não melhora com repouso curto. <strong>A radiografia inicial pode ser normal</strong>, e é exatamente por isso que essa hipótese precisa ser lembrada: o exame que faz o diagnóstico é a ressonância magnética, e o diagnóstico precoce evita que a fratura se complete.</p>

  <h3 class="reveal">Causas urológicas, ginecológicas e abdominais</h3>
  <p class="reveal">Cálculo renal que desce pelo ureter dói irradiando para a virilha, em cólica, com náusea e agitação. Problemas de ovário, endometriose e alterações do útero podem doer na virilha, muitas vezes com relação com o ciclo menstrual. Problemas testiculares doem na virilha e exigem avaliação rápida. Gânglios aumentados na virilha, dolorosos, com vermelhidão e febre, apontam para infecção. Nenhuma dessas dores piora ao rodar o quadril, e essa é a principal pista de que o problema não é ortopédico.</p>

  <div class="tablewrap reveal">
    <table>
      <caption>Resumo prático das pistas. Nenhuma linha isolada fecha diagnóstico: quem fecha é o conjunto, avaliado por um médico.</caption>
      <thead><tr><th scope="col">Causa</th><th scope="col">Onde e como dói</th><th scope="col">A pista que denuncia</th></tr></thead>
      <tbody>
        <tr><th scope="row">Artrose do quadril</th><td>Virilha, frente da coxa, às vezes joelho</td><td>Dificuldade de calçar a meia; perda de rotação interna</td></tr>
        <tr><th scope="row">Impacto femoroacetabular</th><td>Virilha, em pessoa jovem e ativa</td><td>Dói ao ficar muito tempo sentado e ao agachar</td></tr>
        <tr><th scope="row">Tendinopatia glútea</th><td>Lateral, sobre a saliência óssea</td><td>Dói ao deitar sobre aquele lado; dói ao apertar o local</td></tr>
        <tr><th scope="row">Adutores e pubalgia</th><td>Bem por dentro, colada no púbis</td><td>Dói ao apertar os joelhos um contra o outro</td></tr>
        <tr><th scope="row">Hérnia inguinal</th><td>Virilha, com abaulamento</td><td>Caroço que aparece ao fazer força e some ao deitar</td></tr>
        <tr><th scope="row">Coluna lombar alta</th><td>Virilha, em faixa</td><td>Formigamento ou queimação; exame do quadril normal</td></tr>
        <tr><th scope="row">Fratura por estresse</th><td>Virilha, progressiva</td><td>Piora com a carga, dói à noite, radiografia pode ser normal</td></tr>
      </tbody>
    </table>
  </div>

  <h2 id="mulher" class="reveal">Dor na virilha na mulher, na gravidez e no pós-parto</h2>

  <p class="reveal">Dor na virilha durante a gravidez é comum e, na maioria esmagadora das vezes, benigna. A causa mais frequente é a <strong>dor da cintura pélvica</strong>: o corpo produz hormônios que aumentam a frouxidão dos ligamentos, o peso muda de lugar, a bacia trabalha diferente, e o resultado é dor na sínfise púbica, nas sacroilíacas e na virilha, que piora ao virar na cama, ao subir escada e ao ficar em pé sobre uma perna só. Melhora com fisioterapia orientada, ajuste de atividades e, às vezes, cinta pélvica.</p>

  <p class="reveal">Existe, porém, uma condição rara e importante de conhecer, porque é frequentemente confundida com dor pélvica comum: a <strong>osteoporose transitória do quadril</strong>, que aparece tipicamente no terceiro trimestre da gestação e produz dor na virilha que piora bastante com a carga, a ponto de mancar. Ela é autolimitada, mas exige diagnóstico porque o quadril fica temporariamente frágil. Uma dor de virilha na gravidez que faz mancar de verdade e que piora progressivamente merece avaliação médica em vez de espera.</p>

  <p class="reveal">Fora da gravidez, vale lembrar que endometriose, alterações ovarianas e dor pélvica crônica podem se manifestar na virilha, e que a relação da dor com o ciclo menstrual é uma pista que costuma passar despercebida se ninguém perguntar.</p>

  <h2 id="atleta" class="reveal">Dor na virilha em quem corre ou joga bola</h2>

  <p class="reveal">Dor na virilha no esporte é um capítulo próprio e tão confuso que especialistas do mundo inteiro se reuniram em Doha, em 2015, especificamente para padronizar os nomes, porque cada país e cada escola chamava a mesma coisa de um jeito diferente. O acordo resultante organizou a dor de virilha do atleta em categorias definidas pelo exame clínico: <strong>relacionada aos adutores, ao iliopsoas, à região inguinal, ao púbis</strong> e, à parte, a dor <strong>relacionada ao quadril</strong> propriamente dito.</p>

  <p class="reveal">Duas mensagens práticas saem dali. A primeira é que a categoria mais comum, de longe, é a dos adutores, e que ela responde bem a um programa progressivo de fortalecimento, não a repouso. A segunda é que mais de uma categoria pode coexistir na mesma pessoa, o que explica por que tratamentos que atacam só um alvo falham com frequência. E há uma terceira, menos confortável: uma parte dos atletas com dor de virilha persistente tem, na verdade, um problema estrutural do quadril que estava lá desde sempre e que só apareceu quando a carga aumentou.</p>

  <h2 id="diagnostico" class="reveal">Como o médico diferencia uma coisa da outra</h2>

  <p class="reveal">O diagnóstico da dor na virilha é feito principalmente com conversa e exame físico, e só depois com imagem. A ordem importa: pedir ressonância antes de examinar é a receita mais confiável para encontrar um achado irrelevante e tratar a coisa errada.</p>

  <p class="reveal">Na conversa, quatro perguntas costumam valer mais do que todas as outras:</p>
  <ol class="reveal">
    <li><strong>Você consegue calçar a meia sem dificuldade?</strong> A resposta negativa aponta para dentro da articulação.</li>
    <li><strong>A dor melhora ou piora quando você se movimenta?</strong> Piorar com atividade e melhorar com repouso é padrão mecânico. Melhorar com movimento e piorar com repouso, com rigidez matinal longa, levanta a hipótese inflamatória.</li>
    <li><strong>Aparece caroço quando você faz força?</strong> Direciona para hérnia.</li>
    <li><strong>Apareceu depois de aumentar treino, ou você tem osso frágil?</strong> Levanta a hipótese de fratura por estresse.</li>
  </ol>

  <figure class="post-fig reveal">
    <div class="figscroll">FIG_ZON</div>
    <figcaption>Imagem ilustrativa. As três regiões de dor do quadril e o que cada uma costuma indicar. O lugar exato onde a mão pousa é um dos dados mais informativos da consulta.</figcaption>
  </figure>

  <h2 id="rotacao" class="reveal">O teste que mais informa: a rotação interna</h2>

  <p class="reveal">Se houvesse um único movimento para examinar num quadril, seria a <strong>rotação interna</strong>. Com a pessoa deitada e o quadril dobrado a noventa graus, o examinador gira o pé para fora, o que faz o quadril rodar para dentro. Duas coisas são observadas: quanto de movimento existe, e se doer.</p>

  <p class="reveal">A perda de rotação interna é o achado mais precoce e mais constante da artrose do quadril, e aparece muito antes de a pessoa perder outros movimentos. Um quadril que roda menos que o outro, ou que dói na virilha exatamente quando é rodado para dentro, é um quadril que está falando. Critérios clínicos clássicos de artrose de quadril usam justamente esse dado, combinando dor no quadril com rotação interna reduzida e flexão limitada. E existem regras de predição publicadas que mostram que a combinação de alguns achados simples de exame, entre eles a rotação interna igual ou menor que vinte e cinco graus, aumenta muito a chance de que a radiografia venha alterada.</p>

  <div class="callout info reveal">
    <h3>Por que isso importa para você</h3>
    <p>Porque significa que <strong>um bom exame físico de cinco minutos vale mais que uma ressonância</strong> na primeira consulta de uma dor na virilha. Se você sair de uma consulta em que ninguém deitou você na maca e mexeu no seu quadril, faltou a parte mais importante.</p>
  </div>

  <h2 id="exames" class="reveal">Radiografia e ressonância: o que pedir, e quando</h2>

  <p class="reveal">O primeiro exame de imagem de uma dor na virilha com suspeita de causa articular é a <strong>radiografia simples da bacia</strong>, com uma incidência de frente que pegue os dois quadris e, quando a suspeita é de impacto femoroacetabular, uma incidência de perfil. É barata, é rápida, mostra artrose, mostra o formato dos ossos, mostra fraturas evidentes e mostra displasia. Nos dois quadris de uma vez, o que permite comparar.</p>

  <p class="reveal">A ressonância magnética entra em situações específicas, e não como primeiro exame:</p>
  <ul class="reveal">
    <li>Dor na virilha persistente com <strong>radiografia normal</strong>, especialmente se há suspeita de fratura por estresse ou de osteonecrose, porque nesses casos a radiografia demora semanas a meses para mostrar alterações.</li>
    <li>Planejamento de <strong>cirurgia artroscópica</strong>, para avaliar labrum e cartilagem.</li>
    <li>Suspeita de infecção, tumor ou processo inflamatório.</li>
    <li>Quadros de dor de virilha do atleta que não melhoram com tratamento bem conduzido.</li>
  </ul>

  <div class="callout alert reveal">
    <h3>Cuidado com o que a ressonância encontra</h3>
    <p>Este é o ponto em que mais gente se perde. Estudos que fizeram ressonância de quadril em <strong>voluntários sem dor nenhuma</strong> encontraram lesão de labrum em cerca de <strong>sete em cada dez</strong> pessoas, e alguma alteração em quase três de cada quatro. Ou seja: encontrar “lesão do labrum” num laudo não prova, sozinho, que ela seja a causa da sua dor. O laudo descreve a imagem; quem interpreta o significado é o médico que examinou você. Tratar laudo em vez de tratar pessoa é como se opera o quadril errado.</p>
  </div>

  <h2 id="alerta" class="reveal">Sinais que pedem avaliação sem esperar</h2>

  <div class="callout alert reveal">
    <h3>Procure atendimento médico se a dor na virilha vier acompanhada de:</h3>
    <ul>
      <li><strong>Febre</strong>, calafrio, mal-estar importante ou vermelhidão e calor na região.</li>
      <li><strong>Incapacidade de apoiar o peso na perna</strong> ou dor que piorou de forma abrupta, especialmente depois de uma queda, mesmo uma queda pequena, em pessoa idosa.</li>
      <li>Dor que <strong>piora progressivamente e dói à noite</strong>, acordando você, sem relação com o que você fez durante o dia.</li>
      <li>Perda de peso sem explicação, histórico de câncer, ou uso prolongado de corticoide.</li>
      <li>Abaulamento na virilha que ficou <strong>duro, muito doloroso e não volta mais para dentro</strong>, com náusea ou vômito.</li>
      <li>Dor testicular aguda, dor em cólica com náusea e sangue na urina, ou dor pélvica intensa de início súbito.</li>
      <li>Formigamento, perda de força na perna ou alteração para controlar urina e fezes.</li>
    </ul>
  </div>

  <h2 id="enquanto-espera" class="reveal">O que fazer enquanto espera a consulta</h2>

  <p class="reveal">Nada do que está abaixo substitui avaliação médica, e nada disso trata a causa. São medidas de alívio razoáveis e de baixo risco para o período de espera, e valem principalmente se a hipótese mais provável for articular.</p>

  <ul class="reveal">
    <li><strong>Não pare de se mover.</strong> Repouso absoluto piora quadril. O que ajuda é trocar a atividade que dói por outra que não dói: se caminhar longo dói, caminhe menos e mais vezes; se dói andar em ladeira, escolha terreno plano; bicicleta e água costumam ser bem tolerados.</li>
    <li><strong>Ajuste a altura das coisas.</strong> Cadeira e vaso sanitário mais altos reduzem a flexão máxima do quadril, que é justamente o que dói. Um calçador de sapato de cabo longo e um pegador resolvem o problema da meia sem exigir o movimento que dói.</li>
    <li><strong>Bengala do lado certo.</strong> Se a dor é de um lado só, a bengala vai na <strong>mão oposta</strong> à do quadril que dói. Isso não é detalhe: usada do lado errado, a bengala aumenta a carga na articulação em vez de reduzir. Explicamos o porquê na página de <a href="como-aliviar-dor-artrose-quadril.html">como aliviar a dor</a>.</li>
    <li><strong>Calor antes, gelo depois.</strong> Calor local por quinze a vinte minutos ajuda a soltar antes de se mover; gelo é mais útil depois de um dia em que a articulação foi exigida demais.</li>
    <li><strong>Peso corporal.</strong> É o fator modificável com maior impacto na dor do quadril a médio prazo, e o mais desagradável de ouvir. Não é sobre estética: cada quilo a menos reduz de forma multiplicada a carga que atravessa a articulação a cada passo.</li>
    <li><strong>Analgésicos.</strong> Paracetamol e anti-inflamatórios podem ajudar por períodos curtos, mas anti-inflamatório não é remédio de uso contínuo por conta própria: tem efeitos no estômago, no rim e na pressão. Quem tem doença renal, gastrite, hipertensão ou usa anticoagulante deve conversar com o médico antes.</li>
  </ul>

  <div class="callout info reveal">
    <h3>E o que não vale a pena</h3>
    <p>Ficar deitado por dias esperando passar, comprar suplementos prometendo regenerar cartilagem, repetir infiltrações sem diagnóstico definido e fazer ressonância antes de qualquer exame físico. Nenhuma dessas quatro coisas encurta o caminho, e as duas últimas costumam alongá-lo.</p>
  </div>

</div></section>'''

BODY = BODY.replace('FIG_IRR', FIG_IRR).replace('FIG_ZON', FIG_ZON)

TAKE = '''<section><div class="wrap read prose">
  <div class="takeaways reveal"><h2>Em resumo</h2><ul>
    <li>A articulação do quadril não fica na lateral do corpo: fica fundo, na frente, atrás da virilha. Por isso a dor que vem de dentro dela aparece na virilha, e não do lado de fora.</li>
    <li>Dificuldade para calçar a meia, cortar as unhas do pé ou entrar no carro é o sintoma mais revelador de problema dentro da articulação, e é o que mais deixa de ser contado na consulta.</li>
    <li>O gesto da mão em “C” em volta do quadril indica dor articular profunda, mas é frequentemente lido como dor na lateral, e isso leva a meses de tratamento para uma bursite que não existe.</li>
    <li>Parte das pessoas com problema no quadril sente dor apenas no joelho. Joelho que dói sem explicação no próprio joelho pede exame do quadril.</li>
    <li>A perda de rotação interna é o achado mais precoce da artrose do quadril, e um exame físico de cinco minutos vale mais que uma ressonância na primeira consulta.</li>
    <li>Lesão do labrum aparece na ressonância de cerca de sete em cada dez pessoas <strong>sem dor nenhuma</strong>. Laudo não é diagnóstico.</li>
    <li>Nem toda dor na virilha é do quadril: hérnia, adutores, coluna lombar alta, fratura por estresse e causas urológicas e ginecológicas entram na mesma conta, e nenhuma delas piora ao rodar o quadril.</li>
  </ul></div>
  <div class="refs reveal" style="margin-top:40px;"><details><summary>Referências</summary><ol>
    <li>Weir A, Brukner P, Delahunt E, et al. Doha agreement meeting on terminology and definitions in groin pain in athletes. British Journal of Sports Medicine. 2015;49(12):768-74.</li>
    <li>Griffin DR, Dickenson EJ, O'Donnell J, et al. The Warwick Agreement on femoroacetabular impingement syndrome (FAI syndrome): an international consensus statement. British Journal of Sports Medicine. 2016;50(19):1169-76.</li>
    <li>Register B, Pennock AT, Ho CP, Strickland CD, Lawand A, Philippon MJ. Prevalence of abnormal hip findings in asymptomatic participants: a prospective, blinded study. American Journal of Sports Medicine. 2012;40(12):2720-4.</li>
    <li>Frank JM, Harris JD, Erickson BJ, et al. Prevalence of femoroacetabular impingement imaging findings in asymptomatic volunteers: a systematic review. Arthroscopy. 2015;31(6):1199-204.</li>
    <li>Sutlive TG, Lopez HP, Schnitker DE, et al. Development of a clinical prediction rule for diagnosing hip osteoarthritis in individuals with unilateral hip pain. Journal of Orthopaedic &amp; Sports Physical Therapy. 2008;38(9):542-50.</li>
    <li>Altman R, Alarcón G, Appelrouth D, et al. The American College of Rheumatology criteria for the classification and reporting of osteoarthritis of the hip. Arthritis and Rheumatism. 1991;34(5):505-14.</li>
    <li>Byrd JWT. Evaluation of the hip: history and physical examination. North American Journal of Sports Physical Therapy. 2007;2(4):231-40.</li>
    <li>Khan AM, McLoughlin E, Giannakas K, Hutchinson C, Andrew JG. Hip osteoarthritis: where is the pain? Annals of the Royal College of Surgeons of England. 2004;86(2):119-21.</li>
    <li>Lesher JM, Dreyfuss P, Hager N, Kaplan M, Furman M. Hip joint pain referral patterns: a descriptive study. Pain Medicine. 2008;9(1):22-5.</li>
    <li>Poulsen E, Overgaard S, Vestergaard ET, Christensen HW, Hartvigsen J. Pain distribution in primary care patients with hip osteoarthritis. Family Practice. 2016;33(6):601-6.</li>
    <li>Vleeming A, Albert HB, Östgaard HC, Sturesson B, Stuge B. European guidelines for the diagnosis and treatment of pelvic girdle pain. European Spine Journal. 2008;17(6):794-819.</li>
    <li>Serner A, van Eijck CH, Beumer BR, Hölmich P, Weir A, de Vos RJ. Study quality on groin injury management remains low: a systematic review on treatment of groin pain in athletes. British Journal of Sports Medicine. 2015;49(12):813.</li>
  </ol></details></div>
</div></section>'''

FAQ = [
    ("Dor na virilha é sempre problema no quadril?",
     "Não. A virilha é um cruzamento anatômico e a dor ali pode vir da articulação do quadril, dos tendões dos adutores, do canal inguinal, do músculo iliopsoas, das raízes nervosas lombares altas e até de órgãos do abdome e da pelve. O que aponta para o quadril é o comportamento da dor: piorar ao dobrar e rodar a perna, dificultar calçar a meia e entrar no carro, e reduzir a rotação interna no exame físico. Dores que não mudam nada quando o quadril é movimentado costumam ter outra origem."),
    ("Por que a artrose do quadril dói na virilha e não na lateral?",
     "Porque a articulação do quadril não fica na lateral do corpo. Ela fica profunda, na frente, atrás da prega da virilha, e é inervada principalmente por ramos dos nervos femoral e obturatório, que também levam sensibilidade da virilha e da face anterior e interna da coxa. O cérebro interpreta o sinal no território desses nervos. A dor sobre a saliência óssea da lateral costuma ser outro problema, de tendão, chamado tendinopatia glútea, popularmente conhecido como bursite."),
    ("Como saber se a dor na virilha é hérnia ou é do quadril?",
     "A pista mais confiável é o caroço. A hérnia inguinal produz um abaulamento que aparece ou aumenta ao ficar em pé, fazer força ou tossir, e que diminui ou some ao deitar. Ela não piora quando você roda o quadril e não atrapalha calçar a meia. A dor articular do quadril faz o oposto: não tem caroço, piora ao dobrar e rodar a perna e atrapalha justamente os movimentos de alcançar o próprio pé. Um caroço na virilha que fica duro, muito doloroso e não reduz mais, com náusea ou vômito, é situação de urgência."),
    ("Dor na virilha ao levantar da cadeira e ao calçar meia: o que costuma ser?",
     "Essa combinação é bastante característica de problema dentro da articulação do quadril, e em pessoas acima de 50 anos a hipótese principal é artrose. Ambos os movimentos exigem dobrar e rodar o quadril ao mesmo tempo, que é exatamente o movimento que a artrose limita primeiro. Em pessoas mais jovens e ativas, a mesma combinação levanta a hipótese de impacto femoroacetabular com lesão do labrum. Nos dois casos, o exame físico com avaliação da rotação interna e uma radiografia simples da bacia costumam esclarecer."),
    ("Dor na virilha nos dois lados é mais grave?",
     "Não necessariamente, mas amplia a lista de possibilidades. Pode ser artrose bilateral, o que é comum quando existe uma alteração de formato da articulação presente nos dois lados. Também entram na conta problemas de coluna lombar, doenças inflamatórias das articulações como as espondiloartrites, pubalgia e osteonecrose da cabeça do fêmur. Um sinal que muda a investigação é o padrão inflamatório: dor que melhora com o movimento, piora com o repouso, com rigidez matinal de mais de meia hora e despertar na segunda metade da noite merece avaliação específica."),
    ("Dor no quadril pode aparecer só no joelho?",
     "Pode, e essa é uma das armadilhas mais conhecidas da ortopedia. O nervo obturatório inerva tanto a cápsula do quadril quanto a face interna da coxa e a região do joelho, e o cérebro erra o endereço. Existem pessoas com artrose avançada do quadril cuja única queixa é dor no joelho. Em crianças e adolescentes essa apresentação é ainda mais importante, porque o escorregamento da cabeça do fêmur com frequência se apresenta como dor no joelho e o atraso no diagnóstico tem consequências sérias. Diante de dor no joelho sem explicação no próprio joelho, examinar o quadril é obrigatório."),
    ("Preciso fazer ressonância para investigar dor na virilha?",
     "Na maior parte das vezes, não como primeiro exame. O caminho habitual é conversa, exame físico e radiografia simples da bacia, que mostra artrose, formato dos ossos, displasia e fraturas evidentes. A ressonância entra em situações específicas: dor persistente com radiografia normal, suspeita de fratura por estresse ou de osteonecrose, planejamento de cirurgia artroscópica e suspeita de infecção, tumor ou processo inflamatório. Vale saber que a ressonância encontra lesão de labrum em cerca de sete em cada dez pessoas sem dor nenhuma, então o achado precisa ser interpretado junto com o exame físico, e não isoladamente."),
    ("Dor na virilha na gravidez é normal?",
     "É comum e, na maioria das vezes, benigna. A causa mais frequente é a dor da cintura pélvica, ligada ao aumento da frouxidão dos ligamentos e à mudança de carga, que piora ao virar na cama, subir escada e ficar em pé sobre uma perna só, e que responde bem a fisioterapia orientada. Existe, porém, uma condição rara chamada osteoporose transitória do quadril, típica do terceiro trimestre, que causa dor forte na virilha com carga e faz mancar. Dor de virilha na gravidez que faz mancar de verdade e piora progressivamente merece avaliação médica em vez de espera."),
    ("Qual médico procurar para dor na virilha?",
     "O ortopedista é o especialista indicado quando a dor tem características mecânicas: piora ao movimentar, ao dobrar e rodar a perna, ao andar, e atrapalha atividades como calçar a meia. Se existe abaulamento com esforço, o caminho é o cirurgião geral, por causa da hipótese de hérnia. Dor em cólica com náusea e alteração na urina aponta para urologia, e dor relacionada ao ciclo menstrual ou pélvica crônica em mulheres aponta para ginecologia. Na dúvida, o clínico geral consegue fazer a triagem inicial e encaminhar."),
]

page(
    slug='dor-na-virilha.html',
    title='Dor na Virilha: Causas, o Que Pode Ser e Quando Se Preocupar',
    description='Dor na virilha: por que a artrose do quadril dói ali, como diferenciar de hérnia, adutores e coluna, quais exames pedir e os sinais de alerta.',
    og_title='Dor na virilha: o que pode ser e como diferenciar',
    og_desc='A articulação do quadril fica atrás da virilha, não na lateral. Entenda o que a sua dor está dizendo.',
    h1='Dor na virilha: o que pode ser, e por que o quadril é o principal suspeito',
    lead='A articulação do quadril não fica onde quase todo mundo aponta. Ela fica funda, na frente, bem atrás da prega da virilha. É por isso que a dor de dentro da articulação aparece ali, e é por isso que tanta gente com <strong>artrose do quadril</strong> passa meses tratando bursite, hérnia ou joelho antes de alguém examinar o quadril.',
    pill='Dor na virilha',
    crumb_label='Dor na virilha',
    body=BODY + '\n\n' + TAKE,
    toc=TOC,
    faq=FAQ,
    faq_title='Dúvidas sobre dor na virilha',
    revised='3 de setembro de 2026',
    published='2026-09-03',
    modified='2026-09-03',
    minutes=17,
    about={"@type": "MedicalCondition", "name": "Dor na virilha",
           "alternateName": ["Dor inguinal", "Dor na virilha e no quadril", "Coxartrose",
                             "Artrose do quadril", "Impacto femoroacetabular"]},
    related=[
        ('artrose-de-quadril.html', 'Coxartrose: sintomas, graus e tratamento'),
        ('artroscopia-de-quadril.html', 'Artroscopia e impacto femoroacetabular'),
        ('bursite-no-quadril.html', 'Quando a dor é na lateral, e não na virilha'),
        ('dor-no-quadril.html', 'Dor no quadril: todas as causas'),
        ('como-aliviar-dor-artrose-quadril.html', 'Como aliviar a dor da artrose'),
        ('fratura-de-quadril-no-idoso.html', 'Dor na virilha após queda no idoso'),
    ],
)
