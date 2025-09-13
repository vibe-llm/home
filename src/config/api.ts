// Centralized API configuration
export const API_CONFIG = {
  // Base URL for the API
  // Use local development URL when running locally, production URL when deployed
  BASE_URL: "https://account-hub-aj8p.onrender.com", // "http://0.0.0.0:8000", //for local development
  
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
  const url = `${API_CONFIG.BASE_URL}${endpoint}`;
  return params ? `${url}?${params.toString()}` : url;
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
