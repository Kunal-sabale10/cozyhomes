import Hero from '@/components/home/Hero';
import TrustStrip from '@/components/home/TrustStrip';
import StudioGallery from '@/components/home/StudioGallery';
import HowItWorks from '@/components/home/HowItWorks';
import AmenitiesGrid from '@/components/home/AmenitiesGrid';
import PricingSection from '@/components/home/PricingSection';
import LocationSection from '@/components/home/LocationSection';
import FAQSection from '@/components/home/FAQSection';

export default function HomePage() {
  return (
    <>
      {/* 1. Hero with integrated booking card on right */}
      <Hero />

      {/* 2. Trust Strip (4 items marked as [Placeholder]) */}
      <TrustStrip />

      {/* 3. Studio Gallery (Bento Grid, 5 images + lightbox) */}
      <StudioGallery />

      {/* 4. How Booking Works (3 steps) */}
      <HowItWorks />

      {/* 5. Amenities with Icons */}
      <AmenitiesGrid />

      {/* 6. Pricing Table with Examples (2h, 3h, 4h) */}
      <PricingSection />

      {/* 7. Location with Map */}
      <LocationSection />

      {/* 8. FAQ Accordion */}
      <FAQSection />
    </>
  );
}
