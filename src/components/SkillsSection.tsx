import { Section } from "@/components/Section";

const skillsData = [
  { name: "JavaScript", icon: "⚡" },
  { name: "TypeScript", icon: "📘" },
  { name: "Python", icon: "🐍" },
  { name: "React", icon: "⚛️" },
  { name: "Next.js", icon: "▲" },
  { name: "Node.js", icon: "🟢" },
  { name: "Go", icon: "🔷" },
  { name: "PostgreSQL", icon: "🐘" },
  { name: "MongoDB", icon: "🍃" },
  { name: "Redis", icon: "🔴" },
  { name: "Docker", icon: "🐳" },
  { name: "AWS", icon: "☁️" },
  { name: "PyTorch", icon: "🔥" },
  { name: "TensorFlow", icon: "🧠" },
  { name: "Git", icon: "📦" },
];

export const SkillsSection = () => {
  return (
    <Section id="skills" title="Skills">
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {skillsData.map((skill) => (
          <div
            key={skill.name}
            className="group flex flex-col items-center gap-3 p-6 rounded-xl border border-border/40 bg-card/20 backdrop-blur-sm hover:border-border/60 hover:bg-card/40 transition-all duration-300 hover:scale-105 cursor-pointer"
          >
            <span className="text-4xl group-hover:scale-110 transition-transform duration-300">
              {skill.icon}
            </span>
            <span className="text-sm font-medium text-foreground/80 group-hover:text-foreground transition-colors">
              {skill.name}
            </span>
          </div>
        ))}
      </div>
    </Section>
  );
};
