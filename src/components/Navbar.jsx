"use client";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  BookOpen,
  Menu,
  X,
  ArrowRight,
  Search,
  Bookmark,
  Compass,
} from "lucide-react";
import { useShortlist } from "./ShortlistProvider";
export default function Navbar() {
  const [open, setOpen] = useState(false);
  const path = usePathname();
  const { saved } = useShortlist();
  const trigger = useRef(null);
  useEffect(() => {
    setOpen(false);
  }, [path]);
  const links = [
    { href: "/scholarships", label: "Scholarships" },
    { href: "/countries", label: "Countries" },
    {
      href: "/shortlist",
      label: `My shortlist${saved.length ? ` (${saved.length})` : ""}`,
    },
  ];
  return (
    <>
      <a href="#main-content" className="skip-link">
        Skip to content
      </a>
      <header
        className="premium-header"
        onKeyDown={(e) => {
          if (e.key === "Escape") {
            setOpen(false);
            trigger.current?.focus();
          }
        }}
      >
        <div className="premium-container header-inner">
          <Link href="/" className="wordmark" aria-label="ScholarPak home">
            <BookOpen strokeWidth={1.5} />
            ScholarPak
          </Link>
          <nav className="desktop-nav" aria-label="Main navigation">
            {links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                aria-current={path.startsWith(l.href) ? "page" : undefined}
              >
                {l.label}
              </Link>
            ))}
          </nav>
          <Link href="/recommend" className="premium-button header-cta">
            Find my scholarships <ArrowRight size={17} />
          </Link>
          <button
            ref={trigger}
            className="icon-button menu-toggle"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => setOpen(!open)}
          >
            {open ? <X /> : <Menu />}
          </button>
        </div>
        {open && (
          <nav
            id="mobile-menu"
            className="mobile-menu"
            aria-label="Mobile navigation"
          >
            {[
              ...links,
              { href: "/free-tuition", label: "Tuition guides" },
              { href: "/alerts", label: "Scholarship alerts" },
              { href: "/recommend", label: "Find my scholarships" },
            ].map((l) => (
              <Link onClick={() => setOpen(false)} key={l.href} href={l.href}>
                {l.label}
                <ArrowRight size={16} />
              </Link>
            ))}
          </nav>
        )}
      </header>
      <nav className="mobile-bottom-nav" aria-label="Quick navigation">
        {[
          { href: "/scholarships", label: "Discover", icon: Search },
          { href: "/shortlist", label: "Saved", icon: Bookmark },
          { href: "/recommend", label: "Find my fit", icon: Compass },
        ].map(({ href, label, icon: Icon }) => (
          <Link
            key={href}
            href={href}
            aria-current={path.startsWith(href) ? "page" : undefined}
          >
            <Icon size={21} />
            <span>{label}</span>
          </Link>
        ))}
      </nav>
    </>
  );
}
