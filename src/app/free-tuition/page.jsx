import Link from 'next/link';
import { CheckCircle, ArrowRight } from 'lucide-react';

export const metadata = {
  title: 'Free Tuition Countries for Pakistani Students 2026 | ScholarPak',
  description: 'Discover countries where Pakistani students can study abroad for free or very low tuition fees. Germany, Norway, Finland, Austria, Czech Republic, and more.',
  keywords: ['free tuition countries for pakistani students', 'study abroad free', 'no tuition fees', 'germany free tuition', 'norway free tuition'],
};

const FREE_TUITION_COUNTRIES = [
  {
    cc: 'de', name: 'Germany', slug: 'germany',
    policy: 'All public universities in Germany are tuition-FREE for all students, including internationals. Students only pay a semester administrative fee of €150–€350.',
    livingCost: '€850–€1,200/month',
    language: 'Many programs in English; German recommended for daily life',
    workRights: '120 full days / 240 half days per year',
    topUnis: ['TU Munich', 'LMU Munich', 'RWTH Aachen', 'Heidelberg University'],
    scholarships: ['DAAD Scholarship', 'Deutschlandstipendium'],
    verdict: '🏆 Best choice — world-class universities, free education',
    badge: 'Completely Free',
    badgeColor: 'bg-emerald-100 text-emerald-700',
  },
  {
    cc: 'at', name: 'Austria', slug: 'austria',
    policy: 'EU/EEA students study free. International students pay ~€726/semester at public universities. OeAD scholarship covers this fee + stipend.',
    livingCost: '€1,000–€1,400/month (Vienna is more expensive)',
    language: 'German is primary; some English programs available',
    workRights: '20 hours/week permitted',
    topUnis: ['University of Vienna', 'Vienna University of Technology', 'Graz University'],
    scholarships: ['OeAD Government Scholarship'],
    verdict: '✅ Low tuition + strong scholarship program',
    badge: 'Very Low Fee',
    badgeColor: 'bg-blue-100 text-blue-700',
  },
  {
    cc: 'no', name: 'Norway', slug: 'norway',
    policy: 'All public universities in Norway charge NO tuition fees for any student, including international students. Living costs are high but quality of life is exceptional.',
    livingCost: 'NOK 13,000–17,000/month (expensive)',
    language: 'English-taught programs widely available',
    workRights: '20 hours/week permitted',
    topUnis: ['University of Oslo', 'NTNU', 'University of Bergen', 'UiT'],
    scholarships: ['Lånekassen (loan-grant system)'],
    verdict: '✅ Free education — living costs are the challenge',
    badge: 'Completely Free',
    badgeColor: 'bg-emerald-100 text-emerald-700',
  },
  {
    cc: 'fi', name: 'Finland', slug: 'finland',
    policy: 'Finnish universities charge tuition (€6,000–€18,000/year) for non-EU students but offer generous merit scholarships that cover up to 100% of tuition.',
    livingCost: '€1,000–€1,400/month',
    language: 'Excellent English programs — no Finnish required',
    workRights: '25 hours/week during term; full-time during holidays',
    topUnis: ['University of Helsinki', 'Aalto University', 'Tampere University'],
    scholarships: ['University merit scholarships (cover full tuition)'],
    verdict: '✅ Free via scholarships — top-rated education system',
    badge: 'Free via Scholarship',
    badgeColor: 'bg-amber-100 text-amber-700',
  },
  {
    cc: 'fr', name: 'France', slug: 'france',
    policy: 'French public universities charge very low tuition: ~€170/year for Bachelor, ~€243/year for Masters, ~€380 for PhD. Among the cheapest in Europe.',
    livingCost: '€1,000–€1,800/month (Paris is expensive)',
    language: 'French required for most programs; some English-taught',
    workRights: '964 hours/year (approx. 20 hrs/week)',
    topUnis: ['Sorbonne', 'Sciences Po', 'Polytechnique', 'ENS', 'HEC Paris'],
    scholarships: ['Eiffel Excellence Scholarship', 'Campus France Scholarships'],
    verdict: '✅ Extremely low fees — Paris requires budget planning',
    badge: 'Extremely Low Fee',
    badgeColor: 'bg-blue-100 text-blue-700',
  },
  {
    cc: 'cz', name: 'Czech Republic', slug: 'czech-republic',
    policy: 'Czech Republic charges NO tuition fees if you study in Czech language. English-taught programs charge fees, but government scholarship covers this.',
    livingCost: 'CZK 15,000–22,000/month (~€620–€900/month)',
    language: 'Czech language study available (funded); English programs also exist',
    workRights: 'Full work rights during and after study',
    topUnis: ['Charles University', 'Czech Technical University', 'Brno University of Technology'],
    scholarships: ['Czech Government Scholarship (covers tuition + stipend)'],
    verdict: '✅ Affordable European quality education',
    badge: 'Free (Czech language)',
    badgeColor: 'bg-emerald-100 text-emerald-700',
  },
];

export default function FreeTuitionPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Hero */}
      <div className="text-center mb-12">
        <div className="text-5xl mb-4">💸</div>
        <h1 className="text-3xl md:text-4xl font-extrabold text-brand-900 font-heading">
          Free Tuition Countries for Pakistani Students
        </h1>
        <p className="text-slate-500 mt-4 text-lg max-w-2xl mx-auto">
          Countries where you can pursue a Bachelor, Masters, or PhD degree with zero or near-zero tuition fees. Updated for 2026 intakes.
        </p>
      </div>

      {/* Overview table */}
      <div className="card overflow-hidden mb-12">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-brand-50 border-b border-brand-100">
              <tr>
                <th className="text-left px-5 py-3 font-semibold text-brand-800">Country</th>
                <th className="text-left px-5 py-3 font-semibold text-brand-800">Tuition</th>
                <th className="text-left px-5 py-3 font-semibold text-brand-800">Living Cost</th>
                <th className="text-left px-5 py-3 font-semibold text-brand-800">English Programs</th>
                <th className="text-left px-5 py-3 font-semibold text-brand-800">Rating</th>
              </tr>
            </thead>
            <tbody>
              {FREE_TUITION_COUNTRIES.map((c, i) => (
                <tr key={c.slug} className={`border-b border-slate-100 hover:bg-slate-50 transition-colors ${i % 2 === 0 ? '' : 'bg-slate-50/50'}`}>
                  <td className="px-5 py-3 font-semibold text-slate-800">
                    <Link href={`/countries/${c.slug}`} className="flex items-center gap-2 hover:text-brand-700">
                      <img src={`https://flagcdn.com/w40/${c.cc}.png`} alt={c.name} className="w-7 h-5 object-cover rounded" /> {c.name}
                    </Link>
                  </td>
                  <td className="px-5 py-3">
                    <span className={`badge text-xs ${c.badgeColor}`}>{c.badge}</span>
                  </td>
                  <td className="px-5 py-3 text-slate-600">{c.livingCost.split('/')[0]}/mo</td>
                  <td className="px-5 py-3">
                    {c.language.includes('English') ? (
                      <CheckCircle className="w-4 h-4 text-emerald-500" />
                    ) : (
                      <span className="text-slate-400 text-xs">Limited</span>
                    )}
                  </td>
                  <td className="px-5 py-3 text-sm">{c.verdict.split('—')[0]}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Detailed cards */}
      <div className="space-y-8">
        {FREE_TUITION_COUNTRIES.map((c) => (
          <div key={c.slug} id={c.slug} className="card p-7">
            <div className="flex items-start justify-between gap-4 mb-4">
              <div className="flex items-center gap-3">
                <img src={`https://flagcdn.com/w40/${c.cc}.png`} alt={c.name} className="w-14 h-10 object-cover rounded shadow-sm" />
                <div>
                  <h2 className="text-2xl font-bold text-brand-900 font-heading">{c.name}</h2>
                  <span className={`badge text-xs ${c.badgeColor} mt-1`}>{c.badge}</span>
                </div>
              </div>
              <Link href={`/countries/${c.slug}`} className="btn-secondary text-sm hidden md:flex">
                Full Guide <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            <p className="text-slate-600 leading-relaxed mb-5">{c.policy}</p>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-5">
              {[
                { label: '🏠 Living Cost', value: c.livingCost },
                { label: '🗣️ Language', value: c.language.split(';')[0] },
                { label: '💼 Work Rights', value: c.workRights },
                { label: '🎓 Top Universities', value: c.topUnis[0] + ` +${c.topUnis.length - 1} more` },
              ].map(({ label, value }) => (
                <div key={label} className="bg-slate-50 rounded-xl p-3">
                  <div className="text-xs font-semibold text-slate-500">{label}</div>
                  <div className="text-sm font-medium text-slate-800 mt-1">{value}</div>
                </div>
              ))}
            </div>

            <div className="flex flex-wrap gap-2 mb-4">
              <span className="text-xs font-semibold text-slate-500">Scholarships:</span>
              {c.scholarships.map((s) => (
                <span key={s} className="badge bg-brand-50 text-brand-700 border border-brand-100 text-xs">{s}</span>
              ))}
            </div>

            <div className="flex gap-3">
              <Link href={`/countries/${c.slug}`} className="btn-primary text-sm py-2">
                View Full Guide <ArrowRight className="w-4 h-4" />
              </Link>
              <Link href={`/scholarships?country=${c.name}`} className="btn-secondary text-sm py-2">
                View Scholarships
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
