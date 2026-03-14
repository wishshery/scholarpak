'use client';
import { useState } from 'react';
import { Bell, Send, Mail, CheckCircle, Zap } from 'lucide-react';

const PREFERENCES = [
  { id: 'fully-funded', label: 'Fully Funded Only', emoji: '💰' },
  { id: 'no-ielts', label: 'No IELTS Required', emoji: '📝' },
  { id: 'europe', label: 'Europe', emoji: '🇪🇺' },
  { id: 'masters', label: "Masters Programs", emoji: '🎓' },
  { id: 'phd', label: 'PhD Programs', emoji: '🔬' },
  { id: 'bachelors', label: "Bachelor's Programs", emoji: '📚' },
];

export default function AlertsPage() {
  const [email, setEmail] = useState('');
  const [prefs, setPrefs] = useState([]);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const togglePref = (id) => {
    setPrefs((prev) => prev.includes(id) ? prev.filter((p) => p !== id) : [...prev, id]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email) return;
    setLoading(true);
    // Simulated submission — replace with your backend or email service (Mailchimp, ConvertKit, Resend)
    await new Promise((r) => setTimeout(r, 1200));
    setSubmitted(true);
    setLoading(false);
  };

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Header */}
      <div className="text-center mb-10">
        <div className="w-16 h-16 bg-brand-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
          <Bell className="w-8 h-8 text-brand-700" />
        </div>
        <h1 className="text-3xl font-extrabold text-brand-900 font-heading">Scholarship Alerts</h1>
        <p className="text-slate-500 mt-3 text-lg">
          Get instantly notified when new scholarships are added or deadlines approach.
        </p>
      </div>

      {/* Alert types */}
      <div className="grid grid-cols-2 gap-4 mb-10">
        {[
          { icon: Mail, title: 'Email Alerts', desc: 'Daily digest of new scholarships matching your preferences', color: 'bg-blue-50 border-blue-100' },
          { icon: Send, title: 'Telegram Alerts', desc: 'Instant notifications on our Telegram channel', color: 'bg-sky-50 border-sky-100' },
          { icon: Bell, title: 'Deadline Reminders', desc: 'Get reminded 30, 7, and 1 day before key deadlines', color: 'bg-amber-50 border-amber-100' },
          { icon: Zap, title: 'New Scholarships', desc: 'First to know when new opportunities are posted', color: 'bg-emerald-50 border-emerald-100' },
        ].map(({ icon: Icon, title, desc, color }) => (
          <div key={title} className={`card p-4 border ${color}`}>
            <Icon className="w-5 h-5 text-brand-700 mb-2" />
            <h3 className="font-bold text-slate-800 text-sm">{title}</h3>
            <p className="text-xs text-slate-500 mt-1">{desc}</p>
          </div>
        ))}
      </div>

      {/* Subscription form */}
      {!submitted ? (
        <div className="card p-7">
          <h2 className="text-xl font-bold text-brand-900 font-heading mb-6">Subscribe to Email Alerts</h2>
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="text-xs font-semibold text-slate-500 uppercase tracking-wide block mb-2">Your Email</label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="youremail@example.com"
                className="input-field"
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-500 uppercase tracking-wide block mb-3">Preferences (optional)</label>
              <div className="grid grid-cols-2 gap-2">
                {PREFERENCES.map((p) => (
                  <button
                    type="button"
                    key={p.id}
                    onClick={() => togglePref(p.id)}
                    className={`flex items-center gap-2 p-3 rounded-xl border text-sm font-medium transition-all ${
                      prefs.includes(p.id)
                        ? 'bg-brand-700 text-white border-brand-700'
                        : 'bg-white text-slate-600 border-slate-200 hover:border-brand-300'
                    }`}
                  >
                    <span>{p.emoji}</span>
                    {p.label}
                    {prefs.includes(p.id) && <CheckCircle className="w-3.5 h-3.5 ml-auto" />}
                  </button>
                ))}
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="btn-primary w-full justify-center"
            >
              {loading ? 'Subscribing...' : <>Subscribe Now <Bell className="w-4 h-4" /></>}
            </button>

            <p className="text-xs text-slate-400 text-center">
              Free. No spam. Unsubscribe anytime with one click.
            </p>
          </form>
        </div>
      ) : (
        <div className="card p-10 text-center">
          <CheckCircle className="w-16 h-16 text-emerald-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-brand-900 font-heading">You're subscribed! 🎉</h2>
          <p className="text-slate-500 mt-3">
            You'll receive scholarship alerts at <strong>{email}</strong>.<br />
            Check your inbox for a confirmation email.
          </p>
        </div>
      )}

      {/* Telegram CTA */}
      <div className="mt-8 card p-6 bg-gradient-to-br from-sky-50 to-blue-50 border-sky-100 text-center">
        <Send className="w-8 h-8 text-sky-500 mx-auto mb-3" />
        <h3 className="font-bold text-slate-800 text-lg">Join Our Telegram Channel</h3>
        <p className="text-slate-500 text-sm mt-2 mb-4">
          Get instant scholarship alerts on Telegram. 10,000+ Pakistani students already joined.
        </p>
        <a
          href="https://t.me/scholarpak"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 bg-sky-500 hover:bg-sky-600 text-white font-semibold px-6 py-3 rounded-xl transition-colors"
        >
          <Send className="w-4 h-4" /> Join Telegram Channel
        </a>
      </div>
    </div>
  );
}
