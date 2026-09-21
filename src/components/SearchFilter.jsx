"use client";
import { useState } from "react";
import { Search, SlidersHorizontal } from "lucide-react";
import data from "@/data/scholarships.json";
const countries = [...new Set(data.map((s) => s.country))].sort();
export default function SearchFilter({ filters, onFilter, total, onReset }) {
  const [expanded, setExpanded] = useState(false);
  const update = (key, value) => onFilter({ ...filters, [key]: value });
  const active = [
    filters.country,
    filters.degree,
    filters.funding,
    filters.ielts !== "any",
  ].filter(Boolean).length;
  return (
    <div className="premium-filters">
      <div className="search-row">
        <div className="search-input">
          <Search size={18} />
          <input
            type="search"
            aria-label="Search scholarships"
            placeholder="Search scholarships, countries…"
            value={filters.query}
            onChange={(e) => update("query", e.target.value)}
          />
        </div>
        <button
          className="filter-toggle"
          aria-expanded={expanded}
          aria-controls="scholarship-filters"
          onClick={() => setExpanded(!expanded)}
        >
          <SlidersHorizontal size={17} />
          Filters {active || ""}
        </button>
      </div>
      <div
        id="scholarship-filters"
        className={`filter-fields ${expanded ? "expanded" : ""}`}
      >
        <label>
          Destination
          <select
            value={filters.country}
            onChange={(e) => update("country", e.target.value)}
          >
            <option value="">Any country</option>
            {countries.map((c) => (
              <option key={c}>{c}</option>
            ))}
          </select>
        </label>
        <label>
          Degree level
          <select
            value={filters.degree.toLowerCase()}
            onChange={(e) => update("degree", e.target.value)}
          >
            <option value="">Any degree</option>
            <option value="bachelors">Bachelor’s</option>
            <option value="masters">Master’s</option>
            <option value="phd">PhD</option>
          </select>
        </label>
        <label>
          Funding
          <select
            value={filters.funding}
            onChange={(e) => update("funding", e.target.value)}
          >
            <option value="">Any funding</option>
            <option value="fully-funded">Fully funded</option>
            <option value="partial">Partial funding</option>
          </select>
        </label>
        <label>
          IELTS listing
          <select
            value={filters.ielts}
            onChange={(e) => update("ielts", e.target.value)}
          >
            <option value="any">Any requirement</option>
            <option value="no">Listed without IELTS</option>
            <option value="yes">Listed with IELTS</option>
          </select>
        </label>
      </div>
      <div className="filter-summary">
        <p role="status">
          {total} {total === 1 ? "scholarship" : "scholarships"}
          {active
            ? ` · ${active} active ${active === 1 ? "filter" : "filters"}`
            : ""}
        </p>
        {(active > 0 || filters.query) && (
          <button onClick={onReset}>Clear all</button>
        )}
      </div>
    </div>
  );
}
