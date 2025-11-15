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

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <div id="home" className="max-w-4xl mx-auto px-6 py-12 md:py-16">
        <Hero
          name="Justin Manoj"
          title="CS & Mathematics @ UMass Amherst"
          description="👋 Hi, I'm Justin! I'm an undergraduate student at the University of Massachusetts-Amherst pursuing a B.S in Computer Science and Mathematics, seeking new opportunities to learn and expand my abilities as an engineer. I'm interested in full-stack development, machine learning, and data science, and I love to innovate and solve problems. Browse through my site to view work, including research and some of my favorite personal projects!"
          imageUrl="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=faces"
        />

        <div id="about" className="mb-12 flex gap-4">
          <Button asChild variant="default">
            <a href="mailto:justinmmanoj@gmail.com">Contact</a>
          </Button>
          <Button asChild variant="outline">
            <a href="/resume.pdf" target="_blank" rel="noopener noreferrer">
              <FileText className="w-4 h-4 mr-2" />
              Resume
            </a>
          </Button>
          <Button asChild variant="outline" size="icon">
            <a
              href="https://github.com/jmanoj01"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Github className="w-4 h-4" />
            </a>
          </Button>
          <Button asChild variant="outline" size="icon">
            <a
              href="https://linkedin.com/in/justinmmanoj"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Linkedin className="w-4 h-4" />
            </a>
          </Button>
        </div>

        <div className="mb-12">
          <GitHubContributions username="jmanoj01" />
        </div>

        <SkillsSection />

        <Section id="projects" title="My Projects">
          <div className="space-y-6">
            <ProjectCard
              year="2025"
              title="ChitChat Workplace"
              timeAgo="This year"
              liveLink="https://chitchat.workplace"
              description="A comprehensive internal communication platform designed for organizations, featuring AI-powered messaging, seamless email integration, and customizable productivity widgets. Built with modern web technologies and deployed on Azure cloud infrastructure."
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

            <ProjectCard
              year="2025"
              title="UMass Dining Recommendation Engine"
              timeAgo="This year"
              description="ML recommendation system using PyTorch and Sentence-Transformers to help students discover meals at UMass Amherst across 100+ daily menu items from 4 dining hall commons (Franklin, Worcester, Hampshire, and Berkshire) using a personalized dietary-preference matching algorithm."
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

            <ProjectCard
              year="2025"
              title="Personal Portfolio Website"
              timeAgo="This year"
              liveLink="https://jmanoj.vercel.app"
              description="A personal portfolio website built with React, Next.js, TypeScript, Tailwind, and Vercel to showcase my projects and skills."
              tags={["React", "Next.js", "TypeScript", "Tailwind", "Vercel"]}
            />

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

            <ProjectCard
              year="2024"
              title="Roam - AI Travel Planning Platform"
              timeAgo="1 year ago"
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

            <ProjectCard
              year="2023"
              title="Smart Weather Application"
              timeAgo="2 years ago"
              liveLink="https://weather.vercel.app"
              description="A comprehensive weather application featuring location-based forecasts, interactive maps, and detailed meteorological data. Includes geolocation services, weather alerts, and responsive design optimized for all devices."
              tags={[
                "React",
                "Next.js",
                "JavaScript",
                "Tailwind",
                "OpenWeatherMap API",
                "Geolocation",
                "Vercel",
              ]}
            />

            <ProjectCard
              year="2023"
              title="URL Shortener Application"
              timeAgo="2 years ago"
              liveLink="https://urlshort.vercel.app"
              description="A modern URL shortening app with analytics tracking, custom short codes, and QR code generation. Features user authentication, link management dashboard, and detailed click analytics with geographical insights."
              tags={[
                "React",
                "Next.js",
                "TypeScript",
                "MySQL",
                "Tailwind",
                "Prisma",
                "Vercel",
              ]}
            />
          </div>
        </Section>

        <Section id="experience" title="Experience">
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
        </Section>

        <Section id="contact" title="Contact Me">
          <p className="text-foreground mb-6 leading-relaxed">
            If you would like to get in touch with me, please feel free to send me
            an email at{" "}
            <a
              href="mailto:justinmmanoj@gmail.com"
              className="text-primary hover:underline"
            >
              justinmmanoj@gmail.com
            </a>{" "}
            or through this form.
          </p>
          <ContactForm />
        </Section>
      </div>
    </div>
  );
};

export default Index;
