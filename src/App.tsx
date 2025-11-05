import { useState, useEffect } from 'react';
import { Welcome } from './components/Welcome';
import { Quiz } from './components/Quiz';
import { Results } from './components/Results';
import { Button } from './components/ui/button';
import { Globe } from 'lucide-react';
import * as Direction from '@radix-ui/react-direction';
import { toPersianNumbers } from './utils/persianNumbers';
import './App.css';

type AppState = 'welcome' | 'quiz' | 'results';
type Language = 'en' | 'fa';

interface UserData {
  id: string;
  firstName: string;
  lastName: string;
  mobileNumber: string;
}

function App() {
  const [appState, setAppState] = useState<AppState>('welcome');
  const [language, setLanguage] = useState<Language>('fa');
  const [quizScores, setQuizScores] = useState<Record<string, number>>({});
  const [quizResponses, setQuizResponses] = useState<Record<number, number>>({});
  const [userData, setUserData] = useState<UserData | null>(null);

  // Load saved state from localStorage
  useEffect(() => {
    const savedLanguage = localStorage.getItem('language');
    
    if (savedLanguage) {
      setLanguage(savedLanguage as Language);
    }

    // Apply RTL/LTR and font based on language
    updateDocumentDirection(savedLanguage as Language || 'fa');
  }, []);

  const updateDocumentDirection = (lang: Language) => {
    const html = document.documentElement;
    if (lang === 'fa') {
      html.dir = 'rtl';
      html.lang = 'fa';
      html.style.fontFamily = 'YekanBakh, system-ui, sans-serif';
    } else {
      html.dir = 'ltr';
      html.lang = 'en';
      html.style.fontFamily = 'YekanBakh, system-ui, sans-serif';
    }
  };

  const toggleLanguage = () => {
    const newLanguage = language === 'en' ? 'fa' : 'en';
    setLanguage(newLanguage);
    localStorage.setItem('language', newLanguage);
    updateDocumentDirection(newLanguage);
  };

  const handleStart = (user?: UserData) => {
    if (user) {
      setUserData(user);
    }
    setAppState('quiz');
  };

  const handleQuizComplete = (scores: Record<string, number>, responses?: Record<number, number>) => {
    setQuizScores(scores);
    if (responses) {
      setQuizResponses(responses);
    }
    setAppState('results');
  };

  const handleRestart = () => {
    setAppState('welcome');
    setQuizScores({});
    setQuizResponses({});
    setUserData(null);
    localStorage.removeItem('quizProgress');
    localStorage.removeItem('userData');
  };

  return (
    <Direction.Provider dir={language === 'fa' ? 'rtl' : 'ltr'}>
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
        {/* Header */}
        <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm border-b">
          <div className="container mx-auto px-3 sm:px-4 py-2 sm:py-3 flex justify-between items-center">
            <div className="flex items-center gap-2 sm:gap-3">
              <a href="https://tedxneshatstreet.ir/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 sm:gap-3">
                <img
                  src="/logo-black.png"
                  alt="TEDx Logo"
                  className="h-6 sm:h-8 w-auto dark:hidden"
                />
                <img
                  src="/logo-white.png"
                  alt="TEDx Logo"
                  className="h-6 sm:h-8 w-auto hidden dark:block"
                />
                <span className="font-bold text-base sm:text-lg">
                  {language === 'fa' ? 'تست شخصیت' : 'Personality Test'}
                </span>
              </a>
            </div>

            <Button
              variant="ghost"
              size="sm"
              onClick={toggleLanguage}
              className="flex items-center gap-1 sm:gap-2 text-xs sm:text-sm"
            >
              <Globe className="h-3 w-3 sm:h-4 sm:w-4" />
              <span className="hidden sm:inline">{language === 'en' ? 'فارسی' : 'English'}</span>
              <span className="inline sm:hidden">{language === 'en' ? 'FA' : 'EN'}</span>
            </Button>
          </div>
        </header>

        {/* Main Content */}
        <main className="container mx-auto px-3 sm:px-4 pt-16 sm:pt-20 pb-6 sm:pb-8">
          <div className="flex items-center justify-center min-h-[calc(100vh-8rem)]">
            {appState === 'welcome' && (
              <Welcome onStart={handleStart} language={language} />
            )}
            
            {appState === 'quiz' && (
              <Quiz onComplete={handleQuizComplete} language={language} />
            )}
            
            {appState === 'results' && (
              <Results
                scores={quizScores}
                responses={quizResponses}
                userId={userData?.id}
                userData={userData ? {
                  firstName: userData.firstName,
                  lastName: userData.lastName,
                  mobileNumber: userData.mobileNumber
                } : undefined}
                onRestart={handleRestart}
                language={language}
              />
            )}
          </div>
        </main>

        {/* Footer */}
        <footer className="text-center py-3 sm:py-4 px-3 text-xs sm:text-sm text-muted-foreground">
          {language === 'fa'
            ? `© ${toPersianNumbers(2025)} TEDx قدرت‌گرفته از هوش مصنوعی روانگپ`
            : '© 2025 TEDx 2025, powered by Ravangap AI and supported by Lidoma AI team'}
        </footer>
      </div>
    </Direction.Provider>
  );
}

export default App;