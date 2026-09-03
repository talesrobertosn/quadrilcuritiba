# -*- coding: utf-8 -*-
"""Ajustes finos: títulos e descrições para CTR, figuras novas, links internos e
conteúdo extra para as consultas de cauda longa vistas no Search Console."""
import os, re, sys
HERE = os.path.dirname(os.path.abspath(__file__))
SITE = os.path.dirname(HERE)
sys.path.insert(0, HERE)
from faqsync import sync_faq  # noqa: E402

FIG_ANAT = open(os.path.join(HERE, 'fig-anatomia.svg'), encoding='utf-8').read()
FIG_ZON = open(os.path.join(HERE, 'fig-zonas.svg'), encoding='utf-8').read()
FIG_IRR = open(os.path.join(HERE, 'fig-irradiacao.svg'), encoding='utf-8').read()


def rd(f):
    return open(os.path.join(SITE, f), encoding='utf-8').read()


def wr(f, h):
    open(os.path.join(SITE, f), 'w', encoding='utf-8').write(h)


def sub(h, old, new, label, must=True):
    if new != old and new in h:
        print('   = já aplicado:', label)
        return h
    if old not in h:
        if must:
            raise SystemExit('NAO ENCONTROU [%s]: %s' % (label, old[:90]))
        print('   . pulou', label)
        return h
    print('   ✓', label)
    return h.replace(old, new, 1)


# ============================================================ 1. títulos e descrições
TD = {
 'artrose-de-quadril.html': (
   'Coxartrose (Artrose do Quadril): Sintomas, Graus e Tratamento',
   'Coxartrose (Artrose do Quadril): Graus, Tem Cura e Tratamento',
   'Coxartrose (artrose do quadril): sintomas, graus, se tem cura e o tratamento passo a passo, do conservador até quando a prótese é indicada.',
   'Coxartrose é a artrose do quadril. Sintomas, o que significa cada grau no laudo, se tem cura, o tratamento sem cirurgia e quando a prótese entra.'),
 'bursite-no-quadril.html': (
   'Bursite no Quadril: Sintomas, Tratamento e o Que Funciona',
   'Bursite no Quadril: Tratamento e Por Que Quase Nunca É Bursite',
   'Bursite no quadril: por que quase nunca é só bursite, como é a dor, o que fazer para melhorar e o que a ciência mostra sobre infiltração e exercício.',
   'Bursite no quadril: só 8 em 100 pessoas com dor lateral têm bursite isolada. O que causa a dor, o tratamento que funciona e o que a infiltração entrega.'),
 'dor-no-quadril.html': (
   'Dor no Quadril: causas comuns e quando se preocupar',
   'Dor no Quadril: Causas, o Que Pode Ser e Quando Se Preocupar',
   'Dor no quadril: causas comuns (artrose, bursite, tendinite, coluna), o que o local da dor indica e quando procurar um ortopedista.',
   'Dor no quadril esquerdo ou direito: as causas mais comuns, o que o local exato da dor indica, o que fazer em casa e quando procurar um ortopedista.'),
 'cirurgioes-curitiba.html': (
   'Cirurgiões de Quadril em Curitiba',
   'Cirurgião de Quadril em Curitiba: Onde Encontrar',
   'Espaço de indicação de cirurgiões de quadril em Curitiba. Profissional que cuida do quadril e quer aparecer? Entre em contato por e-mail.',
   'Espaço gratuito de indicação de cirurgiões e especialistas em quadril em Curitiba. É um profissional da área e quer aparecer aqui? Escreva para o site.'),
 'recuperacao-protese-de-quadril.html': (
   'Recuperação da Prótese de Quadril: linha do tempo fase a fase',
   'Recuperação da Prótese de Quadril: Linha do Tempo Fase a Fase',
   'Recuperação da prótese de quadril: as fases da reabilitação, precauções, quando voltar a dirigir e trabalhar, e os sinais de alerta.',
   'Recuperação da prótese de quadril semana a semana: precauções de luxação, o que não pode fazer, quando voltar a dirigir e a trabalhar e os sinais de alerta.'),
}
print('\n[1] títulos e descrições')
for f, (t_old, t_new, d_old, d_new) in TD.items():
    h = rd(f)
    assert len(t_new) <= 65, (f, len(t_new))
    assert len(d_new) <= 160, (f, len(d_new))
    h = sub(h, '<title>%s</title>' % t_old, '<title>%s</title>' % t_new, f + ' title')
    h = sub(h, 'content="%s">' % d_old, 'content="%s">' % d_new, f + ' desc')
    wr(f, h)

# ============================================================ 2. figuras novas
print('\n[2] figuras')

# 2a. dor-no-quadril: mapa das três regiões
h = rd('dor-no-quadril.html')
FIG1 = '''<figure class="post-fig reveal">
  <div class="figscroll">%s</div>
  <figcaption>Imagem ilustrativa. As três regiões de dor do quadril e o que cada uma costuma indicar. O lugar exato onde a mão pousa é um dos dados mais informativos da consulta.</figcaption>
</figure>

''' % FIG_ZON
h = sub(h, '<figure class="post-fig reveal">\n  <img src="assets/idosa-dor-quadril-casa.jpg"',
        FIG1 + '<figure class="post-fig reveal">\n  <img src="assets/idosa-dor-quadril-casa.jpg"',
        'dor-no-quadril: fig zonas')
wr('dor-no-quadril.html', h)

# 2b. artrose: trajeto da dor
h = rd('artrose-de-quadril.html')
FIG2 = '''
  <figure class="post-fig reveal">
    <div class="figscroll">%s</div>
    <figcaption>Imagem ilustrativa. O trajeto habitual da dor da coxartrose: começa na virilha, desce pela frente da coxa e, em parte das pessoas, chega ao joelho. É por isso que tanta gente com artrose do quadril procura ajuda por causa do joelho.</figcaption>
  </figure>
''' % FIG_IRR
h = sub(h, '<h2 id="graus" class="reveal">', FIG2 + '<h2 id="graus" class="reveal">',
        'artrose: fig irradiação')
wr('artrose-de-quadril.html', h)

# 2c. prótese: anatomia da articulação
h = rd('protese-de-quadril.html')
FIG3 = '''
  <figure class="post-fig reveal">
    <div class="figscroll">%s</div>
    <figcaption>Imagem ilustrativa. As peças da articulação do quadril. Na artroplastia, a cabeça do fêmur e a superfície do acetábulo são substituídas por componentes artificiais; o colo do fêmur é ressecado e uma haste é fixada dentro do osso.</figcaption>
  </figure>
''' % FIG_ANAT
h = sub(h, '<h2 id="indicada" class="reveal">', FIG3 + '<h2 id="indicada" class="reveal">',
        'prótese: fig anatomia')
wr('protese-de-quadril.html', h)

# ============================================================ 3. conteúdo de cauda longa
print('\n[3] conteúdo novo para consultas do Search Console')

# 3a. dor-no-quadril: lado esquerdo x direito
h = rd('dor-no-quadril.html')
LADO = '''
<h2 id="lado" class="reveal">Dor no quadril esquerdo ou direito: o lado muda alguma coisa?</h2>
<p class="reveal">Praticamente não. As causas de dor no quadril esquerdo são exatamente as mesmas do quadril direito, e nenhuma doença do quadril tem preferência por um lado do corpo. O que às vezes explica por que dói mais de um lado é o uso: a perna dominante, um trabalho que exige apoio repetido sobre a mesma perna, uma diferença de comprimento entre as pernas ou uma sequela antiga de lesão daquele lado.</p>
<p class="reveal">Duas observações valem mais do que o lado em si. A primeira é que <strong>a região onde dói</strong> informa muito mais que o lado: virilha aponta para dentro da articulação, lateral para tendão, nádega para coluna. A segunda é que <strong>dor nos dois lados</strong> ao mesmo tempo levanta hipóteses adicionais, como problema de coluna lombar, doenças inflamatórias das articulações e osteonecrose, e por isso costuma merecer avaliação mais cuidadosa. Se a sua dor é na virilha, escrevemos uma página inteira sobre <a href="dor-na-virilha.html">dor na virilha e o que ela costuma significar</a>.</p>
'''
h = sub(h, '<h2 id="o-que-fazer" class="reveal">', LADO + '<h2 id="o-que-fazer" class="reveal">',
        'dor-no-quadril: seção lado')
h = sub(h, '<li><a href="#o-que-fazer">',
        '<li><a href="#lado">Dor no quadril esquerdo ou direito</a></li>\n    <li><a href="#o-que-fazer">',
        'dor-no-quadril: toc lado')
h = sub(h, '<li><strong>Dor na virilha:</strong> costuma apontar para a própria articulação do quadril, como artrose ou impacto.</li>',
        '<li><strong>Dor na virilha:</strong> costuma apontar para a própria articulação do quadril, como artrose ou <a href="artroscopia-de-quadril.html">impacto femoroacetabular</a>. É o padrão mais específico de todos: veja <a href="dor-na-virilha.html">o que a dor na virilha costuma significar</a>.</li>',
        'dor-no-quadril: link virilha')
FAQ_DOR = '''    <details class="reveal"><summary>Dor no quadril esquerdo é diferente de dor no quadril direito?</summary><div class="faq-body"><p>Não. As causas são exatamente as mesmas nos dois lados e nenhuma doença do quadril tem preferência por um lado do corpo. O que às vezes explica a diferença é o uso: a perna dominante, um trabalho que exija apoio repetido sobre a mesma perna, uma diferença de comprimento entre as pernas ou uma sequela antiga daquele lado. O que realmente informa não é o lado, e sim a região: dor na virilha aponta para dentro da articulação, dor na lateral para tendão e dor na nádega para a coluna. Dor nos dois lados ao mesmo tempo levanta hipóteses adicionais e merece avaliação mais cuidadosa.</p></div></details>
'''
if 'Dor no quadril esquerdo é diferente' not in h:
    m = re.search(r'(<div class="faq">.*?)(\n\s*</div>)', h, re.S)
    h = h[:m.end(1)] + '\n' + FAQ_DOR.rstrip('\n') + h[m.end(1):]
    print('   ✓ dor-no-quadril: faq lado')
wr('dor-no-quadril.html', h)
sync_faq(os.path.join(SITE, 'dor-no-quadril.html'))

# 3b. artrose: é grave? / bilateral
h = rd('artrose-de-quadril.html')
GRAVE = '''
  <h2 id="grave" class="reveal">Coxartrose é grave? E quando é nos dois lados?</h2>
  <p class="reveal">Coxartrose não é uma doença que ameace a vida, e essa é a primeira coisa a dizer para quem acabou de receber o diagnóstico e ficou assustado. Ela não vira câncer, não se espalha e não leva à amputação. O que ela faz é <strong>tirar função</strong>, e é por aí que a gravidade deve ser medida: pela quantidade de vida que a dor está tomando. Uma coxartrose que aparece no raio X mas não impede nada é um achado; uma coxartrose que faz a pessoa parar de sair de casa, dormir mal e depender de outros para calçar a meia é um problema sério, mesmo que a imagem não pareça tão dramática.</p>
  <p class="reveal">Por isso a pergunta certa no consultório não é “qual o meu grau”, e sim <strong>“o que eu deixei de fazer por causa dessa dor”</strong>. É essa resposta que orienta a decisão de operar ou não, muito mais do que a radiografia isolada.</p>
  <p class="reveal">Sobre a <strong>coxartrose bilateral</strong>: é comum, principalmente quando existe uma alteração de formato da articulação que veio de fábrica e que, sendo do indivíduo, vale para os dois lados. Ter nos dois lados não significa que a doença seja mais agressiva, e também não significa que os dois quadris precisarão ser operados ao mesmo tempo. Na prática, opera-se primeiro o lado que mais incomoda, e é frequente que o segundo lado melhore parcialmente depois, porque a marcha se reorganiza e a carga volta a se distribuir. Quando os dois precisam de prótese, as cirurgias costumam ser feitas em tempos separados, com um intervalo definido caso a caso.</p>
'''
h = sub(h, '<h2 id="conservador" class="reveal">', GRAVE + '<h2 id="conservador" class="reveal">',
        'artrose: seção grave/bilateral')
h = sub(h, '<li><a href="#conservador">',
        '<li><a href="#grave">Coxartrose é grave? E bilateral?</a></li>\n    <li><a href="#conservador">',
        'artrose: toc grave')
FAQ_ART = '''    <details class="reveal"><summary>Coxartrose é grave?</summary><div class="faq-body"><p>Coxartrose não ameaça a vida: não vira câncer, não se espalha e não leva a amputação. O que ela faz é tirar função, e é por aí que a gravidade deve ser medida, pela quantidade de vida que a dor está tomando. Uma coxartrose que aparece no raio X mas não impede nada é apenas um achado. Uma coxartrose que faz a pessoa parar de sair de casa, dormir mal e depender de outros para calçar a meia é um problema sério, mesmo que a imagem não pareça dramática. Por isso a pergunta mais útil no consultório não é qual o meu grau, e sim o que eu deixei de fazer por causa dessa dor.</p></div></details>
    <details class="reveal"><summary>Coxartrose bilateral tem cura? Preciso operar os dois lados?</summary><div class="faq-body"><p>A coxartrose bilateral segue a mesma regra da unilateral: o desgaste da cartilagem não se reverte, mas a dor tem solução. Ter nos dois lados é comum, em geral porque existe uma alteração de formato da articulação que é do indivíduo e vale para os dois lados, e não significa que a doença seja mais agressiva. Também não significa que os dois quadris precisarão de cirurgia ao mesmo tempo. Na prática, opera-se primeiro o lado que mais incomoda, e é frequente que o segundo melhore parcialmente depois, porque a marcha se reorganiza. Quando os dois precisam de prótese, as cirurgias costumam ser feitas em tempos separados, com intervalo definido caso a caso.</p></div></details>
'''
if 'Coxartrose é grave?</summary>' not in h:
    m = re.search(r'(<div class="faq">.*?)(\n\s*</div>)', h, re.S)
    h = h[:m.end(1)] + '\n' + FAQ_ART.rstrip('\n') + h[m.end(1):]
    print('   ✓ artrose: faq grave/bilateral')
wr('artrose-de-quadril.html', h)
sync_faq(os.path.join(SITE, 'artrose-de-quadril.html'))

# ============================================================ 4. links contextuais para as páginas novas
print('\n[4] links contextuais')

h = rd('artrose-de-quadril.html')
h = sub(h, 'Essa é uma das perguntas mais buscadas, e merece uma resposta direta e honesta.',
        'Essa é uma das perguntas mais buscadas, e merece uma resposta direta e honesta.', 'artrose: âncora ok')
h = sub(h, '<h2 id="fatores" class="reveal">Fatores de risco</h2>',
        '<h2 id="fatores" class="reveal">Fatores de risco</h2>\n  <p class="reveal">Entre os fatores que mais aparecem, um merece destaque porque é tratável muito antes de a artrose se instalar: a alteração de formato entre a bola e o encaixe, chamada <a href="artroscopia-de-quadril.html">impacto femoroacetabular</a>, que faz os dois ossos baterem em vez de deslizar e machuca a cartilagem ao longo dos anos.</p>',
        'artrose → artroscopia')
h = sub(h, '<h2 id="sintomas" class="reveal">Sintomas da coxartrose</h2>',
        '<h2 id="sintomas" class="reveal">Sintomas da coxartrose</h2>\n  <p class="reveal">O sintoma mais característico e o mais frequentemente mal interpretado é o lugar da dor: a coxartrose costuma doer <a href="dor-na-virilha.html">na virilha</a>, e não na lateral do quadril, porque a articulação fica funda e na frente. Dor sobre a saliência óssea da lateral costuma ser outro problema.</p>',
        'artrose → virilha')
wr('artrose-de-quadril.html', h)

h = rd('protese-de-quadril.html')
h = sub(h, '<h2 id="indicada" class="reveal">Quando a prótese é indicada</h2>',
        '<h2 id="indicada" class="reveal">Quando a prótese é indicada</h2>\n  <p class="reveal">Antes de tudo, vale separar duas cirurgias que costumam ser confundidas. A prótese é para o quadril <strong>com artrose</strong>. Para o quadril jovem, ainda sem desgaste, mas com dor por alteração de formato e lesão do labrum, a cirurgia indicada é outra: a <a href="artroscopia-de-quadril.html">artroscopia de quadril</a>.</p>',
        'prótese → artroscopia')
wr('protese-de-quadril.html', h)

h = rd('bursite-no-quadril.html')
h = sub(h, 'Uma radiografia simples resolve boa parte da dúvida, porque mostra a artrose e não mostra o tendão.',
        'Uma radiografia simples resolve boa parte da dúvida, porque mostra a artrose e não mostra o tendão. Aprofundamos esse contraste na página sobre <a href="dor-na-virilha.html">dor na virilha</a>.',
        'bursite → virilha', must=False)
h = sub(h, '<h2 id="diferenciar" class="reveal">Bursite, artrose ou coluna? Como diferenciar</h2>',
        '<h2 id="diferenciar" class="reveal">Bursite, artrose ou coluna? Como diferenciar</h2>\n  <p class="reveal">O atalho mais rápido é o lugar: dor sobre a saliência óssea da lateral aponta para tendão; <a href="dor-na-virilha.html">dor na virilha</a> aponta para dentro da articulação; dor na nádega aponta para a coluna.</p>',
        'bursite → virilha (seção)')
wr('bursite-no-quadril.html', h)

h = rd('como-aliviar-dor-artrose-quadril.html')
h = sub(h, '<h2 id="medico" class="reveal">Quando procurar o médico</h2>',
        '<h2 id="medico" class="reveal">Quando procurar o médico</h2>\n  <p class="reveal">Vale procurar antes se você ainda não tem diagnóstico confirmado. Dor que se concentra <a href="dor-na-virilha.html">na virilha</a> e atrapalha calçar a meia costuma vir de dentro da articulação, e é justamente esse quadro que se beneficia de avaliação e radiografia em vez de tentativa por conta própria.</p>',
        'aliviar → virilha')
wr('como-aliviar-dor-artrose-quadril.html', h)

h = rd('fratura-de-quadril-no-idoso.html')
h = sub(h, '<h2 id="sinais" class="reveal">Sinais de que houve uma fratura</h2>',
        '<h2 id="sinais" class="reveal">Sinais de que houve uma fratura</h2>\n  <p class="reveal">Vale um alerta sobre a apresentação menos evidente: parte das fraturas sem desvio se manifesta apenas como <a href="dor-na-virilha.html">dor na virilha</a> ao apoiar o peso, sem deformidade nenhuma e com a pessoa ainda conseguindo andar mancando. Idoso que caiu, mesmo de altura pequena, e passou a sentir dor na virilha ao pisar precisa de radiografia.</p>',
        'fratura → virilha')
wr('fratura-de-quadril-no-idoso.html', h)

h = rd('quanto-custa-protese-de-quadril.html')
h = sub(h, '<h2 id="por-que-varia" class="reveal">',
        '<p class="reveal">Se a sua dúvida é sobre a <strong>outra</strong> cirurgia de quadril, a que trata o quadril jovem sem artrose, os valores e a lógica são diferentes: veja a página de <a href="artroscopia-de-quadril.html">artroscopia de quadril</a>.</p>\n\n  <h2 id="por-que-varia" class="reveal">',
        'custos → artroscopia')
wr('quanto-custa-protese-de-quadril.html', h)

print('\nok')
