import React from 'react';
import { STUDIO_DESCRIPTION } from '@/lib/mock-data';
import { KeyRound, ShieldCheck } from 'lucide-react';

export default function CheckInInfo() {
  const instructions = STUDIO_DESCRIPTION.checkInInstructions;

  return (
    <section aria-label="Check-in and arrival guidelines" className="w-full">
      <div className="bg-ivory border border-sand rounded-3xl p-6 sm:p-8 md:p-10 shadow-xs">
        {/* Header — sentence case and standardized pill style */}
        <div className="max-w-2xl mb-8">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-sand/30 border border-sand text-espresso text-xs font-medium mb-3">
            <KeyRound className="w-3.5 h-3.5 text-sage" />
            <span>Self check-in guide</span>
          </div>
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-charcoal leading-snug">
            Arrival and check-in guide
          </h2>
          <p className="text-sm sm:text-base text-umber mt-1.5 leading-relaxed">
            Experience effortless, private access without awkward waiting or in-person check-in queues.
          </p>
        </div>

        {/* Numbered Steps */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {instructions.map((instruction, index) => {
            const stepNumber = String(index + 1).padStart(2, '0');
            return (
              <div
                key={index}
                className="flex items-start gap-4 p-5 rounded-2xl bg-cream/60 border border-sand hover:border-sage/40 transition-colors"
              >
                {/* Sage green step number */}
                <div className="w-10 h-10 rounded-xl bg-sage text-ivory flex items-center justify-center font-serif font-bold text-sm shrink-0 shadow-2xs">
                  {stepNumber}
                </div>
                <div className="pt-0.5 space-y-1">
                  <h3 className="font-serif font-bold text-sm text-charcoal">
                    Step {index + 1}
                  </h3>
                  <p className="text-xs sm:text-sm text-umber leading-relaxed">
                    {instruction}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Privacy Note Badge */}
        <div className="mt-8 pt-6 border-t border-sand flex items-center gap-3 text-xs text-umber">
          <ShieldCheck className="w-5 h-5 text-sage shrink-0" />
          <span>
            Keyless digital door PIN is generated exclusively for your booked hours and automatically expires at check-out time.
          </span>
        </div>
      </div>
    </section>
  );
}
