import React from 'react';
import { AMENITIES } from '@/lib/mock-data';
import {
  Snowflake,
  Wifi,
  Tv,
  Bath,
  Shirt,
  CookingPot,
  Car,
  Clock,
  SprayCan,
  Layers,
  GlassWater,
  Sparkles,
} from 'lucide-react';

const iconMap: Record<string, React.ElementType> = {
  Snowflake,
  Wifi,
  Tv,
  Bath,
  Shirt,
  CookingPot,
  Car,
  Clock,
  SprayCan,
  Layers,
  IronIcon: Layers,
  GlassWater,
};

export default function AmenitiesList() {
  return (
    <section aria-label="Studio amenities" className="w-full">
      <div className="bg-ivory border border-sand rounded-3xl p-6 sm:p-8 md:p-10 shadow-xs">
        {/* Header — sentence case and standardized pill style */}
        <div className="max-w-2xl mb-8">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-sand/30 border border-sand text-espresso text-xs font-medium mb-3">
            <Sparkles className="w-3.5 h-3.5 text-sage" />
            <span>Curated essentials</span>
          </div>
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-charcoal leading-snug">
            Everything included with your booking
          </h2>
          <p className="text-sm sm:text-base text-umber mt-1.5 leading-relaxed">
            Every amenity is thoughtfully prepared to provide a seamless, comfortable, and private experience during your stay.
          </p>
        </div>

        {/* Amenities Grid: equal height cards with fixed title height */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
          {AMENITIES.map((amenity, index) => {
            const Icon = iconMap[amenity.icon] ?? Sparkles;
            return (
              <div
                key={index}
                className="flex items-start gap-3.5 p-4 sm:p-5 rounded-2xl bg-cream/60 border border-sand hover:border-sage/60 transition-all duration-200 h-full"
              >
                <div className="w-10 h-10 rounded-xl bg-ivory border border-sand flex items-center justify-center shrink-0 text-sage shadow-2xs mt-0.5">
                  <Icon className="w-5 h-5" />
                </div>
                <div className="flex-1 min-w-0">
                  {/* Fixed title height (two lines) ensures all cards align identically */}
                  <h3 className="font-serif font-bold text-sm sm:text-base text-charcoal h-10 flex items-center line-clamp-2 leading-tight">
                    {amenity.title}
                  </h3>
                  <p className="text-xs text-umber leading-relaxed mt-1">
                    {amenity.description}
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
