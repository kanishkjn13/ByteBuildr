import React, { useEffect, useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Lenis from 'lenis';
import { motion, AnimatePresence } from 'framer-motion';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { ConsultationModal } from '../components/ConsultationModal';
import { useBooking } from '../hooks/useBooking';
import { useIsMobile } from '../hooks/useIsMobile';

export const MainLayout: React.FC = () => {
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    return (localStorage.getItem('bytebuild_theme') as 'light' | 'dark') || 'light';
  });

  const { isOpen, initialData, openBooking, closeBooking } = useBooking();
  const location = useLocation();
  const isMobile = useIsMobile();

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('bytebuild_theme', theme);
  }, [theme]);

  // Lenis Smooth Scroll Engine
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  const toggleTheme = () => {
    setTheme(prev => (prev === 'light' ? 'dark' : 'light'));
  };

  return (
    <div className="min-h-screen bg-[var(--bg-primary)] text-[var(--text-primary)] transition-colors duration-300 font-sans flex flex-col justify-between">
      


      {/* WCAG Skip-to-Content Link */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2 focus:bg-[var(--accent-primary)] focus:text-white focus:rounded-xl focus:shadow-2xl text-xs font-bold"
      >
        Skip to main content
      </a>

      {/* Navigation Header */}
      <Navbar
        theme={theme}
        toggleTheme={toggleTheme}
        onOpenBooking={openBooking}
      />

      {/* Main Page Outlet with Route Transitions */}
      <main id="main-content" className="flex-1 pb-24 md:pb-0">
        <AnimatePresence mode="wait">
          <motion.div
            key={location.pathname}
            initial={isMobile ? { opacity: 0, y: 16 } : { opacity: 0 }}
            animate={{ opacity: 1, y: 0 }}
            exit={isMobile ? { opacity: 0, y: -16 } : { opacity: 0 }}
            transition={
              isMobile 
                ? { type: 'spring', damping: 28, stiffness: 180, mass: 1 } 
                : { duration: 0.25 }
            }
          >
            <Outlet />
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Footer */}
      <Footer />

      {/* Global Consultation Booking Modal */}
      <ConsultationModal
        isOpen={isOpen}
        onClose={closeBooking}
        initialData={initialData}
      />

      {/* Floating Action Button (FAB) on mobile viewports - Disabled to prevent overlap with bottom navigation */}

    </div>
  );
};
