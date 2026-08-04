import { ReactNode } from "react";
import { Footer } from "@/components/Footer";
import { Navigation } from "@/components/Navigation";
import { SocialDock } from "@/components/SocialDock";
import { cn } from "@/lib/utils";

interface PageLayoutProps {
  children: ReactNode;
  width?: "normal" | "wide";
  contentClassName?: string;
}

export const PageLayout = ({ children, width = "normal", contentClassName }: PageLayoutProps) => {
  const widthClass = width === "wide" ? "mx-auto max-w-6xl" : "mx-auto max-w-5xl";

  return (
    <div className="relative flex min-h-screen flex-col bg-background">
      <Navigation />
      <SocialDock />
      <main
        className={cn(
          "relative z-10 w-full flex-1 px-4 pb-8 pt-20 sm:px-6 sm:pt-24 lg:px-10 lg:pt-28",
          widthClass,
          contentClassName,
        )}
      >
        {children}
      </main>
      <Footer />
    </div>
  );
};
