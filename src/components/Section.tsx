import { ReactNode } from 'react';

interface SectionProps {
  id?: string;
  title: string;
  children: ReactNode;
}

export const Section = ({ id, title, children }: SectionProps) => {
  return (
    <section id={id} className="mb-8 scroll-mt-20">
      <h2 className="text-2xl font-semibold text-foreground mb-4 tracking-tight">{title}</h2>
      <div className="space-y-4">{children}</div>
    </section>
  );
};
