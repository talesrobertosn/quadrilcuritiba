# -*- coding: utf-8 -*-
"""Expande a página de custos com os termos de cauda longa vistos no Search Console."""
import os, re, sys
HERE = os.path.dirname(os.path.abspath(__file__))
SITE = os.path.dirname(HERE)
sys.path.insert(0, HERE)
from faqsync import sync_faq  # noqa: E402

P = os.path.join(SITE, 'quanto-custa-protese-de-quadril.html')
h = open(P, encoding='utf-8').read()

# ---------------------------------------------------------------- 1. título e descrição
h = h.replace('<title>Quanto Custa uma Prótese de Quadril? SUS, Convênio e Particular</title>',
              '<title>Quanto Custa uma Prótese de Quadril? Valores Reais no Brasil</title>')
h = h.replace('content="Quanto custa uma prótese de quadril: gratuita pelo SUS, coberta pelo plano e de cerca de R$ 40 mil a mais de R$ 100 mil no particular.">',
              'content="Quanto custa uma prótese de quadril: gratuita pelo SUS, coberta pelo plano e de R$ 40 mil a mais de R$ 100 mil no particular. Nacional, importada e titânio.">')

# ---------------------------------------------------------------- 2. índice
old_toc = '    <li><a href="#fixacao">Prótese cimentada custa diferente?</a></li>'
new_toc = '''    <li><a href="#fixacao">Prótese cimentada custa diferente?</a></li>
    <li><a href="#nacional-importada">Prótese nacional ou importada</a></li>
    <li><a href="#materiais">Titânio, cerâmica e polietileno</a></li>
    <li><a href="#parcial">Prótese só da cabeça do fêmur</a></li>
    <li><a href="#marca">Posso escolher a marca?</a></li>'''
assert old_toc in h
h = h.replace(old_toc, new_toc)

# ---------------------------------------------------------------- 3. seções novas
NOVAS = '''
  <h2 id="nacional-importada" class="reveal">Prótese nacional ou importada: o que muda de verdade</h2>
  <p class="reveal">Esta é, de longe, a dúvida mais buscada sobre o assunto, e a resposta honesta desagrada os dois lados. <strong>Sim, existe diferença de preço.</strong> Implantes importados costumam custar mais que os fabricados no Brasil, e essa diferença aparece direto no orçamento particular e nas discussões com operadoras de plano. <strong>Não, “importada” não é sinônimo de melhor.</strong></p>

  <p class="reveal">Toda prótese comercializada no Brasil, seja fabricada aqui ou lá fora, precisa de <strong>registro na Anvisa</strong>, o que significa que passou por exigências de segurança e qualidade. O que separa um implante bom de um implante ruim não é o país de origem: é o <strong>histórico daquele modelo específico</strong> em registros de artroplastia, que são bancos de dados nacionais que acompanham centenas de milhares de próteses ao longo de décadas e mostram quantas precisaram ser trocadas e em quanto tempo. Existem modelos importados com histórico excelente, modelos importados que foram retirados do mercado por mau desempenho e modelos nacionais com resultados consistentes.</p>

  <div class="callout info reveal">
    <h3>O que realmente decide o resultado da sua cirurgia</h3>
    <p>Comparando com o peso que o paciente costuma dar à marca do implante, três outros fatores pesam mais: a <strong>indicação correta</strong>, ou seja, operar quem realmente precisa operar; o <strong>posicionamento dos componentes</strong>, que depende da técnica cirúrgica; e a <strong>reabilitação</strong> depois. Uma prótese cara mal posicionada tem resultado pior do que uma prótese comum bem posicionada. Essa é uma das poucas afirmações realmente pacíficas na literatura de artroplastia.</p>
  </div>

  <p class="reveal">Na prática brasileira, o cenário costuma ser assim:</p>
  <ul class="reveal">
    <li><strong>No SUS</strong>, o repasse é definido por tabela e o hospital compra o que consegue dentro daquele valor, o que na maioria das vezes significa implante nacional ou de custo mais baixo. Não existe escolha do paciente.</li>
    <li><strong>No plano de saúde</strong>, a operadora costuma ter uma lista de fornecedores contratados. Quando o cirurgião pede um implante fora dela, a negociação pode atrasar a cirurgia e às vezes vai para junta médica.</li>
    <li><strong>No particular</strong>, a escolha é livre, e é aí que a diferença de preço aparece com clareza. Vale pedir que o orçamento discrimine o valor do implante separado do resto, porque é a única forma de comparar propostas.</li>
  </ul>

  <h2 id="materiais" class="reveal">Titânio, cerâmica e polietileno: o que o material realmente significa</h2>

  <p class="reveal">Muita gente procura por “prótese de titânio” imaginando que é uma categoria superior. Vale esclarecer: <strong>a esmagadora maioria das próteses modernas já é de titânio</strong>, ou de uma liga de titânio, nas partes que se fixam ao osso. O componente que entra no fêmur e o componente que se apoia na bacia são tipicamente de liga de titânio justamente porque esse metal é leve, resistente e muito bem tolerado pelo osso, que cresce e se integra à sua superfície. Dizer “prótese de titânio” descreve quase todas as próteses, e por isso informa pouco.</p>

  <p class="reveal">O que de fato varia entre um implante e outro, e o que realmente influencia durabilidade e preço, é o <strong>par de atrito</strong>: a dupla de superfícies que desliza uma sobre a outra a cada passo, formada pela cabeça esférica e pelo revestimento interno do componente da bacia.</p>

  <div class="tablewrap reveal">
    <table>
      <caption>Os pares de atrito mais usados hoje. A escolha é técnica e depende sobretudo da idade e do nível de atividade.</caption>
      <thead><tr><th scope="col">Par de atrito</th><th scope="col">Como se comporta</th><th scope="col">Custo relativo</th></tr></thead>
      <tbody>
        <tr><th scope="row">Metal e polietileno</th><td>A combinação clássica, com décadas de uso e resultados bem documentados. Com o polietileno moderno de alta reticulação, o desgaste caiu muito em relação ao antigo.</td><td>Menor</td></tr>
        <tr><th scope="row">Cerâmica e polietileno</th><td>Hoje a escolha mais comum em pacientes mais jovens e ativos. A cabeça de cerâmica é muito lisa e dura, o que reduz ainda mais o desgaste do polietileno.</td><td>Intermediário</td></tr>
        <tr><th scope="row">Cerâmica e cerâmica</th><td>Desgaste extremamente baixo. Em contrapartida, pode produzir um rangido audível em uma minoria dos casos e existe um risco pequeno, porém real, de fratura do componente.</td><td>Maior</td></tr>
        <tr><th scope="row">Metal e metal</th><td>Praticamente abandonado na prótese total convencional, por causa de reações adversas às partículas metálicas liberadas.</td><td>—</td></tr>
      </tbody>
    </table>
  </div>

  <p class="reveal">A leitura prática: para uma pessoa de 80 anos com demanda baixa, o par de atrito mais simples entrega tudo o que é necessário, porque o implante não será solicitado por trinta anos. Para uma pessoa de 55 anos que pretende voltar a caminhar longo e viajar, faz sentido investir num par de atrito com menor desgaste, porque a conta se paga em anos de prótese sem revisão. Essa é uma conversa para ter com o cirurgião, e não uma escolha de catálogo.</p>

  <h2 id="parcial" class="reveal">Prótese só da cabeça do fêmur: a prótese parcial</h2>

  <p class="reveal">Quem procura por “prótese da cabeça do fêmur” geralmente está diante de uma situação bem específica, e quase sempre inesperada: <strong>um idoso que fraturou o colo do fêmur</strong> e vai operar nos próximos dias.</p>

  <p class="reveal">A prótese parcial, tecnicamente chamada de <strong>hemiartroplastia</strong>, substitui apenas o lado do fêmur. A cabeça quebrada é retirada e trocada por uma cabeça artificial montada numa haste que entra no osso, mas <strong>o encaixe da bacia da própria pessoa é mantido</strong>. Por isso ela usa menos componentes, custa menos, e a cirurgia costuma ser mais rápida e menos agressiva, o que importa muito num paciente idoso e frágil.</p>

  <div class="callout info reveal">
    <h3>Por que ela quase nunca é usada em artrose</h3>
    <p>Porque na artrose <strong>as duas superfícies estão gastas</strong>, a do fêmur e a da bacia. Trocar só um lado deixaria uma cabeça artificial nova girando contra uma cartilagem doente, o que continuaria doendo. A prótese parcial faz sentido justamente na fratura, em que a cartilagem da bacia está saudável e só a cabeça do fêmur quebrou.</p>
  </div>

  <p class="reveal">Quando a pessoa que fraturou é mais jovem, ativa, independente e sem demência, a escolha costuma pender para a <strong>prótese total</strong>, mesmo tendo sido uma fratura. Ensaios clínicos que compararam as duas estratégias nessa população encontraram função um pouco melhor com a prótese total, sem uma diferença clara na necessidade de reoperação em dois anos. Já para o idoso com mobilidade reduzida, a parcial continua sendo a escolha mais sensata: menos tempo de cirurgia, menos sangramento e menor risco de luxação. Escrevemos sobre esse cenário inteiro na página de <a href="fratura-de-quadril-no-idoso.html">fratura de quadril no idoso</a>.</p>

  <p class="reveal">Sobre o custo, a lógica é a mesma do resto desta página: por usar menos componentes, o material da prótese parcial é mais barato que o da total. Mas <strong>o material nunca é a maior fatia da conta</strong>. Em uma cirurgia de urgência num paciente idoso, o que pesa é a internação, muitas vezes com passagem por unidade de terapia intensiva, o tempo de permanência e a reabilitação. Não é raro uma prótese parcial custar mais no total do que uma prótese total eletiva em alguém saudável.</p>

  <h2 id="marca" class="reveal">Posso escolher a marca da minha prótese?</h2>

  <p class="reveal">Depende de quem está pagando.</p>

  <p class="reveal">No <strong>SUS</strong>, não. O hospital usa o implante que tem disponível dentro do que a tabela remunera.</p>

  <p class="reveal">No <strong>plano de saúde</strong>, existe uma regra que pouca gente conhece e que vale a pena guardar: quando há mais de uma marca disponível com as mesmas especificações, o médico deve indicar <strong>pelo menos três marcas</strong> de produtos equivalentes, e cabe à operadora escolher entre elas qual vai fornecer. A intenção é dupla: impedir direcionamento comercial por parte do profissional e impedir que a operadora simplesmente negue o material. Se houver justificativa técnica para uma marca específica, ela precisa estar fundamentada no relatório médico, e a divergência é resolvida por junta médica.</p>

  <p class="reveal">No <strong>particular</strong>, a escolha é do cirurgião com o paciente, e o preço entra na conversa abertamente. Aqui vale um alerta prático: desconfie de proposta que apresente um valor fechado sem discriminar o implante. Pedir o orçamento item a item, com o valor do material separado, é o que permite comparar duas propostas de forma justa e é o que revela quando a diferença entre elas está no implante e não no hospital.</p>
'''

anchor = '\n  <h2 id="custo-valor" class="reveal">'
assert anchor in h
h = h.replace(anchor, NOVAS + anchor, 1)

# ---------------------------------------------------------------- 4. FAQ novas
NEW_FAQ = '''    <details class="reveal"><summary>Qual a diferença entre prótese de quadril nacional e importada?</summary><div class="faq-body"><p>A diferença mais concreta é de preço: implantes importados costumam custar mais que os fabricados no Brasil. O que não é verdade é a ideia de que importada significa melhor. Toda prótese vendida no país precisa de registro na Anvisa, e o que separa um bom implante de um ruim não é o país de origem, e sim o histórico daquele modelo específico nos registros de artroplastia, que acompanham centenas de milhares de próteses ao longo de décadas. Existem modelos importados excelentes, modelos importados retirados do mercado por mau desempenho e modelos nacionais com resultados consistentes. Pesam muito mais no resultado a indicação correta, o posicionamento dos componentes e a reabilitação.</p></div></details>
    <details class="reveal"><summary>Prótese de quadril de titânio é melhor?</summary><div class="faq-body"><p>A pergunta parte de um mal-entendido comum: a esmagadora maioria das próteses modernas já é de liga de titânio nas partes que se fixam ao osso, porque o titânio é leve, resistente e o osso se integra bem à sua superfície. Dizer prótese de titânio descreve quase todas as próteses. O que realmente varia entre um implante e outro é o par de atrito, isto é, a dupla de superfícies que desliza a cada passo: metal com polietileno, cerâmica com polietileno ou cerâmica com cerâmica. É essa escolha que influencia desgaste, durabilidade e preço, e ela é técnica, feita conforme a idade e o nível de atividade.</p></div></details>
    <details class="reveal"><summary>Quanto custa uma prótese só da cabeça do fêmur?</summary><div class="faq-body"><p>A prótese parcial, ou hemiartroplastia, substitui apenas o lado do fêmur e mantém o encaixe da bacia da própria pessoa. Por usar menos componentes, o material custa menos que o de uma prótese total. Mas o material nunca é a maior fatia da conta. Como a prótese parcial é usada quase sempre em cirurgia de urgência por fratura em pacientes idosos, o que pesa no custo total é a internação, muitas vezes com passagem por terapia intensiva, o tempo de permanência e a reabilitação. Não é raro uma prótese parcial custar mais no total do que uma prótese total eletiva em alguém saudável.</p></div></details>
    <details class="reveal"><summary>Posso escolher a marca da minha prótese de quadril?</summary><div class="faq-body"><p>Depende de quem paga. No SUS não há escolha: o hospital usa o implante disponível dentro do que a tabela remunera. No plano de saúde vale uma regra que pouca gente conhece: havendo mais de uma marca com as mesmas especificações, o médico deve indicar pelo menos três marcas equivalentes, e cabe à operadora escolher entre elas. Se existir justificativa técnica para uma marca específica, ela precisa estar fundamentada no relatório médico, e a divergência é resolvida por junta médica. No particular a escolha é do cirurgião com o paciente, e vale pedir o orçamento discriminado, com o valor do implante separado do resto.</p></div></details>
'''
m = re.search(r'(<div class="faq">.*?)(\n  </div>)', h, re.S)
assert m
h = h[:m.end(1)] + '\n' + NEW_FAQ.rstrip('\n') + h[m.end(1):]

open(P, 'w', encoding='utf-8').write(h)
sync_faq(P)
print('página de custos expandida')
