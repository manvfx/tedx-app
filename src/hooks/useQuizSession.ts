import { useState, useCallback } from 'react';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8005/api';

export interface QuizSession {
  sessionId: string;
  currentQuestion: number;
  responses: Record<number, number>;
  totalQuestionsAnswered: number;
  lastAccessedAt?: string;
  startedAt?: string;
}

export interface UseQuizSessionReturn {
  session: QuizSession | null;
  hasExistingSession: boolean;
  isResuming: boolean;
  isLoading: boolean;
  error: string | null;
  startNewSession: (firstName: string, lastName: string, mobileNumber: string, language: 'en' | 'fa') => Promise<QuizSession>;
  saveProgress: (currentQuestion: number, responses: Record<number, number>) => Promise<void>;
  completeSession: () => Promise<void>;
  abandonSession: () => Promise<void>;
}

export function useQuizSession(): UseQuizSessionReturn {
  const [session, setSession] = useState<QuizSession | null>(null);
  const [hasExistingSession, setHasExistingSession] = useState(false);
  const [isResuming, setIsResuming] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const startNewSession = useCallback(
    async (
      firstName: string,
      lastName: string,
      mobileNumber: string,
      language: 'en' | 'fa' = 'fa'
    ): Promise<QuizSession> => {
      setIsLoading(true);
      setError(null);

      try {
        const response = await fetch(`${API_BASE_URL}/quiz-session/start`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            firstName,
            lastName,
            mobileNumber,
            language
          })
        });

        if (!response.ok) {
          throw new Error('Failed to start session');
        }

        const data = await response.json();

        if (!data.success) {
          throw new Error(data.message || 'Failed to start session');
        }

        const newSession: QuizSession = {
          sessionId: data.data.sessionId,
          currentQuestion: data.data.currentQuestion,
          responses: data.data.responses || {},
          totalQuestionsAnswered: data.data.totalQuestionsAnswered || 0
        };

        setSession(newSession);
        setIsResuming(data.data.isResuming || false);

        if (data.data.isResuming) {
          setHasExistingSession(true);
        }

        return newSession;
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'Unknown error occurred';
        setError(errorMessage);
        console.error('Error starting session:', errorMessage);
        throw err;
      } finally {
        setIsLoading(false);
      }
    },
    []
  );

  const saveProgress = useCallback(
    async (currentQuestion: number, responses: Record<number, number>): Promise<void> => {
      if (!session?.sessionId) {
        console.warn('No active session to save progress');
        return;
      }

      try {
        const response = await fetch(
          `${API_BASE_URL}/quiz-session/${session.sessionId}/progress`,
          {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              currentQuestion,
              responses
            })
          }
        );

        if (!response.ok) {
          throw new Error('Failed to save progress');
        }

        const data = await response.json();

        if (data.success) {
          // Update local session state
          setSession(prev => prev ? {
            ...prev,
            currentQuestion: data.data.currentQuestion,
            totalQuestionsAnswered: data.data.totalQuestionsAnswered
          } : null);
        }
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'Unknown error occurred';
        console.error('Error saving progress:', errorMessage);
        // Don't throw - allow quiz to continue even if server save fails
      }
    },
    [session?.sessionId]
  );

  const completeSession = useCallback(async (): Promise<void> => {
    if (!session?.sessionId) {
      console.warn('No active session to complete');
      return;
    }

    try {
      const response = await fetch(
        `${API_BASE_URL}/quiz-session/${session.sessionId}/complete`,
        { method: 'PUT' }
      );

      if (!response.ok) {
        throw new Error('Failed to complete session');
      }

      const data = await response.json();

      if (data.success) {
        setSession(null);
        setIsResuming(false);
        setHasExistingSession(false);
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Unknown error occurred';
      console.error('Error completing session:', errorMessage);
      // Don't throw - session is still completed locally
    }
  }, [session?.sessionId]);

  const abandonSession = useCallback(async (): Promise<void> => {
    if (!session?.sessionId) {
      console.warn('No active session to abandon');
      return;
    }

    try {
      const response = await fetch(
        `${API_BASE_URL}/quiz-session/${session.sessionId}/abandon`,
        { method: 'PUT' }
      );

      if (!response.ok) {
        throw new Error('Failed to abandon session');
      }

      setSession(null);
      setIsResuming(false);
      setHasExistingSession(false);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Unknown error occurred';
      console.error('Error abandoning session:', errorMessage);
      // Don't throw - allow UI to proceed
    }
  }, [session?.sessionId]);

  return {
    session,
    hasExistingSession,
    isResuming,
    isLoading,
    error,
    startNewSession,
    saveProgress,
    completeSession,
    abandonSession
  };
}
