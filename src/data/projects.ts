export type Project = {
  id: string;
  title: string;
  year: string;
  period: string;
  category: string;
  summary: string;
  tags: string[];
  link?: string;
};

export const projects: Project[] = [
  {
    id: "quantitative-signal-agent",
    title: "Quantitative Signal Agent",
    year: "2026",
    period: "Jun 2026",
    category: "Quantitative Research + Microservices",
    summary:
      "Real-time algorithmic-research platform that ingests SEC Form 4 insider filings, live price feeds, and financial-news streams into a microservices pipeline. Go ingestion gateway with gRPC and Kafka, time-series signals in TimescaleDB, hot anomalies cached in Redis, and a Python agent that flags filing/price divergences. Ingests 10,000+ market events/day with p99 ingestion latency under 50ms.",
    tags: ["Go", "gRPC", "Kafka", "TimescaleDB", "Redis", "Python", "React"],
  },
  {
    id: "umass-dining-engine",
    title: "UMass Dining Engine",
    year: "2026",
    period: "Jan 2026",
    category: "AI + Full-Stack",
    summary:
      "AI meal-planning recommendation platform for 30,000+ UMass students. Aggregates live menus from 4 dining halls, normalizes dietary and allergen data, and serves real-time filters through a Redis-backed Spring Boot API with PostgreSQL full-text search. Scheduled Python ETL ingests nutrition data; the React frontend supports instant menu queries and personalized meal plans.",
    tags: ["Java", "Spring Boot", "React", "PostgreSQL", "Redis", "Python"],
    link: "https://github.com/JManoj01/UMassDining",
  },
  {
    id: "poker-iq-trainer",
    title: "Poker IQ Trainer",
    year: "2025",
    period: "Apr 2025",
    category: "Systems + Simulation",
    summary:
      "Texas Hold'em training suite with configurable Beginner and Expert AI opponents. Monte Carlo simulation engine compiled to WebAssembly for fast, browser-side equity and pot-odds calculations. React UI for real-time EV visualization, opponent modeling, and indexed hand-history review.",
    tags: ["TypeScript", "React", "WebAssembly", "Node.js"],
  },
];
