'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { Plus, MessageCircle, ArrowRight } from 'lucide-react';
import { CONFIG } from '@/lib/config';

interface FAQItemData {
  question: string;
  answer: string;
}

const faqs: FAQItemData[] = [
  {
    question: 'How does hourly booking work?',
    answer:
      'Select your date, start time, and duration (1 to 12 hours) on the booking card. Your slot is immediately held for 10 minutes while you enter guest details, upload your ID, and complete payment. Confirmation is instant with no manual approval step.',
  },
  {
    question: 'What ID is required to book?',
    answer:
      'We accept Aadhaar card (masked), passport, driving licence, and voter ID. In strict adherence to UIDAI regulations, we do not collect or store full 12-digit Aadhaar numbers. All documents are stored in encrypted private storage [CONFIG: AES-256-GCM] and deleted after [CONFIG: 7 days after checkout / Owner confirmation].',
  },
  {
    question: 'Is the space completely private?',
    answer:
      'Yes, completely. The entire studio apartment is reserved exclusively for your booked hours. There are no common hallways inside the apartment, no shared rooms, and no host or other guests present on premise [Placeholder].',
  },
  {
    question: 'What is the cancellation policy?',
    answer:
      'Cancellations more than 24 hours prior to check-in receive a full refund [CONFIG: minus payment gateway fee]. Cancellations between 12 and 24 hours receive a 50% refund. Cancellations under 12 hours or no-shows are non-refundable [CONFIG: Cancellation terms subject to owner confirmation].',
  },
  {
    question: 'How many guests are allowed?',
    answer:
      'The studio strictly accommodates a maximum of 2 adult guests [CONFIG: 18+ age attestation required at booking]. Additional visitors are not permitted to ensure quiet residential building guidelines [Placeholder].',
  },
  {
    question: 'What amenities are included in the rate?',
    answer:
      'Every booking includes split air conditioning, high-speed WiFi [CONFIG: 100 Mbps], 43" Smart TV with streaming apps, attached private bathroom with 24/7 hot water, fresh towels and linens, electric kettle with tea/coffee, power backup [CONFIG: Inverter], and free parking [CONFIG: Subject to slot availability].',
  },
  {
    question: 'Is on-site parking available?',
    answer:
      'Yes, free parking is available within the residential complex for two-wheelers and four-wheelers [CONFIG: Parking slot directions shared upon confirmed booking].',
  },
  {
    question: 'How do I check in?',
    answer:
      'Check-in is completely keyless and contactless. Once your booking and ID verification are confirmed, you will receive the exact private address and a time-bound smart lock entrance PIN [CONFIG: Smart lock provider integration in Phase 2] valid exclusively during your reserved slot.',
  },
];

export default function FAQSection() {
  // All items closed by default; only one item open at a time
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const shouldReduceMotion = useReducedMotion();

  function toggleItem(index: number) {
    setOpenIndex(openIndex === index ? null : index);
  }

  const whatsappUrl = `https://wa.me/${CONFIG.WHATSAPP_NUMBER.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(
    'Hi CozyMoments Concierge! I have a question regarding the studio booking in Kalwa.'
  )}`;

  return (
    <section
      id="faq"
      className="bg-cream border-t border-sand/70 py-16 lg:py-24"
      aria-labelledby="faq-section-heading"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        
        {/* Two-column editorial layout on Desktop (>=1024px); Stacked on Mobile */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* Left Column: Heading Block & WhatsApp Card */}
          <div className="lg:col-span-5 lg:sticky lg:top-28 space-y-8">
            <div>
              {/* Small label: "Questions" */}
              <span className="text-xs font-semibold uppercase tracking-widest text-charcoal-muted block mb-3">
                Questions
              </span>

              {/* Heading: 44–48px serif, deep brown */}
              <h2
                id="faq-section-heading"
                className="font-serif text-[38px] sm:text-[44px] lg:text-[48px] font-bold text-espresso leading-[1.12] tracking-tight text-balance"
              >
                Frequently asked questions
              </h2>

              {/* One-line intro */}
              <p className="mt-4 text-base text-charcoal-muted leading-relaxed">
                Everything you need to know about our hourly private studio, privacy standards, and arrival.
              </p>
            </div>

            {/* WhatsApp Assistance Card */}
            <div className="bg-warm-white rounded-2xl p-6 sm:p-7 border border-sand/70 shadow-xs">
              <div className="w-10 h-10 rounded-xl bg-sand/30 flex items-center justify-center text-espresso mb-4">
                <MessageCircle className="w-5 h-5" />
              </div>
              <h3 className="font-serif text-lg font-bold text-charcoal mb-1.5">
                Still have questions?
              </h3>
              <p className="text-sm text-charcoal-muted leading-relaxed mb-5">
                Message us on WhatsApp. We typically respond within 1 hour during operating hours.
              </p>
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 w-full py-3 px-5 rounded-full bg-espresso text-ivory text-sm font-semibold hover:bg-espresso-dark active:scale-[0.98] transition-all shadow-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-espresso"
              >
                <MessageCircle className="w-4 h-4 fill-ivory" />
                Message on WhatsApp
              </a>
            </div>
          </div>

          {/* Right Column: Editorial Accordion with Thin 1px Dividers */}
          <div className="lg:col-span-7">
            <div className="divide-y divide-sand/60 border-y border-sand/60">
              {faqs.map((faq, index) => {
                const isOpen = openIndex === index;
                const contentId = `faq-answer-${index}`;
                const buttonId = `faq-question-${index}`;

                return (
                  <div key={faq.question} className="py-2">
                    <h3>
                      <button
                        id={buttonId}
                        type="button"
                        onClick={() => toggleItem(index)}
                        aria-expanded={isOpen}
                        aria-controls={contentId}
                        className="w-full min-h-[48px] py-4 sm:py-5 flex items-center justify-between gap-4 text-left group focus:outline-none focus-visible:ring-2 focus-visible:ring-espresso focus-visible:ring-offset-2 rounded-lg px-1 transition-colors"
                      >
                        <span className="font-serif text-lg sm:text-xl font-bold text-charcoal group-hover:text-espresso transition-colors pr-2 leading-snug">
                          {faq.question}
                        </span>

                        {/* Plus icon that rotates to an x over 200ms */}
                        <motion.span
                          animate={{ rotate: isOpen ? 45 : 0 }}
                          transition={{
                            duration: shouldReduceMotion ? 0 : 0.2,
                            ease: 'easeInOut',
                          }}
                          className="w-8 h-8 rounded-full bg-sand/20 group-hover:bg-sand/40 flex items-center justify-center shrink-0 text-espresso transition-colors"
                          aria-hidden="true"
                        >
                          <Plus className="w-4 h-4 stroke-[2.5]" />
                        </motion.span>
                      </button>
                    </h3>

                    {/* Animated Answer Body */}
                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.div
                          id={contentId}
                          role="region"
                          aria-labelledby={buttonId}
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{
                            duration: shouldReduceMotion ? 0 : 0.2,
                            ease: 'easeInOut',
                          }}
                          className="overflow-hidden"
                        >
                          <div className="pb-5 pt-1 pr-6 text-base leading-[1.6] text-charcoal font-normal">
                            {faq.answer}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </div>
          </div>

        </div>

        {/* Closing Row Below Accordion */}
        <div className="mt-16 sm:mt-20 pt-10 border-t border-sand/40 flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 text-center">
          <span className="font-serif text-xl sm:text-2xl font-bold text-espresso">
            Ready when you are.
          </span>
          <Link
            href="#booking"
            className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-espresso text-ivory text-sm font-semibold hover:bg-espresso-dark active:scale-95 transition-all shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-espresso"
          >
            See available times
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

      </div>
    </section>
  );
}
