import { Section } from "@/components/Section";

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
              {skills.map((skill) => (
                <div
                  key={skill}
                  className="px-3 py-1.5 rounded-lg border border-border/40 bg-card/30 backdrop-blur-sm hover:border-accent/50 hover:shadow-[0_0_20px_rgba(99,102,241,0.15)] hover:-translate-y-1 transition-all duration-300 cursor-default"
                >
                  <span className="text-sm font-normal text-foreground/90">
                    {skill}
                  </span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
};
