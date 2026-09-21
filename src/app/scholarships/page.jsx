"use client";
import { Suspense, useMemo } from "react";
import { useSearchParams } from "next/navigation";
import { Search } from "lucide-react";
import ScholarshipCard from "@/components/ScholarshipCard";
import SearchFilter from "@/components/SearchFilter";
import data from "@/data/scholarships.json";
import {
  DEFAULT_FILTERS,
  filtersFromParams,
  filterScholarships,
} from "@/lib/filters.mjs";
function Catalog() {
  const params = useSearchParams();
  const filters = useMemo(() => filtersFromParams(params), [params]);
  const filtered = useMemo(() => filterScholarships(data, filters), [filters]);
  function update(next) {
    const query = new URLSearchParams();
    if (next.query) query.set("q", next.query);
    for (const key of ["country", "degree", "funding"])
      if (next[key]) query.set(key, next[key]);
    if (next.ielts !== "any") query.set("ielts", next.ielts);
    window.history.replaceState(
      null,
      "",
      `/scholarships${query.size ? `?${query}` : ""}`,
    );
  }
  return (
    <>
      <SearchFilter
        filters={filters}
        onFilter={update}
        total={filtered.length}
        onReset={() => update(DEFAULT_FILTERS)}
      />
      {filtered.length ? (
        <div className="premium-card-grid">
          {filtered.map((s) => (
            <ScholarshipCard key={s.id} scholarship={s} />
          ))}
        </div>
      ) : (
        <div className="empty-state">
          <Search size={30} />
          <h2>A different path may be waiting.</h2>
          <p>No scholarships match these filters. Try a broader search.</p>
          <button
            className="premium-button"
            onClick={() => update(DEFAULT_FILTERS)}
          >
            Clear filters
          </button>
        </div>
      )}
      <p className="source-note">
        Funding and language requirements vary by programme. Confirm the current
        cycle and full eligibility on the official provider’s website.
      </p>
    </>
  );
}
export default function ScholarshipsPage() {
  return (
    <div className="premium-container catalog-section">
      <div className="catalog-heading">
        <p className="eyebrow">A world of possibility</p>
        <h1>Find your next chapter.</h1>
        <p>
          Explore {data.length} scholarships for Pakistani students. Start with
          your ambitions, narrow your options, and find the details that matter.
        </p>
      </div>
      <Suspense fallback={<p role="status">Loading scholarships…</p>}>
        <Catalog />
      </Suspense>
    </div>
  );
}
