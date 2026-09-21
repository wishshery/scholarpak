import Link from "next/link";
import { BookOpen, ArrowUpRight } from "lucide-react";
export default function Footer() {
  return (
    <footer className="premium-footer">
      <div className="premium-container">
        <div className="footer-grid">
          <div>
            <Link href="/" className="wordmark">
              <BookOpen strokeWidth={1.5} />
              ScholarPak
            </Link>
            <p>
              Brighter minds. A brighter Pakistan.
              <br />
              Find the funding to take your next step.
            </p>
          </div>
          <div>
            <h2>Explore</h2>
            <Link href="/scholarships">Scholarships</Link>
            <Link href="/countries">Country guides</Link>
            <Link href="/free-tuition">Tuition guides</Link>
          </div>
          <div>
            <h2>Your next step</h2>
            <Link href="/shortlist">My shortlist</Link>
            <Link href="/recommend">Find my scholarships</Link>
            <Link href="/alerts">
              Scholarship alerts <ArrowUpRight size={14} />
            </Link>
          </div>
          <div>
            <h2>ScholarPak</h2>
            <Link href="/about">About us</Link>
            <Link href="/contact">Contact</Link>
            <Link href="/privacy">Privacy</Link>
          </div>
        </div>
        <div className="footer-bottom">
          <p>© {new Date().getFullYear()} ScholarPak</p>
          <p>
            Confirm dates and eligibility with the official provider before
            applying.
          </p>
          <span>Made for possibility.</span>
        </div>
      </div>
    </footer>
  );
}
