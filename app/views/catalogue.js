// Data catalogue: every indicator on the site with its latest value, year, change and source, searchable and
// filterable by topic.
import { esc } from '../lib/dom.js';
import { formatValue } from '../lib/format.js';
import { INDICATORS, latestOf, WDI_UPDATED } from '../data/indicators.js';
import { TOPICS, getTopic } from '../data/topics.js';
import { changeBadge } from './parts.js';

function row(d) {
  const { year, value } = latestOf(d);
  return `<tr data-topic="${d.topic}" data-text="${esc(`${d.name} ${d.unit} ${d.code} ${d.origin}`.toLowerCase())}">
    <td><a href="#/indicator/${d.id}">${esc(d.name)}</a><div class="small muted">${esc(d.unit)}</div></td>
    <td>${esc(getTopic(d.topic).name)}</td>
    <td class="n"><b>${formatValue(d, value)}</b></td><td class="n">${year}</td><td>${changeBadge(d)}</td>
    <td class="small">${esc(d.origin)}<div class="muted">${d.code}</div></td></tr>`;
}

export function render() {
  const html = `
    <p class="crumbs"><a href="#/">Overview</a> / Data catalogue</p>
    <p class="eyebrow">Data catalogue</p>
    <h1>All ${INDICATORS.length} indicators</h1>
    <p class="lead">Every national series on this site, its latest value and where it comes from. Open one for its full history, definition and a CSV download. World Bank WDI update of ${WDI_UPDATED}.</p>
    <div class="controls">
      <input class="field" type="search" id="cat-search" placeholder="Search e.g. poverty, SL.UEM, ILO" aria-label="Search indicators" style="flex:1;max-width:360px">
      <div class="chips" role="group" aria-label="Filter by topic">
        <button type="button" class="chip" data-topic="" aria-pressed="true">All</button>
        ${TOPICS.map((t) => `<button type="button" class="chip" data-topic="${t.id}" aria-pressed="false">${esc(t.name)}</button>`).join('')}
      </div>
    </div>
    <p class="small muted" id="cat-count"></p>
    <div class="table-wrap"><table>
      <thead><tr><th>Indicator</th><th>Topic</th><th class="n">Latest</th><th class="n">Year</th><th>10-year change</th><th>Source</th></tr></thead>
      <tbody id="cat-rows">${INDICATORS.map(row).join('')}</tbody>
    </table></div>`;

  return {
    title: 'Data catalogue',
    html,
    mount(root) {
      const state = { topic: '', text: '' };
      const apply = () => {
        let shown = 0;
        for (const tr of root.querySelectorAll('#cat-rows tr')) {
          const ok = (!state.topic || tr.dataset.topic === state.topic) && (!state.text || tr.dataset.text.includes(state.text));
          tr.hidden = !ok;
          if (ok) shown++;
        }
        root.querySelector('#cat-count').textContent = shown ? `Showing ${shown} of ${INDICATORS.length} indicators` : 'No indicator matches. Try a broader word.';
      };
      root.querySelector('#cat-search').addEventListener('input', (e) => { state.text = e.target.value.trim().toLowerCase(); apply(); });
      for (const chip of root.querySelectorAll('[data-topic]')) {
        if (chip.tagName !== 'BUTTON') continue;
        chip.addEventListener('click', () => {
          state.topic = chip.dataset.topic;
          for (const c of root.querySelectorAll('button[data-topic]')) c.setAttribute('aria-pressed', String(c === chip));
          apply();
        });
      }
      apply();
    },
  };
}
