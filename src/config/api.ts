// CORS proxy configuration for GitHub Pages
const CORS_PROXIES = [
  "https://api.allorigins.win/raw?url=",
  "https://corsproxy.io/?",
  "https://api.codetabs.com/v1/proxy?quest=",
] as const;

// Detect if we're running on GitHub Pages or other static hosting
const isStaticHosting = (): boolean => {
  if (typeof window === 'undefined') return false;
  
  const hostname = window.location.hostname;
  return (
    hostname.includes('github.io') ||
    hostname.includes('githubpages.com') ||
    hostname.includes('pages.dev') ||
    hostname.includes('netlify.app') ||
    hostname.includes('vercel.app')
  );
};

// Centralized API configuration
export const API_CONFIG = {
  // Base URL for the API
  // Use local development URL when running locally, production URL when deployed
  BASE_URL: "https://account-hub-aj8p.onrender.com", // "http://0.0.0.0:8000", //for local development
  
  // CORS proxy settings
  USE_CORS_PROXY: isStaticHosting(),
  CORS_PROXY: CORS_PROXIES[0], // Default to first proxy
  
  // API endpoints
  ENDPOINTS: {
    SIGNUP_WAITLIST: "/user/email/signup_waitlist",
    USER_CRM: "/user/crm",
    USER_WALLET: "/user/email/wallet",
    // Add more endpoints here as needed
  },
  
  // Default headers for API requests
  DEFAULT_HEADERS: {
    "Content-Type": "application/json",
  },
} as const;

// Helper function to build full API URLs
export const buildApiUrl = (endpoint: string, params?: URLSearchParams): string => {
  const baseUrl = `${API_CONFIG.BASE_URL}${endpoint}`;
  const urlWithParams = params ? `${baseUrl}?${params.toString()}` : baseUrl;
  
  // Use CORS proxy if we're on static hosting
  if (API_CONFIG.USE_CORS_PROXY) {
    return `${API_CONFIG.CORS_PROXY}${encodeURIComponent(urlWithParams)}`;
  }
  
  return urlWithParams;
};

// Helper function for making API requests with default configuration
export const apiRequest = async (
  endpoint: string,
  options: RequestInit = {},
  params?: URLSearchParams
): Promise<Response> => {
  const url = buildApiUrl(endpoint, params);
  
  const defaultOptions: RequestInit = {
    headers: {
      ...API_CONFIG.DEFAULT_HEADERS,
      ...options.headers,
    },
  };

  return fetch(url, { ...defaultOptions, ...options });
};

// Enhanced fetch function with CORS error handling and fallback
export const apiRequestWithFallback = async (
  endpoint: string,
  options: RequestInit = {},
  params?: URLSearchParams
): Promise<Response> => {
  // First, try the normal API request
  try {
    const response = await apiRequest(endpoint, options, params);
    return response;
  } catch (error) {
    // Check if it's a CORS error
    if (error instanceof TypeError && error.message.includes('CORS')) {
      console.warn('CORS error detected, attempting with proxy...');
      
      // Try with different CORS proxies if the current one fails
      for (const proxy of CORS_PROXIES) {
        try {
          const baseUrl = `${API_CONFIG.BASE_URL}${endpoint}`;
          const urlWithParams = params ? `${baseUrl}?${params.toString()}` : baseUrl;
          const proxiedUrl = `${proxy}${encodeURIComponent(urlWithParams)}`;
          
          const defaultOptions: RequestInit = {
            headers: {
              ...API_CONFIG.DEFAULT_HEADERS,
              ...options.headers,
            },
          };
          
          const response = await fetch(proxiedUrl, { ...defaultOptions, ...options });
          
          if (response.ok) {
            console.log(`Successfully used CORS proxy: ${proxy}`);
            return response;
          }
        } catch (proxyError) {
          console.warn(`CORS proxy ${proxy} failed:`, proxyError);
          continue;
        }
      }
      
      // If all proxies fail, throw a user-friendly error
      throw new Error(
        'Unable to connect to the API due to CORS restrictions. Please contact support or try accessing the site directly.'
      );
    }
    
    // Re-throw other errors
    throw error;
  }
};
