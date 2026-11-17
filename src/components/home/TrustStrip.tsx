'use client';

import React from 'react';
import { ShieldCheck, Sparkles, LockKeyhole, KeyRound } from 'lucide-react';

const trustItems = [
  {
    icon: ShieldCheck,
    title: '100% Private Studio',
    subtitle: 'Zero shared spaces or common areas',
  },
  {
    icon: Sparkles,
    title: 'Sanitized & Fresh Linens',
    subtitle: 'Deep sanitization before every check-in',
  },
  {
    icon: LockKeyhole,
    title: 'Encrypted ID Handling',
    subtitle: 'UIDAI-compliant with auto-deletion policy',
  },
  {
    icon: KeyRound,
    title: 'Keyless Self Check-In',
    subtitle: 'Private time-bound keypad entrance PIN',
  },
];

export default function TrustStrip() {
  return (
    <section className="bg-ivory border-y border-sand/60 py-6 sm:py-8" aria-label="Key trust highlights">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {trustItems.map((item) => {
            const Icon = item.icon;
            return (
              <div key={item.title} className="flex items-center gap-3.5 group">
                <div className="w-11 h-11 rounded-xl bg-sand/30 flex items-center justify-center shrink-0 border border-sand group-hover:bg-espresso group-hover:text-ivory transition-colors">
                  <Icon className="w-5 h-5 text-espresso group-hover:text-ivory transition-colors" />
                </div>
                <div>
                  <div className="flex items-center gap-1.5 flex-wrap">
                    <h3 className="text-sm font-semibold text-charcoal">
                      {item.title}
                    </h3>
                    <span className="text-[9px] px-1.5 py-0.2 font-mono uppercase rounded bg-sand/40 text-charcoal-muted tracking-wider">
                      Placeholder
                    </span>
                  </div>
                  <p className="text-xs text-charcoal-muted mt-0.5 leading-snug">
                    {item.subtitle}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
