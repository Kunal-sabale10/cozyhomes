'use client';

import React, { useRef } from 'react';
import { motion, useInView, useReducedMotion } from 'framer-motion';
import { Shield, Clock, Home } from 'lucide-react';
import { formatCurrency } from '@/lib/utils';
import { CONFIG } from '@/lib/config';

const highlights = [
  {
    icon: Shield,
    title: 'Complete Privacy',
    description: 'Your own private space with no shared areas or interruptions. The entire studio is exclusively yours.',
  },
  {
    icon: Clock,
    title: 'Flexible Hours',
    description: `Book from 1 to 12 hours, starting at just ${formatCurrency(CONFIG.RATE_PER_HOUR_INR)}/hr. Choose the time that works for you.`,
  },
  {
    icon: Home,
    title: 'Home Comforts',
    description: 'AC, WiFi, Smart TV, fresh linens — everything you need for a comfortable, relaxing stay.',
  },
];

export default function StudioHighlights() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });
  const shouldReduceMotion = useReducedMotion();

  return (
    <section className="py-16 md:py-20 bg-warm-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-12">
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-charcoal">
            Your Private Retreat
          </h2>
          <p className="mt-3 text-charcoal-light text-lg max-w-xl mx-auto">
            A thoughtfully designed space where your comfort and privacy come first
          </p>
        </div>

        <div ref={ref} className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {highlights.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: shouldReduceMotion ? 0 : i * 0.15 }}
              className="bg-cream rounded-2xl p-7 border border-beige/60 hover:shadow-lg hover:border-sage/30 transition-all duration-300"
            >
              <div className="w-14 h-14 rounded-xl bg-sage/15 flex items-center justify-center mb-5">
                <item.icon className="w-7 h-7 text-sage" />
              </div>
              <h3 className="font-serif text-xl font-semibold text-charcoal mb-2">
                {item.title}
              </h3>
              <p className="text-charcoal-light leading-relaxed">
                {item.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
