interface HeroProps {
  name: string;
  title: string;
  description: string;
  imageUrl: string;
}

export const Hero = ({ name, title, description, imageUrl }: HeroProps) => {
  return (
    <section className="mb-12 animate-fade-in">
      <div className="flex items-start gap-6 mb-6">
        <img
          src={imageUrl}
          alt={name}
          className="w-16 h-16 rounded-full object-cover ring-2 ring-border"
        />
        <div>
          <h1 className="text-3xl font-bold text-foreground mb-1">{name}</h1>
          <p className="text-muted-foreground text-sm">{title}</p>
        </div>
      </div>
      <p className="text-foreground leading-relaxed max-w-3xl">{description}</p>
    </section>
  );
};
