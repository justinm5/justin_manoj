import { PageLayout } from "@/components/PageLayout";
import { useEffect, useRef, useState, type ComponentType } from "react";
import { ArrowUpRight, ChevronLeft, ChevronRight, Github, Instagram, Linkedin, Mail } from "lucide-react";
import { SpotifyLastPlayed } from "@/components/SpotifyLastPlayed";

type IconComponent = ComponentType<{ className?: string }>;
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

const SpotifyIcon: IconComponent = ({ className }) => (
  <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden="true">
    <path d="M12 1.5C6.201 1.5 1.5 6.201 1.5 12S6.201 22.5 12 22.5 22.5 17.799 22.5 12 17.799 1.5 12 1.5zm4.327 15.264a.665.665 0 0 1-.914.218c-2.505-1.531-5.655-1.88-9.359-1.037a.664.664 0 0 1-.294-1.295c4.052-.924 7.534-.53 10.347 1.191a.664.664 0 0 1 .22.923zm1.306-2.906a.832.832 0 0 1-1.143.274c-2.868-1.757-7.238-2.266-10.633-1.235a.831.831 0 1 1-.483-1.591c3.873-1.175 8.693-.61 11.985 1.409a.831.831 0 0 1 .274 1.143zm.112-3.026c-3.437-2.041-9.111-2.228-12.392-1.233a.997.997 0 1 1-.579-1.908c3.766-1.14 10.028-.919 13.99 1.433a.997.997 0 0 1-1.019 1.708z" />
  </svg>
);

const XIcon: IconComponent = ({ className }) => (
  <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden="true">
    <path d="M18.901 2.25h3.681l-8.042 9.19 9.461 12.31h-7.405L10.797 16.3 4.28 23.75H.596l8.602-9.834L0 2.25h7.593l5.243 6.924L18.901 2.25zm-1.292 19.31h2.04L6.482 4.327H4.292L17.609 21.56z" />
  </svg>
);

const socialLinks: { label: string; href: string; icon: IconComponent }[] = [
  {
    label: "Email",
    href: "mailto:justinmmanoj@gmail.com",
    icon: Mail,
  },
  {
    label: "LinkedIn",
    href: "https://linkedin.com/in/justinmmanoj",
    icon: Linkedin,
  },
  {
    label: "Spotify",
    href: "https://open.spotify.com/user/31ujvm27vmo3m4r2xpz2lrmflnxq?si=40e7e5e5a29b4467",
    icon: SpotifyIcon,
  },
  {
    label: "GitHub",
    href: "https://github.com/justinm5",
    icon: Github,
  },
  {
    label: "X",
    href: "https://x.com/",
    icon: XIcon,
  },
  {
    label: "Instagram",
    href: "https://www.instagram.com/j_manoj01",
    icon: Instagram,
  },
];

const coursework =
  "Algorithms, Data Structures, Operating Systems, Databases, Computer Networks & Security, Machine Learning, Web Programming, Scalable Web Systems, Discrete Mathematics";

const honors =
  "Dean’s List, Chancellor’s Award, NYS Academic Excellence Award, AP Scholar with Distinction, National Merit Scholar, Honors College";

const technicalSkills = [
  {
    title: "Languages",
    items: "Python · Java · C++ · TypeScript · SQL",
  },
  {
    title: "Frameworks",
    items: "React · Node.js · Spring Boot · FastAPI · gRPC",
  },
  {
    title: "Machine Learning",
    items: "PyTorch · Scikit-learn · NumPy · Pandas",
  },
  {
    title: "Systems & Infrastructure",
    items: "AWS · Docker · Kubernetes · PostgreSQL · Redis",
  },
];

const experienceCards: ExperienceCard[] = [
  {
    period: "May 2025 – Present",
    company: "ChitChat Workplace",
    role: "Co-Founder / Software Engineer",
    location: "Boston, MA",
    focus: "Go · WebSockets · Kafka · Kubernetes",
    summary:
      "Built real-time backend for 100k+ user concurrent messaging platform & launched enterprise pilots in 90 days.",
    href: "/experience#chitchat-workplace",
  },
  {
    period: "Mar 2025 – Sept 2025",
    company: "GBCS Group",
    role: "Software Engineer Intern",
    location: "Alberta, CA",
    focus: "GraphQL · Redis · PostgreSQL · CI/CD",
    summary:
      "Rebuilt core APIs with GraphQL & caching, reducing backend load & cutting dashboard load times by 65%.",
    href: "/experience#gbcs-group",
  },
  {
    period: "Nov 2024 – Apr 2025",
    company: "Autonomous Learning Lab",
    companySecondary: "University of Massachusetts Amherst",
    role: "Undergraduate Research Assistant",
    location: "Amherst, MA",
    focus: "Python · LLM Agents · Ray · Pandas",
    summary:
      "Tested multi-agent LLM systems, finding 14 failure modes in 10k+ simulations & improving analysis speed by 3x.",
    href: "/experience#umass-autonomous-learning-lab",
  },
  {
    period: "Sept 2024 – Present",
    company: "BUILD UMass",
    role: "Software Engineer",
    location: "Amherst, MA",
    focus: "React · Performance · Real-Time UX",
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
    focus: "C++ · Controls · Competition Strategy",
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

const Index = () => {
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
    <PageLayout>
      <div id="home" className="space-y-6">
        <section className="grid gap-4 lg:gap-3 lg:grid-cols-[minmax(0,1.46fr)_minmax(0,1fr)]">
          <div className="min-w-0 relative rounded-2xl overflow-hidden border border-border/40 bg-card/20 min-h-[540px] lg:min-h-[672px]">
            <img
              src="/profile.jpg"
              alt="Justin Manoj in the city at sunset"
              className="w-full h-full object-cover object-center"
            />
            <div className="absolute inset-x-0 bottom-0 p-6 bg-gradient-to-t from-black/60 to-transparent">
              <h1 className="text-3xl font-semibold text-white tracking-tight">
                Justin Manoj
              </h1>
              <p className="text-white/85 mt-1">CS & Math @ UMass Amherst</p>
            </div>
          </div>

          <aside className="min-w-0 space-y-3 animate-fade-in">
            <div className="rounded-2xl border border-border/40 p-6 bg-card/20 backdrop-blur-sm">
              <div>
                <p className="text-xs font-mono uppercase tracking-[0.18em] text-muted-foreground">
                  Education
                </p>
                <h2 className="mt-2 text-[16px] font-semibold text-foreground leading-tight">
                  University of <span className="whitespace-nowrap">Massachusetts Amherst</span>
                </h2>
              </div>

              <p className="mt-1 text-[14px] tracking-tight text-foreground/90 leading-relaxed whitespace-nowrap">
                B.S in Computer Science & Mathematics
              </p>

              <p className="mt-6 text-xs font-mono uppercase tracking-[0.18em] text-muted-foreground">
                Relevant Coursework
              </p>
              <p className="mt-1 text-[13px] text-muted-foreground leading-relaxed">
                {coursework}
              </p>

              <p className="mt-6 text-xs font-mono uppercase tracking-[0.18em] text-muted-foreground">
                Awards/Honors
              </p>
              <p className="mt-1 text-[13px] text-muted-foreground leading-relaxed">
                {honors}
              </p>

              <p className="mt-6 text-xs font-mono uppercase tracking-[0.18em] text-muted-foreground">
                Technical Skills
              </p>
              <div className="mt-1.5 space-y-2">
                {technicalSkills.map((skillGroup) => (
                  <div key={skillGroup.title}>
                    <p className="text-[13px] font-medium text-foreground/90">{skillGroup.title}</p>
                    <p className="text-[13px] text-muted-foreground leading-relaxed">
                      {skillGroup.items}
                    </p>
                  </div>
                ))}
              </div>

              <a
                href="/resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 mt-4 text-sm font-medium text-foreground/80 hover:text-accent transition-colors"
              >
                View Resume
                <ArrowUpRight className="w-4 h-4" />
              </a>
            </div>

            <SpotifyLastPlayed />
          </aside>
        </section>

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

                <div className="mt-2.5 space-y-0.5">
                  <p className="text-[15px] font-semibold leading-snug text-foreground">{experience.company}</p>
                  {experience.companySecondary ? (
                    <p className="text-[13px] font-semibold leading-snug text-foreground/75">
                      {experience.companySecondary}
                    </p>
                  ) : null}
                </div>
                <h3 className="mt-1 text-[15px] font-medium leading-snug text-foreground/90">
                  {experience.role}
                </h3>
                <p className="mt-2.5 text-[13px] leading-relaxed text-muted-foreground">{experience.summary}</p>
                <p className="mt-3 text-[10px] font-mono uppercase tracking-[0.09em] text-foreground/60">
                  {experience.focus}
                </p>

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
                      <p className="text-[13px] leading-relaxed text-muted-foreground/95">{project.summary}</p>
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

        <div className="hidden md:block fixed left-4 lg:left-6 top-1/2 -translate-y-1/2 z-40">
          <div className="rounded-3xl border border-border/50 bg-background/70 backdrop-blur-2xl p-2 shadow-[0_20px_44px_rgba(0,0,0,0.25)]">
            <div className="flex flex-col gap-1.5">
              {socialLinks.map((social) => {
                const Icon = social.icon;
                const isEmailLink = social.href.startsWith("mailto:");
                return (
                  <a
                    key={social.label}
                    href={social.href}
                    target={isEmailLink ? undefined : "_blank"}
                    rel={isEmailLink ? undefined : "noopener noreferrer"}
                    aria-label={social.label}
                    className="group rounded-2xl border border-border/40 p-2.5 bg-card/20 backdrop-blur-sm hover:border-accent/50 hover:shadow-[0_0_20px_rgba(99,102,241,0.15)] hover:-translate-y-0.5 transition-all duration-300"
                  >
                    <Icon className="w-7 h-7 text-foreground/80 group-hover:text-accent transition-colors" />
                  </a>
                );
              })}
            </div>
          </div>
        </div>

        <div className="md:hidden flex flex-wrap justify-center gap-4 border-t border-border/40 pt-6">
          {socialLinks.map((social) => {
            const Icon = social.icon;
            const isEmailLink = social.href.startsWith("mailto:");
            return (
              <a
                key={social.label}
                href={social.href}
                target={isEmailLink ? undefined : "_blank"}
                rel={isEmailLink ? undefined : "noopener noreferrer"}
                aria-label={social.label}
                className="group rounded-2xl border border-border/40 p-4 bg-card/20 backdrop-blur-sm hover:border-accent/50 hover:shadow-[0_0_20px_rgba(99,102,241,0.15)] hover:-translate-y-0.5 transition-all duration-300"
              >
                <Icon className="w-9 h-9 text-foreground/80 group-hover:text-accent transition-colors" />
              </a>
            );
          })}
        </div>
      </div>
    </PageLayout>
  );
};

export default Index;
