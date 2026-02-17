import { Section } from "@/components/Section";
import {
  Code,
  Database,
  FileCode,
  Server,
  Zap,
  Layers,
  Palette,
  Smartphone,
  Cloud,
  Container,
  GitBranch,
  MessageSquare,
  Key,
  Brain,
  Network,
  Cpu,
  BookOpen,
} from "lucide-react";

const courseIcons: Record<string, React.ComponentType<{ className?: string }>> = {
  "Data Structures & Algorithms": Brain,
  "Operating Systems": Server,
  "Software Engineering": Layers,
  "Database Systems": Database,
  "Computer Networks": Network,
  "Security & Systems": Key,
  "Machine Learning": Cpu,
  "Advanced Algorithms": Zap,
};

const skillIcons: Record<string, React.ComponentType<{ className?: string }>> = {
  // Languages
  "Python": Code,
  "Java": Code,
  "C": Code,
  "C++": Code,
  "JavaScript": FileCode,
  "TypeScript": FileCode,
  "Go": Cpu,
  "SQL": Database,

  // Frontend
  "React": Zap,
  "React Native": Smartphone,
  "Next.js": Zap,

  // Backend
  "Node.js": Server,
  "Express.js": Server,
  "Spring Boot": Server,
  "Django": Server,
  "Flask": Server,

  // Cloud & DevOps
  "AWS": Cloud,
  "Docker": Container,
  "Kubernetes": Container,
  "Kafka": MessageSquare,
  "Redis": Key,
  "CI/CD": GitBranch,
  "Git": GitBranch,

  // Data & ML
  "PyTorch": Brain,
  "Scikit-learn": Brain,
  "Pandas": Layers,
};

const skillsByCategory = {
  "Languages": ["Python", "Java", "C", "C++","JavaScript", "TypeScript", "Go", "SQL"],
  "Frontend": ["React", "React Native", "Next.js"],
  "Backend": ["Node.js", "Express.js", "Spring Boot", "Django", "Flask"],
  "Cloud & DevOps": ["AWS", "Docker", "Kubernetes", "Kafka", "Redis", "CI/CD", "Git"],
  "Data & ML": ["PyTorch", "Scikit-learn", "Pandas"],
};

export const SkillsSection = () => {
  const relevantCourses = ["Data Structures & Algorithms", "Operating Systems", "Software Engineering", "Database Systems", "Computer Networks", "Security & Systems", "Machine Learning", "Scalable Web Systems"];
  return (
    <>
      <Section id="coursework" title="Relevant Coursework">
        <div className="flex flex-wrap gap-3">
          {relevantCourses.map((course) => {
            const Icon = courseIcons[course] || BookOpen;
            return (
              <div
                key={course}
                className="px-3 py-1.5 rounded-lg border border-border/40 bg-card/30 backdrop-blur-sm hover:border-accent/50 hover:shadow-[0_0_20px_rgba(99,102,241,0.15)] transition-all duration-300 cursor-default flex items-center gap-1.5"
              >
                <Icon className="w-3.5 h-3.5 text-foreground/70" />
                <span className="text-sm font-normal text-foreground/90">
                  {course}
                </span>
              </div>
            );
          })}
        </div>
      </Section>

      <Section id="skills" title="Technical Skills">
        <div className="space-y-2">
          {Object.entries(skillsByCategory).map(([category, skills]) => (
            <div key={category}>
              <h3 className="text-lg font-semibold text-foreground mb-2 tracking-tight">
                {category}
              </h3>
              <div className="flex flex-wrap gap-3">
                {skills.map((skill) => {
                  const Icon = skillIcons[skill] || Code;
                  return (
                    <div
                      key={skill}
                      className="px-3 py-1.5 rounded-lg border border-border/40 bg-card/30 backdrop-blur-sm hover:border-accent/50 hover:shadow-[0_0_20px_rgba(99,102,241,0.15)] transition-all duration-300 cursor-default flex items-center gap-1.5"
                    >
                      <Icon className="w-3.5 h-3.5 text-foreground/70" />
                      <span className="text-sm font-normal text-foreground/90">
                        {skill}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </Section>
    </>
  );
};
