// Sources and methods: where each figure comes from, how it was checked, and what to keep in mind when using it.
import { esc } from '../lib/dom.js';
import { INDICATORS, WDI_UPDATED } from '../data/indicators.js';
import { NATIONAL, PROVINCE_SOURCE } from '../data/provinces.js';

const AGENCIES = [
  { name: 'BPS-Statistics Indonesia (Badan Pusat Statistik)', url: 'https://www.bps.go.id/en', role: 'The national statistics office. Runs the census, the labour force survey (Sakernas), the socio-economic survey (Susenas), the consumer price index and the national accounts that most international series start from. Source of the provincial population estimates.' },
  { name: 'World Bank, World Development Indicators', url: 'https://datacatalog.worldbank.org/search/dataset/0037712/World-Development-Indicators', role: `Compiles comparable national series from the agencies below. Every national time series on this site was read from WDI's update of ${WDI_UPDATED}.` },
  { name: 'United Nations Population Division', url: 'https://population.un.org/wpp/', role: 'World Population Prospects 2024: population, age structure, fertility and life expectancy.' },
  { name: 'International Labour Organization (ILOSTAT)', url: 'https://ilostat.ilo.org/', role: 'Modelled unemployment, labour force participation and employment by sector, built from Sakernas.' },
  { name: 'International Monetary Fund', url: 'https://data.imf.org/', role: 'Consumer price inflation, exchange rates and the balance of payments.' },
  { name: 'UNESCO Institute for Statistics', url: 'https://uis.unesco.org/', role: 'School enrolment and adult literacy.' },
  { name: 'WHO and UNICEF', url: 'https://washdata.org/', role: 'Health spending, maternal and child mortality, stunting, drinking water and sanitation.' },
  { name: 'FAO, EDGAR (EU Joint Research Centre), IEA and IRENA', url: 'https://edgar.jrc.ec.europa.eu/', role: 'Forest cover, CO₂ emissions and renewable energy.' },
  { name: 'International Telecommunication Union', url: 'https://www.itu.int/en/ITU-D/Statistics/', role: 'Internet use and mobile subscriptions.' },
];

export function render() {
  const html = `
    <p class="crumbs"><a href="#/">Overview</a> / Sources and methods</p>
    <p class="eyebrow">Sources and methods</p>
    <h1>Where these figures come from</h1>
    <p class="lead">Angka Nusantara is an independent, non-commercial guide. It republishes official and international statistics on Indonesia with their sources, so anyone can check them. It is not affiliated with BPS or the World Bank, and it does not produce estimates of its own.</p>

    <section class="section grid-2">
      <div class="card">
        <h3>How the figures were checked</h3>
        <ul>
          <li>All ${INDICATORS.length} national series were read from the World Bank WDI database (update of ${WDI_UPDATED}) and checked value by value against it; values are rounded only for display.</li>
          <li>Each chart names the agency that compiles the figure and its WDI series code, which links to the series online.</li>
          <li>Province figures are BPS mid-2025 estimates. The 38 provinces sum to ${NATIONAL.pop.toLocaleString('en-US')} people, BPS's national mid-2025 total.</li>
          <li>Comparisons with neighbours use each country's latest WDI year, shown beside every value.</li>
        </ul>
      </div>
      <div class="card">
        <h3>Reading the numbers well</h3>
        <ul>
          <li><b>Two national populations</b>: BPS counts 284.4 million (mid-2025, the sum of the provinces) and the World Bank, using the UN's model, 285.7 million. The cover and province pages use BPS; trends and comparisons use the World Bank. <a href="#/indicator/population">Why two numbers</a></li>
          <li><b>Unemployment</b> is the ILO's modelled rate, built to compare countries. BPS publishes its own open unemployment rate (TPT) from Sakernas twice a year, which is defined differently.</li>
          <li><b>Poverty</b> uses Indonesia's national poverty line, set by BPS from the cost of basic needs, not an international dollar-a-day line.</li>
          <li><b>GDP in US dollars</b> moves with the rupiah: in 1998 it more than halved, mostly because the currency collapsed. Use real growth to see output.</li>
          <li><b>Breaks in series</b>: land area was revised in 2000, which steps density and forest cover; mobile subscriptions fell in 2018 after SIM registration.</li>
          <li><b>Years</b>: every figure shows the year it describes. Some health and education series come from surveys held every few years.</li>
        </ul>
      </div>
    </section>

    <section class="section">
      <h2>Agencies and datasets</h2>
      <div class="table-wrap"><table><thead><tr><th>Source</th><th>What it provides</th></tr></thead><tbody>
        ${AGENCIES.map((a) => `<tr><td><a href="${a.url}" rel="noopener">${esc(a.name)}</a></td><td style="white-space:normal">${esc(a.role)}</td></tr>`).join('')}
      </tbody></table></div>
      <p class="source">Provinces: ${esc(PROVINCE_SOURCE)}.</p>
    </section>

    <section class="section grid-2">
      <div class="card"><h3>Using this data</h3><p>Every indicator page and the province table offer a CSV download with the source written into each row. The underlying data are published by their agencies under open terms (World Bank data under CC BY 4.0); please cite the original agency.</p></div>
      <div class="card"><h3>About the site</h3><p>Built as plain HTML, CSS and JavaScript with hand-drawn SVG charts: no trackers, no third-party scripts, and it works offline once loaded. Names: <i>angka</i> means "numbers" in Indonesian; <i>Nusantara</i> is an old name for the archipelago.</p></div>
    </section>`;
  return { title: 'Sources and methods', html };
}
