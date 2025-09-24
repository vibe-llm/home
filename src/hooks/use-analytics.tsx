import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { trackPageView } from '@/lib/analytics';

// Custom hook to track page views automatically
export const usePageTracking = (pageName?: string) => {
  const location = useLocation();

  useEffect(() => {
    // Small delay to ensure the page has rendered and title is updated
    const timer = setTimeout(() => {
      trackPageView(pageName);
    }, 100);

    return () => clearTimeout(timer);
  }, [location.pathname, location.hash, pageName]);
};

export default usePageTracking;
