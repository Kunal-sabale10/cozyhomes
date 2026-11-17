/** Demo data for CozyMoments — all entries clearly marked as [DEMO] */

import { Amenity, FAQ, Testimonial } from '@/types';

export const STUDIO_DESCRIPTION = {
  title: 'The studio space',
  tagline: 'A private studio apartment designed for calm work and restful stays.',
  description:
    'Located in Kalwa, Thane, CozyMoments offers a dedicated private studio apartment reserved exclusively for your booked hours with zero shared spaces. Every detail is arranged to provide peace, comfort, and complete discretion.',
  checkInInstructions: [
    'You will receive the exact address and entry instructions after your booking is confirmed.',
    'Self check-in is available — no need to coordinate arrivals.',
    'The studio will be freshly cleaned before your arrival.', // [to confirm]: sanitisation claim
    'Please check out on time so we can prepare the space for the next guest.',
  ],
};

// Claims removed from visible UI and marked [to confirm] as per instructions:
// [to confirm]: sanitisation claims
// [to confirm]: fibre speed numbers (e.g. 200 Mbps)
// [to confirm]: backup power / inverter setup
// [to confirm]: 24/7 hot water claim (hot water is available)
// [to confirm]: 24/7 access claim (operating hours are 08:00 to 23:00)

export const AMENITIES: Amenity[] = [
  { icon: 'Snowflake', title: 'Air conditioning', description: 'Quiet split AC for room comfort' },
  { icon: 'Wifi', title: 'Fast Wi-Fi', description: 'Reliable internet connection for work and streaming' },
  { icon: 'Tv', title: 'Smart TV', description: 'Streaming-ready television with HDMI input' },
  { icon: 'Bath', title: 'Private bathroom', description: 'Clean attached bathroom with hot shower' },
  { icon: 'Shirt', title: 'Fresh towels and linens', description: 'Freshly laundered towels and bed linens' },
  { icon: 'CookingPot', title: 'Kitchenette', description: 'Basic cooking essentials and electric kettle' },
  { icon: 'Car', title: 'Free parking', description: 'Dedicated on-site parking space' },
  { icon: 'Layers', title: 'Dedicated workspace', description: 'Comfortable table and chair for focus' },
  { icon: 'Clock', title: 'Flexible access', description: 'Private entry within your reserved hours' },
  { icon: 'SprayCan', title: 'Clean space', description: 'Thoroughly prepared before every booking' },
  { icon: 'IronIcon', title: 'Iron and board', description: 'Iron and ironing board available on request' },
  { icon: 'GlassWater', title: 'Drinking water', description: 'Clean drinking water provided' },
];

export const HOUSE_RULES = [
  { icon: 'CigaretteOff', text: 'No smoking inside the property' },
  { icon: 'VolumeX', text: 'No loud music or parties after 10:00 PM' },
  { icon: 'Users', text: 'Up to 2 guests per booking' },
  { icon: 'Sparkles', text: 'Please leave the space as you found it' },
  { icon: 'PawPrint', text: 'No pets allowed' },
  { icon: 'Clock', text: 'Check out on time to avoid extra charges' },
  { icon: 'AlertTriangle', text: 'Report any damages immediately' },
  { icon: 'Heart', text: 'Respect the neighbours' },
];

export const FAQS: FAQ[] = [
  {
    question: 'How do I book the studio?',
    answer:
      'Simply select your preferred date, start time, and duration on our booking page. Complete the guest details, upload a valid ID for verification, and pay to confirm your booking. The entire process takes just a few minutes.',
  },
  {
    question: 'What ID do I need to provide?',
    answer:
      'We accept Aadhaar card, passport, driving licence, or voter ID. For Aadhaar, we follow UIDAI guidelines and do not store your Aadhaar number — only a verification photo is required. Your ID documents are encrypted and securely stored.',
  },
  {
    question: 'Is the space completely private?',
    answer:
      'Yes, absolutely. The entire studio apartment is exclusively yours for the duration of your booking. There are no shared areas, no common spaces, and no other guests during your stay.',
  },
  {
    question: 'What is the cancellation policy?',
    answer:
      'Cancellations more than 24 hours before your booking receive a full refund. Between 12 and 24 hours, you receive a 50% refund. Cancellations less than 12 hours before the booking or no-shows are non-refundable. Please check our cancellation policy page for full details.',
  },
  {
    question: 'How many guests are allowed?',
    answer:
      'Each booking accommodates a maximum of 2 guests. All guests must be 18 years or older. The name on the booking must match the ID provided.',
  },
  {
    question: 'What amenities are included?',
    answer:
      'The studio comes fully equipped with air conditioning, high-speed WiFi, a smart TV, private bathroom with hot water, fresh towels and linens, a kitchenette with electric kettle, free parking, and power backup.',
  },
  {
    question: 'Is parking available?',
    answer:
      'Yes, free parking is available at the property. Details about the parking location will be shared after your booking is confirmed.',
  },
  {
    question: 'How do I check in?',
    answer:
      'After your booking is confirmed, you will receive the exact address and self check-in instructions. No need to coordinate with anyone — the check-in process is designed to be seamless and private.',
  },
];

export const TESTIMONIALS: Testimonial[] = [
  {
    name: 'Rahul M.',
    text: 'Such a clean and private space. Perfect for when you need a few hours of peace and quiet. Will definitely book again.',
    rating: 5,
    isDemo: true,
  },
  {
    name: 'Priya S.',
    text: 'The booking process was incredibly smooth. Loved the privacy and the thoughtful amenities. Great value for the price!',
    rating: 5,
    isDemo: true,
  },
  {
    name: 'Amit K.',
    text: 'Exactly what I was looking for — a private, comfortable studio without the fuss of a hotel. The self check-in was very convenient.',
    rating: 4,
    isDemo: true,
  },
  {
    name: 'Sneha D.',
    text: 'Wonderful experience! The place was spotless, the WiFi was fast, and I had complete privacy. Highly recommend CozyMoments.',
    rating: 5,
    isDemo: true,
  },
];

/** Pricing tiers for the studio page */
export const PRICING_TIERS = [
  { hours: 1, popular: false },
  { hours: 2, popular: false },
  { hours: 3, popular: true },
  { hours: 4, popular: false },
  { hours: 5, popular: false },
  { hours: 6, popular: false },
  { hours: 8, popular: false },
  { hours: 10, popular: false },
  { hours: 12, popular: false },
];
