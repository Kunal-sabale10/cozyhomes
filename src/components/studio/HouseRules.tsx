import React from 'react';
import Link from 'next/link';
import { HOUSE_RULES } from '@/lib/mock-data';
import {
  CigaretteOff,
  VolumeX,
  Users,
  Sparkles,
  PawPrint,
  Ban,
  Clock,
  AlertTriangle,
  Heart,
  ShieldAlert,
  ArrowRight,
} from 'lucide-react';

const iconMap: Record<string, React.ElementType> = {
  CigaretteOff,
  VolumeX,
  Users,
  Sparkles,
  PawPrint,
  Ban,
  Clock,
  AlertTriangle,
  Heart,
};

export default function HouseRules() {
  return (
    <section aria-label="Studio house rules" className="w-full">
      <div className="bg-ivory border border-sand rounded-3xl p-6 sm:p-8 md:p-10 shadow-xs">
        {/* Header — sentence case and standardized pill style */}
        <div className="max-w-2xl mb-8">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-sand/30 border border-sand text-espresso text-xs font-medium mb-3">
            <ShieldAlert className="w-3.5 h-3.5 text-sage" />
            <span>Guest guidelines</span>
          </div>
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-charcoal leading-snug">
            Studio house rules
          </h2>
          <p className="text-sm sm:text-base text-umber mt-1.5 leading-relaxed">
            To ensure every guest enjoys a serene, pristine, and safe stay, we kindly request observance of our community guidelines.
          </p>
        </div>

        {/* Rules Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {HOUSE_RULES.map((rule, index) => {
            const Icon = iconMap[rule.icon] ?? Ban;
            return (
              <div
                key={index}
                className="flex items-start gap-3.5 p-4 rounded-2xl bg-cream/60 border border-sand hover:border-sage/40 transition-colors"
              >
                <div className="w-10 h-10 rounded-xl bg-ivory border border-sand flex items-center justify-center shrink-0 text-sage shadow-2xs">
                  <Icon className="w-5 h-5" />
                </div>
                <div className="pt-2">
                  <p className="text-sm font-medium text-charcoal leading-snug">
                    {rule.text}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Footer Link to full house rules */}
        <div className="mt-8 pt-6 border-t border-sand flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <p className="text-xs text-umber">
            All guests must be at least 18 years of age with a valid government photo ID.
          </p>
          <Link
            href="/house-rules"
            className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-sage-deep hover:text-charcoal transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-sage-deep rounded-sm group"
          >
            <span>Read complete house rules policy</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
          </Link>
        </div>
      </div>
    </section>
  );
}
