'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Clock,
  Users,
  ShieldCheck,
  Check,
  ArrowRight,
  Sparkles,
} from 'lucide-react';
import { CONFIG } from '@/lib/config';
import { formatCurrency } from '@/lib/utils';

export default function StickyBookingCard() {
  const [selectedSlot, setSelectedSlot] = useState('10:00 AM');

  const slotOptions = [
    { time: '10:00 AM', status: 'available' },
    { time: '01:30 PM', status: 'booked' },
    { time: '04:00 PM', status: 'available' },
  ];

  return (
    <aside
      aria-label="Studio booking summary and slot preview"
      className="w-full bg-ivory rounded-3xl border border-sand shadow-lg p-6 sm:p-7 text-charcoal space-y-5"
    >
      {/* Top Title & Pricing — sentence case and standardized pill style */}
      <div className="pb-4 border-b border-sand">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-sand/30 border border-sand text-espresso text-xs font-medium mb-3">
          <Sparkles className="w-3.5 h-3.5 text-sage" />
          <span>Direct reservation</span>
        </div>
        <h3 className="font-serif text-xl font-bold text-charcoal">
          Reserve your hours
        </h3>
        <p className="text-xs text-umber mt-0.5">
          Private single-unit studio in Kalwa, Thane
        </p>

        <div className="mt-4 flex items-baseline gap-1.5">
          <span className="font-serif text-2xl sm:text-3xl font-bold text-charcoal">
            From {formatCurrency(CONFIG.RATE_PER_HOUR_INR)}
          </span>
          <span className="text-xs text-umber font-medium">/ hour</span>
        </div>
      </div>

      {/* Interactive Slot States Preview */}
      <div className="space-y-2.5">
        <div className="flex items-center justify-between text-xs">
          <span className="font-medium text-charcoal">Upcoming start times</span>
          <span className="inline-flex items-center gap-1.5 text-xs text-umber">
            <span className="w-2 h-2 rounded-full bg-sage shrink-0" aria-hidden="true" />
            <span>Available</span>
          </span>
        </div>

        <div className="grid grid-cols-3 gap-2">
          {slotOptions.map((slot) => {
            const isSelected = selectedSlot === slot.time && slot.status === 'available';
            const isBooked = slot.status === 'booked';

            if (isBooked) {
              return (
                <button
                  key={slot.time}
                  type="button"
                  disabled
                  className="py-2 px-1 rounded-xl text-xs font-medium text-stone bg-stone/15 border border-stone/30 cursor-not-allowed text-center transition-colors focus:outline-none"
                  aria-label={`${slot.time} is booked and unavailable`}
                >
                  <span className="block">{slot.time}</span>
                  <span className="text-[10px] block opacity-80">Booked</span>
                </button>
              );
            }

            return (
              <button
                key={slot.time}
                type="button"
                onClick={() => setSelectedSlot(slot.time)}
                className={`py-2 px-1 rounded-xl text-xs font-medium transition-all text-center focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-sage-deep ${
                  isSelected
                    ? 'bg-espresso text-ivory border border-espresso shadow-xs'
                    : 'bg-cream text-charcoal border border-sand hover:border-sage'
                }`}
                aria-pressed={isSelected}
                aria-label={`${slot.time} is available`}
              >
                <span className="block">{slot.time}</span>
                <span className="inline-flex items-center gap-1 text-[10px] mt-0.5">
                  <span className={`w-1.5 h-1.5 rounded-full ${isSelected ? 'bg-ivory' : 'bg-sage'}`} />
                  {isSelected ? 'Selected' : 'Available'}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Verified Booking Terms List — each fact in one place, zero brackets */}
      <ul className="space-y-3 text-xs text-charcoal leading-relaxed pt-2 border-t border-sand/70">
        <li className="flex items-start gap-2.5">
          <Clock className="w-4 h-4 text-sage shrink-0 mt-0.5" />
          <span className="text-umber">Flexible duration: 1 to 12 hours operating 08:00 to 23:00</span>
        </li>
        <li className="flex items-start gap-2.5">
          <Users className="w-4 h-4 text-sage shrink-0 mt-0.5" />
          <span className="text-charcoal font-medium">Up to 2 guests.</span>
        </li>
        <li className="flex items-start gap-2.5">
          <Sparkles className="w-4 h-4 text-sage shrink-0 mt-0.5" />
          <span className="text-umber">30-minute cleaning buffer included before each stay</span>
        </li>
        <li className="flex items-start gap-2.5">
          <ShieldCheck className="w-4 h-4 text-sage shrink-0 mt-0.5" />
          <span className="text-umber">Single-unit private access with zero shared spaces</span>
        </li>
        <li className="flex items-start gap-2.5">
          <Check className="w-4 h-4 text-sage shrink-0 mt-0.5 stroke-[2.5]" />
          <span className="text-umber">Instant slot confirmation once payment is complete</span>
        </li>
      </ul>

      {/* Action Button */}
      <div className="pt-2">
        <Link
          href={`/book?startTime=${encodeURIComponent(selectedSlot)}`}
          className="w-full py-3.5 px-6 rounded-full bg-espresso text-ivory font-semibold text-sm hover:bg-espresso-dark active:scale-[0.98] transition-all shadow-md flex items-center justify-center gap-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-sage-deep"
        >
          <span>See available times</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>

      {/* Trust microcopy */}
      <div className="pt-3 border-t border-sand/70 text-[11px] text-umber space-y-1 text-center">
        <p>Valid government photo ID required before booking</p>
        <p>10-minute slot hold while you complete checkout</p>
      </div>
    </aside>
  );
}
