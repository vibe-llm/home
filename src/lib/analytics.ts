import * as amplitude from '@amplitude/analytics-browser';
import { pageViewTrackingPlugin } from '@amplitude/plugin-page-view-tracking-browser';

// Initialize Amplitude - you'll need to replace this with your actual API key
const AMPLITUDE_API_KEY = 'f7902b59b5e9a5c569166f526ddf318a';

// Initialize Amplitude
amplitude.init(AMPLITUDE_API_KEY, undefined, {
  defaultTracking: {
    attribution: false,
    fileDownloads: false,
    formInteractions: false,
    pageViews: false, // We'll handle page views manually for better control
    sessions: true,
  },
});

// Add page view tracking plugin
const pageViewTracking = pageViewTrackingPlugin({
  trackOn: () => true,
  trackHistoryChanges: 'all', // Important for React Router hash routing
});

amplitude.add(pageViewTracking);

// Helper function to get current page key from location
export const getCurrentPageKey = (): string => {
  const pathname = window.location.hash.replace('#', '') || '/';
  return pathname === '' ? '/' : pathname;
};

// Helper function to track page views with custom page key
export const trackPageView = (pageName?: string) => {
  const pageKey = getCurrentPageKey();
  amplitude.track('Page View', {
    page_key: pageKey,
    page_name: pageName || pageKey,
    page_url: window.location.href,
    page_title: document.title,
  });
};

// Helper function to track button clicks
export const trackButtonClick = (buttonKey: string, additionalProps?: Record<string, any>) => {
  const pageKey = getCurrentPageKey();
  amplitude.track('Button Click', {
    page_key: pageKey,
    button_key: buttonKey,
    ...additionalProps,
  });
};

// Export amplitude instance for direct use if needed
export { amplitude };
