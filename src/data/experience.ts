export type ExperienceBase = {
  id: string;
  period: string;
  company: string;
  domain?: string;
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
  domain?: string;
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
      domain: "ibm.com",
      role: "Software Developer Co-op",
      location: "Lowell, MA",
      focus: "Cloud · Kubernetes · Microservices",
      summary: "Incoming Fall 2026",
    },
  dell: {
    id: "dell-technologies-isg",
    period: "May 2026 - Aug 2026",
    company: "Dell Technologies",
    domain: "dell.com",
    role: "Software Engineering Intern",
    location: "Hopkinton, MA",
    focus: "Go · Kubernetes · OpenTelemetry · GitOps",
    summary:
      "Shipped a Go Kubernetes operator to automate audit logging and OpenTelemetry across production RKE2 clusters. Delivered GitOps-managed platform features, critical bug fixes, and CVE remediation.",
  },
  gbcs: {
    id: "gbcs-group",
    period: "Mar 2025 – Sept 2025",
    company: "GBCS Group",
    domain: "gbcsgroup.com",
    role: "Software Engineering Intern",
    location: "Alberta, CA",
    focus: "GraphQL · Redis · PostgreSQL · gRPC · Jest · Sentry · CI/CD",
    summary:
      "Rebuilt core APIs with GraphQL, PostgreSQL indexes, and Redis caching, cutting dashboard load times by 65%. Built GitHub Actions CI/CD for automated testing and deployment.",
  },
  umass: {
    id: "umass-autonomous-learning-lab",
    period: "Nov 2024 – Apr 2025",
    company: "University of Massachusetts Amherst",
    domain: "umass.edu",
    companyTimeline: "UMass Amherst - Autonomous Learning Lab",
    role: "Undergraduate Research Assistant",
    roleTimeline: "Research Assistant",
    location: "Amherst, MA",
    focus: "Python · Multi-Agents · Ray · Pandas · NumPy · Jupyter",
    summary:
      "Stress-tested multi-agent LLM systems across 10k+ simulations, surfacing 14 failure modes and 3x faster analysis. Automated failure classification pipeline.",
    summaryTimeline:
      "Stress-tested multi-agent LLM systems across 10k+ simulations, surfacing 14 failure modes and 3x faster analysis. Automated failure classification pipeline.",
  },
  build: {
    id: "build-umass",
    period: "Sept 2024 – Present",
    company: "BUILD UMass",
    domain: "buildumass.com",
    role: "Software Engineer",
    location: "Amherst, MA",
    focus: "React · Elasticsearch · WebSockets · Redis Pub/Sub",
    summary:
      "Optimized campus events platform with Elasticsearch search and Redis Pub/Sub real-time updates for UMass students.",
  },
  nrhs: {
    id: "nrhs-robotics-first-vex-robotics",
    period: "Sept 2022 - Jun 2023",
    company: "NRHS Robotics",
    domain: "firstinspires.org",
    companyTimeline: "NRHS Robotics / FIRST & VEX Robotics",
    role: "Team Captain",
    location: "Thiells, NY",
    focus: "C++ · ROS · Gazebo · Computer Vision · PID Control",
    summary:
      "Led C++ robotics software and match strategy for FIRST/VEX, building autonomous routines, computer-vision targeting, and PID control loops.",
    summaryTimeline:
      "Led C++ robotics software and match strategy for FIRST/VEX, building autonomous routines, computer-vision targeting, and PID control loops.",
  },
};

const cardOrder = ["ibm", "dell", "gbcs", "umass", "build"] as const;
const timelineOrder = ["gbcs", "umass", "build", "nrhs"] as const;

export const experienceCards: ExperienceCard[] = cardOrder.map((key) => {
  const entry = experienceBase[key];

  return {
    period: entry.period,
    company: entry.company,
    domain: entry.domain,
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
