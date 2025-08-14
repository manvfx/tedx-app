import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { RadioGroup, RadioGroupItem } from './ui/radio-group';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { ArrowRight, ArrowLeft } from 'lucide-react';
import { toPersianNumbers } from '../utils/persianNumbers';
import { motion } from 'framer-motion';

interface WelcomeProps {
  onStart: () => void;
  language: 'en' | 'fa';
}

export interface UserData {
  firstName: string;
  lastName: string;
  age: number;
  gender: 'male' | 'female' | 'other';
}

export function Welcome({ onStart, language }: WelcomeProps) {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [age, setAge] = useState('');
  const [gender, setGender] = useState<'male' | 'female' | 'other'>('male');
  const [errors, setErrors] = useState<Record<string, string>>({});

  const isRTL = language === 'fa';

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!firstName.trim()) {
      newErrors.firstName = language === 'fa' ? 'نام الزامی است' : 'First name is required';
    }

    if (!lastName.trim()) {
      newErrors.lastName = language === 'fa' ? 'نام خانوادگی الزامی است' : 'Last name is required';
    }

    const ageNum = parseInt(age);
    if (!age || isNaN(ageNum) || ageNum < 10 || ageNum > 120) {
      newErrors.age = language === 'fa' 
        ? 'سن باید بین ۱۰ تا ۱۲۰ سال باشد' 
        : 'Age must be between 10 and 120';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      const userData: UserData = {
        firstName: firstName.trim(),
        lastName: lastName.trim(),
        age: parseInt(age),
        gender
      };
      
      // Save user data to localStorage
      localStorage.setItem('userData', JSON.stringify(userData));
      onStart();
    }
  };

  // Generate age options
  const ageOptions = Array.from({ length: 111 }, (_, i) => i + 10);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <Card className="max-w-3xl mx-auto w-[600px]" dir={isRTL ? 'rtl' : 'ltr'}>
        <CardHeader className="text-center">
          <motion.div 
            className="flex justify-center mb-4"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <img 
              src="/logo-black.png" 
              alt="TEDx Logo" 
              className="h-16 w-auto"
            />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <CardTitle className="text-3xl font-bold mb-2">
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
            <CardDescription className="text-lg">
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
                  {language === 'fa' ? 'نام' : 'First Name'}
                </Label>
                <Input
                  id="firstName"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  placeholder={language === 'fa' ? 'نام خود را وارد کنید' : 'Enter your first name'}
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

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="age">
                  {language === 'fa' ? 'سن' : 'Age'}
                </Label>
                <Select value={age} onValueChange={setAge}>
                  <SelectTrigger className={errors.age ? 'border-red-500' : ''}>
                    <SelectValue placeholder={language === 'fa' ? 'سن خود را انتخاب کنید' : 'Select your age'} />
                  </SelectTrigger>
                  <SelectContent>
                    {ageOptions.map((ageOption) => (
                      <SelectItem key={ageOption} value={ageOption.toString()}>
                        {language === 'fa' 
                          ? `${toPersianNumbers(ageOption)} سال`
                          : `${ageOption} years`}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.age && (
                  <p className="text-sm text-red-500">{errors.age}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label>
                  {language === 'fa' ? 'جنسیت' : 'Gender'}
                </Label>
                <RadioGroup value={gender} onValueChange={(value) => setGender(value as typeof gender)}>
                  <div className="flex items-center space-x-2 space-x-reverse">
                    <RadioGroupItem value="male" id="male" />
                    <Label htmlFor="male" className="cursor-pointer">
                      {language === 'fa' ? 'مرد' : 'Male'}
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2 space-x-reverse">
                    <RadioGroupItem value="female" id="female" />
                    <Label htmlFor="female" className="cursor-pointer">
                      {language === 'fa' ? 'زن' : 'Female'}
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2 space-x-reverse">
                    <RadioGroupItem value="other" id="other" />
                    <Label htmlFor="other" className="cursor-pointer">
                      {language === 'fa' ? 'سایر' : 'Other'}
                    </Label>
                  </div>
                </RadioGroup>
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

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 1.4 }}
          >
            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Button type="submit" className="w-full" size="lg">
                <span>{language === 'fa' ? 'شروع تست' : 'Start Test'}</span>
                {isRTL ? <ArrowLeft className="ml-2 h-5 w-5" /> : <ArrowRight className="ml-2 h-5 w-5" />}
              </Button>
            </motion.div>
          </motion.div>
        </motion.form>
      </CardContent>
    </Card>
    </motion.div>
  );
}