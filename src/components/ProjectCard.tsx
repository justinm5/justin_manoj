import { useState } from "react";
import { ExternalLink } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface ProjectCardProps {
  year: string;
  title: string;
  timeAgo: string;
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
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="group border border-border/40 rounded-xl p-6 hover:border-border/60 transition-all duration-300 bg-card/30 backdrop-blur-sm">
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-baseline gap-3">
          <span className="text-xs text-muted-foreground font-mono tracking-tight">{year}</span>
          <h3 className="font-medium text-foreground group-hover:text-accent transition-colors">{title}</h3>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs text-muted-foreground whitespace-nowrap">{timeAgo}</span>
          {liveLink && (
            <a
              href={liveLink}
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              <ExternalLink className="w-4 h-4" />
            </a>
          )}
        </div>
      </div>

      <p className={`text-sm text-muted-foreground/90 mb-4 leading-relaxed ${!isExpanded && "line-clamp-2"}`}>
        {description}
      </p>

      {description.length > 150 && (
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="text-xs text-accent hover:text-foreground mb-4 transition-colors font-medium"
        >
          {isExpanded ? "Read less" : "Read more"}
        </button>
      )}

      <div className="flex flex-wrap gap-1.5">
        {tags.map((tag) => (
          <Badge key={tag} variant="secondary" className="text-xs font-normal bg-secondary/50 hover:bg-secondary/70 border-0">
            {tag}
          </Badge>
        ))}
      </div>
    </div>
  );
};
