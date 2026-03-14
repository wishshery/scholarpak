import Link from 'next/link';

export const metadata = {
  title: 'Privacy Policy — ScholarPak',
  description: 'ScholarPak privacy policy. Learn how we collect, use, and protect your data.',
};

export default function PrivacyPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <Link href="/" className="text-sm text-brand-600 hover:text-brand-800 font-semibold mb-6 inline-block">
        ← Back to Home
      </Link>

      <h1 className="text-3xl font-extrabold text-brand-900 font-heading mb-2">Privacy Policy</h1>
      <p className="text-slate-500 text-sm mb-8">Last updated: March 2026</p>

      <div className="prose prose-slate max-w-none space-y-8">

        <section className="card p-6">
          <h2 className="text-xl font-bold text-brand-900 font-heading mb-3">1. Information We Collect</h2>
          <p className="text-slate-600 leading-relaxed">
            ScholarPak collects minimal information to provide scholarship alerts and improve our platform.
            When you subscribe to scholarship alerts, we collect your email address. We also collect anonymous
            usage data (pages visited, search queries) to understand how students use the platform.
          </p>
        </section>

        <section className="card p-6">
          <h2 className="text-xl font-bold text-brand-900 font-heading mb-3">2. How We Use Your Information</h2>
          <p className="text-slate-600 leading-relaxed">
            Your email address is used solely to send you scholarship alerts and updates you subscribed to.
            We do not sell, share, or rent your personal information to third parties.
            Anonymous usage data helps us improve search results and scholarship recommendations.
          </p>
        </section>

        <section className="card p-6">
          <h2 className="text-xl font-bold text-brand-900 font-heading mb-3">3. Cookies</h2>
          <p className="text-slate-600 leading-relaxed">
            ScholarPak uses essential cookies only — for analytics (Google Analytics) and to remember
            your preferences. We do not use advertising cookies. You can disable cookies in your browser
            settings, though this may affect some functionality.
          </p>
        </section>

        <section className="card p-6">
          <h2 className="text-xl font-bold text-brand-900 font-heading mb-3">4. Data Security</h2>
          <p className="text-slate-600 leading-relaxed">
            We take reasonable measures to protect your information. All data is stored on secure servers.
            Email addresses are stored with industry-standard encryption. We never store payment information
            as ScholarPak is a free platform.
          </p>
        </section>

        <section className="card p-6">
          <h2 className="text-xl font-bold text-brand-900 font-heading mb-3">5. Unsubscribe / Data Deletion</h2>
          <p className="text-slate-600 leading-relaxed">
            You can unsubscribe from scholarship alerts at any time by clicking the unsubscribe link
            in any email we send. To request deletion of your data, email us at{' '}
            <a href="mailto:hello@scholarpak.com" className="text-brand-600 hover:text-brand-800 font-semibold">
              hello@scholarpak.com
            </a>.
          </p>
        </section>

        <section className="card p-6">
          <h2 className="text-xl font-bold text-brand-900 font-heading mb-3">6. Contact</h2>
          <p className="text-slate-600 leading-relaxed">
            If you have questions about this privacy policy, please{' '}
            <Link href="/contact" className="text-brand-600 hover:text-brand-800 font-semibold">
              contact us
            </Link>.
          </p>
        </section>

      </div>
    </div>
  );
}
