import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";

const skillCategories = [
  {
    title: "Languages",
    skills: [
      "JavaScript",
      "TypeScript",
      "Python",
      "Java",
      "C",
      "C++",
      "Go",
      "Rust",
      "HTML",
      "CSS",
      "SQL",
    ],
  },
  {
    title: "Frontend",
    skills: ["React", "Next.js", "Tailwind CSS", "Redux"],
  },
  {
    title: "Backend",
    skills: ["Flask", "Node.js", "Express", "GraphQL", "FastAPI"],
  },
  {
    title: "Databases",
    skills: ["MySQL", "PostgreSQL", "MongoDB", "Prisma", "Redis"],
  },
  {
    title: "Cloud & DevOps",
    skills: ["AWS", "Azure", "Docker", "Vercel", "Git", "Kubernetes", "CI/CD", "Kafka"],
  },
  {
    title: "Machine Learning & Data",
    skills: [
      "PyTorch",
      "Pandas",
      "NumPy",
      "Scikit-learn",
      "Jupyter Notebook",
      "Tableau",
      "LangChain",
      "Pinecone",
    ],
  },
  {
    title: "Tools & Other",
    skills: ["OAuth", "Jest", "LaTeX", "AutoCAD", "Arduino", "Postman", "REST APIs"],
  },
];

export const SkillsSection = () => {
  return (
    <section id="skills" className="py-16">
      <h2 className="text-2xl font-bold text-foreground mb-8">My Skills</h2>
      <div className="grid gap-6">
        {skillCategories.map((category) => (
          <Card key={category.title} className="p-6 hover:shadow-lg transition-shadow">
            <h3 className="text-lg font-semibold text-foreground mb-4">
              {category.title}
            </h3>
            <div className="flex flex-wrap gap-2">
              {category.skills.map((skill) => (
                <Badge
                  key={skill}
                  variant="secondary"
                  className="text-sm px-3 py-1 hover:bg-accent hover:text-accent-foreground transition-colors cursor-default"
                >
                  {skill}
                </Badge>
              ))}
            </div>
          </Card>
        ))}
      </div>
    </section>
  );
};
