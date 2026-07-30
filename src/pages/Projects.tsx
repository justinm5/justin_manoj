import { PageLayout } from "@/components/PageLayout";
import { Section } from "@/components/Section";
import { ProjectCard } from "@/components/ProjectCard";

const Projects = () => {
  return (
    <PageLayout>
      <Section id="projects" title="Projects">
        <div className="columns-1 gap-5 md:columns-2">
          <div className="mb-5 break-inside-avoid">
            <ProjectCard
              year="2026"
              title="Quantitative Signal Agent"
              timeAgo="Jun 2026"
              description="Shipped a real-time algorithmic-research platform that ingests SEC Form 4 insider filings, live price feeds, and financial-news streams into a microservices pipeline. Built a Go ingestion gateway with gRPC and Kafka, stored time-series signals in TimescaleDB, cached hot anomalies in Redis, and trained a Python agent that flags filing/price divergences. React dashboard surfaces backtested paper-trading signals and portfolio analytics. Ingests <strong>10,000+</strong> market events/day with <strong>p99</strong> ingestion latency under <strong>50ms</strong>."
              tags={["Go", "gRPC", "Kafka", "TimescaleDB", "Redis", "Python", "React"]}
            />
          </div>

          <div className="mb-5 break-inside-avoid">
            <ProjectCard
              year="2026"
              title="UMass Dining Engine"
              timeAgo="Jan 2026"
              liveLink="https://github.com/JManoj01/UMassDining"
              description="Shipped an AI meal-planning recommendation platform for <strong>30,000+</strong> UMass students that aggregates live menus from <strong>4</strong> dining halls, normalizes dietary/allergen data, and serves real-time filters through a Redis-backed Spring Boot API with PostgreSQL full-text search. Scheduled Python ETL ingests nutrition data; the React frontend supports instant menu queries and personalized meal plans. Pending adoption into official UMass Dining App."
              tags={["Java", "Spring Boot", "React", "PostgreSQL", "Python", "Redis"]}
            />
          </div>

          <div className="mb-5 break-inside-avoid">
            <ProjectCard
              year="2025"
              title="Poker IQ Trainer"
              timeAgo="Apr 2025"
              description="Engineered a Texas Hold'em training suite with configurable Beginner/Expert AI opponents. Compiled a Monte Carlo simulation engine to WebAssembly for fast, browser-side equity and pot-odds calculations. Built a React UI for real-time EV visualization, opponent modeling, and indexed hand-history review."
              tags={["TypeScript", "React", "WebAssembly", "Node.js"]}
            />
          </div>
        </div>
      </Section>

    </PageLayout>
  );
};

export default Projects;
