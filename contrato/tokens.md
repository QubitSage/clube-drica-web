# Tokens da identidade (intocáveis)

Tirados do `:root` do `index.html` na branch `gemini/entrada`.

## Cor

| Token | Hex | Uso |
|---|---|---|
| `--blue` | `#3C6CF0` | hero, faixas, rodapé, títulos sobre papel |
| `--pink` | `#F0548F` | botão principal, Plano Gold, cartão 1 |
| `--coral` | `#FC5430` | cartão 3, flor, preenchimento do botão no hover |
| `--lilac` | `#B490FC` | cartão 2, asterisco |
| `--lime` | `#CAFA5F` | seção manifesto, aba, raio, foco sobre azul |
| `--lime-deep` | `#A6D93B` | traço ondulado na seção lima |
| `--paper` | `#FCFCFC` | fundo claro |
| `--grid` | `#DCE6FB` | linhas do quadriculado (64 px) |
| `--ink` / `--ink-2` / `--ink-3` | `#111111` / `#3A3A3A` / `#6B6B6B` | texto 1, 2, 3 |

## Fonte (servidas de `assets/fonts`)

| Token | Família | Uso |
|---|---|---|
| `--f-display` | Archivo (largura 112, peso 900), caixa alta | títulos |
| `--f-text` | Urbanist | corpo, pílulas, botões |
| `--f-mark` | Bagel Fat One (subconjunto "DricaCLUBE") | wordmark "Drica" |

## Tamanho, espaço e forma

| Token | Desktop | Celular (≤760 px) |
|---|---|---|
| `--t-display` | `min(128px,10.4vw)` | idem |
| `--t-md` | `min(88px,8.4vw)` | idem |
| `--t-panel` | `min(80px,10vw)` | idem |
| `--wrap` | 1280px | idem |
| `--side` | 32px | 16px |
| `--s-section` | 128px | 80px |
| `--s-block` | 56px | 40px |
| `--s-gap` | 24px | 16px |
| `--r-card` | 28px | 22px |
| `--r-photo` | 16px | idem |
| `--scallop` (vieiras) | 72px | 48px |

Sem sombra difusa (estética chapada). Pílulas com raio 999px.

## Movimento (etapa 3)

`--dur-1` 120ms, `--dur-2` 200ms, `--dur-3` 320ms, `--dur-4` 600ms, `--ease-out cubic-bezier(.22,1,.36,1)`, `--ease-in-out cubic-bezier(.65,0,.35,1)`, `--spring` (curva `linear()`). Respeita `prefers-reduced-motion`. Sem JavaScript, nada fica escondido (classe `js` no `<html>`).
