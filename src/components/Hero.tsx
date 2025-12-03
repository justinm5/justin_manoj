interface HeroProps {
  name: string;
  title: string;
  description: string;
  imageUrl: string;
}

export const Hero = ({ name, title, description, imageUrl }: HeroProps) => {
  return (
    <section className="mb-8 animate-fade-in">
      <div className="flex items-start gap-8 mb-8">
        <div className="relative group">
          <img
            src={imageUrl}
            alt={name}
            className="w-20 h-20 rounded-full object-cover ring-2 ring-border/50 group-hover:ring-accent/50 transition-all duration-300 group-hover:scale-105"
          />
          <div className="absolute inset-0 rounded-full bg-accent/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-xl" />
        </div>
        <div className="flex-1">
          <h1 className="text-4xl font-semibold text-foreground mb-2 tracking-tight bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text">
            {name}
          </h1>
          <p className="text-muted-foreground">{title}</p>
        </div>
      </div>
      <p className="text-foreground/80 leading-relaxed max-w-4xl text-[15px]">{description}</p>
    </section>
  );
};
