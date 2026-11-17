import React, { Suspense } from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import {
  CheckCircle2,
  Clock,
  CalendarDays,
  Users,
  MapPin,
  ShieldCheck,
  MessageCircle,
  ArrowLeft,
  KeyRound,
  FileCheck,
  Loader2,
} from 'lucide-react';
import { CONFIG } from '@/lib/config';
import {
  formatCurrency,
  formatDate,
  formatTime,
  addMinutes,
} from '@/lib/utils';
import type { BookingStatus } from '@/types';

interface PageProps {
  params: Promise<{ reference: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { reference } = await params;
  return {
    title: `Booking Details ${reference} | CozyMoments`,
    description: `View reservation details and status for booking ${reference} at CozyMoments, Kalwa, Thane.`,
    robots: {
      index: false,
      follow: false,
    },
  };
}

async function BookingStatusContent({ params }: { params: Promise<{ reference: string }> }) {
  const { reference } = await params;

  // Mock booking details for demonstration
  const status: BookingStatus = 'confirmed';
  const bookingDate = '2026-11-18';
  const startTime = '14:00';
  const durationHours = 3;
  const guestsCount: number = 2;
  const ratePerHour = CONFIG.RATE_PER_HOUR_INR;
  const totalAmount = durationHours * ratePerHour;
  const endTime = addMinutes(startTime, durationHours * 60);

  const statusConfig = {
    confirmed: {
      label: 'Confirmed',
      bgColor: 'bg-emerald-50 text-emerald-800 border-emerald-200',
      dotColor: 'bg-emerald-500',
      icon: CheckCircle2,
    },
    pending_payment: {
      label: 'Pending Payment',
      bgColor: 'bg-amber-50 text-amber-800 border-amber-200',
      dotColor: 'bg-amber-500',
      icon: Clock,
    },
    cancelled: {
      label: 'Cancelled',
      bgColor: 'bg-rose-50 text-rose-800 border-rose-200',
      dotColor: 'bg-rose-500',
      icon: Clock,
    },
  };

  const currentStatusConfig =
    statusConfig[status as keyof typeof statusConfig] || statusConfig.confirmed;
  const StatusIcon = currentStatusConfig.icon;

  const whatsappMessage = encodeURIComponent(
    `Hello CozyMoments! I have an inquiry regarding my booking ${reference}.`
  );
  const whatsappUrl = `https://wa.me/${CONFIG.WHATSAPP_NUMBER.replace(
    /[^0-9]/g,
    ''
  )}?text=${whatsappMessage}`;

  return (
    <div className="bg-cream rounded-3xl border border-beige/80 shadow-md overflow-hidden">
      {/* Header Banner */}
      <div className="bg-warm-white/80 border-b border-beige/80 p-6 sm:p-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-charcoal-light">
            <span>Booking Reference</span>
          </div>
          <h1 className="font-mono text-2xl sm:text-3xl font-bold text-charcoal mt-1 tracking-tight">
            {reference}
          </h1>
          <p className="text-xs text-warm-gray mt-1">
            Booked with complete privacy and discretion
          </p>
        </div>

        {/* Status Badge */}
        <div
          className={`inline-flex items-center gap-2 px-4 py-2 rounded-full border text-sm font-semibold shadow-xs ${currentStatusConfig.bgColor}`}
        >
          <StatusIcon className="w-4 h-4" />
          <span>{currentStatusConfig.label}</span>
        </div>
      </div>

      <div className="p-6 sm:p-8 space-y-8">
        {/* Quick Summary Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="bg-warm-white p-4 rounded-2xl border border-beige/60 flex items-start gap-3">
            <div className="p-2.5 rounded-xl bg-sage/15 text-sage-dark shrink-0">
              <CalendarDays className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs text-charcoal-light font-medium">Date</p>
              <p className="text-sm font-semibold text-charcoal mt-0.5">
                {formatDate(bookingDate)}
              </p>
            </div>
          </div>

          <div className="bg-warm-white p-4 rounded-2xl border border-beige/60 flex items-start gap-3">
            <div className="p-2.5 rounded-xl bg-sage/15 text-sage-dark shrink-0">
              <Clock className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs text-charcoal-light font-medium">Time Slot</p>
              <p className="text-sm font-semibold text-charcoal mt-0.5">
                {formatTime(startTime)} – {formatTime(endTime)} ({durationHours} hours)
              </p>
            </div>
          </div>

          <div className="bg-warm-white p-4 rounded-2xl border border-beige/60 flex items-start gap-3">
            <div className="p-2.5 rounded-xl bg-sage/15 text-sage-dark shrink-0">
              <Users className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs text-charcoal-light font-medium">Number of Guests</p>
              <p className="text-sm font-semibold text-charcoal mt-0.5">
                {guestsCount} {guestsCount === 1 ? 'Guest' : 'Guests'} (Maximum allowed)
              </p>
            </div>
          </div>

          <div className="bg-warm-white p-4 rounded-2xl border border-beige/60 flex items-start gap-3">
            <div className="p-2.5 rounded-xl bg-sage/15 text-sage-dark shrink-0">
              <MapPin className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs text-charcoal-light font-medium">Location</p>
              <p className="text-sm font-semibold text-charcoal mt-0.5">
                {CONFIG.LOCATION_SHORT}
              </p>
              <p className="text-[11px] text-warm-gray mt-0.5">
                Exact tower & door code sent 1 hour prior
              </p>
            </div>
          </div>
        </div>

        {/* Price Details */}
        <div className="bg-warm-white p-6 rounded-2xl border border-beige/60 space-y-3">
          <h3 className="font-serif text-base font-semibold text-charcoal">
            Payment Breakdown
          </h3>
          <div className="flex justify-between text-sm text-charcoal-light">
            <span>
              Studio Rental ({durationHours} hrs × {formatCurrency(ratePerHour)}/hr)
            </span>
            <span className="font-medium text-charcoal">
              {formatCurrency(totalAmount)}
            </span>
          </div>
          <div className="flex justify-between text-sm text-charcoal-light">
            <span>Cleaning & Sanitization</span>
            <span className="text-sage-dark font-medium">Included</span>
          </div>
          <div className="flex justify-between text-sm text-charcoal-light">
            <span>Taxes</span>
            <span className="font-medium text-charcoal">₹0</span>
          </div>
          <div className="pt-3 border-t border-charcoal/10 flex justify-between items-baseline font-semibold">
            <span className="text-base text-charcoal">Total Paid</span>
            <span className="text-2xl font-serif text-sage-dark font-bold">
              {formatCurrency(totalAmount)}
            </span>
          </div>
        </div>

        {/* Check-In Instructions */}
        <div className="bg-sage-lightest rounded-2xl border border-sage/20 p-5 sm:p-6 space-y-3">
          <div className="flex items-center gap-2 text-sage-dark font-semibold">
            <KeyRound className="w-5 h-5 text-sage" />
            <h3 className="text-sm sm:text-base">Self Check-In & Access Instructions</h3>
          </div>
          <p className="text-xs sm:text-sm text-charcoal-light leading-relaxed">
            CozyMoments is entirely contactless for complete privacy. You will receive
            your unique keypad passcode and step-by-step building access directions via
            WhatsApp and email 1 hour before your scheduled reservation.
          </p>
          <div className="pt-2 flex items-center gap-2 text-xs text-charcoal">
            <FileCheck className="w-4 h-4 text-sage shrink-0" />
            <span>
              Government ID verification is handled securely; ID numbers are never displayed on public receipts.
            </span>
          </div>
        </div>

        {/* Need Help Section */}
        <div className="pt-4 border-t border-charcoal/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <h4 className="font-serif text-lg font-bold text-charcoal">
              Need Help or Have Questions?
            </h4>
            <p className="text-xs sm:text-sm text-charcoal-light mt-0.5">
              Our private support team is available on WhatsApp daily from 8 AM to 11 PM.
            </p>
          </div>

          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-emerald-600 text-warm-white font-semibold text-sm hover:bg-emerald-700 active:scale-95 transition-all shadow-sm"
          >
            <MessageCircle className="w-4 h-4" />
            Chat on WhatsApp
          </a>
        </div>
      </div>
    </div>
  );
}

function StatusLoadingFallback() {
  return (
    <div className="bg-cream rounded-3xl border border-beige/80 p-12 text-center shadow-md">
      <Loader2 className="w-8 h-8 animate-spin text-sage mx-auto mb-3" />
      <p className="text-sm font-medium text-charcoal">Loading booking details...</p>
    </div>
  );
}

export default function BookingStatusPage({ params }: PageProps) {
  return (
    <div className="min-h-screen bg-warm-white py-12 md:py-16">
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        {/* Navigation back */}
        <div className="mb-6">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm font-medium text-charcoal hover:text-sage transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Link>
        </div>

        <Suspense fallback={<StatusLoadingFallback />}>
          <BookingStatusContent params={params} />
        </Suspense>

        {/* Privacy Note Footer */}
        <div className="mt-8 text-center flex items-center justify-center gap-2 text-xs text-warm-gray">
          <ShieldCheck className="w-4 h-4 text-sage" />
          <span>Privacy Guaranteed • Discreet Billing • Sanitized Before Every Stay</span>
        </div>
      </div>
    </div>
  );
}
