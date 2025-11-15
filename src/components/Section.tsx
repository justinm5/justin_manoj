import { ReactNode } from 'react';

interface SectionProps {
  title: string;
  children: ReactNode;
}

export const Section = ({ title, children }: SectionProps) => {
  return (
    <section className="mb-12 animate-fade-in">
      <h2 className="text-xl font-semibold text-foreground mb-6 border-b border-border pb-2">
        {title}
      </h2>
      <div className="space-y-6">{children}</div>
    </section>
  );
};
