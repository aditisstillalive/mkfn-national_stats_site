// The 38 provinces: a tile map shaded by the chosen measure, totals by island group, and a table that sorts, filters
// by island group and searches by name.
import { downloadText, esc, toCsv } from '../lib/dom.js';
import { formatNumber } from '../lib/format.js';
import { ISLAND_GROUPS, NATIONAL, PROVINCES, PROVINCE_SOURCE, groupName, groupTotals } from '../data/provinces.js';
import { tileMap } from '../charts/tile-map.js';
import { barChart } from '../charts/bar-chart.js';

export const MEASURES = [
  { id: 'pop', label: 'Population', unit: 'million people', format: (v) => `${formatNumber(v / 1e6, 2)} m` },
  { id: 'density', label: 'Density', unit: 'people per km²', format: (v) => `${formatNumber(v, 0)} per km²` },
  { id: 'area', label: 'Land area', unit: 'km²', format: (v) => `${formatNumber(v, 0)} km²` },
];

const COLUMNS = [
  { key: 'name', label: 'Province', text: true },
  { key: 'capital', label: 'Capital', text: true },
  { key: 'group', label: 'Island group', text: true },
  { key: 'pop', label: 'Population' },
  { key: 'share', label: 'Share' },
  { key: 'area', label: 'Land km²' },
  { key: 'density', label: 'Per km²' },
];

function legend(breaks, measure) {
  const edges = [0, ...breaks];
  const ramp = edges.map((_, i) => `<i style="background:var(--seq-${i})"></i>`).join('');
  return `<div class="legend"><span>${esc(measure.label)}:</span><span>${measure.format(Math.min(...PROVINCES.map((p) => p[measure.id])))}</span><span class="legend__ramp">${ramp}</span><span>${measure.format(Math.max(...PROVINCES.map((p) => p[measure.id])))}</span><span>· six equal-count groups</span></div>`;
}

function rowsHtml(list) {
  const maxPop = Math.max(...PROVINCES.map((p) => p.pop));
  return list.map((p) => `<tr>
    <td><a href="#/region/${p.iso}">${esc(p.name)}</a></td><td>${esc(p.capital)}</td><td>${esc(groupName(p.group))}</td>
    <td class="n"><span class="bar-cell" style="width:${(p.pop / maxPop) * 60}px"></span>${formatNumber(p.pop, 0)}</td>
    <td class="n">${formatNumber((p.pop / NATIONAL.pop) * 100, 1)}%</td><td class="n">${formatNumber(p.area, 0)}</td><td class="n">${formatNumber(p.density, 0)}</td></tr>`).join('');
}

export function render(_params, query) {
  const measureId = MEASURES.some((m) => m.id === query.get('by')) ? query.get('by') : 'pop';
  const javaShare = (groupTotals('java').pop / NATIONAL.pop) * 100;
  const javaLand = (groupTotals('java').area / NATIONAL.area) * 100;
  const html = `
    <p class="crumbs"><a href="#/">Overview</a> / Provinces</p>
    <p class="eyebrow">Regional statistics</p>
    <h1>The 38 provinces</h1>
    <p class="lead">${formatNumber(NATIONAL.pop / 1e6, 1)} million people in mid-2025, unevenly spread: Java holds ${formatNumber(javaShare, 1)}% of them on ${formatNumber(javaLand, 1)}% of the land. Jakarta has ${formatNumber(PROVINCES.find((p) => p.iso === 'jk').density, 0)} people per km²; South Papua has ${formatNumber(PROVINCES.find((p) => p.iso === 'ps').density, 0)}.</p>

    <section class="section map-layout">
      <div class="card">
        <div class="controls">
          <div class="seg" role="group" aria-label="Shade the map by">${MEASURES.map((m) => `<button type="button" data-measure="${m.id}" aria-pressed="${m.id === measureId}">${m.label}</button>`).join('')}</div>
        </div>
        <div id="prov-map"></div>
        <div id="prov-legend"></div>
        <p class="source">Select a tile for the province's page. Source: ${esc(PROVINCE_SOURCE)}.</p>
      </div>
      <div class="card">
        <h3>By island group</h3><p class="card__sub" id="group-sub"></p>
        <div id="group-bars"></div>
        <p class="source">Sums of the provinces in each group.</p>
      </div>
    </section>

    <section class="section">
      <div class="section__head"><h2>All provinces</h2><button type="button" class="btn" id="prov-csv">Download CSV</button></div>
      <div class="controls">
        <input class="field" type="search" id="prov-search" placeholder="Search a province or capital" aria-label="Search provinces">
        <label class="inline">Island group
          <select class="field" id="prov-group"><option value="">All groups</option>${ISLAND_GROUPS.map((g) => `<option value="${g.id}">${esc(g.name)}</option>`).join('')}</select>
        </label>
        <span class="small muted" id="prov-count"></span>
      </div>
      <div class="table-wrap"><table>
        <thead><tr>${COLUMNS.map((c) => `<th${c.text ? '' : ' class="n"'} data-key="${c.key}"><button type="button">${c.label}</button></th>`).join('')}</tr></thead>
        <tbody id="prov-rows"></tbody>
        <tfoot><tr><td><b>Indonesia</b></td><td>Jakarta</td><td></td><td class="n"><b>${formatNumber(NATIONAL.pop, 0)}</b></td><td class="n">100%</td><td class="n">${formatNumber(NATIONAL.area, 0)}</td><td class="n">${formatNumber(NATIONAL.pop / NATIONAL.area, 0)}</td></tr></tfoot>
      </table></div>
      <p class="source">Source: ${esc(PROVINCE_SOURCE)}.</p>
    </section>`;

  return {
    title: 'Provinces',
    html,
    mount(root) {
      const state = { measure: measureId, sort: 'pop', dir: -1, search: '', group: '' };

      const drawMap = () => {
        const measure = MEASURES.find((m) => m.id === state.measure);
        const host = root.querySelector('#prov-map');
        const breaks = tileMap(host, PROVINCES, { valueOf: (p) => p[measure.id], format: measure.format });
        root.querySelector('#prov-legend').innerHTML = legend(breaks, measure);
        const groups = ISLAND_GROUPS.map((g) => groupTotals(g.id));
        const bars = root.querySelector('#group-bars');
        bars.replaceChildren();
        bars.className = '';
        root.querySelector('#group-sub').textContent = `${measure.label}, ${measure.unit}`;
        barChart(bars, groups.map((g) => ({ label: g.name, value: g[measure.id], note: `${g.members.length} provinces` })).sort((a, b) => b.value - a.value),
          { format: measure.format, label: `${measure.label} by island group` });
      };

      const drawTable = () => {
        const needle = state.search.trim().toLowerCase();
        const list = PROVINCES
          .map((p) => ({ ...p, share: p.pop }))
          .filter((p) => (!state.group || p.group === state.group) && (!needle || `${p.name} ${p.local} ${p.capital}`.toLowerCase().includes(needle)))
          .sort((a, b) => {
            const col = COLUMNS.find((c) => c.key === state.sort);
            const [va, vb] = col.text ? [String(state.sort === 'group' ? groupName(a.group) : a[state.sort]), String(state.sort === 'group' ? groupName(b.group) : b[state.sort])] : [a[state.sort], b[state.sort]];
            return (col.text ? va.localeCompare(vb) : va - vb) * state.dir;
          });
        root.querySelector('#prov-rows').innerHTML = list.length ? rowsHtml(list) : '<tr><td colspan="7" class="muted">No province matches that search.</td></tr>';
        root.querySelector('#prov-count').textContent = `${list.length} of ${PROVINCES.length} provinces`;
        for (const th of root.querySelectorAll('th[data-key]')) {
          th.setAttribute('aria-sort', th.dataset.key === state.sort ? (state.dir > 0 ? 'ascending' : 'descending') : 'none');
        }
      };

      for (const button of root.querySelectorAll('[data-measure]')) {
        button.addEventListener('click', () => {
          state.measure = button.dataset.measure;
          for (const b of root.querySelectorAll('[data-measure]')) b.setAttribute('aria-pressed', String(b === button));
          history.replaceState(null, '', `#/regions?by=${state.measure}`);
          drawMap();
        });
      }
      for (const th of root.querySelectorAll('th[data-key]')) {
        th.querySelector('button').addEventListener('click', () => {
          const col = COLUMNS.find((c) => c.key === th.dataset.key);
          state.dir = state.sort === col.key ? -state.dir : col.text ? 1 : -1;
          state.sort = col.key;
          drawTable();
        });
      }
      root.querySelector('#prov-search').addEventListener('input', (e) => { state.search = e.target.value; drawTable(); });
      root.querySelector('#prov-group').addEventListener('change', (e) => { state.group = e.target.value; drawTable(); });
      root.querySelector('#prov-csv').addEventListener('click', () => {
        const rows = [['bps_code', 'province', 'indonesian_name', 'capital', 'island_group', 'population_mid_2025', 'land_area_km2', 'people_per_km2'],
          ...PROVINCES.map((p) => [p.bps, p.name, p.local, p.capital, groupName(p.group), p.pop, p.area, Math.round(p.density)])];
        downloadText('indonesia-provinces-2025.csv', toCsv(rows));
      });
      drawMap();
      drawTable();
    },
  };
}
