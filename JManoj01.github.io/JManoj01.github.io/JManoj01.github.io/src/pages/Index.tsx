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
          title="CS & Mathematics @ UMass Amherst"
          description="👋 Hi, I'm Justin! I'm an undergraduate student at the University of Massachusetts-Amherst pursuing a B.S in Computer Science and Mathematics, seeking new opportunities to learn and expand my abilities as an engineer. I'm interested in full-stack development, machine learning, and data science, and I love to innovate and solve problems. Browse through my site to view my work, including research and some of my favorite personal projects!"
          imageUrl="/profile.jpg"
        />

        <ScrollReveal>
          <SkillsSection />
        </ScrollReveal>

        <Section id="projects" title="My Projects">
          <div className="space-y-6">
            <ScrollReveal delay={0}>
              <ProjectCard
              year="2025"
              title="ChitChat Workplace"
              timeAgo="This year"
              liveLink="https://chitchatwork.com"
              description="An internal communication platform designed for organizations, featuring AI-powered messaging, seamless email integration, and customizable productivity widgets. Built with modern web technologies and deployed on Azure Cloud."
              tags={[
                "React",
                "Next.js",
                "TypeScript",
                "Tailwind",
                "Prisma",
                "PostgreSQL",
                "Azure",
                "Microsoft Graph API",
              ]}
              />
            </ScrollReveal>

            <ScrollReveal delay={100}>
              <ProjectCard
                year="2025"
                title="UMass Dining Recommendation Engine (Hackathon Project)"
              timeAgo="This year"
              liveLink="https://github.com/JManoj01/UMassDining"
              description="Pending adoption for campus-use at UMass Amherst. ML recommendation system using PyTorch and Sentence-Transformers to help students discover meals at UMass Amherst across 100+ daily menu items from 4 dining hall commons (Franklin, Worcester, Hampshire, and Berkshire) using a personalized dietary-preference matching algorithm."
              tags={[
                "PyTorch",
                "FastAPI",
                "Python",
                "Next.js",
                "PostgreSQL",
                "Redis",
                "Scikit-learn",
                "Sentence-Transformers",
                "OpenAI API",
              ]}
              />
            </ScrollReveal>

            <ScrollReveal delay={200}>
              <ProjectCard
                year="2025"
                title="Micro Habit Tree - Android"
              timeAgo="This year"
              liveLink="https://github.com/JManoj01/Micro-Habit-Tree"
              description="A multi-platform app that turns your daily habits into a growing tree. Completing habits adds leaves, tracks streaks, shows weekly progress, and rewards achievements, helping users stay consistent and motivated."
              tags={[
                "Kotlin",
                "Compose Multiplatform",
                "MVVM",
                "Gradle",
                "JSON",
              ]}
              />
            </ScrollReveal>

            <ScrollReveal delay={200}>
              <ProjectCard
                year="2025"
                title="Terminal Clipboard History Manager"
              timeAgo="This year"
              liveLink="https://github.com/jmanoj01/clipboard-manager"
              description="A cross-platform (Linux, MacOS, Windows) terminal clipboard history manager built with Go, using BubbleTea TUI library and storing data in SQLite database, featuring JSON-backed storage, fuzzy search, auto-categorization, and syntax highlighting via Chroma, supporting up to 500-600 text/image entries with duplicate detection and export functionality."
              tags={[
                "Go",
                "SQLite",
                "BubbleTea",
                "Chroma",
                "Lipgloss",
                "JSON",
                "Fuzzy Search",
                "Auto-Categorization",
                "Syntax Highlighting",
              ]}
              />
            </ScrollReveal>

            <ScrollReveal delay={200}>
              <ProjectCard
                year="2025"
                title="Rust Utility Kit"
              timeAgo="This year"
              liveLink="https://github.com/jmanoj01/rust-utility-kit"
              description="Built a 6-in-1 CLI (URL shortener, password+QR generator, file organizer, base converter, text hasher) via Rust + Clap. Implemented local URL shortening with SHA-256 hashing and JSON storage, QR code generation supporting PNG/ASCII output, and file organizer with dry-run mode supporting 7+ file categories and 40+ extensions."
              tags={[
                "Rust",
                "Clap",
                "QRCode",
                "BLAKE3",
                "Serde",
                "Base64",
              ]}
              />
            </ScrollReveal>

            <ScrollReveal delay={200}>
              <ProjectCard
                year="2024"
                title="Collaborative Sticky Notes Application"
              timeAgo="1 year ago"
              liveLink="https://stickynotes.vercel.app"
              description="A real-time collaborative brainstorming application that enables teams to create, edit, and organize digital sticky notes. Features live synchronization, team workspaces, and intuitive drag-and-drop functionality for enhanced productivity."
              tags={[
                "React",
                "TypeScript",
                "Next.js",
                "Tailwind",
                "Redux",
                "Convex",
                "Clerk",
                "LiveBlocks",
                "Vercel",
              ]}
              />
            </ScrollReveal>


            <ScrollReveal delay={200}>
              <ProjectCard
                year="2024"
                title="UMass Campus Map — SwiftUI + MapKit iOS App (Hackathon Project)"
              timeAgo="1 year ago"
              liveLink="https://github.com/JManoj01/UMassCampusMap-Xcode"
              description="A SwiftUI app that helps students explore the UMass Amherst campus. Users can search for buildings, coffee shops, study spots, and get directions, with favorites and detailed building info."
              tags={[
                "Swift",
                "SwiftUI",
                "MapKit",
                "Combine",
                "MVVM",
                "Xcode",
              ]}
              />
            </ScrollReveal>

            <ScrollReveal delay={200}>
              <ProjectCard
                year="2023"
                title="Roam - AI Travel Planning Platform"
              timeAgo="2 years ago"
              liveLink="https://roam.vercel.app"
              description="An intelligent travel planning application powered by OpenAI that generates personalized itineraries, destination recommendations, and budget estimates. Features smart destination analysis, weather integration, and collaborative trip planning."
              tags={[
                "React",
                "Next.js",
                "TypeScript",
                "Tailwind",
                "Convex",
                "OpenAI API",
                "Vercel",
              ]}
              />
            </ScrollReveal>

          </div>
        </Section>

        <Section id="experience" title="Experience">
          <ScrollReveal delay={0}>
            <ExperienceCard
            title="AI Trainer"
            company="Handshake AI Fellowship"
            location="Remote"
            period="Sept 2025 – Present"
            description={[
              "Evaluated, ranked, and optimized large-scale LLM outputs across text, image, and multimedia tasks to improve model accuracy, safety, and reasoning.",
              "Trained foundation models by generating high-quality demonstrations, crafting edge-case prompts, and debugging failure modes used directly in model fine-tuning cycles.",
              "Performed rapid research experiments on model behavior, identifying patterns, inconsistencies, and potential risks that informed data collection and model-alignment strategies.",
              "Collaborated asynchronously with AI researchers and engineers to uphold rigorous annotation standards.",
            ]}
            />
          </ScrollReveal>

          <ScrollReveal delay={100}>
            <ExperienceCard
            title="Full-Stack Software Engineer"
            company="ChitChat Workplace"
            location="Boston, MA"
            period="Apr 2025 – Present"
            description={[
              "Integrated chat, email, video calls, and calendar into one workspace using React, Next.js, TypeScript, and Microsoft Graph.",
              "Reduced context switching by 10+ hours/month by unifying communications and scheduling in a single surface.",
              "Added OpenAI API copilot for smart replies, meeting summaries, priority notifications, and context-aware suggestions.",
              "Built real-time WebSocket+Redis pipeline for 5,000+ messages/day; shipped React widget SDK for third-party embeds.",
            ]}
            />
          </ScrollReveal>

          <ScrollReveal delay={200}>
            <ExperienceCard
              title="Software Engineer Intern"
            company="GBCS Group/SkyIT Services"
            location="Alberta, CA"
            period="Mar 2025 – Sept 2025"
            description={[
              "Migrated 8 REST endpoints to GraphQL in order to eliminate over-fetching and shrink client requests on internal SaaS platform.",
              "Optimized React Query, code splitting, and PostgreSQL indexes to cut page load times by 30%.",
              "Delivered 60+ reusable TypeScript/Tailwind components and enforced code quality across 100+ PRs by implementing TypeScript linting rules, Jest utilities, and component documentation.",
            ]}
            />
          </ScrollReveal>

          <ScrollReveal delay={300}>
            <ExperienceCard
              title="Undergraduate Student Researcher"
            company="Early Research Scholars Program - UMass Amherst"
            location="Amherst, MA"
            period="Dec 2024 – Feb 2025"
            description={[
              "Developed Python framework to detect malicious prompts in 500+ test cases, reducing manual review time by 70%.",
              "Enabled repeatable regression testing for GPT-4, Claude, and Llama with parameterized cases and standardized outputs.",
              "Tested 10+ LLM attack vectors and proposed security hardening recommendations for production deployment.",
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
