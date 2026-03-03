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
              title="UMass Dining Engine"
              timeAgo="Jan 2026"
              liveLink="https://github.com/JManoj01/UMassDining"
              description="Built an AI meal-planning recommendation platform for <strong>30,000+</strong> students that aggregates live menus from <strong>4</strong> dining halls with real-time dietary filtering. Pending adoption into official UMass Dining App."
              tags={["Java", "Spring Boot", "React", "PostgreSQL", "Python", "Redis"]}
            />
          </div>

          <div className="mb-5 break-inside-avoid">
            <ProjectCard
              year="2025"
              title="Poker IQ Trainer"
              timeAgo="Apr 2025"
              description="Built a Texas Hold'em trainer with Beginner/Expert AI opponents using Monte Carlo simulations and WebAssembly for real-time pot-odds and EV training."
              tags={["TypeScript", "React", "WebAssembly", "Node.js"]}
            />
          </div>

          <div className="mb-5 break-inside-avoid">
            <ProjectCard
              year="2025"
              title="Medical Insight Bot"
              timeAgo="Jan 2025"
              liveLink="https://github.com/JManoj01/symptom-bot"
              description="Built a RAG-based symptom analysis assistant with FastAPI and pgvector that returns ranked diagnoses with confidence scores across clinical test cases."
              tags={["Python", "FastAPI", "React", "PostgreSQL", "Gemini API", "OpenAI API", "pgvector"]}
            />
          </div>

          <div className="mb-5 break-inside-avoid">
            <ProjectCard
              year="2025"
              title="Subscription Tracker"
              description="Built a subscription manager using Javalin and PostgreSQL that tracks recurring costs, aggregates monthly and yearly totals, and alerts users before free-trial expiration."
              tags={["Java", "Javalin", "PostgreSQL", "JavaScript"]}
            />
          </div>
        </div>
      </Section>

    </PageLayout>
  );
};

export default Projects;
