import { PageLayout } from "@/components/PageLayout";
import { ArrowUpRight, Award, BookOpen, Cpu, GraduationCap } from "lucide-react";
import { SpotifyLastPlayed } from "@/components/SpotifyLastPlayed";
import { UMassBadge } from "@/components/UMassBadge";

const coursework =
  "Algorithms, Data Structures, Operating Systems, Databases, Computer Networks & Security, Machine Learning, Web Programming, Scalable Web Systems, Discrete Mathematics";

const honors =
  "Dean’s List, Chancellor’s Award, NYS Award for Academic Excellence, AP Scholar with Distinction, National Merit Scholar, Honors College";

const technicalSkills = [
  {
    title: "Languages",
    items: "Python · Java · C · C++ · JavaScript · TypeScript · SQL",
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

const Index = () => {
  return (
    <PageLayout width="wide" contentClassName="pb-0">
      <div id="home" className="flex flex-col">
        <section className="grid gap-3 lg:gap-4 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)]">
          <div className="min-w-0 relative rounded-2xl overflow-hidden bg-card/20 h-[300px] sm:h-[360px] lg:h-[720px]">
            <img
              src="/profile.jpg"
              alt="Justin Manoj"
              className="w-full h-full object-cover object-center"
            />
            <div className="absolute inset-x-0 bottom-0 p-5 bg-gradient-to-t from-black/60 to-transparent">
              <h1 className="text-3xl font-semibold text-white tracking-tight">
                Justin Manoj
              </h1>
              <p className="text-white/85 mt-1">CS & Math @ UMass Amherst</p>
            </div>
          </div>

          <aside className="min-w-0 flex flex-col gap-3 h-full">
            <div className="rounded-2xl p-5 sm:p-6 bg-card/35 border border-white/12 shadow-[0_28px_80px_rgba(0,0,0,0.75),0_8px_24px_rgba(0,0,0,0.45),inset_0_1px_0_rgba(255,255,255,0.12)] relative overflow-hidden">
              <div>
                <p className="flex items-center gap-2 text-xs font-mono uppercase tracking-[0.18em] text-muted-foreground">
                  <GraduationCap className="h-3.5 w-3.5" />
                  Education
                </p>
                <div className="mt-3 flex items-start gap-3">
                  <UMassBadge className="h-12 w-12 shrink-0" />
                  <div>
                    <h2 className="text-[17px] font-semibold text-foreground leading-tight">
                      University of <span className="whitespace-nowrap">Massachusetts Amherst</span>
                    </h2>
                    <p className="mt-1 text-[16px] tracking-tight text-foreground/90 leading-relaxed whitespace-nowrap">
                      B.S in Computer Science & Mathematics
                    </p>
                  </div>
                </div>
              </div>

              <p className="mt-6 flex items-center gap-2 text-xs font-mono uppercase tracking-[0.18em] text-muted-foreground">
                <BookOpen className="h-3.5 w-3.5" />
                Relevant Coursework
              </p>
              <p className="mt-1 text-[14px] text-muted-foreground leading-relaxed">
                {coursework}
              </p>

              <p className="mt-6 flex items-center gap-2 text-xs font-mono uppercase tracking-[0.18em] text-muted-foreground">
                <Award className="h-3.5 w-3.5" />
                Awards/Honors
              </p>
              <p className="mt-1 text-[14px] text-muted-foreground leading-relaxed">
                {honors}
              </p>

              <p className="mt-6 flex items-center gap-2 text-xs font-mono uppercase tracking-[0.18em] text-muted-foreground">
                <Cpu className="h-3.5 w-3.5" />
                Technical Skills
              </p>
              <div className="mt-2 space-y-2">
                {technicalSkills.map((skillGroup) => (
                  <div key={skillGroup.title}>
                    <p className="text-[14px] font-medium text-foreground/90">
                      {skillGroup.title}
                    </p>
                    <p className="text-[14px] text-muted-foreground leading-relaxed">
                      {skillGroup.items}
                    </p>
                  </div>
                ))}
              </div>

              <a
                href="/resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 mt-6 text-sm font-medium text-foreground/80 hover:text-accent transition-colors"
              >
                View Resume
                <ArrowUpRight className="w-4 h-4" />
              </a>
            </div>

            <div className="min-w-0 mt-auto">
              <SpotifyLastPlayed />
            </div>
          </aside>
        </section>
      </div>
    </PageLayout>
  );
};

export default Index;
