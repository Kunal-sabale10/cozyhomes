import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Home, Sparkles, Calendar, MessageSquare, ArrowLeft, KeyRound } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Page Not Found (404) | CozyMoments',
  description: 'The page you were looking for does not exist. Return to CozyMoments private studio in Kalwa, Thane.',
};

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col bg-[#F7F3EB]">
      <Navbar />

      <main className="max-w-4xl mx-auto px-4 sm:px-6 py-16 md:py-24 w-full flex-1 flex flex-col items-center justify-center text-center">
        {/* Decorative Badge & Icon */}
        <div className="relative mb-6">
          <div className="w-20 h-20 rounded-3xl bg-[#EFE9DC] text-[#5B3929] flex items-center justify-center mx-auto shadow-xs border border-[#5B3929]/30">
            <KeyRound className="w-10 h-10 -rotate-45" />
          </div>
          <span className="absolute -bottom-2 -right-2 px-2.5 py-0.5 rounded-full bg-[#5B3929] text-[#FCFAF6] text-[11px] font-bold font-mono tracking-wider shadow-xs">
            404
          </span>
        </div>

        {/* Heading & Subtitle */}
        <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#2B1D16] tracking-tight mb-4 max-w-xl">
          Oops! This page seems to have checked out.
        </h1>
        <p className="text-base sm:text-lg text-[#6E5549] max-w-lg mx-auto mb-10 leading-relaxed font-light">
          The door you&rsquo;re trying to unlock doesn&rsquo;t seem to exist or may have been relocated. Let&rsquo;s guide you back to your peaceful sanctuary.
        </p>

        {/* Primary CTA Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-4 mb-14">
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#5B3929] hover:bg-[#42281D] active:scale-95 text-[#FCFAF6] text-sm font-semibold transition-all shadow-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#5B3929]"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Return to Home</span>
          </Link>
          <Link
            href="/book"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#FCFAF6] hover:bg-[#D8C3A5] border border-[#D8C3A5] text-[#2B1D16] text-sm font-semibold transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#5B3929]"
          >
            <Calendar className="w-4 h-4 text-[#5B3929]" />
            <span>Book Studio Time</span>
          </Link>
        </div>

        {/* Helpful Alternative Destinations Grid */}
        <div className="w-full max-w-2xl text-left">
          <h2 className="font-serif text-base font-bold text-[#2B1D16] mb-4 text-center">
            Or explore these destinations:
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <Link
              href="/"
              className="p-4 rounded-xl bg-[#FCFAF6] border border-[#D8C3A5] hover:border-[#5B3929] transition-colors group block"
            >
              <div className="flex items-center gap-2 text-sm font-serif font-bold text-[#2B1D16] group-hover:text-[#5B3929] transition-colors mb-1">
                <Home className="w-4 h-4 text-[#5B3929]" />
                <span>Home Page</span>
              </div>
              <p className="text-xs text-[#6E5549]">
                Discover our Kalwa private studio retreat.
              </p>
            </Link>

            <Link
              href="/studio"
              className="p-4 rounded-xl bg-[#FCFAF6] border border-[#D8C3A5] hover:border-[#5B3929] transition-colors group block"
            >
              <div className="flex items-center gap-2 text-sm font-serif font-bold text-[#2B1D16] group-hover:text-[#5B3929] transition-colors mb-1">
                <Sparkles className="w-4 h-4 text-[#5B3929]" />
                <span>The Studio</span>
              </div>
              <p className="text-xs text-[#6E5549]">
                Amenities, photos, ambiance, and comfort.
              </p>
            </Link>

            <Link
              href="/contact"
              className="p-4 rounded-xl bg-[#FCFAF6] border border-[#D8C3A5] hover:border-[#5B3929] transition-colors group block"
            >
              <div className="flex items-center gap-2 text-sm font-serif font-bold text-[#2B1D16] group-hover:text-[#5B3929] transition-colors mb-1">
                <MessageSquare className="w-4 h-4 text-[#5B3929]" />
                <span>Contact Desk</span>
              </div>
              <p className="text-xs text-[#6E5549]">
                Reach our team via WhatsApp or email.
              </p>
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
