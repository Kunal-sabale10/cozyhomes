'use client';

import React, { useRef } from 'react';
import { motion, useInView, useReducedMotion } from 'framer-motion';
import { Shield, Lock, EyeOff, Trash2 } from 'lucide-react';

const promises = [
  {
    icon: Shield,
    title: 'Exclusively Yours',
    text: 'No shared spaces — the entire apartment is exclusively yours for the duration of your booking.',
  },
  {
    icon: Lock,
    title: 'Encrypted & Secure',
    text: 'Your personal information is encrypted at rest and in transit. We never share your data with third parties.',
  },
  {
    icon: EyeOff,
    title: 'Discreet Communication',
    text: 'All booking confirmations and messages use neutral sender names and subjects. No sensitive details exposed.',
  },
  {
    icon: Trash2,
    title: 'Auto-Deleted Documents',
    text: 'ID documents are stored in encrypted private storage and automatically deleted per our retention policy.',
  },
];

export default function PrivacyPromise() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });
  const shouldReduceMotion = useReducedMotion();

  return (
    <section className="py-16 md:py-20 bg-sage text-warm-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-12">
          <h2 className="font-serif text-3xl sm:text-4xl font-bold">
            Your Privacy, Our Promise
          </h2>
          <p className="mt-3 text-sage-lightest text-lg max-w-xl mx-auto">
            Privacy isn&apos;t just a feature — it&apos;s the foundation of everything we do
          </p>
        </div>

        <div ref={ref} className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {promises.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, x: shouldReduceMotion ? 0 : i % 2 === 0 ? -20 : 20 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.5, delay: shouldReduceMotion ? 0 : i * 0.1 }}
              className="flex gap-4 p-6 rounded-xl bg-white/10 backdrop-blur-sm border border-white/15"
            >
              <div className="w-12 h-12 rounded-xl bg-white/15 flex items-center justify-center shrink-0">
                <item.icon className="w-6 h-6 text-warm-white" />
              </div>
              <div>
                <h3 className="font-serif text-lg font-semibold mb-1">{item.title}</h3>
                <p className="text-sage-lightest text-sm leading-relaxed">{item.text}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
