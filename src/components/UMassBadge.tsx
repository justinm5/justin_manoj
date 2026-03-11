import { cn } from "@/lib/utils";

type UMassBadgeProps = {
  className?: string;
};

export const UMassBadge = ({ className }: UMassBadgeProps) => (
  <img
    src="/umass-logo.png"
    alt="UMass logo"
    className={cn("inline-block h-8 w-8 object-contain", className)}
    loading="lazy"
  />
);
