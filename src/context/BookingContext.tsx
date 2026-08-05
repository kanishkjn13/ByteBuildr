import React, { createContext, useState, useContext, type ReactNode } from 'react';
import type { BookingData } from '../types';
import { analytics } from '../services/analytics';

interface BookingContextType {
  isOpen: boolean;
  initialData: Partial<BookingData>;
  openBooking: (prefill?: Partial<BookingData>) => void;
  closeBooking: () => void;
}

const BookingContext = createContext<BookingContextType | undefined>(undefined);

export const BookingProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [initialData, setInitialData] = useState<Partial<BookingData>>({});

  const openBooking = (prefill?: Partial<BookingData>) => {
    if (prefill) {
      setInitialData(prefill);
    } else {
      setInitialData({});
    }
    setIsOpen(true);
    analytics.trackEvent('consultation_modal_open', 'conversion', prefill?.projectOverview || 'general');
  };

  const closeBooking = () => {
    setIsOpen(false);
    analytics.trackEvent('consultation_modal_close', 'navigation');
  };

  return (
    <BookingContext.Provider value={{ isOpen, initialData, openBooking, closeBooking }}>
      {children}
    </BookingContext.Provider>
  );
};

export const useBookingContext = (): BookingContextType => {
  const context = useContext(BookingContext);
  if (!context) {
    throw new Error('useBookingContext must be used within a BookingProvider');
  }
  return context;
};
