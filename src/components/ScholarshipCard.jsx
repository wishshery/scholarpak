"use client";
import Link from "next/link";
import {
  ArrowRight,
  Bookmark,
  GraduationCap,
  CalendarDays,
  Landmark,
} from "lucide-react";
import { useShortlist } from "./ShortlistProvider";
export default function ScholarshipCard({ scholarship: s, compact = false }) {
  const { saved, toggle, ready } = useShortlist();
  const selected = saved.includes(s.id);
  return (
    <article className="scholarship-card">
      <div className="scholarship-card-top">
        <span className="programme-mark">
          <Landmark size={26} strokeWidth={1.3} />
        </span>
        <button
          className="icon-button save-button"
          disabled={!ready}
          aria-label={`${selected ? "Remove" : "Save"} ${s.name}${selected ? " from shortlist" : " to shortlist"}`}
          aria-pressed={selected}
          onClick={() => toggle(s.id)}
        >
          <Bookmark size={20} fill={selected ? "currentColor" : "none"} />
        </button>
      </div>
      <p className="card-country">{s.country}</p>
      <h3>
        <Link href={`/scholarships/${s.slug}`}>{s.name}</Link>
      </h3>
      {!compact && <p className="card-provider">{s.university}</p>}
      <span
        className={`funding-pill ${s.funding_type?.toLowerCase().includes("fully") ? "" : "partial"}`}
      >
        {s.funding_type || "See funding details"}
      </span>
      <div className="card-meta">
        <p>
          <GraduationCap size={17} />
          {s.degree?.join(" · ")}
        </p>
        <p>
          <CalendarDays size={17} />
          Check current application dates
        </p>
      </div>
      <Link href={`/scholarships/${s.slug}`} className="card-link">
        View requirements <ArrowRight size={17} />
      </Link>
    </article>
  );
}
