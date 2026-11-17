import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import ContactForm from '@/components/ContactForm';
import { 
  MessageSquare, 
  Mail, 
  MapPin, 
  Clock, 
  Zap, 
  ChevronRight, 
  ExternalLink,
  MessageCircle,
  Building,
  ShieldCheck
} from 'lucide-react';
import { CONFIG } from '@/lib/config';

export const metadata: Metadata = {
  title: 'Contact Us | CozyMoments',
  description: 'Reach CozyMoments private studio in Kalwa, Thane. Contact us via WhatsApp, email, or our direct inquiry form. We reply during operating hours.',
  openGraph: {
    title: 'Contact Us | CozyMoments',
    description: 'Reach CozyMoments private studio in Kalwa, Thane. Contact us via WhatsApp, email, or our direct inquiry form.',
    url: 'https://cozymoments.in/contact',
  },
};

export default function ContactPage() {
  const whatsappUrl = `https://wa.me/${CONFIG.WHATSAPP_NUMBER.replace(/[^0-9]/g, '')}?text=${encodeURIComponent('Hi CozyMoments, I have an enquiry regarding a studio booking')}`;

  return (
    <div className="w-full bg-cream text-charcoal flex-1">
      <main className="max-w-[1200px] mx-auto px-6 py-12 md:py-16 w-full flex-1">
        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" className="mb-6">
          <ol className="flex items-center gap-2 text-xs font-medium text-umber">
            <li>
              <Link href="/" className="hover:text-charcoal transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-sage-deep rounded-xs">
                Home
              </Link>
            </li>
            <li>
              <ChevronRight className="w-3.5 h-3.5 text-sand" />
            </li>
            <li>
              <Link href="/studio" className="hover:text-charcoal transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-sage-deep rounded-xs">
                The Studio
              </Link>
            </li>
            <li>
              <ChevronRight className="w-3.5 h-3.5 text-sand" />
            </li>
            <li className="text-charcoal font-semibold" aria-current="page">
              Contact
            </li>
          </ol>
        </nav>

        {/* Page Header */}
        <header className="mb-10 pb-8 border-b border-sand">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-sand/30 border border-sand text-espresso text-xs font-medium mb-3">
            <MessageSquare className="w-3.5 h-3.5 text-sage" />
            <span>Direct concierge desk</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-charcoal tracking-tight mb-3">
            Contact us
          </h1>
          <p className="text-base sm:text-lg text-umber leading-relaxed max-w-2xl font-light">
            Have a question about studio availability, hourly rates, amenities, or special requests? Reach out through any of our direct channels below.
          </p>
        </header>

        {/* Response-Time Banner (Sand background, approved response sentence) */}
        <div className="mb-10 p-4 sm:p-5 rounded-2xl bg-sand/30 border border-sand flex items-center gap-3.5 text-xs sm:text-sm text-charcoal">
          <div className="w-9 h-9 rounded-xl bg-espresso text-ivory flex items-center justify-center shrink-0 shadow-2xs">
            <Zap className="w-4 h-4 text-sand" />
          </div>
          <div className="space-y-0.5">
            <span className="font-bold text-charcoal">Operating hours response:</span>
            <p className="text-umber">
              We reply during operating hours (8:00 AM to 11:00 PM).
            </p>
          </div>
        </div>

        {/* Two-Column Layout: Direct Contact Info & Interactive Form */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-12">
          {/* Left Column: Direct Methods (5 cols on lg) */}
          <div className="lg:col-span-5 space-y-5">
            <h2 className="font-serif text-xl sm:text-2xl font-bold text-charcoal">
              Direct contact methods
            </h2>

            {/* WhatsApp Card: 1px sand border, ivory fill, 16px radius, no heavy dark border */}
            <div className="bg-ivory p-6 rounded-2xl border border-sand shadow-xs space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-xl bg-sand/30 text-espresso flex items-center justify-center shrink-0 border border-sand">
                  <MessageCircle className="w-5 h-5 fill-espresso text-espresso" />
                </div>
                <div>
                  <h3 className="font-serif font-bold text-charcoal text-base">
                    Chat on WhatsApp
                  </h3>
                  <p className="text-xs text-sage-deep font-semibold">
                    Fast response & direct assistance
                  </p>
                </div>
              </div>

              <p className="text-xs text-umber leading-relaxed">
                Connect directly with our studio concierge for immediate slot inquiries, check-in instructions, and quick questions.
              </p>

              {/* WhatsApp button: espresso background, ivory text, WhatsApp icon */}
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-2.5 px-5 py-3 rounded-full bg-espresso hover:bg-espresso-dark active:scale-[0.99] text-ivory font-semibold text-sm transition-all shadow-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-sage-deep"
              >
                <MessageCircle className="w-4 h-4 fill-ivory text-ivory" />
                <span>Message +91 98765 43210 [to confirm]</span>
              </a>
            </div>

            {/* Email Card: 1px sand border, ivory fill, 16px radius */}
            <div className="bg-ivory p-5 rounded-2xl border border-sand shadow-xs space-y-2">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-sand/30 text-espresso flex items-center justify-center shrink-0 border border-sand">
                  <Mail className="w-4 h-4 text-sage" />
                </div>
                <div>
                  <h3 className="font-serif font-bold text-sm text-charcoal">
                    Email support
                  </h3>
                  <a
                    href="mailto:hello@cozymoments.in"
                    className="text-xs text-espresso font-semibold hover:underline focus:outline-none focus-visible:ring-1 focus-visible:ring-sage-deep rounded-xs"
                  >
                    hello@cozymoments.in [to confirm]
                  </a>
                </div>
              </div>
              <p className="text-xs text-umber pt-1">
                For detailed booking inquiries, cancellations, or host assistance.
              </p>
            </div>

            {/* Operating Hours Card: 1px sand border, ivory fill, 16px radius */}
            <div className="bg-ivory p-5 rounded-2xl border border-sand shadow-xs space-y-2">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-sand/30 text-espresso flex items-center justify-center shrink-0 border border-sand">
                  <Clock className="w-4 h-4 text-sage" />
                </div>
                <div>
                  <h3 className="font-serif font-bold text-sm text-charcoal">
                    Operating hours
                  </h3>
                  <p className="text-xs font-semibold text-charcoal">
                    8:00 AM &ndash; 11:00 PM (Monday to Sunday)
                  </p>
                </div>
              </div>
              <p className="text-xs text-umber pt-1">
                Messages received after 11:00 PM are promptly answered first thing the next morning at 8:00 AM.
              </p>
            </div>

            {/* Location Card: 1px sand border, ivory fill, 16px radius */}
            <div className="bg-ivory p-5 rounded-2xl border border-sand shadow-xs space-y-2">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-sand/30 text-espresso flex items-center justify-center shrink-0 border border-sand">
                  <MapPin className="w-4 h-4 text-sage" />
                </div>
                <div>
                  <h3 className="font-serif font-bold text-sm text-charcoal">
                    Studio location
                  </h3>
                  <p className="text-xs font-semibold text-charcoal">
                    Kalwa, Thane, Maharashtra 400605 [to confirm], India
                  </p>
                </div>
              </div>
              <p className="text-xs text-umber pt-1">
                Located in a quiet residential area, just 5 minutes from Kalwa Station and 10 minutes from Thane West. Exact door coordinates and digital PIN are transmitted upon confirmed booking.
              </p>
            </div>
          </div>

          {/* Right Column: Contact Form (7 cols on lg) */}
          <div className="lg:col-span-7">
            <ContactForm />
          </div>
        </div>

        {/* Map Embed Section */}
        <section className="bg-ivory p-6 sm:p-8 rounded-2xl border border-sand mb-12 space-y-4 shadow-xs">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <div className="flex items-center gap-1.5 text-sage mb-1">
                <Building className="w-4 h-4" />
                <span className="text-xs font-semibold uppercase tracking-wider text-espresso">Neighborhood map</span>
              </div>
              <h2 className="font-serif text-xl sm:text-2xl font-bold text-charcoal">
                Our location in Kalwa, Thane
              </h2>
            </div>
            <a
              href="https://maps.google.com/?q=Kalwa,+Thane,+Maharashtra"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-sage-deep hover:text-charcoal transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-sage-deep rounded-xs"
            >
              <span>Open in Google Maps</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>

          <p className="text-xs sm:text-sm text-umber leading-relaxed">
            CozyMoments is conveniently situated in Kalwa, offering seamless road connectivity to Thane City, Airoli (Navi Mumbai), and the Eastern Express Highway.
          </p>

          {/* Map iframe embed */}
          <div className="w-full h-80 sm:h-96 rounded-xl overflow-hidden border border-sand relative bg-cream">
            <iframe
              title="CozyMoments Location Map in Kalwa, Thane"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15073.49162985338!2d72.9863806!3d19.190308!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7b93855555555%3A0x6b8bc6b5f9226cb!2sKalwa%2C%20Thane%2C%20Maharashtra!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen={false}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="w-full h-full grayscale-[25%] contrast-[1.05]"
            />
          </div>
        </section>

        {/* Privacy Note */}
        <div className="p-4 rounded-xl bg-sand/30 border border-sand flex items-center gap-3 text-xs text-charcoal">
          <ShieldCheck className="w-5 h-5 text-sage shrink-0" />
          <p className="text-umber">
            For privacy and security reasons, exact studio apartment numbers and digital entry PIN codes are transmitted exclusively to registered guests upon booking confirmation.
          </p>
        </div>
      </main>
    </div>
  );
}
