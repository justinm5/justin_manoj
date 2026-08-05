import { ProjectMedia } from "@/components/ProjectMedia";
import { SiteLayout } from "@/components/SiteLayout";
import { projects } from "@/data/context";

const Projects = () => (
  <SiteLayout title="Projects">
    <div className="projects-serial">
      <h1 className="pc-signature">cool things i've built</h1>
      <ul className="pc-grid">
        {projects.map((project) => {
          const external = project.href?.startsWith("http");
          return (
            <li key={project.title} className="pc-card">
              <ProjectMedia media={project.media} />
              <div className="pc-card-body">
                {project.href ? (
                  <a
                    className="pc-title"
                    href={project.href}
                    target={external ? "_blank" : undefined}
                    rel={external ? "noopener noreferrer" : undefined}
                  >
                    {project.title}
                  </a>
                ) : (
                  <span className="pc-title-static">{project.title}</span>
                )}
                <p className="pc-desc">{project.description}</p>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  </SiteLayout>
);

export default Projects;
