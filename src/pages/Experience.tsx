import { PageLayout } from "@/components/PageLayout";
import { Section } from "@/components/Section";

const experiences = [
  {
    title: "Co-Founder / Software Engineer",
    company: "ChitChat Workplace",
    location: "Boston, MA",
    period: "May 2025 – Present",
    summary:
      "Built real-time backend for 100k+ user concurrent messaging platform and launched enterprise pilots in 90 days.",
  },
  {
    title: "Software Engineering Intern",
    company: "GBCS Group",
    location: "Alberta, CA",
    period: "Mar 2025 – Sept 2025",
    summary:
      "Rebuilt core APIs with GraphQL and caching, reducing backend load and cutting dashboard load times by 65%.",
  },
  {
    title: "Research Assistant",
    company: "University of Massachusetts Amherst (Autonomous Learning Lab)",
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
    company: "North Rockland High School Robotics / FIRST & VEX Robotics",
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
        <div className="rounded-2xl border border-border/40 bg-card/20 backdrop-blur-sm p-4 md:p-5">
          <ol className="relative border-l border-border/60 pl-5 space-y-4">
            {experiences.map((experience) => (
              <li key={`${experience.company}-${experience.period}`} className="relative">
                <span className="absolute -left-[1.6rem] top-3 h-2.5 w-2.5 rounded-full bg-foreground/75 ring-4 ring-background" />
                <article className="rounded-xl border border-border/40 bg-background/25 p-4 md:p-5">
                  <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                    <h3 className="text-[18px] font-semibold tracking-tight text-foreground">
                      {experience.title}
                    </h3>
                    <span className="shrink-0 text-[11px] text-muted-foreground whitespace-nowrap font-mono px-2 py-0.5 rounded-md border border-border/40 bg-background/40">
                      {experience.period}
                    </span>
                  </div>
                  <p className="mt-1.5 text-[12px] font-mono uppercase tracking-[0.08em] text-foreground/90">
                    {experience.company} <span className="text-muted-foreground/60">·</span>{" "}
                    {experience.location}
                  </p>
                  <p className="mt-3 text-[15px] leading-relaxed text-muted-foreground/95">
                    {experience.summary}
                  </p>
                </article>
              </li>
            ))}
          </ol>
        </div>
      </Section>
    </PageLayout>
  );
};

export default Experience;
