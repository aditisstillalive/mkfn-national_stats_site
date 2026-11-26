// Indonesia's national time series, 1990 onward. Every value comes from the World Bank's World Development Indicators
// (WDI), update of 11 November 2026, for country IDN; `code` is the WDI series code and `origin` the agency that
// compiles it. `from` is the first year of `values`; null marks a year with no published figure.
// `better` says which direction is an improvement ('up', 'down' or null when neither), used to colour changes.

export const WDI_UPDATED = '11 November 2026';

const I = (from, values) => ({ from, values });

export const INDICATORS = [
  // People
  { id: 'population', topic: 'people', name: 'Population', unit: 'million people', suffix: ' m', dp: 1, better: null,
    code: 'SP.POP.TOTL', origin: 'UN World Population Prospects 2024, from censuses and BPS estimates',
    about: 'All residents regardless of legal status or citizenship, at mid-year.',
    ...I(1990, [183.50, 186.78, 190.04, 193.31, 196.59, 199.89, 203.20, 206.54, 209.83, 213.00, 216.08, 219.10, 222.09, 225.05, 227.93, 230.87, 233.95, 237.06, 240.16, 243.22, 246.31, 249.47, 252.70, 255.85, 258.88, 261.80, 264.63, 267.35, 269.95, 272.49, 274.81, 276.76, 278.83, 281.19, 283.49, 285.72]) },
  { id: 'population-growth', topic: 'people', name: 'Population growth', unit: '% per year', suffix: '%', dp: 2, better: null,
    code: 'SP.POP.GROW', origin: 'World Bank, derived from UN World Population Prospects',
    about: 'Annual rate of change of the mid-year population.',
    ...I(1990, [1.81, 1.77, 1.73, 1.70, 1.69, 1.66, 1.65, 1.63, 1.58, 1.50, 1.43, 1.39, 1.36, 1.32, 1.27, 1.28, 1.33, 1.32, 1.30, 1.27, 1.26, 1.28, 1.29, 1.24, 1.18, 1.12, 1.07, 1.02, 0.97, 0.94, 0.85, 0.70, 0.75, 0.84, 0.81, 0.78]) },
  { id: 'urban', topic: 'people', name: 'Urban population', unit: '% of population', suffix: '%', dp: 1, better: null,
    code: 'SP.URB.TOTL.IN.ZS', origin: 'UN World Urbanization Prospects',
    about: 'Share of people living in areas classed as urban by BPS.',
    ...I(1990, [30.59, 31.60, 32.69, 33.86, 35.07, 36.30, 37.54, 38.75, 39.91, 41.00, 41.99, 42.90, 43.78, 44.63, 45.45, 46.24, 47.00, 47.74, 48.46, 49.17, 49.85, 50.48, 51.16, 51.83, 52.50, 53.17, 53.81, 54.45, 55.10, 55.74, 56.28, 56.88, 57.49, 58.12, 58.75, 59.39]) },
  { id: 'fertility', topic: 'people', name: 'Fertility rate', unit: 'births per woman', dp: 2, better: null,
    code: 'SP.DYN.TFRT.IN', origin: 'UN World Population Prospects 2024',
    about: 'Children a woman would bear over her life at current age-specific rates. About 2.1 keeps a population stable.',
    ...I(1990, [3.11, 3.06, 2.95, 2.90, 2.85, 2.81, 2.78, 2.74, 2.66, 2.57, 2.50, 2.47, 2.44, 2.41, 2.42, 2.45, 2.46, 2.48, 2.44, 2.44, 2.46, 2.52, 2.51, 2.44, 2.39, 2.35, 2.31, 2.25, 2.22, 2.21, 2.19, 2.17, 2.15, 2.13, 2.12]) },
  { id: 'children', topic: 'people', name: 'Children aged 0–14', unit: '% of population', suffix: '%', dp: 1, better: null,
    code: 'SP.POP.0014.TO.ZS', origin: 'UN World Population Prospects 2024',
    about: 'Share of the population under 15.',
    ...I(1990, [35.88, 35.36, 34.83, 34.29, 33.74, 33.22, 32.71, 32.22, 31.74, 31.26, 30.80, 30.41, 30.05, 29.69, 29.35, 29.05, 28.80, 28.57, 28.36, 28.14, 27.92, 27.72, 27.54, 27.34, 27.15, 26.97, 26.77, 26.56, 26.33, 26.09, 25.83, 25.58, 25.27, 24.93, 24.60, 24.25]) },
  { id: 'older', topic: 'people', name: 'People aged 65+', unit: '% of population', suffix: '%', dp: 1, better: null,
    code: 'SP.POP.65UP.TO.ZS', origin: 'UN World Population Prospects 2024',
    about: 'Share of the population aged 65 and over.',
    ...I(1990, [4.04, 4.11, 4.20, 4.29, 4.39, 4.49, 4.59, 4.69, 4.80, 4.90, 5.01, 5.12, 5.23, 5.34, 5.44, 5.54, 5.62, 5.70, 5.77, 5.83, 5.88, 5.93, 5.97, 6.01, 6.04, 6.08, 6.15, 6.24, 6.35, 6.49, 6.61, 6.69, 6.82, 7.05, 7.29, 7.54]) },
  { id: 'birth-rate', topic: 'people', name: 'Crude birth rate', unit: 'births per 1,000 people', dp: 1, better: null,
    code: 'SP.DYN.CBRT.IN', origin: 'UN World Population Prospects 2024',
    about: 'Live births in the year per 1,000 people at mid-year.',
    ...I(1990, [25.81, 25.55, 24.82, 24.53, 24.26, 24.03, 23.89, 23.60, 22.97, 22.21, 21.69, 21.39, 21.11, 20.83, 20.80, 21.02, 20.94, 20.97, 20.51, 20.38, 20.36, 20.61, 20.41, 19.64, 19.09, 18.57, 18.14, 17.54, 17.15, 16.91, 16.67, 16.42, 16.20, 15.94, 15.76]) },
  { id: 'density', topic: 'people', name: 'Population density', unit: 'people per km² of land', dp: 0, better: null,
    code: 'EN.POP.DNST', origin: 'FAO land area and UN population estimates',
    about: 'Mid-year population divided by land area. The step in 2000 reflects a revised land area.',
    ...I(1990, [101.3, 103.1, 104.9, 106.7, 108.5, 110.3, 112.2, 114.0, 115.8, 117.6, 115.1, 116.7, 118.3, 119.9, 121.4, 123.0, 124.6, 126.3, 127.9, 129.5, 131.2, 132.9, 134.6, 136.3, 137.9, 139.4, 141.0, 142.4, 143.8, 145.1, 146.4, 146.2, 147.3, 148.6, 149.8]) },

  // Economy
  { id: 'gdp', topic: 'economy', name: 'GDP', unit: 'US$ billion, current prices', prefix: '$', suffix: ' bn', dp: 0, better: 'up',
    code: 'NY.GDP.MKTP.CD', origin: 'World Bank and OECD national accounts, from BPS',
    about: 'Gross domestic product converted from rupiah at the official exchange rate of each year.',
    ...I(1990, [106.1, 116.6, 128.0, 158.0, 176.9, 202.1, 227.4, 215.7, 95.4, 140.0, 165.0, 160.4, 195.7, 234.8, 256.8, 285.9, 364.6, 432.2, 510.2, 539.6, 755.1, 893.0, 917.9, 912.5, 890.8, 860.9, 931.9, 1015.6, 1042.3, 1119.1, 1059.1, 1186.5, 1319.1, 1371.2, 1396.3, 1445.6]) },
  { id: 'gdp-growth', topic: 'economy', name: 'Real GDP growth', unit: '% per year', suffix: '%', dp: 1, better: 'up',
    code: 'NY.GDP.MKTP.KD.ZG', origin: 'World Bank and OECD national accounts, from BPS',
    about: 'Annual growth of GDP at constant prices, so inflation is taken out.',
    ...I(1990, [7.24, 6.91, 6.50, 6.50, 7.54, 8.22, 7.82, 4.70, -13.13, 0.79, 4.92, 3.64, 4.50, 4.78, 5.03, 5.69, 5.50, 6.35, 6.01, 4.63, 6.22, 6.17, 6.03, 5.56, 5.01, 4.88, 5.03, 5.07, 5.17, 5.02, -2.07, 3.70, 5.31, 5.05, 5.03, 5.11]) },
  { id: 'gdp-per-capita', topic: 'economy', name: 'GDP per person', unit: 'US$, current prices', prefix: '$', dp: 0, better: 'up',
    code: 'NY.GDP.PCAP.CD', origin: 'World Bank and OECD national accounts, from BPS',
    about: 'GDP divided by mid-year population, at current US dollars.',
    ...I(1990, [578, 624, 674, 817, 900, 1011, 1119, 1045, 455, 657, 764, 732, 881, 1043, 1127, 1238, 1558, 1823, 2125, 2218, 3066, 3579, 3632, 3567, 3441, 3288, 3521, 3799, 3861, 4107, 3854, 4287, 4731, 4876, 4925, 5060]) },
  { id: 'gdp-per-capita-ppp', topic: 'economy', name: 'GDP per person (PPP)', unit: 'international $, current', prefix: '$', dp: 0, better: 'up',
    code: 'NY.GDP.PCAP.PP.CD', origin: 'World Bank International Comparison Program',
    about: 'GDP per person adjusted for price levels, so incomes can be compared across countries.',
    ...I(1990, [3044, 3305, 3538, 3793, 4096, 4451, 4807, 5037, 4356, 4386, 4639, 4849, 5076, 5353, 5700, 6134, 6583, 7096, 7569, 7868, 8353, 8937, 9530, 9866, 10065, 10028, 10263, 10688, 11372, 11986, 11729, 12757, 14283, 15428, 16472, 17660]) },
  { id: 'inflation', topic: 'economy', name: 'Consumer price inflation', unit: '% per year', suffix: '%', dp: 1, better: 'down',
    code: 'FP.CPI.TOTL.ZG', origin: 'IMF International Financial Statistics, from BPS consumer price index',
    about: 'Annual average change in the cost of a typical basket of consumer goods and services.',
    ...I(1990, [7.82, 9.42, 7.52, 9.67, 8.53, 9.42, 7.97, 6.23, 58.45, 20.48, 3.69, 11.50, 11.90, 6.76, 6.06, 10.45, 13.11, 6.41, 10.23, 4.39, 5.13, 5.36, 4.28, 6.41, 6.39, 6.36, 3.53, 3.81, 3.20, 3.03, 1.92, 1.56, 4.21, 3.67, 2.18, 1.91]) },
  { id: 'agriculture-share', topic: 'economy', name: 'Agriculture, forestry & fishing', unit: '% of GDP', suffix: '%', dp: 1, better: null,
    code: 'NV.AGR.TOTL.ZS', origin: 'World Bank and OECD national accounts, from BPS',
    about: 'Value added by farming, forestry, hunting and fishing as a share of GDP.',
    ...I(1990, [21.55, 19.66, 19.52, 17.88, 17.29, 17.14, 16.67, 16.09, 18.08, 19.61, 15.68, 15.99, 16.32, 15.19, 14.34, 13.13, 12.97, 13.72, 14.48, 15.29, 13.93, 13.51, 13.37, 13.36, 13.34, 13.49, 13.48, 13.16, 12.81, 12.71, 13.70, 13.28, 12.40, 12.53, 12.61, 13.10]) },
  { id: 'industry-share', topic: 'economy', name: 'Industry incl. construction', unit: '% of GDP', suffix: '%', dp: 1, better: null,
    code: 'NV.IND.TOTL.ZS', origin: 'World Bank and OECD national accounts, from BPS',
    about: 'Value added by mining, manufacturing, construction, electricity, water and gas.',
    ...I(1990, [39.38, 41.20, 39.98, 39.68, 40.64, 41.80, 43.46, 44.33, 45.23, 43.36, 41.97, 47.89, 47.75, 43.75, 44.63, 46.54, 46.94, 46.80, 48.06, 47.65, 42.78, 43.91, 43.59, 42.64, 41.93, 40.05, 39.31, 39.38, 39.73, 38.95, 38.24, 39.84, 41.43, 40.22, 39.32, 38.71]) },
  { id: 'services-share', topic: 'economy', name: 'Services', unit: '% of GDP', suffix: '%', dp: 1, better: null,
    code: 'NV.SRV.TOTL.ZS', origin: 'World Bank and OECD national accounts, from BPS',
    about: 'Value added by trade, transport, finance, government, tourism and other services.',
    ...I(1990, [39.07, 39.13, 40.50, 42.44, 42.07, 41.06, 39.87, 39.58, 36.69, 37.03, 33.37, 38.42, 40.10, 41.07, 41.04, 40.33, 40.08, 39.48, 37.46, 37.06, 40.67, 40.58, 40.87, 41.52, 42.24, 43.31, 43.64, 43.61, 43.40, 44.22, 44.41, 42.82, 41.79, 42.88, 43.77, 43.94]) },
  { id: 'exports', topic: 'economy', name: 'Exports of goods & services', unit: '% of GDP', suffix: '%', dp: 1, better: null,
    code: 'NE.EXP.GNFS.ZS', origin: 'World Bank and OECD national accounts, from BPS',
    about: 'Value of all goods and services sold to the rest of the world, relative to GDP.',
    ...I(1990, [27.31, 28.35, 30.31, 26.75, 26.51, 26.31, 25.82, 27.86, 52.97, 35.51, 40.98, 39.03, 32.69, 30.48, 32.22, 34.07, 31.03, 29.44, 29.81, 24.16, 24.30, 26.33, 24.59, 23.92, 23.67, 21.16, 19.09, 20.18, 21.00, 18.59, 17.33, 21.42, 24.50, 21.81, 22.31, 22.85]) },
  { id: 'imports', topic: 'economy', name: 'Imports of goods & services', unit: '% of GDP', suffix: '%', dp: 1, better: null,
    code: 'NE.IMP.GNFS.ZS', origin: 'World Bank and OECD national accounts, from BPS',
    about: 'Value of all goods and services bought from the rest of the world, relative to GDP.',
    ...I(1990, [25.59, 26.49, 27.12, 23.77, 25.37, 27.65, 26.44, 28.13, 43.22, 27.43, 30.46, 30.76, 26.39, 23.14, 27.54, 29.92, 25.62, 25.39, 28.75, 21.35, 22.40, 23.85, 24.99, 24.71, 24.41, 20.78, 18.33, 19.18, 22.07, 19.04, 15.64, 18.79, 20.96, 19.65, 20.50, 20.54]) },
  { id: 'current-account', topic: 'economy', name: 'Current account balance', unit: '% of GDP', suffix: '%', dp: 1, better: null,
    code: 'BN.CAB.XOKA.GD.ZS', origin: 'IMF Balance of Payments Statistics, from Bank Indonesia',
    about: 'Trade, income and transfers with the rest of the world. A negative value means Indonesia borrows from abroad.',
    ...I(1990, [-2.82, -3.65, -2.17, -1.33, -1.58, -3.18, -3.37, -2.27, 4.29, 4.13, 4.84, 4.30, 4.00, 3.45, 0.61, 0.10, 2.98, 2.43, 0.02, 1.97, 0.68, 0.19, -2.66, -3.19, -3.09, -2.04, -1.82, -1.59, -2.94, -2.71, -0.42, 0.30, 1.00, -0.15, -0.61, -0.09]) },
  { id: 'exchange-rate', topic: 'economy', name: 'Rupiah per US dollar', unit: 'IDR per US$, yearly average', prefix: 'Rp ', dp: 0, better: null,
    code: 'PA.NUS.FCRF', origin: 'IMF International Financial Statistics',
    about: 'Average official exchange rate over the year. A higher number means a weaker rupiah.',
    ...I(1990, [1843, 1950, 2030, 2087, 2161, 2249, 2342, 2909, 10014, 7855, 8422, 10261, 9311, 8577, 8939, 9705, 9159, 9141, 9699, 10390, 9090, 8770, 9387, 10461, 11865, 13389, 13308, 13381, 14237, 14148, 14582, 14308, 14850, 15237, 15855, 16478]) },

  // Work and living standards
  { id: 'unemployment', topic: 'work', name: 'Unemployment rate', unit: '% of labour force', suffix: '%', dp: 1, better: 'down',
    code: 'SL.UEM.TOTL.ZS', origin: 'ILO modelled estimates (ILOSTAT), from BPS labour force survey (Sakernas)',
    about: 'People without work who are looking for it, as a share of everyone working or looking.',
    ...I(1991, [2.62, 2.73, 2.78, 4.37, 4.61, 4.86, 4.68, 5.46, 6.36, 6.08, 6.08, 6.60, 6.66, 7.30, 7.95, 7.55, 8.06, 7.21, 6.11, 5.61, 5.15, 4.47, 4.34, 4.05, 4.51, 4.30, 3.78, 4.39, 3.59, 4.25, 3.83, 3.46, 3.31, 3.30, 3.24]) },
  { id: 'female-participation', topic: 'work', name: 'Women in the labour force', unit: '% of women 15+', suffix: '%', dp: 1, better: 'up',
    code: 'SL.TLF.CACT.FE.ZS', origin: 'ILO modelled estimates (ILOSTAT)',
    about: 'Share of women aged 15 and over who work or are looking for work.',
    ...I(1990, [50.49, 49.54, 50.38, 49.43, 50.67, 50.67, 50.67, 49.83, 51.09, 51.17, 51.67, 49.99, 48.05, 47.85, 47.24, 46.08, 46.01, 49.84, 50.39, 50.30, 50.97, 50.99, 51.49, 50.71, 50.64, 50.77, 50.95, 51.94, 53.13, 53.95, 53.20, 52.07, 52.56, 53.49, 53.59, 53.72]) },
  { id: 'male-participation', topic: 'work', name: 'Men in the labour force', unit: '% of men 15+', suffix: '%', dp: 1, better: null,
    code: 'SL.TLF.CACT.MA.ZS', origin: 'ILO modelled estimates (ILOSTAT)',
    about: 'Share of men aged 15 and over who work or are looking for work.',
    ...I(1990, [82.71, 82.82, 82.69, 82.25, 83.33, 83.39, 83.44, 83.20, 83.09, 83.58, 84.14, 84.57, 84.20, 83.77, 84.38, 82.96, 82.63, 82.81, 82.53, 81.95, 82.34, 82.97, 83.47, 82.92, 82.72, 82.49, 81.77, 81.53, 82.25, 82.60, 81.67, 79.74, 81.55, 82.38, 82.34, 82.28]) },
  { id: 'jobs-agriculture', topic: 'work', name: 'Jobs in agriculture', unit: '% of employment', suffix: '%', dp: 1, better: null,
    code: 'SL.AGR.EMPL.ZS', origin: 'ILO modelled estimates (ILOSTAT)',
    about: 'Share of employed people whose main job is in farming, forestry or fishing.',
    ...I(1991, [47.66, 46.94, 46.08, 45.08, 43.98, 43.11, 42.61, 45.06, 45.26, 45.35, 43.83, 44.45, 46.48, 43.42, 44.11, 42.16, 41.37, 40.70, 40.06, 38.73, 36.81, 35.56, 34.69, 34.00, 32.78, 31.56, 30.52, 29.45, 28.46, 29.31, 28.99, 29.28, 28.78, 27.96, 27.30]) },
  { id: 'jobs-industry', topic: 'work', name: 'Jobs in industry', unit: '% of employment', suffix: '%', dp: 1, better: null,
    code: 'SL.IND.EMPL.ZS', origin: 'ILO modelled estimates (ILOSTAT)',
    about: 'Share of employed people in mining, manufacturing, construction and utilities.',
    ...I(1991, [14.39, 14.87, 15.44, 16.24, 17.23, 18.37, 19.04, 16.57, 16.40, 16.30, 17.55, 17.52, 16.54, 16.79, 17.52, 17.34, 17.52, 18.08, 17.94, 18.30, 19.60, 20.66, 21.07, 21.50, 22.12, 21.81, 22.12, 22.38, 22.40, 21.63, 21.76, 21.87, 21.95, 22.29, 22.53]) },
  { id: 'jobs-services', topic: 'work', name: 'Jobs in services', unit: '% of employment', suffix: '%', dp: 1, better: null,
    code: 'SL.SRV.EMPL.ZS', origin: 'ILO modelled estimates (ILOSTAT)',
    about: 'Share of employed people in trade, transport, hospitality, finance, public service and other services.',
    ...I(1991, [37.95, 38.19, 38.47, 38.69, 38.79, 38.52, 38.35, 38.37, 38.34, 38.35, 38.61, 38.03, 36.98, 39.79, 38.36, 40.50, 41.11, 41.21, 42.00, 42.97, 43.59, 43.78, 44.24, 44.50, 45.10, 46.63, 47.36, 48.17, 49.14, 49.06, 49.25, 48.85, 49.27, 49.75, 50.17]) },
  { id: 'poverty', topic: 'work', name: 'Poverty rate (national line)', unit: '% of population', suffix: '%', dp: 1, better: 'down',
    code: 'SI.POV.NAHC', origin: 'BPS national socio-economic survey (Susenas), March round',
    about: 'Share of people living below Indonesia\'s own poverty line, set by BPS from the cost of basic food and non-food needs.',
    ...I(1996, [17.5, null, null, 23.4, 19.1, 18.4, 18.2, 17.4, 16.7, 16.0, 17.8, 16.6, 15.4, 14.2, 13.3, 12.5, 12.0, 11.4, 11.3, 11.2, 10.9, 10.6, 9.8, 9.4, 9.8, 10.1, 9.5, 9.4, 9.0, 8.5]) },
  { id: 'gini', topic: 'work', name: 'Gini index', unit: '0 = equal, 100 = unequal', dp: 1, better: 'down',
    code: 'SI.POV.GINI', origin: 'World Bank Poverty and Inequality Platform, from Susenas',
    about: 'Inequality of consumption across households. Higher means a less even spread.',
    ...I(2000, [30.3, 31.2, 30.2, 29.3, 30.4, 29.9, 31.5, 33.2, 32.6, 33.4, 34.6, 37.9, 37.1, 38.9, 38.8, 38.2, 36.9, 36.4, 36.3, 35.4, 35.3, 35.5, 35.5, 36.1, 34.9, 34.4]) },

  // Health
  { id: 'life-expectancy', topic: 'health', name: 'Life expectancy at birth', unit: 'years', dp: 1, better: 'up',
    code: 'SP.DYN.LE00.IN', origin: 'UN World Population Prospects 2024',
    about: 'Years a newborn would live if death rates stayed as they are. The dips mark the 2004 tsunami and COVID-19 in 2020–21.',
    ...I(1990, [63.25, 63.70, 64.18, 64.85, 65.04, 65.26, 65.47, 65.77, 65.94, 66.00, 66.29, 66.58, 66.95, 67.13, 65.52, 67.53, 67.66, 67.91, 68.08, 68.27, 68.36, 68.63, 68.86, 69.06, 69.29, 69.52, 69.73, 69.95, 70.08, 70.35, 68.82, 67.45, 70.92, 71.15, 71.29]) },
  { id: 'infant-mortality', topic: 'health', name: 'Infant mortality', unit: 'deaths per 1,000 live births', dp: 1, better: 'down',
    code: 'SP.DYN.IMRT.IN', origin: 'UN Inter-agency Group for Child Mortality Estimation',
    about: 'Babies who die before their first birthday, per 1,000 born alive.',
    ...I(1990, [64.4, 61.8, 59.3, 56.8, 54.3, 52.0, 49.7, 47.5, 45.4, 43.4, 41.4, 39.6, 37.9, 36.3, 36.9, 33.3, 31.9, 30.6, 29.4, 28.2, 27.0, 25.9, 24.9, 23.9, 22.9, 21.9, 21.0, 20.1, 19.3, 18.5, 17.7, 17.0, 16.3, 15.7, 15.2]) },
  { id: 'maternal-mortality', topic: 'health', name: 'Maternal mortality', unit: 'deaths per 100,000 live births', dp: 0, better: 'down',
    code: 'SH.STA.MMRT', origin: 'UN Maternal Mortality Estimation Inter-Agency Group (WHO, UNICEF, UNFPA, World Bank)',
    about: 'Women who die from pregnancy or childbirth complications, per 100,000 live births (modelled).',
    ...I(1990, [392, 378, 359, 327, 333, 334, 331, 323, 317, 321, 311, 300, 283, 279, 283, 268, 264, 257, 251, 246, 242, 230, 220, 208, 198, 190, 182, 173, 168, 161, 184, 226, 148, 140]) },
  { id: 'stunting', topic: 'health', name: 'Child stunting', unit: '% of children under 5', suffix: '%', dp: 1, better: 'down',
    code: 'SH.STA.STNT.ZS', origin: 'UNICEF, WHO and World Bank Joint Child Malnutrition Estimates, from national surveys',
    about: 'Children under five who are too short for their age, a sign of long-term undernutrition. Survey years only.',
    ...I(2007, [null, 40.1, null, 39.2, null, null, 36.4, null, null, null, null, 30.0, 26.6, null, 24.4, 21.6, 22.0]) },
  { id: 'health-spending', topic: 'health', name: 'Health spending', unit: '% of GDP', suffix: '%', dp: 1, better: null,
    code: 'SH.XPD.CHEX.GD.ZS', origin: 'WHO Global Health Expenditure Database',
    about: 'Current spending on health by government, insurers and households, relative to GDP.',
    ...I(2000, [1.85, 2.12, 1.98, 2.25, 2.12, 2.53, 2.62, 2.82, 2.55, 2.62, 2.79, 2.99, 2.91, 2.87, 2.96, 2.92, 3.02, 2.90, 2.87, 2.88, 3.42, 3.71, 2.69, 2.70]) },

  // Education
  { id: 'literacy', topic: 'education', name: 'Adult literacy', unit: '% of people 15+', suffix: '%', dp: 1, better: 'up',
    code: 'SE.ADT.LITR.ZS', origin: 'UNESCO Institute for Statistics, from BPS surveys',
    about: 'People aged 15 and over who can read and write a short simple statement about their everyday life.',
    ...I(2004, [90.38, null, 91.98, null, 92.19, 92.58, 92.32, 92.81, null, null, 95.12, 95.22, 95.38, null, 95.66, null, 96.00]) },
  { id: 'secondary-enrolment', topic: 'education', name: 'Secondary school enrolment', unit: '% gross', suffix: '%', dp: 1, better: 'up',
    code: 'SE.SEC.ENRR', origin: 'UNESCO Institute for Statistics',
    about: 'Pupils in secondary school of any age, relative to the population of official secondary age. It can pass 100%.',
    ...I(1990, [46.74, 45.01, 44.20, 43.82, 44.73, 47.54, 50.30, 53.98, 54.27, 54.60, 55.60, 56.23, 57.65, 60.72, 62.98, 61.64, 64.64, 71.85, 70.17, 74.50, 75.65, 78.13, 80.09, 81.89, 83.56, 87.84, 87.82, 90.95, 92.81, 94.95, 96.93, 97.84, 97.82, 96.00, 98.84, 97.17]) },
  { id: 'tertiary-enrolment', topic: 'education', name: 'Tertiary enrolment', unit: '% gross', suffix: '%', dp: 1, better: 'up',
    code: 'SE.TER.ENRR', origin: 'UNESCO Institute for Statistics',
    about: 'Students in universities and colleges, relative to the five-year age group after secondary school.',
    ...I(1990, [8.30, 8.55, 9.38, 9.34, 10.50, 11.30, 11.52, 13.36, 13.33, 14.69, 14.81, 14.12, 14.68, 15.77, 16.18, 16.70, 16.77, 17.58, 20.52, 22.69, 23.42, 25.03, 29.04, 29.89, 29.99, 32.46, 34.83, 35.97, 36.15, 37.32, 38.17, 40.63, 42.33, 44.88]) },

  // Environment and energy
  { id: 'forest', topic: 'environment', name: 'Forest cover', unit: '% of land area', suffix: '%', dp: 1, better: 'up',
    code: 'AG.LND.FRST.ZS', origin: 'FAO Global Forest Resources Assessment',
    about: 'Land under trees taller than 5 m on more than 10% of the area. The step in 2000 reflects a revised land area.',
    ...I(1990, [64.22, 62.87, 61.53, 60.18, 58.84, 57.49, 56.14, 54.80, 53.45, 52.11, 48.98, 49.21, 49.44, 49.67, 49.90, 50.14, 50.37, 50.60, 50.83, 51.06, 51.29, 51.16, 51.02, 50.89, 50.75, 50.61, 50.67, 50.73, 50.78, 50.84, 50.90, 50.54, 50.58, 50.63, 50.67]) },
  { id: 'co2-per-capita', topic: 'environment', name: 'CO₂ emissions per person', unit: 't CO₂ per person, excl. land use', suffix: ' t', dp: 2, better: 'down',
    code: 'EN.GHG.CO2.PC.CE.AR5', origin: 'EDGAR, European Commission Joint Research Centre',
    about: 'Carbon dioxide from fuels and industry per person. Emissions from land use change and forestry are excluded.',
    ...I(1990, [0.88, 0.94, 0.96, 1.03, 1.08, 1.20, 1.24, 1.33, 1.33, 1.39, 1.38, 1.46, 1.46, 1.57, 1.58, 1.57, 1.64, 1.69, 1.65, 1.69, 1.80, 2.00, 2.00, 1.86, 1.95, 1.96, 1.92, 2.00, 2.21, 2.34, 2.17, 2.25, 2.59, 2.75, 2.87]) },
  { id: 'renewables', topic: 'environment', name: 'Renewable energy share', unit: '% of final energy use', suffix: '%', dp: 1, better: 'up',
    code: 'EG.FEC.RNEW.ZS', origin: 'IEA, IRENA, UN Statistics Division, World Bank and WHO (SDG 7 tracking)',
    about: 'Share of final energy from renewable sources, including traditional biomass such as firewood.',
    ...I(1990, [59.2, 58.4, 57.5, 56.1, 53.4, 50.7, 49.3, 47.6, 48.9, 45.8, 45.6, 44.3, 44.7, 43.0, 41.5, 41.6, 40.1, 40.0, 41.1, 38.2, 36.0, 32.4, 30.1, 30.6, 29.3, 26.6, 27.8, 25.2, 22.0, 19.8, 21.9, 20.2]) },

  // Infrastructure and digital
  { id: 'electricity', topic: 'infrastructure', name: 'Access to electricity', unit: '% of population', suffix: '%', dp: 1, better: 'up',
    code: 'EG.ELC.ACCS.ZS', origin: 'World Bank Global Electrification Database, from Susenas',
    about: 'Share of people whose household has an electricity connection.',
    ...I(2000, [86.3, 86.3, 87.6, 87.9, 89.0, 84.8, 90.6, 91.1, 92.7, 93.6, 94.2, 94.8, 96.0, 96.5, 97.0, 97.5, 97.6, 98.1, 98.5, 98.8, 97.0, 99.2, 100.0, 99.4, 99.9]) },
  { id: 'drinking-water', topic: 'infrastructure', name: 'Basic drinking water', unit: '% of population', suffix: '%', dp: 1, better: 'up',
    code: 'SH.H2O.BASW.ZS', origin: 'WHO/UNICEF Joint Monitoring Programme',
    about: 'People using an improved water source within a 30-minute round trip.',
    ...I(2000, [75.78, 76.78, 77.76, 78.74, 79.71, 80.67, 81.62, 82.56, 83.49, 84.39, 85.17, 85.64, 86.07, 86.50, 86.91, 87.30, 87.68, 88.05, 88.41, 88.75, 89.09, 89.40, 89.71, 89.36, 89.01]) },
  { id: 'sanitation', topic: 'infrastructure', name: 'Basic sanitation', unit: '% of population', suffix: '%', dp: 1, better: 'up',
    code: 'SH.STA.BASS.ZS', origin: 'WHO/UNICEF Joint Monitoring Programme',
    about: 'People using an improved toilet not shared with other households.',
    ...I(2000, [41.58, 43.53, 45.50, 47.48, 49.48, 51.48, 53.50, 55.53, 57.57, 59.61, 61.66, 63.69, 65.73, 67.78, 69.83, 71.89, 73.96, 76.03, 78.10, 80.18, 82.26, 84.34, 85.65, 86.94, 88.20]) },
  { id: 'internet', topic: 'infrastructure', name: 'Internet users', unit: '% of population', suffix: '%', dp: 1, better: 'up',
    code: 'IT.NET.USER.ZS', origin: 'International Telecommunication Union (ITU), from BPS surveys',
    about: 'People who used the internet from any place in the last three months.',
    ...I(1995, [0.03, 0.06, 0.20, 0.26, 0.44, 0.93, 2.02, 2.13, 2.39, 2.60, 3.60, 4.76, 5.79, 7.92, 6.92, 10.92, 12.28, 14.52, 14.94, 17.14, 22.06, 25.45, 32.34, 39.90, 47.69, 53.73, 62.10, 66.48, 69.21, 72.78]) },
  { id: 'mobile', topic: 'infrastructure', name: 'Mobile subscriptions', unit: 'per 100 people', dp: 0, better: null,
    code: 'IT.CEL.SETS.P2', origin: 'International Telecommunication Union (ITU)',
    about: 'Active mobile phone subscriptions per 100 people. The 2018 drop follows compulsory SIM registration.',
    ...I(1995, [0.11, 0.28, 0.45, 0.51, 1.05, 1.70, 2.98, 5.27, 8.22, 13.31, 20.32, 27.27, 39.39, 58.54, 67.30, 85.78, 100.13, 111.58, 122.42, 125.77, 129.47, 145.70, 162.78, 118.33, 125.24, 129.40, 132.20, 122.87, 125.24, 122.51]) },
];

const BY_ID = new Map(INDICATORS.map((d) => [d.id, d]));

export function getIndicator(id) {
  return BY_ID.get(id) ?? null;
}

export function indicatorsInTopic(topicId) {
  return INDICATORS.filter((d) => d.topic === topicId);
}

/** The series as [year, value] pairs with the gaps left out. */
export function pointsOf(indicator, fromYear = -Infinity) {
  const out = [];
  indicator.values.forEach((value, i) => {
    const year = indicator.from + i;
    if (value != null && year >= fromYear) out.push([year, value]);
  });
  return out;
}

/** The most recent published value and its year. */
export function latestOf(indicator) {
  const points = pointsOf(indicator);
  const [year, value] = points[points.length - 1];
  return { year, value };
}

/** The value in a given year, or null. */
export function valueIn(indicator, year) {
  return indicator.values[year - indicator.from] ?? null;
}

/** Change from the value closest to `years` before the latest, with the year it is measured from. */
export function changeOver(indicator, years = 10) {
  const points = pointsOf(indicator);
  const [lastYear, lastValue] = points[points.length - 1];
  const base = points.find(([year]) => year >= lastYear - years);
  if (!base || base[0] === lastYear) return null;
  return { fromYear: base[0], delta: lastValue - base[1], ratio: base[1] ? lastValue / base[1] - 1 : null };
}
