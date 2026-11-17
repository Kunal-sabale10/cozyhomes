'use client';

import React, { useState, useEffect, useId } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { motion, useReducedMotion } from 'framer-motion';
import { Clock, Minus, Plus, ArrowRight, Loader2, Check, MapPin } from 'lucide-react';
import CalendarPopover from '@/components/home/CalendarPopover';
import { CONFIG } from '@/lib/config';
import {
  formatCurrency,
  formatTime,
  calculatePrice,
  getAvailableStartTimes,
  getMaxDuration,
  getTodayIST,
  getNextAvailableStartTime,
  getTimeSlotStatus,
} from '@/lib/utils';

export interface HeroProps {
  ratePerHour?: number;
  maxGuests?: number;
  initialDuration?: number;
  locationLabel?: string;
}

export default function Hero({
  ratePerHour = CONFIG.RATE_PER_HOUR_INR,
  maxGuests = CONFIG.MAX_GUESTS,
  initialDuration = 3,
  locationLabel = 'Kalwa, Thane',
}: HeroProps = {}) {
  const router = useRouter();
  const shouldReduceMotion = useReducedMotion();
  const timeId = useId();
  const calendarId = useId();

  // State
  const [minDate, setMinDate] = useState('2026-11-18');
  const [date, setDate] = useState('2026-11-18');
  const [startTime, setStartTime] = useState('08:00');
  const [duration, setDuration] = useState(initialDuration);
  const [showCustomDuration, setShowCustomDuration] = useState(false);
  const [guests, setGuests] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  // Initialize dates and smart next available time on mount
  useEffect(() => {
    const today = getTodayIST();
    setMinDate(today);
    setDate(today);
    const nextTime = getNextAvailableStartTime(today);
    setStartTime(nextTime);
  }, []);

  // When date changes, update start time if needed
  function handleDateChange(newDate: string) {
    setDate(newDate);
    const nextTime = getNextAvailableStartTime(newDate);
    setStartTime(nextTime);
  }

  const availableTimes = getAvailableStartTimes();
  const maxDuration = getMaxDuration(startTime);
  const price = calculatePrice(duration, ratePerHour);

  // Segmented options
  const durationSegments = [1, 2, 3, 4];

  function handleCheckAvailability(e: React.FormEvent) {
    e.preventDefault();
    setIsLoading(true);

    const params = new URLSearchParams({
      date,
      startTime,
      duration: duration.toString(),
      guests: guests.toString(),
    });

    setTimeout(() => {
      router.push(`/book?${params.toString()}`);
    }, 600);
  }

  return (
    <section id="booking" className="relative min-h-[92vh] flex items-center justify-center overflow-hidden py-16 lg:py-24">
      {/* Background Studio Photograph — Shown Clearly with lightened 35–45% overlay */}
      <div className="absolute inset-0 z-0 bg-espresso">
        <Image
          src="https://images.unsplash.com/photo-1598928506311-c55ded91a20c?auto=format&fit=crop&w=2000&q=85"
          alt="CozyMoments private boutique studio apartment in Kalwa, Thane"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
        {/* Lightened overall photo overlay (approx 38% opacity) */}
        <div className="absolute inset-0 bg-espresso-dark/40" />
      </div>

      <div className="relative z-10 max-w-6xl w-full mx-auto px-4 sm:px-6">
        {/* Vertically aligned: items-start aligns the top edges of heading block and booking card */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          
          {/* Left Column: Heading Block with focused stronger gradient backdrop */}
          <motion.div
            initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="lg:col-span-7"
          >
            {/* Stronger gradient container only behind text block for text contrast */}
            <div className="p-7 sm:p-9 md:p-10 rounded-3xl bg-gradient-to-r from-espresso-dark/95 via-espresso-dark/85 to-espresso/60 backdrop-blur-sm border border-sand/30 shadow-2xl max-w-xl text-ivory">
              
              {/* Single Location Label */}
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-sand/20 border border-sand/40 text-sand-light text-xs font-semibold tracking-wider uppercase mb-5">
                <MapPin className="w-3.5 h-3.5 text-sand" />
                <span>{locationLabel}</span>
              </div>

              {/* Main Heading (size preserved, text-balance) */}
              <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-ivory text-balance leading-[1.12]">
                Your Private Stay, Just for You
              </h1>

              {/* Hinglish line below heading in sentence case, not bold uppercase */}
              <p className="mt-3.5 text-base sm:text-lg text-sand-light font-normal leading-relaxed">
                Humare ghar ko apna ghar samjho.
              </p>

              {/* One Supporting Line */}
              <p className="mt-4 text-base sm:text-lg text-ivory/90 leading-relaxed font-light">
                A serene, thoughtfully styled studio apartment reserved exclusively by the hour for calm work, restful pauses, and quiet stays.
              </p>
            </div>
          </motion.div>

          {/* Right Column: Refined Booking Card (aligned at top edge) */}
          <motion.div
            initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: shouldReduceMotion ? 0 : 0.1, ease: 'easeOut' }}
            className="lg:col-span-5"
          >
            <div className="bg-ivory rounded-3xl shadow-2xl border border-sand/80 p-6 sm:p-7 text-charcoal">
              
              {/* Card Title */}
              <div className="flex items-center justify-between pb-3.5 border-b border-sand/50">
                <div>
                  <h2 className="font-serif text-xl font-bold text-espresso">
                    Reserve Your Hours
                  </h2>
                  <p className="text-xs text-charcoal-muted mt-0.5">
                    Private direct reservation · Instant slot lock
                  </p>
                </div>
                <div className="text-right">
                  <span className="text-xl font-bold text-espresso font-serif">
                    {formatCurrency(ratePerHour)}
                  </span>
                  <span className="text-[11px] text-charcoal-muted block">/hour</span>
                </div>
              </div>

              {isLoading ? (
                /* Loading Skeleton */
                <div className="py-8 space-y-4 animate-pulse" aria-busy="true" aria-label="Loading available slots">
                  <div className="h-4 bg-sand/40 rounded w-3/4" />
                  <div className="h-10 bg-sand/30 rounded-xl" />
                  <div className="grid grid-cols-2 gap-3">
                    <div className="h-10 bg-sand/30 rounded-xl" />
                    <div className="h-10 bg-sand/30 rounded-xl" />
                  </div>
                  <div className="h-12 bg-sand/30 rounded-xl" />
                  <div className="h-12 bg-espresso/40 rounded-full" />
                  <p className="text-center text-xs text-charcoal-muted flex items-center justify-center gap-2">
                    <Loader2 className="w-3.5 h-3.5 animate-spin text-espresso" />
                    Finding available slots in Kalwa, Thane...
                  </p>
                </div>
              ) : (
                <form onSubmit={handleCheckAvailability} className="mt-4 space-y-4">
                  
                  {/* 1. Custom Calendar Popover */}
                  <div>
                    <label htmlFor={calendarId} className="block text-xs font-semibold uppercase tracking-wider text-charcoal-muted mb-1.5">
                      Date
                    </label>
                    <CalendarPopover
                      id={calendarId}
                      value={date}
                      onChange={handleDateChange}
                      minDate={minDate}
                    />
                  </div>

                  {/* 2. Start Time Options showing (Available / Booked) */}
                  <div>
                    <label htmlFor={timeId} className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-charcoal-muted mb-1.5">
                      <Clock className="w-3.5 h-3.5 text-espresso" />
                      Start Time
                    </label>
                    <select
                      id={timeId}
                      value={startTime}
                      onChange={(e) => {
                        setStartTime(e.target.value);
                        const newMax = getMaxDuration(e.target.value);
                        if (duration > newMax) setDuration(newMax);
                      }}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-sand bg-warm-white text-charcoal text-sm focus:border-espresso focus:ring-2 focus:ring-espresso/20 outline-none transition-all"
                    >
                      {availableTimes.map((t) => {
                        const status = getTimeSlotStatus(t, date);
                        const isBooked = status === 'Booked';
                        return (
                          <option key={t} value={t} disabled={isBooked}>
                            {formatTime(t)} — {status}
                          </option>
                        );
                      })}
                    </select>
                  </div>

                  {/* 3. Duration as Segmented Buttons: 1h, 2h, 3h, 4h, Custom */}
                  <div>
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="text-xs font-semibold uppercase tracking-wider text-charcoal-muted">
                        Duration
                      </span>
                      <span className="text-[11px] text-charcoal-muted">
                        {duration} {duration === 1 ? 'hour' : 'hours'} selected
                      </span>
                    </div>

                    <div className="flex rounded-xl bg-sand/25 p-1 border border-sand/70">
                      {durationSegments.map((h) => {
                        const isSelected = duration === h && !showCustomDuration;
                        return (
                          <button
                            key={h}
                            type="button"
                            onClick={() => {
                              setDuration(h);
                              setShowCustomDuration(false);
                            }}
                            className={`flex-1 py-1.5 rounded-lg text-xs font-semibold transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-espresso ${
                              isSelected
                                ? 'bg-espresso text-ivory shadow-xs'
                                : 'text-charcoal hover:bg-sand/40 active:scale-95'
                            }`}
                          >
                            {h}h
                          </button>
                        );
                      })}
                      <button
                        type="button"
                        onClick={() => {
                          setShowCustomDuration(true);
                          if (duration <= 4) setDuration(5);
                        }}
                        className={`flex-1 py-1.5 rounded-lg text-xs font-semibold transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-espresso ${
                          showCustomDuration || duration > 4
                            ? 'bg-espresso text-ivory shadow-xs'
                            : 'text-charcoal hover:bg-sand/40 active:scale-95'
                        }`}
                      >
                        Custom
                      </button>
                    </div>

                    {/* Custom Duration Selector (5h to 12h) */}
                    {(showCustomDuration || duration > 4) && (
                      <div className="flex items-center justify-between p-2.5 rounded-xl bg-warm-white border border-sand mt-2">
                        <span className="text-xs text-charcoal-muted">
                          Choose 5 to {Math.min(maxDuration, 12)} hours:
                        </span>
                        <select
                          value={duration}
                          onChange={(e) => setDuration(Number(e.target.value))}
                          className="px-2.5 py-1 rounded-lg border border-sand bg-ivory text-xs font-bold text-espresso outline-none focus:ring-2 focus:ring-espresso"
                        >
                          {Array.from({ length: Math.max(1, maxDuration - 4) }, (_, i) => i + 5)
                            .filter((h) => h <= 12 && h <= maxDuration)
                            .map((num) => (
                              <option key={num} value={num}>
                                {num} hours
                              </option>
                            ))}
                        </select>
                      </div>
                    )}
                  </div>

                  {/* 4. Guests as Stepper (1–2) with 'Maximum 2 guests' shown */}
                  <div className="flex items-center justify-between p-3 rounded-xl bg-warm-white border border-sand/70">
                    <div>
                      <span className="text-xs font-semibold uppercase tracking-wider text-charcoal block">
                        Guests
                      </span>
                      <span className="text-[11px] text-charcoal-muted font-normal block">
                        Maximum {maxGuests} guests
                      </span>
                    </div>

                    <div className="flex items-center gap-2.5">
                      <button
                        type="button"
                        onClick={() => setGuests((prev) => Math.max(1, prev - 1))}
                        disabled={guests <= 1}
                        aria-label="Decrease guests to 1"
                        className="w-7 h-7 rounded-lg flex items-center justify-center border border-sand bg-ivory text-charcoal hover:bg-sand/40 disabled:opacity-30 disabled:cursor-not-allowed focus:outline-none focus-visible:ring-2 focus-visible:ring-espresso transition-colors"
                      >
                        <Minus className="w-3.5 h-3.5" />
                      </button>
                      <span className="font-bold text-sm text-espresso w-4 text-center">
                        {guests}
                      </span>
                      <button
                        type="button"
                        onClick={() => setGuests((prev) => Math.min(maxGuests, prev + 1))}
                        disabled={guests >= maxGuests}
                        aria-label={`Increase guests to ${maxGuests}`}
                        className="w-7 h-7 rounded-lg flex items-center justify-center border border-sand bg-ivory text-charcoal hover:bg-sand/40 disabled:opacity-30 disabled:cursor-not-allowed focus:outline-none focus-visible:ring-2 focus-visible:ring-espresso transition-colors"
                      >
                        <Plus className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>

                  {/* 5. Live Price: duration × ₹300, total shown once */}
                  <div className="bg-sand/20 rounded-xl p-3 border border-sand/40 flex items-center justify-between">
                    <span className="text-xs text-charcoal-muted">
                      {duration} {duration === 1 ? 'hour' : 'hours'} × {formatCurrency(ratePerHour)}/hr
                    </span>
                    <span className="text-base font-bold text-espresso font-serif">
                      Total: {formatCurrency(price.total)}
                    </span>
                  </div>

                  {/* 6. Button Label: "See available times." */}
                  <button
                    type="submit"
                    className="w-full py-3.5 rounded-full bg-espresso text-ivory font-semibold text-sm hover:bg-espresso-dark active:scale-[0.98] transition-all shadow-md flex items-center justify-center gap-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-espresso"
                  >
                    See available times.
                    <ArrowRight className="w-4 h-4" />
                  </button>

                  {/* 7. Under the Button: 3 trust items */}
                  <ul className="pt-2.5 border-t border-sand/40 space-y-1.5 text-[11px] text-charcoal-muted">
                    <li className="flex items-center gap-1.5">
                      <Check className="w-3.5 h-3.5 text-espresso shrink-0 stroke-[2.5]" />
                      <span>Valid government ID required before booking</span>
                    </li>
                    <li className="flex items-center gap-1.5">
                      <Check className="w-3.5 h-3.5 text-espresso shrink-0 stroke-[2.5]" />
                      <span>Instant confirmation once payment is complete</span>
                    </li>
                    <li className="flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-espresso shrink-0" />
                      <span>10-minute hold while you complete checkout</span>
                    </li>
                  </ul>

                </form>
              )}

            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
