// The seven topic pages: what each covers, its headline figures and the charts that tell its story.
// Every number quoted in the text is a value of the series in indicators.js.

export const EVENTS = [
  { from: 1997.5, to: 1999, label: 'Asian financial crisis' },
  { from: 2020, to: 2021, label: 'COVID-19' },
];

export const TOPICS = [
  {
    id: 'people', name: 'People', title: 'People and population',
    intro: 'Indonesia is the world\'s fourth most populous country. It gained about 102 million people between 1990 and 2025, yet its growth has more than halved and its people are getting older.',
    tiles: ['population', 'population-growth', 'fertility', 'urban'],
    stories: [
      { title: 'Growth has slowed by more than half', series: ['population-growth'],
        text: 'The population grew 1.81% in 1990 and 0.78% in 2025. Each year still adds more than two million people, about the population of Bengkulu province.' },
      { title: 'Families are smaller', series: ['fertility'],
        text: 'A woman could expect to have 3.11 children at 1990 rates and 2.12 in 2024, now just above the 2.1 at which a population replaces itself.' },
      { title: 'Most Indonesians now live in towns and cities', series: ['urban'],
        text: 'The urban share passed half in 2011 and reached 59.4% in 2025, up from 30.6% in 1990.' },
      { title: 'Fewer children, more older people', series: ['children', 'older'],
        text: 'Children under 15 fell from 35.9% of the population in 1990 to 24.3% in 2025, while people aged 65 and over rose from 4.0% to 7.5%.' },
    ],
  },
  {
    id: 'economy', name: 'Economy', title: 'Economy',
    intro: 'Southeast Asia\'s largest economy produced about $1.45 trillion of output in 2025. Outside two crises, real growth has held close to 5% a year for two decades.',
    tiles: ['gdp', 'gdp-growth', 'gdp-per-capita', 'inflation'],
    stories: [
      { title: 'Steady growth, two deep shocks', series: ['gdp-growth'], events: true,
        text: 'Output shrank 13.1% in 1998 during the Asian financial crisis and 2.1% in 2020 with COVID-19. In between and since, growth has mostly run between 5% and 6%.' },
      { title: 'GDP passed $1 trillion in 2017', series: ['gdp'], events: true,
        text: 'Measured in current dollars, GDP rose from $106 billion in 1990 to $1,446 billion in 2025. Swings in the rupiah move this line as well as real growth.' },
      { title: 'Prices have calmed', series: ['inflation'], events: true,
        text: 'Consumer prices rose 58.5% in 1998. Since 2016 inflation has stayed below 5% a year, and it was 1.9% in 2025.' },
      { title: 'Services are the largest part of the economy', series: ['services-share', 'industry-share', 'agriculture-share'],
        text: 'In 2025 services made up 43.9% of GDP, industry including mining and construction 38.7%, and agriculture, forestry and fishing 13.1%, down from 21.6% in 1990.' },
      { title: 'The rupiah', series: ['exchange-rate'], events: true,
        text: 'A dollar bought Rp 2,909 on average in 1997 and Rp 10,014 in 1998. The yearly average was Rp 16,478 in 2025.' },
    ],
  },
  {
    id: 'work', name: 'Work & living', title: 'Work and living standards',
    intro: 'Jobs have moved off the farm and into services, unemployment is low by regional standards, and the share of people below the national poverty line has fallen to its lowest on record.',
    tiles: ['unemployment', 'poverty', 'female-participation', 'gini'],
    stories: [
      { title: 'Poverty has fallen to 8.5%', series: ['poverty'], events: true,
        text: 'After the 1998 crisis 23.4% of people lived below the national poverty line (1999). By 2025 it was 8.5%. The line is set by BPS from the cost of basic needs.' },
      { title: 'From fields to services', series: ['jobs-services', 'jobs-agriculture', 'jobs-industry'],
        text: 'Agriculture employed 47.7% of workers in 1991 and 27.3% in 2025. Services now employ half of all workers (50.2%).' },
      { title: 'A wide gender gap in work', series: ['male-participation', 'female-participation'],
        text: '53.7% of women aged 15 and over were in the labour force in 2025, against 82.3% of men. The gap has narrowed only slightly since 1990.' },
      { title: 'Unemployment', series: ['unemployment'], events: true,
        text: 'On the ILO\'s comparable measure, unemployment peaked at 8.1% in 2007 and was 3.2% in 2025.' },
      { title: 'Inequality peaked in 2013', series: ['gini'],
        text: 'The Gini index of consumption rose from 30.3 in 2000 to 38.9 in 2013, then eased to 34.4 in 2025.' },
    ],
  },
  {
    id: 'health', name: 'Health', title: 'Health',
    intro: 'Indonesians live eight years longer than in 1990, and far fewer babies and mothers die. Child stunting has almost halved since 2008 but remains a national priority.',
    tiles: ['life-expectancy', 'infant-mortality', 'stunting', 'maternal-mortality'],
    stories: [
      { title: 'Eight more years of life', series: ['life-expectancy'], events: true,
        text: 'Life expectancy at birth rose from 63.3 years in 1990 to 71.3 in 2024. The dips are the 2004 Indian Ocean tsunami and COVID-19 in 2020 and 2021.' },
      { title: 'Infant deaths down three-quarters', series: ['infant-mortality'],
        text: '64 of every 1,000 babies died before their first birthday in 1990; in 2024, 15 did.' },
      { title: 'Maternal deaths', series: ['maternal-mortality'], events: true,
        text: 'Modelled maternal deaths fell from 392 per 100,000 births in 1990 to 140 in 2023, after a spike to 226 during the pandemic in 2021.' },
      { title: 'Stunting has almost halved', series: ['stunting'],
        text: 'Surveys found 40.1% of children under five too short for their age in 2008 and 22.0% in 2023.' },
      { title: 'Health spending', series: ['health-spending'], events: true,
        text: 'Total current health spending was 2.7% of GDP in 2023, after rising to 3.7% during the pandemic in 2021.' },
    ],
  },
  {
    id: 'education', name: 'Education', title: 'Education',
    intro: 'Nearly every teenager is now enrolled in secondary school, and university enrolment has grown more than fivefold since 1990.',
    tiles: ['secondary-enrolment', 'tertiary-enrolment', 'literacy'],
    stories: [
      { title: 'Secondary school for nearly all', series: ['secondary-enrolment'],
        text: 'Gross secondary enrolment doubled, from 46.7% in 1990 to 97.2% in 2025.' },
      { title: 'More than five times as many in higher education', series: ['tertiary-enrolment'],
        text: 'Gross tertiary enrolment was 8.3% in 1990 and 44.9% in 2023.' },
      { title: 'Adult literacy', series: ['literacy'],
        text: '96.0% of people aged 15 and over could read and write in 2020, up from 90.4% in 2004. Survey years only.' },
    ],
  },
  {
    id: 'environment', name: 'Environment', title: 'Environment and energy',
    intro: 'Half of Indonesia\'s land is still forest, but much was lost in the 1990s. Emissions per person have tripled as the country swapped firewood for coal, oil and gas.',
    tiles: ['forest', 'co2-per-capita', 'renewables'],
    stories: [
      { title: 'Forest cover', series: ['forest'],
        text: 'Forest covered 64.2% of the land in 1990 and 50.7% in 2024. The steepest losses came in the 1990s; the step in 2000 reflects a revised land area.' },
      { title: 'CO₂ per person more than tripled', series: ['co2-per-capita'], events: true,
        text: 'Emissions from fuels and industry rose from 0.88 tonnes per person in 1990 to 2.87 tonnes in 2024, still well below Malaysia\'s 8.32.' },
      { title: 'Renewables\' share has fallen', series: ['renewables'],
        text: 'Renewables, mostly traditional biomass, supplied 59.2% of final energy in 1990 and 20.2% in 2021, as households and industry moved to fossil fuels.' },
    ],
  },
  {
    id: 'infrastructure', name: 'Infrastructure', title: 'Infrastructure and digital life',
    intro: 'Almost every Indonesian now has electricity, nearly three in four use the internet, and basic sanitation has more than doubled its reach since 2000.',
    tiles: ['electricity', 'internet', 'sanitation', 'drinking-water'],
    stories: [
      { title: 'Internet use took off after 2015', series: ['internet'],
        text: 'Under 1% of people were online in 2000, 22.1% in 2015 and 72.8% in 2024.' },
      { title: 'Electricity for nearly everyone', series: ['electricity'],
        text: 'Access rose from 86.3% of people in 2000 to 99.9% in 2024.' },
      { title: 'Water and sanitation', series: ['sanitation', 'drinking-water'],
        text: 'Basic sanitation reached 88.2% of people in 2024, up from 41.6% in 2000; basic drinking water reached 89.0%.' },
      { title: 'More phones than people', series: ['mobile'],
        text: 'There were 122.5 mobile subscriptions per 100 people in 2024. The fall in 2018 followed compulsory SIM card registration.' },
    ],
  },
];

export function getTopic(id) {
  return TOPICS.find((t) => t.id === id) ?? null;
}
