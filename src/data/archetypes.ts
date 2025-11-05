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
  detailedStrengthFa: string;
  detailedShadowFa: string;
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
    detailedStrengthFa: 'اراده آهنین و عمل‌گرایی قاطع. رستم نماد قدرت فیزیکی و روانی است؛ فردی که در بحران‌ها رهبری را غریزی به دست می‌گیرد و برای رسیدن به اهداف، تلاش بی‌وقفه و تسلیم‌ناپذیری دارد. او برای دفاع از آرمان‌ها و وطن، بدون تردید می‌جنگد.',
    detailedShadowFa: 'غرور و عدم پذیرش ضعف. گاهی اوقات آنقدر به توانایی‌های خود مطمئن است که نظرات دیگران را نادیده می‌گیرد و ناشکیبایی در برابر کندی یا ضعف دیگران دارد. کمال‌گرایی او می‌تواند به شکل سختگیری بیش از حد به خود بروز کند.',
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
    detailedStrengthFa: 'عمق درونی و خودشناسی عمیق. سیمرغ، جوینده حقیقت و معنای پشت اتفاقات است. بهترین ایده‌ها در تنهایی و دور از شلوغی به ذهنش می‌رسد. توانایی گوش دادن فعال و مشاهده‌گر بودن او، به او قدرتی تحلیلی می‌دهد.',
    detailedShadowFa: 'انزوا و گریز از واقعیت، تمایل شدید به تنها بودن و غرق شدن در دنیای درون، می‌تواند او را از مسئولیت‌های دنیای واقعی دور کند. همچنین، دیگران ممکن است پیچیدگی‌های درونی او را درک نکنند و ترجیح می‌دهد سکوت کند.',
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
    detailedStrengthFa: 'همدلی، حمایت و مدیریت بحران‌های انسانی. اولویت اول او مراقبت و حمایت از اطرافیانش است. توانایی بالایی در درک احساسات دیگران، مذاکره و مدیریت بحران‌های انسانی دارد. دوست دارد به دیگران کمک کند تا بهترینِ خودشان باشند.',
    detailedShadowFa: 'قربانی کردن خود و ترس از ناامیدی دیگران. گفتن "نه" به درخواست‌های دیگران برایش سخت است و اغلب بار مسئولیت‌هایی را به دوش می‌کشد که متعلق به او نیستند. همیشه نگران است که مبادا دیگران را از خود ناامید کند.',
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
    detailedStrengthFa: 'جستجوگر عدالت و توانایی تهییج جمعی. کاوه به طور ذاتی به قدرت‌های زیاد با دیده شک و تردید نگاه می‌کند و برای دفاع از مظلومان می‌جنگد. توانایی او در سخنرانی و متحد کردن دیگران برای یک هدف، کاملاً طبیعی و انرژی‌بخش است.',
    detailedShadowFa: 'نیاز به کنترل و بی‌توجهی به احساسات. تمایل دارد کنترل اوضاع را در دست داشته باشد تا مطمئن شود همه چیز درست پیش می‌رود. در تمرکز بر حقیقت و افشای آن، ممکن است به احساسات افراد درگیر در ماجرا بی‌توجه شود.',
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
    detailedStrengthFa: 'احساسات عمیق، خلاقیت و زیبایی‌شناسی. موسیقی، هنر و زیبایی‌های بصری تأثیر عمیقی بر روحیه و احساسات او دارند. خلاقیت او بیشتر در قالب‌های هنری نمود پیدا می‌کند.',
    detailedShadowFa: 'آسیب‌پذیری احساسی و هیجانات شدید. احساسات او مانند دریا، گاهی طوفانی و غیرقابل کنترل است. حال روحی‌اش به شدت به کیفیت روابط عاطفی بستگی دارد و وقتی احساساتش جریحه‌دار می‌شود، ممکن است واکنشی شدیدتر از حد انتظار نشان دهد.',
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
    detailedStrengthFa: 'نظم، دقت و بهره‌وری بی‌نقص، جمشید معمار سیستم‌ها، مدل‌ها و برنامه‌های پیچیده است. او به دنبال کارآمدی کامل است و می‌تواند زندگی روزمره را با نظم مدیریت کند، در یک بحث، دلیل و منطق محکم می‌آورد و از حل مسائل منطقی لذت می‌برد.',
    detailedShadowFa: 'کمال‌گرایی افراطی و انعطاف‌ناپذیری. تحمل ناکارآمدی و بی‌نظمی برایش بسیار دشوار است و اگر کاری مطابق استانداردهای بالای او نباشد، به شدت ناامید می‌شود. گاهی اعتقاد دارد که "راه من بهترین راه است و متقاعد کردنش سخت است.',
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
    detailedStrengthFa: 'تمرکز شدید و پیش‌بینی بلندمدت. آرش یک فرد آرمان‌گرا با یک هدف والا است. او می‌تواند پیامدهای بلندمدت یک تصمیم را مانند یک صفحه شطرنج پیش‌بینی کند و با دید خوبی که نسبت به فضا و جهت‌ها دارد، مسیرش را در زندگی پیدا می‌کند.',
    detailedShadowFa: 'فداکاری افراطی و غفلت از زندگی روزمره. او اغلب روی یک هدف واحد آنقدر متمرکز می‌شود که از جنبه‌های دیگر زندگی غافل می‌ماند. گاهی یک هدف آنقدر برایش مقدس می‌شود که انسانیت و جنبه‌های دیگر آن را فراموش می‌کند (غایت، وسیله را توجیه می‌کند).',
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
    detailedStrengthFa: 'کاریزما، شبکه‌سازی و جلب توجه. ضحاک به راحتی می‌تواند نبض یک جمع را در دست بگیرد و از توجه دیگران انرژی می‌گیرد. او در شبکه‌سازی قدرتمند است و می‌داند چگونه شرایط را به نفع خود جلوه دهد.',
    detailedShadowFa: 'فریب و سوءاستفاده از جذابیت. گاهی برای رسیدن به هدف، تمام حقیقت را نمی‌گوید یا شرایط را به نفع خود جلوه می‌دهد. برایش بسیار مهم است که در چشم دیگران، فردی موفق، جذاب و قدرتمند به نظر برسد.',
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
    detailedStrengthFa: 'جستجوی عدالت، تعادل و صلح. او همیشه سعی می‌کند در اختلافات نقش میانجی را بازی کند تا آرامش و تعادل حفظ شود. فریدون به دنبال یافتن یک اصل جهانی است که بتواند عدالت و معنا را برای همه به ارمغان بیاورد.',
    detailedShadowFa: 'دودلی و پرهیز از تقابل. پرهیز از رویارویی مستقیم و گرفتن تصمیمات قاطع که ممکن است کسی را ناراحت کند، برایش استرس‌زاست. اغلب در دوراهی‌های سخت دچار دودلی شده و تصمیم‌گیری را به تعویق می‌اندازد.',
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
    detailedStrengthFa: 'وفاداری مطلق و ابراز پرشور احساسات. وفاداری او به کسانی که دوستشان دارد، مطلق است و حاضر است برایشان دست به هر کاری بزند. ابراز فیزیکی احساسات (مانند در آغوش کشیدن) برایش طبیعی و راحت است. او روابط عاطفی پرشور و هیجان‌انگیز را ترجیح می‌دهد.',
    detailedShadowFa: 'تصمیم‌گیری آنی و ترس از طرد شدن. اغلب تصمیمات مهم زندگی را بر اساس یک حس قوی و هیجان آنی می‌گیرد و گاهی منطق را فراموش می‌کند. ترس از طرد شدن یا تنها ماندن، می‌تواند باعث شود تصمیماتی بگیرد که بعداً از آن‌ها پشیمان شود.',
    color: '#BE185D'
  }
];