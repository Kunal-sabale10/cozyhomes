import type { Metadata } from 'next';
import HomeOverviewClient from './HomeOverviewClient';

export const metadata: Metadata = {
  title: 'Home | CozyMoments, Private Studio in Kalwa, Thane',
  description:
    'Welcome to CozyMoments. A peaceful, private studio apartment in Kalwa, Thane. Reserved by the hour from ₹300/hr. Total discretion, thoughtful amenities, and keyless check-in.',
  openGraph: {
    title: 'Home | CozyMoments, Private Studio in Kalwa, Thane',
    description:
      'Welcome to CozyMoments. A peaceful, private studio apartment in Kalwa, Thane. Reserved by the hour from ₹300/hr.',
    url: 'https://cozymoments.in/home',
    siteName: 'CozyMoments',
    locale: 'en_IN',
    type: 'website',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Welcome to CozyMoments Private Studio Apartment in Kalwa, Thane',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Home | CozyMoments, Private Studio in Kalwa, Thane',
    description:
      'Welcome to CozyMoments. A peaceful, private studio apartment in Kalwa, Thane. Reserved by the hour from ₹300/hr.',
    images: ['/og-image.jpg'],
  },
};

export default function HomeOverviewPage() {
  return <HomeOverviewClient />;
}
