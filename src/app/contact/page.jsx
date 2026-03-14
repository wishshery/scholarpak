import Link from 'next/link';
import { Mail, Send, MessageCircle, Globe } from 'lucide-react';

export const metadata = {
  title: 'Contact ScholarPak — Get in Touch',
  description: 'Contact ScholarPak team for scholarship queries, partnership opportunities, or feedback.',
};

export default function ContactPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <Link href="/" className="text-sm text-brand-600 hover:text-brand-800 font-semibold mb-6 inline-block">
        ← Back to Home
      </Link>

      <div className="text-center mb-10">
        <h1 className="text-3xl font-extrabold text-brand-900 font-heading mb-3">Contact Us</h1>
        <p className="text-slate-500">Have a question, found an error, or want to partner with us? We'd love to hear from you.</p>
      </div>

      <div className="grid sm:grid-cols-2 gap-5 mb-10">
        <a
          href="mailto:hello@scholarpak.com"
          className="card p-6 flex items-start gap-4 hover:border-brand-300 hover:bg-brand-50 transition-all group"
        >
          <div className="w-10 h-10 bg-brand-100 rounded-xl flex items-center justify-center shrink-0">
            <Mail className="w-5 h-5 text-brand-700" />
          </div>
          <div>
            <h3 className="font-bold text-slate-800 group-hover:text-brand-700 transition-colors">Email Us</h3>
            <p className="text-sm text-slate-500 mt-1">For general queries, feedback, and partnerships</p>
            <p className="text-sm text-brand-600 font-semibold mt-2">hello@scholarpak.com</p>
          </div>
        </a>

        <a
          href="https://t.me/scholarpak"
          target="_blank"
          rel="noopener noreferrer"
          className="card p-6 flex items-start gap-4 hover:border-sky-300 hover:bg-sky-50 transition-all group"
        >
          <div className="w-10 h-10 bg-sky-100 rounded-xl flex items-center justify-center shrink-0">
            <Send className="w-5 h-5 text-sky-600" />
          </div>
          <div>
            <h3 className="font-bold text-slate-800 group-hover:text-sky-700 transition-colors">Telegram Channel</h3>
            <p className="text-sm text-slate-500 mt-1">Get instant scholarship alerts on Telegram</p>
            <p className="text-sm text-sky-600 font-semibold mt-2">@scholarpak</p>
          </div>
        </a>
      </div>

      {/* FAQ */}
      <div className="card p-6 mb-8">
        <h2 className="text-xl font-bold text-brand-900 font-heading mb-5">Frequently Asked Questions</h2>
        <div className="space-y-5">
          {[
            {
              q: 'Is ScholarPak free to use?',
              a: 'Yes, ScholarPak is completely free. We will never charge you for browsing scholarships or getting recommendations.',
            },
            {
              q: 'How often is the scholarship database updated?',
              a: 'Our database is updated daily. We scrape official university and government websites to keep information accurate.',
            },
            {
              q: 'I found incorrect scholarship information. How do I report it?',
              a: "Please email us at hello@scholarpak.com with the scholarship name and the correction. We'll update it within 24 hours.",
            },
            {
              q: 'Can I submit a scholarship that\'s not listed?',
              a: 'Absolutely! Email us the scholarship details and we\'ll review and add it to our database.',
            },
            {
              q: 'Do you offer personal scholarship application help?',
              a: 'We currently only provide information and recommendations. For personal guidance, our AI Recommender tool is a great starting point.',
            },
          ].map(({ q, a }) => (
            <div key={q} className="border-b border-slate-100 pb-5 last:border-0 last:pb-0">
              <h3 className="font-semibold text-slate-800 mb-1.5">{q}</h3>
              <p className="text-sm text-slate-500 leading-relaxed">{a}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="text-center">
        <p className="text-slate-500 text-sm">
          Looking for scholarships?{' '}
          <Link href="/scholarships" className="text-brand-600 hover:text-brand-800 font-semibold">Browse all scholarships →</Link>
        </p>
      </div>
    </div>
  );
}
