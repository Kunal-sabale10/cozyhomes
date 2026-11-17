import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { 
  FileText, 
  Scale, 
  Users, 
  CreditCard, 
  CalendarCheck, 
  AlertCircle, 
  Clock, 
  ChevronRight, 
  ShieldCheck, 
  MapPin,
  CheckCircle2
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'Terms of Service | CozyMoments',
  description: 'Terms of Service and booking conditions for CozyMoments private studio in Kalwa, Thane. Covering hourly reservations, guest eligibility, ID verification, and house conduct.',
  openGraph: {
    title: 'Terms of Service | CozyMoments',
    description: 'Terms of Service and booking conditions for CozyMoments private studio in Kalwa, Thane.',
    url: 'https://cozymoments.in/terms',
  },
};

export default function TermsOfServicePage() {
  return (
    <div className="min-h-screen flex flex-col bg-[#F7F3EB]">
      <Navbar />

      <main className="max-w-4xl mx-auto px-4 sm:px-6 py-12 md:py-16 w-full flex-1">
        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" className="mb-6">
          <ol className="flex items-center gap-2 text-xs font-medium text-[#6E5549]">
            <li>
              <Link href="/" className="hover:text-[#5B3929] transition-colors">
                Home
              </Link>
            </li>
            <li>
              <ChevronRight className="w-3.5 h-3.5 text-[#5B3929]" />
            </li>
            <li className="text-[#2B1D16] font-semibold" aria-current="page">
              Terms of Service
            </li>
          </ol>
        </nav>

        {/* Page Header */}
        <header className="mb-10 pb-8 border-b border-[#D8C3A5]">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#EFE9DC] text-[#42281D] text-xs font-semibold uppercase tracking-wider mb-4">
            <Scale className="w-4 h-4" />
            Guest Agreement & Rental Terms
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#2B1D16] tracking-tight mb-4">
            Terms of Service
          </h1>
          <p className="text-base sm:text-lg text-[#6E5549] leading-relaxed max-w-2xl font-light">
            Please read these terms carefully before confirming your reservation. By booking or accessing CozyMoments studio in Kalwa, Thane, you agree to abide by these clear, respectful standards.
          </p>
          <div className="mt-4 flex items-center gap-2 text-xs text-[#6E5549]">
            <Clock className="w-3.5 h-3.5 text-[#5B3929]" />
            <span>Last Updated: November 16, 2026</span>
          </div>
        </header>

        {/* Essential Rules Summary Box */}
        <div className="mb-10 p-5 sm:p-6 rounded-2xl bg-[#FCFAF6] border-2 border-[#5B3929]/40 shadow-xs">
          <h3 className="font-serif text-lg font-bold text-[#2B1D16] mb-3 flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-[#5B3929]" />
            Key Booking Requirements at a Glance
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs text-[#6E5549]">
            <div className="flex items-start gap-2.5 p-3 rounded-xl bg-[#F7F3EB] border border-[#D8C3A5]">
              <Users className="w-4 h-4 text-[#5B3929] shrink-0 mt-0.5" />
              <div>
                <strong className="block text-[#2B1D16] text-sm">Max 2 Guests</strong>
                Strict occupancy cap. No outside visitors or unregistered guests allowed.
              </div>
            </div>
            <div className="flex items-start gap-2.5 p-3 rounded-xl bg-[#F7F3EB] border border-[#D8C3A5]">
              <AlertCircle className="w-4 h-4 text-[#5B3929] shrink-0 mt-0.5" />
              <div>
                <strong className="block text-[#2B1D16] text-sm">18+ Age Minimum</strong>
                All guests must be at least 18 years old with valid government photo ID.
              </div>
            </div>
            <div className="flex items-start gap-2.5 p-3 rounded-xl bg-[#F7F3EB] border border-[#D8C3A5]">
              <CreditCard className="w-4 h-4 text-[#5B3929] shrink-0 mt-0.5" />
              <div>
                <strong className="block text-[#2B1D16] text-sm">Full Prepayment</strong>
                100% advance payment required to guarantee and lock your reserved hours.
              </div>
            </div>
          </div>
        </div>

        {/* Detailed Sections */}
        <div className="space-y-8 text-[#2B1D16]">
          {/* Section 1 */}
          <section className="bg-[#FCFAF6] p-6 sm:p-8 rounded-2xl border border-[#D8C3A5]">
            <h2 className="font-serif text-xl sm:text-2xl font-bold text-[#2B1D16] mb-4">
              1. Acceptance of Terms
            </h2>
            <div className="space-y-3 text-sm text-[#6E5549] leading-relaxed">
              <p>
                These Terms of Service (&ldquo;Agreement&rdquo;) constitute a legally binding agreement between you (&ldquo;Guest&rdquo;, &ldquo;you&rdquo;) and CozyMoments (&ldquo;CozyMoments&rdquo;, &ldquo;Host&rdquo;, &ldquo;we&rdquo;, &ldquo;us&rdquo;) regarding your temporary license to use our private studio premises situated in Kalwa, Thane, Maharashtra, India.
              </p>
              <p>
                By initiating a booking enquiry, completing advance payment, or entering the studio premises, you explicitly acknowledge having read, understood, and agreed to all provisions set forth herein. If you do not agree with any part of these terms, you must not proceed with the reservation.
              </p>
            </div>
          </section>

          {/* Section 2 */}
          <section className="bg-[#FCFAF6] p-6 sm:p-8 rounded-2xl border border-[#D8C3A5]">
            <h2 className="font-serif text-xl sm:text-2xl font-bold text-[#2B1D16] mb-4">
              2. Booking Terms & Maximum Occupancy
            </h2>
            <div className="space-y-3 text-sm text-[#6E5549] leading-relaxed">
              <p>
                CozyMoments operates on an hourly studio reservation framework, designed for short-stay relaxation, focused remote work, reading, and personal rest:
              </p>
              <ul className="space-y-2 list-disc pl-5">
                <li>
                  <strong className="text-[#2B1D16]">Hourly Rate:</strong> Starting from ₹300 per hour. Specific peak, weekend, or extended slot rates will be displayed clearly during reservation.
                </li>
                <li>
                  <strong className="text-[#2B1D16]">Minimum Duration:</strong> Reservations require a minimum commitment of 2 consecutive hours <span className="font-medium text-[#2B1D16]">[CONFIG]</span>.
                </li>
                <li>
                  <strong className="text-[#2B1D16]">Strict Occupancy Limit:</strong> A maximum of two (2) individuals are permitted on the premises at any given time. Under no circumstances are parties, gatherings, or unregistered visitors permitted.
                </li>
                <li>
                  <strong className="text-[#2B1D16]">Non-Transferable:</strong> Confirmed reservations are personal to the booking individual and cannot be sublet, transferred, or assigned to third parties.
                </li>
              </ul>
            </div>
          </section>

          {/* Section 3 */}
          <section className="bg-[#FCFAF6] p-6 sm:p-8 rounded-2xl border border-[#D8C3A5]">
            <h2 className="font-serif text-xl sm:text-2xl font-bold text-[#2B1D16] mb-4">
              3. Payment Terms & Security
            </h2>
            <div className="space-y-3 text-sm text-[#6E5549] leading-relaxed">
              <p>
                To maintain an orderly schedule and guarantee availability, all bookings must be paid in full prior to arrival:
              </p>
              <ul className="space-y-2 list-disc pl-5">
                <li>
                  <strong className="text-[#2B1D16]">Full Advance Payment:</strong> 100% of the total booking fee must be received through authorized online payment methods (UPI, debit/credit cards, net banking) to confirm your time slot.
                </li>
                <li>
                  <strong className="text-[#2B1D16]">No Cash on Arrival:</strong> In order to maintain contactless, private operations, cash payments at the door are not accepted.
                </li>
                <li>
                  <strong className="text-[#2B1D16]">Security Deposit:</strong> CozyMoments reserves the right to request a refundable damage deposit of ₹1,000 <span className="font-medium text-[#2B1D16]">[CONFIG]</span>, returned within 24 hours after checkout following a satisfactory room inspection.
                </li>
              </ul>
            </div>
          </section>

          {/* Section 4 */}
          <section className="bg-[#FCFAF6] p-6 sm:p-8 rounded-2xl border border-[#D8C3A5]">
            <h2 className="font-serif text-xl sm:text-2xl font-bold text-[#2B1D16] mb-4">
              4. Age & ID Verification Requirements
            </h2>
            <div className="space-y-4 text-sm text-[#6E5549] leading-relaxed">
              <p>
                We maintain strict standards for the safety and legal compliance of our residential community:
              </p>
              <div className="p-4 rounded-xl bg-[#F7F3EB] border border-[#D8C3A5] space-y-2">
                <h4 className="font-semibold text-[#2B1D16] flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#5B3929]" />
                  Age Requirement: 18+ Years Only
                </h4>
                <p className="text-xs text-[#6E5549]">
                  Both guests must be at least 18 years of age at the time of check-in. Minors (individuals under the age of 18) are not permitted unless accompanied by a verified biological parent or court-appointed legal guardian.
                </p>
              </div>
              <ul className="space-y-2 list-disc pl-5">
                <li>
                  <strong className="text-[#2B1D16]">Mandatory Government Photo ID:</strong> Every guest entering the studio must furnish an authentic, government-issued photo identity document (e.g. Passport, Driving License, Voter ID, or Masked Aadhaar Card) prior to digital door access being granted.
                </li>
                <li>
                  <strong className="text-[#2B1D16]">Refusal for Non-Compliance:</strong> Failure or refusal to provide valid ID proofs will result in immediate cancellation of the booking and complete forfeiture of fees.
                </li>
              </ul>
            </div>
          </section>

          {/* Section 5 */}
          <section className="bg-[#FCFAF6] p-6 sm:p-8 rounded-2xl border border-[#D8C3A5]">
            <h2 className="font-serif text-xl sm:text-2xl font-bold text-[#2B1D16] mb-4">
              5. Check-In, Check-Out & Overtime Rules
            </h2>
            <div className="space-y-3 text-sm text-[#6E5549] leading-relaxed">
              <p>
                Because our bookings are scheduled on an hourly basis with dedicated housekeeping slots between guests, punctuality is paramount:
              </p>
              <ul className="space-y-2 list-disc pl-5">
                <li>
                  <strong className="text-[#2B1D16]">Check-in Time:</strong> Access begins exactly at your booked start time. Early check-in is subject to prior host confirmation and availability.
                </li>
                <li>
                  <strong className="text-[#2B1D16]">Check-out Time:</strong> Guests must vacate the premises promptly at or before their scheduled end time.
                </li>
                <li>
                  <strong className="text-[#2B1D16]">Overtime Penalty:</strong> A 10-minute grace period is provided. Overstaying past 10 minutes without prior written extension will incur a penalty equivalent to a full hour&apos;s charge plus a convenience fee of ₹500 <span className="font-medium text-[#2B1D16]">[CONFIG]</span> to compensate the incoming guest and staff.
                </li>
              </ul>
            </div>
          </section>

          {/* Section 6 */}
          <section className="bg-[#FCFAF6] p-6 sm:p-8 rounded-2xl border border-[#D8C3A5]">
            <h2 className="font-serif text-xl sm:text-2xl font-bold text-[#2B1D16] mb-4">
              6. Guest Responsibilities & Property Care
            </h2>
            <div className="space-y-3 text-sm text-[#6E5549] leading-relaxed">
              <p>
                During your stay at CozyMoments, you agree to:
              </p>
              <ul className="space-y-2 list-disc pl-5">
                <li>Treat the property, furnishings, appliances, audio-visual devices, and linens with care and respect.</li>
                <li>Ensure all electrical appliances (AC, lighting, entertainment systems, hot water geysers) are switched off when vacating the property.</li>
                <li>Maintain reasonable cleanliness and dispose of all personal food refuse in the designated trash receptacles.</li>
                <li>Keep the digital lock pin or studio key confidential and do not duplicate or share it with unauthorized individuals.</li>
              </ul>
            </div>
          </section>

          {/* Section 7 */}
          <section className="bg-[#FCFAF6] p-6 sm:p-8 rounded-2xl border border-[#D8C3A5]">
            <h2 className="font-serif text-xl sm:text-2xl font-bold text-[#2B1D16] mb-4">
              7. Prohibited Conduct & Property Rules
            </h2>
            <div className="space-y-3 text-sm text-[#6E5549] leading-relaxed">
              <p>
                The following activities are strictly prohibited on the premises and will result in immediate termination of the reservation without refund:
              </p>
              <ul className="space-y-2 list-disc pl-5">
                <li>
                  <strong className="text-[#2B1D16]">Smoking & Vaping:</strong> No smoking of cigarettes, cigars, hookahs, or vaping inside the studio. A ₹2,000 deep-cleaning fee applies to any indoor smoking violation.
                </li>
                <li>
                  <strong className="text-[#2B1D16]">Loud Noise & Quiet Hours:</strong> No loud music, shouting, or disturbance. Quiet hours are strictly observed between 10:00 PM and 8:00 AM.
                </li>
                <li>
                  <strong className="text-[#2B1D16]">Illegal Activities:</strong> Use, possession, or distribution of illicit narcotics, prohibited substances, weapons, or engagement in commercial exploitation or unlawful acts.
                </li>
                <li>
                  <strong className="text-[#2B1D16]">Commercial Photography & Filming:</strong> Commercial video shoots, adult content creation, or public broadcasts without prior written host approval.
                </li>
                <li>
                  <strong className="text-[#2B1D16]">Pets:</strong> No animals or pets of any kind are permitted inside the studio.
                </li>
              </ul>
            </div>
          </section>

          {/* Section 8 */}
          <section className="bg-[#FCFAF6] p-6 sm:p-8 rounded-2xl border border-[#D8C3A5]">
            <h2 className="font-serif text-xl sm:text-2xl font-bold text-[#2B1D16] mb-4">
              8. Limitation of Liability
            </h2>
            <div className="space-y-3 text-sm text-[#6E5549] leading-relaxed">
              <p>
                To the maximum extent permissible under applicable Indian law:
              </p>
              <ul className="space-y-2 list-disc pl-5">
                <li>
                  <strong className="text-[#2B1D16]">Personal Possessions:</strong> CozyMoments is not responsible for loss, theft, or damage to personal valuables, electronics, or personal effects brought onto the premises.
                </li>
                <li>
                  <strong className="text-[#2B1D16]">Utilities & External Outages:</strong> CozyMoments is not liable for temporary utility interruptions (such as municipal power cuts, broadband ISP outages, or municipal water maintenance) beyond our reasonable operational control.
                </li>
                <li>
                  <strong className="text-[#2B1D16]">Monetary Cap:</strong> In any event, the maximum aggregate liability of CozyMoments arising from any reservation shall be strictly capped at the total amount actually paid by the guest for that specific reservation.
                </li>
              </ul>
            </div>
          </section>

          {/* Section 9 */}
          <section className="bg-[#FCFAF6] p-6 sm:p-8 rounded-2xl border border-[#D8C3A5]">
            <h2 className="font-serif text-xl sm:text-2xl font-bold text-[#2B1D16] mb-4">
              9. Dispute Resolution & Governing Law
            </h2>
            <div className="space-y-3 text-sm text-[#6E5549] leading-relaxed">
              <p>
                <strong className="text-[#2B1D16]">Amicable Resolution:</strong> In the event of any disagreement, grievance, or claim arising out of your booking, both parties agree to first attempt informal resolution in good faith by contacting <a href="mailto:hello@cozymoments.in" className="text-[#5B3929] font-medium hover:underline">hello@cozymoments.in</a> within 14 days of the incident.
              </p>
              <p>
                <strong className="text-[#2B1D16]">Governing Law:</strong> This Agreement shall be governed by, interpreted, and construed exclusively in accordance with the substantive laws of the Republic of India.
              </p>
              <p>
                <strong className="text-[#2B1D16]">Exclusive Jurisdiction:</strong> Any legal action, proceeding, or dispute that cannot be resolved amicably shall fall under the sole and exclusive jurisdiction of the competent courts of <span className="font-medium text-[#2B1D16]">Thane, Maharashtra, India</span>.
              </p>
            </div>
          </section>

          {/* Section 10 */}
          <section className="bg-[#FCFAF6] p-6 sm:p-8 rounded-2xl border border-[#D8C3A5]">
            <h2 className="font-serif text-xl sm:text-2xl font-bold text-[#2B1D16] mb-4">
              10. Contact Information
            </h2>
            <p className="text-sm text-[#6E5549] leading-relaxed mb-4">
              If you have any questions or require clarifications regarding these Terms of Service, please reach out to our management team:
            </p>
            <div className="p-4 rounded-xl bg-[#F7F3EB] border border-[#D8C3A5] text-xs text-[#6E5549] space-y-1.5">
              <p><strong className="text-[#2B1D16]">CozyMoments Legal & Guest Relations</strong></p>
              <p>Kalwa, Thane, Maharashtra 400605, India</p>
              <p>Email: <a href="mailto:hello@cozymoments.in" className="text-[#5B3929] font-medium hover:underline">hello@cozymoments.in</a></p>
              <p>WhatsApp: +91 98765 43210 <span className="text-[#5B3929] font-semibold">[CONFIG]</span></p>
            </div>
          </section>
        </div>

        {/* Quick Links Footer Banner */}
        <div className="mt-12 pt-8 border-t border-[#D8C3A5] flex flex-wrap items-center justify-between gap-4 text-xs text-[#6E5549]">
          <span>Review other policies:</span>
          <div className="flex flex-wrap gap-4 font-medium">
            <Link href="/house-rules" className="hover:text-[#5B3929] transition-colors">
              House Rules
            </Link>
            <Link href="/cancellation-policy" className="hover:text-[#5B3929] transition-colors">
              Cancellation Policy
            </Link>
            <Link href="/privacy" className="hover:text-[#5B3929] transition-colors">
              Privacy Policy
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
