// Testes de regra do contrato (etapa 5). Rodar: node --test testes/regras.test.mjs
// Travam o que não pode mudar: checkout, preços, plano, cardápios, dúvidas, pixels e a ordem das seções.
// Valores tirados do index.html da branch gemini/entrada.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

const html = readFileSync(new URL('../index.html', import.meta.url), 'utf8');
const texto = html.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ');

test('todos os botões de compra vão para o mesmo checkout Cakto', () => {
  const links = html.match(/https:\/\/pay\.cakto\.com\.br\/[a-z0-9_]+/g) || [];
  assert.equal(links.length, 8);
  assert.deepEqual([...new Set(links)], ['https://pay.cakto.com.br/ij3ekbu_416993']);
});

test('preços do Plano Gold', () => {
  assert.match(texto, /De R\$ 97,00 por apenas/);
  assert.match(texto, /4x de R\$ 5,77/);
  assert.match(texto, /ou R\$ 19,60 à vista/);
  assert.match(texto, /Garantia incondicional de 7 dias/);
});

test('Plano Gold tem os 10 itens', () => {
  const plano = html.slice(html.indexOf('id="plano"'));
  const ul = plano.match(/<ul class="plan__rows">([\s\S]*?)<\/ul>/);
  assert.ok(ul, 'lista do plano não encontrada');
  assert.equal((ul[1].match(/<li>/g) || []).length, 10);
});

test('10 abas de cardápio (8 cardápios + 2 bônus)', () => {
  assert.equal((html.match(/role="tab"/g) || []).length, 10);
  assert.equal((html.match(/role="tabpanel"/g) || []).length, 10);
});

test('7 dúvidas no FAQ', () => {
  assert.equal((html.match(/<details/g) || []).length, 7);
});

test('pixels e analytics continuam no head (IDs a confirmar com o cliente, não remover)', () => {
  for (const id of ['G-Y64D7ERVPM', 'AW-16875532386', 'GTM-PQL5GGF', '2999795973667393', 'D21CC1RC77U0KS93QQKG']) {
    assert.ok(html.includes(id), `faltou ${id}`);
  }
});

test('ordem das seções', () => {
  const ordem = ['topo', 'clube', 'quem', 'vantagens', 'cardapios', 'pessoas', 'paraquem', 'economia', 'bonus', 'plano', 'duvidas'];
  const pos = ordem.map(id => html.indexOf(`id="${id}"`));
  pos.forEach((p, i) => assert.ok(p > -1, `seção #${ordem[i]} sumiu`));
  assert.deepEqual([...pos].sort((a, b) => a - b), pos);
});

test('frases-chave da oferta', () => {
  assert.ok(html.includes('aria-label="Transforme a sua alimentação"'), 'título do hero mudou');
  for (const f of [ 'cozinhando apenas', 'Quem é Adriana Silveira', 'Economize mais de R$ 1000', 'Plano Gold']) {
    assert.ok(texto.includes(f), `faltou "${f}"`);
  }
});

test('links legais e contato', () => {
  assert.ok(html.includes('mailto:adrianasilveira@hotmail.com'));
  assert.equal((html.match(/docs\.google\.com\/document\/d\//g) || []).length, 2);
});

test('fontes servidas do repositório', () => {
  for (const f of ['archivo-latin.woff2', 'urbanist-latin.woff2', 'bagel-wordmark.woff2']) assert.ok(html.includes(f));
});
