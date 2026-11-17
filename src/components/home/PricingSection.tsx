'use client';

import React from 'react';
import Link from 'next/link';
import { motion, useReducedMotion } from 'framer-motion';
import { Check, ArrowRight, Sparkles, Clock } from 'lucide-react';
import { formatCurrency } from '@/lib/utils';
import { CONFIG } from '@/lib/config';

const pricingTiers = [
  {
    hours: 2,
    price: 600,
    tag: 'Quick Pause',
    popular: false,
    idealFor: 'Brief rest, quiet work call, or mid-day freshen up between transit.',
    features: [
      '2 hours exclusive studio access',
      'High-speed WiFi & desk setup',
      'Attached bathroom with hot water',
      '30-min cleaning buffer included',
    ],
  },
  {
    hours: 3,
    price: 900,
    tag: 'Most Popular',
    popular: true,
    idealFor: 'The perfect duration for calm relaxation, focused productivity, or a peaceful escape.',
    features: [
      '3 hours exclusive studio access',
      'Smart TV with 4K streaming',
      'Fresh linens & plush bath towels',
      'Kitchenette & complimentary tea/coffee',
      '30-min cleaning buffer included',
    ],
  },
  {
    hours: 4,
    price: 1200,
    tag: 'Half-Day Rest',
    popular: false,
    idealFor: 'Extended restful stay with ample time to recharge, work, or unwind.',
    features: [
      '4 hours exclusive studio access',
      'Full amenity access with zero interruptions',
      'Inverter power backup protection',
      'Complimentary mineral drinking water',
      '30-min cleaning buffer included',
    ],
  },
];

export default function PricingSection() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section className="py-20 md:py-28 bg-ivory border-t border-sand/50" aria-labelledby="pricing-heading">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-sand/30 text-espresso text-xs font-semibold tracking-wider uppercase mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Honest Hourly Rates</span>
          </div>
          <h2 id="pricing-heading" className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-espresso tracking-tight">
            Transparent Pricing, Zero Hidden Fees
          </h2>
          <p className="mt-4 text-charcoal-muted text-base">
            Fixed at {formatCurrency(CONFIG.RATE_PER_HOUR_INR)} per hour. Book exactly the time you need, from 1 to 12 hours.
          </p>
        </div>

        {/* Pricing Cards (2h, 3h, 4h Examples) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
          {pricingTiers.map((tier, idx) => (
            <motion.div
              key={tier.hours}
              initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.5, delay: shouldReduceMotion ? 0 : idx * 0.1 }}
              className={`rounded-2xl p-7 flex flex-col justify-between relative transition-all duration-300 ${
                tier.popular
                  ? 'bg-warm-white border-2 border-espresso shadow-xl ring-4 ring-espresso/5 md:-translate-y-2'
                  : 'bg-warm-white border border-sand/70 shadow-sm hover:shadow-md hover:border-sand-dark'
              }`}
            >
              {/* Popular Ribbon */}
              {tier.popular && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-espresso text-ivory text-xs font-bold uppercase tracking-widest shadow-sm">
                  ★ {tier.tag}
                </div>
              )}

              <div>
                {!tier.popular && (
                  <span className="text-xs font-semibold text-charcoal-muted uppercase tracking-wider block mb-2">
                    {tier.tag}
                  </span>
                )}
                {tier.popular && <div className="h-2" />}

                <div className="flex items-baseline gap-2 mb-2">
                  <span className="font-serif text-4xl sm:text-5xl font-bold text-espresso">
                    {formatCurrency(tier.price)}
                  </span>
                  <span className="text-sm text-charcoal-muted font-medium">
                    / {tier.hours} hours
                  </span>
                </div>

                <div className="inline-flex items-center gap-1.5 text-xs text-sand-dark font-medium mb-5">
                  <Clock className="w-3.5 h-3.5" />
                  <span>{formatCurrency(CONFIG.RATE_PER_HOUR_INR)}/hour flat</span>
                </div>

                <p className="text-xs text-charcoal-muted leading-relaxed pb-6 border-b border-sand/40">
                  {tier.idealFor}
                </p>

                {/* Features List */}
                <ul className="mt-6 space-y-3">
                  {tier.features.map((feat) => (
                    <li key={feat} className="flex items-start gap-2.5 text-xs text-charcoal">
                      <div className="w-4 h-4 rounded-full bg-sand/30 flex items-center justify-center shrink-0 mt-0.5 text-espresso">
                        <Check className="w-2.5 h-2.5 stroke-[3]" />
                      </div>
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Action Link */}
              <div className="mt-8 pt-4">
                <Link
                  href={`/book?duration=${tier.hours}`}
                  className={`w-full py-3 rounded-full text-center font-semibold text-sm flex items-center justify-center gap-2 transition-all shadow-xs focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 ${
                    tier.popular
                      ? 'bg-espresso text-ivory hover:bg-espresso-dark focus-visible:ring-espresso'
                      : 'bg-sand/30 hover:bg-espresso hover:text-ivory text-espresso border border-sand focus-visible:ring-espresso'
                  }`}
                >
                  Book {tier.hours} Hours
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Footer Note */}
        <div className="mt-12 text-center text-xs text-charcoal-muted space-y-1">
          <p>
            Need more time? You can book up to 12 consecutive hours directly.
          </p>
          <p>
            <Link href="/studio" className="text-espresso font-semibold underline underline-offset-4 hover:text-espresso-dark">
              View complete 1–12 hours rate table on The Studio page &rarr;
            </Link>
          </p>
        </div>

      </div>
    </section>
  );
}
