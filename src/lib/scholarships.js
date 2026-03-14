/**
 * Utility functions for scholarship data operations.
 * Used across pages for filtering, searching, and matching.
 */

import scholarshipsData from '@/data/scholarships.json';

export function getAllScholarships() {
  return scholarshipsData;
}

export function getScholarshipBySlug(slug) {
  return scholarshipsData.find((s) => s.slug === slug) || null;
}

export function getScholarshipsByCountry(country) {
  return scholarshipsData.filter(
    (s) => s.country.toLowerCase() === country.toLowerCase()
  );
}

export function filterScholarships({ query = '', country, degree, funding, ielts } = {}) {
  return scholarshipsData.filter((s) => {
    if (query) {
      const q = query.toLowerCase();
      const searchable = `${s.name} ${s.country} ${s.university} ${s.description} ${s.fields?.join(' ')}`.toLowerCase();
      if (!searchable.includes(q)) return false;
    }
    if (country && country !== 'All Countries' && s.country !== country) return false;
    if (degree && degree !== 'All Degrees') {
      if (!s.degree?.map((d) => d.toLowerCase()).includes(degree.toLowerCase())) return false;
    }
    if (funding && funding !== 'All Funding') {
      const isFullyFunded = s.funding_type?.toLowerCase().includes('fully');
      if (funding === 'Fully Funded' && !isFullyFunded) return false;
      if (funding === 'Partial' && isFullyFunded) return false;
    }
    if (ielts === 'no' && s.ielts_required !== false) return false;
    if (ielts === 'yes' && s.ielts_required === false) return false;
    return true;
  });
}

export function getCountryList() {
  return [...new Set(scholarshipsData.map((s) => s.country))].sort();
}

export function getStats() {
  const total = scholarshipsData.length;
  const fullyFunded = scholarshipsData.filter((s) =>
    s.funding_type?.toLowerCase().includes('fully')
  ).length;
  const countries = new Set(scholarshipsData.map((s) => s.country)).size;
  const noIelts = scholarshipsData.filter((s) => s.ielts_required === false).length;
  return { total, fullyFunded, countries, noIelts };
}

export function getRelatedScholarships(scholarship, limit = 3) {
  return scholarshipsData
    .filter((s) => s.id !== scholarship.id && s.country === scholarship.country)
    .slice(0, limit);
}
