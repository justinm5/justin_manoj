import { ExpLogo } from "@/components/ExpLogo";
import { SiteLayout } from "@/components/SiteLayout";
import { displayName, education, experience, technicalSkills } from "@/data/context";

const Technologies = () => (
  <section className="technologies" aria-labelledby="technologies-heading">
    <h2 id="technologies-heading" className="home-section-title">Technical Skills</h2>
    <div className="skill-groups">
      {technicalSkills.map(({ category, items }) => (
        <div className="skill-group" key={category}>
          <h3>{category}</h3>
          <ul className="technology-list" aria-label={category}>
            {items.map(name => <li key={name}>{name}</li>)}
          </ul>
        </div>
      ))}
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
        <a className="home-email" href="mailto:justinmmanoj@gmail.com">justinmmanoj (at) gmail.com</a>
      </div>
    </div>

    <div className="home-intro">
      <p>
        I'm a <strong>Computer Science</strong> student at{" "}
        <strong>UMass Amherst</strong> interested in backend systems,
        cloud infrastructure, DevOps, and performance-critical software.
      </p>
      <p>
        I work on webMethods Integration Server at <strong>IBM</strong>. Previously, I worked on platform infrastructure at{" "}
        <strong>Dell Technologies</strong>, API performance at{" "}
        <strong>GBCS Group</strong>, and multi-agent LLM
        research at the <strong>Autonomous Learning Lab</strong>.
      </p>
      <p>
        Outside of tech, I enjoy working out, reading, and listening to music.
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

    <Technologies />
  </SiteLayout>
);

export default Home;
