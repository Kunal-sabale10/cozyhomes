'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight, MessageCircle } from 'lucide-react';
import { CONFIG } from '@/lib/config';
import { formatCurrency } from '@/lib/utils';

export default function CTASection() {
  const whatsappUrl = `https://wa.me/${CONFIG.WHATSAPP_NUMBER.replace(/[^0-9]/g, '')}?text=${encodeURIComponent('Hi! I would like to know more about booking the CozyMoments studio.')}`;

  return (
    <section className="py-16 md:py-20 bg-beige">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
        <h2 className="font-serif text-3xl sm:text-4xl font-bold text-charcoal">
          Ready to Book Your Private Retreat?
        </h2>
        <p className="mt-4 text-lg text-charcoal-light">
          Starting at just {formatCurrency(CONFIG.RATE_PER_HOUR_INR)} per hour.
          Your comfort, your privacy, your space.
        </p>

        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/book"
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-sage text-warm-white font-semibold text-base hover:bg-sage-dark active:scale-95 transition-all shadow-md focus-visible:ring-2 focus-visible:ring-sage focus-visible:ring-offset-2"
          >
            Book Now
            <ArrowRight className="w-4 h-4" />
          </Link>
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-green-600 text-white font-semibold text-base hover:bg-green-700 active:scale-95 transition-all shadow-md focus-visible:ring-2 focus-visible:ring-green-500 focus-visible:ring-offset-2"
          >
            <MessageCircle className="w-4 h-4" />
            Chat on WhatsApp
          </a>
        </div>

        <p className="mt-6 text-sm text-warm-gray">
          Have questions? We typically respond within 1 hour during operating hours.
        </p>
      </div>
    </section>
  );
}
