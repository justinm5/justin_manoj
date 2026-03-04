import { PageLayout } from "@/components/PageLayout";
import type { ComponentType } from "react";
import { ArrowUpRight, Github, Instagram, Linkedin, Mail } from "lucide-react";
import { SpotifyLastPlayed } from "@/components/SpotifyLastPlayed";

type IconComponent = ComponentType<{ className?: string }>;

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
  "Algorithms & Data Structures, Distributed Systems, Operating Systems, Databases, Computer Networks & Security, Machine Learning, Web Programming, Discrete Mathematics";

const honors =
  "Dean's List, Chancellor's Award, NYS Award for Academic Excellence, AP Scholar with Distinction, National Merit Commended Scholar, Commonwealth Honors College";

const technicalSkills = [
  {
    title: "Languages",
    items: "Python · Java · C · C++ · TypeScript · SQL",
  },
  {
    title: "Frameworks",
    items: "React · Node.js · Spring Boot · FastAPI · gRPC",
  },
  {
    title: "Machine Learning",
    items: "PyTorch · TensorFlow · Scikit-learn · LangChain",
  },
  {
    title: "Systems & Infrastructure",
    items: "PostgreSQL · Redis · Docker · Kubernetes · AWS",
  },
];

const Index = () => {
  return (
    <PageLayout>
      <div id="home" className="space-y-8">
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
                <h2 className="mt-1 text-base font-semibold text-foreground leading-tight">
                  University of <span className="whitespace-nowrap">Massachusetts Amherst</span>
                </h2>
              </div>

              <p className="mt-2 text-[12px] tracking-tight text-foreground/90 leading-relaxed whitespace-nowrap">
                B.S in Computer Science & Mathematics · May 2027
              </p>

              <p className="mt-5 text-xs font-mono uppercase tracking-[0.18em] text-muted-foreground">
                Relevant Coursework
              </p>
              <p className="mt-1 text-[13px] text-muted-foreground leading-relaxed">
                {coursework}
              </p>

              <p className="mt-5 text-xs font-mono uppercase tracking-[0.18em] text-muted-foreground">
                Awards/Honors
              </p>
              <p className="mt-1 text-[13px] text-muted-foreground leading-relaxed">
                {honors}
              </p>

              <p className="mt-5 text-xs font-mono uppercase tracking-[0.18em] text-muted-foreground">
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

        <div className="hidden md:block fixed right-4 lg:right-6 top-1/2 -translate-y-1/2 z-40">
          <div className="rounded-3xl border border-border/50 bg-background/70 backdrop-blur-2xl p-2 shadow-[0_20px_44px_rgba(0,0,0,0.25)]">
            <div className="flex flex-col gap-1.5">
              {socialLinks.map((social) => {
                const Icon = social.icon;
                return (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
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
            return (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
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
