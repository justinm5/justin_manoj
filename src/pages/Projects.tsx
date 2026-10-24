import { SiteLayout } from "@/components/SiteLayout";
import { projects } from "@/data/context";

const Projects = () => (
  <SiteLayout title="Projects">
    <div className="projects-serial">
      <h1 className="pc-signature">Projects</h1>
      <ul className="pc-grid">
        {projects.map((project, index) => (
          <li key={project.title} className="pc-card">
            <span className="pc-number" aria-hidden="true">
              {String(index + 1).padStart(2, "0")}
            </span>
            <div className="pc-card-body">
              <div className="pc-project-header">
                <h2 className="pc-project-title">{project.title}</h2>
                {project.href && (
                  <a
                    className="pc-code-link"
                    href={project.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`View ${project.title} source code (opens in a new tab)`}
                  >
                    Code <span aria-hidden="true">↗</span>
                  </a>
                )}
              </div>
              <p className="pc-desc">{project.description}</p>
              <ul className="pc-stack" aria-label={`${project.title} technologies`}>
                {project.technologies.map((technology) => (
                  <li key={technology}>{technology}</li>
                ))}
              </ul>
            </div>
          </li>
        ))}
      </ul>
    </div>
  </SiteLayout>
);

export default Projects;
