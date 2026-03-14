'use client';
import { useState, useEffect } from 'react';
import { Search, SlidersHorizontal, X } from 'lucide-react';

const COUNTRIES = [
  'All Countries', 'Germany', 'United Kingdom', 'United States', 'Turkey', 'China',
  'Australia', 'Japan', 'South Korea', 'Hungary', 'Sweden', 'Austria', 'France',
  'Netherlands', 'Italy', 'Finland', 'Norway', 'Singapore', 'Malaysia', 'Canada',
  'New Zealand', 'Czech Republic', 'Multiple Countries',
];

const DEGREES = ['All Degrees', 'Bachelors', 'Masters', 'PhD'];
const FUNDING = ['All Funding', 'Fully Funded', 'Partial'];
const DEADLINE_MONTHS = ['Any Deadline', 'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

export default function SearchFilter({ onFilter, total }) {
  const [query, setQuery] = useState('');
  const [country, setCountry] = useState('All Countries');
  const [degree, setDegree] = useState('All Degrees');
  const [funding, setFunding] = useState('All Funding');
  const [ielts, setIelts] = useState('any');
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    onFilter({ query, country, degree, funding, ielts });
  }, [query, country, degree, funding, ielts]);

  const activeFilterCount = [
    country !== 'All Countries',
    degree !== 'All Degrees',
    funding !== 'All Funding',
    ielts !== 'any',
  ].filter(Boolean).length;

  const resetFilters = () => {
    setQuery('');
    setCountry('All Countries');
    setDegree('All Degrees');
    setFunding('All Funding');
    setIelts('any');
  };

  return (
    <div className="bg-white rounded-2xl shadow-card border border-slate-100 p-5">
      {/* Search row */}
      <div className="flex gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="search"
            placeholder="Search scholarships, countries..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="input-field pl-11"
            autoComplete="off"
            autoCorrect="off"
            autoCapitalize="off"
            spellCheck="false"
          />
          {query && (
            <button onClick={() => setQuery('')} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600">
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
        <button
          onClick={() => setShowFilters(!showFilters)}
          className={`flex items-center gap-2 px-4 py-3 rounded-xl border-2 font-semibold text-sm transition-all ${
            showFilters || activeFilterCount > 0
              ? 'bg-brand-700 text-white border-brand-700'
              : 'bg-white text-slate-600 border-slate-200 hover:border-brand-300'
          }`}
        >
          <SlidersHorizontal className="w-4 h-4" />
          Filters
          {activeFilterCount > 0 && (
            <span className="w-5 h-5 bg-gold-400 text-white text-xs rounded-full flex items-center justify-center font-bold">
              {activeFilterCount}
            </span>
          )}
        </button>
      </div>

      {/* Filter panel */}
      {showFilters && (
        <div className="mt-4 pt-4 border-t border-slate-100 animate-fade-in">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
            <div>
              <label className="text-xs font-semibold text-slate-500 uppercase tracking-wide block mb-1.5">Country</label>
              <select value={country} onChange={(e) => setCountry(e.target.value)} className="filter-select w-full text-sm">
                {COUNTRIES.map((c) => <option key={c}>{c}</option>)}
              </select>
            </div>
            <div>
              <label className="text-xs font-semibold text-slate-500 uppercase tracking-wide block mb-1.5">Degree Level</label>
              <select value={degree} onChange={(e) => setDegree(e.target.value)} className="filter-select w-full text-sm">
                {DEGREES.map((d) => <option key={d}>{d}</option>)}
              </select>
            </div>
            <div>
              <label className="text-xs font-semibold text-slate-500 uppercase tracking-wide block mb-1.5">Funding Type</label>
              <select value={funding} onChange={(e) => setFunding(e.target.value)} className="filter-select w-full text-sm">
                {FUNDING.map((f) => <option key={f}>{f}</option>)}
              </select>
            </div>
            <div>
              <label className="text-xs font-semibold text-slate-500 uppercase tracking-wide block mb-1.5">IELTS Requirement</label>
              <select value={ielts} onChange={(e) => setIelts(e.target.value)} className="filter-select w-full text-sm">
                <option value="any">Any</option>
                <option value="no">No IELTS Required</option>
                <option value="yes">IELTS Required</option>
              </select>
            </div>
          </div>
          {activeFilterCount > 0 && (
            <button
              onClick={resetFilters}
              className="mt-3 text-sm text-brand-600 hover:text-brand-800 font-semibold flex items-center gap-1"
            >
              <X className="w-3.5 h-3.5" /> Reset all filters
            </button>
          )}
        </div>
      )}

      {/* Result count */}
      <p className="mt-3 text-sm text-slate-500">
        Showing <span className="font-bold text-brand-700">{total}</span> scholarships for Pakistani students
      </p>
    </div>
  );
}
