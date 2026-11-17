'use client';

import React from 'react';
import Link from 'next/link';
import { motion, useReducedMotion } from 'framer-motion';
import { ArrowRight, Sparkles } from 'lucide-react';
import StudioHero from '@/components/studio/StudioHero';
import PhotoGallery from '@/components/studio/PhotoGallery';
import AmenitiesList from '@/components/studio/AmenitiesList';
import PricingTable from '@/components/studio/PricingTable';
import CheckInInfo from '@/components/studio/CheckInInfo';
import HouseRules from '@/components/studio/HouseRules';
import StickyBookingCard from '@/components/studio/StickyBookingCard';
import MobileBookingBar from '@/components/studio/MobileBookingBar';
import { CONFIG } from '@/lib/config';
import { formatCurrency } from '@/lib/utils';

export default function StudioClient() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <div className="w-full bg-cream text-charcoal pb-28 lg:pb-0">
      
      {/* 1. Hero / Intro Section: 96px desktop padding, 64px mobile padding */}
      <section className="py-16 lg:py-24 max-w-[1200px] mx-auto px-6 border-b border-sand">
        <StudioHero />
      </section>

      {/* 2. Bento Photo Gallery Section */}
      <section className="py-16 lg:py-24 max-w-[1200px] mx-auto px-6 border-b border-sand">
        <motion.div
          initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
        >
          <PhotoGallery />
        </motion.div>
      </section>

      {/* 3. Amenities Card with Sticky Booking Sidebar Beside It */}
      <section className="py-16 lg:py-24 max-w-[1200px] mx-auto px-6 border-b border-sand">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* Left Column: Amenities */}
          <motion.div
            initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            className="lg:col-span-7 xl:col-span-8"
          >
            <AmenitiesList />
          </motion.div>

          {/* Right Column: Sticky Booking Sidebar placed beside the amenities card */}
          <div className="lg:col-span-5 xl:col-span-4 lg:sticky lg:top-24">
            <motion.div
              initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.5, ease: 'easeOut', delay: shouldReduceMotion ? 0 : 0.1 }}
            >
              <StickyBookingCard />
            </motion.div>
          </div>
        </div>
      </section>

      {/* 4. Pricing Table: Full Content Width on Desktop */}
      <section className="py-16 lg:py-24 max-w-[1200px] mx-auto px-6 border-b border-sand">
        <motion.div
          initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className="w-full"
        >
          <PricingTable />
        </motion.div>
      </section>

      {/* 5. Arrival Guide & House Rules */}
      <section className="py-16 lg:py-24 max-w-[1200px] mx-auto px-6 border-b border-sand space-y-12">
        <motion.div
          initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
        >
          <CheckInInfo />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
        >
          <HouseRules />
        </motion.div>
      </section>

      {/* 6. Bottom Call to Action Section */}
      <section className="py-16 lg:py-24 max-w-[1200px] mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
        >
          <div className="relative overflow-hidden rounded-3xl bg-ivory border border-sand p-8 sm:p-12 text-center sm:text-left flex flex-col sm:flex-row items-center justify-between gap-8 shadow-xs">
            <div className="space-y-3 max-w-lg">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-sand/30 border border-sand text-espresso text-xs font-medium">
                <Sparkles className="w-3.5 h-3.5 text-sage" />
                <span>Your private haven</span>
              </div>
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-charcoal leading-snug">
                Ready for peaceful, uninterrupted time?
              </h2>
              <p className="text-sm text-umber leading-relaxed">
                Reserve your private hourly slot in Kalwa, Thane starting at {formatCurrency(CONFIG.RATE_PER_HOUR_INR)}/hour with instant confirmation and keyless digital entry.
              </p>
            </div>

            <div className="shrink-0 w-full sm:w-auto">
              <Link
                href="/book"
                className="inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full bg-espresso hover:bg-espresso-dark text-ivory font-semibold text-sm sm:text-base transition-all duration-200 shadow-md hover:shadow-lg active:scale-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-sage-deep w-full sm:w-auto"
              >
                <span>Book your slot</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Mobile Fixed Bottom Booking Bar */}
      <MobileBookingBar />

    </div>
  );
}
