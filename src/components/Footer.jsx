import Link from 'next/link';
import { GraduationCap, Mail, Send, Globe, Heart } from 'lucide-react';

const footerLinks = {
  Scholarships: [
    { label: 'All Scholarships', href: '/scholarships' },
    { label: 'Fully Funded', href: '/scholarships?funding=fully-funded' },
    { label: 'No IELTS Required', href: '/scholarships?ielts=no' },
    { label: 'PhD Scholarships', href: '/scholarships?degree=phd' },
    { label: 'Masters Scholarships', href: '/scholarships?degree=masters' },
  ],
  Countries: [
    { label: 'Germany', href: '/countries/germany' },
    { label: 'United Kingdom', href: '/countries/united-kingdom' },
    { label: 'United States', href: '/countries/united-states' },
    { label: 'Turkey', href: '/countries/turkey' },
    { label: 'Australia', href: '/countries/australia' },
  ],
  Tools: [
    { label: 'AI Recommender', href: '/recommend' },
    { label: 'Free Tuition Countries', href: '/free-tuition' },
    { label: 'Scholarship Alerts', href: '/alerts' },
    { label: 'Country Guides', href: '/countries' },
  ],
};

export default function Footer() {
  return (
    <footer className="bg-brand-900 text-slate-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Newsletter strip */}
        <div className="py-10 border-b border-brand-800">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h3 className="text-xl font-bold text-white font-heading">Get Scholarship Alerts</h3>
              <p className="text-slate-400 mt-1 text-sm">New scholarships delivered to your inbox daily.</p>
            </div>
            <form className="flex flex-col xs:flex-row gap-2 w-full md:w-auto">
              <input
                type="email"
                placeholder="your@email.com"
                className="flex-1 md:w-72 px-4 py-3 rounded-xl bg-brand-800 border border-brand-700 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-brand-400"
                style={{ fontSize: '16px' }}
                autoComplete="email"
              />
              <button type="submit" className="btn-gold px-5 py-3 text-sm flex items-center justify-center gap-2 whitespace-nowrap">
                <Mail className="w-4 h-4" /> Subscribe
              </button>
            </form>
          </div>
        </div>

        {/* Links grid */}
        <div className="py-10 sm:py-12 grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <Link href="/" className="flex items-center gap-2.5 mb-4">
              <div className="w-9 h-9 bg-brand-600 rounded-xl flex items-center justify-center">
                <GraduationCap className="w-5 h-5 text-white" />
              </div>
              <span className="font-extrabold text-xl text-white font-heading">
                Scholar<span className="text-gold-400">Pak</span>
              </span>
            </Link>
            <p className="text-slate-400 text-sm leading-relaxed">
              Pakistan's most comprehensive scholarship discovery platform. Updated daily with verified opportunities from 30+ countries.
            </p>
            <div className="flex items-center gap-3 mt-5">
              <a
                href="https://t.me/scholarpak"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm text-slate-400 hover:text-white transition-colors"
              >
                <Send className="w-4 h-4 text-sky-400" /> Telegram Channel
              </a>
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(footerLinks).map(([heading, links]) => (
            <div key={heading}>
              <h4 className="text-white font-semibold text-sm uppercase tracking-wider mb-4">{heading}</h4>
              <ul className="space-y-2.5">
                {links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-slate-400 hover:text-white text-sm transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="py-6 border-t border-brand-800 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-500 pb-safe">
          <p>© {new Date().getFullYear()} ScholarPak. Scholarships verified from official sources.</p>
          <p className="flex items-center gap-1">
            Made with <Heart className="w-3 h-3 text-red-400 fill-red-400" /> for Pakistani students
          </p>
          <div className="flex gap-4">
            <Link href="/privacy" className="hover:text-slate-300 transition-colors">Privacy</Link>
            <Link href="/about" className="hover:text-slate-300 transition-colors">About</Link>
            <Link href="/contact" className="hover:text-slate-300 transition-colors">Contact</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
