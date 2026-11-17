'use client';

import React, { useState, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { CalendarDays, Clock, Users, Minus, Plus, Search } from 'lucide-react';
import { CONFIG } from '@/lib/config';
import { formatTime, calculatePrice, formatCurrency, getAvailableStartTimes, getMaxDuration, getTodayIST } from '@/lib/utils';

export default function BookingWidget() {
  const router = useRouter();
  const [today, setToday] = useState('2026-11-18');
  const [date, setDate] = useState('2026-11-18');

  React.useEffect(() => {
    const ist = getTodayIST();
    setToday(ist);
    setDate(ist);
  }, []);
  const [startTime, setStartTime] = useState('10:00');
  const [duration, setDuration] = useState(2);
  const [guests, setGuests] = useState(1);

  const availableTimes = useMemo(() => getAvailableStartTimes(), []);
  const maxDuration = useMemo(() => getMaxDuration(startTime), [startTime]);
  const price = useMemo(() => calculatePrice(duration), [duration]);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const params = new URLSearchParams({
      date,
      startTime,
      duration: duration.toString(),
      guests: guests.toString(),
    });
    router.push(`/book?${params.toString()}`);
  }

  return (
    <section id="booking" className="py-16 md:py-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-10">
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-charcoal">
            Book Your Private Stay
          </h2>
          <p className="mt-3 text-charcoal-light text-lg">
            Select your date, time, and duration to check availability
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="bg-cream rounded-2xl shadow-lg border border-beige/60 p-6 md:p-8"
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {/* Date */}
            <div>
              <label htmlFor="booking-date" className="flex items-center gap-2 text-sm font-semibold text-charcoal mb-2">
                <CalendarDays className="w-4 h-4 text-sage" />
                Date
              </label>
              <input
                type="date"
                id="booking-date"
                value={date}
                min={today}
                onChange={(e) => setDate(e.target.value)}
                required
                className="w-full px-4 py-3 rounded-xl border border-charcoal/15 bg-warm-white text-charcoal focus:border-sage focus:ring-2 focus:ring-sage/20 outline-none transition-all"
              />
            </div>

            {/* Start Time */}
            <div>
              <label htmlFor="booking-time" className="flex items-center gap-2 text-sm font-semibold text-charcoal mb-2">
                <Clock className="w-4 h-4 text-sage" />
                Start Time
              </label>
              <select
                id="booking-time"
                value={startTime}
                onChange={(e) => {
                  setStartTime(e.target.value);
                  const newMax = getMaxDuration(e.target.value);
                  if (duration > newMax) setDuration(newMax);
                }}
                required
                className="w-full px-4 py-3 rounded-xl border border-charcoal/15 bg-warm-white text-charcoal focus:border-sage focus:ring-2 focus:ring-sage/20 outline-none transition-all"
              >
                {availableTimes.map((t) => (
                  <option key={t} value={t}>
                    {formatTime(t)}
                  </option>
                ))}
              </select>
            </div>

            {/* Duration */}
            <div>
              <label className="flex items-center gap-2 text-sm font-semibold text-charcoal mb-2">
                <Clock className="w-4 h-4 text-sage" />
                Duration
              </label>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setDuration(Math.max(CONFIG.MIN_HOURS, duration - 1))}
                  disabled={duration <= CONFIG.MIN_HOURS}
                  className="p-2.5 rounded-xl border border-charcoal/15 bg-warm-white hover:bg-beige disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                  aria-label="Decrease duration"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="flex-1 text-center text-lg font-semibold text-charcoal">
                  {duration} hr{duration !== 1 ? 's' : ''}
                </span>
                <button
                  type="button"
                  onClick={() => setDuration(Math.min(maxDuration, duration + 1))}
                  disabled={duration >= maxDuration}
                  className="p-2.5 rounded-xl border border-charcoal/15 bg-warm-white hover:bg-beige disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                  aria-label="Increase duration"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Guests */}
            <div>
              <label htmlFor="booking-guests" className="flex items-center gap-2 text-sm font-semibold text-charcoal mb-2">
                <Users className="w-4 h-4 text-sage" />
                Guests
              </label>
              <select
                id="booking-guests"
                value={guests}
                onChange={(e) => setGuests(Number(e.target.value))}
                className="w-full px-4 py-3 rounded-xl border border-charcoal/15 bg-warm-white text-charcoal focus:border-sage focus:ring-2 focus:ring-sage/20 outline-none transition-all"
              >
                {Array.from({ length: CONFIG.MAX_GUESTS }, (_, i) => i + 1).map((g) => (
                  <option key={g} value={g}>
                    {g} {g === 1 ? 'Guest' : 'Guests'}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Price preview and CTA */}
          <div className="mt-6 flex flex-col sm:flex-row items-center justify-between gap-4 pt-5 border-t border-charcoal/10">
            <div className="text-center sm:text-left">
              <p className="text-sm text-charcoal-light">Estimated total</p>
              <p className="text-2xl font-bold text-charcoal">
                {formatCurrency(price.total)}
                {price.taxAmount > 0 && (
                  <span className="text-sm font-normal text-warm-gray ml-1">
                    (incl. {price.taxPercent}% tax)
                  </span>
                )}
              </p>
              <p className="text-xs text-warm-gray">
                {duration} hr{duration !== 1 ? 's' : ''} × {formatCurrency(CONFIG.RATE_PER_HOUR_INR)}/hr
              </p>
            </div>

            <button
              type="submit"
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-sage text-warm-white font-semibold text-base hover:bg-sage-dark active:scale-95 transition-all shadow-md focus-visible:ring-2 focus-visible:ring-sage focus-visible:ring-offset-2"
            >
              <Search className="w-4 h-4" />
              Check Availability
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}
