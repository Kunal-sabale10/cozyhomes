'use client';

import React, { useRef } from 'react';
import { motion, useInView, useReducedMotion } from 'framer-motion';
import { Star, Quote } from 'lucide-react';
import { TESTIMONIALS } from '@/lib/mock-data';

export default function Testimonials() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });
  const shouldReduceMotion = useReducedMotion();

  return (
    <section className="py-16 md:py-20 bg-warm-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-12">
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-charcoal">
            What Our Guests Say
          </h2>
          <p className="mt-3 text-charcoal-light text-lg">
            Real experiences from guests who chose CozyMoments
          </p>
        </div>

        <div
          ref={ref}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5"
        >
          {TESTIMONIALS.map((testimonial, i) => (
            <motion.div
              key={testimonial.name}
              initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: shouldReduceMotion ? 0 : i * 0.1 }}
              className="bg-cream rounded-2xl p-6 border border-beige/60 hover:shadow-md transition-shadow relative"
            >
              <Quote className="w-8 h-8 text-sage/20 absolute top-4 right-4" />

              {/* Stars */}
              <div className="flex gap-0.5 mb-3">
                {Array.from({ length: 5 }).map((_, si) => (
                  <Star
                    key={si}
                    className={`w-4 h-4 ${
                      si < testimonial.rating
                        ? 'text-amber-400 fill-amber-400'
                        : 'text-charcoal/15'
                    }`}
                  />
                ))}
              </div>

              <p className="text-charcoal-light text-sm leading-relaxed mb-4">
                &ldquo;{testimonial.text}&rdquo;
              </p>

              <div className="flex items-center justify-between">
                <span className="text-sm font-semibold text-charcoal">
                  {testimonial.name}
                </span>
                {testimonial.isDemo && (
                  <span className="text-[10px] px-1.5 py-0.5 rounded bg-amber-100 text-amber-700 font-medium">
                    DEMO
                  </span>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
