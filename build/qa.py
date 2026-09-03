# -*- coding: utf-8 -*-
"""QA do site — versão da seção 8 do handoff, com verificações adicionais."""
import re, glob, os, json, sys
from html.parser import HTMLParser

SITE = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
os.chdir(SITE)

files = sorted(glob.glob('*.html'))
existing = set(os.listdir('.')) | {'assets/' + f for f in os.listdir('assets')}
sitemap = set(re.findall(r'<loc>https://quadrilcuritiba\.com\.br/([^<]*)</loc>', open('sitemap.xml').read()))
errors = []


class C(HTMLParser):
    def __init__(s):
        super().__init__(); s.ids = set(); s.dups = []; s.imgs = []
    def handle_starttag(s, t, a):
        d = dict(a)
        if 'id' in d:
            if d['id'] in s.ids:
                s.dups.append(d['id'])
            s.ids.add(d['id'])
        if t == 'img':
            s.imgs.append(d)


def clean(x):
    x = re.sub(r'<[^>]+>', ' ', x).replace('&nbsp;', ' ').replace('&mdash;', '—').replace('&amp;', '&')
    x = x.replace('&rsaquo;', '›').replace('&ndash;', '–').replace('&quot;', '"')
    return re.sub(r'\s+', ' ', x).strip()


for f in files:
    h = open(f, encoding='utf-8').read()
    c = C(); c.feed(h)
    if '{{' in h:
        errors.append(f + ': placeholder nao substituido')
    if c.dups:
        errors.append(f + ': ids duplicados ' + str(c.dups))
    for m in re.finditer(r'(?:href|src)="([^"#]+?)(#[^"]*)?"', h):
        u = m.group(1)
        if u.startswith(('http', 'mailto', 'tel', 'data:')):
            continue
        if u not in existing:
            errors.append(f + ': link quebrado ' + u)
    for m in re.finditer(r'href="#([^"]+)"', h):
        if m.group(1) not in c.ids:
            errors.append(f + ': ancora inexistente #' + m.group(1))
    types = []
    for m in re.finditer(r'<script type="application/ld\+json">(.*?)</script>', h, re.S):
        try:
            types.append(json.loads(m.group(1)).get('@type'))
        except Exception as e:
            errors.append(f + ': JSON-LD invalido ' + str(e)[:60])
    for im in c.imgs:
        if not im.get('alt'):
            errors.append(f + ': img sem alt ' + im.get('src', ''))
    for m in re.finditer(r'<figure class="post-fig"[^>]*>(.*?)</figure>', h, re.S):
        blk = m.group(1)
        if '<svg' in blk and 'aria-labelledby' not in blk and '<img' not in blk:
            errors.append(f + ': svg de figura sem aria-labelledby')
    if h.count('id="site-nav"') != 1:
        errors.append(f + ': nav ausente ou duplicada')
    if h.count('class="qs-open"') < 1:
        errors.append(f + ': botao de busca ausente')
    if 'id="conteudo"' not in h:
        errors.append(f + ': ancora #conteudo ausente')
    can = re.search(r'rel="canonical" href="https://quadrilcuritiba\.com\.br/([^"]*)"', h)
    if can and can.group(1) and can.group(1) != f:
        errors.append(f + ': canonical divergente')
    if f not in sitemap and f != 'index.html':
        errors.append(f + ': fora do sitemap')
    if 'class="surgeon' in h and 'class="mailbox"' not in h:
        errors.append(f + ': bloco de contato ausente')
    t = re.search(r'<title>(.*?)</title>', h, re.S).group(1)
    d = re.search(r'<meta name="description" content="(.*?)">', h, re.S)
    if len(t) > 65:
        errors.append(f + ': title com %d caracteres' % len(t))
    if not d:
        errors.append(f + ': sem description')
    elif len(d.group(1)) > 160:
        errors.append(f + ': description com %d caracteres' % len(d.group(1)))
    if f != 'index.html' and 'BreadcrumbList' not in types:
        errors.append(f + ': sem BreadcrumbList')
    if 'dateModified' not in h:
        errors.append(f + ': sem dateModified')
    if len(re.findall(r'<h1', h)) != 1:
        errors.append(f + ': mais de um h1 ou nenhum')
    vis = [clean(x) for x in re.findall(r'<summary>(.*?)</summary>', h, re.S) if not clean(x).lower().startswith('refer')]
    sch = []
    for m in re.finditer(r'<script type="application/ld\+json">(.*?)</script>', h, re.S):
        try:
            dd = json.loads(m.group(1))
            if dd.get('@type') == 'FAQPage':
                sch = [q['name'] for q in dd['mainEntity']]
        except Exception:
            pass
    if vis != sch:
        errors.append(f + ': FAQ schema nao espelha o FAQ visivel')
        if len(vis) != len(sch):
            errors.append('      visiveis=%d schema=%d' % (len(vis), len(sch)))
        else:
            for a, b in zip(vis, sch):
                if a != b:
                    errors.append('      [%s] != [%s]' % (a[:50], b[:50]))

# páginas do sitemap que não existem
for u in sitemap:
    if u and u not in existing:
        errors.append('sitemap: aponta para arquivo inexistente ' + u)

print('ARQUIVOS:', len(files))
print('ERROS:' if errors else 'TUDO CERTO')
for e in errors:
    print(' -', e)
sys.exit(1 if errors else 0)
