// Shown for any address the router does not know, with a way back to every section.
import { esc } from '../lib/dom.js';

export function render([path]) {
  return {
    title: 'Page not found',
    html: `<p class="eyebrow">Not found</p><h1>No page at ${esc(path)}</h1>
      <p class="lead">The link may be out of date. Try the <a href="#/">overview</a>, the <a href="#/data">data catalogue</a> or the <a href="#/regions">provinces</a>.</p>`,
  };
}
