'use client';

import React from 'react';
import Link from 'next/link';
import { motion, useReducedMotion } from 'framer-motion';
import { CalendarCheck, ShieldCheck, KeyRound, ArrowRight } from 'lucide-react';

const steps = [
  {
    number: '01',
    icon: CalendarCheck,
    title: 'Select Date & Hours',
    description:
      'Choose any start time between 08:00 and 23:00, from 1 to 12 hours. Every booking includes a complimentary 30-minute cleaning buffer.',
  },
  {
    number: '02',
    icon: ShieldCheck,
    title: 'Fast & Private ID Verification',
    description:
      'Upload a clear photo of your Aadhaar, Passport, DL, or Voter ID. As per UIDAI guidance, we never store full Aadhaar numbers.',
  },
  {
    number: '03',
    icon: KeyRound,
    title: 'Instant Confirmation & Self Check-In',
    description:
      'Once verified, your slot is 100% confirmed. Receive the exact private address and your time-bound smart lock entrance PIN.',
  },
];

export default function HowItWorks() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section className="py-20 md:py-28 bg-ivory border-t border-sand/50" aria-labelledby="how-it-works-heading">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs font-semibold uppercase tracking-widest text-espresso bg-sand/30 px-3 py-1 rounded-full">
            Effortless & Direct
          </span>
          <h2 id="how-it-works-heading" className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-espresso tracking-tight mt-3">
            How Hourly Booking Works
          </h2>
          <p className="mt-4 text-charcoal-muted text-base leading-relaxed">
            Direct instant reservations with zero host friction, no middleman markups, and total discretion.
          </p>
        </div>

        {/* 3 Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.5, delay: shouldReduceMotion ? 0 : index * 0.15 }}
                className="bg-warm-white rounded-2xl p-8 border border-sand/70 shadow-sm relative flex flex-col justify-between hover:shadow-md hover:border-espresso/40 transition-all group"
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <span className="font-serif text-3xl font-bold text-sand-dark group-hover:text-espresso transition-colors">
                      {step.number}
                    </span>
                    <div className="w-12 h-12 rounded-xl bg-sand/20 flex items-center justify-center text-espresso group-hover:bg-espresso group-hover:text-ivory transition-colors">
                      <Icon className="w-6 h-6" />
                    </div>
                  </div>
                  <h3 className="font-serif text-xl font-bold text-charcoal mb-3 group-hover:text-espresso transition-colors">
                    {step.title}
                  </h3>
                  <p className="text-sm text-charcoal-muted leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <div className="mt-12 text-center">
          <Link
            href="/book"
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-espresso text-ivory font-semibold text-sm hover:bg-espresso-dark active:scale-95 transition-all shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-espresso"
          >
            Start Your Reservation
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

      </div>
    </section>
  );
}
