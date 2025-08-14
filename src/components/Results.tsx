import { useState, useEffect } from 'react';
import { archetypes } from '../data/archetypes';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Progress } from './ui/progress';
import { Badge } from './ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Share2, RotateCcw, Trophy, TrendingUp, AlertTriangle } from 'lucide-react';
import { toPersianNumbers } from '../utils/persianNumbers';
import { motion } from 'framer-motion';

interface ResultsProps {
  scores: Record<string, number>;
  onRestart: () => void;
  language: 'en' | 'fa';
}

export function Results({ scores, onRestart, language }: ResultsProps) {
  const [percentages, setPercentages] = useState<Record<string, number>>({});
  const [topArchetypes, setTopArchetypes] = useState<string[]>([]);
  
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
  }, [scores]);

  const handleShare = () => {
    const primaryArchetype = archetypes.find(a => a.id === topArchetypes[0]);
    const shareText = language === 'fa'
      ? `کهن‌الگوی غالب من ${primaryArchetype?.nameFa} (${primaryArchetype?.titleFa}) است! شما هم تست کهن‌الگوی شخصیتی TEDx را امتحان کنید.`
      : `My dominant archetype is ${primaryArchetype?.name} (${primaryArchetype?.title})! Try the TEDx Personality Archetype test yourself.`;
    
    if (navigator.share) {
      navigator.share({
        title: language === 'fa' ? 'نتیجه تست کهن‌الگوی شخصیتی' : 'Personality Archetype Test Results',
        text: shareText,
      });
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(shareText);
      alert(language === 'fa' ? 'نتیجه کپی شد!' : 'Result copied to clipboard!');
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
      {/* Main Result Card */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <Card className="border-2" style={{ borderColor: primaryArchetype?.color }}>
          <CardHeader className="text-center pb-4">
            <motion.div 
              className="flex justify-center mb-4"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <div className="relative">
                <motion.img
                  src={`/persons/${primaryArchetype?.id === 'fereydun' ? 'sam' : primaryArchetype?.id}.png`}
                  alt={language === 'fa' ? primaryArchetype?.nameFa : primaryArchetype?.name}
                  className="w-24 h-24 object-cover rounded-full border-4 shadow-lg"
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
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.8 }}
            >
              <CardTitle className="text-3xl font-bold mb-2">
                {language === 'fa' ? 'کهن‌الگوی غالب شما' : 'Your Dominant Archetype'}
              </CardTitle>
              <div className="space-y-2">
                <motion.h2 
                  className="text-4xl font-bold" 
                  style={{ color: primaryArchetype?.color }}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 1 }}
                >
                  {language === 'fa' ? primaryArchetype?.nameFa : primaryArchetype?.name}
                </motion.h2>
                <motion.p 
                  className="text-xl text-muted-foreground"
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
            className="text-center text-lg leading-relaxed mb-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 1.6 }}
          >
            {language === 'fa' ? primaryArchetype?.descriptionFa : primaryArchetype?.description}
          </motion.p>
          
          <motion.div 
            className="grid md:grid-cols-3 gap-4 text-center"
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
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="all">
            {language === 'fa' ? 'همه نتایج' : 'All Results'}
          </TabsTrigger>
          <TabsTrigger value="strengths">
            {language === 'fa' ? 'نقاط قوت' : 'Strengths'}
          </TabsTrigger>
          <TabsTrigger value="insights">
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
                  {language === 'fa' ? 'کهن‌الگوی اصلی' : 'Primary Archetype'}
                </h4>
                <p className="text-muted-foreground">
                  {language === 'fa'
                    ? `به عنوان یک ${primaryArchetype?.nameFa}، شما ${primaryArchetype?.keyTraitsFa.join(' و ')} را در خود دارید.`
                    : `As a ${primaryArchetype?.name}, you possess ${primaryArchetype?.keyTraits.join(' and ')}.`}
                </p>
              </div>
              
              {secondaryArchetype && percentages[secondaryArchetype.id] > 50 && (
                <div>
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
                  {language === 'fa' ? 'سایه شخصیتی' : 'Shadow Trait'}
                </h4>
                <p className="text-muted-foreground">
                  {language === 'fa'
                    ? `${primaryArchetype?.shadowFa} می‌تواند چالشی برای شما باشد. آگاهی از آن اولین قدم برای رشد است.`
                    : `${primaryArchetype?.shadow} can be a challenge for you. Awareness is the first step to growth.`}
                </p>
              </div>
              
              {weakestArchetype && percentages[weakestArchetype.id] < 30 && (
                <div>
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
          <Button onClick={handleShare} variant="default" className="flex items-center gap-2">
            <Share2 className="h-4 w-4" />
            {language === 'fa' ? 'اشتراک‌گذاری نتیجه' : 'Share Result'}
          </Button>
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