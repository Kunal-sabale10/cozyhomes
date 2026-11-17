'use client';

import React from 'react';
import { Sparkles, ShieldCheck, Clock, CalendarDays, Users } from 'lucide-react';
import { CONFIG } from '@/lib/config';
import { calculatePrice, formatCurrency, formatTime, formatDateShort, cn } from '@/lib/utils';

interface PricePreviewProps {
  duration: number;
  ratePerHour?: number;
  taxPercent?: number;
  date?: string;
  startTime?: string;
  guests?: number;
  className?: string;
}

export default function PricePreview({
  duration,
  ratePerHour = CONFIG.RATE_PER_HOUR_INR,
  taxPercent = CONFIG.TAX_PERCENT,
  date,
  startTime,
  guests,
  className,
}: PricePreviewProps) {
  const price = calculatePrice(duration, ratePerHour, taxPercent);

  return (
    <aside
      aria-label="Price Summary"
      className={cn(
        'w-full bg-cream rounded-2xl border border-beige/80 p-5 sm:p-6 shadow-sm lg:sticky lg:top-24 self-start transition-all',
        className
      )}
    >
      <div className="flex items-center justify-between pb-4 border-b border-charcoal/10">
        <div>
          <h3 className="font-serif text-lg sm:text-xl font-bold text-charcoal">
            Reservation Summary
          </h3>
          <p className="text-xs text-charcoal-light mt-0.5">
            Private Studio • Kalwa, Thane
          </p>
        </div>
        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-semibold bg-sage/15 text-sage-dark">
          <Sparkles className="w-3 h-3 text-sage" />
          Best Value
        </span>
      </div>

      {/* Optional booking details if passed */}
      {(date || startTime || guests) && (
        <div className="py-3.5 border-b border-charcoal/10 text-xs sm:text-sm text-charcoal-light space-y-2">
          {date && (
            <div className="flex items-center justify-between">
              <span className="flex items-center gap-1.5 text-charcoal">
                <CalendarDays className="w-3.5 h-3.5 text-sage" />
                Date
              </span>
              <span className="font-medium text-charcoal">{formatDateShort(date)}</span>
            </div>
          )}
          {startTime && (
            <div className="flex items-center justify-between">
              <span className="flex items-center gap-1.5 text-charcoal">
                <Clock className="w-3.5 h-3.5 text-sage" />
                Start Time
              </span>
              <span className="font-medium text-charcoal">{formatTime(startTime)}</span>
            </div>
          )}
          {guests && (
            <div className="flex items-center justify-between">
              <span className="flex items-center gap-1.5 text-charcoal">
                <Users className="w-3.5 h-3.5 text-sage" />
                Guests
              </span>
              <span className="font-medium text-charcoal">
                {guests} {guests === 1 ? 'Guest' : 'Guests'}
              </span>
            </div>
          )}
        </div>
      )}

      {/* Line items */}
      <div className="py-4 space-y-3 text-sm">
        <div className="flex items-center justify-between text-charcoal">
          <span>
            {duration} {duration === 1 ? 'hour' : 'hours'} × {formatCurrency(price.ratePerHour)}/hr
          </span>
          <span className="font-medium">{formatCurrency(price.subtotal)}</span>
        </div>

        <div className="flex items-center justify-between text-charcoal-light">
          <span>Taxes & Fees ({price.taxPercent}%)</span>
          <span className="font-medium">
            {price.taxAmount === 0 ? '₹0' : formatCurrency(price.taxAmount)}
          </span>
        </div>

        <div className="flex items-center justify-between text-charcoal-light text-xs">
          <span>Cleaning & Sanitation Fee</span>
          <span className="text-sage-dark font-medium">Included</span>
        </div>
      </div>

      {/* Total */}
      <div className="pt-4 border-t border-charcoal/15 flex items-baseline justify-between">
        <div>
          <span className="text-sm font-semibold text-charcoal">Total Amount</span>
          <p className="text-[11px] text-warm-gray">All inclusive • No hidden charges</p>
        </div>
        <div className="text-right">
          <span className="text-2xl sm:text-3xl font-serif font-bold text-sage-dark">
            {formatCurrency(price.total)}
          </span>
        </div>
      </div>

      {/* Trust reassurance */}
      <div className="mt-5 pt-4 border-t border-charcoal/10 flex items-start gap-2 text-xs text-charcoal-muted">
        <ShieldCheck className="w-4 h-4 text-sage shrink-0 mt-0.5" />
        <p className="leading-relaxed">
          100% private entrance with keyless keypad access. Complete discretion assured.
        </p>
      </div>
    </aside>
  );
}
