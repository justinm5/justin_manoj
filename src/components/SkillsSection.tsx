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
  Terminal,
} from "lucide-react";

const skillIcons: Record<string, React.ComponentType<{ className?: string }>> = {
  // Languages
  "Python": Code,
  "JavaScript": FileCode,
  "TypeScript": FileCode,
  "Java": Code,
  "C++": Code,
  "SQL": Database,
  "HTML/CSS": FileCode,
  "Bash/Shell": Terminal,

  // Frameworks & Tools
  "React": Zap,
  "React Native": Smartphone,
  "Next.js": Zap,
  "Tailwind": Palette,
  "Spring Boot": Zap,
  "FastAPI": Zap,
  "Node.js": Server,
  "Express.js": Server,

  // Cloud, Infrastructure & DevOps
  "Docker": Container,
  "Kubernetes": Container,
  "AWS": Cloud,
  "Azure": Cloud,
  "CI/CD": Workflow,
  "Kafka": MessageSquare,

  // Data Systems, Machine Learning, & APIs
  "PostgreSQL": Database,
  "MongoDB": Database,
  "Redis": Database,
  "Pandas": Table,
  "NumPy": Calculator,
  "PyTorch": Brain,
  "TensorFlow": Brain,
  "Scikit-learn": Brain,
  "GraphQL": Network,
  "REST": Globe,
  "OpenAPI": Globe,
  "Websockets": Network,
};

const skillsByCategory = {
  "Languages": [
    "Python", "JavaScript", "TypeScript", "Java", "C++", "SQL", "HTML/CSS", "Bash/Shell"
  ],
  "Frameworks & Libraries": [
    "React", "React Native", "Next.js", "Tailwind", "Spring Boot", "FastAPI", "Node.js", "Express.js"
  ],
  "Cloud, DevOps & Infrastructure": [
    "Docker", "Kubernetes", "AWS", "Azure", "CI/CD", "Kafka"
  ],
  "Databases & Data Systems": [
    "PostgreSQL", "MongoDB", "Redis"
  ],
  "Data Science & Machine Learning": [
    "Pandas", "NumPy", "PyTorch", "TensorFlow", "Scikit-learn"
  ],
  "APIs & Protocols": [
    "GraphQL", "REST", "OpenAPI", "WebSockets"
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
