import Link from 'next/link';
import { MapPin, GraduationCap, DollarSign, Clock, ExternalLink, CheckCircle, XCircle } from 'lucide-react';

const COUNTRY_FLAGS = {
  'Germany': '🇩🇪', 'United Kingdom': '🇬🇧', 'United States': '🇺🇸',
  'Turkey': '🇹🇷', 'China': '🇨🇳', 'Australia': '🇦🇺', 'Japan': '🇯🇵',
  'South Korea': '🇰🇷', 'Hungary': '🇭🇺', 'Sweden': '🇸🇪', 'Austria': '🇦🇹',
  'France': '🇫🇷', 'Netherlands': '🇳🇱', 'Italy': '🇮🇹', 'Finland': '🇫🇮',
  'Norway': '🇳🇴', 'Singapore': '🇸🇬', 'Malaysia': '🇲🇾', 'Canada': '🇨🇦',
  'New Zealand': '🇳🇿', 'Czech Republic': '🇨🇿', 'Multiple Countries': '🌍',
};

export default function ScholarshipCard({ scholarship, compact = false }) {
  const flag = COUNTRY_FLAGS[scholarship.country] || '🌐';
  const isFullyFunded = scholarship.funding_type?.toLowerCase().includes('fully');

  return (
    <div className="card p-5 md:p-6 flex flex-col gap-4 hover:-translate-y-1 transition-all duration-300">
      {/* Header */}
      <div className="flex items-start justify-between gap-3">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-xl">{flag}</span>
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wide">
              {scholarship.country}
            </span>
          </div>
          <Link
            href={`/scholarships/${scholarship.slug}`}
            className="text-base md:text-lg font-bold text-brand-900 hover:text-brand-600 transition-colors leading-snug block"
          >
            {scholarship.name}
          </Link>
          <p className="text-sm text-slate-500 mt-1">{scholarship.university}</p>
        </div>
        {isFullyFunded ? (
          <span className="badge-green shrink-0">✦ Fully Funded</span>
        ) : (
          <span className="badge-blue shrink-0">Partial</span>
        )}
      </div>

      {/* Meta pills */}
      <div className="flex flex-wrap gap-2">
        {scholarship.degree?.map((d) => (
          <span key={d} className="badge bg-brand-50 text-brand-700 border border-brand-100">
            <GraduationCap className="w-3 h-3 mr-1" />
            {d}
          </span>
        ))}
        {scholarship.ielts_required === false && (
          <span className="badge bg-emerald-50 text-emerald-700 border border-emerald-100">
            No IELTS
          </span>
        )}
      </div>

      {/* Benefits */}
      {!compact && (
        <div className="grid grid-cols-2 gap-3 text-sm">
          <div className="flex items-center gap-2 text-slate-600">
            <DollarSign className="w-4 h-4 text-brand-400 shrink-0" />
            <span className="truncate">{scholarship.monthly_stipend || 'See details'}</span>
          </div>
          <div className="flex items-center gap-2 text-slate-600">
            <Clock className="w-4 h-4 text-brand-400 shrink-0" />
            <span className="truncate">{scholarship.deadline}</span>
          </div>
          <div className="flex items-center gap-2 text-slate-600">
            {scholarship.tuition_covered ? (
              <CheckCircle className="w-4 h-4 text-emerald-500 shrink-0" />
            ) : (
              <XCircle className="w-4 h-4 text-slate-300 shrink-0" />
            )}
            <span>Tuition {scholarship.tuition_covered ? 'covered' : 'not covered'}</span>
          </div>
          <div className="flex items-center gap-2 text-slate-600">
            {scholarship.travel_allowance === 'Yes' || scholarship.travel_allowance?.startsWith('Yes') ? (
              <CheckCircle className="w-4 h-4 text-emerald-500 shrink-0" />
            ) : (
              <XCircle className="w-4 h-4 text-slate-300 shrink-0" />
            )}
            <span>Travel {scholarship.travel_allowance?.startsWith('Yes') ? 'included' : 'not included'}</span>
          </div>
        </div>
      )}

      {/* Description */}
      {!compact && (
        <p className="text-sm text-slate-500 leading-relaxed line-clamp-2">
          {scholarship.description}
        </p>
      )}

      {/* Actions */}
      <div className="flex items-center gap-3 pt-1 mt-auto">
        <a
          href={scholarship.link}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-primary flex-1 justify-center text-sm py-2.5"
        >
          Apply Now <ExternalLink className="w-4 h-4" />
        </a>
        <Link
          href={`/scholarships/${scholarship.slug}`}
          className="btn-secondary text-sm py-2.5 px-4"
        >
          Details
        </Link>
      </div>
    </div>
  );
}
