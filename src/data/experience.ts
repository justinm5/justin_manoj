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
    focus: "Infrastructure · Cloud · Microservices",
    summary: "Incoming Summer 2026",
  },
  chitchat: {
    id: "chitchat-workplace",
    period: "May 2025 – Present",
    company: "ChitChat Workplace",
    role: "Software Engineer",
    roleTimeline: "Software Engineer",
    location: "Boston, MA",
    focus: "Go · WebSockets · Kafka · Kubernetes · AWS · LangChain",
    summary:
      "Built real-time backend for 100k+ user concurrent messaging platform & launched enterprise pilots in 90 days.",
  },
  gbcs: {
    id: "gbcs-group",
    period: "Mar 2025 – Sept 2025",
    company: "GBCS Group",
    role: "Software Engineer Intern",
    location: "Alberta, CA",
    focus: "GraphQL · Redis · PostgreSQL · gRPC · Jest · Sentry · CI/CD",
    summary:
      "Rebuilt core APIs with GraphQL & caching, reducing backend load & cutting dashboard load times by 65%.",
  },
  umass: {
    id: "umass-autonomous-learning-lab",
    period: "Nov 2024 – Apr 2025",
    company: "University of Massachusetts Amherst",
    companyTimeline: "UMass Amherst - Autonomous Learning Lab",
    role: "Undergraduate Research Assistant",
    roleTimeline: "Research Assistant",
    location: "Amherst, MA",
    focus: "Python · Multi-Agents · Ray · Pandas · NumPy · Juypter",
    summary:
      "Autonomous Learning Lab. Tested multi-agent LLM systems, finding 14 failure modes in 10k+ simulations & improving analysis speed by 3x.",
    summaryTimeline:
      "Stress-tested multi-agent LLM systems, finding 14 failure modes in 10k+ simulations & improving analysis speed 3x.",
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
      "First and VEX Robotics. Led C++ robotics software development and team execution for regional & national competitions.",
  },
};

const cardOrder = ["ibm", "dell", "chitchat", "gbcs", "umass", "build", "nrhs"] as const;
const timelineOrder = ["chitchat", "gbcs", "umass", "build", "nrhs"] as const;

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
