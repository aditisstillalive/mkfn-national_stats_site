// Indonesia beside India, Malaysia, the Philippines, Thailand and Viet Nam on one measure at a time, chosen from a
// menu, with a ranking chart and a table of all twelve measures.
import { esc } from '../lib/dom.js';
import { formatNumber } from '../lib/format.js';
import { PEERS, PEER_METRICS, getPeerMetric } from '../data/peers.js';
import { getIndicator, WDI_UPDATED } from '../data/indicators.js';
import { barChart } from '../charts/bar-chart.js';
import { WDI_URL } from './parts.js';

const show = (m, v) => `${m.prefix ?? ''}${formatNumber(v, m.dp)}${m.suffix ?? ''}`;

function rankSentence(m) {
  const order = PEERS.map((c, i) => ({ c, v: m.values[i] })).sort((a, b) => b.v - a.v);
  const place = order.findIndex((o) => o.c.iso === 'IDN') + 1;
  const words = ['', 'highest', 'second highest', 'third highest', 'third lowest', 'second lowest', 'lowest'];
  return `Indonesia has the ${words[place]} value of the six, at ${show(m, m.values[0])} in ${m.year}; ${order[0].c.name} is highest at ${show(m, order[0].v)}.`;
}

function fullTable() {
  const head = PEERS.map((c) => `<th class="n">${esc(c.name)}</th>`).join('');
  const rows = PEER_METRICS.map((m) => `<tr><td><a href="#/compare/${m.id}">${esc(m.name)}</a> <span class="muted small">${esc(m.unit)}, ${m.year}</span></td>${m.values.map((v, i) => `<td class="n${i === 0 ? ' self' : ''}">${i === 0 ? '<b>' : ''}${show(m, v)}${i === 0 ? '</b>' : ''}</td>`).join('')}</tr>`).join('');
  return `<div class="table-wrap"><table><thead><tr><th>Measure</th>${head}</tr></thead><tbody>${rows}</tbody></table></div>`;
}

export function render([id]) {
  const metric = getPeerMetric(id ?? 'gdp-per-capita-ppp');
  if (!metric) return null;
  const national = getIndicator(metric.id);
  const html = `
    <p class="crumbs"><a href="#/">Overview</a> / Compare</p>
    <p class="eyebrow">International comparison</p>
    <h1>Indonesia and its neighbours</h1>
    <p class="lead">The five largest economies around Indonesia, measured the same way by the same agencies, so the comparison is fair. Choose a measure.</p>
    <section class="section card">
      <div class="controls">
        <label class="inline">Measure
          <select class="field" id="metric-select">${PEER_METRICS.map((m) => `<option value="${m.id}"${m.id === metric.id ? ' selected' : ''}>${esc(m.name)}</option>`).join('')}</select>
        </label>
        ${national ? `<a class="btn" href="#/indicator/${national.id}">Indonesia's trend since 1990</a>` : ''}
      </div>
      <h2>${esc(metric.name)}</h2>
      <p class="card__sub">${esc(metric.unit)}, ${metric.year}${metric.note ? ` (${esc(metric.note)})` : ''}</p>
      <p>${esc(rankSentence(metric))}</p>
      <div id="peer-bars"></div>
      <div class="legend"><span class="legend__key"><i style="background:var(--s2)"></i>Indonesia</span><span class="legend__key"><i style="background:var(--s1)"></i>Neighbours</span></div>
      <p class="source">Source: World Bank WDI series <a href="${WDI_URL}${metric.code}" rel="noopener">${metric.code}</a>, latest year available, updated ${WDI_UPDATED}.</p>
    </section>
    <section class="section">
      <h2>All measures</h2>
      ${fullTable()}
      <p class="source">Source: World Bank World Development Indicators, updated ${WDI_UPDATED}. Select a measure to chart it.</p>
    </section>`;

  return {
    title: `Compare: ${metric.name}`,
    html,
    mount(root) {
      const items = PEERS.map((c, i) => ({ label: c.name, value: metric.values[i], highlight: c.iso === 'IDN' })).sort((a, b) => b.value - a.value);
      barChart(root.querySelector('#peer-bars'), items, { format: (v) => show(metric, v), label: `${metric.name} by country`, rowHeight: 34 });
      root.querySelector('#metric-select').addEventListener('change', (e) => { location.hash = `#/compare/${e.target.value}`; });
    },
  };
}
