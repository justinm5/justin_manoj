import { useEffect, useRef, useState } from "react";
import { ArrowUpRight, ChevronLeft, ChevronRight } from "lucide-react";
import { PageLayout } from "@/components/PageLayout";

type ExperienceCard = {
  period: string;
  company: string;
  companySecondary?: string;
  role: string;
  location: string;
  summary: string;
  focus: string;
  href: string;
};

const experienceCards: ExperienceCard[] = [
  {
    period: "May 2025 – Present",
    company: "ChitChat Workplace",
    role: "Co-Founder / Software Engineer",
    location: "Boston, MA",
    focus: "Go · WebSockets · Kafka · Kubernetes · AWS · LangChain",
    summary:
      "Built real-time backend for 100k+ user concurrent messaging platform & launched enterprise pilots in 90 days.",
    href: "/experience#chitchat-workplace",
  },
  {
    period: "Mar 2025 – Sept 2025",
    company: "GBCS Group",
    role: "Software Engineer Intern",
    location: "Alberta, CA",
    focus: "GraphQL · Redis · PostgreSQL · gRPC · Jest · Sentry · CI/CD",
    summary:
      "Rebuilt core APIs with GraphQL & caching, reducing backend load & cutting dashboard load times by 65%.",
    href: "/experience#gbcs-group",
  },
  {
    period: "Nov 2024 – Apr 2025",
    company: "University of Massachusetts Amherst",
    companySecondary: "Autonomous Learning Lab",
    role: "Undergraduate Research Assistant",
    location: "Amherst, MA",
    focus: "Python · Multi-Agents · Ray · Pandas · NumPy · Juypter",
    summary:
      "Tested multi-agent LLM systems, finding 14 failure modes in 10k+ simulations & improving analysis speed by 3x.",
    href: "/experience#umass-autonomous-learning-lab",
  },
  {
    period: "Sept 2024 – Present",
    company: "BUILD UMass",
    role: "Software Engineer",
    location: "Amherst, MA",
    focus: "React · Elasticsearch · WebSockets · Redis Pub/Sub",
    summary:
      "Optimized campus events platform with faster search & reliable real-time updates for UMass students.",
    href: "/experience#build-umass",
  },
  {
    period: "Sept 2022 - Jun 2023",
    company: "NRHS Robotics",
    companySecondary: "FIRST & VEX Robotics",
    role: "Team Captain",
    location: "Thiells, NY",
    focus: "C++ · ROS · Gazebo · Computer Vision · PID Control",
    summary:
      "Led C++ robotics software development and team execution for regional & national competitions.",
    href: "/experience#nrhs-robotics-first-vex-robotics",
  },
];

const projectsList = [
  {
    title: "UMass Dining Engine",
    period: "Jan 2026",
    category: "AI + Full-Stack",
    summary:
      "Built an AI meal-planning platform for 30,000+ UMass students with live menu aggregation across 4 dining halls and real-time dietary filters.",
    tags: "Java · Spring Boot · React · PostgreSQL · Redis · Python",
    link: "https://github.com/JManoj01/UMassDining",
  },
  {
    title: "Poker IQ Trainer",
    period: "Apr 2025",
    category: "Systems + Simulation",
    summary:
      "Built a Texas Hold'em trainer with beginner/expert AI opponents using Monte Carlo simulations and WebAssembly for real-time EV and pot-odds training.",
    tags: "TypeScript · React · WebAssembly · Node.js",
  },
  {
    title: "Medical Insight Bot",
    period: "Jan 2025",
    category: "RAG + LLM",
    summary:
      "Built a RAG-based symptom assistant using FastAPI and pgvector that returns ranked diagnoses with confidence scoring across test cases.",
    tags: "Python · FastAPI · React · PostgreSQL · pgvector",
    link: "https://github.com/JManoj01/symptom-bot",
  },
  {
    title: "Subscription Tracker",
    period: "2025",
    category: "Backend API",
    summary:
      "Built a subscription manager that tracks recurring costs, computes monthly/yearly totals, and alerts users about upcoming trial expirations.",
    tags: "Java · Javalin · PostgreSQL · JavaScript",
  },
];

const About = () => {
  const [activeProject, setActiveProject] = useState<number | null>(null);
  const [hasInteractedWithExperience, setHasInteractedWithExperience] = useState(false);
  const experienceRailRef = useRef<HTMLDivElement | null>(null);

  const scrollExperience = (direction: "left" | "right") => {
    const rail = experienceRailRef.current;
    if (!rail) {
      return;
    }

    setHasInteractedWithExperience(true);
    rail.scrollBy({
      left: direction === "right" ? 320 : -320,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    const rail = experienceRailRef.current;
    if (!rail || hasInteractedWithExperience) {
      return;
    }

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    let isCancelled = false;
    const timers: number[] = [];

    timers.push(
      window.setTimeout(() => {
        if (isCancelled || !experienceRailRef.current) {
          return;
        }

        experienceRailRef.current.scrollTo({
          left: 88,
          behavior: "smooth",
        });

        timers.push(
          window.setTimeout(() => {
            if (isCancelled || !experienceRailRef.current) {
              return;
            }

            experienceRailRef.current.scrollTo({
              left: 0,
              behavior: "smooth",
            });
          }, 700),
        );
      }, 850),
    );

    return () => {
      isCancelled = true;
      timers.forEach((timer) => window.clearTimeout(timer));
    };
  }, [hasInteractedWithExperience]);

  return (
    <PageLayout width="wide" contentClassName="min-h-[calc(100vh-6rem)] pb-0">
      <div id="about" className="space-y-4">
        <section id="experience" className="rounded-2xl bg-card/10 pt-4 pb-2 sm:pt-5 sm:pb-3">
          <div className="mb-4 px-0">
            <p className="text-xs font-mono uppercase tracking-[0.18em] text-muted-foreground">
              Experience
            </p>
          </div>

          <div
            ref={experienceRailRef}
            onPointerDown={() => setHasInteractedWithExperience(true)}
            onTouchStart={() => setHasInteractedWithExperience(true)}
            onWheel={() => setHasInteractedWithExperience(true)}
            className="flex snap-x snap-mandatory gap-3 overflow-x-auto pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          >
            {experienceCards.map((experience) => (
              <article
                key={`${experience.company}-${experience.period}`}
                className="group flex h-[388px] w-[286px] shrink-0 snap-start flex-col rounded-2xl border border-border/45 bg-card/20 p-4 transition-colors duration-300 hover:border-border/70"
              >
                <div className="flex items-start justify-between gap-3">
                  <p className="text-[11px] font-mono uppercase tracking-[0.08em] text-muted-foreground">
                    {experience.period}
                  </p>
                </div>

                <div className="mt-2.5 space-y-1">
                  <p className="truncate text-[14px] font-semibold leading-snug text-foreground">
                    {experience.company}
                  </p>
                  {experience.companySecondary ? (
                    <p className="truncate text-[12px] font-semibold leading-snug text-foreground/75">
                      {experience.companySecondary}
                    </p>
                  ) : null}
                </div>
                <h3 className="mt-1 truncate text-[13px] font-medium leading-snug text-foreground/90">
                  {experience.role}
                </h3>
                <p className="mt-2.5 text-[13px] leading-relaxed text-muted-foreground">{experience.summary}</p>
                <div className="mt-4 border-t border-border/30 pt-3">
                  <div className="flex flex-wrap gap-2">
                    {experience.focus.split("·").map((item) => (
                      <span
                        key={`${experience.company}-${item}`}
                        className="rounded-full bg-background/40 px-2.5 py-1 text-[10px] font-mono uppercase tracking-[0.1em] text-foreground/70"
                      >
                        {item.trim()}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="mt-auto flex items-center justify-between pt-3">
                  <p className="text-[11px] font-mono uppercase tracking-[0.07em] text-foreground/70">
                    {experience.location}
                  </p>
                  <a
                    href={experience.href}
                    aria-label={`Open ${experience.company} details`}
                    className="inline-flex h-7 w-7 items-center justify-center text-foreground/70 transition-colors hover:text-foreground"
                  >
                    <ArrowUpRight className="h-4 w-4" />
                  </a>
                </div>
              </article>
            ))}
          </div>

          <div className="mt-1 flex items-center justify-end gap-2 pr-0">
            <button
              type="button"
              onClick={() => scrollExperience("left")}
              aria-label="Scroll experience left"
              className="inline-flex h-8 w-8 items-center justify-center text-foreground/45 transition-colors hover:text-foreground focus-visible:outline-none"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            <button
              type="button"
              onClick={() => scrollExperience("right")}
              aria-label="Scroll experience right"
              className="inline-flex h-8 w-8 items-center justify-center text-foreground/45 transition-colors hover:text-foreground focus-visible:outline-none"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </section>

        <section id="projects" className="rounded-2xl bg-card/10 py-4 sm:py-5">
          <div className="mb-4 px-0">
            <p className="text-xs font-mono uppercase tracking-[0.18em] text-muted-foreground">
              Projects
            </p>
          </div>

          <div className="overflow-hidden rounded-2xl bg-card/25">
            {projectsList.map((project, index) => {
              const isActive = activeProject === index;
              return (
                <div
                  key={project.title}
                  className="border-t border-border/35 first:border-t-0"
                  onMouseEnter={() => setActiveProject(index)}
                  onMouseLeave={() => setActiveProject(null)}
                >
                  <button
                    type="button"
                    aria-expanded={isActive}
                    className={`w-full px-4 py-3 text-left transition-colors duration-200 ${
                      isActive ? "bg-secondary/35" : "hover:bg-secondary/20"
                    }`}
                  >
                    <div className="flex items-center justify-between gap-3">
                      <div className="min-w-0">
                        <p className="truncate text-[16px] font-medium text-foreground">{project.title}</p>
                        <p className="mt-0.5 text-[10px] font-mono uppercase tracking-[0.08em] text-muted-foreground">
                          {project.period}
                        </p>
                      </div>

                      <div className="shrink-0 px-2 py-1 text-[10px] font-mono uppercase tracking-[0.09em] text-foreground/65">
                        {project.category}
                      </div>
                    </div>
                  </button>

                  {isActive ? (
                    <div className="border-t border-border/35 bg-background/15 px-4 pb-4 pt-3">
                      <p className="text-[13px] leading-relaxed text-muted-foreground/95">
                        {project.summary}
                      </p>
                      <div className="mt-2 flex items-center justify-between gap-2">
                        <p className="truncate text-[11px] font-mono uppercase tracking-[0.08em] text-foreground/80">
                          {project.tags}
                        </p>
                        {project.link ? (
                          <a
                            href={project.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="shrink-0 inline-flex items-center gap-1 text-sm text-foreground/85 hover:text-accent transition-colors"
                          >
                            Open
                            <ArrowUpRight className="h-4 w-4" />
                          </a>
                        ) : null}
                      </div>
                    </div>
                  ) : null}
                </div>
              );
            })}
          </div>
        </section>
      </div>
    </PageLayout>
  );
};

export default About;
