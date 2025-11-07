import { useState, useEffect } from 'react';
import { archetypes } from '../data/archetypes';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Progress } from './ui/progress';
import { Badge } from './ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Share2, RotateCcw, Trophy, TrendingUp, AlertTriangle, MessageCircle, Send, Twitter, Facebook, Linkedin, Copy, Check } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';
import { toPersianNumbers } from '../utils/persianNumbers';
import { motion } from 'framer-motion';
import { saveQuizSubmission } from '../utils/api';

interface ResultsProps {
  scores: Record<string, number>;
  onRestart: () => void;
  language: 'en' | 'fa';
  responses?: Record<number, number>;
  userId?: string;
  userData?: {
    firstName: string;
    lastName: string;
    mobileNumber: string;
  };
}

export function Results({ scores, onRestart, language, responses, userId, userData }: ResultsProps) {
  const [percentages, setPercentages] = useState<Record<string, number>>({});
  const [topArchetypes, setTopArchetypes] = useState<string[]>([]);
  const [isSaving, setIsSaving] = useState(false);
  const [saveError, setSaveError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    // Calculate percentages
    const maxScorePerArchetype = 30; // 6 questions × 5 max points
    const calculatedPercentages: Record<string, number> = {};
    
    // Initialize all archetypes with 0 score
    archetypes.forEach(archetype => {
      calculatedPercentages[archetype.id] = 0;
    });
    
    // Calculate scores from provided data
    Object.entries(scores).forEach(([archetype, score]) => {
      if (score !== undefined && score !== null) {
        calculatedPercentages[archetype] = Math.round((score / maxScorePerArchetype) * 100);
      }
    });
    
    setPercentages(calculatedPercentages);
    
    // Sort archetypes by score
    const sorted = Object.entries(calculatedPercentages)
      .sort(([, a], [, b]) => b - a)
      .map(([archetype]) => archetype);
    
    setTopArchetypes(sorted);

    // Save quiz submission to backend if all required data is available
    if (userId && userData && responses && topArchetypes.length > 0 && !isSaving) {
      saveQuizToBackend(sorted, calculatedPercentages);
    }
  }, [scores]);

  const saveQuizToBackend = async (
    sortedArchetypes: string[],
    calculatedPercentages: Record<string, number>
  ) => {
    if (isSaving) return;

    setIsSaving(true);
    setSaveError(null);

    try {
      // Prepare the submission data
      const submissionData = {
        userId: userId!,
        firstName: userData!.firstName,
        lastName: userData!.lastName,
        mobileNumber: userData!.mobileNumber,
        responses: responses || {},
        scores,
        percentages: calculatedPercentages,
        primaryArchetype: sortedArchetypes[0],
        secondaryArchetype: sortedArchetypes[1] || undefined,
        weakestArchetype: sortedArchetypes[sortedArchetypes.length - 1],
        primaryArchetypePercentage: calculatedPercentages[sortedArchetypes[0]] || 0,
        language
      };

      // Save to backend
      const response = await saveQuizSubmission(submissionData);

      if (response.success) {
        // Store submission ID in localStorage for reference
        localStorage.setItem('lastQuizSubmissionId', response.data?.submissionId || '');
        console.log('Quiz submission saved successfully:', response.data);
      } else {
        throw new Error(response.message || 'Failed to save quiz submission');
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
      console.error('Error saving quiz submission:', errorMessage);
      setSaveError(errorMessage);
      // Don't throw - allow user to see results even if save fails
    } finally {
      setIsSaving(false);
    }
  };

  const getShareText = () => {
    const primaryArchetype = archetypes.find(a => a.id === topArchetypes[0]);
    const shareUrl = window.location.origin;

    return {
      text: language === 'fa'
        ? `کهن‌الگوی غالب من ${primaryArchetype?.nameFa} (${primaryArchetype?.titleFa}) است! شما هم تست کهن‌الگوی شخصیتی TEDx را امتحان کنید.`
        : `My dominant archetype is ${primaryArchetype?.name} (${primaryArchetype?.title})! Try the TEDx Personality Archetype test yourself.`,
      url: shareUrl
    };
  };

  const handleCopyToClipboard = async () => {
    const { text, url } = getShareText();
    const fullText = `${text}\n${url}`;

    try {
      await navigator.clipboard.writeText(fullText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error('Failed to copy:', error);
    }
  };

  const handleWhatsAppShare = () => {
    const { text, url } = getShareText();
    const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(`${text}\n${url}`)}`;
    window.open(whatsappUrl, '_blank');
  };

  const handleTelegramShare = () => {
    const { text, url } = getShareText();
    const telegramUrl = `https://t.me/share/url?url=${encodeURIComponent(url)}&text=${encodeURIComponent(text)}`;
    window.open(telegramUrl, '_blank');
  };

  const handleTwitterShare = () => {
    const { text, url } = getShareText();
    const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`;
    window.open(twitterUrl, '_blank');
  };

  const handleFacebookShare = () => {
    const { url } = getShareText();
    const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`;
    window.open(facebookUrl, '_blank');
  };

  const handleLinkedinShare = () => {
    const { url } = getShareText();
    const linkedinUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`;
    window.open(linkedinUrl, '_blank');
  };

  const handleNativeShare = async () => {
    const { text, url } = getShareText();

    if (navigator.share) {
      try {
        await navigator.share({
          title: language === 'fa' ? 'نتیجه تست کهن‌الگوی شخصیتی' : 'Personality Archetype Test Results',
          text: text,
          url: url,
        });
      } catch (error) {
        console.error('Error sharing:', error);
      }
    } else {
      handleCopyToClipboard();
    }
  };

  const primaryArchetype = topArchetypes.length > 0 ? archetypes.find(a => a.id === topArchetypes[0]) : archetypes[0];
  const secondaryArchetype = topArchetypes.length > 1 ? archetypes.find(a => a.id === topArchetypes[1]) : archetypes[1];
  const weakestArchetype = topArchetypes.length > 0 ? archetypes.find(a => a.id === topArchetypes[topArchetypes.length - 1]) : archetypes[archetypes.length - 1];
  
  const isRTL = language === 'fa';
  
  // Safety check - don't render if no data
  if (topArchetypes.length === 0 || !primaryArchetype) {
    return (
      <motion.div 
        className="w-full max-w-4xl mx-auto text-center" 
        dir={isRTL ? 'rtl' : 'ltr'}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <Card>
          <CardContent className="py-8">
            <p>{language === 'fa' ? 'در حال محاسبه نتایج...' : 'Calculating results...'}</p>
          </CardContent>
        </Card>
      </motion.div>
    );
  }

  return (
    <motion.div 
      className="w-full max-w-4xl mx-auto space-y-6" 
      dir={isRTL ? 'rtl' : 'ltr'}
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      {/* Save Status Message */}
      {isSaving && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-3 text-center text-sm text-blue-700 dark:text-blue-300"
        >
          {language === 'fa' ? 'در حال ذخیره نتایج...' : 'Saving your results...'}
        </motion.div>
      )}

      {saveError && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-3 text-center text-sm text-yellow-700 dark:text-yellow-300"
        >
          {language === 'fa' ? 'خطا در ذخیره: ' : 'Save Error: '}
          {saveError}
        </motion.div>
      )}

      {/* Main Result Card */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <Card className="border-2" style={{ borderColor: primaryArchetype?.color }}>
          <CardHeader className="text-center pb-4">
            <motion.div
              className="flex flex-col items-center gap-4 mb-4"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <div className="relative">
                <motion.img
                  src={`/persons/${primaryArchetype?.id === 'fereydun' ? 'sam' : primaryArchetype?.id}.png`}
                  alt={language === 'fa' ? primaryArchetype?.nameFa : primaryArchetype?.name}
                  className="w-20 h-20 sm:w-24 sm:h-24 object-cover rounded-full border-4 shadow-lg"
                  style={{ borderColor: primaryArchetype?.color }}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6, delay: 0.6, type: "spring", stiffness: 200 }}
                />
                <motion.div
                  className="absolute -top-2 -right-2"
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4, delay: 1 }}
                >
                  <Trophy className="h-8 w-8 text-yellow-500" />
                </motion.div>
              </div>

              {/* Video Player */}
              {primaryArchetype?.id !== 'simorgh' && primaryArchetype?.id !== 'fereydun' && (
                <motion.div
                  className="w-full max-w-md mx-auto"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.8 }}
                >
                  <div className="aspect-video w-full">
                    <video
                      className="w-full h-full object-contain rounded-lg shadow-lg border-2"
                      style={{ borderColor: primaryArchetype?.color }}
                      autoPlay
                      loop
                      muted
                      playsInline
                      controls
                    >
                      <source
                        src={`/videos/${primaryArchetype?.id === 'fereydun' ? 'sam' : primaryArchetype?.id}.mp4`}
                        type="video/mp4"
                      />
                      {language === 'fa'
                        ? 'مرورگر شما از پخش ویدیو پشتیبانی نمی‌کند.'
                        : 'Your browser does not support the video tag.'}
                    </video>
                  </div>
                </motion.div>
              )}
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.8 }}
            >
              <CardTitle className="text-2xl sm:text-3xl font-bold mb-2">
                {language === 'fa' ? 'کهن‌الگوی غالب شما' : 'Your Dominant Archetype'}
              </CardTitle>
              <div className="space-y-2">
                <motion.h2
                  className="text-3xl sm:text-4xl font-bold"
                  style={{ color: primaryArchetype?.color }}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 1 }}
                >
                  {language === 'fa' ? primaryArchetype?.nameFa : primaryArchetype?.name}
                </motion.h2>
                <motion.p
                  className="text-lg sm:text-xl text-muted-foreground"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5, delay: 1.2 }}
                >
                  {language === 'fa' ? primaryArchetype?.titleFa : primaryArchetype?.title}
                </motion.p>
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 1.4 }}
                >
                  <Badge variant="secondary" className="text-lg px-4 py-1">
                    {language === 'fa' 
                      ? `${toPersianNumbers(percentages[topArchetypes[0]] || 0)}% تطابق`
                      : `${percentages[topArchetypes[0]] || 0}% Match`}
                  </Badge>
                </motion.div>
              </div>
            </motion.div>
          </CardHeader>
        <CardContent>
          <motion.p
            className="text-center text-base sm:text-lg leading-relaxed mb-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 1.6 }}
          >
            {language === 'fa' ? primaryArchetype?.descriptionFa : primaryArchetype?.description}
          </motion.p>
          
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 1.8 }}
          >
            <motion.div 
              className="space-y-2"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, delay: 2 }}
            >
              <h4 className="font-semibold text-sm text-muted-foreground">
                {language === 'fa' ? 'هوش برجسته' : 'Dominant Intelligence'}
              </h4>
              <p className="font-medium">
                {language === 'fa' ? primaryArchetype?.intelligenceFa : primaryArchetype?.intelligence}
              </p>
            </motion.div>
            <motion.div 
              className="space-y-2"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 2.1 }}
            >
              <h4 className="font-semibold text-sm text-muted-foreground">
                {language === 'fa' ? 'ویژگی‌های کلیدی' : 'Key Traits'}
              </h4>
              <p className="font-medium">
                {language === 'fa' 
                  ? primaryArchetype?.keyTraitsFa.join('، ')
                  : primaryArchetype?.keyTraits.join(', ')}
              </p>
            </motion.div>
            <motion.div 
              className="space-y-2"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, delay: 2.2 }}
            >
              <h4 className="font-semibold text-sm text-muted-foreground">
                {language === 'fa' ? 'سایه شخصیتی' : 'Shadow Trait'}
              </h4>
              <p className="font-medium">
                {language === 'fa' ? primaryArchetype?.shadowFa : primaryArchetype?.shadow}
              </p>
            </motion.div>
          </motion.div>
        </CardContent>
      </Card>
      </motion.div>

      {/* Detailed Results Tabs */}
      <Tabs defaultValue="all" className="w-full">
        <TabsList className="grid w-full grid-cols-3 h-auto">
          <TabsTrigger value="all" className="text-xs sm:text-sm py-2">
            {language === 'fa' ? 'همه نتایج' : 'All Results'}
          </TabsTrigger>
          <TabsTrigger value="strengths" className="text-xs sm:text-sm py-2">
            {language === 'fa' ? 'نقاط قوت' : 'Strengths'}
          </TabsTrigger>
          <TabsTrigger value="insights" className="text-xs sm:text-sm py-2">
            {language === 'fa' ? 'بینش‌ها' : 'Insights'}
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="all" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-xl">
                {language === 'fa' ? 'امتیاز تمام کهن‌الگوها' : 'All Archetype Scores'}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {topArchetypes.map((archetypeId, index) => {
                const archetype = archetypes.find(a => a.id === archetypeId);
                const percentage = percentages[archetypeId];
                
                return (
                  <div key={archetypeId} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-2">
                        {index === 0 && <Trophy className="h-4 w-4" style={{ color: archetype?.color }} />}
                        <span className="font-medium">
                          {language === 'fa' ? archetype?.nameFa : archetype?.name}
                        </span>
                        <span className="text-sm text-muted-foreground">
                          ({language === 'fa' ? archetype?.titleFa : archetype?.title})
                        </span>
                      </div>
                      <span className="font-semibold">
                        {language === 'fa' ? `${toPersianNumbers(percentage || 0)}%` : `${percentage || 0}%`}
                      </span>
                    </div>
                    <Progress value={percentage} className="h-2" />
                  </div>
                );
              })}
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="strengths" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-xl flex items-center gap-2">
                <TrendingUp className="h-5 w-5" />
                {language === 'fa' ? 'نقاط قوت شما' : 'Your Strengths'}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="font-semibold mb-2">
                  {language === 'fa' ? 'هوش برجسته (نقطه قوت)' : 'Dominant Intelligence (Strength)'}
                </h4>
                <p className="text-muted-foreground leading-relaxed">
                  {language === 'fa'
                    ? primaryArchetype?.detailedStrengthFa
                    : `As a ${primaryArchetype?.name}, you possess ${primaryArchetype?.keyTraits.join(' and ')}.`}
                </p>
              </div>

              {secondaryArchetype && percentages[secondaryArchetype.id] > 50 && (
                <div className="mt-6 pt-4 border-t">
                  <h4 className="font-semibold mb-2">
                    {language === 'fa' ? 'کهن‌الگوی ثانویه' : 'Secondary Archetype'}
                  </h4>
                  <p className="text-muted-foreground">
                    {language === 'fa'
                      ? `ترکیب ${primaryArchetype?.nameFa} و ${secondaryArchetype?.nameFa} به شما قدرت منحصر به فردی می‌دهد.`
                      : `The combination of ${primaryArchetype?.name} and ${secondaryArchetype?.name} gives you unique power.`}
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="insights" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-xl flex items-center gap-2">
                <AlertTriangle className="h-5 w-5" />
                {language === 'fa' ? 'چالش‌های احتمالی' : 'Potential Challenges'}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="font-semibold mb-2">
                  {language === 'fa' ? 'سایه شخصیتی (چالش)' : 'Shadow Trait (Challenge)'}
                </h4>
                <p className="text-muted-foreground leading-relaxed">
                  {language === 'fa'
                    ? primaryArchetype?.detailedShadowFa
                    : `${primaryArchetype?.shadow} can be a challenge for you. Awareness is the first step to growth.`}
                </p>
              </div>

              {weakestArchetype && percentages[weakestArchetype.id] < 30 && (
                <div className="mt-6 pt-4 border-t">
                  <h4 className="font-semibold mb-2">
                    {language === 'fa' ? 'نقطه ضعف' : 'Weak Area'}
                  </h4>
                  <p className="text-muted-foreground">
                    {language === 'fa'
                      ? `کهن‌الگوی ${weakestArchetype?.nameFa} کمترین امتیاز را دارد. توسعه این جنبه می‌تواند به تعادل شخصیتی کمک کند.`
                      : `The ${weakestArchetype?.name} archetype has the lowest score. Developing this aspect can help personality balance.`}
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Action Buttons */}
      <motion.div
        className="flex flex-col sm:flex-row gap-4 justify-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 2.4 }}
      >
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="default" className="flex items-center gap-2">
                <Share2 className="h-4 w-4" />
                {language === 'fa' ? 'اشتراک‌گذاری نتیجه' : 'Share Result'}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align={language === 'fa' ? 'end' : 'start'} className="w-56">
              <DropdownMenuLabel>
                {language === 'fa' ? 'اشتراک‌گذاری در:' : 'Share on:'}
              </DropdownMenuLabel>
              <DropdownMenuSeparator />

              <DropdownMenuItem onClick={handleWhatsAppShare} className="cursor-pointer">
                <MessageCircle className="h-4 w-4 text-green-600" />
                <span>{language === 'fa' ? 'واتساپ' : 'WhatsApp'}</span>
              </DropdownMenuItem>

              <DropdownMenuItem onClick={handleTelegramShare} className="cursor-pointer">
                <Send className="h-4 w-4 text-blue-500" />
                <span>{language === 'fa' ? 'تلگرام' : 'Telegram'}</span>
              </DropdownMenuItem>

              <DropdownMenuItem onClick={handleTwitterShare} className="cursor-pointer">
                <Twitter className="h-4 w-4 text-sky-500" />
                <span>{language === 'fa' ? 'توییتر / ایکس' : 'Twitter / X'}</span>
              </DropdownMenuItem>

              <DropdownMenuItem onClick={handleFacebookShare} className="cursor-pointer">
                <Facebook className="h-4 w-4 text-blue-600" />
                <span>{language === 'fa' ? 'فیسبوک' : 'Facebook'}</span>
              </DropdownMenuItem>

              <DropdownMenuItem onClick={handleLinkedinShare} className="cursor-pointer">
                <Linkedin className="h-4 w-4 text-blue-700" />
                <span>{language === 'fa' ? 'لینکدین' : 'LinkedIn'}</span>
              </DropdownMenuItem>

              <DropdownMenuSeparator />

              <DropdownMenuItem onClick={handleCopyToClipboard} className="cursor-pointer">
                {copied ? (
                  <>
                    <Check className="h-4 w-4 text-green-600" />
                    <span className="text-green-600">
                      {language === 'fa' ? 'کپی شد!' : 'Copied!'}
                    </span>
                  </>
                ) : (
                  <>
                    <Copy className="h-4 w-4" />
                    <span>{language === 'fa' ? 'کپی متن' : 'Copy Text'}</span>
                  </>
                )}
              </DropdownMenuItem>

              {typeof navigator !== 'undefined' && 'share' in navigator && (
                <>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleNativeShare} className="cursor-pointer">
                    <Share2 className="h-4 w-4" />
                    <span>{language === 'fa' ? 'گزینه‌های بیشتر...' : 'More Options...'}</span>
                  </DropdownMenuItem>
                </>
              )}
            </DropdownMenuContent>
          </DropdownMenu>
        </motion.div>
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Button onClick={onRestart} variant="outline" className="flex items-center gap-2">
            <RotateCcw className="h-4 w-4" />
            {language === 'fa' ? 'تست مجدد' : 'Retake Test'}
          </Button>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}