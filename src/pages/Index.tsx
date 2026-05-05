import { PageLayout } from "@/components/PageLayout";
import { ArrowUpRight, Award, BookOpen, Cpu, GraduationCap } from "lucide-react";
import { SpotifyLastPlayed } from "@/components/SpotifyLastPlayed";
import { UMassBadge } from "@/components/UMassBadge";

const coursework =
  "Algorithms · Data Structures · Operating Systems · Machine Learning Databases · Web Programming · Scalable Web Systems · Data Science";

const honors =
  "Commonwealth Honors College · Dean’s List · Chancellor’s Award · NYS Academic Excellence · National Merit Scholar · AP Scholar with Distinction";

const technicalSkills = [
  {
    title: "Languages",
    items: "Python · Java · C++ · JavaScript / TypeScript · SQL",
  },
  {
    title: "Frameworks",
    items: "React · Node.js · Spring Boot · FastAPI · gRPC",
  },
  {
    title: "Machine Learning",
    items: "PyTorch · TensorFlow · Scikit-learn · NumPy · Pandas",
  },
  {
    title: "Systems & Infrastructure",
    items: "AWS · Docker · Kubernetes · PostgreSQL · Redis · Git  · Linux",
  },
];

const sectionLabelClass =
  "flex items-center gap-2 text-xs font-tabular-itf uppercase tracking-[0.14em] text-foreground/55";
const infoBodyClass = "text-[15px] text-foreground/66 leading-relaxed";

const Index = () => {
  return (
    <PageLayout width="wide" contentClassName="pb-0 max-w-[1280px]">
      <div id="home" className="flex flex-col">
        <section className="grid gap-3 lg:gap-3.5 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.95fr)] lg:items-stretch">
          <div className="min-w-0 relative w-full aspect-[3/4] rounded-2xl overflow-hidden border border-white/12 bg-black/20 shadow-[0_28px_80px_rgba(0,0,0,0.75),0_8px_24px_rgba(0,0,0,0.45),inset_0_1px_0_rgba(255,255,255,0.12)]">
            <img
              src="/profile.jpg"
              alt="Justin Manoj"
              className="h-full w-full object-contain object-center"
            />
            <div className="absolute inset-x-0 bottom-0 p-4 bg-gradient-to-t from-black/70 to-transparent">
              <h1 className="text-3xl font-semibold text-white tracking-tight">
                Justin Manoj
              </h1>
              <p className="text-white/85 mt-1">CS & Math @ UMass Amherst</p>
            </div>
          </div>

          <aside className="min-w-0 flex flex-col gap-3 lg:h-full">
            <div className="rounded-2xl p-5 sm:p-6 bg-card/35 border border-white/12 shadow-[0_28px_80px_rgba(0,0,0,0.75),0_8px_24px_rgba(0,0,0,0.45),inset_0_1px_0_rgba(255,255,255,0.12)] relative overflow-hidden flex h-full flex-col">
              <div className="space-y-5">
                <div className="space-y-3.5">
                  <p className={sectionLabelClass}>
                    <GraduationCap className="h-3.5 w-3.5" />
                    Education
                  </p>
                  <div className="flex items-start gap-3">
                    <UMassBadge className="h-12 w-12 shrink-0" />
                    <div>
                      <h2 className="text-[18px] font-semibold text-foreground/88 leading-tight">
                        University of <span className="whitespace-nowrap">Massachusetts Amherst</span>
                      </h2>
                      <p className="mt-0.5 text-[16px] tracking-tight text-foreground/68 leading-relaxed whitespace-nowrap">
                        B.S, Computer Science & Mathematics
                      </p>
                    </div>
                  </div>
                </div>

                <div className="space-y-2.5">
                  <p className={sectionLabelClass}>
                    <BookOpen className="h-3.5 w-3.5" />
                    Relevant Coursework
                  </p>
                  <p className={infoBodyClass}>
                    {coursework}
                  </p>
                </div>

                <div className="space-y-2.5">
                  <p className={sectionLabelClass}>
                    <Award className="h-3.5 w-3.5" />
                    Awards/Honors
                  </p>
                  <p className={infoBodyClass}>
                    {honors}
                  </p>
                </div>

                <div className="space-y-3.5">
                  <p className={sectionLabelClass}>
                    <Cpu className="h-3.5 w-3.5" />
                    Technical Skills
                  </p>
                  <div className="space-y-4">
                    {technicalSkills.map((skillGroup) => (
                      <div key={skillGroup.title} className="space-y-2">
                        <p className="flex items-center gap-2.5 px-0.5 py-0.5 text-[12px] font-tabular-itf uppercase tracking-[0.14em] text-foreground/62">
                          <span>{skillGroup.title}</span>
                          <span className="h-px flex-1 bg-gradient-to-r from-white/22 to-transparent" />
                        </p>
                        <p className="text-[15px] text-foreground/70 leading-relaxed">
                          {skillGroup.items}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <a
                href="/resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 mt-8 text-sm font-medium text-foreground/68 hover:text-foreground/88 transition-colors"
              >
                View Resume
                <ArrowUpRight className="w-4 h-4" />
              </a>

              <div className="mt-5 border-t border-white/12 pt-4 lg:mt-auto">
                <SpotifyLastPlayed embedded />
              </div>
            </div>
          </aside>
        </section>
      </div>
    </PageLayout>
  );
};

export default Index;
