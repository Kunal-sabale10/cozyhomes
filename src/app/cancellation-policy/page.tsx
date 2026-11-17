import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { 
  CalendarX, 
  Clock, 
  ChevronRight, 
  MessageCircle, 
  Mail, 
  RefreshCcw,
  ShieldCheck,
  AlertCircle
} from 'lucide-react';
import { CONFIG } from '@/lib/config';
import { CANCELLATION_POLICY_DATA } from '@/lib/cancellation-policy-data';

export const metadata: Metadata = {
  title: 'Cancellation Policy | CozyMoments',
  description: 'Understand the cancellation, rescheduling, and refund tiers for CozyMoments private studio in Kalwa, Thane. Transparent terms for hassle-free adjustments.',
  openGraph: {
    title: 'Cancellation Policy | CozyMoments',
    description: 'Understand the cancellation, rescheduling, and refund tiers for CozyMoments private studio in Kalwa, Thane.',
    url: 'https://cozymoments.in/cancellation-policy',
  },
};

export default function CancellationPolicyPage() {
  const whatsappUrl = `https://wa.me/${CONFIG.WHATSAPP_NUMBER.replace(/[^0-9]/g, '')}?text=${encodeURIComponent('Hi CozyMoments, I would like to request a booking cancellation or rescheduling.')}`;

  return (
    <div className="w-full bg-cream text-charcoal flex-1">
      <div className="max-w-[1200px] mx-auto px-6 py-12 md:py-16 w-full flex-1">
        {/* Breadcrumb Navigation */}
        <nav aria-label="Breadcrumb" className="mb-6">
          <ol className="flex items-center gap-2 text-xs font-medium text-umber">
            <li>
              <Link
                href="/"
                className="hover:text-charcoal transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-sage-deep rounded-xs"
              >
                Home
              </Link>
            </li>
            <li>
              <ChevronRight className="w-3.5 h-3.5 text-sand" />
            </li>
            <li>
              <Link
                href="/studio"
                className="hover:text-charcoal transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-sage-deep rounded-xs"
              >
                The Studio
              </Link>
            </li>
            <li>
              <ChevronRight className="w-3.5 h-3.5 text-sand" />
            </li>
            <li className="text-charcoal font-semibold" aria-current="page">
              Cancellation Policy
            </li>
          </ol>
        </nav>

        {/* Page Header */}
        <header className="mb-10 pb-8 border-b border-sand">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-sand/30 border border-sand text-espresso text-xs font-medium mb-3">
            <RefreshCcw className="w-3.5 h-3.5 text-sage" />
            <span>Cancellation policy</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-charcoal tracking-tight mb-3">
            Cancellation policy
          </h1>
          <p className="text-base sm:text-lg text-umber leading-relaxed max-w-2xl font-light">
            We understand plans can change unexpectedly. Because our studio is booked on an exclusive hourly basis, cancellations affect both prospective guests and the cleaning and preparation buffer between guests. Here is our transparent refund breakdown.
          </p>
          <div className="mt-4 flex items-center gap-2 text-xs text-umber">
            <Clock className="w-3.5 h-3.5 text-sage" />
            <span>Last updated: {CANCELLATION_POLICY_DATA.lastUpdated}</span>
          </div>
        </header>

        {/* Sand Info Panel (Replaces yellow warning banner; no yellow, no CONFIG label) */}
        <div className="mb-10 p-4 sm:p-5 rounded-2xl bg-sand/30 border border-sand flex items-start gap-3.5 text-xs sm:text-sm text-charcoal shadow-2xs">
          <ShieldCheck className="w-5 h-5 text-sage shrink-0 mt-0.5" />
          <div className="space-y-0.5">
            <span className="font-semibold text-charcoal">Booking terms guarantee:</span>
            <p className="text-umber leading-relaxed">
              The terms in effect at the time of your booking apply to that booking. Any changes are published with a date and do not affect existing bookings.
            </p>
          </div>
        </div>

        {/* Refund Tiers Table Section */}
        <section className="mb-12" aria-labelledby="refund-tiers-heading">
          <h2 id="refund-tiers-heading" className="font-serif text-2xl font-bold text-charcoal mb-6">
            Refund tiers breakdown
          </h2>

          {/* Desktop & Tablet Table (>=640px) */}
          <div className="hidden sm:block bg-ivory border border-sand rounded-2xl overflow-hidden shadow-xs">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-sand bg-sand/20 text-xs font-semibold text-charcoal uppercase tracking-wider">
                  <th scope="col" className="py-4 px-5">
                    Time before slot
                  </th>
                  <th scope="col" className="py-4 px-5">
                    Refund
                  </th>
                  <th scope="col" className="py-4 px-5">
                    Notes
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-sand">
                {CANCELLATION_POLICY_DATA.tiers.map((tier, index) => (
                  <tr key={index} className="hover:bg-cream/50 transition-colors">
                    <td className="py-4 px-5 align-top font-serif font-bold text-charcoal text-sm">
                      {tier.timeBeforeSlot}
                    </td>
                    <td className="py-4 px-5 align-top">
                      <span
                        className={`font-serif text-base font-bold ${
                          tier.isFullRefund ? 'text-espresso' : 'text-charcoal'
                        }`}
                      >
                        {tier.refund}
                      </span>
                    </td>
                    <td className="py-4 px-5 align-top text-xs sm:text-sm text-umber leading-relaxed">
                      {tier.notes}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile Stacked Cards (<640px / 375px) */}
          <div className="block sm:hidden space-y-4">
            {CANCELLATION_POLICY_DATA.tiers.map((tier, index) => (
              <div
                key={index}
                className="bg-ivory border border-sand rounded-2xl p-4 shadow-xs space-y-2"
              >
                <div className="flex items-center justify-between gap-2 border-b border-sand/60 pb-2">
                  <span className="font-serif font-bold text-charcoal text-sm">
                    {tier.timeBeforeSlot}
                  </span>
                  <span
                    className={`font-serif text-sm font-bold px-2.5 py-0.5 rounded-full border ${
                      tier.isFullRefund
                        ? 'bg-sand/40 border-sand text-espresso'
                        : 'bg-cream border-sand text-charcoal'
                    }`}
                  >
                    {tier.refund}
                  </span>
                </div>
                <p className="text-xs text-umber leading-relaxed pt-1">
                  {tier.notes}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* When We Cancel Section */}
        <section className="bg-ivory p-6 sm:p-8 rounded-2xl border border-sand mb-12 space-y-3 shadow-xs">
          <div className="flex items-center gap-2 text-espresso">
            <AlertCircle className="w-5 h-5 text-sage" />
            <h2 className="font-serif text-xl sm:text-2xl font-bold text-charcoal">
              When we cancel
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-umber leading-relaxed">
            The owner may cancel any booking in the exceedingly rare situation of unforeseen utility interruptions, emergency property maintenance, or safety concerns. In any such circumstance, the guest receives a full 100% refund to the original payment method within {CANCELLATION_POLICY_DATA.refundWorkingDays} working days with no cancellation deductions.
          </p>
        </section>

        {/* Rescheduling Policy Section */}
        <section className="bg-ivory p-6 sm:p-8 rounded-2xl border border-sand mb-12 space-y-3 shadow-xs">
          <div className="flex items-center gap-2 text-espresso">
            <CalendarX className="w-5 h-5 text-sage" />
            <h2 className="font-serif text-xl sm:text-2xl font-bold text-charcoal">
              Customer-initiated rescheduling
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-umber leading-relaxed">
            Reschedule to another free slot up to {CANCELLATION_POLICY_DATA.rescheduleCutoffHours} hours before your start time, at no extra cost. Rescheduled slots are subject to calendar availability within 30 days of your original booking date.
          </p>
        </section>

        {/* Refund Processing Timeline Section */}
        <section className="bg-ivory p-6 sm:p-8 rounded-2xl border border-sand mb-12 space-y-4 shadow-xs">
          <h2 className="font-serif text-xl sm:text-2xl font-bold text-charcoal">
            Refund processing timeline
          </h2>
          <p className="text-xs sm:text-sm text-charcoal font-medium">
            Refunds are processed to your original payment method within {CANCELLATION_POLICY_DATA.refundWorkingDays} working days. Processing time depends on your bank.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
            <div className="p-4 rounded-xl bg-cream border border-sand space-y-1">
              <strong className="block text-xs font-bold text-charcoal font-serif">UPI transfers</strong>
              <p className="text-xs text-umber">
                Usually reflected in your linked account within 24 to 48 hours following initiation.
              </p>
            </div>
            <div className="p-4 rounded-xl bg-cream border border-sand space-y-1">
              <strong className="block text-xs font-bold text-charcoal font-serif">Cards & net banking</strong>
              <p className="text-xs text-umber">
                Processed through our payment gateway within {CANCELLATION_POLICY_DATA.refundWorkingDays} working days.
              </p>
            </div>
          </div>
          <p className="text-xs text-umber pt-1">
            You will receive a refund transaction reference number via SMS or WhatsApp as soon as the transfer is initiated.
          </p>
        </section>

        {/* How to Request a Cancellation or Refund */}
        <section className="bg-ivory p-6 sm:p-8 rounded-2xl border border-sand mb-12 space-y-6 shadow-xs">
          <h2 className="font-serif text-xl sm:text-2xl font-bold text-charcoal">
            How to request a cancellation or refund
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="p-4 rounded-xl bg-cream border border-sand space-y-2">
              <div className="w-8 h-8 rounded-full bg-espresso text-ivory font-bold text-sm flex items-center justify-center font-serif">
                1
              </div>
              <h3 className="font-serif font-bold text-sm text-charcoal">Find booking ID</h3>
              <p className="text-xs text-umber">
                Locate your booking reference number from your WhatsApp or email confirmation message.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-cream border border-sand space-y-2">
              <div className="w-8 h-8 rounded-full bg-espresso text-ivory font-bold text-sm flex items-center justify-center font-serif">
                2
              </div>
              <h3 className="font-serif font-bold text-sm text-charcoal">Send a message</h3>
              <p className="text-xs text-umber">
                Contact us via WhatsApp or email with your Booking ID stating your request to cancel or change dates.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-cream border border-sand space-y-2">
              <div className="w-8 h-8 rounded-full bg-espresso text-ivory font-bold text-sm flex items-center justify-center font-serif">
                3
              </div>
              <h3 className="font-serif font-bold text-sm text-charcoal">Refund initiated</h3>
              <p className="text-xs text-umber">
                Our concierge confirms the request timestamp and immediately initiates the applicable refund.
              </p>
            </div>
          </div>

          <div className="flex flex-wrap gap-4 pt-2">
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-espresso text-ivory text-xs sm:text-sm font-semibold hover:bg-espresso-dark transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-sage-deep shadow-xs"
            >
              <MessageCircle className="w-4 h-4 fill-ivory text-ivory" />
              <span>Message +91 98765 43210 [to confirm]</span>
            </a>
            <a
              href="mailto:hello@cozymoments.in?subject=Cancellation%20Request"
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-cream border border-sand text-charcoal text-xs sm:text-sm font-semibold hover:bg-sand/30 transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-sage-deep"
            >
              <Mail className="w-4 h-4 text-sage" />
              <span>Email hello@cozymoments.in [to confirm]</span>
            </a>
          </div>
        </section>

        {/* Related Policies Navigation Links */}
        <div className="pt-6 border-t border-sand flex flex-wrap items-center justify-between gap-4 text-xs text-umber">
          <span>Related policies:</span>
          <div className="flex flex-wrap gap-4 font-medium">
            <Link
              href="/terms"
              className="text-sage-deep hover:text-charcoal transition-colors focus:outline-none focus-visible:ring-1 focus-visible:ring-sage-deep rounded-xs"
            >
              Terms of Service
            </Link>
            <Link
              href="/house-rules"
              className="text-sage-deep hover:text-charcoal transition-colors focus:outline-none focus-visible:ring-1 focus-visible:ring-sage-deep rounded-xs"
            >
              House Rules
            </Link>
            <Link
              href="/contact"
              className="text-sage-deep hover:text-charcoal transition-colors focus:outline-none focus-visible:ring-1 focus-visible:ring-sage-deep rounded-xs"
            >
              Contact Desk
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
