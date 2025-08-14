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

function App() {
  const [appState, setAppState] = useState<AppState>('welcome');
  const [language, setLanguage] = useState<Language>('fa');
  const [quizScores, setQuizScores] = useState<Record<string, number>>({});

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

  const handleStart = () => {
    setAppState('quiz');
  };

  const handleQuizComplete = (scores: Record<string, number>) => {
    setQuizScores(scores);
    setAppState('results');
  };

  const handleRestart = () => {
    setAppState('welcome');
    setQuizScores({});
    localStorage.removeItem('quizProgress');
    localStorage.removeItem('userData');
  };

  return (
    <Direction.Provider dir={language === 'fa' ? 'rtl' : 'ltr'}>
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
        {/* Header */}
        <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm border-b">
          <div className="container mx-auto px-4 py-3 flex justify-between items-center">
            <div className="flex items-center gap-3">
              <img 
                src="/logo-black.png" 
                alt="TEDx Logo" 
                className="h-8 w-auto dark:hidden"
              />
              <img 
                src="/logo-white.png" 
                alt="TEDx Logo" 
                className="h-8 w-auto hidden dark:block"
              />
              <span className="font-bold text-lg">
                {language === 'fa' ? 'تست شخصیت' : 'Personality Test'}
              </span>
            </div>
            
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleLanguage}
              className="flex items-center gap-2"
            >
              <Globe className="h-4 w-4" />
              {language === 'en' ? 'فارسی' : 'English'}
            </Button>
          </div>
        </header>

        {/* Main Content */}
        <main className="container mx-auto px-4 pt-20 pb-8">
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
                onRestart={handleRestart} 
                language={language}
              />
            )}
          </div>
        </main>

        {/* Footer */}
        <footer className="text-center py-4 text-sm text-muted-foreground">
          {language === 'fa' 
            ? `© ${toPersianNumbers(2025)} تولید شده توسط تیم روانگپ و قدرت گرفته از هوش مصنوعی لیدوما TEDx`
            : '© 2025 TEDx produced by the Ravangap team'}
        </footer>
      </div>
    </Direction.Provider>
  );
}

export default App;