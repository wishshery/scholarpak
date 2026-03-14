import scholarships from '@/data/scholarships.json';

const BASE_URL = 'https://scholarpak.com';

export default function sitemap() {
  const scholarshipPages = scholarships.map((s) => ({
    url: `${BASE_URL}/scholarships/${s.slug}`,
    lastModified: new Date().toISOString(),
    changeFrequency: 'weekly',
    priority: 0.8,
  }));

  const countryPages = [
    'germany', 'united-kingdom', 'united-states', 'turkey', 'china',
    'australia', 'japan', 'south-korea', 'hungary', 'sweden', 'austria',
    'france', 'netherlands', 'italy', 'finland', 'norway', 'singapore',
    'malaysia', 'canada', 'new-zealand', 'czech-republic',
  ].map((country) => ({
    url: `${BASE_URL}/countries/${country}`,
    lastModified: new Date().toISOString(),
    changeFrequency: 'monthly',
    priority: 0.7,
  }));

  return [
    { url: BASE_URL, lastModified: new Date().toISOString(), changeFrequency: 'daily', priority: 1.0 },
    { url: `${BASE_URL}/scholarships`, lastModified: new Date().toISOString(), changeFrequency: 'daily', priority: 0.9 },
    { url: `${BASE_URL}/countries`, lastModified: new Date().toISOString(), changeFrequency: 'weekly', priority: 0.8 },
    { url: `${BASE_URL}/free-tuition`, lastModified: new Date().toISOString(), changeFrequency: 'monthly', priority: 0.8 },
    { url: `${BASE_URL}/recommend`, lastModified: new Date().toISOString(), changeFrequency: 'monthly', priority: 0.7 },
    { url: `${BASE_URL}/alerts`, lastModified: new Date().toISOString(), changeFrequency: 'monthly', priority: 0.6 },
    ...scholarshipPages,
    ...countryPages,
  ];
}
