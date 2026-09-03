# -*- coding: utf-8 -*-
"""Monta páginas completas e autossuficientes do Quadril Curitiba."""
import json, os, re, sys

HERE = os.path.dirname(os.path.abspath(__file__))
SITE = os.path.dirname(HERE)
sys.path.insert(0, HERE)
from parts import HEADER, FOOTER, SURGEON, MARK  # noqa: E402

CSS = open(os.path.join(HERE, 'design.css'), encoding='utf-8').read()
JS = open(os.path.join(HERE, 'main.js'), encoding='utf-8').read()
BASE = 'https://quadrilcuritiba.com.br/'

FONTS = ('<link rel="preconnect" href="https://fonts.googleapis.com">\n'
         '<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>\n'
         '<link href="https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,400;9..144,540;9..144,600'
         '&family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">')


def ld(obj):
    return ('<script type="application/ld+json">\n'
            + json.dumps(obj, ensure_ascii=False, separators=(',', ':')) + '\n</script>')


def breadcrumb(name, slug):
    return ld({"@context": "https://schema.org", "@type": "BreadcrumbList", "itemListElement": [
        {"@type": "ListItem", "position": 1, "name": "Início", "item": BASE},
        {"@type": "ListItem", "position": 2, "name": name, "item": BASE + slug}]})


def faqpage(pairs):
    return ld({"@context": "https://schema.org", "@type": "FAQPage", "mainEntity": [
        {"@type": "Question", "name": q,
         "acceptedAnswer": {"@type": "Answer", "text": a}} for q, a in pairs]})


def faq_html(title, pairs, intro_eyebrow="Perguntas frequentes"):
    out = ['<section class="section-mist"><div class="wrap read">',
           '  <p class="eyebrow reveal">%s</p>' % intro_eyebrow,
           '  <h2 class="reveal" style="margin-bottom:28px;">%s</h2>' % title,
           '  <div class="faq">']
    for q, a in pairs:
        body = ''.join('<p>%s</p>' % p for p in a.split('\n\n'))
        out.append('    <details class="reveal"><summary>%s</summary><div class="faq-body">%s</div></details>' % (q, body))
    out += ['  </div>', '</div></section>']
    return '\n'.join(out)


def toc_html(items):
    lis = '\n'.join('    <li><a href="#%s">%s</a></li>' % (i, t) for i, t in items)
    return ('<section style="padding-top:clamp(30px,4vw,46px);padding-bottom:0;"><div class="wrap">\n'
            '  <nav class="toc reveal" aria-label="Conteúdo desta página"><h2>Nesta página</h2><ol>\n'
            + lis + '\n  </ol></nav>\n</div></section>')


def related_html(links):
    arrow = ('<svg viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" '
             'stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14M13 6l6 6-6 6"/></svg>')
    items = '\n'.join('    <a class="rel" href="%s">%s%s</a>' % (u, arrow, t) for u, t in links)
    return ('  <div class="related reveal">\n    <h2>Leia também</h2>\n    <div class="related-list">\n'
            + items + '\n    </div>\n  </div>')


def page(slug, title, description, og_title, og_desc, h1, lead, pill, crumb_label,
         body, toc=None, faq=None, faq_title=None, extra_ld=None, revised=None,
         published=None, modified=None, minutes=None, about=None, related=None,
         hero_class="section-tint", nolead=False):
    """Gera o HTML completo de uma página."""
    canonical = BASE if slug == 'index.html' else BASE + slug
    schemas = []
    web = {"@context": "https://schema.org", "@type": "MedicalWebPage",
           "headline": og_title, "inLanguage": "pt-BR", "url": canonical,
           "dateModified": modified or "2026-09-03",
           "image": BASE + "assets/og-image.png",
           "publisher": {"@type": "Organization", "name": "Quadril Curitiba", "url": BASE}}
    if published:
        web["datePublished"] = published
    if about:
        web["about"] = about
    schemas.append(ld(web))
    schemas.append(breadcrumb(crumb_label, slug))
    if faq:
        schemas.append(faqpage(faq))
    if extra_ld:
        schemas.extend(extra_ld)

    meta = ''
    if revised or minutes:
        bits = []
        if revised:
            bits.append('<span><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20z"/>'
                        '<path d="M12 6.5V12l3.5 2"/></svg> Revisado em %s</span>' % revised)
        if minutes:
            bits.append('<span><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M3 5.5h6.5a3 3 0 0 1 3 3V20a2.5 2.5 0 0 0-2.5-2.5H3z"/>'
                        '<path d="M21 5.5h-6.5a3 3 0 0 0-3 3V20a2.5 2.5 0 0 1 2.5-2.5H21z"/></svg> %d min de leitura</span>' % minutes)
        meta = '\n  <p class="metaline reveal">%s</p>' % ''.join(bits)

    hero = ['<section class="%s" style="padding:clamp(40px,6vw,72px) 0;"><div class="wrap read">' % hero_class,
            '  <p class="crumbs reveal"><a href="index.html">Início</a> &rsaquo; <a href="artigos.html">Artigos</a> &rsaquo; %s</p>' % crumb_label]
    if pill:
        hero.append('  <span class="pill reveal">%s</span>' % pill)
    hero.append('  <h1 class="reveal">%s</h1>' % h1)
    if lead:
        hero.append('  <p class="lead reveal">%s</p>' % lead)
    hero.append(meta)
    hero.append('</div></section>')

    parts = [HEADER, '<main id="conteudo">', '\n'.join(hero)]
    if toc:
        parts.append(toc_html(toc))
    parts.append(body)
    if faq:
        parts.append(faq_html(faq_title or 'Perguntas frequentes', faq))
    if related:
        parts.append('<section style="padding-top:0;"><div class="wrap read">\n' + related_html(related) + '\n</div></section>')
    parts.append(SURGEON)
    parts.append('</main>')
    parts.append(FOOTER)

    html = f'''<!DOCTYPE html>
<html lang="pt-BR">
<head>
<script>document.documentElement.classList.add("js");</script>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>{title}</title>
<meta name="description" content="{description}">
<link rel="canonical" href="{canonical}">
<meta name="robots" content="index,follow">
<meta property="og:type" content="article">
<meta property="og:locale" content="pt_BR">
<meta property="og:site_name" content="Quadril Curitiba">
<meta property="og:title" content="{og_title}">
<meta property="og:description" content="{og_desc}">
<meta property="og:url" content="{canonical}">
<meta property="og:image" content="{BASE}assets/og-image.png">
<meta name="twitter:card" content="summary_large_image">
<link rel="icon" href="assets/favicon.svg" type="image/svg+xml">
<link rel="icon" href="favicon.ico" sizes="any">
<link rel="apple-touch-icon" href="assets/favicon.svg">
{FONTS}
<style>
{CSS}
</style>
{chr(10).join(schemas)}
</head>
<body>
{chr(10).join(parts)}

<script>
{JS}
</script>
</body>
</html>
'''
    path = os.path.join(SITE, slug)
    open(path, 'w', encoding='utf-8').write(html)
    print('gerou', slug, '(%d KB)' % (len(html) // 1024))
    return html
