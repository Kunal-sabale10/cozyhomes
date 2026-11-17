import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { 
  CigaretteOff, 
  Volume2, 
  Users, 
  Sparkles, 
  Ban, 
  Clock, 
  ShieldAlert, 
  AlertTriangle, 
  Eye, 
  UtensilsCrossed, 
  ChevronRight, 
  ArrowRight,
  Info
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'House Rules | CozyMoments',
  description: 'Icon-illustrated house rules and guest guidelines for CozyMoments private studio in Kalwa, Thane. Ensuring a peaceful, safe, and respectful stay for all guests.',
  openGraph: {
    title: 'House Rules | CozyMoments',
    description: 'Icon-illustrated house rules and guest guidelines for CozyMoments private studio in Kalwa, Thane.',
    url: 'https://cozymoments.in/house-rules',
  },
};

interface RuleItem {
  id: number;
  title: string;
  subtitle: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  badge?: string;
  badgeType?: 'warning' | 'info' | 'critical';
}

const houseRules: RuleItem[] = [
  {
    id: 1,
    title: 'No smoking inside',
    subtitle: 'Strict smoke-free and vape-free interior',
    description: 'Smoking cigarettes, cigars, hookahs, or vaping inside the studio is strictly prohibited. An outdoor designated zone is available downstairs. Indoor violations will incur a ₹2,000 deep-cleaning fee for fabric laundering.',
    icon: CigaretteOff,
    badge: '₹2,000 fee for indoor smoking',
    badgeType: 'warning',
  },
  {
    id: 2,
    title: 'No loud music or parties after 10:00 PM',
    subtitle: 'Quiet hours: 10:00 PM to 8:00 AM',
    description: 'CozyMoments is situated in a peaceful residential neighborhood. Please keep music, smart TV volume, and conversations at a gentle, considerate level. No parties or commercial events are permitted.',
    icon: Volume2,
    badge: 'Residential quiet hours',
    badgeType: 'info',
  },
  {
    id: 3,
    title: 'Up to 2 guests per booking',
    subtitle: 'Maximum 2 guests occupancy limit at all times',
    description: 'For your comfort and building regulations, our studio accommodates up to 2 guests. Bringing unregistered visitors or exceeding this occupancy is ground for immediate reservation termination.',
    icon: Users,
    badge: 'Up to 2 guests',
    badgeType: 'critical',
  },
  {
    id: 4,
    title: 'Keep the space clean and tidy',
    subtitle: 'Treat the studio like your cherished home',
    description: 'Please dispose of trash in the bins provided, wash any used crockery or coffee mugs, and leave the studio in a neat, respectful condition. Trash bags and dish supplies are provided in the kitchenette.',
    icon: Sparkles,
  },
  {
    id: 5,
    title: 'No pets allowed',
    subtitle: 'Hypoallergenic and allergen-free environment',
    description: 'To protect the health and comfort of guests with severe asthma or pet allergies, pets or animals of any kind cannot be hosted in the studio apartment.',
    icon: Ban,
  },
  {
    id: 6,
    title: 'Check out on time',
    subtitle: 'Scheduled slots ensure a 30-minute cleaning buffer',
    description: 'Our housekeeping team arrives immediately at check-out time to clean surfaces, refresh linens, and prepare the studio for the next booking. Overstaying past the 10-minute grace period will incur additional hourly fees.',
    icon: Clock,
    badge: '10-min grace period',
    badgeType: 'info',
  },
  {
    id: 7,
    title: 'No illegal activities',
    subtitle: 'Zero tolerance policy strictly enforced',
    description: 'Possession or consumption of illicit narcotics, prohibited substances, firearms, gambling, or any unlawful activity is strictly barred. Violations will be reported directly to local authorities.',
    icon: ShieldAlert,
    badge: 'Zero tolerance',
    badgeType: 'critical',
  },
  {
    id: 8,
    title: 'Report any damages immediately',
    subtitle: 'Accidents happen — we appreciate quick notice',
    description: 'Spilled coffee, broken glasses, or faulty fixtures can happen to anyone. Please notify us right away on WhatsApp so our maintenance team can address it swiftly before your departure.',
    icon: AlertTriangle,
  },
  {
    id: 9,
    title: 'Respect neighbours privacy',
    subtitle: 'Maintain discretion in common corridors',
    description: 'Please keep hallway movement discreet and peaceful. Please do not linger in building stairways, lifts, or corridors, and respect the privacy and serenity of neighboring residents.',
    icon: Eye,
  },
  {
    id: 10,
    title: 'No outside food deliveries after 10:00 PM',
    subtitle: 'Ensure nighttime building security',
    description: 'Delivery personnel are not allowed into the building floors after 10:00 PM to ensure quiet corridors. Please place late evening orders earlier or receive them personally at the main security gate.',
    icon: UtensilsCrossed,
    badge: 'Deliveries to gate after 10 PM',
    badgeType: 'info',
  },
];

export default function HouseRulesPage() {
  return (
    <div className="w-full bg-cream text-charcoal flex-1">
      <main className="max-w-[1200px] mx-auto px-6 py-12 md:py-16 w-full flex-1">
        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" className="mb-6">
          <ol className="flex items-center gap-2 text-xs font-medium text-umber">
            <li>
              <Link href="/" className="hover:text-charcoal transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-sage-deep rounded-xs">
                Home
              </Link>
            </li>
            <li>
              <ChevronRight className="w-3.5 h-3.5 text-sand" />
            </li>
            <li>
              <Link href="/studio" className="hover:text-charcoal transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-sage-deep rounded-xs">
                The Studio
              </Link>
            </li>
            <li>
              <ChevronRight className="w-3.5 h-3.5 text-sand" />
            </li>
            <li className="text-charcoal font-semibold" aria-current="page">
              House Rules
            </li>
          </ol>
        </nav>

        {/* Page Header */}
        <header className="mb-10 pb-8 border-b border-sand">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-sand/30 border border-sand text-espresso text-xs font-medium mb-3">
            <Sparkles className="w-3.5 h-3.5 text-sage" />
            <span>Guest guidelines</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-charcoal tracking-tight mb-3">
            Studio house rules
          </h1>
          <p className="text-base sm:text-lg text-umber leading-relaxed max-w-2xl font-light">
            We want your time at CozyMoments to feel truly relaxing, discreet, and comforting. These simple guidelines keep our sanctuary clean, secure, and respectful of our quiet residential building in Kalwa, Thane.
          </p>
        </header>

        {/* Highlight Banner */}
        <div className="mb-10 p-5 rounded-2xl bg-ivory border border-sand flex items-start gap-4 shadow-xs">
          <div className="w-10 h-10 rounded-xl bg-sand/30 text-espresso flex items-center justify-center shrink-0 border border-sand">
            <Info className="w-5 h-5 text-sage" />
          </div>
          <div className="space-y-1">
            <h2 className="font-serif text-base font-bold text-charcoal">
              Your cooperation creates the cozy experience
            </h2>
            <p className="text-xs sm:text-sm text-umber leading-relaxed">
              Every guest expects a pristine, quiet, and spotless retreat. By respecting these rules, you help us maintain high standards of comfort and tranquil privacy for everyone.
            </p>
          </div>
        </div>

        {/* Illustrated Rules Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-12">
          {houseRules.map((rule) => {
            const IconComponent = rule.icon;
            return (
              <article
                key={rule.id}
                className="bg-ivory p-6 rounded-2xl border border-sand hover:border-sage/50 transition-colors shadow-xs flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-start justify-between gap-3 mb-4">
                    <div className="w-12 h-12 rounded-xl bg-cream border border-sand text-sage flex items-center justify-center shrink-0">
                      <IconComponent className="w-6 h-6" />
                    </div>
                    {rule.badge && (
                      <span
                        className={`text-[11px] font-semibold px-2.5 py-1 rounded-full text-right ${
                          rule.badgeType === 'critical'
                            ? 'bg-sand/60 text-espresso border border-sand font-semibold'
                            : rule.badgeType === 'warning'
                            ? 'bg-sand/40 text-espresso border border-sand'
                            : 'bg-cream text-charcoal border border-sand'
                        }`}
                      >
                        {rule.badge}
                      </span>
                    )}
                  </div>
                  
                  <h3 className="font-serif text-lg font-bold text-charcoal mb-1">
                    {rule.title}
                  </h3>
                  <p className="text-xs font-medium text-sage-deep mb-2">
                    {rule.subtitle}
                  </p>
                  <p className="text-xs sm:text-sm text-umber leading-relaxed">
                    {rule.description}
                  </p>
                </div>
              </article>
            );
          })}
        </div>

        {/* Policy Violations & Additional Charges Section */}
        <section className="bg-ivory p-6 sm:p-8 rounded-2xl border border-sand mb-8 space-y-4 shadow-xs">
          <div className="flex items-center gap-2.5 text-espresso">
            <AlertTriangle className="w-5 h-5 text-sage" />
            <h2 className="font-serif text-xl font-bold text-charcoal">
              Notice regarding violations and additional charges
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-umber leading-relaxed">
            We aim to never levy penalties, but to protect future guests and maintain property standards, intentional violations incur the following charges:
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
            <div className="p-3.5 rounded-xl bg-cream border border-sand text-xs space-y-1">
              <strong className="block text-charcoal">Smoking indoors</strong>
              <p className="text-espresso font-bold">₹2,000</p>
              <p className="text-umber">Specialized cleaning and deep fabric laundering.</p>
            </div>
            <div className="p-3.5 rounded-xl bg-cream border border-sand text-xs space-y-1">
              <strong className="block text-charcoal">Extra unregistered guests</strong>
              <p className="text-espresso font-bold">Immediate eviction</p>
              <p className="text-umber">Cancellation of stay without refund due to building security guidelines.</p>
            </div>
            <div className="p-3.5 rounded-xl bg-cream border border-sand text-xs space-y-1">
              <strong className="block text-charcoal">Damaged furnishings or linens</strong>
              <p className="text-espresso font-bold">Actual cost</p>
              <p className="text-umber">Actual repair or replacement cost plus nominal handling.</p>
            </div>
          </div>
          <p className="text-xs text-umber pt-2">
            For full details on guest guidelines, legal obligations, and security terms, please review our comprehensive{' '}
            <Link href="/terms" className="text-sage-deep font-semibold hover:underline inline-flex items-center gap-1 focus:outline-none focus-visible:ring-1 focus-visible:ring-sage-deep rounded-xs">
              Terms of Service <ArrowRight className="w-3 h-3" />
            </Link>.
          </p>
        </section>
      </main>
    </div>
  );
}
