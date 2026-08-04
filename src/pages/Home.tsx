import { PageLayout } from "@/components/PageLayout";
import { SkillsMarquee } from "@/components/SkillsMarquee";
import { SpotifyLastPlayed } from "@/components/SpotifyLastPlayed";
import { ExperiencePanel } from "@/components/panels/ExperiencePanel";
import { ProjectsPanel } from "@/components/panels/ProjectsPanel";
import { ReadingPanel } from "@/components/panels/ReadingPanel";

const sectionTitleClass = "mb-6 text-sm font-medium text-[#52525b]";

const coursework = [
  "Algorithms",
  "Data Structures",
  "Operating Systems",
  "Machine Learning",
  "Databases",
  "Web Programming",
  "Scalable Web Systems",
  "Data Science",
];

const topSkills = [
  "Go",
  "Python",
  "Java",
  "TypeScript",
  "React",
  "Node.js",
  "Docker",
  "Kubernetes",
  "PostgreSQL",
  "Redis",
  "Git",
];

const ArrowIcon = () => (
  <svg
    viewBox="0 0 16 16"
    aria-hidden="true"
    className="mt-[0.2em] h-[0.7em] w-[0.7em] shrink-0 text-[#52525b] transition-transform duration-200 ease-out group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
  >
    <path
      d="M4.5 11.5 11.5 4.5M11.5 4.5H6M11.5 4.5V10"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      fill="none"
    />
  </svg>
);

const contactLinks = [
  { label: "GitHub", value: "justinm5", href: "https://github.com/justinm5" },
  { label: "LinkedIn", value: "justinmmanoj", href: "https://linkedin.com/in/justinmmanoj" },
  { label: "Email", value: "justinmmanoj@gmail.com", href: "mailto:justinmmanoj@gmail.com" },
  { label: "Resume", value: "View Resume", href: "/resume.pdf" },
];

const Home = () => (
  <PageLayout width="wide" contentClassName="py-16 px-6 max-w-xl sm:py-24 lg:px-6">
    <div className="space-y-10">
      <header className="flex items-center gap-4 sm:gap-5">
        <img
          src="/profile.jpg"
          alt="Justin Manoj"
          width="80"
          height="80"
          className="h-16 w-16 shrink-0 rounded-full object-cover sm:h-20 sm:w-20"
        />
        <div className="min-w-0">
          <h1 className="text-lg font-medium text-foreground sm:text-xl">Justin Manoj</h1>
          <p className="text-base text-[#a1a1aa]">CS &amp; Math at UMass Amherst</p>
        </div>
      </header>

      <section id="about">
        <h2 className={sectionTitleClass}>About</h2>
        <div className="space-y-7">
          <p className="max-w-prose leading-relaxed text-[#a1a1aa]">
            CS &amp; Math student at UMass Amherst focused on backend systems, data
            pipelines, and quantitative engineering.
          </p>
        </div>
      </section>

      <section id="work">
        <h2 className={sectionTitleClass}>Work Experience</h2>
        <ExperiencePanel />
      </section>

      <section id="projects">
        <h2 className={sectionTitleClass}>Projects</h2>
        <ProjectsPanel />
      </section>

      <section id="listening">
        <h2 className={sectionTitleClass}>Listening To</h2>
        <SpotifyLastPlayed embedded />
      </section>

      <section id="bookshelf">
        <h2 className={sectionTitleClass}>Bookshelf</h2>
        <ReadingPanel />
      </section>

      <section id="education">
        <h2 className={sectionTitleClass}>Education</h2>
        <div className="space-y-7">
          <div className="flex gap-4 sm:gap-8">
            <div className="w-16 shrink-0 pt-0.5 text-sm tabular-nums text-[#52525b] sm:w-28">
              2023 — 2027
            </div>
            <div className="min-w-0 flex-1">
              <span className="font-medium text-foreground">B.S. Computer Science &amp; Mathematics</span>
              <span className="block text-sm text-[#a1a1aa]">University of Massachusetts Amherst</span>
              <p className="mt-0.5 text-sm text-[#a1a1aa]">Amherst, MA</p>
              <div className="mt-3">
                <p className="mb-2 text-[11px] font-medium uppercase tracking-wider text-[#52525b]">Relevant Coursework</p>
                <div className="flex flex-wrap gap-2">
                  {coursework.map((course) => (
                    <span
                      key={course}
                      className="rounded-md border border-white/10 bg-card/30 px-2 py-1 text-xs text-[#a1a1aa]"
                    >
                      {course}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="skills">
        <h2 className={sectionTitleClass}>Technical Skills</h2>
        <SkillsMarquee skills={topSkills} />
      </section>

      <section id="contact">
        <h2 className={sectionTitleClass}>Contact</h2>
        <div className="space-y-7">
          {contactLinks.map((link) => (
            <div key={link.label} className="flex gap-4 sm:gap-8">
              <div className="w-16 shrink-0 pt-0.5 text-sm tabular-nums text-[#52525b] sm:w-28">
                {link.label}
              </div>
              <div className="min-w-0 flex-1">
                <a
                  href={link.href}
                  target={link.label === "Email" ? undefined : "_blank"}
                  rel={link.label === "Email" ? undefined : "noopener noreferrer"}
                  className="group inline-flex items-start gap-1 underline-offset-4 hover:underline font-medium text-foreground"
                >
                  <span>{link.value}</span>
                  <ArrowIcon />
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  </PageLayout>
);

export default Home;
