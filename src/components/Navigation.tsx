import { BriefcaseBusiness, FolderKanban, House } from "lucide-react";
import { NavLink } from "@/components/NavLink";

export const Navigation = () => {
  const navItems = [
    { to: "/", label: "Home", icon: House, end: true },
    { to: "/experience", label: "Experience", icon: BriefcaseBusiness },
    { to: "/projects", label: "Projects", icon: FolderKanban },
  ];

  return (
    <>
      <nav className="hidden md:block fixed left-5 lg:left-7 top-1/2 -translate-y-1/2 z-50">
        <div className="rounded-3xl border border-border/50 bg-background/70 backdrop-blur-2xl p-2.5 shadow-[0_20px_44px_rgba(0,0,0,0.25)]">
          <div className="flex flex-col gap-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <NavLink
                  key={item.to}
                  to={item.to}
                  end={item.end}
                  className="group flex items-center gap-2 rounded-2xl px-3 py-2.5 text-[11px] font-mono uppercase tracking-[0.18em] text-muted-foreground transition-all duration-200 hover:text-foreground hover:bg-secondary/50"
                  activeClassName="text-foreground bg-secondary/80 shadow-[inset_0_0_0_1px_hsl(var(--border))]"
                >
                  <Icon className="w-3.5 h-3.5" />
                  {item.label}
                </NavLink>
              );
            })}
          </div>
        </div>
      </nav>

      <nav className="md:hidden fixed bottom-4 inset-x-4 z-50">
        <div className="rounded-2xl border border-border/50 bg-background/80 backdrop-blur-2xl px-2 py-2 shadow-[0_12px_34px_rgba(0,0,0,0.28)]">
          <div className="grid grid-cols-3 gap-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <NavLink
                  key={item.to}
                  to={item.to}
                  end={item.end}
                  className="flex flex-col items-center justify-center gap-1 rounded-xl px-2 py-1.5 text-[10px] font-mono uppercase tracking-[0.12em] text-muted-foreground transition-all duration-200 hover:text-foreground"
                  activeClassName="text-foreground bg-secondary/80"
                >
                  <Icon className="w-4 h-4" />
                  {item.label}
                </NavLink>
              );
            })}
          </div>
        </div>
      </nav>
    </>
  );
};
