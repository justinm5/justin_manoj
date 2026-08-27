/**
 * Zero-cost answering engine for the Ask page.
 *
 * Two layers, tried in order:
 *   1. Intents — hand-written handlers that compose a real answer from the
 *      structured data in `context.ts` (experience, projects, books).
 *   2. Retrieval — token overlap with IDF weighting over the fact lines in
 *      `systemContext`, for anything the intents do not cover.
 *
 * Runs entirely in the browser, so it works with plain `vite dev`, on static
 * hosting, and whenever /api/chat is unreachable or has no API key.
 */

import { books, experience, projects, systemContext } from "@/data/context";

const STOPWORDS = new Set([
  "a", "about", "all", "am", "an", "and", "any", "are", "as", "at", "be",
  "been", "but", "by", "can", "did", "do", "does", "for", "from", "had", "has",
  "have", "he", "her", "him", "his", "how", "i", "if", "in", "is", "it", "its",
  "just", "me", "my", "of", "on", "or", "our", "out", "she", "so", "some",
  "tell", "than", "that", "the", "their", "them", "then", "there", "these",
  "they", "this", "to", "up", "us", "was", "we", "were", "what", "when",
  "where", "which", "who", "why", "will", "with", "would", "you", "your",
]);

const SYNONYMS: Record<string, string[]> = {
  work: ["intern", "co-op", "engineer", "developer", "experience"],
  job: ["intern", "co-op", "engineer", "developer", "experience"],
  jobs: ["intern", "co-op", "engineer", "developer", "experience"],
  internship: ["intern", "co-op"],
  internships: ["intern", "co-op"],
  school: ["umass", "amherst", "computer", "science", "mathematics"],
  study: ["umass", "amherst", "computer", "science", "mathematics"],
  studying: ["umass", "amherst", "computer", "science", "mathematics"],
  college: ["umass", "amherst"],
  university: ["umass", "amherst"],
  major: ["computer", "science", "mathematics"],
  classes: ["coursework", "algorithms", "databases"],
  courses: ["coursework", "algorithms", "databases"],
  coursework: ["algorithms", "databases", "operating", "systems"],
  skills: ["languages", "tools", "go", "python", "typescript"],
  tech: ["languages", "tools", "go", "python", "typescript"],
  stack: ["languages", "tools", "go", "python", "typescript"],
  languages: ["go", "python", "java", "typescript"],
  project: ["projects", "quantitative", "dining", "poker"],
  projects: ["quantitative", "dining", "poker"],
  books: ["bookshelf", "reading", "kleppmann"],
  book: ["bookshelf", "reading", "kleppmann"],
  reading: ["bookshelf", "books"],
  read: ["bookshelf", "books"],
  contact: ["email", "github", "linkedin"],
  reach: ["email", "github", "linkedin"],
  hire: ["email", "linkedin", "intern"],
  backend: ["systems", "pipelines", "api"],
  hobbies: ["reader", "lifter", "qualities"],
  interests: ["reader", "lifter", "qualities"],
};

const CONTACT_LINE =
  "You can reach me at justinmmanoj@gmail.com, on LinkedIn at linkedin.com/in/justinmmanoj, or on GitHub at github.com/justinm5.";

/* ------------------------------------------------------------------ */
/* Intent layer                                                        */
/* ------------------------------------------------------------------ */

const EDUCATION =
  "I'm studying Computer Science and Mathematics at UMass Amherst, graduating in 2027.";

const FOCUS =
  "I work mostly on backend systems, data pipelines, and quantitative engineering — the kind of production work where latency and correctness both matter.";

const SKILLS =
  "Day to day I write Go, Python, Java, and TypeScript. On top of that: React and Node on the frontend, and Docker, Kubernetes, PostgreSQL, Redis, Kafka, and gRPC underneath.";

const COURSEWORK =
  "Relevant coursework: algorithms, data structures, operating systems, machine learning, databases, scalable web systems, and data science.";

const lowerFirst = (text: string) =>
  text ? text.charAt(0).toLowerCase() + text.slice(1) : text;

/** "Software Engineer Intern · Internship · 2026" -> "Software Engineer Intern, 2026". */
const roleLabel = (role: string) => {
  const segments = role.split("·").map((part) => part.trim());
  if (segments.length <= 1) return role;
  return [segments[0], segments[segments.length - 1]].join(", ");
};

const describeRole = (entry: (typeof experience)[number]) => {
  const head = `${entry.company} — ${roleLabel(entry.role)}`;
  return entry.description ? `${head}. ${entry.description}` : `${head}.`;
};

const experienceOverview = () =>
  [
    `I've had ${experience.length} engineering roles so far.`,
    ...experience.map((entry) => describeRole(entry)),
  ].join(" ");

const projectsOverview = () =>
  [
    "A few projects I've built:",
    ...projects.map((project) => `${project.title} — ${project.description}`),
  ].join(" ");

const booksOverview = () =>
  `I've got ${books.length} books on the site: ${books
    .map((book) => `${book.title} (${book.author})`)
    .join(", ")}. The Books page has a line on each one.`;

/**
 * Alias -> matcher for the entities people actually name in questions.
 * Checked before the generic overviews so "tell me about Dell" beats
 * "tell me about your experience".
 */
const companyAliases: { pattern: RegExp; company: string }[] = [
  { pattern: /\bibm\b/, company: "IBM" },
  { pattern: /\bdell\b/, company: "Dell Technologies" },
  { pattern: /\bgbcs\b/, company: "GBCS Group" },
  {
    pattern: /\b(autonomous learning|research lab|research assistant|research)\b/,
    company: "University of Massachusetts Amherst",
  },
  { pattern: /\bbuild\s?umass\b/, company: "BUILD UMass" },
];

const projectAliases: { pattern: RegExp; title: string }[] = [
  { pattern: /\b(quant|quantitative|signal|trading|sec filings)\b/, title: "Quantitative Signal Agent" },
  { pattern: /\b(dining|meal|food|menu)\b/, title: "NutriPlan" },
  { pattern: /\b(poker|hold\s?'?em|monte carlo)\b/, title: "Poker Trainer" },
];

type Intent = {
  pattern: RegExp;
  respond: (question: string) => string | null;
};

const intents: Intent[] = [
  {
    pattern: /^(hi|hey|hello|yo|sup|howdy|good (morning|afternoon|evening))\b/,
    respond: () =>
      `Hey. ${EDUCATION} Ask me about my experience, projects, coursework, or what I've been reading.`,
  },
  {
    pattern: /\b(thanks|thank you|appreciate it|ty)\b/,
    respond: () => "Anytime. Anything else you want to dig into?",
  },
  {
    pattern: /\b(what can (you|i) ask|help|options|topics)\b/,
    respond: () =>
      "Ask about my experience and internships, individual companies like Dell or IBM, my projects, my stack, coursework, books I've read, or how to get in touch.",
  },

  // Named entities first — most specific wins.
  {
    pattern: /./,
    respond: (question) => {
      const alias = companyAliases.find((entry) => entry.pattern.test(question));
      if (!alias) return null;
      const entry = experience.find((item) => item.company === alias.company);
      if (!entry) return null;
      if (!entry.description) {
        return `${entry.company} — ${roleLabel(entry.role)}${
          entry.location ? ` in ${entry.location}` : ""
        }. I'm joining the cloud platform organization to work on Kubernetes microservices.`;
      }
      return describeRole(entry);
    },
  },
  {
    pattern: /./,
    respond: (question) => {
      const alias = projectAliases.find((entry) => entry.pattern.test(question));
      if (!alias) return null;
      const project = projects.find((item) => item.title === alias.title);
      return project ? `${project.title} — ${project.description}` : null;
    },
  },
  {
    pattern: /./,
    respond: (question) => {
      const match = books.find((book) => {
        const key = book.title.toLowerCase().replace(/^the\s+/, "");
        return key.length > 5 && question.includes(key);
      });
      return match
        ? `${match.title} by ${match.author}. ${match.note}`
        : null;
    },
  },

  // Broad topics.
  {
    pattern:
      /\b(who are you|about yourself|about you|introduce|introduction|elevator pitch|tell me about you|summar(y|ize|ise))\b/,
    respond: () =>
      `${EDUCATION} ${FOCUS} So far I've worked at ${experience
        .slice(0, 3)
        .map((entry) => entry.company)
        .join(", ")}, plus research at the UMass Autonomous Learning Lab.`,
  },
  {
    pattern:
      /\b(experience|internship|internships|intern|co-?op|work history|worked|employment|jobs?|career|resume|cv)\b/,
    respond: () => experienceOverview(),
  },
  {
    pattern: /\b(projects?|built|building|shipped|side project|portfolio piece)\b/,
    respond: () => projectsOverview(),
  },
  {
    pattern: /\b(books?|reading|read|bookshelf|recommend)\b/,
    respond: () => booksOverview(),
  },
  {
    pattern:
      /\b(skills?|stack|tech|technologies|tools|languages?|programming|proficient|know how to)\b/,
    respond: () => SKILLS,
  },
  {
    pattern:
      /\b(school|study|studying|college|university|umass|amherst|major|degree|graduat|class of|gpa)\b/,
    respond: () => EDUCATION,
  },
  {
    pattern: /\b(course|courses|coursework|classes|classwork|curriculum)\b/,
    respond: () => COURSEWORK,
  },
  {
    pattern:
      /\b(why (should|would) (i|we|anyone) hire|strengths?|good at|stand out|best qualit|what makes you)\b/,
    respond: () =>
      `${FOCUS} What I'd point to: persistence, systems thinking, and a bias toward shipping. Concretely, a Go Kubernetes operator running across production RKE2 clusters at Dell, and an API rebuild at GBCS that cut dashboard load times 65%.`,
  },
  {
    pattern: /\b(backend|infrastructure|systems|distributed|kubernetes|k8s|devops|platform)\b/,
    respond: () =>
      `${FOCUS} Most of that has been Kubernetes and Go: an operator at Dell automating audit logging and OpenTelemetry across production RKE2 clusters, GitOps-managed platform features, and CVE remediation.`,
  },
  {
    pattern: /\b(hobb(y|ies)|interests|free time|fun|outside of work|music|gym|lift)\b/,
    respond: () =>
      "Outside of engineering I read a lot, lift, and listen to more hip-hop and R&B than is probably reasonable.",
  },
  {
    pattern: /\b(where.*(live|based|located)|location|city|relocat)\b/,
    respond: () =>
      "I'm based in Massachusetts — school in Amherst, and my roles have been in Hopkinton and Lowell.",
  },
];

const SUGGESTIONS =
  "Try asking about my experience, a specific company like Dell or IBM, my projects, my stack, or what I've been reading.";

const tokenize = (text: string): string[] =>
  text
    .toLowerCase()
    .replace(/[^a-z0-9+#.\s-]/g, " ")
    .split(/[\s-]+/)
    .map((token) => token.replace(/^[.]+|[.]+$/g, ""))
    .filter((token) => token.length > 1 && !STOPWORDS.has(token));

const expand = (tokens: string[]): string[] => {
  const out = new Set(tokens);
  for (const token of tokens) {
    for (const synonym of SYNONYMS[token] ?? []) out.add(synonym);
  }
  return [...out];
};

/**
 * Fact lines pulled out of the context block. Bulleted lines and standalone
 * prose lines (bookshelf, contact) both count; section headings such as
 * "Projects:" and the trailing instruction to the model do not.
 */
const facts: string[] = systemContext
  .split("\n")
  .map((line) => line.trim())
  .map((line) => (line.startsWith("- ") ? line.slice(2).trim() : line))
  .filter(
    (line) =>
      line.length > 0 &&
      !line.startsWith("Facts to draw from") &&
      !line.startsWith("If they ask") &&
      // Section headings are short and end in a colon.
      !/^[A-Za-z ]{3,20}:$/.test(line),
  );

const factTokens: string[][] = facts.map((fact) => tokenize(fact));

/** Inverse document frequency so common words such as "systems" score lower. */
const idf: Map<string, number> = (() => {
  const documentCount = new Map<string, number>();
  for (const tokens of factTokens) {
    for (const token of new Set(tokens)) {
      documentCount.set(token, (documentCount.get(token) ?? 0) + 1);
    }
  }
  const result = new Map<string, number>();
  for (const [token, count] of documentCount) {
    result.set(token, Math.log(1 + facts.length / count));
  }
  return result;
})();

const scoreFact = (queryTokens: string[], index: number): number => {
  const tokens = new Set(factTokens[index]);
  let score = 0;
  for (const token of queryTokens) {
    if (tokens.has(token)) {
      score += idf.get(token) ?? 0.5;
      continue;
    }
    // Partial credit for prefix matches ("kubernetes" vs "kubernetes.").
    for (const factToken of tokens) {
      if (factToken.startsWith(token) || token.startsWith(factToken)) {
        score += 0.3;
        break;
      }
    }
  }
  return score;
};

export const answerLocally = (question: string): string => {
  const normalized = question.toLowerCase().trim();

  if (normalized.length === 0) {
    return `Ask me anything about my background. ${SUGGESTIONS}`;
  }

  // Contact is checked first — keyword matching would otherwise pull in every
  // fact line that merely mentions GitHub or email.
  if (/\b(contact|reach you|reach out|get in touch|email|linkedin|github profile)\b/.test(normalized)) {
    return CONTACT_LINE;
  }

  for (const intent of intents) {
    if (!intent.pattern.test(normalized)) continue;
    const reply = intent.respond(normalized);
    if (reply) return reply;
  }

  const queryTokens = expand(tokenize(normalized));
  const scored = facts
    .map((fact, index) => ({ fact, score: scoreFact(queryTokens, index) }))
    .filter((entry) => entry.score > 0.8)
    .sort((a, b) => b.score - a.score);

  if (scored.length === 0) {
    return `I don't have that on the site. ${SUGGESTIONS} Otherwise, ${lowerFirst(CONTACT_LINE)}`;
  }

  // Only keep facts close to the best match, so a question about one job does
  // not drag in every other job that happens to share a keyword.
  const cutoff = scored[0].score * 0.62;
  return scored
    .filter((entry) => entry.score >= cutoff)
    .slice(0, 3)
    .map((entry) => entry.fact.replace(/\s+/g, " ").trim())
    .join(" ");
};

export default answerLocally;
