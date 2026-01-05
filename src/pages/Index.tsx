import { Navigation } from "@/components/Navigation";
import { Hero } from "@/components/Hero";
import { Section } from "@/components/Section";
import { SkillsSection } from "@/components/SkillsSection";
import { ProjectCard } from "@/components/ProjectCard";
import { ExperienceCard } from "@/components/ExperienceCard";
import { ContactForm } from "@/components/ContactForm";
import { GitHubContributions } from "@/components/GitHubContributions";
import { Button } from "@/components/ui/button";
import { Github, Linkedin, FileText } from "lucide-react";
import { ScrollProgress } from "@/components/ScrollProgress";
import { AnimatedGradient } from "@/components/AnimatedGradient";
import { ScrollReveal } from "@/components/ScrollReveal";

const Index = () => {
  return (
    <div className="min-h-screen bg-background relative">
      <AnimatedGradient />
      <ScrollProgress />
      <Navigation />
      <div id="home" className="relative z-10 max-w-4xl mx-auto px-6 py-8 md:py-12">
        <Hero
          name="Justin Manoj"
          title="CS & Math @ UMass Amherst"
          description="👋 Hi, I'm Justin! I'm an undergraduate student at the University of Massachusetts-Amherst pursuing a B.S in Computer Science and Mathematics, seeking new opportunities to learn and expand my abilities as an engineer. I'm interested in full-stack development, machine learning, and data science, and I love to innovate and solve problems. Browse through my site to view my work, including research and some of my favorite personal projects!"
          imageUrl="/profile.jpg"
        />

        <ScrollReveal>
          <SkillsSection />
        </ScrollReveal>

        <Section id="experience" title="My Experience">
          <ScrollReveal delay={0}>
            <ExperienceCard
              title="AI Trainer Fellow"
              company="Handshake AI"
              location="San Francisco, CA"
              period="Oct. 2025 – Present"
              description={[
                "Evaluated AI-generated responses for safety, accuracy, and compliance, identifying high-risk edge cases to improve model reliability before production release.",
                "Designed adversarial tests to surface model weaknesses and improve robustness across user inputs.",
                "Improved data quality workflows through rapid experimentation, reducing annotation errors by 30%.",
              ]}
            />
          </ScrollReveal>

          <ScrollReveal delay={100}>
            <ExperienceCard
              title="Software Engineer"
              company="ChitChat Workplace"
              location="Boston, MA"
              period="Apr. 2025 – Present"
              description={[
                "Built a unified messaging platform (chat, email, video, calendar) using Next.js, TypeScript, GraphQL, Kafka, and WebSockets, reducing context-switching by 10+ hours/month.",
                "Integrated GPT-4o drafting, summarization, and notifications using LangChain & Pinecone (RAG).",
                "Deployed scalable infrastructure with Kubernetes & Docker supporting 5,000+ daily messages.",
              ]}
            />
          </ScrollReveal>

          <ScrollReveal delay={200}>
            <ExperienceCard
              title="Software Engineer Intern"
              company="GBCS Group"
              location="Alberta, CA"
              period="Mar. 2025 – Sept. 2025"
              description={[
                "Migrated 8 REST APIs to GraphQL, reducing overfetching and simplifying client data access.",
                "Optimized React Query, code splitting, and PostgreSQL indexes to cut page load times by 35%.",
                "Shipped reusable TypeScript and Tailwind components and strengthened code quality by implementing linting rules, Jest utilities, and component documentation.",
              ]}
            />
          </ScrollReveal>

          <ScrollReveal delay={300}>
            <ExperienceCard
              title="Undergraduate Student Researcher"
              company="UMass Amherst"
              location="Amherst, MA"
              period="Dec. 2024 – Feb. 2025"
              description={[
                "Identified critical LLM safety gaps through systematic prompt stress-testing across risk categories.",
                "Shaped deployment decisions by formalizing safety benchmarks used in model evaluation workflows.",
              ]}
            />
          </ScrollReveal>

          <ScrollReveal delay={400}>
            <ExperienceCard
              title="Software Engineer"
            company="BUILD UMass"
            location="Amherst, MA"
            period="Sept 2024 – Present"
            description={[
              "Built application to help students find events and organizations on campus.",
              "Implemented backend with Node.js, Express, and PostgreSQL to store and retrieve event data.",
              "Created frontend with React and Tailwind CSS to display event information and allow users to filter and search for events.",
            ]}
            />
          </ScrollReveal>

          <ScrollReveal delay={500}>
            <ExperienceCard
              title="Lead Programmer"
            company="NRHS Robotics Team, FIRST Robotics, VEX Robotics"
            location="Remote"
            period="Sept 2022 - Jun 2023"
            description={[
              "Designed and implemented robot autonomous functions utilizing C++, focusing on computer vision, object detection, path-finding algorithms, and sensor integration for competitive robotics.",
              "Led software development team and collaborated cross-functionally to ensure seamless integration of mechanical, electrical, and software components for regional and national competitions.",
            ]}
            />
          </ScrollReveal>

          <ScrollReveal delay={600}>
            <ExperienceCard
              title="Mathematics Tutor"
            company="NRHS Math Lab & Private Tutoring"
            location="Remote"
            period="June 2023 - Present"
            description={[
              "Provide individualized tutoring support in mathematics for high school students covering topics from Algebra I through AP Calculus BC, resulting in improved academic performance and confidence.",
              "Conduct SAT/ACT math preparation sessions, developing customized study plans and test-taking strategies that help students achieve target scores for college admissions.",
            ]}
            />
          </ScrollReveal>
        </Section>

        <Section id="projects" title="My Projects">
          <div className="space-y-6">
            <ScrollReveal delay={0}>
              <ProjectCard
                year="2025"
                title="LLM Prompt Safety Detector"
                timeAgo="This year"
                liveLink="https://github.com/JManoj01/llm-safety-detector"
                description="Created for UMass Amherst Research purposes. Automated unsafe prompt detection for LLMs using Python, PyTorch, and scikit-learn. Standardizes safety testing and reduces manual review for production AI models."
                tags={[
                  "Python",
                  "PyTorch",
                  "scikit-learn",
                  "NLP",
                  "AI Safety Research",
                ]}
              />
            </ScrollReveal>
            <ScrollReveal delay={100}>
              <ProjectCard
                year="2025"
                title="UMass Dining Recommendation Engine"
                timeAgo="This year"
                liveLink="https://github.com/JManoj01/UMassDining"
                description="Developed full-stack dining recommender for UMass Amherst students, delivering personalized meal suggestions based on dietary preferences, favorite halls, and disliked ingredients. Designed Spring Boot & PostgreSQL backend with caching and a responsive React frontend, supporting real-time queries for 4 dining halls and 100+ menu items per day."
                tags={[
                  "Java",
                  "Python",
                  "Spring Boot",
                  "React",
                  "PostgreSQL",
                  "React Native",
                  "Fireclaw",
                ]}
              />
            </ScrollReveal>
            <ScrollReveal delay={200}>
              <ProjectCard
                year="2024"
                title="Terminal Clipboard History Manager"
              timeAgo="1 year ago"
              liveLink="https://github.com/jmanoj01/clipboard-manager"
              description="A cross-platform (Linux, MacOS, Windows) terminal clipboard history manager built with Go, storing data in SQLite database, featuring JSON-backed storage, fuzzy search, auto-categorization, and syntax highlighting, supporting up to 500-600 text/image entries with duplicate detection and export functionality."
              tags={[
                "Go",
                "SQLite",
                "TUI",
                "Chroma",
                "JSON",
              ]}
              />
            </ScrollReveal>
            <ScrollReveal delay={300}>
              <ProjectCard
                year="2024"
                title="Rust Utility Kit"
              timeAgo="1 year ago"
              liveLink="https://github.com/jmanoj01/rust-utility-kit"
              description="Built a 6-in-1 CLI (URL shortener, password generator, QR generator, file organizer, base converter, text hasher) using Rust and Clap. Implemented local URL shortening with SHA-256 hashing and JSON storage, QR code generation supporting PNG/ASCII output, and file organizer with dry-run mode supporting 7+ file categories and 40+ extensions."
              tags={[
                "Rust",
                "Clap",
                "BLAKE3",
                "Serde",
                "Base64",
              ]}
              />
            </ScrollReveal>
            <ScrollReveal delay={400}>
              <ProjectCard
                year="2023"
                title="Collaborative Sticky Notes Application"
              timeAgo="2 years ago"
              liveLink="https://stickynotes.vercel.app"
              description="A real-time collaborative brainstorming application that enables teams to create, edit, and organize digital sticky notes. Features live synchronization, team workspaces, and intuitive drag-and-drop functionality for enhanced productivity."
              tags={[
                "React",
                "TypeScript",
                "Next.js",
                "Tailwind CSS",
                "Redux",
                "Clerk",
                "LiveBlocks",
              ]}
              />
            </ScrollReveal>
          </div>
        </Section>

        <ScrollReveal delay={0}>
          <div className="mb-16">
            <GitHubContributions username="jmanoj01" />
          </div>
        </ScrollReveal>

        <Section id="contact" title="Contact Me">
          <p className="text-foreground/80 mb-6 leading-relaxed text-[15px]">
            If you would like to get in touch with me, please feel free to send
            an email at{" "}
            <a
              href="mailto:justinmmanoj@gmail.com"
              className="text-accent hover:text-foreground transition-colors font-medium"
            >
              justinmmanoj@gmail.com
            </a>{" "}
            or through this form.
          </p>
          <ScrollReveal delay={100}>
            <div className="rounded-xl border border-border/40 p-6 bg-card/20 backdrop-blur-sm hover:border-accent/50 hover:shadow-[0_0_20px_rgba(99,102,241,0.15)] hover:-translate-y-1 transition-all duration-300">
              <ContactForm />
            </div>
          </ScrollReveal>
        </Section>

        <div className="mt-16 flex gap-3 justify-center border-t border-border/40 pt-8">
          <Button asChild variant="outline" className="rounded-full">
            <a href="/resume.pdf" target="_blank" rel="noopener noreferrer">
              <FileText className="w-4 h-4 mr-2" />
              Resume
            </a>
          </Button>
          <Button asChild variant="outline" className="rounded-full">
            <a
              href="https://github.com/jmanoj01"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Github className="w-4 h-4 mr-2" />
              GitHub
            </a>
          </Button>
          <Button asChild variant="outline" className="rounded-full">
            <a
              href="https://linkedin.com/in/justinmmanoj"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Linkedin className="w-4 h-4 mr-2" />
              LinkedIn
            </a>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Index;
