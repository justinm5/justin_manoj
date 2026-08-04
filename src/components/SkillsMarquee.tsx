import { useState } from "react";

interface SkillsMarqueeProps {
  skills: string[];
}

const iconBase = "https://cdn.jsdelivr.net/gh/devicons/devicon/icons";

const iconMap: Record<string, string> = {
  go: "go/go-original-wordmark",
  python: "python/python-original",
  java: "java/java-original",
  typescript: "typescript/typescript-original",
  javascript: "javascript/javascript-original",
  react: "react/react-original",
  "node.js": "nodejs/nodejs-original",
  nodejs: "nodejs/nodejs-original",
  "spring boot": "spring/spring-original",
  spring: "spring/spring-original",
  docker: "docker/docker-original",
  kubernetes: "kubernetes/kubernetes-plain",
  aws: "amazonwebservices/amazonwebservices-original-wordmark",
  postgresql: "postgresql/postgresql-original",
  postgres: "postgresql/postgresql-original",
  redis: "redis/redis-original",
  git: "git/git-original",
  github: "github/github-original",
  pytorch: "pytorch/pytorch-original",
  tensorflow: "tensorflow/tensorflow-original",
  numpy: "numpy/numpy-original",
  pandas: "pandas/pandas-original",
};

const normalize = (name: string) => name.toLowerCase().replace(/[^a-z0-9.]/g, "");

const SkillPill = ({ skill }: { skill: string }) => {
  const slug = iconMap[normalize(skill)];
  const [failed, setFailed] = useState(false);

  return (
    <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-card/30 px-4 py-2 text-sm whitespace-nowrap text-[#a1a1aa]">
      {slug && !failed && (
        <img
          src={`${iconBase}/${slug}.svg`}
          alt=""
          loading="lazy"
          className="h-5 w-5 object-contain"
          onError={() => setFailed(true)}
        />
      )}
      {skill}
    </span>
  );
};

export const SkillsMarquee = ({ skills }: SkillsMarqueeProps) => {
  const duplicated = [...skills, ...skills];

  return (
    <div className="relative overflow-hidden">
      <div className="animate-marquee flex w-max gap-3" style={{ willChange: "transform" }}>
        {duplicated.map((skill, index) => (
          <SkillPill key={`${skill}-${index}`} skill={skill} />
        ))}
      </div>
    </div>
  );
};
