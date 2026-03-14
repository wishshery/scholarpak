import { notFound } from 'next/navigation';
import Link from 'next/link';
import {
  MapPin, GraduationCap, DollarSign, Clock, ExternalLink,
  CheckCircle, XCircle, ArrowLeft, Globe, BookOpen, Award
} from 'lucide-react';
import scholarships from '@/data/scholarships.json';

export async function generateStaticParams() {
  return scholarships.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }) {
  const s = scholarships.find((x) => x.slug === params.slug);
  if (!s) return {};
  return {
    title: `${s.name} — ${s.country} | ScholarPak`,
    description: s.description,
    keywords: [`${s.name}`, `scholarship in ${s.country} for pakistani students`, `${s.funding_type} scholarship`],
  };
}

const COUNTRY_FLAGS = {
  'Germany': '🇩🇪', 'United Kingdom': '🇬🇧', 'United States': '🇺🇸',
  'Turkey': '🇹🇷', 'China': '🇨🇳', 'Australia': '🇦🇺', 'Japan': '🇯🇵',
  'South Korea': '🇰🇷', 'Hungary': '🇭🇺', 'Sweden': '🇸🇪', 'Austria': '🇦🇹',
  'France': '🇫🇷', 'Netherlands': '🇳🇱', 'Italy': '🇮🇹', 'Finland': '🇫🇮',
  'Norway': '🇳🇴', 'Singapore': '🇸🇬', 'Malaysia': '🇲🇾', 'Canada': '🇨🇦',
  'New Zealand': '🇳🇿', 'Czech Republic': '🇨🇿', 'Multiple Countries': '🌍',
};

export default function ScholarshipDetailPage({ params }) {
  const s = scholarships.find((x) => x.slug === params.slug);
  if (!s) notFound();

  const flag = COUNTRY_FLAGS[s.country] || '🌐';
  const isFullyFunded = s.funding_type?.toLowerCase().includes('fully');
  const related = scholarships.filter((x) => x.country === s.country && x.id !== s.id).slice(0, 3);

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Back */}
      <Link href="/scholarships" className="inline-flex items-center gap-2 text-sm text-brand-600 hover:text-brand-800 font-semibold mb-6 group">
        <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
        Back to Scholarships
      </Link>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Main content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Header card */}
          <div className="card p-7">
            <div className="flex items-start gap-4">
              <div className="text-5xl">{flag}</div>
              <div className="flex-1">
                <div className="flex flex-wrap items-center gap-2 mb-2">
                  <span className="text-sm font-semibold text-slate-500">{s.country}</span>
                  {isFullyFunded
                    ? <span className="badge-green">✦ Fully Funded</span>
                    : <span className="badge-blue">Partial Funding</span>}
                  {s.ielts_required === false && <span className="badge bg-emerald-100 text-emerald-700">No IELTS Required</span>}
                </div>
                <h1 className="text-2xl md:text-3xl font-extrabold text-brand-900 font-heading leading-tight">{s.name}</h1>
                <p className="text-slate-500 mt-1">{s.university}</p>
              </div>
            </div>

            <p className="mt-5 text-slate-600 leading-relaxed text-base">{s.description}</p>

            <div className="mt-6 flex flex-wrap gap-2">
              {s.degree?.map((d) => (
                <span key={d} className="badge bg-brand-50 text-brand-700 border border-brand-100">
                  <GraduationCap className="w-3.5 h-3.5 mr-1" /> {d}
                </span>
              ))}
              {s.fields?.map((f) => (
                <span key={f} className="badge bg-slate-100 text-slate-600">{f}</span>
              ))}
            </div>
          </div>

          {/* Benefits */}
          <div className="card p-7">
            <h2 className="text-xl font-bold text-brand-900 font-heading mb-5">Scholarship Benefits</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {s.benefits?.map((b) => (
                <div key={b} className="flex items-center gap-3 p-3 bg-emerald-50 rounded-xl">
                  <CheckCircle className="w-4 h-4 text-emerald-500 shrink-0" />
                  <span className="text-sm text-slate-700 font-medium">{b}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Eligibility */}
          <div className="card p-7">
            <h2 className="text-xl font-bold text-brand-900 font-heading mb-5">Eligibility & Requirements</h2>
            <div className="space-y-3">
              <InfoRow label="Open to Pakistanis" value={s.open_to_pakistan ? 'Yes ✅' : 'Check official source'} />
              <InfoRow label="Degree Levels" value={s.degree?.join(', ')} />
              <InfoRow label="Fields of Study" value={s.fields?.join(', ')} />
              <InfoRow label="IELTS Required" value={s.ielts_required ? 'Yes' : 'No'} />
              <InfoRow label="Tests Accepted" value={s.tests_accepted?.join(', ')} />
              <InfoRow label="Application Deadline" value={s.deadline} highlight />
            </div>
          </div>

          {/* Application guide */}
          <div className="card p-7">
            <h2 className="text-xl font-bold text-brand-900 font-heading mb-4">How to Apply</h2>
            <ol className="space-y-3">
              {[
                'Check official scholarship website for current intake requirements',
                'Prepare academic documents: transcripts, degrees, certificates',
                'Write a strong Statement of Purpose (SOP) tailored to the scholarship',
                `Prepare English test results: ${s.tests_accepted?.[0] || 'IELTS/TOEFL'}`,
                'Obtain 2–3 recommendation letters from professors or supervisors',
                'Submit application before the deadline: ' + s.deadline,
              ].map((step, i) => (
                <li key={i} className="flex items-start gap-3 text-sm text-slate-600">
                  <span className="w-6 h-6 rounded-full bg-brand-100 text-brand-700 font-bold flex items-center justify-center shrink-0 text-xs">
                    {i + 1}
                  </span>
                  {step}
                </li>
              ))}
            </ol>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-5">
          {/* Apply CTA */}
          <div className="card p-6">
            <div className="text-center mb-5">
              <div className="text-3xl mb-2">{flag}</div>
              <div className="font-bold text-brand-900 text-lg">{s.name}</div>
            </div>
            <div className="space-y-2 mb-5 text-sm">
              <div className="flex justify-between py-2 border-b border-slate-100">
                <span className="text-slate-500">Funding</span>
                <span className="font-semibold text-slate-800">{s.funding_type}</span>
              </div>
              <div className="flex justify-between py-2 border-b border-slate-100">
                <span className="text-slate-500">Stipend</span>
                <span className="font-semibold text-slate-800 text-right max-w-[60%]">{s.monthly_stipend}</span>
              </div>
              <div className="flex justify-between py-2 border-b border-slate-100">
                <span className="text-slate-500">Deadline</span>
                <span className="font-semibold text-amber-600 text-right">{s.deadline}</span>
              </div>
              <div className="flex justify-between py-2">
                <span className="text-slate-500">Travel Grant</span>
                <span className="font-semibold text-slate-800">{s.travel_allowance?.startsWith('Yes') ? '✅ Yes' : '❌ No'}</span>
              </div>
            </div>
            <a href={s.link} target="_blank" rel="noopener noreferrer" className="btn-primary w-full justify-center">
              Apply Now <ExternalLink className="w-4 h-4" />
            </a>
            <a href={s.source} target="_blank" rel="noopener noreferrer"
              className="mt-3 flex items-center justify-center gap-2 text-sm text-slate-500 hover:text-brand-600 transition-colors">
              <Globe className="w-3.5 h-3.5" /> View Official Source
            </a>
          </div>

          {/* Country guide link */}
          <div className="card p-5 bg-brand-50 border-brand-100">
            <h4 className="font-bold text-brand-900 text-sm mb-2">📚 Study in {s.country}</h4>
            <p className="text-xs text-slate-500 mb-3">Visa requirements, living costs, universities and more.</p>
            <Link href={`/countries/${s.country.toLowerCase().replace(/ /g, '-')}`}
              className="text-sm font-semibold text-brand-700 hover:text-brand-900 flex items-center gap-1">
              View Country Guide <ArrowLeft className="w-3.5 h-3.5 rotate-180" />
            </Link>
          </div>
        </div>
      </div>

      {/* Related scholarships */}
      {related.length > 0 && (
        <div className="mt-12">
          <h2 className="text-2xl font-bold text-brand-900 font-heading mb-6">More Scholarships in {s.country}</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {related.map((r) => (
              <div key={r.id} className="card p-5">
                <div className="font-bold text-brand-900 text-sm mb-1">{r.name}</div>
                <div className="text-xs text-slate-500 mb-3">{r.deadline}</div>
                <Link href={`/scholarships/${r.slug}`} className="text-sm font-semibold text-brand-600 hover:text-brand-800">
                  View Details →
                </Link>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function InfoRow({ label, value, highlight }) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center gap-1 py-2.5 border-b border-slate-100 last:border-0">
      <span className="text-sm text-slate-500 sm:w-44 shrink-0">{label}</span>
      <span className={`text-sm font-semibold ${highlight ? 'text-amber-600' : 'text-slate-800'}`}>{value}</span>
    </div>
  );
}
