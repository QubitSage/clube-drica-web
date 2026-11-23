# Clube Drica · passada 3 de 3

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

## Passada 3: testes e assets

Objetivo: em cima do código já refatorado na passada 2, travar o comportamento com testes e pôr os assets finais.

1. **Testes** (Playwright + `node:test`, sem framework pesado; coloque em `testes/` e um `package.json` mínimo só com `playwright` como devDependency e o script `npm test`):
   - regras (unidade): mantenha `testes/regras.test.mjs` e acrescente o que a passada 2 tornou testável (ex.: formatação do contador "20.000", troca de aba por teclado);
   - jornadas (ponta a ponta, em 390 e 1440): abrir a página, rolar até o plano, clicar em "Comece agora" e conferir que o link é o da Cakto; trocar de aba de cardápio com clique e com setas do teclado; abrir e fechar uma dúvida; navegar o carrossel de depoimentos até o fim; com "reduzir movimento" ligado, nenhum elemento com opacidade 0; sem JavaScript, nenhum conteúdo escondido;
   - telas: comparação de print por seção contra `contrato/prints/` (tolerância pequena, imagens remotas bloqueadas), atualizando a base só onde os relatórios 1 e 2 explicam a diferença.
   Cada teste precisa poder falhar: confira quebrando de propósito o que ele testa uma vez e anote no relatório.
2. **Assets**: crie os da seção 2 das pendências (abaixo), no estilo da marca, ponha cada um no lugar (troque `images/fallback-print.svg` pelo bloco provisório da passada 1, aponte os ícones e o `og:image`) e tire print de onde entraram. Ajuste também imagens locais que estejam pixeladas (menores que o dobro do tamanho em que aparecem) ou mal recortadas, sem trocar a foto.
3. Apague `images/green-energy-*.png` só depois que os ícones novos estiverem ligados.

Entregue o `RELATORIO-3.md` com: testes criados, o resultado de `npm test` e a prova de que cada grupo falha quando deveria; assets criados e ajustados, com o print de cada lugar onde entraram.

## Pendências desta passada (do PENDENCIAS.md)

### Seção 2. Para o Gemini gerar (assets) → passada 3

Estilo de todos: chapado (sem sombra nem gradiente), paleta e fontes de `contrato/tokens.md`, adesivos no estilo dos SVG `#i-star`, `#i-flower`, `#i-ast`, `#i-bolt` do `index.html`. Proibido em todos: foto de pessoa, logo de terceiros, gradiente roxo, cara de banco de imagem, o nome "Mariana Bovolon".

| Arquivo | Onde entra | Tamanho | Estilo | Fundo | Proibido |
|---|---|---|---|---|---|
| `images/og-clube-drica.jpg` | `<meta property="og:image">` e `twitter:image` (compartilhamento no WhatsApp, Instagram, Facebook) | 1200 × 630, JPG ≤ 200 KB | Azul `#3C6CF0` quadriculado como o hero, wordmark "Drica" em Bagel Fat One, frase "Transforme a sua alimentação" em Archivo 900 caixa alta, 2 adesivos (estrela rosa, flor coral) | Azul do hero | Preço na imagem, texto pequeno ilegível no celular |
| `images/favicon.svg` + `images/favicon-32.png` + `images/apple-touch-icon.png` (180 × 180) + `images/icon-192.png` + `images/icon-512.png` | `<link rel="icon">` e `apple-touch-icon` (hoje apontam para `green-energy-*.png`, sobra do site antigo) | os tamanhos ao lado | Letra "D" do wordmark em Bagel Fat One, branca sobre círculo azul `#3C6CF0`, com uma estrelinha rosa | Transparente fora do círculo | Folha verde do ícone antigo |
| `images/fallback-print.svg` | Usado pela tarefa 1 da passada 1 quando um print de depoimento não carrega | 473 × 1024 (mesma proporção dos prints) | Cartão rosa `#F0548F` com aspas grandes brancas e o texto "Depoimento de aluna" em Urbanist | Liso | Rosto, texto inventado de depoimento |

Não é para o Gemini gerar (precisa ser real, vem do cliente, ver seção 4): logo oficial, capas dos e-books, prints de depoimento, fotos das alunas, foto da Adriana, imagens dos cardápios e módulos bônus.

## De onde parte e o que devolver

- Parta da branch `gemini/passada-2` do repositório `https://github.com/QubitSage/clube-drica-web` (público).
- Entregue a branch `gemini/entrega` com um commit por bug, tarefa ou passo, e o arquivo `gemini-entrada/RELATORIO-3.md` dentro dela.
- Antes de entregar: `node --test testes/regras.test.mjs` verde, a página abre sem erro no console em 1440 e 390, e os prints batem com `contrato/prints/` (exceto onde o relatório explica).

## A regra de sempre

Não mude identidade visual (cores, fontes, raios, espaçamentos de `contrato/tokens.md`), textos, preços, links de checkout, pixels, regras ou a ordem das seções. Se algo precisaria mudar, escreva como **pergunta** no relatório, com print, e não aplique.
