"use client";
import Link from "next/link";
import { Bookmark, ArrowRight } from "lucide-react";
import { useShortlist } from "@/components/ShortlistProvider";
import ScholarshipCard from "@/components/ScholarshipCard";
import scholarships from "@/data/scholarships.json";
export default function ShortlistPage() {
  const { saved, ready } = useShortlist();
  const items = scholarships.filter((s) => saved.includes(s.id));
  return (
    <div className="premium-container catalog-section">
      <div className="catalog-heading">
        <p className="eyebrow">Your possibilities, together</p>
        <h1>My shortlist</h1>
        <p>
          Keep the opportunities that speak to your ambitions. Your shortlist is
          saved in this browser on this device; no account is needed.
        </p>
      </div>
      {!ready ? (
        <p role="status">Loading your shortlist…</p>
      ) : items.length ? (
        <>
          <p
            className="source-note"
            style={{ margin: "0 0 20px" }}
            role="status"
          >
            {items.length} saved{" "}
            {items.length === 1 ? "opportunity" : "opportunities"}
          </p>
          <div className="premium-card-grid">
            {items.map((s) => (
              <ScholarshipCard key={s.id} scholarship={s} />
            ))}
          </div>
        </>
      ) : (
        <div className="empty-state">
          <Bookmark size={32} />
          <h2>Your next chapter starts with a possibility.</h2>
          <p>Tap the bookmark on a scholarship to keep it here.</p>
          <Link href="/scholarships" className="premium-button">
            Explore scholarships <ArrowRight size={18} />
          </Link>
        </div>
      )}
    </div>
  );
}
