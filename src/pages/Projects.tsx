import { SiteLayout } from "@/components/SiteLayout";
import { projects } from "@/data/context";

const Projects = () => (
  <SiteLayout>
    <div className="projects-serial">
      <h1 className="pc-signature">cool things i've built</h1>
      <ul className="pc-list">
        {projects.map((project) => (
          <li key={project.title} className="pc-item">
            {project.href ? (
              <a
                className="pc-title"
                href={project.href}
                target={project.href.startsWith("http") ? "_blank" : undefined}
                rel={
                  project.href.startsWith("http")
                    ? "noopener noreferrer"
                    : undefined
                }
              >
                {project.title}
              </a>
            ) : (
              <span className="pc-title-static">{project.title}</span>
            )}
            <p className="pc-desc">{project.description}</p>
          </li>
        ))}
      </ul>
    </div>
  </SiteLayout>
);

export default Projects;
