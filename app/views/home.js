// Overview page: the headline figures, the long view, a door into each topic, the provinces and the neighbours.
import { esc } from '../lib/dom.js';
import { formatNumber, formatValue } from '../lib/format.js';
import { INDICATORS, getIndicator, latestOf, WDI_UPDATED } from '../data/indicators.js';
import { TOPICS } from '../data/topics.js';
import { NATIONAL, PROVINCES, PROVINCE_SOURCE } from '../data/provinces.js';
import { PEERS, getPeerMetric } from '../data/peers.js';
import { formatDate, RELEASES } from '../data/sources.js';
import { tileMap } from '../charts/tile-map.js';
import { barChart } from '../charts/bar-chart.js';
import { bpsPopulationTile, mountSeriesCharts, releasesList, seriesCard, statTile } from './stat-blocks.js';

const HEADLINES = ['population', 'gdp', 'gdp-growth', 'inflation', 'unemployment', 'poverty', 'life-expectancy', 'internet'];
const SHORT_LABELS = { inflation: 'Inflation', poverty: 'Poverty rate', 'life-expectancy': 'Life expectancy' };

function topicCard(topic) {
  const lead = getIndicator(topic.tiles[0]);
  const { year, value } = latestOf(lead);
  // The people card leads with BPS's count, like the population tile above it.
  const figure = lead.id === 'population'
    ? `<span class="stat">${formatNumber(NATIONAL.pop / 1e6, 1)} m</span> <span class="small muted">people, BPS mid-2025</span>`
    : `<span class="stat">${formatValue(lead, value)}</span> <span class="small muted">${esc(lead.name.toLowerCase())}, ${year}</span>`;
  return `<a class="card topic-card" href="#/topic/${topic.id}">
    <h3>${esc(topic.title)}</h3>
    <p>${esc(topic.intro.split('. ')[0])}.</p>
    <div class="card__foot"><span>${figure}</span><span class="more">Explore</span></div>
  </a>`;
}

function topProvinces() {
  const top = [...PROVINCES].sort((a, b) => b.pop - a.pop).slice(0, 5);
  return `<ol class="rank-list">${top.map((p) => `<li><a href="#/region/${p.iso}">${esc(p.name)}</a><span class="num">${formatNumber(p.pop / 1e6, 1)} m</span></li>`).join('')}</ol>`;
}

export function render() {
  const html = `
  <section class="hero">
    <div>
      <p class="eyebrow">Republic of Indonesia · official statistics, explained</p>
      <h1>Indonesia in <em>figures</em></h1>
      <p class="lead">People, economy, jobs, health, schooling, environment and all 38 provinces. Every figure shows its year and its source: BPS-Statistics Indonesia and the World Bank.</p>
      <ul class="hero__facts">
        <li>Capital <b>Jakarta</b></li><li>Provinces <b>38</b></li><li>Land <b>${formatNumber(NATIONAL.area / 1e6, 2)} million km²</b></li><li>World Bank income group <b>upper middle</b></li>
      </ul>
      <div class="hero__note">
        <p class="hero__note-head"><b>Latest releases</b><a href="#/data">All ${INDICATORS.length} indicators and releases</a></p>
        <ul class="hero__releases">${RELEASES.slice(0, 3).map((r) => `<li><time datetime="${r.date}">${formatDate(r.date, { short: true })}</time><span class="tag">${esc(r.agency)}</span><span>${esc(r.short)}</span></li>`).join('')}</ul>
      </div>
    </div>
    <div class="card hero__map">
      <div class="card__foot"><h3>Where ${formatNumber(NATIONAL.pop / 1e6, 1)} million Indonesians live</h3><a class="more" href="#/regions">Provinces</a></div>
      <p class="card__sub">Population by province, mid-2025 · darker = more people · select a province</p>
      <div id="home-map"></div>
      <p class="source">Source: BPS-Statistics Indonesia, mid-2025 estimates.</p>
    </div>
  </section>

  <section aria-label="Headline figures">
    <div class="tiles">${HEADLINES.map((id) => (id === 'population' ? bpsPopulationTile() : statTile(id, { label: SHORT_LABELS[id] }))).join('')}</div>
  </section>

  <section class="section">
    <div class="section__head"><h2>The long view</h2><a class="more" href="#/topic/economy">Economy</a></div>
    <div class="grid-2">
      ${seriesCard({ title: 'Real GDP growth', series: ['gdp-growth'], events: true, text: 'Two contractions since 1990: the 1998 Asian financial crisis and the 2020 pandemic.' })}
      ${seriesCard({ title: 'Share of people below the national poverty line', series: ['poverty'], events: true, text: 'From 23.4% in 1999 to 8.5% in 2025, the lowest on record.' })}
    </div>
  </section>

  <section class="section">
    <div class="section__head"><h2>Explore by topic</h2><a class="more" href="#/data">Data catalogue</a></div>
    <div class="grid-3">${TOPICS.map(topicCard).join('')}
      <a class="card topic-card" href="#/compare"><h3>Indonesia and its neighbours</h3><p>How Indonesia compares with India, Malaysia, the Philippines, Thailand and Viet Nam on twelve measures.</p><div class="card__foot"><span class="small muted">12 measures · 6 countries</span><span class="more">Compare</span></div></a>
      <a class="card topic-card" href="#/regions"><h3>The 38 provinces</h3><p>Population, land and density for every province, on a map and in a sortable table.</p><div class="card__foot"><span class="small muted">BPS mid-2025 estimates</span><span class="more">Provinces</span></div></a>
    </div>
  </section>

  <section class="section grid-2">
    <article class="card">
      <h3>Most populous provinces</h3><p class="card__sub">Million people, mid-2025</p>
      ${topProvinces()}
      <p class="source">Source: ${esc(PROVINCE_SOURCE)}. <a href="#/regions">All 38 provinces</a></p>
    </article>
    <article class="card">
      <h3>GDP per person beside the neighbours</h3><p class="card__sub">At purchasing power parity, international $, 2025</p>
      <div id="home-peers"></div>
      <p class="source">Source: World Bank International Comparison Program, via WDI (NY.GDP.PCAP.PP.CD). <a href="#/compare/gdp-per-capita-ppp">Compare twelve measures</a></p>
    </article>
  </section>

  <section class="section" id="releases">
    <div class="section__head"><h2>Latest releases</h2><a class="more" href="#/about">Sources and methods</a></div>
    <div class="card">${releasesList()}</div>
  </section>`;

  return {
    title: '',
    html,
    mount(root) {
      mountSeriesCharts(root);
      tileMap(root.querySelector('#home-map'), PROVINCES, { valueOf: (p) => p.pop, format: (v) => `${formatNumber(v / 1e6, 1)} million people` });
      const metric = getPeerMetric('gdp-per-capita-ppp');
      const items = PEERS.map((c, i) => ({ label: c.name, value: metric.values[i], highlight: c.iso === 'IDN' })).sort((a, b) => b.value - a.value);
      barChart(root.querySelector('#home-peers'), items, { format: (v) => `$${formatNumber(v, 0)}`, rowHeight: 26, label: 'GDP per person at purchasing power parity' });
    },
  };
}
