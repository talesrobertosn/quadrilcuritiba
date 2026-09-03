/* Quadril Curitiba — interações mínimas */
(function () {
  var d = document;

  // ---------- Menu mobile ----------
  var toggle = d.querySelector('.nav-toggle');
  var nav = d.getElementById('site-nav');
  if (toggle && nav) {
    toggle.addEventListener('click', function () {
      var open = nav.classList.toggle('open');
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
    nav.addEventListener('click', function (e) {
      if (e.target.tagName === 'A') {
        nav.classList.remove('open');
        toggle.setAttribute('aria-expanded', 'false');
      }
    });
  }

  // ---------- Cabeçalho: sombra ao rolar ----------
  var header = d.querySelector('.site-header');
  if (header) {
    var paintHeader = function () {
      header.classList.toggle('scrolled', window.scrollY > 8);
    };
    window.addEventListener('scroll', paintHeader, { passive: true });
    paintHeader();
  }

  // ---------- Nav: destaca a página atual ----------
  var here = location.pathname.split('/').pop() || 'index.html';
  var casou = false;
  d.querySelectorAll('.nav a').forEach(function (a) {
    if (a.getAttribute('href') === here) {
      a.classList.add('active');
      a.setAttribute('aria-current', 'page');
      casou = true;
    }
  });
  // Página de conteúdo que não está no menu: destaca a biblioteca
  if (!casou && here !== 'index.html') {
    var lib = d.querySelector('.nav a[href="artigos.html"]');
    if (lib) lib.classList.add('active');
  }

  // ---------- Animação de entrada ----------
  var els = d.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && els.length) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) {
          en.target.classList.add('in');
          io.unobserve(en.target);
        }
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });
    els.forEach(function (el) { io.observe(el); });
  } else {
    els.forEach(function (el) { el.classList.add('in'); });
  }

  // ---------- Barra de progresso de leitura ----------
  var bar = d.createElement('div');
  bar.className = 'readbar';
  bar.setAttribute('aria-hidden', 'true');
  d.body.appendChild(bar);

  // ---------- Voltar ao topo ----------
  var top = d.createElement('button');
  top.type = 'button';
  top.className = 'totop';
  top.setAttribute('aria-label', 'Voltar ao topo da página');
  top.innerHTML = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 19V5"/><path d="M5 12l7-7 7 7"/></svg>';
  top.addEventListener('click', function () {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
  d.body.appendChild(top);

  var ticking = false;
  function paint() {
    var h = d.documentElement;
    var max = h.scrollHeight - h.clientHeight;
    bar.style.width = (max > 0 ? (h.scrollTop / max) * 100 : 0) + '%';
    top.classList.toggle('on', h.scrollTop > 700);
    ticking = false;
  }
  window.addEventListener('scroll', function () {
    if (!ticking) { ticking = true; requestAnimationFrame(paint); }
  }, { passive: true });
  paint();

  // ---------- Copiar e-mail de contato ----------
  var copyBtns = d.querySelectorAll('[data-copy]');
  copyBtns.forEach(function (btn) {
    btn.addEventListener('click', function () {
      var value = btn.getAttribute('data-copy');
      var note = btn.parentNode.querySelector('.copied');
      function done() {
        if (!note) return;
        note.classList.add('on');
        note.textContent = 'E-mail copiado';
        setTimeout(function () { note.classList.remove('on'); }, 2600);
      }
      function fallback() {
        var ta = d.createElement('textarea');
        ta.value = value;
        ta.setAttribute('readonly', '');
        ta.style.position = 'absolute';
        ta.style.left = '-9999px';
        d.body.appendChild(ta);
        ta.select();
        try { d.execCommand('copy'); done(); } catch (e) {
          if (note) { note.classList.add('on'); note.textContent = 'Selecione e copie: ' + value; }
        }
        d.body.removeChild(ta);
      }
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(value).then(done, fallback);
      } else {
        fallback();
      }
    });
  });

  // ---------- Ano automático no rodapé ----------
  d.querySelectorAll('[data-year]').forEach(function (n) {
    n.textContent = new Date().getFullYear();
  });

  // ---------- Filtro do índice de artigos ----------
  var chips = d.querySelectorAll('.chip[data-filter]');
  if (chips.length) {
    var posts = d.querySelectorAll('.post[data-eixo]');
    var none = d.querySelector('.noresult');
    chips.forEach(function (chip) {
      chip.addEventListener('click', function () {
        var f = chip.getAttribute('data-filter');
        chips.forEach(function (c) { c.setAttribute('aria-pressed', c === chip ? 'true' : 'false'); });
        var shown = 0;
        posts.forEach(function (p) {
          var ok = f === 'todos' || p.getAttribute('data-eixo') === f;
          p.hidden = !ok;
          if (ok) shown++;
        });
        if (none) none.classList.toggle('on', shown === 0);
      });
    });
  }

  // ---------- Navegação rápida (popup de busca) ----------
  var ICO = {
    dor: '<path d="M12 21s-7-4.7-7-10a7 7 0 0 1 14 0c0 5.3-7 10-7 10z"/><circle cx="12" cy="11" r="2.4"/>',
    doc: '<path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8z"/><path d="M14 3v5h5"/><path d="M9 13h6M9 17h4"/>',
    cut: '<path d="M4 5l10 10"/><path d="M20 5L10 15"/><circle cx="7" cy="18" r="2.6"/><circle cx="17" cy="18" r="2.6"/>',
    cost: '<rect x="3" y="6" width="18" height="13" rx="2"/><path d="M3 10h18"/><path d="M8 15h4"/>',
    beat: '<path d="M3 12h4l2 6 4-12 2 6h6"/>',
    home: '<path d="M4 11l8-7 8 7"/><path d="M6 10v10h12V10"/>',
    list: '<path d="M8 6h13M8 12h13M8 18h13"/><circle cx="3.6" cy="6" r="1.3"/><circle cx="3.6" cy="12" r="1.3"/><circle cx="3.6" cy="18" r="1.3"/>',
    info: '<circle cx="12" cy="12" r="9"/><path d="M12 11v5"/><circle cx="12" cy="7.8" r="1"/>',
    hash: '<path d="M5 9h14M5 15h14M10 4l-2 16M16 4l-2 16"/>'
  };

  var PAGES = [
    { u: 'index.html', t: 'Início', d: 'Guia de saúde do quadril, do sintoma à cirurgia', g: 'Site', i: 'home', k: 'home inicio principal guia quadril curitiba' },
    { u: 'artigos.html', t: 'Todos os artigos', d: 'Índice completo do conteúdo, por tema', g: 'Site', i: 'list', k: 'artigos blog indice lista conteudo temas todos' },
    { u: 'dor-no-quadril.html', t: 'Dor no quadril', d: 'Causas comuns e quando se preocupar', g: 'Dor e sintomas', i: 'dor', k: 'dor quadril causas doi doer lado esquerdo direito sintoma nadega lateral coxa mancando' },
    { u: 'dor-na-virilha.html', t: 'Dor na virilha', d: 'Por que a artrose do quadril dói na virilha', g: 'Dor e sintomas', i: 'dor', k: 'virilha ingua inguinal dor andar levantar cadeira calcar meia hernia pubalgia adutor joelho irradiada dois lados bilateral gravidez' },
    { u: 'bursite-no-quadril.html', t: 'Bursite e tendinite no quadril', d: 'Dor na lateral: quase nunca é só bursite', g: 'Dor e sintomas', i: 'dor', k: 'bursite tendinite tendinopatia lateral trocanter trocanterica gluteo dormir de lado dor lateral infiltracao ondas de choque tratamento' },
    { u: 'como-aliviar-dor-artrose-quadril.html', t: 'Como aliviar a dor da artrose', d: 'O que funciona, o que funciona pouco e o que não tem evidência', g: 'Dor e sintomas', i: 'beat', k: 'aliviar alivio dor artrose exercicio remedio anti-inflamatorio colageno suplemento peso bengala dormir calor gelo infiltracao fisioterapia' },
    { u: 'artrose-de-quadril.html', t: 'Coxartrose (artrose do quadril)', d: 'Sintomas, graus e tratamento', g: 'Diagnóstico', i: 'doc', k: 'coxartrose artrose artrosis desgaste cartilagem graus grau 2 3 4 tem cura bilateral diagnostico raio x é grave imagens' },
    { u: 'fratura-de-quadril-no-idoso.html', t: 'Fratura de quadril no idoso', d: 'Cirurgia, recuperação e prognóstico', g: 'Diagnóstico', i: 'doc', k: 'fratura femur colo idoso idosa queda urgencia internacao mortalidade transtrocanterica quebrou o quadril bacia' },
    { u: 'protese-de-quadril.html', t: 'Prótese de quadril', d: 'O que é, tipos, durabilidade e riscos', g: 'Cirurgia', i: 'cut', k: 'protese prótese artroplastia quadril tipos cimentada nao cimentada titanio ceramica polietileno durabilidade dura quanto tempo riscos luxacao' },
    { u: 'quanto-custa-protese-de-quadril.html', t: 'Quanto custa a prótese de quadril', d: 'SUS, convênio e particular, com valores', g: 'Cirurgia', i: 'cost', k: 'quanto custa custo custos preco precos valor valores sus convenio plano particular nacional importada titanio ceramica cabeca do femur orcamento quanto sai barato caro' },
    { u: 'artroscopia-de-quadril.html', t: 'Artroscopia de quadril', d: 'Impacto femoroacetabular e lesão do labrum', g: 'Cirurgia', i: 'cut', k: 'artroscopia labrum lesao do labrum impacto femoroacetabular fai cam pincer video cirurgia minimamente invasiva atleta esporte jovem' },
    { u: 'protese-de-quadril-vale-a-pena.html', t: 'Prótese de quadril vale a pena?', d: 'O que muda 5 anos depois da cirurgia', g: 'Cirurgia', i: 'beat', k: 'vale a pena resultado 5 anos qualidade de vida satisfacao arrependimento' },
    { u: 'recuperacao-protese-de-quadril.html', t: 'Recuperação da prótese', d: 'Linha do tempo, precauções e sinais de alerta', g: 'Recuperação', i: 'beat', k: 'recuperacao pos operatorio pos-operatorio fisioterapia reabilitacao luxacao dirigir trabalhar dormir de lado tempo muleta andador o que nao pode fazer' },
    { u: 'cirurgioes-curitiba.html', t: 'Cirurgiões de quadril em Curitiba', d: 'Espaço gratuito de indicação', g: 'Site', i: 'info', k: 'cirurgiao especialista medico ortopedista quadril curitiba indicacao contato consulta onde procurar' },
    { u: 'sobre.html', t: 'Sobre o site', d: 'Como o conteúdo é feito', g: 'Site', i: 'info', k: 'sobre quem somos proposito editorial' },
    { u: 'privacidade.html', t: 'Privacidade', d: 'Dados, cookies e LGPD', g: 'Site', i: 'info', k: 'privacidade lgpd cookies dados' }
  ];

  var TOPICS = [
    { u: 'quanto-custa-protese-de-quadril.html#sus', t: 'Prótese de quadril pelo SUS', d: 'É gratuita? Como funciona a fila', g: 'Respostas rápidas', i: 'cost', k: 'sus gratuito fila publico gratuita governo' },
    { u: 'quanto-custa-protese-de-quadril.html#convenio', t: 'O plano de saúde é obrigado a cobrir?', d: 'Cobertura, rol da ANS e negativas', g: 'Respostas rápidas', i: 'cost', k: 'plano convenio ans cobertura obrigatoria negativa unimed reembolso' },
    { u: 'quanto-custa-protese-de-quadril.html#nacional-importada', t: 'Prótese nacional ou importada', d: 'O que muda no preço e no resultado', g: 'Respostas rápidas', i: 'cost', k: 'nacional importada nacional x importada diferenca preco marca fabricante' },
    { u: 'quanto-custa-protese-de-quadril.html#materiais', t: 'Prótese de titânio e de cerâmica', d: 'O que o material realmente significa', g: 'Respostas rápidas', i: 'cost', k: 'titanio ceramica material metal polietileno par de atrito' },
    { u: 'quanto-custa-protese-de-quadril.html#parcial', t: 'Prótese só da cabeça do fêmur', d: 'A prótese parcial, e quando ela é usada', g: 'Respostas rápidas', i: 'cost', k: 'parcial hemiartroplastia cabeca do femur preco so a cabeca' },
    { u: 'artrose-de-quadril.html#cura', t: 'Coxartrose tem cura?', d: 'A resposta honesta', g: 'Respostas rápidas', i: 'doc', k: 'cura tem cura reverter cartilagem volta bilateral' },
    { u: 'artrose-de-quadril.html#graus', t: 'Graus da coxartrose', d: 'Grau 1, 2, 3 e 4 no laudo', g: 'Respostas rápidas', i: 'doc', k: 'grau graus leve moderada avancada 1 2 3 4 laudo classificacao' },
    { u: 'protese-de-quadril.html#durabilidade', t: 'Quanto tempo dura uma prótese', d: 'Sobrevida em 10, 20 e 25 anos', g: 'Respostas rápidas', i: 'cut', k: 'dura durabilidade tempo de vida vida util 10 20 anos revisao troca' },
    { u: 'recuperacao-protese-de-quadril.html#precaucoes', t: 'O que não pode fazer depois da prótese', d: 'Precauções de luxação', g: 'Respostas rápidas', i: 'beat', k: 'nao pode fazer proibido precaucoes luxacao cruzar pernas agachar sentar baixo' },
    { u: 'recuperacao-protese-de-quadril.html#dirigir', t: 'Quando posso voltar a dirigir', d: 'E quando voltar ao trabalho', g: 'Respostas rápidas', i: 'beat', k: 'dirigir carro volante trabalhar voltar trabalho tempo' },
    { u: 'como-aliviar-dor-artrose-quadril.html#colageno', t: 'Colágeno funciona para artrose?', d: 'O que a evidência mostra', g: 'Respostas rápidas', i: 'beat', k: 'colageno suplemento glucosamina condroitina funciona vale a pena' },
    { u: 'como-aliviar-dor-artrose-quadril.html#bengala', t: 'Bengala: de que lado usar', d: 'Do lado contrário ao quadril que dói', g: 'Respostas rápidas', i: 'beat', k: 'bengala muleta lado certo esquerdo direito como usar' },
    { u: 'como-aliviar-dor-artrose-quadril.html#dormir', t: 'Como dormir com dor no quadril', d: 'Posições e travesseiro', g: 'Respostas rápidas', i: 'beat', k: 'dormir noite posicao travesseiro deitar de lado insonia' },
    { u: 'bursite-no-quadril.html#infiltracao', t: 'Infiltração funciona na bursite?', d: 'Funciona, mas por pouco tempo', g: 'Respostas rápidas', i: 'dor', k: 'infiltracao corticoide bloqueio injecao funciona bursite' },
    { u: 'dor-na-virilha.html#joelho', t: 'Dor no quadril que aparece no joelho', d: 'Por que o cérebro erra o endereço', g: 'Respostas rápidas', i: 'dor', k: 'joelho dor no joelho irradia irradiada confunde nervo obturatorio' },
    { u: 'artroscopia-de-quadril.html#evidencia', t: 'Artroscopia funciona mesmo?', d: 'Os números dos ensaios clínicos', g: 'Respostas rápidas', i: 'cut', k: 'artroscopia funciona resultado estudo ensaio fashion evidencia vale a pena' },
    { u: 'fratura-de-quadril-no-idoso.html#tempo', t: 'Em quanto tempo operar uma fratura', d: 'Por que a pressa importa', g: 'Respostas rápidas', i: 'doc', k: 'quanto tempo operar fratura urgencia demora espera cirurgia idoso' }
  ];

  var opener = d.querySelector('.qs-open');
  if (opener) {
    var qs = d.createElement('div');
    qs.className = 'qs';
    qs.id = 'quick-search';
    qs.innerHTML =
      '<div class="qs-veil" data-close></div>' +
      '<div class="qs-panel" role="dialog" aria-modal="true" aria-label="Navegação rápida">' +
        '<div class="qs-field">' +
          '<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="11" cy="11" r="7"/><path d="M16.5 16.5L21 21"/></svg>' +
          '<input type="text" id="qs-input" autocomplete="off" autocapitalize="off" spellcheck="false" role="combobox" aria-expanded="true" aria-controls="qs-list" aria-autocomplete="list" placeholder="Buscar um tema: prótese, virilha, custo...">' +
          '<button type="button" class="qs-esc" data-close>ESC</button>' +
        '</div>' +
        '<ul class="qs-list" id="qs-list" role="listbox" aria-label="Resultados"></ul>' +
        '<div class="qs-foot">' +
          '<span><span class="kbd">&uarr;</span><span class="kbd">&darr;</span> navegar</span>' +
          '<span><span class="kbd">Enter</span> abrir</span>' +
          '<span><span class="kbd">Esc</span> fechar</span>' +
        '</div>' +
      '</div>';
    d.body.appendChild(qs);

    var input = qs.querySelector('#qs-input');
    var list = qs.querySelector('#qs-list');
    var sel = 0, items = [], lastFocus = null;

    function norm(s) {
      return (s || '').toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
    }

    // Seções da página atual, para pular direto ao trecho
    var sections = [];
    d.querySelectorAll('.prose h2[id], section h2[id]').forEach(function (h) {
      var txt = h.textContent.replace(/\s+/g, ' ').trim();
      if (txt) sections.push({ u: '#' + h.id, t: txt, d: 'Nesta página', g: 'Nesta página', i: 'hash', k: txt });
    });

    function score(entry, q) {
      var t = norm(entry.t), k = norm(entry.k || ''), dd = norm(entry.d || '');
      if (t.indexOf(q) === 0) return 100;
      if (t.indexOf(q) > -1) return 70;
      if (k.indexOf(q) > -1) return 45;
      if (dd.indexOf(q) > -1) return 30;
      var parts = q.split(/\s+/).filter(Boolean);
      if (parts.length > 1 && parts.every(function (p) { return (t + ' ' + k + ' ' + dd).indexOf(p) > -1; })) return 20;
      return 0;
    }

    function render(q) {
      q = norm(q).trim();
      var pool = sections.concat(PAGES, TOPICS);
      var rows;
      if (!q) {
        rows = PAGES.slice();
      } else {
        rows = pool.map(function (e) { return { e: e, s: score(e, q) }; })
          .filter(function (r) { return r.s > 0; })
          .sort(function (a, b) { return b.s - a.s; })
          .map(function (r) { return r.e; });
      }
      rows = rows.slice(0, 24);
      list.innerHTML = '';
      items = [];
      if (!rows.length) {
        list.innerHTML = '<li class="qs-empty">Nada encontrado. Tente “prótese”, “artrose”, “custo” ou “dor”.</li>';
        return;
      }
      var group = null;
      rows.forEach(function (e, idx) {
        if (e.g !== group) {
          group = e.g;
          var gl = d.createElement('li');
          gl.className = 'qs-group';
          gl.setAttribute('aria-hidden', 'true');
          gl.textContent = group;
          list.appendChild(gl);
        }
        var li = d.createElement('li');
        var a = d.createElement('a');
        a.className = 'qs-item';
        a.href = e.u;
        a.setAttribute('role', 'option');
        a.id = 'qs-opt-' + idx;
        a.innerHTML =
          '<span class="qs-ico"><svg viewBox="0 0 24 24" aria-hidden="true">' + (ICO[e.i] || ICO.doc) + '</svg></span>' +
          '<span class="qs-txt"><span class="qs-t"></span><span class="qs-d"></span></span>' +
          '<span class="qs-go" aria-hidden="true">&rarr;</span>';
        a.querySelector('.qs-t').textContent = e.t;
        a.querySelector('.qs-d').textContent = e.d;
        a.addEventListener('mousemove', function () { mark(items.indexOf(a)); });
        li.appendChild(a);
        list.appendChild(li);
        items.push(a);
      });
      mark(0);
    }

    function mark(i) {
      if (!items.length) return;
      sel = Math.max(0, Math.min(i, items.length - 1));
      items.forEach(function (a, n) {
        a.classList.toggle('sel', n === sel);
        a.setAttribute('aria-selected', n === sel ? 'true' : 'false');
      });
      input.setAttribute('aria-activedescendant', items[sel].id);
      var a = items[sel];
      var box = list.getBoundingClientRect(), r = a.getBoundingClientRect();
      if (r.bottom > box.bottom) list.scrollTop += r.bottom - box.bottom + 8;
      if (r.top < box.top) list.scrollTop -= box.top - r.top + 8;
    }

    function open() {
      lastFocus = d.activeElement;
      qs.classList.add('open');
      d.body.classList.add('no-scroll');
      opener.setAttribute('aria-expanded', 'true');
      input.value = '';
      render('');
      input.focus();
    }
    function close() {
      qs.classList.remove('open');
      d.body.classList.remove('no-scroll');
      opener.setAttribute('aria-expanded', 'false');
      if (lastFocus && lastFocus.focus) lastFocus.focus();
    }

    opener.addEventListener('click', open);
    d.querySelectorAll('[data-qs-open]').forEach(function (b) {
      b.addEventListener('click', function (e) { e.preventDefault(); open(); });
    });
    qs.addEventListener('click', function (e) {
      if (e.target.hasAttribute('data-close')) close();
    });
    input.addEventListener('input', function () { render(input.value); });
    qs.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') { e.preventDefault(); close(); }
      else if (e.key === 'ArrowDown') { e.preventDefault(); mark(sel + 1); }
      else if (e.key === 'ArrowUp') { e.preventDefault(); mark(sel - 1); }
      else if (e.key === 'Home' && items.length) { e.preventDefault(); mark(0); }
      else if (e.key === 'End' && items.length) { e.preventDefault(); mark(items.length - 1); }
      else if (e.key === 'Enter' && items[sel]) { e.preventDefault(); items[sel].click(); }
      else if (e.key === 'Tab') { e.preventDefault(); }
    });

    d.addEventListener('keydown', function (e) {
      var tag = (e.target.tagName || '').toLowerCase();
      var typing = tag === 'input' || tag === 'textarea' || e.target.isContentEditable;
      if ((e.key === 'k' || e.key === 'K') && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        qs.classList.contains('open') ? close() : open();
      } else if (e.key === '/' && !typing && !qs.classList.contains('open')) {
        e.preventDefault();
        open();
      }
    });

    // Mostra o atalho correto conforme o sistema
    if (/Mac|iPhone|iPad/.test(navigator.platform || '')) {
      var kb = opener.querySelector('.kbd');
      if (kb) kb.textContent = '⌘K';
    }
  }
})();
