// caca.js · detectores do bug-hunter. Injete na página (page.addScriptTag({path}) ou cole no console)
// e chame: await window.caca.tudo()  → objeto com tudo o que achou.
(() => {
  const vis = e => { const r = e.getBoundingClientRect(), c = getComputedStyle(e);
    return r.width > 1 && r.height > 1 && c.visibility !== 'hidden' && c.display !== 'none' && parseFloat(c.opacity) > 0.05; };
  const nome = e => { if (!e || !e.tagName) return String(e);
    let s = e.tagName.toLowerCase(); if (e.id) s += '#' + e.id;
    if (typeof e.className === 'string' && e.className.trim()) s += '.' + e.className.trim().split(/\s+/).slice(0, 2).join('.');
    const t = (e.innerText || e.getAttribute('aria-label') || '').trim().replace(/\s+/g, ' ').slice(0, 30);
    return t ? `${s} "${t}"` : s; };
  const INTER = 'a[href],button,[role=button],input:not([type=hidden]),select,textarea,[tabindex]:not([tabindex="-1"]),summary';
  const interativos = () => [...document.querySelectorAll(INTER)].filter(vis);
  // folhas com texto ou controles: o que o usuário lê ou toca
  const folhas = () => [...document.querySelectorAll('body *')].filter(e => vis(e) && (e.matches(INTER) ||
      ([...e.childNodes].some(n => n.nodeType === 3 && n.textContent.trim()) && !e.closest(INTER)) || e.matches('img,svg,video,canvas')));

  // 1. Piscando: elementos reescritos ou que mudam de visibilidade sozinhos, sem ninguém mexer.
  async function piscando(ms = 5000) {
    const cont = new Map(), mesmo = new Map();
    const alvo = n => n.nodeType === 1 ? n : n.parentElement;
    const obs = new MutationObserver(ms_ => ms_.forEach(m => { const e = alvo(m.target); if (!e) return;
      cont.set(e, (cont.get(e) || 0) + 1);
      if (m.type === 'childList' && m.addedNodes.length && m.removedNodes.length &&
          [...m.addedNodes].map(n => n.textContent).join() === [...m.removedNodes].map(n => n.textContent).join())
        mesmo.set(e, (mesmo.get(e) || 0) + 1); }));
    obs.observe(document.body, { subtree: true, childList: true, characterData: true, attributes: true, attributeFilter: ['class', 'style', 'hidden'] });
    const amostra = new Map(), els = folhas().slice(0, 1500);
    const tira = () => els.forEach(e => { const v = vis(e) ? 1 : 0, a = amostra.get(e) || { ult: v, trocas: 0 };
      if (a.ult !== v) a.trocas++; a.ult = v; amostra.set(e, a); });
    const t = setInterval(tira, 80); await new Promise(r => setTimeout(r, ms)); clearInterval(t); obs.disconnect();
    const out = [];
    cont.forEach((n, e) => { if (n >= 3) out.push({ elemento: nome(e), mudancas: n, reescritoIgual: mesmo.get(e) || 0, porSegundo: +(n / (ms / 1000)).toFixed(1) }); });
    amostra.forEach((a, e) => { if (a.trocas >= 2) out.push({ elemento: nome(e), apareceSome: a.trocas }); });
    return out.sort((a, b) => (b.mudancas || b.apareceSome) - (a.mudancas || a.apareceSome)).slice(0, 30);
  }

  // 2. Sobreposição: texto ou controle por cima de outro (não pai/filho).
  function sobrepostos(minPx = 4) {
    const els = folhas().slice(0, 900), rs = els.map(e => e.getBoundingClientRect()), out = [];
    for (let i = 0; i < els.length; i++) for (let j = i + 1; j < els.length; j++) {
      const a = els[i], b = els[j]; if (a.contains(b) || b.contains(a)) continue;
      const r = rs[i], s = rs[j], w = Math.min(r.right, s.right) - Math.max(r.left, s.left), h = Math.min(r.bottom, s.bottom) - Math.max(r.top, s.top);
      if (w > minPx && h > minPx) out.push({ a: nome(a), b: nome(b), area: Math.round(w * h) });
    }
    return out.sort((x, y) => y.area - x.area).slice(0, 30);
  }

  // 3. Coberto: o clique no centro do botão cai em outro elemento.
  function cobertos() {
    return interativos().map(e => { const r = e.getBoundingClientRect(), x = r.left + r.width / 2, y = r.top + r.height / 2;
      if (x < 0 || y < 0 || x > innerWidth || y > innerHeight) return null;
      const em = document.elementFromPoint(x, y);
      return em && em !== e && !e.contains(em) && !em.contains(e) ? { controle: nome(e), cliqueCaiEm: nome(em) } : null; }).filter(Boolean);
  }

  // 4. Cortado / vazando: texto cortado sem reticências, página com rolagem lateral, controle fora da tela.
  function cortados() {
    const out = [];
    if (document.documentElement.scrollWidth > innerWidth + 1) out.push({ pagina: `rolagem lateral: ${document.documentElement.scrollWidth}px em tela de ${innerWidth}px` });
    folhas().forEach(e => { const c = getComputedStyle(e);
      if ((e.scrollWidth > e.clientWidth + 2 || e.scrollHeight > e.clientHeight + 2) && /hidden|clip/.test(c.overflow + c.overflowX + c.overflowY) && c.textOverflow !== 'ellipsis' && e.clientWidth > 0)
        out.push({ cortado: nome(e), visivel: `${e.clientWidth}×${e.clientHeight}`, conteudo: `${e.scrollWidth}×${e.scrollHeight}` });
      if (e.matches(INTER)) { const r = e.getBoundingClientRect(); if (r.right > innerWidth + 1 || r.left < -1) out.push({ foraDaTela: nome(e), left: Math.round(r.left), right: Math.round(r.right) }); } });
    return out.slice(0, 40);
  }

  // 5. Os botões conversam? Agrupa por aparência; muitas variantes = botões de famílias diferentes.
  function botoes() {
    const fam = new Map();
    [...document.querySelectorAll('button,[role=button],a[class*=btn],a[class*=button],input[type=submit]')].filter(vis).forEach(e => {
      const c = getComputedStyle(e), r = e.getBoundingClientRect();
      const k = `altura ${Math.round(r.height)} · raio ${c.borderRadius} · fonte ${c.fontSize}/${c.fontWeight} · ${c.fontFamily.split(',')[0]}`;
      if (!fam.has(k)) fam.set(k, []); fam.get(k).push(nome(e)); });
    const lista = [...fam].map(([k, v]) => ({ aparencia: k, quantos: v.length, exemplos: v.slice(0, 3) })).sort((a, b) => b.quantos - a.quantos);
    return { variantes: lista.length, lista };
  }

  // 6. Quase alinhado: irmãos cujas bordas esquerdas diferem 1 a 6 px (parece erro, não intenção).
  function quaseAlinhados() {
    const out = [], vistos = new Set();
    document.querySelectorAll('body *').forEach(p => { const fs = [...p.children].filter(vis); if (fs.length < 2) return;
      const ls = fs.map(e => Math.round(e.getBoundingClientRect().left));
      for (let i = 1; i < ls.length; i++) { const d = Math.abs(ls[i] - ls[0]);
        if (d >= 1 && d <= 6 && !vistos.has(p)) { vistos.add(p); out.push({ dentroDe: nome(p), a: nome(fs[0]), b: nome(fs[i]), diferencaPx: d }); } } });
    return out.slice(0, 20);
  }

  // 7. Layout que pula (CLS) e tarefas longas durante um tempo de observação.
  async function pulos(ms = 3000) {
    let cls = 0, longas = 0; const quem = [];
    const o1 = new PerformanceObserver(l => l.getEntries().forEach(x => { if (!x.hadRecentInput) { cls += x.value; (x.sources || []).forEach(s => s.node && quem.push(nome(s.node))); } }));
    const o2 = new PerformanceObserver(l => longas += l.getEntries().length);
    try { o1.observe({ type: 'layout-shift', buffered: true }); } catch {} try { o2.observe({ type: 'longtask' }); } catch {}
    await new Promise(r => setTimeout(r, ms)); o1.disconnect(); o2.disconnect();
    return { cls: +cls.toFixed(3), tarefasLongas: longas, quemPulou: [...new Set(quem)].slice(0, 10) };
  }

  async function tudo({ esperarMs = 5000 } = {}) {
    const [p, j] = await Promise.all([piscando(esperarMs), pulos(esperarMs)]);
    return { tela: `${innerWidth}×${innerHeight}`, url: location.href, piscando: p, sobrepostos: sobrepostos(), cobertos: cobertos(),
      cortados: cortados(), botoes: botoes(), quaseAlinhados: quaseAlinhados(), pulos: j };
  }
  window.caca = { tudo, piscando, sobrepostos, cobertos, cortados, botoes, quaseAlinhados, pulos };
})();
