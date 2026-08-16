# HANDOFF — Projeto quadrilcuritiba.com.br

Documento de transferência de contexto. Leia inteiro antes de produzir qualquer coisa.

**Próxima tarefa combinada: artigo sobre DOR NA VIRILHA.** Detalhes na seção 12.

**Atenção antes de rodar qualquer script:** leia a seção 18. Os arquivos `BUILD-design.css` e `styles.css` do repositório já estiveram desatualizados em relação ao CSS realmente embutido nas páginas, e rodar o `apply_polish.py` nessa condição reverte o design de todas as páginas de uma vez.

---

## 1. O que é o projeto

Site estático informativo de SEO local sobre saúde do quadril, em português do Brasil, hospedado no GitHub Pages no domínio `quadrilcuritiba.com.br`. Gratuito, sem fins comerciais, voltado a pacientes leigos.

**Dono:** Tales Roberto Siqueira Nascimento, R2 de ortopedia e traumatologia no Hospital Angelina Caron, Curitiba, Paraná.

**Objetivo declarado:** chegar à primeira posição do Google para os termos "coxartrose" e "prótese de quadril", dentro das limitações da Etapa 1 (ver abaixo).

**Plano em duas etapas:**
- **Etapa 1 (atual):** hub de informação anônimo. O nome do dono NUNCA aparece no site. Sem Perfil de Empresa no Google, sem schema de médico ou de negócio local.
- **Etapa 2 (futuro):** quando ele se tornar cirurgião de quadril, anexar o nome de forma despretensiosa e ativar o schema médico/negócio local. Esse será o maior salto único de ranqueamento do site, porque conteúdo de saúde (YMYL) com autor identificado e CRM ranqueia estruturalmente melhor.

**Resultado até agora:** a posição média no Search Console subiu de aproximadamente 60 (baseline de 3 meses, antes do redesenho) para aproximadamente 40 após as mudanças recentes.

---

## 2. Preferências do usuário — OBRIGATÓRIAS

- **Nunca usar asteriscos** em respostas no chat (nem para negrito, nem para listas).
- Entregar documentos **100% prontos, sem meta-comentários**.
- Preferência por conteúdo **exaustivo**, não resumido, em material de estudo.
- Design limpo, otimizado para impressão, em materiais de estudo.
- Responder em **português do Brasil**.
- Ele dá liberdade total de criação e espera iniciativa, não perguntas excessivas.

---

## 3. Estado atual: 13 páginas publicadas

| Arquivo | Assunto | Termo-alvo principal |
|---|---|---|
| `index.html` | Home / hub | quadril Curitiba, guia |
| `artrose-de-quadril.html` | Coxartrose: sintomas, graus, tratamento | **coxartrose** (pilar nº 1) |
| `como-aliviar-dor-artrose-quadril.html` | Como aliviar a dor da artrose | como aliviar dor artrose quadril |
| `protese-de-quadril.html` | O que é a artroplastia, tipos, riscos | **prótese de quadril** (pilar nº 2) |
| `quanto-custa-protese-de-quadril.html` | SUS, convênio, particular | quanto custa prótese de quadril |
| `recuperacao-protese-de-quadril.html` | Linha do tempo pós-operatória | recuperação prótese de quadril |
| `dor-no-quadril.html` | Causas de dor no quadril | dor no quadril |
| `bursite-no-quadril.html` | Bursite trocantérica, tendinopatia glútea e dor lateral do quadril | **bursite no quadril** |
| `fratura-de-quadril-no-idoso.html` | Fratura de fêmur proximal no idoso: cirurgia, recuperação, prognóstico | **fratura de quadril no idoso** |
| `protese-de-quadril-vale-a-pena.html` | Artigo sobre estudo de 5 anos | prótese de quadril vale a pena |
| `cirurgioes-curitiba.html` | Espaço de indicação de cirurgiões | cirurgião de quadril Curitiba |
| `sobre.html` | Sobre o site | — |
| `privacidade.html` | Política de privacidade | — |

---

## 4. Como o site é construído — REGRA CRÍTICA

**Cada página HTML é autossuficiente:** o CSS inteiro está inline dentro de uma tag `<style>` e o JavaScript inteiro dentro de uma tag `<script>`, em TODAS as páginas. Os arquivos `styles.css` e `main.js` na raiz existem só como referência/backup; as páginas NÃO os carregam.

Consequência prática: qualquer mudança de design precisa ser propagada para as 13 páginas de uma vez. É para isso que existe o script `apply_polish.py`.

Todos os caminhos são **relativos** (`assets/foo.jpg`, `protese-de-quadril.html`), nunca absolutos.

### Arquivos de build entregues junto com este documento

| Arquivo | O que é | Onde vai no ambiente novo |
|---|---|---|
| `BUILD-design.css` | Sistema de design v2 completo | `/home/claude/design.css` |
| `BUILD-main.js` | JS compartilhado | `/home/claude/newjs.txt` |
| `BUILD-apply_polish.py` | Propaga CSS, JS, marca, nav, rodapé e bloco de contato para todas as páginas | `/home/claude/apply_polish.py` |
| `BUILD-inject.py` | Injeta `{{CSS}}`, `{{JS}}`, `{{MARK}}` numa página nova | `/home/claude/inject.py` |
| `quadrilcuritiba-site-completo.zip` | O site inteiro, versão atual publicada | descompactar em `/home/claude/site/` |

### Sequência de trabalho no ambiente novo

```bash
mkdir -p /home/claude/site
cd /home/claude/site && unzip -q /mnt/user-data/uploads/quadrilcuritiba-site-completo.zip
cp /mnt/user-data/uploads/BUILD-design.css /home/claude/design.css
cp /mnt/user-data/uploads/BUILD-main.js /home/claude/newjs.txt
cp /mnt/user-data/uploads/BUILD-apply_polish.py /home/claude/apply_polish.py
cp /mnt/user-data/uploads/BUILD-inject.py /home/claude/inject.py
```

Para criar uma página nova:
1. Escrever o HTML completo usando `{{CSS}}`, `{{JS}}` e `{{MARK}}` como marcadores.
2. `python3 /home/claude/inject.py /home/claude/site/nova-pagina.html`
3. Adicionar a página à nav e ao rodapé dentro de `apply_polish.py` (as constantes `NAV_NEW` e `FOOTER_TEMAS_NEW`).
4. `python3 /home/claude/apply_polish.py` para propagar a todas as páginas.
5. `cp /home/claude/design.css site/styles.css && cp /home/claude/newjs.txt site/main.js`
6. Atualizar `sitemap.xml`, adicionar links contextuais e card na home.
7. Rodar o QA (seção 8), zipar e entregar.

---

## 5. Identidade visual (sistema de design v2)

**Estética:** "calma clínica" — premium, clara, sem cara de template.

| Token | Valor | Uso |
|---|---|---|
| `--primary` | `#0F5B5E` | verde-petróleo, cor principal |
| `--primary-dark` | `#0B4447` | gradientes de botão |
| `--primary-tint` | `#E1F0EE` | fundos claros |
| `--accent` | `#D9912B` | âmbar, uso pontual |
| `--mail` | `#F0B84A` | botão de contato |
| `--alert` | `#B0503A` | callouts de alerta |
| `--ink` | `#143230` | títulos |
| `--body` | `#3B4F4D` | corpo de texto |
| `--muted` | `#6C7E7B` | texto secundário |
| `--bg` / `--mist` | `#F6F9F9` / `#EAF3F2` | fundos |

**Tipografia:** títulos em Fraunces (serifada, peso 540), corpo em Inter. Carregadas do Google Fonts com preconnect.

**Componentes disponíveis (classes CSS já existentes):**
`.wrap` `.read` `.prose` `.lead` `.eyebrow` `.pill` `.crumbs` `.toc` `.cards` `.cards-3` `.card` `.callout` (variantes `.info` e `.alert`) `.stat-row` `.stat` `.post-fig` `.faq` `.takeaways` `.refs` `.surgeon` `.mailbox` `.altmail` `.paths` `.path` `.split` `.anatomy` `.btn` `.btn-primary` `.btn-ghost` `.btn-mail` `.reveal` `.readbar` `.section-mist` `.section-tint`

**Detalhes de comportamento:** barra de progresso de leitura no topo (âmbar), animação de entrada `.reveal` via IntersectionObserver, menu mobile com breakpoint em 1220px (a nav tem 9 itens; o breakpoint foi de 1040 para 1140 e depois para 1220, e o container do cabeçalho ganhou `max-width` própria de 1240px porque a nav não cabia mais nos 1120px do `.wrap`), `prefers-reduced-motion` respeitado, estilos de impressão.

**Marca:** o usuário criou uma marca própria (pelve estilizada em verde-água e verde-petróleo com ponto âmbar, mais o wordmark "Quadril Curitiba"). Ela está em `assets/marca-quadril-curitiba-simbolo.png` (só o símbolo, usada no hero da home) e `assets/marca-quadril-curitiba.png` (logo completo, reserva). **Em 16 a 34 pixels a marca vira um borrão**, por isso o cabeçalho e o favicon continuam usando o ícone geométrico antigo (o SVG `.mark` embutido em `apply_polish.py`). Não trocar sem redesenhar uma versão simplificada.

---

## 6. Estrutura padrão de uma página de artigo

Ordem fixa, inspirada no Hospital for Special Surgery:

1. `<head>` com title e description únicos, canonical, robots, Open Graph, favicon, preconnect de fontes, `<style>` com o CSS inteiro.
2. Dois blocos `application/ld+json`: `MedicalWebPage` e `FAQPage`.
3. Header fixo com marca, botão de menu mobile e nav de 7 itens.
4. Hero em `.section-tint` com breadcrumb (`.crumbs`), `.pill`, `<h1>` e `.lead`.
5. Índice navegável (`nav.toc`) com lista ordenada de âncoras.
6. Corpo em `.prose` dentro de `.wrap.read`, com `<h2 id="...">` para cada seção.
7. Figuras em `<figure class="post-fig">` com legenda que diz "imagem ilustrativa".
8. Callouts `.callout.info` e `.callout.alert` (o de alerta sempre para sinais que pedem médico).
9. Seção de FAQ em `.section-mist` com `<details>`, espelhando exatamente o schema FAQPage.
10. `.takeaways` ("Em resumo") com 5 a 6 pontos.
11. `.refs` com `<details>` contendo a lista numerada de referências.
12. Bloco `.surgeon` de contato (idêntico em todas as páginas, propagado pelo script).
13. Rodapé com três colunas.

**Cada `<h2>` deve corresponder a uma pergunta real de busca.** Foi isso que fez a posição subir de 60 para 40.

---

## 7. Contato do site

**E-mail: `curitibaquadril@gmail.com`**. O WhatsApp foi removido de todas as páginas (o número antigo era 55 73 99902-7734 — não usar mais).

O botão puro de `mailto:` não abria no navegador do usuário, então o bloco de contato foi refeito e agora tem três saídas:
- botão `.btn-mail` com `data-copy` que copia o endereço para a área de transferência (com fallback em `execCommand`) e mostra "E-mail copiado";
- link "Escrever pelo Gmail" apontando para `mail.google.com/mail/?view=cm&fs=1&to=...`;
- link "usar o app de e-mail" com o `mailto:` tradicional.

O endereço fica visível como texto dentro do botão, então mesmo que tudo falhe o usuário consegue copiar na mão.

---

## 8. QA obrigatório antes de entregar

Rodar sempre este script no diretório do site. Ele já pegou erros reais antes, inclusive schema de FAQ que não espelhava o conteúdo visível.

```python
import re, glob, os, json
from html.parser import HTMLParser
files=sorted(glob.glob('*.html'))
existing=set(os.listdir('.'))|{'assets/'+f for f in os.listdir('assets')}
sitemap=set(re.findall(r'<loc>https://quadrilcuritiba\.com\.br/([^<]*)</loc>', open('sitemap.xml').read()))
errors=[]
class C(HTMLParser):
    def __init__(s): super().__init__(); s.ids=set(); s.dups=[]; s.imgs=[]
    def handle_starttag(s,t,a):
        d=dict(a)
        if 'id' in d:
            if d['id'] in s.ids: s.dups.append(d['id'])
            s.ids.add(d['id'])
        if t=='img': s.imgs.append(d)
def clean(x):
    x=re.sub(r'<[^>]+>',' ',x).replace('&nbsp;',' ').replace('&mdash;','\u2014').replace('&amp;','&')
    return re.sub(r'\s+',' ',x).strip()
for f in files:
    h=open(f).read(); c=C(); c.feed(h)
    if '{{' in h: errors.append(f+': placeholder nao substituido')
    if c.dups: errors.append(f+': ids duplicados '+str(c.dups))
    for m in re.finditer(r'(?:href|src)="([^"#]+?)(#[^"]*)?"', h):
        u=m.group(1)
        if u.startswith(('http','mailto','tel')): continue
        if u not in existing: errors.append(f+': link quebrado '+u)
    for m in re.finditer(r'href="#([^"]+)"', h):
        if m.group(1) not in c.ids: errors.append(f+': ancora inexistente #'+m.group(1))
    types=[]
    for m in re.finditer(r'<script type="application/ld\+json">(.*?)</script>', h, re.S):
        try: types.append(json.loads(m.group(1)).get('@type'))
        except Exception as e: errors.append(f+': JSON-LD invalido '+str(e)[:60])
    for im in c.imgs:
        if not im.get('alt'): errors.append(f+': img sem alt '+im.get('src',''))
    for m in re.finditer(r'<figure class="post-fig"[^>]*>(.*?)</figure>', h, re.S):
        blk=m.group(1)
        if '<svg' in blk and 'aria-labelledby' not in blk and '<img' not in blk:
            errors.append(f+': svg de figura sem aria-labelledby')
    if h.count('id="site-nav"')!=1: errors.append(f+': nav ausente ou duplicada')
    can=re.search(r'rel="canonical" href="https://quadrilcuritiba\.com\.br/([^"]*)"', h)
    if can and can.group(1) and can.group(1)!=f: errors.append(f+': canonical divergente')
    if f not in sitemap and f!='index.html': errors.append(f+': fora do sitemap')
    if 'class="surgeon' in h and 'class="mailbox"' not in h: errors.append(f+': bloco de contato ausente')
    t=re.search(r'<title>(.*?)</title>',h,re.S).group(1)
    d=re.search(r'<meta name="description" content="(.*?)">',h,re.S)
    if len(t)>65: errors.append(f+': title com %d caracteres'%len(t))
    if not d: errors.append(f+': sem description')
    elif len(d.group(1))>160: errors.append(f+': description com %d caracteres'%len(d.group(1)))
    if f!='index.html' and 'BreadcrumbList' not in types: errors.append(f+': sem BreadcrumbList')
    if 'dateModified' not in h: errors.append(f+': sem dateModified')
    if len(re.findall(r'<h1',h))!=1: errors.append(f+': mais de um h1 ou nenhum')
    vis=[clean(x) for x in re.findall(r'<summary>(.*?)</summary>',h,re.S) if not clean(x).lower().startswith('refer')]
    sch=[]
    for m in re.finditer(r'<script type="application/ld\+json">(.*?)</script>', h, re.S):
        try:
            dd=json.loads(m.group(1))
            if dd.get('@type')=='FAQPage': sch=[q['name'] for q in dd['mainEntity']]
        except Exception: pass
    if vis!=sch: errors.append(f+': FAQ schema nao espelha o FAQ visivel')
print('ARQUIVOS:',len(files)); print('ERROS:' if errors else 'TUDO CERTO')
for e in errors: print(' -',e)
```

## 9. Regras de conteúdo — CFM e ética médica

Inegociáveis:
- **Nunca citar o nome do dono** enquanto estivermos na Etapa 1.
- **Nunca prometer resultado.** Sempre apresentar benefícios e riscos juntos.
- Tom leigo, acolhedor, sem linguagem de marketing.
- Sem depoimentos, sem fotos reais de pacientes. Toda imagem é ilustrativa e a legenda diz isso.
- Valores monetários são referência de estudos e mercado, nunca orçamento.
- Sempre citar as fontes científicas na seção de referências.
- Sempre incluir um callout de alerta com os sinais que exigem avaliação médica.

Uma marca registrada do site que vem dando certo: **honestidade com os números**. Quando a evidência é fraca, dizemos que é fraca. A página de alívio da dor mostra que o efeito do exercício fica abaixo do limiar clínico e explica por que ainda vale a pena. Isso diferencia o site de toda a concorrência em português e é o tipo de coisa que o Google premia em conteúdo de saúde.

---

## 10. Fluxo de publicação

1. Claude entrega um zip com o site inteiro pronto.
2. O usuário descompacta e sobe por cima do repositório no GitHub.
3. **Nunca apagar:** `CNAME`, `.nojekyll`, e os assets que existem só no GitHub e não vêm no zip (`assets/og-image.png`, `assets/favicon.svg`, `assets/idosa-dor-no-quadril.jpg`, `assets/quadril-saudavel-vs-artrose.jpg`).
4. No Search Console: reenviar `https://quadrilcuritiba.com.br/sitemap.xml` e solicitar indexação da URL nova, das páginas que ganharam links contextuais novos e da home.

**Ritmo combinado:** uma postagem a cada 1 ou 2 semanas até fechar o cluster, depois cerca de uma por mês mais melhorias nas páginas existentes.

---

## 11. Estratégia de SEO

**A tese central:** quem tem coxartrose não busca "coxartrose" no começo — busca a dor. Por isso criamos páginas satélite que capturam a busca de sintoma e de alívio, e todas apontam para o pilar de coxartrose. É assim que se ganha um termo competitivo: cercando-o.

**O gargalo real** continua sendo autoridade de domínio (idade e backlinks), não conteúdo. Alavancas possíveis dentro da Etapa 1:
- pedir a cada cirurgião que entrar na lista que linke o site no dele ou no Instagram;
- compartilhar os artigos em grupos e comunidades de Curitiba, como pessoa que achou útil, sem spam;
- cadastrar no Bing Webmaster Tools (importa a verificação do Google em um clique);
- fechar o cluster temático, que é o que estamos fazendo.

**Método de calibragem:** no Search Console, olhar as consultas em posição 8 a 25 — essas são as brigas ganháveis. Otimizar onde o Google já quase mostra o site rende mais que criar página nova. Filtrar por página, não só a média geral.

**Melhorias técnicas ainda não feitas:** schema `BreadcrumbList`, data visível de "última revisão" nos artigos.

---

## 12. PRÓXIMA TAREFA: dor na virilha

A página de fratura de quadril no idoso foi publicada em 31/07/2026 (ver seção 17). A próxima da fila passa a ser **dor na virilha**.

**Arquivo sugerido:** `dor-na-virilha.html`

**Por que essa página:** é o sintoma mais específico da coxartrose e quase ninguém faz a associação. Satélite de altíssima precisão, com concorrência fraca em português — os resultados atuais falam quase só de hérnia inguinal e pubalgia. Era a recomendação número 1 antes de o usuário escolher fratura.

**Seções sugeridas (cada uma é uma busca real):**
- por que a dor da artrose do quadril aparece na virilha, e não no lado de fora
- o teste do C: como as pessoas mostram a dor com a mão em C sobre o quadril
- dor na virilha ao andar, ao levantar da cadeira, ao calçar meia, ao entrar no carro
- dor na virilha nos dois lados
- as outras causas: hérnia inguinal, pubalgia, tendinite dos adutores, impacto femoroacetabular, dor irradiada da coluna, causas urológicas e ginecológicas
- como o médico diferencia (exame físico, radiografia, quando pedir ressonância)
- sinais de alerta
- o que fazer enquanto espera a consulta

**Links internos a criar:** para `artrose-de-quadril.html` (o destino principal), `dor-no-quadril.html`, `como-aliviar-dor-artrose-quadril.html`, `bursite-no-quadril.html` (contraste virilha x lateral, que já está escrito lá) e `fratura-de-quadril-no-idoso.html` (dor na virilha após queda em idoso).

## 13. Fila de conteúdo depois dessa

Em ordem de prioridade discutida:

1. **O que não pode fazer depois da prótese de quadril** — busca altíssima e recorrente, hoje diluída dentro da página de recuperação. Fácil de escrever, retorno rápido.
2. **Quanto tempo dura uma prótese de quadril** — pergunta muito buscada, tem dados de registro nacional bons.
3. **Preparação para a cirurgia (ERAS)** — público pequeno mas qualificado, material já absorvido.
4. **Dor no quadril à noite** — muito específica, pouca concorrência boa.
5. **Coxartrose grau 2 e grau 3** — as pessoas buscam pelo grau exato do laudo; talvez expandir a página existente em vez de criar nova.
6. Artroscopia de quadril e impacto femoroacetabular.

---

## 14. Base científica já absorvida e usada no site

- **Guimarães 2022**, Acta Ortopédica Brasileira — 7.673 artroplastias no SUS de São Paulo entre 2008 e 2019; 81% não cimentada ou híbrida; repasse do SUS maior na não cimentada; internação 0,87 dia maior na cimentada; sem diferença de mortalidade.
- **Viamont-Guerra 2025**, Acta Ortopédica Brasileira — 1.061 pacientes em hospital privado de São Paulo; custo total médio R$ 43.324, variando de R$ 16.868 a R$ 147.082; qualidade de vida (EQ-5D) de 0,49 para 0,89 em dois anos; HOOS de 54,5 para 90,4; internação média 4,6 dias; **sem associação entre custo e qualidade de vida**.
- **Cochrane CD007912, Hall 2026** — exercício na coxartrose: 18 estudos, 1.368 participantes; melhora de cerca de 7 pontos em 100 na dor e 9 na função, **abaixo do limiar clínico** de 12 e 13; nenhum tipo de exercício superior a outro; cerca de 2 eventos adversos em 100.
- **Teirlinck 2023**, Osteoarthritis and Cartilage Open — metanálise cumulativa; efeito pequeno e de relevância clínica incerta; só um estudo com 74.843 participantes mudaria a conclusão.
- **Material de decisão compartilhada do NHS com Versus Arthritis, 2022** — números por 100 pessoas: anti-inflamatório 57 melhoram e 21 têm problemas gastrointestinais; infiltração 50 melhoram e 13 têm dor ou infecção; exercício 47 melhoram e 2 têm efeito adverso; placebo 21 a 47 melhoram; opioides fracos 47 melhoram e 60 a 70 têm efeitos gastrointestinais; 7 em 100 precisam de revisão da prótese em 15 anos; 87 em 100 dizem que o quadril ficou muito melhor após a cirurgia; cerca de 1 em 10 opera na primeira década após o diagnóstico.
- **Frydendal 2024**, New England Journal of Medicine — prótese superior ao fortalecimento na coxartrose grave.
- **Learmonth 2007**, The Lancet — "a cirurgia do século".
- Shan 2014, Mariconda 2011, Neuprez 2020 — qualidade de vida após artroplastia.
- Chen 2023 e Aprisunadi 2023 — protocolos ERAS e mobilização precoce.
- Bieler 2017 — caminhada nórdica superior a musculação na função.

**Fratura de quadril no idoso (absorvidos em 31/07/2026):**
- **Choi 2017**, Scientific Reports 7:42966 — Hip-MFS, 481 idosos coreanos operados; mortalidade 1,2% em 1 mês, 7,3% em 6 meses, 13,9% em 1 ano, 34,9% ao fim do seguimento; 38% com pelo menos uma complicação, delirium em 162 de 481 (cerca de um terço); AUC do escore de fragilidade 0,784 contra 0,586 da idade e 0,661 da ASA; mortalidade em 6 meses de 18,8% nos frágeis contra 3,6% nos não frágeis; mediana de espera pela cirurgia de 98 horas.
- **Wu 2023**, Scientific Reports 13:11091 — nomograma, 2.333 pacientes em Taiwan com 50 anos ou mais; mortalidade em 1 ano de 11,74%; preditores: idade ≥85 (HR 1,79), sexo masculino (2,13), internação >15 dias (3,17), transfusão >2 unidades (1,33), hemoglobina <10 (1,43), plaquetas <100 mil (2,04), TFG <60 (2,02); AUC 0,717; cita mortalidade em 1 ano de 15 a 36% na literatura.
- **Yang 2025**, Scientific Reports 15:22241 — índice prognóstico nutricional (albumina + 5 × linfócitos) em 2.115 idosos chineses; ponto de inflexão em 50,3; abaixo dele, cada unidade a mais reduz a mortalidade em 6%; 1.529 transtrocantéricas contra 586 do colo; 96% das fraturas por queda simples; 68% mulheres; idade média 79,4 anos.
- Citados sem PDF, de conhecimento consolidado: HEALTH Investigators 2019 (NEJM, prótese total contra parcial), HIP ATTACK 2020 (Lancet, cirurgia acelerada), Lyles 2007 (NEJM, ácido zoledrônico reduz nova fratura e mortalidade), Bhandari e Swiontkowski 2017 (NEJM), Berry 2019 (JAMA), Moran 2005 (JBJS), Smith 2014 (Age and Ageing), NICE CG124.

**Bursite e tendinopatia glútea (absorvidos em 16/08/2026):**
- **Bremer 2025**, Clinical Rehabilitation 39(5):600-617 — revisão sistemática de eficácia; 2.825 estudos triados, 27 avaliados, 13 excluídos por alto risco de viés, 11 mantidos; 934 participantes, 94,7% mulheres. Exercício com educação: efeito médio sobre dor (SMD 0,95; IC 0,58-1,33) e função (0,91; 0,53-1,28) no curto prazo, pequeno no médio e longo. Corticoide: efeito pequeno sobre dor no curto prazo (0,51; 0,16-0,86), nulo depois. Ondas de choque focadas superiores ao corticoide para dor em 12 meses. PRP superior ao corticoide para função no curto prazo (0,46; 0,00-0,91).
- **Cordeiro 2024**, Scientific Reports 14:3343 — metanálise; 5 estudos, 383 participantes na análise quantitativa, 78% mulheres. Exercício superior a intervenção mínima para função no curto prazo (MD 10,24; IC 5,98-14,50) e longo prazo (6,54; 1,88-11,21); sem diferença em qualidade de vida; dor equivalente ao corticoide. GRADE baixo a muito baixo. Traz os desfechos do LEAP: exercício com maior taxa de sucesso que corticoide (+19,9% em 8 semanas, +20,4% em 52 semanas) e que esperar (+49,1% e +26,8%); corticoide superior a esperar em 8 semanas (+29,2%) mas não em 52 (+6,4%; IC -10,7 a 23,6).
- **Ladurner 2021**, Orthopaedic Journal of Sports Medicine 9(7) — recomendação por estágio; 27 estudos, 1.103 pacientes, idade média 53,7 anos, IMC 28,3, proporção mulher:homem 7:1. Graus de Bhabra (1 bursite, 2 tendinopatia, 3 ruptura parcial, 4 ruptura completa). Complicação cirúrgica média 10%, revisão 4,5%; bursectomia até 8%; osteotomia de redução trocantérica 30% e desaconselhada. Sucesso percebido do exercício em 12 meses: 78,6%.
- **Pianka 2021**, SAGE Open Medicine 9 — incidência 1,8 por 1.000 adultos por ano; predomínio feminino de 2 a 3 para 1; Long 2013 com 877 pacientes ao ultrassom (49,9% tendinopatia, 29,1% banda iliotibial, 20,2% bursa, apenas 8,1% bursite isolada); Bird com RM em 24 pacientes (62,5% tendinopatia, 45,8% ruptura, 8,3% bursite); testes clínicos com sensibilidade e especificidade; RM com acurácia de 91% para rupturas mas edema peritrocantérico presente em 65% a 88% de quadris assintomáticos; radiografia sens 64% esp 26%; Rompe com a inversão de resultados entre 1 mês e 15 meses (corticoide 75% para 48%, ondas de choque 13% para 74%, exercício em casa 7% para 80%).
- **Reid 2016**, Journal of Orthopaedics 13(1):15-28 — tratamento conservador como padrão-ouro, com mais de 90% de sucesso; ausência de protocolo definido; Brinks 2011 com 55% x 34% em 3 meses e 61% x 60% em 12 meses.
- **Nasser 2021**, IJSPT 16(2):288-305 — tendinopatia do isquiotibial proximal; 12 estudos, só 2 ECRs; evidência insuficiente para recomendar qualquer intervenção; ondas de choque superiores a multimodal em atletas (retorno ao esporte em 9 semanas, contra nenhum retorno em 1 ano); corticoide sem melhora além de 3 meses em 56%; cirurgia com 10% de complicações.

**Pendência:** o usuário tem um artigo da ScienceDirect (identificador `S0049017225002264`, revista Seminars in Arthritis and Rheumatism) sobre colágeno que não foi possível abrir por bloqueio e paywall. Se ele enviar o PDF, incorporar os números na seção de colágeno da página de alívio da dor.

---

## 15. Imagens do site

Em `assets/`, todas otimizadas:

| Arquivo | Uso | Origem |
|---|---|---|
| `idosa-dor-quadril-casa.jpg` | página de coxartrose | gerada por IA, cartoon |
| `idosa-fisioterapia-quadril.jpg` | páginas de custo e de alívio da dor | gerada por IA, cartoon |
| `protese-total-quadril-componentes.jpg` | página de custo | diagrama gerado por IA, rótulos corretos |
| `marca-quadril-curitiba-simbolo.png` | hero da home | marca criada pelo usuário |
| `marca-quadril-curitiba.png` | reserva, logo com wordmark | marca criada pelo usuário |
| `anatomia-bursite-tendinite-quadril.svg` | página de bursite e tendinite | esquema vetorial em camadas criado do zero nas cores da marca, com o osso, os tendões glúteos, a bursa e a banda iliotibial; SVG, escala livre, cerca de 5 KB |
| `raio-x-fratura-colo-femur.jpg` | página de fratura no idoso | radiografia real de bacia AP, sem qualquer dado de identificação, fornecida pelo usuário; 1008x840, ~80 KB |

Padrão de otimização: JPEG progressivo, 1200 pixels de largura, aproximadamente 100 KB. PNGs com transparência quantizados em 48 cores.

Existem no GitHub mas não no zip (não apagar): `og-image.png`, `favicon.svg`, `idosa-dor-no-quadril.jpg`, `quadril-saudavel-vs-artrose.jpg`.

---

## 16. Como começar o próximo chat

Enviar para o novo chat, junto da primeira mensagem:
1. este documento (`HANDOFF-quadrilcuritiba.md`);
2. `quadrilcuritiba-site-completo.zip`;
3. os quatro arquivos `BUILD-*`;
4. os artigos científicos sobre fratura de quadril, se houver.

E dizer algo como: "Vamos fazer o artigo sobre fratura de quadril no idoso. Leia o handoff primeiro."

---

## 17. Registro da entrega de 31/07/2026 — fratura de quadril no idoso

**Publicado:** `fratura-de-quadril-no-idoso.html`, cerca de 5.500 palavras, 14 seções H2, 8 perguntas no FAQ, duas figuras.

**O que mudou no resto do site nessa entrega:**
- `design.css` / `styles.css`: breakpoint do menu mobile de 1040px para 1140px, para caber o oitavo item da nav.
- `apply_polish.py`: as constantes `NAV_NEW` e `FOOTER_TEMAS_NEW` ganharam o item "Fratura no idoso" / "Fratura de quadril no idoso". Rodado em todas as 12 páginas.
- `index.html`: novo card "Fratura de quadril no idoso" com a etiqueta "Urgência", ao final da grade de temas.
- Links contextuais novos apontando para a página: `dor-no-quadril.html` (dois: na lista de causas e antes de "quando procurar o médico"), `protese-de-quadril.html` (parágrafo de abertura), `artrose-de-quadril.html` (fatores de risco), `recuperacao-protese-de-quadril.html` (parágrafo introdutório distinguindo cirurgia eletiva de urgência).
- `sitemap.xml`: entrada nova com prioridade 0.9 e `lastmod` atualizado nas páginas tocadas.
- Asset novo: `assets/raio-x-fratura-colo-femur.jpg`.
- Adicionado schema `BreadcrumbList` na página nova. As outras 11 ainda não têm — é a próxima melhoria técnica fácil.

**No Search Console, submeter:** o sitemap, mais indexação de `fratura-de-quadril-no-idoso.html`, `dor-no-quadril.html`, `protese-de-quadril.html`, `artrose-de-quadril.html`, `recuperacao-protese-de-quadril.html` e a home.

**Decisões editoriais que valem manter no tom:**
- O público-alvo declarado no primeiro parágrafo é o filho ou a filha com o pai ou a mãe internado, não o paciente.
- Os números de mortalidade estão explícitos, mas sempre seguidos do enquadramento de que descrevem populações e não pessoas, e de que a fragilidade prévia prevê o desfecho muito melhor do que a idade.
- Existe uma seção final ("Uma nota sobre os números desta página") avisando que as coortes são asiáticas e que não há base brasileira equivalente publicada.
- A cirurgia é apresentada como forma de tirar a pessoa da cama, não apenas de consertar o osso — é o enquadramento que mais reduz a angústia da família.


---

## 18. Registro da entrega de 16/08/2026 — bursite e tendinite, mais uma faxina de SEO técnico

**Publicado:** `bursite-no-quadril.html`, cerca de 6.850 palavras, 17 seções H2 de conteúdo, 8 perguntas no FAQ, um diagrama vetorial próprio.

**Ângulo editorial escolhido, e vale manter:** o gancho da página é que, em 877 pacientes examinados por ultrassom, apenas 8,1% tinham bursite isolada. Ou seja, "bursite no quadril" quase nunca descreve o problema real, que é tendinopatia glútea. Nenhum concorrente em português diz isso. É a mesma marca registrada do site (honestidade com os números) aplicada a um termo de busca alto.

**Bug real corrigido antes de qualquer coisa:** o `BUILD-design.css` e o `styles.css` do repositório estavam atrás do CSS embutido nas páginas (20.069 contra 22.204 caracteres). Rodar o `apply_polish.py` naquele estado teria revertido os refinamentos de cabeçalho em todas as páginas. O CSS e o JS foram reextraídos das páginas e regravados em `design.css`, `styles.css`, `BUILD-design.css` e `main.js`. **Sempre conferir isso antes de rodar o script:** o inline das páginas é a fonte da verdade, não os arquivos soltos.

**Mudanças de design propagadas:**
- Breakpoint do menu mobile de 1140px para 1220px e `max-width` de 1240px só para o `.wrap` do cabeçalho, porque a nav com 9 itens não cabia nos 1120px padrão. Validado em 1221, 1280, 1440 e 1920 pixels com navegador real.
- `.nav a` com fonte 0.92rem e padding lateral de 10px, `gap` de 1px, `padding-left` de 14px.
- Rótulos da nav encurtados: "Coxartrose" virou "Artrose" (que é o termo mais buscado), "Aliviar a dor" virou "Aliviar dor", "Fratura no idoso" virou "Fratura". Entrou "Bursite".
- Corrigido o `top` do menu mobile de 68px para 72px, que estava desalinhado com a altura real do cabeçalho.
- `.paths` da home passou de 4 colunas fixas para `auto-fit`, e ganhou um quinto atalho: "Dói na lateral do quadril".
- Classe nova `.revdate`, usada na data visível de última revisão.
- Classes novas `.figscroll` e `.figscroll-hint`, para diagramas vetoriais embutidos.

**SEO técnico aplicado ao site inteiro:**
- `BreadcrumbList` nas 12 páginas internas (antes só a de fratura tinha).
- `MedicalWebPage` ou `WebPage` criado onde faltava: `dor-no-quadril`, `protese-de-quadril`, `recuperacao-protese-de-quadril`, `cirurgioes-curitiba`, `sobre`, `privacidade`.
- `dateModified` em todas as páginas, `datePublished` na de fratura (31/07/2026) e na de bursite (16/08/2026), mais `publisher` como Organization. Data visível "Revisado em" nas páginas de conteúdo.
- `WebSite` schema na home.
- **Todos os FAQPage foram regerados a partir do FAQ visível de cada página.** Sete páginas tinham schema que não espelhava as perguntas exibidas, com texto diferente e perguntas faltando, o que faz o Google suprimir o rich result. Agora o QA valida esse espelhamento automaticamente.
- Meta descriptions acima de 160 caracteres reescritas em 7 páginas; títulos acima de 65 caracteres encurtados em 3 (home, prótese, aliviar a dor).
- Removidos `assets/styles.css` e `assets/main.js`, que eram resquícios do design antigo e não eram carregados por ninguém.

**Diagrama embutido, e não referenciado como arquivo.** O esquema anatômico da página de bursite está como `<svg>` inline dentro do `<figure>`, e não como `<img src="assets/...">`. O motivo é concreto: na primeira publicação o arquivo em `assets/` não chegou ao servidor e a figura quebrou, enquanto o resto da página, cujo CSS já é inline, apareceu perfeito. Embutir o SVG segue o mesmo princípio das outras páginas (cada página é autossuficiente) e elimina essa classe de falha. O arquivo `assets/anatomia-bursite-tendinite-quadril.svg` continua no repositório como fonte editável, mas a página não depende dele. Em telas de até 700px o diagrama rola na horizontal, com aviso visível só no celular. Se criar novos diagramas, siga esse padrão e mantenha `role="img"` com `aria-labelledby`, porque o QA agora exige.

**Sobre o FAQPage, uma correção importante:** os rich results de FAQ foram descontinuados pelo Google em maio de 2026, com remoção completa do suporte em agosto de 2026. O espelhamento do schema com o FAQ visível continua valendo por consistência e por legibilidade para assistentes de IA, mas não gera mais caixa expandida no resultado de busca. Não invista tempo esperando esse retorno. O `BreadcrumbList` continua ativo e aparece como caminho de navegação.

**Links contextuais novos para a página de bursite:** `dor-no-quadril.html` (dois, na lista de causas e no mapa de localização da dor), `artrose-de-quadril.html` (parágrafo de diferenciação), `index.html` (card novo com etiqueta "Dor lateral", atalho novo em `.paths` e parágrafo na seção de doenças).

**No Search Console, submeter:** o sitemap, mais indexação de `bursite-no-quadril.html`, `dor-no-quadril.html`, `artrose-de-quadril.html` e a home. As demais páginas mudaram só em schema e meta, e serão recolhidas naturalmente.

**QA:** o script da seção 8 ganhou quatro verificações novas e deve substituir a versão antiga. Além dos testes originais, ele agora falha se: o título passar de 65 caracteres, a description passar de 160, faltar `BreadcrumbList` ou `dateModified`, houver mais de um `h1`, ou o FAQPage não espelhar exatamente as perguntas visíveis. Rodou limpo nas 13 páginas.

**O maior gargalo de conteúdo que sobra, e a próxima grande alavanca:** as páginas-pilar estão magras para o que se quer ranquear. `protese-de-quadril.html` tem cerca de 1.230 palavras e é o alvo do termo número 2 do site; `recuperacao-protese-de-quadril.html` tem 980; `dor-no-quadril.html` tem 830; `artrose-de-quadril.html`, o pilar número 1, tem 1.820. Para comparação, a página de fratura tem 5.600 e a de bursite 6.850. Expandir `protese-de-quadril.html` e `artrose-de-quadril.html` ao padrão das duas páginas novas provavelmente rende mais posição do que qualquer artigo inédito da fila.
