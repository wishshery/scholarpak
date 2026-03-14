import Link from 'next/link';
import {
  Search, GraduationCap, Globe, Zap, Bell, ArrowRight,
  TrendingUp, BookOpen, MapPin, Award, Users, Clock
} from 'lucide-react';
import scholarships from '@/data/scholarships.json';

// Canva assets
const HERO_BANNER_URL = 'https://design.canva.ai/EyX-YnygIqO3mxD';

// --- Static data derived at build time ---
const totalScholarships = scholarships.length;
const fullyFunded = scholarships.filter((s) => s.funding_type?.toLowerCase().includes('fully')).length;
const countries = [...new Set(scholarships.map((s) => s.country))].length;

const FEATURED = scholarships.slice(0, 6);

const COUNTRY_CARDS = [
  { name: 'Germany', flag: '🇩🇪', count: scholarships.filter(s => s.country === 'Germany').length, slug: 'germany', highlight: 'Free tuition', color: 'from-yellow-50 to-amber-50 border-amber-100' },
  { name: 'United Kingdom', flag: '🇬🇧', count: scholarships.filter(s => s.country === 'United Kingdom').length, slug: 'united-kingdom', highlight: 'Chevening & Commonwealth', color: 'from-blue-50 to-indigo-50 border-blue-100' },
  { name: 'United States', flag: '🇺🇸', count: scholarships.filter(s => s.country === 'United States').length, slug: 'united-states', highlight: 'Fulbright Program', color: 'from-red-50 to-rose-50 border-red-100' },
  { name: 'Turkey', flag: '🇹🇷', count: scholarships.filter(s => s.country === 'Turkey').length, slug: 'turkey', highlight: 'No IELTS required', color: 'from-rose-50 to-red-50 border-rose-100' },
  { name: 'China', flag: '🇨🇳', count: scholarships.filter(s => s.country === 'China').length, slug: 'china', highlight: 'CSC Scholarship', color: 'from-orange-50 to-yellow-50 border-orange-100' },
  { name: 'Australia', flag: '🇦🇺', count: scholarships.filter(s => s.country === 'Australia').length, slug: 'australia', highlight: 'Australia Awards', color: 'from-emerald-50 to-green-50 border-emerald-100' },
  { name: 'Japan', flag: '🇯🇵', count: scholarships.filter(s => s.country === 'Japan').length, slug: 'japan', highlight: 'MEXT Scholarship', color: 'from-pink-50 to-rose-50 border-pink-100' },
  { name: 'South Korea', flag: '🇰🇷', count: scholarships.filter(s => s.country === 'South Korea').length, slug: 'south-korea', highlight: 'KGSP Program', color: 'from-sky-50 to-blue-50 border-sky-100' },
];

const FREE_TUITION = [
  { country: 'Germany', flag: '🇩🇪', note: 'No tuition at public universities', href: '/countries/germany' },
  { country: 'Austria', flag: '🇦🇹', note: 'Nominal fees only', href: '/countries/austria' },
  { country: 'Norway', flag: '🇳🇴', note: 'Free at public universities', href: '/countries/norway' },
  { country: 'Finland', flag: '🇫🇮', note: 'Scholarships cover tuition', href: '/countries/finland' },
  { country: 'Czech Republic', flag: '🇨🇿', note: 'Free if you study in Czech', href: '/countries/czech-republic' },
  { country: 'France', flag: '🇫🇷', note: 'Very low fees at public unis', href: '/countries/france' },
];

export default function HomePage() {
  return (
    <div className="min-h-screen">
      {/* ── HERO ── */}
      <section className="relative bg-hero-gradient overflow-hidden">
        {/* Canva banner background */}
        <div
          className="absolute inset-0 bg-cover bg-center opacity-20"
          style={{ backgroundImage: `url(${HERO_BANNER_URL})` }}
        />
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-10 w-72 h-72 bg-blue-400 rounded-full blur-3xl" />
          <div className="absolute bottom-10 right-20 w-96 h-96 bg-gold-400 rounded-full blur-3xl" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-20 md:py-28">
          <div className="text-center max-w-4xl mx-auto animate-slide-up">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 text-white px-4 py-2 rounded-full text-xs sm:text-sm font-semibold mb-5 sm:mb-6 backdrop-blur-sm">
              <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse shrink-0" />
              {totalScholarships}+ Active Scholarships for 2026
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-white font-heading leading-tight">
              Global Scholarships for
              <span className="block bg-gradient-to-r from-gold-400 to-yellow-300 bg-clip-text text-transparent">
                Pakistani Students
              </span>
            </h1>
            <p className="mt-4 sm:mt-6 text-base sm:text-lg md:text-xl text-blue-200 max-w-2xl mx-auto leading-relaxed px-2">
              Discover fully funded Bachelor, Master, and PhD scholarships worldwide. Updated daily.
            </p>

            {/* Search */}
            <div className="mt-8 sm:mt-10 flex flex-col sm:flex-row gap-3 max-w-2xl mx-auto">
              <div className="relative flex-1">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 pointer-events-none" />
                <input
                  type="search"
                  placeholder="Search scholarships, countries..."
                  className="w-full pl-12 pr-5 py-4 rounded-xl bg-white text-slate-800 placeholder-slate-400 font-medium focus:outline-none focus:ring-2 focus:ring-gold-400 shadow-lg"
                  style={{ fontSize: '16px' }}
                />
              </div>
              <Link href="/scholarships" className="btn-gold py-4 px-7 justify-center">
                Search <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            {/* Quick stats — 2×2 grid on mobile, row on larger */}
            <div className="mt-10 sm:mt-12 grid grid-cols-2 sm:flex sm:flex-wrap justify-center gap-y-6 gap-x-8 sm:gap-10">
              {[
                { icon: Award, label: 'Active Scholarships', value: `${totalScholarships}+` },
                { icon: Globe, label: 'Countries', value: `${countries}+` },
                { icon: Zap, label: 'Fully Funded', value: `${fullyFunded}+` },
                { icon: Users, label: 'Students Helped', value: '50K+' },
              ].map(({ icon: Icon, label, value }) => (
                <div key={label} className="text-center">
                  <div className="text-2xl sm:text-3xl font-extrabold text-white font-heading">{value}</div>
                  <div className="text-blue-300 text-xs sm:text-sm mt-0.5">{label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── QUICK FILTERS ── */}
      <section className="bg-white border-b border-slate-100 py-5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap gap-3 justify-center">
            {[
              { label: 'All Scholarships', href: '/scholarships', icon: BookOpen },
              { label: 'Fully Funded', href: '/scholarships?funding=fully-funded', icon: Award },
              { label: 'No IELTS', href: '/scholarships?ielts=no', icon: Zap },
              { label: 'Masters', href: '/scholarships?degree=masters', icon: GraduationCap },
              { label: 'PhD', href: '/scholarships?degree=phd', icon: GraduationCap },
              { label: 'Bachelor', href: '/scholarships?degree=bachelors', icon: GraduationCap },
              { label: 'Free Tuition Countries', href: '/free-tuition', icon: Globe },
            ].map(({ label, href, icon: Icon }) => (
              <Link
                key={label}
                href={href}
                className="flex items-center gap-2 px-4 py-2 rounded-full bg-slate-50 border border-slate-200 text-slate-600 font-medium text-sm hover:bg-brand-50 hover:text-brand-700 hover:border-brand-200 transition-all"
              >
                <Icon className="w-3.5 h-3.5" />
                {label}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── FEATURED SCHOLARSHIPS ── */}
      <section className="py-16 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="section-title">Latest Scholarships</h2>
              <p className="section-subtitle">Top opportunities for Pakistani students in 2026</p>
            </div>
            <Link href="/scholarships" className="btn-secondary hidden md:flex text-sm">
              View All <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {FEATURED.map((s) => (
              <ScholarshipCardMini key={s.id} s={s} />
            ))}
          </div>
          <div className="mt-8 text-center md:hidden">
            <Link href="/scholarships" className="btn-secondary">View All Scholarships</Link>
          </div>
        </div>
      </section>

      {/* ── BROWSE BY COUNTRY ── */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="section-title">Browse by Country</h2>
            <p className="section-subtitle mx-auto">Find scholarships in your dream destination</p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {COUNTRY_CARDS.map((c) => (
              <Link
                key={c.slug}
                href={`/countries/${c.slug}`}
                className={`group p-5 rounded-2xl border bg-gradient-to-br ${c.color} hover:-translate-y-1 transition-all duration-300 hover:shadow-card`}
              >
                <div className="text-3xl mb-3">{c.flag}</div>
                <h3 className="font-bold text-slate-800 text-sm group-hover:text-brand-700 transition-colors">{c.name}</h3>
                <p className="text-xs text-slate-500 mt-0.5">{c.highlight}</p>
                <p className="text-xs font-semibold text-brand-600 mt-2">
                  {c.count > 0 ? `${c.count} scholarship${c.count > 1 ? 's' : ''}` : 'Explore →'}
                </p>
              </Link>
            ))}
          </div>
          <div className="mt-6 text-center">
            <Link href="/countries" className="btn-secondary text-sm">
              View All Countries <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* ── FREE TUITION ── */}
      <section className="py-16 bg-gradient-to-br from-brand-900 to-brand-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-extrabold text-white font-heading">
              Study Abroad for Free 💸
            </h2>
            <p className="text-blue-300 mt-3 max-w-xl mx-auto">
              Countries where Pakistani students can study with zero or very low tuition fees
            </p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3 sm:gap-4">
            {FREE_TUITION.map((c) => (
              <Link
                key={c.country}
                href={c.href}
                className="bg-white/10 active:bg-white/25 border border-white/10 rounded-2xl p-4 text-center transition-all hover:-translate-y-1 group"
              >
                <div className="text-3xl sm:text-4xl mb-2">{c.flag}</div>
                <div className="font-bold text-white text-sm">{c.country}</div>
                <div className="text-blue-300 text-xs mt-1 hidden sm:block">{c.note}</div>
              </Link>
            ))}
          </div>
          <div className="text-center mt-8">
            <Link href="/free-tuition" className="btn-gold text-sm">
              Explore Free Tuition Guide <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* ── AI RECOMMENDER ── */}
      <section className="py-12 sm:py-16 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 bg-brand-100 text-brand-700 px-4 py-2 rounded-full text-sm font-semibold mb-5">
                <Zap className="w-4 h-4" /> AI-Powered Tool
              </div>
              <h2 className="section-title">Find Your Perfect Scholarship</h2>
              <p className="text-slate-500 mt-4 text-lg leading-relaxed">
                Tell us your degree level, field of study, IELTS score, and preferred country — our AI recommender will match you with the best scholarships instantly.
              </p>
              <ul className="mt-6 space-y-3">
                {['Personalized scholarship matches', 'Countries with highest acceptance chances', 'No-IELTS alternatives if applicable', 'Deadline reminders and alerts'].map((item) => (
                  <li key={item} className="flex items-center gap-3 text-slate-600">
                    <div className="w-5 h-5 rounded-full bg-emerald-100 flex items-center justify-center shrink-0">
                      <span className="text-emerald-600 text-xs">✓</span>
                    </div>
                    {item}
                  </li>
                ))}
              </ul>
              <Link href="/recommend" className="btn-primary mt-8 inline-flex">
                Try AI Recommender <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
            <div className="bg-white rounded-2xl shadow-card border border-slate-100 p-6">
              <div className="space-y-4">
                <div>
                  <label className="text-xs font-semibold text-slate-500 uppercase tracking-wide block mb-1.5">Degree Level</label>
                  <select className="filter-select w-full text-sm" disabled>
                    <option>Masters Degree</option>
                  </select>
                </div>
                <div>
                  <label className="text-xs font-semibold text-slate-500 uppercase tracking-wide block mb-1.5">Field of Study</label>
                  <select className="filter-select w-full text-sm" disabled>
                    <option>Engineering</option>
                  </select>
                </div>
                <div>
                  <label className="text-xs font-semibold text-slate-500 uppercase tracking-wide block mb-1.5">IELTS Score</label>
                  <input type="text" className="input-field text-sm" placeholder="e.g. 6.5" disabled />
                </div>
                <div>
                  <label className="text-xs font-semibold text-slate-500 uppercase tracking-wide block mb-1.5">Preferred Country</label>
                  <select className="filter-select w-full text-sm" disabled>
                    <option>Germany</option>
                  </select>
                </div>
                <Link href="/recommend" className="btn-primary w-full justify-center text-sm">
                  Get My Matches →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── ALERTS CTA ── */}
      <section className="py-14 bg-white border-t border-slate-100">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <Bell className="w-12 h-12 text-brand-600 mx-auto mb-5" />
          <h2 className="text-3xl font-extrabold text-brand-900 font-heading">Never Miss a Deadline</h2>
          <p className="text-slate-500 mt-3 text-lg">Subscribe for daily scholarship alerts via email or Telegram.</p>
          <div className="mt-8 flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="input-field flex-1 text-sm"
            />
            <Link href="/alerts" className="btn-primary justify-center text-sm whitespace-nowrap">
              Get Alerts <Bell className="w-4 h-4" />
            </Link>
          </div>
          <p className="text-slate-400 text-xs mt-3">Free. No spam. Unsubscribe anytime.</p>
        </div>
      </section>
    </div>
  );
}

// Inline mini card used on homepage
function ScholarshipCardMini({ s }) {
  const COUNTRY_FLAGS = {
    'Germany': '🇩🇪', 'United Kingdom': '🇬🇧', 'United States': '🇺🇸',
    'Turkey': '🇹🇷', 'China': '🇨🇳', 'Australia': '🇦🇺', 'Japan': '🇯🇵',
    'South Korea': '🇰🇷', 'Hungary': '🇭🇺', 'Sweden': '🇸🇪', 'Austria': '🇦🇹',
    'France': '🇫🇷', 'Netherlands': '🇳🇱', 'Italy': '🇮🇹', 'Finland': '🇫🇮',
    'Norway': '🇳🇴', 'Singapore': '🇸🇬', 'Malaysia': '🇲🇾', 'Canada': '🇨🇦',
    'New Zealand': '🇳🇿', 'Czech Republic': '🇨🇿', 'Multiple Countries': '🌍',
  };
  const flag = COUNTRY_FLAGS[s.country] || '🌐';
  const isFullyFunded = s.funding_type?.toLowerCase().includes('fully');
  return (
    <div className="card p-5 flex flex-col gap-3 hover:-translate-y-1 transition-all duration-300">
      <div className="flex items-start justify-between gap-2">
        <div>
          <div className="flex items-center gap-1.5 mb-1.5">
            <span>{flag}</span>
            <span className="text-xs text-slate-500 font-semibold">{s.country}</span>
          </div>
          <Link href={`/scholarships/${s.slug}`} className="font-bold text-brand-900 hover:text-brand-600 transition-colors text-sm leading-snug">
            {s.name}
          </Link>
        </div>
        {isFullyFunded
          ? <span className="badge-green text-xs shrink-0">Fully Funded</span>
          : <span className="badge-blue text-xs shrink-0">Partial</span>}
      </div>
      <div className="flex flex-wrap gap-1.5">
        {s.degree?.map((d) => (
          <span key={d} className="badge bg-brand-50 text-brand-700 text-xs border border-brand-100">{d}</span>
        ))}
        {s.ielts_required === false && (
          <span className="badge bg-emerald-50 text-emerald-700 text-xs border border-emerald-100">No IELTS</span>
        )}
      </div>
      <div className="flex items-center gap-2 text-xs text-slate-500">
        <Clock className="w-3.5 h-3.5 text-slate-400" />
        Deadline: {s.deadline}
      </div>
      <div className="flex gap-2 mt-auto">
        <a href={s.link} target="_blank" rel="noopener noreferrer"
          className="flex-1 text-center text-xs font-semibold bg-brand-700 text-white py-2 rounded-lg hover:bg-brand-800 transition-colors">
          Apply Now
        </a>
        <Link href={`/scholarships/${s.slug}`}
          className="text-xs font-semibold text-brand-700 border border-brand-200 py-2 px-3 rounded-lg hover:bg-brand-50 transition-colors">
          Details
        </Link>
      </div>
    </div>
  );
}
