import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
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
  gender: string;
  country: string;
  city: string;
}

export function Welcome({ onStart, language }: WelcomeProps) {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  const [gender, setGender] = useState('');
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
    } else if (!/^[0-9]+$/.test(mobileNumber)) {
      newErrors.mobileNumber = language === 'fa' ? 'شماره موبایل معتبر نیست' : 'Invalid mobile number';
    } else if (mobileNumber.length < 10) {
      newErrors.mobileNumber = language === 'fa' ? 'شماره موبایل باید حداقل ۱۰ رقم باشد' : 'Mobile number must be at least 10 digits';
    }

    if (!gender) {
      newErrors.gender = language === 'fa' ? 'جنسیت الزامی است' : 'Gender is required';
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
        gender: gender,
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
                type="tel"
                value={mobileNumber}
                onChange={(e) => {
                  const value = e.target.value.replace(/[^0-9]/g, '');
                  setMobileNumber(value);
                }}
                placeholder={language === 'fa' ? 'شماره موبایل خود را وارد کنید' : 'Enter your mobile number'}
                className={errors.mobileNumber ? 'border-red-500' : ''}
                inputMode="numeric"
                pattern="[0-9]*"
              />
              {errors.mobileNumber && (
                <p className="text-sm text-red-500">{errors.mobileNumber}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="gender">
                {language === 'fa' ? 'جنسیت' : 'Gender'}
              </Label>
              <Select value={gender} onValueChange={setGender}>
                <SelectTrigger className={errors.gender ? 'border-red-500' : ''}>
                  <SelectValue placeholder={language === 'fa' ? 'جنسیت خود را انتخاب کنید' : 'Select your gender'} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="male">{language === 'fa' ? 'مرد' : 'Male'}</SelectItem>
                  <SelectItem value="female">{language === 'fa' ? 'زن' : 'Female'}</SelectItem>
                  <SelectItem value="other">{language === 'fa' ? 'سایر' : 'Other'}</SelectItem>
                  <SelectItem value="prefer-not-to-say">{language === 'fa' ? 'ترجیح می‌دهم نگویم' : 'Prefer not to say'}</SelectItem>
                </SelectContent>
              </Select>
              {errors.gender && (
                <p className="text-sm text-red-500">{errors.gender}</p>
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

          <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg space-y-3 text-sm">
            {language === 'fa' ? (
              <>
                <h3 className="font-bold text-base">
                  تست «کشف کهن‌الگوی شاهنامه»
                </h3>
                <h4 className="font-semibold text-sm">
                  از اسطوره تا روان‌سنجی: نقشه‌های درونی شما
                </h4>
                <p className="text-muted-foreground leading-relaxed">
                  تست «کشف کهن‌الگوی شاهنامه» یک ابزار روان‌سنجی است که با هدف ایجاد یک پل ارتباطی میان ناخودآگاه جمعی ایرانی (مفاهیم یونگی شاهنامه) و مدل‌های شخصیت‌شناسی استاندارد جهانی طراحی شده است. این تست برای ارائه یک پروفایل شخصیتی عمیق، منحصربه‌فرد و کاربردی بر اساس ۱۰ شخصیت برجسته شاهنامه توسعه یافته است.
                </p>
                <div className="space-y-2">
                  <h5 className="font-semibold">۱. مبانی تئوریک: کهن‌الگوهای یونگی و اساطیر ایرانی</h5>
                  <p className="text-muted-foreground leading-relaxed">
                    هسته اصلی این تست بر نظریه کهن‌الگوها (Archetypes) کارل گوستاو یونگ استوار است. شخصیت‌هایی چون رستم، سیمرغ، جمشید، کاوه، گردآفرید، آرش، ضحاک، فریدون، رودابه و منیژه به عنوان صورت‌های ازلی (الگوهای رفتاری و فکری) در نظر گرفته شده‌اند که ریشه در اساطیر ایران باستان و شاهنامه دارند. هر کهن‌الگو دارای دو بُعد حیاتی است که در نتیجه تست منعکس می‌شود: هوش برجسته (نقطه قوت) و سایه شخصیتی (چالش).
                  </p>
                </div>
                <div className="space-y-2">
                  <h5 className="font-semibold">۲. استانداردهای روان‌سنجی: اتصال به مدل‌های جهانی</h5>
                  <p className="text-muted-foreground leading-relaxed">
                    برای تضمین اعتبار و جامعیت روان‌سنجی، ساختار این تست با شاخص‌های دو مدل استاندارد روان‌شناختی مقایسه و طراحی شده است:
                  </p>
                  <p className="text-muted-foreground leading-relaxed mr-4">
                    <strong>الف. مدل NEO-PI-R (مدل پنج عاملی شخصیت):</strong> این مدل برای پوشش‌دهی ابعاد اصلی شخصیت سالم به کار رفته است. به عنوان مثال، جمشید با سنجش وجدان‌گرایی (نظم، دقت و کمال‌گرایی)، سیمرغ با باز بودن به تجربه (تفکر عمیق و خودشناسی) و رستم با برون‌گرایی (عمل‌گرایی، رقابت و اراده قوی) همبسته شده‌اند.
                  </p>
                  <p className="text-muted-foreground leading-relaxed mr-4">
                    <strong>ب. MMPI (آزمون چندمحوری شخصیت مینه سوتا):</strong> برای تحلیل دقیق‌تر ابعاد چالش‌برانگیز و «سایه» شخصیتی، از مقیاس‌های MMPI برای تعریف چالش‌های کهن‌الگوها استفاده شده است.
                  </p>
                </div>
                <div className="space-y-2">
                  <h5 className="font-semibold">۳. مکانیسم و روش نمره‌گذاری (لیکرت ۵ درجه‌ای)</h5>
                  <p className="text-muted-foreground leading-relaxed">
                    این تست شامل ۶۰ جمله خبری است که هر یک از ۱۰ کهن‌الگو (هوش و سایه) را هدف قرار می‌دهند. کاربر میزان موافقت یا مخالفت خود را روی یک مقیاس لیکرت ۵ درجه‌ای (از «کاملاً مخالفم» تا «کاملاً موافقم») مشخص می‌کند. در نهایت، امتیاز هر ۱۰ کهن‌الگو محاسبه شده و یک پروفایل شخصیتی کامل ارائه می‌دهد.
                  </p>
                </div>
              </>
            ) : (
              <>
                <h3 className="font-bold text-base">
                  Discover Shahnameh Archetype Test
                </h3>
                <h4 className="font-semibold text-sm">
                  From Myth to Psychometrics: Your Inner Maps
                </h4>
                <p className="text-muted-foreground leading-relaxed">
                  The "Discover Shahnameh Archetype" test is a psychometric tool designed to create a bridge between the Iranian collective unconscious (Jungian concepts from Shahnameh) and standard global personality assessment models. This test is developed to provide a deep, unique, and practical personality profile based on 10 prominent characters from Shahnameh.
                </p>
                <div className="space-y-2">
                  <h5 className="font-semibold">1. Theoretical Foundation: Jungian Archetypes and Iranian Mythology</h5>
                  <p className="text-muted-foreground leading-relaxed">
                    The core of this test is based on Carl Gustav Jung's theory of Archetypes. Characters such as Rostam, Simorgh, Jamshid, Kaveh, Gordafarid, Arash, Zahhak, Fereydun, Roudabeh, and Manizheh are considered as primordial forms (behavioral and cognitive patterns) rooted in ancient Iranian mythology and Shahnameh. Each archetype has two vital dimensions reflected in the test results: dominant intelligence (strength) and shadow personality (challenge).
                  </p>
                </div>
                <div className="space-y-2">
                  <h5 className="font-semibold">2. Psychometric Standards: Connection to Global Models</h5>
                  <p className="text-muted-foreground leading-relaxed">
                    To ensure validity and comprehensive psychometric assessment, this test's structure is designed and compared with two standard psychological models:
                  </p>
                  <p className="text-muted-foreground leading-relaxed ml-4">
                    <strong>A. NEO-PI-R Model (Five-Factor Model):</strong> This model is used to cover the main dimensions of healthy personality. For example, Jamshid correlates with conscientiousness (order, precision, and perfectionism), Simorgh with openness to experience (deep thinking and self-awareness), and Rostam with extraversion (pragmatism, competitiveness, and strong will).
                  </p>
                  <p className="text-muted-foreground leading-relaxed ml-4">
                    <strong>B. MMPI (Minnesota Multiphasic Personality Inventory):</strong> For more detailed analysis of challenging dimensions and personality "shadow," MMPI scales are used to define archetype challenges.
                  </p>
                </div>
                <div className="space-y-2">
                  <h5 className="font-semibold">3. Mechanism and Scoring Method (5-Point Likert Scale)</h5>
                  <p className="text-muted-foreground leading-relaxed">
                    This test consists of 60 declarative statements targeting each of the 10 archetypes (intelligence and shadow). Users indicate their level of agreement or disagreement on a 5-point Likert scale (from "Strongly Disagree" to "Strongly Agree"). Finally, scores for all 10 archetypes are calculated and a complete personality profile is presented.
                  </p>
                </div>
              </>
            )}
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
                className="w-full h-16 sm:h-20 text-lg sm:text-xl font-bold"
                size="lg"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-6 w-6 sm:h-8 sm:w-8 animate-spin" />
                    <span>{language === 'fa' ? 'در حال ارسال...' : 'Submitting...'}</span>
                  </>
                ) : (
                  <>
                    <span>{language === 'fa' ? 'شروع تست' : 'Start Test'}</span>
                    {isRTL ? <ArrowLeft className="ml-2 h-6 w-6 sm:h-8 sm:w-8" /> : <ArrowRight className="ml-2 h-6 w-6 sm:h-8 sm:w-8" />}
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