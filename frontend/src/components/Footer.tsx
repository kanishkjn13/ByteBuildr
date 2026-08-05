import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUp } from 'lucide-react';
import { ROUTES } from '../constants/routes';
import { agencyInfo } from '../data/agencyData';

export const Footer: React.FC = () => {
  const [showBackToTop, setShowBackToTop] = useState<boolean>(false);

  // Scroll listener for Back-to-Top button
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 400) {
        setShowBackToTop(true);
      } else {
        setShowBackToTop(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[var(--bg-secondary)] border-t border-[var(--border-light)] pt-6 pb-20 md:py-10 relative overflow-hidden">
      <div className="container mx-auto max-w-6xl px-4">
        
        {/* Responsive Centered Minimal Footer */}
        <div className="flex flex-col md:flex-row items-center justify-center gap-4 text-xs text-center">
          
          <Link to={ROUTES.HOME} className="flex items-center gap-2.5 group text-left">
            <img 
              src="/logo.png" 
              alt="Byte Build Logo" 
              className="w-7 h-7 object-contain group-hover:scale-105 transition-all duration-300"
            />
            <div>
              <span className="font-extrabold text-xs tracking-tight text-[var(--text-primary)] block leading-none">
                BYTE BUILD
              </span>
              <span className="text-[7.5px] font-mono tracking-[0.08em] text-[var(--text-tertiary)] uppercase block mt-0.5 font-bold">
                {agencyInfo.tagline}
              </span>
            </div>
          </Link>

          <span className="hidden md:inline text-[var(--border-light)] font-light">|</span>

          <span className="text-[11px] font-mono text-[var(--text-tertiary)]">
            © {new Date().getFullYear()} Byte Build. All rights reserved.
          </span>

        </div>

      </div>

      {/* Floating Back-to-Top Button */}
      <AnimatePresence>
        {showBackToTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            onClick={scrollToTop}
            className="fixed bottom-6 right-6 z-40 w-12 h-12 rounded-full bg-[var(--accent-primary)] text-white shadow-2xl flex items-center justify-center hover:scale-110 active:scale-95 transition-transform focus:outline-none"
            aria-label="Back to top"
            title="Back to top"
          >
            <ArrowUp className="w-5 h-5" />
          </motion.button>
        )}
      </AnimatePresence>
    </footer>
  );
};
