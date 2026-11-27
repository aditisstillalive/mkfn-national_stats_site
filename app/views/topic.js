// A topic page: its headline figures, the charts that tell its story, and a table of every indicator it holds.
import { esc } from '../lib/dom.js';
import { formatValue } from '../lib/format.js';
import { indicatorsInTopic, latestOf } from '../data/indicators.js';
import { TOPICS, getTopic } from '../data/topics.js';
import { TWO_NUMBERS } from '../data/sources.js';
import { changeBadge, mountSeriesCharts, seriesCard, statTile, twoNumbersNote } from './stat-blocks.js';

export function render([id]) {
  const topic = getTopic(id);
  if (!topic) return null;
  const html = `
    <p class="crumbs"><a href="#/">Overview</a> / Topics / ${esc(topic.title)}</p>
    <p class="eyebrow">Topic</p>
    <h1>${esc(topic.title)}</h1>
    <p class="lead">${esc(topic.intro)}</p>
    <section class="section" aria-label="Headline figures"><div class="tiles">${topic.tiles.map((t) => statTile(t)).join('')}</div>${topic.tiles.filter((t) => TWO_NUMBERS[t]).map((t) => twoNumbersNote(t, { compact: true })).join('')}</section>
    ${topic.stories.map((s) => seriesCard(s, { asStory: true })).join('')}
    <section class="section">
      <div class="section__head"><h2>All ${esc(topic.name.toLowerCase())} indicators</h2><a class="more" href="#/data">Full data catalogue</a></div>
      ${indicatorTable(topic.id)}
    </section>
    <section class="section"><h2>More topics</h2>${siblings(topic.id)}</section>`;
  return { title: topic.title, html, mount: (root) => mountSeriesCharts(root) };
}

function indicatorTable(topicId) {
  const rows = indicatorsInTopic(topicId).map((d) => {
    const { year, value } = latestOf(d);
    return `<tr><td><a href="#/indicator/${d.id}">${esc(d.name)}</a></td><td class="n">${formatValue(d, value)}</td><td class="n">${year}</td><td>${changeBadge(d)}</td><td class="muted">${esc(d.unit)}</td></tr>`;
  });
  return `<div class="table-wrap"><table><thead><tr><th>Indicator</th><th class="n">Latest</th><th class="n">Year</th><th>10-year change</th><th>Unit</th></tr></thead><tbody>${rows.join('')}</tbody></table></div>`;
}

function siblings(current) {
  return `<nav class="chips" aria-label="Other topics">${TOPICS.filter((t) => t.id !== current).map((t) => `<a class="chip" href="#/topic/${t.id}">${esc(t.title)}</a>`).join('')}</nav>`;
}

