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
import { AnimatedGradient } from "@/components/AnimatedGradient";

const Index = () => {
  return (
    <div className="min-h-screen bg-background relative">
      <AnimatedGradient />
      <Navigation />
      <div id="home" className="relative z-10 max-w-4xl mx-auto px-6 py-8 md:py-12">
        <Hero
          name="Justin Manoj"
          title="CS & Math @ UMass Amherst"
          description="👋 Hi, I'm Justin! I'm a junior student at the University of Massachusetts Amherst pursuing a <strong>B.S in Computer Science and Mathematics</strong>, seeking new opportunities to learn and expand my abilities as an engineer. I'm interested in <strong>full-stack development</strong>, <strong>machine learning</strong>, and <strong>data science</strong>, and I love to innovate and solve problems. Browse through my site to view my work, including research and some of my favorite personal projects!"
          imageUrl="/profile.jpg"
        />

        <SkillsSection />

        <Section id="experience" title="My Experience">
          <ExperienceCard
            title="Founding Engineer"
            company="ChitChat Workplace (Venture-Backed Startup)"
            location="Boston, MA"
            period="May 2025 – Present"
            description={[
              "Built messaging engine with <strong>Go</strong> & <strong>WebSockets</strong> handling <strong>50K+ concurrent users</strong>.",
              "Designed distributed event pipeline using <strong>Apache Kafka</strong> & <strong>Redis</strong> processing <strong>2M+ daily events</strong>.",
              "Shipped AI features with <strong>LangChain</strong> & <strong>Vector Embeddings (Pinecone)</strong>, reducing repetitive queries by <strong>40%</strong>.",
            ]}
          />

          <ExperienceCard
            title="Software Engineer Intern"
            company="GBCS Group"
            location="Alberta, CA"
            period="Mar 2025 – Sept 2025"
            description={[
              "Migrated <strong>8 REST endpoints to GraphQL</strong>, eliminating <strong>40% payload overfetching</strong>.",
              "Optimized performance with <strong>PostgreSQL indexes</strong> & <strong>React Query caching</strong>, reducing load times by <strong>65%</strong>.",
              "Built reusable <strong>TypeScript</strong> & <strong>Tailwind</strong> components with <strong>Jest</strong> utilities and documentation.",
            ]}
          />

          <ExperienceCard
            title="Undergraduate Research Assistant"
            company="University of Massachusetts Amherst - Autonomous Learning Lab"
            location="Amherst, MA"
            period="Nov 2024 – Apr 2025"
            description={[
              "Stress-tested <strong>7 multi-agent AI frameworks</strong> with <strong>Python</strong>, identifying <strong>14 critical bug types</strong>.",
              "Labeled <strong>1,600+ execution logs</strong> using <strong>OpenAI API</strong> & <strong>Pandas</strong>, creating standardized crash dataset.",
              "Built failure-detection pipeline reducing manual review time by <strong>70%</strong>.",
            ]}
          />

          <ExperienceCard
            title="Software Engineer"
            company="BUILD UMass"
            location="Amherst, MA"
            period="Sept 2024 – Present"
            description={[
              "Built campus events app with <strong>React</strong>, <strong>Node.js</strong>, & <strong>PostgreSQL</strong> to create, browse, and manage UMass student events.",
              "Implemented filtering and indexed search queries to reduce load times and improve event retrieval performance.",
              "Developed REST APIs and optimized database queries for reliable real-time event updates."
            ]}
          />

          <ExperienceCard
            title="Team Captain"
            company="NRHS Robotics, FIRST Robotics, VEX Robotics"
            location="Remote"
            period="Sept 2022 - Jun 2023"
            description={[
              "Implemented robot behaviors in <strong>C++</strong> with <strong>computer vision, object detection, and path-finding</strong>.",
              "Coordinated team workflow including version control, code reviews, testing, and planning under competition deadlines.",
              "Led the <strong>software team</strong> in FIRST and VEX in <strong>regional & national competitions</strong>.",
            ]}
            
          />
        </Section>

        <Section id="projects" title="My Projects">
          <div className="space-y-6">
            <ProjectCard
              year="2026"
              title="UMass Dining Recommendation Engine"
              timeAgo="This year"
              liveLink="https://github.com/JManoj01/UMassDining"
              description="Personalized nutrition platform for <strong>30,000+ students</strong> aggregating menus from <strong>4 dining halls</strong>. Built backend with <strong>Spring Boot</strong> & <strong>PostgreSQL</strong>, implemented <strong>Redis</strong> for real-time queries. Data pipeline in <strong>Python</strong> processes <strong>100+ daily menu items</strong> with <strong>99.9% accuracy</strong>."
              tags={[
                "Java",
                "Spring Boot",
                "React",
                "PostgreSQL",
                "Python",
                "Redis",
              ]}
            />

            <ProjectCard
              year="2025"
              title="Symptom Medical Assistant Bot"
              timeAgo="1 year ago"
              liveLink="https://github.com/JManoj01/symptom-bot"
              description="AI-powered medical assistant using <strong>Gemini API</strong> for symptom analysis and triage. Provides users with evidence-based medical suggestions reaching <strong>85% accuracy</strong>, and integrates patient testimonial matching for personalized insights. Developed a secure chat interface with <strong>privacy-conscious logging</strong> and data handling."
              tags={["Python", "JavaScript", "FastAPI", "PostgreSQL", "MongoDB", "Gemini API", "Elasticsearch" ]}
            />

            <ProjectCard
              year="2025"
              title="LLM Prompt Safety Detector"
              timeAgo="1 year ago"
              liveLink="https://github.com/JManoj01/llm-prompt-safety-detector"
              description="Automated system to detect unsafe LLM prompts in <strong>500+ test cases</strong> using <strong>Python</strong> & <strong>PyTorch</strong>. Standardized safety testing for <strong>GPT-4, Claude, Llama, & Mistral</strong>. Fine-tuned <strong>BERT classifier</strong> on <strong>1,000+ labeled prompts</strong> achieving <strong>92% accuracy</strong>. Integrated into <strong>CI/CD pipeline</strong> reducing unsafe deployment by <strong>80%</strong>."
              tags={["Python", "PyTorch", "scikit-learn", "BERT", "LLMs"]}
            />

            <ProjectCard
              year="2024"
              title="Multi-User Trust Payment Platform"
              timeAgo="2 years ago"
              liveLink="https://github.com/JManoj01/payment-hub"
              description="Secure group payment platform with escrow in <strong>PostgreSQL</strong> and <strong>Reliability Scores</strong>. Implemented <strong>payment staking</strong> where users deposit collateral automatically forfeited on missed deadlines. Integrated <strong>Stripe</strong> for settlements, reducing disputes."
              tags={[
                "TypeScript",
                "Next.js",
                "PostgreSQL",
                "Stripe",
                "Escrow",
              ]}
            />
          </div>
        </Section>

        <div className="mb-16">
          <GitHubContributions username="jmanoj01" />
        </div>

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
          <div className="rounded-xl border border-border/40 p-6 bg-card/20 backdrop-blur-sm hover:border-accent/50 hover:shadow-[0_0_20px_rgba(99,102,241,0.15)] hover:-translate-y-1 transition-all duration-300">
            <ContactForm />
          </div>
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
