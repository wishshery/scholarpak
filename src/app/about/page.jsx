import Link from 'next/link';
import { GraduationCap, Globe, Heart, Zap, Shield, Users } from 'lucide-react';

export const metadata = {
  title: 'About ScholarPak — Pakistan\'s Scholarship Discovery Platform',
  description: 'Learn about ScholarPak, the most comprehensive scholarship discovery platform for Pakistani students. Find scholarships in 30+ countries, updated daily.',
};

export default function AboutPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <Link href="/" className="text-sm text-brand-600 hover:text-brand-800 font-semibold mb-6 inline-block">
        ← Back to Home
      </Link>

      {/* Hero */}
      <div className="text-center mb-12">
        <div className="inline-flex items-center gap-2 bg-brand-100 text-brand-700 px-4 py-2 rounded-full text-sm font-semibold mb-4">
          <GraduationCap className="w-4 h-4" /> Pakistan's #1 Scholarship Platform
        </div>
        <h1 className="text-3xl md:text-4xl font-extrabold text-brand-900 font-heading mb-4">
          About ScholarPak
        </h1>
        <p className="text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
          ScholarPak was built with one mission: to make international scholarships accessible
          to every Pakistani student, regardless of background or resources.
        </p>
      </div>

      {/* Mission */}
      <div className="card p-8 mb-8 bg-gradient-to-br from-brand-50 to-blue-50 border-brand-100">
        <h2 className="text-2xl font-bold text-brand-900 font-heading mb-4">Our Mission</h2>
        <p className="text-slate-700 leading-relaxed text-lg">
          Millions of talented Pakistani students dream of studying abroad but don't know where to start.
          Scholarship information is scattered across hundreds of websites, often outdated or hard to find.
          ScholarPak solves this by aggregating, verifying, and presenting scholarship opportunities in a
          clean, easy-to-use platform — completely free.
        </p>
      </div>

      {/* What we do */}
      <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-5 mb-10">
        {[
          {
            icon: Globe,
            color: 'bg-blue-100 text-blue-700',
            title: '30+ Countries',
            desc: 'Scholarships from Germany, UK, USA, Turkey, and 26+ more countries — all in one place.',
          },
          {
            icon: Zap,
            color: 'bg-amber-100 text-amber-700',
            title: 'Daily Updates',
            desc: 'Our database is updated every day with new scholarship listings and deadline reminders.',
          },
          {
            icon: Shield,
            color: 'bg-emerald-100 text-emerald-700',
            title: 'Verified Sources',
            desc: 'Every scholarship is verified from official university and government websites.',
          },
          {
            icon: Heart,
            color: 'bg-red-100 text-red-700',
            title: 'Made for Pakistanis',
            desc: 'Designed specifically for Pakistani students — eligibility, HEC requirements, and more.',
          },
          {
            icon: GraduationCap,
            color: 'bg-purple-100 text-purple-700',
            title: 'AI Recommender',
            desc: 'Our AI-powered tool matches your profile to the best scholarships in seconds.',
          },
          {
            icon: Users,
            color: 'bg-brand-100 text-brand-700',
            title: 'Free Forever',
            desc: 'ScholarPak will always be free. No fees, no premium tiers — just opportunities.',
          },
        ].map(({ icon: Icon, color, title, desc }) => (
          <div key={title} className="card p-5">
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-3 ${color}`}>
              <Icon className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-slate-800 mb-1">{title}</h3>
            <p className="text-sm text-slate-500 leading-relaxed">{desc}</p>
          </div>
        ))}
      </div>

      {/* CTA */}
      <div className="card p-8 text-center bg-brand-900 text-white">
        <h2 className="text-2xl font-bold font-heading mb-3">Start Your Scholarship Journey</h2>
        <p className="text-slate-300 mb-6">Browse over 26 verified scholarships or get personalized recommendations.</p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link href="/scholarships" className="btn-gold px-6 py-3">Browse Scholarships</Link>
          <Link href="/recommend" className="btn-secondary px-6 py-3 bg-transparent border-slate-600 text-white hover:bg-brand-800">
            AI Recommender
          </Link>
        </div>
      </div>

      <div className="text-center mt-8">
        <p className="text-slate-500 text-sm">
          Have feedback or want to partner with us?{' '}
          <Link href="/contact" className="text-brand-600 hover:text-brand-800 font-semibold">Get in touch →</Link>
        </p>
      </div>
    </div>
  );
}
