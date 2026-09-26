# quadrilcuritiba.com.br

Guia de saúde e cirurgia do quadril em Curitiba: prótese, artrose, artroscopia, dor e recuperação. Site estático gerado em **TypeScript**, publicado pelo GitHub Pages a partir da raiz deste repositório.

## Como funciona

```
src/
  site.config.ts          configuração central (inclui o "interruptor" da Etapa 2)
  content/articles/       um artigo = <slug>.ts (metadados, FAQ, resumo, referências) + <slug>.html (texto)
  data/                   navegação, busca, diretório de cirurgiões
  lib/                    tipos, schema.org (JSON-LD), utilidades de HTML
  templates/              layout, cabeçalho, rodapé, componentes, ícones
  pages/                  home, artigo, biblioteca, cirurgiões, sobre, privacidade, 404
  client/                 TypeScript do navegador (busca, índice, filtros, tema, ficha) → assets/app.js
  styles/                 sistema de design (CSS embutido em cada página no build)
  figures/                diagramas SVG originais (fonte editável)
scripts/
  build.ts                gera todas as páginas, sitemap.xml, robots.txt, site.webmanifest e o índice da busca
  qa.ts                   QA obrigatório: SEO, links, âncoras, schema, FAQ espelhado, nome do dono ausente
  uitest.ts               testes de comportamento no Chromium
  shots.ts, clip.ts       capturas de tela (desktop, celular, tema escuro)
  serve.ts                servidor local
```

O HTML gerado fica na raiz (`index.html`, `protese-de-quadril.html`...), com as **mesmas URLs de sempre**, para não perder posição no Google.

## Comandos

```bash
npm install          # uma vez
npm run build        # gera o site
npm run qa           # confere tudo antes de publicar
npm test             # tipagem + build + QA
npm run serve        # http://localhost:4173
npm run uitest       # testes de comportamento (precisa do Chromium)
npm run shots        # capturas em shots/
```

O GitHub Actions roda tipagem, build e QA em cada push e falha se o HTML da raiz não corresponder ao código-fonte.

## Tarefas comuns

**Editar o texto de um artigo:** `src/content/articles/<slug>.html`. FAQ, resumo e referências ficam em `<slug>.ts`. O schema FAQPage é gerado a partir do mesmo dado do FAQ visível, então os dois nunca divergem.

**Criar um artigo novo:** copie um par `.ts` + `.html`, ajuste os campos, importe o artigo em `src/content/articles/index.ts` e, se quiser, adicione-o ao rodapé em `src/data/nav.ts`. Card na home, biblioteca, busca, sitemap e "Leia também" são automáticos.

**Incluir um cirurgião no diretório:** confira CRM e RQE no portal do CFM e preencha o modelo em `src/data/surgeons.ts`. Card, filtros e schema `Physician` são gerados sozinhos.

**Etapa 2 (site no nome do médico):** preencha `doctor` em `src/site.config.ts`. O build passa a exibir a assinatura com CRM e RQE nos artigos, a incluir `author` e `reviewedBy` no schema e o schema `Physician` na home e na página Sobre. Enquanto `doctor` for `null`, o QA falha se o nome do dono aparecer em qualquer página.

## Não apagar

`CNAME` (domínio próprio), `.nojekyll`, `favicon.ico` e a pasta `assets/`.
