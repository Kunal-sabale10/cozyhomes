import React from 'react';
import type { Metadata } from 'next';
import { CONFIG } from '@/lib/config';
import StudioClient from './StudioClient';

export const metadata: Metadata = {
  title: 'The Studio | CozyMoments, Private Studio in Kalwa, Thane',
  description:
    'Explore our dedicated private studio apartment in Kalwa, Thane. Single-unit occupancy, high-speed Wi-Fi, air conditioning, and keyless check-in. Hourly booking from ₹300/hr.',
  openGraph: {
    title: 'The Studio | CozyMoments, Private Studio in Kalwa, Thane',
    description:
      'Explore our dedicated private studio apartment in Kalwa, Thane. Single-unit occupancy, high-speed Wi-Fi, air conditioning, and keyless check-in. Hourly booking from ₹300/hr.',
    url: `${CONFIG.SITE_URL}/studio`,
    siteName: 'CozyMoments',
    locale: 'en_IN',
    type: 'website',
    images: [
      {
        url: 'https://images.unsplash.com/photo-1598928506311-c55ded91a20c?auto=format&fit=crop&w=1200&q=85',
        width: 1200,
        height: 800,
        alt: 'CozyMoments Private Boutique Studio in Kalwa, Thane',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'The Studio | CozyMoments, Private Studio in Kalwa, Thane',
    description:
      'Explore our dedicated private studio apartment in Kalwa, Thane. Single-unit occupancy, hourly booking from ₹300/hr.',
    images: ['https://images.unsplash.com/photo-1598928506311-c55ded91a20c?auto=format&fit=crop&w=1200&q=85'],
  },
};

export default function StudioPage() {
  return <StudioClient />;
}
