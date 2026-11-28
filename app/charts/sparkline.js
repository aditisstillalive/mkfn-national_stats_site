// Tiny charts for a stat tile's corner: a trend line (shape and latest point) or a one-row bar of shares.
import { esc } from '../lib/dom.js';
import { linear } from './scale.js';

export function sparkline(points, width = 96, height = 30) {
  if (points.length < 2) return '';
  const xs = points.map((p) => p[0]);
  const ys = points.map((p) => p[1]);
  const x = linear([Math.min(...xs), Math.max(...xs)], [2, width - 4]);
  const y = linear([Math.min(...ys), Math.max(...ys)], [height - 3, 3]);
  const d = points.map(([px, py], i) => `${i ? 'L' : 'M'}${x(px).toFixed(1)},${y(py).toFixed(1)}`).join('');
  const [lx, ly] = points[points.length - 1];
  return `<svg class="tile__spark" viewBox="0 0 ${width} ${height}" aria-hidden="true"><path d="${d}"/><circle cx="${x(lx).toFixed(1)}" cy="${y(ly).toFixed(1)}" r="2.6"/></svg>`;
}

/** A one-row stacked bar of shares, for a tile's chart slot: the highlighted part in the series colour. */
export function shareBar(parts, width = 96, height = 30) {
  const total = parts.reduce((sum, p) => sum + p.value, 0);
  let x = 0;
  const rects = parts.map((p) => {
    const w = (p.value / total) * width;
    const rect = `<rect x="${x.toFixed(1)}" y="${height / 2 - 6}" width="${Math.max(1, w - 1).toFixed(1)}" height="12" rx="2" class="${p.highlight ? 'is-hl' : ''}"><title>${esc(p.name)}: ${((p.value / total) * 100).toFixed(1)}%</title></rect>`;
    x += w;
    return rect;
  });
  return `<svg class="tile__spark tile__share" viewBox="0 0 ${width} ${height}" aria-hidden="true">${rects.join('')}</svg>`;
}
