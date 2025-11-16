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
  Workflow,
  MessageSquare,
  Key,
  Network,
  Globe,
  Brain,
  Table,
  Calculator,
  BarChart,
} from "lucide-react";

const skillIcons: Record<string, React.ComponentType<{ className?: string }>> = {
  // Languages
  "Python": Code,
  "Java": Code,
  "C/C++": Code,
  "JavaScript": FileCode,
  "TypeScript": FileCode,
  "SQL": Database,
  "HTML/CSS": FileCode,
  
  // Frameworks & Tools
  "React": Zap,
  "Next.js": Zap,
  "Node.js": Server,
  "Express": Server,
  "FastAPI": Zap,
  "Flask": Zap,
  "Redux": Layers,
  "Tailwind CSS": Palette,
  "React Native": Smartphone,
  
  // Cloud, Infrastructure & DevOps
  "AWS": Cloud,
  "Azure": Cloud,
  "Kubernetes": Container,
  "Docker": Container,
  "CI/CD": Workflow,
  "Kafka": MessageSquare,
  "Git/GitHub": GitBranch,
  "OAuth 2.0": Key,
  
  // Data Systems, Machine Learning, & APIs
  "PostgreSQL": Database,
  "MongoDB": Database,
  "MySQL": Database,
  "Redis": Database,
  "GraphQL": Network,
  "Prisma": Database,
  "REST APIs": Globe,
  "PyTorch": Brain,
  "Scikit-learn": Brain,
  "Pandas": Table,
  "NumPy": Calculator,
  "Tableau": BarChart,
};

const skillsByCategory = {
  "Languages": [
    "Python", "Java", "C/C++", "JavaScript", "TypeScript", "SQL", "HTML/CSS"
  ],
  "Frameworks & Tools": [
    "React", "Next.js", "Node.js", "Express", "FastAPI", "Flask", "Redux", "Tailwind CSS", "React Native"
  ],
  "Cloud, Infrastructure & DevOps": [
    "AWS", "Azure", "Kubernetes", "Docker", "CI/CD", "Kafka", "Git/GitHub", "OAuth 2.0"
  ],
  "Data Systems, Machine Learning, & APIs": [
    "PostgreSQL", "MongoDB", "MySQL", "Redis", "GraphQL", "Prisma", "REST APIs", "PyTorch", "Scikit-learn", "Pandas", "NumPy", "Tableau"
  ]
};

export const SkillsSection = () => {
  return (
    <Section id="skills" title="Technical Skills">
      <div className="space-y-8">
        {Object.entries(skillsByCategory).map(([category, skills]) => (
          <div key={category}>
            <h3 className="text-lg font-semibold text-foreground mb-4 tracking-tight">
              {category}
            </h3>
            <div className="flex flex-wrap gap-2">
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
