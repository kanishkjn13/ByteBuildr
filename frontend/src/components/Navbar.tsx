import React, { useEffect, useState } from 'react';
import { NavLink, Link, useLocation } from 'react-router-dom';
import { Sun, Moon, Mail, Home, Info, Compass, Briefcase } from 'lucide-react';

import { ROUTES } from '../constants/routes';
import { useBooking } from '../hooks/useBooking';
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
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
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
      {/* Sticky Floating and Shrinking Header */}
      <header 
        className={`fixed left-0 right-0 z-50 mx-auto transition-all duration-300 ease-out border-b ${
          isScrolled 
            ? 'top-0 w-full py-2.5 bg-[var(--surface-card)]/80 backdrop-blur-xl border-[var(--border-subtle)] shadow-md md:top-4 md:w-[92%] md:max-w-7xl md:rounded-2xl md:border md:shadow-xl md:shadow-black/10' 
            : 'top-0 w-full py-5 bg-[var(--surface-card)]/90 backdrop-blur-xl border-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-2 md:gap-4 transition-all duration-300">
          
          {/* Left: Brand Logo Emblem */}
          <Link to={ROUTES.HOME} onClick={handleNavClick} className="flex items-center gap-2.5 group shrink-0">
            <img 
              src="/logo.png" 
              alt="ByteBuilders Logo" 
              className={`object-contain group-hover:scale-105 transition-all duration-300 ${
                isScrolled ? 'w-8 h-8' : 'w-10 h-10'
              }`}
            />
            <div className="text-left">
              <span className={`font-extrabold tracking-tight text-[var(--text-primary)] block leading-none font-sans transition-all duration-300 ${
                isScrolled ? 'text-xs md:text-sm' : 'text-sm md:text-base'
              }`}>
                BYTEBUILDERS
              </span>
              <span className={`font-mono tracking-[0.22em] text-[var(--accent-primary)] uppercase block transition-all duration-300 font-bold ${
                isScrolled ? 'text-[0px] h-0 opacity-0 mt-0' : 'text-[9px] h-auto opacity-100 mt-1'
              }`}>
                {agencyInfo.tagline}
              </span>
            </div>
          </Link>

          {/* Center: Clean Nav Links (Tablet & Desktop) */}
          <nav className="hidden md:flex items-center rounded-full neo-inset border border-[var(--border-subtle)] bg-[var(--surface-recessed)]/50 gap-1 p-1 px-2">
            {navLinks.map((link) => {
              const isActive = location.pathname === link.path;
              return (
                <NavLink
                  key={link.path}
                  to={link.path}
                  onClick={handleNavClick}
                  className={`rounded-full font-semibold transition-all duration-300 px-5 py-1.5 text-xs lg:text-sm border ${
                    isActive
                      ? 'text-[var(--accent-primary)] font-bold border-[var(--accent-primary)] bg-transparent'
                      : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)] border-transparent'
                  }`}
                >
                  <span>{link.label}</span>
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
                aria-label="Toggle color theme"
              >
                {propsTheme === 'dark' ? <Sun className="w-3.5 h-3.5 text-amber-400" /> : <Moon className="w-3.5 h-3.5 text-slate-700" />}
              </button>
            )}

            <button
              onClick={() => handleBooking({ projectOverview: 'Inquiring via Navbar CTA' })}
              className={`neo-btn neo-btn-accent font-bold hover:shadow-[0_10px_25px_rgba(37,99,235,0.5)] transition-all text-xs shadow-[0_6px_20px_rgba(37,99,235,0.35)] ${
                isScrolled ? 'py-1.5 px-3.5' : 'py-2 px-5'
              }`}
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
                aria-label="Toggle color theme"
              >
                {propsTheme === 'dark' ? <Sun className="w-3.5 h-3.5 text-amber-400" /> : <Moon className="w-3.5 h-3.5 text-slate-700" />}
              </button>
            )}
            
            <button
              onClick={() => handleBooking({ projectOverview: 'Inquiring via Mobile Header CTA' })}
              className="neo-btn neo-btn-accent font-bold transition-all text-[10px] py-2 px-3 rounded-lg shadow-sm shrink-0"
            >
              <span>Consult</span>
            </button>
          </div>

        </div>
      </header>

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
                  className="flex flex-col items-center justify-center flex-1 h-full relative group"
                >
                  {/* Static Indicator Bar for Mobile */}
                  {isActive && (
                    <div className="absolute top-0 left-2 right-2 h-[3px] bg-[var(--accent-primary)] rounded-full" />
                  )}

                  <Icon className={`w-5 h-5 transition-transform duration-300 ${
                    isActive ? 'text-[var(--accent-primary)]' : 'text-[var(--text-secondary)]'
                  }`} />
                  
                  <span className={`text-[10px] font-bold mt-1 tracking-tight transition-colors duration-300 ${
                    isActive ? 'text-[var(--accent-primary)] font-extrabold' : 'text-[var(--text-secondary)]'
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
