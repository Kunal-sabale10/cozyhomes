import React from 'react';
import Link from 'next/link';
import { ShieldCheck, MessageCircle, MapPin, Mail, Clock } from 'lucide-react';
import { CONFIG } from '@/lib/config';

export default function Footer() {
  const whatsappUrl = `https://wa.me/${CONFIG.WHATSAPP_NUMBER.replace(/[^0-9]/g, '')}?text=${encodeURIComponent('Hi CozyMoments Concierge! I have an enquiry regarding booking the private studio in Kalwa.')}`;

  return (
    <footer className="w-full bg-espresso text-ivory border-t border-sand/40 mt-auto" aria-labelledby="footer-heading">
      <h2 id="footer-heading" className="sr-only">Footer</h2>
      
      {/* Upper Footer CTA Strip — matches --espresso and uses max-w-[1200px] px-6 */}
      <div className="border-b border-sand/20 py-8 bg-espresso">
        <div className="max-w-[1200px] mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-center sm:text-left">
            <span className="text-xs uppercase tracking-widest text-sand font-semibold">
              Personalized Assistance
            </span>
            <p className="font-serif text-xl font-bold text-ivory mt-0.5">
              Have questions about your booking?
            </p>
          </div>
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2.5 px-6 py-3 rounded-full bg-espresso text-ivory border border-sand hover:bg-espresso-dark active:scale-95 transition-all shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-sand font-semibold text-sm"
          >
            <MessageCircle className="w-4 h-4 fill-ivory text-ivory" />
            <span>Chat on WhatsApp</span>
          </a>
        </div>
      </div>

      {/* Main Footer Content — max-w-[1200px] px-6 */}
      <div className="max-w-[1200px] mx-auto px-6 py-14 md:py-18">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 md:gap-8">
          
          {/* Brand & Tagline */}
          <div className="space-y-4 md:col-span-1">
            <Link href="/" className="inline-block group focus:outline-none focus-visible:ring-2 focus-visible:ring-sand rounded">
              <span className="font-serif text-2xl font-bold tracking-tight text-ivory">
                CozyMoments
              </span>
              <p className="text-xs text-sand font-semibold tracking-wide uppercase mt-0.5">
                {CONFIG.SITE_TAGLINE}
              </p>
            </Link>
            <p className="text-sm text-sand/90 leading-relaxed font-light">
              A private, peaceful, and thoughtfully styled studio apartment in Kalwa, Thane. Reserved exclusively by the hour for calm work, restful pauses, and quiet stays.
            </p>
            <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-sand/15 text-sand text-xs font-semibold border border-sand/30">
              <ShieldCheck className="w-4 h-4 text-sand" />
              <span>Private, single-unit stay.</span>
            </div>
          </div>

          {/* Direct Navigation */}
          <div className="space-y-3">
            <h3 className="font-serif text-base font-bold text-ivory">Explore</h3>
            <ul className="space-y-2.5 text-sm text-sand/90">
              <li>
                <Link href="/" className="hover:text-ivory transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/studio" className="hover:text-ivory transition-colors">
                  The Studio
                </Link>
              </li>
              <li>
                <Link href="/book" className="hover:text-ivory transition-colors">
                  Reserve a Slot (₹300/hr)
                </Link>
              </li>
              <li>
                <Link href="/house-rules" className="hover:text-ivory transition-colors">
                  House Rules
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-ivory transition-colors">
                  Contact & Directions
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal & Policy Links */}
          <div className="space-y-3">
            <h3 className="font-serif text-base font-bold text-ivory">Trust & Policies</h3>
            <ul className="space-y-2.5 text-sm text-sand/90">
              <li>
                <Link href="/privacy" className="hover:text-ivory transition-colors">
                  Privacy & ID Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-ivory transition-colors">
                  Terms of Service (18+ & Max 2)
                </Link>
              </li>
              <li>
                <Link href="/cancellation-policy" className="hover:text-ivory transition-colors">
                  Cancellation & Refunds
                </Link>
              </li>
              <li>
                <Link href="/house-rules" className="hover:text-ivory transition-colors">
                  Quiet Hours & Conduct
                </Link>
              </li>
            </ul>
          </div>

          {/* Location & Operating Details */}
          <div className="space-y-3">
            <h3 className="font-serif text-base font-bold text-ivory">Direct Desk</h3>
            <div className="space-y-2 text-xs text-sand/90 leading-relaxed">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-sand shrink-0 mt-0.5" />
                <span>Kalwa, Thane (Maharashtra) · 400605 [to confirm]</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-sand shrink-0" />
                <span>Operating Hours: 08:00 – 23:00 IST</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-sand shrink-0" />
                <span>hello@cozymoments.in [to confirm]</span>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Copyright & Disclaimer */}
        <div className="mt-12 pt-8 border-t border-sand/20 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-sand/90">
          <p>© 2026 CozyMoments. All rights reserved. Single-unit private booking.</p>
          <p className="text-sand font-medium">Because Privacy Matters · Kalwa, Thane</p>
        </div>
      </div>
    </footer>
  );
}
