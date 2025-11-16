export const AnimatedGradient = () => {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
      <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-background/95" />
      <div className="absolute top-0 -left-1/4 w-1/2 h-1/2 bg-gradient-to-br from-accent/5 via-transparent to-transparent rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-0 -right-1/4 w-1/2 h-1/2 bg-gradient-to-tl from-accent/5 via-transparent to-transparent rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
    </div>
  );
};

