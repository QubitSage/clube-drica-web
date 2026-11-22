# Spec — Clube Drica montado na referência BLOOP

Referência: BLOOP® — Creative Club Website (Behance 258302711).
Etapa 2 do processo (montar na referência). Sem animação nesta etapa.

## De onde vem cada coisa

| Item | Origem |
|---|---|
| Estrutura das seções, grid, ritmo, forma, componentes | **Referência** |
| Paleta (azul cobalto, rosa, coral, lilás, lima, papel quadriculado) | **Referência**, por escolha do Bruno ("azul cobalto e coral vibrante"). O laranja/dourado do site antigo sai. |
| Tipografia | **Referência** (fonte mais próxima disponível, ver abaixo) |
| Textos, preços, links de checkout, fotos, depoimentos | **Cliente** (index.html antigo). Nada inventado. |
| Logo | Cliente não tem logo → wordmark "Drica" na fonte arredondada, no lugar do wordmark "Bloop". |

## Grid

- Largura de desenho: 1440. Conteúdo máx. 1280 (`--wrap`), margem lateral 32 px desktop, 16 px celular.
- Fundo "papel quadriculado": linhas 1 px `#DCE6FB` a cada 64 px sobre `#FCFCFC`.
- No azul: mesmas linhas a 64 px em branco 12%.

## Ritmo (base 8)

| Token | Valor |
|---|---|
| `--s-section` | 128 px desktop / 80 px celular (padding vertical de seção) |
| `--s-block` | 56 px (título → conteúdo) |
| `--s-gap` | 24 px (gap de cards) |
| padding de card | 28 px |
| botão | altura 48, padding 0 28 |

## Tipografia

| Nível | Fonte | Tamanho desktop / celular | Peso | Linha | Tracking |
|---|---|---|---|---|---|
| Display (h1, títulos de seção) | Archivo, largura 112 (na ref.: grotesca larga black) | 128 / 52 | 900 | 0.92 | -0.01em, CAIXA ALTA |
| Título de card / painel | Archivo 112 | 72 / 40 | 900 | 0.95 | CAIXA ALTA |
| Frase-manifesto (seção lima, "good people") | Urbanist (na ref.: Gilroy) | 36 / 22 | 700 | 1.15 | CAIXA ALTA, sublinhado à mão nas palavras-chave |
| Subtítulo de card | Urbanist | 22 / 18 | 600 | 1.2 | CAIXA ALTA |
| Corpo | Urbanist | 16 / 15 | 500 | 1.5 | — |
| Rótulo / pílula / nav | Urbanist | 13 | 600 | 1 | CAIXA ALTA, 0.02em |
| Wordmark | Bagel Fat One (na ref.: wordmark próprio "Bloop") | 64 no header, ~38vw no rodapé | 400 | 0.8 | — |

Fontes servidas do próprio repo (`assets/fonts`, só o subconjunto latino).

## Forma

- Raio de card grande / painel: 28 px. Raio de foto dentro de card: 16 px. Pílulas: 999 px.
- Sem sombra em nada (a referência é chapada). Bordas só em pílulas de contorno (1.5 px).
- Borda "recortada" (vieiras): círculos de 72 px de diâmetro na emenda entre seções azuis e claras.
- Adesivos decorativos: estrela de pontas (rosa), flor de 4 pétalas (coral), asterisco (lilás), raio (lima). SVG próprio.
- Sublinhado à mão: traço SVG ondulado de 3 px sob palavras-chave.

## Cor

| Token | Hex | Uso |
|---|---|---|
| `--blue` | `#3C6CF0` | hero, faixas, rodapé, títulos sobre papel |
| `--pink` | `#F0548F` | botão principal, cartão 1 |
| `--coral` | `#FC5430` | cartão 3, flor |
| `--lilac` | `#B490FC` | cartão 2, asterisco |
| `--lime` | `#CAFA5F` | seção manifesto, aba, raio |
| `--lime-deep` | `#A6D93B` | traço ondulado na seção lima |
| `--paper` | `#FCFCFC` | fundo claro |
| `--grid` | `#DCE6FB` | linhas do quadriculado |
| `--ink` | `#111111` | texto 1 |
| `--ink-2` | `#3A3A3A` | texto 2 |
| `--ink-3` | `#6B6B6B` | texto 3 |

## Composição por seção (referência → aqui)

1. **Header**: wordmark à esquerda, nav em pílulas de contorno no centro, botão branco à direita, sobre o azul.
2. **Hero**: azul quadriculado, título display centralizado em 2–3 linhas com adesivos espalhados, botão rosa com seta, borda de vieiras e faixa de foto de ponta a ponta.
3. **Manifesto lima**: frase em caixa alta centralizada, foto em arco no meio com traço ondulado atrás, segunda frase.
4. **"Things happen here"**: título azul gigante + 4 cartões coloridos levemente girados e sobrepostos, número em pílula, forma grande translúcida dentro.
5. **Faixa letreiro** (EVENTS ✕ EVENTS): faixa azul fina com texto repetido.
6. **Eventos com abas-pasta**: abas coloridas no topo, painel rosa grande com título, pílulas de data, texto e foto à direita.
7. **"Your kind of people"**: faixa azul com vieiras em cima e embaixo, título branco, cartões-crachá com foto e rótulos em pílula.
8. **"Good people…"**: frase azul sublinhada sobre papel, botão, monte de pílulas coloridas giradas.
9. **"Welcome to our world"**: painel lima, título preto gigante, grade de fotos.
10. **"Pick your way in"**: título azul, cartões de preço coloridos com painel branco interno, aba-rótulo, preço grande, itens em pílulas, botão branco.
11. **Rodapé**: azul com vieiras, frase, botão, colunas com cabeçalho em pílula branca, wordmark gigante com rabisco rosa.
