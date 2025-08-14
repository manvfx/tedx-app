export interface Archetype {
  id: string;
  name: string;
  nameFa: string;
  title: string;
  titleFa: string;
  intelligence: string;
  intelligenceFa: string;
  shadow: string;
  shadowFa: string;
  keyTraits: string[];
  keyTraitsFa: string[];
  description: string;
  descriptionFa: string;
  color: string;
}

export const archetypes: Archetype[] = [
  {
    id: 'rostam',
    name: 'Rostam',
    nameFa: 'رستم',
    title: 'Strategic Warrior',
    titleFa: 'جنگجوی استراتژیست',
    intelligence: 'Bodily-Kinesthetic',
    intelligenceFa: 'هوش بدنی-جنبشی',
    shadow: 'Pride',
    shadowFa: 'غرور',
    keyTraits: ['Power', 'Strategy', 'Decisive Action'],
    keyTraitsFa: ['قدرت', 'استراتژی', 'عمل قاطع'],
    description: 'Natural leaders who take charge in crisis situations, combining physical strength with strategic thinking.',
    descriptionFa: 'رهبران طبیعی که در شرایط بحرانی رهبری را به دست می‌گیرند و قدرت فیزیکی را با تفکر استراتژیک ترکیب می‌کنند.',
    color: '#DC2626'
  },
  {
    id: 'simorgh',
    name: 'Simorgh',
    nameFa: 'سیمرغ',
    title: 'Wise Sage',
    titleFa: 'دانای خردمند',
    intelligence: 'Intrapersonal',
    intelligenceFa: 'هوش درون‌فردی',
    shadow: 'Isolation',
    shadowFa: 'انزوا',
    keyTraits: ['Wisdom', 'Mystery', 'Intuition'],
    keyTraitsFa: ['خرد', 'رمز و راز', 'شهود'],
    description: 'Deep thinkers who prefer solitude for reflection and possess profound inner wisdom.',
    descriptionFa: 'متفکران عمیقی که تنهایی را برای تأمل ترجیح می‌دهند و دارای خرد درونی عمیقی هستند.',
    color: '#7C3AED'
  },
  {
    id: 'gordafarid',
    name: 'Gordafarid',
    nameFa: 'گردآفرید',
    title: 'Innovative Defender',
    titleFa: 'مدافع مبتکر',
    intelligence: 'Interpersonal',
    intelligenceFa: 'هوش میان‌فردی',
    shadow: 'Excessive Self-sacrifice',
    shadowFa: 'فداکاری افراطی',
    keyTraits: ['Protection', 'Empathy', 'Sacrifice'],
    keyTraitsFa: ['حمایت', 'همدلی', 'ایثار'],
    description: 'Natural protectors who prioritize others\' needs and excel at understanding emotions.',
    descriptionFa: 'محافظان طبیعی که نیازهای دیگران را در اولویت قرار می‌دهند و در درک احساسات مهارت دارند.',
    color: '#059669'
  },
  {
    id: 'kaveh',
    name: 'Kaveh',
    nameFa: 'کاوه آهنگر',
    title: 'Revolutionary Leader',
    titleFa: 'رهبر انقلابی',
    intelligence: 'Linguistic-Verbal',
    intelligenceFa: 'هوش کلامی-زبانی',
    shadow: 'Distrust',
    shadowFa: 'بی‌اعتمادی',
    keyTraits: ['Rebellion', 'Leadership', 'Justice'],
    keyTraitsFa: ['شورش', 'رهبری', 'عدالت'],
    description: 'Charismatic speakers who inspire others toward common goals and fight for justice.',
    descriptionFa: 'سخنوران کاریزماتیکی که دیگران را برای اهداف مشترک الهام می‌بخشند و برای عدالت می‌جنگند.',
    color: '#EA580C'
  },
  {
    id: 'roudabeh',
    name: 'Roudabeh',
    nameFa: 'رودابه',
    title: 'Artist Lover',
    titleFa: 'عاشق هنرمند',
    intelligence: 'Musical-Rhythmic',
    intelligenceFa: 'هوش موسیقیایی-ریتمیک',
    shadow: 'Emotional Instability',
    shadowFa: 'بی‌ثباتی عاطفی',
    keyTraits: ['Art', 'Passion', 'Unbounded Emotions'],
    keyTraitsFa: ['هنر', 'شور', 'احساسات بی‌قید'],
    description: 'Deeply emotional beings whose moods are influenced by art, music, and beauty.',
    descriptionFa: 'موجودات عمیقاً احساسی که حال و هوایشان تحت تأثیر هنر، موسیقی و زیبایی است.',
    color: '#E11D48'
  },
  {
    id: 'jamshid',
    name: 'Jamshid',
    nameFa: 'جمشید',
    title: 'Builder King',
    titleFa: 'پادشاه سازنده',
    intelligence: 'Logical-Mathematical',
    intelligenceFa: 'هوش منطقی-ریاضی',
    shadow: 'Perfectionism',
    shadowFa: 'کمال‌گرایی',
    keyTraits: ['Order', 'Perfection', 'Hidden Flaws'],
    keyTraitsFa: ['نظم', 'کمال', 'نقص پنهان'],
    description: 'System builders who strive for perfection and excel at creating order from chaos.',
    descriptionFa: 'سازندگان سیستم که برای کمال تلاش می‌کنند و در ایجاد نظم از هرج و مرج مهارت دارند.',
    color: '#0891B2'
  },
  {
    id: 'arash',
    name: 'Arash',
    nameFa: 'آرش',
    title: 'Idealist Archer',
    titleFa: 'کمان‌گیر آرمان‌گرا',
    intelligence: 'Spatial-Visual',
    intelligenceFa: 'هوش فضایی-دیداری',
    shadow: 'Dogmatism',
    shadowFa: 'جزم‌اندیشی',
    keyTraits: ['Direction', 'Intense Focus', 'Single Goal'],
    keyTraitsFa: ['جهت', 'تمرکز شدید', 'هدف واحد'],
    description: 'Goal-oriented individuals who sacrifice everything for their singular vision.',
    descriptionFa: 'افراد هدف‌محوری که همه چیز را برای دیدگاه واحدشان قربانی می‌کنند.',
    color: '#065F46'
  },
  {
    id: 'zahhak',
    name: 'Zahhak',
    nameFa: 'ضحاک',
    title: 'Charismatic Manipulator',
    titleFa: 'فرمانروای اغواگر',
    intelligence: 'Interpersonal (Dark)',
    intelligenceFa: 'هوش میان‌فردی (سیاه)',
    shadow: 'Manipulation',
    shadowFa: 'دستکاری‌گری',
    keyTraits: ['Charisma', 'Deception', 'Hidden Danger'],
    keyTraitsFa: ['کاریزما', 'فریب', 'خطر پنهان'],
    description: 'Master manipulators who use charm and charisma to achieve their goals.',
    descriptionFa: 'دستکاری‌گران ماهری که از جذابیت و کاریزما برای رسیدن به اهدافشان استفاده می‌کنند.',
    color: '#581C87'
  },
  {
    id: 'fereydun',
    name: 'Fereydun',
    nameFa: 'فریدون',
    title: 'Just Mediator',
    titleFa: 'دادگرِ میانجی',
    intelligence: 'Existential',
    intelligenceFa: 'هوش وجودی',
    shadow: 'Indecision',
    shadowFa: 'دودلی',
    keyTraits: ['Balance', 'Justice', 'Harmony'],
    keyTraitsFa: ['تعادل', 'عدالت', 'هارمونی'],
    description: 'Natural mediators who seek balance and avoid conflict while pondering life\'s meaning.',
    descriptionFa: 'میانجی‌گران طبیعی که به دنبال تعادل هستند و از درگیری پرهیز می‌کنند در حالی که به معنای زندگی می‌اندیشند.',
    color: '#1E40AF'
  },
  {
    id: 'manizheh',
    name: 'Manizheh',
    nameFa: 'منیژه',
    title: 'Passionate Loyal',
    titleFa: 'وفادار پرشور',
    intelligence: 'Emotional',
    intelligenceFa: 'هوش عاطفی',
    shadow: 'Dependency',
    shadowFa: 'وابستگی',
    keyTraits: ['Loyalty', 'Intense Connection', 'Passion'],
    keyTraitsFa: ['وفاداری', 'ارتباط شدید', 'شور'],
    description: 'Intensely loyal individuals who make decisions based on emotions and deep connections.',
    descriptionFa: 'افراد شدیداً وفاداری که تصمیمات را بر اساس احساسات و ارتباطات عمیق می‌گیرند.',
    color: '#BE185D'
  }
];