import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, GraduationCap, DollarSign, Globe, BookOpen } from 'lucide-react';
import scholarships from '@/data/scholarships.json';

const COUNTRY_DATA = {
  germany: {
    name: 'Germany', flag: '🇩🇪',
    headline: 'Study in Germany for Pakistani Students — Free Tuition & DAAD Scholarships',
    description: 'Germany is one of the top destinations for Pakistani students due to its world-class education, free tuition at public universities, and generous DAAD scholarships. Most Masters programs are taught in English.',
    tuition: 'FREE at all public universities (nominal semester fee ~€300)',
    living: '€850–€1,200/month (varies by city)',
    language: 'English-taught programs widely available; German beneficial',
    work: 'Students can work 120 full days or 240 half days per year',
    visa: 'Student visa required; proof of €11,208 in blocked account',
    universities: ['TU Munich', 'LMU Munich', 'RWTH Aachen', 'Heidelberg University', 'Humboldt University Berlin'],
    tips: ['Apply to DAAD scholarships in September–October', 'German blocked account required (~€11,208)', 'Most programs start in October (winter) or April (summer)', 'Learn basic German — helpful for daily life'],
  },
  'united-kingdom': {
    name: 'United Kingdom', flag: '🇬🇧',
    headline: 'Study in UK for Pakistani Students — Chevening & Commonwealth Scholarships',
    description: 'The UK is home to some of the world\'s best universities and offers prestigious Chevening and Commonwealth scholarships for Pakistani students. Most programs are 1 year for Masters.',
    tuition: '£15,000–£35,000/year (covered by scholarships)',
    living: '£1,200–£1,800/month (London higher)',
    language: 'English — IELTS 6.5+ required',
    work: 'Students can work up to 20 hours/week during term',
    visa: 'Student visa required; CAS from university needed',
    universities: ['Oxford', 'Cambridge', 'Imperial College London', 'UCL', 'University of Edinburgh'],
    tips: ['Chevening opens in August, closes November', 'Commonwealth closes December', 'Strong leadership potential required for Chevening', 'Apply 1 year in advance'],
  },
  'united-states': {
    name: 'United States', flag: '🇺🇸',
    headline: 'Study in USA for Pakistani Students — Fulbright Scholarship',
    description: 'The United States offers world-leading universities and the prestigious Fulbright scholarship program specifically for Pakistani students through USEFP.',
    tuition: '$20,000–$60,000/year (covered by Fulbright)',
    living: '$1,500–$3,000/month',
    language: 'English — TOEFL iBT 79+ / IELTS 6.5+',
    work: 'On-campus work 20 hrs/week; CPT/OPT for off-campus',
    visa: 'F-1 Student Visa; SEVIS fee required',
    universities: ['MIT', 'Stanford', 'Harvard', 'Yale', 'Columbia', 'Cornell'],
    tips: ['Fulbright Pakistan opens April–May', 'Apply to Fulbright through USEFP, not directly', 'GRE/GMAT required for most programs', 'Start application process 18 months before intake'],
  },
  turkey: {
    name: 'Turkey', flag: '🇹🇷',
    headline: 'Study in Turkey for Pakistani Students — Türkiye Burslari Scholarship',
    description: 'Turkey is the most popular study abroad destination for Pakistani students. Türkiye Burslari offers fully funded scholarships with no IELTS requirement and free Turkish language training.',
    tuition: 'FREE (fully covered by scholarship)',
    living: '5,000–8,000 TRY/month (affordable)',
    language: 'Turkish taught programs — language course funded; English programs available',
    work: 'Limited work rights on student visa',
    visa: 'Residence permit required; easy process',
    universities: ['Ankara University', 'Istanbul University', 'Bogazici University', 'METU', 'Istanbul Technical University'],
    tips: ['Apply in January–February each year', 'No IELTS needed — Turkish language course provided', 'Muslim-friendly environment', 'Largest Pakistani student community in Europe/Asia'],
  },
  china: {
    name: 'China', flag: '🇨🇳',
    headline: 'Study in China for Pakistani Students — CSC Scholarship',
    description: 'China offers fully funded CSC scholarships for Pakistani students at hundreds of universities. Pakistan and China have strong bilateral ties making the process relatively easier.',
    tuition: 'FREE (CSC covers all tuition)',
    living: '3,000–5,000 CNY/month',
    language: 'Chinese-medium or English-medium programs available',
    work: 'Very limited work rights on student visa',
    visa: 'X1/X2 student visa; residence permit required',
    universities: ['Peking University', 'Tsinghua University', 'Fudan University', 'Zhejiang University', 'HUST'],
    tips: ['Apply through HEC portal for government quota', 'CSC deadline typically March–April', 'Large Pakistani student community in China', 'CPEC-related fields have better chances'],
  },
  australia: {
    name: 'Australia', flag: '🇦🇺',
    headline: 'Study in Australia for Pakistani Students — Australia Awards',
    description: 'Australia offers world-class education and the prestigious Australia Awards fully funded scholarships for Pakistani students pursuing Masters and PhD programs.',
    tuition: 'AUD 20,000–45,000/year (covered by scholarship)',
    living: 'AUD 21,000–25,000/year',
    language: 'English — IELTS 6.5+ required',
    work: 'Students can work 48 hours per fortnight',
    visa: 'Student visa (subclass 500)',
    universities: ['University of Melbourne', 'ANU', 'University of Sydney', 'UNSW', 'Monash University'],
    tips: ['Australia Awards opens April–June', 'Apply through AusAid website', 'Strong development-sector background preferred', 'Allow 12–18 months for full process'],
  },
  japan: {
    name: 'Japan', flag: '🇯🇵',
    headline: 'Study in Japan for Pakistani Students — MEXT Scholarship',
    description: 'Japan\'s MEXT scholarship is one of the most prestigious fully funded scholarships for Pakistani students. No Japanese language required — free training is provided.',
    tuition: 'FREE at national universities',
    living: '130,000–150,000 JPY/month (stipend covers this)',
    language: 'Japanese taught (free language training); some English programs',
    work: '28 hours/week permitted',
    visa: 'Student visa (College Student)',
    universities: ['University of Tokyo', 'Kyoto University', 'Osaka University', 'Tohoku University', 'Nagoya University'],
    tips: ['MEXT Embassy track deadline May–June', 'MEXT University track deadline varies', 'Contact professors before applying', 'Research universities/labs carefully'],
  },
  hungary: {
    name: 'Hungary', flag: '🇭🇺',
    headline: 'Study in Hungary for Pakistani Students — Stipendium Hungaricum',
    description: 'Hungary\'s Stipendium Hungaricum is a fast-growing scholarship program for Pakistani students offering fully funded Bachelor, Masters, and PhD degrees.',
    tuition: 'FREE (fully covered)',
    living: '150,000–200,000 HUF/month',
    language: 'English-medium programs widely available',
    work: 'Up to 24 hours/week permitted',
    visa: 'Residence permit required; straightforward process',
    universities: ['Budapest University of Technology', 'ELTE', 'Corvinus University', 'University of Pécs', 'University of Debrecen'],
    tips: ['Applications open January', 'Apply through HEC Pakistan for Pakistani quota', 'Increasing number of Pakistani students', 'Growing IT and engineering programs'],
  },
};

export async function generateStaticParams() {
  return Object.keys(COUNTRY_DATA).map((country) => ({ country }));
}

export async function generateMetadata({ params }) {
  const data = COUNTRY_DATA[params.country];
  if (!data) return {};
  return {
    title: data.headline,
    description: data.description,
    keywords: [`study in ${data.name} for pakistani students`, `scholarships in ${data.name}`, `${data.name} scholarship 2026`],
  };
}

export default function CountryPage({ params }) {
  const data = COUNTRY_DATA[params.country];
  if (!data) notFound();

  const countryScholarships = scholarships.filter(
    (s) => s.country.toLowerCase() === data.name.toLowerCase() || s.country.toLowerCase().includes(data.name.toLowerCase())
  );

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <Link href="/countries" className="inline-flex items-center gap-2 text-sm text-brand-600 hover:text-brand-800 font-semibold mb-6 group">
        <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
        All Countries
      </Link>

      {/* Hero */}
      <div className="card p-8 mb-8 bg-gradient-to-br from-brand-50 to-blue-50 border-brand-100">
        <div className="flex items-center gap-4 mb-4">
          <span className="text-5xl">{data.flag}</span>
          <div>
            <h1 className="text-3xl font-extrabold text-brand-900 font-heading">{data.headline}</h1>
          </div>
        </div>
        <p className="text-slate-600 text-lg leading-relaxed">{data.description}</p>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          {/* Key facts */}
          <div className="card p-6">
            <h2 className="text-xl font-bold text-brand-900 font-heading mb-5">Key Study Facts</h2>
            <div className="space-y-0">
              {[
                { label: '💰 Tuition Fees', value: data.tuition },
                { label: '🏠 Living Cost', value: data.living },
                { label: '🗣️ Language', value: data.language },
                { label: '💼 Work Rights', value: data.work },
                { label: '🛂 Visa', value: data.visa },
              ].map(({ label, value }) => (
                <div key={label} className="py-3 border-b border-slate-100 last:border-0">
                  <div className="text-sm font-semibold text-slate-500">{label}</div>
                  <div className="text-slate-800 font-medium mt-0.5">{value}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Top universities */}
          <div className="card p-6">
            <h2 className="text-xl font-bold text-brand-900 font-heading mb-4">Top Universities</h2>
            <ul className="space-y-2">
              {data.universities.map((u) => (
                <li key={u} className="flex items-center gap-3 text-slate-700">
                  <div className="w-6 h-6 bg-brand-100 rounded-full flex items-center justify-center shrink-0">
                    <GraduationCap className="w-3.5 h-3.5 text-brand-700" />
                  </div>
                  <span className="text-sm font-medium">{u}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Scholarships */}
          {countryScholarships.length > 0 && (
            <div>
              <h2 className="text-xl font-bold text-brand-900 font-heading mb-4">
                Available Scholarships in {data.name}
              </h2>
              <div className="space-y-4">
                {countryScholarships.map((s) => (
                  <div key={s.id} className="card p-5">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <Link href={`/scholarships/${s.slug}`} className="font-bold text-brand-900 hover:text-brand-600 transition-colors">
                          {s.name}
                        </Link>
                        <div className="flex flex-wrap gap-1.5 mt-2">
                          {s.degree?.map((d) => (
                            <span key={d} className="badge bg-brand-50 text-brand-700 text-xs">{d}</span>
                          ))}
                          {s.ielts_required === false && <span className="badge bg-emerald-50 text-emerald-700 text-xs">No IELTS</span>}
                        </div>
                        <p className="text-sm text-slate-500 mt-2">Deadline: <span className="font-semibold text-amber-600">{s.deadline}</span></p>
                      </div>
                      <span className={s.funding_type?.toLowerCase().includes('fully') ? 'badge-green' : 'badge-blue'}>
                        {s.funding_type}
                      </span>
                    </div>
                    <div className="flex gap-3 mt-4">
                      <a href={s.link} target="_blank" rel="noopener noreferrer" className="btn-primary text-sm py-2 px-4">Apply Now</a>
                      <Link href={`/scholarships/${s.slug}`} className="btn-secondary text-sm py-2 px-4">Details</Link>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Sidebar tips */}
        <div>
          <div className="card p-6 bg-brand-50 border-brand-100">
            <h3 className="font-bold text-brand-900 mb-4">💡 Tips for Pakistani Students</h3>
            <ul className="space-y-3">
              {data.tips.map((tip) => (
                <li key={tip} className="flex items-start gap-2 text-sm text-slate-600">
                  <span className="text-brand-500 font-bold mt-0.5">→</span>
                  {tip}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
