/**
 * Single source of truth for site content.
 * Edit the arrays below — every page and the Ask chatbot read from here.
 */

export type ExperienceEntry = {
  company: string;
  /** Format: "Title · Type · Year" — e.g. "Software Engineer · Co-op · 2026". */
  role: string;
  location: string;
  description: string;
  /**
   * Preferred: a square logo in `public/logos/`, e.g. "/logos/dell.jpeg".
   * Falls back to `domain` (Clearbit), then to the company initial.
   */
  logo?: string;
  domain?: string;
};

export type EducationEntry = {
  school: string;
  degree: string;
  location: string;
  coursework: string;
  /** Preferred: a square logo in `public/logos/`. Falls back to `domain`. */
  logo?: string;
  domain?: string;
};

export type ProjectMedia = {
  /**
   * Path under `public/`, e.g. "/demos/quant-agent.mp4".
   * `.mp4` and `.webm` play on hover; `.gif`, `.png`, `.jpg`, and `.webp`
   * render as a still that zooms slightly on hover.
   */
  src: string;
  /** Still frame shown before a video starts playing. Recommended for video. */
  poster?: string;
  /** Describe the demo for screen readers. Leave unset for pure decoration. */
  alt?: string;
};

export type ProjectEntry = {
  title: string;
  href?: string;
  description: string;
  /** Omit until you have a demo — the card renders an empty frame instead. */
  media?: ProjectMedia;
};

export type BookEntry = {
  title: string;
  author: string;
  /** One line on what the book is actually about. Shown under the cover. */
  note: string;
  /** Short category chip, e.g. "systems". */
  tag: string;
};

export type AskPart =
  | { type: "text"; value: string }
  | { type: "link"; label: string; href: string }
  | { type: "logo"; domain: string; alt?: string };

export type AskLine = {
  parts: AskPart[];
  variant?: "footer";
};

export type AskSection = {
  title: string;
  lines: AskLine[];
};

export const displayName = "Justin Manoj";

export const experience: ExperienceEntry[] = [
  {
    company: "IBM",
    role: "Incoming Software Developer · Co-op · Fall 2026",
    location: "Lowell, MA",
    description:
      "Incoming Fall 2026",
    logo: "/ibm-com-logo.png",
    domain: "ibm.com",
  },
  {
    company: "Dell Technologies",
    role: "Software Engineer Intern · Internship · Summer 2026",
    location: "Hopkinton, MA",
    description:
      "Owned end-to-end design and deployment of a Go-based Kubernetes operator that automated audit logging across production RKE2 clusters. Integrated Syslog and OpenTelemetry Collector pipelines for real-time security monitoring and shipped 20+ GitOps-managed releases.",
    logo: "/dell-logo.jpg",
    domain: "dell.com",
  },
  {
    company: "GBCS Group",
    role: "Software Engineer Intern · Internship · 2025",
    location: "New York, NY",
    description:
      "Migrated 8 REST endpoints to a GraphQL API with DataLoader batching, reducing database queries and response payloads. Cut high-traffic query latency by 65% using PostgreSQL composite indexes and Redis caching, and built a GitHub Actions CI/CD pipeline with Jest and Sentry.",
    logo: "/gbcs-group.jpg",
    domain: "gbcsgroup.com",
  },
  {
    company: "University of Massachusetts Amherst",
    role: "Research Assistant · 2024",
    location: "Amherst, MA",
    description:
      "Stress-tested 7 multi-agent LLM frameworks across 10,000+ simulations, built an automated Ray and Pandas pipeline that classifies agent failures and surfaces recurring patterns, and defined reliability metrics used to benchmark framework behavior at scale.",
    logo: "/manning-logo-2.jpg",
    domain: "umass.edu",
  },
];

export const education: EducationEntry[] = [
  {
    school: "University of Massachusetts Amherst",
    degree: "B.S. in Computer Science & Mathematics · 2023 – 2027",
    location: "Amherst, MA",
    coursework:
      "Relevant Coursework: Data Structures, Algorithms, Computer Systems, Distributed Systems, Machine Learning, Web Programming, Computer Networks and Security",
    logo: "/manning-logo.jpg",
    domain: "umass.edu",
  },
];

export const projects: ProjectEntry[] = [
  {
    title: "Personal Website",
    description:
      "The portfolio you're currently on — built with React and Vite.",
  },
  {
    title: "SignalAgent",
    description:
      "Real-time quantitative pipeline ingesting filings, prices, and news with Go, gRPC, Kafka, TimescaleDB, Redis, and Python.",
  },
  {
    title: "NutriPlan",
    description:
      "AI meal planner aggregating dining-hall menus via Spring Boot, Python ETL, and React.",
  },
  {
    title: "PokerIQ",
    description:
      "Texas Hold'em trainer with AI opponents, a WASM Monte Carlo engine, and a React UI.",
  },
];

export const books: BookEntry[] = [
  {
    title: "Atomic Habits",
    author: "James Clear",
    tag: "habits",
    note: "Systems over goals, and the compounding math of small changes.",
  },
  {
    title: "Deep Work",
    author: "Cal Newport",
    tag: "productivity",
    note: "Rules for focused work in a distracted world.",
  },
  {
    title: "Outliers",
    author: "Malcolm Gladwell",
    tag: "success",
    note: "The timing, practice, and context hidden behind outlier success.",
  },
  {
    title: "Never Split the Difference",
    author: "Chris Voss",
    tag: "negotiation",
    note: "Tactical empathy and calibrated questions for high-stakes conversations.",
  },
  {
    title: "The Outsiders",
    author: "William N. Thorndike",
    tag: "business",
    note: "Eight CEOs and the unconventional paths to exceptional returns.",
  },
  {
    title: "Sapiens",
    author: "Yuval Noah Harari",
    tag: "history",
    note: "A long view of how shared fictions let humans cooperate at scale.",
  },
  {
    title: "Zero to One",
    author: "Peter Thiel",
    tag: "startups",
    note: "Building companies that create something new instead of competing.",
  },
  {
    title: "Competition Demystified",
    author: "Bruce Greenwald",
    tag: "strategy",
    note: "Moats, entry barriers, and what actually protects a business's profits.",
  },
  {
    title: "Ultralearning",
    author: "Scott Young",
    tag: "learning",
    note: "A practical system for teaching yourself hard skills quickly.",
  },
  {
    title: "The Personal MBA",
    author: "Josh Kaufman",
    tag: "business",
    note: "A broad, no-MBA-required introduction to how business works.",
  },
  {
    title: "The Prince",
    author: "Niccolò Machiavelli",
    tag: "strategy",
    note: "The classic, unsentimental guide to power, politics, and leadership.",
  },
  {
    title: "Thinking, Fast and Slow",
    author: "Daniel Kahneman",
    tag: "psychology",
    note: "The two systems behind human judgment, and how each one fails.",
  },
  {
    title: "Shoe Dog",
    author: "Phil Knight",
    tag: "memoir",
    note: "Nike's first two decades told as an operating story, not a highlight reel.",
  },
  {
    title: "The Last Lecture",
    author: "Randy Pausch",
    tag: "memoir",
    note: "A professor's final talk on childhood dreams and what really matters.",
  },
  {
    title: "Influence: The Psychology of Persuasion",
    author: "Robert B. Cialdini",
    tag: "psychology",
    note: "Why people say yes and the six shortcuts behind persuasion.",
  },
  {
    title: "The Status Game",
    author: "Will Storr",
    tag: "psychology",
    note: "How humans compete for status and why that shapes almost everything.",
  },
  {
    title: "Poor Charlie's Almanack",
    author: "Charlie Munger",
    tag: "wisdom",
    note: "Mental models, inversion, and multidisciplinary thinking.",
  },
];

export const socials = [
  { label: "GitHub", href: "https://github.com/justinm5", icon: "github" },
  {
    label: "LinkedIn",
    href: "https://linkedin.com/in/justinmmanoj",
    icon: "linkedin",
  },
  { label: "Email", href: "mailto:justinmmanoj@gmail.com", icon: "email" },
  { label: "Resume", href: "/resume.pdf", icon: "resume" },
] as const;

/** Footer icon row. */
export const footerSocials = [
  { label: "Email", href: "mailto:justinmmanoj@gmail.com", icon: "email" },
  { label: "LinkedIn", href: "https://linkedin.com/in/justinmmanoj", icon: "linkedin" },
  { label: "GitHub", href: "https://github.com/justinm5", icon: "github" },
];

export const askUi = {
  greeting: "hi i'm",
  windowTitle: "ask a context-aware llm about me",
  inputPlaceholder: 'e.g. "summarize your experience in 3 sentences"',
  sections: [
    {
      title: "experience:",
      lines: [
        {
          parts: [
            { type: "text", value: "studying " },
            {
              type: "link",
              label: "computer science & mathematics",
              href: "https://www.cics.umass.edu/",
            },
            { type: "text", value: " @ " },
            { type: "link", label: "umass amherst", href: "https://www.umass.edu/" },
            { type: "text", value: " (2023–2027)" },
          ],
        },
        {
          parts: [
            { type: "text", value: "swe co-op @ " },
            { type: "logo", domain: "ibm.com" },
            { type: "link", label: "ibm", href: "https://www.ibm.com/" },
            { type: "text", value: " (fall 2026)" },
          ],
        },
        {
          parts: [
            { type: "text", value: "swe intern @ " },
            { type: "logo", domain: "dell.com" },
            { type: "link", label: "dell", href: "https://www.dell.com/" },
            { type: "text", value: " (platform infra); swe intern @ " },
            { type: "logo", domain: "gbcsgroup.com" },
            { type: "text", value: " gbcs group; research @ " },
            { type: "logo", domain: "umass.edu" },
            { type: "text", value: " umass autonomous learning lab" },
          ],
        },
      ],
    },
    {
      title: "more about me:",
      lines: [
        {
          parts: [
            { type: "text", value: "shipped " },
            { type: "link", label: "signalaent", href: "/projects" },
            { type: "text", value: ", " },
            { type: "link", label: "nutriplan", href: "/projects" },
            { type: "text", value: ", " },
            { type: "link", label: "pokeriq", href: "/projects" },
            { type: "text", value: ", and this site — ask me about any of them." },
          ],
        },
        {
          parts: [
            { type: "text", value: "also: backend systems nerd, reader, and lifter." },
          ],
        },
        {
          variant: "footer",
          parts: [
            { type: "text", value: "have a question? " },
            {
              type: "link",
              label: "email me",
              href: "mailto:justinmmanoj@gmail.com",
            },
            { type: "text", value: " or " },
            {
              type: "link",
              label: "linkedin",
              href: "https://linkedin.com/in/justinmmanoj",
            },
            { type: "text", value: "." },
          ],
        },
      ],
    },
  ] as AskSection[],
};

/**
 * Facts the Ask chatbot is allowed to draw from. Keep it factual — the model is
 * instructed never to invent anything outside this block.
 */
export const systemContext = `Facts to draw from (answer as I/me/my):

- Education: B.S. Computer Science & Mathematics at UMass Amherst, 2023–2027.
- Focus: backend systems, data pipelines, and quantitative engineering — production work where latency and correctness both matter.
- Core qualities: persistence, systems thinking, and a bias toward shipping.

Experience:
- IBM (Incoming Software Developer, co-op, Fall 2026, Lowell, MA): upcoming co-op on cloud platform / Kubernetes microservices.
- Dell Technologies (Software Engineer Intern, May 2026 – August 2026, Hopkinton, MA): owned end-to-end design and deployment of a Go-based Kubernetes operator that automated audit logging across production RKE2 clusters; integrated Syslog and OpenTelemetry Collector pipelines to stream compliance events into a distributed observability platform for real-time security monitoring; shipped 20+ GitOps-managed releases across production clusters, including platform features, critical bug fixes, and CVE remediations.
- GBCS Group (Software Engineer Intern, March 2025 – September 2025, New York, NY): migrated 8 REST endpoints to a GraphQL API with DataLoader batching, reducing database queries and response payloads for internal services; cut high-traffic query latency by 65% using PostgreSQL composite indexes and Redis caching; built a GitHub Actions CI/CD pipeline with Jest and Sentry, reducing production bug reports per sprint.
- UMass Amherst Autonomous Learning Lab (Research Assistant, November 2024 – April 2025, Amherst, MA): stress-tested 7 multi-agent LLM frameworks across 10,000+ simulation runs, uncovering failure patterns and benchmarking agent reliability; accelerated log analysis with Ray and Pandas, building an automated pipeline that classifies agent failures and surfaces recurring patterns; defined and tracked reliability metrics for multi-agent LLM systems, producing benchmark results used to compare framework behavior at scale.

Projects:
- Personal Website: the portfolio you are on — built with React and Vite.
- SignalAgent: real-time quantitative pipeline ingesting filings, prices, and news with Go, gRPC, Kafka, TimescaleDB, Redis, and Python.
- NutriPlan (Java, Spring Boot, Python, PostgreSQL, React, Redis): built a prototype AI meal planning app for UMass Dining, aggregating live menus from 4 dining halls with real-time dietary filters and LLM-generated meal suggestions; designed a Spring Boot REST API with Redis caching, PostgreSQL, and a Python scraping pipeline for live menu accuracy, pending adoption into the official UMass Dining App.
- PokerIQ (Python, Go, React, PostgreSQL, Redis): built a poker decision-training tool that runs Monte Carlo simulations across 30,000+ generated spots to score user actions and identify strategic leaks; designed a Redis-backed adaptive quiz pipeline that tracks user error patterns and personalizes drills to maximize improvement in high-EV decision categories.

Relevant coursework: Data Structures, Algorithms, Computer Systems, Distributed Systems, Machine Learning, Web Programming, Computer Networks and Security.
- Languages and tools: Go, Python, Java, TypeScript, React, Node.js, Docker, Kubernetes, PostgreSQL, Redis, Kafka, gRPC, GraphQL, Git.

Books I have read and my notes:
- Atomic Habits (James Clear): Systems over goals, and the compounding math of small changes.
- Deep Work (Cal Newport): Rules for focused work in a distracted world.
- Outliers (Malcolm Gladwell): The timing, practice, and context hidden behind outlier success.
- Never Split the Difference (Chris Voss): Tactical empathy and calibrated questions for high-stakes conversations.
- The Outsiders (William N. Thorndike): Eight CEOs and the unconventional paths to exceptional returns.
- Sapiens (Yuval Noah Harari): A long view of how shared fictions let humans cooperate at scale.
- Zero to One (Peter Thiel): Building companies that create something new instead of competing.
- Competition Demystified (Bruce Greenwald): Moats, entry barriers, and what actually protects a business's profits.
- Ultralearning (Scott Young): A practical system for teaching yourself hard skills quickly.
- The Personal MBA (Josh Kaufman): A broad, no-MBA-required introduction to how business works.
- The Prince (Niccolò Machiavelli): The classic, unsentimental guide to power, politics, and leadership.
- Thinking, Fast and Slow (Daniel Kahneman): The two systems behind human judgment, and how each one fails.
- Shoe Dog (Phil Knight): Nike's first two decades told as an operating story, not a highlight reel.
- The Last Lecture (Randy Pausch): A professor's final talk on childhood dreams and what really matters.
- Influence: The Psychology of Persuasion (Robert B. Cialdini): Why people say yes and the six shortcuts behind persuasion.
- The Status Game (Will Storr): How humans compete for status and why that shapes almost everything.
- Poor Charlie's Almanack (Charlie Munger): Mental models, inversion, and multidisciplinary thinking.

Contact (share when relevant): GitHub https://github.com/justinm5, LinkedIn https://linkedin.com/in/justinmmanoj, email justinmmanoj@gmail.com.

If they ask for something not in this list: say you do not have it here and offer email or LinkedIn. Do not invent facts.`;
