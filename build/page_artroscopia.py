# -*- coding: utf-8 -*-
import os, sys
HERE = os.path.dirname(os.path.abspath(__file__))
sys.path.insert(0, HERE)
from build import page  # noqa: E402

FIG_ANAT = open(os.path.join(HERE, 'fig-anatomia.svg'), encoding='utf-8').read()

TOC = [
    ('o-que-e', 'O que é a artroscopia de quadril'),
    ('impacto', 'O que é o impacto femoroacetabular'),
    ('labrum', 'A lesão do labrum, e por que ela aparece em quem não tem dor'),
    ('sintomas', 'Como é a dor de quem tem impacto no quadril'),
    ('diagnostico', 'Como o diagnóstico é feito'),
    ('quem', 'Quem tem indicação de artroscopia'),
    ('quem-nao', 'Quem não deve fazer artroscopia'),
    ('evidencia', 'O que dizem os ensaios clínicos'),
    ('fisioterapia', 'Artroscopia ou fisioterapia? Lendo os números com honestidade'),
    ('cirurgia', 'Como é a cirurgia, passo a passo'),
    ('recuperacao', 'A recuperação, semana a semana'),
    ('riscos', 'Riscos e complicações'),
    ('artrose-futuro', 'A artroscopia previne a artrose no futuro?'),
    ('vs-protese', 'Artroscopia e prótese não são a mesma conversa'),
    ('custo', 'SUS, plano de saúde e custo'),
    ('alerta', 'Sinais que pedem avaliação'),
]

BODY = '''<section><div class="wrap read prose">

  <h2 id="o-que-e" class="reveal">O que é a artroscopia de quadril</h2>
  <div class="callout info reveal">
    <h3>Em uma frase</h3>
    <p>Artroscopia de quadril é uma cirurgia feita por <strong>duas a quatro incisões de cerca de um centímetro</strong>, por onde entram uma câmera e instrumentos finos, para tratar problemas de dentro da articulação sem abrir o quadril. Ela não troca nada por prótese: ela conserta o que está lá. É uma cirurgia para <strong>quadril jovem e sem artrose</strong>, e essa condição é a coisa mais importante de toda esta página.</p>
  </div>

  <p class="reveal">O quadril é uma articulação difícil de alcançar. Ao contrário do joelho, que é superficial e fácil de distender, a bola do fêmur fica encaixada com firmeza dentro da bacia, coberta por uma cápsula espessa e envolvida por músculos volumosos. Para conseguir entrar ali com uma câmera, o cirurgião precisa <strong>afastar a bola do encaixe alguns milímetros</strong>, aplicando tração controlada sobre a perna numa mesa própria para isso. É esse detalhe que explica quase tudo sobre a artroscopia de quadril: por que ela demorou décadas mais que a do joelho para se popularizar, por que exige treinamento específico e por que uma parte das suas complicações vem justamente da tração, e não do que se faz dentro da articulação.</p>

  <p class="reveal">O que se trata lá dentro, na esmagadora maioria das vezes, é uma condição chamada <strong>impacto femoroacetabular</strong>, quase sempre acompanhada de uma lesão do <strong>labrum</strong>. É disso que trata o resto desta página.</p>

  <figure class="post-fig reveal">
    <div class="figscroll">FIG_ANAT</div>
    <figcaption>Imagem ilustrativa. A articulação do quadril e suas peças: a bola do fêmur, o encaixe da bacia, a cartilagem que reveste as duas superfícies e o labrum, o anel de vedação na borda do encaixe. Na artroscopia, é sobre o labrum e sobre o formato do osso que o cirurgião trabalha.</figcaption>
  </figure>

  <h2 id="impacto" class="reveal">O que é o impacto femoroacetabular</h2>

  <p class="reveal">A articulação do quadril funciona bem porque a bola é redonda e o encaixe tem a profundidade certa. Quando alguma dessas duas coisas foge um pouco do padrão, os dois ossos começam a <strong>bater um no outro nos extremos do movimento</strong>, em vez de deslizar. Esse choque repetido, milhares de vezes por ano, machuca primeiro o labrum e depois a cartilagem. É isso que se chama impacto femoroacetabular.</p>

  <p class="reveal">Não é uma doença que se pega: é um <strong>formato</strong>. Ele se estabelece durante o crescimento, especialmente na adolescência, e há evidência consistente de que a prática intensa de esporte de impacto durante os anos de crescimento aumenta a chance de desenvolver a alteração óssea do lado do fêmur. Existem dois tipos, e a maioria das pessoas tem os dois ao mesmo tempo.</p>

  <h3 class="reveal">Tipo cam: a bola que não é redonda</h3>
  <p class="reveal">Na variante cam, existe um <strong>excesso de osso na junção entre a cabeça e o colo do fêmur</strong>, que faz a bola perder a esfericidade. Quando o quadril dobra e roda para dentro, essa saliência entra no encaixe onde não cabe e <strong>empurra a cartilagem para dentro</strong>, descolando-a do osso. É a variante mais associada a lesão de cartilagem e a evolução para artrose, e é bem mais frequente em homens jovens e atletas. O parâmetro que os radiologistas usam para descrevê-la é o ângulo alfa, considerado alterado acima de aproximadamente 55 a 60 graus.</p>

  <h3 class="reveal">Tipo pincer: o encaixe fundo demais</h3>
  <p class="reveal">Na variante pincer, o problema é do lado da bacia: o encaixe cobre a cabeça do fêmur <strong>mais do que deveria</strong>, ou está orientado de forma que a borda esbarra no colo do fêmur nos extremos do movimento. O labrum, que fica exatamente na borda, é esmagado entre os dois ossos. É mais comum em mulheres de meia-idade ativas e costuma lesar mais o labrum do que a cartilagem.</p>

  <h3 class="reveal">Misto</h3>
  <p class="reveal">É a apresentação mais comum na prática: as duas alterações coexistem no mesmo quadril, e o tratamento cirúrgico, quando indicado, precisa endereçar as duas.</p>

  <div class="callout alert reveal">
    <h3>O ponto que quase todo site esquece</h3>
    <p>Ter o formato <strong>não é ter a doença</strong>. Revisões que fizeram exames de imagem em voluntários sem qualquer sintoma encontraram morfologia do tipo cam em torno de <strong>37 em cada 100 pessoas</strong>, chegando a mais da metade entre atletas, e sinais de sobrecobertura acetabular em uma proporção ainda maior. Existe muito mais gente com o formato do que gente com o problema. Por isso o consenso internacional publicado em 2016 definiu que o diagnóstico de <strong>síndrome</strong> do impacto femoroacetabular exige três coisas simultaneamente: sintomas compatíveis, sinais no exame físico e achados na imagem. Só imagem não basta, e operar uma imagem é a forma mais rápida de transformar uma pessoa saudável em um paciente.</p>
  </div>

  <h2 id="labrum" class="reveal">A lesão do labrum, e por que ela aparece em quem não tem dor</h2>

  <p class="reveal">O labrum é um anel de fibrocartilagem que contorna a borda do encaixe. Ele tem duas funções: <strong>aprofundar</strong> a cavidade, aumentando a estabilidade, e <strong>vedar</strong> a articulação, mantendo dentro dela uma fina camada de líquido sob pressão que distribui a carga e lubrifica a cartilagem. Essa segunda função, a de vedação, é a razão pela qual hoje se prefere reparar o labrum em vez de simplesmente remover a parte lesada, como se fazia nas primeiras décadas da cirurgia.</p>

  <p class="reveal">Agora o número que muda a conversa: em um estudo que fez ressonância de alto campo em <strong>voluntários assintomáticos</strong>, sem dor nenhuma no quadril, encontrou-se lesão de labrum em cerca de <strong>69 em cada 100 pessoas</strong>, e alguma alteração em quase três de cada quatro. Revisões sistemáticas encontram números na mesma faixa, em torno de 68 em cada 100.</p>

  <div class="stat-row reveal">
    <div class="stat"><b>~37 em 100</b><span>pessoas sem sintoma têm morfologia do tipo cam</span></div>
    <div class="stat"><b>~69 em 100</b><span>pessoas sem dor têm lesão de labrum na ressonância</span></div>
    <div class="stat"><b>3 critérios</b><span>sintoma, exame físico e imagem: o diagnóstico exige os três</span></div>
  </div>

  <p class="reveal">A conclusão prática é dura, mas é a mais honesta que existe sobre este tema: <strong>“lesão do labrum” escrito num laudo de ressonância não é, sozinho, indicação de cirurgia.</strong> É um achado comum na população geral. O que indica cirurgia é uma pessoa com dor característica, com exame físico compatível, que não melhorou com tratamento bem conduzido, e cuja imagem explica os sintomas.</p>

  <h2 id="sintomas" class="reveal">Como é a dor de quem tem impacto no quadril</h2>

  <p class="reveal">O quadro típico é de uma pessoa entre 20 e 45 anos, ativa, muitas vezes com passado de esporte na adolescência, que descreve:</p>
  <ul class="reveal">
    <li><strong>Dor na virilha</strong>, profunda, que a pessoa mostra com a mão em C em volta do quadril. Explicamos esse gesto em detalhe na página sobre <a href="dor-na-virilha.html">dor na virilha</a>.</li>
    <li><strong>Dor ao ficar muito tempo sentado</strong>, principalmente em cadeira baixa, em avião ou no carro. É um dos sintomas mais característicos e um dos que mais atrapalham a vida de quem trabalha sentado.</li>
    <li>Dor ao <strong>agachar</strong>, ao entrar e sair do carro, ao calçar o tênis e ao acelerar na corrida.</li>
    <li><strong>Estalos, travamentos ou uma sensação de falseio</strong>, que costumam indicar que o labrum está mecanicamente instável.</li>
    <li>Perda de amplitude, principalmente de <strong>rotação para dentro</strong>, muitas vezes percebida como “eu nunca consegui sentar de pernas cruzadas”.</li>
    <li>Evolução <strong>lenta e em degraus</strong>: melhora quando reduz a atividade, volta quando retoma, e cada crise dura um pouco mais que a anterior.</li>
  </ul>

  <h2 id="diagnostico" class="reveal">Como o diagnóstico é feito</h2>

  <p class="reveal">A ordem correta é: <strong>história, exame físico, radiografia e só então ressonância.</strong> Inverter essa ordem é a causa mais comum de cirurgia mal indicada nesta área.</p>

  <p class="reveal">No exame físico, o teste mais usado é o de impacto anterior, em que o examinador dobra o quadril, leva a perna para dentro e roda para dentro, procurando reproduzir a dor da virilha. É um teste com sensibilidade alta e <strong>especificidade baixa</strong>: quando é negativo, ajuda bastante a afastar problema intra-articular; quando é positivo, apenas indica que existe algo dentro da articulação, sem dizer o quê. A avaliação da rotação interna, comparando os dois lados, continua sendo o dado isolado mais informativo.</p>

  <p class="reveal">Na imagem, a radiografia da bacia de frente e uma incidência de perfil adequada mostram o formato do osso, o grau de cobertura do encaixe e, sobretudo, <strong>se já existe artrose</strong>. Esse último ponto é decisivo, porque muda completamente a indicação. A ressonância, preferencialmente com contraste intra-articular ou em aparelho de alto campo, avalia o labrum e a cartilagem e serve para planejar a cirurgia, não para indicá-la.</p>

  <h2 id="quem" class="reveal">Quem tem indicação de artroscopia</h2>

  <p class="reveal">Reunindo o que os consensos e os ensaios clínicos mostram, o candidato com melhor perfil para a cirurgia costuma preencher, ao mesmo tempo, as seguintes condições:</p>
  <ul class="reveal">
    <li>Tem <strong>sintomas compatíveis</strong> com impacto femoroacetabular, e não apenas um achado de imagem.</li>
    <li>Tem <strong>exame físico compatível</strong>, com dor reproduzida no teste de impacto e perda de rotação interna.</li>
    <li>Tem <strong>imagem que explica</strong> os sintomas: alteração de formato do tipo cam, pincer ou misto, com lesão de labrum correspondente.</li>
    <li><strong>Não tem artrose</strong>, ou tem apenas alterações mínimas, com espaço articular preservado na radiografia.</li>
    <li>É, em geral, <strong>mais jovem</strong>. O resultado cai de forma consistente com o avanço da idade, e os melhores resultados estão abaixo dos 40 anos.</li>
    <li>Já fez um período adequado de <strong>tratamento sem cirurgia</strong>, com fisioterapia dirigida e ajuste de carga, e não melhorou o suficiente.</li>
  </ul>

  <h2 id="quem-nao" class="reveal">Quem não deve fazer artroscopia</h2>

  <div class="callout alert reveal">
    <h3>Situações em que a artroscopia costuma ser uma má ideia</h3>
    <ul>
      <li><strong>Artrose já instalada.</strong> Este é o filtro mais importante de todos. Quando o espaço articular está reduzido na radiografia, a chance de a artroscopia falhar e de a pessoa acabar operando prótese em poucos anos aumenta muito. Nesse cenário, a cirurgia adiciona um procedimento, um custo e um risco sem mudar o destino.</li>
      <li><strong>Displasia do quadril</strong>, isto é, encaixe raso demais. Aqui o problema é falta de cobertura, não excesso, e a artroscopia isolada pode até piorar a instabilidade. O tratamento cirúrgico adequado é uma osteotomia que reposiciona o encaixe, uma cirurgia diferente e maior.</li>
      <li><strong>Dor que não é articular.</strong> Se a dor é lateral e vem de tendão, ou vem da coluna, a artroscopia não trata nada.</li>
      <li><strong>Achado de imagem sem sintomas correspondentes.</strong> Ver labrum lesado numa ressonância de quem tem dor de outra origem e operar por isso é o erro clássico desta área.</li>
      <li>Idade mais avançada com cartilagem já comprometida, mesmo sem artrose evidente.</li>
    </ul>
  </div>

  <h2 id="evidencia" class="reveal">O que dizem os ensaios clínicos</h2>

  <p class="reveal">Esta é uma área em que, felizmente, existem ensaios clínicos randomizados de boa qualidade, e eles são recentes. O principal é o <strong>UK FASHIoN</strong>, publicado no <em>The Lancet</em> em 2018.</p>

  <p class="reveal">Foram <strong>348 pacientes</strong> com síndrome do impacto femoroacetabular, em 23 hospitais do Reino Unido, sorteados para artroscopia ou para um programa estruturado de fisioterapia personalizada. O desfecho principal foi a pontuação iHOT-33, um questionário de qualidade de vida específico para quadril que vai de 0 a 100, em que mais é melhor. Aos 12 meses:</p>

  <div class="stat-row reveal">
    <div class="stat"><b>58,8</b><span>pontos no grupo da artroscopia</span></div>
    <div class="stat"><b>49,7</b><span>pontos no grupo da fisioterapia</span></div>
    <div class="stat"><b>6,8 pontos</b><span>diferença ajustada a favor da cirurgia (IC 95%: 1,7 a 11,9)</span></div>
  </div>

  <p class="reveal">Três leituras precisam ser feitas juntas, e é onde a maior parte das divulgações erra.</p>

  <p class="reveal"><strong>Primeira:</strong> a cirurgia ganhou. A diferença foi estatisticamente significativa e a favor da artroscopia. Isso é real e não deve ser minimizado.</p>

  <p class="reveal"><strong>Segunda:</strong> <em>os dois grupos melhoraram muito</em>. Ambos partiram de pontuações em torno de 35 a 40 e subiram substancialmente. A fisioterapia bem feita não foi um placebo: foi um tratamento eficaz que produziu ganho grande. A cirurgia foi melhor que um tratamento que já funcionava, e não melhor que não fazer nada.</p>

  <p class="reveal"><strong>Terceira:</strong> a diferença de <strong>6,8 pontos</strong> é modesta em termos absolutos, e o intervalo de confiança começa em 1,7, um valor que a maioria das pessoas não perceberia no dia a dia. Um segundo ensaio randomizado, feito na Austrália e publicado no <em>BMJ</em> em 2019, comparando artroscopia com fisioterapia em 222 pacientes, apontou na mesma direção, com uma diferença um pouco maior numa escala diferente, mas também com intervalo de confiança largo.</p>

  <p class="reveal">O grupo da artroscopia também teve <strong>mais eventos adversos sérios</strong> do que o da fisioterapia, o que é esperado quando se compara uma cirurgia com um tratamento não invasivo, e precisa entrar na balança da decisão.</p>

  <h2 id="fisioterapia" class="reveal">Artroscopia ou fisioterapia? Lendo os números com honestidade</h2>

  <p class="reveal">Se você juntar tudo, a conclusão que a evidência sustenta hoje é esta, e ela é menos empolgante do que a de quase todo material comercial sobre o assunto:</p>

  <div class="callout info reveal">
    <h3>A leitura honesta</h3>
    <p>Para a pessoa certa, com diagnóstico bem feito, sem artrose e que já tentou tratamento conservador adequado, a artroscopia <strong>oferece uma vantagem real, porém moderada</strong>, sobre um programa de fisioterapia bem conduzido. Para quem não preenche esses critérios, a vantagem desaparece e o risco permanece. E a fisioterapia bem feita, com carga progressiva e orientação, não é o prêmio de consolação: é um tratamento com resultado grande, que resolve o caso de uma parte importante das pessoas sem que elas jamais precisem operar.</p>
  </div>

  <p class="reveal">Isso conversa com uma escolha que vale a pena fazer conscientemente: começar pelo tratamento conservador raramente fecha portas. A artroscopia continua disponível depois de três, seis ou doze meses de fisioterapia, e o intervalo funciona como um teste diagnóstico a mais. O caminho inverso, operar primeiro, não tem volta.</p>

  <h2 id="cirurgia" class="reveal">Como é a cirurgia, passo a passo</h2>

  <ol class="reveal">
    <li><strong>Anestesia.</strong> Em geral raquianestesia com sedação, ou anestesia geral, dependendo do caso e da equipe.</li>
    <li><strong>Posicionamento e tração.</strong> A pessoa é posicionada numa mesa específica e se aplica tração controlada na perna, afastando a bola do encaixe alguns milímetros. Existe um cuidado deliberado em manter o <strong>tempo de tração o mais curto possível</strong>, porque é dele que vem a maior parte das complicações neurológicas transitórias.</li>
    <li><strong>Portais.</strong> Duas a quatro incisões de cerca de um centímetro dão acesso à câmera e aos instrumentos.</li>
    <li><strong>Inspeção do compartimento central.</strong> O cirurgião avalia labrum e cartilagem sob visão direta, o que frequentemente mostra lesões que a ressonância não tinha revelado.</li>
    <li><strong>Tratamento do labrum.</strong> Hoje se prefere <strong>reparar</strong>, reinserindo o labrum na borda do osso com âncoras, em vez de simplesmente remover a parte lesada, justamente para preservar a função de vedação. A remoção fica para labrum sem condições de reparo.</li>
    <li><strong>Correção do formato do osso.</strong> Libera-se a tração e trabalha-se o compartimento periférico: remove-se o excesso de osso do colo do fêmur na variante cam, e ajusta-se a borda do acetábulo na variante pincer. Esta é a etapa que resolve a causa: sem corrigir o formato, o labrum reparado volta a ser machucado.</li>
    <li><strong>Fechamento da cápsula</strong> e das incisões.</li>
  </ol>

  <p class="reveal">A cirurgia costuma durar entre uma e duas horas e, na maior parte dos serviços, é feita em regime de internação curta, com alta no mesmo dia ou no dia seguinte.</p>

  <h2 id="recuperacao" class="reveal">A recuperação, semana a semana</h2>

  <p class="reveal">Os protocolos variam bastante entre serviços e dependem do que foi feito dentro da articulação. O que segue é a linha do tempo mais comum, e ela precisa ser individualizada pela equipe que operou.</p>

  <div class="tablewrap reveal">
    <table>
      <caption>Linha do tempo habitual após artroscopia de quadril. Prazos aproximados: quem define o seu é a equipe cirúrgica.</caption>
      <thead><tr><th scope="col">Período</th><th scope="col">O que costuma acontecer</th></tr></thead>
      <tbody>
        <tr><th scope="row">Dias 1 a 14</th><td>Muletas com apoio parcial do peso, controle de dor e inchaço, fisioterapia começando cedo com movimento passivo e ativação muscular leve. Evitar os extremos de flexão e rotação.</td></tr>
        <tr><th scope="row">Semanas 2 a 6</th><td>Retirada progressiva das muletas, ganho de amplitude, bicicleta sem carga, exercícios isométricos. Marcha normalizando.</td></tr>
        <tr><th scope="row">Semanas 6 a 12</th><td>Fortalecimento progressivo de glúteos e core, exercícios em cadeia fechada, caminhada livre, retorno gradual a atividades do dia a dia e ao trabalho fisicamente exigente.</td></tr>
        <tr><th scope="row">Meses 3 a 6</th><td>Corrida em progressão, trabalho de potência e de mudança de direção, quando a força e o controle permitem.</td></tr>
        <tr><th scope="row">Meses 4 a 9</th><td>Retorno ao esporte competitivo, sempre por critérios de função e não apenas por tempo decorrido.</td></tr>
      </tbody>
    </table>
  </div>

  <p class="reveal">Duas observações que costumam surpreender. A primeira é que a melhora <strong>continua acontecendo por bastante tempo</strong>: é comum ainda haver ganho entre o sexto mês e o primeiro ano, o que significa que julgar o resultado aos três meses é cedo demais. A segunda é que o resultado depende muito da qualidade da reabilitação. Uma artroscopia bem feita com reabilitação malfeita entrega bem menos do que a cirurgia poderia entregar.</p>

  <h2 id="riscos" class="reveal">Riscos e complicações</h2>

  <p class="reveal">A artroscopia de quadril é considerada um procedimento de risco relativamente baixo, com taxas de complicação relatadas na literatura em geral <strong>abaixo de 5 em 100</strong>, sendo a maioria delas transitória. Ainda assim, risco baixo não é risco zero, e a lista precisa ser conhecida antes, não depois.</p>

  <ul class="reveal">
    <li><strong>Alterações de sensibilidade por tração</strong>, o problema mais comum. Dormência na região da virilha, no períneo ou na face lateral da coxa, causada pela pressão do apoio e pela tração. Quase sempre transitória, resolvendo em semanas a poucos meses.</li>
    <li><strong>Dor persistente</strong>, quando os sintomas não vinham de onde se pensava.</li>
    <li><strong>Ossificação heterotópica</strong>, formação de osso em local indevido nos tecidos moles.</li>
    <li><strong>Aderências</strong> dentro da articulação, que limitam movimento e podem exigir nova abordagem.</li>
    <li><strong>Lesão iatrogênica</strong> da cartilagem ou do próprio labrum durante a entrada dos instrumentos.</li>
    <li><strong>Fratura do colo do fêmur</strong>, rara e associada à remoção excessiva de osso, e <strong>instabilidade</strong> por ressecção excessiva do labrum ou por não fechar a cápsula.</li>
    <li><strong>Infecção</strong> e <strong>trombose</strong>, incomuns, mas possíveis em qualquer cirurgia.</li>
    <li><strong>Necessidade de nova cirurgia</strong>, seja uma nova artroscopia por correção óssea insuficiente, seja a conversão para prótese.</li>
  </ul>

  <h2 id="artrose-futuro" class="reveal">A artroscopia previne a artrose no futuro?</h2>

  <p class="reveal">Esta é a pergunta que mais gente faz e é a que tem a resposta menos confortável: <strong>ainda não se sabe</strong>.</p>

  <p class="reveal">O raciocínio biológico é atraente e provavelmente correto na direção geral: se o formato do tipo cam está associado ao desenvolvimento de artrose do quadril, corrigir o formato cedo deveria reduzir esse risco. É uma hipótese razoável e é o principal argumento de quem defende operar mais cedo.</p>

  <p class="reveal">O problema é que <strong>não existe ensaio clínico que tenha demonstrado isso</strong>. Provar prevenção de artrose exigiria acompanhar milhares de pessoas por 15 ou 20 anos, e esse estudo não foi feito. Os ensaios que temos mediram sintomas e qualidade de vida em 8 a 12 meses, não a articulação em duas décadas. Somando isso ao fato de que a maioria das pessoas com o formato nunca desenvolve sintoma nenhum, a conclusão prudente é que a artroscopia deve ser indicada <strong>para tratar sintomas que existem hoje</strong>, e não vendida como seguro contra uma artrose que talvez nunca viesse.</p>

  <h2 id="vs-protese" class="reveal">Artroscopia e prótese não são a mesma conversa</h2>

  <p class="reveal">É comum a confusão, então vale separar com clareza. São cirurgias diferentes, para momentos diferentes da vida da articulação.</p>

  <div class="tablewrap reveal">
    <table>
      <caption>As duas cirurgias resolvem problemas distintos e não competem entre si.</caption>
      <thead><tr><th scope="col"></th><th scope="col">Artroscopia</th><th scope="col">Prótese (artroplastia)</th></tr></thead>
      <tbody>
        <tr><th scope="row">Para quem</th><td>Quadril jovem, sem artrose, com impacto e lesão de labrum</td><td>Quadril com artrose avançada e dor que limita a vida</td></tr>
        <tr><th scope="row">O que faz</th><td>Conserta o que existe: repara o labrum e corrige o formato do osso</td><td>Substitui a superfície gasta por componentes artificiais</td></tr>
        <tr><th scope="row">Objetivo</th><td>Devolver função e permitir esporte</td><td>Tirar a dor e devolver a caminhada</td></tr>
        <tr><th scope="row">Alívio da dor</th><td>Bom, porém moderado e menos previsível</td><td>Muito alto e bastante previsível</td></tr>
        <tr><th scope="row">Idade típica</th><td>20 a 45 anos</td><td>Acima de 55 a 60 anos, com exceções</td></tr>
      </tbody>
    </table>
  </div>

  <p class="reveal">Se você quer entender a outra cirurgia em detalhe, escrevemos uma página inteira sobre <a href="protese-de-quadril.html">a prótese de quadril</a>, outra sobre <a href="recuperacao-protese-de-quadril.html">a recuperação depois dela</a> e uma sobre <a href="protese-de-quadril-vale-a-pena.html">o que muda cinco anos depois</a>.</p>

  <h2 id="custo" class="reveal">SUS, plano de saúde e custo</h2>

  <p class="reveal">A artroscopia de quadril é realizada no <strong>SUS</strong>, mas em bem menos serviços do que a prótese, porque exige mesa de tração, instrumental específico e equipe com treinamento na técnica. Isso concentra o procedimento em hospitais de referência e costuma significar fila.</p>

  <p class="reveal">Nos <strong>planos de saúde</strong>, havendo indicação médica adequadamente justificada, a cobertura do procedimento, do material e da internação é obrigatória. Na prática, é comum a operadora solicitar documentação detalhada e às vezes recorrer à junta médica, principalmente quando há pedido de âncoras para reparo do labrum. Um relatório médico bem fundamentado, com exame físico descrito, tempo de tratamento conservador e imagens, resolve a maior parte das negativas.</p>

  <p class="reveal">No <strong>particular</strong>, o valor varia muito conforme cidade, hospital, equipe e, principalmente, quantidade de material implantado. Como em qualquer cirurgia, o valor do procedimento isolado não representa o custo total: entram honorários da equipe, anestesia, taxas hospitalares, materiais e a reabilitação depois. Reunimos a lógica desses custos, com dados de estudos brasileiros, na página sobre <a href="quanto-custa-protese-de-quadril.html">quanto custa a cirurgia de quadril</a>.</p>

  <h2 id="alerta" class="reveal">Sinais que pedem avaliação</h2>

  <div class="callout alert reveal">
    <h3>Procure um médico sem esperar se você tiver:</h3>
    <ul>
      <li>Dor no quadril com <strong>febre</strong>, calafrio ou mal-estar importante.</li>
      <li><strong>Incapacidade de apoiar o peso</strong> na perna, ou piora abrupta da dor após queda ou torção.</li>
      <li>Travamento verdadeiro da articulação, com o quadril <strong>preso</strong> numa posição.</li>
      <li>Dor que piora progressivamente e <strong>acorda você à noite</strong>, sem relação com atividade.</li>
      <li>Uso prolongado de corticoide, histórico de câncer ou perda de peso sem explicação, junto com dor na virilha.</li>
      <li>Depois de uma artroscopia: febre, vermelhidão e secreção nas incisões, dor em panturrilha com inchaço, ou falta de ar.</li>
    </ul>
  </div>

</div></section>'''

BODY = BODY.replace('FIG_ANAT', FIG_ANAT)

TAKE = '''<section><div class="wrap read prose">
  <div class="takeaways reveal"><h2>Em resumo</h2><ul>
    <li>Artroscopia de quadril é cirurgia por incisões de cerca de um centímetro para tratar problemas de dentro da articulação. Ela é para <strong>quadril jovem e sem artrose</strong>, e esse filtro é o mais importante de todos.</li>
    <li>O que se trata quase sempre é o impacto femoroacetabular: uma alteração de <strong>formato</strong> entre a bola e o encaixe que faz os dois baterem e machucarem o labrum e a cartilagem.</li>
    <li>Ter o formato não é ter a doença. Morfologia do tipo cam aparece em cerca de 37 em 100 pessoas sem sintoma, e lesão de labrum em cerca de 69 em 100 pessoas sem dor. O diagnóstico exige sintoma, exame físico e imagem juntos.</li>
    <li>No maior ensaio clínico randomizado, com 348 pacientes, a artroscopia superou a fisioterapia em 6,8 pontos numa escala de 0 a 100 aos 12 meses. A vantagem é real, mas modesta, e <strong>os dois grupos melhoraram muito</strong>.</li>
    <li>Fisioterapia bem conduzida não é prêmio de consolação: resolve o caso de uma parte importante das pessoas. E começar por ela raramente fecha portas, enquanto operar primeiro não tem volta.</li>
    <li>Complicações ficam em geral abaixo de 5 em 100 e são majoritariamente transitórias, com destaque para alterações de sensibilidade causadas pela tração.</li>
    <li>Não há prova de que a artroscopia previna artrose no futuro. Ela deve ser indicada para tratar sintomas de hoje, não vendida como seguro contra um problema que talvez nunca viesse.</li>
  </ul></div>
  <div class="refs reveal" style="margin-top:40px;"><details><summary>Referências</summary><ol>
    <li>Griffin DR, Dickenson EJ, Wall PDH, et al. Hip arthroscopy versus best conservative care for the treatment of femoroacetabular impingement syndrome (UK FASHIoN): a multicentre randomised controlled trial. The Lancet. 2018;391(10136):2225-35.</li>
    <li>Palmer AJR, Ayyar Gupta V, Fernquest S, et al. Arthroscopic hip surgery compared with physiotherapy and activity modification for the treatment of symptomatic femoroacetabular impingement: multicentre randomised controlled trial. BMJ. 2019;364:l185.</li>
    <li>Griffin DR, Dickenson EJ, O'Donnell J, et al. The Warwick Agreement on femoroacetabular impingement syndrome (FAI syndrome): an international consensus statement. British Journal of Sports Medicine. 2016;50(19):1169-76.</li>
    <li>Frank JM, Harris JD, Erickson BJ, et al. Prevalence of femoroacetabular impingement imaging findings in asymptomatic volunteers: a systematic review. Arthroscopy. 2015;31(6):1199-204.</li>
    <li>Register B, Pennock AT, Ho CP, Strickland CD, Lawand A, Philippon MJ. Prevalence of abnormal hip findings in asymptomatic participants: a prospective, blinded study. American Journal of Sports Medicine. 2012;40(12):2720-4.</li>
    <li>Ganz R, Parvizi J, Beck M, Leunig M, Nötzli H, Siebenrock KA. Femoroacetabular impingement: a cause for osteoarthritis of the hip. Clinical Orthopaedics and Related Research. 2003;(417):112-20.</li>
    <li>Agricola R, Heijboer MP, Bierma-Zeinstra SMA, Verhaar JAN, Weinans H, Waarsing JH. Cam impingement causes osteoarthritis of the hip: a nationwide prospective cohort study (CHECK). Annals of the Rheumatic Diseases. 2013;72(6):918-23.</li>
    <li>Harris JD, McCormick FM, Abrams GD, et al. Complications and reoperations during and after hip arthroscopy: a systematic review of 92 studies and more than 6,000 patients. Arthroscopy. 2013;29(3):589-95.</li>
    <li>Kemp JL, MacDonald D, Collins NJ, Hatton AL, Crossley KM. Hip arthroscopy in the setting of hip osteoarthritis: systematic review of outcomes and progression to hip arthroplasty. Clinical Orthopaedics and Related Research. 2015;473(3):1055-73.</li>
    <li>Nwachukwu BU, Rebolledo BJ, McCormick F, Rosas S, Harris JD, Kelly BT. Arthroscopic versus open treatment of femoroacetabular impingement: a systematic review of medium- to long-term outcomes. American Journal of Sports Medicine. 2016;44(4):1062-8.</li>
    <li>Bedi A, Kelly BT. Femoroacetabular impingement. Journal of Bone and Joint Surgery (Am). 2013;95(1):82-92.</li>
    <li>Reiman MP, Goode AP, Cook CE, Hölmich P, Thorborg K. Diagnostic accuracy of clinical tests for the diagnosis of hip femoroacetabular impingement/labral tear: a systematic review with meta-analysis. British Journal of Sports Medicine. 2015;49(12):811.</li>
  </ol></details></div>
</div></section>'''

FAQ = [
    ("O que é artroscopia de quadril?",
     "É uma cirurgia feita por duas a quatro incisões de cerca de um centímetro, por onde entram uma câmera e instrumentos finos, para tratar problemas de dentro da articulação sem abrir o quadril. Como a bola do fêmur fica muito encaixada na bacia, é preciso aplicar tração controlada na perna para afastar os ossos alguns milímetros e criar espaço para a câmera. Na grande maioria dos casos, o que se trata é o impacto femoroacetabular com lesão do labrum: repara-se o labrum e corrige-se o excesso de osso que causa o choque."),
    ("Toda lesão de labrum precisa de cirurgia?",
     "Não, e essa é a informação mais importante desta página. Estudos que fizeram ressonância em voluntários sem dor nenhuma no quadril encontraram lesão de labrum em cerca de 69 em cada 100 pessoas. Ou seja, é um achado muito comum na população geral e não prova, sozinho, que seja a causa da sua dor. A cirurgia é indicada quando existem, ao mesmo tempo, sintomas compatíveis, exame físico compatível, imagem que explica os sintomas e falha de um período adequado de tratamento sem cirurgia."),
    ("Artroscopia de quadril funciona mesmo? O que dizem os estudos?",
     "Funciona, com vantagem moderada. No maior ensaio clínico randomizado, o UK FASHIoN, publicado no The Lancet em 2018 com 348 pacientes, o grupo operado atingiu 58,8 pontos numa escala de qualidade de vida de 0 a 100 aos 12 meses, contra 49,7 pontos do grupo tratado com fisioterapia personalizada, uma diferença ajustada de 6,8 pontos com intervalo de confiança de 1,7 a 11,9. A cirurgia ganhou, mas é fundamental notar que os dois grupos melhoraram muito em relação ao ponto de partida. Um segundo ensaio australiano apontou na mesma direção. A leitura correta é que a artroscopia foi melhor que um tratamento que já funcionava bem."),
    ("Quanto tempo demora a recuperação da artroscopia de quadril?",
     "Os prazos variam com o que foi feito dentro da articulação, mas a linha do tempo mais comum é: muletas com apoio parcial por cerca de duas semanas, marcha normalizando entre a segunda e a sexta semana, fortalecimento progressivo até o terceiro mês, corrida em progressão entre o terceiro e o sexto mês e retorno ao esporte competitivo entre o quarto e o nono mês. Vale saber que a melhora continua acontecendo por bastante tempo: é comum ainda haver ganho entre o sexto mês e o primeiro ano, então julgar o resultado aos três meses é cedo demais."),
    ("Quais são os riscos da artroscopia de quadril?",
     "As taxas de complicação relatadas na literatura ficam em geral abaixo de 5 em 100, e a maioria dos problemas é transitória. O mais comum são alterações de sensibilidade causadas pela tração e pelo apoio durante a cirurgia, com dormência na virilha, no períneo ou na lateral da coxa, que costuma resolver em semanas a poucos meses. Também podem ocorrer dor persistente, ossificação heterotópica, aderências, lesão da cartilagem durante a entrada dos instrumentos e, mais raramente, fratura do colo do fêmur por remoção excessiva de osso, instabilidade, infecção e trombose. Parte dos pacientes precisa de nova cirurgia."),
    ("Quem tem artrose pode fazer artroscopia de quadril?",
     "Em geral não, e esse é o principal filtro de indicação. Quando já existe redução do espaço articular na radiografia, a chance de a artroscopia falhar aumenta muito e é alta a probabilidade de a pessoa acabar operando prótese em poucos anos. Nesse cenário, a artroscopia adiciona um procedimento, um custo e um risco sem mudar o destino da articulação. Para quadril com artrose avançada e dor que limita a vida, a cirurgia que resolve é a artroplastia, isto é, a prótese."),
    ("Artroscopia de quadril previne artrose no futuro?",
     "Não se sabe. O raciocínio biológico é atraente, porque a morfologia do tipo cam está associada ao desenvolvimento de artrose do quadril e corrigir o formato deveria, em tese, reduzir esse risco. Mas não existe ensaio clínico que tenha demonstrado prevenção, porque isso exigiria acompanhar milhares de pessoas por 15 ou 20 anos. Os estudos disponíveis mediram sintomas e qualidade de vida em 8 a 12 meses. Some-se a isso o fato de que a maioria das pessoas com o formato nunca desenvolve sintoma nenhum, e a conclusão prudente é indicar a cirurgia para tratar sintomas atuais, e não como seguro contra o futuro."),
    ("Artroscopia de quadril é coberta pelo plano de saúde e feita pelo SUS?",
     "Sim para os dois. Havendo indicação médica adequadamente justificada, a cobertura pelo plano de saúde do procedimento, do material e da internação é obrigatória, embora seja comum a operadora pedir documentação detalhada e às vezes recorrer à junta médica, principalmente quando há solicitação de âncoras para reparo do labrum. Um relatório com exame físico descrito, tempo de tratamento conservador e imagens resolve a maior parte das negativas. No SUS o procedimento existe, mas está concentrado em hospitais de referência, porque exige mesa de tração, instrumental específico e equipe treinada, o que costuma significar fila."),
    ("Qual a diferença entre artroscopia e prótese de quadril?",
     "São cirurgias para momentos diferentes da vida da articulação. A artroscopia conserta o que existe: repara o labrum e corrige o formato do osso, e é indicada para quadril jovem sem artrose, tipicamente entre 20 e 45 anos, com o objetivo de devolver função e permitir esporte. A prótese substitui a superfície gasta por componentes artificiais e é indicada quando já existe artrose avançada com dor que limita a vida, tipicamente acima dos 55 a 60 anos, com o objetivo de tirar a dor e devolver a caminhada. O alívio da dor da prótese é maior e mais previsível; o da artroscopia é bom, porém mais moderado."),
]

page(
    slug='artroscopia-de-quadril.html',
    title='Artroscopia de Quadril: Quando Vale, Riscos e Recuperação',
    description='Artroscopia de quadril: o que é o impacto femoroacetabular, quando a cirurgia é indicada, o que dizem os ensaios clínicos, riscos e recuperação.',
    og_title='Artroscopia de quadril: quando vale a pena, de verdade',
    og_desc='Impacto femoroacetabular e lesão do labrum, com os números dos ensaios clínicos e sem promessa fácil.',
    h1='Artroscopia de quadril: quando ela resolve, e quando ela não deveria ser feita',
    lead='É a cirurgia que trata o <strong>impacto femoroacetabular</strong> e a lesão do labrum por incisões de um centímetro. Ela funciona, mas a vantagem sobre uma boa fisioterapia é menor do que se costuma dizer, e o filtro que separa um bom resultado de uma frustração é sempre o mesmo: <strong>quadril sem artrose</strong>.',
    pill='Cirurgia do quadril jovem',
    crumb_label='Artroscopia de quadril',
    body=BODY + '\n\n' + TAKE,
    toc=TOC,
    faq=FAQ,
    faq_title='Dúvidas sobre artroscopia de quadril',
    revised='3 de setembro de 2026',
    published='2026-09-03',
    modified='2026-09-03',
    minutes=16,
    about={"@type": "MedicalCondition", "name": "Impacto femoroacetabular",
           "alternateName": ["Síndrome do impacto femoroacetabular", "Lesão do labrum do quadril",
                             "Impacto cam", "Impacto pincer", "Artroscopia de quadril"]},
    related=[
        ('dor-na-virilha.html', 'Dor na virilha: o principal sintoma'),
        ('artrose-de-quadril.html', 'Coxartrose: quando o desgaste já começou'),
        ('protese-de-quadril.html', 'Prótese de quadril: a outra cirurgia'),
        ('quanto-custa-protese-de-quadril.html', 'Quanto custa a cirurgia de quadril'),
        ('dor-no-quadril.html', 'Dor no quadril: todas as causas'),
        ('recuperacao-protese-de-quadril.html', 'Recuperação depois de operar'),
    ],
)
