'use client';

import React from 'react';
import { MapPin, Navigation, Train, ShieldCheck } from 'lucide-react';
import { CONFIG } from '@/lib/config';

export default function LocationSection() {
  return (
    <section className="py-20 md:py-28 bg-warm-white border-t border-sand/60" aria-labelledby="location-heading">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs font-semibold uppercase tracking-widest text-espresso bg-sand/30 px-3.5 py-1.5 rounded-full border border-sand">
            Neighborhood & Arrival
          </span>
          <h2 id="location-heading" className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-espresso tracking-tight mt-3">
            Peaceful Kalwa Setting
          </h2>
          <p className="mt-4 text-charcoal-muted text-base">
            Tucked away in a calm residential enclave of Kalwa, Thane. Easily accessible while shielded from noisy thoroughfares.
          </p>
        </div>

        {/* Map & Neighborhood Details */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Interactive Map Embed */}
          <div className="lg:col-span-7 rounded-2xl overflow-hidden shadow-lg border border-sand bg-ivory">
            <iframe
              src={`https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15071.24!2d${CONFIG.MAP_LNG}!3d${CONFIG.MAP_LAT}!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7b8f4f9e3b1a3%3A0x9c9f4b7e1c0c5c0a!2sKalwa%2C%20Thane%2C%20Maharashtra!5e0!3m2!1sen!2sin!4v1234567890`}
              width="100%"
              height="380"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="CozyMoments Studio location in Kalwa, Thane"
              className="w-full"
            />
          </div>

          {/* Location Cards */}
          <div className="lg:col-span-5 space-y-4">
            
            <div className="bg-ivory rounded-2xl p-6 border border-sand/80 shadow-xs">
              <div className="flex items-start gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-sand/30 flex items-center justify-center shrink-0 text-espresso border border-sand/60">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-serif text-lg font-bold text-charcoal">
                    Studio Location
                  </h3>
                  <p className="text-xs text-charcoal-muted mt-1 leading-relaxed">
                    Kalwa, Thane (Maharashtra) · 400605<br />
                    Quiet, gated residential neighborhood with peaceful surroundings.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-ivory rounded-2xl p-6 border border-sand/80 shadow-xs">
              <div className="flex items-start gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-sand/30 flex items-center justify-center shrink-0 text-espresso border border-sand/60">
                  <Train className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-serif text-lg font-bold text-charcoal">
                    Transit Connectivity
                  </h3>
                  <p className="text-xs text-charcoal-muted mt-1 leading-relaxed">
                    ~5 minutes from Kalwa Railway Station.<br />
                    ~10 minutes from Thane West station & Viviana Mall area.<br />
                    Convenient auto-rickshaws, cabs, and quick expressway access.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-sand/20 rounded-2xl p-5 border border-sand/50 flex items-center gap-3">
              <ShieldCheck className="w-5 h-5 text-espresso shrink-0" />
              <p className="text-xs text-charcoal-muted leading-relaxed">
                <strong className="text-espresso font-semibold">Privacy First:</strong> To preserve security, exact building address and private entry directions are disclosed exclusively to confirmed guests.
              </p>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
