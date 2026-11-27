// Who publishes each figure, how it is made, and where two agencies publish different national numbers.
// The national series on this site come from the World Bank WDI; the provinces from BPS. Where both give a national
// figure for the same thing, TWO_NUMBERS says why they differ, and every page that shows one points to it.
import { NATIONAL } from './provinces.js';
import { getIndicator, latestOf } from './indicators.js';

const wdi = (id) => latestOf(getIndicator(id));

/** Series whose latest published year is this old or older are flagged as dated wherever they are shown. */
export const DATED_UP_TO = 2021;
export const isDated = (year) => year <= DATED_UP_TO;

/** Short label for the source tag on headline cards: the agency whose number is shown. */
export function sourceTag(indicator) {
  return /^BPS|from BPS|Susenas|Sakernas/.test(indicator.origin) ? 'BPS via World Bank' : 'World Bank';
}

// Method notes, matched against the compiling agency named in each indicator's `origin`. First match wins.
const METHODS = [
  [/^UN World Population Prospects/, 'Modelled by the UN Population Division from Indonesia\'s censuses, surveys and BPS estimates, reconciled across years so that births, deaths and migration add up. In the 2024 revision, estimates run to 2023 and later years are projections.'],
  [/^UN World Urbanization/, 'Urban share follows BPS\'s own definition of urban villages (desa/kelurahan), which looks at density, farm households and services; the UN fills the years between censuses.'],
  [/derived from UN World Population/, 'Annual exponential rate of change of the mid-year population, computed by the World Bank from UN World Population Prospects 2024 totals; values from 2024 on rest on the UN projection.'],
  [/^FAO land area/, 'Mid-year population (UN WPP) divided by land area (FAO). A land-area revision gives the step in 2000.'],
  [/national accounts, from BPS/, 'BPS compiles GDP from the production and expenditure sides each quarter (2010 base year). The World Bank converts rupiah values to US dollars at the annual average official exchange rate, so dollar figures move with the rupiah.'],
  [/International Comparison Program/, 'GDP converted with purchasing power parities from the World Bank\'s International Comparison Program, which prices the same basket of goods in every country, then extrapolated from the benchmark year with national growth and prices.'],
  [/consumer price index/, 'Change in the annual average of BPS\'s consumer price index, a monthly survey of prices in about 150 cities. It differs from the December-on-December rate BPS headlines.'],
  [/^IMF International Financial/, 'Annual average of the official rupiah–dollar rate reported by Bank Indonesia to the IMF.'],
  [/^IMF Balance of Payments/, 'Bank Indonesia\'s balance of payments, compiled to the IMF\'s sixth manual (BPM6), as a share of GDP in current prices.'],
  [/^ILO modelled/, 'ILO model estimates built from BPS\'s labour force survey (Sakernas) and harmonised to international definitions so countries compare. They can differ from the rates BPS publishes from the same survey.'],
  [/Poverty and Inequality Platform/, 'Gini index of household consumption per person from BPS\'s Susenas survey, computed by the World Bank\'s Poverty and Inequality Platform.'],
  [/Susenas\), March/, 'Share of people whose monthly consumption per person is below BPS\'s poverty line, the cost of 2,100 kilocalories of food a day plus basic non-food needs, measured in the March round of the Susenas household survey.'],
  [/^UN Inter-agency Group for Child/, 'Estimated by the UN IGME with a statistical model fitted to every census, survey and registration record, which smooths survey noise; survey-based rates from BPS can differ.'],
  [/^UN Maternal Mortality/, 'Model-based estimate by the UN Maternal Mortality Estimation Inter-Agency Group, combining census, survey and health-system data with covariates; the uncertainty range is wide.'],
  [/Joint Child Malnutrition/, 'Share of children under five whose height-for-age is more than two standard deviations below the WHO growth standard median, from national nutrition surveys.'],
  [/^WHO Global Health Expenditure/, 'Current health spending from all sources (government, insurance, households) as a share of GDP, following the System of Health Accounts.'],
  [/^WHO\/UNICEF Joint Monitoring/, 'Estimated by the WHO/UNICEF JMP by fitting trends to household survey and census data on the main source people use.'],
  [/^UNESCO Institute/, 'From the Ministry of Education\'s school records and UN population estimates (enrolment), or BPS\'s Susenas survey (literacy), compiled by UNESCO to international definitions.'],
  [/^FAO Global Forest/, 'Forest as FAO defines it (land over 0.5 ha with trees above 5 m and canopy above 10%), reported by Indonesia to FAO\'s Forest Resources Assessment and interpolated between reports.'],
  [/^EDGAR/, 'Fossil CO₂ estimated by the EU Joint Research Centre from energy and industry statistics with IPCC methods; it excludes land use and forest fires, which are large in Indonesia.'],
  [/SDG 7 tracking/, 'Renewable energy as a share of total final energy consumption, from IEA and UN energy balances.'],
  [/Global Electrification/, 'Share of people living in households with electricity, from Susenas and other household surveys, modelled between survey years.'],
  [/^International Telecommunication/, 'Compiled by the ITU from BPS household surveys (internet use) or operator returns (subscriptions); prepaid SIM cards make subscriptions exceed people.'],
];

export function methodOf(indicator) {
  const hit = METHODS.find(([pattern]) => pattern.test(indicator.origin));
  return hit ? hit[1] : `Compiled by ${indicator.origin}.`;
}

/**
 * National figures that two agencies publish differently. Each entry: the BPS value the provinces add up to, the
 * World Bank value of the national series, and why they differ.
 */
export const TWO_NUMBERS = {
  population: {
    label: 'the population',
    bps: { value: NATIONAL.pop / 1e6, text: `${(NATIONAL.pop / 1e6).toFixed(1)} million`, date: 'mid-2025' },
    wdi: { text: `${wdi('population').value.toFixed(1)} million`, date: `mid-${wdi('population').year}` },
    why: 'BPS projects each province forward from the 2020 Population Census; the 38 provinces on this site add up to its national total. The World Bank publishes the UN World Population Prospects 2024 figure, which the UN models from the same censuses but with its own assumptions on births, deaths and migration, so every country is estimated alike. The two differ by about 1.3 million people (0.5%). This site shows BPS on the cover and for provinces, and the UN figure for the long series and the comparison with neighbours.',
  },
  density: {
    label: 'population density',
    bps: { value: NATIONAL.pop / NATIONAL.area, text: `${Math.round(NATIONAL.pop / NATIONAL.area)} people per km²`, date: 'mid-2025' },
    wdi: { text: `${Math.round(wdi('density').value)} people per km²`, date: String(wdi('density').year) },
    why: 'The province pages divide BPS\'s mid-2025 population by BPS land area (1.89 million km²). This series divides the UN population by FAO land area and runs to 2024. The difference is under one person per km².',
  },
};

/** Dated releases behind the figures on this site, newest first. */
export const RELEASES = [
  { date: '2026-11-11', agency: 'World Bank', title: 'World Development Indicators update', short: 'World Development Indicators update', what: 'All 44 national series on this site, with 2025 figures for GDP, prices, jobs, poverty and population.', url: 'https://datacatalog.worldbank.org/search/dataset/0037712', href: '#/data' },
  { date: '2026-06-30', agency: 'BPS', title: 'Population and population indicators: results of SUPAS 2025', short: 'SUPAS 2025 population survey results', what: 'Full results of the 2025 Intercensal Population Survey.', url: 'https://www.bps.go.id/en/publication/2026/06/30/bdc814f38edf0a941f4f9d34/penduduk-dan-indikator-kependudukan-hasil-survei-penduduk-antar-sensus-2025.html', href: '#/topic/people' },
  { date: '2026-05-05', agency: 'BPS', title: 'SUPAS 2025: total fertility rate 2.13, infant mortality 14.12', short: 'SUPAS 2025 fertility and infant mortality', what: 'Survey headline rates. They differ slightly from the UN-modelled 2.12 births per woman and 15.2 per 1,000 shown here.', url: 'https://www.bps.go.id/en/pressrelease/2026/05/05/2645/supas-2025--angka-kelahiran-total--tfr--sebesar-2-13---angka-kematian-bayi--imr--sebesar-14-12--dan-persentase-lansia-mencapai-11-97-persen-.html', href: '#/indicator/fertility' },
  { date: '2026-02-27', agency: 'BPS', title: 'Statistik Indonesia 2026', short: 'Statistik Indonesia 2026: province estimates', what: 'Mid-2025 population and land area for the 38 provinces, used on the map and province pages.', url: 'https://www.bps.go.id/en/publication/2026/02/27/a43f03f45543dc4e9942f44c/statistik-indonesia-2026.html', href: '#/regions' },
];

const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
export function formatDate(iso, { short = false } = {}) {
  const [y, m, d] = iso.split('-').map(Number);
  return `${d} ${short ? MONTHS[m - 1].slice(0, 3) : MONTHS[m - 1]} ${y}`;
}
