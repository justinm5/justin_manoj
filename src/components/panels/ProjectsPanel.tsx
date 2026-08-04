import { projects } from "@/data/projects";

const ArrowIcon = () => (
  <svg
    viewBox="0 0 16 16"
    aria-hidden="true"
    className="mt-[0.2em] h-[0.7em] w-[0.7em] shrink-0 text-[#52525b] transition-transform duration-200 ease-out group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
  >
    <path
      d="M4.5 11.5 11.5 4.5M11.5 4.5H6M11.5 4.5V10"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      fill="none"
    />
  </svg>
);

export const ProjectsPanel = () => (
  <div className="space-y-7">
    {projects.map((project) => (
      <div key={project.id} className="group flex gap-4 sm:gap-8">
        <div className="w-16 shrink-0 pt-0.5 text-sm tabular-nums text-[#52525b] sm:w-28">
          {project.year}
        </div>
        <div className="min-w-0 flex-1">
          {project.link ? (
            <a
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-start gap-1 underline-offset-4 hover:underline font-medium text-foreground"
            >
              <span>{project.title}</span>
              <ArrowIcon />
            </a>
          ) : (
            <span className="font-medium text-foreground">{project.title}</span>
          )}
          <p className="mt-1.5 hidden text-sm leading-relaxed text-[#a1a1aa] group-hover:block">
            {project.summary}
          </p>
        </div>
      </div>
    ))}
  </div>
);
