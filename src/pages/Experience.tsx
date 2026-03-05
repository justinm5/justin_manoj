import { PageLayout } from "@/components/PageLayout";
import { cn } from "@/lib/utils";

const experiences = [
  {
    title: "Software Engineer",
    company: "ChitChat Workplace",
    location: "Boston, MA",
    period: "May 2025 – Present",
    summary:
      "Built real-time messaging backend for 100k+ user concurrent messaging platform and launched enterprise pilots in 90 days.",
  },
  {
    title: "Software Engineer Intern",
    company: "GBCS Group",
    location: "Alberta, CA",
    period: "Mar 2025 – Sept 2025",
    summary:
      "Rebuilt core APIs with GraphQL and caching, reducing backend load and cutting dashboard load times by 65%.",
  },
  {
    title: "Research Assistant",
    company: "UMass Amherst - Autonomous Learning Lab",
    location: "Amherst, MA",
    period: "Nov 2024 – Apr 2025",
    summary:
      "Stress-tested multi-agent LLM systems, finding 14 failure modes in 10k+ simulations and improving analysis speed 3x.",
  },
  {
    title: "Software Engineer",
    company: "BUILD UMass",
    location: "Amherst, MA",
    period: "Sept 2024 – Present",
    summary:
      "Built and optimized campus events platform with faster search and reliable real-time updates for UMass students.",
  },
  {
    title: "Team Captain",
    company: "NRHS Robotics / FIRST & VEX Robotics",
    location: "Thiells, NY",
    period: "Sept 2022 - Jun 2023",
    summary:
      "Led C++ robotics software development and team execution for regional and national competitions.",
  },
];

const Experience = () => {
  return (
    <PageLayout>
      <section id="experience" className="mb-6 scroll-mt-20">
        <div className="space-y-3">
          <div className="relative p-2 md:p-3">
            <ol className="relative space-y-5 md:space-y-7 before:absolute before:bottom-4 before:left-[14px] before:-top-4 before:w-0 before:border-l-2 before:border-foreground/35 md:before:left-1/2 md:before:-translate-x-1/2">
              {experiences.map((experience, index) => {
                const isRight = index % 2 === 1;

                return (
                  <li key={`${experience.company}-${experience.period}`} className="relative">
                    <span className="absolute left-[14px] top-5 h-2.5 w-2.5 -translate-x-1/2 rounded-full bg-foreground/75 ring-4 ring-background md:left-1/2" />
                    <span className="absolute left-[14px] top-6 h-px w-6 border-t border-foreground/35 md:hidden" />
                    <span
                      className={cn(
                        "absolute top-6 hidden h-px w-8 border-t border-foreground/35 md:block",
                        isRight ? "left-1/2" : "right-1/2"
                      )}
                    />

                    <div
                      className={cn(
                        "pl-8 md:grid md:grid-cols-2 md:gap-8 md:pl-0",
                        isRight ? "md:[&>article]:col-start-2 md:[&>article]:ml-4" : "md:[&>article]:col-start-1 md:[&>article]:mr-4"
                      )}
                    >
                      <article className="group rounded-2xl border-2 border-foreground/35 ring-2 ring-foreground/20 bg-background/60 p-4 shadow-[0_10px_28px_rgba(0,0,0,0.18)] backdrop-blur-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-accent/55 hover:bg-background/75 md:p-5">
                        <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                          <div className="min-w-0">
                            <h3 className="text-[18px] font-semibold leading-snug tracking-tight text-foreground">
                              {experience.title}
                            </h3>
                            <p className="mt-1.5 text-[12px] text-muted-foreground">
                              <span className="font-mono uppercase tracking-[0.06em] text-foreground/90">
                                {experience.company}
                              </span>{" "}
                              <span className="text-muted-foreground/55">·</span>{" "}
                              <span className="whitespace-nowrap">{experience.location}</span>
                            </p>
                          </div>
                          <span className="shrink-0 whitespace-nowrap rounded-md border border-border/40 bg-background/50 px-2 py-0.5 text-[10px] font-mono text-muted-foreground">
                            {experience.period}
                          </span>
                        </div>
                        <p className="mt-3 text-[15px] leading-relaxed text-muted-foreground/95">
                          {experience.summary}
                        </p>
                      </article>
                    </div>
                  </li>
                );
              })}
            </ol>
          </div>
        </div>
      </section>
    </PageLayout>
  );
};

export default Experience;
