// API Configuration for different environments

const isDevelopment = import.meta.env.DEV;

// Base URLs from environment variables with fallbacks
const API_BASE_URLS = {
  development: import.meta.env.VITE_API_BASE_URL_DEV || 'http://localhost:8005',
  production: import.meta.env.VITE_API_BASE_URL_PROD || 'https://api.yourdomain.com'
};

// Get the appropriate base URL based on environment
export const API_BASE_URL = isDevelopment
  ? API_BASE_URLS.development
  : API_BASE_URLS.production;

// App configuration from environment variables
export const APP_CONFIG = {
  name: import.meta.env.VITE_APP_NAME || 'TEDx Personality Test',
  version: import.meta.env.VITE_APP_VERSION || '1.0.0',
};

// API Endpoints
export const API_ENDPOINTS = {
  health: `${API_BASE_URL}/api/health`,
  welcome: `${API_BASE_URL}/api/welcome`,
  welcomeById: (id: string) => `${API_BASE_URL}/api/welcome/${id}`,
};

// API Helper Functions
export const apiRequest = async (
  url: string,
  options?: RequestInit
): Promise<any> => {
  try {
    const response = await fetch(url, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...options?.headers,
      },
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'API request failed');
    }

    return data;
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
};

// API Functions for Welcome Form
export const submitWelcomeForm = async (formData: {
  firstName: string;
  lastName: string;
  mobileNumber: string;
  country: string;
  city: string;
}) => {
  return apiRequest(API_ENDPOINTS.welcome, {
    method: 'POST',
    body: JSON.stringify(formData),
  });
};

export const getWelcomeSubmissions = async () => {
  return apiRequest(API_ENDPOINTS.welcome, {
    method: 'GET',
  });
};

export const getWelcomeSubmissionById = async (id: string) => {
  return apiRequest(API_ENDPOINTS.welcomeById(id), {
    method: 'GET',
  });
};

export const checkHealth = async () => {
  return apiRequest(API_ENDPOINTS.health, {
    method: 'GET',
  });
};
