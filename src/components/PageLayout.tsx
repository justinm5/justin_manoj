import { ReactNode } from "react";
import { AnimatedGradient } from "@/components/AnimatedGradient";
import { Navigation } from "@/components/Navigation";

interface PageLayoutProps {
  children: ReactNode;
}

export const PageLayout = ({ children }: PageLayoutProps) => {
  return (
    <div className="min-h-screen bg-background relative">
      <AnimatedGradient />
      <Navigation />
      <main className="relative z-10 mx-auto w-full max-w-5xl px-4 pb-24 pt-6 sm:px-6 md:pb-10 md:pt-8 md:pl-24 lg:pl-28">
        {children}
      </main>
    </div>
  );
};
