/** Grounded, conversation-aware answers when the model service is unavailable. */
import { books, education, experience, projects, technicalSkills } from "../data/context";

export type ChatMessage = { role: "user" | "assistant"; content: string };
type Kind = "experience" | "project" | "book";
type Entity = {
  kind: Kind;
  name: string;
  aliases: string[];
  description: string;
  technologies?: string[];
  role?: string;
  location?: string;
  team?: string;
  href?: string;
  author?: string;
  tag?: string;
};
type Topic = { entities: Entity[]; kind?: Kind };

const CONTACT = "You can reach me at justinmmanoj@gmail.com, on LinkedIn at linkedin.com/in/justinmmanoj, or on GitHub at github.com/justinm5.";
const UNKNOWN = "I don't have that information on the site. My resume may have more detail, or you can reach me at justinmmanoj@gmail.com.";
const FOCUS = "My focus is backend systems, cloud infrastructure, DevOps, and performance-critical software.";
const educationAnswer = () => `I'm studying ${education[0].degree.split(" · ")[0].replace(/^B\.S\. in /, "")} at UMass Amherst, graduating in ${education[0].degree.match(/\d{4}/g)?.at(-1)}.`;

const normalize = (value: string) => value.normalize("NFKD")
  .replace(/[\u0300-\u036f]/g, "").replace(/[‘’]/g, "'")
  .toLowerCase().replace(/[–—-]/g, " ").replace(/\s+/g, " ").trim();
const escapeRegExp = (value: string) => value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
const contains = (text: string, phrase: string) =>
  new RegExp(`(^|[^a-z0-9])${escapeRegExp(normalize(phrase))}(?=$|[^a-z0-9])`).test(text);
const finish = (text: string) => /[.!?]$/.test(text.trim()) ? text.trim() : `${text.trim()}.`;
const sentences = (text: string) => text.match(/[^.!?]+(?:[.!?](?!\S)|$)/g)?.map(s => s.trim()).filter(Boolean) ?? [text];
const firstSentence = (text: string) => finish(sentences(text)[0] || text);

const companyAliases: Record<string, string[]> = {
  IBM: ["ibm"],
  "Dell Technologies": ["dell", "dell technologies", "cmo"],
  "GBCS Group": ["gbcs", "gbcs group"],
  "University of Massachusetts Amherst": ["autonomous learning lab", "autonomous learning", "research lab", "research assistant"],
};
const projectAliases: Record<string, string[]> = {
  "Personal Website": ["personal website", "this website", "this site", "your website", "your site", "portfolio website"],
  "Quant Signal Agent": ["quant signal agent", "quantitative signal agent", "signalagent", "signal agent", "quant", "qsip"],
  NutriPlan: ["nutriplan", "nutri plan", "taste scout", "meal planner", "dining app"],
  "Poker Trainer": ["poker trainer", "pokeriq", "poker", "monte carlo"],
};
const entities: Entity[] = [
  ...experience.map(item => ({ ...item, name: item.company, kind: "experience" as const,
    aliases: companyAliases[item.company] ?? [item.company] })),
  ...projects.map(item => ({ ...item, name: item.title, kind: "project" as const,
    aliases: projectAliases[item.title] ?? [item.title] })),
  ...books.map(item => ({ name: item.title, aliases: [item.title, item.title.replace(/^The /, "")],
    description: item.note, author: item.author, tag: item.tag, kind: "book" as const })),
];
const allSkills = technicalSkills.flatMap(group => group.items);
const technologyNames = [...new Set([...allSkills, ...projects.flatMap(project => project.technologies),
  "Syslog", "RKE2", "GitOps", "DataLoader", "Jest", "Sentry", "GitHub Actions", "Ray", "Pandas", "OpenTelemetry Collector"])];
const skillAliases: Record<string, string[]> = {
  "C++": ["c++", "cpp", "cplusplus"],
  "Node.js": ["node.js", "nodejs", "node"],
  JavaScript: ["javascript"],
  TypeScript: ["typescript"],
  Kubernetes: ["kubernetes", "k8s"],
  PostgreSQL: ["postgresql", "postgres"],
  "OpenTelemetry": ["opentelemetry", "otel"],
};
const skillMatches = (text: string, skill: string) => (skillAliases[skill] ?? [skill]).some(alias => contains(text, alias));
const mentionedSkills = (text: string) => technologyNames.filter(skill => skillMatches(text, skill));
const entitySkills = (entity: Entity) => entity.technologies ?? technologyNames.filter(skill => skillMatches(normalize(entity.description), skill));

const topicKind = (text: string): Kind | undefined => {
  if (/\b(projects?|side projects?|built|builds|building|portfolio)\b/.test(text)) return "project";
  if (/\b(books?|reading|read|bookshelf|authors?)\b/.test(text)) return "book";
  if (/\b(experience|internships?|intern|co ?op|work history|employment|jobs?|career|research)\b/.test(text)) return "experience";
};
const findEntities = (text: string): Entity[] => {
  const matches = entities.filter(entity => entity.aliases.some(alias => contains(text, alias)));
  // "investment research" belongs to the named project, not the research lab.
  if (!matches.length && /\bresearch\b/.test(text) && topicKind(text) !== "project") {
    const lab = entities.find(entity => entity.team === "Autonomous Learning Lab");
    if (lab) return [lab];
  }
  return matches;
};
const isFollowUp = (text: string) => /\b(it|its|that|there|those|them|they|both|same|one)\b/.test(text)
  || /^(and\b|what about\b|how about\b|tell me more\b|more details?\b|why\b|where\b|when\b)/.test(text)
  || /^(what|which|how).*(stack|technolog|language|tools?|role|impact|results?|improve|reduc|built|work on)/.test(text);

/** Infer only known portfolio subjects; a new broad topic clears an old subject. */
const previousTopic = (history: ChatMessage[]): Topic => {
  for (let i = history.length - 1; i >= Math.max(0, history.length - 10); i--) {
    const message = history[i];
    if (message.role !== "user") continue;
    const text = normalize(message.content);
    const explicit = findEntities(text);
    if (explicit.length) return { entities: explicit, kind: explicit.length === 1 ? explicit[0].kind : undefined };
    const kind = topicKind(text);
    if (kind) {
      const reply = history[i + 1];
      const inferred = reply?.role === "assistant" ? findEntities(normalize(reply.content)).filter(entity => entity.kind === kind) : [];
      return { entities: inferred.length === 1 ? inferred : [], kind };
    }
    if (!isFollowUp(text)) return { entities: [] };
  }
  return { entities: [] };
};
const ambiguity = (matches: Entity[]) => `Do you mean ${matches.map(entity => entity.name).join(" or ")}?`;

const unknownDetail = (text: string) => /\b(gpa|salary|compensation|age|birthday|birth date|citizenship|visa|work authorization|sponsorship|phone number|home address|manager|supervisor|favorite|favourite)\b/.test(text)
  || /\b(available|availability|start date|graduation month|exact graduation date)\b/.test(text)
  || /\b(offer|offers)\b/.test(text);
const codeQuestion = (text: string) => /\b(code|repo|repository|source|github|link|demo|try it)\b/.test(text);
const techQuestion = (text: string) => /\b(stack|technologies|technology|tools?|languages?|frameworks?|written in|built with|built in|coded in)\b/.test(text)
  || (/\b(what|which).*\b(use|used|using)\b/.test(text)
    && !/\b(reduce|improve|latency|performance|logging|monitoring|failures)\b/.test(text));
const detailQuestion = (text: string) => /\b(details?|explain|deep|more|how|why)\b/.test(text);
const briefQuestion = (text: string) => /\b(brief|briefly|short|quick|one sentence|1 sentence|tl;?dr|summari[sz]e)\b/.test(text);

const describeEntity = (entity: Entity, text: string): string => {
  if (unknownDetail(text)) return UNKNOWN;
  if (codeQuestion(text) && entity.kind === "project") {
    if (/\bdemo|try it\b/.test(text)) return `I don't have a live demo linked for ${entity.name}. ${entity.href ? `Source code: ${entity.href}` : "The Projects page has the available information."}`;
    return entity.href ? `${entity.name} source code: ${entity.href}` : `I don't have a code link listed for ${entity.name}.`;
  }
  if (codeQuestion(text) && entity.kind === "experience") return `I don't have a public code link for my work at ${entity.name}. My resume has more detail: /resume.pdf`;
  if (entity.kind === "project" && /\bhow.*(build|built|implement)|\bimplementation\b/.test(text)) {
    return `${entity.name}: ${finish(entity.description)} The listed stack is ${entity.technologies?.join(", ")}.`;
  }
  const where = /\b(where|location|based|city)\b/.test(text);
  const when = /\b(when|dates?|year|summer|fall|spring)\b/.test(text);
  if (entity.kind === "experience" && (where || when)) {
    return `${entity.name}: ${[when ? entity.role : undefined, where ? entity.location : undefined].filter(Boolean).join(" — ")}.`;
  }
  if (entity.kind === "experience" && /\bteam\b/.test(text)) {
    return entity.team ? `${entity.name}: ${entity.team}.` : `The site doesn't list a team name for ${entity.name}. ${firstSentence(entity.description)}`;
  }
  if (entity.kind === "experience" && /\b(role|position|title)\b/.test(text)) {
    return `${entity.name}: ${entity.role}. ${firstSentence(entity.description)}`;
  }
  if (techQuestion(text)) {
    const supported = entitySkills(entity);
    const category = /\blanguages?\b/.test(text) ? technicalSkills[0].items
      : /\bframeworks?\b/.test(text) ? technicalSkills[1].items : undefined;
    const selected = category ? supported.filter(skill => category.includes(skill)) : supported;
    if (!selected.length) return `The site doesn't specify ${category ? "those technologies" : "a technology stack"} for ${entity.name}. ${firstSentence(entity.description)}`;
    const requested = mentionedSkills(text);
    const relevant = requested.length ? requested.filter(skill => supported.includes(skill)) : selected;
    if (requested.length && !relevant.length) return `The site doesn't document ${requested.join(" or ")} for ${entity.name}. The listed technologies are ${supported.join(", ")}.`;
    if (requested.length) {
      const evidence = sentences(entity.description).filter(sentence => relevant.some(skill => skillMatches(normalize(sentence), skill)));
      return `${entity.name}: ${evidence.length ? evidence.map(finish).join(" ") : `The listed stack includes ${relevant.join(", ")}.`}`;
    }
    return `${entity.name}: ${selected.join(", ")}.`;
  }
  if (entity.kind === "book") return `${entity.name} by ${entity.author}. ${entity.description}`;
  if (briefQuestion(text)) return `${entity.name}: ${firstSentence(entity.description)}`;
  if (entity.kind === "project") return `${entity.name}: ${finish(entity.description)}`;
  const description = detailQuestion(text) ? finish(entity.description) : sentences(entity.description).slice(0, 2).map(finish).join(" ");
  return `${entity.name} — ${entity.role}. ${description}`;
};

const skillAnswer = (text: string) => {
  const category = /\blanguages?\b/.test(text) ? technicalSkills[0]
    : /\bframeworks?\b/.test(text) ? technicalSkills[1]
    : /\b(developer tools|dev tools)\b/.test(text) ? technicalSkills[2] : undefined;
  return (category ? [category] : technicalSkills).map(group => `${group.category}: ${group.items.join(", ")}.`).join(" ");
};

const retrievalStopwords = new Set([
  "a", "an", "the", "i", "my", "me", "you", "your", "justin", "he", "his", "we", "our",
  "is", "are", "was", "were", "be", "been", "did", "do", "does", "have", "has", "had",
  "what", "which", "who", "when", "where", "how", "why", "can", "could", "would", "should",
  "to", "of", "at", "on", "in", "for", "with", "and", "or", "that", "this", "it", "its",
  "work", "worked", "working", "built", "building", "project", "projects", "experience",
  "tell", "explain", "about", "more", "detail", "details", "information", "use", "used", "using",
  "please", "give", "some", "any", "from", "into", "there", "also", "involved",
]);
const tokens = (text: string): string[] => {
  const words: string[] = normalize(text).match(/[a-z0-9+#]+/g) ?? [];
  return [...new Set(words.filter(token => token.length > 2 && !retrievalStopwords.has(token)))];
};

/** Return relevant recorded sentences, with conservative lexical confidence. */
const retrieveEvidence = (text: string, kind?: Kind): string | null => {
  const query = tokens(text);
  if (!query.length) return null;
  const candidates = entities.filter(entity => !kind || entity.kind === kind);
  const ranked = candidates.map(entity => {
    const evidence = sentences(entity.description).map(sentence => {
      const words = tokens(sentence);
      const matches = query.filter(token => words.includes(token));
      return { sentence, score: matches.length };
    }).filter(item => item.score > 0).sort((a, b) => b.score - a.score);
    return { entity, evidence, score: evidence.reduce((sum, item) => sum + item.score, 0) };
  }).filter(item => item.score > 0).sort((a, b) => b.score - a.score);
  if (!ranked.length) return null;
  const best = ranked[0];
  if (query.length > 3 && best.score / query.length < 0.35) return null;
  return ranked.filter(item => item.score >= best.score * 0.75).slice(0, 2)
    .map(({ entity, evidence }) => `${entity.name}: ${evidence.slice(0, 2).map(item => finish(item.sentence)).join(" ")}`).join("\n\n");
};

const overview = (kind: Kind, text: string) => {
  if (kind === "project") return `My projects include ${projects.map(project => project.title).join(", ")}. They cover real-time data pipelines, meal planning, poker decision training, and this portfolio. Ask about one for its implementation or source code.`;
  if (kind === "book") {
    const tag = [...new Set(books.map(book => book.tag))].find(tag => contains(text, tag));
    const selected = (tag ? books.filter(book => book.tag === tag) : books).slice(0, 3);
    return selected.map(book => `${book.title} by ${book.author}: ${book.note}`).join(" ") + " The Books page has the full list.";
  }
  return `My experience includes ${experience.slice(0, 3).map(item => `${item.company} (${item.role.split(" · ")[0]})`).join(", ")}, plus research at the Autonomous Learning Lab. ${FOCUS}`;
};

const answerOne = (question: string, history: ChatMessage[]): string => {
  const text = normalize(question);
  if (!text) return "Ask about my experience, projects, skills, education, or books I've read.";
  if (unknownDetail(text)) return UNKNOWN;
  if (/\b(contact|reach you|reach out|get in touch|email|linkedin|github profile)\b/.test(text)) return CONTACT;

  const explicit = findEntities(text);
  let scope = explicit;
  const kind = topicKind(text);
  const prior = previousTopic(history);
  // Don't carry Dell into a fresh question about projects, school, or books.
  const freshSkills = /\b(your (?:skills|languages|frameworks|technologies)|you know)\b/.test(text);
  const freshEducation = /\b(school|degree|graduat\w*|major|education|coursework|courses|classes|college)\b/.test(text);
  if (!scope.length && !freshEducation && !freshSkills && isFollowUp(text) && (!kind || kind === prior.kind)) scope = prior.entities;

  if (scope.length > 1 && !/\b(compare|comparison|difference|versus|vs|both)\b/.test(text)) return ambiguity(scope);
  if (scope.length) return scope.map(entity => describeEntity(entity, text)).join("\n\n");
  if (!freshEducation && !kind && /\b(it|its|that|there|those|them|both)\b/.test(text)) {
    return "Which role or project do you mean? You can name a company such as Dell or a project such as NutriPlan.";
  }

  if (/\b(resume|cv)\b/.test(text) && /\b(link|download|see|view|read|resume|cv)\b/.test(text)) return "My resume is available at /resume.pdf. It includes my education, experience, projects, and technical skills.";
  if (/\b(contact|reach you|reach out|get in touch|email|linkedin|github profile)\b/.test(text)) return CONTACT;
  if (/\b(coursework|courses|classes|curriculum|classwork)\b/.test(text)) return `${education[0].coursework}.`;
  if (/\b(school|study|studying|college|university|umass|amherst|major|degree|graduat\w*|class of|education)\b/.test(text)) return educationAnswer();

  if (/\b(who are you|who is justin|about justin|about yourself|about you|introduce|introduction|elevator pitch|background|summari[sz]e)\b/.test(text)) {
    return `${educationAnswer()} ${overview("experience", text)}`;
  }

  const requestedSkills = mentionedSkills(text);
  if (requestedSkills.length && /\b(know|proficient|comfortable|familiar)\b/.test(text)) {
    const listed = requestedSkills.filter(skill => allSkills.includes(skill));
    if (listed.length) return `${listed.join(", ")} ${listed.length === 1 ? "is" : "are"} listed among my technical skills. ${FOCUS}`;
  }
  if (requestedSkills.length && !/\b(what|which) (?:are |is )?(?:your |the )?(?:languages?|skills?|stack|tools?|technologies|frameworks?)\b/.test(text)) {
    const pool = entities.filter(entity => entity.kind !== "book" && (!kind || entity.kind === kind));
    const matched = pool.filter(entity => requestedSkills.every(skill => entitySkills(entity).includes(skill)));
    if (!matched.length) return `The site doesn't document a ${kind ?? "role or project"} using ${requestedSkills.join(" and ")}. ${skillAnswer(text)}`;
    return matched.slice(0, 3).map(entity => {
      const evidence = sentences(entity.description).filter(sentence => requestedSkills.some(skill => skillMatches(normalize(sentence), skill)));
      return `${entity.name}: ${evidence.length ? evidence.map(finish).join(" ") : `The listed stack includes ${requestedSkills.join(", ")}. ${firstSentence(entity.description)}`}`;
    }).join("\n\n");
  }
  if (/\b(skills?|stack|tech|technologies|tools|languages?|frameworks?|programming)\b/.test(text)) {
    // A question about an unlisted language must not imply proficiency.
    if (/\b(rust|ruby|swift|kotlin|scala|cobol|haskell)\b/.test(text)) return `That technology isn't listed among my skills. ${skillAnswer(text)}`;
    return skillAnswer(text);
  }
  const evidence = retrieveEvidence(text, kind);
  if (evidence) return evidence;
  if (kind) return overview(kind, text);
  if (/\b(strengths?|hire|fit|good at|backend|infrastructure|systems|distributed|devops|platform|observability)\b/.test(text)) {
    const dell = experience.find(item => item.company === "Dell Technologies")!;
    const gbcs = experience.find(item => item.company === "GBCS Group")!;
    return `${FOCUS} At Dell, I ${dell.description.charAt(0).toLowerCase()}${firstSentence(dell.description).slice(1)} At GBCS Group, I ${gbcs.description.charAt(0).toLowerCase()}${firstSentence(gbcs.description).slice(1)}`;
  }
  if (/\b(hobb(y|ies)|interests|free time|fun|outside|music|gym|work out|working out|lift)\b/.test(text)) return "Outside of tech, I enjoy working out, reading, and listening to hip-hop and R&B.";
  if (/^(hi|hey|hello|yo|sup|howdy)[!. ]*$/.test(text)) return `Hi, I'm Justin. ${educationAnswer()} Ask about my experience, projects, skills, or books.`;
  if (/^(thanks|thank you|appreciate it|ty)[!. ]*$/.test(text)) return "You're welcome. What else would you like to know?";
  if (/^(help|what can (you|i) ask|what can you do|topics|options)[?.! ]*$/.test(text)) return "Ask about my experience, projects, education, technologies, or books. You can also ask follow-up questions about the same role or project.";
  if (isFollowUp(text)) return "Which role or project do you mean? You can name a company such as Dell or a project such as NutriPlan.";
  return UNKNOWN;
};

/** History contains prior turns only, excluding the current question. */
export const answerLocally = (question: string, history: ChatMessage[] = []): string => {
  const parts = question.split(/\?\s+(?=\S)|\band\s+(?=(?:what|where|when|how|which|do|did|can|are|why)\b)/i)
    .map(part => part.trim()).filter(Boolean).slice(0, 3);
  const replies: string[] = [];
  const context = history.slice(-10);
  for (const part of parts.length ? parts : [question]) {
    const reply = answerOne(part, context);
    if (!replies.includes(reply)) replies.push(reply);
    context.push({ role: "user", content: part }, { role: "assistant", content: reply });
  }
  return replies.join("\n\n");
};

export default answerLocally;
