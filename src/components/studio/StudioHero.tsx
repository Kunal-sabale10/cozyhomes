'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, useReducedMotion } from 'framer-motion';
import {
  ChevronRight,
  MapPin,
  Clock,
  Users,
  ShieldCheck,
  ArrowRight,
  Sparkles,
} from 'lucide-react';
import { CONFIG } from '@/lib/config';
import { formatCurrency } from '@/lib/utils';

export default function StudioHero() {
  const shouldReduceMotion = useReducedMotion();

  // The approved hero photograph
  const mainPhotoUrl =
    'https://images.unsplash.com/photo-1598928506311-c55ded91a20c?auto=format&fit=crop&w=1200&q=85';

  return (
    <section aria-labelledby="studio-heading" className="w-full">
      {/* Two-column layout on desktop: Left copy & action, Right 4:5 photograph */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
        
        {/* Left Column: Breadcrumb, Label, Heading, (Mobile Photo), Subtitle, Intro, Chips, Button */}
        <motion.div
          initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, ease: 'easeOut' }}
          className="lg:col-span-7 space-y-6"
        >
          {/* Breadcrumb Navigation */}
          <nav aria-label="Breadcrumb">
            <ol className="flex items-center gap-2 text-xs sm:text-sm font-medium text-charcoal-muted">
              <li>
                <Link
                  href="/"
                  className="hover:text-espresso transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-espresso rounded-xs"
                >
                  Home
                </Link>
              </li>
              <li aria-hidden="true">
                <ChevronRight className="w-3.5 h-3.5 text-sand-dark" />
              </li>
              <li className="text-espresso font-semibold" aria-current="page">
                The Studio
              </li>
            </ol>
          </nav>

          {/* Small Label — standardized pill style */}
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-sand/30 border border-sand text-espresso text-xs font-medium">
            <MapPin className="w-3.5 h-3.5 text-sage" />
            <span>Private studio · Kalwa, Thane</span>
          </div>

          {/* Main Heading — sentence case */}
          <h1
            id="studio-heading"
            className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-charcoal text-balance leading-[1.15]"
          >
            The studio space
          </h1>

          {/* Mobile Photograph: Sits immediately below the heading on mobile */}
          <div className="block lg:hidden my-6">
            <div className="relative aspect-[4/5] w-full max-w-md mx-auto rounded-3xl overflow-hidden border border-sand shadow-lg bg-espresso">
              <Image
                src={mainPhotoUrl}
                alt="CozyMoments private studio living and rest area in Kalwa, Thane"
                fill
                priority
                sizes="(max-width: 768px) 100vw, 400px"
                className="object-cover object-center"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-espresso/30 via-transparent to-transparent pointer-events-none" />
            </div>
          </div>

          {/* Italic Subtitle */}
          <p className="font-serif text-lg sm:text-xl text-umber italic leading-relaxed">
            Humare ghar ko apna ghar samjho.
          </p>

          {/* Intro Paragraph — confirmed concrete details only, zero brackets */}
          <p className="text-base sm:text-[17px] text-umber leading-relaxed font-normal">
            CozyMoments is a dedicated private studio apartment in Kalwa, Thane, reserved solely for your booked slot with zero shared spaces. The studio features a comfortable bed, an attached private bathroom with a hot shower, and a seating area with a dedicated work desk. Guests enjoy quiet air conditioning, Wi-Fi, and a smart TV in a calm residential setting. Every booking includes a 30-minute cleaning buffer before check-in.
          </p>

          {/* 4 Feature Chips (15px text, WCAG AA compliant contrast) */}
          <div className="pt-2 flex flex-wrap gap-3" aria-label="Key studio features">
            {/* Chip 1 */}
            <div className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-ivory border border-sand shadow-2xs text-[15px] font-medium text-charcoal">
              <Clock className="w-4 h-4 text-sage shrink-0" aria-hidden="true" />
              <span>From {formatCurrency(CONFIG.RATE_PER_HOUR_INR)}/hour</span>
            </div>

            {/* Chip 2: One guest rule everywhere */}
            <div className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-ivory border border-sand shadow-2xs text-[15px] font-medium text-charcoal">
              <Users className="w-4 h-4 text-sage shrink-0" aria-hidden="true" />
              <span>Up to 2 guests</span>
            </div>

            {/* Chip 3 */}
            <div className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-ivory border border-sand shadow-2xs text-[15px] font-medium text-charcoal">
              <MapPin className="w-4 h-4 text-sage shrink-0" aria-hidden="true" />
              <span>Kalwa, Thane</span>
            </div>

            {/* Chip 4: Verified privacy feature */}
            <div className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-ivory border border-sand shadow-2xs text-[15px] font-medium text-charcoal">
              <ShieldCheck className="w-4 h-4 text-sage shrink-0" aria-hidden="true" />
              <span>Single-unit private access</span>
            </div>
          </div>

          {/* Primary Action Button */}
          <div className="pt-3">
            <Link
              href="/book"
              className="inline-flex items-center gap-2.5 px-8 py-3.5 rounded-full bg-espresso text-ivory font-semibold text-sm sm:text-base hover:bg-espresso-dark active:scale-[0.98] transition-all shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-sage-deep"
            >
              <span>See available times</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </motion.div>

        {/* Right Column: Studio's Main Photograph (4:5 ratio, rounded corners, desktop) */}
        <motion.div
          initial={{ opacity: 0, scale: shouldReduceMotion ? 1 : 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: shouldReduceMotion ? 0 : 0.15, ease: 'easeOut' }}
          className="hidden lg:block lg:col-span-5"
        >
          <div className="relative aspect-[4/5] w-full rounded-3xl overflow-hidden border border-sand shadow-xl bg-espresso group">
            <Image
              src={mainPhotoUrl}
              alt="CozyMoments private studio living and rest area in Kalwa, Thane"
              fill
              priority
              sizes="(min-width: 1024px) 42vw, 500px"
              className="object-cover object-center group-hover:scale-102 transition-transform duration-500 ease-out"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-espresso/40 via-transparent to-transparent pointer-events-none" />
            <div className="absolute bottom-5 left-5 right-5 p-4 rounded-2xl bg-ivory/95 backdrop-blur-md border border-sand text-xs text-charcoal flex items-center justify-between shadow-sm">
              <span className="font-medium text-charcoal">Private single-unit studio</span>
              <span className="text-charcoal font-semibold font-serif">Kalwa, Thane</span>
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
