# -*- coding: utf-8 -*-
"""Atualiza a home com os artigos novos, o atalho para a biblioteca e o buscador."""
import os, sys
HERE = os.path.dirname(os.path.abspath(__file__))
SITE = os.path.dirname(HERE)
P = os.path.join(SITE, 'index.html')
h = open(P, encoding='utf-8').read()


def sub(old, new, label, must=True):
    global h
    if new != old and new in h:
        print('   = já aplicado:', label); return
    if old not in h:
        if must:
            raise SystemExit('NAO ENCONTROU [%s]' % label)
        print('   . pulou', label); return
    h = h.replace(old, new, 1); print('   ✓', label)


# 1. Atalhos por situação: entra "dói na virilha"
sub('<a class="path" href="bursite-no-quadril.html"><span class="n">3</span><span>Dói na lateral do quadril</span></a>',
    '<a class="path" href="dor-na-virilha.html"><span class="n">3</span><span>Dói na minha virilha</span></a>\n'
    '      <a class="path" href="bursite-no-quadril.html"><span class="n">4</span><span>Dói na lateral do quadril</span></a>',
    'path virilha')
sub('<a class="path" href="protese-de-quadril.html"><span class="n">4</span><span>Estou pensando em operar</span></a>',
    '<a class="path" href="protese-de-quadril.html"><span class="n">5</span><span>Estou pensando em operar</span></a>',
    'renumera 5')
sub('<a class="path" href="recuperacao-protese-de-quadril.html"><span class="n">5</span><span>Já operei ou vou operar</span></a>',
    '<a class="path" href="recuperacao-protese-de-quadril.html"><span class="n">6</span><span>Já operei ou vou operar</span></a>',
    'renumera 6')

# 2. Dois cards novos ao fim da grade de temas
CARDS = '''      <article class="card linked reveal">
        <div class="ico"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M12 21s-7-4.7-7-10a7 7 0 0 1 14 0c0 5.3-7 10-7 10z"/><circle cx="12" cy="11" r="2.4"/></svg></div>
        <span class="tag">Sintomas</span>
        <h3>Dor na virilha</h3>
        <p>A articulação do quadril fica atrás da virilha, e não na lateral. Por que a artrose dói ali, e como diferenciar de hérnia, adutores e coluna.</p>
        <span class="more">Entender a dor na virilha</span>
        <a class="stretch" href="dor-na-virilha.html" aria-label="Dor na virilha"></a>
      </article>
      <article class="card linked reveal">
        <div class="ico"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M4 5l10 10"/><path d="M20 5L10 15"/><circle cx="7" cy="18" r="2.6"/><circle cx="17" cy="18" r="2.6"/></svg></div>
        <span class="tag">Cirurgia</span>
        <h3>Artroscopia de quadril</h3>
        <p>Impacto femoroacetabular e lesão do labrum no quadril jovem. Quando a cirurgia resolve, e por que artrose muda tudo na indicação.</p>
        <span class="more">Ler sobre artroscopia</span>
        <a class="stretch" href="artroscopia-de-quadril.html" aria-label="Artroscopia de quadril"></a>
      </article>
'''
sub('''        <a class="stretch" href="fratura-de-quadril-no-idoso.html" aria-label="Fratura de quadril no idoso"></a>
      </article>
    </div>''',
    '''        <a class="stretch" href="fratura-de-quadril-no-idoso.html" aria-label="Fratura de quadril no idoso"></a>
      </article>
''' + CARDS + '''    </div>''',
    'cards novos')

# 3. Botão para a biblioteca e para o buscador, no hero
sub('<a class="btn btn-ghost" href="dor-no-quadril.html">Estou com dor no quadril</a>',
    '<a class="btn btn-ghost" href="artigos.html">Ver todos os artigos</a>',
    'hero CTA biblioteca')

# 4. Bloco de chamada para a biblioteca, logo depois da grade de temas
BIBLIO = '''
<section style="padding-top:0;">
  <div class="wrap">
    <div class="callout info reveal" style="display:flex;flex-wrap:wrap;gap:18px 28px;align-items:center;justify-content:space-between;margin:0;">
      <div style="flex:1 1 320px;min-width:0;">
        <h3 style="margin-bottom:.3em;">Tem uma dúvida específica?</h3>
        <p style="margin:0;">São onze artigos longos, com as fontes citadas. Vá direto ao assunto pelo buscador, ou percorra a biblioteca inteira.</p>
      </div>
      <div class="btn-row" style="flex:0 0 auto;">
        <button type="button" class="btn btn-primary" data-qs-open>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><circle cx="11" cy="11" r="7"/><path d="M16.5 16.5L21 21"/></svg>
          Buscar um assunto
        </button>
        <a class="btn btn-ghost" href="artigos.html">Ver a biblioteca</a>
      </div>
    </div>
  </div>
</section>
'''
sub('\n<!-- ÍNDICE -->', BIBLIO + '\n<!-- ÍNDICE -->', 'bloco biblioteca')

open(P, 'w', encoding='utf-8').write(h)
print('home atualizada')
