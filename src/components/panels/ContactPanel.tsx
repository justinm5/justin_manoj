import { ArrowUpRight } from "lucide-react";

const links = [
  { label: "Email", value: "justinmmanoj@gmail.com", href: "mailto:justinmmanoj@gmail.com" },
  { label: "LinkedIn", value: "justinmmanoj", href: "https://linkedin.com/in/justinmmanoj" },
  { label: "GitHub", value: "justinm5", href: "https://github.com/justinm5" },
  { label: "Resume", value: "resume.pdf", href: "/resume.pdf" },
];

export const ContactPanel = () => (
  <div className="divide-y divide-white/10">
    {links.map((link) => {
      const isMail = link.href.startsWith("mailto:");

      return (
        <a
          key={link.label}
          href={link.href}
          target={isMail ? undefined : "_blank"}
          rel={isMail ? undefined : "noopener noreferrer"}
          className="cursor-target group flex items-center justify-between gap-4 py-3 first:pt-0"
        >
          <span className="text-[11px] font-tabular-itf uppercase tracking-[0.14em] text-foreground/45">
            {link.label}
          </span>
          <span className="flex items-center gap-1.5 text-[15px] text-foreground/75 transition-colors group-hover:text-accent">
            {link.value}
            <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </span>
        </a>
      );
    })}
  </div>
);
