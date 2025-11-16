interface HeroProps {
  name: string;
  title: string;
  description: string;
  imageUrl: string;
}

export const Hero = ({ name, title, description, imageUrl }: HeroProps) => {
  return (
    <section className="mb-20 animate-fade-in">
      <div className="flex items-start gap-8 mb-8">
        <img
          src={imageUrl}
          alt={name}
          className="w-20 h-20 rounded-full object-cover ring-1 ring-border/50"
        />
        <div className="flex-1">
          <h1 className="text-4xl font-semibold text-foreground mb-2 tracking-tight">{name}</h1>
          <p className="text-muted-foreground">{title}</p>
        </div>
      </div>
      <p className="text-foreground/80 leading-relaxed max-w-3xl text-[15px]">{description}</p>
    </section>
  );
};
