# -*- coding: utf-8 -*-
"""Regera o schema FAQPage a partir do FAQ visível da página.

O QA da seção 8 do handoff exige espelhamento exato entre os <details> visíveis
e o JSON-LD. Esta função é a fonte única dessa sincronia.
"""
import json, re

DETAILS = re.compile(r'<details\b[^>]*>(.*?)</details>', re.S)
SUMMARY = re.compile(r'<summary\b[^>]*>(.*?)</summary>', re.S)
BODY = re.compile(r'<div class="faq-body"[^>]*>(.*?)</div>', re.S)


def _clean(x):
    x = re.sub(r'<[^>]+>', ' ', x)
    x = (x.replace('&nbsp;', ' ').replace('&mdash;', '—').replace('&ndash;', '–')
          .replace('&rsaquo;', '›').replace('&amp;', '&')
          .replace('&quot;', '"').replace('&lt;', '<').replace('&gt;', '>'))
    return re.sub(r'\s+', ' ', x).strip()


def extract(h):
    """Devolve [(pergunta, resposta)] na ordem em que aparecem na página."""
    pares = []
    for m in DETAILS.finditer(h):
        bloco = m.group(1)
        s = SUMMARY.search(bloco)
        b = BODY.search(bloco)
        if not s or not b:
            continue                      # é o bloco de referências, não é FAQ
        q = _clean(s.group(1))
        if q.lower().startswith('refer'):
            continue
        ps = re.findall(r'<p>(.*?)</p>', b.group(1), re.S)
        a = ' '.join(_clean(p) for p in ps) if ps else _clean(b.group(1))
        pares.append((q, a))
    return pares


def sync_faq(path):
    h = open(path, encoding='utf-8').read()
    pares = extract(h)

    # remove todo e qualquer FAQPage existente, mesmo se estiver corrompido
    def drop(m):
        return '' if '"@type":"FAQPage"' in m.group(0).replace(' ', '') else m.group(0)

    h = re.sub(r'<script type="application/ld\+json">.*?</script>\s*', drop, h, flags=re.S)

    if not pares:
        open(path, 'w', encoding='utf-8').write(h)
        return 0

    schema = {"@context": "https://schema.org", "@type": "FAQPage", "mainEntity": [
        {"@type": "Question", "name": q,
         "acceptedAnswer": {"@type": "Answer", "text": a}} for q, a in pares]}
    novo = ('<script type="application/ld+json">\n'
            + json.dumps(schema, ensure_ascii=False, separators=(',', ':'))
            + '\n</script>\n')
    h = h.replace('</head>', novo + '</head>', 1)
    open(path, 'w', encoding='utf-8').write(h)
    return len(pares)
