'use client';

import React from 'react';
import Link from 'next/link';
import { PRICING_TIERS } from '@/lib/mock-data';
import { CONFIG } from '@/lib/config';
import { calculatePrice, formatCurrency } from '@/lib/utils';
import { Sparkles, ArrowRight, ShieldCheck, Clock, Check } from 'lucide-react';

export default function PricingTable() {
  return (
    <section aria-label="Hourly pricing table" className="w-full">
      <div className="bg-ivory border border-sand rounded-3xl p-6 sm:p-8 md:p-10 shadow-xs">
        {/* Header — sentence case and standardized pill style */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8 pb-6 border-b border-sand">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-sand/30 border border-sand text-espresso text-xs font-medium mb-3">
              <Sparkles className="w-3.5 h-3.5 text-sage" />
              <span>Transparent hourly booking</span>
            </div>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-charcoal leading-snug">
              Simple, honest pricing
            </h2>
            <p className="text-sm sm:text-base text-umber mt-1.5 max-w-xl">
              Pay only for the time you need. Starting from {formatCurrency(CONFIG.RATE_PER_HOUR_INR)} per hour with full private studio access.
            </p>
          </div>

          <div className="flex items-center gap-2 text-xs text-umber self-start md:self-auto bg-cream px-3.5 py-2 rounded-xl border border-sand">
            <Clock className="w-4 h-4 text-sage shrink-0" />
            <span>Minimum {CONFIG.MIN_HOURS} hr · Up to {CONFIG.MAX_HOURS} hrs</span>
          </div>
        </div>

        {/* Responsive Table Container — full content width on desktop */}
        <div className="overflow-x-auto -mx-2 sm:mx-0">
          <table className="w-full min-w-[540px] border-collapse text-left">
            <thead>
              <tr className="border-b border-sand text-xs font-medium text-umber">
                <th scope="col" className="py-3 px-4">
                  Duration
                </th>
                <th scope="col" className="py-3 px-4">
                  Price
                </th>
                <th scope="col" className="py-3 px-4">
                  Details
                </th>
                <th scope="col" className="py-3 px-4 text-right">
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-sand/60">
              {PRICING_TIERS.map((tier) => {
                const price = calculatePrice(tier.hours);
                const isPopular = tier.popular || tier.hours === 3;

                return (
                  <tr
                    key={tier.hours}
                    className={`transition-colors duration-150 ${
                      isPopular
                        ? 'bg-sand/20 hover:bg-sand/30 font-medium'
                        : 'hover:bg-cream/60'
                    }`}
                  >
                    {/* Duration Column: Most popular badge placed ABOVE the duration label so all rows stay aligned */}
                    <td className="py-3.5 px-4 align-middle">
                      <div className="flex flex-col items-start min-h-[46px] justify-center">
                        {isPopular ? (
                          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-sand/40 border border-sand text-espresso text-[11px] font-semibold tracking-wide mb-1">
                            <Sparkles className="w-2.5 h-2.5 text-sage" />
                            <span>Most popular</span>
                          </span>
                        ) : (
                          <span className="h-[20px] mb-1 block" aria-hidden="true" />
                        )}
                        <span className="font-serif font-bold text-base text-charcoal">
                          {tier.hours} {tier.hours === 1 ? 'hour' : 'hours'}
                        </span>
                      </div>
                    </td>

                    {/* Price Column */}
                    <td className="py-3.5 px-4 align-middle">
                      <div>
                        <span className="font-serif text-lg font-bold text-charcoal">
                          {formatCurrency(price.total)}
                        </span>
                        <span className="text-xs text-umber ml-1.5">
                          ({formatCurrency(CONFIG.RATE_PER_HOUR_INR)}/hr)
                        </span>
                      </div>
                    </td>

                    {/* Details Column: One guest rule everywhere: 'Up to 2 guests.' */}
                    <td className="py-3.5 px-4 align-middle text-xs text-umber">
                      <div className="flex items-center gap-1.5">
                        <Check className="w-3.5 h-3.5 text-sage shrink-0 stroke-[2.5]" />
                        <span>Up to 2 guests · All amenities included</span>
                      </div>
                    </td>

                    {/* Action Column */}
                    <td className="py-3.5 px-4 align-middle text-right">
                      <Link
                        href={`/book?duration=${tier.hours}`}
                        className={`inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-full text-xs font-semibold transition-all duration-200 shadow-xs focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-1 focus-visible:ring-sage-deep ${
                          isPopular
                            ? 'bg-espresso text-ivory hover:bg-espresso-dark shadow-sm'
                            : 'bg-cream hover:bg-sand/30 text-charcoal border border-sand'
                        }`}
                        aria-label={`Book studio for ${tier.hours} ${tier.hours === 1 ? 'hour' : 'hours'} at ${formatCurrency(price.total)}`}
                      >
                        <span>Book</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </Link>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Footer Notes & Transparency: Confirmed claims only, no unconfirmed claims */}
        <div className="mt-8 pt-6 border-t border-sand flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs text-umber">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-sage shrink-0" />
            {CONFIG.TAX_PERCENT > 0 ? (
              <span>All displayed prices are subject to {CONFIG.TAX_PERCENT}% GST at checkout.</span>
            ) : (
              <span>All-inclusive pricing. No hidden cleaning charges or booking fees.</span>
            )}
          </div>
          <span className="text-umber/90">
            30-minute cleaning buffer included before each visit.
          </span>
        </div>
      </div>
    </section>
  );
}
