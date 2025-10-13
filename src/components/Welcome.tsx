import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { ArrowRight, ArrowLeft, Loader2 } from 'lucide-react';
import { toPersianNumbers } from '../utils/persianNumbers';
import { motion } from 'framer-motion';
import { submitWelcomeForm } from '../config/api';

interface WelcomeProps {
  onStart: () => void;
  language: 'en' | 'fa';
}

export interface UserData {
  firstName: string;
  lastName: string;
  mobileNumber: string;
  country: string;
  city: string;
}

export function Welcome({ onStart, language }: WelcomeProps) {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  const [country, setCountry] = useState('');
  const [city, setCity] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);
  const [apiError, setApiError] = useState<string>('');

  const isRTL = language === 'fa';

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!firstName.trim()) {
      newErrors.firstName = language === 'fa' ? 'نام الزامی است' : 'Name is required';
    }

    if (!lastName.trim()) {
      newErrors.lastName = language === 'fa' ? 'نام خانوادگی الزامی است' : 'Last name is required';
    }

    if (!mobileNumber.trim()) {
      newErrors.mobileNumber = language === 'fa' ? 'شماره موبایل الزامی است' : 'Mobile number is required';
    } else if (!/^[0-9+\-\s()]+$/.test(mobileNumber)) {
      newErrors.mobileNumber = language === 'fa' ? 'شماره موبایل معتبر نیست' : 'Invalid mobile number';
    }

    if (!country.trim()) {
      newErrors.country = language === 'fa' ? 'کشور الزامی است' : 'Country is required';
    }

    if (!city.trim()) {
      newErrors.city = language === 'fa' ? 'شهر الزامی است' : 'City is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Clear previous API error
    setApiError('');

    if (validateForm()) {
      const userData: UserData = {
        firstName: firstName.trim(),
        lastName: lastName.trim(),
        mobileNumber: mobileNumber.trim(),
        country: country.trim(),
        city: city.trim()
      };

      setIsLoading(true);

      try {
        // Send data to backend API
        const response = await submitWelcomeForm(userData);

        if (response.success) {
          // Save user data to localStorage along with submission ID
          localStorage.setItem('userData', JSON.stringify({
            ...userData,
            submissionId: response.data._id
          }));

          // Proceed to quiz
          onStart();
        }
      } catch (error) {
        // Handle API error
        const errorMessage = error instanceof Error ? error.message :
          (language === 'fa'
            ? 'خطا در ارسال اطلاعات. لطفاً دوباره تلاش کنید.'
            : 'Error submitting form. Please try again.');
        setApiError(errorMessage);
        console.error('Failed to submit form:', error);
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <Card className="max-w-3xl mx-auto w-full" dir={isRTL ? 'rtl' : 'ltr'}>
        <CardHeader className="text-center">
          <motion.div 
            className="flex justify-center mb-4"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <img
              src="/logo-white.png"
              alt="TEDx Logo"
              className="h-12 sm:h-16 w-auto"
            />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <CardTitle className="text-2xl sm:text-3xl font-bold mb-2">
              {language === 'fa'
                ? 'تست کشف کهن‌الگوی شخصیتی'
                : 'Personality Archetype Discovery Test'}
            </CardTitle>
          </motion.div>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            <CardDescription className="text-base sm:text-lg">
              {language === 'fa'
                ? 'کشف کهن‌الگوی اساطیری ایرانی خود در ۶۰ سوال'
                : 'Discover your Iranian mythological archetype in 60 questions'}
            </CardDescription>
          </motion.div>
        </CardHeader>
      <CardContent className="space-y-6">
        <motion.form 
          onSubmit={handleSubmit} 
          className="space-y-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.8 }}
        >
          <div className="space-y-4">
            <motion.p 
              className="text-center text-muted-foreground"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 1 }}
            >
              {language === 'fa'
                ? 'لطفاً اطلاعات خود را وارد کنید تا تست را شروع کنیم'
                : 'Please enter your information to start the test'}
            </motion.p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="firstName">
                  {language === 'fa' ? 'نام' : 'Name'}
                </Label>
                <Input
                  id="firstName"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  placeholder={language === 'fa' ? 'نام خود را وارد کنید' : 'Enter your name'}
                  className={errors.firstName ? 'border-red-500' : ''}
                />
                {errors.firstName && (
                  <p className="text-sm text-red-500">{errors.firstName}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="lastName">
                  {language === 'fa' ? 'نام خانوادگی' : 'Last Name'}
                </Label>
                <Input
                  id="lastName"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  placeholder={language === 'fa' ? 'نام خانوادگی خود را وارد کنید' : 'Enter your last name'}
                  className={errors.lastName ? 'border-red-500' : ''}
                />
                {errors.lastName && (
                  <p className="text-sm text-red-500">{errors.lastName}</p>
                )}
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="mobileNumber">
                {language === 'fa' ? 'شماره موبایل' : 'Mobile Number'}
              </Label>
              <Input
                id="mobileNumber"
                value={mobileNumber}
                onChange={(e) => setMobileNumber(e.target.value)}
                placeholder={language === 'fa' ? 'شماره موبایل خود را وارد کنید' : 'Enter your mobile number'}
                className={errors.mobileNumber ? 'border-red-500' : ''}
              />
              {errors.mobileNumber && (
                <p className="text-sm text-red-500">{errors.mobileNumber}</p>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="country">
                  {language === 'fa' ? 'کشور' : 'Country'}
                </Label>
                <Input
                  id="country"
                  value={country}
                  onChange={(e) => setCountry(e.target.value)}
                  placeholder={language === 'fa' ? 'کشور خود را وارد کنید' : 'Enter your country'}
                  className={errors.country ? 'border-red-500' : ''}
                />
                {errors.country && (
                  <p className="text-sm text-red-500">{errors.country}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="city">
                  {language === 'fa' ? 'شهر' : 'City'}
                </Label>
                <Input
                  id="city"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  placeholder={language === 'fa' ? 'شهر خود را وارد کنید' : 'Enter your city'}
                  className={errors.city ? 'border-red-500' : ''}
                />
                {errors.city && (
                  <p className="text-sm text-red-500">{errors.city}</p>
                )}
              </div>
            </div>
          </div>

          <div className="bg-muted p-4 rounded-lg space-y-2">
            <h3 className="font-semibold">
              {language === 'fa' ? 'درباره این تست:' : 'About this test:'}
            </h3>
            <ul className="space-y-1 text-sm text-muted-foreground">
              <li>
                {language === 'fa'
                  ? `• ${toPersianNumbers(60)} سوال بر اساس مقیاس لیکرت ${toPersianNumbers(5)} درجه‌ای`
                  : '• 60 questions based on a 5-point Likert scale'}
              </li>
              <li>
                {language === 'fa'
                  ? `• ${toPersianNumbers(10)} کهن‌الگوی اساطیری ایرانی`
                  : '• 10 Iranian mythological archetypes'}
              </li>
              <li>
                {language === 'fa'
                  ? `• زمان تقریبی: ${toPersianNumbers(15)}-${toPersianNumbers(20)} دقیقه`
                  : '• Approximate time: 15-20 minutes'}
              </li>
              <li>
                {language === 'fa'
                  ? '• پیشرفت شما ذخیره می‌شود'
                  : '• Your progress will be saved'}
              </li>
            </ul>
          </div>

          {apiError && (
            <div className="p-3 bg-red-100 dark:bg-red-900/20 border border-red-300 dark:border-red-800 rounded-lg">
              <p className="text-sm text-red-600 dark:text-red-400 text-center">
                {apiError}
              </p>
            </div>
          )}

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 1.4 }}
          >
            <motion.div
              whileHover={{ scale: isLoading ? 1 : 1.02 }}
              whileTap={{ scale: isLoading ? 1 : 0.98 }}
            >
              <Button
                type="submit"
                className="w-full"
                size="lg"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                    <span>{language === 'fa' ? 'در حال ارسال...' : 'Submitting...'}</span>
                  </>
                ) : (
                  <>
                    <span>{language === 'fa' ? 'شروع تست' : 'Start Test'}</span>
                    {isRTL ? <ArrowLeft className="ml-2 h-5 w-5" /> : <ArrowRight className="ml-2 h-5 w-5" />}
                  </>
                )}
              </Button>
            </motion.div>
          </motion.div>
        </motion.form>
      </CardContent>
    </Card>
    </motion.div>
  );
}