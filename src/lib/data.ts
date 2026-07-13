export const NAV_LINKS = [
  { label: "About", href: "#about" },
  { label: "Services", href: "#services" },
  { label: "Client Stories", href: "#stories" },
  { label: "Pricing", href: "#pricing" },
  { label: "FAQ", href: "#faq" },
];

export const HERO_STATS = [
  { value: "99", suffix: "%", label: "Satisfaction Rate" },
  { value: "250", suffix: "+", label: "Clients Transformed" },
];

export const ABOUT_CREDENTIALS = [
  {
    title: "Pro Athlete",
    subtitle: "Former Competitive Athlete",
    icon: "medal" as const,
  },
  {
    title: "Certified Coach",
    subtitle: "NASM & ACE Certified",
    icon: "certificate" as const,
  },
];

export const SERVICES = [
  {
    title: "Build Real Strength",
    body: "Progressive strength training focused on real numbers, solid technique, and long-term gains.",
    image: "/images/curtis/svc-strength.jpg",
  },
  {
    title: "Elite Conditioning",
    body: "Develop real endurance that supports stronger, more consistent training.",
    image: "/images/curtis/svc-conditioning.jpg",
  },
  {
    title: "Injury Prevention",
    body: "Training designed to reduce the risk of injury.",
    icon: "bone" as const,
  },
  {
    title: "Expert Nutrition",
    body: "Strategic dietary guidance for long-term results.",
    image: "/images/curtis/svc-nutrition.jpg",
  },
];

export const PROCESS_STEPS = [
  {
    number: "01",
    title: "Discovery Call",
    body: "We dive into your goals, current challenges, and lifestyle to create a clear, strategic direction forward.",
  },
  {
    number: "02",
    title: "Personalised Plan",
    body: "A tailored training and nutrition strategy built around your lifestyle and targets.",
  },
  {
    number: "03",
    title: "Guided Training",
    body: "Structured training sessions with expert feedback, consistent support, and real accountability.",
  },
  {
    number: "04",
    title: "Progress Tracking",
    body: "We closely monitor performance, body metrics, and make smart, data-driven adjustments.",
  },
  {
    number: "05",
    title: "Level Up",
    body: "Once you hit your goal, we raise the standard and push you to the next level forward together.",
  },
];

export const PROCESS_STATS = [
  { value: "450", suffix: "+", label: "Custom Plans Built" },
  { value: "95", suffix: "%", label: "Consistency Rate" },
];

export type Transformation = {
  quote: string;
  name: string;
  meta: string;
  before: string;
  after: string;
};

export const TRANSFORMATIONS: Transformation[] = [
  {
    quote:
      "I started this program feeling stuck with my weight and depression. Through consistent training and accountability, I lost weight, built muscle, and feel stronger, healthier, and genuinely happy again. Thank you, coach!",
    name: "David",
    meta: "In-person Training | 9 Months",
    before: "/images/curtis/before-david.jpg",
    after: "/images/curtis/after-david.jpg",
  },
  {
    quote:
      "As a mum of two, I struggled with my weight and finding time for myself. Coach Curtis helped me lose weight, build strength, and regain my energy without sacrificing family time. I now feel strong, confident, and proud of what my body can do.",
    name: "Claudia",
    meta: "In-person Training | 5 Months",
    before: "/images/curtis/before-mike.jpg",
    after: "/images/curtis/after-david.jpg",
  },
  {
    quote:
      "Came back from a lower back injury not knowing what I could safely do. Now I'm back to full training and stronger than I ever was before. The structure and patience made all the difference.",
    name: "Tom",
    meta: "In-person Training | 7 Months",
    before: "/images/curtis/before-mike.jpg",
    after: "/images/curtis/before-david.jpg",
  },
];

export type Review = {
  quote: string;
  name: string;
  role: string;
  avatar: string;
};

export const REVIEWS: Review[] = [
  {
    quote:
      "Curtis tailors every session and takes recovery seriously. I'm in my 40s and honestly in the best shape of my life — age really is just a number.",
    name: "Isabella Nowak",
    role: "In-person Training",
    avatar: "/images/curtis/avatar-isabella.jpg",
  },
  {
    quote:
      "The conditioning work Curtis puts together is no joke! I'm fitter than I was in my twenties. The nutrition guidance alongside training made everything click.",
    name: "Laurie",
    role: "In-person Training",
    avatar: "/images/curtis/avatar-laurie.jpg",
  },
  {
    quote:
      "Competed in my first bodybuilding show after 18 months working together. The peak week prep was spot on — couldn't have done it without him.",
    name: "Michael Little",
    role: "In-person Training",
    avatar: "/images/curtis/avatar-michael.jpg",
  },
  {
    quote:
      "I came in barely able to do a full push-up. Curtis built my confidence session by session, and now strength training is the best part of my week.",
    name: "Sofia Reyes",
    role: "Online Training",
    avatar: "/images/curtis/avatar-isabella.jpg",
  },
  {
    quote:
      "The accountability is what sets Curtis apart. Weekly check-ins kept me consistent through a busy year, and the results speak for themselves.",
    name: "James Carter",
    role: "Online Training",
    avatar: "/images/curtis/avatar-michael.jpg",
  },
];

export const PRICING = [
  {
    name: "Online Training",
    icon: "globe" as const,
    body: "Personalized online coaching with direct support and clear, immediate action.",
    price: "$149",
    period: "/month",
    featured: false,
    features: [
      { label: "Initial consultation", highlight: false },
      { label: "Personalized action plan", highlight: false },
      { label: "Nutrition guidance", highlight: false },
      { label: "Tracking & accountability", highlight: false },
    ],
  },
  {
    name: "In-Person Training",
    icon: "users" as const,
    body: "Face to face, in-person coaching that delivers direct guidance and fast, actionable results.",
    price: "$249",
    period: "/month",
    featured: true,
    features: [
      { label: "In-person weekly sessions", highlight: true },
      { label: "Initial consultation", highlight: false },
      { label: "Personalized action plan", highlight: false },
      { label: "Nutrition guidance", highlight: false },
      { label: "Tracking & accountability", highlight: false },
    ],
  },
];

export const FAQS = [
  {
    q: "How does getting started work?",
    a: "It begins with a free discovery call where we discuss your goals, training history, and lifestyle. From there I build a tailored plan and we schedule your first session — usually within the same week.",
  },
  {
    q: "Do I need a gym membership?",
    a: "For in-person training, sessions run at Framer Gym in Amsterdam, so no separate membership is required. For online coaching, any well-equipped gym works, and I can adapt programs to home setups too.",
  },
  {
    q: "I'm just starting out, is that okay?",
    a: "Absolutely. A large share of my clients start as complete beginners. Every program is built around your current level, focusing on solid fundamentals and safe, progressive overload from day one.",
  },
  {
    q: "What's the difference between online and in-person training?",
    a: "In-person training includes hands-on coaching, live technique correction, and weekly face-to-face sessions. Online coaching gives you the same structured programming and accountability with remote check-ins and video feedback.",
  },
  {
    q: "Do you offer flexible scheduling?",
    a: "Yes. Sessions are booked around your availability, and online clients train entirely on their own schedule. If life gets busy, we adjust the plan rather than break momentum.",
  },
  {
    q: "Can I pause or cancel my training at any time?",
    a: "Of course. There are no long lock-in contracts. You can pause between blocks or cancel with a week's notice — the goal is lasting progress, not pressure.",
  },
];

export const FOOTER_LINKS = [
  { label: "About", href: "#about" },
  { label: "Services", href: "#services" },
  { label: "Client Stories", href: "#stories" },
  { label: "Pricing", href: "#pricing" },
  { label: "FAQ", href: "#faq" },
  { label: "Contact", href: "#contact" },
];
