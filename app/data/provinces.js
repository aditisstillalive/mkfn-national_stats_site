// Indonesia's 38 provinces: BPS-Statistics Indonesia mid-2025 population estimates (published 2026) and land area in
// km². Their sum, 284.44 million, is BPS's national mid-2025 total. `col`/`row` place each province on the tile map,
// west to east and north to south; they are a layout, not coordinates.

export const PROVINCE_SOURCE = 'BPS-Statistics Indonesia, mid-2025 population estimates (Statistik Indonesia 2026); land area from BPS and the Ministry of Home Affairs';

export const ISLAND_GROUPS = [
  { id: 'sumatra', name: 'Sumatra' },
  { id: 'java', name: 'Java' },
  { id: 'nusa', name: 'Bali & Nusa Tenggara' },
  { id: 'kalimantan', name: 'Kalimantan' },
  { id: 'sulawesi', name: 'Sulawesi' },
  { id: 'maluku', name: 'Maluku' },
  { id: 'papua', name: 'Papua' },
];

const P = (iso, bps, name, local, capital, group, area, pop, col, row) => ({ iso, bps, name, local, capital, group, area, pop, col, row });

export const PROVINCES = [
  P('ac', 11, 'Aceh', 'Aceh', 'Banda Aceh', 'sumatra', 56835.02, 5626000, 0, 0),
  P('su', 12, 'North Sumatra', 'Sumatera Utara', 'Medan', 'sumatra', 72437.76, 15785800, 1, 0),
  P('sb', 13, 'West Sumatra', 'Sumatera Barat', 'Padang', 'sumatra', 42107.67, 5914300, 1, 1),
  P('ri', 14, 'Riau', 'Riau', 'Pekanbaru', 'sumatra', 89900.78, 6811200, 2, 1),
  P('ja', 15, 'Jambi', 'Jambi', 'Jambi', 'sumatra', 49023.04, 3768500, 2, 2),
  P('ss', 16, 'South Sumatra', 'Sumatera Selatan', 'Palembang', 'sumatra', 86771.92, 8928500, 2, 3),
  P('be', 17, 'Bengkulu', 'Bengkulu', 'Bengkulu', 'sumatra', 20122.21, 2138000, 1, 2),
  P('la', 18, 'Lampung', 'Lampung', 'Bandar Lampung', 'sumatra', 33570.76, 9522900, 2, 4),
  P('bb', 19, 'Bangka Belitung Islands', 'Kepulauan Bangka Belitung', 'Pangkal Pinang', 'sumatra', 16690.23, 1550800, 3, 3),
  P('kr', 21, 'Riau Islands', 'Kepulauan Riau', 'Tanjung Pinang', 'sumatra', 8170.38, 2213500, 3, 1),
  P('jk', 31, 'Jakarta', 'Daerah Khusus Jakarta', 'Jakarta', 'java', 661.53, 10678000, 4, 4),
  P('jb', 32, 'West Java', 'Jawa Barat', 'Bandung', 'java', 37053.33, 50759000, 4, 5),
  P('jt', 33, 'Central Java', 'Jawa Tengah', 'Semarang', 'java', 34347.43, 38233900, 5, 5),
  P('yo', 34, 'Yogyakarta', 'Daerah Istimewa Yogyakarta', 'Yogyakarta', 'java', 3170.36, 3781500, 5, 6),
  P('ji', 35, 'East Java', 'Jawa Timur', 'Surabaya', 'java', 48055.88, 42089300, 6, 5),
  P('bt', 36, 'Banten', 'Banten', 'Serang', 'java', 9355.88, 12537400, 3, 5),
  P('ba', 51, 'Bali', 'Bali', 'Denpasar', 'nusa', 5582.83, 4461300, 7, 5),
  P('nb', 52, 'West Nusa Tenggara', 'Nusa Tenggara Barat', 'Mataram', 'nusa', 19631.99, 5731100, 8, 5),
  P('nt', 53, 'East Nusa Tenggara', 'Nusa Tenggara Timur', 'Kupang', 'nusa', 46378.11, 5742600, 9, 5),
  P('kb', 61, 'West Kalimantan', 'Kalimantan Barat', 'Pontianak', 'kalimantan', 147018.06, 5766000, 5, 2),
  P('kt', 62, 'Central Kalimantan', 'Kalimantan Tengah', 'Palangka Raya', 'kalimantan', 153430.36, 2845000, 6, 2),
  P('ks', 63, 'South Kalimantan', 'Kalimantan Selatan', 'Banjarbaru', 'kalimantan', 37125.43, 4323300, 6, 3),
  P('ki', 64, 'East Kalimantan', 'Kalimantan Timur', 'Samarinda', 'kalimantan', 126951.76, 4267600, 7, 2),
  P('ku', 65, 'North Kalimantan', 'Kalimantan Utara', 'Tanjung Selor', 'kalimantan', 69900.89, 749400, 7, 1),
  P('sa', 71, 'North Sulawesi', 'Sulawesi Utara', 'Manado', 'sulawesi', 14488.43, 2721400, 10, 1),
  P('st', 72, 'Central Sulawesi', 'Sulawesi Tengah', 'Palu', 'sulawesi', 61496.98, 3156100, 9, 2),
  P('sn', 73, 'South Sulawesi', 'Sulawesi Selatan', 'Makassar', 'sulawesi', 45323.98, 9563100, 8, 3),
  P('sg', 74, 'Southeast Sulawesi', 'Sulawesi Tenggara', 'Kendari', 'sulawesi', 36139.30, 2836700, 9, 3),
  P('go', 75, 'Gorontalo', 'Gorontalo', 'Gorontalo', 'sulawesi', 12024.98, 1242200, 9, 1),
  P('sr', 76, 'West Sulawesi', 'Sulawesi Barat', 'Mamuju', 'sulawesi', 16590.67, 1525300, 8, 2),
  P('ma', 81, 'Maluku', 'Maluku', 'Ambon', 'maluku', 46133.83, 1970600, 11, 3),
  P('mu', 82, 'North Maluku', 'Maluku Utara', 'Sofifi', 'maluku', 31465.98, 1373800, 11, 1),
  P('pa', 91, 'Papua', 'Papua', 'Jayapura', 'papua', 81383.32, 1073600, 14, 1),
  P('pb', 92, 'West Papua', 'Papua Barat', 'Manokwari', 'papua', 60308.59, 587600, 13, 1),
  P('ps', 93, 'South Papua', 'Papua Selatan', 'Merauke', 'papua', 117858.97, 549700, 14, 3),
  P('pt', 94, 'Central Papua', 'Papua Tengah', 'Nabire', 'papua', 61079.59, 1492300, 13, 2),
  P('pe', 95, 'Highland Papua', 'Papua Pegunungan', 'Jayawijaya (Wamena)', 'papua', 52508.66, 1484900, 14, 2),
  P('pd', 96, 'Southwest Papua', 'Papua Barat Daya', 'Sorong', 'papua', 39103.06, 636400, 12, 1),
].map((p) => ({ ...p, density: p.pop / p.area }));

export const NATIONAL = {
  pop: PROVINCES.reduce((sum, p) => sum + p.pop, 0),
  area: PROVINCES.reduce((sum, p) => sum + p.area, 0),
};

export function getProvince(iso) {
  return PROVINCES.find((p) => p.iso === iso) ?? null;
}

export function groupName(id) {
  return ISLAND_GROUPS.find((g) => g.id === id)?.name ?? id;
}

/** 1-based rank of a province among all 38 on a field, largest first. */
export function rankOf(province, field) {
  return [...PROVINCES].sort((a, b) => b[field] - a[field]).indexOf(province) + 1;
}

/** Totals for one island group. */
export function groupTotals(groupId) {
  const members = PROVINCES.filter((p) => p.group === groupId);
  const pop = members.reduce((s, p) => s + p.pop, 0);
  const area = members.reduce((s, p) => s + p.area, 0);
  return { id: groupId, name: groupName(groupId), members, pop, area, density: pop / area };
}
