import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import ReactGA from 'react-ga4';

export const ScrollToTop = () => {
  const { pathname, search } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    
    // Track pageview in Google Analytics on route transition
    ReactGA.send({ hitType: 'pageview', page: pathname + search });
  }, [pathname, search]);

  return null;
};
