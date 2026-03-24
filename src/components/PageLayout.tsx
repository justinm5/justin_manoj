import { ReactNode } from "react";
import { AnimatedGradient } from "@/components/AnimatedGradient";
import { Navigation } from "@/components/Navigation";
import { cn } from "@/lib/utils";

interface PageLayoutProps {
  children: ReactNode;
  width?: "normal" | "wide";
  contentClassName?: string;
}

export const PageLayout = ({ children, width = "normal", contentClassName }: PageLayoutProps) => {
  const widthClass = width === "wide" ? "mx-auto max-w-6xl" : "mx-auto max-w-5xl";

  return (
    <div className="min-h-screen bg-background relative">
      <AnimatedGradient />
      <Navigation />
      <main
        className={cn(
          "relative z-10 w-full px-4 pb-6 pt-6 sm:px-6 sm:pt-8 lg:px-10 lg:pt-10",
          widthClass,
          contentClassName,
        )}
      >
        {children}
      </main>
    </div>
  );
};
