import { ExpLogo } from "@/components/ExpLogo";
import { SiteLayout } from "@/components/SiteLayout";
import { displayName, education, experience } from "@/data/context";

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
      <h1 className="home-name">{displayName}</h1>
    </div>

    <div className="home-intro">
      <p>
        Hi, I'm Justin - I study{" "}
        <a
          href="https://www.cics.umass.edu/"
          target="_blank"
          rel="noopener noreferrer"
        >
          Computer Science &amp; Mathematics
        </a>{" "}
        at the{" "}
        <a href="https://www.umass.edu/" target="_blank" rel="noopener noreferrer">
          University of Massachusetts Amherst
        </a>{" "}
        and an incoming software developer co-op at{" "}
        <a href="https://www.ibm.com/" target="_blank" rel="noopener noreferrer">
          IBM
        </a>
        .
      </p>
      <p>
        My expertise is focused on backend systems, distributed infrastructure, and
        performance-critical software. I have done platform infrastructure at{" "}
        <a href="https://www.dell.com/" target="_blank" rel="noopener noreferrer">
          Dell
        </a>
        , API and caching work at{" "}
        <a
          href="https://www.gbcsgroup.com/"
          target="_blank"
          rel="noopener noreferrer"
        >
          GBCS Group
        </a>
        , and multi-agent LLM research at the{" "}
        <a href="https://all.cs.umass.edu/" target="_blank" rel="noopener noreferrer">
          UMass Autonomous Learning Lab
        </a>
        .
      </p>
      <p>
        Outside of that, I'm usually reading, listening to music (hip-hop/R&B), or building things.
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
                {item.role && (
                  <span className="home-exp-role">{item.role}</span>
                )}
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
                {item.degree && (
                  <span className="home-exp-role">{item.degree}</span>
                )}
                {item.coursework && (
                  <span className="home-exp-detail">{item.coursework}</span>
                )}
              </div>
            </div>
          </li>
        ))}
      </ul>
    </section>
  </SiteLayout>
);

export default Home;
