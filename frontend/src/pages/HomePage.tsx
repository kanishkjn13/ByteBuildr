import React from 'react';
import { Helmet } from 'react-helmet-async';
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
      <Helmet>
        <title>ByteBuilders | AI-Powered Web Development</title>
        <meta
          name="description"
          content="Modern websites, AI solutions and software development."
        />
      </Helmet>

      <div id="main-content">
        {/* Section 1: Hero */}
        <Hero
          onOpenBooking={() => openBooking()}
          onNavigateToCalculator={handleNavigateToServices}
        />

        {/* Section 2: Trust (Desktop Only, since Mobile is inline inside Hero) */}
        <div className="hidden md:block">
          <TrustStrip />
        </div>

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
