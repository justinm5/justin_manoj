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
    role: "Software Developer · Co-op · 2026",
    location: "Lowell, MA",
    description:
      "",
    logo: "/ibm-com-logo.png",
    domain: "ibm.com",
  },
  {
    company: "Dell Technologies",
    role: "Software Engineer Intern · Internship · 2026",
    location: "Hopkinton, MA",
    description:
      "Shipped a Go Kubernetes operator to automate audit logging and OpenTelemetry across production RKE2 clusters, plus GitOps-managed platform features and CVE remediation.",
    logo: "/dell-logo.jpg",
    domain: "dell.com",
  },
  {
    company: "GBCS Group",
    role: "Software Engineer Intern · Internship · 2025",
    location: "",
    description:
      "Rebuilt core APIs with GraphQL, PostgreSQL indexes, and Redis caching, cutting dashboard load times by 65%. Built GitHub Actions CI/CD for automated testing and deployment.",
    logo: "/gbcs-com-logo.png",
    domain: "gbcsgroup.com",
  },
  {
    company: "University of Massachusetts Amherst",
    role: "Undergraduate Research Assistant · 2024",
    location: "Amherst, MA",
    description:
      "UMass Autonomous Learning Lab. Stress-tested multi-agent LLM systems across 10k+ simulations, surfacing 14 failure modes and automating the failure-classification pipeline for 3x faster analysis.",
    logo: "/manning-logo.jpg",
    domain: "umass.edu",
  },
  {
    company: "BUILD UMass",
    role: "Software Engineer · 2024",
    location: "Amherst, MA",
    description:
      "Optimized a campus events platform with Elasticsearch search and Redis Pub/Sub real-time updates for UMass students.",
    logo: "/build-logo.png",
  },
];

export const projects: ProjectEntry[] = [
  {
    title: "Personal Website",
    href: "https://github.com/justinm5/justin_manoj",
    description:
      "The portfolio you're on right now — a React + Vite site backed by Vercel serverless functions for the Spotify widget and Ask chatbot.",
  },
  {
    title: "Quantitative Signal Agent",
    description:
      "Real-time pipeline that ingests SEC filings, price feeds, and news into a microservices architecture. Go ingestion over gRPC and Kafka, time-series storage in TimescaleDB, Redis caching, and Python anomaly detection.",
  },
  {
    title: "UMass Dining Engine",
    description:
      "AI meal-planning platform that aggregates live dining-hall menus, normalizes dietary data, and serves real-time filters through a Spring Boot API with a Python ETL layer and React frontend.",
  },
  {
    title: "Poker IQ Trainer",
    description:
      "Texas Hold'em trainer with configurable AI opponents and a Monte Carlo simulation engine compiled to WebAssembly, plus a React UI for EV visualization and hand-history review.",
  },
];

export const books: BookEntry[] = [
  {
    title: "Designing Data-Intensive Applications",
    author: "Martin Kleppmann",
    tag: "systems",
    note: "Replication, partitioning, and consensus explained from first principles.",
  },
  {
    title: "The Pragmatic Programmer",
    author: "Andrew Hunt & David Thomas",
    tag: "craft",
    note: "Habits and heuristics that hold up across every codebase.",
  },
  {
    title: "Clean Code",
    author: "Robert C. Martin",
    tag: "craft",
    note: "Naming, function design, and the real cost of letting code rot.",
  },
  {
    title: "Thinking, Fast and Slow",
    author: "Daniel Kahneman",
    tag: "psychology",
    note: "The two systems behind human judgment, and how each one fails.",
  },
  {
    title: "The Almanack of Naval Ravikant",
    author: "Eric Jorgenson",
    tag: "essays",
    note: "Collected notes on leverage, judgment, and specific knowledge.",
  },
  {
    title: "The Man Who Solved the Market",
    author: "Gregory Zuckerman",
    tag: "quant",
    note: "How Renaissance Technologies turned statistics into a durable edge.",
  },
  {
    title: "Shoe Dog",
    author: "Phil Knight",
    tag: "memoir",
    note: "Nike's first two decades told as an operating story, not a highlight reel.",
  },
  {
    title: "Outliers",
    author: "Malcolm Gladwell",
    tag: "psychology",
    note: "The timing, practice, and context hidden behind outlier success.",
  },
  {
    title: "Sapiens",
    author: "Yuval Noah Harari",
    tag: "history",
    note: "A long view of how shared fictions let humans cooperate at scale.",
  },
  {
    title: "Atomic Habits",
    author: "James Clear",
    tag: "habits",
    note: "Systems over goals, and the compounding math of small changes.",
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
            { type: "link", label: "quantitative signal agent", href: "/projects" },
            { type: "text", value: " (" },
            { type: "link", label: "ask me about this!", href: "/projects" },
            { type: "text", value: "), " },
            {
              type: "link",
              label: "umass dining engine",
              href: "https://github.com/JManoj01/UMassDining",
            },
            { type: "text", value: ", " },
            { type: "link", label: "poker iq trainer", href: "/projects" },
            { type: "text", value: ", and more on " },
            { type: "link", label: "projects", href: "/projects" },
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

- School: B.S. Computer Science & Mathematics at UMass Amherst, class of 2027.
- Focus: backend systems, data pipelines, and quantitative engineering — production work where latency and correctness both matter.
- Core qualities: persistence, systems thinking, and a bias toward shipping.
- IBM (software developer, co-op, 2026): joining the cloud platform organization to work on Kubernetes microservices.
- Dell Technologies (SWE intern, Summer 2026): built a Go Kubernetes operator automating audit logging and OpenTelemetry across production RKE2 clusters; GitOps-managed platform features and CVE remediation.
- GBCS Group (SWE intern, 2025): rebuilt core APIs with GraphQL, PostgreSQL indexes, and Redis caching, cutting dashboard load times 65%; built GitHub Actions CI/CD.
- UMass Autonomous Learning Lab (undergrad research assistant, 2024-2025): stress-tested multi-agent LLM systems across 10k+ simulations, surfaced 14 failure modes, automated failure classification for 3x faster analysis.
- BUILD UMass (software engineer, 2024-present): optimized a campus events platform with Elasticsearch search and Redis Pub/Sub real-time updates.
- Relevant coursework: algorithms, data structures, operating systems, machine learning, databases, scalable web systems, data science.
- Languages and tools: Go, Python, Java, TypeScript, React, Node.js, Docker, Kubernetes, PostgreSQL, Redis, Kafka, gRPC, Git.

Projects:
- Quantitative Signal Agent: real-time pipeline ingesting SEC filings, price feeds, and news; Go ingestion over gRPC and Kafka, TimescaleDB time-series, Redis caching, Python anomaly detection.
- UMass Dining Engine: AI meal-planning platform aggregating live dining-hall menus with a Spring Boot API, Python ETL, and React frontend — https://github.com/JManoj01/UMassDining
- Poker IQ Trainer: Texas Hold'em trainer with configurable AI opponents and a Monte Carlo engine compiled to WebAssembly, React UI for EV visualization.

Books I have read: Designing Data-Intensive Applications (Kleppmann), The Pragmatic Programmer (Hunt & Thomas), Clean Code (Robert C. Martin), Thinking Fast and Slow (Kahneman), The Almanack of Naval Ravikant (Jorgenson), The Man Who Solved the Market (Zuckerman), Shoe Dog (Phil Knight), Outliers (Gladwell), Sapiens (Harari), Atomic Habits (James Clear).

Contact (share when relevant): GitHub https://github.com/justinm5, LinkedIn https://linkedin.com/in/justinmmanoj, email justinmmanoj@gmail.com.

If they ask for something not in this list: say you do not have it here and offer email or LinkedIn. Do not invent facts.`;
