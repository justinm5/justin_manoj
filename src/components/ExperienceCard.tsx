interface ExperienceCardProps {
  title: string;
  company: string;
  location: string;
  period: string;
  description: string[];
  link?: string;
}

export const ExperienceCard = ({
  title,
  company,
  location,
  period,
  description,
  link,
}: ExperienceCardProps) => {
  const content = (
    <div className="group border border-border/40 rounded-xl p-6 hover:border-border/60 transition-all duration-300 bg-card/30 backdrop-blur-sm">
      <div className="flex justify-between items-start mb-3">
        <div>
          <h3 className="font-medium text-foreground group-hover:text-accent transition-colors">
            {title}
          </h3>
          <p className="text-sm text-foreground/90 mt-1">{company}</p>
          <p className="text-xs text-muted-foreground mt-0.5">{location}</p>
        </div>
        <span className="text-xs text-muted-foreground whitespace-nowrap font-mono">{period}</span>
      </div>
      <ul className="space-y-2 mt-4">
        {description.map((item, index) => (
          <li key={index} className="text-sm text-muted-foreground/90 pl-4 relative before:content-['→'] before:absolute before:left-0 before:text-muted-foreground/50 leading-relaxed">
            {item}
          </li>
        ))}
      </ul>
    </div>
  );

  if (link) {
    return (
      <a href={link} target="_blank" rel="noopener noreferrer" className="block">
        {content}
      </a>
    );
  }

  return <div>{content}</div>;
};
