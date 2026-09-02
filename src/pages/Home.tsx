import {
  siApachekafka,
  siDocker,
  siGo,
  siGraphql,
  siKubernetes,
  siOpentelemetry,
  siPostgresql,
  siPython,
  siReact,
  siRedis,
  siSpringboot,
  siTerraform,
  siTypescript,
} from "simple-icons";
import javaLogo from "@/assets/java.svg";
import { ExpLogo } from "@/components/ExpLogo";
import { SiteLayout } from "@/components/SiteLayout";
import { displayName, education, experience } from "@/data/context";

type CoreSkill = {
  name: string;
  path?: string;
  src?: string;
};

const coreSkills: CoreSkill[] = [
  { name: "Go", path: siGo.path },
  { name: "Python", path: siPython.path },
  { name: "Java", src: javaLogo },
  { name: "TypeScript", path: siTypescript.path },
  { name: "React", path: siReact.path },
  { name: "Spring Boot", path: siSpringboot.path },
  { name: "GraphQL", path: siGraphql.path },
  { name: "Kubernetes", path: siKubernetes.path },
  { name: "Docker", path: siDocker.path },
  { name: "Apache Kafka", path: siApachekafka.path },
  { name: "PostgreSQL", path: siPostgresql.path },
  { name: "Redis", path: siRedis.path },
  { name: "OpenTelemetry", path: siOpentelemetry.path },
  { name: "Terraform", path: siTerraform.path },
];

const TechMarquee = () => (
  <section className="tech-marquee" aria-labelledby="tech-marquee-heading">
    <h2 id="tech-marquee-heading" className="visually-hidden">
      Core technologies
    </h2>
    <div className="tech-marquee-viewport">
      <div className="tech-marquee-track">
        {[false, true].map((duplicate) => (
          <ul
            key={duplicate ? "duplicate" : "primary"}
            className="tech-marquee-group"
            aria-hidden={duplicate || undefined}
          >
            {coreSkills.map(({ name, path, src }) => (
              <li className="tech-logo" key={name}>
                {src ? (
                  <img src={src} alt="" aria-hidden="true" />
                ) : (
                  <svg viewBox="0 0 24 24" aria-hidden="true">
                    <path d={path} />
                  </svg>
                )}
                <span className="tech-logo-label">{name}</span>
              </li>
            ))}
          </ul>
        ))}
      </div>
    </div>
  </section>
);

const Home = () => (
  <SiteLayout>
    <div className="home-hero">
      <img
        className="home-avatar"
        src="/profile.jpg"
        alt="Justin Manoj"
        width="60"
        height="60"
        fetchPriority="high"
        decoding="async"
      />
      <div className="home-identity">
        <h1 className="home-name">{displayName}</h1>
        <p className="home-email">justinmmanoj (at) gmail.com</p>
      </div>
    </div>

    <div className="home-intro">
      <p>
        I'm a <strong>Computer Science & Mathematics</strong> student at{" "}
        <strong>UMass Amherst</strong> interested in backend systems,
        cloud infrastructure, DevOps, and performance-critical software.
      </p>
      <p>
        Currently, I'm working on <strong>IBM</strong> webMethods Integration Server. Previously, I worked on platform infrastructure at{" "}
        <strong>Dell Technologies</strong>, API performance at{" "}
        <strong>GBCS Group</strong>, and multi-agent LLM
        reliability research at <strong>UMass Autonomous Learning Lab</strong>.
      </p>
      <p>
        Outside of tech, I enjoy working out, reading, and listening to music!
      </p>
    </div>

    <div className="home-section-rule" role="presentation" />

    <section aria-labelledby="exp-heading">
      <h2 id="exp-heading" className="home-section-title">
        Experience
      </h2>
      <ul className="home-exp-list">
        {experience.map((item) => (
          <li key={item.company} className="home-exp-item">
            <ExpLogo
              logo={item.logo}
              domain={item.domain}
              company={item.company}
            />
            <div className="home-exp-text">
              <div className="home-exp-name">{item.company}</div>
              <div className="home-exp-desc">
                <div className="home-exp-meta">
                  {item.role && (
                    <span className="home-exp-role">{item.role}</span>
                  )}
                  {item.location && (
                    <span className="home-exp-location">{item.location}</span>
                  )}
                </div>
                {item.description && (
                  <span className="home-exp-detail">{item.description}</span>
                )}
              </div>
            </div>
          </li>
        ))}
      </ul>
    </section>

    <div className="home-section-rule" role="presentation" />

    <section aria-labelledby="edu-heading">
      <h2 id="edu-heading" className="home-section-title">
        Education
      </h2>
      <ul className="home-exp-list">
        {education.map((item) => (
          <li key={item.school} className="home-exp-item">
            <ExpLogo
              logo={item.logo}
              domain={item.domain}
              company={item.school}
            />
            <div className="home-exp-text">
              <div className="home-exp-name">{item.school}</div>
              <div className="home-exp-desc">
                <div className="home-exp-meta">
                  {item.degree && (
                    <span className="home-exp-role">{item.degree}</span>
                  )}
                  {item.location && (
                    <span className="home-exp-location">{item.location}</span>
                  )}
                </div>
                {item.coursework && (
                  <span className="home-exp-detail">{item.coursework}</span>
                )}
              </div>
            </div>
          </li>
        ))}
      </ul>
    </section>

    <TechMarquee />
  </SiteLayout>
);

export default Home;
