import Link from "next/link";
import Image from "next/image";
import { ArrowRight, BookOpen, Compass, Bookmark } from "lucide-react";
import scholarships from "@/data/scholarships.json";
import ScholarshipCard from "@/components/ScholarshipCard";
const countries = [...new Set(scholarships.map((s) => s.country))].sort();
const featured = ["chevening", "daad", "erasmus"]
  .map((term) => scholarships.find((s) => s.name.toLowerCase().includes(term)))
  .filter(Boolean);
export default function HomePage() {
  return (
    <div className="premium-home">
      <section className="premium-container hero" aria-labelledby="hero-title">
        <div className="hero-copy">
          <p className="eyebrow">Scholarships for Pakistani students</p>
          <h1 id="hero-title">
            <span className="desktop-hero-title">
              Your ambition deserves a <em>bigger world.</em>
            </span>
            <span className="mobile-hero-title">
              A <em>bigger world</em> awaits.
            </span>
          </h1>
          <p className="hero-description">
            Discover funding. Understand the requirements. Take your next step
            with confidence.
          </p>
          <div className="hero-signature">
            <span />
            Brighter minds.
            <br />A brighter Pakistan.
          </div>
        </div>
        <div className="hero-art">
          <Image
            src="/images/campus.webp"
            alt="Sunlight falling through a university cloister into a green courtyard"
            fill
            priority
            sizes="(max-width: 700px) 100vw, 50vw"
          />
          <div className="image-caption">Knowledge has no borders.</div>
        </div>
        <form
          className="hero-search"
          action="/scholarships"
          method="get"
          aria-label="Find scholarships"
        >
          <label>
            Degree level
            <select name="degree" defaultValue="">
              <option value="">Any degree level</option>
              <option value="Bachelors">Bachelor’s</option>
              <option value="Masters">Master’s</option>
              <option value="PhD">PhD</option>
            </select>
          </label>
          <label>
            Destination
            <select name="country" defaultValue="">
              <option value="">Any country</option>
              {countries.map((c) => (
                <option key={c}>{c}</option>
              ))}
            </select>
          </label>
          <label className="hero-funding">
            Funding
            <select name="funding" defaultValue="">
              <option value="">Any funding type</option>
              <option value="fully-funded">Fully funded</option>
              <option value="partial">Partial funding</option>
            </select>
          </label>
          <button className="premium-button" type="submit">
            Find scholarships <ArrowRight size={18} />
          </button>
        </form>
      </section>
      <section className="premium-container explore-section">
        <div className="section-heading">
          <div>
            <p className="eyebrow">A world of possibility</p>
            <h2>Explore your next chapter</h2>
            <p>Compare opportunities and check the official requirements.</p>
          </div>
          <Link href="/scholarships" className="text-link">
            Browse all {scholarships.length} <ArrowRight size={18} />
          </Link>
        </div>
        <div className="premium-card-grid">
          {featured.map((s) => (
            <ScholarshipCard key={s.id} scholarship={s} />
          ))}
        </div>
        <p className="source-note">
          Application cycles and eligibility can change. Always confirm details
          with the scholarship provider.
        </p>
      </section>
      <section className="journey-section">
        <div className="premium-container journey-grid">
          <div>
            <p className="eyebrow">From possibility to a plan</p>
            <h2>
              A little clarity.
              <br />
              <em>A meaningful next step.</em>
            </h2>
            <Link href="/recommend" className="premium-button">
              Find scholarships for me <ArrowRight size={18} />
            </Link>
          </div>
          <div className="journey-steps">
            {[
              {
                icon: Compass,
                title: "Discover your options",
                text: "Explore funding by destination and degree, or answer a few questions to narrow your search.",
              },
              {
                icon: Bookmark,
                title: "Keep a thoughtful shortlist",
                text: "Save opportunities on this device and come back when you are ready to compare.",
              },
              {
                icon: BookOpen,
                title: "Prepare with confidence",
                text: "Review eligibility, documents and current deadlines on the official provider’s website.",
              },
            ].map(({ icon: Icon, title, text }, i) => (
              <div key={title}>
                <span className="step-number">0{i + 1}</span>
                <Icon size={23} strokeWidth={1.4} />
                <div>
                  <h3>{title}</h3>
                  <p>{text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="premium-container destinations-section">
        <div className="section-heading">
          <div>
            <p className="eyebrow">Where will you go?</p>
            <h2>Find your place in the world</h2>
          </div>
          <Link href="/countries" className="text-link">
            All country guides <ArrowRight size={18} />
          </Link>
        </div>
        <div className="destination-grid">
          {["Germany", "United Kingdom", "United States", "Australia"].map(
            (c, i) => (
              <Link
                key={c}
                href={`/countries/${c.toLowerCase().replaceAll(" ", "-")}`}
              >
                <span className="eyebrow">0{i + 1} / Study abroad</span>
                <h3>{c}</h3>
                <span>
                  {scholarships.filter((s) => s.country === c).length}{" "}
                  scholarships listed <ArrowRight size={17} />
                </span>
              </Link>
            ),
          )}
        </div>
      </section>
    </div>
  );
}
