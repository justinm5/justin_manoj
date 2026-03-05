import { PageLayout } from "@/components/PageLayout";
import { Section } from "@/components/Section";
import { cn } from "@/lib/utils";

const experiences = [
  {
    title: "Software Engineer",
    company: "ChitChat Workplace",
    location: "Boston, MA",
    period: "May 2025 – Present",
    summary:
      "Built real-time backend for 100k+ user concurrent messaging platform and launched enterprise pilots in 90 days.",
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
      "Tested multi-agent LLM systems, finding 14 failure modes in 10k+ simulations and improving analysis speed 3x.",
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
      <Section id="experience" title="Experience">
        <div className="relative p-2 md:p-3">
          <ol className="relative space-y-5 md:space-y-7 before:absolute before:bottom-4 before:left-[14px] before:top-4 before:w-px before:bg-gradient-to-b before:from-border/20 before:via-border/90 before:to-border/20 md:before:left-1/2 md:before:-translate-x-1/2">
            {experiences.map((experience, index) => {
              const isRight = index % 2 === 1;

              return (
                <li key={`${experience.company}-${experience.period}`} className="relative">
                  <span className="absolute left-[14px] top-5 h-2.5 w-2.5 -translate-x-1/2 rounded-full bg-foreground/75 ring-4 ring-background md:left-1/2" />

                  <div
                    className={cn(
                      "pl-8 md:grid md:grid-cols-2 md:gap-8 md:pl-0",
                      isRight ? "md:[&>article]:col-start-2 md:[&>article]:ml-4" : "md:[&>article]:col-start-1 md:[&>article]:mr-4"
                    )}
                  >
                    <article className="group rounded-2xl border border-border/40 bg-transparent p-4 transition-all duration-300 hover:-translate-y-0.5 hover:border-accent/40 md:p-5">
                      <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                        <div className="min-w-0">
                          <h3 className="text-[18px] font-semibold leading-snug tracking-tight text-foreground">
                            {experience.title}
                          </h3>
                          <p className="mt-1.5 text-[13px] text-muted-foreground">
                            <span className="font-mono uppercase tracking-[0.06em] text-foreground/90">
                              {experience.company}
                            </span>{" "}
                            <span className="text-muted-foreground/55">·</span>{" "}
                            <span className="whitespace-nowrap">{experience.location}</span>
                          </p>
                        </div>
                        <span className="shrink-0 whitespace-nowrap rounded-md border border-border/40 bg-background/50 px-2 py-0.5 text-[11px] font-mono text-muted-foreground">
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
      </Section>
    </PageLayout>
  );
};

export default Experience;
