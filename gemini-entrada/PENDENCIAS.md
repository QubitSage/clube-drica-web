# PENDÊNCIAS — Clube Drica (etapa 4.5)

Site: página de vendas de uma página só (`index.html`), estática, publicada no GitHub Pages (domínio do `CNAME`). Branch de partida: `gemini/entrada`.

## 1. Resumo

Pedido do Bruno: remontar a página de vendas do Clube Drica em cima da referência BLOOP (Behance 258302711), "azul cobalto e coral vibrante com energia jovem, divertida e super comunitária", e depois dar vida a ela.

| Item | Estado |
|---|---|
| Estrutura e visual BLOOP em todas as seções | pronto |
| Todo o conteúdo do site antigo (textos, preços, checkout, FAQ, pixels) | pronto |
| Movimento e estados (etapa 3) | pronto |
| Celular (390 px) e desktop (1440 px) | pronto |
| Imagens hospedadas no próprio site | parcial (19 imagens vêm de outro domínio, ver 4) |
| Vídeo "Confira uma amostra" | não existe (falta o ID do YouTube, ver 4) |
| Logo, favicon e imagem de compartilhamento | parcial (wordmark provisório; favicon é sobra do site antigo; sem `og:image`) |
| Página 404 | não existe |

Total: 5 prontos, 3 parciais, 2 não existem.

## 2. Para o Gemini gerar (assets) → passada 3

Estilo de todos: chapado (sem sombra nem gradiente), paleta e fontes de `contrato/tokens.md`, adesivos no estilo dos SVG `#i-star`, `#i-flower`, `#i-ast`, `#i-bolt` do `index.html`. Proibido em todos: foto de pessoa, logo de terceiros, gradiente roxo, cara de banco de imagem, o nome "Mariana Bovolon".

| Arquivo | Onde entra | Tamanho | Estilo | Fundo | Proibido |
|---|---|---|---|---|---|
| `images/og-clube-drica.jpg` | `<meta property="og:image">` e `twitter:image` (compartilhamento no WhatsApp, Instagram, Facebook) | 1200 × 630, JPG ≤ 200 KB | Azul `#3C6CF0` quadriculado como o hero, wordmark "Drica" em Bagel Fat One, frase "Transforme a sua alimentação" em Archivo 900 caixa alta, 2 adesivos (estrela rosa, flor coral) | Azul do hero | Preço na imagem, texto pequeno ilegível no celular |
| `images/favicon.svg` + `images/favicon-32.png` + `images/apple-touch-icon.png` (180 × 180) + `images/icon-192.png` + `images/icon-512.png` | `<link rel="icon">` e `apple-touch-icon` (hoje apontam para `green-energy-*.png`, sobra do site antigo) | os tamanhos ao lado | Letra "D" do wordmark em Bagel Fat One, branca sobre círculo azul `#3C6CF0`, com uma estrelinha rosa | Transparente fora do círculo | Folha verde do ícone antigo |
| `images/fallback-print.svg` | Usado pela tarefa 1 da passada 1 quando um print de depoimento não carrega | 473 × 1024 (mesma proporção dos prints) | Cartão rosa `#F0548F` com aspas grandes brancas e o texto "Depoimento de aluna" em Urbanist | Liso | Rosto, texto inventado de depoimento |

Não é para o Gemini gerar (precisa ser real, vem do cliente, ver seção 4): logo oficial, capas dos e-books, prints de depoimento, fotos das alunas, foto da Adriana, imagens dos cardápios e módulos bônus.

## 3. Para o Gemini implementar → passada 1 (em ordem)

1. **Imagens de outro domínio não podem quebrar a página.**
   - O quê: se uma imagem de `marianabovolon.com.br` não carregar, o lugar dela mostra um substituto no estilo da marca (o print de depoimento usa `images/fallback-print.svg`; capas, cardápios e módulos usam um bloco na cor do cartão com o título já existente), em vez do ícone de imagem quebrada ou de um buraco.
   - Onde: `index.html`, seções `#vantagens`, `#cardapios` (abas bônus), `#pessoas` (crachás `.badge`), `#bonus`.
   - Pronto quando: com o domínio bloqueado (Playwright `page.route(/marianabovolon/, r => r.abort())`), nenhuma imagem quebrada em 1440 e 390, a altura das seções não muda (CLS continua ≤ 0,01) e o layout bate com `contrato/prints/`. Como o SVG do fallback só nasce na passada 3, use por enquanto um bloco rosa com o mesmo tamanho.
   - Não mexer: as URLs atuais das imagens (só o cliente pode trocar), textos e ordem.
2. **Metatags de compartilhamento.**
   - O quê: `og:title`, `og:description`, `og:type=website`, `og:url` (domínio do `CNAME`), `og:image` (`images/og-clube-drica.jpg`, criado na passada 3), `og:locale=pt_BR`, `twitter:card=summary_large_image`. Título e descrição são os que já estão em `<title>` e `<meta name="description">`.
   - Pronto quando: as tags existem e um validador (ex.: `npx open-graph-scraper` ou inspeção do HTML) lê título, descrição e imagem.
   - Não mexer: `<title>` e `description`.
3. **Página 404.**
   - O quê: `404.html` na raiz, usando o mesmo CSS de tokens, com o wordmark "Drica", a frase "Página não encontrada" em Archivo 900 e o botão rosa "Voltar para o início" para `/`. Sem pixels de anúncio.
   - Pronto quando: abre sem erro em 390 e 1440 com as fontes do repo, e o botão leva para `/`.
4. **Caça de bugs com os detectores.**
   - O quê: rodar `ferramentas/cacar.mjs` (servir o site por `npx serve` ou `python3 -m http.server`, não por `file://`, senão as fontes falham por CORS) e confirmar cada achado no print. A linha de base está em `contrato/detectores-linha-de-base.json`: 30 sobrepostos (a maioria é proposital: cartões girados e sobrepostos, adesivos, monte de pílulas), 7 cortados em 1440 e 14 em 390 (conferir um a um), 6 "quase alinhados" em 1440. A aba ativa de cardápio ser mais alta (60 × 52 px) é proposital (aba-pasta).
   - Pronto quando: cada achado está corrigido na causa ou marcado no relatório como proposital, com print.
   - Não mexer: rotação dos cartões, pílulas e adesivos (vem da referência).

## 4. Para o Bruno ou o cliente fornecer

Nada aqui bloqueia o Gemini; tudo bloqueia o lançamento. O site não lê nenhuma variável de ambiente nem chave secreta.

- [ ] **Imagens próprias da Adriana** (bloqueia lançamento): hoje 19 imagens vêm de `marianabovolon.com.br` (prints DEPO1–8, capas dos 4 e-books, 2 imagens de vantagens, 2 de bônus de cardápio). As capas mostram o nome "Mariana Bovolon". Pedir as capas, prints e imagens da Adriana para hospedar em `images/`.
- [ ] **IDs de pixel e analytics** (bloqueia lançamento): Facebook `2999795973667393`, GA `G-Y64D7ERVPM`, Ads `AW-16875532386`, GTM `GTM-PQL5GGF`, TikTok `D21CC1RC77U0KS93QQKG` vieram com a página copiada e o GA aponta para `marianabovolon.com.br`. Confirmar se são da Adriana ou trocar. (IDs de pixel são públicos, não são segredo.)
- [ ] **ID do vídeo de amostra** no YouTube (a seção saiu até chegar).
- [ ] **Logo oficial** (hoje: wordmark "Drica" provisório).
- [ ] **Fotos das 3 alunas** dos depoimentos de texto (Mariana, Juliana, Amanda); hoje só a inicial.
- [ ] **Número de alunas**: o site diz "+ de 20.000" e a bio diz "mais de 15.000" no Marmita Express. Qual vale.
- [ ] **Nomes dos cardápios 1 a 7** (só o 8 tinha nome no site antigo).
- [ ] **Conta Cakto**: confirmar que `ij3ekbu_416993` é o produto certo da Adriana.
- [ ] **Domínio**: o `CNAME` aponta para o domínio atual; confirmar DNS no GitHub Pages antes de publicar.

## 5. Fora do escopo (para o Bruno decidir)

- Disparar evento `InitiateCheckout` dos pixels no clique dos botões de compra (muda integração).
- Seção do vídeo de amostra (volta quando chegar o ID).
- Aviso de cookies/LGPD para os pixels (o site antigo não tinha).
