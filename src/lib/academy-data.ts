// Coach P Factory Academy — CONCEPT data.
// Everything here is demonstration-only static content for a concept preview.
// There is no real platform, accounts, payments, or data persistence.

export const ACADEMY = {
  name: "Coach P Factory Academy",
  status: "Concept Preview · Coming Soon",
  tagline: "The Factory, Online.",
  value:
    "Train under Coach P from anywhere — structured programs, an exercise library, form review and real accountability, built to keep athletes on standard.",
};

export type AcademyFeature = {
  title: string;
  body: string;
  icon:
    | "program"
    | "library"
    | "calendar"
    | "video"
    | "chart"
    | "benchmark"
    | "live"
    | "check"
    | "community"
    | "download"
    | "mobility";
};

export const ACADEMY_FEATURES: AcademyFeature[] = [
  {
    title: "Structured Programs",
    body: "Progressive training blocks built around your track and level — never a random workout of the day.",
    icon: "program",
  },
  {
    title: "Exercise Library",
    body: "Demonstrations and technique breakdowns for every movement, filmed with Coach P's coaching cues.",
    icon: "library",
  },
  {
    title: "Video Form Review",
    body: "Upload your lifts and get technical feedback — the online version of hands-on correction.",
    icon: "video",
  },
  {
    title: "Progress Tracking",
    body: "Log sessions, track strength benchmarks and watch consistency compound week over week.",
    icon: "chart",
  },
  {
    title: "Live Coaching Sessions",
    body: "Scheduled virtual sessions and Q&As to keep you connected to the coach and the community.",
    icon: "live",
  },
  {
    title: "Community & Challenges",
    body: "Train alongside other Factory athletes with shared challenges and accountability.",
    icon: "community",
  },
];

export type ProgramTrack = {
  code: string;
  name: string;
  focus: string;
  body: string;
  points: string[];
};

export const PROGRAM_TRACKS: ProgramTrack[] = [
  {
    code: "T-01",
    name: "Foundations",
    focus: "Movement · Fundamentals · Consistency",
    body: "The on-ramp. Build clean movement patterns, training literacy and the habit of showing up.",
    points: ["Movement quality", "Training fundamentals", "Habit & consistency"],
  },
  {
    code: "T-02",
    name: "Strength Lab",
    focus: "Progressive Strength · Muscle",
    body: "Structured strength and muscle development built on real numbers and technical execution.",
    points: ["Progressive overload", "Technical lifting", "Strength benchmarks"],
  },
  {
    code: "T-03",
    name: "Athlete Performance",
    focus: "Speed · Agility · Conditioning",
    body: "Athletic qualities that transfer — power, change of direction and work capacity.",
    points: ["Speed & agility", "Conditioning", "Power development"],
  },
  {
    code: "T-04",
    name: "Fighter's Foundation",
    focus: "Martial-Arts-Rooted Conditioning",
    body: "Coach P's martial-arts background applied to movement, mobility and conditioning for combat athletes.",
    points: ["Mobility & control", "Conditioning", "Discipline & structure"],
  },
  {
    code: "T-05",
    name: "Stage Ready",
    focus: "Physique · Competition Discipline",
    body: "Structured physique preparation and the disciplined execution it takes to be stage ready.",
    points: ["Structured prep blocks", "Execution & discipline", "Peak-week structure"],
  },
];

// ---- Dashboard mockup (demo data) ----

export const DASHBOARD = {
  athlete: "Demo Athlete",
  program: "Strength Lab",
  phase: "Build Phase",
  week: 4,
  totalWeeks: 12,
  weekProgress: 68, // %
  streak: 5,
  coachMessage: {
    from: "Coach P",
    text: "Bar speed looked sharp on last week's pulls. Add 5kg to your top set today and keep the brace tight off the floor. Stay up.",
  },
  today: {
    title: "Lower · Strength",
    est: "55 min",
    exercises: [
      { name: "Back Squat", scheme: "5 × 3 @ RPE 8", done: true },
      { name: "Romanian Deadlift", scheme: "3 × 8", done: true },
      { name: "Walking Lunge", scheme: "3 × 10 / leg", done: false },
      { name: "Hanging Leg Raise", scheme: "3 × 12", done: false },
    ],
  },
  lesson: {
    title: "Deadlift: Bracing & the Set-Up",
    length: "6:24",
    tag: "Technique",
  },
  live: {
    title: "Live Q&A — Peaking Strength",
    when: "Thu · 7:00 PM",
  },
  consistency: [
    { d: "M", v: 100 },
    { d: "T", v: 80 },
    { d: "W", v: 100 },
    { d: "T", v: 0 },
    { d: "F", v: 90 },
    { d: "S", v: 60 },
    { d: "S", v: 0 },
  ],
  benchmark: {
    lift: "Back Squat 1RM",
    value: "150 kg",
    delta: "+12.5 kg / 12 wks",
  },
};

export const SAMPLE_WEEK = [
  { day: "Mon", focus: "Lower · Strength", tag: "Strength", rest: false },
  { day: "Tue", focus: "Upper · Push/Pull", tag: "Strength", rest: false },
  { day: "Wed", focus: "Conditioning · Intervals", tag: "Conditioning", rest: false },
  { day: "Thu", focus: "Mobility · Recovery", tag: "Recovery", rest: true },
  { day: "Fri", focus: "Lower · Power", tag: "Power", rest: false },
  { day: "Sat", focus: "Upper · Hypertrophy", tag: "Muscle", rest: false },
  { day: "Sun", focus: "Rest · Walk", tag: "Rest", rest: true },
];

export const WHO_ITS_FOR = [
  {
    title: "The Committed Beginner",
    body: "You're ready to train properly and want structure, technique and a coach who holds a standard.",
  },
  {
    title: "The Busy Lifter",
    body: "You've trained before but need programming and accountability that fit around a full schedule.",
  },
  {
    title: "The Athlete",
    body: "You need your training to transfer — strength, speed and conditioning that show up in performance.",
  },
  {
    title: "The Competitor",
    body: "You're chasing the stage and want disciplined, structured preparation with real feedback.",
  },
];

export const ENROLLMENT_STEPS = [
  {
    number: "01",
    title: "Join the Waitlist",
    body: "Register interest and tell us your goals and training background.",
  },
  {
    number: "02",
    title: "Get Matched to a Track",
    body: "We point you to the track that fits your level — Foundations through Stage Ready.",
  },
  {
    number: "03",
    title: "Train the System",
    body: "Follow structured programming, submit form reviews and log your work.",
  },
  {
    number: "04",
    title: "Stay Accountable",
    body: "Check-ins, live sessions and community keep you on standard, week after week.",
  },
];

export const ACADEMY_FAQ = [
  {
    q: "Is the Academy available now?",
    a: "Not yet. This is a concept preview showing how the Coach P Factory Academy would work. Everything shown here — dashboard, programs and data — is demonstration only.",
  },
  {
    q: "How is it different from online coaching?",
    a: "One-to-one online coaching is fully bespoke. The Academy is a structured platform — program tracks, an exercise library, form review and community — designed to bring Coach P's system to more athletes at once.",
  },
  {
    q: "Do I need a full gym?",
    a: "Tracks would be built with equipment options in mind. Foundations and conditioning work adapt to minimal setups; Strength Lab and Stage Ready assume gym access.",
  },
  {
    q: "Will there be form feedback?",
    a: "Yes — video form review is core to the concept. It's how hands-on technical correction translates to an online format.",
  },
  {
    q: "How would I enrol?",
    a: "Through a waitlist at launch. For now, follow @coachp_factory on Instagram to hear when the Academy opens.",
  },
];
