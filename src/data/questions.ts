export interface Question {
  id: number;
  text: string;
  textFa: string;
  archetype: string;
}

export const questions: Question[] = [
  // Rostam questions (1, 11, 21, 31, 41, 51)
  {
    id: 1,
    text: "In crisis situations, I'm the person who instinctively takes leadership and initiates practical action.",
    textFa: "در شرایط بحرانی، من فردی هستم که به طور غریزی رهبری را به دست گرفته و برای اقدام عملی پیش‌قدم می‌شوم.",
    archetype: "rostam"
  },
  {
    id: 11,
    text: "When someone challenges my abilities, I feel insulted and need to prove myself.",
    textFa: "وقتی کسی توانایی‌های مرا به چالش می‌کشد، احساس می‌کنم به من توهین شده و باید خودم را ثابت کنم.",
    archetype: "rostam"
  },
  {
    id: 21,
    text: "Competition motivates me and I enjoy pushing my physical limits.",
    textFa: "رقابت به من انگیزه می‌دهد و از به چالش کشیدن محدودیت‌های فیزیکی‌ام لذت می‌برم.",
    archetype: "rostam"
  },
  {
    id: 31,
    text: "Sometimes I'm so confident in my abilities that I give less value to others' opinions.",
    textFa: "گاهی آنقدر به توانایی‌های خودم مطمئن هستم که به نظرات دیگران کمتر بها می‌دهم.",
    archetype: "rostam"
  },
  {
    id: 41,
    text: "Physical activities and sports are an important part of my identity and lifestyle.",
    textFa: "فعالیت‌های بدنی و ورزش، بخش مهمی از هویت و سبک زندگی من است.",
    archetype: "rostam"
  },
  {
    id: 51,
    text: "Impatience with others' weakness or slowness is one of my challenges.",
    textFa: "ناشکیبایی در برابر ضعف یا کندی دیگران، یکی از چالش‌های من است.",
    archetype: "rostam"
  },

  // Simorgh questions (2, 12, 22, 32, 42, 52)
  {
    id: 2,
    text: "Before making decisions, I need to spend a lot of time alone thinking and analyzing internally.",
    textFa: "قبل از تصمیم‌گیری، نیاز دارم زمان زیادی را در تنهایی به فکر کردن و تحلیل درونی بپردازم.",
    archetype: "simorgh"
  },
  {
    id: 12,
    text: "I prefer to observe events from afar rather than being directly involved in crowds and social interactions.",
    textFa: "ترجیح می‌دهم از دور ناظر اتفاقات باشم تا اینکه مستقیماً درگیر شلوغی‌ها و تعاملات اجتماعی شوم.",
    archetype: "simorgh"
  },
  {
    id: 22,
    text: "My best ideas come when I'm alone and no one disturbs my thoughts.",
    textFa: "بهترین ایده‌ها زمانی به ذهنم می‌رسد که تنها هستم و کسی مزاحم افکارم نیست.",
    archetype: "simorgh"
  },
  {
    id: 32,
    text: "Sometimes I feel others don't understand my inner complexities, so I prefer to stay silent.",
    textFa: "گاهی احساس می‌کنم دیگران پیچیدگی‌های درونی مرا درک نمی‌کنند، برای همین ترجیح می‌دهم سکوت کنم.",
    archetype: "simorgh"
  },
  {
    id: 42,
    text: "I deeply believe in self-knowledge and personal growth.",
    textFa: "من عمیقاً به خودشناسی و رشد فردی باور دارم.",
    archetype: "simorgh"
  },
  {
    id: 52,
    text: "Sometimes I get so absorbed in my inner world that I distance myself from reality and responsibilities.",
    textFa: "گاهی آنقدر در دنیای درونم غرق می‌شوم که از دنیای واقعی و مسئولیت‌هایش فاصله می‌گیرم.",
    archetype: "simorgh"
  },

  // Jamshid questions (3, 13, 23, 33, 43, 53)
  {
    id: 3,
    text: "It's very important to me that my work and living environment is completely organized, precise, and optimized.",
    textFa: "برای من بسیار مهم است که محیط کار و زندگی‌ام کاملاً منظم، دقیق و بهینه باشد.",
    archetype: "jamshid"
  },
  {
    id: 13,
    text: "Tolerating disorder and inefficiency is very difficult for me and I quickly act to fix it.",
    textFa: "تحمل بی‌نظمی و ناکارآمدی برایم بسیار دشوار است و سریعاً برای اصلاح آن اقدام می‌کنم.",
    archetype: "jamshid"
  },
  {
    id: 23,
    text: "I enjoy building models, systems, and complex programs with many components.",
    textFa: "من از ساختن مدل‌ها، سیستم‌ها و برنامه‌های پیچیده که اجزای زیادی دارند، لذت می‌برم.",
    archetype: "jamshid"
  },
  {
    id: 33,
    text: "If work isn't done according to my high standards, I become extremely frustrated and disappointed.",
    textFa: "اگر کاری مطابق با استانداردهای بالای من انجام نشود، به شدت کلافه و ناامید می‌شوم.",
    archetype: "jamshid"
  },
  {
    id: 43,
    text: "I have high ability in solving logical problems and finding patterns in complex data.",
    textFa: "توانایی بالایی در حل مسائل منطقی و پیدا کردن الگوها در داده‌های پیچیده دارم.",
    archetype: "jamshid"
  },
  {
    id: 53,
    text: "I believe that 'my way is the best way' and convincing me otherwise is difficult.",
    textFa: "باور دارم که \"راه من بهترین راه است\" و متقاعد کردن من به روشی دیگر دشوار است.",
    archetype: "jamshid"
  },

  // Kaveh questions (4, 14, 24, 34, 44, 54)
  {
    id: 4,
    text: "I can easily unite others for a common goal with my words and excite them.",
    textFa: "من به راحتی می‌توانم با کلمات، دیگران را برای یک هدف مشترک تهییج و متحد کنم.",
    archetype: "kaveh"
  },
  {
    id: 14,
    text: "I naturally look at individuals or systems with too much power with doubt and suspicion.",
    textFa: "به طور ذاتی به افراد یا سیستم‌هایی که قدرت زیادی دارند، با دیده شک و تردید نگاه می‌کنم.",
    archetype: "kaveh"
  },
  {
    id: 24,
    text: "Public speaking and defending an idea is completely natural and even energizing for me.",
    textFa: "سخنرانی در جمع و دفاع از یک عقیده، برایم کاملاً طبیعی و حتی انرژی‌بخش است.",
    archetype: "kaveh"
  },
  {
    id: 34,
    text: "I tend to have control over situations to ensure everything goes right.",
    textFa: "تمایل دارم کنترل اوضاع را در دست داشته باشم تا مطمئن شوم همه چیز درست پیش می‌رود.",
    archetype: "kaveh"
  },
  {
    id: 44,
    text: "I enjoy debate and discussion and believe truth emerges from conflicting opinions.",
    textFa: "از بحث و مناظره لذت می‌برم و معتقدم حقیقت از دل تضارب آرا بیرون می‌آید.",
    archetype: "kaveh"
  },
  {
    id: 54,
    text: "Sometimes I focus so much on revealing the truth that I'm oblivious to the feelings of those involved.",
    textFa: "گاهی آنقدر روی افشای حقیقت تمرکز می‌کنم که به احساسات افراد درگیر در ماجرا بی‌توجه می‌شوم.",
    archetype: "kaveh"
  },

  // Manizheh questions (5, 15, 25, 35, 45, 55)
  {
    id: 5,
    text: "I've often made important life decisions based on strong feelings and momentary excitement.",
    textFa: "اغلب تصمیمات مهم زندگی‌ام را بر اساس یک حس قوی و هیجان آنی گرفته‌ام.",
    archetype: "manizheh"
  },
  {
    id: 15,
    text: "I prefer passionate and exciting emotional relationships to calm and predictable ones.",
    textFa: "روابط عاطفی پرشور و هیجان‌انگیز را به روابط آرام و قابل پیش‌بینی ترجیح می‌دهم.",
    archetype: "manizheh"
  },
  {
    id: 25,
    text: "My loyalty to those I love is absolute and I'm willing to do anything for them.",
    textFa: "وفاداری من به کسانی که دوستشان دارم، مطلق است و حاضرم برایشان دست به هر کاری بزنم.",
    archetype: "manizheh"
  },
  {
    id: 35,
    text: "Sometimes I get so caught up in the passion of a relationship or idea that I forget logic.",
    textFa: "گاهی آنقدر درگیر شور و هیجان یک رابطه یا یک ایده می‌شوم که منطق را فراموش می‌کنم.",
    archetype: "manizheh"
  },
  {
    id: 45,
    text: "Physical expression of emotions (like hugging or dancing) is natural and comfortable for me.",
    textFa: "ابراز فیزیکی احساسات (مانند در آغوش کشیدن یا رقصیدن) برایم طبیعی و راحت است.",
    archetype: "manizheh"
  },
  {
    id: 55,
    text: "Fear of rejection or being alone can cause me to make decisions I later regret.",
    textFa: "ترس از طرد شدن یا تنها ماندن، می‌تواند باعث شود تصمیماتی بگیرم که بعداً از آنها پشیمان شوم.",
    archetype: "manizheh"
  },

  // Gordafarid questions (6, 16, 26, 36, 46, 56)
  {
    id: 6,
    text: "My first priority is caring for and protecting those around me, even if it means ignoring my own needs.",
    textFa: "اولویت اول من، مراقبت و حمایت از اطرافیانم است، حتی اگر به قیمت نادیده گرفتن نیازهای خودم تمام شود.",
    archetype: "gordafarid"
  },
  {
    id: 16,
    text: "Saying 'no' to others' requests is one of the hardest things in the world for me.",
    textFa: "گفتن \"نه\" به درخواست‌های دیگران برایم یکی از سخت‌ترین کارهای دنیاست.",
    archetype: "gordafarid"
  },
  {
    id: 26,
    text: "Understanding others' feelings and needs is easy for me and I often put myself in their shoes.",
    textFa: "درک احساسات و نیازهای دیگران برایم آسان است و اغلب خودم را جای آنها می‌گذارم.",
    archetype: "gordafarid"
  },
  {
    id: 36,
    text: "I'm often worried about disappointing others.",
    textFa: "اغلب نگران این هستم که مبادا دیگران را از خودم ناامید کنم.",
    archetype: "gordafarid"
  },
  {
    id: 46,
    text: "My ability in negotiation and managing human crises is one of my strengths.",
    textFa: "توانایی من در مذاکره و مدیریت بحران‌های انسانی، یکی از نقاط قوتم است.",
    archetype: "gordafarid"
  },
  {
    id: 56,
    text: "I often carry the burden of responsibilities that don't belong to me.",
    textFa: "اغلب بار مسئولیت‌هایی را به دوش می‌کشم که متعلق به من نیستند.",
    archetype: "gordafarid"
  },

  // Arash questions (7, 17, 27, 37, 47, 57)
  {
    id: 7,
    text: "When I set a goal for myself, I'm willing to sacrifice everything else to achieve it.",
    textFa: "وقتی هدفی را برای خودم تعیین می‌کنم، حاضرم هر چیز دیگری را برای رسیدن به آن قربانی کنم.",
    archetype: "arash"
  },
  {
    id: 17,
    text: "I often focus so intensely on a single goal that I neglect other aspects of life.",
    textFa: "من اغلب روی یک هدف واحد آنقدر متمرکز می‌شوم که از جنبه‌های دیگر زندگی غافل می‌مانم.",
    archetype: "arash"
  },
  {
    id: 27,
    text: "I have good vision for spaces and directions and can easily find my way in nature.",
    textFa: "من دید خوبی نسبت به فضاها و جهت‌ها دارم و به راحتی می‌توانم مسیرم را در طبیعت پیدا کنم.",
    archetype: "arash"
  },
  {
    id: 37,
    text: "I believe great sacrifices are necessary to reach a noble goal.",
    textFa: "معتقدم برای رسیدن به یک هدف والا، فداکاری‌های بزرگ لازم است.",
    archetype: "arash"
  },
  {
    id: 47,
    text: "I can often predict the long-term consequences of a decision like a chess board.",
    textFa: "اغلب می‌توانم پیامدهای بلندمدت یک تصمیم را مانند یک صفحه شطرنج پیش‌بینی کنم.",
    archetype: "arash"
  },
  {
    id: 57,
    text: "Sometimes a goal becomes so sacred to me that I forget its humanity and other aspects.",
    textFa: "گاهی یک هدف آنقدر برایم مقدس می‌شود که انسانیت و جنبه‌های دیگر آن را فراموش می‌کنم.",
    archetype: "arash"
  },

  // Zahhak questions (8, 18, 28, 38, 48, 58)
  {
    id: 8,
    text: "I can easily take control of a crowd and draw people toward me with my verbal charm.",
    textFa: "می‌توانم به راحتی نبض یک جمع را در دست بگیرم و با جذابیت کلامم، افراد را به سمت خودم بکشانم.",
    archetype: "zahhak"
  },
  {
    id: 18,
    text: "In my interactions, sometimes to reach my goal, I don't tell the whole truth or present situations in my favor.",
    textFa: "در تعاملاتم، گاهی برای رسیدن به هدفم، تمام حقیقت را نمی‌گویم یا شرایط را به نفع خودم جلوه می‌دهم.",
    archetype: "zahhak"
  },
  {
    id: 28,
    text: "Networking and creating extensive connections is one of my main strengths.",
    textFa: "شبکه‌سازی و ایجاد ارتباطات گسترده، یکی از نقاط قوت اصلی من است.",
    archetype: "zahhak"
  },
  {
    id: 38,
    text: "I can easily figure out what each person likes and use it to get their attention.",
    textFa: "به راحتی می‌توانم بفهمم هر کس از چه چیزی خوشش می‌آید و از آن برای جلب توجهش استفاده کنم.",
    archetype: "zahhak"
  },
  {
    id: 48,
    text: "I'm like an actor on stage in social situations and I get energy from others' attention.",
    textFa: "من در موقعیت‌های اجتماعی مانند یک بازیگر روی صحنه هستم و از توجه دیگران انرژی می‌گیرم.",
    archetype: "zahhak"
  },
  {
    id: 58,
    text: "It's important to me to appear successful, attractive, and powerful in others' eyes.",
    textFa: "برایم مهم است که در چشم دیگران، فردی موفق، جذاب و قدرتمند به نظر برسم.",
    archetype: "zahhak"
  },

  // Fereydun questions (9, 19, 29, 39, 49, 59)
  {
    id: 9,
    text: "I always try to play the mediator role in conflicts to maintain peace and balance.",
    textFa: "همیشه سعی می‌کنم در اختلافات، نقش میانجی را بازی کنم تا آرامش و تعادل حفظ شود.",
    archetype: "fereydun"
  },
  {
    id: 19,
    text: "Making decisive decisions that might upset someone is very stressful for me.",
    textFa: "گرفتن تصمیمات قاطع که ممکن است کسی را ناراحت کند، برایم بسیار استرس‌زاست.",
    archetype: "fereydun"
  },
  {
    id: 29,
    text: "I often think about deep life issues like 'purpose' and 'meaning'.",
    textFa: "اغلب در مورد مسائل عمیق زندگی مانند \"هدف\" و \"معنا\" فکر می‌کنم.",
    archetype: "fereydun"
  },
  {
    id: 39,
    text: "I avoid direct confrontation and prefer issues to be resolved with peace and calm.",
    textFa: "از رویارویی مستقیم و تقابل پرهیز می‌کنم و ترجیح می‌دهم مسائل با صلح و آرامش حل شوند.",
    archetype: "fereydun"
  },
  {
    id: 49,
    text: "I'm looking for a universal principle or law that can bring justice and meaning to everyone.",
    textFa: "به دنبال یافتن یک اصل یا قانون جهانی هستم که بتواند عدالت و معنا را برای همه به ارمغان بیاورد.",
    archetype: "fereydun"
  },
  {
    id: 59,
    text: "I often get indecisive at difficult crossroads and postpone decision-making.",
    textFa: "اغلب در دوراهی‌های سخت، دچار دودلی می‌شوم و تصمیم‌گیری را به تعویق می‌اندازم.",
    archetype: "fereydun"
  },

  // Roudabeh questions (10, 20, 30, 40, 50, 60)
  {
    id: 10,
    text: "Music, art, and visual beauty have a very deep impact on my mood and emotions.",
    textFa: "موسیقی، هنر و زیبایی‌های بصری تأثیر بسیار عمیقی بر روحیه و احساسات من دارند.",
    archetype: "roudabeh"
  },
  {
    id: 20,
    text: "My emotions are like the sea, sometimes calm and sometimes stormy and uncontrollable.",
    textFa: "احساسات من مانند دریا، گاهی آرام و گاهی طوفانی و غیرقابل کنترل است.",
    archetype: "roudabeh"
  },
  {
    id: 30,
    text: "A melody or song can completely change my mood in a moment.",
    textFa: "یک ملودی یا آهنگ می‌تواند در یک لحظه حال و هوای مرا به کلی زیر و رو کند.",
    archetype: "roudabeh"
  },
  {
    id: 40,
    text: "My mood heavily depends on the quality of my emotional relationships.",
    textFa: "حال روحی من به شدت به کیفیت روابط عاطفی‌ام بستگی دارد.",
    archetype: "roudabeh"
  },
  {
    id: 50,
    text: "My creativity mostly manifests in artistic forms like music, painting, or poetry.",
    textFa: "خلاقیت من بیشتر در قالب‌های هنری مانند موسیقی، نقاشی یا شعر نمود پیدا می‌کند.",
    archetype: "roudabeh"
  },
  {
    id: 60,
    text: "When my emotions are hurt, I might react much more intensely than expected.",
    textFa: "وقتی احساساتم جریحه‌دار می‌شود، ممکن است واکنشی نشان دهم که بسیار شدیدتر از حد انتظار است.",
    archetype: "roudabeh"
  }
];