import { useEffect, useRef, useState } from "react";
import { ArrowUpRight, ChevronLeft, ChevronRight } from "lucide-react";
import { PageLayout } from "@/components/PageLayout";
import { experienceCards } from "@/data/experience";

const projectsList = [
  {
    title: "Quantitative Agent",
    period: "Jun 2026",
    category: "Quantitative Research + Microservices",
    summary:
      "Shipped a real-time algorithmic-research platform that ingests SEC Form 4 insider filings, live price feeds, and financial-news streams into a microservices pipeline. Built a Go ingestion gateway with gRPC and Kafka, stored time-series signals in TimescaleDB, cached hot anomalies in Redis, and trained a Python agent that flags filing/price divergences.",
    tags: "Go · gRPC · Kafka · TimescaleDB · Redis · Python · React",
  },
  {
    title: "UMass Dining Engine",
    period: "Jan 2026",
    category: "AI + Full-Stack",
    summary:
      "Shipped an AI meal-planning recommendation platform for 30,000+ UMass students. Aggregates live menus from 4 dining halls, normalizes dietary and allergen data, and serves real-time filters through a Redis-backed Spring Boot API with PostgreSQL full-text search and scheduled Python ETL for nutrition ingestion. React frontend supports instant menu queries and personalized meal plans.",
    tags: "Java · Spring Boot · React · PostgreSQL · Redis · Python",
    link: "https://github.com/JManoj01/UMassDining",
  },
  {
    title: "Poker IQ Trainer",
    period: "Apr 2025",
    category: "Systems + Simulation",
    summary:
      "Engineered a Texas Hold'em training suite with configurable beginner and expert AI opponents. Compiled a Monte Carlo simulation engine to WebAssembly for fast, browser-side equity and pot-odds calculations. Built a React UI for real-time EV visualization, opponent modeling, and indexed hand-history review.",
    tags: "TypeScript · React · WebAssembly · Node.js",
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
            <p className="text-xs font-tabular-itf uppercase tracking-[0.18em] text-muted-foreground">
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
                className="group relative flex h-[388px] w-[286px] shrink-0 snap-start flex-col overflow-hidden rounded-2xl border border-border/45 bg-card/20 p-4 transition-colors duration-300 hover:border-border/70"
              >
                <div className="flex items-start justify-between gap-3">
                  <p className="text-[12px] font-mono uppercase tracking-[0.08em] text-muted-foreground">
                    {experience.period}
                  </p>
                  <a
                    href={experience.href}
                    aria-label={`Open ${experience.company} details`}
                    className="inline-flex h-7 w-7 items-center justify-center text-foreground/70 transition-colors hover:text-foreground"
                  >
                    <ArrowUpRight className="h-4 w-4" />
                  </a>
                </div>

                <div className="mt-2.5 space-y-1">
                  <p className="truncate text-[16px] font-semibold leading-snug text-foreground">
                    {experience.company}
                  </p>
                  {experience.companySecondary ? (
                    <p className="truncate text-[14px] font-semibold leading-snug text-foreground/75">
                      {experience.companySecondary}
                    </p>
                  ) : null}
                </div>
                <h3 className="mt-1 truncate text-[14px] font-medium leading-snug text-foreground/90">
                  {experience.role}
                </h3>

                <p className="mt-2.5 text-[12px] font-mono uppercase tracking-[0.07em] text-foreground/70">
                  {experience.location}
                </p>

                <div className="mt-3 border-t border-border/30 pt-3 md:hidden">
                  <p className="text-[14px] leading-relaxed text-muted-foreground">{experience.summary}</p>
                  <div className="flex flex-wrap gap-2">
                    {experience.focus.split("·").map((item) => (
                      <span
                        key={`${experience.company}-${item}`}
                        className="rounded-full bg-background/40 px-2.5 py-1 text-[11px] font-mono uppercase tracking-[0.1em] text-foreground/70"
                      >
                        {item.trim()}
                      </span>
                    ))}
                  </div>
                </div>

                <p className="mt-auto hidden text-[11px] font-mono uppercase tracking-[0.1em] text-foreground/45 md:block">
                  Hover For Details
                </p>

                <div className="pointer-events-none absolute inset-x-3 bottom-3 hidden translate-y-2 rounded-xl border border-border/35 bg-background/88 p-3 opacity-0 backdrop-blur-lg transition-all duration-300 md:block md:group-hover:translate-y-0 md:group-hover:opacity-100 md:group-focus-within:translate-y-0 md:group-focus-within:opacity-100">
                  <p className="text-[13px] leading-relaxed text-muted-foreground">{experience.summary}</p>
                  <div className="mt-2.5 flex flex-wrap gap-1.5">
                    {experience.focus.split("·").map((item) => (
                      <span
                        key={`${experience.company}-hover-${item}`}
                        className="rounded-full bg-background/60 px-2 py-0.5 text-[10px] font-mono uppercase tracking-[0.1em] text-foreground/70"
                      >
                        {item.trim()}
                      </span>
                    ))}
                  </div>
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
            <p className="text-xs font-tabular-itf uppercase tracking-[0.18em] text-muted-foreground">
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
