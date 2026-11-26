// Indonesia beside its large neighbours: latest value of each indicator in the World Bank WDI (update of
// 11 November 2026). Order of `values`: Indonesia, India, Malaysia, Philippines, Thailand, Viet Nam.

export const PEERS = [
  { iso: 'IDN', name: 'Indonesia' },
  { iso: 'IND', name: 'India' },
  { iso: 'MYS', name: 'Malaysia' },
  { iso: 'PHL', name: 'Philippines' },
  { iso: 'THA', name: 'Thailand' },
  { iso: 'VNM', name: 'Viet Nam' },
];

export const PEER_METRICS = [
  { id: 'gdp-per-capita', name: 'GDP per person', unit: 'US$', prefix: '$', dp: 0, year: 2025, code: 'NY.GDP.PCAP.CD', values: [5059.63, 2702.48, 13124.56, 4170.72, 8056.56, 5065.99] },
  { id: 'gdp-per-capita-ppp', name: 'GDP per person (PPP)', unit: 'international $', prefix: '$', dp: 0, year: 2025, code: 'NY.GDP.PCAP.PP.CD', values: [17659.79, 11747.92, 41497.67, 12576.99, 26250.07, 18088.49] },
  { id: 'gdp-growth', name: 'Real GDP growth', unit: '%', suffix: '%', dp: 1, year: 2025, code: 'NY.GDP.MKTP.KD.ZG', values: [5.11, 7.57, 5.17, 4.40, 2.44, 8.02] },
  { id: 'population', name: 'Population', unit: 'million', suffix: ' m', dp: 1, year: 2025, code: 'SP.POP.TOTL', values: [285.7, 1463.9, 36.0, 116.8, 71.6, 101.6] },
  { id: 'urban', name: 'Urban population', unit: '% of population', suffix: '%', dp: 1, year: 2025, code: 'SP.URB.TOTL.IN.ZS', values: [59.39, 35.69, 77.39, 55.77, 62.80, 38.83] },
  { id: 'life-expectancy', name: 'Life expectancy', unit: 'years', dp: 1, year: 2024, code: 'SP.DYN.LE00.IN', values: [71.29, 72.23, 76.82, 69.95, 76.56, 74.74] },
  { id: 'infant-mortality', name: 'Infant mortality', unit: 'per 1,000 live births', dp: 1, year: 2024, code: 'SP.DYN.IMRT.IN', values: [15.2, 23.3, 7.0, 21.7, 7.7, 12.0] },
  { id: 'fertility', name: 'Fertility rate', unit: 'births per woman', dp: 2, year: 2024, code: 'SP.DYN.TFRT.IN', values: [2.12, 1.96, 1.54, 1.89, 1.20, 1.90] },
  { id: 'unemployment', name: 'Unemployment rate', unit: '% of labour force', suffix: '%', dp: 1, year: 2025, code: 'SL.UEM.TOTL.ZS', values: [3.24, 4.22, 3.76, 2.23, 0.78, 1.52] },
  { id: 'internet', name: 'Internet users', unit: '% of population', suffix: '%', dp: 1, year: 2024, code: 'IT.NET.USER.ZS', values: [72.78, 70.00, 98.02, 67.26, 90.87, 84.15], note: 'India: 2025' },
  { id: 'co2-per-capita', name: 'CO₂ per person', unit: 't CO₂', suffix: ' t', dp: 2, year: 2024, code: 'EN.GHG.CO2.PC.CE.AR5', values: [2.87, 2.17, 8.32, 1.50, 3.96, 4.27] },
  { id: 'forest', name: 'Forest cover', unit: '% of land area', suffix: '%', dp: 1, year: 2024, code: 'AG.LND.FRST.ZS', values: [50.67, 24.44, 57.66, 24.81, 38.73, 47.12] },
];

export function getPeerMetric(id) {
  return PEER_METRICS.find((m) => m.id === id) ?? null;
}
