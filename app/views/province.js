// One province: its population, land and density, its rank among the 38, and how it compares with the other
// provinces of its island group.
import { esc } from '../lib/dom.js';
import { formatNumber, ordinal } from '../lib/format.js';
import { NATIONAL, PROVINCES, PROVINCE_SOURCE, getProvince, groupName, groupTotals, rankOf } from '../data/provinces.js';
import { tileMap } from '../charts/tile-map.js';
import { barChart } from '../charts/bar-chart.js';
import { twoNumbersNote } from './stat-blocks.js';

function neighbours(p) {
  const sorted = [...PROVINCES].sort((a, b) => b.pop - a.pop);
  const i = sorted.indexOf(p);
  return { bigger: sorted[i - 1] ?? null, smaller: sorted[i + 1] ?? null };
}

export function render([iso]) {
  const p = getProvince(iso);
  if (!p) return null;
  const group = groupTotals(p.group);
  const share = (p.pop / NATIONAL.pop) * 100;
  const { bigger, smaller } = neighbours(p);
  const nationalDensity = NATIONAL.pop / NATIONAL.area;
  const denser = p.density / nationalDensity;
  const tile = (label, value, note) => `<div class="tile"><span class="tile__label">${label}</span><span class="tile__value">${value}</span><span class="tile__meta"><span>${note}</span></span><span class="tile__src">BPS · mid-2025</span></div>`;

  const html = `
    <p class="crumbs"><a href="#/">Overview</a> / <a href="#/regions">Provinces</a> / ${esc(p.name)}</p>
    <p class="eyebrow">${esc(groupName(p.group))} · BPS code ${p.bps} · ISO ID-${p.iso.toUpperCase()}</p>
    <h1>${esc(p.name)}</h1>
    <p class="lead">${esc(p.local)}, capital ${esc(p.capital)}. Home to ${formatNumber(p.pop / 1e6, 2)} million people in mid-2025, ${formatNumber(share, 1)}% of Indonesia's population, and ${denser >= 1 ? `${formatNumber(denser, 1)} times` : `${formatNumber(1 / denser, 1)} times less`} as densely settled as the country as a whole.</p>

    <section class="section"><div class="tiles">
      ${tile('Population, mid-2025', `${formatNumber(p.pop / 1e6, 2)}<span class="tile__unit">million</span>`, `${ordinal(rankOf(p, 'pop'))} of 38 provinces`)}
      ${tile('Share of Indonesia', `${formatNumber(share, 1)}<span class="tile__unit">%</span>`, `of ${formatNumber(NATIONAL.pop / 1e6, 1)} million`)}
      ${tile('Land area', `${formatNumber(p.area, 0)}<span class="tile__unit">km²</span>`, `${ordinal(rankOf(p, 'area'))} largest`)}
      ${tile('Population density', `${formatNumber(p.density, 0)}<span class="tile__unit">per km²</span>`, `${ordinal(rankOf(p, 'density'))} densest · national ${formatNumber(nationalDensity, 0)}`)}
    </div>${twoNumbersNote('population', { compact: true })}</section>

    <section class="section grid-2">
      <article class="card">
        <h3>${esc(group.name)}: population by province</h3><p class="card__sub">Million people, mid-2025 · ${esc(p.name)} highlighted</p>
        <div id="group-bars"></div>
        <p class="source">Source: ${esc(PROVINCE_SOURCE)}.</p>
      </article>
      <article class="card">
        <h3>Where it sits</h3><p class="card__sub">Population by province · selected tile outlined</p>
        <div id="prov-map"></div>
        <ul class="rank-list">
          <li><span>${esc(group.name)} total</span><span class="num">${formatNumber(group.pop / 1e6, 1)} m in ${group.members.length} provinces</span></li>
          ${bigger ? `<li><span>Next larger</span><a href="#/region/${bigger.iso}">${esc(bigger.name)} · ${formatNumber(bigger.pop / 1e6, 2)} m</a></li>` : ''}
          ${smaller ? `<li><span>Next smaller</span><a href="#/region/${smaller.iso}">${esc(smaller.name)} · ${formatNumber(smaller.pop / 1e6, 2)} m</a></li>` : ''}
        </ul>
      </article>
    </section>
    <p><a class="more" href="#/regions">Back to all provinces</a></p>`;

  return {
    title: p.name,
    html,
    mount(root) {
      const items = group.members.map((m) => ({ label: m.name, value: m.pop / 1e6, highlight: m === p, href: `#/region/${m.iso}` })).sort((a, b) => b.value - a.value);
      barChart(root.querySelector('#group-bars'), items, { format: (v) => `${formatNumber(v, 2)} m`, label: `Population of ${group.name} provinces` });
      tileMap(root.querySelector('#prov-map'), PROVINCES, { valueOf: (q) => q.pop, format: (v) => `${formatNumber(v / 1e6, 2)} million people`, selected: p.iso });
    },
  };
}
