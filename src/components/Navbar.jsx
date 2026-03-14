'use client';
import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { Menu, X, ChevronDown, Bell } from 'lucide-react';

// Canva logo — Option 1 (Graduation Cap & Globe)
const LOGO_URL = 'https://design.canva.ai/W24ivmkajPRtJ3O';

const navLinks = [
  {
    label: 'Scholarships',
    href: '/scholarships',
    children: [
      { label: 'All Scholarships', href: '/scholarships' },
      { label: 'Fully Funded', href: '/scholarships?funding=fully-funded' },
      { label: 'No IELTS Required', href: '/scholarships?ielts=no' },
      { label: 'Bachelor Scholarships', href: '/scholarships?degree=bachelors' },
      { label: 'Masters Scholarships', href: '/scholarships?degree=masters' },
      { label: 'PhD Scholarships', href: '/scholarships?degree=phd' },
    ],
  },
  {
    label: 'By Country',
    href: '/countries',
    children: [
      { label: 'Germany', href: '/countries/germany' },
      { label: 'United Kingdom', href: '/countries/united-kingdom' },
      { label: 'United States', href: '/countries/united-states' },
      { label: 'Turkey', href: '/countries/turkey' },
      { label: 'China', href: '/countries/china' },
      { label: 'Australia', href: '/countries/australia' },
      { label: 'View All Countries →', href: '/countries' },
    ],
  },
  { label: 'Free Tuition', href: '/free-tuition' },
  { label: 'AI Recommender', href: '/recommend' },
  { label: 'Alerts', href: '/alerts' },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [dropdown, setDropdown] = useState(null);
  const [mobileExpanded, setMobileExpanded] = useState(null);
  const navRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (navRef.current && !navRef.current.contains(e.target)) {
        setDropdown(null);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('touchstart', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('touchstart', handleClickOutside);
    };
  }, []);

  // Close mobile menu on route change
  const handleLinkClick = () => {
    setOpen(false);
    setMobileExpanded(null);
    setDropdown(null);
  };

  const toggleMobileExpanded = (label) => {
    setMobileExpanded(mobileExpanded === label ? null : label);
  };

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-slate-100 shadow-sm" ref={navRef}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group" onClick={handleLinkClick}>
            <img
              src={LOGO_URL}
              alt="ScholarPak Logo"
              className="w-16 h-16 rounded-xl object-contain"
              onError={(e) => { e.target.style.display='none'; e.target.nextSibling.style.display='flex'; }}
            />
            <span className="font-extrabold text-2xl text-brand-900 font-heading tracking-tight" style={{display:'none'}}>
              Scholar<span className="text-gold-500">Pak</span>
            </span>
            <span className="font-extrabold text-2xl text-brand-900 font-heading tracking-tight">
              Scholar<span className="text-gold-500">Pak</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <div key={link.label} className="relative">
                {link.children ? (
                  <>
                    <button
                      className="flex items-center gap-1 px-4 py-2 text-slate-600 font-medium hover:text-brand-700 hover:bg-brand-50 rounded-lg transition-all text-sm"
                      onClick={() => setDropdown(dropdown === link.label ? null : link.label)}
                      onMouseEnter={() => setDropdown(link.label)}
                      onMouseLeave={() => setDropdown(null)}
                      aria-expanded={dropdown === link.label}
                    >
                      {link.label}
                      <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${dropdown === link.label ? 'rotate-180' : ''}`} />
                    </button>

                    {dropdown === link.label && (
                      <div
                        className="absolute top-full left-0 mt-1 w-56 bg-white border border-slate-100 rounded-2xl shadow-xl z-50"
                        onMouseEnter={() => setDropdown(link.label)}
                        onMouseLeave={() => setDropdown(null)}
                      >
                        <div className="p-2">
                          {link.children.map((child) => (
                            <Link
                              key={child.href}
                              href={child.href}
                              onClick={handleLinkClick}
                              className="block px-4 py-2.5 text-sm text-slate-600 hover:text-brand-700 hover:bg-brand-50 rounded-xl transition-colors"
                            >
                              {child.label}
                            </Link>
                          ))}
                        </div>
                      </div>
                    )}
                  </>
                ) : (
                  <Link
                    href={link.href}
                    onClick={handleLinkClick}
                    className="px-4 py-2 text-slate-600 font-medium hover:text-brand-700 hover:bg-brand-50 rounded-lg transition-all text-sm block"
                  >
                    {link.label}
                  </Link>
                )}
              </div>
            ))}
          </nav>

          {/* Desktop CTA */}
          <div className="hidden lg:flex items-center gap-3">
            <Link
              href="/alerts"
              className="flex items-center gap-2 text-sm font-semibold text-brand-700 hover:text-brand-900 transition-colors"
            >
              <Bell className="w-4 h-4" />
              Get Alerts
            </Link>
            <Link href="/recommend" className="btn-primary text-sm py-2.5 px-5">
              Find My Scholarship
            </Link>
          </div>

          {/* Mobile hamburger toggle */}
          <button
            onClick={() => setOpen(!open)}
            className="lg:hidden p-2 rounded-lg hover:bg-slate-100 active:bg-slate-200 transition-colors"
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
          >
            {open ? <X className="w-6 h-6 text-slate-700" /> : <Menu className="w-6 h-6 text-slate-700" />}
          </button>
        </div>
      </div>

      {/* Mobile menu — full accordion */}
      {open && (
        <div className="lg:hidden border-t border-slate-100 bg-white animate-fade-in max-h-[85vh] overflow-y-auto">
          <div className="px-4 py-3 space-y-1">
            {navLinks.map((link) => (
              <div key={link.label}>
                {link.children ? (
                  <>
                    <button
                      onClick={() => toggleMobileExpanded(link.label)}
                      className="w-full flex items-center justify-between px-4 py-3 text-slate-700 font-semibold hover:text-brand-700 hover:bg-brand-50 rounded-xl transition-colors"
                      aria-expanded={mobileExpanded === link.label}
                    >
                      <span>{link.label}</span>
                      <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform duration-200 ${mobileExpanded === link.label ? 'rotate-180' : ''}`} />
                    </button>
                    {mobileExpanded === link.label && (
                      <div className="ml-2 mt-1 mb-2 border-l-2 border-brand-100 pl-3 space-y-1 animate-fade-in">
                        {link.children.map((child) => (
                          <Link
                            key={child.href}
                            href={child.href}
                            onClick={handleLinkClick}
                            className="block px-4 py-2.5 text-sm text-slate-500 hover:text-brand-700 hover:bg-brand-50 rounded-lg transition-colors"
                          >
                            {child.label}
                          </Link>
                        ))}
                      </div>
                    )}
                  </>
                ) : (
                  <Link
                    href={link.href}
                    onClick={handleLinkClick}
                    className="block px-4 py-3 text-slate-700 font-semibold hover:text-brand-700 hover:bg-brand-50 rounded-xl transition-colors"
                  >
                    {link.label}
                  </Link>
                )}
              </div>
            ))}

            {/* Mobile CTA buttons */}
            <div className="pt-3 pb-2 border-t border-slate-100 space-y-2">
              <Link
                href="/alerts"
                onClick={handleLinkClick}
                className="flex items-center justify-center gap-2 w-full py-3 text-sm font-semibold text-brand-700 border border-brand-200 rounded-xl hover:bg-brand-50 transition-colors"
              >
                <Bell className="w-4 h-4" /> Get Scholarship Alerts
              </Link>
              <Link
                href="/recommend"
                onClick={handleLinkClick}
                className="btn-primary w-full justify-center text-sm"
              >
                Find My Scholarship
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
