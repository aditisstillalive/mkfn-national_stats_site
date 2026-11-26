// Small DOM helpers: escaping text into HTML strings, building SVG nodes, and saving a file the visitor asks for.

const ESCAPES = { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' };

/** Escapes a string for safe use inside HTML text or a quoted attribute. */
export function esc(value) {
  return String(value ?? '').replace(/[&<>"']/g, (c) => ESCAPES[c]);
}

const SVG_NS = 'http://www.w3.org/2000/svg';

/** Creates an SVG element with attributes; text, if given, becomes its content. */
export function svgEl(name, attrs = {}, text) {
  const node = document.createElementNS(SVG_NS, name);
  for (const [key, value] of Object.entries(attrs)) if (value != null) node.setAttribute(key, value);
  if (text != null) node.textContent = text;
  return node;
}

/** Offers text to the visitor as a downloaded file (used for CSV exports). */
export function downloadText(filename, text, type = 'text/csv') {
  const url = URL.createObjectURL(new Blob([text], { type: `${type};charset=utf-8` }));
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.append(link);
  link.click();
  link.remove();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}

/** Turns rows of values into CSV text, quoting where needed. */
export function toCsv(rows) {
  return rows.map((row) => row.map((cell) => {
    const text = cell == null ? '' : String(cell);
    return /[",\n]/.test(text) ? `"${text.replace(/"/g, '""')}"` : text;
  }).join(',')).join('\n') + '\n';
}

/** Re-runs draw() whenever the element changes width, so charts stay crisp at any size; stops once it leaves the page. */
export function keepDrawn(element, draw) {
  let width = 0;
  const redraw = () => { width = element.clientWidth; draw(width); };
  const observer = new ResizeObserver(() => {
    if (!element.isConnected) { observer.disconnect(); return; }
    if (element.clientWidth !== width) redraw();
  });
  observer.observe(element);
  redraw();
}
