// Tile map of the 38 provinces: one equal square each, laid out west to east like the archipelago, shaded on a
// single-hue scale by the chosen measure. Every tile is a link to that province's page.
import { esc } from '../lib/dom.js';
import { createTooltip } from './tooltip.js';

const STEPS = 6;
const SEAS = [
  { col: 0.2, row: 5.6, text: 'Indian Ocean' },
  { col: 5.1, row: 4.25, text: 'Java Sea' },
  { col: 11.4, row: 4.5, text: 'Banda Sea' },
  { col: 11.6, row: 0.35, text: 'Pacific Ocean' },
];

/** Class breaks at quantiles, so each shade holds about the same number of provinces. */
export function quantileBreaks(values, steps = STEPS) {
  const sorted = [...values].sort((a, b) => a - b);
  return Array.from({ length: steps - 1 }, (_, i) => sorted[Math.floor(((i + 1) * sorted.length) / steps)]);
}

export function stepOf(value, breaks) {
  let i = 0;
  while (i < breaks.length && value >= breaks[i]) i++;
  return i;
}

/**
 * provinces: [{ iso, name, col, row }]; options: { valueOf(p), format(v), selected: iso }
 * Returns the breaks used, so the page can draw a matching legend.
 */
export function tileMap(container, provinces, options) {
  container.classList.add('chart', 'tilemap');
  const cols = Math.max(...provinces.map((p) => p.col)) + 1;
  const rows = Math.max(...provinces.map((p) => p.row)) + 1;
  const size = 60;
  const gap = 4;
  const breaks = quantileBreaks(provinces.map(options.valueOf));
  const tiles = provinces.map((p) => {
    const step = stepOf(options.valueOf(p), breaks);
    const ink = step >= 3 ? '#ffffff' : 'var(--ink)';
    const x = p.col * size;
    const y = p.row * size;
    return `<a href="#/region/${p.iso}" data-iso="${p.iso}"${p.iso === options.selected ? ' class="is-selected"' : ''} aria-label="${esc(p.name)}: ${esc(options.format(options.valueOf(p)))}">` +
      `<rect x="${x + gap / 2}" y="${y + gap / 2}" width="${size - gap}" height="${size - gap}" rx="7" style="fill:var(--seq-${step})"/>` +
      `<text x="${x + size / 2}" y="${y + size / 2 + 4}" text-anchor="middle" style="fill:${ink}">${p.iso.toUpperCase()}</text></a>`;
  });
  const seas = SEAS.map((s) => `<text class="sea" x="${s.col * size}" y="${s.row * size}">${s.text}</text>`);
  container.innerHTML = `<svg viewBox="0 0 ${cols * size} ${rows * size}" role="group" aria-label="Tile map of Indonesia's provinces">${seas.join('')}${tiles.join('')}</svg>`;

  const tooltip = createTooltip(container);
  const byIso = new Map(provinces.map((p) => [p.iso, p]));
  const svg = container.querySelector('svg');
  const show = (link) => {
    const p = byIso.get(link.dataset.iso);
    const box = link.getBoundingClientRect();
    const host = container.getBoundingClientRect();
    tooltip.show(`<b>${esc(p.name)}</b><div>${esc(options.format(options.valueOf(p)))}</div>`, box.left - host.left + container.scrollLeft + box.width / 2, box.top - host.top);
  };
  for (const link of svg.querySelectorAll('a')) {
    link.addEventListener('pointerenter', () => show(link));
    link.addEventListener('focus', () => show(link));
    link.addEventListener('pointerleave', () => tooltip.hide());
    link.addEventListener('blur', () => tooltip.hide());
  }
  return breaks;
}
