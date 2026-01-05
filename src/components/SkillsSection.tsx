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
  Shell,
} from "lucide-react";

const skillIcons: Record<string, React.ComponentType<{ className?: string }>> = {
  // Languages - More distinct icons
  "Python": Code,
  "JavaScript": FileCode,
  "TypeScript": Brain, // Could use a variant if available
  "Java": Code,
  "C": Code,
  "C++": Code,
  "SQL": Database,
  "HTML/CSS": Palette, // Changed from FileCode - represents styling


  // Frameworks & Tools - More variety
  "React": Zap,
  "React Native": Smartphone,
  "Next.js": Zap,
  "Tailwind": Palette,
  "Spring Boot": Layers, // Changed - represents layered architecture
  "FastAPI": Server,
  "Node.js": Server,
  "Express.js": Zap,

  // Cloud, Infrastructure & DevOps
  "Docker": Container,
  "Kubernetes": Layers, // Changed - orchestration/layers
  "AWS": Cloud,
  "Azure": Cloud,
  "CI/CD": GitBranch,
  "Kafka": MessageSquare,

  // Data Systems - Better distinction
  "PostgreSQL": Database,
  "MongoDB": Database,
  "Redis": Key, // Changed - Redis = fast key-value store

  // Data Science & ML - More specific
  "Pandas": Table,
  "NumPy": Calculator,
  "PyTorch": Brain,
  "TensorFlow": Brain,
  "Scikit-learn": BarChart,

  // APIs & Protocols - Better variety
  "GraphQL": Network,
  "REST": Globe,
  "OpenAPI": Globe,
  "WebSockets": Network,
};

const skillsByCategory = {
  "Languages": ["Python", "JavaScript", "TypeScript", "Java", "C", "C++", "SQL"], // Core first
  "Frontend": ["React", "React Native", "Next.js", "Tailwind CSS"],
  "Backend": ["Spring Boot", "FastAPI", "Node.js", "Express.js"],
  "Cloud/DevOps": ["Docker", "Kubernetes", "AWS (Lambda, S3, Neptune, API Gateway)", "Azure", "CI/CD"],
  "Databases": ["PostgreSQL", "MongoDB", "Redis", "Kafka"],
  "Data/ML": ["Pandas", "NumPy", "PyTorch", "TensorFlow", "Scikit-learn"],
  "APIs": ["GraphQL", "REST", "OpenAPI", "WebSockets"]
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
