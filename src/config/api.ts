// Centralized API configuration
export const API_CONFIG = {
  // Base URL for the API
  // Use environment variable if set, otherwise fallback to default logic
  BASE_URL: import.meta.env.VITE_API_BASE_URL ||
    (import.meta.env.DEV ? "/api" : "https://vibe-llm-account.onrender.com"),
  // (import.meta.env.DEV ? "/api" : "https://api.vibe-router.online"),
  // For development: use Vite proxy to avoid CORS issues
  // For production: use the actual API URL

  // API endpoints
  ENDPOINTS: {
    SIGNUP_WAITLIST: "/user/email/signup_waitlist",
    USER_CRM: "/user/crm",
    USER_WALLET: "/user/email/wallet",
    USER_WALLET2: "/user/email/wallet2",
    USER_COST: "/user/email/cost",
    USER_COST2: "/user/email/cost2",
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
