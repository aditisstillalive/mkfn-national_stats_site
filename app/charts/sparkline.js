// A tiny trend line for stat tiles: no axes, no hover, just the shape and the latest point.
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
