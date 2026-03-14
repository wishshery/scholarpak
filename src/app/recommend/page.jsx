'use client';
import { useState } from 'react';
import Link from 'next/link';
import { Zap, ChevronRight, Award, Globe, GraduationCap, Clock, ExternalLink } from 'lucide-react';
import scholarshipsData from '@/data/scholarships.json';

const STEPS = ['degree', 'field', 'ielts', 'country', 'results'];

const DEGREE_OPTIONS = [
  { value: 'Bachelors', label: "Bachelor's Degree", emoji: '📚', desc: 'Undergraduate 4-year program' },
  { value: 'Masters', label: "Master's Degree", emoji: '🎓', desc: 'Postgraduate 1–2 year program' },
  { value: 'PhD', label: 'PhD / Doctorate', emoji: '🔬', desc: 'Research doctoral program (3–5 years)' },
];

const FIELD_OPTIONS = [
  'Engineering', 'Computer Science / IT', 'Medicine / Health Sciences', 'Business / Economics',
  'Social Sciences', 'Natural Sciences', 'Agriculture / Environment', 'Arts / Humanities',
  'Law / Political Science', 'Education', 'Architecture / Urban Planning', 'Other',
];

const COUNTRY_OPTIONS = [
  'No Preference', 'Germany', 'United Kingdom', 'United States', 'Turkey', 'China',
  'Australia', 'Japan', 'South Korea', 'Hungary', 'Sweden', 'Austria', 'France',
  'Netherlands', 'Italy', 'Finland', 'Norway', 'Singapore', 'Malaysia', 'Canada',
];

const COUNTRY_FLAGS = {
  'Germany': '🇩🇪', 'United Kingdom': '🇬🇧', 'United States': '🇺🇸',
  'Turkey': '🇹🇷', 'China': '🇨🇳', 'Australia': '🇦🇺', 'Japan': '🇯🇵',
  'South Korea': '🇰🇷', 'Hungary': '🇭🇺', 'Sweden': '🇸🇪', 'Austria': '🇦🇹',
  'France': '🇫🇷', 'Netherlands': '🇳🇱', 'Italy': '🇮🇹', 'Finland': '🇫🇮',
  'Norway': '🇳🇴', 'Singapore': '🇸🇬', 'Malaysia': '🇲🇾', 'Canada': '🇨🇦',
  'Multiple Countries': '🌍',
};

function getMatches({ degree, field, ielts, country }) {
  const ieltsNum = parseFloat(ielts) || 0;

  return scholarshipsData
    .filter((s) => {
      // Degree match
      if (degree && !s.degree?.map(d => d.toLowerCase()).includes(degree.toLowerCase())) return false;
      // Country preference
      if (country && country !== 'No Preference' && s.country !== country) return false;
      return true;
    })
    .map((s) => {
      let score = 50;
      // Fully funded bonus
      if (s.funding_type?.toLowerCase().includes('fully')) score += 20;
      // No IELTS if score is low
      if (ieltsNum < 6.0 && s.ielts_required === false) score += 30;
      if (ieltsNum >= 6.5 && s.ielts_required === true) score += 10;
      // Field match
      if (s.fields?.some(f => f.toLowerCase().includes(field?.toLowerCase()?.split('/')[0] || ''))) score += 15;
      // Travel allowance
      if (s.travel_allowance?.startsWith('Yes')) score += 5;

      return { ...s, matchScore: Math.min(score, 99) };
    })
    .sort((a, b) => b.matchScore - a.matchScore)
    .slice(0, 8);
}

export default function RecommendPage() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState({ degree: '', field: '', ielts: '', country: '' });
  const [results, setResults] = useState([]);

  const handleAnswer = (key, value) => {
    const updated = { ...answers, [key]: value };
    setAnswers(updated);
    if (step < STEPS.length - 2) {
      setStep(step + 1);
    } else if (step === STEPS.length - 2) {
      const matches = getMatches(updated);
      setResults(matches);
      setStep(STEPS.length - 1);
    }
  };

  const reset = () => { setStep(0); setAnswers({ degree: '', field: '', ielts: '', country: '' }); setResults([]); };

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Header */}
      <div className="text-center mb-10">
        <div className="inline-flex items-center gap-2 bg-brand-100 text-brand-700 px-4 py-2 rounded-full text-sm font-semibold mb-4">
          <Zap className="w-4 h-4" /> AI Scholarship Recommender
        </div>
        <h1 className="text-3xl md:text-4xl font-extrabold text-brand-900 font-heading">
          Find Your Perfect Scholarship
        </h1>
        <p className="text-slate-500 mt-3">Answer 4 quick questions and get personalized scholarship matches instantly.</p>
      </div>

      {/* Progress bar */}
      {step < STEPS.length - 1 && (
        <div className="mb-8">
          <div className="flex justify-between text-xs text-slate-500 mb-2">
            <span>Step {step + 1} of {STEPS.length - 1}</span>
            <span>{Math.round(((step) / (STEPS.length - 1)) * 100)}% complete</span>
          </div>
          <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-brand-600 to-brand-400 rounded-full transition-all duration-500"
              style={{ width: `${((step) / (STEPS.length - 1)) * 100}%` }}
            />
          </div>
        </div>
      )}

      {/* Step 0: Degree */}
      {step === 0 && (
        <div className="animate-slide-up">
          <h2 className="text-xl font-bold text-slate-800 mb-6 text-center">What degree level are you looking for?</h2>
          <div className="space-y-3">
            {DEGREE_OPTIONS.map((opt) => (
              <button
                key={opt.value}
                onClick={() => handleAnswer('degree', opt.value)}
                className="w-full card p-5 flex items-center gap-4 text-left hover:border-brand-400 hover:bg-brand-50 transition-all group"
              >
                <span className="text-3xl">{opt.emoji}</span>
                <div className="flex-1">
                  <div className="font-bold text-slate-800 group-hover:text-brand-700">{opt.label}</div>
                  <div className="text-sm text-slate-500 mt-0.5">{opt.desc}</div>
                </div>
                <ChevronRight className="w-5 h-5 text-slate-400 group-hover:text-brand-500 group-hover:translate-x-1 transition-all" />
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Step 1: Field */}
      {step === 1 && (
        <div className="animate-slide-up">
          <h2 className="text-xl font-bold text-slate-800 mb-6 text-center">What is your field of study?</h2>
          <div className="grid grid-cols-2 gap-3">
            {FIELD_OPTIONS.map((f) => (
              <button
                key={f}
                onClick={() => handleAnswer('field', f)}
                className="card p-4 text-sm font-semibold text-slate-700 hover:text-brand-700 hover:bg-brand-50 hover:border-brand-300 transition-all text-left"
              >
                {f}
              </button>
            ))}
          </div>
          <button onClick={() => setStep(step - 1)} className="mt-5 text-sm text-slate-400 hover:text-slate-600">← Go back</button>
        </div>
      )}

      {/* Step 2: IELTS */}
      {step === 2 && (
        <div className="animate-slide-up">
          <h2 className="text-xl font-bold text-slate-800 mb-2 text-center">What is your IELTS score?</h2>
          <p className="text-center text-slate-500 text-sm mb-8">Enter your current score or expected score. Enter 0 if you haven't taken IELTS yet.</p>
          <div className="grid grid-cols-3 gap-3 mb-6">
            {['0 (No IELTS)', '5.5', '6.0', '6.5', '7.0', '7.5+'].map((score) => (
              <button
                key={score}
                onClick={() => handleAnswer('ielts', score.split(' ')[0])}
                className="card py-4 text-center font-bold text-slate-700 hover:text-brand-700 hover:bg-brand-50 hover:border-brand-300 transition-all"
              >
                <div className="text-lg">{score}</div>
                {score === '0 (No IELTS)' && <div className="text-xs text-emerald-600 mt-0.5">No IELTS</div>}
                {score === '6.5' && <div className="text-xs text-brand-500 mt-0.5">Most common</div>}
              </button>
            ))}
          </div>
          <button onClick={() => setStep(step - 1)} className="text-sm text-slate-400 hover:text-slate-600">← Go back</button>
        </div>
      )}

      {/* Step 3: Country */}
      {step === 3 && (
        <div className="animate-slide-up">
          <h2 className="text-xl font-bold text-slate-800 mb-6 text-center">Do you have a preferred country?</h2>
          <div className="grid grid-cols-2 gap-3">
            {COUNTRY_OPTIONS.map((c) => (
              <button
                key={c}
                onClick={() => handleAnswer('country', c)}
                className="card p-4 flex items-center gap-3 text-sm font-semibold text-slate-700 hover:text-brand-700 hover:bg-brand-50 hover:border-brand-300 transition-all text-left"
              >
                <span className="text-xl">{c === 'No Preference' ? '🌍' : (COUNTRY_FLAGS[c] || '🌐')}</span>
                {c}
              </button>
            ))}
          </div>
          <button onClick={() => setStep(step - 1)} className="mt-5 text-sm text-slate-400 hover:text-slate-600">← Go back</button>
        </div>
      )}

      {/* Results */}
      {step === STEPS.length - 1 && (
        <div className="animate-slide-up">
          <div className="text-center mb-8">
            <div className="text-5xl mb-3">🎯</div>
            <h2 className="text-2xl font-extrabold text-brand-900 font-heading">Your Scholarship Matches</h2>
            <p className="text-slate-500 mt-2">
              Found <strong>{results.length}</strong> scholarships matching your profile
            </p>
            <div className="flex flex-wrap justify-center gap-2 mt-3">
              {answers.degree && <span className="badge-blue">{answers.degree}</span>}
              {answers.field && <span className="badge bg-purple-100 text-purple-700">{answers.field}</span>}
              {answers.ielts && <span className="badge bg-amber-100 text-amber-700">IELTS: {answers.ielts}</span>}
              {answers.country && answers.country !== 'No Preference' && <span className="badge bg-emerald-100 text-emerald-700">{answers.country}</span>}
            </div>
          </div>

          {results.length === 0 ? (
            <div className="card p-8 text-center">
              <p className="text-slate-600 mb-4">No exact matches found. Try broadening your preferences.</p>
              <button onClick={reset} className="btn-primary">Try Again</button>
            </div>
          ) : (
            <div className="space-y-4">
              {results.map((s) => (
                <div key={s.id} className="card p-5">
                  <div className="flex items-start justify-between gap-3 mb-3">
                    <div className="flex items-center gap-2">
                      <span className="text-xl">{COUNTRY_FLAGS[s.country] || '🌐'}</span>
                      <div>
                        <Link href={`/scholarships/${s.slug}`} className="font-bold text-brand-900 hover:text-brand-600 transition-colors text-sm">
                          {s.name}
                        </Link>
                        <p className="text-xs text-slate-500">{s.country} · {s.university}</p>
                      </div>
                    </div>
                    <div className="flex flex-col items-end gap-1">
                      <div className="flex items-center gap-1">
                        <div className="w-16 h-2 bg-slate-100 rounded-full overflow-hidden">
                          <div className="h-full bg-emerald-400 rounded-full" style={{ width: `${s.matchScore}%` }} />
                        </div>
                        <span className="text-xs font-bold text-emerald-600">{s.matchScore}%</span>
                      </div>
                      {s.funding_type?.toLowerCase().includes('fully')
                        ? <span className="badge-green text-xs">Fully Funded</span>
                        : <span className="badge-blue text-xs">Partial</span>}
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-1.5 mb-3">
                    {s.degree?.map(d => <span key={d} className="badge bg-brand-50 text-brand-700 text-xs">{d}</span>)}
                    {s.ielts_required === false && <span className="badge bg-emerald-50 text-emerald-700 text-xs">No IELTS</span>}
                  </div>
                  <p className="text-xs text-slate-500 mb-3 line-clamp-2">{s.description}</p>
                  <div className="flex gap-2">
                    <a href={s.link} target="_blank" rel="noopener noreferrer"
                      className="flex-1 text-center text-xs font-semibold bg-brand-700 text-white py-2 rounded-lg hover:bg-brand-800 transition-colors">
                      Apply Now
                    </a>
                    <Link href={`/scholarships/${s.slug}`}
                      className="text-xs font-semibold border border-brand-200 text-brand-700 py-2 px-3 rounded-lg hover:bg-brand-50 transition-colors">
                      Details
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}

          <div className="mt-8 flex gap-3 justify-center">
            <button onClick={reset} className="btn-secondary text-sm">Try Again</button>
            <Link href="/scholarships" className="btn-primary text-sm">Browse All Scholarships</Link>
          </div>
        </div>
      )}
    </div>
  );
}
