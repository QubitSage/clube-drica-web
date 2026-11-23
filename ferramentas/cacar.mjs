// node cacar.mjs <url> [saida]  · roda caca.js em 1440×900, 1366×768, a janela do cliente e 390 (iPhone 13),
// guarda print de cada tela e um JSON com os achados e os erros do console.
import { createRequire } from 'module';
const { chromium, devices } = createRequire(import.meta.url)('playwright');
import { fileURLToPath } from 'url'; import path from 'path'; import fs from 'fs';
const [, , url, saida = 'cacada'] = process.argv;
const aqui = path.dirname(fileURLToPath(import.meta.url));
const janelas = (process.env.JANELAS || '1440x900,1366x768,390').split(',');
fs.mkdirSync(saida, { recursive: true });
const b = await chromium.launch(); const res = [];
for (const j of janelas) {
  const ctx = j === '390' ? await b.newContext({ ...devices['iPhone 13'] })
    : await b.newContext({ viewport: { width: +j.split('x')[0], height: +j.split('x')[1] } });
  const page = await ctx.newPage(); const erros = [];
  page.on('console', m => m.type() === 'error' && erros.push(m.text()));
  page.on('pageerror', e => erros.push(String(e)));
  page.on('requestfailed', r => erros.push('falhou: ' + r.url()));
  await page.goto(url, { waitUntil: 'networkidle' });
  await page.addScriptTag({ path: path.join(aqui, 'caca.js') });
  const r = await page.evaluate(() => window.caca.tudo({ esperarMs: 5000 }));
  await page.screenshot({ path: `${saida}/${j}.png`, fullPage: true });
  res.push({ janela: j, ...r, erros }); await ctx.close();
}
await b.close();
fs.writeFileSync(`${saida}/achados.json`, JSON.stringify(res, null, 2));
for (const r of res) console.log(`${r.janela}: piscando ${r.piscando.length} · sobrepostos ${r.sobrepostos.length} · cobertos ${r.cobertos.length} · cortados ${r.cortados.length} · variantes de botão ${r.botoes.variantes} · quase alinhados ${r.quaseAlinhados.length} · CLS ${r.pulos.cls} · erros ${r.erros.length}`);
