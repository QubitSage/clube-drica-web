# Clube Drica · passada 2 de 3

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

## Passada 2: refatoração e limpeza

Objetivo: com o comportamento fechado na passada 1, enxugar o código sem mudar nada do que a usuária vê.

1. O `index.html` tem cerca de 1.000 linhas com CSS e JS inline. Separe em `assets/css/` (por assunto: base e tokens, componentes, seções, movimento) e `assets/js/` (abas, carrossel, FAQ, contadores, revelação na rolagem), mantendo um único `index.html` de entrada. Sem bundler e sem dependências novas.
2. Tire código morto e duplicado (seletores sem uso, regras repetidas entre desktop e celular, SVG `<symbol>` não usados). Use os tokens de `contrato/tokens.md` no lugar de valores soltos (cores hex, raios, espaçamentos repetidos).
3. Nada de `!important`. Cada estado com um dono só (a aba ativa, o carrossel, a revelação). Sincronização por evento (`transitionend`, `IntersectionObserver`), não por `setTimeout` de tempo fixo, onde der.
4. Mantenha a ordem de carregamento que evita pulo de layout (fontes pré-carregadas, classe `js` no `<html>` antes do CSS) e a regra de que sem JavaScript nada fica escondido.
5. Um passo pequeno por commit. A cada passo: `node --test testes/regras.test.mjs` verde e prints iguais aos de `contrato/prints/` em 1440 e 390 (diferença de pixel zero ou explicada).
6. Bug achado no caminho: anote e corrija num commit separado, com a mensagem começando por `fix:`.

Nada do que a usuária vê pode mudar: cores, fontes, tamanhos, posições, textos, movimento.

Entregue o `RELATORIO-2.md` com o antes × depois em números: linhas totais, arquivos acima de 300 linhas, regras CSS duplicadas, ocorrências de `!important`, valores hex soltos fora dos tokens, tamanho transferido da página. Liste também os bugs achados e corrigidos à parte.

## Pendências desta passada

Nenhuma. A passada 2 não implementa nada novo.

## De onde parte e o que devolver

- Parta da branch `gemini/passada-1` do repositório `https://github.com/QubitSage/clube-drica-web` (público).
- Entregue a branch `gemini/passada-2` com um commit por bug, tarefa ou passo, e o arquivo `gemini-entrada/RELATORIO-2.md` dentro dela.
- Antes de entregar: `node --test testes/regras.test.mjs` verde, a página abre sem erro no console em 1440 e 390, e os prints batem com `contrato/prints/` (exceto onde o relatório explica).

## A regra de sempre

Não mude identidade visual (cores, fontes, raios, espaçamentos de `contrato/tokens.md`), textos, preços, links de checkout, pixels, regras ou a ordem das seções. Se algo precisaria mudar, escreva como **pergunta** no relatório, com print, e não aplique.
