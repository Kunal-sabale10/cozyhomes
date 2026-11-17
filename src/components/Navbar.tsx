'use client';

import React, { useState, Suspense } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, ArrowRight } from 'lucide-react';

const navLinks = [
  { href: '/home', label: 'Home' },
  { href: '/studio', label: 'The Studio' },
  { href: '/house-rules', label: 'House Rules' },
  { href: '/cancellation-policy', label: 'Cancellation' },
  { href: '/contact', label: 'Contact' },
];

function DesktopNavLinks() {
  const pathname = usePathname();

  return (
    <nav className="hidden md:flex items-center md:gap-5 lg:gap-8" aria-label="Main navigation">
      {navLinks.map((link) => {
        const isActive = pathname === link.href || (link.href !== '/' && pathname.startsWith(link.href));
        return (
          <Link
            key={link.href}
            href={link.href}
            className={`text-sm font-medium transition-colors relative py-1 focus:outline-none focus-visible:ring-2 focus-visible:ring-sage-deep focus-visible:ring-offset-2 rounded-xs ${
              isActive
                ? 'text-charcoal font-semibold after:content-[""] after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[2px] after:bg-sage'
                : 'text-umber hover:text-charcoal'
            }`}
            aria-current={isActive ? 'page' : undefined}
          >
            {link.label}
          </Link>
        );
      })}
    </nav>
  );
}

function DesktopNavFallback() {
  return (
    <nav className="hidden md:flex items-center md:gap-5 lg:gap-8 opacity-0" aria-hidden="true">
      {navLinks.map((link) => (
        <Link
          key={link.href}
          href={link.href}
          className="text-sm font-medium transition-colors relative py-1 text-umber hover:text-charcoal focus:outline-none focus-visible:ring-2 focus-visible:ring-sage-deep focus-visible:ring-offset-2 rounded-xs"
        >
          {link.label}
        </Link>
      ))}
    </nav>
  );
}

function MobileNavLinks({ onClose }: { onClose: () => void }) {
  const pathname = usePathname();

  return (
    <nav className="flex flex-col space-y-3" aria-label="Mobile navigation">
      {navLinks.map((link) => {
        const isActive = pathname === link.href || (link.href !== '/' && pathname.startsWith(link.href));
        return (
          <Link
            key={link.href}
            href={link.href}
            onClick={onClose}
            className={`text-base font-medium py-1.5 transition-colors inline-block relative focus:outline-none focus-visible:ring-2 focus-visible:ring-sage-deep rounded-xs ${
              isActive
                ? 'text-charcoal font-semibold border-b-2 border-sage pb-0.5'
                : 'text-umber hover:text-charcoal'
            }`}
            aria-current={isActive ? 'page' : undefined}
          >
            {link.label}
          </Link>
        );
      })}
    </nav>
  );
}

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full bg-ivory/95 backdrop-blur-md border-b border-sand/60 transition-colors">
      <div className="max-w-[1200px] mx-auto px-6 h-20 flex items-center justify-between">
        {/* Brand Logo Wordmark */}
        <Link
          href="/"
          className="flex items-center gap-3 group focus:outline-none focus-visible:ring-2 focus-visible:ring-sage-deep rounded-lg py-1"
          aria-label="CozyMoments Home"
        >
          <span className="font-serif text-2xl sm:text-2xl font-bold tracking-tight text-espresso group-hover:text-espresso-dark transition-colors">
            CozyMoments
          </span>
          <span className="hidden lg:inline-block text-[11px] font-medium tracking-widest uppercase text-charcoal-muted border-l border-sand pl-3">
            Kalwa · Thane
          </span>
        </Link>

        {/* Desktop Navigation Links with Suspense Boundary for Instant Route Derivation */}
        <Suspense fallback={<DesktopNavFallback />}>
          <DesktopNavLinks />
        </Suspense>

        {/* Desktop Single "Book" CTA Button */}
        <div className="hidden md:flex items-center">
          <Link
            href="/book"
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-espresso text-ivory text-sm font-semibold hover:bg-espresso-dark active:scale-95 transition-all shadow-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-sage-deep"
          >
            <span>Book</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          type="button"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-expanded={mobileMenuOpen}
          aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
          className="md:hidden p-2 rounded-lg text-charcoal hover:bg-sand/30 focus:outline-none focus-visible:ring-2 focus-visible:ring-sage-deep"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-sand/60 bg-ivory px-6 py-6 space-y-4 shadow-lg animate-in fade-in slide-in-from-top-2 duration-200">
          <Suspense fallback={<nav className="flex flex-col space-y-3" />}>
            <MobileNavLinks onClose={() => setMobileMenuOpen(false)} />
          </Suspense>

          <div className="pt-3 border-t border-sand/50 flex flex-col gap-3">
            <Link
              href="/book"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full flex items-center justify-center gap-2 py-3 rounded-full bg-espresso text-ivory font-semibold text-center hover:bg-espresso-dark transition-colors shadow-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-sage-deep"
            >
              <span>Book</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
