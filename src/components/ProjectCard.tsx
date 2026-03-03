import { ExternalLink } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface ProjectCardProps {
  year: string;
  title: string;
  timeAgo?: string;
  description: string;
  tags: string[];
  liveLink?: string;
}

export const ProjectCard = ({
  year,
  title,
  timeAgo,
  description,
  tags,
  liveLink,
}: ProjectCardProps) => {
  const handleClick = () => {
    if (liveLink) {
      window.open(liveLink, "_blank", "noopener,noreferrer");
    }
  };

  return (
    <div
      onClick={handleClick}
      className={`group border border-border/40 rounded-2xl p-7 transition-all duration-300 bg-card/25 backdrop-blur-sm hover:border-accent/50 hover:shadow-[0_0_20px_rgba(99,102,241,0.15)] hover:-translate-y-0.5 ${
        liveLink ? "cursor-pointer" : ""
      }`}
      style={{
        transformStyle: "preserve-3d",
      }}
    >
      <div className="flex items-start justify-between mb-2.5 gap-2">
        <div className="flex items-baseline gap-3">
          <span className="text-[11px] text-muted-foreground font-mono tracking-tight px-2 py-0.5 rounded-md border border-border/40 bg-background/40">
            {year}
          </span>
          <h3 className="text-[19px] font-semibold text-foreground group-hover:text-accent transition-colors leading-tight">
            {title}
          </h3>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          {timeAgo && (
            <span className="text-[11px] text-muted-foreground whitespace-nowrap px-2 py-0.5 rounded-md border border-border/40 bg-background/40">
              {timeAgo}
            </span>
          )}
          {liveLink && (
            <ExternalLink className="w-4 h-4 text-muted-foreground group-hover:text-accent transition-colors" />
          )}
        </div>
      </div>

      <p className="text-[15px] text-muted-foreground/90 mb-4 leading-relaxed">
        <span dangerouslySetInnerHTML={{ __html: description }} />
      </p>

      <div className="flex flex-wrap gap-1.5">
        {tags.map((tag) => (
          <Badge
            key={tag}
            variant="secondary"
            className="text-[11px] font-mono uppercase tracking-[0.12em] font-normal px-2.5 py-1 bg-secondary/50 group-hover:bg-secondary/70 border-0 transition-colors"
          >
            {tag}
          </Badge>
        ))}
      </div>
    </div>
  );
};
