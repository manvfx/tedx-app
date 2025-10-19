// API utility functions for communicating with the backend

// Get the base API URL from environment or use default
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8005/api';

// Type definitions
export interface QuizSubmissionData {
  userId: string;
  firstName: string;
  lastName: string;
  mobileNumber: string;
  responses: Record<number, number>; // question ID -> response value (1-5)
  scores: Record<string, number>; // archetype ID -> score
  percentages: Record<string, number>; // archetype ID -> percentage (0-100)
  primaryArchetype: string;
  secondaryArchetype?: string;
  weakestArchetype?: string;
  primaryArchetypePercentage: number;
  language?: 'en' | 'fa';
}

export interface QuizSubmissionResponse {
  success: boolean;
  message: string;
  data?: {
    submissionId: string;
    userId: string;
    createdAt: string;
    primaryArchetype: string;
    primaryArchetypePercentage: number;
  };
  error?: string;
}

// Save quiz submission to backend
export async function saveQuizSubmission(
  quizData: QuizSubmissionData
): Promise<QuizSubmissionResponse> {
  try {
    const response = await fetch(`${API_BASE_URL}/quiz`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(quizData),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
    }

    const data: QuizSubmissionResponse = await response.json();
    return data;
  } catch (error) {
    console.error('Error saving quiz submission:', error);
    throw error;
  }
}

// Get quiz submission by ID
export async function getQuizSubmission(submissionId: string) {
  try {
    const response = await fetch(`${API_BASE_URL}/quiz/${submissionId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching quiz submission:', error);
    throw error;
  }
}

// Get all quiz submissions for a user
export async function getUserQuizSubmissions(userId: string) {
  try {
    const response = await fetch(`${API_BASE_URL}/quiz/user/${userId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching user quiz submissions:', error);
    throw error;
  }
}

// Get quiz analytics summary (admin endpoint)
export async function getQuizAnalytics() {
  try {
    const response = await fetch(`${API_BASE_URL}/quiz/analytics/summary`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching quiz analytics:', error);
    throw error;
  }
}

// Helper function to convert responses object with string keys to number keys
export function normalizeResponses(responses: Record<string | number, number>): Record<number, number> {
  const normalized: Record<number, number> = {};
  Object.entries(responses).forEach(([key, value]) => {
    normalized[Number(key)] = value;
  });
  return normalized;
}
