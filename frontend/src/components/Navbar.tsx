import React, { useEffect, useState } from 'react';
import { NavLink, Link, useLocation } from 'react-router-dom';

// 2. Animations & Visual Physics
import { motion, AnimatePresence } from 'framer-motion';
import { Sun, Moon, Mail, Home, Info, Compass, Briefcase } from 'lucide-react';

// 3. Constants, Hooks & Types
import { ROUTES } from '../constants/routes';
import { useBooking } from '../hooks/useBooking';
import { useIsMobile } from '../hooks/useIsMobile';
import type { BookingData } from '../types';
import { agencyInfo } from '../data/agencyData';

interface NavbarProps {
  theme?: 'light' | 'dark';
  toggleTheme?: () => void;
  onOpenBooking?: (data?: Partial<BookingData>) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  theme: propsTheme,
  toggleTheme: propsToggleTheme,
  onOpenBooking: propsOpenBooking
}) => {


  const { openBooking: hookOpenBooking } = useBooking();
  const location = useLocation();
  const isMobile = useIsMobile();
  const [isScrolled, setIsScrolled] = useState(false);
  const theme = propsTheme || 'light';

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY > 80) {
        setIsScrolled(true);
      } else if (currentScrollY < 20) {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleBooking = (data?: Partial<BookingData>) => {
    if (propsOpenBooking) {
      propsOpenBooking(data);
    } else {
      hookOpenBooking(data);
    }
  };

  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [location.pathname]);

  const handleNavClick = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navLinks = [
    { label: 'Home', path: ROUTES.HOME, icon: Home },
    { label: 'About', path: ROUTES.ABOUT, icon: Info },
    { label: 'Services', path: ROUTES.SERVICES, icon: Compass },
    { label: 'Portfolio', path: ROUTES.PORTFOLIO, icon: Briefcase },
    { label: 'Contact', path: ROUTES.CONTACT, icon: Mail }
  ];

  return (
    <>
      {/* Sticky Header */}
      <motion.header
        initial={false}
        animate={
          isScrolled && !isMobile
            ? {
                y: 16,
                width: "95%",
                maxWidth: "1280px", // aligns with max-w-7xl
                borderRadius: "9999px",
                boxShadow: theme === 'dark' 
                  ? "0 10px 30px -10px rgba(0, 0, 0, 0.5), 0 1px 3px rgba(0, 0, 0, 0.2)"
                  : "0 10px 30px -10px rgba(15, 23, 42, 0.08), 0 1px 3px rgba(15, 23, 42, 0.03)",
                borderTopColor: theme === 'dark' ? "rgba(255, 255, 255, 0.08)" : "#e5e7eb",
                borderLeftColor: theme === 'dark' ? "rgba(255, 255, 255, 0.08)" : "#e5e7eb",
                borderRightColor: theme === 'dark' ? "rgba(255, 255, 255, 0.08)" : "#e5e7eb",
                borderBottomColor: theme === 'dark' ? "rgba(255, 255, 255, 0.08)" : "#e5e7eb",
              }
            : {
                y: 0,
                width: "100%",
                maxWidth: "100%",
                borderRadius: "0px",
                boxShadow: "0 1px 3px rgba(15, 23, 42, 0.04)",
                borderTopColor: "rgba(0, 0, 0, 0)",
                borderLeftColor: "rgba(0, 0, 0, 0)",
                borderRightColor: "rgba(0, 0, 0, 0)",
                borderBottomColor: isMobile 
                  ? (theme === 'dark' ? "rgba(255, 255, 255, 0.08)" : "#e5e7eb") 
                  : "rgba(0, 0, 0, 0)",
              }
        }
        transition={{
          type: "spring",
          stiffness: 300,
          damping: 32,
          mass: 0.8
        }}
        className="fixed top-0 left-0 right-0 z-50 mx-auto bg-[var(--surface-card)]/80 backdrop-blur-xl border"
      >
        <div className="mx-auto w-full">
          <motion.div
            animate={{
              paddingTop: isScrolled && !isMobile ? "10px" : "14px",
              paddingBottom: isScrolled && !isMobile ? "10px" : "14px",
              paddingLeft: isMobile 
                ? "16px" 
                : isScrolled 
                ? "40px" // Add more padding to offset rounded capsule corners
                : "32px", // md:px-8 = 32px
              paddingRight: isMobile 
                ? "16px" 
                : isScrolled 
                ? "40px" 
                : "32px",
            }}
            transition={{
              type: "spring",
              stiffness: 300,
              damping: 32,
              mass: 0.8
            }}
            className="max-w-7xl mx-auto flex items-center justify-between gap-2 md:gap-4"
          >
            
            {/* Left: Brand Logo Emblem */}
            <Link to={ROUTES.HOME} onClick={handleNavClick} className="flex items-center gap-2.5 group shrink-0">
              <img 
                src="/logo.png" 
                alt="Byte Build Logo" 
                className="w-10 h-10 object-contain group-hover:scale-105 transition-all duration-300"
              />
              <div className="text-left transition-all duration-300">
                <span className="font-extrabold tracking-tight text-[var(--text-primary)] block leading-none font-sans text-sm md:text-base">
                  BYTE BUILD
                </span>
                <span className="text-[9px] font-mono tracking-[0.22em] text-[var(--accent-primary)] uppercase block mt-1 font-bold">
                  {agencyInfo.tagline}
                </span>
              </div>
            </Link>

            {/* Center: Clean Nav Links (Tablet & Desktop) */}
            <nav className="hidden md:flex items-center rounded-full neo-inset border border-[var(--border-subtle)] bg-[var(--surface-recessed)]/50 gap-1.5 p-1 px-2.5 transition-all duration-300">
              {navLinks.map((link) => {
                const isActive = location.pathname === link.path;
                return (
                  <NavLink
                    key={link.path}
                    to={link.path}
                    onClick={handleNavClick}
                    className={`relative rounded-full font-semibold transition-all duration-300 px-3.5 lg:px-6 py-1.5 lg:py-2 text-xs lg:text-sm ${
                      isActive
                        ? 'text-[var(--accent-primary)] font-bold'
                        : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
                    }`}
                  >
                    <span className="relative z-10">{link.label}</span>
                    {isActive && (
                      <motion.span
                        layoutId="activeNavIndicator"
                        className="absolute bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 bg-[var(--accent-primary)] rounded-full z-0"
                        transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                      />
                    )}
                  </NavLink>
                );
              })}
            </nav>

            {/* Right: Theme Toggle + Booking CTA (Tablet & Desktop) */}
            <div className="hidden md:flex items-center gap-2 lg:gap-3">
              {propsToggleTheme && (
                <button
                  onClick={propsToggleTheme}
                  className="w-9 h-9 rounded-xl neo-card border border-[var(--border-light)] flex items-center justify-center text-[var(--text-secondary)] hover:text-[var(--accent-primary)] transition-all hover:scale-105 active:shadow-inner shadow-sm overflow-hidden"
                  title="Toggle Theme"
                >
                  <AnimatePresence mode="wait" initial={false}>
                    <motion.div
                      key={propsTheme}
                      initial={{ y: 8, opacity: 0, rotate: -90 }}
                      animate={{ y: 0, opacity: 1, rotate: 0 }}
                      exit={{ y: -8, opacity: 0, rotate: 90 }}
                      transition={{ duration: 0.25, ease: 'easeOut' }}
                    >
                      {propsTheme === 'dark' ? <Sun className="w-3.5 h-3.5 text-amber-400" /> : <Moon className="w-3.5 h-3.5 text-slate-700" />}
                    </motion.div>
                  </AnimatePresence>
                </button>
              )}

              <button
                onClick={() => handleBooking({ projectOverview: 'Inquiring via Navbar CTA' })}
                className="neo-btn neo-btn-accent font-bold hover:shadow-[0_10px_25px_rgba(37,99,235,0.5)] transition-all text-xs py-2 px-3.5 lg:py-2.5 lg:px-5 shadow-[0_6px_20px_rgba(37,99,235,0.35)]"
              >
                <span>Book Consultation</span>
              </button>
            </div>

            {/* Mobile Header Actions (<768px) */}
            <div className="flex items-center gap-2 md:hidden">
              {propsToggleTheme && (
                <button
                  onClick={propsToggleTheme}
                  className="w-9 h-9 rounded-xl neo-card border border-[var(--border-light)] flex items-center justify-center text-[var(--text-secondary)] hover:text-[var(--accent-primary)] transition-all active:scale-95 shadow-sm overflow-hidden"
                  title="Toggle Theme"
                >
                  <AnimatePresence mode="wait" initial={false}>
                    <motion.div
                      key={propsTheme}
                      initial={{ y: 8, opacity: 0, rotate: -90 }}
                      animate={{ y: 0, opacity: 1, rotate: 0 }}
                      exit={{ y: -8, opacity: 0, rotate: 90 }}
                      transition={{ duration: 0.25, ease: 'easeOut' }}
                    >
                      {propsTheme === 'dark' ? <Sun className="w-3.5 h-3.5 text-amber-400" /> : <Moon className="w-3.5 h-3.5 text-slate-700" />}
                    </motion.div>
                  </AnimatePresence>
                </button>
              )}
              
              <button
                onClick={() => handleBooking({ projectOverview: 'Inquiring via Mobile Header CTA' })}
                className="neo-btn neo-btn-accent font-bold transition-all text-[10px] py-2 px-3 rounded-lg shadow-sm shrink-0"
              >
                <span>Consult</span>
              </button>
            </div>

          </motion.div>
        </div>
      </motion.header>

      {/* Sticked Bottom Nav Bar for Mobile (<768px) */}
      <div className="fixed bottom-0 left-0 right-0 z-50 md:hidden flex justify-center pointer-events-none">
        <div 
          className="pointer-events-auto w-full border-t border-[var(--border-light)] bg-[var(--surface-card)]/95 backdrop-blur-xl shadow-[0_-8px_30px_rgba(0,0,0,0.08)] dark:shadow-[0_-12px_40px_rgba(0,0,0,0.4)] overflow-hidden"
          style={{ paddingBottom: 'calc(env(safe-area-inset-bottom, 10px) + 6px)' }}
        >
          <div className="flex items-center justify-around h-16 relative py-1">
            {navLinks.map((link) => {
              const isActive = location.pathname === link.path;
              const Icon = link.icon;

              return (
                <NavLink
                  key={link.path}
                  to={link.path}
                  onClick={handleNavClick}
                  className="flex flex-col items-center justify-center flex-1 h-full relative group transition-colors duration-300"
                >
                  {/* Top Active Indicator Bar with Ambient Blue Glow (Matches Reference Image) */}
                  {isActive && (
                    <>
                      <motion.div
                        layoutId="activeMobileLine"
                        className="absolute top-0 left-2 right-2 h-[3px] bg-[var(--accent-primary)] rounded-full"
                        transition={{ type: 'spring', stiffness: 350, damping: 28 }}
                      />
                      <motion.div
                        layoutId="activeMobileGlow"
                        className="absolute top-0 left-2 right-2 h-4 bg-gradient-to-b from-[var(--accent-primary)]/20 to-transparent blur-[4px] pointer-events-none"
                        transition={{ type: 'spring', stiffness: 350, damping: 28 }}
                      />
                    </>
                  )}

                  <Icon className={`w-5 h-5 transition-transform duration-300 group-active:scale-90 ${
                    isActive ? 'text-[var(--accent-primary)]' : 'text-[var(--text-secondary)] group-hover:text-[var(--text-primary)]'
                  }`} />
                  
                  <span className={`text-[10px] font-bold mt-1 tracking-tight transition-colors duration-300 ${
                    isActive ? 'text-[var(--accent-primary)] font-extrabold' : 'text-[var(--text-secondary)] group-hover:text-[var(--text-primary)]'
                  }`}>
                    {link.label}
                  </span>
                </NavLink>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
};
