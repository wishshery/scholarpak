import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, GraduationCap, DollarSign, Globe, BookOpen } from 'lucide-react';
import scholarships from '@/data/scholarships.json';

const COUNTRY_DATA = {
  germany: {
    name: 'Germany', cc: 'de',
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
    name: 'United Kingdom', cc: 'gb',
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
    name: 'United States', cc: 'us',
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
    name: 'Turkey', cc: 'tr',
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
    name: 'China', cc: 'cn',
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
    name: 'Australia', cc: 'au',
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
    name: 'Japan', cc: 'jp',
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
    name: 'Hungary', cc: 'hu',
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
  'south-korea': {
    name: 'South Korea', cc: 'kr',
    headline: 'Study in South Korea for Pakistani Students — KGSP Scholarship',
    description: 'South Korea offers the prestigious Korean Government Scholarship Program (KGSP) for Pakistani students, covering full tuition, living costs, and even a Korean language course. No IELTS required.',
    tuition: 'FREE (covered by KGSP)',
    living: '900,000 KRW/month stipend provided',
    language: 'Korean language course funded; many programs in English',
    work: 'Students can work part-time up to 20 hrs/week',
    visa: 'D-2 Student Visa; university applies on your behalf',
    universities: ['Seoul National University', 'KAIST', 'POSTECH', 'Yonsei University', 'Korea University'],
    tips: ['KGSP applications open in February each year', 'No IELTS required for KGSP', 'Korean language course is mandatory for first year', 'Apply through the Korean Embassy in Islamabad'],
  },
  sweden: {
    name: 'Sweden', cc: 'se',
    headline: 'Study in Sweden for Pakistani Students — Swedish Institute Scholarship',
    description: 'Sweden offers world-class education with the Swedish Institute Scholarship (SISGP) for global professionals. Programs are taught in English and Swedish universities are highly research-focused.',
    tuition: '100,000–170,000 SEK/year (covered by scholarship)',
    living: '10,000–13,000 SEK/month',
    language: 'English — IELTS 6.5+ typically required',
    work: 'No restriction on working hours during studies',
    visa: 'Residence permit required; apply before arrival',
    universities: ['KTH Royal Institute of Technology', 'Lund University', 'Uppsala University', 'Stockholm University', 'Chalmers University'],
    tips: ['Swedish Institute Scholarship opens in November', 'Focus on leadership and community involvement in application', 'STEM and sustainability fields are prioritized', 'Strong industry connections for internships'],
  },
  austria: {
    name: 'Austria', cc: 'at',
    headline: 'Study in Austria for Pakistani Students — OeAD Scholarship',
    description: 'Austria offers affordable education with the OeAD (Austrian Agency for Education and Internationalisation) scholarships for Pakistani students. Vienna and Graz are major study destinations.',
    tuition: '€726/semester at public universities',
    living: '€900–€1,200/month',
    language: 'German for most programs; English-taught Masters available',
    work: 'Students can work up to 20 hrs/week',
    visa: 'Austrian Student Visa (National Visa Type D)',
    universities: ['University of Vienna', 'Vienna University of Technology', 'Graz University of Technology', 'University of Graz', 'JKU Linz'],
    tips: ['OeAD scholarships open in October', 'German language skills significantly improve acceptance chances', 'Austria is a gateway to EU job market', 'Health insurance is mandatory and affordable'],
  },
  france: {
    name: 'France', cc: 'fr',
    headline: 'Study in France for Pakistani Students — Eiffel Excellence Scholarship',
    description: 'France offers prestigious education with the Eiffel Excellence Scholarship Program by Campus France. Grandes Écoles and top research universities are world-renowned.',
    tuition: '€2,770–€3,770/year at public universities (low fees)',
    living: '€1,000–€1,500/month',
    language: 'French and English programs available; French A2 for admission',
    work: 'Students can work up to 964 hours/year',
    visa: 'Long-stay student visa (VLS-TS)',
    universities: ['École Polytechnique', 'Sciences Po', 'Sorbonne University', 'HEC Paris', 'INSA Lyon'],
    tips: ['Eiffel scholarship applications open in January', 'Campus France Pakistan processes all applications', 'French programs are far cheaper than UK/US', 'Strong engineering and business programs'],
  },
  netherlands: {
    name: 'Netherlands', cc: 'nl',
    headline: 'Study in Netherlands for Pakistani Students — Orange Tulip Scholarship',
    description: 'The Netherlands has 2,100+ English-taught programs and the Orange Tulip Scholarship for Pakistani students. Dutch universities rank among the best in Europe.',
    tuition: '€8,000–€15,000/year (OTS covers this)',
    living: '€900–€1,300/month',
    language: 'English — IELTS 6.5 required for most programs',
    work: 'Students can work 16 hrs/week during term',
    visa: 'MVV entry visa + residence permit via university (IND)',
    universities: ['Delft University of Technology', 'University of Amsterdam', 'Wageningen University', 'Leiden University', 'Erasmus University Rotterdam'],
    tips: ['Orange Tulip Scholarship opens in December', 'Apply to university first, then scholarship', 'Dutch people are very English-friendly', 'Cycling culture — affordable city transport'],
  },
  italy: {
    name: 'Italy', cc: 'it',
    headline: 'Study in Italy for Pakistani Students — MAECI Government Scholarship',
    description: 'Italy offers the Italian Government Scholarship (MAECI) for Pakistani students and has very affordable tuition at state universities. Italy is home to the world\'s oldest university.',
    tuition: '€900–€4,000/year at public universities',
    living: '€700–€1,100/month',
    language: 'Italian and English programs; Italian B2 for most programs',
    work: 'Students can work up to 20 hrs/week',
    visa: 'Type D Student Visa from Italian Embassy',
    universities: ['University of Bologna', 'Politecnico di Milano', 'Sapienza University of Rome', 'University of Padua', 'University of Florence'],
    tips: ['MAECI scholarship applications open in April', 'Apply through the Italian Embassy in Islamabad', 'Cheapest tuition in Western Europe', 'Strong architecture, design, and engineering programs'],
  },
  finland: {
    name: 'Finland', cc: 'fi',
    headline: 'Study in Finland for Pakistani Students — University Merit Scholarships',
    description: 'Finland has the world\'s top-ranked education system. Finnish universities offer merit-based scholarships and affordable tuition compared to UK/US. Helsinki and Tampere are top study cities.',
    tuition: '€8,000–€15,000/year (merit scholarships cover 50–100%)',
    living: '€700–€1,000/month',
    language: 'English — IELTS 6.0+ required',
    work: 'Students can work 25 hrs/week during term',
    visa: 'Residence permit for studying from Finnish Immigration Service',
    universities: ['Aalto University', 'University of Helsinki', 'Tampere University', 'University of Oulu', 'LUT University'],
    tips: ['Apply directly to Finnish universities from September onwards', 'Each university offers its own scholarships', 'Finland is the happiest country in the world', 'Strong tech industry — Nokia, Rovio, Supercell'],
  },
  norway: {
    name: 'Norway', cc: 'no',
    headline: 'Study in Norway for Pakistani Students — Free Tuition at All Universities',
    description: 'Norway offers FREE tuition at all public universities for ALL students, including Pakistanis. You only need to cover living expenses. Norway is also the gateway to Nordic career opportunities.',
    tuition: 'FREE at all public universities (for everyone)',
    living: 'NOK 12,000–16,000/month (high cost of living)',
    language: 'Norwegian for most programs; growing English Masters',
    work: 'Students can work part-time with no official hour restrictions',
    visa: 'Residence permit from Norwegian Directorate of Immigration (UDI)',
    universities: ['University of Oslo', 'NTNU', 'University of Bergen', 'UiT Arctic University', 'Norwegian Business School (BI)'],
    tips: ['No tuition fees — just apply to the university directly', 'Applications open December for following August intake', 'Cost of living is high — budget carefully', 'Many English-taught Masters being added each year'],
  },
  singapore: {
    name: 'Singapore', cc: 'sg',
    headline: 'Study in Singapore for Pakistani Students — SINGA PhD Scholarship',
    description: 'Singapore is Asia\'s research and education hub. The SINGA (Singapore International Graduate Award) fully funds PhD studies at NUS, NTU, and A*STAR research institutes.',
    tuition: 'FREE (SINGA covers full tuition)',
    living: 'SGD 2,000/month stipend provided',
    language: 'English — IELTS 6.5+ required',
    work: 'Part-time work up to 16 hrs/week with valid pass',
    visa: 'Student\'s Pass from ICA Singapore',
    universities: ['National University of Singapore (NUS)', 'Nanyang Technological University (NTU)', 'Singapore Management University', 'A*STAR Research Institutes'],
    tips: ['SINGA is for PhD only — opens in June & October', 'NUS and NTU are consistently top 15 globally', 'Very safe country — welcoming Muslim community', 'Strong research culture — ideal for PhD aspirants'],
  },
  malaysia: {
    name: 'Malaysia', cc: 'my',
    headline: 'Study in Malaysia for Pakistani Students — Government & University Scholarships',
    description: 'Malaysia is the most affordable English-medium study destination in Asia. It\'s an Islamic country with a large Pakistani diaspora, and offers government scholarships through MPC.',
    tuition: 'RM 10,000–40,000/year (very affordable)',
    living: 'RM 1,500–2,500/month',
    language: 'English — medium of instruction at most private universities',
    work: 'Students can work 20 hrs/week during semester breaks',
    visa: 'Student Pass via university\'s EMGS application',
    universities: ['University of Malaya', 'UTM', 'UPM', 'Universiti Teknologi PETRONAS', 'Taylor\'s University'],
    tips: ['Tuition and living costs are very affordable', 'Large Pakistani and Muslim community', 'Malaysia has direct flights to Pakistan', 'Easy visa process through university EMGS system'],
  },
  canada: {
    name: 'Canada', cc: 'ca',
    headline: 'Study in Canada for Pakistani Students — Vanier & University Scholarships',
    description: 'Canada is a top destination for Pakistani students with world-class universities and a clear pathway to Permanent Residency. The Vanier CGS offers $50,000/year for PhD students.',
    tuition: 'CAD 20,000–40,000/year',
    living: 'CAD 1,200–2,000/month',
    language: 'English — IELTS 6.5+ required',
    work: 'Students can work 24 hrs/week off-campus',
    visa: 'Canadian Student Visa (Study Permit)',
    universities: ['University of Toronto', 'UBC', 'McGill University', 'University of Waterloo', 'University of Alberta'],
    tips: ['Apply 6–8 months before intake', 'PR pathway through Express Entry after graduation', 'PGWP allows you to work 3 years after graduation', 'Vanier CGS for PhD opens in September'],
  },
  'new-zealand': {
    name: 'New Zealand', cc: 'nz',
    headline: 'Study in New Zealand for Pakistani Students — NZ Government Scholarship',
    description: 'New Zealand offers the New Zealand Government Scholarships for developing countries including Pakistan. NZ universities have a strong focus on research and sustainable development.',
    tuition: 'NZD 22,000–35,000/year (covered by scholarship)',
    living: 'NZD 1,200–1,800/month',
    language: 'English — IELTS 6.5+ required',
    work: 'Students can work 20 hrs/week during term',
    visa: 'New Zealand Student Visa',
    universities: ['University of Auckland', 'University of Otago', 'Victoria University of Wellington', 'University of Canterbury', 'Massey University'],
    tips: ['NZ Government Scholarships open in February', 'Apply through NZ High Commission in Islamabad', 'Safe, peaceful country with friendly community', 'Strong agriculture, engineering, and IT programs'],
  },
  'czech-republic': {
    name: 'Czech Republic', cc: 'cz',
    headline: 'Study in Czech Republic for Pakistani Students — Government Scholarship',
    description: 'The Czech Republic offers free tuition at public universities for programs taught in Czech. The Czech government also provides scholarships for Pakistani students through the Ministry of Education.',
    tuition: 'FREE in Czech language programs; €2,000–€8,000 for English programs',
    living: 'CZK 12,000–18,000/month (very affordable)',
    language: 'Czech (free programs) or English (paid programs)',
    work: 'Students can work freely without restrictions',
    visa: 'Long-stay visa for studies (Type D)',
    universities: ['Charles University Prague', 'Czech Technical University', 'Masaryk University', 'Brno University of Technology', 'University of West Bohemia'],
    tips: ['Czech government scholarships open in November', 'Apply through Czech Embassy in Islamabad', 'Prague is one of Europe\'s most affordable capitals', 'Czech Republic is inside Schengen — travel all of Europe'],
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
          <img src={`https://flagcdn.com/w80/${data.cc}.png`} alt={data.name} className="w-20 h-14 object-cover rounded-lg shadow-md" />
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
