import { useState, useEffect } from 'react';
import { questions } from '../data/questions';
import { archetypes } from '../data/archetypes';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from './ui/card';
import { Progress } from './ui/progress';
import { RadioGroup, RadioGroupItem } from './ui/radio-group';
import { Label } from './ui/label';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { toPersianNumbers } from '../utils/persianNumbers';
import { motion, AnimatePresence } from 'framer-motion';

interface QuizProps {
  onComplete: (scores: Record<string, number>) => void;
  language: 'en' | 'fa';
}

const likertOptions = [
  { value: 1, labelEn: 'Strongly Disagree', labelFa: 'کاملاً مخالفم', numberFa: '۱' },
  { value: 2, labelEn: 'Disagree', labelFa: 'مخالفم', numberFa: '۲' },
  { value: 3, labelEn: 'Neutral', labelFa: 'نظری ندارم', numberFa: '۳' },
  { value: 4, labelEn: 'Agree', labelFa: 'موافقم', numberFa: '۴' },
  { value: 5, labelEn: 'Strongly Agree', labelFa: 'کاملاً موافقم', numberFa: '۵' }
];

export function Quiz({ onComplete, language }: QuizProps) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [selectedValue, setSelectedValue] = useState<string>('');

  // Load saved progress from localStorage
  useEffect(() => {
    const savedProgress = localStorage.getItem('quizProgress');
    if (savedProgress) {
      const { currentQuestion: savedQuestion, answers: savedAnswers } = JSON.parse(savedProgress);
      setCurrentQuestion(savedQuestion);
      setAnswers(savedAnswers);
    }
  }, []);

  // Save progress to localStorage
  useEffect(() => {
    localStorage.setItem('quizProgress', JSON.stringify({ currentQuestion, answers }));
  }, [currentQuestion, answers]);

  const handleAnswer = (value: string) => {
    setSelectedValue(value);
  };

  const handleNext = () => {
    if (selectedValue) {
      const newAnswers = { ...answers, [questions[currentQuestion].id]: parseInt(selectedValue) };
      setAnswers(newAnswers);
      
      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
        setSelectedValue(answers[questions[currentQuestion + 1]?.id]?.toString() || '');
      } else {
        // Calculate scores
        const scores = calculateScores(newAnswers);
        localStorage.removeItem('quizProgress'); // Clear saved progress
        onComplete(scores);
      }
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
      setSelectedValue(answers[questions[currentQuestion - 1].id]?.toString() || '');
    }
  };

  const calculateScores = (allAnswers: Record<number, number>) => {
    const scores: Record<string, number> = {};
    
    // Initialize scores for all archetypes
    archetypes.forEach(archetype => {
      scores[archetype.id] = 0;
    });

    // Calculate scores based on answers
    Object.entries(allAnswers).forEach(([questionId, answer]) => {
      const question = questions.find(q => q.id === parseInt(questionId));
      if (question) {
        scores[question.archetype] = (scores[question.archetype] || 0) + answer;
      }
    });

    return scores;
  };

  const progress = ((currentQuestion + 1) / questions.length) * 100;
  const question = questions[currentQuestion];
  const isRTL = language === 'fa';

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Card className="max-w-3xl mx-auto w-full" dir={isRTL ? 'rtl' : 'ltr'}>
        <CardHeader>
          <CardTitle className="text-xl sm:text-2xl font-bold text-center">
            {language === 'fa' ? 'تست کشف کهن‌الگوی شخصیتی' : 'Personality Archetype Discovery Test'}
          </CardTitle>
          <CardDescription className="text-center">
            {language === 'fa' 
              ? `سوال ${toPersianNumbers(currentQuestion + 1)} از ${toPersianNumbers(questions.length)}`
              : `Question ${currentQuestion + 1} of ${questions.length}`}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.3 }}
          >
            <Progress value={progress} className="w-full" />
          </motion.div>
          
          <AnimatePresence mode="wait">
            <motion.div
              key={currentQuestion}
              initial={{ opacity: 0, x: isRTL ? -30 : 30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: isRTL ? 30 : -30 }}
              transition={{ duration: 0.3 }}
              className="min-h-[120px] sm:min-h-[150px] py-4 flex items-center"
            >
              <p className="text-base sm:text-lg leading-relaxed w-full">
                {language === 'fa' ? question.textFa : question.text}
              </p>
            </motion.div>
          </AnimatePresence>

          <motion.div 
            className="space-y-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.3 }}
          >
            <p className="text-sm text-muted-foreground mb-4">
              {language === 'fa'
                ? 'لطفاً مشخص کنید که این جمله چقدر با شخصیت شما همخوانی دارد:'
                : 'Please indicate how much this statement aligns with your personality:'}
            </p>
            
            <RadioGroup value={selectedValue} onValueChange={handleAnswer}>
              <div className="space-y-2 sm:space-y-3">
                {likertOptions.map((option, index) => (
                  <motion.div
                    key={option.value}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 + index * 0.05, duration: 0.2 }}
                    className="flex items-center space-x-2 space-x-reverse"
                  >
                    <RadioGroupItem value={option.value.toString()} id={`option-${option.value}`} />
                    <Label
                      htmlFor={`option-${option.value}`}
                      className="cursor-pointer flex-1 py-2 sm:py-3 flex justify-between items-center hover:bg-muted/50 rounded-md px-2 transition-colors text-sm sm:text-base"
                    >
                      <span>{language === 'fa' ? option.labelFa : option.labelEn}</span>
                      <span className="text-xs sm:text-sm text-muted-foreground font-medium">
                        {language === 'fa' ? option.numberFa : option.value}
                      </span>
                    </Label>
                  </motion.div>
                ))}
              </div>
            </RadioGroup>
          </motion.div>

          <motion.div 
            className="flex justify-between pt-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.3 }}
          >
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button
                variant="outline"
                onClick={handlePrevious}
                disabled={currentQuestion === 0}
                className="flex items-center gap-2"
              >
                {isRTL ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
                {language === 'fa' ? 'قبلی' : 'Previous'}
              </Button>
            </motion.div>
            
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button
                onClick={handleNext}
                disabled={!selectedValue}
                className="flex items-center gap-2"
              >
                {currentQuestion === questions.length - 1
                  ? (language === 'fa' ? 'مشاهده نتیجه' : 'View Results')
                  : (language === 'fa' ? 'بعدی' : 'Next')}
                {currentQuestion < questions.length - 1 && (
                  isRTL ? <ChevronLeft className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />
                )}
              </Button>
            </motion.div>
          </motion.div>
        </CardContent>
      </Card>
    </motion.div>
  );
}