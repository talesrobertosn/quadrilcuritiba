# -*- coding: utf-8 -*-
"""Peças compartilhadas do site Quadril Curitiba."""

MARK = ('<svg class="mark" viewBox="0 0 64 64" aria-hidden="true">'
        '<rect width="64" height="64" rx="15" fill="#0F5B5E"/>'
        '<path d="M11 32 a22 22 0 0 1 22 -22" fill="none" stroke="#7FC4C2" stroke-width="4.5" stroke-linecap="round" opacity=".5"/>'
        '<path d="M15 30 a17 17 0 0 1 17 -17" fill="none" stroke="#EAF3F2" stroke-width="7" stroke-linecap="round"/>'
        '<circle cx="39" cy="31" r="12.5" fill="#F3FAF9"/>'
        '<circle cx="39" cy="31" r="12.5" fill="none" stroke="#D9912B" stroke-width="3"/>'
        '<path d="M45.5 41.5 q6.5 7.5 4 15.5" fill="none" stroke="#EAF3F2" stroke-width="7" stroke-linecap="round"/></svg>')

NAV = '''<nav class="nav" id="site-nav" aria-label="Principal">
      <a href="artigos.html">Artigos</a>
      <a href="artrose-de-quadril.html">Artrose</a>
      <a href="protese-de-quadril.html">Prótese</a>
      <a href="quanto-custa-protese-de-quadril.html">Custos</a>
      <a href="dor-no-quadril.html">Dor no quadril</a>
      <a href="cirurgioes-curitiba.html">Cirurgiões</a>
    </nav>'''

QS_BUTTON = '''<div class="hdr-tools">
      <button type="button" class="qs-open" aria-label="Abrir a navegação rápida" aria-expanded="false" aria-haspopup="dialog">
        <svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="11" cy="11" r="7"/><path d="M16.5 16.5L21 21"/></svg>
        <span class="qs-lbl">Buscar</span>
        <span class="kbd">Ctrl K</span>
      </button>
    </div>'''

HEADER = '''<a class="skip" href="#conteudo">Ir para o conteúdo</a>
<header class="site-header">
  <div class="wrap header-inner">
    <a class="brand" href="index.html">''' + MARK + ''' Quadril <b>Curitiba</b></a>
    ''' + NAV + '''
    ''' + QS_BUTTON + '''
    <button class="nav-toggle" aria-label="Abrir menu" aria-expanded="false" aria-controls="site-nav">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></svg>
    </button>
  </div>
</header>'''

FOOTER = '''<footer class="site-footer">
  <div class="wrap">
    <div class="footer-grid">
      <div>
        <div class="footer-brand">''' + MARK + ''' Quadril Curitiba</div>
        <p class="disclaimer">Conteúdo de caráter exclusivamente informativo e educativo. Não substitui a consulta, o diagnóstico ou o tratamento por um médico. Em caso de dor ou sintomas, procure um ortopedista.</p>
      </div>
      <div>
        <h4>Dor e diagnóstico</h4>
        <ul>
          <li><a href="dor-no-quadril.html">Dor no quadril</a></li>
          <li><a href="dor-na-virilha.html">Dor na virilha</a></li>
          <li><a href="bursite-no-quadril.html">Bursite e tendinite</a></li>
          <li><a href="artrose-de-quadril.html">Coxartrose (artrose)</a></li>
          <li><a href="como-aliviar-dor-artrose-quadril.html">Como aliviar a dor</a></li>
          <li><a href="fratura-de-quadril-no-idoso.html">Fratura no idoso</a></li>
        </ul>
      </div>
      <div>
        <h4>Cirurgia e prótese</h4>
        <ul>
          <li><a href="protese-de-quadril.html">Prótese de quadril</a></li>
          <li><a href="quanto-custa-protese-de-quadril.html">Quanto custa a prótese</a></li>
          <li><a href="artroscopia-de-quadril.html">Artroscopia de quadril</a></li>
          <li><a href="recuperacao-protese-de-quadril.html">Recuperação</a></li>
          <li><a href="protese-de-quadril-vale-a-pena.html">A prótese vale a pena?</a></li>
        </ul>
      </div>
      <div>
        <h4>O site</h4>
        <ul>
          <li><a href="artigos.html">Todos os artigos</a></li>
          <li><a href="cirurgioes-curitiba.html">Cirurgiões em Curitiba</a></li>
          <li><a href="sobre.html">Sobre</a></li>
          <li><a href="privacidade.html">Privacidade</a></li>
        </ul>
      </div>
    </div>
    <div class="footer-bottom">
      <span>&copy; <span data-year>2026</span> quadrilcuritiba.com.br</span>
      <span>Curitiba, Paraná &middot; Brasil</span>
    </div>
  </div>
</footer>'''

SURGEON = '''<section><div class="wrap"><div class="surgeon reveal">
  <p class="eyebrow" style="color:#9BD0CD;">Cirurgiões de quadril em Curitiba</p>
  <h2>Procurando um cirurgião de quadril?</h2>
  <p>Este site é informativo e mantém, gratuitamente, um espaço de indicação de cirurgiões de quadril em Curitiba. É um profissional que cuida da articulação e quer aparecer aqui? Escreva para curitibaquadril@gmail.com.</p>
  <div class="mailbox">
    <button type="button" class="btn btn-mail" data-copy="curitibaquadril@gmail.com" aria-label="Copiar o e-mail curitibaquadril@gmail.com"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"><rect x="2.5" y="4.5" width="19" height="15" rx="2.5"/><path d="M3 7l9 6 9-6"/></svg> <span class="addr">curitibaquadril@gmail.com</span></button>
    <span class="copied" role="status" aria-live="polite"></span>
  </div>
  <p class="altmail">Prefere abrir direto? <a href="https://mail.google.com/mail/?view=cm&amp;fs=1&amp;to=curitibaquadril@gmail.com&amp;su=Cirurgi%C3%A3o%20de%20quadril%20em%20Curitiba" target="_blank" rel="noopener">Escrever pelo Gmail</a> ou <a href="mailto:curitibaquadril@gmail.com?subject=Cirurgi%C3%A3o%20de%20quadril%20em%20Curitiba">usar o app de e-mail</a>.</p>
  <p class="fineprint">Indicação gratuita e sem fins comerciais. Cada profissional é responsável pela própria publicidade perante o CFM.</p>
</div></div></section>'''

ICON_CLOCK = ('<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20z"/>'
              '<path d="M12 6.5V12l3.5 2"/></svg>')
ICON_READ = ('<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M3 5.5h6.5a3 3 0 0 1 3 3V20a2.5 2.5 0 0 0-2.5-2.5H3z"/>'
             '<path d="M21 5.5h-6.5a3 3 0 0 0-3 3V20a2.5 2.5 0 0 1 2.5-2.5H21z"/></svg>')
ICON_ARROW = ('<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6"/></svg>')
