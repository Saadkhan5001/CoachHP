// Coach P Factory — homepage content.
// Copy is written from VERIFIED brand signals (see BRAND_AUDIT.md). No prices,
// client counts, certifications, locations, or testimonials are fabricated.

export const BRAND = {
  name: "Coach P Factory",
  coach: "Pierrot Massenat",
  instagram: "https://www.instagram.com/coachp_factory",
  instagramHandle: "@coachp_factory",
};

export const NAV_LINKS = [
  { label: "The Coach", href: "#about" },
  { label: "Coaching", href: "#coaching" },
  { label: "The Method", href: "#method" },
  { label: "Academy", href: "/academy" },
  { label: "FAQ", href: "#faq" },
];

// Verified credibility — used instead of fabricated stat numbers.
export const HERO_CREDS = [
  { value: 20, suffix: "+", label: "Years of Training Experience" },
  { value: null, text: "Coach", suffix: " + Competitor", label: "From the work to the stage" },
];

export const CREDENTIALS = [
  {
    title: "20+ Years in the Game",
    subtitle: "Over two decades of hands-on coaching",
    icon: "clock" as const,
  },
  {
    title: "Martial Arts Foundation",
    subtitle: "Discipline rooted in the dojo",
    icon: "shield" as const,
  },
  {
    title: "Strength & Conditioning",
    subtitle: "Built for real performance",
    icon: "dumbbell" as const,
  },
  {
    title: "Coach + Competitor",
    subtitle: "He trains the work he lives",
    icon: "trophy" as const,
  },
];

export type Service = {
  key: string;
  eyebrow: string;
  title: string;
  body: string;
  mode: string; // In-person / Online / Both
  image?: string;
  icon?: "strength" | "conditioning" | "stage" | "athlete";
};

export const SERVICES: Service[] = [
  {
    key: "strength",
    eyebrow: "01 · Strength",
    title: "Strength & Muscle",
    body: "Progressive, technical strength work built on real numbers and clean execution — the foundation everything else is stacked on.",
    mode: "In-person / Online",
    image: "/images/coach-p/strength.jpg",
    icon: "strength",
  },
  {
    key: "conditioning",
    eyebrow: "02 · Conditioning",
    title: "Conditioning & Agility",
    body: "Work capacity, speed and movement quality that hold up when the training gets heavy.",
    mode: "In-person / Online",
    image: "/images/coach-p/conditioning.jpg",
    icon: "conditioning",
  },
  {
    key: "stage",
    eyebrow: "03 · Competition",
    title: "Physique & Stage Prep",
    body: "Structured preparation that takes disciplined athletes from the work to the stage. Coach P preps competitors — and steps on stage himself.",
    mode: "By application",
    icon: "stage",
  },
  {
    key: "athlete",
    eyebrow: "04 · Athletes",
    title: "Athlete Development",
    body: "Technique, power and durability for athletes who need their training to transfer to performance.",
    mode: "In-person / Online",
    image: "/images/coach-p/athlete.jpg",
    icon: "athlete",
  },
];

export const METHOD_STEPS = [
  {
    number: "01",
    title: "Assess",
    body: "Movement, goals, history and limitations. We find out exactly what we are working with before anything is prescribed.",
  },
  {
    number: "02",
    title: "Build",
    body: "A structured plan built around the athlete — not a template. Strength, conditioning and skill in the right order.",
  },
  {
    number: "03",
    title: "Train",
    body: "Technique first, then intensity. Progressive execution with attention to the details that actually move the needle.",
  },
  {
    number: "04",
    title: "Refine",
    body: "We review form, performance and recovery, then adjust. The plan responds to the work you put in.",
  },
  {
    number: "05",
    title: "Perform",
    body: "Apply the work, hit the goal, then raise the standard. In the Factory, results become the new baseline.",
  },
];

// Non-fabricated: 20+ years is verified; the 5-phase system is descriptive.
export const METHOD_STATS = [
  { value: 20, suffix: "+", label: "Years Refining the System" },
  { value: 5, suffix: "", label: "Phases, One Standard" },
];

// "From the Work to the Stage" — coaching focuses framed from Coach P's real
// content themes. NOT fabricated client transformations; images are illustrative
// placeholders (see SOURCES.md). No invented names, quotes or numbers.
export type StoryFocus = {
  tag: string;
  title: string;
  body: string;
  workImage: string;
  stageImage: string;
};

export const STORY_FOCUS: StoryFocus[] = [
  {
    tag: "Competition Prep",
    title: "From the Work to the Stage",
    body: "Coach P preps competitors and competes himself. Prep here is a system — structured training blocks, technical refinement and the discipline to hold the standard when it counts.",
    workImage: "/images/coach-p/case-before-1.jpg",
    stageImage: "/images/coach-p/case-after-1.jpg",
  },
  {
    tag: "Technique & Form",
    title: "The Details Do the Work",
    body: "Technique and form come first in every exercise. Small corrections, repeated with intent, are what separate spinning wheels from real, transferable progress.",
    workImage: "/images/coach-p/case-before-2.jpg",
    stageImage: "/images/coach-p/case-after-1.jpg",
  },
  {
    tag: "Athlete Development",
    title: "Built, Not Rushed",
    body: "Athletes are developed through a repeatable process — assess, build, train, refine, perform. Strength that lasts is manufactured through consistent, purposeful work.",
    workImage: "/images/coach-p/case-before-1.jpg",
    stageImage: "/images/coach-p/case-before-2.jpg",
  },
];

// "The Factory Standards" — brand principles (replaces fabricated named reviews).
export type Standard = {
  number: string;
  title: string;
  body: string;
};

export const STANDARDS: Standard[] = [
  {
    number: "01",
    title: "No Shortcuts. Just the Work.",
    body: "Results are manufactured through repetition and discipline — never hacks, never hype. If you show up, the system does the rest.",
  },
  {
    number: "02",
    title: "Technique Before Intensity",
    body: "Clean execution earns the right to load. We build movement quality first, then add the weight and the speed.",
  },
  {
    number: "03",
    title: "Discipline Over Motivation",
    body: "Motivation is temporary. Standards are permanent. We build habits that keep going long after the hype wears off.",
  },
  {
    number: "04",
    title: "Stay Up.",
    body: "Consistency compounds. The athletes who keep showing up — through the flat days — are the ones who reach the stage.",
  },
  {
    number: "05",
    title: "Coach + Competitor",
    body: "Coach P doesn't just prescribe the work — he lives it. Coaching that comes from someone still under the bar hits different.",
  },
];

export type CoachingOption = {
  key: string;
  name: string;
  icon: "globe" | "users" | "factory";
  body: string;
  mode: string;
  pricing: string; // never a fabricated number
  features: { label: string; highlight?: boolean }[];
  cta: string;
  ctaHref: string;
  featured?: boolean;
  status?: string;
};

export const COACHING_OPTIONS: CoachingOption[] = [
  {
    key: "online",
    name: "Online Coaching",
    icon: "globe",
    body: "Train under Coach P from anywhere. Structured programming, technique feedback and accountability check-ins on your schedule.",
    mode: "Remote",
    pricing: "Plans on application",
    features: [
      { label: "Custom training program" },
      { label: "Technique & form feedback" },
      { label: "Regular check-ins" },
      { label: "Progress tracking" },
    ],
    cta: "Apply for Coaching",
    ctaHref: "#contact",
  },
  {
    key: "inperson",
    name: "In-Person Training",
    icon: "users",
    body: "One-to-one coaching with hands-on cueing, live technical correction and real-time intensity management.",
    mode: "In-person",
    pricing: "Rates on enquiry",
    features: [
      { label: "1:1 hands-on coaching", highlight: true },
      { label: "Live technique correction" },
      { label: "Strength & conditioning" },
      { label: "Programming built around you" },
    ],
    cta: "Book a Consultation",
    ctaHref: "#contact",
    featured: true,
  },
  {
    key: "academy",
    name: "Factory Academy",
    icon: "factory",
    body: "The digital training system — structured programs, an exercise library and coaching accountability, built to scale the Factory online.",
    mode: "Online platform",
    pricing: "Concept preview",
    status: "Coming Soon",
    features: [
      { label: "Structured program tracks" },
      { label: "Exercise & technique library" },
      { label: "Video form review" },
      { label: "Community & challenges" },
    ],
    cta: "Explore the Academy",
    ctaHref: "/academy",
  },
];

export const FAQS = [
  {
    q: "Who does Coach P work with?",
    a: "Everyday clients building strength and conditioning, athletes who need their training to transfer to performance, and competitors preparing for the stage. The system scales to your level — beginners included.",
  },
  {
    q: "Do you coach in person, online, or both?",
    a: "Both. In-person training is hands-on with live technique correction. Online coaching delivers the same structured programming and accountability remotely. The Factory Academy (coming soon) will add a full digital platform.",
  },
  {
    q: "I'm just starting out — is that okay?",
    a: "Absolutely. Every plan starts with an assessment and is built around your current level. Technique and fundamentals come first, then we progress the load and intensity as you earn it.",
  },
  {
    q: "What does competition or stage prep involve?",
    a: "Structured training blocks, technical refinement and disciplined execution over time. Prep is by application so the plan can be built around your timeline and starting point.",
  },
  {
    q: "What is the Coach P Factory Academy?",
    a: "It's a concept preview of an online coaching platform — structured program tracks, an exercise library, form review and accountability. It is not yet open; the Academy pages show how it would work.",
  },
  {
    q: "How do I get started?",
    a: "Reach out through Instagram (@coachp_factory) to talk through your goals. From there we assess, build your plan, and get to work.",
  },
];

export const FOOTER_LINKS = [
  { label: "The Coach", href: "#about" },
  { label: "Coaching", href: "#coaching" },
  { label: "The Method", href: "#method" },
  { label: "Academy", href: "/academy" },
  { label: "FAQ", href: "#faq" },
  { label: "Contact", href: "#contact" },
];
