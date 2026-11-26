// Scales and tick choices shared by the charts.

/** A linear map from a data domain to a pixel range. */
export function linear([d0, d1], [r0, r1]) {
  const k = d1 === d0 ? 0 : (r1 - r0) / (d1 - d0);
  const map = (v) => r0 + (v - d0) * k;
  map.invert = (px) => (k === 0 ? d0 : d0 + (px - r0) / k);
  return map;
}

/** Round tick values covering [min, max] with about `count` steps (1, 2 or 5 times a power of ten). */
export function niceTicks(min, max, count = 5) {
  if (min === max) { min -= 1; max += 1; }
  const raw = (max - min) / count;
  const power = 10 ** Math.floor(Math.log10(raw));
  const err = raw / power;
  const step = power * (err >= 7.5 ? 10 : err >= 3.5 ? 5 : err >= 1.5 ? 2 : 1);
  const start = Math.floor(min / step + 1e-9) * step;
  const end = Math.ceil(max / step - 1e-9) * step;
  const ticks = [];
  for (let v = start; v <= end + step / 2; v += step) ticks.push(Math.round(v / step) * step);
  return { ticks, step, min: start, max: end };
}

/** Decimal places that make every tick of this step readable. */
export function stepDecimals(step) {
  return step >= 1 ? 0 : Math.min(3, Math.ceil(-Math.log10(step) - 1e-9));
}

let measureContext = null;

/** Width in pixels of a chart label set in the site's sans-serif at the given size and weight. */
export function textWidth(text, size = 12, weight = 400) {
  measureContext ??= document.createElement('canvas').getContext('2d');
  measureContext.font = `${weight} ${size}px ${getComputedStyle(document.body).fontFamily}`;
  return measureContext.measureText(text).width;
}

/** Years to label on an x axis of this width. */
export function yearTicks(first, last, width) {
  const span = last - first;
  const room = Math.max(2, Math.floor(width / 56));
  const step = [1, 2, 5, 10, 20].find((s) => span / s <= room) ?? 20;
  const ticks = [];
  for (let y = Math.ceil(first / step) * step; y <= last; y += step) ticks.push(y);
  return ticks;
}
