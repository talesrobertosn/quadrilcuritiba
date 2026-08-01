import re, glob

NEW_CSS = open('/home/claude/design.css').read()
NEW_JS  = open('/home/claude/newjs.txt').read()

NEW_MARK = '<svg class="mark" viewBox="0 0 64 64" aria-hidden="true"><rect width="64" height="64" rx="15" fill="#0F5B5E"/><path d="M11 32 a22 22 0 0 1 22 -22" fill="none" stroke="#7FC4C2" stroke-width="4.5" stroke-linecap="round" opacity=".5"/><path d="M15 30 a17 17 0 0 1 17 -17" fill="none" stroke="#EAF3F2" stroke-width="7" stroke-linecap="round"/><circle cx="39" cy="31" r="12.5" fill="#F3FAF9"/><circle cx="39" cy="31" r="12.5" fill="none" stroke="#D9912B" stroke-width="3"/><path d="M45.5 41.5 q6.5 7.5 4 15.5" fill="none" stroke="#EAF3F2" stroke-width="7" stroke-linecap="round"/></svg>'

MAIL_BLOCK = """<div class="mailbox">
    <button type="button" class="btn btn-mail" data-copy="curitibaquadril@gmail.com" aria-label="Copiar o e-mail curitibaquadril@gmail.com"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"><rect x="2.5" y="4.5" width="19" height="15" rx="2.5"/><path d="M3 7l9 6 9-6"/></svg> <span class="addr">curitibaquadril@gmail.com</span></button>
    <span class="copied" role="status" aria-live="polite"></span>
  </div>
  <p class="altmail">Prefere abrir direto? <a href="https://mail.google.com/mail/?view=cm&amp;fs=1&amp;to=curitibaquadril@gmail.com&amp;su=Cirurgi%C3%A3o%20de%20quadril%20em%20Curitiba" target="_blank" rel="noopener">Escrever pelo Gmail</a> ou <a href="mailto:curitibaquadril@gmail.com?subject=Cirurgi%C3%A3o%20de%20quadril%20em%20Curitiba">usar o app de e-mail</a>.</p>"""

NAV_NEW = '''<nav class="nav" id="site-nav" aria-label="Principal">
      <a href="protese-de-quadril.html">Prótese</a>
      <a href="quanto-custa-protese-de-quadril.html">Custos</a>
      <a href="recuperacao-protese-de-quadril.html">Recuperação</a>
      <a href="artrose-de-quadril.html">Coxartrose</a>
      <a href="como-aliviar-dor-artrose-quadril.html">Aliviar a dor</a>
      <a href="dor-no-quadril.html">Dor no quadril</a>
      <a href="fratura-de-quadril-no-idoso.html">Fratura no idoso</a>
      <a href="cirurgioes-curitiba.html">Cirurgiões</a>
    </nav>'''

FOOTER_TEMAS_NEW = '''<h4>Temas</h4>
        <ul>
          <li><a href="protese-de-quadril.html">Prótese de quadril</a></li>
          <li><a href="quanto-custa-protese-de-quadril.html">Quanto custa a prótese</a></li>
          <li><a href="recuperacao-protese-de-quadril.html">Recuperação</a></li>
          <li><a href="artrose-de-quadril.html">Coxartrose (artrose)</a></li>
          <li><a href="como-aliviar-dor-artrose-quadril.html">Como aliviar a dor</a></li>
          <li><a href="dor-no-quadril.html">Dor no quadril</a></li>
          <li><a href="fratura-de-quadril-no-idoso.html">Fratura de quadril no idoso</a></li>
        </ul>'''

def polish(path):
    h = open(path).read()
    changed = []

    # 1. Swap the design-system <style> block
    m = re.search(r'<style>\s*/\* =+\s*\n\s*Quadril Curitiba — sistema de design.*?</style>', h, re.S)
    if m:
        h = h.replace(m.group(0), '<style>\n' + NEW_CSS + '\n</style>')
        changed.append('css')

    # 2. Remove page-specific post-fig style (now global)
    pf = re.search(r'<style>\.post-fig\{.*?\}</style>', h, re.S)
    if pf:
        h = h.replace(pf.group(0), '')
        changed.append('postfig-dedup')

    # 3. Replace every brand mark svg
    n = len(re.findall(r'<svg class="mark".*?</svg>', h, re.S))
    h = re.sub(r'<svg class="mark".*?</svg>', lambda _: NEW_MARK, h, flags=re.S)
    if n: changed.append(f'mark x{n}')

    # 4. Replace nav block
    m = re.search(r'<nav class="nav" id="site-nav" aria-label="Principal">.*?</nav>', h, re.S)
    if m:
        h = h.replace(m.group(0), NAV_NEW)
        changed.append('nav')

    # 5. Replace footer Temas list
    m = re.search(r'<h4>Temas</h4>\s*<ul>.*?</ul>', h, re.S)
    if m:
        h = h.replace(m.group(0), FOOTER_TEMAS_NEW)
        changed.append('footer-temas')

    # 6. Swap JS block
    m = re.search(r'/\* Quadril Curitiba — interações mínimas \*/.*?\}\)\(\);', h, re.S)
    if m:
        h = h.replace(m.group(0), NEW_JS.strip())
        changed.append('js')

    # 7. Substituir botão de e-mail simples pelo bloco de contato robusto
    m = re.search(r'<a class="btn btn-mail" href="mailto:[^"]*">.*?</a>', h, re.S)
    if m:
        h = h.replace(m.group(0), MAIL_BLOCK)
        changed.append('mailblock')

    open(path,'w').write(h)
    print(path, '->', ', '.join(changed) if changed else 'NO CHANGES')

for f in sorted(glob.glob('/home/claude/site/*.html')):
    polish(f)
