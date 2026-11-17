'use client';

import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import {
  Snowflake, Wifi, Tv, Bath, Shirt, CookingPot,
  Car, Zap, Sparkles, GlassWater, ShieldCheck, Wind
} from 'lucide-react';

const amenities = [
  { icon: Snowflake, title: 'Climate Control', desc: 'Powerful split AC with quiet night mode' },
  { icon: Wifi, title: 'High-Speed WiFi', desc: '100 Mbps optical fiber for calls & streaming' },
  { icon: Tv, title: '4K Smart TV', desc: 'Pre-loaded streaming apps & HDMI connectivity' },
  { icon: Bath, title: 'Private Ensuite', desc: 'Attached clean bathroom with 24/7 hot water' },
  { icon: Shirt, title: 'Fresh Linens', desc: 'Laundered cotton bedsheets & plush bath towels' },
  { icon: CookingPot, title: 'Kitchenette Corner', desc: 'Electric kettle, mugs, tea/coffee essentials' },
  { icon: Zap, title: 'Power Backup', desc: 'Automatic inverter ensuring no light/fan cuts' },
  { icon: Car, title: 'Building Parking', desc: 'Secure two-wheeler & car parking on premise' },
  { icon: Sparkles, title: 'Medical Sanitization', desc: 'Deep cleaning & linen change between guests' },
  { icon: GlassWater, title: 'RO Drinking Water', desc: 'Purified drinking water provided in glassware' },
  { icon: ShieldCheck, title: 'Total Discretion', desc: 'Sound-damped private room in quiet Kalwa society' },
  { icon: Wind, title: 'Fresh Air & Daylight', desc: 'Well-ventilated studio with private window view' },
];

export default function AmenitiesGrid() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section className="py-20 md:py-28 bg-sand/20 border-t border-sand/60" aria-labelledby="amenities-heading">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        
        {/* Section Heading */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs font-semibold uppercase tracking-widest text-espresso bg-ivory px-3.5 py-1.5 rounded-full border border-sand">
            Comfort & Conveniences
          </span>
          <h2 id="amenities-heading" className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-espresso tracking-tight mt-3">
            Everything Included in Your Stay
          </h2>
          <p className="mt-4 text-charcoal-muted text-base">
            Every booking is fully prepared before you arrive with amenities designed for relaxation and productivity.
          </p>
        </div>

        {/* 12-Card Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {amenities.map((item, index) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.4, delay: shouldReduceMotion ? 0 : index * 0.05 }}
                className="p-5 rounded-2xl bg-ivory border border-sand/70 shadow-xs hover:border-espresso/40 hover:shadow-md transition-all flex items-start gap-4"
              >
                <div className="w-11 h-11 rounded-xl bg-sand/30 flex items-center justify-center shrink-0 text-espresso border border-sand/50">
                  <Icon className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-serif text-base font-bold text-charcoal mb-1">
                    {item.title}
                  </h3>
                  <p className="text-xs text-charcoal-muted leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
