// API Configuration for different environments

const isDevelopment = import.meta.env.DEV;

// Base URLs from environment variables with fallbacks
const API_BASE_URLS = {
  development: import.meta.env.VITE_API_BASE_URL_DEV || 'http://localhost:8005',
  production: import.meta.env.VITE_API_BASE_URL_PROD || 'https://ravan-api.openlidoma.com'
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
  // Quiz Session Recovery endpoints
  quizSessionStart: `${API_BASE_URL}/api/quiz-session/start`,
  quizSessionByMobile: (mobileNumber: string) => `${API_BASE_URL}/api/quiz-session/${mobileNumber}`,
  quizSessionProgress: (sessionId: string) => `${API_BASE_URL}/api/quiz-session/${sessionId}/progress`,
  quizSessionComplete: (sessionId: string) => `${API_BASE_URL}/api/quiz-session/${sessionId}/complete`,
  quizSessionAbandon: (sessionId: string) => `${API_BASE_URL}/api/quiz-session/${sessionId}/abandon`,
  // Quiz endpoints
  quiz: `${API_BASE_URL}/api/quiz`,
  quizById: (id: string) => `${API_BASE_URL}/api/quiz/${id}`,
  quizByUser: (userId: string) => `${API_BASE_URL}/api/quiz/user/${userId}`,
  quizAnalytics: `${API_BASE_URL}/api/quiz/analytics/summary`,
  // Admin endpoints
  adminUsersQuizReport: `${API_BASE_URL}/api/admin/users-quiz-report`,
  adminUserQuizDetails: (userId: string) => `${API_BASE_URL}/api/admin/user-quiz-details/${userId}`,
  adminUsersCompletedQuiz: `${API_BASE_URL}/api/admin/users-completed-quiz`,
  adminStatistics: `${API_BASE_URL}/api/admin/statistics`,
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

// API Functions for Quiz Submissions
export const submitQuiz = async (quizData: {
  userId: string;
  firstName: string;
  lastName: string;
  mobileNumber: string;
  responses: Record<number, number>;
  scores: Record<string, number>;
  percentages: Record<string, number>;
  primaryArchetype: string;
  secondaryArchetype?: string;
  weakestArchetype?: string;
  primaryArchetypePercentage: number;
  language?: 'en' | 'fa';
}) => {
  return apiRequest(API_ENDPOINTS.quiz, {
    method: 'POST',
    body: JSON.stringify(quizData),
  });
};

export const getQuizSubmission = async (id: string) => {
  return apiRequest(API_ENDPOINTS.quizById(id), {
    method: 'GET',
  });
};

export const getUserQuizSubmissions = async (userId: string) => {
  return apiRequest(API_ENDPOINTS.quizByUser(userId), {
    method: 'GET',
  });
};

export const getQuizAnalytics = async () => {
  return apiRequest(API_ENDPOINTS.quizAnalytics, {
    method: 'GET',
  });
};

// Admin API Functions
export const getAdminUsersQuizReport = async () => {
  return apiRequest(API_ENDPOINTS.adminUsersQuizReport, {
    method: 'GET',
  });
};

export const getAdminUserQuizDetails = async (userId: string) => {
  return apiRequest(API_ENDPOINTS.adminUserQuizDetails(userId), {
    method: 'GET',
  });
};

export const getAdminUsersCompletedQuiz = async (filters?: {
  archetype?: string;
  language?: 'en' | 'fa';
  minPercentage?: number;
  maxPercentage?: number;
  sortBy?: 'newest' | 'oldest' | 'percentage_desc' | 'percentage_asc';
}) => {
  const params = new URLSearchParams();
  if (filters?.archetype) params.append('archetype', filters.archetype);
  if (filters?.language) params.append('language', filters.language);
  if (filters?.minPercentage !== undefined) params.append('minPercentage', filters.minPercentage.toString());
  if (filters?.maxPercentage !== undefined) params.append('maxPercentage', filters.maxPercentage.toString());
  if (filters?.sortBy) params.append('sortBy', filters.sortBy);

  const url = `${API_ENDPOINTS.adminUsersCompletedQuiz}${params.toString() ? '?' + params.toString() : ''}`;
  return apiRequest(url, {
    method: 'GET',
  });
};

export const getAdminStatistics = async () => {
  return apiRequest(API_ENDPOINTS.adminStatistics, {
    method: 'GET',
  });
};

// Quiz Session Recovery Functions
export const startQuizSession = async (formData: {
  firstName: string;
  lastName: string;
  mobileNumber: string;
  language?: 'en' | 'fa';
}) => {
  return apiRequest(API_ENDPOINTS.quizSessionStart, {
    method: 'POST',
    body: JSON.stringify(formData),
  });
};

export const checkActiveSession = async (mobileNumber: string) => {
  try {
    return await apiRequest(API_ENDPOINTS.quizSessionByMobile(mobileNumber), {
      method: 'GET',
    });
  } catch (error) {
    // No active session found
    return null;
  }
};

export const saveQuizProgress = async (sessionId: string, currentQuestion: number, responses: Record<number, number>) => {
  return apiRequest(API_ENDPOINTS.quizSessionProgress(sessionId), {
    method: 'PUT',
    body: JSON.stringify({ currentQuestion, responses }),
  });
};

export const completeQuizSession = async (sessionId: string) => {
  return apiRequest(API_ENDPOINTS.quizSessionComplete(sessionId), {
    method: 'PUT',
  });
};

export const abandonQuizSession = async (sessionId: string) => {
  return apiRequest(API_ENDPOINTS.quizSessionAbandon(sessionId), {
    method: 'PUT',
  });
};
