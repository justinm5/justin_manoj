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
} from "lucide-react";

const skillIcons: Record<string, React.ComponentType<{ className?: string }>> = {
  // Languages
  "Python": Code,
  "JavaScript": FileCode,
  "TypeScript": Brain,
  "Go": Code,
  "Java": Code,
  "C/C++": Code,
  "SQL": Database,
  "HTML/CSS": Palette,

  // Frontend
  "React": Zap,
  "React Native": Smartphone,

  // Backend
  "Node.js": Server,
  "Express.js": Zap,
  "Django": Server,
  "Flask": Server,
  "Spring Boot": Server,

  // Cloud & DevOps
  "AWS": Cloud,
  "Docker": Container,
  "Kubernetes": Layers,
  "Kafka": MessageSquare,
  "Redis": Key,
  "CI/CD": GitBranch,
  "Git": GitBranch,
};

const skillsByCategory = {
  "Languages": ["Python", "Java", "C/C++","JavaScript", "TypeScript", "Go", "SQL", "HTML/CSS"],
  "Frontend": ["React", "React Native"],
  "Backend": ["Node.js", "Express.js", "Spring Boot", "Django", "Flask"],
  "Cloud & DevOps": ["AWS", "Docker", "Kubernetes", "Kafka", "Redis", "CI/CD", "Git"],
  "Data & ML": ["PyTorch", "Scikit-learn", "Pandas"],
};

export const SkillsSection = () => {
  return (
    <Section id="skills" title="Technical Skills">
      <div className="space-y-4">
        {Object.entries(skillsByCategory).map(([category, skills]) => (
          <div key={category}>
            <h3 className="text-lg font-semibold text-foreground mb-4 tracking-tight">
              {category}
            </h3>
            <div className="flex flex-wrap gap-3">
              {skills.map((skill) => {
                const Icon = skillIcons[skill] || Code;
                return (
                  <div
                    key={skill}
                    className="px-3 py-1.5 rounded-lg border border-border/40 bg-card/30 backdrop-blur-sm hover:border-accent/50 hover:shadow-[0_0_20px_rgba(99,102,241,0.15)] hover:-translate-y-1 transition-all duration-300 cursor-default flex items-center gap-1.5"
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
  );
};
