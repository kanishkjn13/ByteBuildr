import React from 'react';
import { SEOHead } from '../seo/SEOHead';
import { Hero } from '../components/Hero';
import { TrustStrip } from '../components/sections/TrustStrip';
import { ServicesGrid } from '../components/ServicesGrid';
import { InteractiveRoadmap } from '../components/InteractiveRoadmap';
import { FinalCTASection } from '../components/sections/FinalCTASection';
import { Testimonials } from '../components/Testimonials';
import { useBooking } from '../hooks/useBooking';

export const HomePage: React.FC = () => {
  const { openBooking } = useBooking();

  const handleOpenBookingWithService = (serviceTitle: string) => {
    openBooking({
      projectOverview: `Inquiring about ${serviceTitle} service package.`
    });
  };

  const handleNavigateToServices = () => {
    const el = document.getElementById('services');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <SEOHead 
        title="Byte Build | Strategic Digital Growth Agency"
        description="We build digital growth engines that earn trust, attract clients, and scale revenue for healthcare practices, luxury real estate, hospitality, legal firms, and scale-ups."
      />

      <div id="main-content">
        {/* Section 1: Hero */}
        <Hero
          onOpenBooking={() => openBooking()}
          onNavigateToCalculator={handleNavigateToServices}
        />

        {/* Section 2: Trust */}
        <TrustStrip />

        {/* Section 3: Services */}
        <ServicesGrid
          onOpenBookingWithService={handleOpenBookingWithService}
        />

        {/* Section 3.5: Testimonials */}
        <Testimonials />

        {/* Section 4: Process */}
        <InteractiveRoadmap />

        {/* Section 5: Final CTA */}
        <FinalCTASection />
      </div>
    </>
  );
};
