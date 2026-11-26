// Horizontal bar chart for ranking a handful of items (countries, provinces, island groups). Bars start at zero with
// a 4px rounded end, Indonesia (or the chosen item) is drawn in the accent colour, and each bar names its value.
import { esc, keepDrawn } from '../lib/dom.js';
import { linear, textWidth } from './scale.js';
import { createTooltip } from './tooltip.js';

/**
 * items: [{ label, value, highlight, href, note }]
 * options: { format: (v) => string, labelWidth }
 */
export function barChart(container, items, options = {}) {
  container.classList.add('chart');
  const tooltip = createTooltip(container);
  const host = document.createElement('div');
  container.prepend(host);
  const format = options.format ?? String;

  keepDrawn(container, (width) => {
    if (!width) return;
    const row = options.rowHeight ?? 30;
    const labelWidth = options.labelWidth ?? Math.min(width * 0.48, Math.max(...items.map((d) => textWidth(d.label, 12, d.highlight ? 700 : 400))) + 12);
    const valueRoom = Math.max(...items.map((d) => textWidth(format(d.value), 12, 600))) + 14;
    const min = Math.min(0, ...items.map((d) => d.value));
    const max = Math.max(0, ...items.map((d) => d.value));
    const x = linear([min, max], [labelWidth, width - valueRoom]);
    const height = items.length * row + 6;
    const parts = [];
    items.forEach((d, i) => {
      const top = i * row + 3;
      const x0 = x(Math.min(0, d.value));
      const w = Math.max(2, Math.abs(x(d.value) - x(0)));
      const fill = d.highlight ? 'var(--s2)' : 'var(--s1)';
      const name = `<text class="bar-label" x="${labelWidth - 8}" y="${top + row / 2 + 1}" text-anchor="end" dominant-baseline="middle"${d.highlight ? ' font-weight="700"' : ''}>${esc(d.label)}</text>`;
      parts.push(`<g class="bar-row" data-i="${i}">`);
      parts.push(d.href ? `<a href="${esc(d.href)}">${name}</a>` : name);
      parts.push(`<rect class="bar" x="${x0}" y="${top + 5}" width="${w}" height="${row - 12}" style="fill:${fill}"/>`);
      const vx = d.value < 0 ? x0 - 6 : x0 + w + 6;
      parts.push(`<text class="bar-value" x="${vx}" y="${top + row / 2 + 1}" dominant-baseline="middle" text-anchor="${d.value < 0 ? 'end' : 'start'}">${esc(format(d.value))}</text>`);
      parts.push(`<rect x="0" y="${top}" width="${width}" height="${row}" fill="transparent" class="bar-hit"/></g>`);
    });
    if (min < 0) parts.push(`<line x1="${x(0)}" x2="${x(0)}" y1="0" y2="${height}" stroke="var(--ink-3)"/>`);
    host.innerHTML = `<svg viewBox="0 0 ${width} ${height}" height="${height}" role="img" aria-label="${esc(options.label ?? 'Bar chart')}">${parts.join('')}</svg>`;
    for (const g of host.querySelectorAll('.bar-row')) {
      const d = items[Number(g.dataset.i)];
      const hit = g.querySelector('.bar-hit');
      hit.addEventListener('pointerenter', () => {
        const box = hit.getBBox();
        tooltip.show(`<b>${esc(d.label)}</b>: ${esc(format(d.value))}${d.note ? `<div>${esc(d.note)}</div>` : ''}`, Math.min(x(d.value), width - 60), box.y + 4);
      });
      hit.addEventListener('pointerleave', () => tooltip.hide());
      if (d.href) hit.addEventListener('click', () => { location.hash = d.href.slice(1); });
      if (d.href) hit.style.cursor = 'pointer';
    }
  });
}
