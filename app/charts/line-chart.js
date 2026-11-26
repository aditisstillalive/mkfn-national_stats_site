// Time-series line chart in SVG: one y axis, recessive grid, optional shaded event bands, the latest value labelled
// at each line's end, and a crosshair tooltip that follows the pointer (or a finger) year by year.
import { esc, keepDrawn } from '../lib/dom.js';
import { formatNumber } from '../lib/format.js';
import { linear, niceTicks, stepDecimals, textWidth, yearTicks } from './scale.js';
import { createTooltip } from './tooltip.js';

export const SERIES_COLORS = ['var(--s1)', 'var(--s2)', 'var(--s3)'];

/**
 * series: [{ name, points: [[year, value]], format: (v) => string }]
 * options: { height, events: [{ from, to, label }], zero: include 0 on the y axis, area: shade under a single line }
 */
export function lineChart(container, series, options = {}) {
  container.classList.add('chart');
  const label = series.map((s) => `${s.name} from ${s.points[0]?.[0]} to ${s.points.at(-1)?.[0]}`).join('; ');
  const tooltip = createTooltip(container);
  let svgHost = document.createElement('div');
  container.prepend(svgHost);

  keepDrawn(container, (width) => {
    const height = options.height ?? (width < 520 ? 220 : 270);
    const all = series.flatMap((s) => s.points);
    if (!all.length || !width) return;
    const years = all.map((p) => p[0]);
    const values = all.map((p) => p[1]);
    const first = Math.min(...years);
    const last = Math.max(...years);
    let lo = Math.min(...values);
    let hi = Math.max(...values);
    if (options.zero !== false && lo > 0 && lo < hi * 0.6) lo = 0;
    if (hi < 0) hi = 0;
    const pad = (hi - lo) * 0.06;
    const y0 = niceTicks(lo - (lo === 0 ? 0 : pad), hi + pad, height < 240 ? 4 : 5);
    const dp = stepDecimals(y0.step);
    const tickText = y0.ticks.map((t) => formatNumber(t, dp));
    const left = Math.max(28, Math.max(...tickText.map((t) => textWidth(t, 11))) + 12);
    const endText = series.map((s) => s.format(s.points.at(-1)[1]));
    const right = Math.max(16, Math.max(...endText.map((t) => textWidth(t, 12, 600))) + 14);
    const m = { t: 18, r: right, b: 26, l: left };
    const x = linear([first, last], [m.l, width - m.r]);
    const y = linear([y0.min, y0.max], [height - m.b, m.t]);

    const parts = [];
    for (const band of options.events ?? []) {
      if (band.to < first || band.from > last) continue;
      const bx = x(Math.max(band.from, first));
      const bw = Math.max(4, x(Math.min(band.to, last)) - bx);
      parts.push(`<g class="band"><rect x="${bx}" y="${m.t}" width="${bw}" height="${height - m.t - m.b}"/>` +
        (width > 520 ? `<text x="${bx + 4}" y="${m.t + 11}">${esc(band.label)}</text>` : '') + '</g>');
    }
    parts.push('<g class="grid axis">');
    y0.ticks.forEach((t, i) => {
      parts.push(`<line x1="${m.l}" x2="${width - m.r}" y1="${y(t)}" y2="${y(t)}"${t === 0 && y0.min < 0 ? ' class="zero"' : ''}/>`);
      parts.push(`<text x="${m.l - 8}" y="${y(t) + 4}" text-anchor="end">${tickText[i]}</text>`);
    });
    for (const yr of yearTicks(first, last, width - m.l - m.r)) {
      parts.push(`<text x="${x(yr)}" y="${height - 6}" text-anchor="middle">${yr}</text>`);
    }
    parts.push('</g>');

    const ends = [];
    series.forEach((s, i) => {
      const color = s.color ?? SERIES_COLORS[i % SERIES_COLORS.length];
      const d = s.points.map(([px, py], k) => `${k ? 'L' : 'M'}${x(px).toFixed(1)},${y(py).toFixed(1)}`).join('');
      parts.push(`<g class="series" style="color:${color}">`);
      if (options.area && series.length === 1) {
        const base = y(Math.max(y0.min, 0));
        parts.push(`<path class="area" style="fill:${color}" d="${d}L${x(s.points.at(-1)[0])},${base}L${x(s.points[0][0])},${base}Z"/>`);
      }
      parts.push(`<path class="line" style="stroke:${color}" d="${d}"/>`);
      const sparse = s.points.length < 14 || s.points.length < (s.points.at(-1)[0] - s.points[0][0] + 1);
      if (sparse) for (const [px, py] of s.points) parts.push(`<circle cx="${x(px)}" cy="${y(py)}" r="3.5" style="fill:${color}"/>`);
      const [lx, ly] = s.points.at(-1);
      parts.push(`<circle cx="${x(lx)}" cy="${y(ly)}" r="4.5" style="fill:${color}"/></g>`);
      ends.push({ y: y(ly), x: x(lx), text: endText[i] });
    });
    // Nudge end labels apart so two lines ending close together stay readable.
    ends.sort((a, b) => a.y - b.y);
    for (let i = 1; i < ends.length; i++) if (ends[i].y - ends[i - 1].y < 14) ends[i].y = ends[i - 1].y + 14;
    for (const e of ends) parts.push(`<text class="end-label" x="${e.x + 8}" y="${e.y + 4}">${esc(e.text)}</text>`);

    parts.push(`<line class="cross" x1="0" x2="0" y1="${m.t}" y2="${height - m.b}" visibility="hidden"/>`);
    parts.push(`<g class="hover-dots"></g>`);
    parts.push(`<rect class="hit" x="${m.l}" y="0" width="${width - m.l - m.r + 8}" height="${height}"/>`);

    svgHost.innerHTML = `<svg viewBox="0 0 ${width} ${height}" height="${height}" role="img" aria-label="${esc(label)}">${parts.join('')}</svg>`;
    const svg = svgHost.firstChild;
    const cross = svg.querySelector('.cross');
    const dots = svg.querySelector('.hover-dots');
    const hit = svg.querySelector('.hit');

    const showYear = (px) => {
      const year = Math.round(Math.min(last, Math.max(first, x.invert(px))));
      const rows = [];
      let top = height;
      dots.innerHTML = '';
      series.forEach((s, i) => {
        const point = s.points.find((p) => p[0] === year);
        const color = s.color ?? SERIES_COLORS[i % SERIES_COLORS.length];
        if (!point) { rows.push(`<div><i style="background:${color}"></i>${esc(s.name)}: no data</div>`); return; }
        top = Math.min(top, y(point[1]));
        dots.insertAdjacentHTML('beforeend', `<circle cx="${x(year)}" cy="${y(point[1])}" r="5" style="fill:${color};stroke:var(--card);stroke-width:2"/>`);
        rows.push(`<div><i style="background:${color}"></i>${series.length > 1 ? esc(s.name) + ': ' : ''}<b>${esc(s.format(point[1]))}</b></div>`);
      });
      cross.setAttribute('x1', x(year));
      cross.setAttribute('x2', x(year));
      cross.setAttribute('visibility', 'visible');
      tooltip.show(`<div><b>${year}</b></div>${rows.join('')}`, x(year), top);
    };
    const hide = () => { cross.setAttribute('visibility', 'hidden'); dots.innerHTML = ''; tooltip.hide(); };
    const localX = (event) => event.clientX - svg.getBoundingClientRect().left;
    hit.addEventListener('pointermove', (event) => showYear(localX(event)));
    hit.addEventListener('pointerdown', (event) => showYear(localX(event)));
    hit.addEventListener('pointerleave', hide);
  });
}
