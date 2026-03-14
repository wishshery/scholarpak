'use client';
import { useState, useMemo } from 'react';
import ScholarshipCard from '@/components/ScholarshipCard';
import SearchFilter from '@/components/SearchFilter';
import scholarshipsData from '@/data/scholarships.json';

export default function ScholarshipsPage() {
  const [filters, setFilters] = useState({ query: '', country: 'All Countries', degree: 'All Degrees', funding: 'All Funding', ielts: 'any' });

  const filtered = useMemo(() => {
    return scholarshipsData.filter((s) => {
      const q = filters.query.toLowerCase();
      if (q && !s.name.toLowerCase().includes(q) && !s.country.toLowerCase().includes(q) && !s.university.toLowerCase().includes(q) && !s.description.toLowerCase().includes(q)) return false;
      if (filters.country !== 'All Countries' && s.country !== filters.country) return false;
      if (filters.degree !== 'All Degrees' && !s.degree?.map(d => d.toLowerCase()).includes(filters.degree.toLowerCase())) return false;
      if (filters.funding !== 'All Funding') {
        if (filters.funding === 'Fully Funded' && !s.funding_type?.toLowerCase().includes('fully')) return false;
        if (filters.funding === 'Partial' && s.funding_type?.toLowerCase().includes('fully')) return false;
      }
      if (filters.ielts === 'no' && s.ielts_required !== false) return false;
      if (filters.ielts === 'yes' && s.ielts_required === false) return false;
      return true;
    });
  }, [filters]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Page header */}
      <div className="mb-8">
        <h1 className="text-3xl font-extrabold text-brand-900 font-heading">
          International Scholarships for Pakistani Students
        </h1>
        <p className="text-slate-500 mt-2 text-lg">
          Browse {scholarshipsData.length}+ verified scholarships from official sources. Updated daily.
        </p>
      </div>

      {/* Filters */}
      <div className="mb-8">
        <SearchFilter onFilter={setFilters} total={filtered.length} />
      </div>

      {/* Results */}
      {filtered.length === 0 ? (
        <div className="text-center py-20">
          <div className="text-5xl mb-4">🔍</div>
          <h3 className="text-xl font-bold text-slate-700">No scholarships found</h3>
          <p className="text-slate-500 mt-2">Try adjusting your filters or search terms.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {filtered.map((s) => (
            <ScholarshipCard key={s.id} scholarship={s} />
          ))}
        </div>
      )}
    </div>
  );
}
