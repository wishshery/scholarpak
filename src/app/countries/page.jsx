import Link from 'next/link';

export const metadata = {
  title: 'Study Abroad Country Guides for Pakistani Students',
  description: 'Complete guides for studying abroad from Pakistan. Explore scholarships, tuition fees, visa info, and living costs for 20+ countries.',
};

const COUNTRIES = [
  { name: 'Germany', cc: 'de', slug: 'germany', region: 'Europe', highlight: 'Free tuition at public universities', scholarships: 3, note: 'No tuition fees' },
  { name: 'United Kingdom', cc: 'gb', slug: 'united-kingdom', region: 'Europe', highlight: 'Chevening & Commonwealth', scholarships: 2, note: 'Top world universities' },
  { name: 'United States', cc: 'us', slug: 'united-states', region: 'North America', highlight: 'Fulbright Program', scholarships: 2, note: 'Ivy League access' },
  { name: 'Turkey', cc: 'tr', slug: 'turkey', region: 'Asia', highlight: 'No IELTS — fully funded', scholarships: 1, note: 'Most popular for Pakistanis' },
  { name: 'China', cc: 'cn', slug: 'china', region: 'Asia', highlight: 'CSC Government Scholarship', scholarships: 1, note: 'Large Pakistani community' },
  { name: 'Australia', cc: 'au', slug: 'australia', region: 'Oceania', highlight: 'Australia Awards', scholarships: 1, note: 'High-quality education' },
  { name: 'Japan', cc: 'jp', slug: 'japan', region: 'Asia', highlight: 'MEXT Scholarship', scholarships: 1, note: 'Technology & research hub' },
  { name: 'South Korea', cc: 'kr', slug: 'south-korea', region: 'Asia', highlight: 'KGSP — fully funded', scholarships: 1, note: 'No IELTS required' },
  { name: 'Hungary', cc: 'hu', slug: 'hungary', region: 'Europe', highlight: 'Stipendium Hungaricum', scholarships: 2, note: 'Growing hub for Pakistanis' },
  { name: 'Sweden', cc: 'se', slug: 'sweden', region: 'Europe', highlight: 'Swedish Institute Scholarships', scholarships: 1, note: 'High quality of life' },
  { name: 'Austria', cc: 'at', slug: 'austria', region: 'Europe', highlight: 'OeAD Scholarship', scholarships: 1, note: 'Low-cost study' },
  { name: 'France', cc: 'fr', slug: 'france', region: 'Europe', highlight: 'Eiffel Excellence Program', scholarships: 1, note: 'World-class institutions' },
  { name: 'Netherlands', cc: 'nl', slug: 'netherlands', region: 'Europe', highlight: 'Orange Tulip Scholarship', scholarships: 1, note: 'English-taught programs' },
  { name: 'Italy', cc: 'it', slug: 'italy', region: 'Europe', highlight: 'MAECI Government Scholarship', scholarships: 1, note: 'Low tuition, rich culture' },
  { name: 'Finland', cc: 'fi', slug: 'finland', region: 'Europe', highlight: 'University merit scholarships', scholarships: 1, note: 'Top education system' },
  { name: 'Norway', cc: 'no', slug: 'norway', region: 'Europe', highlight: 'Free tuition at all unis', scholarships: 1, note: 'Free for all students' },
  { name: 'Singapore', cc: 'sg', slug: 'singapore', region: 'Asia', highlight: 'SINGA PhD Scholarship', scholarships: 1, note: 'Asia research hub' },
  { name: 'Malaysia', cc: 'my', slug: 'malaysia', region: 'Asia', highlight: 'MPC Government Scholarship', scholarships: 1, note: 'Affordable & Islamic country' },
  { name: 'Canada', cc: 'ca', slug: 'canada', region: 'North America', highlight: 'Vanier CGS Scholarship', scholarships: 1, note: 'PR pathway after studies' },
  { name: 'New Zealand', cc: 'nz', slug: 'new-zealand', region: 'Oceania', highlight: 'NZ Government Scholarship', scholarships: 1, note: 'Safe & peaceful country' },
  { name: 'Czech Republic', cc: 'cz', slug: 'czech-republic', region: 'Europe', highlight: 'Free tuition in Czech language', scholarships: 1, note: 'Affordable European study' },
];

const REGIONS = [...new Set(COUNTRIES.map((c) => c.region))];

export default function CountriesPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="mb-10">
        <h1 className="text-3xl md:text-4xl font-extrabold text-brand-900 font-heading">
          Study Abroad Country Guides
        </h1>
        <p className="text-slate-500 mt-2 text-lg">
          Complete guides for Pakistani students — scholarships, visa, tuition, living costs, and more.
        </p>
      </div>

      {REGIONS.map((region) => (
        <div key={region} className="mb-12">
          <h2 className="text-xl font-bold text-brand-800 font-heading mb-5 flex items-center gap-2">
            <span className="w-1 h-6 bg-brand-600 rounded-full" />
            {region}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {COUNTRIES.filter((c) => c.region === region).map((country) => (
              <Link
                key={country.slug}
                href={`/countries/${country.slug}`}
                className="card p-5 group hover:-translate-y-1 transition-all duration-300"
              >
                <div className="flex items-start gap-3">
                  <img src={`https://flagcdn.com/w40/${country.cc}.png`} alt={country.name} className="w-10 h-7 object-cover rounded shadow-sm mt-0.5 shrink-0" />
                  <div className="flex-1 min-w-0">
                    <h3 className="font-bold text-slate-800 group-hover:text-brand-700 transition-colors">{country.name}</h3>
                    <p className="text-xs text-slate-500 mt-0.5 truncate">{country.highlight}</p>
                    <div className="flex items-center gap-2 mt-2">
                      <span className="text-xs font-semibold text-brand-600 bg-brand-50 px-2 py-0.5 rounded-full">
                        {country.scholarships} scholarship{country.scholarships > 1 ? 's' : ''}
                      </span>
                    </div>
                  </div>
                </div>
                <p className="text-xs text-emerald-600 font-semibold mt-3 flex items-center gap-1">
                  ✓ {country.note}
                </p>
              </Link>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
