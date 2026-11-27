// Building blocks the pages share: headline tiles, change badges, source lines and chart cards.
import { esc } from '../lib/dom.js';
import { formatChange, formatValue } from '../lib/format.js';
import { changeOver, getIndicator, latestOf, pointsOf, WDI_UPDATED } from '../data/indicators.js';
import { sparkline } from '../charts/sparkline.js';
import { lineChart } from '../charts/line-chart.js';
import { EVENTS } from '../data/topics.js';
import { formatDate, RELEASES, sourceTag, TWO_NUMBERS } from '../data/sources.js';

export const WDI_URL = 'https://data.worldbank.org/indicator/';

/** "+1.2 pts since 2015", coloured by whether the change is an improvement. */
export function changeBadge(indicator, years = 10) {
  const change = changeOver(indicator, years);
  if (!change) return '';
  const isRate = (indicator.suffix ?? '').includes('%');
  const absolute = ['years', 'births per woman'].includes(indicator.unit);
  const relative = !isRate && !absolute && change.ratio != null && Math.abs(change.ratio) < 10;
  const text = isRate
    ? `${formatChange(change.delta, 1)} pts`
    : relative ? formatChange(change.ratio * 100, 0, '%')
      : `${formatChange(change.delta, indicator.dp)}${indicator.unit === 'years' ? ' yrs' : ''}`;
  const good = indicator.better === 'up' ? change.delta > 0 : indicator.better === 'down' ? change.delta < 0 : null;
  const tone = Math.abs(change.delta) < 1e-9 || good === null ? 'flat' : good ? 'up' : 'down';
  return `<span class="delta delta--${tone}" title="Change since ${change.fromYear}">${text} since ${change.fromYear}</span>`;
}

/** A headline figure that links to its indicator page, with a sparkline and its source year. */
export function statTile(id, { label } = {}) {
  const d = getIndicator(id);
  const { year, value } = latestOf(d);
  const [prefix, suffix] = [d.prefix ?? '', d.suffix ?? ''];
  return `<a class="tile" href="#/indicator/${d.id}">
    <span class="tile__label">${esc(label ?? d.name)}</span>
    <span class="tile__value">${esc(prefix)}${formatValue(d, value, { withUnit: false })}<span class="tile__unit">${esc(suffix.trim() || shortUnit(d))}</span></span>
    <span class="tile__meta">${changeBadge(d)}${sparkline(pointsOf(d, 2000))}</span>
    <span class="tile__src">${esc(sourceTag(d))} · ${year}</span>
  </a>`;
}

/** The national population as BPS counts it: the sum of the 38 provinces, so the cover and the map agree. */
export function bpsPopulationTile() {
  const { bps } = TWO_NUMBERS.population;
  return `<a class="tile" href="#/indicator/population">
    <span class="tile__label">Population</span>
    <span class="tile__value">${bps.value.toFixed(1)}<span class="tile__unit">m</span></span>
    <span class="tile__meta">Sum of the 38 provinces</span>
    <span class="tile__src">BPS · ${bps.date}</span>
  </a>`;
}

/** The dated releases behind the site's figures, newest first. */
export function releasesList(limit = RELEASES.length) {
  return `<ol class="releases">${RELEASES.slice(0, limit).map((r) => `<li>
    <time datetime="${r.date}">${formatDate(r.date)}</time>
    <div><span class="tag">${esc(r.agency)}</span> <a href="${r.url}" rel="noopener">${esc(r.title)}</a>
    <p class="small muted">${esc(r.what)} <a href="${r.href}">See it here</a></p></div></li>`).join('')}</ol>`;
}

/** "Why two numbers": BPS and the World Bank side by side, with dates and the reason they differ. */
export function twoNumbersNote(id, { compact = false } = {}) {
  const n = TWO_NUMBERS[id];
  if (!n) return '';
  if (compact) {
    return `<p class="note small">BPS puts this at <b>${esc(n.bps.text)}</b> (${n.bps.date}); the World Bank at <b>${esc(n.wdi.text)}</b> (${n.wdi.date}). <a href="#/indicator/${id}">Why two numbers</a></p>`;
  }
  return `<aside class="callout" aria-label="Why two numbers">
    <h3>Why two numbers?</h3>
    <dl class="meta">
      <dt>BPS-Statistics Indonesia</dt><dd><b>${esc(n.bps.text)}</b>, ${n.bps.date}: sum of the 38 provinces, used on the cover and province pages</dd>
      <dt>World Bank WDI</dt><dd><b>${esc(n.wdi.text)}</b>, ${n.wdi.date}: this series, used for trends and comparisons</dd>
    </dl>
    <p>${esc(n.why)}</p>
  </aside>`;
}

function shortUnit(d) {
  return { 'births per woman': 'births per woman', years: 'years', 'deaths per 1,000 live births': 'per 1,000 births',
    'deaths per 100,000 live births': 'per 100k births', 'per 100 people': 'per 100 people', '0 = equal, 100 = unequal': 'index',
    'people per km² of land': 'per km²', 'births per 1,000 people': 'per 1,000' }[d.unit] ?? '';
}

/** The line under every chart: which agency, which WDI series, which update. */
export function sourceLine(indicators) {
  const list = indicators.map((d) => `${esc(d.origin)} (<a href="${WDI_URL}${d.code}?locations=ID" rel="noopener">${d.code}</a>)`);
  return `<p class="source">Source: ${[...new Set(list)].join('; ')}. Via World Bank WDI, updated ${WDI_UPDATED}.</p>`;
}

/** Markup for a chart card whose chart is drawn by mountSeriesCharts once the page is on screen. */
export function seriesCard({ title, text, series, events }, { asStory = false } = {}) {
  const indicators = series.map(getIndicator);
  const legend = indicators.length > 1
    ? `<div class="legend">${indicators.map((d, i) => `<span class="legend__key"><i style="background:var(--s${i + 1})"></i>${esc(d.name)}</span>`).join('')}</div>`
    : '';
  const unit = indicators[0].unit;
  const chart = `<div data-series="${series.join(',')}"${events ? ' data-events="1"' : ''}></div>`;
  const links = indicators.map((d) => `<a class="more" href="#/indicator/${d.id}">${esc(d.name)}</a>`).join(' ');
  if (asStory) {
    return `<article class="story">
      <div class="story__text"><h3>${esc(title)}</h3><p>${esc(text)}</p><p>${links}</p></div>
      <div class="card"><p class="card__sub">${esc(unit)}</p>${legend}${chart}${sourceLine(indicators)}</div>
    </article>`;
  }
  return `<article class="card"><h3>${esc(title)}</h3><p class="card__sub">${esc(unit)}</p>${legend}${chart}${text ? `<p class="small muted">${esc(text)}</p>` : ''}${sourceLine(indicators)}</article>`;
}

/** Draws every [data-series] placeholder inside root. */
export function mountSeriesCharts(root, fromYear) {
  for (const el of root.querySelectorAll('[data-series]')) {
    const series = el.dataset.series.split(',').map((id) => {
      const d = getIndicator(id);
      return { name: d.name, points: pointsOf(d, fromYear ?? -Infinity), format: (v) => formatValue(d, v) };
    });
    lineChart(el, series, { events: el.dataset.events ? EVENTS : [], area: series.length === 1, height: el.dataset.height ? Number(el.dataset.height) : undefined });
  }
}
