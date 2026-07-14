// Coach P — /classic route content.
// This is a template-faithful adaptation of the original personal-trainer
// landing page, minimally rebranded for Coach P (Pierrot Massenat).
//
// NOTE: Prices, satisfaction %, client totals and testimonials below are
// TEMPLATE / CONCEPT content carried over to preserve the reference composition.
// They are NOT confirmed Coach P figures and must be treated as demonstrative.

export const CLASSIC_BRAND = {
  name: "Coach P",
  instagram: "https://www.instagram.com/coachp_factory",
};

export const NAV_LINKS = [
  { label: "About", href: "#about" },
  { label: "Services", href: "#services" },
  { label: "Client Stories", href: "#stories" },
  { label: "Pricing", href: "#pricing" },
  { label: "FAQ", href: "#faq" },
];

// Template/concept figures — see file header.
export const HERO_STATS = [
  { value: "99", suffix: "%", label: "Satisfaction Rate" },
  { value: "250", suffix: "+", label: "Clients Transformed" },
];

export const ABOUT_CREDENTIALS = [
  {
    title: "Experienced Athlete",
    subtitle: "Two decades of training",
    icon: "medal" as const,
  },
  {
    title: "Performance Coach",
    subtitle: "Strength & conditioning",
    icon: "certificate" as const,
  },
];

export const SERVICES = [
  {
    title: "Build Real Strength",
    body: "Progressive strength training focused on real numbers, solid technique, and long-term gains.",
    image: "/images/classic/svc-strength.jpg",
  },
  {
    title: "Elite Conditioning",
    body: "Develop real endurance that supports stronger, more consistent training.",
    image: "/images/classic/svc-conditioning.jpg",
  },
  {
    title: "Injury Prevention",
    body: "Training designed to reduce the risk of injury.",
    icon: "bone" as const,
  },
  {
    title: "Expert Nutrition",
    body: "Strategic dietary guidance for long-term results.",
    image: "/images/classic/svc-nutrition.jpg",
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

// Template/concept figures — see file header.
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

// Concept client stories (template content), rebranded to Coach P.
export const TRANSFORMATIONS: Transformation[] = [
  {
    quote:
      "I started this program feeling stuck with my weight and depression. Through consistent training and accountability, I lost weight, built muscle, and feel stronger, healthier, and genuinely happy again. Thank you, coach!",
    name: "David",
    meta: "In-person Training | 9 Months",
    before: "/images/classic/before-david.jpg",
    after: "/images/classic/after-david.jpg",
  },
  {
    quote:
      "Coach P took my lifting to a new level. I wasn't sure how much progress I had left, but with structured programming and feedback, I broke through plateaus and moved into powerlifting. My strength and confidence grew, and my training finally had direction.",
    name: "Tom",
    meta: "In-person Training | 18 Months",
    before: "/images/classic/before-mike.jpg",
    after: "/images/classic/after-david.jpg",
  },
  {
    quote:
      "As a mum of two, I struggled with my weight and finding time for myself. Coach P helped me lose weight, build strength, and regain my energy without sacrificing family time. I now feel strong, confident, and proud of what my body can do.",
    name: "Claudia",
    meta: "In-person Training | 5 Months",
    before: "/images/classic/before-mike.jpg",
    after: "/images/classic/before-david.jpg",
  },
];

export type Review = {
  quote: string;
  name: string;
  role: string;
  avatar: string;
};

// Concept reviews (template content), rebranded to Coach P.
export const REVIEWS: Review[] = [
  {
    quote:
      "Coach P tailors every session and takes recovery seriously. I'm in my 40s and honestly in the best shape of my life — age really is just a number.",
    name: "Isabella Nowak",
    role: "In-person Training",
    avatar: "/images/classic/avatar-isabella.jpg",
  },
  {
    quote:
      "The conditioning work Coach P puts together is no joke! I'm fitter than I was in my twenties. The nutrition guidance alongside training made everything click.",
    name: "Laurie",
    role: "In-person Training",
    avatar: "/images/classic/avatar-laurie.jpg",
  },
  {
    quote:
      "Competed in my first bodybuilding show after 18 months working together. The peak week prep was spot on — couldn't have done it without him.",
    name: "Michael Little",
    role: "In-person Training",
    avatar: "/images/classic/avatar-michael.jpg",
  },
  {
    quote:
      "I came in barely able to do a full push-up. Coach P built my confidence session by session, and now strength training is the best part of my week.",
    name: "Sofia Reyes",
    role: "Online Training",
    avatar: "/images/classic/avatar-isabella.jpg",
  },
  {
    quote:
      "The accountability is what sets Coach P apart. Weekly check-ins kept me consistent through a busy year, and the results speak for themselves.",
    name: "James Carter",
    role: "Online Training",
    avatar: "/images/classic/avatar-michael.jpg",
  },
];

// Template/concept pricing — NOT confirmed Coach P rates (see file header).
export const PRICING = [
  {
    name: "Online Training",
    icon: "globe" as const,
    body: "Personalized online coaching with direct support and clear, immediate action.",
    price: "$299",
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
    price: "$1499",
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
    a: "For in-person training, sessions run at a private training facility, so no separate membership is required. For online coaching, any well-equipped gym works, and I can adapt programs to home setups too.",
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
