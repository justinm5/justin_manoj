export type ExperienceBase = {
  id: string;
  period: string;
  company: string;
  companySecondary?: string;
  role: string;
  roleTimeline?: string;
  location: string;
  focus?: string;
  summary: string;
  summaryTimeline?: string;
  companyTimeline?: string;
};

export type ExperienceCard = {
  period: string;
  company: string;
  companySecondary?: string;
  role: string;
  location: string;
  summary: string;
  focus: string;
  href: string;
};

export type ExperienceTimeline = {
  id: string;
  title: string;
  company: string;
  location: string;
  period: string;
  summary: string;
};

const experienceBase: Record<string, ExperienceBase> = {
  ibm: 
    {
      id: "ibm",
      period: "Aug 2026 - Dec 2026",
      company: "IBM",
      role: "Software Developer Co-op",
      location: "Lowell, MA",
      focus: "Cloud · Kubernetes · Microservices",
      summary: "Incoming Fall 2026",
    },
  dell: {
    id: "dell-technologies-isg",
    period: "May 2026 - Aug 2026",
    company: "Dell Technologies",
    role: "Software Engineering Intern",
    location: "Hopkinton, MA",
    focus: "Go · Kubernetes · OpenTelemetry · GitOps",
    summary:
      "Shipped an internal Kubernetes operator in Go to automate audit logging across production clusters, integrating syslog and OpenTelemetry pipelines for compliance observability. Delivered platform features, critical bug fixes, and CVE remediation across GitOps-managed RKE2 clusters.",
  },
  gbcs: {
    id: "gbcs-group",
    period: "Mar 2025 – Sept 2025",
    company: "GBCS Group",
    role: "Software Engineering Intern",
    location: "Alberta, CA",
    focus: "GraphQL · Redis · PostgreSQL · gRPC · Jest · Sentry · CI/CD",
    summary:
      "Rebuilt core APIs with GraphQL & caching, reducing backend load & cutting dashboard load times by 65% using PostgreSQL composite indexes and Redis caching on frequently accessed data. Built GitHub Actions CI/CD pipelines for automated testing and deployment.",
  },
  umass: {
    id: "umass-autonomous-learning-lab",
    period: "Nov 2024 – Apr 2025",
    company: "University of Massachusetts Amherst",
    companyTimeline: "UMass Amherst - Autonomous Learning Lab",
    role: "Undergraduate Research Assistant",
    roleTimeline: "Research Assistant",
    location: "Amherst, MA",
    focus: "Python · Multi-Agents · Ray · Pandas · NumPy · Jupyter",
    summary:
      "Autonomous Learning Lab. Stress-tested multi-agent LLM systems, finding 14 failure modes in 10k+ simulations & improving analysis speed 3x. Cut review time extensively with automated pipeline that classifies agent failures and critical patterns.",
    summaryTimeline:
      "Autonomous Learning Lab. Stress-tested multi-agent LLM systems, finding 14 failure modes in 10k+ simulations & improving analysis speed 3x. Cut review time extensively with automated pipeline that classifies agent failures and critical patterns.",
  },
  build: {
    id: "build-umass",
    period: "Sept 2024 – Present",
    company: "BUILD UMass",
    role: "Software Engineer",
    location: "Amherst, MA",
    focus: "React · Elasticsearch · WebSockets · Redis Pub/Sub",
    summary:
      "Optimized campus events platform with faster search & reliable real-time updates for UMass students.",
  },
  nrhs: {
    id: "nrhs-robotics-first-vex-robotics",
    period: "Sept 2022 - Jun 2023",
    company: "NRHS Robotics",
    companyTimeline: "NRHS Robotics / FIRST & VEX Robotics",
    role: "Team Captain",
    location: "Thiells, NY",
    focus: "C++ · ROS · Gazebo · Computer Vision · PID Control",
    summary:
      "Led C++ robotics software and team operations for FIRST and VEX competitions, building autonomous routines, computer-vision targeting, and PID control loops while driving match strategy and design reviews.",
    summaryTimeline:
      "Served as team captain and lead programmer for FIRST & VEX robotics. Architected C++ control software including autonomous routines, computer-vision targeting, and PID control loops. Led match strategy, design reviews, and the software subteam, advancing to regional championships.",
  },
};

const cardOrder = ["ibm", "dell", "gbcs", "umass", "build", "nrhs"] as const;
const timelineOrder = ["gbcs", "umass", "build", "nrhs"] as const;

export const experienceCards: ExperienceCard[] = cardOrder.map((key) => {
  const entry = experienceBase[key];

  return {
    period: entry.period,
    company: entry.company,
    companySecondary: entry.companySecondary,
    role: entry.role,
    location: entry.location,
    summary: entry.summary,
    focus: entry.focus ?? "",
    href: `/experience#${entry.id}`,
  };
});

export const experienceTimeline: ExperienceTimeline[] = timelineOrder.map((key) => {
  const entry = experienceBase[key];

  return {
    id: entry.id,
    title: entry.roleTimeline ?? entry.role,
    company: entry.companyTimeline ?? entry.company,
    location: entry.location,
    period: entry.period,
    summary: entry.summaryTimeline ?? entry.summary,
  };
});
