// Number and text formatting shared by every page and chart.

const cache = new Map();

function formatter(dp) {
  if (!cache.has(dp)) cache.set(dp, new Intl.NumberFormat('en-US', { minimumFractionDigits: dp, maximumFractionDigits: dp }));
  return cache.get(dp);
}

/** A value with a fixed number of decimals, or an en dash when there is none. */
export function formatNumber(value, dp = 1) {
  return value == null || Number.isNaN(value) ? '–' : formatter(dp).format(value);
}

/** A value as an indicator wants it shown: its decimals, and its prefix or suffix (US$, %). */
export function formatValue(indicator, value, { withUnit = true } = {}) {
  if (value == null) return '–';
  const text = formatNumber(value, indicator.dp);
  if (!withUnit) return text;
  return `${indicator.prefix ?? ''}${text}${indicator.suffix ?? ''}`;
}

/** A signed change such as "+1.2 pts" or "−3.4%". */
export function formatChange(delta, dp = 1, unit = '') {
  if (delta == null || Number.isNaN(delta)) return '–';
  const sign = delta > 0 ? '+' : delta < 0 ? '−' : '±';
  return `${sign}${formatNumber(Math.abs(delta), dp)}${unit}`;
}

export function ordinal(n) {
  const s = ['th', 'st', 'nd', 'rd'];
  const v = n % 100;
  return n + (s[(v - 20) % 10] || s[v] || s[0]);
}
