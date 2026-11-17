'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { CONFIG } from '@/lib/config';
import { formatCurrency } from '@/lib/utils';

export default function MobileBookingBar() {
  return (
    <div
      role="region"
      aria-label="Mobile booking action bar"
      className="fixed bottom-0 inset-x-0 z-40 lg:hidden bg-ivory/95 backdrop-blur-md border-t border-sand/80 px-4 py-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] shadow-[0_-4px_20px_rgba(0,0,0,0.08)]"
    >
      <div className="max-w-md mx-auto flex items-center justify-between gap-4">
        {/* Left: Price and guest capacity */}
        <div>
          <span className="font-serif font-bold text-base sm:text-lg text-charcoal block leading-tight">
            From {formatCurrency(CONFIG.RATE_PER_HOUR_INR)}/hour
          </span>
          <span className="text-[11px] text-umber block mt-0.5">
            Up to 2 guests · Kalwa, Thane
          </span>
        </div>

        {/* Right: Book CTA button */}
        <Link
          href="/book"
          className="inline-flex items-center justify-center gap-1.5 px-7 py-2.5 rounded-full bg-espresso text-ivory text-sm font-semibold hover:bg-espresso-dark active:scale-95 transition-all shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-sage-deep shrink-0"
        >
          <span>Book</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>
    </div>
  );
}
