/**
 * Zero-cost offline fallback for the Ask page.
 *
 * Scores each fact line from `systemContext` against the question using token
 * overlap with IDF-style weighting, then returns the best-matching facts. Used
 * whenever the /api/chat serverless function is unreachable (plain `vite dev`,
 * static hosting, or a missing API key) so the chatbot always answers.
 */

import { systemContext } from "@/data/context";

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
  const queryTokens = expand(tokenize(question));

  if (queryTokens.length === 0) {
    return "Ask me about my experience, projects, coursework, or what I have been reading.";
  }

  // Contact intent is answered directly — keyword matching would otherwise pull
  // in unrelated facts that merely mention GitHub or email.
  if (/\b(contact|reach|email|hire|resume|linkedin|github profile)\b/i.test(question)) {
    return CONTACT_LINE;
  }

  const scored = facts
    .map((fact, index) => ({ fact, score: scoreFact(queryTokens, index) }))
    .filter((entry) => entry.score > 0.8)
    .sort((a, b) => b.score - a.score);

  if (scored.length === 0) {
    return `I do not have that on the site. ${CONTACT_LINE}`;
  }

  // Only keep facts close to the best match, so a question about one job does
  // not drag in every other job that happens to share a keyword.
  const cutoff = scored[0].score * 0.62;
  const ranked = scored.filter((entry) => entry.score >= cutoff).slice(0, 3);

  return ranked
    .map((entry) => entry.fact.replace(/\s+/g, " ").trim())
    .join(" ");
};

export default answerLocally;
