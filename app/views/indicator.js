// One indicator: its latest value, a chart with a time-range control, every yearly value in a table, the definition
// and source, a CSV download, and links to related measures.
import { downloadText, esc, toCsv } from '../lib/dom.js';
import { formatNumber, formatValue } from '../lib/format.js';
import { getIndicator, indicatorsInTopic, latestOf, pointsOf, WDI_UPDATED } from '../data/indicators.js';
import { EVENTS, getTopic } from '../data/topics.js';
import { getPeerMetric } from '../data/peers.js';
import { lineChart } from '../charts/line-chart.js';
import { isDated, methodOf } from '../data/sources.js';
import { changeBadge, sourceBadge, twoNumbersNote, WDI_URL } from './stat-blocks.js';

export function render([id], query) {
  const d = getIndicator(id);
  if (!d) return null;
  const topic = getTopic(d.topic);
  const { year, value } = latestOf(d);
  const first = pointsOf(d)[0];
  const range = RANGES.some((r) => r.id === query.get('range')) ? query.get('range') : 'all';
  const related = indicatorsInTopic(d.topic).filter((r) => r.id !== d.id);
  const peer = getPeerMetric(d.id);

  const html = `
    <p class="crumbs"><a href="#/">Overview</a> / <a href="#/topic/${topic.id}">${esc(topic.title)}</a> / ${esc(d.name)}</p>
    <div class="ind-head">
      <div>
        <p class="eyebrow">${esc(topic.title)}</p>
        <h1>${esc(d.name)}</h1>
        <p class="lead">${esc(d.about)}</p>
      </div>
      <div class="ind-head__value">
        <div class="big">${formatValue(d, value)}</div>
        <div class="muted small">${esc(d.unit)} · ${year}</div>
        <div>${sourceBadge(d, year)}</div>
        <div>${changeBadge(d)}</div>
      </div>
    </div>

    ${twoNumbersNote(d.id)}
    ${isDated(year) ? `<p class="note"><b>Dated series.</b> The latest figure the compiling agency has published is for ${year}; this page will show newer years when ${esc(d.origin.replace(/, from .*$/, ''))} releases them.</p>` : ''}

    <section class="section card">
      <div class="controls">
        <div class="seg" role="group" aria-label="Time range">${RANGES.map((r) => `<button type="button" data-range="${r.id}" aria-pressed="${r.id === range}">${r.label}</button>`).join('')}</div>
        <span style="flex:1"></span>
        <button type="button" class="btn" id="csv-btn">Download CSV</button>
        ${peer ? `<a class="btn" href="#/compare/${peer.id}">Compare with neighbours</a>` : ''}
      </div>
      <p class="card__sub">Unit: ${esc(d.unit)} · ${first[0]}–${year} · hover or tap the chart for each year's value</p>
      <div id="ind-chart"></div>
      <p class="source">Source: ${esc(d.origin)}. World Bank WDI series <a href="${WDI_URL}${d.code}?locations=ID" rel="noopener">${d.code}</a>, updated ${WDI_UPDATED}.</p>
    </section>

    <section class="section grid-2">
      <div>
        <h2>Every year</h2>
        <div class="table-wrap tall"><table><thead><tr><th class="n">Year</th><th class="n">Value</th><th class="n">Change</th></tr></thead><tbody>${valueTable(d)}</tbody></table></div>
      </div>
      <div>
        <h2>About this figure</h2>
        <div class="card">
          <dl class="meta">
            <dt>Definition</dt><dd>${esc(d.about)}</dd>
            <dt>Method</dt><dd>${esc(methodOf(d))}</dd>
            <dt>Unit</dt><dd>${esc(d.unit)}</dd>
            <dt>Coverage</dt><dd>${first[0]}–${year}, ${pointsOf(d).length} published years</dd>
            <dt>Compiled by</dt><dd>${esc(d.origin)}</dd>
            <dt>Series code</dt><dd><a href="${WDI_URL}${d.code}?locations=ID" rel="noopener">${d.code}</a></dd>
            <dt>Last update</dt><dd>World Bank WDI, ${WDI_UPDATED}</dd>
          </dl>
        </div>
        <h2 style="margin-top:24px">Related in ${esc(topic.name.toLowerCase())}</h2>
        <div class="chips">${related.map((r) => `<a class="chip" href="#/indicator/${r.id}">${esc(r.name)}</a>`).join('')}</div>
      </div>
    </section>`;

  return {
    title: d.name,
    html,
    mount(root) {
      const host = root.querySelector('#ind-chart');
      const draw = (rangeId) => {
        const r = RANGES.find((x) => x.id === rangeId);
        const from = r.from ?? year - 10;
        host.replaceChildren();
        host.className = '';
        lineChart(host, [{ name: d.name, points: pointsOf(d, from), format: (v) => formatValue(d, v) }], { events: EVENTS, area: true, height: 320, zero: d.id !== 'life-expectancy' });
      };
      draw(range);
      for (const button of root.querySelectorAll('[data-range]')) {
        button.addEventListener('click', () => {
          for (const b of root.querySelectorAll('[data-range]')) b.setAttribute('aria-pressed', String(b === button));
          history.replaceState(null, '', `#/indicator/${d.id}?range=${button.dataset.range}`);
          draw(button.dataset.range);
        });
      }
      root.querySelector('#csv-btn').addEventListener('click', () => {
        const rows = [['country', 'indicator', 'series_code', 'year', 'value', 'unit', 'source'],
          ...pointsOf(d).map(([y, v]) => ['Indonesia', d.name, d.code, y, v, d.unit, `${d.origin}; World Bank WDI ${WDI_UPDATED}`])];
        downloadText(`indonesia-${d.id}.csv`, toCsv(rows));
      });
    },
  };
}

const RANGES = [
  { id: 'all', label: 'All years', from: -Infinity },
  { id: '2000', label: 'Since 2000', from: 2000 },
  { id: '10y', label: 'Last 10 years', from: null },
];

function valueTable(d) {
  const points = pointsOf(d).reverse();
  return points.map(([year, value], i) => {
    const prev = points[i + 1];
    const step = prev ? value - prev[1] : null;
    return `<tr><td class="n">${year}</td><td class="n">${formatValue(d, value)}</td><td class="n muted">${step == null ? '' : (step > 0 ? '+' : step < 0 ? '−' : '') + formatNumber(Math.abs(step), d.dp)}</td></tr>`;
  }).join('');
}

