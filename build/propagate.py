# -*- coding: utf-8 -*-
"""Propaga CSS, JS, cabeçalho, rodapé e marca para todas as páginas do site.

A fonte da verdade do CSS e do JS são os arquivos build/design.css e build/main.js.
Antes de rodar, confira que eles estão à frente do que está embutido nas páginas
(seção 18 do handoff).
"""
import glob, os, re, sys
HERE = os.path.dirname(os.path.abspath(__file__))
SITE = os.path.dirname(HERE)
sys.path.insert(0, HERE)
from parts import HEADER, FOOTER, MARK  # noqa: E402
from faqsync import sync_faq  # noqa: E402

CSS = open(os.path.join(HERE, 'design.css'), encoding='utf-8').read()
JS = open(os.path.join(HERE, 'main.js'), encoding='utf-8').read()
HOJE = '2026-09-03'


def propagate(path):
    h = open(path, encoding='utf-8').read()
    nome = os.path.basename(path)
    feito = []

    # 1. CSS (o bloco do sistema de design)
    novo_css = '<style>\n' + CSS + '\n</style>'
    h2, n = re.subn(r'<style>\s*\n?/\* =+\s*\n\s*Quadril Curitiba — sistema de design.*?</style>',
                    lambda _: novo_css, h, flags=re.S)
    if n:
        h = h2
        feito.append('css')

    # 2. JS compartilhado
    novo_js = '<script>\n' + JS + '\n</script>'
    h2, n = re.subn(r'<script>\s*\n?/\* Quadril Curitiba — interações mínimas \*/.*?</script>',
                    lambda _: novo_js, h, flags=re.S)
    if n:
        h = h2
        feito.append('js')

    # 3. Cabeçalho inteiro (marca, nav nova, botão de busca, menu)
    h2, n = re.subn(r'(<a class="skip"[^>]*>.*?</a>\s*)?<header class="site-header">.*?</header>',
                    lambda _: HEADER, h, flags=re.S)
    if n:
        h = h2
        feito.append('header')

    # 4. Rodapé inteiro
    h2, n = re.subn(r'<footer class="site-footer">.*?</footer>', lambda _: FOOTER, h, flags=re.S)
    if n:
        h = h2
        feito.append('footer')

    # 5. Âncora do "pular para o conteúdo"
    if '<main id="conteudo">' not in h:
        h2, n = re.subn(r'<main>', '<main id="conteudo">', h, count=1)
        if n:
            h = h2
            feito.append('main-id')

    # 6. Migalhas: passam a incluir o índice de artigos
    if nome not in ('index.html', 'artigos.html'):
        h2, n = re.subn(r'(<p class="crumbs[^"]*"[^>]*><a href="index\.html">Início</a> &rsaquo; )(?!<a href="artigos)',
                        r'\1<a href="artigos.html">Artigos</a> &rsaquo; ', h)
        if n:
            h = h2
            feito.append('crumbs')

    # 7. Marca (caso alguma página ainda tenha versão antiga)
    n = len(re.findall(r'<svg class="mark".*?</svg>', h, re.S))
    h = re.sub(r'<svg class="mark".*?</svg>', lambda _: MARK, h, flags=re.S)
    if n:
        feito.append('marca x%d' % n)

    # 8. dateModified
    h2, n = re.subn(r'"dateModified":"\d{4}-\d{2}-\d{2}"', '"dateModified":"%s"' % HOJE, h)
    if n:
        h = h2
        feito.append('dateModified')

    open(path, 'w', encoding='utf-8').write(h)
    nfaq = sync_faq(path)
    if nfaq:
        feito.append('faq x%d' % nfaq)
    print(' ', nome.ljust(40), ', '.join(feito) or 'SEM MUDANÇA')


if __name__ == '__main__':
    for f in sorted(glob.glob(os.path.join(SITE, '*.html'))):
        propagate(f)
