import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUp, Activity, ShieldCheck, Cpu } from 'lucide-react';
import { ROUTES } from '../constants/routes';
import { useIsMobile } from '../hooks/useIsMobile';

export const Footer: React.FC = () => {
  const [showBackToTop, setShowBackToTop] = useState<boolean>(false);
  const isMobile = useIsMobile();

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
    <footer className="bg-[var(--bg-secondary)] border-t border-[var(--border-light)] py-10 relative overflow-hidden">
      <div className="container mx-auto max-w-6xl px-4">
        
        {isMobile ? (
          <div>
            {/* Native App Directory Grid */}
            <div className="grid grid-cols-2 gap-3 mb-8">
              <Link to={ROUTES.HOME} className="neo-card p-4 rounded-2xl border border-[var(--border-light)] flex items-center justify-between text-xs font-bold text-[var(--text-primary)]">
                <span>Home Directory</span>
                <span className="text-[var(--accent-primary)]">→</span>
              </Link>
              <Link to={ROUTES.ABOUT} className="neo-card p-4 rounded-2xl border border-[var(--border-light)] flex items-center justify-between text-xs font-bold text-[var(--text-primary)]">
                <span>About Info</span>
                <span className="text-[var(--accent-primary)]">→</span>
              </Link>
              <Link to={ROUTES.SERVICES} className="neo-card p-4 rounded-2xl border border-[var(--border-light)] flex items-center justify-between text-xs font-bold text-[var(--text-primary)]">
                <span>Our Services</span>
                <span className="text-[var(--accent-primary)]">→</span>
              </Link>
              <Link to={ROUTES.PORTFOLIO} className="neo-card p-4 rounded-2xl border border-[var(--border-light)] flex items-center justify-between text-xs font-bold text-[var(--text-primary)]">
                <span>Case Studies</span>
                <span className="text-[var(--accent-primary)]">→</span>
              </Link>
            </div>

            {/* Mock Telemetry Widget */}
            <div className="neo-inset p-4 rounded-2xl bg-[var(--surface-card)] border border-[var(--border-subtle)] space-y-2 text-[10px] font-mono text-[var(--text-secondary)] mb-8">
              <div className="flex items-center justify-between">
                <span className="flex items-center gap-1.5">
                  <Activity className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                  <span>Edge Infrastructure</span>
                </span>
                <span className="font-bold text-emerald-500">ACTIVE</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-[var(--accent-primary)] shrink-0" />
                  <span>SSL Certification</span>
                </span>
                <span className="font-bold text-[var(--text-primary)]">256-BIT AES</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="flex items-center gap-1.5">
                  <Cpu className="w-3.5 h-3.5 text-[var(--accent-primary)] shrink-0" />
                  <span>Edge Cache Hit Ratio</span>
                </span>
                <span className="font-bold text-[var(--text-primary)]">99.8%</span>
              </div>
            </div>

            {/* Bottom branding / copyright */}
            <div className="flex flex-col items-center justify-center gap-4 text-center border-t border-[var(--border-subtle)] pt-6">
              <Link to={ROUTES.HOME} className="flex items-center gap-2 group">
                <img 
                  src="/logo.png" 
                  alt="Byte Build Logo" 
                  className="w-7 h-7 object-contain group-hover:scale-105 transition-all duration-300"
                />
                <span className="font-extrabold text-xs tracking-tight text-[var(--text-primary)]">
                  BYTE BUILD
                </span>
              </Link>

              <span className="text-[10px] font-mono text-[var(--text-tertiary)]">
                © {new Date().getFullYear()} Byte Build.
              </span>
            </div>
          </div>
        ) : (
          /* Perfectly Centered Minimal Footer */
          <div className="flex flex-wrap items-center justify-center gap-3.5 text-xs text-center">
            
            <Link to={ROUTES.HOME} className="flex items-center gap-2 group">
              <img 
                src="/logo.png" 
                alt="Byte Build Logo" 
                className="w-7 h-7 object-contain group-hover:scale-105 transition-all duration-300"
              />
              <span className="font-extrabold text-xs tracking-tight text-[var(--text-primary)]">
                BYTE BUILD
              </span>
            </Link>

            <span className="text-[var(--border-light)] font-light">|</span>

            <span className="text-[11px] font-mono text-[var(--text-tertiary)]">
              © {new Date().getFullYear()} Byte Build. All rights reserved.
            </span>

          </div>
        )}

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
