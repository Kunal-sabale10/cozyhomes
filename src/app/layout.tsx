import type { Metadata, Viewport } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import { Suspense } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: "#5B3929",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL("https://cozymoments.in"),
  title: "Private Studio in Kalwa, Thane | CozyMoments",
  description:
    "A private, fully-furnished studio apartment in Kalwa, Thane. Hourly booking starting at ₹300/hour. Complete privacy, air-conditioned comfort, and keyless check-in.",
  keywords: [
    "private studio",
    "hourly booking",
    "Kalwa",
    "Thane",
    "private stay",
    "CozyMoments",
    "studio apartment",
    "day use room",
  ],
  icons: {
    icon: "/icon.svg",
    shortcut: "/icon.svg",
    apple: "/icon.svg",
  },
  openGraph: {
    title: "Private Studio in Kalwa, Thane | CozyMoments",
    description:
      "A private, fully-furnished studio apartment in Kalwa, Thane. Hourly booking starting at ₹300/hour. Complete privacy, thoughtful amenities.",
    url: "https://cozymoments.in",
    siteName: "CozyMoments",
    locale: "en_IN",
    type: "website",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "CozyMoments Private Studio Apartment in Kalwa, Thane",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Private Studio in Kalwa, Thane | CozyMoments",
    description:
      "Your private retreat in Kalwa, Thane. Book by the hour, starting at ₹300/hr.",
    images: ["/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "LodgingBusiness",
  name: "CozyMoments",
  description:
    "Private, fully-furnished studio apartment available for hourly booking in Kalwa, Thane.",
  url: "https://cozymoments.in",
  telephone: "+919876543210",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Kalwa",
    addressRegion: "Thane, Maharashtra",
    postalCode: "400605",
    addressCountry: "IN",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: 19.2094,
    longitude: 73.0356,
  },
  priceRange: "₹300/hour",
  currenciesAccepted: "INR",
  openingHours: "Mo-Su 08:00-23:00",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${playfair.variable} h-full antialiased`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-full flex flex-col font-sans bg-ivory text-charcoal">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-espresso focus:text-ivory focus:rounded-md focus:shadow-lg focus:outline-none focus:ring-2 focus:ring-sand"
        >
          Skip to main content
        </a>
        <Navbar />
        <main id="main-content" className="flex-1" tabIndex={-1}>
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
