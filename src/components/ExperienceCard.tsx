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
    <div className="group">
      <div className="flex justify-between items-start mb-2">
        <div>
          <h3 className="font-semibold text-foreground group-hover:text-accent transition-colors">
            {title}
          </h3>
          <p className="text-sm text-foreground">{company}</p>
          <p className="text-xs text-muted-foreground">{location}</p>
        </div>
        <span className="text-xs text-muted-foreground whitespace-nowrap">{period}</span>
      </div>
      <ul className="space-y-1 mt-3">
        {description.map((item, index) => (
          <li key={index} className="text-sm text-muted-foreground pl-4 relative before:content-['•'] before:absolute before:left-0">
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
