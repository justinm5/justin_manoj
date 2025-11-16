interface PublicationCardProps {
  title: string;
  authors: string;
  date: string;
  description: string;
  link: string;
}

export const PublicationCard = ({
  title,
  authors,
  date,
  description,
  link,
}: PublicationCardProps) => {
  return (
    <a
      href={link}
      target="_blank"
      rel="noopener noreferrer"
      className="block group"
    >
      <h3 className="font-semibold text-foreground group-hover:text-accent transition-colors mb-1">
        {title}
      </h3>
      <p className="text-sm text-muted-foreground mb-1">{authors}</p>
      <p className="text-xs text-muted-foreground mb-2">Published: {date}</p>
      <p className="text-sm text-foreground leading-relaxed">{description}</p>
    </a>
  );
};
