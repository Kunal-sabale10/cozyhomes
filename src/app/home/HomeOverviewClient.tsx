'use client';

import React from 'react';
import Link from 'next/link';
import { motion, useReducedMotion } from 'framer-motion';
import {
  Clock,
  CalendarCheck,
  Users,
  MapPin,
  ShieldCheck,
  CreditCard,
  ArrowRight,
  MessageCircle,
  HelpCircle,
  FileText,
  DoorOpen,
  Mail,
  Phone,
  Info,
} from 'lucide-react';
import Hero from '@/components/home/Hero';
import { CONFIG } from '@/lib/config';
import { formatCurrency } from '@/lib/utils';

export default function HomeOverviewClient() {
  const shouldReduceMotion = useReducedMotion();

  const whatsappUrl = `https://wa.me/${CONFIG.WHATSAPP_NUMBER.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(
    'Hi CozyMoments Concierge! I am visiting from the Home overview page and would like to know more about the studio.'
  )}`;

  const quickFacts = [
    {
      icon: Clock,
      title: 'Hourly Rate',
      value: `From ${formatCurrency(CONFIG.RATE_PER_HOUR_INR)} / hour`,
      description: 'Single-unit private studio with zero hidden check-in surcharges.',
    },
    {
      icon: CalendarCheck,
      title: 'Flexible Stays',
      value: '1 to 12 Hours',
      description: 'Instant slot hold & immediate booking confirmation with no host delay.',
    },
    {
      icon: Users,
      title: 'Studio Capacity',
      value: 'Up to [2] people',
      description: 'Strict 2-guest cap ensuring quiet residential privacy [CONFIG: 18+ attestation].',
    },
    {
      icon: MapPin,
      title: 'Prime Location',
      value: 'Kalwa, Thane',
      description: 'Quiet enclave ~5 mins from Kalwa Station & ~10 mins from Thane West.',
    },
  ];

  const gettingStartedSteps = [
    {
      step: '1',
      icon: CalendarCheck,
      title: 'Choose Your Slot',
      desc: 'Select your date and duration from 1 to 12 hours between 08:00 and 23:00. Every slot includes a 30-minute sanitization buffer.',
    },
    {
      step: '2',
      icon: ShieldCheck,
      title: 'Verify Your ID',
      desc: 'Upload a clear photo of your Aadhaar (masked), Passport, DL, or Voter ID. Stored securely [CONFIG: AES-256-GCM] with no full Aadhaar numbers stored.',
    },
    {
      step: '3',
      icon: CreditCard,
      title: 'Confirm and Pay',
      desc: 'Complete payment to lock in your reservation. Receive instantaneous directions and your confidential digital smart lock entrance PIN.',
    },
  ];

  const quickLinks = [
    {
      title: 'The Studio Space',
      href: '/studio',
      icon: DoorOpen,
      desc: 'Explore the photo gallery, full amenities list, and complete 1–12 hours rate table.',
    },
    {
      title: 'House Rules',
      href: '/house-rules',
      icon: FileText,
      desc: 'Important guidelines on quiet hours (10 PM to 8 AM), non-smoking policy, and conduct.',
    },
    {
      title: 'Cancellation Policy',
      href: '/cancellation-policy',
      icon: Info,
      desc: 'Transparent cancellation tiers: 100% refund (>24h), 50% refund (12–24h), and rescheduling.',
    },
    {
      title: 'Contact & Directions',
      href: '/contact',
      icon: Mail,
      desc: 'Get in touch directly with our Kalwa desk or send an inquiry for special arrangements.',
    },
    {
      title: 'Frequently Asked Questions',
      href: '/#faq',
      icon: HelpCircle,
      desc: 'Detailed answers on privacy, ID requirements, keyless self check-in, and parking.',
    },
  ];

  return (
    <div className="bg-ivory text-charcoal min-h-screen">
      
      {/* 1. Hero with integrated booking card */}
      <Hero />

      {/* 2. Quick Facts */}
      <section className="py-16 lg:py-24 max-w-6xl mx-auto px-4 sm:px-6" aria-labelledby="quick-facts-heading">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="text-xs font-semibold uppercase tracking-widest text-espresso bg-sand/30 px-3 py-1 rounded-full">
            Key Information
          </span>
          <h2 id="quick-facts-heading" className="font-serif text-3xl sm:text-4xl font-bold text-espresso tracking-tight mt-3">
            Studio Quick Facts
          </h2>
          <p className="mt-3 text-sm text-charcoal-muted">
            The core details you need to know before reserving your hours.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {quickFacts.map((fact, index) => {
            const Icon = fact.icon;
            return (
              <motion.div
                key={fact.title}
                initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.45, delay: shouldReduceMotion ? 0 : index * 0.1 }}
                className="p-6 rounded-2xl bg-warm-white border border-sand/70 shadow-xs hover:border-espresso/40 hover:shadow-md transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="w-12 h-12 rounded-xl bg-sand/25 flex items-center justify-center text-espresso mb-4 border border-sand/50">
                    <Icon className="w-6 h-6" />
                  </div>
                  <span className="text-xs font-semibold uppercase tracking-wider text-charcoal-muted block mb-1">
                    {fact.title}
                  </span>
                  <h3 className="font-serif text-xl font-bold text-espresso mb-2">
                    {fact.value}
                  </h3>
                  <p className="text-xs text-charcoal-muted leading-relaxed">
                    {fact.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* 3. How to Get Started */}
      <section className="py-16 lg:py-24 bg-cream border-y border-sand/60" aria-labelledby="how-to-start-heading">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs font-semibold uppercase tracking-widest text-espresso bg-ivory px-3 py-1 rounded-full border border-sand">
              Seamless Process
            </span>
            <h2 id="how-to-start-heading" className="font-serif text-3xl sm:text-4xl font-bold text-espresso tracking-tight mt-3">
              How to Get Started
            </h2>
            <p className="mt-3 text-sm text-charcoal-muted">
              Book your private stay in three straightforward steps.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {gettingStartedSteps.map((step, index) => {
              const Icon = step.icon;
              return (
                <motion.div
                  key={step.title}
                  initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 25 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-50px' }}
                  transition={{ duration: 0.5, delay: shouldReduceMotion ? 0 : index * 0.15 }}
                  className="bg-warm-white rounded-2xl p-7 border border-sand/70 shadow-xs relative flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-5">
                      <span className="w-8 h-8 rounded-full bg-espresso text-ivory text-xs font-bold flex items-center justify-center font-mono">
                        {step.step}
                      </span>
                      <div className="w-10 h-10 rounded-xl bg-sand/20 flex items-center justify-center text-espresso">
                        <Icon className="w-5 h-5" />
                      </div>
                    </div>
                    <h3 className="font-serif text-lg font-bold text-charcoal mb-2.5">
                      {step.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-charcoal-muted leading-relaxed">
                      {step.desc}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>

          <div className="mt-12 text-center">
            <Link
              href="/"
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-espresso text-ivory text-sm font-semibold hover:bg-espresso-dark active:scale-95 transition-all shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-espresso"
            >
              Go to Booking Widget on Front Page
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* 4. Quick Links */}
      <section className="py-16 lg:py-24 max-w-6xl mx-auto px-4 sm:px-6" aria-labelledby="quick-links-heading">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="text-xs font-semibold uppercase tracking-widest text-espresso bg-sand/30 px-3 py-1 rounded-full">
            Navigation
          </span>
          <h2 id="quick-links-heading" className="font-serif text-3xl sm:text-4xl font-bold text-espresso tracking-tight mt-3">
            Explore CozyMoments
          </h2>
          <p className="mt-3 text-sm text-charcoal-muted">
            Direct shortcuts to key information and policies across our property.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {quickLinks.map((link) => {
            const Icon = link.icon;
            return (
              <Link
                key={link.title}
                href={link.href}
                className="group p-6 rounded-2xl bg-warm-white border border-sand/70 shadow-xs hover:border-espresso/40 hover:shadow-md transition-all flex flex-col justify-between focus:outline-none focus-visible:ring-2 focus-visible:ring-espresso"
              >
                <div>
                  <div className="w-10 h-10 rounded-xl bg-sand/20 group-hover:bg-espresso group-hover:text-ivory transition-colors flex items-center justify-center text-espresso mb-4">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="font-serif text-lg font-bold text-charcoal group-hover:text-espresso transition-colors mb-2">
                    {link.title}
                  </h3>
                  <p className="text-xs text-charcoal-muted leading-relaxed">
                    {link.desc}
                  </p>
                </div>
                <div className="mt-5 flex items-center gap-1.5 text-xs font-semibold text-espresso group-hover:translate-x-1 transition-transform">
                  <span>Visit page</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      {/* 5. Contact Strip */}
      <section className="bg-sand/25 border-t border-sand/70 py-16 lg:py-20" aria-labelledby="contact-strip-heading">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <span className="text-xs font-semibold uppercase tracking-widest text-espresso bg-ivory px-3 py-1 rounded-full border border-sand">
            Direct Concierge Desk
          </span>
          <h2 id="contact-strip-heading" className="font-serif text-3xl sm:text-4xl font-bold text-espresso tracking-tight mt-3">
            Have Any Questions?
          </h2>
          <p className="mt-3 text-sm text-charcoal-muted max-w-lg mx-auto">
            Our local Kalwa host team is available to assist you with inquiries, scheduling, or arrival details.
          </p>

          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-full bg-espresso text-ivory font-semibold text-sm hover:bg-espresso-dark active:scale-95 transition-all shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-espresso"
            >
              <MessageCircle className="w-4 h-4 fill-ivory" />
              Chat on WhatsApp
            </a>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-warm-white text-espresso border border-sand font-semibold text-sm hover:bg-ivory transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-espresso"
            >
              Send an Email Inquiry
            </Link>
          </div>

          {/* Placeholders in [brackets] kept visible */}
          <div className="mt-8 pt-6 border-t border-sand/40 flex flex-wrap items-center justify-center gap-6 text-xs text-charcoal-muted">
            <span className="flex items-center gap-1.5">
              <Phone className="w-3.5 h-3.5 text-espresso" />
              <span>[CONFIG: +91 98765 43210 / Host Phone]</span>
            </span>
            <span className="flex items-center gap-1.5">
              <Mail className="w-3.5 h-3.5 text-espresso" />
              <span>[CONFIG: hello@cozymoments.in / Host Email]</span>
            </span>
            <span className="flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-espresso" />
              <span>[CONFIG: 08:00 – 23:00 IST / Host Operating Hours]</span>
            </span>
          </div>
        </div>
      </section>

    </div>
  );
}
