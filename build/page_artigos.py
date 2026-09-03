# -*- coding: utf-8 -*-
"""Índice de artigos — a função "blog" do site."""
import json, os, sys
HERE = os.path.dirname(os.path.abspath(__file__))
SITE = os.path.dirname(HERE)
sys.path.insert(0, HERE)
from parts import HEADER, FOOTER, SURGEON  # noqa: E402
from build import CSS, JS, FONTS, BASE, ld  # noqa: E402

I = {
 'dor':  '<path d="M12 21s-7-4.7-7-10a7 7 0 0 1 14 0c0 5.3-7 10-7 10z"/><circle cx="12" cy="11" r="2.4"/>',
 'doc':  '<path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8z"/><path d="M14 3v5h5"/><path d="M9 13h6M9 17h4"/>',
 'cut':  '<path d="M4 5l10 10"/><path d="M20 5L10 15"/><circle cx="7" cy="18" r="2.6"/><circle cx="17" cy="18" r="2.6"/>',
 'cost': '<rect x="3" y="6" width="18" height="13" rx="2"/><path d="M3 10h18"/><path d="M8 15h4"/>',
 'beat': '<path d="M3 12h4l2 6 4-12 2 6h6"/>',
 'bone': '<circle cx="9" cy="9" r="5"/><path d="M13 13c3 1 5 4 5 8"/>',
 'warn': '<path d="M12 3l9.5 17H2.5z"/><path d="M12 10v4"/><circle cx="12" cy="17" r=".9" fill="currentColor" stroke="none"/>',
 'walk': '<circle cx="13" cy="4" r="2"/><path d="M11 21l1.5-6 3 3v4"/><path d="M12.5 15L10 10l-3 3"/><path d="M15 8l3 2"/>',
}

# (arquivo, eixo, tag, título, descrição, minutos, revisão, ícone, cor do ícone, destaque)
POSTS = [
 ('dor-na-virilha.html', 'dor', 'Novo', 'Dor na virilha',
  'A articulação do quadril fica atrás da virilha, e não na lateral. Por que a artrose dói ali, como diferenciar de hérnia, adutores e coluna, e quando se preocupar.',
  17, '3 de setembro de 2026', 'dor', '', True),
 ('artroscopia-de-quadril.html', 'cirurgia', 'Novo', 'Artroscopia de quadril',
  'Impacto femoroacetabular e lesão do labrum. Quando a cirurgia resolve, o que dizem os ensaios clínicos e por que “artrose” muda tudo na indicação.',
  16, '3 de setembro de 2026', 'cut', '', True),
 ('artrose-de-quadril.html', 'diagnostico', 'Pilar', 'Coxartrose (artrose do quadril)',
  'Sintomas, graus, se tem cura e o tratamento passo a passo, do conservador até o momento em que a prótese entra na conversa.',
  9, '3 de setembro de 2026', 'doc', '', False),
 ('protese-de-quadril.html', 'cirurgia', 'Pilar', 'Prótese de quadril',
  'O que é a artroplastia, quando é indicada, tipos de prótese e fixação, como é a cirurgia, quanto tempo dura e quais são os riscos reais.',
  8, '3 de setembro de 2026', 'bone', '', False),
 ('quanto-custa-protese-de-quadril.html', 'cirurgia', 'Custos', 'Quanto custa uma prótese de quadril',
  'SUS, plano de saúde e particular. Prótese nacional ou importada, titânio e cerâmica, prótese parcial da cabeça do fêmur, e o que entra na conta.',
  14, '3 de setembro de 2026', 'cost', ' a', False),
 ('recuperacao-protese-de-quadril.html', 'recuperacao', 'Pós-operatório', 'Recuperação da prótese de quadril',
  'A linha do tempo da reabilitação fase a fase, as precauções de luxação, quando voltar a dirigir e a trabalhar, e os sinais de alerta.',
  7, '3 de setembro de 2026', 'walk', '', False),
 ('como-aliviar-dor-artrose-quadril.html', 'dor', 'Tratamento', 'Como aliviar a dor da artrose no quadril',
  'O que funciona, o que funciona pouco e o que não tem evidência nenhuma: exercício, peso, bengala, calor e gelo, remédios, infiltração e colágeno.',
  13, '3 de setembro de 2026', 'beat', ' a', False),
 ('bursite-no-quadril.html', 'dor', 'Dor lateral', 'Bursite e tendinite no quadril',
  'Em 877 pessoas examinadas por ultrassom, só 8 em 100 tinham bursite isolada. O problema quase sempre é outro, e isso muda o tratamento inteiro.',
  22, '3 de setembro de 2026', 'dor', '', False),
 ('dor-no-quadril.html', 'dor', 'Sintomas', 'Dor no quadril',
  'As causas mais comuns, o que o local exato da dor costuma indicar, o que fazer em casa e quando é hora de procurar um ortopedista.',
  6, '3 de setembro de 2026', 'dor', '', False),
 ('fratura-de-quadril-no-idoso.html', 'diagnostico', 'Urgência', 'Fratura de quadril no idoso',
  'Por que quase sempre se opera, em quanto tempo, como é a recuperação, os riscos reais e o que a família pode fazer. Escrito para o filho, não para o paciente.',
  20, '3 de setembro de 2026', 'warn', ' r', False),
 ('protese-de-quadril-vale-a-pena.html', 'cirurgia', 'Resultados', 'A prótese de quadril vale a pena?',
  'Um estudo acompanhou 346 pacientes por cinco anos. O que aconteceu com a dor, com a qualidade de vida e com o ânimo dessas pessoas.',
  8, '3 de setembro de 2026', 'beat', ' a', False),
]

EIXOS = [('todos', 'Todos'), ('dor', 'Dor e sintomas'), ('diagnostico', 'Diagnóstico'),
         ('cirurgia', 'Cirurgia e prótese'), ('recuperacao', 'Recuperação')]

CLOCK = ('<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20z"/>'
         '<path d="M12 6.5V12l3.5 2"/></svg>')
BOOK = ('<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M3 5.5h6.5a3 3 0 0 1 3 3V20a2.5 2.5 0 0 0-2.5-2.5H3z"/>'
        '<path d="M21 5.5h-6.5a3 3 0 0 0-3 3V20a2.5 2.5 0 0 1 2.5-2.5H21z"/></svg>')


def card(p):
    f, eixo, tag, titulo, desc, mins, rev, ico, cor, feat = p
    return f'''      <article class="post{' feat' if feat else ''} reveal" data-eixo="{eixo}">
        <div class="post-top">
          <span class="post-ico{cor}"><svg viewBox="0 0 24 24" aria-hidden="true">{I[ico]}</svg></span>
          <span class="tag">{tag}</span>
        </div>
        <h3><a href="{f}">{titulo}</a></h3>
        <p>{desc}</p>
        <div class="pmeta">
          <span>{BOOK} {mins} min de leitura</span>
          <span>{CLOCK} Revisado em {rev}</span>
        </div>
      </article>'''


chips = '\n'.join(
    '      <button type="button" class="chip" data-filter="%s" aria-pressed="%s">%s <span class="ct">%s</span></button>'
    % (k, 'true' if k == 'todos' else 'false', label,
       len(POSTS) if k == 'todos' else sum(1 for p in POSTS if p[1] == k))
    for k, label in EIXOS)

cards = '\n'.join(card(p) for p in POSTS)

itemlist = ld({"@context": "https://schema.org", "@type": "ItemList",
               "name": "Artigos do Quadril Curitiba",
               "itemListElement": [{"@type": "ListItem", "position": n + 1, "name": p[3],
                                    "url": BASE + p[0]} for n, p in enumerate(POSTS)]})
collection = ld({"@context": "https://schema.org", "@type": "CollectionPage",
                 "name": "Todos os artigos sobre saúde do quadril",
                 "description": "Índice completo dos artigos do Quadril Curitiba, organizados por tema.",
                 "url": BASE + "artigos.html", "inLanguage": "pt-BR",
                 "dateModified": "2026-09-03",
                 "publisher": {"@type": "Organization", "name": "Quadril Curitiba", "url": BASE}})
crumbs = ld({"@context": "https://schema.org", "@type": "BreadcrumbList", "itemListElement": [
    {"@type": "ListItem", "position": 1, "name": "Início", "item": BASE},
    {"@type": "ListItem", "position": 2, "name": "Artigos", "item": BASE + "artigos.html"}]})

BODY = f'''<main id="conteudo">

<section class="section-tint" style="padding:clamp(40px,6vw,72px) 0;"><div class="wrap read">
  <p class="crumbs reveal"><a href="index.html">Início</a> &rsaquo; Artigos</p>
  <span class="pill reveal">Biblioteca</span>
  <h1 class="reveal">Todos os artigos sobre saúde do quadril</h1>
  <p class="lead reveal">Onze textos longos, escritos em linguagem de gente e apoiados em estudos que estão citados no fim de cada página. Filtre pelo tema abaixo, ou busque direto pelo assunto que você quer.</p>
  <div class="btn-row reveal" style="margin-top:6px;">
    <button type="button" class="btn btn-primary" data-qs-open>
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><circle cx="11" cy="11" r="7"/><path d="M16.5 16.5L21 21"/></svg>
      Buscar um assunto
    </button>
    <a class="btn btn-ghost" href="dor-no-quadril.html">Estou com dor no quadril</a>
  </div>
  <p class="metaline reveal"><span>{BOOK} 11 artigos</span><span>{CLOCK} Atualizado em 3 de setembro de 2026</span></p>
</div></section>

<section><div class="wrap">
  <div class="chipbar reveal" role="group" aria-label="Filtrar artigos por tema">
{chips}
  </div>

  <div class="artgrid">
{cards}
  </div>
  <p class="noresult">Nenhum artigo neste tema ainda.</p>
</div></section>

<section class="section-mist"><div class="wrap read">
  <p class="eyebrow reveal">Por onde começar</p>
  <h2 class="reveal">Não sabe qual ler primeiro?</h2>
  <p class="reveal muted">Escolha a frase que mais se parece com o seu momento. Cada atalho leva à página que responde exatamente àquilo.</p>
  <nav class="paths reveal" aria-label="Atalhos por situação" style="margin-top:26px;">
    <a class="path" href="dor-na-virilha.html"><span class="n">1</span><span>Dói na minha virilha</span></a>
    <a class="path" href="bursite-no-quadril.html"><span class="n">2</span><span>Dói na lateral do quadril</span></a>
    <a class="path" href="artrose-de-quadril.html"><span class="n">3</span><span>Recebi diagnóstico de artrose</span></a>
    <a class="path" href="protese-de-quadril.html"><span class="n">4</span><span>Estou pensando em operar</span></a>
    <a class="path" href="recuperacao-protese-de-quadril.html"><span class="n">5</span><span>Já operei ou vou operar</span></a>
    <a class="path" href="fratura-de-quadril-no-idoso.html"><span class="n">6</span><span>Meu pai ou minha mãe fraturou</span></a>
  </nav>
</div></section>

{SURGEON}

</main>'''

html = f'''<!DOCTYPE html>
<html lang="pt-BR">
<head>
<script>document.documentElement.classList.add("js");</script>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Artigos sobre Quadril: Artrose, Prótese, Dor e Recuperação</title>
<meta name="description" content="Todos os artigos do Quadril Curitiba: artrose, prótese, custos, recuperação, dor na virilha, bursite, artroscopia e fratura no idoso.">
<link rel="canonical" href="{BASE}artigos.html">
<meta name="robots" content="index,follow">
<meta property="og:type" content="website">
<meta property="og:locale" content="pt_BR">
<meta property="og:site_name" content="Quadril Curitiba">
<meta property="og:title" content="Todos os artigos sobre saúde do quadril">
<meta property="og:description" content="Onze textos longos sobre artrose, prótese, dor e recuperação do quadril, com as fontes citadas.">
<meta property="og:url" content="{BASE}artigos.html">
<meta property="og:image" content="{BASE}assets/og-image.png">
<meta name="twitter:card" content="summary_large_image">
<link rel="icon" href="assets/favicon.svg" type="image/svg+xml">
<link rel="icon" href="favicon.ico" sizes="any">
<link rel="apple-touch-icon" href="assets/favicon.svg">
{FONTS}
<style>
{CSS}
</style>
{collection}
{crumbs}
{itemlist}
</head>
<body>
{HEADER}
{BODY}
{FOOTER}

<script>
{JS}
</script>
</body>
</html>
'''

open(os.path.join(SITE, 'artigos.html'), 'w', encoding='utf-8').write(html)
print('gerou artigos.html (%d KB)' % (len(html) // 1024))
