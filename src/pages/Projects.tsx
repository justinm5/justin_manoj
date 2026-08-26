import { SiteLayout } from "@/components/SiteLayout";
import { projects } from "@/data/context";

const Projects = () => (
  <SiteLayout title="Projects">
    <div className="projects-serial">
      <h1 className="pc-signature">Projects</h1>
      <p className="projects-lede">
        A few things I've built to solve real problems, learn new systems, and
        make complex information easier to use.
      </p>
      <ul className="pc-grid">
        {projects.map((project, index) => (
          <li key={project.title} className="pc-card">
            <span className="pc-number" aria-hidden="true">
              {String(index + 1).padStart(2, "0")}
            </span>
            <div className="pc-card-body">
              {project.href ? (
                <a
                  className="pc-title"
                  href={project.href}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {project.title}
                </a>
              ) : (
                <span className="pc-title-static">{project.title}</span>
              )}
              <p className="pc-desc">{project.description}</p>
            </div>
            {project.href && (
              <span className="pc-arrow" aria-hidden="true">
                →
              </span>
            )}
          </li>
        ))}
      </ul>
    </div>
  </SiteLayout>
);

export default Projects;
