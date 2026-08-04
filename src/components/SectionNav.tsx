import { useScrollSpy } from "@/hooks/use-scroll-spy";
import { cn } from "@/lib/utils";

export type SectionNavItem = {
  id: string;
  label: string;
};

interface SectionNavProps {
  items: SectionNavItem[];
}

export const SectionNav = ({ items }: SectionNavProps) => {
  const activeId = useScrollSpy(items.map((item) => item.id));

  return (
    <nav
      aria-label="Sections"
      className="pointer-events-none fixed left-6 top-1/2 z-30 hidden -translate-y-1/2 xl:block"
    >
      <ul className="pointer-events-auto flex flex-col gap-3">
        {items.map((item) => {
          const isActive = activeId === item.id;

          return (
            <li key={item.id}>
              <a
                href={`#${item.id}`}
                className="cursor-target group flex items-center gap-3"
                aria-current={isActive ? "true" : undefined}
              >
                <span
                  className={cn(
                    "h-px transition-all duration-300",
                    isActive
                      ? "w-8 bg-foreground/80"
                      : "w-4 bg-foreground/25 group-hover:w-6 group-hover:bg-foreground/50",
                  )}
                />
                <span
                  className={cn(
                    "text-[10px] font-tabular-itf uppercase tracking-[0.18em] transition-colors duration-300",
                    isActive
                      ? "text-foreground/80"
                      : "text-foreground/35 group-hover:text-foreground/60",
                  )}
                >
                  {item.label}
                </span>
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};
