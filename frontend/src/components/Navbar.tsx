// 1. React & Routing Libraries
import React, { useState, useEffect } from 'react';
import { NavLink, Link, useLocation } from 'react-router-dom';

// 2. Animations & Visual Physics
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Sun, Moon, ArrowRight, Phone, Mail, Home, Info, Compass, Briefcase } from 'lucide-react';

// 3. Constants, Hooks & Types
import { ROUTES } from '../constants/routes';
import { useBooking } from '../hooks/useBooking';
import type { BookingData } from '../types';

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
  const [isScrolled, setIsScrolled] = useState<boolean>(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);

  const { openBooking: hookOpenBooking } = useBooking();
  const location = useLocation();

  const handleBooking = (data?: Partial<BookingData>) => {
    if (propsOpenBooking) {
      propsOpenBooking(data);
    } else {
      hookOpenBooking(data);
    }
  };

  // Scroll listener for sticky floating styling
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 15) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  const handleNavClick = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setIsMobileMenuOpen(false);
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
      {/* Dynamic Header */}
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 pointer-events-none ${
        isScrolled ? 'px-3 md:px-8 pt-3 pb-2' : 'px-0 pt-0 pb-0'
      }`}>
        
        <div
          className={`mx-auto pointer-events-auto transition-all duration-500 ${
            isScrolled
              ? 'max-w-6xl px-4 md:px-6 py-3.5 rounded-2xl md:rounded-full backdrop-blur-xl bg-[var(--bg-primary)]/90 border border-[var(--border-light)] shadow-[0_12px_35px_-10px_rgba(0,0,0,0.12),0_2px_8px_rgba(0,0,0,0.06)] dark:shadow-[0_16px_40px_-10px_rgba(0,0,0,0.6)]'
              : 'max-w-7xl px-6 py-4 rounded-none bg-transparent border-transparent shadow-none'
          }`}
        >
          <div className="flex items-center justify-between gap-2 md:gap-4">
            
            {/* Left: Brand Logo Emblem */}
            <Link to={ROUTES.HOME} onClick={handleNavClick} className="flex items-center gap-2.5 group shrink-0">
              <img 
                src="/logo.png" 
                alt="Byte Build Logo" 
                className="w-10 h-10 object-contain group-hover:scale-105 transition-all duration-300"
              />
              <div className="hidden sm:block text-left transition-all duration-300">
                <span className="font-extrabold tracking-tight text-[var(--text-primary)] block leading-none font-sans text-sm md:text-base">
                  BYTE BUILD
                </span>
                <span className="text-[9px] font-mono tracking-[0.22em] text-[var(--accent-primary)] uppercase block mt-1 font-bold">
                  Digital Partners
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

            {/* Mobile Hamburger Button (<768px) */}
            <div className="flex items-center gap-2 md:hidden">
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="p-2.5 neo-card rounded-xl text-[var(--text-primary)] border border-[var(--border-light)]"
                aria-label="Toggle Menu"
              >
                {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>

          </div>
        </div>
      </header>

      {/* Full-Screen Mobile Drawer */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            {/* Backdrop Blur Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="fixed inset-0 z-30 bg-black/40 backdrop-blur-md lg:hidden"
              onClick={() => setIsMobileMenuOpen(false)}
            />

            {/* Slide-In Menu Panel from the Left (with dynamic iOS Swipe gestures) */}
            <motion.div
              drag="x"
              dragDirectionLock
              dragConstraints={{ left: -360, right: 0 }}
              dragElastic={{ left: 0.05, right: 0.15 }}
              onDragEnd={(_, info) => {
                if (info.offset.x < -80) {
                  setIsMobileMenuOpen(false);
                }
              }}
              initial={{ x: '-100%', opacity: 0.9 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: '-100%', opacity: 0.9 }}
              transition={{ type: 'spring', damping: 28, stiffness: 200 }}
              className="fixed top-0 bottom-0 left-0 w-[85vw] max-w-[360px] z-40 bg-[var(--bg-primary)]/90 backdrop-blur-2xl pt-24 pb-8 px-6 flex flex-col justify-between overflow-y-auto shadow-2xl border-r border-[var(--border-light)] lg:hidden text-left"
            >
              {/* iOS Drag Handle indicator on right edge */}
              <div className="absolute right-1 top-1/2 -translate-y-1/2 w-1.5 h-16 bg-[var(--border-soft)] rounded-full opacity-60" />

              <motion.div
                initial="hidden"
                animate="show"
                exit="exit"
                variants={{
                  hidden: { opacity: 0 },
                  show: {
                    opacity: 1,
                    transition: {
                      staggerChildren: 0.06,
                      delayChildren: 0.08
                    }
                  },
                  exit: {
                    opacity: 0,
                    transition: {
                      staggerChildren: 0.04,
                      staggerDirection: -1
                    }
                  }
                }}
                className="space-y-8"
              >
                <div className="flex items-center justify-between border-b border-[var(--border-soft)] pb-4">
                  <span className="text-[10px] font-mono uppercase tracking-widest text-[var(--text-tertiary)] font-extrabold">EXPLORE MENU</span>
                  {propsToggleTheme && (
                    <button 
                      onClick={propsToggleTheme} 
                      className="text-xs font-mono text-[var(--accent-primary)] font-extrabold bg-[var(--surface-card)] px-3 py-1.5 rounded-full border border-[var(--border-light)] shadow-sm"
                    >
                      {propsTheme === 'dark' ? '☀️ Light' : '🌙 Dark'}
                    </button>
                  )}
                </div>

                {/* Large Staggered Nav Links with Animated Icons */}
                <div className="flex flex-col gap-4">
                  {navLinks.map((item, idx) => {
                    const isActive = location.pathname === item.path;
                    const Icon = item.icon;

                    return (
                      <motion.div
                        key={idx}
                        variants={{
                          hidden: { opacity: 0, x: -20 },
                          show: { opacity: 1, x: 0, transition: { type: 'spring', stiffness: 150, damping: 18 } },
                          exit: { opacity: 0, x: -10, transition: { duration: 0.15 } }
                        }}
                      >
                        <Link
                          to={item.path}
                          onClick={() => setIsMobileMenuOpen(false)}
                          className={`flex items-center justify-between py-2.5 text-2xl font-black tracking-tight transition-colors ${
                            isActive ? 'text-[var(--accent-primary)] font-black' : 'text-[var(--text-primary)]'
                          }`}
                        >
                          <span className="flex items-center gap-3">
                            <div className={`w-10 h-10 rounded-xl flex items-center justify-center border transition-all ${
                              isActive 
                                ? 'bg-blue-500/10 border-blue-500/35 text-[var(--accent-primary)] shadow-sm' 
                                : 'bg-[var(--surface-recessed)] border-[var(--border-soft)] text-[var(--text-secondary)]'
                            }`}>
                              <Icon className="w-5 h-5" />
                            </div>
                            <span className="relative">
                              {item.label}
                              {isActive && (
                                <motion.span 
                                  layoutId="activeDot"
                                  className="absolute -right-3 top-1/2 -translate-y-1/2 w-1.5 h-1.5 bg-[var(--accent-primary)] rounded-full shadow-[0_0_8px_var(--accent-primary)]"
                                />
                              )}
                            </span>
                          </span>
                          <ArrowRight className="w-5 h-5 opacity-30" />
                        </Link>
                      </motion.div>
                    );
                  })}
                </div>

                {/* Support Hotline Widget */}
                <motion.div
                  variants={{
                    hidden: { opacity: 0, y: 15 },
                    show: { opacity: 1, y: 0 },
                    exit: { opacity: 0, y: 10 }
                  }}
                  className="neo-card p-6 rounded-[28px] border border-[var(--border-light)] shadow-card space-y-4"
                >
                  <span className="text-[10px] font-mono text-[var(--text-tertiary)] uppercase font-bold tracking-wider block">SUPPORT & HOTLINE</span>
                  <div className="space-y-3">
                    <a href="tel:+14158903420" className="flex items-center gap-3.5 text-xs text-[var(--text-secondary)] font-semibold hover:text-[var(--accent-primary)] transition-colors">
                      <div className="w-8 h-8 rounded-xl neo-inset flex items-center justify-center text-[var(--accent-primary)]">
                        <Phone className="w-4 h-4" />
                      </div>
                      <div>
                        <span className="block text-[10px] text-[var(--text-tertiary)] font-normal">Call Us Direct</span>
                        <span className="font-bold text-[var(--text-primary)] text-sm">+1 (415) 890-3420</span>
                      </div>
                    </a>
                    <a href="mailto:ByteBuildd@gmail.com" className="flex items-center gap-3.5 text-xs text-[var(--text-secondary)] font-semibold hover:text-[var(--accent-primary)] transition-colors">
                      <div className="w-8 h-8 rounded-xl neo-inset flex items-center justify-center text-[var(--accent-primary)]">
                        <Mail className="w-4 h-4" />
                      </div>
                      <div>
                        <span className="block text-[10px] text-[var(--text-tertiary)] font-normal">Email Support</span>
                        <span className="font-bold text-[var(--text-primary)] text-sm">ByteBuildd@gmail.com</span>
                      </div>
                    </a>
                  </div>
                </motion.div>
              </motion.div>

              <motion.div 
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                transition={{ delay: 0.2 }}
                className="pt-6"
              >
                <button
                  onClick={() => { setIsMobileMenuOpen(false); handleBooking(); }}
                  className="neo-btn neo-btn-accent text-xs min-h-[52px] rounded-full w-full justify-center shadow-lg font-bold"
                >
                  <span>Book Free Consultation</span>
                </button>
              </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};
