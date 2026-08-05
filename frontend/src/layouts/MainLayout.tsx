import React, { useEffect, useState, useRef } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Lenis from 'lenis';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar } from 'lucide-react';
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
  const [showFab, setShowFab] = useState<boolean>(false);
  const [isFabCollapsed, setIsFabCollapsed] = useState<boolean>(false);
  const lastScrollY = useRef<number>(0);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('bytebuild_theme', theme);
  }, [theme]);

  // Mobile scroll listener for FAB adaptive collapse
  useEffect(() => {
    if (!isMobile) {
      setShowFab(false);
      return;
    }
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY > 350) {
        setShowFab(true);
      } else {
        setShowFab(false);
      }
      
      if (currentScrollY > lastScrollY.current && currentScrollY > 400) {
        setIsFabCollapsed(true);
      } else if (currentScrollY < lastScrollY.current) {
        setIsFabCollapsed(false);
      }
      lastScrollY.current = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isMobile]);

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
      <main id="main-content" className="flex-1">
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

      {/* Floating Action Button (FAB) on mobile viewports */}
      <AnimatePresence>
        {isMobile && showFab && (
          <motion.button
            initial={{ opacity: 0, y: 30, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 30, scale: 0.8 }}
            transition={{ type: 'spring', damping: 22, stiffness: 260 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => openBooking()}
            className="fixed bottom-6 left-6 z-40 bg-[var(--accent-primary)] text-white shadow-2xl flex items-center justify-center border border-blue-400/20 select-none pointer-events-auto h-12 rounded-full font-extrabold text-xs"
            style={{ width: isFabCollapsed ? '48px' : '140px', transition: 'width 0.3s cubic-bezier(0.16, 1, 0.3, 1)' }}
          >
            <div className="flex items-center gap-2 px-3 overflow-hidden">
              <Calendar className="w-4 h-4 shrink-0" />
              {!isFabCollapsed && <span className="truncate">Book Strategy</span>}
            </div>
          </motion.button>
        )}
      </AnimatePresence>

    </div>
  );
};
