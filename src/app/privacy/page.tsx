import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { 
  ShieldCheck, 
  Lock, 
  Trash2, 
  EyeOff, 
  FileCheck2, 
  Clock, 
  Mail, 
  Phone, 
  MapPin, 
  CheckCircle, 
  ChevronRight,
  Cookie,
  UserCheck
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'Privacy Policy | CozyMoments',
  description: 'Learn how CozyMoments protects your personal information, handles ID verification with auto-deletion, and honors your privacy in Kalwa, Thane.',
  openGraph: {
    title: 'Privacy Policy | CozyMoments',
    description: 'Learn how CozyMoments protects your personal information, handles ID verification with auto-deletion, and honors your privacy in Kalwa, Thane.',
    url: 'https://cozymoments.in/privacy',
  },
};

export default function PrivacyPolicyPage() {
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
              Privacy Policy
            </li>
          </ol>
        </nav>

        {/* Page Header */}
        <header className="mb-10 pb-8 border-b border-[#D8C3A5]">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#EFE9DC] text-[#42281D] text-xs font-semibold uppercase tracking-wider mb-4">
            <ShieldCheck className="w-4 h-4" />
            Discreet & Secure Booking
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#2B1D16] tracking-tight mb-4">
            Privacy Policy
          </h1>
          <p className="text-base sm:text-lg text-[#6E5549] leading-relaxed max-w-2xl font-light">
            At CozyMoments, your privacy is our foundational promise. We believe personal time should remain strictly personal, safeguarded by modern security and thoughtful data ethics.
          </p>
          <div className="mt-4 flex items-center gap-2 text-xs text-[#6E5549]">
            <Clock className="w-3.5 h-3.5 text-[#5B3929]" />
            <span>Last Updated: November 16, 2026</span>
          </div>
        </header>

        {/* Core Privacy Commitments (Key Highlights) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-12">
          <div className="bg-[#FCFAF6] p-5 rounded-2xl border border-[#D8C3A5] shadow-xs flex items-start gap-4">
            <div className="w-10 h-10 rounded-xl bg-[#EFE9DC] text-[#42281D] flex items-center justify-center shrink-0">
              <EyeOff className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-serif text-base font-semibold text-[#2B1D16] mb-1">
                Zero Ad Trackers or Third Parties
              </h3>
              <p className="text-xs text-[#6E5549] leading-relaxed">
                We never sell, rent, or trade your contact or reservation information to ad networks, brokers, or marketing platforms.
              </p>
            </div>
          </div>

          <div className="bg-[#FCFAF6] p-5 rounded-2xl border border-[#D8C3A5] shadow-xs flex items-start gap-4">
            <div className="w-10 h-10 rounded-xl bg-[#EFE9DC] text-[#42281D] flex items-center justify-center shrink-0">
              <Trash2 className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-serif text-base font-semibold text-[#2B1D16] mb-1">
                Auto-Deletion of ID Proofs
              </h3>
              <p className="text-xs text-[#6E5549] leading-relaxed">
                Verification documents uploaded for check-in are permanently deleted after <span className="font-medium text-[#2B1D16]">[CONFIG: 7 days]</span> following your completed stay.
              </p>
            </div>
          </div>

          <div className="bg-[#FCFAF6] p-5 rounded-2xl border border-[#D8C3A5] shadow-xs flex items-start gap-4">
            <div className="w-10 h-10 rounded-xl bg-[#EFE9DC] text-[#42281D] flex items-center justify-center shrink-0">
              <Lock className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-serif text-base font-semibold text-[#2B1D16] mb-1">
                Encrypted Private Storage
              </h3>
              <p className="text-xs text-[#6E5549] leading-relaxed">
                All reservation records and verification documents are encrypted at rest with AES-256 and transmitted over TLS 1.3.
              </p>
            </div>
          </div>

          <div className="bg-[#FCFAF6] p-5 rounded-2xl border border-[#D8C3A5] shadow-xs flex items-start gap-4">
            <div className="w-10 h-10 rounded-xl bg-[#EFE9DC] text-[#42281D] flex items-center justify-center shrink-0">
              <FileCheck2 className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-serif text-base font-semibold text-[#2B1D16] mb-1">
                Strict UIDAI Aadhaar Compliance
              </h3>
              <p className="text-xs text-[#6E5549] leading-relaxed">
                We do not store Aadhaar numbers in any database. Only masked verification images or visual physical inspection are utilized.
              </p>
            </div>
          </div>
        </div>

        {/* Detailed Legal Sections */}
        <div className="space-y-10 text-[#2B1D16]">
          {/* Section 1 */}
          <section className="bg-[#FCFAF6] p-6 sm:p-8 rounded-2xl border border-[#D8C3A5]">
            <h2 className="font-serif text-xl sm:text-2xl font-bold text-[#2B1D16] mb-4">
              1. &ldquo;Because Privacy Matters&rdquo; &mdash; It&rsquo;s Not Just a Tagline
            </h2>
            <div className="space-y-3 text-sm text-[#6E5549] leading-relaxed">
              <p>
                CozyMoments was founded on a simple principle: every individual deserves a dignified, restful, and tranquil space that feels like their own home. Whether you need a calm sanctuary to work remotely, a quiet spot to read and recharge, or a private rest between busy city transits in Kalwa and Thane, your stay is your private domain.
              </p>
              <p>
                Unlike generic commercial venues, we design every touchpoint &mdash; from reservation to contactless entry &mdash; with confidentiality, respect, and utmost discretion. We collect solely the information required by local legal regulations and reservation logistics, and nothing more.
              </p>
            </div>
          </section>

          {/* Section 2 */}
          <section className="bg-[#FCFAF6] p-6 sm:p-8 rounded-2xl border border-[#D8C3A5]">
            <h2 className="font-serif text-xl sm:text-2xl font-bold text-[#2B1D16] mb-4">
              2. What Personal Data We Collect
            </h2>
            <div className="space-y-4 text-sm text-[#6E5549] leading-relaxed">
              <p>
                We collect personal information directly from you when you book our studio, submit an enquiry, or complete guest check-in verification. This includes:
              </p>
              <ul className="space-y-2 list-disc pl-5">
                <li>
                  <strong className="text-[#2B1D16]">Contact Information:</strong> Full legal name, active mobile number (for booking confirmations and studio access details), and email address.
                </li>
                <li>
                  <strong className="text-[#2B1D16]">Reservation Details:</strong> Chosen date, scheduled hourly time slots, number of guests (strictly up to 2), and optional special requests.
                </li>
                <li>
                  <strong className="text-[#2B1D16]">Government-Issued ID Verification:</strong> A valid photograph of an official government ID (such as Passport, Driving License, Voter ID, or Masked Aadhaar) required by Indian municipal regulations for guest record-keeping.
                </li>
                <li>
                  <strong className="text-[#2B1D16]">Payment Confirmation:</strong> Transaction reference IDs generated by RBI-authorized payment processors. <span className="font-medium text-[#2B1D16]">We never collect or store your debit/credit card numbers, CVVs, or UPI PINs.</span>
                </li>
                <li>
                  <strong className="text-[#2B1D16]">Technical Data:</strong> Strict session tokens necessary to navigate the booking workflow securely.
                </li>
              </ul>
            </div>
          </section>

          {/* Section 3 */}
          <section className="bg-[#FCFAF6] p-6 sm:p-8 rounded-2xl border border-[#D8C3A5]">
            <h2 className="font-serif text-xl sm:text-2xl font-bold text-[#2B1D16] mb-4">
              3. How We Use Your Data
            </h2>
            <div className="space-y-3 text-sm text-[#6E5549] leading-relaxed">
              <p>We process your personal information strictly for legitimate, declared purposes:</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2">
                <div className="flex items-start gap-2.5 p-3 rounded-xl bg-[#F7F3EB] border border-[#D8C3A5]">
                  <CheckCircle className="w-4 h-4 text-[#5B3929] shrink-0 mt-0.5" />
                  <span className="text-xs">Confirming your hourly reservation and sending door access instructions.</span>
                </div>
                <div className="flex items-start gap-2.5 p-3 rounded-xl bg-[#F7F3EB] border border-[#D8C3A5]">
                  <CheckCircle className="w-4 h-4 text-[#5B3929] shrink-0 mt-0.5" />
                  <span className="text-xs">Complying with municipal and statutory guest register mandates in Thane, Maharashtra.</span>
                </div>
                <div className="flex items-start gap-2.5 p-3 rounded-xl bg-[#F7F3EB] border border-[#D8C3A5]">
                  <CheckCircle className="w-4 h-4 text-[#5B3929] shrink-0 mt-0.5" />
                  <span className="text-xs">Facilitating customer support, rescheduling, or policy cancellations.</span>
                </div>
                <div className="flex items-start gap-2.5 p-3 rounded-xl bg-[#F7F3EB] border border-[#D8C3A5]">
                  <CheckCircle className="w-4 h-4 text-[#5B3929] shrink-0 mt-0.5" />
                  <span className="text-xs">Preventing fraudulent bookings and protecting the physical security of the premises.</span>
                </div>
              </div>
            </div>
          </section>

          {/* Section 4 */}
          <section className="bg-[#FCFAF6] p-6 sm:p-8 rounded-2xl border border-[#D8C3A5]">
            <h2 className="font-serif text-xl sm:text-2xl font-bold text-[#2B1D16] mb-4">
              4. ID Document Handling & Auto-Deletion
            </h2>
            <div className="space-y-4 text-sm text-[#6E5549] leading-relaxed">
              <p>
                We recognize that sharing identification documents online requires deep trust. To uphold that trust, CozyMoments enforces an automated document lifecycle:
              </p>
              <div className="p-4 rounded-xl bg-[#F7F3EB] border-l-4 border-[#5B3929] space-y-2">
                <h4 className="font-semibold text-[#2B1D16] flex items-center gap-2">
                  <UserCheck className="w-4 h-4 text-[#5B3929]" />
                  Automated Deletion Guarantee
                </h4>
                <p className="text-xs text-[#6E5549] leading-relaxed">
                  All digital copies of identity proofs submitted for entry verification are isolated in an encrypted bucket and scheduled for permanent, irreversible deletion after <strong className="text-[#2B1D16]">[CONFIG: 7 days]</strong> post-checkout. Only non-sensitive audit metadata (guest name, entry timestamp, verification status) is retained in the physical/digital register as mandated by local authorities.
                </p>
              </div>
              <ul className="space-y-2 list-disc pl-5">
                <li>
                  <strong>Private Access:</strong> Uploaded IDs are accessible only by the verified property manager for check-in compliance and are never exposed publicly.
                </li>
                <li>
                  <strong>At-Rest Encryption:</strong> All verification attachments are stored using strong AES-256 cloud encryption.
                </li>
              </ul>
            </div>
          </section>

          {/* Section 5 */}
          <section className="bg-[#FCFAF6] p-6 sm:p-8 rounded-2xl border border-[#D8C3A5]">
            <h2 className="font-serif text-xl sm:text-2xl font-bold text-[#2B1D16] mb-4">
              5. Specific Policy on Aadhaar Cards (UIDAI Guidelines)
            </h2>
            <div className="space-y-3 text-sm text-[#6E5549] leading-relaxed">
              <p>
                In strict compliance with the Unique Identification Authority of India (UIDAI) regulations and relevant Supreme Court rulings:
              </p>
              <ul className="space-y-2 list-disc pl-5">
                <li>
                  <strong>No Aadhaar Number Storage:</strong> We do <strong className="text-[#2B1D16]">not</strong> extract, index, or store 12-digit Aadhaar numbers in any database.
                </li>
                <li>
                  <strong>Masked Aadhaar Accepted:</strong> If you choose to submit an Aadhaar card as your identification, we encourage you to upload a <em>Masked Aadhaar</em> (where the first 8 digits are hidden as XXXX-XXXX per UIDAI guidelines).
                </li>
                <li>
                  <strong>No Biometric Data:</strong> CozyMoments does not request, collect, or process any biometric indicators (fingerprints, iris scans).
                </li>
                <li>
                  <strong>Alternative Photo IDs:</strong> Guests may freely provide any alternative government-issued photo ID, such as an Indian Passport, Driving License, or Voter Identity Card.
                </li>
              </ul>
            </div>
          </section>

          {/* Section 6 */}
          <section className="bg-[#FCFAF6] p-6 sm:p-8 rounded-2xl border border-[#D8C3A5]">
            <h2 className="font-serif text-xl sm:text-2xl font-bold text-[#2B1D16] mb-4">
              6. No Ad Tracking & No Third-Party Data Sharing
            </h2>
            <div className="space-y-3 text-sm text-[#6E5549] leading-relaxed">
              <p>
                Your privacy is not for sale. We maintain a zero-compromise position against monetization of guest information:
              </p>
              <ul className="space-y-2 list-disc pl-5">
                <li>We do not partner with behavioral data brokers or advertising exchanges.</li>
                <li>We do not embed third-party remarketing pixels (such as Meta Pixel or Google Ads tracking) that trace your movements across the web.</li>
                <li>We do not send unsolicited marketing text messages, promotional spam, or promotional telemarketing calls.</li>
                <li>We disclose information to law enforcement agencies solely in response to legitimate, binding legal orders or statutory obligations issued by Indian courts or authorized police officials.</li>
              </ul>
            </div>
          </section>

          {/* Section 7 */}
          <section className="bg-[#FCFAF6] p-6 sm:p-8 rounded-2xl border border-[#D8C3A5]">
            <h2 className="font-serif text-xl sm:text-2xl font-bold text-[#2B1D16] mb-4">
              7. Cookies & Session Storage
            </h2>
            <div className="space-y-3 text-sm text-[#6E5549] leading-relaxed">
              <div className="flex items-start gap-3">
                <Cookie className="w-5 h-5 text-[#5B3929] shrink-0 mt-0.5" />
                <p>
                  CozyMoments uses only <strong className="text-[#2B1D16]">strictly essential session cookies</strong>. These cookies are technical files necessary to keep your booking session alive, maintain form inputs, and ensure cryptographic protection against Cross-Site Request Forgery (CSRF). We do not use third-party analytics or behavioral cookies.
                </p>
              </div>
            </div>
          </section>

          {/* Section 8 */}
          <section className="bg-[#FCFAF6] p-6 sm:p-8 rounded-2xl border border-[#D8C3A5]">
            <h2 className="font-serif text-xl sm:text-2xl font-bold text-[#2B1D16] mb-4">
              8. Data Retention & Your Rights
            </h2>
            <div className="space-y-3 text-sm text-[#6E5549] leading-relaxed">
              <p>
                Under Indian information technology and digital personal data protection laws, you retain the following rights regarding your personal information:
              </p>
              <ul className="space-y-2 list-disc pl-5">
                <li><strong>Right of Access:</strong> You may request a summary of the personal data we hold associated with your past reservations.</li>
                <li><strong>Right to Rectification:</strong> You may request corrections to inaccurate or outdated contact information.</li>
                <li><strong>Right to Erasure:</strong> You may request the expedited deletion of your contact records once statutory record-keeping periods have concluded.</li>
              </ul>
              <p>
                To exercise any of these rights, simply email our team at <a href="mailto:privacy@cozymoments.in" className="text-[#5B3929] font-medium hover:underline">privacy@cozymoments.in</a> with your booking confirmation reference.
              </p>
            </div>
          </section>

          {/* Section 9 */}
          <section className="bg-[#FCFAF6] p-6 sm:p-8 rounded-2xl border border-[#D8C3A5]">
            <h2 className="font-serif text-xl sm:text-2xl font-bold text-[#2B1D16] mb-4">
              9. Privacy Queries & Contact Information
            </h2>
            <div className="space-y-4 text-sm text-[#6E5549] leading-relaxed">
              <p>
                If you have questions, feedback, or concerns regarding our privacy practices or wish to review your data handling, please reach out to our dedicated privacy contact:
              </p>
              
              <div className="p-5 rounded-xl bg-[#F7F3EB] border border-[#D8C3A5] space-y-3">
                <div className="font-serif text-base font-semibold text-[#2B1D16]">
                  CozyMoments Privacy & Grievance Desk
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-[#6E5549]">
                  <div className="flex items-center gap-2">
                    <Mail className="w-4 h-4 text-[#5B3929]" />
                    <span>Email: <a href="mailto:privacy@cozymoments.in" className="text-[#2B1D16] font-medium hover:text-[#5B3929]">privacy@cozymoments.in</a></span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone className="w-4 h-4 text-[#5B3929]" />
                    <span>WhatsApp: <a href="https://wa.me/919876543210" target="_blank" rel="noopener noreferrer" className="text-[#2B1D16] font-medium hover:text-[#5B3929]">+91 98765 43210</a></span>
                  </div>
                  <div className="flex items-center gap-2 sm:col-span-2">
                    <MapPin className="w-4 h-4 text-[#5B3929]" />
                    <span>Location: Kalwa, Thane, Maharashtra 400605, India</span>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>

        {/* Bottom Banner */}
        <div className="mt-12 p-6 sm:p-8 rounded-2xl bg-[#EFE9DC] border border-[#5B3929]/30 text-center space-y-4">
          <h2 className="font-serif text-xl sm:text-2xl font-bold text-[#2B1D16]">
            Ready for a calm, private break?
          </h2>
          <p className="text-sm text-[#6E5549] max-w-xl mx-auto">
            Book your private studio time in Kalwa starting from ₹300/hour. Uncompromising privacy, pristine comfort, and peace of mind.
          </p>
          <div className="pt-2 flex flex-wrap justify-center gap-4">
            <Link
              href="/book"
              className="px-6 py-2.5 rounded-full bg-[#5B3929] text-[#FCFAF6] text-sm font-semibold hover:bg-[#42281D] transition-colors shadow-sm"
            >
              Reserve Studio Slot
            </Link>
            <Link
              href="/contact"
              className="px-6 py-2.5 rounded-full bg-[#FCFAF6] border border-[#D8C3A5] text-[#2B1D16] text-sm font-semibold hover:bg-[#F7F3EB] transition-colors"
            >
              Contact Support
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
