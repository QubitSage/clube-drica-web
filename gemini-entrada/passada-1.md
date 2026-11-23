# Clube Drica · passada 1 de 3

# Como trabalhar com estes 3 arquivos

Você recebeu 3 arquivos: passada-1.md, passada-2.md e passada-3.md.
Crie 3 subagentes, um para cada arquivo. Eles trabalham EM SEQUÊNCIA, nunca em paralelo:
- o subagente 1 faz a passada-1.md, partindo da branch gemini/entrada;
- o subagente 2 só começa quando o 1 entregou a branch gemini/passada-1 e tudo roda,
  e parte dela para fazer a passada-2.md;
- o subagente 3 só começa quando o 2 entregou a branch gemini/passada-2 e tudo roda,
  e parte dela para fazer a passada-3.md.
Cada subagente lê só o seu arquivo e faz só o que ele pede.
Você, o agente principal, não mexe no código: entrega cada arquivo ao seu subagente,
confere que a branch e o relatório de cada passada existem e que o sistema roda antes
de liberar a próxima, e no fim devolve as 3 branches e os 3 relatórios.
Se uma passada terminar com teste vermelho ou sistema sem subir, pare e devolva
o que tiver, com o erro no relatório. Não pule para a próxima.
Se você não puder criar subagentes, faça as 3 passadas você mesmo, na mesma ordem,
começando cada uma do zero só com o arquivo dela.

---

## O produto

- **O que é:** a página de vendas do **Clube Drica**, um clube de receitas e cardápios da Dra. Adriana Silveira (médica, pós em nutrologia). Promessa: "Transforme a sua alimentação cozinhando apenas 1 hora para até 15 dias".
- **Para quem:** mulheres que querem comer melhor e economizar tempo e dinheiro, chegando quase sempre por anúncio no **celular** (Instagram, Facebook, TikTok).
- **Ação principal:** clicar em "Quero começar" / "Comece agora" e ir ao checkout da Cakto (Plano Gold, 4x de R$ 5,77 ou R$ 19,60 à vista).
- **Onde o cliente usa:** celular (390 px) em primeiro lugar; desktop 1440 px em segundo.

## O pedido, nas palavras do Bruno

> Clube Drica: "Azul cobalto e coral vibrante com energia jovem, divertida e super comunitária." Referência: BLOOP® — Creative Club Website (Behance 258302711).

Já foi feito: etapa 2 (site remontado na referência BLOOP com o conteúdo real) e etapa 3 (movimento e estados). Agora o trabalho é fechar, limpar e testar, sem redesenhar.

## Como rodar e testar

- É um site estático de um arquivo só: `index.html` (HTML + CSS + JS inline), fontes em `assets/fonts/`, imagens em `images/`. Não há build, nem `package.json`, nem variáveis de ambiente.
- Rodar: `npx serve .` ou `python3 -m http.server 8080` na raiz e abrir `http://localhost:8080`. Não use `file://`: as fontes pré-carregadas falham por CORS.
- Testes de regra (Node 18+): `node --test testes/regras.test.mjs` (10 testes, todos verdes hoje; resultado em `contrato/testes-resultado.txt`).
- Detectores de bug (Playwright): `JANELAS=1440x900,1366x768,390 node ferramentas/cacar.mjs http://localhost:8080 saida/home`. Linha de base: `contrato/detectores-linha-de-base.json`.
- 19 imagens vêm de `marianabovolon.com.br`. Se o seu ambiente não alcançar esse domínio, elas aparecem vazias; isso não é bug seu, é a tarefa 1 da passada 1.

## Onde está o contrato (o "antes" para comparar)

Tudo na branch `gemini/entrada`:

- `contrato/prints/`: cada seção em 1440 e 390 (`1440-01-topo.png` … `1440-16-footer.png`, `390-…`), estados (`1440-estado-aba-cardapio-2.png`, `1440-estado-faq-aberta.png`) e a página inteira em 1440 (`1440-pagina-inteira.webp`). Feitos com "reduzir movimento" ligado e sem as imagens remotas.
- `contrato/videos/jornada-desktop.mp4` e `jornada-celular.mp4`: rolagem, hover no botão, troca de aba e FAQ, como estão hoje.
- `contrato/tokens.md`: cores, fontes, tamanhos, espaçamentos, raios e tokens de movimento.
- `contrato/testes-resultado.txt` e `contrato/detectores-linha-de-base.json`.
- `ferramentas/caca.js` e `ferramentas/cacar.mjs`: detectores de bug visual.
- `design/spec.md`, `design/mapa-de-conteudo.md`, `design/REFERENCIAS.md`: decisões das etapas anteriores.

## O que é intocável

- **Identidade:** azul `#3C6CF0`, rosa `#F0548F`, coral `#FC5430`, lilás `#B490FC`, lima `#CAFA5F`, papel `#FCFCFC` quadriculado com linhas `#DCE6FB` a cada 64 px; Archivo 900 larga em caixa alta nos títulos, Urbanist no texto, Bagel Fat One no wordmark "Drica"; raio de card 28 px (22 no celular), pílulas 999 px, sem sombras difusas; cartões e pílulas girados de propósito; bordas em vieira entre seções azuis e claras.
- **Conteúdo:** todos os textos, preços (R$ 97,00 / 4x R$ 5,77 / R$ 19,60), o link de checkout `https://pay.cakto.com.br/ij3ekbu_416993` (8 botões), FAQ, links legais, e-mail de contato.
- **Integrações:** os 5 pixels/analytics do `<head>` (Meta, GA, Ads, GTM, TikTok). Não tire, não troque, não adicione eventos.
- **Estrutura:** a ordem das seções (`#topo`, `#clube`, `#quem`, `#vantagens`, `#cardapios`, `#pessoas`, `#paraquem`, `#economia`, `#bonus`, `#plano`, `#duvidas`, rodapé).
- **Movimento:** o que existe hoje (entradas, contadores, abas, FAQ, letreiro, hover dos botões), incluindo o suporte a `prefers-reduced-motion` e a regra de que sem JavaScript nada fica escondido.

---

## Passada 1: bugs e implementações finais

Objetivo: fechar o comportamento.

1. Implemente as tarefas da seção 3 das pendências (abaixo), **na ordem**, cada uma com o seu critério de pronto.
2. Cace bugs olhando as telas como usuária, no celular (390) e no desktop (1440): o que pisca, fica coberto, encosta, corta, botão que não responde, setas do carrossel de depoimentos que não param no fim, aba que perde o foco, contador que pula, estado que não bate, corrida que só aparece com o computador lento (Playwright com CPU 4× mais lenta). Rode os detectores (`ferramentas/cacar.mjs`) e confirme cada achado no print.
3. Corrija cada bug **na causa**: não esconda com `display:none`, `z-index` alto, `!important` ou `setTimeout` maior. Um commit por bug ou por tarefa.
4. Feche validando: os testes de regra verdes, nenhum erro no console (fora as imagens remotas, se o seu ambiente não alcança o domínio), prints iguais aos do contrato exceto onde houve correção ou implementação.

Ainda **não** faça nesta passada: refatoração, renomear classes, separar o CSS/JS em arquivos (é a passada 2), nem testes novos ou assets (passada 3).

Entregue o `RELATORIO-1.md` com:
- tabela de bugs: onde, o que a usuária via, causa, correção, print antes × depois;
- tarefas implementadas, cada uma com o critério cumprido e o print;
- o que ficou dependendo da seção 4 das pendências;
- perguntas (o que precisaria mudar texto, visual ou integração).

## Pendências desta passada (do PENDENCIAS.md)

### Seção 3. Para o Gemini implementar → passada 1 (em ordem)

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

### Seção 4. Para o Bruno ou o cliente fornecer

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

A seção 4 depende do Bruno ou do cliente: não invente nada dela (nem imagem, nem ID, nem número).

## De onde parte e o que devolver

- Parta da branch `gemini/entrada` do repositório `https://github.com/QubitSage/clube-drica-web` (público).
- Entregue a branch `gemini/passada-1` com um commit por bug, tarefa ou passo, e o arquivo `gemini-entrada/RELATORIO-1.md` dentro dela.
- Antes de entregar: `node --test testes/regras.test.mjs` verde, a página abre sem erro no console em 1440 e 390, e os prints batem com `contrato/prints/` (exceto onde o relatório explica).

## A regra de sempre

Não mude identidade visual (cores, fontes, raios, espaçamentos de `contrato/tokens.md`), textos, preços, links de checkout, pixels, regras ou a ordem das seções. Se algo precisaria mudar, escreva como **pergunta** no relatório, com print, e não aplique.
